// Contenuto delle 50 scene della lezione 10.3 — BLSD e ALS nell'adulto.
// La catena della sopravvivenza è un percorso a cinque tappe che si accende
// anello per anello; la sequenza iniziale una scala; l'algoritmo ALS un
// confronto a due rami; i farmaci cifre; le 4 I e 4 T due griglie.

const CATENA = [
  {t:"Riconoscimento", d:"e chiamata"}, {t:"RCP", d:"precoce"}, {t:"Defibrillazione", d:"precoce"},
  {t:"Supporto avanzato", d:"precoce"}, {t:"Cure", d:"post-arresto"}];

const SEQ = (k) => [
  {n:"1", t:"Sicurezza della scena", key:k===0}, {n:"2", t:"Coscienza: scuotere e chiamare", key:k===1},
  {n:"3", t:"Chiamare aiuto", key:k===2}, {n:"4", t:"Aprire le vie aeree", key:k===3},
  {n:"5", t:"Respiro: non più di 10 secondi", key:k===4}];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 10 · Emergenza e area critica",
  titolo:"BLSD e ALS<br>nell'adulto", sottotitolo:"10.3 · La catena, le compressioni, il DAE, l'algoritmo, i farmaci, le 4 I e 4 T",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"frase", tema:"chiaro", sopratitolo:"Micro-lezione 3 di 8 · la lezione che può servirti fuori dall'esame",
  testo:"Nell'arresto cardiaco **ogni minuto** senza rianimazione riduce la sopravvivenza in modo drastico."},
{id:"s03", tipo:"norma", tema:"chiaro", etichetta:"Linee guida europee, recepite in Italia", sigla:"ERC · IRC",
  testo:"Prima il **BLSD**, il supporto di base con defibrillatore; poi l'**ALS**, il supporto avanzato."},

{id:"s04", tipo:"percorso", tema:"chiaro", sopratitolo:"La catena della sopravvivenza · cinque anelli", tappe:CATENA, attive:[0,1,2]},
{id:"s05", tipo:"percorso", tema:"chiaro", sopratitolo:"Il ritorno del polso non è la fine del lavoro, ma l'inizio di un'altra fase", tappe:CATENA, attive:[0,1,2,3,4]},
{id:"s06", tipo:"frase", tema:"chiaro", sopratitolo:"La catena è forte quanto il suo anello più debole",
  testo:"I primi tre anelli dipendono da chi è presente **nei primi minuti**: in reparto, quasi sempre **un infermiere**."},

{id:"s07", tipo:"scala", tema:"chiaro", sopratitolo:"La sequenza iniziale del BLSD · per te, per gli altri, per la vittima", gradini:SEQ(1)},
{id:"s08", tipo:"scala", tema:"chiaro", sopratitolo:"Iperestensione del capo e sollevamento del mento", gradini:SEQ(3)},
{id:"s09", tipo:"trappola", tema:"chiaro", sopratitolo:"Guardare, ascoltare, sentire · non più di 10 secondi", righe:[
  {sb:"Respiro assente o anormale", ok:"= **arresto cardiaco**"}]},
{id:"s10", tipo:"titolo", tema:"profondo",
  titolo:"Il gasping<br>**non è un respiro normale**.",
  sotto:""},
{id:"s11", tipo:"trappola", tema:"chiaro", sopratitolo:"Il respiro agonico, lento e rumoroso", righe:[
  {sb:"Scambiare il gasping per respiro", ok:"È un segno di **arresto**: ogni minuto perso conta"}]},

{id:"s12", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Chiamare e chiedere il DAE", celle:[
  {t:"**112 o 118** · in ospedale, il numero interno dell'emergenza"}, {t:"Far portare il **defibrillatore**", key:true}]},
{id:"s13", tipo:"confronto", tema:"chiaro", sopratitolo:"Due situazioni", col:[
  {h:"Da soli con il telefono", t:"**vivavoce**, e si inizia subito mentre si parla con la centrale", key:true}, {h:"In ospedale", t:"il **team** e il **carrello** delle emergenze · lezione 5.7"}]},

{id:"s14", tipo:"frase", tema:"chiaro", sopratitolo:"Le compressioni toraciche · il cuore della rianimazione",
  testo:"Mani al **centro del torace**, sulla metà inferiore dello sterno, su una superficie **rigida**."},
{id:"s15", tipo:"cifre", tema:"chiaro", sopratitolo:"Il cuore si riempie durante il rilascio: rilascio completo", voci:[
  {n:"5-6", suf:"cm", d:"profondità", key:true}, {n:"100", suf:"-120 al minuto", d:"frequenza", key:true}]},
{id:"s16", tipo:"catena", tema:"chiaro", sopratitolo:"Minime interruzioni", passi:[
  {t:"Una pausa"}, {t:"Crolla la pressione di perfusione", key:true}, {t:"Diverse compressioni per risalire"}]},
{id:"s17", tipo:"cifre", tema:"chiaro", sopratitolo:"La qualità cala con la stanchezza molto prima che chi comprime se ne accorga", voci:[
  {n:"2", suf:"minuti", d:"cambio dell'operatore", key:true}]},

{id:"s18", tipo:"cifre", tema:"chiaro", sopratitolo:"Ogni ventilazione circa 1 secondo, con il torace che si solleva · troppo forte, aria nello stomaco", voci:[
  {n:"30", suf:"", d:"compressioni", key:true}, {n:"2", suf:"", d:"ventilazioni"}]},
{id:"s19", tipo:"confronto", tema:"chiaro", sopratitolo:"Come si ventila", col:[
  {h:"In ospedale", t:"**pallone-maschera** collegato all'ossigeno"}, {h:"Se non si è in grado", t:"**compressioni continue**: molto meglio di niente", key:true}]},

{id:"s20", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Il DAE · si accende e si seguono le istruzioni vocali", celle:[
  {n:"1", t:"Piastra **sotto la clavicola destra**"}, {n:"2", t:"Piastra **sul lato sinistro**, sotto l'ascella", key:true}]},
{id:"s21", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Torace asciutto · uno applica le piastre, l'altro continua a comprimere", celle:[
  {n:"1", t:"**Analisi**: nessuno tocca il paziente"}, {n:"2", t:"Shock indicato: **ancora nessuno a contatto**", key:true}, {n:"3", t:"**Shock**"}]},
{id:"s22", tipo:"trappola", tema:"chiaro", sopratitolo:"Anche dopo uno shock efficace, il cuore impiega tempo a pompare", righe:[
  {sb:"Fermarsi a cercare il polso", ok:"**Subito compressioni**, per due minuti"}]},

{id:"s23", tipo:"confronto", tema:"chiaro", sopratitolo:"I ritmi dell'arresto · lezione 8.1", col:[
  {h:"Defibrillabili", t:"**fibrillazione ventricolare** · **tachicardia ventricolare senza polso**", key:true}, {h:"Non defibrillabili", t:"asistolia · PEA"}]},
{id:"s24", tipo:"confronto", tema:"chiaro", sopratitolo:"Qui lo shock non serve: rianimazione di qualità e ricerca della causa", col:[
  {h:"Defibrillabili", t:"FV · TV senza polso"}, {h:"Non defibrillabili", t:"**asistolia** · **attività elettrica senza polso**, la PEA", key:true}]},

{id:"s25", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"L'ALS aggiunge alla rianimazione di base", celle:[
  {t:"Il **monitor**"}, {t:"I **farmaci**", key:true}, {t:"Le vie aeree **avanzate**"}]},
{id:"s26", tipo:"confronto", tema:"chiaro", sopratitolo:"Un ciclo · analisi del ritmo ogni 2 minuti", col:[
  {h:"Defibrillabile", t:"**shock** → RCP 2 minuti", key:true}, {h:"Non defibrillabile", t:"RCP 2 minuti"}]},
{id:"s27", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"Durante la rianimazione", celle:[
  {t:"Accesso **venoso o intraosseo** · lezione 5.2"}, {t:"Farmaci, vie aeree avanzate"}, {t:"**Capnografia**, cause reversibili", key:true}]},

{id:"s28", tipo:"cifre", tema:"chiaro", sopratitolo:"Adrenalina, endovena o intraossea · non defibrillabili: il prima possibile", voci:[
  {n:"1", suf:"mg", d:"adrenalina", key:true}]},
{id:"s29", tipo:"confronto", tema:"chiaro", sopratitolo:"Adrenalina · poi ogni 3-5 minuti, circa ogni due cicli", col:[
  {h:"Non defibrillabili", t:"**il prima possibile**"}, {h:"Defibrillabili", t:"**dopo il 3° shock**", key:true}]},
{id:"s30", tipo:"cifre", tema:"chiaro", sopratitolo:"Amiodarone · dopo ogni farmaco, lavaggio con fisiologica", voci:[
  {n:"300", suf:"mg", d:"dopo il 3° shock", key:true}, {n:"150", suf:"mg", d:"dopo il 5° shock"}]},

{id:"s31", tipo:"frase", tema:"chiaro", sopratitolo:"Le cause reversibili · durante ogni arresto, non solo alla fine",
  testo:"La regola delle **quattro I** e delle **quattro T**."},
{id:"s32", tipo:"griglia", tema:"chiaro", colonne:4, spunta:false, sopratitolo:"Quattro I e quattro T", celle:[
  {n:"I", t:"**Ipossia**"}, {n:"I", t:"**Ipovolemia**"}, {n:"I", t:"**Ipo/iperkaliemia**, metaboliche"}, {n:"I", t:"**Ipotermia**"},
  {n:"T", t:"**Trombosi**, coronarica o polmonare", key:true}, {n:"T", t:"**Tamponamento**"}, {n:"T", t:"**Tossici**"}, {n:"T", t:"Pneumotorace iperteso, **tension**"}]},
{id:"s33", tipo:"frase", tema:"chiaro", sopratitolo:"Lo shock lì non serve, e le compressioni guadagnano solo tempo",
  testo:"Trattare la causa è spesso **l'unico modo** per far ripartire un cuore in **asistolia** o **PEA**."},

{id:"s34", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"La capnografia · CO₂ di fine espirazione · tre usi", celle:[
  {n:"1", t:"Conferma la posizione del **tubo**", key:true}, {n:"2", t:"Qualità delle compressioni"}, {n:"3", t:"Il ritorno del circolo"}]},
{id:"s35", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"La capnografia", celle:[
  {n:"2", t:"Valori **bassi**: compressioni poco efficaci"}, {n:"3", t:"Un **aumento brusco**: possibile **ROSC**", key:true}]},

{id:"s36", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"L'infermiere nel team", celle:[
  {t:"**Compressioni** e cambi"}, {t:"**Defibrillazione**, spesso in autonomia se formato", key:true}, {t:"Accesso venoso e **farmaci**"}, {t:"Supporto alle **vie aeree**"}]},
{id:"s37", tipo:"confronto", tema:"chiaro", sopratitolo:"Due ruoli spesso sottovalutati", col:[
  {h:"Timekeeper", t:"i **due minuti** dei cicli e i tempi dell'adrenalina", key:true}, {h:"Documentazione", t:"**orari**, ritmi, shock, farmaci"}]},
{id:"s38", tipo:"catena", tema:"chiaro", sopratitolo:"Un leader chiaro · la comunicazione a ciclo chiuso", passi:[
  {t:"Il leader dà un ordine"}, {t:"Chi lo riceve **lo ripete**", key:true}, {t:"E conferma quando l'ha eseguito"}]},

{id:"s39", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"Le cure post-arresto · l'ultimo anello · si riparte dall'ABCDE", celle:[
  {t:"SpO₂ **94-98%**: né ipossia né iperossia", key:true}, {t:"Anidride carbonica **normale**"}, {t:"Evitare l'**ipotensione**"}]},
{id:"s40", tipo:"frase", tema:"chiaro", sopratitolo:"ECG a 12 derivazioni · coronarografia se indicata",
  testo:"Molti arresti sono causati da **un infarto**."},
{id:"s41", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"E poi", celle:[
  {t:"**Glicemia**"}, {t:"Controllo della temperatura: **niente febbre**"}, {t:"La causa, con le **4 I e 4 T**", key:true}]},

{id:"s42", tipo:"frase", tema:"chiaro", sopratitolo:"Il caso · entri in stanza",
  testo:"Non risponde, con un respiro **lento e rumoroso** a intervalli irregolari. Che cosa fai?"},
{id:"s43", tipo:"percorso", tema:"chiaro", sopratitolo:"È gasping: arresto cardiaco", tappe:[
  {t:"Aiuto e team", d:""}, {t:"Defibrillatore", d:""}, {t:"Superficie rigida", d:"o tavola"}, {t:"Compressioni", d:"30:2"}], attive:[0,1,2,3]},
{id:"s44", tipo:"trappola", tema:"chiaro", sopratitolo:"Appena arriva il defibrillatore: piastre e analisi", righe:[
  {sb:"Aspettare di essere sicuri, perché «respira ancora»", ok:"Si perdono **i minuti che decidono l'esito**"}]},

{id:"s45", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"In Veneto · linee guida IRC ed ERC", celle:[
  {n:"1", t:"Corsi **BLSD e ALS** certificati"}, {n:"2", t:"Carrelli e defibrillatori **standardizzati**"},
  {n:"3", t:"Team per l'**emergenza in ospedale**"}, {n:"4", t:"**DAE** nei luoghi pubblici", key:true}]},

{id:"s46", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"La tabella", celle:[
  {n:"!", t:"Respiro **≤ 10 s** · gasping = arresto", key:true}, {n:"↓", t:"**5-6 cm**, **100-120/min**, rilascio completo"}, {n:"↻", t:"**30:2** · cambio ogni **2 minuti**"}]},
{id:"s47", tipo:"tabella", tema:"chiaro", sopratitolo:"La tabella · dopo lo shock, subito compressioni · 4 I e 4 T", intestazioni:["Farmaco","Quando","Poi"], colonne:[1,2,1], righe:[
  ["**Adrenalina 1 mg**","subito nei non defibrillabili · dopo il **3° shock** nei defibrillabili","ogni **3-5 min**"],
  ["**Amiodarone**","**300 mg** dopo il 3° shock","**150 mg** dopo il 5°"]]},
{id:"s48", tipo:"titolo", tema:"profondo",
  titolo:"Nel dubbio,<br>**comprimi**.",
  sotto:""},
{id:"s49", tipo:"confronto", tema:"chiaro", sopratitolo:"Nella prossima lezione · il bambino, il lattante, il parto imminente", col:[
  {h:"Su chi non è in arresto", t:"le compressioni raramente fanno **danni gravi**"}, {h:"Su chi è in arresto", t:"il ritardo è quasi sempre **fatale**", key:true}]},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"10.4<br>Emergenze pediatriche<br>e ostetriche", sottotitolo:"Il bambino, il lattante, il parto imminente",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
