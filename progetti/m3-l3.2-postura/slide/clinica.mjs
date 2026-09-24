// Terza generazione grafica, per il modulo clinico: illustrazioni del corpo e
// del reparto, e diagrammi animati che mostrano un meccanismo, non solo un
// elenco. Stesso sistema di figure.mjs: tratto tondo, un colore, campiture in
// accento, ogni tratto con pathLength="1", tutto finito entro 2,8 s.
//
// I corpi:
//   corpo      la sagoma (fronte e retro) con le zone che si accendono in ordine
//   frequenze  strisce di 24 ore con le ripetizioni che compaiono
//   percorso   una linea a tappe numerate che si disegna
//   vap        il profilo con tubo, cuffia e microaspirazione
//   mappa      un'illustrazione grande con i richiami numerati
//   bivio      una radice e due rami, uno in accento
let acc = s => String(s ?? '');
export const collega = fn => { acc = fn; };
const piano = s => String(s ?? '').replace(/\*\*(.+?)\*\*/g, '$1').replace(/\*(.+?)\*/g, '$1');
const num = n => String(Math.round(n * 100) / 100);
const C = (cx, cy, r) => `M${cx} ${cy - r}a${r} ${r} 0 1 1 0 ${2 * r}a${r} ${r} 0 1 1 0 ${-2 * r}`;

// ---------- illustrazioni cliniche, griglia 240 ----------
// «pieno:» campitura in accento; «freccia:» tratto in accento disegnato per ultimo.
export const ILLU_CLINICA = {
  occhio: [
    'M20 120c30-46 66-68 100-68s70 22 100 68c-30 46-66 68-100 68S50 166 20 120z',   // palpebre
    C(120, 120, 40), C(120, 120, 16),                                              // iride, pupilla
    'pieno:' + C(120, 120, 40),
    'M40 176c20 12 42 18 62 20M138 196c20-2 42-8 62-20',                           // ciglia inferiori
    'M60 62c6-8 12-14 18-18M180 62c-6-8-12-14-18-18',
    'freccia:M200 148c-22 26-52 40-80 40S62 174 40 148M52 142l-12 6 10 10',         // interno -> esterno
  ],
  bocca: [
    'M26 120c30-30 60-44 94-44s64 14 94 44c-30 30-60 44-94 44S56 150 26 120z',    // labbra
    'M26 120h188',                                                                 // rima
    'M60 106v-10M84 100v-16M108 98v-20M132 98v-20M156 100v-16M180 106v-10',        // denti sopra
    'M60 134v10M84 140v16M108 142v20M132 142v20M156 140v16M180 134v10',            // denti sotto
    'pieno:M60 96h120v24H60z',
    'M172 44l40-24M160 62l52-30', 'pieno:M150 40l70-40 12 20-70 40z',              // spazzolino
  ],
  polmoni: [
    'M120 24v60', 'M96 84h48',                                                     // trachea, carena
    'M108 92c-30 6-60 40-66 96 0 20 10 30 26 30 20 0 34-14 40-34V92z',            // sinistro
    'M132 92c30 6 60 40 66 96 0 20-10 30-26 30-20 0-34-14-40-34V92z',             // destro
    'pieno:M108 92c-30 6-60 40-66 96 0 20 10 30 26 30 20 0 34-14 40-34V92z',
    'pieno:M132 92c30 6 60 40 66 96 0 20-10 30-26 30-20 0-34-14-40-34V92z',
    'M108 110c-16 14-28 34-30 60M132 110c16 14 28 34 30 60',                       // bronchi
  ],
  stanza: [
    'M14 204h212',                                                                 // pavimento
    'M30 204v-76h30v40h140v36M200 168v36',                                         // letto: testiera, piano, gamba
    'M60 156h140v12H60z', 'pieno:M66 148h34v8H66z',                                // materasso, cuscino
    'M170 132h46v72h-46z', 'M178 148h30M178 162h30',                               // comodino
    'M120 60v-30M104 60h32', 'pieno:M96 60h48l-8 22H104z', 'M96 60h48l-8 22H104z', // lampada
    'M40 96c0-10 8-16 16-16s16 6 16 16v6H40z', 'M56 102v14', 'pieno:' + C(56, 122, 8), // campanello
  ],
  piede: [
    'M40 200c-10-30-6-70 10-100 10-18 26-28 46-28 30 0 50 20 60 50 6 18 12 40 30 52 20 12 40 12 42 26H40z',
    'M60 60c-10 0-16 10-12 20M84 46c-8 2-12 12-8 22M112 44c-8 2-12 12-8 22M140 52c-8 2-10 12-6 20',
    'pieno:M70 78h16v6H70zM96 70h16v6H96zM124 70h16v6h-16z',                        // spazi interdigitali
    'M40 200h188',
  ],
  sponde: [
    'M20 190h200', 'M30 190v-70h26v40h130v30M186 160v30',                          // letto
    'M56 150h130v12H56z',
    'M70 116v34M96 116v34M122 116v34M148 116v34', 'M64 116h90', 'M64 134h90',        // sponda alzata
    'pieno:M64 110h90v10H64z',
    C(72, 100, 12), 'M60 118h10',                                                  // testa sul cuscino
  ],
  acqua: [
    'M36 110h168l-14 90a10 10 0 0 1-10 8H60a10 10 0 0 1-10-8z',                   // bacinella
    'pieno:M48 140h144l-10 60H58z',
    'M64 140c20-10 40-10 60 0s40 10 52 0',                                         // pelo dell'acqua
    'M96 48c-10 14-14 22-14 30a14 14 0 0 0 28 0c0-8-4-16-14-30z',                  // gocce
    'M150 30c-8 12-12 20-12 26a12 12 0 0 0 24 0c0-6-4-14-12-26z',
    'pieno:M96 48c-10 14-14 22-14 30a14 14 0 0 0 28 0c0-8-4-16-14-30z',
  ],
  farmaci: [
    'M52 60h66v20H52zM58 80v110a10 10 0 0 0 10 10h50a10 10 0 0 0 10-10V80',       // flacone
    'M68 120h50', 'pieno:M64 130h58v60a6 6 0 0 1-6 6H70a6 6 0 0 1-6-6z',
    'M150 150l40-40a17 17 0 0 1 24 24l-40 40a17 17 0 0 1-24-24z', 'M170 130l24 24',  // capsula
    'pieno:M150 150l20-20 24 24-20 20a17 17 0 0 1-24-24z',
  ],
  paravento: [
    'M20 200V70l50 14v116M70 84l50-14v116M120 70l50 14v116M170 84l50-14v130',
    'pieno:M20 70l50 14v116H20zM120 70l50 14v116h-50z',
    'M20 200h200',
  ],
  lampada: [
    C(120, 110, 50), 'M96 160h48v20H96z', 'M104 180h32v10h-32z',
    'pieno:' + C(120, 110, 50),
    'M120 30v14M60 50l10 10M180 50l-10 10M40 110h14M186 110h14',                   // raggi
    'M14 214h212',
  ],
  calzatura: [
    'M30 170c0-30 20-50 50-50h30c20 0 34 10 44 26l12 20c10 16 40 18 50 22v12H30z',
    'M30 200h186', 'pieno:M36 192h176v8H36z',
    'M92 120c-4-14 0-28 8-36M120 120c-2-10 2-20 8-28',
    'M150 146c-14 2-24 10-30 22',
  ],
  costituzione: [
    'M52 36h136a8 8 0 0 1 8 8v160a8 8 0 0 1-8 8H52a8 8 0 0 1-8-8V44a8 8 0 0 1 8-8z',
    'M76 76h88M76 100h88M76 124h64M76 148h88M76 172h48',
    'pieno:M148 156l26-26 14 14-26 26-18 4z', 'M148 156l26-26 14 14-26 26-18 4z',
  ],

  // --- 3.2 postura e mobilizzazione ---
  colon: [
    'M44 200V80a20 20 0 0 1 20-20h112a20 20 0 0 1 20 20v100',                      // parete esterna
    'M72 200V102a6 6 0 0 1 6-6h84a6 6 0 0 1 6 6v78',                                // parete interna
    'M58 110h14M58 140h14M58 170h14M90 62v14M120 62v14M150 62v14',                  // austre
    'M196 180c0 22-36 26-46 40s0 22 0 34M168 180c0 14-24 20-30 30',                  // sigma
    'M138 220v18M150 224v18',                                                       // retto
    'pieno:M168 102h28v78c0 22-36 26-46 40l-16-12c12-14 34-18 34-32z',              // discendente e sigma
    'freccia:M182 116v58M170 162l12 14 12-14',                                      // il liquido scende
  ],
  gambe: [
    'M56 30v150a20 20 0 0 0 40 0V30',                                               // gamba sana
    'M50 200h52l8 22H44z',
    'M144 30v20c-18 22-24 60-14 100l4 30a20 20 0 0 0 40 0l4-30c10-40 4-78-14-100V30', // gamba con edema
    'M140 200h52l8 22h-64z',
    'pieno:M136 58c-14 22-18 58-10 94l4 28h36l4-28c8-36 4-72-10-94z',
    'M212 92l16-10M216 116h18M212 140l16 10',                                       // calore
  ],
  tallone: [
    'M14 200h212',                                                                  // il piano del letto
    'M14 96h116a18 18 0 0 1 18 18v10c0 12-8 20-20 20H14',                           // la gamba
    'M148 124v40c0 10 8 18 18 18h30l-6-14h-22a6 6 0 0 1-6-6v-38',                   // il piede
    'pieno:M40 200v-40a10 10 0 0 1 10-10h70a10 10 0 0 1 10 10v40z',                 // il cuscino sotto il polpaccio
    'M40 200v-40a10 10 0 0 1 10-10h70a10 10 0 0 1 10 10v40',
    'freccia:M196 196v-14M186 190l10-12 10 12',                                      // il tallone sollevato
  ],
  telo: [
    'M30 90h180v70H30z', 'M30 120h180M30 150h60M150 150h60',
    'M50 90v-16h20v16M110 90v-16h20v16M170 90v-16h20v16',                            // maniglie
    'M50 160v16h20v-16M110 160v16h20v-16M170 160v16h20v-16',
    'pieno:M30 90h180v70H30z',
    'freccia:M40 206h160M186 196l14 10-14 10',                                      // scorre, non trascina
  ],
  sollevatore: [
    'M60 214V50', 'M60 50l90 40', 'M150 90v26', 'M116 116h68',                       // colonna, braccio, gancio, bilancino
    'M124 116c-8 36 6 56 26 56s34-20 26-56',                                        // imbragatura
    'pieno:M124 116c-8 36 6 56 26 56s34-20 26-56z',
    'M26 214h150', C(40, 218, 8), C(160, 218, 8),                                    // base e ruote
  ],
  disco: [
    'M40 160a80 26 0 1 0 160 0a80 26 0 1 0-160 0',                                   // il disco
    'pieno:M40 160a80 26 0 1 0 160 0a80 26 0 1 0-160 0z',
    'M92 148a14 8 0 1 0 28 0a14 8 0 1 0-28 0M132 148a14 8 0 1 0 28 0a14 8 0 1 0-28 0', // i piedi
    'M106 148V96M146 148V96',                                                        // le gambe
    'freccia:M60 116a80 34 0 0 1 118-12M168 96l14 10-16 8',                          // ruota
  ],
  deambulatore: [
    'M56 214V96a10 10 0 0 1 10-10h108a10 10 0 0 1 10 10v118',                        // telaio
    'M56 150h128', 'M96 214v-64M144 214v-64',                                        // traversa e gambe
    'pieno:M50 80h140v16H50z',                                                       // le impugnature
    C(56, 218, 8), C(184, 218, 8),
  ],
  archetto: [
    'M14 200h212',
    'M66 200v-60a54 54 0 0 1 108 0v60',                                             // l'archetto
    'pieno:M66 200v-60a54 54 0 0 1 108 0v60z',
    'M14 140h52M174 140h52',                                                        // la coperta sollevata
    'M104 200v-44h20l12 26h-20',                                                    // il piede libero
  ],
  bastone: [
    'M116 214V70a22 22 0 0 1 44 0v10',                                              // bastone con impugnatura
    'pieno:M104 202h24v16h-24z',                                                    // il puntale
    'M14 218h212',
  ],
  appoggio: [
    C(120, 44, 22), 'M120 66v66',                                                   // testa e tronco
    'M120 132l28 76', 'M148 208h30',                                                // gamba sana e piede
    'M120 84l-40 42M120 84l44 30',                                                  // le braccia
    'M164 114v100', 'pieno:M154 204h20v14h-20z',                                    // il bastone dal lato sano
    'M14 218h212',
    'freccia:M120 132l-30 76M80 208h30',                                            // l'arto compromesso
  ],
  sollevare: [
    C(96, 48, 20), 'M96 68l-8 62',                                                  // testa e schiena dritta
    'M88 130l46 16', 'M134 146l-8 56', 'M116 202h34',                               // coscia, gamba, piede
    'M94 92l44 32',                                                                 // le braccia al carico
    'M138 124h54v54h-54z', 'pieno:M138 124h54v54h-54z',                             // il carico, vicino
    'M14 218h212',
    'freccia:M216 180v-70M206 122l10-14 10 14',                                     // si solleva con le gambe
  ],
};

// La sagoma per la mappa corporea: 300x620, fronte. Le zone sono campiture
// separate, cosi' ognuna puo' accendersi da sola.
const SAGOMA = {
  linea: [
    C(150, 56, 40),                                                                 // testa
    'M134 94v22M166 94v22',                                                          // collo
    'M96 120h108a22 22 0 0 1 22 22v150H74V142a22 22 0 0 1 22-22z',                   // tronco
    'M74 150c-24 10-42 60-48 140-2 20 4 34 14 40',                                   // braccio sx
    'M226 150c24 10 42 60 48 140 2 20-4 34-14 40',
    'M84 292v210a14 14 0 0 0 28 0V292M188 292v210a14 14 0 0 0 28 0V292',             // gambe
    'M112 502l6 20h-40l10-20M188 502l-6 20h40l-10-20',                                // piedi
    'M150 292v210', 'M74 216h152',                                                   // linea mediana, vita
  ],
  zone: {
    viso:   C(150, 56, 40),
    collo:  'M134 94h32v26h-32z',
    braccia:'M74 150c-24 10-42 60-48 140-2 20 4 34 14 40l22-6c6-70 14-120 12-174zM226 150c24 10 42 60 48 140 2 20-4 34-14 40l-22-6c-6-70-14-120-12-174z',
    torace: 'M96 120h108a22 22 0 0 1 22 22v74H74v-74a22 22 0 0 1 22-22z',
    addome: 'M74 216h152v76H74z',
    gambe:  'M84 292h28v210a14 14 0 0 1-28 0zM188 292h28v210a14 14 0 0 1-28 0z',
    piedi:  'M78 522h40l-6-20h-28zM182 522h40l-4-20h-28z',
    dorso:  'M96 120h108a22 22 0 0 1 22 22v150H74V142a22 22 0 0 1 22-22z',
    sacro:  C(150, 272, 26),
    perineo:'M124 292h52v22h-52z',
  },
};

// ---------- CSS ----------
export const CSS_CLINICA = `
@keyframes accendi{from{opacity:0;transform:scale(.92)}to{opacity:var(--op,.22);transform:none}}
@keyframes scorri{from{stroke-dashoffset:1.1}to{stroke-dashoffset:0}}
@keyframes goccia{0%{opacity:0;transform:translateY(-14px)}30%{opacity:1}100%{opacity:1;transform:translateY(0)}}

.illu .freccia{stroke:var(--acc);stroke-width:8;stroke-dasharray:1 2;stroke-dashoffset:1.1;
               animation:disegna .8s cubic-bezier(.4,0,.2,1) both 1.7s}

/* --- corpo: la sagoma con le zone --- */
.anat{display:flex;gap:70px;align-items:center;min-height:640px;width:100%}
.anat .sag{flex:0 0 auto;display:flex;gap:40px}
.anat .sag svg{height:600px;width:auto;overflow:visible}
.anat .sag .tr{fill:none;stroke:var(--tit);stroke-width:5;stroke-linecap:round;stroke-linejoin:round;
                stroke-dasharray:1 2;stroke-dashoffset:1.1;animation:disegna 1s cubic-bezier(.4,0,.2,1) both;
                animation-delay:calc(.15s + var(--i) * .06s)}
.anat .sag .zona{fill:var(--acc);opacity:0;transform-box:fill-box;transform-origin:center;
                  animation:accendi .5s cubic-bezier(.22,.7,.3,1) forwards}
.anat .sag .zona.spenta{animation:none;opacity:.07;fill:var(--tit)}
.anat .sag .etich{font-size:22px;font-weight:600;fill:var(--sop);text-anchor:middle;letter-spacing:.14em;
                   text-transform:uppercase;opacity:0;animation:appari .5s both 1.4s}
.anat .voci{flex:1;display:flex;flex-direction:column;gap:14px}
.anat .voce{display:flex;gap:26px;align-items:baseline;opacity:0;animation:scivola .5s cubic-bezier(.22,.7,.3,1) forwards}
.anat .voce .n{flex:0 0 64px;height:64px;border-radius:50%;background:var(--tit);color:var(--bg);
                font-size:32px;font-weight:700;display:flex;align-items:center;justify-content:center;align-self:center}
.anat .voce.key .n{background:var(--acc)}
.anat .voce .t{font-size:40px;font-weight:600;color:var(--tit);line-height:1.15}
.anat .voce .d{font-size:27px;line-height:1.3;opacity:.74;margin-top:2px}
.anat .voce.off{opacity:.3;animation:none}
.anat.fitto .voce .t{font-size:34px}.anat.fitto .voce .d{font-size:24px}.anat.fitto .voci{gap:8px}
.anat>.sag svg .zona{opacity:0}
.anat .sag .zona.on{--op:.22}
.anat .sag .zona.key{--op:.34}

/* --- frequenze --- */
.freq{display:flex;flex-direction:column;gap:26px}
.freq .riga{display:grid;grid-template-columns:440px 1fr 250px;gap:34px;align-items:center;
            opacity:0;animation:scivola .5s cubic-bezier(.22,.7,.3,1) forwards}
.freq .riga .t{font-size:40px;font-weight:600;color:var(--tit);line-height:1.15}
.freq .riga .d{font-size:26px;opacity:.74;line-height:1.3;margin-top:4px}
.freq .riga .q{font-size:44px;font-weight:700;color:var(--acc);text-align:right;font-variant-numeric:tabular-nums}
.freq .riga .q small{display:block;font-size:24px;font-weight:500;color:var(--fg);opacity:.8}
.freq .striscia{height:92px;width:100%}
.freq .striscia .asse{stroke:var(--linea);stroke-width:6;stroke-linecap:round}
.freq .striscia .ora{stroke:var(--linea);stroke-width:3}
.freq .striscia .oratxt{font-size:20px;fill:var(--fg);opacity:.6;text-anchor:middle}
.freq .striscia .punto{fill:var(--acc);opacity:0;animation:pop .4s cubic-bezier(.22,.7,.3,1) forwards;
                       transform-box:fill-box;transform-origin:center}
.freq .riga.key .t{color:var(--acc)}
.freq .riga.off{opacity:.28;animation:none}
.freq .riga.off .punto{animation:none;opacity:1}

/* --- percorso --- */
.percorso{position:relative;width:100%}
.percorso svg{width:100%;height:auto;overflow:visible}
.percorso .via{fill:none;stroke:var(--linea);stroke-width:10;stroke-linecap:round}
.percorso .via.on{stroke:var(--tit);stroke-dasharray:1 2;stroke-dashoffset:1.1;
                  animation:scorri 1.6s cubic-bezier(.4,0,.2,1) both .2s}
.percorso .tappa{animation:pop .5s cubic-bezier(.22,.7,.3,1) both;transform-box:fill-box;transform-origin:center}
.percorso .tappa circle{fill:var(--bg);stroke:var(--tit);stroke-width:7}
.percorso .tappa.key circle{fill:var(--acc);stroke:var(--acc)}
.percorso .tappa .num{font-size:38px;font-weight:700;fill:var(--tit);text-anchor:middle;dominant-baseline:central}
.percorso .tappa.key .num{fill:var(--bg)}
.percorso .tappa.off{opacity:.28}
.percorso .tappa foreignObject div{font-family:'Inter',sans-serif;color:var(--fg);text-align:center;line-height:1.16}
.percorso .tappa foreignObject .t{font-size:30px;font-weight:600;color:var(--tit)}
.percorso .tappa.key foreignObject .t{color:var(--acc)}
.percorso .tappa foreignObject .d{font-size:22px;opacity:.74;margin-top:6px;line-height:1.25}

/* --- vap --- */
.vap{display:flex;gap:60px;align-items:center;min-height:620px}
.vap .schema{flex:0 0 900px}
.vap .schema svg{width:900px;height:auto;overflow:visible}
.vap .schema .tr{fill:none;stroke:var(--tit);stroke-width:6;stroke-linecap:round;stroke-linejoin:round;
                 stroke-dasharray:1 2;stroke-dashoffset:1.1;animation:disegna 1s cubic-bezier(.4,0,.2,1) both;
                 animation-delay:calc(.1s + var(--i) * .1s)}
.vap .schema .tubo{stroke:var(--sop);stroke-width:22;stroke-linecap:round;fill:none;stroke-dasharray:1 2;
                   stroke-dashoffset:1.1;animation:disegna 1s cubic-bezier(.4,0,.2,1) both .5s}
.vap .schema .cuffia{fill:var(--bg);stroke:var(--tit);stroke-width:6;opacity:0;animation:appari .4s both 1.2s}
.vap .schema .pozza{fill:var(--acc);opacity:0;animation:appariPozza .6s both 1.45s}
@keyframes appariPozza{from{opacity:0}to{opacity:.55}}
.vap .schema .goccia{fill:var(--acc);opacity:0;animation:goccia .5s ease-in forwards}
.vap .schema .polm{fill:var(--acc);opacity:0;animation:appariPieno .6s both 2.4s}
.vap .schema .lbl{font-size:28px;font-weight:600;fill:var(--tit);opacity:0;animation:appari .4s both}
.vap .schema .lbl.acc{fill:var(--acc)}
.vap .schema .guida{stroke:var(--linea);stroke-width:3;stroke-dasharray:6 8;opacity:0;animation:appari .4s both}
.vap .tx{flex:1;display:flex;flex-direction:column;gap:26px;animation:sali .6s both .5s}
.vap .tx h2{font-size:62px;line-height:1.12}
.vap .tx .sotto{font-size:34px}

/* --- mappa: illustrazione con richiami --- */
.mappa{display:flex;gap:60px;align-items:center;min-height:640px}
.mappa .ill{flex:0 0 700px;position:relative}
.mappa .ill .illu{width:700px;height:700px}
.mappa .ill .pin{position:absolute;width:64px;height:64px;border-radius:50%;background:var(--acc);color:var(--bg);
                 font-size:30px;font-weight:700;display:flex;align-items:center;justify-content:center;
                 transform:translate(-50%,-50%) scale(0);animation:pin .45s cubic-bezier(.22,.7,.3,1) forwards;
                 box-shadow:0 0 0 6px var(--bg)}
@keyframes pin{from{transform:translate(-50%,-50%) scale(0)}to{transform:translate(-50%,-50%) scale(1)}}
.mappa .voci{flex:1;display:flex;flex-direction:column;gap:12px}
.mappa .voce{display:flex;gap:22px;align-items:baseline;opacity:0;animation:scivola .5s cubic-bezier(.22,.7,.3,1) forwards}
.mappa .voce .n{flex:0 0 52px;height:52px;border-radius:50%;background:var(--acc);color:var(--bg);
                font-size:26px;font-weight:700;display:flex;align-items:center;justify-content:center;align-self:center}
.mappa .voce .t{font-size:34px;font-weight:600;color:var(--tit);line-height:1.15}
.mappa .voce .d{font-size:24px;line-height:1.3;opacity:.74}
.mappa.fitta .voce .t{font-size:30px}.mappa.fitta .voce .d{font-size:22px}.mappa.fitta .voci{gap:6px}

/* --- bivio --- */
.bivio{width:100%}
.bivio svg{width:100%;height:auto;overflow:visible}
.bivio .ramo{fill:none;stroke:var(--tit);stroke-width:8;stroke-linecap:round;stroke-dasharray:1 2;stroke-dashoffset:1.1;
             animation:scorri .8s cubic-bezier(.4,0,.2,1) both}
.bivio .ramo.acc{stroke:var(--acc)}
.bivio .nodo{animation:sali .55s cubic-bezier(.22,.7,.3,1) both}
.bivio .nodo rect{fill:var(--bg);stroke:var(--linea);stroke-width:4;rx:26}
.bivio .nodo.radice rect{fill:var(--tit);stroke:var(--tit)}
.bivio .nodo.key rect{stroke:var(--acc);stroke-width:5;fill:color-mix(in srgb,var(--acc) 8%,var(--bg))}
.bivio .nodo foreignObject div{font-family:'Inter',sans-serif;display:flex;flex-direction:column;justify-content:center;
                               height:100%;padding:0 40px;line-height:1.18}
.bivio .nodo foreignObject .t{font-size:40px;font-weight:600;color:var(--tit)}
.bivio .nodo.radice foreignObject .t{color:var(--bg);text-align:center;font-size:44px}
.bivio .nodo.key foreignObject .t{color:var(--acc)}
.bivio .nodo foreignObject .d{font-size:26px;opacity:.78;margin-top:10px;color:var(--fg)}
.bivio .quando{font-size:26px;font-weight:600;fill:var(--sop);letter-spacing:.06em;text-transform:uppercase;
               opacity:0;animation:appari .4s both}
.corpo,.freq,.percorso,.vap,.mappa,.bivio{animation:none}

/* --- posizioni: il letto visto di lato --- */
.posiz{display:flex;gap:18px;width:100%}
.posiz .card{flex:1;display:flex;flex-direction:column;gap:14px;opacity:0;animation:sali .55s cubic-bezier(.22,.7,.3,1) forwards}
.posiz .card.off{opacity:.26;animation:none}
.posiz .card svg{width:100%;height:auto;overflow:visible}
.posiz .card .letto{fill:none;stroke:var(--linea);stroke-width:8;stroke-linecap:round;stroke-linejoin:round}
.posiz .card .pers{fill:none;stroke:var(--tit);stroke-width:14;stroke-linecap:round;stroke-linejoin:round;
                   stroke-dasharray:1 2;stroke-dashoffset:1.1;animation:disegna .9s cubic-bezier(.4,0,.2,1) both;
                   animation-delay:calc(var(--t0) + var(--i) * .1s)}
.posiz .card .testa{fill:var(--bg);stroke:var(--tit);stroke-width:10;opacity:0;animation:pop .4s both;animation-delay:var(--t0)}
.posiz .card .naso{fill:none;stroke:var(--tit);stroke-width:6;stroke-linecap:round;opacity:0;animation:appari .3s both;animation-delay:calc(var(--t0) + .5s)}
.posiz .card .punto{fill:var(--acc);opacity:0;animation:pop .4s cubic-bezier(.22,.7,.3,1) both;animation-delay:calc(var(--t0) + 1s)}
.posiz .card .ang{fill:none;stroke:var(--acc);stroke-width:6;stroke-dasharray:1 2;stroke-dashoffset:1.1;
                  animation:disegna .5s both;animation-delay:calc(var(--t0) + .9s)}
.posiz .card .angtxt{font-size:30px;font-weight:700;fill:var(--acc);opacity:0;animation:appari .3s both;animation-delay:calc(var(--t0) + 1.2s)}
.posiz .card .tav{fill:var(--bg);stroke:var(--linea);stroke-width:8}
.posiz .card .num{flex:0 0 auto;width:60px;height:60px;border-radius:50%;background:var(--tit);color:var(--bg);
                  font-size:30px;font-weight:700;display:flex;align-items:center;justify-content:center}
.posiz .card.key .num{background:var(--acc)}
.posiz .card .t{font-size:36px;font-weight:600;color:var(--tit);line-height:1.12}
.posiz .card.key .t{color:var(--acc)}
.posiz .card .d{font-size:24px;line-height:1.28;opacity:.76;margin-top:6px}
.posiz.n5 .card .t{font-size:31px}.posiz.n5 .card .d{font-size:22px}
.posiz.n2 .card .t{font-size:44px}.posiz.n2 .card .d{font-size:28px}
.posiz.n2{gap:60px}.posiz.n2 .card{flex-direction:row;align-items:center;gap:36px;min-width:0}.posiz.n2 .card svg{flex:0 0 400px;width:400px}

/* --- apparati: la sagoma con gli organi --- */
.anat .sag .org{fill:none;stroke:var(--acc);stroke-width:6;stroke-linecap:round;stroke-linejoin:round;
                stroke-dasharray:1 2;stroke-dashoffset:1.1;animation:disegna .8s cubic-bezier(.4,0,.2,1) both}
.anat .sag .org.pieno{fill:var(--acc);stroke:none;opacity:0;animation:appariPozza .5s both}
.anat .sag .pin{opacity:0;animation:pop .4s cubic-bezier(.22,.7,.3,1) both;transform-box:fill-box;transform-origin:center}
.anat .sag .pin circle{fill:var(--acc);stroke:var(--bg);stroke-width:4}
.anat .sag .pin text{font-size:24px;font-weight:700;fill:var(--bg);text-anchor:middle;dominant-baseline:central}
.anat .sag .guida{stroke:var(--acc);stroke-width:3;stroke-dasharray:6 8;opacity:0;animation:appari .3s both}
.anat.appa .sag svg{height:620px}
.anat.appa .voci{gap:6px}.anat.appa .voce .t{font-size:32px}.anat.appa .voce .d{font-size:23px}
.anat.appa .voce .n{flex-basis:54px;height:54px;font-size:26px}

/* --- curva: forza e tempo --- */
.curva{width:100%}
.curva svg{width:100%;height:auto;overflow:visible}
.curva .asse{stroke:var(--linea);stroke-width:6;stroke-linecap:round}
.curva .assetxt{font-size:28px;font-weight:600;fill:var(--sop);letter-spacing:.14em;text-transform:uppercase}
.curva .area{fill:var(--acc);opacity:0;animation:appariPieno 1s both 1.6s}
.curva .linea{fill:none;stroke:var(--tit);stroke-width:12;stroke-linecap:round;stroke-dasharray:1 2;stroke-dashoffset:1.1;
              animation:scorri 2.2s cubic-bezier(.4,0,.2,1) both .3s}
.curva .linea.acc{stroke:var(--acc)}
.curva .nota{opacity:0;animation:sali .5s both}
.curva .nota .t{font-size:40px;font-weight:700;fill:var(--tit)}
.curva .nota.key .t{fill:var(--acc)}
.curva .nota .d{font-size:26px;fill:var(--fg);opacity:.76}
.curva .tick{stroke:var(--linea);stroke-width:4}
.curva .fascia{fill:var(--tit);opacity:.05}

/* --- forze: pressione, frizione, taglio --- */
.forze{display:flex;gap:30px;width:100%}
.forze .pan{flex:1;display:flex;flex-direction:column;gap:16px;opacity:0;animation:sali .55s cubic-bezier(.22,.7,.3,1) forwards}
.forze .pan.off{opacity:.26;animation:none}
.forze .pan svg{width:100%;height:auto;overflow:visible}
.forze .letto{stroke:var(--linea);stroke-width:8;stroke-linecap:round}
.forze .lenz{fill:var(--tit);opacity:.06}
.forze .cute{fill:none;stroke:var(--tit);stroke-width:7;stroke-linejoin:round}
.forze .sotto{fill:var(--tit);opacity:.1}
.forze .osso{fill:var(--bg);stroke:var(--tit);stroke-width:7}
.forze .danno{fill:var(--acc);opacity:0;animation:appariPozza .5s both}
.forze .fr{fill:none;stroke:var(--acc);stroke-width:10;stroke-linecap:round;stroke-linejoin:round;
           stroke-dasharray:1 2;stroke-dashoffset:1.1;animation:disegna .6s both}
.forze .mossa{animation-duration:.9s;animation-timing-function:cubic-bezier(.4,0,.2,1);animation-fill-mode:both}
@keyframes spingiGiu{from{transform:none}to{transform:translateY(34px)}}
@keyframes scivolaDx{from{transform:none}to{transform:translateX(70px)}}
.forze .mossa.giu{animation-name:spingiGiu}.forze .mossa.dx{animation-name:scivolaDx}
.forze .pan .num{width:60px;height:60px;border-radius:50%;background:var(--tit);color:var(--bg);font-size:30px;font-weight:700;
                 display:flex;align-items:center;justify-content:center}
.forze .pan.key .num{background:var(--acc)}
.forze .pan .t{font-size:38px;font-weight:600;color:var(--tit);line-height:1.12}
.forze .pan.key .t{color:var(--acc)}
.forze .pan .d{font-size:25px;line-height:1.3;opacity:.76;margin-top:6px}

/* --- triade --- */
.triade{width:100%}
.triade svg{width:100%;height:auto;overflow:visible}
.triade .lato{fill:none;stroke:var(--tit);stroke-width:8;stroke-linecap:round;stroke-dasharray:1 2;stroke-dashoffset:1.1;
              animation:scorri .7s cubic-bezier(.4,0,.2,1) both}
.triade .nodo{animation:sali .55s cubic-bezier(.22,.7,.3,1) both}
.triade .nodo rect{fill:var(--bg);stroke:var(--linea);stroke-width:4;rx:26}
.triade .nodo.key rect{stroke:var(--acc);stroke-width:6;fill:color-mix(in srgb,var(--acc) 8%,var(--bg))}
.triade .nodo.off{opacity:.3}
.triade .nodo foreignObject div{font-family:'Inter',sans-serif;display:flex;flex-direction:column;justify-content:center;
                                align-items:center;text-align:center;height:100%;padding:0 30px;line-height:1.16}
.triade .nodo foreignObject .t{font-size:40px;font-weight:600;color:var(--tit)}
.triade .nodo.key foreignObject .t{color:var(--acc)}
.triade .nodo foreignObject .d{font-size:25px;opacity:.78;margin-top:8px;color:var(--fg)}
.triade .centro{animation:pop .6s cubic-bezier(.22,.7,.3,1) both 1.5s;transform-box:fill-box;transform-origin:center}
.triade .centro circle{fill:var(--acc)}
.triade .centro text{font-size:44px;font-weight:700;fill:var(--bg);text-anchor:middle;dominant-baseline:central}
.posiz,.curva,.forze,.triade{animation:none}
`;

// ---------- pezzi ----------
const sagoma = (lato, zone, attive, keys, ordine, t0, etich) => {
  let k = 0;
  const linea = SAGOMA.linea.map(p => `<path class="tr" style="--i:${k++}" pathLength="1" d="${p}"/>`).join('');
  const z = Object.entries(SAGOMA.zone).filter(([n]) => zone.includes(n)).map(([n, d]) => {
    const i = ordine.indexOf(n), on = attive.includes(n);
    return `<path class="zona ${on ? 'on' : 'spenta'} ${keys.includes(n) ? 'key' : ''}" d="${d}"
      style="animation-delay:${num(t0 + Math.max(i, 0) * .18)}s"/>`;
  }).join('');
  return `<svg viewBox="-10 -6 320 640">${linea}${z}
    <text class="etich" x="150" y="600">${etich}</text></svg>`;
};


// Il letto visto di lato, 400x260: la testa a sinistra. Ogni posizione e' un
// elenco di tratti della persona; il letto e' disegnato a parte.
const ORGANI = {
  cute:    { py: 300, lato: 'sx', pin: [40, 302], tratti: ['M150 246a26 26 0 1 0 0 52a26 26 0 1 0 0-52', 'M84 508a12 12 0 1 0 0 24a12 12 0 1 0 0-24M216 508a12 12 0 1 0 0 24a12 12 0 1 0 0-24', 'M40 292a10 10 0 1 0 0 20a10 10 0 1 0 0-20M260 292a10 10 0 1 0 0 20a10 10 0 1 0 0-20', 'pieno:' + C(150, 272, 20)] },
  muscolo: { py: 400, lato: 'sx', pin: [98, 400], tratti: ['M98 318v154', 'M84 316a14 10 0 1 0 28 0a14 10 0 1 0-28 0M84 474a14 10 0 1 0 28 0a14 10 0 1 0-28 0', 'M226 200c-8 24-8 48 0 72'] },
  cardio:  { py: 140, lato: 'dx', pin: [166, 172], tratti: ['M166 198c-22-14-32-28-32-40a14 14 0 0 1 28-4 14 14 0 0 1 28 4c0 12-10 26-24 40z', 'M202 300v200', 'pieno:' + C(202, 420, 10)] },
  resp:    { py: 170, lato: 'sx', pin: [116, 196], tratti: ['M150 120v30', 'M138 150c-24 6-40 40-40 78 0 16 10 24 22 24 12 0 18-10 18-28z', 'M162 150c24 6 40 40 40 78 0 16-10 24-22 24-12 0-18-10-18-28z'] },
  gastro:  { py: 240, lato: 'sx', pin: [150, 256], tratti: ['M112 234c26-10 50 10 76 0M112 254c26-10 50 10 76 0M112 274c26-10 50 10 76 0'] },
  urin:    { py: 330, lato: 'dx', pin: [150, 300], tratti: ['M118 214a10 14 0 1 0 0 28a10 14 0 1 0 0-28M182 214a10 14 0 1 0 0 28a10 14 0 1 0 0-28', C(150, 296, 14), 'pieno:' + C(150, 296, 10)] },
  metab:   { py: 250, lato: 'dx', pin: [256, 262], tratti: ['M256 236v56', 'M244 280l12 14 12-14'] },
  neuro:   { py: 56, lato: 'dx', pin: [150, 56], tratti: ['M128 54c0-16 10-26 22-26s22 10 22 26-10 26-22 26-22-10-22-26z', 'M150 28v52', 'M134 44c8 4 8 12 0 16M166 44c-8 4-8 12 0 16'] },
};

const letto = p => {
  const L = { piano: 'M40 200h320', gambe: 'M70 200v22M330 200v22' };
  const testa = (x, y) => `<circle class="testa" cx="${x}" cy="${y}" r="20"/>`;
  const naso = (x, y, su) => `<path class="naso" d="M${x - 8} ${y}c4 ${su ? -7 : 7} 12 ${su ? -7 : 7} 16 0"/>`;
  const P = (...d) => d.map((p, i) => `<path class="pers" style="--i:${i}" pathLength="1" d="${p}"/>`).join('');
  const punto = (x, y) => `<circle class="punto" cx="${x}" cy="${y}" r="11"/>`;
  const arco = (x, y, a, txt) => `<path class="ang" pathLength="1" d="M${x + 60} ${y}A60 60 0 0 0 ${num(x + 60 * Math.cos(a * Math.PI / 180))} ${num(y - 60 * Math.sin(a * Math.PI / 180))}"/>
    <text class="angtxt" x="${x + 70}" y="${y - 22}">${txt}</text>`;
  const seduto = a => {     // schienale inclinato di a gradi, tronco appoggiato
    const r = a * Math.PI / 180, hx = 170, hy = 184;
    const sx = hx - 96 * Math.cos(r), sy = hy - 96 * Math.sin(r);
    const bx = 150 - 120 * Math.cos(r), by = 200 - 120 * Math.sin(r);
    return { schienale: `M150 200L${num(bx)} ${num(by)}`, tronco: `M${hx} ${hy}L${num(sx)} ${num(sy)}`,
             testa: [num(sx - 20 * Math.cos(r)), num(sy - 20 * Math.sin(r))] };
  };
  const base = (schienale) => `<path class="letto" d="${L.piano}${schienale ? schienale : ''}"/><path class="letto" d="${L.gambe}"/>`;
  switch (p) {
    case 'supina': return base() + testa(92, 176) + naso(92, 148, true) + P('M116 180h190', 'M306 180v-26') + punto(230, 190) + punto(322, 190);
    case 'prona': return base() + testa(92, 176) + naso(92, 204, false) + P('M116 180h190', 'M306 180v-26');
    case 'laterale': return base() + testa(92, 176) + naso(80, 176, true) + P('M116 180h100', 'M216 180l36-48', 'M252 132l56 46', 'M216 180h90', 'M116 180l-14-30', 'M180 180l40-30');
    case 'sims': return base() + testa(92, 176) + naso(92, 204, false) + P('M116 180h100', 'M216 180l28-60', 'M244 120l56 40', 'M216 180h90', 'M140 180l-30 40');
    case 'fowler': { const s = seduto(55); return base(s.schienale) + testa(...s.testa) + P(s.tronco, 'M170 184h140', 'M310 184v-26', 'M150 150l40 26') + arco(150, 200, 55, '45–60°'); }
    case 'semifowler': { const s = seduto(38); return base(s.schienale) + testa(...s.testa) + P(s.tronco, 'M170 184h140', 'M310 184v-26', 'M140 160l50 18') + arco(150, 200, 38, '30–45°'); }
    case 'ortopnoica': return base('M150 200V80') + `<path class="tav" d="M240 120h120v80"/>` + testa(216, 74) + P('M170 184l42-90', 'M170 184h140', 'M310 184v-26', 'M200 120l50 10') + arco(150, 200, 90, '90°');
    case 'trend': return `<g transform="rotate(-10 200 200)">${base()}${testa(92, 176)}${naso(92, 148, true)}${P('M116 180h190', 'M306 180v-26')}</g>` + `<path class="ang" pathLength="1" d="M40 104h320"/><text class="angtxt" x="46" y="94">testa in basso</text>`;
    case 'antitrend': return `<g transform="rotate(10 200 200)">${base()}${testa(92, 176)}${naso(92, 148, true)}${P('M116 180h190', 'M306 180v-26')}</g>` + `<path class="ang" pathLength="1" d="M40 104h320"/><text class="angtxt" x="46" y="94">testa in alto</text>`;
    case 'seduto': return `<path class="letto" d="M30 150h150M50 150v90M170 150v90M20 240h360"/>` + testa(176, 44) + P('M176 66v80', 'M176 146h60', 'M236 146v94', 'M236 240h34', 'M176 96l40 40') + punto(250, 240);
    case 'inpiedi': return `<path class="letto" d="M30 150h100M50 150v90M120 150v90M20 240h360"/>` + testa(250, 44) + P('M250 66v84', 'M250 150l-26 90', 'M250 150l26 90', 'M250 90l-30 54', 'M250 90l30 54') + punto(224, 240) + punto(276, 240);
  }
  return base();
};

export const CORPI_CLINICA = {

  // La mappa corporea. voci: [{z:'viso', t, d, key}] — z e' la zona; le zone
  // non presenti in «attive» restano spente (grigie). lato: 'fronte' | 'retro' | 'entrambi'.
  corpo: d => {
    const voci = d.voci;
    const zs = v => [].concat(v.z);
    const ordine = voci.flatMap(zs);
    const attive = (d.attive ?? voci.map((_, i) => i)).flatMap(i => zs(voci[i]));
    const keys = voci.filter(v => v.key).flatMap(zs);
    const fronte = ['viso', 'collo', 'braccia', 'torace', 'addome', 'gambe', 'piedi', 'perineo'];
    const retro = ['dorso', 'sacro'];
    const lati = d.lato === 'entrambi' ? ['fronte', 'retro'] : [d.lato ?? 'fronte'];
    const sag = lati.map(l => sagoma(l, l === 'fronte' ? fronte.filter(z => ordine.includes(z)) : retro.filter(z => ordine.includes(z)),
      attive, keys, voci.map(zs), 1.1, l === 'fronte' ? 'fronte' : 'dorso')).join('');
    return `<div class="anat ${voci.length > 6 ? 'fitto' : ''}"><div class="sag">${sag}</div>
      <div class="voci">${voci.map((v, i) => `<div class="voce ${v.key ? 'key' : ''} ${zs(v).some(z => attive.includes(z)) ? '' : 'off'}"
          style="animation-delay:${num(.5 + i * .16)}s"><div class="n">${v.n ?? i + 1}</div>
          <div><div class="t">${acc(v.t)}</div>${v.d ? `<div class="d">${acc(v.d)}</div>` : ''}</div></div>`).join('')}</div></div>`;
  },

  // Le strisce delle 24 ore. righe: [{t, d, ogni:4, q:'ogni 4-6 h', key}] oppure {volte:2}.
  frequenze: d => {
    const W = 800, x0 = 10, x1 = W - 10, y = 46;
    const X = h => x0 + (x1 - x0) * h / 24;
    const attive = d.attive ?? d.righe.map((_, i) => i);
    return `<div class="freq">${d.righe.map((r, i) => {
      const t0 = .3 + i * .22, on = attive.includes(i);
      const ore = r.ogni ? Array.from({ length: Math.floor(24 / r.ogni) + 1 }, (_, k) => k * r.ogni).filter(h => h <= 24)
                         : Array.from({ length: r.volte }, (_, k) => 24 / r.volte * (k + .5));
      return `<div class="riga ${r.key ? 'key' : ''} ${on ? '' : 'off'}" style="animation-delay:${num(t0)}s">
        <div><div class="t">${acc(r.t)}</div>${r.d ? `<div class="d">${acc(r.d)}</div>` : ''}</div>
        <svg class="striscia" viewBox="0 0 ${W} 92">
          <line class="asse" x1="${x0}" y1="${y}" x2="${x1}" y2="${y}"/>
          ${[0, 6, 12, 18, 24].map(h => `<line class="ora" x1="${num(X(h))}" y1="${y - 12}" x2="${num(X(h))}" y2="${y + 12}"/>
            <text class="oratxt" x="${num(X(h))}" y="${y + 40}">${h}</text>`).join('')}
          ${ore.map((h, k) => `<circle class="punto" cx="${num(X(h))}" cy="${y}" r="14"
              style="animation-delay:${num(t0 + .35 + k * (1.1 / Math.max(ore.length, 1)))}s"/>`).join('')}
        </svg>
        <div class="q">${r.q}${r.qd ? `<small>${r.qd}</small>` : ''}</div></div>`;
    }).join('')}</div>`;
  },

  // Tappe lungo una linea. tappe: [{t, d, key}], attive: indici accesi (default tutti).
  percorso: d => {
    const n = d.tappe.length, W = 1656, H = n > 5 ? 660 : 400;
    const righe = n > 5 ? 2 : 1, perRiga = Math.ceil(n / righe);
    const pts = d.tappe.map((_, i) => {
      const r = Math.floor(i / perRiga), c = i % perRiga;
      const cc = r % 2 ? perRiga - 1 - c : c;                      // a serpentina
      const x = 130 + cc * ((W - 260) / (perRiga - 1)), y = righe === 1 ? 110 : 90 + r * 330;
      return [x, y];
    });
    const via = pts.map(([x, y], i) => {
      if (i === 0) return `M${num(x)} ${num(y)}`;
      const [px, py] = pts[i - 1];
      return py === y ? `L${num(x)} ${num(y)}` : `C${num(px)} ${num(py + 165)} ${num(x)} ${num(y - 165)} ${num(x)} ${num(y)}`;
    }).join(' ');
    const attive = d.attive ?? d.tappe.map((_, i) => i);
    return `<div class="percorso"><svg class="fig gfx" viewBox="0 0 ${W} ${H}">
      <path class="via" d="${via}"/><path class="via on" pathLength="1" d="${via}"/>
      ${d.tappe.map((t, i) => { const [x, y] = pts[i], sotto = true;
        return `<g class="tappa ${t.key ? 'key' : ''} ${attive.includes(i) ? '' : 'off'}" style="animation-delay:${num(.35 + i * (1.5 / n))}s">
          <circle cx="${num(x)}" cy="${num(y)}" r="44"/><text class="num" x="${num(x)}" y="${num(y)}">${i + 1}</text>
          <foreignObject x="${num(x - 130)}" y="${num(sotto ? y + 62 : y - 62 - 150)}" width="260" height="150">
            <div xmlns="http://www.w3.org/1999/xhtml" style="${sotto ? '' : 'display:flex;flex-direction:column;justify-content:flex-end;height:150px'}">
              <div class="t">${piano(t.t)}</div>${t.d ? `<div class="d">${piano(t.d)}</div>` : ''}</div></foreignObject></g>`; }).join('')}
    </svg></div>`;
  },

  // Il meccanismo della VAP: profilo, tubo, cuffia, secrezioni sopra la cuffia, microaspirazione.
  vap: d => {
    // Le vie aeree viste di fronte, schematiche: bocca in alto, faringe e
    // trachea, i due polmoni. Dentro, il tubo con la cuffia; sopra la cuffia
    // la pozza di secrezioni, e le gocce che la superano.
    const tratti = [
      'M150 60c40-24 90-30 120-30s80 6 120 30',                                    // labbra
      'M190 60c-10 90-6 190 10 300', 'M350 60c10 90 6 190-10 300',                  // faringe e trachea
      'M200 360c-70 20-120 90-130 200-4 44 12 66 46 66 40 0 68-30 80-90V360z',     // polmone sx
      'M340 360c70 20 120 90 130 200 4 44-12 66-46 66-40 0-68-30-80-90V360z',      // polmone dx
      'M210 380c-30 30-50 70-56 120M330 380c30 30 50 70 56 120',                   // bronchi
    ];
    let k = 0;
    const lbl = (x, y, t, cls, del) => `<text class="lbl ${cls}" x="${x}" y="${y}" style="animation-delay:${del}s">${piano(t)}</text>`;
    return `<div class="vap"><div class="schema"><svg viewBox="0 0 900 660">
      ${tratti.map(p => `<path class="tr" style="--i:${k++}" pathLength="1" d="${p}"/>`).join('')}
      <path class="tubo" pathLength="1" d="M270 20v410"/>
      <path class="pozza" d="M200 236c10-14 130-14 140 0v40c-10 10-130 10-140 0z"/>
      <ellipse class="cuffia" cx="270" cy="300" rx="70" ry="28"/>
      ${[0, 1, 2, 3].map(i => `<circle class="goccia" cx="${[212, 330, 226, 316][i]}" cy="${[330, 344, 372, 386][i]}" r="8" style="animation-delay:${num(1.9 + i * .15)}s"/>`).join('')}
      <path class="polm" d="M340 360c70 20 120 90 130 200 4 44-12 66-46 66-40 0-68-30-80-90V360z"/>
      <path class="polm" d="M200 360c-70 20-120 90-130 200-4 44 12 66 46 66 40 0 68-30 80-90V360z"/>
      <line class="guida" x1="342" y1="250" x2="470" y2="200" style="animation-delay:1.6s"/>
      ${lbl(478, 196, d.e1 ?? 'secrezioni colonizzate', 'acc', 1.6)}
      ${lbl(478, 230, d.e1b ?? 'ristagnano sopra la cuffia', '', 1.6)}
      <line class="guida" x1="342" y1="300" x2="470" y2="300" style="animation-delay:1.3s"/>
      ${lbl(478, 308, d.e2 ?? 'la cuffia del tubo', '', 1.3)}
      <line class="guida" x1="330" y1="380" x2="470" y2="400" style="animation-delay:2.1s"/>
      ${lbl(478, 408, d.e3 ?? 'microaspirazione', 'acc', 2.1)}
      <line class="guida" x1="440" y1="540" x2="500" y2="540" style="animation-delay:2.5s"/>
      ${lbl(508, 548, d.e4 ?? 'polmonite', 'acc', 2.5)}
    </svg></div>
    <div class="tx"><h2>${acc(d.titolo)}</h2>${d.sotto ? `<div class="sotto">${acc(d.sotto)}</div>` : ''}</div></div>`;
  },

  // Un'illustrazione con i richiami numerati. punti: [{x, y, t, d}] in coordinate 0-240.
  mappa: d => {
    const ill = illustrazioneClinica(d.illu);
    return `<div class="mappa ${d.punti.length > 6 ? 'fitta' : ''}"><div class="ill">${ill}
      ${d.punti.map((p, i) => `<div class="pin" style="left:${num(p.x / 240 * 100)}%;top:${num(p.y / 240 * 100)}%;animation-delay:${num(1.3 + i * .14)}s">${i + 1}</div>`).join('')}</div>
      <div class="voci">${d.punti.map((p, i) => `<div class="voce" style="animation-delay:${num(.5 + i * .14)}s"><div class="n">${i + 1}</div>
        <div><div class="t">${acc(p.t)}</div>${p.d ? `<div class="d">${acc(p.d)}</div>` : ''}</div></div>`).join('')}</div></div>`;
  },


  // Il letto visto di lato, una card per posizione. voci: [{p:'supina'|'prona'|
  // 'laterale'|'sims'|'fowler'|'semifowler'|'ortopnoica'|'trend'|'antitrend'|
  // 'seduto'|'inpiedi', t, d, key}], attive: indici accesi.
  posizioni: d => {
    const attive = d.attive ?? d.voci.map((_, i) => i);
    const n = d.voci.length;
    return `<div class="posiz n${n}">${d.voci.map((v, i) => {
      const on = attive.includes(i), t0 = .3 + i * .22;
      return `<div class="card ${v.key ? 'key' : ''} ${on ? '' : 'off'}" style="animation-delay:${num(t0)}s;--t0:${num(t0 + .2)}s">
        <svg viewBox="0 0 400 236"><g transform="translate(-40 -32) scale(1.2)">${letto(v.p)}</g></svg>
        <div style="display:flex;gap:18px;align-items:flex-start"><div class="num">${i + 1}</div>
        <div><div class="t">${acc(v.t)}</div>${v.d ? `<div class="d">${acc(v.d)}</div>` : ''}</div></div></div>`;
    }).join('')}</div>`;
  },

  // La sagoma con gli apparati che si accendono. voci: [{k:'cute'|'muscolo'|
  // 'cardio'|'resp'|'gastro'|'urin'|'metab'|'neuro', t, d, key}], attive.
  apparati: d => {
    const attive = d.attive ?? d.voci.map((_, i) => i);
    let k = 0;
    const linea = SAGOMA.linea.map(p => `<path class="tr" style="--i:${k++}" pathLength="1" d="${p}"/>`).join('');
    const organi = d.voci.map((v, i) => {
      if (!attive.includes(i)) return '';
      const o = ORGANI[v.k]; if (!o) return '';
      const t0 = 1.1 + i * .16;
      const px = o.lato === 'dx' ? 372 : -72, py = o.py ?? o.pin[1];
      return o.tratti.map((p, j) => p.startsWith('pieno:')
          ? `<path class="org pieno" d="${p.slice(6)}" style="animation-delay:${num(t0 + .3)}s"/>`
          : `<path class="org" pathLength="1" d="${p}" style="animation-delay:${num(t0 + j * .08)}s"/>`).join('') +
        `<line class="guida" x1="${px}" y1="${py}" x2="${o.pin[0]}" y2="${o.pin[1]}" style="animation-delay:${num(t0 + .4)}s"/>
         <g class="pin" style="animation-delay:${num(t0 + .5)}s"><circle cx="${px}" cy="${py}" r="22"/>
         <text x="${px}" y="${py + 1}">${i + 1}</text></g>`;
    }).join('');
    return `<div class="anat appa"><div class="sag"><svg viewBox="-100 -6 500 640">${linea}${organi}</svg></div>
      <div class="voci">${d.voci.map((v, i) => `<div class="voce ${v.key ? 'key' : ''} ${attive.includes(i) ? '' : 'off'}"
          style="animation-delay:${num(.5 + i * .14)}s"><div class="n">${i + 1}</div>
          <div><div class="t">${acc(v.t)}</div>${v.d ? `<div class="d">${acc(v.d)}</div>` : ''}</div></div>`).join('')}</div></div>`;
  },

  // La curva che scende in fretta e risale piano. note: [{t, d, key}] — la prima
  // sul tratto in discesa, la seconda su quello in salita.
  curva: d => {
    const [a, b] = d.note;
    return `<div class="curva"><svg class="fig gfx" viewBox="0 0 1656 560">
      <rect class="fascia" x="130" y="40" width="330" height="430"/>
      <line class="asse" x1="130" y1="470" x2="1610" y2="470"/><line class="asse" x1="130" y1="470" x2="130" y2="40"/>
      <text class="assetxt" x="150" y="512">${piano(d.x1 ?? 'giorni')}</text>
      <text class="assetxt" x="900" y="512" text-anchor="middle">${piano(d.x2 ?? 'settimane')}</text>
      <text class="assetxt" transform="translate(92 260) rotate(-90)" text-anchor="middle">${piano(d.y ?? 'forza')}</text>
      <line class="tick" x1="460" y1="470" x2="460" y2="40" stroke-dasharray="8 12"/>
      <path class="area" d="M130 110C260 130 360 380 460 400C760 420 1250 300 1590 150V470H130z"/>
      <path class="linea acc" pathLength="1" d="M130 110C260 130 360 380 460 400"/>
      <path class="linea" pathLength="1" d="M460 400C760 420 1250 300 1590 150" style="animation-delay:1s"/>
      <g class="nota ${a.key ? 'key' : ''}" style="animation-delay:1.1s"><text class="t" x="500" y="120">${piano(a.t)}</text>
        ${a.d ? `<text class="d" x="500" y="162">${piano(a.d)}</text>` : ''}</g>
      <g class="nota ${b.key ? 'key' : ''}" style="animation-delay:2.2s"><text class="t" x="1590" y="110" text-anchor="end">${piano(b.t)}</text>
        ${b.d ? `<text class="d" x="1590" y="152" text-anchor="end">${piano(b.d)}</text>` : ''}</g>
    </svg></div>`;
  },

  // Le tre forze sulla stessa sezione: osso, tessuti, cute, lenzuolo.
  // voci: [{k:'pressione'|'frizione'|'taglio', t, d, key}], attive.
  forze: d => {
    const attive = d.attive ?? d.voci.map((_, i) => i);
    const sez = (k, t0) => {
      const osso = `<circle class="osso" cx="250" cy="196" r="54"/>`;
      const cute = `<path class="cute" d="M40 262h420"/>`, sotto = `<rect class="sotto" x="40" y="262" width="420" height="78"/>`;
      const letto = `<rect class="lenz" x="20" y="340" width="460" height="30"/><line class="letto" x1="20" y1="340" x2="480" y2="340"/>`;
      const del = `style="animation-delay:${num(t0)}s"`;
      if (k === 'pressione') return `${letto}${sotto}${cute}
        <ellipse class="danno" cx="250" cy="304" rx="70" ry="28" style="animation-delay:${num(t0 + .6)}s"/>
        <g class="mossa giu" ${del}>${osso}<path class="fr" pathLength="1" d="M250 70v60M228 110l22 24 22-24" style="animation-delay:${num(t0 - .5)}s"/></g>`;
      if (k === 'frizione') return `${letto}
        <g class="mossa dx" ${del}>${sotto}${cute}${osso}<path class="fr" pathLength="1" d="M90 120h110M176 100l24 20-24 20" style="animation-delay:${num(t0 - .5)}s"/></g>
        <rect class="danno" x="150" y="330" width="220" height="12" rx="6" style="animation-delay:${num(t0 + .6)}s"/>`;
      return `${letto}${cute}
        <g class="mossa dx" ${del}><rect class="sotto" x="40" y="270" width="420" height="70"/>${osso}
          <path class="fr" pathLength="1" d="M90 120h110M176 100l24 20-24 20" style="animation-delay:${num(t0 - .5)}s"/></g>
        <rect class="danno" x="150" y="258" width="220" height="14" rx="7" style="animation-delay:${num(t0 + .6)}s"/>`;
    };
    return `<div class="forze">${d.voci.map((v, i) => {
      const on = attive.includes(i), t0 = .4 + i * .3;
      return `<div class="pan ${v.key ? 'key' : ''} ${on ? '' : 'off'}" style="animation-delay:${num(t0)}s">
        <svg viewBox="0 0 500 390">${on ? sez(v.k, t0 + 1.1) : sez(v.k, 99)}</svg>
        <div style="display:flex;gap:18px;align-items:flex-start"><div class="num">${i + 1}</div>
        <div><div class="t">${acc(v.t)}</div>${v.d ? `<div class="d">${acc(v.d)}</div>` : ''}</div></div></div>`;
    }).join('')}</div>`;
  },

  // Tre nodi ai vertici, il nome al centro. nodi: [{t, d, key}], attive.
  triade: d => {
    const attive = d.attive ?? d.nodi.map((_, i) => i);
    const P = [[828, 120], [300, 480], [1356, 480]], W = 440, H = 160;
    const nodo = (i) => { const [x, y] = P[i], n = d.nodi[i];
      return `<g class="nodo ${n.key ? 'key' : ''} ${attive.includes(i) ? '' : 'off'}" style="animation-delay:${num(.3 + i * .3)}s">
        <rect x="${x - W / 2}" y="${y - H / 2}" width="${W}" height="${H}"/>
        <foreignObject x="${x - W / 2}" y="${y - H / 2}" width="${W}" height="${H}"><div xmlns="http://www.w3.org/1999/xhtml">
          <div class="t">${piano(n.t)}</div>${n.d ? `<div class="d">${piano(n.d)}</div>` : ''}</div></foreignObject></g>`; };
    const lato = (i, j, del) => `<path class="lato" pathLength="1" d="M${P[i][0]} ${P[i][1]}L${P[j][0]} ${P[j][1]}" style="animation-delay:${del}s"/>`;
    return `<div class="triade"><svg class="fig gfx" viewBox="0 0 1656 600">
      ${lato(0, 1, .9)}${lato(1, 2, 1.1)}${lato(2, 0, 1.3)}
      ${nodo(0)}${nodo(1)}${nodo(2)}
      <g class="centro"><circle cx="828" cy="360" r="80"/><text x="828" y="360">${piano(d.centro)}</text></g>
    </svg></div>`;
  },

  // Una radice e due rami. radice: testo; rami: [{q:'quando', t, d, key}].
  bivio: d => {
    const W = 1656, H = 560;
    const nodo = (x, y, w, h, cls, t, dd, del) => `<g class="nodo ${cls}" style="animation-delay:${del}s">
      <rect x="${x}" y="${y}" width="${w}" height="${h}"/>
      <foreignObject x="${x}" y="${y}" width="${w}" height="${h}"><div xmlns="http://www.w3.org/1999/xhtml">
        <div class="t">${piano(t)}</div>${dd ? `<div class="d">${piano(dd)}</div>` : ''}</div></foreignObject></g>`;
    const [a, b] = d.rami;
    return `<div class="bivio"><svg class="fig gfx" viewBox="0 0 ${W} ${H}">
      ${nodo(528, 20, 600, 150, 'radice', d.radice, '', .1)}
      <path class="ramo" pathLength="1" d="M760 170c0 60-360 40-360 90" style="animation-delay:.7s"/>
      <path class="ramo acc" pathLength="1" d="M896 170c0 60 360 40 360 90" style="animation-delay:.9s"/>
      <text class="quando" x="400" y="300" text-anchor="middle" style="animation-delay:1.2s">${piano(a.q ?? '')}</text>
      <text class="quando" x="1256" y="300" text-anchor="middle" style="animation-delay:1.4s">${piano(b.q ?? '')}</text>
      ${nodo(40, 330, 720, 210, a.key ? 'key' : '', a.t, a.d, 1.35)}
      ${nodo(896, 330, 720, 210, b.key ? 'key' : '', b.t, b.d, 1.55)}
    </svg></div>`;
  },
};

// L'illustrazione clinica: stessa fabbrica di figure.mjs, con il tratto «freccia».
export const illustrazioneClinica = (n, cls = '') => {
  const tratti = ILLU_CLINICA[n];
  if (!tratti) return null;
  let k = 0;
  return `<svg class="illu ${cls}" viewBox="0 0 240 240" fill="none" stroke="currentColor"
    stroke-width="6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${
    tratti.map(t => t.startsWith('pieno:') ? `<path class="pieno" d="${t.slice(6)}" stroke="none"/>`
      : t.startsWith('freccia:') ? `<path class="freccia" pathLength="1" d="${t.slice(8)}"/>`
      : `<path class="tr" style="--i:${k++}" pathLength="1" d="${t}"/>`).join('')}</svg>`;
};
