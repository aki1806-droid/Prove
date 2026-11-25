// Disegna le toppe 1080x1920 (PNG trasparenti) dei frame del «Semaforo» versione provinciale.
//   node patch_frame.js <uscita_dir>
const { chromium } = require('playwright');
const fs = require('fs');
const out = process.argv[2];
const FD = '/home/user/Prove/progetti/strumenti/chicedomani/font';
const F64 = w => 'data:font/woff2;base64,' + fs.readFileSync(`${FD}/montserrat-latin-${w}-normal.woff2`).toString('base64');
const css = `@font-face{font-family:M;font-weight:800;src:url(${F64(800)})}@font-face{font-family:M;font-weight:900;src:url(${F64(900)})}
html,body{margin:0;width:1080px;height:1920px;background:transparent;font-family:M;font-weight:800}
.mail{position:absolute;left:46px;top:1186px;width:988px;box-sizing:border-box;border-radius:30px;background:#035028;color:#fff;
 padding:26px 34px 24px;text-align:center;box-shadow:0 12px 30px rgba(0,0,0,.45)}
.mail .a{font-size:34px;line-height:1.15}.mail .e{font-size:40px;font-weight:900;margin-top:6px;letter-spacing:-.5px}
.mail .u{margin-top:16px;padding-top:14px;border-top:2px solid rgba(255,255,255,.35);font-size:29px;line-height:1.25;color:#FFD34D}
.card{position:absolute;left:14px;top:1100px;width:680px;height:656px;background:#FBFDFB;box-sizing:border-box;box-shadow:0 14px 34px rgba(0,0,0,.45)}
.card .h{background:#0B8A3E;color:#fff;font-size:40px;font-weight:900;padding:26px 30px 20px}
.card .b{padding:14px 30px 0}
.t{font-size:23px;font-weight:900;letter-spacing:3px;color:#0B8A3E;margin:12px 0 4px}
.r{display:flex;justify-content:space-between;font-size:29px;line-height:1.42;color:#1a1d1b}
.r span:last-child{font-weight:900}
.m{margin-top:14px;padding-top:12px;border-top:2px solid #d5ddd8;font-size:30px;font-weight:900;color:#0B6E33}`;
const PAGES = {
  mail: `<div class="mail"><div class="a">Dipendenti AOUP: rinuncia scritta via mail a</div>
    <div class="e">posizioni.economiche@aopd.veneto.it</div>
    <div class="u">ULSS 6 e ULSS 5: chiedi al tuo ufficio personale<br>o al tuo delegato CISL FP</div></div>`,
  card: `<div class="card"><div class="h">IL TUO DELEGATO</div><div class="b">
    <div class="t">AOUP PADOVA</div>
    <div class="r"><span>Achille Pagliaro</span><span>391 127 1018</span></div>
    <div class="r"><span>Giovanna Vullo</span><span>389 928 5301</span></div>
    <div class="t">ULSS 6 EUGANEA</div>
    <div class="r"><span>Fabio Turato</span><span>335 686 5715</span></div>
    <div class="r"><span>Brenda Bergo</span><span>339 313 5967</span></div>
    <div class="r"><span>Emiliano Bedon</span><span>346 743 0752</span></div>
    <div class="r"><span>Alessandro Piovan</span><span>335 746 9671</span></div>
    <div class="t">ULSS 5 POLESANA</div>
    <div class="r"><span>Carlo Cogo</span><span>335 109 9506</span></div>
    <div class="m">fp.padova.rovigo@cisl.it</div></div></div>`,
};
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  for (const [k, h] of Object.entries(PAGES)) {
    await p.setContent(`<html><head><style>${css}</style></head><body>${h}</body></html>`);
    await p.evaluate(() => document.fonts.ready);
    const box = await p.evaluate(() => { const e = document.body.firstElementChild.getBoundingClientRect(); return [e.left, e.top, e.right, e.bottom]; });
    console.log(k, box.map(Math.round).join(','));
    await p.screenshot({ path: `${out}/toppa_${k}.png`, omitBackground: true });
  }
  await b.close();
})();
