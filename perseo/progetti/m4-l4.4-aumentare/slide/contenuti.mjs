// Contenuto delle 49 scene della lezione 4.4 — Aumentare, ridurre, versare di più.
// s02–s48 sono i blocchi 1–47 del copione, uno a uno.

const CORSO = 'Perseo Sirio senza segreti';
const FIRMA = 'Un corso CISL FP Padova Rovigo';

const man = (id, sop, k) => ({ id, tipo: 'manopole', tema: 'chiaro', sopratitolo: sop, k });
const cur = (id, sop, v, extra = {}) => ({ id, tipo: 'cursori', tema: 'chiaro', sopratitolo: sop, v, ...extra });

const TRE_COSE = [
  'Il contributo si cambia **una volta l\'anno**',
  'Versamenti extra: **la deduzione la chiedi tu**',
  'Sospendere fa perdere **l\'1% dell\'ente**',
];

const PASSI = [
  { t: 'Entra nell\'**area riservata** del Fondo' },
  { t: 'Trova la sezione **contribuzione**' },
  { t: 'Sai dov\'è: **per quando ti servirà**', key: true },
];

export const SCENE = [
{ id: 's01', tipo: 'copertina', tema: 'chiaro',
  modulo: 'Modulo 4 · Quanto si versa',
  titolo: 'Aumentare, ridurre,<br>versare di più', sottotitolo: 'Lezione 4.4',
  ente: `${CORSO} · ${FIRMA}` },

// 1 · apertura
{ id: 's02', tipo: 'figura', tema: 'chiaro', sopratitolo: 'L\'adesione', illu: 'contratto',
  titolo: 'Non è scolpita<br>**nella pietra**', sotto: 'È più simile a una radio, con le sue manopole.' },
{ id: 's03', tipo: 'icone', tema: 'chiaro', sopratitolo: 'La vita cambia',
  voci: [{ icona: 'euro', t: 'Un aumento' }, { icona: 'persone', t: 'Un figlio' }, { icona: 'casa', t: 'Un mutuo' }, { icona: 'avviso', t: 'Una spesa imprevista' }] },
man('s04', 'Tre manopole, le giri da solo', 9),
{ id: 's05', tipo: 'tre', tema: 'chiaro', sopratitolo: 'In questa lezione',
  box: [{ n: 'AUMENTARE O RIDURRE', t: 'Il contributo mensile' }, { n: 'VERSARE DI PIÙ', t: 'Quando vuoi tu' }, { n: 'SOSPENDERE', t: 'Se serve davvero', key: true }] },

// 2 · prima manopola: il contributo
man('s06', 'Prima manopola: la percentuale', 0),
cur('s07', 'Rispettato il minimo, decidi tu', 3),
cur('s08', 'Oltre una certa cifra', 5.5, { da: 3, tetto: true }),
cur('s09', 'Il tuo si sposta, quello dell\'ente no', 3, { fermo: true }),
{ id: 's10', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Quando', illu: 'calendario',
  titolo: 'Una volta<br>**all\'anno**', sotto: 'Per alzarlo o per riportarlo verso il minimo. Senza motivare.' },
{ id: 's11', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Come si fa', illu: 'schermo',
  titolo: 'Area riservata del Fondo<br>**sezione contribuzione**', sotto: 'La funzione per modificare l\'aliquota.' },
{ id: 's12', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Il modulo firmato va',
  col: [{ h: 'Sì', t: '**Alla tua amministrazione**', grande: true },
        { h: 'No', t: 'Al Fondo', grande: true }] },
{ id: 's13', tipo: 'figura', tema: 'chiaro', sopratitolo: 'L\'ufficio del personale', illu: 'lettera',
  titolo: 'Dal mese<br>**dopo la consegna**', sotto: 'La vedrai nel primo cedolino utile.' },
{ id: 's14', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Stipendio gestito da NoiPA', illu: 'telefono',
  titolo: 'Tutto dal portale,<br>**senza moduli di carta**', sotto: 'Sezione previdenza complementare.' },
{ id: 's15', tipo: 'cifre', tema: 'chiaro', sopratitolo: 'Un esempio',
  voci: [{ n: '30.000 €', t: 'Retribuzione utile all\'anno · esempio semplificato, importi lordi', key: true }] },
{ id: 's16', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Dall\'1% al 3%',
  col: [{ h: 'All\'1%', t: '**25 €** al mese', grande: true },
        { h: 'Al 3%', t: '**75 €** al mese', grande: true }] },
{ id: 's17', tipo: 'conto', tema: 'chiaro', sopratitolo: 'La differenza',
  voci: [{ v: '50 €', lb: 'in più al mese' }, { v: '12', lb: 'mesi' }, { v: '600 €', lb: 'in più l\'anno' }], op: ['×', '='] },
{ id: 's18', tipo: 'conto', tema: 'chiaro', sopratitolo: 'Prova con il tuo stipendio',
  voci: [{ v: '1%', lb: 'della retribuzione' }, { v: '12', lb: 'mesi' }, { v: '?', lb: 'costo al mese per punto' }], op: ['÷', '='] },
{ id: 's19', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Non sono persi', illu: 'scudo',
  titolo: 'Deducibili<br>**dal reddito**', sotto: 'Lo vediamo nel modulo cinque.' },
{ id: 's20', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Nella pratica',
  col: [{ h: 'Versi', t: '600 €', grande: true },
        { h: 'Ti costano', t: '**Meno**, grazie all\'IRPEF', grande: true }] },
cur('s21', 'Il di più è tutto tuo', 3, { fermo: true }),

// 3 · seconda manopola: i versamenti volontari
{ id: 's22', tipo: 'ingressi', tema: 'chiaro', sopratitolo: 'Seconda manopola: una fessura laterale', n: 3, at: -1, laterale: true },
{ id: 's23', tipo: 'icone', tema: 'chiaro', sopratitolo: 'Quando vuoi, anche una volta sola',
  voci: [{ icona: 'orologio', t: 'A fine anno' }, { icona: 'euro', t: 'Dopo la tredicesima' }, { icona: 'documento', t: 'Con un arretrato' }] },
{ id: 's24', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Con un bonifico', illu: 'schermo',
  titolo: 'Coordinate e causale<br>**nell\'area riservata**' },
{ id: 's25', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Finisce nella tua posizione', illu: 'salvadanaio',
  titolo: 'Investito<br>**nel tuo profilo**', sotto: 'Insieme a tutti gli altri contributi.' },
{ id: 's26', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Due strade, una differenza',
  col: [{ h: 'Trattenuti in busta paga', t: 'Li deduce **l\'ente**', grande: true },
        { h: 'Con bonifico', t: '…' }] },
{ id: 's27', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Due strade, una differenza',
  col: [{ h: 'Trattenuti in busta paga', t: 'Li deduce **l\'ente**', grande: true },
        { h: 'Con bonifico', t: 'Li deduci **tu**, nella dichiarazione dell\'anno dopo', grande: true }] },
{ id: 's28', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Importante', illu: 'cartella',
  titolo: 'Conserva sempre<br>**la ricevuta del bonifico**', sotto: 'Serve per lo sconto fiscale.' },

// 4 · terza manopola: la sospensione
man('s29', 'Terza manopola: la sospensione', 2),
{ id: 's30', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Durante la pausa', illu: 'salvadanaio',
  titolo: 'Resti iscritto,<br>**la posizione resta investita**' },
{ id: 's31', tipo: 'ingressi', tema: 'chiaro', sopratitolo: 'Insieme al tuo, si ferma l\'ente', n: 3, at: 2 },
{ id: 's32', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Il TFR figurativo', illu: 'clessidra',
  titolo: 'Continua ad accumularsi<br>**all\'INPS**', sotto: 'Come prima.' },
{ id: 's33', tipo: 'buste', tema: 'chiaro', sopratitolo: 'Ogni mese di stop', stato: 'da', da: 6 },
{ id: 's34', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Valuta prima l\'alternativa',
  col: [{ h: 'Sospendere', t: 'Perdi **l\'1% dell\'ente**', grande: true },
        { h: 'Ridurre al minimo', t: 'Lo **conservi**', grande: true }] },
man('s35', 'Le manopole restano lì', 9),

// 5 · dopo la pensione
{ id: 's36', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Un\'ultima possibilità', illu: 'lente',
  titolo: 'Poco conosciuta,<br>**per chi è vicino alla fine**' },
{ id: 's37', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Lo Statuto consente', illu: 'libro',
  titolo: 'Versare anche<br>**dopo l\'età della pensione**' },
{ id: 's38', tipo: 'cifre', tema: 'chiaro', sopratitolo: 'A una condizione',
  voci: [{ n: '1 anno', t: 'Di contribuzione nella previdenza complementare al momento della pensione', key: true }] },
{ id: 's39', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Utile a chi ha iniziato tardi', illu: 'clessidra',
  titolo: 'Qualche anno in più<br>**per crescere**' },
{ id: 's40', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Con calma', illu: 'dialogo',
  titolo: 'Valutala<br>**con il Fondo o il sindacato**' },

// 6 · memo
{ id: 's41', tipo: 'frase', tema: 'profondo', sopratitolo: 'Da ricordare',
  testo: 'Il minimo lo fissa il contratto.<br><b class="a">Il resto lo decidi tu.</b>' },

// 7 · chiusura
{ id: 's42', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE, attive: [0] },
{ id: 's43', tipo: 'figura', tema: 'chiaro', sopratitolo: 'La modifica parte dal mese dopo', illu: 'telefono',
  titolo: 'Su NoiPA<br>**fai tutto dal portale**' },
{ id: 's44', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE, attive: [0, 1] },
{ id: 's45', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE },
{ id: 's46', tipo: 'mossa', tema: 'chiaro', sopratitolo: 'La mossa di oggi', illu: 'schermo',
  titolo: 'Trova **la sezione contribuzione**', passi: PASSI },
{ id: 's47', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Non devi cambiare nulla', illu: 'bussola',
  titolo: 'Basta sapere<br>**dov\'è**', sotto: 'Niente credenziali? Chiedile al Fondo.' },
{ id: 's48', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Prossima lezione', illu: 'lente',
  titolo: 'Ritrovarlo in busta paga<br>**e nel prospetto**' },

{ id: 's49', tipo: 'copertina', tema: 'profondo', chiusura: true, corso: CORSO, firma: FIRMA },
];
