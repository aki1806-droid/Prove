// Contenuto delle 50 scene della lezione 10.4 — emergenze pediatriche e
// ostetriche. Le tre età sono una scala; le manovre di disostruzione due
// confronti (adulto e bambino, lattante); l'Apgar una tabella; le 4 T del
// post-partum una griglia, come le 4 I e 4 T della 10.3.

const ETA = (k) => [
  {n:"<1", t:"Lattante", d:"sotto un anno", key:k===0}, {n:"1+", t:"Bambino", d:"da un anno alla pubertà", key:k===1},
  {n:"A", t:"Dopo la pubertà", d:"algoritmi dell'adulto", key:k===2}];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 10 · Emergenza e area critica",
  titolo:"Emergenze pediatriche<br>e ostetriche", sottotitolo:"10.4 · PBLS, disostruzione nelle tre età, convulsioni febbrili, parto imminente",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"confronto", tema:"chiaro", sopratitolo:"Micro-lezione 4 di 8 · per questo cambia la sequenza della rianimazione", col:[
  {h:"Nell'adulto", t:"arresto spesso **cardiaco**"}, {h:"Nel bambino", t:"arresto quasi sempre **respiratorio**", key:true}]},
{id:"s03", tipo:"titolo", tema:"profondo",
  titolo:"Il bambino<br>**non è un adulto piccolo**.",
  sotto:""},
{id:"s04", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"In questa lezione", celle:[
  {n:"1", t:"Il **supporto di base** pediatrico"}, {n:"2", t:"L'**ostruzione** delle vie aeree nelle tre età", key:true},
  {n:"3", t:"Le **convulsioni febbrili**"}, {n:"4", t:"Il **parto imminente** e l'emorragia post-partum"}]},

{id:"s05", tipo:"scala", tema:"chiaro", sopratitolo:"Le età · da queste dipendono le tecniche", gradini:ETA(0)},
{id:"s06", tipo:"catena", tema:"chiaro", sopratitolo:"Nel bambino l'arresto è raramente improvviso", passi:[
  {t:"Insufficienza respiratoria o circolatoria"}, {t:"Non riconosciuta", key:true}, {t:"Arresto cardiaco"}]},
{id:"s07", tipo:"frase", tema:"chiaro", sopratitolo:"Nel supporto pediatrico",
  testo:"L'**ossigenazione** viene prima: riconoscere presto un bambino che respira male è già **rianimazione**."},

{id:"s08", tipo:"percorso", tema:"chiaro", sopratitolo:"Il PBLS · la sequenza", tappe:[
  {t:"Sicurezza", d:"coscienza, aiuto"}, {t:"Vie aeree", d:"apertura"}, {t:"Respiro", d:"≤ 10 s"}, {t:"5 ventilazioni", d:"iniziali"}, {t:"Segni di vita", d:""}], attive:[0,1,2]},
{id:"s09", tipo:"percorso", tema:"chiaro", sopratitolo:"La prima differenza: il problema è quasi sempre la mancanza di ossigeno", tappe:[
  {t:"Sicurezza", d:"coscienza, aiuto"}, {t:"Vie aeree", d:"apertura"}, {t:"Respiro", d:"≤ 10 s"}, {t:"5 ventilazioni", d:"iniziali"}, {t:"Segni di vita", d:""}], attive:[0,1,2,3]},
{id:"s10", tipo:"cifre", tema:"chiaro", sopratitolo:"Segni di vita assenti: movimenti, tosse, respiro normale · operatori sanitari", voci:[
  {n:"15", suf:"", d:"compressioni", key:true}, {n:"2", suf:"", d:"ventilazioni"}]},

{id:"s11", tipo:"confronto", tema:"chiaro", sopratitolo:"Le differenze tecniche · aprire le vie aeree", col:[
  {h:"Lattante", t:"capo **neutro**: l'iperestensione chiude la trachea, morbida", key:true}, {h:"Bambino", t:"**lieve** estensione"}]},
{id:"s12", tipo:"frase", tema:"chiaro", sopratitolo:"La ventilazione del lattante · il volume che basta a sollevare il torace",
  testo:"**Bocca-bocca-naso**: si coprono con la propria bocca sia la bocca sia il naso."},
{id:"s13", tipo:"cifre", tema:"chiaro", sopratitolo:"Almeno un terzo del diametro del torace · stessa frequenza dell'adulto", voci:[
  {n:"4", suf:"cm", d:"lattante", key:true}, {n:"5", suf:"cm", d:"bambino"}]},
{id:"s14", tipo:"confronto", tema:"chiaro", sopratitolo:"Le mani", col:[
  {h:"Lattante", t:"**due pollici** con le mani attorno al torace, se si è in due · oppure **due dita**", key:true}, {h:"Bambino", t:"**una o due mani**"}]},

{id:"s15", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Il defibrillatore si usa anche nel bambino", celle:[
  {t:"Piastre **pediatriche**", key:true}, {t:"Oppure un **attenuatore** di energia, nei più piccoli"}]},
{id:"s16", tipo:"trappola", tema:"chiaro", sopratitolo:"Piastre per adulto: una davanti e una dietro, perché non si tocchino", righe:[
  {sb:"Non defibrillare perché ci sono solo le piastre dell'adulto", ok:"Si **defibrilla** comunque"}]},

{id:"s17", tipo:"trappola", tema:"chiaro", sopratitolo:"L'ostruzione da corpo estraneo · la tosse è il meccanismo più efficace che esista", righe:[
  {sb:"Intervenire su chi tossisce bene", ok:"Tosse efficace: **incoraggiare** a tossire"}]},
{id:"s18", tipo:"cifre", tema:"chiaro", sopratitolo:"Tosse inefficace, ancora cosciente · alternati", voci:[
  {n:"5", suf:"", d:"colpi interscapolari", key:true}, {n:"5", suf:"", d:"compressioni addominali · Heimlich"}]},
{id:"s19", tipo:"frase", tema:"chiaro", sopratitolo:"Se perde coscienza · a terra, 118, rianimazione",
  testo:"Le **compressioni toraciche** possono espellere il corpo estraneo."},
{id:"s20", tipo:"confronto", tema:"chiaro", sopratitolo:"Il principio non cambia: colpi e compressioni alternati", col:[
  {h:"Di regola", t:"compressioni **addominali**"}, {h:"Obesi, gravidanza avanzata", t:"compressioni **toraciche**", key:true}]},

{id:"s21", tipo:"confronto", tema:"chiaro", sopratitolo:"Il lattante · sostenendo la testa", col:[
  {h:"Pancia in giù", t:"sull'avambraccio, testa in basso · **5 colpi dorsali**", key:true}, {h:"Pancia in su", t:"5 compressioni toraciche"}]},
{id:"s22", tipo:"confronto", tema:"chiaro", sopratitolo:"Si alterna, finché il corpo estraneo non esce", col:[
  {h:"Pancia in giù", t:"5 colpi dorsali"}, {h:"Pancia in su", t:"**5 compressioni toraciche**, con due dita", key:true}]},
{id:"s23", tipo:"titolo", tema:"profondo",
  titolo:"Mai compressioni addominali<br>**nel lattante**.",
  sotto:""},
{id:"s24", tipo:"trappola", tema:"chiaro", sopratitolo:"Fegato e milza sono esposti e si lesionano facilmente", righe:[
  {sb:"Esplorare la bocca alla cieca", ok:"Si rischia di spingere il corpo estraneo **più in fondo**"}]},

{id:"s25", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Le convulsioni febbrili · circa da 6 mesi a 5 anni", celle:[
  {t:"Con la **febbre**"}, {t:"Generalizzate, di solito **brevi**"}, {t:"Per lo più **benigne**", key:true}]},
{id:"s26", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Durante la crisi · lezione 8.6 · oltre 5 minuti, benzodiazepina", celle:[
  {t:"**Proteggere**"}, {t:"**Niente in bocca**", key:true}, {t:"Posizione **laterale**"}, {t:"**Cronometrare**"}]},
{id:"s27", tipo:"confronto", tema:"chiaro", sopratitolo:"Oltre 5 minuti · secondo protocollo · gli antipiretici non prevengono le recidive", col:[
  {h:"Midazolam", t:"per via **buccale**"}, {h:"Diazepam", t:"per via **rettale**"}]},

{id:"s28", tipo:"confronto", tema:"chiaro", sopratitolo:"I segni di gravità nel bambino", col:[
  {h:"Respiratori", t:"**rientramenti**, alitamento delle pinne nasali, **gemito**, tachipnea", key:true}, {h:"Circolatori", t:"tachicardia, riempimento lento, cute marezzata"}]},
{id:"s29", tipo:"frase", tema:"chiaro", sopratitolo:"Neurologici · sonnolenza, irritabilità",
  testo:"Un bambino che **non riconosce i genitori**."},
{id:"s30", tipo:"confronto", tema:"chiaro", sopratitolo:"Due avvertenze · il bambino compensa a lungo", col:[
  {h:"Bradicardia", t:"segno **pre-terminale**: ipossia gravissima", key:true}, {h:"Ipotensione", t:"compare **tardi**"}]},

{id:"s31", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Il parto imminente · in cenni · i segni", celle:[
  {n:"1", t:"**Contrazioni** ravvicinate e intense"}, {n:"2", t:"Bisogno **irresistibile di spingere**", key:true}, {n:"3", t:"Rottura delle membrane"}, {n:"4", t:"**Testa visibile** al perineo"}]},
{id:"s32", tipo:"trappola", tema:"chiaro", sopratitolo:"Si chiama aiuto: 118, ostetrica · non si ostacola il parto", righe:[
  {sb:"Trasportare la donna a parto in corso", ok:"È più sicuro **assisterlo dove si è**"}]},

{id:"s33", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"L'assistenza", celle:[
  {t:"Sostenere la testa **senza tirare**", key:true}, {t:"Cordone attorno al collo, lento: **sfilarlo sopra la testa**"}]},
{id:"s34", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"Appena nato · l'ipotermia è il pericolo principale · poi pelle a pelle", celle:[
  {t:"**Asciugare**"}, {t:"**Stimolare**"}, {t:"**Riscaldare**", key:true}]},
{id:"s35", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"Poi", celle:[
  {t:"Clampaggio **dopo almeno 1 minuto**"}, {t:"Annotare l'**ora**"}, {t:"**Non tirare il cordone**: la placenta esce da sola", key:true}]},

{id:"s36", tipo:"scala", tema:"chiaro", sopratitolo:"Il punteggio di Apgar · a 1 e a 5 minuti", gradini:[
  {n:"A", t:"Aspetto", d:"colorito"}, {n:"P", t:"Polso", d:"frequenza cardiaca", key:true}, {n:"G", t:"Grimace", d:"risposta riflessa"}, {n:"A", t:"Attività", d:"tono"}, {n:"R", t:"Respirazione"}]},
{id:"s37", tipo:"cifre", tema:"chiaro", sopratitolo:"Da 0 a 2 punti ciascuno, totale da 0 a 10 · sotto, il neonato ha bisogno di assistenza", voci:[
  {n:"7-10", suf:"", d:"normale", key:true}]},

{id:"s38", tipo:"catena", tema:"chiaro", sopratitolo:"L'emorragia post-partum · la complicanza ostetrica più temuta · la causa più frequente", passi:[
  {t:"Atonia uterina", key:true}, {t:"L'utero non si contrae"}, {t:"La sede placentare sanguina"}]},
{id:"s39", tipo:"griglia", tema:"chiaro", colonne:4, spunta:false, sopratitolo:"Le quattro T", celle:[
  {n:"T", t:"**Tono**", key:true}, {n:"T", t:"**Trauma**"}, {n:"T", t:"**Tessuto**: residui placentari"}, {n:"T", t:"**Trombina**: coagulazione"}]},
{id:"s40", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Gli interventi immediati", celle:[
  {t:"**Massaggio del fondo uterino**", key:true}, {t:"Chiamare **aiuto**"}, {t:"Accessi venosi"}, {t:"**Uterotonici** secondo prescrizione"}]},

{id:"s41", tipo:"frase", tema:"chiaro", sopratitolo:"Il caso · lattante di 8 mesi, stava mangiando",
  testo:"Non riesce a **piangere** né a **tossire**, diventa **cianotico**, ma è **cosciente**. Che cosa fai?"},
{id:"s42", tipo:"percorso", tema:"chiaro", sopratitolo:"Ostruzione completa, tosse inefficace", tappe:[
  {t:"118", d:"qualcuno chiama"}, {t:"Pancia in giù", d:"5 colpi dorsali"}, {t:"Pancia in su", d:"5 compressioni toraciche"}, {t:"Si alterna", d:""}], attive:[0,1]},
{id:"s43", tipo:"percorso", tema:"chiaro", sopratitolo:"Se perde coscienza: rianimazione con le 5 ventilazioni iniziali · mai compressioni addominali", tappe:[
  {t:"118", d:"qualcuno chiama"}, {t:"Pancia in giù", d:"5 colpi dorsali"}, {t:"Pancia in su", d:"5 compressioni toraciche"}, {t:"Si alterna", d:""}], attive:[0,1,2,3]},

{id:"s44", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"In Veneto · una rete", celle:[
  {n:"1", t:"I **punti nascita**"}, {n:"2", t:"Il **trasporto neonatale** d'emergenza"}, {n:"3", t:"La formazione **PBLSD**", key:true}]},
{id:"s45", tipo:"frase", tema:"chiaro", sopratitolo:"I primi minuti, a casa, sono nelle loro mani",
  testo:"**Corsi di disostruzione** per i genitori: educazione alla salute con un impatto diretto."},

{id:"s46", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"La tabella", celle:[
  {n:"<1", t:"Lattante **sotto un anno** · capo **neutro**"}, {n:"5", t:"**Ventilazioni iniziali**, poi **15:2**", key:true}, {n:"⅓", t:"Compressioni a **un terzo** del torace"}]},
{id:"s47", tipo:"tabella", tema:"chiaro", sopratitolo:"La tabella", intestazioni:["Situazione","Che cosa si fa"], colonne:[1,2], righe:[
  ["Tosse efficace","**incoraggiare**"],
  ["Tosse inefficace","**5 colpi + 5 compressioni** · **toraciche** nel lattante"],
  ["Convulsione oltre 5 min","**benzodiazepina**"],
  ["Neonato","**Apgar** a 1 e a 5 minuti"]]},
{id:"s48", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Dopo il parto, se sanguina · le quattro T: tono, trauma, tessuto, trombina", celle:[
  {n:"!", t:"**Massaggio del fondo uterino**", key:true}, {n:"+", t:"Aiuto, accessi venosi, uterotonici"}]},
{id:"s49", tipo:"frase", tema:"chiaro", sopratitolo:"Nella prossima lezione · restiamo sulle vie aeree, nell'adulto critico",
  testo:"I presidi, l'**intubazione**, la **ventilazione meccanica**, la sicurezza del paziente ventilato."},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"10.5<br>Vie aeree<br>e ventilazione", sottotitolo:"Presidi, intubazione, ventilazione meccanica",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
