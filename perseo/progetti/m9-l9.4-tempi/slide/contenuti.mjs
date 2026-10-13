// Contenuto delle 49 scene della lezione 9.4 — I tempi reali.
// s02–s48 sono i blocchi 1–47 del copione, uno a uno.

const CORSO = 'Perseo Sirio senza segreti';
const FIRMA = 'Un corso CISL FP Padova Rovigo';

const cls = (id, sop, fase) => ({ id, tipo: 'clessidre', tema: 'chiaro', sopratitolo: sop, fase });
const REGOLE = [
  'Domanda **completa e corretta**',
  'Recapiti **aggiornati**',
  'Contributi non dedotti **comunicati**',
];
const reg = (id, attive) => ({ id, tipo: 'memo', tema: 'chiaro', sopratitolo: 'Come non perdere tempo', voci: REGOLE, attive });

const TRE_COSE = [
  'Parte reale: circa **90 giorni**',
  'Parte INPS: fino a **12–18 mesi**',
  'Domanda completa = **niente ritardi**',
];

const PASSI = [
  { t: 'Entra nell\'**area riservata**' },
  { t: 'Sezione **anagrafica**' },
  { t: 'Verifica **email e cellulare**', key: true },
];

export const SCENE = [
{ id: 's01', tipo: 'copertina', tema: 'chiaro',
  modulo: 'Modulo 9 · Al pensionamento',
  titolo: 'I tempi reali', sottotitolo: 'Lezione 9.4',
  ente: `${CORSO} · ${FIRMA}` },

// 1 · apertura
{ id: 's02', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Hai chiesto la prestazione', illu: 'orologio',
  titolo: 'E ora<br>**aspetti**' },
{ id: 's03', tipo: 'frase', tema: 'chiaro', sopratitolo: 'Al pensionamento',
  testo: 'I soldi non arrivano tutti insieme:<br><b class="a">arrivano su due treni.</b>' },
{ id: 's04', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Due treni, due macchinisti',
  col: [{ h: 'Primo treno', t: 'Il Fondo', grande: true },
        { h: 'Secondo treno', t: '**L\'INPS**', grande: true }] },
{ id: 's05', tipo: 'tre', tema: 'chiaro', sopratitolo: 'In questa lezione',
  box: [{ n: 'QUANDO', t: 'Parte ogni treno' }, { n: 'CHI', t: 'Lo guida' }, { n: 'COSA', t: 'Puoi fare tu', key: true }] },
{ id: 's06', tipo: 'figura', tema: 'chiaro', sopratitolo: 'E alla fine', illu: 'calendario',
  titolo: 'Il primo anno<br>**di pensione**' },

// 2 · due tasche, due clessidre
{ id: 's07', tipo: 'tasche', tema: 'chiaro', sopratitolo: 'Ricordi le due tasche?', fase: 'due' },
{ id: 's08', tipo: 'tasche', tema: 'chiaro', sopratitolo: 'Il primo treno: la tasca reale', fase: 'reale' },
{ id: 's09', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Già nel Fondo, già investiti', illu: 'salvadanaio',
  titolo: 'Li paga<br>**direttamente il Fondo**' },
cls('s10', 'La legge: fino a 180 giorni · in media circa 90', 'reale'),
cls('s11', 'Una clessidra piccola: arriva per prima', 'reale'),
{ id: 's12', tipo: 'tasche', tema: 'chiaro', sopratitolo: 'Il secondo treno: la tasca figurativa', fase: 'due' },
{ id: 's13', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Quei soldi sono all\'INPS', illu: 'pilastri',
  titolo: 'Prima l\'INPS<br>**li versa al Fondo**' },
cls('s14', 'L\'INPS: in genere fino a 12 mesi, massimo 18', 'figurativa'),
cls('s15', 'Due tasche, due clessidre', 'due'),
{ id: 's16', tipo: 'frase', tema: 'chiaro', sopratitolo: 'Solo dopo il versamento INPS',
  testo: 'Il Fondo può pagare<br><b class="a">anche questa parte.</b>' },

// 3 · due percorsi
{ id: 's17', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Attenzione', illu: 'lente',
  titolo: 'Due cose<br>**da non confondere**' },
{ id: 's18', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'La liquidazione ordinaria',
  col: [{ h: 'Il TFS', t: 'Per chi ce l\'ha', grande: true },
        { h: 'Oppure', t: '**Il TFR non destinato al Fondo**', grande: true }] },
{ id: 's19', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Non passa dal Fondo · modulo 2', illu: 'pilastri',
  titolo: 'La paga<br>**direttamente l\'INPS**' },
{ id: 's20', tipo: 'cifre', tema: 'chiaro', sopratitolo: 'Liquidazione INPS · pensione di vecchiaia',
  voci: [{ n: '12', t: 'Mesi, oggi' }, { n: '9', t: 'Mesi, dal 2027', key: true }, { n: '+ 3', t: 'Mesi tecnici' }] },
{ id: 's21', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Il TFR destinato al Fondo', illu: 'catena',
  titolo: 'INPS → Fondo<br>**→ a te**' },
{ id: 's22', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Due percorsi separati',
  col: [{ h: 'Liquidazione', t: 'INPS → te', grande: true },
        { h: 'TFR nel Fondo', t: '**INPS → Fondo → te**', grande: true }] },
{ id: 's23', tipo: 'timeline', tema: 'chiaro', sopratitolo: 'Nel primo anno: tre arrivi distinti',
  tappe: [{ anno: '1', et: 'Fondo, parte reale' }, { anno: '2', et: 'Liquidazione INPS' }, { anno: '3', et: 'Fondo, parte figurativa', key: true }] },

// 4 · come non perdere tempo
{ id: 's24', tipo: 'figura', tema: 'chiaro', sopratitolo: 'I tempi INPS non li puoi cambiare', illu: 'mani',
  titolo: 'Ma puoi<br>**non allungarli**' },
{ id: 's25', tipo: 'frase', tema: 'chiaro', sopratitolo: 'Il termine del Fondo decorre',
  testo: 'Dalla richiesta<br><b class="a">completa e corretta.</b>' },
{ id: 's26', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Si ricomincia da capo',
  col: [{ h: 'Un documento', t: 'Mancante', grande: true },
        { h: 'Un IBAN', t: '**Sbagliato**', grande: true }] },
reg('s27', [0]),
reg('s28', [0, 1]),
{ id: 's29', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Gli aggiornamenti sulla pratica', illu: 'telefono',
  titolo: 'Arrivano via<br>**email e SMS**' },
reg('s30', [0, 1, 2]),
{ id: 's31', tipo: 'frase', tema: 'chiaro', sopratitolo: 'Il resto non dipende da te',
  testo: 'Una domanda fatta bene<br><b class="a">non aggiunge attese.</b>' },

// 5 · pianificare
{ id: 's32', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Un consiglio di pianificazione', illu: 'calendario',
  titolo: 'Il primo anno<br>**di pensione**' },
{ id: 's33', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Metti in conto', illu: 'clessidra',
  titolo: 'Figurativa e liquidazione<br>**dopo qualche mese**' },
{ id: 's34', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Spese importanti?', illu: 'salvadanaio',
  titolo: 'Usa prima<br>**la parte reale**' },
{ id: 's35', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Oppure, con il patronato', illu: 'dialogo',
  titolo: 'L\'anticipo<br>**del TFS o TFR**', sotto: 'Previsto per i dipendenti pubblici.' },
{ id: 's36', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Metà della tranquillità', illu: 'lettera',
  titolo: 'Segna quando<br>**arriva ogni somma**' },

// 6 · memo
{ id: 's37', tipo: 'frase', tema: 'profondo', sopratitolo: 'Da ricordare',
  testo: 'Due treni,<br><b class="a">due orari.</b>' },

// 7 · chiusura
{ id: 's38', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE, attive: [0] },
{ id: 's39', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE, attive: [0, 1] },
cls('s40', 'Una clessidra lunga, da mettere in conto', 'figurativa'),
{ id: 's41', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE },
{ id: 's42', tipo: 'mossa', tema: 'chiaro', sopratitolo: 'La mossa di oggi', illu: 'telefono',
  titolo: 'Aggiorna **email e telefono**', passi: PASSI },
{ id: 's43', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Ci vogliono due minuti', illu: 'orologio',
  titolo: 'Meglio adesso,<br>**senza fretta**' },
{ id: 's44', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Prossima lezione, l\'ultima del modulo', illu: 'lettera',
  titolo: 'Fare<br>**la domanda**' },
{ id: 's45', tipo: 'tre', tema: 'chiaro', sopratitolo: 'Passo per passo',
  box: [{ n: 'DOVE', t: 'Si presenta' }, { n: 'COSA', t: 'Serve' }, { n: 'DOPO', t: 'L\'invio', key: true }] },
{ id: 's46', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Se non vuoi farla da solo', illu: 'dialogo',
  titolo: 'Chi può<br>**aiutarti**' },
{ id: 's47', tipo: 'frase', tema: 'chiaro', sopratitolo: 'L\'abbiamo visto oggi',
  testo: 'Una domanda fatta bene<br><b class="a">è già metà del viaggio.</b>' },
{ id: 's48', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Ci vediamo nella lezione 9.5', illu: 'lettera',
  titolo: 'Fare<br>**la domanda**' },

{ id: 's49', tipo: 'copertina', tema: 'profondo', chiusura: true, corso: CORSO, firma: FIRMA },
];
