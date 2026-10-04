// Contenuto delle 50 scene della lezione 11.5 — cure palliative e fine vita.
// Sedazione ed eutanasia sono una tabella a tre righe (intenzione, mezzi,
// esito); i sintomi una griglia; la sedazione una catena; la cura della salma
// una trappola sul riscontro diagnostico. Grafica sobria, tema sensibile.

const CRIT = (k) => ({tipo:"tabella", tema:"chiaro", colonne:["22%","43%","35%"], intestazioni:["", "Sedazione palliativa", "Eutanasia"], righe:[
  ["Intenzione", "alleviare una sofferenza **refrattaria**", "causare la morte"],
  ["Mezzi", "farmaci **titolati** sul sintomo", "una dose letale"],
  ["Esito", "la morte arriva per la **malattia**", "è causata dal farmaco"]], chiave:k});

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 11 · Setting assistenziali e ciclo di vita",
  titolo:"Cure palliative<br>e fine vita", sottotitolo:"11.5 · I sintomi, la sedazione palliativa, l'accompagnamento, la cura della salma",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"frase", tema:"chiaro", sopratitolo:"Micro-lezione 5 di 8 · quando non è più possibile guarire",
  testo:"È sempre possibile **curare**."},
{id:"s03", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"La persona intera, non solo la malattia", celle:[
  {t:"**Qualità** della vita", key:true}, {t:"Controllo dei **sintomi**"}, {t:"**Dignità**"}, {t:"**Accompagnamento**"}]},
{id:"s04", tipo:"frase", tema:"chiaro", sopratitolo:"Uno degli ambiti in cui l'assistenza infermieristica esprime di più il suo senso",
  testo:"I concorsi chiedono di distinguere concetti **spesso confusi**."},

{id:"s05", tipo:"norma", tema:"chiaro", etichetta:"Malattia inguaribile che progredisce", sigla:"Cure palliative",
  testo:"Cure **attive** e **globali** · obiettivo: la qualità della vita."},
{id:"s06", tipo:"griglia", tema:"chiaro", colonne:4, spunta:false, sopratitolo:"Non accelerano né ritardano la morte", celle:[
  {n:"·", t:"Dolore e **sintomi**", key:true}, {n:"·", t:"Aspetti **psicologici**"}, {n:"·", t:"Aspetti **sociali**"}, {n:"·", t:"Aspetti **spirituali**"}]},
{id:"s07", tipo:"confronto", tema:"chiaro", sopratitolo:"Due precisazioni · lezione 8.7", col:[
  {h:"Non solo oncologia", t:"scompenso, BPCO, demenze, malattie **neurologiche**"}, {h:"Non solo ultimi giorni", t:"cure palliative **precoci**, accanto alle terapie", key:true}]},

{id:"s08", tipo:"norma", tema:"chiaro", etichetta:"Lezione 3.7 · un diritto di accesso", sigla:"L. 38/2010",
  testo:"**Due reti**: cure palliative e terapia del dolore."},
{id:"s09", tipo:"griglia", tema:"chiaro", colonne:4, spunta:false, sopratitolo:"I nodi della rete palliativa", celle:[
  {n:"·", t:"**Hospice**", key:true}, {n:"·", t:"Cure palliative **domiciliari**"}, {n:"·", t:"**Ambulatori**"}, {n:"·", t:"**Consulenza** in ospedale"}]},
{id:"s10", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"La legge 38 ha anche", celle:[
  {t:"Dolore rilevato **in cartella**: obbligatorio", key:true}, {t:"Prescrizione degli **oppioidi** semplificata"}]},

{id:"s11", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"La dispnea · molto angosciante · un piccolo ventilatore riduce la fame d'aria", celle:[
  {t:"Posizione **seduta**"}, {t:"**Aria fresca** sul volto", key:true}, {t:"Oppioidi a **basse dosi**"}]},
{id:"s12", tipo:"griglia", tema:"chiaro", colonne:4, spunta:false, sopratitolo:"Il controllo dei sintomi · ossigeno solo se davvero utile", celle:[
  {n:"·", t:"Dolore: scala **OMS**"}, {n:"·", t:"Nausea, vomito"}, {n:"!", t:"**Stipsi**: prevenirla sempre con gli oppioidi", key:true}, {n:"·", t:"**Delirium** terminale"}]},
{id:"s13", tipo:"frase", tema:"chiaro", sopratitolo:"Frequentissima · igiene e umidificazione frequenti · e l'ansia",
  testo:"La **secchezza** del cavo orale."},

{id:"s14", tipo:"frase", tema:"chiaro", sopratitolo:"Le secrezioni terminali · secrezioni che la persona non riesce più a eliminare",
  testo:"Il **rantolo** terminale."},
{id:"s15", tipo:"confronto", tema:"chiaro", sopratitolo:"Più angosciante per i familiari che per la persona, di solito incosciente", col:[
  {h:"Posizione", t:"**laterale**"}, {h:"Farmaci", t:"**antisecretivi**, secondo prescrizione", key:true}]},
{id:"s16", tipo:"trappola", tema:"chiaro", sopratitolo:"E soprattutto si spiega ai familiari che cosa sta succedendo", righe:[
  {sb:"Aspirazione profonda di routine", ok:"**Non raccomandata**: traumatica, poco efficace"}]},

{id:"s17", tipo:"norma", tema:"chiaro", etichetta:"Per esempio il midazolam", sigla:"Sedazione palliativa",
  testo:"Riduzione **intenzionale** della coscienza, per sintomi **refrattari**."},
{id:"s18", tipo:"catena", tema:"chiaro", sopratitolo:"Dispnea terminale, delirium agitato, dolore insopportabile", passi:[
  {t:"Sintomo **refrattario**"}, {t:"Farmaci **titolati**"}, {t:"Quanto basta per **controllarlo**", key:true}]},
{id:"s19", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"Le condizioni", celle:[
  {t:"**Consenso**, DAT o pianificazione condivisa", key:true}, {t:"Decisione dell'**équipe**"}, {t:"**Documentata**"}]},
{id:"s20", tipo:"norma", tema:"chiaro", etichetta:"Articolo 2 · con il consenso", sigla:"L. 219/2017",
  testo:"Sedazione palliativa **profonda continua**, con la terapia del dolore."},

{id:"s21", tipo:"frase", tema:"chiaro", sopratitolo:"La distinzione che i concorsi chiedono",
  testo:"Sedazione palliativa ed **eutanasia**."},
{id:"s22", tipo:"titolo", tema:"profondo",
  titolo:"Intenzione,<br>mezzi, **esito**.",
  sotto:""},
{id:"s23", sopratitolo:"Sedazione palliativa ed eutanasia", ...CRIT([])},
{id:"s24", tipo:"confronto", tema:"chiaro", sopratitolo:"Suicidio assistito: sentenza 242/2019 della Corte costituzionale · dibattito aperto", col:[
  {h:"Sedazione palliativa", t:"trattamento sanitario **lecito**", key:true}, {h:"Eutanasia attiva", t:"**non consentita** in Italia"}]},

{id:"s25", tipo:"norma", tema:"chiaro", etichetta:"Nutrizione e idratazione artificiali", sigla:"L. 219/2017",
  testo:"Sono **trattamenti sanitari**: si possono rifiutare o interrompere."},
{id:"s26", tipo:"confronto", tema:"chiaro", sopratitolo:"Negli ultimi giorni", col:[
  {h:"Spesso", t:"sovraccarico, **edemi**, più secrezioni"}, {h:"La sete", t:"cura del **cavo orale**: sorsi, umidificazione, igiene", key:true}]},
{id:"s27", tipo:"frase", tema:"chiaro", sopratitolo:"Il «non dare da mangiare» ha un forte significato emotivo, e va accompagnato",
  testo:"Le scelte si condividono con la persona e la **famiglia**."},

{id:"s28", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"I segni della morte imminente", celle:[
  {n:"·", t:"Coscienza che si **riduce**"}, {n:"·", t:"Respiro di **Cheyne-Stokes**", key:true}, {n:"·", t:"Il **rantolo**"}]},
{id:"s29", tipo:"griglia", tema:"chiaro", colonne:4, spunta:false, sopratitolo:"I segni della morte imminente", celle:[
  {n:"·", t:"**Marezzatura**: chiazze", key:true}, {n:"·", t:"Estremità **fredde**"}, {n:"·", t:"Diuresi **ridotta**"}, {n:"·", t:"Polso debole, ipotensione"}]},
{id:"s30", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Riconoscerli permette di", celle:[
  {t:"**Preparare la famiglia**, favorirne la presenza", key:true}, {t:"**Rivedere la terapia**: esami, parametri, farmaci inutili"}]},

{id:"s31", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"L'accompagnamento", celle:[
  {t:"**Presenza**"}, {t:"**Ascolto**", key:true}, {t:"Valori, volontà, **credenze**"}]},
{id:"s32", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"Spirituale non coincide per forza con religioso", celle:[
  {t:"Bisogni **spirituali**"}, {t:"**Familiari** anche fuori orario"}, {t:"**Dignità** fino alla fine", key:true}]},
{id:"s33", tipo:"frase", tema:"chiaro", sopratitolo:"Nel fine vita il comfort è l'obiettivo assistenziale principale",
  testo:"Aiuta la persona a **stare meglio**?"},

{id:"s34", tipo:"cifre", tema:"chiaro", sopratitolo:"Constatazione e certificazione: atti medici · ECG continuo, criteri cardiaci", voci:[
  {n:"20", suf:"", d:"minuti almeno", key:true}]},
{id:"s35", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"Gesti semplici, che restano nella memoria di chi resta", celle:[
  {t:"Avvisa il **medico**"}, {t:"Documenta l'**ora**", key:true}, {t:"Si occupa dei **familiari**"}]},

{id:"s36", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"La cura della salma · dopo la constatazione, con riservatezza", celle:[
  {t:"**Igiene**"}, {t:"Supina, **allineata**"}, {t:"Occhi e bocca chiusi, **protesi** in sede", key:true}]},
{id:"s37", tipo:"trappola", tema:"chiaro", sopratitolo:"I dispositivi si rimuovono secondo procedura · una domanda frequente", righe:[
  {sb:"Rimuoverli sempre", ok:"**Non** se c'è riscontro diagnostico o rilievi medico-legali"}]},
{id:"s38", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"La cura della salma", celle:[
  {t:"**Identificazione**", key:true}, {t:"**Inventario** degli oggetti personali"}, {t:"Riti e volontà **religiose**"}]},
{id:"s39", tipo:"frase", tema:"chiaro", sopratitolo:"Prima del trasferimento in camera mortuaria",
  testo:"Il **tempo** per il saluto dei familiari."},

{id:"s40", tipo:"confronto", tema:"chiaro", sopratitolo:"Il lutto · sostenere i familiari, anche dopo", col:[
  {h:"Lutto", t:"un processo **normale**"}, {h:"Lutto complicato", t:"intenso e prolungato: **riconoscere**, indirizzare", key:true}]},
{id:"s41", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"Anche gli operatori vivono il lutto · la cura di chi cura", celle:[
  {t:"Confronto in **équipe**"}, {t:"**Debriefing**", key:true}, {t:"Prevenire il **burnout**"}]},

{id:"s42", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Il caso · paziente oncologico terminale", celle:[
  {n:"!", t:"Dispnea **refrattaria**"}, {n:"!", t:"Grande **angoscia**"}, {n:"·", t:"Aveva chiesto di **non soffrire**", key:true}]},
{id:"s43", tipo:"frase", tema:"chiaro", sopratitolo:"Sedazione palliativa avviata, con il consenso espresso prima · la figlia chiede",
  testo:"«Lo state **facendo morire**?»"},
{id:"s44", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"Che cosa rispondi · con calma e chiarezza · poi presenza, ascolto, il medico", celle:[
  {t:"Toglie una sofferenza **refrattaria**", key:true}, {t:"Farmaci dosati sul **sintomo**"}, {t:"La **malattia** segue il suo corso"}]},

{id:"s45", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"In Veneto · all'orale: l'integrazione fra hospice e domicilio", celle:[
  {t:"**Hospice**"}, {t:"**Nuclei di Cure Palliative** nelle ULSS", key:true}, {t:"Consulenza in **ospedale**"}, {t:"Rete **pediatrica**, centro regionale"}]},

{id:"s46", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"La tabella", celle:[
  {n:"38", t:"**due reti** · cure palliative precoci"}, {n:"·", t:"Dispnea: **aria fresca**, oppioidi"},
  {n:"!", t:"Rantolo: **niente aspirazione** di routine", key:true}, {n:"·", t:"Posizione, antisecretivi"}]},
{id:"s47", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"La tabella", celle:[
  {n:"219", t:"sedazione: refrattari, **titolati**, consenso"}, {n:"≠", t:"eutanasia: intenzione, mezzi, **esito**", key:true}, {n:"20", t:"minuti di **ECG**"},
  {n:"!", t:"Salma: dispositivi in sede se **riscontro diagnostico**"}, {n:"·", t:"Nutrizione artificiale: **trattamento sanitario**"}, {n:"·", t:"Comfort come **obiettivo**"}]},
{id:"s48", tipo:"titolo", tema:"profondo",
  titolo:"Quando non si può più guarire,<br>**si può sempre curare**.",
  sotto:""},
{id:"s49", tipo:"frase", tema:"chiaro", sopratitolo:"Nella prossima lezione · riguarda milioni di persone",
  testo:"La **cronicità**: un modo diverso di organizzare l'assistenza."},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"11.6<br>Cronicità<br>e self-care", sottotitolo:"Educazione terapeutica, aderenza, autogestione",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
