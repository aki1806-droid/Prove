// Libreria grafica delle slide: tabelle vere, grafici, diagrammi, icone vettoriali.
// La usa layout.mjs, che ne unisce CSS e corpi ai propri.
//
// PALETTE DEI DATI — non scelta a occhio.
// Il verde e il rosso del marchio, messi l'uno accanto all'altro in un grafico,
// hanno ΔE 3,4 in protanopia: per un daltonico sono la stessa tinta. Percio':
//   1. la serie categoriale qui sotto e' stata validata sui sei controlli
//      (banda di chiarezza, croma, separazione CVD, soglia a vista normale,
//      contrasto sul fondo) e li passa tutti;
//   2. il colore non porta MAI da solo un significato: ogni serie ha
//      l'etichetta attaccata, e giusto/sbagliato portano anche il segno (✓ ×).
export const DATI = ['#00623A', '#B07A12', '#3E6FA8', '#D70328'];
// Rampa sequenziale (una sola tinta, chiaro -> scuro) per le grandezze.
export const RAMPA = ['#D5E6DE', '#A8CDBB', '#78B296', '#3E8E6B', '#00623A'];
// I grafici stanno solo sui temi chiari. Sul verde pieno le tinte che superano
// la banda di chiarezza per fondo scuro non arrivano a 3:1 di contrasto: invece
// di forzarle, i dati non ci vanno. Sul verde restano le slide di affermazione.

// --- icone: un solo sistema, tratto 1.7 su griglia 24, estremi tondi ---
const I = {
  bilancia:'M12 3v18M7 21h10M12 6 4 9m8-3 8 3M4 9 1.5 15a3.2 3.2 0 0 0 5 0zM20 9l2.5 6a3.2 3.2 0 0 1-5 0z',
  libro:'M4 4.5A1.5 1.5 0 0 1 5.5 3H19v15H5.5A1.5 1.5 0 0 0 4 19.5zM4 19.5A1.5 1.5 0 0 0 5.5 21H19v-3M8 7.5h7M8 11h5',
  documento:'M6 2.5h7l5 5v14H6zM13 2.5v5h5M9 12.5h6M9 16h6',
  lucchetto:'M6 10.5h12v10H6zM8.5 10.5V7a3.5 3.5 0 0 1 7 0v3.5M12 14.5v2.5',
  occhio:'M1.8 12S5.5 5.5 12 5.5 22.2 12 22.2 12 18.5 18.5 12 18.5 1.8 12 1.8 12Z M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z',
  orologio:'M12 2.8a9.2 9.2 0 1 0 0 18.4 9.2 9.2 0 0 0 0-18.4ZM12 7v5.4l3.6 2.2',
  scudo:'M12 2.6 4.5 5.6v6.1c0 4.6 3.1 8.4 7.5 9.7 4.4-1.3 7.5-5.1 7.5-9.7V5.6Z M8.8 12l2.3 2.4 4.1-4.6',
  cuoremano:'M4 13.5V21M4 15.5l3.2-3.1a2 2 0 0 1 2.8 0l.6.6h3.9a2 2 0 0 1 0 4h-2.6M10.5 17.5H20M17 8.6c0-1.5-1.2-2.6-2.6-2.6-.8 0-1.6.4-2.1 1-.5-.6-1.3-1-2.1-1C8.8 6 7.6 7.1 7.6 8.6c0 2.2 4.7 4.4 4.7 4.4S17 10.8 17 8.6Z',
  persona:'M12 3.2a3.9 3.9 0 1 0 0 7.8 3.9 3.9 0 0 0 0-7.8ZM4.5 21v-1.6A5.4 5.4 0 0 1 9.9 14h4.2a5.4 5.4 0 0 1 5.4 5.4V21',
  persone:'M9 3.5a3.4 3.4 0 1 0 0 6.8 3.4 3.4 0 0 0 0-6.8ZM2.5 20.5v-1.2A4.8 4.8 0 0 1 7.3 14.5h3.4a4.8 4.8 0 0 1 4.8 4.8v1.2M16.5 4.2a3.2 3.2 0 0 1 0 6.2M18 14.6h.8a4.2 4.2 0 0 1 4.2 4.2v1.7',
  ospedale:'M3.5 21V8.5L12 3l8.5 5.5V21ZM9.5 21v-5.5h5V21M12 8.5v4M10 10.5h4',
  cappello:'M12 4 1.8 8.6 12 13.2l10.2-4.6ZM5.4 10.6v5.1c0 1.9 3 3.4 6.6 3.4s6.6-1.5 6.6-3.4v-5.1M21 9.4v5.2',
  certificato:'M6 2.8h9l4 4V15H6ZM15 2.8v4h4M9 18.5l-1.4 3.2 2.6-.9 1.6 1.4 1.6-1.4 2.6.9-1.4-3.2M12.4 13.6a2.8 2.8 0 1 0 0-5.6 2.8 2.8 0 0 0 0 5.6Z',
  avviso:'M12 3.4 1.9 20.6h20.2ZM12 9.6v5M12 17.4v.3',
  divieto:'M12 2.9a9.1 9.1 0 1 0 0 18.2 9.1 9.1 0 0 0 0-18.2ZM5.6 5.6l12.8 12.8',
  spunta:'M12 2.9a9.1 9.1 0 1 0 0 18.2 9.1 9.1 0 0 0 0-18.2ZM7.6 12.2l3.1 3.2 5.7-6.4',
  giudice:'M12 21h8M14 4.6 9.4 9.2M4.5 9.4 9.1 4.8m0 0 5.4 5.4-4.8 4.8-5.4-5.4zM12.6 12.2 18 17.6M15.8 9 21 14.2',
  euro:'M18 6.6a7.4 7.4 0 1 0 0 10.8M4.5 10.4h8M4.5 13.8h8',
  chat:'M3.5 5.5h17v11h-10L6 20.5v-4H3.5Z M8 9.5h8M8 12.8h5',
  foto:'M3 7.4h4l1.6-2.6h6.8L17 7.4h4v12H3ZM12 16.6a3.8 3.8 0 1 0 0-7.6 3.8 3.8 0 0 0 0 7.6Z',
  cartella:'M2.8 6.2h6.4l1.8 2.4h10.2v11.2H2.8ZM2.8 6.2V4.2h5.6',
  goccia:'M12 3.2S5.4 10 5.4 14.2a6.6 6.6 0 0 0 13.2 0C18.6 10 12 3.2 12 3.2Z',
  ingranaggio:'M12 8.6a3.4 3.4 0 1 0 0 6.8 3.4 3.4 0 0 0 0-6.8ZM19.6 12a7.7 7.7 0 0 0-.1-1.2l2-1.5-1.9-3.3-2.4 1a7.6 7.6 0 0 0-2-1.2L14.9 3h-3.8l-.3 2.8c-.7.3-1.4.7-2 1.2l-2.4-1-1.9 3.3 2 1.5a7.7 7.7 0 0 0 0 2.4l-2 1.5 1.9 3.3 2.4-1c.6.5 1.3.9 2 1.2l.3 2.8h3.8l.3-2.8c.7-.3 1.4-.7 2-1.2l2.4 1 1.9-3.3-2-1.5c.1-.4.1-.8.1-1.2Z',
};
// Fregi: forme vettoriali che danno peso grafico alle slide di sola parola.
// Non sono decorazione a caso — ognuno dice qualcosa del tipo di slide:
// il sigillo per una norma, l'anello per un numero, le virgolette per una
// citazione, la barra per un titolo.
export const FREGI = {
  sigillo: `<svg class="freg fsigillo" viewBox="0 0 200 200" fill="none" aria-hidden="true">
     <circle cx="100" cy="100" r="86" stroke="currentColor" stroke-width="3"/>
     <circle cx="100" cy="100" r="68" stroke="currentColor" stroke-width="1.5"
       stroke-dasharray="4 9" stroke-linecap="round"/>
     <path d="M64 100l24 24 48-52" stroke="currentColor" stroke-width="6"
       stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  anello: `<svg class="freg fanello" viewBox="0 0 400 400" fill="none" aria-hidden="true">
     <circle cx="200" cy="200" r="178" stroke="currentColor" stroke-width="3"/>
     <path d="M200 22a178 178 0 0 1 178 178" stroke="currentColor" stroke-width="14"
       stroke-linecap="round"/></svg>`,
  virgolette: `<svg class="freg fvirg" viewBox="0 0 200 150" fill="currentColor" aria-hidden="true">
     <path d="M0 150V78C0 34 28 4 74 0v26C46 31 33 48 33 72h37v78zm112 0V78c0-44 28-74 74-78v26
              c-28 5-41 22-41 46h37v78z"/></svg>`,
  barra: `<svg class="freg fbarra" viewBox="0 0 220 18" aria-hidden="true">
     <rect x="0" y="5" width="92" height="8" rx="4" fill="currentColor"/>
     <rect x="104" y="5" width="40" height="8" rx="4" fill="currentColor" opacity=".45"/>
     <rect x="156" y="5" width="16" height="8" rx="4" fill="currentColor" opacity=".25"/></svg>`,
};

export const icona = (n, cls='') =>
  `<svg class="ico ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor"
     stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"
     aria-hidden="true"><path d="${I[n] ?? I.documento}"/></svg>`;

// *testo* -> accento, **testo** -> accento semibold. Duplicato minimo: le due
// funzioni devono restare identiche, e layout.mjs passa la sua quando chiama.
let acc = s => String(s ?? '');
export const collega = fn => { acc = fn; };

const LARG = 1656;                       // 1920 meno i due margini da 132
const num = n => String(Math.round(n * 100) / 100);
// Dentro <text> di un SVG il markup non vale: <b> non e' un elemento SVG e
// finisce renderizzato come un pezzo di testo a se', fuori posto. Nei testi
// SVG gli asterischi si tolgono; dove serve il grassetto si usa foreignObject.
const piano = s => String(s ?? '').replace(/\*\*(.+?)\*\*/g, '$1').replace(/\*(.+?)\*/g, '$1');
// «1 anni» in un grafico si legge come un errore di chi l'ha fatto, non come
// un dato. Il singolare non si lascia alla buona volonta' di chi scrive la scena.
const SING = {anni:'anno', mesi:'mese', ore:'ora', giorni:'giorno', crediti:'credito',
              articoli:'articolo', capi:'capo', punti:'punto', livelli:'livello'};
const unita = (v, u, u1) => !u ? '' : ' ' + (v === 1 ? (u1 ?? SING[u] ?? u) : u);

export const CSS_GRAFICA = `
/* ---------- fregi ---------- */
.freg{position:absolute;pointer-events:none}
.fsigillo{width:300px;height:300px;right:104px;top:280px;color:var(--tit);opacity:.07}
.fanello{width:520px;height:520px;right:-150px;top:-92px;color:var(--acc);opacity:.11}
.fvirg{width:210px;height:158px;left:126px;top:236px;color:var(--acc);opacity:.13}
.fbarra{position:static;width:220px;height:18px;color:var(--acc);margin-bottom:4px}

/* ---------- fondamenta comuni alle figure ---------- */
.gfx{width:100%}
svg.fig{display:block;width:100%;height:auto;overflow:visible}
.fig text{font-family:'Inter',sans-serif;fill:var(--fg)}
.fig .et{font-size:30px;font-weight:500}
.fig .val{font-size:38px;font-weight:700;font-variant-numeric:lining-nums tabular-nums}
.fig .cap{font-size:25px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;
          fill:var(--sop)}
.fig .ass{stroke:var(--linea);stroke-width:3}
.fig .grid{stroke:var(--linea);stroke-width:2;stroke-dasharray:2 12;stroke-linecap:round}
.ico{width:1em;height:1em;flex:0 0 auto}

/* ---------- tabella vera ---------- */
.tab{width:100%;border-collapse:separate;border-spacing:0;border:3px solid var(--linea);
     border-radius:22px;overflow:hidden;table-layout:fixed}
.tab th{font-size:25px;font-weight:700;letter-spacing:.13em;text-transform:uppercase;
        color:var(--sop);text-align:left;padding:26px 30px;background:var(--linea);
        border-bottom:3px solid var(--linea)}
.tab td{font-size:34px;line-height:1.3;color:var(--fg);padding:26px 30px;vertical-align:top;
        border-bottom:2px solid var(--linea)}
.tab tr:last-child td{border-bottom:0}
.tab tbody tr:nth-child(even) td{background:color-mix(in srgb,var(--linea) 34%,transparent)}
.tab td:first-child{font-weight:600;color:var(--tit)}
/* La prima colonna e' gia' la colonna in evidenza: se dentro ci si mette
   anche l'accento, la tabella diventa una colonna rossa e non evidenzia piu'
   niente. Li' il grassetto resta del colore del titolo. */
.tab td:first-child b.a,.tab td:first-child .a{color:var(--tit)}
.tab td+td{border-left:2px solid var(--linea)}
.tab tr.key td{background:color-mix(in srgb,var(--acc) 10%,transparent)}
.tab tr.key td:first-child{color:var(--acc)}
.tab.fitta td{font-size:29px;padding:19px 26px}
.tab.fitta th{font-size:23px;padding:20px 26px}
.tab .si{color:${DATI[0]};font-weight:700}
.tab .no{color:${DATI[3]};font-weight:700}

/* ---------- catena di passi ---------- */
.catena{display:flex;align-items:stretch;gap:14px;min-height:300px}
.catena .p{flex:1;background:color-mix(in srgb,var(--tit) 7%,transparent);
           border:3px solid var(--linea);padding:44px 34px 44px 54px;
           display:flex;flex-direction:column;justify-content:center;gap:14px;
           clip-path:polygon(0 0,calc(100% - 30px) 0,100% 50%,calc(100% - 30px) 100%,0 100%,30px 50%)}
.catena .p:first-child{clip-path:polygon(0 0,calc(100% - 30px) 0,100% 50%,calc(100% - 30px) 100%,0 100%);
                       border-radius:18px 0 0 18px;padding-left:40px}
.catena .p:last-child{clip-path:polygon(0 0,100% 0,100% 100%,0 100%,30px 50%)}
.catena .p.key{background:color-mix(in srgb,var(--acc) 13%,transparent);border-color:var(--acc)}
.catena .t{font-size:40px;font-weight:600;color:var(--tit);line-height:1.14}
.catena .p.key .t{color:var(--acc)}
.catena .d{font-size:25px;line-height:1.36;opacity:.76}
/* Cinque anelli: «Pianificazione» a 40px e' piu' larga dello spazio che resta
   fra le due punte della freccia. La soglia sta qui, non nelle scene. */
.catena.fitta .p{padding:34px 24px 34px 44px}
.catena.fitta .t{font-size:31px}
.catena.fitta .d{font-size:22px;line-height:1.3}

/* ---------- scala di gradini ---------- */
.scala{display:flex;align-items:flex-end;gap:18px;min-height:430px}
.scala .g{flex:1;border:3px solid var(--linea);border-bottom:0;border-radius:18px 18px 0 0;
          padding:32px 26px;display:flex;flex-direction:column;justify-content:flex-end;gap:12px;
          background:color-mix(in srgb,var(--tit) 6%,transparent)}
.scala .g .n{font-size:26px;font-weight:700;color:var(--acc);letter-spacing:.1em}
.scala .g .t{font-size:36px;font-weight:600;color:var(--tit);line-height:1.14}
.scala .g .d{font-size:24px;line-height:1.34;opacity:.74}
.scala .g.key{border-color:var(--acc);background:color-mix(in srgb,var(--acc) 11%,transparent)}
.scalabase{height:5px;background:var(--linea);border-radius:3px;margin-top:-3px}

/* ---------- griglia di caselle ---------- */
.griglia{display:grid;gap:20px;min-height:420px;align-content:center}
.griglia .c{border:3px solid var(--linea);border-radius:18px;padding:30px 28px;
            display:flex;gap:20px;align-items:flex-start;
            background:color-mix(in srgb,var(--tit) 5%,transparent)}
.griglia .c .sg{color:${DATI[0]};font-size:34px;line-height:1;flex:0 0 auto;margin-top:2px}
.griglia .c.no .sg{color:${DATI[3]}}
.griglia .c .t{font-size:31px;line-height:1.3;color:var(--fg)}
.griglia .c .t b{font-weight:600;color:var(--tit)}
.griglia.fitta{gap:14px}
.griglia.fitta .c{padding:19px 24px;gap:16px}
.griglia.fitta .c .t{font-size:27px}
.griglia.fitta .c .sg{font-size:28px}
.griglia.fitta .c .n{font-size:40px}
/* Otto celle su una colonna non ci stanno nemmeno alla misura fitta: servono
   altri 16 px. La soglia e' nel corpo, come per le altre densita'. */
.griglia.fittissima{gap:11px}
.griglia.fittissima .c{padding:15px 22px;gap:14px}
.griglia.fittissima .c .t{font-size:25px;line-height:1.26}
.griglia.fittissima .c .sg{font-size:25px}
.griglia.fittissima .c .n{font-size:34px}
.griglia .c .n{font-size:52px;font-weight:700;color:var(--acc);line-height:1;
               font-variant-numeric:lining-nums tabular-nums;flex:0 0 auto}

/* ---------- icone in fila ---------- */
/* Massimo CINQUE voci: e' un flex orizzontale, e a sei o sette le colonne
   escono dalla cornice qualunque sia il corpo del testo (2.6: +377 px con
   sette barriere). Sopra le cinque voci si usa «griglia». */
.icone{display:flex;gap:30px;min-height:452px}
.icone .v{flex:1;display:flex;flex-direction:column;gap:26px;border:3px solid var(--linea);
          border-radius:22px;padding:54px 38px}
.icone .v .ico{font-size:96px;color:var(--acc);stroke-width:1.4}
.icone .v.key{border-color:var(--acc);background:color-mix(in srgb,var(--acc) 9%,transparent)}
.icone .t{font-size:42px;font-weight:600;color:var(--tit);line-height:1.16}
.icone .d{font-size:28px;line-height:1.38;opacity:.76}
.icone.fitte .v{padding:40px 26px;gap:20px}
.icone.fitte .v .ico{font-size:68px}
.icone.fitte .t{font-size:33px}
.icone.fitte .d{font-size:24px}

/* ---------- matrice 2x2 ---------- */
.matrice{display:grid;grid-template-columns:112px 1fr 1fr;grid-template-rows:80px 1fr 1fr;overflow:hidden;
         gap:0;min-height:560px}
.matrice .ax{display:flex;align-items:center;justify-content:center;font-size:24px;font-weight:700;
             letter-spacing:.13em;text-transform:uppercase;color:var(--sop);text-align:center}
.matrice .ay{writing-mode:vertical-rl;transform:rotate(180deg)}
.matrice .q{border:3px solid var(--linea);margin:-1.5px;padding:36px 34px;display:flex;
            flex-direction:column;gap:12px;justify-content:center}
.matrice .q .t{font-size:34px;font-weight:600;color:var(--tit);line-height:1.16}
.matrice .q .d{font-size:26px;line-height:1.36;opacity:.76}
.matrice .q.key{background:color-mix(in srgb,var(--acc) 11%,transparent);border-color:var(--acc)}
.matrice .q.key .t{color:var(--acc)}
/* Quattro celle con frase + didascalia sforano l'altezza utile: il min-height
   di 560px vale per le matrici a etichetta breve, non per queste. */
.matrice.fitta{min-height:0;grid-template-rows:72px 1fr 1fr}
.matrice.fitta .q{padding:26px 28px;gap:9px}
.matrice.fitta .q .t{font-size:29px;line-height:1.18}
.matrice.fitta .q .d{font-size:23px;line-height:1.3}

/* ---------- albero di decisione ---------- */
.albero{display:flex;flex-direction:column;align-items:center;width:100%}
.albero .radice{border:3px solid var(--tit);border-radius:18px;padding:26px 44px;
  background:color-mix(in srgb,var(--tit) 8%,transparent);font-size:36px;font-weight:600;
  color:var(--tit);text-align:center;line-height:1.16}
.albero .rami{display:flex;gap:24px;width:100%;margin-top:96px;position:relative;align-items:stretch}
/* il gambo, la traversa e le discese: tre righe, nessuna immagine */
.albero .rami:before{content:'';position:absolute;top:-96px;left:calc(50% - 2px);width:4px;height:48px;
  background:var(--linea)}
.albero .rami:after{content:'';position:absolute;top:-48px;left:var(--m);right:var(--m);height:4px;
  background:var(--linea)}
.albero .r{flex:1;display:flex;flex-direction:column;gap:14px;position:relative}
.albero .r:before{content:'';position:absolute;top:-48px;left:calc(50% - 2px);width:4px;height:48px;
  background:var(--linea)}
.albero .cond{font-size:24px;font-weight:700;letter-spacing:.13em;text-transform:uppercase;
  color:var(--sop);text-align:center}
.albero .box{flex:1;border:3px solid var(--tit);border-radius:18px;padding:28px 26px;
  font-size:31px;line-height:1.26;font-weight:600;color:var(--tit)}
.albero .box.key{border-color:var(--acc);color:var(--acc);
  background:color-mix(in srgb,var(--acc) 10%,transparent)}

/* ---------- venn ---------- */
.tsub{font-family:Inter,sans-serif;font-size:25px;line-height:1.22;text-align:center;
  color:var(--fg);opacity:.74}
.vt{font-family:Inter,sans-serif;font-size:28px;line-height:1.3;text-align:center;color:var(--fg)}
.vcomune{margin-top:18px;border:3px dashed var(--tit);border-radius:18px;padding:26px 40px;
  font-size:32px;line-height:1.3;font-weight:600;color:var(--tit);text-align:center}
.vcomune .et{display:block;font-size:23px;font-weight:700;letter-spacing:.15em;
  text-transform:uppercase;color:var(--sop);margin-bottom:10px}

/* ---------- piramide: dentro l'SVG ---------- */
.fig .lbl{font-size:34px;font-weight:600;fill:var(--tit)}
.fig .sub{font-size:25px;fill:var(--fg);opacity:.74}
.fig .big{font-size:64px;font-weight:700;fill:var(--acc);
          font-variant-numeric:lining-nums tabular-nums}

/* Spente: la figura resta intera, ma la parte di cui la voce non sta parlando
   e' in secondo piano. Stessa opacita' degli elenchi, cosi' il modulo ha
   un solo modo di dire «questo viene dopo». */
.catena .p.off,.scala .g.off,.griglia .c.off,.icone .v.off{opacity:.26}

/* ---------- animazione: le figure entrano a pezzi ---------- */
.corpo>.gfx,.corpo>table.tab{animation:none}
.gx{animation:entra .5s cubic-bezier(.22,.7,.3,1) both}
.gx.off{animation-name:entraOff}
svg .gx{transform-box:fill-box;transform-origin:center}
.gx:nth-child(1){animation-delay:.18s}
.gx:nth-child(2){animation-delay:.30s}
.gx:nth-child(3){animation-delay:.42s}
.gx:nth-child(4){animation-delay:.54s}
.gx:nth-child(5){animation-delay:.66s}
.gx:nth-child(6){animation-delay:.78s}
.gx:nth-child(7){animation-delay:.90s}
.gx:nth-child(8){animation-delay:1.02s}
.tab tbody tr{animation:entra .5s cubic-bezier(.22,.7,.3,1) both}
.tab thead tr{animation:entra .5s cubic-bezier(.22,.7,.3,1) both;animation-delay:.14s}
.tab tbody tr:nth-child(1){animation-delay:.26s}
.tab tbody tr:nth-child(2){animation-delay:.36s}
.tab tbody tr:nth-child(3){animation-delay:.46s}
.tab tbody tr:nth-child(4){animation-delay:.56s}
.tab tbody tr:nth-child(5){animation-delay:.66s}
.tab tbody tr:nth-child(6){animation-delay:.76s}
.tab tbody tr:nth-child(7){animation-delay:.86s}
`;

// ======================= i corpi =======================
export const CORPI_GRAFICA = {

  // Tabella vera: intestazioni + righe. «si» e «no» nelle celle diventano
  // segno piu' parola, mai solo colore (vedi la nota sulla protanopia).
  tabella: d => {
    const cel = c => String(c)
      .replace(/^si:/, '<span class="si">✓</span> ')
      .replace(/^no:/, '<span class="no">×</span> ');
    const larg = d.colonne ? `<colgroup>${d.colonne.map(w=>`<col style="width:${w}">`).join('')}</colgroup>` : '';
    return `<table class="tab ${d.righe.length >= 5 ? 'fitta' : ''}">${larg}
      <thead><tr>${d.intestazioni.map(h => `<th>${h}</th>`).join('')}</tr></thead>
      <tbody>${d.righe.map((r, i) =>
        `<tr class="${(d.chiave ?? []).includes(i) ? 'key' : ''}">${
          r.map(c => `<td>${acc(cel(c))}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
  },

  // Barre orizzontali. Etichetta a sinistra, valore in fondo alla barra:
  // l'identita' non e' mai affidata al colore.
  barre: d => {
    const H = 96, GAP = 26, LB = d.etichetta ?? 430, PAD = 150;
    const max = d.max ?? Math.max(...d.barre.map(b => b.v)) * 1.08;
    const y0 = 34, alt = d.barre.length * H + (d.barre.length - 1) * GAP;
    const scala = v => (LARG - LB - PAD) * (v / max);
    const rif = d.riferimento;
    return `<svg class="fig gfx" viewBox="0 0 ${LARG} ${y0 + alt + 58}">
      <line class="ass" x1="${LB}" y1="${y0 - 14}" x2="${LB}" y2="${y0 + alt + 14}"/>
      ${rif ? `<line class="grid" x1="${LB + scala(rif.v)}" y1="${y0 - 14}"
                 x2="${LB + scala(rif.v)}" y2="${y0 + alt + 30}"/>
               <text class="cap" x="${LB + scala(rif.v)}" y="${y0 + alt + 52}"
                 text-anchor="middle">${rif.et}</text>` : ''}
      ${d.barre.map((b, i) => {
        const y = y0 + i * (H + GAP), w = Math.max(scala(b.v), 6);
        const col = b.colore ?? DATI[0];
        return `<g class="gx">
          <text class="et" x="${LB - 34}" y="${y + H / 2 + 2}" text-anchor="end"
            dominant-baseline="middle">${piano(b.et)}</text>
          <rect x="${LB + 3}" y="${y}" width="${num(w)}" height="${H}" rx="10" fill="${col}"/>
          <text class="val" x="${LB + w + 28}" y="${y + H / 2 + 2}" dominant-baseline="middle"
            fill="${col}">${b.v}${unita(b.v, d.unita, d.unita1)}</text>
          ${b.nota ? `<text class="sub" x="${LB + w + 28}" y="${y + H / 2 + 42}"
             dominant-baseline="middle">${piano(b.nota)}</text>` : ''}
        </g>`;
      }).join('')}
    </svg>`;
  },

  // Linea del tempo in scala: le tappe stanno dove cadono davvero.
  // Una timeline a passo fisso mente sulle distanze, e in questo modulo
  // fra il 1974 e il 1992 ci sono diciotto anni, fra il 1999 e il 2000 uno.
  // Vuole ANNI veri in da/a e in decenni: e' un asse cronologico, non un asse
  // generico. Con decenni vuoto stampa «undefined» sulle etichette e non sfora
  // niente, cosi' il controllo della cornice lo lascia passare (2.6 -> 2.7).
  // Per tre momenti in sequenza senza date si usa «catena».
  assetempo: d => {
    // Fasce fisse per anno e didascalia, e la didascalia va a capo: in un
    // <text> SVG non andrebbe a capo e due tappe vicine si sovrappongono.
    // L'alternanza sopra/sotto non basta da sola — con dieci tappe su
    // cinquant'anni si scontrano quelle DUE posizioni piu' in la', che
    // stanno sulla stessa riga. Percio' la larghezza dell'etichetta non e'
    // fissa: e' quella che ci sta fino alla tappa vicina della stessa riga.
    const X0 = 40, X1 = LARG - 40, Y = 236, H = 512;
    const p = a => X0 + (X1 - X0) * ((a - d.da) / (d.a - d.da));
    const xs = d.tappe.map(t => p(t.anno));
    const largh = i => {
      let dist = Infinity;
      for (let k = 0; k < xs.length; k++)
        if (k !== i && (k % 2) === (i % 2)) dist = Math.min(dist, Math.abs(xs[k] - xs[i]));
      return Math.max(122, Math.min(236, dist - 14));
    };
    return `<svg class="fig gfx" viewBox="0 0 ${LARG} ${H}">
      ${(d.decenni ?? []).map(a => `<line class="grid" x1="${num(p(a))}" y1="30"
          x2="${num(p(a))}" y2="${Y + 214}"/>`).join('')}
      ${(d.decenni ?? []).map(a => `<text class="cap" x="${num(p(a))}" y="${Y + 250}"
          text-anchor="middle" opacity=".7">${a}</text>`).join('')}
      <line class="ass" x1="${X0}" y1="${Y}" x2="${X1}" y2="${Y}"/>
      ${d.tappe.map((t, i) => {
        const x = xs[i], su = i % 2 === 0, w = largh(i);
        const col = t.key ? 'var(--acc)' : 'var(--tit)';
        return `<g class="gx">
          <line x1="${num(x)}" y1="${su ? Y - 38 : Y + 38}" x2="${num(x)}" y2="${Y}"
            stroke="${col}" stroke-width="3"/>
          <circle cx="${num(x)}" cy="${Y}" r="${t.key ? 15 : 11}" fill="${col}"
            stroke="var(--bg)" stroke-width="5"/>
          <text class="lbl" x="${num(x)}" y="${su ? Y - 152 : Y + 88}" text-anchor="middle"
            fill="${col}">${t.anno}</text>
          <foreignObject x="${num(x - w / 2)}" y="${su ? Y - 136 : Y + 104}"
            width="${num(w)}" height="98">
            <div xmlns="http://www.w3.org/1999/xhtml" class="tsub">${piano(t.et)}</div>
          </foreignObject>
        </g>`;
      }).join('')}
    </svg>`;
  },

  // Composizione: una barra sola divisa in segmenti etichettati.
  // Sostituisce la ciambella, che su un 150 su 150 disegnava un anello pieno
  // e non diceva niente: una figura che esce sempre uguale non e' un grafico.
  impila: d => {
    const H = 132, Y = 52, tot = d.segmenti.reduce((s, x) => s + x.v, 0);
    let x = 0;
    return `<svg class="fig gfx" viewBox="0 0 ${LARG} ${Y + H + 168}">
      ${d.segmenti.map((s, i) => {
        const w = (LARG - (d.segmenti.length - 1) * 4) * (s.v / tot);
        const xi = x; x += w + 4;
        const col = s.colore ?? RAMPA[RAMPA.length - 1 - (i % 3)];
        const r = i === 0 ? '12 0 0 12' : i === d.segmenti.length - 1 ? '0 12 12 0' : '0';
        return `<g class="gx">
          <path d="M${num(xi + (i === 0 ? 12 : 0))} ${Y}
                   H${num(xi + w - (i === d.segmenti.length - 1 ? 12 : 0))}
                   ${i === d.segmenti.length - 1 ? `a12 12 0 0 1 12 12` : ''}
                   V${Y + H - (i === d.segmenti.length - 1 ? 12 : 0)}
                   ${i === d.segmenti.length - 1 ? `a12 12 0 0 1 -12 12` : ''}
                   H${num(xi + (i === 0 ? 12 : 0))}
                   ${i === 0 ? `a12 12 0 0 1 -12 -12` : ''}
                   V${Y + (i === 0 ? 12 : 0)}
                   ${i === 0 ? `a12 12 0 0 1 12 -12` : ''} Z" fill="${col}"/>
          <text x="${num(xi + w / 2)}" y="${Y + H / 2 + 4}" text-anchor="middle"
            dominant-baseline="middle" class="val"
            fill="${s.chiaro ? 'var(--tit)' : '#FFFFFF'}">${s.v}${unita(s.v, d.unita, d.unita1)}</text>
          <text x="${num(xi + w / 2)}" y="${Y + H + 50}" text-anchor="middle"
            class="et">${piano(s.t)}</text>
          ${s.d ? `<text x="${num(xi + w / 2)}" y="${Y + H + 86}" text-anchor="middle"
             class="sub">${piano(s.d)}</text>` : ''}
        </g>`;
      }).join('')}
      <text x="0" y="32" class="cap">${piano(d.testa ?? '')}</text>
      <text x="${LARG}" y="32" class="cap" text-anchor="end"
        >${tot}${unita(tot, d.unita, d.unita1)} in tutto</text>
    </svg>`;
  },

  // Finestra di tempo: da quando scatta l'obbligo a quando scade, sulla stessa
  // riga, con le soglie che contano. Anche questa sostituisce un quadrante che
  // su 48 ore su 48 disegnava sempre l'arco intero.
  scadenza: d => {
    const X0 = 60, X1 = LARG - 60, Y = 150, H = 54;
    const p = v => X0 + (X1 - X0) * (v / d.max);
    const b = d.banda ?? [0, d.max];
    return `<svg class="fig gfx" viewBox="0 0 ${LARG} 360">
      <g class="gx">
        <rect x="${X0}" y="${Y}" width="${X1 - X0}" height="${H}" rx="12" fill="var(--linea)"/>
        <rect x="${num(p(b[0]))}" y="${Y}" width="${num(p(b[1]) - p(b[0]))}" height="${H}" rx="12"
          fill="${d.colore ?? DATI[0]}"/>
        <text x="${X0}" y="${Y - 26}" class="cap">${piano(d.inizio ?? '')}</text>
        <text x="${X1}" y="${Y - 26}" class="cap" text-anchor="end">${piano(d.fine ?? '')}</text>
      </g>
      ${(() => {
        // Stessa trappola della linea del tempo: le didascalie sono riquadri
        // centrati sulla tacca, e due soglie vicine si sovrappongono. La
        // larghezza e' quella che ci sta fino alla tacca piu' vicina.
        const xs = (d.tappe ?? []).map(t => p(t.a));
        const largh = i => {
          let dist = Infinity;
          for (let k = 0; k < xs.length; k++)
            if (k !== i) dist = Math.min(dist, Math.abs(xs[k] - xs[i]));
          return Math.max(150, Math.min(400, dist - 16));
        };
        return (d.tappe ?? []).map((t, i) => {
        const x = xs[i], W = largh(i), col = t.key ? 'var(--acc)' : 'var(--tit)';
        return `<g class="gx">
          <line x1="${num(x)}" y1="${Y - 12}" x2="${num(x)}" y2="${Y + H + 34}"
            stroke="${col}" stroke-width="4"/>
          <circle cx="${num(x)}" cy="${Y + H + 34}" r="10" fill="${col}"/>
          <text x="${num(x)}" y="${Y + H + 96}" text-anchor="middle" class="big"
            style="font-size:52px" fill="${col}">${t.v ?? ''}</text>
          <foreignObject x="${num(Math.max(0, Math.min(x - W / 2, LARG - W)))}" y="${Y + H + 116}"
            width="${num(W)}" height="130">
            <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:Inter,sans-serif;
              font-size:${W < 260 ? 25 : 29}px;line-height:1.3;text-align:center;color:var(--fg)">${acc(t.t)}</div>
          </foreignObject>
        </g>`;
      }).join('');
      })()}
    </svg>`;
  },

  // Piramide: gli strati stanno uno sull'altro e il piu' largo e' la base.
  piramide: d => {
    const n = d.strati.length, H = 108, G = 12, W = LARG * 0.52, X = 40;
    const alt = n * H + (n - 1) * G;
    return `<svg class="fig gfx" viewBox="0 0 ${LARG} ${alt + 20}">
      ${d.strati.map((s, i) => {
        const y = i * (H + G), wTop = W * (0.30 + 0.70 * i / n), wBot = W * (0.30 + 0.70 * (i + 1) / n);
        const col = RAMPA[Math.min(RAMPA.length - 1, RAMPA.length - n + i)];
        const cx = X + W / 2;
        return `<g class="gx">
          <path d="M${num(cx - wTop / 2)} ${y} H${num(cx + wTop / 2)}
                   L${num(cx + wBot / 2)} ${y + H} H${num(cx - wBot / 2)} Z" fill="${col}"/>
          <text class="lbl" x="${X + W + 60}" y="${y + H / 2 - 6}"
            dominant-baseline="middle">${acc(s.t)}</text>
          ${s.d ? `<text class="sub" x="${X + W + 60}" y="${y + H / 2 + 30}"
             dominant-baseline="middle">${acc(s.d)}</text>` : ''}
        </g>`;
      }).join('')}
    </svg>`;
  },

  // Albero di decisione. In HTML e non in SVG: dentro un SVG i riquadri hanno
  // altezza fissa e il testo piu' lungo viene tagliato — succedeva davvero,
  // «la volonta' del minore e' ascoltata» finiva sotto il bordo.
  albero: d => {
    const n = d.rami.length, m = 50 / n;
    return `<div class="albero gfx">
      <div class="radice gx">${acc(d.radice)}</div>
      <div class="rami" style="--m:${num(m)}%">${d.rami.map(r =>
        `<div class="r gx"><div class="cond">${r.cond}</div>
          <div class="box ${r.key ? 'key' : ''}">${acc(r.esito)}</div></div>`).join('')}
      </div></div>`;
  },

  // Due cerchi che si sovrappongono. I testi stanno nelle mezzelune, mai nella
  // lente: la lente e' larga un centinaio di pixel e qualunque frase ci finisca
  // dentro si sovrappone a quelle dei due cerchi.
  venn: d => {
    const R = 230, DX = 175, cy = 262, cx = LARG / 2, TW = 300;
    return `<div class="gfx">
      <svg class="fig" viewBox="0 0 ${LARG} 540">
        <g class="gx">
          <circle cx="${cx - DX}" cy="${cy}" r="${R}" fill="${DATI[0]}" fill-opacity=".14"
            stroke="${DATI[0]}" stroke-width="4"/>
          <text class="lbl" x="${cx - DX - 120}" y="${cy - R - 30}" text-anchor="middle"
            fill="${DATI[0]}">${piano(d.sx.t)}</text>
          <foreignObject x="${cx - DX - 97 - TW / 2}" y="${cy - 66}" width="${TW}" height="150">
            <div xmlns="http://www.w3.org/1999/xhtml" class="vt">${acc(d.sx.d)}</div>
          </foreignObject>
        </g>
        <g class="gx">
          <circle cx="${cx + DX}" cy="${cy}" r="${R}" fill="${DATI[2]}" fill-opacity=".14"
            stroke="${DATI[2]}" stroke-width="4"/>
          <text class="lbl" x="${cx + DX + 120}" y="${cy - R - 30}" text-anchor="middle"
            fill="${DATI[2]}">${piano(d.dx.t)}</text>
          <foreignObject x="${cx + DX + 97 - TW / 2}" y="${cy - 66}" width="${TW}" height="150">
            <div xmlns="http://www.w3.org/1999/xhtml" class="vt">${acc(d.dx.d)}</div>
          </foreignObject>
        </g>
        <g class="gx">
          <circle cx="${cx}" cy="${cy}" r="13" fill="var(--tit)"/>
          <line x1="${cx}" y1="${cy + 13}" x2="${cx}" y2="${cy + R + 46}"
            stroke="var(--linea)" stroke-width="3"/>
        </g>
      </svg>
      <div class="vcomune gx"><span class="et">in comune</span>${acc(d.centro)}</div>
    </div>`;
  },

  catena: d => `<div class="catena gfx ${d.passi.length >= 5 ? 'fitta' : ''}">${d.passi.map((p, i) =>
    `<div class="p gx ${p.key ? 'key' : ''} ${(d.attive ?? d.passi.map((_, k) => k)).includes(i) ? 'on' : 'off'}"><div class="t">${acc(p.t)}</div>
      ${p.d ? `<div class="d">${acc(p.d)}</div>` : ''}</div>`).join('')}</div>`,

  scala: d => `<div class="gfx"><div class="scala">${d.gradini.map((g, i) =>
    `<div class="g gx ${g.key ? 'key' : ''} ${(d.attive ?? d.gradini.map((_, k) => k)).includes(i) ? 'on' : 'off'}" style="height:${num(46 + (i + 1) * (340 / d.gradini.length))}px">
      ${g.n ? `<div class="n">${g.n}</div>` : ''}<div class="t">${acc(g.t)}</div>
      ${g.d ? `<div class="d">${acc(g.d)}</div>` : ''}</div>`).join('')}</div>
    <div class="scalabase"></div></div>`,

  // La soglia sta qui e non nelle scene: sette caselle su una colonna non ci
  // stanno alla misura piena, e ogni lezione se ne dimenticherebbe per conto suo.
  griglia: d => `<div class="griglia gfx ${
      d.celle.length >= (d.colonne === 1 ? 8 : 12) ? 'fittissima'
      : d.celle.length >= (d.colonne === 1 ? 6 : 9) ? 'fitta' : ''}"
      style="grid-template-columns:repeat(${d.colonne ?? 2},1fr)">${d.celle.map((c, i) =>
    `<div class="c gx ${c.no ? 'no' : ''} ${(d.attive ?? d.celle.map((_, k) => k)).includes(i) ? 'on' : 'off'}">${
      c.n != null ? `<span class="n">${c.n}</span>`
      : d.spunta === false ? '' : `<span class="sg">${c.no ? '×' : '✓'}</span>`}
      <span class="t">${acc(c.t)}</span></div>`).join('')}</div>`,

  icone: d => `<div class="icone gfx ${d.voci.length > 4 ? 'fitte' : ''}">${d.voci.map((v, i) =>
    `<div class="v gx ${v.key ? 'key' : ''} ${(d.attive ?? d.voci.map((_, k) => k)).includes(i) ? 'on' : 'off'}">${icona(v.icona)}
      <div class="t">${acc(v.t)}</div>
      ${v.d ? `<div class="d">${acc(v.d)}</div>` : ''}</div>`).join('')}</div>`,

  matrice: d => `<div class="matrice gfx ${
    d.celle.some(c => c.d) && d.celle.reduce((s, c) => s + c.t.length, 0) > 90 ? 'fitta' : ''}">
    <div></div><div class="ax gx">${d.assex[0]}</div><div class="ax gx">${d.assex[1]}</div>
    <div class="ax ay gx">${d.assey[0]}</div>
    ${d.celle.slice(0, 2).map(c => `<div class="q gx ${c.key ? 'key' : ''}">
      <div class="t">${acc(c.t)}</div>${c.d ? `<div class="d">${acc(c.d)}</div>` : ''}</div>`).join('')}
    <div class="ax ay gx">${d.assey[1]}</div>
    ${d.celle.slice(2).map(c => `<div class="q gx ${c.key ? 'key' : ''}">
      <div class="t">${acc(c.t)}</div>${c.d ? `<div class="d">${acc(c.d)}</div>` : ''}</div>`).join('')}
  </div>`,
};
