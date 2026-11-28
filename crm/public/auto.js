// Automazioni: elenco, modelli pronti ed editor visuale ad albero (rami sì/no, test A/B, attesa di risposta).
const uid = p => p + Math.random().toString(36).slice(2, 8);
const opt = (list, any) => [...(any ? [['', any]] : []), ...list];

// L = elenchi che servono ai campi a scelta (caricati quando si apre l'editor)
let L = { forms: [], calendars: [], courses: [], workflows: [] };
const TRIGGERS = {
  lead_created: { label: 'Nuovo contatto creato', g: 'Contatti', f: () => [{ k: 'source', label: 'Solo da questa provenienza', type: 'select', options: opt(SOURCES.map(s => [s, s]), '— qualsiasi —') }] },
  tag_added: { label: 'Tag aggiunto', g: 'Contatti', f: () => [{ k: 'tag', label: 'Quale tag (vuoto = qualsiasi)' }] },
  tag_removed: { label: 'Tag rimosso', g: 'Contatti', f: () => [{ k: 'tag', label: 'Quale tag (vuoto = qualsiasi)' }] },
  birthday: { label: 'Compleanno del contatto', g: 'Contatti' },
  note_added: { label: 'Nota aggiunta', g: 'Contatti' },
  task_completed: { label: 'Attività completata', g: 'Contatti' },
  form_submitted: { label: 'Modulo inviato', g: 'Acquisizione', f: () => [{ k: 'form_id', label: 'Quale modulo', type: 'select', options: opt(L.forms, '— qualsiasi —') }] },
  message_received: { label: 'Messaggio ricevuto', g: 'Conversazioni', f: () => [{ k: 'channel', label: 'Canale', type: 'select', options: opt(CHANNELS.map(c => [c, c]), '— qualsiasi —') }, { k: 'contains', label: 'Solo se contiene la parola' }] },
  appointment_booked: { label: 'Appuntamento prenotato', g: 'Calendario', f: () => [{ k: 'calendar_id', label: 'Quale calendario', type: 'select', options: opt(L.calendars, '— qualsiasi —') }] },
  appointment_status: { label: 'Appuntamento cambia stato', g: 'Calendario', f: () => [{ k: 'status', label: 'Nuovo stato', type: 'select', options: opt(['completato', 'non presentato', 'annullato', 'confermato'].map(x => [x, x]), '— qualsiasi —') }] },
  stage_changed: { label: 'Opportunità cambia fase', g: 'Vendite', f: () => [{ k: 'stage_id', label: 'In quale fase', type: 'select', options: opt(stageOpts(), '— qualsiasi —') }] },
  opportunity_won: { label: 'Vendita chiusa (vinta)', g: 'Vendite' },
  opportunity_lost: { label: 'Opportunità persa', g: 'Vendite' },
  course_enrolled: { label: 'Iscrizione a un corso', g: 'Corsi e comunità', f: () => [{ k: 'course_id', label: 'Quale corso', type: 'select', options: opt(L.courses, '— qualsiasi —') }] },
  lesson_completed: { label: 'Lezione completata', g: 'Corsi e comunità', f: () => [{ k: 'course_id', label: 'Quale corso', type: 'select', options: opt(L.courses, '— qualsiasi —') }] },
  quiz_passed: { label: 'Verifica superata', g: 'Corsi e comunità', f: () => [{ k: 'course_id', label: 'Quale corso', type: 'select', options: opt(L.courses, '— qualsiasi —') }] },
  quiz_failed: { label: 'Verifica non superata', g: 'Corsi e comunità', f: () => [{ k: 'course_id', label: 'Quale corso', type: 'select', options: opt(L.courses, '— qualsiasi —') }] },
  course_completed: { label: 'Corso completato', g: 'Corsi e comunità', f: () => [{ k: 'course_id', label: 'Quale corso', type: 'select', options: opt(L.courses, '— qualsiasi —') }] },
  student_inactive: { label: 'Studente fermo da N giorni', g: 'Corsi e comunità', f: () => [{ k: 'days', label: 'Giorni senza attività', type: 'number', num: true }] },
  community_post: { label: 'Nuovo post nella comunità', g: 'Corsi e comunità' },
  level_reached: { label: 'Livello raggiunto', g: 'Corsi e comunità', f: () => [{ k: 'level', label: 'Almeno il livello', type: 'number', num: true }] },
};
const RULES = {
  tag: { label: 'Tag', ops: [['has', 'ha il tag'], ['not_has', 'non ha il tag']], v: () => ({ label: 'Tag' }) },
  source: { label: 'Provenienza', ops: [['is', 'è'], ['is_not', 'non è']], v: () => ({ label: 'Valore', type: 'select', options: SOURCES.map(s => [s, s]) }) },
  stage: { label: 'Fase dell\'opportunità', ops: [['is', 'è'], ['is_not', 'non è']], v: () => ({ label: 'Fase', type: 'select', options: stageOpts() }) },
  value: { label: 'Valore dell\'opportunità', ops: [['gt', 'maggiore di'], ['lt', 'minore di']], v: () => ({ label: 'Euro', type: 'number', num: true }) },
  owner: { label: 'Operatore assegnato', ops: [['is', 'è'], ['is_not', 'non è']], v: () => ({ label: 'Operatore', type: 'select', options: userOpts() }) },
  email: { label: 'Email', ops: [['present', 'è presente'], ['absent', 'manca']] },
  phone: { label: 'Telefono', ops: [['present', 'è presente'], ['absent', 'manca']] },
  replied: { label: 'Ha scritto di recente', ops: [['yes', 'sì, negli ultimi'], ['no', 'no, negli ultimi']], v: () => ({ label: 'Giorni', type: 'number', num: true }) },
  appointment: { label: 'Appuntamento futuro', ops: [['yes', 'ce l\'ha'], ['no', 'non ce l\'ha']] },
  course: { label: 'Corso', ops: [['enrolled', 'è iscritto a'], ['completed', 'ha completato'], ['not_enrolled', 'non è iscritto a']], v: () => ({ label: 'Corso', type: 'select', options: L.courses }) },
  level: { label: 'Livello nella comunità', ops: [['gte', 'almeno']], v: () => ({ label: 'Livello', type: 'number', num: true }) },
};
const ruleText = r => { const d = RULES[r.field] || {}; const o = (d.ops || []).find(x => x[0] === r.op); const f = d.v && d.v(); const val = f && f.options ? (f.options.find(x => String(x[0]) === String(r.value)) || [])[1] : r.value; return `${d.label || r.field} ${o ? o[1] : ''} ${val ?? ''}`.trim(); };
const short = (s, n = 70) => { s = String(s || ''); return s.length > n ? s.slice(0, n) + '…' : s; };
const optName = (list, id) => (list.find(x => String(x[0]) === String(id)) || [])[1] || '—';
const ACTIONS = {
  send_message: { label: 'Invia messaggio', ico: '✉️', g: 'Comunicazione', blank: { channel: 'whatsapp', body: 'Ciao {{nome}}, ' }, sum: s => `${s.channel}: ${short(s.body)}`,
    f: s => [{ k: 'channel', label: 'Canale', type: 'select', options: CHANNELS.map(x => [x, x]) }, ...(s.channel === 'email' ? [{ k: 'subject', label: 'Oggetto', wide: true }] : []), { k: 'body', label: 'Testo — puoi usare {{nome}}, {{cognome}}, {{azienda}}', type: 'textarea' }], redraw: ['channel'] },
  notify: { label: 'Notifica interna', ico: '🔔', g: 'Comunicazione', blank: { text: '{{nome}} {{cognome}} richiede attenzione' }, sum: s => short(s.text), f: () => [{ k: 'text', label: 'Testo per lo staff', type: 'textarea' }] },
  wait: { label: 'Attendi', ico: '⏳', g: 'Flusso', blank: { mode: 'durata', amount: 1, unit: 'giorni', time: '09:00' }, sum: s => (s.mode === 'orario' ? `fino alle ${s.time}` : `${s.amount} ${s.unit}`),
    f: s => [{ k: 'mode', label: 'Tipo di attesa', type: 'select', options: [['durata', 'Per un certo tempo'], ['orario', 'Fino a un orario']] }, ...(s.mode === 'orario' ? [{ k: 'time', label: 'Orario', type: 'time' }] : [{ k: 'amount', label: 'Quanto', type: 'number', num: true }, { k: 'unit', label: 'Unità', type: 'select', options: ['minuti', 'ore', 'giorni'].map(x => [x, x]) }])], redraw: ['mode'] },
  wait_reply: { label: 'Aspetta una risposta', ico: '💬', g: 'Flusso', blank: () => ({ amount: 2, unit: 'giorni', yes: [], no: [] }), sum: s => `al massimo ${s.amount} ${s.unit}`, branches: [['yes', 'Ha risposto', 'ok'], ['no', 'Nessuna risposta', 'bad']],
    f: () => [{ k: 'amount', label: 'Tempo massimo', type: 'number', num: true }, { k: 'unit', label: 'Unità', type: 'select', options: ['minuti', 'ore', 'giorni'].map(x => [x, x]) }] },
  condition: { label: 'Condizione', ico: '🔀', g: 'Flusso', blank: () => ({ match: 'all', rules: [{ field: 'tag', op: 'has', value: '' }], yes: [], no: [] }), sum: s => (s.rules || []).map(ruleText).join(s.match === 'any' ? ' oppure ' : ' e ') || 'nessuna regola', branches: [['yes', 'Sì', 'ok'], ['no', 'No', 'bad']],
    f: () => [{ k: 'match', label: 'Il contatto deve rispettare', type: 'select', options: [['all', 'tutte le regole'], ['any', 'almeno una regola']] }] },
  split: { label: 'Test A/B', ico: '🎲', g: 'Flusso', blank: () => ({ branches: [{ id: uid('b'), label: 'Variante A', weight: 50, steps: [] }, { id: uid('b'), label: 'Variante B', weight: 50, steps: [] }] }), sum: s => (s.branches || []).map(b => `${b.label} ${b.weight}%`).join(' · '), f: () => [] },
  end: { label: 'Fine del flusso', ico: '⏹', g: 'Flusso', blank: {}, sum: () => 'Il contatto esce qui', f: () => [] },
  add_tag: { label: 'Aggiungi tag', ico: '🏷️', g: 'Contatto', blank: { tag: '' }, sum: s => s.tag, f: () => [{ k: 'tag', label: 'Tag' }] },
  remove_tag: { label: 'Rimuovi tag', ico: '🏷️', g: 'Contatto', blank: { tag: '' }, sum: s => s.tag, f: () => [{ k: 'tag', label: 'Tag' }] },
  assign: { label: 'Assegna a un operatore', ico: '👤', g: 'Contatto', blank: { mode: 'rotazione' }, sum: s => (s.mode === 'rotazione' ? 'a turno, a chi ha meno contatti' : optName(userOpts(), s.user_id)),
    f: s => [{ k: 'mode', label: 'Come', type: 'select', options: [['rotazione', 'A turno fra gli operatori'], ['utente', 'A un operatore preciso']] }, ...(s.mode === 'utente' ? [{ k: 'user_id', label: 'Operatore', type: 'select', options: userOpts(), num: true }] : [])], redraw: ['mode'] },
  set_field: { label: 'Aggiorna un campo', ico: '✏️', g: 'Contatto', blank: { field: 'company', value: '' }, sum: s => `${s.field} = ${short(s.value, 30)}`, f: () => [{ k: 'field', label: 'Campo', type: 'select', options: [['first_name', 'Nome'], ['last_name', 'Cognome'], ['company', 'Azienda'], ['source', 'Provenienza'], ['email', 'Email'], ['phone', 'Telefono']] }, { k: 'value', label: 'Nuovo valore' }] },
  add_note: { label: 'Aggiungi nota', ico: '📝', g: 'Contatto', blank: { text: '' }, sum: s => short(s.text), f: () => [{ k: 'text', label: 'Testo della nota', type: 'textarea' }] },
  create_task: { label: 'Crea attività', ico: '✅', g: 'Contatto', blank: { title: 'Richiamare {{nome}}', days: 1 }, sum: s => `${short(s.title, 40)} · fra ${s.days || 0} giorni`, f: () => [{ k: 'title', label: 'Titolo dell\'attività', wide: true }, { k: 'days', label: 'Scadenza fra (giorni)', type: 'number', num: true }] },
  create_opportunity: { label: 'Crea opportunità', ico: '💼', g: 'Vendite', blank: () => ({ title: 'Richiesta di {{nome}}', value: 0, stage_id: S.stages[0]?.id }), sum: s => `${short(s.title, 30)} in ${optName(stageOpts(), s.stage_id)}`, f: () => [{ k: 'title', label: 'Titolo', wide: true }, { k: 'value', label: 'Valore (€)', type: 'number', num: true }, { k: 'stage_id', label: 'Fase', type: 'select', options: stageOpts(), num: true }] },
  move_stage: { label: 'Sposta opportunità', ico: '➡️', g: 'Vendite', blank: () => ({ stage_id: S.stages[0]?.id }), sum: s => `in ${optName(stageOpts(), s.stage_id)}`, f: () => [{ k: 'stage_id', label: 'Fase di destinazione', type: 'select', options: stageOpts(), num: true }] },
  enroll_course: { label: 'Iscrivi a un corso', ico: '🎓', g: 'Corsi e comunità', blank: () => ({ course_id: L.courses[0]?.[0] }), sum: s => optName(L.courses, s.course_id), f: () => [{ k: 'course_id', label: 'Corso', type: 'select', options: L.courses, num: true }] },
  unenroll_course: { label: 'Togli da un corso', ico: '🎓', g: 'Corsi e comunità', blank: () => ({ course_id: L.courses[0]?.[0] }), sum: s => optName(L.courses, s.course_id), f: () => [{ k: 'course_id', label: 'Corso', type: 'select', options: L.courses, num: true }] },
  add_points: { label: 'Assegna punti', ico: '⭐', g: 'Corsi e comunità', blank: { points: 10 }, sum: s => `${s.points} punti nella comunità`, f: () => [{ k: 'points', label: 'Punti', type: 'number', num: true }] },
  start_workflow: { label: 'Avvia un\'altra automazione', ico: '▶️', g: 'Avanzate', blank: {}, sum: s => optName(L.workflows, s.workflow_id), f: () => [{ k: 'workflow_id', label: 'Automazione', type: 'select', options: opt(L.workflows, '— scegli —'), num: true }] },
  stop_workflow: { label: 'Ferma altre automazioni', ico: '⏸', g: 'Avanzate', blank: {}, sum: s => (s.workflow_id ? optName(L.workflows, s.workflow_id) : 'tutte le altre in corso'), f: () => [{ k: 'workflow_id', label: 'Quale', type: 'select', options: opt(L.workflows, '— tutte le altre —'), num: true }] },
  webhook: { label: 'Webhook (simulato)', ico: '🔗', g: 'Avanzate', blank: { url: 'https://' }, sum: s => short(s.url, 50), f: () => [{ k: 'url', label: 'Indirizzo a cui mandare i dati', wide: true }] },
};
const newStep = t => { const b = ACTIONS[t].blank; return { id: uid('n'), type: t, ...(typeof b === 'function' ? b() : structuredClone(b)) }; };
const branchesOf = s => (s.type === 'split' ? (s.branches || []).map(b => [b.steps, b.label + ' · ' + b.weight + '%', '']) : (ACTIONS[s.type]?.branches || []).map(([k, l, c]) => [s[k] ||= [], l, c]));
function locate(steps, id) {
  for (let i = 0; i < steps.length; i++) {
    if (steps[i].id === id) return { arr: steps, i };
    for (const [arr] of branchesOf(steps[i])) { const r = locate(arr, id); if (r) return r; }
  }
  return null;
}
const reId = s => { const c = structuredClone(s); (function walk(x) { x.id = uid('n'); for (const k of ['yes', 'no']) (x[k] || []).forEach(walk); (x.branches || []).forEach(b => { b.id = uid('b'); b.steps.forEach(walk); }); })(c); return c; };
const runPill = s => `<span class="pill ${{ done: 'ok', waiting: 'warn', error: 'bad', stopped: 'bad' }[s] || ''}">${{ done: 'completata', waiting: 'in attesa', running: 'in corso', error: 'errore', stopped: 'interrotta' }[s] || esc(s)}</span>`;
const trigText = t => { const d = TRIGGERS[t.type]; if (!d) return t.type; const extra = (d.f ? d.f() : []).map(f => { const v = (t.config || {})[f.k]; if (v === undefined || v === '' || v === null) return ''; return f.options ? optName(f.options, v) : v; }).filter(Boolean).join(', '); return d.label + (extra ? `: ${extra}` : ''); };

// ---------- modelli pronti ----------
const N = (type, o = {}) => ({ id: uid('n'), type, ...o });
const T = (type, config = {}) => ({ id: uid('t'), type, config });
const TEMPLATES = [
  { name: 'Accoglienza con attesa di risposta', description: 'Messaggio immediato, attesa della risposta e secondo tentativo se non arriva.', ico: '👋', build: () => ({ triggers: [T('lead_created')], steps: [N('send_message', { channel: 'whatsapp', body: 'Ciao {{nome}}, grazie per averci scritto! Come possiamo aiutarti?' }), N('wait_reply', { amount: 1, unit: 'giorni', yes: [N('notify', { text: '{{nome}} ha risposto' })], no: [N('send_message', { channel: 'whatsapp', body: '{{nome}}, sei ancora interessato? Rispondi quando vuoi.' })] })] }) },
  { name: 'Promemoria appuntamento', description: 'Conferma subito e ricorda l\'appuntamento alle 9 del mattino.', ico: '📅', build: () => ({ triggers: [T('appointment_booked')], steps: [N('send_message', { channel: 'whatsapp', body: 'Appuntamento confermato, {{nome}}.' }), N('wait', { mode: 'orario', time: '09:00' }), N('send_message', { channel: 'whatsapp', body: 'Promemoria: ci vediamo presto!' })] }) },
  { name: 'Recupero dei non presentati', description: 'Propone una nuova data a chi ha saltato l\'appuntamento.', ico: '🔁', build: () => ({ triggers: [T('appointment_status', { status: 'non presentato' })], steps: [N('wait', { mode: 'durata', amount: 2, unit: 'ore' }), N('send_message', { channel: 'whatsapp', body: '{{nome}}, oggi non siamo riusciti a vederci: vuoi un altro orario?' }), N('create_task', { title: 'Richiamare {{nome}}', days: 1 })] }) },
  { name: 'Recensione dopo la vendita', description: 'Una settimana dopo la vendita chiede una recensione, solo a chi non ha già risposto.', ico: '⭐', build: () => ({ triggers: [T('opportunity_won')], steps: [N('add_tag', { tag: 'cliente' }), N('wait', { mode: 'durata', amount: 7, unit: 'giorni' }), N('send_message', { channel: 'whatsapp', body: '{{nome}}, com\'è andata? Se ti va, lasciaci una recensione.' }), N('wait_reply', { amount: 3, unit: 'giorni', yes: [N('add_points', { points: 10 })], no: [N('send_message', { channel: 'email', subject: 'Un minuto per noi?', body: '{{nome}}, la tua opinione ci aiuta a migliorare.' })] })] }) },
  { name: 'Riattivazione dei contatti fermi', description: 'Parte dal tag «da riattivare»: test A/B fra due messaggi e attività per chi risponde.', ico: '🔥', build: () => ({ triggers: [T('tag_added', { tag: 'da riattivare' })], steps: [N('split', { branches: [{ id: uid('b'), label: 'Domanda', weight: 50, steps: [N('send_message', { channel: 'whatsapp', body: '{{nome}}, posso farti una domanda veloce?' })] }, { id: uid('b'), label: 'Offerta', weight: 50, steps: [N('send_message', { channel: 'whatsapp', body: '{{nome}}, questo mese abbiamo una proposta pensata per te.' })] }] }), N('wait_reply', { amount: 5, unit: 'giorni', yes: [N('create_task', { title: 'Richiamare {{nome}}: ha risposto alla riattivazione', days: 0 })], no: [N('remove_tag', { tag: 'da riattivare' })] })], settings: { stop_on_reply: false } }) },
  { name: 'Percorso dello studente', description: 'Benvenuto all\'iscrizione, sollecito a chi non parte e premio a chi completa.', ico: '🎓', build: () => ({ triggers: [T('course_enrolled')], steps: [N('send_message', { channel: 'email', subject: 'Benvenuto nel corso', body: '{{nome}}, la prima lezione ti aspetta nell\'area riservata.' }), N('wait', { mode: 'durata', amount: 3, unit: 'giorni' }), N('condition', { match: 'all', rules: [{ field: 'replied', op: 'no', value: 3 }], yes: [N('send_message', { channel: 'whatsapp', body: '{{nome}}, hai già visto la prima lezione? Dura meno di dieci minuti.' })], no: [] }), N('add_points', { points: 5 })] }) },
];
const DEFAULT_SETTINGS = { reentry: false, stop_on_reply: false, window_on: false, window_from: 9, window_to: 20 };

// ---------- elenco ----------
const runsTable = runs => runs.length ? `<div class="table-wrap"><table><thead><tr><th>Quando</th><th>Automazione</th><th>Contatto</th><th>Stato</th><th>Cosa è successo</th></tr></thead><tbody>${runs.map(r => `<tr><td class="nowrap small">${dt(r.created_at)}</td><td>${esc(r.workflow)}</td><td><a href="#/contatti/${r.contact_id}">${esc(r.contact)}</a></td>
  <td class="nowrap">${runPill(r.status)}${r.status === 'waiting' ? `<br><span class="small muted">${r.wait_kind === 'reply' ? 'risposta entro' : 'fino a'} ${dt(r.resume_at)}</span><br><button class="mini" data-skip="${r.id}">Salta l'attesa</button> <button class="mini danger" data-stop="${r.id}">Ferma</button>` : ''}</td>
  <td class="small"><details><summary>${esc(r.log.length ? r.log[r.log.length - 1].text : '')}</summary>${r.log.map(l => `<div><span class="muted">${hm(l.at)}</span> ${esc(l.text)}</div>`).join('')}</details></td></tr>`).join('')}</tbody></table></div>` : '<p class="muted">Ancora nessuna esecuzione.</p>';
const bindRuns = () => {
  $$('[data-skip]').forEach(b => b.onclick = guard(async () => { await api(`runs/${b.dataset.skip}/skip`, 'POST'); refresh(); }));
  $$('[data-stop]').forEach(b => b.onclick = guard(async () => { await api(`runs/${b.dataset.stop}/stop`, 'POST'); refresh(); }));
};
routes.automazioni = async id => {
  if (id) return workflowEditor(id);
  const [list, runs] = await Promise.all([api('workflows'), api('runs')]);
  view.innerHTML = head('Automazioni', 'Quando succede qualcosa, il CRM fa il passo successivo al posto tuo', '<button id="tpl">Parti da un modello</button><button class="primary" id="new">+ Nuova automazione</button>') + `
  <div class="grid two">${list.map(w => `<div class="card"><div class="head" style="margin-bottom:6px"><h2 style="margin:0"><a href="#/automazioni/${w.id}">${esc(w.name)}</a></h2><span class="sp"></span><label class="switch"><input type="checkbox" data-on="${w.id}"${w.active ? ' checked' : ''}> attiva</label></div>
    <p class="small muted">${esc(w.description)}</p>
    <p class="small">${(w.triggers || []).map(t => `<span class="pill warn">${esc(trigText(t))}</span>`).join(' ') || '<span class="muted">Nessun trigger</span>'}</p>
    <div class="ministats"><span><b>${w.stats.enrolled}</b> entrati</span><span><b>${w.stats.active}</b> in corso</span><span><b>${w.stats.done}</b> completati</span></div></div>`).join('')}</div>
  <div class="card" style="margin-top:14px"><h2>Ultime esecuzioni</h2>${runsTable(runs)}</div>`;
  bindRuns();
  $$('[data-on]').forEach(c => c.onchange = guard(async () => { await api('workflows/' + c.dataset.on, 'PUT', { active: c.checked ? 1 : 0 }); toast(c.checked ? 'Automazione attivata' : 'Automazione in pausa'); }));
  const create = guard(async o => { const w = await api('workflows', 'POST', { name: 'Nuova automazione', description: '', active: 0, triggers: [], steps: [], ...o, settings: { ...DEFAULT_SETTINGS, ...(o.settings || {}) } }); closeModal(); go('#/automazioni/' + w.id); });
  $('#new').onclick = () => create({});
  $('#tpl').onclick = () => {
    const m = $('#modal');
    m.innerHTML = `<div class="dialog" style="width:min(760px,100%)"><h2>Parti da un modello</h2><div class="grid two">${TEMPLATES.map((t, i) => `<button class="tpl" data-t="${i}"><span class="tpl-i">${t.ico}</span><strong>${esc(t.name)}</strong><span class="small muted">${esc(t.description)}</span></button>`).join('')}</div><div class="actions"><button data-x>Annulla</button></div></div>`;
    m.hidden = false; $('[data-x]', m).onclick = closeModal;
    $$('[data-t]', m).forEach(b => b.onclick = () => { const t = TEMPLATES[b.dataset.t]; create({ name: t.name, description: t.description, ...t.build() }); });
  };
};

// ---------- editor ----------
async function workflowEditor(id) {
  const [w, runs, contacts, forms, calendars, courses, workflows, stats0] = await Promise.all([api('workflows/' + id), api('runs?workflow_id=' + id), api('contacts'), api('forms'), api('calendars'), api('courses'), api('workflows'), api(`workflows/${id}/stats`)]);
  L = { forms: forms.map(f => [f.id, f.name]), calendars: calendars.map(c => [c.id, c.name]), courses: courses.map(c => [c.id, c.title]), workflows: workflows.filter(x => x.id !== w.id).map(x => [x.id, x.name]) };
  w.steps ||= []; w.triggers ||= []; w.settings = { ...DEFAULT_SETTINGS, ...(w.settings || {}) };
  let stats = stats0, sel = null, sim = null, dirty = false, slots = [];
  view.innerHTML = head(w.name, 'Evento di partenza in alto, poi i passi: premi + per aggiungerne uno, clicca un passo per modificarlo', '<a class="btn" href="#/automazioni">← Tutte</a><button class="danger" id="del">Elimina</button><span id="dirty" class="small muted"></span><button class="primary" id="save">Salva</button>') + `
  <div class="ministats big" id="st"></div>
  <div class="editor"><div class="canvas card" id="canvas"></div><aside class="panel card" id="panel"></aside></div>
  <div class="card" style="margin-top:14px"><h2>Chi è passato da qui</h2>${runsTable(runs)}</div>`;
  const mark = () => { dirty = true; $('#dirty').textContent = 'Modifiche non salvate'; };
  const save = async () => { await api('workflows/' + id, 'PUT', { name: w.name, description: w.description, active: w.active, triggers: w.triggers, steps: w.steps, settings: w.settings }); dirty = false; $('#dirty').textContent = ''; };

  const nodeHtml = s => {
    const a = ACTIONS[s.type] || { label: s.type, ico: '?', sum: () => '' }, st = stats.nodes[s.id], brs = branchesOf(s);
    return `<div class="node${sel === s.id ? ' sel' : ''}${sim && sim[s.id] !== undefined ? ' onpath' : ''} t-${s.type}" data-node="${s.id}" tabindex="0"><div class="node-h"><span>${a.ico}</span><b>${esc(a.label)}</b></div>
      <div class="node-s">${esc(a.sum(s) || '')}</div>${sim && sim[s.id] ? `<div class="node-sim">→ ${esc(sim[s.id])}</div>` : ''}
      ${st ? `<div class="node-st">${st.n} passati${st.waiting ? ` · <b>${st.waiting} fermi qui</b>` : ''}</div>` : ''}</div>
      ${brs.length ? `<div class="branches">${brs.map(([arr, label, cls]) => `<div class="branch"><div class="branch-l ${cls}">${esc(label)}</div>${flow(arr)}</div>`).join('')}</div>` : ''}`;
  };
  const flow = arr => { let h = ''; arr.forEach((s, i) => { slots.push({ arr, i }); h += `<button class="plus" data-slot="${slots.length - 1}" title="Aggiungi un passo qui">+</button>` + nodeHtml(s); }); slots.push({ arr, i: arr.length }); return h + `<button class="plus" data-slot="${slots.length - 1}" title="Aggiungi un passo qui">+</button>`; };
  const drawCanvas = () => {
    slots = [];
    $('#canvas').innerHTML = `<div class="flowroot"><div class="trigbox${sel === 'trig' ? ' sel' : ''}"><h3>Quando</h3>${w.triggers.map((t, i) => `<button class="trig${sel === 't' + i ? ' sel' : ''}" data-trig="${i}">${esc(trigText(t))}</button>`).join('') || '<p class="small muted">Nessun evento di partenza: aggiungine uno.</p>'}<button class="mini" id="addtrig">+ Evento di partenza</button></div>${flow(w.steps)}<div class="endcap">Fine</div></div>`;
    $('#st').innerHTML = [['entrati', stats.enrolled], ['in corso', stats.active], ['completati', stats.done], ['interrotti', stats.stopped + stats.error]].map(([l, n]) => `<span><b>${n}</b> ${l}</span>`).join('') + `<label class="switch" style="margin-left:auto"><input type="checkbox" id="wactive"${w.active ? ' checked' : ''}> Automazione attiva</label>`;
    $('#wactive').onchange = e => { w.active = e.target.checked ? 1 : 0; mark(); };
  };
  const bindFields = (root, obj, redraw = []) => { root.oninput = e => { const el = e.target; if (!el.dataset.k || el.closest('.item')) return; obj[el.dataset.k] = readValue(el); mark(); if (redraw.includes(el.dataset.k)) drawPanel(); }; root.onchange = () => drawCanvas(); };
  const drawPanel = () => {
    const p = $('#panel'); p.oninput = p.onchange = null;
    if (sel && sel[0] === 't' && w.triggers[Number(sel.slice(1))]) {
      const t = w.triggers[Number(sel.slice(1))], d = TRIGGERS[t.type] || {}; t.config ||= {};
      const groups = [...new Set(Object.values(TRIGGERS).map(x => x.g))];
      p.innerHTML = `<h2>Evento di partenza</h2><label class="f"><span>Quando succede questo</span><select id="ttype">${groups.map(g => `<optgroup label="${esc(g)}">${Object.entries(TRIGGERS).filter(([, v]) => v.g === g).map(([k, v]) => `<option value="${k}"${k === t.type ? ' selected' : ''}>${esc(v.label)}</option>`).join('')}</optgroup>`).join('')}</select></label>
        <div id="tf">${(d.f ? d.f() : []).map(f => fieldHtml(f, t.config[f.k])).join('')}</div><p class="small muted">Con più eventi di partenza, basta che se ne verifichi uno.</p><button class="danger" id="deltrig">Rimuovi questo evento</button>`;
      $('#ttype').onchange = e => { t.type = e.target.value; t.config = {}; mark(); drawCanvas(); drawPanel(); };
      bindFields($('#tf'), t.config);
      $('#deltrig').onclick = () => { w.triggers.splice(Number(sel.slice(1)), 1); sel = null; mark(); drawCanvas(); drawPanel(); };
      return;
    }
    const loc = sel && locate(w.steps, sel);
    if (loc) {
      const s = loc.arr[loc.i], a = ACTIONS[s.type];
      p.innerHTML = `<h2>${a.ico} ${esc(a.label)}</h2><div id="nf">${a.f(s).map(f => fieldHtml(f, s[f.k])).join('')}</div>
        ${s.type === 'condition' ? '<h3>Regole</h3><div id="rules"></div><p class="small muted">Chi rispetta le regole prosegue nel ramo «Sì», gli altri nel ramo «No». Poi i due rami si ricongiungono.</p>' : ''}
        ${s.type === 'split' ? '<h3>Varianti</h3><div id="vars"></div><p class="small muted">I contatti vengono divisi a caso secondo i pesi. Le statistiche su ogni passo dicono quale variante porta più avanti.</p>' : ''}
        ${s.type === 'wait_reply' ? '<p class="small muted">Se il contatto scrive su un canale qualsiasi prima della scadenza prosegue nel ramo «Ha risposto», altrimenti nell\'altro.</p>' : ''}
        <div class="actions" style="flex-wrap:wrap"><button class="mini" data-a="up">↑ Su</button><button class="mini" data-a="down">↓ Giù</button><button class="mini" data-a="dup">Duplica</button><span class="sp"></span><button class="mini danger" data-a="del">Elimina</button></div>
        <p style="margin-top:14px"><button class="mini" id="desel">← Impostazioni dell'automazione</button></p>`;
      bindFields($('#nf'), s, a.redraw || []);
      const sync = () => { mark(); drawCanvas(); };
      if (s.type === 'condition') listEditor($('#rules'), s.rules ||= [], { title: r => ruleText(r), redrawOn: ['field'], onChange: sync, blank: () => ({ field: 'tag', op: 'has', value: '' }),
        fields: r => { const d = RULES[r.field] || RULES.tag; if (!d.ops.some(o => o[0] === r.op)) r.op = d.ops[0][0]; return [{ k: 'field', label: 'Cosa guardo', type: 'select', options: Object.entries(RULES).map(([k, v]) => [k, v.label]) }, { k: 'op', label: 'Confronto', type: 'select', options: d.ops }, ...(d.v ? [{ k: 'value', ...d.v() }] : [])]; } });
      if (s.type === 'split') listEditor($('#vars'), s.branches ||= [], { title: b => b.label, onChange: sync, blank: () => ({ id: uid('b'), label: 'Nuova variante', weight: 50, steps: [] }), fields: () => [{ k: 'label', label: 'Nome' }, { k: 'weight', label: 'Peso (%)', type: 'number', num: true }] });
      $$('[data-a]', p).forEach(b => b.onclick = () => {
        const { arr, i } = locate(w.steps, sel), act = b.dataset.a;
        if (act === 'del') { arr.splice(i, 1); sel = null; }
        if (act === 'dup') { const c = reId(arr[i]); arr.splice(i + 1, 0, c); sel = c.id; }
        if (act === 'up' && i > 0) [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]];
        if (act === 'down' && i < arr.length - 1) [arr[i + 1], arr[i]] = [arr[i], arr[i + 1]];
        mark(); drawCanvas(); drawPanel();
      });
      $('#desel').onclick = () => { sel = null; drawCanvas(); drawPanel(); };
      return;
    }
    p.innerHTML = `<h2>Impostazioni</h2><div id="sf">${fieldHtml({ k: 'name', label: 'Nome' }, w.name)}${fieldHtml({ k: 'description', label: 'A cosa serve', type: 'textarea' }, w.description)}</div>
      <div id="ss">${fieldHtml({ k: 'reentry', label: 'Lo stesso contatto può rientrare più volte', type: 'checkbox' }, w.settings.reentry)}${fieldHtml({ k: 'stop_on_reply', label: 'Ferma il flusso se il contatto risponde', type: 'checkbox' }, w.settings.stop_on_reply)}
      ${fieldHtml({ k: 'window_on', label: 'Invia i messaggi solo in una fascia oraria', type: 'checkbox' }, w.settings.window_on)}<div style="display:flex;gap:8px">${fieldHtml({ k: 'window_from', label: 'Dalle ore', type: 'number', num: true }, w.settings.window_from)}${fieldHtml({ k: 'window_to', label: 'Alle ore', type: 'number', num: true }, w.settings.window_to)}</div></div>
      <h2 style="margin-top:8px">Prova</h2><select id="tc" style="width:100%;margin-bottom:8px">${contacts.map(c => `<option value="${c.id}">${cname(c)}</option>`).join('')}</select>
      <div class="actions" style="flex-wrap:wrap"><button id="sim">Simula il percorso</button><button id="test">Avvia davvero</button></div>
      <p class="small muted">La simulazione non manda niente: evidenzia sul disegno la strada che quel contatto farebbe oggi. «Avvia davvero» esegue il flusso su quel contatto.</p>`;
    bindFields($('#sf'), w); $('#ss').oninput = e => { if (e.target.dataset.k) { w.settings[e.target.dataset.k] = readValue(e.target); mark(); } };
    $('#sim').onclick = guard(async () => { await save(); const path = await api(`workflows/${id}/simulate`, 'POST', { contact_id: Number($('#tc').value) }); sim = Object.fromEntries(path.map(x => [x.id, x.note])); drawCanvas(); toast(`Percorso simulato: ${path.length} passi`); });
    $('#test').onclick = guard(async () => { await save(); await api(`workflows/${id}/test`, 'POST', { contact_id: Number($('#tc').value) }); toast('Flusso avviato sul contatto'); refresh(); });
  };
  press($('#canvas'), e => {
    const plus = e.target.closest('[data-slot]'), node = e.target.closest('[data-node]'), trig = e.target.closest('[data-trig]');
    if (e.target.id === 'addtrig') { w.triggers.push({ id: uid('t'), type: 'lead_created', config: {} }); sel = 't' + (w.triggers.length - 1); mark(); }
    else if (trig) sel = 't' + trig.dataset.trig;
    else if (plus) return picker(slots[Number(plus.dataset.slot)]);
    else if (node) sel = node.dataset.node;
    else return;
    drawCanvas(); drawPanel();
  });
  const picker = slot => {
    const m = $('#modal'), groups = [...new Set(Object.values(ACTIONS).map(a => a.g))];
    m.innerHTML = `<div class="dialog" style="width:min(680px,100%)"><h2>Aggiungi un passo</h2>${groups.map(g => `<h3>${esc(g)}</h3><div class="picker">${Object.entries(ACTIONS).filter(([, a]) => a.g === g).map(([k, a]) => `<button data-pick="${k}"><span>${a.ico}</span> ${esc(a.label)}</button>`).join('')}</div>`).join('')}<div class="actions"><button data-x>Annulla</button></div></div>`;
    m.hidden = false; $('[data-x]', m).onclick = closeModal;
    $$('[data-pick]', m).forEach(b => b.onclick = () => { const s = newStep(b.dataset.pick); slot.arr.splice(slot.i, 0, s); sel = s.id; mark(); closeModal(); drawCanvas(); drawPanel(); });
  };
  $('#save').onclick = guard(async () => { await save(); toast('Automazione salvata'); stats = await api(`workflows/${id}/stats`); drawCanvas(); });
  $('#del').onclick = guard(async () => { if (await ask('Eliminare questa automazione e il suo registro?')) { await api('workflows/' + id, 'DELETE'); go('#/automazioni'); } });
  bindRuns(); drawCanvas(); drawPanel();
}
