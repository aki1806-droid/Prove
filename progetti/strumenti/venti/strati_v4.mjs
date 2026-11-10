// 20 format attrattivi, terza tornata (10/11): livelli 1080x1920 sopra le clip HeyGen per 09 Primo giorno in ospedale,
// 10 «60 secondi con…» (teaser della rubrica, nessuna persona inventata), 11 Prima e dopo. Stile di strati_v3.mjs.
//   node strumenti/venti/strati_v4.mjs -> <progetto>/strati/*.png
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const QUI = path.dirname(fileURLToPath(import.meta.url));
const FD = path.resolve(QUI, '../chicedomani/font');
const CSS = `@font-face{font-family:M;font-weight:800;src:url(file://${FD}/montserrat-latin-800-normal.woff2)}
@font-face{font-family:M;font-weight:900;src:url(file://${FD}/montserrat-latin-900-normal.woff2)}
@font-face{font-family:K;font-weight:600;src:url(file://${QUI}/caveat-latin-600.woff2)}
html,body{margin:0;width:1080px;height:1920px;overflow:hidden;background:transparent}
.ab{position:absolute;left:60px;right:60px}
.tit{font:900 100px/0.98 M;color:#fff;text-shadow:0 8px 30px rgba(0,0,0,.65);letter-spacing:-2px}
.tit em{font-style:normal;color:#111;background:#ffd23f;padding:0 14px;border-radius:10px;box-decoration-break:clone;-webkit-box-decoration-break:clone}
.pill{display:inline-block;background:#ffd23f;color:#111;font:800 40px M;padding:12px 30px;border-radius:40px;transform:rotate(-3deg);box-shadow:0 10px 30px rgba(0,0,0,.45)}
.box{background:rgba(12,18,34,.88);border:3px solid rgba(255,255,255,.18);border-radius:34px;padding:30px 40px 36px;box-shadow:0 20px 60px rgba(0,0,0,.45)}
.num{display:flex;gap:30px;align-items:center}
.num b{flex:0 0 170px;height:170px;border-radius:50%;background:#ffd23f;color:#111;font:900 110px/170px M;text-align:center;box-shadow:0 12px 34px rgba(0,0,0,.5)}
.num .t{font:900 70px/1.02 M;color:#fff;text-shadow:0 6px 24px rgba(0,0,0,.7)}
.sub{font:800 50px/1.15 M;color:#fff}
.dots{position:absolute;left:0;right:0;top:300px;text-align:center}
.dots i{display:inline-block;width:56px;height:14px;border-radius:8px;background:rgba(255,255,255,.35);margin:0 8px}
.dots i.on{background:#ffd23f}
.q{display:inline-block;white-space:nowrap;background:#fff;color:#111;font:900 48px/1.1 M;padding:24px 34px;border-radius:26px;box-shadow:0 12px 34px rgba(0,0,0,.5)}
.crono{position:absolute;right:50px;top:230px;width:200px;height:200px;border-radius:50%;border:12px solid #ffd23f;background:rgba(0,0,0,.6);
  color:#fff;font:900 96px/176px M;text-align:center;box-shadow:0 12px 34px rgba(0,0,0,.5)}
.pd{border-radius:30px;padding:28px 38px 34px;box-shadow:0 20px 60px rgba(0,0,0,.5)}
.pd .l{display:inline-block;font:900 36px M;letter-spacing:4px;padding:8px 22px;border-radius:30px;margin-bottom:16px}
.pd .t{font:900 76px/1.0 M}
.pd .s{font:800 44px/1.15 M;margin-top:12px}
.prima{background:rgba(25,25,30,.9);border:4px solid #ff4d5e}.prima .l{background:#ff4d5e;color:#fff}.prima .t{color:#fff}.prima .s{color:#ddd}
.dopo{background:rgba(255,255,255,.96);border:4px solid #0f8a43}.dopo .l{background:#0f8a43;color:#fff}.dopo .t{color:#0a5c2d}.dopo .s{color:#222}`;
const scrim = (a = .5) => `<div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,${a + .1}) 0%,rgba(0,0,0,${a - .2}) 40%,rgba(0,0,0,${a - .1}) 65%,rgba(0,0,0,${a + .2}) 100%)"></div>`;
const titolo = (top, html, st = '') => `<div class="ab tit" style="top:${top}px;${st}">${html}</div>`;
const pill = (top, testo, left = 60) => `<div style="position:absolute;left:${left}px;top:${top}px"><span class="pill">${testo}</span></div>`;
const P = {};
// ---- 09 Primo giorno in ospedale: sei schede numerate, una alla volta
const A9 = 'pdro-20f-09-primo-giorno-in-ospedale';
const voce = (k, t, s = '') => `<div class="dots">${[1, 2, 3, 4, 5, 6].map(i => `<i class="${i <= k ? 'on' : ''}"></i>`).join('')}</div>
  <div class="ab num" style="top:380px"><b>${k}</b><div class="t">${t}</div></div>${s ? `<div class="ab box" style="top:620px"><div class="sub">${s}</div></div>` : ''}`;
P[A9] = { scrim: scrim(.45),
  s01_titolo: titolo(380, '<em>6 COSE</em><br>CHE NESSUNO<br>TI DICE') + pill(760, 'il primo giorno in ospedale', 80),
  n1: voce(1, 'LEGGI IL CEDOLINO OGNI MESE.', 'Gli errori capitano.'), n2: voce(2, 'LE FERIE SI CHIEDONO IN TEMPO.', 'Con il piano ferie.'),
  n3: voce(3, 'FORMAZIONE OBBLIGATORIA? IN ORARIO.', 'Mai nel tuo tempo libero.'), n4: voce(4, "I DPI LI DÀ L'AZIENDA.", 'Non li paghi tu.'),
  n5: voce(5, 'ESISTE LA RSU.', 'Eletta anche da te.'), n6: voce(6, 'CHIEDI SUBITO.', 'Non dopo un anno.'),
};
// ---- 10 «60 secondi con…»: teaser della rubrica, solo domande
const A10 = 'pdro-20f-10-60-secondi-con';
const dom = (top, t, left = 60) => `<div style="position:absolute;left:${left}px;top:${top}px"><span class="q">${t}</span></div>`;
P[A10] = { scrim: scrim(.5), crono: `<div class="crono">60</div>`,
  s01_titolo: titolo(420, '<em>60</em><br>SECONDI<br>CON…') + pill(800, 'i volti della CISL FP', 80),
  s02_tit: titolo(470, '5 DOMANDE<br><em>LAMPO.</em>', 'font-size:90px'),
  d1: dom(720, 'Perché fai la delegata?'), d2: dom(850, 'Il caffè, come lo prendi?', 140),
  d3: dom(980, 'Come ti chiami e dove lavori?'), d4: dom(1110, 'La cosa più bella che hai risolto?', 100),
  d5: dom(1240, 'Cosa cambieresti in Azienda?', 40),
  presto: `<div class="ab" style="top:1420px;text-align:center"><span class="pill" style="font-size:50px">la prima puntata arriva presto</span></div>`,
};
// ---- 11 Prima e dopo
const A11 = 'pdro-20f-11-prima-e-dopo';
const card = (top, cls, l, t, s) => `<div class="ab pd ${cls}" style="top:${top}px"><span class="l">${l}</span><div class="t">${t}</div><div class="s">${s}</div></div>`;
P[A11] = { scrim: scrim(.45),
  s01_titolo: titolo(420, 'PRIMA<br>E <em>DOPO.</em>') + pill(680, 'la trasformazione che ti serve', 80),
  s02_prima: card(330, 'prima', 'PRIMA', 'NEL CASSETTO.', 'E ansia a fine mese.'),
  s02_dopo: card(760, 'dopo', 'DOPO', 'LETTO RIGA PER RIGA.', 'Con noi. E gli errori si correggono.'),
  s03_prima: card(330, 'prima', 'PRIMA', 'VERBALE DIMENTICATO.', 'Punteggio perso.'),
  s03_dopo: card(760, 'dopo', 'DOPO', 'PUNTEGGIO PIENO.', 'Documenti completi, consegnata in tempo.'),
};
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--allow-file-access-from-files'] });
const pg = await b.newPage({ viewport: { width: 1080, height: 1920 } });
let n = 0;
for (const [dir, pagine] of Object.entries(P)) {
  const OUT = path.resolve(QUI, '../..', dir, 'strati'); fs.mkdirSync(OUT, { recursive: true });
  for (const [nome, corpo] of Object.entries(pagine)) {
    const html = path.join(OUT, '_p.html');
    fs.writeFileSync(html, `<html><head><meta charset="utf-8"><style>${CSS}</style></head><body>${corpo}</body></html>`);
    await pg.goto('file://' + html); await pg.evaluate(() => document.fonts.ready); await pg.waitForTimeout(100);
    await pg.screenshot({ path: path.join(OUT, nome + '.png'), omitBackground: true }); fs.unlinkSync(html); n++;
  }
}
await b.close(); console.log('strati', n);
