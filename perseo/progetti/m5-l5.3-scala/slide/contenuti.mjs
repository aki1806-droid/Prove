// Contenuto delle 49 scene della lezione 5.3 — Dal 15% al 9%.
// s02–s48 sono i blocchi 1–47 del copione, uno a uno.

const CORSO = 'Perseo Sirio senza segreti';
const FIRMA = 'Un corso CISL FP Padova Rovigo';

const sca = (id, sop, a) => ({ id, tipo: 'scala', tema: 'chiaro', sopratitolo: sop, a });
const tor = (id, sop, fase) => ({ id, tipo: 'torta', tema: 'chiaro', sopratitolo: sop, fase });

const RIGHE = [
  ['Stipendio e pensione pubblica', 'IRPEF 23%, 33%, 43% + addizionali'],
  ['Pensione complementare', '**15% → 9%**, senza addizionali'],
];
const tab = (id, k, chiave) => ({ id, tipo: 'tabella', tema: 'chiaro', sopratitolo: 'Il confronto · esempio semplificato',
  intestazioni: ['Reddito o prestazione', 'Imposta'], colonne: ['45%', '55%'], righe: RIGHE.slice(0, k), chiave });

const USCITE = [
  ['Pensione complementare, rendita o capitale', '15% → 9%'],
  ['Anticipazione per spese sanitarie', '15% → 9%'],
  ['Riscatto per decesso, invalidità, lunga inoccupazione', '15% → 9%'],
  ['Anticipazione per la casa, congedi formativi', '23%'],
  ['Riscatto per dimissioni', '23%'],
];
const usc = (id, k, chiave) => ({ id, tipo: 'tabella', tema: 'chiaro', sopratitolo: 'Non tutte le uscite sono uguali',
  intestazioni: ['Uscita', 'Imposta'], colonne: ['70%', '30%'], righe: USCITE.slice(0, k), chiave });

const TRE_COSE = [
  '**15%**, poi **−0,30** l\'anno',
  'Minimo **9%** a 35 anni',
  'Rendimenti **non ritassati**',
];

const PASSI = [
  { t: 'Anni di partecipazione **meno 15**' },
  { t: 'Moltiplica **per 0,3**' },
  { t: 'Togli da **15** (minimo 9)', key: true },
];

export const SCENE = [
{ id: 's01', tipo: 'copertina', tema: 'chiaro',
  modulo: 'Modulo 5 · Il fisco: dove si guadagna davvero',
  titolo: 'Dal 15%<br>al 9%', sottotitolo: 'Lezione 5.3',
  ente: `${CORSO} · ${FIRMA}` },

// 1 · apertura
{ id: 's02', tipo: 'tre', tema: 'chiaro', sopratitolo: 'Tre vantaggi fiscali',
  box: [{ n: '5.1', t: 'Sui contributi' }, { n: '5.2', t: 'Sui rendimenti' }, { n: '5.3', t: 'All\'arrivo · il più importante', key: true }] },
sca('s03', 'Una scala che si scende un gradino all\'anno', 15),
{ id: 's04', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Premia chi resta', illu: 'clessidra',
  titolo: 'Più anni,<br>**meno imposta**' },
{ id: 's05', tipo: 'tre', tema: 'chiaro', sopratitolo: 'In questa lezione',
  box: [{ n: 'QUANTO', t: 'Si scende' }, { n: 'FINO A DOVE', t: 'Il minimo' }, { n: 'SU COSA', t: 'Si paga davvero', key: true }] },
{ id: 's06', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Come sempre nel modulo', illu: 'campana',
  titolo: 'Informazioni generali,<br>**non consulenza fiscale**', sotto: 'Esempi semplificati.' },

// 2 · la scala del fisco
sca('s07', 'La scala del fisco', 15),
{ id: 's08', tipo: 'cifre', tema: 'chiaro', sopratitolo: 'Rendita o capitale',
  voci: [{ n: '15%', t: 'Imposta sulle prestazioni del fondo pensione', key: true }] },
sca('s09', 'Fino a 15 anni: fermo sul primo gradino', 15),
sca('s10', 'Poi −0,30 punti per ogni anno', 18),
sca('s11', 'A 20 anni', 20),
sca('s12', 'A 25 e a 30 anni', 30),
sca('s13', 'A 35 anni: il fondo della scala', 35),
{ id: 's14', tipo: 'cifre', tema: 'chiaro', sopratitolo: 'Più in basso non si va',
  voci: [{ n: '9%', t: 'Il minimo, anche con 40 anni', key: true }, { n: '−6', t: 'Punti di riduzione massima' }] },
sca('s15', 'Un esempio · adesione a 40 anni, pensione a 67', 27),
{ id: 's16', tipo: 'conto', tema: 'chiaro', sopratitolo: '27 anni di partecipazione',
  voci: [{ v: '15%', lb: 'di partenza' }, { v: '12 × 0,30', lb: 'anni oltre i 15' }, { v: '11,4%', lb: 'la sua aliquota' }], op: ['−', '='] },

// 3 · il confronto
{ id: 's17', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Quanto vale?', illu: 'bilancia',
  titolo: 'Confrontiamola<br>**con le tasse di sempre**' },
tab('s18', 1, [0]),
tab('s19', 1, [0]),
tab('s20', 2, [1]),
{ id: 's21', tipo: 'tre', tema: 'chiaro', sopratitolo: 'Un\'imposta sostitutiva',
  box: [{ n: 'NON DIPENDE', t: 'Dal tuo reddito' }, { n: 'NON SI SOMMA', t: 'Agli altri redditi' }, { n: 'NON HA', t: 'Addizionali', key: true }] },
{ id: 's22', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Per molti lavoratori', illu: 'scudo',
  titolo: 'Molto meno<br>**che come reddito ordinario**' },
{ id: 's23', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Con 35 anni di partecipazione',
  col: [{ h: 'Pensione complementare', t: '**9%**', grande: true },
        { h: 'Primo scaglione IRPEF', t: '23%', grande: true }] },
{ id: 's24', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Ricordi la lezione 5.1?',
  col: [{ h: 'Entrando', t: 'Dedotti al **tuo scaglione**', grande: true },
        { h: 'Uscendo', t: 'Tassati **dal 15% al 9%**', grande: true }] },
{ id: 's25', tipo: 'frase', tema: 'chiaro', sopratitolo: 'Dove si guadagna',
  testo: 'Tra quello che risparmi entrando<br><b class="a">e quello che paghi uscendo.</b>' },

// 4 · si tassa solo il resto
tor('s26', 'Si tassa solo una parte', 'intera'),
tor('s27', 'Due spicchi hanno già pagato', 'spicchi'),
tor('s28', 'I rendimenti: tassati durante l\'accumulo', 'spicchi'),
tor('s29', 'I contributi non dedotti · lezione 5.4', 'spicchi'),
tor('s30', 'Si tassa solo il resto', 'resto'),

// 5 · non tutte le uscite
usc('s31', 1, [0]),
usc('s32', 2, [0, 1]),
usc('s33', 3, [2]),
usc('s34', 4, [3]),
usc('s35', 5, [3, 4]),
{ id: 's36', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Il messaggio del legislatore', illu: 'pilastri',
  titolo: 'Il trattamento migliore<br>**a chi lo usa per la pensione**' },

// 6 · memo
{ id: 's37', tipo: 'frase', tema: 'profondo', sopratitolo: 'Da ricordare',
  testo: 'Ogni anno in più nel fondo<br><b class="a">è un gradino in meno di tasse.</b>' },

// 7 · chiusura
{ id: 's38', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE, attive: [0] },
{ id: 's39', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE, attive: [0, 1] },
{ id: 's40', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE },
{ id: 's41', tipo: 'mossa', tema: 'chiaro', sopratitolo: 'La mossa di oggi', illu: 'calendario',
  titolo: 'Calcola **la tua aliquota futura**', passi: PASSI },
{ id: 's42', tipo: 'conto', tema: 'chiaro', sopratitolo: 'La formula',
  voci: [{ v: 'anni − 15', lb: 'anni oltre il quindicesimo' }, { v: '0,3', lb: 'punti per anno' }, { v: 'sconto', lb: 'da togliere a 15% · minimo 9%' }], op: ['×', '='] },
sca('s43', 'Sotto il 9% non si scende', 35),
{ id: 's44', tipo: 'figura', tema: 'chiaro', sopratitolo: 'La tua aliquota futura', illu: 'cartella',
  titolo: 'Sulle somme<br>**maturate dal 2018**', sotto: 'Scrivila: ti servirà.' },
{ id: 's45', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Perché dal 2018?', illu: 'pilastri',
  titolo: 'Per i pubblici,<br>**una storia a strati**', sotto: 'Lezione 5.5.' },
{ id: 's46', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Prossima lezione', illu: 'semaforo',
  titolo: 'I contributi<br>**non dedotti**' },
{ id: 's47', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Un passaggio piccolo', illu: 'scudo',
  titolo: 'Per non pagare<br>**due volte sugli stessi soldi**' },
{ id: 's48', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Ci vediamo nella lezione 5.4', illu: 'lettera',
  titolo: 'Comunicarli<br>**al Fondo**' },

{ id: 's49', tipo: 'copertina', tema: 'profondo', chiusura: true, corso: CORSO, firma: FIRMA },
];
