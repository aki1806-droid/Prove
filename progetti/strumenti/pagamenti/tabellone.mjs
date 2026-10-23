// Tabellone «partenze» delle scene 2-4 del reel «Aggiornamento pagamenti ottobre 2026», rifatto in HTML con i colori e le
// righe di grafiche/S02A-S04A.png perché le lettere possano girare come palette (il motore della serie non lo sa fare).
// Ogni scena parte dallo stato in cui finisce la precedente; i cambi sono agganciati alle parole (audio/parole.json):
//   S02  tutto il tabellone gira all'inizio, la riga 1 si accende su «conguaglio», «ottobre: non pagato» entra su
//        «pagato» e lampeggia, «novembre: atteso» si accende su «novembre»;
//   S03  «novembre: atteso» pulsa su «novembre», la riga 2 si accende su «arretrati», il suo bollino su
//        «duemilaventicinque», il timbro giallo entra sull'ultima frase («Vi aggiorneremo…»);
//   S04  righe 1 e 2 si spengono, la riga 3 si accende su «contratto», «data firma: non certa» pulsa su «firma»,
//        «novembre: no» diventa rosso su «non» (… non saranno pagati a novembre).
// Nessun effetto sonoro (niente audio aggiunto oltre alla voce, regola del canale).
//   node strumenti/pagamenti/tabellone.mjs [S02 S03 S04 | prova S03 1,5,14]   -> montaggio/G_Sxx.mp4
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const QUI = path.dirname(fileURLToPath(import.meta.url));
const D = path.resolve(QUI, '../../pdro-aggiornamento-pagamenti-ottobre-2026');
const FD = path.resolve(QUI, '../chicedomani/font');
const parole = JSON.parse(fs.readFileSync(`${D}/audio/parole.json`, 'utf8'));
const tempi = Object.fromEntries(JSON.parse(fs.readFileSync(`${D}/audio/tempi-scene.json`, 'utf8')).map(t => [t.id, t.durata]));
const norm = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]/g, '');
// «parola», «parola#2» (seconda volta), «parola+0.3»
const T = (sid, v) => {
  if (typeof v === 'number') return v;
  const [, w, n, d] = v.match(/^([^#+]+)(?:#(\d+))?(?:\+([\d.]+))?$/);
  const tutte = parole[sid].filter(p => norm(p.w) === norm(w));
  if (!tutte[(n || 1) - 1]) throw new Error(`${sid}: parola ${v}`);
  return tutte[(n || 1) - 1].a + Number(d || 0);
};
// eventi per scena: [tipo, bersaglio, tempo]
const EV = {
  S02: [['gira', 'tutto', 0.05], ['accendi', 1, 'conguaglio'], ['pill', '1a', 'pagato'], ['lampeggia', '1a', 'pagato+0.3', 'abbiamo'],
        ['pill', '1b', 'novembre']],
  S03: [['pulsa', '1b', 'novembre'], ['accendi', 2, 'arretrati'], ['pill', '2a', 'duemilaventicinque'], ['timbro', 0, 'vi']],
  S04: [['spegni', 1, 0.15], ['spegni', 2, 0.15], ['accendi', 3, 'contratto'], ['pulsa', '3a', 'firma'], ['pill', '3b', 'non']],
};
const ORDINE = ['S02', 'S03', 'S04'];
// lo stato finale di una scena è lo stato iniziale della successiva: gli eventi delle scene prima valgono «da sempre»
const eventi = sid => ORDINE.slice(0, ORDINE.indexOf(sid) + 1).flatMap(s =>
  EV[s].filter(e => s === sid || !['timbro', 'gira', 'lampeggia', 'pulsa'].includes(e[0]))
       .map(e => [e[0], e[1], s === sid ? T(s, e[2]) : -99, e[3] != null ? (s === sid ? T(s, e[3]) : -99) : null]));

const HTML = `<html><head><meta charset="utf-8"><style>
@font-face{font-family:M;font-weight:800;src:url(file://${FD}/montserrat-latin-800-normal.woff2)}
@font-face{font-family:M;font-weight:900;src:url(file://${FD}/montserrat-latin-900-normal.woff2)}
html,body{margin:0;width:1080px;height:1920px;overflow:hidden;background:rgb(14,16,20)}
.hd{position:absolute;left:0;top:242px;width:1080px;height:100px;background:rgb(24,26,32)}
.hd b{position:absolute;left:72px;top:24px;font:bold 50px 'Liberation Mono';color:rgb(255,206,64)}
.hd i{position:absolute;right:70px;top:36px;font:normal 30px 'Liberation Mono';color:rgb(150,152,160);font-style:normal}
.card{position:absolute;left:52px;width:978px;height:338px;border-radius:22px;box-sizing:border-box;background:rgb(28,30,38)}
.fl{position:absolute;left:28px;top:30px;display:flex;gap:6px}
.fl s{position:relative;width:52px;height:80px;border-radius:7px;background:rgb(36,38,46);text-decoration:none;
  font:bold 50px/80px 'Liberation Mono';text-align:center}
.fl s:after{content:'';position:absolute;left:0;right:0;top:39px;height:2px;background:rgba(0,0,0,.55)}
.tt{position:absolute;left:30px;top:132px;font:900 50px M}
.pl{position:absolute;top:212px;height:56px;border-radius:28px;font:800 25px/56px M;padding:0 26px;white-space:nowrap}
.tb{position:absolute;left:105px;top:1525px;width:870px;height:96px;border:5px solid rgb(255,206,64);border-radius:12px;box-sizing:border-box;
  font:800 37px/86px M;color:rgb(255,206,64);text-align:center;transform-origin:50% 50%}
</style></head><body>
<div class="hd"><b id="h1"></b><i>AGG. OTTOBRE 2026</i></div>
<div id="r1" class="card" style="top:400px"><div class="fl"></div><div class="tt">PRODUTTIVITÀ</div>
  <div class="pl" id="p1a" style="left:28px">OTTOBRE: NON PAGATO</div><div class="pl" id="p1b" style="left:466px">NOVEMBRE: ATTESO</div></div>
<div id="r2" class="card" style="top:770px"><div class="fl"></div><div class="tt">DEP 2025</div>
  <div class="pl" id="p2a" style="left:28px">NOVEMBRE: ATTESI</div></div>
<div id="r3" class="card" style="top:1140px"><div class="fl"></div><div class="tt">CCNL 2025-2027</div>
  <div class="pl" id="p3a" style="left:28px">DATA FIRMA: NON CERTA</div><div class="pl" id="p3b" style="left:536px">NOVEMBRE: NO</div></div>
<div class="tb" id="tb">IMPEGNO PRESO · CONFERMA IN ARRIVO</div>
<script>
const PAROLE = {1: 'CONGUAGLIO', 2: 'ARRETRATI', 3: 'ARRETRATI'}, HEAD = 'TABELLONE PAGAMENTI';
const COL = {giallo: [255, 206, 64], rosso: [200, 16, 46], arancio: [243, 146, 0], grigio: [60, 60, 66]};
// colore acceso di ogni bollino
const PILL = {'1a': 'rosso', '1b': 'arancio', '2a': 'arancio', '3a': 'grigio', '3b': 'rosso'};
for (const k of [1, 2, 3]) document.querySelector('#r' + k + ' .fl').innerHTML = [...PAROLE[k]].map(() => '<s></s>').join('');
const cl = x => Math.max(0, Math.min(1, x)), mix = (a, b, p) => a.map((v, i) => Math.round(v + (b[i] - v) * p));
const rgb = c => 'rgb(' + c.join(',') + ')';
const eOut = p => 1 - Math.pow(1 - p, 3), eBack = p => { const c = 1.9; return 1 + (c + 1) * Math.pow(p - 1, 3) + c * Math.pow(p - 1, 2); };
const LET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const rnd = n => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
// una parola a palette: dopo t0 ogni lettera gira (lettere a caso) e si ferma in fila
function palette(target, t, t0, seme) {
  return [...target].map((ch, i) => {
    if (ch === ' ') return ' ';
    const fine = t0 + 0.28 + 0.07 * i;
    if (t < t0) return t0 > -50 ? '' : ch;
    if (t >= fine) return ch;
    return LET[Math.floor(rnd(Math.floor(t * 25 / 2) * 13 + i * 7 + seme) * LET.length)];
  });
}
window.disegna = (t, ev) => {
  const accesa = {1: 0, 2: 0, 3: 0}, girata = {1: -99, 2: -99, 3: -99};
  let tutto = -99, timbro = null;
  for (const [k, b, t0] of ev) {
    if (k === 'gira') tutto = t0;
    if (k === 'timbro') timbro = t0;
    if (k === 'accendi' && t >= t0) { accesa[b] = cl((t - t0) / 0.35); girata[b] = t0; }
  }
  for (const [k, b, t0] of ev) if (k === 'spegni' && t >= t0) accesa[b] = Math.min(accesa[b], 1 - cl((t - t0) / 0.4));
  document.getElementById('h1').textContent = palette(HEAD, t, tutto, 5).join('');
  for (const k of [1, 2, 3]) {
    const a = accesa[k], card = document.getElementById('r' + k);
    card.style.border = (2 + a) + 'px solid ' + rgb(mix([46, 48, 56], COL.giallo, a));
    card.style.boxShadow = a > 0 ? '0 0 ' + (34 * a) + 'px rgba(255,206,64,' + (0.22 * a) + ')' : 'none';
    // le lettere girano all'inizio (tutto il tabellone) e quando la riga si accende
    const t0 = Math.max(girata[k] > -50 && t >= girata[k] ? girata[k] : -99, tutto > -50 ? tutto + 0.15 * k : -99);
    const lett = palette(PAROLE[k], t, t0, k * 31);
    card.querySelectorAll('.fl s').forEach((s, i) => { s.textContent = lett[i]; s.style.color = rgb(mix([112, 114, 122], [246, 246, 246], a)); });
    const tt = card.querySelector('.tt'); tt.style.color = rgb(mix([100, 102, 110], COL.giallo, a));
    tt.style.opacity = tutto > -50 ? cl((t - tutto - 0.4 - 0.15 * k) / 0.4) : 1;
  }
  for (const id of Object.keys(PILL)) {
    const el = document.getElementById('p' + id); let on = 0, sc = 1, op = 1;
    for (const [k, b, t0, t1] of ev) if (b === id) {
      if (k === 'pill' && t >= t0) { on = cl((t - t0) / 0.3); if (t - t0 < 0.45) sc = 0.6 + 0.4 * eBack(cl((t - t0) / 0.45)); }
      if (k === 'lampeggia' && t > t0 && t < t1 && ((t - t0) / 0.3) % 1 > 0.5) op = 0.25;
      if (k === 'pulsa' && t > t0 && t < t0 + 1.2) sc *= 1 + 0.09 * Math.sin(Math.PI * (t - t0) / 0.6) ** 2;
    }
    // le righe spente hanno i bollini grigi anche se prima erano accesi
    const riga = +id[0]; if (ev.some(e => e[0] === 'spegni' && e[1] === riga && t >= e[2])) on *= accesa[riga];
    const c = mix(COL.grigio, COL[PILL[id]], on);
    el.style.background = rgb(c); el.style.color = PILL[id] === 'arancio' && on > 0.5 ? 'rgb(20,22,27)' : 'rgb(246,246,246)';
    el.style.transform = 'scale(' + sc + ')'; el.style.transformOrigin = '0 50%'; el.style.opacity = op * (tutto > -50 ? cl((t - tutto - 0.6) / 0.4) : 1);
  }
  const tb = document.getElementById('tb');
  if (timbro == null || t < timbro) tb.style.opacity = 0;
  else { const p = cl((t - timbro) / 0.3); tb.style.opacity = p; tb.style.transform = 'rotate(4deg) scale(' + (2.2 - 1.2 * eOut(p)) + ')'; }
};
</script></body></html>`;

const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--allow-file-access-from-files'] });
const pg = await b.newPage({ viewport: { width: 1080, height: 1920 } });
pg.on('pageerror', e => { console.error('ERRORE', e.message); process.exit(1); });
const html = path.join(D, 'grafica', '_tabellone.html'); fs.writeFileSync(html, HTML);
await pg.goto('file://' + html); await pg.evaluate(() => document.fonts.ready); fs.unlinkSync(html);
const foto = async (sid, t) => { await pg.evaluate(([t, ev]) => window.disegna(t, ev), [t, eventi(sid)]); return pg.screenshot({ type: 'png' }); };
const arg = process.argv.slice(2);
if (arg[0] === 'prova') {
  const dir = process.env.OUT; fs.mkdirSync(dir, { recursive: true });
  for (const t of arg[2].split(',').map(Number)) fs.writeFileSync(path.join(dir, `${arg[1]}_${t}.png`), await foto(arg[1], t));
} else {
  for (const sid of arg.length ? arg : ORDINE) {
    const n = Math.round(tempi[sid] * 25), out = `${D}/montaggio/G_${sid}.mp4`; fs.mkdirSync(path.dirname(out), { recursive: true });
    const ff = spawn('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', '-f', 'image2pipe', '-framerate', '25', '-c:v', 'png', '-i', '-',
      '-c:v', 'libx264', '-preset', 'medium', '-crf', '15', '-pix_fmt', 'yuv420p', out], { stdio: ['pipe', 'inherit', 'inherit'] });
    for (let f = 0; f < n; f++) { const buf = await foto(sid, f / 25); if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r)); }
    ff.stdin.end(); await new Promise(r => ff.on('close', r));
    console.log(sid, n, 'fotogrammi');
  }
}
await b.close();
