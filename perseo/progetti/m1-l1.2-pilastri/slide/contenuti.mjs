// Contenuto delle 41 scene della lezione 1.2 — I tre pilastri.
// s02–s40 sono i blocchi 1–39 del copione, uno a uno.
// A schermo al massimo sei parole (gli schemi esclusi), mai la frase detta.

const CORSO = 'Perseo Sirio senza segreti';
const FIRMA = 'Un corso CISL FP Padova Rovigo';

const SECONDO = [
  { n: 'PRIMO', t: 'Volontario' },
  { n: 'SECONDO', t: 'A capitalizzazione' },
  { n: 'TERZO', t: 'Il datore partecipa' },
];

const TRE_COSE = [
  '**INPS**: obbligatorio, a ripartizione',
  '**Fondo**: volontario, conto tuo',
  'Nel fondo versa **anche l\'ente**',
];

const INVENTARIO = [
  { t: 'Un **fondo pensione**?' },
  { t: 'Un **piano individuale**?' },
  { t: 'Un **risparmio** per la vecchiaia?' },
  { t: 'Accanto: **quanto al mese**', key: true },
];

export const SCENE = [
{ id: 's01', tipo: 'copertina', tema: 'chiaro',
  modulo: 'Modulo 1 · Perché pensarci adesso',
  titolo: 'I tre<br>pilastri', sottotitolo: 'Lezione 1.2',
  ente: `${CORSO} · ${FIRMA}` },

// 1 · apertura
{ id: 's02', tipo: 'pilastri', tema: 'chiaro', sopratitolo: 'Un solo pilastro', uno: true },
{ id: 's03', tipo: 'pilastri', tema: 'chiaro', sopratitolo: 'Il peso si divide' },
{ id: 's04', tipo: 'figura', tema: 'chiaro', sopratitolo: 'In questa lezione', illu: 'pilastri',
  titolo: 'Su quale poggia<br>**Perseo Sirio**?' },

// 2 · i tre pilastri
{ id: 's05', tipo: 'pilastri', tema: 'chiaro', sopratitolo: 'Pubblica · complementare · personale', attive: [0, 1] },
{ id: 's06', tipo: 'pilastri', tema: 'chiaro', sopratitolo: 'Pubblica · complementare · personale' },
{ id: 's07', tipo: 'pilastri', tema: 'chiaro', sopratitolo: 'Il primo regge di più', chiave: [0] },

// 3 · il primo pilastro
{ id: 's08', tipo: 'tre', tema: 'chiaro', sopratitolo: 'Primo pilastro',
  box: [{ n: 'SEMPRE', t: 'Obbligatorio' }, { n: 'CHI', t: 'Gestito dall\'INPS' }, { n: 'QUANDO', t: 'Dal primo giorno' }] },
{ id: 's09', tipo: 'ripartizione', tema: 'chiaro', sopratitolo: 'A ripartizione', etichetta: 'contributi',
  gruppi: [{ n: 5, t: 'chi lavora oggi' }, { n: 4, t: 'chi è in pensione oggi', c: '#B07A12' }] },
{ id: 's10', tipo: 'terzo', tema: 'chiaro', sopratitolo: 'Il pilastro su cui si versa di più' },
{ id: 's11', tipo: 'ripartizione', tema: 'chiaro', sopratitolo: 'Un patto tra generazioni',
  gruppi: [{ n: 3, t: 'domani', sub: 'chi lavorerà dopo', c: '#3E6FA8' }, { n: 4, t: 'oggi', sub: 'chi lavora' },
           { n: 3, t: 'ieri', sub: 'chi è in pensione', c: '#B07A12' }] },
{ id: 's12', tipo: 'ripartizione', tema: 'chiaro', sopratitolo: 'Meno spalle, stesso peso', etichetta: 'contributi',
  gruppi: [{ n: 3, t: 'chi lavora oggi' }, { n: 7, t: 'chi è in pensione oggi', c: '#B07A12' }] },
{ id: 's13', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Dopo le riforme',
  col: [{ h: 'Il primo pilastro', t: 'Resta **solido**', grande: true },
        { h: 'Ma', t: 'Promette **meno di prima**', grande: true }] },

// 4 · il secondo pilastro
{ id: 's14', tipo: 'tre', tema: 'chiaro', sopratitolo: 'Secondo pilastro', box: SECONDO, attive: [] },
{ id: 's15', tipo: 'tre', tema: 'chiaro', sopratitolo: 'Secondo pilastro', box: SECONDO, attive: [0] },
{ id: 's16', tipo: 'tre', tema: 'chiaro', sopratitolo: 'Secondo pilastro', box: SECONDO, attive: [0, 1] },
{ id: 's17', tipo: 'composto', tema: 'chiaro', sopratitolo: 'Una posizione intestata a te', fase: 'area' },
{ id: 's18', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Chi controlla', illu: 'lente',
  titolo: 'Vigila<br>la **COVIP**' },
{ id: 's19', tipo: 'tre', tema: 'chiaro', sopratitolo: 'Secondo pilastro',
  box: SECONDO.map((b, i) => i === 2 ? { ...b, key: true } : b) },
{ id: 's20', tipo: 'pilastri', tema: 'chiaro', sopratitolo: 'Il tuo secondo pilastro', targa: 1 },
{ id: 's21', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Un vantaggio in più', illu: 'bilancia',
  titolo: 'Agevolazioni<br>**fiscali**', sotto: 'Ne parliamo nel modulo 5.' },

// 5 · il terzo pilastro
{ id: 's22', tipo: 'icone', tema: 'chiaro', sopratitolo: 'Terzo pilastro',
  voci: [{ icona: 'euro', t: 'Conto deposito' }, { icona: 'documento', t: 'Titoli di Stato' },
         { icona: 'scudo', t: 'Polizza' }, { icona: 'cartella', t: 'Piano individuale' }] },
{ id: 's23', tipo: 'tre', tema: 'chiaro', sopratitolo: 'Terzo pilastro',
  box: [{ n: 'SÌ', t: 'Libero' }, { n: 'SÌ', t: 'Flessibile' }, { n: 'MA', t: 'Tutto a carico tuo', key: true }] },
{ id: 's24', tipo: 'composto', tema: 'chiaro', sopratitolo: 'Il peso dei costi', fase: 'costi' },
{ id: 's25', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Il PIP, piano individuale',
  col: [{ h: 'Agevolazioni fiscali', t: '✓ **Sì**', grande: true },
        { h: 'Contributo del datore', t: '× **No**', grande: true }] },
{ id: 's26', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Il terzo pilastro', illu: 'pilastri',
  titolo: 'Sopra il secondo,<br>**non al suo posto**' },

// 6 · un esempio
{ id: 's27', tipo: 'fonti', tema: 'chiaro', sopratitolo: 'Un esempio concreto', fase: 'una' },
{ id: 's28', tipo: 'fonti', tema: 'chiaro', sopratitolo: 'Un esempio concreto', fase: 'tre' },
{ id: 's29', tipo: 'fonti', tema: 'chiaro', sopratitolo: 'Stesso sforzo, tre fonti', fase: 'tre' },
{ id: 's30', tipo: 'fonti', tema: 'chiaro', sopratitolo: 'E poi lavora il tempo', fase: 'cresce' },
{ id: 's31', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Le percentuali nel modulo 4', illu: 'mani',
  titolo: 'Tre mani<br>**invece di una**' },

// 7 · il tuo secondo pilastro
{ id: 's32', tipo: 'pilastri', tema: 'chiaro', sopratitolo: 'Riassumiamo', attive: [0, 2] },
{ id: 's33', tipo: 'pilastri', tema: 'chiaro', sopratitolo: 'Il tuo secondo pilastro', targa: 1 },
{ id: 's34', tipo: 'icone', tema: 'chiaro', sopratitolo: 'Nel resto del corso',
  voci: [{ icona: 'ingranaggio', t: 'Come funziona' }, { icona: 'euro', t: 'Quanto costa' },
         { icona: 'bilancia', t: 'Il fisco' }, { icona: 'persona', t: 'Che cosa restituisce', key: true }] },

// 8 · memo
{ id: 's35', tipo: 'frase', tema: 'profondo', sopratitolo: 'Da ricordare',
  testo: 'Più pilastri, <b class="a">meno</b> oscillazioni.' },

// 9 · chiusura
{ id: 's36', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE, attive: [0] },
{ id: 's37', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE },
{ id: 's38', tipo: 'mossa', tema: 'chiaro', sopratitolo: 'La mossa di oggi', illu: 'cartella',
  titolo: 'Fai l\'**inventario** dei tuoi risparmi', passi: INVENTARIO, attive: [0, 1, 2] },
{ id: 's39', tipo: 'mossa', tema: 'chiaro', sopratitolo: 'La mossa di oggi', illu: 'cartella',
  titolo: 'Fai l\'**inventario** dei tuoi risparmi', passi: INVENTARIO },
{ id: 's40', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Nella prossima lezione', illu: 'bussola',
  titolo: 'Negoziale, aperto,<br>**PIP**' },

{ id: 's41', tipo: 'copertina', tema: 'profondo', chiusura: true, corso: CORSO, firma: FIRMA },
];
