// Contenuto delle 49 scene della lezione 10.1 — Tour dell'area riservata.
// s02–s48 sono i blocchi 1–47 del copione, uno a uno.

const CORSO = 'Perseo Sirio senza segreti';
const FIRMA = 'Un corso CISL FP Padova Rovigo';

const cas = (id, sop, at, extra = {}) => ({ id, tipo: 'cassettiera', tema: 'chiaro', sopratitolo: sop, at, ...extra });
const SPUNTE = [0, 1, 2, 3, 4];

const RIGHE = [
  ['Trova il **prospetto annuale**', 'Documentazione', '2.5, 4.5'],
  ['Controlla il **profilo**', 'Investimento', '6.3'],
  ['Controlla il **TFR virtuale**', 'Investimento', '6.5'],
  ['Designa i **beneficiari**', 'Soggetti designati', '3.5, 8.5'],
  ['Cambia la tua **aliquota**', 'Contribuzione', '4.4'],
  ['Aggiorna i **recapiti**', 'Anagrafica', '9.4'],
];
const tab = (id, chiave, sop = 'Le mosse del corso, cassetto per cassetto') => ({ id, tipo: 'tabella', tema: 'chiaro', sopratitolo: sop,
  intestazioni: ['Mossa', 'Cassetto', 'Lezione'], colonne: ['44%', '34%', '22%'], righe: RIGHE, chiave });

const PROSPETTO = [
  'Contributi **del lavoratore**',
  'Contributi **dell\'ente**',
  'TFR e TFS **virtuali** (INPS)',
  'Risultato **della gestione**',
  'Posizione **complessiva**',
];
const pro = (id, attive) => ({ id, tipo: 'memo', tema: 'chiaro', sopratitolo: 'Il prospetto annuale, riga per riga', voci: PROSPETTO, attive });

const TRE_COSE = [
  'Otto cassetti, **tutto online**',
  'Il prospetto è il **documento chiave**',
  'Un **controllo all\'anno**',
];

const PASSI = [
  { t: 'Riprendi la **tabella** delle mosse' },
  { t: 'Una sera, **mezz\'ora**' },
  { t: 'Fai **tutte le mosse**', key: true },
];

export const SCENE = [
{ id: 's01', tipo: 'copertina', tema: 'chiaro',
  modulo: 'Modulo 10 · Decidere con i tuoi numeri',
  titolo: 'L\'area riservata', sottotitolo: 'Lezione 10.1',
  ente: `${CORSO} · ${FIRMA}` },

// 1 · apertura
{ id: 's02', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Una chiave, una porta', illu: 'lucchetto',
  titolo: 'Una stanza<br>**in ordine**' },
{ id: 's03', tipo: 'tre', tema: 'chiaro', sopratitolo: 'Nel corso, nell\'area riservata',
  box: [{ n: '1', t: 'Controllare' }, { n: '2', t: 'Aggiornare' }, { n: '3', t: 'Scegliere', key: true }] },
cas('s04', 'Un giro completo, cassetto per cassetto', -1),
{ id: 's05', tipo: 'tre', tema: 'chiaro', sopratitolo: 'Il cruscotto della tua posizione',
  box: [{ n: 'QUANTO', t: 'Hai' }, { n: 'DOVE', t: 'È investito' }, { n: 'CHI', t: 'È designato', key: true }] },
{ id: 's06', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Quasi tutto da solo', illu: 'schermo',
  titolo: 'Da casa,<br>**senza appuntamenti**' },
{ id: 's07', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Le credenziali', illu: 'lettera',
  titolo: 'Con la lettera<br>**di conferma dell\'iscrizione**' },

// 2 · otto cassetti
cas('s08', 'Otto cassetti', -1),
cas('s09', 'Anagrafica: email e cellulare', 0),
{ id: 's10', tipo: 'frase', tema: 'chiaro', sopratitolo: 'Lezione 9.4',
  testo: 'Recapiti vecchi,<br><b class="a">avvisi persi.</b>' },
cas('s11', 'Contribuzione: versamenti e aliquota', 1),
cas('s12', 'Contribuzione: volontari e non dedotti', 1),
cas('s13', 'Investimento: il profilo, per tasca reale e TFR', 2),
cas('s14', 'Soggetti designati', 3),
cas('s15', 'Documentazione: il prospetto annuale', 4),
cas('s16', 'Anticipi · modulo 8', 5),
cas('s17', 'Riscatti, e la domanda di pensione · lezione 9.5', 6),
cas('s18', 'Trasferimenti, in uscita e in entrata', 7),

// 3 · le mosse del corso
{ id: 's19', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Ogni lezione, una mossa', illu: 'lente',
  titolo: 'Le mosse<br>**di oggi**' },
tab('s20', []),
tab('s21', [0, 1, 2]),
tab('s22', [3, 4]),
tab('s23', [5]),
{ id: 's24', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Ferma il video', illu: 'telefono',
  titolo: 'Fotografa<br>**la tabella**' },
cas('s25', 'Una volta sola: la posizione in ordine', -1, { spunte: [0, 1, 2, 3, 4] }),
{ id: 's26', tipo: 'tre', tema: 'chiaro', sopratitolo: 'E sai',
  box: [{ n: 'IL TFR', t: 'A cosa è collegato' }, { n: 'CHI', t: 'Riceverebbe la posizione' }, { n: 'COME', t: 'Il Fondo ti contatta' }] },
{ id: 's27', tipo: 'cifre', tema: 'chiaro', sopratitolo: 'Meno tempo di quanto pensi',
  voci: [{ n: '30 min', t: 'Una sera', key: true }] },

// 4 · il prospetto
{ id: 's28', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Il documento più importante · modulo 2', illu: 'cartella',
  titolo: 'Il prospetto<br>**annuale**' },
pro('s29', [0, 1]),
pro('s30', [0, 1, 2]),
pro('s31', [0, 1, 2, 3, 4]),
{ id: 's32', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Uno accanto all\'altro',
  col: [{ h: 'Prospetto', t: 'Dell\'anno scorso', grande: true },
        { h: 'Prospetto', t: '**Di quest\'anno**', grande: true }] },
{ id: 's33', tipo: 'frase', tema: 'chiaro', sopratitolo: 'La regola',
  testo: 'La posizione cresce almeno di quanto hai versato,<br><b class="a">salvo gli anni di mercati negativi.</b>' },
{ id: 's34', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Qualcosa non torna? Chiedi',
  col: [{ h: 'Al Fondo', t: 'Numero verde', grande: true },
        { h: 'All\'ente', t: '**Ufficio del personale**', grande: true }] },

// 5 · un'abitudine
{ id: 's35', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Quando arriva il prospetto', illu: 'calendario',
  titolo: 'Un appuntamento<br>**con te stesso**' },
{ id: 's36', tipo: 'tre', tema: 'chiaro', sopratitolo: 'Dieci minuti, tre cassetti',
  box: [{ n: '1', t: 'Documentazione' }, { n: '2', t: 'Investimento' }, { n: '3', t: 'Soggetti designati' }] },
{ id: 's37', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Tutta la manutenzione', illu: 'orologio',
  titolo: 'Poco tempo,<br>**con regolarità**' },

// 6 · memo
{ id: 's38', tipo: 'frase', tema: 'profondo', sopratitolo: 'Da ricordare',
  testo: 'Mezz\'ora una volta,<br><b class="a">dieci minuti l\'anno.</b>' },

// 7 · chiusura
{ id: 's39', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE, attive: [0] },
cas('s40', 'Otto cassetti, tutto online', -1, { spunte: SPUNTE }),
{ id: 's41', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE, attive: [0, 1] },
{ id: 's42', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE },
{ id: 's43', tipo: 'mossa', tema: 'chiaro', sopratitolo: 'La mossa di oggi', illu: 'cartella',
  titolo: 'Fai **tutte le mosse** della tabella', passi: PASSI },
{ id: 's44', tipo: 'cifre', tema: 'chiaro', sopratitolo: 'Una sera',
  voci: [{ n: '30 min', t: 'Mezz\'ora' }, { n: '6', t: 'Mosse', key: true }] },
{ id: 's45', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Prossima lezione', illu: 'bussola',
  titolo: 'Guardiamo<br>**avanti**' },
{ id: 's46', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Quanto riceverai?',
  col: [{ h: 'Il simulatore', t: 'Del Fondo', grande: true },
        { h: 'La proiezione', t: '**La mia pensione complementare**', grande: true }] },
{ id: 's47', tipo: 'frase', tema: 'chiaro', sopratitolo: 'Con la giusta prudenza',
  testo: 'Una stima,<br><b class="a">non una promessa.</b>' },
{ id: 's48', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Ci vediamo nella lezione 10.2', illu: 'schermo',
  titolo: 'Simulatore<br>**e proiezione**' },

{ id: 's49', tipo: 'copertina', tema: 'profondo', chiusura: true, corso: CORSO, firma: FIRMA },
];
