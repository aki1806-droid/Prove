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
  .stage.graf { padding-top:190px; padding-bottom:120px; }

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


/* ===========================================================================
 * Layout con grafica — aggiunti quando Achille ha chiesto lezioni meno
 * "solo testo". Regola d'ingaggio: ogni elemento grafico deve portare il
 * significato di quello che sta dicendo in quel momento. Se serve solo a
 * far muovere qualcosa, si toglie.
 * ======================================================================== */

const grafica = (t) => `
  /* --- numero grande con barra proporzionale ------------------------------
     I numeri stanno SEMPRE in Jost: Cormorant ha le cifre minuscole
     all'antica e un 1 si legge come una I. */
  .bignum { font-family:'Jost',sans-serif; font-weight:600; font-size:300px;
            line-height:.9; letter-spacing:-.02em; color:${GOLD}; }
  .bignum small { font-size:120px; font-weight:400; margin-left:10px; }
  .barra { position:relative; width:100%; height:12px; margin-top:56px;
           background:${t.fg}24; }
  .barra i { position:absolute; inset:0; background:${GOLD}; opacity:1;
             transform-origin:left center; display:block; }
  .didascalia { font-family:'Cormorant Garamond',serif; font-weight:600;
                font-size:76px; line-height:1.2; margin-top:64px; max-width:1360px; }

  /* --- schede affiancate, una per concetto -------------------------------- */
  .schede { display:flex; gap:38px; margin-top:16px; }
  .scheda { flex:1; border:2px solid ${GOLD}; border-radius:3px; padding:52px 40px 46px;
            display:flex; flex-direction:column; align-items:flex-start; gap:34px;
            min-height:430px; }
  .scheda svg { width:104px; height:104px; }
  .scheda .et { font-family:'Jost',sans-serif; font-weight:500; font-size:42px;
                line-height:1.22; }
  .scheda .n { font-family:'Jost',sans-serif; font-weight:600; font-size:22px;
               letter-spacing:.3em; color:${GOLD}; }

  /* --- tabella a due colonne ---------------------------------------------- */
  table { width:100%; border-collapse:collapse; margin-top:10px; }
  th { font-family:'Jost',sans-serif; font-weight:600; font-size:24px;
       letter-spacing:.28em; text-transform:uppercase; color:${GOLD};
       text-align:left; padding:0 0 30px; }
  th, td { width:50%; }
  td { font-family:'Jost',sans-serif; font-weight:400; font-size:46px; line-height:1.3;
       padding:34px 60px 34px 0; border-top:1px solid ${t.fg}33; vertical-align:top; }
  td.b { padding-right:0; }
  tr td:first-child { opacity:.45; }

  /* --- disegno a tratto ---------------------------------------------------- */
  .disegno { display:flex; justify-content:center; margin:8px 0 0; }
  .disegno svg { width:1180px; height:520px; }
  .tratto { fill:none; stroke:${t.fg}; stroke-width:4; stroke-linecap:round;
            stroke-linejoin:round; }
  .tratto.oro { stroke:${GOLD}; }
  .tratto.sottile { stroke-width:2.5; opacity:.5; }
  .eti { font-family:'Jost',sans-serif; font-weight:500; font-size:34px; fill:${t.fg}; }
  .eti.oro { fill:${GOLD}; }

  /* --- foto a piena inquadratura, testo sopra ------------------------------ */
  .foto { position:absolute; inset:0; z-index:0; }
  .foto img { width:100%; height:100%; object-fit:cover; display:block; }
  .velo { position:absolute; inset:0; z-index:1;
          background:linear-gradient(90deg, ${t.bg}f2 0%, ${t.bg}e0 46%, ${t.bg}55 100%); }
`;

/* Icone: tratto aperto, così si possono "disegnare" animando il tratteggio. */
const icone = {
  nuvola:   `<path class="tratto" d="M26 66 a18 18 0 0 1 4-35 a22 22 0 0 1 42-7 a17 17 0 0 1 6 33 z"/><circle class="tratto oro" cx="40" cy="84" r="6"/><circle class="tratto oro" cx="58" cy="92" r="4"/>`,
  imbuto:   `<path class="tratto" d="M16 20 h72 L60 56 v30 l-16 10 V56 z"/><path class="tratto oro" d="M34 34 h36"/>`,
  bilancia: `<path class="tratto" d="M52 18 v70"/><path class="tratto" d="M20 30 h64"/><path class="tratto" d="M32 88 h40"/><path class="tratto oro" d="M20 30 L8 56 h24 z"/><path class="tratto oro" d="M84 30 L72 56 h24 z"/>`,
  cerotto:  `<path class="tratto" d="M22 52 a18 18 0 0 1 18-18 h24 a18 18 0 0 1 0 36 H40 a18 18 0 0 1-18-18 z" transform="rotate(-45 52 52)"/><path class="tratto oro" d="M40 40 L64 64"/><path class="tratto oro" d="M46 62 L62 46"/>`,
  orologio: `<circle class="tratto" cx="52" cy="52" r="40"/><path class="tratto oro" d="M52 28 L52 54 L72 64"/>`,
  lampadina:`<path class="tratto" d="M52 18 a24 24 0 0 1 24 24 c0 13-9 19-12 26 H40 c-3-7-12-13-12-26 a24 24 0 0 1 24-24 z"/><path class="tratto oro" d="M41 76 h22"/><path class="tratto oro" d="M44 86 h16"/>`,
  scudo:    `<path class="tratto" d="M52 14 L86 28 C86 62 72 82 52 92 C32 82 18 62 18 28 Z"/><path class="tratto oro" d="M36 52 L48 64 L70 40"/>`,
  io:       `<circle class="tratto" cx="52" cy="34" r="17"/><path class="tratto" d="M24 88 C24 68 36 58 52 58 C68 58 80 68 80 88"/><path class="tratto oro" d="M92 30 C104 52 86 72 66 68"/><path class="tratto oro" d="M78 60 L64 68 L74 80"/>`,
};

function stageGrafica(c) {
  const kicker = c.kicker ? `<div class="kicker">${c.kicker}</div>` : '';
  const note = c.note ? `<div class="note">${c.note}</div>` : '';
  switch (c.layout) {
    case 'number':
      return `<div class="stage graf">${kicker}
        <div class="bignum">${c.num}${c.unit ? `<small>${c.unit}</small>` : ''}</div>
        ${c.barra === false ? '' : `<div class="barra"><i style="width:${c.fill ?? 80}%"></i></div>`}
        <div class="didascalia">${c.title}</div>${note}</div>`;

    case 'cards':
      return `<div class="stage graf">${kicker}<div class="schede">
        ${c.rows.map((r, i) => `<div class="scheda">
            <div class="n">${String(i + 1).padStart(2, '0')}</div>
            <svg viewBox="0 0 104 104">${icone[r.icona] ?? ''}</svg>
            <div class="et">${r.testo}</div>
          </div>`).join('')}
      </div>${note}</div>`;

    case 'table':
      return `<div class="stage graf">${kicker}<table>
        <tr><th>${c.cols[0]}</th><th>${c.cols[1]}</th></tr>
        ${c.rows.map((r) => `<tr><td>${r[0]}</td><td class="b">${r[1]}</td></tr>`).join('')}
      </table>${note}</div>`;

    case 'figure':
      return `<div class="stage graf">${kicker}<div class="disegno">${c.svg}</div>
        ${c.title ? `<div class="didascalia" style="text-align:center;max-width:none">${c.title}</div>` : ''}${note}</div>`;

    default:
      return null;
  }
}

const stageBase = stage;
const stageTutti = (c) => stageGrafica(c) ?? stageBase(c);

const page = (c) => {
  const t = themes[c.theme ?? 'ivory'];
  const bare = c.layout === 'cover' || c.layout === 'closing';
  return `<!doctype html><html><head><meta charset="utf-8">
<style>${FONTS}</style>
<style>${css(t)}</style>
<style>${grafica(t)}</style></head><body>
  ${bare ? '' : `<div class="mark"><img src="${t.mark}" alt=""></div>`}
  ${c.foto ? `<div class="foto"><img src="${c.foto}"></div><div class="velo"></div>` : ''}
  ${stageTutti(c)}
  ${bare || c.layout === 'memo' ? '' : '<div class="rule"></div>'}
</body></html>`;
};


export { page, themes };
