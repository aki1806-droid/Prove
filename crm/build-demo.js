// Costruisce la versione di prova in una pagina sola: lo stesso codice del server gira nel
// browser sopra SQLite compilato in JavaScript (sql.js), e i dati restano nel browser di chi la apre.
//   node build-demo.js [file di uscita]     (predefinito: dist/cordata-crm.html)
const fs = require('node:fs');
const path = require('node:path');

const read = f => fs.readFileSync(path.join(__dirname, f), 'utf8').replace(/<\/script/gi, '<\\/script');
const out = process.argv[2] || path.join(__dirname, 'dist', 'cordata-crm.html');
const appBody = read('public/index.html').match(/<div class="app">[\s\S]*?<\/div>\s*<div id="modal"/)[0].replace(/<div id="modal"$/, '');
const mod = f => `function (module, exports, require, __dirname, process) {\n${read(f)}\n}`;

const html = `<title>Cordata CRM</title>
<style>
${read('public/style.css')}
html, body { color-scheme: light; }
#pubwrap { background: var(--bg); min-height: 100vh; }
.backbar { background: var(--brand); padding: 10px 16px; }
.backbar a { color: #fff; text-decoration: none; font-weight: 600; }
.demo-note { font-size: .75rem; color: #b9cbc7; margin: 0; }
#boot { padding: 40px 16px; text-align: center; color: var(--muted); }
</style>
<div id="boot">Preparo i dati di esempio…</div>
${appBody.replace('<div class="app">', '<div class="app" hidden>').replace('<div class="side-foot">', '<div class="side-foot"><p class="demo-note">Versione di prova: i dati restano in questo browser.</p>')}
<div id="pubwrap" hidden><div class="backbar"><a href="#/dashboard">← Torna al gestionale</a> <span class="demo-note">· questa è la pagina che vede il cliente</span></div><div class="pub" id="root"></div></div>
<div id="modal" class="modal" hidden></div>
<div id="toast" class="toast" hidden></div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.12.0/sql-asm.js"></script>
<script>
window.DEMO = true;
initSqlJs().then(SQL => {
  // --- node:sqlite sopra sql.js, con salvataggio nel browser ---
  const KEY = 'cordata.db';
  let raw = null;
  const norm = p => p.map(v => (v === undefined ? null : typeof v === 'boolean' ? (v ? 1 : 0) : v));
  class DatabaseSync {
    constructor() {
      try { const s = localStorage.getItem(KEY); if (s) this.d = new SQL.Database(Uint8Array.from(atob(s), c => c.charCodeAt(0))); } catch (e) { /* si riparte dai dati di esempio */ }
      if (!this.d) this.d = new SQL.Database();
      raw = this.d;
    }
    exec(sql) { this.d.run(sql); }
    prepare(sql) {
      const d = this.d;
      const all = (...p) => { const st = d.prepare(sql); try { st.bind(norm(p)); const rows = []; while (st.step()) rows.push(st.getAsObject()); return rows; } finally { st.free(); } };
      return { all, get: (...p) => all(...p)[0], run: (...p) => { d.run(sql, norm(p)); return { lastInsertRowid: d.exec('SELECT last_insert_rowid()')[0].values[0][0], changes: d.getRowsModified() }; } };
    }
  }
  const save = () => { try { const b = raw.export(); let s = ''; for (let i = 0; i < b.length; i += 8192) s += String.fromCharCode.apply(null, b.subarray(i, i + 8192)); localStorage.setItem(KEY, btoa(s)); } catch (e) { /* senza archivio i dati durano fino alla chiusura */ } };

  // --- i moduli del server, caricati con un require minimo ---
  const builtin = {
    'node:sqlite': { DatabaseSync }, 'node:http': {}, 'node:fs': { mkdirSync() {}, readFile() {} },
    'node:path': { join: (...a) => a.join('/'), normalize: x => x, extname: () => '', sep: '/' },
    'node:crypto': { randomBytes: n => ({ toString: () => [...crypto.getRandomValues(new Uint8Array(n))].map(b => b.toString(16).padStart(2, '0')).join('') }) },
  };
  const defs = { './db': ${mod('db.js')}, './automations': ${mod('automations.js')}, './academy': ${mod('academy.js')}, './server': ${mod('server.js')} };
  const cache = {};
  const require = name => {
    if (builtin[name]) return builtin[name];
    if (!cache[name]) { const m = cache[name] = { exports: {} }; defs[name](m, m.exports, require, '', { env: {} }); }
    return cache[name].exports;
  };
  let server;
  try { server = require('./server'); }
  catch (e) { try { localStorage.removeItem(KEY); } catch (x) { /* niente da pulire */ } delete cache['./db']; delete cache['./automations']; delete cache['./academy']; delete cache['./server']; server = require('./server'); }

  window.DEMO_API = async (p, method, body) => {
    try {
      const res = await server.api({ method: method || 'GET' }, new URL(p, 'http://cordata.local'), body || {});
      if (method && method !== 'GET') save();
      return JSON.parse(JSON.stringify(res ?? null));
    } catch (e) { if (!e.status) console.error(e); throw new Error(e.status ? e.message : 'Errore interno'); }
  };
  setInterval(save, 15000);
  document.getElementById('boot').remove();
  document.querySelector('.app').hidden = false;

  (function () {
${read('public/public.js')}
${read('public/portal.js')}
startPublic();
  })();
  (function () {
${read('public/app.js')}
${read('public/auto.js')}
${read('public/academy-ui.js')}
start();
  })();
}).catch(e => { document.getElementById('boot').textContent = 'Non riesco ad avviare la versione di prova: ' + e.message; });
</script>
`;
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, html);
console.log(`${out} — ${(html.length / 1024).toFixed(0)} KB`);
