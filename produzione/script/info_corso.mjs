/*
 * Infografiche del corso "Dire, ascoltare, convincere" — La Parola Giusta.
 *
 * Un diagramma (figure_corso.mjs) disegna UN'IDEA: una curva, un flusso, una
 * bilancia. Un'infografica compone UN QUADRO INTERO: piu' elementi che stanno
 * insieme e si leggono in un colpo solo — la frase smontata pezzo per pezzo,
 * la lezione riassunta in quattro caselle, il dato con la sua scomposizione
 * e il suo limite accanto.
 *
 * Perche' in HTML e non in SVG, al contrario dei diagrammi: qui il contenuto
 * e' quasi tutto testo, e il testo dentro <text> non va a capo da solo. In
 * HTML va a capo, si allinea, si misura da solo — e soprattutto un richiamo
 * puo' stare ANCORATO alla parola che commenta senza sapere quanto e' larga.
 * In SVG servirebbe misurare le stringhe a mano.
 *
 * Le infografiche occupano tutto il quadro e si portano dentro il proprio
 * titolo: NON usano `title`, che sotto non ci starebbe.
 *
 *   anatomia   una frase smontata, con i richiami attaccati alle sue parti
 *   cruscotto  la lezione in quattro caselle piu' la riga che resta
 *   cartellino un numero grande con la sua scomposizione e il suo limite
 *   confronto  due versioni della stessa cosa, riga per riga, con le
 *              differenze segnate
 *
 * Come i diagrammi: si passano i DATI. E come i diagrammi, vale la regola
 * che l'animazione non va mai messa sull'elemento che porta gia' una
 * campitura debole — si anima il contenitore.
 */

const GOLD = '#C39A4E';

/* Testo smorzato: si fa col COLORE, non con l'opacita'. Un elemento che porta
   `opacity` e che riceve anche un'animazione d'ingresso (`velo`, `sali`,
   `cresci`, che finiscono tutte a opacity:1) si riaccende da solo alla fine
   dell'animazione. E' lo stesso errore gia' pagato sui diagrammi. */
const muto = (t, q) => `color-mix(in srgb, ${t.fg} ${q}%, ${t.bg})`;

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');

/* ===========================================================================
 * CSS
 * ======================================================================== */

const infoCss = (t) => `
  .info { width:100%; display:flex; flex-direction:column; }
  .info .occhio { font-family:'Jost',sans-serif; font-weight:600; font-size:24px;
                  letter-spacing:.26em; text-transform:uppercase; color:${GOLD};
                  margin-bottom:30px; }

  /* --- anatomia: la frase segnata, e sotto la legenda numerata ---------
     I richiami sono NUMERI, non fili tirati giu' dalla parola: un pezzo di
     frase che va a capo si spezza in due rettangoli, e un filo ancorato al
     centro dell'inline box finisce nel posto sbagliato. Il numero sta
     attaccato al suo pezzo comunque vada il testo a capo. */
  .ana .frase { font-weight:500; font-size:74px; line-height:1.62;
                letter-spacing:-.005em; }
  .ana .seg   { padding:0 .05em;
                background:linear-gradient(rgba(195,154,78,.22) 0 100%) no-repeat
                           left calc(100% - .06em) / 100% .44em;
                -webkit-box-decoration-break:clone; box-decoration-break:clone; }
  .ana .seg.forte { background-image:linear-gradient(rgba(195,154,78,.42) 0 100%); }
  .ana .seg .n { font-family:'Jost',sans-serif; font-weight:600; font-size:27px;
                 color:${GOLD}; vertical-align:super; margin-left:.10em;
                 letter-spacing:0; }
  .ana .legenda { display:grid; gap:22px 44px; margin-top:64px;
                  border-top:2px solid rgba(195,154,78,.45); padding-top:34px; }
  .ana .rich  { display:flex; gap:18px; align-items:baseline; }
  .ana .rich .n { font-family:'Jost',sans-serif; font-weight:600; font-size:30px;
                  color:${GOLD}; flex:0 0 auto; }
  .ana .rich b  { font-family:'Jost',sans-serif; font-weight:500; font-size:34px;
                  color:${GOLD}; display:block; }
  .ana .rich small { font-family:'Jost',sans-serif; font-weight:300; font-size:29px;
                     line-height:1.3; color:${muto(t, 62)}; display:block; margin-top:6px; }
  .ana .chiusa { margin-top:46px; font-family:'Jost',sans-serif; font-weight:300;
                 font-size:34px; color:${muto(t, 72)}; }

  /* --- cruscotto: la lezione in quattro caselle ------------------------- */
  .cru .celle { display:grid; gap:26px; }
  .cru .cella { border:2px solid rgba(105,116,138,.30); padding:38px 36px 34px;
                display:flex; flex-direction:column; gap:16px; }
  .cru .cella.acc { border-color:${GOLD}; background:rgba(195,154,78,.10); }
  .cru .cap   { font-weight:600; font-size:64px; line-height:1.05; color:${GOLD}; }
  .cru .cap.par { font-size:46px; font-family:'Jost',sans-serif; font-weight:500;
                  letter-spacing:-.01em; }
  .cru .et    { font-family:'Jost',sans-serif; font-weight:400; font-size:32px;
                line-height:1.34; }
  .cru .resta { margin-top:44px; border-top:2px solid ${GOLD}; padding-top:40px;
                font-weight:500; font-style:italic; font-size:66px; line-height:1.26;
                text-align:center; }

  /* --- cartellino: il dato, la scomposizione, il limite ----------------- */
  .car .corpo { display:flex; gap:76px; align-items:flex-start; }
  .car .dato  { flex:0 0 470px; }
  .car .cifra { font-weight:600; font-size:250px; line-height:.9; color:${GOLD};
                letter-spacing:-.03em; }
  .car .cifra small { font-family:'Jost',sans-serif; font-weight:300; font-size:52px;
                      letter-spacing:0; margin-left:.12em; }
  .car .che   { font-family:'Jost',sans-serif; font-weight:400; font-size:34px;
                line-height:1.36; margin-top:22px; }
  .car .voci  { flex:1; display:flex; flex-direction:column; gap:24px; padding-top:16px; }
  .car .voce  { display:flex; align-items:center; gap:26px; }
  .car .vet   { flex:0 0 320px; font-family:'Jost',sans-serif; font-weight:400;
                font-size:31px; text-align:right; }
  .car .vbar  { flex:1; height:52px; background:rgba(105,116,138,.14); position:relative; }
  .car .vbar i{ position:absolute; inset:0 auto 0 0; background:rgba(18,41,74,.22);
                transform-origin:left center; display:block; }
  .car .vbar i.oro { background:${GOLD}; }
  .car .vval  { flex:0 0 150px; font-family:'Jost',sans-serif; font-weight:300;
                font-size:28px; color:${muto(t, 60)}; }
  .car .limite{ margin-top:46px; border-top:2px solid rgba(105,116,138,.26);
                padding-top:26px; font-family:'Jost',sans-serif; font-weight:300;
                font-size:30px; line-height:1.4; color:${muto(t, 66)}; max-width:1180px; }

  /* --- confronto: due colonne, stesse righe, differenze segnate --------- */
  .con .griglia { display:grid; grid-template-columns:300px 1fr 1fr; gap:0 34px; }
  .con .cap   { font-family:'Jost',sans-serif; font-weight:600; font-size:25px;
                letter-spacing:.22em; text-transform:uppercase; padding-bottom:22px; }
  .con .cap.a { color:${muto(t, 45)}; }
  .con .cap.b { color:${GOLD}; }
  .con .fila  { display:contents; }
  .con .et    { font-family:'Jost',sans-serif; font-weight:400; font-size:29px;
                color:${muto(t, 60)}; padding:26px 0;
                border-top:2px solid rgba(105,116,138,.22);
                display:flex; align-items:center; }
  .con .cll   { font-family:'Jost',sans-serif; font-weight:400; font-size:36px;
                line-height:1.32; padding:26px 26px 26px 0;
                border-top:2px solid rgba(105,116,138,.22); }
  .con .cll.a { color:${muto(t, 42)}; }
  .con .cll.b { padding-left:26px; }
  .con .cll.b { position:relative; }
  .con .fila.segna .cll.b::before { content:''; position:absolute;
                inset:0; background:rgba(195,154,78,.13);
                box-shadow: inset 3px 0 0 ${GOLD};
                transform-origin:left center; z-index:-1; }
`;

/* ===========================================================================
 * 1. anatomia — una frase smontata, con i richiami attaccati alle sue parti
 *    { frase:[{t, et?, sub?, forte?}], chiusa? }
 *    I richiami scendono a profondita' diverse (--i) cosi' due parti vicine
 *    non si scrivono una sopra l'altra.
 * ======================================================================== */

function anatomia(c) {
  const ric = [];
  const frase = c.frase.map((p) => {
    if (!p.et) return `<span>${esc(p.t)}</span>`;
    ric.push(p);
    return `<span class="seg ${p.forte ? 'forte' : ''}" style="--i:${ric.length - 1}">${esc(p.t)}<span
        class="n">${ric.length}</span></span>`;
  }).join('');
  const legenda = ric.map((p, i) => `<div class="rich" style="--i:${i}">
      <span class="n">${i + 1}</span>
      <div><b>${esc(p.et)}</b>${p.sub ? `<small>${esc(p.sub)}</small>` : ''}</div>
    </div>`).join('');
  return `<div class="info ana">
    ${c.occhio ? `<div class="occhio">${esc(c.occhio)}</div>` : ''}
    <div class="frase">${frase}</div>
    <div class="legenda" style="grid-template-columns:repeat(${Math.min(ric.length, 3)}, 1fr)">${legenda}</div>
    ${c.chiusa ? `<div class="chiusa">${esc(c.chiusa)}</div>` : ''}
  </div>`;
}

/* ===========================================================================
 * 2. cruscotto — la lezione in quattro caselle, piu' la riga che resta
 *    { celle:[{cap, et, acceso?}], resta? }
 * ======================================================================== */

function cruscotto(c) {
  const n = c.celle.length;
  const celle = c.celle.map((x, i) => `<div class="cella ${x.acceso ? 'acc' : ''}" style="--i:${i}">
      <div class="cap ${/^[0-9]/.test(String(x.cap)) ? '' : 'par'}">${esc(x.cap)}</div>
      <div class="et">${esc(x.et)}</div>
    </div>`).join('');
  return `<div class="info cru">
    ${c.occhio ? `<div class="occhio">${esc(c.occhio)}</div>` : ''}
    <div class="celle" style="grid-template-columns:repeat(${n}, 1fr)">${celle}</div>
    ${c.resta ? `<div class="resta">${esc(c.resta)}</div>` : ''}
  </div>`;
}

/* ===========================================================================
 * 3. cartellino — un numero grande con la sua scomposizione e il suo limite
 *    { cifra, unita?, che, voci:[{et, v:0..100, val?}], limite? }
 *    Il `limite` non e' un ornamento: e' il posto dove si dice cosa il dato
 *    NON dice. Se manca, il numero va guardato due volte prima di usarlo.
 * ======================================================================== */

function cartellino(c) {
  const voci = (c.voci ?? []).map((v, i) => `<div class="voce" style="--i:${i}">
      <div class="vet">${esc(v.et)}</div>
      <div class="vbar"><i class="${i === 0 ? 'oro' : ''}" style="width:${v.v}%"></i></div>
      <div class="vval">${v.val ? esc(v.val) : ''}</div>
    </div>`).join('');
  return `<div class="info car">
    ${c.occhio ? `<div class="occhio">${esc(c.occhio)}</div>` : ''}
    <div class="corpo">
      <div class="dato">
        <div class="cifra">${esc(c.cifra)}${c.unita ? `<small>${esc(c.unita)}</small>` : ''}</div>
        <div class="che">${esc(c.che)}</div>
      </div>
      <div class="voci">${voci}</div>
    </div>
    ${c.limite ? `<div class="limite">${esc(c.limite)}</div>` : ''}
  </div>`;
}

/* ===========================================================================
 * 4. confronto — due versioni della stessa cosa, riga per riga
 *    { titoli:[a, b], righe:[{et, a, b, segna?}] }
 *    Diverso da `swap`, che fa una sostituzione per riga: qui le due colonne
 *    sono complete e si confrontano voce per voce, e `segna` accende solo le
 *    righe dove la differenza conta davvero.
 * ======================================================================== */

function confronto(c) {
  const righe = c.righe.map((r, i) => `<div class="fila ${r.segna ? 'segna' : ''}" style="--i:${i}">
      <div class="et">${esc(r.et)}</div>
      <div class="cll a">${esc(r.a)}</div>
      <div class="cll b">${esc(r.b)}</div>
    </div>`).join('');
  return `<div class="info con">
    ${c.occhio ? `<div class="occhio">${esc(c.occhio)}</div>` : ''}
    <div class="griglia">
      <div class="cap"></div>
      <div class="cap a">${esc(c.titoli[0])}</div>
      <div class="cap b">${esc(c.titoli[1])}</div>
      ${righe}
    </div>
  </div>`;
}

/* ======================================================================== */

const infografiche = { anatomia, cruscotto, cartellino, confronto };

function stageInfo(c) {
  const f = infografiche[c.layout];
  if (!f) return null;
  /* `stage info` toglie il padding alto dei layout grafici: un'infografica
     usa tutto il quadro e non ha didascalia sotto. */
  return `<div class="stage info-stage">${f(c)}</div>`;
}

export { infoCss, stageInfo, infografiche };
