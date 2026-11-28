// Corsi e comunità visti dallo staff.
const bar = pct => `<span class="progress"><i style="width:${Math.max(0, Math.min(100, pct))}%"></i></span>`;
const tabsHtml = (tabs, cur) => `<div class="tabs">${tabs.map(([k, l]) => `<button data-tab="${k}" class="${k === cur ? 'on' : ''}">${esc(l)}</button>`).join('')}</div>`;
const DRIP = { libero: 'Tutte le lezioni subito', sequenziale: 'Una lezione dopo l\'altra', programmato: 'A giorni dall\'iscrizione' };
const courseFields = () => [
  { k: 'title', label: 'Titolo', required: true }, { k: 'description', label: 'Descrizione', type: 'textarea' }, { k: 'emoji', label: 'Simbolo (emoji)' }, { k: 'color', label: 'Colore', type: 'color' },
  { k: 'category', label: 'Categoria' }, { k: 'instructor', label: 'Docente' }, { k: 'price', label: 'Prezzo indicativo (€, 0 = gratuito)', type: 'number', num: true },
  { k: 'access', label: 'Chi può entrare', type: 'select', options: [['iscrizione', 'Solo chi viene iscritto dallo staff o da un\'automazione'], ['aperto', 'I membri si iscrivono da soli']] },
  { k: 'min_level', label: 'Livello minimo nella comunità', type: 'number', num: true }, { k: 'drip_mode', label: 'Rilascio delle lezioni', type: 'select', options: Object.entries(DRIP) },
  { k: 'certificate', label: 'Attestato al completamento', type: 'checkbox' }, { k: 'published', label: 'Pubblicato', type: 'checkbox' },
];

routes.corsi = async id => {
  if (id) return courseDetail(id);
  const list = await api('courses');
  view.innerHTML = head('Corsi', 'Percorsi a moduli con video, verifiche e attestato, dentro il portale dei clienti', '<button class="primary" id="new">+ Nuovo corso</button>') +
    `<div class="grid two">${list.map(c => `<div class="card course-card" style="border-top:4px solid ${esc(c.color || '#17695f')}"><h2><span class="emo">${esc(c.emoji || '📘')}</span> <a href="#/corsi/${c.id}">${esc(c.title)}</a></h2><p class="small muted">${esc(c.description)}</p>
      <p class="small">${c.published ? '<span class="pill ok">pubblicato</span>' : '<span class="pill">bozza</span>'} <span class="pill">${esc(DRIP[c.drip_mode] || '')}</span> ${c.min_level > 1 ? `<span class="pill warn">dal livello ${c.min_level}</span>` : ''} ${c.access === 'aperto' ? '<span class="pill">iscrizione libera</span>' : ''}</p>
      <div class="ministats"><span><b>${c.lessons}</b> lezioni</span><span><b>${c.enrolled}</b> iscritti</span><span><b>${c.enrolled ? Math.round(100 * c.completed / c.enrolled) : 0}%</b> completano</span></div></div>`).join('') || '<div class="card empty">Nessun corso</div>'}</div>`;
  $('#new').onclick = () => formModal('Nuovo corso', courseFields(), { emoji: '📘', color: '#17695f', access: 'iscrizione', min_level: 1, drip_mode: 'libero', certificate: 1, published: 0, price: 0 }, async v => { const c = await api('courses', 'POST', v); go('#/corsi/' + c.id); });
};

let courseTab = 'programma';
async function courseDetail(id) {
  const [d, contacts] = await Promise.all([api(`courses/${id}/detail`), api('contacts')]);
  const c = d.course;
  view.innerHTML = head(`${c.emoji || '📘'} ${c.title}`, c.description || '', '<a class="btn" href="#/corsi">← Tutti</a><button id="edit">Impostazioni</button>') +
    `<div class="ministats big"><span><b>${d.stats.enrolled}</b> iscritti</span><span><b>${d.stats.completed}</b> hanno completato</span><span><b>${d.stats.avg_progress}%</b> avanzamento medio</span><span><b>${d.questions.length}</b> domande</span><span class="pill">${esc(DRIP[c.drip_mode])}</span></div>` +
    tabsHtml([['programma', 'Programma'], ['iscritti', `Iscritti (${d.enrollments.length})`], ['statistiche', 'Statistiche'], ['domande', `Domande (${d.questions.length})`]], courseTab) + '<div id="tab"></div>';
  $$('[data-tab]').forEach(b => b.onclick = () => { courseTab = b.dataset.tab; refresh(); });
  $('#edit').onclick = () => formModal('Impostazioni del corso', courseFields(), c, async v => { await api('courses/' + id, 'PUT', v); refresh(); }, async () => { await api('courses/' + id, 'DELETE'); go('#/corsi'); });
  const tab = $('#tab');

  if (courseTab === 'programma') {
    // in memoria le domande dei quiz hanno le risposte su righe e la giusta numerata da 1
    const mods = d.modules.map(m => ({ ...m, lessons: m.lessons.map(l => ({ ...l, resources: l.resources || [], quiz: l.quiz ? { pass: l.quiz.pass, questions: (l.quiz.questions || []).map(q => ({ q: q.q, opts: (q.options || []).join('\n'), right: (q.correct || 0) + 1 })) } : null })) }));
    let sel = null; // {m, l} indici
    tab.innerHTML = `<div class="editor"><div class="card"><div class="head" style="margin-bottom:8px"><h2 style="margin:0">Moduli e lezioni</h2><span class="sp"></span><span id="cdirty" class="small muted"></span><button class="primary" id="savec">Salva programma</button></div><div id="tree"></div><button id="addm">+ Modulo</button></div><aside class="panel card" id="lp"></aside></div>`;
    const mark = () => { $('#cdirty').textContent = 'Modifiche non salvate'; };
    const icon = t => ({ video: '🎬', quiz: '📝' }[t] || '📄');
    const drawTree = () => {
      $('#tree').innerHTML = mods.map((m, mi) => `<div class="mod"><div class="mod-h${sel && sel.m === mi && sel.l === undefined ? ' sel' : ''}" data-m="${mi}"><b>${mi + 1}. ${esc(m.title)}</b><span class="sp"></span><span class="small muted">${m.lessons.length} lezioni</span></div>
        ${m.lessons.map((l, li) => `<div class="les${sel && sel.m === mi && sel.l === li ? ' sel' : ''}" data-m="${mi}" data-l="${li}"><span>${icon(l.type)}</span><span>${esc(l.title)}</span><span class="sp"></span>${l.published ? '' : '<span class="pill">bozza</span>'}${c.drip_mode === 'programmato' && l.drip_days ? `<span class="pill warn">giorno ${l.drip_days}</span>` : ''}<span class="small muted">${l.minutes || 0}′</span></div>`).join('')}
        <button class="mini" data-addl="${mi}">+ Lezione</button></div>`).join('') || '<p class="muted">Aggiungi il primo modulo.</p>';
    };
    const move = (arr, i, d2) => { const j = i + d2; if (j < 0 || j >= arr.length) return i; [arr[i], arr[j]] = [arr[j], arr[i]]; return j; };
    const drawPanel = () => {
      const p = $('#lp'); p.oninput = null;
      if (!sel || !mods[sel.m]) { p.innerHTML = '<h2>Programma</h2><p class="muted small">Scegli un modulo o una lezione per modificarli. Le verifiche hanno una soglia: chi non la supera non va avanti nei corsi sequenziali.</p>'; return; }
      const m = mods[sel.m], l = sel.l === undefined ? null : m.lessons[sel.l], obj = l || m;
      const acts = `<div class="actions" style="flex-wrap:wrap"><button class="mini" data-a="up">↑ Su</button><button class="mini" data-a="down">↓ Giù</button><span class="sp"></span><button class="mini danger" data-a="del">Elimina</button></div>`;
      if (!l) p.innerHTML = `<h2>Modulo</h2><div id="lf">${fieldHtml({ k: 'title', label: 'Titolo del modulo' }, m.title)}</div>${acts}`;
      else p.innerHTML = `<h2>${icon(l.type)} Lezione</h2><div id="lf">${[
        { k: 'title', label: 'Titolo' }, { k: 'type', label: 'Tipo', type: 'select', options: [['testo', 'Testo'], ['video', 'Video'], ['quiz', 'Verifica']] },
        ...(l.type === 'video' ? [{ k: 'video_url', label: 'Indirizzo del video' }] : []), { k: 'content', label: l.type === 'quiz' ? 'Introduzione alla verifica' : 'Contenuto', type: 'textarea' },
        { k: 'minutes', label: 'Durata (minuti)', type: 'number', num: true }, { k: 'drip_days', label: 'Disponibile dopo (giorni dall\'iscrizione)', type: 'number', num: true }, { k: 'published', label: 'Pubblicata', type: 'checkbox' },
      ].map(f => fieldHtml(f, l[f.k])).join('')}</div>
        ${l.type === 'quiz' ? `<h3>Verifica</h3><div id="qp">${fieldHtml({ k: 'pass', label: 'Soglia per superarla (%)', type: 'number', num: true }, l.quiz.pass)}</div><div id="qq"></div>` : ''}
        <h3>Materiali da scaricare</h3><div id="res"></div>${acts}`;
      $('#lf').oninput = e => { const el = e.target; if (!el.dataset.k) return; obj[el.dataset.k] = readValue(el); mark(); if (el.dataset.k === 'type') { if (l.type === 'quiz' && !l.quiz) l.quiz = { pass: 70, questions: [] }; drawPanel(); } };
      $('#lf').onchange = drawTree;
      if (l) {
        listEditor($('#res'), l.resources, { title: r => r.label || 'Materiale', onChange: mark, blank: () => ({ label: 'Nuovo materiale', url: 'https://' }), fields: () => [{ k: 'label', label: 'Nome' }, { k: 'url', label: 'Indirizzo' }] });
        if (l.type === 'quiz') {
          $('#qp').oninput = e => { l.quiz.pass = readValue(e.target); mark(); };
          listEditor($('#qq'), l.quiz.questions, { title: q => q.q || 'Domanda', onChange: mark, blank: () => ({ q: 'Nuova domanda', opts: 'Prima risposta\nSeconda risposta', right: 1 }), fields: () => [{ k: 'q', label: 'Domanda', wide: true }, { k: 'opts', label: 'Risposte, una per riga', type: 'textarea' }, { k: 'right', label: 'Numero della risposta giusta', type: 'number', num: true }] });
        }
      }
      $$('[data-a]', p).forEach(b => b.onclick = () => {
        const arr = l ? m.lessons : mods, i = l ? sel.l : sel.m, a = b.dataset.a;
        if (a === 'del') { arr.splice(i, 1); sel = null; } else { const j = move(arr, i, a === 'up' ? -1 : 1); if (l) sel.l = j; else sel.m = j; }
        mark(); drawTree(); drawPanel();
      });
    };
    press($('#tree'), e => {
      const add = e.target.closest('[data-addl]'), row = e.target.closest('[data-m]');
      if (add) { const mi = Number(add.dataset.addl); mods[mi].lessons.push({ title: 'Nuova lezione', type: 'testo', content: '', minutes: 5, published: 1, drip_days: 0, resources: [], quiz: null }); sel = { m: mi, l: mods[mi].lessons.length - 1 }; mark(); }
      else if (row) sel = { m: Number(row.dataset.m), l: row.dataset.l === undefined ? undefined : Number(row.dataset.l) };
      else return;
      drawTree(); drawPanel();
    });
    $('#addm').onclick = () => { mods.push({ title: 'Nuovo modulo', lessons: [] }); sel = { m: mods.length - 1 }; mark(); drawTree(); drawPanel(); };
    $('#savec').onclick = guard(async () => {
      const body = mods.map(m => ({ id: m.id, title: m.title, lessons: m.lessons.map(l => ({ ...l, quiz: l.type === 'quiz' ? { pass: Number(l.quiz?.pass) || 0, questions: (l.quiz?.questions || []).map(q => { const options = String(q.opts || '').split('\n').map(x => x.trim()).filter(Boolean); return { q: q.q, options, correct: Math.max(0, Math.min(options.length - 1, (Number(q.right) || 1) - 1)) }; }) } : null })) }));
      await api(`courses/${id}/structure`, 'PUT', { modules: body }); toast('Programma salvato'); refresh();
    });
    drawTree(); drawPanel();
  }

  if (courseTab === 'iscritti') {
    const free = contacts.filter(x => !d.enrollments.some(e => e.contact_id === x.id));
    tab.innerHTML = `<div class="card"><div class="add-row" style="margin-bottom:12px"><select id="who" style="flex:1;max-width:320px">${free.map(x => `<option value="${x.id}">${cname(x)}</option>`).join('')}</select><button class="primary" id="enroll"${free.length ? '' : ' disabled'}>Iscrivi</button></div>
      <div class="table-wrap"><table><thead><tr><th>Studente</th><th>Iscritto il</th><th>Avanzamento</th><th>Verifiche</th><th>Ultima attività</th><th></th></tr></thead><tbody>${d.enrollments.map(e => `<tr><td><a href="#/contatti/${e.contact_id}"><strong>${esc(e.contact)}</strong></a>${e.completed_at ? ' <span class="pill ok">completato</span>' : ''}</td><td class="small nowrap">${day(e.created_at)}</td>
        <td style="min-width:150px">${bar(e.progress)}<span class="small muted">${e.progress}%</span></td><td>${e.quiz_avg === null ? '—' : e.quiz_avg + '%'}</td><td class="small nowrap">${dt(e.last_activity)}</td>
        <td class="nowrap">${e.token ? publicLink('/p/portale/' + e.token) : ''} <button class="mini" data-reset="${e.id}">Azzera</button> <button class="mini danger" data-unenroll="${e.id}">Rimuovi</button></td></tr>`).join('') || '<tr><td colspan="6" class="empty">Nessun iscritto</td></tr>'}</tbody></table></div></div>`;
    $('#enroll').onclick = guard(async () => { await api(`courses/${id}/enroll`, 'POST', { contact_id: Number($('#who').value) }); refresh(); });
    $$('[data-unenroll]').forEach(b => b.onclick = guard(async () => { if (await ask('Rimuovere l\'iscrizione e l\'avanzamento?')) { await api('enrollments/' + b.dataset.unenroll, 'DELETE'); refresh(); } }));
    $$('[data-reset]').forEach(b => b.onclick = guard(async () => { if (await ask('Azzerare l\'avanzamento di questo studente?')) { await api(`enrollments/${b.dataset.reset}/reset`, 'POST'); refresh(); } }));
  }

  if (courseTab === 'statistiche') {
    const n = Math.max(1, d.stats.enrolled);
    tab.innerHTML = `<div class="card"><h2>Dove si fermano gli studenti</h2><p class="small muted">Quanti iscritti hanno completato ogni lezione, nell'ordine del programma: il punto in cui la barra si accorcia è la lezione da rivedere.</p>
      ${d.stats.funnel.map((l, i) => `<div class="bar-row" style="grid-template-columns:minmax(120px,280px) 1fr 130px"><span>${i + 1}. ${esc(l.title)}</span><div class="bar"><i style="width:${100 * l.done / n}%;background:${esc(c.color || 'var(--brand-2)')}"></i></div><span class="right nowrap">${l.done}/${d.stats.enrolled}${l.avg_score === null ? '' : ` · media ${l.avg_score}%`}</span></div>`).join('') || '<p class="muted">Nessuna lezione pubblicata.</p>'}</div>`;
  }

  if (courseTab === 'domande') {
    const lessons = d.modules.flatMap(m => m.lessons);
    tab.innerHTML = `<div class="card"><h2>Domande sotto le lezioni</h2>${d.questions.map(q => `<div class="post"><strong>${esc(q.author_name)}</strong> <span class="muted small">· ${esc(q.lesson)} · ${dt(q.created_at)}</span> <button class="mini danger" data-delq="${q.id}">✕</button><div>${esc(q.body)}</div></div>`).join('') || '<p class="muted">Nessuna domanda.</p>'}
      <form id="reply" class="composer" style="padding:12px 0 0;border:0;flex-wrap:wrap"><select id="rl">${lessons.map(l => `<option value="${l.id}">${esc(l.title)}</option>`).join('')}</select><textarea placeholder="Rispondi come staff sotto la lezione scelta…" required></textarea><button class="primary">Rispondi</button></form></div>`;
    $('#reply').onsubmit = guard(async e => { e.preventDefault(); await api('lesson_comments', 'POST', { lesson_id: Number($('#rl').value), body: $('#reply textarea').value, author_name: user(S.me)?.name }); refresh(); });
    $$('[data-delq]').forEach(b => b.onclick = guard(async () => { await api('lesson_comments/' + b.dataset.delq, 'DELETE'); refresh(); }));
  }
}

// ---------- comunità ----------
let commTab = 'bacheca', commChannel = 0;
const lvl = x => (x.staff ? '' : x.level ? `<span class="pill lvl">liv. ${x.level}</span>` : '');
routes.comunita = async () => {
  const [d, contacts] = await Promise.all([api('community'), api('contacts')]);
  const chName = Object.fromEntries(d.channels.map(c => [c.id, `${c.emoji || ''} ${c.name}`]));
  view.innerHTML = head(d.info.name, d.info.tagline, '<button id="cset">Nome e descrizione</button>') +
    `<div class="ministats big"><span><b>${d.stats.members}</b> membri</span><span><b>${d.stats.active}</b> attivi questa settimana</span><span><b>${d.stats.posts}</b> post</span><span><b>${d.stats.comments}</b> commenti</span></div>` +
    tabsHtml([['bacheca', 'Bacheca'], ['membri', `Membri (${d.members.length})`], ['classifica', 'Punti e livelli'], ['eventi', `Eventi (${d.events.length})`], ['canali', 'Canali']], commTab) + '<div id="tab"></div>';
  $$('[data-tab]').forEach(b => b.onclick = () => { commTab = b.dataset.tab; refresh(); });
  $('#cset').onclick = () => formModal('Comunità', [{ k: 'name', label: 'Nome', required: true }, { k: 'tagline', label: 'Descrizione breve' }], d.info, async v => { await api('community/settings', 'PUT', v); refresh(); });
  const tab = $('#tab');

  if (commTab === 'bacheca') {
    const posts = d.posts.filter(p => !commChannel || p.channel_id === commChannel);
    const cmHtml = (p, c, child) => `<div class="cm${child ? ' child' : ''}"><strong>${esc(c.author_name)}</strong> ${lvl(c)} <span class="muted small">· ${dt(c.created_at)}${c.likes ? ` · ♥ ${c.likes}` : ''}</span> <button class="mini" data-re="${p.id}:${c.id}">Rispondi</button> <button class="mini danger" data-delc="${c.id}">✕</button><div>${esc(c.body)}</div></div>`;
    tab.innerHTML = `<div class="split"><div>
      <div class="chips">${[[0, 'Tutti i canali'], ...d.channels.map(c => [c.id, chName[c.id]])].map(([i, l]) => `<button data-ch="${i}" class="${i === commChannel ? 'on' : ''}">${esc(l)}</button>`).join('')}</div>
      ${posts.map(p => `<div class="post">${p.pinned ? '<span class="pill warn">📌 in evidenza</span> ' : ''}${p.locked ? '<span class="pill">🔒 commenti chiusi</span> ' : ''}<span class="pill">${esc(chName[p.channel_id] || '')}</span>
        <h2 style="margin:6px 0 2px">${esc(p.title)}</h2><div class="small muted"><strong>${esc(p.author_name)}</strong> ${lvl(p)} · ${dt(p.created_at)} · ♥ ${p.likes} · ${p.comments.length} commenti</div><div style="white-space:pre-wrap;margin:8px 0">${esc(p.body)}</div>
        ${p.poll ? p.poll.options.map(o => `<div class="bar-row" style="grid-template-columns:minmax(100px,220px) 1fr 50px"><span>${esc(o.label)}</span><div class="bar"><i style="width:${p.poll.total ? 100 * o.votes / p.poll.total : 0}%;background:var(--brand-2)"></i></div><span class="right">${o.votes}</span></div>`).join('') : ''}
        <div class="actions"><button class="mini" data-pin="${p.id}:${p.pinned ? 0 : 1}">${p.pinned ? 'Togli evidenza' : 'Metti in evidenza'}</button><button class="mini" data-lock="${p.id}:${p.locked ? 0 : 1}">${p.locked ? 'Riapri commenti' : 'Chiudi commenti'}</button><button class="mini" data-re="${p.id}:">Commenta</button><span class="sp"></span><button class="mini danger" data-delp="${p.id}">Elimina</button></div>
        ${p.comments.filter(c => !c.parent_id).map(c => cmHtml(p, c) + p.comments.filter(x => x.parent_id === c.id).map(x => cmHtml(p, x, true)).join('')).join('')}</div>`).join('') || '<div class="card empty">Nessun post in questo canale</div>'}</div>
      <div class="card panel"><h2>Nuovo post dello staff</h2><form id="np">${fieldHtml({ k: 'channel_id', label: 'Canale', type: 'select', options: d.channels.map(c => [c.id, chName[c.id]]), num: true }, commChannel || d.channels[0]?.id)}${fieldHtml({ k: 'title', label: 'Titolo' }, '')}${fieldHtml({ k: 'body', label: 'Testo', type: 'textarea' }, '')}${fieldHtml({ k: 'poll', label: 'Sondaggio: una risposta per riga (facoltativo)', type: 'textarea' }, '')}<button class="primary">Pubblica</button></form></div></div>`;
    $$('[data-ch]').forEach(b => b.onclick = () => { commChannel = Number(b.dataset.ch); refresh(); });
    $('#np').onsubmit = guard(async e => { e.preventDefault(); const v = collect($('#np')); await api('posts', 'POST', { channel_id: v.channel_id, title: v.title, body: v.body, poll_options: String(v.poll || '').split('\n'), author_name: user(S.me)?.name }); refresh(); });
    $$('[data-pin]').forEach(b => b.onclick = guard(async () => { const [i, v] = b.dataset.pin.split(':'); await api('posts/' + i, 'PUT', { pinned: Number(v) }); refresh(); }));
    $$('[data-lock]').forEach(b => b.onclick = guard(async () => { const [i, v] = b.dataset.lock.split(':'); await api('posts/' + i, 'PUT', { locked: Number(v) }); refresh(); }));
    $$('[data-delp]').forEach(b => b.onclick = guard(async () => { if (await ask('Eliminare il post e i suoi commenti?')) { await api('posts/' + b.dataset.delp, 'DELETE'); refresh(); } }));
    $$('[data-delc]').forEach(b => b.onclick = guard(async () => { await api('comments/' + b.dataset.delc, 'DELETE'); refresh(); }));
    $$('[data-re]').forEach(b => b.onclick = () => { const [post_id, parent_id] = b.dataset.re.split(':'); formModal('Rispondi come staff', [{ k: 'body', label: 'Testo', type: 'textarea', required: true }], {}, async v => { await api('comments', 'POST', { post_id: Number(post_id), parent_id: Number(parent_id) || null, body: v.body, author_name: user(S.me)?.name }); refresh(); }); });
  }

  if (commTab === 'membri') {
    const free = contacts.filter(x => !d.members.some(m => m.contact_id === x.id));
    tab.innerHTML = `<div class="card"><div class="add-row" style="margin-bottom:12px"><select id="who" style="flex:1;max-width:320px">${free.map(x => `<option value="${x.id}">${cname(x)}</option>`).join('')}</select><button class="primary" id="invite"${free.length ? '' : ' disabled'}>Dai accesso al portale</button></div>
      <div class="table-wrap"><table><thead><tr><th>Membro</th><th>Ruolo</th><th>Livello</th><th>Punti</th><th>Post · commenti</th><th>Ultimo accesso</th><th></th></tr></thead><tbody>${d.members.map(m => `<tr><td><a href="#/contatti/${m.contact_id}"><strong>${esc(m.name)}</strong></a><div class="small muted">${esc(m.bio || '')}</div></td>
        <td><select data-role="${m.id}"><option${m.role === 'membro' ? ' selected' : ''}>membro</option><option${m.role === 'moderatore' ? ' selected' : ''}>moderatore</option></select></td><td class="nowrap"><span class="pill lvl">liv. ${m.level}</span> ${esc(m.level_name)}</td><td><strong>${m.points}</strong></td><td>${m.posts} · ${m.comments}</td><td class="small nowrap">${dt(m.last_seen)}</td>
        <td class="nowrap">${publicLink('/p/portale/' + m.token)} <button class="mini" data-pts="${m.id}">± Punti</button> <button class="mini danger" data-delm="${m.id}">Rimuovi</button></td></tr>`).join('')}</tbody></table></div></div>`;
    $('#invite').onclick = guard(async () => { await api('members', 'POST', { contact_id: Number($('#who').value) }); refresh(); });
    $$('[data-role]').forEach(s => s.onchange = guard(async () => { await api('members/' + s.dataset.role, 'PUT', { role: s.value }); toast('Ruolo aggiornato'); }));
    $$('[data-pts]').forEach(b => b.onclick = () => formModal('Assegna o togli punti', [{ k: 'points', label: 'Punti (negativo per toglierli)', type: 'number', num: true, required: true }, { k: 'reason', label: 'Motivo' }], { points: 10 }, async v => { await api(`members/${b.dataset.pts}/points`, 'POST', v); refresh(); }));
    $$('[data-delm]').forEach(b => b.onclick = guard(async () => { if (await ask('Togliere l\'accesso al portale a questo membro?')) { await api('members/' + b.dataset.delm, 'DELETE'); refresh(); } }));
  }

  if (commTab === 'classifica') {
    const max = Math.max(1, ...d.members.map(m => m.points));
    tab.innerHTML = `<div class="grid two"><div class="card"><h2>Classifica</h2>${d.members.map((m, i) => `<div class="bar-row" style="grid-template-columns:28px minmax(110px,180px) 1fr 60px"><b>${i + 1}</b><span>${esc(m.name)}</span><div class="bar"><i style="width:${100 * m.points / max}%;background:var(--accent)"></i></div><span class="right">${m.points}</span></div>`).join('')}</div>
      <div class="card"><h2>Livelli</h2><p class="small muted">I punti si guadagnano partecipando: 5 per un post, 2 per un commento, 1 per ogni mi piace ricevuto, 10 per una lezione, 15 per una verifica, 50 per un corso completato. I corsi possono sbloccarsi a un certo livello, e ogni salto di livello può far partire un'automazione.</p>
      ${d.levels.map(l => `<p class="small"><span class="pill lvl">liv. ${l.level}</span> <strong>${esc(l.label)}</strong> · da ${l.min} punti · ${d.members.filter(m => m.level === l.level).length} membri</p>`).join('')}</div></div>`;
  }

  if (commTab === 'eventi') {
    const evFields = [{ k: 'title', label: 'Titolo', required: true }, { k: 'description', label: 'Descrizione', type: 'textarea' }, { k: 'start_at', label: 'Quando', type: 'datetime-local', required: true }, { k: 'location', label: 'Dove' }, { k: 'link', label: 'Collegamento per partecipare' }];
    tab.innerHTML = `<div class="head"><span class="sp"></span><button class="primary" id="newev">+ Nuovo evento</button></div><div class="grid two">${d.events.map(e => `<div class="card"><h2>${esc(e.title)}</h2><p class="small"><strong>${dt(e.start_at, { weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}</strong> · ${esc(e.location || '')}</p><p class="small muted">${esc(e.description)}</p><div class="ministats"><span><b>${e.going}</b> partecipanti</span><span class="sp"></span><button class="mini" data-ev="${e.id}">Modifica</button></div></div>`).join('') || '<div class="card empty">Nessun evento in programma</div>'}</div>`;
    $('#newev').onclick = () => formModal('Nuovo evento', evFields, { location: 'Online' }, async v => { await api('events', 'POST', v); refresh(); });
    $$('[data-ev]').forEach(b => b.onclick = () => { const e = d.events.find(x => x.id === Number(b.dataset.ev)); formModal('Modifica evento', evFields, e, async v => { await api('events/' + e.id, 'PUT', v); refresh(); }, async () => { await api('events/' + e.id, 'DELETE'); refresh(); }); });
  }

  if (commTab === 'canali') {
    const chFields = [{ k: 'name', label: 'Nome', required: true }, { k: 'emoji', label: 'Simbolo (emoji)' }, { k: 'description', label: 'A cosa serve' }, { k: 'position', label: 'Posizione', type: 'number', num: true }, { k: 'staff_only', label: 'Ci scrive solo lo staff (i membri commentano)', type: 'checkbox' }];
    tab.innerHTML = `<div class="head"><span class="sp"></span><button class="primary" id="newch">+ Nuovo canale</button></div><div class="grid two">${d.channels.map(c => `<div class="card"><h2>${esc(c.emoji || '')} ${esc(c.name)} ${c.staff_only ? '<span class="pill">solo staff</span>' : ''}</h2><p class="small muted">${esc(c.description)}</p><div class="ministats"><span><b>${d.posts.filter(p => p.channel_id === c.id).length}</b> post</span><span class="sp"></span><button class="mini" data-chn="${c.id}">Modifica</button></div></div>`).join('')}</div>`;
    $('#newch').onclick = () => formModal('Nuovo canale', chFields, { emoji: '💬', position: d.channels.length, staff_only: 0 }, async v => { await api('channels', 'POST', v); refresh(); });
    $$('[data-chn]').forEach(b => b.onclick = () => { const c = d.channels.find(x => x.id === Number(b.dataset.chn)); formModal('Modifica canale', chFields, c, async v => { await api('channels/' + c.id, 'PUT', v); refresh(); }, async () => { await api('channels/' + c.id, 'DELETE'); refresh(); }); });
  }
};
