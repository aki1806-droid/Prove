// Contenuto delle 50 scene della lezione 14.6 — sangue, immunità e infiammazione.
// L'emostasi è un percorso a quattro tappe; i gruppi AB0 una tabella con
// antigeni e anticorpi; le immunoglobuline una griglia che si accende due a due;
// la febbre un percorso in tre fasi che torna nel caso d'esame.

const EMOSTASI = (att, k) => ({tipo:"percorso", tema:"chiaro", tappe:[
  {t:"Vascolare", d:"vasocostrizione", key:k===0},
  {t:"Piastrinica", d:"tappo piastrinico · bloccata da ASA e antiaggreganti", key:k===1},
  {t:"Coagulativa", d:"trombina: fibrinogeno → fibrina", key:k===2},
  {t:"Fibrinolisi", d:"la plasmina scioglie il coagulo → D-dimero", key:k===3}], attive:att});

const IG = att => ({tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, celle:[
  {n:"G", t:"**IgG** · le più abbondanti, attraversano la **placenta**"},
  {n:"M", t:"**IgM** · compaiono **per prime** in un'infezione"},
  {n:"A", t:"**IgA** · mucose e **latte materno**"},
  {n:"E", t:"**IgE** · **allergie** e parassiti"}], attive:att});

const FEBBRE = (att, k) => ({tipo:"percorso", tema:"chiaro", tappe:[
  {t:"Salita", d:"brividi, cute fredda: **coprire**", key:k===0},
  {t:"Acme", d:"temperatura stabile", key:k===1},
  {t:"Defervescenza", d:"sudorazione: **scoprire**, idratare", key:k===2}], attive:att});

const PROSSIMA = (att, k) => ({tipo:"tre", tema:"chiaro", box:[
  {n:"1", t:"Semeiotica", d:"come si esamina un paziente", key:k===0},
  {n:"2", t:"Esami di laboratorio", d:"con i **valori di riferimento**", key:k===1},
  {n:"3", t:"Diagnostica per immagini", d:"sicurezza in **risonanza** · mezzi di **contrasto**", key:k===2}], attive:att});

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 14 · Basi biomediche e semeiotica",
  titolo:"Sangue, immunità<br>e infiammazione", sottotitolo:"14.6 · Composizione del sangue, AB0 e Rh, emostasi, immunità, febbre, ossa e cute",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"icone", tema:"chiaro", sopratitolo:"Micro-lezione 6 di 8 · le basi di temi già incontrati", voci:[
  {icona:"sacca", t:"Trasfusione"}, {icona:"siringa", t:"Anticoagulanti"},
  {icona:"microbo", t:"Infezioni"}, {icona:"avviso", t:"Sepsi", key:true}]},
{id:"s03", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Il percorso della lezione", celle:[
  {n:"1", t:"Com'è fatto il **sangue**"}, {n:"2", t:"**Gruppi sanguigni** e **coagulazione**"},
  {n:"3", t:"**Immunità** e **infiammazione**"}, {n:"4", t:"Sintesi: **muscolo-scheletrico** e **cute**"}]},

{id:"s04", tipo:"cifre", tema:"chiaro", sopratitolo:"La composizione del sangue", voci:[
  {n:"55", suf:"%", t:"plasma", d:"acqua · **proteine** (albumina, globuline, fibrinogeno) · elettroliti · nutrienti", key:true}]},
{id:"s05", tipo:"cifre", tema:"chiaro", sopratitolo:"Gli elementi figurati", voci:[
  {n:"45", suf:"%", t:"elementi figurati", d:"l'**ematocrito**"},
  {n:"120", suf:"giorni", t:"globuli rossi", d:"trasportano ossigeno con l'**emoglobina**", key:true}]},
{id:"s06", tipo:"raggiera", tema:"chiaro", sopratitolo:"I globuli bianchi difendono l'organismo", centro:"Leucociti",
  raggi:[{t:"Neutrofili", key:true}, {t:"Linfociti", key:true}, {t:"Monociti"}, {t:"Eosinofili"}, {t:"Basofili"}]},
{id:"s07", tipo:"cifre", tema:"chiaro", sopratitolo:"Tutti si formano nel midollo osseo · l'emopoiesi", voci:[
  {n:"7–10", suf:"giorni", t:"piastrine", d:"partecipano all'**emostasi**"},
  {n:"ASA", t:"blocco irreversibile", d:"per questo l'effetto **dura giorni**", key:true}]},

{id:"s08", tipo:"confronto", tema:"chiaro", sopratitolo:"I gruppi sanguigni AB0", col:[
  {h:"Gruppo A", t:"antigene **A** sui globuli rossi · anticorpi **anti-B** nel plasma"},
  {h:"Gruppo B", t:"antigene **B** sui globuli rossi · anticorpi **anti-A** nel plasma"}]},
{id:"s09", tipo:"tabella", tema:"chiaro", sopratitolo:"Il gruppo AB · ricevente universale di globuli rossi", colonne:["18%","30%","26%","26%"],
  intestazioni:["Gruppo", "Antigeni sui GR", "Anticorpi nel plasma", "Per i globuli rossi"], righe:[
  ["A", "A", "anti-B", "—"], ["B", "B", "anti-A", "—"],
  ["**AB**", "A e B", "**nessuno**", "**ricevente universale**"], ["0", "nessuno", "anti-A e anti-B", "donatore universale"]], chiave:[2]},
{id:"s10", tipo:"norma", tema:"chiaro", etichetta:"Donatore universale di globuli rossi", sigla:"Gruppo 0",
  testo:"Nessun antigene: è il sangue che si usa **in emergenza**, prima del gruppo."},
{id:"s11", tipo:"confronto", tema:"chiaro", sopratitolo:"Per il plasma vale il contrario", col:[
  {h:"Globuli rossi", t:"donatore universale: **0**"}, {h:"Plasma", t:"universale: **AB**, senza anticorpi"}],
  sotto:"Una trasfusione incompatibile è pericolosa · lezione 6.6"},

{id:"s12", tipo:"confronto", tema:"chiaro", sopratitolo:"Il fattore Rh", col:[
  {h:"Rh positivo", t:"antigene **D** presente"}, {h:"Rh negativo", t:"antigene D assente"}],
  sotto:"Dopo un'esposizione (trasfusione, gravidanza) l'Rh negativo può sviluppare anticorpi **anti-D**"},
{id:"s13", tipo:"catena", tema:"chiaro", sopratitolo:"La gravidanza", passi:[
  {t:"Madre **Rh negativa**"}, {t:"Figlio **Rh positivo**"},
  {t:"Profilassi con **immunoglobuline anti-D**", d:"protegge le gravidanze successive", key:true}]},

{id:"s14", sopratitolo:"L'emostasi in quattro fasi", ...EMOSTASI([0,1], 1)},
{id:"s15", tipo:"catena", tema:"chiaro", sopratitolo:"La fase coagulativa", passi:[
  {t:"Cascata dei **fattori**"}, {t:"**Trombina**"}, {t:"Fibrinogeno → **fibrina**"},
  {t:"Coagulo **stabile**", d:"la fibrina è la rete", key:true}]},
{id:"s16", sopratitolo:"La fibrinolisi · il D-dimero si dosa nel sospetto di trombosi", ...EMOSTASI([0,1,2,3], 3)},

{id:"s17", tipo:"norma", tema:"chiaro", etichetta:"Esplora la via estrinseca", sigla:"PT · INR",
  testo:"Monitora il **warfarin**, antagonista della vitamina K."},
{id:"s18", tipo:"confronto", tema:"chiaro", sopratitolo:"Due esami, due farmaci", col:[
  {h:"PT · INR", t:"via **estrinseca** → **warfarin**"},
  {h:"aPTT", t:"via **intrinseca** → **eparina non frazionata**"}],
  sotto:"L'eparina non frazionata potenzia l'antitrombina"},
{id:"s19", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Eparine a basso peso molecolare e anticoagulanti orali diretti", celle:[
  {n:"1", t:"**EBPM** · soprattutto sul **fattore Xa**"},
  {n:"2", t:"**DOAC** · inibiscono direttamente il **fattore Xa** o la **trombina**"}]},
{id:"s20", tipo:"tabella", tema:"chiaro", sopratitolo:"Gli antidoti · la base della lezione 5.5", colonne:["45%","55%"],
  intestazioni:["Farmaco", "Antidoto"], righe:[
  ["Warfarin", "**vitamina K**"], ["Eparina", "**protamina**"], ["Alcuni DOAC", "antidoti **specifici**"]], chiave:[]},

{id:"s21", tipo:"tre", tema:"chiaro", sopratitolo:"L'immunità innata · la prima linea", box:[
  {n:"1", t:"Rapida"}, {n:"2", t:"Non specifica"}, {n:"3", t:"Senza memoria"}]},
{id:"s22", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"Che cosa comprende", celle:[
  {t:"**Barriere** · cute integra, mucose, secrezioni, pH gastrico, microbiota"},
  {t:"**Fagociti** · neutrofili e macrofagi"}, {t:"Cellule **NK**"},
  {t:"Il **complemento**"}, {t:"L'**infiammazione**"}, {t:"La **febbre**"}]},
{id:"s23", tipo:"icone", tema:"chiaro", sopratitolo:"Ognuno interrompe una barriera · il fondamento del modulo 4", voci:[
  {icona:"siringa", t:"Ago"}, {icona:"catetere", t:"Catetere"}, {icona:"ferita", t:"Ferita", key:true}]},

{id:"s24", tipo:"catena", tema:"chiaro", sopratitolo:"L'immunità adattativa · specifica e con memoria", passi:[
  {t:"**Linfociti B**"}, {t:"**Plasmacellule**"}, {t:"**Anticorpi**", d:"immunità **umorale**", key:true}]},
{id:"s25", tipo:"confronto", tema:"chiaro", sopratitolo:"I linfociti T", col:[
  {h:"T helper", t:"**CD4**", grande:true}, {h:"T citotossici", t:"**CD8**", grande:true}],
  sotto:"L'immunità **cellulare**"},
{id:"s26", sopratitolo:"Le immunoglobuline", ...IG([0,1])},
{id:"s27", sopratitolo:"Le immunoglobuline · il colostro della lezione 11.4", ...IG([0,1,2,3])},

{id:"s28", tipo:"confronto", tema:"chiaro", sopratitolo:"Immunità attiva · l'organismo produce anticorpi, memoria duratura", col:[
  {h:"Naturale", t:"dopo un'**infezione**"}, {h:"Artificiale", t:"con un **vaccino**"}]},
{id:"s29", tipo:"confronto", tema:"chiaro", sopratitolo:"Immunità passiva · anticorpi già pronti, immediata ma temporanea", col:[
  {h:"Naturale", t:"anticorpi **materni**"}, {h:"Artificiale", t:"**immunoglobuline**, sieri"}]},
{id:"s30", tipo:"venn", tema:"chiaro", sopratitolo:"Epatite B: esposizione in un non vaccinato · lezione 4.8",
  sx:{t:"Attiva", d:"il **vaccino**"}, dx:{t:"Passiva", d:"anticorpi<br>**già pronti**"},
  centro:"**vaccino + immunoglobuline**: si combinano dopo l'esposizione"},

{id:"s31", tipo:"trappola", tema:"chiaro", sopratitolo:"Vivi attenuati · morbillo-parotite-rosolia, varicella", righe:[
  {sb:"Un vaccino vivo attenuato in gravidanza", ok:"**Controindicato** in gravidanza e nelle **immunodepressioni gravi**"}]},
{id:"s32", tipo:"griglia", tema:"chiaro", colonne:4, spunta:true, sopratitolo:"Gli altri vaccini · tutti con la catena del freddo", celle:[
  {t:"**Inattivati**"}, {t:"A **subunità**"}, {t:"**Anatossine** · es. tetano"}, {t:"A **mRNA**"}]},
{id:"s33", tipo:"tre", tema:"chiaro", sopratitolo:"Le reazioni ai vaccini", box:[
  {n:"1", t:"Locali", d:"le più comuni"}, {n:"2", t:"Febbre"},
  {n:"3", t:"Anafilassi", d:"rara → **osservazione** dopo la somministrazione, con il materiale per l'emergenza", key:true}]},

{id:"s34", tipo:"tre", tema:"chiaro", sopratitolo:"I cinque segni cardinali dell'infiammazione", box:[
  {n:"1", t:"Rubor", d:"arrossamento"}, {n:"2", t:"Calor", d:"calore"}, {n:"3", t:"Tumor", d:"gonfiore"},
  {n:"4", t:"Dolor", d:"dolore"}, {n:"5", t:"Functio laesa", d:"perdita di funzione"}]},
{id:"s35", tipo:"catena", tema:"chiaro", sopratitolo:"La febbre", passi:[
  {t:"I **pirogeni**"}, {t:"Alzano il **set-point** ipotalamico"}, {t:"**Febbre**", d:"tre fasi, interventi diversi", key:true}]},
{id:"s36", sopratitolo:"Le fasi della febbre · il corpo «insegue» la nuova temperatura", ...FEBBRE([0,1], 0)},
{id:"s37", sopratitolo:"Nella sepsi la risposta diventa disregolata · lezione 10.6", ...FEBBRE([0,1,2], 2)},

{id:"s38", tipo:"griglia", tema:"chiaro", colonne:4, spunta:true, sopratitolo:"Le ossa · con articolazioni e muscoli scheletrici", celle:[
  {t:"**Sostegno**"}, {t:"**Protezione**"}, {t:"Deposito di **calcio**"}, {t:"**Emopoiesi**"}]},
{id:"s39", tipo:"tre", tema:"chiaro", sopratitolo:"Osteoporosi: fragilità ossea · le fratture da caduta nell'anziano", box:[
  {n:"1", t:"Femore", key:true}, {n:"2", t:"Polso"}, {n:"3", t:"Vertebre"}]},
{id:"s40", tipo:"tabella", tema:"chiaro", sopratitolo:"La cute · le basi del modulo 7", colonne:["30%","70%"],
  intestazioni:["", "Da ricordare"], righe:[
  ["Strati", "**epidermide** · **derma** · **ipoderma**"],
  ["Funzioni", "barriera · termoregolazione · sensibilità · sintesi della **vitamina D**"],
  ["Nell'anziano", "più **sottile**, meno elastica, guarisce **più lentamente**"]], chiave:[2]},

{id:"s41", tipo:"frase", tema:"chiaro", sopratitolo:"Il caso d'esame",
  testo:"«Febbre a **39 °C**: prima tremava e chiedeva coperte, ora è **sudato**. Che cosa fai in ciascuna fase?»"},
{id:"s42", tipo:"catena", tema:"chiaro", sopratitolo:"Il caso · la fase di salita", passi:[
  {t:"**Brividi**"}, {t:"Lo **copri**"},
  {t:"**Emocolture**, se prescritte", d:"preferibilmente durante il brivido o il picco", key:true}]},
{id:"s43", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"Il caso · la defervescenza", celle:[
  {t:"Lo **scopri** gradualmente"}, {t:"Cambi la **biancheria**"}, {t:"Lo **idrati**"},
  {t:"Sorvegli la **pressione** · rischio di ipotensione"}, {t:"**Antipiretico** secondo prescrizione"}, {t:"Valuti la **causa**"}]},

{id:"s44", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Il collegamento con l'assistenza", celle:[
  {t:"**Trasfusione** e compatibilità AB0 · lezione 6.6"}, {t:"**INR**, **aPTT** e anticoagulanti · lezione 5.5"},
  {t:"Profilassi **anti-D**"}, {t:"**Barriere** e infezioni · modulo 4"},
  {t:"**Vaccinazioni** degli operatori"}, {t:"Gestione della **febbre**"},
  {t:"Prevenzione delle **cadute** e osteoporosi"}]},

{id:"s45", tipo:"tabella", tema:"chiaro", sopratitolo:"La tabella · il sangue", colonne:["30%","70%"],
  intestazioni:["Che cosa", "Da ricordare"], righe:[
  ["Composizione", "plasma **55%** · elementi figurati **45%**"],
  ["Vita media", "globuli rossi **120 giorni** · piastrine **7–10**"],
  ["AB0", "**0** donatore universale di GR · **AB** ricevente · plasma **AB** universale"],
  ["Rh", "profilassi **anti-D**"]], chiave:[2]},
{id:"s46", tipo:"tabella", tema:"chiaro", sopratitolo:"La tabella · coagulazione e difese", colonne:["30%","70%"],
  intestazioni:["Che cosa", "Da ricordare"], righe:[
  ["Emostasi", "vascolare · piastrinica · coagulativa · fibrinolisi"],
  ["Esami", "**INR** → warfarin · **aPTT** → eparina"],
  ["Immunità", "innata e adattativa · **attiva** (vaccino) e **passiva** (Ig)"],
  ["Vaccini vivi", "**no** in gravidanza"],
  ["Febbre", "**copri** in salita · **scopri** in defervescenza"]], chiave:[4]},

{id:"s47", tipo:"titolo", tema:"profondo",
  titolo:"Ogni barriera che interrompi<br>è **una porta che devi sorvegliare**.",
  sotto:"Un ago, un catetere, una ferita: l'immunità innata comincia lì."},

{id:"s48", sopratitolo:"Nella prossima lezione", ...PROSSIMA([0,1], 1)},
{id:"s49", sopratitolo:"Nella prossima lezione · e poi le immagini", ...PROSSIMA([0,1,2], 2)},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione · 14.7",
  titolo:"Semeiotica<br>infermieristica ed esami", sottotitolo:"Esame del paziente, esami di laboratorio, diagnostica per immagini",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
