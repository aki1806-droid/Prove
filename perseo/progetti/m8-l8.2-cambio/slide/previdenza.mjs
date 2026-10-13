// Libreria grafica del corso «Perseo Sirio senza segreti»: le figure ricorrenti
// della previdenza, disegnate come meccanismi che si muovono, non come icone.
// Stesso sistema di figure.mjs: tratto tondo, ogni tratto con pathLength="1",
// tutto finito entro 2,8 s, l'orologio lo muove il generatore.
//
// Tutte le classi portano il prefisso «pv»: le classi corte del tema (.corpo,
// .tempo, .freccia…) sono gia' prese, e una collisione fa uscire il testo rosso
// o sparso senza che nessun controllo se ne accorga (MASTER, moduli 6-8).
//
// I corpi (ognuno ha un interruttore, `fase`, per accendersi in piu' tempi):
//   vignetta     una o due illustrazioni grandi, senza testo: prende il posto del b-roll
//   stipendio    la linea dello stipendio, gli ultimi anni, la pensione retributiva
//   squilibrio   contributi versati contro pensioni pagate, e la vita che si allunga
//   terzo        lo stipendio lordo, il terzo che diventa contributo, tu e l'ente
//   montante     il salvadanaio: gli anni che versano, la rivalutazione, il coefficiente
//   conto        una moltiplicazione scritta un segno per volta (esempio semplificato)
//   sistemi      la linea del tempo in scala dei tre gruppi: retributivo, misto, contributivo
//   divario      ultimo stipendio, prima pensione, il divario e la complementare
//   composto     la curva dell'interesse composto contro la retta dei versamenti
//   mossa        la mossa di oggi: un'illustrazione e i passi, che si accendono
//
// Grafica ricorrente del corso: `composto` (lezione 1.1) torna nei moduli 4-7.

let acc = s => String(s ?? '');
export const collega = fn => { acc = fn; };
const piano = s => String(s ?? '').replace(/\*\*(.+?)\*\*/g, '$1').replace(/\*(.+?)\*/g, '$1');
const n1 = v => (Math.round(v * 10) / 10).toString();
// Un cerchio in un path: l'idiomatico «a r r 0 1 1 0 .1» sposta il centro di un raggio.
const C = (cx, cy, r) => `M${cx} ${cy - r}a${r} ${r} 0 1 1 0 ${2 * r}a${r} ${r} 0 1 1 0 ${-2 * r}`;
const fmt = v => Math.round(v).toLocaleString('it-IT');

// Colori dei due sistemi: dalla serie validata di grafica.mjs (DATI), mai solo colore:
// ogni segmento porta il suo nome scritto.
const RETR = '#B07A12', CONTR = '#00633B', COMPL = '#3E6FA8';
const ROSSO = '#D70328', GRIGIO = '#9C968A', TENUE_V = '#E7EDEA';   // il terzo pilastro: grigio caldo (note di produzione)
const PERSONA = 'M12 3.2a3.9 3.9 0 1 0 0 7.8 3.9 3.9 0 0 0 0-7.8ZM4.5 21v-1.6A5.4 5.4 0 0 1 9.9 14h4.2a5.4 5.4 0 0 1 5.4 5.4V21';
const ICO = {
  palazzo: 'M3 9.5 12 4l9 5.5M4.5 9.5h15M6.5 11v7M10 11v7M14 11v7M17.5 11v7M3.5 20h17',
  stretta: 'M2 12l4-4 4 1.5 3-2 4 1.5 5 3.5M6 8l-2 9M18 10l2 7M9 14.5l2 2M11 13l2.5 2.5M13 12l2.5 2.5',
  salvadanaio: 'M4.5 13a7.5 5.8 0 1 0 15 0a7.5 5.8 0 1 0-15 0M10 7.8h4M8 18v2.5M16 18v2.5M19.5 11.5h2v3h-2M12 2.5v3',
};

// ---------- illustrazioni (griglia 240, tratto 6), entrano nella fabbrica di figure.mjs ----------
export const ILLU_PREV = {
  // 8.1: il lucchetto della tasca figurativa.
  lucchetto: [
    'M78 108V78a42 42 0 0 1 84 0v30', 'M54 108h132v108H54z',
    C(120, 150, 14), 'M120 164v26',
    'pieno:M54 108h132v108H54z',
  ],
  // 8.x: una moneta con il simbolo dell'euro.
  euro: [
    C(120, 120, 86), C(120, 120, 66),
    'M146 88a40 40 0 1 0 0 64', 'M82 110h52', 'M82 132h48',
    'pieno:M120 34a86 86 0 1 1 0 172a86 86 0 1 1 0-172z',
  ],
  armadietto: [
    'M58 22h124v204H58z', 'M120 22v204',
    'M74 44h30', 'M74 56h30', 'M74 68h30', 'M136 44h30', 'M136 56h30', 'M136 68h30',
    'M108 118v26', 'M132 118v26',
    C(178, 168, 13), 'M178 181v32', 'M178 196h10', 'M178 206h8',
    'pieno:M120 22h62v204h-62z',
  ],
  lettera: [
    'M64 104V34h112v70', 'M84 56h46', 'M84 72h72',
    'M30 96h180v118H30z', 'M30 96l90 66 90-66', 'M30 214l66-56', 'M210 214l-66-56',
    'M108 18c0-12 8-18 18-18',
    'pieno:M30 96h180v118H30z',
  ],
  domanda: [
    'M86 70c0-24 16-38 36-38s36 13 36 34c0 26-34 28-34 56v10',
    C(124, 186, 7),
    'pieno:' + C(124, 186, 7),
  ],
  generazioni: [
    C(78, 58, 24), 'M38 222v-74a40 40 0 0 1 80 0v74', 'M124 150l18 72',
    C(170, 98, 19), 'M140 222v-52a30 30 0 0 1 60 0v52',
    'pieno:M38 222v-74a40 40 0 0 1 80 0v74z',
  ],
  salvadanaio: [
    'M44 140a76 58 0 1 0 152 0a76 58 0 1 0-152 0', 'M104 90h34',
    'M82 192v24', 'M160 192v24', 'M196 124h16v30h-16', 'M76 98l-8-28 28 14',
    C(150, 124, 5),
    C(121, 44, 18), 'M121 36v16',
    'pieno:' + C(121, 44, 18),
  ],
  calendario: [
    'M42 58h156v150H42z', 'M42 98h156', 'M82 40v34', 'M158 40v34',
    'M74 130h18', 'M112 130h18', 'M150 130h18', 'M74 168h18', 'M112 168h18',
    'pieno:M150 162h22v16h-22z',
  ],
  schermo: [
    'M26 42h188v128H26z', 'M104 170l-8 34h48l-8-34', 'M76 204h88',
    'M50 72h76v70H50z', C(88, 96, 13), 'M66 136c4-14 40-14 44 0',
    'M146 82h46', 'M146 104h38', 'M146 126h30',
    'pieno:M50 72h76v70H50z',
  ],
  clessidra: [
    'M62 26h116', 'M62 214h116',
    'M76 26c0 66 88 60 88 94s-88 28-88 94', 'M164 26c0 66-88 60-88 94s88 28 88 94',
    'pieno:M92 206h56l-28-36z', 'pieno:M100 62h40l-20 34z',
  ],
  stelle: [
    'M150 34l12 34h36l-29 22 11 35-30-21-30 21 11-35-29-22h36z',
    'M30 196l42-34 34 30 40-46', C(30, 196, 7), C(72, 162, 7), C(106, 192, 7), C(146, 146, 7),
    'M186 176l20 30', C(206, 210, 6),
    'pieno:M150 34l12 34h36l-29 22 11 35-30-21-30 21 11-35-29-22h36z',
  ],
  pilastri: [
    'M24 70h192', 'M34 70l86-42 86 42',
    'M54 82v112', 'M74 82v112', 'M110 82v112', 'M130 82v112', 'M166 82v112', 'M186 82v112',
    'M24 206h192', 'M36 194h168',
    'pieno:M110 82h20v112h-20z',
  ],
  contratto: [
    'M60 22h96l34 34v168H60z', 'M156 22v34h34',
    'M82 78h74', 'M82 100h86', 'M82 122h66',
    'M84 186c10-18 18-18 22 0s14 16 26-6',
    C(166, 170, 22), 'M176 160a12 12 0 1 0 0 20', 'M152 167h16', 'M152 174h16',
    'pieno:' + C(166, 170, 22),
  ],
};

// ---------- CSS ----------
export const CSS_PREV = `
@keyframes pvDisegna{from{stroke-dashoffset:1.1}to{stroke-dashoffset:0}}
@keyframes pvAppari{from{opacity:0}to{opacity:1}}
@keyframes pvSali{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:none}}
@keyframes pvY{from{transform:scaleY(0)}to{transform:none}}
@keyframes pvX{from{transform:scaleX(0)}to{transform:none}}
@keyframes pvPop{0%{opacity:0;transform:scale(.4)}70%{opacity:1;transform:scale(1.08)}100%{opacity:1;transform:none}}
@keyframes pvCade{0%{opacity:0;transform:translate(0,0)}12%{opacity:1;transform:translate(0,0)}
  100%{opacity:1;transform:translate(var(--dx),var(--dy))}}
@keyframes pvPulsa{0%,100%{transform:none}50%{transform:scale(1.12)}}
@keyframes pvGira{from{transform:rotate(-70deg)}to{transform:rotate(55deg)}}
@keyframes pvPenna{from{transform:translateX(-500px)}to{transform:none}}
@keyframes pvGiraDa{from{transform:rotate(-90deg)}to{transform:none}}
@keyframes pvCursore{0%{transform:none}45%,60%{transform:translateX(150px)}100%{transform:translateX(60px)}}
@keyframes pvGira{from{transform:rotate(-60deg)}to{transform:rotate(var(--a))}}
@keyframes pvGiraX{from{transform:rotate(-60deg)}to{transform:rotate(-60deg)}}
@keyframes pvScorri{from{transform:none}to{transform:translateX(var(--dx))}}
@keyframes pvScende{from{transform:none}to{transform:translateY(var(--dy))}}
@keyframes pvStacca{from{transform:none}to{transform:translate(610px,60px)}}
@keyframes pvScala{from{transform:none}to{transform:translate(var(--dx),var(--dy))}}
@keyframes pvSposta{from{transform:none}to{transform:translate(var(--dx),var(--dy))}}
@keyframes pvDeposita{from{transform:scaleY(0);opacity:0}to{transform:none;opacity:1}}
@keyframes pvLife{0%{transform:scaleX(1)}35%{transform:scaleX(1)}100%{transform:scaleX(.2)}}
@keyframes pvInclina{from{transform:none}to{transform:rotate(6deg)}}
@keyframes pvSuB{from{transform:none}to{transform:translateY(-46px)}}
@keyframes pvGiuB{from{transform:none}to{transform:translateY(46px)}}
@keyframes pvBrilla{0%,100%{opacity:0}40%{opacity:.9}}

.pv{display:block;width:100%;height:auto;overflow:visible}
.pv text{font-family:'Open Sans',sans-serif;fill:var(--fg)}
.pv .tr{fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:1 2;stroke-dashoffset:1.1;
        animation:pvDisegna 1.1s cubic-bezier(.4,0,.2,1) both}
.pv .asse{stroke:var(--fg);stroke-opacity:.35;stroke-width:3;fill:none}
.pv .rif{stroke:var(--fg);stroke-opacity:.45;stroke-width:3;stroke-dasharray:10 10;fill:none}
.pv .et{font-size:30px;font-weight:600;fill:var(--tit)}
.pv .et.c{text-anchor:middle}.pv .et.e{text-anchor:end}
.pv .pic{font-size:25px;font-weight:500;fill:var(--fg);fill-opacity:.72}
.pv .pic.c{text-anchor:middle}.pv .pic.e{text-anchor:end}
.pv .acc{fill:var(--acc)}
.pv .big{font-size:58px;font-weight:700;font-stretch:75%;fill:var(--tit)}
.pv .big.c{text-anchor:middle}
.pv .comp{animation:pvAppari .5s ease-out both}
.pv .y{transform-box:fill-box;transform-origin:center bottom;animation:pvY .9s cubic-bezier(.3,.8,.3,1) both}
.pv .x{transform-box:fill-box;transform-origin:left center;animation:pvX .9s cubic-bezier(.3,.8,.3,1) both}
.pv .pop{transform-box:fill-box;transform-origin:center;animation:pvPop .5s cubic-bezier(.22,.7,.3,1) both}
.pv .sali{animation:pvSali .55s cubic-bezier(.22,.7,.3,1) both}
.pv .off{opacity:.22}
.pv .nota{font-size:24px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;fill:var(--fg);fill-opacity:.55}

/* --- vignetta: il posto del b-roll, solo disegno --- */
.pvVign{display:flex;justify-content:center;align-items:center;gap:120px;min-height:700px}
.pvVign .illu{width:620px;height:620px}
.pvVign.n2 .illu{width:520px;height:520px}
.corpo>.pvVign{animation:none}

/* --- terzo: la barra dello stipendio --- */
.pv .lordo{fill:var(--tit);fill-opacity:.12;stroke:var(--tit);stroke-width:4}
.pv .taglio{fill:var(--acc);fill-opacity:.18;stroke:var(--acc);stroke-width:4}

/* --- montante --- */
.pv .vaso{fill:var(--bg);stroke:var(--tit);stroke-width:6}
.pv .moneta{fill:#F6E7B8;stroke:${RETR};stroke-width:4}
.pv .moneta.c{fill:color-mix(in srgb,${CONTR} 18%,var(--bg));stroke:${CONTR}}
.pv .cade{animation:pvCade .9s cubic-bezier(.5,0,.7,1) both}
.pv .crescita{fill:var(--acc);fill-opacity:.85}
.pv .brilla{fill:#fff;animation:pvBrilla 1.2s ease-in-out both}
.pv .imbuto{fill:color-mix(in srgb,var(--tit) 10%,var(--bg));stroke:var(--tit);stroke-width:6}

/* --- sistemi --- */
.pv .seg{transform-box:fill-box;transform-origin:left center;animation:pvX .9s cubic-bezier(.3,.8,.3,1) both}
.pv .segtx{font-size:27px;font-weight:700;fill:#fff}
.pv .riga .lb{font-size:30px;font-weight:600;fill:var(--tit)}
.pv .riga.key .lb{fill:var(--acc)}
.pv .riga.key .fondo{fill:var(--acc);fill-opacity:.07;stroke:var(--acc);stroke-width:3}
.pv .anno{font-size:30px;font-weight:700;font-stretch:75%;text-anchor:middle;fill:var(--tit)}

/* --- divario --- */
.pv .col{transform-box:fill-box;transform-origin:center bottom;animation:pvY 1s cubic-bezier(.3,.8,.3,1) both}
.pv .tratt{fill:color-mix(in srgb,${COMPL} 16%,var(--bg));stroke:${COMPL};stroke-width:5;stroke-dasharray:16 10}
.pv .gap{fill:var(--acc);fill-opacity:.07;stroke:var(--acc);stroke-width:4;stroke-dasharray:14 10}

/* --- composto --- */
.pv .retta{stroke:var(--fg);stroke-opacity:.7;stroke-width:6}
.pv .curva{stroke:var(--tit);stroke-width:8}
.pv .curva2{stroke:${COMPL};stroke-width:7}
.pv .area{fill:var(--acc);fill-opacity:.13;animation:pvAppari .8s ease-out both}
.pv .punto{fill:var(--bg);stroke-width:6}
.pv .orologio{transform-box:fill-box;transform-origin:center;animation:pvPop .5s both,pvPulsa 1s ease-in-out 2 1.3s}

/* --- conto --- */
.pvConto{display:flex;flex-direction:column;align-items:center;gap:56px}
.pvConto .riga{display:flex;align-items:baseline;gap:44px}
.pvConto .v{font-size:150px;font-weight:700;font-stretch:75%;color:var(--tit);line-height:1;
            letter-spacing:-.01em;font-variant-numeric:lining-nums tabular-nums;
            animation:pvSali .55s cubic-bezier(.22,.7,.3,1) both}
.pvConto .v.ris{color:var(--acc)}
.pvConto .op{font-size:110px;font-weight:300;color:var(--fg);opacity:.5;animation:pvAppari .4s both}
.pvConto .lb{font-size:30px;font-weight:600;letter-spacing:.06em;color:var(--fg);opacity:.7;text-align:center;margin-top:14px}
.pvConto .cella{display:flex;flex-direction:column;align-items:center}
.pvConto .es{font-size:24px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:var(--fg);opacity:.55;
             animation:pvAppari .5s both 1.9s}
.corpo>.pvConto{animation:none}

/* --- esempio semplificato, sotto le figure numeriche --- */
.pvEs{font-size:24px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;opacity:.55;text-align:right}

/* --- mossa --- */
.pvMossa{display:flex;align-items:center;gap:80px}
.pvMossa .ill{flex:0 0 470px}
.pvMossa .ill .illu{width:470px;height:470px}
.pvMossa .tx{flex:1;display:flex;flex-direction:column;gap:34px}
.pvMossa h2{font-size:66px;line-height:1.12;animation:pvSali .55s both .3s}
.pvMossa ol{list-style:none;display:flex;flex-direction:column;gap:22px}
.pvMossa li{display:flex;gap:26px;align-items:baseline;font-size:40px;line-height:1.25;opacity:.24;
            animation:pvSali .5s cubic-bezier(.22,.7,.3,1) both}
.pvMossa li.on{opacity:1}
.pvMossa li .n{flex:0 0 54px;height:54px;border-radius:50%;background:var(--tit);color:var(--bg);
               font-size:28px;font-weight:700;display:flex;align-items:center;justify-content:center;
               transform:translateY(-4px)}
.pvMossa li.key .n{background:var(--acc)}
.pvMossa li:nth-child(1){animation-delay:.5s}.pvMossa li:nth-child(2){animation-delay:.65s}
.pvMossa li:nth-child(3){animation-delay:.8s}.pvMossa li:nth-child(4){animation-delay:.95s}
.corpo>.pvMossa{animation:none}
.corpo>svg.pv,.corpo>.pvBox{animation:none}
.pvBox{display:flex;flex-direction:column;gap:14px}
@keyframes pvOscilla{0%,100%{transform:rotate(0)}25%{transform:rotate(-3.5deg)}75%{transform:rotate(3.5deg)}}
.pv .pvOscilla{transform-box:view-box;transform-origin:828px 600px;animation:pvOscilla 1.4s ease-in-out .9s 2 both}
/* il memo sul verde: la frase grande al centro (note di produzione: «frase grande, entra lentamente») */
.slide.scuro .corpo>.frase{font-size:104px;line-height:1.18;text-align:center;font-weight:300;
  animation:entra 1.1s cubic-bezier(.22,.7,.3,1) both .2s}
/* le tre cose da ricordare: in questo corso il memo e' la slide piu' letta, va grande */
.memo{gap:40px}.memo .v{font-size:58px;gap:40px}.memo .v .n{font-size:40px;flex:0 0 70px}
`;

// ---------- i corpi ----------
let illustrazione = () => '';
export const usaIllustrazioni = fn => { illustrazione = fn; };

// Un elemento con il ritardo E un suo stile avrebbe due attributi style, e il
// browser tiene solo il primo: le colonne sono uscite nere (1.1, s08). Qui i
// due si fondono in uno, su ogni tag, prima che la stringa arrivi al browser.
const unisciStili = h => h.replace(/<[^<>]+>/g, tag => {
  const st = [...tag.matchAll(/\sstyle="([^"]*)"/g)].map(m => m[1].replace(/;?\s*$/, ''));
  if (st.length < 2) return tag;
  let primo = true;
  return tag.replace(/\sstyle="[^"]*"/g, () => primo ? (primo = false, ` style="${st.join(';')}"`) : '');
});
const svg = (W, H, dentro) => unisciStili(
  `<svg class="pv" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">${dentro}</svg>`);
const ritardo = s => `style="animation-delay:${n1(s)}s"`;

export const CORPI_PREV = {

  vignetta: d => `<div class="pvVign ${d.illu.length > 1 ? 'n2' : ''}">${
      d.illu.map(n => illustrazione(n)).join('')}</div>`,

  // La linea dello stipendio che sale; fase 1: gli ultimi anni; fase 2: la pensione.
  stipendio: d => {
    const fase = d.fase ?? 1;
    const Y = [520, 506, 492, 474, 456, 436, 410, 380, 336, 262];
    const x0 = 110, w = 96, base = 610;
    let p = `M${x0} ${Y[0]}`;
    Y.forEach((y, i) => { if (i) p += `V${y}`; p += `h${w}`; });
    const xf = x0 + Y.length * w;                     // fine della carriera
    const top = Y.at(-1), pens = base - (base - top) * .8;
    const colX = 1300, colW = 190;
    return svg(1656, 680, `
      <path class="asse" d="M${x0} ${base}H${xf + 30}M${x0} ${base}V150"/>
      <text class="pic" x="${x0}" y="${base + 44}">inizio carriera</text>
      <text class="pic e" x="${xf}" y="${base + 44}">fine</text>
      <text class="pic" x="${x0 + 16}" y="140">stipendio</text>
      <path class="tr" pathLength="1" d="${p}" style="stroke:var(--tit);stroke-width:9;animation-delay:.2s"/>
      ${fase >= 1 ? `<g class="comp" ${ritardo(1.35)}>
        <rect x="${xf - 3 * w}" y="${top - 46}" width="${3 * w}" height="${base - top + 46}" rx="14"
              style="fill:var(--acc);fill-opacity:.1;stroke:var(--acc);stroke-width:4;stroke-dasharray:12 9"/>
        <text class="et c" x="${xf - 1.5 * w}" y="${top - 64}" style="fill:var(--acc)">ultimi anni</text></g>` : ''}
      ${fase >= 2 ? `
        <path class="rif comp" ${ritardo(1.7)} d="M${xf} ${top}H${colX + colW + 30}"/>
        <path class="tr" pathLength="1" d="M${xf + 26} ${(top + base) / 2}C${xf + 90} ${(top + base) / 2} ${colX - 90} ${(top + base) / 2} ${colX - 24} ${(top + base) / 2}"
              style="stroke:var(--acc);stroke-width:7;animation-delay:1.8s"/>
        <path class="comp" ${ritardo(2.4)} d="M${colX - 46} ${(top + base) / 2 - 16}l24 16-24 16" style="fill:none;stroke:var(--acc);stroke-width:7;stroke-linecap:round;stroke-linejoin:round"/>
        <rect class="col" ${ritardo(2.0)} x="${colX}" y="${pens}" width="${colW}" height="${base - pens}" rx="12"
              style="fill:${RETR};fill-opacity:.85"/>
        <text class="big c comp" ${ritardo(2.5)} x="${colX + colW / 2}" y="${pens + 80}" style="fill:#fff">≈ 80%</text>
        <text class="et c comp" ${ritardo(2.5)} x="${colX + colW / 2}" y="${base + 44}">pensione</text>
        <text class="pic e comp" ${ritardo(2.0)} x="${colX + colW + 30}" y="${top - 16}">ultimo stipendio</text>` : ''}
    `);
  },

  // Versati contro pagati: la colonna dei pagati cresce ancora con la vita media.
  squilibrio: d => {
    const base = 600, xA = 330, xB = 900, w = 300;
    const hA = 250, hB = 380, extra = 120;
    return svg(1656, 680, `
      <path class="asse" d="M200 ${base}H1460"/>
      <rect class="col" ${ritardo(.2)} x="${xA}" y="${base - hA}" width="${w}" height="${hA}" rx="12" style="fill:${CONTR};fill-opacity:.85"/>
      <text class="et c" x="${xA + w / 2}" y="${base + 46}">contributi versati</text>
      <rect class="col" ${ritardo(.55)} x="${xB}" y="${base - hB}" width="${w}" height="${hB}" rx="12" style="fill:${RETR};fill-opacity:.85"/>
      <rect class="col" ${ritardo(1.5)} x="${xB}" y="${base - hB - extra}" width="${w}" height="${extra + 14}" rx="12"
            style="fill:var(--acc);fill-opacity:.22;stroke:var(--acc);stroke-width:4;stroke-dasharray:12 9"/>
      <text class="et c" x="${xB + w / 2}" y="${base + 46}">pensioni pagate</text>
      <text class="et comp" ${ritardo(2.1)} x="${xB + w + 40}" y="${base - hB - extra / 2 + 10}" style="fill:var(--acc)">+ anni di vita</text>
      <path class="rif comp" ${ritardo(1.0)} d="M${xA} ${base - hA}H${xB + w}"/>
      <text class="pic comp" ${ritardo(1.1)} x="${xA + w + 30}" y="${base - hA - 16}">quanto si è versato</text>
    `);
  },

  // Lo stipendio lordo: un terzo diventa contributo, e il terzo si divide fra te e l'ente.
  terzo: d => {
    const x = 120, W = 1416, y = 120, h = 120, t = W / 3;
    const tu = t * .27;                         // 8,8 su 33: la quota del lavoratore pubblico
    return svg(1656, 640, `
      <rect class="lordo x" ${ritardo(.15)} x="${x}" y="${y}" width="${W}" height="${h}" rx="14"/>
      <text class="et" x="${x + 30}" y="${y + h / 2 + 11}">stipendio lordo</text>
      <rect class="taglio comp" ${ritardo(.9)} x="${x + W - t}" y="${y}" width="${t}" height="${h}" rx="14"/>
      <text class="et c comp" ${ritardo(1.0)} x="${x + W - t / 2}" y="${y - 22}" style="fill:var(--acc)">circa un terzo</text>
      <path class="tr" pathLength="1" d="M${x + W - t / 2} ${y + h + 10}V${y + h + 120}" style="stroke:var(--acc);stroke-width:6;animation-delay:1.25s"/>
      <g class="sali" ${ritardo(1.6)}>
        <rect x="${x + W - t}" y="${y + h + 140}" width="${tu}" height="${h}" rx="14" style="fill:${CONTR};fill-opacity:.35;stroke:${CONTR};stroke-width:4"/>
        <rect x="${x + W - t + tu + 12}" y="${y + h + 140}" width="${t - tu - 12}" height="${h}" rx="14" style="fill:${CONTR};fill-opacity:.85"/>
        <text class="et c" x="${x + W - t + tu / 2}" y="${y + 2 * h + 140 + 46}">tu</text>
        <text class="et c" x="${x + W - t + tu + (t - tu) / 2}" y="${y + 2 * h + 140 + 46}">l'ente</text>
        <text class="et e" x="${x + W - t - 40}" y="${y + h + 140 + h / 2 + 11}">contributo</text>
      </g>
    `);
  },

  // Il salvadanaio del montante. fase: 'accumulo' | 'rivaluta' | 'coefficiente'.
  montante: d => {
    const fase = d.fase ?? 'accumulo';
    const vx = fase === 'coefficiente' ? 150 : 640, vy = 200, vw = 380, vh = 400, N = 8;
    const mon = k => ({ x: vx + 40, y: vy + vh - 26 - (k + 1) * 34, w: vw - 80, h: 28 });
    const vaso = `<path class="vaso" d="M${vx} ${vy}v${vh - 30}a30 30 0 0 0 30 30h${vw - 60}a30 30 0 0 0 30-30V${vy}"/>
      <text class="et c" x="${vx + vw / 2}" y="${vy + vh + 50}">${d.etichetta ?? 'montante'}</text>`;
    let dentro = '';
    if (fase === 'accumulo') {
      // otto anni: un calendario per anno, ognuno lascia cadere la sua moneta
      const passo = 170, cx0 = 828 - (N - 1) * passo / 2;
      for (let k = 0; k < N; k++) {
        const cx = cx0 + k * passo, m = mon(k), t = .35 + k * .24;
        dentro += `<g class="pop" ${ritardo(t - .2)}>
            <rect x="${cx - 34}" y="28" width="68" height="62" rx="8" style="fill:var(--bg);stroke:var(--tit);stroke-width:4"/>
            <path d="M${cx - 34} 46h68" style="stroke:var(--tit);stroke-width:4"/>
            <text class="pic c" x="${cx}" y="80" style="font-size:22px;font-weight:700;fill:var(--tit)">${k + 1}</text></g>
          <rect class="moneta c cade" x="${cx - m.w / 2}" y="104" width="${m.w}" height="${m.h}" rx="14"
            style="--dx:${n1(m.x + m.w / 2 - cx)}px;--dy:${n1(m.y - 104)}px;animation-delay:${n1(t)}s"/>`;
      }
      dentro += `<text class="pic e comp" ${ritardo(.2)} x="${cx0 - 60}" y="68">un anno di lavoro</text>`;
    } else {
      for (let k = 0; k < N; k++) {
        const m = mon(k);
        dentro += `<rect class="moneta c" x="${m.x}" y="${m.y}" width="${m.w}" height="${m.h}" rx="14"/>`;
      }
    }
    let fuori = '';
    if (fase === 'rivaluta') {
      for (let k = 0; k < N; k++) {
        const m = mon(k);
        dentro += `<rect class="crescita x" ${ritardo(.5 + k * .1)} x="${m.x + m.w - 6}" y="${m.y + 6}" width="${16 + k * 3}" height="${m.h - 12}" rx="5"/>`;
      }
      const top = mon(N - 1).y;
      fuori = `<path class="tr" pathLength="1" d="M${vx + vw + 90} ${vy + vh - 20}V${top + 10}" style="stroke:var(--acc);stroke-width:8;animation-delay:.6s"/>
        <path class="comp" ${ritardo(1.5)} d="M${vx + vw + 66} ${top + 36}l24-28 24 28" style="fill:none;stroke:var(--acc);stroke-width:8;stroke-linecap:round;stroke-linejoin:round"/>
        <text class="et comp" ${ritardo(1.6)} x="${vx + vw + 140}" y="${top + 40}" style="fill:var(--acc)">${d.rivtit ?? '+ rivalutazione'}</text>
        <text class="pic comp" ${ritardo(1.9)} x="${vx + vw + 140}" y="${top + 82}">${(d.riv ?? ['legata al PIL,'])[0]}</text>
        <text class="pic comp" ${ritardo(1.9)} x="${vx + vw + 140}" y="${top + 116}">${(d.riv ?? [0,'media di cinque anni'])[1]}</text>`;
    }
    if (fase === 'coefficiente') {
      const fx = 760, fy = 250;
      fuori = `
        <path class="tr" pathLength="1" d="M${vx + vw + 30} ${vy + vh / 2}H${fx - 20}" style="stroke:var(--tit);stroke-width:7;animation-delay:.3s"/>
        <path class="comp" ${ritardo(.9)} d="M${fx - 44} ${vy + vh / 2 - 22}l22 22-22 22" style="fill:none;stroke:var(--tit);stroke-width:7;stroke-linecap:round;stroke-linejoin:round"/>
        <path class="imbuto pop" ${ritardo(.7)} d="M${fx} ${fy}h300l-110 150v90h-80v-90z"/>
        <text class="et c comp" ${ritardo(.9)} x="${fx + 150}" y="${fy - 30}">× coefficiente</text>
        <text class="pic c comp" ${ritardo(1.1)} x="${fx + 150}" y="${fy + 290}">dipende dall'età</text>
        <g class="sali" ${ritardo(1.4)}>
          ${Array.from({ length: 12 }, (_, i) => `<rect class="moneta c" x="${1110 + (i % 6) * 82}" y="${fy + (i < 6 ? 30 : 92)}" width="66" height="44" rx="10"/>`).join('')}
          <text class="et" x="1110" y="${fy - 30}">pensione, ogni mese</text>
        </g>
        <g class="sali" ${ritardo(2.0)}>
          <path class="asse" d="M1110 ${fy + 330}H1580"/>
          <rect x="1150" y="${fy + 330 - 70}" width="130" height="70" rx="8" style="fill:${CONTR};fill-opacity:.4"/>
          <rect x="1390" y="${fy + 330 - 120}" width="130" height="120" rx="8" style="fill:${CONTR};fill-opacity:.85"/>
          <text class="pic c" x="1215" y="${fy + 370}">esci prima</text>
          <text class="pic c" x="1455" y="${fy + 370}">esci dopo</text>
        </g>`;
    }
    return svg(1656, 680, vaso + dentro + fuori);
  },

  // Una moltiplicazione scritta un segno per volta. voci: [{v, lb}], op: ['×','≈']
  conto: d => `<div class="pvConto"><div class="riga">${d.voci.map((v, i) =>
      `${i ? `<span class="op" ${ritardo(.35 + i * .5)}>${d.op[i - 1]}</span>` : ''}
       <div class="cella"><span class="v ${i === d.voci.length - 1 ? 'ris' : ''}" ${ritardo(.15 + i * .5)}>${v.v}</span>
       <span class="lb" style="animation:pvAppari .4s both ${n1(.4 + i * .5)}s">${acc(v.lb)}</span></div>`).join('')}</div>
      <div class="es">Esempio semplificato</div></div>`,

  // La linea del tempo in scala, tre righe: chi sta in quale sistema.
  sistemi: d => {
    const A0 = 1975, A1 = 2030, X0 = 560, X1 = 1600;
    const X = a => X0 + (a - A0) / (A1 - A0) * (X1 - X0);
    const H = 92, G = 46, y0 = 120;
    const att = d.attive ?? d.righe.map((_, i) => i);
    let s = '';
    d.righe.forEach((r, i) => {
      const y = y0 + i * (H + G), on = att.includes(i);
      s += `<g class="riga ${r.key ? 'key' : ''} ${on ? '' : 'off'}">
        ${r.key ? `<rect class="fondo" x="10" y="${y - 16}" width="1636" height="${H + 32}" rx="16"/>` : ''}
        <foreignObject x="30" y="${y}" width="${X0 - 70}" height="${H}">
          <div xmlns="http://www.w3.org/1999/xhtml" style="height:100%;display:flex;align-items:center;font-family:'Open Sans',sans-serif;font-size:29px;line-height:1.2;font-weight:600;color:${r.key ? 'var(--acc)' : 'var(--tit)'}">${acc(r.t)}</div></foreignObject>
        ${r.seg.map(([tipo, a, b], k) => {
          const w = X(b) - X(a), col = tipo === 'retr' ? RETR : CONTR;
          const nome = tipo === 'retr' ? 'retributivo' : 'contributivo';
          return `<rect class="seg" ${ritardo(.3 + i * .35 + k * .45)} x="${n1(X(a))}" y="${y + 14}" width="${n1(w)}" height="${H - 28}" rx="10" style="fill:${col}"/>
            ${w > 180 ? `<text class="segtx comp" ${ritardo(.7 + i * .35 + k * .45)} x="${n1(X(a) + 18)}" y="${y + H / 2 + 10}">${nome}</text>` : ''}`;
        }).join('')}</g>`;
    });
    const yb = y0 + d.righe.length * (H + G) - G + 30;
    const tacche = (d.tacche ?? []).map(a => `
      <path class="rif" d="M${n1(X(a + .5))} ${y0 - 30}V${yb}"/>
      <text class="anno" x="${n1(X(a + .5))}" y="${yb + 44}">${a}</text>`).join('');
    return svg(1656, yb + 70, `<path class="asse" d="M${X0} ${yb}H${X1}"/>${tacche}${s}`);
  },

  // Ultimo stipendio, prima pensione, il divario, la complementare.
  // fase: 'retributivo' | 'contributivo' | 'divario' | 'complementare'
  divario: d => {
    const fase = d.fase ?? 'contributivo';
    const base = 600, hS = 470, w = 280, xS = 300, xP = 840;
    const hP = fase === 'retributivo' ? hS * .8 : hS * .55;
    const hC = hS * .3;
    const colP = fase === 'retributivo' ? RETR : 'var(--acc)';
    const gap = fase === 'divario' || fase === 'complementare';
    return svg(1656, 690, `
      <path class="asse" d="M200 ${base}H1480"/>
      <path class="rif comp" ${ritardo(.9)} d="M${xS} ${base - hS}H${xP + w + 170}"/>
      <rect class="col" ${ritardo(.15)} x="${xS}" y="${base - hS}" width="${w}" height="${hS}" rx="12" style="fill:${CONTR};fill-opacity:.9"/>
      <text class="et c" x="${xS + w / 2}" y="${base + 46}">ultimo stipendio</text>
      <rect class="col" ${ritardo(.45)} x="${xP}" y="${base - hP}" width="${w}" height="${hP}" rx="12" style="fill:${colP};fill-opacity:.85"/>
      <text class="et c" x="${xP + w / 2}" y="${base + 46}">prima pensione</text>
      ${fase === 'retributivo' ? `<text class="pic c comp" ${ritardo(1.2)} x="${xP + w / 2}" y="${base + 84}">nel retributivo</text>` : ''}
      ${fase === 'contributivo' ? `<text class="pic c comp" ${ritardo(1.2)} x="${xP + w / 2}" y="${base + 84}">nel contributivo</text>` : ''}
      ${!gap ? `<path class="tr" pathLength="1" d="M${xP + w + 60} ${base - hP}V${base}" style="stroke:var(--tit);stroke-width:5;animation-delay:1.2s"/>
        <text class="et comp" ${ritardo(1.6)} x="${xP + w + 90}" y="${base - hP / 2}">tasso di</text>
        <text class="et comp" ${ritardo(1.6)} x="${xP + w + 90}" y="${base - hP / 2 + 40}">sostituzione</text>` : ''}
      ${gap ? `<rect class="gap comp" ${ritardo(1.0)} x="${xP}" y="${base - hS}" width="${w}" height="${hS - hP}" rx="12"/>
        <text class="big comp" ${ritardo(1.4)} x="${xP + w + 50}" y="${fase === 'complementare' ? base - hS + 44 : base - hS + (hS - hP) / 2 + 20}" style="fill:var(--acc)">divario</text>` : ''}
      ${fase === 'complementare' ? `<rect class="col tratt" ${ritardo(1.9)} x="${xP + 10}" y="${base - hP - hC}" width="${w - 20}" height="${hC}" rx="12"/>
        <text class="et comp" ${ritardo(2.3)} x="${xP + w + 50}" y="${base - hP - hC / 2}" style="fill:${COMPL}">pensione</text>
        <text class="et comp" ${ritardo(2.3)} x="${xP + w + 50}" y="${base - hP - hC / 2 + 40}" style="fill:${COMPL}">complementare</text>` : ''}
    `);
  },

  // La curva dell'interesse composto. fase: 'linee' | 'area' | 'trenta' | 'quindici'
  composto: d => {
    const fase = d.fase ?? 'linee';
    const T = 30, r = .03 / 12, rata = 100;
    const fv = (mesi) => rata * ((1 + r) ** mesi - 1) / r;
    const X0 = 170, X1 = 1440, Yb = 590, Yt = 70, MAX = 62000;
    const X = t => X0 + t / T * (X1 - X0), Y = v => Yb - v / MAX * (Yb - Yt);
    const retta = `M${X(0)} ${Y(0)}L${X(T)} ${n1(Y(rata * 12 * T))}`;
    let cur = `M${X(0)} ${Y(0)}`;
    for (let t = .5; t <= T; t += .5) cur += `L${n1(X(t))} ${n1(Y(fv(t * 12)))}`;
    let area = `M${X(0)} ${Y(0)}`;
    for (let t = .5; t <= T; t += .5) area += `L${n1(X(t))} ${n1(Y(fv(t * 12)))}`;
    for (let t = T; t >= 0; t -= .5) area += `L${n1(X(t))} ${n1(Y(rata * 12 * t))}`;
    let cur15 = `M${X(15)} ${Y(0)}`;
    for (let t = 15.5; t <= T; t += .5) cur15 += `L${n1(X(t))} ${n1(Y(fv((t - 15) * 12)))}`;
    const fin = fv(T * 12), fin15 = fv(15 * 12);
    const tick = [0, 10, 20, 30].map(t => `<path class="asse" d="M${X(t)} ${Yb}v14"/>
      <text class="pic c" x="${X(t)}" y="${Yb + 50}">${t === 0 ? 'oggi' : t + ' anni'}</text>`).join('');
    const sec = fase === 'quindici';
    if (fase === 'fisco') {
      // 5.2: stesso rendimento lordo (4%), tassato al 20% nel Fondo e al 26% fuori.
      const ra = .04 * .8 / 12, rb = .04 * .74 / 12;
      const fa = m => rata * ((1 + ra) ** m - 1) / ra, fb = m => rata * ((1 + rb) ** m - 1) / rb;
      const M2 = 72000, Y2 = v => Yb - v / M2 * (Yb - Yt);
      let ca = `M${X(0)} ${Y2(0)}`, cb = ca, ar = ca;
      for (let t = .5; t <= T; t += .5) { ca += `L${n1(X(t))} ${n1(Y2(fa(t * 12)))}`; cb += `L${n1(X(t))} ${n1(Y2(fb(t * 12)))}`; ar += `L${n1(X(t))} ${n1(Y2(fa(t * 12)))}`; }
      for (let t = T; t >= 0; t -= .5) ar += `L${n1(X(t))} ${n1(Y2(fb(t * 12)))}`;
      return svg(1656, 680, `
        <path class="asse" d="M${X0} ${Yb}H${X1 + 40}M${X0} ${Yb}V${Yt - 20}"/>${tick}
        <path class="area" ${ritardo(1.6)} d="${ar}Z"/>
        <path class="tr curva" pathLength="1" d="${ca}" style="animation-delay:.3s;animation-duration:1.6s"/>
        <path class="tr" pathLength="1" d="${cb}" style="stroke:var(--fg);stroke-opacity:.7;stroke-width:7;stroke-dasharray:1 2;animation-delay:.3s;animation-duration:1.6s"/>
        <text class="et e comp" ${ritardo(1.6)} x="${X(T) - 20}" y="${n1(Y2(fa(T * 12)) - 30)}">rendimenti tassati al 20%</text>
        <text class="et comp" ${ritardo(1.8)} x="${X(19)}" y="${n1(Y2(fb(19 * 12)) + 70)}" style="fill:var(--fg)">tassati al 26%</text>
        <text class="et comp" ${ritardo(2.2)} x="${X(3)}" y="${n1(Y2(45000))}" style="fill:var(--acc)">dopo 30 anni: ≈ 2.400 € in più</text>
        <path class="rif comp" ${ritardo(2.2)} d="M${X(15)} ${n1(Y2(45000) + 12)}L${X(26)} ${n1(Y2((fa(26 * 12) + fb(26 * 12)) / 2))}" style="stroke:var(--acc);stroke-opacity:.8"/>
        <text class="nota comp" ${ritardo(.5)} x="${X0 + 30}" y="${Yt + 10}">Esempio illustrativo · 100 € al mese, rendimento lordo 4%</text>`);
    }
    if (fase === 'costi') {
      const r2 = .018 / 12, fv2 = m => rata * ((1 + r2) ** m - 1) / r2;
      let bassa = `M${X(0)} ${Y(0)}`, area2 = `M${X(0)} ${Y(0)}`;
      for (let t = .5; t <= T; t += .5) { bassa += `L${n1(X(t))} ${n1(Y(fv2(t * 12)))}`; area2 += `L${n1(X(t))} ${n1(Y(fv(t * 12)))}`; }
      for (let t = T; t >= 0; t -= .5) area2 += `L${n1(X(t))} ${n1(Y(fv2(t * 12)))}`;
      return svg(1656, 680, `
        <path class="asse" d="M${X0} ${Yb}H${X1 + 40}M${X0} ${Yb}V${Yt - 20}"/>${tick}
        <path class="area" ${ritardo(1.4)} d="${area2}Z"/>
        <path class="tr curva" pathLength="1" d="${cur}" style="animation-delay:.2s;animation-duration:1.4s"/>
        <path class="tr" pathLength="1" d="${bassa}" style="stroke:var(--fg);stroke-opacity:.7;stroke-width:7;stroke-dasharray:1 2;animation-delay:.6s;animation-duration:1.4s"/>
        <text class="et e comp" ${ritardo(1.4)} x="${X(T) - 20}" y="${n1(Y(fin) - 30)}">senza costi</text>
        <text class="et comp" ${ritardo(1.6)} x="${X(21)}" y="${n1(Y(fv2(21 * 12)) + 60)}" style="fill:var(--fg)">con costi più alti</text>
        <text class="et comp" ${ritardo(2.0)} x="${X(4)}" y="${n1(Y(40000))}" style="fill:var(--acc)">quello che si mangiano i costi</text>
        <path class="rif comp" ${ritardo(2.0)} d="M${X(14)} ${n1(Y(40000) + 12)}L${X(25)} ${n1(Y((fv(25 * 12) + fv2(25 * 12)) / 2))}" style="stroke:var(--acc);stroke-opacity:.8"/>
        <text class="nota comp" ${ritardo(.5)} x="${X0 + 30}" y="${Yt + 10}">Esempio illustrativo</text>`);
    }
    return svg(1656, 680, `
      <path class="asse" d="M${X0} ${Yb}H${X1 + 40}M${X0} ${Yb}V${Yt - 20}"/>${tick}
      ${fase !== 'linee' ? `<path class="area" ${ritardo(sec ? 0 : .9)} d="${area}Z"/>` : ''}
      <path class="tr retta" pathLength="1" d="${retta}" style="animation-delay:.15s"/>
      <path class="tr curva" pathLength="1" d="${cur}" style="animation-delay:.35s;animation-duration:1.5s"/>
      <text class="pic e comp" ${ritardo(1.3)} x="${X(T) - 10}" y="${n1(Y(rata * 12 * T) + 50)}">versamenti</text>
      <text class="et e comp" ${ritardo(1.6)} x="${X(T) - 20}" y="${n1(Y(fin) - 30)}">versamenti + rendimenti</text>
      ${fase === 'area' ? `<path class="rif comp" ${ritardo(1.6)} d="M${X(13)} ${n1(Y(40000) + 12)}L${X(24)} ${n1(Y((fv(24 * 12) + 28800) / 2))}" style="stroke:var(--acc);stroke-opacity:.8"/>
        <text class="et comp" ${ritardo(1.6)} x="${X(4)}" y="${n1(Y(40000))}" style="fill:var(--acc)">interesse composto</text>
        <g class="orologio" ${ritardo(1.2)}><path d="${C(1560, 110, 46)}M1560 82v28l18 12" style="fill:var(--bg);stroke:var(--acc);stroke-width:7;stroke-linecap:round"/></g>` : ''}
      ${fase === 'trenta' || sec ? `
        <circle class="punto pop" ${ritardo(sec ? 0 : 1.8)} cx="${X(T)}" cy="${n1(Y(fin))}" r="13" style="stroke:var(--tit)"/>
        <circle class="punto pop" ${ritardo(sec ? 0 : 2.0)} cx="${X(T)}" cy="${n1(Y(rata * 12 * T))}" r="13" style="stroke:var(--fg)"/>
        <text class="big comp" ${ritardo(sec ? 0 : 2.0)} x="${X(T) + 34}" y="${n1(Y(fin) + 18)}">≈ ${fmt(Math.round(fin / 1000) * 1000)} €</text>
        <text class="et comp" ${ritardo(sec ? 0 : 2.2)} x="${X(T) + 34}" y="${n1(Y(rata * 12 * T) + 12)}" style="fill:var(--fg)">${fmt(rata * 12 * T)} €</text>` : ''}
      ${sec ? `
        <path class="tr curva2" pathLength="1" d="${cur15}" style="animation-delay:.4s"/>
        <circle class="punto pop" ${ritardo(1.4)} cx="${X(T)}" cy="${n1(Y(fin15))}" r="13" style="stroke:${COMPL}"/>
        <text class="big comp" ${ritardo(1.6)} x="${X(T) + 34}" y="${n1(Y(fin15) + 18)}" style="fill:${COMPL}">≈ ${fmt(Math.round(fin15 / 1000) * 1000)} €</text>
        <text class="et e comp" ${ritardo(1.3)} x="${X(15) - 18}" y="${n1(Y(0) - 22)}" style="fill:${COMPL}">se inizi 15 anni dopo</text>` : ''}
      ${fase === 'trenta' || sec ? `<text class="nota comp" ${ritardo(.5)} x="${X0 + 30}" y="${Yt + 10}">Esempio semplificato · 100 € al mese · 3% l'anno</text>` : ''}
    `);
  },

  // La mossa di oggi: un'illustrazione e i passi che si accendono.
  mossa: d => `<div class="pvMossa"><div class="ill">${illustrazione(d.illu)}</div>
      <div class="tx"><h2>${acc(d.titolo)}</h2><ol>${d.passi.map((p, i) =>
        `<li class="${(d.attive ?? d.passi.map((_, k) => k)).includes(i) ? 'on' : ''} ${p.key ? 'key' : ''}">
          <span class="n">${i + 1}</span><span>${acc(p.t)}</span></li>`).join('')}</ol></div></div>`,
  // I tre pilastri: l'architrave «la tua vita da pensionato» su tre colonne di
  // larghezza diversa. Grafica ricorrente del corso (lezione 1.2).
  //   attive  quali colonne sono accese; key: la colonna in evidenza
  //   targa   indice della colonna che porta la targa «Perseo Sirio»
  //   uno     una casa su un solo pilastro, che oscilla (l'apertura della 1.2)
  pilastri: d => {
    const base = 600, top = 190, H = base - top;
    if (d.uno) return svg(1656, 680, `
      <g class="pvOscilla">
        <rect x="528" y="${top - 74}" width="600" height="64" rx="10" style="fill:var(--tit)"/>
        <text class="et c" x="828" y="${top - 30}" style="fill:#fff">la tua vita da pensionato</text>
        <rect class="col" ${ritardo(.15)} x="728" y="${top - 10}" width="200" height="${H + 10}" rx="8" style="fill:${CONTR};fill-opacity:.9"/>
      </g>
      <path class="asse" d="M380 ${base}H1276"/>`);
    const col = d.colonne ?? [
      { t: 'Pubblica', sub: 'INPS', w: 330, c: CONTR, ico: ICO.palazzo },
      { t: 'Complementare', sub: 'fondo del contratto', w: 240, c: ROSSO, ico: ICO.stretta },
      { t: 'Personale', sub: 'risparmio tuo', w: 160, c: GRIGIO, ico: ICO.salvadanaio },
    ];
    const att = d.attive ?? col.map((_, i) => i);
    const gap = 150, tot = col.reduce((a, c) => a + c.w, 0) + gap * (col.length - 1);
    let x = (1656 - tot) / 2, g = '';
    col.forEach((c, i) => {
      const on = att.includes(i), cx = x + c.w / 2, r = .2 + i * .35;
      const spento = d.targa != null && d.targa !== i;
      g += `<g class="${on ? '' : 'off'}" style="${spento ? 'opacity:.3' : ''}">
        <rect class="col" ${ritardo(r)} x="${n1(x)}" y="${top}" width="${c.w}" height="${H}" rx="8" style="fill:${c.c};fill-opacity:.9"/>
        <path class="comp" ${ritardo(r + .5)} d="${c.ico}" transform="translate(${n1(cx - 30)} ${base - 90}) scale(2.5)" style="fill:none;stroke:#fff;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round"/>
        <text class="et c comp" ${ritardo(r + .4)} x="${n1(cx)}" y="${base + 46}">${c.t}</text>
        <text class="pic c comp" ${ritardo(r + .5)} x="${n1(cx)}" y="${base + 82}">${c.sub}</text>
        ${(d.chiave ?? []).includes(i) ? `<rect class="comp" ${ritardo(1.4)} x="${n1(x - 12)}" y="${top - 12}" width="${c.w + 24}" height="${H + 24}" rx="14" style="fill:none;stroke:var(--acc);stroke-width:5;stroke-dasharray:14 10"/>` : ''}
        ${d.targa === i ? `<g class="pop" ${ritardo(1.4)}><rect x="${n1(cx - 150)}" y="${top + 60}" width="300" height="74" rx="12" style="fill:#fff;stroke:var(--tit);stroke-width:4"/>
          <text class="et c" x="${n1(cx)}" y="${top + 108}">Perseo Sirio</text></g>` : ''}
      </g>`;
      x += c.w + gap;
    });
    const x0 = (1656 - tot) / 2;
    return svg(1656, 700, `
      <rect class="comp" ${ritardo(1.2)} x="${n1(x0 - 40)}" y="${top - 74}" width="${n1(tot + 80)}" height="64" rx="10" style="fill:var(--tit)"/>
      <text class="et c comp" ${ritardo(1.3)} x="828" y="${top - 30}" style="fill:#fff">la tua vita da pensionato</text>
      <path class="asse" d="M${n1(x0 - 80)} ${base}H${n1(x0 + tot + 80)}"/>${g}`);
  },

  // La ripartizione: chi lavora oggi paga chi e' in pensione oggi.
  // gruppi: [{n, t}] da sinistra a destra; le frecce vanno da ciascun gruppo al successivo.
  ripartizione: d => {
    const gr = d.gruppi, W = 1656, passo = W / gr.length;
    let s = '';
    gr.forEach((g, i) => {
      const cx = passo * (i + .5), n = g.n, dx = 86, x0 = cx - (Math.min(n, 4) - 1) * dx / 2;
      for (let k = 0; k < n; k++) {
        const riga = Math.floor(k / 4), x = x0 + (k % 4) * dx + (riga ? dx / 2 : 0), y = 250 + riga * 140;
        // La posizione sta sul <g>: un'animazione CSS con transform sul path
        // cancellerebbe l'attributo transform, e la figura finirebbe in 0,0 (1.2, s09).
        s += `<g transform="translate(${n1(x - 36)} ${y}) scale(3)"><path class="pop" ${ritardo(.2 + i * .4 + k * .06)} d="${PERSONA}"
          style="fill:none;stroke:${g.c ?? 'var(--tit)'};stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round"/></g>`;
      }
      s += `<text class="et c comp" ${ritardo(.5 + i * .4)} x="${n1(cx)}" y="560">${g.t}</text>`;
      if (g.sub) s += `<text class="pic c comp" ${ritardo(.6 + i * .4)} x="${n1(cx)}" y="598">${g.sub}</text>`;
      if (i < gr.length - 1) {
        const a = cx + 200, b = passo * (i + 1.5) - 200, t = 1.2 + i * .4;
        s += `<path class="tr" pathLength="1" d="M${n1(a)} 330H${n1(b)}" style="stroke:var(--acc);stroke-width:8;animation-delay:${n1(t)}s"/>
          <path class="comp" ${ritardo(t + .6)} d="M${n1(b - 22)} 308l22 22-22 22" style="fill:none;stroke:var(--acc);stroke-width:8;stroke-linecap:round;stroke-linejoin:round"/>
          ${d.etichetta ? `<text class="pic c comp" ${ritardo(t + .4)} x="${n1((a + b) / 2)}" y="300" style="fill:var(--acc)">${d.etichetta}</text>` : ''}`;
      }
    });
    return svg(W, 640, s);
  },

  // Le fonti che alimentano una pensione: a sinistra una sola, a destra tre.
  // fase: 'una' | 'tre' | 'cresce'
  fonti: d => {
    const fase = d.fase ?? 'tre';
    const pannello = (cx, fonti, alto, rit) => {
      const vx = cx - 150, vy = 300, vw = 300, vh = 290;
      let s = `<path class="vaso" d="M${vx} ${vy}v${vh - 26}a26 26 0 0 0 26 26h${vw - 52}a26 26 0 0 0 26-26V${vy}"/>`;
      const liv = Math.min(alto, vh - 30);
      s += `<rect class="y" ${ritardo(rit + 1.1)} x="${vx + 22}" y="${vy + vh - 18 - liv}" width="${vw - 44}" height="${liv}" rx="12" style="fill:${CONTR};fill-opacity:.35"/>`;
      fonti.forEach((f, i) => {
        const fx = cx + (i - (fonti.length - 1) / 2) * 190;
        s += `<g class="pop" ${ritardo(rit + i * .2)}><rect x="${n1(fx - 80)}" y="40" width="160" height="70" rx="35" style="fill:${f.c};fill-opacity:.9"/>
          <text class="et c" x="${n1(fx)}" y="86" style="fill:#fff">${f.t}</text></g>
          <path class="tr" pathLength="1" d="M${n1(fx)} 120C${n1(fx)} 200 ${cx} 210 ${cx} ${vy - 14}" style="stroke:${f.c};stroke-width:7;animation-delay:${n1(rit + .4 + i * .2)}s"/>`;
      });
      return s;
    };
    const sx = pannello(380, [{ t: '50 € tuoi', c: GRIGIO }], 70, .1);
    const dx = fase === 'una' ? '' : pannello(1180, [{ t: 'tu', c: CONTR }, { t: 'ente', c: ROSSO }, { t: 'TFR', c: COMPL }], fase === 'cresce' ? 250 : 170, .5);
    return svg(1656, 680, `${sx}<text class="et c" x="380" y="650">terzo pilastro</text>
      ${fase === 'una' ? '' : `${dx}<text class="et c comp" ${ritardo(.6)} x="1180" y="650">fondo del contratto</text>`}
      ${fase === 'cresce' ? `<path class="tr" pathLength="1" d="M1370 560V330" style="stroke:var(--acc);stroke-width:8;animation-delay:1.6s"/>
        <path class="comp" ${ritardo(2.2)} d="M1348 352l22-24 22 24" style="fill:none;stroke:var(--acc);stroke-width:8;stroke-linecap:round;stroke-linejoin:round"/>
        <text class="et comp" ${ritardo(2.2)} x="1400" y="440" style="fill:var(--acc)">+ rendimenti</text>` : ''}`);
  },
  // Tre porte con l'insegna: le tre famiglie. `aperta`: la porta che si apre e
  // lascia uscire la luce; `attive`: le porte accese (le altre attenuate).
  porte: d => {
    const nomi = d.nomi ?? ['Fondo negoziale', 'Fondo aperto', 'PIP'];
    const att = d.attive ?? nomi.map((_, i) => i);
    const W = 300, H = 400, gap = 150, x0 = (1656 - 3 * W - 2 * gap) / 2, y0 = 190;
    let g = '';
    nomi.forEach((n, i) => {
      const x = x0 + i * (W + gap), on = att.includes(i), ap = d.aperta === i, r = .2 + i * .3;
      g += `<g class="${on ? '' : 'off'}">
        <g class="pop" ${ritardo(r)}><rect x="${x - 10}" y="${y0 - 92}" width="${W + 20}" height="64" rx="10" style="fill:var(--tit)"/>
        <text class="et c" x="${x + W / 2}" y="${y0 - 49}" style="fill:#fff">${n}</text></g>
        ${ap ? `<path class="comp" ${ritardo(1.2)} d="M${x} ${y0 + H}L${x - 120} ${y0 + H + 60}H${x + W + 120}L${x + W} ${y0 + H}Z" style="fill:#F6E7B8;opacity:.7"/>
          <rect class="comp" ${ritardo(1.0)} x="${x}" y="${y0}" width="${W}" height="${H}" style="fill:#F6E7B8"/>` : ''}
        <rect class="y" ${ritardo(r + .1)} x="${x}" y="${y0}" width="${W}" height="${H}" rx="6" style="fill:none;stroke:var(--tit);stroke-width:8"/>
        ${ap ? `<path class="comp" ${ritardo(1.0)} d="M${x} ${y0}L${x + 90} ${y0 + 30}V${y0 + H - 30}L${x} ${y0 + H}Z" style="fill:${CONTR};fill-opacity:.9"/>`
             : `<rect class="y" ${ritardo(r + .2)} x="${x + 14}" y="${y0 + 14}" width="${W - 28}" height="${H - 14}" rx="4" style="fill:${CONTR};fill-opacity:.85"/>
                <circle class="comp" ${ritardo(r + .6)} cx="${x + W - 50}" cy="${y0 + H / 2 + 20}" r="12" style="fill:#fff"/>`}
      </g>`;
    });
    return svg(1656, 680, `<path class="asse" d="M${x0 - 60} ${y0 + H}H${x0 + 3 * W + 2 * gap + 60}"/>${g}`);
  },

  // 8.2: il ponte fra due enti di Perseo Sirio. La posizione attraversa il
  // ponte e resta intatta. nomi: i due enti; fase 'ponte' | 'arrivo' (spunta).
  ponte: d => {
    const N = d.nomi ?? ['Azienda sanitaria A', 'Comune B'];
    const ed = (x, r) => `<g class="comp" ${ritardo(r)}>
        <path d="M${x} 300L${x + 190} 200L${x + 380} 300" style="fill:none;stroke:var(--tit);stroke-width:8;stroke-linejoin:round"/>
        <rect x="${x + 20}" y="300" width="340" height="300" rx="6" style="fill:color-mix(in srgb,var(--tit) 6%,var(--bg));stroke:var(--tit);stroke-width:8"/>
        ${[0, 1, 2].map(c => [0, 1].map(rr => `<rect x="${x + 60 + c * 100}" y="${340 + rr * 90}" width="60" height="56" rx="6" style="fill:none;stroke:var(--tit);stroke-width:5"/>`).join('')).join('')}
        <rect x="${x + 150}" y="520" width="80" height="80" rx="6" style="fill:var(--tit)"/>
        <rect x="${x + 70}" y="230" width="240" height="50" rx="10" style="fill:var(--acc)"/>
        <text class="et c" x="${x + 190}" y="264" style="fill:#fff;font-size:28px">Perseo Sirio</text></g>
        <text class="et c comp" ${ritardo(r + .2)} x="${x + 190}" y="660" style="font-size:36px">${N[x < 800 ? 0 : 1]}</text>`;
    let s = ed(140, .1) + ed(1136, .4);
    s += `<path class="tr" pathLength="1" d="M500 560Q828 380 1156 560" style="stroke:var(--tit);stroke-width:10;animation-delay:.8s"/>
      <path class="tr" pathLength="1" d="M500 600Q828 420 1156 600" style="stroke:var(--tit);stroke-width:6;stroke-opacity:.5;animation-delay:1s"/>
      ${[0, 1, 2, 3, 4].map(i => { const t = (i + 1) / 6, x = 500 + 656 * t, y1 = (1 - t) ** 2 * 560 + 2 * (1 - t) * t * 380 + t * t * 560; return `<path class="comp" ${ritardo(1.2)} d="M${x} ${y1}V${y1 + 40}" style="stroke:var(--tit);stroke-width:5;stroke-opacity:.6"/>`; }).join('')}
      <g class="pop" ${ritardo(1.6)}><circle cx="828" cy="404" r="74" style="fill:color-mix(in srgb,${CONTR} 22%,var(--bg));stroke:${CONTR};stroke-width:6"/>
        <text class="et c" x="828" y="396" style="font-size:24px">la tua</text><text class="et c" x="828" y="426" style="font-size:24px">posizione</text></g>`;
    if (d.fase === 'arrivo') s += `<g class="pop" ${ritardo(2.1)}><circle cx="1470" cy="190" r="44" style="fill:var(--acc)"/>
        <path d="M1450 190l14 15 28-30" style="fill:none;stroke:#fff;stroke-width:9;stroke-linecap:round;stroke-linejoin:round"/></g>`;
    return svg(1656, 690, s);
  },

  // Il bivio del lavoratore pubblico: a sinistra il fondo del contratto, con
  // tre fonti; a destra un fondo aperto o un PIP, dove versi da solo.
  bivio: d => {
    const cx = 828, by = 610;
    const chip = (x, y, t, c, r) => `<g class="pop" ${ritardo(r)}><rect x="${x - 72}" y="${y - 32}" width="144" height="64" rx="32" style="fill:${c};fill-opacity:.92"/>
      <text class="et c" x="${x}" y="${y + 11}" style="fill:#fff">${t}</text></g>`;
    const sx = [chip(250, 250, 'tu', CONTR, 1.2), chip(420, 250, 'ente', ROSSO, 1.4), chip(590, 250, 'TFR', COMPL, 1.6)];
    if (d.evidenzia === 'tfr') sx[2] = `<g>${sx[2]}<rect class="comp" ${ritardo(1.9)} x="508" y="208" width="164" height="84" rx="42" style="fill:none;stroke:var(--acc);stroke-width:5;stroke-dasharray:12 8"/></g>`;
    return svg(1656, 690, `
      <g transform="translate(${cx - 45} ${by - 10}) scale(3.8)"><path class="pop" ${ritardo(.1)} d="${PERSONA}" style="fill:none;stroke:var(--tit);stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round"/></g>
      <path class="tr" pathLength="1" d="M${cx} ${by - 20}C${cx} 420 600 420 420 330" style="stroke:var(--tit);stroke-width:12;animation-delay:.4s"/>
      <path class="tr" pathLength="1" d="M${cx} ${by - 20}C${cx} 420 1060 420 1236 330" style="stroke:var(--fg);stroke-opacity:.5;stroke-width:12;animation-delay:.6s"/>
      <text class="et c comp" ${ritardo(.9)} x="420" y="140">Fondo negoziale</text>
      <text class="pic c comp" ${ritardo(1.0)} x="420" y="176">del tuo contratto</text>
      ${sx.join('')}
      <text class="et c comp" ${ritardo(1.0)} x="1236" y="140" style="fill:var(--fg)">Fondo aperto o PIP</text>
      <text class="pic c comp" ${ritardo(1.1)} x="1236" y="176">scelto da te</text>
      ${chip(1236, 250, 'solo tu', GRIGIO, 1.5)}`);
  },
  // La nascita del Fondo, sulla linea del tempo in scala: Perseo (1999), Sirio
  // (2007), la fusione (2014). fase: 'perseo' | 'sirio' | 'fusione'
  nascita: d => {
    const fase = d.fase ?? 'fusione';
    const A0 = 1996, A1 = 2026, X0 = 140, X1 = 1520, X = a => X0 + (a - A0) / (A1 - A0) * (X1 - X0);
    const y = 470, sir = fase !== 'perseo', fus = fase === 'fusione';
    const tacca = (a, r) => `<g class="comp" ${ritardo(r)}><path d="M${n1(X(a))} ${y - 16}v32" style="stroke:var(--tit);stroke-width:5"/>
      <text class="anno" x="${n1(X(a))}" y="${y + 64}">${a}</text></g>`;
    const cerchio = (cx, cy, R, t, c, r, cls = 'pop') => `<g class="${cls}" ${ritardo(r)}><circle cx="${n1(cx)}" cy="${cy}" r="${R}" style="fill:${c};fill-opacity:.9"/>
      <text class="et c" x="${n1(cx)}" y="${cy + 11}" style="fill:#fff">${t}</text></g>`;
    return svg(1656, 640, `
      <path class="tr" pathLength="1" d="M${X0} ${y}H${X1}" style="stroke:var(--fg);stroke-opacity:.35;stroke-width:5;animation-delay:.1s"/>
      ${tacca(1999, .3)}
      <path class="tr" pathLength="1" d="M${n1(X(1999))} ${y}V${y - 120}" style="stroke:${CONTR};stroke-width:5;animation-delay:.4s"/>
      ${fus ? '' : cerchio(X(1999), y - 200, 82, 'Perseo', CONTR, .6)}
      ${fus ? '' : `<text class="pic c comp" ${ritardo(.9)} x="${n1(X(1999))}" y="${y - 310}">regioni, enti locali, sanità</text>`}
      ${sir ? tacca(2007, .9) + `<path class="tr" pathLength="1" d="M${n1(X(2007))} ${y}V${y - 120}" style="stroke:${COMPL};stroke-width:5;animation-delay:1s"/>`
            + (fus ? '' : cerchio(X(2007), y - 200, 82, 'Sirio', COMPL, 1.2) + `<text class="pic c comp" ${ritardo(1.4)} x="${n1(X(2007))}" y="${y - 310}">ministeri, enti centrali</text>`) : ''}
      ${fus ? tacca(2014, 1.4) + `
        <path class="tr" pathLength="1" d="M${n1(X(1999))} ${y - 120}C${n1(X(1999))} ${y - 220} ${n1(X(2014) - 120)} ${y - 220} ${n1(X(2014) - 96)} ${y - 210}" style="stroke:${CONTR};stroke-width:5;animation-delay:1.1s"/>
        <path class="tr" pathLength="1" d="M${n1(X(2007))} ${y - 120}C${n1(X(2007))} ${y - 190} ${n1(X(2014) - 120)} ${y - 190} ${n1(X(2014) - 96)} ${y - 200}" style="stroke:${COMPL};stroke-width:5;animation-delay:1.2s"/>
        <path class="tr" pathLength="1" d="M${n1(X(2014))} ${y}V${y - 110}" style="stroke:var(--tit);stroke-width:6;animation-delay:1.5s"/>
        ${cerchio(X(2014), y - 210, 108, 'Perseo Sirio', 'var(--tit)', 1.8)}` : ''}`);
  },

  // La carta d'identita' del Fondo: righe chiave-valore che si accendono.
  carta: d => {
    const att = d.attive ?? d.righe.map((_, i) => i);
    const x = 300, y = 70, W = 1056, rh = 92, H = 150 + d.righe.length * rh;
    let r = '';
    d.righe.forEach(([k, v], i) => {
      const yy = y + 150 + i * rh, on = att.includes(i);
      // L'attenuazione sta su un <g> esterno: l'animazione d'ingresso finisce a
      // opacita' 1 e vincerebbe sulla classe .off (MASTER: «forwards vince»).
      r += `<g class="${on ? '' : 'off'}"><g class="sali" ${ritardo(.5 + i * .18)}>
        <text class="pic" x="${x + 270}" y="${yy + 40}" style="font-size:27px;font-weight:600;letter-spacing:.08em;text-transform:uppercase">${k}</text>
        <text class="et" x="${x + 590}" y="${yy + 42}" style="font-size:36px">${v}</text>
        ${i < d.righe.length - 1 ? `<path d="M${x + 270} ${yy + 70}H${x + W - 50}" style="stroke:var(--linea);stroke-width:3"/>` : ''}</g></g>`;
    });
    return svg(1656, H + 110, `
      <rect class="pop" ${ritardo(.1)} x="${x}" y="${y}" width="${W}" height="${H}" rx="26" style="fill:#fff;stroke:var(--tit);stroke-width:5"/>
      <rect class="comp" ${ritardo(.3)} x="${x}" y="${y}" width="${W}" height="96" rx="26" style="fill:var(--tit)"/>
      <rect class="comp" ${ritardo(.3)} x="${x}" y="${y + 60}" width="${W}" height="36" style="fill:var(--tit)"/>
      <text class="et comp" ${ritardo(.4)} x="${x + 50}" y="${y + 62}" style="fill:#fff;letter-spacing:.14em">CARTA D'IDENTITÀ</text>
      <g class="comp" ${ritardo(.4)}><circle cx="${x + 140}" cy="${y + 260}" r="90" style="fill:${TENUE_V};stroke:var(--tit);stroke-width:4"/>
        <path d="M${x + 140} ${y + 200}l14 40h42l-34 26 13 41-35-25-35 25 13-41-34-26h42z" style="fill:var(--tit)"/></g>
      ${r}`);
  },

  // La piramide paritetica: Assemblea (60), Consiglio, Presidente e Vice.
  // livelli: quanti livelli mostrare dal basso; meta: la linea che divide a meta'.
  paritetica: d => {
    const liv = d.livelli ?? 3, meta = d.meta ?? true;
    const L = [
      { t: 'Assemblea dei delegati', sub: '60: 30 eletti dai lavoratori, 30 dalle amministrazioni', w: 1240, y: 470 },
      { t: 'Consiglio di amministrazione', w: 860, y: 330 },
      { t: 'Presidente e Vicepresidente', w: 520, y: 190 },
    ];
    let g = '';
    L.slice(0, liv).forEach((l, i) => {
      const x = 828 - l.w / 2, h = 110, r = .2 + i * .4;
      g += `<g class="pop" ${ritardo(r)}>
        <rect x="${x}" y="${l.y}" width="${l.w / 2}" height="${h}" style="fill:${CONTR};fill-opacity:.88"/>
        <rect x="828" y="${l.y}" width="${l.w / 2}" height="${h}" style="fill:${ROSSO};fill-opacity:.85"/>
        <text class="et c" x="828" y="${l.y + (l.sub ? 48 : 66)}" style="fill:#fff;font-size:34px">${l.t}</text>
        ${l.sub ? `<text class="pic c" x="828" y="${l.y + 88}" style="fill:#fff;fill-opacity:.9">${l.sub}</text>` : ''}</g>`;
    });
    // la linea sta dietro i blocchi: si vede negli spazi e non taglia le scritte
    return svg(1656, 680, `${meta ? `<path class="tr" pathLength="1" d="M828 150V600" style="stroke:${CONTR};stroke-width:6;animation-delay:1.4s"/>` : ''}${g}
      ${meta ? `
        <text class="et e comp" ${ritardo(1.8)} x="${828 - 650}" y="640" style="fill:${CONTR}">metà lavoratori</text>
        <text class="et comp" ${ritardo(1.8)} x="${828 + 650 - 260}" y="640" style="fill:${ROSSO}">metà amministrazioni</text>` : ''}`);
  },

  // Chi tiene i soldi: chi decide, chi investe, chi custodisce. Tre edifici
  // separati; la moneta passa dal Fondo ai gestori e finisce nella cassaforte.
  custodia: d => {
    const fase = d.fase ?? 'tutti';
    const E = [
      { t: 'Perseo Sirio', sub: 'decide', x: 300, ico: 'M-40 30h80M-30 30V-10M-10 30V-10M10 30V-10M30 30V-10M-45 -10h90L0 -45z' },
      { t: 'Gestori', sub: 'investono', x: 828, ico: 'M-45 35h90M-40 25l25-30 20 15 35-45M15 -35h20v20' },
      { t: 'Depositario', sub: 'custodisce e verifica', x: 1356, ico: 'M-45 -40h90v80h-90zM0 0m-18 0a18 18 0 1 0 36 0a18 18 0 1 0-36 0M0 -18v8M28 -40v80' },
    ];
    const n = fase === 'gestori' ? 2 : 3;
    let g = '';
    E.slice(0, n).forEach((e, i) => {
      const r = .2 + i * .4;
      g += `<g class="pop" ${ritardo(r)}>
        <rect x="${e.x - 150}" y="200" width="300" height="250" rx="18" style="fill:#fff;stroke:var(--tit);stroke-width:5"/>
        <path d="${e.ico}" transform="translate(${e.x} 300) scale(1.4)" style="fill:none;stroke:var(--tit);stroke-width:4;stroke-linecap:round;stroke-linejoin:round"/>
        <text class="et c" x="${e.x}" y="410">${e.t}</text></g>
        <text class="pic c comp" ${ritardo(r + .3)} x="${e.x}" y="500">${e.sub}</text>`;
    });
    g += `<path class="tr" pathLength="1" d="M460 325H660" style="stroke:var(--acc);stroke-width:7;animation-delay:.9s"/>
      <path class="comp" ${ritardo(1.4)} d="M640 305l22 20-22 20" style="fill:none;stroke:var(--acc);stroke-width:7;stroke-linecap:round;stroke-linejoin:round"/>
      <text class="pic c comp" ${ritardo(1.2)} x="560" y="300" style="fill:var(--acc)">mandato</text>`;
    if (n === 3) g += `<path class="tr" pathLength="1" d="M988 325H1188" style="stroke:var(--acc);stroke-width:7;animation-delay:1.5s"/>
      <path class="comp" ${ritardo(2)} d="M1168 305l22 20-22 20" style="fill:none;stroke:var(--acc);stroke-width:7;stroke-linecap:round;stroke-linejoin:round"/>
      <text class="pic c comp" ${ritardo(1.8)} x="1088" y="300" style="fill:var(--acc)">titoli in custodia</text>`;
    g += `<g class="comp" ${ritardo(1.6)}><rect x="${828 - 380}" y="560" width="${n === 3 ? 1290 : 760}" height="64" rx="32" style="fill:${TENUE_V}"/>
      <text class="et" x="${828 - 350}" y="603">${d.nota ?? 'gestori e depositario selezionati con gara'}</text></g>`;
    return svg(1656, 660, g);
  },

  // I controlli: il cerchio interno (sindaci, rischi, revisione) e quello
  // esterno, la COVIP. fase: 'interno' | 'esterno'
  // ---------- Modulo 2: TFS e TFR. Grafiche ricorrenti del corso ----------

  // La linea del 2000: a sinistra TFS (ocra), a destra TFR (verde), la tacca
  // sul 31 dicembre 2000. fase: 'linea' | 'persone' | 'termine' (anche il
  // tempo determinato, sempre TFR). sopra: [{t,s},{t,s}] cambia le etichette
  // delle due figure; icona: 'persona' | 'salvadanaio'.
  linea2000: d => {
    const fase = d.fase ?? 'persone', y = 440, X0 = 110, X1 = 1546, xm = 828;
    const sopra = d.sopra ?? [{ t: 'assunto entro il 2000', s: 'TFS' }, { t: 'assunto dal 2001', s: 'TFR' }];
    const ico = d.icona === 'salvadanaio' ? ICO.salvadanaio : PERSONA;
    const fig = (cx, i, col, r) => !sopra[i].s ? '' : `<g class="sali" ${ritardo(r)}>
        <g transform="translate(${cx - 84} ${y - 410}) scale(7)"><path d="${ico}" style="fill:none;stroke:${col};stroke-width:1.4;stroke-linecap:round;stroke-linejoin:round"/></g>
        <text class="et c" x="${cx}" y="${y - 150}" style="font-size:38px">${acc(sopra[i].t)}</text>
        <text class="big c" x="${cx}" y="${y - 62}" style="fill:${col};font-size:76px">${acc(sopra[i].s)}</text></g>`;
    return svg(1656, fase === 'termine' ? 700 : 600, `
      <path class="tr" pathLength="1" d="M${X0} ${y}H${xm - 8}" style="stroke:${RETR};stroke-width:22;animation-delay:.15s"/>
      <path class="tr" pathLength="1" d="M${xm + 8} ${y}H${X1}" style="stroke:${CONTR};stroke-width:22;animation-delay:1.3s"/>
      <g class="pop" ${ritardo(1.0)}><rect x="${xm - 9}" y="${y - 70}" width="18" height="140" rx="9" style="fill:var(--acc)"/></g>
      <text class="et c comp" ${ritardo(1.0)} x="${xm}" y="${y + 126}" style="fill:var(--acc);font-size:38px">31 dicembre 2000</text>
      <text class="pic comp" ${ritardo(.5)} x="${X0}" y="${y + 70}" style="font-size:32px">prima</text>
      <text class="pic e comp" ${ritardo(1.6)} x="${X1}" y="${y + 70}" style="font-size:32px">dopo</text>
      ${fase !== 'linea' ? fig(470, 0, RETR, .6) + fig(1186, 1, CONTR, 1.7) : ''}
      ${fase === 'termine' ? `<g class="sali" ${ritardo(2.1)}>
        <rect x="${X0}" y="${y + 170}" width="${X1 - X0}" height="80" rx="40" style="fill:${CONTR};fill-opacity:.12;stroke:${CONTR};stroke-width:4;stroke-dasharray:14 10"/>
        <text class="et c" x="${xm}" y="${y + 223}" style="fill:${CONTR};font-size:36px">tempo determinato: sempre TFR, prima e dopo</text></g>` : ''}`);
  },

  // Due carriere a scalini: quella che sale alla fine e quella piatta. Sull'ultimo
  // gradino la base del TFS; la riga tratteggiata e' la media di carriera.
  scalini: d => {
    const P = [{ t: 'Carriera che sale alla fine', h: [1, 1.04, 1.08, 1.12, 1.16, 1.2, 1.55, 1.9], x: 80 },
               { t: 'Carriera piatta', h: [1, 1.03, 1.06, 1.09, 1.12, 1.15, 1.18, 1.21], x: 900 }];
    const base = 600, k = 420, w = 84, z = .75, Y = h => n1(base - (h - z) * k);
    let s = '';
    P.forEach((p, j) => {
      let path = `M${p.x} ${base}V${Y(p.h[0])}`;
      p.h.forEach((h, i) => { if (i) path += `V${Y(h)}`; path += `h${w}`; });
      path += `V${base}`;
      const media = p.h.reduce((a, b) => a + b) / p.h.length, xl = p.x + (p.h.length - 1) * w;
      s += `<path class="asse" d="M${p.x - 10} ${base}H${p.x + p.h.length * w + 20}"/>
        <text class="et" x="${p.x}" y="${base + 62}" style="font-size:36px">${p.t}</text>
        <path class="comp" ${ritardo(.2 + j * .3)} d="${path}Z" style="fill:${CONTR};fill-opacity:.12"/>
        <path class="tr" pathLength="1" d="${path}" style="stroke:var(--tit);stroke-width:9;stroke-linejoin:round;animation-delay:${.2 + j * .3}s"/>
        <path class="rif comp" ${ritardo(1.6)} d="M${p.x} ${Y(media)}H${xl + w}"/>
        <text class="pic comp" ${ritardo(1.7)} x="${p.x + 10}" y="${n1(+Y(media) - 16)}" style="font-size:30px">media</text>
        <g class="pop" ${ritardo(1.2 + j * .2)}><rect x="${xl}" y="${n1(+Y(p.h.at(-1)) - 12)}" width="${w}" height="24" rx="12" style="fill:var(--acc)"/></g>`;
      if (j === 0) s += `<text class="et e comp" ${ritardo(1.4)} x="${xl + w}" y="${n1(+Y(p.h.at(-1)) - 40)}" style="fill:var(--acc);font-size:36px">base del TFS</text>`;
    });
    return svg(1656, 690, s);
  },

  // Il barattolo del TFR anno per anno: quote gia' accumulate, rivalutazione
  // dell'anno, nuova quota. Esempio semplificato: 2.073 euro l'anno al 3%.
  strati: d => {
    const N = 10, q = 2073, r = .03, X0 = 170, base = 560, H = 440, bw = 92, gap = 40;
    let accu = 0; const B = [];
    for (let t = 0; t < N; t++) { const riv = accu * r; B.push({ acc: accu, riv, q }); accu = accu + riv + q; }
    const max = accu * 1.04, Y = v => v / max * H;
    let s = `<path class="asse" d="M${X0 - 20} ${base}H${X0 + N * (bw + gap)}"/>`;
    B.forEach((b, i) => {
      const x = X0 + i * (bw + gap), t = .15 + i * .14;
      const ha = Y(b.acc), hr = Math.max(Y(b.riv), b.riv ? 4 : 0), hq = Y(b.q);
      s += `<g class="col" ${ritardo(t)}>
        ${ha ? `<rect x="${x}" y="${n1(base - ha)}" width="${bw}" height="${n1(ha)}" style="fill:${CONTR};fill-opacity:.85"/>` : ''}
        ${hr ? `<rect x="${x}" y="${n1(base - ha - hr)}" width="${bw}" height="${n1(hr)}" style="fill:var(--acc)"/>` : ''}
        <rect x="${x}" y="${n1(base - ha - hr - hq)}" width="${bw}" height="${n1(hq)}" style="fill:${CONTR};fill-opacity:.35"/></g>
        <text class="pic c" x="${x + bw / 2}" y="${base + 40}">${i + 1}</text>`;
    });
    const L = [[CONTR, .85, 'già accumulato'], ['var(--acc)', 1, 'rivalutazione'], [CONTR, .35, 'nuova quota']];
    s += L.map(([c, o, t], i) => `<g class="comp" ${ritardo(1.6 + i * .15)}><rect x="${X0 + i * 380}" y="22" width="40" height="30" rx="6" style="fill:${c};fill-opacity:${o}"/>
      <text class="et" x="${X0 + i * 380 + 56}" y="48">${t}</text></g>`).join('');
    s += `<text class="pic comp" ${ritardo(.3)} x="${X0 + N * (bw + gap) - 10}" y="${base + 40}" style="text-anchor:end">anni</text>
      <text class="nota comp" ${ritardo(.5)} x="${X0 + N * (bw + gap) - 10}" y="104" style="text-anchor:end">Esempio semplificato</text>`;
    return svg(1656, 620, s);
  },

  // Lo scambio: il binario del TFS arriva fino all'adesione, poi prosegue verde
  // (TFR); il vecchio binario resta, attenuato. fase 'vagone' aggancia il
  // maturato fino a oggi.
  scambio: d => {
    const y = 430, xs = 760, X1 = 1560;
    const rotaia = (p, col, r, op = 1) => `
      <path class="tr" pathLength="1" d="${p}" style="stroke:${col};stroke-opacity:${op};stroke-width:30;animation-delay:${r}s"/>
      <path class="tr" pathLength="1" d="${p}" style="stroke:var(--bg);stroke-width:12;animation-delay:${r}s"/>`;
    let trav = '';
    for (let x = 120; x < X1; x += 60) trav += `<rect x="${x}" y="${y - 30}" width="14" height="60" rx="4" style="fill:var(--fg);fill-opacity:.18"/>`;
    return svg(1656, 640, `<g class="comp" ${ritardo(.1)}>${trav}</g>
      ${rotaia(`M100 ${y}H${xs}`, RETR, .15)}
      ${rotaia(`M${xs} ${y}C${xs + 200} ${y} ${xs + 260} ${y - 210} ${xs + 520} ${y - 210}H${X1}`, RETR, .9, .3)}
      ${rotaia(`M${xs} ${y}H${X1}`, CONTR, 1.3)}
      <text class="big comp" ${ritardo(.6)} x="300" y="${y - 70}" style="fill:${RETR}">TFS</text>
      <text class="big comp" ${ritardo(1.0)} x="${X1 - 10}" y="${y - 260}" style="fill:${RETR};fill-opacity:.4;text-anchor:end">TFS</text>
      <text class="big comp" ${ritardo(1.8)} x="${X1 - 10}" y="${y + 110}" style="fill:${CONTR};text-anchor:end">TFR</text>
      <g class="pop" ${ritardo(1.1)}>
        <path d="M${xs} ${y + 40}V${y + 130}" style="stroke:var(--tit);stroke-width:7"/>
        <rect x="${xs - 250}" y="${y + 130}" width="500" height="90" rx="16" style="fill:var(--acc)"/>
        <text class="et c" x="${xs}" y="${y + 188}" style="fill:#fff;font-size:38px">adesione a Perseo Sirio</text></g>
      ${d.fase === 'vagone' ? `<g class="sali" ${ritardo(2.0)}>
        <rect x="${xs + 200}" y="${y - 150}" width="400" height="160" rx="16" style="fill:${RETR}"/>
        <circle cx="${xs + 280}" cy="${y + 14}" r="22" style="fill:var(--tit)"/><circle cx="${xs + 520}" cy="${y + 14}" r="22" style="fill:var(--tit)"/>
        <text class="et c" x="${xs + 400}" y="${y - 88}" style="fill:#fff;font-size:36px">TFS maturato</text>
        <text class="et c" x="${xs + 400}" y="${y - 40}" style="fill:#fff;font-size:36px">fino a oggi</text></g>` : ''}`);
  },

  // Le due tasche: un cappotto, la tasca reale (Perseo Sirio, monete piene) e
  // quella figurativa (INPS, monete a matita). Grafica ricorrente del corso.
  // fase: 'reale' | 'due' | 'manopola' | 'unione' | 'garantito' | 'profili' | 'anticipo'
  // optanti: true aggiunge la moneta +1,5%. profili: {reale, fig}.
  tasche: d => {
    const fase = d.fase ?? 'due';
    const dx = fase === 'manopola' ? -190 : 0;
    const cappotto = 'M466 120L677 70L828 190L979 70L1190 120L1379 210V690H277V210Z';
    const T = [{ x: 318, t: 'conto reale', s: 'Perseo Sirio', piene: true,
                 m: d.monete?.reale ?? ['tuo 1%', 'ente 1%'] },
               { x: 918, t: 'conto figurativo', s: 'INPS', piene: false,
                 m: d.monete?.fig ?? (d.optanti ? ['TFR', '+1,5%'] : ['TFR']) }];
    const pw = 420, py = 360, ph = 270, mw = pw - 70, mh = 66;
    let s = `<path class="tr" pathLength="1" d="${cappotto}" style="stroke:var(--tit);stroke-width:7;fill:color-mix(in srgb,var(--tit) 5%,var(--bg));animation-delay:.1s"/>
      <path class="comp" ${ritardo(.6)} d="M828 190V690" style="stroke:var(--tit);stroke-width:4;stroke-opacity:.5"/>`;
    T.forEach((p, i) => {
      if (fase === 'reale' && i === 1) return;
      const r0 = .5 + i * .5;
      s += `<g class="comp" ${ritardo(r0)}>
        <path d="M${p.x} ${py}h${pw}v${ph - 24}a24 24 0 0 1-24 24h${-(pw - 48)}a24 24 0 0 1-24-24z"
          style="fill:var(--bg);stroke:${p.piene ? CONTR : 'var(--fg)'};stroke-width:6;${p.piene ? '' : 'stroke-dasharray:16 11;stroke-opacity:.7'}"/>
        <text class="et c" x="${p.x + pw / 2}" y="${py - 24}" style="fill:${p.piene ? CONTR : 'var(--fg)'};font-size:38px">${p.t}</text>
        ${fase === 'profili' ? '' : `<text class="pic c" x="${p.x + pw / 2}" y="${py + ph + 46}" style="font-size:32px">${p.s}</text>`}</g>`;
      p.m.forEach((m, k) => {
        const mx = p.x + 35, my = py + ph - mh - 22 - k * (mh + 16), t = r0 + .3 + k * .35;
        const pieno = p.piene || (fase === 'unione' && i === 1);
        s += `<g class="cade" style="--dx:0px;--dy:${my - 20}px;animation-delay:${n1(t)}s">
          <rect x="${mx}" y="20" width="${mw}" height="${mh}" rx="${mh / 2}"
            style="fill:${pieno ? `color-mix(in srgb,${CONTR} 18%,var(--bg))` : 'var(--bg)'};stroke:${p.piene ? CONTR : m.includes('1,5') ? 'var(--acc)' : RETR};stroke-width:4;${p.piene ? '' : 'stroke-dasharray:10 8'}"/>
          <text class="et c" x="${mx + mw / 2}" y="${20 + mh / 2 + 12}" style="font-size:34px">${m}</text></g>`;
      });
    });
    let fuori = '';
    if (fase === 'manopola') {
      const cx = 1450, cy = 420;
      fuori = `<g class="comp" ${ritardo(1.4)}>
        <circle cx="${cx}" cy="${cy}" r="96" style="fill:var(--bg);stroke:var(--tit);stroke-width:7"/>
        <text class="pic c" x="${cx}" y="${cy - 150}" style="font-size:30px">fino al 2025</text>
        <text class="pic c" x="${cx}" y="${cy - 116}" style="font-size:30px">paniere, uguale per tutti</text>
        <text class="et c" x="${cx}" y="${cy + 160}" style="fill:var(--acc);font-size:36px">dal 2026</text>
        <text class="et c" x="${cx}" y="${cy + 202}" style="fill:var(--acc);font-size:36px">il profilo che scegli</text></g>
        <g style="transform-box:view-box;transform-origin:${cx}px ${cy}px;animation:pvGira 1s cubic-bezier(.5,0,.3,1) 2s both">
          <path d="M${cx} ${cy}L${cx} ${cy - 82}" style="stroke:var(--acc);stroke-width:12;stroke-linecap:round"/></g>`;
    }
    if (fase === 'unione') {
      s += `<path class="tr" pathLength="1" d="M1128 ${py + 110}C1060 ${py - 90} 600 ${py - 90} 540 ${py + 80}" style="stroke:var(--acc);stroke-width:9;animation-delay:1.8s"/>
        <path class="comp" ${ritardo(2.6)} d="M510 ${py + 52}l30 32 32-28" style="fill:none;stroke:var(--acc);stroke-width:9;stroke-linecap:round;stroke-linejoin:round"/>
        <text class="et c comp" ${ritardo(2.2)} x="828" y="${py - 96}" style="fill:var(--acc);font-size:36px">alla fine del rapporto di lavoro</text>`;
    }
    if (fase === 'garantito') {
      s += `<g class="pop" ${ritardo(2.0)}><path d="M0 -44L38 -29V5C38 29 19 45 0 54C-19 45-38 29-38 5V-29Z" transform="translate(${T[0].x + pw - 52} ${py + 56})"
          style="fill:color-mix(in srgb,var(--acc) 14%,var(--bg));stroke:var(--acc);stroke-width:6"/></g>
        <text class="et c comp" ${ritardo(2.2)} x="${T[0].x + pw / 2}" y="${py + ph + 90}" style="fill:var(--acc);font-size:36px">profilo Garantito</text>`;
    }
    if (fase === 'profili') {
      const pr = d.profili ?? {};
      s += [[T[0], pr.reale], [T[1], pr.fig]].map(([p, n], i) => n ? `<g class="sali" ${ritardo(1.9 + i * .3)}>
        <rect x="${p.x + 30}" y="${py + ph + 14}" width="${pw - 60}" height="58" rx="29" style="fill:var(--acc)"/>
        <text class="et c" x="${p.x + pw / 2}" y="${py + ph + 54}" style="fill:#fff;font-size:30px">${n}</text></g>` : '').join('');
    }
    if (fase === 'anticipo') {
      // 8.1: la tasca reale si apre (freccia verso l'alto), quella figurativa ha il lucchetto.
      const ax = T[0].x + pw - 62, lx = T[1].x + pw - 62, ly = py + 62;
      s += `<g class="pop" ${ritardo(1.9)}><circle cx="${ax}" cy="${ly}" r="36" style="fill:var(--acc)"/>
          <path d="M${ax} ${ly + 18}V${ly - 16}M${ax - 15} ${ly - 2}L${ax} ${ly - 18}L${ax + 15} ${ly - 2}" style="fill:none;stroke:#fff;stroke-width:7;stroke-linecap:round;stroke-linejoin:round"/></g>
        <g class="pop" ${ritardo(2.3)}><path d="M${lx - 17} ${ly - 4}V${ly - 20}a17 17 0 0 1 34 0V${ly - 4}" style="fill:none;stroke:var(--fg);stroke-width:7"/>
          <rect x="${lx - 28}" y="${ly - 6}" width="56" height="44" rx="8" style="fill:var(--fg)"/></g>
        <text class="et c comp" ${ritardo(2.0)} x="${T[0].x + pw / 2}" y="${py + ph + 100}" style="fill:var(--acc);font-size:34px">si può anticipare, anche tutta</text>
        <text class="et c comp" ${ritardo(2.4)} x="${T[1].x + pw / 2}" y="${py + ph + 100}" style="font-size:34px">chiusa fino alla fine del lavoro</text>`;
    }
    return svg(1656, fase === 'anticipo' ? 736 : fase === 'garantito' ? 735 : 720, `<g transform="translate(${dx} 0)">${s}</g>${fuori}`);
  },

  // ---------- Modulo 3: chi puo' aderire e come ----------

  // Il cancello dei comparti: a sinistra il cancello di Perseo Sirio, a destra
  // i comparti che l'hanno gia' passato. n: quanti; scuola: il cartello Espero.
  cancello: d => {
    const V = d.voci ?? ['Sanità', 'Funzioni locali e Regioni', 'Funzioni centrali',
      'Università e ricerca', 'Dirigenza, anche medica', 'Segretari comunali'];
    const n = d.n ?? V.length, gx = 110, gw = 420, gy = 150, gh = 470;
    let s = `<g class="comp" ${ritardo(.1)}>
      <rect x="${gx}" y="${gy}" width="34" height="${gh}" rx="8" style="fill:var(--tit)"/>
      <rect x="${gx + gw - 34}" y="${gy}" width="34" height="${gh}" rx="8" style="fill:var(--tit)"/>
      <path d="M${gx} ${gy + 20}Q${gx + gw / 2} ${gy - 90} ${gx + gw} ${gy + 20}" style="fill:none;stroke:var(--tit);stroke-width:14"/>
      <rect x="${gx + 50}" y="${gy - 26}" width="${gw - 100}" height="66" rx="14" style="fill:var(--acc)"/>
      <text class="et c" x="${gx + gw / 2}" y="${gy + 18}" style="fill:#fff;font-size:34px">Perseo Sirio</text></g>
      <path class="tr" pathLength="1" d="M${gx + gw / 2 - 110} ${gy + gh - 60}H${gx + gw + 110}" style="stroke:var(--acc);stroke-width:8;animation-delay:.4s"/>
      <path class="comp" ${ritardo(.9)} d="M${gx + gw + 86} ${gy + gh - 82}l26 22-26 22" style="fill:none;stroke:var(--acc);stroke-width:8;stroke-linecap:round;stroke-linejoin:round"/>`;
    V.slice(0, n).forEach((v, i) => {
      const c = i % 2, r = Math.floor(i / 2), x = 660 + c * 480, y = 130 + r * 150, ult = i === n - 1 && d.evidenzia !== false;
      s += `<g class="sali" ${ritardo(.5 + i * .25)}>
        <rect x="${x}" y="${y}" width="460" height="110" rx="20" style="fill:${ult ? 'color-mix(in srgb,var(--acc) 12%,var(--bg))' : `color-mix(in srgb,${CONTR} 9%,var(--bg))`};stroke:${ult ? 'var(--acc)' : CONTR};stroke-width:4"/>
        <circle cx="${x + 46}" cy="${y + 55}" r="14" style="fill:${ult ? 'var(--acc)' : CONTR}"/>
        <text class="et" x="${x + 76}" y="${y + 66}" style="font-size:30px">${v}</text></g>`;
    });
    if (d.scuola) s += `<g class="pop" ${ritardo(.6 + n * .25)}>
        <rect x="660" y="590" width="940" height="96" rx="20" style="fill:var(--bg);stroke:${GRIGIO};stroke-width:5;stroke-dasharray:14 9"/>
        <text class="et c" x="1155" y="652" style="fill:${GRIGIO};font-size:36px">fuori: la scuola → Espero</text></g>`;
    return svg(1656, d.scuola ? 710 : 660, s);
  },

  // Il contratto a termine come una barra: verde "versamenti subito", ocra
  // l'ultimo tratto. fase: 'barra' | 'penna' | 'dopo' (il contratto successivo).
  barra: d => {
    const fase = d.fase ?? 'penna', X0 = 120, X1 = 1540, y = 260, h = 90, xs = X0 + (X1 - X0) * .75;
    let s = `<rect class="x" ${ritardo(.1)} x="${X0}" y="${y}" width="${xs - X0}" height="${h}" rx="18" style="fill:${CONTR};transform-origin:${X0}px 0"/>
      <rect class="x" ${ritardo(.6)} x="${xs}" y="${y}" width="${X1 - xs}" height="${h}" rx="18" style="fill:${RETR};transform-origin:${xs}px 0"/>
      <text class="et comp" ${ritardo(.3)} x="${X0}" y="${y - 30}" style="font-size:34px">inizio</text>
      <text class="et e comp" ${ritardo(.8)} x="${X1}" y="${y - 30}" style="font-size:34px">${d.scadenza ?? 'scadenza'}</text>
      <text class="et c comp" ${ritardo(.5)} x="${(X0 + xs) / 2}" y="${y + 60}" style="fill:#fff;font-size:34px">versamenti subito</text>
      <text class="et c comp" ${ritardo(.9)} x="${(xs + X1) / 2}" y="${y + 60}" style="fill:#fff;font-size:30px">ultimi 3 mesi</text>
      <text class="pic c comp" ${ritardo(1.0)} x="${(xs + X1) / 2}" y="${y + h + 50}" style="font-size:30px">versamenti dal contratto dopo</text>`;
    if (d.mese) s += `<path class="comp" ${ritardo(1.1)} d="M${xs} ${y - 16}V${y + h + 16}" style="stroke:var(--tit);stroke-width:5;stroke-dasharray:10 8"/>
      <text class="et c comp" ${ritardo(1.2)} x="${xs}" y="${y - 30}" style="fill:var(--acc);font-size:34px">${d.mese}</text>`;
    if (fase !== 'barra') {
      const xp = X0 + (xs - X0) * .55;
      s += `<g style="animation:pvAppari .3s 1.2s both"><g style="transform-box:view-box;animation:pvPenna 1.2s cubic-bezier(.3,.7,.3,1) 1.2s both">
        <g transform="translate(${xp} ${y - 10}) rotate(35)"><rect x="-14" y="-150" width="28" height="120" rx="6" style="fill:var(--acc)"/>
        <path d="M-14 -30L0 0L14 -30Z" style="fill:var(--tit)"/></g></g></g>
        <text class="et c comp" ${ritardo(2.2)} x="${xp}" y="${y + h + 60}" style="fill:var(--acc);font-size:36px">firma qui</text>`;
    }
    if (fase === 'dopo') {
      const y2 = y + 250, a = X1 - 260, b = X1 + 0;
      s += `<rect class="x" ${ritardo(.3)} x="${a - 500}" y="${y2}" width="500" height="70" rx="16" style="fill:${CONTR};fill-opacity:.55;transform-origin:${a - 500}px 0"/>
        <text class="et comp" ${ritardo(.5)} x="${a - 500}" y="${y2 - 20}" style="font-size:30px">contratto successivo</text>
        <g class="pop" ${ritardo(1.0)}><circle cx="${a - 440}" cy="${y2 + 35}" r="30" style="fill:var(--acc)"/>
        <text class="et c" x="${a - 440}" y="${y2 + 46}" style="fill:#fff;font-size:30px">€</text></g>`;
    }
    return svg(1656, fase === 'dopo' ? 620 : 470, s);
  },

  // Il percorso del modulo: un sentiero con cinque tappe. at: la tappa accesa.
  percorso: d => {
    const T = d.tappe ?? [['1', 'Leggi'], ['2', 'Questionario'], ['3', 'Compila'], ['4', 'Firma dell\'ente'], ['5', 'Conferma']];
    const at = d.at ?? 0, P = [[150, 470], [470, 250], [830, 450], [1180, 230], [1500, 420]];
    const path = 'M60 560C120 520 140 480 150 470S330 240 470 250S700 470 830 450S1050 220 1180 230S1420 440 1500 420S1600 360 1620 340';
    let s = `<path class="tr" pathLength="1" d="${path}" style="stroke:${CONTR};stroke-opacity:.25;stroke-width:34;stroke-linecap:round"/>
      <path class="tr" pathLength="1" d="${path}" style="stroke:var(--bg);stroke-width:6;stroke-dasharray:.015 .02;animation-delay:.2s"/>`;
    T.forEach(([n, t], i) => {
      const [x, y] = P[i], on = at < 0 || i <= at, cur = i === at;
      s += `<g class="pop" ${ritardo(.3 + i * .15)} style="opacity:${on ? 1 : .35}">
        <circle cx="${x}" cy="${y}" r="${cur ? 76 : 64}" style="fill:${cur ? 'var(--acc)' : on ? CONTR : 'var(--bg)'};stroke:${cur ? 'var(--acc)' : CONTR};stroke-width:6"/>
        <text class="big c" x="${x}" y="${y + 24}" style="fill:${on ? '#fff' : CONTR};font-size:68px">${n}</text>
        <text class="et c" x="${x}" y="${y + (y > 350 ? 130 : -100)}" style="font-size:44px;fill:${cur ? 'var(--acc)' : 'var(--tit)'}">${t}</text></g>`;
    });
    return svg(1656, 680, s);
  },

  // Il termostato: una manopola con quattro posizioni attorno. at: la posizione.
  termostato: d => {
    const V = d.voci ?? ['Aumenta o riduci il contributo', 'Versamenti extra', 'Cambia profilo', 'Sospendi'];
    const at = d.at ?? 0, cx = 828, cy = 360, R = 150;
    const A = [-135, -45, 45, 135], pos = [[160, 140, 'e'], [1500, 140, ''], [1500, 600, ''], [160, 600, 'e']];
    let s = `<circle class="pop" ${ritardo(.1)} cx="${cx}" cy="${cy}" r="${R + 40}" style="fill:color-mix(in srgb,${CONTR} 8%,var(--bg));stroke:var(--tit);stroke-width:8"/>
      <circle cx="${cx}" cy="${cy}" r="${R - 30}" style="fill:var(--bg);stroke:var(--tit);stroke-width:6"/>`;
    V.forEach((v, i) => {
      const a = A[i] * Math.PI / 180, x = cx + Math.sin(a) * (R + 40), y = cy - Math.cos(a) * (R + 40);
      const [tx, ty] = pos[i], on = i === at, avv = i === 3;
      const anchor = i === 0 || i === 3 ? 'start' : 'end';
      const lx = i === 0 || i === 3 ? 60 : 1596;
      s += `<circle class="pop" ${ritardo(.3 + i * .1)} cx="${n1(x)}" cy="${n1(y)}" r="20" style="fill:${on ? (avv ? ROSSO : 'var(--acc)') : 'var(--tit)'}"/>
        <path class="comp" ${ritardo(.4)} d="M${n1(x)} ${n1(y)}L${i === 0 || i === 3 ? 520 : 1136} ${ty}" style="stroke:var(--tit);stroke-width:3;stroke-opacity:.35"/>
        <g class="comp" ${ritardo(.5 + i * .12)} style="opacity:${on ? 1 : .4}">
        <text class="et" x="${lx}" y="${ty + 12}" style="text-anchor:${anchor};font-size:${on ? 40 : 34}px;fill:${on ? (avv ? ROSSO : 'var(--acc)') : 'var(--tit)'}">${avv && on ? '⚠ ' : ''}${v}</text></g>`;
    });
    s += `<g style="transform-box:view-box;transform-origin:${cx}px ${cy}px;transform:rotate(${A[at]}deg)">
      <g style="transform-box:view-box;transform-origin:${cx}px ${cy}px;animation:pvGiraDa .9s cubic-bezier(.4,0,.2,1) .6s both">
      <path d="M${cx} ${cy}V${cy - R + 10}" style="stroke:var(--acc);stroke-width:16;stroke-linecap:round"/></g></g>
      <circle cx="${cx}" cy="${cy}" r="22" style="fill:var(--acc)"/>`;
    return svg(1656, 720, s);
  },

  // Il modulo di adesione stilizzato: quattro riquadri, at accende quello di cui si parla.
  modulo: d => {
    const F = d.campi ?? ['Quanto versi (minimo 1%)', 'Profilo di investimento', 'Passaggio TFS → TFR (se sei in TFS)', 'Beneficiari'];
    const at = d.at ?? -1, x = 380, w = 900, y0 = 40;
    let s = `<g class="comp" ${ritardo(.1)}><rect x="${x}" y="${y0}" width="${w}" height="640" rx="20" style="fill:var(--bg);stroke:var(--tit);stroke-width:6"/>
      <rect x="${x}" y="${y0}" width="${w}" height="80" rx="20" style="fill:var(--tit)"/>
      <rect x="${x}" y="${y0 + 50}" width="${w}" height="30" style="fill:var(--tit)"/>
      <text class="et" x="${x + 40}" y="${y0 + 54}" style="fill:#fff;font-size:34px">Modulo di adesione</text></g>`;
    F.forEach((f, i) => {
      const y = y0 + 120 + i * 130, on = at === i || at === 'tutti';
      s += `<g class="sali" ${ritardo(.3 + i * .15)} style="opacity:${at === -1 || on ? 1 : .35}">
        <rect x="${x + 40}" y="${y}" width="${w - 80}" height="104" rx="14" style="fill:${on ? 'color-mix(in srgb,var(--acc) 12%,var(--bg))' : `color-mix(in srgb,${CONTR} 7%,var(--bg))`};stroke:${on ? 'var(--acc)' : CONTR};stroke-width:${on ? 5 : 3}"/>
        <text class="et" x="${x + 80}" y="${y + 64}" style="font-size:36px;fill:${on ? 'var(--acc)' : 'var(--tit)'}">${f}</text></g>`;
      if (i === 0 && on && d.cursore) s += `<g class="comp" ${ritardo(.9)}>
        <path d="M${x + 560} ${y + 52}H${x + 820}" style="stroke:var(--tit);stroke-width:6;stroke-linecap:round"/></g>
        <g style="transform-box:view-box;animation:pvCursore 2.4s ease-in-out 1.1s both">
        <circle cx="${x + 580}" cy="${y + 52}" r="20" style="fill:var(--acc)"/></g>`;
    });
    if (d.avviso) s += `<rect class="comp" ${ritardo(1.2)} x="${x + 20}" y="${y0 + 100}" width="${w - 40}" height="520" style="fill:var(--bg);fill-opacity:.8"/><g class="pop" ${ritardo(1.4)}><rect x="${x + 120}" y="${y0 + 250}" width="${w - 240}" height="150" rx="20" style="fill:var(--acc)"/>
      <text class="et c" x="${x + w / 2}" y="${y0 + 318}" style="fill:#fff;font-size:40px">Compilare non basta:</text>
      <text class="et c" x="${x + w / 2}" y="${y0 + 368}" style="fill:#fff;font-size:40px">serve la firma dell'ente</text></g>`;
    return svg(1656, 720, s);
  },

  // Il timbro dell'ente: il modulo, il timbro con la data, la PEC verso il Fondo
  // e il calendario con il mese dopo. fase: 'timbro' | 'pec' | 'mese'.
  timbro: d => {
    const fase = d.fase ?? 'mese';
    let s = `<g class="comp" ${ritardo(.1)}><rect x="120" y="140" width="380" height="480" rx="16" style="fill:var(--bg);stroke:var(--tit);stroke-width:6"/>
      ${[0, 1, 2, 3, 4].map(k => `<rect x="170" y="${210 + k * 60}" width="${k % 2 ? 220 : 280}" height="16" rx="8" style="fill:var(--tit);fill-opacity:.25"/>`).join('')}</g>
      <g class="pop" ${ritardo(.7)}><g transform="rotate(-12 310 520)"><rect x="170" y="470" width="280" height="96" rx="12" style="fill:var(--bg);fill-opacity:.85;stroke:var(--acc);stroke-width:7"/>
      <text class="et c" x="310" y="510" style="fill:var(--acc);font-size:24px">AMMINISTRAZIONE</text>
      <text class="et c" x="310" y="550" style="fill:var(--acc);font-size:28px">${d.data ?? '20 marzo'}</text></g></g>`;
    if (fase !== 'timbro') s += `<path class="tr" pathLength="1" d="M520 380H860" style="stroke:var(--tit);stroke-width:6;stroke-dasharray:.03 .02;animation-delay:1.1s"/>
      <g class="sali" ${ritardo(1.3)}><rect x="880" y="320" width="170" height="120" rx="12" style="fill:var(--bg);stroke:var(--tit);stroke-width:6"/>
      <path d="M880 320L965 390L1050 320" style="fill:none;stroke:var(--tit);stroke-width:6"/>
      <text class="et c" x="965" y="480" style="font-size:32px">PEC al Fondo</text></g>`;
    if (fase === 'mese') {
      const cx = 1380, cy = 380;
      s += `<g class="pop" ${ritardo(1.8)}><rect x="${cx - 130}" y="${cy - 150}" width="260" height="300" rx="18" style="fill:var(--bg);stroke:var(--tit);stroke-width:6"/>
        <rect x="${cx - 130}" y="${cy - 150}" width="260" height="80" rx="18" style="fill:var(--acc)"/>
        <text class="et c" x="${cx}" y="${cy - 96}" style="fill:#fff;font-size:34px">${d.mese ?? 'aprile'}</text>
        <text class="big c" x="${cx}" y="${cy + 70}" style="fill:var(--acc);font-size:110px">1</text></g>
        <text class="et c comp" ${ritardo(2.2)} x="${cx}" y="${cy + 210}" style="fill:var(--acc);font-size:34px">partono i versamenti</text>`;
    }
    return svg(1656, 660, s);
  },

  // L'orologio del silenzio-assenso: assunzione, sei mesi, trenta giorni, iscritto.
  // at: 0 (sei mesi) | 1 (l'ente comunica) | 2 (trenta giorni) | 3 (iscritto).
  orologio: d => {
    const at = d.at ?? 3, y = 470, A = 120, B = 1060, C = 1400;
    const on = k => at >= k;
    const pt = (x, r, lab, sub, k) => `<g class="pop" ${ritardo(.2 + k * .3)} style="opacity:${on(k) ? 1 : .3}">
      <circle cx="${x}" cy="${y}" r="${r}" style="fill:${at === k ? 'var(--acc)' : CONTR}"/>
      <text class="et c" x="${x}" y="${y + 80}" style="font-size:34px">${lab}</text>
      ${sub ? `<text class="pic c" x="${x}" y="${y + 120}" style="font-size:28px">${sub}</text>` : ''}</g>`;
    let s = `<path class="asse" d="M${A - 40} ${y}H${C + 160}"/>`;
    s += `<path class="tr" pathLength="1" d="M${A} ${y - 30}Q${(A + B) / 2} ${y - 330} ${B} ${y - 30}" style="stroke:${CONTR};stroke-width:10;animation-delay:.4s"/>
      <text class="big c comp" ${ritardo(.9)} x="${(A + B) / 2}" y="${y - 300}" style="fill:${CONTR};font-size:64px">6 mesi</text>
      <text class="et c comp" ${ritardo(1.0)} x="${(A + B) / 2}" y="${y - 245}" style="font-size:34px">decidi tu: sì o no</text>`;
    if (on(2)) s += `<path class="tr" pathLength="1" d="M${B} ${y - 30}Q${(B + C) / 2} ${y - 190} ${C} ${y - 30}" style="stroke:var(--acc);stroke-width:10;animation-delay:.6s"/>
      <text class="big c comp" ${ritardo(1.0)} x="${(B + C) / 2}" y="${y - 160}" style="fill:var(--acc);font-size:52px">30 giorni</text>
      <text class="et c comp" ${ritardo(1.1)} x="${(B + C) / 2}" y="${y - 220}" style="fill:var(--acc);font-size:30px">puoi ancora dire no</text>`;
    s += pt(A, 26, 'Assunzione', 'e informativa', 0) + pt(B, 26, 'Fine dei 6 mesi', 'l\'ente comunica i dati', 1)
      + pt(C, 34, 'Iscritto', 'profilo Garantito', 3);
    return svg(1656, 640, s);
  },

  // Due salvadanai (polizia locale): a sinistra solo la quota annuale
  // dell'art. 208, a destra la stessa quota piu' la contribuzione ordinaria.
  // fase: 'primo' | 'secondo' | 'tempo' (con la distanza evidenziata).
  salvadanai: d => {
    const fase = d.fase ?? 'tempo', anni = 6, base = 600, H = 440, W = 440, a = 26, o = 40;
    const J = [{ x: 200, t: 'Solo art. 208', s: 'una quota all\'anno', o: 0 },
               { x: 1016, t: 'Con integrazione', s: '+ ogni mese 1% + 1% + TFR', o }];
    let s = '';
    J.forEach((j, i) => {
      const spento = (fase === 'primo' && i === 1) || (fase === 'secondo' && i === 0);
      const r0 = .2 + i * .3;
      s += `<g style="opacity:${spento ? .3 : 1}"><g class="comp" ${ritardo(r0)}>
        <path d="M${j.x} ${base - H}v${H - 30}a30 30 0 0 0 30 30h${W - 60}a30 30 0 0 0 30-30v${-(H - 30)}"
          style="fill:color-mix(in srgb,var(--tit) 4%,var(--bg));stroke:var(--tit);stroke-width:7"/>
        <rect x="${j.x + W / 2 - 60}" y="${base - H - 14}" width="120" height="16" rx="8" style="fill:var(--tit)"/>
        <text class="et c" x="${j.x + W / 2}" y="${base - H - 50}" style="font-size:40px;fill:${i ? CONTR : 'var(--tit)'}">${j.t}</text>
        <text class="pic c" x="${j.x + W / 2}" y="${base + 56}" style="font-size:32px">${j.s}</text></g>`;
      let y = base - 6;
      for (let k = 0; k < anni; k++) {
        const t = r0 + .4 + k * .28;
        if (j.o) { y -= j.o; s += `<rect class="y" style="animation-delay:${n1(t)}s;fill:color-mix(in srgb,${CONTR} 30%,var(--bg))" x="${j.x + 14}" y="${y}" width="${W - 28}" height="${j.o - 3}" rx="6"/>`; }
        y -= a; s += `<rect class="y" style="animation-delay:${n1(t + .1)}s;fill:var(--acc)" x="${j.x + 14}" y="${y}" width="${W - 28}" height="${a - 4}" rx="6"/>`;
      }
      j.top = y;
      s += '</g>';
    });
    if (fase === 'tempo') {
      const x = J[1].x - 44, y1 = J[1].top, y2 = J[0].top;
      s += `<path class="comp" ${ritardo(2.2)} d="M${J[0].x + W} ${y2}H${x}M${x} ${y1}H${J[1].x}" style="stroke:var(--fg);stroke-width:3;stroke-dasharray:10 8"/>
        <path class="tr" pathLength="1" d="M${x} ${y2}V${y1}" style="stroke:var(--acc);stroke-width:9;animation-delay:2.3s"/>
        <text class="et comp" ${ritardo(2.4)} x="${x - 24}" y="${(y1 + y2) / 2 + 12}" style="text-anchor:end;fill:var(--acc);font-size:40px">la distanza</text>`;
    }
    const lx = 700;
    s += `<g class="comp" ${ritardo(.3)}><rect x="${lx}" y="${base - 150}" width="44" height="22" rx="6" style="fill:var(--acc)"/>
      <text class="pic" x="${lx + 60}" y="${base - 130}" style="font-size:30px">art. 208</text>
      <rect x="${lx}" y="${base - 90}" width="44" height="34" rx="6" style="fill:color-mix(in srgb,${CONTR} 30%,var(--bg))"/>
      <text class="pic" x="${lx + 60}" y="${base - 62}" style="font-size:30px">ordinari</text></g>`;
    return svg(1656, 680, s);
  },

  // ---------- Modulo 4: quanto si versa ----------

  // Il salvadanaio a tre ingressi (ricorrente nel modulo 4): tre fessure
  // (tuo 1%, ente 1%, TFR) e una quarta piccola, rossa (+1,5%, solo optanti).
  // n: fessure visibili (3 o 4); at: quella accesa (-1 nessuna, 9 tutte);
  // base: accende la base «retribuzione utile al TFR»; etichette: sostituisce i testi.
  ingressi: d => {
    const n = d.n ?? 3, at = d.at ?? 9, cx = 800, cy = 410, rx = 470, ry = 190;
    const E = d.etichette ?? ['tuo 1%', 'ente 1%', 'TFR', '+1,5%'];
    const X = [500, 690, 880, 1040];
    const top = x => cy - ry * Math.sqrt(1 - ((x - cx) / rx) ** 2);
    const fill = `color-mix(in srgb,${CONTR} 10%,var(--bg))`;
    let s = `<g class="pop" ${ritardo(.1)}>
      ${[cx - 320, cx - 140, cx + 140, cx + 320].map(x => `<path d="M${x - 32} ${cy + ry - 40}v${80}h64v-80" style="fill:var(--bg);stroke:var(--tit);stroke-width:7"/>`).join('')}
      <path d="M${cx + rx - 40} ${cy - 50}h80a24 24 0 0 1 24 24v92a24 24 0 0 1-24 24h-80z" style="fill:${fill};stroke:var(--tit);stroke-width:7"/>
      <ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" style="fill:${fill};stroke:var(--tit);stroke-width:8"/>
      <path d="M${cx + 310} ${n1(top(cx + 310) + 26)}l34-100 66 82" style="fill:${fill};stroke:var(--tit);stroke-width:7;stroke-linejoin:round"/>
      <circle cx="${cx + 370}" cy="${cy - 40}" r="14" style="fill:var(--tit)"/>
      <circle cx="${cx + rx + 30}" cy="${cy - 14}" r="7" style="fill:var(--tit)"/><circle cx="${cx + rx + 30}" cy="${cy + 20}" r="7" style="fill:var(--tit)"/></g>`;
    for (let i = 0; i < n; i++) {
      const x = X[i], y = top(x) + 24, rosso = i === 3, on = at === 9 || at === i;
      const w = rosso ? 70 : 110, t = .5 + i * .35, big = on && at !== 9;
      s += `<g class="comp" ${ritardo(t - .2)} style="opacity:${on ? 1 : .35}">
        <rect x="${x - w / 2}" y="${n1(y - 10)}" width="${w}" height="20" rx="10" style="fill:var(--tit)"/>
        <text class="et c" x="${x}" y="${n1(top(x) - 40)}" style="font-size:${big ? 50 : 42}px;fill:${rosso ? ROSSO : big ? 'var(--acc)' : 'var(--tit)'}">${E[i]}</text></g>`;
      if (on) s += `<g class="cade" style="--dx:0px;--dy:${n1(y - 30 - 40)}px;animation-delay:${n1(t)}s">
        <circle cx="${x}" cy="40" r="${rosso ? 22 : 32}" style="fill:${rosso ? ROSSO : CONTR};stroke:var(--bg);stroke-width:5"/></g>`;
    }
    // laterale (4.4): la fessura sul fianco per i versamenti volontari.
    if (d.laterale) s += `<g class="comp" ${ritardo(1.2)}><rect x="${cx - rx - 10}" y="${cy - 55}" width="20" height="110" rx="10" style="fill:var(--acc)"/>
      <text class="et c" x="${cx - rx}" y="${cy - 80}" style="font-size:40px;fill:var(--acc)">bonifico</text></g>
      <g style="--dx:${rx - 60}px;animation:pvScorri 1.2s cubic-bezier(.4,0,.2,1) 1.8s both"><g class="pop" ${ritardo(1.5)}>
        <circle cx="${cx - rx - 160}" cy="${cy}" r="38" style="fill:var(--acc);stroke:var(--bg);stroke-width:5"/>
        <text class="et c" x="${cx - rx - 160}" y="${cy + 13}" style="fill:#fff;font-size:36px">€</text></g></g>`;
    const by = cy + ry + 50, on = d.base;
    s += `<g class="comp" ${ritardo(1.8)} style="opacity:${on ? 1 : .5}">
      <rect x="${cx - 470}" y="${by}" width="940" height="64" rx="16" style="fill:${on ? 'color-mix(in srgb,var(--acc) 12%,var(--bg))' : 'var(--bg)'};stroke:${on ? 'var(--acc)' : 'var(--tit)'};stroke-width:5"/>
      <text class="et c" x="${cx}" y="${by + 45}" style="font-size:40px;fill:${on ? 'var(--acc)' : 'var(--tit)'}">base: retribuzione lorda utile al TFR</text></g>`;
    return svg(1656, by + 72, s);
  },

  // La bilancia dell'esempio: a sinistra la moneta che esce dalla busta paga,
  // a destra ente e TFR. fase: 'una' (solo sinistra) | 'tutte' | 'nota' (+ «il TFR è già tuo»).
  bilancia: d => {
    const fase = d.fase ?? 'tutte', cx = 828, py = 200, L = 440, k = fase === 'una' ? 0 : 1;
    const fill = `color-mix(in srgb,${CONTR} 10%,var(--bg))`, pp = py + 250;
    const piatto = (x, cls, voci, cap) => `<g style="animation:${cls} 1s cubic-bezier(.4,0,.2,1) 1.6s both">
      <path d="M${x} ${py}L${x - 170} ${pp}M${x} ${py}L${x + 170} ${pp}" style="stroke:var(--tit);stroke-width:4;stroke-opacity:.6"/>
      ${voci}
      <path d="M${x - 210} ${pp}h420a210 44 0 0 1-420 0z" style="fill:${fill};stroke:var(--tit);stroke-width:7"/>
      ${cap}</g>`;
    const moneta = (x, r, t, col, delay) => `<g class="cade" style="--dx:0px;--dy:${pp - r}px;animation-delay:${delay}s">
      <circle cx="${x}" cy="0" r="${r}" style="fill:${col}"/>
      <text class="et c" x="${x}" y="${n1(r * .3)}" style="fill:#fff;font-size:${r > 50 ? 36 : 30}px">${t}</text></g>`;
    const cap = (x, a, b) => `<text class="et c" x="${x}" y="${pp + 100}" style="font-size:38px">${a}</text>
      <text class="pic c" x="${x}" y="${pp + 142}" style="font-size:30px">${b}</text>`;
    const xl = cx - L, xr = cx + L;
    const sx = moneta(xl, 42, '25 €', 'var(--acc)', .5);
    const dx = k ? moneta(xr - 85, 52, 'ente', CONTR, .9) + moneta(xr + 70, 66, 'TFR', CONTR, 1.2) : '';
    let s = `<path class="tr" pathLength="1" d="M${cx} ${pp + 160}V${py - 30}M${cx - 140} ${pp + 160}h280" style="stroke:var(--tit);stroke-width:10"/>
      <g style="transform-box:view-box;transform-origin:${cx}px ${py}px;${k ? 'animation:pvInclina 1s cubic-bezier(.4,0,.2,1) 1.6s both' : ''}">
        <path d="M${xl} ${py}H${xr}" style="stroke:var(--tit);stroke-width:14;stroke-linecap:round"/></g>
      <circle cx="${cx}" cy="${py}" r="20" style="fill:var(--tit)"/>
      ${piatto(xl, k ? 'pvSuB' : 'none', sx, cap(xl, '25 € al mese', 'dalla tua busta paga'))}
      ${piatto(xr, k ? 'pvGiuB' : 'none', dx, k ? cap(xr, 'ente + TFR', '2.373 € l\'anno') : '')}`;
    if (fase === 'nota') s += `<text class="et c comp" ${ritardo(2.4)} x="${cx}" y="${py - 90}" style="fill:var(--acc);font-size:46px">il TFR è comunque tuo</text>`;
    return svg(1656, pp + 200, s);
  },

  // Lo stesso TFR diviso in due modi (4.2): due barre della stessa lunghezza.
  // La prima tutta verde (pensione complementare); la seconda 28,94% verde e il
  // resto grigio (liquidazione), con sopra il blocco rosso +1,5%.
  // fase: 'vuote' | 'piene' | 'premio'.
  divisione: d => {
    const fase = d.fase ?? 'premio', X = 420, W = 1120, H = 110, Y = [170, 470];
    const quota = .2894, piene = fase !== 'vuote';
    const lab = [['Assunta dal 2001', 'TFR 2.073 €'], ['In servizio al 2000', 'TFR 2.073 €']];
    let s = '';
    Y.forEach((y, i) => {
      s += `<text class="et e comp" ${ritardo(.1 + i * .2)} x="${X - 30}" y="${y + 50}" style="font-size:38px">${lab[i][0]}</text>
        <text class="pic e comp" ${ritardo(.1 + i * .2)} x="${X - 30}" y="${y + 92}" style="font-size:30px">${lab[i][1]}</text>
        <rect class="comp" ${ritardo(.2)} x="${X}" y="${y}" width="${W}" height="${H}" rx="14" style="fill:var(--bg);stroke:var(--tit);stroke-width:5"/>`;
    });
    if (piene) {
      const w2 = W * quota;
      s += `<rect class="x" style="animation-delay:.6s;fill:${CONTR}" x="${X}" y="${Y[0]}" width="${W}" height="${H}" rx="14"/>
        <text class="et c comp" ${ritardo(1.3)} x="${X + W / 2}" y="${Y[0] + 68}" style="fill:#fff;font-size:38px">pensione complementare · 100%</text>
        <rect class="x" style="animation-delay:.6s;fill:${CONTR}" x="${X}" y="${Y[1]}" width="${n1(w2)}" height="${H}" rx="14"/>
        <rect class="x" style="animation-delay:1.0s;fill:${GRIGIO};fill-opacity:.55" x="${n1(X + w2 + 6)}" y="${Y[1]}" width="${n1(W - w2 - 6)}" height="${H}" rx="14"/>
        <text class="et c comp" ${ritardo(1.4)} x="${n1(X + w2 / 2)}" y="${Y[1] + 68}" style="fill:#fff;font-size:34px">600 €</text>
        <text class="et c comp" ${ritardo(1.6)} x="${n1(X + w2 + (W - w2) / 2)}" y="${Y[1] + 68}" style="font-size:38px">liquidazione · 1.473 €</text>
        <text class="pic comp" ${ritardo(1.5)} x="${X}" y="${Y[1] + H + 46}" style="font-size:30px">28,94% = 2% della retribuzione</text>`;
    }
    if (fase === 'premio') {
      s += `<g class="cade" style="--dx:0px;--dy:${Y[1] - 70 - 20}px;animation-delay:2s">
        <rect x="${X}" y="20" width="${n1(W * .1737)}" height="62" rx="12" style="fill:var(--acc)"/>
        <text class="et c" x="${n1(X + W * .1737 / 2)}" y="64" style="fill:#fff;font-size:34px">+360 €</text></g>
        <text class="et comp" ${ritardo(2.6)} x="${n1(X + W * .1737 + 24)}" y="${Y[1] - 26}" style="fill:var(--acc);font-size:34px">accantonamento aggiuntivo 1,5%</text>`;
    }
    return svg(1656, 680, s);
  },

  // Le dodici buste dell'anno (4.3): ogni mese una busta con l'1% dell'ente.
  // stato: 'una' (solo la prima, che pulsa) | 'tutte' (si riempiono tutte) |
  // 'perse' (restano chiuse e sbiadite: chi non aderisce o sospende) |
  // 'da' (le prime `da` prese, le altre perse: chi sospende a metà anno).
  buste: d => {
    const st = d.stato ?? 'tutte', da = d.da ?? 6, W = 228, H = 156, gx = 36, gy = 100;
    const X0 = (1656 - (6 * W + 5 * gx)) / 2, Y0 = 90;
    const M = ['gen', 'feb', 'mar', 'apr', 'mag', 'giu', 'lug', 'ago', 'set', 'ott', 'nov', 'dic'];
    let s = '';
    for (let i = 0; i < 12; i++) {
      const x = X0 + (i % 6) * (W + gx), y = Y0 + Math.floor(i / 6) * (H + gy);
      const presa = st === 'tutte' || (st === 'una' && i === 0) || (st === 'da' && i < da);
      const persa = st === 'perse' || (st === 'da' && i >= da);
      const t = .15 + i * .1;
      s += `<g class="pop" ${ritardo(t)} style="opacity:${persa ? .35 : st === 'una' && i ? .5 : 1}">
        <rect x="${x}" y="${y}" width="${W}" height="${H}" rx="10" style="fill:${presa ? `color-mix(in srgb,${CONTR} 14%,var(--bg))` : 'var(--bg)'};stroke:${presa ? CONTR : 'var(--tit)'};stroke-width:5"/>
        <path d="M${x} ${y}L${x + W / 2} ${y + H * .55}L${x + W} ${y}" style="fill:none;stroke:${presa ? CONTR : 'var(--tit)'};stroke-width:5;stroke-linejoin:round"/>
        <text class="pic c" x="${x + W / 2}" y="${y + H + 40}" style="font-size:30px">${M[i]}</text></g>`;
      if (presa) s += `<g class="sali" ${ritardo(t + .6)}><circle cx="${x + W / 2}" cy="${y + H * .62}" r="42" style="fill:${CONTR}"/>
        <text class="et c" x="${x + W / 2}" y="${y + H * .62 + 11}" style="fill:#fff;font-size:34px">1%</text></g>`;
      if (persa) s += `<path class="comp" ${ritardo(t + .8)} d="M${x + 30} ${y + 20}L${x + W - 30} ${y + H - 20}" style="stroke:var(--acc);stroke-width:7;stroke-linecap:round"/>`;
    }
    return svg(1656, Y0 + 2 * H + gy + 60, s);
  },

  // Le tre manopole (4.4): contributo, versamenti volontari, sospensione.
  // k = indice della manopola accesa (-1 = nessuna, 9 = tutte).
  manopole: d => {
    const k = d.k ?? 9, E = d.etichette ?? [['contributo', 'aumentare o ridurre'], ['versamenti extra', 'quando vuoi tu'], ['sospensione', 'se serve davvero']];
    const X = [368, 828, 1288], cy = 270, r = 140;
    let s = `<rect class="comp" ${ritardo(.05)} x="120" y="${cy - r - 90}" width="1416" height="${2 * r + 180}" rx="40" style="fill:color-mix(in srgb,${CONTR} 7%,var(--bg));stroke:var(--tit);stroke-width:6"/>`;
    X.forEach((x, i) => {
      const on = k === 9 || k === i, t = .3 + i * .3, ang = on ? 60 : -60;
      s += `<g class="pop" ${ritardo(t)} style="opacity:${on ? 1 : .35}">
        <circle cx="${x}" cy="${cy}" r="${r}" style="fill:var(--bg);stroke:${on && k !== 9 ? 'var(--acc)' : 'var(--tit)'};stroke-width:${on && k !== 9 ? 12 : 8}"/>
        <circle cx="${x}" cy="${cy}" r="${r - 40}" style="fill:color-mix(in srgb,${CONTR} 14%,var(--bg));stroke:var(--tit);stroke-width:5"/>
        ${[-120, -60, 0, 60, 120].map(a => `<path d="M${n1(x + Math.sin(a * Math.PI / 180) * (r + 14))} ${n1(cy - Math.cos(a * Math.PI / 180) * (r + 14))}L${n1(x + Math.sin(a * Math.PI / 180) * (r + 34))} ${n1(cy - Math.cos(a * Math.PI / 180) * (r + 34))}" style="stroke:var(--tit);stroke-width:6;stroke-linecap:round"/>`).join('')}
        <g style="transform-box:view-box;transform-origin:${x}px ${cy}px;animation:pvGira${on ? '' : 'X'} 1.2s cubic-bezier(.4,0,.2,1) ${n1(t + .5)}s both;--a:${ang}deg">
          <path d="M${x} ${cy - r + 52}V${cy - 20}" style="stroke:${on ? 'var(--acc)' : 'var(--tit)'};stroke-width:16;stroke-linecap:round"/></g>
        <text class="et c" x="${x}" y="${cy + r + 160}" style="font-size:46px;fill:${on && k !== 9 ? 'var(--acc)' : 'var(--tit)'}">${E[i][0]}</text>
        <text class="pic c" x="${x}" y="${cy + r + 206}" style="font-size:32px">${E[i][1]}</text></g>`;
    });
    return svg(1656, cy + r + 230, s);
  },

  // I due cursori (4.4): il tuo contributo scorre (v, in %), quello dell'ente
  // resta fermo all'1%. tetto: mostra in fondo la zona del limite fiscale.
  cursori: d => {
    const v = d.v ?? 1, da = d.da ?? 1, X = 460, W = 1060, M = 6, Y = [200, 470];
    const px = p => X + W * p / M;
    let s = '';
    if (d.tetto) s += `<g class="comp" ${ritardo(1.8)}><rect x="${px(5)}" y="${Y[0] - 40}" width="${n1(px(6) - px(5))}" height="80" rx="12" style="fill:var(--acc);fill-opacity:.14;stroke:var(--acc);stroke-width:4;stroke-dasharray:14 10"/>
      <text class="et c" x="${n1((px(5) + px(6)) / 2)}" y="${Y[0] + 130}" style="fill:var(--acc);font-size:34px">tetto fiscale</text></g>`;
    [['il tuo', v, da, 'var(--acc)'], ['l\'ente', 1, 1, CONTR]].forEach(([lab, val, ini, col], i) => {
      const y = Y[i];
      s += `<text class="et e comp" ${ritardo(.1 + i * .2)} x="${X - 60}" y="${y + 16}" style="font-size:46px">${lab}</text>
        <rect class="comp" ${ritardo(.2)} x="${X}" y="${y - 12}" width="${W}" height="24" rx="12" style="fill:var(--linea,#ccc);fill-opacity:.6"/>
        ${[0, 1, 2, 3, 4, 5, 6].map(t => `<text class="pic c comp" ${ritardo(.3)} x="${n1(px(t))}" y="${y + 80}" style="font-size:28px">${t}%</text>`).join('')}
        <rect class="comp" ${ritardo(.3)} x="${X}" y="${y - 12}" width="${n1(px(val) - X)}" height="24" rx="12" style="fill:${col}"/>
        <g style="--dx:${n1(px(val) - px(ini))}px;animation:pvScorri 1.4s cubic-bezier(.4,0,.2,1) .9s both">
          <circle cx="${n1(px(ini))}" cy="${y}" r="40" style="fill:var(--bg);stroke:${col};stroke-width:10"/>
          <text class="et c" x="${n1(px(ini))}" y="${y - 60}" style="font-size:44px;fill:${col}">${String(val).replace('.', ',')}%</text></g>`;
      if (i === 1 && d.fermo) s += `<text class="pic comp" ${ritardo(2.2)} x="${n1(px(1) + 60)}" y="${y - 50}" style="font-size:32px">fermo, qualunque cifra tu scelga</text>`;
    });
    return svg(1656, 590, s);
  },

  // Un foglio stilizzato e neutro (4.5): cedolino, Certificazione Unica.
  // righe: [{h:'Sezione'} | {t, v, id, finta:true}]; accese: id da evidenziare
  // in ordine; manca: testo di una riga tratteggiata che «non c'è»;
  // lente: la lente scende fino all'ultima riga accesa.
  foglio: d => {
    const X = 330, W = 1000, Y0 = 40, RH = 52, acc = d.accese ?? [];
    let y = Y0 + 110, s = `<rect class="comp" ${ritardo(.05)} x="${X}" y="${Y0}" width="${W}" height="__H__" rx="18" style="fill:var(--bg);stroke:var(--tit);stroke-width:6"/>
      <rect class="comp" ${ritardo(.1)} x="${X}" y="${Y0}" width="${W}" height="80" rx="18" style="fill:color-mix(in srgb,var(--tit) 10%,var(--bg))"/>
      <text class="et comp" ${ritardo(.15)} x="${X + 36}" y="${Y0 + 54}" style="font-size:36px">${d.intest ?? 'CEDOLINO'}</text>`;
    const pos = {};
    (d.righe ?? []).forEach((r, i) => {
      const t = .2 + i * .05;
      if (r.h) { y += 14; s += `<text class="pic comp" ${ritardo(t)} x="${X + 36}" y="${y + 30}" style="font-size:28px;letter-spacing:.12em">${r.h.toUpperCase()}</text>`; y += 46; return; }
      if (r.id) pos[r.id] = y;
      const k = acc.indexOf(r.id), on = k >= 0, ta = 1.2 + k * .7;
      if (on) s += `<rect class="comp" ${ritardo(ta)} x="${X + 20}" y="${y}" width="${W - 40}" height="${RH - 8}" rx="10" style="fill:color-mix(in srgb,${CONTR} 18%,var(--bg));stroke:${CONTR};stroke-width:4"/>`;
      s += r.finta
        ? `<g class="comp" ${ritardo(t)} style="opacity:.45"><rect x="${X + 40}" y="${y + 15}" width="${n1(260 + (i * 97) % 220)}" height="14" rx="7" style="fill:var(--tit)"/><rect x="${X + W - 180}" y="${y + 15}" width="120" height="14" rx="7" style="fill:var(--tit)"/></g>`
        : `<text class="et comp" ${ritardo(t)} x="${X + 40}" y="${y + 33}" style="font-size:30px;${on ? `fill:${CONTR}` : ''}">${r.t}</text>
           <text class="et comp" ${ritardo(t)} x="${X + W - 40}" y="${y + 33}" style="font-size:30px;text-anchor:end;${on ? `fill:${CONTR}` : ''}">${r.v ?? ''}</text>`;
      y += RH;
    });
    if (d.manca) {
      y += 10;
      s += `<g class="comp" ${ritardo(1.2 + acc.length * .7 + .3)}><rect x="${X + 20}" y="${y}" width="${W - 40}" height="${RH - 4}" rx="10" style="fill:none;stroke:var(--acc);stroke-width:4;stroke-dasharray:14 10"/>
        <text class="et c" x="${X + W / 2}" y="${y + 34}" style="font-size:30px;fill:var(--acc)">${d.manca}</text></g>`;
      y += RH;
    }
    const H = y - Y0 + 30;
    s = s.replace('__H__', H);
    if (d.lente && acc.length) {
      const ly = pos[acc[acc.length - 1]] + RH / 2 - 4, lx = X + W - 60;
      s += `<g style="--dx:0px;--dy:${n1(ly - Y0)}px;animation:pvScende 1.6s cubic-bezier(.4,0,.2,1) .6s both">
        <circle cx="${lx}" cy="${Y0}" r="62" style="fill:color-mix(in srgb,var(--bg) 40%,transparent);stroke:var(--acc);stroke-width:10"/>
        <path d="M${lx + 44} ${Y0 + 44}l60 60" style="stroke:var(--acc);stroke-width:16;stroke-linecap:round"/></g>`;
    }
    return svg(1656, Math.max(H + Y0 + 60, 560), s);
  },

  // ---------- Modulo 5: il fisco ----------
  // La colonna del reddito (5.1). fase: 'intera' (IRPEF calcolata su tutta la
  // colonna) | 'dedotta' (prima esce la fetta verde dei contributi, poi l'IRPEF
  // si calcola sul resto) | 'due' (le due colonne affiancate, l'IRPEF che si
  // restringe sulla seconda).
  colonna: d => {
    const fase = d.fase ?? 'due', H = 560, W = 300, Y0 = 80, base = Y0 + H;
    const fetta = 90, irpef = 150, irpef2 = 126;
    const col = (x, ded, t0, lab, dir = -1) => {
      let g = `<rect class="comp" ${ritardo(t0)} x="${x}" y="${Y0}" width="${W}" height="${H}" rx="14" style="fill:color-mix(in srgb,var(--tit) 8%,var(--bg));stroke:var(--tit);stroke-width:6"/>
        <text class="pic c comp" ${ritardo(t0)} x="${x + W / 2}" y="${base + 50}" style="font-size:40px">${lab}</text>`;
      if (ded) g += `<g style="--dx:${dir * (W + 40)}px;animation:pvScorri 1.2s cubic-bezier(.4,0,.2,1) ${n1(t0 + .8)}s both">
          <rect x="${x}" y="${Y0}" width="${W}" height="${fetta}" rx="14" style="fill:${CONTR}"/>
          <text class="et c" x="${x + W / 2}" y="${Y0 + 58}" style="fill:#fff;font-size:38px">contributi</text></g>`;
      const top = ded ? Y0 + fetta : Y0, h = ded ? irpef2 : irpef;
      g += `<rect class="comp" ${ritardo(t0 + (ded ? 2.0 : .6))} x="${x}" y="${top}" width="${W}" height="${h}" rx="14" style="fill:var(--acc);fill-opacity:.85"/>
        <text class="et c comp" ${ritardo(t0 + (ded ? 2.1 : .7))} x="${x + W / 2}" y="${top + h / 2 + 12}" style="fill:#fff;font-size:44px">IRPEF</text>`;
      if (ded) g += `<path class="comp" ${ritardo(t0 + 2.0)} d="M${x} ${top}h${W}" style="stroke:var(--tit);stroke-width:4;stroke-dasharray:12 8"/>`;
      return g;
    };
    let s = '';
    if (fase === 'intera') s = col(678, false, .1, 'reddito lordo');
    else if (fase === 'dedotta') s = col(678, true, .1, 'reddito imponibile');
    else s = col(300, false, .1, 'senza deduzione') + col(960, true, .5, 'con la deduzione', 1)
      + `<text class="et c comp" ${ritardo(3)} x="${960 + W / 2}" y="${Y0 - 24}" style="fill:var(--acc);font-size:42px">meno IRPEF</text>`;
    return svg(1656, base + 80, s);
  },

  // La moneta che torna indietro (5.1): 25 € entrano nel salvadanaio, uno
  // spicchio (l'IRPEF risparmiata) torna verso la busta paga.
  rimborso: d => {
    const cx = 560, cy = 300, r = 150, q = d.quota ?? .23, v = d.v ?? '25 €', s2 = d.risp ?? '≈ 5,75 €';
    const a = q * 2 * Math.PI, ex = cx + r * Math.sin(a), ey = cy - r * Math.cos(a);
    let s = `<g class="pop" ${ritardo(.1)}><circle cx="${cx}" cy="${cy}" r="${r}" style="fill:${CONTR}"/>
        <text class="et c" x="${cx}" y="${cy + 26}" style="fill:#fff;font-size:72px">${v}</text></g>
      <g class="comp" ${ritardo(.4)}>
        <rect x="1060" y="${cy - 110}" width="300" height="200" rx="18" style="fill:var(--bg);stroke:var(--tit);stroke-width:6"/>
        <path d="M1060 ${cy - 110}l150 100 150-100" style="fill:none;stroke:var(--tit);stroke-width:6"/>
        <text class="et c" x="1210" y="${cy + 140}" style="font-size:36px">busta paga</text>
        <text class="et c" x="1210" y="${cy + 190}" style="fill:var(--acc);font-size:40px">${s2} IRPEF risparmiata</text></g>
      <g style="--dx:-0px;animation:pvStacca 1.4s cubic-bezier(.4,0,.2,1) 1.4s both">
        <path d="M${cx} ${cy}L${cx} ${cy - r}A${r} ${r} 0 0 1 ${n1(ex)} ${n1(ey)}Z" style="fill:var(--acc);stroke:var(--bg);stroke-width:6"/></g>
      <text class="pic c comp" ${ritardo(.6)} x="${cx}" y="${cy + r + 70}" style="font-size:34px">${d.sotto ?? 'versati ogni mese'}</text>`;
    return svg(1656, cy + r + 110, s);
  },

  // Le tre aliquote sui rendimenti (5.2): tre colonne 26%, 20%, 12,5%.
  // k: colonna accesa (9 = tutte).
  aliquote: d => {
    const k = d.k ?? 9, V = [['26%', 'investimento ordinario', 26, 'var(--fg)'], ['20%', 'fondo pensione', 20, CONTR], ['12,5%', 'titoli di Stato', 12.5, GRIGIO]];
    const base = 560, H = 17, W = 260, X = [270, 698, 1126];
    let s = `<path class="asse" d="M160 ${base}H1500"/>`;
    V.forEach(([n, t, v, col], i) => {
      const h = v * H, on = k === 9 || k === i, t0 = .2 + i * .35;
      s += `<g style="opacity:${on ? 1 : .35}"><rect class="x" style="animation-delay:${t0}s;fill:${col};fill-opacity:${i === 0 ? .55 : .9}" x="${X[i]}" y="${base - h}" width="${W}" height="${h}" rx="12"/>
        <text class="et c comp" ${ritardo(t0 + .5)} x="${X[i] + W / 2}" y="${base - h - 30}" style="font-size:64px;${i === 1 ? 'fill:' + CONTR : ''}">${n}</text>
        <text class="pic c comp" ${ritardo(t0 + .3)} x="${X[i] + W / 2}" y="${base + 50}" style="font-size:34px">${t}</text></g>`;
    });
    return svg(1656, base + 80, s);
  },

  // I due cesti (5.2): 1.000 € di raccolto ciascuno; il fisco prende 260 € e
  // 200 €; i 60 € di differenza vanno nel vaso «resta investito».
  cesti: d => {
    const fase = d.fase ?? 'vaso', cy = 330;
    const cesto = (cx, tassa, lab, t0, no) => `<g class="pop" ${ritardo(t0)}>
        <path d="M${cx - 180} ${cy - 40}h360l-40 200h-280z" style="fill:color-mix(in srgb,${CONTR} 12%,var(--bg));stroke:var(--tit);stroke-width:7;stroke-linejoin:round"/>
        <path d="M${cx - 130} ${cy - 40}a130 110 0 0 1 260 0" style="fill:none;stroke:var(--tit);stroke-width:7"/>
        <text class="et c" x="${cx}" y="${cy + 70}" style="font-size:52px">1.000 €</text>
        <text class="pic c" x="${cx}" y="${cy + 210}" style="font-size:32px">${lab}</text></g>
      ${fase !== 'cesti' && !no ? `<g style="--dx:0px;--dy:-150px;animation:pvScende 1.2s cubic-bezier(.4,0,.2,1) ${n1(t0 + 1)}s both">
        <circle cx="${cx + 150}" cy="${cy - 20}" r="62" style="fill:var(--acc)"/>
        <text class="et c" x="${cx + 150}" y="${cy - 8}" style="fill:#fff;font-size:34px">−${tassa}</text></g>` : ''}`;
    let s = cesto(360, '260 €', 'fuori dal fondo pensione · 26%', .1) + cesto(1200, '200 €', 'nel fondo pensione · 20%', .4, fase === 'fuori');
    if (fase === 'vaso') s += `<g class="sali" ${ritardo(2.6)}>
        <path d="M720 ${cy + 40}h120l-14 120h-92z" style="fill:color-mix(in srgb,${CONTR} 20%,var(--bg));stroke:${CONTR};stroke-width:6"/>
        <text class="et c" x="780" y="${cy + 120}" style="font-size:36px;fill:${CONTR}">60 €</text>
        <text class="et c" x="780" y="${cy + 210}" style="font-size:34px;fill:${CONTR}">resta investito</text></g>`;
    return svg(1656, cy + 250, s);
  },

  // La scala del fisco (5.3, ricorrente): 21 gradini dal 15% (fino a 15 anni)
  // al 9% (da 35 anni), -0,30 punti l'anno. a = anni di partecipazione dove si
  // ferma l'omino (15..35); etichette ogni 5 gradini fino a dove arriva.
  scala: d => {
    const a = Math.max(15, Math.min(35, d.a ?? 35)), X0 = 170, Y0 = 120, sw = 60, sh = 20, n = 21;
    const x = i => X0 + i * sw, y = i => Y0 + i * sh;
    let pass = `M${X0} ${Y0}`;
    for (let i = 0; i < n; i++) pass += `H${x(i) + sw}V${y(i + 1)}`;
    pass += `V${y(n) + 120}H${X0}Z`;
    let s = `<path class="comp" ${ritardo(.1)} d="${pass}" style="fill:color-mix(in srgb,var(--tit) 8%,var(--bg));stroke:var(--tit);stroke-width:5;stroke-linejoin:round"/>`;
    [[15, '15%', 'fino a 15 anni'], [20, '13,5%', '20 anni'], [25, '12%', '25 anni'], [30, '10,5%', '30 anni'], [35, '9%', 'da 35 anni']].forEach(([an, p, l], k) => {
      if (an > a) return;
      const i = an - 15, t = .4 + k * .35;
      s += `<g class="comp" ${ritardo(t)}><path d="M${x(i) + sw / 2} ${y(i) - 12}V${y(i) - 70}" style="stroke:var(--tit);stroke-width:3;stroke-dasharray:6 6"/>
        <text class="et c" x="${x(i) + sw / 2}" y="${y(i) - 120}" style="font-size:${an === 35 ? 52 : 44}px;fill:${an === 35 ? 'var(--acc)' : 'var(--tit)'}">${p}</text>
        <text class="pic c" x="${x(i) + sw / 2}" y="${y(i) - 82}" style="font-size:28px">${l}</text></g>`;
    });
    const i = a - 15, ox = x(i) + sw / 2, oy = y(i);
    s += `<g style="--dx:${n1(ox - (X0 + sw / 2))}px;--dy:${n1(oy - Y0)}px;animation:pvScala 2.4s steps(${Math.max(1, i)},end) .8s both">
        <circle cx="${X0 + sw / 2}" cy="${Y0 - 64}" r="14" style="fill:var(--acc)"/>
        <path d="M${X0 + sw / 2} ${Y0 - 50}v30m0 0l-12 20m12-20l12 20m-26-38h28" style="stroke:var(--acc);stroke-width:7;stroke-linecap:round;fill:none"/></g>
      <text class="pic comp" ${ritardo(.3)} x="${X0}" y="${y(n) + 170}" style="font-size:30px">un gradino all'anno: −0,30 punti</text>`;
    return svg(1656, y(n) + 190, s);
  },

  // La torta della prestazione (5.3): due spicchi «già tassato» (rendimenti e
  // contributi non dedotti) si staccano; il resto passa sotto la scala.
  // fase: 'intera' | 'spicchi' | 'resto'.
  torta: d => {
    const fase = d.fase ?? 'resto', cx = 560, cy = 330, r = 230;
    const pt = a => [n1(cx + r * Math.sin(a * 2 * Math.PI)), n1(cy - r * Math.cos(a * 2 * Math.PI))];
    const fetta = (a0, a1, col, lab, sp, t) => {
      const [x0, y0] = pt(a0), [x1, y1] = pt(a1), m = (a0 + a1) / 2;
      const k = a1 - a0 > .5 ? .38 : .62, lx = n1(cx + r * k * Math.sin(m * 2 * Math.PI)), ly = n1(cy - r * k * Math.cos(m * 2 * Math.PI));
      const mv = sp && fase !== 'intera';
      return `<g style="${mv ? `--dx:${sp[0]}px;--dy:${sp[1]}px;animation:pvSposta 1.2s cubic-bezier(.4,0,.2,1) ${t}s both` : ''}">
        <path d="M${cx} ${cy}L${x0} ${y0}A${r} ${r} 0 ${a1 - a0 > .5 ? 1 : 0} 1 ${x1} ${y1}Z" style="fill:${col};stroke:var(--bg);stroke-width:6"/>
        <text class="et c" x="${lx}" y="${ly}" style="fill:#fff;font-size:30px">${lab[0]}</text>
        <text class="et c" x="${lx}" y="${n1(+ly + 36)}" style="fill:#fff;font-size:30px">${lab[1] ?? ''}</text></g>`;
    };
    let s = fetta(.30, 1.0, CONTR, ['contributi dedotti', 'e TFR']) +
      fetta(0, .2, GRIGIO, ['rendimenti']) .replace('<g style="', '<g style="') + '';
    s = fetta(.30, 1.0, CONTR, ['contributi dedotti', 'e TFR'])
      + fetta(0, .2, GRIGIO, ['rendimenti'], [880, -60], .6)
      + (d.nd === 'dimenticato' ? fetta(.2, .30, '#7A746A', ['non', 'dedotti']) : fetta(.2, .30, '#7A746A', ['non', 'dedotti'], [820, 40], 1.0));
    if (d.nd === 'comunicato') s += `<g class="pop" ${ritardo(2.2)} style="transform-box:fill-box;transform-origin:center">
        <rect x="1350" y="${cy + 200}" width="260" height="76" rx="12" transform="rotate(-8 1480 ${cy + 238})" style="fill:none;stroke:${CONTR};stroke-width:7"/>
        <text class="et c" x="1480" y="${cy + 252}" transform="rotate(-8 1480 ${cy + 238})" style="fill:${CONTR};font-size:40px">COMUNICATO</text></g>`;
    if (d.nd === 'dimenticato') s += `<g class="pop" ${ritardo(2.4)}><path d="M${cx + 150} ${cy + 20}l50 50m0 -50l-50 50" style="stroke:var(--acc);stroke-width:12;stroke-linecap:round"/>
        <text class="et" x="${cx + r + 70}" y="${cy + 240}" style="fill:var(--acc);font-size:38px">non dedotti: tassati due volte</text></g>`;
    if (fase !== 'intera') s += `<text class="et c comp" ${ritardo(1.8)} x="1480" y="${cy + 170}" style="font-size:38px">già tassato</text>`;
    if (fase === 'resto') s += `<g class="pop" ${ritardo(2.2)}><circle cx="${cx}" cy="${cy}" r="${r + 26}" style="fill:none;stroke:var(--acc);stroke-width:10;stroke-dasharray:22 14"/>
        <text class="et" x="${cx + r + 70}" y="${cy + 20}" style="fill:var(--acc);font-size:56px">15% → 9%</text>
        <text class="pic" x="${cx + r + 70}" y="${cy + 70}" style="font-size:32px">solo su questa parte</text></g>`;
    return svg(1656, cy + r + 110, s);
  },

  // Il bicchiere che trabocca (5.4): fino alla linea dei 5.300 € l'acqua è
  // verde (dedotti); sopra cambia colore e cade nella tazza grigia (non dedotti).
  // fase: 'pieno' (solo verde) | 'trabocca' | 'irpef' (+ «pagano IRPEF oggi»).
  bicchiere: d => {
    const fase = d.fase ?? 'irpef', X = 520, W = 300, Yt = 120, Yb = 600, Yl = 250;
    let s = `<rect class="x" style="animation-delay:.3s;fill:${CONTR};fill-opacity:.85" x="${X + 8}" y="${Yl}" width="${W - 16}" height="${Yb - Yl - 8}"/>
      <path d="M${X} ${Yt}V${Yb}H${X + W}V${Yt}" style="fill:none;stroke:var(--tit);stroke-width:8;stroke-linejoin:round"/>
      <path d="M${X - 30} ${Yl}H${X + W + 30}" style="stroke:var(--acc);stroke-width:5;stroke-dasharray:14 10"/>
      <text class="et e" x="${X - 50}" y="${Yl + 12}" style="font-size:40px;fill:var(--acc)">5.300 €</text>
      <text class="et c" x="${X + W / 2}" y="${(Yl + Yb) / 2 + 14}" style="fill:#fff;font-size:42px">dedotti</text>`;
    if (fase !== 'pieno') s += `<rect class="x" style="animation-delay:1.2s;fill:${GRIGIO}" x="${X + 8}" y="${Yt + 20}" width="${W - 16}" height="${Yl - Yt - 20}"/>
      <path class="tr" pathLength="1" d="M${X + W} ${Yt + 10}C${X + W + 80} ${Yt - 10} ${X + W + 120} ${Yt + 80} ${X + W + 150} ${Yb - 190}" style="stroke:${GRIGIO};stroke-width:22;stroke-linecap:round;animation-delay:1.6s"/>
      <g class="comp" ${ritardo(1.8)}><path d="M${X + W + 60} ${Yb - 160}h220l-24 160h-172z" style="fill:color-mix(in srgb,${GRIGIO} 35%,var(--bg));stroke:var(--tit);stroke-width:7;stroke-linejoin:round"/>
        <text class="et c" x="${X + W + 170}" y="${Yb + 50}" style="font-size:40px">non dedotti</text></g>`;
    if (fase === 'irpef') s += `<text class="et comp" ${ritardo(2.4)} x="${X + W + 320}" y="${Yb - 90}" style="fill:var(--acc);font-size:44px">pagano IRPEF oggi</text>
      <text class="pic comp" ${ritardo(2.6)} x="${X + W + 320}" y="${Yb - 40}" style="font-size:32px">alla fine non si ritassano</text>`;
    return svg(1656, Yb + 80, s);
  },

  // La parete a strati (5.5): dal basso «fino al 2000» (sottile), «2001–2017»,
  // «dal 2018» (verde, cresce). anno: fino a che anno è cresciuto lo strato
  // verde (2026 di base; 2040 per «lo strato buono cresce»). n: strati visibili.
  strati: d => {
    const n = d.n ?? 3, anno = d.anno ?? 2026, X = 330, W = 1000, base = 600;
    const hs = [60, 170, 12 * Math.max(1, anno - 2017)];
    const lab = [['fino al 2000', GRIGIO], ['2001–2017', '#B5AE9F'], ['dal 2018', CONTR]];
    let y = base, s = '';
    for (let i = 0; i < n; i++) {
      const h = hs[i], t = .2 + i * .5, top = y - h;
      const ond = `M${X} ${top + 8}` + [...Array(10)].map((_, k) => `q${W / 20} ${k % 2 ? 10 : -10} ${W / 10} 0`).join('');
      s += `<g class="sali" ${ritardo(t)}>
        <path d="${ond}V${y}H${X}Z" style="fill:${lab[i][1]};fill-opacity:${i === 2 ? .9 : 1}"/></g>
        <text class="et e comp" ${ritardo(t + .5)} x="${X - 30}" y="${n1(y - h / 2 + 14)}" style="font-size:40px;fill:${i === 2 ? CONTR : 'var(--tit)'}">${lab[i][0]}</text>`;
      y = top;
    }
    s += `<path d="M${X} ${base}H${X + W}" style="stroke:var(--tit);stroke-width:6"/>`;
    if (n === 3) s += `<g class="comp" ${ritardo(1.8)}><path d="M${X + W + 60} ${base}V${y - 30}" style="stroke:var(--acc);stroke-width:6"/>
        <path d="M${X + W + 44} ${y - 14}l16 -22 16 22" style="fill:none;stroke:var(--acc);stroke-width:6;stroke-linejoin:round"/>
        <text class="et c" x="${X + W + 60}" y="${y - 60}" style="fill:var(--acc);font-size:40px">${anno === 2026 ? 'oggi' : anno}</text></g>`;
    return svg(1656, base + 50, s);
  },

  // 6.1 · L'equazione della contribuzione definita: versamenti + rendimenti − costi
  // = pensione complementare. k: termini visibili (1-4); barra: «importo promesso» barrato.
  equazione: d => {
    const k = d.k ?? 4, W = 280, WL = 380, G = 90, H = 170, Y = 190;
    const voci = [['versamenti', 'tuoi + dell\'ente', CONTR], ['rendimenti', 'degli investimenti', COMPL], ['costi', 'di gestione', RETR], ['la tua pensione', 'complementare', 'var(--acc)']];
    const ops = ['+', '−', '='];
    const tot = 3 * W + WL + 3 * G, X0 = (1656 - tot) / 2;
    let s = `<text class="nota c comp" ${ritardo(.1)} x="828" y="70" style="text-anchor:middle;font-size:30px">contribuzione definita</text>`;
    voci.forEach(([t, sub, col], i) => {
      if (i >= k) return;
      const x = X0 + i * (W + G), t0 = .2 + i * .45, ult = i === 3, w = ult ? WL : W;
      s += `<g class="pop" ${ritardo(t0)}><rect x="${x}" y="${Y}" width="${w}" height="${H}" rx="26" style="fill:${ult ? 'var(--acc)' : 'var(--bg)'};stroke:${col};stroke-width:7"/>
        <text class="et c" x="${x + w / 2}" y="${Y + 78}" style="text-anchor:middle;font-size:40px;fill:${ult ? '#fff' : col}">${t}</text>
        <text class="pic c" x="${x + w / 2}" y="${Y + 122}" style="text-anchor:middle;font-size:26px;${ult ? 'fill:#fff;fill-opacity:.9' : ''}">${sub}</text></g>`;
      if (i > 0) s += `<text class="big c comp" ${ritardo(t0 - .15)} x="${x - G / 2}" y="${Y + H / 2 + 22}" style="fill:var(--fg);fill-opacity:.6">${ops[i - 1]}</text>`;
    });
    if (d.barra) s += `<g class="comp" ${ritardo(2.0)}><text class="et c" x="828" y="${Y + H + 120}" style="text-anchor:middle;font-size:44px;fill:var(--fg)">importo promesso in partenza</text></g>
      <path class="tr" pathLength="1" d="M${828 - 330} ${Y + H + 106}H${828 + 330}" style="stroke:#D70328;stroke-width:8;animation-delay:2.5s;animation-duration:.6s"/>`;
    return svg(1656, Y + H + (d.barra ? 170 : 60), s);
  },

  // 6.1 · Tre persone, stessa rata (100 € al mese, 4% l'anno), partenze diverse:
  // 25, 35 e 45 anni, tutte in pensione a 67. n: curve visibili; fine: importi finali.
  partenze: d => {
    const n = d.n ?? 3, r = .04 / 12, rata = 100, A0 = 25, A1 = 67;
    const fv = m => rata * ((1 + r) ** m - 1) / r;
    const X0 = 170, X1 = 1240, Yb = 545, Yt = 80, MAX = 140000;
    const X = a => X0 + (a - A0) / (A1 - A0) * (X1 - X0), Y = v => Yb - v / MAX * (Yb - Yt);
    const tick = [25, 35, 45, 55, 67].map(a => `<path class="asse" d="M${n1(X(a))} ${Yb}v14"/>
      <text class="pic c" x="${n1(X(a))}" y="${Yb + 50}">${a} anni</text>`).join('');
    const pers = [[25, 'var(--tit)', 8, ''], [35, COMPL, 7, ''], [45, 'var(--fg)', 7, 'stroke-dasharray:1 2;']];
    let s = `<path class="asse" d="M${X0} ${Yb}H${X1 + 30}M${X0} ${Yb}V${Yt - 20}"/>${tick}`;
    pers.forEach(([a0, col, w, tr], i) => {
      if (i >= n) return;
      let c = `M${n1(X(a0))} ${Y(0)}`;
      for (let a = a0 + .5; a <= A1; a += .5) c += `L${n1(X(a))} ${n1(Y(fv((a - a0) * 12)))}`;
      const t0 = .3 + i * .5, fin = fv((A1 - a0) * 12);
      s += `<path class="tr" pathLength="1" d="${c}" style="stroke:${col};stroke-width:${w};${tr === '' ? '' : 'stroke-opacity:.75;'}animation-delay:${t0}s;animation-duration:1.5s"/>
        <circle class="punto pop" ${ritardo(t0 - .1)} cx="${n1(X(a0))}" cy="${Y(0)}" r="12" style="stroke:${col}"/>
        <text class="et c comp" ${ritardo(t0)} x="${n1(X(a0))}" y="${Yb + 100}" style="fill:${col};font-size:30px">inizia a ${a0}</text>`;
      if (d.fine) s += `<circle class="punto pop" ${ritardo(t0 + 1.4)} cx="${X(A1)}" cy="${n1(Y(fin))}" r="12" style="stroke:${col}"/>
        <text class="big comp" ${ritardo(t0 + 1.5)} x="${X(A1) + 30}" y="${n1(Y(fin) + 18)}" style="fill:${col};font-size:52px">≈ ${fmt(Math.round(fin / 1000) * 1000)} €</text>`;
    });
    s += `<text class="nota comp" ${ritardo(.5)} x="${X0 + 30}" y="${Yt + 10}">Esempio semplificato · 100 € al mese · 4% l'anno</text>`;
    return svg(1656, 680, s);
  },

  // 6.1 · Due barre a confronto (dati COVIP, medie di sistema). k: barre visibili.
  barre: d => {
    const k = d.k ?? 2, base = 520, S = 75, W = 260;
    const B = [['TFR', 2.5, '2,5%', 'var(--fg)'], ['Linee più azionarie', 5, '≈ 5%', CONTR]];
    let s = `<path d="M330 ${base}H1330" style="stroke:var(--tit);stroke-width:6"/>`;
    B.forEach(([t, v, l, col], i) => {
      if (i >= k) return;
      const x = 470 + i * 460, h = v * S, t0 = .2 + i * .6;
      s += `<g class="sali" ${ritardo(t0)}><rect x="${x}" y="${base - h}" width="${W}" height="${h}" rx="14" style="fill:${col};fill-opacity:${i ? .9 : .45}"/></g>
        <text class="big c comp" ${ritardo(t0 + .4)} x="${x + W / 2}" y="${base - h - 30}" style="fill:${i ? CONTR : 'var(--tit)'}">${l}</text>
        <text class="et c comp" ${ritardo(t0 + .3)} x="${x + W / 2}" y="${base + 52}" style="text-anchor:middle;font-size:32px">${t}</text>`;
    });
    s += `<text class="pic c comp" ${ritardo(.6)} x="828" y="${base + 110}" style="text-anchor:middle;font-size:26px">media annua 2015–2025 · dati di sistema, non di Perseo Sirio · fonte: COVIP</text>`;
    return svg(1656, base + 130, s);
  },

  // 6.2 · Due linee illustrative su vent'anni: più obbligazioni (calma) e più azioni
  // (a scatti). fase: 'linee' | 'anno' (la lente su un anno negativo) | 'venti'.
  linee: d => {
    const fase = d.fase ?? 'linee', N = 20;
    const ma = [1.12, .9, 1.14, 1.1, 1.08, 1.12, 1.05, .8, 1.2, 1.12, 1.09, 1.06, .86, 1.18, 1.1, 1.07, 1.11, .93, 1.12, 1.09];
    const az = [100], ob = [100];
    for (let i = 0; i < N; i++) { az.push(az[i] * ma[i]); ob.push(ob[i] * (1.024 + (i % 3 === 1 ? -.006 : .004))); }
    const X0 = 170, X1 = 1460, Yb = 560, Yt = 70, MIN = 80, MAX = Math.max(...az) * 1.05;
    const X = t => X0 + t / N * (X1 - X0), Y = v => Yb - (v - MIN) / (MAX - MIN) * (Yb - Yt);
    const path = a => a.map((v, i) => `${i ? 'L' : 'M'}${n1(X(i))} ${n1(Y(v))}`).join('');
    const tick = [0, 5, 10, 15, 20].map(t => `<path class="asse" d="M${n1(X(t))} ${Yb}v14"/>
      <text class="pic c" x="${n1(X(t))}" y="${Yb + 50}">${t === 0 ? 'oggi' : t + ' anni'}</text>`).join('');
    let s = `<path class="asse" d="M${X0} ${Yb}H${X1 + 30}M${X0} ${Yb}V${Yt - 20}"/>${tick}
      <path class="tr" pathLength="1" d="${path(ob)}" style="stroke:${COMPL};stroke-width:7;animation-delay:.2s;animation-duration:1.4s"/>
      <path class="tr" pathLength="1" d="${path(az)}" style="stroke:var(--tit);stroke-width:7;animation-delay:.5s;animation-duration:1.8s"/>
      <text class="et comp" ${ritardo(1.6)} x="${X(N) + 20}" y="${n1(Y(az[N]) + 10)}" style="font-size:30px">più azioni</text>
      <text class="et comp" ${ritardo(1.4)} x="${X(N) + 20}" y="${n1(Y(ob[N]) + 10)}" style="font-size:30px;fill:${COMPL}">più obbligazioni</text>
      <text class="nota comp" ${ritardo(.5)} x="${X0 + 30}" y="${Yt + 10}">Andamento illustrativo, non dati reali</text>`;
    if (fase === 'anno') {
      const a = 7, cx = X(a + .5), cy = (Y(az[a]) + Y(az[a + 1])) / 2, r = 120;
      s += `<g class="pop" ${ritardo(1.9)}><circle cx="${n1(cx)}" cy="${n1(cy)}" r="${r}" style="fill:var(--acc);fill-opacity:.08;stroke:var(--acc);stroke-width:7"/>
        <path d="M${n1(cx + r * .7)} ${n1(cy + r * .7)}l70 70" style="stroke:var(--acc);stroke-width:12;stroke-linecap:round"/></g>
        <text class="et c comp" ${ritardo(2.2)} x="${n1(cx)}" y="${n1(cy - r - 24)}" style="fill:var(--acc);font-size:36px">un anno: −20%</text>`;
    }
    if (fase === 'venti') s += `<g class="comp" ${ritardo(1.9)}><path d="M${X0} ${Yb + 95}H${X1}" style="stroke:var(--acc);stroke-width:5;stroke-dasharray:12 10"/>
        <path d="M${X0} ${Yb + 79}v32M${X1} ${Yb + 79}v32" style="stroke:var(--acc);stroke-width:5"/></g>
        <text class="et c comp" ${ritardo(2.1)} x="${(X0 + X1) / 2}" y="${Yb + 145}" style="fill:var(--acc);font-size:36px">vent'anni: conta la direzione</text>`;
    return svg(1656, fase === 'venti' ? 720 : 640, s);
  },

  // 6.2 · I versamenti regolari: 40 € al mese su un prezzo che scende e risale.
  // In basso, le quote comprate ogni mese (di più quando il prezzo è basso).
  // fase: 'prezzo' | 'quote'.
  pac: d => {
    const fase = d.fase ?? 'quote';
    const P = [10, 9, 8, 6.5, 5, 4, 4, 5, 6.5, 8, 9.5, 11];
    const N = P.length, X0 = 220, X1 = 1440, Yt = 60, Yb = 290, Q0 = 600;
    const X = i => X0 + i * (X1 - X0) / (N - 1), Y = p => Yb - (p - 3) / (12 - 3) * (Yb - Yt);
    let s = `<text class="pic e comp" ${ritardo(.1)} x="${X0 - 40}" y="${(Yt + Yb) / 2 + 10}" style="font-size:28px">prezzo</text>
      <path class="tr" pathLength="1" d="${P.map((p, i) => `${i ? 'L' : 'M'}${n1(X(i))} ${n1(Y(p))}`).join('')}" style="stroke:var(--tit);stroke-width:7;animation-delay:.2s;animation-duration:1.4s"/>
      <path class="asse" d="M${X0 - 20} ${Q0}H${X1 + 40}"/>
      <text class="pic e comp" ${ritardo(.1)} x="${X0 - 40}" y="${Q0 - 40}" style="font-size:28px">quote</text>`;
    P.forEach((p, i) => {
      const t = .4 + i * .14;
      s += `<g class="pop" ${ritardo(t)}><circle cx="${n1(X(i))}" cy="${Yb + 50}" r="20" style="fill:var(--acc)"/>
        <text class="et c" x="${n1(X(i))}" y="${Yb + 60}" style="fill:#fff;font-size:22px">€</text></g>`;
      if (fase === 'quote') {
        const q = Math.round(40 / p), bass = p <= 5;
        for (let k = 0; k < q; k++) s += `<rect class="sali" ${ritardo(t + .9 + k * .03)} x="${n1(X(i) - 22)}" y="${Q0 - 22 - k * 24}" width="44" height="20" rx="4" style="fill:${bass ? CONTR : 'var(--tit)'};fill-opacity:${bass ? .95 : .35}"/>`;
      }
    });
    s += `<text class="et comp" ${ritardo(.6)} x="${X1 + 40}" y="${Yb + 60}" style="font-size:30px;fill:var(--acc)">40 € al mese</text>`;
    if (fase === 'quote') s += `<text class="et c comp" ${ritardo(3.2)} x="${n1(X(5.5))}" y="${Q0 + 60}" style="fill:${CONTR};font-size:34px">quando scende, compri di più</text>`;
    s += `<text class="nota comp" ${ritardo(.5)} x="${X0}" y="${Yt - 20}">Esempio illustrativo</text>`;
    return svg(1656, Q0 + 90, s);
  },

  // 6.3 · I sei profili come barre: garantito (giallo tenue), obbligazionario (grigio),
  // azionario (verde). k: barre visibili; key: indice evidenziato. Il Life Cycle scorre.
  profili: d => {
    const k = d.k ?? 6, X0 = 470, W = 760, H = 58, G = 30, Y0 = 40;
    const GAR = '#E9D9A6', OBB = '#A9A49A';
    const P = [['Garantito', [[1, GAR]], 'fino a 5 anni'], ['Obbligazionario', [[1, OBB]], '5–10 anni'],
      ['Bilanciato Prudente', [[.7, OBB], [.3, CONTR]], 'oltre 10 anni'], ['Bilanciato Crescita', [[.5, OBB], [.5, CONTR]], 'oltre 15 anni'],
      ['Bilanciato Dinamico', [[.3, OBB], [.7, CONTR]], 'oltre 15 anni'], ['Life Cycle', null, 'cambia con l\'età']];
    let s = '';
    P.forEach(([n, parti, o], i) => {
      if (i >= k) return;
      const y = Y0 + i * (H + G), t = .2 + i * .3, on = d.key === i;
      s += `<text class="et e comp" ${ritardo(t)} x="${X0 - 30}" y="${y + 40}" style="font-size:34px;${on ? 'fill:var(--acc)' : ''}">${n}</text>`;
      if (parti) {
        let x = X0;
        parti.forEach(([q, c], j) => { s += `<rect class="x" ${ritardo(t + .1 + j * .25)} x="${x}" y="${y}" width="${n1(W * q)}" height="${H}" style="fill:${c};transform-origin:${x}px 0"/>`;
          if (q < 1) s += `<text class="et c comp" ${ritardo(t + .5)} x="${n1(x + W * q / 2)}" y="${y + 40}" style="fill:#fff;font-size:28px">${Math.round(q * 100)}%</text>`; x += W * q; });
      } else {
        s += `<g ${ritardo(t)} class="comp"><rect x="${X0}" y="${y}" width="${W}" height="${H}" style="fill:${OBB}"/>
          <rect x="${X0}" y="${y}" width="${W}" height="${H}" style="fill:${CONTR};transform-box:fill-box;transform-origin:left center;animation:pvLife 4s ease-in-out ${n1(t + .4)}s infinite alternate both"/></g>`;
      }
      s += `<rect x="${X0}" y="${y}" width="${W}" height="${H}" rx="6" class="comp" ${ritardo(t)} style="fill:none;stroke:${on ? 'var(--acc)' : 'var(--tit)'};stroke-width:${on ? 6 : 3}"/>
        <text class="pic comp" ${ritardo(t + .4)} x="${X0 + W + 30}" y="${y + 40}" style="font-size:30px">${o}</text>`;
    });
    s += `<g class="comp" ${ritardo(.1)}><rect x="${X0}" y="${Y0 + 6 * (H + G) + 4}" width="26" height="26" style="fill:${OBB}"/><text class="pic" x="${X0 + 36}" y="${Y0 + 6 * (H + G) + 26}" style="font-size:26px">obbligazioni</text>
      <rect x="${X0 + 230}" y="${Y0 + 6 * (H + G) + 4}" width="26" height="26" style="fill:${CONTR}"/><text class="pic" x="${X0 + 266}" y="${Y0 + 6 * (H + G) + 26}" style="font-size:26px">azioni</text>
      <rect x="${X0 + 400}" y="${Y0 + 6 * (H + G) + 4}" width="26" height="26" style="fill:${GAR}"/><text class="pic" x="${X0 + 436}" y="${Y0 + 6 * (H + G) + 26}" style="font-size:26px">garantito</text></g>`;
    return svg(1656, Y0 + 6 * (H + G) + 50, s);
  },

  // 6.4 · Il cursore Life Cycle (grafica ricorrente): la linea dell'età 20–67 in cinque
  // tratti, l'aereo all'età `a`, sopra la barra del mix azioni/obbligazioni.
  // fase: 'percorso' | 'due' (due aerei a 61 anni: pensione a 62 e a 67).
  lifecycle: d => {
    const fase = d.fase ?? 'percorso', a = d.a ?? 30, n = d.n ?? 5;
    const GAR = '#E9D9A6', OBB = '#A9A49A';
    const X0 = 140, X1 = 1500, A0 = fase === 'due' ? 42 : 20, A1 = fase === 'due' ? 68 : 67, X = e => X0 + (e - A0) / (A1 - A0) * (X1 - X0), Y = 420;
    const T = [[A0, 45.5, 'Azionario', 1, CONTR], [45.5, 50.5, 'Dinamico', .7, '#3F8A62'], [50.5, 55.5, 'Crescita', .5, '#7FA48C'],
      [55.5, 60.5, 'Prudente', .3, OBB], [60.5, A1, 'Garantito', 0, GAR]];
    const etaT = ['fino a 45', '46–50', '51–55', '56–60', 'da 61'];
    let s = '';
    T.forEach(([e0, e1, nome, az, col], i) => {
      if (i >= n) return;
      const x0 = X(e0), w = X(e1) - X(e0), t = .2 + i * .3, on = fase === 'percorso' && a >= e0 && a < e1;
      s += `<rect class="x" ${ritardo(t)} x="${n1(x0)}" y="${Y}" width="${n1(w)}" height="56" style="fill:${col};transform-origin:${n1(x0)}px 0;${on ? '' : 'fill-opacity:.75'}"/>
        <text class="et c comp" ${ritardo(t + .2)} x="${n1(x0 + w / 2)}" y="${Y + 100}" style="font-size:${on ? 34 : 28}px;${on ? 'fill:var(--acc)' : ''}">${nome}</text>
        <text class="pic c comp" ${ritardo(t + .3)} x="${n1(x0 + w / 2)}" y="${Y + 140}" style="font-size:26px">${etaT[i]}</text>`;
    });
    if (fase === 'percorso') {
      const seg = T.find(([e0, e1]) => a >= e0 && a < e1) ?? T[4], az = seg[3];
      const bx = 520, bw = 620, by = 120;
      s += `<g class="comp" ${ritardo(.9)}><rect x="${bx}" y="${by}" width="${n1(bw * az)}" height="70" style="fill:${CONTR}"/>
        <rect x="${n1(bx + bw * az)}" y="${by}" width="${n1(bw * (1 - az))}" height="70" style="fill:${az === 0 ? GAR : OBB}"/>
        <rect x="${bx}" y="${by}" width="${bw}" height="70" style="fill:none;stroke:var(--tit);stroke-width:3"/>
        <text class="et e" x="${bx - 24}" y="${by + 48}" style="font-size:32px">${seg[2]}</text>
        <text class="pic" x="${bx + bw + 24}" y="${by + 48}" style="font-size:30px">${az === 0 ? 'garantito' : Math.round(az * 100) + '% azioni'}</text></g>`;
      const xa = X(a);
      s += `<g style="animation:pvAppari .4s .6s both"><path d="M${n1(xa)} ${Y - 120}V${by + 90}" style="stroke:var(--acc);stroke-width:3;stroke-dasharray:8 8"/>
        <g transform="translate(${n1(xa)} ${Y - 26})"><path d="M-34 0L30 0L40 -8L30 -16L-10 -16L-24 -36L-34 -36L-26 -16L-34 -16Z" style="fill:var(--acc)"/></g>
        <text class="et c" x="${n1(xa)}" y="${Y - 84}" style="fill:var(--acc);font-size:34px">${a} anni</text></g>`;
    }
    if (fase === 'due') {
      const x61 = X(61), x62 = X(62), x67 = X(67);
      s += `<g class="comp" ${ritardo(1.5)}><path d="M${n1(x61)} ${Y - 150}H${n1(x62)}" style="stroke:var(--tit);stroke-width:8"/>
          <text class="et e" x="${n1(x61 - 20)}" y="${Y - 140}" style="font-size:30px">pensione a 62</text>
          <circle cx="${n1(x62)}" cy="${Y - 150}" r="12" style="fill:var(--tit)"/></g>
        <g class="comp" ${ritardo(2.0)}><path d="M${n1(x61)} ${Y - 70}H${n1(x67)}" style="stroke:var(--acc);stroke-width:8"/>
          <text class="et e" x="${n1(x61 - 20)}" y="${Y - 60}" style="font-size:30px;fill:var(--acc)">pensione a 67</text>
          <circle cx="${n1(x67)}" cy="${Y - 70}" r="12" style="fill:var(--acc)"/>
          <text class="pic c" x="${n1((x61 + x67) / 2)}" y="${Y - 90}" style="font-size:26px;fill:var(--acc)">6 anni nel Garantito</text></g>
        <path class="comp" ${ritardo(1.2)} d="M${n1(x61)} ${Y - 190}V${Y + 70}" style="stroke:var(--fg);stroke-width:3;stroke-dasharray:8 8"/>
        <text class="et c comp" ${ritardo(1.2)} x="${n1(x61)}" y="${Y - 210}" style="font-size:30px">61 anni</text>`;
    }
    return svg(1656, Y + 170, s);
  },

  // ---------- Lezione 6.6: lo switch ----------
  // Due barattoli (profilo di oggi, nuovo profilo) e il rubinetto dei versamenti.
  // fase 'base': posizione nel primo, rubinetto sul primo; 'tutto': la posizione
  // passa nel nuovo, con il rubinetto; 'futuro': la posizione resta, il rubinetto
  // si sposta sul nuovo e lì si accumulano solo i versamenti futuri.
  switch: d => {
    const fase = d.fase ?? 'base', base = 610, H = 360, W = 400, a = 30, n = 6;
    const J = [{ x: 260, t: 'Profilo di oggi', col: 'var(--tit)' }, { x: 996, t: 'Nuovo profilo', col: 'var(--acc)' }];
    const dx = J[1].x - J[0].x, rub = fase === 'base' ? 0 : 1;
    let s = '';
    J.forEach((j, i) => {
      s += `<g class="comp" ${ritardo(.2 + i * .2)}>
        <path d="M${j.x} ${base - H}v${H - 30}a30 30 0 0 0 30 30h${W - 60}a30 30 0 0 0 30-30v${-(H - 30)}"
          style="fill:color-mix(in srgb,${j.col} 6%,var(--bg));stroke:${j.col};stroke-width:7"/>
        <text class="et c" x="${j.x + W / 2}" y="${base + 62}" style="font-size:38px;fill:${j.col}">${j.t}</text></g>`;
    });
    // la posizione accumulata
    let pos = '';
    for (let k = 0; k < n; k++) {
      const y = base - 10 - (k + 1) * a;
      pos += `<rect class="y" style="animation-delay:${n1(.5 + k * .12)}s;fill:var(--tit)" x="${J[0].x + 16}" y="${y}" width="${W - 32}" height="${a - 5}" rx="6"/>`;
    }
    const sposta = fase === 'tutto';
    s += `<g style="${sposta ? `--dx:${dx}px;--dy:0px;animation:pvSposta 1.4s cubic-bezier(.4,0,.2,1) 1.6s both` : ''}">${pos}</g>`;
    s += `<text class="pic c comp" ${ritardo(1.1)} x="${J[0].x + W / 2 + (sposta ? dx : 0)}" y="${base - 10 - n * a - 22}" style="font-size:30px">la posizione accumulata</text>`;
    if (sposta) s += `<path class="tr" pathLength="1" d="M${J[0].x + W + 20} ${base - 120}H${J[1].x - 30}" style="stroke:var(--acc);stroke-width:8;animation-delay:1.3s"/>
      <path class="comp" ${ritardo(1.9)} d="M${J[1].x - 50} ${base - 140}l24 20l-24 20" style="fill:none;stroke:var(--acc);stroke-width:8;stroke-linecap:round;stroke-linejoin:round"/>
      <text class="et c comp" ${ritardo(1.6)} x="${(J[0].x + W + J[1].x) / 2}" y="${base - 160}" style="font-size:34px;fill:var(--acc)">sposti tutto</text>`;
    // versamenti futuri nel barattolo nuovo
    if (fase === 'futuro') for (let k = 0; k < 3; k++) {
      const y = base - 10 - (k + 1) * a;
      s += `<rect class="y" style="animation-delay:${n1(2.2 + k * .45)}s;fill:color-mix(in srgb,${CONTR} 45%,var(--bg))" x="${J[1].x + 16}" y="${y}" width="${W - 32}" height="${a - 5}" rx="6"/>`;
    }
    // il rubinetto
    const cx = J[rub].x + W / 2, ty = 70;
    const tubo = `<path d="M40 ${ty}H${cx}v50" style="fill:none;stroke:var(--fg);stroke-width:22;stroke-linecap:round;stroke-linejoin:round;opacity:.75"/>
      <rect x="${cx - 26}" y="${ty + 44}" width="52" height="22" rx="6" style="fill:var(--fg);opacity:.75"/>`;
    s += `<g class="comp" ${ritardo(fase === 'futuro' ? 1.4 : .3)}>${tubo}
      <text class="pic" x="60" y="${ty - 26}" style="font-size:30px">i versamenti di ogni mese</text></g>`;
    for (let k = 0; k < 3; k++) s += `<rect class="comp" ${ritardo((fase === 'futuro' ? 1.8 : .7) + k * .25)} x="${cx - 7}" y="${ty + 90 + k * 46}" width="14" height="26" rx="7" style="fill:${CONTR}"/>`;
    if (fase === 'futuro') s += `<text class="et c comp" ${ritardo(2.4)} x="${J[1].x + W / 2}" y="${base - 10 - 3 * a - 26}" style="font-size:32px;fill:var(--acc)">solo il futuro</text>`;
    return svg(1656, 700, s);
  },

  // ---------- Lezione 7.1: le operazioni gratuite ----------
  // Sette cartellini (quattro sopra, tre sotto); su ognuno compare un bollino verde «0 €».
  // k: quanti bollini compaiono (default 7); on: indici dei cartellini accesi (default tutti).
  gratis: d => {
    const V = ['Anticipazione', 'Riscatto', 'Trasferimento|per perdita requisiti', 'Trasferimento|volontario',
               'Cambio profilo|della posizione', 'Cambio profilo|dei versamenti', 'RITA'];
    const k = d.k ?? 7, on = d.on ?? V.map((_, i) => i), W = 360, H = 170, g = 36;
    let s = '';
    V.forEach((v, i) => {
      const riga = i < 4 ? 0 : 1, col = riga ? i - 4 : i, n = riga ? 3 : 4;
      const x0 = (1656 - (n * W + (n - 1) * g)) / 2, x = x0 + col * (W + g), y = 60 + riga * (H + 90);
      const acceso = on.includes(i), r = v.split('|');
      s += `<g style="opacity:${acceso ? 1 : .3}"><g class="comp" ${ritardo(.2 + i * .1)}>
        <rect x="${x}" y="${y}" width="${W}" height="${H}" rx="20" style="fill:color-mix(in srgb,var(--tit) 5%,var(--bg));stroke:var(--tit);stroke-width:4"/>
        <text class="et c" x="${x + W / 2}" y="${y + (r.length > 1 ? 78 : 98)}" style="font-size:36px;fill:var(--tit)">${r[0]}</text>
        ${r[1] ? `<text class="pic c" x="${x + W / 2}" y="${y + 122}" style="font-size:28px">${r[1]}</text>` : ''}</g></g>`;
      if (i < k) s += `<g class="pop" ${ritardo(1 + i * .35)} style="transform-box:fill-box;transform-origin:center">
        <rect x="${x + W - 90}" y="${y - 30}" width="120" height="60" rx="30" style="fill:${CONTR}"/>
        <text class="et c" x="${x + W - 30}" y="${y + 12}" style="font-size:34px;fill:#fff">0 €</text></g>`;
    });
    return svg(1656, 560, s);
  },

  // ---------- Lezione 7.2: l'imbuto dell'ISC ----------
  // A sinistra l'aderente tipo con le tre ipotesi COVIP; a destra i costi che entrano
  // in un imbuto e ne esce una sola percentuale, l'ISC.
  // fase 'ipotesi': solo l'aderente e le ipotesi; 'imbuto': anche i costi e l'ISC.
  imbuto: d => {
    const fase = d.fase ?? 'imbuto';
    const ip = ['versa 2.500 € l\'anno', 'rendimento ipotetico 4%', 'resta 2, 5, 10 o 35 anni'];
    let s = `<g class="comp" ${ritardo(.2)}>
      <circle cx="220" cy="190" r="58" style="fill:color-mix(in srgb,var(--tit) 8%,var(--bg));stroke:var(--tit);stroke-width:7"/>
      <path d="M110 430v-60a110 110 0 0 1 220 0v60" style="fill:color-mix(in srgb,var(--tit) 8%,var(--bg));stroke:var(--tit);stroke-width:7"/>
      <text class="et c" x="220" y="490" style="font-size:36px;fill:var(--tit)">l'aderente tipo</text></g>`;
    ip.forEach((t, i) => {
      s += `<g class="comp" ${ritardo(.7 + i * .5)}><rect x="400" y="${110 + i * 120}" width="460" height="80" rx="40" style="fill:color-mix(in srgb,${CONTR} 12%,var(--bg));stroke:${CONTR};stroke-width:4"/>
        <text class="et c" x="630" y="${162 + i * 120}" style="font-size:34px;fill:${CONTR}">${t}</text></g>`;
    });
    if (fase === 'imbuto') {
      const cx = 1300, t0 = 2.2;
      ['quota associativa', 'costi sul patrimonio'].forEach((t, i) => {
        s += `<g class="comp" ${ritardo(t0 + i * .4)}><rect x="${cx - 330 + i * 340}" y="30" width="320" height="70" rx="12" style="fill:var(--bg);stroke:var(--fg);stroke-width:3"/>
          <text class="pic c" x="${cx - 170 + i * 340}" y="76" style="font-size:30px">${t}</text></g>`;
      });
      s += `<path class="comp" ${ritardo(t0 + .9)} d="M${cx - 230} 140H${cx + 230}L${cx + 50} 330V420H${cx - 50}V330Z"
          style="fill:color-mix(in srgb,var(--tit) 10%,var(--bg));stroke:var(--tit);stroke-width:7;stroke-linejoin:round"/>
        <g class="pop" ${ritardo(t0 + 1.6)}><rect x="${cx - 110}" y="440" width="220" height="100" rx="20" style="fill:var(--acc)"/>
          <text class="et c" x="${cx}" y="506" style="font-size:52px;fill:#fff">ISC</text></g>
        <text class="pic c comp" ${ritardo(t0 + 2)} x="${cx}" y="590" style="font-size:30px">un solo numero, in % della posizione</text>`;
    }
    return svg(1656, 620, s);
  },

  // ---------- Lezione 7.3: tre curve, tre costi ----------
  // 2.000 € l'anno per 30 anni al 4% lordo, meno l'ISC medio COVIP (0,47 · 1,36 · 2,17%).
  // fase 'curve': solo le curve; 'esiti': con le cifre finali; 'area': con l'area tra la prima e l'ultima.
  costi: d => {
    const fase = d.fase ?? 'area', C = [.0047, .0136, .0217], N = 30;
    const L = ['fondi negoziali', 'fondi aperti', 'PIP'], E = ['≈ 107.000 €', '≈ 92.000 €', '≈ 80.000 €'];
    const col = [CONTR, COMPL, 'var(--acc)'];
    const x0 = 120, x1 = 1180, y0 = 600, y1 = 60, M = 115000;
    const px = t => x0 + (x1 - x0) * t / N, py = v => y0 - (y0 - y1) * v / M;
    const serie = C.map(c => { let v = 0; const a = [[0, 0]]; for (let t = 1; t <= N; t++) { v = (v + 2000) * (1 + .04 - c); a.push([t, v]); } return a; });
    const path = a => a.map(([t, v], i) => `${i ? 'L' : 'M'}${n1(px(t))} ${n1(py(v))}`).join('');
    let s = `<path d="M${x0} ${y1 - 20}V${y0}H${x1 + 20}" style="fill:none;stroke:var(--fg);stroke-width:3;opacity:.5"/>`;
    [0, 10, 20, 30].forEach(t => { s += `<text class="pic c" x="${px(t)}" y="${y0 + 44}" style="font-size:28px">${t ? t + ' anni' : 'oggi'}</text>`; });
    if (fase === 'area') {
      const a = serie[0], b = serie[2];
      s += `<path class="comp" ${ritardo(2.4)} d="${path(a)}${b.slice().reverse().map(([t, v]) => `L${n1(px(t))} ${n1(py(v))}`).join('')}Z" style="fill:color-mix(in srgb,var(--acc) 22%,transparent)"/>
        <g class="comp" ${ritardo(2.8)}><path d="M${px(26)} ${py(80000)}L${px(21)} ${py(98000)}" style="stroke:var(--acc);stroke-width:3"/>
        <text class="et" x="${px(21) - 12}" y="${py(98000) - 12}" style="font-size:40px;fill:var(--acc);text-anchor:end">≈ 27.000 € in meno</text></g>`;
    }
    serie.forEach((a, i) => { s += `<path class="tr" pathLength="1" d="${path(a)}" style="fill:none;stroke:${col[i]};stroke-width:8;animation-delay:.3s"/>`; });
    if (fase !== 'curve') serie.forEach((a, i) => {
      const v = a[N][1], y = py(v) + [-14, 22, 58][i];
      s += `<g class="comp" ${ritardo(1.6 + i * .25)}><text class="et" x="${x1 + 30}" y="${y}" style="font-size:36px;fill:${col[i]}">${E[i]}</text>
        <text class="pic" x="${x1 + 30}" y="${y + 34}" style="font-size:26px">${L[i]}</text></g>`;
    });
    s += `<text class="pic" x="${x0 + 20}" y="${y1 + 10}" style="font-size:26px">2.000 € l'anno · 4% lordo ipotetico · costi medi COVIP</text>`;
    return svg(1656, 680, s);
  },

  controlli: d => {
    const fase = d.fase ?? 'esterno', cx = 828, cy = 320;
    const seg = ['Collegio dei sindaci', 'Gestione dei rischi', 'Revisione interna'];
    // le etichette stanno fuori dal cerchio esterno: a destra, in basso, a sinistra
    const pos = [[cx + 345, cy - 120, 'start'], [cx, cy + 385, 'middle'], [cx - 345, cy - 120, 'end']];
    let g = `<circle class="pop" ${ritardo(.1)} cx="${cx}" cy="${cy}" r="84" style="fill:var(--tit)"/>
      <text class="et c comp" ${ritardo(.3)} x="${cx}" y="${cy + 11}" style="fill:#fff">il Fondo</text>`;
    seg.forEach((t, i) => {
      const a0 = -Math.PI / 2 + i * 2 * Math.PI / 3 + .07, a1 = a0 + 2 * Math.PI / 3 - .14, R = 150;
      const p = (a, r) => `${n1(cx + r * Math.cos(a))} ${n1(cy + r * Math.sin(a))}`;
      const [lx, ly, an] = pos[i];
      g += `<path class="tr" pathLength="1" d="M${p(a0, R)}A${R} ${R} 0 0 1 ${p(a1, R)}" style="stroke:${CONTR};stroke-width:40;stroke-linecap:butt;animation-delay:${n1(.5 + i * .3)}s"/>
        <text class="et comp" ${ritardo(.9 + i * .3)} x="${lx}" y="${ly}" style="text-anchor:${an}">${t}</text>`;
    });
    if (fase === 'esterno') g += `<circle class="tr" pathLength="1" cx="${cx}" cy="${cy}" r="320" transform="rotate(-90 ${cx} ${cy})" style="stroke:var(--acc);stroke-width:10;animation-delay:1.6s;animation-duration:1.2s"/>
      <g class="pop" ${ritardo(2.4)}><rect x="${cx - 95}" y="${cy - 352}" width="190" height="64" rx="32" style="fill:var(--acc)"/>
        <text class="et c" x="${cx}" y="${cy - 309}" style="fill:#fff">COVIP</text></g>`;
    return svg(1656, 730, g);
  },
};
