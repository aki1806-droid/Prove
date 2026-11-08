// «Il traduttore aziendalese–italiano» versione 2 (più attrattiva, richiesta di Achille 8/11): livelli trasparenti 1080x1920
// da mettere sopra le clip (scene overlay del motore): titolo d'aggancio, una frase alla volta in grande, la traduzione con
// l'evidenziatore giallo. Montserrat 800/900 e Caveat.   node strumenti/venti/strati_tr.mjs -> pdro-20f-01-.../strati/*.png
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const QUI = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(QUI, '../../pdro-20f-01-traduttore-aziendalese/strati'); fs.mkdirSync(OUT, { recursive: true });
const FD = path.resolve(QUI, '../chicedomani/font');
const CSS = `@font-face{font-family:M;font-weight:800;src:url(file://${FD}/montserrat-latin-800-normal.woff2)}
@font-face{font-family:M;font-weight:900;src:url(file://${FD}/montserrat-latin-900-normal.woff2)}
@font-face{font-family:K;font-weight:600;src:url(file://${QUI}/caveat-latin-600.woff2)}
html,body{margin:0;width:1080px;height:1920px;overflow:hidden;background:transparent}
.ab{position:absolute;left:60px;right:60px}
.tit{font:900 94px/1.0 M;color:#fff;text-shadow:0 8px 30px rgba(0,0,0,.6);letter-spacing:-2px}
.tit em{font-style:normal;color:#ffd23f}
.sub{font:600 64px K;color:#fff;text-shadow:0 4px 16px rgba(0,0,0,.7)}
.frase{background:rgba(12,18,34,.82);border:3px solid rgba(255,255,255,.18);border-radius:34px;padding:34px 44px 40px;
  box-shadow:0 20px 60px rgba(0,0,0,.45)}
.lab{font:800 30px M;letter-spacing:4px;color:#8fb4ff;margin-bottom:14px}
.q{font:800 74px/1.12 M;color:#fff}
.tr{background:#ffd23f;border-radius:20px;padding:30px 44px 36px;transform:rotate(-2.2deg);box-shadow:0 18px 50px rgba(0,0,0,.5)}
.tr .lab{color:#5a4300}
.tr .q{color:#111;font-weight:900;font-size:86px}`;
const frase = (top, n, testo) => `<div class="ab frase" style="top:${top}px"><div class="lab">FRASE ${n} · AZIENDALESE</div><div class="q">«${testo}»</div></div>`;
const trad = (top, testo) => `<div class="ab tr" style="top:${top}px"><div class="lab">TRADUZIONE</div><div class="q">${testo}</div></div>`;
const pagine = {
  s01_scrim: `<div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.55) 0%,rgba(0,0,0,.1) 32%,rgba(0,0,0,.1) 52%,rgba(0,0,0,.78) 100%)"></div>`,
  s01_titolo: `<div class="ab tit" style="top:300px">DALL'<em>AZIENDALESE</em><br>ALL'ITALIANO</div><div class="ab sub" style="top:505px">il traduttore che mancava</div>`,
  s01_p1: frase(1140, 1, 'Ottimizzazione delle risorse'),
  s01_t1: trad(1470, 'Manca personale.'),
  scrim: `<div style="position:absolute;inset:0;background:rgba(6,10,22,.62)"></div>`,
  s02_p1: frase(560, 2, "Ti chiediamo un po' di flessibilità"), s02_t1: trad(1000, 'Ti chiamiamo nel giorno di riposo.'),
  s02_p2: frase(560, 3, 'Riorganizzazione a invarianza di costi'), s02_t2: trad(1000, 'Stesse persone, più lavoro.'),
  s02_p3: frase(560, 4, "La questione è all'attenzione della Direzione"), s02_t3: trad(1000, 'Per ora, niente.'),
  s03_p1: frase(560, 5, 'Fase sperimentale'), s03_t1: trad(1000, 'Si fa così, e poi si vede.'),
  s03_p2: frase(560, 6, 'Valorizzazione del personale'), s03_t2: trad(1000, 'Ti diciamo grazie.'),
  s03_p3: frase(560, 7, 'Ci aggiorniamo'), s03_t3: trad(1000, 'Ci risentiamo. Forse.'),
};
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--allow-file-access-from-files'] });
const pg = await b.newPage({ viewport: { width: 1080, height: 1920 } });
for (const [nome, corpo] of Object.entries(pagine)) {
  const html = path.join(OUT, '_p.html');
  fs.writeFileSync(html, `<html><head><meta charset="utf-8"><style>${CSS}</style></head><body>${corpo}</body></html>`);
  await pg.goto('file://' + html); await pg.evaluate(() => document.fonts.ready); await pg.waitForTimeout(150);
  await pg.screenshot({ path: path.join(OUT, nome + '.png'), omitBackground: true }); fs.unlinkSync(html);
}
await b.close(); console.log('strati', Object.keys(pagine).length);
