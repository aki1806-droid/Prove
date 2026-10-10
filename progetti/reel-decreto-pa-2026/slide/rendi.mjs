// Renderizza le scene in sequenze PNG 1080x1920 a 25 fps, salvando solo i
// fotogrammi che cambiano: per ogni scena scrive slide/out/<id>/NNNN.png e
// slide/out/<id>/concat.txt (demuxer concat di ffmpeg, con le durate).
//
//   NODE_PATH=/opt/node22/lib/node_modules node slide/rendi.mjs [s1 s3 ...]
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SCENE } from './scene.mjs';

const QUI = path.dirname(fileURLToPath(import.meta.url));
const TEMPI = JSON.parse(fs.readFileSync(path.join(QUI, '../audio/tempi-scene.json')));
const FPS = 25, ENTRATA = 0.55;

// Font e logo incorporati in base64: una pagina caricata con setContent non
// può leggere file:// in modo affidabile.
const b64 = f => fs.readFileSync(path.join(QUI, f)).toString('base64');
const css = fs.readFileSync(path.join(QUI, 'stile.css'), 'utf8')
  .replace(/url\(FONT\/([^)]+)\)/g, (_, f) => `url(data:font/woff2;base64,${b64('font/' + f)})`);
const logo = 'data:image/png;base64,' + b64('marchio/logo.png');

function pagina(sc) {
  const els = sc.el.map((e, i) =>
    `<div class="el" id="e${i}">${e.html}</div>`).join('\n');
  return `<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head>
<body class="${sc.tipo === 'GRAFICA' ? 'grafica' : 'clip'}">
<div class="fondo"></div>
<div class="logo"><img src="${logo}"></div>
<div class="col">${els}</div>
</body></html>`;
}

// Stato di ogni elemento al tempo t: progresso d'entrata 0..1, arrotondato,
// così due fotogrammi uguali producono la stessa firma.
function stato(sc, t) {
  return sc.el.map(e => {
    const p = Math.min(1, Math.max(0, (t - e.t) / (e.anim === 'torta' ? 1.4 : ENTRATA)));
    return Math.round(p * 100) / 100;
  });
}

async function applica(page, sc, st) {
  await page.evaluate(({ st, anims }) => {
    const molla = p => 1 - Math.pow(1 - p, 3);
    st.forEach((p, i) => {
      const el = document.getElementById('e' + i);
      const a = anims[i];
      const q = molla(p);
      if (a === 'pop') {
        const s = p === 0 ? 0.6 : 0.6 + 0.4 * q + Math.sin(p * Math.PI) * 0.08;
        el.style.opacity = Math.min(1, p * 2.5);
        el.style.transform = `scale(${s})`;
      } else if (a === 'torta') {
        el.style.opacity = Math.min(1, p * 4);
        el.style.transform = `translateY(${(1 - Math.min(1, p * 3)) * 40}px)`;
        el.querySelector('.spicchio').setAttribute('stroke-dasharray', `${503 * 0.3 * q} 503`);
      } else {
        el.style.opacity = q;
        el.style.transform = `translateX(${(1 - q) * -60}px)`;
      }
    });
  }, { st, anims: sc.el.map(e => e.anim || 'scorri') });
}

const scelte = process.argv.slice(2);
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' }).catch(
  () => chromium.launch());
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });

for (const sc of SCENE) {
  if (scelte.length && !scelte.includes(sc.id)) continue;
  const tm = TEMPI.find(x => x.id === sc.id);
  const dir = path.join(QUI, 'out', sc.id);
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
  await page.setContent(pagina(sc), { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);

  const n = Math.round(tm.durata * FPS);
  const righe = [];
  let firma = null, k = 0, durata = 0, ultimo = null;
  for (let f = 0; f < n; f++) {
    const t = tm.inizio + f / FPS;
    const st = stato(sc, t);
    const s = st.join(',');
    if (s !== firma) {
      if (ultimo) righe.push(`file '${ultimo}'\nduration ${durata.toFixed(4)}`);
      await applica(page, sc, st);
      ultimo = String(k++).padStart(4, '0') + '.png';
      await page.screenshot({ path: path.join(dir, ultimo), omitBackground: sc.tipo === 'CLIP' });
      firma = s; durata = 0;
    }
    durata += 1 / FPS;
  }
  righe.push(`file '${ultimo}'\nduration ${durata.toFixed(4)}`, `file '${ultimo}'`);
  fs.writeFileSync(path.join(dir, 'concat.txt'), righe.join('\n') + '\n');
  console.log(sc.id, tm.durata.toFixed(2) + 's', k, 'fotogrammi unici');
}
await browser.close();
