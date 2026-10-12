// Contenuto delle 49 scene della lezione 5.5 — Le stratificazioni dei pubblici.
// s02–s48 sono i blocchi 1–47 del copione, uno a uno.

const CORSO = 'Perseo Sirio senza segreti';
const FIRMA = 'Un corso CISL FP Padova Rovigo';

const str = (id, sop, n, anno) => ({ id, tipo: 'strati', tema: 'chiaro', sopratitolo: sop, n, anno });

const RIGHE = [
  ['Fino al 2000', 'IRPEF ordinaria sull\'87,5%', 'Tassazione separata'],
  ['2001–2017', 'IRPEF ordinaria', 'Tassazione separata'],
  ['Dal 2018', '**15% → 9%**', '**15% → 9%**'],
];
const tab = (id, k, chiave) => ({ id, tipo: 'tabella', tema: 'chiaro', sopratitolo: 'Si tassano solo le somme non già tassate',
  intestazioni: ['Strato', 'Pensione in rendita', 'Capitale'], colonne: ['26%', '40%', '34%'], righe: RIGHE.slice(0, k), chiave });

const LIMITI = [
  { n: 'PRIMO', t: 'Il doppio del TFR destinato al Fondo' },
  { n: 'SECONDO', t: 'Il 12% del reddito complessivo' },
  { n: 'TERZO', t: '5.164,57 €' },
];
const lim = (id, sop, k) => ({ id, tipo: 'tre', tema: 'chiaro', sopratitolo: sop, box: LIMITI.map((b, i) => ({ ...b, key: k === 9 || i === k })) });

const TRE_COSE = [
  'Tre strati: **2000, 2017, oggi**',
  'Dal 2018: **15% → 9%**',
  'Gli strati li gestisce **il Fondo**',
];

const PASSI = [
  { t: 'Trova la tua **data di adesione**' },
  { t: 'Prima del 2018? **Segnatelo**' },
  { t: 'Vicino alla pensione: **simulazione**', key: true },
];

export const SCENE = [
{ id: 's01', tipo: 'copertina', tema: 'chiaro',
  modulo: 'Modulo 5 · Il fisco: dove si guadagna davvero',
  titolo: 'Le stratificazioni<br>dei pubblici', sottotitolo: 'Lezione 5.5',
  ente: `${CORSO} · ${FIRMA}` },

// 1 · apertura
str('s02', 'Le rocce raccontano la loro storia a strati', 3, 2026),
{ id: 's03', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Anche la tua posizione', illu: 'pilastri',
  titolo: 'È fatta a strati,<br>**se sei iscritto da tempo**' },
{ id: 's04', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Per i dipendenti pubblici', illu: 'calendario',
  titolo: 'Regole cambiate<br>**due volte**', sotto: 'E ogni periodo ha conservato le sue.' },
{ id: 's05', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'A chi serve',
  col: [{ h: 'Soprattutto', t: 'Iscritti **prima del 2018**', grande: true },
        { h: 'A tutti', t: 'Per capire la regola di oggi', grande: true }] },
{ id: 's06', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Come sempre nel modulo', illu: 'campana',
  titolo: 'Informazioni generali,<br>**non consulenza fiscale**', sotto: 'Esempi semplificati.' },

// 2 · tre strati
str('s07', 'Tre strati', 3, 2026),
str('s08', 'Il primo: fino al 2000', 1, 2026),
str('s09', 'Il secondo: dal 2001 al 2017', 2, 2026),
str('s10', 'Il terzo: dal 2018, l\'unico che cresce', 3, 2026),
{ id: 's11', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Perché il 2018?', illu: 'libro',
  titolo: 'I pubblici restano<br>**alla legge del 1993**' },
{ id: 's12', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Le regole nuove',
  col: [{ h: 'Lavoratori privati', t: '**Dal 2007**', grande: true },
        { h: 'Dipendenti pubblici', t: '**Dal 2018**', grande: true }] },
{ id: 's13', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Legge di bilancio', illu: 'pilastri',
  titolo: 'Dal 2018 le regole<br>**dei privati anche ai pubblici**' },
str('s14', 'Ogni strato conserva le regole del suo tempo', 3, 2026),

// 3 · le regole
tab('s15', 3, []),
tab('s16', 1, [0]),
tab('s17', 2, [1]),
tab('s18', 2, [0, 1]),
tab('s19', 3, [2]),
tab('s20', 3, [2]),
{ id: 's21', tipo: 'torta', tema: 'chiaro', sopratitolo: 'In tutti gli strati', fase: 'resto' },
{ id: 's22', tipo: 'frase', tema: 'chiaro', sopratitolo: 'Ormai lo sai',
  testo: 'Quello che ha già pagato<br><b class="a">non paga due volte.</b>' },

// 4 · la vecchia deduzione
{ id: 's23', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Prima del 2018', illu: 'bilancia',
  titolo: 'Anche la deduzione<br>**era diversa**' },
lim('s24', 'Si deduceva il minore tra tre limiti', 9),
lim('s25', 'Si deduceva il minore tra tre limiti', 0),
lim('s26', 'Vinceva sempre il più piccolo', 2),
lim('s27', 'Per gli optanti dal TFS', 0),
{ id: 's28', tipo: 'bicchiere', tema: 'chiaro', sopratitolo: 'Contributi non dedotti · lezione 5.4', fase: 'trabocca' },
{ id: 's29', tipo: 'cifre', tema: 'chiaro', sopratitolo: 'Dal 2018: un limite unico per tutti',
  voci: [{ n: '5.300 €', t: 'Dal 2026 · lezione 5.1', key: true }] },

// 5 · lo strato buono cresce
{ id: 's30', tipo: 'figura', tema: 'chiaro', sopratitolo: 'In pratica', illu: 'scudo',
  titolo: 'Non devi fare<br>**nessun calcolo**' },
{ id: 's31', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Ci pensa il Fondo', illu: 'ingranaggio',
  titolo: 'Calcola gli strati<br>**quando paga la prestazione**' },
str('s32', 'Lo strato buono cresce', 3, 2032),
str('s33', 'Gli strati vecchi restano fermi', 3, 2040),
{ id: 's34', tipo: 'scala', tema: 'chiaro', sopratitolo: 'Per chi ha aderito da poco: quasi tutto qui', a: 35 },
{ id: 's35', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Iscritto da molti anni?', illu: 'lente',
  titolo: 'Chiedi una simulazione<br>**vicino alla pensione**' },
{ id: 's36', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Ti aiuterà a scegliere',
  col: [{ h: 'Rendita', t: 'Quanto pesa ogni strato', grande: true },
        { h: 'Capitale', t: 'Quanto pesa ogni strato', grande: true }] },

// 6 · memo
{ id: 's37', tipo: 'frase', tema: 'profondo', sopratitolo: 'Da ricordare',
  testo: 'Ogni periodo conserva le sue regole.<br><b class="a">Dal 2018, quelle migliori valgono anche per te.</b>' },

// 7 · chiusura
{ id: 's38', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE, attive: [0] },
{ id: 's39', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE, attive: [0, 1] },
{ id: 's40', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE },
{ id: 's41', tipo: 'mossa', tema: 'chiaro', sopratitolo: 'La mossa di oggi', illu: 'calendario',
  titolo: 'La tua **data di adesione**', passi: PASSI },
{ id: 's42', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Prima del 2018?', illu: 'cartella',
  titolo: 'Segnati la simulazione<br>**per gli ultimi anni**' },
{ id: 's43', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Dal 2018 in poi?', illu: 'scudo',
  titolo: 'Per te vale già<br>**tutta la regola nuova**' },
{ id: 's44', tipo: 'tre', tema: 'chiaro', sopratitolo: 'Fine del Modulo 5 · tre vantaggi fiscali',
  box: [{ n: '5.1', t: 'Sui contributi' }, { n: '5.2', t: 'Sui rendimenti' }, { n: '5.3', t: 'Sulla prestazione' }] },
{ id: 's45', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'E due dettagli che li proteggono',
  col: [{ h: '5.4', t: 'I **non dedotti** da comunicare', grande: true },
        { h: '5.5', t: 'Gli **strati** dei pubblici', grande: true }] },
{ id: 's46', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Dove fa la differenza', illu: 'bilancia',
  titolo: 'Il fisco' },
{ id: 's47', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Prossimo modulo', illu: 'bussola',
  titolo: 'Dove vanno<br>**i tuoi soldi**' },
{ id: 's48', tipo: 'tre', tema: 'chiaro', sopratitolo: 'Modulo 6',
  box: [{ n: 'COMPARTI', t: 'Dove si investe' }, { n: 'PROFILI', t: 'Come scegliere' }, { n: 'RISCHIO', t: 'E rendimento', key: true }] },

{ id: 's49', tipo: 'copertina', tema: 'profondo', chiusura: true, corso: CORSO, firma: FIRMA },
];
