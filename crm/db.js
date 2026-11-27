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

const TABLES = ['users', 'contacts', 'stages', 'opportunities', 'activities', 'tasks', 'conversations', 'messages', 'calendars', 'appointments',
  'workflows', 'runs', 'forms', 'pages', 'submissions', 'courses', 'lessons', 'enrollments', 'posts', 'comments', 'settings'];

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
  CREATE TABLE IF NOT EXISTS workflows (id INTEGER PRIMARY KEY, name TEXT, active INTEGER DEFAULT 0, trigger_type TEXT, trigger_config TEXT DEFAULT '{}', steps TEXT DEFAULT '[]');
  CREATE TABLE IF NOT EXISTS runs (id INTEGER PRIMARY KEY, workflow_id INTEGER, contact_id INTEGER, step_index INTEGER DEFAULT 0, status TEXT, resume_at TEXT, log TEXT DEFAULT '[]', created_at TEXT);
  CREATE TABLE IF NOT EXISTS forms (id INTEGER PRIMARY KEY, name TEXT, slug TEXT UNIQUE, fields TEXT DEFAULT '[]', stage_id INTEGER, tag TEXT, thanks TEXT);
  CREATE TABLE IF NOT EXISTS pages (id INTEGER PRIMARY KEY, title TEXT, slug TEXT UNIQUE, blocks TEXT DEFAULT '[]', published INTEGER DEFAULT 1);
  CREATE TABLE IF NOT EXISTS submissions (id INTEGER PRIMARY KEY, form_id INTEGER, contact_id INTEGER, data TEXT, created_at TEXT);
  CREATE TABLE IF NOT EXISTS courses (id INTEGER PRIMARY KEY, title TEXT, slug TEXT UNIQUE, description TEXT);
  CREATE TABLE IF NOT EXISTS lessons (id INTEGER PRIMARY KEY, course_id INTEGER, title TEXT, content TEXT, video_url TEXT, position INTEGER DEFAULT 0);
  CREATE TABLE IF NOT EXISTS enrollments (id INTEGER PRIMARY KEY, course_id INTEGER, contact_id INTEGER, token TEXT UNIQUE, completed TEXT DEFAULT '[]', created_at TEXT);
  CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY, course_id INTEGER, author_name TEXT, body TEXT, created_at TEXT);
  CREATE TABLE IF NOT EXISTS comments (id INTEGER PRIMARY KEY, post_id INTEGER, author_name TEXT, body TEXT, created_at TEXT);
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

  ins('workflows', {
    name: 'Benvenuto ai nuovi lead', active: 1, trigger_type: 'lead_created', trigger_config: {},
    steps: [
      { type: 'send_message', channel: 'whatsapp', body: 'Ciao {{nome}}, grazie per averci contattato! Ti scriviamo a breve con tutte le informazioni.' },
      { type: 'create_task', title: 'Chiamare {{nome}} {{cognome}}', days: 1 },
      { type: 'wait', amount: 2, unit: 'giorni' },
      { type: 'condition', mode: 'not_has', tag: 'cliente' },
      { type: 'send_message', channel: 'whatsapp', body: '{{nome}}, sei riuscito a dare un\'occhiata? Se vuoi fissiamo una chiamata di 30 minuti.' },
    ],
  });
  ins('workflows', {
    name: 'Promemoria dopo la prenotazione', active: 1, trigger_type: 'appointment_booked', trigger_config: {},
    steps: [
      { type: 'send_message', channel: 'whatsapp', body: 'Ciao {{nome}}, appuntamento confermato. Ti mando un promemoria il giorno prima.' },
      { type: 'add_tag', tag: 'appuntamento fissato' },
      { type: 'notify', text: 'Nuovo appuntamento prenotato da {{nome}} {{cognome}}' },
    ],
  });
  ins('workflows', {
    name: 'Auguri di compleanno', active: 1, trigger_type: 'birthday', trigger_config: {},
    steps: [{ type: 'send_message', channel: 'whatsapp', body: 'Tanti auguri {{nome}}! 🎂 Per te uno sconto del 10% valido tutto il mese.' }],
  });
  ins('workflows', {
    name: 'Lead caldo: assegna e avvisa', active: 0, trigger_type: 'tag_added', trigger_config: { tag: 'caldo' },
    steps: [{ type: 'assign', user_id: giulia }, { type: 'notify', text: '{{nome}} {{cognome}} è un lead caldo: richiamare oggi' }, { type: 'create_task', title: 'Richiamare subito {{nome}}', days: 0 }],
  });

  const course = ins('courses', { title: 'Primi passi con i tuoi clienti', slug: 'primi-passi', description: 'Un percorso breve per organizzare contatti, risposte e appuntamenti.' });
  const lessons = [
    ['Dove finiscono oggi i tuoi contatti', 'Prima di cambiare strumento, fai l\'elenco dei posti in cui ti arrivano le richieste: telefono, WhatsApp, email, social, passaparola. Segna per ognuno chi risponde e in quanto tempo.'],
    ['La regola delle due ore', 'Chi risponde entro due ore chiude molto più spesso di chi risponde il giorno dopo. In questa lezione prepari tre risposte pronte per le domande che ricevi più spesso.'],
    ['Dal messaggio all\'appuntamento', 'Ogni conversazione deve finire con un passo successivo chiaro. Vediamo come proporre l\'appuntamento senza insistere e come ridurre chi non si presenta.'],
    ['Cosa guardare ogni lunedì', 'Tre numeri bastano: richieste arrivate, appuntamenti fissati, vendite chiuse. Li leggi in cinque minuti e sai dove intervenire.'],
  ].map(([title, content], i) => ins('lessons', { course_id: course, title, content, position: i, video_url: null }));
  ins('enrollments', { course_id: course, contact_id: ids[0], token: 'demo-elena-marchetti', completed: [lessons[0], lessons[1]], created_at: ago(20) });
  ins('enrollments', { course_id: course, contact_id: ids[10], token: 'demo-alessia-deluca', completed: [lessons[0]], created_at: ago(15) });
  const post = ins('posts', { course_id: course, author_name: 'Giulia Ferri', body: 'Benvenuti! Presentatevi qui sotto: di cosa vi occupate e qual è la cosa che vi fa perdere più tempo con i clienti?', created_at: ago(19) });
  ins('comments', { post_id: post, author_name: 'Elena Marchetti', body: 'Studio dentistico, tre poltrone. Il problema sono i richiami: li facciamo a mano.', created_at: ago(18) });
  ins('comments', { post_id: post, author_name: 'Alessia De Luca', body: 'Showroom di moda. Perdo i messaggi che arrivano su Instagram la sera.', created_at: ago(14) });
}

function seedIfEmpty() {
  schema();
  if (db.prepare('SELECT count(*) n FROM users').get().n === 0) seed();
}
function reset() {
  for (const t of TABLES) db.exec(`DROP TABLE IF EXISTS ${t}`);
  schema();
  seed();
}

module.exports = { db, now, fmt, seedIfEmpty, reset };
