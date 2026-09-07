/*
 * Slide di marca per i video de "La Parola Giusta".
 *
 *   node cards.mjs cards.json ./out
 *
 * Ogni voce del JSON e' { file, layout, kicker?, text?, rows?, num?, label?, note? }.
 * layout: statement (default) | quote | num | list
 * Il marchio LPG sta in alto a sinistra su ogni slide, sempre alla stessa coordinata.
 * Serve logo_lpg_negativo.png accanto allo script (vedi logo_negativo.py).
 */
import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const NAVY = '#032B54', IVORY = '#F6F3EA', GOLD = '#C39951';

const [, , cardsPath = 'cards.json', outDir = '.'] = process.argv;
const cards = JSON.parse(fs.readFileSync(cardsPath, 'utf8'));
const here = path.dirname(new URL(import.meta.url).pathname);
const logo = 'data:image/png;base64,' +
  fs.readFileSync(path.join(here, 'logo_lpg_negativo.png')).toString('base64');
// Chromium qui non raggiunge fonts.googleapis.com e non lo segnala: senza
// questi woff2 incorporati le slide escono coi caratteri di sistema.
// Rigenerabili con fonts_embed.py.
const FONTS = fs.readFileSync(path.join(here, 'fonts_canale.css'), 'utf8');

const css = `
  * { margin:0; padding:0; box-sizing:border-box; }
  body { width:1920px; height:1080px; background:${NAVY}; color:${IVORY};
         font-family:'Playfair Display',serif; position:relative; overflow:hidden; }
  body::after { content:''; position:absolute; inset:0; opacity:.05; pointer-events:none;
    background:radial-gradient(circle at 78% 22%, ${GOLD} 0%, transparent 45%); }

  .brand { position:absolute; top:54px; left:88px; z-index:3; }
  .brand img { height:104px; width:auto; display:block; }

  .stage { position:absolute; inset:0; display:flex; flex-direction:column;
           justify-content:center; padding:0 200px; z-index:2; }
  .kicker { font-family:'Inter',sans-serif; font-weight:600; font-size:24px;
            letter-spacing:.34em; text-transform:uppercase; color:${GOLD}; margin-bottom:40px; }
  .gold { color:${GOLD}; }
  h1 { font-weight:700; font-size:104px; line-height:1.18; letter-spacing:-.015em; }
  h1.s2 { font-size:82px; }  /* testo lungo */
  h1.s3 { font-size:66px; }  /* testo molto lungo */
  .q::before { content:'\\00AB'; color:${GOLD}; margin-right:.12em; }
  .q::after  { content:'\\00BB'; color:${GOLD}; margin-left:.08em; }
  .note { font-family:'Inter',sans-serif; font-weight:400; font-size:34px;
          line-height:1.45; color:${IVORY}; opacity:.66; margin-top:46px; }

  /* layout num: numerale grande a sinistra, etichetta a destra */
  .numrow { display:flex; align-items:center; gap:76px; }
  .numeral { font-size:300px; font-weight:700; color:${GOLD}; line-height:.86;
             flex:0 0 auto; letter-spacing:-.04em; }
  .numlabel { font-size:88px; font-weight:700; line-height:1.16; letter-spacing:-.015em; }
  .numlabel.s2 { font-size:70px; }

  /* layout list: righe con trattino oro */
  ul { list-style:none; }
  li { font-size:76px; font-weight:700; line-height:1.28; letter-spacing:-.01em;
       padding-left:88px; position:relative; margin-bottom:26px; }
  li:last-child { margin-bottom:0; }
  li::before { content:''; position:absolute; left:0; top:.56em; width:52px; height:3px;
               background:${GOLD}; }
  ul.s2 li { font-size:62px; margin-bottom:20px; }

  .footrule { position:absolute; left:200px; bottom:96px; width:132px; height:3px;
              background:${GOLD}; opacity:.55; z-index:2; }
`;

// La dimensione del testo scende da sola quando la frase e' lunga: cosi' le slide
// restano leggibili senza doverle tarare una per una.
const sizeClass = (s, [a, b]) => (s.replace(/<[^>]+>/g, '').length > b ? 's3' : s.replace(/<[^>]+>/g, '').length > a ? 's2' : '');

function body(c) {
  const kicker = c.kicker ? `<div class="kicker">${c.kicker}</div>` : '';
  const note = c.note ? `<div class="note">${c.note}</div>` : '';
  switch (c.layout) {
    case 'num':
      return `${kicker}<div class="numrow"><div class="numeral">${c.num}</div>
              <div class="numlabel ${sizeClass(c.label, [26, 999])}">${c.label}</div></div>${note}`;
    case 'list':
      return `${kicker}<ul class="${c.rows.length > 3 ? 's2' : ''}">
              ${c.rows.map((r) => `<li>${r}</li>`).join('')}</ul>${note}`;
    case 'quote':
      return `${kicker}<h1 class="q ${sizeClass(c.text, [46, 92])}">${c.text}</h1>${note}`;
    default:
      return `${kicker}<h1 class="${sizeClass(c.text, [52, 100])}">${c.text}</h1>${note}`;
  }
}

const page = (c) => `<!doctype html><html><head><meta charset="utf-8">
<style>${FONTS}</style>
<style>${css}</style></head><body>
  <div class="brand"><img src="${logo}" alt=""></div>
  <div class="stage">${body(c)}</div>
  <div class="footrule"></div>
</body></html>`;

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
const p = await ctx.newPage();
fs.mkdirSync(outDir, { recursive: true });
const manifest = [];
for (const c of cards) {
  await p.setContent(page(c));
  await p.evaluate(() => document.fonts.ready);
  const file = path.join(outDir, `${c.file}.png`);
  await p.screenshot({ path: file });
  manifest.push({ file, size: fs.statSync(file).size });
  console.log(file, fs.statSync(file).size);
}
fs.writeFileSync(path.join(outDir, 'manifest.json'), JSON.stringify(manifest, null, 2));
await browser.close();
