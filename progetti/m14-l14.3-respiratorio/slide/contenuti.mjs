// Contenuto delle 50 scene della lezione 14.3 — l'apparato respiratorio.
// La meccanica del respiro è un ciclo; la curva di dissociazione due box che si
// accendono (la parte piatta, poi quella ripida); il controllo del respiro un
// «tre» che aggiunge i chemocettori; il BPCO ipercapnico tre icone.

const CURVA = (att, k) => ({tipo:"tre", tema:"chiaro", box:[
  {n:"1", t:"Parte alta: piatta", d:"grandi variazioni di PaO₂, **piccole** variazioni di saturazione", key:k===0},
  {n:"2", t:"Sotto il 90%: ripida", d:"piccole riduzioni di PaO₂, **crollo** della saturazione", key:k===1}], attive:att});

const CONTROLLO = (att, k) => ({tipo:"tre", tema:"chiaro", box:[
  {n:"1", t:"Centri respiratori", d:"tronco encefalico: **bulbo** e **ponte**", key:k===0},
  {n:"2", t:"Chemocettori centrali", d:"**CO₂** e pH · lo stimolo principale", key:k===1},
  {n:"3", t:"Chemocettori periferici", d:"carotidei e aortici · soprattutto l'**ipossia**", key:k===2}], attive:att});

const INSUFF = (att, k) => ({tipo:"tre", tema:"chiaro", box:[
  {n:"1", t:"Ipossiemica", d:"PaO₂ **< 60** · CO₂ normale o bassa · polmonite, edema polmonare, embolia", key:k===0},
  {n:"2", t:"Ipercapnica", d:"PaO₂ **< 60** e PaCO₂ **> 45** · BPCO, malattie neuromuscolari, oppioidi", key:k===1}], attive:att});

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 14 · Basi biomediche e semeiotica",
  titolo:"Apparato respiratorio", sottotitolo:"14.3 · Vie aeree, meccanica del respiro, scambi gassosi, curva di dissociazione",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"confronto", tema:"chiaro", sopratitolo:"Micro-lezione 3 di 8 · respirare significa due cose", col:[
  {h:"Ossigeno", t:"**portato** ai tessuti"}, {h:"Anidride carbonica", t:"**eliminata**"}]},
{id:"s03", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"In questa lezione", celle:[
  {n:"1", t:"L'anatomia delle **vie aeree**"}, {n:"2", t:"La **meccanica** del respiro"},
  {n:"3", t:"Gli **scambi gassosi**"}, {n:"4", t:"La **curva di dissociazione** dell'emoglobina", key:true}]},

{id:"s04", tipo:"tre", tema:"chiaro", sopratitolo:"Vie aeree superiori · il naso, poi la faringe", box:[
  {n:"1", t:"Riscalda"}, {n:"2", t:"Umidifica"}, {n:"3", t:"Filtra", d:"funzioni perse nella **tracheostomia** · lezione 8.2", key:true}]},
{id:"s05", tipo:"catena", tema:"chiaro", sopratitolo:"Laringe: corde vocali ed epiglottide · poi le vie aeree inferiori", passi:[
  {t:"**Trachea**"}, {t:"**Bronchi** principali"}, {t:"Bronchi lobari e segmentari"}, {t:"**Bronchioli**"}, {t:"**Alveoli**", key:true}]},
{id:"s06", tipo:"confronto", tema:"chiaro", sopratitolo:"Un dettaglio anatomico chiesto spesso", col:[
  {h:"Bronco principale destro", t:"più **corto**, più **largo**, più **verticale**"}, {h:"Corpi estranei inalati", t:"finiscono più spesso **a destra**"}]},
{id:"s07", tipo:"cifre", tema:"chiaro", sopratitolo:"Tubo troppo profondo: più spesso nel bronco destro · tutto avvolto dalla pleura, viscerale e parietale", voci:[
  {n:"3", suf:"lobi", t:"polmone **destro**", key:true}, {n:"2", suf:"lobi", t:"polmone **sinistro**"}]},

{id:"s08", tipo:"tre", tema:"chiaro", sopratitolo:"L'inspirazione è attiva", box:[
  {n:"1", t:"Diaframma", d:"il muscolo **principale**: si contrae e si abbassa", key:true},
  {n:"2", t:"Intercostali esterni", d:"sollevano le **coste**"}]},
{id:"s09", tipo:"ciclo", tema:"chiaro", sopratitolo:"La meccanica del respiro", centro:"Respiro", passi:[
  {t:"Diaframma", d:"si contrae"}, {t:"Torace", d:"si espande"}, {t:"Pressione alveolare", d:"scende"},
  {t:"L'aria", d:"entra"}, {t:"Ritorno elastico", d:"espirazione passiva", key:true}]},
{id:"s10", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"I muscoli accessori · un segno di fatica respiratoria · lezione 10.2", celle:[
  {n:"·", t:"**Sternocleido­mastoideo**", key:true}, {n:"·", t:"**Scaleni**"}, {n:"·", t:"**Addominali**"}]},
{id:"s11", tipo:"frase", tema:"chiaro", sopratitolo:"Il surfattante riveste gli alveoli",
  testo:"Riduce la tensione superficiale e impedisce il **collasso** degli alveoli.",
  sotto:"La sua carenza nel neonato prematuro: sindrome da distress respiratorio."},

{id:"s12", tipo:"cifre", tema:"chiaro", sopratitolo:"I volumi polmonari · a ogni respiro tranquillo, a riposo", voci:[
  {n:"500", suf:"ml", t:"volume corrente", d:"circa", key:true}]},
{id:"s13", tipo:"cifre", tema:"chiaro", sopratitolo:"Respiro rapido e superficiale: gran parte dell'aria non arriva agli alveoli", voci:[
  {n:"500", suf:"ml", t:"volume corrente", d:"circa"}, {n:"150", suf:"ml", t:"spazio morto anatomico", d:"circa · **nessuno scambio**", key:true}]},
{id:"s14", tipo:"confronto", tema:"chiaro", sopratitolo:"Gli altri volumi", col:[
  {h:"Capacità vitale", t:"la **massima** espirazione dopo la massima inspirazione"}, {h:"Volume residuo", t:"resta nei polmoni **dopo** l'espirazione massima"}]},
{id:"s15", tipo:"norma", tema:"chiaro", etichetta:"La spirometria · FEV1/FVC", sigla:"< 0,7",
  testo:"Indica un'**ostruzione**, come nella **BPCO**."},

{id:"s16", tipo:"confronto", tema:"chiaro", sopratitolo:"Gli scambi gassosi avvengono negli alveoli", col:[
  {h:"Ossigeno", t:"dall'alveolo **al sangue**"}, {h:"Anidride carbonica", t:"dal sangue **all'alveolo**"}],
  sotto:"Per **diffusione**, attraverso la membrana alveolo-capillare."},
{id:"s17", tipo:"confronto", tema:"chiaro", sopratitolo:"Il rapporto ventilazione/perfusione", col:[
  {h:"Ventilato, non perfuso", t:"**embolia**"}, {h:"Perfuso, non ventilato", t:"**atelettasia**, polmonite"}],
  sotto:"Il sangue esce poco ossigenato → **ipossiemia**."},
{id:"s18", tipo:"cifre", tema:"chiaro", sopratitolo:"Per questo l'ipossiemia compare di solito prima dell'ipercapnia", voci:[
  {n:"20", suf:"volte", t:"la CO₂ diffonde più facilmente dell'O₂", d:"circa", key:true}]},

{id:"s19", tipo:"cifre", tema:"chiaro", sopratitolo:"Il trasporto dell'ossigeno · una piccola parte è disciolta nel plasma", voci:[
  {n:"98", suf:"%", t:"dell'O₂ legato all'**emoglobina**", d:"circa", key:true}]},
{id:"s20", tipo:"venn", tema:"chiaro", sopratitolo:"Quanto ossigeno arriva ai tessuti",
  sx:{t:"Saturazione", d:"% di emoglobina<br>legata all'**O₂**"}, dx:{t:"Emoglobina", d:"la sua<br>**quantità**"},
  centro:"l'**ossigeno trasportato** dipende da entrambe"},
{id:"s21", tipo:"trappola", tema:"chiaro", sopratitolo:"L'anemia grave · lezione 8.2", righe:[
  {sb:"«Saturazione normale, ossigeno sufficiente»", ok:"Saturazione **normale**, ma apporto ai tessuti **insufficiente**"}]},

{id:"s22", tipo:"frase", tema:"chiaro", sopratitolo:"La curva di dissociazione dell'emoglobina",
  testo:"Il rapporto fra **PaO₂** e **saturazione**: una curva a **S**, una sigmoide."},
{id:"s23", sopratitolo:"La curva · la parte alta", ...CURVA([0], 0)},
{id:"s24", sopratitolo:"La curva · sotto il 90% di saturazione, PaO₂ circa 60 mmHg", ...CURVA([0,1], 1)},
{id:"s25", tipo:"cifre", tema:"chiaro", sopratitolo:"La soglia dell'insufficienza respiratoria · da 94 a 90: sul bordo del precipizio", voci:[
  {n:"90", suf:"%", t:"saturazione", key:true}, {n:"60", suf:"mmHg", t:"PaO₂", key:true}]},

{id:"s26", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Spostamento a destra · l'emoglobina cede più facilmente l'O₂", celle:[
  {n:"↑", t:"**Temperatura**"}, {n:"↑", t:"**CO₂**"}, {n:"↓", t:"**pH**: acidosi", key:true}, {n:"↑", t:"**2,3-DPG**"}]},
{id:"s27", tipo:"frase", tema:"chiaro", sopratitolo:"Spostamento a destra",
  testo:"Succede nei **tessuti che lavorano**, come un muscolo sotto sforzo, che ha più bisogno di ossigeno."},
{id:"s28", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Spostamento a sinistra · l'emoglobina trattiene l'O₂", celle:[
  {n:"·", t:"**Ipotermia**"}, {n:"·", t:"**Alcalosi**"}, {n:"↓", t:"**CO₂**"},
  {n:"·", t:"**Monossido di carbonio**", key:true}, {n:"·", t:"**Emoglobina fetale**"}]},
{id:"s29", tipo:"frase", tema:"chiaro", sopratitolo:"Un esempio pratico",
  testo:"Ipotermia o alcalosi: l'ossigeno arriva ai tessuti con più difficoltà, **a parità di saturazione**."},

{id:"s30", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Il trasporto della CO₂ · il legame con l'equilibrio acido-base · lezione 14.1", celle:[
  {n:"1", t:"Soprattutto come **bicarbonato**", key:true}, {n:"2", t:"Legata all'**emoglobina**"}, {n:"3", t:"**Disciolta**"}]},
{id:"s31", sopratitolo:"Il controllo del respiro", ...CONTROLLO([0,1], 1)},
{id:"s32", sopratitolo:"Il controllo del respiro · i chemocettori periferici", ...CONTROLLO([0,1,2], 2)},
{id:"s33", tipo:"icone", tema:"chiaro", sopratitolo:"BPCO ipercapnico: l'eccesso di O₂ può peggiorare l'ipercapnia · lezione 8.2", voci:[
  {icona:"ingranaggio", t:"Ventilazione/perfusione", d:"il rapporto **peggiora**", key:true},
  {icona:"goccia", t:"Effetto Haldane"},
  {icona:"avviso", t:"Stimolo respiratorio", d:"in parte, si **riduce**"}]},

{id:"s34", sopratitolo:"L'insufficienza respiratoria · tipo 1", ...INSUFF([0], 0)},
{id:"s35", sopratitolo:"L'insufficienza respiratoria · tipo 2", ...INSUFF([0,1], 1)},
{id:"s36", tipo:"confronto", tema:"chiaro", sopratitolo:"Due termini da non confondere", col:[
  {h:"Ipossiemia", t:"poco ossigeno nel **sangue**"}, {h:"Ipossia", t:"poco ossigeno ai **tessuti**"}]},
{id:"s37", tipo:"trappola", tema:"chiaro", sopratitolo:"La cianosi", righe:[
  {sb:"«Niente cianosi, niente ipossiemia»", ok:"È un segno **tardivo**, e può mancare nel paziente **anemico**"}]},

{id:"s38", tipo:"icone", tema:"chiaro", sopratitolo:"Il collegamento con l'assistenza", voci:[
  {icona:"persona", t:"Seduta o semiseduta", d:"facilita il lavoro del diaframma"},
  {icona:"spunta", t:"Respirazione profonda", d:"spirometro incentivante · contro l'atelettasia · lezione 9.5", key:true}]},
{id:"s39", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"E ancora", celle:[
  {t:"**Frequenza respiratoria**: parametro sentinella", key:true}, {t:"**Target** di saturazione · lezione 8.2"},
  {t:"**Umidificazione** nelle vie aeree artificiali"}, {t:"**Bronco destro** e posizione del tubo"}]},

{id:"s40", tipo:"frase", tema:"chiaro", sopratitolo:"Il caso d'esame",
  testo:"«Post-operatorio, FR **32**, respiri superficiali, SpO₂ **92%**: perché la ventilazione è inefficace se respira velocemente?»"},
{id:"s41", tipo:"catena", tema:"chiaro", sopratitolo:"Respira tanto, ma respira male", passi:[
  {t:"Respiri **piccoli**"}, {t:"Gran parte resta nello **spazio morto**"}, {t:"Ventilazione alveolare **bassa**", key:true}]},
{id:"s42", tipo:"percorso", tema:"chiaro", sopratitolo:"Spesso la causa è il dolore · gli interventi", tappe:[
  {t:"Analgesia", d:"adeguata", key:true}, {t:"Posizione", d:"semiseduta"}, {t:"Respirazione", d:"profonda"}, {t:"Valutazione", d:"con il medico"}]},
{id:"s43", tipo:"cifre", tema:"chiaro", sopratitolo:"Il caso · la saturazione", voci:[
  {n:"92", suf:"%", t:"SpO₂", d:"vicino alla parte **ripida** della curva", key:true}]},

{id:"s44", tipo:"cifre", tema:"chiaro", sopratitolo:"I numeri della lezione", voci:[
  {n:"500", suf:"ml", t:"volume corrente", d:"circa"}, {n:"150", suf:"ml", t:"spazio morto", d:"circa"},
  {n:"0,7", suf:"", t:"FEV1/FVC", d:"sotto: **ostruzione**", key:true}, {n:"98", suf:"%", t:"O₂ legato all'Hb", d:"circa"}]},
{id:"s45", tipo:"tabella", tema:"chiaro", sopratitolo:"I numeri della lezione · i gas", colonne:["45%","55%"],
  intestazioni:["Che cosa", "Valore"], righe:[
  ["SpO₂ 90%", "≈ PaO₂ **60 mmHg**"], ["PaCO₂ normale", "**35-45** mmHg"],
  ["Insufficienza tipo 1", "PaO₂ **< 60**"], ["Insufficienza tipo 2", "PaO₂ < 60 e PaCO₂ **> 45**"]], chiave:[0]},

{id:"s46", tipo:"tabella", tema:"chiaro", sopratitolo:"La tabella · anatomia e meccanica", colonne:["38%","62%"],
  intestazioni:["Che cosa", "Da ricordare"], righe:[
  ["Bronco destro", "più **verticale**"], ["Lobi", "**3** a destra, **2** a sinistra"],
  ["Respiro", "inspirazione **attiva** (diaframma), espirazione passiva"],
  ["Surfattante", "impedisce il collasso degli alveoli"], ["Scambi", "rapporto **ventilazione/perfusione**"]], chiave:[0]},
{id:"s47", tipo:"tabella", tema:"chiaro", sopratitolo:"La tabella · curva, controllo, insufficienza", colonne:["32%","68%"],
  intestazioni:["Che cosa", "Da ricordare"], righe:[
  ["Curva sigmoide", "a **destra** cede l'O₂ · a **sinistra** lo trattiene"],
  ["Chemocettori", "**centrali** per la CO₂ · **periferici** per l'ipossia"],
  ["Insufficienza", "**tipo 1** ipossiemica · **tipo 2** ipercapnica"],
  ["Due termini", "ipossiemia ≠ ipossia"], ["Cianosi", "segno **tardivo**"]], chiave:[0]},

{id:"s48", tipo:"titolo", tema:"profondo",
  titolo:"Sotto il 90%<br>la curva **precipita**.",
  sotto:"La saturazione si sorveglia prima che cada, non dopo."},

{id:"s49", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Nella prossima lezione · perché tanti farmaci vanno adattati", celle:[
  {n:"1", t:"L'**apparato digerente**"}, {n:"2", t:"Il **fegato**"},
  {n:"3", t:"Il **rene**"}, {n:"4", t:"**Filtrazione glomerulare** e **clearance**", key:true}]},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione · 14.4",
  titolo:"Apparato digerente,<br>fegato e rene", sottotitolo:"Filtrazione glomerulare e clearance: perché tanti farmaci vanno adattati",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
