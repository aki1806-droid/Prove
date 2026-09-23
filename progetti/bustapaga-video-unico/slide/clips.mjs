// Dallo stesso layout dei PNG: i fotogrammi dell'ingresso, poi mp4 a 25 fps.
// Il tempo non scorre da solo: ogni fotogramma sposta a mano l'orologio delle
// animazioni, cosi' ogni fotogramma cade sullo STESSO istante dell'animazione
// a ogni esecuzione.
//
// Questo e' quanto si puo' promettere, e va detto con precisione: l'istante e'
// deterministico, la RASTERIZZAZIONE no. Rifacendo tutte e 203 le clip, 62 sono
// uscite diverse byte per byte dalla corsa precedente — mentre le 218 slide
// ferme di cards.mjs sono uscite tutte identiche.
//
// Misurato, non supposto: sul fotogramma finale di s003 le differenze stanno
// solo sui bordi delle lettere e dei riquadri, mediana 2/255, 95mo percentile
// 6/255, massimo 23/255, con il 97,8% sotto 8/255. E' variazione di
// antialiasing del testo: invisibile a occhio, e comunque sotto a quello che
// l'H.264 conserva. Niente si sposta, niente cambia stato.
//
// Perche' qui e non in cards.mjs: li' l'orologio va a 4000 ms, cioe' oltre la
// fine di ogni animazione, e fra il salto e lo scatto c'e' la misura del
// traboccamento — tutto e' fermo e assestato. Qui si scatta subito dopo aver
// spostato l'orologio, 45 volte di fila, mentre gli elementi sono a meta' di
// una traslazione di frazioni di pixel; il livello di composizione che
// l'animazione promuove si porta dietro un posizionamento sub-pixel che dipende
// da come e' andata la corsa.
//
// NON si corregge forzando la rasterizzazione (--disable-lcd-text e simili):
// cambierebbe l'aspetto del testo di tutte e 218 le slide per aggiustare una
// cosa che nessuno puo' vedere. Si scrive qui, e si smette di usare l'MD5 di
// una clip come prova di riproducibilita': la prova buona e' il PNG.
import { chromium } from 'playwright';
import { mkdirSync, rmSync, existsSync, readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { SCENE } from './contenuti.mjs';
import { html } from './layout.mjs';

// Questo video non e' una lezione numerata: la cartella non ha un «-lN-» da cui
// ricavare l'etichetta, e la regola del nome avrebbe stampato «?» su tutte e
// 218 le slide. Si deriva dal DATO, come dice il MASTER: il capitolo di ogni
// scena sta in copione/blocchi.json, ed e' l'indicazione utile in un video di
// un'ora diviso in tredici capitoli.
const CAPITOLO = Object.fromEntries(JSON.parse(
  readFileSync(new URL('../copione/blocchi.json', import.meta.url), 'utf8'))
  .map(x => [x.id, x.capitolo]));
const etichetta = id => CAPITOLO[id] ? `cap ${CAPITOLO[id]}` : '';

// Opzionale: SOLO=s192,s202 rifa' soltanto quelle scene. Serve quando si
// corregge una slide su duecento e rifare tutto costerebbe mezz'ora. Senza
// SOLO si rifa' tutto, che resta il comportamento giusto per difetto: una
// selezione sbagliata lascia artefatti vecchi in mezzo ai nuovi.
const SOLO = process.env.SOLO ? new Set(process.env.SOLO.split(',').map(x => x.trim())) : null;

const FPS = 25, DURATA = 1.8;              // l'ingresso finisce entro 1,3 s
const FOTOGRAMMI = Math.round(FPS * DURATA);
const QUI = new URL('.', import.meta.url).pathname;
const FF = execFileSync('python3', ['-c',
  'import imageio_ffmpeg;print(imageio_ffmpeg.get_ffmpeg_exe())']).toString().trim();

// solo i blocchi: copertina e chiusura vanno in scena come immagini ferme
const DA_ANIMARE = SCENE.filter(s => s.tipo !== 'copertina');

mkdirSync(`${QUI}mp4`, { recursive: true });
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const p = await b.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });

for (const s of DA_ANIMARE) {
  if (SOLO && !SOLO.has(s.id)) continue;
  const i = SCENE.indexOf(s);
  const dir = `${QUI}fotogrammi/${s.id}`;
  rmSync(dir, { recursive: true, force: true }); mkdirSync(dir, { recursive: true });
  await p.setContent(html(s, { avanzamento: i / (SCENE.length - 1), pagina: etichetta(s.id) }),
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
const scritte = SOLO ? DA_ANIMARE.filter(s => SOLO.has(s.id)).length : DA_ANIMARE.length;
console.log(`\n${scritte} clip da ${DURATA}s scritte in mp4/` + (SOLO ? ` (SOLO; le altre ${DA_ANIMARE.length - scritte} restano com'erano)` : ''));
