// Contenuto delle 49 scene della lezione 7.1 — Quanto costa davvero.
// s02–s48 sono i blocchi 1–47 del copione, uno a uno.

const CORSO = 'Perseo Sirio senza segreti';
const FIRMA = 'Un corso CISL FP Padova Rovigo';

const RIGHE = [
  ['Garantito', '**0,46%**'],
  ['Obbligazionario', '0,14% + commissione sui risultati'],
  ['Azionario', '0,19% + commissione sui risultati'],
  ['Per tutti', '+ 0,03% spese amministrative'],
];
const tab = (id, k, chiave, sop = 'Costi indiretti · ogni anno, sul patrimonio') => ({ id, tipo: 'tabella', tema: 'chiaro', sopratitolo: sop,
  intestazioni: ['Comparto', 'Costo annuo sul patrimonio'], colonne: ['35%', '65%'], righe: RIGHE.slice(0, k), chiave });

const QUOTA = [
  { n: 'ISCRITTI', t: '13 €', d: 'ogni anno' },
  { n: 'CONTRATTUALI P.L.', t: '11 €', d: 'ogni anno' },
  { n: 'IN RITA', t: '10 €', d: 'ogni anno' },
];
const quota = (id, sop, k) => ({ id, tipo: 'tre', tema: 'chiaro', cifre: true, sopratitolo: sop, box: QUOTA.map((b, i) => ({ ...b, key: i === k })) });

const REND = [
  { n: 'CONVERSIONE', t: '1,10%', d: 'una tantum' },
  { n: 'RENDITA LTC', t: '5%', d: 'una tantum' },
  { n: 'OGNI ANNO', t: '0,90%', d: 'sulla rivalutazione' },
];
const rend = (id, sop, k) => ({ id, tipo: 'tre', tema: 'chiaro', cifre: true, sopratitolo: sop, box: REND.map((b, i) => ({ ...b, key: k === 9 || i === k })) });

const gr = (id, sop, k, on) => ({ id, tipo: 'gratis', tema: 'chiaro', sopratitolo: sop, k, on });

const TRE_COSE = [
  '**13 €** l\'anno di quota associativa',
  'Da **0,14%** a **0,46%** sul patrimonio',
  'Operazioni **gratuite**',
];

const PASSI = [
  { t: 'Sito del Fondo · **Nota informativa**' },
  { t: 'Scheda **«I costi»**' },
  { t: 'Il costo del **tuo comparto**', key: true },
];

export const SCENE = [
{ id: 's01', tipo: 'copertina', tema: 'chiaro',
  modulo: 'Modulo 7 · Costi e trasparenza',
  titolo: 'Quanto costa<br>davvero', sottotitolo: 'Lezione 7.1',
  ente: `${CORSO} · ${FIRMA}` },

// 1 · apertura
{ id: 's02', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Prima di comprare casa', illu: 'casa',
  titolo: 'Chiedi<br>**quanto costa**', sotto: 'Tasso, spese, condizioni.' },
{ id: 's03', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Eppure', illu: 'contratto',
  titolo: 'Si firma<br>**senza leggere le spese**' },
{ id: 's04', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'I costi di un fondo pensione',
  col: [{ h: 'Non arrivano', t: 'In un\'unica fattura', grande: true },
        { h: 'Si prelevano', t: '**Ogni anno, per decenni**', grande: true }] },
{ id: 's05', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Lo scontrino completo, riga per riga',
  col: [{ h: 'Fase di', t: '**Accumulo**', grande: true },
        { h: 'Fase di', t: '**Rendita**', grande: true }] },
{ id: 's06', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Nota informativa', illu: 'libro',
  titolo: 'Scheda<br>**«I costi»**', sotto: 'In vigore dal 27 marzo 2026. Le cifre possono cambiare.' },

// 2 · costi diretti
{ id: 's07', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Primo gruppo', illu: 'lettera',
  titolo: 'I costi<br>**diretti**', sotto: 'Addebitati sulla tua posizione.' },
{ id: 's08', tipo: 'cifre', tema: 'chiaro', sopratitolo: 'La buona notizia',
  voci: [{ n: '0 €', t: 'Per aderire', key: true }] },
quota('s09', 'La quota associativa · dal primo versamento dell\'anno', 0),
quota('s10', 'La quota associativa', 1),
{ id: 's11', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Non la pagano', illu: 'generazioni',
  titolo: 'I familiari<br>**fiscalmente a carico**' },
{ id: 's12', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'E non la paga chi, in un anno',
  col: [{ h: 'Non ha fatto', t: '**Versamenti**', grande: true },
        { h: 'Ha fatto solo', t: '**Versamenti volontari**', grande: true }] },
{ id: 's13', tipo: 'confronto', tema: 'chiaro', sopratitolo: '13 € su 300 € di contributo annuo',
  col: [{ h: 'All\'inizio', t: 'Una cifra **sensibile**', grande: true },
        { h: 'Con il tempo', t: '**Trascurabile**', grande: true }] },

// 3 · costi indiretti
{ id: 's14', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Secondo gruppo', illu: 'lente',
  titolo: 'I costi<br>**indiretti**', sotto: 'Non li vedi addebitati sulla posizione.' },
{ id: 's15', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Dal patrimonio del comparto',
  col: [{ h: 'Si prelevano', t: '**Ogni trimestre**', grande: true },
        { h: 'Già compresi', t: 'Nei **rendimenti netti**', grande: true }] },
{ id: 's16', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Chi pagano',
  col: [{ h: 'I gestori', t: 'Che **investono**', grande: true },
        { h: 'Il depositario', t: 'Che **custodisce e controlla**', grande: true }] },
tab('s17', 3, []),
tab('s18', 3, [0], 'Il più caro: la garanzia ha un prezzo'),
tab('s19', 3, [1, 2]),
{ id: 's20', tipo: 'cifre', tema: 'chiaro', sopratitolo: 'Obbligazionario e Azionario · commissione sui risultati',
  voci: [{ n: '10%', t: 'Del rendimento oltre l\'obiettivo', key: true }] },
{ id: 's21', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'In pratica',
  col: [{ h: 'Supera l\'obiettivo', t: 'Il gestore **guadagna di più**', grande: true },
        { h: 'Non lo supera', t: 'Commissione **zero**', grande: true }] },
tab('s22', 4, [3]),
{ id: 's23', tipo: 'frase', tema: 'chiaro', sopratitolo: 'Numeri piccoli, con lo zero davanti',
  testo: 'Ma valgono ogni anno<br><b class="a">su tutto il patrimonio.</b>' },

// 4 · le operazioni
gr('s24', 'Terzo gruppo: le operazioni', 0),
gr('s25', 'Nessuna spesa', 4, [0, 1, 2, 3]),
gr('s26', 'Nessuna spesa', 7, [4, 5, 6]),
gr('s27', 'Sette operazioni gratuite · Nota informativa', 7),
{ id: 's28', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Non è scontato', illu: 'bilancia',
  titolo: 'Altrove, spesso<br>**un costo fisso**', sotto: 'A ogni richiesta.' },
{ id: 's29', tipo: 'frase', tema: 'chiaro', sopratitolo: 'Qui',
  testo: 'Adatti la posizione alla tua vita<br><b class="a">senza pagare pedaggi.</b>' },

// 5 · la rendita
{ id: 's30', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Infine', illu: 'calendario',
  titolo: 'La fase<br>**di erogazione**', sotto: 'Quando ricevi la rendita, ogni mese.' },
{ id: 's31', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Chi paga la rendita', illu: 'scudo',
  titolo: 'Una compagnia<br>**convenzionata**', sotto: 'Trasforma il capitale in un assegno a vita.' },
rend('s32', 'Il caricamento, una volta sola', 0),
rend('s33', 'Rendita LTC: raddoppia se non autosufficiente', 1),
rend('s34', 'Ogni anno, sulla rivalutazione', 2),
{ id: 's35', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Ne riparleremo', illu: 'bussola',
  titolo: 'Modulo 9:<br>**il tipo di rendita**' },
rend('s36', 'Tutto scritto nella Nota informativa', 9),

// 6 · memo
{ id: 's37', tipo: 'frase', tema: 'profondo', sopratitolo: 'Da ricordare',
  testo: 'Un costo piccolo, per trent\'anni,<br><b class="a">non è più piccolo.</b>' },

// 7 · chiusura
{ id: 's38', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE, attive: [0] },
{ id: 's39', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE, attive: [0, 1] },
tab('s40', 4, [3], 'Più lo 0,03% per tutti'),
{ id: 's41', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE },
{ id: 's42', tipo: 'mossa', tema: 'chiaro', sopratitolo: 'La mossa di oggi', illu: 'schermo',
  titolo: 'Apri la scheda **«I costi»**', passi: PASSI },
{ id: 's43', tipo: 'tre', tema: 'chiaro', sopratitolo: 'Tre pagine: cerca le righe',
  box: [{ n: 'DIRETTI', t: 'La quota associativa' }, { n: 'INDIRETTI', t: 'I costi dei comparti' }, { n: 'OPERAZIONI', t: 'Zero' }] },
{ id: 's44', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Il comparto del tuo profilo', illu: 'domanda',
  titolo: 'Quanto costa<br>**ogni anno?**' },
{ id: 's45', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Niente calcoli complicati', illu: 'cartella',
  titolo: 'Sapere che esistono,<br>**e dove trovarli**' },
{ id: 's46', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Forme diverse, strutture diverse', illu: 'bilancia',
  titolo: 'Come si<br>**confrontano?**' },
{ id: 's47', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Prossima lezione', illu: 'lente',
  titolo: 'L\'ISC', sotto: 'L\'indicatore sintetico dei costi.' },
{ id: 's48', tipo: 'cifre', tema: 'chiaro', sopratitolo: 'Lezione 7.2',
  voci: [{ n: 'ISC', t: 'Il numero da guardare', key: true }] },

{ id: 's49', tipo: 'copertina', tema: 'profondo', chiusura: true, corso: CORSO, firma: FIRMA },
];
