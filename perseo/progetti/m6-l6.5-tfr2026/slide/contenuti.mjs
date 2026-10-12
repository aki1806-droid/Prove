// Contenuto delle 49 scene della lezione 6.5 — La novità 2026: il TFR segue la tua scelta.
// s02–s48 sono i blocchi 1–47 del copione, uno a uno.

const CORSO = 'Perseo Sirio senza segreti';
const FIRMA = 'Un corso CISL FP Padova Rovigo';

const tas = (id, sop, fase, extra) => ({ id, tipo: 'tasche', tema: 'chiaro', sopratitolo: sop, fase, ...extra });
const pro = (id, sop, reale, fig) => tas(id, sop, 'profili', { profili: { reale, fig } });

const RIGHE = [['Tasca reale (1% + 1%)', '600 €'], ['Tasca figurativa (TFR)', '**≈ 2.070 €**']];
const tab = (id, k, chiave) => ({ id, tipo: 'tabella', tema: 'chiaro', sopratitolo: 'Esempio semplificato · 30.000 € di retribuzione utile',
  intestazioni: ['Ogni anno', 'Euro'], colonne: ['65%', '35%'], righe: RIGHE.slice(0, k), chiave });

const TRE_COSE = [
  'Dal 2026: **TFR legato al profilo**',
  'Si può scegliere **un profilo diverso**',
  'Il TFR è **la tasca più grande**',
];

const PASSI = [
  { t: 'Area riservata · **investimento**' },
  { t: 'Il profilo del **TFR virtuale**' },
  { t: 'Confrontalo con la **tasca reale**', key: true },
];

export const SCENE = [
{ id: 's01', tipo: 'copertina', tema: 'chiaro',
  modulo: 'Modulo 6 · Dove vanno i tuoi soldi',
  titolo: 'La novità 2026:<br>il TFR segue la tua scelta', sottotitolo: 'Lezione 6.5',
  ente: `${CORSO} · ${FIRMA}` },

// 1 · apertura
{ id: 's02', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Per anni', illu: 'armadietto',
  titolo: 'Una scatola<br>**chiusa**', sotto: 'Cresceva, ma non decidevi come.' },
tas('s03', 'La tasca figurativa: resta all\'INPS', 'due', { optanti: true }),
{ id: 's04', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Dal 1° gennaio 2026', illu: 'ingranaggio',
  titolo: 'La scatola<br>**si è aperta**' },
{ id: 's05', tipo: 'tre', tema: 'chiaro', sopratitolo: 'In questa lezione',
  box: [{ n: 'CHE COSA', t: 'È cambiato' }, { n: 'PERCHÉ', t: 'Riguarda proprio te' }, { n: 'CHE COSA FARE', t: 'In pratica', key: true }] },
{ id: 's06', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Come sempre nel modulo', illu: 'campana',
  titolo: 'Informazioni generali,<br>**non consulenza finanziaria**', sotto: 'I rendimenti passati non garantiscono quelli futuri.' },

// 2 · le due tasche
tas('s07', 'Ricordi le due tasche? · modulo 2', 'due', { optanti: true }),
tas('s08', 'Fino al 2025: un paniere uguale per tutti', 'manopola', { optanti: true }),
{ id: 's09', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Fino al 2025',
  col: [{ h: 'Qualunque profilo', t: 'Avessi scelto', grande: true },
        { h: 'Il tuo TFR', t: '**Cresceva come tutti**', grande: true }] },
{ id: 's10', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'In pratica',
  col: [{ h: 'La tasca piccola', t: '**La sceglievi**', grande: true },
        { h: 'La tasca grande', t: 'Uguale per tutti', grande: true }] },
{ id: 's11', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Dal 2026', illu: 'bussola',
  titolo: 'Il criterio<br>**multicomparto**' },
tas('s12', 'Il TFR segue il profilo scelto da te', 'manopola', { optanti: true }),
pro('s13', 'Anche un profilo diverso dalla tasca reale', 'profilo A', 'profilo B'),
{ id: 's14', tipo: 'figura', tema: 'chiaro', sopratitolo: 'INPS', illu: 'calendario',
  titolo: 'Operativo<br>**da luglio 2026**' },

// 3 · perché conta
{ id: 's15', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Perché conta?', illu: 'lente',
  titolo: 'Guarda<br>**le proporzioni**' },
{ id: 's16', tipo: 'cifre', tema: 'chiaro', sopratitolo: 'Un esempio · assunto dopo il 2000',
  voci: [{ n: '30.000 €', t: 'Retribuzione utile' }, { n: '1% + 1%', t: 'Tu e l\'ente', key: true }] },
tab('s17', 1, [0]),
tab('s18', 2, [1]),
{ id: 's19', tipo: 'cifre', tema: 'chiaro', sopratitolo: 'La tasca figurativa',
  voci: [{ n: '× 3', t: 'Più di tre volte la tasca reale', key: true }] },
{ id: 's20', tipo: 'frase', tema: 'chiaro', sopratitolo: 'In trent\'anni di carriera',
  testo: 'Il TFR è spesso<br><b class="a">la parte più grande.</b>' },
{ id: 's21', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Sul suo rendimento',
  col: [{ h: 'Fino al 2025', t: 'Nessuna scelta', grande: true },
        { h: 'Dal 2026', t: '**La scegli tu**', grande: true }] },
{ id: 's22', tipo: 'figura', tema: 'chiaro', sopratitolo: 'La scelta che pesa di più', illu: 'bilancia',
  titolo: 'Non lasciarla<br>**al caso**' },

// 4 · tre esempi
{ id: 's23', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Che cosa si può fare?', illu: 'domanda',
  titolo: 'Tre esempi,<br>**non consigli**' },
pro('s24', 'Primo esempio: tutto sullo stesso profilo', 'stesso profilo', 'stesso profilo'),
pro('s25', 'Secondo esempio: più prudenza sul TFR', 'Bil. Crescita', 'Garantito'),
pro('s26', 'Il TFR come liquidazione da proteggere', 'Bil. Crescita', 'Garantito'),
pro('s27', 'Terzo esempio: più crescita sul TFR', 'Garantito', 'Bil. Dinamico'),
{ id: 's28', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Perché?', illu: 'clessidra',
  titolo: 'Il TFR ha davanti<br>**molti anni**' },
tas('s29', 'Arriva al Fondo solo alla fine del rapporto', 'unione', { optanti: true }),
{ id: 's30', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Per chi è giovane', illu: 'bussola',
  titolo: 'L\'orizzonte<br>**più lungo di tutti**' },

// 5 · dove si fa
{ id: 's31', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Dove si fa?', illu: 'schermo',
  titolo: 'Area riservata,<br>**sezione investimento**' },
{ id: 's32', tipo: 'tre', tema: 'chiaro', sopratitolo: 'Con una procedura guidata',
  box: [{ n: 'TASCA REALE', t: 'A quale profilo è collegata' }, { n: 'TASCA FIGURATIVA', t: 'A quale profilo è collegata' }, { n: 'MODIFICA', t: 'Se vuoi cambiarli', key: true }] },
{ id: 's33', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Le regole per cambiare', illu: 'semaforo',
  titolo: 'Nella<br>**prossima lezione**' },
{ id: 's34', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'E l\'INPS?',
  col: [{ h: 'L\'amministrazione', t: '**Comunica il profilo**', grande: true },
        { h: 'Tu', t: 'Non devi fare nulla', grande: true }] },
{ id: 's35', tipo: 'frase', tema: 'chiaro', sopratitolo: 'Stesso profilo o diverso',
  testo: 'Una scelta consapevole,<br><b class="a">non un\'abitudine.</b>' },
{ id: 's36', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Il primo passo', illu: 'lente',
  titolo: 'Vedere che cosa<br>**risulta oggi**' },

// 6 · memo
{ id: 's37', tipo: 'frase', tema: 'profondo', sopratitolo: 'Da ricordare',
  testo: 'Anche il tuo TFR ora sceglie.<br><b class="a">Non lasciarlo al caso.</b>' },

// 7 · chiusura
{ id: 's38', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE, attive: [0] },
{ id: 's39', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE, attive: [0, 1] },
{ id: 's40', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE },
{ id: 's41', tipo: 'mossa', tema: 'chiaro', sopratitolo: 'La mossa di oggi', illu: 'schermo',
  titolo: 'Controlla<br>**il profilo del TFR**', passi: PASSI },
pro('s42', 'Uguali o diversi? Scelta tua o no?', '?', '?'),
{ id: 's43', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'I due criteri della lezione 6.2',
  col: [{ h: 'Primo', t: '**Gli anni** che mancano', grande: true },
        { h: 'Secondo', t: 'La tua **tranquillità**', grande: true }] },
{ id: 's44', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Qualcosa non torna?', illu: 'dialogo',
  titolo: 'Prima la consulenza,<br>**poi la scelta**' },
{ id: 's45', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Il corso', illu: 'bilancia',
  titolo: 'Non sceglie per te:<br>**ti dice che puoi**' },
{ id: 's46', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Prossima lezione, l\'ultima del modulo', illu: 'semaforo',
  titolo: 'Come e quando<br>**si cambia profilo**' },
{ id: 's47', tipo: 'tre', tema: 'chiaro', sopratitolo: 'Vedremo',
  box: [{ n: 'SWITCH', t: 'Il cambio di profilo' }, { n: 'TEMPI', t: 'E limiti' }, { n: 'QUESTIONARIO', t: 'Per decidere', key: true }] },
{ id: 's48', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Ci vediamo nella lezione 6.6', illu: 'bussola',
  titolo: 'Cambiare<br>**idea**' },

{ id: 's49', tipo: 'copertina', tema: 'profondo', chiusura: true, corso: CORSO, firma: FIRMA },
];
