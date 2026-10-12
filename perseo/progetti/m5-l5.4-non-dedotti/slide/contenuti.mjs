// Contenuto delle 49 scene della lezione 5.4 — I contributi non dedotti.
// s02–s48 sono i blocchi 1–47 del copione, uno a uno.

const CORSO = 'Perseo Sirio senza segreti';
const FIRMA = 'Un corso CISL FP Padova Rovigo';

const bic = (id, sop, fase) => ({ id, tipo: 'bicchiere', tema: 'chiaro', sopratitolo: sop, fase });
const tor = (id, sop, fase, nd) => ({ id, tipo: 'torta', tema: 'chiaro', sopratitolo: sop, fase, nd });

const CASI = [
  { n: 'VERSAMENTI ALTI', t: 'Oltre il limite annuo' },
  { n: 'BONIFICI', t: 'Non indicati in dichiarazione' },
  { n: 'REDDITO BASSO', t: 'Nessuna IRPEF da cui dedurre' },
];
const casi = (id, k) => ({ id, tipo: 'tre', tema: 'chiaro', sopratitolo: 'Quando capita', box: CASI.map((b, i) => ({ ...b, key: k === 9 || i === k })) });

const TRE_COSE = [
  'Oltre il limite: **IRPEF subito**',
  'Alla fine **non si ritassa**',
  'Comunicalo **entro il 31/12 dell\'anno dopo**',
];

const PASSI = [
  { t: 'Nella **CU**: i contributi dedotti' },
  { t: 'Confronta con **tutto il versato**' },
  { t: 'La differenza? **Comunicala**', key: true },
];

export const SCENE = [
{ id: 's01', tipo: 'copertina', tema: 'chiaro',
  modulo: 'Modulo 5 · Il fisco: dove si guadagna davvero',
  titolo: 'I contributi<br>non dedotti', sottotitolo: 'Lezione 5.4',
  ente: `${CORSO} · ${FIRMA}` },

// 1 · apertura
bic('s02', 'Cosa succede se il bicchiere trabocca?', 'pieno'),
{ id: 's03', tipo: 'cifre', tema: 'chiaro', sopratitolo: 'Il limite della lezione 5.1',
  voci: [{ n: '5.300 €', t: 'L\'anno, tuoi contributi + quelli dell\'ente', key: true }] },
{ id: 's04', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Che fine fanno?',
  col: [{ h: 'I contributi', t: '**Oltre il limite**', grande: true },
        { h: 'I contributi', t: '**Non dedotti** per altre ragioni', grande: true }] },
{ id: 's05', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Riguarda pochi lavoratori', illu: 'lente',
  titolo: 'Ma per loro<br>**è decisiva**' },
{ id: 's06', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Con una semplice comunicazione', illu: 'scudo',
  titolo: 'Niente tasse<br>**due volte sugli stessi soldi**' },
{ id: 's07', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Come sempre nel modulo', illu: 'campana',
  titolo: 'Informazioni generali,<br>**non consulenza fiscale**', sotto: 'Per il tuo caso: il Fondo o il CAF.' },

// 2 · la regola
bic('s08', 'La regola', 'pieno'),
bic('s09', 'Fino alla linea: dedotti', 'pieno'),
{ id: 's10', tipo: 'scala', tema: 'chiaro', sopratitolo: 'Alla prestazione: la scala della lezione 5.3', a: 35 },
bic('s11', 'Oltre la linea: non dedotti', 'trabocca'),
bic('s12', 'Su quella parte, IRPEF già oggi', 'irpef'),
{ id: 's13', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Il beneficio non si perde',
  col: [{ h: 'Non lo hai', t: 'Oggi', grande: true },
        { h: 'Lo avrai', t: '**Alla fine**', grande: true }] },
{ id: 's14', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Alla prestazione', illu: 'scudo',
  titolo: 'Non verranno<br>**tassati di nuovo**' },
{ id: 's15', tipo: 'frase', tema: 'chiaro', sopratitolo: 'Come i rendimenti · lezione 5.2',
  testo: 'Quello che ha già pagato<br><b class="a">non paga due volte.</b>' },

// 3 · la comunicazione
{ id: 's16', tipo: 'figura', tema: 'chiaro', sopratitolo: 'C\'è una condizione', illu: 'campana',
  titolo: 'Il cuore<br>**di questa lezione**' },
{ id: 's17', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Il Fondo non lo sa da solo', illu: 'lente',
  titolo: 'Non vede la tua<br>**dichiarazione né la CU**' },
{ id: 's18', tipo: 'cifre', tema: 'chiaro', sopratitolo: 'Devi comunicarglielo tu',
  voci: [{ n: '31/12', t: 'Dell\'anno successivo a quello del versamento', key: true }] },
{ id: 's19', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Un esempio',
  col: [{ h: 'Versati nel', t: '**2026**', grande: true },
        { h: 'Comunicazione entro il', t: '**31 dicembre 2027**', grande: true }] },
{ id: 's20', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Come si fa', illu: 'schermo',
  titolo: 'Area riservata<br>**sezione contribuzione**', sotto: 'Funzione per i contributi non dedotti.' },
tor('s21', 'Se la comunicazione non arriva', 'intera', 'dimenticato'),
tor('s22', 'Una doppia tassazione', 'resto', 'dimenticato'),

// 4 · quando capita
casi('s23', 9),
casi('s24', 0),
casi('s25', 1),
casi('s26', 2),
{ id: 's27', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Un esempio', illu: 'calendario',
  titolo: 'Un anno di aspettativa<br>**e un bonifico volontario**' },
{ id: 's28', tipo: 'figura', tema: 'chiaro', sopratitolo: 'In tutti i casi', illu: 'lente',
  titolo: 'Verifica quanto hai<br>**davvero dedotto**', sotto: 'Anno per anno.' },
{ id: 's29', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Dove guardare',
  col: [{ h: 'Dedotto', t: '**CU** o dichiarazione', grande: true },
        { h: 'Versato', t: '**Tutto**: busta paga e bonifici', grande: true }] },
{ id: 's30', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Se c\'è una differenza', illu: 'schermo',
  titolo: 'Comunicala,<br>**nei tempi**', sotto: 'Pochi minuti, dall\'area riservata.' },

// 5 · chi comunica e chi no
tor('s31', 'Chi comunica e chi no', 'intera', ''),
tor('s32', 'Chi comunica: esclusa, come i rendimenti', 'spicchi', 'comunicato'),
tor('s33', 'Un timbro verde', 'resto', 'comunicato'),
tor('s34', 'Chi non comunica', 'resto', 'dimenticato'),
{ id: 's35', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Due volte sulla stessa somma',
  col: [{ h: 'Quando la versa', t: 'IRPEF', grande: true },
        { h: 'Alla fine', t: '**Imposta sulla prestazione**', grande: true }] },
{ id: 's36', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Al momento giusto', illu: 'lettera',
  titolo: 'Un modulo compilato<br>**vale più di una strategia**' },

// 6 · memo
{ id: 's37', tipo: 'frase', tema: 'profondo', sopratitolo: 'Da ricordare',
  testo: 'Non dedotto? <b class="a">Dillo al Fondo.</b><br>Entro l\'anno successivo.' },

// 7 · chiusura
{ id: 's38', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE, attive: [0] },
{ id: 's39', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE, attive: [0, 1] },
{ id: 's40', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE },
{ id: 's41', tipo: 'mossa', tema: 'chiaro', sopratitolo: 'La mossa di oggi', illu: 'cartella',
  titolo: 'Confronta **CU e versamenti**', passi: PASSI },
{ id: 's42', tipo: 'foglio', tema: 'chiaro', sopratitolo: 'La riga della lezione 4.5',
  intest: 'CERTIFICAZIONE UNICA · esempio', accese: ['cu'], lente: true,
  righe: [{ h: 'Dati fiscali' }, { finta: true }, { finta: true }, { h: 'Oneri deducibili' }, { t: 'Contributi previdenza complementare dedotti', v: '…', id: 'cu' }, { finta: true }] },
{ id: 's43', tipo: 'icone', tema: 'chiaro', sopratitolo: 'Tutto il versato nello stesso anno',
  voci: [{ icona: 'documento', t: 'Trattenute in busta paga' }, { icona: 'persone', t: 'Contributo dell\'ente' }, { icona: 'euro', t: 'Bonifici' }] },
{ id: 's44', tipo: 'cifre', tema: 'chiaro', sopratitolo: 'Se c\'è una differenza',
  voci: [{ n: '31/12', t: 'Dell\'anno dopo: comunicala dall\'area riservata', key: true }] },
{ id: 's45', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Niente versamenti volontari?', illu: 'bussola',
  titolo: 'Probabilmente non ti riguarda,<br>**ma ora sai che esiste**' },
{ id: 's46', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Prossima lezione, l\'ultima del modulo', illu: 'pilastri',
  titolo: 'Le stratificazioni<br>**dei pubblici**' },
{ id: 's47', tipo: 'tre', tema: 'chiaro', sopratitolo: 'Tre strati, tre regole',
  box: [{ n: 'FINO AL 2000', t: 'Il primo strato' }, { n: '2001–2017', t: 'Il secondo' }, { n: 'DAL 2018', t: 'Le regole di oggi', key: true }] },
{ id: 's48', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Ci vediamo nella lezione 5.5', illu: 'semaforo',
  titolo: 'Tre strati,<br>**tre regole**' },

{ id: 's49', tipo: 'copertina', tema: 'profondo', chiusura: true, corso: CORSO, firma: FIRMA },
];
