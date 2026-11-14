// Grafica del video di lancio di «Eredità Invisibili» (brief del pacchetto): frasi a schermo in EB Garamond corsivo, centrate,
// margini 90 px, zona sicura 250 px in alto e 420 in basso, velatura scura al 35% sotto ogni frase; palette della copertina
// (#091521, #1A2836, argento #98A2A5, testo #EEF2F4). Le frasi sono identiche al copione e a citazioni.md.
// Scene 10-11: copertina su #091521 che entra dal basso con zoom 100→106%, ombra morbida; titolo, autore, editore; negli
// ultimi due secondi il cartello «Su Amazon, La Feltrinelli e in libreria» (argento, piccolo). Nessun indirizzo web.
//   node strumenti/eredita/lancio.mjs   -> ei-v01-lancio/testi/*.png e testi/copertina.mp4 (30 fps)
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const QUI = path.dirname(fileURLToPath(import.meta.url));
const D = path.resolve(QUI, '../../ei-v01-lancio'), OUT = `${D}/testi`; fs.mkdirSync(OUT, { recursive: true });
const F = `${QUI}/font`;
const tempi = Object.fromEntries(JSON.parse(fs.readFileSync(`${D}/audio/tempi.json`)).map(t => [t.id, t.durata]));
const CSS = `@font-face{font-family:G;font-style:italic;font-weight:400;src:url(file://${F}/ebgaramond-latin-400-italic.woff2)}
@font-face{font-family:G;font-style:normal;font-weight:500;src:url(file://${F}/ebgaramond-latin-500-normal.woff2)}
html,body{margin:0;width:1080px;height:1920px;overflow:hidden;background:transparent}
.q{position:absolute;left:90px;right:90px;text-align:center}
.q span{display:inline;font:italic 400 76px/1.3 G;color:#EEF2F4;background:rgba(9,21,33,.35);padding:6px 22px;border-radius:10px;
  box-decoration-break:clone;-webkit-box-decoration-break:clone;box-shadow:0 0 40px 20px rgba(9,21,33,.35);text-shadow:0 2px 14px rgba(0,0,0,.6)}
.big span{font-size:88px}`;
const q = (top, t, cls = '') => `<div class="q ${cls}" style="top:${top}px"><span>${t}</span></div>`;
const P = {
  q1a: q(800, 'Papà, non devi fare finta.'), q1b: q(920, 'Devi fare per davvero.'),
  q4: `<div style="position:absolute;left:90px;right:90px;top:0;bottom:0;display:flex;align-items:center;justify-content:center;text-align:center">
       <span style="font:italic 400 92px/1.3 G;color:#EEF2F4">Mentre credevo di crescerli, mi stavano ricrescendo.</span></div>`,
  q5a: q(760, 'ciò che siamo stati'), q5b: q(880, 'ciò che abbiamo dimenticato'), q5c: q(1000, 'ciò che è ancora possibile'),
  q6: q(880, 'Domani ne facciamo uno più bello.'), q7: q(880, 'Ti voglio bene, papà.'), q8: q(880, 'Dobbiamo disimparare la finzione.'),
};
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--allow-file-access-from-files'] });
const pg = await b.newPage({ viewport: { width: 1080, height: 1920 } });
for (const [nome, corpo] of Object.entries(P)) {
  const h = path.join(OUT, '_p.html'); fs.writeFileSync(h, `<html><head><meta charset="utf-8"><style>${CSS}</style></head><body>${corpo}</body></html>`);
  await pg.goto('file://' + h); await pg.evaluate(() => document.fonts.ready); await pg.waitForTimeout(80);
  await pg.screenshot({ path: path.join(OUT, nome + '.png'), omitBackground: true }); fs.unlinkSync(h);
}
// copertina e chiusura: S10 titolo, S11 lancio del 20 novembre, S12 recensione onesta, S13 citazione finale (p. 64)
const par = JSON.parse(fs.readFileSync(`${D}/audio/parole.json`));
const W = (sid, w) => par[sid].find(x => x.w.replace(/[.,:;]/g, '').toLowerCase() === w.toLowerCase()).a;
const T11 = tempi.S10, T12 = T11 + tempi.S11, T13 = T12 + tempi.S12, DUR = T13 + tempi.S13, N = Math.round(DUR * 30);
const EV = { T11, T12, T13, DUR, amazon: T11 + W('S11', 'Amazon'), rec: T12 + W('S12', 'recensione'), ci: T13 + W('S13', 'Ci') };
const cop = 'data:image/png;base64,' + fs.readFileSync(`${D}/img/copertina_fronte.png`).toString('base64');
const H = `<html><head><meta charset="utf-8"><style>@font-face{font-family:G;font-style:normal;font-weight:500;src:url(file://${F}/ebgaramond-latin-500-normal.woff2)}
@font-face{font-family:G;font-style:italic;font-weight:400;src:url(file://${F}/ebgaramond-latin-400-italic.woff2)}
html,body{margin:0;width:1080px;height:1920px;overflow:hidden;background:#091521}
#c{position:absolute;left:258px;top:290px;width:564px;height:800px;background:url(${cop}) center/cover;box-shadow:0 30px 80px rgba(0,0,0,.65),0 0 0 1px rgba(152,162,165,.25);transform-origin:50% 50%}
.t{position:absolute;left:90px;right:90px;text-align:center;color:#EEF2F4;opacity:0}
.sc{font:500 62px G;letter-spacing:9px;font-variant:small-caps}
.ag{font:italic 400 40px G;color:#98A2A5}
#stelle{top:1260px;font:400 76px G;letter-spacing:14px}
#stelle span{color:#1A2836;transition:none}
.qq{font:italic 400 84px/1.25 G}
</style></head><body><div id="c"></div>
<div class="t sc" id="a1" style="top:1150px">Dal 20 novembre</div>
<div class="t ag" id="a2" style="top:1245px">Amazon · La Feltrinelli · Unilibro · in libreria</div>
<div class="t ag" id="r1" style="top:1150px;font-size:58px;color:#EEF2F4">Lascia una recensione onesta</div>
<div class="t" id="stelle"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
<div class="t qq" id="q1" style="top:620px">I bambini non ci mostrano<br>dove dobbiamo andare.</div>
<div class="t qq" id="q2" style="top:880px">Ci mostrano<br>da dove siamo venuti.</div>
<div class="t sc" id="f1" style="top:1190px;font-size:54px;color:#EEF2F4">Eredità Invisibili</div>
<div class="t sc" id="f2" style="top:1270px;font-size:36px;letter-spacing:6px;color:#98A2A5">Achille Pagliaro · Edizioni Il Saggio</div>
<div class="t ag" id="f3" style="top:1335px;font-size:32px">dal 20 novembre su Amazon, La Feltrinelli e in libreria</div>
<script>window.f=(t,E)=>{const cl=x=>Math.max(0,Math.min(1,x)),e=p=>1-Math.pow(1-p,3),$=id=>document.getElementById(id);
 const inn=(t0,d=0.8)=>cl((t-t0)/d), out=(t0,d=0.6)=>1-cl((t-t0)/d);
 const p=e(cl(t/1.6)),c=$('c');c.style.opacity=p*out(E.T13-0.1,0.8);
 c.style.transform='translateY('+(260*(1-p))+'px) scale('+(1+0.06*Math.min(t,E.T13)/E.T13)+')';
 $('a1').style.opacity=inn(E.T11+0.1)*out(E.T12-0.3);$('a2').style.opacity=inn(E.amazon-0.1)*out(E.T12-0.3);
 $('r1').style.opacity=inn(E.T12+0.1)*out(E.T13-0.3);$('stelle').style.opacity=inn(E.T12+0.1)*out(E.T13-0.3);
 [...$('stelle').children].forEach((s,k)=>{s.style.color=t>=E.rec+0.25*k?'#EEF2F4':'#1A2836';s.style.textShadow=t>=E.rec+0.25*k?'0 0 24px rgba(238,242,244,.55)':'none'});
 $('q1').style.opacity=inn(E.T13+0.25,1.0);$('q2').style.opacity=inn(E.ci-0.05,1.0);
 $('f1').style.opacity=inn(E.DUR-2.6,0.8);$('f2').style.opacity=inn(E.DUR-2.3,0.8);$('f3').style.opacity=inn(E.DUR-2.0,0.8);}</script></body></html>`;
const h = path.join(OUT, '_c.html'); fs.writeFileSync(h, H); await pg.goto('file://' + h); await pg.evaluate(() => document.fonts.ready); fs.unlinkSync(h);
const ff = spawn('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', '-f', 'image2pipe', '-framerate', '30', '-c:v', 'png', '-i', '-',
  '-c:v', 'libx264', '-preset', 'medium', '-crf', '15', '-pix_fmt', 'yuv420p', `${OUT}/copertina.mp4`], { stdio: ['pipe', 'inherit', 'inherit'] });
for (let i = 0; i < N; i++) { await pg.evaluate(([t, e]) => window.f(t, e), [i / 30, EV]);
  const buf = await pg.screenshot({ type: 'png' }); if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r)); }
ff.stdin.end(); await new Promise(r => ff.on('close', r));
await b.close(); console.log('testi e copertina', N, 'fotogrammi');
