// Contenuto delle 45 scene della lezione 2.3 — Come si calcola il TFR.
// s02–s44 sono i blocchi 1–43 del copione, uno a uno.

const CORSO = 'Perseo Sirio senza segreti';
const FIRMA = 'Un corso CISL FP Padova Rovigo';

const BARATTOLO = { tipo: 'montante', tema: 'chiaro', etichetta: 'TFR',
  rivtit: '+ rivalutazione', riv: ['1,5% fisso', '+ 75% dell\'inflazione'] };

const TABELLA = {
  intestazioni: ['', 'TFS', 'TFR'],
  colonne: ['26%', '37%', '37%'],
  righe: [
    ['Si basa su', 'l\'ultima retribuzione', 'le retribuzioni di ogni anno'],
    ['Formula', '80% ÷ 15 (o 12) × anni', '6,91% ogni anno'],
    ['Cresce con', 'gli aumenti di carriera', 'quote e rivalutazione'],
    ['Premia', 'chi sale molto alla fine', 'la regolarità'],
  ],
};
const tab = (id, n) => ({ id, tipo: 'tabella', tema: 'chiaro', sopratitolo: 'TFS e TFR a confronto', ...TABELLA,
  righe: TABELLA.righe.slice(0, n), chiave: n ? [n - 1] : [] });

const TRE_COSE = [
  'Ogni anno il **6,91%** della retribuzione utile',
  'Rivalutazione: **1,5% + 75%** dell\'inflazione',
  'Conta **tutta la carriera**, non solo l\'ultimo anno',
];

const PASSI = [
  { t: 'Retribuzione **annua lorda**' },
  { t: 'Moltiplica per **0,0691**' },
  { t: 'È il TFR di **un anno**', key: true },
];

export const SCENE = [
{ id: 's01', tipo: 'copertina', tema: 'chiaro',
  modulo: 'Modulo 2 · La tua liquidazione: TFS e TFR',
  titolo: 'Come si calcola<br>il TFR', sottotitolo: 'Lezione 2.3',
  ente: `${CORSO} · ${FIRMA}` },

// 1 · apertura
{ id: 's02', ...BARATTOLO, sopratitolo: 'Se il TFS è una scala, il TFR è un barattolo', fase: 'accumulo' },
{ id: 's03', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Alla fine conta',
  col: [{ h: 'TFS', t: 'L\'**ultimo** stipendio', grande: true },
        { h: 'TFR', t: '**Tutta** la carriera', grande: true }] },
{ id: 's04', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Due meccanismi, tenuti separati',
  col: [{ h: 'Ogni anno', t: 'Quanto **entra**', grande: true },
        { h: 'Nel tempo', t: 'Come **cresce**', grande: true }] },
{ id: 's05', tipo: 'linea2000', tema: 'chiaro', sopratitolo: 'Chi riguarda', fase: 'persone',
  sopra: [{ t: 'in TFS, se aderisce', s: 'domani' }, { t: 'assunto dal 2001', s: 'oggi' }] },

// 2 · la quota annuale
{ id: 's06', tipo: 'cifre', tema: 'chiaro', sopratitolo: 'La quota che entra ogni anno',
  voci: [{ n: '6,91', suf: '%', t: 'Della retribuzione utile', key: true }] },
{ id: 's07', tipo: 'cifre', tema: 'profondo', sopratitolo: 'Il numero della lezione',
  voci: [{ n: '6,91', suf: '%', t: 'Ogni anno', key: true }] },
{ id: 's08', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Una striscia di stipendio', illu: 'salvadanaio',
  titolo: 'Tagliata<br>e **messa da parte**' },
{ id: 's09', tipo: 'conto', tema: 'chiaro', sopratitolo: 'Con trentamila euro',
  voci: [{ v: '30.000 €', lb: 'retribuzione utile' }, { v: '6,91%', lb: 'quota' }, { v: '2.070 €', lb: 'circa, all\'anno' }],
  op: ['×', '≈'] },
{ id: 's10', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Retribuzione utile',
  col: [{ h: 'Conta', t: 'Le voci **previste**', grande: true },
        { h: 'Non è per forza', t: 'Tutto il **lordo**', grande: true }] },
{ id: 's11', ...BARATTOLO, sopratitolo: 'Le strisce si sommano', fase: 'accumulo' },
{ id: 's12', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Nel pubblico impiego', illu: 'cartella',
  titolo: 'Le calcola<br>e le tiene l\'**INPS**', sotto: 'Che paga il TFR a fine rapporto.' },

// 3 · la rivalutazione
{ id: 's13', ...BARATTOLO, sopratitolo: 'Il barattolo non resta fermo', fase: 'rivaluta' },
{ id: 's14', tipo: 'conto', tema: 'chiaro', sopratitolo: 'La regola della rivalutazione',
  voci: [{ v: '1,5%', lb: 'fisso' }, { v: '75%', lb: 'dell\'inflazione ISTAT' }, { v: 'Rivalutazione', lb: 'di quell\'anno' }],
  op: ['+', '='] },
{ id: 's15', tipo: 'conto', tema: 'chiaro', sopratitolo: 'Inflazione al 2%',
  voci: [{ v: '75%', lb: 'di 2' }, { v: '1,5', lb: 'dai prezzi' }],
  op: ['='] },
{ id: 's16', tipo: 'conto', tema: 'chiaro', sopratitolo: 'Inflazione al 2%',
  voci: [{ v: '1,5', lb: 'dai prezzi' }, { v: '1,5', lb: 'fisso' }, { v: '3%', lb: 'di crescita' }],
  op: ['+', '='] },
{ id: 's17', tipo: 'conto', tema: 'chiaro', sopratitolo: 'Inflazione a zero',
  voci: [{ v: '0', lb: 'dai prezzi' }, { v: '1,5', lb: 'fisso' }, { v: '1,5%', lb: 'di crescita' }],
  op: ['+', '='] },
{ id: 's18', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Con l\'inflazione alta', illu: 'termometro',
  titolo: 'Insegue i prezzi,<br>**resta indietro**' },
{ id: 's19', tipo: 'conto', tema: 'chiaro', sopratitolo: 'Inflazione all\'8%',
  voci: [{ v: '6', lb: 'il 75% di 8' }, { v: '1,5', lb: 'fisso' }, { v: '7,5%', lb: 'mezzo punto sotto i prezzi' }],
  op: ['+', '='] },

// 4 · dieci anni
{ id: 's20', tipo: 'strati', tema: 'chiaro', sopratitolo: 'Dieci anni, una barra per anno' },
{ id: 's21', tipo: 'strati', tema: 'chiaro', sopratitolo: 'Come si legge una barra' },
{ id: 's22', tipo: 'strati', tema: 'chiaro', sopratitolo: 'La rivalutazione si ispessisce' },
{ id: 's23', tipo: 'figura', tema: 'chiaro', sopratitolo: 'A parità di quote', illu: 'clessidra',
  titolo: 'Il barattolo pieno<br>**cresce di più**' },
{ id: 's24', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Tutta la storia lavorativa', illu: 'calendario',
  titolo: 'Ogni anno<br>**pesa per quello che è**', sotto: 'Anche gli anni di part-time.' },
{ id: 's25', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'Una regola prudente',
  col: [{ h: 'Inflazione bassa', t: 'Protegge **abbastanza**', grande: true },
        { h: 'Inflazione alta', t: 'Protegge **meno**', grande: true }] },

// 5 · il confronto
tab('s26', 0),
tab('s27', 1),
tab('s28', 2),
tab('s29', 3),
tab('s30', 4),
{ id: 's31', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Nessuno è migliore in assoluto', illu: 'bilancia',
  titolo: 'Fai la scelta<br>**con i tuoi numeri**', sotto: 'Non con quelli di un collega.' },

// 6 · il collegamento col Fondo
{ id: 's32', tipo: 'figura', tema: 'chiaro', sopratitolo: 'E Perseo Sirio?', illu: 'salvadanaio',
  titolo: 'Una parte o tutto<br>**il barattolo**', sotto: 'Va alla pensione complementare.' },
{ id: 's33', tipo: 'cifre', tema: 'chiaro', sopratitolo: 'Assunti dal 2001',
  voci: [{ n: '6,91', suf: '%', t: 'Tutto il TFR va nel Fondo', key: true }] },
{ id: 's34', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Dallo stipendio netto', illu: 'scudo',
  titolo: 'Non togli<br>**un euro in più**', sotto: 'Il TFR lo maturi comunque.' },
{ id: 's35', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Passati dal TFS al TFR', illu: 'cartella',
  titolo: 'Solo<br>**una parte**', sotto: 'Le percentuali nel modulo 4.' },
{ id: 's36', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Una volta nel Fondo', illu: 'bussola',
  titolo: 'Cambia anche<br>**il modo di crescere**', sotto: 'Nell\'ultima lezione del modulo.' },
{ id: 's37', tipo: 'scambio', tema: 'chiaro', sopratitolo: 'Prima: il passaggio dal TFS al TFR' },

// 7 · memo
{ id: 's38', tipo: 'frase', tema: 'profondo', sopratitolo: 'Da ricordare',
  testo: 'Il TFR non guarda solo come finisci, ma <b class="a">tutto il percorso</b>.' },

// 8 · chiusura
{ id: 's39', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE, attive: [0] },
{ id: 's40', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE, attive: [0, 1] },
{ id: 's41', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE },
{ id: 's42', tipo: 'mossa', tema: 'chiaro', sopratitolo: 'La mossa di oggi', illu: 'calendario',
  titolo: 'Il tuo TFR di **un anno**', passi: PASSI },
{ id: 's43', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Se sei in TFS', illu: 'calendario',
  titolo: 'Lo stesso conto:<br>**il nuovo sistema**', sotto: 'Quanto matureresti aderendo.' },
{ id: 's44', tipo: 'scambio', tema: 'chiaro', sopratitolo: 'Prossima lezione: dal TFS al TFR', fase: 'vagone' },

{ id: 's45', tipo: 'copertina', tema: 'profondo', chiusura: true, corso: CORSO, firma: FIRMA },
];
