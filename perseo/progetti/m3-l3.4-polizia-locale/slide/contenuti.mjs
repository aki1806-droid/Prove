// Contenuto delle 47 scene della lezione 3.4 — La polizia locale: dalla multa alla pensione.
// s02–s46 sono i blocchi 1–45 del copione, uno a uno.

const CORSO = 'Perseo Sirio senza segreti';
const FIRMA = 'Un corso CISL FP Padova Rovigo';

const TAPPE = [['1', 'Sanzione'], ['2', 'Proventi'], ['3', 'Quota dell\'ente'], ['4', 'Versamento'], ['5', 'Posizione']];

const MANCA = [
  { n: 'NON C\'È', t: 'Il **tuo** contributo' },
  { n: 'NON C\'È', t: 'L\'**1%** ordinario dell\'ente' },
  { n: 'NON C\'È', t: 'Il **TFR**' },
];

const DUE = [
  'L\'ente versa davvero la quota **art. 208**?',
  'Mi conviene **integrare**?',
];

const TRE_COSE = [
  'Multe stradali → **contributo** al Fondo',
  'Adesione **contrattuale**: solo quella quota',
  'Con l\'**integrazione**: 1% + 1% + TFR',
];

const PASSI = [
  { t: 'Entra nell\'**area riservata**' },
  { t: 'Cerca l\'ultimo versamento **art. 208**' },
  { t: 'Niente? Chiedi all\'**ufficio del personale**', key: true },
];

const per = (id, sop, at) => ({ id, tipo: 'percorso', tema: 'chiaro', sopratitolo: sop, tappe: TAPPE, at });
const man = id => ({ id, tipo: 'tre', tema: 'chiaro', sopratitolo: 'Con il solo art. 208', box: MANCA });
const sal = (id, sop, fase) => ({ id, tipo: 'salvadanai', tema: 'chiaro', sopratitolo: sop, fase });
const due = (id, attive) => ({ id, tipo: 'memo', tema: 'chiaro', sopratitolo: 'Due cose da controllare', voci: DUE, attive });

export const SCENE = [
{ id: 's01', tipo: 'copertina', tema: 'chiaro',
  modulo: 'Modulo 3 · Chi può aderire e come',
  titolo: 'Dalla multa<br>alla pensione', sottotitolo: 'Lezione 3.4 · La polizia locale',
  ente: `${CORSO} · ${FIRMA}` },

// 1 · apertura
{ id: 's02', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Una strada tutta sua', illu: 'scudo',
  titolo: 'La **polizia locale**' },
{ id: 's03', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Agenti e ufficiali',
  col: [{ h: 'Le multe stradali', t: 'Una **parte**', grande: true },
        { h: 'Diventa', t: 'Un **contributo** al Fondo', grande: true }] },
{ id: 's04', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Non è una curiosità', illu: 'catena',
  titolo: 'Un **meccanismo preciso**', sotto: 'Previsto dalla legge e dal contratto.' },
{ id: 's05', tipo: 'icone', tema: 'chiaro', sopratitolo: 'Questa lezione è per te se',
  voci: [{ icona: 'ospedale', t: 'Lavori in un comune' }, { icona: 'cartella', t: 'O in una provincia' }, { icona: 'persone', t: 'Hai colleghi della polizia locale', key: true }] },

// 2 · la legge
{ id: 's06', tipo: 'cifre', tema: 'chiaro', sopratitolo: 'Codice della Strada',
  voci: [{ n: 'Art. 208', t: 'Come gli enti usano i proventi delle sanzioni', key: true }] },
{ id: 's07', tipo: 'tre', tema: 'chiaro', sopratitolo: 'Una parte è vincolata',
  box: [{ n: 'FINALITÀ', t: 'Sicurezza stradale' }, { n: 'FINALITÀ', t: 'Manutenzione delle strade' }, { n: 'FINALITÀ', t: 'Previdenza complementare', key: true }] },
{ id: 's08', tipo: 'figura', tema: 'chiaro', sopratitolo: 'E una parte può andare', illu: 'salvadanaio',
  titolo: 'Alla **previdenza<br>complementare**', sotto: 'Del personale di polizia locale.' },
{ id: 's09', tipo: 'timeline', tema: 'chiaro', sopratitolo: 'Il contratto delle funzioni locali',
  tappe: [{ anno: 'Art. 208', et: 'La legge' }, { anno: 'Nov 2022', et: 'Contratto, art. 98', key: true }, { anno: 'Oggi', et: 'Unico fondo: Perseo Sirio' }] },
{ id: 's10', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'La quota',
  col: [{ h: 'La decide', t: 'Ogni **ente**, ogni anno', grande: true },
        { h: 'Arriva come', t: 'Contributo del **datore**', grande: true }] },
{ id: 's11', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Non è un regalo', illu: 'contratto',
  titolo: 'Una destinazione<br>**prevista per legge**', sotto: 'Solo per chi svolge funzioni di polizia locale.' },
per('s12', 'Dal verbale alla pensione', -1),

// 3 · adesione contrattuale
{ id: 's13', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Adesione contrattuale', illu: 'contratto',
  titolo: 'Iscritto<br>**senza firmare un modulo**' },
{ id: 's14', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Attenzione',
  col: [{ h: 'È', t: 'Un **inizio**', grande: true },
        { h: 'Non è', t: '**Tutto**', grande: true }] },
sal('s15', 'Con il solo art. 208', 'primo'),
{ id: 's16', tipo: 'figura', tema: 'chiaro', sopratitolo: 'In pratica', illu: 'salvadanaio',
  titolo: 'Una posizione aperta<br>**ma piccola**', sotto: 'Che cresce lentamente.' },
man('s17'),
{ id: 's18', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Chi è in TFS',
  col: [{ h: 'Con la sola adesione contrattuale', t: 'Resta in **TFS**', grande: true },
        { h: 'Nessun passaggio', t: 'Al **TFR**', grande: true }] },
{ id: 's19', tipo: 'cifre', tema: 'chiaro', sopratitolo: 'Solo aderenti contrattuali',
  voci: [{ n: '11 €', t: 'Quota associativa annua, sulla posizione', key: true }] },

// 4 · l'integrazione
{ id: 's20', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Se l\'agente integra', illu: 'calendario',
  titolo: 'Si aggiunge<br>**la contribuzione mensile**' },
{ id: 's21', tipo: 'tasche', tema: 'chiaro', sopratitolo: 'Ogni mese', fase: 'due' },
{ id: 's22', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Una accanto all\'altra',
  col: [{ h: 'Solo art. 208', t: '**Un** contributo all\'anno', grande: true },
        { h: 'Con integrazione', t: '?', grande: true }] },
{ id: 's23', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Una accanto all\'altra',
  col: [{ h: 'Solo art. 208', t: '**Un** contributo all\'anno', grande: true },
        { h: 'Con integrazione', t: 'Lo stesso **+ 1% + 1% + TFR** ogni mese', grande: true }] },
{ id: 's24', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Con l\'integrazione', illu: 'stelle',
  titolo: 'Come ogni iscritto<br>**+ la quota delle sanzioni**' },
{ id: 's25', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Volontaria ed esplicita', illu: 'lettera',
  titolo: 'Il **modulo<br>di integrazione**', sotto: 'Sul sito del Fondo, sezione polizia locale.' },
{ id: 's26', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'In servizio prima del 2001',
  col: [{ h: 'Con l\'integrazione', t: 'Dal **TFS** al **TFR**', grande: true },
        { h: 'Come visto', t: 'Nel **modulo 2**', grande: true }] },

// 5 · due salvadanai
{ id: 's27', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Stesso comando, stesso anno', illu: 'generazioni',
  titolo: 'Due agenti' },
sal('s28', 'Il primo resta così', 'primo'),
sal('s29', 'Il secondo integra', 'secondo'),
sal('s30', 'Con il tempo', 'tempo'),
{ id: 's31', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Lo stesso inizio', illu: 'lettera',
  titolo: 'Due arrivi diversi.<br>**Un solo modulo.**' },
{ id: 's32', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Integrare',
  col: [{ h: 'Versi', t: 'L\'**1%** del tuo stipendio', grande: true },
        { h: 'E sblocchi', t: 'L\'**1%** dell\'ente', grande: true }] },

// 6 · cosa controllare
due('s33', [0]),
{ id: 's34', tipo: 'figura', tema: 'chiaro', sopratitolo: 'La destinazione dei proventi', illu: 'calendario',
  titolo: 'Decisa dall\'ente<br>**anno per anno**', sotto: 'Non è scontata, né sempre uguale.' },
{ id: 's35', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Per verificarlo', illu: 'lente',
  titolo: 'Il **prospetto annuale**', sotto: 'Versamenti, con data e importo.' },
due('s36', [0, 1]),
{ id: 's37', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Se sei in TFS', illu: 'bilancia',
  titolo: 'Pesa la scelta', sotto: 'Aumenti di fine carriera e anni che mancano.' },
{ id: 's38', tipo: 'icone', tema: 'chiaro', sopratitolo: 'Chi ti aiuta',
  voci: [{ icona: 'chat', t: 'Consulenza telefonica del Fondo' }, { icona: 'persone', t: 'Il sindacato', key: true }] },
{ id: 's39', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Hai un collega in polizia locale?', illu: 'dialogo',
  titolo: 'Giragli<br>**questa lezione**' },

// 7 · memo
{ id: 's40', tipo: 'frase', tema: 'profondo', sopratitolo: 'Da ricordare',
  testo: 'Il contributo dell\'art. 208 è un buon inizio. <b class="a">Non è un punto d\'arrivo.</b>' },

// 8 · chiusura
{ id: 's41', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE, attive: [0] },
{ id: 's42', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE, attive: [0, 1] },
{ id: 's43', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE },
{ id: 's44', tipo: 'mossa', tema: 'chiaro', sopratitolo: 'La mossa di oggi · polizia locale', illu: 'lente',
  titolo: 'Trova **l\'ultimo versamento**', passi: PASSI },
{ id: 's45', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Se non trovi nulla', illu: 'telefono',
  titolo: 'Chiedi<br>**all\'ufficio del personale**' },
{ id: 's46', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Prossima lezione', illu: 'domanda',
  titolo: 'Si può **uscire** dal Fondo?', sotto: 'E chi altro può essere iscritto.' },

{ id: 's47', tipo: 'copertina', tema: 'profondo', chiusura: true, corso: CORSO, firma: FIRMA },
];
