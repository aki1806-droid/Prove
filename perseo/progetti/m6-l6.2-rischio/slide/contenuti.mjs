// Contenuto delle 49 scene della lezione 6.2 — Rischio e rendimento senza paura.
// s02–s48 sono i blocchi 1–47 del copione, uno a uno.

const CORSO = 'Perseo Sirio senza segreti';
const FIRMA = 'Un corso CISL FP Padova Rovigo';

const lin = (id, sop, fase) => ({ id, tipo: 'linee', tema: 'chiaro', sopratitolo: sop, fase });
const pac = (id, sop, fase) => ({ id, tipo: 'pac', tema: 'chiaro', sopratitolo: sop, fase });

const RIGHE = [
  ['Che cosa sono', 'Un prestito a Stati o imprese', 'Una quota di un\'impresa'],
  ['Rendimento atteso', 'Più basso', '**Più alto**'],
  ['Oscillazioni', 'Più contenute', '**Più ampie**'],
];
const tab = (id, k, chiave) => ({ id, tipo: 'tabella', tema: 'chiaro', sopratitolo: 'Due ingredienti',
  intestazioni: ['', 'Obbligazioni', 'Azioni'], colonne: ['28%', '36%', '36%'], righe: RIGHE.slice(0, k), chiave });

const ERRORI = [
  { n: 'PRIMO', t: 'Guardare il saldo ogni settimana' },
  { n: 'SECONDO', t: 'Scappare dopo un calo' },
  { n: 'TERZO', t: 'Scegliere il migliore dell\'anno scorso' },
];
const err = (id, k) => ({ id, tipo: 'tre', tema: 'chiaro', sopratitolo: 'Tre errori da evitare', box: ERRORI.map((b, i) => ({ ...b, key: k === 9 || i === k })) });

const TRE_COSE = [
  'Obbligazioni calme, **azioni mosse**',
  'Conta **l\'orizzonte**',
  'I versamenti regolari **aiutano**',
];

const PASSI = [
  { t: 'Immagina il **prospetto annuale**' },
  { t: 'La posizione è scesa del **10%**' },
  { t: '**Che cosa faresti?**', key: true },
];

export const SCENE = [
{ id: 's01', tipo: 'copertina', tema: 'chiaro',
  modulo: 'Modulo 6 · Dove vanno i tuoi soldi',
  titolo: 'Rischio e rendimento<br>senza paura', sottotitolo: 'Lezione 6.2',
  ente: `${CORSO} · ${FIRMA}` },

// 1 · apertura
{ id: 's02', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Dal ponte, in mezzo alla tempesta', illu: 'bussola',
  titolo: 'Sembra di non andare<br>**da nessuna parte**' },
{ id: 's03', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Vista dall\'alto', illu: 'bussola',
  titolo: 'La scia va dritta<br>**verso la meta**', sotto: 'Le onde non cambiano la rotta.' },
{ id: 's04', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Gli investimenti',
  col: [{ h: 'Visti da vicino', t: 'Oscillano', grande: true },
        { h: 'Visti da lontano', t: '**Hanno una direzione**', grande: true }] },
{ id: 's05', tipo: 'figura', tema: 'chiaro', sopratitolo: 'In questa lezione', illu: 'domanda',
  titolo: 'Perché succede,<br>**e che cosa c\'entra la tua età**', sotto: 'Senza formule e senza paura.' },
{ id: 's06', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Come sempre nel modulo', illu: 'campana',
  titolo: 'Informazioni generali,<br>**non consulenza finanziaria**', sotto: 'I rendimenti passati non garantiscono quelli futuri.' },

// 2 · due ingredienti
{ id: 's07', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'I due ingredienti di ogni investimento',
  col: [{ h: 'Primo', t: '**Obbligazioni**', grande: true },
        { h: 'Secondo', t: '**Azioni**', grande: true }] },
{ id: 's08', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Le obbligazioni', illu: 'contratto',
  titolo: 'Un prestito<br>**a Stati o imprese**', sotto: 'Restituito alla scadenza, con un interesse.' },
{ id: 's09', tipo: 'figura', tema: 'chiaro', sopratitolo: 'La parte calma del viaggio', illu: 'scudo',
  titolo: 'Rendono meno,<br>**oscillano meno**' },
{ id: 's10', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Le azioni', illu: 'pilastri',
  titolo: 'Un piccolo pezzo<br>**di un\'azienda**' },
{ id: 's11', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Se l\'impresa cresce', illu: 'piramide',
  titolo: 'Crescono le azioni,<br>**e arrivano i dividendi**' },
tab('s12', 3, [1, 2]),
{ id: 's13', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Il rischio, in finanza', illu: 'domanda',
  titolo: 'Non è la probabilità<br>**di perdere tutto**' },
{ id: 's14', tipo: 'frase', tema: 'chiaro', sopratitolo: 'Il rischio è',
  testo: 'L\'ampiezza delle oscillazioni<br><b class="a">lungo la strada.</b>' },

// 3 · un anno contro vent'anni
lin('s15', 'Due linee, vent\'anni', 'linee'),
lin('s16', 'Una calma, una a scatti', 'linee'),
lin('s17', 'Se guardi un solo anno', 'anno'),
lin('s18', 'Chi ha bisogno dei soldi proprio allora', 'anno'),
lin('s19', 'Se allarghi lo sguardo', 'venti'),
{ id: 's20', tipo: 'figura', tema: 'chiaro', sopratitolo: 'La domanda sbagliata', illu: 'domanda',
  titolo: 'Qual è l\'investimento<br>**migliore?**', sotto: 'Una risposta valida per tutti non esiste.' },
{ id: 's21', tipo: 'frase', tema: 'chiaro', sopratitolo: 'La domanda giusta',
  testo: 'Fra quanti anni<br><b class="a">mi serviranno questi soldi?</b>' },
{ id: 's22', tipo: 'figura', tema: 'chiaro', sopratitolo: 'L\'orizzonte temporale', illu: 'clessidra',
  titolo: 'Il numero<br>**della lezione 6.1**' },
{ id: 's23', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'L\'orizzonte',
  col: [{ h: 'Più lungo', t: 'Più tempo per **assorbire un anno storto**', grande: true },
        { h: 'Più corto', t: 'Conta di più **la stabilità**', grande: true }] },

// 4 · la regolarità
{ id: 's24', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Il secondo alleato', illu: 'calendario',
  titolo: 'La regolarità' },
{ id: 's25', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Ogni mese, con la busta paga', illu: 'salvadanaio',
  titolo: 'Una piccola somma,<br>**per molti anni**' },
pac('s26', 'Quando i mercati scendono', 'prezzo'),
pac('s27', 'La stessa somma compra più quote', 'quote'),
{ id: 's28', tipo: 'cifre', tema: 'chiaro', sopratitolo: 'L\'esempio sul sito del Fondo',
  voci: [{ n: '40 €', t: 'Al mese', key: true }, { n: '20 + 20', t: 'Lavoratore + ente' }] },
{ id: 's29', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Per vent\'anni', illu: 'stelle',
  titolo: 'In un indice<br>**azionario mondiale**', sotto: 'Attraverso crisi e riprese.' },
{ id: 's30', tipo: 'frase', tema: 'chiaro', sopratitolo: 'Il versamento costante',
  testo: 'Non elimina i momenti negativi,<br><b class="a">li rende meno pesanti.</b>' },

// 5 · tre errori
err('s31', 9),
err('s32', 0),
err('s33', 1),
{ id: 's34', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Chi esce dopo la caduta', illu: 'semaforo',
  titolo: 'Non partecipa<br>**alla risalita**' },
err('s35', 2),
{ id: 's36', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Il profilo si sceglie',
  col: [{ h: 'Su', t: '**Orizzonte e tranquillità**', grande: true },
        { h: 'Non su', t: 'Notizie del giorno', grande: true }] },

// 6 · memo
{ id: 's37', tipo: 'frase', tema: 'profondo', sopratitolo: 'Da ricordare',
  testo: 'Prima di chiederti quanto rende,<br><b class="a">chiediti quando ti serviranno.</b>' },

// 7 · chiusura
{ id: 's38', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE, attive: [0] },
{ id: 's39', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE, attive: [0, 1] },
{ id: 's40', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE },
{ id: 's41', tipo: 'mossa', tema: 'chiaro', sopratitolo: 'La mossa di oggi', illu: 'lente',
  titolo: 'Un esperimento<br>**sincero**', passi: PASSI },
{ id: 's42', tipo: 'cifre', tema: 'chiaro', sopratitolo: 'Immagina',
  voci: [{ n: '−10%', t: 'La tua posizione, in un anno', key: true }] },
{ id: 's43', tipo: 'tre', tema: 'chiaro', sopratitolo: 'Che cosa faresti?',
  box: [{ n: 'RESTO', t: 'Tranquillo' }, { n: 'MI PREOCCUPO', t: 'Un po\'' }, { n: 'CAMBIO', t: 'Tutto' }] },
{ id: 's44', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Nessuna risposta giusta', illu: 'bilancia',
  titolo: 'Conta la tua<br>**risposta sincera**' },
{ id: 's45', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'I due criteri per scegliere',
  col: [{ h: 'Primo', t: '**Gli anni alla pensione**', grande: true },
        { h: 'Secondo', t: '**La tua tranquillità**', grande: true }] },
{ id: 's46', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Prossima lezione', illu: 'bussola',
  titolo: 'Comparti e profili<br>**di Perseo Sirio**' },
{ id: 's47', tipo: 'cifre', tema: 'chiaro', sopratitolo: 'Vedremo',
  voci: [{ n: '6', t: 'Profili che puoi scegliere', key: true }, { n: '1', t: 'Comparto che non si sceglie: l\'azionario' }] },
{ id: 's48', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Ci vediamo nella lezione 6.3', illu: 'semaforo',
  titolo: 'Tre comparti,<br>**sei profili**' },

{ id: 's49', tipo: 'copertina', tema: 'profondo', chiusura: true, corso: CORSO, firma: FIRMA },
];
