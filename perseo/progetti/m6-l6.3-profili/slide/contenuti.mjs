// Contenuto delle 49 scene della lezione 6.3 — Tre comparti, sei profili.
// s02–s48 sono i blocchi 1–47 del copione, uno a uno.

const CORSO = 'Perseo Sirio senza segreti';
const FIRMA = 'Un corso CISL FP Padova Rovigo';

const COMPARTI = [
  { n: 'GARANTITO', t: 'Il più prudente' },
  { n: 'OBBLIGAZIONARIO', t: 'Titoli di debito' },
  { n: 'AZIONARIO', t: 'Soprattutto azioni' },
];
const comp = (id, sop, k) => ({ id, tipo: 'tre', tema: 'chiaro', sopratitolo: sop, box: COMPARTI.map((b, i) => ({ ...b, key: i === k })) });
const pro = (id, sop, k, key) => ({ id, tipo: 'profili', tema: 'chiaro', sopratitolo: sop, k, key });

const TRE_COSE = [
  'Tre comparti: **Garantito, Obbligazionario, Azionario**',
  '**Sei profili** da scegliere',
  'Azionario puro **solo nel Life Cycle**',
];

const PASSI = [
  { t: 'Entra nell\'**area riservata**' },
  { t: 'Sezione **investimento**' },
  { t: 'Guarda il **tuo profilo**', key: true },
];

export const SCENE = [
{ id: 's01', tipo: 'copertina', tema: 'chiaro',
  modulo: 'Modulo 6 · Dove vanno i tuoi soldi',
  titolo: 'Tre comparti,<br>sei profili', sottotitolo: 'Lezione 6.3',
  ente: `${CORSO} · ${FIRMA}` },

// 1 · apertura
{ id: 's02', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Un pittore con tre colori', illu: 'stelle',
  titolo: 'Moltissime<br>**sfumature**' },
{ id: 's03', tipo: 'frase', tema: 'chiaro', sopratitolo: 'Basta mescolarli',
  testo: 'Dalla stessa tavolozza,<br><b class="a">quadri molto diversi.</b>' },
{ id: 's04', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Perseo Sirio funziona così',
  col: [{ h: 'Tre colori di base', t: 'I **comparti**', grande: true },
        { h: 'Sei sfumature', t: 'I **profili**', grande: true }] },
{ id: 's05', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'La differenza',
  col: [{ h: 'Comparti', t: 'Dove il Fondo **investe**', grande: true },
        { h: 'Profili', t: 'Quelli che **scegli tu**', grande: true }] },
{ id: 's06', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Il profilo migliore?', illu: 'bilancia',
  titolo: 'In assoluto<br>**non esiste**' },
{ id: 's07', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Come sempre nel modulo', illu: 'campana',
  titolo: 'Informazioni generali,<br>**non consulenza finanziaria**', sotto: 'I rendimenti passati non garantiscono quelli futuri.' },

// 2 · tre comparti
comp('s08', 'I tre comparti', 0),
{ id: 's09', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Il Garantito', illu: 'scudo',
  titolo: 'Il più prudente:<br>**oscilla meno, rende meno**' },
{ id: 's10', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Il Garantito', illu: 'bilancia',
  titolo: 'Come la rivalutazione<br>**del TFR**', sotto: 'L\'unico con una garanzia, in casi precisi.' },
{ id: 's11', tipo: 'frase', tema: 'chiaro', sopratitolo: 'La garanzia',
  testo: 'Almeno i contributi versati,<br><b class="a">al netto di spese e somme già ritirate.</b>' },
{ id: 's12', tipo: 'tre', tema: 'chiaro', sopratitolo: 'I casi in cui vale',
  box: [{ n: 'PENSIONE', t: 'La prestazione' }, { n: 'DECESSO, INVALIDITÀ', t: 'E perdita del lavoro' }, { n: 'ANTICIPAZIONI', t: 'Le richieste ammesse' }] },
comp('s13', 'Il secondo comparto', 1),
comp('s14', 'Il terzo comparto', 2),
{ id: 's15', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Obbligazionario e Azionario', illu: 'calendario',
  titolo: 'Attivi da<br>**dicembre 2023**', sotto: 'Con criteri ambientali e sociali.' },
{ id: 's16', tipo: 'tabella', tema: 'chiaro', sopratitolo: 'Rendimento netto 2025 · Nota informativa',
  intestazioni: ['Comparto', 'Rendimento netto 2025'], colonne: ['55%', '45%'],
  righe: [['Garantito', '2,70%'], ['Obbligazionario', '2,17%'], ['Azionario', '**6,29%**']], chiave: [] },
{ id: 's17', tipo: 'frase', tema: 'chiaro', sopratitolo: 'Attenzione',
  testo: 'Un solo anno<br><b class="a">non dice nulla sul futuro.</b>' },

// 3 · sei profili
pro('s18', 'I sei profili che puoi scegliere', 6),
pro('s19', 'Il profilo Garantito', 1, 0),
pro('s20', 'Il profilo Obbligazionario', 2, 1),
pro('s21', 'Tre profili bilanciati', 5),
pro('s22', 'Bilanciato Prudente · 30% azioni', 5, 2),
pro('s23', 'Bilanciato Crescita · metà e metà', 5, 3),
pro('s24', 'Bilanciato Dinamico · 70% azioni', 5, 4),
pro('s25', 'Il Life Cycle: cambia da solo', 6, 5),
{ id: 's26', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Prossima lezione', illu: 'semaforo',
  titolo: 'Il Life Cycle,<br>**da capire bene**' },

// 4 · l'azionario puro
{ id: 's27', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Un dettaglio che sorprende', illu: 'domanda',
  titolo: 'L\'Azionario<br>**non si sceglie da solo**' },
{ id: 's28', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Nel modulo di adesione',
  col: [{ h: 'Comparto Azionario', t: 'Esiste', grande: true },
        { h: 'Profilo tutto azionario', t: '**Non c\'è**', grande: true }] },
{ id: 's29', tipo: 'cifre', tema: 'chiaro', sopratitolo: 'Il 100% in azioni',
  voci: [{ n: 'Life Cycle', t: 'Solo con questo profilo', key: true }, { n: '≤ 45', t: 'Anni di età' }] },
pro('s30', 'Tra i profili fissi, il massimo: 70%', 6, 4),
{ id: 's31', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Una scelta del Fondo', illu: 'scudo',
  titolo: 'Niente tutto in azioni<br>**vicino alla pensione**' },

// 5 · come orientarsi
{ id: 's32', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Come orientarsi?', illu: 'bussola',
  titolo: 'Due strumenti,<br>**entrambi gratuiti**' },
{ id: 's33', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Il questionario di autovalutazione', illu: 'cartella',
  titolo: 'All\'adesione,<br>**e quando vuoi**' },
{ id: 's34', tipo: 'tre', tema: 'chiaro', sopratitolo: 'Poche domande su',
  box: [{ n: 'ORIZZONTE', t: 'Gli anni che mancano' }, { n: 'ESPERIENZA', t: 'Con gli investimenti' }, { n: 'OSCILLAZIONI', t: 'Quanto le sopporti', key: true }] },
{ id: 's35', tipo: 'figura', tema: 'chiaro', sopratitolo: 'La consulenza gratuita', illu: 'dialogo',
  titolo: 'Si prenota<br>**dal sito del Fondo**', sotto: 'Anche prima di iscriversi.' },
{ id: 's36', tipo: 'frase', tema: 'chiaro', sopratitolo: 'Il corso',
  testo: 'Non sceglie per te.<br><b class="a">Ti dà i criteri per scegliere bene.</b>' },

// 6 · memo
{ id: 's37', tipo: 'frase', tema: 'profondo', sopratitolo: 'Da ricordare',
  testo: 'Tre colori, sei sfumature.<br><b class="a">La giusta dipende dai tuoi anni.</b>' },

// 7 · chiusura
{ id: 's38', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE, attive: [0] },
{ id: 's39', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE, attive: [0, 1] },
{ id: 's40', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE },
{ id: 's41', tipo: 'mossa', tema: 'chiaro', sopratitolo: 'La mossa di oggi', illu: 'schermo',
  titolo: 'Scopri<br>**in che profilo sei**', passi: PASSI },
{ id: 's42', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Area riservata', illu: 'schermo',
  titolo: 'Sezione investimento:<br>**il tuo profilo**' },
{ id: 's43', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Molti lo scoprono così', illu: 'lente',
  titolo: 'Scelto anni fa,<br>**o assegnato in automatico**' },
{ id: 's44', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Accanto ai due numeri della lezione 6.2',
  col: [{ h: 'Primo', t: '**Gli anni** alla pensione', grande: true },
        { h: 'Secondo', t: 'La tua risposta al **−10%**', grande: true }] },
{ id: 's45', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Non vanno d\'accordo?',
  col: [{ h: 'Rifai', t: 'Il **questionario**', grande: true },
        { h: 'Oppure prenota', t: 'La **consulenza**', grande: true }] },
{ id: 's46', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Prossima lezione', illu: 'semaforo',
  titolo: 'Il Life Cycle,<br>**il profilo che si muove da solo**' },
{ id: 's47', tipo: 'tre', tema: 'chiaro', sopratitolo: 'Vedremo',
  box: [{ n: 'COME', t: 'Cambia con l\'età' }, { n: 'QUANDO', t: 'Scattano i passaggi' }, { n: 'PER CHI', t: 'Può essere comodo', key: true }] },
{ id: 's48', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Ci vediamo nella lezione 6.4', illu: 'bussola',
  titolo: 'Il pilota<br>**automatico**' },

{ id: 's49', tipo: 'copertina', tema: 'profondo', chiusura: true, corso: CORSO, firma: FIRMA },
];
