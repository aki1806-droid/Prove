// Grafiche del reel «Aggiornamento pagamenti novembre 2026» (testo approvato da Achille il 14/11): livelli trasparenti per le
// scene su clip (S01 cedolino, S04 sfera di cristallo, S05 delegata al telefono) in strati/, e la chiusura grafiche/S06A.png
// (foto della chiusura di ottobre con titolo e riquadro sfocati via, nuovo titolo e delegati AOUP). Stile della versione di
// ottobre: Montserrat 900, bianco + arancio, chip arancio, scrittura a mano Caveat.
//   node strumenti/pagamenti/novembre.mjs
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const QUI = path.dirname(fileURLToPath(import.meta.url));
const D = path.resolve(QUI, '../../pdro-aggiornamento-pagamenti-novembre-2026');
const FD = path.resolve(QUI, '../chicedomani/font');
const CAV = path.resolve(QUI, '../venti/caveat-latin-600.woff2');
const AR = 'rgb(243,146,0)';
const CSS = `@font-face{font-family:M;font-weight:800;src:url(file://${FD}/montserrat-latin-800-normal.woff2)}
@font-face{font-family:M;font-weight:900;src:url(file://${FD}/montserrat-latin-900-normal.woff2)}
@font-face{font-family:K;font-weight:600;src:url(file://${CAV})}
html,body{margin:0;width:1080px;height:1920px;overflow:hidden;background:transparent}
.ab{position:absolute;left:80px;right:60px}
.t{font:900 112px/1.0 M;color:#fff;letter-spacing:-2px;text-shadow:0 8px 30px rgba(0,0,0,.7)}
.t em{font-style:normal;color:${AR}}
.chip{display:inline-block;background:${AR};color:#14161b;font:800 34px M;padding:12px 30px;border-radius:40px}
.k{font:600 74px K;color:#fff;text-shadow:0 4px 18px rgba(0,0,0,.9)}
.timbro{position:absolute;left:150px;top:1180px;width:780px;border:12px solid #e3132b;border-radius:22px;color:#e3132b;
  font:900 104px/1.25 M;text-align:center;transform:rotate(-10deg);background:rgba(255,255,255,.08);text-shadow:0 0 18px rgba(0,0,0,.5)}
.box{position:absolute;left:70px;top:950px;width:760px;background:${AR};border-radius:26px;box-sizing:border-box;padding:26px 34px 28px;
  box-shadow:0 14px 40px rgba(0,0,0,.35);color:#14161b}
.box h3{margin:0 0 8px;font:900 40px M}.box .s{font:800 27px/1.35 M}.box .c{font:800 31px/1.4 M;margin-top:10px}.box .m{font:800 27px M;margin-top:12px}`;
const sfuma = `<div style="position:absolute;left:0;right:0;top:980px;bottom:0;background:linear-gradient(180deg,rgba(0,0,0,0),rgba(0,0,0,.72) 35%,rgba(0,0,0,.8))"></div>`;
const P = {
  strati: {
    scrim: sfuma,
    s01_chip: `<div class="ab" style="top:1160px"><span class="chip">AGGIORNAMENTO PAGAMENTI · NOVEMBRE</span></div>`,
    s01_tit: `<div class="ab t" style="top:1260px">SOLO<br><em>FATTI.</em></div>`,
    s01_mano: `<div class="ab k" style="top:1530px">niente sfere di cristallo</div>`,
    s04_tit: `<div class="ab t" style="top:330px;font-size:104px">PREVISIONI<br><em>DEL MESE</em></div>`,
    s04_timbro: `<div class="timbro">NON<br>PERVENUTE</div>`,
    s04_mano: `<div class="ab k" style="top:1560px;text-align:center;left:60px">sfera di cristallo → soffitta</div>`,
    s05_tit: `<div class="ab t" style="top:1260px;font-size:96px">FATTI,<br><em>NON PROCLAMI.</em></div>`,
    s05_mano: `<div class="ab k" style="top:1530px">i secondi? l'oroscopo</div>`,
  },
  grafiche: {
    S06A: `<div style="position:absolute;inset:0;background:url(file://${D}/grafiche/_fondo6.png)"></div>
      <div class="ab t" style="top:290px;left:62px;font-size:84px">POCHE PROMESSE,<br><em>MOLTI FATTI.</em></div>
      <div class="box"><h3>Dubbi sul cedolino?</h3><div class="s">Scrivi ai delegati CISL FP dell'AOUP Padova</div>
      <div class="c">Achille 391 127 1018<br>Giovanna 389 928 5301</div><div class="m">fp.padova.rovigo@cisl.it</div></div>`,
  },
};
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--allow-file-access-from-files'] });
const pg = await b.newPage({ viewport: { width: 1080, height: 1920 } });
for (const [dir, pagine] of Object.entries(P)) {
  const OUT = path.join(D, dir); fs.mkdirSync(OUT, { recursive: true });
  for (const [nome, corpo] of Object.entries(pagine)) {
    const html = path.join(OUT, '_p.html');
    fs.writeFileSync(html, `<html><head><meta charset="utf-8"><style>${CSS}</style></head><body>${corpo}</body></html>`);
    await pg.goto('file://' + html); await pg.evaluate(() => document.fonts.ready); await pg.waitForTimeout(120);
    await pg.screenshot({ path: path.join(OUT, nome + '.png'), omitBackground: dir === 'strati' }); fs.unlinkSync(html);
  }
}
await b.close(); console.log('grafiche novembre fatte');
