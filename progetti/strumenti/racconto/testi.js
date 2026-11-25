// «Sentirsi per sentire – il racconto»: sottotitoli e scritte sulle foto come PNG trasparenti a piena inquadratura,
// più l'elenco delle sovrapposizioni [file, inizio, fine].   node testi.js <cartella progetto> 16x9|9x16
const { chromium } = require('playwright');
const fs = require('fs');
const [D, F] = process.argv.slice(2);
const [W, H] = F === '16x9' ? [1920, 1080] : [1080, 1920];
const out = `${D}/testi/${F}`; fs.mkdirSync(out, { recursive: true });
const subs = JSON.parse(fs.readFileSync(`${D}/audio/tempi_sottotitoli.json`, 'utf8'));
const MUTE = [19, 28, 29, 31];   // frasi già scritte sul cartello: niente sottotitolo doppio
const v = F === '16x9';
const css = `html,body{margin:0;width:${W}px;height:${H}px;background:transparent}
.s{position:absolute;${v ? 'left:220px;right:220px;bottom:64px;font-size:42px' : 'left:80px;right:80px;bottom:300px;font-size:48px'};text-align:center}
.s span{display:inline-block;background:rgba(38,24,42,.62);border-radius:16px;padding:10px 26px;box-shadow:0 0 30px rgba(38,24,42,.5);
  font-family:'Lora',serif;font-weight:500;line-height:1.32;color:#F4EDE2;text-shadow:0 2px 6px rgba(0,0,0,.85)}
.l{position:absolute;left:0;right:0;top:${v ? 120 : 300}px;text-align:center;font-family:'Work Sans';font-weight:700;font-size:${v ? 30 : 32}px;
  letter-spacing:10px;color:#F4EDE2;text-shadow:0 2px 14px rgba(0,0,0,.8)}
.l b{display:inline-block;padding:14px 22px 16px 32px;border-radius:14px;background:rgba(38,24,42,.55)}
.l i{display:block;width:120px;height:3px;background:#B21E2C;margin:16px auto 0;border-radius:2px}
.q{position:absolute;left:0;right:0;top:${v ? 110 : 280}px;text-align:center;font-family:'Instrument Serif',serif;font-size:${v ? 78 : 84}px;
  line-height:1.1;color:#F4EDE2;text-shadow:0 3px 18px rgba(0,0,0,.85)}
.q span{display:inline-block;padding:10px 40px 18px;border-radius:18px;background:rgba(38,24,42,.55)}
.q i{display:block;width:180px;height:3px;background:#B21E2C;margin:14px auto 0;border-radius:2px}`;
const pagine = [['etichetta.png', '<div class="l"><b>24 NOVEMBRE 2026 · PADOVA<i></i></b></div>'],
  ['domanda.png', `<div class="q"><span>Quanto ci ascoltiamo${v ? ' ' : '<br>'}<em>davvero?</em><i></i></span></div>`]];
const el = [['etichetta.png', 14.6, 20.6], ['domanda.png', 76.8, 82.4]];
let k = 0;
subs.forEach(([a, b, t, f]) => {
  if (MUTE.includes(f)) return;
  const n = `sub_${String(++k).padStart(2, '0')}.png`;
  pagine.push([n, `<div class="s"><span>${t}</span></div>`]); el.push([n, +(a - 0.1).toFixed(2), +b.toFixed(2)]);
});
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: W, height: H } });
  for (const [f, h] of pagine) {
    await p.setContent(`<html><head><link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Lora:wght@500&family=Work+Sans:wght@700&display=swap" rel="stylesheet"><style>${css}</style></head><body>${h}</body></html>`, { waitUntil: 'networkidle' });
    await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: `${out}/${f}`, omitBackground: true });
  }
  await b.close();
  fs.writeFileSync(`${out}/elenco.json`, JSON.stringify(el));
  console.log(F, el.length, 'sovrapposizioni');
})();
