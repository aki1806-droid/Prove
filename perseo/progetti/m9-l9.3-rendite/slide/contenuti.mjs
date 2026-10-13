// Contenuto delle 49 scene della lezione 9.3 — Le cinque rendite.
// s02–s48 sono i blocchi 1–47 del copione, uno a uno.

const CORSO = 'Perseo Sirio senza segreti';
const FIRMA = 'Un corso CISL FP Padova Rovigo';

const CINQUE = [
  '**Vitalizia** immediata',
  '**Reversibile**',
  '**Certa** per 5 o 10 anni, poi vitalizia',
  '**Controassicurata**',
  '**LTC**: raddoppio per non autosufficienza',
];
const cin = (id, attive, sop = 'Le cinque rendite') => ({ id, tipo: 'memo', tema: 'chiaro', sopratitolo: sop, voci: CINQUE, attive });

const TRE_COSE = [
  'Cinque **rendite** tra cui scegliere',
  'Più protezione, **assegno più basso**',
  'LTC: **raddoppia** se non autosufficiente',
];

const PASSI = [
  { t: 'Chi **vive con te**?' },
  { t: 'Chi **dipende** da te?' },
  { t: 'Quale **protezione** vorreste?', key: true },
];

export const SCENE = [
{ id: 's01', tipo: 'copertina', tema: 'chiaro',
  modulo: 'Modulo 9 · Al pensionamento',
  titolo: 'Le cinque rendite', sottotitolo: 'Lezione 9.3',
  ente: `${CORSO} · ${FIRMA}` },

// 1 · apertura
{ id: 's02', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Non tutte le vecchiaie si somigliano', illu: 'generazioni',
  titolo: 'Vite diverse,<br>**esigenze diverse**' },
{ id: 's03', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'C\'è chi',
  col: [{ h: 'Vive in coppia', t: 'Vuole proteggere il partner', grande: true },
        { h: 'Vive solo', t: '**Pensa a se stesso**', grande: true }] },
{ id: 's04', tipo: 'figura', tema: 'chiaro', sopratitolo: 'E c\'è chi teme', illu: 'mani',
  titolo: 'Di perdere<br>**l\'autosufficienza**' },
{ id: 's05', tipo: 'cifre', tema: 'chiaro', sopratitolo: 'Con una convenzione assicurativa, Perseo Sirio offre',
  voci: [{ n: '5', t: 'Tipi di rendita', key: true }] },
cin('s06', [], 'Si sceglie al momento della pensione'),

// 2 · le cinque rendite
cin('s07', [0]),
{ id: 's08', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Vitalizia immediata', illu: 'persona',
  titolo: 'La più semplice,<br>**la più alta**', sotto: 'Si ferma con te.' },
cin('s09', [0, 1]),
{ id: 's10', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Reversibile', illu: 'generazioni',
  titolo: 'L\'assegno continua<br>**per chi resta**', sotto: 'In tutto o in parte, alla persona che indichi.' },
cin('s11', [0, 1, 2]),
{ id: 's12', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Certa per 5 o 10 anni', illu: 'calendario',
  titolo: 'Poi prosegue<br>**come vitalizia**' },
cin('s13', [0, 1, 2, 3]),
{ id: 's14', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Controassicurata', illu: 'scudo',
  titolo: 'Il capitale non restituito<br>**va ai beneficiari**', sotto: 'Sotto forma di rate.' },
cin('s15', [0, 1, 2, 3, 4]),

// 3 · la bilancia
{ id: 's16', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Una sola regola', illu: 'bilancia',
  titolo: 'Semplice<br>**come una bilancia**' },
{ id: 's17', tipo: 'piatti', tema: 'chiaro', sopratitolo: 'Più protezione, assegno più basso', tipo2: 'pari' },
{ id: 's18', tipo: 'piatti', tema: 'chiaro', sopratitolo: 'Con lo stesso capitale', tipo2: 'vitalizia', nome: 'Vitalizia' },
{ id: 's19', tipo: 'piatti', tema: 'chiaro', sopratitolo: 'La compagnia paga anche dopo', tipo2: 'protette', nome: 'Reversibile · certa · controassicurata' },
{ id: 's20', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Non c\'è una scelta giusta per tutti',
  col: [{ h: 'Dipende da', t: 'Chi hai accanto', grande: true },
        { h: 'E da', t: '**Chi dipende da te**', grande: true }] },
{ id: 's21', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Le altre tutele della famiglia', illu: 'pilastri',
  titolo: 'La reversibilità<br>**pubblica**' },
{ id: 's22', tipo: 'frase', tema: 'chiaro', sopratitolo: 'Per esempio',
  testo: 'Coniuge con una buona reversibilità INPS?<br><b class="a">La vitalizia semplice può bastare.</b>' },

// 4 · la LTC
{ id: 's23', tipo: 'figura', tema: 'chiaro', sopratitolo: 'La quinta rendita', illu: 'mani',
  titolo: 'La meno conosciuta' },
{ id: 's24', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Long term care', illu: 'mani',
  titolo: 'LTC: assistenza<br>**di lungo periodo**' },
{ id: 's25', tipo: 'cifre', tema: 'chiaro', sopratitolo: 'Se perdi l\'autosufficienza',
  voci: [{ n: '× 2', t: 'L\'importo raddoppia', key: true }] },
{ id: 's26', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Per tutto il periodo', illu: 'clessidra',
  titolo: 'Finché la condizione<br>**permane**' },
{ id: 's27', tipo: 'cifre', tema: 'chiaro', sopratitolo: 'Le condizioni: età assicurativa',
  voci: [{ n: '70 anni', t: 'Al massimo', key: true }] },
{ id: 's28', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Prima, la compagnia', illu: 'stetoscopio',
  titolo: 'Valuta la salute<br>**e può rifiutare**', sotto: 'In quel caso, si sceglie un\'altra rendita.' },
{ id: 's29', tipo: 'cifre', tema: 'chiaro', sopratitolo: 'Costo di conversione',
  voci: [{ n: '5%', t: 'LTC', key: true }, { n: '1,10%', t: 'Le altre rendite' }] },
{ id: 's30', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Per chi è pensata', illu: 'scudo',
  titolo: 'Uno dei rischi più pesanti<br>**della vecchiaia**' },

// 5 · dettagli pratici
{ id: 's31', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Per tutte e cinque', illu: 'cartella',
  titolo: 'Dettagli<br>**pratici**' },
{ id: 's32', tipo: 'tre', tema: 'chiaro', sopratitolo: 'Ogni quanto arriva',
  box: [{ n: 'OGNI MESE', t: 'O ogni 2 mesi' }, { n: 'OGNI 3', t: 'O 6 mesi' }, { n: 'UNA VOLTA', t: 'L\'anno' }] },
{ id: 's33', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Ogni anno', illu: 'calendario',
  titolo: 'La rendita<br>**si rivaluta**' },
{ id: 's34', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'L\'importo dipende da',
  col: [{ h: 'Quanto capitale', t: 'Trasformi', grande: true },
        { h: 'Quanti anni', t: '**Hai quando la chiedi**', grande: true }] },
{ id: 's35', tipo: 'frase', tema: 'chiaro', sopratitolo: 'A parità di capitale',
  testo: 'Chi la chiede più tardi<br><b class="a">riceve un assegno più alto.</b>' },
{ id: 's36', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Le basi tecniche', illu: 'libro',
  titolo: 'Il Documento<br>**sulle rendite**', sotto: 'Sul sito del Fondo.' },

// 6 · memo
{ id: 's37', tipo: 'frase', tema: 'profondo', sopratitolo: 'Da ricordare',
  testo: 'Scegli pensando<br><b class="a">a chi resta.</b>' },

// 7 · chiusura
{ id: 's38', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE, attive: [0] },
cin('s39', [0, 1, 2, 3, 4]),
{ id: 's40', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE, attive: [0, 1] },
{ id: 's41', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE },
{ id: 's42', tipo: 'mossa', tema: 'chiaro', sopratitolo: 'La mossa di oggi', illu: 'dialogo',
  titolo: 'Parlane con **chi vive con te**', passi: PASSI },
{ id: 's43', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Una scelta che riguarda anche loro', illu: 'casa',
  titolo: 'Insieme,<br>**con calma**' },
{ id: 's44', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Prossima lezione', illu: 'calendario',
  titolo: 'Guardiamo<br>**il calendario**' },
{ id: 's45', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Chiesta la prestazione', illu: 'orologio',
  titolo: 'Quando arrivano<br>**davvero i soldi?**' },
{ id: 's46', tipo: 'tasche', tema: 'chiaro', sopratitolo: 'Due tasche, due treni, due orari', fase: 'due' },
{ id: 's47', tipo: 'tre', tema: 'chiaro', sopratitolo: 'Vedremo',
  box: [{ n: 'QUANTO', t: 'Aspettare' }, { n: 'PERCHÉ', t: 'Due tempi diversi' }, { n: 'COME', t: 'Non aggiungere ritardi', key: true }] },
{ id: 's48', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Ci vediamo nella lezione 9.4', illu: 'clessidra',
  titolo: 'I tempi<br>**reali**' },

{ id: 's49', tipo: 'copertina', tema: 'profondo', chiusura: true, corso: CORSO, firma: FIRMA },
];
