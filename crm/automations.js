// Motore delle automazioni.
// Un'automazione ha uno o più trigger e un albero di passi: condizioni, attese di risposta e
// test A/B hanno rami, che poi si ricongiungono al passo successivo. Ogni contatto che entra
// genera una "run" che ricorda su quale nodo si trova; ogni nodo attraversato lascia una riga
// in run_steps, da cui si ricavano registro e statistiche per nodo.
const { db, now, fmt } = require('./db');

const get = (sql, ...p) => db.prepare(sql).get(...p);
const all = (sql, ...p) => db.prepare(sql).all(...p);
const run = (sql, ...p) => db.prepare(sql).run(...p);
const J = (s, d) => { try { return JSON.parse(s) ?? d; } catch { return d; } };

const UNIT = { minuti: 60e3, ore: 3600e3, giorni: 86400e3 };
const hooks = {}; // riempito da academy.js: enroll, unenroll, points, level, courseState

// ---------- mattoni usati anche dal resto del server ----------
function activity(contactId, type, text) {
  run('INSERT INTO activities (contact_id,type,text,created_at) VALUES (?,?,?,?)', contactId, type, text, now());
}
function conversation(contactId, channel) {
  let v = get('SELECT * FROM conversations WHERE contact_id=? AND channel=?', contactId, channel);
  if (!v) {
    const owner = get('SELECT owner_id FROM contacts WHERE id=?', contactId);
    const r = run('INSERT INTO conversations (contact_id,channel,assigned_id,unread,last_at) VALUES (?,?,?,0,?)', contactId, channel, owner ? owner.owner_id : null, now());
    v = get('SELECT * FROM conversations WHERE id=?', Number(r.lastInsertRowid));
  }
  return v;
}
function message(conversationId, direction, body, author) {
  run('INSERT INTO messages (conversation_id,direction,body,author,created_at) VALUES (?,?,?,?,?)', conversationId, direction, body, author, now());
  run(`UPDATE conversations SET last_at=?, unread=unread+? WHERE id=?`, now(), direction === 'in' ? 1 : 0, conversationId);
}
const tagsOf = contactId => J((get('SELECT tags FROM contacts WHERE id=?', contactId) || {}).tags, []);
function addTag(contactId, tag, depth = 0) {
  const tags = tagsOf(contactId);
  if (!tag || tags.includes(tag)) return;
  run('UPDATE contacts SET tags=? WHERE id=?', JSON.stringify([...tags, tag]), contactId);
  activity(contactId, 'tag', `Tag aggiunto: ${tag}`);
  fire('tag_added', contactId, { tag }, depth + 1);
}
function removeTag(contactId, tag, depth = 0) {
  const tags = tagsOf(contactId);
  if (!tags.includes(tag)) return;
  run('UPDATE contacts SET tags=? WHERE id=?', JSON.stringify(tags.filter(t => t !== tag)), contactId);
  activity(contactId, 'tag', `Tag rimosso: ${tag}`);
  fire('tag_removed', contactId, { tag }, depth + 1);
}
const render = (text, c) => String(text || '').replace(/\{\{\s*(\w+)\s*\}\}/g, (_, k) => ({ nome: c.first_name, cognome: c.last_name, azienda: c.company, email: c.email, telefono: c.phone }[k] ?? '') || '');

// ---------- albero → mappa di nodi collegati ----------
function compile(steps, after = null, map = {}) {
  (steps || []).forEach((s, i) => {
    const next = i + 1 < steps.length ? steps[i + 1].id : after;
    map[s.id] = { s, next };
    for (const k of ['yes', 'no']) if (s[k]) compile(s[k], next, map);
    for (const b of s.branches || []) compile(b.steps, next, map);
  });
  return map;
}
const entry = (branch, next) => (branch && branch.length ? branch[0].id : next);

// ---------- condizioni ----------
function evalRule(c, r) {
  const v = r.value, op = r.op;
  const latestOpp = () => get('SELECT o.*, s.kind FROM opportunities o JOIN stages s ON s.id=o.stage_id WHERE o.contact_id=? ORDER BY o.id DESC', c.id);
  switch (r.field) {
    case 'tag': return tagsOf(c.id).includes(v) === (op !== 'not_has');
    case 'source': return (String(c.source || '') === String(v)) === (op !== 'is_not');
    case 'owner': return (String(c.owner_id || '') === String(v)) === (op !== 'is_not');
    case 'email': case 'phone': case 'company': return !!String(c[r.field] || '').trim() === (op !== 'absent');
    case 'stage': { const o = latestOpp(); return (!!o && String(o.stage_id) === String(v)) === (op !== 'is_not'); }
    case 'value': { const o = latestOpp(); const n = o ? o.value : 0; return op === 'lt' ? n < Number(v) : n > Number(v); }
    case 'replied': { const since = fmt(new Date(Date.now() - (Number(v) || 7) * UNIT.giorni)); const m = get(`SELECT m.id FROM messages m JOIN conversations cv ON cv.id=m.conversation_id WHERE cv.contact_id=? AND m.direction='in' AND m.created_at>=?`, c.id, since); return !!m === (op !== 'no'); }
    case 'appointment': { const a = get(`SELECT id FROM appointments WHERE contact_id=? AND start_at>=? AND status='confermato'`, c.id, now()); return !!a === (op !== 'no'); }
    case 'course': { const st = hooks.courseState ? hooks.courseState(c.id, Number(v)) : 'none'; return op === 'completed' ? st === 'completed' : op === 'not_enrolled' ? st === 'none' : st !== 'none'; }
    case 'level': return (hooks.level ? hooks.level(c.id) : 0) >= Number(v);
    default: return false;
  }
}
const evalCondition = (c, s) => { const rs = (s.rules || []).map(r => evalRule(c, r)); return !rs.length || (s.match === 'any' ? rs.some(Boolean) : rs.every(Boolean)); };

// ---------- trigger ----------
function matches(t, type, ctx) {
  if (t.type !== type) return false;
  const cfg = t.config || {};
  for (const k of ['tag', 'form_id', 'calendar_id', 'stage_id', 'course_id', 'status', 'channel', 'source'])
    if (cfg[k] !== undefined && cfg[k] !== '' && cfg[k] !== null && String(cfg[k]) !== String(ctx[k] ?? '')) return false;
  if (cfg.contains && !String(ctx.text || '').toLowerCase().includes(String(cfg.contains).toLowerCase())) return false;
  if (cfg.level && Number(ctx.level || 0) < Number(cfg.level)) return false;
  if (cfg.days && Number(ctx.days || 0) !== Number(cfg.days)) return false; // scatta una volta sola, il giorno in cui si raggiunge la soglia
  return true;
}
function fire(type, contactId, ctx = {}, depth = 0) {
  if (!contactId || depth > 4) return; // un'automazione che ne innesca un'altra: fermiamo le catene infinite
  if (type === 'message_received') onReply(contactId);
  for (const w of all('SELECT * FROM workflows WHERE active=1'))
    if (J(w.triggers, []).some(t => matches(t, type, ctx))) start(w, contactId, depth);
}
// Una risposta del contatto: sblocca le attese di risposta e ferma i flussi che lo prevedono.
function onReply(contactId) {
  for (const r of all(`SELECT r.*, w.settings FROM runs r JOIN workflows w ON w.id=r.workflow_id WHERE r.contact_id=? AND r.status='waiting'`, contactId)) {
    if (r.wait_kind === 'reply') advance(r.id, 'reply');
    else if (J(r.settings, {}).stop_on_reply) stop(r.id, 'Il contatto ha risposto: flusso interrotto');
  }
}
function start(w, contactId, depth = 0, force = false) {
  const st = J(w.settings, {});
  if (!force && !st.reentry && get('SELECT id FROM runs WHERE workflow_id=? AND contact_id=?', w.id, contactId)) return null;
  if (!force && get(`SELECT id FROM runs WHERE workflow_id=? AND contact_id=? AND status IN ('running','waiting')`, w.id, contactId)) return null;
  const first = (J(w.steps, [])[0] || {}).id || null;
  const r = run('INSERT INTO runs (workflow_id,contact_id,node_id,status,created_at) VALUES (?,?,?,?,?)', w.id, contactId, first, 'running', now());
  const id = Number(r.lastInsertRowid);
  advance(id, null, depth);
  return id;
}
function stop(runId, why) {
  const r = get('SELECT * FROM runs WHERE id=?', runId);
  if (!r || !['running', 'waiting'].includes(r.status)) return;
  run('INSERT INTO run_steps (run_id,workflow_id,node_id,text,at) VALUES (?,?,?,?,?)', r.id, r.workflow_id, null, why || 'Interrotta', now());
  run(`UPDATE runs SET status='stopped', resume_at=NULL, wait_kind=NULL, finished_at=? WHERE id=?`, now(), runId);
}

// ---------- esecuzione di un passo: restituisce { next } oppure { wait } ----------
function nextWindow(st) {
  const d = new Date(), h = d.getHours(), from = Number(st.window_from ?? 9), to = Number(st.window_to ?? 20);
  if (h >= from && h < to) return null;
  if (h >= to) d.setDate(d.getDate() + 1);
  d.setHours(from, 0, 0, 0);
  return fmt(d);
}
function exec(node, c, w, st, depth) {
  const s = node.s, next = node.next;
  switch (s.type) {
    case 'send_message': {
      if (st.window_on) { const until = nextWindow(st); if (until) return { wait: { until, kind: 'window' }, text: `Fuori orario di invio: riprende alle ${until.slice(11, 16)}` }; }
      const channel = s.channel || 'whatsapp', text = render(s.body, c), subj = channel === 'email' && s.subject ? render(s.subject, c) + '\n\n' : '';
      message(conversation(c.id, channel).id, 'out', subj + text, 'auto');
      activity(c.id, 'messaggio', `Messaggio automatico (${channel}): ${text.slice(0, 90)}`);
      return { next, text: `Messaggio ${channel} inviato` };
    }
    case 'wait': {
      if (s.mode === 'orario') {
        const [h, m] = String(s.time || '09:00').split(':').map(Number), d = new Date();
        d.setHours(h, m || 0, 0, 0); if (d <= new Date()) d.setDate(d.getDate() + 1);
        return { wait: { until: fmt(d), kind: 'time' }, text: `In attesa fino alle ${s.time || '09:00'}` };
      }
      return { wait: { until: fmt(new Date(Date.now() + (Number(s.amount) || 1) * (UNIT[s.unit] || UNIT.minuti))), kind: 'time' }, text: `In attesa: ${s.amount} ${s.unit}` };
    }
    case 'wait_reply':
      return { wait: { until: fmt(new Date(Date.now() + (Number(s.amount) || 1) * (UNIT[s.unit] || UNIT.giorni))), kind: 'reply' }, text: `Aspetta una risposta (al massimo ${s.amount} ${s.unit})` };
    case 'condition': { const ok = evalCondition(c, s); return { next: entry(ok ? s.yes : s.no, next), text: `Condizione: ${ok ? 'sì' : 'no'}` }; }
    case 'split': {
      const bs = s.branches || []; if (!bs.length) return { next, text: 'Test A/B senza varianti' };
      let x = Math.random() * bs.reduce((a, b) => a + (Number(b.weight) || 0), 0) || 0, pick = bs[bs.length - 1];
      for (const b of bs) { x -= Number(b.weight) || 0; if (x < 0) { pick = b; break; } }
      return { next: entry(pick.steps, next), text: `Variante scelta: ${pick.label}`, branch: pick.id };
    }
    case 'add_tag': addTag(c.id, s.tag, depth); return { next, text: `Tag aggiunto: ${s.tag}` };
    case 'remove_tag': removeTag(c.id, s.tag, depth); return { next, text: `Tag rimosso: ${s.tag}` };
    case 'assign': {
      let uid = s.user_id;
      if (s.mode === 'rotazione') { // a turno: chi ha meno contatti assegnati
        const u = get('SELECT u.id FROM users u LEFT JOIN contacts c ON c.owner_id=u.id GROUP BY u.id ORDER BY count(c.id), u.id LIMIT 1'); uid = u && u.id;
      }
      run('UPDATE contacts SET owner_id=? WHERE id=?', uid || null, c.id);
      const u = get('SELECT name FROM users WHERE id=?', uid || 0), name = u ? u.name : 'nessuno';
      activity(c.id, 'assegnazione', `Assegnato a ${name}`); return { next, text: `Assegnato a ${name}` };
    }
    case 'create_task': {
      const owner = get('SELECT owner_id FROM contacts WHERE id=?', c.id).owner_id, title = render(s.title, c);
      run('INSERT INTO tasks (contact_id,title,due_at,done,owner_id) VALUES (?,?,?,0,?)', c.id, title, fmt(new Date(Date.now() + (Number(s.days) || 0) * UNIT.giorni)), owner);
      return { next, text: `Attività creata: ${title}` };
    }
    case 'create_opportunity': {
      const stg = get('SELECT * FROM stages WHERE id=?', s.stage_id || 0) || get('SELECT * FROM stages ORDER BY position LIMIT 1');
      run('INSERT INTO opportunities (contact_id,title,value,stage_id,owner_id,created_at,updated_at) VALUES (?,?,?,?,?,?,?)', c.id, render(s.title, c) || 'Nuova opportunità', Number(s.value) || 0, stg.id, c.owner_id, now(), now());
      activity(c.id, 'pipeline', `Opportunità creata in ${stg.name} (automazione)`); return { next, text: `Opportunità creata in ${stg.name}` };
    }
    case 'move_stage': {
      const o = get('SELECT id,title FROM opportunities WHERE contact_id=? ORDER BY id DESC', c.id), stg = get('SELECT * FROM stages WHERE id=?', s.stage_id || 0);
      if (!o || !stg) return { next, text: 'Nessuna opportunità da spostare' };
      run('UPDATE opportunities SET stage_id=?, updated_at=? WHERE id=?', stg.id, now(), o.id);
      activity(c.id, 'pipeline', `«${o.title}» spostata in ${stg.name} (automazione)`);
      fire('stage_changed', c.id, { stage_id: stg.id }, depth + 1);
      if (stg.kind !== 'open') fire(stg.kind === 'won' ? 'opportunity_won' : 'opportunity_lost', c.id, {}, depth + 1);
      return { next, text: `Opportunità spostata in ${stg.name}` };
    }
    case 'set_field': {
      if (!['first_name', 'last_name', 'company', 'source', 'email', 'phone'].includes(s.field)) return { next, text: 'Campo non valido' };
      run(`UPDATE contacts SET ${s.field}=? WHERE id=?`, render(s.value, c), c.id); return { next, text: `Campo aggiornato: ${s.field}` };
    }
    case 'add_note': activity(c.id, 'nota', render(s.text, c)); return { next, text: 'Nota aggiunta' };
    case 'notify': activity(c.id, 'notifica', `Notifica interna: ${render(s.text, c)}`); return { next, text: 'Notifica interna registrata' };
    case 'enroll_course': return { next, text: hooks.enroll ? hooks.enroll(Number(s.course_id), c.id, depth) : 'Corsi non disponibili' };
    case 'unenroll_course': return { next, text: hooks.unenroll ? hooks.unenroll(Number(s.course_id), c.id) : 'Corsi non disponibili' };
    case 'add_points': return { next, text: hooks.points ? hooks.points(c.id, Number(s.points) || 0, 'Automazione', depth) : 'Comunità non disponibile' };
    case 'start_workflow': {
      const o = get('SELECT * FROM workflows WHERE id=?', s.workflow_id || 0);
      if (!o || o.id === w.id || depth > 3) return { next, text: 'Automazione di destinazione non valida' };
      start(o, c.id, depth + 1, true); return { next, text: `Avviata «${o.name}»` };
    }
    case 'stop_workflow': {
      const rs = all(`SELECT id FROM runs WHERE contact_id=? AND status IN ('running','waiting') AND workflow_id!=? ${s.workflow_id ? 'AND workflow_id=?' : ''}`, c.id, w.id, ...(s.workflow_id ? [s.workflow_id] : []));
      rs.forEach(r => stop(r.id, `Interrotta da «${w.name}»`)); return { next, text: `Altri flussi interrotti: ${rs.length}` };
    }
    case 'webhook': return { next, text: `Webhook (simulato) verso ${s.url || 'nessun indirizzo'}: dati del contatto pronti all'invio` };
    case 'end': return { next: null, text: 'Fine del flusso' };
    default: return { next, text: `Passo sconosciuto: ${s.type}` };
  }
}

function advance(runId, signal = null, depth = 0) {
  let r = get('SELECT * FROM runs WHERE id=?', runId);
  if (!r || !['running', 'waiting'].includes(r.status)) return;
  const w = get('SELECT * FROM workflows WHERE id=?', r.workflow_id), c = get('SELECT * FROM contacts WHERE id=?', r.contact_id);
  const log = (node, text) => run('INSERT INTO run_steps (run_id,workflow_id,node_id,text,at) VALUES (?,?,?,?,?)', r.id, r.workflow_id, node, text, now());
  const finish = (status, text) => { if (text) log(null, text); run('UPDATE runs SET status=?, node_id=NULL, resume_at=NULL, wait_kind=NULL, finished_at=? WHERE id=?', status, now(), r.id); };
  if (!w || !c) return finish('error', 'Automazione o contatto non più presenti');
  const map = compile(J(w.steps, [])), st = J(w.settings, {});
  let id = r.node_id;
  try {
    if (r.status === 'waiting') { // ripresa dopo un'attesa
      const node = map[id];
      if (!node) return finish('done', 'Il flusso è stato modificato: run chiusa');
      if (r.wait_kind === 'reply') { log(id, signal === 'reply' ? 'Risposta ricevuta' : 'Nessuna risposta nel tempo previsto'); id = entry(signal === 'reply' ? node.s.yes : node.s.no, node.next); }
      else if (r.wait_kind === 'time') { log(id, 'Attesa terminata'); id = node.next; }
      // wait_kind 'window': si riesegue lo stesso nodo
    }
    for (let guard = 0; id && guard < 200; guard++) {
      const node = map[id];
      if (!node) break;
      const out = exec(node, get('SELECT * FROM contacts WHERE id=?', c.id), w, st, depth);
      log(id, out.text);
      if (out.wait) return run(`UPDATE runs SET status='waiting', node_id=?, wait_kind=?, resume_at=? WHERE id=?`, id, out.wait.kind, out.wait.until, r.id);
      id = out.next;
    }
    finish('done', 'Completata');
  } catch (e) { finish('error', `Errore: ${e.message}`); }
}
function skipWait(runId) { const r = get('SELECT * FROM runs WHERE id=?', runId); if (r && r.status === 'waiting') advance(runId, null); }

// ---------- simulazione: che strada farebbe oggi questo contatto, senza eseguire niente ----------
function simulate(w, contactId) {
  const c = get('SELECT * FROM contacts WHERE id=?', contactId), map = compile(J(w.steps, [])), path = [];
  let id = (J(w.steps, [])[0] || {}).id;
  for (let g = 0; id && map[id] && g < 200; g++) {
    const { s, next } = map[id]; let note = '';
    if (s.type === 'condition') { const ok = evalCondition(c, s); note = ok ? 'sì' : 'no'; path.push({ id, note }); id = entry(ok ? s.yes : s.no, next); continue; }
    if (s.type === 'wait_reply') { note = 'ipotesi: nessuna risposta'; path.push({ id, note }); id = entry(s.no, next); continue; }
    if (s.type === 'split') { const b = (s.branches || [])[0]; note = b ? `ipotesi: ${b.label}` : ''; path.push({ id, note }); id = b ? entry(b.steps, next) : next; continue; }
    if (s.type === 'send_message') note = render(s.body, c).slice(0, 120);
    if (s.type === 'wait') note = s.mode === 'orario' ? `fino alle ${s.time}` : `${s.amount} ${s.unit}`;
    path.push({ id, note });
    id = s.type === 'end' ? null : next;
  }
  return path;
}
function stats(workflowId) {
  const nodes = {};
  for (const r of all('SELECT node_id, count(DISTINCT run_id) n FROM run_steps WHERE workflow_id=? AND node_id IS NOT NULL GROUP BY node_id', workflowId)) nodes[r.node_id] = { n: r.n, waiting: 0 };
  for (const r of all(`SELECT node_id, count(*) n FROM runs WHERE workflow_id=? AND status='waiting' GROUP BY node_id`, workflowId)) (nodes[r.node_id] ||= { n: 0, waiting: 0 }).waiting = r.n;
  const by = Object.fromEntries(all('SELECT status, count(*) n FROM runs WHERE workflow_id=? GROUP BY status', workflowId).map(r => [r.status, r.n]));
  return { nodes, enrolled: Object.values(by).reduce((a, b) => a + b, 0), active: (by.waiting || 0) + (by.running || 0), done: by.done || 0, stopped: by.stopped || 0, error: by.error || 0 };
}

// ---------- orologio: attese scadute, compleanni, studenti fermi ----------
function tick() {
  for (const r of all(`SELECT id FROM runs WHERE status='waiting' AND resume_at<=?`, now())) advance(r.id, 'timeout');
  const today = now().slice(0, 10), last = get(`SELECT value FROM settings WHERE key='daily_check'`);
  if (last && last.value === today) return;
  run(`INSERT INTO settings (key,value) VALUES ('daily_check',?) ON CONFLICT(key) DO UPDATE SET value=excluded.value`, today);
  for (const c of all(`SELECT id FROM contacts WHERE birthday IS NOT NULL AND substr(birthday,6,5)=?`, today.slice(5))) fire('birthday', c.id);
  for (const e of all('SELECT * FROM enrollments WHERE completed_at IS NULL')) {
    const days = Math.floor((Date.now() - new Date(e.last_activity || e.created_at).getTime()) / UNIT.giorni);
    if (days >= 1) fire('student_inactive', e.contact_id, { course_id: e.course_id, days });
  }
}
function startTicker() { tick(); const t = setInterval(tick, 5000); if (t && t.unref) t.unref(); }

module.exports = { hooks, activity, conversation, message, addTag, removeTag, fire, start, stop, advance, skipWait, simulate, stats, startTicker, compile };
