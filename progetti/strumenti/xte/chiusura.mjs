// Corregge la slide di chiusura del pacchetto XTE (02_slide/S11_chiusura.png): il titolo, le righe dei contatti e la nota
// sono arrivati con le lettere accentate rovinate («salute Ã¨ piÃ¹ semplice», «Â·» al posto dei puntini, «non Ã¨ un
// dispositivo»). Si ricopre quella zona col verde del fondo e si riscrivono gli stessi testi, giusti, con gli stessi
// caratteri (Barlow Condensed 800 corsivo per il titolo, Barlow per il resto; font OFL in font/).
// Logo, QR e «CISL FP PADOVA ROVIGO» restano quelli del pacchetto.
//   node chiusura.mjs <progetto>   -> <progetto>/grafica/S11_chiusura.png
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const QUI = path.dirname(fileURLToPath(import.meta.url));
const P = path.resolve(process.argv[2]); const F = path.join(QUI, 'font');
fs.mkdirSync(path.join(P, 'grafica'), { recursive: true });
const VERDE = 'rgb(30,97,62)', GIALLO = '#EDE21B', CHIARO = '#97D676';
const html = path.join(P, 'grafica', '_chiusura.html');
fs.writeFileSync(html, `<html><head><meta charset="utf-8"><style>
@font-face{font-family:BC;font-weight:800;font-style:italic;src:url(file://${F}/barlow-condensed-latin-800-italic.woff2)}
@font-face{font-family:B;font-weight:400;src:url(file://${F}/barlow-latin-400-normal.woff2)}
@font-face{font-family:B;font-weight:700;src:url(file://${F}/barlow-latin-700-normal.woff2)}
html,body{margin:0;width:1920px;height:1080px;overflow:hidden}
#f{position:absolute;inset:0;background:url(file://${P}/02_slide/S11_chiusura.png)}
.copri{position:absolute;background:${VERDE}}
.t{position:absolute;left:108px;font:italic 800 88px/1 BC;color:${GIALLO};white-space:nowrap}
.c{position:absolute;left:111px;font:400 36px/1 B;color:#fff;white-space:nowrap}
.n{position:absolute;right:112px;font:400 20px/1 B;color:rgb(170,214,163);white-space:nowrap;text-align:right}
b{font-weight:700}
</style></head><body><div id="f"></div>
<div class="copri" style="left:100px;top:355px;width:1210px;height:450px"></div>
<div class="copri" style="left:960px;top:965px;width:880px;height:60px"></div>
<div class="t" style="top:363px">Prenderti cura della tua salute è</div>
<div class="t" style="top:448px">più semplice.</div>
<div class="c" style="top:592px"><b>convenzionicislfp.it/xte-salute</b> · info@convenzionicislfp.it</div>
<div class="c" style="top:647px"><span style="color:${CHIARO}">CISL FP Padova Rovigo</span> · fp.padova.rovigo@cisl.it</div>
<div class="c" style="top:702px">Padova, Via del Carmine 3 · 049 822 0630</div>
<div class="c" style="top:757px">Rovigo, Viale Tre Martiri 87/a · 0425 399 239</div>
<div class="n" style="top:973px">Convenzione nazionale CISL FP. XTE Salute integra, non sostituisce, il Servizio sanitario nazionale. Lo</div>
<div class="n" style="top:996px">smartwatch non è un dispositivo medico (Garmin.com/ataccuracy).</div>
</body></html>`);
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--allow-file-access-from-files'] });
const pg = await b.newPage({ viewport: { width: 1920, height: 1080 } });
await pg.goto('file://' + html); await pg.evaluate(() => document.fonts.ready); await pg.waitForTimeout(300);
await pg.screenshot({ path: path.join(P, 'grafica', 'S11_chiusura.png') });
fs.unlinkSync(html); await b.close();
console.log('chiusura corretta');
