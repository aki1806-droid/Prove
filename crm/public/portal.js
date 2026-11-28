// Portale del cliente (/p/portale/:codice): bacheca della comunità, corsi, classifica, eventi, profilo.
pages.portale = async token => {
  let v = await api('portal/' + token), tab = 'bacheca', channel = 0, courseId = null, lessonId = null, replyTo = null;
  root.classList.add('wide');
  document.title = v.community.name;
  const when = s => new Date(s).toLocaleString('it-IT', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
  const pill = x => (x.staff ? '' : x.level ? `<span class="pill lvl">liv. ${x.level}</span>` : '');
  const ini = n => esc(String(n || '?').split(' ').map(x => x[0]).slice(0, 2).join(''));
  const act = async (action, body) => { try { v = await api(`portal/${token}/${action}`, 'POST', body); draw(); return true; } catch (e) { toastP(e.message); return false; } };
  const toastP = msg => { const t = document.createElement('div'); t.className = 'toast err'; t.textContent = msg; document.body.append(t); setTimeout(() => t.remove(), 3000); };
  const icon = l => (l.done ? '✅' : l.locked ? '🔒' : { video: '🎬', quiz: '📝' }[l.type] || '📄');

  const bacheca = () => {
    const posts = v.posts.filter(p => !channel || p.channel_id === channel), ch = Object.fromEntries(v.channels.map(c => [c.id, c]));
    const writable = v.channels.filter(c => !c.staff_only || v.me.role === 'moderatore');
    const cm = (p, c, child) => `<div class="cm${child ? ' child' : ''}"><strong>${esc(c.author_name)}</strong> ${pill(c)} <span class="muted small">· ${when(c.created_at)}</span><div>${esc(c.body)}</div>
      <div class="small"><button class="link${c.liked ? ' on' : ''}" data-like="comment:${c.id}">♥ ${c.likes}</button>${p.locked ? '' : ` <button class="link" data-reply="${p.id}:${c.id}">Rispondi</button>`}${c.member_id === v.me.id || v.me.role === 'moderatore' ? ` <button class="link" data-delc="${c.id}">Elimina</button>` : ''}</div></div>`;
    return `<div class="chips">${[[0, 'Tutto'], ...v.channels.map(c => [c.id, `${c.emoji || ''} ${c.name}`])].map(([i, l]) => `<button data-ch="${i}" class="${i === channel ? 'on' : ''}">${esc(l)}</button>`).join('')}</div>
    ${writable.length ? `<form id="np" class="card" style="margin-bottom:14px"><div style="display:flex;gap:8px;flex-wrap:wrap"><select name="channel_id" id="np-ch">${writable.map(c => `<option value="${c.id}"${c.id === channel ? ' selected' : ''}>${esc((c.emoji || '') + ' ' + c.name)}</option>`).join('')}</select><input name="title" id="np-title" placeholder="Titolo" style="flex:1;min-width:160px"></div>
      <textarea name="body" id="np-body" placeholder="Cosa vuoi condividere?" required style="margin:8px 0"></textarea><details class="small"><summary>Aggiungi un sondaggio</summary><textarea name="poll" id="np-poll" placeholder="Una risposta per riga" style="margin-top:6px"></textarea></details><p style="margin:8px 0 0"><button class="primary">Pubblica</button> <span class="small muted">+${v.points_table.post} punti</span></p></form>` : ''}
    ${posts.map(p => `<article class="post">${p.pinned ? '<span class="pill warn">📌 in evidenza</span> ' : ''}<span class="pill">${esc((ch[p.channel_id]?.emoji || '') + ' ' + (ch[p.channel_id]?.name || ''))}</span>
      <h2 style="margin:6px 0 2px">${esc(p.title)}</h2><div class="small muted"><strong>${esc(p.author_name)}</strong> ${pill(p)} · ${when(p.created_at)}</div><div style="white-space:pre-wrap;margin:8px 0">${esc(p.body)}</div>
      ${p.poll ? `<div class="poll">${p.poll.options.map((o, i) => `<button class="poll-o${p.poll.mine === i ? ' on' : ''}" data-vote="${p.id}:${i}"><i style="width:${p.poll.total ? 100 * o.votes / p.poll.total : 0}%"></i><span>${esc(o.label)}</span><b>${p.poll.total ? Math.round(100 * o.votes / p.poll.total) : 0}%</b></button>`).join('')}<div class="small muted">${p.poll.total} voti${p.poll.mine === null ? ' · tocca per votare' : ''}</div></div>` : ''}
      <div class="small"><button class="link${p.liked ? ' on' : ''}" data-like="post:${p.id}">♥ ${p.likes} mi piace</button> · ${p.comments.length} commenti${p.member_id === v.me.id || v.me.role === 'moderatore' ? ` · <button class="link" data-delp="${p.id}">Elimina</button>` : ''}${v.me.role === 'moderatore' ? ` · <button class="link" data-pin="${p.id}:${p.pinned ? 0 : 1}">${p.pinned ? 'Togli evidenza' : 'Metti in evidenza'}</button>` : ''}</div>
      ${p.comments.filter(c => !c.parent_id).map(c => cm(p, c) + p.comments.filter(x => x.parent_id === c.id).map(x => cm(p, x, true)).join('')).join('')}
      ${p.locked ? '<p class="small muted">🔒 I commenti sono chiusi.</p>' : `<form class="composer" data-cform="${p.id}" style="padding:10px 0 0;border:0"><input id="c-${p.id}" placeholder="${replyTo && replyTo.post === p.id ? 'Scrivi la risposta…' : 'Scrivi un commento…'}" required style="flex:1"><button>Invia</button></form>`}</article>`).join('') || '<div class="card empty">Ancora nessun post qui: scrivi il primo.</div>'}`;
  };

  const corsi = () => {
    const c = v.courses.find(x => x.id === courseId);
    if (!c) return `<div class="grid two">${v.courses.map(c => `<div class="card course-card" style="border-top:4px solid ${esc(c.color || '#17695f')}"><h2><span class="emo">${esc(c.emoji || '📘')}</span> ${esc(c.title)}</h2><p class="small muted">${esc(c.description)}</p>
      <p class="small">${esc(c.instructor || '')} · ${c.total} lezioni · ${c.minutes} minuti${c.price ? ` · ${c.price} €` : ''}</p>
      ${c.enrolled ? `<div class="progress" style="height:8px"><i style="width:${c.progress}%"></i></div><p class="small">${c.done}/${c.total} lezioni${c.completed_at ? ' · <span class="pill ok">completato</span>' : ''}</p><button class="primary" data-open="${c.id}">${c.progress === 100 ? 'Rivedi il corso' : c.done ? 'Continua' : 'Inizia'}</button>`
        : c.can_enroll ? `<button class="primary" data-enroll="${c.id}">Iscriviti</button>` : `<p class="small"><span class="pill warn">🔒 ${esc(c.blocked || 'Non disponibile')}</span></p>`}</div>`).join('')}</div>`;
    const lessons = c.modules.flatMap(m => m.lessons);
    let l = lessons.find(x => x.id === lessonId) || lessons.find(x => !x.done && !x.locked) || lessons[0];
    const idx = lessons.indexOf(l), next = lessons[idx + 1], qr = v.quiz_result && lessonId === l?.id ? v.quiz_result : null;
    const body = !l ? '<p class="muted">Questo corso non ha ancora lezioni.</p>' : l.locked ? `<div class="empty">🔒 ${esc(l.locked)}</div>` : `
      <h2 style="font-size:1.3rem">${esc(l.title)}</h2><p class="small muted">${{ video: 'Video', quiz: 'Verifica', testo: 'Lettura' }[l.type]} · ${l.minutes} minuti${l.done ? ' · <span class="pill ok">completata</span>' : ''}${l.score !== null && l.score !== undefined ? ` · punteggio ${l.score}%` : ''}</p>
      ${l.type === 'video' && l.video_url ? `<a class="video" href="${esc(safeUrl(l.video_url))}" target="_blank" rel="noopener"><span>▶</span> Guarda il video</a>` : ''}
      <div style="white-space:pre-wrap;margin:10px 0">${esc(l.content)}</div>
      ${(l.resources || []).length ? `<h3>Materiali</h3>${l.resources.map(r => `<p class="small">📎 <a href="${esc(safeUrl(r.url))}" target="_blank" rel="noopener">${esc(r.label)}</a></p>`).join('')}` : ''}
      ${qr ? `<div class="card" style="border-color:${qr.passed ? 'var(--ok)' : 'var(--bad)'};margin:10px 0"><strong>${qr.passed ? 'Verifica superata' : 'Verifica non superata'}</strong> — ${qr.right} risposte giuste su ${qr.total} (${qr.score}%). ${qr.passed ? '' : `Serve almeno il ${qr.pass}%: rileggi la lezione e riprova.`}</div>` : ''}
      ${l.type === 'quiz' && l.quiz ? `<form id="quiz" data-lid="${l.id}">${l.quiz.questions.map((q, i) => `<fieldset class="q"><legend>${i + 1}. ${esc(q.q)}</legend>${q.options.map((o, j) => `<label><input type="radio" name="q${i}" value="${j}" required> ${esc(o)}</label>`).join('')}</fieldset>`).join('')}<button class="primary">${l.done ? 'Riprova la verifica' : 'Consegna la verifica'}</button> <span class="small muted">soglia ${l.quiz.pass}%</span></form>`
        : `<p><button class="${l.done ? '' : 'primary'}" data-done="${l.id}:${l.done ? 0 : 1}">${l.done ? 'Segna come da rifare' : 'Ho completato la lezione'}</button> ${l.done ? '' : `<span class="small muted">+${v.points_table.lesson} punti</span>`}</p>`}
      ${next ? `<p><button data-lesson="${next.id}"${next.locked ? ' disabled' : ''}>Lezione successiva →</button></p>` : ''}
      <h3 style="margin-top:20px">Domande su questa lezione</h3>${(l.comments || []).map(q => `<div class="cm"><strong>${esc(q.author_name)}</strong> <span class="muted small">· ${when(q.created_at)}</span><div>${esc(q.body)}</div></div>`).join('') || '<p class="small muted">Nessuna domanda: chiedi pure, risponde lo staff.</p>'}
      <form id="lq" data-lid="${l.id}" class="composer" style="padding:10px 0 0;border:0"><input id="lq-in" placeholder="Fai una domanda…" required style="flex:1"><button>Invia</button></form>`;
    return `<p><button data-open="0">← Tutti i corsi</button></p>
      ${c.certificate ? `<div class="cert"><div class="small">ATTESTATO DI COMPLETAMENTO</div><h2>${esc(v.me.name)}</h2><p>ha completato il corso <strong>${esc(c.title)}</strong></p><p class="small muted">${new Date(c.certificate.date).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })} · codice ${esc(c.certificate.code)}</p></div>` : ''}
      <div class="player"><aside class="card"><h2>${esc(c.emoji || '')} ${esc(c.title)}</h2><div class="progress" style="height:8px"><i style="width:${c.progress}%"></i></div><p class="small muted">${c.done} di ${c.total} lezioni</p>
        ${c.modules.map(m => `<h3 style="margin-top:12px">${esc(m.title)}</h3>${m.lessons.map(x => `<button class="les${l && x.id === l.id ? ' sel' : ''}" data-lesson="${x.id}"><span>${icon(x)}</span><span>${esc(x.title)}</span></button>`).join('')}`).join('')}</aside>
      <div class="card">${body}</div></div>`;
  };

  const classifica = () => {
    const max = Math.max(1, ...v.members.map(m => m.points));
    return `<div class="grid two"><div class="card"><h2>Classifica</h2>${v.members.map((m, i) => `<div class="bar-row${m.id === v.me.id ? ' me' : ''}" style="grid-template-columns:26px minmax(100px,170px) 1fr 50px"><b>${i + 1}</b><span>${esc(m.name)} <span class="pill lvl">liv. ${m.level}</span></span><div class="bar"><i style="width:${100 * m.points / max}%;background:var(--accent)"></i></div><span class="right">${m.points}</span></div>`).join('')}</div>
      <div class="card"><h2>Come si sale di livello</h2><p class="small muted">Un post ${v.points_table.post} punti, un commento ${v.points_table.comment}, un mi piace ricevuto ${v.points_table.like}, una lezione ${v.points_table.lesson}, una verifica ${v.points_table.quiz}, un corso completato ${v.points_table.course}.</p>
      ${v.levels.map(l => `<p class="small${l.level === v.me.level ? ' me' : ''}"><span class="pill lvl">liv. ${l.level}</span> <strong>${esc(l.label)}</strong> · da ${l.min} punti${l.level === v.me.level ? ' · sei qui' : ''}</p>`).join('')}</div></div>`;
  };
  const membri = () => `<div class="grid two">${v.members.map(m => `<div class="card" style="display:flex;gap:12px"><span class="avatar big">${ini(m.name)}</span><div><strong>${esc(m.name)}</strong> ${m.role === 'moderatore' ? '<span class="pill ok">moderatore</span>' : ''}<div class="small muted">${esc(m.company || '')}</div><p class="small" style="margin:6px 0">${esc(m.bio || '')}</p><div class="small"><span class="pill lvl">liv. ${m.level}</span> ${esc(m.level_name)} · ${m.points} punti · ${m.posts} post</div></div></div>`).join('')}</div>`;
  const eventi = () => `<div class="grid two">${v.events.map(e => `<div class="card"><h2>${esc(e.title)}</h2><p class="small"><strong>${new Date(e.start_at).toLocaleString('it-IT', { weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}</strong> · ${esc(e.location || '')}</p><p class="small muted">${esc(e.description)}</p>
    <p><button class="${e.mine ? '' : 'primary'}" data-rsvp="${e.id}">${e.mine ? '✓ Partecipo — annulla' : 'Partecipo'}</button> <span class="small muted">${e.going} partecipanti</span></p>${e.mine && e.link ? `<p class="small"><a href="${esc(safeUrl(e.link))}" target="_blank" rel="noopener">Collegamento per partecipare</a></p>` : ''}</div>`).join('') || '<div class="card empty">Nessun evento in programma</div>'}</div>`;
  const profilo = () => `<div class="grid two"><form id="pf" class="card"><h2>Il tuo profilo</h2><label class="f"><span>Presentazione (la vedono gli altri membri)</span><textarea id="pf-bio" maxlength="300">${esc(v.me.bio)}</textarea></label><button class="primary">Salva</button></form>
    <div class="card"><h2>I tuoi punti</h2>${v.me.log.map(x => `<p class="small"><strong>${x.points > 0 ? '+' : ''}${x.points}</strong> ${esc(x.reason)} <span class="muted">· ${when(x.at)}</span></p>`).join('') || '<p class="small muted">Ancora nessun punto: scrivi un post o completa una lezione.</p>'}</div></div>`;

  function draw() {
    const me = v.me, span = me.next_at ? Math.round(100 * (me.points - me.level_from) / (me.next_at - me.level_from)) : 100;
    root.innerHTML = `<header class="p-head"><div><h1>${esc(v.community.name)}</h1><p class="muted">${esc(v.community.tagline)}</p></div>
      <div class="p-me"><span class="avatar big">${ini(me.name)}</span><div><strong>${esc(me.name)}</strong><div class="small"><span class="pill lvl">liv. ${me.level}</span> ${esc(me.level_name)} · ${me.points} punti</div><div class="progress" style="margin-top:4px"><i style="width:${span}%"></i></div><div class="small muted">${me.next_at ? `${me.next_at - me.points} punti al livello ${me.level + 1}` : 'Livello massimo'}</div></div></div></header>
      <nav class="tabs">${[['bacheca', 'Bacheca'], ['corsi', 'Corsi'], ['classifica', 'Classifica'], ['membri', 'Membri'], ['eventi', 'Eventi'], ['profilo', 'Profilo']].map(([k, l]) => `<button data-tab="${k}" class="${k === tab ? 'on' : ''}">${l}</button>`).join('')}</nav>
      <section>${{ bacheca, corsi, classifica, membri, eventi, profilo }[tab]()}</section>${FOOT}`;
    const on = (sel, fn) => root.querySelectorAll(sel).forEach(el => el.onclick = () => fn(el.dataset));
    on('[data-tab]', d => { tab = d.tab; draw(); });
    on('[data-ch]', d => { channel = Number(d.ch); draw(); });
    on('[data-like]', d => { const [target, id] = d.like.split(':'); act('like', { target, id: Number(id) }); });
    on('[data-vote]', d => { const [post_id, option] = d.vote.split(':').map(Number); act('vote', { post_id, option }); });
    on('[data-delp]', d => act('moderate', { post_id: Number(d.delp), delete: true }));
    on('[data-delc]', d => act('moderate', { comment_id: Number(d.delc) }));
    on('[data-pin]', d => { const [post_id, pinned] = d.pin.split(':').map(Number); act('moderate', { post_id, pinned }); });
    on('[data-reply]', d => { const [post, parent] = d.reply.split(':').map(Number); replyTo = { post, parent }; draw(); const i = document.getElementById('c-' + post); if (i) i.focus(); });
    on('[data-open]', d => { courseId = Number(d.open) || null; lessonId = null; v.quiz_result = null; draw(); window.scrollTo(0, 0); });
    on('[data-enroll]', async d => { if (await act('enroll', { course_id: Number(d.enroll) })) { courseId = Number(d.enroll); draw(); } });
    on('[data-lesson]', d => { lessonId = Number(d.lesson); v.quiz_result = null; draw(); });
    on('[data-done]', d => { const [lesson_id, done] = d.done.split(':').map(Number); lessonId = lesson_id; act('lesson', { lesson_id, done: !!done }); });
    on('[data-rsvp]', d => act('rsvp', { event_id: Number(d.rsvp) }));
    const sub = (sel, fn) => root.querySelectorAll(sel).forEach(f => f.onsubmit = e => { e.preventDefault(); fn(f); });
    sub('#np', f => act('post', { channel_id: Number(f.channel_id.value), title: f.title.value, body: f.body.value, poll_options: f.poll.value.split('\n') }));
    sub('[data-cform]', f => { const post_id = Number(f.dataset.cform), parent_id = replyTo && replyTo.post === post_id ? replyTo.parent : null; replyTo = null; act('comment', { post_id, parent_id, body: f.querySelector('input').value }); });
    sub('#quiz', f => { const id = Number(f.dataset.lid); lessonId = id; act('lesson', { lesson_id: id, answers: [...new Set([...f.querySelectorAll('input[type=radio]')].map(x => x.name))].map(n => Number((f.querySelector(`input[name=${n}]:checked`) || {}).value)) }); });
    sub('#lq', f => act('lesson_comment', { lesson_id: Number(f.dataset.lid), body: f.querySelector('input').value }));
    sub('#pf', f => act('profile', { bio: f.querySelector('textarea').value }));
  }
  draw();
};
