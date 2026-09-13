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
  .bignum, .barra, .barra i, .didascalia, .scheda, tr, .disegno, .foto,
  .bar, .btrack i, .scambio {
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

  /* grafico: l'etichetta, poi la barra che cresce verso destra */
  .bar:nth-child(1) { animation: velo .5s .34s; }
  .bar:nth-child(2) { animation: velo .5s .62s; }
  .bar:nth-child(3) { animation: velo .5s .90s; }
  .bar:nth-child(1) .btrack i { animation: riga .9s .52s; }
  .bar:nth-child(2) .btrack i { animation: riga .9s .80s; }
  .bar:nth-child(3) .btrack i { animation: riga .9s 1.08s; }

  /* sostituzioni: una riga alla volta, come la tabella */
  .scambio:nth-child(1) { animation: sali .6s .36s; }
  .scambio:nth-child(2) { animation: sali .6s .62s; }
  .scambio:nth-child(3) { animation: sali .6s .88s; }
  .scambio:nth-child(4) { animation: sali .6s 1.14s; }

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

  /* ---------------------------------------------------------------------
   * Diagrammi di figure_corso.mjs. Qui il disegno non "compare": si
   * costruisce nello stesso ordine in cui la voce lo spiega. Un quadrante
   * che appare tutto insieme e' una figura; un quadrante che prima traccia
   * gli assi e poi accende una casella e' un ragionamento.
   *
   * Due regole imparate a spese di un giro di render:
   *  - "both" va scritto DENTRO la scorciatoia "animation:". La scorciatoia
   *    azzera fill-mode, e un tracciato che finisce di disegnarsi torna al
   *    suo stato di partenza — cioe' sparisce. Sulle dissolvenze non si
   *    vedeva perche' lo stato di partenza era gia' quello giusto.
   *  - niente "nth-of-type" sugli elementi ripetuti: conta i fratelli con
   *    lo stesso tag, e nei gruppi alternati (casella, freccia, casella)
   *    salta. L'indice lo scrive il generatore in "--i".
   * ------------------------------------------------------------------ */
  .fig { animation: velo .3s .22s both; }

  /* il tracciato si scrive: dasharray 100 perche' i path hanno pathLength="100" */
  @keyframes scrive { to { stroke-dashoffset: 0; } }
  .dis, .graffa, .ax, .ay { stroke-dasharray: 100; stroke-dashoffset: 100; }

  /* curva: l'asse, la curva che si scrive, poi il punto di svolta */
  .asse { animation: velo .4s .26s both; }
  .dis  { animation: scrive 1.5s .34s both cubic-bezier(.45,.05,.25,1); }
  .vlin { animation: velo .5s 1.45s both; }
  .vert { transform-box: fill-box; transform-origin: center;
          animation: punto .5s 1.55s both cubic-bezier(.2,1.5,.4,1); }
  .vet  { animation: sali .6s 1.70s both cubic-bezier(.22,.61,.36,1); }
  @keyframes punto { from { opacity:0; transform:scale(.2); }
                     to   { opacity:1; transform:scale(1); } }

  /* finestra: il totale, poi la quota che cresce, poi la graffa */
  .tutto  { animation: velo .5s .26s both; }
  .fin    { transform-box: fill-box; transform-origin: left center;
            animation: riga .8s .50s both cubic-bezier(.22,.61,.36,1); }
  .graffa { animation: scrive .6s 1.20s both; }
  .etf    { animation: sali .6s 1.36s both cubic-bezier(.22,.61,.36,1); }
  .etc    { animation: velo .6s 1.60s both; }

  /* quadranti: la cornice, gli assi, le caselle, e per ultima quella accesa */
  .riq { animation: velo .5s .26s both; }
  .ax  { animation: scrive .7s .44s both cubic-bezier(.22,.61,.36,1); }
  .ay  { animation: scrive .7s .62s both cubic-bezier(.22,.61,.36,1); }
  .ei  { animation: velo .6s .80s both; }
  .cel { animation: velo .5s both; animation-delay: calc(.92s + var(--i) * .12s); }
  .acc { transform-box: fill-box; transform-origin: center;
         animation: cresci .7s 1.42s both cubic-bezier(.22,.61,.36,1); }

  /* flusso: una casella, la sua freccia, la casella dopo */
  .pas { animation: cresci .6s both cubic-bezier(.22,.61,.36,1);
         animation-delay: calc(.38s + var(--i) * .48s); }
  .fre { animation: velo .4s both; animation-delay: calc(.76s + var(--i) * .48s); }

  /* strati: quello che si dice, la linea, e poi cosa c'e' sotto */
  .sup { animation: sali .7s .32s both cubic-bezier(.22,.61,.36,1); }
  .lin { animation: velo .5s .78s both; }
  .str { animation: sali .6s both cubic-bezier(.22,.61,.36,1);
         animation-delay: calc(.98s + var(--i) * .20s); }

  /* pila: si accumula dal basso, un blocco alla volta */
  .base { animation: velo .4s .28s both; }
  .blo  { animation: posa .5s both cubic-bezier(.22,.61,.36,1);
          animation-delay: calc(.46s + var(--i) * .34s); }
  @keyframes posa { from { opacity:0; transform:translateY(-30px); }
                    to   { opacity:1; transform:translateY(0); } }

  /* termometro: il livello sale dal fondo, poi le tacche */
  .liv { transform-box: fill-box; transform-origin: bottom center;
         animation: alza 1.1s .40s both cubic-bezier(.22,.61,.36,1); }
  @keyframes alza { from { transform:scaleY(0); } to { transform:scaleY(1); } }
  .tac { animation: velo .5s both; animation-delay: calc(1.45s + var(--i) * .17s); }
`;

/* ---------------------------------------------------------------------------
 * Movimento che NON finisce. Serve solo dove il movimento e' il contenuto —
 * il pallino che risale e riscende la curva dell'attivazione — e la scena in
 * HeyGen va messa con playback.mode = "loop" invece di "freeze".
 * Il ciclo e' una andata-e-ritorno (`alternate`) lunga esattamente `ciclo`
 * secondi: cosi' il primo e l'ultimo fotogramma coincidono e il loop non
 * scatta. Con `freeze` invece si congelerebbe a meta' corsa.
 * ------------------------------------------------------------------------ */
const ciclico = (sec) => `
  .viagg { offset-distance: 0%; opacity: 1;
           animation: viaggia ${(sec / 2).toFixed(2)}s linear infinite alternate; }
  @keyframes viaggia { to { offset-distance: 100%; } }
  .liv { animation: alza 1.1s .40s both paused cubic-bezier(.22,.61,.36,1),
                    respira ${(sec / 2).toFixed(2)}s 1.5s ease-in-out infinite alternate; }
  @keyframes respira { to { transform: scaleY(.72); } }
`;

const [, , cardsPath, outDir = '.', secArg] = process.argv;
const SEC = Number(secArg ?? 3);
const cards = JSON.parse(fs.readFileSync(cardsPath, 'utf8'));
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
const p = await ctx.newPage();
fs.mkdirSync(outDir, { recursive: true });

for (const c of cards) {
  // `ciclo` allunga la clip e la rende ripetibile: quei blocchi in HeyGen
  // vanno messi in loop, non in freeze.
  const sec = c.ciclo ?? SEC;
  const extra = c.ciclo ? ciclico(c.ciclo) : '';
  const html = page(c).replace('</head>', `<style>${motion}${extra}</style></head>`);
  await p.setContent(html);
  await p.evaluate(() => document.fonts.ready);
  const dir = path.join(outDir, c.file);
  fs.mkdirSync(dir, { recursive: true });
  const n = Math.round(sec * FPS);
  for (let i = 0; i < n; i++) {
    await p.evaluate((ms) => {
      document.getAnimations().forEach((a) => { a.pause(); a.currentTime = ms; });
    }, (i / FPS) * 1000);
    await p.screenshot({ path: path.join(dir, `f${String(i).padStart(4, '0')}.png`) });
  }
  console.log(c.file, n, 'fotogrammi');
}
await browser.close();
