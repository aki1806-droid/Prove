// Contenuto delle 49 scene della lezione 5.1 — Deducibilità: lo sconto in busta paga.
// s02–s48 sono i blocchi 1–47 del copione, uno a uno.

const CORSO = 'Perseo Sirio senza segreti';
const FIRMA = 'Un corso CISL FP Padova Rovigo';
const SEMPL = 'Esempio semplificato, senza addizionali';

const col = (id, sop, fase) => ({ id, tipo: 'colonna', tema: 'chiaro', sopratitolo: sop, fase });

const RIGHE = [
  ['600 € (1% + 1% su 30.000 €)', '138 €', '198 €', '258 €'],
  ['1.200 € (3% + 1% su 30.000 €)', '276 €', '396 €', '516 €'],
];
const tab = (id, k, chiave) => ({ id, tipo: 'tabella', tema: 'chiaro', sopratitolo: `IRPEF risparmiata in un anno · ${SEMPL}`,
  intestazioni: ['Contributi dedotti (tuo + ente)', '23%', '33%', '43%'], colonne: ['40%', '20%', '20%', '20%'], righe: RIGHE.slice(0, k), chiave });

const TRE_COSE = [
  'Contributi **tolti dall\'imponibile**',
  'Limite: **5.300 € l\'anno**',
  'Lo applica **l\'ente in busta paga**',
];

const PASSI = [
  { t: 'Prendi l\'ultima **Certificazione Unica**' },
  { t: 'Trova il **reddito imponibile**' },
  { t: 'Individua il tuo **scaglione**', key: true },
];

export const SCENE = [
{ id: 's01', tipo: 'copertina', tema: 'chiaro',
  modulo: 'Modulo 5 · Il fisco: dove si guadagna davvero',
  titolo: 'Deducibilità:<br>lo sconto in busta paga', sottotitolo: 'Lezione 5.1 · Informazioni generali, non consulenza fiscale',
  ente: `${CORSO} · ${FIRMA}` },

// 1 · apertura
{ id: 's02', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Il tuo stipendio lordo', illu: 'mani',
  titolo: 'Una torta,<br>**e lo Stato ne prende una fetta**' },
col('s03', 'Una fetta su un piatto a parte, prima dell\'IRPEF', 'dedotta'),
{ id: 's04', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Si chiama', illu: 'salvadanaio',
  titolo: 'Deducibilità', sotto: 'Una delle ragioni per cui aderire conviene davvero.' },
{ id: 's05', tipo: 'tre', tema: 'chiaro', sopratitolo: 'Tre vantaggi fiscali',
  box: [{ n: '5.1', t: 'La deduzione dei contributi', key: true }, { n: '5.2', t: 'Rendimenti tassati meno' }, { n: '5.3', t: 'Prestazioni dal 15% al 9%' }] },
{ id: 's06', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Una premessa', illu: 'campana',
  titolo: 'Informazioni generali,<br>**non consulenza fiscale**', sotto: SEMPL + '.' },

// 2 · dedurre
{ id: 's07', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Dedurre', illu: 'libro',
  titolo: 'Sottrarre dal reddito<br>**prima di calcolare le imposte**' },
col('s08', 'Senza deduzione', 'intera'),
col('s09', 'Con la deduzione', 'dedotta'),
col('s10', 'Prima togli, poi si tassa', 'due'),
{ id: 's11', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Prima togli, poi si tassa',
  col: [{ h: 'Non è', t: 'Un rimborso che arriva dopo', grande: true },
        { h: 'È', t: '**Un\'imposta che non paghi**', grande: true }] },
{ id: 's12', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Una particolarità', illu: 'lente',
  titolo: 'Nel conto entra<br>**anche il contributo dell\'ente**' },
{ id: 's13', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'L\'1% dell\'ente',
  col: [{ h: 'Al Fondo', t: '**Senza IRPEF**', grande: true },
        { h: 'Se fosse in busta paga', t: 'Ci pagheresti l\'IRPEF', grande: true }] },
{ id: 's14', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Nel calcolo della deduzione',
  col: [{ h: 'Si contano', t: '**Contributo tuo + ente**', grande: true },
        { h: 'Non si contano', t: 'TFR e +1,5%', grande: true }] },

// 3 · il limite
{ id: 's15', tipo: 'cifre', tema: 'chiaro', sopratitolo: 'Il limite dal 2026',
  voci: [{ n: '5.300 €', t: 'L\'anno, tuoi contributi + quelli dell\'ente', key: true }] },
{ id: 's16', tipo: 'tre', tema: 'chiaro', sopratitolo: 'Come è cambiato il limite',
  box: [{ n: 'FINO AL 2017', t: 'Regole dei pubblici, più strette' }, { n: '2018–2025', t: '5.164,57 € l\'anno' }, { n: 'DAL 2026', t: '5.300 € l\'anno', key: true }] },
{ id: 's17', tipo: 'tre', tema: 'chiaro', sopratitolo: 'Per i dipendenti pubblici',
  box: [{ n: 'FINO AL 2017', t: 'Regole più strette · lezione 5.5', key: true }, { n: '2018–2025', t: '5.164,57 € l\'anno' }, { n: 'DAL 2026', t: '5.300 € l\'anno' }] },
{ id: 's18', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Dal 2018',
  col: [{ h: 'Pubblici', t: '**Stesso limite**', grande: true },
        { h: 'Privati', t: '**Stesso limite**', grande: true }] },
{ id: 's19', tipo: 'cifre', tema: 'chiaro', sopratitolo: 'Le proporzioni',
  voci: [{ n: '30.000 €', t: 'Retribuzione utile dell\'esempio del corso', key: true }] },
{ id: 's20', tipo: 'conto', tema: 'chiaro', sopratitolo: 'Per arrivare al tetto',
  voci: [{ v: '5.000 €', lb: 'oltre i 300 € dell\'ente' }, { v: '30.000 €', lb: 'retribuzione' }, { v: '≈ 17%', lb: 'da versare tu' }], op: ['÷', '='] },

// 4 · quanto vale
{ id: 's21', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Quanto vale, in euro?', illu: 'bilancia',
  titolo: 'Dipende dalla tua<br>**aliquota IRPEF più alta**' },
{ id: 's22', tipo: 'tre', tema: 'chiaro', sopratitolo: `Aliquote IRPEF 2026 · ${SEMPL}`,
  box: [{ n: 'FINO A 28.000 €', t: '23%' }, { n: 'DA 28.000 A 50.000 €', t: '33%' }, { n: 'OLTRE 50.000 €', t: '43%' }] },
{ id: 's23', tipo: 'conto', tema: 'chiaro', sopratitolo: 'Il caso base · 30.000 €',
  voci: [{ v: '300 €', lb: 'tuo 1%' }, { v: '300 €', lb: 'ente 1%' }, { v: '600 €', lb: 'dedotti' }], op: ['+', '='] },
tab('s24', 1, [0]),
tab('s25', 1, [0]),
tab('s26', 2, [1]),
tab('s27', 2, [0, 1]),

// 5 · costa meno
{ id: 's28', tipo: 'rimborso', tema: 'chiaro', sopratitolo: 'Ricordi la moneta del modulo 4?' },
{ id: 's29', tipo: 'rimborso', tema: 'chiaro', sopratitolo: 'Al 23%' },
{ id: 's30', tipo: 'rimborso', tema: 'chiaro', sopratitolo: 'Torna indietro quasi un quarto' },
{ id: 's31', tipo: 'conto', tema: 'chiaro', sopratitolo: SEMPL,
  voci: [{ v: '25 €', lb: 'versati' }, { v: '5,75 €', lb: 'IRPEF risparmiata' }, { v: '19,25 €', lb: 'in meno nel netto' }], op: ['−', '='] },
{ id: 's32', tipo: 'figura', tema: 'chiaro', sopratitolo: 'E i 25 € dell\'ente', illu: 'scudo',
  titolo: 'Nella tua posizione<br>**senza IRPEF sopra**' },
{ id: 's33', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Costa meno di quanto versi', illu: 'cartella',
  titolo: 'Uno sconto vero,<br>**lo vedi nel cedolino**' },

// 6 · chi la applica
{ id: 's34', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Chi applica la deduzione?', illu: 'persona',
  titolo: 'La tua amministrazione', sotto: 'Non devi fare nulla.' },
{ id: 's35', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Sostituto d\'imposta', illu: 'calendario',
  titolo: 'IRPEF calcolata mese per mese<br>**al netto dei contributi**' },
{ id: 's36', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Poi', illu: 'cartella',
  titolo: 'Tutto nella<br>**Certificazione Unica**', sotto: 'Lezione 4.5.' },
{ id: 's37', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Dichiarazione dei redditi',
  col: [{ h: 'Trattenuti in busta paga', t: '**Non serve**', grande: true },
        { h: 'Versati con bonifico', t: 'La deduzione **la chiedi tu**', grande: true }] },
{ id: 's38', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Se fai il 730', illu: 'schermo',
  titolo: 'Già nella<br>**precompilata**', sotto: 'Basta controllare.' },

// 7 · memo
{ id: 's39', tipo: 'frase', tema: 'profondo', sopratitolo: 'Da ricordare',
  testo: 'Con la deduzione, la tua pensione si prende la sua fetta<br><b class="a">prima del fisco.</b>' },

// 8 · chiusura
{ id: 's40', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE, attive: [0] },
{ id: 's41', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE, attive: [0, 1] },
{ id: 's42', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE },
{ id: 's43', tipo: 'mossa', tema: 'chiaro', sopratitolo: 'La mossa di oggi', illu: 'cartella',
  titolo: 'Trova **la tua aliquota più alta**', passi: PASSI },
{ id: 's44', tipo: 'tre', tema: 'chiaro', sopratitolo: 'In quale scaglione sei?',
  box: [{ n: 'FINO A 28.000 €', t: '23%' }, { n: 'DA 28.000 A 50.000 €', t: '33%' }, { n: 'OLTRE 50.000 €', t: '43%' }] },
{ id: 's45', tipo: 'cifre', tema: 'chiaro', sopratitolo: 'Ogni euro dedotto vale',
  voci: [{ n: '0,23 €', t: 'Al 23%' }, { n: '0,33 €', t: 'Al 33%' }, { n: '0,43 €', t: 'Al 43%' }] },
{ id: 's46', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Esempi semplificati', illu: 'campana',
  titolo: 'Con le addizionali<br>**il vantaggio cresce un po\'**' },
{ id: 's47', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Prossima lezione', illu: 'stelle',
  titolo: 'Rendimenti<br>**tassati meno**' },
{ id: 's48', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Il secondo vantaggio', illu: 'clessidra',
  titolo: 'Lavora in silenzio,<br>**anno dopo anno**' },

{ id: 's49', tipo: 'copertina', tema: 'profondo', chiusura: true, corso: CORSO, firma: FIRMA },
];
