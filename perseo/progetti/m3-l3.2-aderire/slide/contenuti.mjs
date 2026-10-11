// Contenuto delle 48 scene della lezione 3.2 — Aderire passo per passo.
// s02–s47 sono i blocchi 1–46 del copione, uno a uno.

const CORSO = 'Perseo Sirio senza segreti';
const FIRMA = 'Un corso CISL FP Padova Rovigo';

const DOMANDE = [
  { t: 'Quanti anni mancano alla pensione?' },
  { t: 'Quanto rischio accetti?' },
  { t: 'Hai altre forme di risparmio?' },
  { t: 'Cosa sai degli investimenti?' },
];

const NOIPA = [
  { t: 'Servizi **self-service**' },
  { t: 'Previdenza **complementare**' },
  { t: 'Gestione **adesioni**', key: true },
];

const TRE_COSE = [
  '**Leggi** prima di firmare',
  'Minimo **1%** per avere l\'1% dell\'ente',
  'Conta la **firma dell\'ente**',
];

const PASSI = [
  { t: 'Sito del Fondo, **documenti per l\'adesione**' },
  { t: 'Scarica le **informazioni chiave**' },
  { t: 'Leggi almeno **la prima pagina**', key: true },
];

const per = (id, sop, at) => ({ id, tipo: 'percorso', tema: 'chiaro', sopratitolo: sop, at });
const mod = (id, sop, at, extra = {}) => ({ id, tipo: 'modulo', tema: 'chiaro', sopratitolo: sop, at, ...extra });

export const SCENE = [
{ id: 's01', tipo: 'copertina', tema: 'chiaro',
  modulo: 'Modulo 3 · Chi può aderire e come',
  titolo: 'Aderire<br>passo per passo', sottotitolo: 'Lezione 3.2',
  ente: `${CORSO} · ${FIRMA}` },

// 1 · apertura
per('s02', 'Un sentiero con poche tappe', -1),
{ id: 's03', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Il segreto', illu: 'bussola',
  titolo: 'Non saltare<br>**nessuna tappa**', sotto: 'E conosci prima le scelte.' },
per('s04', 'Dalla prima lettura alla conferma', -1),
per('s05', 'Cinque tappe', 4),

// 2 · leggere
per('s06', 'Prima tappa: leggere', 0),
{ id: 's07', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Da leggere prima', illu: 'libro',
  titolo: 'Le **informazioni chiave**<br>per l\'aderente', sotto: 'La prima parte della Nota informativa.' },
{ id: 's08', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Da leggere prima', illu: 'stelle',
  titolo: 'L\'appendice<br>sulla **sostenibilità**' },
{ id: 's09', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Insieme trovi anche', illu: 'lettera',
  titolo: '**La mia pensione**<br>complementare', sotto: 'Una proiezione standardizzata.' },
{ id: 's10', tipo: 'tre', tema: 'chiaro', sopratitolo: 'Bastano le prime pagine',
  box: [{ n: 'CHI SEI', t: 'Come iscritto' }, { n: 'QUANTO', t: 'Costa il Fondo' }, { n: 'QUALI', t: 'Scelte avrai', key: true }] },
{ id: 's11', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Un modello uguale per tutti', illu: 'bilancia',
  titolo: 'Puoi<br>**confrontare**' },

// 3 · il questionario
per('s12', 'Seconda tappa: il questionario', 1),
{ id: 's13', tipo: 'elenco', tema: 'chiaro', sopratitolo: 'Il questionario', voci: DOMANDE, attive: [0, 1, 2] },
{ id: 's14', tipo: 'elenco', tema: 'chiaro', sopratitolo: 'Non è un esame', voci: DOMANDE },
{ id: 's15', tipo: 'figura', tema: 'chiaro', sopratitolo: 'A che cosa serve', illu: 'bussola',
  titolo: 'Ti orienta<br>verso un **profilo**', sotto: 'I profili nel modulo 6.' },
{ id: 's16', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Con sincerità', illu: 'lente',
  titolo: 'Una risposta di comodo,<br>un **profilo sbagliato**' },

// 4 · il modulo
per('s17', 'Terza tappa: il modulo', 2),
mod('s18', 'Le scelte del modulo', 0),
mod('s19', 'Quanto versi', 0, { cursore: true }),
mod('s20', 'Non fermarti al minimo per abitudine', 0, { cursore: true }),
mod('s21', 'Il profilo di investimento', 1),
mod('s22', 'Solo se sei in TFS', 2),
mod('s23', 'I beneficiari', 3),
mod('s24', 'Attenzione', -1, { avviso: true }),

// 5 · la firma dell'ente
per('s25', 'Quarta tappa: la firma dell\'ente', 3),
{ id: 's26', tipo: 'timbro', tema: 'chiaro', sopratitolo: 'L\'ente firma e invia', fase: 'pec' },
{ id: 's27', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Conserva sempre', illu: 'cartella',
  titolo: 'Una **copia firmata**', sotto: 'La prova della scelta e della data.' },
{ id: 's28', tipo: 'timbro', tema: 'chiaro', sopratitolo: 'Conta la firma del datore di lavoro', fase: 'timbro' },
{ id: 's29', tipo: 'timbro', tema: 'chiaro', sopratitolo: 'I versamenti dal mese dopo', fase: 'mese' },
{ id: 's30', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Appena hai deciso', illu: 'calendario',
  titolo: 'Ogni mese di ritardo,<br>**un mese in meno**' },
{ id: 's31', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Dopo qualche settimana', illu: 'dialogo',
  titolo: 'Chiedi **conferma**<br>all\'ufficio' },
per('s32', 'Quinta tappa: la conferma', 4),

// 6 · NoiPA
{ id: 's33', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Se lo stipendio passa da NoiPA', illu: 'schermo',
  titolo: 'Un percorso<br>**a parte**', sotto: 'Ministeri, agenzie fiscali e altri enti.' },
{ id: 's34', tipo: 'catena', tema: 'chiaro', sopratitolo: 'Tutto online, niente carta', passi: NOIPA },
{ id: 's35', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Per entrare', illu: 'scudo',
  titolo: 'Le tue<br>**credenziali personali**' },
{ id: 's36', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Dentro il portale', illu: 'cartella',
  titolo: 'Le **stesse tappe**', sotto: 'Informazioni chiave, questionario, scelte.' },
{ id: 's37', tipo: 'cifre', tema: 'chiaro', sopratitolo: 'Per confermare',
  voci: [{ n: '5', t: 'Cifre del PIN dispositivo', d: 'Si chiede all\'ufficio del personale.', key: true }] },
{ id: 's38', tipo: 'cifre', tema: 'chiaro', sopratitolo: 'Adesioni via NoiPA',
  voci: [{ n: '30', t: 'Giorni per ripensarci', key: true }] },
{ id: 's39', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Quale percorso vale per te',
  col: [{ h: 'Sanità, enti locali', t: 'Il **modulo firmato**', grande: true },
        { h: 'Enti su NoiPA', t: 'Il **portale**', grande: true }] },

// 7 · memo
{ id: 's40', tipo: 'frase', tema: 'profondo', sopratitolo: 'Da ricordare',
  testo: 'Compilare non basta. Sei iscritto quando <b class="a">il tuo ente ha firmato</b>.' },

// 8 · chiusura
{ id: 's41', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE, attive: [0] },
{ id: 's42', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE, attive: [0, 1] },
{ id: 's43', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE },
{ id: 's44', tipo: 'mossa', tema: 'chiaro', sopratitolo: 'La mossa di oggi', illu: 'libro',
  titolo: 'Scarica le **informazioni chiave**', passi: PASSI.slice(0, 2) },
{ id: 's45', tipo: 'mossa', tema: 'chiaro', sopratitolo: 'La mossa di oggi', illu: 'libro',
  titolo: 'Scarica le **informazioni chiave**', passi: PASSI },
{ id: 's46', tipo: 'tre', tema: 'chiaro', sopratitolo: 'Se hai già aderito, conserva',
  box: [{ n: 'UNO', t: 'La copia firmata' }, { n: 'DUE', t: 'La lettera di conferma', key: true }] },
{ id: 's47', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Prossima lezione', illu: 'orologio',
  titolo: 'Il silenzio<br>che **vale un sì**', sotto: 'I neoassunti.' },

{ id: 's48', tipo: 'copertina', tema: 'profondo', chiusura: true, corso: CORSO, firma: FIRMA },
];
