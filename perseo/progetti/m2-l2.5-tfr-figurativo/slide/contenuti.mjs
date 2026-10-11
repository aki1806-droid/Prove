// Contenuto delle 44 scene della lezione 2.5 — Il TFR figurativo.
// s02–s43 sono i blocchi 1–42 del copione, uno a uno.

const CORSO = 'Perseo Sirio senza segreti';
const FIRMA = 'Un corso CISL FP Padova Rovigo';

const CONSEGUENZE = [
  { t: 'Le **anticipazioni** riguardano solo la tasca reale' },
  { t: 'Se **trasferisci** lavorando nel pubblico, il figurativo resta all\'INPS' },
  { t: 'Alla **prestazione** la parte figurativa arriva dopo', key: true },
];

const PROSPETTO = [
  { n: 'VERSATO', t: 'I contributi tuoi e dell\'ente' },
  { n: 'TFR VIRTUALE', t: 'Quanto ha contabilizzato l\'INPS', key: true },
  { n: 'RISULTATO', t: 'Della gestione, netto di costi e tasse' },
];

const TRE_COSE = [
  'Due tasche: **reale** e **figurativa**',
  'Dal 2026 il figurativo segue **il profilo che scegli**',
  'Si uniscono **solo alla fine** del lavoro',
];

const PASSI = [
  { t: 'Entra nell\'**area riservata**' },
  { t: 'Sezione **documentazione**' },
  { t: 'Apri il **prospetto annuale**' },
  { t: 'Trova il **TFR virtuale**', key: true },
];

export const SCENE = [
{ id: 's01', tipo: 'copertina', tema: 'chiaro',
  modulo: 'Modulo 2 · La tua liquidazione: TFS e TFR',
  titolo: 'Il TFR<br>figurativo', sottotitolo: 'Lezione 2.5',
  ente: `${CORSO} · ${FIRMA}` },

// 1 · apertura
{ id: 's02', tipo: 'vignetta', tema: 'chiaro', sopratitolo: '«Il mio TFR non c\'è»', illu: ['schermo', 'telefono'] },
{ id: 's03', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Ha ragione a stupirsi', illu: 'lente',
  titolo: 'Sul conto<br>**molto meno**', sotto: 'Di quanto si aspettava.' },
{ id: 's04', tipo: 'tasche', tema: 'chiaro', sopratitolo: 'Solo nel pubblico impiego', fase: 'reale' },
{ id: 's05', tipo: 'tre', tema: 'chiaro', sopratitolo: 'In questa lezione',
  box: [{ n: 'VEDERE', t: 'L\'altra tasca' }, { n: 'CAPIRE', t: 'Come cresce' }, { n: 'SAPERE', t: 'Quando arriva', key: true }] },

// 2 · le due tasche
{ id: 's06', tipo: 'tasche', tema: 'chiaro', sopratitolo: 'Un cappotto, due tasche', fase: 'due', monete: { reale: [], fig: [] } },
{ id: 's07', tipo: 'tasche', tema: 'chiaro', sopratitolo: 'La prima tasca: il conto reale', fase: 'reale' },
{ id: 's08', tipo: 'icone', tema: 'chiaro', sopratitolo: 'Nella tasca reale',
  voci: [{ icona: 'euro', t: 'Versati ogni mese' }, { icona: 'ingranaggio', t: 'Investiti dai gestori' }, { icona: 'occhio', t: 'Visibili nell\'area riservata', key: true }] },
{ id: 's09', tipo: 'tasche', tema: 'chiaro', sopratitolo: 'La seconda tasca: il conto figurativo', fase: 'due', optanti: true },
{ id: 's10', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Non vengono versati', illu: 'cartella',
  titolo: 'L\'INPS li registra<br>e li **rivaluta**' },
{ id: 's11', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Esistono, sono tuoi', illu: 'contratto',
  titolo: 'Scritti<br>**a matita**', sotto: 'Diventano veri alla fine del lavoro.' },
{ id: 's12', tipo: 'tasche', tema: 'chiaro', sopratitolo: 'Con 30.000 euro, assunto dopo il 2000',
  fase: 'due', monete: { reale: ['600 € l\'anno'], fig: ['2.070 € l\'anno'] } },
{ id: 's13', tipo: 'figura', tema: 'chiaro', sopratitolo: 'La tasca a matita', illu: 'lente',
  titolo: 'Spesso è<br>**la più grande**' },

// 3 · perche' figurativo
{ id: 's14', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Perché «figurativo»',
  col: [{ h: 'Molte aziende private', t: 'Un fondo **vero**', grande: true },
        { h: 'Pubblico impiego', t: 'Nessun **accantonamento**', grande: true }] },
{ id: 's15', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Durante il lavoro', illu: 'armadietto',
  titolo: 'Nessuna cassaforte<br>**con il tuo nome**', sotto: 'Il TFR lo paga l\'INPS alla fine.' },
{ id: 's16', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Niente paura',
  col: [{ h: 'Non è', t: 'Un **trucco** né un **rischio**', grande: true },
        { h: 'È', t: 'Il meccanismo **di sempre**', grande: true }] },
{ id: 's17', tipo: 'tasche', tema: 'chiaro', sopratitolo: 'L\'INPS lo contabilizza e lo rivaluta', fase: 'due' },
{ id: 's18', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Sanità ed enti locali', illu: 'cartella',
  titolo: 'Il conto lo tiene<br>**l\'INPS**' },
{ id: 's19', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Poche amministrazioni', illu: 'pilastri',
  titolo: 'Il datore di lavoro,<br>**stesso principio**' },

// 4 · come cresce
{ id: 's20', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Come cresce', illu: 'stelle',
  titolo: 'Una novità<br>**poco conosciuta**' },
{ id: 's21', tipo: 'timeline', tema: 'chiaro', sopratitolo: 'La rivalutazione del figurativo',
  tappe: [{ anno: 'Fino al 2025', et: 'Un paniere di fondi, uguale per tutti' }, { anno: 'Dal 2026', et: 'Il profilo che scegli tu', key: true }], attive: [0] },
{ id: 's22', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Fino al 2025', illu: 'persona',
  titolo: 'Cresceva<br>**come per tutti**', sotto: 'Qualunque scelta per la tasca reale.' },
{ id: 's23', tipo: 'tasche', tema: 'chiaro', sopratitolo: 'Dal 1° gennaio 2026', fase: 'manopola' },
{ id: 's24', tipo: 'tasche', tema: 'chiaro', sopratitolo: 'Anche un profilo diverso', fase: 'profili',
  profili: { reale: 'un profilo', fig: 'un altro profilo' } },
{ id: 's25', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Ne parleremo nel modulo 6', illu: 'bussola',
  titolo: 'Anche il tuo TFR<br>**dipende da te**' },

// 5 · quando si uniscono
{ id: 's26', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Quando diventano una sola?', illu: 'clessidra',
  titolo: 'Alla fine<br>**del rapporto di lavoro**', sotto: 'Uscendo dall\'INPS gestione pubblica.' },
{ id: 's27', tipo: 'tasche', tema: 'chiaro', sopratitolo: 'Le monete a matita diventano vere', fase: 'unione' },
{ id: 's28', tipo: 'catena', tema: 'chiaro', sopratitolo: 'Tre conseguenze pratiche', passi: CONSEGUENZE, attive: [0] },
{ id: 's29', tipo: 'catena', tema: 'chiaro', sopratitolo: 'Tre conseguenze pratiche', passi: CONSEGUENZE, attive: [0, 1] },
{ id: 's30', tipo: 'catena', tema: 'chiaro', sopratitolo: 'Tre conseguenze pratiche', passi: CONSEGUENZE },
{ id: 's31', tipo: 'cifre', tema: 'chiaro', sopratitolo: 'I tempi dell\'INPS, secondo il Fondo',
  voci: [{ n: '12', t: 'Mesi, in genere', key: true }, { n: '18', t: 'Mesi al massimo' }] },

// 6 · dove si vede
{ id: 's32', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Dove si vede', illu: 'lettera',
  titolo: 'Il prospetto<br>**ogni anno**', sotto: 'Nell\'area riservata.' },
{ id: 's33', tipo: 'griglia', tema: 'chiaro', colonne: 1, spunta: false, sopratitolo: 'Nel prospetto', celle: PROSPETTO, attive: [0, 1] },
{ id: 's34', tipo: 'griglia', tema: 'chiaro', colonne: 1, spunta: false, sopratitolo: 'Nel prospetto', celle: PROSPETTO },
{ id: 's35', tipo: 'figura', tema: 'chiaro', sopratitolo: 'La tasca sembra vuota?', illu: 'orologio',
  titolo: 'Spesso è<br>**questione di tempi**' },
{ id: 's36', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Se qualcosa non torna', illu: 'cartella',
  titolo: 'Chiedi<br>all\'**ufficio del personale**', sotto: 'Trasmette i dati all\'INPS.' },

// 7 · memo
{ id: 's37', tipo: 'frase', tema: 'profondo', sopratitolo: 'Da ricordare',
  testo: 'Il TFR figurativo è scritto a matita. <b class="a">Ma è tuo.</b>' },

// 8 · chiusura
{ id: 's38', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE, attive: [0] },
{ id: 's39', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE, attive: [0, 1] },
{ id: 's40', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE },
{ id: 's41', tipo: 'mossa', tema: 'chiaro', sopratitolo: 'La mossa di oggi · se sei iscritto', illu: 'schermo',
  titolo: 'Trova le **due tasche**', passi: PASSI },
{ id: 's42', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Fine del modulo 2', illu: 'salvadanaio',
  titolo: 'Sai dov\'è<br>**la tua liquidazione**' },
{ id: 's43', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Prossimo modulo', illu: 'contratto',
  titolo: 'Chi può aderire<br>**e come**', sotto: 'Passo per passo.' },

{ id: 's44', tipo: 'copertina', tema: 'profondo', chiusura: true, corso: CORSO, firma: FIRMA },
];
