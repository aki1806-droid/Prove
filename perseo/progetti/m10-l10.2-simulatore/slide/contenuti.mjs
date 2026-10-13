// Contenuto delle 49 scene della lezione 10.2 — Il simulatore e la proiezione.
// s02–s48 sono i blocchi 1–47 del copione, uno a uno.

const CORSO = 'Perseo Sirio senza segreti';
const FIRMA = 'Un corso CISL FP Padova Rovigo';

const ven = (id, sop, extra = {}) => ({ id, tipo: 'ventaglio', tema: 'chiaro', sopratitolo: sop, ...extra });
const STR = (id, chiave) => ({ id, tipo: 'tabella', tema: 'chiaro', sopratitolo: 'Due strumenti di stima',
  intestazioni: ['Strumento', 'Che cosa fa'], colonne: ['50%', '50%'],
  righe: [['**La mia pensione complementare**', 'Proiezione con ipotesi standard COVIP'], ['**Simulatore** sul sito', 'Calcola con i tuoi dati']], chiave });
const LEVE = [
  'La tua **aliquota** di contributo',
  'Il **profilo**, per contributi e TFR',
  'Gli **anni** di permanenza',
];
const lev = (id, attive) => ({ id, tipo: 'memo', tema: 'chiaro', sopratitolo: 'Tre variabili che puoi muovere', voci: LEVE, ...(attive ? { attive } : {}) });

const TRE_COSE = [
  'Proiezione standard **e simulatore**',
  'Leggila come **un ventaglio**',
  'Affiancala alla **pensione INPS**',
];

const PASSI = [
  { t: 'Cambia **l\'aliquota**' },
  { t: 'Poi **il profilo**' },
  { t: 'Poi **gli anni**, e annota', key: true },
];

export const SCENE = [
{ id: 's01', tipo: 'copertina', tema: 'chiaro',
  modulo: 'Modulo 10 · Decidere con i tuoi numeri',
  titolo: 'Simulatore e proiezione', sottotitolo: 'Lezione 10.2',
  ente: `${CORSO} · ${FIRMA}` },

// 1 · apertura
{ id: 's02', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Una mappa sul tavolo', illu: 'bussola',
  titolo: 'Un percorso<br>**segnato a matita**' },
{ id: 's03', tipo: 'frase', tema: 'chiaro', sopratitolo: 'Una proiezione è un navigatore',
  testo: 'Ti dice dove arriverai,<br><b class="a">se non cambi niente.</b>' },
{ id: 's04', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Il navigatore non sa',
  col: [{ h: 'Se ci sarà', t: 'Traffico', grande: true },
        { h: 'Se cambierai', t: '**Strada**', grande: true }] },
{ id: 's05', tipo: 'frase', tema: 'chiaro', sopratitolo: 'Ma senza navigatore',
  testo: 'Viaggi<br><b class="a">alla cieca.</b>' },
{ id: 's06', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'In questa lezione',
  col: [{ h: 'Usare', t: 'Due strumenti di stima', grande: true },
        { h: 'Leggerli', t: '**Con prudenza**', grande: true }] },

// 2 · due strumenti
STR('s07', []),
STR('s08', [0]),
{ id: 's09', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'La mia pensione complementare stima',
  col: [{ h: 'Quanto', t: 'Potresti accumulare', grande: true },
        { h: 'Quale rendita', t: '**Potresti ottenere**', grande: true }] },
{ id: 's10', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Ipotesi uguali per tutti i fondi', illu: 'bilancia',
  titolo: 'Stabilite<br>**dalla COVIP**', sotto: 'Utile anche per confrontare.' },
STR('s11', [1]),
{ id: 's12', tipo: 'tre', tema: 'chiaro', sopratitolo: 'Nel simulatore inserisci',
  box: [{ n: 'ETÀ', t: 'E contributi' }, { n: 'POSIZIONE', t: 'Attuale' }, { n: 'PROFILO', t: 'Di investimento', key: true }] },
{ id: 's13', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Sul sito del Fondo', illu: 'libro',
  titolo: 'Metodologia<br>**e ipotesi**' },

// 3 · il ventaglio
{ id: 's14', tipo: 'figura', tema: 'chiaro', sopratitolo: 'La cosa più importante', illu: 'lente',
  titolo: 'Come si legge<br>**una proiezione**' },
ven('s15', 'Un ventaglio, non un numero', { zona: false }),
{ id: 's16', tipo: 'tre', tema: 'chiaro', sopratitolo: 'Nessuno sa',
  box: [{ n: 'I MERCATI', t: 'Quanto renderanno' }, { n: 'LO STIPENDIO', t: 'Quanto crescerà' }, { n: 'L\'INFLAZIONE', t: 'Quale sarà' }] },
{ id: 's17', tipo: 'frase', tema: 'chiaro', sopratitolo: 'Le proiezioni',
  testo: 'Ipotesi ragionevoli,<br><b class="a">non previsioni.</b>' },
ven('s18', 'Tre simulazioni: prudente, centrale, ottimista', { zona: false }),
ven('s19', 'Probabilmente, da qualche parte in mezzo'),
{ id: 's20', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Ogni qualche anno', illu: 'calendario',
  titolo: 'Rifai<br>**la simulazione**' },
{ id: 's21', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Più ti avvicini, più il ventaglio si stringe',
  col: [{ h: 'A 30 anni dalla pensione', t: 'Molto largo', grande: true },
        { h: 'A 5 anni', t: '**Quasi una linea**', grande: true }] },

// 4 · tre leve
{ id: 's22', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Il simulatore ti mostra', illu: 'schermo',
  titolo: 'Che cosa succede<br>**se cambi qualcosa**' },
lev('s23'),
lev('s24', [0]),
{ id: 's25', tipo: 'frase', tema: 'chiaro', sopratitolo: 'Lezione 4.4',
  testo: 'Ora con i tuoi numeri,<br><b class="a">non con un esempio.</b>' },
lev('s26', [0, 1]),
lev('s27', [0, 1, 2]),
{ id: 's28', tipo: 'frase', tema: 'chiaro', sopratitolo: 'Il numero perfetto non esiste',
  testo: 'Cerca la leva<br><b class="a">che pesa di più per te.</b>' },
{ id: 's29', tipo: 'tre', tema: 'chiaro', sopratitolo: 'Per qualcuno',
  box: [{ n: '1', t: 'L\'aliquota' }, { n: '2', t: 'Il profilo' }, { n: '3', t: 'Gli anni' }] },

// 5 · la pensione completa
{ id: 's30', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Un\'ultima cosa', illu: 'campana',
  titolo: 'Forse<br>**la più importante**' },
{ id: 's31', tipo: 'frase', tema: 'chiaro', sopratitolo: 'La proiezione del Fondo',
  testo: 'Racconta solo<br><b class="a">una parte della storia.</b>' },
{ id: 's32', tipo: 'tre', tema: 'chiaro', sopratitolo: 'Mettila accanto a',
  box: [{ n: 'PENSIONE INPS', t: 'Servizio online' }, { n: 'COMPLEMENTARE', t: 'Il Fondo' }, { n: 'RISPARMI', t: 'Personali' }] },
{ id: 's33', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Modulo 1', illu: 'pilastri',
  titolo: 'I tre<br>**pilastri**' },
{ id: 's34', tipo: 'frase', tema: 'chiaro', sopratitolo: 'Solo insieme capisci',
  testo: 'Se il divario è coperto,<br><b class="a">o se c\'è strada da fare.</b>' },

// 6 · memo
{ id: 's35', tipo: 'frase', tema: 'profondo', sopratitolo: 'Da ricordare',
  testo: 'Una stima,<br><b class="a">non una promessa.</b>' },

// 7 · chiusura
{ id: 's36', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE, attive: [0] },
{ id: 's37', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE, attive: [0, 1] },
{ id: 's38', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE },
{ id: 's39', tipo: 'mossa', tema: 'chiaro', sopratitolo: 'La mossa di oggi', illu: 'schermo',
  titolo: 'Fai **tre simulazioni**', passi: PASSI },
lev('s40', [0, 1, 2]),
{ id: 's41', tipo: 'frase', tema: 'chiaro', sopratitolo: 'Con i tuoi occhi',
  testo: 'Quale leva sposta di più,<br><b class="a">e quale conta poco.</b>' },
{ id: 's42', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Prossime tre lezioni',
  col: [{ h: 'Dalla teoria', t: 'Alle persone', grande: true },
        { h: 'Dai concetti', t: '**Alle decisioni**', grande: true }] },
{ id: 's43', tipo: 'tre', tema: 'chiaro', sopratitolo: 'Tre storie concrete',
  box: [{ n: '10.3', t: 'L\'infermiera neoassunta', key: true }, { n: '10.4', t: 'L\'OSS in servizio dal 1996' }, { n: '10.5', t: 'Il tecnico a tempo determinato' }] },
{ id: 's44', tipo: 'figura', tema: 'chiaro', sopratitolo: 'La prima storia', illu: 'stetoscopio',
  titolo: 'Un\'infermiera<br>**appena assunta**' },
{ id: 's45', tipo: 'cifre', tema: 'chiaro', sopratitolo: 'Davanti a sé',
  voci: [{ n: '39 anni', t: 'Di lavoro', key: true }] },
{ id: 's46', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'I concetti del corso',
  col: [{ h: 'Dal silenzio-assenso', t: 'Modulo 3', grande: true },
        { h: 'Al profilo', t: '**Modulo 6**', grande: true }] },
{ id: 's47', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Tieni a portata di mano', illu: 'cartella',
  titolo: 'Il tuo<br>**prospetto**' },
{ id: 's48', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Ci vediamo nella lezione 10.3', illu: 'stetoscopio',
  titolo: 'L\'infermiera<br>**neoassunta**' },

{ id: 's49', tipo: 'copertina', tema: 'profondo', chiusura: true, corso: CORSO, firma: FIRMA },
];
