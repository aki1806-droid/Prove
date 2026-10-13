// Contenuto delle 49 scene della lezione 10.3 — Giulia, l'infermiera neoassunta.
// s02–s48 sono i blocchi 1–47 del copione, uno a uno.
// Ogni slide del caso porta in basso l'avviso «caso illustrativo».

const CORSO = 'Perseo Sirio senza segreti';
const FIRMA = 'Un corso CISL FP Padova Rovigo';
const AVV = 'Caso illustrativo · Esempio semplificato · Non è una previsione';

const S = o => ({ tema: 'chiaro', avviso: AVV, ...o });

const ORO = [['Marzo 2026', 'assunzione e informativa'], ['Settembre', 'l\'ente comunica i dati'], ['Iscritta', 'profilo Garantito']];
const oro = (id, sop, at) => S({ id, tipo: 'orologio', sopratitolo: sop, at, etichette: ORO });

const ven = (id, sop, extra = {}) => S({ id, tipo: 'ventaglio', sopratitolo: sop,
  linee: ['4% ≈ 251.000 €', '3% ≈ 199.000 €', '2% ≈ 159.000 €'], da: '28 anni', a: '67 anni', zona: false, ...extra });

const CONTI = (id, chiave) => S({ id, tipo: 'tabella', sopratitolo: 'Ogni anno, con 30.000 € di retribuzione utile',
  intestazioni: ['Chi versa', 'Quanto all\'anno'], colonne: ['55%', '45%'],
  righe: [['**Giulia**, 1%', '300 € (25 € al mese)'], ['**L\'ente**, 1%', '300 €'], ['**TFR**, tasca figurativa', '≈ 2.070 €']], chiave });

const SCELTE = [
  '**Decidere**, invece del silenzio',
  'Il **profilo** dei contributi',
  'Il **profilo** del TFR',
  'I **beneficiari**, se convive',
];
const sce = (id, attive) => S({ id, tipo: 'memo', sopratitolo: 'Quattro scelte consapevoli', voci: SCELTE, ...(attive ? { attive } : {}) });

const TRE_COSE = [
  'Chi non sceglie entra **nel Garantito**',
  '25 € al mese ne muovono **≈ 2.670**',
  'Con tanti anni, **il profilo pesa**',
];

const PASSI = [
  { t: '**Tu**, o un collega neoassunto' },
  { t: 'Guarda **la scadenza** dei 6 mesi' },
  { t: '**Decidi tu**, con calma', key: true },
];

export const SCENE = [
{ id: 's01', tipo: 'copertina', tema: 'chiaro',
  modulo: 'Modulo 10 · Decidere con i tuoi numeri',
  titolo: 'Giulia, infermiera neoassunta', sottotitolo: 'Lezione 10.3',
  ente: `${CORSO} · ${FIRMA}` },

// 1 · apertura
S({ id: 's02', tipo: 'figura', sopratitolo: '28 anni · assunta a marzo 2026', illu: 'stetoscopio',
  titolo: 'Giulia,<br>**infermiera**', sotto: 'A tempo indeterminato, in un\'azienda sanitaria.' }),
S({ id: 's03', tipo: 'figura', sopratitolo: 'Il primo turno', illu: 'braccialetto',
  titolo: 'Tutto<br>**da conoscere**' }),
S({ id: 's04', tipo: 'figura', sopratitolo: 'La sera, sul tavolo', illu: 'cartella',
  titolo: 'L\'informativa<br>**di Perseo Sirio**' }),
S({ id: 's05', tipo: 'frase', sopratitolo: 'Come quasi tutti i neoassunti',
  testo: 'Ci penserà poi,<br><b class="a">quando avrà tempo.</b>' }),
S({ id: 's06', tipo: 'tre', sopratitolo: 'Tre domande',
  box: [{ n: '1', t: 'Se non fa nulla?' }, { n: '2', t: 'Quanto entra?' }, { n: '3', t: 'Dove può arrivare?', key: true }] }),
S({ id: 's07', tipo: 'frase', sopratitolo: 'Ricorda',
  testo: 'Giulia e i suoi numeri<br><b class="a">sono inventati.</b>' }),

// 2 · se non fa nulla
S({ id: 's08', tipo: 'figura', sopratitolo: 'Prima domanda', illu: 'armadietto',
  titolo: 'La cartellina<br>**nel cassetto**' }),
S({ id: 's09', tipo: 'figura', sopratitolo: 'Assunta dopo il 2019 · lezione 3.3', illu: 'lettera',
  titolo: 'Vale il<br>**silenzio-assenso**' }),
oro('s10', 'Dall\'informativa, sei mesi per scegliere', 0),
oro('s11', 'Se tace, a settembre', 1),
oro('s12', 'Dopo trenta giorni senza risposta', 3),
S({ id: 's13', tipo: 'tasche', sopratitolo: 'Con la contribuzione piena', fase: 'due' }),
S({ id: 's14', tipo: 'figura', sopratitolo: 'Senza aver mai scelto nulla', illu: 'scudo',
  titolo: 'Profilo<br>**Garantito**' }),

// 3 · quanto entra
S({ id: 's15', tipo: 'confronto', sopratitolo: 'Seconda domanda',
  col: [{ h: 'Quanto entra', t: 'Ogni anno', grande: true },
        { h: 'Quanto mette lei', t: '**Davvero**', grande: true }] }),
S({ id: 's16', tipo: 'cifre', sopratitolo: 'Retribuzione utile, cifra tonda',
  voci: [{ n: '30.000 €', t: 'All\'anno', key: true }] }),
CONTI('s17', [0]),
CONTI('s18', [1]),
CONTI('s19', [2]),
S({ id: 's20', tipo: 'cifre', sopratitolo: 'In tutto, per la sua pensione complementare',
  voci: [{ n: '≈ 2.670 €', t: 'Ogni anno', key: true }] }),
S({ id: 's21', tipo: 'cifre', sopratitolo: 'Deduzione dei contributi · modulo 5',
  voci: [{ n: '≈ 138 €', t: 'Di IRPEF risparmiata all\'anno', key: true }] }),
S({ id: 's22', tipo: 'confronto', sopratitolo: 'Lo sforzo netto',
  col: [{ h: 'Giulia mette', t: '≈ 162 € l\'anno', grande: true },
        { h: 'Per muoverne', t: '**≈ 2.670 €**', grande: true }] }),

// 4 · dove può arrivare
S({ id: 's23', tipo: 'figura', sopratitolo: 'Terza domanda', illu: 'bussola',
  titolo: 'Dove<br>**può arrivare?**' }),
S({ id: 's24', tipo: 'cifre', sopratitolo: 'Dai 28 ai 67 anni',
  voci: [{ n: '39 anni', t: 'Di lavoro davanti', key: true }] }),
S({ id: 's25', tipo: 'cifre', sopratitolo: 'Solo versamenti, stipendio fermo',
  voci: [{ n: '≈ 104.000 €', t: 'Messi da parte', key: true }] }),
S({ id: 's26', tipo: 'figura', sopratitolo: 'Poi ci sono i rendimenti', illu: 'piramide',
  titolo: 'Dipende da come<br>**sono investiti**' }),
ven('s27', 'Rendimento netto del 2% l\'anno', { solo: 2, base: 'versato ≈ 104.000 €' }),
ven('s28', 'Con il 3% e con il 4%', { base: 'versato ≈ 104.000 €' }),
ven('s29', 'Senza tasse, costi, aumenti di stipendio', { base: 'versato ≈ 104.000 €' }),
S({ id: 's30', tipo: 'frase', sopratitolo: 'Tra il primo e l\'ultimo scenario',
  testo: 'Quasi centomila euro.<br><b class="a">Il profilo pesa.</b>' }),

// 5 · che cosa dovrebbe fare
sce('s31'),
sce('s32', [0]),
sce('s33', [0, 1]),
S({ id: 's34', tipo: 'confronto', sopratitolo: 'Per scegliere il profilo · modulo 6',
  col: [{ h: 'Il questionario', t: 'Di autovalutazione', grande: true },
        { h: 'La consulenza', t: '**Del Fondo**', grande: true }] }),
sce('s35', [0, 1, 2]),
sce('s36', [0, 1, 2, 3]),
S({ id: 's37', tipo: 'cifre', sopratitolo: 'Con 39 anni di partecipazione',
  voci: [{ n: '9%', t: 'Di tasse sulla prestazione, il minimo', key: true }] }),

// 6 · memo
{ id: 's38', tipo: 'frase', tema: 'profondo', sopratitolo: 'Da ricordare',
  testo: 'A ventotto anni il tempo<br><b class="a">è il capitale più grande.</b>' },

// 7 · chiusura
{ id: 's39', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE, attive: [] },
{ id: 's40', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE, attive: [0] },
{ id: 's41', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE, attive: [0, 1] },
{ id: 's42', tipo: 'memo', tema: 'chiaro', sopratitolo: 'Le tre cose da ricordare', voci: TRE_COSE },
{ id: 's43', tipo: 'mossa', tema: 'chiaro', sopratitolo: 'La mossa di oggi', illu: 'lettera',
  titolo: 'Ritrovate **l\'informativa**', passi: PASSI },
{ id: 's44', tipo: 'frase', tema: 'chiaro', sopratitolo: 'Qualunque sia la scelta',
  testo: 'Che sia vostra,<br><b class="a">non del calendario.</b>' },
{ id: 's45', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Nella prossima lezione', illu: 'generazioni',
  titolo: 'Cambiamo<br>**generazione**' },
{ id: 's46', tipo: 'figura', tema: 'chiaro', sopratitolo: '54 anni · in servizio dal 1996', illu: 'persona',
  titolo: 'Anna,<br>**operatrice socio sanitaria**' },
{ id: 's47', tipo: 'confronto', tema: 'chiaro', sopratitolo: 'La scelta più delicata del corso',
  col: [{ h: 'Lasciare', t: 'Il TFS', grande: true },
        { h: 'Passare', t: '**Al TFR**', grande: true }] },
{ id: 's48', tipo: 'figura', tema: 'chiaro', sopratitolo: 'Ci vediamo nella lezione 10.4', illu: 'persona',
  titolo: 'L\'operatrice<br>**in servizio dal 1996**' },

{ id: 's49', tipo: 'copertina', tema: 'profondo', chiusura: true, corso: CORSO, firma: FIRMA },
];
