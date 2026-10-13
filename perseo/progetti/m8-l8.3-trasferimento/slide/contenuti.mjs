// Contenuto delle 49 scene della lezione 8.3 — Trasferire ad altro fondo.
// s02–s48 sono i blocchi 1–47 del copione, uno a uno.

const CORSO = 'Perseo Sirio senza segreti';
const FIRMA = 'Un corso CISL FP Padova Rovigo';

const usc = (id, sop, fase = 'ponte') => ({ id, tipo: 'ponte', tema: 'chiaro', sopratitolo: sop, fase,
  nomi: ['Oggi', 'Domani'], insegne: ['Perseo Sirio', 'Altro fondo'] });
const ent = (id, sop, fase = 'arrivo') => ({ id, tipo: 'ponte', tema: 'chiaro', sopratitolo: sop, fase,
  nomi: ['Lavoro precedente', 'Oggi'], insegne: ['Vecchio fondo', 'Perseo Sirio'] });
const sal = (id, sop, chiusa, at = 9) => ({ id, tipo: 'ingressi', tema: 'chiaro', sopratitolo: sop, n: 3, at, chiusa, senzaBase: true,
  etichette: ['tuo', 'ente', 'TFR'] });

const TRE_COSE = [
  'Dopo **3 anni**, solo la **parte reale**',
  'Nella PA perdi **l\'1% dell\'ente**',
  'Puoi portare qui **un vecchio fondo**',
];

const PASSI = [
  { t: 'Pensa ai lavori **prima della PA**' },
  { t: 'Avevi un **fondo pensione**?' },
  { t: 'Recupera i documenti e **riunisci**', key: true },
];

export const SCENE = [
{ id: 's01', tipo: 'copertina', tema: 'chiaro',
  modulo: 'Modulo 8 · Prima della pensione',
  titolo: 'Trasferire<br>ad altro fondo', sottotitolo: 'Lezione 8.3',
  ente: `${CORSO} · ${FIRMA}` },

// 1 · apertura
{ id: 's02', tipo: 'figura', tema: 'chiaro', sopratitolo: 'In ogni trasloco', illu: 'casa',
  titolo: 'Qualcosa<br>**resta indietro**' },
usc('s03', 'Il trasferimento: si sposta molto, ma non tutto'),
{ id: 's04', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Si può fare anche restando nella PA',
  col: [{ h: 'Ma', t: 'Non tutto viaggia', grande: true },
        { h: 'E', t: '**Qualcosa si perde**', grande: true }] },
{ id: 's05', tipo: 'tre', tema: 'chiaro', sopratitolo: 'In questa lezione',
  box: [{ n: 'CHE COSA', t: 'Si sposta' }, { n: 'CHE COSA', t: 'Resta indietro' }, { n: 'QUANDO', t: 'Ha senso', key: true }] },
ent('s06', 'E il trasloco al contrario', 'ponte'),

// 2 · che cosa si sposta
{ id: 's07', tipo: 'cifre', tema: 'chiaro', sopratitolo: 'Dipendenti pubblici',
  voci: [{ n: '3 anni', t: 'Di permanenza in Perseo Sirio', key: true }] },
{ id: 's08', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Attenzione alle regole dei privati',
  col: [{ h: 'Privati', t: '2 anni', grande: true },
        { h: 'Pubblici', t: '**3 anni**', grande: true }] },
{ id: 's09', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Che cosa si trasferisce', illu: 'salvadanaio',
  titolo: 'Quanto è stato versato,<br>**con i rendimenti**' },
{ id: 's10', tipo: 'tasche', tema: 'chiaro', sopratitolo: 'Cioè la tasca reale', fase: 'reale',
  monete: { reale: ['tuo 1%', 'ente 1%', 'rendimenti'] } },
{ id: 's11', tipo: 'tasche', tema: 'chiaro', sopratitolo: 'Il TFR resta all\'INPS fino alla fine del lavoro', fase: 'anticipo', optanti: true },
{ id: 's12', tipo: 'tasche', tema: 'chiaro', sopratitolo: 'Anche l\'1,5% di chi viene dal TFS', fase: 'anticipo', optanti: true },
{ id: 's13', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Il trasferimento in sé',
  col: [{ h: 'Spese del Fondo', t: '**Nessuna**', grande: true },
        { h: 'Imposte', t: '**Nessuna**', grande: true }] },

// 3 · il costo nascosto
{ id: 's14', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Non è in nessuna tabella', illu: 'lente',
  titolo: 'Il costo<br>**nascosto**' },
sal('s15', 'Se trasferisci mentre lavori nella PA', [1]),
{ id: 's16', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Il contributo del datore', illu: 'contratto',
  titolo: 'Solo nel fondo<br>**del tuo contratto**', sotto: 'Per te: Perseo Sirio.' },
sal('s17', 'Nel nuovo fondo verserai solo tu', [1], 0),
{ id: 's18', tipo: 'frase', tema: 'chiaro', sopratitolo: 'Ogni anno',
  testo: 'L\'1% della retribuzione utile,<br><b class="a">più i suoi rendimenti.</b>' },
{ id: 's19', tipo: 'tre', tema: 'chiaro', cifre: true, sopratitolo: 'Esempio · 30.000 € di retribuzione utile',
  box: [{ n: 'OGNI ANNO', t: '300 €', d: 'di contributo dell\'ente' }, { n: 'IN 20 ANNI', t: '6.000 €', d: 'solo i versamenti', key: true }, { n: 'IN PIÙ', t: 'I rendimenti', d: 'che non avrai' }] },
{ id: 's20', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Un altro fondo', illu: 'bilancia',
  titolo: 'Difficile<br>**compensare**', sotto: 'Soprattutto considerando i costi.' },
{ id: 's21', tipo: 'tre', tema: 'chiaro', cifre: true, sopratitolo: 'ISC medio a 10 anni · COVIP · modulo 7',
  box: [{ n: 'FONDI NEGOZIALI', t: '0,47%' }, { n: 'FONDI APERTI', t: '1,36%', key: true }, { n: 'PIP', t: '2,17%', key: true }] },

// 4 · quando ha senso
{ id: 's22', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Quando ha senso? Due situazioni',
  col: [{ h: 'Hai lasciato la PA', t: '**Segui il nuovo lavoro**', grande: true },
        { h: 'Sei ancora nella PA', t: 'Valuta bene il costo', grande: true }] },
{ id: 's23', tipo: 'ponte', tema: 'chiaro', sopratitolo: 'Hai lasciato la PA, nuovo lavoro con un fondo negoziale', fase: 'ponte',
  nomi: ['Pubblico impiego', 'Nuovo lavoro'], insegne: ['Perseo Sirio', 'Fondo negoziale'] },
{ id: 's24', tipo: 'ponte', tema: 'chiaro', sopratitolo: 'Tutto in un posto, e il nuovo datore versa', fase: 'arrivo',
  nomi: ['Pubblico impiego', 'Nuovo lavoro'], insegne: ['Perseo Sirio', 'Fondo negoziale'] },
{ id: 's25', tipo: 'frase', tema: 'chiaro', sopratitolo: 'In questo caso',
  testo: 'Il trasferimento<br><b class="a">segue la tua vita lavorativa.</b>' },
{ id: 's26', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Se lavori ancora nella PA', illu: 'bilancia',
  titolo: 'Valuta<br>**numeri alla mano**' },
{ id: 's27', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Prima di trasferire · lezione 7.2',
  col: [{ h: 'Fondo di destinazione', t: 'Il suo ISC', grande: true },
        { h: 'Perseo Sirio', t: '**Il suo ISC**', grande: true }] },
sal('s28', 'Quanto vale l\'1% che perderesti, fino alla pensione', [], 1),
{ id: 's29', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Qualcuno te lo propone?', illu: 'domanda',
  titolo: 'Chi<br>**ci guadagna?**', sotto: 'A volte non sei tu.' },

// 5 · anche in entrata
ent('s30', 'Il trasferimento in entrata', 'ponte'),
ent('s31', 'Un fondo di un lavoro nel privato'),
{ id: 's32', tipo: 'figura', tema: 'chiaro', sopratitolo: 'La domanda', illu: 'lettera',
  titolo: 'Al fondo<br>**di provenienza**', sotto: 'Con le sue regole e i suoi moduli.' },
{ id: 's33', tipo: 'timeline', tema: 'chiaro', sopratitolo: 'Come funziona',
  tappe: [{ anno: '1', et: 'Domanda al vecchio fondo' }, { anno: '2', et: 'Avviso a Perseo Sirio' }, { anno: '3', et: 'Bonifico', key: true }] },
{ id: 's34', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Primo vantaggio', illu: 'salvadanaio',
  titolo: 'Tutto<br>**in un unico posto**', sotto: 'Costi bassi, un solo prospetto.' },
{ id: 's35', tipo: 'scala', tema: 'chiaro', sopratitolo: 'Secondo vantaggio: gli anni precedenti contano', a: 35 },
{ id: 's36', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Una vecchia posizione dimenticata?', illu: 'armadietto',
  titolo: 'Riunirla<br>**è semplice e utile**' },

// 6 · memo
{ id: 's37', tipo: 'frase', tema: 'profondo', sopratitolo: 'Da ricordare',
  testo: 'Se trasferisci mentre lavori nella PA,<br><b class="a">l\'1% dell\'ente resta indietro.</b>' },

// 7 · chiusura
{ id: 's38', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE, attive: [0] },
{ id: 's39', tipo: 'tasche', tema: 'chiaro', sopratitolo: 'TFR e 1,5% restano all\'INPS fino alla fine del lavoro', fase: 'anticipo', optanti: true },
{ id: 's40', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE, attive: [0, 1] },
{ id: 's41', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE },
{ id: 's42', tipo: 'mossa', tema: 'chiaro', sopratitolo: 'La mossa di oggi', illu: 'lente',
  titolo: 'Cerca **posizioni dimenticate**', passi: PASSI },
{ id: 's43', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Non ricordi quale fondo?', illu: 'telefono',
  titolo: 'Chiedi al vecchio<br>**datore di lavoro**' },
{ id: 's44', tipo: 'frase', tema: 'chiaro', sopratitolo: 'Ti propongono di spostare la posizione?',
  testo: 'Torna a questa lezione<br><b class="a">prima di rispondere.</b>' },
{ id: 's45', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Prossima lezione', illu: 'calendario',
  titolo: 'Lasciare il lavoro<br>**prima della pensione**' },
{ id: 's46', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Un reddito ponte',
  col: [{ h: 'Non più', t: 'Lo stipendio', grande: true },
        { h: 'Non ancora', t: '**La pensione**', grande: true }] },
{ id: 's47', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Rendita integrativa temporanea anticipata', illu: 'clessidra',
  titolo: 'La<br>**RITA**' },
{ id: 's48', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Ci vediamo nella lezione 8.4', illu: 'bussola',
  titolo: 'La<br>**RITA**' },

{ id: 's49', tipo: 'copertina', tema: 'profondo', chiusura: true, corso: CORSO, firma: FIRMA },
];
