const { createRequire } = require('module');
const r = createRequire('/opt/node-tools/node_modules/');
const { chromium } = r('playwright');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 794, height: 1123 }, deviceScaleFactor: 2.5 });
  await p.goto('file://' + __dirname + '/volantino.html'); await p.waitForTimeout(500);
  await p.pdf({ path: __dirname + '/volantino-assemblea-7-dicembre.pdf', width: '210mm', height: '297mm', printBackground: true });
  await p.screenshot({ path: __dirname + '/volantino-assemblea-7-dicembre.png', fullPage: false });
  await b.close(); console.log('ok');
})();
