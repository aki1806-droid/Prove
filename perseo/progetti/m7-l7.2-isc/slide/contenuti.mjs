// Contenuto delle 49 scene della lezione 7.2 — L'ISC, il numero da guardare.
// s02–s48 sono i blocchi 1–47 del copione, uno a uno.

const CORSO = 'Perseo Sirio senza segreti';
const FIRMA = 'Un corso CISL FP Padova Rovigo';

const RIGHE = [
  ['Garantito', '0,87%', '0,68%', '0,60%', '**0,53%**'],
  ['Obbligazionario', '0,53%', '0,35%', '0,27%', '**0,20%**'],
  ['Azionario', '0,58%', '0,39%', '0,31%', '**0,24%**'],
];
const isc = (id, sop, chiave) => ({ id, tipo: 'tabella', tema: 'chiaro', sopratitolo: sop,
  intestazioni: ['Comparto', '2 anni', '5 anni', '10 anni', '35 anni'], colonne: ['32%', '17%', '17%', '17%', '17%'], righe: RIGHE, chiave });

const MEDIE = [
  { n: 'FONDI NEGOZIALI', t: '0,47%', d: 'come Perseo Sirio' },
  { n: 'FONDI APERTI', t: '1,36%', d: 'media' },
  { n: 'PIP', t: '2,17%', d: 'media' },
];
const med = (id, sop, k) => ({ id, tipo: 'tre', tema: 'chiaro', cifre: true, sopratitolo: sop, box: MEDIE.map((b, i) => ({ ...b, key: k === 9 || i === k })) });

const imb = (id, sop, fase) => ({ id, tipo: 'imbuto', tema: 'chiaro', sopratitolo: sop, fase });

const TRE_COSE = [
  'ISC: **tutti i costi in un numero**',
  'Calcolato **uguale per tutti**',
  'Un punto in più pesa **il 18% in 35 anni**',
];

const PASSI = [
  { t: 'Sito COVIP · **comparatore dei costi**' },
  { t: 'Cerca **Perseo Sirio**' },
  { t: 'Confronta con **le medie**', key: true },
];

export const SCENE = [
{ id: 's01', tipo: 'copertina', tema: 'chiaro',
  modulo: 'Modulo 7 · Costi e trasparenza',
  titolo: 'L\'ISC, il numero<br>da guardare', sottotitolo: 'Lezione 7.2',
  ente: `${CORSO} · ${FIRMA}` },

// 1 · apertura
{ id: 's02', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Quando compri un frigorifero', illu: 'semaforo',
  titolo: 'Guardi<br>**l\'etichetta energetica**' },
{ id: 's03', tipo: 'frase', tema: 'chiaro', sopratitolo: 'Il compressore?',
  testo: 'Non serve capirlo.<br><b class="a">Basta una lettera per confrontare.</b>' },
{ id: 's04', tipo: 'cifre', tema: 'chiaro', sopratitolo: 'Per i fondi pensione',
  voci: [{ n: 'ISC', t: 'Indicatore sintetico dei costi', key: true }] },
{ id: 's05', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Un numero solo',
  col: [{ h: 'Calcolato', t: '**Allo stesso modo**', grande: true },
        { h: 'Da tutti', t: 'I fondi italiani', grande: true }] },
{ id: 's06', tipo: 'tre', tema: 'chiaro', sopratitolo: 'In questa lezione',
  box: [{ n: 'COME', t: 'Si legge' }, { n: 'PERCHÉ', t: 'È importante' }, { n: 'DOVE', t: 'Si trova', key: true }] },

// 2 · come si calcola
{ id: 's07', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Come si calcola', illu: 'libro',
  titolo: 'Una regola<br>**della COVIP**', sotto: 'Uguale per tutti i fondi.' },
imb('s08', 'Un aderente tipo, uguale per tutti', 'ipotesi'),
imb('s09', 'Ipotesi comuni, non previsioni', 'ipotesi'),
imb('s10', 'Tutti i costi insieme', 'imbuto'),
imb('s11', 'Ne esce un solo numero', 'imbuto'),
{ id: 's12', tipo: 'tre', tema: 'chiaro', cifre: true, sopratitolo: 'Quattro durate di permanenza',
  box: [{ n: 'BREVE', t: '2 · 5', d: 'anni' }, { n: 'MEDIO', t: '10', d: 'anni', key: true }, { n: 'LUNGO', t: '35', d: 'anni' }] },
{ id: 's13', tipo: 'frase', tema: 'chiaro', sopratitolo: 'Ipotesi uguali per tutti',
  testo: 'Un confronto equo,<br><b class="a">come l\'etichetta del frigorifero.</b>' },

// 3 · l'ISC di Perseo Sirio
isc('s14', 'ISC di Perseo Sirio · Nota informativa dal 27/03/2026', []),
isc('s15', 'Con gli anni, l\'ISC scende', []),
isc('s16', 'Il Garantito', [0]),
isc('s17', 'L\'Obbligazionario', [1]),
isc('s18', 'L\'Azionario', [2]),
{ id: 's19', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Perché scende? La quota associativa è fissa',
  col: [{ h: 'Posizione piccola', t: 'Pesa **molto**', grande: true },
        { h: 'Posizione grande', t: 'Pesa **sempre meno**', grande: true }] },
{ id: 's20', tipo: 'confronto', tema: 'chiaro', sopratitolo: '13 € l\'anno',
  col: [{ h: 'Su poche centinaia', t: '**Tanti**', grande: true },
        { h: 'Su decine di migliaia', t: 'Quasi **niente**', grande: true }] },
{ id: 's21', tipo: 'figura', tema: 'chiaro', sopratitolo: 'I profili bilanciati', illu: 'bilancia',
  titolo: 'Una via di mezzo<br>**tra i comparti**', sotto: 'In proporzione a quanto pesa ciascuno.' },
{ id: 's22', tipo: 'cifre', tema: 'chiaro', sopratitolo: 'Perseo Sirio · ISC a 10 anni',
  voci: [{ n: '0,27–0,60%', t: 'A seconda del comparto', key: true }] },

// 4 · perché conta
{ id: 's23', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Zero virgola qualcosa', illu: 'domanda',
  titolo: 'Perché è<br>**così importante?**' },
{ id: 's24', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Lo dice la COVIP', illu: 'campana',
  titolo: 'Un\'avvertenza<br>**in ogni Nota informativa**' },
{ id: 's25', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Dopo 35 anni · avvertenza COVIP',
  col: [{ h: 'ISC 2% invece di 1%', t: 'Capitale ridotto', grande: true },
        { h: 'Di circa', t: '**il 18%**', grande: true }] },
{ id: 's26', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Per esempio',
  col: [{ h: 'Invece di', t: '100.000 €', grande: true },
        { h: 'Restano', t: '**82.000 €**', grande: true }] },
{ id: 's27', tipo: 'cifre', tema: 'chiaro', sopratitolo: 'Un punto percentuale',
  voci: [{ n: '1 € su 100', t: 'Ogni anno, per decenni, su tutta la posizione', key: true }] },
{ id: 's28', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Ogni euro di costo',
  col: [{ h: 'Esce oggi', t: 'Dalla posizione', grande: true },
        { h: 'E non rende più', t: '**Per tutti gli anni dopo**', grande: true }] },
{ id: 's29', tipo: 'frase', tema: 'chiaro', sopratitolo: 'L\'interesse composto, al contrario',
  testo: 'Lo stesso meccanismo<br><b class="a">fa crescere anche i costi.</b>' },

// 5 · dove si confronta
{ id: 's30', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Dove si confronta · gratis',
  col: [{ h: 'Sito COVIP', t: '**Il comparatore**', grande: true },
        { h: 'Nota informativa', t: '**Il grafico**', grande: true }] },
{ id: 's31', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Sul sito della COVIP', illu: 'schermo',
  titolo: 'Il comparatore<br>**dei costi**', sotto: 'Forma, comparto, ISC.' },
{ id: 's32', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Nella scheda costi', illu: 'stelle',
  titolo: 'L\'ISC del fondo<br>**accanto alle medie**' },
med('s33', 'ISC medio a 10 anni · Relazione COVIP 2025', 9),
{ id: 's34', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Un consiglio pratico', illu: 'dialogo',
  titolo: 'Chiedi<br>**l\'ISC a 10 anni**' },
{ id: 's35', tipo: 'frase', tema: 'chiaro', sopratitolo: 'E confrontalo',
  testo: 'Chi vende un prodotto serio<br><b class="a">sa rispondere.</b>' },
{ id: 's36', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Risposta vaga?', illu: 'lente',
  titolo: 'Anche quella<br>**è un\'informazione**' },

// 6 · memo
{ id: 's37', tipo: 'frase', tema: 'profondo', sopratitolo: 'Da ricordare',
  testo: 'Prima di firmare,<br><b class="a">chiedi l\'ISC.</b>' },

// 7 · chiusura
{ id: 's38', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE, attive: [0] },
{ id: 's39', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE, attive: [0, 1] },
{ id: 's40', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE },
{ id: 's41', tipo: 'mossa', tema: 'chiaro', sopratitolo: 'La mossa di oggi', illu: 'schermo',
  titolo: 'Prova il **comparatore COVIP**', passi: PASSI },
med('s42', 'Dove si colloca Perseo Sirio?', 0),
isc('s43', 'Il comparto del tuo profilo · ISC a 10 anni', []),
{ id: 's44', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Non serve essere esperti', illu: 'bussola',
  titolo: 'Quale numero,<br>**dove, con cosa**' },
{ id: 's45', tipo: 'frase', tema: 'chiaro', sopratitolo: 'Le percentuali, da sole',
  testo: 'Zero virgola qualcosa<br><b class="a">non fa effetto a nessuno.</b>' },
{ id: 's46', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Prossima lezione', illu: 'salvadanaio',
  titolo: 'Tutto<br>**in euro**', sotto: 'Quelli che restano nella tua posizione.' },
{ id: 's47', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Dopo trent\'anni di versamenti', illu: 'clessidra',
  titolo: 'Quanto vale<br>**una piccola differenza?**' },
{ id: 's48', tipo: 'cifre', tema: 'chiaro', sopratitolo: 'Lezione 7.3',
  voci: [{ n: '0,5%', t: 'Che vale migliaia di euro', key: true }] },

{ id: 's49', tipo: 'copertina', tema: 'profondo', chiusura: true, corso: CORSO, firma: FIRMA },
];
