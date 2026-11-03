// Riquadro contatti PROVINCIALE per la chiusura (S05) della serie «Convenzioni CISL FP» (novembre 2026): stesso arancio
// e stesso carattere del riquadro AOUP del pacchetto, con i delegati dei tre territori (metodo/REFERENTI-CISL-FP.md).
//   node strumenti/convenzioni/contatti.mjs   -> strumenti/convenzioni/box_provinciale.png (964x372, trasparente)
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const QUI = path.dirname(fileURLToPath(import.meta.url));
const FD = path.resolve(QUI, '../chicedomani/font');
const CSS = `@font-face{font-family:M;font-weight:800;src:url(file://${FD}/montserrat-latin-800-normal.woff2)}
@font-face{font-family:M;font-weight:600;src:url(file://${FD}/montserrat-latin-800-normal.woff2)}
html,body{margin:0;width:964px;height:372px;background:transparent}
.box{width:964px;height:372px;background:rgb(243,146,0);border-radius:30px;box-sizing:border-box;padding:24px 30px;color:rgb(20,20,20)}
h3{margin:0 0 8px;font:800 31px M}
.a{font:800 23px/1.25 M;color:rgb(70,30,0);margin-top:9px;letter-spacing:.5px}
.c{font:800 25px/1.32 M}
.m{font:800 23px M;margin-top:12px}`;
const corpo = `<div class="box"><h3>Parliamone: contatta il tuo delegato</h3>
<div class="a">AOUP PADOVA</div><div class="c">Achille · 391 127 1018 &nbsp;·&nbsp; Giovanna · 389 928 5301</div>
<div class="a">ULSS 6 EUGANEA</div><div class="c">Fabio Turato · 335 686 5715 &nbsp;·&nbsp; Brenda Bergo · 339 313 5967<br>Emiliano Bedon · 346 743 0752 &nbsp;·&nbsp; Alessandro Piovan · 335 746 9671</div>
<div class="a">ULSS 5 POLESANA</div><div class="c">Carlo Cogo · 335 109 9506</div>
<div class="m">fp.padova.rovigo@cisl.it</div></div>`;
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--allow-file-access-from-files'] });
const pg = await b.newPage({ viewport: { width: 964, height: 372 } });
const html = path.join(QUI, '_p.html');
fs.writeFileSync(html, `<html><head><meta charset="utf-8"><style>${CSS}</style></head><body>${corpo}</body></html>`);
await pg.goto('file://' + html); await pg.evaluate(() => document.fonts.ready); await pg.waitForTimeout(150);
const h = await pg.evaluate(() => document.querySelector('.box').scrollHeight);
await pg.screenshot({ path: path.join(QUI, 'box_provinciale.png'), omitBackground: true });
fs.unlinkSync(html); await b.close(); console.log('box', h);
