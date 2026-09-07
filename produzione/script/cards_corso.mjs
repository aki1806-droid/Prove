/*
 * Slide del corso "Dire, ascoltare, convincere" — La Parola Giusta.
 *
 *   node cards_corso.mjs cards.json ./out
 *
 * Palette e caratteri sono quelli degli script del corso, diversi da quelli
 * dei video del canale: qui blu #12294A, avorio #F7F3EA, oro #C39A4E,
 * Cormorant Garamond per le frasi e Jost per etichette ed elenchi.
 *
 * Ogni voce del JSON: { file, layout, theme?, kicker?, title?, rows?, active?, note?, label?, sub? }
 *   layout: cover | closing | statement | quote | list | memo
 *   theme:  ivory (default) | sand | deep
 * `active` accende una sola riga di un elenco e spegne le altre: serve a far
 * salire i punti uno alla volta senza moltiplicare le slide.
 */
import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const IVORY='#F7F3EA', NAVY='#12294A', GOLD='#C39A4E', SAND='#E2D2B0',
      DEEP='#0B1B33', GREY='#69748A', INK_SAND='#1C2B3F';

const here = path.dirname(new URL(import.meta.url).pathname);
const b64 = (f) => 'data:image/png;base64,' + fs.readFileSync(path.join(here, f)).toString('base64');
const MARK = b64('logo_lpg.png');            // monogramma blu e oro, per fondi chiari
const MARK_NEG = b64('logo_lpg_negativo.png'); // monogramma avorio e oro, per fondi scuri
const WORDMARK = b64('logo_lpg_esteso.png');   // logo esteso, solo copertine e chiusure
// Chromium qui non raggiunge fonts.googleapis.com: i woff2 sono incorporati
// come data URI da fonts_embed.py, altrimenti le slide escono coi font di sistema.
const FONTS = fs.readFileSync(path.join(here, 'fonts_corso.css'), 'utf8');

const themes = {
  ivory: { bg: IVORY, fg: NAVY,     mark: MARK },
  sand:  { bg: SAND,  fg: INK_SAND, mark: MARK },
  deep:  { bg: DEEP,  fg: GOLD,     mark: MARK_NEG },
};

const css = (t) => `
  * { margin:0; padding:0; box-sizing:border-box; }
  body { width:1920px; height:1080px; background:${t.bg}; color:${t.fg};
         font-family:'Cormorant Garamond',serif; position:relative; overflow:hidden; }

  .mark { position:absolute; top:56px; left:92px; z-index:3; }
  .mark img { height:92px; width:auto; display:block; }

  .stage { position:absolute; inset:0; display:flex; flex-direction:column;
           justify-content:center; padding:0 210px; z-index:2; }
  .stage.mid { align-items:center; text-align:center; padding:0 260px; }

  .kicker { font-family:'Jost',sans-serif; font-weight:600; font-size:23px;
            letter-spacing:.36em; text-transform:uppercase; color:${GOLD}; margin-bottom:44px; }
  h1 { font-weight:600; font-size:104px; line-height:1.16; letter-spacing:-.005em; }
  h1.s2 { font-size:84px; }
  h1.s3 { font-size:68px; }
  .gold { color:${GOLD}; }
  .q::before { content:'\\00AB'; color:${GOLD}; margin-right:.1em; }
  .q::after  { content:'\\00BB'; color:${GOLD}; margin-left:.06em; }
  .note { font-family:'Jost',sans-serif; font-weight:300; font-size:36px;
          line-height:1.45; margin-top:44px; opacity:.7; }

  /* elenchi: numero in oro, voce in Jost, righe spente al 26% */
  ol { list-style:none; counter-reset:r; }
  li { font-family:'Jost',sans-serif; font-weight:400; font-size:64px; line-height:1.3;
       counter-increment:r; margin-bottom:34px; display:flex; gap:38px; align-items:baseline;
       transition:none; }
  li:last-child { margin-bottom:0; }
  li::before { content:counter(r); font-family:'Cormorant Garamond',serif; font-weight:600;
               font-size:64px; color:${GOLD}; min-width:52px; }
  li.off { opacity:.26; }
  ol.plain li::before { content:'—'; font-size:44px; }

  /* memo: la frase riempie il quadro, nessun altro elemento */
  .memo { font-weight:400; font-style:italic; font-size:112px; line-height:1.28;
          text-align:center; }

  /* copertina e chiusura */
  .word { display:block; margin:0 auto 72px; width:1020px; }
  .word.small { width:760px; margin-bottom:44px; }
  .lesson { font-family:'Jost',sans-serif; font-weight:400; font-size:34px;
            letter-spacing:.22em; text-transform:uppercase; color:${GREY}; margin-bottom:30px; }
  .ctitle { font-weight:400; font-size:100px; line-height:1.14; color:${NAVY}; }
  .csub { font-family:'Jost',sans-serif; font-weight:300; font-size:38px;
          letter-spacing:.06em; color:${GOLD}; margin-top:34px; }
  .site { font-family:'Jost',sans-serif; font-weight:300; font-size:34px;
          letter-spacing:.2em; color:${GREY}; }

  .rule { position:absolute; left:210px; bottom:100px; width:128px; height:2px;
          background:${GOLD}; opacity:.5; z-index:2; }
`;

const len = (s) => s.replace(/<[^>]+>/g, '').length;
const size = (s) => (len(s) > 100 ? 's3' : len(s) > 52 ? 's2' : '');

function stage(c) {
  const kicker = c.kicker ? `<div class="kicker">${c.kicker}</div>` : '';
  const note = c.note ? `<div class="note">${c.note}</div>` : '';
  switch (c.layout) {
    case 'cover':
      return `<div class="stage mid"><img class="word" src="${WORDMARK}" alt="">
        <div class="lesson">${c.label}</div><div class="ctitle">${c.title}</div>
        <div class="csub">${c.sub}</div></div>`;
    case 'closing':
      return `<div class="stage mid"><img class="word small" src="${WORDMARK}" alt="">
        ${c.title ? `<div class="ctitle" style="font-size:72px">${c.title}</div>` : ''}
        ${c.sub ? `<div class="csub">${c.sub}</div>` : ''}
        <div class="site">${c.site ?? ''}</div></div>`;
    case 'memo':
      return `<div class="stage mid"><div class="memo">${c.title}</div></div>`;
    case 'list':
      return `<div class="stage">${kicker}<ol class="${c.plain ? 'plain' : ''}">
        ${c.rows.map((r, i) => `<li class="${c.active != null && c.active !== i ? 'off' : ''}">${r}</li>`).join('')}
      </ol>${note}</div>`;
    case 'quote':
      return `<div class="stage">${kicker}<h1 class="q ${size(c.title)}">${c.title}</h1>${note}</div>`;
    default:
      return `<div class="stage">${kicker}<h1 class="${size(c.title)}">${c.title}</h1>${note}</div>`;
  }
}

const page = (c) => {
  const t = themes[c.theme ?? 'ivory'];
  const bare = c.layout === 'cover' || c.layout === 'closing';
  return `<!doctype html><html><head><meta charset="utf-8">
<style>${FONTS}</style>
<style>${css(t)}</style></head><body>
  ${bare ? '' : `<div class="mark"><img src="${t.mark}" alt=""></div>`}
  ${stage(c)}
  ${bare || c.layout === 'memo' ? '' : '<div class="rule"></div>'}
</body></html>`;
};

const [, , cardsPath, outDir = '.'] = process.argv;
const cards = JSON.parse(fs.readFileSync(cardsPath, 'utf8'));
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
const p = await ctx.newPage();
fs.mkdirSync(outDir, { recursive: true });
for (const c of cards) {
  await p.setContent(page(c));
  await p.evaluate(() => document.fonts.ready);
  const f = path.join(outDir, `${c.file}.png`);
  await p.screenshot({ path: f });
  console.log(f, fs.statSync(f).size);
}
await browser.close();
