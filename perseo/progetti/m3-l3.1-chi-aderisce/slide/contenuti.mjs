// Contenuto delle 45 scene della lezione 3.1 — Chi può aderire.
// s02–s44 sono i blocchi 1–43 del copione, uno a uno.

const CORSO = 'Perseo Sirio senza segreti';
const FIRMA = 'Un corso CISL FP Padova Rovigo';

const CONTRATTI = {
  intestazioni: ['Contratto', 'Si può aderire?'],
  colonne: ['55%', '45%'],
  righe: [
    ['Tempo indeterminato', 'si:sì, sempre'],
    ['Part-time a tempo indeterminato', 'si:sì, sempre'],
    ['Tempo determinato o flessibile', 'si:sì, se dura almeno 3 mesi'],
  ],
};

const AFFINI = [
  { n: 'CON ACCORDO', t: 'Case di cura e ospedali religiosi' },
  { n: 'CON ACCORDO', t: 'Servizi socio-sanitari esternalizzati' },
  { n: 'FAMIGLIA', t: 'Familiari fiscalmente a carico', key: true },
];

const TRE_COSE = [
  'Sanità e PA, **non la scuola**',
  'Contratto di **almeno 3 mesi**',
  'A termine: **firma presto**',
];

const PASSI = [
  { t: 'Prendi il tuo **cedolino**' },
  { t: 'Trova il **contratto applicato**' },
  { t: 'Annota la **scadenza**, se c\'è', key: true },
];

const can = (id, sop, n, extra = {}) => ({ id, tipo: 'cancello', tema: 'chiaro', sopratitolo: sop, n, ...extra });
const bar = (id, sop, extra = {}) => ({ id, tipo: 'barra', tema: 'chiaro', sopratitolo: sop, ...extra });

export const SCENE = [
{ id: 's01', tipo: 'copertina', tema: 'chiaro',
  modulo: 'Modulo 3 · Chi può aderire e come',
  titolo: 'Chi può<br>aderire', sottotitolo: 'Lezione 3.1',
  ente: `${CORSO} · ${FIRMA}` },

// 1 · apertura
{ id: 's02', tipo: 'icone', tema: 'chiaro', sopratitolo: 'All\'ingresso del personale',
  voci: [{ icona: 'ospedale', t: 'Infermieri e medici' }, { icona: 'ingranaggio', t: 'Tecnici' },
         { icona: 'cartella', t: 'Amministrativi' }, { icona: 'cuoremano', t: 'Operatori socio-sanitari' }] },
{ id: 's03', tipo: 'tre', tema: 'chiaro', sopratitolo: 'Contratti diversi',
  box: [{ n: 'C\'È CHI', t: 'Tempo indeterminato' }, { n: 'C\'È CHI', t: 'Tempo determinato' }, { n: 'C\'È CHI', t: 'Part-time' }] },
{ id: 's04', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Possono aderire tutti?', illu: 'domanda',
  titolo: 'Quasi sempre **sì**,<br>con qualche condizione' },
{ id: 's05', tipo: 'tre', tema: 'chiaro', sopratitolo: 'In questa lezione',
  box: [{ n: 'PRIMA', t: 'Il comparto' }, { n: 'POI', t: 'Il contratto' }, { n: 'E', t: 'I tempi', key: true }] },

// 2 · i comparti
can('s06', 'Chi passa il cancello', 0, { evidenzia: false }),
can('s07', 'Chi passa il cancello', 1),
can('s08', 'Chi passa il cancello', 3),
can('s09', 'Chi passa il cancello', 4),
can('s10', 'Chi passa il cancello', 5),
can('s11', 'Chi passa il cancello', 6),
can('s12', 'Fuori dal cancello', 6, { scuola: true, evidenzia: false }),

// 3 · il contratto
{ id: 's13', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Il tipo di contratto', illu: 'contratto',
  titolo: 'Più semplice<br>di quanto si pensi' },
{ id: 's14', tipo: 'tabella', tema: 'chiaro', sopratitolo: 'Si può aderire?', ...CONTRATTI, righe: CONTRATTI.righe.slice(0, 2), chiave: [0, 1] },
{ id: 's15', tipo: 'icone', tema: 'chiaro', sopratitolo: 'Non conta il profilo',
  voci: [{ icona: 'ospedale', t: 'Infermiere' }, { icona: 'cartella', t: 'Amministrativo' },
         { icona: 'ingranaggio', t: 'Tecnico' }, { icona: 'cappello', t: 'Dirigente', key: true }] },
{ id: 's16', tipo: 'tabella', tema: 'chiaro', sopratitolo: 'Si può aderire?', ...CONTRATTI, chiave: [2] },
{ id: 's17', tipo: 'cifre', tema: 'chiaro', sopratitolo: 'La condizione',
  voci: [{ n: '3', t: 'Mesi continuativi, almeno', d: 'Sotto questa soglia l\'adesione non è prevista.', key: true }] },
{ id: 's18', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Il part-time',
  col: [{ h: 'Cambia', t: 'L\'**importo** dei contributi', grande: true },
        { h: 'Non cambia', t: 'Le **regole**', grande: true }] },

// 4 · i tre mesi
bar('s19', 'Il contratto a termine come una barra', { fase: 'barra' }),
bar('s20', 'Si può aderire fino alla scadenza', { fase: 'barra' }),
bar('s21', 'Se manca troppo poco', { fase: 'barra' }),
bar('s22', 'I versamenti partono dal contratto dopo', { fase: 'dopo' }),
bar('s23', 'Firma almeno tre mesi prima', { fase: 'penna' }),
bar('s24', 'Un esempio', { fase: 'penna', scadenza: '31 dicembre', mese: 'settembre' }),
{ id: 's25', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Anche un contratto breve', illu: 'calendario',
  titolo: 'Quei mesi<br>**non vanno persi**' },
{ id: 's26', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Dopo la scadenza', illu: 'salvadanaio',
  titolo: 'La posizione<br>può **restare aperta**', sotto: 'Nell\'ultima lezione del modulo.' },

// 5 · non solo pubblico
{ id: 's27', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Accanto al pubblico', illu: 'casa',
  titolo: 'Un datore<br>di lavoro **privato**' },
{ id: 's28', tipo: 'griglia', tema: 'chiaro', colonne: 1, spunta: false, sopratitolo: 'Non solo pubblico', celle: AFFINI, attive: [0] },
{ id: 's29', tipo: 'griglia', tema: 'chiaro', colonne: 1, spunta: false, sopratitolo: 'Non solo pubblico', celle: AFFINI, attive: [0, 1] },
{ id: 's30', tipo: 'figura', tema: 'chiaro', sopratitolo: 'L\'accordo', illu: 'contratto',
  titolo: 'Lo firma<br>il **datore di lavoro**', sotto: 'Chiedi in amministrazione.' },
{ id: 's31', tipo: 'figura', tema: 'chiaro', sopratitolo: 'In questo caso', illu: 'bilancia',
  titolo: 'In parte<br>regole **dei privati**' },
{ id: 's32', tipo: 'griglia', tema: 'chiaro', colonne: 1, spunta: false, sopratitolo: 'Non solo pubblico', celle: AFFINI, attive: [2] },

// 6 · in sintesi
{ id: 's33', tipo: 'catena', tema: 'chiaro', sopratitolo: 'In una frase',
  passi: [{ t: 'Sanità o PA, **non la scuola**' }, { t: 'Contratto di **almeno 3 mesi**' }, { t: 'Puoi aderire', key: true }] },
{ id: 's34', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Libera e volontaria',
  col: [{ h: 'Nessuno può', t: '**Obbligarti**', grande: true },
        { h: 'Nessuno può', t: '**Impedirtelo**', grande: true }] },
{ id: 's35', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Nella lezione 3.3', illu: 'orologio',
  titolo: 'I **neoassunti**', sotto: 'Iscritti anche senza firmare.' },
{ id: 's36', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Nella lezione 3.4', illu: 'semaforo',
  titolo: 'La **polizia locale**', sotto: 'Una strada tutta sua.' },
{ id: 's37', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Due controlli',
  col: [{ h: 'Primo', t: 'Il **comparto**', grande: true },
        { h: 'Secondo', t: 'Il **contratto**', grande: true }] },
{ id: 's38', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Se hai un dubbio', illu: 'cartella',
  titolo: 'Chiedi<br>all\'**ufficio del personale**' },

// 7 · memo
{ id: 's39', tipo: 'frase', tema: 'profondo', sopratitolo: 'Da ricordare',
  testo: 'Anche un contratto breve è <b class="a">un pezzo della tua pensione</b>.' },

// 8 · chiusura
{ id: 's40', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE, attive: [0] },
{ id: 's41', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE, attive: [0, 1] },
{ id: 's42', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE },
{ id: 's43', tipo: 'mossa', tema: 'chiaro', sopratitolo: 'La mossa di oggi', illu: 'cartella',
  titolo: 'Controlla **comparto e contratto**', passi: PASSI },
{ id: 's44', tipo: 'percorso', tema: 'chiaro', sopratitolo: 'Prossima lezione: aderire passo per passo', at: 0 },

{ id: 's45', tipo: 'copertina', tema: 'profondo', chiusura: true, corso: CORSO, firma: FIRMA },
];
