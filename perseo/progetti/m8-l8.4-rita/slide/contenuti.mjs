// Contenuto delle 49 scene della lezione 8.4 — La RITA.
// s02–s48 sono i blocchi 1–47 del copione, uno a uno.

const CORSO = 'Perseo Sirio senza segreti';
const FIRMA = 'Un corso CISL FP Padova Rovigo';

const RIGHE = [
  ['Lavoro', 'Cessato', 'Cessato'],
  ['Contributi INPS', '**Almeno 20 anni**', '—'],
  ['Senza lavoro', '—', '**Da oltre 24 mesi**'],
  ['Previdenza complementare', '5 anni', '5 anni'],
  ['Mancano alla vecchiaia', '**Al massimo 5 anni**', '**Al massimo 10 anni**'],
];
const str = (id, k, chiave, sop = 'Le due strade per la RITA') => ({ id, tipo: 'tabella', tema: 'chiaro', sopratitolo: sop,
  intestazioni: ['', 'Strada A', 'Strada B'], colonne: ['36%', '32%', '32%'], righe: RIGHE.slice(0, k), chiave });
const rit = (id, sop, fase) => ({ id, tipo: 'rita', tema: 'chiaro', sopratitolo: sop, fase });

const TRE_COSE = [
  'Cessazione del lavoro e **5 anni** di partecipazione',
  'Fino a **5 anni** prima (o **10** se senza lavoro)',
  'Rate **trimestrali**, tassazione **15% → 9%**',
];

const PASSI = [
  { t: 'Apri l\'**estratto conto INPS**' },
  { t: 'Quando arrivi a **20 anni** di contributi?' },
  { t: 'Quando compi l\'età di **vecchiaia**?', key: true },
];

export const SCENE = [
{ id: 's01', tipo: 'copertina', tema: 'chiaro',
  modulo: 'Modulo 8 · Prima della pensione',
  titolo: 'La RITA', sottotitolo: 'Lezione 8.4',
  ente: `${CORSO} · ${FIRMA}` },

// 1 · apertura
rit('s02', 'Tra la fine del lavoro e la pensione', 'linea'),
{ id: 's03', tipo: 'tre', tema: 'chiaro', sopratitolo: 'Qualche anno senza stipendio e senza pensione',
  box: [{ n: 'CHI PERDE', t: 'Il lavoro tardi' }, { n: 'CHI SI FERMA', t: 'Per salute o famiglia' }, { n: 'CHI SCEGLIE', t: 'Di smettere prima' }] },
{ id: 's04', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Rendita integrativa temporanea anticipata', illu: 'clessidra',
  titolo: 'Un ponte:<br>**la RITA**' },
rit('s05', 'Un reddito ponte, fino alla vecchiaia', 'rate'),
{ id: 's06', tipo: 'tre', tema: 'chiaro', sopratitolo: 'In questa lezione',
  box: [{ n: 'CHI', t: 'Può chiederla' }, { n: 'COME', t: 'Funziona' }, { n: 'QUANDO', t: 'Conviene davvero', key: true }] },

// 2 · le due strade
{ id: 's07', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Le strade sono due',
  col: [{ h: 'Strada A', t: '**20 anni di contributi**', grande: true },
        { h: 'Strada B', t: '**Senza lavoro da 2 anni**', grande: true }] },
str('s08', 2, [1], 'Strada A'),
str('s09', 5, [3, 4], 'Strada A'),
str('s10', 5, [2], 'Strada B'),
str('s11', 5, [4], 'Strada B: un ponte più lungo'),
str('s12', 5, [0], 'Il requisito comune'),
{ id: 's13', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Da dove si contano gli anni', illu: 'calendario',
  titolo: 'Dalla tua data<br>**di vecchiaia pubblica**', sotto: 'Non da quando smetti.' },

// 3 · come funziona
{ id: 's14', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Il primo passo', illu: 'bilancia',
  titolo: 'Quanta parte<br>**destinare alla RITA?**' },
{ id: 's15', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'La scelta è tua',
  col: [{ h: 'Tutta', t: 'La posizione', grande: true },
        { h: 'Oppure', t: '**Solo una parte**', grande: true }] },
rit('s16', 'Rate trimestrali, fino alla vecchiaia', 'rate'),
rit('s17', 'Come uno stipendio ridotto', 'rate'),
{ id: 's18', tipo: 'tre', tema: 'chiaro', cifre: true, sopratitolo: 'Esempio semplificato · prima delle tasse',
  box: [{ n: 'ALLA RITA', t: '40.000 €' }, { n: 'MANCANO', t: '5 anni', d: '20 rate' }, { n: 'OGNI RATA', t: '≈ 2.000 €', key: true }] },
{ id: 's19', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Nel frattempo', illu: 'scudo',
  titolo: 'Resta investita,<br>**di norma nel Garantito**', sotto: 'Salvo una tua diversa scelta.' },
{ id: 's20', tipo: 'frase', tema: 'chiaro', sopratitolo: 'Per questo',
  testo: 'Le rate possono variare:<br><b class="a">non sono una cifra fissa.</b>' },
rit('s21', 'La parte che non usi resta nel Fondo', 'resto'),
{ id: 's22', tipo: 'cifre', tema: 'chiaro', sopratitolo: 'Quota associativa in RITA · modulo 7',
  voci: [{ n: '10 €', t: 'L\'anno, invece di 13', key: true }] },

// 4 · buono a sapersi
{ id: 's23', tipo: 'tre', tema: 'chiaro', sopratitolo: 'Tre cose buone da sapere',
  box: [{ n: '1', t: 'Tassazione agevolata' }, { n: '2', t: 'Si può revocare' }, { n: '3', t: 'Trasferire = revocare' }] },
{ id: 's24', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Prima: la tassazione',
  col: [{ h: 'RITA', t: '**Come la pensione**', grande: true },
        { h: 'Riscatto volontario', t: '23%', grande: true }] },
{ id: 's25', tipo: 'scala', tema: 'chiaro', sopratitolo: 'Dal 15% al 9%, in base agli anni di partecipazione', a: 35 },
{ id: 's26', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Seconda', illu: 'bussola',
  titolo: 'Si può<br>**revocare**', sotto: 'Non è una scelta definitiva.' },
{ id: 's27', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Terza', illu: 'catena',
  titolo: 'Se trasferisci,<br>**la RITA si revoca**' },
{ id: 's28', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Dopo la cessazione', illu: 'lettera',
  titolo: 'Un modulo<br>**dedicato**', sotto: 'E un documento informativo sul sito.' },
{ id: 's29', tipo: 'tre', tema: 'chiaro', sopratitolo: 'Leggilo prima di firmare',
  box: [{ n: 'I REQUISITI', t: '' }, { n: 'I DOCUMENTI', t: 'Da allegare' }, { n: 'GLI ESEMPI', t: 'Di calcolo delle rate' }] },

// 5 · per chi è utile
{ id: 's30', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Per chi è utile', illu: 'persona',
  titolo: 'Chi lascia il lavoro<br>**qualche anno prima**' },
{ id: 's31', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Ma va valutata con cura',
  col: [{ h: 'Usare prima', t: 'La posizione', grande: true },
        { h: 'Significa', t: '**Meno pensione dopo**', grande: true }] },
{ id: 's32', tipo: 'figura', tema: 'chiaro', sopratitolo: 'La vecchiaia', illu: 'clessidra',
  titolo: 'Può durare<br>**a lungo**' },
{ id: 's33', tipo: 'tre', tema: 'chiaro', sopratitolo: 'Prima di chiederla, fai i conti',
  box: [{ n: 'QUANTO', t: 'Ti serve al mese' }, { n: 'PER QUANTI', t: 'Anni' }, { n: 'QUANTO RESTA', t: 'Per la pensione', key: true }] },
rit('s34', 'A volte basta una parte', 'resto'),
{ id: 's35', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Con i tuoi numeri veri', illu: 'dialogo',
  titolo: 'Patronato<br>**e Fondo**', sotto: 'Ti aiutano a simulare.' },
{ id: 's36', tipo: 'figura', tema: 'chiaro', sopratitolo: 'E la pensione pubblica?', illu: 'calendario',
  titolo: 'Verifica<br>**la data esatta**', sotto: 'Con l\'INPS o il patronato.' },

// 6 · memo
{ id: 's37', tipo: 'frase', tema: 'profondo', sopratitolo: 'Da ricordare',
  testo: 'Un ponte per attraversare,<br><b class="a">non per svuotare.</b>' },

// 7 · chiusura
{ id: 's38', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE, attive: [0] },
{ id: 's39', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE, attive: [0, 1] },
str('s40', 5, [4], 'Strada A e strada B'),
{ id: 's41', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE },
{ id: 's42', tipo: 'mossa', tema: 'chiaro', sopratitolo: 'La mossa di oggi', illu: 'lente',
  titolo: 'Segna **due date**', passi: PASSI },
{ id: 's43', tipo: 'cifre', tema: 'chiaro', sopratitolo: 'Prima condizione della strada A',
  voci: [{ n: '20 anni', t: 'Di contributi INPS: in che anno?', key: true }] },
rit('s44', 'Tra le due date: lo spazio del ponte', 'linea'),
{ id: 's45', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Prossima lezione, l\'ultima del modulo', illu: 'mani',
  titolo: 'Un tema<br>**delicato**' },
{ id: 's46', tipo: 'tre', tema: 'chiaro', sopratitolo: 'Se l\'iscritto muore prima della pensione',
  box: [{ n: 'CHE COSA', t: 'Succede alla posizione' }, { n: 'CHI', t: 'La riceve' }, { n: 'COME', t: 'Farla arrivare alle persone giuste', key: true }] },
{ id: 's47', tipo: 'figura', tema: 'chiaro', sopratitolo: 'E un tema pratico', illu: 'contratto',
  titolo: 'La cessione<br>**del quinto**' },
{ id: 's48', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Ci vediamo nella lezione 8.5', illu: 'bussola',
  titolo: 'Se succede<br>**il peggio**' },

{ id: 's49', tipo: 'copertina', tema: 'profondo', chiusura: true, corso: CORSO, firma: FIRMA },
];
