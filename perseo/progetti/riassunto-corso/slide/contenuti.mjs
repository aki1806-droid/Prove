// Contenuto delle 50 scene del video riassunto — tutto il corso in dieci minuti.
// s02–s49 sono i blocchi 1–48 del copione, uno a uno. Dieci tappe, una per modulo:
// a ogni tappa tornano le grafiche ricorrenti del corso.

const CORSO = 'Perseo Sirio senza segreti';
const FIRMA = 'Un corso CISL FP Padova Rovigo';

const T = (n, t) => `Tappa ${n} di 10 · ${t}`;
const F = (id, tipo, sop, extra = {}) => ({ id, tipo, tema: 'chiaro', sopratitolo: sop, ...extra });

export const SCENE = [
{ id: 's01', tipo: 'copertina', tema: 'chiaro',
  modulo: 'Tutto il corso in dieci minuti',
  titolo: 'Perseo Sirio senza segreti', sottotitolo: 'Il riassunto',
  ente: `${CORSO} · ${FIRMA}` },

// apertura
F('s02', 'figura', 'Un cambio turno, un armadietto, una domanda', { illu: 'armadietto',
  titolo: 'Quanto mi resterà,<br>**ogni mese?**' }),
F('s03', 'cifre', 'Il viaggio, tutto insieme',
  { voci: [{ n: '10 moduli', t: 'Dieci tappe' }, { n: '50 lezioni', t: 'In dieci minuti', key: true }] }),
F('s04', 'confronto', 'A che cosa serve questo video',
  { col: [{ h: 'Hai seguito il corso', t: 'È il ripasso', grande: true },
          { h: 'Parti da qui', t: '**È la mappa**', grande: true }] }),
F('s05', 'tre', 'Le cifre sono esempi · i tuoi numeri veri stanno qui',
  { box: [{ n: 'IL CEDOLINO', t: 'Ogni mese' }, { n: 'IL PROSPETTO', t: 'Ogni anno' }, { n: 'IL FONDO', t: 'E il tuo delegato', key: true }] }),

// 1 · perché parlarne
F('s06', 'divario', T(1, 'Perché parlarne'), { fase: 'contributivo' }),
F('s07', 'divario', 'Il divario: prima inizi, meglio è', { fase: 'divario' }),
F('s08', 'pilastri', 'I tre pilastri'),
F('s09', 'bivio', 'Solo nel fondo negoziale versa anche l\'ente'),
F('s10', 'nascita', 'Perseo Sirio · senza scopo di lucro, paritetico, vigilato dalla COVIP', { fase: 'fusione' }),

// 2 · TFS, TFR e le due tasche
F('s11', 'linea2000', T(2, 'TFS o TFR? Conta la data di assunzione'), { fase: 'termine' }),
F('s12', 'scalini', 'Il TFS premia la fine carriera · il TFR accantona il 6,91% ogni anno'),
F('s13', 'scambio', 'Aderire = passare al TFR · possibile fino al 31.12.2030', { fase: 'vagone' }),
F('s14', 'tasche', 'L\'immagine del corso: le due tasche', { fase: 'due' }),
F('s15', 'tasche', 'Si riuniscono solo alla cessazione del lavoro', { fase: 'unione' }),

// 3 · come si entra
F('s16', 'cancello', T(3, 'Chi può aderire: sanità e funzioni pubbliche'), { n: 6, scuola: true }),
F('s17', 'cursori', 'Versi almeno l\'1%: anche l\'ente versa il suo 1%', { v: 1 }),
F('s18', 'orologio', 'Assunti dal 2019: il silenzio vale un sì', { at: 3 }),
F('s19', 'salvadanai', 'Polizia locale · articolo 208', { fase: 'tempo' }),
F('s20', 'tre', 'E uscire?',
  { box: [{ n: 'RECESSO', t: 'Non mentre lavori' }, { n: 'SOSPENDERE', t: 'Perdi l\'1% dell\'ente', key: true }, { n: 'FAMILIARI', t: 'Si possono iscrivere' }] }),

// 4 · che cosa entra nel conto
F('s21', 'ingressi', T(4, 'La ricetta del conto'), { at: 9, n: 3, base: true }),
F('s22', 'divisione', 'Dal 2001 tutto il TFR · optanti: 28,94% + 1,5%', { fase: 'premio' }),
F('s23', 'tabella', 'Un esempio · 30.000 € di retribuzione utile',
  { intestazioni: ['Chi versa', 'Quanto all\'anno'], colonne: ['55%', '45%'],
    righe: [['**Tu**, 1%', '300 € (25 € al mese)'], ['**L\'ente**, 1%', '300 €'], ['**TFR**, tasca figurativa', '≈ 2.070 €'], ['**In tutto**', '≈ 2.670 €']], chiave: [3] }),
F('s24', 'ingressi', 'L\'1% dell\'ente: da non lasciare sul tavolo', { at: 1, n: 3 }),
F('s25', 'manopole', 'Aliquota una volta l\'anno · poi controlla cedolino e prospetto', { k: 9 }),

// 5 · il fisco
F('s26', 'colonna', T(5, 'Il fisco è un alleato: deduci fino a 5.300 € l\'anno'), { fase: 'due' }),
F('s27', 'aliquote', 'Rendimenti tassati meno, e già netti', { k: 9 }),
F('s28', 'scala', 'La scala del fisco: dal 15% al 9%', { a: 35 }),
F('s29', 'bicchiere', 'Oltre il limite: comunica i contributi non dedotti', { fase: 'irpef' }),
F('s30', 'strati', 'Per i pubblici la posizione è a strati · li gestisce il Fondo'),

// 6 · come lavorano i soldi
F('s31', 'equazione', T(6, 'Come lavorano i tuoi soldi'), { k: 4, barra: true }),
F('s32', 'linee', 'Obbligazioni calme, azioni mosse: conta l\'orizzonte', { fase: 'venti' }),
F('s33', 'lifecycle', 'Tre comparti, sei profili · Life Cycle: il pilota automatico', { a: 30, fase: 'percorso' }),
F('s34', 'tasche', 'Dal 2026 anche il TFR segue un profilo, scelto da te', { fase: 'profili', optanti: true, profili: { reale: 'profilo A', fig: 'profilo B' } }),
F('s35', 'tre', 'Se cambi idea, cambi profilo',
  { box: [{ n: 'IL PRIMO CAMBIO', t: 'Subito' }, { n: 'POI', t: 'Ogni 12 mesi' }, { n: 'COSTO', t: 'Gratuito', key: true }] }),

// 7 · i costi
F('s36', 'cifre', T(7, 'I costi di Perseo Sirio'),
  { voci: [{ n: '13 €', t: 'L\'anno, quota associativa' }, { n: '0,14–0,46%', t: 'Sul patrimonio', key: true }] }),
F('s37', 'imbuto', 'L\'ISC medio: negoziali 0,47 · aperti 1,36 · PIP 2,17', { fase: 'imbuto' }),
F('s38', 'costi', 'Sembrano decimali · nell\'esempio: 27.000 € in meno in 30 anni', { fase: 'area' }),

// 8 · lungo la strada
F('s39', 'tasche', T(8, 'Anticipazioni: dopo 8 anni, solo dalla tasca reale'), { fase: 'anticipo', optanti: true }),
F('s40', 'strade', 'Se lasci la pubblica amministrazione: tre strade', { at: -1,
  voci: [{ t: 'Resta nel Fondo', s: 'la posizione è investita' }, { t: 'Trasferisci', s: 'gli anni restano' }, { t: 'Riscatti', s: 'volontario: 23%' }] }),
F('s41', 'ingressi', 'Trasferire mentre lavori nella PA: l\'1% dell\'ente resta indietro', { at: -1, n: 3, chiusa: [1] }),
F('s42', 'rita', 'La RITA: una rendita ponte · e designa i beneficiari', { fase: 'rate' }),

// 9 · il traguardo
F('s43', 'secchio', T(9, 'Il traguardo: fino a metà in capitale'), { fase: 'meta' }),
F('s44', 'piatti', 'Cinque rendite: più protezione, assegno un po\' più basso', { tipo2: 'protette', nome: 'Reversibile · certa · controassicurata' }),
F('s45', 'clessidre', 'I tempi: tasca reale e tasca figurativa', { fase: 'due' }),

// memo
{ id: 's46', tipo: 'frase', tema: 'profondo', sopratitolo: 'Da ricordare',
  testo: 'La pensione non arriva alla fine.<br><b class="a">Si costruisce oggi.</b>' },

// 10 · tocca a te
F('s47', 'cassettiera', T(10, 'Tocca a te: area riservata, prospetto, simulatore'), { at: -1, tutti: true }),
F('s48', 'tre', 'Quando una risposta non la trovi, chiedi',
  { box: [{ n: 'IL FONDO', t: '800 994 545 · consulenza gratuita' }, { n: 'I DELEGATI', t: 'CISL FP Padova Rovigo', key: true }, { n: 'IL PATRONATO', t: 'INAS CISL' }] }),
{ id: 's49', tipo: 'frase', tema: 'profondo', sopratitolo: 'Comincia stasera: sono iscritto?',
  testo: 'Buon lavoro, oggi.<br><b class="a">Per la pensione di domani.</b>' },

{ id: 's50', tipo: 'copertina', tema: 'profondo', chiusura: true, corso: CORSO, firma: FIRMA },
];
