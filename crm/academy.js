// Corsi e comunità: regole, viste per lo staff e portale del cliente.
const crypto = require('node:crypto');
const { db, now } = require('./db');
const engine = require('./automations');

const get = (sql, ...p) => db.prepare(sql).get(...p);
const all = (sql, ...p) => db.prepare(sql).all(...p);
const run = (sql, ...p) => db.prepare(sql).run(...p);
const J = (s, d) => { try { return JSON.parse(s) ?? d; } catch { return d; } };
const err = (status, message) => { const e = new Error(message); e.status = status; return e; };
const text = (s, max = 4000) => String(s ?? '').trim().slice(0, max);

// ---------- punti e livelli ----------
const LEVELS = [[0, 'Nuovo arrivato'], [10, 'Curioso'], [30, 'Attivo'], [70, 'Esperto'], [150, 'Mentore'], [300, 'Veterano'], [600, 'Maestro'], [1000, 'Leggenda']];
const POINTS = { post: 5, comment: 2, like: 1, lesson: 10, quiz: 15, course: 50, rsvp: 3 };
const levelOf = pts => LEVELS.filter(([min]) => pts >= min).length;
const levelInfo = pts => { const n = levelOf(pts); return { level: n, level_name: LEVELS[n - 1][1], next_at: LEVELS[n] ? LEVELS[n][0] : null, level_from: LEVELS[n - 1][0] }; };
const contactName = id => { const c = get('SELECT first_name,last_name FROM contacts WHERE id=?', id); return c ? `${c.first_name || ''} ${c.last_name || ''}`.trim() : 'Membro'; };

function memberFor(contactId, create = true) {
  let m = get('SELECT * FROM members WHERE contact_id=?', contactId);
  if (!m && create) {
    run('INSERT INTO members (contact_id,token,role,points,joined_at,last_seen) VALUES (?,?,?,0,?,?)', contactId, crypto.randomBytes(12).toString('hex'), 'membro', now(), now());
    m = get('SELECT * FROM members WHERE contact_id=?', contactId);
    engine.activity(contactId, 'comunità', 'Accesso al portale clienti attivato');
  }
  return m;
}
function award(memberId, pts, reason, depth = 0) {
  const m = get('SELECT * FROM members WHERE id=?', memberId);
  if (!m || !pts) return;
  const before = levelOf(m.points), total = Math.max(0, m.points + pts), after = levelOf(total);
  run('UPDATE members SET points=? WHERE id=?', total, m.id);
  run('INSERT INTO point_log (member_id,points,reason,at) VALUES (?,?,?,?)', m.id, pts, reason, now());
  if (after > before) { engine.activity(m.contact_id, 'comunità', `Ha raggiunto il livello ${after} (${LEVELS[after - 1][1]})`); engine.fire('level_reached', m.contact_id, { level: after }, depth + 1); }
}

// ---------- corsi ----------
function enroll(courseId, contactId, depth = 0) {
  const c = get('SELECT * FROM courses WHERE id=?', courseId);
  if (!c) return 'Corso inesistente';
  if (get('SELECT id FROM enrollments WHERE course_id=? AND contact_id=?', courseId, contactId)) return `Già iscritto a «${c.title}»`;
  memberFor(contactId);
  run('INSERT INTO enrollments (course_id,contact_id,created_at,last_activity) VALUES (?,?,?,?)', courseId, contactId, now(), now());
  engine.activity(contactId, 'corso', `Iscritto al corso «${c.title}»`);
  engine.fire('course_enrolled', contactId, { course_id: courseId }, depth + 1);
  return `Iscritto a «${c.title}»`;
}
function unenrollById(id) { run('DELETE FROM lesson_progress WHERE enrollment_id=?', id); run('DELETE FROM enrollments WHERE id=?', id); }
function unenroll(courseId, contactId) {
  const e = get('SELECT id FROM enrollments WHERE course_id=? AND contact_id=?', courseId, contactId);
  if (!e) return 'Non era iscritto';
  unenrollById(e.id); return 'Iscrizione rimossa';
}
function courseState(contactId, courseId) {
  const e = get('SELECT completed_at FROM enrollments WHERE course_id=? AND contact_id=?', courseId, contactId);
  return !e ? 'none' : e.completed_at ? 'completed' : 'enrolled';
}
Object.assign(engine.hooks, {
  enroll, unenroll, courseState,
  level: contactId => { const m = memberFor(contactId, false); return m ? levelOf(m.points) : 0; },
  points: (contactId, pts, reason, depth) => { award(memberFor(contactId).id, pts, reason, depth); return `${pts} punti assegnati`; },
});

const lessonsOf = (courseId, onlyPublished) => all(`SELECT l.* FROM lessons l LEFT JOIN modules m ON m.id=l.module_id WHERE l.course_id=? ${onlyPublished ? 'AND l.published=1' : ''} ORDER BY m.position, l.position, l.id`, courseId)
  .map(l => ({ ...l, resources: J(l.resources, []), quiz: J(l.quiz, null) }));

// Vista di un corso per un membro: avanzamento e lezioni sbloccate secondo la regola di rilascio.
function courseView(c, member, full) {
  const e = get('SELECT * FROM enrollments WHERE course_id=? AND contact_id=?', c.id, member.contact_id);
  const lessons = lessonsOf(c.id, true), lvl = levelOf(member.points);
  const prog = e ? Object.fromEntries(all('SELECT * FROM lesson_progress WHERE enrollment_id=?', e.id).map(p => [p.lesson_id, p])) : {};
  const days = e ? Math.floor((Date.now() - new Date(e.created_at).getTime()) / 86400e3) : 0;
  let prevDone = true;
  const view = lessons.map(l => {
    const done = !!prog[l.id];
    let locked = null;
    if (!e) locked = 'Iscriviti per accedere';
    else if (c.drip_mode === 'sequenziale' && !prevDone && !done) locked = 'Completa prima la lezione precedente';
    else if (c.drip_mode === 'programmato' && days < l.drip_days && !done) locked = `Disponibile fra ${l.drip_days - days} giorni`;
    prevDone = done;
    const o = { id: l.id, module_id: l.module_id, title: l.title, type: l.type, minutes: l.minutes, done, score: prog[l.id] ? prog[l.id].score : null, locked };
    if (full && !locked) Object.assign(o, {
      content: l.content, video_url: l.video_url, resources: l.resources,
      quiz: l.quiz && { pass: l.quiz.pass, questions: (l.quiz.questions || []).map(q => ({ q: q.q, options: q.options })) },
      comments: all('SELECT * FROM lesson_comments WHERE lesson_id=? ORDER BY id', l.id),
    });
    return o;
  });
  const doneN = view.filter(l => l.done).length;
  return {
    id: c.id, title: c.title, description: c.description, emoji: c.emoji, color: c.color, category: c.category, instructor: c.instructor, price: c.price, access: c.access, min_level: c.min_level, drip_mode: c.drip_mode,
    enrolled: !!e, can_enroll: !e && c.access === 'aperto' && lvl >= c.min_level,
    blocked: !e ? (c.access !== 'aperto' ? 'Corso su invito: chiedi allo staff' : lvl < c.min_level ? `Si sblocca al livello ${c.min_level}` : null) : null,
    total: view.length, done: doneN, progress: view.length ? Math.round(100 * doneN / view.length) : 0, minutes: view.reduce((a, l) => a + (l.minutes || 0), 0),
    completed_at: e && e.completed_at, certificate: !!(c.certificate && e && e.completed_at) && { code: `CRD-${c.id}-${e.id}-${String(e.completed_at).slice(0, 10).replace(/-/g, '')}`, date: e.completed_at },
    modules: all('SELECT * FROM modules WHERE course_id=? ORDER BY position,id', c.id).map(m => ({ id: m.id, title: m.title, lessons: view.filter(l => l.module_id === m.id) })).filter(m => m.lessons.length),
  };
}
function completeLesson(member, body, depth = 0) {
  const l = get('SELECT * FROM lessons WHERE id=? AND published=1', body.lesson_id);
  if (!l) throw err(404, 'Lezione non trovata');
  const c = get('SELECT * FROM courses WHERE id=?', l.course_id);
  const e = get('SELECT * FROM enrollments WHERE course_id=? AND contact_id=?', c.id, member.contact_id);
  if (!e) throw err(403, 'Non sei iscritto a questo corso');
  const lv = courseView(c, member, false).modules.flatMap(m => m.lessons).find(x => x.id === l.id);
  if (!lv || lv.locked) throw err(403, (lv && lv.locked) || 'Lezione non disponibile');
  run('UPDATE enrollments SET last_activity=? WHERE id=?', now(), e.id);
  const had = get('SELECT * FROM lesson_progress WHERE enrollment_id=? AND lesson_id=?', e.id, l.id);
  let result = null;
  if (l.type === 'quiz') {
    const quiz = J(l.quiz, { questions: [] }), qs = quiz.questions || [], answers = body.answers || [];
    const right = qs.filter((q, i) => Number(answers[i]) === Number(q.correct)).length, score = qs.length ? Math.round(100 * right / qs.length) : 100, passed = score >= (quiz.pass || 0);
    result = { score, passed, right, total: qs.length, pass: quiz.pass || 0 };
    engine.fire(passed ? 'quiz_passed' : 'quiz_failed', member.contact_id, { course_id: c.id }, depth + 1);
    if (!passed) { engine.activity(member.contact_id, 'corso', `Verifica «${l.title}» non superata (${score}%)`); return result; }
    if (had) { run('UPDATE lesson_progress SET score=max(score,?), attempts=attempts+1 WHERE id=?', score, had.id); return result; }
    run('INSERT INTO lesson_progress (enrollment_id,lesson_id,done_at,score) VALUES (?,?,?,?)', e.id, l.id, now(), score);
    award(member.id, POINTS.quiz, `Verifica superata: ${l.title}`, depth);
  } else {
    if (body.done === false) { if (had) run('DELETE FROM lesson_progress WHERE id=?', had.id); return null; }
    if (had) return null;
    run('INSERT INTO lesson_progress (enrollment_id,lesson_id,done_at) VALUES (?,?,?)', e.id, l.id, now());
    award(member.id, POINTS.lesson, `Lezione completata: ${l.title}`, depth);
  }
  engine.fire('lesson_completed', member.contact_id, { course_id: c.id }, depth + 1);
  const total = get('SELECT count(*) n FROM lessons WHERE course_id=? AND published=1', c.id).n;
  const done = get('SELECT count(*) n FROM lesson_progress p JOIN lessons l ON l.id=p.lesson_id WHERE p.enrollment_id=? AND l.published=1', e.id).n;
  if (total && done >= total && !e.completed_at) {
    run('UPDATE enrollments SET completed_at=? WHERE id=?', now(), e.id);
    award(member.id, POINTS.course, `Corso completato: ${c.title}`, depth);
    engine.activity(member.contact_id, 'corso', `Ha completato il corso «${c.title}»`);
    engine.fire('course_completed', member.contact_id, { course_id: c.id }, depth + 1);
  }
  return result;
}

// ---------- comunità ----------
function postsView(meId) {
  const lv = Object.fromEntries(all('SELECT id,points,role FROM members').map(m => [m.id, m]));
  const likes = all('SELECT target,target_id,member_id FROM likes');
  const count = (t, id) => likes.filter(l => l.target === t && l.target_id === id).length;
  const mine = (t, id) => likes.some(l => l.target === t && l.target_id === id && l.member_id === meId);
  const author = x => ({ level: x.member_id && lv[x.member_id] ? levelOf(lv[x.member_id].points) : null, staff: !x.member_id });
  return all('SELECT * FROM posts ORDER BY pinned DESC, id DESC').map(p => {
    const poll = J(p.poll, null), votes = poll ? all('SELECT option,member_id FROM poll_votes WHERE post_id=?', p.id) : [];
    return {
      ...p, ...author(p), likes: count('post', p.id), liked: mine('post', p.id),
      poll: poll && { options: poll.options.map((label, i) => ({ label, votes: votes.filter(v => v.option === i).length })), total: votes.length, mine: (votes.find(v => v.member_id === meId) || {}).option ?? null },
      comments: all('SELECT * FROM comments WHERE post_id=? ORDER BY id', p.id).map(c => ({ ...c, ...author(c), likes: count('comment', c.id), liked: mine('comment', c.id) })),
    };
  });
}
const membersView = () => all(`SELECT m.*, c.first_name||' '||coalesce(c.last_name,'') name, c.company FROM members m JOIN contacts c ON c.id=m.contact_id ORDER BY m.points DESC, m.id`)
  .map(m => ({ ...m, ...levelInfo(m.points), posts: get('SELECT count(*) n FROM posts WHERE member_id=?', m.id).n, comments: get('SELECT count(*) n FROM comments WHERE member_id=?', m.id).n }));
const eventsView = meId => all('SELECT * FROM events ORDER BY start_at').map(e => ({ ...e, going: get('SELECT count(*) n FROM event_rsvp WHERE event_id=?', e.id).n, mine: !!get('SELECT id FROM event_rsvp WHERE event_id=? AND member_id=?', e.id, meId || 0) }));
const setting = k => (get('SELECT value FROM settings WHERE key=?', k) || {}).value;
const communityInfo = () => ({ name: setting('community_name') || 'Comunità', tagline: setting('community_tagline') || '' });

function addPost({ channel_id, member, author_name, title, body, poll_options }, depth = 0) {
  const ch = get('SELECT * FROM channels WHERE id=?', channel_id);
  if (!ch) throw err(400, 'Canale inesistente');
  if (member && ch.staff_only && member.role !== 'moderatore') throw err(403, 'In questo canale scrive solo lo staff');
  if (!text(body) && !text(title)) throw err(400, 'Scrivi qualcosa');
  const opts = (poll_options || []).map(o => text(o, 120)).filter(Boolean);
  run('INSERT INTO posts (channel_id,member_id,author_name,title,body,poll,created_at) VALUES (?,?,?,?,?,?,?)', ch.id, member ? member.id : null, author_name, text(title, 160), text(body), opts.length >= 2 ? JSON.stringify({ options: opts }) : null, now());
  if (member) { award(member.id, POINTS.post, 'Nuovo post', depth); engine.fire('community_post', member.contact_id, { channel_id: ch.id }, depth + 1); }
}
function addComment({ post_id, parent_id, member, author_name, body }) {
  const p = get('SELECT * FROM posts WHERE id=?', post_id);
  if (!p) throw err(404, 'Post non trovato');
  if (p.locked && member) throw err(403, 'I commenti a questo post sono chiusi');
  if (!text(body)) throw err(400, 'Commento vuoto');
  const parent = parent_id && get('SELECT id,parent_id FROM comments WHERE id=? AND post_id=?', parent_id, p.id);
  run('INSERT INTO comments (post_id,parent_id,member_id,author_name,body,created_at) VALUES (?,?,?,?,?,?)', p.id, parent ? (parent.parent_id || parent.id) : null, member ? member.id : null, author_name, text(body, 2000), now());
  if (member) award(member.id, POINTS.comment, 'Commento');
}
function deletePost(id) { run('DELETE FROM likes WHERE target=? AND target_id=?', 'post', id); run(`DELETE FROM likes WHERE target='comment' AND target_id IN (SELECT id FROM comments WHERE post_id=?)`, id); run('DELETE FROM comments WHERE post_id=?', id); run('DELETE FROM poll_votes WHERE post_id=?', id); run('DELETE FROM posts WHERE id=?', id); }
function deleteComment(id) { run(`DELETE FROM likes WHERE target='comment' AND (target_id=? OR target_id IN (SELECT id FROM comments WHERE parent_id=?))`, id, id); run('DELETE FROM comments WHERE id=? OR parent_id=?', id, id); }

// ---------- portale del cliente ----------
function portalView(m, extra = {}) {
  const name = contactName(m.contact_id);
  return {
    community: communityInfo(), levels: LEVELS.map(([min, label], i) => ({ level: i + 1, min, label })), points_table: POINTS,
    me: { id: m.id, name, role: m.role, bio: m.bio, points: m.points, ...levelInfo(m.points), log: all('SELECT * FROM point_log WHERE member_id=? ORDER BY id DESC LIMIT 12', m.id) },
    channels: all('SELECT * FROM channels ORDER BY position,id'), posts: postsView(m.id),
    members: membersView().map(x => ({ id: x.id, name: x.name, company: x.company, role: x.role, bio: x.bio, points: x.points, level: x.level, level_name: x.level_name, posts: x.posts, comments: x.comments })),
    events: eventsView(m.id),
    courses: all('SELECT * FROM courses WHERE published=1 ORDER BY id').map(c => courseView(c, m, true)),
    ...extra,
  };
}
function portal(token, action, M, body) {
  let m = get('SELECT * FROM members WHERE token=?', token);
  if (!m) throw err(404, 'Accesso non valido');
  run('UPDATE members SET last_seen=? WHERE id=?', now(), m.id);
  const name = contactName(m.contact_id), mod = m.role === 'moderatore';
  let extra = {};
  if (M === 'POST') {
    if (action === 'post') addPost({ ...body, member: m, author_name: name });
    else if (action === 'comment') addComment({ ...body, member: m, author_name: name });
    else if (action === 'like') {
      const t = body.target === 'comment' ? 'comment' : 'post', row = get(`SELECT member_id FROM ${t === 'post' ? 'posts' : 'comments'} WHERE id=?`, body.id);
      if (!row) throw err(404, 'Non trovato');
      const had = get('SELECT id FROM likes WHERE target=? AND target_id=? AND member_id=?', t, body.id, m.id);
      if (had) run('DELETE FROM likes WHERE id=?', had.id);
      else { run('INSERT INTO likes (target,target_id,member_id) VALUES (?,?,?)', t, body.id, m.id); if (row.member_id && row.member_id !== m.id) award(row.member_id, POINTS.like, 'Mi piace ricevuto'); }
    } else if (action === 'vote') {
      const p = get('SELECT poll FROM posts WHERE id=?', body.post_id), poll = p && J(p.poll, null);
      if (!poll || !(Number(body.option) >= 0 && Number(body.option) < poll.options.length)) throw err(400, 'Voto non valido');
      run('DELETE FROM poll_votes WHERE post_id=? AND member_id=?', body.post_id, m.id);
      run('INSERT INTO poll_votes (post_id,member_id,option) VALUES (?,?,?)', body.post_id, m.id, Number(body.option));
    } else if (action === 'rsvp') {
      if (!get('SELECT id FROM events WHERE id=?', body.event_id)) throw err(404, 'Evento non trovato');
      const had = get('SELECT id FROM event_rsvp WHERE event_id=? AND member_id=?', body.event_id, m.id);
      if (had) run('DELETE FROM event_rsvp WHERE id=?', had.id); else { run('INSERT INTO event_rsvp (event_id,member_id) VALUES (?,?)', body.event_id, m.id); award(m.id, POINTS.rsvp, 'Partecipazione a un evento'); }
    } else if (action === 'enroll') {
      const c = get('SELECT * FROM courses WHERE id=? AND published=1', body.course_id);
      if (!c || c.access !== 'aperto' || levelOf(m.points) < c.min_level) throw err(403, 'Non puoi ancora iscriverti a questo corso');
      enroll(c.id, m.contact_id);
    } else if (action === 'lesson') extra.quiz_result = completeLesson(m, body);
    else if (action === 'lesson_comment') {
      if (!text(body.body)) throw err(400, 'Scrivi la domanda');
      const l = get('SELECT * FROM lessons WHERE id=?', body.lesson_id);
      if (!l || !get('SELECT id FROM enrollments WHERE course_id=? AND contact_id=?', l.course_id, m.contact_id)) throw err(403, 'Lezione non disponibile');
      run('INSERT INTO lesson_comments (lesson_id,member_id,author_name,body,created_at) VALUES (?,?,?,?,?)', l.id, m.id, name, text(body.body, 2000), now());
      engine.activity(m.contact_id, 'corso', `Domanda sulla lezione «${l.title}»`);
    } else if (action === 'profile') run('UPDATE members SET bio=? WHERE id=?', text(body.bio, 300), m.id);
    else if (action === 'moderate') {
      const p = get('SELECT * FROM posts WHERE id=?', body.post_id || 0), c = get('SELECT * FROM comments WHERE id=?', body.comment_id || 0);
      if (c) { if (!mod && c.member_id !== m.id) throw err(403, 'Non puoi farlo'); deleteComment(c.id); }
      else if (p) {
        if (body.delete) { if (!mod && p.member_id !== m.id) throw err(403, 'Non puoi farlo'); deletePost(p.id); }
        else { if (!mod) throw err(403, 'Solo i moderatori'); run('UPDATE posts SET pinned=?, locked=? WHERE id=?', body.pinned ?? p.pinned ? 1 : 0, body.locked ?? p.locked ? 1 : 0, p.id); }
      } else throw err(404, 'Non trovato');
    } else throw err(404, 'Azione sconosciuta');
    m = get('SELECT * FROM members WHERE id=?', m.id);
  }
  return portalView(m, extra);
}

// ---------- viste e azioni per lo staff ----------
function courseList() {
  return all('SELECT * FROM courses ORDER BY id').map(c => {
    const e = get('SELECT count(*) n, count(completed_at) d FROM enrollments WHERE course_id=?', c.id);
    return { ...c, enrolled: e.n, completed: e.d, lessons: get('SELECT count(*) n FROM lessons WHERE course_id=?', c.id).n };
  });
}
function courseDetail(id) {
  const c = get('SELECT * FROM courses WHERE id=?', id);
  if (!c) throw err(404, 'Corso non trovato');
  const lessons = lessonsOf(id, false), pub = lessons.filter(l => l.published), total = pub.length;
  const enrollments = all(`SELECT e.*, c.first_name||' '||coalesce(c.last_name,'') contact, m.token, m.points FROM enrollments e JOIN contacts c ON c.id=e.contact_id LEFT JOIN members m ON m.contact_id=e.contact_id WHERE e.course_id=? ORDER BY e.id DESC`, id).map(e => {
    const ps = all('SELECT * FROM lesson_progress WHERE enrollment_id=?', e.id), sc = ps.filter(p => p.score !== null);
    return { ...e, done: ps.length, progress: total ? Math.round(100 * ps.filter(p => pub.some(l => l.id === p.lesson_id)).length / total) : 0, quiz_avg: sc.length ? Math.round(sc.reduce((a, p) => a + p.score, 0) / sc.length) : null };
  });
  const n = enrollments.length;
  return {
    course: c, enrollments,
    modules: all('SELECT * FROM modules WHERE course_id=? ORDER BY position,id', id).map(m => ({ ...m, lessons: lessons.filter(l => l.module_id === m.id) })),
    stats: {
      enrolled: n, completed: enrollments.filter(e => e.completed_at).length, avg_progress: n ? Math.round(enrollments.reduce((a, e) => a + e.progress, 0) / n) : 0,
      funnel: pub.map(l => { const r = get('SELECT count(*) n, avg(score) s FROM lesson_progress WHERE lesson_id=?', l.id); return { id: l.id, title: l.title, type: l.type, done: r.n, avg_score: r.s === null ? null : Math.round(r.s) }; }),
    },
    questions: all(`SELECT q.*, l.title lesson FROM lesson_comments q JOIN lessons l ON l.id=q.lesson_id WHERE l.course_id=? ORDER BY q.id DESC`, id),
  };
}
// Salva in un colpo solo moduli e lezioni così come sono nell'editor (crea, aggiorna, elimina, riordina).
function saveStructure(courseId, modules) {
  const keepM = [], keepL = [];
  (modules || []).forEach((m, mi) => {
    let mid = m.id && get('SELECT id FROM modules WHERE id=? AND course_id=?', m.id, courseId) ? m.id : Number(run('INSERT INTO modules (course_id,title,position) VALUES (?,?,?)', courseId, text(m.title, 160) || 'Modulo', mi).lastInsertRowid);
    run('UPDATE modules SET title=?, position=? WHERE id=?', text(m.title, 160) || 'Modulo', mi, mid); keepM.push(mid);
    (m.lessons || []).forEach((l, li) => {
      const v = [mid, text(l.title, 200) || 'Lezione', ['testo', 'video', 'quiz'].includes(l.type) ? l.type : 'testo', text(l.content, 20000), text(l.video_url, 500) || null, Number(l.minutes) || 0, li, l.published === 0 || l.published === false ? 0 : 1, Number(l.drip_days) || 0, JSON.stringify(l.resources || []), l.type === 'quiz' ? JSON.stringify(l.quiz || { pass: 70, questions: [] }) : null];
      let lid = l.id && get('SELECT id FROM lessons WHERE id=? AND course_id=?', l.id, courseId) ? l.id : null;
      if (lid) run('UPDATE lessons SET module_id=?,title=?,type=?,content=?,video_url=?,minutes=?,position=?,published=?,drip_days=?,resources=?,quiz=? WHERE id=?', ...v, lid);
      else lid = Number(run('INSERT INTO lessons (module_id,title,type,content,video_url,minutes,position,published,drip_days,resources,quiz,course_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)', ...v, courseId).lastInsertRowid);
      keepL.push(lid);
    });
  });
  for (const l of all('SELECT id FROM lessons WHERE course_id=?', courseId)) if (!keepL.includes(l.id)) { run('DELETE FROM lesson_progress WHERE lesson_id=?', l.id); run('DELETE FROM lesson_comments WHERE lesson_id=?', l.id); run('DELETE FROM lessons WHERE id=?', l.id); }
  for (const m of all('SELECT id FROM modules WHERE course_id=?', courseId)) if (!keepM.includes(m.id)) run('DELETE FROM modules WHERE id=?', m.id);
}
function deleteCourse(id) {
  for (const e of all('SELECT id FROM enrollments WHERE course_id=?', id)) unenrollById(e.id);
  run('DELETE FROM lesson_comments WHERE lesson_id IN (SELECT id FROM lessons WHERE course_id=?)', id);
  run('DELETE FROM lessons WHERE course_id=?', id); run('DELETE FROM modules WHERE course_id=?', id); run('DELETE FROM courses WHERE id=?', id);
}
function deleteMember(id) {
  for (const t of ['likes', 'poll_votes', 'event_rsvp', 'point_log']) run(`DELETE FROM ${t} WHERE member_id=?`, id);
  run('UPDATE posts SET member_id=NULL WHERE member_id=?', id); run('UPDATE comments SET member_id=NULL WHERE member_id=?', id); run('DELETE FROM members WHERE id=?', id);
}
function community() {
  const members = membersView(), week = new Date(Date.now() - 7 * 86400e3).toISOString().slice(0, 10);
  return {
    info: communityInfo(), channels: all('SELECT * FROM channels ORDER BY position,id'), posts: postsView(0), members, events: eventsView(0), levels: LEVELS.map(([min, label], i) => ({ level: i + 1, min, label })),
    stats: { members: members.length, posts: get('SELECT count(*) n FROM posts').n, comments: get('SELECT count(*) n FROM comments').n, active: members.filter(m => String(m.last_seen || '').slice(0, 10) >= week).length },
  };
}

// Restituisce undefined se la richiesta non riguarda questo modulo.
function handle(a, b, c, M, body) {
  if (a === 'courses' && M === 'GET' && !b) return courseList();
  if (a === 'courses' && c === 'detail') return courseDetail(Number(b));
  if (a === 'courses' && c === 'structure' && M === 'PUT') { saveStructure(Number(b), body.modules); return courseDetail(Number(b)); }
  if (a === 'courses' && c === 'enroll' && M === 'POST') { const r = enroll(Number(b), Number(body.contact_id)); if (r.startsWith('Già')) throw err(409, r); return { ok: true }; }
  if (a === 'courses' && M === 'DELETE' && b) { deleteCourse(Number(b)); return { ok: true }; }
  if (a === 'enrollments' && M === 'DELETE') { unenrollById(Number(b)); return { ok: true }; }
  if (a === 'enrollments' && c === 'reset' && M === 'POST') { run('DELETE FROM lesson_progress WHERE enrollment_id=?', b); run('UPDATE enrollments SET completed_at=NULL WHERE id=?', b); return { ok: true }; }
  if (a === 'lesson_comments' && M === 'POST') { run('INSERT INTO lesson_comments (lesson_id,member_id,author_name,body,created_at) VALUES (?,NULL,?,?,?)', body.lesson_id, `${body.author_name || 'Staff'} (staff)`, text(body.body, 2000), now()); return { ok: true }; }
  if (a === 'lesson_comments' && M === 'DELETE') { run('DELETE FROM lesson_comments WHERE id=?', b); return { ok: true }; }
  if (a === 'community' && M === 'GET') return community();
  if (a === 'community' && b === 'settings' && M === 'PUT') {
    for (const k of ['name', 'tagline']) if (body[k] !== undefined) run('INSERT INTO settings (key,value) VALUES (?,?) ON CONFLICT(key) DO UPDATE SET value=excluded.value', 'community_' + k, text(body[k], 200));
    return communityInfo();
  }
  if (a === 'posts' && M === 'POST') { addPost({ ...body, member: null, author_name: `${body.author_name || 'Staff'} (staff)` }); return { ok: true }; }
  if (a === 'posts' && M === 'PUT') { const p = get('SELECT * FROM posts WHERE id=?', b); if (!p) throw err(404, 'Post non trovato'); run('UPDATE posts SET pinned=?, locked=?, channel_id=? WHERE id=?', body.pinned ?? p.pinned ? 1 : 0, body.locked ?? p.locked ? 1 : 0, body.channel_id || p.channel_id, b); return { ok: true }; }
  if (a === 'posts' && M === 'DELETE') { deletePost(Number(b)); return { ok: true }; }
  if (a === 'comments' && M === 'POST') { addComment({ ...body, member: null, author_name: `${body.author_name || 'Staff'} (staff)` }); return { ok: true }; }
  if (a === 'comments' && M === 'DELETE') { deleteComment(Number(b)); return { ok: true }; }
  if (a === 'members' && M === 'POST' && !b) { if (get('SELECT id FROM members WHERE contact_id=?', body.contact_id)) throw err(409, 'Ha già accesso al portale'); return memberFor(Number(body.contact_id)); }
  if (a === 'members' && c === 'points' && M === 'POST') { award(Number(b), Number(body.points) || 0, text(body.reason, 120) || 'Assegnati dallo staff'); return { ok: true }; }
  if (a === 'members' && M === 'PUT') { run('UPDATE members SET role=? WHERE id=?', body.role === 'moderatore' ? 'moderatore' : 'membro', b); return { ok: true }; }
  if (a === 'members' && M === 'DELETE') { deleteMember(Number(b)); return { ok: true }; }
  if (a === 'channels' && M === 'DELETE' && b) { if (get('SELECT id FROM posts WHERE channel_id=?', b)) throw err(409, 'Sposta o elimina prima i post di questo canale'); return undefined; }
  return undefined;
}

module.exports = { handle, portal, memberFor, deleteMember, unenrollById };
