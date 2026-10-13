// Contenuto delle 49 scene della lezione 9.2 — Capitale o rendita?
// s02–s48 sono i blocchi 1–47 del copione, uno a uno.

const CORSO = 'Perseo Sirio senza segreti';
const FIRMA = 'Un corso CISL FP Padova Rovigo';

const sec = (id, sop, fase) => ({ id, tipo: 'secchio', tema: 'chiaro', sopratitolo: sop, fase });

const RIGHE = [
  ['**Disponibile subito**', '**Per tutta la vita**'],
  ['Utile per spese o debiti', 'Protegge se vivi a lungo'],
  ['Va gestito da te', 'Nessuna scelta ogni anno'],
];
const pro = (id, k, chiave, sop = 'Pro e contro') => ({ id, tipo: 'tabella', tema: 'chiaro', sopratitolo: sop,
  intestazioni: ['Capitale', 'Rendita'], colonne: ['50%', '50%'], righe: RIGHE.slice(0, k), chiave });

const TRE_COSE = [
  'Al massimo il **50%** in capitale',
  'Posizione piccola: **tutto in capitale**',
  'La rendita protegge dalla **longevità**',
];

const PASSI = [
  { t: 'Sito del Fondo, pagina della **rendita**' },
  { t: 'L\'ultimo **valore della posizione**' },
  { t: 'Leggi la rendita **in euro al mese**', key: true },
];

export const SCENE = [
{ id: 's01', tipo: 'copertina', tema: 'chiaro',
  modulo: 'Modulo 9 · Al pensionamento',
  titolo: 'Capitale o rendita?', sottotitolo: 'Lezione 9.2',
  ente: `${CORSO} · ${FIRMA}` },

// 1 · apertura
{ id: 's02', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Per il resto della tua vita',
  col: [{ h: 'Un secchio', t: 'd\'acqua', grande: true },
        { h: 'O una fontana?', t: '**Che scorre sempre**', grande: true }] },
{ id: 's03', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Il secchio', illu: 'acqua',
  titolo: 'Tutto subito,<br>**finché dura**' },
{ id: 's04', tipo: 'figura', tema: 'chiaro', sopratitolo: 'La fontana', illu: 'clessidra',
  titolo: 'Poco alla volta,<br>**per sempre**' },
{ id: 's05', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Al pensionamento', illu: 'salvadanaio',
  titolo: 'Un capitale:<br>**una somma unica**' },
{ id: 's06', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Oppure',
  col: [{ h: 'Una rendita', t: 'Un assegno a vita', grande: true },
        { h: 'Più spesso', t: '**Un po\' di entrambe**', grande: true }] },
{ id: 's07', tipo: 'tre', tema: 'chiaro', sopratitolo: 'In questa lezione',
  box: [{ n: 'QUANTO', t: 'Puoi prendere subito' }, { n: 'QUANDO', t: 'Puoi prendere tutto' }, { n: 'COME', t: 'Scegliere', key: true }] },

// 2 · la regola del 50%
{ id: 's08', tipo: 'figura', tema: 'chiaro', sopratitolo: 'La regola generale', illu: 'bilancia',
  titolo: 'Vale per la<br>**grande maggioranza**' },
sec('s09', 'Al pensionamento: fino a metà in capitale', 'meta'),
sec('s10', 'Il resto diventa rendita vitalizia', 'meta'),
sec('s11', 'Meno capitale, più rendita', 'destra'),
sec('s12', 'Anche tutta in rendita', 'rendita'),
sec('s13', 'Ma oltre la metà, no', 'blocco'),
{ id: 's14', tipo: 'frase', tema: 'chiaro', sopratitolo: 'Perché',
  testo: 'Integrare il reddito per tutta la vecchiaia,<br><b class="a">non solo i primi anni.</b>' },
{ id: 's15', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'La differenza',
  col: [{ h: 'Un risparmio', t: 'Si prende e si spende', grande: true },
        { h: 'Una pensione', t: '**Dura quanto la vita**', grande: true }] },

// 3 · l'eccezione
{ id: 's16', tipo: 'figura', tema: 'chiaro', sopratitolo: 'L\'eccezione', illu: 'lente',
  titolo: 'Per le posizioni<br>**piccole**', sotto: 'Per esempio chi ha aderito tardi.' },
{ id: 's17', tipo: 'frase', tema: 'chiaro', sopratitolo: 'La condizione',
  testo: 'Rendita di metà posizione<br><b class="a">sotto metà dell\'assegno sociale</b>' },
sec('s18', 'Allora: tutto in capitale, senza penalizzazioni fiscali', 'tutto'),
{ id: 's19', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Ha senso', illu: 'euro',
  titolo: 'Una rendita<br>**di pochi euro**', sotto: 'Non cambierebbe la vita a nessuno.' },
{ id: 's20', tipo: 'cifre', tema: 'chiaro', sopratitolo: 'Assegno sociale 2026 · 546,24 € × 13',
  voci: [{ n: '7.101 €', t: 'L\'anno' }] },
{ id: 's21', tipo: 'cifre', tema: 'chiaro', sopratitolo: 'La soglia',
  voci: [{ n: '7.101 €', t: 'Assegno sociale' }, { n: '≈ 3.550 €', t: 'La metà, l\'anno', key: true }] },
{ id: 's22', tipo: 'cifre', tema: 'chiaro', sopratitolo: 'In altre parole',
  voci: [{ n: '≈ 300 €', t: 'Al mese: sotto questa rendita, tutto subito', key: true }] },
{ id: 's23', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Quanto capitale serve? Dipende',
  col: [{ h: 'Dall\'età', t: 'Al pensionamento', grande: true },
        { h: 'Dai coefficienti', t: '**Della compagnia**', grande: true }] },
{ id: 's24', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Senza fare i conti a mano', illu: 'schermo',
  titolo: 'Il simulatore<br>**del Fondo**' },

// 4 · come scegliere
{ id: 's25', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Sopra la soglia, la scelta è tua', illu: 'bussola',
  titolo: 'Secchio<br>**o fontana?**' },
{ id: 's26', tipo: 'tre', tema: 'chiaro', sopratitolo: 'Il capitale è utile per',
  box: [{ n: 'UN MUTUO', t: 'Da chiudere' }, { n: 'UNA CASA', t: 'Da sistemare' }, { n: 'UN AIUTO', t: 'Ai figli' }] },
pro('s27', 3, [0, 2]),
pro('s28', 3, [1]),
{ id: 's29', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Il rischio sottovalutato', illu: 'clessidra',
  titolo: 'Vivere più a lungo<br>**dei propri risparmi**' },
{ id: 's30', tipo: 'tre', tema: 'chiaro', sopratitolo: 'La rendita',
  box: [{ n: 'ARRIVA', t: 'Ogni mese' }, { n: 'DURA', t: 'Finché vivi' }, { n: 'SI RIVALUTA', t: 'Ogni anno', key: true }] },
sec('s31', 'Molti scelgono una combinazione', 'destra'),
{ id: 's32', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Lo scopo di tutti quegli anni', illu: 'pilastri',
  titolo: 'Un\'integrazione<br>**della pensione pubblica**' },

// 5 · le tasse
{ id: 's33', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Somme maturate dal 2018',
  col: [{ h: 'Capitale', t: 'La stessa scala', grande: true },
        { h: 'Rendita', t: '**La stessa scala**', grande: true }] },
{ id: 's34', tipo: 'scala', tema: 'chiaro', sopratitolo: 'Dal 15% al 9%, in base agli anni di partecipazione', a: 35 },
{ id: 's35', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Le parti più vecchie · lezione 5.5', illu: 'libro',
  titolo: 'Le regole<br>**degli strati**' },
{ id: 's36', tipo: 'cifre', tema: 'chiaro', sopratitolo: 'Rendita in pagamento: le rivalutazioni annuali',
  voci: [{ n: '26%', t: 'Tassazione', key: true }] },

// 6 · memo
{ id: 's37', tipo: 'frase', tema: 'profondo', sopratitolo: 'Da ricordare',
  testo: 'Il secchio finisce.<br><b class="a">La fontana no.</b>' },

// 7 · chiusura
{ id: 's38', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE, attive: [0] },
sec('s39', 'Il resto è rendita vitalizia, anche tutta', 'meta'),
{ id: 's40', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE, attive: [0, 1] },
{ id: 's41', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE },
{ id: 's42', tipo: 'mossa', tema: 'chiaro', sopratitolo: 'La mossa di oggi', illu: 'schermo',
  titolo: 'Prova il **simulatore della rendita**', passi: PASSI },
{ id: 's43', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Il punto di partenza', illu: 'lettera',
  titolo: 'Area riservata<br>**o prospetto annuale**' },
{ id: 's44', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Un numero concreto', illu: 'euro',
  titolo: 'La tua rendita,<br>**in euro al mese**' },
{ id: 's45', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Prossima lezione', illu: 'acqua',
  titolo: 'Le rendite<br>**non sono tutte uguali**' },
{ id: 's46', tipo: 'tre', tema: 'chiaro', sopratitolo: 'Cinque tipi, esigenze diverse',
  box: [{ n: 'CHI', t: 'Vive solo' }, { n: 'CHI', t: 'Vive in coppia' }, { n: 'CHI', t: 'Teme di perdere l\'autosufficienza' }] },
{ id: 's47', tipo: 'tre', tema: 'chiaro', sopratitolo: 'Vedremo',
  box: [{ n: 'COME', t: 'Funzionano' }, { n: 'QUANTO', t: 'Cambia l\'assegno' }, { n: 'QUALE', t: 'Scegliere', key: true }] },
{ id: 's48', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Ci vediamo nella lezione 9.3', illu: 'generazioni',
  titolo: 'Le cinque<br>**rendite**' },

{ id: 's49', tipo: 'copertina', tema: 'profondo', chiusura: true, corso: CORSO, firma: FIRMA },
];
