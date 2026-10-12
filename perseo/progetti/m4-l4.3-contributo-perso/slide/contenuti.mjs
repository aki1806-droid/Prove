// Contenuto delle 49 scene della lezione 4.3 — Il contributo che perdi.
// s02–s48 sono i blocchi 1–47 del copione, uno a uno.

const CORSO = 'Perseo Sirio senza segreti';
const FIRMA = 'Un corso CISL FP Padova Rovigo';

const MODI = [
  { n: 'NON ADERIRE', t: 'Il contributo dell\'ente non arriva mai' },
  { n: 'SOSPENDERE', t: 'Si ferma insieme al tuo' },
  { n: 'TRASFERIRE', t: 'Il nuovo fondo non lo riceve' },
];
const modi = (id, k) => ({ id, tipo: 'tre', tema: 'chiaro', sopratitolo: 'Tre modi per perderlo', box: MODI.map((b, i) => ({ ...b, key: i === k })) });
const bus = (id, sop, stato, da) => ({ id, tipo: 'buste', tema: 'chiaro', sopratitolo: sop, stato, da });

const TRE_COSE = [
  'L\'1% dell\'ente **solo agli iscritti**',
  'Serve almeno **il tuo 1%**',
  'Si perde **sospendendo** o **trasferendo**',
];

const PASSI = [
  { t: 'Calcola l\'**1%** della tua retribuzione' },
  { t: 'Moltiplica per gli **anni che mancano**' },
  { t: 'È il valore della **busta**', key: true },
];

export const SCENE = [
{ id: 's01', tipo: 'copertina', tema: 'chiaro',
  modulo: 'Modulo 4 · Quanto si versa',
  titolo: 'Il contributo<br>che perdi', sottotitolo: 'Lezione 4.3',
  ente: `${CORSO} · ${FIRMA}` },

// 1 · apertura
bus('s02', 'Ogni mese, sulla tua scrivania', 'una'),
{ id: 's03', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Una piccola somma', illu: 'lettera',
  titolo: 'Una busta<br>**con il tuo nome**', sotto: 'Non un regalo: parte del tuo trattamento.' },
bus('s04', 'Se non firmi, sparisce', 'perse'),
bus('s05', 'Il contributo dell\'ente', 'tutte'),
{ id: 's06', tipo: 'icone', tema: 'chiaro', sopratitolo: 'In questa lezione',
  voci: [{ icona: 'certificato', t: 'Quando spetta' }, { icona: 'euro', t: 'Quanto vale' }, { icona: 'occhio', t: 'Come si perde', key: true }] },

// 2 · quando spetta
{ id: 's07', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Le regole', illu: 'libro',
  titolo: 'Due regole,<br>**nella Nota informativa**' },
{ id: 's08', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Prima regola',
  col: [{ h: 'Spetta a chi è iscritto', t: 'Al **fondo negoziale**', grande: true },
        { h: 'Per noi', t: '**Perseo Sirio**', grande: true }] },
{ id: 's09', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Chi non si iscrive non lo riceve',
  col: [{ h: 'Non in', t: '**Busta paga**', grande: true },
        { h: 'Né in', t: '**Un altro fondo**', grande: true }] },
{ id: 's10', tipo: 'ingressi', tema: 'chiaro', sopratitolo: 'Seconda regola: almeno il tuo 1%', at: 0 },
{ id: 's11', tipo: 'ingressi', tema: 'chiaro', sopratitolo: 'E scatta l\'1% dell\'ente', at: 1 },
{ id: 's12', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Se versi di più',
  col: [{ h: 'Tu versi', t: '**2%, 3%…**', grande: true },
        { h: 'L\'ente', t: 'Resta **all\'1%**', grande: true }] },
{ id: 's13', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Il contributo dell\'ente', illu: 'pilastri',
  titolo: 'È fisso:<br>**lo sblocca il tuo minimo**' },
{ id: 's14', tipo: 'icone', tema: 'chiaro', sopratitolo: 'Vale per tutti',
  voci: [{ icona: 'persone', t: 'Assunti prima e dopo il 2001' }, { icona: 'orologio', t: 'Tempo pieno e part-time' }, { icona: 'documento', t: 'Entrati per silenzio-assenso' }] },

// 3 · quanto vale
{ id: 's15', tipo: 'cifre', tema: 'chiaro', sopratitolo: 'Quanto vale la busta?',
  voci: [{ n: '30.000 €', t: 'Retribuzione utile all\'anno · esempio semplificato', key: true }] },
{ id: 's16', tipo: 'conto', tema: 'chiaro', sopratitolo: 'L\'1% dell\'ente',
  voci: [{ v: '30.000 €', lb: 'retribuzione' }, { v: '1%', lb: 'ente' }, { v: '300 €', lb: 'all\'anno' }], op: ['×', '='] },
{ id: 's17', tipo: 'tre', tema: 'chiaro', sopratitolo: 'Cambia la cifra, non la logica',
  box: [{ n: '25.000 €', t: '250 € l\'anno' }, { n: '30.000 €', t: '300 € l\'anno', key: true }, { n: '40.000 €', t: '400 € l\'anno' }] },
{ id: 's18', tipo: 'conto', tema: 'chiaro', sopratitolo: 'In una carriera',
  voci: [{ v: '300 €', lb: 'all\'anno' }, { v: '30', lb: 'anni' }, { v: '9.000 €', lb: 'solo dall\'ente' }], op: ['×', '='] },
{ id: 's19', tipo: 'figura', tema: 'chiaro', sopratitolo: 'E non restano fermi', illu: 'stelle',
  titolo: 'Investiti<br>**insieme ai tuoi**' },
{ id: 's20', tipo: 'composto', tema: 'chiaro', sopratitolo: 'L\'effetto del tempo · modulo 1', fase: 'linee' },
{ id: 's21', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Con gli aumenti contrattuali',
  col: [{ h: 'Cresce', t: 'La **retribuzione**', grande: true },
        { h: 'E con lei', t: 'L\'**1% dell\'ente**', grande: true }] },
{ id: 's22', tipo: 'cifre', tema: 'chiaro', sopratitolo: 'Quanto lascia sul tavolo chi non aderisce',
  voci: [{ n: '9.000 €+', t: 'Una stima prudente: la cifra vera è più alta', key: true }] },

// 4 · tre modi per perderlo
modi('s23', -1),
modi('s24', 0),
modi('s25', 1),
{ id: 's26', tipo: 'tasche', tema: 'chiaro', sopratitolo: 'Si fermano tuo ed ente, il TFR continua', fase: 'due', monete: { reale: [] } },
modi('s27', 2),
{ id: 's28', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Dopo il trasferimento', illu: 'catena',
  titolo: 'Il contributo dell\'ente<br>**non arriva più**' },
{ id: 's29', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Il problema è il costo?',
  col: [{ h: 'Conviene', t: 'Ridurre **al minimo**', grande: true },
        { h: 'Non conviene', t: '**Sospendere**', grande: true }] },
bus('s30', 'Chi sospende a luglio', 'da', 6),
{ id: 's31', tipo: 'icone', tema: 'chiaro', sopratitolo: 'Prima di sospendere o trasferire',
  voci: [{ icona: 'euro', t: 'Fai due conti' }, { icona: 'chat', t: 'Chiedi al Fondo' }, { icona: 'persone', t: 'O al sindacato', key: true }] },

// 5 · quando manca lo stipendio
{ id: 's32', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Un caso diverso', illu: 'orologio',
  titolo: 'Quando<br>**manca lo stipendio**' },
{ id: 's33', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Per esempio', illu: 'calendario',
  titolo: 'Aspettativa<br>**non retribuita**' },
{ id: 's34', tipo: 'tasche', tema: 'chiaro', sopratitolo: 'Si ferma tutto, anche il TFR figurativo', fase: 'due', monete: { reale: [], fig: [] } },
{ id: 's35', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Senza fare nulla', illu: 'casa',
  titolo: 'Tutto riprende<br>**al rientro**', sotto: 'E non si perde niente.' },
{ id: 's36', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Assenze',
  col: [{ h: 'Senza retribuzione', t: '**Tutto sospeso**', grande: true },
        { h: 'Retribuite, anche ridotte', t: '**Si versa**', grande: true }] },
{ id: 's37', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Lo comunica l\'amministrazione', illu: 'lente',
  titolo: 'Tu controlla<br>**il prospetto annuale**' },

// 6 · la busta
bus('s38', 'Ricorda la busta', 'tutte'),
{ id: 's39', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Ogni mese, a ogni collega', illu: 'lettera',
  titolo: 'Sta a te<br>**prenderla**' },
{ id: 's40', tipo: 'figura', tema: 'chiaro', sopratitolo: 'E se l\'hai già presa', illu: 'semaforo',
  titolo: 'Non lasciarla cadere<br>**per una sospensione in fretta**' },

// 7 · memo
{ id: 's41', tipo: 'frase', tema: 'profondo', sopratitolo: 'Da ricordare',
  testo: 'Se devi risparmiare, riduci al minimo. <b class="a">Non fermarti:</b> perderesti anche l\'ente.' },

// 8 · chiusura
{ id: 's42', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE, attive: [0] },
{ id: 's43', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE, attive: [0, 1] },
{ id: 's44', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE },
{ id: 's45', tipo: 'mossa', tema: 'chiaro', sopratitolo: 'La mossa di oggi', illu: 'lettera',
  titolo: 'Il valore **della tua busta**', passi: PASSI },
{ id: 's46', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Senza rendimenti né aumenti', illu: 'salvadanaio',
  titolo: 'Un numero prudente,<br>**ma significativo**' },
{ id: 's47', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Quel numero è',
  col: [{ h: 'Se non hai aderito', t: 'Quanto lasci **sul tavolo**', grande: true },
        { h: 'Se hai aderito', t: 'Quanto **metti da parte**', grande: true }] },
{ id: 's48', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Prossima lezione', illu: 'termometro',
  titolo: 'Aumentare, ridurre,<br>**versare di più**' },

{ id: 's49', tipo: 'copertina', tema: 'profondo', chiusura: true, corso: CORSO, firma: FIRMA },
];
