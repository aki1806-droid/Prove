// Contenuto delle 50 scene della lezione 16.9 — nutrizione enterale, polmonite
// da inalazione e rialimentazione. La notte del signor Ottavio è un percorso
// che si accende; la posizione si vede nel letto di lato; la prevenzione,
// il rischio di rialimentazione e la seconda domanda si riempiono a scalare;
// le sonde stanno nel corpo «vie»; errori e risposta modello in tabella.

const NOTTE = (att, k) => ({tipo:"percorso", tema:"chiaro", tappe:[
  {t:"Ieri", d:"sondino naso-gastrico", key:k===0},
  {t:"In serata", d:"nutrizione avviata a velocità piena", key:k===1},
  {t:"Di notte", d:"agitato, a lungo quasi sdraiato", key:k===2},
  {t:"Ore 6", d:"tosse, desaturazione, febbre", key:k===3}], attive:att});

const PREV = (att) => ({tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, celle:[
  {t:"**Verifica** del sondino: prima di ogni avvio, dopo tosse, vomito o agitazione, a ogni turno"},
  {t:"Infusione con **pompa**, alla velocità prescritta"},
  {t:"**Ristagno** gastrico secondo protocollo"},
  {t:"**Igiene del cavo orale**: la bocca colonizzata è la fonte dei batteri inalati", key:true},
  {t:"Sorvegliare **distensione** e vomito"},
  {t:"**Niente** sedazione eccessiva"},
  {t:"Paziente agitato: sorveglianza e fissaggio sicuro, **non contenzione**"}], attive:att});

const PREVR = (att) => ({tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, celle:[
  {t:"Avvio **lento** e progressivo dell'apporto calorico", key:true},
  {t:"**Tiamina** prima e durante"},
  {t:"**Fosfato, potassio, magnesio** dosati e corretti · controlli giornalieri nei primi giorni"},
  {t:"**Bilancio** e peso"},
  {t:"**Monitoraggio cardiaco** nei casi gravi"}], attive:att});

const D2 = (att) => ({tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, celle:[
  {t:"Testata **30–45°** durante e dopo", key:true}, {t:"**Verifica** del sondino"}, {t:"Infusione con **pompa**"},
  {t:"Controllo del **ristagno**"}, {t:"**Igiene** orale"}, {t:"Distensione e **vomito**"}], attive:att});

const COLL = (att) => ({tipo:"griglia", tema:"chiaro", colonne:3, celle:[
  {n:"3.3", t:"Nutrizione e disfagia"}, {n:"3.4", t:"Sondino e nutrizione enterale"}, {n:"3.5", t:"Elettroliti"},
  {n:"11.2", t:"Demenza"}, {n:"1.6", t:"Legge 219 e consenso"}, {n:"3.1", t:"Prevenzione della polmonite"}], attive:att});

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 16 · Casi clinici avanzati",
  titolo:"La nutrizione<br>enterale", sottotitolo:"16.9 · Polmonite da inalazione e rialimentazione",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"bivio", tema:"chiaro", sopratitolo:"Micro-lezione 9 di 12 · un sondino, una pompa, una sacca",
  radice:"Sembra un'attività di routine", rami:[
  {q:"nasconde", t:"La polmonite da inalazione"},
  {q:"e", t:"La sindrome da rialimentazione", key:true}]},
{id:"s03", tipo:"figura", tema:"chiaro", sopratitolo:"La seconda la conoscono in pochi · i concorsi la chiedono sempre più spesso", illu:"bilancia",
  titolo:"E una domanda<br>**etica**.", sotto:"Quando il paziente ha una demenza avanzata."},
{id:"s04", tipo:"tre", tema:"chiaro", sopratitolo:"Le lezioni che servono", box:[
  {n:"3.3", t:"Nutrizione", d:"e disfagia"}, {n:"3.4", t:"Enterale", d:"il sondino", key:true}, {n:"3.5", t:"Elettroliti"},
  {n:"11.2", t:"Demenza"}, {n:"1.6", t:"Consenso", d:"legge 219"}]},

{id:"s05", tipo:"cifre", tema:"chiaro", sopratitolo:"Lo scenario · signor Ottavio · ricoverato per disfagia grave e calo di peso", voci:[
  {n:"79", suf:"anni", t:"Demenza moderata"},
  {n:"16", t:"Indice di massa corporea", d:"da oltre due settimane mangia pochissimo", key:true}]},
{id:"s06", sopratitolo:"Avviata direttamente alla velocità piena", ...NOTTE([0,1,2], 1)},
{id:"s07", tipo:"cifre", tema:"chiaro", sopratitolo:"Ore 6 · tosse insistente, rantoli alla base destra, residui di nutrizione nel cavo orale", voci:[
  {n:"89", suf:"%", t:"SpO₂", key:true}, {n:"38,4", suf:"°C", t:"Temperatura"}, {n:"28", t:"FR", d:"atti al minuto"}]},
{id:"s08", tipo:"pausa", tema:"chiaro", sopratitolo:"Ore 6", es:"metti in pausa",
  testo:"Che cosa è **successo**? E quale **secondo rischio** ti preoccupa nei prossimi giorni?",
  dati:["BMI 16", "velocità piena", "quasi sdraiato", "residui in bocca"]},

{id:"s09", tipo:"raggiera", tema:"chiaro", sopratitolo:"Il ragionamento · tosse, febbre, desaturazione, rantoli: polmonite da inalazione", centro:"Inalazione",
  raggi:[{t:"Disfagia"}, {t:"Demenza"}, {t:"Supino", key:true}, {t:"Agitazione"}, {t:"Sondino?"}, {t:"Residui"}]},
{id:"s10", tipo:"catena", tema:"chiaro", sopratitolo:"Il secondo rischio · meno evidente, altrettanto grave", passi:[
  {t:"Gravemente **malnutrito**", d:"BMI 16"},
  {t:"Nutrizione a **pieno regime**", d:"dalla prima sera"},
  {t:"Sindrome da **rialimentazione**", key:true}]},

{id:"s11", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"Le prime azioni", celle:[
  {t:"**Sospendere** la nutrizione", key:true}, {t:"**Semiseduto** · laterale se vomita"}, {t:"**Aspirare** cavo orale e faringe"},
  {t:"**Ossigeno** secondo protocollo"}, {t:"Medico con lo **SBAR**"}, {t:"Parametri e **monitoraggio**"}]},
{id:"s12", tipo:"figura", tema:"chiaro", sopratitolo:"Verificare la posizione del sondino · le regole della lezione 3.4", illu:"ph",
  titolo:"pH dell'aspirato<br>**≤ 5,5**", sotto:"e i centimetri segnati alla narice."},
{id:"s13", tipo:"trappola", tema:"chiaro", sopratitolo:"Poi prelievi, eventuale radiografia del torace, antibiotico secondo prescrizione", righe:[
  {sb:"Il «whoosh»", ok:"auscultare l'aria insufflata **non** è affidabile · nel dubbio, la conferma **radiologica**"}]},

{id:"s14", tipo:"posizioni", tema:"chiaro", sopratitolo:"La prevenzione · in gran parte infermieristica", voci:[
  {p:"supina", t:"Quasi sdraiato", d:"ciò che è mancato, di notte"},
  {p:"semifowler", t:"Testata alzata", d:"30–45° durante l'infusione e per 30–60 minuti dopo · anche di notte", key:true}]},
{id:"s15", sopratitolo:"La prevenzione dell'inalazione", ...PREV([0,1,2])},
{id:"s16", sopratitolo:"La prevenzione dell'inalazione", ...PREV([0,1,2,3,4,5,6])},

{id:"s17", tipo:"catena", tema:"chiaro", sopratitolo:"La sindrome da rialimentazione · che cos'è", passi:[
  {t:"Paziente gravemente **malnutrito**"},
  {t:"Ripresa **improvvisa** dei carboidrati"},
  {t:"Si stimola l'**insulina**", key:true}]},
{id:"s18", tipo:"tre", tema:"chiaro", sopratitolo:"L'insulina li fa entrare rapidamente nelle cellule · nel sangue crollano, nei primi giorni", box:[
  {n:"↓", t:"Fosfato", key:true}, {n:"↓", t:"Potassio"}, {n:"↓", t:"Magnesio"}]},
{id:"s19", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Una complicanza della nutrizione, non della malattia: è prevenibile", celle:[
  {n:"1", t:"**Aritmie**"}, {n:"2", t:"Insufficienza **cardiaca**"}, {n:"3", t:"**Edemi**"},
  {n:"4", t:"Debolezza dei muscoli **respiratori**"}, {n:"5", t:"**Confusione**"}, {n:"6", t:"**Convulsioni**"},
  {n:"7", t:"Fino alla **morte**"}]},

{id:"s20", tipo:"cifre", tema:"chiaro", sopratitolo:"Chi è a rischio · uno o più criteri, o elettroliti già bassi", voci:[
  {n:"16", t:"Indice di massa corporea", d:"sotto 16", key:true},
  {n:"15", suf:"%", t:"Calo involontario", d:"oltre il 15% in 3–6 mesi"},
  {n:"10", suf:"giorni", t:"Apporto minimo o nullo", d:"da più di 10 giorni"}]},
{id:"s21", sopratitolo:"Il signor Ottavio era a rischio elevato · la prevenzione, secondo prescrizione e protocollo", ...PREVR([0,1])},
{id:"s22", sopratitolo:"Avviarla a pieno regime, come è stato fatto, era un errore", ...PREVR([0,1,2,3,4])},

{id:"s23", tipo:"cifre", tema:"chiaro", sopratitolo:"Il terzo giorno · la nutrizione era stata ripresa più lentamente", voci:[
  {n:"0,5", suf:"mmol/L", t:"Fosfato", d:"molto basso", key:true}, {n:"2,9", t:"Potassio"}, {n:"↓", t:"Magnesio", d:"basso"}]},
{id:"s24", tipo:"icone", tema:"chiaro", sopratitolo:"È una sindrome da rialimentazione · segnalare subito, ridurre l'apporto secondo prescrizione", voci:[
  {icona:"cuore", t:"Tachicardico"}, {icona:"goccia", t:"Edematoso"},
  {icona:"persona", t:"Più debole"}, {icona:"avviso", t:"Più confuso", key:true}]},
{id:"s25", tipo:"catena", tema:"chiaro", sopratitolo:"E si interviene", passi:[
  {t:"Elettroliti **EV**", d:"con la pompa · il potassio mai in bolo", key:true},
  {t:"Monitoraggio **ECG**"},
  {t:"Servizio di **nutrizione clinica**"}]},

{id:"s26", tipo:"norma", tema:"chiaro", sopratitolo:"Approfondimento · la decisione sulla nutrizione artificiale", etichetta:"Legge 219/2017", sigla:"L. 219",
  testo:"La nutrizione artificiale è un **trattamento sanitario**: richiede il consenso, e può essere rifiutata."},
{id:"s27", tipo:"icone", tema:"chiaro", sopratitolo:"Nella persona con demenza si considerano", voci:[
  {icona:"documento", t:"Disposizioni anticipate"}, {icona:"chat", t:"Pianificazione condivisa"},
  {icona:"persona", t:"Fiduciario", d:"o amministratore di sostegno", key:true}, {icona:"persone", t:"Familiari"}]},
{id:"s28", tipo:"tre", tema:"chiaro", sopratitolo:"Nutrizione per sonda nella demenza avanzata · le evidenze disponibili", box:[
  {n:"×", t:"Sopravvivenza", d:"nessun beneficio chiaro"},
  {n:"×", t:"Prevenzione dell'inalazione", d:"nessun beneficio chiaro", key:true}]},
{id:"s29", tipo:"figura", tema:"chiaro", sopratitolo:"L'alternativa · una decisione condivisa, documentata, rivalutata", illu:"beccuccio", lato:"dx",
  titolo:"Alimentazione<br>**di confort**", sotto:"Piccole quantità di cibi graditi, consistenze adatte, aiuto al pasto. L'infermiere porta la conoscenza quotidiana della persona."},

{id:"s30", tipo:"vie", tema:"chiaro", sopratitolo:"Se la nutrizione proseguirà a lungo", voci:[
  {k:"sng", t:"Sondino naso-gastrico", d:"per periodi brevi"},
  {k:"peg", t:"Gastrostomia · PEG", d:"oltre alcune settimane · cura della stomia, mobilizzazione, lavaggi", key:true}]},
{id:"s31", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Per entrambi i dispositivi · i farmaci", celle:[
  {t:"Forme **adatte**"}, {t:"Frantumare le forme a **rilascio modificato**", no:true},
  {t:"**Lavaggio** prima e dopo ogni farmaco"}, {t:"A casa: educare il **caregiver**", key:true}]},

{id:"s32", tipo:"icone", tema:"chiaro", sopratitolo:"Un passo indietro · la valutazione nutrizionale", voci:[
  {icona:"documento", t:"Screening all'ingresso", d:"MUST o strumenti aziendali", key:true},
  {icona:"bilancia", t:"Peso, altezza, BMI"}, {icona:"cartella", t:"Calo di peso e apporto"}]},
{id:"s33", tipo:"frase", tema:"chiaro", sopratitolo:"Deglutizione · dietista e nutrizione clinica · apporti registrati",
  testo:"La malnutrizione si **cerca**, non si aspetta che si manifesti.", sotto:"Il signor Ottavio era malnutrito da settimane."},

{id:"s34", tipo:"tabella", tema:"chiaro", sopratitolo:"Gli errori da evitare · l'inalazione", colonne:["52%","48%"],
  intestazioni:["Errore", "Invece"], righe:[
  ["no:Nutrizione in posizione supina", "testata a **30–45°**"],
  ["no:Non verificare dopo agitazione o tosse", "verifica **a ogni** evento"],
  ["no:Verificare con il «whoosh»", "**pH** e centimetri · RX se dubbio"]], chiave:[0]},
{id:"s35", tipo:"tabella", tema:"chiaro", sopratitolo:"Gli errori da evitare · la rialimentazione e la decisione", colonne:["52%","48%"],
  intestazioni:["Errore", "Invece"], righe:[
  ["no:Pieno regime in un malnutrito grave", "avvio **lento**"],
  ["no:Dimenticare tiamina ed elettroliti", "**tiamina** · fosfato, potassio, magnesio"],
  ["no:Potassio senza pompa", "**pompa**, mai in bolo"],
  ["no:Nutrizione artificiale come atto «dovuto»", "decisione **condivisa**"]], chiave:[0]},

{id:"s36", tipo:"catena", tema:"chiaro", sopratitolo:"D1 · «Come si verifica il corretto posizionamento di un sondino naso-gastrico?»", passi:[
  {t:"Conferma **radiologica**", d:"dopo il posizionamento, quando prevista"},
  {t:"**Centimetri** alla narice"},
  {t:"**pH** dell'aspirato ≤ 5,5", key:true}]},
{id:"s37", sopratitolo:"D1 · l'aria auscultata non è affidabile · D2: «Come si previene l'inalazione?»", ...D2([0,1,2])},
{id:"s38", sopratitolo:"D2 · poi D3: «Che cos'è la sindrome da rialimentazione?» · fosfato, potassio, magnesio crollano", ...D2([0,1,2,3,4,5])},
{id:"s39", tipo:"tre", tema:"chiaro", sopratitolo:"D3 · chi è a rischio", box:[
  {n:"BMI", t:"Sotto 16", key:true}, {n:"Peso", t:"Un forte calo"}, {n:"Apporto", t:"Minimo da oltre 10 giorni"}]},

{id:"s40", tipo:"citazione", tema:"chiaro", sopratitolo:"La risposta modello · 1",
  testo:"Demenza, disfagia e grave malnutrizione; nutrizione enterale a **pieno regime**, mantenuto **supino**; tosse, febbre, desaturazione, rantoli e residui in bocca.",
  fonte:"Chi è · che cosa è successo"},
{id:"s41", tipo:"tabella", tema:"chiaro", sopratitolo:"La risposta modello · 2", colonne:["28%","72%"],
  intestazioni:["Passo", "Che cosa scrivo"], righe:[
  ["Ipotesi", "sospetta **polmonite da inalazione**"],
  ["Subito", "sospendo la nutrizione · semiseduto · aspiro · ossigeno · medico"],
  ["Sondino", "verifico la posizione · collaboro alla terapia prescritta"]], chiave:[1]},
{id:"s42", tipo:"tabella", tema:"chiaro", sopratitolo:"La risposta modello · 3", colonne:["28%","72%"],
  intestazioni:["Passo", "Che cosa scrivo"], righe:[
  ["Prevenzione", "testata **30–45°** · sondino a ogni avvio e dopo agitazione · pompa · igiene orale"],
  ["Riconosco", "l'alto rischio di **sindrome da rialimentazione**"]], chiave:[1]},
{id:"s43", tipo:"tabella", tema:"chiaro", sopratitolo:"La risposta modello · 4", colonne:["28%","72%"],
  intestazioni:["Passo", "Che cosa scrivo"], righe:[
  ["Segnalo", "avvio **lento** · tiamina · fosfato, potassio, magnesio"],
  ["Partecipo", "alla **decisione condivisa** sulla nutrizione artificiale"],
  ["Documento", "ogni passaggio"]], chiave:[1]},

{id:"s44", sopratitolo:"I collegamenti", ...COLL([0,1,2])},
{id:"s45", sopratitolo:"I collegamenti", ...COLL([0,1,2,3,4,5])},

{id:"s46", tipo:"icone", tema:"chiaro", sopratitolo:"La notte, il punto critico · la nutrizione notturna ha le stesse regole del giorno", voci:[
  {icona:"luna", t:"Personale ridotto"}, {icona:"letto", t:"Pazienti che scivolano nel letto", key:true},
  {icona:"avviso", t:"Più agitazione"}]},
{id:"s47", tipo:"colonne", tema:"chiaro", sopratitolo:"Le consegne, e che cosa si attribuisce", colonne:[
  {h:"Le consegne", voci:[{t:"Velocità"}, {t:"Verifica del sondino"}, {t:"Posizione"}, {t:"Ristagno"}]},
  {h:"All'OSS", key:true, voci:[{t:"Il riposizionamento", d:"con istruzioni chiare"}, {t:"Testata **sollevata**"}, {t:"Segnalare **subito** tosse o vomito"}]}]},

{id:"s48", tipo:"titolo", tema:"profondo",
  titolo:"Nutrire bene significa<br>anche nutrire **piano**,<br>e nella posizione giusta.",
  sotto:"La frase del caso."},

{id:"s49", tipo:"tre", tema:"chiaro", sopratitolo:"Nella prossima lezione · un'intera famiglia, una mattina d'inverno", box:[
  {n:"1", t:"Mal di testa e nausea"}, {n:"2", t:"Saturazioni perfette"}, {n:"3", t:"Un nemico invisibile", key:true}]},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione · 16.10",
  titolo:"Una famiglia<br>intossicata", sottotitolo:"Il monossido di carbonio",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
