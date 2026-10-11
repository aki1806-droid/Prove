// Contenuto delle 49 scene della lezione 4.1 — La ricetta del conto.
// s02–s48 sono i blocchi 1–47 del copione, uno a uno.

const CORSO = 'Perseo Sirio senza segreti';
const FIRMA = 'Un corso CISL FP Padova Rovigo';

const RIGHE = [
  ['Tuo contributo', '1%', '300 €'],
  ['Contributo dell\'ente', '1%', '300 €'],
  ['TFR', '6,91%', '2.073 €'],
  ['**Totale verso la pensione**', '', '**2.673 €**'],
];
const tab = (id, k, chiave) => ({ id, tipo: 'tabella', tema: 'chiaro', sopratitolo: 'Esempio semplificato · 30.000 € l\'anno',
  intestazioni: ['', 'Quota', 'All\'anno'], colonne: ['50%', '20%', '30%'], righe: RIGHE.slice(0, k), chiave });

const TRE_COSE = [
  'Tuo **1%** + ente **1%** + **TFR**',
  'Base: retribuzione **utile al TFR**',
  'Soldi **veri** e soldi **figurativi**',
];

const PASSI = [
  { t: 'Prendi la tua **retribuzione lorda** annua' },
  { t: 'Calcola l\'**1%**' },
  { t: 'Dividi per **12**: il costo al mese', key: true },
];

const ing = (id, sop, at, n = 3, base = false) => ({ id, tipo: 'ingressi', tema: 'chiaro', sopratitolo: sop, at, n, base });
const bil = (id, sop, fase) => ({ id, tipo: 'bilancia', tema: 'chiaro', sopratitolo: sop, fase });

export const SCENE = [
{ id: 's01', tipo: 'copertina', tema: 'chiaro',
  modulo: 'Modulo 4 · Quanto si versa',
  titolo: 'La ricetta<br>del conto', sottotitolo: 'Lezione 4.1',
  ente: `${CORSO} · ${FIRMA}` },

// 1 · apertura
{ id: 's02', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Ogni buona ricetta', illu: 'libro',
  titolo: 'Pochi ingredienti,<br>**giuste dosi**' },
{ id: 's03', tipo: 'icone', tema: 'chiaro', sopratitolo: 'Nei moduli precedenti',
  voci: [{ icona: 'domanda', t: 'Perché esiste il Fondo' }, { icona: 'persone', t: 'Chi può aderire' }, { icona: 'cartella', t: 'Cosa succede alla liquidazione' }] },
{ id: 's04', tipo: 'icone', tema: 'chiaro', sopratitolo: 'Ora i numeri',
  voci: [{ icona: 'euro', t: 'Che cosa entra' }, { icona: 'persona', t: 'Chi lo mette' }, { icona: 'bilancia', t: 'Su quale base', key: true }] },
{ id: 's05', tipo: 'cifre', tema: 'chiaro', sopratitolo: 'L\'esempio di tutto il modulo',
  voci: [{ n: '30.000 €', t: 'Retribuzione utile all\'anno · esempio semplificato', key: true }] },

// 2 · tre ingressi, più uno
ing('s06', 'Il salvadanaio a tre ingressi', 9),
ing('s07', 'Primo ingresso: il tuo contributo', 0),
ing('s08', 'Secondo ingresso: l\'ente', 1),
ing('s09', 'Terzo ingresso: il TFR', 2),
ing('s10', 'Un quarto ingresso, più piccolo', 3, 4),
{ id: 's11', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'L\'accantonamento aggiuntivo',
  col: [{ h: 'Solo per', t: 'In servizio al **2000**, optanti', grande: true },
        { h: 'Vale', t: '**+1,5%**', grande: true }] },
ing('s12', 'Tre ingressi, più uno', 9, 4, true),
{ id: 's13', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'La retribuzione utile al TFR',
  col: [{ h: 'Dentro', t: 'Le voci **fisse e continuative**', grande: true },
        { h: 'Di solito fuori', t: 'Straordinari, **premi occasionali**', grande: true }] },

// 3 · due tasche
{ id: 's14', tipo: 'tasche', tema: 'chiaro', sopratitolo: 'Gli ingredienti nelle due tasche', fase: 'due', optanti: true },
{ id: 's15', tipo: 'tasche', tema: 'chiaro', sopratitolo: 'Soldi veri, ogni mese', fase: 'reale' },
{ id: 's16', tipo: 'cifre', tema: 'chiaro', sopratitolo: 'L\'ente versa al Fondo',
  voci: [{ n: 'entro il 15', t: 'Del mese successivo. Poi si investono.', key: true }] },
{ id: 's17', tipo: 'tasche', tema: 'chiaro', sopratitolo: 'TFR e 1,5% restano all\'INPS', fase: 'due', optanti: true },
{ id: 's18', tipo: 'tasche', tema: 'chiaro', sopratitolo: 'Al Fondo quando il lavoro finisce', fase: 'unione', optanti: true },
{ id: 's19', tipo: 'tre', tema: 'chiaro', sopratitolo: 'In sintesi',
  box: [{ n: '4', t: 'Ingredienti' }, { n: '2', t: 'Tasche' }, { n: '1', t: 'Posizione, intestata a te', key: true }] },

// 4 · un esempio
{ id: 's20', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Un esempio', illu: 'persona',
  titolo: 'Assunto dopo il 2000<br>**30.000 € l\'anno**' },
{ id: 's21', tipo: 'conto', tema: 'chiaro', sopratitolo: 'Il suo 1%',
  voci: [{ v: '300 €', lb: 'all\'anno' }, { v: '12', lb: 'mesi' }, { v: '25 €', lb: 'al mese' }], op: ['÷', '='] },
tab('s22', 2, [1]),
tab('s23', 3, [2]),
tab('s24', 4, [3]),
{ id: 's25', tipo: 'cifre', tema: 'chiaro', sopratitolo: 'Dalla sua busta paga',
  voci: [{ n: '25 €', t: 'Al mese. Il resto non esce dal suo stipendio.', key: true }] },
{ id: 's26', tipo: 'figura', tema: 'chiaro', sopratitolo: 'E anche su quelli', illu: 'salvadanaio',
  titolo: 'Risparmia<br>**una parte di tasse**', sotto: 'Lo vedremo nel modulo 5.' },
{ id: 's27', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Esempio semplificato', illu: 'lente',
  titolo: 'Importi lordi<br>**e arrotondati**', sotto: 'Per capire le proporzioni.' },

// 5 · leggere bene l'esempio
bil('s28', 'Mettiamo i pezzi su una bilancia', 'una'),
bil('s29', 'Mettiamo i pezzi su una bilancia', 'tutte'),
bil('s30', 'Attenzione', 'nota'),
{ id: 's31', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Aderendo, il TFR cambia strada',
  col: [{ h: 'Da', t: '**Liquidazione**', grande: true },
        { h: 'A', t: '**Pensione** complementare', grande: true }] },
{ id: 's32', tipo: 'cifre', tema: 'chiaro', sopratitolo: 'Il vero ingresso in più',
  voci: [{ n: '+300 €', t: 'L\'1% dell\'ente, ogni anno, nel nostro esempio', key: true }] },
{ id: 's33', tipo: 'figura', tema: 'chiaro', sopratitolo: 'In servizio al 2000', illu: 'stelle',
  titolo: 'E l\'**1,5%**<br>aggiuntivo' },
{ id: 's34', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Il modo più onesto', illu: 'bilancia',
  titolo: 'Tenere distinti<br>**i pezzi**', sotto: 'Senza esagerare, senza ignorare.' },

// 6 · un minimo, non un tetto
{ id: 's35', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Il tuo 1%',
  col: [{ h: 'È', t: 'Un **minimo**', grande: true },
        { h: 'Non è', t: 'Un **tetto**', grande: true }] },
{ id: 's36', tipo: 'icone', tema: 'chiaro', sopratitolo: 'Puoi versare di più',
  voci: [{ icona: 'euro', t: 'In percentuale o in cifra fissa' }, { icona: 'orologio', t: 'Cambi una volta l\'anno', key: true }] },
{ id: 's37', tipo: 'figura', tema: 'chiaro', sopratitolo: 'L\'ente invece', illu: 'pilastri',
  titolo: 'Resta fermo<br>**all\'1%**' },
{ id: 's38', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Chi versa di più',
  col: [{ h: 'Aumenta', t: 'La sua parte e i **vantaggi fiscali**', grande: true },
        { h: 'Non aumenta', t: 'Il **contributo dell\'ente**', grande: true }] },
{ id: 's39', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Prossimi passi', illu: 'calendario',
  titolo: 'Lezione 4.4: **versare di più**', sotto: 'Prima: quando sei stato assunto.' },

// 7 · memo
{ id: 's40', tipo: 'frase', tema: 'profondo', sopratitolo: 'Da ricordare',
  testo: 'Il TFR è già tuo. <b class="a">L\'1% dell\'ente arriva solo se aderisci.</b>' },

// 8 · chiusura
{ id: 's41', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE, attive: [0] },
ing('s42', 'Più l\'1,5% per gli optanti', 3, 4),
{ id: 's43', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE, attive: [0, 1] },
{ id: 's44', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE },
{ id: 's45', tipo: 'mossa', tema: 'chiaro', sopratitolo: 'La mossa di oggi', illu: 'calendario',
  titolo: 'Calcola **il tuo 1%**', passi: PASSI },
{ id: 's46', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Al mese, prima delle tasse', illu: 'salvadanaio',
  titolo: 'Il costo<br>**dell\'adesione minima**' },
{ id: 's47', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Se hai già aderito', illu: 'lente',
  titolo: 'Confronta<br>**con il cedolino**', sotto: 'Dove trovarlo: lezione 4.5.' },
{ id: 's48', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Prossima lezione', illu: 'generazioni',
  titolo: 'Prima e dopo<br>**il 2001**', sotto: 'Stessa scelta, due ricette.' },

{ id: 's49', tipo: 'copertina', tema: 'profondo', chiusura: true, corso: CORSO, firma: FIRMA },
];
