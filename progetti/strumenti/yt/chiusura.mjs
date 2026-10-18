// Chiusura da 10 s dei video YouTube dell'autore (il pacchetto non la porta): stessa foto e stesso stile della
// copertina (EB Garamond, filetto oro, firma in corsivo), con i due libri e il rinvio alla descrizione.
//   node chiusura.mjs <progetto> ...   -> <progetto>/grafiche/chiusura_1920x1080.png
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const QUI = path.dirname(fileURLToPath(import.meta.url));
const F = path.join(QUI, '..', 'libro', 'font');
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--allow-file-access-from-files'] });
const pg = await b.newPage({ viewport: { width: 1920, height: 1080 } });
for (const p of process.argv.slice(2)) {
  const P = path.resolve(p);
  fs.mkdirSync(path.join(P, 'grafiche'), { recursive: true });
  const html = path.join(P, 'grafiche', '_chiusura.html');
  fs.writeFileSync(html, `<html><head><style>
@font-face{font-family:G;src:url(file://${F}/eb-garamond-latin-400-normal.woff2)}
@font-face{font-family:G;font-style:italic;src:url(file://${F}/eb-garamond-latin-400-italic.woff2)}
html,body{margin:0;width:1920px;height:1080px;overflow:hidden;background:#0b1220}
#f{position:absolute;inset:0;background:url(file://${P}/b-roll_16x9/broll_01.jpg) center/cover}
#v{position:absolute;inset:0;background:linear-gradient(90deg,rgba(8,14,28,.86),rgba(8,14,28,.62) 60%,rgba(8,14,28,.5))}
#t{position:absolute;left:135px;top:300px;color:#f6efe3;font-family:G}
h1{font-weight:400;font-size:92px;line-height:1.08;margin:0}
.r{width:210px;height:5px;background:#c9a24b;margin:42px 0 36px}
.d{font-style:italic;font-size:54px;color:#d9b45f}
.a{font-style:italic;font-size:44px;color:#c9a24b;margin-top:26px}
</style></head><body><div id="f"></div><div id="v"></div><div id="t">
<h1>Il Volo delle Radici<br>Mappe Silenziose</h1><div class="r"></div>
<div class="d">I link sono nella descrizione</div><div class="a">Achille Pagliaro</div></div></body></html>`);
  await pg.goto('file://' + html);
  await pg.evaluate(() => document.fonts.ready);
  await pg.waitForTimeout(300);
  await pg.screenshot({ path: path.join(P, 'grafiche', 'chiusura_1920x1080.png') });
  fs.unlinkSync(html);
  console.log('chiusura', p);
}
await b.close();
