// Sottotitoli ed etichetta di «Un nodo al dito» come PNG trasparenti, e l'elenco delle sovrapposizioni con i tempi.
//   node testi.js <cartella progetto> 16x9|9x16
const { chromium } = require('playwright');
const fs = require('fs');
const [D, F] = process.argv.slice(2);
const [W, H] = F === '16x9' ? [1920, 1080] : [1080, 1920];
const out = `${D}/testi/${F}`; fs.mkdirSync(out, { recursive: true });
const srt = fs.readFileSync(`${D}/sottotitoli.srt`, 'utf8').trim().split(/\n\s*\n/).map(b => b.split('\n').slice(2).join(' '));
const vt = JSON.parse(fs.readFileSync(`${D}/audio/tempi_voce.json`, 'utf8'));
const sub = F === '16x9'
  ? 'left:200px;right:200px;bottom:70px;font-size:44px'
  : 'left:90px;right:90px;bottom:330px;font-size:50px';
const css = `html,body{margin:0;width:${W}px;height:${H}px;background:transparent}
.s{position:absolute;${sub};text-align:center;}
.s span{display:inline-block;background:rgba(28,15,31,.62);border-radius:16px;padding:10px 26px;box-shadow:0 0 30px rgba(28,15,31,.5);font-family:'Lora',serif;font-weight:500;line-height:1.32;color:#F4EDE2;
  text-shadow:0 2px 6px rgba(0,0,0,.85),0 0 26px rgba(20,10,22,.85)}
.l{position:absolute;left:0;${F === '16x9' ? 'width:620px;top:470px' : 'right:0;top:330px'};text-align:center;font-family:'Work Sans';font-weight:700;
  font-size:${F === '16x9' ? 30 : 34}px;letter-spacing:12px;color:#F4EDE2;text-shadow:0 2px 14px rgba(0,0,0,.7)}
.l i{display:block;width:120px;height:3px;background:#B21E2C;margin:18px auto 0;border-radius:2px}`;
const pagine = [['etichetta.png', '<div class="l">25 NOVEMBRE<i></i></div>']];
srt.forEach((t, i) => pagine.push([`sub_${String(i + 1).padStart(2, '0')}.png`, `<div class="s"><span>${t}</span></div>`]));
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: W, height: H } });
  for (const [f, h] of pagine) {
    await p.setContent(`<html><head><link href="https://fonts.googleapis.com/css2?family=Lora:wght@500&family=Work+Sans:wght@700&display=swap" rel="stylesheet"><style>${css}</style></head><body>${h}</body></html>`, { waitUntil: 'networkidle' });
    await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: `${out}/${f}`, omitBackground: true });
  }
  await b.close();
  const el = [['etichetta.png', 0.6, 6.6], [`cards/02_non_solo_ieri_${F}.png`, 21, 25.9], [`cards/04_ascoltala_${F}.png`, 54, 58.9]];
  vt.forEach(([, a, d], i) => el.push([`sub_${String(i + 1).padStart(2, '0')}.png`, +(a - 0.1).toFixed(2), +(a + d + 0.5).toFixed(2)]));
  fs.writeFileSync(`${out}/elenco.json`, JSON.stringify(el));
  console.log(F, el.length, 'sovrapposizioni');
})();
