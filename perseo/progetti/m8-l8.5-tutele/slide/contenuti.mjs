// Contenuto delle 49 scene della lezione 8.5 — Se succede il peggio.
// s02–s48 sono i blocchi 1–47 del copione, uno a uno.

const CORSO = 'Perseo Sirio senza segreti';
const FIRMA = 'Un corso CISL FP Padova Rovigo';

const gra = (id, sop, at, vuoti = []) => ({ id, tipo: 'gradini', tema: 'chiaro', sopratitolo: sop, at, vuoti });

const RIGHE = [
  ['Pensione complementare, rendita, RITA', 'Nei limiti di **un quinto**'],
  ['Anticipazione per spese sanitarie', 'Nei limiti di **un quinto**'],
  ['Riscatto', '**Per intero**'],
  ['Altre anticipazioni', '**Per intero**'],
];
const tab = (id, k, chiave, sop = 'Cessione del quinto e fondo pensione') => ({ id, tipo: 'tabella', tema: 'chiaro', sopratitolo: sop,
  intestazioni: ['Operazione', 'Vincolo'], colonne: ['58%', '42%'], righe: RIGHE.slice(0, k), chiave });

const TRE_COSE = [
  'Coniuge, figli, genitori a carico, **designati**',
  'Senza nessuno, **resta al Fondo**',
  'Cessione del quinto: **leggi la delega**',
];

const PASSI = [
  { t: 'Area riservata → **Soggetti designati**' },
  { t: 'Verifica **che cosa risulta**' },
  { t: 'Se serve, **designa oggi**', key: true },
];

export const SCENE = [
{ id: 's01', tipo: 'copertina', tema: 'chiaro',
  modulo: 'Modulo 8 · Prima della pensione',
  titolo: 'Se succede<br>il peggio', sottotitolo: 'Lezione 8.5',
  ente: `${CORSO} · ${FIRMA}` },

// 1 · apertura
{ id: 's02', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Domande che preferiamo non farci', illu: 'cartella',
  titolo: 'È normale<br>**non pensarci**' },
{ id: 's03', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Farsele per tempo', illu: 'mani',
  titolo: 'Un gesto di cura<br>**per chi ci sta vicino**' },
{ id: 's04', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Se l\'iscritto muore prima della pensione', illu: 'domanda',
  titolo: 'Chi riceve<br>**la posizione?**' },
{ id: 's05', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Con pochi minuti, oggi', illu: 'generazioni',
  titolo: 'Alle persone<br>**giuste**' },
{ id: 's06', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'In questa lezione',
  col: [{ h: 'Chi riceve', t: '**La posizione**', grande: true },
        { h: 'E poi', t: 'La cessione del quinto', grande: true }] },

// 2 · l'ordine fissato
gra('s07', 'L\'ordine fissato dalle regole del Fondo', -1),
gra('s08', 'Primo gradino', 0),
gra('s09', 'Se non c\'è il coniuge', 1, [0]),
gra('s10', 'Se non ci sono figli · solo se fiscalmente a carico', 2, [0, 1]),
gra('s11', 'Solo se non c\'è nessuno di loro', 3, [0, 1, 2]),
gra('s12', 'Se non c\'è nessuno, nemmeno tra i designati', 4, [0, 1, 2, 3]),
{ id: 's13', tipo: 'frase', tema: 'chiaro', sopratitolo: 'Un\'eventualità rara',
  testo: 'Che una designazione<br><b class="a">può evitare.</b>' },

// 3 · la designazione
{ id: 's14', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Senza coniuge, figli o genitori a carico', illu: 'persona',
  titolo: 'L\'unico modo<br>**di scegliere**' },
{ id: 's15', tipo: 'tre', tema: 'chiaro', sopratitolo: 'Quando la designazione è decisiva',
  box: [{ n: 'CHI VIVE', t: 'Da solo' }, { n: 'CHI CONVIVE', t: 'Senza essere sposato', key: true }, { n: 'CHI VUOLE', t: 'Includere altre persone' }] },
{ id: 's16', tipo: 'tre', tema: 'chiaro', sopratitolo: 'Per esempio',
  box: [{ n: 'UN FRATELLO', t: 'O una sorella' }, { n: 'UN NIPOTE', t: '' }, { n: 'UNA PERSONA', t: 'Cara' }] },
{ id: 's17', tipo: 'frase', tema: 'chiaro', sopratitolo: 'Senza designazione',
  testo: 'Queste persone<br><b class="a">non riceverebbero nulla.</b>' },
{ id: 's18', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Area riservata → Soggetti designati', illu: 'schermo',
  titolo: 'Online,<br>**in pochi minuti**' },
{ id: 's19', tipo: 'tre', tema: 'chiaro', sopratitolo: 'Si può cambiare quando cambia la vita',
  box: [{ n: 'UNA RELAZIONE', t: 'Nuova' }, { n: 'UNA SEPARAZIONE', t: '' }, { n: 'UNA NASCITA', t: 'In famiglia' }] },
{ id: 's20', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Attenzione',
  col: [{ h: 'Una nuova designazione', t: 'Non si aggiunge', grande: true },
        { h: 'Ma', t: '**Sostituisce la precedente**', grande: true }] },
{ id: 's21', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Più persone?', illu: 'generazioni',
  titolo: 'Tutte insieme,<br>**nella stessa designazione**' },

// 4 · dopo la pensione
{ id: 's22', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'E dopo la pensione?',
  col: [{ h: 'Prima', t: 'L\'ordine dei gradini', grande: true },
        { h: 'Dopo', t: '**Il tipo di rendita**', grande: true }] },
{ id: 's23', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Al pensionamento', illu: 'lettera',
  titolo: 'Lo decidi<br>**con la rendita**' },
{ id: 's24', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Rendita reversibile', illu: 'generazioni',
  titolo: 'Prosegue<br>**a favore di chi indichi**' },
{ id: 's25', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Rendita controassicurata', illu: 'scudo',
  titolo: 'Restituisce<br>**il capitale residuo**' },
{ id: 's26', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Nel modulo 9', illu: 'calendario',
  titolo: 'Le cinque<br>**rendite**' },
{ id: 's27', tipo: 'scala', tema: 'chiaro', sopratitolo: 'Riscatto per decesso: dal 15% al 9% · somme dal 2018', a: 35 },

// 5 · la cessione del quinto
{ id: 's28', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Ultimo tema, molto concreto', illu: 'contratto',
  titolo: 'La cessione<br>**del quinto**' },
{ id: 's29', tipo: 'cifre', tema: 'chiaro', sopratitolo: 'Un prestito con trattenuta in busta paga',
  voci: [{ n: '1/5', t: 'Dello stipendio', key: true }] },
{ id: 's30', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Che cosa c\'entra con il fondo?', illu: 'domanda',
  titolo: 'Dipende<br>**dalla somma pagata**' },
tab('s31', 2, [0, 1]),
tab('s32', 4, [2, 3]),
{ id: 's33', tipo: 'timeline', tema: 'chiaro', sopratitolo: 'Riscatto con un prestito aperto',
  tappe: [{ anno: '1', et: 'Chiedi il riscatto' }, { anno: '2', et: 'Il Fondo chiede il via libera' }, { anno: '3', et: 'Risponde la finanziaria', key: true }] },
{ id: 's34', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Se la finanziaria non concede il via libera',
  col: [{ h: 'Le somme', t: '**Estinguono il debito**', grande: true },
        { h: 'A te', t: 'Quello che resta', grande: true }] },
{ id: 's35', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Alla fine del lavoro', illu: 'lente',
  titolo: 'Solo con<br>**una delega firmata**' },
{ id: 's36', tipo: 'frase', tema: 'chiaro', sopratitolo: 'Hai un prestito, o stai per firmarlo?',
  testo: 'Cerca la parola «delega».<br><b class="a">E chiedi spiegazioni.</b>' },

// 6 · memo
{ id: 's37', tipo: 'frase', tema: 'profondo', sopratitolo: 'Da ricordare',
  testo: 'Cinque minuti oggi<br><b class="a">possono proteggere chi ami domani.</b>' },

// 7 · chiusura
{ id: 's38', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE, attive: [0] },
{ id: 's39', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE, attive: [0, 1] },
{ id: 's40', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE },
{ id: 's41', tipo: 'mossa', tema: 'chiaro', sopratitolo: 'La mossa di oggi', illu: 'schermo',
  titolo: 'Controlla i **soggetti designati**', passi: PASSI },
{ id: 's42', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Che cosa risulta?',
  col: [{ h: 'Nessuno, e ti serve', t: '**Designa oggi**', grande: true },
        { h: 'Qualcuno', t: 'È ancora chi vuoi?', grande: true }] },
{ id: 's43', tipo: 'tre', tema: 'chiaro', sopratitolo: 'Fine del Modulo 8',
  box: [{ n: '8.1 · 8.2', t: 'Anticipazioni, cambio lavoro' }, { n: '8.3 · 8.4', t: 'Trasferimenti, RITA' }, { n: '8.5', t: 'Le tutele per chi resta', key: true }] },
{ id: 's44', tipo: 'frase', tema: 'chiaro', sopratitolo: 'Prima della pensione',
  testo: 'Le regole che valgono davvero<br><b class="a">per i dipendenti pubblici.</b>' },
{ id: 's45', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Prossimo modulo', illu: 'salvadanaio',
  titolo: 'Al<br>**pensionamento**' },
{ id: 's46', tipo: 'tre', tema: 'chiaro', sopratitolo: 'Modulo 9',
  box: [{ n: 'QUANDO', t: 'Si può chiedere' }, { n: 'CAPITALE', t: 'O rendita' }, { n: 'LE CINQUE', t: 'Rendite', key: true }] },
{ id: 's47', tipo: 'frase', tema: 'chiaro', sopratitolo: 'Dopo tanti anni di versamenti',
  testo: 'Il salvadanaio<br><b class="a">si apre.</b>' },
{ id: 's48', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Ci vediamo nel modulo 9', illu: 'bussola',
  titolo: 'Al<br>**pensionamento**' },

{ id: 's49', tipo: 'copertina', tema: 'profondo', chiusura: true, corso: CORSO, firma: FIRMA },
];
