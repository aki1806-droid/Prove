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
//   anello     le lezioni di un modulo disposte in cerchio, ciascuna con la sua illustrazione
//   gesti      una fila di gesti illustrati, con le frecce che li legano
let acc = s => String(s ?? '');
export const collega = fn => { acc = fn; };
let ripiego = null;
export const collegaRipiego = fn => { ripiego = fn; };
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

  // --- 3.3 nutrizione e disfagia ---
  sarcopenia: [
    C(120, 44, 24),                                                                 // testa
    'M60 220v-80a60 60 0 0 1 120 0v80',                                             // la sagoma larga
    'M92 220v-70a28 28 0 0 1 56 0v70',                                              // il muscolo che c'e' davvero
    'pieno:M92 220v-70a28 28 0 0 1 56 0v70z',
    'M60 140c-14 20-16 50-10 80M180 140c14 20 16 50 10 80',                          // il volume che si vede
  ],
  gola: [
    'M30 90c30-34 60-40 90-36',                                                     // il palato
    'M30 136c30 10 58 6 84-2',                                                      // la lingua
    'M30 90v46',                                                                    // le labbra
    'M124 54c14 0 26 10 30 26v60', 'M120 96v50',                                    // faringe: parete posteriore e anteriore
    'M120 146c8 4 14 10 20 14',                                                     // l'epiglottide
    'M118 160v70M142 160v70', 'M122 182h16M122 202h16M122 222h16',                   // la trachea, con gli anelli
    'M158 160v70M178 160v70',                                                       // l'esofago
    'pieno:M124 96h30v50h-30z',                                                     // orofaringe
    'pieno:M158 160h20v70h-20z',                                                    // esofago
    'M100 232h100',
  ],
  beccuccio: [
    'M120 140c-30 0-50-24-50-54 0-30 22-56 52-56 24 0 46 16 52 40',                  // testa reclinata
    'M96 136l-20 60', 'M156 120l14 50',                                             // collo, nuca
    'M150 40l30-20 14 18-30 26',                                                    // il beccuccio
    'pieno:M176 40l16-12 24 26-16 12z',
    'M180 76h50l-8 44h-36z', 'pieno:M182 82h44l-6 34h-32z',                          // la tazza
    'freccia:M60 60a70 70 0 0 1 30-40M82 22l12-4-2 14',                              // il capo che va indietro
  ],
  // --- 3.4 nutrizione enterale ---
  nex: [
    C(84, 64, 36),                                                                  // la testa di profilo
    'M50 58l-8 8 8 6', 'M118 54a8 12 0 1 1 0 22',                                   // naso, orecchio
    'M70 98v16M98 98v16', 'M40 114h88v100H40z', 'M84 114v56',                         // collo, tronco, sterno
    'pieno:' + C(46, 66, 7), 'pieno:' + C(118, 76, 7), 'pieno:' + C(84, 170, 7),     // naso, lobo, xifoide
    'freccia:M46 66L118 76L84 170',                                                 // la misura
  ],
  stomaco: [
    'M96 24v40', 'M118 24v40',                                                      // esofago
    'M96 64c-44 20-66 70-44 116s78 60 122 30c22-16 26-40 14-58l-24 10',            // il corpo dello stomaco
    'M118 64c30 10 46 30 48 52',
    'pieno:M100 70c-36 20-54 64-36 102s70 50 108 26c18-14 22-34 12-48l-22 8c-4-24-20-46-46-58z',
    'M188 152c24 4 34 30 22 56', 'M164 162c20 6 28 26 18 46',                        // piloro e duodeno
  ],
  peg: [
    'M20 96h200', 'pieno:M20 96h200v44H20z', 'M20 140h200',                           // cute e parete
    'M20 190c60-24 140-24 200 0',                                                   // la parete gastrica
    'M120 26v170',                                                                  // la sonda
    'M100 50h40v14h-40z',                                                           // la clamp
    'M92 94h56v10H92z', 'pieno:M92 94h56v10H92z',                                   // il disco esterno
    'M98 196a22 12 0 1 0 44 0', 'pieno:M98 196a22 12 0 1 0 44 0z',                  // il disco interno
  ],
  raggi: [
    'M44 24h152v192H44z', 'pieno:M44 24h152v192H44z',                                 // la lastra
    'M72 70c30-10 66-10 96 0M72 96c30-10 66-10 96 0M72 122c30-10 66-10 96 0',      // le coste
    'M120 40v20', C(120, 178, 24),                                                  // trachea e stomaco
    'freccia:M126 40v134',                                                          // il sondino, in sede
  ],
  ph: [
    'M40 40h36v170H40z', 'pieno:M40 40h36v34H40z', 'M40 108h36M40 142h36M40 176h36',  // la striscia
    'M110 200l70-70', 'M124 214l84-84', 'M110 200l14 14', 'M180 130l14-14 14 14-14 14', // la siringa
    'M208 102l16-16',
    'pieno:M118 208l62-62 8 8-62 62z',
  ],
  pompa: [
    'M100 16h40v34h-40z', 'M120 50v20',                                             // la sacca
    'M56 70h128v120H56z', 'pieno:M72 86h96v44H72z', 'M72 150h30M120 150h48',          // la pompa e lo schermo
    'M120 190v34', 'M14 224h212',
  ],
  siringa: [
    'M40 100h124v40H40z', 'M40 120H20M16 106v28', 'M164 112h34v16h-34z', 'M198 120h26',
    'M64 100v10M88 100v10M112 100v10M136 100v10',                                   // le tacche
    'pieno:M60 104h60v32H60z',
  ],
  cellula: [
    C(120, 130, 62), 'pieno:' + C(120, 130, 62), C(120, 130, 20),                    // la cellula e il nucleo
    'freccia:M20 130h40M48 118l12 12-12 12M220 130h-40M192 118l-12 12 12 12M120 20v40M108 48l12 12 12-12', // gli ioni che entrano
  ],
  // --- 3.5 idratazione ---
  sacca: [
    'M120 14v26', 'M70 40h100v130a20 20 0 0 1-20 20H90a20 20 0 0 1-20-20z',        // gancio e sacca
    'pieno:M76 100h88v70a14 14 0 0 1-14 14H90a14 14 0 0 1-14-14z',                 // il liquido
    'M90 70h60M90 88h40', 'M120 190v36',                                            // le tacche e il deflussore
  ],
  fiala: [
    'M96 60h48v20l-10 14v116a8 8 0 0 1-8 8h-12a8 8 0 0 1-8-8V94l-10-14z',           // la fiala
    'M104 40h32', 'M120 40v20',                                                     // il collo
    'pieno:M110 120h20v90h-20z',                                                    // il contenuto
    'freccia:M40 60l160 160M200 60L40 220',                                         // mai in bolo
  ],
  bicchiere: [
    'M70 60h100l-12 150H82z', 'pieno:M78 110h84l-8 100H86z',                          // il bicchiere
    'M60 226h120',                                                                  // il comodino
    'M40 60c12-16 28-24 44-24', 'M40 60l10-8M40 60l12 4',                             // la mano che lo avvicina
  ],
  // --- 3.6 eliminazione urinaria ---
  catetere: [
    'M60 110c0-40 30-70 60-70s60 30 60 70c0 30-20 50-40 60H100c-20-10-40-30-40-60z',   // la vescica
    'pieno:M68 110c0-34 26-60 52-60s52 26 52 60c0 26-18 44-36 52h-32c-18-8-36-26-36-52z',
    'M108 170v60', 'M132 170v60',                                                    // l'uretra
    'M120 232V90', C(120, 96, 16),                                                    // il catetere e il palloncino
    'M114 226h12', 'M120 232l-40 8',                                                 // la biforcazione
  ],
  circuito: [
    'M14 150h212', 'M30 150v-40h30v20h130v20M200 130v20',                             // il letto
    'M60 112h130v10H60z', C(72, 98, 12),                                              // materasso e testa
    'pieno:M110 92h24v20h-24z',                                                      // la vescica, sopra il piano
    'M122 112c0 30 10 50 40 60v20',                                                  // il tubo, senza anse
    'M148 192h28v40h-28z', 'pieno:M150 210h24v20h-24z',                               // la sacca, sotto la vescica
    'M162 232v10',                                                                   // il rubinetto
    'M14 226h212',                                                                   // il pavimento: la sacca non lo tocca
  ],
  globo: [
    'M40 120v100M200 120v100',                                                       // i fianchi
    'M60 220h120',
    'M120 100c-40 0-60 30-60 60 0 30 20 50 60 50s60-20 60-50c0-30-20-60-60-60z',     // la vescica distesa
    'pieno:M120 108c-34 0-52 26-52 52 0 26 18 42 52 42s52-16 52-42c0-26-18-52-52-52z',
    'M100 84c8 8 32 8 40 0',                                                          // sopra il pube
    'freccia:M120 40v40M108 68l12 12 12-12',                                          // dolente alla palpazione
  ],
  // --- 3.7 alvo, dolore e sonno ---
  pca: [
    'M50 60h110v120H50z', 'pieno:M64 74h82v40H64z', 'M64 130h30M110 130h36',          // la pompa e lo schermo
    'M160 120h40', C(214, 120, 18), 'pieno:' + C(214, 120, 12),                         // il cavo e il pulsante
    'M190 150c-6 10-4 22 4 30l14 14', 'M204 194l16-16',                                // la mano del paziente
    'M105 180v40', 'M14 224h212',
  ],
  // --- 3.8 riepilogo ---
  quaderno: [
    'M50 30h130a10 10 0 0 1 10 10v170a10 10 0 0 1-10 10H50a10 10 0 0 1-10-10V40a10 10 0 0 1 10-10z',
    'M40 70h24M40 110h24M40 150h24M40 190h24', 'M96 84h68M96 116h68M96 148h40', 'freccia:M96 182h52',
  ],
  quiz: [
    'M40 40h160v160H40z', 'M64 74h16v16H64zM64 112h16v16H64zM64 150h16v16H64z',
    'M96 82h80M96 120h80M96 158h56', 'pieno:M64 112h16v16H64z', 'freccia:M60 116l6 8 12-14',
  ],
  cerchio: [
    'M120 40a80 80 0 1 1-0.1 0', 'M120 90v30l22 22', 'pieno:' + C(120, 120, 8),
  ],
  // --- 4.7 rischio biologico ---
  // la puntura: il polpastrello, l'ago che lo tocca, la goccia
  puntura: [
    'M60 220V130c0-40 26-70 60-70s60 30 60 70v90', 'M96 96c8-10 20-16 24-16s16 6 24 16',
    'M196 30l-52 62', 'M190 22l14 14M144 92l-8 8', 'pieno:M118 168c-10 14-10 26 0 26s10-12 0-26z',
    'freccia:M150 86l-14 16',
  ],
  // il contenitore per taglienti: la scatola rigida, la fessura, la linea di riempimento
  taglienti: [
    'M50 70h140v150H50z', 'M40 70h160', 'M90 52h60v18H90z', 'M104 61h32',
    'pieno:M58 120h124v92H58z', 'freccia:M42 120h156', 'M110 96l10-18M126 96l-6-18',
  ],
  // --- 4.5 sterilizzazione ---
  // la vasca di decontaminazione: la bacinella, il liquido, le forbici immerse
  vasca: [
    'M30 110h180l-16 90H46z', 'M14 110h212', 'pieno:M40 130h160l-10 56H50z',
    'M96 60l52 78M148 60l-52 78', C(90, 50, 12), C(154, 50, 12), 'freccia:M120 20v24M110 36l10 10 10-10',
  ],
  // l'autoclave: la camera con lo sportello tondo, la maniglia, il quadrante e il vapore
  autoclave: [
    'M30 70h180c10 0 16 6 16 16v110c0 10-6 16-16 16H30c-10 0-16-6-16-16V86c0-10 6-16 16-16z',
    C(96, 136, 46), 'pieno:' + C(96, 136, 30), 'M150 136h30', C(190, 112, 12), 'M190 104v8',
    'M50 212v14M190 212v14', 'freccia:M70 52c0-12 12-12 12-24M110 52c0-12 12-12 12-24M150 52c0-12 12-12 12-24',
  ],
  // il pacco sterile: la busta con il nastro a strisce che ha virato
  pacco: [
    'M40 44h160c8 0 12 4 12 12v132c0 8-4 12-12 12H40c-8 0-12-4-12-12V56c0-8 4-12 12-12z', 'M28 84l92 60 92-60',
    'pieno:M28 150h172v22H28z', 'freccia:M52 150l14 22M84 150l14 22M116 150l14 22M148 150l14 22M180 150l14 22',
  ],
  // la provetta dell'indicatore biologico: la fiala, il tappo, le spore sul fondo
  provetta: [
    'M92 30h56', 'M100 30v150c0 22 40 22 40 0V30', 'M92 30h56v14H92z', 'pieno:M100 130v50c0 22 40 22 40 0v-50z',
    'freccia:' + C(112, 156, 5), 'freccia:' + C(128, 168, 5), 'freccia:' + C(118, 176, 4),
  ],
  // --- 4.4 DPI ---
  // il guanto che si sfila: la mano, il polsino arrotolato, la freccia che tira
  sfila: [
    'M92 210V120c0-14 10-22 22-22h50c12 0 22 8 22 22v90', 'M114 98V44c0-10 8-16 16-16s16 6 16 16v54',
    'M146 98V56c0-10 8-16 16-16s16 6 16 16v42', 'M92 130l-18-30c-6-10 0-22 10-22 8 0 14 6 18 14',
    'pieno:M78 196c0-10 24-16 62-16s62 6 62 16-24 16-62 16-62-6-62-16z',
    'freccia:M202 120v70M188 176l14 14 14-14',
  ],
  // le due dita nude che entrano sotto il polsino, dall'interno
  dita: [
    'M60 216V126c0-14 10-22 22-22h50c12 0 22 8 22 22v90', 'M82 104V50c0-10 8-16 16-16s16 6 16 16v54',
    'M114 104V62c0-10 8-16 16-16s16 6 16 16v42', 'M60 136l-18-30c-6-10 0-22 10-22 8 0 14 6 18 14',
    'pieno:M46 196c0-10 24-16 62-16s62 6 62 16-24 16-62 16-62-6-62-16z',
    'freccia:M216 100c-30 24-56 50-66 84M232 116c-30 24-54 46-66 78',
  ],
  // il pacchetto chiuso: i due guanti rovesciati uno nell'altro
  pacchetto: [
    'pieno:M70 150c-20-30 0-70 40-76 30-4 50 10 62 30 10 20 4 50-16 64-26 18-66 12-86-18z',
    'M70 150c-20-30 0-70 40-76 30-4 50 10 62 30 10 20 4 50-16 64-26 18-66 12-86-18z',
    'M126 110c20-14 46-8 56 14 10 24-4 52-30 58', 'M96 128c-10-10-6-26 6-32', 'M166 96l-8-18M142 84l-2-18',
  ],
  occhiali: [
    'M30 110c0-16 12-26 30-26h50c14 0 22 8 22 20v20c0 16-12 28-30 28H62c-18 0-32-12-32-28z',
    'M132 104c0-12 8-20 22-20h50c18 0 30 10 30 26v14c0 16-14 28-32 28h-40c-18 0-30-12-30-28z', 'M104 110h28',
    'M30 104l-14-8M224 104l14-8', 'pieno:M44 100h60v22H44zM146 100h60v22h-60z',
  ],
  rifiuti: [
    'M56 70h128l-12 150H68z', 'M40 70h160', 'M96 70v-18h48v18', 'M96 100v90M120 100v90M144 100v90',
    'pieno:' + C(120, 140, 26), 'M120 114v14M120 152v14M97 127l12 7M143 127l-12 7M97 153l12-7M143 153l-12-7',
  ],
  // --- 4.3 precauzioni aggiuntive ---
  mascherina: [
    'M60 96h120a10 10 0 0 1 10 10v50a10 10 0 0 1-10 10H60a10 10 0 0 1-10-10v-50a10 10 0 0 1 10-10z',
    'M70 118h100M70 134h100M70 150h100', 'M50 108c-22 0-32 12-32 26M50 154c-22 0-32-12-32-26', 'M190 108c22 0 32 12 32 26M190 154c22 0 32-12 32-26',
    'pieno:M60 100h120v14H60z',
  ],
  respiratore: [
    'M60 96c0-30 28-50 60-50s60 20 60 50v40c0 40-26 68-60 68s-60-28-60-68z', 'M96 62h48',
    'M72 128h96M76 156h88', 'M60 110H26c-8 0-14-6-14-14M60 134H24c-10 0-14 8-14 18',
    'M180 110h34c8 0 14-6 14-14M180 134h36c10 0 14 8 14 18', 'pieno:M72 118h96v20H72z',
  ],
  camice: [
    'M70 64l50-22 50 22v150H70z', 'M70 64l-32 58 32 12', 'M170 64l32 58-32 12', 'M120 42v40', 'M96 214v-70h48v70',
    'pieno:M96 144h48v40H96z',
  ],
  cartello: [
    'M46 20h148v200H46z', 'M72 56h96v72H72z', 'pieno:M120 66l34 54H86z', 'M120 88v18', 'pieno:' + C(120, 112, 3), C(176, 132, 6),
  ],
  fiore: [
    'M120 216v-86', 'M120 150c-30 0-44-10-50-30', 'M120 170c30 0 44-10 50-30', C(120, 100, 22),
    C(98, 84, 12), C(142, 84, 12), C(98, 116, 12), C(142, 116, 12), 'pieno:' + C(120, 100, 9), 'freccia:M40 40l160 160',
  ],
  fonendo: [
    'M78 34v56a42 42 0 0 0 84 0V34', 'M70 34h16M154 34h16', 'M120 132v40', C(120, 194, 22), 'pieno:' + C(120, 194, 12),
  ],
  // --- 4.2 igiene delle mani ---
  zona: [
    'M30 96v100', 'M176 116v80', 'M30 152h146', 'pieno:M30 152h146v22H30z', 'M40 174v30M166 174v30',
    'M42 136h32v16H42z', C(58, 118, 13), 'M80 140c30-16 56-16 86 0', 'M194 156h30v48h-30z', 'M194 178h30',
    'freccia:M120 160m-112 0a112 58 0 1 0 224 0a112 58 0 1 0-224 0',
  ],
  dispenser: [
    'M84 80h72v130H84z', 'M100 80v-24h40v24', 'M120 56v-20', 'M104 36h32', 'freccia:M136 36c16 0 24 8 24 24',
    'pieno:M92 150h56v50H92z', 'M100 110h40',
  ],
  rubinetto: [
    'M44 110h56v-36a26 26 0 0 1 26-26h54', 'M180 48v-22', 'M166 26h28', 'M44 110v28', 'M30 138h44',
    'M40 146l-4 30M56 150l-2 28', 'pieno:' + C(52, 196, 9), 'pieno:' + C(40, 216, 6), 'pieno:' + C(68, 214, 6),
  ],
  guanto: [
    'M70 210v-90a12 12 0 0 1 24 0v40', 'M94 160v-70a12 12 0 0 1 24 0v70', 'M118 90v-40a12 12 0 0 1 24 0v100', 'M142 100v-30a12 12 0 0 1 24 0v80',
    'M70 210c0 20 60 28 96 0', 'M166 150c14 6 22 14 24 26', 'M62 220h110', 'pieno:M62 216h110v10H62z',
  ],
  gomito: [
    'M120 34a22 22 0 1 0 0 44a22 22 0 1 0 0-44', 'M60 220v-70c0-30 24-54 60-54s60 24 60 54v70',
    'M180 150l-40 30', 'M140 180l-20-10', 'freccia:M96 96c20-10 40-6 50 12', 'pieno:' + C(140, 180, 7),
  ],
  // --- 4.1 le infezioni correlate all'assistenza ---
  ferita: [
    'M24 132c40-26 90-40 192-30', 'M56 96l24 52M80 96l-24 52', 'M104 84l24 52M128 84l-24 52', 'M152 78l24 52M176 78l-24 52',
    'pieno:M24 132c40-26 90-40 192-30l2 10c-100-10-150 4-190 30z',
  ],
  cvc: [
    'M120 26a24 24 0 1 0 0 48a24 24 0 1 0 0-48', 'M56 214v-64c0-34 28-60 64-60s64 26 64 60v64',
    'M22 70c18 4 34 14 46 30l26 36', 'M14 62l16 16', 'pieno:' + C(96, 138, 9), 'freccia:M96 138c14 8 26 24 28 44',
  ],
  contatto: [
    'M60 200v-80a14 14 0 0 1 28 0v40', 'M88 160v-60a12 12 0 0 1 24 0v60', 'M112 100v-30a12 12 0 0 1 24 0v90', 'M136 110v-20a12 12 0 0 1 24 0v70',
    'M60 200c0 22 56 32 100 0', 'M16 222h208', 'pieno:' + C(44, 222, 5), 'pieno:' + C(190, 222, 5), 'pieno:' + C(214, 222, 5),
  ],
  goccia: [
    'M120 30c-32 44-54 76-54 108a54 54 0 0 0 108 0c0-32-22-64-54-108z', 'pieno:M120 70c-20 30-34 54-34 72a34 34 0 0 0 68 0c0-18-14-42-34-72z',
    'M20 214c30-30 60-30 90 0M130 214c30-30 60-30 90 0',
  ],
  aerosol: [
    'M16 200c30-20 60-20 90 0s60 20 90 0', 'M16 44c30 20 60 20 90 0s60-20 90 0',
    C(60, 120, 7), C(104, 88, 6), C(150, 142, 6), C(190, 100, 7), C(206, 156, 5), C(124, 60, 5), C(84, 170, 5), C(160, 62, 5),
    'pieno:' + C(60, 120, 4), 'pieno:' + C(190, 100, 4), 'pieno:' + C(150, 142, 3),
  ],
  microbo: [
    'M70 120a50 30 0 1 0 100 0a50 30 0 1 0-100 0', 'M170 108l32-22M170 132l32 22M70 108l-32-22M70 132l-32 22', 'M120 90v-32M120 150v32',
    'pieno:' + C(100, 120, 6), 'pieno:' + C(136, 114, 6), 'pieno:' + C(126, 130, 4),
  ],
  fotografia: [
    'M30 90h50l16-24h48l16 24h50v110H30z', C(120, 146, 34), C(120, 146, 16), 'pieno:M176 106h22v12h-22z',
  ],
  pellicola: [
    'M20 70h200v100H20z', 'M20 92h200M20 148h200', 'M36 76h14v8H36zM70 76h14v8H70zM104 76h14v8h-14zM138 76h14v8h-14zM172 76h14v8h-14z',
    'M36 156h14v8H36zM70 156h14v8H70zM104 156h14v8h-14zM138 156h14v8h-14zM172 156h14v8h-14z',
    'M46 100h44v40H46zM98 100h44v40H98zM150 100h44v40h-44z', 'pieno:M98 100h44v40H98z',
  ],
  zanzara: [
    'M100 130a20 12 0 1 0 40 0a20 12 0 1 0-40 0', 'M140 130l54-12M100 130l-40-12',
    'M110 118c-20-30-50-40-70-30c10 20 40 30 70 30z', 'M130 118c20-30 50-40 70-30c-10 20-40 30-70 30z',
    'M104 140l-30 32M136 140l30 32M120 142v34', 'pieno:' + C(112, 128, 3), 'pieno:' + C(128, 128, 3),
  ],
  // ---- modulo 5: farmacologia ----
  pillola: [
    'M58 146l88-88c16-16 42-16 58 0s16 42 0 58l-88 88c-16 16-42 16-58 0s-16-42 0-58z',   // la capsula
    'M102 102l44 44',                                                                    // la giuntura
    'pieno:M58 146l44-44 44 44-44 44c-16 16-42 16-58 0s-16-42 0-58z',                    // mezza in accento
    C(176, 64, 30), 'M158 64h36',                                                        // la compressa con la linea di frattura
  ],
  fegato: [
    'M22 104C22 66 62 46 112 46c38 0 72 10 102 32 16 12 12 30-6 34-32 6-52 18-68 36-20 22-54 24-80 12C34 148 22 128 22 104z',   // la sagoma: lobo destro grande, sinistro a punta
    'M112 50c-6 24-4 50 6 74',                                                                                          // il legamento falciforme
    'M64 150c-2 14 6 26 18 32', 'pieno:' + C(86, 184, 13),                                                              // la colecisti
  ],
  rene: [
    'M80 40c-34 0-54 36-54 80s20 80 54 80c22 0 32-12 44-26 8-10 8-22 0-32-12-14-8-26 0-40 8-10 8-22 0-32C112 52 102 40 80 40z',
    'M118 92c-10 8-10 24 0 32', 'M124 108h46c14 0 24 10 24 24v72',                       // il bacinetto, l'uretere
    'pieno:M118 92c-10 8-10 24 0 32 8-8 8-24 0-32z',
    'M60 88c-8 14-8 30 0 44M78 76c-8 20-8 46 0 66',                                      // i calici
  ],
  pompelmo: [
    C(120, 124, 96), C(120, 124, 78),                                                    // buccia, albedo
    'M120 46v156M42 124h156M65 69l110 110M175 69L65 179',                                // gli spicchi
    'pieno:M120 124l-55-55c14-12 32-20 55-23z', 'pieno:M120 124l55 55c-14 12-32 20-55 23z',
    'M96 32c6-10 18-14 28-10',                                                           // il picciolo
  ],
  triangolo: [
    'M40 52h160l-80 140z',                                                               // il triangolo nero rovesciato
    'pieno:M56 62h128l-64 112z',
    'M78 208h84', 'M98 226h44',                                                          // la scheda sotto
  ],
  anziano: [
    C(130, 54, 24),                                                                      // la testa
    'M130 78v70M130 100l-34 30M130 100l30 28', 'M130 148l-28 56M130 148l22 56',          // busto, braccia, gambe
    'M160 128l16 86', 'M168 212h16',                                                     // il bastone
    'pieno:' + C(130, 54, 24),
  ],
  recettore: [
    'M20 150h66c0-30 16-46 34-46s34 16 34 46h66',                                        // la membrana con la tasca
    'M20 172h200',
    'pieno:' + C(120, 86, 22), 'M120 108v-4',                                            // il ligando sopra la tasca
    'freccia:M120 190v30M106 206l14 14 14-14',                                           // il segnale che entra
  ],
  bilancia2: [
    'M120 40v160', 'M60 200h120', 'M30 90h180',                                          // asta, base, giogo
    'M30 90l-20 60h40zM210 90l-20 60h40z',                                               // i piatti
    'pieno:' + C(120, 40, 10),
  ],
  // ---- 5.3: i calcoli ----
  calcolatrice: [
    'M60 30h120c10 0 16 6 16 16v148c0 10-6 16-16 16H60c-10 0-16-6-16-16V46c0-10 6-16 16-16z',   // il corpo
    'M66 50h108v40H66z', 'pieno:M66 50h108v40H66z',                                             // il display
    'M70 110h20v16H70zM110 110h20v16h-20zM150 110h20v16h-20zM70 140h20v16H70zM110 140h20v16h-20zM150 140h20v16h-20zM70 170h20v16H70zM110 170h60v16h-60z',
  ],
  gocciolatore: [
    'M100 30h40v30h-40z', 'M110 60h20v14h-20z',                                                 // il perforatore
    'M90 74h60v90c0 20-14 30-30 30s-30-10-30-30z',                                              // la camera
    'pieno:M94 130h52v34c0 14-12 24-26 24s-26-10-26-24z',                                       // il livello
    'M114 194h12v40h-12z', 'pieno:M112 100c0-10 16-10 16 0s-16 16-8 16-8-6-8-16z',                 // il tubo, la goccia
  ],
  // ---- 5.5: le classi di farmaci ----
  cuore2: [
    'M120 210C60 160 20 120 20 76c0-28 20-48 48-48 22 0 40 12 52 30 12-18 30-30 52-30 28 0 48 20 48 48 0 44-40 84-100 134z',   // il cuore
    'M30 120h40l14-28 16 56 16-40 10 20h40',                                                                                   // la traccia
    'pieno:M120 210C60 160 20 120 20 76c0-28 20-48 48-48 22 0 40 12 52 30 12-18 30-30 52-30 28 0 48 20 48 48 0 44-40 84-100 134z',
  ],
  penna: [
    'M70 40h100v160H70z', 'M80 200h80v20H80z', 'M100 20h40v20h-40z',                                                        // la penna da insulina
    'M90 70h60M90 90h60M90 110h60M90 130h60',                                                                                // la scala
    'pieno:M80 150h80v50H80z', 'M120 220v14',                                                                                 // il serbatoio, l'ago
  ],
  frigo: [
    'M50 30h140v190H50z', 'M50 100h140', 'M64 60v20M64 130v40',                                                               // il frigo con le maniglie
    'pieno:M80 120h80v60H80z', 'M100 50h40',                                                                                  // le confezioni dentro
  ],
  zucchero: [
    'M40 90h160v110H40z', 'M60 90V60h120v30', 'M80 60l20-24h40l20 24',                                                       // il bicchiere, il succo
    'pieno:M46 130h148v64H46z', 'M190 40h30v30h-30z', 'M196 48h18M196 56h18M196 64h18',                                        // il livello, la bustina
  ],
  goccia2: [
    'M120 30c-40 60-70 100-70 136 0 38 30 54 70 54s70-16 70-54c0-36-30-76-70-136z',                                           // la goccia di sangue
    'pieno:M120 30c-40 60-70 100-70 136 0 38 30 54 70 54s70-16 70-54c0-36-30-76-70-136z',
    'M96 160c0 14 10 24 24 24',
  ],
  elastomero: [
    'M60 40h120a30 30 0 0 1 30 30v90a30 30 0 0 1-30 30H60a30 30 0 0 1-30-30V70a30 30 0 0 1 30-30z',                        // il guscio
    'pieno:M120 60c-34 0-54 24-54 54s20 54 54 54 54-24 54-54-20-54-54-54z',                                                   // il palloncino
    'M120 190v24', 'M104 214h32v12h-32z',                                                                                     // il tubo e il regolatore
  ],
  cellula2: [
    'M120 40c-44 0-80 36-80 80s36 80 80 80 80-36 80-80-36-80-80-80z', 'pieno:M120 90c-16 0-30 14-30 30s14 30 30 30 30-14 30-30-14-30-30-30z',
  ],
  luna: [
    'M150 40a70 70 0 1 0 60 106 56 56 0 1 1-60-106z', 'pieno:M150 40a70 70 0 1 0 60 106 56 56 0 1 1-60-106z',
    'M20 210h200', 'M36 210v-40h26v20h120v20M182 190v20',                              // il letto
    'M62 172h120v10H62z', C(74, 160, 10),
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
.posiz.n2{gap:60px}.posiz.n2 .card{flex-direction:row;align-items:center;gap:36px;min-width:0}.posiz.n2 .card svg{flex:0 0 360px;width:360px}

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

/* --- fascia: una scala a segmenti --- */
.fascia{width:100%}
.fascia svg{width:100%;height:auto;overflow:visible}
.fascia .seg{fill:var(--tit);opacity:.12;transform-box:fill-box;transform-origin:left;animation:cresciX .6s cubic-bezier(.4,0,.2,1) both}
.fascia .seg.key{fill:var(--acc);opacity:.3}
.fascia .seg.off{opacity:.04;animation:none}
.fascia .sog{stroke:var(--bg);stroke-width:6}
.fascia .val{font-size:34px;font-weight:700;fill:var(--tit);text-anchor:middle;opacity:0;animation:appari .4s both}
.fascia .nome{font-size:30px;font-weight:600;fill:var(--tit);text-anchor:middle;opacity:0;animation:sali .5s both}
.fascia .nome.key{fill:var(--acc)}
.fascia .nome.off,.fascia .val.off{opacity:.25;animation:none}
.fascia .sub{font-size:23px;fill:var(--fg);opacity:.72;text-anchor:middle}
.fascia .marca{stroke:var(--acc);stroke-width:6;stroke-dasharray:14 12;opacity:0;animation:appari .4s both 1.9s}
.fascia .marcatxt{font-size:30px;font-weight:700;fill:var(--acc);opacity:0;animation:sali .5s both 2s}
.fascia .marcadot{fill:var(--acc);opacity:0;animation:pop .4s both 1.9s;transform-box:fill-box;transform-origin:center}

/* --- consistenze: il bicchiere e il flusso --- */
.cons{display:flex;gap:30px;width:100%}
.cons .pan{flex:1;display:flex;flex-direction:column;gap:16px;opacity:0;animation:sali .55s cubic-bezier(.22,.7,.3,1) forwards}
.cons .pan.off{opacity:.26;animation:none}
.cons .pan svg{width:100%;height:auto;overflow:visible}
.cons .bicch{fill:none;stroke:var(--tit);stroke-width:7;stroke-linejoin:round;stroke-linecap:round}
.cons .tubo{fill:none;stroke:var(--tit);stroke-width:44;stroke-linecap:round;opacity:.07}
.cons .gola{fill:none;stroke:var(--tit);stroke-width:7;stroke-linecap:round}
.cons .p{fill:var(--acc);offset-rotate:0deg;animation:corri linear both}
.cons .p.solido{fill:var(--tit);opacity:.7}
@keyframes corri{from{offset-distance:0%}to{offset-distance:100%}}
.cons .danno{fill:var(--acc);opacity:0;animation:appariPozza .5s both}
.cons .pan .num{width:60px;height:60px;border-radius:50%;background:var(--tit);color:var(--bg);font-size:30px;font-weight:700;
                display:flex;align-items:center;justify-content:center}
.cons .pan.key .num{background:var(--acc)}
.cons .pan .t{font-size:38px;font-weight:600;color:var(--tit);line-height:1.12}
.cons .pan.key .t{color:var(--acc)}
.cons .pan .d{font-size:25px;line-height:1.3;opacity:.76;margin-top:6px}
.fascia,.cons{animation:none}

/* --- vie: lo schema con le quattro sonde --- */
.vie{display:flex;gap:50px;align-items:center;min-height:640px}
.vie .schema{flex:0 0 520px}
.vie .schema svg{width:520px;height:auto;overflow:visible}
.vie .schema .tr{fill:none;stroke:var(--tit);stroke-width:6;stroke-linecap:round;stroke-linejoin:round;
                 stroke-dasharray:1 2;stroke-dashoffset:1.1;animation:disegna 1s cubic-bezier(.4,0,.2,1) both;
                 animation-delay:calc(.1s + var(--i) * .08s)}
.vie .schema .org{fill:var(--tit);opacity:.06}
.vie .schema .sonda{fill:none;stroke:var(--acc);stroke-width:12;stroke-linecap:round;stroke-linejoin:round;
                    stroke-dasharray:1 2;stroke-dashoffset:1.1;animation:scorri 1.2s cubic-bezier(.4,0,.2,1) both}
.vie .schema .sonda.spenta{stroke:var(--linea);animation:none;stroke-dasharray:none;opacity:.6}
.vie .schema .pin{opacity:0;animation:pop .4s cubic-bezier(.22,.7,.3,1) both;transform-box:fill-box;transform-origin:center}
.vie .schema .pin circle{fill:var(--acc);stroke:var(--bg);stroke-width:4}
.vie .schema .pin text{font-size:26px;font-weight:700;fill:var(--bg);text-anchor:middle;dominant-baseline:central}
.vie .voci{flex:1;display:flex;flex-direction:column;gap:18px}
.vie .voce{display:flex;gap:24px;align-items:baseline;opacity:0;animation:scivola .5s cubic-bezier(.22,.7,.3,1) forwards}
.vie .voce .n{flex:0 0 60px;height:60px;border-radius:50%;background:var(--tit);color:var(--bg);font-size:30px;font-weight:700;
              display:flex;align-items:center;justify-content:center;align-self:center}
.vie .voce.key .n{background:var(--acc)}
.vie .voce .t{font-size:38px;font-weight:600;color:var(--tit);line-height:1.15}
.vie .voce.key .t{color:var(--acc)}
.vie .voce .d{font-size:26px;line-height:1.3;opacity:.74;margin-top:2px}
.vie .voce.off{opacity:.3;animation:none}
.vie{animation:none}

/* --- bilancio: il serbatoio con le entrate e le uscite --- */
.bil{display:flex;gap:40px;align-items:center;min-height:640px}
.bil .lista{flex:1;display:flex;flex-direction:column;gap:12px}
.bil .lista h3{font-size:30px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:var(--sop);margin:0 0 8px}
.bil .voce{display:flex;gap:18px;align-items:baseline;opacity:0;animation:scivola .5s cubic-bezier(.22,.7,.3,1) forwards}
.bil .lista.usc .voce{animation-name:scivolaDx2}
@keyframes scivolaDx2{from{opacity:0;transform:translateX(46px)}to{opacity:1;transform:none}}
.bil .voce .n{flex:0 0 46px;height:46px;border-radius:50%;background:var(--tit);color:var(--bg);font-size:24px;font-weight:700;
              display:flex;align-items:center;justify-content:center;align-self:center}
.bil .voce.key .n{background:var(--acc)}
.bil .voce .t{font-size:32px;font-weight:600;color:var(--tit);line-height:1.12}
.bil .voce.key .t{color:var(--acc)}
.bil .voce .d{font-size:23px;opacity:.74;line-height:1.25}
.bil .voce.off{opacity:.28;animation:none}
.bil .serb{flex:0 0 420px}
.bil .serb svg{width:420px;height:auto;overflow:visible}
.bil .serb .vaso{fill:none;stroke:var(--tit);stroke-width:8;stroke-linejoin:round}
.bil .serb .acqua{fill:var(--acc);opacity:.3;transform-box:fill-box;transform-origin:bottom;animation:cresciY 1.4s cubic-bezier(.4,0,.2,1) both .6s}
.bil .serb .fr{fill:none;stroke:var(--tit);stroke-width:8;stroke-linecap:round;stroke-linejoin:round;
               stroke-dasharray:1 2;stroke-dashoffset:1.1;animation:disegna .6s both}
.bil .serb .fr.acc{stroke:var(--acc)}
.bil .serb .fr.off{stroke:var(--linea);animation:none;stroke-dasharray:none}
.bil .serb .lbl{font-size:26px;font-weight:600;fill:var(--sop);letter-spacing:.14em;text-transform:uppercase;text-anchor:middle}

/* --- distribuzione: la sacca e i due compartimenti --- */
.distr{display:flex;gap:30px;width:100%}
.distr .pan{flex:1;display:flex;flex-direction:column;gap:16px;opacity:0;animation:sali .55s cubic-bezier(.22,.7,.3,1) forwards}
.distr .pan.off{opacity:.26;animation:none}
.distr .pan svg{width:100%;height:auto;overflow:visible}
.distr .comp{fill:var(--tit);opacity:.06;stroke:var(--tit);stroke-width:5;stroke-linejoin:round}
.distr .riemp{fill:var(--acc);opacity:0;animation:appariPozza .8s both}
.distr .sac{fill:none;stroke:var(--tit);stroke-width:6;stroke-linejoin:round}
.distr .sacl{fill:var(--acc);opacity:.35}
.distr .fr{fill:none;stroke:var(--acc);stroke-width:9;stroke-linecap:round;stroke-linejoin:round;
           stroke-dasharray:1 2;stroke-dashoffset:1.1;animation:disegna .7s both}
.distr .lbl{font-size:26px;font-weight:600;fill:var(--sop);letter-spacing:.12em;text-transform:uppercase;text-anchor:middle}
.distr .pan .num{width:60px;height:60px;border-radius:50%;background:var(--tit);color:var(--bg);font-size:30px;font-weight:700;
                 display:flex;align-items:center;justify-content:center}
.distr .pan.key .num{background:var(--acc)}
.distr .pan .t{font-size:38px;font-weight:600;color:var(--tit);line-height:1.12}
.distr .pan.key .t{color:var(--acc)}
.distr .pan .d{font-size:25px;line-height:1.3;opacity:.76;margin-top:6px}
.bil,.distr{animation:none}

.anello{width:100%}
.anello svg{width:100%;height:auto;overflow:visible}
.anello .ell{fill:none;stroke:var(--linea);stroke-width:6;stroke-dasharray:1 2;stroke-dashoffset:1.1;
             animation:scorri 1.4s cubic-bezier(.4,0,.2,1) both .1s}
.anello .nodo{animation:pop .55s cubic-bezier(.22,.7,.3,1) both;transform-box:fill-box;transform-origin:center}
.anello .nodo circle{fill:var(--bg);stroke:var(--tit);stroke-width:6}
.anello .nodo.key circle{stroke:var(--acc);stroke-width:8;fill:color-mix(in srgb,var(--acc) 8%,var(--bg))}
.anello .nodo .illu{color:var(--tit);width:88px;height:88px;overflow:visible}
.anello .nodo.key .illu{color:var(--acc)}
.anello .nodo .illu .tr{stroke-width:10}
.anello .nodo .illu .freccia{display:none}
.anello .nodo.off{opacity:.28;animation:none}
.anello .nodo foreignObject div{font-family:'Inter',sans-serif;line-height:1.14;display:flex;flex-direction:column;justify-content:center;height:100%}
.anello .nodo foreignObject .n{font-size:22px;font-weight:700;letter-spacing:.14em;color:var(--sop)}
.anello .nodo foreignObject .t{font-size:31px;font-weight:600;color:var(--tit)}
.anello .nodo.key foreignObject .t{color:var(--acc)}
.anello .centro{animation:pop .6s cubic-bezier(.22,.7,.3,1) both 1.7s;transform-box:fill-box;transform-origin:center}
.anello .centro text{font-family:'Inter',sans-serif;font-size:54px;font-weight:700;fill:var(--tit);text-anchor:middle}
.anello .centro text.s{font-size:30px;font-weight:500;fill:var(--fg);opacity:.8}

.gesti{display:flex;align-items:stretch;gap:18px;width:100%;min-height:600px}
.gesti .g{flex:1;position:relative;display:flex;flex-direction:column;align-items:center;text-align:center;gap:10px;
          padding:36px 30px 30px;border:4px solid var(--linea);border-radius:30px;background:var(--bg);
          opacity:0;animation:sali .55s cubic-bezier(.22,.7,.3,1) forwards}
.gesti .g.key{border-color:var(--acc);border-width:6px;background:color-mix(in srgb,var(--acc) 6%,var(--bg))}
.gesti .g.off{opacity:.28;animation:none}
.gesti .g .n{position:absolute;top:-26px;left:50%;transform:translateX(-50%);width:52px;height:52px;border-radius:50%;
             background:var(--tit);color:var(--bg);font-weight:700;font-size:28px;display:flex;align-items:center;justify-content:center}
.gesti .g.key .n{background:var(--acc)}
.gesti .g .ill{width:300px;height:300px}
.gesti .n2 .g .ill{width:360px;height:360px}
.gesti .n4 .g .ill,.gesti.n4 .g .ill{width:240px;height:240px}
.gesti .g .ill .illu{width:100%;height:100%}
.gesti .g.key .ill .illu{color:var(--acc)}
.gesti .g .t{font-size:38px;font-weight:600;line-height:1.12;color:var(--tit)}
.gesti.n4 .g .t{font-size:32px}
.gesti .g.key .t{color:var(--acc)}
.gesti .g .d{font-size:26px;line-height:1.25;opacity:.82;color:var(--fg)}
.gesti .fr{flex:0 0 70px;width:70px;align-self:center;overflow:visible;opacity:0;animation:appari .3s both}
.gesti .fr path{fill:none;stroke:var(--acc);stroke-width:7;stroke-linecap:round;stroke-linejoin:round;
                stroke-dasharray:1 2;stroke-dashoffset:1.1;animation:disegna .6s cubic-bezier(.4,0,.2,1) both;animation-delay:inherit}

.anelli{width:100%}
.anelli svg{width:100%;height:auto;overflow:visible}
.anelli .an{fill:none;stroke:var(--tit);stroke-width:16;stroke-linecap:round;animation:pop .5s cubic-bezier(.22,.7,.3,1) both;
            transform-box:fill-box;transform-origin:center}
.anelli .g.key .an{stroke:var(--acc)}
.anelli .g.off{opacity:.26}
.anelli .an-g{animation:pop .5s cubic-bezier(.22,.7,.3,1) both;transform-box:fill-box;transform-origin:center}
.anelli .met{fill:none;stroke:var(--acc);stroke-width:16;stroke-linecap:round;transform-box:fill-box;transform-origin:center}
.anelli .met.sx{animation:spezzaSx .6s cubic-bezier(.22,.7,.3,1) both 2.2s}
.anelli .met.dx{animation:spezzaDx .6s cubic-bezier(.22,.7,.3,1) both 2.2s}
@keyframes spezzaSx{from{transform:none}to{transform:translate(-26px,-10px) rotate(-10deg)}}
@keyframes spezzaDx{from{transform:none}to{transform:translate(26px,10px) rotate(10deg)}}
.anelli .n{font-family:'Inter',sans-serif;font-size:44px;font-weight:700;fill:var(--tit);text-anchor:middle;dominant-baseline:central;
           opacity:0;animation:appari .3s both}
.anelli .g.key .n{fill:var(--acc)}
.anelli foreignObject div{font-family:'Inter',sans-serif;text-align:center;line-height:1.14;opacity:0;animation:sali .5s cubic-bezier(.22,.7,.3,1) both}
.anelli foreignObject .t{font-size:27px;font-weight:600;color:var(--tit)}
.anelli .g.key foreignObject .t{color:var(--acc)}
.anelli foreignObject .d{font-size:22px;margin-top:8px;color:var(--fg);opacity:.82}

.colonne{display:flex;gap:30px;width:100%;align-items:stretch}
.colonne .col{flex:1;display:flex;flex-direction:column;gap:16px;padding:30px 32px 34px;border:4px solid var(--linea);border-radius:26px;
              background:var(--bg);opacity:0;animation:sali .5s cubic-bezier(.22,.7,.3,1) forwards}
.colonne .col.key{border-color:var(--acc);border-width:6px;background:color-mix(in srgb,var(--acc) 6%,var(--bg))}
.colonne .col.off{opacity:.28;animation:none}
.colonne .col .h{font-size:42px;font-weight:700;color:var(--tit);letter-spacing:.02em;padding-bottom:12px;border-bottom:3px solid var(--linea);margin-bottom:6px}
.colonne .col.key .h{color:var(--acc);border-color:var(--acc)}
.colonne .col .v{opacity:0;animation:scivola .45s cubic-bezier(.22,.7,.3,1) forwards}
.colonne .col .v .t{font-size:35px;font-weight:600;color:var(--fg);line-height:1.15}
.colonne .col .v.key .t{color:var(--acc)}
.colonne .col .v .d{font-size:25px;opacity:.78;margin-top:4px}
.colonne.n2 .col .v .t{font-size:34px}

.pressione{width:100%}
.pressione svg{width:100%;height:auto;overflow:visible}
.pressione .st{animation:sali .55s cubic-bezier(.22,.7,.3,1) both}
.pressione .st.off{opacity:.28;animation:none}
.pressione .muro{fill:none;stroke:var(--tit);stroke-width:14;stroke-linejoin:round}
.pressione .porta{fill:none;stroke:var(--tit);stroke-width:10;stroke-linecap:round}
.pressione .letto{fill:none;stroke:var(--tit);stroke-width:6}
.pressione .cuscino{fill:color-mix(in srgb,var(--acc) 18%,var(--bg));stroke:var(--tit);stroke-width:4}
.pressione .vent{fill:var(--bg);stroke:var(--tit);stroke-width:6}
.pressione .corr{font-family:'Inter',sans-serif;font-size:26px;font-weight:600;fill:var(--sop);letter-spacing:.1em;text-transform:uppercase}
.pressione .fl{fill:none;stroke:var(--acc);stroke-width:9;stroke-linecap:round;stroke-linejoin:round;transform-box:fill-box;transform-origin:center}
.pressione .fl.dentro{animation:flussoSx 1.2s ease-in-out infinite}
.pressione .fl.fuori{animation:flussoDx 1.2s ease-in-out infinite}
.pressione .fl.su{animation:flussoSu 1.2s ease-in-out infinite}
.pressione .fl.giu{animation:flussoGiu 1.2s ease-in-out infinite}
@keyframes flussoSx{0%{opacity:0;transform:translateX(30px)}30%{opacity:1}100%{opacity:0;transform:translateX(-30px)}}
@keyframes flussoDx{0%{opacity:0;transform:translateX(-30px)}30%{opacity:1}100%{opacity:0;transform:translateX(30px)}}
@keyframes flussoSu{0%{opacity:0;transform:translateY(24px)}30%{opacity:1}100%{opacity:0;transform:translateY(-24px)}}
@keyframes flussoGiu{0%{opacity:0;transform:translateY(-24px)}30%{opacity:1}100%{opacity:0;transform:translateY(24px)}}
.pressione foreignObject div{font-family:'Inter',sans-serif;line-height:1.15}
.pressione foreignObject .t{font-size:40px;font-weight:700;color:var(--tit)}
.pressione .st.key foreignObject .t{color:var(--acc)}
.pressione foreignObject .d{font-size:27px;margin-top:8px;color:var(--fg);opacity:.85}

.percento{width:100%}
.percento svg{width:100%;height:auto;overflow:visible}
.percento .p{fill:var(--linea);opacity:0;animation:pop .35s cubic-bezier(.22,.7,.3,1) both;transform-box:fill-box;transform-origin:center}
.percento .p.pieno{fill:var(--acc)}
.percento .p.mezzo{fill:color-mix(in srgb,var(--acc) 45%,var(--bg))}
.percento foreignObject div{font-family:'Inter',sans-serif;display:flex;flex-direction:column;justify-content:center;height:100%;
                            opacity:0;animation:sali .6s cubic-bezier(.22,.7,.3,1) both 1.2s}
.percento foreignObject .big{font-size:150px;font-weight:800;line-height:1;color:var(--acc);letter-spacing:-.02em}
.percento foreignObject .sub{font-size:38px;line-height:1.2;margin-top:24px;color:var(--tit);font-weight:500}
/* --- selezione --- */
.selezione{width:100%}
.selezione svg{width:100%;height:auto;overflow:visible}
.selezione .g{opacity:0;animation:pop .35s cubic-bezier(.22,.7,.3,1) both;transform-box:fill-box;transform-origin:center}
.selezione .g ellipse,.selezione .g path{stroke:color-mix(in srgb,var(--tit) 42%,var(--bg));stroke-width:5;fill:none;stroke-linecap:round}
.selezione .g ellipse{fill:color-mix(in srgb,var(--linea) 18%,var(--bg))}
.selezione .g.res ellipse,.selezione .g.res path{stroke:var(--acc)}
.selezione .g.res ellipse{fill:color-mix(in srgb,var(--acc) 22%,var(--bg))}
.selezione .g.via{animation:pop .35s cubic-bezier(.22,.7,.3,1) both,svanisce .9s ease 1.4s forwards}
@keyframes svanisce{to{opacity:.08}}
.selezione foreignObject > div{font-family:'Inter',sans-serif;display:flex;flex-direction:column;justify-content:center;height:100%;
  padding-left:20px}
.selezione foreignObject .big{font-size:56px;font-weight:800;line-height:1.12;color:var(--tit);letter-spacing:-.01em}
.selezione foreignObject .big b{color:var(--acc);font-weight:800}
.selezione foreignObject .sub{font-size:33px;line-height:1.25;margin-top:20px;color:var(--tit);font-weight:500}
/* ---- modulo 5: farmacologia ---- */
.adme{width:100%}
.adme svg{width:100%;height:auto;overflow:visible}
.adme .vaso{fill:none;stroke:var(--tit);stroke-width:10;stroke-linecap:round;stroke-dasharray:1 2;stroke-dashoffset:1.1;animation:disegna 1s ease-out both .2s}
.adme .lume{fill:color-mix(in srgb,var(--acc) 7%,var(--bg));opacity:0;animation:appari .5s both .9s}
.adme .st{opacity:0;animation:sali .5s cubic-bezier(.22,.7,.3,1) both}
.adme .st.off{opacity:.24;animation:none}
.adme .st .tondo{fill:var(--bg);stroke:var(--tit);stroke-width:8}
.adme .st.key .tondo{stroke:var(--acc)}
.adme .st .lettera{font-family:'Inter',sans-serif;font-size:66px;font-weight:800;fill:var(--tit);text-anchor:middle;dominant-baseline:central}
.adme .st.key .lettera{fill:var(--acc)}
.adme .illu{width:150px;height:150px;overflow:visible}
.adme .st foreignObject div{font-family:'Inter',sans-serif;text-align:center;line-height:1.14}
.adme .st foreignObject .t{font-size:31px;font-weight:700;color:var(--tit)}
.adme .st.key foreignObject .t{color:var(--acc)}
.adme .st foreignObject .d{font-size:23px;color:var(--fg);opacity:.8;margin-top:6px}
.adme .ramo{fill:none;stroke:var(--tit);stroke-width:6;stroke-linecap:round;stroke-dasharray:1 2;stroke-dashoffset:1.1;animation:disegna .6s ease-out both}
.adme .st.off .ramo{animation:none;stroke-dashoffset:0}
.adme .pt{fill:var(--acc);offset-rotate:0deg;opacity:0;animation:corri 2.2s linear both,appari .2s both}
.adme .pt.g1{animation-delay:.8s,.8s}.adme .pt.g2{animation-delay:1.1s,1.1s}.adme .pt.g3{animation-delay:1.4s,1.4s}
.adme .tess{fill:color-mix(in srgb,var(--tit) 10%,var(--bg));stroke:var(--tit);stroke-width:5;opacity:0;animation:pop .4s both}

.emiv{width:100%}
.emiv svg{width:100%;height:auto;overflow:visible}
.emiv .asse{stroke:var(--linea);stroke-width:6;stroke-linecap:round}
.emiv .assetxt{font-family:'Inter',sans-serif;font-size:27px;font-weight:600;fill:var(--sop);letter-spacing:.14em;text-transform:uppercase}
.emiv .liv{stroke:var(--linea);stroke-width:4;stroke-dasharray:10 14}
.emiv .livtxt{font-family:'Inter',sans-serif;font-size:30px;font-weight:700;fill:var(--tit);text-anchor:end;dominant-baseline:central;opacity:0;animation:appari .4s both}
.emiv .tick{stroke:var(--tit);stroke-width:4}
.emiv .ticktxt{font-family:'Inter',sans-serif;font-size:28px;font-weight:600;fill:var(--fg);text-anchor:middle;opacity:0;animation:appari .4s both}
.emiv .linea{fill:none;stroke:var(--acc);stroke-width:12;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:1 2;stroke-dashoffset:1.1;animation:disegna 1.8s cubic-bezier(.3,0,.5,1) both .3s}
.emiv .area{fill:var(--acc);opacity:0;animation:appariPieno 1s both 1.9s}
.emiv .punto{fill:var(--bg);stroke:var(--acc);stroke-width:8;opacity:0;animation:pop .4s both;transform-box:fill-box;transform-origin:center}
.emiv .plateau{stroke:var(--tit);stroke-width:6;stroke-dasharray:16 14;opacity:0;animation:appari .5s both 2.1s}
.emiv .nota{opacity:0;animation:sali .5s both}
.emiv .nota .t{font-family:'Inter',sans-serif;font-size:38px;font-weight:700;fill:var(--tit)}
.emiv .nota.key .t{fill:var(--acc)}
.emiv .nota .d{font-family:'Inter',sans-serif;font-size:26px;fill:var(--fg);opacity:.78}
.emiv .dose{fill:var(--tit);opacity:0;animation:pop .3s both;transform-box:fill-box;transform-origin:center}

.fin{width:100%}
.fin svg{width:100%;height:auto;overflow:visible}
.fin .banda{fill:var(--tit);opacity:0;animation:appariPieno .8s both .3s}
.fin .soglia{stroke:var(--tit);stroke-width:5;stroke-dasharray:14 12;opacity:0;animation:appari .5s both .5s}
.fin .soglia.toss{stroke:var(--acc)}
.fin .sogtxt{font-family:'Inter',sans-serif;font-size:28px;font-weight:700;fill:var(--tit);letter-spacing:.06em;text-transform:uppercase;opacity:0;animation:appari .5s both .7s}
.fin .sogtxt.toss{fill:var(--acc)}
.fin .asse{stroke:var(--linea);stroke-width:6;stroke-linecap:round}
.fin .assetxt{font-family:'Inter',sans-serif;font-size:27px;font-weight:600;fill:var(--sop);letter-spacing:.14em;text-transform:uppercase}
.fin .linea{fill:none;stroke:var(--tit);stroke-width:12;stroke-linecap:round;stroke-dasharray:1 2;stroke-dashoffset:1.1;animation:disegna 1.6s cubic-bezier(.3,0,.5,1) both .9s}
.fin .sopra{fill:var(--acc);opacity:0;animation:appari .5s both 2.2s}
.fin .allarme{font-family:'Inter',sans-serif;font-size:34px;font-weight:800;fill:var(--acc);opacity:0;animation:pop .5s both 2.3s;transform-box:fill-box;transform-origin:center}
.fin .lista > div{font-family:'Inter',sans-serif;display:flex;flex-direction:column;gap:12px;height:100%;justify-content:center}
.fin .lista .h{font-size:26px;font-weight:600;color:var(--sop);letter-spacing:.14em;text-transform:uppercase;margin-bottom:6px;opacity:0;animation:appari .4s both 1s}
.fin .lista .f{font-size:33px;font-weight:700;color:var(--tit);padding:8px 22px;border:3px solid var(--linea);border-radius:999px;align-self:flex-start;opacity:0;animation:scivola .4s cubic-bezier(.22,.7,.3,1) both}
.fin .lista .f.key{color:var(--acc);border-color:var(--acc)}
.fin .lista .f em{font-style:normal;font-weight:500;opacity:.75;margin-left:8px;font-size:26px}
.fin .lista.fitta > div{gap:7px;justify-content:flex-start;padding-top:10px}
.fin .lista.fitta .f{font-size:29px;padding:4px 18px}
.fin .lista.fitta .h{margin-bottom:2px}

.recet{display:flex;gap:40px;width:100%}
.recet .pan{flex:1;display:flex;flex-direction:column;align-items:center;gap:10px;opacity:0;animation:sali .5s cubic-bezier(.22,.7,.3,1) both}
.recet .pan.off{opacity:.26;animation:none}
.recet .pan svg{width:100%;height:auto;overflow:visible}
.recet .memb{fill:none;stroke:var(--tit);stroke-width:10;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:1 2;stroke-dashoffset:1.1;animation:disegna .9s ease-out both .2s}
.recet .memb2{stroke:var(--tit);stroke-width:6;opacity:.5}
.recet .lig{transform-box:fill-box;transform-origin:center;animation:calaLig .9s cubic-bezier(.4,0,.3,1) both 1.1s}
.recet .lig .corpo{fill:var(--bg);stroke:var(--acc);stroke-width:9}
.recet .lig.ant .corpo{stroke:var(--tit);fill:var(--tit)}
.recet .segnale{fill:none;stroke:var(--acc);stroke-width:10;stroke-linecap:round;stroke-dasharray:1 2;stroke-dashoffset:1.1;animation:disegna .5s ease-out both 2.1s}
.recet .onda{fill:none;stroke:var(--acc);stroke-width:5;opacity:0;animation:appari .4s both}
.recet .onda.o1{animation-delay:2.15s}.recet .onda.o2{animation-delay:2.35s}.recet .onda.o3{animation-delay:2.55s}
.recet .croce{fill:none;stroke:var(--tit);stroke-width:12;stroke-linecap:round;opacity:0;animation:pop .4s both 2.2s;transform-box:fill-box;transform-origin:center}
.recet .pan .t{font-size:40px;font-weight:700;color:var(--tit);text-align:center}
.recet .pan.key .t{color:var(--acc)}
.recet .pan .d{font-size:27px;color:var(--fg);opacity:.8;text-align:center;line-height:1.2}
@keyframes calaLig{from{transform:translateY(-120px)}to{transform:none}}

.leg{display:flex;gap:40px;width:100%}
.leg .pan{flex:1;display:flex;flex-direction:column;align-items:center;gap:8px;padding:26px 28px 30px;border:4px solid var(--linea);border-radius:26px;opacity:0;animation:sali .5s cubic-bezier(.22,.7,.3,1) both}
.leg .pan.key{border-color:var(--acc);border-width:6px}
.leg .pan.off{opacity:.26;animation:none}
.leg .pan svg{width:100%;height:auto;overflow:visible}
.leg .alb{fill:color-mix(in srgb,var(--tit) 12%,var(--bg));stroke:var(--tit);stroke-width:6;opacity:0;animation:pop .4s both;transform-box:fill-box;transform-origin:center}
.leg .albtxt{font-family:'Inter',sans-serif;font-size:22px;font-weight:600;fill:var(--tit);text-anchor:middle;dominant-baseline:central;opacity:0;animation:appari .3s both}
.leg .leg-f{fill:var(--tit);opacity:0;animation:pop .3s both;transform-box:fill-box;transform-origin:center}
.leg .leg-l{fill:var(--acc);opacity:0;animation:pop .3s both;transform-box:fill-box;transform-origin:center}
.leg .pan .h{font-size:40px;font-weight:700;color:var(--tit);text-align:center}
.leg .pan.key .h{color:var(--acc)}
.leg .pan .d{font-size:27px;color:var(--fg);opacity:.82;text-align:center;line-height:1.2}
.leg .pan .big{font-size:52px;font-weight:800;color:var(--acc);line-height:1}

/* ---- 5.3: i calcoli ---- */
.calc{display:flex;flex-direction:column;justify-content:center;gap:22px;width:100%;min-height:560px}
.calc .riga{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:16px 22px;opacity:0;animation:appari .2s both}
.calc .riga.off{opacity:.26;animation:none}
.calc .tok{font-size:72px;font-weight:800;color:var(--tit);letter-spacing:-.01em;line-height:1.05;padding:8px 22px;border-radius:18px;background:color-mix(in srgb,var(--tit) 5%,var(--bg));
  opacity:0;animation:pop .4s cubic-bezier(.22,.7,.3,1) both}
.calc .tok.op{background:none;color:var(--sop);font-weight:600;padding:8px 4px;font-size:60px}
.calc .tok.ris{color:var(--bg);background:var(--acc)}
.calc .riga.off .tok.ris{background:color-mix(in srgb,var(--acc) 30%,var(--bg))}
.calc.n2 .tok{font-size:62px}.calc.n2 .tok.op{font-size:52px}
.calc.n3 .tok{font-size:54px;padding:6px 18px}.calc.n3 .tok.op{font-size:46px}
.calc.n4 .tok{font-size:46px;padding:4px 16px}.calc.n4 .tok.op{font-size:40px}
.calc .nota{text-align:center;font-size:30px;color:var(--fg);opacity:0;animation:sali .5s both;margin-top:6px}
.calc .nota b{color:var(--acc)}

.pausa{display:flex;align-items:center;gap:60px;width:100%;min-height:560px}
.pausa .glifo{flex:0 0 360px;display:flex;flex-direction:column;align-items:center;gap:18px}
.pausa .glifo svg{width:300px;height:300px;overflow:visible}
.pausa .glifo .cerchio{fill:none;stroke:var(--acc);stroke-width:12;stroke-dasharray:1 2;stroke-dashoffset:1.1;animation:disegna 1s ease-out both .2s}
.pausa .glifo .barra{fill:var(--acc);opacity:0;animation:pop .4s both;transform-box:fill-box;transform-origin:center}
.pausa .glifo .b1{animation-delay:1s}.pausa .glifo .b2{animation-delay:1.15s}
.pausa .glifo .lbl{font-size:30px;font-weight:700;color:var(--acc);letter-spacing:.14em;text-transform:uppercase;opacity:0;animation:appari .4s both 1.3s;text-align:center}
.pausa .tx{flex:1;display:flex;flex-direction:column;gap:26px}
.pausa .tx .es{font-size:28px;font-weight:600;color:var(--sop);letter-spacing:.14em;text-transform:uppercase;opacity:0;animation:appari .4s both .3s}
.pausa .tx .testo{font-family:'Source Serif 4',serif;font-size:58px;line-height:1.22;color:var(--tit);opacity:0;animation:sali .6s cubic-bezier(.22,.7,.3,1) both .4s}
.pausa .tx .testo b{color:var(--acc);font-weight:700}
.pausa .tx .dati{display:flex;flex-wrap:wrap;gap:14px}
.pausa .tx .dati span{font-size:32px;font-weight:700;color:var(--tit);padding:8px 24px;border:3px solid var(--linea);border-radius:999px;opacity:0;animation:scivola .4s both}

.gocce{display:flex;gap:40px;width:100%}
.gocce .pan{flex:1;display:flex;flex-direction:column;align-items:center;gap:10px;padding:20px 24px 26px;border:4px solid var(--linea);border-radius:26px;opacity:0;animation:sali .5s cubic-bezier(.22,.7,.3,1) both}
.gocce .pan.key{border-color:var(--acc);border-width:6px}
.gocce .pan.off{opacity:.26;animation:none}
.gocce .pan svg{width:360px;height:auto;overflow:visible}
.gocce .camera{fill:color-mix(in srgb,var(--tit) 6%,var(--bg));stroke:var(--tit);stroke-width:8;stroke-linejoin:round}
.gocce .tubo{fill:none;stroke:var(--tit);stroke-width:8;stroke-linecap:round}
.gocce .livello{fill:color-mix(in srgb,var(--acc) 22%,var(--bg))}
.gocce .gt{fill:var(--acc);animation:cade linear infinite;transform-box:fill-box;transform-origin:center}
@keyframes cade{0%{opacity:0;transform:translateY(-10px) scale(.6)}15%{opacity:1;transform:none}85%{opacity:1;transform:translateY(118px)}100%{opacity:0;transform:translateY(128px)}}
.gocce .pan .big{font-size:64px;font-weight:800;color:var(--tit);line-height:1}
.gocce .pan.key .big{color:var(--acc)}
.gocce .pan .t{font-size:34px;font-weight:700;color:var(--tit);text-align:center}
.gocce .pan .d{font-size:26px;color:var(--fg);opacity:.8;text-align:center;line-height:1.2}

/* ---- 5.5: le classi di farmaci ---- */
.prof{width:100%}
.prof svg{width:100%;height:auto;overflow:visible}
.prof .asse{stroke:var(--linea);stroke-width:6;stroke-linecap:round}
.prof .assetxt{font-family:'Inter',sans-serif;font-size:27px;font-weight:600;fill:var(--sop);letter-spacing:.14em;text-transform:uppercase}
.prof .tick{stroke:var(--linea);stroke-width:4}
.prof .ticktxt{font-family:'Inter',sans-serif;font-size:26px;font-weight:600;fill:var(--fg);text-anchor:middle;opacity:.8}
.prof .linea{fill:none;stroke:var(--tit);stroke-width:11;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:1 2;stroke-dashoffset:1.1;animation:disegna 1.4s cubic-bezier(.3,0,.5,1) both}
.prof .g.key .linea{stroke:var(--acc)}
.prof .g.off{opacity:.2}
.prof .g.off .linea{animation:none;stroke-dashoffset:0}
.prof .area{fill:var(--tit);opacity:0;animation:appariPieno .8s both}
.prof .g.key .area{fill:var(--acc)}
.prof .g.off .area{animation:none;opacity:.03}
.prof .lbl{font-family:'Inter',sans-serif;font-size:32px;font-weight:700;fill:var(--tit);opacity:0;animation:sali .5s both}
.prof .g.key .lbl{fill:var(--acc)}
.prof .g.off .lbl{animation:none;opacity:.25}
.prof .sub{font-family:'Inter',sans-serif;font-size:24px;fill:var(--fg);opacity:0;animation:sali .5s both}
.prof .g.off .sub{animation:none;opacity:.2}
.prof .pasto{fill:var(--acc);opacity:0;animation:pop .4s both 1.2s;transform-box:fill-box;transform-origin:center}
.prof .pastotxt{font-family:'Inter',sans-serif;font-size:24px;font-weight:700;fill:var(--acc);text-anchor:middle;opacity:0;animation:appari .4s both 1.3s}

/* ---- 5.6: antibiotici, oppioidi, stupefacenti ---- */
.mic svg,.resp svg,.antid svg{width:100%;height:auto;overflow:visible}
.mic .asse,.antid .asse{stroke:var(--linea);stroke-width:6;stroke-linecap:round}
.mic .soglia,.antid .soglia{stroke:var(--sop);stroke-width:5;stroke-dasharray:18 14;opacity:0;animation:appari .5s both .3s}
.mic .sogliatxt,.antid .sogliatxt{font-family:'Inter',sans-serif;font-size:24px;font-weight:600;fill:var(--sop);letter-spacing:.1em;text-transform:uppercase;opacity:0;animation:appari .5s both .4s}
.mic .linea{fill:none;stroke:var(--tit);stroke-width:11;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:1 2;stroke-dashoffset:1.1;animation:disegna 1.6s cubic-bezier(.3,0,.5,1) both .4s}
.mic .pan.key .linea{stroke:var(--acc)}
.mic .sopra{fill:var(--tit);opacity:0;animation:appari .4s both}
.mic .picco{stroke:var(--acc);stroke-width:5;stroke-dasharray:12 10;opacity:0;animation:appari .4s both 1.7s}
.mic .piccotxt{font-family:'Inter',sans-serif;font-size:30px;font-weight:700;fill:var(--acc);opacity:0;animation:sali .5s both 1.8s}
.mic .lbl{font-family:'Inter',sans-serif;font-size:34px;font-weight:700;fill:var(--tit);opacity:0;animation:sali .5s both .6s}
.mic .pan.key .lbl{fill:var(--acc)}
.mic .sub{font-family:'Inter',sans-serif;font-size:25px;fill:var(--fg);opacity:0;animation:sali .5s both .8s}
.mic .pan.off{opacity:.18}
.mic .pan.off .linea,.mic .pan.off .sopra,.mic .pan.off .picco,.mic .pan.off .piccotxt,.mic .pan.off .lbl,.mic .pan.off .sub,.mic .pan.off .soglia,.mic .pan.off .sogliatxt{animation:none;opacity:1;stroke-dashoffset:0}
.resp .finestra{fill:var(--acc);opacity:0;animation:accendi .6s both 1.9s;--op:.1}
.resp .fintxt{font-family:'Inter',sans-serif;font-size:28px;font-weight:700;fill:var(--acc);opacity:0;animation:sali .5s both 2.1s}
.resp .trk{font-family:'Inter',sans-serif;font-size:25px;font-weight:600;fill:var(--sop);letter-spacing:.12em;text-transform:uppercase}
.resp .liv{font-family:'Inter',sans-serif;font-size:24px;font-weight:600;fill:var(--fg);opacity:.7}
.resp .guida{stroke:var(--linea);stroke-width:4;stroke-dasharray:10 10}
.resp .sed{fill:none;stroke:var(--acc);stroke-width:11;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:1 2;stroke-dashoffset:1.1;animation:disegna 1.6s linear both .3s}
.resp .fr{fill:none;stroke:var(--tit);stroke-width:11;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:1 2;stroke-dashoffset:1.1;animation:disegna 1.6s linear both .3s}
.resp .assetempo,.antid .assetempo{font-family:'Inter',sans-serif;font-size:24px;font-weight:600;fill:var(--sop);letter-spacing:.1em;text-transform:uppercase}
.resp .segno circle{fill:var(--acc);opacity:0;animation:pop .4s both 2s;transform-box:fill-box;transform-origin:center}
.resp .segno text{font-family:'Inter',sans-serif;font-size:30px;font-weight:700;fill:var(--acc);opacity:0;animation:appari .4s both 2.1s}
.antid .rischio{fill:var(--acc);opacity:0;animation:accendi .6s both;--op:.12}
.antid .rischiotxt{font-family:'Inter',sans-serif;font-size:28px;font-weight:700;fill:var(--acc);opacity:0;animation:sali .5s both 2.1s}
.antid .c-opp{fill:none;stroke:var(--tit);stroke-width:11;stroke-linecap:round;stroke-dasharray:1 2;stroke-dashoffset:1.1;animation:disegna 1.4s cubic-bezier(.3,0,.5,1) both .2s}
.antid .c-nal{fill:none;stroke:var(--acc);stroke-width:11;stroke-linecap:round;stroke-dasharray:1 2;stroke-dashoffset:1.1;animation:disegna 1.2s cubic-bezier(.3,0,.5,1) both .6s}
.antid .lbl{font-family:'Inter',sans-serif;font-size:32px;font-weight:700;opacity:0;animation:sali .5s both 1.5s}
.antid .lbl.opp{fill:var(--tit)}
.antid .lbl.nal{fill:var(--acc)}
.reg{width:100%}
.reg .pagina{position:relative;background:var(--bg);border:3px solid var(--linea);border-radius:18px;padding:30px 44px 36px;box-shadow:0 18px 40px rgba(0,0,0,.06);opacity:0;animation:appari .5s both .2s}
.reg .testa{display:flex;align-items:baseline;gap:28px;margin-bottom:18px;padding-bottom:14px;border-bottom:3px solid var(--tit)}
.reg .tit{font-family:'Inter',sans-serif;font-size:24px;font-weight:600;color:var(--sop);letter-spacing:.12em;text-transform:uppercase}
.reg .farmaco{font-family:'Inter',sans-serif;font-size:32px;font-weight:700;color:var(--tit);flex:1}
.reg .pag{font-family:'Inter',sans-serif;font-size:24px;font-weight:600;color:var(--sop)}
.reg .riga{display:grid;grid-template-columns:1fr 1.2fr 1.2fr 1.5fr 1.2fr .9fr;gap:18px;padding:14px 12px;border-bottom:2px solid var(--linea);font-family:'Inter',sans-serif;font-size:29px;color:var(--fg);opacity:0;animation:sali .45s both;position:relative}
.reg .riga.intest{font-size:21px;font-weight:600;color:var(--sop);letter-spacing:.1em;text-transform:uppercase;animation-delay:.4s;border-bottom-width:3px}
.reg .riga .c1{color:var(--tit);font-weight:700}
.reg .riga .c2{color:var(--acc);font-weight:700}
.reg .riga .c4{font-weight:700}
.reg .riga .c5{font-style:italic}
.reg .riga.key{background:color-mix(in srgb,var(--acc) 8%,var(--bg));border-radius:10px}
.reg .riga.corr span:not(.firma-corr){text-decoration:line-through;text-decoration-color:var(--acc);text-decoration-thickness:4px;opacity:.55}
.reg .firma-corr{position:absolute;right:16px;top:-18px;font-size:25px;font-weight:700;color:var(--acc);font-style:italic;opacity:0;animation:sali .4s both 2s}
.reg .timbro-box{position:absolute;right:190px;top:-22px;transform:rotate(-8deg)}
.reg .timbro{border:4px solid var(--acc);border-radius:12px;padding:6px 16px;color:var(--acc);font-family:'Inter',sans-serif;font-size:20px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;text-align:center;line-height:1.2;opacity:0;animation:appari .4s both}

/* ---- 6.1: accessi venosi periferici ---- */
.calibri svg,.vene svg{width:100%;height:auto;overflow:visible}
.calibri .cal{opacity:0;animation:sali .5s both}
.calibri .cal.off{animation:none;opacity:.18}
.calibri .n{font-family:'Inter',sans-serif;font-size:40px;font-weight:800;fill:var(--tit)}
.calibri .nome{font-family:'Inter',sans-serif;font-size:26px;fill:var(--fg);opacity:.8}
.calibri .regola{font-family:'Inter',sans-serif;font-size:30px;font-weight:700;fill:var(--acc);opacity:0;animation:appari .5s both 1.5s}
.vene .arto{fill:none;stroke:var(--linea);stroke-width:7;stroke-linejoin:round}
.vene .vena{fill:none;stroke:var(--tit);stroke-width:9;stroke-linecap:round;opacity:.7;stroke-dasharray:1 2;stroke-dashoffset:1.1;animation:disegna 1.2s both .2s}
.vene .zona ellipse{fill:var(--acc);fill-opacity:.08;stroke:var(--acc);stroke-width:5;stroke-dasharray:16 12}
.vene .zona{opacity:0;animation:appari .5s both}
.vene .zona:not(.on){animation:none;opacity:0}
.vene .zona.no ellipse{stroke:var(--sop);fill:none}
.vene .zona.no .croce{stroke:var(--acc);stroke-width:10;stroke-linecap:round}
.vene .lbl{font-family:'Inter',sans-serif;font-size:32px;font-weight:700;fill:var(--acc)}
.vene .zona.no .lbl{fill:var(--sop)}
.vene .sub{font-family:'Inter',sans-serif;font-size:24px;fill:var(--fg)}
.vene .verso{font-family:'Inter',sans-serif;font-size:26px;font-weight:600;fill:var(--sop);letter-spacing:.12em;text-transform:uppercase}

/* ---- 6.2: accessi venosi centrali ---- */
.accessi svg{width:100%;height:auto;overflow:visible}
.accessi .corpo{fill:none;stroke:var(--linea);stroke-width:7;stroke-linejoin:round;stroke-linecap:round}
.accessi .venaint{fill:none;stroke:var(--tit);stroke-width:8;stroke-linecap:round;opacity:.45}
.accessi .cava ellipse{fill:var(--tit);fill-opacity:.08;stroke:var(--tit);stroke-width:4;stroke-dasharray:12 10}
.accessi .cava text{font-family:'Inter',sans-serif;font-size:24px;font-weight:600;fill:var(--tit);letter-spacing:.08em;text-transform:uppercase}
.accessi .dev{opacity:0;animation:appari .4s both}
.accessi .dev.off{animation:none;opacity:0}
.accessi .dev path{fill:none;stroke:var(--acc);stroke-width:9;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:1 2;stroke-dashoffset:1.1;animation:disegna 1.1s cubic-bezier(.3,0,.5,1) both}
.accessi .dev.per path{stroke:var(--sop)}
.accessi .dev .punta{fill:var(--acc);opacity:0;animation:pop .35s both;transform-box:fill-box;transform-origin:center}
.accessi .dev.per .punta{fill:var(--sop)}
.accessi .dev .serb{fill:var(--bg);stroke:var(--acc);stroke-width:7}
.accessi .dev .lbl{font-family:'Inter',sans-serif;font-size:30px;font-weight:700;fill:var(--acc);opacity:0;animation:sali .4s both}
.accessi .dev.per .lbl{fill:var(--sop)}
.accessi .dev .sub{font-family:'Inter',sans-serif;font-size:23px;fill:var(--fg);opacity:0;animation:sali .4s both}

/* ---- 6.3: fluidoterapia ---- */
.tonic svg{width:100%;height:auto;overflow:visible}
.tonic .pan{opacity:0;animation:appari .5s both}
.tonic .pan.off{animation:none;opacity:.18}
.tonic .vaso{fill:var(--tit);fill-opacity:.06;stroke:var(--linea);stroke-width:5}
.tonic .cell{fill:var(--acc);fill-opacity:.14;stroke:var(--tit);stroke-width:8}
.tonic .pan.key .cell{stroke:var(--acc)}
.tonic .fr{fill:none;stroke:var(--acc);stroke-width:8;stroke-linecap:round;stroke-dasharray:1 2;stroke-dashoffset:1.1;animation:disegna .6s both}
.tonic .tip{fill:var(--acc);opacity:0;animation:pop .3s both}
.tonic .lbl{font-family:'Inter',sans-serif;font-size:34px;font-weight:700;fill:var(--tit)}
.tonic .pan.key .lbl{fill:var(--acc)}
.tonic .sub{font-family:'Inter',sans-serif;font-size:24px;fill:var(--fg)}
.tonic .acqua{font-family:'Inter',sans-serif;font-size:22px;font-weight:600;fill:var(--acc);letter-spacing:.1em;text-transform:uppercase;opacity:0;animation:appari .4s both}

/* ---- 6.4: emogasanalisi ---- */
.ega svg{width:100%;height:auto;overflow:visible}
.ega .col.off{opacity:.15}
.ega .scala{fill:var(--tit);fill-opacity:.06;stroke:var(--linea);stroke-width:4}
.ega .norma{fill:var(--tit);fill-opacity:.22}
.ega .lim{font-family:'Inter',sans-serif;font-size:22px;fill:var(--sop);font-weight:600}
.ega .nome{font-family:'Inter',sans-serif;font-size:34px;font-weight:700;fill:var(--tit)}
.ega .val{opacity:0;animation:appari .4s both}
.ega .val line{stroke:var(--acc);stroke-width:8;stroke-linecap:round}
.ega .val.ok line{stroke:var(--tit)}
.ega .val text{font-family:'Inter',sans-serif;font-size:36px;font-weight:800;fill:var(--acc)}
.ega .val.ok text{fill:var(--tit)}
.ega .freccia2{fill:none;stroke:var(--acc);stroke-width:8;stroke-linecap:round;stroke-linejoin:round}
.ega .lettura{display:block;font-family:'Inter',sans-serif;font-size:34px;font-weight:600;color:var(--tit);text-align:center;line-height:1.3;opacity:0;animation:sali .5s both 1.8s}
.ega .lettura .acc,.ega .lettura b,.ega .lettura strong{color:var(--acc)}

/* ---- 6.5: nutrizione parenterale ---- */
.sacca svg{width:100%;height:auto;overflow:visible}
.sacca .borsa{fill:var(--bg);stroke:var(--linea);stroke-width:6}
.sacca .cam{opacity:0;animation:appari .5s both}
.sacca .cam rect{stroke:none}
.sacca .setto{stroke:var(--tit);stroke-width:5;stroke-dasharray:14 10}
.sacca .setto.rotto{stroke-dasharray:none;opacity:.25}
.sacca .etic{font-family:'Inter',sans-serif;font-size:26px;font-weight:700;fill:var(--tit);text-anchor:middle}
.sacca .sub{font-family:'Inter',sans-serif;font-size:22px;fill:var(--fg);text-anchor:middle}
.sacca .lbl{font-family:'Inter',sans-serif;font-size:34px;font-weight:700;fill:var(--tit);text-anchor:middle;opacity:0;animation:sali .5s both}
.sacca .lbl.no{fill:var(--acc)}
.sacca .pan.off{opacity:.18}
.sacca .goccia{fill:#E8B84A;opacity:0;animation:pop .4s both}
.sacca .strato{fill:#E8B84A;opacity:0;animation:appari .5s both}
.sacca .crema{fill:var(--bg);opacity:0;animation:appari .5s both}
.sacca .croce{stroke:var(--acc);stroke-width:12;stroke-linecap:round;opacity:0;animation:appari .3s both}
.sacca .spunta{fill:none;stroke:var(--tit);stroke-width:12;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:1 2;stroke-dashoffset:1.1;animation:disegna .5s both}

/* ---- 6.6: emotrasfusione ---- */
.gruppi svg{width:100%;height:auto;overflow:visible}
.gruppi .pan{opacity:0;animation:appari .5s both}
.gruppi .pan.off{animation:none;opacity:.18}
.gruppi .sacca{stroke:var(--tit);stroke-width:6}
.gruppi .sacca.rossa{fill:#F4C3C3}
.gruppi .sacca.gialla{fill:#F6E7B4}
.gruppi .big{font-family:'Inter',sans-serif;font-size:54px;font-weight:800;fill:var(--acc);text-anchor:middle}
.gruppi .ric{opacity:0;animation:pop .4s both;transform-box:fill-box;transform-origin:center}
.gruppi .ric circle{fill:var(--bg);stroke:var(--tit);stroke-width:5}
.gruppi .ric text{font-family:'Inter',sans-serif;font-size:30px;font-weight:700;fill:var(--tit);text-anchor:middle}
.gruppi .fr{fill:none;stroke:var(--tit);stroke-width:6;stroke-linecap:round;stroke-dasharray:1 2;stroke-dashoffset:1.1;animation:disegna .5s both}
.gruppi .tit{font-family:'Inter',sans-serif;font-size:34px;font-weight:700;fill:var(--tit);text-anchor:middle}
.gruppi .sub{font-family:'Inter',sans-serif;font-size:24px;fill:var(--fg);text-anchor:middle}
.gruppi .pan.key .tit{fill:var(--acc)}

/* ---- 6.7: fase preanalitica ---- */
.provette svg{width:100%;height:auto;overflow:visible}
.provette .tubo{opacity:0;animation:appari .5s both}
.provette .tubo.off{animation:none;opacity:.18}
.provette .vetro{fill:none;stroke:var(--tit);stroke-width:5;stroke-linejoin:round}
.provette .sangue{fill:#B9262E}
.provette .tappo{stroke:var(--tit);stroke-width:4}
.provette .tnum circle{fill:var(--bg);stroke:var(--tit);stroke-width:4}
.provette .tnum text{font-family:'Inter',sans-serif;font-size:26px;font-weight:800;fill:var(--tit);text-anchor:middle}
.provette .tubo.key .tnum circle{fill:var(--acc);stroke:var(--acc)}
.provette .tubo.key .tnum text{fill:#fff}
.provette .tnome{font-family:'Inter',sans-serif;font-size:30px;font-weight:700;fill:var(--tit);text-anchor:middle}
.provette .tubo.key .tnome{fill:var(--acc)}
.provette .tuso{font-family:'Inter',sans-serif;font-size:22px;fill:var(--fg);text-anchor:middle}
.provette .tpassa{fill:none;stroke:var(--acc);stroke-width:7;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:1 2;stroke-dashoffset:1.1;animation:disegna .7s both}
.provette .tnota{font-family:'Inter',sans-serif;font-size:26px;font-weight:700;fill:var(--acc);text-anchor:middle;opacity:0;animation:appari .4s both}
.provette .ttacca{stroke:var(--tit);stroke-width:5;stroke-dasharray:14 10}
.provette .ttacca-t{font-family:'Inter',sans-serif;font-size:24px;font-weight:700;fill:var(--tit)}
.provette .tok{fill:none;stroke:#1E8A4C;stroke-width:12;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:1 2;stroke-dashoffset:1.1;animation:disegna .4s both}
.provette .tno{fill:none;stroke:var(--acc);stroke-width:12;stroke-linecap:round;opacity:0;animation:appari .3s both}
.provette .tnome.no{fill:var(--acc)}

/* ---- 7.1: riparazione tessutale ---- */
.fasi svg,.fondo svg,.orologio svg,.intenzioni svg{width:100%;height:auto;overflow:visible}
.fasi .asse{stroke:var(--linea);stroke-width:3}
.fasi .tacca{stroke:var(--linea);stroke-width:3}
.fasi .tempo-t{font-family:'Inter',sans-serif;font-size:22px;font-weight:600;fill:var(--fg);text-anchor:middle;letter-spacing:.06em;text-transform:uppercase}
.fasi .banda{opacity:0;animation:appari .5s both}
.fasi .banda.off{animation:none;opacity:.18}
.fasi .banda rect{transform-box:fill-box;transform-origin:left;animation:cresciX .7s both;stroke:var(--tit);stroke-width:3}
.fasi .banda.f0 rect{fill:#E9B8B8}.fasi .banda.f1 rect{fill:#F4C3C3}.fasi .banda.f2 rect{fill:#F6E7B4}.fasi .banda.f3 rect{fill:#D7E6DC}
.fasi .banda .n{font-family:'Inter',sans-serif;font-size:30px;font-weight:800;fill:var(--tit)}
.fasi .banda .fnome{font-family:'Inter',sans-serif;font-size:30px;font-weight:700;fill:var(--tit)}
.fasi .banda .fd{font-family:'Inter',sans-serif;font-size:22px;fill:var(--fg)}
.fasi .banda.key .fnome{fill:var(--acc)}
.timeq{display:grid;grid-template-columns:repeat(4,1fr);gap:22px;width:100%}
.timeq .tile{border:2px solid var(--linea);border-radius:22px;padding:22px 24px;min-height:360px;opacity:0;animation:sali .5s both;background:var(--bg)}
.timeq .tile.off{animation:none;opacity:.22}
.timeq .tile.key{border-color:var(--acc);background:#FDECEF}
.timeq .lettera{font-family:'Inter',sans-serif;font-size:96px;font-weight:800;line-height:1;color:var(--tit)}
.timeq .tile.key .lettera{color:var(--acc)}
.timeq .parola{font-family:'Inter',sans-serif;font-size:24px;font-style:italic;color:var(--fg);margin-top:4px}
.timeq .domanda{font-family:'Inter',sans-serif;font-size:27px;font-weight:600;color:var(--tit);margin-top:22px;line-height:1.25}
.timeq .intervento{font-family:'Inter',sans-serif;font-size:24px;color:var(--acc);font-weight:700;margin-top:18px;padding-top:14px;border-top:2px solid var(--linea)}
.fondo .zona{opacity:0;animation:appari .6s both}
.fondo .zona.off{animation:none;opacity:.14}
.fondo .pelle{fill:#F1DCCB;stroke:var(--tit);stroke-width:4}
.fondo .rosa{fill:#F3B7C0}.fondo .rosso{fill:#C8323A}.fondo .rosso.pallido{fill:#D9A3A3}.fondo .giallo{fill:#E9C84A}.fondo .nero{fill:#2B2420}
.fondo .leg{opacity:0;animation:scivola .5s both}
.fondo .leg.off{animation:none;opacity:.18}
.fondo .leg rect{stroke:var(--tit);stroke-width:3}
.fondo .leg .lt{font-family:'Inter',sans-serif;font-size:32px;font-weight:700;fill:var(--tit)}
.fondo .leg .ld{font-family:'Inter',sans-serif;font-size:23px;fill:var(--fg)}
.fondo .leg.key .lt{fill:var(--acc)}
.fondo .allarme{font-family:'Inter',sans-serif;font-size:26px;font-weight:700;fill:var(--acc);text-anchor:middle;opacity:0;animation:appari .4s both}
.orologio .quadrante{fill:none;stroke:var(--linea);stroke-width:4;stroke-dasharray:10 10}
.orologio .tick{stroke:var(--tit);stroke-width:4}
.orologio .ora{font-family:'Inter',sans-serif;font-size:30px;font-weight:700;fill:var(--tit);text-anchor:middle}
.orologio .lesione{fill:#C8323A;stroke:var(--tit);stroke-width:4}
.orologio .testa{fill:none;stroke:var(--acc);stroke-width:7;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:1 2;stroke-dashoffset:1.1;animation:disegna .6s both}
.orologio .testa-t{font-family:'Inter',sans-serif;font-size:26px;font-weight:700;fill:var(--acc);text-anchor:middle;opacity:0;animation:appari .4s both}
.orologio .tunnel{fill:none;stroke:var(--tit);stroke-width:6;stroke-linecap:round;stroke-dasharray:1 2;stroke-dashoffset:1.1;animation:disegna .6s both}
.orologio .tunnel-t{text-anchor:middle;font-family:'Inter',sans-serif;font-size:26px;font-weight:700;fill:var(--tit);opacity:0;animation:appari .4s both}
.orologio .mis{opacity:0;animation:scivola .5s both}
.orologio .mis .mt{font-family:'Inter',sans-serif;font-size:34px;font-weight:700;fill:var(--tit)}
.orologio .mis .md{font-family:'Inter',sans-serif;font-size:24px;fill:var(--fg)}
.orologio .mis.key .mt{fill:var(--acc)}
.intenzioni .pan{opacity:0;animation:appari .5s both}
.intenzioni .pan.off{animation:none;opacity:.18}
.intenzioni .cute{fill:#F1DCCB;stroke:var(--tit);stroke-width:5;stroke-linejoin:round}
.intenzioni .gran{fill:#C8323A;transform-box:fill-box;transform-origin:bottom;animation:cresciY .8s both}
.intenzioni .sutura{fill:none;stroke:var(--tit);stroke-width:5;stroke-linecap:round}
.intenzioni .sutura.poi{stroke:var(--acc);stroke-dasharray:12 10}
.intenzioni .su{fill:none;stroke:var(--acc);stroke-width:6;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:1 2;stroke-dashoffset:1.1;animation:disegna .5s both}
.intenzioni .it{font-family:'Inter',sans-serif;font-size:32px;font-weight:700;fill:var(--tit);text-anchor:middle}
.intenzioni .pan.key .it{fill:var(--acc)}
.intenzioni .id{font-family:'Inter',sans-serif;font-size:23px;fill:var(--fg);text-anchor:middle}

/* ---- 7.2: lesioni da pressione ---- */
.stadi svg,.sedi svg{width:100%;height:auto;overflow:visible}
.stadi .strato{stroke:var(--tit);stroke-width:3}
.stadi .s0{fill:#F1DCCB}.stadi .s1{fill:#E8B7A8}.stadi .s2{fill:#F6E7B4}.stadi .s3{fill:#C8323A}.stadi .s4{fill:#EDE6D6}
.stadi .nome{font-family:'Inter',sans-serif;font-size:22px;font-weight:600;fill:var(--fg);letter-spacing:.04em;text-transform:uppercase}
.stadi .cratere{fill:#B9262E;stroke:var(--tit);stroke-width:4;opacity:0;animation:appari .6s both}
.stadi .cratere.derma{fill:#E07A7A}
.stadi .copertura{opacity:0;animation:appari .5s both}
.stadi .eritema{fill:#D9484F;opacity:0;animation:appari .6s both}
.stadi .dti{fill:#5E2A5A;opacity:0;animation:appari .6s both}
.stadi .dtip{fill:#3B1740;opacity:0;animation:appari .8s both}
.stadi .flittene{fill:#FBE3E3;stroke:var(--tit);stroke-width:3;opacity:0;animation:appari .6s both}
.stadi .flittene.ematica{fill:#8E2A3A}
.stadi .st{font-family:'Inter',sans-serif;font-size:44px;font-weight:800;fill:var(--acc);opacity:0;animation:scivola .5s both}
.stadi .sv{font-family:'Inter',sans-serif;font-size:27px;fill:var(--fg);opacity:0;animation:scivola .5s both}
.stadi .sv.key{fill:var(--tit);font-weight:700}
.sedi .pan{opacity:0;animation:appari .5s both}
.sedi .pan.off{animation:none;opacity:.18}
.sedi .corpo{fill:#F1DCCB;stroke:var(--tit);stroke-width:4;stroke-linejoin:round}
.sedi .piano{stroke:var(--linea);stroke-width:4}
.sedi .punto{fill:var(--acc);opacity:0;animation:pop .4s both;transform-box:fill-box;transform-origin:center}
.sedi .pt{font-family:'Inter',sans-serif;font-size:22px;font-weight:700;fill:var(--acc);text-anchor:middle;opacity:0;animation:appari .4s both}
.sedi .pt.sec{fill:var(--fg);font-weight:500}
.sedi .pos{font-family:'Inter',sans-serif;font-size:30px;font-weight:700;fill:var(--tit);text-anchor:middle}
.sedi .pan.key .pos{fill:var(--acc)}

/* ---- 7.3: ulcere vascolari ---- */
.gambe2 svg,.abi svg{width:100%;height:auto;overflow:visible}
.gambe2 .pan{opacity:0;animation:appari .5s both}
.gambe2 .pan.off{animation:none;opacity:.18}
.gambe2 .cute{stroke:var(--tit);stroke-width:4;stroke-linejoin:round}
.gambe2 .cute.ven{fill:#E4B9A9}.gambe2 .cute.art{fill:#F3E6DC}
.gambe2 .pigm{fill:#A8705A;opacity:.55}
.gambe2 .ulcera{stroke:var(--tit);stroke-width:3}
.gambe2 .ulcera.ven{fill:#D9484F}.gambe2 .ulcera.art{fill:#2B2420}
.gambe2 .peli{stroke:var(--tit);stroke-width:2}
.gambe2 .polso{opacity:0;animation:pop .4s both;transform-box:fill-box;transform-origin:center}
.gambe2 .polso circle{fill:var(--bg);stroke:var(--tit);stroke-width:3}
.gambe2 .polso text{font-family:'Inter',sans-serif;font-size:22px;font-weight:700;fill:var(--tit);text-anchor:middle}
.gambe2 .polso.no text{fill:var(--acc)}
.gambe2 .gt{font-family:'Inter',sans-serif;font-size:34px;font-weight:800;fill:var(--tit);text-anchor:middle}
.gambe2 .pan.key .gt{fill:var(--acc)}
.gambe2 .gv{font-family:'Inter',sans-serif;font-size:24px;fill:var(--fg);opacity:0;animation:scivola .4s both}
.gambe2 .gv.key{fill:var(--tit);font-weight:700}
.gambe2 .riga{stroke:var(--linea);stroke-width:2;stroke-dasharray:6 8}
.abi .asse{stroke:var(--tit);stroke-width:5;stroke-linecap:round}
.abi .zona{opacity:0;animation:appari .6s both;stroke:var(--tit);stroke-width:3}
.abi .zona.off{animation:none;opacity:.14}
.abi .z0{fill:#F4C3C3}.abi .z1{fill:#F6E7B4}.abi .z2{fill:#D7E6DC}.abi .z3{fill:#E9EEF4}
.abi .soglia{font-family:'Inter',sans-serif;font-size:34px;font-weight:800;fill:var(--tit);text-anchor:middle}
.abi .zt{font-family:'Inter',sans-serif;font-size:28px;font-weight:700;fill:var(--tit);text-anchor:middle}
.abi .zd{font-family:'Inter',sans-serif;font-size:22px;fill:var(--fg);text-anchor:middle}
.abi .zona.key .zt{fill:var(--acc)}
.abi .formula{font-family:'Inter',sans-serif;font-size:30px;font-weight:700;fill:var(--tit);text-anchor:middle;opacity:0;animation:appari .5s both}
.abi .formula tspan.op{fill:var(--acc)}
.abi .tick{stroke:var(--tit);stroke-width:4}

/* ---- 7.4: ferite chirurgiche ---- */
.punti svg,.giorni svg,.ssi svg{width:100%;height:auto;overflow:visible}
.punti .pan{opacity:0;animation:appari .5s both}
.punti .pan.off{animation:none;opacity:.18}
.punti .cute{fill:#F1DCCB;stroke:var(--tit);stroke-width:5;stroke-linejoin:round}
.punti .filo{fill:none;stroke:var(--tit);stroke-width:6;stroke-linecap:round}
.punti .filo.fuori{stroke:#8E5BB5}
.punti .nodo{fill:var(--tit)}
.punti .forbice{fill:none;stroke:var(--acc);stroke-width:7;stroke-linecap:round;stroke-dasharray:1 2;stroke-dashoffset:1.1;animation:disegna .5s both}
.punti .tira{fill:none;stroke:var(--acc);stroke-width:7;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:1 2;stroke-dashoffset:1.1;animation:disegna .6s both}
.punti .pt{font-family:'Inter',sans-serif;font-size:30px;font-weight:700;fill:var(--tit);text-anchor:middle}
.punti .pan.key .pt{fill:var(--acc)}
.punti .pd{font-family:'Inter',sans-serif;font-size:23px;fill:var(--fg);text-anchor:middle}
.punti .no{fill:none;stroke:var(--acc);stroke-width:10;stroke-linecap:round;opacity:0;animation:appari .3s both}
.giorni .asse{stroke:var(--linea);stroke-width:3}
.giorni .tacca{stroke:var(--linea);stroke-width:3}
.giorni .gg{font-family:'Inter',sans-serif;font-size:22px;font-weight:600;fill:var(--fg);text-anchor:middle}
.giorni .riga{opacity:0;animation:appari .5s both}
.giorni .riga.off{animation:none;opacity:.18}
.giorni .riga rect{fill:#D7E6DC;stroke:var(--tit);stroke-width:3;transform-box:fill-box;transform-origin:left;animation:cresciX .7s both}
.giorni .riga.key rect{fill:#F4C3C3}
.giorni .riga .rt{font-family:'Inter',sans-serif;font-size:28px;font-weight:700;fill:var(--tit);text-anchor:end}
.giorni .riga.key .rt{fill:var(--acc)}
.giorni .riga .rn{font-family:'Inter',sans-serif;font-size:28px;font-weight:800;fill:var(--tit)}
.giorni .riga .rd{font-family:'Inter',sans-serif;font-size:22px;fill:var(--fg)}
.ssi .strato{stroke:var(--tit);stroke-width:3}
.ssi .s0{fill:#F1DCCB}.ssi .s1{fill:#E8B7A8}.ssi .s2{fill:#F6E7B4}.ssi .s3{fill:#C8323A}.ssi .s4{fill:#EDE6D6}
.ssi .taglio{fill:none;stroke:var(--tit);stroke-width:5}
.ssi .sut{fill:none;stroke:var(--tit);stroke-width:4;stroke-linecap:round}
.ssi .liv{opacity:0;animation:scivola .5s both}
.ssi .liv.off{animation:none;opacity:.18}
.ssi .liv path{fill:none;stroke:var(--acc);stroke-width:6;stroke-linecap:round}
.ssi .liv .lt{font-family:'Inter',sans-serif;font-size:32px;font-weight:700;fill:var(--tit)}
.ssi .liv.key .lt{fill:var(--acc)}
.ssi .liv .ld{font-family:'Inter',sans-serif;font-size:23px;fill:var(--fg)}
.ssi .ross{fill:#D9484F;opacity:0;animation:appari .6s both}

/* ---- 7.5: medicazioni avanzate ---- */
.umido svg,.npwt svg{width:100%;height:auto;overflow:visible}
.umido .pan{opacity:0;animation:appari .5s both}
.umido .pan.off{animation:none;opacity:.18}
.umido .cute{fill:#F1DCCB;stroke:var(--tit);stroke-width:5;stroke-linejoin:round}
.umido .fondo{fill:#C8323A}
.umido .crosta{fill:#6B3A2A;stroke:var(--tit);stroke-width:3}
.umido .lucido{fill:#F4B5BB;opacity:.9}
.umido .macer{fill:#EDE3DA;stroke:#BFAFA2;stroke-width:3}
.umido .goccia{fill:#9AC4E8;stroke:var(--tit);stroke-width:3;opacity:0;animation:pop .4s both;transform-box:fill-box;transform-origin:center}
.umido .ut{font-family:'Inter',sans-serif;font-size:32px;font-weight:700;fill:var(--tit);text-anchor:middle}
.umido .pan.key .ut{fill:var(--acc)}
.umido .ud{font-family:'Inter',sans-serif;font-size:23px;fill:var(--fg);text-anchor:middle}
.umido .uf{fill:none;stroke:var(--acc);stroke-width:6;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:1 2;stroke-dashoffset:1.1;animation:disegna .6s both}
.albero{display:grid;grid-template-columns:1fr 60px 1.1fr;gap:10px 18px;width:100%;align-items:center}
.albero .r{display:contents}
.albero .r > div{opacity:0;animation:scivola .45s both}
.albero .r.off > div{animation:none;opacity:.2}
.albero .lesione{font-family:'Inter',sans-serif;font-size:27px;font-weight:600;color:var(--tit);padding:10px 18px;border:2px solid var(--linea);border-radius:14px;background:var(--bg)}
.albero .r.key .lesione{border-color:var(--acc);background:#FDECEF}
.albero .fr{font-family:'Inter',sans-serif;font-size:34px;font-weight:800;color:var(--acc);text-align:center}
.albero .classe{font-family:'Inter',sans-serif;font-size:27px;font-weight:700;color:var(--acc);padding:10px 18px}
.albero .classe small{display:block;font-size:21px;font-weight:500;color:var(--fg)}
.npwt .cute{fill:#F1DCCB;stroke:var(--tit);stroke-width:5;stroke-linejoin:round}
.npwt .schiuma{fill:#2B2420;opacity:.85}
.npwt .film{fill:none;stroke:#5FA8E0;stroke-width:6;stroke-linecap:round}
.npwt .tubo{fill:none;stroke:var(--tit);stroke-width:8;stroke-linecap:round}
.npwt .pompa{fill:var(--bg);stroke:var(--tit);stroke-width:5}
.npwt .valore{font-family:'Inter',sans-serif;font-size:44px;font-weight:800;fill:var(--acc);text-anchor:middle}
.npwt .et{font-family:'Inter',sans-serif;font-size:24px;font-weight:600;fill:var(--tit);text-anchor:middle}
.npwt .goccia{fill:#9AC4E8;opacity:0;animation:appari .4s both}
.npwt .eff{opacity:0;animation:scivola .5s both}
.npwt .eff.off{animation:none;opacity:.18}
.npwt .eff .et2{font-family:'Inter',sans-serif;font-size:30px;font-weight:700;fill:var(--tit)}
.npwt .eff.key .et2{fill:var(--acc)}
.npwt .eff .ed{font-family:'Inter',sans-serif;font-size:23px;fill:var(--fg)}
.npwt .fr{fill:none;stroke:var(--acc);stroke-width:6;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:1 2;stroke-dashoffset:1.1;animation:disegna .6s both}

/* ---- 7.6: stomie ---- */
.addome svg,.placca svg{width:100%;height:auto;overflow:visible}
.addome .tronco{fill:#F1DCCB;stroke:var(--tit);stroke-width:5}
.addome .ombelico{fill:none;stroke:var(--tit);stroke-width:4}
.addome .intest{fill:none;stroke:#D9A3A3;stroke-width:16;stroke-linecap:round;stroke-linejoin:round}
.addome .st{opacity:0;animation:pop .5s both;transform-box:fill-box;transform-origin:center}
.addome .st.off{animation:none;opacity:.15}
.addome .st circle{fill:#D9484F;stroke:var(--tit);stroke-width:4}
.addome .st circle.urina{fill:#E8B04A}
.addome .st .n{font-family:'Inter',sans-serif;font-size:30px;font-weight:800;fill:var(--tit)}
.addome .st.key .n{fill:var(--acc)}
.addome .st .d{font-family:'Inter',sans-serif;font-size:23px;fill:var(--fg)}
.addome .st .d.key{font-weight:700;fill:var(--tit)}
.addome .st path{fill:none;stroke:var(--linea);stroke-width:3}
.addome .lato{font-family:'Inter',sans-serif;font-size:22px;font-weight:600;fill:var(--fg);text-anchor:middle;letter-spacing:.06em;text-transform:uppercase}
.placca .pan{opacity:0;animation:appari .5s both}
.placca .pan.off{animation:none;opacity:.18}
.placca .cute{fill:#F1DCCB;stroke:var(--tit);stroke-width:4}
.placca .anello{fill:#E9EEF4;stroke:var(--tit);stroke-width:4}
.placca .stoma{fill:#D9484F;stroke:var(--tit);stroke-width:4}
.placca .ross{fill:#F4A3A3;opacity:0;animation:appari .5s both}
.placca .segno{fill:none;stroke:var(--acc);stroke-width:5;stroke-linecap:round}
.placca .pt{font-family:'Inter',sans-serif;font-size:30px;font-weight:700;fill:var(--tit);text-anchor:middle}
.placca .pan.key .pt{fill:#1E8A4C}
.placca .pan.no .pt{fill:var(--acc)}
.placca .pd{font-family:'Inter',sans-serif;font-size:23px;fill:var(--fg);text-anchor:middle}
.placca .mm{font-family:'Inter',sans-serif;font-size:26px;font-weight:800;fill:var(--acc);text-anchor:middle;opacity:0;animation:appari .4s both}

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
    case 'pasto': return `<path class="letto" d="M20 240h360M40 240v-90h80M60 150v90"/>` + `<path class="tav" d="M240 150h120v90"/>` + testa(176, 52) + P('M176 74v76', 'M176 150h60', 'M236 150v90', 'M236 240h34', 'M176 100l50 40', 'M180 66l-10 8') + `<path class="ang" pathLength="1" d="M150 100a60 60 0 0 1 8-30"/><text class="angtxt" x="60" y="100">90°</text>`;
    case 'reclinato': return `<path class="letto" d="M20 240h360M40 240v-90h80M60 150v90"/>` + testa(190, 46) + P('M176 74v76', 'M176 150h60', 'M236 150v90', 'M236 240h34', 'M176 100l50 40') + `<path class="ang" pathLength="1" d="M150 70a60 60 0 0 1 50-30M192 30l10 8-12 6"/>`;
    case 'flesso': return `<path class="letto" d="M20 240h360M40 240v-90h80M60 150v90"/>` + testa(176, 52) + P('M176 74v76', 'M176 150h60', 'M236 150v90', 'M236 240h34', 'M176 100l40 40', 'M180 66l-10 8') + `<path class="ang" pathLength="1" d="M200 40a40 40 0 0 1 10 26M206 60l6 10-10 2"/>`;
    case 'seduto': return `<path class="letto" d="M30 150h150M50 150v90M170 150v90M20 240h360"/>` + testa(176, 44) + P('M176 66v80', 'M176 146h60', 'M236 146v94', 'M236 240h34', 'M176 96l40 40') + punto(250, 240);
    case 'inpiedi': return `<path class="letto" d="M30 150h100M50 150v90M120 150v90M20 240h360"/>` + testa(250, 44) + P('M250 66v84', 'M250 150l-26 90', 'M250 150l26 90', 'M250 90l-30 54', 'M250 90l30 54') + punto(224, 240) + punto(276, 240);
  }
  return base();
};

// La curva che sale soltanto: il rischio che cresce ogni giorno.
const curvaSale = (d, a, b) => `<div class="curva"><svg class="fig gfx" viewBox="0 0 1656 560">
  <line class="asse" x1="130" y1="470" x2="1610" y2="470"/><line class="asse" x1="130" y1="470" x2="130" y2="40"/>
  <text class="assetxt" x="150" y="512">${piano(d.x1 ?? 'giorno 1')}</text>
  <text class="assetxt" x="1590" y="512" text-anchor="end">${piano(d.x2 ?? 'giorno 30')}</text>
  <text class="assetxt" transform="translate(92 260) rotate(-90)" text-anchor="middle">${piano(d.y ?? 'rischio')}</text>
  <path class="area" d="M130 440C600 420 1100 300 1590 110V470H130z"/>
  <path class="linea acc" pathLength="1" d="M130 440C600 420 1100 300 1590 110"/>
  <g class="nota ${a.key ? 'key' : ''}" style="animation-delay:1.1s"><text class="t" x="180" y="120">${piano(a.t)}</text>
    ${a.d ? `<text class="d" x="180" y="162">${piano(a.d)}</text>` : ''}</g>
  <g class="nota ${b.key ? 'key' : ''}" style="animation-delay:2s"><text class="t" x="1590" y="60" text-anchor="end">${piano(b.t)}</text>
    ${b.d ? `<text class="d" x="1590" y="102" text-anchor="end">${piano(b.d)}</text>` : ''}</g>
</svg></div>`;

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
      const x = 130 + cc * ((W - 260) / (perRiga - 1)), y = righe === 1 ? 110 : 180 + r * 300;
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
      ${d.tappe.map((t, i) => { const [x, y] = pts[i], sotto = !(righe > 1 && i === perRiga - 1);   // l'ultima della prima riga: sopra, fuori dal raccordo
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
    if (d.sale) return curvaSale(d, a, b);
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
      <g class="centro"><circle cx="828" cy="360" r="80"/>${(() => { const w = piano(d.centro).split(' ');
        return w.length > 1 ? `<text x="828" y="360"><tspan x="828" dy="-0.55em">${w[0]}</tspan><tspan x="828" dy="1.15em">${w.slice(1).join(' ')}</tspan></text>`
                            : `<text x="828" y="360">${w[0]}</text>`; })()}</g>
    </svg></div>`;
  },


  // Una scala a segmenti. classi: [{da, a, t, d, key}] con i valori reali;
  // min/max dell'asse; attive; marca: {v, t} una soglia aggiunta, tratteggiata.
  fascia: d => {
    const W = 1656, x0 = 40, x1 = W - 40, y = 250, h = 110;
    const lo = d.min, hi = d.max;
    // uguali: segmenti di pari larghezza, quando i valori reali schiaccerebbero
    // le classi strette (la diuresi: 100 e 450 su una scala fino a 3400).
    const soglie = d.classi.map(c => c.da).filter(v => v != null);
    const X = d.uguali
      ? v => { const k = soglie.filter(t => t <= v).length; const t0 = k ? soglie[k - 1] : lo, t1 = soglie[k] ?? hi;
               return x0 + (x1 - x0) * (k + (t1 > t0 ? (v - t0) / (t1 - t0) : 0)) / (soglie.length + 1); }
      : v => x0 + (x1 - x0) * (v - lo) / (hi - lo);
    const attive = d.attive ?? d.classi.map((_, i) => i);
    const seg = d.classi.map((c, i) => {
      const a = Math.max(c.da ?? lo, lo), b = Math.min(c.a ?? hi, hi), on = attive.includes(i), t0 = .3 + i * .18;
      const xm = (X(a) + X(b)) / 2;
      return `<rect class="seg ${c.key ? 'key' : ''} ${on ? '' : 'off'}" x="${num(X(a))}" y="${y}" width="${num(X(b) - X(a))}" height="${h}" style="animation-delay:${num(t0)}s"/>
        ${c.da != null ? `<line class="sog" x1="${num(X(c.da))}" y1="${y - 6}" x2="${num(X(c.da))}" y2="${y + h + 6}"/>
          <text class="val ${on ? '' : 'off'}" x="${num(X(c.da))}" y="${y - 30}" style="animation-delay:${num(t0 + .2)}s">${c.da}</text>` : ''}
        <text class="nome ${c.key ? 'key' : ''} ${on ? '' : 'off'}" x="${num(xm)}" y="${y + h + 60}" style="animation-delay:${num(t0 + .3)}s">${piano(c.t)}</text>
        ${c.d ? `<text class="sub ${on ? '' : 'off'}" x="${num(xm)}" y="${y + h + 100}">${piano(c.d)}</text>` : ''}`;
    }).join('');
    const marca = d.marca ? `<line class="marca" x1="${num(X(d.marca.v))}" y1="${y - 70}" x2="${num(X(d.marca.v))}" y2="${y + h + 16}"/>
      <circle class="marcadot" cx="${num(X(d.marca.v))}" cy="${y + h / 2}" r="14"/>
      <text class="marcatxt" x="${num(X(d.marca.v))}" y="${y - 92}" text-anchor="middle">${piano(d.marca.t)}</text>` : '';
    return `<div class="fascia"><svg class="fig gfx" viewBox="0 0 ${W} 460">${seg}${marca}</svg></div>`;
  },

  // Tre bicchieri: un flusso fluido, uno addensato, una doppia consistenza.
  // voci: [{k:'fluido'|'denso'|'doppia', t, d, key}], attive.
  consistenze: d => {
    const attive = d.attive ?? d.voci.map((_, i) => i);
    const via = 'M150 110C210 140 260 160 330 200S400 270 400 356';
    const pan = (k, on, t0) => {
      const bicch = `<g transform="rotate(-32 160 130)"><path class="bicch" d="M60 40h120l-14 100H74z"/><path class="bicch" d="M74 112h92" opacity=".4"/></g>`;
      const gola = `<path class="tubo" d="${via}"/><path class="gola" d="M366 210v160M434 210v160"/>`;
      const cerchi = k === 'doppia'
        ? [['p', 14, 1.0, 0], ['p', 14, 1.0, .14], ['p solido', 24, 2.4, .1]]
        : k === 'denso' ? [['p', 20, 2.2, 0], ['p', 20, 2.2, .3], ['p', 20, 2.2, .6]]
        : [['p', 14, .8, 0], ['p', 14, .8, .14], ['p', 14, .8, .28], ['p', 14, .8, .42]];
      const punti = on ? cerchi.map(([c, r, dur, del]) =>
        `<circle class="${c}" r="${r}" style="offset-path:path('${via}');animation-duration:${dur}s;animation-delay:${num(t0 + del)}s"/>`).join('') : '';
      const danno = on && k !== 'denso' ? `<ellipse class="danno" cx="400" cy="366" rx="30" ry="12" style="animation-delay:${num(t0 + (k === 'doppia' ? 1.2 : .9))}s"/>` : '';
      return `${gola}${bicch}${punti}${danno}`;
    };
    return `<div class="cons">${d.voci.map((v, i) => {
      const on = attive.includes(i), t0 = .5 + i * .25;
      return `<div class="pan ${v.key ? 'key' : ''} ${on ? '' : 'off'}" style="animation-delay:${num(t0 - .2)}s">
        <svg viewBox="0 0 500 390">${pan(v.k, on, t0 + .4)}</svg>
        <div style="display:flex;gap:18px;align-items:flex-start"><div class="num">${i + 1}</div>
        <div><div class="t">${acc(v.t)}</div>${v.d ? `<div class="d">${acc(v.d)}</div>` : ''}</div></div></div>`;
    }).join('')}</div>`;
  },


  // Le vie di accesso: profilo con naso, esofago, stomaco, digiuno; le sonde
  // si disegnano in accento. voci: [{k:'sng'|'nd'|'peg'|'pej', t, d, key}], attive.
  vie: d => {
    const attive = d.attive ?? d.voci.map((_, i) => i);
    const corpo = [
      C(150, 110, 70), 'M84 100l-14 12 14 8',                                          // testa, naso
      'M140 180v40', 'M60 220h360v380H60z',                                          // collo, tronco
      'M200 220c0 60 8 120 6 160',                                                  // esofago
      'M206 380c-50 20-70 70-40 110s90 40 130 10c16-14 18-34 6-50l-26 10',           // stomaco
      'M276 460c30 6 40 30 30 60c-10 30-40 40-70 30',                                // duodeno e digiuno
    ];
    const S = {
      sng: { d: 'M74 114c50 0 112 26 126 66v200', pin: [300, 300] },
      nd:  { d: 'M74 114c50 0 112 26 126 66v170c0 60 40 100 80 100c30 0 40-20 30-40', pin: [340, 540] },
      peg: { d: 'M420 330h-40l-60 60', pin: [420, 290] },
      pej: { d: 'M420 500h-60l-60 30', pin: [420, 545] },
    };
    let k = 0;
    return `<div class="vie"><div class="schema"><svg viewBox="0 0 520 620">
      ${corpo.map(p => `<path class="tr" style="--i:${k++}" pathLength="1" d="${p}"/>`).join('')}
      <path class="org" d="M206 380c-50 20-70 70-40 110s90 40 130 10c16-14 18-34 6-50l-26 10z"/>
      ${d.voci.map((v, i) => { const s = S[v.k]; if (!s) return ''; const on = attive.includes(i), t0 = 1 + i * .3;
        return `<path class="sonda ${on ? '' : 'spenta'}" pathLength="1" d="${s.d}" style="animation-delay:${num(t0)}s"/>
          ${on ? `<g class="pin" style="animation-delay:${num(t0 + .9)}s"><circle cx="${s.pin[0]}" cy="${s.pin[1]}" r="24"/><text x="${s.pin[0]}" y="${s.pin[1] + 1}">${i + 1}</text></g>` : ''}`; }).join('')}
    </svg></div>
    <div class="voci">${d.voci.map((v, i) => `<div class="voce ${v.key ? 'key' : ''} ${attive.includes(i) ? '' : 'off'}"
        style="animation-delay:${num(.5 + i * .18)}s"><div class="n">${i + 1}</div>
        <div><div class="t">${acc(v.t)}</div>${v.d ? `<div class="d">${acc(v.d)}</div>` : ''}</div></div>`).join('')}</div></div>`;
  },


  // Il serbatoio con le entrate a sinistra e le uscite a destra.
  // entrate: [{t, d, key}], uscite: [{t, d, key}], attive: {e:[...], u:[...]}.
  bilancio: d => {
    const ae = d.attive?.e ?? d.entrate.map((_, i) => i), au = d.attive?.u ?? d.uscite.map((_, i) => i);
    const lista = (voci, att, cls, titolo, t0) => `<div class="lista ${cls}"><h3>${titolo}</h3>${voci.map((v, i) =>
      `<div class="voce ${v.key ? 'key' : ''} ${att.includes(i) ? '' : 'off'}" style="animation-delay:${num(t0 + i * .16)}s"><div class="n">${i + 1}</div>
       <div><div class="t">${acc(v.t)}</div>${v.d ? `<div class="d">${acc(v.d)}</div>` : ''}</div></div>`).join('')}</div>`;
    const frecce = (n, att, x0, x1, t0) => Array.from({ length: n }, (_, i) => { const y = 120 + i * (360 / Math.max(n - 1, 1));
      return `<path class="fr ${att.includes(i) ? (i === n - 1 && n > 3 ? 'acc' : '') : 'off'}" pathLength="1" d="M${x0} ${y}H${x1}M${x1 > x0 ? x1 - 22 : x1 + 22} ${y - 16}L${x1} ${y}L${x1 > x0 ? x1 - 22 : x1 + 22} ${y + 16}" style="animation-delay:${num(t0 + i * .16)}s"/>`; }).join('');
    return `<div class="bil">${lista(d.entrate, ae, 'ent', d.e ?? 'entrate', .4)}
      <div class="serb"><svg viewBox="0 0 420 560">
        <path class="vaso" d="M110 60v420a20 20 0 0 0 20 20h160a20 20 0 0 0 20-20V60"/>
        <rect class="acqua" x="118" y="200" width="184" height="292"/>
        ${frecce(d.entrate.length, ae, 20, 100, .6)}${frecce(d.uscite.length, au, 320, 400, .9)}
        <text class="lbl" x="210" y="40">${piano(d.centro ?? '24 ore')}</text>
      </svg></div>
      ${lista(d.uscite, au, 'usc', d.u ?? 'uscite', .7)}</div>`;
  },

  // Dove va una soluzione: la sacca sopra, i due compartimenti sotto.
  // voci: [{k:'iso'|'ipo'|'iper', t, d, key}], attive.
  distribuzione: d => {
    const attive = d.attive ?? d.voci.map((_, i) => i);
    const pan = (k, on, t0) => {
      const sacca = `<path class="sac" d="M200 20h100v90a14 14 0 0 1-14 14h-72a14 14 0 0 1-14-14z"/><rect class="sacl" x="206" y="60" width="88" height="58" rx="8"/>`;
      const comp = `<rect class="comp" x="40" y="200" width="140" height="170" rx="14"/><rect class="comp" x="200" y="200" width="260" height="170" rx="14"/>
        <text class="lbl" x="110" y="400">extra ⅓</text><text class="lbl" x="330" y="400">intra ⅔</text>`;
      if (!on) return sacca + comp;
      const del = t => `style="animation-delay:${num(t0 + t)}s"`;
      if (k === 'iso') return `${sacca}${comp}<path class="fr" pathLength="1" d="M250 124v40l-140 30" ${del(0)}/>
        <rect class="riemp" x="46" y="206" width="128" height="158" rx="10" ${del(.6)}/>`;
      if (k === 'ipo') return `${sacca}${comp}<path class="fr" pathLength="1" d="M250 124v40l-140 30M250 164l80 30" ${del(0)}/>
        <rect class="riemp" x="46" y="206" width="128" height="158" rx="10" style="animation-delay:${num(t0 + .6)}s;--op:.12"/>
        <rect class="riemp" x="206" y="206" width="248" height="158" rx="10" style="animation-delay:${num(t0 + .8)}s"/>`;
      return `${sacca}${comp}<path class="fr" pathLength="1" d="M250 124v40l-140 30" ${del(0)}/>
        <rect class="riemp" x="46" y="206" width="128" height="158" rx="10" ${del(.6)}/>
        <path class="fr" pathLength="1" d="M300 285H196M214 269l-18 16 18 16" ${del(1)}/>`;
    };
    return `<div class="distr">${d.voci.map((v, i) => { const on = attive.includes(i), t0 = .5 + i * .25;
      return `<div class="pan ${v.key ? 'key' : ''} ${on ? '' : 'off'}" style="animation-delay:${num(t0 - .2)}s">
        <svg viewBox="0 0 500 420">${pan(v.k, on, t0 + .4)}</svg>
        <div style="display:flex;gap:18px;align-items:flex-start"><div class="num">${i + 1}</div>
        <div><div class="t">${acc(v.t)}</div>${v.d ? `<div class="d">${acc(v.d)}</div>` : ''}</div></div></div>`; }).join('')}</div>`;
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

  // L'anello: le lezioni di un modulo su un'ellisse, ognuna con la sua
  // illustrazione dentro un tondo e l'etichetta fuori. L'ellisse si disegna,
  // i tondi compaiono uno dopo l'altro, il centro per ultimo.
  anello: d => {
    const W = 1656, H = 700, cx = 828, cy = 350, rx = 470, ry = 210, r = 66;
    const n = d.voci.length, attive = d.attive ?? d.voci.map((_, i) => i);
    const pos = i => { const a = i / n * 2 * Math.PI; return [cx + rx * Math.sin(a), cy - ry * Math.cos(a), Math.sin(a), Math.cos(a)]; };
    const ell = `M${cx} ${cy - ry}a${rx} ${ry} 0 1 1 0 ${2 * ry}a${rx} ${ry} 0 1 1 0 ${-2 * ry}`;
    const nodi = d.voci.map((v, i) => {
      const [x, y, sn, cs] = pos(i), on = attive.includes(i);
      const ill = `<g transform="translate(${num(x - 44)} ${num(y - 44)})">${illustrazioneClinica(v.illu) ?? (ripiego ? ripiego(v.illu) : '')}</g>`;
      const bw = 330, bh = 96;
      let bx, by, al;
      if (Math.abs(sn) < .3) { bx = x - bw / 2; by = cs > 0 ? y - r - 14 - bh : y + r + 14; al = 'center'; }
      else if (sn > 0) { bx = x + r + 18; by = y - bh / 2 + (cs > 0 ? -34 : 34); al = 'left'; }
      else { bx = x - r - 18 - bw; by = y - bh / 2 + (cs > 0 ? -34 : 34); al = 'right'; }
      return `<g class="nodo ${v.key ? 'key' : ''} ${on ? '' : 'off'}" style="animation-delay:${num(.5 + i * .16)}s">
        <circle cx="${num(x)}" cy="${num(y)}" r="${r}"/>${ill}
        <foreignObject x="${num(bx)}" y="${num(by)}" width="${bw}" height="${bh}"><div xmlns="http://www.w3.org/1999/xhtml" style="text-align:${al}">
          <div class="n">${piano(v.n ?? '')}</div><div class="t">${piano(v.t)}</div></div></foreignObject></g>`;
    }).join('');
    return `<div class="anello"><svg class="fig gfx" viewBox="0 0 ${W} ${H}">
      <path class="ell" pathLength="1" d="${ell}"/>${nodi}
      <g class="centro"><text x="${cx}" y="${cy - 22}">${piano(d.centro)}</text><text class="s" x="${cx}" y="${cy + 30}">${piano(d.sotto ?? '')}</text></g>
    </svg></div>`;
  },

  // I gesti: da due a quattro riquadri in fila, ognuno con un'illustrazione
  // grande, un titolo e una riga; fra un riquadro e l'altro una freccia che si
  // disegna. Serve per le sequenze: che cosa si fa, in che ordine.
  gesti: d => {
    const attive = d.attive ?? d.voci.map((_, i) => i);
    return `<div class="gesti n${d.voci.length}">${d.voci.map((v, i) => {
      const ill = illustrazioneClinica(v.illu) ?? '';
      return `${i ? `<svg class="fr" viewBox="0 0 80 80" style="animation-delay:${num(.55 + i * .3)}s"><path pathLength="1" d="M10 40h56M46 22l20 18-20 18"/></svg>` : ''}
        <div class="g ${v.key ? 'key' : ''} ${attive.includes(i) ? '' : 'off'}" style="animation-delay:${num(.3 + i * .3)}s">
          <div class="ill">${ill}</div><div class="n">${i + 1}</div>
          <div class="t">${acc(v.t)}</div>${v.d ? `<div class="d">${acc(v.d)}</div>` : ''}</div>`; }).join('')}</div>`;
  },

  // Gli anelli: la catena delle infezioni, sei ovali concatenati che compaiono
  // uno per volta. `rotto` e' l'indice dell'anello che si spezza: le due meta'
  // si allontanano in accento. `attive` accende gli anelli a gruppi; `d` sotto
  // ogni anello e' l'intervento con cui l'infermiere lo spezza.
  anelli: d => {
    const W = 1656, H = 560, n = d.voci.length, rx = 138, ry = 76, cy = 150;
    const sp = (W - 2 * (rx + 24)) / (n - 1), attive = d.attive ?? d.voci.map((_, i) => i);
    const ov = (cx) => `M${num(cx - rx)} ${cy}a${rx} ${ry} 0 1 0 ${2 * rx} 0a${rx} ${ry} 0 1 0 ${-2 * rx} 0`;
    const meta = (cx, lato) => lato === 'sx'
      ? `M${num(cx)} ${cy - ry}a${rx} ${ry} 0 0 0 0 ${2 * ry}`
      : `M${num(cx)} ${cy - ry}a${rx} ${ry} 0 0 1 0 ${2 * ry}`;
    return `<div class="anelli"><svg class="fig gfx" viewBox="0 0 ${W} ${H}">${d.voci.map((v, i) => {
      const cx = rx + 24 + i * sp, on = attive.includes(i), rotto = d.rotto === i, t0 = .3 + i * .22;
      const bw = sp - 14;
      return `<g class="g ${on ? '' : 'off'} ${v.key ? 'key' : ''}">
        ${rotto ? `<g class="an-g" style="animation-delay:${num(t0)}s"><path class="met sx" d="${meta(cx, 'sx')}"/><path class="met dx" d="${meta(cx, 'dx')}"/></g>`
                : `<path class="an" d="${ov(cx)}" style="animation-delay:${num(t0)}s"/>`}
        <text class="n" x="${num(cx)}" y="${cy}" style="animation-delay:${num(t0 + .2)}s">${i + 1}</text>
        <foreignObject x="${num(cx - bw / 2)}" y="${cy + ry + 26}" width="${num(bw)}" height="260"><div xmlns="http://www.w3.org/1999/xhtml" style="animation-delay:${num(t0 + .25)}s">
          <div class="t">${piano(v.t)}</div>${v.d ? `<div class="d">${piano(v.d)}</div>` : ''}</div></foreignObject></g>`; }).join('')}
    </svg></div>`;
  },

  // Le colonne: una tabella a due o tre colonne con l'intestazione a pillola
  // e le voci che scendono una per volta. `attive` accende le colonne a gruppi.
  colonne: d => {
    const attive = d.attive ?? d.colonne.map((_, i) => i);
    return `<div class="colonne n${d.colonne.length}">${d.colonne.map((c, i) => `
      <div class="col ${c.key ? 'key' : ''} ${attive.includes(i) ? '' : 'off'}" style="animation-delay:${num(.2 + i * .25)}s">
        <div class="h">${acc(c.h)}</div>
        ${c.voci.map((v, k) => `<div class="v ${v.key ? 'key' : ''}" style="animation-delay:${num(.5 + i * .25 + k * .12)}s">
          <div class="t">${acc(v.t)}</div>${v.d ? `<div class="d">${acc(v.d)}</div>` : ''}</div>`).join('')}
      </div>`).join('')}</div>`;
  },

  // La pressione della stanza: una o due stanze viste dall'alto, con la porta,
  // il letto e le frecce dell'aria che entrano (negativa) o escono (positiva).
  pressione: d => {
    const attive = d.attive ?? d.stanze.map((_, i) => i), n = d.stanze.length, W = 1656;
    const stanza = (s, i) => {
      const x0 = n === 1 ? 470 : i * 828 + 40, y0 = 30, w = 640, h = 380, on = attive.includes(i);
      const porta = { x: x0 + w, y1: y0 + 230, y2: y0 + 340 }, dentro = s.verso === 'dentro';
      const frecce = [0, 1, 2].map(k => { const y = porta.y1 + 22 + k * 34;
        return dentro ? `<path class="fl dentro" d="M${x0 + w + 120} ${y}h-140M${x0 + w - 20} ${y}l16-12M${x0 + w - 20} ${y}l16 12" style="animation-delay:${num(k * .3)}s"/>`
                      : `<path class="fl fuori" d="M${x0 + w - 60} ${y}h140M${x0 + w + 80} ${y}l-16-12M${x0 + w + 80} ${y}l-16 12" style="animation-delay:${num(k * .3)}s"/>`; }).join('');
      const bocchetta = dentro
        ? `<rect class="vent" x="${x0 + 280}" y="${y0 - 8}" width="80" height="16"/><path class="fl su" d="M${x0 + 320} ${y0 + 40}v-90M${x0 + 320} ${y0 - 50}l-12 16M${x0 + 320} ${y0 - 50}l12 16"/>`
        : `<rect class="vent" x="${x0 + 280}" y="${y0 - 8}" width="80" height="16"/><path class="fl giu" d="M${x0 + 320} ${y0 - 50}v90M${x0 + 320} ${y0 + 40}l-12-16M${x0 + 320} ${y0 + 40}l12-16"/>`;
      return `<g class="st ${on ? '' : 'off'} ${s.key ? 'key' : ''}" style="animation-delay:${num(.2 + i * .3)}s">
        <path class="muro" d="M${x0 + w} ${porta.y1}V${y0}H${x0}V${y0 + h}H${x0 + w}V${porta.y2}"/>
        <path class="porta" d="M${x0 + w} ${porta.y2}l70-110"/>
        <rect class="letto" x="${x0 + 90}" y="${y0 + 110}" width="220" height="130" rx="14"/><rect class="cuscino" x="${x0 + 104}" y="${y0 + 128}" width="50" height="94" rx="10"/>
        <text class="corr" x="${x0 + w + 60}" y="${y0 + 120}">corridoio</text>
        ${bocchetta}${frecce}
        <foreignObject x="${x0 - 20}" y="${y0 + h + 24}" width="${w + 200}" height="150"><div xmlns="http://www.w3.org/1999/xhtml">
          <div class="t">${piano(s.t)}</div>${s.d ? `<div class="d">${piano(s.d)}</div>` : ''}</div></foreignObject></g>`;
    };
    return `<div class="pressione"><svg class="fig gfx" viewBox="-20 -40 ${W + 40} 640">${d.stanze.map(stanza).join('')}</svg></div>`;
  },

  // Cento tondini in dieci file: i primi `n` in accento, e da `da` a `n` a
  // mezza tinta quando il dato e' una forbice. A destra il numero grande.
  // ---- modulo 5: farmacologia ----
  // ADME: la pillola a sinistra, il vaso che si disegna, le quattro stazioni che
  // si accendono in ordine (A entra nel vaso, D va ai tessuti, M passa dal
  // fegato, E esce dal rene) e i puntini del farmaco che corrono nel lume.
  adme: d => {
    const W = 1656, H = 600, y = 310, attive = d.attive ?? [0, 1, 2, 3];
    const X = [300, 700, 1080, 1440];
    const tappe = d.tappe ?? [
      { l: 'A', t: 'Assorbimento', d: 'dal sito al sangue' }, { l: 'D', t: 'Distribuzione', d: 'ai tessuti' },
      { l: 'M', t: 'Metabolismo', d: 'fegato, citocromo P450', key: true }, { l: 'E', t: 'Eliminazione', d: 'soprattutto il rene' }];
    const via = `M250 ${y}H1560`;
    const st = tappe.map((p, i) => {
      const x = X[i], on = attive.includes(i), t0 = .6 + i * .3;
      let extra = '';
      if (i === 0) extra = `<path class="ramo" d="M170 ${y - 110}c40 0 50 60 90 78" style="animation-delay:${num(t0)}s"/>`;
      if (i === 1) extra = [[-90, -130], [0, -160], [90, -130]].map(([dx, dy], k) =>
        `<path class="ramo" d="M${x} ${y - 44}L${x + dx} ${y + dy + 34}" style="animation-delay:${num(t0 + k * .1)}s"/>
         <circle class="tess" cx="${x + dx}" cy="${y + dy}" r="30" style="animation-delay:${num(t0 + .25 + k * .1)}s"/>`).join('');
      if (i === 2) extra = `<path class="ramo" d="M${x - 60} ${y - 40}c-10-60 20-100 60-110M${x + 60} ${y - 40}c10-60-20-100-60-110" style="animation-delay:${num(t0)}s"/>
         <g transform="translate(${x - 75} ${y - 300})">${illustrazioneClinica('fegato')}</g>`;
      if (i === 3) extra = `<path class="ramo" d="M${x} ${y + 44}v66" style="animation-delay:${num(t0)}s"/>
         <g transform="translate(${x - 75} ${y + 110})">${illustrazioneClinica('rene')}</g>`;
      const lab = i === 3 ? y - 190 : y + 70;
      return `<g class="st ${on ? '' : 'off'} ${p.key ? 'key' : ''}" style="animation-delay:${num(t0)}s">${extra}
        <circle class="tondo" cx="${x}" cy="${y}" r="44"/><text class="lettera" x="${x}" y="${y}">${p.l}</text>
        <foreignObject x="${x - 170}" y="${lab}" width="340" height="120"><div xmlns="http://www.w3.org/1999/xhtml">
          <div class="t">${piano(p.t)}</div>${p.d ? `<div class="d">${piano(p.d)}</div>` : ''}</div></foreignObject></g>`;
    }).join('');
    const punti = [0, 1, 2].map(k => `<circle class="pt g${k + 1}" r="11" style="offset-path:path('${via}')"/>`).join('');
    return `<div class="adme"><svg class="fig gfx" viewBox="0 0 ${W} ${H}">
      <rect class="lume" x="250" y="${y - 32}" width="1310" height="64" rx="32"/>
      <path class="vaso" pathLength="1" d="M250 ${y - 32}H1560M250 ${y + 32}H1560"/>
      <g class="st" style="animation-delay:.1s"><g transform="translate(40 ${y - 190})">${illustrazioneClinica('pillola')}</g></g>
      ${punti}${st}</svg></div>`;
  },

  // L'emivita: la curva che si dimezza a ogni emivita, con i livelli 100, 50,
  // 25, 12,5 segnati; «accumulo» disegna invece le dosi ripetute che salgono
  // a dente di sega fino al plateau, lo stato stazionario dopo 4-5 emivite.
  emivita: d => {
    const W = 1656, H = 560, x0 = 200, x1 = 1180, y0 = 480, y1 = 70, n = 5;
    const dx = (x1 - x0) / n, Y = f => y0 - (y0 - y1) * f;
    const assi = `<line class="asse" x1="${x0}" y1="${y0}" x2="${x1 + 40}" y2="${y0}"/><line class="asse" x1="${x0}" y1="${y0}" x2="${x0}" y2="${y1 - 20}"/>
      <text class="assetxt" x="${x1 + 50}" y="${y0 + 10}">tempo</text>
      <text class="assetxt" transform="translate(${x0 - 130} ${(y0 + y1) / 2}) rotate(-90)" text-anchor="middle">concentrazione</text>`;
    const ticks = Array.from({ length: n }, (_, i) => `<line class="tick" x1="${num(x0 + (i + 1) * dx)}" y1="${y0}" x2="${num(x0 + (i + 1) * dx)}" y2="${y0 + 16}"/>
      <text class="ticktxt" x="${num(x0 + (i + 1) * dx)}" y="${y0 + 52}" style="animation-delay:${num(.4 + i * .3)}s">${i + 1} t½</text>`).join('');
    let curva, livelli = '', extra = '';
    if (d.modo === 'accumulo') {
      const scala = f => Y(f / 2.1);
      let c = 0, dpath = `M${x0} ${y0}`, dosi = '';
      for (let k = 0; k < n; k++) {
        c = c / 2 + 1; const xa = x0 + k * dx, xb = x0 + (k + 1) * dx;
        dpath += `L${num(xa)} ${num(scala(c))}C${num(xa + dx * .3)} ${num(scala(c * .78))} ${num(xb - dx * .3)} ${num(scala(c * .56))} ${num(xb)} ${num(scala(c / 2))}`;
        dosi += `<path class="dose" d="M${num(xa - 10)} ${num(scala(c) - 44)}l10 20 10-20z" style="animation-delay:${num(.3 + k * .3)}s"/>`;
      }
      curva = `<path class="linea" pathLength="1" d="${dpath}"/>`;
      livelli = `<line class="plateau" x1="${x0}" y1="${num(scala(2))}" x2="${x1 + 40}" y2="${num(scala(2))}"/>`;
      extra = dosi;
    } else {
      let dpath = `M${x0} ${Y(1)}`;
      for (let k = 1; k <= n; k++) { const f0 = Math.pow(.5, k - 1), f1 = Math.pow(.5, k), xa = x0 + (k - 1) * dx, xb = x0 + k * dx;
        dpath += `C${num(xa + dx * .35)} ${num(Y(f0 * .62))} ${num(xb - dx * .45)} ${num(Y(f1 * 1.15))} ${num(xb)} ${num(Y(f1))}`; }
      curva = `<path class="area" d="${dpath}V${y0}H${x0}z"/><path class="linea" pathLength="1" d="${dpath}"/>`;
      livelli = [1, .5, .25, .125].map((f, i) => `<line class="liv" x1="${x0}" y1="${num(Y(f))}" x2="${num(x0 + i * dx)}" y2="${num(Y(f))}"/>
        <text class="livtxt" x="${x0 - 20}" y="${num(Y(f))}" style="animation-delay:${num(.5 + i * .35)}s">${[100, 50, 25, '12,5'][i]}${i ? '' : ' %'}</text>
        <circle class="punto" cx="${num(x0 + i * dx)}" cy="${num(Y(f))}" r="13" style="animation-delay:${num(.5 + i * .35)}s"/>`).join('');
    }
    const note = (d.note ?? []).map((q, i) => `<g class="nota ${q.key ? 'key' : ''}" style="animation-delay:${num(1.6 + i * .5)}s">
      <text class="t" x="1300" y="${150 + i * 170}">${piano(q.t)}</text>${q.d ? `<text class="d" x="1300" y="${194 + i * 170}">${piano(q.d)}</text>` : ''}
      ${q.d2 ? `<text class="d" x="1300" y="${230 + i * 170}">${piano(q.d2)}</text>` : ''}</g>`).join('');
    return `<div class="emiv"><svg class="fig gfx" viewBox="0 0 ${W} ${H}">${assi}${livelli}${ticks}${curva}${extra}${note}</svg></div>`;
  },

  // La finestra terapeutica: la banda fra la concentrazione minima efficace e
  // quella tossica, e una dose che sale e scende dentro la banda. Con
  // «stretta» la banda si restringe e la stessa dose la supera.
  finestra: d => {
    const W = 1656, H = 560, x0 = 120, x1 = 1000, y0 = 480, stretta = !!d.stretta;
    const toss = stretta ? 215 : 90, eff = stretta ? 330 : 390, picco = 190;
    const curva = `M${x0} ${y0}C${x0 + 120} ${y0 - 40} ${x0 + 160} ${picco + 10} ${x0 + 300} ${picco}C${x0 + 460} ${picco - 10} ${x0 + 620} ${y0 - 120} ${x1} ${y0 - 50}`;
    const sopra = stretta ? `<path class="sopra" d="M${x0 + 196} ${toss}C${x0 + 236} ${picco} ${x0 + 386} ${picco - 8} ${x0 + 476} ${toss}z" opacity=".35"/>
      <text class="allarme" x="${x0 + 336}" y="${toss - 66}" text-anchor="middle">tossicità</text>` : '';
    const lista = (d.farmaci ?? []).map((f, i) => `<div class="f ${f.key ? 'key' : ''}" style="animation-delay:${num(1.1 + i * .14)}s">${piano(f.t)}${f.d ? `<em>${piano(f.d)}</em>` : ''}</div>`).join('');
    return `<div class="fin"><svg class="fig gfx" viewBox="0 0 ${W} ${H}">
      <line class="asse" x1="${x0}" y1="${y0}" x2="${x1 + 40}" y2="${y0}"/><line class="asse" x1="${x0}" y1="${y0}" x2="${x0}" y2="50"/>
      <text class="assetxt" x="${x1 + 50}" y="${y0 + 10}">tempo</text>
      <rect class="banda" x="${x0}" y="${toss}" width="${x1 - x0 + 40}" height="${eff - toss}"/>
      <line class="soglia toss" x1="${x0}" y1="${toss}" x2="${x1 + 40}" y2="${toss}"/><text class="sogtxt toss" x="${x0 + 14}" y="${toss - 14}">concentrazione tossica</text>
      <line class="soglia" x1="${x0}" y1="${eff}" x2="${x1 + 40}" y2="${eff}"/><text class="sogtxt" x="${x0 + 14}" y="${eff + 38}">minima efficace</text>
      ${sopra}<path class="linea" pathLength="1" d="${curva}"/>
      <foreignObject class="lista ${(d.farmaci ?? []).length > 5 ? 'fitta' : ''}" x="1100" y="20" width="540" height="520"><div xmlns="http://www.w3.org/1999/xhtml">
        ${d.h ? `<div class="h">${piano(d.h)}</div>` : ''}${lista}</div></foreignObject></svg></div>`;
  },

  // Il recettore: la membrana con la tasca; a sinistra l'agonista cala nella
  // tasca e il segnale parte, a destra l'antagonista la occupa e il segnale
  // non parte. Uno o due pannelli (modo 'agonista', 'antagonista', 'entrambi').
  recettore: d => {
    const pan = (key, t, dd, del, ag) => `<div class="pan ${key ? 'key' : ''}" style="animation-delay:${del}s">
      <svg viewBox="0 0 700 420">
        <path class="memb" pathLength="1" d="M30 250h240c0-60 30-100 80-100s80 40 80 100h240"/>
        <line class="memb2" x1="30" y1="300" x2="670" y2="300"/>
        <g class="lig ${ag ? '' : 'ant'}">${ag
          ? `<path class="corpo" d="M310 40h80v70c0 40-20 90-40 90s-40-50-40-90z"/>`
          : `<path class="corpo" d="M300 40h100v150H300z"/>`}</g>
        ${ag ? `<path class="segnale" pathLength="1" d="M350 300v70M322 342l28 28 28-28"/>
                <path class="onda o1" d="M300 360c20-20 80-20 100 0"/><path class="onda o2" d="M280 380c30-30 110-30 140 0"/><path class="onda o3" d="M260 400c40-40 140-40 180 0"/>`
             : `<path class="croce" d="M320 330l60 60M380 330l-60 60"/>`}
      </svg>
      <div class="t">${piano(t)}</div>${dd ? `<div class="d">${piano(dd)}</div>` : ''}</div>`;
    const modo = d.modo ?? 'entrambi';
    const [a, b] = d.voci ?? [{ t: 'Agonista', d: 'si lega al recettore e lo attiva' }, { t: 'Antagonista', d: 'si lega e lo blocca: il naloxone sugli oppioidi', key: true }];
    return `<div class="recet">${modo !== 'antagonista' ? pan(a.key, a.t, a.d, .2, true) : ''}${modo !== 'agonista' ? pan(b.key, b.t, b.d, .5, false) : ''}</div>`;
  },

  // Il legame con le proteine: a sinistra l'albumina normale tiene legata la
  // maggior parte del farmaco (puntini scuri sulle albumine, pochi liberi in
  // accento); a destra, con meno albumina, i puntini liberi sono molti di piu'.
  legame: d => {
    const alb = (n, libere, del) => {
      const pos = [[120, 110], [320, 80], [520, 120], [200, 250], [420, 240], [620, 260]].slice(0, n);
      const blobs = pos.map(([x, y], i) => `<ellipse class="alb" cx="${x}" cy="${y}" rx="64" ry="42" style="animation-delay:${num(del + i * .12)}s"/>
        <text class="albtxt" x="${x}" y="${y}" style="animation-delay:${num(del + .1 + i * .12)}s">albumina</text>
        ${[-50, 0, 50].map((o, k) => `<circle class="leg-f" cx="${x + o}" cy="${y - 52}" r="11" style="animation-delay:${num(del + .5 + i * .12 + k * .05)}s"/>`).join('')}`).join('');
      const lib = Array.from({ length: libere }, (_, i) => { const x = 70 + (i * 137) % 600, y = 40 + (i * 89) % 280;
        return `<circle class="leg-l" cx="${x}" cy="${y}" r="13" style="animation-delay:${num(del + 1.2 + i * .07)}s"/>`; }).join('');
      return `<svg viewBox="0 0 700 320">${blobs}${lib}</svg>`;
    };
    const [a, b] = d.voci, attive = d.attive ?? [0, 1];
    return `<div class="leg">
      <div class="pan ${a.key ? 'key' : ''} ${attive.includes(0) ? '' : 'off'}" style="animation-delay:.2s">${alb(6, 3, .3)}
        <div class="h">${piano(a.h)}</div>${a.big ? `<div class="big">${piano(a.big)}</div>` : ''}${a.d ? `<div class="d">${piano(a.d)}</div>` : ''}</div>
      <div class="pan ${b.key ? 'key' : ''} ${attive.includes(1) ? '' : 'off'}" style="animation-delay:.6s">${alb(3, 14, .7)}
        <div class="h">${piano(b.h)}</div>${b.big ? `<div class="big">${piano(b.big)}</div>` : ''}${b.d ? `<div class="d">${piano(b.d)}</div>` : ''}</div></div>`;
  },

  // ---- 5.3: i calcoli ----
  // Un calcolo scritto a schermo un pezzo per volta: ogni riga e' una lista di
  // segni ("75 mg", "÷", "100 mg", "×", "2 ml", "=", "1,5 ml"); gli operatori
  // sono in tinta sommessa, cio' che segue l'uguale e' il risultato in accento.
  calcolo: d => {
    const righe = d.righe, n = righe.length, attive = d.attive ?? righe.map((_, i) => i);
    const OPS = new Set(['=', '×', '÷', '+', '−', '-', '→', 'in', 'per']);
    let k = 0;
    const r = righe.map((riga, i) => {
      const tok = riga.tok ?? riga; let dopoUguale = false;
      const pezzi = tok.map(t => { const op = OPS.has(t); const cls = op ? 'op' : (dopoUguale ? 'ris' : ''); if (t === '=' || t === '→') dopoUguale = true;
        return `<span class="tok ${cls}" style="animation-delay:${num(.3 + (k++) * .22)}s">${piano(t)}</span>`; }).join('');
      const nota = riga.nota ? `<div class="nota" style="animation-delay:${num(.4 + k * .22)}s">${acc(riga.nota)}</div>` : '';
      return `<div class="riga ${attive.includes(i) ? '' : 'off'}" style="animation-delay:${num(.2 + i * .1)}s">${pezzi}</div>${nota}`;
    }).join('');
    return `<div class="calc n${Math.min(4, n)}">${r}${d.nota ? `<div class="nota" style="animation-delay:${num(.5 + k * .22)}s">${acc(d.nota)}</div>` : ''}</div>`;
  },

  // «Metti in pausa»: il glifo della pausa che si disegna, l'esercizio in
  // corsivo a destra e i dati come pillole.
  pausa: d => `<div class="pausa">
      <div class="glifo"><svg viewBox="0 0 300 300"><path class="cerchio" pathLength="1" d="${C(150, 150, 130)}"/>
        <rect class="barra b1" x="105" y="95" width="32" height="110" rx="10"/><rect class="barra b2" x="163" y="95" width="32" height="110" rx="10"/></svg>
        <div class="lbl">${piano(d.etichetta ?? 'metti in pausa')}</div></div>
      <div class="tx">${d.es ? `<div class="es">${piano(d.es)}</div>` : ''}<div class="testo">${acc(d.testo)}</div>
        ${d.dati ? `<div class="dati">${d.dati.map((x, i) => `<span style="animation-delay:${num(.9 + i * .15)}s">${piano(x)}</span>`).join('')}</div>` : ''}</div></div>`,

  // Le gocce: due camere di gocciolamento, le gocce che cadono a ritmo diverso
  // (grandi e rade per il deflussore da 20, piccole e fitte per il
  // microgocciolatore da 60).
  gocce: d => {
    const attive = d.attive ?? [0, 1];
    const cam = (fattore) => {
      const n = fattore === 60 ? 4 : 2, r = fattore === 60 ? 7 : 13, per = fattore === 60 ? 1.0 : 1.4;
      const gocce = Array.from({ length: n }, (_, i) => `<circle class="gt" cx="180" cy="110" r="${r}" style="animation-duration:${per}s;animation-delay:${num(-i * per / n)}s"/>`).join('');
      return `<svg viewBox="0 0 360 380"><rect class="tubo" x="166" y="20" width="28" height="60" rx="6" fill="var(--bg)"/>
        <path class="camera" d="M120 80h120v180c0 34-26 56-60 56s-60-22-60-56z"/><rect class="livello" x="124" y="232" width="112" height="60" rx="0"/>
        <path d="M124 232h112v26c0 34-26 56-56 56s-56-22-56-56z" fill="color-mix(in srgb,var(--acc) 22%,var(--bg))"/>
        ${gocce}<line class="tubo" x1="180" y1="316" x2="180" y2="370"/></svg>`;
    };
    const [a, b] = d.voci ?? [{ f: 20, t: 'Deflussore standard', d: 'macrogocce: 20 gocce per millilitro' }, { f: 60, t: 'Microgocciolatore', d: '60 gocce per millilitro', key: true }];
    return `<div class="gocce">${[a, b].map((v, i) => `<div class="pan ${v.key ? 'key' : ''} ${attive.includes(i) ? '' : 'off'}" style="animation-delay:${num(.2 + i * .3)}s">${cam(v.f)}
      <div class="big">${v.f} gtt/ml</div><div class="t">${piano(v.t)}</div>${v.d ? `<div class="d">${piano(v.d)}</div>` : ''}</div>`).join('')}</div>`;
  },

  // ---- 5.5: le classi di farmaci ----
  // I profili delle insuline: un asse delle ore, una curva per tipo, che si
  // disegna una dopo l'altra; la rapida ha il picco presto e stretto, la
  // regolare piu' tardi, la NPH piu' larga, la basale e' piatta per 24 ore.
  profili: d => {
    const W = 1656, H = 560, x0 = 150, x1 = 1560, y0 = 470, y1 = 90, ORE = 24;
    const X = h => x0 + (x1 - x0) * h / ORE, Y = f => y0 - (y0 - y1) * f;
    const curva = (inizio, picco, fine, alt) => {
      const pts = []; for (let h = 0; h <= ORE; h += .25) {
        let f = 0; if (h >= inizio && h <= fine) { const t = h < picco ? (h - inizio) / (picco - inizio) : 1 - (h - picco) / (fine - picco); f = alt * Math.pow(Math.sin(t * Math.PI / 2), 1.3); }
        pts.push([X(h), Y(f)]); }
      return pts;
    };
    const tipi = d.voci ?? [
      { t: 'Analoghi rapidi', d: 'inizio 10–15 min, al pasto', p: [0.2, 1.2, 4, .95], lp: [1.7, 'start'], key: true },
      { t: 'Regolare umana', d: 'inizio 30 min', p: [0.5, 2.5, 7, .75], lp: [3.4, 'start'] },
      { t: 'Intermedia NPH', d: 'lattiginosa, va rotolata', p: [1.5, 6, 16, .5], lp: [7.6, 'start'] },
      { t: 'Basali', d: 'glargine, degludec: senza picco', p: [1, 12, 24, .22], piatta: true },
    ];
    const attive = d.attive ?? tipi.map((_, i) => i);
    const g = tipi.map((v, i) => {
      const [ini, pk, fin, alt] = v.p;
      const pts = v.piatta ? [[X(0), y0], [X(1), Y(alt)], [X(ORE), Y(alt)]] : curva(ini, pk, fin, alt);
      const dpath = pts.map(([x, y], k) => `${k ? 'L' : 'M'}${num(x)} ${num(y)}`).join('');
      // Le etichette a destra del picco, sulla discesa, ciascuna alla sua
      // altezza: al picco si sovrapponevano l'una all'altra (visto su 5.5).
      const [lh, anc] = v.lp ?? (v.piatta ? [23, 'end'] : [pk + (fin - pk) * .35, 'start']);
      const lx = X(lh), ly = Y(alt) - (v.piatta ? 24 : 20), t0 = .3 + i * .45;
      return `<g class="g ${v.key ? 'key' : ''} ${attive.includes(i) ? '' : 'off'}">
        <path class="area" d="${dpath}L${num(X(ORE))} ${y0}L${num(X(0))} ${y0}z" style="animation-delay:${num(t0 + .9)}s"/>
        <path class="linea" pathLength="1" d="${dpath}" style="animation-delay:${num(t0)}s"/>
        <text class="lbl" x="${num(lx)}" y="${num(ly)}" text-anchor="${anc}" style="animation-delay:${num(t0 + .8)}s">${piano(v.t)}</text>
        ${v.d ? `<text class="sub" x="${num(lx)}" y="${num(ly + 30)}" text-anchor="${anc}" style="animation-delay:${num(t0 + .9)}s">${piano(v.d)}</text>` : ''}</g>`;
    }).join('');
    const ticks = [0, 4, 8, 12, 16, 20, 24].map(h => `<line class="tick" x1="${num(X(h))}" y1="${y0}" x2="${num(X(h))}" y2="${y0 + 14}"/><text class="ticktxt" x="${num(X(h))}" y="${y0 + 48}">${h} h</text>`).join('');
    return `<div class="prof"><svg class="fig gfx" viewBox="0 0 ${W} ${H}">
      <line class="asse" x1="${x0}" y1="${y0}" x2="${x1 + 30}" y2="${y0}"/><line class="asse" x1="${x0}" y1="${y0}" x2="${x0}" y2="${y1 - 30}"/>
      <text class="assetxt" transform="translate(${x0 - 90} ${(y0 + y1) / 2}) rotate(-90)" text-anchor="middle">effetto</text>${ticks}
      ${d.pasto ? `<path class="pasto" d="M${num(X(0.2) - 12)} ${y0 + 2}l12-22 12 22z"/><text class="pastotxt" x="${num(X(0.2) + 18)}" y="${y0 - 10}" text-anchor="start">pasto</text>` : ''}${g}</svg></div>`;
  },

  // ---- 5.6: antibiotici, oppioidi, stupefacenti ----
  // Tempo-dipendenti contro concentrazione-dipendenti: due pannelli con la
  // soglia efficace tratteggiata. A sinistra tre dosi a intervalli e, sotto
  // l'asse, la fascia di tempo in cui la curva sta sopra la soglia; a destra
  // una dose sola, alta, con il picco marcato.
  mic: d => {
    const attive = d.attive ?? [0, 1];
    const pan = (k, x0) => {
      const W = 790, y0 = 420, y1 = 80, xa = x0 + 60, xb = x0 + W - 20, SOGLIA = .42;
      const X = t => xa + (xb - xa) * t / 24, Y = c => y0 - (y0 - y1) * c;
      const curva = (t0, alt, k2) => { const p = []; for (let t = t0; t <= 24.01; t += .25) { const dt = t - t0; const c = alt * (dt < .6 ? dt / .6 : Math.exp(-(dt - .6) * k2)); p.push([X(t), Y(Math.min(1, c))]); } return p; };
      let dpath = '', sopra = '', picco = '';
      if (k === 0) {
        [0, 8, 16].forEach((t0, i) => { const pts = curva(t0, .72, .22); dpath += pts.map(([x, y], j) => `${j ? 'L' : 'M'}${num(x)} ${num(y)}`).join('');
          const t1 = t0 + .6 * SOGLIA / .72, t2 = t0 + .6 + Math.log(.72 / SOGLIA) / .22;
          sopra += `<rect class="sopra" x="${num(X(t1))}" y="${y0 + 10}" width="${num(X(t2) - X(t1))}" height="14" rx="4" style="animation-delay:${num(1.2 + i * .3)}s"/>`; });
      } else {
        dpath = curva(0, 1, .16).map(([x, y], j) => `${j ? 'L' : 'M'}${num(x)} ${num(y)}`).join('');
        picco = `<line class="picco" x1="${num(X(.6))}" y1="${num(Y(1))}" x2="${num(X(.6))}" y2="${y0}"/><text class="piccotxt" x="${num(X(.6) + 18)}" y="${num(Y(1) + 10)}">picco</text>`;
      }
      const t = k === 0 ? ['Tempo-dipendenti', 'beta-lattamici: conta il tempo sopra la soglia'] : ['Concentrazione-dipendenti', 'aminoglicosidi: conta il picco'];
      return `<g class="pan ${attive.includes(k) ? '' : 'off'} ${k ? 'key' : ''}">
        <line class="asse" x1="${xa}" y1="${y0}" x2="${xb}" y2="${y0}"/><line class="asse" x1="${xa}" y1="${y0}" x2="${xa}" y2="${y1 - 20}"/>
        <line class="soglia" x1="${xa}" y1="${num(Y(SOGLIA))}" x2="${xb}" y2="${num(Y(SOGLIA))}"/><text class="sogliatxt" x="${xb}" y="${num(Y(SOGLIA)) - 12}" text-anchor="end">soglia efficace</text>
        <path class="linea" pathLength="1" d="${dpath}"/>${sopra}${picco}
        <text class="lbl" x="${xa}" y="${y0 + 72}">${t[0]}</text><text class="sub" x="${xa}" y="${y0 + 108}">${t[1]}</text></g>`;
    };
    return `<div class="mic"><svg class="fig gfx" viewBox="0 0 1656 540">${pan(0, 0)}${pan(1, 850)}</svg></div>`;
  },

  // La sedazione precede la depressione respiratoria: una linea del tempo con
  // due tracce. Sopra il livello di sedazione, che sale a gradini; sotto la
  // frequenza respiratoria, che resta normale a lungo e cala solo alla fine.
  // La finestra in cui intervenire e' dove la prima e' gia' salita e la
  // seconda non e' ancora scesa. `caso` segna il punto finale (FR 9, SpO2 90).
  respiro: d => {
    const xa = 120, xb = 1560, X = t => xa + (xb - xa) * t;
    const yS = l => 210 - l * 44, yR = f => 490 - (f - 6) * 13;
    const sed = [[0, 0], [.2, 0], [.2, 1], [.45, 1], [.45, 2], [.7, 2], [.7, 3], [1, 3]];
    const resp = [[0, 16], [.55, 16], [.7, 14], [.85, 10], [1, 9]];
    const pSed = sed.map(([t, l], i) => `${i ? 'L' : 'M'}${num(X(t))} ${num(yS(l))}`).join('');
    const pR = resp.map(([t, f], i) => `${i ? 'L' : 'M'}${num(X(t))} ${num(yR(f))}`).join('');
    return `<div class="resp"><svg class="fig gfx" viewBox="0 0 1656 560">
      <rect class="finestra" x="${num(X(.45))}" y="30" width="${num(X(.7) - X(.45))}" height="490" rx="18"/>
      <text class="fintxt" x="${num((X(.45) + X(.7)) / 2)}" y="548" text-anchor="middle">qui si interviene</text>
      <text class="trk" x="${xa}" y="${num(yS(3)) - 26}">livello di sedazione</text>
      ${[0, 1, 2, 3].map(l => `<text class="liv" x="${xa - 22}" y="${num(yS(l) + 8)}" text-anchor="end">${l}</text>`).join('')}
      <line class="guida" x1="${xa}" y1="${num(yS(0))}" x2="${xb}" y2="${num(yS(0))}"/>
      <path class="sed" pathLength="1" d="${pSed}"/>
      <text class="trk" x="${xa}" y="${num(yR(16)) - 26}">respiri al minuto</text>
      ${[16, 9].map(f => `<text class="liv" x="${xa - 22}" y="${num(yR(f) + 8)}" text-anchor="end">${f}</text>`).join('')}
      <line class="guida" x1="${xa}" y1="${num(yR(16))}" x2="${xb}" y2="${num(yR(16))}"/>
      <path class="fr" pathLength="1" d="${pR}"/>
      <text class="assetempo" x="${xb}" y="${num(yR(9) + 50)}" text-anchor="end">tempo →</text>
      ${d.caso ? `<g class="segno"><circle cx="${num(X(1))}" cy="${num(yR(9))}" r="16"/><text x="${num(X(1) + 6)}" y="${num(yR(9) - 30)}" text-anchor="end">FR 9 · SpO₂ 90%</text></g>` : ''}
    </svg></div>`;
  },

  // Il naloxone dura meno dell'oppioide: due curve che calano dalla stessa
  // altezza, l'antidoto in fretta e l'oppioide piano. Dove l'antidoto e' gia'
  // sceso sotto la soglia e l'oppioide no, la persona torna a sedarsi.
  antidoto: d => {
    const xa = 140, xb = 1560, y0 = 430, y1 = 70, X = t => xa + (xb - xa) * t, Y = c => y0 - (y0 - y1) * c;
    const curva = k => { const p = []; for (let t = 0; t <= 1.001; t += .02) p.push([X(t), Y(Math.exp(-t * k))]); return p.map(([x, y], i) => `${i ? 'L' : 'M'}${num(x)} ${num(y)}`).join(''); };
    const kN = 4.2, kO = 1.1, S = .5, tN = Math.log(1 / S) / kN, tO = Math.log(1 / S) / kO;
    return `<div class="antid"><svg class="fig gfx" viewBox="0 0 1656 540">
      <line class="asse" x1="${xa}" y1="${y0}" x2="${xb}" y2="${y0}"/><line class="asse" x1="${xa}" y1="${y0}" x2="${xa}" y2="${y1 - 20}"/>
      <line class="soglia" x1="${xa}" y1="${num(Y(S))}" x2="${xb}" y2="${num(Y(S))}"/><text class="sogliatxt" x="${xb}" y="${num(Y(S)) - 12}" text-anchor="end">soglia di sedazione</text>
      <rect class="rischio" x="${num(X(tN))}" y="${y1 - 20}" width="${num(X(tO) - X(tN))}" height="${y0 - y1 + 20}" style="animation-delay:1.9s"/>
      <text class="rischiotxt" x="${num((X(tN) + X(tO)) / 2)}" y="${y0 + 62}" text-anchor="middle">${piano(d.testo ?? 'torna a sedarsi')}</text>
      <path class="c-opp" pathLength="1" d="${curva(kO)}"/><text class="lbl opp" x="${num(X(.33))}" y="${num(Y(Math.exp(-.33 * kO))) - 26}">oppioide</text>
      <path class="c-nal" pathLength="1" d="${curva(kN)}"/><text class="lbl nal" x="${num(X(.24))}" y="${num(Y(Math.exp(-.24 * kN)) + 78)}">naloxone</text>
      <text class="assetempo" x="${xb}" y="${y0 + 44}" text-anchor="end">tempo →</text></svg></div>`;
  },

  // Il registro di carico e scarico: la pagina numerata con il timbro della
  // vidimazione, la sezione del farmaco, le righe che si scrivono una per
  // volta (data, carico, scarico, paziente, giacenza, firma). `evidenzia` e'
  // la riga da accendere; `correzione` la riga barrata con riga e firma.
  registro: d => {
    const righe = d.righe ?? [
      ['12/03', '10 fiale', '', 'dalla farmacia', '10', 'M.R.'],
      ['12/03', '', '1 fiala', 'letto 7', '9', 'M.R.'],
      ['13/03', '', '1 fiala', 'letto 12', '8', 'G.P.'],
      ['13/03', '', '1 fiala', 'letto 7', '7', 'G.P.'],
    ];
    const teste = ['Data', 'Carico', 'Scarico', 'Paziente', 'Giacenza', 'Firma'];
    const evid = d.evidenzia ?? -1, corr = d.correzione ?? -1;
    const r = righe.map((c, i) => `<div class="riga ${i === evid - 1 ? 'key' : ''} ${i === corr - 1 ? 'corr' : ''}" style="animation-delay:${num(.6 + i * .35)}s">${c.map((x, j) => `<span class="c${j}">${piano(x)}</span>`).join('')}${i === corr - 1 ? `<span class="firma-corr">${piano(d.firmaCorr ?? 'una riga e la firma · G.P.')}</span>` : ''}</div>`).join('');
    return `<div class="reg"><div class="pagina"><div class="testa"><span class="tit">${piano(d.titolo ?? 'Registro di carico e scarico')}</span><span class="farmaco">${piano(d.farmaco ?? 'Morfina cloridrato 10 mg/ml')}</span><span class="pag">pag. ${d.pagina ?? 12}</span></div>
      <div class="riga intest">${teste.map((x, j) => `<span class="c${j}">${x}</span>`).join('')}</div>${r}
      ${d.timbro !== false ? `<div class="timbro-box"><div class="timbro" style="animation-delay:1.9s">vidimato<br>Direttore Sanitario</div></div>` : ''}</div></div>`;
  },

  // ---- 6.1: accessi venosi periferici ----
  // I sei calibri dell'ago-cannula: il cono nel colore standard (qui i
  // colori veri, non il tema: il quiz chiede proprio quelli), il tubo tanto
  // piu' largo quanto piu' basso il numero. `attive` accende i calibri.
  calibri: d => {
    const G = [[14, '#F39200', 'arancione', 46], [16, '#8E8E8E', 'grigio', 40], [18, '#2E8B57', 'verde', 34], [20, '#F06292', 'rosa', 28], [22, '#4A90D9', 'azzurro', 22], [24, '#F2C230', 'giallo', 16]];
    const attive = d.attive ?? G.map((_, i) => i), sp = 1656 / 6, y0 = 90;
    const g = G.map(([n, col, nome, w], i) => { const cx = sp * i + sp / 2;
      return `<g class="cal ${attive.includes(i) ? '' : 'off'}" style="animation-delay:${num(.2 + i * .18)}s">
        <rect x="${num(cx - 46)}" y="${y0}" width="92" height="110" rx="18" fill="${col}"/>
        <rect x="${num(cx - 90)}" y="${y0 + 60}" width="180" height="22" rx="8" fill="${col}"/>
        <rect x="${num(cx - w / 2)}" y="${y0 + 110}" width="${w}" height="170" rx="${num(w / 2)}" fill="${col}" opacity=".55"/>
        <text class="n" x="${num(cx)}" y="${y0 + 330}" text-anchor="middle">${n} G</text>
        <text class="nome" x="${num(cx)}" y="${y0 + 370}" text-anchor="middle">${nome}</text></g>`; }).join('');
    return `<div class="calibri"><svg class="fig gfx" viewBox="0 0 1656 520">${g}
      <text class="regola" x="828" y="500" text-anchor="middle">${piano(d.regola ?? 'più basso il numero, più grande il calibro')}</text></svg></div>`;
  },

  // Il braccio con le vene: la mano a sinistra con le vene del dorso,
  // l'avambraccio con due vene lunghe, la piega del gomito a destra. Le
  // `zone` si accendono una per volta (`attive`); quella `vietata` ha la
  // croce in accento.
  vene: d => {
    const attive = d.attive ?? [0, 1];
    const zone = d.zone ?? [
      { t: 'Dorso della mano', d: 'distale: si comincia qui', x: 260, y: 300, rx: 120, ry: 86 },
      { t: 'Avambraccio', d: 'cefalica e basilica', x: 780, y: 290, rx: 270, ry: 96 },
      { t: 'Piega del gomito', d: 'zona di flessione: si evita', x: 1290, y: 290, rx: 130, ry: 96, vietata: true },
    ];
    const z = zone.map((v, i) => `<g class="zona ${attive.includes(i) ? 'on' : ''} ${v.vietata ? 'no' : ''}" style="animation-delay:${num(.8 + i * .3)}s">
        <ellipse cx="${v.x}" cy="${v.y}" rx="${v.rx}" ry="${v.ry}"/>${v.vietata ? `<path class="croce" d="M${v.x - 40} ${v.y - 40}l80 80M${v.x + 40} ${v.y - 40}l-80 80"/>` : ''}
        <text class="lbl" x="${v.x}" y="${num(v.y + v.ry + 44)}" text-anchor="middle">${piano(v.t)}</text>${v.d ? `<text class="sub" x="${v.x}" y="${num(v.y + v.ry + 76)}" text-anchor="middle">${piano(v.d)}</text>` : ''}</g>`).join('');
    return `<div class="vene"><svg class="fig gfx" viewBox="0 0 1656 520">
      <path class="arto" d="M120 250c0-70 60-130 160-130 60 0 100 20 140 50h600c120 0 240-14 360-14 140 0 250 40 290 110 22 40 10 96-40 118-90 34-180 36-260 36H420c-40 24-90 44-150 44-90 0-150-60-150-134z"/>
      <path class="vena" pathLength="1" d="M200 280c40-20 80-40 130-48 70-12 160-6 260 0s230 6 340 2c110-4 190-26 290-36 70-8 130-6 180 4"/>
      <path class="vena" pathLength="1" d="M190 340c60 10 110 2 170-10 110-20 220-26 340-20 120 6 220 2 320-12 80-12 150-14 230-4" style="animation-delay:.3s"/>
      <path class="vena" pathLength="1" d="M250 300c30-40 60-60 90-70M310 310c20-30 50-50 80-60" style="animation-delay:.5s"/>
      <text class="verso" x="828" y="500" text-anchor="middle">${piano(d.nota ?? 'dal distale al prossimale →')}</text>${z}</svg></div>`;
  },

  // ---- 6.2: accessi venosi centrali ----
  // Il busto con il braccio disteso e la vena cava superiore tratteggiata
  // davanti al cuore. Cinque dispositivi, ciascuno un tratto che si disegna
  // dal punto d'ingresso alla punta: CVC dalla giugulare, PICC dal braccio
  // fino in cava, Midline dal braccio con la punta che si ferma
  // nell'ascellare (in tinta sommessa: e' periferico), tunnellizzato dal
  // torace, port con il serbatoio sotto la cute. `attive` li accende.
  accessi: d => {
    const attive = d.attive ?? [0, 1, 2, 3, 4];
    const CAVA = [600, 282];
    const dev = [
      { t: 'CVC non tunnellizzato', d: 'giugulare o succlavia, breve termine', p: 'M620 96C640 150 616 200 600 282', lx: 660, ly: 80, anc: 'start' },
      { t: 'PICC', d: 'dal braccio, punta in cava', p: 'M1240 212C1100 206 940 196 820 184S660 180 600 282', lx: 1250, ly: 300, anc: 'start' },
      { t: 'Midline', d: 'dal braccio, punta periferica: ascellare', p: 'M1240 248C1120 246 1000 236 900 218', lx: 1250, ly: 360, anc: 'start', per: true },
      { t: 'Tunnellizzato', d: 'sotto la cute, lungo termine', p: 'M470 450C500 400 540 320 560 240S590 200 600 282', lx: 450, ly: 500, anc: 'end' },
      { t: 'Port', d: 'serbatoio impiantato, ago di Huber', p: 'M500 222C540 210 580 230 600 282', lx: 450, ly: 220, anc: 'end', serb: [480, 224] },
    ];
    const g = dev.map((v, i) => `<g class="dev ${attive.includes(i) ? '' : 'off'} ${v.per ? 'per' : ''}" style="animation-delay:${num(.3 + i * .35)}s">
        ${v.serb ? `<circle class="serb" cx="${v.serb[0]}" cy="${v.serb[1]}" r="24"/>` : ''}
        <path pathLength="1" d="${v.p}" style="animation-delay:${num(.4 + i * .35)}s"/>
        <circle class="punta" cx="${v.per ? 900 : CAVA[0]}" cy="${v.per ? 218 : CAVA[1]}" r="11" style="animation-delay:${num(1.3 + i * .35)}s"/>
        <text class="lbl" x="${v.lx}" y="${v.ly}" text-anchor="${v.anc}" style="animation-delay:${num(.5 + i * .35)}s">${piano(v.t)}</text>
        <text class="sub" x="${v.lx}" y="${v.ly + 32}" text-anchor="${v.anc}" style="animation-delay:${num(.6 + i * .35)}s">${piano(v.d)}</text></g>`).join('');
    return `<div class="accessi"><svg class="fig gfx" viewBox="0 0 1656 560">
      <path class="corpo" d="M600 20a42 42 0 1 1 0 84a42 42 0 1 1 0-84zM560 108c-20 40-120 40-150 70-30 40-20 160-20 340h420c0-180 10-300-20-340-30-30-130-30-150-70M740 180c140 10 300 14 480 22 120 5 220 14 270 30"/>
      <path class="corpo" d="M740 260c140 10 300 14 480 22 120 5 220 14 270 30"/>
      <path class="venaint" d="M600 130v150M640 176c-60-6-80 40-40 106M760 196c40-10 80-14 140-12"/>
      <g class="cava"><ellipse cx="${CAVA[0]}" cy="${CAVA[1] - 24}" rx="44" ry="60"/><text x="${CAVA[0]}" y="${CAVA[1] + 70}" text-anchor="middle">vena cava superiore</text></g>${g}</svg></div>`;
  },

  // ---- 6.3: fluidoterapia ----
  // Tre pannelli: una cellula in soluzione isotonica (resta uguale),
  // ipotonica (l'acqua entra, la cellula si gonfia) e ipertonica (l'acqua
  // esce, la cellula si restringe). Le frecce dicono dove va l'acqua.
  tonicita: d => {
    const attive = d.attive ?? [0, 1, 2];
    const P = [
      { t: 'Isotonica', d: 'fisiologica 0,9%, bilanciate', r: 70, fr: '', nota: 'resta nei vasi' },
      { t: 'Ipotonica', d: 'glucosata 5%, NaCl 0,45%', r: 94, fr: 'in', key: true, nota: 'l\'acqua entra' },
      { t: 'Ipertonica', d: 'NaCl 3%, glucosate concentrate', r: 50, fr: 'out', nota: 'l\'acqua esce' },
    ];
    const sp = 1656 / 3;
    const g = P.map((v, i) => { const cx = sp * i + sp / 2, cy = 230;
      const arrows = v.fr ? [45, 135, 225, 315].map((a, k) => { const rad = a * Math.PI / 180;
        const r1 = v.fr === 'in' ? v.r + 72 : v.r + 14, r2 = v.fr === 'in' ? v.r + 18 : v.r + 68;
        return `<path class="fr" pathLength="1" d="M${num(cx + Math.cos(rad) * r1)} ${num(cy + Math.sin(rad) * r1)}L${num(cx + Math.cos(rad) * r2)} ${num(cy + Math.sin(rad) * r2)}" style="animation-delay:${num(1.1 + i * .3 + k * .08)}s"/>
          <circle class="tip" cx="${num(cx + Math.cos(rad) * r2)}" cy="${num(cy + Math.sin(rad) * r2)}" r="8" style="animation-delay:${num(1.6 + i * .3 + k * .08)}s"/>`; }).join('') : '';
      return `<g class="pan ${attive.includes(i) ? '' : 'off'} ${v.key ? 'key' : ''}" style="animation-delay:${num(.3 + i * .35)}s">
        <rect class="vaso" x="${num(cx - 200)}" y="50" width="400" height="360" rx="26"/><circle class="cell" cx="${cx}" cy="${cy}" r="${v.r}"/>${arrows}
        <text class="acqua" x="${num(cx)}" y="${num(cy + 160)}" text-anchor="middle" style="animation-delay:${num(1.8 + i * .3)}s">${piano(v.nota)}</text>
        <text class="lbl" x="${num(cx)}" y="462" text-anchor="middle">${piano(v.t)}</text><text class="sub" x="${num(cx)}" y="498" text-anchor="middle">${piano(v.d)}</text></g>`; }).join('');
    return `<div class="tonic"><svg class="fig gfx" viewBox="0 0 1656 520">${g}</svg></div>`;
  },

  // ---- 6.4: emogasanalisi ----
  // Tre colonne, pH, PaCO2 e HCO3: la fascia normale in tinta sommessa, il
  // valore del caso come tacca con la freccia su o giu' se e' fuori. Sotto,
  // la lettura. `valori` {ph, co2, hco3}; `attive` accende le colonne
  // nell'ordine dei passi; `lettura` e' la riga di esito.
  ega: d => {
    const COL = [
      { k: 'ph', t: 'pH', lo: 7.35, hi: 7.45, min: 7.0, max: 7.7, fmt: v => v.toFixed(2).replace('.', ',') },
      { k: 'co2', t: 'PaCO₂', lo: 35, hi: 45, min: 10, max: 90, fmt: v => String(v) },
      { k: 'hco3', t: 'HCO₃⁻', lo: 22, hi: 26, min: 5, max: 45, fmt: v => String(v) },
    ];
    const attive = d.attive ?? [0, 1, 2], v = d.valori ?? {};
    const sp = 1656 / 3, y0 = 400, y1 = 50, H = y0 - y1;
    const g = COL.map((c, i) => { const cx = sp * i + sp / 2, Y = x => y0 - H * (x - c.min) / (c.max - c.min);
      const val = v[c.k], on = attive.includes(i);
      const dir = val == null ? '' : val > c.hi ? 'su' : val < c.lo ? 'giu' : 'ok';
      const fr = dir === 'su' ? `M${num(cx - 120)} ${num(Y(val) + 40)}v-70m-18 18 18-18 18 18` : `M${num(cx - 120)} ${num(Y(val) - 40)}v70m-18-18 18 18 18-18`;
      const tacca = val == null ? '' : `<g class="val ${dir}" style="animation-delay:${num(.5 + i * .4)}s"><line x1="${num(cx - 70)}" y1="${num(Y(val))}" x2="${num(cx + 70)}" y2="${num(Y(val))}"/>
          <text x="${num(cx + 84)}" y="${num(Y(val) + 12)}">${c.fmt(val)}</text>${dir === 'ok' ? '' : `<path class="freccia2" d="${fr}"/>`}</g>`;
      return `<g class="col ${on ? '' : 'off'}">
        <rect class="scala" x="${num(cx - 60)}" y="${y1}" width="120" height="${H}" rx="14"/>
        <rect class="norma" x="${num(cx - 60)}" y="${num(Y(c.hi))}" width="120" height="${num(Y(c.lo) - Y(c.hi))}"/>
        <text class="lim" x="${num(cx - 76)}" y="${num(Y(c.hi) + 8)}" text-anchor="end">${c.fmt(c.hi)}</text><text class="lim" x="${num(cx - 76)}" y="${num(Y(c.lo) + 8)}" text-anchor="end">${c.fmt(c.lo)}</text>
        ${tacca}<text class="nome" x="${num(cx)}" y="${y0 + 50}" text-anchor="middle">${c.t}</text></g>`; }).join('');
    const lettura = d.lettura ? `<foreignObject x="0" y="${y0 + 76}" width="1656" height="100"><div xmlns="http://www.w3.org/1999/xhtml" class="lettura">${acc(d.lettura)}</div></foreignObject>` : '';
    return `<div class="ega"><svg class="fig gfx" viewBox="0 0 1656 580">${g}${lettura}</svg></div>`;
  },

  // ---- 6.5: nutrizione parenterale ----
  // La sacca multicamera (modo 'camere'): tre camere, glucosio, aminoacidi,
  // lipidi, con i setti tratteggiati; `attivata` rompe i setti e il
  // contenuto si mescola. Oppure due sacche (modo 'emulsione'): quella con
  // l'affioramento omogeneo, accettabile, e quella con le gocce d'olio e lo
  // strato giallastro, da non usare. `attive` accende i pannelli.
  sacca: d => {
    if (d.modo === 'emulsione') {
      const attive = d.attive ?? [0, 1];
      const pan = (i, cx) => { const x = cx - 170, y = 40, w = 340, h = 380, rotta = i === 1;
        return `<g class="pan ${attive.includes(i) ? '' : 'off'}">
          <rect class="borsa" x="${x}" y="${y}" width="${w}" height="${h}" rx="30"/><rect x="${cx - 40}" y="${y - 30}" width="80" height="30" rx="8" fill="var(--linea)"/>
          <rect x="${x + 8}" y="${y + 8}" width="${w - 16}" height="${h - 16}" rx="24" fill="#F6F1E8"/>
          ${rotta ? `<rect class="strato" x="${x + 8}" y="${y + 8}" width="${w - 16}" height="56" rx="20" style="animation-delay:.8s"/>
            ${[[60, 150, 18], [150, 210, 24], [240, 140, 14], [110, 280, 20], [230, 300, 16]].map(([dx, dy, r], k) => `<circle class="goccia" cx="${x + dx}" cy="${y + dy}" r="${r}" style="animation-delay:${num(1 + k * .15)}s"/>`).join('')}
            <path class="croce" d="M${cx - 40} ${y + h / 2 - 40}l80 80M${cx + 40} ${y + h / 2 - 40}l-80 80" style="animation-delay:1.9s"/>`
          : `<rect class="crema" x="${x + 8}" y="${y + 8}" width="${w - 16}" height="22" rx="10" style="animation-delay:.8s;opacity:.9"/>
            <path class="spunta" pathLength="1" d="M${cx - 50} ${y + h / 2}l34 34 66-78" style="animation-delay:1.2s"/>`}
          <text class="lbl ${rotta ? 'no' : ''}" x="${cx}" y="${y + h + 60}" style="animation-delay:${num(.5 + i * .3)}s">${rotta ? 'Rottura dell\'emulsione' : 'Affioramento omogeneo'}</text>
          <text class="sub" x="${cx}" y="${y + h + 96}">${rotta ? 'gocce d\'olio, strato giallastro: non si usa' : 'si rimescola capovolgendo: accettabile'}</text></g>`; };
      return `<div class="sacca"><svg class="fig gfx" viewBox="0 0 1656 540">${pan(0, 520)}${pan(1, 1136)}</svg></div>`;
    }
    const att = !!d.attivata, x = 448, y = 40, w = 760, h = 380;
    const cam = [['Glucosio', '#F3E3B8'], ['Aminoacidi', '#E9EEF4'], ['Lipidi', '#F6F1E8']];
    const camere = cam.map(([t, col], i) => { const cw = (w - 16) / 3, cx = x + 8 + cw * i;
      return `<g class="cam" style="animation-delay:${num(.3 + i * .25)}s"><rect x="${num(cx)}" y="${y + 8}" width="${num(cw)}" height="${h - 16}" fill="${att ? '#F1E9DB' : col}"/>
        <text class="etic" x="${num(cx + cw / 2)}" y="${y + h / 2}">${att ? '' : t}</text></g>`; }).join('');
    const setti = [1, 2].map(i => `<line class="setto ${att ? 'rotto' : ''}" x1="${num(x + 8 + (w - 16) / 3 * i)}" y1="${y + 8}" x2="${num(x + 8 + (w - 16) / 3 * i)}" y2="${y + h - 8}"/>`).join('');
    return `<div class="sacca"><svg class="fig gfx" viewBox="0 0 1656 540">
      <rect class="borsa" x="${x}" y="${y}" width="${w}" height="${h}" rx="30"/><rect x="${x + w / 2 - 40}" y="${y - 30}" width="80" height="30" rx="8" fill="var(--linea)"/>${camere}${setti}
      ${att ? `<text class="etic" x="${x + w / 2}" y="${y + h / 2}">glucosio + aminoacidi + lipidi</text>` : ''}
      <text class="lbl" x="${x + w / 2}" y="${y + h + 60}" style="animation-delay:.9s">${piano(d.testo ?? (att ? 'Setti rotti, contenuto miscelato' : 'Sacca ternaria multicamera'))}</text>
      ${d.sotto ? `<text class="sub" x="${x + w / 2}" y="${y + h + 96}">${piano(d.sotto)}</text>` : ''}</svg></div>`;
  },

  // ---- 6.6: emotrasfusione ----
  // Due pannelli: per le emazie la sacca «0 Rh−» che va a tutti e quattro i
  // gruppi (donatore universale), per il plasma la sacca «AB» che va a
  // tutti: l'inversione che i quiz chiedono. `attive` accende i pannelli.
  gruppi: d => {
    const attive = d.attive ?? [0, 1];
    const P = [
      { t: 'Emazie', d: 'donatore universale 0 Rh negativo · ricevente universale AB Rh positivo', big: '0 −', cl: 'rossa' },
      { t: 'Plasma', d: 'donatore universale AB: nessun anticorpo anti-A né anti-B', big: 'AB', cl: 'gialla', key: true },
    ];
    const pan = (v, i) => { const cx = 414 + 828 * i, cy = 190;
      const ric = ['A', 'B', 'AB', '0'].map((g, k) => { const rx = cx - 270 + k * 180, ry = 390;
        return `<path class="fr" pathLength="1" d="M${num(cx)} ${cy + 86}C${num(cx)} 300 ${num(rx)} 300 ${num(rx)} ${ry - 42}" style="animation-delay:${num(.9 + i * .4 + k * .15)}s"/>
          <g class="ric" style="animation-delay:${num(1.3 + i * .4 + k * .15)}s"><circle cx="${num(rx)}" cy="${ry}" r="38"/><text x="${num(rx)}" y="${ry + 11}">${g}</text></g>`; }).join('');
      return `<g class="pan ${attive.includes(i) ? '' : 'off'} ${v.key ? 'key' : ''}" style="animation-delay:${num(.2 + i * .4)}s">
        <rect class="sacca ${v.cl}" x="${num(cx - 80)}" y="${cy - 90}" width="160" height="176" rx="26"/><rect x="${num(cx - 30)}" y="${cy - 116}" width="60" height="26" rx="8" fill="var(--linea)"/>
        <text class="big" x="${num(cx)}" y="${cy + 20}">${v.big}</text>${ric}
        <text class="tit" x="${num(cx)}" y="480">${piano(v.t)}</text><text class="sub" x="${num(cx)}" y="516">${piano(v.d)}</text></g>`; };
    return `<div class="gruppi"><svg class="fig gfx" viewBox="0 0 1656 540">${P.map(pan).join('')}</svg></div>`;
  },

  // ---- 6.7: fase preanalitica ----
  // Le sei provette nell'ordine di prelievo, con il tappo del colore giusto
  // e il sangue dentro: `attive` accende quelle già nominate, `freccia`
  // [da, a] disegna il passaggio dell'additivo da una provetta all'altra
  // (l'EDTA nel siero) con la `nota` sopra. In modo 'tacca' due provette
  // del citrato: quella riempita fino alla tacca e quella poco piena.
  provette: d => {
    const T = [
      { t: 'Emocolture', d: 'flaconi, per prime', cap: '#7A8A99', fl: true },
      { t: 'Citrato', d: 'azzurro · coagulazione', cap: '#5FA8E0' },
      { t: 'Siero', d: 'rosso o giallo · chimica', cap: '#D70328', cap2: '#F0C33C' },
      { t: 'Eparina', d: 'verde', cap: '#3BA55D' },
      { t: 'EDTA', d: 'viola · emocromo', cap: '#8E5BB5' },
      { t: 'Fluoruro', d: 'grigio · glicemia', cap: '#9A9A9A' },
    ];
    const vetro = (cx, top, w, h, cap, cap2, riemp) => { const x = cx - w / 2, bot = top + h, liv = bot - 40 - (h - 70) * riemp;
      return `<path class="sangue" d="M${num(x + 8)} ${num(liv)}H${num(x + w - 8)}V${num(bot - 36)}a${num(w / 2 - 8)} 28 0 0 1 ${num(-(w - 16))} 0Z"/>
        <path class="vetro" d="M${num(x)} ${top}V${num(bot - 36)}a${num(w / 2)} 36 0 0 0 ${w} 0V${top}"/>
        <rect class="tappo" x="${num(x - 6)}" y="${top - 44}" width="${w + 12}" height="52" rx="10" fill="${cap}"/>
        ${cap2 ? `<rect x="${num(cx)}" y="${top - 44}" width="${num(w / 2 + 6)}" height="52" rx="10" fill="${cap2}"/><rect x="${num(cx - 1)}" y="${top - 42}" width="12" height="48" fill="${cap}"/>` : ''}`; };
    const flacone = (cx, top, h, cap) => { const w = 64, x = cx - w / 2, bot = top + h;
      return `<rect class="sangue" x="${num(x + 8)}" y="${num(top + 70)}" width="${w - 16}" height="${num(h - 78)}" rx="14"/>
        <rect class="vetro" x="${num(x)}" y="${top + 40}" width="${w}" height="${num(h - 40)}" rx="18"/>
        <rect class="vetro" x="${num(cx - 16)}" y="${top + 4}" width="32" height="40"/>
        <rect class="tappo" x="${num(cx - 24)}" y="${top - 26}" width="48" height="34" rx="8" fill="${cap}"/>`; };
    if (d.modo === 'tacca') {
      const pan = (i, cx) => { const top = 70, w = 170, h = 330, bot = top + h, ok = i === 0, riemp = ok ? .78 : .42, tac = bot - 40 - (h - 70) * .78;
        return `<g class="tubo" style="animation-delay:${num(.2 + i * .35)}s">${vetro(cx, top, w, h, '#5FA8E0', null, riemp)}
          <line class="ttacca" x1="${num(cx - w / 2 - 30)}" y1="${num(tac)}" x2="${num(cx + w / 2 + 30)}" y2="${num(tac)}"/><text class="ttacca-t" x="${num(cx + w / 2 + 44)}" y="${num(tac + 9)}">tacca</text>
          ${ok ? `<path class="tok" pathLength="1" d="M${num(cx - 230)} ${num(top + 150)}l40 40 76-90" style="animation-delay:1s"/>`
               : `<path class="tno" d="M${num(cx - 240)} ${num(top + 110)}l100 100M${num(cx - 140)} ${num(top + 110)}l-100 100" style="animation-delay:1.2s"/>`}
          <text class="tnome ${ok ? '' : 'no'}" x="${num(cx)}" y="${bot + 60}">${ok ? 'Riempita fino alla tacca' : 'Poco piena'}</text>
          <text class="tuso" x="${num(cx)}" y="${bot + 96}">${ok ? 'sangue e anticoagulante nove a uno' : 'risultati falsamente alterati'}</text></g>`; };
      return `<div class="provette"><svg class="fig gfx" viewBox="0 0 1656 540">${pan(0, 540)}${pan(1, 1136)}</svg></div>`;
    }
    const attive = d.attive ?? [0, 1, 2, 3, 4, 5], fr = d.freccia, top = fr ? 180 : 120, h = fr ? 230 : 290, bot = top + h, w = 110;
    const tubi = T.map((v, i) => { const cx = 190 + i * 255, on = attive.includes(i);
      return `<g class="tubo ${on ? '' : 'off'} ${(d.key ?? []).includes(i) ? 'key' : ''}" style="animation-delay:${num(.2 + i * .25)}s">
        <g class="tnum"><circle cx="${num(cx)}" cy="${top - 94}" r="24"/><text x="${num(cx)}" y="${top - 85}">${i + 1}</text></g>
        ${v.fl ? flacone(cx - 40, top, h, v.cap) + flacone(cx + 40, top, h, '#D9892B') : vetro(cx, top, w, h, v.cap, v.cap2, .7)}
        <text class="tnome" x="${num(cx)}" y="${bot + 50}">${v.t}</text><text class="tuso" x="${num(cx)}" y="${bot + 84}">${piano(v.d)}</text></g>`; }).join('');
    let arco = '';
    if (fr) { const [a, b] = fr, xa = 190 + a * 255, xb = 190 + b * 255, y0 = top - 50, yc = top - 160;
      arco = `<path class="tpassa" pathLength="1" d="M${num(xa)} ${y0}C${num(xa)} ${yc} ${num(xb)} ${yc} ${num(xb)} ${y0}" style="animation-delay:1.8s"/>
        <path class="tpassa" pathLength="1" d="M${num(xb - 18)} ${y0 - 26}L${num(xb)} ${y0}L${num(xb + 18)} ${y0 - 26}" style="animation-delay:2.4s"/>
        <text class="tnota" x="${num((xa + xb) / 2)}" y="${top - 140}" style="animation-delay:2.2s">${piano(d.nota ?? '')}</text>`; }
    return `<div class="provette"><svg class="fig gfx" viewBox="0 0 1656 540">${tubi}${arco}</svg></div>`;
  },

  // ---- 7.1: riparazione tessutale ----
  // Le quattro fasi della guarigione come bande che si sovrappongono su un
  // asse del tempo da minuti ad anni; `attive` accende le bande nominate.
  fasi: d => {
    const attive = d.attive ?? [0, 1, 2, 3];
    const U = ['minuti', 'ore', 'giorni', 'settimane', 'mesi', 'anni'], X = u => 60 + u * 262;
    const F = [
      { n: '1', t: 'Emostasi', d: 'coagulo e vasocostrizione', da: 0, a: 1.35 },
      { n: '2', t: 'Infiammatoria', d: 'arrossamento, calore, edema, essudato: non sono infezione', da: .9, a: 2.6 },
      { n: '3', t: 'Proliferativa', d: 'granulazione, contrazione, epitelizzazione', da: 2.1, a: 3.9, key: true },
      { n: '4', t: 'Rimodellamento', d: 'si rinforza fino a 1–2 anni', da: 3.4, a: 4.75 },
    ];
    const asse = `<line class="asse" x1="${X(0) - 20}" y1="470" x2="${X(5) + 60}" y2="470"/>
      ${U.map((u, i) => `<line class="tacca" x1="${X(i)}" y1="460" x2="${X(i)}" y2="480"/><text class="tempo-t" x="${X(i)}" y="512">${u}</text>`).join('')}`;
    const bande = F.map((f, i) => { const y = 50 + i * 100, x = X(f.da), w = X(f.a) - X(f.da);
      return `<g class="banda f${i} ${attive.includes(i) ? '' : 'off'} ${f.key ? 'key' : ''}" style="animation-delay:${num(.2 + i * .3)}s">
        <rect x="${num(x)}" y="${y}" width="${num(w)}" height="72" rx="20" style="animation-delay:${num(.2 + i * .3)}s"/>
        <text class="n" x="${num(x + 22)}" y="${y + 48}">${f.n}</text><text class="fnome" x="${num(x + 62)}" y="${y + 48}">${f.t}</text>
        <text class="fd" x="${num(x + w + 22)}" y="${y + 46}">${piano(f.d)}</text></g>`; }).join('');
    return `<div class="fasi"><svg class="fig gfx" viewBox="0 0 1656 540">${asse}${bande}</svg></div>`;
  },

  // Il modello TIME: quattro tessere, la lettera, la parola inglese, la
  // domanda e l'intervento che ne discende. `attive` accende le tessere.
  time: d => {
    const attive = d.attive ?? [0, 1, 2, 3];
    const T = [
      { l: 'T', p: 'tissue', q: 'C’è tessuto non vitale, necrosi o fibrina?', i: 'Debridement' },
      { l: 'I', p: 'infection / inflammation', q: 'Segni di infezione o di infiammazione persistente?', i: 'Controllo della carica batterica' },
      { l: 'M', p: 'moisture', q: 'L’umidità è in equilibrio, o troppo secca o troppo bagnata?', i: 'Gestione dell’essudato' },
      { l: 'E', p: 'edge', q: 'I margini avanzano, o sono fermi, introflessi, sottominati?', i: 'Valutazione e riattivazione' },
    ];
    return `<div class="timeq">${T.map((t, i) => `<div class="tile ${attive.includes(i) ? '' : 'off'} ${(d.key ?? []).includes(i) ? 'key' : ''}" style="animation-delay:${num(.2 + i * .25)}s">
      <div class="lettera">${t.l}</div><div class="parola">${t.p}</div><div class="domanda">${t.q}</div><div class="intervento">→ ${t.i}</div></div>`).join('')}</div>`;
  },

  // Il fondo della lesione visto dall'alto, con le quattro zone colorate
  // (nero, giallo, rosso, rosa) e la legenda; `attive` accende le zone,
  // `allarme` sbianca la granulazione.
  fondo: d => {
    const attive = d.attive ?? [0, 1, 2, 3], on = i => attive.includes(i) ? '' : 'off';
    const L = [
      { c: 'nero', t: 'Nero', d: 'necrosi, l’escara' }, { c: 'giallo', t: 'Giallo', d: 'slough, fibrina: tessuto devitalizzato umido' },
      { c: 'rosso', t: 'Rosso', d: 'granulazione: sano se rosso vivo, granuloso, umido', key: true }, { c: 'rosa', t: 'Rosa', d: 'epitelizzazione: la cute nuova che avanza dai margini' },
    ];
    const cx = 470, cy = 270;
    const zone = `<ellipse class="pelle" cx="${cx}" cy="${cy}" rx="400" ry="230"/>
      <g class="zona ${on(3)}" style="animation-delay:.3s"><ellipse class="rosa" cx="${cx}" cy="${cy}" rx="300" ry="180"/></g>
      <g class="zona ${on(2)}" style="animation-delay:.6s"><ellipse class="rosso ${d.allarme ? 'pallido' : ''}" cx="${cx}" cy="${cy}" rx="236" ry="134"/>
        ${d.allarme ? [[-120, -40], [-30, 50], [80, -30], [140, 40], [-170, 30]].map(([x, y]) => `<circle cx="${cx + x}" cy="${cy + y}" r="12" fill="#7A1F24"/>`).join('') : ''}</g>
      <g class="zona ${on(1)}" style="animation-delay:.9s"><path class="giallo" d="M${cx - 150} ${cy - 20}c20-70 110-90 170-50s90 90 30 120-120 40-170 0-50-30-30-70z"/></g>
      <g class="zona ${on(0)}" style="animation-delay:1.2s"><path class="nero" d="M${cx + 60} ${cy + 10}c30-50 110-40 120 10s-30 80-80 70-60-40-40-80z"/></g>
      ${d.allarme ? `<text class="allarme" x="${cx}" y="${cy + 280}" style="animation-delay:1.4s">${piano(d.allarme)}</text>` : ''}`;
    const leg = L.map((l, i) => `<g class="leg ${on(i)} ${l.key ? 'key' : ''}" style="animation-delay:${num(.4 + i * .3)}s">
      <rect class="${l.c}" x="930" y="${50 + i * 118}" width="64" height="64" rx="14"/><text class="lt" x="1018" y="${82 + i * 118}">${l.t}</text><text class="ld" x="1018" y="${114 + i * 118}">${piano(l.d)}</text></g>`).join('');
    return `<div class="fondo"><svg class="fig gfx" viewBox="0 0 1656 540">${zone}${leg}</svg></div>`;
  },

  // La misura a orologio: la lesione, il quadrante con le ore 12 verso la
  // testa, la sottominatura disegnata all'ora indicata (`ora`, `cm`), e a
  // destra le tre misure.
  orologio: d => {
    const cx = 470, cy = 300, r = 185, ora = d.ora ?? 3, cm = d.cm ?? 2;
    const ang = (ora / 12) * Math.PI * 2 - Math.PI / 2, ux = Math.cos(ang), uy = Math.sin(ang);
    const ticks = Array.from({ length: 12 }, (_, k) => { const a = (k / 12) * Math.PI * 2 - Math.PI / 2, big = k % 3 === 0;
      return `<line class="tick" x1="${num(cx + Math.cos(a) * (r - (big ? 22 : 12)))}" y1="${num(cy + Math.sin(a) * (r - (big ? 22 : 12)))}" x2="${num(cx + Math.cos(a) * r)}" y2="${num(cy + Math.sin(a) * r)}"/>
        ${big ? `<text class="ora" x="${num(cx + Math.cos(a) * (r + 34))}" y="${num(cy + Math.sin(a) * (r + 34) + 11)}">${k === 0 ? 12 : k}</text>` : ''}`; }).join('');
    const tunnel = d.ora === null ? '' : `<path class="tunnel" pathLength="1" d="M${num(cx + ux * 120)} ${num(cy + uy * 100)}L${num(cx + ux * (120 + cm * 30))} ${num(cy + uy * (100 + cm * 30))}" style="animation-delay:1.2s"/>
      <text class="tunnel-t" x="${cx}" y="${cy + r + 70}" text-anchor="middle" style="animation-delay:1.6s">${piano(d.sotto ?? `sottominatura di ${cm} cm a ore ${ora}`)}</text>`;
    const M = d.misure ?? [{ t: 'Lunghezza', d: 'in centimetri' }, { t: 'Larghezza', d: 'in centimetri' }, { t: 'Profondità', d: 'con lo specillo sterile', key: true }];
    const mis = M.map((m, i) => `<g class="mis ${m.key ? 'key' : ''}" style="animation-delay:${num(.5 + i * .3)}s"><text class="mt" x="1000" y="${90 + i * 120}">${piano(m.t)}</text><text class="md" x="1000" y="${124 + i * 120}">${piano(m.d)}</text></g>`).join('');
    return `<div class="orologio"><svg class="fig gfx" viewBox="0 0 1656 540">
      <circle class="quadrante" cx="${cx}" cy="${cy}" r="${r}"/>${ticks}
      <ellipse class="lesione" cx="${cx}" cy="${cy}" rx="124" ry="100"/>
      <path class="testa" pathLength="1" d="M${cx} ${cy - r - 44}v-50M${cx - 22} ${cy - r - 72}l22-22 22 22" style="animation-delay:.6s"/>
      <text class="testa-t" x="${cx + 150}" y="${cy - r - 60}" style="animation-delay:.9s">verso la testa</text>${tunnel}${mis}</svg></div>`;
  },

  // Le tre intenzioni in sezione: margini accostati e suturati; la lesione
  // aperta che si riempie dal fondo; la ferita lasciata aperta e poi
  // chiusa. `attive` accende i pannelli.
  intenzioni: d => {
    const attive = d.attive ?? [0, 1, 2];
    const pan = (i, cx) => { const y = 150, w = 400, x = cx - w / 2, on = attive.includes(i) ? '' : 'off';
      const cute = i === 0 ? `<path class="cute" d="M${x} ${y}h${w / 2 - 14}l14 60 14-60h${w / 2 - 14}v230h-${w}z"/>`
                          : `<path class="cute" d="M${x} ${y}h${w / 2 - 110}c10 70 30 120 110 130s100-60 110-130h${w / 2 - 110}v230h-${w}z"/>`;
      const dentro = i === 0 ? [0, 1, 2].map(k => `<path class="sutura" d="M${cx - 40 + k * 40 - 20} ${y - 12}l40 24M${cx - 40 + k * 40 - 20} ${y + 12}l40-24"/>`).join('')
        : i === 1 ? `<path class="gran" d="M${cx - 92} ${y + 62}c14 36 40 64 92 68s78-32 92-68z" style="animation-delay:.8s"/>
            <path class="su" pathLength="1" d="M${cx} ${y + 128}v-80M${cx - 18} ${y + 66}l18-18 18 18" style="animation-delay:1.6s"/>`
        : `<path class="gran" d="M${cx - 92} ${y + 62}c14 36 40 64 92 68s78-32 92-68z" style="animation-delay:.8s"/>
            ${[0, 1, 2].map(k => `<path class="sutura poi" d="M${cx - 40 + k * 40 - 20} ${y - 12}l40 24M${cx - 40 + k * 40 - 20} ${y + 12}l40-24" style="animation-delay:1.6s"/>`).join('')}`;
      const T = [['Prima intenzione', 'margini accostati: rapida, cicatrice sottile'], ['Seconda intenzione', 'aperta, si riempie dal fondo: più lenta'], ['Terza intenzione', 'lasciata aperta, poi chiusa']][i];
      return `<g class="pan ${on} ${(d.key ?? []).includes(i) ? 'key' : ''}" style="animation-delay:${num(.2 + i * .35)}s">${cute}${dentro}
        <text class="it" x="${cx}" y="${y + 300}">${T[0]}</text><text class="id" x="${cx}" y="${y + 336}">${T[1]}</text></g>`; };
    return `<div class="intenzioni"><svg class="fig gfx" viewBox="0 0 1656 540">${pan(0, 290)}${pan(1, 828)}${pan(2, 1366)}</svg></div>`;
  },

  // ---- 7.2: lesioni da pressione ----
  // La sezione della cute a cinque strati (epidermide, derma, adipe,
  // fascia e muscolo, osso) e la lesione scavata fino allo strato dello
  // stadio: `stadio` 1 (eritema su cute integra), 2 (derma, flittene
  // sierosa), 3 (adipe), 4 (muscolo e osso), 'ns' (fondo coperto), 'dti'
  // (viola in profondità, flittene ematica). A destra il titolo e le voci.
  stadi: d => {
    const x = 60, w = 800, S = [['Epidermide', 'E', 90, 36], ['Derma', 'D', 126, 90], ['Tessuto adiposo', 'A', 216, 110], ['Fascia, muscolo, tendine', 'M', 326, 110], ['Osso', 'O', 436, 70]];
    const strati = S.map(([t, , y, h], i) => `<rect class="strato s${i}" x="${x}" y="${y}" width="${w}" height="${h}"/><text class="nome" x="${x + w + 24}" y="${y + h / 2 + 8}">${t}</text>`).join('');
    const cx = x + 330, st = d.stadio ?? 1;
    const crat = (fondo, cls = '') => `<path class="cratere ${cls}" d="M${cx - 170} 90c20 ${(fondo - 90) * .55} 70 ${fondo - 90} 170 ${fondo - 90}s150 ${-(fondo - 90) * .45} 170 ${-(fondo - 90)}z" style="animation-delay:.6s"/>`;
    let les = '';
    if (st === 1) les = `<ellipse class="eritema" cx="${cx}" cy="100" rx="170" ry="22" style="animation-delay:.6s"/>`;
    else if (st === 2) les = crat(190, 'derma') + `<ellipse class="flittene" cx="${cx + 330}" cy="96" rx="70" ry="26" style="animation-delay:1.2s"/>`;
    else if (st === 3) les = crat(300);
    else if (st === 4) les = crat(470);
    else if (st === 'ns') les = crat(330) + `<g class="copertura" style="animation-delay:1.2s"><path d="M${cx - 150} 92c40 50 90 70 150 70s110-20 150-70z" fill="#E9C84A"/><path d="M${cx - 60} 92c20 30 60 50 110 50s70-20 90-50z" fill="#2B2420"/></g>`;
    else if (st === 'dti') les = `<ellipse class="dti" cx="${cx}" cy="100" rx="170" ry="24" style="animation-delay:.6s"/><ellipse class="dtip" cx="${cx}" cy="420" rx="150" ry="40" style="animation-delay:1.1s"/><ellipse class="flittene ematica" cx="${cx + 330}" cy="96" rx="70" ry="26" style="animation-delay:1.4s"/>`;
    const voci = (d.voci ?? []).map((v, i) => `<text class="sv ${/^\*\*/.test(v) ? 'key' : ''}" x="1120" y="${190 + i * 52}" style="animation-delay:${num(.8 + i * .2)}s">${piano(v)}</text>`).join('');
    return `<div class="stadi"><svg class="fig gfx" viewBox="0 0 1656 540">${strati}${les}
      ${d.titolo ? `<text class="st" x="1120" y="120" style="animation-delay:.4s">${piano(d.titolo)}</text>` : ''}${voci}</svg></div>`;
  },

  // Le sedi: tre figure, supina, sul fianco, seduta, con i punti di
  // appoggio accesi e il nome; `attive` accende i pannelli.
  sedi: d => {
    const attive = d.attive ?? [0, 1, 2];
    const sdraiato = (ox, punti, pos, i) => `<g class="pan ${attive.includes(i) ? '' : 'off'} ${(d.key ?? []).includes(i) ? 'key' : ''}" style="animation-delay:${num(.2 + i * .35)}s">
      <line class="piano" x1="${ox + 20}" y1="330" x2="${ox + 520}" y2="330"/>
      <circle class="corpo" cx="${ox + 80}" cy="296" r="32"/>
      <path class="corpo" d="M${ox + 116} 276h210a22 22 0 0 1 22 22v10a22 22 0 0 1-22 22h-210a22 22 0 0 1-22-22v-10a22 22 0 0 1 22-22z"/>
      <path class="corpo" d="M${ox + 348} 290h150a16 16 0 0 1 16 16v8a16 16 0 0 1-16 16h-150z"/>
      ${punti.map(([px, t, sec], k) => `<circle class="punto" cx="${ox + px}" cy="330" r="${sec ? 9 : 13}" style="animation-delay:${num(.8 + k * .18)}s"/><text class="pt ${sec ? 'sec' : ''}" x="${ox + px}" y="${370 + (k % 2) * 30}" style="animation-delay:${num(1 + k * .18)}s">${t}</text>`).join('')}
      <text class="pos" x="${ox + 270}" y="200">${pos}</text></g>`;
    const seduto = (ox, i) => `<g class="pan ${attive.includes(i) ? '' : 'off'} ${(d.key ?? []).includes(i) ? 'key' : ''}" style="animation-delay:${num(.2 + i * .35)}s">
      <path class="piano" d="M${ox + 180} 150v180h190M${ox + 370} 330v120M${ox + 200} 330v120" fill="none"/>
      <circle class="corpo" cx="${ox + 232}" cy="120" r="32"/>
      <path class="corpo" d="M${ox + 206} 160h52a22 22 0 0 1 22 22v146h-96v-146a22 22 0 0 1 22-22z"/>
      <path class="corpo" d="M${ox + 258} 290h120a16 16 0 0 1 16 16v8a16 16 0 0 1-16 16h-120z"/>
      <path class="corpo" d="M${ox + 362} 314h32v120h-32z"/><path class="corpo" d="M${ox + 362} 434h60v22h-60z"/>
      <circle class="punto" cx="${ox + 232}" cy="330" r="13" style="animation-delay:.9s"/><text class="pt" x="${ox + 232}" y="372" style="animation-delay:1.1s">ischio</text>
      <text class="pos" x="${ox + 300}" y="60">Seduto</text></g>`;
    return `<div class="sedi"><svg class="fig gfx" viewBox="0 0 1656 540">
      ${sdraiato(0, [[80, 'occipite', true], [180, 'scapole', true], [250, 'gomiti', true], [330, 'sacro'], [500, 'talloni']], 'Supino', 0)}
      ${sdraiato(552, [[80, 'orecchio', true], [180, 'spalla', true], [330, 'trocantere'], [500, 'malleoli', true]], 'Sul fianco', 1)}
      ${seduto(1104, 2)}</svg></div>`;
  },

  // ---- 7.3: ulcere vascolari ----
  // Le due gambe a confronto: la venosa, edematosa, pigmentata, con
  // l'ulcera superficiale al malleolo mediale e il polso presente; e
  // l'arteriosa, sottile, pallida, glabra, con l'ulcera nera a stampo sulle
  // dita e il polso assente. Sotto ogni gamba le voci (`voci`: [[...],[...]]).
  gambe2: d => {
    const attive = d.attive ?? [0, 1];
    const gamba = (i, cx) => { const ven = i === 0, on = attive.includes(i) ? '' : 'off', w = ven ? 150 : 110;
      const x0 = cx - w / 2, x1 = cx + w / 2;
      const cute = `<path class="cute ${ven ? 'ven' : 'art'}" d="M${x0} 40H${x1}c${ven ? 26 : 14} 90 ${ven ? 20 : 10} 210 0 300v30h150a22 22 0 0 1 22 22v18H${x0 - 14}a26 26 0 0 1 -26-26V40z"/>`;
      const pigm = ven ? `<path class="pigm" d="M${x0 + 8} 230h${w - 4}v100h-${w - 4}z"/>` : '';
      const peli = ven ? [70, 120, 170].map(y => `<path class="peli" d="M${x1 - 30} ${y}l-14 8M${x0 + 28} ${y + 26}l14 8"/>`).join('') : '';
      const ulc = ven ? `<ellipse class="ulcera ven" cx="${x1 - 8}" cy="330" rx="34" ry="28"/>`
                      : `<rect class="ulcera art" x="${x1 + 120}" y="372" width="34" height="26" rx="4"/><rect class="ulcera art" x="${x0 - 30}" y="380" width="24" height="24" rx="4"/>`;
      const polso = `<g class="polso ${ven ? '' : 'no'}" style="animation-delay:1.2s"><circle cx="${x1 + 70}" cy="340" r="28"/><text x="${x1 + 70}" y="349">${ven ? '✓' : '✗'}</text></g>`;
      const T = ven ? ['Venosa', 'polsi presenti'] : ['Arteriosa', 'polsi assenti'];
      const voci = (d.voci?.[i] ?? []).map((v, k) => `<text class="gv ${/^\*\*/.test(v) ? 'key' : ''}" x="${cx + 290}" y="${80 + k * 48}" style="animation-delay:${num(.6 + k * .18)}s">${piano(v)}</text>`).join('');
      return `<g class="pan ${on} ${(d.key ?? []).includes(i) ? 'key' : ''}" style="animation-delay:${num(.2 + i * .35)}s">${cute}${pigm}${peli}${ulc}${polso}
        <text class="gt" x="${cx + 60}" y="500">${T[0]}</text><text class="gv" x="${cx + 60}" y="532" text-anchor="middle" style="animation-delay:1.3s">${T[1]}</text>${voci}</g>`; };
    return `<div class="gambe2"><svg class="fig gfx" viewBox="0 0 1656 540">${gamba(0, 180)}${gamba(1, 1000)}</svg></div>`;
  },

  // La scala dell'ABI: l'asse da 0 a 1,5 con le zone (ischemia grave,
  // arteriopatia, normale, incomprimibile) o, in modo 'compressione', le
  // soglie 0,5 e 0,8 della compressione. `attive` accende le zone.
  abi: d => {
    const comp = d.modo === 'compressione', attive = d.attive ?? [0, 1, 2, 3];
    const x0 = 120, x1 = 1536, X = v => x0 + (x1 - x0) * v / 1.5;
    const Z = comp ? [
      { da: 0, a: .5, t: 'Controindicata', d: 'sotto 0,5', c: 'z0' }, { da: .5, a: .8, t: 'Ridotta', d: 'solo su indicazione specialistica', c: 'z1' },
      { da: .8, a: 1.3, t: 'Indicata', d: 'da 0,8 in su', c: 'z2', key: true }, { da: 1.3, a: 1.5, t: 'Non affidabile', d: 'servono altri esami', c: 'z3' },
    ] : [
      { da: 0, a: .5, t: 'Ischemia grave', d: 'sotto 0,5', c: 'z0' }, { da: .5, a: .9, t: 'Arteriopatia', d: 'sotto 0,9', c: 'z1' },
      { da: .9, a: 1.3, t: 'Normale', d: 'circa 0,9–1,3', c: 'z2', key: true }, { da: 1.3, a: 1.5, t: 'Incomprimibile', d: 'calcificazioni: valore non affidabile', c: 'z3' },
    ];
    const zone = Z.map((z, i) => `<g class="zona ${z.c} ${attive.includes(i) ? '' : 'off'} ${z.key ? 'key' : ''}" style="animation-delay:${num(.4 + i * .3)}s">
      <rect x="${num(X(z.da))}" y="230" width="${num(X(z.a) - X(z.da))}" height="90" rx="14"/>
      <text class="zt" x="${num((X(z.da) + X(z.a)) / 2)}" y="380">${z.t}</text><text class="zd" x="${num((X(z.da) + X(z.a)) / 2)}" y="414">${piano(z.d)}</text></g>`).join('');
    const soglie = (comp ? [.5, .8, 1.3] : [.5, .9, 1.3]).map(v => `<line class="tick" x1="${num(X(v))}" y1="212" x2="${num(X(v))}" y2="338"/><text class="soglia" x="${num(X(v))}" y="196">${String(v).replace('.', ',')}</text>`).join('');
    const formula = d.formula === false ? '' : `<text class="formula" x="828" y="90" style="animation-delay:.2s">ABI <tspan class="op">=</tspan> pressione sistolica alla caviglia <tspan class="op">÷</tspan> pressione sistolica al braccio</text>
      <text class="formula" x="828" y="130" style="font-weight:500;font-size:24px;animation-delay:.4s">${piano(d.sotto ?? 'la più alta fra le due braccia · misurate con un Doppler')}</text>`;
    return `<div class="abi"><svg class="fig gfx" viewBox="0 0 1656 540">${formula}<line class="asse" x1="${x0}" y1="330" x2="${x1 + 40}" y2="330"/>${zone}${soglie}
      <text class="zd" x="${x0}" y="470">0</text><text class="zd" x="${x1}" y="470">1,5</text></svg></div>`;
  },

  // ---- 7.4: ferite chirurgiche ----
  // La rimozione del punto in due pannelli: la cute in sezione con il
  // filo che entra e esce, il nodo, il tratto esterno in viola
  // (contaminato); a sinistra la forbice che taglia vicino alla cute dal
  // lato opposto al nodo e la freccia che sfila dal lato del nodo (giusto),
  // a destra il taglio sotto il nodo che fa passare il tratto esterno nel
  // tessuto (sbagliato). `attive` accende i pannelli.
  punti: d => {
    const attive = d.attive ?? [0, 1];
    const pan = (i, cx) => { const y = 250, ok = i === 0, on = attive.includes(i) ? '' : 'off';
      const cute = `<path class="cute" d="M${cx - 320} ${y}h${310}l10 50 10-50h${310}v180h-${640}z"/>`;
      const filo = `<path class="filo" d="M${cx - 90} ${y}c0 70 180 70 180 0"/><path class="filo fuori" d="M${cx - 90} ${y}c-10-50-50-60-70-40"/><path class="filo fuori" d="M${cx + 90} ${y}c0-30-40-50-60-40l-100 0"/><circle class="nodo" cx="${cx - 160}" cy="${y - 42}" r="12"/>`;
      const az = ok ? `<path class="forbice" pathLength="1" d="M${cx + 110} ${y - 60}l-30 60M${cx + 70} ${y - 60}l30 60" style="animation-delay:1s"/>
          <path class="tira" pathLength="1" d="M${cx - 160} ${y - 70}l-70-70M${cx - 230} ${y - 90}v-50h50" style="animation-delay:1.8s"/>`
        : `<path class="forbice" pathLength="1" d="M${cx - 200} ${y - 10}l-30 60M${cx - 240} ${y - 10}l30 60" style="animation-delay:1s"/>
          <path class="tira" pathLength="1" d="M${cx + 90} ${y - 50}l70-70M${cx + 160} ${y - 70}v-50h-50" style="animation-delay:1.8s"/>
          <path class="no" d="M${cx + 220} ${y + 60}l60 60M${cx + 280} ${y + 60}l-60 60" style="animation-delay:2.4s"/>`;
      const T = ok ? ['Si taglia vicino alla cute, dal lato opposto al nodo', 'e si sfila dal lato del nodo: il tratto esterno non attraversa il tessuto']
                   : ['Tagliare sotto il nodo', 'il tratto esterno, contaminato, passa nel tessuto'];
      return `<g class="pan ${on} ${(d.key ?? []).includes(i) ? 'key' : ''}" style="animation-delay:${num(.2 + i * .35)}s">${cute}${filo}${az}
        <text class="pt" x="${cx}" y="${y + 230}">${T[0]}</text><text class="pd" x="${cx}" y="${y + 266}">${T[1]}</text></g>`; };
    return `<div class="punti"><svg class="fig gfx" viewBox="0 0 1656 540">${pan(0, 414)}${pan(1, 1242)}</svg></div>`;
  },

  // I tempi di rimozione dei punti per sede su un asse dei giorni:
  // barre dal giorno minimo al massimo. `righe` [{t, da, a, d, key}];
  // `attive` accende le righe.
  giorni: d => {
    const R = d.righe ?? [
      { t: 'Volto', da: 3, a: 5, d: 'vascolarizzazione ottima, cicatrice minima', key: true }, { t: 'Cuoio capelluto, tronco, addome', da: 7, a: 10 },
      { t: 'Arti', da: 10, a: 14 }, { t: 'Zone articolari, sotto tensione', da: 14, a: 18, d: '14 o più' },
    ];
    const attive = d.attive ?? R.map((_, i) => i), x0 = 560, x1 = 1560, X = g => x0 + (x1 - x0) * g / 18;
    const asse = `<line class="asse" x1="${x0}" y1="470" x2="${x1}" y2="470"/>${[0, 3, 5, 7, 10, 14, 18].map(g => `<line class="tacca" x1="${num(X(g))}" y1="462" x2="${num(X(g))}" y2="478"/><text class="gg" x="${num(X(g))}" y="508">${g === 18 ? '' : g}</text>`).join('')}<text class="gg" x="${x1}" y="508">giorni</text>`;
    const righe = R.map((r, i) => { const y = 60 + i * 100;
      return `<g class="riga ${attive.includes(i) ? '' : 'off'} ${r.key ? 'key' : ''}" style="animation-delay:${num(.2 + i * .3)}s">
        <text class="rt" x="${x0 - 30}" y="${y + 44}">${piano(r.t)}</text>
        <rect x="${num(X(r.da))}" y="${y}" width="${num(X(r.a) - X(r.da))}" height="64" rx="16" style="animation-delay:${num(.2 + i * .3)}s"/>
        <text class="rn" x="${num(X(r.a) + 20)}" y="${y + 42}">${r.d && /^\d/.test(r.d) ? r.d : `${r.da}–${r.a}`}</text>
        ${r.d && !/^\d/.test(r.d) ? `<text class="rd" x="${num(X(r.a) + 20)}" y="${y + 86}">${piano(r.d)}</text>` : ''}</g>`; }).join('');
    return `<div class="giorni"><svg class="fig gfx" viewBox="0 0 1656 540">${asse}${righe}</svg></div>`;
  },

  // Le tre profondità dell'infezione del sito chirurgico sulla sezione a
  // cinque strati con la ferita suturata: superficiale (cute e sottocute),
  // profonda (fasce e muscoli), di organo o spazio. `attive` accende i
  // livelli, `rossore` colora i margini.
  ssi: d => {
    const x = 60, w = 760, S = [['E', 90, 36], ['D', 126, 90], ['A', 216, 110], ['M', 326, 110], ['O', 436, 70]];
    const strati = S.map(([, y, h], i) => `<rect class="strato s${i}" x="${x}" y="${y}" width="${w}" height="${h}"/>`).join('');
    const cx = x + 380;
    const ferita = `<path class="taglio" d="M${cx} 90v${d.prof ?? 236}"/>${[0, 1, 2, 3].map(k => `<path class="sut" d="M${cx - 22} ${110 + k * 40}l44 20M${cx - 22} ${130 + k * 40}l44-20"/>`).join('')}`;
    const ross = d.rossore ? `<ellipse class="ross" cx="${cx}" cy="100" rx="${d.rossore}" ry="18" style="animation-delay:.6s"/>` : '';
    const L = [{ t: 'Superficiale', d: 'cute e sottocute', y: 150 }, { t: 'Profonda', d: 'fasce e muscoli', y: 330, key: true }, { t: 'Di organo o spazio', d: 'come un ascesso addominale', y: 500 }];
    const attive = d.attive ?? [0, 1, 2];
    const liv = L.map((l, i) => `<g class="liv ${attive.includes(i) ? '' : 'off'} ${l.key ? 'key' : ''}" style="animation-delay:${num(.5 + i * .35)}s">
      <path d="M${x + w + 30} ${l.y - 40}h30v${i === 2 ? 40 : 90}h-30"/><text class="lt" x="${x + w + 90}" y="${l.y + (i === 2 ? -6 : 14)}">${l.t}</text><text class="ld" x="${x + w + 90}" y="${l.y + (i === 2 ? 28 : 48)}">${piano(l.d)}</text></g>`).join('');
    return `<div class="ssi"><svg class="fig gfx" viewBox="0 0 1656 540">${strati}${ross}${ferita}${liv}</svg></div>`;
  },

  // ---- 7.5: medicazioni avanzate ----
  // L'ambiente umido: tre lesioni in sezione, la secca con la crosta, la
  // umida controllata con il fondo lucido, la troppo bagnata con la cute
  // intorno macerata; le frecce dicono che cosa fa la medicazione
  // (aggiunge, mantiene, assorbe). `attive` accende i pannelli.
  umido: d => {
    const attive = d.attive ?? [0, 1, 2];
    const pan = (i, cx) => { const y = 200, w = 420, x = cx - w / 2, on = attive.includes(i) ? '' : 'off';
      const cute = `<path class="cute" d="M${x} ${y}h${w / 2 - 120}c10 60 40 100 120 104s110-44 120-104h${w / 2 - 120}v170h-${w}z"/>`;
      const dentro = i === 0 ? `<path class="crosta" d="M${cx - 110} ${y + 6}c20-30 60-40 110-40s90 10 110 40c-20 30-60 44-110 44s-90-14-110-44z"/>`
        : i === 1 ? `<path class="fondo" d="M${cx - 100} ${y + 30}c14 40 40 70 100 72s86-32 100-72z"/><ellipse class="lucido" cx="${cx - 30}" cy="${y + 56}" rx="34" ry="10"/>`
        : `<path class="fondo" d="M${cx - 100} ${y + 30}c14 40 40 70 100 72s86-32 100-72z"/><path class="macer" d="M${x + 10} ${y - 2}h${w / 2 - 128}c-6 10-12 20-14 30h-${w / 2 - 110}zM${x + w - 10} ${y - 2}h-${w / 2 - 128}c6 10 12 20 14 30h${w / 2 - 110}z"/>
           ${[[-150, 60], [150, 60], [-180, 110], [180, 110]].map(([dx, dy], k) => `<path class="goccia" d="M${cx + dx} ${y + dy}c-12-18-12-30 0-42c12 12 12 24 0 42z" style="animation-delay:${num(.8 + k * .15)}s"/>`).join('')}`;
      const fr = i === 0 ? `<path class="uf" pathLength="1" d="M${cx} ${y - 110}v70M${cx - 20} ${y - 60}l20 20 20-20" style="animation-delay:1.2s"/>`
        : i === 2 ? `<path class="uf" pathLength="1" d="M${cx} ${y - 40}v-70M${cx - 20} ${y - 90}l20-20 20 20" style="animation-delay:1.2s"/>` : '';
      const T = [['Troppo secca', 'crosta: le cellule non migrano', 'si aggiunge umidità'], ['Umido controllato', 'il fondo lucido: guarisce più in fretta', 'si mantiene'], ['Troppo bagnata', 'la cute intorno macera', 'si assorbe']][i];
      return `<g class="pan ${on} ${i === 1 ? 'key' : ''}" style="animation-delay:${num(.2 + i * .35)}s">${cute}${dentro}${fr}
        <text class="ut" x="${cx}" y="${y + 230}">${T[0]}</text><text class="ud" x="${cx}" y="${y + 266}">${T[1]}</text><text class="ud" x="${cx}" y="${y + 296}" style="font-weight:700;fill:var(--acc)">${T[2]}</text></g>`; };
    return `<div class="umido"><svg class="fig gfx" viewBox="0 0 1656 540">${pan(0, 276)}${pan(1, 828)}${pan(2, 1380)}</svg></div>`;
  },

  // L'albero decisionale: righe «lesione → classe». `righe` [{l, c, d, key}],
  // `attive` accende le righe.
  albero: d => {
    const R = d.righe ?? [
      { l: 'Secca o necrotica', c: 'Idrogel' }, { l: 'Slough con poco essudato', c: 'Idrocolloide o idrogel' },
      { l: 'Molto essudante', c: 'Alginato, idrofibra, schiuma' }, { l: 'Infetta', c: 'Antimicrobica', d: 'mai occlusiva', key: true },
      { l: 'Granulazione con poco essudato', c: 'Schiuma sottile o idrocolloide' }, { l: 'Epitelizzazione', c: 'Film o idrocolloide sottile' },
      { l: 'Cavità', c: 'Si riempie: alginato o idrofibra', d: 'senza stipare' },
    ];
    const attive = d.attive ?? R.map((_, i) => i);
    return `<div class="albero">${R.map((r, i) => `<div class="r ${attive.includes(i) ? '' : 'off'} ${r.key ? 'key' : ''}">
      <div class="lesione" style="animation-delay:${num(.2 + i * .18)}s">${acc(r.l)}</div><div class="fr" style="animation-delay:${num(.3 + i * .18)}s">→</div>
      <div class="classe" style="animation-delay:${num(.4 + i * .18)}s">${acc(r.c)}${r.d ? `<small>${acc(r.d)}</small>` : ''}</div></div>`).join('')}</div>`;
  },

  // La terapia a pressione negativa: la lesione con la schiuma dentro, il
  // film che sigilla, il tubo verso la pompa con il valore, le gocce di
  // essudato che salgono; a destra gli effetti (`attive`).
  npwt: d => {
    const cx = 440, y = 220, w = 620, x = cx - w / 2;
    const cute = `<path class="cute" d="M${x} ${y}h${w / 2 - 140}c10 70 50 110 140 114s130-44 140-114h${w / 2 - 140}v180h-${w}z"/>`;
    const schiuma = `<path class="schiuma" d="M${cx - 128} ${y + 8}c10 60 48 98 128 100s118-40 128-100z"/>`;
    const film = `<path class="film" d="M${x + 40} ${y - 6}h${w - 80}"/>`;
    const tubo = `<path class="tubo" d="M${cx + 40} ${y - 6}v-60c0-30 20-50 50-50h300c30 0 50 20 50 50v26"/>`;
    const pompa = `<rect class="pompa" x="${cx + 320}" y="${y - 30}" width="240" height="150" rx="22"/><text class="valore" x="${cx + 440}" y="${y + 40}">${d.valore ?? '−125'}</text><text class="et" x="${cx + 440}" y="${y + 90}">mmHg</text>`;
    const gocce = [0, 1, 2].map(k => `<circle class="goccia" cx="${cx + 40}" cy="${y - 20 - k * 22}" r="7" style="animation-delay:${num(1 + k * .3)}s"/>`).join('');
    const E = [{ t: 'Rimuove l’essudato' }, { t: 'Riduce l’edema' }, { t: 'Stimola la granulazione', key: true }, { t: 'Avvicina i margini' }];
    const attive = d.attive ?? [0, 1, 2, 3];
    const eff = E.map((e, i) => `<g class="eff ${attive.includes(i) ? '' : 'off'} ${e.key ? 'key' : ''}" style="animation-delay:${num(1.4 + i * .25)}s"><text class="et2" x="1140" y="${150 + i * 90}">${e.t}</text></g>`).join('');
    const margini = `<path class="fr" pathLength="1" d="M${x + 60} ${y + 60}l60 0M${x + 100} ${y + 44}l20 16-20 16M${x + w - 60} ${y + 60}l-60 0M${x + w - 100} ${y + 44}l-20 16 20 16" style="animation-delay:2s"/>`;
    return `<div class="npwt"><svg class="fig gfx" viewBox="0 0 1656 540">${cute}${schiuma}${film}${tubo}${gocce}${pompa}${margini}${eff}
      <text class="et" x="828" y="520">${piano(d.sotto ?? 'schiuma o garza nella lesione · film sigillante · pompa: pressione subatmosferica, continua o intermittente')}</text></svg></div>`;
  },

  // ---- 7.6: stomie ----
  // L'addome visto di fronte con le tre stomie al posto giusto: la
  // colostomia a sinistra della persona (a destra di chi guarda), l'ileo-
  // stomia a destra, l'urostomia più in basso a destra; ogni stomia ha il
  // nome e la natura dell'effluente. `attive` accende le stomie.
  addome: d => {
    const attive = d.attive ?? [0, 1, 2], cx = 500;
    const tronco = `<path class="tronco" d="M${cx - 260} 20h520v380c0 60-60 110-130 110h-260c-70 0-130-50-130-110z"/><path class="ombelico" d="M${cx - 14} 250a14 14 0 1 0 28 0a14 14 0 1 0 -28 0"/>`;
    const intest = `<path class="intest" d="M${cx + 150} 140v180c0 40-40 60-80 60h-160c-40 0-80-20-80-60v-160"/>`;
    const ST = [
      { x: cx + 150, y: 200, t: 'Colostomia', d: 'colon · feci formate o semiformate', lato: 'sinistra' },
      { x: cx - 170, y: 230, t: 'Ileostomia', d: 'ileo · feci liquide, ricche di enzimi', lato: 'destra', key: true },
      { x: cx - 120, y: 380, t: 'Urostomia', d: 'urine · flusso continuo, muco normale', urina: true },
    ];
    const st = ST.map((s, i) => { const tx = s.x > cx ? 1020 : 1020, ty = 120 + i * 150;
      return `<g class="st ${attive.includes(i) ? '' : 'off'} ${s.key ? 'key' : ''}" style="animation-delay:${num(.4 + i * .35)}s">
        <path d="M${s.x + 30} ${s.y}C${s.x + 200} ${s.y} 900 ${ty} 1000 ${ty}"/><circle class="${s.urina ? 'urina' : ''}" cx="${s.x}" cy="${s.y}" r="${s.key ? 34 : 30}"/>
        <text class="n" x="${tx}" y="${ty - 6}">${s.t}</text><text class="d ${s.key ? 'key' : ''}" x="${tx}" y="${ty + 30}">${piano(s.d)}</text></g>`; }).join('');
    return `<div class="addome"><svg class="fig gfx" viewBox="0 0 1656 540">${tronco}${intest}${st}
      <text class="lato" x="${cx - 190}" y="520">destra della persona</text><text class="lato" x="${cx + 190}" y="520">sinistra della persona</text></svg></div>`;
  },

  // Il foro della placca: tre pannelli, il foro troppo largo con la cute
  // esposta e arrossata, quello giusto 2-3 mm più ampio, quello troppo
  // stretto che stringe la mucosa. `attive` accende i pannelli.
  placca: d => {
    const attive = d.attive ?? [0, 1, 2];
    const pan = (i, cx) => { const cy = 230, r = 62, foro = [112, 70, 52][i], on = attive.includes(i) ? '' : 'off';
      const T = [['Troppo largo', 'la cute esposta agli effluenti si irrita', 'no'], ['Giusto: 2–3 mm più ampio', 'misurato con il misuratore', 'key'], ['Troppo stretto', 'traumatizza la mucosa', 'no']][i];
      return `<g class="pan ${on} ${T[2]}" style="animation-delay:${num(.2 + i * .35)}s">
        <rect class="cute" x="${cx - 200}" y="${cy - 170}" width="400" height="340" rx="30"/>
        <path class="anello" d="M${cx - 170} ${cy}a170 170 0 1 0 340 0a170 170 0 1 0 -340 0M${cx - foro} ${cy}a${foro} ${foro} 0 1 1 ${foro * 2} 0a${foro} ${foro} 0 1 1 -${foro * 2} 0" fill-rule="evenodd"/>
        ${i === 0 ? `<circle class="ross" cx="${cx}" cy="${cy}" r="${foro - 4}" style="animation-delay:1s"/>` : ''}
        <circle class="stoma" cx="${cx}" cy="${cy}" r="${i === 2 ? r - 6 : r}"/>
        ${i === 1 ? `<path class="segno" d="M${cx + r + 2} ${cy - 90}v-30M${cx + foro} ${cy - 90}v-30M${cx + r + 2} ${cy - 105}h${foro - r - 2}"/><text class="mm" x="${cx + 120}" y="${cy - 112}" style="animation-delay:1s">2–3 mm</text>` : ''}
        <text class="pt" x="${cx}" y="${cy + 240}">${T[0]}</text><text class="pd" x="${cx}" y="${cy + 274}">${T[1]}</text></g>`; };
    return `<div class="placca"><svg class="fig gfx" viewBox="0 0 1656 540">${pan(0, 276)}${pan(1, 828)}${pan(2, 1380)}</svg></div>`;
  },

  percento: d => {
    const cols = 10, sp = 54, r = 21, x0 = 50, y0 = 50, da = d.da ?? d.n;
    const dots = Array.from({ length: 100 }, (_, i) => {
      const cls = i < da ? 'pieno' : i < d.n ? 'mezzo' : '';
      return `<circle class="p ${cls}" cx="${x0 + (i % cols) * sp}" cy="${y0 + Math.floor(i / cols) * sp}" r="${r}" style="animation-delay:${num(.15 + i * .012)}s"/>`;
    }).join('');
    return `<div class="percento"><svg class="fig gfx" viewBox="0 0 1656 590">${dots}
      <foreignObject x="660" y="90" width="960" height="420"><div xmlns="http://www.w3.org/1999/xhtml">
        <div class="big">${piano(d.t)}</div>${d.sotto ? `<div class="sub">${piano(d.sotto)}</div>` : ''}</div></foreignObject>
    </svg></div>`;
  },

  // La selezione: un campo di germi, quasi tutti sensibili (tratto) e pochi
  // resistenti (accento). fase 'prima': il campo com'e'; 'dopo': l'antibiotico
  // ha ucciso i sensibili, che svaniscono, e i resistenti restano; 'poi': i
  // resistenti si sono moltiplicati e il campo e' tutto loro.
  selezione: d => {
    const cols = 8, righe = 5, sp = 84, x0 = 70, y0 = 70, fase = d.fase ?? 'prima';
    const resistenti = new Set([3, 11, 17, 22, 30, 37]);
    const germi = Array.from({ length: cols * righe }, (_, i) => {
      const x = x0 + (i % cols) * sp, y = y0 + Math.floor(i / cols) * sp, a = ((i * 37) % 60) - 30;
      const res = fase === 'poi' || resistenti.has(i), via = fase === 'dopo' && !res;
      return `<g class="g ${res ? 'res' : ''} ${via ? 'via' : ''}" transform="rotate(${a} ${x} ${y})" style="animation-delay:${num(.15 + i * .02)}s">
        <ellipse cx="${x}" cy="${y}" rx="26" ry="15"/>
        <path d="M${x - 26} ${y}l-13-8M${x + 26} ${y}l13-8M${x} ${y - 15}v-11M${x} ${y + 15}v11"/></g>`;
    }).join('');
    return `<div class="selezione"><svg class="fig gfx" viewBox="0 0 1656 500">${germi}
      <foreignObject x="740" y="0" width="900" height="500"><div xmlns="http://www.w3.org/1999/xhtml">
        <div class="big">${acc(d.t)}</div>${d.sotto ? `<div class="sub">${piano(d.sotto)}</div>` : ''}</div></foreignObject>
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
