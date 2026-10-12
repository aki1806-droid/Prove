// Stampa una pagina HTML in PDF A4. uso: NODE_PATH=$(npm root -g) node pdf.js pagina.html uscita.pdf
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const p = await b.newPage();
  await p.goto('file://' + require('path').resolve(process.argv[2]), { waitUntil: 'load' });
  await p.evaluate(() => document.fonts.ready);
  await p.pdf({ path: process.argv[3], format: 'A4', printBackground: true, preferCSSPageSize: true,
    displayHeaderFooter: true, headerTemplate: '<span></span>',
    footerTemplate: '<div style="font-family:Inter,sans-serif;font-size:7pt;color:#6b706e;width:100%;padding:0 18mm;display:flex;justify-content:space-between"><span>L’IA per chi fa sindacato · CISL FP Padova Rovigo</span><span class="pageNumber"></span></div>' });
  await b.close();
})();
