// Cordata CRM — interfaccia del gestionale (nessun framework, nessun passo di build).
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const eur = n => new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0, useGrouping: 'always' }).format(n || 0);
const dt = (s, o = { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }) => s ? new Date(s).toLocaleString('it-IT', o) : '';
const day = s => dt(s, { day: '2-digit', month: 'short', year: 'numeric' });
const hm = s => dt(s, { hour: '2-digit', minute: '2-digit' });
const pad = n => String(n).padStart(2, '0');
const iso = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const view = $('#view');

const S = { users: [], stages: [], me: 1 };
try { S.me = Number(localStorage.getItem('cordata.me')) || 1; } catch { /* archivio non disponibile */ }

async function api(path, method = 'GET', body) {
  if (window.DEMO_API) return window.DEMO_API('/api/' + path, method, body);
  const r = await fetch('/api/' + path, { method, headers: body ? { 'Content-Type': 'application/json' } : {}, body: body ? JSON.stringify(body) : undefined });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(j.error || 'Errore ' + r.status);
  return j;
}
function toast(msg, err) {
  const t = $('#toast'); t.textContent = msg; t.className = 'toast' + (err ? ' err' : ''); t.hidden = false;
  clearTimeout(toast.t); toast.t = setTimeout(() => { t.hidden = true; }, 3200);
}
const guard = fn => async (...a) => { try { return await fn(...a); } catch (e) { toast(e.message, true); } };
const user = id => S.users.find(u => u.id === Number(id));
const stage = id => S.stages.find(s => s.id === Number(id));
const avatar = id => { const u = user(id); return u ? `<span class="avatar" style="background:${esc(u.color)}" title="${esc(u.name)}">${esc(u.name.split(' ').map(x => x[0]).join(''))}</span>` : ''; };
const tags = a => (a || []).map(t => `<span class="tag">${esc(t)}</span>`).join('');
const cname = c => esc(`${c.first_name || ''} ${c.last_name || ''}`.trim());
const userOpts = () => [['', '— nessuno —'], ...S.users.map(u => [u.id, u.name])];
const stageOpts = () => S.stages.map(s => [s.id, s.name]);
const publicLink = p => window.DEMO ? `<a href="#${esc(p)}">Apri la pagina pubblica</a>` : `<a href="${esc(p)}" target="_blank" rel="noopener">${esc(location.origin + p)}</a>`;

// ---------- campi, finestre e editor a lista ----------
function fieldHtml(f, v) {
  const a = `data-k="${esc(f.k)}"${f.num ? ' data-num="1"' : ''}${f.required ? ' required' : ''}`;
  let inp;
  if (f.type === 'select') inp = `<select ${a}>${f.options.map(([val, lab]) => `<option value="${esc(val)}"${String(v ?? '') === String(val) ? ' selected' : ''}>${esc(lab)}</option>`).join('')}</select>`;
  else if (f.type === 'textarea') inp = `<textarea ${a}>${esc(v)}</textarea>`;
  else if (f.type === 'checkbox') return `<label class="f check"><input type="checkbox" ${a}${v ? ' checked' : ''}> ${esc(f.label)}</label>`;
  else if (f.type === 'tags') inp = `<input ${a} data-tags="1" value="${esc((v || []).join(', '))}" placeholder="separati da virgola">`;
  else inp = `<input type="${f.type || 'text'}" ${a} value="${esc(f.type === 'datetime-local' ? String(v || '').slice(0, 16) : v)}"${f.ph ? ` placeholder="${esc(f.ph)}"` : ''}>`;
  return `<label class="f${f.type === 'textarea' || f.wide ? ' wide' : ''}"><span>${esc(f.label)}</span>${inp}</label>`;
}
function readValue(el) {
  if (el.type === 'checkbox') return el.checked ? 1 : 0;
  if (el.dataset.tags) return el.value.split(',').map(s => s.trim()).filter(Boolean);
  if (el.dataset.num) return el.value === '' ? null : Number(el.value);
  if (el.type === 'datetime-local') return el.value ? el.value + ':00' : null;
  return el.value;
}
const collect = root => Object.fromEntries($$('[data-k]', root).map(el => [el.dataset.k, readValue(el)]));

// Conferma dentro la pagina (i dialoghi del browser non sono sempre disponibili).
function ask(msg) {
  return new Promise(res => {
    const o = document.createElement('div'); o.className = 'modal'; o.style.zIndex = 30;
    o.innerHTML = `<div class="dialog"><p>${esc(msg)}</p><div class="actions"><button class="primary" data-y>Conferma</button><button data-n>Annulla</button></div></div>`;
    document.body.append(o);
    const done = v => { o.remove(); res(v); };
    o.querySelector('[data-y]').onclick = () => done(true); o.querySelector('[data-n]').onclick = () => done(false);
    o.querySelector('[data-y]').focus();
  });
}
function closeModal() { $('#modal').hidden = true; $('#modal').innerHTML = ''; }
function formModal(title, fields, values, onSave, onDelete) {
  const m = $('#modal');
  m.innerHTML = `<form class="dialog"><h2>${esc(title)}</h2>${fields.map(f => fieldHtml(f, values[f.k])).join('')}
    <div class="actions"><button class="primary">Salva</button><button type="button" data-x>Annulla</button><span class="sp"></span>${onDelete ? '<button type="button" class="danger" data-del>Elimina</button>' : ''}</div></form>`;
  m.hidden = false;
  $('[data-x]', m).onclick = closeModal;
  if (onDelete) $('[data-del]', m).onclick = guard(async () => { if (await ask('Eliminare definitivamente?')) { await onDelete(); closeModal(); } });
  $('form', m).onsubmit = guard(async e => { e.preventDefault(); await onSave(collect(m)); closeModal(); });
  const first = $('input,select,textarea', m); if (first) first.focus();
}
$('#modal').addEventListener('mousedown', e => { if (e.target.id === 'modal') closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// Azione al premere del mouse (o da tastiera): un campo appena modificato fa ridisegnare l'area
// quando perde il fuoco, e un normale "click" su un elemento ridisegnato andrebbe perso.
const press = (el, fn) => { el.onmousedown = e => { if (e.button === 0) fn(e); }; el.onclick = e => { if (e.detail === 0) fn(e); }; };

// items viene modificato sul posto; spec = { title(item), fields(item), types?: {chiave: etichetta}, blank(type) }
function listEditor(root, items, spec) {
  const draw = () => {
    root.innerHTML = items.map((it, i) => `<div class="item" data-i="${i}"><div class="item-head"><span class="num">${i + 1}</span><strong>${esc(spec.title(it))}</strong><span class="sp"></span>
      <button type="button" class="mini" data-act="up" title="Sposta su">↑</button><button type="button" class="mini" data-act="down" title="Sposta giù">↓</button><button type="button" class="mini danger" data-act="del" title="Rimuovi">✕</button></div>
      <div class="item-body">${spec.fields(it).map(f => fieldHtml(f, it[f.k])).join('')}</div></div>`).join('') +
      `<div class="add-row">${spec.types ? `<select data-newtype>${Object.entries(spec.types).map(([k, l]) => `<option value="${k}">${esc(l)}</option>`).join('')}</select>` : ''}<button type="button" data-act="add">+ Aggiungi</button></div>`;
  };
  root.onclick = e => {
    const act = e.target.dataset.act; if (!act) return;
    if (act === 'add') items.push(spec.blank(spec.types ? $('[data-newtype]', root).value : undefined));
    else {
      const i = Number(e.target.closest('.item').dataset.i);
      if (act === 'del') items.splice(i, 1);
      if (act === 'up' && i > 0) [items[i - 1], items[i]] = [items[i], items[i - 1]];
      if (act === 'down' && i < items.length - 1) [items[i + 1], items[i]] = [items[i], items[i + 1]];
    }
    draw();
    if (spec.onChange) spec.onChange();
  };
  root.oninput = e => {
    const el = e.target; if (!el.dataset.k) return;
    items[Number(el.closest('.item').dataset.i)][el.dataset.k] = readValue(el);
    if ((spec.redrawOn || []).includes(el.dataset.k)) draw();
    if (spec.onChange) spec.onChange();
  };
  draw();
}

// ---------- navigazione ----------
const NAV = [['dashboard', 'Dashboard'], ['contatti', 'Contatti'], ['pipeline', 'Pipeline'], ['inbox', 'Conversazioni'], ['calendario', 'Calendario'], ['automazioni', 'Automazioni'], ['moduli', 'Moduli e pagine'], ['corsi', 'Corsi'], ['comunita', 'Comunità']];
const routes = {};
async function drawNav(active) {
  let unread = 0; try { unread = (await api('dashboard')).unread; } catch { /* il badge è accessorio */ }
  $('#nav').innerHTML = NAV.map(([k, l]) => `<a href="#/${k}" class="${k === active ? 'on' : ''}">${l}${k === 'inbox' && unread ? `<span class="badge">${unread}</span>` : ''}</a>`).join('');
}
// Nella versione di prova (una pagina sola) la navigazione resta in memoria invece che nell'indirizzo.
let HASH = location.hash;
const go = h => { if (window.DEMO) { HASH = h; route(); } else location.hash = h; };
if (window.DEMO) document.addEventListener('click', e => { const a = e.target.closest('a[href^="#/"]'); if (a) { e.preventDefault(); go(a.getAttribute('href')); window.scrollTo(0, 0); } });
async function route() {
  const h = window.DEMO ? HASH : location.hash;
  if (window.DEMO) {
    const m = h.match(/^#\/p\/([^/]+)\/(.+)/);
    $('.app').hidden = !!m; $('#pubwrap').hidden = !m;
    if (m) return window.__public(m[1], decodeURIComponent(m[2]));
  }
  const [name = 'dashboard', arg] = h.replace(/^#\/?/, '').split('/');
  const fn = routes[name] || routes.dashboard;
  drawNav(routes[name] ? name : 'dashboard');
  try { await fn(arg); } catch (e) { view.innerHTML = `<div class="card empty">${esc(e.message)}</div>`; }
}
const refresh = () => route();
const head = (title, sub, actions = '') => `<div class="head"><div><h1>${esc(title)}</h1>${sub ? `<p class="muted">${esc(sub)}</p>` : ''}</div><span class="sp"></span>${actions}</div>`;

// ---------- dashboard ----------
routes.dashboard = async () => {
  const d = await api('dashboard');
  const maxV = Math.max(1, ...d.stages.map(s => s.v)), maxS = Math.max(1, ...d.sources.map(s => s.n));
  const rate = d.won.n + d.lost ? Math.round(100 * d.won.n / (d.won.n + d.lost)) : 0;
  view.innerHTML = head('Dashboard', 'La situazione di oggi, a colpo d\'occhio') + `
  <div class="grid kpis">
    ${[[d.contacts, 'Contatti', `+${d.new_contacts} questo mese`], [eur(d.open.v), 'Fatturato potenziale', `${d.open.n} opportunità aperte`], [eur(d.won.v), 'Fatturato vinto', `${d.won.n} vendite chiuse`], [rate + '%', 'Tasso di chiusura', `${d.lost} perse`], [d.unread, 'Messaggi da leggere', 'nella casella condivisa']]
      .map(([n, l, s]) => `<div class="card kpi"><div class="n">${esc(n)}</div><div class="l">${l}</div><div class="small muted">${esc(s)}</div></div>`).join('')}
  </div>
  <div class="grid two">
    <div class="card"><h2>Pipeline per fase</h2>${d.stages.map(s => `<div class="bar-row"><span>${esc(s.name)}</span><div class="bar"><i style="width:${100 * s.v / maxV}%;background:${esc(s.color)}"></i></div><span class="right nowrap">${eur(s.v)} · ${s.n}</span></div>`).join('')}</div>
    <div class="card"><h2>Da dove arrivano i contatti</h2>${d.sources.map(s => `<div class="bar-row"><span>${esc(s.source)}</span><div class="bar"><i style="width:${100 * s.n / maxS}%;background:var(--brand-2)"></i></div><span class="right">${s.n}</span></div>`).join('')}</div>
    <div class="card"><h2>Prossimi appuntamenti</h2><ul class="plain">${d.upcoming.map(a => `<li><span class="nowrap muted">${dt(a.start_at)}</span><span><a href="#/contatti/${a.contact_id}">${esc(a.contact)}</a> — ${esc(a.title)}</span></li>`).join('') || '<li class="muted">Nessun appuntamento in programma</li>'}</ul></div>
    <div class="card"><h2>Attività da fare</h2><ul class="plain">${d.tasks.map(t => `<li><input type="checkbox" data-task="${t.id}" aria-label="Segna come fatta"><span>${esc(t.title)} <span class="muted small">· ${esc(t.contact || '')} · entro ${dt(t.due_at)}</span></span><span class="sp"></span>${avatar(t.owner_id)}</li>`).join('') || '<li class="muted">Tutto fatto</li>'}</ul></div>
    <div class="card" style="grid-column:1/-1"><h2>Ultimi movimenti</h2><ul class="plain">${d.recent.map(a => `<li><span class="nowrap muted small">${dt(a.created_at)}</span><span><a href="#/contatti/${a.contact_id}">${esc(a.contact)}</a> — ${esc(a.text)}</span></li>`).join('')}</ul></div>
  </div>`;
  $$('[data-task]').forEach(c => c.onchange = guard(async () => { await api('tasks/' + c.dataset.task, 'PUT', { done: 1 }); refresh(); }));
};

// ---------- contatti ----------
const SOURCES = ['Sito web', 'WhatsApp', 'Instagram', 'Google Ads', 'Referral', 'Telefono', 'Altro'];
const contactFields = () => [
  { k: 'first_name', label: 'Nome', required: true }, { k: 'last_name', label: 'Cognome' }, { k: 'email', label: 'Email', type: 'email' }, { k: 'phone', label: 'Telefono' },
  { k: 'company', label: 'Azienda' }, { k: 'source', label: 'Provenienza', type: 'select', options: [['', '—'], ...SOURCES.map(s => [s, s])] },
  { k: 'tags', label: 'Tag', type: 'tags' }, { k: 'birthday', label: 'Data di nascita', type: 'date' }, { k: 'owner_id', label: 'Assegnato a', type: 'select', options: userOpts(), num: true },
];
let contactFilter = { q: '', tag: '' };
routes.contatti = async id => {
  if (id) return contactDetail(id);
  const list = await api('contacts');
  const allTags = [...new Set(list.flatMap(c => c.tags || []))].sort();
  view.innerHTML = head('Contatti', `${list.length} persone in anagrafica`, '<button class="primary" id="new">+ Nuovo contatto</button>') +
    `<div class="head"><input id="q" type="search" placeholder="Cerca per nome, azienda, email…" value="${esc(contactFilter.q)}" style="width:300px">
     <select id="tagf"><option value="">Tutti i tag</option>${allTags.map(t => `<option${t === contactFilter.tag ? ' selected' : ''}>${esc(t)}</option>`).join('')}</select></div>
     <div class="card table-wrap"><table><thead><tr><th>Nome</th><th>Azienda</th><th>Contatti</th><th>Provenienza</th><th>Tag</th><th></th></tr></thead><tbody id="rows"></tbody></table></div>`;
  const draw = () => {
    const q = contactFilter.q.toLowerCase();
    const rows = list.filter(c => (!contactFilter.tag || (c.tags || []).includes(contactFilter.tag)) && (!q || [c.first_name, c.last_name, c.company, c.email, c.phone].join(' ').toLowerCase().includes(q)));
    $('#rows').innerHTML = rows.map(c => `<tr class="click" data-id="${c.id}"><td><strong>${cname(c)}</strong></td><td>${esc(c.company)}</td><td class="small">${esc(c.email)}<br>${esc(c.phone)}</td><td>${esc(c.source)}</td><td>${tags(c.tags)}</td><td>${avatar(c.owner_id)}</td></tr>`).join('') || '<tr><td colspan="6" class="empty">Nessun contatto corrisponde alla ricerca</td></tr>';
    $$('#rows tr.click').forEach(r => r.onclick = () => { go('#/contatti/' + r.dataset.id); });
  };
  $('#q').oninput = e => { contactFilter.q = e.target.value; draw(); };
  $('#tagf').onchange = e => { contactFilter.tag = e.target.value; draw(); };
  $('#new').onclick = () => formModal('Nuovo contatto', contactFields(), { owner_id: S.me, tags: [] }, async v => { const c = await api('contacts', 'POST', v); go('#/contatti/' + c.id); });
  draw();
};
async function contactDetail(id) {
  const d = await api(`contacts/${id}/full`), c = d.contact;
  const info = [['Email', c.email], ['Telefono', c.phone], ['Azienda', c.company], ['Provenienza', c.source], ['Nascita', c.birthday && day(c.birthday)], ['Creato', day(c.created_at)]];
  view.innerHTML = head(`${c.first_name} ${c.last_name || ''}`, c.company || '', '<a class="btn" href="#/contatti">← Tutti i contatti</a><button id="edit">Modifica</button>') + `
  <div class="cols3">
    <div class="card"><h3>Scheda</h3>${info.filter(x => x[1]).map(([l, v]) => `<p class="small"><span class="muted">${l}</span><br>${esc(v)}</p>`).join('')}
      <p>${tags(c.tags) || '<span class="muted small">Nessun tag</span>'}</p><p class="small muted">Assegnato a ${avatar(c.owner_id)} ${esc(user(c.owner_id)?.name || 'nessuno')}</p></div>
    <div class="card"><h3>Cronologia</h3>
      <form id="note" class="composer" style="padding:0 0 12px;border:0"><textarea placeholder="Scrivi una nota…" required></textarea><button class="primary">Aggiungi</button></form>
      <ul class="plain">${d.activities.map(a => `<li><span class="nowrap muted small">${dt(a.created_at)}</span><span><span class="pill">${esc(a.type)}</span> ${esc(a.text)}</span></li>`).join('')}</ul></div>
    <div class="grid">
      <div class="card"><h3>Opportunità</h3>${d.opportunities.map(o => `<p><strong>${esc(o.title)}</strong><br><span class="small">${eur(o.value)} · <span class="pill">${esc(stage(o.stage_id)?.name)}</span></span></p>`).join('') || '<p class="muted small">Nessuna</p>'}<button id="opp" class="mini">+ Opportunità</button></div>
      <div class="card"><h3>Appuntamenti</h3>${d.appointments.map(a => `<p class="small">${dt(a.start_at)} — ${esc(a.title)} <span class="pill">${esc(a.status)}</span></p>`).join('') || '<p class="muted small">Nessuno</p>'}</div>
      <div class="card"><h3>Attività</h3>${d.tasks.map(t => `<p class="small"><label><input type="checkbox" data-task="${t.id}"${t.done ? ' checked' : ''}> ${esc(t.title)}</label> <span class="muted">· ${dt(t.due_at)}</span></p>`).join('') || '<p class="muted small">Nessuna</p>'}<button id="task" class="mini">+ Attività</button></div>
      <div class="card"><h3>Conversazioni</h3>${d.conversations.map(v => `<p class="small"><a href="#/inbox/${v.id}">${esc(v.channel)}</a>${v.unread ? ` <span class="badge">${v.unread}</span>` : ''}</p>`).join('') || '<p class="muted small">Nessuna</p>'}<button id="chat" class="mini">+ Scrivi</button></div>
      <div class="card"><h3>Corsi e portale</h3>${d.enrollments.map(e => `<p class="small"><a href="#/corsi/${e.course_id}">${esc(e.course)}</a>${e.completed_at ? ' <span class="pill ok">completato</span>' : ''}</p>`).join('')}
        ${d.member ? `<p class="small">${d.member.points} punti · ${publicLink('/p/portale/' + d.member.token)}</p>` : '<p class="muted small">Nessun accesso al portale</p><button id="invite" class="mini">Dai accesso</button>'}</div>
      ${d.runs.length ? `<div class="card"><h3>Automazioni</h3>${d.runs.map(r => `<p class="small"><a href="#/automazioni/${r.workflow_id}">${esc(r.workflow)}</a> ${runPill(r.status)}</p>`).join('')}</div>` : ''}
    </div>
  </div>`;
  $('#edit').onclick = () => formModal('Modifica contatto', contactFields(), c, async v => { await api('contacts/' + id, 'PUT', v); refresh(); }, async () => { await api('contacts/' + id, 'DELETE'); go('#/contatti'); });
  $('#note').onsubmit = guard(async e => { e.preventDefault(); await api(`contacts/${id}/note`, 'POST', { text: $('#note textarea').value }); refresh(); });
  if ($('#invite')) $('#invite').onclick = guard(async () => { await api('members', 'POST', { contact_id: Number(id) }); toast('Accesso al portale attivato'); refresh(); });
  $('#opp').onclick = () => oppModal({ contact_id: Number(id), owner_id: S.me, stage_id: S.stages[0].id, value: 0 });
  $('#task').onclick = () => formModal('Nuova attività', [{ k: 'title', label: 'Cosa c\'è da fare', required: true }, { k: 'due_at', label: 'Entro', type: 'datetime-local' }, { k: 'owner_id', label: 'Chi', type: 'select', options: userOpts(), num: true }], { owner_id: S.me }, async v => { await api('tasks', 'POST', { ...v, contact_id: Number(id), done: 0 }); refresh(); });
  $('#chat').onclick = () => formModal('Nuova conversazione', [{ k: 'channel', label: 'Canale', type: 'select', options: CHANNELS.map(x => [x, x]) }], {}, async v => { const cv = await api('conversations', 'POST', { contact_id: Number(id), channel: v.channel }); go('#/inbox/' + cv.id); });
  $$('[data-task]').forEach(el => el.onchange = guard(async () => { await api('tasks/' + el.dataset.task, 'PUT', { done: el.checked ? 1 : 0 }); }));
}

// ---------- pipeline ----------
async function oppModal(o) {
  const contacts = await api('contacts');
  formModal(o.id ? 'Modifica opportunità' : 'Nuova opportunità', [
    { k: 'title', label: 'Titolo', required: true }, { k: 'contact_id', label: 'Contatto', type: 'select', options: contacts.map(c => [c.id, `${c.first_name} ${c.last_name || ''}`]), num: true },
    { k: 'value', label: 'Valore (€)', type: 'number', num: true }, { k: 'stage_id', label: 'Fase', type: 'select', options: stageOpts(), num: true }, { k: 'owner_id', label: 'Responsabile', type: 'select', options: userOpts(), num: true },
  ], o, async v => { await api(o.id ? 'opportunities/' + o.id : 'opportunities', o.id ? 'PUT' : 'POST', v); refresh(); }, o.id && (async () => { await api('opportunities/' + o.id, 'DELETE'); refresh(); }));
}
const stageFields = [{ k: 'name', label: 'Nome della fase', required: true }, { k: 'kind', label: 'Tipo', type: 'select', options: [['open', 'Aperta'], ['won', 'Vinta'], ['lost', 'Persa']] }, { k: 'color', label: 'Colore', type: 'color' }, { k: 'position', label: 'Posizione', type: 'number', num: true }];
routes.pipeline = async () => {
  const [opps, contacts] = await Promise.all([api('opportunities'), api('contacts')]);
  S.stages = await api('stages');
  const cn = Object.fromEntries(contacts.map(c => [c.id, `${c.first_name} ${c.last_name || ''}`.trim()]));
  const open = opps.filter(o => stage(o.stage_id)?.kind === 'open');
  view.innerHTML = head('Pipeline di vendita', `${open.length} opportunità aperte · ${eur(open.reduce((a, o) => a + o.value, 0))} di fatturato potenziale`, '<button id="newstage">+ Fase</button><button class="primary" id="new">+ Nuova opportunità</button>') +
    `<div class="board">${S.stages.map(s => { const os = opps.filter(o => o.stage_id === s.id); return `<div class="col" data-stage="${s.id}"><div class="col-head" data-edit="${s.id}" title="Modifica fase"><span><i class="dot" style="background:${esc(s.color)}"></i>${esc(s.name)}</span><span class="muted small">${os.length}</span></div><div class="col-sum">${eur(os.reduce((a, o) => a + o.value, 0))}</div>
      ${os.map(o => `<div class="opp" draggable="true" data-id="${o.id}"><div class="t">${esc(o.title)}</div><div class="small muted">${esc(cn[o.contact_id] || '')}</div><div class="row"><strong>${eur(o.value)}</strong>${avatar(o.owner_id)}</div></div>`).join('')}</div>`; }).join('')}</div>
     <p class="muted small">Trascina una scheda per cambiarle fase. Lo spostamento finisce nella cronologia del contatto e può far partire un'automazione.</p>`;
  $('#new').onclick = () => oppModal({ owner_id: S.me, stage_id: S.stages[0].id, value: 0 });
  $('#newstage').onclick = () => formModal('Nuova fase', stageFields, { kind: 'open', color: '#64748b', position: S.stages.length }, async v => { await api('stages', 'POST', v); refresh(); });
  $$('[data-edit]').forEach(h => h.onclick = () => { const s = stage(h.dataset.edit); formModal('Modifica fase', stageFields, s, async v => { await api('stages/' + s.id, 'PUT', v); refresh(); }, async () => { await api('stages/' + s.id, 'DELETE'); refresh(); }); });
  $$('.opp').forEach(el => {
    el.ondragstart = e => e.dataTransfer.setData('text/plain', el.dataset.id);
    el.onclick = () => oppModal(opps.find(o => o.id === Number(el.dataset.id)));
  });
  $$('.col').forEach(col => {
    col.ondragover = e => { e.preventDefault(); col.classList.add('over'); };
    col.ondragleave = () => col.classList.remove('over');
    col.ondrop = guard(async e => { e.preventDefault(); await api(`opportunities/${e.dataTransfer.getData('text/plain')}/move`, 'POST', { stage_id: Number(col.dataset.stage) }); refresh(); });
  });
};

// ---------- conversazioni ----------
const CHANNELS = ['whatsapp', 'email', 'sms', 'instagram', 'facebook'];
let inboxFilter = 'tutte';
routes.inbox = async id => {
  const list = await api('conversations');
  const shown = list.filter(v => inboxFilter === 'tutte' || (inboxFilter === 'mie' ? v.assigned_id === S.me : v.unread > 0));
  const cur = id ? await api('conversations/' + id) : null;
  if (cur) { const l = list.find(v => v.id === Number(id)); if (l) l.unread = 0; }
  view.innerHTML = head('Conversazioni', 'Una casella sola per WhatsApp, email, SMS e social') + `
  <div class="card inbox">
    <div class="conv-list"><div class="tabs" style="margin:0;padding:0 8px">${['tutte', 'mie', 'non lette'].map(f => `<button data-f="${f}" class="${f === inboxFilter ? 'on' : ''}">${f}</button>`).join('')}</div>
      ${shown.map(v => `<div class="conv${cur && v.id === Number(id) ? ' on' : ''}" data-id="${v.id}"><div class="top"><span>${esc(v.contact)}</span>${v.unread ? `<span class="badge">${v.unread}</span>` : avatar(v.assigned_id)}</div><div class="ch">${esc(v.channel)} · ${dt(v.last_at)}</div><div class="last">${esc(v.last_body || 'Nessun messaggio')}</div></div>`).join('') || '<div class="empty">Nessuna conversazione</div>'}</div>
    <div class="thread">${cur ? `
      <div class="thread-head"><strong><a href="#/contatti/${cur.conversation.contact_id}">${esc(cur.conversation.contact)}</a></strong><span class="ch">${esc(cur.conversation.channel)}</span><span class="sp"></span>
        <label class="small muted">Assegnata a <select id="assign">${userOpts().map(([v, l]) => `<option value="${v}"${String(cur.conversation.assigned_id ?? '') === String(v) ? ' selected' : ''}>${esc(l)}</option>`).join('')}</select></label></div>
      <div class="msgs" id="msgs">${cur.messages.map(m => `<div class="msg ${m.direction}">${esc(m.body)}<small>${m.direction === 'out' ? (m.author === 'auto' ? 'Automazione' : esc(user(m.author)?.name || 'Operatore')) + ' · ' : ''}${dt(m.created_at)}</small></div>`).join('') || '<div class="empty">Scrivi il primo messaggio</div>'}</div>
      <form class="composer" id="send"><textarea placeholder="Scrivi una risposta…  (Invio per inviare)" required></textarea><button class="primary">Invia</button><button type="button" id="sim" title="In questa versione dimostrativa i canali non sono collegati: questo pulsante inserisce un messaggio come se lo avesse scritto il cliente">Simula risposta cliente</button></form>` : '<div class="empty" style="margin:auto">Scegli una conversazione a sinistra</div>'}</div>
  </div>
  <p class="muted small">Versione dimostrativa: i messaggi restano dentro il CRM, non partono davvero su WhatsApp o email.</p>`;
  $$('[data-f]').forEach(b => b.onclick = () => { inboxFilter = b.dataset.f; refresh(); });
  $$('.conv').forEach(el => el.onclick = () => { go('#/inbox/' + el.dataset.id); });
  if (!cur) return;
  const box = $('#msgs'); box.scrollTop = box.scrollHeight;
  const ta = $('#send textarea');
  const send = guard(async direction => { if (!ta.value.trim()) return; await api(`conversations/${id}/messages`, 'POST', { body: ta.value, direction, author: S.me }); refresh(); });
  $('#send').onsubmit = e => { e.preventDefault(); send('out'); };
  ta.onkeydown = e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send('out'); } };
  $('#sim').onclick = () => { if (!ta.value.trim()) ta.value = 'Perfetto, grazie! Quando possiamo sentirci?'; send('in'); };
  $('#assign').onchange = guard(async e => { await api('conversations/' + id, 'PUT', { assigned_id: Number(e.target.value) || null }); toast('Conversazione assegnata'); });
};

// ---------- calendario ----------
let weekStart = (() => { const d = new Date(); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() - ((d.getDay() + 6) % 7)); return d; })();
const DAYS = [[1, 'Lun'], [2, 'Mar'], [3, 'Mer'], [4, 'Gio'], [5, 'Ven'], [6, 'Sab'], [0, 'Dom']];
routes.calendario = async () => {
  const [appts, cals, contacts] = await Promise.all([api('appointments'), api('calendars'), api('contacts')]);
  const cn = Object.fromEntries(contacts.map(c => [c.id, `${c.first_name} ${c.last_name || ''}`.trim()]));
  const days = [...Array(7)].map((_, i) => { const d = new Date(weekStart); d.setDate(d.getDate() + i); return d; });
  view.innerHTML = head('Calendario', `Settimana dal ${day(iso(days[0]))} al ${day(iso(days[6]))}`, '<button id="prev">←</button><button id="today">Oggi</button><button id="next">→</button><button class="primary" id="new">+ Appuntamento</button>') + `
  <div class="week">${days.map(d => { const k = iso(d); return `<div class="day${k === iso(new Date()) ? ' today' : ''}"><h4>${d.toLocaleDateString('it-IT', { weekday: 'short', day: 'numeric', month: 'short' })}</h4>
    ${appts.filter(a => a.start_at.slice(0, 10) === k).map(a => `<div class="appt ${esc(a.status)}" data-id="${a.id}"><strong>${hm(a.start_at)}</strong> ${esc(cn[a.contact_id] || '')}<div class="small muted">${esc(a.title)}</div></div>`).join('')}</div>`; }).join('')}</div>
  <div class="head" style="margin-top:24px"><h2 style="margin:0">Tipi di prenotazione</h2><span class="sp"></span><button id="newcal">+ Nuovo tipo</button></div>
  <div class="grid two">${cals.map(c => `<div class="card"><div class="head" style="margin-bottom:6px"><h2 style="margin:0">${esc(c.name)}</h2><span class="sp"></span><button class="mini" data-cal="${c.id}">Modifica</button></div>
    <p class="small muted">${esc(c.description)}</p><p class="small">${c.duration} minuti · ${DAYS.filter(([n]) => (c.days || []).includes(n)).map(x => x[1]).join(', ')} · ${c.start_hour}:00–${c.end_hour}:00 · ${avatar(c.owner_id)}</p>
    <p class="small">Pagina pubblica di prenotazione:<br>${publicLink('/p/prenota/' + c.slug)}</p></div>`).join('')}</div>`;
  const shift = n => () => { weekStart.setDate(weekStart.getDate() + n); refresh(); };
  $('#prev').onclick = shift(-7); $('#next').onclick = shift(7);
  $('#today').onclick = () => { const d = new Date(); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() - ((d.getDay() + 6) % 7)); weekStart = d; refresh(); };
  $('#new').onclick = () => formModal('Nuovo appuntamento', [
    { k: 'contact_id', label: 'Contatto', type: 'select', options: contacts.map(c => [c.id, cn[c.id]]), num: true }, { k: 'title', label: 'Titolo', required: true },
    { k: 'start_at', label: 'Inizio', type: 'datetime-local', required: true }, { k: 'minutes', label: 'Durata (minuti)', type: 'number', num: true }, { k: 'notes', label: 'Note', type: 'textarea' },
  ], { minutes: 30, title: 'Appuntamento' }, async v => {
    const end = new Date(new Date(v.start_at).getTime() + (v.minutes || 30) * 60000);
    await api('appointments', 'POST', { contact_id: v.contact_id, title: v.title, notes: v.notes, start_at: v.start_at, end_at: `${iso(end)}T${pad(end.getHours())}:${pad(end.getMinutes())}:00`, status: 'confermato' }); refresh();
  });
  $$('.appt').forEach(el => el.onclick = () => { const a = appts.find(x => x.id === Number(el.dataset.id)); formModal(`${cn[a.contact_id] || ''} — ${dt(a.start_at)}`, [{ k: 'title', label: 'Titolo' }, { k: 'status', label: 'Stato', type: 'select', options: ['confermato', 'completato', 'non presentato', 'annullato'].map(x => [x, x]) }, { k: 'notes', label: 'Note', type: 'textarea' }], a, async v => { await api('appointments/' + a.id, 'PUT', v); refresh(); }, async () => { await api('appointments/' + a.id, 'DELETE'); refresh(); }); });
  const calModal = c => formModal(c.id ? 'Modifica tipo di prenotazione' : 'Nuovo tipo di prenotazione', [
    { k: 'name', label: 'Nome', required: true }, { k: 'description', label: 'Descrizione', type: 'textarea' }, { k: 'duration', label: 'Durata (minuti)', type: 'number', num: true },
    { k: 'start_hour', label: 'Dalle ore', type: 'number', num: true }, { k: 'end_hour', label: 'Alle ore', type: 'number', num: true },
    ...DAYS.map(([n, l]) => ({ k: 'd' + n, label: l, type: 'checkbox' })),
    { k: 'owner_id', label: 'Operatore', type: 'select', options: userOpts(), num: true }, { k: 'stage_id', label: 'Alla prenotazione sposta in fase', type: 'select', options: [['', '— non spostare —'], ...stageOpts()], num: true },
  ], { ...c, ...Object.fromEntries(DAYS.map(([n]) => ['d' + n, (c.days || []).includes(n)])) }, async v => {
    const body = { ...v, days: DAYS.map(x => x[0]).filter(n => v['d' + n]) };
    await api(c.id ? 'calendars/' + c.id : 'calendars', c.id ? 'PUT' : 'POST', body); refresh();
  }, c.id && (async () => { await api('calendars/' + c.id, 'DELETE'); refresh(); }));
  $('#newcal').onclick = () => calModal({ duration: 30, start_hour: 9, end_hour: 18, days: [1, 2, 3, 4, 5], owner_id: S.me });
  $$('[data-cal]').forEach(b => b.onclick = () => calModal(cals.find(c => c.id === Number(b.dataset.cal))));
};

// ---------- moduli e pagine ----------
const FIELD_KEYS = [['first_name', 'Nome'], ['last_name', 'Cognome'], ['email', 'Email'], ['phone', 'Telefono'], ['company', 'Azienda']];
const BLOCKS = { hero: 'Titolo grande', testo: 'Testo', immagine: 'Immagine', bottone: 'Bottone', modulo: 'Modulo di contatto' };
let formsTab = 'moduli';
routes.moduli = async arg => {
  const [forms, pages] = await Promise.all([api('forms'), api('pages')]);
  if (arg && arg.startsWith('m')) return formEditor(forms.find(f => f.id === Number(arg.slice(1))));
  if (arg && arg.startsWith('p')) return pageEditor(pages.find(p => p.id === Number(arg.slice(1))), forms);
  view.innerHTML = head('Moduli e pagine', 'Chi compila un modulo diventa subito un contatto nella pipeline', `<button class="primary" id="new">+ ${formsTab === 'moduli' ? 'Nuovo modulo' : 'Nuova pagina'}</button>`) +
    `<div class="tabs">${[['moduli', 'Moduli'], ['pagine', 'Pagine']].map(([k, l]) => `<button data-tab="${k}" class="${k === formsTab ? 'on' : ''}">${l}</button>`).join('')}</div>
     <div class="grid two">${formsTab === 'moduli'
      ? forms.map(f => `<div class="card"><h2><a href="#/moduli/m${f.id}">${esc(f.name)}</a></h2><p class="small muted">${(f.fields || []).map(x => esc(x.label)).join(' · ')}</p><p class="small">Pagina pubblica:<br>${publicLink('/p/modulo/' + f.slug)}</p></div>`).join('') || '<div class="card empty">Nessun modulo</div>'
      : pages.map(p => `<div class="card"><h2><a href="#/moduli/p${p.id}">${esc(p.title)}</a> ${p.published ? '<span class="pill ok">pubblicata</span>' : '<span class="pill">bozza</span>'}</h2><p class="small muted">${(p.blocks || []).map(b => esc(BLOCKS[b.type])).join(' · ')}</p><p class="small">Indirizzo:<br>${publicLink('/p/pagina/' + p.slug)}</p></div>`).join('') || '<div class="card empty">Nessuna pagina</div>'}</div>`;
  $$('[data-tab]').forEach(b => b.onclick = () => { formsTab = b.dataset.tab; refresh(); });
  $('#new').onclick = guard(async () => {
    if (formsTab === 'moduli') { const f = await api('forms', 'POST', { name: 'Nuovo modulo', stage_id: S.stages[0].id, fields: [{ key: 'first_name', label: 'Nome', type: 'text', required: 1 }, { key: 'email', label: 'Email', type: 'email', required: 1 }] }); go('#/moduli/m' + f.id); }
    else { const p = await api('pages', 'POST', { title: 'Nuova pagina', published: 0, blocks: [{ type: 'hero', title: 'Il tuo titolo', subtitle: 'Una riga che spiega cosa offri' }] }); go('#/moduli/p' + p.id); }
  });
};
async function formEditor(f) {
  if (!f) throw new Error('Modulo non trovato');
  const subs = await api(`forms/${f.id}/submissions`);
  f.fields = f.fields || [];
  view.innerHTML = head(f.name, 'Campi del modulo e cosa succede a chi lo compila', '<a class="btn" href="#/moduli">← Tutti</a><button class="danger" id="del">Elimina</button><button class="primary" id="save">Salva</button>') + `
  <div class="split"><div><div class="card" style="margin-bottom:14px" id="meta">${[{ k: 'name', label: 'Nome del modulo' }, { k: 'tag', label: 'Tag da assegnare a chi compila' }, { k: 'stage_id', label: 'Crea un\'opportunità in fase', type: 'select', options: [['', '— nessuna —'], ...stageOpts()], num: true }, { k: 'thanks', label: 'Messaggio di ringraziamento', type: 'textarea' }].map(x => fieldHtml(x, f[x.k])).join('')}</div>
    <h3>Campi</h3><div id="fields"></div></div>
  <div class="grid"><div class="card"><h2>Pagina pubblica</h2><p class="small">${publicLink('/p/modulo/' + f.slug)}</p></div>
    <div class="card"><h2>Risposte ricevute (${subs.length})</h2><ul class="plain">${subs.map(s => `<li><span class="nowrap muted small">${dt(s.created_at)}</span><span><a href="#/contatti/${s.contact_id}">${esc(s.contact)}</a><br><span class="small muted">${Object.values(s.data).filter(Boolean).map(esc).join(' · ')}</span></span></li>`).join('') || '<li class="muted">Ancora nessuna</li>'}</ul></div></div></div>`;
  listEditor($('#fields'), f.fields, {
    title: x => x.label || 'Campo',
    fields: () => [{ k: 'label', label: 'Etichetta' }, { k: 'key', label: 'Salva in', type: 'select', options: [...FIELD_KEYS, ['messaggio', 'Messaggio (cronologia)'], ['altro', 'Altro (cronologia)']] }, { k: 'type', label: 'Tipo', type: 'select', options: [['text', 'Testo'], ['email', 'Email'], ['tel', 'Telefono'], ['textarea', 'Testo lungo']] }, { k: 'required', label: 'Obbligatorio', type: 'checkbox' }],
    blank: () => ({ label: 'Nuovo campo', key: 'altro', type: 'text', required: 0 }),
  });
  $('#save').onclick = guard(async () => { await api('forms/' + f.id, 'PUT', { ...collect($('#meta')), fields: f.fields }); toast('Modulo salvato'); refresh(); });
  $('#del').onclick = guard(async () => { if (await ask('Eliminare il modulo?')) { await api('forms/' + f.id, 'DELETE'); go('#/moduli'); } });
}
async function pageEditor(p, forms) {
  if (!p) throw new Error('Pagina non trovata');
  p.blocks = p.blocks || [];
  view.innerHTML = head(p.title, 'Componi la pagina con i blocchi, dall\'alto in basso', '<a class="btn" href="#/moduli">← Tutte</a><button class="danger" id="del">Elimina</button><button class="primary" id="save">Salva</button>') + `
  <div class="split"><div><div class="card" style="margin-bottom:14px" id="meta">${[{ k: 'title', label: 'Titolo della pagina' }, { k: 'slug', label: 'Indirizzo (ultima parte)' }, { k: 'published', label: 'Pubblicata', type: 'checkbox' }].map(x => fieldHtml(x, p[x.k])).join('')}</div>
    <h3>Blocchi</h3><div id="blocks"></div></div>
  <div class="card"><h2>Anteprima</h2><p class="small">${p.published ? publicLink('/p/pagina/' + p.slug) : 'La pagina è una bozza: pubblicala per renderla raggiungibile.'}</p></div></div>`;
  listEditor($('#blocks'), p.blocks, {
    title: b => BLOCKS[b.type], types: BLOCKS,
    fields: b => ({ hero: [{ k: 'title', label: 'Titolo', wide: true }, { k: 'subtitle', label: 'Sottotitolo', wide: true }], testo: [{ k: 'text', label: 'Testo', type: 'textarea' }], immagine: [{ k: 'url', label: 'Indirizzo dell\'immagine (https://…)', wide: true }, { k: 'alt', label: 'Descrizione', wide: true }], bottone: [{ k: 'label', label: 'Scritta' }, { k: 'url', label: 'Collegamento' }], modulo: [{ k: 'form_id', label: 'Quale modulo', type: 'select', options: forms.map(f => [f.id, f.name]), num: true }] }[b.type]),
    blank: t => ({ type: t, ...(t === 'modulo' ? { form_id: forms[0]?.id } : {}) }),
  });
  $('#save').onclick = guard(async () => { await api('pages/' + p.id, 'PUT', { ...collect($('#meta')), blocks: p.blocks }); toast('Pagina salvata'); refresh(); });
  $('#del').onclick = guard(async () => { if (await ask('Eliminare la pagina?')) { await api('pages/' + p.id, 'DELETE'); go('#/moduli'); } });
}

// ---------- avvio ----------
async function start() {
  [S.users, S.stages] = await Promise.all([api('users'), api('stages')]);
  if (!user(S.me)) S.me = S.users[0]?.id;
  $('#me').innerHTML = S.users.map(u => `<option value="${u.id}"${u.id === S.me ? ' selected' : ''}>${esc(u.name)}</option>`).join('');
  $('#me').onchange = e => { S.me = Number(e.target.value); try { localStorage.setItem('cordata.me', S.me); } catch { /* facoltativo */ } refresh(); };
  $('#reset').onclick = guard(async () => { if (await ask('Cancellare tutto e ricaricare i dati di esempio?')) { await api('reset', 'POST'); [S.users, S.stages] = await Promise.all([api('users'), api('stages')]); toast('Dati di esempio ripristinati'); refresh(); } });
  window.addEventListener('hashchange', route);
  route();
}
