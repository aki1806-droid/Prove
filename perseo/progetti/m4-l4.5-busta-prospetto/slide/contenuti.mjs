// Contenuto delle 49 scene della lezione 4.5 — Trovarlo in busta paga e nel prospetto.
// s02–s48 sono i blocchi 1–47 del copione, uno a uno.
// I documenti sono ricostruiti in modo neutro: nessun cedolino reale.

const CORSO = 'Perseo Sirio senza segreti';
const FIRMA = 'Un corso CISL FP Padova Rovigo';

const CED = [
  { h: 'Competenze' }, { finta: true },
  { h: 'Ritenute a tuo carico' }, { finta: true },
  { t: 'Previdenza complementare · a tuo carico', v: '25,00', id: 'tuo' },
  { h: 'Contributi a carico dell\'ente' },
  { t: 'Previdenza complementare · a carico ente', v: '25,00', id: 'ente' },
];
const ced = (id, sop, accese, extra = {}) => ({ id, tipo: 'foglio', tema: 'chiaro', sopratitolo: sop,
  intest: 'CEDOLINO · esempio neutro', righe: CED, accese, ...extra });

const CU = [
  { h: 'Dati fiscali' }, { finta: true }, { finta: true }, { finta: true },
  { h: 'Oneri deducibili' },
  { t: 'Contributi previdenza complementare dedotti', v: '600,00', id: 'cu' }, { finta: true },
];
const cu = (id, sop, accese, extra = {}) => ({ id, tipo: 'foglio', tema: 'chiaro', sopratitolo: sop,
  intest: 'CERTIFICAZIONE UNICA · esempio', righe: CU, accese, ...extra });

const MONETE = { reale: ['tuo', 'ente'], fig: ['TFR virtuale', 'TFS virtuale'] };
const tas = (id, sop, fase, extra = {}) => ({ id, tipo: 'tasche', tema: 'chiaro', sopratitolo: sop, fase, monete: MONETE, ...extra });

const TRE_DOC = (k) => ({ tipo: 'tre', tema: 'chiaro', sopratitolo: 'Tre documenti',
  box: [{ n: 'OGNI MESE', t: 'Il cedolino' }, { n: 'OGNI ANNO', t: 'La Certificazione Unica' }, { n: 'OGNI ANNO', t: 'Il prospetto del Fondo' }]
    .map((b, i) => ({ ...b, key: k === 9 || i === k })) });

const TRE_COSE = [
  'Cedolino: **tua quota** e **quota ente**',
  'Quota associativa: **13 € l\'anno**',
  'Prospetto: **le due tasche**',
];

const PASSI = [
  { t: 'Scarica l\'**ultimo prospetto** annuale' },
  { t: 'Somma le **trattenute** dei cedolini' },
  { t: 'Confronta: **dieci minuti**', key: true },
];

export const SCENE = [
{ id: 's01', tipo: 'copertina', tema: 'chiaro',
  modulo: 'Modulo 4 · Quanto si versa',
  titolo: 'Trovarlo in busta paga<br>e nel prospetto', sottotitolo: 'Lezione 4.5',
  ente: `${CORSO} · ${FIRMA}` },

// 1 · apertura
{ id: 's02', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Fidarsi è bene', illu: 'lente',
  titolo: 'Controllare<br>**è meglio**' },
{ id: 's03', ...TRE_DOC(9) },
{ id: 's04', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Non serve essere esperti', illu: 'bussola',
  titolo: 'Basta sapere<br>**dove guardare**' },
{ id: 's05', tipo: 'figura', tema: 'chiaro', sopratitolo: 'In questa lezione', illu: 'cartella',
  titolo: 'Le poche righe<br>**che contano davvero**' },

// 2 · il cedolino
{ id: 's06', ...TRE_DOC(0) },
ced('s07', 'Due informazioni da cercare', []),
{ id: 's08', tipo: 'icone', tema: 'chiaro', sopratitolo: 'I nomi cambiano da ente a ente',
  voci: [{ icona: 'documento', t: 'Previdenza complementare' }, { icona: 'cartella', t: 'Fondo pensione' }, { icona: 'sigillo', t: 'Perseo Sirio' }] },
ced('s09', 'Prima: la trattenuta a tuo carico', ['tuo'], { lente: true }),
{ id: 's10', tipo: 'conto', tema: 'chiaro', sopratitolo: 'Esempio semplificato · importi lordi',
  voci: [{ v: '30.000 €', lb: 'retribuzione utile' }, { v: '1%', lb: 'la tua quota' }, { v: '25 €', lb: 'al mese' }], op: ['×', '≈'] },
ced('s11', 'Poi: il contributo dell\'ente', ['tuo', 'ente'], { lente: true }),
{ id: 's12', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Stesso ordine di grandezza',
  col: [{ h: 'Tua trattenuta', t: '**circa 25 €**', grande: true },
        { h: 'Contributo dell\'ente', t: '**circa 25 €**', grande: true }] },
ced('s13', 'E il TFR figurativo?', ['tuo', 'ente'], { manca: 'TFR figurativo: qui non compare' }),
{ id: 's14', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Niente panico', illu: 'cartella',
  titolo: 'Lo ritrovi<br>**nel prospetto del Fondo**', sotto: 'Il terzo documento.' },

// 3 · la quota associativa
{ id: 's15', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Un dettaglio che preoccupa', illu: 'calendario',
  titolo: 'Un mese dell\'anno<br>**un importo più basso**' },
{ id: 's16', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Non è un errore', illu: 'scudo',
  titolo: 'È la quota<br>**associativa annuale**' },
{ id: 's17', tipo: 'cifre', tema: 'chiaro', sopratitolo: 'La quota associativa',
  voci: [{ n: '13 €', t: 'L\'anno, una sola volta', key: true }, { n: '11 €', t: 'Aderenti contrattuali della polizia locale' }] },
{ id: 's18', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Dal primo versamento utile dell\'anno', illu: 'ingranaggio',
  titolo: 'Copre le spese<br>**di funzionamento**' },
{ id: 's19', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Quell\'anno non la paga',
  col: [{ h: 'Chi non fa versamenti', t: '**Niente quota**', grande: true },
        { h: 'Solo versamenti volontari', t: '**Niente quota**', grande: true }] },

// 4 · la Certificazione Unica
{ id: 's20', ...TRE_DOC(1) },
cu('s21', 'I contributi già dedotti', ['cu'], { lente: true }),
{ id: 's22', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Non devi fare nulla', illu: 'calendario',
  titolo: 'L\'agevolazione<br>**l\'hai già avuta mese per mese**' },
{ id: 's23', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Con il 730 precompilato', illu: 'schermo',
  titolo: 'Il dato arriva<br>**in automatico**', sotto: 'Basta controllare che ci sia.' },
{ id: 's24', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Intervieni tu solo se',
  col: [{ h: 'Trattenuti in busta paga', t: 'Già **fatto**', grande: true },
        { h: 'Versati con bonifico', t: 'Li indichi **tu**, con la ricevuta', grande: true }] },

// 5 · il prospetto
{ id: 's25', ...TRE_DOC(2) },
{ id: 's26', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Area riservata · documentazione', illu: 'schermo',
  titolo: 'Ogni anno,<br>**in pochi secondi**' },
tas('s27', 'Il prospetto delle due tasche', 'due'),
tas('s28', 'La tasca reale: soldi investiti davvero', 'reale'),
tas('s29', 'La tasca figurativa: contabilizzata dall\'INPS', 'due', { monete: { reale: MONETE.reale, fig: ['TFR virtuale'] } }),
tas('s30', 'Per gli optanti: il TFS virtuale', 'due'),
{ id: 's31', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Il risultato della gestione', illu: 'stelle',
  titolo: 'Quanto hanno reso<br>**gli investimenti**', sotto: 'Positivo, o in qualche anno negativo.' },
{ id: 's32', tipo: 'conto', tema: 'chiaro', sopratitolo: 'La posizione individuale',
  voci: [{ v: 'tasche', lb: 'versamenti e TFR' }, { v: 'resa', lb: 'risultato della gestione' }, { v: 'posizione', lb: 'al netto dei costi' }], op: ['+', '='] },
{ id: 's33', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Un consiglio', illu: 'libro',
  titolo: 'Conserva i prospetti<br>**uno accanto all\'altro**' },

// 6 · se qualcosa non torna
{ id: 's34', tipo: 'figura', tema: 'chiaro', sopratitolo: 'E se qualcosa non torna?', illu: 'domanda',
  titolo: 'In busta paga c\'è,<br>**nel prospetto no**' },
{ id: 's35', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Primo passo: confronta',
  col: [{ h: 'Cedolini di un anno', t: 'Somma delle **trattenute**', grande: true },
        { h: 'Prospetto', t: 'I **tuoi contributi**', grande: true }] },
{ id: 's36', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Attenzione', illu: 'orologio',
  titolo: 'Sfasamenti<br>**di un mese**', sotto: 'L\'ente versa entro il mese successivo.' },
{ id: 's37', tipo: 'tre', tema: 'chiaro', sopratitolo: 'A chi chiedere',
  box: [{ n: 'PRIMA', t: 'Ufficio del personale', key: true }, { n: 'POI', t: 'Il Fondo' }, { n: 'SEMPRE', t: 'Il delegato sindacale' }] },
{ id: 's38', tipo: 'tre', tema: 'chiaro', sopratitolo: 'A chi chiedere',
  box: [{ n: 'PRIMA', t: 'Ufficio del personale' }, { n: 'POI', t: 'Il Fondo', key: true }, { n: 'SEMPRE', t: 'Il delegato sindacale' }] },
{ id: 's39', tipo: 'tre', tema: 'chiaro', sopratitolo: 'A chi chiedere',
  box: [{ n: 'PRIMA', t: 'Ufficio del personale' }, { n: 'POI', t: 'Il Fondo' }, { n: 'SEMPRE', t: 'Il delegato sindacale', key: true }] },

// 7 · memo
{ id: 's40', tipo: 'frase', tema: 'profondo', sopratitolo: 'Da ricordare',
  testo: 'Una volta l\'anno, dieci minuti di controllo.<br><b class="a">È la tua pensione.</b>' },

// 8 · chiusura
{ id: 's41', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE, attive: [0] },
{ id: 's42', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE, attive: [0, 1] },
{ id: 's43', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE },
{ id: 's44', tipo: 'mossa', tema: 'chiaro', sopratitolo: 'La mossa di oggi', illu: 'cartella',
  titolo: 'Il tuo **prospetto annuale**', passi: PASSI },
{ id: 's45', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Bastano dieci minuti', illu: 'orologio',
  titolo: 'Contributi nel prospetto<br>**= trattenute nei cedolini**' },
{ id: 's46', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Fine del Modulo 4', illu: 'salvadanaio',
  titolo: 'Quanto entra,<br>**da dove, e dove è scritto**' },
{ id: 's47', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Prossimo modulo', illu: 'semaforo',
  titolo: 'Dove la previdenza<br>**fa la differenza**' },
{ id: 's48', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Modulo 5', illu: 'bilancia',
  titolo: 'Il fisco:<br>**dove si guadagna davvero**' },

{ id: 's49', tipo: 'copertina', tema: 'profondo', chiusura: true, corso: CORSO, firma: FIRMA },
];
