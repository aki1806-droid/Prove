// Contenuto delle 44 scene della lezione 1.5 — Chi decide e chi controlla.
// s02–s43 sono i blocchi 1–42 del copione, uno a uno.

const CORSO = 'Perseo Sirio senza segreti';
const FIRMA = 'Un corso CISL FP Padova Rovigo';

const COMPITI = [
  { n: 'ASSEMBLEA', t: 'Elegge, approva bilancio e statuto' },
  { n: 'CONSIGLIO', t: 'Amministra, sceglie i gestori' },
  { n: 'PRESIDENTE', t: 'Rappresenta il Fondo' },
  { n: 'SINDACI', t: 'Controllano la legalità', key: true },
];

const TRE_COSE = [
  'Organi **paritetici**',
  'Gestori e depositario **separati**',
  'Vigilanza **COVIP**',
];

const PASSI = [
  { t: 'Apri **fondoperseosirio.it**' },
  { t: 'Sezione **Chi siamo**' },
  { t: 'Leggi la pagina **Il Fondo**' },
  { t: 'Due minuti: **ora sai leggerla**', key: true },
];

export const SCENE = [
{ id: 's01', tipo: 'copertina', tema: 'chiaro',
  modulo: 'Modulo 1 · Perché pensarci adesso',
  titolo: 'Chi decide<br>e chi controlla', sottotitolo: 'Lezione 1.5',
  ente: `${CORSO} · ${FIRMA}` },

// 1 · apertura
{ id: 's02', tipo: 'vignetta', tema: 'chiaro', sopratitolo: 'I miei soldi, chi li tocca?', illu: ['salvadanaio', 'domanda'] },
{ id: 's03', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Una domanda giusta', illu: 'lente',
  titolo: 'Una risposta<br>**precisa**' },
{ id: 's04', tipo: 'tre', tema: 'chiaro', sopratitolo: 'In questa lezione',
  box: [{ n: 'PRIMA', t: 'Chi decide' }, { n: 'POI', t: 'Chi controlla' }, { n: 'E', t: 'Il tuo ruolo', key: true }] },

// 2 · chi decide
{ id: 's05', tipo: 'paritetica', tema: 'chiaro', sopratitolo: 'Chi decide', livelli: 1, meta: false },
{ id: 's06', tipo: 'paritetica', tema: 'chiaro', sopratitolo: 'Metà lavoratori, metà amministrazioni', livelli: 1 },
{ id: 's07', tipo: 'figura', tema: 'chiaro', sopratitolo: 'I delegati', illu: 'campana',
  titolo: 'In carica,<br>poi **si rivota**' },
{ id: 's08', tipo: 'paritetica', tema: 'chiaro', sopratitolo: 'Chi elegge chi', livelli: 3, meta: false },
{ id: 's09', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Il Consiglio di amministrazione', illu: 'orologio',
  titolo: 'Si riunisce<br>**più spesso**' },
{ id: 's10', tipo: 'paritetica', tema: 'chiaro', sopratitolo: 'Metà lavoratori, metà amministrazioni', livelli: 3 },
{ id: 's11', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Organi paritetici', illu: 'bilancia',
  titolo: 'Nessuno decide<br>**da solo**' },

// 3 · il tuo ruolo
{ id: 's12', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Quando aderisci',
  col: [{ h: 'Non compri', t: 'Un **prodotto**', grande: true },
        { h: 'Entri in', t: 'Un\'**associazione**', grande: true }] },
{ id: 's13', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Il tuo ruolo', illu: 'campana',
  titolo: 'Voti<br>i **delegati**' },
{ id: 's14', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Le elezioni', illu: 'orologio',
  titolo: 'Pochi minuti,<br>**una voce**' },
{ id: 's15', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Cliente o iscritto',
  col: [{ h: 'Fondo commerciale', t: 'Resti o **te ne vai**', grande: true },
        { h: 'Fondo negoziale', t: 'Hai anche **una voce**', grande: true }] },
{ id: 's16', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Come sul posto di lavoro', illu: 'dialogo',
  titolo: 'La logica della<br>**rappresentanza**' },

// 4 · chi fa cosa
{ id: 's17', tipo: 'griglia', tema: 'chiaro', colonne: 2, spunta: false, sopratitolo: 'Chi fa cosa', celle: COMPITI, attive: [0] },
{ id: 's18', tipo: 'griglia', tema: 'chiaro', colonne: 2, spunta: false, sopratitolo: 'Chi fa cosa', celle: COMPITI, attive: [0, 1] },
{ id: 's19', tipo: 'griglia', tema: 'chiaro', colonne: 2, spunta: false, sopratitolo: 'Chi fa cosa', celle: COMPITI },
{ id: 's20', tipo: 'tre', tema: 'chiaro', sopratitolo: 'Chi siede negli organi',
  box: [{ n: 'REQUISITI', t: 'Onorabilità' }, { n: 'REQUISITI', t: 'Professionalità' }, { n: 'PERCHÉ', t: 'Soldi di altri', key: true }] },
{ id: 's21', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Ogni giorno',
  col: [{ h: 'La struttura', t: 'Un **direttore generale**', grande: true },
        { h: 'I servizi amministrativi', t: 'Un **fornitore** esterno', grande: true }] },

// 5 · chi tiene i soldi
{ id: 's22', tipo: 'figura', tema: 'chiaro', sopratitolo: 'La domanda più concreta', illu: 'salvadanaio',
  titolo: 'Dove sono<br>**i soldi**?' },
{ id: 's23', tipo: 'custodia', tema: 'chiaro', sopratitolo: 'Chi investe', fase: 'gestori', nota: 'gestori scelti con gara' },
{ id: 's24', tipo: 'custodia', tema: 'chiaro', sopratitolo: 'Su mandato', fase: 'gestori', nota: 'regole e limiti fissati dal Fondo' },
{ id: 's25', tipo: 'figura', tema: 'chiaro', sopratitolo: 'I mandati', illu: 'orologio',
  titolo: 'Una durata,<br>poi **nuova selezione**' },
{ id: 's26', tipo: 'custodia', tema: 'chiaro', sopratitolo: 'Chi custodisce' },
{ id: 's27', tipo: 'custodia', tema: 'chiaro', sopratitolo: 'Il depositario controlla', nota: 'il depositario verifica le operazioni dei gestori' },
{ id: 's28', tipo: 'custodia', tema: 'chiaro', sopratitolo: 'Chi decide non custodisce', nota: 'tre soggetti diversi: nessuno ha tutte le chiavi' },

// 6 · chi controlla
{ id: 's29', tipo: 'controlli', tema: 'chiaro', sopratitolo: 'Il controllo interno', fase: 'interno' },
{ id: 's30', tipo: 'controlli', tema: 'chiaro', sopratitolo: 'Non solo sulla carta', fase: 'interno' },
{ id: 's31', tipo: 'controlli', tema: 'chiaro', sopratitolo: 'Due livelli di controllo', fase: 'esterno' },
{ id: 's32', tipo: 'icone', tema: 'chiaro', sopratitolo: 'Dati COVIP',
  voci: [{ icona: 'euro', t: 'Rendimenti' }, { icona: 'documento', t: 'Costi' }, { icona: 'persone', t: 'Iscritti' }] },
{ id: 's33', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Trasparenza verso di te', illu: 'lettera',
  titolo: 'Un prospetto<br>**ogni anno**', sotto: 'Nel modulo 2.' },
{ id: 's34', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Conti pubblici', illu: 'libro',
  titolo: 'Bilancio<br>e **rendiconti**' },
{ id: 's35', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Un\'ultima garanzia', illu: 'scudo',
  titolo: 'La posizione<br>è **tua**' },
{ id: 's36', tipo: 'confronto', tema: 'tenue', sopratitolo: 'Patrimonio separato',
  col: [{ h: 'Se un gestore ha problemi', t: 'I suoi **debiti**', grande: true },
        { h: 'I soldi degli iscritti', t: '**Restano** fuori', grande: true }] },

// 7 · memo
{ id: 's37', tipo: 'frase', tema: 'profondo', sopratitolo: 'Da ricordare',
  testo: 'Iscritto, <b class="a">non</b> cliente.' },

// 8 · chiusura
{ id: 's38', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE, attive: [0] },
{ id: 's39', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE, attive: [0, 1] },
{ id: 's40', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE },
{ id: 's41', tipo: 'mossa', tema: 'chiaro', sopratitolo: 'La mossa di oggi', illu: 'schermo',
  titolo: 'Leggi la pagina **Il Fondo**', passi: PASSI },
{ id: 's42', tipo: 'pilastri', tema: 'chiaro', sopratitolo: 'Fine del modulo 1', targa: 1 },
{ id: 's43', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Prossimo modulo', illu: 'cartella',
  titolo: 'La tua liquidazione:<br>**TFS e TFR**' },

{ id: 's44', tipo: 'copertina', tema: 'profondo', chiusura: true, corso: CORSO, firma: FIRMA },
];
