// Contenuto delle 49 scene della lezione 8.1 — Le anticipazioni dei pubblici.
// s02–s48 sono i blocchi 1–47 del copione, uno a uno.

const CORSO = 'Perseo Sirio senza segreti';
const FIRMA = 'Un corso CISL FP Padova Rovigo';

const MOTIVI = [
  { n: 'PRIMA CASA', t: 'Acquisto o ristrutturazione', d: 'per te o per i figli' },
  { n: 'SPESE SANITARIE', t: 'Terapie e interventi straordinari', d: 'anche per familiari a carico' },
  { n: 'FORMAZIONE', t: 'Spese durante i congedi', d: 'previsti dalla legge' },
];
const mot = (id, sop, k) => ({ id, tipo: 'tre', tema: 'chiaro', sopratitolo: sop, box: MOTIVI.map((b, i) => ({ ...b, key: k === 9 || i === k })) });
const tas = (id, sop, fase = 'anticipo') => ({ id, tipo: 'tasche', tema: 'chiaro', sopratitolo: sop, fase, optanti: true });

const RIGHE = [
  ['Spese sanitarie straordinarie', '**dal 15% al 9%**'],
  ['Prima casa', '23%'],
  ['Congedi formativi', '23%'],
];
const tab = (id, k, chiave) => ({ id, tipo: 'tabella', tema: 'chiaro', sopratitolo: 'Le tasse dipendono dal motivo · somme dal 2018',
  intestazioni: ['Motivo', 'Imposta'], colonne: ['60%', '40%'], righe: RIGHE.slice(0, k), chiave });

const TRE_COSE = [
  'Dopo **8 anni**, per **tre motivi**',
  'Solo la **parte reale**, anche tutta',
  'Sanità **15% → 9%** · casa e formazione **23%**',
];

const PASSI = [
  { t: 'Apri il **prospetto annuale**' },
  { t: 'Guarda solo la **tasca reale**' },
  { t: 'Confrontala con il **totale**', key: true },
];

export const SCENE = [
{ id: 's01', tipo: 'copertina', tema: 'chiaro',
  modulo: 'Modulo 8 · Prima della pensione',
  titolo: 'Le anticipazioni<br>dei pubblici', sottotitolo: 'Lezione 8.1',
  ente: `${CORSO} · ${FIRMA}` },

// 1 · apertura
{ id: 's02', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Un fondo pensione', illu: 'salvadanaio',
  titolo: 'Serve<br>**alla pensione**', sotto: 'Ma la vita non aspetta.' },
{ id: 's03', tipo: 'tre', tema: 'chiaro', sopratitolo: 'I momenti della vita',
  box: [{ n: 'UNA CASA', t: 'Da comprare' }, { n: 'UNA CURA', t: 'Importante' }, { n: 'LA FORMAZIONE', t: 'Un periodo dedicato' }] },
{ id: 's04', tipo: 'figura', tema: 'chiaro', sopratitolo: 'A certe condizioni', illu: 'euro',
  titolo: 'Una parte<br>**in anticipo**' },
{ id: 's05', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Attenzione a ciò che leggi online',
  col: [{ h: 'Lavoratori privati', t: 'Le regole più citate', grande: true },
        { h: 'Dipendenti pubblici', t: '**Regole diverse**', grande: true }] },
{ id: 's06', tipo: 'tre', tema: 'chiaro', sopratitolo: 'In questa lezione',
  box: [{ n: 'QUANDO', t: 'Gli anni di iscrizione' }, { n: 'PER COSA', t: 'I tre motivi' }, { n: 'QUANTO', t: 'E con quali tasse', key: true }] },

// 2 · quando e per cosa
{ id: 's07', tipo: 'cifre', tema: 'chiaro', sopratitolo: 'La prima condizione: il tempo',
  voci: [{ n: '8 anni', t: 'Di iscrizione al Fondo', key: true }] },
{ id: 's08', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Prima di otto anni', illu: 'semaforo',
  titolo: 'Non si può,<br>**qualunque sia il motivo**' },
mot('s09', 'La seconda condizione: tre motivi, e solo tre', -1),
mot('s10', 'Primo motivo', 0),
mot('s11', 'Secondo motivo', 1),
mot('s12', 'Terzo motivo', 2),
{ id: 's13', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Un equivoco diffuso: «ulteriori esigenze»',
  col: [{ h: 'Privati', t: 'Senza spiegare il motivo', grande: true },
        { h: 'Pubblici', t: '**Non esiste**', grande: true }] },
{ id: 's14', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'I limiti che senti citare',
  col: [{ h: '75% · 30%', t: 'Regole dei privati', grande: true },
        { h: 'Pubblici', t: '**Regole diverse**', grande: true }] },
{ id: 's15', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Un articolo, un forum', illu: 'lente',
  titolo: 'Parla<br>**di privati?**', sotto: 'Molto spesso, sì.' },

// 3 · le due tasche
tas('s16', 'Il punto decisivo · le due tasche del modulo 2', 'due'),
tas('s17', 'Anche tutta, ma solo ciò che è nel Fondo', 'reale'),
{ id: 's18', tipo: 'tasche', tema: 'chiaro', sopratitolo: 'La tasca reale', fase: 'reale',
  monete: { reale: ['tuo 1%', 'ente 1%', 'rendimenti'] } },
tas('s19', 'La tasca figurativa resta chiusa'),
tas('s20', 'Quelle somme sono all\'INPS'),
{ id: 's21', tipo: 'frase', tema: 'chiaro', sopratitolo: 'In pratica',
  testo: 'L\'anticipo disponibile<br><b class="a">è spesso molto più piccolo.</b>' },
{ id: 's22', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Per quasi tutti', illu: 'lucchetto',
  titolo: 'Il TFR è<br>**la parte più grande**', sotto: 'E non si può anticipare.' },
{ id: 's23', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Prima di fare progetti', illu: 'casa',
  titolo: 'Parti dalla<br>**cifra giusta**' },

// 4 · le tasse
{ id: 's24', tipo: 'figura', tema: 'chiaro', sopratitolo: 'E le tasse?', illu: 'domanda',
  titolo: 'Dipendono<br>**dal motivo**' },
tab('s25', 1, [0]),
tab('s26', 3, [1, 2]),
{ id: 's27', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Il legislatore premia', illu: 'cuore',
  titolo: 'Gli usi più vicini<br>**alla tutela della persona**' },
{ id: 's28', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Per chi è iscritto da prima',
  col: [{ h: 'Somme dal 2018', t: '**Queste aliquote**', grande: true },
        { h: 'Parti più vecchie', t: 'Le regole del loro periodo', grande: true }] },
{ id: 's29', tipo: 'strati', tema: 'chiaro', sopratitolo: 'Gli strati della lezione 5.5 · il calcolo lo fa il Fondo' },

// 5 · come si chiede
{ id: 's30', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Area riservata → Anticipi', illu: 'schermo',
  titolo: 'Una procedura<br>**online**' },
{ id: 's31', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Prima di inviare', illu: 'libro',
  titolo: 'Leggi il documento<br>**sulle anticipazioni**', sotto: 'I documenti per ogni motivo.' },
{ id: 's32', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Facsimile di autocertificazione', illu: 'lettera',
  titolo: 'Prima casa<br>**e lavori**' },
{ id: 's33', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Per le spese sanitarie', illu: 'stetoscopio',
  titolo: 'La dichiarazione<br>**dell\'azienda sanitaria**' },
{ id: 's34', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Una richiesta',
  col: [{ h: 'Completa', t: '**Più veloce**', grande: true },
        { h: 'Con un documento mancante', t: 'Attese e integrazioni', grande: true }] },
{ id: 's35', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Pochi lo sanno', illu: 'salvadanaio',
  titolo: 'Le somme si possono<br>**reintegrare**', sotto: 'Con un modulo apposito.' },
{ id: 's36', tipo: 'frase', tema: 'chiaro', sopratitolo: 'Dopo l\'anticipo per la casa',
  testo: 'Si può ricostruire<br><b class="a">la posizione per la pensione.</b>' },

// 6 · memo
{ id: 's37', tipo: 'frase', tema: 'profondo', sopratitolo: 'Da ricordare',
  testo: 'Prima della pensione<br><b class="a">si apre solo la tasca reale.</b>' },

// 7 · chiusura
{ id: 's38', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE, attive: [0] },
mot('s39', 'Tre motivi', 9),
{ id: 's40', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE, attive: [0, 1] },
{ id: 's41', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE },
{ id: 's42', tipo: 'mossa', tema: 'chiaro', sopratitolo: 'La mossa di oggi', illu: 'lente',
  titolo: 'Guarda la tua **tasca reale**', passi: PASSI },
tas('s43', 'La differenza è il TFR che aspetta'),
{ id: 's44', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Da quanto sei iscritto?', illu: 'calendario',
  titolo: 'Lo trovi<br>**nell\'area riservata**' },
{ id: 's45', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Prossima lezione', illu: 'contratto',
  titolo: 'Se cambi<br>**lavoro**' },
{ id: 's46', tipo: 'tre', tema: 'chiaro', sopratitolo: 'Che cosa succede alla posizione?',
  box: [{ n: 'UN TRASFERIMENTO', t: 'In un altro ente' }, { n: 'UN CONCORSO', t: 'In un comune' }, { n: 'UN NUOVO LAVORO', t: 'Fuori dalla PA', key: true }] },
{ id: 's47', tipo: 'tre', tema: 'chiaro', sopratitolo: 'Il bivio',
  box: [{ n: 'RISCATTARE', t: 'I soldi subito' }, { n: 'TRASFERIRE', t: 'In un altro fondo' }, { n: 'MANTENERE', t: 'In Perseo Sirio', key: true }] },
{ id: 's48', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Ci vediamo nella lezione 8.2', illu: 'bussola',
  titolo: 'Se cambi<br>**lavoro**' },

{ id: 's49', tipo: 'copertina', tema: 'profondo', chiusura: true, corso: CORSO, firma: FIRMA },
];
