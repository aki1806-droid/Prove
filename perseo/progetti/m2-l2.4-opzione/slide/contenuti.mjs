// Contenuto delle 44 scene della lezione 2.4 — Dal TFS al TFR: l'opzione.
// s02–s43 sono i blocchi 1–42 del copione, uno a uno.

const CORSO = 'Perseo Sirio senza segreti';
const FIRMA = 'Un corso CISL FP Padova Rovigo';

const QUOTE = [
  { v: 28.94, t: '28,94% · al Fondo', d: '= 2% della retribuzione', colore: 'var(--acc)' },
  { v: 71.06, t: '71,06% · resta liquidazione', d: 'si forma come TFR', colore: '#00633B' },
];
const QUOTE_EURO = [
  { v: 600, t: '600 € · al Fondo', d: '28,94% di 2.070', colore: 'var(--acc)' },
  { v: 1470, t: '1.470 € · liquidazione', d: 'il resto del TFR', colore: '#00633B' },
];

const PIATTI = [
  { n: 'A FAVORE', t: 'L\'**1,5%** in più' },
  { n: 'A FAVORE', t: 'Il contributo **dell\'ente**' },
  { n: 'A FAVORE', t: 'I vantaggi **fiscali**' },
  { n: 'DA VALUTARE', t: 'Aumenti di **fine carriera**?', no: true },
  { n: 'DA VALUTARE', t: 'Quanti **anni mancano**?', no: true },
];

const TRE_COSE = [
  'Aderire in TFS = passare al TFR, **irrevocabile**',
  'Al Fondo il **28,94%** del TFR, più l\'**1,5%** sulla base TFS',
  'Si può optare **fino al 31/12/2030**',
];

const PASSI = [
  { t: 'Prenota una **consulenza gratuita**' },
  { t: 'Dal **sito** o al **numero verde**' },
  { t: 'Oppure: **simulazione** dal delegato', key: true },
];

export const SCENE = [
{ id: 's01', tipo: 'copertina', tema: 'chiaro',
  modulo: 'Modulo 2 · La tua liquidazione: TFS e TFR',
  titolo: 'Dal TFS al TFR:<br>l\'opzione', sottotitolo: 'Lezione 2.4',
  ente: `${CORSO} · ${FIRMA}` },

// 1 · apertura
{ id: 's02', tipo: 'linea2000', tema: 'chiaro', sopratitolo: 'Per chi è in TFS', fase: 'persone',
  sopra: [{ t: 'assunto entro il 2000', s: 'TFS' }, { t: '', s: '' }] },
{ id: 's03', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Se sei stato assunto dopo', illu: 'dialogo',
  titolo: 'Ti aiuta<br>con i **colleghi anziani**' },
{ id: 's04', tipo: 'scambio', tema: 'chiaro', sopratitolo: 'Uno scambio ferroviario' },
{ id: 's05', tipo: 'icone', tema: 'chiaro', sopratitolo: 'Prima di tirare la leva',
  voci: [{ icona: 'bilancia', t: 'Dove porta' }, { icona: 'cartella', t: 'Che cosa resta' },
         { icona: 'euro', t: 'Che cosa si guadagna' }, { icona: 'lente', t: 'Che cosa valutare', key: true }] },

// 2 · la regola
{ id: 's06', tipo: 'scambio', tema: 'chiaro', sopratitolo: 'Aderire = passare al TFR' },
{ id: 's07', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Due cose che vanno insieme',
  col: [{ h: 'Aderire restando in TFS', t: '× **Non si può**', grande: true },
        { h: 'Aderire e passare al TFR', t: '✓ **Insieme**', grande: true }] },
{ id: 's08', tipo: 'figura', tema: 'chiaro', sopratitolo: 'L\'opzione', illu: 'contratto',
  titolo: 'Si esercita<br>con il **modulo di adesione**', sotto: 'Nessun\'altra domanda.' },
{ id: 's09', tipo: 'scambio', tema: 'chiaro', sopratitolo: 'Il maturato non va perso', fase: 'vagone' },
{ id: 's10', tipo: 'tre', tema: 'chiaro', sopratitolo: 'Il TFS già maturato',
  box: [{ n: 'CALCOLATO', t: 'Con le regole TFS' }, { n: 'RIVALUTATO', t: 'Come il TFR' }, { n: 'FISCO', t: 'Resta quello del TFS', key: true }] },
{ id: 's11', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Nessuno te lo toglie', illu: 'scudo',
  titolo: 'Cambia solo<br>**da quel giorno in avanti**' },
{ id: 's12', tipo: 'scambio', tema: 'chiaro', sopratitolo: 'Un vagone agganciato al nuovo treno', fase: 'vagone' },
{ id: 's13', tipo: 'montante', tema: 'chiaro', sopratitolo: 'Dall\'adesione: le regole del TFR', fase: 'accumulo', etichetta: 'TFR' },

// 3 · che cosa va nel Fondo
{ id: 's14', tipo: 'figura', tema: 'chiaro', sopratitolo: 'In servizio prima del 2001', illu: 'salvadanaio',
  titolo: 'Al Fondo<br>**non tutto** il TFR' },
{ id: 's15', tipo: 'impila', tema: 'chiaro', sopratitolo: 'La quota annua di TFR', segmenti: QUOTE },
{ id: 's16', tipo: 'conto', tema: 'chiaro', sopratitolo: 'Un\'idea semplice',
  voci: [{ v: '28,94%', lb: 'della quota' }, { v: '6,91%', lb: 'di TFR' }, { v: '2%', lb: 'della retribuzione' }],
  op: ['×', '='] },
{ id: 's17', tipo: 'impila', tema: 'chiaro', sopratitolo: 'Con trentamila euro: circa 2.070 di TFR', segmenti: QUOTE_EURO },
{ id: 's18', tipo: 'cifre', tema: 'chiaro', sopratitolo: 'Il premio per chi sceglie',
  voci: [{ n: '1,5', suf: '%', t: 'Della base TFS', d: 'Cioè dell\'80% della retribuzione utile.', key: true }] },
{ id: 's19', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Una quota in più', illu: 'salvadanaio',
  titolo: 'Tutta<br>**nella tua posizione**', sotto: 'I colleghi assunti dopo il 2000 non ce l\'hanno.' },

// 4 · quanto vale
{ id: 's20', tipo: 'cifre', tema: 'chiaro', sopratitolo: 'Quanto vale in euro',
  voci: [{ n: '30.000', suf: '€', t: 'Retribuzione utile', key: true }] },
{ id: 's21', tipo: 'conto', tema: 'chiaro', sopratitolo: 'L\'1,5% sulla base TFS',
  voci: [{ v: '24.000 €', lb: 'base: l\'80%' }, { v: '1,5%', lb: 'accantonamento' }, { v: '360 €', lb: 'l\'anno' }],
  op: ['×', '='] },
{ id: 's22', tipo: 'griglia', tema: 'chiaro', colonne: 2, spunta: false, sopratitolo: 'Ogni anno nella posizione',
  celle: [{ n: 'TU', t: 'Il tuo contributo' }, { n: 'ENTE', t: 'Il contributo dell\'ente' },
          { n: 'TFR', t: 'La quota del 28,94%' }, { n: '+ 360 €', t: 'L\'accantonamento aggiuntivo', key: true }] },
{ id: 's23', tipo: 'conto', tema: 'chiaro', sopratitolo: 'Su vent\'anni',
  voci: [{ v: '360 €', lb: 'l\'anno' }, { v: '20', lb: 'anni' }, { v: '7.200 €', lb: 'senza rendimenti' }],
  op: ['×', '='] },
{ id: 's24', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Una precisazione', illu: 'calendario',
  titolo: 'Non versata<br>**mese per mese**' },
{ id: 's25', tipo: 'tasche', tema: 'chiaro', sopratitolo: 'La accantona l\'INPS', fase: 'due', optanti: true },

// 5 · la bilancia
{ id: 's26', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Conviene?', illu: 'bilancia',
  titolo: 'Onestamente:<br>**dipende**' },
{ id: 's27', tipo: 'griglia', tema: 'chiaro', colonne: 1, spunta: false, sopratitolo: 'Sui piatti della bilancia', celle: PIATTI, attive: [0, 1, 2] },
{ id: 's28', tipo: 'griglia', tema: 'chiaro', colonne: 1, spunta: false, sopratitolo: 'Sui piatti della bilancia', celle: PIATTI, attive: [3] },
{ id: 's29', tipo: 'griglia', tema: 'chiaro', colonne: 1, spunta: false, sopratitolo: 'Sui piatti della bilancia', celle: PIATTI, attive: [3, 4] },
{ id: 's30', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Stesso stipendio',
  col: [{ h: 'Una collega', t: 'Aderisce', grande: true },
        { h: 'L\'altra', t: 'Resta in TFS', grande: true }] },
{ id: 's31', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Due domande, i tuoi numeri', illu: 'lente',
  titolo: 'Meglio di qualunque<br>**consiglio di corridoio**' },

// 6 · avvertenze
{ id: 's32', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Prima avvertenza', illu: 'catena',
  titolo: 'È<br>**irrevocabile**', sotto: 'Non si torna indietro.' },
{ id: 's33', tipo: 'cifre', tema: 'chiaro', sopratitolo: 'Seconda avvertenza · accordo ARAN 2026',
  voci: [{ n: '31.12.2030', t: 'Ultimo giorno per optare', key: true }] },
{ id: 's34', tipo: 'figura', tema: 'chiaro', sopratitolo: 'C\'è tempo, ma non all\'infinito', illu: 'clessidra',
  titolo: 'Più aspetti,<br>**meno anni** per crescere' },
{ id: 's35', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Se non fai nulla',
  col: [{ h: 'Resti in TFS', t: 'Le regole **di sempre**', grande: true },
        { h: 'Contributo dell\'ente', t: '× **Non arriva**', grande: true }] },
{ id: 's36', tipo: 'icone', tema: 'chiaro', sopratitolo: 'Prima di firmare: una simulazione',
  voci: [{ icona: 'chat', t: 'Il Fondo, gratis' }, { icona: 'cartella', t: 'Il patronato' }, { icona: 'persone', t: 'Il sindacato', key: true }] },
{ id: 's37', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Più avanti nel corso', illu: 'stetoscopio',
  titolo: 'Un caso completo:<br>**un\'operatrice in TFS**' },

// 7 · memo
{ id: 's38', tipo: 'frase', tema: 'profondo', sopratitolo: 'Da ricordare',
  testo: 'Per chi è in TFS, prima vengono <b class="a">i numeri</b>. Poi la firma.' },

// 8 · chiusura
{ id: 's39', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE, attive: [0] },
{ id: 's40', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE, attive: [0, 1] },
{ id: 's41', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE },
{ id: 's42', tipo: 'mossa', tema: 'chiaro', sopratitolo: 'La mossa di oggi · se sei in TFS', illu: 'telefono',
  titolo: 'Chiedi una **simulazione**', passi: PASSI },
{ id: 's43', tipo: 'tasche', tema: 'chiaro', sopratitolo: 'Prossima lezione: dove finisce il TFR', fase: 'due' },

{ id: 's44', tipo: 'copertina', tema: 'profondo', chiusura: true, corso: CORSO, firma: FIRMA },
];
