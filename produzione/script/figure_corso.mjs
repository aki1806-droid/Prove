/*
 * Diagrammi del corso "Dire, ascoltare, convincere" — La Parola Giusta.
 *
 * Quindici layout che DISEGNANO un'idea invece di scriverla. Si innestano su
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
 * LA REGOLA CHE COSTA PIU' CARA: un elemento con una campitura debole
 * (`velo`, `veloro`, `tenue`, `punti`, `min`, `off`) non si anima MAI
 * direttamente con `velo` o `cresci`. Quei fotogrammi chiave finiscono a
 * `opacity: 1` e sovrascrivono l'opacita' della classe, quindi la velatura
 * diventa tinta piena. Sulla casella accesa dei quadranti il rettangolo
 * diventava oro pieno e si mangiava la propria etichetta. Si anima il
 * gruppo <g> che lo contiene: li' l'opacita' si moltiplica invece di
 * sostituirsi.
 *
 * Tre cose imparate rifacendoli:
 *  - il testo dentro <text> NON va a capo da solo. Ogni etichetta passa da
 *    `righe()`, che la spezza in tspan e la centra sul suo blocco. Senza
 *    questo le celle dei quadranti si scrivevano una sopra l'altra.
 *  - i tracciati portano pathLength="100", cosi' l'animazione che li
 *    "scrive" usa sempre stroke-dasharray:100 qualunque sia la lunghezza
 *    vera del path. Senza, ogni curva vorrebbe il suo dasharray a mano.
 *
 * Il quadro utile e' 1500 x 470 (540 per i layout `alta`), cioe' un'unita'
 * SVG = un pixel: le misure qui dentro si leggono come quelle del CSS.
 *
 * Quali sono e quando si usano:
 *   flusso      passi in catena, dove conta l'ordine
 *   bivio       stesso inizio, due strade che finiscono diverse
 *   anello      un giro che si richiude: non finisce mai         (ciclo)
 *   pila        quello che si accumula, un blocco alla volta
 *   strati      quello che si dice sopra, quello che c'e' sotto
 *   quadranti   due assi, quattro casi, uno solo buono
 *   bilancia    due cose sullo stesso piatto, e quale pesa       (ciclo)
 *   imbuto      molte cose entrano, ne esce una                  (ciclo)
 *   ponte       due sponde, la distanza, e cosa la copre
 *   linea       momenti in sequenza sul tempo                    (ciclo)
 *   curva       un andamento con il punto di svolta              (ciclo)
 *   termometro  una scala che sale, con le tacche                (ciclo)
 *   finestra    una parte stretta contro il totale
 *   barre       quanto pesa una cosa rispetto alle altre
 *   raggi       cosa sta al centro e cosa gli gira attorno
 *
 * `ciclo: N` (vedi clips_corso.mjs) rende la clip lunga N secondi con un
 * movimento che non si ferma. Si usa SOLO dove il movimento e' il contenuto.
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
  .fq.mezzo { fill:${t.fg}; opacity:.20; }
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

  /* Il segnalino che viaggia e' dell'inchiostro, non oro: oro su tracciato
     oro si confonde con i punti fermi della figura, e quello che deve
     saltare all'occhio e' proprio l'unica cosa che si muove.
     I segnalini esistono solo nella clip ciclica, dove
     ciclico() li riaccende. Sulla slide ferma sarebbero un punto immobile
     all'inizio del percorso: sulla linea coprirebbe il primo momento. */
  .viagg, .giro, .scor, .goc { opacity:0; }
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
      <g class="vlin"><path class="fl punti" d="M${vx} ${vy} V${Y0}"/></g>
      <circle class="fq oro vert" cx="${vx}" cy="${vy}" r="12"/>
      ${righe(c.vertice.et, { x: vx, y: vy - 40, max: 22, dy: 40, cls: 'ft oro c vet' })}`;
  }

  /* Il pallino che percorre la curva: si usa solo quando la lezione parla del
     movimento, non della forma. Vedi `ciclo` in clips_corso.mjs. */
  const viagg = c.ciclo
    ? `<circle class="fq viagg" r="16" style="offset-path:path('${d}'); offset-rotate:0deg"/>` : '';

  return `<div class="fig"><svg viewBox="0 0 ${W} 470">
    <g class="asse"><path class="fl tenue" d="M${X0} ${Y0} H${X1}"/></g>
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
    <g class="tutto">
      <rect class="fq velo" x="${X0}" y="${Y}" width="${L}" height="${H}"/>
      <path class="fl tenue" d="M${X0} ${Y} h${L} v${H} h${-L} Z"/>
    </g>
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
    return `${on ? `<g class="acc"><rect class="fq veloro" x="${a}" y="${b}" width="${x - a}" height="${y - b}"/></g>` : ''}
      ${righe(et, { x: (a + x) / 2, y: (b + y) / 2 + 12, max: 24, dy: 44,
                    cls: `ft c cel ${on ? '' : 'off'}`, sty: `--i:${i}` })}`;
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
  /* la geometria si stringe quando le voci sono tante: con quattro voci a
     misura fissa l'ultima cassetta finiva fuori dal quadro */
  const n = c.sotto.length, fitto = n >= 4;
  const X0 = 150, X1 = 1350, H = fitto ? 72 : 86, GAP = fitto ? 12 : 18;
  const YS = fitto ? 24 : 40, STACCO = fitto ? 30 : 44;
  const LIN = YS + H + (fitto ? 46 : 54);
  const sotto = c.sotto.map((et, i) => {
    const y = LIN + STACCO + i * (H + GAP);
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
 *    { blocchi:[...], acceso? }
 *    Con `acceso` si illumina un blocco solo e si spengono gli altri: la
 *    geometria non si muove di un pixel fra una slide e l'altra, quindi
 *    ripetendo la stessa pila con `acceso` diverso il taglio non si vede e
 *    sembra che si accenda un pezzo alla volta dentro lo stesso disegno.
 * ======================================================================== */

function pila(c) {
  const n = c.blocchi.length, B = 700, X = (W - B) / 2, H = 82, GAP = 14, BASE = 400;
  const bl = c.blocchi.map((et, i) => {
    const y = BASE - (i + 1) * (H + GAP);
    const on = c.acceso == null ? i === n - 1 : c.acceso === i;
    const spento = c.acceso != null && !on;
    return `<g class="blo" style="--i:${i}">
      <rect class="fq ${on ? 'veloro' : 'velo'}" x="${X}" y="${y}" width="${B}" height="${H}"/>
      <path class="fl ${on ? 'oro' : 'tenue'}" d="M${X} ${y} h${B} v${H} h${-B} Z"/>
      <text class="ft c ${spento ? 'off' : ''}" x="${X + B / 2}" y="${y + H / 2 + 13}">${esc(et)}</text>
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

/* ===========================================================================
 * 8. bivio — stesso punto di partenza, due strade che finiscono diverse
 *    { da, rami:[{et, sub}], acceso? }
 * ======================================================================== */

function bivio(c) {
  const XS = 20, BS = 300, YS = 175, HS = 120, CY = YS + HS / 2;
  const XR = 640, BR = 840, HR = 170, YA = 25, YB = 275;
  const arco = (y) => `M${XS + BS} ${CY} C${XS + BS + 150} ${CY} ${XR - 150} ${y + HR / 2} ${XR} ${y + HR / 2}`;

  const rami = c.rami.map((r, i) => {
    const y = i === 0 ? YA : YB;
    const on = c.acceso == null || c.acceso === i;
    return `<g class="ram" style="--i:${i}">
      <rect class="fq ${on ? 'veloro' : 'velo'}" x="${XR}" y="${y}" width="${BR}" height="${HR}" rx="3"/>
      <path class="fl ${on ? 'oro' : 'tenue'}" d="M${XR} ${y} h${BR} v${HR} h${-BR} Z"/>
      ${righe(r.et, { x: XR + BR / 2, y: y + 66, max: 30, dy: 48, cls: `ft gr c ${on ? '' : 'off'}` })}
      ${r.sub ? righe(r.sub, { x: XR + BR / 2, y: y + 124, max: 40, dy: 36, cls: 'ft min c' }) : ''}
    </g>`;
  }).join('');

  return `<div class="fig"><svg viewBox="0 0 ${W} 470">
    <g class="par">
      <rect class="fq velo" x="${XS}" y="${YS}" width="${BS}" height="${HS}" rx="3"/>
      <path class="fl tenue" d="M${XS} ${YS} h${BS} v${HS} h${-BS} Z"/>
      ${righe(c.da, { x: XS + BS / 2, y: CY + 8, max: 18, dy: 42, cls: 'ft c' })}
    </g>
    <path class="fl oro str1" pathLength="100" d="${arco(YA)}"/>
    <path class="fl oro str2" pathLength="100" d="${arco(YB)}"/>
    ${rami}
  </svg></div>`;
}

/* ===========================================================================
 * 9. anello — un giro che si richiude su se stesso
 *    { passi:[...], ciclo? }
 *    Con `ciclo` un pallino percorre l'anello all'infinito: e' il layout dove
 *    il movimento serve davvero, perche' il punto e' che non finisce mai.
 * ======================================================================== */

function anello(c) {
  /* quadro alto: le etichette stanno FUORI dal cerchio sopra e sotto, quindi
     serve 2*(R + stacco) + due righe di testo. Con 470 quella in basso
     finiva addosso alla didascalia. */
  const CX = 750, CY = 268, R = 146, RL = R + 82;
  const n = c.passi.length;
  const ang = (i) => (-90 + (360 / n) * i) * Math.PI / 180;
  const giro = `M${CX} ${CY - R} a${R} ${R} 0 1 1 -0.1 0`;

  const nodi = c.passi.map((et, i) => {
    const a = ang(i), x = CX + R * Math.cos(a), y = CY + R * Math.sin(a);
    const lx = CX + RL * Math.cos(a), ly = CY + RL * Math.sin(a);
    /* l'ancoraggio segue la posizione sul cerchio: a destra il testo parte,
       a sinistra finisce, in alto e in basso e' centrato */
    const cs = Math.cos(a);
    const anc = cs > 0.3 ? '' : cs < -0.3 ? 'r' : 'c';
    return `<g class="nod" style="--i:${i}">
      <circle class="fq oro" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="13"/>
      ${righe(et, { x: Number(lx.toFixed(1)), y: Number(ly.toFixed(1)) + 10,
                    max: 20, dy: 40, cls: `ft ${anc}` })}
    </g>`;
  }).join('');

  /* le punte di freccia stanno a meta' strada fra un nodo e il successivo,
     ruotate sulla tangente */
  const punte = c.passi.map((_, i) => {
    const a = ang(i) + (Math.PI / n);
    const x = CX + R * Math.cos(a), y = CY + R * Math.sin(a);
    const g = (a * 180) / Math.PI + 90;
    return `<path class="fl oro pun" style="--i:${i}" d="M-13 -10 l13 10 -13 10"
      transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${g.toFixed(1)})"/>`;
  }).join('');

  const viagg = c.ciclo
    ? `<circle class="fq giro" r="16" style="offset-path:path('${giro}'); offset-rotate:0deg"/>` : '';

  return `<div class="fig alta"><svg viewBox="0 0 ${W} 540">
    <path class="fl oro spessa ring" pathLength="100" d="${giro}"/>
    ${punte}${nodi}${viagg}
  </svg></div>`;
}

/* ===========================================================================
 * 10. bilancia — due cose sullo stesso piatto, e quale pesa
 *     { sx:{et,peso}, dx:{et,peso}, ciclo? }
 *     La geometria e' gia' inclinata; l'animazione parte da `--a`, che e'
 *     l'inclinazione opposta, cioe' dalla posizione in pari.
 * ======================================================================== */

function bilancia(c) {
  const FX = 750, FY = 150, BRAC = 300, BASE = 400;
  const d = (c.dx.peso ?? 1) - (c.sx.peso ?? 1);
  const g = Math.max(-13, Math.min(13, d * 2.6));       // gradi, destra giu'
  const r = (g * Math.PI) / 180;
  const ex = BRAC * Math.cos(r), ey = BRAC * Math.sin(r);
  const L = [FX - ex, FY - ey], D = [FX + ex, FY + ey];

  const piatto = (p, lato, et) => `
    <g class="pia" style="--i:${lato}">
      <path class="fl tenue" d="M${p[0].toFixed(1)} ${p[1].toFixed(1)} v56"/>
      <path class="fl oro" d="M${(p[0] - 96).toFixed(1)} ${(p[1] + 56).toFixed(1)}
            q96 62 192 0"/>
      ${righe(et, { x: Number(p[0].toFixed(1)), y: Number(p[1].toFixed(1)) + 172,
                    max: 22, dy: 40, cls: 'ft c' })}
    </g>`;

  return `<div class="fig"><svg viewBox="0 0 ${W} 470">
    <g class="gio" style="--a:${(-g).toFixed(2)}deg">
      <path class="fl oro spessa" d="M${L[0].toFixed(1)} ${L[1].toFixed(1)} L${D[0].toFixed(1)} ${D[1].toFixed(1)}"/>
      ${piatto(L, 0, c.sx.et)}${piatto(D, 1, c.dx.et)}
    </g>
    <g class="col"><path class="fl tenue" d="M${FX} ${FY} V${BASE}"/></g>
    <path class="fl oro base" d="M${FX - 110} ${BASE} H${FX + 110}"/>
    <circle class="fq oro perno" cx="${FX}" cy="${FY}" r="11"/>
  </svg></div>`;
}

/* ===========================================================================
 * 11. imbuto — molte cose entrano, ne esce una
 *     { dentro:[...], fuori, ciclo? }
 * ======================================================================== */

function imbuto(c) {
  const n = c.dentro.length, X0 = 150, X1 = 1350, GAP = 26;
  const B = (X1 - X0 - GAP * (n - 1)) / n, YC = 40, HC = 88;
  const IM0 = 176, IM1 = 1324, GO = 170, IY0 = 168, IY1 = 384, NY = 448;

  const chip = c.dentro.map((et, i) => {
    const x = X0 + i * (B + GAP);
    return `<g class="chi" style="--i:${i}">
      <rect class="fq velo" x="${x.toFixed(1)}" y="${YC}" width="${B.toFixed(1)}" height="${HC}" rx="3"/>
      <path class="fl tenue" d="M${x.toFixed(1)} ${YC} h${B.toFixed(1)} v${HC} h${(-B).toFixed(1)} Z"/>
      ${righe(et, { x: Number((x + B / 2).toFixed(1)), y: YC + HC / 2 + 10,
                    max: 22, dy: 36, cls: 'ft min c' })}
    </g>`;
  }).join('');

  const cono = `M${IM0} ${IY0} H${IM1} L${750 + GO / 2} ${IY1} V${NY} H${750 - GO / 2} V${IY1} Z`;
  const cade = c.ciclo
    ? [0, 1, 2].map((i) => `<circle class="fq oro goc" style="--i:${i}" cx="750" cy="${IY0}" r="9"/>`).join('')
    : '';

  return `<div class="fig alta"><svg viewBox="0 0 ${W} 540">
    ${chip}
    <g class="imbf"><path class="fq velo" d="${cono}"/></g>
    <path class="fl oro imb" pathLength="100" d="${cono}"/>
    ${cade}
    <g class="esi">
      <rect class="fq veloro" x="450" y="${NY + 34}" width="600" height="88" rx="3"/>
      <path class="fl oro" d="M450 ${NY + 34} h600 v88 h-600 Z"/>
      ${righe(c.fuori, { x: 750, y: NY + 92, max: 30, dy: 42, cls: 'ft gr c' })}
    </g>
  </svg></div>`;
}

/* ===========================================================================
 * 12. ponte — due sponde, la distanza in mezzo, e cosa la copre
 *     { sx, dx, vuoto, ponte }
 * ======================================================================== */

function ponte(c) {
  const BS = 340, XA = 80, XB = W - 80 - BS, YP = 250, HP = 180;
  const A = XA + BS, B2 = XB;
  const arco = `M${A} ${YP} C${A + 180} ${YP - 190} ${B2 - 180} ${YP - 190} ${B2} ${YP}`;
  const spo = (x, et) => `
    <g class="spo">
      <rect class="fq velo" x="${x}" y="${YP}" width="${BS}" height="${HP}"/>
      <path class="fl tenue" d="M${x} ${YP} h${BS} v${HP} h${-BS} Z"/>
      ${righe(et, { x: x + BS / 2, y: YP + HP / 2 + 10, max: 20, dy: 42, cls: 'ft c' })}
    </g>`;

  return `<div class="fig"><svg viewBox="0 0 ${W} 470">
    ${spo(XA, c.sx)}${spo(XB, c.dx)}
    <g class="vuo">
      <path class="fl punti" d="M${A + 20} ${YP + HP - 34} H${B2 - 20}"/>
      <path class="fl punti" d="M${A + 20} ${YP + HP - 48} v28"/>
      <path class="fl punti" d="M${B2 - 20} ${YP + HP - 48} v28"/>
      <text class="ft pic c" x="${(A + B2) / 2}" y="${YP + HP + 14}">${esc(c.vuoto)}</text>
    </g>
    <path class="fl oro spessa arc" pathLength="100" d="${arco}"/>
    ${c.ponte ? righe(c.ponte, { x: (A + B2) / 2, y: YP - 168, max: 30, dy: 42, cls: 'ft gr oro c pnt' }) : ''}
  </svg></div>`;
}

/* ===========================================================================
 * 13. linea — momenti in sequenza sul tempo
 *     { momenti:[{a:0..100, et, sub}], sx, dx, ciclo? }
 * ======================================================================== */

function linea(c) {
  const X0 = 110, X1 = 1390, Y = 250;
  const mx = (a) => X0 + (X1 - X0) * (a / 100);
  const asse = `M${X0} ${Y} H${X1}`;

  const mom = c.momenti.map((m, i) => {
    const x = mx(m.a);
    return `<g class="mom" style="--i:${i}">
      <path class="fl oro" d="M${x.toFixed(1)} ${Y - 26} v52"/>
      <circle class="fq oro" cx="${x.toFixed(1)}" cy="${Y}" r="12"/>
      ${righe(m.et, { x: Number(x.toFixed(1)), y: Y - 76, max: 20, dy: 40, cls: 'ft c' })}
      ${m.sub ? righe(m.sub, { x: Number(x.toFixed(1)), y: Y + 96, max: 24, dy: 34, cls: 'ft min c' }) : ''}
    </g>`;
  }).join('');

  const viagg = c.ciclo
    ? `<circle class="fq scor" r="16" style="offset-path:path('${asse}'); offset-rotate:0deg"/>` : '';

  return `<div class="fig"><svg viewBox="0 0 ${W} 470">
    <path class="fl tenue" d="${asse}"/>
    <path class="fl oro spessa tra" pathLength="100" d="${asse}"/>
    ${mom}${viagg}
    ${c.sx ? `<text class="ft pic eti" x="${X0}" y="${Y + 164}">${esc(c.sx)}</text>` : ''}
    ${c.dx ? `<text class="ft pic r eti" x="${X1}" y="${Y + 164}">${esc(c.dx)}</text>` : ''}
  </svg></div>`;
}

/* ===========================================================================
 * 14. barre — quanto pesa una cosa rispetto alle altre
 *     { barre:[{et, v:0..100, val}], acceso }
 * ======================================================================== */

function barre(c) {
  const n = c.barre.length, XE = 470, X0 = 520, X1 = 1420;
  const H = n > 3 ? 72 : 88, GAP = n > 3 ? 24 : 36;
  const tot = n * H + (n - 1) * GAP, Y0 = (470 - tot) / 2;

  const bs = c.barre.map((b, i) => {
    const y = Y0 + i * (H + GAP), w = (X1 - X0) * (b.v / 100);
    const on = c.acceso == null || c.acceso === i;
    return `<g class="bra" style="--i:${i}">
      <text class="ft r ${on ? '' : 'off'}" x="${XE}" y="${y + H / 2 + 13}">${esc(b.et)}</text>
      <rect class="fq velo" x="${X0}" y="${y}" width="${X1 - X0}" height="${H}"/>
      <rect class="fq ${on ? 'oro' : 'mezzo'} rie" style="--i:${i}"
            x="${X0}" y="${y}" width="${w.toFixed(1)}" height="${H}"/>
      ${b.val ? `<g class="val" style="--i:${i}"><text class="ft min"
            x="${(X0 + w + 26).toFixed(1)}" y="${y + H / 2 + 11}">${esc(b.val)}</text></g>` : ''}
    </g>`;
  }).join('');

  return `<div class="fig"><svg viewBox="0 0 ${W} 470">${bs}</svg></div>`;
}

/* ===========================================================================
 * 15. raggi — cosa sta al centro e cosa gli gira attorno, a distanza
 *     { centro, attorno:[{et, d:0..100}] }
 *     Le posizioni sono su quattro direzioni fisse: con piu' di quattro
 *     satelliti le etichette si accavallerebbero.
 * ======================================================================== */

function raggi(c) {
  const CX = 750, CY = 235, RC = 92, R0 = 140, R1 = 225;
  const dirs = [-140, -40, 40, 140];
  const sat = c.attorno.slice(0, 4).map((s, i) => {
    const a = (dirs[i] * Math.PI) / 180;
    const r = R0 + (R1 - R0) * (s.d / 100);
    const co = Math.cos(a), si = Math.sin(a);
    const x = CX + r * co, y = CY + r * si;
    /* la riga parte dal bordo del disco, non dal centro: passandoci sotto
       si vedrebbe in trasparenza attraverso la campitura */
    const bx = CX + (RC + 10) * co, by = CY + (RC + 10) * si;
    return `<g class="sat" style="--i:${i}">
      <path class="fl punti" d="M${bx.toFixed(1)} ${by.toFixed(1)} L${x.toFixed(1)} ${y.toFixed(1)}"/>
      <circle class="fq oro" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="12"/>
      ${righe(s.et, { x: Number((x + (co > 0 ? 32 : -32)).toFixed(1)), y: Number(y.toFixed(1)) + 11,
                      max: 18, dy: 38, cls: `ft ${co > 0 ? '' : 'r'}` })}
    </g>`;
  }).join('');

  return `<div class="fig"><svg viewBox="0 0 ${W} 470">
    <g class="orb" style="--i:0"><circle class="fl tenue" cx="${CX}" cy="${CY}" r="${R0}"/></g>
    <g class="orb" style="--i:1"><circle class="fl punti" cx="${CX}" cy="${CY}" r="${R1}"/></g>
    ${sat}
    <g class="cen">
      <circle class="fq veloro" cx="${CX}" cy="${CY}" r="${RC}"/>
      <circle class="fl oro" cx="${CX}" cy="${CY}" r="${RC}"/>
      ${righe(c.centro, { x: CX, y: CY + 10, max: 12, dy: 40, cls: 'ft gr c' })}
    </g>
  </svg></div>`;
}

/* ======================================================================== */

const disegni = { curva, finestra, quadranti, flusso, strati, pila, termometro,
                  bivio, anello, bilancia, imbuto, ponte, linea, barre, raggi };

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
