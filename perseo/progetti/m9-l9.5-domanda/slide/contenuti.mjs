// Contenuto delle 49 scene della lezione 9.5 — Fare la domanda.
// s02–s48 sono i blocchi 1–47 del copione, uno a uno.

const CORSO = 'Perseo Sirio senza segreti';
const FIRMA = 'Un corso CISL FP Padova Rovigo';

const TAPPE = [['1', 'Cessazione'], ['2', 'Il modulo'], ['3', 'Area riservata'], ['4', 'La pratica'], ['5', 'Le somme']];
const per = (id, sop, at) => ({ id, tipo: 'percorso', tema: 'chiaro', sopratitolo: sop, tappe: TAPPE, at });

const CHECK = [
  'Documento d\'identità **valido**',
  'IBAN **intestato a te**',
  'Data di **cessazione**',
  'Scelta **capitale / rendita** e tipo di rendita',
  'Contributi non dedotti **già comunicati**',
];
const chk = (id, attive) => ({ id, tipo: 'memo', tema: 'chiaro', sopratitolo: 'Prima di caricare il modulo', voci: CHECK, attive });

const TRE_COSE = [
  'Modulo per i **dipendenti pubblici**',
  'Si carica nell\'**area riservata**',
  'Patronato e delegato **ti aiutano**',
];

const PASSI = [
  { t: 'Sito del Fondo, **modulistica**' },
  { t: 'Modulo di **richiesta della prestazione**' },
  { t: 'Leggilo **tutto**', key: true },
];

export const SCENE = [
{ id: 's01', tipo: 'copertina', tema: 'chiaro',
  modulo: 'Modulo 9 · Al pensionamento',
  titolo: 'Fare la domanda', sottotitolo: 'Lezione 9.5',
  ente: `${CORSO} · ${FIRMA}` },

// 1 · apertura
{ id: 's02', tipo: 'percorso', tema: 'chiaro', sopratitolo: 'Ricordi il sentiero dell\'adesione? · modulo 3', at: -1 },
{ id: 's03', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Molti anni dopo', illu: 'bussola',
  titolo: 'Il sentiero<br>**al contrario**' },
{ id: 's04', tipo: 'frase', tema: 'chiaro', sopratitolo: 'Altrettanto semplice',
  testo: 'Se lo conosci in anticipo,<br><b class="a">niente sorprese.</b>' },
{ id: 's05', tipo: 'figura', tema: 'chiaro', sopratitolo: 'In questa lezione', illu: 'dialogo',
  titolo: 'Tappa per tappa,<br>**e chi ti accompagna**' },
{ id: 's06', tipo: 'tre', tema: 'chiaro', sopratitolo: 'Modulo 9: l\'ultima tappa',
  box: [{ n: 'QUANDO', t: 'Lezione 9.1' }, { n: 'COME E TEMPI', t: 'Lezioni 9.2–9.4' }, { n: 'LA DOMANDA', t: 'Oggi', key: true }] },

// 2 · le cinque tappe
per('s07', 'Cinque tappe, in discesa', -1),
per('s08', 'Prima: la cessazione · lezione 9.1', 0),
{ id: 's09', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Senza cessazione', illu: 'lucchetto',
  titolo: 'Il sentiero<br>**non parte**' },
per('s10', 'Seconda: il modulo di richiesta', 1),
{ id: 's11', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Sito del Fondo · modulistica', illu: 'cartella',
  titolo: 'Il modulo<br>**per i dipendenti pubblici**' },
{ id: 's12', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Nel modulo indichi',
  col: [{ h: 'Quanto capitale', t: 'Fino alla metà', grande: true },
        { h: 'Quale rendita', t: '**Per il resto**', grande: true }] },
per('s13', 'Terza: carichi il modulo firmato', 2),
per('s14', 'Quarta: segui la pratica, con email e SMS', 3),
per('s15', 'Quinta: ricevi le somme, prima la parte reale', 4),

// 3 · la checklist
{ id: 's16', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Prima di caricare il modulo', illu: 'cartella',
  titolo: 'Una piccola<br>**checklist**' },
chk('s17', [0]),
chk('s18', [0, 1]),
chk('s19', [0, 1, 2]),
chk('s20', [0, 1, 2, 3]),
chk('s21', [0, 1, 2, 3, 4]),
{ id: 's22', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Gli allegati', illu: 'lettera',
  titolo: 'Li indica<br>**il modulo stesso**', sotto: 'Dipende dalla tua situazione.' },
{ id: 's23', tipo: 'frase', tema: 'chiaro', sopratitolo: 'Leggilo tutto prima di firmarlo',
  testo: 'È l\'ultima scelta importante<br><b class="a">del tuo percorso.</b>' },

// 4 · non da solo
{ id: 's24', tipo: 'tre', tema: 'chiaro', sopratitolo: 'Non devi farlo da solo',
  box: [{ n: '1', t: 'Numero verde del Fondo' }, { n: '2', t: 'Patronato INAS CISL' }, { n: '3', t: 'Delegato CISL FP' }] },
{ id: 's25', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Il numero verde del Fondo', illu: 'telefono',
  titolo: 'A che punto è,<br>**che cosa manca**' },
{ id: 's26', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Il patronato INAS CISL', illu: 'cartella',
  titolo: 'Pensione pubblica<br>**e complementare**' },
{ id: 's27', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Negli stessi mesi', illu: 'calendario',
  titolo: 'Due domande,<br>**preparate insieme**' },
{ id: 's28', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Il delegato CISL FP', illu: 'mani',
  titolo: 'I documenti<br>**con l\'ufficio del personale**' },
{ id: 's29', tipo: 'frase', tema: 'chiaro', sopratitolo: 'Il consiglio',
  testo: 'Muoviti qualche mese<br><b class="a">prima della data di uscita.</b>' },

// 5 · la notifica
{ id: 's30', tipo: 'figura', tema: 'chiaro', sopratitolo: 'E poi, un giorno', illu: 'telefono',
  titolo: 'La pratica<br>**è conclusa**' },
{ id: 's31', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Dopo anni di versamenti', illu: 'salvadanaio',
  titolo: 'Il salvadanaio<br>**si apre**' },
{ id: 's32', tipo: 'frase', tema: 'chiaro', sopratitolo: 'Non è un premio della lotteria',
  testo: 'È una scelta fatta molti anni prima,<br><b class="a">e mantenuta nel tempo.</b>' },
{ id: 's33', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Il motivo di questo corso', illu: 'stelle',
  titolo: 'Sapere che cosa succede,<br>**e perché**' },

// 6 · memo
{ id: 's34', tipo: 'frase', tema: 'profondo', sopratitolo: 'Da ricordare',
  testo: 'Prepara la domanda<br><b class="a">prima di uscire.</b>' },

// 7 · chiusura
{ id: 's35', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE, attive: [0] },
{ id: 's36', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Nel modulo scegli',
  col: [{ h: 'Capitale', t: 'Quanto', grande: true },
        { h: 'Rendita', t: '**Quale tipo**', grande: true }] },
{ id: 's37', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE, attive: [0, 1] },
{ id: 's38', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE },
{ id: 's39', tipo: 'mossa', tema: 'chiaro', sopratitolo: 'La mossa di oggi', illu: 'lettera',
  titolo: 'Scarica il **modulo di richiesta**', passi: PASSI },
{ id: 's40', tipo: 'frase', tema: 'chiaro', sopratitolo: 'Anche se la pensione è lontana',
  testo: 'Sapere che cosa ti chiederanno<br><b class="a">ti aiuta a decidere oggi.</b>' },
{ id: 's41', tipo: 'tre', tema: 'chiaro', sopratitolo: 'Fine del modulo 9',
  box: [{ n: 'QUANDO', t: 'Chiederla' }, { n: 'COME', t: 'Riceverla, e in quanto tempo' }, { n: 'LA DOMANDA', t: 'Passo per passo', key: true }] },
{ id: 's42', tipo: 'figura', tema: 'chiaro', sopratitolo: 'L\'ultimo modulo del corso', illu: 'pilastri',
  titolo: 'Mettiamo<br>**tutto insieme**' },
{ id: 's43', tipo: 'tre', tema: 'chiaro', sopratitolo: 'Nel modulo 10',
  box: [{ n: 'UN GIRO', t: 'Nell\'area riservata' }, { n: 'IL SIMULATORE', t: 'Proviamolo insieme' }, { n: 'TRE COLLEGHI', t: 'Tre situazioni', key: true }] },
{ id: 's44', tipo: 'tre', tema: 'chiaro', sopratitolo: 'Tre storie concrete',
  box: [{ n: 'L\'INFERMIERA', t: 'Appena assunta' }, { n: 'L\'OSS', t: 'In servizio da molti anni' }, { n: 'IL TECNICO', t: 'A tempo determinato' }] },
{ id: 's45', tipo: 'figura', tema: 'chiaro', sopratitolo: 'E alla fine', illu: 'cartella',
  titolo: 'Una checklist<br>**e chi ti aiuta**' },
{ id: 's46', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Modulo 10', illu: 'bilancia',
  titolo: 'Decidere<br>**con i tuoi numeri**' },
{ id: 's47', tipo: 'frase', tema: 'chiaro', sopratitolo: 'Tutto quello che hai imparato',
  testo: 'Diventa una decisione<br><b class="a">tua.</b>' },
{ id: 's48', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Ci vediamo nella lezione 10.1', illu: 'casa',
  titolo: 'L\'area<br>**riservata**' },

{ id: 's49', tipo: 'copertina', tema: 'profondo', chiusura: true, corso: CORSO, firma: FIRMA },
];
