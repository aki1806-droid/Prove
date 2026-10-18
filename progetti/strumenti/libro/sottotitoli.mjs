// Rende ogni blocco di sottotitoli.srt in un PNG trasparente 1080x260 (EB Garamond corsivo, ombra morbida).
//   node sottotitoli.mjs <progetto>   -> <progetto>/montaggio/sub/NNN.png e sub.json
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const QUI = path.dirname(fileURLToPath(import.meta.url));
const P = path.resolve(process.argv[2]);
const srt = fs.readFileSync(path.join(P, 'sottotitoli.srt'), 'utf8').trim().split(/\n\s*\n/);
const ts = s => { const [h, m, r] = s.split(':'); const [sec, ms] = r.split(','); return +h * 3600 + +m * 60 + +sec + +ms / 1000; };
const grezzi = srt.map(b => { const l = b.split('\n'); const [a, z] = l[1].split(' --> '); return { n: +l[0], a: ts(a), b: ts(z), testo: l.slice(2).join(' ') }; });
// i blocchi del pacchetto sono frammenti di 2-3 parole: si uniscono in frasi fino a ~38 caratteri
const blocchi = [];
for (const x of grezzi) {
  const u = blocchi[blocchi.length - 1];
  if (u && (u.testo + ' ' + x.testo).length <= 38 && x.a - u.b < 0.45 && !/[.?!]$/.test(u.testo)) { u.testo += ' ' + x.testo; u.b = x.b; }
  else blocchi.push({ ...x });
}
blocchi.forEach((x, i) => { x.n = i + 1; x.parti = grezzi.filter(g => g.a >= x.a - 1e-3 && g.b <= x.b + 1e-3).map(g => g.n); });
const out = path.join(P, 'montaggio', 'sub'); fs.mkdirSync(out, { recursive: true });
const font = 'font/eb-garamond-latin-400-italic.woff2';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--allow-file-access-from-files'] });
const pg = await b.newPage({ viewport: { width: 1080, height: 260 } });
const html = path.join(QUI, '_sub.html');
fs.writeFileSync(html, `<html><head><style>@font-face{font-family:G;src:url(${font})}html,body{margin:0;background:transparent}
#t{position:absolute;left:36px;right:36px;top:0;height:260px;display:flex;align-items:center;justify-content:center;text-align:center;
font:italic 72px/1.12 G;color:#fff;text-shadow:0 2px 6px rgba(0,0,0,.95),0 0 18px rgba(0,0,0,.8),0 0 40px rgba(0,0,0,.5)}</style></head><body><div id="t"></div></body></html>`);
await pg.goto('file://' + html);
await pg.evaluate(() => document.fonts.load('italic 64px G'));
for (const x of blocchi) {
  await pg.evaluate(t => { document.getElementById('t').textContent = t; }, x.testo);
  await pg.screenshot({ path: path.join(out, String(x.n).padStart(3, '0') + '.png'), omitBackground: true });
}
fs.writeFileSync(path.join(out, 'sub.json'), JSON.stringify(blocchi, null, 1));
console.log(blocchi.length, 'sottotitoli');
await b.close();
