/*
 * Slide animate del corso — stessi layout di cards_corso.mjs, in movimento.
 *
 *   node clips_corso.mjs cards.json ./out [secondi]
 *
 * Il tempo NON scorre da solo: ogni fotogramma sposta a mano l'orologio delle
 * animazioni (`a.currentTime = t`). Il render e' quindi identico a ogni
 * esecuzione, non dipende da quanto e' carica la macchina, e si puo'
 * campionare a qualsiasi fps senza scatti.
 *
 * Regola di ritmo: il movimento ENTRA e poi FINISCE. Sotto quindici secondi
 * di parlato una slide che continua a muoversi diventa rumore. Per questo in
 * HeyGen la scena va messa con playback.mode = "freeze": la clip parte, entra,
 * e tiene fermo l'ultimo fotogramma per il resto del blocco.
 */
import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { page } from './slide_corso.mjs';

const FPS = 25;

const motion = `
  @keyframes sali  { from { opacity:0; transform:translateY(38px); }
                     to   { opacity:1; transform:translateY(0); } }
  @keyframes velo  { from { opacity:0; } to { opacity:1; } }
  @keyframes riga  { from { transform:scaleX(0); } to { transform:scaleX(1); } }
  @keyframes cresci{ from { opacity:0; transform:translateY(26px) scale(.97); }
                     to   { opacity:1; transform:translateY(0) scale(1); } }
  @keyframes conta { from { clip-path:inset(0 100% 0 0); } to { clip-path:inset(0 0 0 0); } }

  /* tutto parte fermo: lo fa avanzare il capture, fotogramma per fotogramma */
  .kicker, h1, .memo, .note, li, .ctitle, .csub, .lesson, .word, .rule, .mark,
  .bignum, .barra, .barra i, .didascalia, .scheda, tr, .disegno, .foto {
    animation-fill-mode: both; animation-play-state: paused;
    animation-timing-function: cubic-bezier(.22,.61,.36,1);
  }
  .kicker   { animation: velo .5s .10s; }
  h1, .memo { animation: sali .9s .28s; }
  .ctitle   { animation: sali .9s .34s; }
  .csub     { animation: velo .8s .70s; }
  .lesson   { animation: velo .6s .18s; }
  .word     { animation: velo .9s .05s; }
  .note     { animation: velo .7s 1.05s; }
  .rule     { transform-origin:left center; animation: riga .8s .50s; }
  .mark     { animation: velo .8s .20s; }
  .foto     { animation: velo 1.1s 0s; }

  li:nth-child(1) { animation: sali .7s .40s; }
  li:nth-child(2) { animation: sali .7s .62s; }
  li:nth-child(3) { animation: sali .7s .84s; }
  li:nth-child(4) { animation: sali .7s 1.06s; }
  li:nth-child(5) { animation: sali .7s 1.28s; }

  /* numero: la cifra sale, poi la barra si riempie verso destra */
  .bignum    { animation: sali .8s .22s; }
  .barra     { animation: velo .4s .55s; }
  .barra i   { animation: riga 1.1s .62s; }
  .didascalia{ animation: sali .8s .90s; }

  /* schede: una alla volta */
  .scheda:nth-child(1) { animation: cresci .65s .42s; }
  .scheda:nth-child(2) { animation: cresci .65s .60s; }
  .scheda:nth-child(3) { animation: cresci .65s .78s; }
  .scheda:nth-child(4) { animation: cresci .65s .96s; }

  /* tabella: intestazione, poi una riga alla volta */
  tr:nth-child(1) { animation: velo .5s .30s; }
  tr:nth-child(2) { animation: sali .6s .58s; }
  tr:nth-child(3) { animation: sali .6s .82s; }
  tr:nth-child(4) { animation: sali .6s 1.06s; }
  tr:nth-child(5) { animation: sali .6s 1.30s; }

  /* disegno: i tratti si tracciano, non compaiono */
  .disegno { animation: velo .3s .30s; }
  .tratto {
    stroke-dasharray: 1400; stroke-dashoffset: 1400;
    animation: traccia 1.5s .40s both paused cubic-bezier(.4,.5,.2,1);
  }
  .tratto:nth-of-type(2) { animation-delay: .70s; }
  .tratto:nth-of-type(3) { animation-delay: .95s; }
  .tratto:nth-of-type(4) { animation-delay: 1.20s; }
  .tratto:nth-of-type(5) { animation-delay: 1.45s; }
  @keyframes traccia { to { stroke-dashoffset: 0; } }
  .eti { animation: velo .6s 1.5s both paused; }
`;

const [, , cardsPath, outDir = '.', secArg] = process.argv;
const SEC = Number(secArg ?? 3);
const cards = JSON.parse(fs.readFileSync(cardsPath, 'utf8'));
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
const p = await ctx.newPage();
fs.mkdirSync(outDir, { recursive: true });

for (const c of cards) {
  const html = page(c).replace('</head>', `<style>${motion}</style></head>`);
  await p.setContent(html);
  await p.evaluate(() => document.fonts.ready);
  const dir = path.join(outDir, c.file);
  fs.mkdirSync(dir, { recursive: true });
  const n = Math.round(SEC * FPS);
  for (let i = 0; i < n; i++) {
    await p.evaluate((ms) => {
      document.getAnimations().forEach((a) => { a.pause(); a.currentTime = ms; });
    }, (i / FPS) * 1000);
    await p.screenshot({ path: path.join(dir, `f${String(i).padStart(4, '0')}.png`) });
  }
  console.log(c.file, n, 'fotogrammi');
}
await browser.close();
