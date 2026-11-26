const r = require('module').createRequire('/opt/node-tools/node_modules/');
const { chromium } = r('playwright');
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1200, height: 760 } });
  await p.goto('file://' + __dirname + '/hero.html'); await p.waitForTimeout(400);
  await p.screenshot({ path: __dirname + '/hero.png' }); await b.close(); })();
