// Contenuto delle 49 scene della lezione 8.2 — Se cambi lavoro.
// s02–s48 sono i blocchi 1–47 del copione, uno a uno.

const CORSO = 'Perseo Sirio senza segreti';
const FIRMA = 'Un corso CISL FP Padova Rovigo';

const STRADE = ['Riscattare', 'Trasferire', 'Mantenere'];
const por = (id, sop, att, ap) => ({ id, tipo: 'porte', tema: 'chiaro', sopratitolo: sop, nomi: STRADE, attive: att, aperta: ap });

const RIGHE = [
  ['Che cosa ottieni', 'Soldi subito', 'Continuità altrove', 'Continuità qui'],
  ['Imposte', '**23%** se per scelta tua', 'Nessuna ora', 'Nessuna ora'],
  ['Anni di partecipazione', '**Si azzerano**', 'Si conservano', 'Si conservano'],
];
const tab = (id, k, chiave, sop = 'Le tre strade a confronto') => ({ id, tipo: 'tabella', tema: 'chiaro', sopratitolo: sop,
  intestazioni: ['', 'Riscattare', 'Trasferire', 'Mantenere'], colonne: ['28%', '24%', '24%', '24%'], righe: RIGHE.slice(0, k), chiave });

const TRE_COSE = [
  'Tra enti del Fondo: **nulla cambia**',
  'Se lasci la PA: **tre strade**',
  'Riscatto volontario: **23%**, anni azzerati',
];

const PASSI = [
  { t: 'Sito del Fondo → **Modulistica**' },
  { t: 'Trova il modulo di **liquidazione**' },
  { t: 'Leggilo, **senza fretta**', key: true },
];

export const SCENE = [
{ id: 's01', tipo: 'copertina', tema: 'chiaro',
  modulo: 'Modulo 8 · Prima della pensione',
  titolo: 'Se cambi<br>lavoro', sottotitolo: 'Lezione 8.2',
  ente: `${CORSO} · ${FIRMA}` },

// 1 · apertura
{ id: 's02', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Nella vita lavorativa', illu: 'bussola',
  titolo: 'Si<br>**cambia**', sotto: 'Spesso più di una volta.' },
{ id: 's03', tipo: 'tre', tema: 'chiaro', sopratitolo: 'I cambi più comuni',
  box: [{ n: 'TRASFERIMENTO', t: 'In un\'altra azienda sanitaria' }, { n: 'PROGRESSIONE', t: 'Di carriera' }, { n: 'CONCORSO', t: 'Vinto in un comune' }] },
{ id: 's04', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Oppure una scelta più netta', illu: 'armadietto',
  titolo: 'Lasciare<br>**il pubblico impiego**' },
{ id: 's05', tipo: 'figura', tema: 'chiaro', sopratitolo: 'E la posizione in Perseo Sirio?', illu: 'domanda',
  titolo: 'Dipende<br>**dal tipo di cambio**' },
{ id: 's06', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'In questa lezione',
  col: [{ h: 'Cambi', t: 'Che non toccano nulla', grande: true },
        { h: 'Cambi', t: '**Che aprono un bivio**', grande: true }] },

// 2 · i cambi che non toccano nulla
{ id: 's07', tipo: 'figura', tema: 'chiaro', sopratitolo: 'I più frequenti', illu: 'scudo',
  titolo: 'Non fai niente,<br>**non perdi niente**' },
{ id: 's08', tipo: 'ponte', tema: 'chiaro', sopratitolo: 'Da un ente all\'altro, senza interruzione', fase: 'ponte' },
{ id: 's09', tipo: 'ponte', tema: 'chiaro', sopratitolo: 'La posizione continua', fase: 'arrivo' },
{ id: 's10', tipo: 'ponte', tema: 'chiaro', sopratitolo: 'Per esempio', fase: 'arrivo', nomi: ['Azienda ospedaliera', 'ULSS'] },
{ id: 's11', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Nello stesso ente', illu: 'stelle',
  titolo: 'Una progressione<br>**verticale**', sotto: 'Anche qui: nulla cambia.' },
{ id: 's12', tipo: 'frase', tema: 'chiaro', sopratitolo: 'Il Fondo è esplicito',
  testo: 'Non si perdono i requisiti.<br><b class="a">Gli anni continuano a sommarsi.</b>' },
{ id: 's13', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Quindi',
  col: [{ h: 'Non puoi', t: 'Ritirare la posizione', grande: true },
        { h: 'Ma nemmeno', t: '**La metti in pericolo**', grande: true }] },
{ id: 's14', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Un consiglio pratico', illu: 'lente',
  titolo: 'Controlla<br>**i primi cedolini**', sotto: 'La trattenuta per il Fondo c\'è ancora?' },

// 3 · il bivio
{ id: 's15', tipo: 'tre', tema: 'chiaro', sopratitolo: 'Diverso è lasciare il pubblico impiego',
  box: [{ n: 'DIMISSIONI', t: '' }, { n: 'LICENZIAMENTO', t: '' }, { n: 'FINE DEL CONTRATTO', t: 'A termine', key: true }] },
{ id: 's16', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Oppure un lavoro nel privato', illu: 'contratto',
  titolo: 'Si perdono<br>**i requisiti**' },
por('s17', 'Tre strade, nessuna obbligatoria', [0, 1, 2]),
por('s18', 'Prima strada', [0], 0),
por('s19', 'Seconda strada · fondo del nuovo lavoro, aperto o PIP', [1], 1),
por('s20', 'Terza strada · anche senza nuovi versamenti', [2], 2),
{ id: 's21', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Una buona notizia', illu: 'clessidra',
  titolo: 'Nessun termine<br>**per decidere**' },
{ id: 's22', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Se non fai nulla', illu: 'salvadanaio',
  titolo: 'Resta nel Fondo,<br>**investita**' },

// 4 · come scegliere
tab('s23', 1, [0]),
tab('s24', 2, [1]),
{ id: 's25', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Riscatto per scelta tua',
  col: [{ h: 'Riscatto', t: '**23%**', grande: true },
        { h: 'Pensione complementare', t: 'Dal 15% al 9%', grande: true }] },
{ id: 's26', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Riscatto volontario',
  col: [{ h: 'Somme dal 2007', t: '**23%**', grande: true },
        { h: 'Parti più vecchie', t: 'Le regole degli strati', grande: true }] },
tab('s27', 3, [2]),
tab('s28', 3, [1, 2], 'Trasferire o mantenere'),
{ id: 's29', tipo: 'scala', tema: 'chiaro', sopratitolo: 'Gli anni contano per i requisiti e per il fisco', a: 35 },
{ id: 's30', tipo: 'frase', tema: 'chiaro', sopratitolo: 'Se non ti servono subito',
  testo: 'Il riscatto è raramente<br><b class="a">la scelta più vantaggiosa.</b>' },
{ id: 's31', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Il riscatto ha senso',
  col: [{ h: 'Solo se', t: '**Servono davvero**', grande: true },
        { h: 'E se', t: '**Servono adesso**', grande: true }] },

// 5 · e il TFR
{ id: 's32', tipo: 'tasche', tema: 'chiaro', sopratitolo: 'E il TFR figurativo?', fase: 'due' },
{ id: 's33', tipo: 'tasche', tema: 'chiaro', sopratitolo: 'Arriva al Fondo se esci dalla gestione pubblica', fase: 'unione' },
{ id: 's34', tipo: 'ponte', tema: 'chiaro', sopratitolo: 'Esempio: contratto a termine, poi riassunto', fase: 'ponte', nomi: ['Ente pubblico A', 'Ente pubblico B'] },
{ id: 's35', tipo: 'tasche', tema: 'chiaro', sopratitolo: 'La continuità non si interrompe: il TFR resta all\'INPS', fase: 'due' },
{ id: 's36', tipo: 'tasche', tema: 'chiaro', sopratitolo: 'Se lasci la PA: arriva al Fondo, con i tempi dell\'INPS', fase: 'unione' },

// 6 · memo
{ id: 's37', tipo: 'frase', tema: 'profondo', sopratitolo: 'Da ricordare',
  testo: 'Il riscatto si può fare sempre.<br><b class="a">Annullarlo, mai.</b>' },

// 7 · chiusura
{ id: 's38', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE, attive: [0] },
{ id: 's39', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE, attive: [0, 1] },
{ id: 's40', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE },
tab('s41', 3, [1, 2], 'Trasferire o mantenere: niente imposte ora, anni conservati'),
{ id: 's42', tipo: 'mossa', tema: 'chiaro', sopratitolo: 'La mossa di oggi', illu: 'lettera',
  titolo: 'Trova il modulo di **liquidazione**', passi: PASSI },
{ id: 's43', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Non ti serve ora', illu: 'scudo',
  titolo: 'Ti evita decisioni<br>**affrettate**' },
{ id: 's44', tipo: 'frase', tema: 'chiaro', sopratitolo: 'Prima di lasciare la PA',
  testo: 'Ricordati di questa lezione<br><b class="a">prima di firmare.</b>' },
{ id: 's45', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Prossima lezione', illu: 'contratto',
  titolo: 'Trasferire<br>**ad altro fondo**' },
{ id: 's46', tipo: 'tre', tema: 'chiaro', sopratitolo: 'Nella lezione 8.3',
  box: [{ n: 'QUANDO', t: 'Anche restando nella PA' }, { n: 'CHE COSA', t: 'Si porta con sé' }, { n: 'IL COSTO', t: 'Nascosto', key: true }] },
{ id: 's47', tipo: 'figura', tema: 'chiaro', sopratitolo: 'E il percorso inverso', illu: 'lettera',
  titolo: 'Portare qui<br>**un vecchio fondo**' },
{ id: 's48', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Ci vediamo nella lezione 8.3', illu: 'bussola',
  titolo: 'Trasferire<br>**ad altro fondo**' },

{ id: 's49', tipo: 'copertina', tema: 'profondo', chiusura: true, corso: CORSO, firma: FIRMA },
];
