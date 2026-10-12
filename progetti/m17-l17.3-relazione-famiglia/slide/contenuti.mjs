// Contenuto delle 48 scene della lezione 17.3. *accento*  **accento in semibold**
//
// Registro del modulo, dichiarato dal documento di partenza: sobrio,
// concreto, mai pietistico. Questa e' la lezione delle parole: le frasi
// citate stanno fra «», come sullo schermo del documento.
//
// Il velo rosa (`tenue`) sta solo su che cosa NON si fa e NON si dice: il
// patto del silenzio, le tre risposte sbagliate a «sto morendo?», il
// consolare e il confrontare, il parlare della persona come se non ci fosse,
// il prendere posizione, le frasi da evitare. Elenchi `vietato`, testo piano.
// La `sostituzione` solo dove i due lati sono davvero uno sbagliato e uno
// giusto (presumere contro chiedere); dove sono due diritti, `confronto`.
//
// Nessuna cifra o dato che non stia nel copione di partenza.

const TRE_DOMANDE = [
 {n:"1", t:"Che cosa dire"},
 {n:"2", t:"Che cosa non dire"},
 {n:"3", t:"Che cosa fare", d:"quando le parole non ci sono", key:true},
];

const STO_MORENDO_NO = [
 {t:"Non rispondere con una bugia", d:"«Ma no, vedrà che si riprende»"},
 {t:"Non rispondere con una diagnosi", d:"non compete all'OSS"},
 {t:"Non sfuggire", d:"«Chiedo all'infermiere», e andarsene"},
];

const RESTITUIRE = [
 {t:"«Che cosa la fa pensare questo?»"},
 {t:"«Che cosa teme di più?»"},
];

const FASI = [
 {t:"Negazione"}, {t:"Rabbia"}, {t:"Patteggiamento"}, {t:"Depressione"}, {t:"Accettazione"},
];

const ASCOLTO = [
 {t:"Il silenzio **non è un vuoto** da riempire", d:"è lo spazio in cui la persona trova le parole"},
 {t:"Domande **aperte**, poche, senza fretta"},
 {t:"**Restituire**", d:"«Sento che questo le pesa molto»"},
];

const ASCOLTO_NO = [
 {t:"Non consolare subito", d:"«Vedrà che andrà bene» chiude il discorso"},
 {t:"Non confrontare", d:"«Conosco uno che» sposta l'attenzione"},
];

const NON_VERBALE = [
 {icona:"persona",   t:"Sedersi", d:"alla stessa altezza, non in piedi accanto al letto"},
 {icona:"occhio",    t:"Sguardo", d:"il contatto visivo"},
 {icona:"cuoremano", t:"Tocco", d:"se gradito: sulla spalla, sulla mano"},
];

const BISOGNI_FAMIGLIA = [
 {n:"1", t:"Informazioni"},
 {n:"2", t:"Sentirsi utili"},
 {n:"3", t:"Permessi", d:"di riposare, di piangere, di andare a casa", key:true},
];

const ESAURIMENTO = [
 {t:"Non dorme"}, {t:"Non mangia"}, {t:"Si isola"}, {t:"Si arrabbia"}, {t:"Si colpevolizza"},
];

const GESTI = [
 {t:"Il **posizionamento**"},
 {t:"L'**igiene della bocca**"},
 {t:"I **piccoli comfort**"},
];

const CONFLITTI_NO = [
 {t:"Non prende posizione"},
 {t:"Non fa da messaggero tra le parti"},
];

const DEMENZA = [
 {t:"Il dolore: **scale osservazionali**", d:"non viene detto a parole"},
 {t:"La relazione: **non verbale**", d:"la voce · il tocco · i volti noti · la routine"},
];

const CULTURE = [
 {t:"Chi viene informato"}, {t:"Chi decide"}, {t:"Chi può toccare il corpo"},
 {t:"Quali riti"}, {t:"Quali alimenti"},
];

const FRASI_NO = [
 {t:"«Vedrà che andrà tutto bene»"},
 {t:"«Bisogna essere forti»"},
 {t:"«Conosco uno che»"},
 {t:"«Non ci pensi»"},
 {t:"«È la volontà di Dio»", d:"se non è la persona a dirlo per prima"},
 {t:"«Non c'è più niente da fare» · «Ormai»"},
 {t:"Al familiare: «almeno ha smesso di soffrire»", d:"prima che lo dica lui"},
];

const RIEPILOGO = [
 {t:"Diritto di sapere **e di non sapere**", d:"l'OSS non comunica diagnosi, ma non mente"},
 {t:"«Sto morendo?»", d:"non mentire · non diagnosticare · non sfuggire"},
 {t:"Restare, restituire, **riferire**"},
 {t:"Kübler-Ross: fasi **non lineari**", d:"servono a riconoscere · la rabbia non è personale"},
 {t:"Il silenzio **non è un vuoto**", d:"il non verbale pesa più delle parole · si parla anche a chi non risponde"},
 {t:"La famiglia è **destinataria delle cure**", d:"il caregiver va protetto · non si fa da messaggero"},
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 17 · Cure palliative, fine vita e accompagnamento",
  titolo:"La relazione<br>**e la famiglia**", sottotitolo:"Lezione 17.3",
  ente:"CISL FP Padova Rovigo · Concorso OSS Azienda Zero"},

{id:"s02", tipo:"frase", tema:"chiaro", sopratitolo:"Modulo 17 · lezione 3 di 5",
  testo:"La domanda che si teme di più: **«Sto morendo?»**"},
{id:"s03", tipo:"tre", tema:"chiaro", sopratitolo:"La relazione, con la persona e con la famiglia",
  box:TRE_DOMANDE},
{id:"s04", tipo:"titolo", tema:"profondo",
  titolo:"Non trovare le parole giuste: **non scappare**.",
  sotto:"Non formule, che non esistono: criteri."},

{id:"s05", tipo:"confronto", tema:"chiaro", sopratitolo:"Legge 219/2017",
  col:[{h:"Diritto di sapere", t:"conoscere la propria condizione"},
       {h:"Diritto di non sapere", t:"**se lo sceglie**"}]},
{id:"s06", tipo:"titolo", tema:"profondo",
  titolo:"L'OSS non comunica diagnosi e prognosi, ma **non mente**.",
  sotto:"L'informazione clinica compete al medico."},
{id:"s07", tipo:"titolo", tema:"tenue",
  titolo:"Il patto del silenzio **non è nell'interesse** della persona.",
  sotto:"Lo chiedono spesso i familiari: non dire nulla alla persona."},
{id:"s08", tipo:"frase", tema:"chiaro", sopratitolo:"Va riportato all'équipe",
  testo:"Quasi sempre la persona **sa già**. Il silenzio intorno a lei la lascia sola con quello che sa."},

{id:"s09", tipo:"elenco", tema:"tenue", vietato:true, attive:[0],
  sopratitolo:"«Sto morendo?» · che cosa non fare", voci:STO_MORENDO_NO},
{id:"s10", tipo:"elenco", tema:"tenue", vietato:true,
  sopratitolo:"«Sto morendo?» · che cosa non fare", voci:STO_MORENDO_NO},
{id:"s11", tipo:"elenco", tema:"chiaro",
  sopratitolo:"Che cosa fare: restare, e restituire", voci:RESTITUIRE},
{id:"s12", tipo:"titolo", tema:"profondo",
  titolo:"Spesso non vuole un'informazione: vuole **poterne parlare**.",
  sotto:"E subito dopo si riferisce all'équipe che la domanda è stata posta."},

{id:"s13", tipo:"griglia", tema:"chiaro", colonne:5, spunta:false,
  sopratitolo:"Kübler-Ross · le fasi dell'elaborazione", celle:FASI},
{id:"s14", tipo:"frase", tema:"chiaro", sopratitolo:"Non sono tappe obbligate, né lineari",
  testo:"Si **alternano**, si saltano, si ripetono. Servono a riconoscere ciò che si vede, non a classificare la persona."},
{id:"s15", tipo:"titolo", tema:"profondo",
  titolo:"La rabbia verso gli operatori è spesso **rabbia verso la malattia**.",
  sotto:"Va accolta, senza prenderla sul personale. E l'accettazione non si impone."},

{id:"s16", tipo:"elenco", tema:"chiaro",
  sopratitolo:"L'ascolto", voci:ASCOLTO},
{id:"s17", tipo:"elenco", tema:"tenue", vietato:true,
  sopratitolo:"L'ascolto · che cosa non fare", voci:ASCOLTO_NO},
{id:"s18", tipo:"titolo", tema:"profondo",
  titolo:"Il tempo della comunicazione **è tempo di cura**.",
  sotto:"Legge 219/2017. Non è tempo sottratto all'assistenza."},

{id:"s19", tipo:"icone", tema:"chiaro",
  sopratitolo:"Il non verbale pesa più delle parole", voci:NON_VERBALE},
{id:"s20", tipo:"frase", tema:"chiaro", sopratitolo:"L'udito resta a lungo",
  testo:"Voce bassa e lenta, nessuna fretta. E si parla alla persona **anche quando non risponde**."},
{id:"s21", tipo:"titolo", tema:"tenue",
  titolo:"Mai parlare della persona **come se non ci fosse**.",
  sotto:"Una delle violazioni della dignità più frequenti, e più evitabili."},

{id:"s22", tipo:"frase", tema:"chiaro", sopratitolo:"La famiglia",
  testo:"I familiari sono **destinatari delle cure**, non solo accompagnatori."},
{id:"s23", tipo:"tre", tema:"chiaro", sopratitolo:"Di che cosa hanno bisogno", box:BISOGNI_FAMIGLIA},
{id:"s24", tipo:"titolo", tema:"profondo",
  titolo:"«Può andare a riposare, **resto io**.»",
  sotto:"Una frase che cambia la giornata di un familiare. L'OSS può dirla."},
{id:"s25", tipo:"frase", tema:"chiaro", sopratitolo:"L'OSS",
  testo:"Spesso è l'operatore con cui i familiari **parlano di più**: è presente, e non fa paura."},

{id:"s26", tipo:"griglia", tema:"chiaro", colonne:5, spunta:false,
  sopratitolo:"Il caregiver · i segni di esaurimento", celle:ESAURIMENTO},
{id:"s27", tipo:"elenco", tema:"chiaro",
  sopratitolo:"L'OSS insegna gesti semplici", voci:GESTI},
{id:"s28", tipo:"frase", tema:"chiaro", sopratitolo:"E riferisce i segni di esaurimento",
  testo:"Esistono **servizi di sostegno**: dal supporto psicologico ai ricoveri di sollievo."},
{id:"s29", tipo:"titolo", tema:"profondo",
  titolo:"Un caregiver esausto **non può assistere**.",
  sotto:"Proteggerlo è proteggere la persona."},

{id:"s30", tipo:"frase", tema:"chiaro", sopratitolo:"I conflitti familiari",
  testo:"Il fine vita riattiva conflitti antichi: sulle scelte, sulle informazioni, **su chi decide**, su chi può esserci."},
{id:"s31", tipo:"elenco", tema:"tenue", vietato:true,
  sopratitolo:"Nei conflitti, l'OSS", voci:CONFLITTI_NO},
{id:"s32", tipo:"frase", tema:"chiaro", sopratitolo:"Riferisce all'équipe",
  testo:"Assistente sociale e psicologo hanno gli strumenti. Il compito dell'OSS è **segnalare, non risolvere**."},
{id:"s33", tipo:"titolo", tema:"profondo",
  titolo:"A volte l'escluso è **la persona stessa**.",
  sotto:"La sua voce va sempre cercata."},

{id:"s34", tipo:"frase", tema:"chiaro", sopratitolo:"La demenza avanzata",
  testo:"È una **condizione da cure palliative**. I segni: rifiuto del cibo, infezioni ricorrenti, immobilità."},
{id:"s35", tipo:"elenco", tema:"chiaro",
  sopratitolo:"La demenza avanzata", voci:DEMENZA},
{id:"s36", tipo:"titolo", tema:"profondo",
  titolo:"Un lutto che inizia **prima della morte**.",
  sotto:"La persona che i familiari conoscevano non c'è più da tempo. Va riconosciuto."},

{id:"s37", tipo:"frase", tema:"chiaro", sopratitolo:"Culture e religioni",
  testo:"Ogni cultura ha un modo proprio di vivere **la malattia, la morte e il corpo**."},
{id:"s38", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false,
  sopratitolo:"Le risposte cambiano da una famiglia all'altra", celle:CULTURE},
{id:"s39", tipo:"sostituzione", tema:"chiaro", sopratitolo:"Culture e religioni",
  da:{h:"Non si", t:"presume"}, a:{h:"Si", t:"**chiede**"},
  sotto:"Alla persona e alla famiglia. E la mediazione culturale si attiva."},
{id:"s40", tipo:"titolo", tema:"profondo",
  titolo:"Il rispetto non richiede di condividere: **richiede di conoscere**.",
  sotto:"E di fare spazio."},

{id:"s41", tipo:"elenco", tema:"tenue", vietato:true, attive:[0,1,2,3],
  sopratitolo:"Le frasi da evitare", voci:FRASI_NO},
{id:"s42", tipo:"elenco", tema:"tenue", vietato:true,
  sopratitolo:"Le frasi da evitare", voci:FRASI_NO},
{id:"s43", tipo:"titolo", tema:"profondo",
  titolo:"Meglio un silenzio onesto che **una frase vuota**.",
  sotto:"E se non si sa che cosa dire, si può dirlo."},

{id:"s44", tipo:"elenco", tema:"chiaro", numerato:true, attive:[0,1],
  sopratitolo:"Riepiloghiamo", voci:RIEPILOGO},
{id:"s45", tipo:"elenco", tema:"chiaro", numerato:true, attive:[0,1,2,3],
  sopratitolo:"Riepiloghiamo", voci:RIEPILOGO},
{id:"s46", tipo:"elenco", tema:"chiaro", numerato:true,
  sopratitolo:"Riepiloghiamo", voci:RIEPILOGO},
{id:"s47", tipo:"frase", tema:"chiaro", sopratitolo:"Il filo della lezione",
  testo:"Non si tratta di trovare le parole giuste. **Si tratta di non scappare.**"},

{id:"s48", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"17.4", sottotitolo:"Le **ultime ore** e il momento della morte",
  ente:"CISL FP Padova Rovigo · Concorso OSS Azienda Zero"},
];
