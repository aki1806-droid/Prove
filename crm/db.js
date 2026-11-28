// Database SQLite (file crm/data/cordata.db) + dati di esempio.
const { DatabaseSync } = require('node:sqlite');
const fs = require('node:fs');
const path = require('node:path');

const DIR = process.env.CRM_DATA_DIR || path.join(__dirname, 'data');
fs.mkdirSync(DIR, { recursive: true });
const db = new DatabaseSync(path.join(DIR, 'cordata.db'));

// Tutte le date sono stringhe locali "AAAA-MM-GGTHH:MM:SS": si ordinano e si confrontano come testo.
const pad = n => String(n).padStart(2, '0');
const fmt = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
const now = () => fmt(new Date());

const VERSION = '2';
const TABLES = ['users', 'contacts', 'stages', 'opportunities', 'activities', 'tasks', 'conversations', 'messages', 'calendars', 'appointments',
  'workflows', 'runs', 'run_steps', 'forms', 'pages', 'submissions', 'courses', 'modules', 'lessons', 'enrollments', 'lesson_progress', 'lesson_comments',
  'members', 'channels', 'posts', 'comments', 'likes', 'poll_votes', 'events', 'event_rsvp', 'point_log', 'settings'];

function schema() {
  db.exec(`
  CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT, color TEXT);
  CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY, first_name TEXT, last_name TEXT, email TEXT, phone TEXT, company TEXT, source TEXT, tags TEXT DEFAULT '[]', birthday TEXT, owner_id INTEGER, notes TEXT, created_at TEXT);
  CREATE TABLE IF NOT EXISTS stages (id INTEGER PRIMARY KEY, name TEXT, position INTEGER, kind TEXT DEFAULT 'open', color TEXT);
  CREATE TABLE IF NOT EXISTS opportunities (id INTEGER PRIMARY KEY, contact_id INTEGER, title TEXT, value REAL DEFAULT 0, stage_id INTEGER, owner_id INTEGER, created_at TEXT, updated_at TEXT);
  CREATE TABLE IF NOT EXISTS activities (id INTEGER PRIMARY KEY, contact_id INTEGER, type TEXT, text TEXT, created_at TEXT);
  CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY, contact_id INTEGER, title TEXT, due_at TEXT, done INTEGER DEFAULT 0, owner_id INTEGER);
  CREATE TABLE IF NOT EXISTS conversations (id INTEGER PRIMARY KEY, contact_id INTEGER, channel TEXT, assigned_id INTEGER, unread INTEGER DEFAULT 0, last_at TEXT);
  CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY, conversation_id INTEGER, direction TEXT, body TEXT, author TEXT, created_at TEXT);
  CREATE TABLE IF NOT EXISTS calendars (id INTEGER PRIMARY KEY, name TEXT, slug TEXT UNIQUE, duration INTEGER DEFAULT 30, description TEXT, days TEXT DEFAULT '[1,2,3,4,5]', start_hour INTEGER DEFAULT 9, end_hour INTEGER DEFAULT 18, owner_id INTEGER, stage_id INTEGER);
  CREATE TABLE IF NOT EXISTS appointments (id INTEGER PRIMARY KEY, calendar_id INTEGER, contact_id INTEGER, title TEXT, start_at TEXT, end_at TEXT, status TEXT DEFAULT 'confermato', notes TEXT);
  CREATE TABLE IF NOT EXISTS workflows (id INTEGER PRIMARY KEY, name TEXT, description TEXT, active INTEGER DEFAULT 0, triggers TEXT DEFAULT '[]', steps TEXT DEFAULT '[]', settings TEXT DEFAULT '{}');
  CREATE TABLE IF NOT EXISTS runs (id INTEGER PRIMARY KEY, workflow_id INTEGER, contact_id INTEGER, node_id TEXT, status TEXT, wait_kind TEXT, resume_at TEXT, created_at TEXT, finished_at TEXT);
  CREATE TABLE IF NOT EXISTS run_steps (id INTEGER PRIMARY KEY, run_id INTEGER, workflow_id INTEGER, node_id TEXT, text TEXT, at TEXT);
  CREATE TABLE IF NOT EXISTS forms (id INTEGER PRIMARY KEY, name TEXT, slug TEXT UNIQUE, fields TEXT DEFAULT '[]', stage_id INTEGER, tag TEXT, thanks TEXT);
  CREATE TABLE IF NOT EXISTS pages (id INTEGER PRIMARY KEY, title TEXT, slug TEXT UNIQUE, blocks TEXT DEFAULT '[]', published INTEGER DEFAULT 1);
  CREATE TABLE IF NOT EXISTS submissions (id INTEGER PRIMARY KEY, form_id INTEGER, contact_id INTEGER, data TEXT, created_at TEXT);
  CREATE TABLE IF NOT EXISTS courses (id INTEGER PRIMARY KEY, title TEXT, slug TEXT UNIQUE, description TEXT, emoji TEXT, color TEXT, category TEXT, instructor TEXT, published INTEGER DEFAULT 1, price REAL DEFAULT 0, access TEXT DEFAULT 'iscrizione', min_level INTEGER DEFAULT 1, drip_mode TEXT DEFAULT 'libero', certificate INTEGER DEFAULT 1);
  CREATE TABLE IF NOT EXISTS modules (id INTEGER PRIMARY KEY, course_id INTEGER, title TEXT, position INTEGER DEFAULT 0);
  CREATE TABLE IF NOT EXISTS lessons (id INTEGER PRIMARY KEY, course_id INTEGER, module_id INTEGER, title TEXT, type TEXT DEFAULT 'testo', content TEXT, video_url TEXT, minutes INTEGER DEFAULT 5, position INTEGER DEFAULT 0, published INTEGER DEFAULT 1, drip_days INTEGER DEFAULT 0, resources TEXT DEFAULT '[]', quiz TEXT);
  CREATE TABLE IF NOT EXISTS enrollments (id INTEGER PRIMARY KEY, course_id INTEGER, contact_id INTEGER, created_at TEXT, completed_at TEXT, last_activity TEXT);
  CREATE TABLE IF NOT EXISTS lesson_progress (id INTEGER PRIMARY KEY, enrollment_id INTEGER, lesson_id INTEGER, done_at TEXT, score INTEGER, attempts INTEGER DEFAULT 1);
  CREATE TABLE IF NOT EXISTS lesson_comments (id INTEGER PRIMARY KEY, lesson_id INTEGER, member_id INTEGER, author_name TEXT, body TEXT, created_at TEXT);
  CREATE TABLE IF NOT EXISTS members (id INTEGER PRIMARY KEY, contact_id INTEGER UNIQUE, token TEXT UNIQUE, role TEXT DEFAULT 'membro', bio TEXT, points INTEGER DEFAULT 0, joined_at TEXT, last_seen TEXT);
  CREATE TABLE IF NOT EXISTS channels (id INTEGER PRIMARY KEY, name TEXT, emoji TEXT, description TEXT, position INTEGER DEFAULT 0, staff_only INTEGER DEFAULT 0);
  CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY, channel_id INTEGER, member_id INTEGER, author_name TEXT, title TEXT, body TEXT, pinned INTEGER DEFAULT 0, locked INTEGER DEFAULT 0, poll TEXT, created_at TEXT);
  CREATE TABLE IF NOT EXISTS comments (id INTEGER PRIMARY KEY, post_id INTEGER, parent_id INTEGER, member_id INTEGER, author_name TEXT, body TEXT, created_at TEXT);
  CREATE TABLE IF NOT EXISTS likes (id INTEGER PRIMARY KEY, target TEXT, target_id INTEGER, member_id INTEGER);
  CREATE TABLE IF NOT EXISTS poll_votes (id INTEGER PRIMARY KEY, post_id INTEGER, member_id INTEGER, option INTEGER);
  CREATE TABLE IF NOT EXISTS events (id INTEGER PRIMARY KEY, title TEXT, description TEXT, start_at TEXT, link TEXT, location TEXT);
  CREATE TABLE IF NOT EXISTS event_rsvp (id INTEGER PRIMARY KEY, event_id INTEGER, member_id INTEGER);
  CREATE TABLE IF NOT EXISTS point_log (id INTEGER PRIMARY KEY, member_id INTEGER, points INTEGER, reason TEXT, at TEXT);
  CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY, value TEXT);
  `);
}

function seed() {
  const ins = (t, o) => {
    const k = Object.keys(o);
    return Number(db.prepare(`INSERT INTO ${t} (${k.join(',')}) VALUES (${k.map(() => '?').join(',')})`).run(...k.map(x => (o[x] !== null && typeof o[x] === 'object' ? JSON.stringify(o[x]) : o[x]))).lastInsertRowid);
  };
  const ago = (days, h = 10, m = 0) => { const d = new Date(); d.setDate(d.getDate() - days); d.setHours(h, m, 0, 0); return fmt(d); };
  const at = (days, h, m = 0) => ago(-days, h, m);

  const [giulia, marco, sara] = [['Giulia Ferri', '#0f766e'], ['Marco Leone', '#b45309'], ['Sara Conti', '#7c3aed']].map(([name, color]) => ins('users', { name, color }));
  const st = {};
  [['Nuovo lead', 'open', '#64748b'], ['Contattato', 'open', '#0ea5e9'], ['Appuntamento', 'open', '#8b5cf6'], ['Preventivo', 'open', '#f59e0b'], ['Vinto', 'won', '#16a34a'], ['Perso', 'lost', '#dc2626']]
    .forEach(([name, kind, color], i) => { st[name] = ins('stages', { name, position: i, kind, color }); });

  const today = new Date();
  const bday = `1988-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`;
  const people = [
    ['Elena', 'Marchetti', 'Studio Dentistico Marchetti', 'Sito web', ['dentista', 'cliente'], giulia, 34, 'Vinto', 4800, 'Pacchetto gestione pazienti'],
    ['Davide', 'Russo', 'Russo Assicurazioni', 'Referral', ['assicurazioni'], marco, 21, 'Preventivo', 3200, 'Rinnovo polizze flotta'],
    ['Chiara', 'Bianchi', 'Viaggi Bianchi', 'Instagram', ['agenzia viaggi'], sara, 12, 'Appuntamento', 1900, 'Campagna estate'],
    ['Luca', 'Gallo', 'Gallo Fotovoltaico', 'Google Ads', ['fotovoltaico', 'caldo'], giulia, 9, 'Preventivo', 12500, 'Impianto 6 kW'],
    ['Martina', 'Costa', 'Centro Estetico Aura', 'WhatsApp', ['estetica'], sara, 7, 'Contattato', 900, 'Abbonamento annuale'],
    ['Paolo', 'Greco', 'Palestra Olimpo', 'Sito web', ['palestra'], marco, 6, 'Contattato', 2400, 'Gestione iscritti'],
    ['Francesca', 'Romano', 'Romano & Figli', 'Referral', ['b2b'], giulia, 5, 'Nuovo lead', 5600, 'Fornitura annuale'],
    ['Andrea', 'Colombo', null, 'Instagram', [], marco, 3, 'Nuovo lead', 700, 'Consulenza iniziale'],
    ['Silvia', 'Ricci', 'Ricci Infissi', 'Google Ads', ['infissi', 'caldo'], sara, 3, 'Appuntamento', 7400, 'Sostituzione serramenti'],
    ['Matteo', 'Bruno', 'Bruno Ortodonzia', 'Sito web', ['dentista'], giulia, 2, 'Nuovo lead', 3900, 'Sistema richiami'],
    ['Alessia', 'De Luca', 'Moda De Luca', 'Referral', ['moda', 'cliente'], marco, 48, 'Vinto', 6100, 'Showroom primavera'],
    ['Simone', 'Fontana', 'Fontana Take Away', 'WhatsApp', ['ristorazione'], sara, 40, 'Perso', 1200, 'Ordini online'],
    ['Valentina', 'Serra', 'Centro Olistico Serra', 'Instagram', ['benessere'], giulia, 1, 'Nuovo lead', 1500, 'Percorso onboarding'],
    ['Giorgio', 'Vitale', 'Vitale Trasporti', 'Sito web', ['b2b'], marco, 0, null, 0, null],
  ];
  const ids = people.map(([first_name, last_name, company, source, tags, owner_id, d, stage, value, title], i) => {
    const id = ins('contacts', {
      first_name, last_name, company, source, tags, owner_id, created_at: ago(d, 9 + (i % 8)),
      email: `${first_name}.${last_name}`.toLowerCase().replace(/\s+/g, '') + '@esempio.it', phone: `+39 34${i} 55${pad(i)} ${100 + i * 37}`,
      birthday: i === 4 ? bday : null,
    });
    ins('activities', { contact_id: id, type: 'creato', text: `Contatto creato da: ${source}`, created_at: ago(d, 9 + (i % 8)) });
    if (stage) {
      ins('opportunities', { contact_id: id, title, value, stage_id: st[stage], owner_id, created_at: ago(d, 11), updated_at: ago(Math.max(0, d - 2), 15) });
      if (stage !== 'Nuovo lead') ins('activities', { contact_id: id, type: 'pipeline', text: `«${title}» spostata in ${stage}`, created_at: ago(Math.max(0, d - 2), 15) });
    }
    return id;
  });

  const chat = (contact, channel, assigned, unread, msgs) => {
    const cid = ins('conversations', { contact_id: contact, channel, assigned_id: assigned, unread, last_at: msgs[msgs.length - 1][2] });
    for (const [direction, body, created_at, author] of msgs) ins('messages', { conversation_id: cid, direction, body, created_at, author: author || null });
  };
  chat(ids[3], 'whatsapp', giulia, 1, [
    ['in', 'Buongiorno, ho visto la vostra pubblicità. Quanto costa un impianto da 6 kW?', ago(2, 9, 12)],
    ['out', 'Buongiorno Luca! Dipende dal tetto e dai consumi: le preparo un preventivo su misura. Ha una bolletta recente?', ago(2, 9, 30), String(giulia)],
    ['in', 'Sì, gliela mando stasera', ago(2, 9, 41)],
    ['in', 'Ecco la bolletta. Riuscite a passare per il sopralluogo questa settimana?', ago(0, 8, 5)],
  ]);
  chat(ids[4], 'whatsapp', sara, 2, [
    ['out', 'Ciao Martina, grazie per averci scritto! Ti interessa l\'abbonamento annuale o il pacchetto prova?', ago(1, 16, 0), 'auto'],
    ['in', 'Ciao! L\'annuale, ma vorrei capire cosa include', ago(1, 16, 20)],
    ['in', 'Posso passare domani in pausa pranzo?', ago(0, 10, 2)],
  ]);
  chat(ids[1], 'email', marco, 0, [
    ['in', 'Buonasera, in allegato l\'elenco dei mezzi da assicurare. Attendo il preventivo.', ago(4, 18, 3)],
    ['out', 'Gentile Davide, ricevuto. Le invio il preventivo entro giovedì.', ago(3, 9, 15), String(marco)],
  ]);
  chat(ids[2], 'instagram', sara, 0, [
    ['in', 'Ciao! Fate anche gestione delle campagne per agenzie viaggi?', ago(6, 21, 40)],
    ['out', 'Ciao Chiara, certo. Fissiamo una chiamata? Ti lascio il link per scegliere l\'orario.', ago(5, 9, 5), String(sara)],
  ]);
  chat(ids[7], 'whatsapp', null, 1, [['in', 'Salve, vorrei informazioni sulla consulenza', ago(0, 11, 47)]]);

  const cal1 = ins('calendars', { name: 'Consulenza gratuita', slug: 'consulenza-gratuita', duration: 30, description: 'Trenta minuti in videochiamata per capire le tue esigenze.', days: [1, 2, 3, 4, 5], start_hour: 9, end_hour: 18, owner_id: giulia, stage_id: st.Appuntamento });
  const cal2 = ins('calendars', { name: 'Sopralluogo', slug: 'sopralluogo', duration: 60, description: 'Un tecnico viene da te per misure e verifica.', days: [1, 3, 5, 6], start_hour: 8, end_hour: 17, owner_id: marco, stage_id: st.Appuntamento });
  const appt = (cal, contact, title, days, h, dur, status = 'confermato') => {
    const s = at(days, h), e = fmt(new Date(new Date(s).getTime() + dur * 60000));
    ins('appointments', { calendar_id: cal, contact_id: contact, title, start_at: s, end_at: e, status });
  };
  appt(cal1, ids[2], 'Consulenza gratuita', 1, 10, 30); appt(cal2, ids[8], 'Sopralluogo', 1, 15, 60); appt(cal1, ids[5], 'Consulenza gratuita', 2, 11, 30);
  appt(cal2, ids[3], 'Sopralluogo', 3, 9, 60); appt(cal1, ids[9], 'Consulenza gratuita', 0, 17, 30); appt(cal1, ids[0], 'Consulenza gratuita', -3, 10, 30, 'completato');

  ins('tasks', { contact_id: ids[1], title: 'Inviare preventivo flotta', due_at: at(1, 12), done: 0, owner_id: marco });
  ins('tasks', { contact_id: ids[3], title: 'Richiamare per confermare il sopralluogo', due_at: at(0, 16), done: 0, owner_id: giulia });
  ins('tasks', { contact_id: ids[6], title: 'Prima telefonata conoscitiva', due_at: at(2, 10), done: 0, owner_id: giulia });

  const form = ins('forms', {
    name: 'Richiedi informazioni', slug: 'richiedi-informazioni', stage_id: st['Nuovo lead'], tag: 'da sito', thanks: 'Grazie! Ti rispondiamo entro un giorno lavorativo.',
    fields: [
      { key: 'first_name', label: 'Nome', type: 'text', required: true }, { key: 'last_name', label: 'Cognome', type: 'text', required: false },
      { key: 'email', label: 'Email', type: 'email', required: true }, { key: 'phone', label: 'Telefono', type: 'tel', required: false },
      { key: 'messaggio', label: 'Di cosa hai bisogno?', type: 'textarea', required: false },
    ],
  });
  ins('pages', {
    title: 'Più clienti, meno fatica', slug: 'piu-clienti', published: 1,
    blocks: [
      { type: 'hero', title: 'Più clienti, meno fatica', subtitle: 'Rispondiamo ai tuoi contatti, fissiamo gli appuntamenti e ti lasciamo il tempo per lavorare.' },
      { type: 'testo', text: 'Ogni richiesta che arriva dal sito, da WhatsApp o dai social finisce in un posto solo. Niente più messaggi persi, niente fogli di calcolo: sai sempre chi richiamare e quando.' },
      { type: 'bottone', label: 'Prenota una consulenza gratuita', url: '/p/prenota/consulenza-gratuita' },
      { type: 'modulo', form_id: form },
    ],
  });

  // --- automazioni: ogni passo ha un id; condizioni, attese di risposta e test A/B hanno rami ---
  let nid = 0;
  const N = (type, o = {}) => ({ id: 'n' + (++nid), type, ...o });
  const T = (type, config = {}) => ({ id: 't' + (++nid), type, config });
  const wf = (name, description, active, triggers, steps, settings = {}) => ins('workflows', { name, description, active, triggers, steps, settings: { reentry: false, stop_on_reply: false, window_on: false, window_from: 9, window_to: 20, ...settings } });
  wf('Accoglienza nuovi lead', 'Risponde subito, aspetta la risposta e, se non arriva, ci riprova in modo diverso.', 1,
    [T('lead_created'), T('form_submitted')],
    [
      N('send_message', { channel: 'whatsapp', body: 'Ciao {{nome}}, grazie per averci contattato! Ti scriviamo a breve con tutte le informazioni.' }),
      N('assign', { mode: 'rotazione' }),
      N('create_task', { title: 'Chiamare {{nome}} {{cognome}}', days: 1 }),
      N('wait_reply', { amount: 2, unit: 'giorni',
        yes: [N('add_tag', { tag: 'ha risposto' }), N('notify', { text: '{{nome}} ha risposto: tocca a te' })],
        no: [N('split', { branches: [
          { id: 'b1', label: 'Messaggio breve', weight: 50, steps: [N('send_message', { channel: 'whatsapp', body: '{{nome}}, sei riuscito a dare un\'occhiata? Se vuoi fissiamo una chiamata di 30 minuti.' })] },
          { id: 'b2', label: 'Messaggio con offerta', weight: 50, steps: [N('send_message', { channel: 'whatsapp', body: '{{nome}}, questa settimana la prima consulenza è gratuita: ti lascio il link per prenotare.' })] },
        ] })] }),
      N('condition', { match: 'all', rules: [{ field: 'source', op: 'is', value: 'Google Ads' }],
        yes: [N('add_tag', { tag: 'caldo' })], no: [] }),
    ]);
  wf('Dopo la prenotazione', 'Conferma, promemoria il giorno prima alle 9 e recupero di chi non si presenta.', 1,
    [T('appointment_booked')],
    [
      N('send_message', { channel: 'whatsapp', body: 'Ciao {{nome}}, appuntamento confermato. Ti mando un promemoria il giorno prima.' }),
      N('add_tag', { tag: 'appuntamento fissato' }),
      N('wait', { mode: 'orario', time: '09:00' }),
      N('send_message', { channel: 'whatsapp', body: 'Promemoria: ci vediamo presto, {{nome}}. Se hai un imprevisto rispondi qui.' }),
    ]);
  wf('Recupero di chi non si presenta', 'Quando un appuntamento viene segnato «non presentato» propone una nuova data.', 1,
    [T('appointment_status', { status: 'non presentato' })],
    [
      N('add_tag', { tag: 'non presentato' }),
      N('wait', { mode: 'durata', amount: 2, unit: 'ore' }),
      N('send_message', { channel: 'whatsapp', body: '{{nome}}, oggi non siamo riusciti a vederci. Vuoi scegliere un altro orario?' }),
      N('create_task', { title: 'Richiamare {{nome}} per riprogrammare', days: 1 }),
    ]);
  wf('Auguri di compleanno', 'Un messaggio e un piccolo regalo nel giorno giusto.', 1, [T('birthday')],
    [N('send_message', { channel: 'whatsapp', body: 'Tanti auguri {{nome}}! 🎂 Per te uno sconto del 10% valido tutto il mese.' })], { reentry: true });
  wf('Vendita chiusa: benvenuto e corso', 'Chi diventa cliente entra nel corso di avvio e dopo una settimana riceve la richiesta di recensione.', 1,
    [T('opportunity_won')],
    [
      N('add_tag', { tag: 'cliente' }),
      N('enroll_course', { course_id: 1 }),
      N('send_message', { channel: 'email', subject: 'Benvenuto, {{nome}}', body: 'Da oggi hai accesso all\'area riservata: trovi il corso di avvio e la comunità degli altri clienti.' }),
      N('wait', { mode: 'durata', amount: 7, unit: 'giorni' }),
      N('send_message', { channel: 'whatsapp', body: '{{nome}}, com\'è andata la prima settimana? Se ti va, lasciaci una recensione: ci aiuta molto.' }),
    ]);
  wf('Studente fermo da una settimana', 'Riporta nel corso chi ha smesso di seguire le lezioni.', 1,
    [T('student_inactive', { days: 7 })],
    [
      N('condition', { match: 'all', rules: [{ field: 'course', op: 'completed', value: 1 }], yes: [N('end')], no: [] }),
      N('send_message', { channel: 'whatsapp', body: '{{nome}}, ti aspetta la prossima lezione: bastano dieci minuti per andare avanti.' }),
      N('add_points', { points: 5 }),
    ], { reentry: true });
  wf('Lead caldo: assegna e avvisa', 'Esempio in pausa: parte quando a un contatto viene dato il tag «caldo».', 0,
    [T('tag_added', { tag: 'caldo' })],
    [N('assign', { mode: 'utente', user_id: giulia }), N('notify', { text: '{{nome}} {{cognome}} è un lead caldo: richiamare oggi' }), N('create_task', { title: 'Richiamare subito {{nome}}', days: 0 })]);

  // --- corsi ---
  const course = ins('courses', { title: 'Primi passi con i tuoi clienti', slug: 'primi-passi', description: 'Un percorso breve per organizzare contatti, risposte e appuntamenti.', emoji: '🚀', color: '#0f766e', category: 'Avvio', instructor: 'Giulia Ferri', published: 1, price: 0, access: 'iscrizione', min_level: 1, drip_mode: 'sequenziale', certificate: 1 });
  const lessonIds = [];
  const mod = (courseId, title, pos, lessons) => {
    const m = ins('modules', { course_id: courseId, title, position: pos });
    lessons.forEach((l, i) => lessonIds.push(ins('lessons', { course_id: courseId, module_id: m, position: i, type: 'testo', minutes: 6, published: 1, drip_days: 0, resources: [], quiz: null, video_url: null, ...l })));
  };
  mod(course, 'Mettere ordine', 0, [
    { title: 'Dove finiscono oggi i tuoi contatti', content: 'Prima di cambiare strumento, fai l\'elenco dei posti in cui ti arrivano le richieste: telefono, WhatsApp, email, social, passaparola. Segna per ognuno chi risponde e in quanto tempo.', resources: [{ label: 'Scheda: mappa dei canali', url: 'https://example.com/mappa-canali.pdf' }] },
    { title: 'Una sola casella per tutti', type: 'video', video_url: 'https://example.com/video/casella-unica', minutes: 9, content: 'Nel video vediamo come riunire i canali e chi deve rispondere a cosa. Dopo averlo guardato, scegli chi è il responsabile di ogni canale.' },
    { title: 'Verifica: hai messo ordine?', type: 'quiz', minutes: 4, content: 'Tre domande per controllare di aver capito prima di andare avanti.', quiz: { pass: 66, questions: [
      { q: 'Qual è il primo passo per mettere ordine?', options: ['Comprare un nuovo strumento', 'Elencare tutti i canali da cui arrivano le richieste', 'Assumere una persona in più'], correct: 1 },
      { q: 'Chi deve rispondere a un canale?', options: ['Chi capita', 'Un responsabile preciso', 'Nessuno, risponde il sistema'], correct: 1 },
      { q: 'Cosa si misura per ogni canale?', options: ['Il tempo di risposta', 'Il numero di emoji', 'Il colore del logo'], correct: 0 },
    ] } },
  ]);
  mod(course, 'Rispondere e fissare', 1, [
    { title: 'La regola delle due ore', content: 'Chi risponde entro due ore chiude molto più spesso di chi risponde il giorno dopo. In questa lezione prepari tre risposte pronte per le domande che ricevi più spesso.', drip_days: 2 },
    { title: 'Dal messaggio all\'appuntamento', content: 'Ogni conversazione deve finire con un passo successivo chiaro. Vediamo come proporre l\'appuntamento senza insistere e come ridurre chi non si presenta.', drip_days: 2 },
  ]);
  mod(course, 'Tenere il ritmo', 2, [
    { title: 'Cosa guardare ogni lunedì', content: 'Tre numeri bastano: richieste arrivate, appuntamenti fissati, vendite chiuse. Li leggi in cinque minuti e sai dove intervenire.', drip_days: 5 },
    { title: 'Verifica finale', type: 'quiz', minutes: 5, drip_days: 5, content: 'Supera la verifica per ottenere l\'attestato.', quiz: { pass: 50, questions: [
      { q: 'Entro quanto conviene rispondere a una richiesta?', options: ['Due ore', 'Due giorni', 'Una settimana'], correct: 0 },
      { q: 'Quali numeri guardi ogni lunedì?', options: ['Richieste, appuntamenti, vendite', 'Follower, mi piace, commenti', 'Solo il fatturato'], correct: 0 },
    ] } },
  ]);
  const adv = ins('courses', { title: 'Automazioni che lavorano per te', slug: 'automazioni', description: 'Corso avanzato: si sblocca dal livello 3 della comunità.', emoji: '⚙️', color: '#7c3aed', category: 'Avanzato', instructor: 'Marco Leone', published: 1, price: 0, access: 'aperto', min_level: 3, drip_mode: 'libero', certificate: 1 });
  const before = lessonIds.length;
  mod(adv, 'Dalla teoria al primo flusso', 0, [
    { title: 'Cosa automatizzare e cosa no', content: 'Si automatizza ciò che è ripetitivo e prevedibile: conferme, promemoria, primi contatti. Non si automatizza la trattativa.' },
    { title: 'Il primo flusso in dieci minuti', type: 'video', video_url: 'https://example.com/video/primo-flusso', content: 'Costruiamo insieme l\'accoglienza dei nuovi lead con un\'attesa di risposta.' },
    { title: 'Misurare se funziona', content: 'Ogni passo del flusso mostra quante persone sono passate e quante sono ferme: è lì che si legge dove si perde la gente.' },
  ]);

  // --- comunità ---
  const member = (i, token, points, role, bio, joined) => ins('members', { contact_id: ids[i], token, points, role, bio, joined_at: ago(joined), last_seen: ago(joined % 4) });
  const mElena = member(0, 'demo-elena-marchetti', 138, 'moderatore', 'Studio dentistico a tre poltrone. Qui per smettere di fare i richiami a mano.', 30);
  const mAlessia = member(10, 'demo-alessia-deluca', 74, 'membro', 'Showroom di moda, clienti soprattutto da Instagram.', 22);
  const mLuca = member(3, 'demo-luca-gallo', 41, 'membro', 'Impianti fotovoltaici per famiglie e piccole aziende.', 9);
  const mMartina = member(4, 'demo-martina-costa', 22, 'membro', 'Centro estetico, due cabine.', 7);
  const mPaolo = member(5, 'demo-paolo-greco', 8, 'membro', null, 5);
  const enroll = (contact, memberId, doneCount, days, score) => {
    const e = ins('enrollments', { course_id: course, contact_id: ids[contact], created_at: ago(days), last_activity: ago(Math.min(days, doneCount ? 1 : days)), completed_at: doneCount >= 7 ? ago(1) : null });
    lessonIds.slice(0, doneCount).forEach((l, i) => ins('lesson_progress', { enrollment_id: e, lesson_id: l, done_at: ago(days - i), score: i === 2 || i === 6 ? score : null, attempts: 1 }));
  };
  enroll(0, mElena, 7, 28, 100); enroll(10, mAlessia, 4, 20, 66); enroll(3, mLuca, 2, 9, null); enroll(4, mMartina, 0, 12, null);
  ins('lesson_comments', { lesson_id: lessonIds[0], member_id: mAlessia, author_name: 'Alessia De Luca', body: 'I messaggi privati di Instagram contano come canale a parte?', created_at: ago(18) });
  ins('lesson_comments', { lesson_id: lessonIds[0], member_id: null, author_name: 'Giulia Ferri (staff)', body: 'Sì: ogni posto in cui un cliente può scriverti va in elenco, anche se lo usi poco.', created_at: ago(17) });

  const ch = {};
  [['Annunci', '📣', 'Novità dallo staff', 1], ['Presentazioni', '👋', 'Racconta chi sei e cosa fai', 0], ['Domande', '❓', 'Chiedi aiuto alla comunità', 0], ['Risultati', '🏆', 'Condividi cosa ha funzionato', 0]]
    .forEach(([name, emoji, description, staff_only], i) => { ch[name] = ins('channels', { name, emoji, description, position: i, staff_only }); });
  const post = (channel, memberId, author, title, body, days, extra = {}) => ins('posts', { channel_id: ch[channel], member_id: memberId, author_name: author, title, body, created_at: ago(days), pinned: 0, locked: 0, poll: null, ...extra });
  const cm = (p, memberId, author, body, days, parent = null) => ins('comments', { post_id: p, parent_id: parent, member_id: memberId, author_name: author, body, created_at: ago(days) });
  const like = (target, id, ...ms) => ms.forEach(m => ins('likes', { target, target_id: id, member_id: m }));
  const p1 = post('Annunci', null, 'Giulia Ferri (staff)', 'Benvenuti nella comunità', 'Qui trovate i corsi, le dirette e soprattutto gli altri: presentatevi nel canale Presentazioni e fate domande senza timore.', 29, { pinned: 1 });
  like('post', p1, mElena, mAlessia, mLuca, mMartina);
  const p2 = post('Presentazioni', mElena, 'Elena Marchetti', 'Studio dentistico, tre poltrone', 'Ciao a tutti! Il mio problema sono i richiami: li facevamo a mano. Ho appena finito il corso di avvio.', 26);
  const c1 = cm(p2, mAlessia, 'Alessia De Luca', 'Benvenuta! Anche da noi i richiami erano un incubo.', 25); cm(p2, mElena, 'Elena Marchetti', 'Ora partono da soli il giorno prima: provate.', 25, c1);
  like('post', p2, mAlessia, mLuca); like('comment', c1, mElena);
  const p3 = post('Domande', mLuca, 'Luca Gallo', 'Come gestite chi chiede solo il prezzo?', 'Mi scrivono in tanti «quanto costa?» e poi spariscono. Voi cosa rispondete?', 6);
  cm(p3, mElena, 'Elena Marchetti', 'Io rispondo con una forbice di prezzo e propongo subito una chiamata di dieci minuti.', 6);
  cm(p3, null, 'Marco Leone (staff)', 'Ottima domanda: ne parliamo nella diretta di giovedì.', 5);
  like('post', p3, mElena, mAlessia, mMartina);
  const p4 = post('Risultati', mAlessia, 'Alessia De Luca', 'Dodici appuntamenti in una settimana', 'Con il messaggio di promemoria il giorno prima non ho avuto nemmeno un appuntamento saltato.', 3);
  like('post', p4, mElena, mLuca, mMartina, mPaolo);
  const p5 = post('Annunci', null, 'Giulia Ferri (staff)', 'Di cosa parliamo nella prossima diretta?', 'Votate l\'argomento: il più scelto diventa la diretta del mese.', 2, { poll: { options: ['Rispondere più in fretta', 'Ridurre gli appuntamenti saltati', 'Chiedere recensioni'] } });
  [[mElena, 1], [mAlessia, 1], [mLuca, 0], [mMartina, 2]].forEach(([m, o]) => ins('poll_votes', { post_id: p5, member_id: m, option: o }));
  const ev = ins('events', { title: 'Diretta: domande e risposte', description: 'Un\'ora con lo staff per sciogliere i dubbi della settimana.', start_at: at(5, 18), link: 'https://example.com/diretta', location: 'Online' });
  ins('events', { title: 'Laboratorio: il tuo primo flusso', description: 'Costruiamo insieme un\'automazione di accoglienza.', start_at: at(12, 17), link: 'https://example.com/laboratorio', location: 'Online' });
  [mElena, mAlessia, mLuca].forEach(m => ins('event_rsvp', { event_id: ev, member_id: m }));
  db.prepare(`INSERT INTO settings (key,value) VALUES ('community_name','Il Circolo'), ('community_tagline','La comunità dei clienti: corsi, dirette e confronto'), ('schema_version',?)`).run(VERSION);
}

function seedIfEmpty() {
  let v = null;
  try { v = db.prepare(`SELECT value FROM settings WHERE key='schema_version'`).get(); } catch { /* database nuovo */ }
  if (!v || v.value !== VERSION) return reset(); // struttura cambiata o database vuoto: si riparte dai dati di esempio
  schema();
}
function reset() {
  for (const t of TABLES) db.exec(`DROP TABLE IF EXISTS ${t}`);
  schema();
  seed();
}

module.exports = { db, now, fmt, seedIfEmpty, reset };
