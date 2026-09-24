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
