// Contenuto delle 46 scene della lezione 2.2 — Come si calcola il TFS.
// s02–s45 sono i blocchi 1–44 del copione, uno a uno.

const CORSO = 'Perseo Sirio senza segreti';
const FIRMA = 'Un corso CISL FP Padova Rovigo';

const NOMI = [
  { n: 'IPS', t: 'Sanità, regioni, enti locali', key: true },
  { n: 'BUONUSCITA', t: 'Ministeri, agenzie fiscali, università' },
  { n: 'ANZIANITÀ', t: 'Enti non economici, camere di commercio' },
];

const RICETTA = [
  { t: 'Ultima **retribuzione annua utile**' },
  { t: 'Se ne prende l\'**80%**' },
  { t: 'Si divide per **15**' },
  { t: 'Per gli **anni di servizio**', key: true },
];

const TEMPI = [
  { anno: '12 + 3 mesi', et: 'Pensione di vecchiaia' },
  { anno: '9 + 3 mesi', et: 'Requisiti dal 2027', key: true },
  { anno: '24 + 3 mesi', et: 'Dimissioni senza pensione' },
];

const TRE_COSE = [
  '**IPS**, buonuscita o anzianità, secondo il comparto',
  '80% dell\'ultima retribuzione **÷ 15 × anni**',
  'Premia gli **aumenti di fine carriera**',
];

const PASSI = [
  { t: 'Retribuzione **tabellare annua lorda**' },
  { t: 'Prendi l\'**80%** e dividi per **15**' },
  { t: 'Moltiplica per gli **anni di servizio**' },
  { t: 'Un **ordine di grandezza**', key: true },
];

const ricetta = (id, n, sop) => ({ id, tipo: 'catena', tema: 'chiaro', sopratitolo: sop ?? 'La ricetta dell\'IPS',
  passi: RICETTA, attive: [...Array(n).keys()] });

export const SCENE = [
{ id: 's01', tipo: 'copertina', tema: 'chiaro',
  modulo: 'Modulo 2 · La tua liquidazione: TFS e TFR',
  titolo: 'Come si calcola<br>il TFS', sottotitolo: 'Lezione 2.2',
  ente: `${CORSO} · ${FIRMA}` },

// 1 · apertura
{ id: 's02', tipo: 'scalini', tema: 'chiaro', sopratitolo: 'Una carriera è una scala' },
{ id: 's03', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Il TFS', illu: 'lente',
  titolo: 'Guarda<br>l\'**ultimo gradino**', sotto: 'E lo moltiplica per gli anni.' },
{ id: 's04', tipo: 'tre', tema: 'chiaro', sopratitolo: 'In questa lezione',
  box: [{ n: 'PRIMA', t: 'La formula' }, { n: 'POI', t: 'Un esempio' }, { n: 'E', t: 'Chi ci guadagna', key: true }] },
{ id: 's05', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Se sei in TFR', illu: 'generazioni',
  titolo: 'Ti serve<br>per i **colleghi anziani**' },

// 2 · i tre nomi
{ id: 's06', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Prima di tutto, i nomi', illu: 'domanda',
  titolo: 'Un TFS,<br>**tre nomi**' },
{ id: 's07', tipo: 'griglia', tema: 'chiaro', colonne: 1, spunta: false, sopratitolo: 'Il TFS secondo il comparto', celle: NOMI, attive: [0] },
{ id: 's08', tipo: 'griglia', tema: 'chiaro', colonne: 1, spunta: false, sopratitolo: 'Il TFS secondo il comparto', celle: NOMI, attive: [0, 1] },
{ id: 's09', tipo: 'griglia', tema: 'chiaro', colonne: 1, spunta: false, sopratitolo: 'Il TFS secondo il comparto', celle: NOMI },
{ id: 's10', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Quale usa il tuo ente', illu: 'cartella',
  titolo: 'Chiedi<br>all\'**ufficio del personale**' },
{ id: 's11', tipo: 'conto', tema: 'chiaro', sopratitolo: 'La logica è la stessa',
  voci: [{ v: 'Una parte', lb: 'dell\'ultima retribuzione' }, { v: 'Anni', lb: 'di servizio' }, { v: 'TFS', lb: 'cambiano i coefficienti' }],
  op: ['×', '='] },

// 3 · la ricetta
{ id: 's12', tipo: 'figura', tema: 'chiaro', sopratitolo: 'L\'IPS come una ricetta', illu: 'libro',
  titolo: 'Tre ingredienti,<br>**un ordine preciso**' },
ricetta('s13', 1),
ricetta('s14', 2),
ricetta('s15', 3),
ricetta('s16', 4),
{ id: 's17', tipo: 'tabella', tema: 'chiaro', sopratitolo: 'Gli altri due nomi',
  intestazioni: ['', 'Si parte da', 'Si divide per'], colonne: ['36%', '36%', '28%'],
  righe: [['IPS', '80% della retribuzione', '15'], ['Buonuscita', '80% della retribuzione', '12'], ['Anzianità', 'retribuzione intera', '12']],
  chiave: [1, 2] },

// 4 · l'esempio
{ id: 's18', tipo: 'cifre', tema: 'chiaro', sopratitolo: 'Un esempio con numeri tondi',
  voci: [{ n: '30.000', suf: '€', t: 'Ultima retribuzione annua utile' }, { n: '30', t: 'Anni di servizio', key: true }] },
{ id: 's19', tipo: 'conto', tema: 'chiaro', sopratitolo: 'La mensilità di riferimento',
  voci: [{ v: '30.000', lb: 'euro di retribuzione' }, { v: '24.000', lb: 'l\'80%' }, { v: '1.600', lb: 'diviso 15: la mensilità' }],
  op: ['→', '→'] },
{ id: 's20', tipo: 'conto', tema: 'chiaro', sopratitolo: 'Trent\'anni di servizio',
  voci: [{ v: '1.600 €', lb: 'mensilità' }, { v: '30', lb: 'anni' }, { v: '48.000 €', lb: 'lordi di IPS' }],
  op: ['×', '='] },
{ id: 's21', tipo: 'conto', tema: 'chiaro', sopratitolo: 'La controprova: vent\'anni',
  voci: [{ v: '1.600 €', lb: 'mensilità' }, { v: '20', lb: 'anni' }, { v: '32.000 €', lb: 'lordi di IPS' }],
  op: ['×', '='] },
{ id: 's22', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Importi lordi', illu: 'bilancia',
  titolo: 'Tassazione<br>**separata**', sotto: 'Ne parliamo più avanti.' },
{ id: 's23', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Retribuzione utile',
  col: [{ h: 'Conta', t: 'Alcune **voci fisse**', grande: true },
        { h: 'Non è', t: 'Tutto il **cedolino**', grande: true }] },
{ id: 's24', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Il conto a occhio', illu: 'lente',
  titolo: 'Sul netto in busta<br>**di solito sbaglia**', sotto: 'Molte indennità accessorie restano fuori.' },

// 5 · chi ci guadagna
{ id: 's25', tipo: 'scalini', tema: 'chiaro', sopratitolo: 'Il punto di forza del TFS' },
{ id: 's26', tipo: 'icone', tema: 'chiaro', sopratitolo: 'Negli ultimi anni',
  voci: [{ icona: 'cappello', t: 'Una progressione' }, { icona: 'persone', t: 'Un coordinamento' }, { icona: 'certificato', t: 'Un passaggio di area', key: true }] },
{ id: 's27', tipo: 'figura', tema: 'chiaro', sopratitolo: 'L\'aumento finale', illu: 'calendario',
  titolo: 'Vale per<br>**tutti gli anni**' },
{ id: 's28', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Una carriera piatta', illu: 'bilancia',
  titolo: 'Il vantaggio<br>**si riduce**' },
{ id: 's29', tipo: 'scalini', tema: 'chiaro', sopratitolo: 'Due colleghe, stessi anni' },
{ id: 's30', tipo: 'scambio', tema: 'chiaro', sopratitolo: 'Quando valuteremo il passaggio' },
{ id: 's31', tipo: 'figura', tema: 'chiaro', sopratitolo: 'La domanda da farsi', illu: 'domanda',
  titolo: 'Come crescerà<br>il mio **stipendio**?', sotto: 'Basta un\'idea onesta.' },

// 6 · i tempi
{ id: 's32', tipo: 'figura', tema: 'chiaro', sopratitolo: 'TFS e TFR nel pubblico', illu: 'clessidra',
  titolo: 'Non arriva<br>**il giorno dopo**' },
{ id: 's33', tipo: 'timeline', tema: 'chiaro', sopratitolo: 'Quanto si aspetta', tappe: TEMPI, attive: [0] },
{ id: 's34', tipo: 'timeline', tema: 'chiaro', sopratitolo: 'Quanto si aspetta', tappe: TEMPI, attive: [0, 1] },
{ id: 's35', tipo: 'timeline', tema: 'chiaro', sopratitolo: 'Quanto si aspetta', tappe: TEMPI },
{ id: 's36', tipo: 'cifre', tema: 'chiaro', sopratitolo: 'Sopra i cinquantamila euro',
  voci: [{ n: '50.000', suf: '€', t: 'Oltre questa soglia si paga a rate', d: 'A un anno di distanza l\'una dall\'altra.', key: true }] },
{ id: 's37', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Regole cambiate più volte', illu: 'lente',
  titolo: 'Prima di uscire,<br>**verifica**' },
{ id: 's38', tipo: 'figura', tema: 'chiaro', sopratitolo: 'I primi anni dopo il lavoro', illu: 'calendario',
  titolo: 'Pensaci<br>**per tempo**' },

// 7 · memo
{ id: 's39', tipo: 'frase', tema: 'profondo', sopratitolo: 'Da ricordare',
  testo: 'Il TFS guarda soprattutto a <b class="a">come finisci la carriera</b>.' },

// 8 · chiusura
{ id: 's40', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE, attive: [0] },
{ id: 's41', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE, attive: [0, 1] },
{ id: 's42', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE },
{ id: 's43', tipo: 'mossa', tema: 'chiaro', sopratitolo: 'La mossa di oggi · se sei in TFS', illu: 'calendario',
  titolo: 'Fai il **tuo conto**', passi: PASSI.slice(0, 3) },
{ id: 's44', tipo: 'mossa', tema: 'chiaro', sopratitolo: 'La mossa di oggi · se sei in TFS', illu: 'calendario',
  titolo: 'Fai il **tuo conto**', passi: PASSI },
{ id: 's45', tipo: 'montante', tema: 'chiaro', sopratitolo: 'Prossima lezione: il TFR', fase: 'accumulo', etichetta: 'TFR' },

{ id: 's46', tipo: 'copertina', tema: 'profondo', chiusura: true, corso: CORSO, firma: FIRMA },
];
