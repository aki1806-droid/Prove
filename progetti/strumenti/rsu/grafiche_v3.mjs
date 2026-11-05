// «La sedia vuota» versione 3 (5/11, sulla lettera della RSU): S04 con la frase nuova sotto il calendario, S05 nuova
// («Cosa vorremmo portare al tavolo», quattro schede), S09 con «Quelli che ci sono e che ci saranno sempre».
// Montserrat (../chicedomani/font) e Caveat (caveat-latin-600.woff2, Google Fonts) come nei volantini del pacchetto.
//   node strumenti/rsu/grafiche_v3.mjs   -> pdro-rsu-la-sedia-vuota/grafica_v3/*.png (poi composti da comp_v3.py)
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const QUI = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(QUI, '../../pdro-rsu-la-sedia-vuota/grafica_v3'); fs.mkdirSync(OUT, { recursive: true });
const FD = path.resolve(QUI, '../chicedomani/font');
const NAVY = 'rgb(16,42,84)', ROSSO = 'rgb(200,30,40)', CREMA = 'rgb(255,248,222)', GIALLO = 'rgb(255,205,60)';
const CSS = `@font-face{font-family:M;font-weight:800;src:url(file://${FD}/montserrat-latin-800-normal.woff2)}
@font-face{font-family:M;font-weight:900;src:url(file://${FD}/montserrat-latin-900-normal.woff2)}
@font-face{font-family:K;font-weight:600;src:url(file://${QUI}/caveat-latin-600.woff2)}
html,body{margin:0;width:1080px;height:1920px;overflow:hidden;background:transparent}
.banda{position:absolute;left:0;top:0;width:1080px;height:250px;background:${NAVY}}
.t1{position:absolute;left:70px;top:285px;font:900 66px/1.1 M;color:${NAVY}}
.t2{position:absolute;left:70px;top:370px;font:900 66px/1.1 M;color:${ROSSO}}
.c{position:absolute;left:70px;width:940px;height:200px;background:#fff;border:3px solid rgb(210,205,190);border-radius:24px;box-sizing:border-box;
   display:flex;align-items:center;gap:34px;padding:0 36px}
.c i{flex:none;width:76px;height:76px;border-radius:50%;background:${NAVY};color:#fff;font:900 40px/76px M;text-align:center;font-style:normal}
.c b{display:block;font:800 40px/1.15 M;color:${NAVY}}
.c s{display:block;text-decoration:none;font:800 27px/1.3 M;color:rgb(90,90,90);margin-top:8px}
.k{position:absolute;left:0;width:1080px;text-align:center;font:600 58px K}`;
const schede = [['Condizioni di lavoro', "e organizzazione dei servizi"], ['Il nuovo polo della Pediatria', 'la situazione delle ultime settimane'],
  ['Banca ore, congedi parentali a ore, settimana corta', 'tempi di vita e di lavoro'], ['Welfare aziendale', 'agevolazioni e servizi per i dipendenti']];
const pagine = {
  S05A: `<body style="background:${CREMA}"><div class="banda"></div><div class="t1">COSA VORREMMO</div><div class="t2">PORTARE AL TAVOLO.</div>
    ${schede.map(([b, s], k) => `<div class="c" style="top:${500 + k * 235}px"><i>${k + 1}</i><div><b>${b}</b><s>${s}</s></div></div>`).join('')}
    <div class="k" style="top:1470px;color:${NAVY}">Questioni che riguardano migliaia di persone.</div></body>`,
  S04_patch: `<body><div style="position:absolute;left:60px;top:1300px;width:960px;height:285px;background:rgb(30,22,22)"></div>
    <div class="k" style="top:1318px;color:${GIALLO};font-size:66px">Un'occasione persa per tutti.</div>
    <div style="position:absolute;left:90px;top:1468px;width:900px;font:800 33px/1.38 M;color:#fff">Ci presentiamo a ogni convocazione.<br>Senza numero legale, nessuna riunione è valida.</div></body>`,
  S09_patch: `<body><div class="k" style="top:1418px;color:${GIALLO};font-size:54px">Quelli che ci sono e che ci saranno sempre.</div></body>`,
};
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--allow-file-access-from-files'] });
const pg = await b.newPage({ viewport: { width: 1080, height: 1920 } });
for (const [nome, corpo] of Object.entries(pagine)) {
  const html = path.join(OUT, '_p.html');
  fs.writeFileSync(html, `<html><head><meta charset="utf-8"><style>${CSS}</style></head>${corpo}</html>`);
  await pg.goto('file://' + html); await pg.evaluate(() => document.fonts.ready); await pg.waitForTimeout(200);
  await pg.screenshot({ path: path.join(OUT, nome + '.png'), omitBackground: true }); fs.unlinkSync(html);
}
await b.close(); console.log('grafiche v3', Object.keys(pagine).join(' '));
