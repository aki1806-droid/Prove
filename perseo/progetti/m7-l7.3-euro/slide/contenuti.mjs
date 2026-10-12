// Contenuto delle 49 scene della lezione 7.3 — Lo 0,5% che vale migliaia di euro.
// s02–s48 sono i blocchi 1–47 del copione, uno a uno.

const CORSO = 'Perseo Sirio senza segreti';
const FIRMA = 'Un corso CISL FP Padova Rovigo';

const MEDIE = [
  { n: 'FONDI NEGOZIALI', t: '0,47%', d: 'come Perseo Sirio' },
  { n: 'FONDI APERTI', t: '1,36%', d: 'quasi il triplo' },
  { n: 'PIP', t: '2,17%', d: 'più di quattro volte' },
];
const med = (id, sop, k) => ({ id, tipo: 'tre', tema: 'chiaro', cifre: true, sopratitolo: sop, box: MEDIE.map((b, i) => ({ ...b, key: k === 9 || i === k })) });
const cur = (id, sop, fase) => ({ id, tipo: 'costi', tema: 'chiaro', sopratitolo: sop, fase });

const TRE_COSE = [
  'ISC medio: **0,47% · 1,36% · 2,17%**',
  'In 30 anni: **decine di migliaia di euro**',
  'A parità di rischio, **conta il costo**',
];

const PASSI = [
  { t: 'Hai un PIP o un fondo aperto?' },
  { t: 'Cerca il suo **ISC a 10 anni**' },
  { t: 'Confrontalo con **Perseo Sirio**', key: true },
];

export const SCENE = [
{ id: 's01', tipo: 'copertina', tema: 'chiaro',
  modulo: 'Modulo 7 · Costi e trasparenza',
  titolo: 'Lo 0,5% che vale<br>migliaia di euro', sottotitolo: 'Lezione 7.3',
  ente: `${CORSO} · ${FIRMA}` },

// 1 · apertura
{ id: 's02', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Una goccia al minuto', illu: 'flebo',
  titolo: 'Sembra<br>**niente**' },
{ id: 's03', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Dopo un mese', illu: 'clessidra',
  titolo: 'La tanica<br>**è mezza vuota**', sotto: 'Nessun disastro: solo gocce.' },
{ id: 's04', tipo: 'frase', tema: 'chiaro', sopratitolo: 'I costi di un fondo pensione',
  testo: 'Piccoli, regolari, silenziosi.<br><b class="a">Facili da ignorare.</b>' },
{ id: 's05', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Dalla lezione 7.2 a oggi',
  col: [{ h: 'Ieri', t: 'In percentuale', grande: true },
        { h: 'Oggi', t: '**In euro**', grande: true }] },
{ id: 's06', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Dati ufficiali COVIP', illu: 'libro',
  titolo: 'Esempi semplificati,<br>**non previsioni**' },

// 2 · le medie del sistema
{ id: 's07', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Le medie del sistema', illu: 'pilastri',
  titolo: 'Quanto costano<br>**le forme pensionistiche**', sotto: 'Dati pubblici.' },
med('s08', 'ISC medio a 10 anni · Relazione COVIP 2025 (giugno 2026)', -1),
med('s09', 'ISC medio a 10 anni', 0),
med('s10', 'ISC medio a 10 anni', 1),
med('s11', 'ISC medio a 10 anni', 2),
{ id: 's12', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Da dove viene la differenza? · COVIP', illu: 'persona',
  titolo: 'Nei PIP pesano<br>**le reti di vendita**' },
{ id: 's13', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Fondi negoziali',
  col: [{ h: 'Niente', t: '**Scopo di lucro**', grande: true },
        { h: 'Niente', t: '**Venditori a provvigione**', grande: true }] },

// 3 · la simulazione
{ id: 's14', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Una simulazione semplice', illu: 'ingranaggio',
  titolo: 'Tre persone,<br>**trent\'anni**' },
{ id: 's15', tipo: 'cifre', tema: 'chiaro', sopratitolo: 'Stessi versamenti · 2.000 € l\'anno per 30 anni',
  voci: [{ n: '60.000 €', t: 'Versati da ciascuno', key: true }] },
{ id: 's16', tipo: 'cifre', tema: 'chiaro', sopratitolo: 'Stesso rendimento lordo ipotetico',
  voci: [{ n: '4%', t: 'L\'anno, per tutti e tre', key: true }] },
med('s17', 'Cambia solo il costo annuo', 9),
cur('s18', 'Stessi versamenti, tre risultati', 'curve'),
cur('s19', 'Con il tempo, le curve si separano', 'curve'),
cur('s20', 'Fondi negoziali: circa 107.000 €', 'esiti'),
cur('s21', 'Fondi aperti: circa 92.000 €', 'esiti'),
cur('s22', 'PIP: circa 80.000 €', 'esiti'),
cur('s23', 'A parità di soldi versati', 'area'),
{ id: 's24', tipo: 'frase', tema: 'chiaro', sopratitolo: 'Nessun crollo di borsa',
  testo: 'Se ne sono andati goccia dopo goccia,<br><b class="a">in costi.</b>' },

// 4 · onestà sui numeri
{ id: 's25', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Onestà sui numeri', illu: 'bilancia',
  titolo: 'Due<br>**precisazioni**' },
{ id: 's26', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Prima precisazione',
  col: [{ h: 'I costi', t: 'Non sono tutto', grande: true },
        { h: 'Conta anche', t: '**Il rischio scelto**', grande: true }] },
{ id: 's27', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Più azioni, in un anno buono', illu: 'stelle',
  titolo: 'Può rendere di più<br>**anche se costa di più**' },
{ id: 's28', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Seconda precisazione · COVIP', illu: 'lente',
  titolo: 'A parità di azioni,<br>**i negoziali fanno meglio**', sotto: 'In media.' },
med('s29', 'In media sopra fondi aperti e PIP', 0),
{ id: 's30', tipo: 'frase', tema: 'chiaro', sopratitolo: 'Con lo stesso rischio',
  testo: 'I costi più bassi<br><b class="a">si vedono nel risultato.</b>' },
{ id: 's31', tipo: 'cifre', tema: 'chiaro', sopratitolo: 'E per un dipendente pubblico · modulo 1',
  voci: [{ n: '+1%', t: 'Dell\'ente: nessun prodotto individuale lo offre', key: true }] },

// 5 · l'unica certezza
{ id: 's32', tipo: 'figura', tema: 'chiaro', sopratitolo: 'I mercati', illu: 'domanda',
  titolo: 'Non li puoi<br>**controllare**' },
{ id: 's33', tipo: 'figura', tema: 'chiaro', sopratitolo: 'I costi', illu: 'cartella',
  titolo: 'Li conosci<br>**in anticipo**', sotto: 'Nota informativa e ISC.' },
{ id: 's34', tipo: 'frase', tema: 'chiaro', sopratitolo: 'L\'unica variabile',
  testo: 'Che dipende interamente<br><b class="a">da una tua decisione.</b>' },
{ id: 's35', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Per tanti anni', illu: 'clessidra',
  titolo: 'Vale la pena<br>**guardarla bene**' },
{ id: 's36', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Chiudere il foro', illu: 'scudo',
  titolo: 'Scegliere<br>**il contenitore giusto**' },

// 6 · memo
{ id: 's37', tipo: 'frase', tema: 'profondo', sopratitolo: 'Da ricordare',
  testo: 'Il rendimento è un\'ipotesi.<br><b class="a">Il costo è una certezza.</b>' },

// 7 · chiusura
{ id: 's38', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE, attive: [0] },
med('s39', 'ISC medio a 10 anni · COVIP', 9),
{ id: 's40', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE, attive: [0, 1] },
{ id: 's41', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE },
{ id: 's42', tipo: 'mossa', tema: 'chiaro', sopratitolo: 'La mossa di oggi', illu: 'lente',
  titolo: 'Chiedi l\'ISC **di ogni proposta**', passi: PASSI },
{ id: 's43', tipo: 'frase', tema: 'chiaro', sopratitolo: 'Una proposta nuova?',
  testo: 'La stessa domanda,<br><b class="a">prima di firmare.</b>' },
{ id: 's44', tipo: 'tre', tema: 'chiaro', sopratitolo: 'Fine del Modulo 7',
  box: [{ n: '7.1', t: 'Quanto costa davvero' }, { n: '7.2', t: 'L\'ISC' }, { n: '7.3', t: 'I costi in euro', key: true }] },
{ id: 's45', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Perseo Sirio: molto sotto le medie di aperti e PIP',
  col: [{ h: 'Niente', t: '**Scopo di lucro**', grande: true },
        { h: 'Niente', t: '**Reti di vendita**', grande: true }] },
{ id: 's46', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Prossimo modulo', illu: 'calendario',
  titolo: 'Prima<br>**della pensione**' },
{ id: 's47', tipo: 'tre', tema: 'chiaro', sopratitolo: 'Modulo 8',
  box: [{ n: 'ANTICIPAZIONI', t: 'E riscatti' }, { n: 'TRASFERIMENTI', t: 'Quando servono' }, { n: 'RITA', t: 'Come si chiede', key: true }] },
{ id: 's48', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Ci vediamo nel modulo 8', illu: 'bussola',
  titolo: 'Prima<br>**della pensione**' },

{ id: 's49', tipo: 'copertina', tema: 'profondo', chiusura: true, corso: CORSO, firma: FIRMA },
];
