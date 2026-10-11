// Contenuto delle 43 scene della lezione 1.4 — Chi è Perseo Sirio.
// s02–s42 sono i blocchi 1–41 del copione, uno a uno.

const CORSO = 'Perseo Sirio senza segreti';
const FIRMA = 'Un corso CISL FP Padova Rovigo';

const CARTA = [
  ['Forma', 'Associazione riconosciuta'],
  ['Scopo di lucro', 'No'],
  ['Albo COVIP', 'n. 164'],
  ['Regime', 'Contribuzione definita'],
  ['Sede', 'Roma'],
];

const RAGGI = [
  { t: 'Sanità' }, { t: 'Locali' }, { t: 'Centrali' },
  { t: 'Università' }, { t: 'ENAC, CNEL' }, { t: 'Dirigenza' },
];

const TRE_COSE = [
  'Nato nel **2014** da due fondi',
  'Associazione **senza scopo di lucro**',
  'Per **sanità e PA**, non la scuola',
];

const RUBRICA = [
  { t: 'Numero verde **800 994 545**' },
  { t: 'Dal **lunedì al venerdì**, 9–16' },
  { t: 'Sito **fondoperseosirio.it**' },
  { t: 'Salvalo **in rubrica**', key: true },
];

export const SCENE = [
{ id: 's01', tipo: 'copertina', tema: 'chiaro',
  modulo: 'Modulo 1 · Perché pensarci adesso',
  titolo: 'Chi è<br>Perseo Sirio', sottotitolo: 'Lezione 1.4',
  ente: `${CORSO} · ${FIRMA}` },

// 1 · apertura
{ id: 's02', tipo: 'vignetta', tema: 'chiaro', sopratitolo: 'Una costellazione, una stella', illu: ['stelle'] },
{ id: 's03', tipo: 'griglia', tema: 'chiaro', colonne: 2, spunta: false, sopratitolo: 'In questa lezione',
  celle: [{ n: '1', t: 'Che **cos\'è**' }, { n: '2', t: 'Da dove **viene**' },
          { n: '3', t: 'A chi si **rivolge**' }, { n: '4', t: 'Quanto è **grande**' }] },
{ id: 's04', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Prima di affidarsi', illu: 'lente',
  titolo: 'Sapere<br>**con chi**' },

// 2 · la storia
{ id: 's05', tipo: 'nascita', tema: 'chiaro', sopratitolo: '1999 · Perseo', fase: 'perseo' },
{ id: 's06', tipo: 'nascita', tema: 'chiaro', sopratitolo: '1999 · Perseo', fase: 'perseo' },
{ id: 's07', tipo: 'nascita', tema: 'chiaro', sopratitolo: '2007 · Sirio', fase: 'sirio' },
{ id: 's08', tipo: 'nascita', tema: 'chiaro', sopratitolo: 'Due fondi, due strutture', fase: 'sirio' },
{ id: 's09', tipo: 'nascita', tema: 'chiaro', sopratitolo: '2014 · Perseo Sirio', fase: 'fusione' },
{ id: 's10', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Perché conviene unire', illu: 'persona',
  titolo: 'Costi fissi<br>**divisi su molti**' },

// 3 · la carta d'identità
{ id: 's11', tipo: 'carta', tema: 'chiaro', sopratitolo: 'Carta d\'identità del Fondo', righe: CARTA, attive: [0, 1] },
{ id: 's12', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Un\'associazione',
  col: [{ h: 'Gli iscritti', t: 'Non **clienti**, ma **soci**', grande: true },
        { h: 'I conti', t: 'A **loro** favore', grande: true }] },
{ id: 's13', tipo: 'carta', tema: 'chiaro', sopratitolo: 'Carta d\'identità del Fondo', righe: CARTA, attive: [0, 1, 2, 4] },
{ id: 's14', tipo: 'carta', tema: 'chiaro', sopratitolo: 'Carta d\'identità del Fondo', righe: CARTA },
{ id: 's15', tipo: 'composto', tema: 'chiaro', sopratitolo: 'Un conto che cresce', fase: 'linee' },
{ id: 's16', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Due fasi',
  col: [{ h: 'Accumulo', t: 'Finché **lavori** e versi', grande: true },
        { h: 'Erogazione', t: 'Rendita, capitale o **mix**', grande: true }] },
{ id: 's17', tipo: 'catena', tema: 'chiaro', sopratitolo: 'Tre cose',
  passi: [{ t: 'Raccoglie', d: 'i contributi' }, { t: 'Fa gestire', d: 'da professionisti' }, { t: 'Eroga', d: 'le prestazioni', key: true }] },

// 4 · chi può aderire
{ id: 's18', tipo: 'raggiera', tema: 'chiaro', sopratitolo: 'Chi può aderire', centro: 'Perseo Sirio', raggi: RAGGI, attive: [0, 1] },
{ id: 's19', tipo: 'raggiera', tema: 'chiaro', sopratitolo: 'Chi può aderire', centro: 'Perseo Sirio', raggi: RAGGI, attive: [0, 1, 2, 3, 4] },
{ id: 's20', tipo: 'raggiera', tema: 'chiaro', sopratitolo: 'Chi può aderire', centro: 'Perseo Sirio', raggi: RAGGI },
{ id: 's21', tipo: 'icone', tema: 'chiaro', sopratitolo: 'Migliaia di amministrazioni',
  voci: [{ icona: 'ospedale', t: 'Aziende sanitarie' }, { icona: 'casa', t: 'Comuni' },
         { icona: 'giudice', t: 'Ministeri' }, { icona: 'cappello', t: 'Università' }] },
{ id: 's22', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Anche nel privato', illu: 'mani',
  titolo: 'Con **appositi**<br>accordi', sotto: 'Case di cura, servizi socio-sanitari esternalizzati.' },
{ id: 's23', tipo: 'confronto', tema: 'tenue', sopratitolo: 'Una precisazione',
  col: [{ h: 'La scuola', t: 'Fondo **Espero**', grande: true },
        { h: 'Perseo Sirio', t: '**Non** per la scuola', grande: true }] },

// 5 · i numeri
{ id: 's24', tipo: 'cifre', tema: 'chiaro', sopratitolo: 'Quanto è grande',
  voci: [{ n: '300', suf: 'mila', t: 'aderenti, e oltre', key: true }] },
{ id: 's25', tipo: 'cifre', tema: 'chiaro', sopratitolo: 'Quanto è grande',
  voci: [{ n: '300', suf: 'mila', t: 'aderenti, e oltre' }, { n: '50', suf: 'mila', t: 'prestazioni nel 2024' },
         { n: '1', suf: 'mld €', t: 'patrimonio nel 2025', key: true }] },
{ id: 's26', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Di chi è il patrimonio', illu: 'persona',
  titolo: 'Degli **iscritti**,<br>messo insieme' },
{ id: 's27', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Letti al contrario',
  col: [{ h: 'Iscritti', t: '**Oltre** 300.000', grande: true },
        { h: 'Chi potrebbe aderire', t: '**Molti di più**', grande: true }] },
{ id: 's28', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Perché non hanno aderito', illu: 'ascolto',
  titolo: 'Nessuno<br>**l\'ha spiegato**' },
{ id: 's29', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Perché questo corso', illu: 'bussola',
  titolo: 'Scegliere<br>**sapendo**' },

// 6 · perché due stelle
{ id: 's30', tipo: 'vignetta', tema: 'chiaro', sopratitolo: 'Orientarsi su una distanza lunga', illu: ['stelle', 'bussola'] },
{ id: 's31', tipo: 'tre', tema: 'chiaro', sopratitolo: 'Quello che conta',
  box: [{ n: 'PER', t: 'La tua categoria' }, { n: 'NATO', t: 'Dal tuo contratto' }, { n: 'GOVERNATO', t: 'Anche da chi ti rappresenta', key: true }] },
{ id: 's32', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Nella prossima lezione', illu: 'bilancia',
  titolo: 'Chi decide,<br>**chi controlla**' },

// 7 · i contatti
{ id: 's33', tipo: 'cifre', tema: 'chiaro', sopratitolo: 'Numero verde gratuito',
  voci: [{ n: '800 994 545', t: 'Lunedì–venerdì, 9–16', key: true }] },
{ id: 's34', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Il sito', illu: 'cartella',
  titolo: 'fondoperseosirio**.it**', sotto: 'Modulistica, domande frequenti, area riservata.' },
{ id: 's35', tipo: 'icone', tema: 'chiaro', sopratitolo: 'Documenti pubblici',
  voci: [{ icona: 'documento', t: 'Nota informativa' }, { icona: 'libro', t: 'Statuto' },
         { icona: 'euro', t: 'Rendimenti dei comparti' }] },
{ id: 's36', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Una voce di corridoio?', illu: 'lente',
  titolo: 'Prima di crederci,<br>**si controlla**' },

// 8 · memo
{ id: 's37', tipo: 'frase', tema: 'profondo', sopratitolo: 'Da ricordare',
  testo: 'Nato dal contratto, <b class="a">non</b> dal mercato.' },

// 9 · chiusura
{ id: 's38', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE, attive: [0] },
{ id: 's39', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE, attive: [0, 1] },
{ id: 's40', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE },
{ id: 's41', tipo: 'mossa', tema: 'chiaro', sopratitolo: 'La mossa di oggi', illu: 'telefono',
  titolo: 'Salva il **numero verde**', passi: RUBRICA },
{ id: 's42', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Nella prossima lezione', illu: 'bilancia',
  titolo: 'Chi decide<br>e **chi controlla**' },

{ id: 's43', tipo: 'copertina', tema: 'profondo', chiusura: true, corso: CORSO, firma: FIRMA },
];
