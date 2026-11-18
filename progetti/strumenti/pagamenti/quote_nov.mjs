// Scena S02Q del reel «Aggiornamento pagamenti novembre 2026»: le quote medie della premialità 2025 (slide aziendale mandata
// da Achille il 18/11) sul tabellone scuro delle scene 2-3. Le sei righe entrano una dopo l'altra, la prima (ex A) si accende
// su «milleduecento», l'ultima (ex Ds) su «duemiladuecento», la nota sui criteri del conguaglio entra su «tutte».
//   node strumenti/pagamenti/quote_nov.mjs [prova 1,5,12]   -> montaggio/G_S02Q.mp4 (durata da audio/tempi-scene.json)
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const QUI = path.dirname(fileURLToPath(import.meta.url));
const D = path.resolve(QUI, '../../pdro-aggiornamento-pagamenti-novembre-2026');
const FD = path.resolve(QUI, '../chicedomani/font');
const durata = JSON.parse(fs.readFileSync(`${D}/audio/tempi-scene.json`, 'utf8')).find(t => t.id === 'S02Q').durata;
// tempi stimati sul parlato (13,5 s): «milleduecento» ~4,6 s, «duemiladuecento» ~9,0 s, «tutte» ~10,6 s
const T1 = 4.6, T6 = 9.0, TN = 10.6;
const R = [['ASU', 'A', '615,84', '576,00', '1.191,84'], ['ASU', 'B', '715,56', '675,00', '1.390,56'],
  ['ADO', 'Bs', '760,92', '710,00', '1.470,92'], ['ADA', 'C', '905,88', '840,00', '1.745,88'],
  ['APSF', 'D', '1.032,60', '965,00', '1.997,60'], ['APSF', 'Ds', '1.150,32', '1.069,00', '2.219,32']];
const HTML = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:M;font-weight:800;src:url(file://${FD}/montserrat-latin-800-normal.woff2)}
@font-face{font-family:M;font-weight:900;src:url(file://${FD}/montserrat-latin-900-normal.woff2)}
html,body{margin:0;width:1080px;height:1920px;overflow:hidden;background:rgb(14,16,20)}
.hd{position:absolute;left:0;top:242px;width:1080px;height:100px;background:rgb(24,26,32)}
.hd b{position:absolute;left:72px;top:24px;font:bold 50px 'Liberation Mono';color:rgb(255,206,64)}
.hd i{position:absolute;right:70px;top:36px;font:normal 30px 'Liberation Mono';color:rgb(150,152,160);font-style:normal}
.k{position:absolute;left:72px;top:380px;font:800 30px M;letter-spacing:3px;color:rgb(150,152,160)}
.r{position:absolute;left:52px;width:978px;height:166px;border-radius:22px;box-sizing:border-box;background:rgb(28,30,38);
  border:3px solid rgb(40,42,52)}
.r .a{position:absolute;left:36px;top:30px;font:900 54px M;color:rgb(246,246,246)}
.r .c{position:absolute;left:38px;top:100px;font:normal 28px 'Liberation Mono';color:rgb(150,152,160)}
.r .t{position:absolute;right:36px;top:22px;font:900 66px M;color:rgb(255,206,64);letter-spacing:-1px}
.r .d{position:absolute;right:38px;top:104px;font:800 25px M;color:rgb(170,172,180)}
.n{position:absolute;left:52px;width:978px;top:1640px;border-radius:20px;background:rgb(24,26,32);padding:24px 34px;box-sizing:border-box;
  font:800 26px/38px M;color:rgb(200,202,208)}
.n b{color:rgb(255,206,64)}
</style></head><body>
<div class="hd"><b>QUOTE MEDIE 2025</b><i>PREMIALITÀ</i></div>
<div class="k">MEDIA ANNUA PER AREA · EX CATEGORIA</div>
${R.map((r, i) => `<div class="r" id="r${i}" style="top:${440 + i * 192}px"><div class="a">${r[0]}</div><div class="c">ex cat. ${r[1]}</div>
<div class="t">€ ${r[4]}</div><div class="d">acconto ${r[2]} + conguaglio ${r[3]}</div></div>`).join('')}
<div class="n" id="n"><b>Sono medie.</b> Il conguaglio di ognuno dipende da obiettivi di U.O., valutazione individuale, categoria, presenza e tempo pieno o parziale.</div>
</body></html>`;
const html = path.join(D, 'grafica', '_quote.html'); fs.writeFileSync(html, HTML);
const ease = x => 1 - Math.pow(1 - Math.min(1, Math.max(0, x)), 3);
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--allow-file-access-from-files'] });
const pg = await b.newPage({ viewport: { width: 1080, height: 1920 } });
await pg.goto('file://' + html); await pg.evaluate(() => document.fonts.ready);
async function foto(t) {
  await pg.evaluate(([t, T1, T6, TN]) => {
    const ease = x => 1 - Math.pow(1 - Math.min(1, Math.max(0, x)), 3);
    for (let i = 0; i < 6; i++) {
      const e = document.getElementById('r' + i), p = ease((t - 0.25 - i * 0.28) / 0.45);
      e.style.opacity = p; e.style.transform = `translateX(${(1 - p) * 140}px)`;
      const on = i === 0 ? t >= T1 : i === 5 ? t >= T6 : false;
      const g = i === 0 ? ease((t - T1) / 0.3) : i === 5 ? ease((t - T6) / 0.3) : 0;
      e.style.borderColor = on ? `rgba(255,206,64,${0.4 + 0.6 * g})` : 'rgb(40,42,52)';
      e.style.boxShadow = on ? `0 0 ${40 * g}px rgba(255,206,64,${0.35 * g})` : 'none';
      e.style.transform += on ? ` scale(${1 + 0.025 * Math.sin(Math.min(1, (t - (i === 0 ? T1 : T6)) / 0.5) * Math.PI)})` : '';
    }
    const n = document.getElementById('n'), q = ease((t - TN) / 0.5);
    n.style.opacity = q; n.style.transform = `translateY(${(1 - q) * 40}px)`;
  }, [t, T1, T6, TN]);
  return pg.screenshot({ type: 'png' });
}
const arg = process.argv.slice(2);
if (arg[0] === 'prova') {
  for (const t of arg[1].split(',').map(Number)) fs.writeFileSync(`${process.env.OUT || '.'}/quote_${t}.png`, await foto(t));
} else {
  const n = Math.round(durata * 25), out = `${D}/montaggio/G_S02Q.mp4`; fs.mkdirSync(path.dirname(out), { recursive: true });
  const ff = spawn('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', '-f', 'image2pipe', '-framerate', '25', '-i', '-',
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '16', '-pix_fmt', 'yuv420p', out]);
  for (let i = 0; i < n; i++) { const buf = await foto(i / 25); if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r)); }
  ff.stdin.end(); await new Promise(r => ff.on('close', r)); console.log('G_S02Q', n, 'fotogrammi');
}
await b.close(); fs.unlinkSync(html);
