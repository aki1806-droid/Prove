// Contenuto delle 37 scene della lezione 1.1 — La pensione che verrà.
// s02–s36 sono i blocchi 1–35 del copione, uno a uno (MASTER, moduli 6-8).
// A schermo al massimo sei parole (gli schemi esclusi), mai la frase detta.

const CORSO = 'Perseo Sirio senza segreti';
const FIRMA = 'Un corso CISL FP Padova Rovigo';

const SISTEMI = [
  { t: '18+ anni di contributi a fine 1995', seg: [['retr', 1977, 2011], ['contr', 2011, 2030]] },
  { t: 'Meno di 18 anni a fine 1995', seg: [['retr', 1986, 1995], ['contr', 1995, 2030]] },
  { t: 'Primo contributo dal 1996', seg: [['contr', 1996, 2030]] },
];

const TRE_COSE = [
  '**Retributivo → contributivo**',
  'Assegno **più basso** dello stipendio',
  'Prima inizi, **meglio è**',
];

const PASSI = [
  { t: 'Entra su **inps.it** con SPID o CIE' },
  { t: 'Apri l\'**estratto conto contributivo**' },
  { t: 'Cerca il **primo anno** di contributi' },
  { t: 'Prova **La mia pensione futura**', key: true },
];

export const SCENE = [
{ id: 's01', tipo: 'copertina', tema: 'chiaro',
  modulo: 'Modulo 1 · Perché pensarci adesso',
  titolo: 'La pensione<br>che verrà', sottotitolo: 'Lezione 1.1',
  ente: `${CORSO} · ${FIRMA}` },

// 1 · apertura: tre vignette al posto del b-roll, senza testo
{ id: 's02', tipo: 'vignetta', tema: 'chiaro', sopratitolo: 'Fine turno', illu: ['armadietto'] },
{ id: 's03', tipo: 'vignetta', tema: 'chiaro', sopratitolo: 'Una domanda da farsi adesso', illu: ['lettera', 'domanda'] },
{ id: 's04', tipo: 'vignetta', tema: 'chiaro', sopratitolo: 'Due generazioni, due risposte', illu: ['generazioni'] },

// 2 · cosa vedremo
{ id: 's05', tipo: 'tre', tema: 'chiaro', sopratitolo: 'Cosa vedremo',
  box: [{ n: 'IERI', t: 'Lo stipendio' }, { n: 'OGGI', t: 'I contributi' }, { n: 'DOMANI', t: 'Il divario', key: true }] },
{ id: 's06', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Alla fine della lezione', illu: 'contratto',
  titolo: 'Un fondo nato<br>dal **contratto**' },

// 3 · il retributivo
{ id: 's07', tipo: 'stipendio', tema: 'chiaro', sopratitolo: 'Retributivo: contano gli ultimi stipendi', fase: 1 },
{ id: 's08', tipo: 'stipendio', tema: 'chiaro', sopratitolo: 'Retributivo: contano gli ultimi stipendi', fase: 2 },
{ id: 's09', tipo: 'squilibrio', tema: 'chiaro', sopratitolo: 'Generoso, ma costoso' },

// 4 · il contributivo
{ id: 's10', tipo: 'montante', tema: 'chiaro', sopratitolo: 'Dal 1995 · contributivo: conta quanto versi', fase: 'accumulo' },
{ id: 's11', tipo: 'terzo', tema: 'chiaro', sopratitolo: 'Ogni anno, una parte dello stipendio' },
{ id: 's12', tipo: 'montante', tema: 'chiaro', sopratitolo: 'Il montante non resta fermo', fase: 'rivaluta' },
{ id: 's13', tipo: 'montante', tema: 'chiaro', sopratitolo: 'Dal montante alla pensione', fase: 'coefficiente' },
{ id: 's14', tipo: 'conto', tema: 'chiaro', sopratitolo: 'Un esempio',
  voci: [{ v: '100.000 €', lb: 'montante' }, { v: '5,5%', lb: 'coefficiente' }, { v: '5.500 €', lb: 'lordi all\'anno' }],
  op: ['×', '≈'] },
{ id: 's15', tipo: 'catena', tema: 'chiaro', sopratitolo: 'Ogni due anni',
  passi: [{ t: 'Si vive più a lungo' }, { t: 'Coefficiente più basso' }, { t: 'Assegno annuo più basso', key: true }] },
{ id: 's16', tipo: 'numero', tema: 'chiaro', sopratitolo: 'Riforma Fornero', cifra: '<span class="cond">2012</span>',
  testo: 'Il contributivo vale **per tutti**' },

// 5 · chi sta in quale sistema
{ id: 's17', tipo: 'sistemi', tema: 'chiaro', sopratitolo: 'Chi sta in quale sistema', righe: SISTEMI, attive: [0], tacche: [1995, 2011] },
{ id: 's18', tipo: 'sistemi', tema: 'chiaro', sopratitolo: 'Chi sta in quale sistema', righe: SISTEMI, tacche: [1995, 2011] },
{ id: 's19', tipo: 'sistemi', tema: 'chiaro', sopratitolo: 'Nati dopo la metà degli anni Settanta',
  righe: SISTEMI.map((r, i) => i === 2 ? { ...r, key: true } : r), attive: [2], tacche: [1995, 2011] },

// 6 · il divario
{ id: 's20', tipo: 'divario', tema: 'chiaro', sopratitolo: 'Il tasso di sostituzione', fase: 'retributivo' },
{ id: 's21', tipo: 'divario', tema: 'chiaro', sopratitolo: 'Il tasso di sostituzione', fase: 'contributivo' },
{ id: 's22', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Un aumento a fine carriera',
  col: [{ h: 'Retributivo', t: 'Alza **tutta** la pensione', grande: true },
        { h: 'Contributivo', t: 'Pesa solo per **quegli anni**', grande: true }] },
{ id: 's23', tipo: 'divario', tema: 'chiaro', sopratitolo: 'Il divario da colmare', fase: 'divario' },
{ id: 's24', tipo: 'icone', tema: 'tenue', sopratitolo: 'Il mese dopo l\'ultimo turno',
  voci: [{ icona: 'casa', t: 'Affitto o mutuo' }, { icona: 'documento', t: 'Bollette' },
         { icona: 'persone', t: 'Un aiuto ai figli' }, { icona: 'euro', t: 'Entrata più bassa', key: true }] },
{ id: 's25', tipo: 'divario', tema: 'chiaro', sopratitolo: 'Il divario da colmare', fase: 'complementare' },

// 7 · il tempo: la curva dell'interesse composto (grafica ricorrente del corso)
{ id: 's26', tipo: 'composto', tema: 'chiaro', sopratitolo: 'Il tempo lavora per te', fase: 'linee' },
{ id: 's27', tipo: 'composto', tema: 'chiaro', sopratitolo: 'Il tempo lavora per te', fase: 'area' },
{ id: 's28', tipo: 'composto', tema: 'chiaro', sopratitolo: 'Trent\'anni di versamenti', fase: 'trenta' },
{ id: 's29', tipo: 'composto', tema: 'chiaro', sopratitolo: 'Quindici anni di versamenti', fase: 'quindici' },
{ id: 's30', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Perché pensarci adesso', illu: 'clessidra',
  titolo: 'Il tempo non si<br>**compra dopo**' },

// 8 · memo
{ id: 's31', tipo: 'frase', tema: 'profondo', sopratitolo: 'Da ricordare',
  testo: 'Oggi conta <b class="a">tutta</b> la carriera.' },

// 9 · chiusura
{ id: 's32', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE, attive: [0] },
{ id: 's33', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE },
{ id: 's34', tipo: 'mossa', tema: 'chiaro', sopratitolo: 'La mossa di oggi', illu: 'schermo',
  titolo: 'Trova il tuo **primo anno** di contributi', passi: PASSI, attive: [0, 1, 2] },
{ id: 's35', tipo: 'mossa', tema: 'chiaro', sopratitolo: 'La mossa di oggi', illu: 'schermo',
  titolo: 'Trova il tuo **primo anno** di contributi', passi: PASSI },
{ id: 's36', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Nella prossima lezione', illu: 'pilastri',
  titolo: 'I **tre pilastri**<br>della previdenza' },

{ id: 's37', tipo: 'copertina', tema: 'profondo', chiusura: true, corso: CORSO, firma: FIRMA },
];
