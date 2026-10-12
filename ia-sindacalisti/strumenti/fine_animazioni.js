// Stampa, per ogni pagina, l'istante (ms) in cui finisce l'ultima animazione CSS.
// uso: NODE_PATH=$(npm root -g) node fine_animazioni.js pagina1.html [pagina2.html ...]
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
  const out = {};
  for (const f of process.argv.slice(2)) {
    await p.goto('file://' + require('path').resolve(f));
    await p.evaluate(() => document.fonts.ready);
    out[require('path').basename(f)] = await p.evaluate(() => Math.max(0, ...document.getAnimations().map(a => a.effect.getComputedTiming().endTime)));
  }
  console.log(JSON.stringify(out));
  await b.close();
})();
