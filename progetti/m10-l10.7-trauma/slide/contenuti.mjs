// Contenuto delle 50 scene della lezione 10.7 — trauma, ustioni,
// intossicazioni e maxi-emergenze. XABCDE è una scala che parte dalla X;
// la regola del nove una tabella; Parkland cifre e un esempio; gli antidoti
// una tabella; lo START un percorso di domande che si accende passo passo.

const XABCDE = (k) => [
  {n:"X", t:"Emorragia massiva", key:k===0}, {n:"A", t:"Vie aeree + rachide", key:k===1}, {n:"B", t:"Respiro"},
  {n:"C", t:"Circolo"}, {n:"D", t:"Neurologico"}, {n:"E", t:"Esposizione"}];

const START = [
  {t:"Cammina?", d:"sì: verde"}, {t:"Respira?", d:"no dopo apertura: nero"}, {t:"FR > 30?", d:"rosso"},
  {t:"Refill > 2 s?", d:"rosso"}, {t:"Esegue ordini?", d:"no: rosso · sì: giallo"}];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 10 · Emergenza e area critica",
  titolo:"Trauma, ustioni,<br>intossicazioni", sottotitolo:"10.7 · E le maxi-emergenze: XABCDE, regola del nove, Parkland, antidoti, START",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Micro-lezione 7 di 8 · quattro scenari, ciascuno con la sua domanda d'esame", celle:[
  {n:"1", t:"**Trauma**: emorragia e rachide", key:true}, {n:"2", t:"**Ustioni**: regola del nove, Parkland", key:true}, {n:"3", t:"Intossicazioni"}, {n:"4", t:"Maxi-emergenze"}]},
{id:"s03", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Una lezione densa, che si regge sempre sull'ABCDE", celle:[
  {n:"1", t:"Trauma"}, {n:"2", t:"Ustioni"}, {n:"3", t:"**Intossicazioni**: gli antidoti", key:true}, {n:"4", t:"**Maxi-emergenze**: il triage START", key:true}]},

{id:"s04", tipo:"scala", tema:"chiaro", sopratitolo:"Il trauma · davanti alla A, una X: uccide più in fretta delle vie aeree", gradini:XABCDE(0)},
{id:"s05", tipo:"scala", tema:"chiaro", sopratitolo:"Il rachide protetto dal primo contatto, finché una lesione non è esclusa · poi la valutazione secondaria", gradini:XABCDE(1)},
{id:"s06", tipo:"confronto", tema:"chiaro", sopratitolo:"Il tempo conta · lezione 10.1", col:[
  {h:"Golden hour", t:"la **prima ora** dopo il trauma"}, {h:"Il paziente grave", t:"**centralizzato** al centro traumatologico", key:true}]},

{id:"s07", tipo:"percorso", tema:"chiaro", sopratitolo:"Il controllo dell'emorragia", tappe:[
  {t:"Compressione diretta", d:"forte e continua"}, {t:"Medicazioni emostatiche", d:"se previste"}, {t:"Tourniquet", d:"arti, non controllabile"}], attive:[0,1]},
{id:"s08", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Il tourniquet · emorragie degli arti non controllabili", celle:[
  {t:"**A monte** della ferita"}, {t:"Stretto **fino all'arresto** del sanguinamento", key:true}]},
{id:"s09", tipo:"trappola", tema:"chiaro", sopratitolo:"Annotare l'orario di applicazione: un'informazione vitale per chi lo riceve", righe:[
  {sb:"Allentarlo per controllare", ok:"Si perde sangue e passano in circolo **sostanze tossiche**"}]},

{id:"s10", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"L'immobilizzazione · quando sospettare una lesione del rachide", celle:[
  {t:"Ogni **trauma importante**", key:true}, {t:"Paziente **incosciente**"}, {t:"Dolore al collo, **deficit neurologici**"}]},
{id:"s11", tipo:"percorso", tema:"chiaro", sopratitolo:"Il log roll è coordinato da chi tiene la testa", tappe:[
  {t:"Capo in asse", d:"a mano"}, {t:"Collare", d:"cervicale"}, {t:"Tavola o materasso", d:"a depressione"}, {t:"In blocco", d:"log roll"}], attive:[0,1,2,3]},
{id:"s12", tipo:"catena", tema:"chiaro", sopratitolo:"Un danno che il trauma non aveva fatto, e che fa il soccorso", passi:[
  {t:"Lesione instabile del rachide"}, {t:"Mobilizzata male", key:true}, {t:"Lesione midollare"}]},

{id:"s13", tipo:"scala", tema:"chiaro", sopratitolo:"Le ustioni · la profondità", gradini:[
  {n:"1°", t:"Superficiale", d:"eritema, dolore"}, {n:"2°", t:"Spessore parziale", d:"flittene, dolore intenso", key:true}, {n:"3°", t:"Spessore totale"}]},
{id:"s14", tipo:"scala", tema:"chiaro", sopratitolo:"Bianca, cerea o carbonizzata, rigida · le terminazioni nervose sono distrutte", gradini:[
  {n:"1°", t:"Superficiale", d:"eritema, dolore"}, {n:"2°", t:"Spessore parziale", d:"flittene, dolore intenso"}, {n:"3°", t:"Spessore totale", d:"INDOLORE", key:true}]},
{id:"s15", tipo:"titolo", tema:"profondo",
  titolo:"Un'ustione che non fa male<br>**può essere la più grave**.",
  sotto:""},

{id:"s16", tipo:"tabella", tema:"chiaro", sopratitolo:"La regola del nove, di Wallace · aree che valgono 9 o multipli di 9", intestazioni:["Area","%"], colonne:[3,1], righe:[
  ["Testa e collo","**9**"], ["Ciascun arto superiore","**9**"], ["Tronco anteriore","18"], ["Tronco posteriore","18"]]},
{id:"s17", tipo:"tabella", tema:"chiaro", sopratitolo:"In totale, cento", intestazioni:["Area","%"], colonne:[3,1], righe:[
  ["Testa e collo · ciascun arto superiore","9"], ["Tronco anteriore · tronco posteriore","**18 + 18**"], ["Ciascun arto inferiore","**18**"], ["Perineo","**1**"]]},
{id:"s18", tipo:"cifre", tema:"chiaro", sopratitolo:"Il palmo della persona, dita comprese · nel bambino, tabelle specifiche · solo 2° e 3° grado", voci:[
  {n:"1", suf:"%", d:"un palmo", key:true}]},

{id:"s19", tipo:"frase", tema:"chiaro", sopratitolo:"La formula di Parkland · le prime 24 ore · cristalloidi, Ringer lattato",
  testo:"**4 ml** × **peso** in kg × **% ustionata**"},
{id:"s20", tipo:"confronto", tema:"chiaro", sopratitolo:"Dal momento dell'ustione, non dall'arrivo in ospedale", col:[
  {h:"Prime 8 ore", t:"**metà**", key:true}, {h:"16 ore successive", t:"l'altra metà"}]},
{id:"s21", tipo:"cifre", tema:"chiaro", sopratitolo:"La diuresi, nell'adulto · la formula è il punto di partenza, la diuresi dice se basta", voci:[
  {n:"0,5", suf:"ml/kg/h", d:"obiettivo indicativo", key:true}]},
{id:"s22", tipo:"cifre", tema:"chiaro", sopratitolo:"Un esempio · 70 kg, 30% · 4 × 70 × 30", voci:[
  {n:"8.400", suf:"ml", d:"in 24 ore"}, {n:"4.200", suf:"ml", d:"nelle prime 8 ore", key:true}]},

{id:"s23", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Il primo soccorso · copertura pulita, prevenire l'ipotermia", celle:[
  {t:"Acqua corrente **tiepida**, circa **20 minuti**", key:true}, {t:"**Mai ghiaccio**"}, {t:"Via **anelli** e indumenti non adesi, prima dell'edema"}]},
{id:"s24", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"L'ustione delle vie aeree · si gonfiano in poco tempo: intubazione precoce", celle:[
  {n:"!", t:"Volto ustionato, peli del naso bruciati"}, {n:"!", t:"**Fuliggine** in bocca", key:true}, {n:"!", t:"**Voce rauca**, stridore"}]},
{id:"s25", tipo:"trappola", tema:"chiaro", sopratitolo:"Incendio in ambiente chiuso · il monossido · lezione 8.2", righe:[
  {sb:"Saturazione normale: tutto bene", ok:"Il monossido dà una saturazione **falsamente normale**"}]},

{id:"s26", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Le intossicazioni · prima l'ABCDE · conservare contenitori e campioni", celle:[
  {n:"?", t:"**Quale** sostanza"}, {n:"?", t:"**Quanta**"}, {n:"?", t:"A che **ora**", key:true}, {n:"?", t:"Per quale **via**"}]},
{id:"s27", tipo:"percorso", tema:"chiaro", sopratitolo:"Se l'antidoto non c'è, contano il supporto delle funzioni vitali e il tempo", tappe:[
  {t:"Centro Antiveleni", d:""}, {t:"Decontaminare", d:"secondo indicazione"}, {t:"Antidoto", d:"quando esiste"}], attive:[0,1,2]},

{id:"s28", tipo:"tabella", tema:"chiaro", sopratitolo:"Gli antidoti", intestazioni:["Sostanza","Antidoto"], colonne:[1,2], righe:[
  ["Oppioidi","**naloxone**"], ["Benzodiazepine","**flumazenil**, con cautela: convulsioni nei consumatori cronici"], ["Paracetamolo","**N-acetilcisteina**, prima è meglio"]]},
{id:"s29", tipo:"tabella", tema:"chiaro", sopratitolo:"Gli antidoti", intestazioni:["Sostanza","Antidoto"], colonne:[1,2], righe:[
  ["Monossido di carbonio","**ossigeno 100%**, iperbarica"], ["Dicumarolici","**vitamina K**"], ["Organofosfati","**atropina**"]]},
{id:"s30", tipo:"tabella", tema:"chiaro", sopratitolo:"All'orale si chiede spesso la coppia veleno e antidoto", intestazioni:["Sostanza","Antidoto"], colonne:[1,2], righe:[
  ["Digossina","anticorpi specifici"], ["Beta-bloccanti","**glucagone**"], ["Metanolo, glicole etilenico","**fomepizolo**"]]},

{id:"s31", tipo:"frase", tema:"chiaro", sopratitolo:"L'ipotermia · sotto 35 °C · riscaldare gradualmente, muovere con delicatezza: il cuore freddo fibrilla",
  testo:"Nessuno è morto finché non è **caldo e morto**."},
{id:"s32", tipo:"confronto", tema:"chiaro", sopratitolo:"Il colpo di calore · a rischio anziani e lavoratori esposti", col:[
  {h:"Non è", t:"un semplice malore da caldo"}, {h:"È", t:"ipertermia con **alterazione neurologica**: raffreddamento **rapido**", key:true}]},

{id:"s33", tipo:"norma", tema:"chiaro", etichetta:"Piano di Emergenza Interno per il Massiccio Afflusso di Feriti", sigla:"PEIMAF",
  testo:"Catena di **comando**, ruoli predefiniti, aree dedicate."},
{id:"s34", tipo:"confronto", tema:"chiaro", sopratitolo:"Cambia il principio · un cambio di prospettiva etica da saper spiegare", col:[
  {h:"Di solito", t:"tutto il possibile per ciascuno"}, {h:"Nella maxi-emergenza", t:"il risultato migliore per il **numero più grande**", key:true}]},
{id:"s35", tipo:"titolo", tema:"profondo",
  titolo:"Il maggior beneficio,<br>**per il maggior numero**.",
  sotto:""},

{id:"s36", tipo:"percorso", tema:"chiaro", sopratitolo:"Il triage START · Simple Triage And Rapid Treatment · meno di un minuto", tappe:START, attive:[0]},
{id:"s37", tipo:"percorso", tema:"chiaro", sopratitolo:"Riprende a respirare dopo l'apertura delle vie aeree: rosso", tappe:START, attive:[0,1]},
{id:"s38", tipo:"percorso", tema:"chiaro", sopratitolo:"Oppure polso radiale assente: rosso", tappe:START, attive:[0,1,2,3,4]},
{id:"s39", tipo:"cifre", tema:"chiaro", sopratitolo:"Per ricordarlo · respiro, riempimento, ordini eseguiti", voci:[
  {n:"30", suf:"", d:"respiro"}, {n:"2", suf:"", d:"secondi di refill"}, {n:"can", suf:"do", d:"esegue ordini", key:true}]},

{id:"s40", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"I colori", celle:[
  {n:"R", t:"**Rosso**: priorità immediata", key:true}, {n:"G", t:"**Giallo**: differibile"}, {n:"V", t:"**Verde**: lesioni minori, cammina"}, {n:"N", t:"**Nero**: deceduto o non salvabile con le risorse del momento"}]},
{id:"s41", tipo:"trappola", tema:"chiaro", sopratitolo:"Solo manovre salvavita rapide: aprire le vie aeree, fermare un'emorragia · poi la vittima successiva", righe:[
  {sb:"Un triage solo all'inizio", ok:"Il triage **si ripete**: le condizioni cambiano"}]},

{id:"s42", tipo:"cifre", tema:"chiaro", sopratitolo:"Il caso · maxi-emergenza · non cammina · risponde alle domande · che colore?", voci:[
  {n:"34", suf:"/min", d:"respiro", key:true}, {n:"3", suf:"s", d:"riempimento capillare"}]},
{id:"s43", tipo:"percorso", tema:"chiaro", sopratitolo:"Respira, ma oltre 30: rosso · ci si ferma al primo criterio · il refill non cambia nulla", tappe:START, attive:[0,1,2]},

{id:"s44", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"In Veneto", celle:[
  {t:"Trauma grave: rete **hub e spoke**", key:true}, {t:"**PEIMAF** in ogni ospedale, con esercitazioni"}]},
{id:"s45", tipo:"frase", tema:"chiaro", sopratitolo:"Centri antiveleni, centri ustioni, SUEM 118 · per trauma e maxi-emergenze",
  testo:"La parola chiave è ancora una volta: **rete**."},

{id:"s46", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"La tabella", celle:[
  {n:"X", t:"**XABCDE**: prima l'emorragia massiva", key:true}, {n:"T", t:"**Tourniquet**: annotare l'ora, non allentare"}, {n:"R", t:"**Rachide**: collare, movimento in blocco"}, {n:"3°", t:"Il terzo grado è **indolore**"}]},
{id:"s47", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"La tabella", celle:[
  {n:"9", t:"Regola del **nove** · palmo = **1%**"}, {n:"P", t:"**Parkland**: 4 × kg × %, metà in 8 ore **dall'ustione**", key:true}, {n:"~", t:"Acqua **tiepida**, niente ghiaccio"}, {n:"S", t:"**START**: 30, 2, can do"}]},
{id:"s48", tipo:"percorso", tema:"chiaro", sopratitolo:"Nella prossima lezione · gli algoritmi da memorizzare", tappe:[
  {t:"ABCDE", d:""}, {t:"Rianimazione", d:""}, {t:"Sepsi", d:""}, {t:"START", d:""}], attive:[0,1,2,3]},
{id:"s49", tipo:"frase", tema:"chiaro", sopratitolo:"All'esame e in reparto",
  testo:"Il modulo in cui sapere la **sequenza a memoria** fa davvero la differenza."},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"10.8<br>Riepilogo<br>del Modulo 10", sottotitolo:"Gli algoritmi da memorizzare e l'autovalutazione",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
