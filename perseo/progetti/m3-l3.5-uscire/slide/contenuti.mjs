// Contenuto delle 49 scene della lezione 3.5 — Si può uscire? E chi altro può entrare.
// s02–s48 sono i blocchi 1–47 del copione, uno a uno.

const CORSO = 'Perseo Sirio senza segreti';
const FIRMA = 'Un corso CISL FP Padova Rovigo';

const SIT = [
  { n: 'CAMBI ENTE', t: 'Da un ente all\'altro, entrambi nel Fondo' },
  { n: 'LASCI LA PA', t: 'Perdi i requisiti di partecipazione' },
  { n: 'ALTRO FONDO', t: 'Resti nella PA ma vuoi spostarti' },
];

const STRADE = [
  { n: 'RISCATTI', t: 'Ti fai liquidare quanto accumulato' },
  { n: 'TRASFERISCI', t: 'A un\'altra forma pensionistica' },
  { n: 'MANTIENI', t: 'Resta nel Fondo, anche senza versamenti' },
];

const TRE_COSE = [
  'Niente **recesso** mentre lavori nella PA',
  'Sospendere fa perdere l\'**1% dell\'ente**',
  'Si possono iscrivere i **familiari a carico**',
];

const PASSI = [
  { t: 'Entra nell\'**area riservata**' },
  { t: 'Sezione **soggetti designati**' },
  { t: 'Nessuno indicato? **Fallo ora**', key: true },
];

const ter = (id, sop, at) => ({ id, tipo: 'termostato', tema: 'chiaro', sopratitolo: sop, at });
const sit = (id, k) => ({ id, tipo: 'tre', tema: 'chiaro', sopratitolo: 'Quando cambia il lavoro', box: SIT.map((b, i) => ({ ...b, key: i === k })) });
const str = (id, k) => ({ id, tipo: 'tre', tema: 'chiaro', sopratitolo: 'Se lasci la PA: tre strade', box: STRADE.map((b, i) => ({ ...b, key: i === k })) });

export const SCENE = [
{ id: 's01', tipo: 'copertina', tema: 'chiaro',
  modulo: 'Modulo 3 · Chi può aderire e come',
  titolo: 'Si può uscire?', sottotitolo: 'Lezione 3.5 · E chi altro può entrare',
  ente: `${CORSO} · ${FIRMA}` },

// 1 · apertura
{ id: 's02', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Un attimo prima di firmare', illu: 'domanda',
  titolo: 'E se poi<br>**cambio idea?**' },
{ id: 's03', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'La risposta breve',
  col: [{ h: 'Si entra', t: '**Facilmente**', grande: true },
        { h: 'Non si esce', t: '**Quando si vuole**', grande: true }] },
{ id: 's04', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Una volta dentro', illu: 'termometro',
  titolo: 'Come un **termostato**', sotto: 'Non lo spegni: lo alzi e lo abbassi.' },
{ id: 's05', tipo: 'icone', tema: 'chiaro', sopratitolo: 'In questa lezione',
  voci: [{ icona: 'occhio', t: 'Cosa non si può fare' }, { icona: 'ingranaggio', t: 'Cosa si può regolare' }, { icona: 'persone', t: 'La famiglia', key: true }] },

// 2 · niente recesso
{ id: 's06', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Il punto fermo', illu: 'scudo',
  titolo: 'Finché lavori nella PA<br>**niente recesso**' },
{ id: 's07', tipo: 'figura', tema: 'chiaro', sopratitolo: 'E nemmeno', illu: 'salvadanaio',
  titolo: 'I soldi accumulati<br>**non tornano indietro**', sotto: 'Lo dice il Fondo, nelle sue FAQ.' },
{ id: 's08', tipo: 'cifre', tema: 'chiaro', sopratitolo: 'Le eccezioni',
  voci: [{ n: '2', t: 'Solo nei primi giorni dopo l\'adesione', key: true }] },
{ id: 's09', tipo: 'confronto', tema: 'chiaro', sopratitolo: '30 giorni per ripensarci',
  col: [{ h: 'Chi aderisce su', t: '**NoiPA**', grande: true },
        { h: 'Chi entra per', t: '**Silenzio-assenso**', grande: true }] },
{ id: 's10', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Dopo i 30 giorni', illu: 'casa',
  titolo: 'La porta d\'uscita<br>**resta chiusa**', sotto: 'Anche se cambi ente, anche dopo molti anni.' },
{ id: 's11', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Perché tanta rigidità', illu: 'bussola',
  titolo: 'Un fondo pensione<br>**serve alla pensione**' },
{ id: 's12', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Un vincolo',
  col: [{ h: 'Ma anche', t: 'Una **protezione**', grande: true },
        { h: 'Contro', t: 'Spendere oggi **quello di domani**', grande: true }] },

// 3 · il termostato
{ id: 's13', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Una volta iscritto', illu: 'ingranaggio',
  titolo: 'Quattro **manopole**', sotto: 'Quasi tutte dall\'area riservata.' },
ter('s14', 'Prima manopola', 0),
{ id: 's15', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Il contributo',
  col: [{ h: 'Si cambia', t: '**Una volta** all\'anno', grande: true },
        { h: 'Parte dal', t: '**Mese successivo**', grande: true }] },
ter('s16', 'Seconda manopola', 1),
ter('s17', 'Terza manopola · modulo 6', 2),
ter('s18', 'Quarta manopola', 3),
{ id: 's19', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Attenzione', illu: 'semaforo',
  titolo: 'Se sospendi<br>**perdi l\'1% dell\'ente**', sotto: 'Spetta solo a chi versa.' },
{ id: 's20', tipo: 'tasche', tema: 'chiaro', sopratitolo: 'Il TFR figurativo continua', fase: 'due', monete: { reale: [] } },
{ id: 's21', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Se il bilancio è stretto', illu: 'bilancia',
  titolo: 'Meglio **ridurre al minimo**', sotto: 'Sospendere raramente conviene.' },
{ id: 's22', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Il contributo dell\'ente',
  col: [{ h: 'Con il minimo', t: 'Resta **acceso**', grande: true },
        { h: 'Con la sospensione', t: 'Si **spegne**', grande: true }] },

// 4 · quando cambia il lavoro
sit('s23', -1),
sit('s24', 0),
{ id: 's25', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Cambi ente o profilo', illu: 'stelle',
  titolo: 'Resti iscritto<br>**la posizione continua**' },
sit('s26', 1),
str('s27', 0),
str('s28', 1),
str('s29', 2),
sit('s30', 2),
{ id: 's31', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Passare a un altro fondo',
  col: [{ h: 'Solo dopo', t: '**3 anni** di iscrizione', grande: true },
        { h: 'E perdi', t: 'Il **contributo dell\'ente**', grande: true }] },
{ id: 's32', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Ogni caso nel dettaglio', illu: 'libro',
  titolo: 'Nel **modulo 8**', sotto: 'Tempi, costi ed esempi concreti.' },

// 5 · la famiglia
{ id: 's33', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Una porta che si apre', illu: 'generazioni',
  titolo: 'I familiari<br>**fiscalmente a carico**', sotto: 'Per esempio un figlio.' },
{ id: 's34', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Come', illu: 'contratto',
  titolo: 'Un **regolamento**<br>del Consiglio di amministrazione' },
{ id: 's35', tipo: 'cifre', tema: 'chiaro', sopratitolo: 'Quota associativa',
  voci: [{ n: '0 €', t: 'Per i familiari a carico: tutto va sulla loro posizione', key: true }] },
{ id: 's36', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Perché pensarci', illu: 'clessidra',
  titolo: 'Il **tempo**', sotto: 'Come nella lezione 1.1.' },
{ id: 's37', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Aperta da giovanissimi', illu: 'calendario',
  titolo: 'Decenni<br>**per crescere**', sotto: 'E gli anni di iscrizione contano.' },
{ id: 's38', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Una nota fiscale', illu: 'persona',
  titolo: 'Deduce<br>**chi lo ha a carico**', sotto: 'Di solito il genitore.' },
{ id: 's39', tipo: 'cifre', tema: 'chiaro', sopratitolo: 'Lo stesso tetto annuo · modulo 5',
  voci: [{ n: '5.300 €', t: 'In tutto: i tuoi versamenti e i suoi insieme', key: true }] },
{ id: 's40', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Sul sito del Fondo', illu: 'schermo',
  titolo: 'Regolamento<br>**e modulo familiari**' },

// 6 · memo
{ id: 's41', tipo: 'frase', tema: 'profondo', sopratitolo: 'Da ricordare',
  testo: 'Dal Fondo non si esce quando si vuole. <b class="a">Ma si può regolare quasi tutto.</b>' },

// 7 · chiusura
{ id: 's42', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE, attive: [0] },
{ id: 's43', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE, attive: [0, 1] },
{ id: 's44', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE },
{ id: 's45', tipo: 'mossa', tema: 'chiaro', sopratitolo: 'La mossa di oggi · se sei iscritto', illu: 'persona',
  titolo: 'Designa i **beneficiari**', passi: PASSI },
{ id: 's46', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Bastano pochi minuti', illu: 'cuore',
  titolo: 'Protegge<br>**chi ti sta vicino**' },
{ id: 's47', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Fine del Modulo 3', illu: 'stelle',
  titolo: 'Chi può aderire,<br>**come, e cosa si regola**' },
{ id: 's48', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Prossimo modulo', illu: 'salvadanaio',
  titolo: '**Quanto si versa**', sotto: 'Chi lo versa, e dove trovarlo in busta paga.' },

{ id: 's49', tipo: 'copertina', tema: 'profondo', chiusura: true, corso: CORSO, firma: FIRMA },
];
