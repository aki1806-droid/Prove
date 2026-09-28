// Dallo stesso layout dei PNG: i fotogrammi della scena, poi mp4 a 25 fps.
// Il tempo non scorre da solo: ogni fotogramma sposta a mano l'orologio delle
// animazioni, cosi' il render e' identico a ogni esecuzione.
//
// Dal modulo 3 la clip non e' piu' solo l'ingresso (1,8 s): dura quanto il
// blocco di parlato (audio/blocchi-audio.json), perche' le illustrazioni hanno
// un movimento d'ambiente che deve continuare per tutta la scena. Senza
// l'audio tagliato (prima di `tagli.py applica`) si torna all'ingresso breve.
//
//   node slide/clips.mjs            tutte le scene
//   node slide/clips.mjs s04 s12    solo quelle indicate
import { chromium } from 'playwright';
import { mkdirSync, rmSync, existsSync, readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { SCENE } from './contenuti.mjs';
import { html } from './layout.mjs';

// il numero di lezione viene dal nome della cartella: progetti/m1-l1.2-profilo -> 1.2
const LEZIONE = (new URL('..', import.meta.url).pathname.match(/-l([\d.]+)-/) || [,'?'])[1];

const FPS = 25, INGRESSO = 1.8, TETTO = 30;   // secondi
const QUI = new URL('.', import.meta.url).pathname;
const FF = execFileSync('python3', ['-c',
  'import imageio_ffmpeg;print(imageio_ffmpeg.get_ffmpeg_exe())']).toString().trim();

const AUDIO = `${QUI}../audio/blocchi-audio.json`;
const DURATE = existsSync(AUDIO)
  ? Object.fromEntries(JSON.parse(readFileSync(AUDIO, 'utf8')).map(r => [r.id, r.durata])) : {};
const durata = id => DURATE[id] ? Math.min(DURATE[id] + 0.2, TETTO) : INGRESSO;

// solo i blocchi: copertina e chiusura vanno in scena come immagini ferme
const scelte = process.argv.slice(2);
const DA_ANIMARE = SCENE.filter(s => s.tipo !== 'copertina' && (!scelte.length || scelte.includes(s.id)));

mkdirSync(`${QUI}mp4`, { recursive: true });
const lancia = () => chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });

async function rendi(p, s) {
  const i = SCENE.indexOf(s);
  const dir = `${QUI}fotogrammi/${s.id}`;
  rmSync(dir, { recursive: true, force: true }); mkdirSync(dir, { recursive: true });
  await p.setContent(html(s, { avanzamento: i / (SCENE.length - 1), pagina: LEZIONE }),
                     { waitUntil: 'load' });
  await p.evaluate(() => document.fonts.ready);
  const n = Math.round(FPS * durata(s.id));
  for (let f = 0; f < n; f++) {
    await p.evaluate(ms => document.getAnimations().forEach(a => { a.currentTime = ms; }),
                     (f / FPS) * 1000);
    await p.screenshot({ path: `${dir}/${String(f).padStart(4, '0')}.jpg`, type: 'jpeg', quality: 94 });
  }
  execFileSync(FF, ['-y', '-v', 'error', '-framerate', String(FPS), '-i', `${dir}/%04d.jpg`,
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-pix_fmt', 'yuv420p',
    '-an', `${QUI}mp4/${s.id}.mp4`]);
  rmSync(dir, { recursive: true, force: true });
  process.stdout.write(`${s.id}(${durata(s.id).toFixed(1)}s) `);
}

// tre render in parallelo, ognuno col SUO browser. Tre pagine dello stesso
// browser no: quelle in secondo piano vengono rallentate, e ai fotogrammi
// mancavano pezzi interi (provato: nodi della rete spariti a meta' scena).
const coda = [...DA_ANIMARE];
await Promise.all([0, 1, 2].map(async () => {
  const b = await lancia();
  const p = await b.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
  while (coda.length) await rendi(p, coda.shift());
  await b.close();
}));
console.log(`\n${DA_ANIMARE.length} clip scritte in mp4/` +
  (Object.keys(DURATE).length ? ' (lunghe quanto il parlato)' : ` (solo ingresso, ${INGRESSO}s: manca l'audio tagliato)`));
