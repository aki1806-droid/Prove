// Contenuto delle 42 scene della lezione 1.3 — Negoziale, aperto, PIP.
// s02–s41 sono i blocchi 1–40 del copione, uno a uno.

const CORSO = 'Perseo Sirio senza segreti';
const FIRMA = 'Un corso CISL FP Padova Rovigo';

const TABELLA = {
  intestazioni: ['', 'Negoziale', 'Aperto', 'PIP'],
  colonne: ['28%', '24%', '24%', '24%'],
  righe: [
    ['Chi lo offre', 'parti sociali', 'banche, SGR, assicurazioni', 'assicurazioni'],
    ['Scopo di lucro', 'no:no', 'si:sì', 'si:sì'],
    ['Contributo dell\'ente', 'si:sì', 'no:no', 'no:no'],
    ['Costi', 'in genere i più bassi', 'medi', 'in genere i più alti'],
  ],
};

const TRE_COSE = [
  '**Tre famiglie**, tutte vigilate dalla COVIP',
  'Negoziale: **no profit**, paritetico',
  'Contributo dell\'ente **solo lì**',
];

const CEDOLINO = [
  { t: 'Apri l\'ultimo **cedolino**' },
  { t: 'Cerca **Perseo**' },
  { t: 'Oppure **previdenza complementare**' },
  { t: 'C\'è? **Sei già iscritto**', key: true },
];

export const SCENE = [
{ id: 's01', tipo: 'copertina', tema: 'chiaro',
  modulo: 'Modulo 1 · Perché pensarci adesso',
  titolo: 'Negoziale,<br>aperto, PIP', sottotitolo: 'Lezione 1.3',
  ente: `${CORSO} · ${FIRMA}` },

// 1 · apertura
{ id: 's02', tipo: 'vignetta', tema: 'chiaro', sopratitolo: 'Prima o poi te lo propongono', illu: ['telefono'] },
{ id: 's03', tipo: 'tre', tema: 'chiaro', sopratitolo: 'Sembrano tutti uguali',
  box: [{ t: 'Fondo' }, { t: 'Piano' }, { t: 'Polizza' }, { t: 'Linea' }, { t: 'Comparto' }] },
{ id: 's04', tipo: 'figura', tema: 'chiaro', sopratitolo: 'In questa lezione', illu: 'bussola',
  titolo: 'Mettiamo<br>**ordine**' },

// 2 · tre porte
{ id: 's05', tipo: 'porte', tema: 'chiaro', sopratitolo: 'Tre porte, regole diverse' },
{ id: 's06', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Cosa hanno in comune', illu: 'lente',
  titolo: 'Vigilati<br>dalla **COVIP**', sotto: 'Stessi vantaggi fiscali.' },
{ id: 's07', tipo: 'griglia', tema: 'chiaro', colonne: 2, spunta: false, sopratitolo: 'Dove sono diversi',
  celle: [{ n: '1', t: 'Chi li **crea**' }, { n: '2', t: 'Chi può **entrare**' },
          { n: '3', t: 'Chi li **governa**' }, { n: '4', t: 'Quanto **costano**' }] },
{ id: 's08', tipo: 'porte', tema: 'chiaro', sopratitolo: 'Centinaia di forme, tre famiglie' },

// 3 · il fondo negoziale
{ id: 's09', tipo: 'porte', tema: 'chiaro', sopratitolo: 'Il fondo negoziale', aperta: 0, attive: [0] },
{ id: 's10', tipo: 'tre', tema: 'chiaro', sopratitolo: 'Il fondo negoziale',
  box: [{ n: 'PER CHI', t: 'Una categoria' }, { n: 'DOVE', t: 'Non in vendita' }, { n: 'PROVVIGIONI', t: 'Nessuna', key: true }] },
{ id: 's11', tipo: 'tre', tema: 'chiaro', sopratitolo: 'Senza scopo di lucro',
  box: [{ n: 'UTILI', t: 'Nessuno' }, { n: 'COSTI', t: 'Solo funzionamento' }, { n: 'DIVISI', t: 'Su molti iscritti', key: true }] },
{ id: 's12', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Governo paritetico', illu: 'bilancia',
  titolo: 'Metà<br>e **metà**', sotto: 'Lavoratori e datori di lavoro.' },
{ id: 's13', tipo: 'pilastri', tema: 'chiaro', sopratitolo: 'Il tuo fondo negoziale', targa: 1 },

// 4 · aperto e PIP
{ id: 's14', tipo: 'porte', tema: 'chiaro', sopratitolo: 'Il fondo aperto', aperta: 1, attive: [1] },
{ id: 's15', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Adesioni anche collettive',
  col: [{ h: 'Aziende private', t: 'Possono **sceglierlo**', grande: true },
        { h: 'Pubblica amministrazione', t: 'La strada del **contratto**', grande: true }] },
{ id: 's16', tipo: 'porte', tema: 'chiaro', sopratitolo: 'Il PIP', aperta: 2, attive: [2] },
{ id: 's17', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Dentro un PIP',
  col: [{ h: 'Gestione separata', t: 'Più **prudente**', grande: true },
        { h: 'Fondi interni', t: 'Più **esposti** ai mercati', grande: true }] },
{ id: 's18', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Il PIP', illu: 'contratto',
  titolo: 'Un contratto,<br>**non un\'assemblea**' },
{ id: 's19', tipo: 'tre', tema: 'chiaro', sopratitolo: 'Fondi aperti e PIP',
  box: [{ n: 'SÌ', t: 'Legittimi' }, { n: 'SÌ', t: 'Vigilati' }, { n: 'MA', t: 'Costi più alti', key: true }] },

// 5 · il bivio
{ id: 's20', tipo: 'bivio', tema: 'chiaro', sopratitolo: 'Il bivio che conta' },
{ id: 's21', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Il contributo dell\'ente', illu: 'catena',
  titolo: 'Non si porta<br>**altrove**' },
{ id: 's22', tipo: 'bivio', tema: 'chiaro', sopratitolo: 'Anche per il TFR', evidenzia: 'tfr' },
{ id: 's23', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Nel modulo 2', illu: 'cartella',
  titolo: 'Accantonamento<br>**figurativo**', sotto: 'Lo gestisce l\'INPS.' },
{ id: 's24', tipo: 'bivio', tema: 'chiaro', sopratitolo: 'Si può, ma da soli' },

// 6 · il confronto
{ id: 's25', tipo: 'tabella', tema: 'chiaro', sopratitolo: 'A confronto', ...TABELLA, chiave: [] },
{ id: 's26', tipo: 'tabella', tema: 'chiaro', sopratitolo: 'A confronto', ...TABELLA, chiave: [2, 3] },
{ id: 's27', tipo: 'composto', tema: 'chiaro', sopratitolo: 'Su trent\'anni', fase: 'costi' },
{ id: 's28', tipo: 'composto', tema: 'chiaro', sopratitolo: 'Mezzo punto all\'anno', fase: 'costi' },
{ id: 's29', tipo: 'cifre', tema: 'chiaro', sopratitolo: 'Per confrontarli',
  voci: [{ n: 'ISC', t: 'Indicatore sintetico dei costi', d: 'Tutte le spese in un solo numero.', key: true }] },
{ id: 's30', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Nel modulo 7', illu: 'lente',
  titolo: 'Il comparatore<br>della **COVIP**' },

// 7 · non da evitare
{ id: 's31', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Fondi aperti e PIP',
  col: [{ h: 'Da evitare?', t: '**Non** in assoluto', grande: true },
        { h: 'Ma', t: 'Dopo il fondo **del contratto**', grande: true }] },
{ id: 's32', tipo: 'pilastri', tema: 'chiaro', sopratitolo: 'Prima il fondo del contratto', chiave: [1] },
{ id: 's33', tipo: 'tre', tema: 'chiaro', sopratitolo: 'Prima di firmare',
  box: [{ n: 'DOMANDA 1', t: 'Quanto costa?' }, { n: 'DOMANDA 2', t: 'Chi aggiunge qualcosa?', key: true }] },
{ id: 's34', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Se non sa rispondere', illu: 'ascolto',
  titolo: 'Un numero,<br>**non un discorso**' },

// 8 · memo
{ id: 's35', tipo: 'frase', tema: 'profondo', sopratitolo: 'Da ricordare',
  testo: 'L\'ente versa <b class="a">solo</b> nel negoziale.' },

// 9 · chiusura
{ id: 's36', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE, attive: [0] },
{ id: 's37', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE, attive: [0, 1] },
{ id: 's38', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE },
{ id: 's39', tipo: 'mossa', tema: 'chiaro', sopratitolo: 'La mossa di oggi', illu: 'cartella',
  titolo: 'Controlla se sei **già iscritto**', passi: CEDOLINO, attive: [0, 1, 2] },
{ id: 's40', tipo: 'mossa', tema: 'chiaro', sopratitolo: 'La mossa di oggi', illu: 'cartella',
  titolo: 'Controlla se sei **già iscritto**', passi: CEDOLINO },
{ id: 's41', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Nella prossima lezione', illu: 'stelle',
  titolo: 'Chi è<br>**Perseo Sirio**' },

{ id: 's42', tipo: 'copertina', tema: 'profondo', chiusura: true, corso: CORSO, firma: FIRMA },
];
