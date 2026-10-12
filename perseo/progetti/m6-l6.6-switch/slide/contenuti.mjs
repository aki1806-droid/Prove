// Contenuto delle 49 scene della lezione 6.6 — Cambiare idea: switch e questionario.
// s02–s48 sono i blocchi 1–47 del copione, uno a uno.

const CORSO = 'Perseo Sirio senza segreti';
const FIRMA = 'Un corso CISL FP Padova Rovigo';

const sw = (id, sop, fase) => ({ id, tipo: 'switch', tema: 'chiaro', sopratitolo: sop, fase });

const REGOLE = [
  { n: 'PRIMO CAMBIO', t: 'Subito' },
  { n: 'POI', t: 'Almeno 12 mesi tra un cambio e l\'altro' },
  { n: 'COSTO', t: 'Nessuno' },
];
const reg = (id, sop, k) => ({ id, tipo: 'tre', tema: 'chiaro', sopratitolo: sop, box: REGOLE.map((b, i) => ({ ...b, key: k === 9 || i === k })) });

const MOTIVI = [
  ['Ti avvicini alla pensione', 'Il mercato è sceso il mese scorso'],
  ['È cambiata la tua situazione', 'Un collega ha guadagnato di più'],
  ['Silenzio-assenso, mai scelto', 'Una notizia allarmante'],
];
const mot = (id, k, chiave, sop = 'Buoni motivi e cattivi motivi') => ({ id, tipo: 'tabella', tema: 'chiaro', sopratitolo: sop,
  intestazioni: ['Buoni motivi', 'Cattivi motivi'], colonne: ['50%', '50%'],
  righe: MOTIVI.map(r => [k >= 1 ? r[0] : '', k >= 2 ? r[1] : '']), chiave });

const TRE_COSE = [
  'Primo cambio **subito**, poi ogni **12 mesi**',
  'Cambiare è **gratuito**',
  'Questionario e consulenza **aiutano**',
];

const PASSI = [
  { t: 'Area riservata · **questionario**' },
  { t: 'Confronta con **il tuo profilo**' },
  { t: 'Non coincide? **Consulenza**', key: true },
];

export const SCENE = [
{ id: 's01', tipo: 'copertina', tema: 'chiaro',
  modulo: 'Modulo 6 · Dove vanno i tuoi soldi',
  titolo: 'Cambiare idea:<br>switch e questionario', sottotitolo: 'Lezione 6.6',
  ente: `${CORSO} · ${FIRMA}` },

// 1 · apertura
{ id: 's02', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Un buon ciclista', illu: 'ingranaggio',
  titolo: 'Cambia marcia<br>**prima della salita**', sotto: 'Non a metà. E non a ogni curva.' },
{ id: 's03', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Lo switch',
  col: [{ h: 'Da un profilo', t: 'Quello di oggi', grande: true },
        { h: 'A un altro', t: '**Quello nuovo**', grande: true }] },
{ id: 's04', tipo: 'tre', tema: 'chiaro', sopratitolo: 'In questa lezione',
  box: [{ n: 'LE REGOLE', t: 'Per cambiare' }, { n: 'GLI STRUMENTI', t: 'Per decidere' }, { n: 'IL MOMENTO', t: 'Giusto', key: true }] },
{ id: 's05', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Ultima lezione del modulo', illu: 'bussola',
  titolo: 'Dove vanno i tuoi soldi,<br>**e come orientarli**' },
{ id: 's06', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Come sempre nel modulo', illu: 'campana',
  titolo: 'Informazioni generali,<br>**non consulenza finanziaria**', sotto: 'I rendimenti passati non garantiscono quelli futuri.' },

// 2 · le regole
{ id: 's07', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Le regole', illu: 'libro',
  titolo: 'Poche<br>**e semplici**', sotto: 'Nota informativa e Statuto del Fondo.' },
{ id: 's08', tipo: 'figura', tema: 'chiaro', sopratitolo: 'La regola generale', illu: 'calendario',
  titolo: 'Almeno 12 mesi<br>**nello stesso profilo**' },
{ id: 's09', tipo: 'cifre', tema: 'chiaro', sopratitolo: 'Una marcia alla volta',
  voci: [{ n: '12 mesi', t: 'Tra un cambio e l\'altro', key: true }] },
reg('s10', 'Con la nuova gestione finanziaria', 0),
{ id: 's11', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Lo Statuto: la stessa possibilità',
  col: [{ h: 'Chi è entrato', t: 'Per **silenzio-assenso**', grande: true },
        { h: 'Chi è entrato', t: 'Come **aderente contrattuale**', grande: true }] },
{ id: 's12', tipo: 'frase', tema: 'chiaro', sopratitolo: 'Il profilo di partenza',
  testo: 'Si può lasciare in qualunque momento.<br><b class="a">Non è una gabbia.</b>' },
reg('s13', 'Una buona notizia per tutti', 2),
{ id: 's14', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Nessuna spesa · Nota informativa',
  col: [{ h: 'Spostare', t: 'La posizione **accumulata**', grande: true },
        { h: 'Spostare', t: 'I versamenti **futuri**', grande: true }] },
reg('s15', 'Ricapitolando', 9),

// 3 · tutto o solo il futuro
{ id: 's16', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Quando cambi', illu: 'domanda',
  titolo: 'Due cose<br>**diverse**', sotto: 'Sembrano simili, ma non lo sono.' },
sw('s17', 'Il salvadanaio pieno: la posizione', 'base'),
sw('s18', 'Il rubinetto: i versamenti futuri', 'base'),
sw('s19', 'Prima strada: spostare tutto', 'tutto'),
sw('s20', 'Seconda strada, in alcuni casi: solo il futuro', 'futuro'),
sw('s21', 'Quello che hai accumulato resta dov\'è', 'futuro'),
{ id: 's22', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Le modalità precise', illu: 'cartella',
  titolo: 'Regolamento<br>**multicomparto**', sotto: 'Sito del Fondo · gestione finanziaria.' },
{ id: 's23', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Prima di confermare', illu: 'lente',
  titolo: 'Leggi<br>**il riepilogo**', sotto: 'Che cosa viene spostato, e dove.' },

// 4 · quando cambiare
{ id: 's24', tipo: 'figura', tema: 'chiaro', sopratitolo: 'La domanda più importante', illu: 'orologio',
  titolo: 'Quando ha senso<br>**cambiare?**' },
mot('s25', 1, [0]),
mot('s26', 1, [1]),
mot('s27', 1, [2]),
mot('s28', 2, []),
mot('s29', 2, []),
{ id: 's30', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Cambiare per paura',
  col: [{ h: 'Vendi', t: 'Quando i prezzi **sono bassi**', grande: true },
        { h: 'Rinunci', t: '**Alla risalita**', grande: true }] },
{ id: 's31', tipo: 'linee', tema: 'chiaro', sopratitolo: 'Ricordi la lezione 6.2? Chi esce perde la risalita', fase: 'venti' },
{ id: 's32', tipo: 'frase', tema: 'chiaro', sopratitolo: 'Lo switch',
  testo: 'Serve ad adattarsi alla vita,<br><b class="a">non a inseguire i mercati.</b>' },

// 5 · gli strumenti
{ id: 's33', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Due strumenti gratuiti',
  col: [{ h: 'Il questionario', t: 'Di **autovalutazione**', grande: true },
        { h: 'La consulenza', t: 'Del **Fondo**', grande: true }] },
{ id: 's34', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Il questionario di autovalutazione', illu: 'ingranaggio',
  titolo: 'Rifallo quando<br>**cambia la tua situazione**', sotto: 'Dall\'area riservata.' },
{ id: 's35', tipo: 'figura', tema: 'chiaro', sopratitolo: 'La consulenza del Fondo', illu: 'dialogo',
  titolo: 'Si prenota<br>**dal sito**', sotto: 'Serve proprio a scegliere il profilo.' },
{ id: 's36', tipo: 'tasche', tema: 'chiaro', sopratitolo: 'Ricorda le due tasche · lezione 6.5', fase: 'due', optanti: true },
{ id: 's37', tipo: 'tasche', tema: 'chiaro', sopratitolo: 'Quando rivedi la scelta, rivedile entrambe', fase: 'profili', optanti: true, profili: { reale: 'profilo ?', fig: 'profilo ?' } },

// 6 · memo
{ id: 's38', tipo: 'frase', tema: 'profondo', sopratitolo: 'Da ricordare',
  testo: 'Si cambia per la vita,<br><b class="a">non per la borsa.</b>' },

// 7 · chiusura
{ id: 's39', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE, attive: [0] },
{ id: 's40', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE, attive: [0, 1] },
{ id: 's41', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE },
{ id: 's42', tipo: 'mossa', tema: 'chiaro', sopratitolo: 'La mossa di oggi', illu: 'schermo',
  titolo: 'Rifai il **questionario**', passi: PASSI },
{ id: 's43', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Il risultato coincide con il tuo profilo?',
  col: [{ h: 'Sì', t: 'Bene così', grande: true },
        { h: 'No', t: 'Prima una **consulenza**', grande: true }] },
{ id: 's44', tipo: 'tre', tema: 'chiaro', sopratitolo: 'Fine del Modulo 6',
  box: [{ n: '6.1', t: 'Contribuzione definita' }, { n: '6.2', t: 'Rischio e rendimento' }, { n: '6.3', t: 'Comparti e profili' }] },
{ id: 's45', tipo: 'tre', tema: 'chiaro', sopratitolo: 'E poi',
  box: [{ n: '6.4', t: 'Il Life Cycle' }, { n: '6.5', t: 'Il TFR nel 2026' }, { n: '6.6', t: 'Cambiare idea', key: true }] },
{ id: 's46', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Ora sai', illu: 'bussola',
  titolo: 'Dove vanno i tuoi soldi,<br>**e come orientarli**' },
{ id: 's47', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Prossimo modulo', illu: 'salvadanaio',
  titolo: 'I costi', sotto: 'Si trascurano spesso. E pesano molto.' },
{ id: 's48', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Modulo 7', illu: 'lente',
  titolo: 'Costi<br>**e trasparenza**' },

{ id: 's49', tipo: 'copertina', tema: 'profondo', chiusura: true, corso: CORSO, firma: FIRMA },
];
