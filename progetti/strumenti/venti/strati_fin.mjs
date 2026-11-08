// Calendario dei diritti, finale «Buone feste» v3 (8/11, Achille: «più bello e più accattivante»): livelli 1080x1920 sopra la clip
// HeyGen della festa in reparto. L'avatar sta in basso a destra (x 508-1080, y 1280-1920): lì non va nessuna grafica.
//   node strumenti/venti/strati_fin.mjs -> pdro-20f-04-calendario-avvento/strati/fin_*.png
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const QUI = path.dirname(fileURLToPath(import.meta.url));
const FD = path.resolve(QUI, '../chicedomani/font');
const OUT = path.resolve(QUI, '../../pdro-20f-04-calendario-avvento/strati');
const CSS = `@font-face{font-family:M;font-weight:800;src:url(file://${FD}/montserrat-latin-800-normal.woff2)}
@font-face{font-family:M;font-weight:900;src:url(file://${FD}/montserrat-latin-900-normal.woff2)}
@font-face{font-family:K;font-weight:600;src:url(file://${QUI}/caveat-latin-600.woff2)}
html,body{margin:0;width:1080px;height:1920px;overflow:hidden;background:transparent}
.ab{position:absolute;left:60px;right:60px}
.tit{font:900 96px/1.0 M;color:#fff;text-align:center;text-shadow:0 8px 30px rgba(0,0,0,.7);letter-spacing:-2px}
.tit em{font-style:normal;color:#ffd23f}
.k{font:600 70px K;color:#fff;text-align:center;text-shadow:0 4px 16px rgba(0,0,0,.8)}
.riga{position:absolute;left:84px;display:flex;gap:18px}
.port{width:135px;height:118px;border-radius:18px;background:linear-gradient(160deg,#c8102e,#7a0a1c);border:5px solid #ffd23f;
  box-shadow:0 10px 26px rgba(0,0,0,.55);display:flex;flex-direction:column;align-items:center;justify-content:center}
.port b{font:900 50px/1 M;color:#fff}.port i{font:900 30px/1 M;color:#ffd23f;font-style:normal;margin-top:4px}
.box{background:rgba(12,18,34,.86);border:3px solid rgba(255,255,255,.2);border-radius:34px;padding:34px 44px 40px;box-shadow:0 20px 60px rgba(0,0,0,.5)}
.q{font:800 66px/1.12 M;color:#fff;text-align:center}
.hl{background:#ffd23f;border-radius:22px;padding:26px 40px 32px;transform:rotate(-2.5deg);box-shadow:0 18px 50px rgba(0,0,0,.55)}
.hl .q{color:#111;font-weight:900;font-size:84px}
.cont{position:absolute;left:36px;width:438px;top:1330px;background:#f39200;border-radius:28px;padding:28px 30px;box-shadow:0 18px 50px rgba(0,0,0,.55)}
.cont .l{font:800 30px M;color:#3a1a00;letter-spacing:2px}.cont .n{font:900 33px/1.4 M;color:#111;white-space:nowrap}.cont .e{font:800 26px M;color:#3a1a00;margin-top:8px}
.feste{font:900 150px/0.95 M;color:#ffd23f;text-align:center;text-shadow:0 0 40px rgba(255,210,63,.55),0 10px 30px rgba(0,0,0,.7);letter-spacing:-3px}
.stella{position:absolute;font:900 70px M;color:#fff3b0;text-shadow:0 0 24px #ffd23f}`;
const riga = (top, da) => `<div class="riga" style="top:${top}px">${[0, 1, 2, 3, 4, 5].map(k => `<div class="port"><b>${da + k}</b><i>✓</i></div>`).join('')}</div>`;
const pagine = {
  fin_scrim: `<div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(40,0,8,.62) 0%,rgba(20,0,5,.35) 45%,rgba(10,0,4,.55) 70%,rgba(0,0,0,.75) 100%)"></div>`,
  fin_titolo: `<div class="ab tit" style="top:250px"><em>24</em> CASELLE<br><em>24</em> DIRITTI</div>`,
  fin_r1: riga(500, 1), fin_r2: riga(640, 7), fin_r3: riga(780, 13), fin_r4: riga(920, 19),
  fin_mese: `<div class="ab box" style="top:330px"><div class="q">I diritti non valgono<br>solo a dicembre…</div></div>`,
  fin_anno: `<div class="ab hl" style="top:640px"><div class="q">VALGONO TUTTO L'ANNO</div></div>`,
  fin_qui: `<div class="ab k" style="top:960px">Se ne hai bisogno, siamo qui.</div>
    <div class="cont"><div class="l">PARLIAMONE</div><div class="n">Achille · 391 127 1018<br>Giovanna · 389 928 5301</div><div class="e">fp.padova.rovigo@cisl.it</div></div>`,
  fin_feste: `<div class="ab feste" style="top:300px">BUONE<br>FESTE!</div><div class="ab k" style="top:620px;font-size:62px">da CISL FP Padova Rovigo</div>
    <div class="stella" style="left:70px;top:270px">✦</div><div class="stella" style="left:930px;top:250px;font-size:54px">✦</div>
    <div class="stella" style="left:960px;top:520px;font-size:40px">✦</div><div class="stella" style="left:40px;top:540px;font-size:44px">✦</div>`,
};
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--allow-file-access-from-files'] });
const pg = await b.newPage({ viewport: { width: 1080, height: 1920 } });
for (const [nome, corpo] of Object.entries(pagine)) {
  const html = path.join(OUT, '_p.html');
  fs.writeFileSync(html, `<html><head><meta charset="utf-8"><style>${CSS}</style></head><body>${corpo}</body></html>`);
  await pg.goto('file://' + html); await pg.evaluate(() => document.fonts.ready); await pg.waitForTimeout(120);
  await pg.screenshot({ path: path.join(OUT, nome + '.png'), omitBackground: true }); fs.unlinkSync(html);
}
await b.close(); console.log('strati', Object.keys(pagine).length);
