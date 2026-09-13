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
   *  - "velo" e "cresci" finiscono a opacity:1, quindi non vanno MAI messi
   *    sull'elemento che porta una campitura debole: la velatura diventa
   *    tinta piena. Si anima il <g> che lo contiene.
   * ------------------------------------------------------------------ */
  .fig { animation: velo .3s .22s both; }

  /* il tracciato si scrive: dasharray 100 perche' i path hanno pathLength="100" */
  @keyframes scrive { to { stroke-dashoffset: 0; } }
  .dis, .graffa, .ax, .ay, .str1, .str2, .ring, .arc, .tra, .imb
    { stroke-dasharray: 100; stroke-dashoffset: 100; }

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

  /* bivio: il punto di partenza, le due strade che si tracciano, gli esiti */
  .par  { animation: cresci .55s .30s both cubic-bezier(.22,.61,.36,1); }
  .str1 { animation: scrive .55s .70s both cubic-bezier(.45,.05,.25,1); }
  .str2 { animation: scrive .55s .86s both cubic-bezier(.45,.05,.25,1); }
  .ram  { animation: cresci .6s both cubic-bezier(.22,.61,.36,1);
          animation-delay: calc(1.06s + var(--i) * .20s); }

  /* anello: il giro si chiude, poi le punte, poi i nodi */
  .ring { animation: scrive 1.1s .30s both cubic-bezier(.45,.05,.25,1); }
  .pun  { animation: velo .4s both; animation-delay: calc(1.15s + var(--i) * .10s); }
  .nod  { animation: cresci .5s both cubic-bezier(.2,1.4,.4,1);
          animation-delay: calc(1.30s + var(--i) * .14s); }

  /* bilancia: il sostegno, i piatti in pari, e poi pende dalla parte che pesa.
     La geometria e' gia' inclinata: --a e' l'inclinazione opposta, quindi
     l'animazione parte dalla posizione in pari e arriva a quella disegnata. */
  .col, .perno { animation: velo .4s .26s both; }
  .pia  { animation: velo .5s both; animation-delay: calc(.30s + var(--i) * .14s); }
  .gio  { transform-box: view-box; transform-origin: 750px 150px;
          animation: pende .9s .55s both cubic-bezier(.34,1.28,.5,1); }
  @keyframes pende { from { transform: rotate(var(--a)); }
                     to   { transform: rotate(0deg); } }

  /* imbuto: le cose che entrano, il cono che si traccia, quello che esce */
  .chi { animation: cresci .5s both cubic-bezier(.22,.61,.36,1);
         animation-delay: calc(.30s + var(--i) * .16s); }
  .imb  { animation: scrive .9s .90s both cubic-bezier(.45,.05,.25,1); }
  .imbf { animation: velo .6s 1.35s both; }
  .esi { animation: cresci .6s 1.90s both cubic-bezier(.22,.61,.36,1); }

  /* ponte: le due sponde, la misura del vuoto, e infine la campata */
  .spo { animation: velo .5s .30s both; }
  .vuo { animation: velo .5s .80s both; }
  .arc { animation: scrive .9s 1.15s both cubic-bezier(.45,.05,.25,1); }
  .pnt { animation: sali .6s 1.95s both cubic-bezier(.22,.61,.36,1); }

  /* linea: il tempo si stende, poi i momenti in ordine */
  .tra { animation: scrive .9s .30s both cubic-bezier(.45,.05,.25,1); }
  .mom { animation: cresci .55s both cubic-bezier(.2,1.4,.4,1);
         animation-delay: calc(1.05s + var(--i) * .20s); }

  /* barre: l'etichetta, poi la barra che cresce, poi il valore in fondo */
  .bra { animation: velo .4s both; animation-delay: calc(.30s + var(--i) * .14s); }
  .rie { transform-box: fill-box; transform-origin: left center;
         animation: riga .8s both cubic-bezier(.22,.61,.36,1);
         animation-delay: calc(.46s + var(--i) * .14s); }
  .val { animation: velo .4s both; animation-delay: calc(1.20s + var(--i) * .14s); }

  /* raggi: le orbite, il centro, e per ultimo cosa ci gira attorno */
  .orb { animation: velo .5s both; animation-delay: calc(.28s + var(--i) * .12s); }
  .cen { transform-box: fill-box; transform-origin: center;
         animation: cresci .6s .50s both cubic-bezier(.2,1.3,.45,1); }
  .sat { animation: cresci .55s both cubic-bezier(.2,1.4,.4,1);
         animation-delay: calc(1.00s + var(--i) * .16s); }

  /* -------------------------------------------------------------------
   * Infografiche (info_corso.mjs). Stesso principio dei diagrammi: si
   * costruiscono nell'ordine in cui la voce le dice. Sono in HTML, quindi
   * qui non serve il trucco dei tracciati — serve pero' la stessa cautela
   * sull'opacita': dove c'e' gia' una velatura si anima un altro strato.
   * ---------------------------------------------------------------- */
  .occhio { animation: velo .5s .10s both; }

  /* anatomia: la frase, poi la pennellata su un pezzo alla volta, poi la
     legenda numerata. La campitura e' un gradiente largo 0 che si allarga:
     e' il gesto dell'evidenziatore, e non tocca il testo sopra. */
  .ana .frase { animation: sali .7s .24s both cubic-bezier(.22,.61,.36,1); }
  .ana .seg   { background-size: 0% .44em;
                animation: pennella .45s both cubic-bezier(.35,.6,.3,1);
                animation-delay: calc(.78s + var(--i) * .26s); }
  @keyframes pennella { to { background-size: 100% .44em; } }
  .ana .legenda { animation: velo .5s 1.72s both; }
  .ana .rich  { animation: sali .5s both cubic-bezier(.22,.61,.36,1);
                animation-delay: calc(1.80s + var(--i) * .11s); }
  .ana .chiusa{ animation: velo .45s 2.40s both; }

  /* cruscotto: le caselle una alla volta, poi la riga che resta */
  .cru .cella { animation: cresci .55s both cubic-bezier(.22,.61,.36,1);
                animation-delay: calc(.30s + var(--i) * .18s); }
  .cru .resta { animation: sali .7s 1.62s both cubic-bezier(.22,.61,.36,1); }

  /* cartellino: la cifra, cosa misura, le barre, e per ultimo il limite —
     che e' l'unica parte che dice cosa il numero NON dice */
  .car .cifra  { animation: sali .8s .24s both cubic-bezier(.22,.61,.36,1); }
  .car .che    { animation: velo .6s .70s both; }
  .car .voce   { animation: velo .4s both; animation-delay: calc(.84s + var(--i) * .16s); }
  .car .vbar i { transform:scaleX(0); animation: riga .8s both cubic-bezier(.22,.61,.36,1);
                 animation-delay: calc(.96s + var(--i) * .16s); }
  .car .limite { animation: velo .5s 2.18s both; }

  /* confronto: le intestazioni, le righe, e alla fine si accendono quelle
     dove la differenza conta */
  .con .cap  { animation: velo .5s .24s both; }
  .con .fila > * { animation: sali .5s both cubic-bezier(.22,.61,.36,1);
                   animation-delay: calc(.54s + var(--i) * .15s); }
  .con .fila.segna .cll.b::before { transform:scaleX(0);
                   animation: riga .5s both cubic-bezier(.22,.61,.36,1);
                   animation-delay: calc(1.62s + var(--i) * .10s); }
`;

/* ---------------------------------------------------------------------------
 * Movimento che NON finisce. Serve solo dove il movimento e' il contenuto —
 * il pallino che risale e riscende la curva dell'attivazione, il giro che si
 * richiude — e la scena in HeyGen va messa con playback.mode = "loop".
 *
 * Perche' una clip ciclica NON si costruisce sotto gli occhi come le altre:
 * il loop di HeyGen riparte dal primo fotogramma, quindi il primo e l'ultimo
 * devono differire solo per la fase del movimento. Una costruzione lascia il
 * fotogramma 0 vuoto e l'ultimo pieno, e a ogni giro si vede la slide
 * sparire e rifarsi. Qui la figura c'e' gia' tutta dal primo fotogramma e
 * l'unica cosa che si muove e' il ciclo: e' il prezzo del movimento
 * continuo, e si paga solo sulla slide che ne ha bisogno.
 *
 * Il periodo deve DIVIDERE la durata della clip: mezzo ciclo con "alternate"
 * (andata e ritorno = `ciclo`), oppure un giro intero senza. Un ritardo
 * costante non rompe niente, perche' e' solo uno sfasamento.
 * ------------------------------------------------------------------------ */
const ciclico = (sec) => `
  @keyframes viaggia { to { offset-distance: 100%; } }

  /* curva e linea: andata e ritorno, mezzo ciclo per verso */
  .viagg, .scor { offset-distance: 0%; opacity: 1;
                  animation: viaggia ${(sec / 2).toFixed(2)}s linear infinite alternate; }

  /* anello: il giro e' chiuso, quindi un ciclo intero in un verso solo —
     con "alternate" il pallino tornerebbe indietro, che e' il contrario di
     quello che la figura dice */
  .giro { offset-distance: 0%; opacity: 1;
          animation: viaggia ${sec.toFixed(2)}s linear infinite; }

  /* termometro: il livello e' gia' salito, poi respira */
  .liv { animation: alza 1.1s .40s both paused cubic-bezier(.22,.61,.36,1),
                    respira ${(sec / 2).toFixed(2)}s 1.5s ease-in-out infinite alternate; }
  @keyframes respira { from { transform: scaleY(1); }
                       to   { transform: scaleY(.72); } }

  /* bilancia: ha finito di pendere e continua a oscillare, piano, attorno
     alla posizione disegnata */
  .gio { animation: pende .9s .55s both cubic-bezier(.34,1.28,.5,1),
                    oscilla ${(sec / 2).toFixed(2)}s 1.5s ease-in-out infinite alternate; }
  @keyframes oscilla { from { transform: rotate(0deg); }
                       to   { transform: rotate(calc(var(--a) * .22)); } }

  /* imbuto: le gocce scendono in fila. Il periodo e' un terzo del ciclo,
     cosi' al fotogramma finale la scena e' identica al primo. */
  .goc { animation: cade ${(sec / 3).toFixed(2)}s linear infinite;
         animation-delay: calc(var(--i) * ${(sec / 9).toFixed(2)}s); }
  @keyframes cade {
    0%   { transform: translateY(0);     opacity: 0; }
    14%  { opacity: 1; }
    86%  { opacity: 1; }
    100% { transform: translateY(280px); opacity: 0; }
  }
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
  /* Due giri di rendering prima di cominciare: subito dopo setContent
     document.getAnimations() e' ancora vuota, quindi il fotogramma 0 usciva
     senza nessuna animazione applicata — pagina bianca. Sulle clip normali
     non si vedeva, perche' il fotogramma 0 deve essere vuoto comunque; su
     una clip ciclica invece era il primo fotogramma del loop. */
  await p.evaluate(() => new Promise((r) =>
    requestAnimationFrame(() => requestAnimationFrame(r))));
  const dir = path.join(outDir, c.file);
  fs.mkdirSync(dir, { recursive: true });
  const n = Math.round(sec * FPS);
  for (let i = 0; i < n; i++) {
    await p.evaluate(({ ms, ciclica }) => {
      document.getAnimations().forEach((a) => {
        a.pause();
        const infinita = a.effect?.getComputedTiming?.().iterations === Infinity;
        /* Clip ciclica: solo il movimento infinito avanza. Le animazioni di
           costruzione vengono spinte oltre la loro fine (hanno fill-mode
           both, quindi restano ferme sull'ultimo stato), cosi' il primo e
           l'ultimo fotogramma differiscono SOLO per la fase del ciclo.
           Se avanzassero anche loro, il fotogramma 0 sarebbe la slide
           ancora vuota e il loop ricomincerebbe da capo ogni giro. */
        a.currentTime = ciclica && !infinita ? 60000 : ms;
      });
    }, { ms: (i / FPS) * 1000, ciclica: Boolean(c.ciclo) });
    await p.screenshot({ path: path.join(dir, `f${String(i).padStart(4, '0')}.png`) });
  }
  console.log(c.file, n, 'fotogrammi');
}
await browser.close();
