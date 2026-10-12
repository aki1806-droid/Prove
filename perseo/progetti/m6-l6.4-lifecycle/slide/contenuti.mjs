// Contenuto delle 49 scene della lezione 6.4 — Life Cycle: il pilota automatico.
// s02–s48 sono i blocchi 1–47 del copione, uno a uno.

const CORSO = 'Perseo Sirio senza segreti';
const FIRMA = 'Un corso CISL FP Padova Rovigo';

const lc = (id, sop, a, fase) => ({ id, tipo: 'lifecycle', tema: 'chiaro', sopratitolo: sop, a, fase: fase ?? 'percorso' });

const CHI = [
  { n: 'CHI LO SCEGLIE', t: 'All\'adesione o dopo' },
  { n: 'CHI NON SCEGLIE', t: 'Col modulo · da dic. 2023' },
  { n: 'CONTRATTUALI', t: 'La polizia locale' },
];
const chi = (id, k) => ({ id, tipo: 'tre', tema: 'chiaro', sopratitolo: 'Chi si ritrova nel Life Cycle', box: CHI.map((b, i) => ({ ...b, key: i === k })) });

const TRE_COSE = [
  'Più azioni da giovani, **più prudenza dopo**',
  '**Default** per chi non sceglie col modulo',
  'Silenzio-assenso: **si parte dal Garantito**',
];

const PASSI = [
  { t: 'Area riservata: **sei nel Garantito?**' },
  { t: 'Rifai il **questionario**' },
  { t: 'Dubbi? **Consulenza gratuita**', key: true },
];

export const SCENE = [
{ id: 's01', tipo: 'copertina', tema: 'chiaro',
  modulo: 'Modulo 6 · Dove vanno i tuoi soldi',
  titolo: 'Life Cycle:<br>il pilota automatico', sottotitolo: 'Lezione 6.4',
  ente: `${CORSO} · ${FIRMA}` },

// 1 · apertura
{ id: 's02', tipo: 'figura', tema: 'chiaro', sopratitolo: 'In un volo lungo', illu: 'bussola',
  titolo: 'Il pilota automatico<br>**fa gran parte del lavoro**' },
{ id: 's03', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Dal decollo alla pista',
  col: [{ h: 'In crociera', t: '**Quota alta**', grande: true },
        { h: 'In avvicinamento', t: 'Scende, piano piano', grande: true }] },
{ id: 's04', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Il sesto profilo', illu: 'orologio',
  titolo: 'Life Cycle' },
{ id: 's05', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Con i tuoi investimenti',
  col: [{ h: 'Da giovane', t: '**Più crescita**', grande: true },
        { h: 'Verso la pensione', t: '**Più prudenza**', grande: true }] },
{ id: 's06', tipo: 'tre', tema: 'chiaro', sopratitolo: 'In questa lezione',
  box: [{ n: 'COME', t: 'Funziona e quando scatta' }, { n: 'A CHI', t: 'Si applica senza sceglierlo' }, { n: 'ATTENZIONE', t: 'Il suo limite', key: true }] },
{ id: 's07', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Come sempre nel modulo', illu: 'campana',
  titolo: 'Informazioni generali,<br>**non consulenza finanziaria**', sotto: 'I rendimenti passati non garantiscono quelli futuri.' },

// 2 · il percorso
lc('s08', 'Il percorso: cinque tratti', 30),
lc('s09', 'Fino a 45 anni: tutto Azionario', 35),
lc('s10', 'L\'unico modo per il 100% in azioni', 40),
lc('s11', 'Da 46 a 50 anni', 48),
lc('s12', 'Da 51 a 55 anni', 53),
lc('s13', 'Da 56 a 60 anni', 58),
lc('s14', 'Da 61 anni: l\'atterraggio', 63),
{ id: 's15', tipo: 'figura', tema: 'chiaro', sopratitolo: 'In automatico', illu: 'ingranaggio',
  titolo: 'Nessun modulo,<br>**nessuna data da ricordare**' },
{ id: 's16', tipo: 'cifre', tema: 'chiaro', sopratitolo: 'Il costo degli spostamenti',
  voci: [{ n: '0 €', t: 'Il pilota automatico lavora gratis', key: true }] },

// 3 · chi si ritrova nel life cycle
chi('s17', 0),
chi('s18', 1),
chi('s19', 2),
{ id: 's20', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Attenzione', illu: 'campana',
  titolo: 'Un\'eccezione<br>**molto importante**' },
{ id: 's21', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Chi entra per silenzio-assenso · modulo 3',
  col: [{ h: 'Non parte dal', t: 'Life Cycle', grande: true },
        { h: 'Parte dal', t: '**Garantito**', grande: true }] },
{ id: 's22', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Nel Garantito', illu: 'scudo',
  titolo: 'Ci resta,<br>**finché non cambia lui**', sotto: 'Il pilota automatico non si accende.' },
{ id: 's23', tipo: 'cifre', tema: 'chiaro', sopratitolo: 'Un neoassunto di 25 anni',
  voci: [{ n: '40', t: 'Anni di carriera davanti', key: true }, { n: 'Garantito', t: 'Il profilo più prudente' }] },
{ id: 's24', tipo: 'frase', tema: 'chiaro', sopratitolo: 'Ricordi la lezione 6.2?',
  testo: 'Con un orizzonte così lungo,<br><b class="a">il tempo per recuperare c\'è.</b>' },

// 4 · il limite
{ id: 's25', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Il pregio: la comodità', illu: 'bussola',
  titolo: 'Ti accompagna<br>**senza pensarci**' },
{ id: 's26', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Ma c\'è un limite', illu: 'lente',
  titolo: 'Da conoscere<br>**prima di sceglierlo**' },
{ id: 's27', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Il pilota guarda l\'orologio, non la pista',
  col: [{ h: 'Segue', t: '**L\'età anagrafica**', grande: true },
        { h: 'Non segue', t: 'La data della pensione', grande: true }] },
lc('s28', 'Due colleghi di 61 anni', 61, 'due'),
lc('s29', 'Stesso passaggio, uscite diverse', 61, 'due'),
{ id: 's30', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Per la maggior parte delle persone', illu: 'persona',
  titolo: 'Funziona bene:<br>**è pensato sulla media**' },
{ id: 's31', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Esci molto prima o molto dopo?', illu: 'calendario',
  titolo: 'Il percorso<br>**potrebbe non essere su misura**' },
{ id: 's32', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Altri risparmi?', illu: 'salvadanaio',
  titolo: 'Valuta un profilo fisso,<br>**aggiornato da te**' },

// 5 · l'appuntamento annuale
{ id: 's33', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Un consiglio pratico', illu: 'bussola',
  titolo: 'Qualunque profilo<br>**tu scelga**' },
{ id: 's34', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Una volta l\'anno', illu: 'calendario',
  titolo: 'Un appuntamento<br>**con te stesso**', sotto: 'Quando arriva il prospetto annuale.' },
{ id: 's35', tipo: 'tre', tema: 'chiaro', sopratitolo: 'Dieci minuti, due domande',
  box: [{ n: '10 MINUTI', t: 'Una volta l\'anno' }, { n: 'DOMANDA 1', t: 'La mia situazione è cambiata?' }, { n: 'DOMANDA 2', t: 'Il profilo è ancora coerente?', key: true }] },
{ id: 's36', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'La risposta',
  col: [{ h: 'Sì', t: '**Il volo prosegue**', grande: true },
        { h: 'No', t: 'Questionario o consulenza', grande: true }] },

// 6 · memo
{ id: 's37', tipo: 'frase', tema: 'profondo', sopratitolo: 'Da ricordare',
  testo: 'Il pilota automatico aiuta.<br><b class="a">Ma il volo resta tuo.</b>' },

// 7 · chiusura
{ id: 's38', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE, attive: [0] },
{ id: 's39', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE, attive: [0, 1] },
{ id: 's40', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE },
{ id: 's41', tipo: 'mossa', tema: 'chiaro', sopratitolo: 'La mossa di oggi', illu: 'schermo',
  titolo: 'Entrato in silenzio?<br>**Rivedi il profilo**', passi: PASSI },
{ id: 's42', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Area riservata', illu: 'schermo',
  titolo: 'Sei ancora<br>**nel Garantito?**', sotto: 'È davvero adatto ai tuoi anni?' },
{ id: 's43', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Per rispondere', illu: 'cartella',
  titolo: 'Il questionario,<br>**e la consulenza**' },
lc('s44', 'Nel Life Cycle? Segnati 45, 50, 55, 60', 45),
{ id: 's45', tipo: 'figura', tema: 'chiaro', sopratitolo: 'L\'appuntamento annuale', illu: 'orologio',
  titolo: 'Dieci minuti<br>**l\'anno**' },
{ id: 's46', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Prossima lezione', illu: 'semaforo',
  titolo: 'La grande novità<br>**del 2026**' },
{ id: 's47', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Soprattutto per i nuovi assunti', illu: 'persona',
  titolo: 'Riguarda<br>**il tuo TFR**' },
{ id: 's48', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Ci vediamo nella lezione 6.5', illu: 'bussola',
  titolo: 'Le regole<br>**cambiano**' },

{ id: 's49', tipo: 'copertina', tema: 'profondo', chiusura: true, corso: CORSO, firma: FIRMA },
];
