// Contenuto delle 50 scene della lezione 7.2 — lesioni da pressione. Due
// corpi nuovi: gli stadi (la sezione della cute a cinque strati con la
// lesione scavata fino allo strato giusto, poi il fondo coperto e il danno
// profondo) e le sedi (supino, sul fianco, seduto, con i punti accesi).

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 7 · Wound care, stomie e drenaggi",
  titolo:"Lesioni<br>da pressione", sottotitolo:"7.2 · La stadiazione completa",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"frase", tema:"chiaro", sopratitolo:"Micro-lezione 2 di 8",
  testo:"Un **indicatore della qualità** dell'assistenza infermieristica: in gran parte sono **prevenibili**."},
{id:"s03", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Le abbiamo già incontrate", celle:[
  {n:"2.3", t:"La scala di **Braden**"}, {n:"3.2", t:"La **mobilizzazione**"}, {n:"7.2", t:"Qui la **stadiazione**: la parte che i concorsi chiedono con maggiore precisione", key:true}]},
{id:"s04", tipo:"frase", tema:"chiaro", sopratitolo:"Per questo va imparata parola per parola",
  testo:"La stadiazione è un **linguaggio comune**: «stadio 3» dice la stessa cosa in reparto, a domicilio e in sede d'esame."},

{id:"s05", tipo:"frase", tema:"chiaro", sopratitolo:"La definizione internazionale · NPIAP ed EPUAP",
  testo:"Un **danno localizzato** della cute e dei tessuti sottostanti, di solito su una **prominenza ossea** o in relazione a un **dispositivo medico**, causato da **pressione**, o da pressione con **forze di taglio**."},
{id:"s06", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Due parole da notare", celle:[
  {n:"1", t:"**Dispositivo**: oggi molte lesioni nascono da sondini, maschere, tubi", key:true}, {n:"2", t:"**Taglio**: la lezione 3.2"}]},

{id:"s07", tipo:"sedi", tema:"chiaro", sopratitolo:"Le sedi dipendono dalla posizione · supino: sacro e talloni, le due più frequenti · sul fianco: il trocantere · seduto: l'ischio"},
{id:"s08", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Le lesioni da dispositivo", celle:[
  {n:"1", t:"**Naso e orecchie**: sondini, occhialini", key:true}, {n:"2", t:"Il **volto**: maschere della ventilazione non invasiva"}, {n:"3", t:"Le **labbra**: il tubo"}, {n:"4", t:"La cute sotto **collari, tutori, cateteri**"}]},
{id:"s09", tipo:"frase", tema:"chiaro", sopratitolo:"Una maschera stretta per una notte lascia un segno che la Braden non aveva previsto",
  testo:"Ogni dispositivo va **controllato** e la sua cute **ispezionata**."},

{id:"s10", tipo:"stadi", tema:"chiaro", sopratitolo:"La stadiazione NPIAP-EPUAP", stadio:1, titolo:"Stadio 1", voci:["**Cute integra**", "**Eritema non sbiancante**", "Verifica con la digitopressione"]},
{id:"s11", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"La digitopressione · se l'area non impallidisce, il danno è iniziato", celle:[
  {n:"1", t:"Si preme con un **dito**, o con un **vetrino trasparente**", key:true}, {n:"2", t:"Nella **cute scura** l'eritema può non vedersi: **temperatura, consistenza, dolore**"}]},
{id:"s12", tipo:"frase", tema:"chiaro", sopratitolo:"L'unico stadio in cui la cute è ancora intera",
  testo:"Lo stadio 1 è il **campanello d'allarme**: da qui in poi si interviene subito sullo **scarico**."},

{id:"s13", tipo:"stadi", tema:"chiaro", sopratitolo:"Stadio 2 · il letto è rosa o rosso, umido", stadio:2, titolo:"Stadio 2", voci:["Perdita di cute a **spessore parziale**", "**Derma esposto**", "Flittene a contenuto **sieroso**, integra o rotta"]},
{id:"s14", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Il letto rosa e umido è un derma vivo, non un fondo da riempire", celle:[
  {n:"!", t:"**Non** si vedono tessuto adiposo, slough o escara: se ci sono, lo stadio è **più avanzato**", key:true}]},
{id:"s15", tipo:"trappola", tema:"chiaro", sopratitolo:"Attenzione · possono somigliare a uno stadio 2", righe:[
  {sb:"Lesioni da umidità (dermatite da incontinenza) e lesioni da adesivi classificate come stadio 2", ok:"**Non sono lesioni da pressione**"}]},

{id:"s16", tipo:"stadi", tema:"chiaro", sopratitolo:"Stadio 3 · possono esserci slough, escara, sottominature e tunnel", stadio:3, titolo:"Stadio 3", voci:["Perdita di cute a **spessore totale**", "**Tessuto adiposo visibile**", "Non fascia, muscolo, tendine, osso"]},
{id:"s17", tipo:"frase", tema:"chiaro", sopratitolo:"La profondità varia con la sede · sul naso uno stadio 3 è sottile, sul sacro di una persona obesa può essere profondo",
  testo:"Lo stadio dice **che cosa si vede**, non quanti centimetri."},

{id:"s18", tipo:"stadi", tema:"chiaro", sopratitolo:"Stadio 4 · frequenti sottominature e tunnel · rischio di osteomielite", stadio:4, titolo:"Stadio 4", voci:["Perdita a spessore totale", "**Esposizione** di fascia, muscolo,", "tendine, legamento, cartilagine, **osso**"]},
{id:"s19", tipo:"confronto", tema:"chiaro", sopratitolo:"La regola per distinguere il 3 dal 4 · ne basta uno", col:[
  {h:"Stadio 3", t:"si vede l'**adipe**"}, {h:"Stadio 4", t:"si vede qualcosa **sotto l'adipe**", key:true}]},

{id:"s20", tipo:"stadi", tema:"chiaro", sopratitolo:"Oltre gli stadi · solo dopo la rimozione si saprà se è uno stadio 3 o 4", stadio:"ns", titolo:"Non stadiabile", voci:["Spessore totale", "Fondo **coperto** da slough o escara", "Profondità non valutabile"]},
{id:"s21", tipo:"stadi", tema:"chiaro", sopratitolo:"Il danno dei tessuti profondi · partito vicino all'osso", stadio:"dti", titolo:"Danno dei tessuti profondi", voci:["Area **rosso scuro, marrone o violacea**", "che non sbianca", "o flittene a contenuto **ematico**"]},
{id:"s22", tipo:"frase", tema:"chiaro", sopratitolo:"Può evolvere rapidamente anche con ogni cura",
  testo:"Si vede la **superficie**, ma il danno sta **sotto**."},
{id:"s23", tipo:"trappola", tema:"chiaro", sopratitolo:"Una regola · soprattutto se la perfusione è scarsa", righe:[
  {sb:"Rimuovere un'escara secca e stabile al tallone, senza segni di infezione", ok:"**Non si rimuove**: funziona da copertura naturale"}]},

{id:"s24", tipo:"trappola", tema:"chiaro", sopratitolo:"La stadiazione non si percorre all'indietro · i tessuti ricostruiti non sono uguali a quelli originali", righe:[
  {sb:"Uno stadio 4 che si riempie di granulazione «diventa» uno stadio 3", ok:"Resta uno **stadio 4 in guarigione**"}]},
{id:"s25", tipo:"confronto", tema:"chiaro", sopratitolo:"Con lo stesso sistema, o no", col:[
  {h:"Lesioni da dispositivo", t:"**si stadiano** con lo stesso sistema", key:true}, {h:"Lesioni delle mucose", t:"**non si stadiano**"}]},

{id:"s26", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"La diagnosi differenziale · la dermatite associata a incontinenza", celle:[
  {n:"1", t:"Area **perineale diffusa**, margini **sfumati**", key:true}, {n:"2", t:"Superficiale, **non legata a una prominenza ossea**"}]},
{id:"s27", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"La diagnosi differenziale", celle:[
  {n:"2", t:"**MARSI**, da adesivi medicali: strappi e flittene da trazione, cerotti rimossi male", key:true}, {n:"3", t:"**Lesioni da frizione**, skin tear, nella cute fragile dell'anziano"}]},
{id:"s28", tipo:"frase", tema:"chiaro", sopratitolo:"Un prodotto barriera, un cerotto rimosso bene, una manovra più delicata",
  testo:"**Nessuna** di queste è una lesione da pressione, e ognuna ha una **prevenzione diversa**."},

{id:"s29", tipo:"cifre", tema:"chiaro", sopratitolo:"La prevenzione comincia dalla valutazione · scala di Braden all'ingresso e a ogni variazione", voci:[
  {n:"16", d:"la soglia della lezione 2.3", key:true}]},
{id:"s30", tipo:"frase", tema:"chiaro", sopratitolo:"La rivalutazione non è a scadenza",
  testo:"Ogni variazione clinica, un intervento, una febbre, un peggioramento, **riapre la Braden**."},
{id:"s31", tipo:"percorso", tema:"chiaro", sopratitolo:"Tre gesti, ogni giorno, e la maggior parte delle lesioni non nasce", tappe:[
  {t:"Braden", d:"all'ingresso e a ogni variazione"}, {t:"Ispezione quotidiana", d:"sedi a rischio e dispositivi", key:true}, {t:"Valutazione nutrizionale"}]},

{id:"s32", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Gli interventi · come nella lezione 3.2", celle:[
  {n:"1", t:"**Riposizionamento** programmato, laterale a **30°**", key:true}, {n:"2", t:"**Talloni sospesi**, sollevati dal materasso"}]},
{id:"s33", tipo:"colonne", tema:"chiaro", sopratitolo:"Le superfici di supporto", colonne:[
  {h:"Rischio moderato", voci:[{t:"Materassi in **schiuma ad alta specificità**"}, {t:"O **viscoelastici**"}]},
  {h:"Rischio alto, o lesione presente", key:true, voci:[{t:"Superfici **dinamiche a pressione alternata**", key:true}]}]},
{id:"s34", tipo:"trappola", tema:"chiaro", sopratitolo:"Il microclima · detergenti delicati e prodotti barriera", righe:[
  {sb:"«C'è il materasso dinamico, il riposizionamento può aspettare»", ok:"**Nessuna superficie sostituisce il riposizionamento**"}]},
{id:"s35", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"Gli interventi", celle:[
  {t:"**Nutrizione** adeguata in proteine e calorie: la lezione 3.3", key:true}, {t:"**Niente massaggi**"}, {t:"**Protezione** della cute sotto i dispositivi, con medicazioni in schiuma dove indicato"}]},

{id:"s36", tipo:"trappola", tema:"chiaro", sopratitolo:"Il paziente seduto · in poltrona o in carrozzina", righe:[
  {sb:"Il cuscino a ciambella: comprime i vasi intorno all'area e peggiora la perfusione", ok:"**Cuscino antidecubito specifico**"}]},
{id:"s37", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"Il paziente seduto", celle:[
  {t:"Riposizionamento più frequente: **ogni ora**", key:true}, {t:"Se è in grado, **spostare il peso ogni 15 minuti**"}, {t:"**Piedi ben appoggiati**, per non scaricare tutto sugli ischi"}]},

{id:"s38", tipo:"frase", tema:"chiaro", sopratitolo:"Il caso · al sacro di un paziente allettato, Braden 11, su cute integra, dolente",
  testo:"Un'**area violacea non sbiancante**. Come la classifichi? Non uno stadio 1: un **danno dei tessuti profondi**."},
{id:"s39", tipo:"percorso", tema:"chiaro", sopratitolo:"Che cosa fai · niente decubito supino", tappe:[
  {t:"Scarico completo", d:"della sede", key:true}, {t:"Superficie dinamica"}, {t:"Riposizionamento", d:"programmato"}]},
{id:"s40", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Che cosa fai · la lesione è insorta in reparto, e si dichiara", celle:[
  {t:"**Valutazione nutrizionale**"}, {t:"Gestione dell'**umidità**"}, {t:"**Documentazione** con misure e foto", key:true}, {t:"**Segnalazione** secondo procedura"}]},
{id:"s41", tipo:"titolo", tema:"profondo",
  titolo:"E **sorveglianza ravvicinata**.",
  sotto:"Può evolvere rapidamente verso uno stadio 3 o 4."},

{id:"s42", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"In Veneto · le lesioni da pressione come indicatore di qualità", celle:[
  {n:"1", t:"**Procedure aziendali** di prevenzione e trattamento"}, {n:"2", t:"La **Braden** integrata nella cartella elettronica", key:true}]},
{id:"s43", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"In Veneto", celle:[
  {n:"3", t:"La **segnalazione** delle lesioni insorte durante la degenza", key:true}, {n:"4", t:"A domicilio, gli **ausili antidecubito**, materassi e cuscini, tramite il **distretto**"}]},
{id:"s44", tipo:"frase", tema:"chiaro", sopratitolo:"All'orale · collega la prevenzione alla responsabilità",
  testo:"Una lesione insorta in reparto con una **Braden non compilata** è difficile da difendere."},

{id:"s45", tipo:"colonne", tema:"chiaro", sopratitolo:"La tabella da fotografare", colonne:[
  {h:"Stadio 1", voci:[{t:"**Eritema non sbiancante** su cute integra", key:true}]},
  {h:"Stadio 2", voci:[{t:"Spessore parziale, **derma** esposto"}, {t:"Flittene **sierosa**"}]},
  {h:"Stadio 3", key:true, voci:[{t:"Spessore totale, **adipe** visibile", key:true}]}]},
{id:"s46", tipo:"colonne", tema:"chiaro", sopratitolo:"La tabella da fotografare", colonne:[
  {h:"Stadio 4", key:true, voci:[{t:"Esposizione di **fascia, muscolo, tendine, osso**", key:true}]},
  {h:"Non stadiabile", voci:[{t:"Fondo **coperto**"}]},
  {h:"Danno dei tessuti profondi", voci:[{t:"**Viola o marrone**"}, {t:"Flittene **ematica**"}]}]},

{id:"s47", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Ricapitoliamo", celle:[
  {t:"**Pressione**, con o senza taglio, su prominenza ossea o **dispositivo**"}, {t:"**Non si retrostadia**", key:true}, {t:"Escara **secca e stabile al tallone**: non si rimuove"}]},
{id:"s48", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Ricapitoliamo", celle:[
  {t:"Dermatite da incontinenza e MARSI **non sono** lesioni da pressione"}, {t:"**Niente ciambelle, niente massaggi**", key:true}, {t:"La **Braden** compilata, sempre"}]},
{id:"s49", tipo:"frase", tema:"chiaro", sopratitolo:"Nella prossima lezione",
  testo:"**Ulcere vascolari** e **piede diabetico**."},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"7.3<br>Ulcere vascolari<br>e piede diabetico", sottotitolo:"Qual è la causa?",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
