/*
 * La schermata F del corso «Scrivere per farsi leggere»: lo stesso testo in
 * due versioni. Sopra (o a sinistra) quella da correggere, in grigio; sotto
 * (o a destra) la riscrittura, in blu. Niente titoli, niente etichette,
 * niente frecce: lo script lo vieta, la differenza deve vedersi da sola.
 *
 *   { layout: 'pd', forma, prima, dopo, mostra? }
 *
 *   forma 'testo'    prima: stringa (un paragrafo)   dopo: [righe]
 *         'colonne'  prima: [righe]                  dopo: [righe]   affiancate
 *         'mail'     prima/dopo: { campi:[[etichetta, valore]], corpo:[righe] }
 *                    come una casella di posta: i campi in alto, un filetto,
 *                    il corpo sotto. Per una lista di soli oggetti basta
 *                    `campi` senza `corpo`.
 *         'chat'     prima/dopo: [{ da:'r'|'i', t:'…' }]  bolle sobrie, nessuna
 *                    icona, nessuna app riconoscibile: ricevuti in panna,
 *                    inviati in blu. Le due conversazioni stanno affiancate.
 *
 *   mostra 'prima'   la riscrittura c'è ma è nascosta: il quadro non salta
 *                    quando, al blocco dopo, compare.
 *
 * Dentro i testi `<u>…</u>` segna in oro le parole su cui la voce si ferma
 * (le attenuazioni, i verbi vuoti). Si usa poco: è l'unico segno ammesso.
 */
const NAVY = '#12294A', GOLD = '#C39A4E', GREY = '#69748A', IVORY = '#F7F3EA',
      PANNA = '#EDE4D0';

const pdCss = () => `
  .pd { position:absolute; inset:0; display:flex; flex-direction:column;
        justify-content:center; padding:150px 230px 120px; z-index:2;
        font-family:'Jost',sans-serif; }
  .pd .pri { color:${GREY}; font-weight:300; }
  .pd .dop { color:${NAVY}; font-weight:500; }
  .pd .dop.nascosto { visibility:hidden; }
  .pd u { text-decoration:none; background:linear-gradient(${GOLD}66,${GOLD}66)
          no-repeat left 92% / 100% .2em; color:inherit; }
  .pd .gap { height:var(--gap,72px); flex:none; }
  .pd .r + .r { margin-top:.32em; }

  /* testo: un paragrafo sopra, le righe riscritte sotto */
  .pd.testo .pri { font-size:var(--fp); line-height:1.55; }
  .pd.testo .dop { font-size:var(--fd); line-height:1.4; }

  /* colonne: due elenchi affiancati, stessa altezza di riga */
  .pd.colonne { flex-direction:row; align-items:center; gap:110px; padding:150px 170px 120px; }
  .pd.colonne .pri, .pd.colonne .dop { flex:1; font-size:var(--fc); line-height:1.35; }
  .pd.colonne .r + .r { margin-top:.75em; }

  /* mail: campi, filetto, corpo */
  .pd.mail .camp { display:flex; gap:.6em; font-size:var(--fm); line-height:1.4; }
  .pd.mail .camp b { font-weight:600; min-width:4.2em; }
  .pd.mail .pri .camp b { color:${GREY}; }
  .pd.mail .dop .camp b { color:${GOLD}; }
  .pd.mail .camp + .camp { margin-top:.28em; }
  .pd.mail .fil { height:2px; margin:.7em 0 .8em; background:currentColor; opacity:.3;
                  font-size:var(--fm); }
  .pd.mail .corpo { font-size:var(--fm); line-height:1.45; }

  /* chat: due conversazioni affiancate */
  .pd.chat { flex-direction:row; align-items:center; gap:120px; padding:150px 190px 110px; }
  .pd.chat .pri, .pd.chat .dop { flex:1; display:flex; flex-direction:column; gap:26px;
                                 font-weight:400; color:${NAVY}; }
  /* la conversazione da correggere si smorza sulle bolle, non sul contenitore:
     il contenitore anima a opacity:1 e la velatura sparirebbe */
  .pd.chat .pri .bolla { opacity:.5; }
  .pd.chat .bolla { max-width:88%; padding:24px 34px; border-radius:30px;
                    font-size:var(--fb); line-height:1.36; }
  .pd.chat .bolla.r { align-self:flex-start; background:${PANNA}; color:${NAVY};
                      border-bottom-left-radius:8px; }
  .pd.chat .bolla.i { align-self:flex-end; background:${NAVY}; color:${IVORY};
                      border-bottom-right-radius:8px; }
  .pd.chat .bolla.nota { align-self:center; background:none; font-style:italic;
                         font-family:'Cormorant Garamond',serif; font-size:calc(var(--fb) * 1.1);
                         color:${GREY}; padding:0; }
`;

const righe = (xs) => xs.map((r) => `<div class="r">${r}</div>`).join('');
const len = (s) => String(s).replace(/<[^>]+>/g, '').length;
const tot = (xs) => xs.reduce((a, s) => a + len(s), 0);

/* corpo del testo in pixel, dalla quantità di testo: scende a gradini, così
   due schermate della stessa lezione con lunghezze simili hanno lo stesso
   corpo invece di due corpi quasi uguali */
const gradino = (n, scala) => scala.find(([soglia]) => n <= soglia)?.[1] ?? scala.at(-1)[1];

function stagePd(c) {
  if (c.layout !== 'pd') return null;
  const vela = c.mostra === 'prima' ? ' nascosto' : '';
  const f = c.forma ?? 'testo';

  if (f === 'testo') {
    const lp = len(c.prima), ld = tot(c.dopo);
    const fp = gradino(lp, [[90, 58], [170, 50], [260, 44], [360, 40], [9999, 36]]);
    const fd = gradino(ld, [[70, 66], [130, 58], [200, 50], [9999, 44]]);
    return `<div class="pd testo" style="--fp:${fp}px;--fd:${fd}px">
      <div class="pri">${c.prima}</div><div class="gap"></div>
      <div class="dop${vela}">${righe(c.dopo)}</div></div>`;
  }

  if (f === 'colonne') {
    const n = Math.max(...[...c.prima, ...c.dopo].map(len));
    const fc = gradino(n, [[28, 54], [44, 48], [62, 43], [9999, 38]]);
    return `<div class="pd colonne" style="--fc:${fc}px">
      <div class="pri">${righe(c.prima)}</div>
      <div class="dop${vela}">${righe(c.dopo)}</div></div>`;
  }

  if (f === 'mail') {
    const blocco = (v) => {
      const campi = (v.campi ?? []).map(([k, x]) => `<div class="camp"><b>${k}</b><span>${x}</span></div>`).join('');
      const corpo = v.corpo?.length ? `<div class="fil"></div><div class="corpo">${righe(v.corpo)}</div>` : '';
      return campi + corpo;
    };
    const quanto = (v) => (v.campi ?? []).reduce((a, [k, x]) => a + len(k) + len(x), 0) + tot(v.corpo ?? []);
    const n = quanto(c.prima) + quanto(c.dopo);
    const fm = gradino(n, [[160, 46], [300, 40], [460, 35], [9999, 31]]);
    return `<div class="pd mail" style="--fm:${fm}px;--gap:${fm * 1.6}px">
      <div class="pri">${blocco(c.prima)}</div><div class="gap"></div>
      <div class="dop${vela}">${blocco(c.dopo)}</div></div>`;
  }

  if (f === 'chat') {
    const bolle = (xs) => xs.map((m) =>
      `<div class="bolla ${m.da === 'n' ? 'nota' : m.da}">${m.t}</div>`).join('');
    const n = Math.max(tot(c.prima.map((m) => m.t)), tot(c.dopo.map((m) => m.t)));
    const fb = gradino(n, [[80, 46], [160, 40], [260, 35], [9999, 31]]);
    return `<div class="pd chat" style="--fb:${fb}px">
      <div class="pri">${bolle(c.prima)}</div>
      <div class="dop${vela}">${bolle(c.dopo)}</div></div>`;
  }
  throw new Error(`pd: forma sconosciuta ${f}`);
}

export { pdCss, stagePd };
