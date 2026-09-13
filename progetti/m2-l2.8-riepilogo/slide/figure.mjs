// Seconda generazione grafica: illustrazioni vettoriali che si disegnano da
// sole, figure che crescono, numeri che contano, un formaggio svizzero vero.
//
// Stesso sistema delle icone di grafica.mjs (tratto tondo, un solo colore,
// niente ombre), ma su una griglia da 240 e con qualche campitura leggera in
// accento. Ogni tratto ha pathLength="1": cosi' il disegno progressivo e' lo
// stesso per tutti, senza misurare niente.
//
// L'orologio delle animazioni lo muove il generatore (clips.mjs): niente qui
// dipende dal tempo reale, e tutto deve essere finito entro 2,8 s.
import { DATI, RAMPA } from './grafica.mjs';

let acc = s => String(s ?? '');
export const collega = fn => { acc = fn; };
const piano = s => String(s ?? '').replace(/\*\*(.+?)\*\*/g, '$1').replace(/\*(.+?)\*/g, '$1');
const num = n => String(Math.round(n * 100) / 100);

// ---------- illustrazioni: griglia 240x240, tratto 6 ----------
// Ogni voce e' un elenco di tratti; «pieno:» marca una campitura in accento.
const C = (cx, cy, r) => `M${cx} ${cy - r}a${r} ${r} 0 1 1 0 ${2 * r}a${r} ${r} 0 1 1 0 ${-2 * r}`;
const ILLU = {
  letto: [
    'M22 150h196', 'M30 150v46M210 150v46', 'M30 96v54M210 118v32',        // pavimento, gambe, testiera/pediera
    'M30 96h28v34H30z',                                                    // testiera
    'M42 130h170a6 6 0 0 1 6 6v14H36v-14a6 6 0 0 1 6-6z',                  // materasso
    'M46 118h36a8 8 0 0 1 8 8v4H46z',                                       // cuscino
    `${C(78, 112, 12)}`,                                             // testa
    'pieno:M96 118h110a10 10 0 0 1 10 10v2H96z',                             // coperta
    'M96 118h110a10 10 0 0 1 10 10v2H96z',
    `${C(40, 204, 8)}${C(200, 204, 8)}`,                        // ruote
  ],
  braccialetto: [
    'M14 108c30-10 60-12 90-8', 'M14 164c30 10 60 12 90 8',                  // avambraccio
    'M104 100c22-4 40-2 56 8 12 8 22 22 30 36-16 12-36 16-58 12-12-2-22-8-28-16', // mano
    'M160 108l26-8M170 122l28-4', 'M132 156c8 4 18 6 26 4',                   // dita
    'pieno:M56 96l10 78h18l-10-78z',                                          // fascia
    'M56 96l10 78h18l-10-78z',
    'M66 112h12M68 126h10M70 140h12M72 154h10',                               // codice a barre
  ],

  fiale: [
    'M52 60h44v10H52zM58 70v20l-10 10v96a8 8 0 0 0 8 8h36a8 8 0 0 0 8-8V100l-10-10V70',
    'pieno:M50 140h48v56a6 6 0 0 1-6 6H56a6 6 0 0 1-6-6z',
    'M60 118h28M60 130h18',
    'M144 60h44v10h-44zM150 70v20l-10 10v96a8 8 0 0 0 8 8h36a8 8 0 0 0 8-8V100l-10-10V70',
    'pieno:M142 140h48v56a6 6 0 0 1-6 6h-36a6 6 0 0 1-6-6z',
    'M152 118h28M152 130h18',
    'M112 176l8 14h-16z',                                                   // segno di attenzione fra le due
  ],
  cartella: [
    'M52 44h136a8 8 0 0 1 8 8v148a8 8 0 0 1-8 8H52a8 8 0 0 1-8-8V52a8 8 0 0 1 8-8z',
    'M96 32h48a6 6 0 0 1 6 6v18H90V38a6 6 0 0 1 6-6z',
    'M70 92h100M70 116h100M70 140h72',
    'pieno:M148 150l30-30 14 14-30 30-20 6z',                               // penna
    'M148 150l30-30 14 14-30 30-20 6zM174 124l14 14',
  ],
  telefono: [
    'M62 46c-14 2-26 12-28 26 4 46 38 96 92 122 14 4 28-4 34-16l-14-30-26 8c-20-10-40-32-50-52l14-22z',
    'M132 62c20 4 34 18 40 38', 'M138 34c34 8 56 30 64 66',                  // onde
    'M126 92c8 2 14 8 16 16',
  ],
  stetoscopio: [
    'M64 34v70a44 44 0 0 0 88 0V34',                                        // arco auricolari
    'M58 24h12M146 24h12',                                                   // olive
    'M108 148v14a34 34 0 0 0 68 0v-22',                                     // tubo
    `${C(176, 128, 20)}`,                                            // testina
    `pieno:${C(176, 128, 10)}`,
  ],
  mani: [
    'M18 124c16-4 34-4 48 2l30 12v20l-32-6',                                 // mano sinistra
    'M22 146c14 2 26 8 36 18M26 168c10 2 20 6 28 12',
    'M222 124c-16-4-34-4-48 2l-30 12v20l32-6',                              // mano destra
    'M218 146c-14 2-26 8-36 18M214 168c-10 2-20 6-28 12',
    'pieno:M88 72h64a6 6 0 0 1 6 6v54H82V78a6 6 0 0 1 6-6z',                // cartellina che passa
    'M88 72h64a6 6 0 0 1 6 6v54H82V78a6 6 0 0 1 6-6zM100 96h40M100 112h28',
  ],
  orologio: [
    `${C(120, 120, 92)}`,
    'M120 48v10M192 120h-10M120 192v-10M48 120h10',
    'M120 120V70', 'M120 120l38 22',
    `pieno:${C(120, 120, 8)}`,
  ],
  termometro: [
    'M104 30h32v122a30 30 0 1 1-32 0z',                                     // tubo
    'M136 62h14M136 86h14M136 110h14M136 134h14',                           // tacche
    'pieno:M112 112h16v42a20 20 0 1 1-16 0z',                               // livello
    `${C(120, 177, 9)}`,
  ],
  scudo: [
    'M120 24 40 54v58c0 46 34 84 80 98 46-14 80-52 80-98V54z',
    'M120 60 68 80v34c0 30 22 56 52 68 30-12 52-38 52-68V80z',
    'pieno:M120 96 94 106v18c0 14 10 26 26 34 16-8 26-20 26-34v-18z',
    'M120 96 94 106v18c0 14 10 26 26 34 16-8 26-20 26-34v-18z',
  ],
  lente: [
    'M40 52h96a6 6 0 0 1 6 6v20M40 52v140a6 6 0 0 0 6 6h60',                // foglio
    'M60 84h50M60 108h36M60 132h30',
    `${C(150, 96, 42)}`,                                             // lente
    'M180 126l40 40',
    `pieno:${C(150, 96, 42)}`,
  ],
  piramide: [
    'M120 26 22 200h196z',
    'M64 128h112M86 90h68',
    'pieno:M120 26 86 90h68z',
  ],
  libro: [
    'M120 62c-22-14-52-18-88-14v138c36-4 66 0 88 14',
    'M120 62c22-14 52-18 88-14v138c-36-4-66 0-88 14',
    'M120 62v138',
    'M52 84c20-2 38 0 54 6M52 110c20-2 38 0 54 6M52 136c20-2 38 0 54 6',
    'M188 84c-20-2-38 0-54 6M188 110c-20-2-38 0-54 6',
  ],
  semaforo: [
    'M86 22h68a10 10 0 0 1 10 10v150a10 10 0 0 1-10 10H86a10 10 0 0 1-10-10V32a10 10 0 0 1 10-10z',
    'M120 192v26M100 218h40',
    `pieno:${C(120, 48, 22)}`,
    `${C(120, 48, 22)}${C(120, 106, 22)}${C(120, 164, 22)}`,
  ],
  bussola: [
    `${C(120, 120, 94)}`,
    'M120 40v12M200 120h-12M120 200v-12M40 120h12',
    'pieno:M120 52l24 60-24 68-24-68z',
    'M120 52l24 60-24 68-24-68zM96 112h48',
  ],
  campana: [
    'M120 30v14', 'M74 152V102a46 46 0 0 1 92 0v50l16 22H58z',
    'M102 182a18 18 0 0 0 36 0',
    'M40 96c-2-22 8-42 24-56M200 96c2-22-8-42-24-56',                        // onde
  ],
  catena: [
    'M60 100a20 20 0 0 1 0 40h-8a20 20 0 0 1 0-40z',
    'M92 100a20 20 0 0 1 0 40h-8a20 20 0 0 1 0-40z',
    'M156 100a20 20 0 0 1 0 40h-8a20 20 0 0 1 0-40z',
    'M188 100a20 20 0 0 1 0 40h-8a20 20 0 0 1 0-40z',
    'M112 112l8-14M120 142l-8 14M132 108l-6 22',                              // l'anello rotto
  ],
  flebo: [
    'M60 26v190M40 216h40',                                                  // asta
    'M42 40h40v54a20 20 0 0 1-40 0z',                                        // sacca
    'pieno:M46 62h32v32a16 16 0 0 1-32 0z',
    'M62 114v40c0 12 8 20 20 20h50c12 0 20 8 20 20v6',                     // deflussore
    `${C(152, 186, 12)}`,                                            // camera di gocciolamento
    'M166 204l30-10c10-4 22 0 26 10M150 226h60',                             // mano
  ],
  cuore: [
    'M120 204c-10-10-84-56-84-108a44 44 0 0 1 84-16 44 44 0 0 1 84 16c0 52-74 98-84 108z',
    'M36 128h40l14-30 20 60 16-46 10 16h68',                                  // ECG
  ],
  casa: [
    'M28 120 120 42l92 78', 'M52 104v96h136v-96',
    'M104 200v-50h32v50',
    'M164 120v34h-24v-34zM152 120v34',                                       // finestra a croce
    'pieno:M104 200v-50h32v50z',
  ],
  ascolto: [
    'M92 60a46 46 0 0 1 92 0c0 30-26 38-30 60-3 18-14 30-34 30',
    'M116 100a20 20 0 0 1 40 0c0 10-8 14-12 22',
    'M40 120c-2-20 6-38 18-52M28 138c-6-30 2-60 22-84',                       // onde in arrivo
  ],
  dialogo: [
    'M28 52h116a8 8 0 0 1 8 8v58a8 8 0 0 1-8 8H72l-28 26v-26H28a8 8 0 0 1-8-8V60a8 8 0 0 1 8-8z',
    'M48 80h72M48 100h50',
    'pieno:M104 112h108a8 8 0 0 1 8 8v54a8 8 0 0 1-8 8h-12v24l-26-24h-70a8 8 0 0 1-8-8v-54a8 8 0 0 1 8-8z',
    'M104 112h108a8 8 0 0 1 8 8v54a8 8 0 0 1-8 8h-12v24l-26-24h-70a8 8 0 0 1-8-8v-54a8 8 0 0 1 8-8z',
    'M124 140h68M124 160h44',
  ],
  bilancia: [
    'M120 40v160M80 200h80', 'M120 64 48 92M120 64l72 28',
    'M48 92l-26 60a26 26 0 0 0 52 0zM192 92l-26 60a26 26 0 0 0 52 0z',
    'pieno:M22 152a26 26 0 0 0 52 0zM166 152a26 26 0 0 0 52 0z',
  ],
  persona: [
    `${C(120, 70, 30)}`,
    'M60 210v-40a48 48 0 0 1 48-48h24a48 48 0 0 1 48 48v40',
    'pieno:M60 210v-40a48 48 0 0 1 48-48h24a48 48 0 0 1 48 48v40z',
  ],
};
export const ILLUSTRAZIONI = Object.keys(ILLU);

export const illustrazione = (n, cls = '') => {
  const tratti = ILLU[n] ?? ILLU.cartella;
  let k = 0;
  return `<svg class="illu ${cls}" viewBox="0 0 240 240" fill="none" stroke="currentColor"
    stroke-width="6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${
    tratti.map(t => t.startsWith('pieno:')
      ? `<path class="pieno" d="${t.slice(6)}" stroke="none"/>`
      : `<path class="tr" style="--i:${k++}" pathLength="1" d="${t}"/>`).join('')}</svg>`;
};

// ---------- CSS ----------
export const CSS_FIGURE = `
@property --n { syntax:'<integer>'; initial-value:0; inherits:false; }

@keyframes disegna{from{stroke-dashoffset:1.1}to{stroke-dashoffset:0}}
@keyframes appari{from{opacity:0}to{opacity:1}}
@keyframes cresciX{from{transform:scaleX(0)}to{transform:none}}
@keyframes cresciY{from{transform:scaleY(0)}to{transform:none}}
@keyframes scivola{from{opacity:0;transform:translateX(-46px)}to{opacity:1;transform:none}}
@keyframes sali{from{opacity:0;transform:translateY(34px) scale(.96)}to{opacity:1;transform:none}}
@keyframes pop{0%{opacity:0;transform:scale(.4)}70%{opacity:1;transform:scale(1.08)}100%{opacity:1;transform:none}}
@keyframes respiro{0%,100%{transform:none}50%{transform:scale(1.025)}}
@keyframes conta{to{--n:var(--fine)}}

/* --- il disegno progressivo --- */
.illu{display:block;width:100%;height:auto;overflow:visible;color:var(--tit)}
.illu .tr{stroke-dasharray:1 2;stroke-dashoffset:1.1;
          animation:disegna 1.05s cubic-bezier(.4,0,.2,1) both;
          animation-delay:calc(.22s + var(--i) * .11s)}
.illu .pieno{fill:var(--acc);animation:appariPieno .6s ease-out both 1.55s}
@keyframes appariPieno{from{opacity:0}to{opacity:.16}}
.scuro .illu{color:var(--tit)}
.scuro .illu .pieno{fill:var(--acc)}

/* --- figura: illustrazione grande accanto al titolo --- */
.figura{display:flex;align-items:center;gap:64px;min-height:600px}
.figura.dx{flex-direction:row-reverse}
.figura .ill{flex:0 0 600px;width:600px}
.figura .ill .illu{width:600px;height:600px}
.figura .tx{flex:1;display:flex;flex-direction:column;gap:30px}
.figura .tx h2{font-size:74px;line-height:1.12}
.figura .tx .sotto{font-size:36px}
.figura .tx{animation:sali .6s cubic-bezier(.22,.7,.3,1) both .5s}
.corpo>.figura{animation:none}

/* --- cifre: numeri grandi che contano --- */
.cifre{display:flex;gap:40px;align-items:stretch}
.cifre .c{flex:1;border:3px solid var(--linea);border-radius:26px;padding:48px 40px 44px;
          display:flex;flex-direction:column;gap:10px;animation:sali .55s cubic-bezier(.22,.7,.3,1) both}
.cifre .c:nth-child(1){animation-delay:.18s}.cifre .c:nth-child(2){animation-delay:.34s}
.cifre .c:nth-child(3){animation-delay:.50s}.cifre .c:nth-child(4){animation-delay:.66s}
.cifre .c.key{border-color:var(--acc);background:color-mix(in srgb,var(--acc) 8%,transparent)}
.cifre .n{font-size:168px;font-weight:700;line-height:.95;letter-spacing:-.03em;color:var(--acc);
          font-variant-numeric:lining-nums tabular-nums;display:flex;align-items:baseline;gap:8px}
.cifre .n .cnt{counter-reset:n var(--n);animation:conta 1.3s cubic-bezier(.2,.6,.2,1) both .45s}
.cifre .n .cnt::after{content:counter(n)}
.cifre .n .suf{font-size:64px;font-weight:600;color:var(--tit)}
.cifre .t{font-size:40px;font-weight:600;color:var(--tit);line-height:1.16}
.cifre .d{font-size:27px;line-height:1.36;opacity:.74}
.cifre.n4 .n{font-size:132px}.cifre.n4 .t{font-size:33px}
.corpo>.cifre{animation:none}

/* --- formaggio svizzero --- */
.fig .fetta{animation:sali .6s cubic-bezier(.22,.7,.3,1) both}
.fig .buco{fill:var(--bg)}
.fig .freccia{stroke:var(--acc);stroke-width:12;stroke-linecap:round;fill:none;
              stroke-dasharray:1 2;stroke-dashoffset:1.1;
              animation:disegna .9s cubic-bezier(.4,0,.2,1) both 1.25s}
.fig .punta{fill:var(--acc);opacity:0;animation:appari .2s both 2.05s}
.fig .esito{opacity:0;animation:sali .5s cubic-bezier(.22,.7,.3,1) both 2.1s}

/* --- ciclo --- */
.fig .anello{stroke:var(--linea);stroke-width:14;fill:none}
.fig .arco{stroke:var(--tit);stroke-width:14;fill:none;stroke-dasharray:1 2;stroke-dashoffset:1.1;
           animation:disegna 1.4s cubic-bezier(.4,0,.2,1) both .3s}
.fig .nodo{animation:pop .5s cubic-bezier(.22,.7,.3,1) both;transform-box:fill-box;transform-origin:center}
.fig .nodo circle{fill:var(--bg);stroke:var(--tit);stroke-width:6}
.fig .nodo.key circle{fill:var(--acc);stroke:var(--acc)}
.fig .nodo .num{font-size:40px;font-weight:700;fill:var(--tit);text-anchor:middle;dominant-baseline:central}
.fig .nodo.key .num{fill:var(--bg)}
.fig .nodo .lbl{text-anchor:middle}
.fig .centro{font-size:44px;font-weight:600;fill:var(--tit);text-anchor:middle;dominant-baseline:central;
             animation:appari .6s both 1.6s}

.fig .nodo.off > *,.fig .sat.off > *{opacity:.26}

/* --- raggiera --- */
.fig .raggio{stroke:var(--linea);stroke-width:6;stroke-dasharray:1 2;stroke-dashoffset:1.1;
             animation:disegna .6s ease-out both}
.fig .hub{animation:pop .55s cubic-bezier(.22,.7,.3,1) both .15s;transform-box:fill-box;transform-origin:center}
.fig .hub circle{fill:var(--tit)}
.fig .hub text{fill:var(--bg);font-size:38px;font-weight:700;text-anchor:middle;dominant-baseline:central}
.fig .sat{animation:pop .5s cubic-bezier(.22,.7,.3,1) both;transform-box:fill-box;transform-origin:center}
.fig .sat circle{fill:var(--bg);stroke:var(--tit);stroke-width:5}
.fig .sat.key circle{fill:color-mix(in srgb,var(--acc) 12%,var(--bg));stroke:var(--acc)}
.fig .sat .lbl{font-size:28px;font-weight:600;fill:var(--tit);text-anchor:middle;dominant-baseline:central}
.fig .sat.key .lbl{fill:var(--acc)}

/* --- misura: l'indicatore verticale --- */
.misura{display:flex;gap:80px;align-items:center;min-height:560px}
.misura .gauge{flex:0 0 520px;width:520px}
.misura .gauge svg{width:520px;height:auto}
.misura .tx{flex:1;display:flex;flex-direction:column;gap:22px;animation:sali .6s both .5s}
.misura .tx h2{font-size:80px}
.misura .tx .sotto{font-size:34px}
.fig .zona{opacity:.16}
.fig .marcatore{animation:cresciY 1.2s cubic-bezier(.3,.8,.3,1) both .5s;transform-box:fill-box;transform-origin:bottom}
.fig .lettura{opacity:0;animation:appari .4s both 1.5s}
.fig .soglia{stroke:var(--acc);stroke-width:5;stroke-dasharray:14 12;stroke-linecap:round}
.corpo>.misura{animation:none}

/* --- le figure di prima generazione imparano a muoversi --- */
.fig .gx rect{transform-box:fill-box;transform-origin:left center;
              animation:cresciX .8s cubic-bezier(.3,.8,.3,1) both;animation-delay:inherit}
.fig .gx path[fill]:not(.buco){transform-box:fill-box;transform-origin:center bottom;
              animation:cresciY .55s cubic-bezier(.3,.8,.3,1) both;animation-delay:inherit}
.catena .p{animation-name:scivola}
.scala .g{transform-origin:center bottom}
.tre .box.key,.griglia .c.key,.icone .v.key,.catena .p.key,.cifre .c.key{
  animation:sali .55s cubic-bezier(.22,.7,.3,1) both,respiro 1.4s ease-in-out 1.7s 1}
`;

// ---------- i corpi ----------
export const CORPI_FIGURE = {

  // Un'illustrazione grande accanto a un titolo. «illu» viene da ILLU.
  figura: d => `<div class="figura ${d.lato === 'dx' ? 'dx' : ''}">
      <div class="ill">${illustrazione(d.illu)}</div>
      <div class="tx"><h2>${acc(d.titolo)}</h2>${
        d.sotto ? `<div class="sotto">${acc(d.sotto)}</div>` : ''}</div></div>`,

  // Da uno a quattro numeri grandi. Un intero conta da zero; un intervallo
  // («6–23») o una sigla si limita a comparire.
  cifre: d => `<div class="cifre ${d.voci.length === 4 ? 'n4' : ''}">${d.voci.map(v => {
      const n = String(v.n);
      const intero = /^\d+$/.test(n);
      return `<div class="c ${v.key ? 'key' : ''}">
        <div class="n">${intero
          ? `<span class="cnt" style="--fine:${n}"></span>`
          : `<span>${n}</span>`}${v.suf ? `<span class="suf">${v.suf}</span>` : ''}</div>
        <div class="t">${acc(v.t)}</div>${v.d ? `<div class="d">${acc(v.d)}</div>` : ''}</div>`;
    }).join('')}</div>`,

  // Il formaggio svizzero di Reason: fette con i buchi, e una traiettoria che
  // passa solo quando i buchi si allineano.
  formaggio: d => {
    const n = d.fette.length, W = 1656, H = 620;
    const fw = 190, gap = (W - 440 - n * fw) / (n - 1), x0 = 40, top = 40, fh = 440;
    const ym = top + fh / 2;
    const fette = d.fette.map((f, i) => {
      const x = x0 + i * (fw + gap);
      const col = RAMPA[1 + (i % 3)];
      const buchi = [[x + 46, top + 80, 22], [x + 104, top + 300, 26], [x + 56, top + 210, 18],
                     [x + fw / 2, ym, 30]];
      return `<g class="fetta" style="animation-delay:${num(.15 + i * .18)}s">
        <path d="M${x} ${top + 26} l${fw} -26 v${fh} l-${fw} 26z" fill="${col}"/>
        ${buchi.map(([cx, cy, r]) => `<circle class="buco" cx="${cx}" cy="${cy}" r="${r}"/>`).join('')}
        <text class="lbl" x="${x + fw / 2}" y="${top + fh + 70}" text-anchor="middle">${piano(f.t)}</text>
        ${f.d ? `<text class="sub" x="${x + fw / 2}" y="${top + fh + 108}" text-anchor="middle">${piano(f.d)}</text>` : ''}
      </g>`;
    }).join('');
    const xe = x0 + (n - 1) * (fw + gap) + fw + 40;
    return `<svg class="fig gfx" viewBox="0 0 ${W} ${H}">
      ${fette}
      <path class="freccia" pathLength="1" d="M20 ${ym} H${xe}"/>
      <path class="punta" d="M${xe - 6} ${ym - 22} l40 22 -40 22z"/>
      ${d.esito ? `<text class="esito big" x="${xe + 50}" y="${ym + 2}" dominant-baseline="middle"
                     font-size="44">${piano(d.esito)}</text>` : ''}
    </svg>`;
  },

  // Un processo ciclico: i passi su un anello, e l'anello che si chiude.
  ciclo: d => {
    const n = d.passi.length, W = 1656, H = 620, cx = W / 2, cy = H / 2 + 6, R = 236;
    const ang = i => -Math.PI / 2 + i * 2 * Math.PI / n;
    const P = i => [cx + R * Math.cos(ang(i)), cy + R * Math.sin(ang(i))];
    const nodi = d.passi.map((p, i) => {
      const [x, y] = P(i);
      const fuori = 1.62, lx = cx + R * fuori * Math.cos(ang(i)), ly = cy + R * fuori * Math.sin(ang(i));
      const anchor = Math.abs(Math.cos(ang(i))) < .2 ? 'middle' : (Math.cos(ang(i)) > 0 ? 'start' : 'end');
      const on = (d.attive ?? d.passi.map((_, k) => k)).includes(i);
      return `<g class="nodo ${p.key ? 'key' : ''} ${on ? '' : 'off'}" style="animation-delay:${num(.5 + i * .22)}s">
        <circle cx="${num(x)}" cy="${num(y)}" r="44"/>
        <text class="num" x="${num(x)}" y="${num(y)}">${i + 1}</text>
        <text class="lbl" x="${num(lx)}" y="${num(ly - (p.d ? 12 : 0))}" text-anchor="${anchor}"
          dominant-baseline="middle" font-size="36" font-weight="600" fill="var(--tit)">${piano(p.t)}</text>
        ${p.d ? `<text class="sub" x="${num(lx)}" y="${num(ly + 30)}" text-anchor="${anchor}"
          dominant-baseline="middle">${piano(p.d)}</text>` : ''}
      </g>`;
    }).join('');
    // l'arco parte dal primo nodo e gira in senso orario fino a richiudersi
    const [sx, sy] = P(0);
    const arco = `M${num(sx)} ${num(sy)} A${R} ${R} 0 1 1 ${num(sx - .01)} ${num(sy)}`;
    return `<svg class="fig gfx" viewBox="0 0 ${W} ${H}">
      <circle class="anello" cx="${cx}" cy="${cy}" r="${R}"/>
      <path class="arco" pathLength="1" d="${arco}"/>
      ${nodi}
      ${d.centro ? `<text class="centro" x="${cx}" y="${cy}">${piano(d.centro)}</text>` : ''}
    </svg>`;
  },

  // Un concetto al centro e i suoi elementi intorno.
  raggiera: d => {
    // I satelliti tengono dentro solo il nome; la riga di spiegazione sta fuori,
    // in direzione radiale, come le etichette del ciclo: dentro a un cerchio
    // di novanta pixel non ci sta una frase, e in 2.7 usciva dal bordo.
    const n = d.raggi.length, W = 1656, H = 660, cx = W / 2, cy = 318, r = 100,
          R = d.raggi.some(q => q.d) ? 200 : 236;
    const ang = i => -Math.PI / 2 + i * 2 * Math.PI / n;
    const parti = d.raggi.map((q, i) => {
      const a = ang(i), x = cx + R * Math.cos(a), y = cy + R * Math.sin(a);
      const lx = cx + (R + r + 28) * Math.cos(a), ly = cy + (R + r + 28) * Math.sin(a);
      const c = Math.cos(a), anchor = Math.abs(c) < .2 ? 'middle' : (c > 0 ? 'start' : 'end');
      const on = (d.attive ?? d.raggi.map((_, k) => k)).includes(i);
      return `<line class="raggio" pathLength="1" style="animation-delay:${num(.45 + i * .16)}s"
                x1="${cx}" y1="${cy}" x2="${num(x)}" y2="${num(y)}"/>
        <g class="sat ${q.key ? 'key' : ''} ${on ? '' : 'off'}" style="animation-delay:${num(.75 + i * .16)}s">
          <circle cx="${num(x)}" cy="${num(y)}" r="${r}"/>
          <text class="lbl" x="${num(x)}" y="${num(y)}">${piano(q.t)}</text>
          ${q.d ? `<text class="sub" x="${num(lx)}" y="${num(ly)}" text-anchor="${anchor}"
             dominant-baseline="central">${piano(q.d)}</text>` : ''}
        </g>`;
    }).join('');
    const lungo = piano(d.centro).length > 9;
    return `<svg class="fig gfx" viewBox="0 0 ${W} ${H}">
      ${parti}
      <g class="hub"><circle cx="${cx}" cy="${cy}" r="104"/>
        <text x="${cx}" y="${cy}" style="font-size:${lungo ? 30 : 38}px">${piano(d.centro)}</text></g>
    </svg>`;
  },


  // Un indicatore verticale con una soglia: il valore sale fino a dove sta.
  misura: d => {
    const W = 520, H = 620, x = 200, y0 = 60, y1 = 560, lo = d.min, hi = d.max;
    const Y = v => y1 - (y1 - y0) * (v - lo) / (hi - lo);
    const peggio = d.direzione === 'alto-peggio';           // dove sta la zona a rischio
    const zonaTop = peggio ? y0 : Y(d.soglia), zonaBot = peggio ? Y(d.soglia) : y1;
    const tacche = [];
    for (let v = lo; v <= hi; v += (d.passo ?? Math.max(1, Math.round((hi - lo) / 6))))
      tacche.push(`<line x1="${x - 16}" y1="${num(Y(v))}" x2="${x}" y2="${num(Y(v))}" class="ass"/>
        <text class="sub" x="${x - 30}" y="${num(Y(v))}" text-anchor="end" dominant-baseline="middle">${v}</text>`);
    return `<div class="misura"><div class="gauge"><svg class="fig" viewBox="0 0 ${W} ${H}">
      <rect class="zona" x="${x}" y="${num(zonaTop)}" width="130" height="${num(zonaBot - zonaTop)}" fill="${DATI[3]}"/>
      <rect x="${x}" y="${y0}" width="130" height="${y1 - y0}" rx="8" fill="none" stroke="var(--linea)" stroke-width="5"/>
      ${tacche.join('')}
      <rect class="marcatore" x="${x + 14}" y="${num(Y(d.valore))}" width="102" height="${num(y1 - Y(d.valore))}"
        rx="6" fill="${d.valore <= d.soglia === peggio ? DATI[0] : DATI[3]}"/>
      <line class="soglia" x1="${x - 8}" y1="${num(Y(d.soglia))}" x2="${x + 150}" y2="${num(Y(d.soglia))}"/>
      <text class="cap" x="${x + 160}" y="${num(Y(d.soglia))}" dominant-baseline="middle" fill="var(--acc)">soglia ${d.soglia}</text>
      <text class="big lettura" x="${x + 160}" y="${num(Y(d.valore) + (Y(d.valore) < Y(d.soglia) - 60 ? 0 : 70))}"
        dominant-baseline="middle">${d.valore}</text>
    </svg></div>
    <div class="tx"><h2>${acc(d.titolo)}</h2>${d.sotto ? `<div class="sotto">${acc(d.sotto)}</div>` : ''}</div></div>`;
  },
};
