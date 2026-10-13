// Contenuto delle 49 scene della lezione 10.4 — Anna, l'OSS in servizio dal 1996.
// s02–s48 sono i blocchi 1–47 del copione, uno a uno.
// Ogni slide del caso porta in basso l'avviso «caso illustrativo».

const CORSO = 'Perseo Sirio senza segreti';
const FIRMA = 'Un corso CISL FP Padova Rovigo';
const AVV = 'Caso illustrativo · Esempio semplificato · Non è una previsione';

const S = o => ({ tema: 'chiaro', avviso: AVV, ...o });

const CONTI = (id, chiave) => S({ id, tipo: 'tabella', sopratitolo: 'Ogni anno, con 27.000 € di retribuzione utile',
  intestazioni: ['Chi versa', 'Quanto all\'anno'], colonne: ['60%', '40%'],
  righe: [['**Anna**, 1%', '270 €'], ['**L\'ente**, 1%', '270 €'], ['**TFR** al Fondo, 2%', '540 €'],
          ['**Accantonamento aggiuntivo** 1,5% di 21.600 €', '324 €'], ['**Totale** verso la pensione', '≈ 1.404 €']], chiave });

const PIATTI = [
  { n: 'GUADAGNA', t: '**Ente**: ≈ 3.500 € in 13 anni' },
  { n: 'GUADAGNA', t: '**1,5%** aggiuntivo: oltre 4.000 €' },
  { n: 'GUADAGNA', t: 'La **deduzione** fiscale' },
  { n: 'DA VALUTARE', t: 'Aumenti di **fine carriera**?', no: true },
  { n: 'DA VALUTARE', t: '13 anni: **anzianità no**, vecchiaia sì', no: true },
];
const pia = (id, attive) => S({ id, tipo: 'griglia', colonne: 1, spunta: false, sopratitolo: 'La bilancia di Anna', celle: PIATTI, ...(attive ? { attive } : {}) });

const TRE_COSE = [
  'Opzione possibile **fino al 2030**',
  'Il TFS maturato **non si perde**',
  'Pesa **carriera** e **anni che mancano**',
];

const PASSI = [
  { t: 'Prenota **la consulenza** del Fondo' },
  { t: 'Oppure **lo sportello** sindacale' },
  { t: 'Porta **l\'ultimo cedolino**', key: true },
];

export const SCENE = [
{ id: 's01', tipo: 'copertina', tema: 'chiaro',
  modulo: 'Modulo 10 · Decidere con i tuoi numeri',
  titolo: 'Anna, in servizio dal 1996', sottotitolo: 'Lezione 10.4',
  ente: `${CORSO} · ${FIRMA}` },

// 1 · apertura
S({ id: 's02', tipo: 'figura', sopratitolo: '54 anni · in servizio dal 1996', illu: 'persona',
  titolo: 'Anna,<br>**operatrice socio sanitaria**', sotto: 'A tempo indeterminato, nella sanità pubblica.' }),
S({ id: 's03', tipo: 'figura', sopratitolo: 'Quasi trent\'anni di turni', illu: 'letto',
  titolo: 'Gesti<br>**sicuri**' }),
S({ id: 's04', tipo: 'frase', sopratitolo: 'Il fondo pensione',
  testo: 'Ne ha sempre sentito parlare.<br><b class="a">Non ha mai aderito.</b>' }),
S({ id: 's05', tipo: 'figura', sopratitolo: 'C\'è tempo fino al 2030', illu: 'domanda',
  titolo: 'Ne vale<br>**ancora la pena?**' }),
S({ id: 's06', tipo: 'confronto', sopratitolo: 'La scelta più delicata del corso',
  col: [{ h: 'Lasciare', t: 'Il TFS', grande: true },
        { h: 'Passare', t: '**Al TFR**', grande: true }] }),
S({ id: 's07', tipo: 'frase', sopratitolo: 'Ricorda',
  testo: 'Anna e i suoi numeri<br><b class="a">sono inventati.</b>' }),

// 2 · lo scambio
S({ id: 's08', tipo: 'figura', sopratitolo: 'Assunta prima del 2001', illu: 'cartella',
  titolo: 'Anna<br>**è in TFS**', sotto: 'Indennità premio di servizio.' }),
S({ id: 's09', tipo: 'scambio', sopratitolo: 'Il binario della lezione 2.4' }),
S({ id: 's10', tipo: 'frase', sopratitolo: 'Se aderisce',
  testo: 'Passa al TFR.<br><b class="a">Non si torna indietro.</b>' }),
S({ id: 's11', tipo: 'figura', sopratitolo: 'La paura di molti', illu: 'domanda',
  titolo: 'E i trent\'anni<br>**di servizio?**' }),
S({ id: 's12', tipo: 'scambio', sopratitolo: 'Calcolato con le vecchie regole, fotografato', fase: 'vagone' }),
S({ id: 's13', tipo: 'confronto', sopratitolo: 'Il TFS maturato',
  col: [{ h: 'Rivalutato', t: 'Come il TFR', grande: true },
        { h: 'Conserva', t: '**Il fisco del TFS**', grande: true }] }),
S({ id: 's14', tipo: 'frase', sopratitolo: 'Cambiano solo gli anni futuri',
  testo: 'Il passato<br><b class="a">resta al sicuro.</b>' }),
S({ id: 's15', tipo: 'cifre', sopratitolo: 'Ogni anno di attesa è un anno di contributi in meno',
  voci: [{ n: '31.12.2030', t: 'Ultimo giorno per l\'opzione', key: true }] }),

// 3 · i numeri
S({ id: 's16', tipo: 'cifre', sopratitolo: 'Retribuzione utile',
  voci: [{ n: '27.000 €', t: 'All\'anno', key: true }] }),
CONTI('s17', [0]),
CONTI('s18', [1]),
CONTI('s19', [2]),
CONTI('s20', [3]),
CONTI('s21', [4]),
S({ id: 's22', tipo: 'cifre', sopratitolo: 'Fino a 67 anni ne mancano 13',
  voci: [{ n: '≈ 18.250 €', t: 'Versati, stipendio fermo', key: true }] }),
S({ id: 's23', tipo: 'confronto', sopratitolo: 'Con un rendimento netto del 2–3%',
  col: [{ h: 'Diventerebbero', t: '≈ 21–22.000 €', grande: true },
        { h: 'Dalla sua busta paga', t: '**270 € l\'anno**', grande: true }] }),

// 4 · la bilancia
S({ id: 's24', tipo: 'figura', sopratitolo: 'La bilancia della lezione 2.4', illu: 'bilancia',
  titolo: 'Con i pesi<br>**di Anna**' }),
pia('s25', [0]),
pia('s26', [0, 1, 2]),
S({ id: 's27', tipo: 'frase', sopratitolo: 'Sull\'altro piatto',
  testo: 'Due domande.<br><b class="a">Solo Anna conosce le risposte.</b>' }),
pia('s28', [3]),
S({ id: 's29', tipo: 'figura', sopratitolo: 'Se sì', illu: 'lente',
  titolo: 'Il TFS l\'avrebbe<br>**premiata**', sotto: 'Un vantaggio da pesare, numeri alla mano.' }),
pia('s30', [3, 4]),
S({ id: 's31', tipo: 'confronto', sopratitolo: 'Con 13 anni di iscrizione · lezione 9.1',
  col: [{ h: 'Anzianità', t: 'Dal 2027 no (servono 15)', grande: true },
        { h: 'Vecchiaia', t: '**Sì, a 67 anni**', grande: true }] }),
S({ id: 's32', tipo: 'cifre', sopratitolo: 'Meno di 15 anni di partecipazione',
  voci: [{ n: '15%', t: 'Di tasse sulla prestazione', key: true }] }),

// 5 · che cosa dovrebbe fare
S({ id: 's33', tipo: 'confronto', sopratitolo: 'Che cosa dovrebbe fare Anna',
  col: [{ h: 'Non decidere', t: 'Da sola', grande: true },
        { h: 'Non decidere', t: '**In fretta**', grande: true }] }),
S({ id: 's34', tipo: 'tre', sopratitolo: 'Una simulazione personalizzata',
  box: [{ n: 'RETRIBUZIONE', t: 'La sua' }, { n: 'ANZIANITÀ', t: 'La sua' }, { n: 'CARRIERA', t: 'Quella attesa', key: true }] }),
S({ id: 's35', tipo: 'tre', sopratitolo: 'Dove chiederla',
  box: [{ n: 'IL FONDO', t: 'Consulenza gratuita', key: true }, { n: 'IL PATRONATO', t: '' }, { n: 'LO SPORTELLO', t: 'Sindacale' }] }),
S({ id: 's36', tipo: 'figura', sopratitolo: 'Le sue cifre, non quelle di un esempio', illu: 'dialogo',
  titolo: 'Una riga<br>**sottolineata**' }),
S({ id: 's37', tipo: 'frase', sopratitolo: 'Una scelta irrevocabile',
  testo: 'Un\'ora di calcoli veri,<br><b class="a">non la pausa caffè.</b>' }),
S({ id: 's38', tipo: 'confronto', sopratitolo: 'Qualunque sia la risposta',
  col: [{ h: 'Aderire', t: 'O restare nel TFS', grande: true },
        { h: 'Una scelta fatta', t: '**Con i suoi numeri**', grande: true }] }),

// 6 · memo
{ id: 's39', tipo: 'frase', tema: 'profondo', sopratitolo: 'Da ricordare',
  testo: 'Irrevocabile vuol dire:<br><b class="a">prima i conti.</b>' },

// 7 · chiusura
{ id: 's40', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE, attive: [] },
{ id: 's41', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE, attive: [0] },
{ id: 's42', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE, attive: [0, 1] },
{ id: 's43', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE },
{ id: 's44', tipo: 'mossa', tema: 'chiaro', sopratitolo: 'La mossa di oggi', illu: 'calendario',
  titolo: 'Prenota **una simulazione**', passi: PASSI },
{ id: 's45', tipo: 'figura', tema: 'chiaro', sopratitolo: '26 anni · tecnico di radiologia', illu: 'schermo',
  titolo: 'Marco,<br>**nella prossima lezione**' },
{ id: 's46', tipo: 'cifre', tema: 'chiaro', sopratitolo: 'Contratto a tempo determinato',
  voci: [{ n: '12 mesi', t: 'E poi?', key: true }] },
{ id: 's47', tipo: 'tre', tema: 'chiaro', sopratitolo: 'Vedremo',
  box: [{ n: '1', t: 'Se può aderire' }, { n: '2', t: 'Quando firmare' }, { n: '3', t: 'Alla scadenza', key: true }] },
{ id: 's48', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Ci vediamo nella lezione 10.5', illu: 'contratto',
  titolo: 'Il tecnico<br>**a tempo determinato**' },

{ id: 's49', tipo: 'copertina', tema: 'profondo', chiusura: true, corso: CORSO, firma: FIRMA },
];
