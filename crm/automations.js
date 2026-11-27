// Motore delle automazioni: un'automazione è un trigger più una lista ordinata di passi.
// Ogni contatto che entra genera una "run"; le attese la sospendono fino a resume_at.
const { db, now, fmt } = require('./db');

const get = (sql, ...p) => db.prepare(sql).get(...p);
const all = (sql, ...p) => db.prepare(sql).all(...p);
const run = (sql, ...p) => db.prepare(sql).run(...p);

const UNIT = { minuti: 60e3, ore: 3600e3, giorni: 86400e3 };

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
function tagsOf(contactId) {
  const c = get('SELECT tags FROM contacts WHERE id=?', contactId);
  try { return JSON.parse((c && c.tags) || '[]') || []; } catch { return []; }
}
function addTag(contactId, tag, depth = 0) {
  const tags = tagsOf(contactId);
  if (!tag || tags.includes(tag)) return;
  run('UPDATE contacts SET tags=? WHERE id=?', JSON.stringify([...tags, tag]), contactId);
  activity(contactId, 'tag', `Tag aggiunto: ${tag}`);
  fire('tag_added', contactId, { tag }, depth + 1);
}
function render(text, c) {
  return String(text || '').replace(/\{\{\s*(\w+)\s*\}\}/g, (_, k) => ({ nome: c.first_name, cognome: c.last_name, azienda: c.company, email: c.email, telefono: c.phone }[k] ?? '') || '');
}

// Il trigger corrisponde se il tipo è lo stesso e l'eventuale filtro configurato combacia.
function matches(w, type, ctx) {
  if (w.trigger_type !== type) return false;
  let cfg = {}; try { cfg = JSON.parse(w.trigger_config || '{}') || {}; } catch { /* config vuota */ }
  for (const k of ['tag', 'form_id', 'calendar_id', 'stage_id', 'course_id'])
    if (cfg[k] !== undefined && cfg[k] !== '' && cfg[k] !== null && String(cfg[k]) !== String(ctx[k] ?? '')) return false;
  return true;
}
function fire(type, contactId, ctx = {}, depth = 0) {
  if (depth > 4) return; // un'automazione che ne innesca un'altra: fermiamo le catene infinite
  for (const w of all('SELECT * FROM workflows WHERE active=1')) if (matches(w, type, ctx)) start(w, contactId, depth);
}
function start(w, contactId, depth = 0) {
  const r = run('INSERT INTO runs (workflow_id,contact_id,step_index,status,log,created_at) VALUES (?,?,0,?,?,?)', w.id, contactId, 'running', '[]', now());
  advance(Number(r.lastInsertRowid), depth);
}

function advance(runId, depth = 0) {
  const r = get('SELECT * FROM runs WHERE id=?', runId);
  if (!r || r.status === 'done' || r.status === 'error') return;
  const w = get('SELECT * FROM workflows WHERE id=?', r.workflow_id);
  const c = get('SELECT * FROM contacts WHERE id=?', r.contact_id);
  const log = JSON.parse(r.log || '[]');
  const save = (status, i, resume = null) => run('UPDATE runs SET status=?, step_index=?, resume_at=?, log=? WHERE id=?', status, i, resume, JSON.stringify(log), runId);
  if (!w || !c) return save('error', r.step_index);
  let steps = []; try { steps = JSON.parse(w.steps || '[]') || []; } catch { /* nessun passo */ }
  const note = t => log.push({ at: now(), text: t });

  let i = r.step_index;
  try {
    for (; i < steps.length; i++) {
      const s = steps[i];
      if (s.type === 'wait') {
        if (r.status === 'waiting' && i === r.step_index) { r.status = 'running'; note('Attesa terminata'); continue; }
        const until = fmt(new Date(Date.now() + (Number(s.amount) || 1) * (UNIT[s.unit] || UNIT.minuti)));
        note(`In attesa: ${s.amount} ${s.unit}`);
        return save('waiting', i, until);
      }
      if (s.type === 'send_message') {
        const text = render(s.body, c);
        message(conversation(c.id, s.channel || 'whatsapp').id, 'out', text, 'auto');
        activity(c.id, 'messaggio', `Messaggio automatico (${s.channel || 'whatsapp'}): ${text.slice(0, 90)}`);
        note(`Messaggio ${s.channel || 'whatsapp'} inviato`);
      } else if (s.type === 'add_tag') { addTag(c.id, s.tag, depth); note(`Tag aggiunto: ${s.tag}`); }
      else if (s.type === 'remove_tag') {
        run('UPDATE contacts SET tags=? WHERE id=?', JSON.stringify(tagsOf(c.id).filter(t => t !== s.tag)), c.id); note(`Tag rimosso: ${s.tag}`);
      } else if (s.type === 'assign') {
        run('UPDATE contacts SET owner_id=? WHERE id=?', s.user_id || null, c.id);
        const u = get('SELECT name FROM users WHERE id=?', s.user_id || 0);
        activity(c.id, 'assegnazione', `Assegnato a ${u ? u.name : 'nessuno'}`); note(`Assegnato a ${u ? u.name : 'nessuno'}`);
      } else if (s.type === 'create_task') {
        const due = fmt(new Date(Date.now() + (Number(s.days) || 0) * UNIT.giorni));
        const owner = get('SELECT owner_id FROM contacts WHERE id=?', c.id).owner_id;
        run('INSERT INTO tasks (contact_id,title,due_at,done,owner_id) VALUES (?,?,?,0,?)', c.id, render(s.title, c), due, owner);
        note(`Attività creata: ${render(s.title, c)}`);
      } else if (s.type === 'move_stage') {
        const o = get(`SELECT o.id,o.title FROM opportunities o WHERE o.contact_id=? ORDER BY o.id DESC`, c.id);
        const st = get('SELECT * FROM stages WHERE id=?', s.stage_id || 0);
        if (o && st) {
          run('UPDATE opportunities SET stage_id=?, updated_at=? WHERE id=?', st.id, now(), o.id);
          activity(c.id, 'pipeline', `«${o.title}» spostata in ${st.name} (automazione)`); note(`Opportunità spostata in ${st.name}`);
          fire('stage_changed', c.id, { stage_id: st.id }, depth + 1);
        } else note('Nessuna opportunità da spostare');
      } else if (s.type === 'notify') { activity(c.id, 'notifica', `Notifica interna: ${render(s.text, c)}`); note('Notifica interna registrata'); }
      else if (s.type === 'condition') {
        const has = tagsOf(c.id).includes(s.tag);
        if (has !== (s.mode !== 'not_has')) { note(`Condizione non soddisfatta (tag «${s.tag}»): automazione interrotta`); return save('done', i); }
        note(`Condizione soddisfatta (tag «${s.tag}»)`);
      }
    }
    note('Completata');
    save('done', i);
  } catch (e) {
    note(`Errore: ${e.message}`);
    save('error', i);
  }
}

function skipWait(runId) {
  const r = get('SELECT * FROM runs WHERE id=?', runId);
  if (r && r.status === 'waiting') advance(runId);
}

// Ogni 5 secondi riprende le run la cui attesa è scaduta; una volta al giorno lancia i compleanni.
function tick() {
  for (const r of all(`SELECT id FROM runs WHERE status='waiting' AND resume_at<=?`, now())) advance(r.id);
  const today = now().slice(0, 10);
  const last = get(`SELECT value FROM settings WHERE key='birthday_check'`);
  if (!last || last.value !== today) {
    run(`INSERT INTO settings (key,value) VALUES ('birthday_check',?) ON CONFLICT(key) DO UPDATE SET value=excluded.value`, today);
    for (const c of all(`SELECT id FROM contacts WHERE birthday IS NOT NULL AND substr(birthday,6,5)=?`, today.slice(5))) fire('birthday', c.id);
  }
}
function startTicker() { tick(); setInterval(tick, 5000).unref?.(); }

module.exports = { activity, conversation, message, addTag, fire, start, advance, skipWait, startTicker };
