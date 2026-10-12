// Contenuto delle 49 scene della lezione 5.2 — Rendimenti tassati meno.
// s02–s48 sono i blocchi 1–47 del copione, uno a uno.

const CORSO = 'Perseo Sirio senza segreti';
const FIRMA = 'Un corso CISL FP Padova Rovigo';
const SEMPL = 'Esempio semplificato';

const ali = (id, sop, k) => ({ id, tipo: 'aliquote', tema: 'chiaro', sopratitolo: sop, k });
const ces = (id, sop, fase) => ({ id, tipo: 'cesti', tema: 'chiaro', sopratitolo: `${sop} · ${SEMPL}`, fase });
const cur = (id, sop) => ({ id, tipo: 'composto', tema: 'chiaro', sopratitolo: sop, fase: 'fisco' });

const TRE_COSE = [
  'Rendimenti al **20%**, non al 26%',
  'Titoli di Stato al **12,5%**',
  'Le paga il Fondo: **rendimenti netti**',
];

const PASSI = [
  { t: 'Sito del Fondo: **gestione finanziaria**' },
  { t: 'Il rendimento **netto 2025** del tuo profilo' },
  { t: 'Confronta solo **netto con netto**', key: true },
];

export const SCENE = [
{ id: 's01', tipo: 'copertina', tema: 'chiaro',
  modulo: 'Modulo 5 · Il fisco: dove si guadagna davvero',
  titolo: 'Rendimenti<br>tassati meno', sottotitolo: 'Lezione 5.2',
  ente: `${CORSO} · ${FIRMA}` },

// 1 · apertura
{ id: 's02', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Il secondo vantaggio', illu: 'clessidra',
  titolo: 'Riguarda<br>**il raccolto**' },
{ id: 's03', tipo: 'icone', tema: 'chiaro', sopratitolo: 'I rendimenti del Fondo',
  voci: [{ icona: 'documento', t: 'Interessi delle obbligazioni' }, { icona: 'euro', t: 'Dividendi' }, { icona: 'barra', t: 'Crescita delle azioni' }] },
{ id: 's04', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Sui rendimenti si pagano le tasse',
  col: [{ h: 'Come ogni investimento', t: 'Si pagano', grande: true },
        { h: 'Nel fondo pensione', t: '**Se ne pagano meno**', grande: true }] },
{ id: 's05', tipo: 'tre', tema: 'chiaro', sopratitolo: 'In questa lezione',
  box: [{ n: 'QUANTO', t: 'Meno tasse' }, { n: 'CHI', t: 'Le paga' }, { n: 'PERCHÉ', t: 'Si accumula nel tempo', key: true }] },
{ id: 's06', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Come sempre nel modulo', illu: 'campana',
  titolo: 'Informazioni generali,<br>**non consulenza fiscale**', sotto: 'Esempi semplificati.' },

// 2 · i numeri
ali('s07', 'Se investi da solo', 0),
ali('s08', 'L\'eccezione: i titoli di Stato', 2),
ali('s09', 'Nel fondo pensione', 1),
ali('s10', 'Anche nel Fondo, i titoli di Stato al 12,5%', 9),
{ id: 's11', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Dipende dal tuo profilo', illu: 'bilancia',
  titolo: 'L\'aliquota effettiva<br>**può scendere sotto il 20%**' },
{ id: 's12', tipo: 'conto', tema: 'chiaro', sopratitolo: 'Sei punti di differenza',
  voci: [{ v: '26%', lb: 'fuori' }, { v: '20%', lb: 'nel Fondo' }, { v: '6 €', lb: 'ogni 100 € di guadagno' }], op: ['−', '='] },
{ id: 's13', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Sembra poco, ma', illu: 'calendario',
  titolo: 'Si ripete<br>**ogni anno**', sotto: 'Per tutti gli anni in cui i soldi restano investiti.' },

// 3 · un esempio
ces('s14', 'Due cesti uguali', 'cesti'),
ces('s15', 'Fuori dal fondo pensione', 'fuori'),
ces('s16', 'Nel fondo pensione', 'tasse'),
ces('s17', 'Sessanta euro di differenza', 'vaso'),
{ id: 's18', tipo: 'figura', tema: 'chiaro', sopratitolo: 'L\'anno dopo', illu: 'stelle',
  titolo: 'Anche quei 60 €<br>**producono rendimento**' },
{ id: 's19', tipo: 'composto', tema: 'chiaro', sopratitolo: 'La curva del modulo 1', fase: 'area' },
{ id: 's20', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Ogni euro di tasse risparmiato', illu: 'salvadanaio',
  titolo: 'Lavora per te<br>**fino alla pensione**' },

// 4 · come si paga
{ id: 's21', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Come si pagano?', illu: 'ingranaggio',
  titolo: 'Non te ne<br>**devi occupare**', sotto: 'Nessun modulo, nessuna scadenza.' },
{ id: 's22', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Le paga il Fondo', illu: 'ingranaggio',
  titolo: 'Ogni anno,<br>**sul risultato della gestione**' },
{ id: 's23', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'I rendimenti pubblicati dal Fondo',
  col: [{ h: 'Sono', t: '**Netti**', grande: true },
        { h: 'Le tasse', t: 'Già tolte', grande: true }] },
{ id: 's24', tipo: 'tasche', tema: 'chiaro', sopratitolo: 'Anche nel prospetto annuale · lezione 4.5', fase: 'due', monete: { reale: ['tuo', 'ente'], fig: ['TFR virtuale'] } },
{ id: 's25', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Quando confronti',
  col: [{ h: 'Il Fondo', t: 'Rendimenti **netti**', grande: true },
        { h: 'Altri investimenti', t: 'Spesso **lordi**', grande: true }] },
{ id: 's26', tipo: 'frase', tema: 'chiaro', sopratitolo: 'Per un confronto onesto',
  testo: 'Sempre <b class="a">netto con netto.</b>' },
{ id: 's27', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Alla prestazione', illu: 'scudo',
  titolo: 'I rendimenti già tassati<br>**non pagano due volte**' },
{ id: 's28', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'La tassa sulla prestazione · lezione 5.3',
  col: [{ h: 'Riguarda', t: '**I contributi**', grande: true },
        { h: 'Non riguarda', t: 'I rendimenti: hanno già pagato', grande: true }] },

// 5 · nel tempo
cur('s29', 'In trent\'anni'),
cur('s30', 'Stesso investimento, due aliquote'),
cur('s31', 'All\'inizio quasi non si vede'),
cur('s32', 'Poi le curve si separano'),
{ id: 's33', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Un vantaggio silenzioso', illu: 'bussola',
  titolo: 'Come un vento leggero,<br>**ma sempre a favore**' },
{ id: 's34', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Premia chi resta a lungo', illu: 'clessidra',
  titolo: 'Il fondo pensione<br>**per la pensione**' },
{ id: 's35', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Chi esce presto',
  col: [{ h: 'Anticipazioni non necessarie', t: 'Rinuncia a una parte', grande: true },
        { h: 'Riscatti', t: '**Interrompono il vantaggio**', grande: true }] },
{ id: 's36', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Più avanti nel corso', illu: 'semaforo',
  titolo: 'Anticipazioni<br>**e riscatti**' },

// 6 · memo
{ id: 's37', tipo: 'frase', tema: 'profondo', sopratitolo: 'Da ricordare',
  testo: 'Nel Fondo, i tuoi guadagni pagano il venti per cento.<br><b class="a">Non il ventisei.</b>' },

// 7 · chiusura
{ id: 's38', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE, attive: [0] },
{ id: 's39', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE, attive: [0, 1] },
{ id: 's40', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE },
{ id: 's41', tipo: 'mossa', tema: 'chiaro', sopratitolo: 'La mossa di oggi', illu: 'schermo',
  titolo: 'Il **rendimento netto** del tuo profilo', passi: PASSI },
{ id: 's42', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Gestione finanziaria', illu: 'stelle',
  titolo: 'Il 2025,<br>**e gli ultimi 5 o 10 anni**' },
{ id: 's43', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Non ricordi il tuo profilo?', illu: 'cartella',
  titolo: 'Area riservata<br>**o prospetto annuale**', sotto: 'Ne parliamo nel modulo 6.' },
{ id: 's44', tipo: 'frase', tema: 'chiaro', sopratitolo: 'Ricorda',
  testo: 'Quel numero è già netto.<br><b class="a">Confrontalo solo con altri netti.</b>' },
{ id: 's45', tipo: 'tre', tema: 'chiaro', sopratitolo: 'Tre vantaggi fiscali',
  box: [{ n: '5.1', t: 'Sui contributi che versi' }, { n: '5.2', t: 'Sui rendimenti che maturano' }, { n: '5.3', t: 'All\'arrivo', key: true }] },
{ id: 's46', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Prossima lezione', illu: 'semaforo',
  titolo: 'Dal 15%<br>**al 9%**' },
{ id: 's47', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Una scala che scende', illu: 'clessidra',
  titolo: 'Più resti,<br>**meno paghi**' },
{ id: 's48', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Ci vediamo nella lezione 5.3', illu: 'bilancia',
  titolo: 'La scala<br>**del fisco**' },

{ id: 's49', tipo: 'copertina', tema: 'profondo', chiusura: true, corso: CORSO, firma: FIRMA },
];
