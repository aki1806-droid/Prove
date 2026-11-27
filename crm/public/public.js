// Pagine viste dai clienti: /p/prenota/:slug, /p/modulo/:slug, /p/pagina/:slug, /p/area/:token
const root = document.getElementById('root');
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const safeUrl = u => (/^(https?:\/\/|\/)/i.test(String(u || '')) ? u : '#');
const dt = s => new Date(s).toLocaleString('it-IT', { weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' });
const pad = n => String(n).padStart(2, '0');
const iso = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const FOOT = '<footer>Pagina creata con Cordata CRM</footer>';

async function api(path, method = 'GET', body) {
  const r = await fetch('/api/public/' + path, { method, headers: body ? { 'Content-Type': 'application/json' } : {}, body: body ? JSON.stringify(body) : undefined });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(j.error || 'Errore ' + r.status);
  return j;
}
const fieldsHtml = fields => fields.map(f => `<label class="f"><span>${esc(f.label)}${f.required ? ' *' : ''}</span>${f.type === 'textarea' ? `<textarea name="${esc(f.key)}"${f.required ? ' required' : ''}></textarea>` : `<input type="${esc(f.type || 'text')}" name="${esc(f.key)}"${f.required ? ' required' : ''}>`}</label>`).join('');
const formData = form => Object.fromEntries(new FormData(form));

// Disegna un modulo dentro `el` e lo invia; al termine mostra il ringraziamento.
function mountForm(el, slug, form) {
  el.innerHTML = `<form class="card"><h2>${esc(form.name)}</h2>${fieldsHtml(form.fields || [])}<button class="primary">Invia</button><p class="small" data-err style="color:var(--bad)"></p></form>`;
  el.querySelector('form').onsubmit = async e => {
    e.preventDefault();
    try { const r = await api('form/' + slug, 'POST', formData(e.target)); el.innerHTML = `<div class="card"><h2>Fatto</h2><p>${esc(r.thanks)}</p></div>`; }
    catch (err) { el.querySelector('[data-err]').textContent = err.message; }
  };
}

const pages = {
  async modulo(slug) {
    const f = await api('form/' + slug);
    document.title = f.name;
    root.innerHTML = `<div id="f"></div>${FOOT}`;
    mountForm(document.getElementById('f'), slug, f);
  },

  async pagina(slug) {
    const p = await api('page/' + slug);
    document.title = p.title;
    root.innerHTML = p.blocks.map((b, i) => ({
      hero: `<div class="hero block"><h1>${esc(b.title)}</h1><p>${esc(b.subtitle)}</p></div>`,
      testo: `<p class="block" style="white-space:pre-wrap;font-size:1.05rem">${esc(b.text)}</p>`,
      immagine: `<div class="block"><img src="${esc(safeUrl(b.url))}" alt="${esc(b.alt)}"></div>`,
      bottone: `<p class="block"><a class="btn primary" href="${esc(safeUrl(b.url))}">${esc(b.label || 'Continua')}</a></p>`,
      modulo: `<div class="block" data-form="${i}"></div>`,
    }[b.type] || '')).join('') + FOOT;
    p.blocks.forEach((b, i) => { if (b.type === 'modulo' && b.form) mountForm(root.querySelector(`[data-form="${i}"]`), b.form.slug, b.form); });
  },

  async prenota(slug) {
    const cal = await api('calendar/' + slug);
    document.title = cal.name;
    const days = [];
    for (let i = 0, d = new Date(); days.length < 14 && i < 60; i++, d = new Date(d.getTime() + 86400000)) if ((cal.days || []).includes(d.getDay())) days.push(new Date(d));
    let chosen = null;
    root.innerHTML = `<div class="hero"><h1>${esc(cal.name)}</h1><p>${esc(cal.description)} · ${cal.duration} minuti</p></div>
      <div class="card"><h2>1. Scegli il giorno</h2><div class="slots" id="days" style="grid-template-columns:repeat(auto-fill,minmax(110px,1fr))">${days.map(d => `<button type="button" data-d="${iso(d)}">${d.toLocaleDateString('it-IT', { weekday: 'short', day: 'numeric', month: 'short' })}</button>`).join('')}</div>
      <h2>2. Scegli l'orario</h2><div class="slots" id="slots"><span class="muted">Scegli prima un giorno</span></div>
      <form id="bk"><h2>3. I tuoi dati</h2>${fieldsHtml([{ key: 'first_name', label: 'Nome', required: 1 }, { key: 'last_name', label: 'Cognome' }, { key: 'email', label: 'Email', type: 'email', required: 1 }, { key: 'phone', label: 'Telefono', type: 'tel' }, { key: 'notes', label: 'Note', type: 'textarea' }])}
      <button class="primary">Conferma la prenotazione</button><p class="small" id="err" style="color:var(--bad)"></p></form></div>${FOOT}`;
    const slotsEl = document.getElementById('slots'), err = document.getElementById('err');
    const pickDay = async btn => {
      root.querySelectorAll('#days button').forEach(b => b.classList.toggle('on', b === btn)); chosen = null;
      const list = await api(`calendar/${slug}/slots?date=${btn.dataset.d}`);
      slotsEl.innerHTML = list.map(s => `<button type="button" data-s="${s}">${s.slice(11, 16)}</button>`).join('') || '<span class="muted">Nessun orario libero in questo giorno</span>';
      return list.length;
    };
    document.getElementById('days').onclick = e => { if (e.target.dataset.d) pickDay(e.target); };
    slotsEl.onclick = e => { if (!e.target.dataset.s) return; chosen = e.target.dataset.s; slotsEl.querySelectorAll('button').forEach(b => b.classList.toggle('on', b === e.target)); err.textContent = ''; };
    document.getElementById('bk').onsubmit = async e => {
      e.preventDefault();
      if (!chosen) { err.textContent = 'Scegli un giorno e un orario.'; return; }
      try { const r = await api('calendar/' + slug, 'POST', { ...formData(e.target), start_at: chosen }); root.innerHTML = `<div class="hero"><h1>Prenotazione confermata</h1><p>Ti aspettiamo ${esc(dt(r.start_at))}.</p></div>${FOOT}`; }
      catch (ex) { err.textContent = ex.message; }
    };
    // si apre sul primo giorno che ha ancora orari liberi
    for (const btn of [...root.querySelectorAll('#days button')].slice(0, 7)) if (await pickDay(btn)) break;
  },

  async area(token) {
    const draw = v => {
      document.title = v.course.title;
      const done = new Set(v.completed), pct = v.lessons.length ? Math.round(100 * done.size / v.lessons.length) : 0;
      root.innerHTML = `<div class="hero"><p class="small">Area riservata di ${esc(v.member)}</p><h1>${esc(v.course.title)}</h1><p>${esc(v.course.description)}</p>
        <div class="progress" style="height:10px"><i style="width:${pct}%"></i></div><p class="small">${done.size} lezioni su ${v.lessons.length} completate</p></div>
        <h2>Lezioni</h2>${v.lessons.map((l, i) => `<details class="lesson"${!done.has(l.id) && v.lessons.findIndex(x => !done.has(x.id)) === i ? ' open' : ''}><summary><span>${done.has(l.id) ? '✅' : '◻️'}</span>${i + 1}. ${esc(l.title)}</summary>
          <div class="body">${esc(l.content)}${l.video_url ? `<p><a href="${esc(safeUrl(l.video_url))}" target="_blank" rel="noopener">Guarda il video</a></p>` : ''}<p><button data-lesson="${l.id}" data-done="${done.has(l.id) ? 0 : 1}" class="${done.has(l.id) ? '' : 'primary'}">${done.has(l.id) ? 'Segna come da rifare' : 'Ho completato la lezione'}</button></p></div></details>`).join('')}
        <h2 style="margin-top:28px">Comunità</h2><form id="np" class="composer" style="padding:0 0 12px;border:0"><textarea placeholder="Scrivi alla comunità…" required></textarea><button class="primary">Pubblica</button></form>
        ${v.posts.map(p => `<div class="post"><strong>${esc(p.author_name)}</strong><div>${esc(p.body)}</div>${p.comments.map(c => `<div class="cm"><strong>${esc(c.author_name)}</strong> ${esc(c.body)}</div>`).join('')}
          <form data-post="${p.id}" class="composer" style="padding:10px 0 0;border:0"><input placeholder="Rispondi…" required style="flex:1"><button>Invia</button></form></div>`).join('')}${FOOT}`;
      root.querySelectorAll('[data-lesson]').forEach(b => b.onclick = async () => draw(await api(`member/${token}/complete`, 'POST', { lesson_id: Number(b.dataset.lesson), done: b.dataset.done === '1' })));
      document.getElementById('np').onsubmit = async e => { e.preventDefault(); draw(await api(`member/${token}/post`, 'POST', { body: e.target.querySelector('textarea').value })); };
      root.querySelectorAll('[data-post]').forEach(f => f.onsubmit = async e => { e.preventDefault(); draw(await api(`member/${token}/comment`, 'POST', { post_id: Number(f.dataset.post), body: f.querySelector('input').value })); });
    };
    draw(await api('member/' + token));
  },
};

(async () => {
  const [, , kind, key] = location.pathname.split('/');
  try { if (!pages[kind]) throw new Error('Pagina non trovata'); await pages[kind](decodeURIComponent(key || '')); }
  catch (e) { root.innerHTML = `<div class="card empty">${esc(e.message)}</div>`; }
})();
