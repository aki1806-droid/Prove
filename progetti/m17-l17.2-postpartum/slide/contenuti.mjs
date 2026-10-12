// Contenuto delle 50 scene della lezione 17.2 — l'emorragia post-partum e il
// neonato. Le quattro T sono quattro riquadri che si accendono (e tornano per
// la D1); l'acido tranexamico una finestra di tre ore; l'indice di shock un
// calcolo; i segni d'allarme del puerperio una griglia che si completa;
// l'Apgar una fascia con il normale da 7 a 10; errori in tabella; la risposta
// modello un promemoria riga per riga.

const LEZIONI = [
  {n:"6.6", t:"Trasfusione", illu:"sacca"},
  {n:"10.4", t:"Parto, Apgar, emorragia", illu:"cuore"},
  {n:"10.6", t:"Shock", illu:"stetoscopio"},
  {n:"11.4", t:"Puerperio e neonato", illu:"mani"},
  {n:"14.6", t:"Coagulazione", illu:"provetta"}];

const QUATTROT = (att, k) => ({tipo:"tre", tema:"chiaro", attive:att, box:[
  {n:"T", t:"Tono", d:"l'atonia uterina: la più frequente", key:k===0},
  {n:"T", t:"Trauma", d:"lacerazioni, ematomi, raramente la rottura d'utero", key:k===1},
  {n:"T", t:"Tessuto", d:"residui di placenta o di membrane", key:k===2},
  {n:"T", t:"Trombina", d:"la coagulazione: HELLP, distacco di placenta", key:k===3}]});

const ALLARME = (att, k) => ({tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, attive:att, celle:[
  {n:"1", t:"Sanguinamento **abbondante** · più di un assorbente all'ora"}, {n:"2", t:"**Coaguli** grandi"},
  {n:"3", t:"**Febbre**"}, {n:"4", t:"Dolore **addominale**"},
  {n:"5", t:"Lochi **maleodoranti**"}, {n:"6", t:"Cefalea **intensa**"},
  {n:"7", t:"Dolore o gonfiore di un **polpaccio**", key:k===6}, {n:"8", t:"Difficoltà **respiratoria**", key:k===6}]});

const RISPOSTA = (att) => ({tipo:"memo", tema:"chiaro", attive:att, voci:[
  "**Inquadramento**: perdita abbondante, utero molle, tachicardia, PA in calo → **emorragia post-partum**",
  "**Aiuto subito** · **massaggio** del fondo uterino · vescica svuotata",
  "Due accessi di grosso calibro · prelievi con **fibrinogeno** e gruppo",
  "O₂, liquidi caldi, uterotonici, **tranexamico**, emocomponenti, su prescrizione",
  "Perdite **pesate** · parametri, tono uterino, diuresi · le altre cause",
  "Neonato: **calore** e pelle a pelle con il padre",
  "Allattamento · **prima alzata** accompagnata · ascolto · segni d'allarme"]});

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 17 · Casi clinici avanzati",
  titolo:"L'emorragia post-partum<br>e il neonato", sottotitolo:"17.2 · Le quattro T, le azioni in sequenza, il neonato",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"frase", tema:"chiaro", sopratitolo:"Micro-lezione 2 di 12 · temuta anche nei paesi ad alto reddito",
  testo:"Una delle principali cause di **morte materna** nel mondo.",
  sotto:"Spesso si sviluppa in pochi minuti, in una donna giovane che compensa e poi crolla."},
{id:"s03", tipo:"anello", tema:"chiaro", sopratitolo:"Le quattro T, le azioni in sequenza, il neonato · i collegamenti",
  centro:"17.2", sotto:"e il neonato ha bisogno di qualcuno", voci:LEZIONI},

{id:"s04", tipo:"cifre", tema:"chiaro", sopratitolo:"Lo scenario · Sara, secondo parto, vaginale", voci:[
  {n:"34", suf:"anni", t:"secondo parto", d:"dopo un travaglio lungo"},
  {n:"4,1", suf:"kg", t:"il neonato", d:"un neonato grande", key:true},
  {n:"30", suf:"minuti", t:"dopo la placenta", d:"comincia a sanguinare"}]},
{id:"s05", tipo:"cifre", tema:"chiaro", sopratitolo:"Perdita abbondante e continua, telini intrisi · utero molle e alto, «non si sente bene»", voci:[
  {n:"118", t:"frequenza", key:true},
  {n:"100/62", t:"pressione", d:"in travaglio era 125/80"}]},
{id:"s06", tipo:"pausa", tema:"chiaro", sopratitolo:"Il neonato è in braccio al padre", es:"metti in pausa",
  testo:"Qual è la **causa più probabile**, e qual è il **primo gesto**?",
  dati:["pallida, sudata, ansiosa", "vescica distesa", "utero molle", "FC 118 · PA 100/62"]},

{id:"s07", tipo:"tre", tema:"chiaro", sopratitolo:"Il ragionamento · e i fattori di rischio ci sono: travaglio lungo, neonato grande", box:[
  {n:"1", t:"Perdita abbondante", d:"dopo il parto"},
  {n:"2", t:"Segni di ipovolemia", d:"FC 118 · PA 100/62"},
  {n:"3", t:"Emorragia post-partum", key:true}]},
{id:"s08", tipo:"catena", tema:"chiaro", sopratitolo:"L'utero molle", passi:[
  {t:"Travaglio lungo, **neonato grande**"},
  {t:"Utero **sovradisteso**", d:"e affaticato"},
  {t:"**Atonia uterina**", d:"non si contrae: la sede placentare sanguina", key:true}]},
{id:"s09", tipo:"confronto", tema:"chiaro", sopratitolo:"Una donna giovane compensa a lungo", col:[
  {h:"Prima", t:"la **tachicardia**"},
  {h:"Poi", t:"l'**ipotensione**: la perdita è già grave"}],
  sotto:"E un dettaglio pratico: la **vescica distesa** ostacola la contrazione dell'utero."},

{id:"s10", sopratitolo:"La regola delle quattro T · orienta la ricerca della causa", ...QUATTROT([0,1], 0)},
{id:"s11", sopratitolo:"Si cercano tutte, perché possono coesistere", ...QUATTROT([0,1,2,3], 3)},

{id:"s12", tipo:"icone", tema:"chiaro", sopratitolo:"Le prime azioni, molte in parallelo · protocollo per l'emorragia post-partum", voci:[
  {icona:"telefono", t:"Chiamare aiuto", d:"ostetrica, ginecologo, anestesista", key:true},
  {icona:"mani", t:"Massaggio del fondo uterino", d:"stimola la contrazione"}]},
{id:"s13", tipo:"griglia", tema:"chiaro", colonne:2, sopratitolo:"E ancora", celle:[
  {t:"Svuotare la **vescica** · catetere"}, {t:"**Due accessi** venosi di grosso calibro"},
  {t:"Emocromo, coagulazione, **fibrinogeno**, gruppo e prove crociate", key:true}, {t:"**Ossigeno**"},
  {t:"Parametri **ravvicinati**, monitoraggio"}]},
{id:"s14", tipo:"figura", tema:"chiaro", illu:"bilancia", sopratitolo:"La stima a occhio sottovaluta quasi sempre la perdita",
  titolo:"**Quantificare** le perdite: pesare telini e garze.", sotto:"Oppure raccoglitori graduati. E mantenere la temperatura."},

{id:"s15", tipo:"scadenza", tema:"chiaro", sopratitolo:"La terapia, secondo prescrizione · gli uterotonici: ossitocina in infusione, altri farmaci se non basta",
  max:3.6, banda:[0,3], inizio:"il parto", fine:"", tappe:[
  {a:3, v:"3 h", t:"**Acido tranexamico**, il prima possibile · come nel trauma", key:true}]},
{id:"s16", tipo:"icone", tema:"chiaro", sopratitolo:"Secondo prescrizione e protocollo", voci:[
  {icona:"termometro", t:"Liquidi riscaldati"},
  {icona:"sacca", t:"Emocomponenti", d:"secondo protocollo"},
  {icona:"provetta", t:"Fibrinogeno", d:"nell'emorragia ostetrica cala rapidamente", key:true}]},
{id:"s17", tipo:"catena", tema:"chiaro", sopratitolo:"E sempre la sicurezza trasfusionale della lezione 6.6", passi:[
  {t:"La causa **non si risolve**"},
  {t:"Interventi **ostetrici** e **chirurgici**"},
  {t:"Radiologia **interventistica**", key:true}]},

{id:"s18", tipo:"cifre", tema:"chiaro", sopratitolo:"La valutazione · dopo massaggio, catetere e uterotonico: utero contratto, «a palla», perdite ridotte", voci:[
  {n:"104", t:"frequenza", d:"era 118"},
  {n:"108/66", t:"pressione", d:"era 100/62", key:true}]},
{id:"s19", tipo:"cifre", tema:"chiaro", sopratitolo:"Si ripetono emocromo e coagulazione", voci:[
  {n:"1.300", suf:"ml", t:"la perdita totale, quantificata", d:"molto più della stima a occhio", key:true}]},
{id:"s20", tipo:"calcolo", tema:"chiaro", sopratitolo:"Nelle ore successive: tono uterino, perdite, parametri, diuresi", righe:[
  {tok:["FC", "÷", "PA sistolica", "=", "indice di shock"], nota:"Un utile **campanello d'allarme**."}]},

{id:"s21", tipo:"cifre", tema:"chiaro", sopratitolo:"Il neonato · valutato con l'Apgar", voci:[
  {n:"9", t:"a 1 minuto"},
  {n:"10", t:"a 5 minuti", key:true}]},
{id:"s22", tipo:"figura", tema:"chiaro", illu:"mani", sopratitolo:"Mentre la madre è instabile",
  titolo:"Il **contatto pelle a pelle** si può fare con il padre.", sotto:"Riscalda il neonato e lo calma."},
{id:"s23", tipo:"icone", tema:"chiaro", sopratitolo:"Secondo protocollo", voci:[
  {icona:"termometro", t:"Prevenire l'ipotermia"},
  {icona:"siringa", t:"Vitamina K", d:"e profilassi"},
  {icona:"braccialetto", t:"Identificazione", d:"madre-neonato", key:true}]},
{id:"s24", tipo:"catena", tema:"chiaro", sopratitolo:"Un dettaglio", passi:[
  {t:"Neonato **grande**", d:"4,1 kg"},
  {t:"Rischio di **ipoglicemia**"},
  {t:"**Glicemie** del protocollo", d:"e alimentazione precoce", key:true}]},
{id:"s25", tipo:"frase", tema:"chiaro", sopratitolo:"Poi",
  testo:"Appena la madre è stabile: il **contatto**, e il primo **attacco al seno**."},

{id:"s26", tipo:"tre", tema:"chiaro", sopratitolo:"Approfondimento · l'allattamento dopo un'emorragia · possono ritardare la montata lattea", box:[
  {n:"1", t:"Anemia"}, {n:"2", t:"Stanchezza"}, {n:"3", t:"Stress", d:"e la madre può scoraggiarsi", key:true}]},
{id:"s27", tipo:"griglia", tema:"chiaro", colonne:2, sopratitolo:"Il sostegno", celle:[
  {t:"Attacco al seno **precoce** e frequente", key:true}, {t:"Posizioni **comode** per una donna affaticata"},
  {t:"Il supporto dell'**ostetrica**"}, {t:"Il **ferro**, secondo prescrizione"}]},
{id:"s28", tipo:"confronto", tema:"chiaro", sopratitolo:"Un effetto positivo, e un'attenzione", col:[
  {h:"Da spiegarle", t:"la suzione stimola l'**ossitocina**: l'utero si contrae"},
  {h:"La prima alzata", t:"ipotensione e anemia: rischio di **caduta**, sempre accompagnata"}]},

{id:"s29", tipo:"figura", tema:"chiaro", illu:"dialogo", sopratitolo:"Il benessere emotivo",
  titolo:"Può essere vissuta come un **parto traumatico**.", sotto:"Dalla madre e dal partner. Quando è pronta, le si spiega che cosa è successo: ascolto, presenza del partner."},
{id:"s30", tipo:"tre", tema:"chiaro", sopratitolo:"Nelle settimane successive, da distinguere · chi contattare: consultorio, ostetrica, medico", box:[
  {n:"1", t:"Baby blues", d:"transitorio"},
  {n:"2", t:"Depressione post-partum", d:"richiede un aiuto", key:true},
  {n:"3", t:"Stress post-traumatico", d:"richiede un aiuto"}]},

{id:"s31", sopratitolo:"La dimissione · i segni d'allarme del puerperio: rivolgersi subito", ...ALLARME([0,1,2,3,4], -1)},
{id:"s32", sopratitolo:"Il caso 16.4: il puerperio è un periodo di rischio tromboembolico aumentato", ...ALLARME([0,1,2,3,4,5,6,7], 6)},
{id:"s33", tipo:"icone", tema:"chiaro", sopratitolo:"L'anemia e il territorio", voci:[
  {icona:"pillola", t:"Anemia", d:"ferro, alimentazione, riposo"},
  {icona:"casa", t:"Consultorio familiare", key:true},
  {icona:"stetoscopio", t:"Pediatra di libera scelta"}]},

{id:"s34", tipo:"tabella", tema:"chiaro", sopratitolo:"Gli errori da evitare · nella prima ora", colonne:["55%","45%"],
  intestazioni:["Errore", "Invece"], righe:[
  ["no:Stimare le perdite «a occhio»", "**pesare** telini e garze"],
  ["no:Rassicurarsi per la pressione normale", "la **tachicardia** viene prima"],
  ["no:Dimenticare la vescica piena", "**svuotarla**"],
  ["no:Aspettare la causa per agire", "**massaggio** e uterotonico subito"]], chiave:[0]},
{id:"s35", tipo:"tabella", tema:"chiaro", sopratitolo:"Gli errori da evitare · la squadra, il neonato, la prima alzata", colonne:["55%","45%"],
  intestazioni:["Errore", "Invece"], righe:[
  ["no:Non chiamare subito aiuto", "**protocollo** attivato"],
  ["no:Dimenticare il fibrinogeno", "nei **prelievi**"],
  ["no:Neonato senza un adulto e senza calore", "**pelle a pelle** con il padre"],
  ["no:Alzare la madre da sola", "**accompagnarla**"]], chiave:[3]},

{id:"s36", sopratitolo:"D1 · «Che cos'è la regola delle 4 T nell'emorragia post-partum?»", ...QUATTROT([0,1], 0)},
{id:"s37", sopratitolo:"D1 · tessuto e trombina · D2: aiuto, massaggio, vescica", ...QUATTROT([0,1,2,3], -1)},
{id:"s38", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"D2 · «Quali sono le prime azioni davanti a un'emorragia post-partum?»", celle:[
  {n:"1", t:"Chiamare **aiuto**", key:true}, {n:"2", t:"**Massaggio** del fondo uterino"},
  {n:"3", t:"Svuotare la **vescica**"}, {n:"4", t:"**Due accessi** di grosso calibro"},
  {n:"5", t:"Prelievi con **gruppo** e **fibrinogeno**"}, {n:"6", t:"**Ossigeno**"},
  {n:"7", t:"Uterotonici e **acido tranexamico** secondo prescrizione"}, {n:"8", t:"Perdite **quantificate**, monitoraggio"}]},
{id:"s39", tipo:"fascia", tema:"chiaro", sopratitolo:"D3 · «Che cos'è il punteggio di Apgar?» · a 1 e 5 minuti · colorito, frequenza cardiaca, reattività, tono, respiro",
  min:0, max:10, classi:[
  {a:7, t:""}, {da:7, a:10, t:"normale", d:"da 7 a 10", key:true}]},

{id:"s40", sopratitolo:"La risposta modello, in 15 righe", ...RISPOSTA([0])},
{id:"s41", sopratitolo:"La risposta modello · le prime azioni", ...RISPOSTA([0,1,2])},
{id:"s42", sopratitolo:"La risposta modello · la terapia e il monitoraggio", ...RISPOSTA([0,1,2,3,4])},
{id:"s43", sopratitolo:"La risposta modello · il neonato e il dopo", ...RISPOSTA([0,1,2,3,4,5,6])},

{id:"s44", tipo:"tre", tema:"chiaro", sopratitolo:"I collegamenti", box:[
  {n:"6.6", t:"Trasfusione"}, {n:"10.4", t:"Parto, Apgar, emorragia post-partum", key:true}, {n:"10.6", t:"Shock"}]},
{id:"s45", tipo:"tre", tema:"chiaro", sopratitolo:"I collegamenti", box:[
  {n:"11.4", t:"Puerperio e neonato"}, {n:"14.6", t:"Coagulazione e fibrinogeno"}, {n:"16.4", t:"Tromboembolismo", key:true}]},

{id:"s46", tipo:"icone", tema:"chiaro", sopratitolo:"Il lavoro di squadra in sala parto · nei punti nascita", voci:[
  {icona:"documento", t:"Protocolli e check-list", d:"per l'emorragia post-partum"},
  {icona:"persone", t:"Simulazioni periodiche", d:"dell'équipe", key:true}]},
{id:"s47", tipo:"griglia", tema:"chiaro", colonne:2, sopratitolo:"Durante e dopo l'evento · l'organizzazione salva vite", celle:[
  {t:"Un operatore **registra** tempi, farmaci e perdite", key:true}, {t:"Comunicazione **a ciclo chiuso**"},
  {t:"Un **kit** sempre pronto"}, {t:"Il **debriefing** dopo l'evento"}]},

{id:"s48", tipo:"titolo", tema:"profondo",
  titolo:"Dopo il parto,<br>un utero molle<br>è un'**emergenza**.",
  sotto:"Massaggio, vescica vuota, aiuto."},

{id:"s49", tipo:"tre", tema:"chiaro", sopratitolo:"Nella prossima lezione", box:[
  {n:"1", t:"Un lattante di nove mesi", d:"vomito e diarrea"}, {n:"2", t:"Genitori preoccupati"},
  {n:"3", t:"I calcoli per chilo", d:"la dose giusta, o un errore", key:true}]},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione · 17.3",
  titolo:"Il lattante disidratato", sottotitolo:"Segni di gravità, liquidi e dosi per chilo",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
