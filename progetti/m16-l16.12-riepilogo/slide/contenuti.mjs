// Contenuto delle 50 scene della lezione 16.12 — riepilogo del Modulo 16 e casi
// lampo. Le frasi degli undici casi sono una tabella in cinque pagine; i fili una
// griglia che si accende; ogni caso lampo si apre con la pausa (scenario in alto)
// e si chiude con le azioni; le tracce sono carte numerate; i calcoli si scrivono
// a schermo; la chiusura annuncia il Modulo 17.

const FRASI = (righe, k, sop) => ({tipo:"tabella", tema:"chiaro", sopratitolo:sop, colonne:["30%","70%"],
  intestazioni:["Il caso", "La frase"], righe, chiave:[k]});

const FILI = att => ({tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, attive:att, celle:[
  {n:"1", t:"Il **tempo** come dato clinico · ictus, ustioni, trauma, tranexamico"},
  {n:"2", t:"I parametri che **ingannano** · saturazione, emoglobina, potassio, pressione"},
  {n:"3", t:"Le **vie aeree** prima di tutto · cirrotico, ustionato, ventilato"},
  {n:"4", t:"La **prevenzione mancata** · embolia, inalazione, rialimentazione, Clostridioides"},
  {n:"5", t:"La **persona** dietro la malattia · alcol, diagnosi a 19 anni, famiglia"}]});

const LAMPO = (n, es, testo, dati) => ({tipo:"pausa", tema:"chiaro", etichetta:"caso lampo", sopratitolo:`Caso lampo ${n}`, es, testo, dati});

const TRACCE = att => ({tipo:"griglia", tema:"chiaro", colonne:4, spunta:false, attive:att, celle:[
  {n:"16.1", t:"Sospetto **ictus** in reparto"}, {n:"16.2", t:"Emorragia **digestiva**"},
  {n:"16.3", t:"**Iperkaliemia** nel dializzato"}, {n:"16.4", t:"**Embolia** polmonare in medicina"},
  {n:"16.5", t:"**Clostridioides** difficile"}, {n:"16.6", t:"**Politrauma** · XABCDE"},
  {n:"16.7", t:"Grande **ustionato** · Parkland"}, {n:"16.8", t:"**Chetoacidosi**"},
  {n:"16.9", t:"Nutrizione enterale e **inalazione**"}, {n:"16.10", t:"**Monossido**"},
  {n:"16.11", t:"Paziente **ventilato** · DOPE, VAP"}]});

const ALLENA = att => ({tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, attive:att, celle:[
  {n:"1", t:"Una **traccia al giorno**, alternando i moduli 15 e 16"},
  {n:"2", t:"Casi con calcoli: **rifare il calcolo** senza guardare"},
  {n:"3", t:"Casi con trappola: **una riga** · il potassio, la saturazione, gli orari"},
  {n:"4", t:"Il quaderno dei casi: **11 pagine** e i 6 casi lampo"}]});

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 16 · Riepilogo",
  titolo:"I casi avanzati<br>e i casi lampo", sottotitolo:"16.12 · Riepilogo del modulo, sei casi lampo, tracce probabili",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"tre", tema:"chiaro", sopratitolo:"Micro-lezione 12 di 12 · chiudiamo il modulo dei casi avanzati", box:[
  {n:"1", t:"Le frasi chiave", d:"degli undici casi, come ancore", key:true},
  {n:"2", t:"I fili", d:"che li attraversano"}]},
{id:"s03", tipo:"tre", tema:"chiaro", sopratitolo:"Poi", box:[
  {n:"6", t:"Casi lampo", d:"situazioni di qualsiasi turno", key:true},
  {n:"+", t:"Le tracce probabili"}, {n:"+", t:"I calcoli"}, {n:"+", t:"Come allenarsi"}]},

{id:"s04", ...FRASI([
  ["16.1 · Ictus", "l'orologio parte **dall'ultima volta in cui stava bene**"],
  ["16.2 · Emorragia nel cirrotico", "chi vomita sangue e si addormenta rischia **prima di soffocare**"]], 0, "Le frasi del modulo · come ancore")},
{id:"s05", ...FRASI([
  ["16.3 · Iperkaliemia", "il calcio protegge, ma **solo la dialisi** porta via il potassio"],
  ["16.4 · Embolia", "un polpaccio gonfio da un lato **non è «da posizione»**"]], 1, "Le frasi del modulo")},
{id:"s06", ...FRASI([
  ["16.5 · Clostridioides", "con le spore **l'alcol non basta**: acqua e sapone"],
  ["16.6 · Politrauma", "l'ordine delle priorità salva **più della velocità**"]], 0, "Le frasi del modulo")},
{id:"s07", ...FRASI([
  ["16.7 · Ustionato", "l'orologio parte **dalle fiamme**, non dalla porta del pronto soccorso"],
  ["16.8 · Chetoacidosi", "l'insulina si sospende **per ultima**"]], 1, "Le frasi del modulo")},
{id:"s08", ...FRASI([
  ["16.9 · Nutrizione", "nutrire **piano**, e nella posizione giusta"],
  ["16.10 · Monossido", "il saturimetro **non lo legge**"],
  ["16.11 · Terapia intensiva", "dietro le macchine **c'è una persona**"]], 2, "Le frasi del modulo")},

{id:"s09", sopratitolo:"I fili che attraversano i casi", ...FILI([0])},
{id:"s10", tipo:"tabella", tema:"chiaro", sopratitolo:"Il secondo filo · i parametri che ingannano", colonne:["34%","66%"],
  intestazioni:["Il parametro", "Dove inganna"], righe:[
  ["Saturazione", "nel **monossido**"],
  ["Emoglobina", "nell'**emorragia** acuta"],
  ["Potassio", "nella **chetoacidosi**"],
  ["Pressione", "nell'**ictus**"]]},
{id:"s11", sopratitolo:"Il terzo filo · come nell'ABCDE della lezione 10.2", ...FILI([0,1,2])},
{id:"s12", sopratitolo:"Il quarto filo · la radice dell'evento", ...FILI([0,1,2,3])},
{id:"s13", sopratitolo:"Il quinto filo", ...FILI([0,1,2,3,4])},

{id:"s14", ...LAMPO(1, "pronto soccorso · 22 anni, asmatico",
  "Non riesce a **finire una frase**, usa i muscoli accessori.", ["FR 34", "SpO₂ 90%"])},
{id:"s15", tipo:"figura", tema:"chiaro", illu:"polmoni", sopratitolo:"All'auscultazione, quasi nessun sibilo · lezione 8.2",
  titolo:"Torace **silenzioso**: passa pochissima aria.", sotto:"Un attacco grave, vicino all'arresto."},
{id:"s16", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Che cosa fai", celle:[
  {t:"Posizione **seduta**"}, {t:"**Ossigeno** con target"},
  {t:"**Broncodilatatori** per aerosol ripetuti"}, {t:"**Corticosteroide** secondo prescrizione"},
  {t:"Eventualmente **magnesio** EV, su prescrizione"}, {t:"**Monitoraggio** ed emogas"}]},
{id:"s17", tipo:"tre", tema:"chiaro", sopratitolo:"Un asmatico che smette di sibilare può stare peggiorando · subito il rianimatore", box:[
  {n:"1", t:"Sonnolenza"}, {n:"2", t:"Bradicardia"}, {n:"3", t:"CO₂ che sale", key:true}]},

{id:"s18", ...LAMPO(2, "a casa, al mattino, d'inverno",
  "Signora di **88 anni**, vive sola, trovata a terra dopo una caduta notturna.", ["T 31 °C", "bradicardica", "confusa"])},
{id:"s19", tipo:"icone", tema:"chiaro", sopratitolo:"Ipotermia moderata · in terapia anticoagulante", voci:[
  {icona:"cuore2", t:"Manovrarla con delicatezza", d:"il cuore freddo va facilmente in fibrillazione ventricolare", key:true},
  {icona:"termometro", t:"Riscaldarla in modo graduale"}]},
{id:"s20", tipo:"catena", tema:"chiaro", sopratitolo:"Coperte, liquidi caldi secondo prescrizione · e poi", passi:[
  {t:"Lunga permanenza **a terra**"},
  {t:"**Rabdomiolisi**?", key:true},
  {t:"Urine scure, **enzimi muscolari**, funzione renale"}]},
{id:"s21", tipo:"tre", tema:"chiaro", sopratitolo:"E ancora", box:[
  {n:"TC", t:"Trauma cranico", d:"con l'anticoagulante"},
  {n:"cute", t:"Lesioni da pressione"},
  {n:"?", t:"Perché è caduta?", d:"lezione 15.7", key:true}]},

{id:"s22", ...LAMPO(3, "un'ora dopo un CVC in succlavia",
  "Dolore toracico e **dispnea**, murmure ridotto dallo stesso lato: sospetto **pneumotorace** da procedura.", ["SpO₂ 97 → 90%"])},
{id:"s23", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Che cosa fai", celle:[
  {t:"**Ossigeno**"}, {t:"Posizione **semiseduta**"},
  {t:"Medico, **subito**"}, {t:"**Radiografia** del torace"},
  {t:"Materiale per un eventuale **drenaggio**"}, {t:"**Segnalare** l'evento"}]},
{id:"s24", tipo:"frase", tema:"chiaro", sopratitolo:"Una regola · lezione 6.2",
  testo:"Il CVC **non si usa** finché il corretto posizionamento non è confermato.",
  sotto:"Dopo la succlavia, la radiografia esclude anche lo pneumotorace."},

{id:"s25", ...LAMPO(4, "ricoverata per confusione e cadute",
  "Signora di **80 anni** in terapia con un **diuretico tiazidico**. Nella notte, una crisi convulsiva.", ["sodio 118 mEq/L"])},
{id:"s26", tipo:"catena", tema:"chiaro", sopratitolo:"Iponatriemia grave e sintomatica", passi:[
  {t:"**Sicurezza**"}, {t:"Gestione della **crisi**"}, {t:"Avvisare il **medico**"},
  {t:"Correzione **secondo prescrizione**", d:"spesso ipertonica, in piccole dosi", key:true}]},
{id:"s27", tipo:"frase", tema:"chiaro", sopratitolo:"Con controlli ravvicinati del sodio",
  testo:"La correzione **troppo rapida** può causare un danno neurologico grave.",
  sotto:"La sindrome da demielinizzazione osmotica · lezione 3.5"},
{id:"s28", tipo:"icone", tema:"chiaro", sopratitolo:"Poi", voci:[
  {icona:"bilancia", t:"Bilancio idrico e diuresi"},
  {icona:"pillola", t:"Revisione dei farmaci", d:"che abbassano il sodio: alcuni diuretici, antidepressivi", key:true}]},

{id:"s29", ...LAMPO(5, "PICC al braccio destro da 3 settimane",
  "Edema e dolore del braccio, **vene superficiali** evidenti.", ["circonferenza +3 cm"])},
{id:"s30", tipo:"griglia", tema:"chiaro", colonne:1, sopratitolo:"Sospetta trombosi venosa associata al catetere", celle:[
  {t:"**Segnalare**"},
  {no:true, t:"**Non** rimuovere né usare il catetere di propria iniziativa"},
  {t:"**Ecografia**"}]},
{id:"s31", tipo:"cifre", tema:"chiaro", sopratitolo:"Anticoagulazione su prescrizione · la rimozione la decide il medico", voci:[
  {n:"+3", suf:"cm", t:"la circonferenza del braccio", d:"misurarla fa parte della sorveglianza del PICC", key:true}]},

{id:"s32", ...LAMPO(6, "scivolato in casa",
  "Uomo di **76 anni** in **anticoagulante**, ha battuto la testa. Ora sta bene, e vuole tornare a casa.", ["trauma cranico minore"])},
{id:"s33", tipo:"cranio", tema:"chiaro", sopratitolo:"Lo stesso rischio della signora Elena · lezione 15.7", massa:50,
  titolo:"Rischio di emorragia intracranica", voci:["Trauma cranico **minore**", "in un **anticoagulato**", "**Anche tardiva**"]},
{id:"s34", tipo:"tre", tema:"chiaro", sopratitolo:"Valutazione medica e TC secondo protocollo · sorveglianza neurologica", box:[
  {n:"1", t:"GCS", key:true}, {n:"2", t:"Pupille"}, {n:"3", t:"Cefalea"}, {n:"4", t:"Vomito"}, {n:"5", t:"Sonnolenza"}]},
{id:"s35", tipo:"icone", tema:"chiaro", sopratitolo:"L'anticoagulante secondo indicazione · alla dimissione", voci:[
  {icona:"documento", t:"Istruzioni scritte", d:"sui segni d'allarme", key:true},
  {icona:"persona", t:"Un adulto che resti con lui", d:"nelle ore successive"}]},

{id:"s36", sopratitolo:"Le tracce più probabili legate a questo modulo", ...TRACCE([0,1,2,3,4])},
{id:"s37", sopratitolo:"Le tracce più probabili legate a questo modulo", ...TRACCE([0,1,2,3,4,5,6,7,8,9,10])},
{id:"s38", tipo:"cifre", tema:"chiaro", sopratitolo:"Per ognuna, un caso svolto: lo scenario, le priorità", voci:[
  {n:"15", t:"righe", d:"la risposta modello", key:true},
  {n:"3", t:"domande d'orale"}]},

{id:"s39", tipo:"calcolo", tema:"chiaro", sopratitolo:"I calcoli da sapere a memoria · Parkland, nelle 24 ore", righe:[
  ["4 ml", "×", "peso in kg", "×", "% di II e III grado"],
  {tok:["4 ml", "×", "80 kg", "×", "30%", "=", "9.600 ml"], nota:"l'esempio della lezione 16.7"}]},
{id:"s40", tipo:"cifre", tema:"chiaro", sopratitolo:"La trappola sugli orari · lezione 16.7", voci:[
  {n:"8", suf:"ore", t:"metà dei liquidi", d:"contate **dal momento dell'ustione**", key:true},
  {n:"0,5", suf:"ml/kg/h", t:"diuresi obiettivo", d:"circa 40 ml/h per 80 kg"}]},
{id:"s41", tipo:"tre", tema:"chiaro", sopratitolo:"E ancora", box:[
  {n:"÷", t:"Velocità di infusione", d:"dose oraria ÷ concentrazione"},
  {n:"≥ 4", t:"Padua", d:"alto rischio · sviluppato a Padova", key:true},
  {n:"9", t:"Regola del nove", d:"l'estensione dell'ustione"}]},
{id:"s42", tipo:"cifre", tema:"chiaro", sopratitolo:"La GCS · la regola del quindici per l'ipoglicemia", voci:[
  {n:"3–15", t:"GCS"},
  {n:"15", suf:"g", t:"zuccheri semplici", d:"nuovo controllo dopo **15 minuti**", key:true}]},

{id:"s43", sopratitolo:"Come allenarsi con questo modulo", ...ALLENA([0,1])},
{id:"s44", sopratitolo:"Come allenarsi con questo modulo", ...ALLENA([0,1,2,3])},
{id:"s45", tipo:"cifre", tema:"chiaro", sopratitolo:"E le risposte d'orale, ad alta voce", voci:[
  {n:"3", t:"per ogni caso"}, {n:"33", t:"in tutto il modulo", key:true},
  {n:"2–3", suf:"min", t:"ciascuna"}]},

{id:"s46", tipo:"titolo", tema:"profondo",
  titolo:"Nei casi complessi,<br>la competenza è sapere<br>**quale dato non credere**.",
  sotto:"La frase del modulo."},
{id:"s47", tipo:"tre", tema:"chiaro", sopratitolo:"Ognuno di questi casi ci ha insegnato a guardare oltre il numero", box:[
  {n:"SpO₂", t:"Una saturazione perfetta"}, {n:"Hb", t:"Un'emoglobina normale"}, {n:"K⁺", t:"Un potassio nei limiti", key:true}]},

{id:"s48", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Nel prossimo modulo · cambiamo scenario", celle:[
  {n:"·", t:"La **gravidanza** e il parto"}, {n:"·", t:"Il **bambino**"}, {n:"·", t:"La **salute mentale**"},
  {n:"·", t:"Le **cure palliative** a domicilio"}, {n:"·", t:"Il **territorio** veneto"}, {n:"·", t:"La **responsabilità** professionale"}]},
{id:"s49", tipo:"tre", tema:"chiaro", sopratitolo:"Si apre con la preeclampsia grave · lo stesso metodo", box:[
  {n:"17.1", t:"La preeclampsia grave", d:"nel Modulo 15 era un caso lampo", key:true},
  {n:"12", t:"Casi", d:"con lo stesso metodo"}]},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossimo modulo · Modulo 17",
  titolo:"Casi clinici<br>avanzati", sottotitolo:"Ciclo di vita, territorio e responsabilità",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
