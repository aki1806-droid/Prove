// Contenuto delle 42 scene della lezione 2.1 — TFS o TFR: quale hai tu.
// s02–s41 sono i blocchi 1–40 del copione, uno a uno.

const CORSO = 'Perseo Sirio senza segreti';
const FIRMA = 'Un corso CISL FP Padova Rovigo';

const TRE_COSE = [
  'Indeterminato **entro il 2000**: TFS',
  'Dal 2001 o **a tempo determinato**: TFR',
  'Conta la **decorrenza giuridica**',
];

const PASSI = [
  { t: 'Recupera il **contratto individuale**' },
  { t: 'Cerca la **decorrenza giuridica**' },
  { t: 'Annotala su un **foglio**' },
  { t: 'Non lo trovi? **Ufficio del personale**', key: true },
];


export const SCENE = [
{ id: 's01', tipo: 'copertina', tema: 'chiaro',
  modulo: 'Modulo 2 · La tua liquidazione: TFS e TFR',
  titolo: 'TFS o TFR:<br>quale hai tu', sottotitolo: 'Lezione 2.1',
  ente: `${CORSO} · ${FIRMA}` },

// 1 · apertura
{ id: 's02', tipo: 'vignetta', tema: 'chiaro', sopratitolo: '«Con la liquidazione ci sistemo la casa»', illu: ['casa', 'salvadanaio'] },
{ id: 's03', tipo: 'figura', tema: 'chiaro', sopratitolo: 'La liquidazione', illu: 'salvadanaio',
  titolo: 'Quando il lavoro<br>**finisce**' },
{ id: 's04', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Nel pubblico impiego',
  col: [{ h: 'Una liquidazione', t: '**TFS**', grande: true },
        { h: 'L\'altra liquidazione', t: '**TFR**', grande: true }] },
{ id: 's05', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Perché partire da qui', illu: 'bussola',
  titolo: 'Aderire al Fondo<br>**cambia** la liquidazione' },

// 2 · due sigle
{ id: 's06', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Due sigle', illu: 'lente',
  titolo: 'Si somigliano,<br>**si confondono**' },
{ id: 's07', tipo: 'cifre', tema: 'chiaro', sopratitolo: 'La prima sigla',
  voci: [{ n: 'TFS', t: 'Trattamento di fine servizio', d: 'Il sistema storico del pubblico impiego.', key: true }] },
{ id: 's08', tipo: 'tre', tema: 'chiaro', sopratitolo: 'Il TFS ha tre nomi',
  box: [{ n: 'INDENNITÀ', t: 'Premio di servizio' }, { n: 'INDENNITÀ', t: 'Di buonuscita' }, { n: 'INDENNITÀ', t: 'Di anzianità' }] },
{ id: 's09', tipo: 'cifre', tema: 'chiaro', sopratitolo: 'La seconda sigla',
  voci: [{ n: 'TFR', t: 'Trattamento di fine rapporto', d: 'Nato nel privato, esteso al pubblico.', key: true }] },
{ id: 's10', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Non sono la stessa cosa',
  col: [{ h: 'TFS', t: 'Una **formula**', grande: true },
        { h: 'TFR', t: 'Un\'**altra formula**', grande: true }] },
{ id: 's11', tipo: 'figura', tema: 'chiaro', sopratitolo: 'In comune', illu: 'calendario',
  titolo: 'Pagati alla fine,<br>calcolati **diversamente**', sotto: 'Nelle prossime due lezioni.' },

// 3 · la linea del 2000
{ id: 's12', tipo: 'linea2000', tema: 'chiaro', sopratitolo: 'Non lo scegli: conta una data', fase: 'linea' },
{ id: 's13', tipo: 'linea2000', tema: 'chiaro', sopratitolo: 'Indeterminato entro il 2000', fase: 'persone',
  sopra: [{ t: 'assunto entro il 2000', s: 'TFS' }, { t: '', s: '' }] },
{ id: 's14', tipo: 'linea2000', tema: 'chiaro', sopratitolo: 'Indeterminato dal 2001', fase: 'persone' },
{ id: 's15', tipo: 'linea2000', tema: 'chiaro', sopratitolo: 'A tempo determinato', fase: 'termine' },
{ id: 's16', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Stesso reparto, stesso lavoro',
  col: [{ h: 'Lì da trent\'anni', t: '**TFS**', grande: true },
        { h: 'Arrivato da cinque', t: '**TFR**', grande: true }] },
{ id: 's17', tipo: 'linea2000', tema: 'tenue', sopratitolo: 'La ritroveremo spesso', fase: 'termine' },

// 4 · la data giuridica
{ id: 's18', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Un dettaglio', illu: 'calendario',
  titolo: 'Assunti<br>**a cavallo** del 2000' },
{ id: 's19', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Due date diverse',
  col: [{ h: 'Decorrenza giuridica', t: 'Il contratto **produce effetti**', grande: true },
        { h: 'Decorrenza economica', t: 'Arriva lo **stipendio**', grande: true }] },
{ id: 's20', tipo: 'timeline', tema: 'chiaro', sopratitolo: 'Un esempio',
  tappe: [{ anno: 'Dic 2000', et: 'Nomina da graduatoria', key: true }, { anno: '2001', et: 'Presa di servizio' }, { anno: '2001', et: 'Primo stipendio' }] },
{ id: 's21', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Conta la decorrenza giuridica',
  col: [{ h: 'Decorrenza giuridica', t: '✓ **Conta**', grande: true },
        { h: 'Decorrenza economica', t: '× **Non conta**', grande: true }] },
{ id: 's22', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Un caso al limite', illu: 'cartella',
  titolo: 'Chiedi<br>all\'**ufficio del personale**', sotto: 'E fattela confermare.' },

// 5 · tre colleghi
{ id: 's23', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Tre colleghi', illu: 'letto',
  titolo: 'Stesso ospedale,<br>**tre esempi**' },
{ id: 's24', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Marta · infermiera', illu: 'stetoscopio',
  titolo: 'Assunta nel 1996:<br>**TFS**', sotto: 'Prima della linea.' },
{ id: 's25', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Luca · operatore socio-sanitario', illu: 'mani',
  titolo: 'Assunto nel 2009:<br>**TFR**', sotto: 'Dopo la linea.' },
{ id: 's26', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Sara · tecnica di radiologia', illu: 'schermo',
  titolo: 'Tempo determinato:<br>**TFR**', sotto: 'Indipendentemente dagli anni.' },
{ id: 's27', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Se Sara viene stabilizzata', illu: 'contratto',
  titolo: 'Resta<br>in **TFR**', sotto: 'L\'indeterminato arriva dopo il 2000.' },
{ id: 's28', tipo: 'tre', tema: 'chiaro', sopratitolo: 'Tre colleghi, due regimi',
  box: [{ n: 'MARTA', t: 'TFS' }, { n: 'LUCA', t: 'TFR' }, { n: 'SARA', t: 'TFR' }] },

// 6 · perche' conta
{ id: 's29', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Perché saperlo', illu: 'domanda',
  titolo: '**Due** ragioni' },
{ id: 's30', tipo: 'scambio', tema: 'chiaro', sopratitolo: 'Prima ragione: chi è in TFS e aderisce' },
{ id: 's31', tipo: 'linea2000', tema: 'chiaro', sopratitolo: 'Seconda ragione: la quota che va nel Fondo', fase: 'persone',
  icona: 'salvadanaio', sopra: [{ t: 'assunto entro il 2000', s: 'una quota' }, { t: 'assunto dal 2001', s: 'tutto' }] },
{ id: 's32', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Prima di ogni calcolo', illu: 'bussola',
  titolo: 'Da che parte<br>**della linea** sei?' },
{ id: 's33', tipo: 'figura', tema: 'chiaro', sopratitolo: 'In pausa caffè', illu: 'dialogo',
  titolo: 'Molti<br>**non lo sanno**' },
{ id: 's34', tipo: 'icone', tema: 'chiaro', sopratitolo: 'Ti servirà per leggere',
  voci: [{ icona: 'documento', t: 'I documenti del Fondo' }, { icona: 'euro', t: 'Il cedolino' }, { icona: 'occhio', t: 'TFS e TFR', key: true }] },

// 7 · memo
{ id: 's35', tipo: 'frase', tema: 'profondo', sopratitolo: 'Da ricordare',
  testo: 'Ogni ragionamento sulla liquidazione parte da una data: <b class="a">quella della tua assunzione</b>.' },

// 8 · chiusura
{ id: 's36', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE, attive: [0] },
{ id: 's37', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE, attive: [0, 1] },
{ id: 's38', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE },
{ id: 's39', tipo: 'mossa', tema: 'chiaro', sopratitolo: 'La mossa di oggi', illu: 'contratto',
  titolo: 'Annota la **decorrenza giuridica**', passi: PASSI.slice(0, 3) },
{ id: 's40', tipo: 'mossa', tema: 'chiaro', sopratitolo: 'La mossa di oggi', illu: 'contratto',
  titolo: 'Annota la **decorrenza giuridica**', passi: PASSI },
{ id: 's41', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Prossima lezione', illu: 'cartella',
  titolo: 'Come si calcola<br>il **TFS**', sotto: 'Tre ingredienti, numeri tondi.' },

{ id: 's42', tipo: 'copertina', tema: 'profondo', chiusura: true, corso: CORSO, firma: FIRMA },
];
