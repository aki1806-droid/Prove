// Contenuto delle 50 scene della lezione 8.5 — gastroenterologia ed
// epatologia. Due corpi nuovi: il tubo digerente con la linea del Treitz
// (l'emorragia alta con il sangue a fondo di caffè, la bassa con il sangue
// rosso) e l'asterixis (le braccia tese con le mani che sbattono, e i
// fattori scatenanti). Il caso riusa l'asterixis con i due fattori accesi.

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 8 · Assistenza in area medica",
  titolo:"Gastroenterologia<br>ed epatologia", sottotitolo:"8.5 · Emorragia, cirrosi, pancreatite, procedure",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"confronto", tema:"chiaro", sopratitolo:"Micro-lezione 5 di 8 · due tipi di domande d'esame", col:[
  {h:"Le emergenze", t:"l'**emorragia digestiva**, la **pancreatite**", key:true}, {h:"Le procedure", t:"l'**endoscopia**, la **preparazione intestinale**, la **paracentesi**"}]},
{id:"s03", tipo:"frase", tema:"chiaro", sopratitolo:"In mezzo c'è la cirrosi",
  testo:"Una malattia cronica con complicanze da **riconoscere presto**, a partire dall'**encefalopatia**."},
{id:"s04", tipo:"percorso", tema:"chiaro", sopratitolo:"Tre blocchi · e un filo: quasi tutto, qui, l'infermiere lo vede prima del laboratorio", tappe:[
  {t:"Ciò che sanguina", key:true}, {t:"Ciò che si scompensa"}, {t:"Ciò che si prepara"}]},

{id:"s05", tipo:"tubo", tema:"chiaro", sopratitolo:"L'emorragia digestiva alta · a monte del legamento di Treitz · ematemesi: sangue rosso o «a fondo di caffè», cioè digerito", livello:"alta"},
{id:"s06", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"E con la melena · le cause principali", celle:[
  {n:"1", t:"**Melena**: feci nere, picee, maleodoranti", key:true}, {n:"2", t:"**Ulcera peptica**, **varici esofagee**"}]},
{id:"s07", tipo:"tubo", tema:"chiaro", sopratitolo:"Bassa: colon e retto, sangue rosso dall'ano · un'avvertenza", livello:"bassa", sotto:"un’emorragia alta molto abbondante può passare così in fretta da arrivare rossa dal retto"},

{id:"s08", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"L'assistenza · parametri e segni di shock", celle:[
  {n:"1", t:"**Tachicardia**, **ipotensione**", key:true}, {n:"2", t:"Pallore, sudorazione"}, {n:"3", t:"**Oliguria**, agitazione"}, {n:"4", t:"**Due accessi venosi di grosso calibro**"}]},
{id:"s09", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"L'assistenza · seguirà un'endoscopia urgente", celle:[
  {t:"Prelievi: emocromo, coagulazione, **gruppo e prove crociate**", key:true}, {t:"**Digiuno**"}, {t:"Liquidi ed **emocomponenti** secondo prescrizione"}]},
{id:"s10", tipo:"trappola", tema:"chiaro", sopratitolo:"Un'avvertenza importante · si perde sangue intero: l'emoglobina scende in ritardo", righe:[
  {sb:"«L'emoglobina è normale: non è un'emorragia grave»", ok:"Contano i **parametri**"}]},

{id:"s11", tipo:"catena", tema:"chiaro", sopratitolo:"Le varici esofagee · quando sanguinano, il sanguinamento è spesso massivo", passi:[
  {t:"Cirrosi"}, {t:"Ipertensione portale"}, {t:"Varici esofagee", key:true}]},
{id:"s12", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"Il trattamento, su prescrizione", celle:[
  {t:"Farmaci **vasoattivi**"}, {t:"**Profilassi antibiotica**"}, {t:"**Legatura endoscopica**", key:true}]},
{id:"s13", tipo:"frase", tema:"chiaro", sopratitolo:"Per l'infermiere, oltre allo shock · un paziente che vomita sangue e perde coscienza va messo sul fianco",
  testo:"La sorveglianza delle **vie aeree**, per il rischio di inalazione del sangue vomitato."},

{id:"s14", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"La cirrosi · il fegato si riempie di tessuto fibroso · le cause", celle:[
  {n:"1", t:"**Alcol**", key:true}, {n:"2", t:"Virus dell'**epatite B e C**"}, {n:"3", t:"Sempre più la **steatosi** legata a obesità e diabete"}]},
{id:"s15", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Le complicanze", celle:[
  {n:"1", t:"**Ascite**, **varici**"}, {n:"2", t:"**Encefalopatia**", key:true}, {n:"3", t:"Ittero, **coagulopatia**: meno fattori della coagulazione"}, {n:"4", t:"Infezioni: la **peritonite batterica spontanea**; insufficienza renale"}]},

{id:"s16", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"L'ascite · liquido nella cavità addominale", celle:[
  {t:"Dieta **iposodica**"}, {t:"**Diuretici** secondo prescrizione"}, {t:"**Peso** quotidiano", key:true}, {t:"**Circonferenza addominale**"}]},
{id:"s17", tipo:"frase", tema:"chiaro", sopratitolo:"La circonferenza · all'ombelico, segnato con un pennarello · bilancio idrico",
  testo:"Sempre nello **stesso punto** e alla **stessa ora**."},
{id:"s18", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Attenzione", celle:[
  {n:"!", t:"Al **respiro**: un'ascite voluminosa comprime il diaframma", key:true}, {n:"!", t:"Alla **cute** tesa dell'addome"}]},

{id:"s19", tipo:"trappola", tema:"chiaro", sopratitolo:"La paracentesi · dal medico, con l'assistenza infermieristica · consenso, posizione supina o semiseduta, asepsi", righe:[
  {sb:"Pungere a vescica piena", ok:"Prima, far **svuotare la vescica**"}]},
{id:"s20", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"Durante e dopo · la rimozione di molti litri può causare ipotensione", celle:[
  {t:"Sorveglianza della **pressione**", key:true}, {t:"Si **registra** la quantità drenata"}]},
{id:"s21", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"Nelle paracentesi di grande volume · l'albumina della lezione 6.3", celle:[
  {t:"**Albumina** secondo prescrizione", key:true}, {t:"Poi il **punto di puntura**: il liquido può continuare a uscire"}]},

{id:"s22", tipo:"catena", tema:"chiaro", sopratitolo:"L'encefalopatia epatica", passi:[
  {t:"Fegato malato"}, {t:"Ammoniaca non eliminata", key:true}, {t:"Arriva al cervello"}]},
{id:"s23", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"I primi segni sono subdoli · chi conosce il paziente li nota prima di chi lo visita", celle:[
  {n:"1", t:"Inversione del **ritmo sonno-veglia**", key:true}, {n:"2", t:"**Confusione**"}, {n:"3", t:"Cambiamenti della **personalità**"}]},
{id:"s24", tipo:"asterixis", tema:"chiaro", sopratitolo:"Poi l'asterixis, o flapping tremor · fino al coma", voci:[]},
{id:"s25", tipo:"asterixis", tema:"chiaro", sopratitolo:"I fattori scatenanti sono la chiave per l'infermiere · il sangue nell'intestino è una fonte di ammoniaca", testa:"I fattori scatenanti"},

{id:"s26", tipo:"cifre", tema:"chiaro", sopratitolo:"L'assistenza · il lattulosio, secondo prescrizione, con un obiettivo preciso · riduce l'assorbimento dell'ammoniaca · a volte la rifaximina", voci:[
  {n:"2–3", suf:"al giorno", d:"evacuazioni morbide", key:true}]},
{id:"s27", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"L'assistenza · la persona confusa cade", celle:[
  {t:"Prevenire la **stipsi**"}, {t:"**Evitare i sedativi**", key:true}, {t:"Sorvegliare lo **stato di coscienza**"}, {t:"La **sicurezza**"}]},
{id:"s28", tipo:"frase", tema:"chiaro", sopratitolo:"E cercare sempre il fattore scatenante",
  testo:"Un cirrotico con **stipsi da tre giorni** che diventa confuso: il nesso c'è."},

{id:"s29", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"La pancreatite acuta · amilasi e lipasi elevate", celle:[
  {n:"!", t:"Dolore **epigastrico**, intenso, **«a barra»**, irradiato al **dorso**; nausea, vomito", key:true}, {n:"→", t:"Le cause: **calcoli biliari** e **alcol**"}]},
{id:"s30", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"L'assistenza", celle:[
  {t:"**Analgesia** adeguata", key:true}, {t:"**Liquidi** precoci secondo prescrizione"}, {t:"Parametri, **diuresi**"}, {t:"**Glicemia** e **calcio**"}]},
{id:"s31", tipo:"trappola", tema:"chiaro", sopratitolo:"Un aggiornamento rispetto ai vecchi manuali", righe:[
  {sb:"Digiuno prolungato", ok:"**Nutrizione precoce**, preferibilmente **enterale**: riduce le complicanze"}]},

{id:"s32", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Le procedure · la gastroscopia · secondo procedura", celle:[
  {t:"Digiuno dai **solidi**: di norma almeno **6 ore**", key:true}, {t:"Dai **liquidi chiari**: di norma **2**"}, {t:"**Consenso**, rimozione delle **protesi dentarie**"}, {t:"**Anticoagulanti** secondo indicazione"}]},
{id:"s33", tipo:"trappola", tema:"chiaro", sopratitolo:"Dopo · la regola della disfagia della lezione 3.3", righe:[
  {sb:"Bere subito dopo l'anestetico in gola", ok:"Niente cibo né bevande finché non torna il **riflesso della deglutizione**"}]},
{id:"s34", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"E sorveglianza · possibili segni di perforazione", celle:[
  {n:"!", t:"**Dolore**, **febbre**, **enfisema**", key:true}]},

{id:"s35", tipo:"percorso", tema:"chiaro", sopratitolo:"La colonscopia · il risultato dipende dalla preparazione intestinale", attive:[0,1], tappe:[
  {t:"Dieta povera di scorie", d:"nei giorni precedenti"}, {t:"Liquidi chiari", d:"il giorno prima"}, {t:"Soluzione lassativa", d:"dose frazionata", key:true}]},
{id:"s36", tipo:"percorso", tema:"chiaro", sopratitolo:"La soluzione lassativa in dose frazionata · la seconda metà vicina all'esame pulisce meglio", tappe:[
  {t:"Dieta povera di scorie", d:"nei giorni precedenti"}, {t:"Liquidi chiari", d:"il giorno prima"}, {t:"Soluzione lassativa", d:"una parte la sera, una la mattina", key:true}]},
{id:"s37", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Il ferro si sospende secondo indicazione: scurisce le feci", celle:[
  {n:"✓", t:"Preparazione adeguata: scariche **liquide, chiare, giallastre**", key:true}]},
{id:"s38", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Nell'anziano · e dopo l'esame", celle:[
  {n:"!", t:"**Disidratazione**, squilibri elettrolitici, **cadute** nelle corse notturne al bagno", key:true}, {n:"!", t:"Dopo: **dolore** e **sanguinamento**, soprattutto dopo l'asportazione di polipi"}]},

{id:"s39", tipo:"confronto", tema:"chiaro", sopratitolo:"L'ittero · cute e sclere gialle, da aumento della bilirubina · nell'ittero da ostruzione", col:[
  {h:"Urine", t:"**scure**", key:true}, {h:"Feci", t:"**chiare**"}]},
{id:"s40", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Il sintomo più fastidioso: il prurito", celle:[
  {t:"Igiene **delicata**"}, {t:"**Unghie corte**", key:true}, {t:"Cute **idratata**"}, {t:"**Segnalazione** per la terapia"}]},

{id:"s41", tipo:"frase", tema:"chiaro", sopratitolo:"Il caso · paziente cirrotico, da ieri più sonnolento e confuso",
  testo:"Alvo **chiuso da tre giorni**, e stanotte ha ricevuto una **benzodiazepina**. Che cosa pensi?"},
{id:"s42", tipo:"asterixis", tema:"chiaro", sopratitolo:"Encefalopatia epatica, con due fattori scatenanti evidenti · che cosa fai: valuti coscienza e asterixis, parametri e glicemia", attive:[0,3], key:[0,3], testa:"Due fattori evidenti"},
{id:"s43", tipo:"percorso", tema:"chiaro", sopratitolo:"Che cosa fai", tappe:[
  {t:"Coscienza, asterixis"}, {t:"Parametri, glicemia"}, {t:"Medico", d:"segnalando i fattori scatenanti", key:true}, {t:"Lattulosio", d:"secondo prescrizione"}]},
{id:"s44", tipo:"titolo", tema:"profondo",
  titolo:"Il nesso c'era già **ieri sera**, nella consegna.",
  sotto:"Tre giorni senza alvo e una benzodiazepina. Sicurezza e rischio di inalazione."},

{id:"s45", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"In Veneto", celle:[
  {n:"1", t:"Servizi di **endoscopia digestiva** e percorsi per l'**emorragia digestiva**"}, {n:"2", t:"Il **programma regionale di screening** del tumore del colon-retto", key:true}]},
{id:"s46", tipo:"frase", tema:"chiaro", sopratitolo:"Un tema di prevenzione che collega questa lezione al modulo 11",
  testo:"La ricerca del **sangue occulto** nelle feci e la **colonscopia** di approfondimento."},

{id:"s47", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"La sintesi", celle:[
  {t:"**Ematemesi e melena**: alta · **rettorragia**: bassa", key:true}, {t:"L'emoglobina scende **in ritardo** · **due accessi** di grosso calibro"}, {t:"Ascite: **peso e circonferenza**"}, {t:"Paracentesi: **vescica vuota**, **albumina**"}]},
{id:"s48", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"La sintesi", celle:[
  {t:"Encefalopatia: **asterixis**, lattulosio per **2–3 scariche**, niente sedativi", key:true}, {t:"Pancreatite: dolore **a barra** verso il dorso"}, {t:"Dopo la gastroscopia: il **riflesso della deglutizione**"}]},
{id:"s49", tipo:"frase", tema:"chiaro", sopratitolo:"Nella prossima lezione · la neurologia, con l'ictus al centro",
  testo:"Riconoscerlo in pochi secondi e attivare il percorso giusto può **cambiare la vita** di una persona."},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"8.6<br>Neurologia", sottotitolo:"Il tempo è cervello",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
