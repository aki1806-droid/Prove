// Cordata CRM — server HTTP + API REST. Nessuna dipendenza: Node >= 22.5 (node:sqlite).
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { db, now, fmt, seedIfEmpty, reset } = require('./db');
const engine = require('./automations');

const PORT = Number(process.env.PORT) || 3000;
const PUB = path.join(__dirname, 'public');
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml' };

// ---------- tabelle esposte dal CRUD generico ----------
const T = {
  users: { cols: ['name', 'color'] },
  contacts: { cols: ['first_name', 'last_name', 'email', 'phone', 'company', 'source', 'tags', 'birthday', 'owner_id', 'notes'], json: ['tags'], stamp: true },
  stages: { cols: ['name', 'position', 'kind', 'color'], order: 'position' },
  opportunities: { cols: ['contact_id', 'title', 'value', 'stage_id', 'owner_id'], stamp: true },
  tasks: { cols: ['contact_id', 'title', 'due_at', 'done', 'owner_id'] },
  calendars: { cols: ['name', 'slug', 'duration', 'description', 'days', 'start_hour', 'end_hour', 'owner_id', 'stage_id'], json: ['days'] },
  appointments: { cols: ['calendar_id', 'contact_id', 'title', 'start_at', 'end_at', 'status', 'notes'], order: 'start_at' },
  workflows: { cols: ['name', 'active', 'trigger_type', 'trigger_config', 'steps'], json: ['trigger_config', 'steps'] },
  forms: { cols: ['name', 'slug', 'fields', 'stage_id', 'tag', 'thanks'], json: ['fields'] },
  pages: { cols: ['title', 'slug', 'blocks', 'published'], json: ['blocks'] },
  courses: { cols: ['title', 'slug', 'description'] },
  lessons: { cols: ['course_id', 'title', 'content', 'video_url', 'position'], order: 'position' },
};

const parseRow = (t, r) => {
  if (!r) return r;
  for (const k of T[t].json || []) { try { r[k] = JSON.parse(r[k] || 'null'); } catch { r[k] = null; } }
  return r;
};
const all = (sql, ...p) => db.prepare(sql).all(...p);
const get = (sql, ...p) => db.prepare(sql).get(...p);
const run = (sql, ...p) => db.prepare(sql).run(...p);
const one = (t, id) => parseRow(t, get(`SELECT * FROM ${t} WHERE id=?`, id));

function pick(t, body) {
  const out = {};
  for (const c of T[t].cols) {
    if (body[c] === undefined) continue;
    let v = body[c];
    if ((T[t].json || []).includes(c)) v = JSON.stringify(v ?? null);
    else if (typeof v === 'boolean') v = v ? 1 : 0;
    else if (v === '') v = null;
    out[c] = v;
  }
  return out;
}
function insert(t, body) {
  const d = pick(t, body);
  if (T[t].stamp) { d.created_at = now(); if (t === 'opportunities') d.updated_at = now(); }
  const k = Object.keys(d);
  const r = run(`INSERT INTO ${t} (${k.join(',')}) VALUES (${k.map(() => '?').join(',')})`, ...k.map(x => d[x]));
  return one(t, Number(r.lastInsertRowid));
}
function update(t, id, body) {
  const d = pick(t, body);
  if (t === 'opportunities') d.updated_at = now();
  const k = Object.keys(d);
  if (k.length) run(`UPDATE ${t} SET ${k.map(x => x + '=?').join(',')} WHERE id=?`, ...k.map(x => d[x]), id);
  return one(t, id);
}
const slugify = s => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'pagina';
function uniqueSlug(t, base, id) {
  let s = slugify(base), n = 1;
  while (get(`SELECT id FROM ${t} WHERE slug=? AND id IS NOT ?`, s, id ?? null)) s = `${slugify(base)}-${++n}`;
  return s;
}

// ---------- regole di dominio attorno al CRUD ----------
function createContact(body, sourceNote) {
  const c = insert('contacts', { tags: [], ...body });
  engine.activity(c.id, 'creato', sourceNote || 'Contatto creato');
  engine.fire('lead_created', c.id);
  return c;
}
function findOrCreateContact(data, source) {
  const email = (data.email || '').trim().toLowerCase();
  const phone = (data.phone || '').trim();
  let c = (email && get('SELECT * FROM contacts WHERE lower(email)=?', email)) || (phone && get('SELECT * FROM contacts WHERE phone=?', phone));
  if (c) return { contact: parseRow('contacts', c), created: false };
  return { contact: createContact({ first_name: data.first_name || 'Senza nome', last_name: data.last_name, email, phone, company: data.company, source }, `Contatto creato da: ${source}`), created: true };
}
function afterContactUpdate(before, after) {
  const added = (after.tags || []).filter(t => !(before.tags || []).includes(t));
  for (const t of added) { engine.activity(after.id, 'tag', `Tag aggiunto: ${t}`); engine.fire('tag_added', after.id, { tag: t }); }
}
function moveOpportunity(id, stageId) {
  const o = one('opportunities', id);
  if (!o || o.stage_id === Number(stageId)) return o;
  const st = one('stages', stageId);
  if (!st) throw httpError(400, 'Fase inesistente');
  const upd = update('opportunities', id, { stage_id: st.id });
  engine.activity(o.contact_id, 'pipeline', `«${o.title}» spostata in ${st.name}`);
  engine.fire('stage_changed', o.contact_id, { stage_id: st.id });
  return upd;
}
function slots(cal, date) {
  const d = new Date(date + 'T00:00:00');
  if (isNaN(d) || !(cal.days || []).includes(d.getDay())) return [];
  const busy = all('SELECT start_at,end_at FROM appointments WHERE calendar_id=? AND status!=? AND substr(start_at,1,10)=?', cal.id, 'annullato', date);
  const out = [], nowS = now();
  for (let m = cal.start_hour * 60; m + cal.duration <= cal.end_hour * 60; m += cal.duration) {
    const s = fmt(new Date(d.getTime() + m * 60000)), e = fmt(new Date(d.getTime() + (m + cal.duration) * 60000));
    if (s <= nowS) continue;
    if (!busy.some(b => b.start_at < e && b.end_at > s)) out.push(s);
  }
  return out;
}
function book(cal, body, origin) {
  if (!slots(cal, String(body.start_at).slice(0, 10)).includes(body.start_at)) throw httpError(409, 'Orario non più disponibile');
  const { contact } = findOrCreateContact(body, `Prenotazione: ${cal.name}`);
  const end = fmt(new Date(new Date(body.start_at).getTime() + cal.duration * 60000));
  const a = insert('appointments', { calendar_id: cal.id, contact_id: contact.id, title: cal.name, start_at: body.start_at, end_at: end, status: 'confermato', notes: body.notes });
  engine.activity(contact.id, 'appuntamento', `Appuntamento «${cal.name}» il ${body.start_at.replace('T', ' alle ').slice(0, 19)} (${origin})`);
  if (cal.stage_id) {
    const o = get(`SELECT o.id FROM opportunities o JOIN stages s ON s.id=o.stage_id WHERE o.contact_id=? AND s.kind='open' ORDER BY o.id DESC`, contact.id);
    if (o) moveOpportunity(o.id, cal.stage_id);
    else insert('opportunities', { contact_id: contact.id, title: cal.name, value: 0, stage_id: cal.stage_id, owner_id: cal.owner_id });
  }
  engine.fire('appointment_booked', contact.id, { calendar_id: cal.id });
  return a;
}
function submitForm(form, data) {
  const map = {};
  for (const f of form.fields || []) {
    const v = String(data[f.key] ?? '').trim();
    if (f.required && !v) throw httpError(400, `Campo obbligatorio: ${f.label}`);
    map[f.key] = v;
  }
  const { contact } = findOrCreateContact(map, `Modulo: ${form.name}`);
  run('INSERT INTO submissions (form_id,contact_id,data,created_at) VALUES (?,?,?,?)', form.id, contact.id, JSON.stringify(map), now());
  const extra = (form.fields || []).filter(f => !['first_name', 'last_name', 'email', 'phone', 'company'].includes(f.key) && map[f.key]).map(f => `${f.label}: ${map[f.key]}`).join(' · ');
  engine.activity(contact.id, 'modulo', `Ha compilato «${form.name}»${extra ? ' — ' + extra : ''}`);
  if (form.tag) engine.addTag(contact.id, form.tag);
  if (form.stage_id && !get('SELECT id FROM opportunities WHERE contact_id=?', contact.id))
    insert('opportunities', { contact_id: contact.id, title: `Richiesta da ${form.name}`, value: 0, stage_id: form.stage_id, owner_id: contact.owner_id });
  engine.fire('form_submitted', contact.id, { form_id: form.id });
  return { ok: true, thanks: form.thanks || 'Grazie, ti ricontattiamo presto.' };
}
function memberView(token) {
  const e = get('SELECT * FROM enrollments WHERE token=?', token);
  if (!e) throw httpError(404, 'Accesso non valido');
  const c = get('SELECT first_name,last_name FROM contacts WHERE id=?', e.contact_id);
  const posts = all('SELECT * FROM posts WHERE course_id=? ORDER BY id DESC', e.course_id);
  for (const p of posts) p.comments = all('SELECT * FROM comments WHERE post_id=? ORDER BY id', p.id);
  return {
    enrollment: e, member: `${c.first_name} ${c.last_name || ''}`.trim(), course: one('courses', e.course_id),
    lessons: all('SELECT * FROM lessons WHERE course_id=? ORDER BY position,id', e.course_id),
    completed: JSON.parse(e.completed || '[]'), posts,
  };
}

// ---------- viste aggregate ----------
function dashboard() {
  const month = now().slice(0, 7);
  return {
    contacts: get('SELECT count(*) n FROM contacts').n,
    new_contacts: get('SELECT count(*) n FROM contacts WHERE substr(created_at,1,7)=?', month).n,
    open: get(`SELECT count(*) n, coalesce(sum(value),0) v FROM opportunities o JOIN stages s ON s.id=o.stage_id WHERE s.kind='open'`),
    won: get(`SELECT count(*) n, coalesce(sum(value),0) v FROM opportunities o JOIN stages s ON s.id=o.stage_id WHERE s.kind='won'`),
    lost: get(`SELECT count(*) n FROM opportunities o JOIN stages s ON s.id=o.stage_id WHERE s.kind='lost'`).n,
    unread: get('SELECT coalesce(sum(unread),0) n FROM conversations').n,
    tasks: all(`SELECT t.*, c.first_name||' '||coalesce(c.last_name,'') contact FROM tasks t LEFT JOIN contacts c ON c.id=t.contact_id WHERE t.done=0 ORDER BY t.due_at LIMIT 6`),
    stages: all(`SELECT s.id,s.name,s.kind,s.color,count(o.id) n,coalesce(sum(o.value),0) v FROM stages s LEFT JOIN opportunities o ON o.stage_id=s.id GROUP BY s.id ORDER BY s.position`),
    sources: all(`SELECT coalesce(source,'Non indicata') source,count(*) n FROM contacts GROUP BY 1 ORDER BY n DESC`),
    upcoming: all(`SELECT a.*, c.first_name||' '||coalesce(c.last_name,'') contact FROM appointments a LEFT JOIN contacts c ON c.id=a.contact_id WHERE a.start_at>=? AND a.status!='annullato' ORDER BY a.start_at LIMIT 6`, now()),
    recent: all(`SELECT a.*, c.first_name||' '||coalesce(c.last_name,'') contact FROM activities a JOIN contacts c ON c.id=a.contact_id ORDER BY a.id DESC LIMIT 10`),
  };
}
function conversationList() {
  return all(`SELECT v.*, c.first_name||' '||coalesce(c.last_name,'') contact,
    (SELECT body FROM messages m WHERE m.conversation_id=v.id ORDER BY m.id DESC LIMIT 1) last_body
    FROM conversations v JOIN contacts c ON c.id=v.contact_id ORDER BY v.last_at DESC`);
}

// ---------- HTTP ----------
function httpError(status, message) { const e = new Error(message); e.status = status; return e; }
function readBody(req) {
  return new Promise((res, rej) => {
    let s = '';
    req.on('data', c => { s += c; if (s.length > 1e6) { rej(httpError(413, 'Richiesta troppo grande')); req.destroy(); } });
    req.on('end', () => { try { res(s ? JSON.parse(s) : {}); } catch { rej(httpError(400, 'JSON non valido')); } });
    req.on('error', rej);
  });
}

async function api(req, url, pre) {
  const seg = url.pathname.split('/').filter(Boolean).slice(1).map(decodeURIComponent); // senza "api"
  const M = req.method;
  const body = pre !== undefined ? pre : M === 'POST' || M === 'PUT' ? await readBody(req) : {};
  const [a, b, c, d] = seg;

  // --- pubblico (pagine condivise con i clienti) ---
  if (a === 'public') {
    if (b === 'calendar') {
      const cal = parseRow('calendars', get('SELECT * FROM calendars WHERE slug=?', c));
      if (!cal) throw httpError(404, 'Calendario non trovato');
      if (M === 'GET' && d === 'slots') return slots(cal, url.searchParams.get('date') || '');
      if (M === 'GET') return { name: cal.name, description: cal.description, duration: cal.duration, days: cal.days };
      if (M === 'POST') { const ap = book(cal, body, 'prenotazione online'); return { ok: true, start_at: ap.start_at }; }
    }
    if (b === 'form') {
      const f = parseRow('forms', get('SELECT * FROM forms WHERE slug=?', c));
      if (!f) throw httpError(404, 'Modulo non trovato');
      if (M === 'GET') return { name: f.name, fields: f.fields };
      if (M === 'POST') return submitForm(f, body);
    }
    if (b === 'page' && M === 'GET') {
      const p = parseRow('pages', get('SELECT * FROM pages WHERE slug=? AND published=1', c));
      if (!p) throw httpError(404, 'Pagina non trovata');
      for (const bl of p.blocks || []) if (bl.type === 'modulo') { const f = one('forms', bl.form_id); bl.form = f && { slug: f.slug, name: f.name, fields: f.fields }; }
      return { title: p.title, blocks: p.blocks };
    }
    if (b === 'member') {
      const v = memberView(c);
      if (M === 'GET') return v;
      if (d === 'complete') {
        const set = new Set(v.completed); body.done === false ? set.delete(body.lesson_id) : set.add(body.lesson_id);
        run('UPDATE enrollments SET completed=? WHERE id=?', JSON.stringify([...set]), v.enrollment.id);
        if (set.size === v.lessons.length && v.lessons.length) { engine.activity(v.enrollment.contact_id, 'corso', `Ha completato il corso «${v.course.title}»`); engine.fire('course_completed', v.enrollment.contact_id, { course_id: v.course.id }); }
        return memberView(c);
      }
      if (d === 'post') { if (!String(body.body || '').trim()) throw httpError(400, 'Testo vuoto'); run('INSERT INTO posts (course_id,author_name,body,created_at) VALUES (?,?,?,?)', v.course.id, v.member, String(body.body).slice(0, 2000), now()); return memberView(c); }
      if (d === 'comment') {
        if (!get('SELECT id FROM posts WHERE id=? AND course_id=?', body.post_id, v.course.id)) throw httpError(404, 'Post non trovato');
        run('INSERT INTO comments (post_id,author_name,body,created_at) VALUES (?,?,?,?)', body.post_id, v.member, String(body.body || '').slice(0, 2000), now());
        return memberView(c);
      }
    }
    throw httpError(404, 'Non trovato');
  }

  // --- viste e azioni specifiche ---
  if (a === 'dashboard') return dashboard();
  if (a === 'reset' && M === 'POST') { reset(); return { ok: true }; }
  if (a === 'contacts' && c === 'full') {
    const ct = one('contacts', b); if (!ct) throw httpError(404, 'Contatto non trovato');
    return {
      contact: ct,
      opportunities: all('SELECT * FROM opportunities WHERE contact_id=? ORDER BY id DESC', b),
      activities: all('SELECT * FROM activities WHERE contact_id=? ORDER BY id DESC LIMIT 60', b),
      appointments: all('SELECT * FROM appointments WHERE contact_id=? ORDER BY start_at DESC', b),
      conversations: all('SELECT * FROM conversations WHERE contact_id=?', b),
      tasks: all('SELECT * FROM tasks WHERE contact_id=? ORDER BY done, due_at', b),
      enrollments: all('SELECT e.*, c.title course FROM enrollments e JOIN courses c ON c.id=e.course_id WHERE e.contact_id=?', b),
    };
  }
  if (a === 'contacts' && c === 'note' && M === 'POST') { engine.activity(Number(b), 'nota', String(body.text || '').slice(0, 2000)); return { ok: true }; }
  if (a === 'opportunities' && c === 'move' && M === 'POST') return moveOpportunity(Number(b), body.stage_id);
  if (a === 'conversations') {
    if (M === 'GET' && !b) return conversationList();
    if (M === 'POST' && !b) return engine.conversation(Number(body.contact_id), body.channel || 'whatsapp');
    if (M === 'GET' && b) {
      run('UPDATE conversations SET unread=0 WHERE id=?', b);
      return { conversation: get(`SELECT v.*, c.first_name||' '||coalesce(c.last_name,'') contact, c.phone, c.email FROM conversations v JOIN contacts c ON c.id=v.contact_id WHERE v.id=?`, b), messages: all('SELECT * FROM messages WHERE conversation_id=? ORDER BY id', b) };
    }
    if (M === 'PUT' && b) { run('UPDATE conversations SET assigned_id=? WHERE id=?', body.assigned_id || null, b); return { ok: true }; }
    if (M === 'POST' && c === 'messages') {
      const v = get('SELECT * FROM conversations WHERE id=?', b); if (!v) throw httpError(404, 'Conversazione non trovata');
      const text = String(body.body || '').trim(); if (!text) throw httpError(400, 'Messaggio vuoto');
      const inbound = body.direction === 'in';
      engine.message(v.id, inbound ? 'in' : 'out', text, inbound ? null : String(body.author || ''));
      if (inbound) engine.fire('message_received', v.contact_id, { channel: v.channel });
      return { ok: true };
    }
  }
  if (a === 'appointments' && M === 'POST' && !b && body.calendar_id && !body.end_at) {
    const cal = one('calendars', body.calendar_id); if (!cal) throw httpError(400, 'Calendario inesistente');
    const ct = one('contacts', body.contact_id); if (!ct) throw httpError(400, 'Contatto inesistente');
    return book(cal, { ...body, email: ct.email, phone: ct.phone, first_name: ct.first_name }, 'inserito da operatore');
  }
  if (a === 'workflows' && c === 'test' && M === 'POST') { const w = one('workflows', b); if (!w) throw httpError(404, 'Automazione non trovata'); engine.start(w, Number(body.contact_id)); return { ok: true }; }
  if (a === 'runs') {
    if (M === 'GET') return all(`SELECT r.*, c.first_name||' '||coalesce(c.last_name,'') contact, w.name workflow FROM runs r JOIN contacts c ON c.id=r.contact_id JOIN workflows w ON w.id=r.workflow_id ${url.searchParams.get('workflow_id') ? 'WHERE r.workflow_id=?' : ''} ORDER BY r.id DESC LIMIT 40`, ...(url.searchParams.get('workflow_id') ? [url.searchParams.get('workflow_id')] : [])).map(r => ({ ...r, log: JSON.parse(r.log || '[]') }));
    if (M === 'POST' && c === 'skip') { engine.skipWait(Number(b)); return { ok: true }; }
  }
  if (a === 'forms' && c === 'submissions') return all(`SELECT s.*, c.first_name||' '||coalesce(c.last_name,'') contact FROM submissions s JOIN contacts c ON c.id=s.contact_id WHERE s.form_id=? ORDER BY s.id DESC`, b).map(s => ({ ...s, data: JSON.parse(s.data) }));
  if (a === 'courses' && c === 'detail') {
    const co = one('courses', b); if (!co) throw httpError(404, 'Corso non trovato');
    const posts = all('SELECT * FROM posts WHERE course_id=? ORDER BY id DESC', b);
    for (const p of posts) p.comments = all('SELECT * FROM comments WHERE post_id=? ORDER BY id', p.id);
    return {
      course: co, lessons: all('SELECT * FROM lessons WHERE course_id=? ORDER BY position,id', b), posts,
      enrollments: all(`SELECT e.*, c.first_name||' '||coalesce(c.last_name,'') contact FROM enrollments e JOIN contacts c ON c.id=e.contact_id WHERE e.course_id=? ORDER BY e.id DESC`, b).map(e => ({ ...e, completed: JSON.parse(e.completed || '[]') })),
    };
  }
  if (a === 'courses' && c === 'enroll' && M === 'POST') {
    if (get('SELECT id FROM enrollments WHERE course_id=? AND contact_id=?', b, body.contact_id)) throw httpError(409, 'Contatto già iscritto');
    run('INSERT INTO enrollments (course_id,contact_id,token,completed,created_at) VALUES (?,?,?,?,?)', b, body.contact_id, crypto.randomBytes(12).toString('hex'), '[]', now());
    engine.activity(Number(body.contact_id), 'corso', `Iscritto al corso «${one('courses', b).title}»`);
    return { ok: true };
  }
  if (a === 'enrollments' && M === 'DELETE') { run('DELETE FROM enrollments WHERE id=?', b); return { ok: true }; }
  if (a === 'posts' && M === 'POST') { run('INSERT INTO posts (course_id,author_name,body,created_at) VALUES (?,?,?,?)', body.course_id, body.author_name || 'Staff', String(body.body || '').slice(0, 2000), now()); return { ok: true }; }
  if (a === 'posts' && M === 'DELETE') { run('DELETE FROM comments WHERE post_id=?', b); run('DELETE FROM posts WHERE id=?', b); return { ok: true }; }

  // --- CRUD generico ---
  if (!T[a]) throw httpError(404, 'Non trovato');
  if (M === 'GET' && !b) {
    const where = [], params = [];
    for (const [k, v] of url.searchParams) if (T[a].cols.includes(k)) { where.push(`${k}=?`); params.push(v); }
    return all(`SELECT * FROM ${a} ${where.length ? 'WHERE ' + where.join(' AND ') : ''} ORDER BY ${T[a].order || 'id DESC'}`, ...params).map(r => parseRow(a, r));
  }
  if (M === 'GET') { const r = one(a, b); if (!r) throw httpError(404, 'Non trovato'); return r; }
  if (M === 'POST' && !b) {
    if (['calendars', 'forms', 'pages', 'courses'].includes(a)) body.slug = uniqueSlug(a, body.slug || body.name || body.title);
    if (a === 'contacts') return createContact(body);
    return insert(a, body);
  }
  if (M === 'PUT' && b) {
    const before = one(a, b); if (!before) throw httpError(404, 'Non trovato');
    if (body.slug !== undefined && ['calendars', 'forms', 'pages', 'courses'].includes(a)) body.slug = uniqueSlug(a, body.slug, Number(b));
    if (a === 'opportunities' && body.stage_id !== undefined && Number(body.stage_id) !== before.stage_id) { moveOpportunity(Number(b), body.stage_id); delete body.stage_id; }
    const after = update(a, b, body);
    if (a === 'contacts') afterContactUpdate(before, after);
    return after;
  }
  if (M === 'DELETE' && b) {
    if (a === 'contacts') for (const t of ['opportunities', 'activities', 'appointments', 'tasks', 'runs', 'enrollments', 'submissions']) run(`DELETE FROM ${t} WHERE contact_id=?`, b);
    if (a === 'contacts') { run('DELETE FROM messages WHERE conversation_id IN (SELECT id FROM conversations WHERE contact_id=?)', b); run('DELETE FROM conversations WHERE contact_id=?', b); }
    if (a === 'stages' && get('SELECT id FROM opportunities WHERE stage_id=?', b)) throw httpError(409, 'Sposta prima le opportunità di questa fase');
    if (a === 'courses') { run('DELETE FROM lessons WHERE course_id=?', b); run('DELETE FROM enrollments WHERE course_id=?', b); }
    if (a === 'workflows') run('DELETE FROM runs WHERE workflow_id=?', b);
    run(`DELETE FROM ${a} WHERE id=?`, b);
    return { ok: true };
  }
  throw httpError(405, 'Metodo non consentito');
}

function serveStatic(res, url) {
  let rel = url.pathname === '/' ? '/index.html' : url.pathname;
  if (rel.startsWith('/p/')) rel = '/public.html';
  const file = path.normalize(path.join(PUB, rel));
  if (!file.startsWith(PUB + path.sep)) { res.writeHead(403).end(); return; }
  fs.readFile(file, (err, buf) => {
    if (err) { res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Non trovato'); return; }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-cache' }).end(buf);
  });
}

const handler = async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  if (!url.pathname.startsWith('/api/')) return serveStatic(res, url);
  try {
    const out = await api(req, url);
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' }).end(JSON.stringify(out ?? null));
  } catch (e) {
    if (!e.status) console.error(e);
    res.writeHead(e.status || 500, { 'Content-Type': 'application/json; charset=utf-8' }).end(JSON.stringify({ error: e.status ? e.message : 'Errore interno' }));
  }
};

seedIfEmpty();
engine.startTicker();
// Avviato da riga di comando apre la porta; la versione di prova nel browser (build-demo.js) usa solo api().
if (require.main === module) http.createServer(handler).listen(PORT, () => console.log(`Cordata CRM in ascolto su http://localhost:${PORT}`));
module.exports = { api };
