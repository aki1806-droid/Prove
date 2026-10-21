// Grafiche delle due scene nuove del promo «Kit Contratto» (21/10/2026), nello stile delle scene del pacchetto:
//   S05 «Come averlo»: la card bianca con i tre passi del modulo (al posto di «Entra nel canale WhatsApp…»), base + un
//        PNG trasparente per passo, che monta.py fa entrare sulle parole;
//   S06 i tre canali: fondo menta del clip dei canali del pacchetto 16:9 e titolo (il clip lo mette scene_nuove.py), più
//        una card grande per azienda, perché nel clip in verticale i nomi sono piccoli.
// Montserrat 800 (../chicedomani/font), colori presi dalle scene del pacchetto.
//   node strumenti/kit/grafiche.mjs   -> pdro-kit-contratto-promo/grafiche_nuove/*.png
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const QUI = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(QUI, '../../pdro-kit-contratto-promo/grafiche_nuove'); fs.mkdirSync(OUT, { recursive: true });
const F = path.resolve(QUI, '../chicedomani/font/montserrat-latin-800-normal.woff2');
const FONDO = 'rgb(237,244,239)', MENTA = 'rgb(228,243,231)', ROSSO = 'rgb(221,0,40)', SCURO = 'rgb(21,44,29)', VERDE = 'rgb(0,98,51)';
const CSS = `@font-face{font-family:M;font-weight:800;src:url(file://${F})}
html,body{margin:0;width:1080px;height:1920px;overflow:hidden;background:transparent}
.card{position:absolute;left:90px;top:285px;width:900px;height:860px;background:#fff;border-radius:62px;box-shadow:0 18px 50px rgba(20,60,40,.12)}
.h{position:absolute;left:165px;top:350px;font:800 42px M;color:${ROSSO}}
.p{position:absolute;left:165px;display:flex;align-items:center;gap:38px}
.p i{width:107px;height:107px;border-radius:50%;background:${ROSSO};display:flex;align-items:center;justify-content:center}
.p b{font:800 56px/1.12 M;color:${SCURO};width:640px}
.t{position:absolute;left:90px;top:300px;font:800 66px/1.15 M;color:${VERDE}}
.n{position:absolute;left:90px;width:900px;height:108px;background:#fff;border-radius:30px;box-shadow:0 12px 34px rgba(20,60,40,.12);
   display:flex;align-items:center;gap:30px;box-sizing:border-box;padding-left:40px}
.n i{width:30px;height:30px;border-radius:50%;background:rgb(37,211,102)}
.n b{font:800 52px M;color:${SCURO}}
.r{position:absolute;left:45px;top:815px;width:990px;height:445px;background:#fff;border-radius:0 0 62px 62px;
   box-shadow:0 34px 40px -24px rgba(20,60,40,.16);text-align:center;box-sizing:border-box;padding-top:18px}
.r h3{margin:0 0 14px;font:800 36px M;color:${VERDE}}
.r .a{font:800 29px/1.35 M;color:${VERDE};margin-top:12px}
.r .c{font:800 26px/1.45 M;color:rgb(90,100,95)}`;
const SPUNTA = '<svg width="46" height="46" viewBox="0 0 46 46"><path d="M7 24 L18 35 L39 11" fill="none" stroke="#fff" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const PASSI = [['Compila il modulo', 470], ['Scegli la tua azienda', 680], ['Ricevi il kit nella mail', 890]];
const pagine = {
  s5_base: `<body style="background:${FONDO}"><div class="card"></div><div class="h">Come averlo</div></body>`,
  ...Object.fromEntries(PASSI.map(([t, y], i) => [`s5_p${i + 1}`, `<body><div class="p" style="top:${y}px"><i>${SPUNTA}</i><b>${t}</b></div></body>`])),
  s6_fondo: `<body style="background:${MENTA}"><div class="t">Il canale WhatsApp<br>della tua azienda</div></body>`,
  ...Object.fromEntries(['AOUP Padova', 'ULSS 6 Euganea', 'ULSS 5 Polesana'].map((t, i) =>
    [`s6_n${i + 1}`, `<body><div class="n" style="top:${1170 + i * 132}px"><i></i><b>${t}</b></div></body>`])),
  // chiusura (21/10): i delegati di riferimento per azienda, al posto della riga coi soli numeri di Achille e Giovanna
  s7_referenti: `<body><div class="r"><h3>Contatta il tuo delegato</h3>
    <div class="a">AOUP Padova</div><div class="c">Achille 391 127 1018 · Giovanna 389 928 5301</div>
    <div class="a">ULSS 6 Euganea</div><div class="c">Fabio Turato 335 686 5715 · Brenda Bergo 339 313 5967<br>Emiliano Bedon 346 743 0752 · Alessandro Piovan 335 746 9671</div>
    <div class="a">ULSS 5 Polesana</div><div class="c">Carlo Cogo 335 109 9506</div></div></body>`,
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
