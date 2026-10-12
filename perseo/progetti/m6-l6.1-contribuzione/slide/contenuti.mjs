// Contenuto delle 49 scene della lezione 6.1 — Contribuzione definita.
// s02–s48 sono i blocchi 1–47 del copione, uno a uno.

const CORSO = 'Perseo Sirio senza segreti';
const FIRMA = 'Un corso CISL FP Padova Rovigo';

const equ = (id, sop, k, barra) => ({ id, tipo: 'equazione', tema: 'chiaro', sopratitolo: sop, k, barra });
const par = (id, sop, n, fine) => ({ id, tipo: 'partenze', tema: 'chiaro', sopratitolo: sop, n, fine });

const PRUDENZA = [
  { n: 'LEGGE', t: 'Regole d\'investimento fissate per decreto' },
  { n: 'GARA', t: 'Gestori professionali scelti con gara' },
  { n: 'DEPOSITARIO', t: 'Patrimonio separato e custodito' },
];
const pru = (id, k) => ({ id, tipo: 'tre', tema: 'chiaro', sopratitolo: 'Le regole della prudenza', box: PRUDENZA.map((b, i) => ({ ...b, key: i === k })) });

const TRE_COSE = [
  'Versamenti **+ rendimenti − costi**',
  'Il tempo è **il primo fattore**',
  'Gestione prudente, **di lungo periodo**',
];

const PASSI = [
  { t: 'Prendi la tua **età di oggi**' },
  { t: 'Toglila da **67**' },
  { t: 'Scrivi il numero: **ti servirà**', key: true },
];

export const SCENE = [
{ id: 's01', tipo: 'copertina', tema: 'chiaro',
  modulo: 'Modulo 6 · Dove vanno i tuoi soldi',
  titolo: 'Contribuzione<br>definita', sottotitolo: 'Lezione 6.1',
  ente: `${CORSO} · ${FIRMA}` },

// 1 · apertura
{ id: 's02', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Chi pianta un albero', illu: 'clessidra',
  titolo: 'L\'ombra non arriva<br>**il primo anno**' },
{ id: 's03', tipo: 'figura', tema: 'chiaro', sopratitolo: 'E se aspetta a piantarlo', illu: 'orologio',
  titolo: 'L\'ombra arriva<br>**più tardi**', sotto: 'Gli anni persi non tornano.' },
{ id: 's04', tipo: 'frase', tema: 'chiaro', sopratitolo: 'Un fondo pensione funziona così',
  testo: 'Si semina oggi,<br><b class="a">si raccoglie tra molti anni.</b>' },
{ id: 's05', tipo: 'tre', tema: 'chiaro', sopratitolo: 'In questo modulo · la gestione finanziaria',
  box: [{ n: 'DOVE', t: 'Vanno i soldi' }, { n: 'COME', t: 'Vengono investiti' }, { n: 'QUALI SCELTE', t: 'Puoi fare tu', key: true }] },
{ id: 's06', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Partiamo da qui', illu: 'bussola',
  titolo: 'La regola di base<br>**che spiega tutto il resto**' },
{ id: 's07', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Per tutto il modulo', illu: 'campana',
  titolo: 'Informazioni generali,<br>**non consulenza finanziaria**', sotto: 'I rendimenti passati non garantiscono quelli futuri.' },

// 2 · contribuzione definita
{ id: 's08', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Il regime di Perseo Sirio', illu: 'libro',
  titolo: 'Contribuzione<br>**definita**' },
{ id: 's09', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Che cosa è definito',
  col: [{ h: 'Definito', t: '**Quanto si versa**', grande: true },
        { h: 'Non definito', t: 'Quanto si riceverà', grande: true }] },
equ('s10', 'Da che cosa dipende', 1),
equ('s11', 'Da che cosa dipende', 3),
equ('s12', 'L\'equazione della previdenza complementare', 4),
equ('s13', 'Nessun importo promesso', 4, true),
{ id: 's14', tipo: 'tre', tema: 'chiaro', sopratitolo: 'Un conto intestato a te',
  box: [{ n: 'CRESCE', t: 'Nel tempo', key: true }, { n: 'RENDITA', t: 'Alla fine' }, { n: 'CAPITALE', t: 'O le due cose insieme' }] },
{ id: 's15', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Ogni anno una proiezione', illu: 'lettera',
  titolo: 'Una stima,<br>**non una promessa**', sotto: 'La vedremo nel modulo 10.' },

// 3 · il tempo
{ id: 's16', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Il fattore che pesa di più', illu: 'clessidra',
  titolo: 'Il tempo' },
par('s17', 'Tre persone, stessa rata, stesso rendimento', 1),
par('s18', 'Cambia solo l\'età in cui cominciano', 3),
par('s19', 'A 67 anni', 3, true),
par('s20', 'A 67 anni', 3, true),
{ id: 's21', tipo: 'cifre', tema: 'chiaro', sopratitolo: 'Chi parte a 25 rispetto a chi parte a 35',
  voci: [{ n: '12.000 €', t: 'Versati in più, in dieci anni' }, { n: '53.000 €', t: 'Circa, in più alla pensione', key: true }] },
{ id: 's22', tipo: 'composto', tema: 'chiaro', sopratitolo: 'I rendimenti producono altri rendimenti', fase: 'area' },
{ id: 's23', tipo: 'frase', tema: 'chiaro', sopratitolo: 'L\'interesse composto · modulo 1',
  testo: 'All\'inizio quasi invisibile,<br><b class="a">alla fine decisivo.</b>' },

// 4 · le regole della prudenza
{ id: 's24', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Investire', illu: 'semaforo',
  titolo: 'Non significa<br>**giocare in borsa**' },
{ id: 's25', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Lo dice il Fondo',
  col: [{ h: 'Non è', t: 'Speculazione', grande: true },
        { h: 'È', t: '**Accumulo previdenziale**', grande: true }] },
pru('s26', 0),
pru('s27', 1),
pru('s28', 2),
{ id: 's29', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Una gestione', illu: 'calendario',
  titolo: 'Pensata per<br>**il lungo periodo**', sotto: 'Dieci, venti, trent\'anni.' },
{ id: 's30', tipo: 'frase', tema: 'chiaro', sopratitolo: 'Un anno positivo o negativo',
  testo: 'Conta meno<br><b class="a">della direzione del percorso.</b>' },

// 5 · i numeri, con prudenza
{ id: 's31', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Qualche numero', illu: 'lente',
  titolo: 'Con prudenza,<br>**e con la fonte**' },
{ id: 's32', tipo: 'barre', tema: 'chiaro', sopratitolo: 'COVIP · dieci anni, 2015–2025', k: 1 },
{ id: 's33', tipo: 'barre', tema: 'chiaro', sopratitolo: 'COVIP · dieci anni, 2015–2025', k: 2 },
{ id: 's34', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Attenzione', illu: 'campana',
  titolo: 'Medie di sistema,<br>**non di Perseo Sirio**', sotto: 'I rendimenti passati non garantiscono quelli futuri.' },
{ id: 's35', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Un po\' di oscillazione',
  col: [{ h: 'Orizzonti lunghi', t: '**È stata premiata**', grande: true },
        { h: 'Orizzonti brevi', t: 'Può non esserlo', grande: true }] },
{ id: 's36', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Pochi anni davanti?', illu: 'clessidra',
  titolo: 'Meno tempo per recuperare<br>**un anno storto**' },
{ id: 's37', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Nelle prossime lezioni', illu: 'bussola',
  titolo: 'Gli anni alla pensione:<br>**la bussola delle scelte**' },

// 6 · memo
{ id: 's38', tipo: 'frase', tema: 'profondo', sopratitolo: 'Da ricordare',
  testo: 'Si conosce quanto versi.<br><b class="a">Quanto riceverai,<br>lo costruisce il tempo.</b>' },

// 7 · chiusura
{ id: 's39', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE, attive: [0] },
{ id: 's40', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE, attive: [0, 1] },
{ id: 's41', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE },
{ id: 's42', tipo: 'mossa', tema: 'chiaro', sopratitolo: 'La mossa di oggi', illu: 'calendario',
  titolo: 'Quanti anni<br>**alla pensione?**', passi: PASSI },
{ id: 's43', tipo: 'conto', tema: 'chiaro', sopratitolo: 'Un esempio',
  voci: [{ v: '67', lb: 'pensione di vecchiaia' }, { v: '45', lb: 'età di oggi' }, { v: '22', lb: 'anni che mancano' }], op: ['−', '='] },
{ id: 's44', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Scrivilo', illu: 'cartella',
  titolo: 'Il numero più importante<br>**di questo modulo**' },
{ id: 's45', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Quel numero',
  col: [{ h: 'Se è grande', t: 'Il tempo è **dalla tua parte**', grande: true },
        { h: 'Se è piccolo', t: '**Più attenzione** al rischio', grande: true }] },
{ id: 's46', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Nessun profilo consigliato', illu: 'bilancia',
  titolo: 'Ti diamo i criteri,<br>**la scelta è tua**' },
{ id: 's47', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Prossima lezione', illu: 'semaforo',
  titolo: 'Rischio<br>**e rendimento**' },
{ id: 's48', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Ci vediamo nella lezione 6.2', illu: 'scudo',
  titolo: 'Il rischio si capisce,<br>**la paura non consiglia**' },

{ id: 's49', tipo: 'copertina', tema: 'profondo', chiusura: true, corso: CORSO, firma: FIRMA },
];
