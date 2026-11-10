// 20 format attrattivi, quarta tornata (10/11): livelli 1080x1920 sopra le clip HeyGen per 12-17. Stile di strati_v4.mjs.
//   node strumenti/venti/strati_v5.mjs [chiave ...]  (chiavi: news nonna diz sitcom vet suono; senza argomenti tutte)
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
.tit em.r{background:#e3132b;color:#fff}
.pill{display:inline-block;background:#ffd23f;color:#111;font:800 40px M;padding:12px 30px;border-radius:40px;transform:rotate(-3deg);box-shadow:0 10px 30px rgba(0,0,0,.45)}
.box{background:rgba(12,18,34,.88);border:3px solid rgba(255,255,255,.18);border-radius:34px;padding:30px 40px 36px;box-shadow:0 20px 60px rgba(0,0,0,.45)}
.sub{font:800 50px/1.15 M;color:#fff}
.banda{position:absolute;left:0;right:0;top:1650px;height:110px;display:flex;align-items:stretch;box-shadow:0 -8px 30px rgba(0,0,0,.4)}
.banda b{background:#e3132b;color:#fff;font:900 50px/110px M;padding:0 34px;letter-spacing:2px}
.banda span{flex:1;background:rgba(255,255,255,.95);color:#111;font:800 36px/110px M;padding:0 30px;white-space:nowrap;overflow:hidden}
.live{position:absolute;right:50px;top:240px;background:#e3132b;color:#fff;font:900 40px M;padding:10px 26px;border-radius:12px;letter-spacing:4px}
.live:before{content:'● '}
.news{border-radius:30px;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,.5)}
.news .k{background:#ffd23f;color:#111;font:900 36px M;letter-spacing:4px;padding:14px 34px}
.news .k.r{background:#e3132b;color:#fff}
.news .t{background:rgba(12,18,34,.92);color:#fff;font:900 78px/1.0 M;padding:26px 34px 10px}
.news .t em{font-style:normal;color:#ffd23f}
.news .s{background:rgba(12,18,34,.92);color:#e6e6e6;font:800 46px/1.15 M;padding:6px 34px 30px}`;
const scrim = (a = .5) => `<div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,${a + .1}) 0%,rgba(0,0,0,${a - .2}) 40%,rgba(0,0,0,${a - .1}) 65%,rgba(0,0,0,${a + .2}) 100%)"></div>`;
const titolo = (top, html, st = '') => `<div class="ab tit" style="top:${top}px;${st}">${html}</div>`;
const pill = (top, testo, left = 60) => `<div style="position:absolute;left:${left}px;top:${top}px"><span class="pill">${testo}</span></div>`;
const P = {};
// ---- 14 Corsia News: telegiornale
const notizia = (top, k, t, s, rosso = false) => `<div class="ab news" style="top:${top}px"><div class="k ${rosso ? 'r' : ''}">${k}</div><div class="t">${t}</div><div class="s">${s}</div></div>`;
P.news = ['pdro-20f-14-corsia-news', { scrim: scrim(.4),
  banda: `<div class="banda"><b>CORSIA NEWS</b><span>CISL FP AOUP</span></div>`,
  live: `<div class="live">LIVE</div>`,
  s01_titolo: titolo(380, 'CORSIA<br><em class="r">NEWS</em>', 'font-size:130px') + pill(680, 'le notizie in meno di un caffè', 80),
  n1: notizia(360, 'PRIMA NOTIZIA', 'PART-TIME:<br><em>135 POSTI.</em>', 'Domande entro il 3 dicembre.'),
  n2: notizia(360, 'SECONDA NOTIZIA', 'PERMESSI STUDIO <em>2027.</em>', "Domande entro l'11 novembre."),
  n3: notizia(360, "● ULTIM'ORA", 'TURNI DA 12 ORE:<br><em>AL TAVOLO.</em>', 'Sì alla scelta dei lavoratori, no agli automatismi.', true),
}];
const scelte = process.argv.slice(2);
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--allow-file-access-from-files'] });
const pg = await b.newPage({ viewport: { width: 1080, height: 1920 } });
let n = 0;
for (const [k, [dir, pagine]] of Object.entries(P)) {
  if (scelte.length && !scelte.includes(k)) continue;
  const OUT = path.resolve(QUI, '../..', dir, 'strati'); fs.mkdirSync(OUT, { recursive: true });
  for (const [nome, corpo] of Object.entries(pagine)) {
    const html = path.join(OUT, '_p.html');
    fs.writeFileSync(html, `<html><head><meta charset="utf-8"><style>${CSS}</style></head><body>${corpo}</body></html>`);
    await pg.goto('file://' + html); await pg.evaluate(() => document.fonts.ready); await pg.waitForTimeout(100);
    await pg.screenshot({ path: path.join(OUT, nome + '.png'), omitBackground: true }); fs.unlinkSync(html); n++;
  }
}
await b.close(); console.log('strati', n);
