// Riquadro della chiusura del reel «Aggiornamento pagamenti ottobre 2026» (video solo per l'AOUP Padova): al posto del
// riquadro arancio «Dubbi sul cedolino? 049 822 0630 · mail» del pacchetto (pezzo «box» di grafiche/S06A.png, serie.py
// ritocca) lo stesso riquadro con i delegati CISL FP dell'AOUP (../../metodo/REFERENTI-CISL-FP.md) e la mail.
// Montserrat 800/900 (../chicedomani/font).
//   node strumenti/pagamenti/grafiche.mjs   -> pdro-aggiornamento-pagamenti-ottobre-2026/grafica_v2/box.png
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const QUI = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(QUI, '../../pdro-aggiornamento-pagamenti-ottobre-2026/grafica_v2'); fs.mkdirSync(OUT, { recursive: true });
const FD = path.resolve(QUI, '../chicedomani/font');
const ARANCIO = 'rgb(243,146,0)', SCURO = 'rgb(20,22,27)';
const CSS = `@font-face{font-family:M;font-weight:800;src:url(file://${FD}/montserrat-latin-800-normal.woff2)}
@font-face{font-family:M;font-weight:900;src:url(file://${FD}/montserrat-latin-900-normal.woff2)}
html,body{margin:0;width:1080px;height:1920px;overflow:hidden;background:transparent}
.box{position:absolute;left:70px;top:950px;width:760px;background:${ARANCIO};border-radius:26px;box-sizing:border-box;padding:26px 34px 28px;
   box-shadow:0 14px 40px rgba(0,0,0,.35);color:${SCURO}}
.box h3{margin:0 0 8px;font:900 40px M}
.box .s{font:800 27px/1.35 M}
.box .c{font:800 31px/1.4 M;margin-top:10px}
.box .m{font:800 27px M;margin-top:12px}`;
const pagine = {
  box: `<body><div class="box"><h3>Dubbi sul cedolino?</h3>
    <div class="s">Scrivi ai delegati CISL FP dell'AOUP Padova</div>
    <div class="c">Achille 391 127 1018<br>Giovanna 389 928 5301</div>
    <div class="m">fp.padova.rovigo@cisl.it</div></div></body>`,
};
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--allow-file-access-from-files'] });
const pg = await b.newPage({ viewport: { width: 1080, height: 1920 } });
for (const [nome, corpo] of Object.entries(pagine)) {
  const html = path.join(OUT, '_p.html');
  fs.writeFileSync(html, `<html><head><meta charset="utf-8"><style>${CSS}</style></head>${corpo}</html>`);
  await pg.goto('file://' + html); await pg.evaluate(() => document.fonts.ready); await pg.waitForTimeout(150);
  await pg.screenshot({ path: path.join(OUT, nome + '.png'), omitBackground: true });
  fs.unlinkSync(html);
}
await b.close();
console.log('grafiche', Object.keys(pagine).join(' '));
