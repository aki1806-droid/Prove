// Contenuto delle 49 scene della lezione 9.1 — Quando puoi chiederla.
// s02–s48 sono i blocchi 1–47 del copione, uno a uno.

const CORSO = 'Perseo Sirio senza segreti';
const FIRMA = 'Un corso CISL FP Padova Rovigo';

const RIGHE = [
  ['Età', 'Quella della **vecchiaia pubblica**', '**Fino a 10 anni** prima'],
  ['Iscrizione al Fondo', '**Almeno 5 anni**', '**15 anni** (5 fino al 2026)'],
  ['Lavoro', 'Cessato', 'Cessato'],
];
const str = (id, k, chiave, sop = 'Le due strade') => ({ id, tipo: 'tabella', tema: 'chiaro', sopratitolo: sop,
  intestazioni: ['', 'Vecchiaia', 'Anzianità'], colonne: ['30%', '35%', '35%'], righe: RIGHE.slice(0, k), chiave });
const varco = (id, sop, fase) => ({ id, tipo: 'varco', tema: 'chiaro', sopratitolo: sop, fase });

const TRE_COSE = [
  'Serve la **cessazione** del lavoro',
  'Vecchiaia: **5 anni** di iscrizione',
  'Anzianità: **15 anni** dal 2027',
];

const PASSI = [
  { t: 'La **data di adesione**, dal prospetto annuale' },
  { t: 'La **data di uscita** che hai in mente' },
  { t: 'Fai la **sottrazione**', key: true },
];

export const SCENE = [
{ id: 's01', tipo: 'copertina', tema: 'chiaro',
  modulo: 'Modulo 9 · Al pensionamento',
  titolo: 'Quando puoi chiederla', sottotitolo: 'Lezione 9.1',
  ente: `${CORSO} · ${FIRMA}` },

// 1 · apertura
{ id: 's02', tipo: 'figura', tema: 'chiaro', sopratitolo: 'L\'ultimo giorno di lavoro', illu: 'armadietto',
  titolo: 'Consegni<br>**le chiavi**' },
{ id: 's03', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Dopo anni di versamenti', illu: 'salvadanaio',
  titolo: 'Quando si apre<br>**il salvadanaio?**' },
{ id: 's04', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Non sempre coincidono',
  col: [{ h: 'Pensione pubblica', t: 'Le sue regole', grande: true },
        { h: 'Pensione complementare', t: '**Regole proprie**', grande: true }] },
{ id: 's05', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'In questa lezione: i requisiti',
  col: [{ h: 'Valgono sempre', t: 'Per tutti', grande: true },
        { h: 'Cambiano', t: '**Con il calendario**', grande: true }] },
{ id: 's06', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Modulo 9 · Al pensionamento', illu: 'stelle',
  titolo: 'Dal prospetto<br>**alla realtà**' },

// 2 · la regola che vale sempre
{ id: 's07', tipo: 'figura', tema: 'chiaro', sopratitolo: 'La regola che vale sempre', illu: 'lucchetto',
  titolo: 'Per chiunque,<br>**in ogni caso**' },
{ id: 's08', tipo: 'frase', tema: 'chiaro', sopratitolo: 'Prima regola',
  testo: 'Per qualunque prestazione:<br><b class="a">aver smesso di lavorare.</b>' },
{ id: 's09', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Finché lavori in un ente aderente', illu: 'salvadanaio',
  titolo: 'Resta investita<br>**e continua a crescere**' },
{ id: 's10', tipo: 'tre', tema: 'chiaro', sopratitolo: 'Le sole eccezioni: le anticipazioni · modulo 8',
  box: [{ n: '1', t: 'Prima casa' }, { n: '2', t: 'Spese sanitarie straordinarie' }, { n: '3', t: 'Congedi formativi' }] },
{ id: 's11', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Non conta come cessazione',
  col: [{ h: 'Cambiare ente', t: 'Tra quelli aderenti', grande: true },
        { h: 'Cambiare profilo', t: 'Professionale', grande: true }] },
{ id: 's12', tipo: 'frase', tema: 'chiaro', sopratitolo: 'Perché',
  testo: 'Il Fondo ti accompagna dopo il lavoro,<br><b class="a">non durante.</b>' },
{ id: 's13', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Cessato il rapporto, due strade',
  col: [{ h: 'Prima strada', t: '**Vecchiaia**', grande: true },
        { h: 'Seconda strada', t: '**Anzianità**', grande: true }] },

// 3 · vecchiaia e anzianità
{ id: 's14', tipo: 'figura', tema: 'chiaro', sopratitolo: 'La strada principale', illu: 'calendario',
  titolo: 'Pensione complementare<br>**di vecchiaia**' },
str('s15', 1, [1], 'Vecchiaia · oggi 67 anni'),
str('s16', 2, [1], 'Vecchiaia: età e almeno 5 anni'),
{ id: 's17', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Per chi smette prima', illu: 'clessidra',
  titolo: 'Pensione complementare<br>**di anzianità**' },
str('s18', 3, [2], 'Anzianità: fino a 10 anni prima'),
{ id: 's19', tipo: 'cifre', tema: 'chiaro', sopratitolo: 'Anzianità · anni di iscrizione richiesti',
  voci: [{ n: '15 anni', t: 'Non cinque', key: true }] },
{ id: 's20', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Lo Statuto', illu: 'libro',
  titolo: 'Una deroga<br>**transitoria: 5 anni**', sotto: 'Solo nei primi anni di attività del Fondo.' },
varco('s21', 'Il sito del Fondo: la deroga vale fino al 2026', 'porte'),

// 4 · dal 2027
{ id: 's22', tipo: 'tre', tema: 'chiaro', sopratitolo: 'Un esempio con due persone',
  box: [{ n: 'ISCRITTE DA', t: '8 anni' }, { n: 'ETÀ', t: 'Prima della vecchiaia' }, { n: 'SMETTONO', t: 'Una nel 2026, una nel 2027', key: true }] },
varco('s23', 'Chi smette nel 2026', 'larga'),
{ id: 's24', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Nel 2026', illu: 'salvadanaio',
  titolo: 'Anzianità<br>**subito**', sotto: 'Senza aspettare l\'età di vecchiaia.' },
varco('s25', 'Chi smette nel 2027', 'stretta'),
{ id: 's26', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Ma non perde nulla', illu: 'scudo',
  titolo: 'Resta investita,<br>**fino alla vecchiaia**', sotto: 'Poi bastano 5 anni di iscrizione.' },
{ id: 's27', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Se ne ha i requisiti · modulo 8', illu: 'clessidra',
  titolo: 'La RITA,<br>**il reddito ponte**' },
{ id: 's28', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Meno di 5 anni di iscrizione', illu: 'lucchetto',
  titolo: 'Nessuna delle due:<br>**solo il riscatto**' },
{ id: 's29', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Per questo conviene aderire presto',
  col: [{ h: 'Riscatto', t: '23%', grande: true },
        { h: 'Pensione complementare', t: '**Dal 15% al 9%**', grande: true }] },

// 5 · l'età che si muove
{ id: 's30', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Un\'avvertenza', illu: 'campana',
  titolo: 'L\'età di vecchiaia<br>**non è fissa**' },
{ id: 's31', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Segue la speranza di vita',
  col: [{ h: 'Oggi', t: '67 anni', grande: true },
        { h: 'Dal 2027', t: '**Un primo piccolo aumento**', grande: true }] },
{ id: 's32', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Cambia anche per il Fondo',
  col: [{ h: 'Vecchiaia', t: 'Quella data', grande: true },
        { h: 'Anzianità', t: '**10 anni prima di quella data**', grande: true }] },
{ id: 's33', tipo: 'frase', tema: 'chiaro', sopratitolo: 'Quando pianifichi',
  testo: 'Parti dalla <b class="a">tua</b> data di pensione pubblica,<br>non da un numero generico.' },
{ id: 's34', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Dove verificarla',
  col: [{ h: 'INPS', t: 'Servizi online', grande: true },
        { h: 'Patronato', t: '**E l\'estratto conto**', grande: true }] },
{ id: 's35', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Da lì parte tutto il resto', illu: 'calendario',
  titolo: 'Scrivila<br>**sul calendario**' },

// 6 · memo
{ id: 's36', tipo: 'frase', tema: 'profondo', sopratitolo: 'Da ricordare',
  testo: 'Prima smetti,<br><b class="a">poi ritiri.</b>' },

// 7 · chiusura
{ id: 's37', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE, attive: [0] },
{ id: 's38', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE, attive: [0, 1] },
{ id: 's39', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE },
{ id: 's40', tipo: 'mossa', tema: 'chiaro', sopratitolo: 'La mossa di oggi', illu: 'lente',
  titolo: 'Conta i tuoi **anni di iscrizione**', passi: PASSI },
{ id: 's41', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Con calma', illu: 'lettera',
  titolo: 'Adesione<br>**e uscita**', sotto: 'Due date, una sottrazione.' },
{ id: 's42', tipo: 'tre', tema: 'chiaro', sopratitolo: 'Quale strada si apre per te?',
  box: [{ n: 'VECCHIAIA', t: 'Età e 5 anni' }, { n: 'ANZIANITÀ', t: '15 anni' }, { n: 'RISCATTO', t: 'Meno di 5 anni' }] },
varco('s43', 'Vicino a una soglia? Ogni anno conta', 'porte'),
{ id: 's44', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Prossima lezione', illu: 'bilancia',
  titolo: 'La prima grande<br>**scelta**', sotto: 'Si fa una volta sola.' },
{ id: 's45', tipo: 'tre', tema: 'chiaro', sopratitolo: 'Al momento della pensione',
  box: [{ n: 'CAPITALE', t: 'Una somma unica' }, { n: 'RENDITA', t: 'Un assegno a vita' }, { n: 'O ENTRAMBI', t: 'Un po\' e un po\'', key: true }] },
{ id: 's46', tipo: 'tre', tema: 'chiaro', sopratitolo: 'Vedremo',
  box: [{ n: 'LA REGOLA', t: 'Del 50%' }, { n: 'L\'ECCEZIONE', t: 'Per le posizioni piccole' }, { n: 'COME', t: 'Scegliere', key: true }] },
{ id: 's47', tipo: 'figura', tema: 'chiaro', sopratitolo: 'E le tasse', illu: 'euro',
  titolo: 'Capitale e rendita<br>**davanti al fisco**' },
{ id: 's48', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Ci vediamo nella lezione 9.2', illu: 'bilancia',
  titolo: 'Capitale<br>**o rendita?**' },

{ id: 's49', tipo: 'copertina', tema: 'profondo', chiusura: true, corso: CORSO, firma: FIRMA },
];
