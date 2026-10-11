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
      <text class="et c" x="${vx + vw / 2}" y="${vy + vh + 50}">montante</text>`;
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
        <text class="et comp" ${ritardo(1.6)} x="${vx + vw + 140}" y="${top + 40}" style="fill:var(--acc)">+ rivalutazione</text>
        <text class="pic comp" ${ritardo(1.9)} x="${vx + vw + 140}" y="${top + 82}">legata al PIL,</text>
        <text class="pic comp" ${ritardo(1.9)} x="${vx + vw + 140}" y="${top + 116}">media di cinque anni</text>`;
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
