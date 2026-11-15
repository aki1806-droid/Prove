// Grafica dei book trailer di «Eredità Invisibili» (pacchetto Eredita_Invisibili_BOOK_TRAILER): frasi a schermo e chiusura.
// Legge <cartella>/testi/spec.json scritto da trailer.py e produce:
//   testi/<nome>.png   frasi (EB Garamond, palette della copertina, zona sicura 250 px sopra e 420 sotto, velatura 35%)
//   testi/<nome>_NNN.png  sequenze animate (la linea che barra «la verità è maleducata»)
//   testi/copertina.mp4  copertina su fondo blu notte, zoom 100→106%, titolo, autore e le due righe d'invito
//   copertina_reel.jpg  immagine fissa del reel (fondo blu notte, titolo del trailer in corsivo)
//   node strumenti/eredita/trailer.mjs <cartella>
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const QUI = path.dirname(fileURLToPath(import.meta.url)), F = `${QUI}/font`;
const D = path.resolve(process.argv[2]), OUT = `${D}/testi`; fs.mkdirSync(OUT, { recursive: true });
const S = JSON.parse(fs.readFileSync(`${OUT}/spec.json`));
const FONT = `@font-face{font-family:G;font-style:italic;font-weight:400;src:url(file://${F}/ebgaramond-latin-400-italic.woff2)}
@font-face{font-family:G;font-style:normal;font-weight:500;src:url(file://${F}/ebgaramond-latin-500-normal.woff2)}`;
const CSS = `${FONT}
html,body{margin:0;width:1080px;height:1920px;overflow:hidden;background:transparent}
.q{position:absolute;left:90px;right:90px;text-align:center}
.q span{display:inline;font:italic 400 76px/1.3 G;color:#EEF2F4;background:rgba(9,21,33,.35);padding:6px 22px;border-radius:10px;
  box-decoration-break:clone;-webkit-box-decoration-break:clone;box-shadow:0 0 40px 20px rgba(9,21,33,.35);text-shadow:0 2px 14px rgba(0,0,0,.6)}
.n span{background:none;box-shadow:none}
.r span{font-style:normal;font-weight:500;letter-spacing:1px}`;
const html = t => {
  const st = `top:${t.top ?? 880}px`, sz = t.size ? `style="font-size:${t.size}px"` : '';
  return `<div class="q ${t.cls || ''}" style="${st}"><span ${sz}>${t.testo}</span></div>` +
    (t.barra != null ? `<div style="position:absolute;left:${t.barra[0]}px;top:${t.barra[1]}px;height:4px;width:${t.barra[2]}px;background:#EEF2F4;box-shadow:0 0 8px rgba(0,0,0,.6)"></div>` : '');
};
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--allow-file-access-from-files'] });
const pg = await b.newPage({ viewport: { width: 1080, height: 1920 } });
const scatta = async (corpo, out, trasp = true, css = CSS) => {
  const h = path.join(OUT, '_p.html'); fs.writeFileSync(h, `<html><head><meta charset="utf-8"><style>${css}</style></head><body>${corpo}</body></html>`);
  await pg.goto('file://' + h); await pg.evaluate(() => document.fonts.ready); await pg.waitForTimeout(60);
  await pg.screenshot({ path: out, omitBackground: trasp, type: out.endsWith('.jpg') ? 'jpeg' : 'png', quality: out.endsWith('.jpg') ? 92 : undefined }); fs.unlinkSync(h);
};
for (const t of S.testi) {
  if (t.barra_anim) {        // la linea che si allunga: misura la riga e disegna 45 fotogrammi
    const h = path.join(OUT, '_p.html'); fs.writeFileSync(h, `<html><head><meta charset="utf-8"><style>${CSS}</style></head><body>${html(t)}</body></html>`);
    await pg.goto('file://' + h); await pg.evaluate(() => document.fonts.ready);
    const r = await pg.evaluate(() => { const b = document.querySelector('.q span').getBoundingClientRect(); return [b.left, b.top + b.height * 0.55, b.width]; });
    fs.unlinkSync(h);
    for (let k = 0; k <= 45; k++) await scatta(html({ ...t, barra: [r[0], r[1], r[2] * k / 45] }), `${OUT}/${t.nome}_${String(k).padStart(3, '0')}.png`);
  } else await scatta(html(t), `${OUT}/${t.nome}.png`);
}
// immagine fissa del reel
await scatta(`<div style="position:absolute;inset:0;background:#091521"></div><div class="q n" style="top:820px"><span style="font-size:130px">${S.titolo_reel}</span></div>
  <div class="q r" style="top:1060px"><span style="font-size:40px;letter-spacing:8px;font-variant:small-caps;color:#98A2A5">Eredità Invisibili</span></div>`, `${D}/copertina_reel.jpg`, false);
// copertina in movimento
const C = S.copertina, N = Math.round(C.durata * 30);
const cop = 'data:image/png;base64,' + fs.readFileSync(`${D}/img/copertina_fronte.png`).toString('base64');
const H = `<html><head><meta charset="utf-8"><style>${FONT}
html,body{margin:0;width:1080px;height:1920px;overflow:hidden;background:#091521}
#c{position:absolute;left:258px;top:290px;width:564px;height:800px;background:url(${cop}) center/cover;box-shadow:0 30px 80px rgba(0,0,0,.65),0 0 0 1px rgba(152,162,165,.25);transform-origin:50% 50%}
.t{position:absolute;left:90px;right:90px;text-align:center;color:#EEF2F4;opacity:0}
.sc{font:500 60px G;letter-spacing:9px;font-variant:small-caps}
.ag{font:italic 400 38px/1.35 G;color:#98A2A5}
</style></head><body><div id="c"></div>
<div class="t sc" id="t1" style="top:1150px">Eredità Invisibili</div>
<div class="t sc" id="t2" style="top:1235px;font-size:38px;letter-spacing:7px;color:#98A2A5">Achille Pagliaro</div>
<div class="t ag" id="t3" style="top:1310px">Su Amazon, La Feltrinelli e in libreria.<br>Link in descrizione.</div>
<div class="t ag" id="t4" style="top:1430px;color:#EEF2F4">Lascia una recensione.</div>
<script>window.f=(t,C)=>{const cl=x=>Math.max(0,Math.min(1,x)),e=p=>1-Math.pow(1-p,3),$=id=>document.getElementById(id);
 const p=e(cl(t/1.4)),c=$('c');c.style.opacity=p;c.style.transform='translateY('+(200*(1-p))+'px) scale('+(1+0.06*t/C.durata)+')';
 const s=(id,t0)=>$(id).style.opacity=cl((t-t0)/0.7);s('t1',C.titolo);s('t2',C.titolo+0.5);s('t3',C.amazon);s('t4',C.recensione);}</script></body></html>`;
const h = path.join(OUT, '_c.html'); fs.writeFileSync(h, H); await pg.goto('file://' + h); await pg.evaluate(() => document.fonts.ready); fs.unlinkSync(h);
const ff = spawn('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', '-f', 'image2pipe', '-framerate', '30', '-c:v', 'png', '-i', '-',
  '-c:v', 'libx264', '-preset', 'medium', '-crf', '15', '-pix_fmt', 'yuv420p', `${OUT}/copertina.mp4`], { stdio: ['pipe', 'inherit', 'inherit'] });
for (let i = 0; i < N; i++) { await pg.evaluate(([t, c]) => window.f(t, c), [i / 30, C]);
  const buf = await pg.screenshot({ type: 'png' }); if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r)); }
ff.stdin.end(); await new Promise(r => ff.on('close', r));
await b.close(); console.log('grafica', S.testi.length, 'frasi, copertina', N, 'fotogrammi');
