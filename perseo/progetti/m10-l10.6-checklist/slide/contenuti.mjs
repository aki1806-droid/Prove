// Contenuto delle 49 scene della lezione 10.6 — La tua checklist e chi ti aiuta.
// s02–s48 sono i blocchi 1–47 del copione, uno a uno. Ultima lezione del corso.

const CORSO = 'Perseo Sirio senza segreti';
const FIRMA = 'Un corso CISL FP Padova Rovigo';

const D1 = [
  { n: '1', t: 'Sono in **TFS** o in **TFR**?' },
  { n: '2', t: 'Sono **iscritto**? Come?' },
  { n: '3', t: 'Verso l\'**1%**? Ricevo l\'**1% dell\'ente**?' },
  { n: '4', t: 'Quanti **anni** mancano alla pensione?' },
  { n: '5', t: 'In che **profilo** sono, contributi e TFR?' },
];
const D2 = [
  { n: '6', t: 'Il profilo è **coerente** con i miei anni?' },
  { n: '7', t: 'Ho designato i **beneficiari**, se serve?' },
  { n: '8', t: 'Ho **contributi non dedotti** da comunicare?' },
  { n: '9', t: 'Ho **vecchie posizioni** da riunire?' },
  { n: '10', t: 'Quando rifaccio **il punto**? Una volta l\'anno' },
];
const d1 = (id, attive) => ({ id, tipo: 'griglia', tema: 'chiaro', colonne: 1, sopratitolo: 'Le prime cinque domande', celle: D1, ...(attive ? { attive } : {}) });
const d2 = (id, attive) => ({ id, tipo: 'griglia', tema: 'chiaro', colonne: 1, sopratitolo: 'Le altre cinque', celle: D2, ...(attive ? { attive } : {}) });

const PASSI = [
  { t: 'Prendi **un foglio**' },
  { t: 'Rispondi alle **dieci domande**' },
  { t: 'Dove non sai, **torna alla lezione** o chiedi', key: true },
];

export const SCENE = [
{ id: 's01', tipo: 'copertina', tema: 'chiaro',
  modulo: 'Modulo 10 · Decidere con i tuoi numeri',
  titolo: 'La tua checklist', sottotitolo: 'Lezione 10.6 · e chi ti aiuta',
  ente: `${CORSO} · ${FIRMA}` },

// 1 · apertura
{ id: 's02', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Siamo partiti da qui', illu: 'armadietto',
  titolo: 'Un cambio turno,<br>**una domanda**' },
{ id: 's03', tipo: 'frase', tema: 'chiaro', sopratitolo: 'Dieci moduli fa',
  testo: 'Quanto mi arriverà,<br><b class="a">ogni mese?</b>' },
{ id: 's04', tipo: 'tre', tema: 'chiaro', sopratitolo: 'Una risposta precisa non c\'è. Dipende da',
  box: [{ n: 'LO STIPENDIO', t: 'E gli anni' }, { n: 'I MERCATI', t: 'Nessuno li conosce' }, { n: 'LE REGOLE', t: 'Che cambiano' }] },
{ id: 's05', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Ma ora hai gli strumenti', illu: 'pilastri',
  titolo: 'Costruirla<br>**un pezzo alla volta**' },
{ id: 's06', tipo: 'cifre', tema: 'chiaro', sopratitolo: 'Una pagina sola, da tenere nel cassetto',
  voci: [{ n: '10 domande', t: 'Da farti, una per una', key: true }] },
{ id: 's07', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Prendi un foglio', illu: 'dialogo',
  titolo: 'E le persone<br>**a cui rivolgerti**' },

// 2 · le prime cinque
d1('s08'),
d1('s09', [0]),
d1('s10', [1]),
{ id: 's11', tipo: 'tre', tema: 'chiaro', sopratitolo: 'Iscritto come? · modulo 3',
  box: [{ n: 'ADESIONE', t: 'Con il modulo' }, { n: 'SILENZIO-ASSENSO', t: 'Se non scegli' }, { n: 'CONTRATTUALE', t: 'Dal contratto' }] },
d1('s12', [2]),
{ id: 's13', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Riga per riga', illu: 'cartella',
  titolo: 'Lo vedi<br>**nel cedolino**' },
d1('s14', [3]),
d1('s15', [4]),
{ id: 's16', tipo: 'frase', tema: 'chiaro', sopratitolo: 'Se non sai rispondere',
  testo: 'Nessun problema:<br><b class="a">la lezione è nella dispensa.</b>' },

// 3 · le altre cinque
d2('s17'),
d2('s18', [0]),
d2('s19', [1]),
{ id: 's20', tipo: 'frase', tema: 'chiaro', sopratitolo: 'Lezione 8.5',
  testo: 'Una di quelle<br><b class="a">che si rimandano.</b>' },
d2('s21', [2]),
d2('s22', [3]),
d2('s23', [4]),
{ id: 's24', tipo: 'frase', tema: 'chiaro', sopratitolo: 'Dieci domande in tutto',
  testo: 'Nessuna richiede<br><b class="a">un esperto di finanza.</b>' },
{ id: 's25', tipo: 'tre', tema: 'chiaro', sopratitolo: 'Gli strumenti che ormai conosci',
  box: [{ n: 'IL CEDOLINO', t: 'Ogni mese' }, { n: 'IL PROSPETTO', t: 'Ogni anno' }, { n: 'L\'AREA RISERVATA', t: 'Sempre', key: true }] },

// 4 · il Fondo
{ id: 's26', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Quando una risposta non la trovi', illu: 'domanda',
  titolo: 'A chi<br>**rivolgerti?**' },
{ id: 's27', tipo: 'cifre', tema: 'chiaro', sopratitolo: 'Il Fondo · numero verde gratuito',
  voci: [{ n: '800 994 545', t: 'Annotalo nella rubrica del telefono', key: true }] },
{ id: 's28', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Numero verde',
  col: [{ h: 'Giorni', t: 'Lunedì–venerdì', grande: true },
        { h: 'Orari', t: '**9–13 e 14–16**', grande: true }] },
{ id: 's29', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Su prenotazione dal sito', illu: 'calendario',
  titolo: 'Consulenza<br>**gratuita**', sotto: 'Anche prima di aderire.' },
{ id: 's30', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Serve proprio a questo',
  col: [{ h: 'Scegliere', t: 'Il profilo', grande: true },
        { h: 'Valutare', t: '**Le scelte importanti**', grande: true }] },
{ id: 's31', tipo: 'tre', tema: 'chiaro', sopratitolo: 'Sul sito fondoperseosirio.it',
  box: [{ n: 'FAQ', t: 'Domande frequenti' }, { n: 'NOTA INFORMATIVA', t: 'Le regole' }, { n: 'MODULISTICA', t: 'Tutti i moduli' }] },
{ id: 's32', tipo: 'frase', tema: 'chiaro', sopratitolo: 'Documenti scritti con cura',
  testo: 'Ora conosci<br><b class="a">le parole giuste.</b>' },

// 5 · sul tuo posto di lavoro
{ id: 's33', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Ogni giorno', illu: 'persona',
  titolo: 'Chi lavora<br>**accanto a te**' },
{ id: 's34', tipo: 'frase', tema: 'chiaro', sopratitolo: 'Questo corso è stato realizzato da',
  testo: 'CISL FP<br><b class="a">Padova Rovigo</b>' },
{ id: 's35', tipo: 'tre', tema: 'chiaro', sopratitolo: 'I delegati CISL FP nel tuo ente ti aiutano con',
  box: [{ n: 'IL CEDOLINO', t: 'Leggerlo' }, { n: 'I DOCUMENTI', t: 'Ritrovarli' }, { n: 'LA SIMULAZIONE', t: 'Prepararla', key: true }] },
{ id: 's36', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Patronato INAS CISL',
  col: [{ h: 'Pensione', t: 'Pubblica', grande: true },
        { h: 'Pensione', t: '**Complementare**', grande: true }] },
{ id: 's37', tipo: 'frase', tema: 'chiaro', sopratitolo: 'Non serve aspettare un problema',
  testo: 'Basta una domanda,<br><b class="a">al momento giusto.</b>' },
{ id: 's38', tipo: 'frase', tema: 'chiaro', sopratitolo: 'Una domanda fatta in tempo',
  testo: 'Vale più di dieci risposte<br><b class="a">cercate in fretta.</b>' },

// 6 · memo
{ id: 's39', tipo: 'frase', tema: 'profondo', sopratitolo: 'Da ricordare',
  testo: 'La tua pensione<br><b class="a">si costruisce oggi.</b>' },

// 7 · chiusura del corso
{ id: 's40', tipo: 'mossa', tema: 'chiaro', sopratitolo: 'La mossa di oggi, l\'ultima', illu: 'lettera',
  titolo: 'Rispondi alle **dieci domande**', passi: PASSI },
{ id: 's41', tipo: 'tre', tema: 'chiaro', sopratitolo: 'Oppure chiedi a',
  box: [{ n: 'IL FONDO', t: 'Numero verde e consulenza' }, { n: 'UN DELEGATO', t: 'CISL FP' }, { n: 'IL PATRONATO', t: 'INAS CISL' }] },
{ id: 's42', tipo: 'tasche', tema: 'chiaro', sopratitolo: 'I tre pilastri, le due tasche', fase: 'due' },
{ id: 's43', tipo: 'tre', tema: 'chiaro', sopratitolo: 'Ritornano tutti, nelle dieci domande',
  box: [{ n: 'IL SALVADANAIO', t: 'Tre ingressi' }, { n: 'LA SCALA', t: 'Del fisco' }, { n: 'IL PILOTA', t: 'Automatico' }] },
{ id: 's44', tipo: 'frase', tema: 'chiaro', sopratitolo: 'Strumenti semplici',
  testo: 'Per una scelta<br><b class="a">importante.</b>' },
{ id: 's45', tipo: 'frase', tema: 'chiaro', sopratitolo: 'Non devi fare tutto stasera',
  testo: 'Comincia<br><b class="a">con una domanda sola.</b>' },
{ id: 's46', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Fine del corso', illu: 'stelle',
  titolo: 'Grazie<br>**per averlo seguito**' },
{ id: 's47', tipo: 'frase', tema: 'chiaro', sopratitolo: CORSO,
  testo: 'Perseo Sirio,<br><b class="a">un segreto in meno.</b>' },
{ id: 's48', tipo: 'frase', tema: 'profondo', sopratitolo: 'Fine del corso',
  testo: 'Buon lavoro, oggi.<br><b class="a">Per la pensione di domani.</b>' },

{ id: 's49', tipo: 'copertina', tema: 'profondo', chiusura: true, corso: CORSO, firma: FIRMA },
];
