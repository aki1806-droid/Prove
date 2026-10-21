// Grafiche della versione 2 di «Verso il coordinamento» (21/10/2026, video reso generico per tutti i territori):
//   S08 nuova, i tre canali WhatsApp: fondo come la S07 (banda verde, crema), titolo, riquadro menta per il clip dei
//       canali (lo mette canali.py) e una card per azienda;
//   S09 (la vecchia chiusura S08): badge senza la data AOUP e riquadro dei delegati per azienda al posto di telefono e
//       mail della sede (sostituiscono i pezzi «badge» e «box» ritagliati da grafiche/S08A.png).
// Montserrat 800/900 (../chicedomani/font).
//   node strumenti/coordinamento/grafiche_v2.mjs   -> pdro-verso-il-coordinamento/grafica_v2/*.png
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const QUI = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(QUI, '../../pdro-verso-il-coordinamento/grafica_v2'); fs.mkdirSync(OUT, { recursive: true });
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
.box{position:absolute;left:68px;top:700px;width:944px;height:420px;background:#fff;border-radius:30px;box-shadow:0 14px 40px rgba(0,0,0,.25);
   text-align:center;box-sizing:border-box;padding-top:22px}
.box h3{margin:0 0 10px;font:800 38px M;color:rgb(243,146,0)}
.box .a{font:800 30px/1.35 M;color:${VERDE};margin-top:12px}
.box .c{font:800 26px/1.45 M;color:rgb(70,80,75)}`;
const pagine = {
  canali_fondo: `<body style="background:${CREMA}"><div class="banda"></div><div class="t">IL CANALE WHATSAPP<br>DELLA TUA AZIENDA</div><div class="pan"></div></body>`,
  ...Object.fromEntries(['AOUP Padova', 'ULSS 6 Euganea', 'ULSS 5 Polesana'].map((t, i) =>
    [`canali_n${i + 1}`, `<body><div class="n" style="top:${1170 + i * 132}px"><i></i><b>${t}</b></div></body>`])),
  badge: `<body><div class="badge">Bando 150 ore: occhio alle scadenze</div></body>`,
  box: `<body><div class="box"><h3>Chiedi guida e pacchetto al tuo delegato</h3>
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
console.log('grafiche v2', Object.keys(pagine).join(' '));
