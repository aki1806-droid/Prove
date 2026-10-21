// Riquadro dei delegati per la chiusura del reel «Bonus mamme 2026» (video per il provinciale), stesso stile del
// riquadro di «Verso il coordinamento» v2 (../coordinamento/grafiche_v2.mjs, da cui è copiato):
//   al posto del riquadro «Scrivici o passa in sede» del pacchetto (pezzo «box» di grafiche/S07A.png, serie.py ritocca).
// Montserrat 800/900 (../chicedomani/font).
//   node strumenti/bonus/grafiche.mjs   -> pdro-bonus-mamme-2026/grafica_v2/box.png
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const QUI = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(QUI, '../../pdro-bonus-mamme-2026/grafica_v2'); fs.mkdirSync(OUT, { recursive: true });
const FD = path.resolve(QUI, '../chicedomani/font');
const VERDE = 'rgb(0,83,42)', CREMA = 'rgb(250,246,236)', MENTA = 'rgb(228,243,231)', ROSSO = 'rgb(200,16,46)', SCURO = 'rgb(16,30,40)';
const CSS = `@font-face{font-family:M;font-weight:800;src:url(file://${FD}/montserrat-latin-800-normal.woff2)}
@font-face{font-family:M;font-weight:900;src:url(file://${FD}/montserrat-latin-900-normal.woff2)}
html,body{margin:0;width:1080px;height:1920px;overflow:hidden;background:transparent}
.banda{position:absolute;left:0;top:0;width:1080px;height:250px;background:${VERDE}}
.t{position:absolute;left:70px;top:300px;font:900 74px/1.05 M;color:${VERDE}}
.pan{position:absolute;left:40px;top:540px;width:1000px;height:580px;background:${MENTA};border-radius:40px}
.n{position:absolute;left:70px;width:940px;height:108px;background:#fff;border-radius:28px;box-shadow:0 10px 30px rgba(0,60,30,.12);
   display:flex;align-items:center;gap:30px;box-sizing:border-box;padding-left:40px}
.n i{width:30px;height:30px;border-radius:50%;background:rgb(37,211,102)}
.n b{font:800 52px M;color:${SCURO}}
.badge{position:absolute;left:68px;top:518px;width:636px;height:96px;border-radius:48px;background:${ROSSO};
   display:flex;align-items:center;justify-content:center;font:800 31px M;color:#fff}
.box{position:absolute;left:68px;top:690px;width:944px;height:470px;background:#fff;border-radius:30px;box-shadow:0 14px 40px rgba(0,0,0,.25);
   text-align:center;box-sizing:border-box;padding-top:22px}
.box h3{margin:0 0 10px;font:800 38px M;color:rgb(243,146,0)}
.box .a{font:800 30px/1.35 M;color:${VERDE};margin-top:12px}
.box .c{font:800 26px/1.45 M;color:rgb(70,80,75)}
.box .m{font:800 28px M;color:rgb(243,146,0);margin-top:14px}`;
const pagine = {
  box: `<body><div class="box"><h3>Scrivici o contatta il tuo delegato</h3>
    <div class="a">AOUP Padova</div><div class="c">Achille 391 127 1018 · Giovanna 389 928 5301</div>
    <div class="a">ULSS 6 Euganea</div><div class="c">Fabio Turato 335 686 5715 · Brenda Bergo 339 313 5967<br>Emiliano Bedon 346 743 0752 · Alessandro Piovan 335 746 9671</div>
    <div class="a">ULSS 5 Polesana</div><div class="c">Carlo Cogo 335 109 9506</div>
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
console.log('grafiche bonus', Object.keys(pagine).join(' '));
