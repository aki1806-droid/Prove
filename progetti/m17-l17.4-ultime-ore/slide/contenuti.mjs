// Contenuto delle 48 scene della lezione 17.4. *accento*  **accento in semibold**
//
// Registro del modulo, dichiarato dal documento di partenza: sobrio,
// concreto, mai pietistico. E' la lezione piu' delicata: niente immagini,
// niente simboli consolatori. Sintomi, gesti, competenze, chi fa che cosa.
//
// Il velo rosa (`tenue`) sta solo su che cosa NON si fa: la rianimazione in
// cure palliative, «e' stata una liberazione», la bugia agli altri ospiti.
// La `sostituzione` solo dove i due lati sono davvero sbagliato e giusto
// (presumere contro chiedere). La composizione della salma e' una sequenza,
// quindi una `catena`; chi fa che cosa dopo la morte e' una `tabella`.
//
// Nessuna cifra o dato che non stia nel copione di partenza.

const SEGNI = [
 {t:"**Sonnolenza** crescente", d:"risposte più brevi · periodi di non risposta"},
 {t:"Meno **cibo e liquidi**", d:"difficoltà a deglutire"},
 {t:"**Diuresi** ridotta", d:"urine scure"},
 {t:"Cute **pallida**, estremità **fredde**", d:"talvolta marezzate: chiazze violacee"},
];

const RANTOLO = [
 {t:"Posizione **laterale** o capo ruotato", d:"fa defluire le secrezioni"},
 {t:"Non si aspira **di routine**", d:"invasivo e poco efficace"},
 {t:"Esiste una **terapia**: si riferisce"},
];

const ULTIME_ORE = [
 {t:"**Cavo orale**", d:"umettare spesso · labbra protette"},
 {t:"**Posizionamento** per il comfort", d:"con delicatezza, senza cambi inutili"},
 {t:"**Ambiente**", d:"luce soffusa · temperatura · silenzio o ciò che la persona amava"},
];

const FAMILIARI = [
 {t:"Dare **permessi**", d:"di parlare alla persona, di toccarla, di riposare, di restare"},
 {t:"**Non prevedere** l'ora", d:"«potrebbero essere ore, o giorni»"},
 {t:"Non lasciarli **soli** nella stanza", d:"se non lo desiderano"},
 {t:"**Riti e desideri** rispettati"},
];

const PRIMI_MOMENTI = [
 {t:"Chiedere se desiderano un **ministro di culto** o un rito", d:"senza presumere"},
 {t:"**Gesti semplici**", d:"un luogo dove sedersi · un bicchiere d'acqua · una sedia accanto al letto"},
];

// Elenco `vietato`: la × rossa porta gia' la polarita', il testo resta piano.
const PRIMI_MOMENTI_NO = [
 {t:"«È stata una liberazione»", d:"possono dirlo loro, non chi assiste"},
 {t:"Riempire il silenzio"},
];

const COMPOSIZIONE = [
 {t:"Presidi", d:"rimossi secondo indicazione"},
 {t:"Igiene"},
 {t:"Occhi e bocca", d:"chiusi"},
 {t:"Allineamento", d:"prima della rigidità", key:true},
 {t:"Vestizione", d:"secondo i desideri"},
];

const SALMA_REGOLE = [
 {t:"**DPI** e precauzioni standard", d:"il rischio biologico non cessa con la morte"},
 {t:"**Identificazione** corretta"},
 {t:"**Effetti personali**", d:"inventariati e consegnati"},
];

const RITI = [
 {t:"Il corpo **non toccato** da estranei", d:"o da persone di sesso diverso"},
 {t:"**Lavaggi rituali**, posizioni, oggetti, tempi di attesa"},
 {t:"La presenza di **persone precise**"},
];

const CHI_FA = {
 intestazioni:["", "Chi"],
 colonne:["52%","48%"],
 righe:[
  ["Constatazione e certificazione del decesso", "il **medico**"],
  ["Comunicazione formale ai familiari", "il medico o l'infermiere"],
  ["Documentazione: che cosa ha fatto, l'ora", "l'**OSS**"],
  ["Trasferimento della salma", "secondo procedura, con discrezione"],
  ["Pratiche amministrative", "non l'OSS: **indirizza** la famiglia"],
 ],
};

const ALTRI_OSPITI = [
 {t:"Un **saluto** a chi lo desidera"},
 {t:"Osservare le **reazioni** nei giorni successivi", d:"tristezza · paura per sé · agitazione"},
];

const DEPORRE = [
 {t:"Parlarne **in équipe**"},
 {t:"Piccoli **riti personali** di chiusura"},
 {t:"I **debriefing**", d:"quando ci sono"},
];

const RIEPILOGO = [
 {t:"Segni degli **ultimi giorni**", d:"sonnolenza · meno cibo e liquidi · diuresi ridotta · estremità fredde"},
 {t:"Respiro di **Cheyne-Stokes**"},
 {t:"Il **rantolo** non è sofferenza", d:"non si aspira di routine"},
 {t:"Ultime ore: bocca, comfort, **presenza**", d:"nessuna manovra inutile"},
 {t:"Constatazione: **il medico**", d:"l'OSS annota l'ora e avvisa"},
 {t:"Salma: **su indicazione**", d:"con rispetto, con i DPI, chiedendo prima dei riti"},
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 17 · Cure palliative, fine vita e accompagnamento",
  titolo:"Le ultime ore<br>**e la morte**", sottotitolo:"Lezione 17.4",
  ente:"CISL FP Padova Rovigo · Concorso OSS Azienda Zero"},

{id:"s02", tipo:"frase", tema:"chiaro", sopratitolo:"Modulo 17 · lezione 4 di 5",
  testo:"Le ultime ore, il momento della morte, **la cura della salma**."},
{id:"s03", tipo:"frase", tema:"chiaro", sopratitolo:"La parte che nessuno insegna",
  testo:"Si impara sul campo, spesso male. Qui, con **il linguaggio della competenza**."},
{id:"s04", tipo:"titolo", tema:"profondo",
  titolo:"Sapere che cosa fare **toglie paura**.",
  sotto:"E la paura allontana l'operatore proprio quando dovrebbe essere più vicino."},

{id:"s05", tipo:"elenco", tema:"chiaro", attive:[0,1],
  sopratitolo:"I segni degli ultimi giorni", voci:SEGNI},
{id:"s06", tipo:"elenco", tema:"chiaro",
  sopratitolo:"I segni degli ultimi giorni", voci:SEGNI},
{id:"s07", tipo:"frase", tema:"chiaro", sopratitolo:"Nessuno da solo è decisivo",
  testo:"Ma **insieme** indicano che la fase finale è vicina."},
{id:"s08", tipo:"titolo", tema:"profondo",
  titolo:"Riconoscerli serve a **preparare la famiglia**, e ad adattare l'assistenza.",
  sotto:"L'OSS, che li vede per primo, li riferisce."},

{id:"s09", tipo:"frase", tema:"chiaro", sopratitolo:"Il respiro di Cheyne-Stokes",
  testo:"Irregolare, con **pause anche lunghe** seguite da respiri profondi. Il nome è chiesto nei quiz."},
{id:"s10", tipo:"frase", tema:"chiaro", sopratitolo:"Il rantolo",
  testo:"Il rumore delle **secrezioni** che la persona non riesce più a eliminare."},
{id:"s11", tipo:"titolo", tema:"profondo",
  titolo:"Il rantolo **non indica sofferenza**.",
  sotto:"Ma è molto disturbante per chi ascolta: va detto ai familiari."},
{id:"s12", tipo:"elenco", tema:"chiaro",
  sopratitolo:"Il rantolo", voci:RANTOLO},

{id:"s13", tipo:"elenco", tema:"chiaro", attive:[0,1],
  sopratitolo:"Nelle ultime ore", voci:ULTIME_ORE},
{id:"s14", tipo:"elenco", tema:"chiaro",
  sopratitolo:"Nelle ultime ore", voci:ULTIME_ORE},
{id:"s15", tipo:"titolo", tema:"profondo",
  titolo:"La persona **non va lasciata sola**.",
  sotto:"Se i familiari non ci sono, l'operatore resta. Udito e tatto restano fino alla fine."},
{id:"s16", tipo:"frase", tema:"chiaro", sopratitolo:"Si sospendono le manovre non necessarie",
  testo:"Parametri, igiene completa, cambi di biancheria: **non servono più, e disturbano**."},

{id:"s17", tipo:"frase", tema:"chiaro", sopratitolo:"Con i familiari",
  testo:"Spiegare con parole semplici **ciò che accade**: il respiro, il colore, la non risposta."},
{id:"s18", tipo:"elenco", tema:"chiaro", attive:[0,1],
  sopratitolo:"Con i familiari", voci:FAMILIARI},
{id:"s19", tipo:"elenco", tema:"chiaro",
  sopratitolo:"Con i familiari", voci:FAMILIARI},
{id:"s20", tipo:"titolo", tema:"profondo",
  titolo:"A volte la persona muore **quando il familiare si allontana**.",
  sotto:"Va detto prima, non dopo. Non è una colpa."},

{id:"s21", tipo:"frase", tema:"chiaro", sopratitolo:"Il momento della morte",
  testo:"Assenza di **respiro e di polso**, pupille fisse, pallore, rilassamento dei muscoli."},
{id:"s22", tipo:"titolo", tema:"profondo",
  titolo:"La constatazione del decesso **compete al medico**.",
  sotto:"L'OSS annota l'ora e avvisa subito l'infermiere."},
{id:"s23", tipo:"titolo", tema:"tenue",
  titolo:"In cure palliative la rianimazione **non è prevista**.",
  sotto:"Sarebbe un atto sproporzionato."},
{id:"s24", tipo:"titolo", tema:"profondo",
  titolo:"In quel momento, **la fretta** è la cosa più violenta.",
  sotto:"L'OSS resta con i familiari, se lo desiderano."},

{id:"s25", tipo:"frase", tema:"chiaro", sopratitolo:"I primi momenti dopo",
  testo:"Il **tempo** di stare con la persona. La composizione può attendere, e in molte culture deve."},
{id:"s26", tipo:"elenco", tema:"chiaro",
  sopratitolo:"I primi momenti dopo", voci:PRIMI_MOMENTI},
{id:"s27", tipo:"elenco", tema:"tenue", vietato:true,
  sopratitolo:"Che cosa non si fa", voci:PRIMI_MOMENTI_NO},

{id:"s28", tipo:"frase", tema:"chiaro", sopratitolo:"La cura della salma",
  testo:"Rientra tra le attività dell'OSS, **su indicazione** dell'infermiere e secondo la procedura aziendale."},
{id:"s29", tipo:"titolo", tema:"profondo",
  titolo:"La persona **resta una persona**.",
  sotto:"Rispetto, delicatezza, riservatezza. Anche dopo."},
{id:"s30", tipo:"catena", tema:"chiaro",
  sopratitolo:"La composizione", passi:COMPOSIZIONE},
{id:"s31", tipo:"elenco", tema:"chiaro",
  sopratitolo:"La composizione", voci:SALMA_REGOLE},

{id:"s32", tipo:"elenco", tema:"chiaro",
  sopratitolo:"Alcune tradizioni prevedono", voci:RITI},
{id:"s33", tipo:"sostituzione", tema:"chiaro", sopratitolo:"Riti, culture, religioni",
  da:{h:"Non si", t:"presume"}, a:{h:"Si chiede", t:"**prima**"},
  sotto:"Alla persona quando è possibile, o alla famiglia."},
{id:"s34", tipo:"titolo", tema:"profondo",
  titolo:"Nel dubbio **si attende e si chiede**. Non si procede.",
  sotto:"Un gesto in buona fede può essere una ferita irreparabile."},

{id:"s35", tipo:"tabella", tema:"chiaro", sopratitolo:"Gli aspetti formali", chiave:[0,1],
  ...CHI_FA},
{id:"s36", tipo:"tabella", tema:"chiaro", sopratitolo:"Gli aspetti formali", chiave:[2,3],
  ...CHI_FA},
{id:"s37", tipo:"tabella", tema:"chiaro", sopratitolo:"Gli aspetti formali", chiave:[4],
  ...CHI_FA},

{id:"s38", tipo:"frase", tema:"chiaro", sopratitolo:"Gli altri assistiti",
  testo:"In struttura la morte di una persona **riguarda anche gli altri ospiti**: il compagno di stanza, i vicini, le amicizie."},
{id:"s39", tipo:"titolo", tema:"tenue",
  titolo:"Non si mente: **«è stato trasferito»**.",
  sotto:"Lo capiscono, e perdono fiducia. Hanno diritto di sapere, con delicatezza."},
{id:"s40", tipo:"elenco", tema:"chiaro",
  sopratitolo:"Gli altri assistiti", voci:ALTRI_OSPITI},

{id:"s41", tipo:"frase", tema:"chiaro", sopratitolo:"L'operatore",
  testo:"Provare emozioni **è giusto**. Il distacco totale non è professionalità: è una difesa."},
{id:"s42", tipo:"elenco", tema:"chiaro",
  sopratitolo:"Serve un modo per deporre", voci:DEPORRE},
{id:"s43", tipo:"titolo", tema:"profondo",
  titolo:"Quando una morte pesa di più, **dirlo è competenza**.",
  sotto:"Non debolezza."},

{id:"s44", tipo:"elenco", tema:"chiaro", numerato:true, attive:[0,1],
  sopratitolo:"Riepiloghiamo", voci:RIEPILOGO},
{id:"s45", tipo:"elenco", tema:"chiaro", numerato:true, attive:[0,1,2,3],
  sopratitolo:"Riepiloghiamo", voci:RIEPILOGO},
{id:"s46", tipo:"elenco", tema:"chiaro", numerato:true,
  sopratitolo:"Riepiloghiamo", voci:RIEPILOGO},
{id:"s47", tipo:"frase", tema:"chiaro", sopratitolo:"Il filo della lezione",
  testo:"Sapere che cosa succede **toglie paura**."},

{id:"s48", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"17.5", sottotitolo:"Le **scelte di fine vita**, il lutto e il riepilogo",
  ente:"CISL FP Padova Rovigo · Concorso OSS Azienda Zero"},
];
