/*
 * Diagrammi del corso "Dire, ascoltare, convincere" — La Parola Giusta.
 *
 * Sette layout che DISEGNANO un'idea invece di scriverla. Si innestano su
 * slide_corso.mjs: stageFigure() viene provato per primo, e se non riconosce
 * il layout restituisce null e la palla passa ai layout di prima.
 *
 * Regola d'ingaggio, la stessa dei layout grafici: il disegno deve portare il
 * significato della frase che si sente in quel momento. Un diagramma che
 * illustra genericamente "la comunicazione" non serve e si toglie.
 *
 * Perche' parametrici e non SVG scritti a mano: un disegno scritto a mano
 * dentro il JSON non si puo' riusare, non si anima in modo coerente con gli
 * altri, e alla terza lezione ha gia' un'altra geometria. Qui si passano i
 * dati e la geometria e' sempre la stessa.
 *
 * Due cose imparate rifacendoli:
 *  - il testo dentro <text> NON va a capo da solo. Ogni etichetta passa da
 *    `righe()`, che la spezza in tspan e la centra sul suo blocco. Senza
 *    questo le celle dei quadranti si scrivevano una sopra l'altra.
 *  - i tracciati portano pathLength="100", cosi' l'animazione che li
 *    "scrive" usa sempre stroke-dasharray:100 qualunque sia la lunghezza
 *    vera del path. Senza, ogni curva vorrebbe il suo dasharray a mano.
 *
 * Il quadro utile e' 1500 x 470 (540 per i layout `alta`), cioe' un'unita'
 * SVG = un pixel: le misure qui dentro si leggono come quelle del CSS.
 */

const GOLD = '#C39A4E';
const W = 1500;

/* Catmull-Rom → Bezier: da una manciata di punti una curva morbida, senza
   dover scrivere le maniglie a mano. */
const smooth = (pts) => {
  let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] ?? p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6, c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6, c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C${c1x.toFixed(1)} ${c1y.toFixed(1)} ${c2x.toFixed(1)} ${c2y.toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return d;
};

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');

/* Spezza una stringa in righe da al massimo `max` caratteri, senza tagliare
   le parole. Se una parola da sola sfora, va lo stesso: meglio sbordare di
   poco che spezzare «irrigidendo» a meta'. */
const spezza = (txt, max) => {
  const out = [];
  let cur = '';
  for (const w of String(txt).split(/\s+/)) {
    if (cur && (cur + ' ' + w).length > max) { out.push(cur); cur = w; }
    else cur = cur ? cur + ' ' + w : w;
  }
  if (cur) out.push(cur);
  return out;
};

/* Etichetta multiriga centrata verticalmente sulla y data. */
const righe = (txt, { x, y, max = 26, dy = 44, cls = 'ft', sty = '' }) => {
  const ls = spezza(txt, max);
  const y0 = y - ((ls.length - 1) * dy) / 2;
  return `<text class="${cls}" ${sty ? `style="${sty}"` : ''} x="${x}" y="${y0.toFixed(1)}">${ls
    .map((l, i) => `<tspan x="${x}" ${i ? `dy="${dy}"` : ''}>${esc(l)}</tspan>`)
    .join('')}</text>`;
};

/* ===========================================================================
 * CSS
 * ======================================================================== */

const figureCss = (t) => `
  .fig { display:flex; justify-content:center; margin-top:2px; }
  .fig svg { width:1500px; height:470px; overflow:visible; }
  .fig.alta svg { height:540px; }

  .fl  { fill:none; stroke:${t.fg}; stroke-width:4;
         stroke-linecap:round; stroke-linejoin:round; }
  .fl.oro    { stroke:${GOLD}; }
  .fl.spessa { stroke-width:8; }
  .fl.tenue  { stroke-width:2.5; opacity:.30; }
  .fl.punti  { stroke-width:2.5; opacity:.42; stroke-dasharray:2 13; }

  .fq { fill:${t.fg}; }
  .fq.oro   { fill:${GOLD}; }
  .fq.velo  { fill:${t.fg}; opacity:.055; }
  .fq.veloro{ fill:${GOLD}; opacity:.15; }

  .ft { font-family:'Jost',sans-serif; font-weight:400; font-size:36px; fill:${t.fg}; }
  .ft.gr  { font-size:46px; font-weight:500; }
  .ft.pic { font-size:24px; letter-spacing:.24em; text-transform:uppercase;
            font-weight:600; fill:${GOLD}; }
  .ft.oro { fill:${GOLD}; font-weight:500; }
  .ft.min { font-size:30px; opacity:.5; }
  .ft.off { opacity:.34; }
  .ft.c   { text-anchor:middle; }
  .ft.r   { text-anchor:end; }
`;

/* ===========================================================================
 * 1. curva — un andamento con il punto di svolta segnato
 *    { punti:[[x,y]...] in 0..100, vertice:{x,et}, sx, dx, ciclo? }
 * ======================================================================== */

function curva(c) {
  const X0 = 70, X1 = 1430, Y0 = 380, Y1 = 60;
  const mx = (x) => X0 + (X1 - X0) * (x / 100);
  const my = (y) => Y0 - (Y0 - Y1) * (y / 100);
  const pts = c.punti.map(([x, y]) => [mx(x), my(y)]);
  const d = smooth(pts);

  let segno = '';
  if (c.vertice) {
    const i = c.punti.reduce((b, p, j) =>
      Math.abs(p[0] - c.vertice.x) < Math.abs(c.punti[b][0] - c.vertice.x) ? j : b, 0);
    const [vx, vy] = pts[i];
    segno = `
      <path class="fl punti vlin" d="M${vx} ${vy} V${Y0}"/>
      <circle class="fq oro vert" cx="${vx}" cy="${vy}" r="12"/>
      ${righe(c.vertice.et, { x: vx, y: vy - 40, max: 22, dy: 40, cls: 'ft oro c vet' })}`;
  }

  /* Il pallino che percorre la curva: si usa solo quando la lezione parla del
     movimento, non della forma. Vedi `ciclo` in clips_corso.mjs. */
  const viagg = c.ciclo
    ? `<circle class="fq oro viagg" r="14" style="offset-path:path('${d}'); offset-rotate:0deg"/>` : '';

  return `<div class="fig"><svg viewBox="0 0 ${W} 470">
    <path class="fl tenue asse" d="M${X0} ${Y0} H${X1}"/>
    <path class="fl oro spessa dis" pathLength="100" d="${d}"/>
    ${segno}${viagg}
    ${c.sx ? `<text class="ft pic eti" x="${X0}" y="${Y0 + 56}">${esc(c.sx)}</text>` : ''}
    ${c.dx ? `<text class="ft pic r eti" x="${X1}" y="${Y0 + 56}">${esc(c.dx)}</text>` : ''}
  </svg></div>`;
}

/* ===========================================================================
 * 2. finestra — quanto dura la parte che conta, sul totale
 *    { quota:0..100, et, coda }
 * ======================================================================== */

function finestra(c) {
  const X0 = 70, X1 = 1430, Y = 176, H = 124;
  const L = X1 - X0, w = L * (c.quota / 100);
  return `<div class="fig"><svg viewBox="0 0 ${W} 470">
    <rect class="fq velo tutto" x="${X0}" y="${Y}" width="${L}" height="${H}"/>
    <path class="fl tenue tutto" d="M${X0} ${Y} h${L} v${H} h${-L} Z"/>
    <rect class="fq oro fin" x="${X0}" y="${Y}" width="${w}" height="${H}"/>
    <path class="fl oro graffa" pathLength="100"
          d="M${X0} ${Y - 30} V${Y - 54} H${(X0 + w).toFixed(1)} V${Y - 30}"/>
    ${righe(c.et, { x: X0 + w / 2, y: Y - 88, max: 30, dy: 40, cls: 'ft oro c etf' })}
    ${c.coda ? `<text class="ft off etc" x="${(X0 + w + 44).toFixed(1)}" y="${Y + H / 2 + 13}">${esc(c.coda)}</text>` : ''}
  </svg></div>`;
}

/* ===========================================================================
 * 3. quadranti — due assi, quattro caselle, una accesa
 *    { xet, yet, celle:[alto-sx, alto-dx, basso-sx, basso-dx], acceso }
 * ======================================================================== */

function quadranti(c) {
  const X0 = 190, X1 = 1400, Y0 = 30, Y1 = 390;
  const mx = (X0 + X1) / 2, my = (Y0 + Y1) / 2;
  const box = [[X0, Y0, mx, my], [mx, Y0, X1, my], [X0, my, mx, Y1], [mx, my, X1, Y1]];
  const celle = c.celle.map((et, i) => {
    const [a, b, x, y] = box[i];
    const on = c.acceso === i;
    return `${on ? `<rect class="fq veloro acc" x="${a}" y="${b}" width="${x - a}" height="${y - b}"/>` : ''}
      ${righe(et, { x: (a + x) / 2, y: (b + y) / 2 + 12, max: 24, dy: 44,
                    cls: `ft c cel ${on ? 'oro' : 'off'}`, sty: `--i:${i}` })}`;
  }).join('');

  return `<div class="fig"><svg viewBox="0 0 ${W} 470">
    <path class="fl tenue riq" d="M${X0} ${Y0} H${X1} V${Y1} H${X0} Z"/>
    <path class="fl oro ax" pathLength="100" d="M${mx} ${Y0} V${Y1}"/>
    <path class="fl oro ay" pathLength="100" d="M${X0} ${my} H${X1}"/>
    ${celle}
    ${c.yet ? `<text class="ft pic c ei" x="${X0 - 46}" y="${my}"
        transform="rotate(-90 ${X0 - 46} ${my})">${esc(c.yet)}</text>` : ''}
    ${c.xet ? `<text class="ft pic c ei" x="${mx}" y="${Y1 + 56}">${esc(c.xet)}</text>` : ''}
  </svg></div>`;
}

/* ===========================================================================
 * 4. flusso — passi in catena, con le frecce fra uno e l'altro
 *    { passi:[{et, sub}], acceso }
 * ======================================================================== */

function flusso(c) {
  const n = c.passi.length, GAP = 86, X0 = 10, X1 = 1490;
  const B = (X1 - X0 - GAP * (n - 1)) / n, Y = 108, H = 232;
  const parti = c.passi.map((p, i) => {
    const x = X0 + i * (B + GAP), on = c.acceso == null || c.acceso === i;
    const freccia = i < n - 1 ? `
      <g class="fre" style="--i:${i}">
        <path class="fl oro" pathLength="100" d="M${x + B + 18} ${Y + H / 2} H${x + B + GAP - 18}"/>
        <path class="fl oro" pathLength="100" d="M${x + B + GAP - 38} ${Y + H / 2 - 14} l20 14 -20 14"/>
      </g>` : '';
    return `<g class="pas" style="--i:${i}">
      <rect class="fq ${on ? 'veloro' : 'velo'}" x="${x}" y="${Y}" width="${B}" height="${H}" rx="3"/>
      <path class="fl ${on ? 'oro' : 'tenue'}" d="M${x} ${Y} h${B} v${H} h${-B} Z"/>
      <text class="ft pic c" x="${x + B / 2}" y="${Y + 56}">${String(i + 1).padStart(2, '0')}</text>
      ${righe(p.et, { x: x + B / 2, y: Y + 126, max: 18, dy: 50, cls: `ft gr c ${on ? '' : 'off'}` })}
      ${p.sub ? righe(p.sub, { x: x + B / 2, y: Y + 190, max: 24, dy: 36, cls: 'ft min c' }) : ''}
    </g>${freccia}`;
  }).join('');
  return `<div class="fig"><svg viewBox="0 0 ${W} 470">${parti}</svg></div>`;
}

/* ===========================================================================
 * 5. strati — quello che si dice, e quello che c'e' sotto
 *    { sopra, sotto:[...] }
 * ======================================================================== */

function strati(c) {
  const X0 = 150, X1 = 1350, H = 86, GAP = 18;
  const YS = 40, LIN = YS + H + 54;
  const sotto = c.sotto.map((et, i) => {
    const y = LIN + 44 + i * (H + GAP);
    return `<g class="str" style="--i:${i}">
      <rect class="fq velo" x="${X0 + 56}" y="${y}" width="${X1 - X0 - 112}" height="${H}"/>
      <path class="fl tenue" d="M${X0 + 56} ${y} h${X1 - X0 - 112} v${H} h${-(X1 - X0 - 112)} Z"/>
      <text class="ft" x="${X0 + 100}" y="${y + H / 2 + 13}">${esc(et)}</text>
    </g>`;
  }).join('');
  return `<div class="fig alta"><svg viewBox="0 0 ${W} 540">
    <g class="sup">
      <rect class="fq veloro" x="${X0}" y="${YS}" width="${X1 - X0}" height="${H}"/>
      <path class="fl oro" d="M${X0} ${YS} h${X1 - X0} v${H} h${-(X1 - X0)} Z"/>
      <text class="ft gr oro" x="${X0 + 44}" y="${YS + H / 2 + 15}">${esc(c.sopra)}</text>
    </g>
    <g class="lin">
      <path class="fl oro punti" pathLength="100" d="M${X0 - 40} ${LIN} H${X1 + 40}"/>
      <text class="ft pic r" x="${X1 + 40}" y="${LIN - 22}">sotto</text>
    </g>
    ${sotto}
  </svg></div>`;
}

/* ===========================================================================
 * 6. pila — quello che si accumula, un blocco alla volta
 *    { blocchi:[...] }
 * ======================================================================== */

function pila(c) {
  const n = c.blocchi.length, B = 700, X = (W - B) / 2, H = 82, GAP = 14, BASE = 400;
  const bl = c.blocchi.map((et, i) => {
    const y = BASE - (i + 1) * (H + GAP);
    return `<g class="blo" style="--i:${i}">
      <rect class="fq ${i === n - 1 ? 'veloro' : 'velo'}" x="${X}" y="${y}" width="${B}" height="${H}"/>
      <path class="fl ${i === n - 1 ? 'oro' : 'tenue'}" d="M${X} ${y} h${B} v${H} h${-B} Z"/>
      <text class="ft c" x="${X + B / 2}" y="${y + H / 2 + 13}">${esc(et)}</text>
    </g>`;
  }).join('');
  return `<div class="fig"><svg viewBox="0 0 ${W} 470">
    <path class="fl oro base" d="M${X - 70} ${BASE} H${X + B + 70}"/>
    ${bl}
  </svg></div>`;
}

/* ===========================================================================
 * 7. termometro — una scala verticale con il livello e le tacche
 *    { livello:0..100, tacche:[{a, et}], ciclo? }
 * ======================================================================== */

function termometro(c) {
  const X = 250, B = 84, Y0 = 396, Y1 = 46, R = B / 2;
  const my = (v) => Y0 - (Y0 - Y1) * (v / 100);
  const h = Y0 - my(c.livello);
  const tacche = (c.tacche ?? []).map((t, i) => `<g class="tac" style="--i:${i}">
    <path class="fl tenue" d="M${X - 30} ${my(t.a)} H${X + B + 30}"/>
    <text class="ft" x="${X + B + 64}" y="${my(t.a) + 13}">${esc(t.et)}</text>
  </g>`).join('');
  return `<div class="fig"><svg viewBox="0 0 ${W} 470">
    <rect class="fq velo" x="${X}" y="${Y1}" width="${B}" height="${Y0 - Y1}" rx="${R}"/>
    <clipPath id="tubo"><rect x="${X}" y="${Y1}" width="${B}" height="${Y0 - Y1}" rx="${R}"/></clipPath>
    <g clip-path="url(#tubo)">
      <rect class="fq oro liv" x="${X}" y="${my(c.livello)}" width="${B}" height="${h + R}"/>
    </g>
    <path class="fl tenue" d="M${X} ${Y1 + R} a${R} ${R} 0 0 1 ${B} 0 v${Y0 - Y1 - B} a${R} ${R} 0 0 1 ${-B} 0 Z"/>
    ${tacche}
  </svg></div>`;
}

/* ======================================================================== */

const disegni = { curva, finestra, quadranti, flusso, strati, pila, termometro };

function stageFigure(c) {
  const f = disegni[c.layout];
  if (!f) return null;
  const kicker = c.kicker ? `<div class="kicker">${c.kicker}</div>` : '';
  const note = c.note ? `<div class="note">${c.note}</div>` : '';
  const tit = c.title
    ? `<div class="didascalia" style="text-align:center;max-width:none">${c.title}</div>` : '';
  return `<div class="stage graf">${kicker}${f(c)}${tit}${note}</div>`;
}

export { figureCss, stageFigure, disegni };
