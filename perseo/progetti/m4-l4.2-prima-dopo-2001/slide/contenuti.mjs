// Contenuto delle 49 scene della lezione 4.2 — Assunti prima e dopo il 2001.
// s02–s48 sono i blocchi 1–47 del copione, uno a uno.

const CORSO = 'Perseo Sirio senza segreti';
const FIRMA = 'Un corso CISL FP Padova Rovigo';

const RIGHE = [
  ['Tuo 1%', '300 €', '300 €'],
  ['Ente 1%', '300 €', '300 €'],
  ['TFR al Fondo', '2.073 € (100%)', '600 € (28,94% = 2%)'],
  ['Accantonamento aggiuntivo', '—', '360 € (1,5% di 24.000)'],
  ['**Totale verso la pensione**', '**2.673 €**', '**1.560 €**'],
  ['TFR che resta liquidazione', '—', '1.473 €'],
];
const tab = (id, k, chiave) => ({ id, tipo: 'tabella', tema: 'chiaro', sopratitolo: 'Esempio semplificato · 30.000 € l\'anno, importi lordi',
  intestazioni: ['', 'Assunta dal 2001', 'In servizio al 2000, optante'], colonne: ['36%', '28%', '36%'], righe: RIGHE.slice(0, k), chiave });

const SOPRA = [{ t: 'in servizio al 2000, opta', s: '28,94% + 1,5%' }, { t: 'assunta dal 2001', s: 'TFR 100%' }];
const lin = (id, sop, fase) => ({ id, tipo: 'linea2000', tema: 'chiaro', sopratitolo: sop, fase, sopra: SOPRA, icona: 'salvadanaio' });
const div = (id, sop, fase) => ({ id, tipo: 'divisione', tema: 'chiaro', sopratitolo: sop, fase });

const TRE_COSE = [
  'Dal **2001**: TFR al **100%**',
  'Optanti: **28,94%** + **1,5%**',
  'La leva è **il tuo contributo**',
];

const PASSI = [
  { t: 'Prendi la tua **retribuzione** annua' },
  { t: 'Rifai la **tabella** di questa lezione' },
  { t: 'Bastano **cinque minuti**', key: true },
];

export const SCENE = [
{ id: 's01', tipo: 'copertina', tema: 'chiaro',
  modulo: 'Modulo 4 · Quanto si versa',
  titolo: 'Prima e dopo<br>il 2001', sottotitolo: 'Lezione 4.2',
  ente: `${CORSO} · ${FIRMA}` },

// 1 · apertura
{ id: 's02', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Due colleghe, stesso reparto', illu: 'generazioni',
  titolo: 'Stesso stipendio,<br>**stessa scelta**' },
{ id: 's03', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Eppure', illu: 'domanda',
  titolo: 'Ogni anno<br>**cifre diverse**', sotto: 'Né un errore, né un favoritismo.' },
{ id: 's04', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'L\'unica differenza',
  col: [{ h: 'Una è arrivata nel', t: '**2010**', grande: true },
        { h: 'L\'altra c\'era già', t: '**Alla fine degli anni \'90**', grande: true }] },
{ id: 's05', tipo: 'linea2000', tema: 'chiaro', sopratitolo: 'La linea del 2000', fase: 'linea' },
{ id: 's06', tipo: 'figura', tema: 'chiaro', sopratitolo: 'In questa lezione', illu: 'libro',
  titolo: 'Due ricette,<br>**gli stessi numeri**' },

// 2 · la linea del 2000
lin('s07', 'Stessa scelta, due ricette', 'persone'),
{ id: 's08', tipo: 'cifre', tema: 'chiaro', sopratitolo: 'Assunti dal 2001 o a tempo determinato',
  voci: [{ n: '100%', t: 'Del TFR al Fondo, ogni anno', key: true }] },
lin('s09', 'In servizio al 31 dicembre 2000', 'persone'),
{ id: 's10', tipo: 'cifre', tema: 'chiaro', sopratitolo: 'Chi opta dal TFS al TFR',
  voci: [{ n: '28,94%', t: 'Del TFR al Fondo', key: true }] },
{ id: 's11', tipo: 'conto', tema: 'chiaro', sopratitolo: 'Non è una cifra casuale',
  voci: [{ v: '28,94%', lb: 'del TFR' }, { v: '6,91%', lb: 'il TFR sulla retribuzione' }, { v: '2%', lb: 'della retribuzione' }], op: ['×', '≈'] },
{ id: 's12', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'In pratica',
  col: [{ h: 'Al Fondo', t: '**Meno di un terzo**', grande: true },
        { h: 'Restano dove sono', t: '**Due terzi**', grande: true }] },
{ id: 's13', tipo: 'cifre', tema: 'chiaro', sopratitolo: 'In compenso',
  voci: [{ n: '+1,5%', t: 'Calcolato sull\'80% della retribuzione', key: true }] },
{ id: 's14', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Il resto del TFR', illu: 'cartella',
  titolo: 'Non va perso:<br>**liquidazione**', sotto: 'Si forma all\'INPS, pagata a fine lavoro.' },

// 3 · stessi numeri
{ id: 's15', tipo: 'cifre', tema: 'chiaro', sopratitolo: 'Stessi numeri per tutte e due',
  voci: [{ n: '30.000 €', t: 'Retribuzione utile all\'anno · esempio semplificato', key: true }] },
tab('s16', 2, [0, 1]),
tab('s17', 6, [2, 3, 5]),
tab('s18', 3, [2]),
tab('s19', 5, [4]),
tab('s20', 6, [2]),
tab('s21', 6, [3]),
tab('s22', 6, [4]),
tab('s23', 6, [5]),

// 4 · lo stesso TFR
div('s24', 'Lo stesso TFR, circa 2.073 € l\'anno', 'vuote'),
div('s25', 'La stessa torta, tagliata in modo diverso', 'piene'),
div('s26', 'Per la prima: tutto pensione', 'piene'),
div('s27', 'Per la seconda: una parte, più il premio', 'premio'),
{ id: 's28', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Attenzione', illu: 'bilancia',
  titolo: 'Nessuna delle due<br>**guadagna di più**' },
{ id: 's29', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Due modi di dividere lo stesso TFR',
  col: [{ h: 'Da una parte', t: 'Un **capitale** alla cessazione', grande: true },
        { h: 'Dall\'altra', t: 'Una **pensione** da costruire', grande: true }] },
{ id: 's30', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Il premio dell\'1,5%', illu: 'scudo',
  titolo: 'Compensa in parte<br>**chi lascia il TFS**' },

// 5 · la leva
{ id: 's31', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Una conseguenza pratica', illu: 'bussola',
  titolo: 'Quale **manopola**<br>puoi girare' },
{ id: 's32', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Assunti dal 2001',
  col: [{ h: 'Il TFR', t: 'È **già tutto** al Fondo', grande: true },
        { h: 'Per avere di più', t: 'Alzi **il tuo contributo**', grande: true }] },
{ id: 's33', tipo: 'cifre', tema: 'chiaro', sopratitolo: 'Chi ha optato dal TFS',
  voci: [{ n: '28,94%', t: 'Una quota fissa: la stabiliscono le regole', key: true }] },
{ id: 's34', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Optanti',
  col: [{ h: 'Il TFR al Fondo', t: '**Non si cambia**', grande: true },
        { h: 'Per avere di più', t: 'Alzi **il tuo contributo**', grande: true }] },
{ id: 's35', tipo: 'figura', tema: 'chiaro', sopratitolo: 'In entrambi i casi', illu: 'ingranaggio',
  titolo: 'Una sola manopola:<br>**la tua percentuale**' },
{ id: 's36', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Si gira facilmente', illu: 'schermo',
  titolo: 'Dall\'**area riservata**', sotto: 'Una volta l\'anno · lezione 4.4.' },

// 6 · un principio comune
{ id: 's37', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Due ricette diverse', illu: 'pilastri',
  titolo: 'Un **principio comune**' },
{ id: 's38', tipo: 'ingressi', tema: 'chiaro', sopratitolo: 'Per tutte e due: l\'1% dell\'ente', at: 1 },
{ id: 's39', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Prossima lezione', illu: 'semaforo',
  titolo: 'Quel contributo<br>**si può perdere**' },
{ id: 's40', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Conviene', illu: 'clessidra',
  titolo: 'Saperlo<br>**prima, non dopo**' },

// 7 · memo
{ id: 's41', tipo: 'frase', tema: 'profondo', sopratitolo: 'Da ricordare',
  testo: 'Il TFR è lo stesso. <b class="a">Cambia come lo dividi</b> tra liquidazione e pensione.' },

// 8 · chiusura
{ id: 's42', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE, attive: [0] },
{ id: 's43', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE, attive: [0, 1] },
div('s44', 'Il resto del TFR resta liquidazione', 'premio'),
{ id: 's45', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE },
{ id: 's46', tipo: 'mossa', tema: 'chiaro', sopratitolo: 'La mossa di oggi', illu: 'calendario',
  titolo: 'Rifai **la tabella**', passi: PASSI },
{ id: 's47', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Da che parte della linea stai?', illu: 'lente',
  titolo: 'Guarda la<br>**data di assunzione**', sotto: 'Sul cedolino, o chiedi all\'ufficio del personale.' },
{ id: 's48', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Prossima lezione', illu: 'semaforo',
  titolo: 'Il contributo<br>**che perdi**' },

{ id: 's49', tipo: 'copertina', tema: 'profondo', chiusura: true, corso: CORSO, firma: FIRMA },
];
