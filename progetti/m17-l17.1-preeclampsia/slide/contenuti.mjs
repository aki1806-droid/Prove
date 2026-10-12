// Contenuto delle 50 scene della lezione 17.1 — la preeclampsia grave, in un
// pronto soccorso generale. La pressione è una misura con la soglia 160; i
// segni di gravità stanno sul corpo; la sorveglianza del magnesio sono le sue
// icone (riflessi, respiro, diuresi, coscienza, antidoto) che si accendono;
// gli orari del caso un percorso (22:00 → 23:10 → stabilizzazione → parto);
// errori in tabella; la risposta modello un promemoria riga per riga.

const LEZIONI = [
  {n:"5.3", t:"Calcoli e pompe", illu:"calcolatrice"},
  {n:"8.6", t:"Crisi convulsiva", illu:"orologio"},
  {n:"10.1", t:"Triage", illu:"semaforo"},
  {n:"11.4", t:"Area materno-infantile", illu:"cuore"},
  {n:"14.5", t:"Riflessi", illu:"gambe"}];

// La sorveglianza del magnesio: le stesse cinque voci in s17, s18 e s38.
const MAGNESIO = (att, k) => ({tipo:"icone", tema:"chiaro", attive:att, voci:[
  {icona:"gambe", t:"Riflessi rotulei", d:"la scomparsa: primo segno", key:k===0},
  {icona:"polmoni", t:"Frequenza respiratoria", d:"il magnesio deprime il respiro", key:k===1},
  {icona:"catetere", t:"Diuresi", d:"oliguria = accumulo", key:k===2},
  {icona:"occhio", t:"Coscienza e saturazione", key:k===3},
  {icona:"siringa", t:"Calcio gluconato", d:"l'antidoto, pronto al letto", key:k===4}]});

const ORARI = (att, k) => ({tipo:"percorso", tema:"chiaro", attive:att, tappe:[
  {t:"22:00", d:"arriva: PA 170/110, cefalea, «lucine»", key:k===0},
  {t:"23:10", d:"crisi convulsiva: eclampsia", key:k===1},
  {t:"Stabilizzazione", d:"magnesio, madre e feto monitorati", key:k===2},
  {t:"Il parto", d:"la cura definitiva: decide il ginecologo", key:k===3}]});

const HELLP = {tipo:"tre", tema:"chiaro", box:[
  {n:"H", t:"Emolisi", d:"Hemolysis"},
  {n:"EL", t:"Enzimi epatici elevati", d:"Elevated Liver enzymes"},
  {n:"LP", t:"Piastrine basse", d:"Low Platelets", key:true}]};

const GRAVITA = (att, k) => ({tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, attive:att, celle:[
  {n:"1", t:"Pressione da **160/110** in su"}, {n:"2", t:"Cefalea **intensa**"},
  {n:"3", t:"Disturbi **visivi**"}, {n:"4", t:"Dolore **epigastrico** o all'ipocondrio destro"},
  {n:"5", t:"**Oliguria**"}, {n:"6", t:"**Edema** polmonare"},
  {n:"7", t:"**Piastrine** basse · alterazioni epatiche e renali"},
  {n:"8", t:"**Convulsioni**: è l'eclampsia", key:k===7}]});

const RISPOSTA = (att) => ({tipo:"memo", tema:"chiaro", attive:att, voci:[
  "**Inquadramento**: 35 settimane, PA 170/110, proteinuria, cefalea, disturbi visivi, dolore epigastrico, edemi → **preeclampsia grave**",
  "**Alta priorità** · ginecologo e ostetrica subito · decubito **laterale sinistro**, ambiente tranquillo, mai sola",
  "Accesso e prelievi · PA ogni **15 minuti** · diuresi oraria",
  "Antipertensivi prescritti **senza cali bruschi** · magnesio con **pompa** e doppio controllo",
  "Riflessi, respiro, diuresi, coscienza · **calcio gluconato** pronto",
  "Convulsione: protezione, nulla in bocca · poi decubito laterale e **ossigeno**",
  "Sorveglianza **dopo il parto** · documentazione · educazione ai segni d'allarme"]});

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 17 · Casi clinici avanzati",
  titolo:"La preeclampsia grave", sottotitolo:"17.1 · Un'emergenza che mette in pericolo due vite",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"tre", tema:"chiaro", sopratitolo:"Micro-lezione 1 di 12 · l'area materno-infantile · l'assistenza ostetrica spetta all'ostetrica, ma una gestante può arrivare…", box:[
  {n:"1", t:"In pronto soccorso", d:"generale", key:true}, {n:"2", t:"In medicina"}, {n:"3", t:"In chirurgia"}]},
{id:"s03", tipo:"anello", tema:"chiaro", sopratitolo:"Il caso: una preeclampsia grave · i collegamenti",
  centro:"17.1", sotto:"un'emergenza che mette in pericolo due vite", voci:LEZIONI},

{id:"s04", tipo:"cifre", tema:"chiaro", sopratitolo:"Lo scenario · Elisa, alla prima gravidanza", voci:[
  {n:"31", suf:"anni", t:"prima gravidanza"},
  {n:"35", suf:"settimane", t:"di gestazione"},
  {n:"22:00", t:"in pronto soccorso", d:"cefalea intensa da ore · «vedo delle lucine»", key:true}]},
{id:"s05", tipo:"cifre", tema:"chiaro", sopratitolo:"Un dolore allo stomaco, «una gastrite» · mani e volto gonfi da due giorni", voci:[
  {n:"170/110", t:"pressione, ripetuta", d:"alla prima misura 168/112", key:true},
  {n:"92", t:"frequenza"}]},
{id:"s06", tipo:"pausa", tema:"chiaro", sopratitolo:"Percepisce i movimenti del bambino", es:"metti in pausa",
  testo:"Perché quel **dolore allo stomaco** non è una gastrite?",
  dati:["proteinuria marcata allo stick", "riflessi rotulei vivaci", "PA 170/110", "35 settimane"]},

{id:"s07", tipo:"misura", tema:"chiaro", sopratitolo:"Il ragionamento · la pressione sistolica",
  min:140, max:180, passo:10, soglia:160, valore:170, direzione:"alto-peggio",
  titolo:"Ipertensione grave dopo la 20ª settimana, con proteinuria: **preeclampsia**", sotto:"Grave da **160/110** in su"},
{id:"s08", tipo:"corpo", tema:"chiaro", lato:"fronte", sopratitolo:"Tutti i segni di gravità · lezione 11.4", voci:[
  {z:"viso", t:"Cefalea intensa", d:"e disturbi visivi"},
  {z:"addome", t:"Dolore epigastrico", key:true},
  {z:"braccia", t:"Edemi improvvisi", d:"mani e volto"},
  {z:"gambe", t:"Riflessi vivaci"}]},
{id:"s09", tipo:"catena", tema:"chiaro", sopratitolo:"Il dolore epigastrico non è una gastrite", passi:[
  {t:"Dolore **epigastrico**"},
  {t:"Il **fegato** coinvolto", d:"come nella sindrome HELLP"},
  {t:"Rischio **imminente**", d:"eclampsia, ictus, distacco di placenta, sofferenza fetale", key:true}]},

{id:"s10", tipo:"icone", tema:"chiaro", sopratitolo:"Le prime azioni", voci:[
  {icona:"semaforo", t:"Alta priorità", d:"il codice di triage"},
  {icona:"telefono", t:"Ginecologo e ostetrica", d:"attivati subito", key:true},
  {icona:"ospedale", t:"Percorso ostetrico", d:"dell'ospedale"}]},
{id:"s11", tipo:"posizioni", tema:"chiaro", sopratitolo:"Ambiente tranquillo: luci soffuse, pochi stimoli · luce e rumore possono favorire le convulsioni · mai sola", voci:[
  {p:"laterale", t:"Decubito laterale **sinistro**", d:"evita la compressione della vena cava", key:true},
  {p:"supina", t:"Supina", d:"da evitare"}]},
{id:"s12", tipo:"griglia", tema:"chiaro", colonne:2, sopratitolo:"Accesso venoso e prelievi", celle:[
  {t:"Emocromo con le **piastrine**", key:true}, {t:"Funzione **epatica**"},
  {t:"**LDH**"}, {t:"Funzione **renale**"}, {t:"**Coagulazione**"}]},
{id:"s13", tipo:"icone", tema:"chiaro", sopratitolo:"Il monitoraggio", voci:[
  {icona:"stetoscopio", t:"Pressione", d:"ogni 15 minuti", key:true},
  {icona:"catetere", t:"Diuresi oraria", d:"catetere secondo indicazione"},
  {icona:"cuore", t:"Benessere fetale", d:"di competenza dell'ostetrica"}]},

{id:"s14", tipo:"figura", tema:"chiaro", illu:"farmaci", sopratitolo:"L'abbassamento della pressione",
  titolo:"Antipertensivi secondo prescrizione: **labetalolo**, **nifedipina**.", sotto:"Riducono il rischio di **ictus** materno, una delle principali cause di morte nella preeclampsia."},
{id:"s15", tipo:"trappola", tema:"chiaro", sopratitolo:"Ma senza farla crollare · si rivaluta dopo ogni dose", righe:[
  {sb:"Un calo brusco", ok:"Riduce la perfusione della **placenta** e danneggia il feto"},
  {sb:"Una misura qualsiasi", ok:"Bracciale **giusto**, braccio all'altezza del cuore"}]},

{id:"s16", tipo:"figura", tema:"chiaro", illu:"pompa", sopratitolo:"Il magnesio solfato · EV secondo prescrizione",
  titolo:"Non è un antipertensivo: **previene e tratta le convulsioni**.", sotto:"Dose di carico, poi infusione continua con **pompa** e **doppio controllo**."},
{id:"s17", sopratitolo:"La sorveglianza della tossicità è infermieristica · i quiz la chiedono sempre", ...MAGNESIO([0], 0)},
{id:"s18", sopratitolo:"Il magnesio in eccesso deprime il respiro · si elimina con il rene", ...MAGNESIO([0,1,2,3], 2)},
{id:"s19", tipo:"figura", tema:"chiaro", illu:"siringa", sopratitolo:"L'antidoto",
  titolo:"**Calcio gluconato**, pronto al letto.", sotto:"Riflessi, respiro, diuresi, calcio gluconato: la sequenza da ricordare."},

{id:"s20", sopratitolo:"Le regole della lezione 8.6 · chiamare aiuto, proteggere dai traumi, nulla in bocca", ...ORARI([0,1], 1)},
{id:"s21", tipo:"tabella", tema:"chiaro", sopratitolo:"La crisi convulsiva: l'eclampsia", colonne:["50%","50%"],
  intestazioni:["Durante", "Al termine"], righe:[
  ["Chiamare **aiuto**", "Decubito **laterale sinistro**"],
  ["Proteggere dai **traumi**", "**Aspirazione** e **ossigeno**"],
  ["**Nulla** in bocca, non trattenere", "Magnesio secondo prescrizione"],
  ["**Cronometrare**", "Monitoraggio della madre e del **feto**"]], chiave:[2]},
{id:"s22", sopratitolo:"Un concetto fondamentale · di solito dopo aver stabilizzato la madre", ...ORARI([0,1,2,3], 3)},

{id:"s23", sopratitolo:"Approfondimento · la sindrome HELLP, una forma grave della preeclampsia · un acronimo inglese", ...HELLP},
{id:"s24", tipo:"corpo", tema:"chiaro", lato:"fronte", sopratitolo:"I sintomi: spesso proprio quelli di Elisa · facilmente scambiati per un problema digestivo", voci:[
  {z:"addome", t:"Dolore epigastrico", d:"o all'ipocondrio destro", key:true},
  {z:"viso", t:"Nausea, vomito"},
  {z:["torace","braccia","gambe"], t:"Malessere generale"}]},
{id:"s25", tipo:"raggiera", tema:"chiaro", sopratitolo:"Anche con pressione non altissima, anche dopo il parto · negli esami: piastrine e funzione epatica", centro:"HELLP", raggi:[
  {t:"Emorragie", key:true}, {t:"Fegato", d:"rischio di rottura"}, {t:"Coagulopatia"}]},

{id:"s26", tipo:"frase", tema:"chiaro", sopratitolo:"Dopo il parto",
  testo:"La preeclampsia non finisce sempre con la **nascita**.",
  sotto:"Può persistere, o comparire nei giorni successivi."},
{id:"s27", tipo:"cifre", tema:"chiaro", sopratitolo:"Magnesio e sorveglianza proseguono secondo prescrizione", voci:[
  {n:"24", suf:"ore", t:"spesso", d:"pressione, diuresi, segni neurologici, dolore epigastrico", key:true}]},
{id:"s28", tipo:"confronto", tema:"chiaro", sopratitolo:"Lo vedremo nel prossimo caso · allattamento secondo indicazione", col:[
  {h:"Rischio maggiore", t:"**emorragia post-partum**: piastrine basse, e il magnesio rilassa l'utero"},
  {h:"Allattamento", t:"compatibile con la maggior parte degli **antipertensivi**"}]},

{id:"s29", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"L'educazione · i segni d'allarme in gravidanza", celle:[
  {n:"1", t:"Cefalea **intensa**"}, {n:"2", t:"Disturbi **visivi**"},
  {n:"3", t:"Dolore **epigastrico**"}, {n:"4", t:"Gonfiore **improvviso**"},
  {n:"5", t:"Meno **movimenti** del bambino", key:true}]},
{id:"s30", tipo:"icone", tema:"chiaro", sopratitolo:"La prevenzione", voci:[
  {icona:"ospedale", t:"Subito in ospedale", d:"senza aspettare il controllo programmato", key:true},
  {icona:"pillola", t:"Acido acetilsalicilico a basse dosi", d:"alto rischio, su prescrizione, già nelle prime fasi"}]},
{id:"s31", tipo:"frase", tema:"chiaro", sopratitolo:"E dopo, nel lungo periodo",
  testo:"Dopo una preeclampsia il rischio **cardiovascolare** resta aumentato.",
  sotto:"Controlli della pressione · sorveglianza nelle gravidanze successive."},

{id:"s32", tipo:"confronto", tema:"chiaro", sopratitolo:"Una precisazione sui ruoli", col:[
  {h:"Ostetrica", t:"gravidanza, parto, puerperio · un **profilo professionale specifico**"},
  {h:"Infermiere", t:"**riconosce** l'emergenza e **attiva** il percorso"}]},
{id:"s33", tipo:"figura", tema:"chiaro", illu:"occhio", sopratitolo:"Collabora nell'emergenza e nella terapia, secondo i propri ambiti",
  titolo:"Fuori dal blocco parto è spesso **il primo** a vederla.", sotto:"Pronto soccorso, medicina, chirurgia: questi segni sono sua competenza."},

{id:"s34", tipo:"tabella", tema:"chiaro", sopratitolo:"Gli errori da evitare · all'arrivo", colonne:["55%","45%"],
  intestazioni:["Errore", "Invece"], righe:[
  ["no:Dolore epigastrico = «gastrite»", "pensare alla **preeclampsia**"],
  ["no:Attesa in sala d'attesa", "**alta priorità**"],
  ["no:Posizione supina", "decubito **laterale sinistro**"],
  ["no:Abbassare la pressione bruscamente", "**senza** cali bruschi"]], chiave:[0]},
{id:"s35", tipo:"tabella", tema:"chiaro", sopratitolo:"Gli errori da evitare · il magnesio e dopo", colonne:["55%","45%"],
  intestazioni:["Errore", "Invece"], righe:[
  ["no:Magnesio senza pompa né sorveglianza", "**pompa** · riflessi, respiro, diuresi"],
  ["no:Calcio gluconato non disponibile", "**pronto** al letto"],
  ["no:«Con il parto è finito»", "sorveglianza **dopo il parto**"]], chiave:[0]},

{id:"s36", sopratitolo:"D1 · «Quali sono i segni di gravità della preeclampsia?»", ...GRAVITA([0,1,2,3], -1)},
{id:"s37", sopratitolo:"D1 · le convulsioni definiscono l'eclampsia", ...GRAVITA([0,1,2,3,4,5,6,7], 7)},
{id:"s38", sopratitolo:"D2 · «Come si sorveglia una paziente in terapia con magnesio solfato?»", ...MAGNESIO([0,1,2,3,4], 4)},
{id:"s39", sopratitolo:"D3 · «Che cos'è la sindrome HELLP?» · spesso con dolore epigastrico · anche dopo il parto", ...HELLP},

{id:"s40", sopratitolo:"La risposta modello, in 15 righe", ...RISPOSTA([0])},
{id:"s41", sopratitolo:"La risposta modello · la priorità e la posizione", ...RISPOSTA([0,1,2])},
{id:"s42", sopratitolo:"La risposta modello · la terapia e la sorveglianza", ...RISPOSTA([0,1,2,3,4])},
{id:"s43", sopratitolo:"La risposta modello · la convulsione e il dopo", ...RISPOSTA([0,1,2,3,4,5,6])},

{id:"s44", tipo:"tre", tema:"chiaro", sopratitolo:"I collegamenti", box:[
  {n:"5.3", t:"Calcoli e pompe"}, {n:"8.6", t:"Crisi convulsiva"},
  {n:"10.1", t:"Triage"}, {n:"11.4", t:"Area materno-infantile", key:true}]},
{id:"s45", tipo:"tre", tema:"chiaro", sopratitolo:"I collegamenti", box:[
  {n:"14.5", t:"Riflessi"}, {n:"10.4", t:"Emorragia post-partum"},
  {n:"17.2", t:"Il prossimo caso", key:true}]},

{id:"s46", tipo:"percorso", tema:"chiaro", sopratitolo:"In Veneto · il percorso nascita regionale", tappe:[
  {t:"Gravidanza ad alto rischio"},
  {t:"Rete dei punti nascita"},
  {t:"Centro con terapia intensiva neonatale", key:true}]},
{id:"s47", tipo:"frase", tema:"chiaro", sopratitolo:"Quando possibile",
  testo:"Il **trasporto in utero**: si trasferisce la madre prima del parto.",
  sotto:"È più sicuro per il neonato. E i consultori familiari seguono la gravidanza sul territorio."},

{id:"s48", tipo:"titolo", tema:"profondo",
  titolo:"Mal di testa e mal di stomaco<br>con la pressione alta<br>**non sono disturbi minori**.",
  sotto:"In gravidanza · la frase del caso."},

{id:"s49", tipo:"tre", tema:"chiaro", sopratitolo:"Nella prossima lezione", box:[
  {n:"1", t:"Un'emorragia", d:"nelle due ore dopo il parto"}, {n:"2", t:"Le quattro T", key:true},
  {n:"3", t:"Il neonato", d:"che nel frattempo ha bisogno di qualcuno"}]},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione · 17.2",
  titolo:"L'emorragia post-partum<br>e il neonato", sottotitolo:"Le quattro T, le azioni in sequenza, il neonato",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
