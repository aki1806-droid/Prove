// Dallo stesso layout dei PNG: i fotogrammi dell'ingresso, poi mp4 a 25 fps.
// Il tempo non scorre da solo: ogni fotogramma sposta a mano l'orologio delle
// animazioni, cosi' il render e' identico a ogni esecuzione.
import { chromium } from 'playwright';
import { mkdirSync, rmSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { SCENE } from './contenuti.mjs';
import { html } from './layout.mjs';

// il numero di lezione viene dal nome della cartella: progetti/m1-l1.2-profilo -> 1.2
const LEZIONE = (new URL('..', import.meta.url).pathname.match(/-l([\d.]+)-/) || [,'?'])[1];

const FPS = 25, DURATA = 1.8;              // l'ingresso finisce entro 1,3 s
const FOTOGRAMMI = Math.round(FPS * DURATA);
const QUI = new URL('.', import.meta.url).pathname;
const FF = execFileSync('python3', ['-c',
  'import imageio_ffmpeg;print(imageio_ffmpeg.get_ffmpeg_exe())']).toString().trim();

// solo i blocchi: copertina e chiusura vanno in scena come immagini ferme
// Con uno o piu' id sulla riga di comando si rifanno solo quelli: una slide
// corretta non deve costare la ri-resa delle altre quarantasette.
const SOLO = new Set(process.argv.slice(2));
const DA_ANIMARE = SCENE.filter(s => s.tipo !== 'copertina')
                        .filter(s => SOLO.size === 0 || SOLO.has(s.id));

mkdirSync(`${QUI}mp4`, { recursive: true });
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const p = await b.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });

for (const s of DA_ANIMARE) {
  const i = SCENE.indexOf(s);
  const dir = `${QUI}fotogrammi/${s.id}`;
  rmSync(dir, { recursive: true, force: true }); mkdirSync(dir, { recursive: true });
  await p.setContent(html(s, { avanzamento: i / (SCENE.length - 1), pagina: LEZIONE }),
                     { waitUntil: 'load' });
  await p.evaluate(() => document.fonts.ready);
  for (let f = 0; f < FOTOGRAMMI; f++) {
    await p.evaluate(ms => document.getAnimations().forEach(a => { a.currentTime = ms; }),
                     (f / FPS) * 1000);
    await p.screenshot({ path: `${dir}/${String(f).padStart(3, '0')}.png` });
  }
  execFileSync(FF, ['-y', '-v', 'error', '-framerate', String(FPS), '-i', `${dir}/%03d.png`,
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-pix_fmt', 'yuv420p',
    '-an', `${QUI}mp4/${s.id}.mp4`]);
  rmSync(dir, { recursive: true, force: true });
  process.stdout.write(`${s.id} `);
}
await b.close();
console.log(`\n${DA_ANIMARE.length} clip da ${DURATA}s scritte in mp4/`);
