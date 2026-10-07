// Contenuto delle 50 scene della lezione 14.1 — cellula, tessuti e omeostasi.
// I livelli di organizzazione sono una scala; gli organelli una raggiera intorno
// alla cellula; le quattro cause di edema un «tre» a quattro caselle che si
// accende causa per causa e torna nel caso d'esame; i tre sistemi dell'equilibrio
// acido-base una linea del tempo, dai secondi ai giorni.

const CAUSE = (att, k) => ({tipo:"tre", tema:"chiaro", box:[
  {n:"1", t:"↑ Pressione idrostatica", d:"scompenso cardiaco · trombosi venosa", key:k===0},
  {n:"2", t:"↓ Pressione oncotica", d:"**ipoalbuminemia**: malnutrizione, cirrosi, sindrome nefrosica", key:k===1},
  {n:"3", t:"↑ Permeabilità capillare", d:"infiammazione · sepsi · ustioni", key:k===2},
  {n:"4", t:"Ostacolo linfatico", d:"il **linfedema**", key:k===3}], attive:att});

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 14 · Basi biomediche e semeiotica",
  titolo:"Cellula, tessuti<br>e omeostasi", sottotitolo:"14.1 · Organizzazione del corpo, membrana, liquidi, equilibrio acido-base, feedback",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"tre", tema:"chiaro", sopratitolo:"Micro-lezione 1 di 8 · le basi scientifiche dell'assistenza", box:[
  {n:"1", t:"Anatomia"}, {n:"2", t:"Fisiologia"}, {n:"3", t:"Fisiopatologia", d:"collegate a ciò che hai già studiato", key:true}]},
{id:"s03", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Le fondamenta · ogni gesto ha una ragione biologica", celle:[
  {n:"1", t:"L'**organizzazione** del corpo"}, {n:"2", t:"La **cellula**"},
  {n:"3", t:"I **liquidi**"}, {n:"4", t:"L'**equilibrio** che li governa"}]},

{id:"s04", tipo:"scala", tema:"chiaro", sopratitolo:"Il corpo è organizzato in livelli", gradini:[
  {t:"Molecole"}, {t:"Cellule", key:true}, {t:"Tessuti"}, {t:"Organi"}, {t:"Apparati e sistemi"}, {t:"Organismo"}]},
{id:"s05", tipo:"confronto", tema:"chiaro", sopratitolo:"I quattro tessuti fondamentali · i primi due", col:[
  {h:"Epiteliale", t:"**riveste e secerne** · cute, mucose, ghiandole"},
  {h:"Connettivo", t:"**sostiene e collega** · osso, cartilagine, sangue, tessuto adiposo"}]},
{id:"s06", tipo:"tre", tema:"chiaro", sopratitolo:"I quattro tessuti fondamentali", box:[
  {n:"1", t:"Epiteliale"}, {n:"2", t:"Connettivo"},
  {n:"3", t:"Muscolare", d:"**scheletrico**, **cardiaco**, **liscio**", key:true}, {n:"4", t:"Nervoso"}]},

{id:"s07", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"La posizione anatomica · il riferimento di tutti i termini", celle:[
  {t:"In **piedi**"}, {t:"Sguardo **in avanti**"},
  {t:"Braccia **lungo i fianchi**"}, {t:"Palmi rivolti **in avanti**"}]},
{id:"s08", tipo:"tre", tema:"chiaro", sopratitolo:"I piani anatomici", box:[
  {n:"1", t:"Sagittale", d:"**destra** e **sinistra** · mediano se a metà"},
  {n:"2", t:"Frontale", d:"o coronale · **anteriore** e **posteriore**"},
  {n:"3", t:"Trasversale", d:"o assiale · **superiore** e **inferiore** · le immagini della TC", key:true}]},
{id:"s09", tipo:"tabella", tema:"chiaro", sopratitolo:"I termini vanno a coppie · prossimale e distale: rispetto alla radice dell'arto",
  colonne:["50%","50%"], intestazioni:["Termine", "Il suo opposto"], righe:[
  ["**Prossimale**", "**Distale**"], ["Mediale", "Laterale"], ["Craniale", "Caudale"],
  ["Anteriore (ventrale)", "Posteriore (dorsale)"], ["Superficiale", "Profondo"]], chiave:[0]},
{id:"s10", tipo:"trappola", tema:"chiaro", sopratitolo:"La precisione dei termini è precisione della documentazione", righe:[
  {sb:"«Lesione sulla caviglia»", ok:"«Lesione sul **malleolo laterale destro**»"}]},

{id:"s11", tipo:"icone", tema:"chiaro", sopratitolo:"La cellula, unità fondamentale della vita · la membrana plasmatica", voci:[
  {icona:"cellula", t:"Doppio strato", d:"di **fosfolipidi**"},
  {icona:"ingranaggio", t:"Proteine", d:"inserite nella membrana"},
  {icona:"lucchetto", t:"Permeabilità selettiva", d:"decide che cosa entra e che cosa esce", key:true}]},
{id:"s12", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"All'interno della cellula", celle:[
  {n:"1", t:"**Nucleo** · il DNA"}, {n:"2", t:"**Mitocondri** · energia, ATP"}, {n:"3", t:"**Ribosomi** · sintesi proteica"},
  {n:"4", t:"**Reticolo** endoplasmatico"}, {n:"5", t:"Apparato del **Golgi**"}, {n:"6", t:"**Lisosomi**"}]},

{id:"s13", tipo:"confronto", tema:"chiaro", sopratitolo:"I trasporti di membrana", col:[
  {h:"Passivi", t:"**senza energia** · secondo gradiente di concentrazione"},
  {h:"Attivi", t:"consumano **ATP** · contro gradiente"}]},
{id:"s14", tipo:"tre", tema:"chiaro", sopratitolo:"I trasporti passivi", box:[
  {n:"1", t:"Diffusione semplice", d:"O₂ e CO₂ negli alveoli"},
  {n:"2", t:"Diffusione facilitata", d:"con **trasportatori** · il glucosio"},
  {n:"3", t:"Osmosi", d:"per l'**acqua**", key:true}]},
{id:"s15", tipo:"cifre", tema:"chiaro", sopratitolo:"Trasporto attivo · la pompa sodio-potassio consuma ATP", voci:[
  {n:"3", suf:"Na⁺", t:"fuori dalla cellula", key:true}, {n:"2", suf:"K⁺", t:"dentro la cellula"}],},
{id:"s16", tipo:"confronto", tema:"chiaro", sopratitolo:"L'effetto della pompa sodio-potassio", col:[
  {h:"Extracellulare", t:"il **sodio** · Na⁺", grande:true}, {h:"Intracellulare", t:"il **potassio** · K⁺", grande:true}]},

{id:"s17", tipo:"frase", tema:"chiaro", sopratitolo:"L'osmosi · attraverso una membrana semipermeabile",
  testo:"L'acqua passa dalla soluzione **meno concentrata** a quella **più concentrata**.", sotto:"Come se volesse diluirla."},
{id:"s18", tipo:"norma", tema:"chiaro", etichetta:"Soluzione isotonica · la fisiologica", sigla:"NaCl 0,9%",
  testo:"**Nessuno spostamento** di acqua."},
{id:"s19", tipo:"confronto", tema:"chiaro", sopratitolo:"La tonicità", col:[
  {h:"Ipotonica", t:"l'acqua **entra** · la cellula si **gonfia**"},
  {h:"Ipertonica", t:"l'acqua **esce** · la cellula si **raggrinzisce**"}]},
{id:"s20", tipo:"trappola", tema:"chiaro", sopratitolo:"Lezione 6.3 · il paziente con edema cerebrale", righe:[
  {sb:"Soluzioni ipotoniche", ok:"**Pericolose** · lo riducono il **mannitolo** o la salina **ipertonica**"}]},

{id:"s21", tipo:"cifre", tema:"chiaro", sopratitolo:"L'acqua corporea totale · più nel neonato, meno nell'anziano e nella donna", voci:[
  {n:"60", suf:"%", t:"del peso corporeo", d:"circa, nell'**adulto**", key:true}]},
{id:"s22", tipo:"confronto", tema:"chiaro", sopratitolo:"Si disidratano facilmente, ma in modi diversi", col:[
  {h:"Neonato", t:"**più** acqua"}, {h:"Anziano", t:"**meno** acqua · più tessuto adiposo"}],
  sotto:"Una diversa **riserva idrica**"},
{id:"s23", tipo:"cifre", tema:"chiaro", sopratitolo:"I compartimenti idrici", voci:[
  {n:"2/3", t:"intracellulare", d:"circa il 40% del peso", key:true}, {n:"1/3", t:"extracellulare", d:"circa il 20%"},
  {n:"3/4", t:"interstiziale", d:"dell'extracellulare"}, {n:"1/4", t:"plasma", d:"dell'extracellulare"}]},

{id:"s24", tipo:"confronto", tema:"chiaro", sopratitolo:"Le forze di Starling · gli scambi nei capillari", col:[
  {h:"Pressione idrostatica", t:"spinge il liquido **fuori** dal vaso"},
  {h:"Pressione oncotica", t:"dovuta all'**albumina** · lo richiama **dentro**"}]},
{id:"s25", sopratitolo:"L'edema · quando l'equilibrio si rompe", ...CAUSE([0], 0)},
{id:"s26", sopratitolo:"L'edema · la seconda causa", ...CAUSE([0,1], 1)},
{id:"s27", sopratitolo:"L'edema · le quattro cause", ...CAUSE([0,1,2,3], 3)},
{id:"s28", tipo:"raggiera", tema:"chiaro", sopratitolo:"Davanti a un edema: quale causa agisce?", centro:"Edema",
  raggi:[{t:"Idrostatica"},{t:"Oncotica"},{t:"Permeabilità"},{t:"Linfatico"}]},

{id:"s29", tipo:"catena", tema:"chiaro", sopratitolo:"La regolazione dell'acqua", passi:[
  {t:"La **sete**"}, {t:"L'**ADH**", d:"dall'ipotalamo, liberato dall'ipofisi posteriore"},
  {t:"Riassorbimento di **acqua** nel rene", key:true}]},
{id:"s30", tipo:"catena", tema:"chiaro", sopratitolo:"Il sistema renina-angiotensina-aldosterone", passi:[
  {t:"Renina"}, {t:"Angiotensina"},
  {t:"**Aldosterone**", d:"dal surrene · riassorbe **sodio**, elimina **potassio**", key:true}]},
{id:"s31", tipo:"norma", tema:"chiaro", etichetta:"Peptide natriuretico · dal cuore disteso", sigla:"BNP",
  testo:"Elimina **sodio** e **acqua** · si dosa nello **scompenso**."},

{id:"s32", tipo:"cifre", tema:"chiaro", sopratitolo:"L'equilibrio acido-base · tre sistemi lo difendono", voci:[
  {n:"7,35–7,45", t:"il pH del sangue", d:"un intervallo **stretto**", key:true}]},
{id:"s33", tipo:"timeline", tema:"chiaro", sopratitolo:"Tre sistemi, tre tempi", tappe:[
  {anno:"Secondi", et:"**Tamponi** · bicarbonato, proteine, emoglobina"},
  {anno:"Minuti", et:"**Polmone** · elimina CO₂"},
  {anno:"Ore o giorni", et:"**Rene** · elimina H⁺, riassorbe HCO₃⁻", key:true}]},
{id:"s34", tipo:"confronto", tema:"chiaro", sopratitolo:"Le due componenti", col:[
  {h:"CO₂", t:"componente **respiratoria**", grande:true}, {h:"HCO₃⁻", t:"componente **metabolica**", grande:true}],
  sotto:"Lezione 6.4 · l'emogas: il **compenso** di un sistema corregge l'altro"},

{id:"s35", tipo:"ciclo", tema:"chiaro", sopratitolo:"L'omeostasi · il feedback negativo", centro:"Omeostasi", passi:[
  {t:"Variazione"}, {t:"Risposta", d:"la contrasta", key:true}, {t:"Condizioni stabili"}]},
{id:"s36", tipo:"icone", tema:"chiaro", sopratitolo:"Feedback negativo · gli esempi", voci:[
  {icona:"zucchero", t:"Glicemia", d:"sale → insulina → scende", key:true},
  {icona:"termometro", t:"Temperatura", d:"sale → si suda"},
  {icona:"cuore", t:"Pressione arteriosa"}]},
{id:"s37", tipo:"catena", tema:"chiaro", sopratitolo:"Il feedback positivo", passi:[
  {t:"Variazione"}, {t:"La risposta la **amplifica**"},
  {t:"**Evento finale**", d:"parto con ossitocina · coagulazione", key:true}]},
{id:"s38", tipo:"frase", tema:"chiaro", sopratitolo:"In molti casi",
  testo:"La malattia è un'omeostasi che **non riesce più a compensare**."},

{id:"s39", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Il collegamento con l'assistenza", celle:[
  {t:"**Bilancio idrico** e peso · lezione 3.5"}, {t:"**Soluzioni** infusionali · lezione 6.3"},
  {t:"**Edema** e posizionamento"}, {t:"**Emogas** · lezione 6.4"}]},
{id:"s40", tipo:"trappola", tema:"chiaro", sopratitolo:"Un esempio che ora si spiega da solo", righe:[
  {sb:"Potassio alto in un campione emolizzato", ok:"**Falsamente** alto: i globuli rossi rotti liberano il potassio **intracellulare**"}]},

{id:"s41", tipo:"frase", tema:"chiaro", sopratitolo:"Il caso d'esame",
  testo:"«Paziente **cirrotico**, albumina **2,1 g/dl**, edemi declivi importanti: qual è il meccanismo dell'edema?»"},
{id:"s42", sopratitolo:"Il caso · il fegato malato produce poca albumina", ...CAUSE([1], 1)},
{id:"s43", tipo:"catena", tema:"chiaro", sopratitolo:"Il caso · si aggiunge l'ipertensione portale", passi:[
  {t:"↑ Pressione **idrostatica**", d:"nel distretto addominale"}, {t:"**Ascite**"},
  {t:"Paracentesi di grande volume"}, {t:"Si somministra **albumina**", d:"lezione 8.5", key:true}]},

{id:"s44", tipo:"tabella", tema:"chiaro", sopratitolo:"La tabella · corpo e cellula", colonne:["32%","68%"],
  intestazioni:["Che cosa", "Da ricordare"], righe:[
  ["Tessuti", "**4**: epiteliale, connettivo, muscolare, nervoso"], ["Piani", "**3**: sagittale, frontale, trasversale"],
  ["Trasporti", "passivi e attivi"], ["Pompa Na⁺/K⁺", "**3** fuori, **2** dentro"]], chiave:[3]},
{id:"s45", tipo:"tabella", tema:"chiaro", sopratitolo:"La tabella · i liquidi", colonne:["32%","68%"],
  intestazioni:["Che cosa", "Da ricordare"], righe:[
  ["Osmosi", "l'acqua va verso il **più concentrato**"], ["Tonicità", "iso · ipo · iper"],
  ["Acqua corporea", "**60%** del peso"], ["Distribuzione", "**2/3** intra · **1/3** extra"]], chiave:[2]},
{id:"s46", tipo:"tabella", tema:"chiaro", sopratitolo:"La tabella · gli equilibri", colonne:["32%","68%"],
  intestazioni:["Che cosa", "Da ricordare"], righe:[
  ["Starling", "idrostatica **fuori** · oncotica **dentro**"], ["Edema", "**4** cause"],
  ["ADH · aldosterone", "**acqua** · **sodio**"], ["pH 7,35–7,45", "tamponi · polmone · rene"],
  ["Feedback", "negativo e positivo"]], chiave:[0]},

{id:"s47", tipo:"titolo", tema:"profondo",
  titolo:"Ogni gesto infermieristico<br>ha una **ragione biologica**.",
  sotto:"Conoscerla permette di adattare il gesto quando la situazione cambia."},

{id:"s48", tipo:"percorso", tema:"chiaro", sopratitolo:"Nella prossima lezione · l'apparato cardiocircolatorio", tappe:[
  {t:"Anatomia del cuore"}, {t:"Sistema di conduzione"}, {t:"Pressione arteriosa", key:true}]},
{id:"s49", tipo:"frase", tema:"chiaro", sopratitolo:"A tra poco",
  testo:"Dalle fondamenta della cellula al primo grande apparato: il **cuore** e la **circolazione**."},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione · 14.2",
  titolo:"Apparato<br>cardiocircolatorio", sottotitolo:"Dall'anatomia del cuore al sistema di conduzione, alla pressione arteriosa",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
