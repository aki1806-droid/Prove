// Contenuto delle 49 scene della lezione 3.3 — Neoassunti: il silenzio che vale un sì.
// s02–s48 sono i blocchi 1–47 del copione, uno a uno.

const CORSO = 'Perseo Sirio senza segreti';
const FIRMA = 'Un corso CISL FP Padova Rovigo';

const STRADE = [
  { n: 'ADERISCO', t: 'Scelgo io profilo e percentuale' },
  { n: 'DICO NO', t: 'Per iscritto: resto fuori, posso entrare dopo' },
  { n: 'NON FACCIO NULLA', t: 'Iscritto, profilo Garantito', key: true },
];

const TRE_COSE = [
  'Assunti **dal 2019**',
  '**6 mesi** + **30 giorni**',
  'Profilo **Garantito**, modificabile',
];

const PASSI = [
  { t: 'Trova l\'**informativa** dell\'assunzione' },
  { t: 'Calcola la data dei **6 mesi**' },
  { t: 'Segnala sul **calendario**', key: true },
];

const oro = (id, sop, at) => ({ id, tipo: 'orologio', tema: 'chiaro', sopratitolo: sop, at });
const str = (id, attive) => ({ id, tipo: 'griglia', tema: 'chiaro', colonne: 1, spunta: false, sopratitolo: 'Ho ricevuto l\'informativa', celle: STRADE, attive });

export const SCENE = [
{ id: 's01', tipo: 'copertina', tema: 'chiaro',
  modulo: 'Modulo 3 · Chi può aderire e come',
  titolo: 'Il silenzio<br>che vale un sì', sottotitolo: 'Lezione 3.3',
  ente: `${CORSO} · ${FIRMA}` },

// 1 · apertura
{ id: 's02', tipo: 'icone', tema: 'chiaro', sopratitolo: 'Il primo giorno di lavoro',
  voci: [{ icona: 'persona', t: 'La divisa' }, { icona: 'certificato', t: 'Il badge' },
         { icona: 'orologio', t: 'I turni' }, { icona: 'cartella', t: 'Fogli da leggere', key: true }] },
{ id: 's03', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Assunto dal 2019', illu: 'lettera',
  titolo: 'Un foglio<br>su **Perseo Sirio**' },
{ id: 's04', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Spesso', illu: 'armadietto',
  titolo: 'Finisce<br>**in fondo allo zaino**' },
{ id: 's05', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Un collega', illu: 'domanda',
  titolo: 'Iscritto<br>**senza ricordarsi perché**' },
{ id: 's06', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Quel foglio', illu: 'clessidra',
  titolo: 'Fa partire<br>**un orologio**' },
{ id: 's07', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Non è un errore', illu: 'contratto',
  titolo: 'Una **regola precisa**', sotto: 'Scritta in un accordo tra le parti.' },
{ id: 's08', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Questa lezione serve',
  col: [{ h: 'A chi', t: 'È **appena arrivato**', grande: true },
        { h: 'E a chi', t: 'Lavora **accanto a loro**', grande: true }] },

// 2 · la regola
{ id: 's09', tipo: 'timeline', tema: 'chiaro', sopratitolo: 'Da dove nasce',
  tappe: [{ anno: '2019', et: 'Assunti da quest\'anno' }, { anno: 'Set 2021', et: 'Accordo ARAN–sindacati', key: true }, { anno: 'Poi', et: 'Ripreso dai contratti' }] },
{ id: 's10', tipo: 'cifre', tema: 'chiaro', sopratitolo: 'Per chi vale',
  voci: [{ n: '2019', t: 'Assunti a tempo indeterminato da quest\'anno', key: true }] },
{ id: 's11', tipo: 'tre', tema: 'chiaro', sopratitolo: 'Gli stessi comparti',
  box: [{ n: 'COMPARTO', t: 'Sanità' }, { n: 'COMPARTO', t: 'Funzioni locali' }, { n: 'COMPARTO', t: 'Funzioni centrali' }] },
{ id: 's12', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Chi era già in servizio',
  col: [{ h: 'Assunti prima', t: 'Adesione **con il modulo**', grande: true },
        { h: 'Assunti dal 2019', t: '**Silenzio-assenso**', grande: true }] },
{ id: 's13', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Il principio', illu: 'lettera',
  titolo: 'Un\'**informativa**<br>e un tempo per decidere' },
{ id: 's14', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Silenzio-assenso',
  col: [{ h: 'Se scegli', t: 'Vale la **tua scelta**', grande: true },
        { h: 'Se taci', t: 'Vale come un **sì**', grande: true }] },
{ id: 's15', tipo: 'figura', tema: 'chiaro', sopratitolo: 'L\'obiettivo', illu: 'persona',
  titolo: 'Nessuno fuori<br>**per non saperlo**', sotto: 'Resti sempre libero di dire no.' },

// 3 · l'orologio
oro('s16', 'Ecco l\'orologio', 0),
oro('s17', 'Se in sei mesi non dici niente', 1),
oro('s18', 'Altri trenta giorni', 2),
oro('s19', 'Da quando si è iscritti', 3),
oro('s20', 'Sei mesi, poi trenta giorni', 3),
{ id: 's21', tipo: 'cifre', tema: 'chiaro', sopratitolo: 'In tutto',
  voci: [{ n: '7', t: 'Mesi circa, dall\'informativa all\'iscrizione', key: true }] },

// 4 · chi entra cosi'
{ id: 's22', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Chi entra così', illu: 'persona',
  titolo: 'Un iscritto<br>**come gli altri**', sotto: 'Con la contribuzione piena.' },
{ id: 's23', tipo: 'tasche', tema: 'chiaro', sopratitolo: 'Contribuzione piena', fase: 'due' },
{ id: 's24', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Silenzio-assenso',
  col: [{ h: 'Nel privato', t: 'Solo il **TFR**', grande: true },
        { h: 'Nel pubblico', t: '**1% + 1% + TFR**', grande: true }] },
{ id: 's25', tipo: 'tasche', tema: 'chiaro', sopratitolo: 'Si parte dal Garantito', fase: 'garantito' },
{ id: 's26', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Il Garantito',
  col: [{ h: 'Protegge', t: 'Il **capitale**', grande: true },
        { h: 'Ma di solito', t: 'Rende **meno**', grande: true }] },
{ id: 's27', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Si può cambiare', illu: 'bussola',
  titolo: 'Dall\'**area riservata**', sotto: 'Nel modulo 6.' },
{ id: 's28', tipo: 'icone', tema: 'chiaro', sopratitolo: 'Come ogni iscritto',
  voci: [{ icona: 'euro', t: 'Aumenta il contributo' }, { icona: 'persone', t: 'Designa i beneficiari' }, { icona: 'occhio', t: 'Consulta la posizione' }] },

// 5 · tre strade
str('s29', []),
str('s30', [0, 1, 2]),
str('s31', [0]),
str('s32', [1]),
str('s33', [2]),
{ id: 's34', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Nessuna è sbagliata', illu: 'bilancia',
  titolo: 'Evita il sì<br>**per distrazione**' },

// 6 · un consiglio
{ id: 's35', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Un consiglio pratico', illu: 'dialogo',
  titolo: 'Per i colleghi<br>**appena arrivati**' },
{ id: 's36', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Il giorno dell\'assunzione', illu: 'calendario',
  titolo: 'Segna<br>**la data dei 6 mesi**', sotto: 'Con un avviso un mese prima.' },
{ id: 's37', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Prima di quella data', illu: 'lettera',
  titolo: 'Leggi<br>**l\'informativa**', sotto: 'Dubbi? Il Fondo o il delegato.' },
{ id: 's38', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Il Fondo offre', illu: 'telefono',
  titolo: 'Consulenze<br>**gratuite**' },
{ id: 's39', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Sei mesi', illu: 'clessidra',
  titolo: 'Il tempo<br>**vola**' },
{ id: 's40', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Se sei il collega esperto', illu: 'generazioni',
  titolo: 'Ricordalo<br>**ai nuovi**' },

// 7 · memo
{ id: 's41', tipo: 'frase', tema: 'profondo', sopratitolo: 'Da ricordare',
  testo: 'Per un neoassunto, anche non scegliere <b class="a">è una scelta</b>.' },

// 8 · chiusura
{ id: 's42', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE, attive: [0] },
{ id: 's43', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE, attive: [0, 1] },
{ id: 's44', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE },
{ id: 's45', tipo: 'mossa', tema: 'chiaro', sopratitolo: 'La mossa di oggi · assunto da meno di 6 mesi', illu: 'calendario',
  titolo: 'Segna **la tua scadenza**', passi: PASSI },
{ id: 's46', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Se sei già iscritto così', illu: 'bussola',
  titolo: 'Rivedi il profilo<br>**dopo il modulo 6**' },
{ id: 's47', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Se un collega te lo chiede', illu: 'dialogo',
  titolo: 'Ora sai<br>**cosa rispondere**' },
{ id: 's48', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Prossima lezione', illu: 'semaforo',
  titolo: 'La **polizia locale**', sotto: 'Un caso speciale.' },

{ id: 's49', tipo: 'copertina', tema: 'profondo', chiusura: true, corso: CORSO, firma: FIRMA },
];
