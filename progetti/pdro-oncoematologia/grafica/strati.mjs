// Strati trasparenti 1080x1920 del Reel: logo in alto a sinistra (su pastiglia
// bianca, perché logo e fondo sono dello stesso verde) e un PNG per ogni
// blocco di sottotitoli, nel riquadro in basso a sinistra accanto all'avatar.
//
//   node grafica/strati.mjs
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const QUI = path.dirname(fileURLToPath(import.meta.url));
const SUB = JSON.parse(fs.readFileSync(path.join(QUI, '../sottotitoli.json')));
const b64 = f => fs.readFileSync(path.join(QUI, f)).toString('base64');
const font = w => `@font-face{font-family:M;font-weight:${w};src:url(data:font/woff2;base64,${b64(`font/montserrat-latin-${w}-normal.woff2`)})}`;
const CSS = `${font(600)}${font(700)}${font(800)}
*{margin:0;box-sizing:border-box} html,body{width:1080px;height:1920px;background:transparent;font-family:M,sans-serif}
.logo{position:absolute;left:44px;top:52px;background:#fff;border-radius:22px;padding:14px 22px;box-shadow:0 6px 24px rgba(0,0,0,.25)}
.logo img{display:block;height:96px}
.sub{position:absolute;left:44px;bottom:240px;width:500px;background:rgba(0,83,42,.92);color:#fff;
     font-weight:700;font-size:40px;line-height:1.24;padding:22px 26px;border-radius:20px;
     border-left:10px solid #F39200;box-shadow:0 8px 26px rgba(0,0,0,.35)}`;
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' }).catch(() => chromium.launch());
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
const out = path.join(QUI, 'out'); fs.rmSync(out, { recursive: true, force: true }); fs.mkdirSync(out);
const scatta = async (html, f) => {
  await page.setContent(`<!doctype html><html><head><meta charset="utf-8"><style>${CSS}</style></head><body>${html}</body></html>`);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: path.join(out, f), omitBackground: true });
};
await scatta(`<div class="logo"><img src="data:image/png;base64,${b64('marchio/logo.png')}"></div>`, 'logo.png');
await scatta('', 'vuoto.png');
for (const [i, s] of SUB.entries()) await scatta(`<div class="sub">${esc(s.testo)}</div>`, `sub-${String(i).padStart(3, '0')}.png`);

// lista concat per ffmpeg: vuoto nelle pause, il blocco mentre è detto
const DUR = JSON.parse(fs.readFileSync(path.join(QUI, '../audio/tempi-scene.json'))).reduce((a, t) => a + t.durata, 0);
let t = 0, r = [];
const voce = (f, d) => { if (d > 0.001) r.push(`file '${f}'\nduration ${d.toFixed(3)}`); };
SUB.forEach((s, i) => { voce('vuoto.png', s.inizio - t); voce(`sub-${String(i).padStart(3, '0')}.png`, s.fine - s.inizio); t = s.fine; });
voce('vuoto.png', DUR - t); r.push(`file 'vuoto.png'`);
fs.writeFileSync(path.join(out, 'sottotitoli.txt'), r.join('\n') + '\n');
console.log(SUB.length, 'sottotitoli, durata', DUR.toFixed(2));
await browser.close();
