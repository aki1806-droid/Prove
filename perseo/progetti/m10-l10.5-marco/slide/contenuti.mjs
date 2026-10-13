// Contenuto delle 49 scene della lezione 10.5 — Marco, il tecnico a tempo determinato.
// s02–s48 sono i blocchi 1–47 del copione, uno a uno.
// Ogni slide del caso porta in basso l'avviso «caso illustrativo».

const CORSO = 'Perseo Sirio senza segreti';
const FIRMA = 'Un corso CISL FP Padova Rovigo';
const AVV = 'Caso illustrativo · Esempio semplificato · Non è una previsione';

const S = o => ({ tema: 'chiaro', avviso: AVV, ...o });

const SPUNTE = [
  'Contratto di almeno **3 mesi**: può aderire',
  'Tempo determinato: **è in TFR**',
  'Meglio **firmare presto**',
];
const spu = (id, attive) => S({ id, tipo: 'memo', sopratitolo: 'Può aderire?', voci: SPUNTE, ...(attive ? { attive } : {}) });

const CONTI = (id, chiave) => S({ id, tipo: 'tabella', sopratitolo: 'Un anno, con 28.000 € di retribuzione utile',
  intestazioni: ['Chi versa', 'In un anno'], colonne: ['60%', '40%'],
  righe: [['**Marco**, 1%', '280 €'], ['**L\'ente**, 1%', '280 €'], ['**TFR**, tasca figurativa (6,91%)', '≈ 1.935 €'], ['**In tutto**', '≈ 2.500 €']], chiave });

const str = (id, sop, at) => S({ id, tipo: 'strade', sopratitolo: sop, at });

const TRE_COSE = [
  'Anche **a termine** si può aderire',
  'Niente silenzio-assenso: **serve firmare**',
  'Alla scadenza la posizione **non si perde**',
];

const PASSI = [
  { t: 'Controlla **la scadenza** del contratto' },
  { t: 'Decidi se **aderire**' },
  { t: 'Firma **almeno 3 mesi prima**', key: true },
];

export const SCENE = [
{ id: 's01', tipo: 'copertina', tema: 'chiaro',
  modulo: 'Modulo 10 · Decidere con i tuoi numeri',
  titolo: 'Marco, a tempo determinato', sottotitolo: 'Lezione 10.5',
  ente: `${CORSO} · ${FIRMA}` },

// 1 · apertura
S({ id: 's02', tipo: 'figura', sopratitolo: '26 anni · tecnico di radiologia', illu: 'schermo',
  titolo: 'Marco,<br>**al pannello della TAC**' }),
S({ id: 's03', tipo: 'figura', sopratitolo: 'Contratto a tempo determinato', illu: 'calendario',
  titolo: '12 mesi,<br>**poi la data cerchiata**' }),
S({ id: 's04', tipo: 'frase', sopratitolo: 'Il suo pensiero',
  testo: 'Che senso ha aderire,<br><b class="a">se tra un anno sono altrove?</b>' }),
S({ id: 's05', tipo: 'tre', sopratitolo: 'La domanda di tanti giovani nella sanità pubblica',
  box: [{ n: 'CONTRATTI', t: 'Brevi' }, { n: 'SOSTITUZIONI', t: 'Di colleghi' }, { n: 'GRADUATORIE', t: 'In attesa' }] }),
S({ id: 's06', tipo: 'tre', sopratitolo: 'Tre domande',
  box: [{ n: '1', t: 'Può aderire?' }, { n: '2', t: 'Quanto vale un anno?' }, { n: '3', t: 'E alla scadenza?', key: true }] }),
S({ id: 's07', tipo: 'frase', sopratitolo: 'Ricorda',
  testo: 'Marco e i suoi numeri<br><b class="a">sono inventati.</b>' }),

// 2 · può aderire
S({ id: 's08', tipo: 'frase', sopratitolo: 'Prima domanda',
  testo: 'Può aderire?<br><b class="a">Sì.</b>' }),
spu('s09', [0]),
spu('s10', [0, 1]),
S({ id: 's11', tipo: 'figura', sopratitolo: 'Prima di firmare', illu: 'clessidra',
  titolo: 'Un dettaglio<br>**di tempo**' }),
S({ id: 's12', tipo: 'figura', sopratitolo: 'Troppo vicino alla scadenza', illu: 'orologio',
  titolo: 'L\'ente potrebbe<br>**non fare in tempo**' }),
S({ id: 's13', tipo: 'cifre', sopratitolo: 'Il consiglio del Fondo',
  voci: [{ n: '3 mesi', t: 'Firma almeno tre mesi prima della fine', key: true }] }),
S({ id: 's14', tipo: 'confronto', sopratitolo: 'Il silenzio-assenso',
  col: [{ h: 'Tempo indeterminato', t: 'Vale (lezione 10.3)', grande: true },
        { h: 'Tempo determinato', t: '**Non vale**', grande: true }] }),
S({ id: 's15', tipo: 'figura', sopratitolo: 'Nessuno lo farà al posto suo', illu: 'contratto',
  titolo: 'Aderire<br>**esplicitamente**' }),

// 3 · quanto vale un anno
S({ id: 's16', tipo: 'cifre', sopratitolo: 'Seconda domanda: quanto vale un anno?',
  voci: [{ n: '28.000 €', t: 'Retribuzione utile', key: true }] }),
CONTI('s17', [0, 1]),
CONTI('s18', [2]),
CONTI('s19', [3]),
S({ id: 's20', tipo: 'frase', sopratitolo: 'Se non aderisce',
  testo: 'L\'1% dell\'ente<br><b class="a">è perso per sempre.</b>' }),
S({ id: 's21', tipo: 'confronto', sopratitolo: 'Comincia a contare il tempo',
  col: [{ h: 'Gli anni valgono per', t: 'I requisiti futuri', grande: true },
        { h: 'E per', t: '**La scala fiscale**', grande: true }] }),
S({ id: 's22', tipo: 'frase', sopratitolo: 'Se Marco cambia lavoro',
  testo: 'Gli anni<br><b class="a">non si perdono.</b>' }),

// 4 · tre futuri possibili
S({ id: 's23', tipo: 'figura', sopratitolo: 'Terza domanda', illu: 'domanda',
  titolo: 'E alla scadenza<br>**del contratto?**' }),
str('s24', 'Tre futuri possibili', -1),
str('s25', 'Primo scenario: un altro ente pubblico', 0),
S({ id: 's26', tipo: 'tasche', sopratitolo: 'Il TFR resta all\'INPS', fase: 'due' }),
str('s27', 'Secondo scenario: il privato', 1),
S({ id: 's28', tipo: 'confronto', sopratitolo: 'Nel nuovo fondo negoziale',
  col: [{ h: 'Trasferisce', t: 'Gli anni restano', grande: true },
        { h: 'Il nuovo datore', t: '**Versa il suo contributo**', grande: true }] }),
str('s29', 'Terzo scenario: un periodo senza lavoro', 2),
S({ id: 's30', tipo: 'figura', sopratitolo: 'Anche se per un po\' non entra niente', illu: 'salvadanaio',
  titolo: 'La posizione<br>**resta investita**' }),
S({ id: 's31', tipo: 'frase', sopratitolo: 'In nessuno dei tre casi',
  testo: 'Aver aderito<br><b class="a">non gli fa perdere nulla.</b>' }),

// 5 · e il riscatto?
S({ id: 's32', tipo: 'figura', sopratitolo: 'E se volesse riprendersi i soldi?', illu: 'euro',
  titolo: 'Il riscatto,<br>**e il suo prezzo**' }),
S({ id: 's33', tipo: 'confronto', sopratitolo: 'Modulo 8',
  col: [{ h: 'Se lascia la PA', t: 'Può riscattare', grande: true },
        { h: 'Le tasse', t: '**Dipendono dalla causa**', grande: true }] }),
S({ id: 's34', tipo: 'cifre', sopratitolo: 'Per una scelta volontaria, come le dimissioni',
  voci: [{ n: '23%', t: 'Di tasse sul riscatto', key: true }] }),
S({ id: 's35', tipo: 'confronto', sopratitolo: 'Per cause non volontarie',
  col: [{ h: 'Tassazione', t: 'Più bassa', grande: true },
        { h: 'Quale si applica', t: '**Lo dice il Fondo**', grande: true }] }),
S({ id: 's36', tipo: 'frase', sopratitolo: 'Riscattando perde gli anni',
  testo: 'Il contatore<br><b class="a">torna a zero.</b>' }),
S({ id: 's37', tipo: 'confronto', sopratitolo: 'Per un ventiseienne',
  col: [{ h: 'Conservare', t: 'Gli anni', grande: true },
        { h: 'Vale più di', t: '**Qualche centinaio di euro**', grande: true }] }),

// 6 · memo
{ id: 's38', tipo: 'frase', tema: 'profondo', sopratitolo: 'Da ricordare',
  testo: 'Il contratto finisce,<br><b class="a">la posizione no.</b>' },

// 7 · chiusura
{ id: 's39', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE, attive: [] },
{ id: 's40', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE, attive: [0] },
{ id: 's41', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE, attive: [0, 1] },
{ id: 's42', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE },
{ id: 's43', tipo: 'mossa', tema: 'chiaro', sopratitolo: 'La mossa di oggi', illu: 'calendario',
  titolo: 'Se sei a termine, **firma presto**', passi: PASSI },
{ id: 's44', tipo: 'cifre', tema: 'chiaro', sopratitolo: 'Così l\'ente fa in tempo',
  voci: [{ n: '3 mesi', t: 'Almeno, prima della scadenza', key: true }] },
{ id: 's45', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Nella prossima lezione', illu: 'stelle',
  titolo: 'La fine<br>**del corso**' },
{ id: 's46', tipo: 'cifre', tema: 'chiaro', sopratitolo: 'Tutto il corso in fila',
  voci: [{ n: '10 domande', t: 'Da farti, una per una', key: true }] },
{ id: 's47', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'A chi rivolgerti',
  col: [{ h: 'Il Fondo', t: 'Numero verde e consulenza', grande: true },
        { h: 'Chi lavora', t: '**Accanto a te**', grande: true }] },
{ id: 's48', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Ci vediamo nella lezione 10.6', illu: 'cartella',
  titolo: 'La tua<br>**checklist**' },

{ id: 's49', tipo: 'copertina', tema: 'profondo', chiusura: true, corso: CORSO, firma: FIRMA },
];
