// Chiusura di Reparto 7 per un nuovo episodio: prende la grafica S04A dell'ep. 1 (sfondo, contatti), copre il titolo
// con una fascia pulita dello stesso sfondo e riscrive «PROSSIMO EPISODIO:» + il tema in giallo (adattato alla larghezza).
//   node strumenti/venti/chiusa_r7.mjs <S04A ep1> <uscita.png> "LA REPERIBILITÀ."
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const QUI = path.dirname(fileURLToPath(import.meta.url));
const FD = path.resolve(QUI, '../chicedomani/font');
const [src, o, tema] = process.argv.slice(2); const out = path.resolve(o);
const bg = 'data:image/png;base64,' + fs.readFileSync(src).toString('base64');
const html = `<html><head><meta charset="utf-8"><style>
@font-face{font-family:M;font-weight:900;src:url(file://${FD}/montserrat-latin-900-normal.woff2)}
html,body{margin:0;width:1080px;height:1920px;overflow:hidden}
#b{position:absolute;inset:0;background:url(${bg})}
#p{position:absolute;left:0;top:270px;width:1080px;height:530px;background:url(${bg}) 0 -2465px/1080px 5990px no-repeat;filter:blur(6px);-webkit-mask-image:linear-gradient(180deg,transparent 0,#000 50px,#000 480px,transparent 530px)}
.t{position:absolute;left:72px;font:900 135px/1 M;color:#fff;text-shadow:0 8px 18px rgba(0,0,0,.45);letter-spacing:-1px;white-space:nowrap}
#h{position:absolute;left:45px;top:612px;background:#ffd23f;padding:0 30px 0 27px;transform:rotate(.6deg);white-space:nowrap}
#h span{display:inline-block;font:900 135px/132px M;color:#0d1530;letter-spacing:-1px;text-shadow:0 6px 14px rgba(0,0,0,.35)}
</style></head><body><div id="b"></div><div id="p"></div>
<div class="t" style="top:330px">PROSSIMO</div><div class="t" style="top:470px">EPISODIO:</div>
<div id="h"><span>${tema}</span></div></body></html>`;
const f = path.join(path.dirname(out), '_c.html'); fs.writeFileSync(f, html);
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--allow-file-access-from-files'] });
const pg = await b.newPage({ viewport: { width: 1080, height: 1920 } });
await pg.goto('file://' + f); await pg.evaluate(() => document.fonts.ready);
await pg.evaluate(() => { const h = document.getElementById('h'), s = h.firstChild; let px = 135;
  while (h.getBoundingClientRect().right > 1040 && px > 60) { px -= 2; s.style.fontSize = px + 'px'; s.style.lineHeight = (px * 0.98) + 'px'; } });
await pg.screenshot({ path: out }); fs.unlinkSync(f); await b.close(); console.log('chiusura', out);
