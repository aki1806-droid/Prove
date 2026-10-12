// Contenuto delle 50 scene della lezione 17.10 — la paziente straniera:
// mediazione, consenso, cultura. La barriera linguistica è una raggiera con
// quattro rischi; il percorso chirurgico tappe che si accendono; il digiuno
// religioso i rischi e le due regole; il diritto alle cure un bivio (SSN o
// STP); gli errori in tabella; la risposta modello un promemoria che si
// scrive riga per riga.

const LEZIONI = [
  {n:"1.6", t:"Consenso · L. 219", illu:"cartella"},
  {n:"1.7", t:"Riservatezza", illu:"scudo"},
  {n:"2.7", t:"Comunicazione", illu:"dialogo"},
  {n:"8.3", t:"Diabete", illu:"goccia2"},
  {n:"9.7", t:"Dimissione", illu:"casa"}];

const CHIRURGIA = (att, k) => ({tipo:"percorso", tema:"chiaro", attive:att, tappe:[
  {t:"Preparazione", d:"con il mediatore: orari del digiuno, igiene, gioielli e oggetti religiosi, protesi", key:k===0},
  {t:"Consenso all'anestesia", d:"con il mediatore", key:k===1},
  {t:"Il diabete", d:"ADO e insulina basale secondo prescrizione · glicemie · lezione 9.2", key:k===2},
  {t:"Post-operatorio", d:"dolore con scala visiva · cartelli: acqua, bagno, dolore, nausea", key:k===3}]});

const RISPOSTA = (att) => ({tipo:"memo", tema:"chiaro", attive:att, voci:[
  "**Inquadramento**: straniera, poco italiano, diabetica, colecistectomia · figlio minore che traduce, marito che risponde · **digiuno** religioso",
  "**Mediatore** linguistico-culturale · il minore **non** fa da interprete",
  "Mi rivolgo alla **paziente**, titolare del consenso · colloquio **in privato**",
  "Con il mediatore: anamnesi, consenso, bisogni **culturali e religiosi**",
  "Dolore con **scale visive** · cartelli illustrati · diabete **secondo prescrizione**",
  "Digiuno affrontato **senza giudizio**, con medico e diabetologo",
  "Dimissione con mediatore e **teach-back** · documentazione"]});

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 17 · Casi clinici avanzati",
  titolo:"La paziente<br>straniera", sottotitolo:"17.10 · Mediazione, consenso, cultura",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"icone", tema:"chiaro", sopratitolo:"Micro-lezione 10 di 12 · temi d'orale di deontologia e comunicazione", voci:[
  {icona:"chat", t:"La mediazione", d:"linguistica e culturale", key:true},
  {icona:"documento", t:"Il consenso", d:"di chi parla poco l'italiano"}]},
{id:"s03", tipo:"anello", tema:"chiaro", sopratitolo:"Le convinzioni religiose, un'educazione che funzioni · i collegamenti",
  centro:"17.10", sotto:"convinzioni religiose ed educazione terapeutica", voci:LEZIONI},

{id:"s04", tipo:"cifre", tema:"chiaro", sopratitolo:"Lo scenario · la signora Nadia", voci:[
  {n:"39", suf:"anni", t:"in Italia da un anno", d:"parla soprattutto **arabo**, capisce poche parole di italiano", key:true},
  {n:"DM2", t:"diabete di tipo 2", d:"antidiabetici orali e **insulina basale**"}]},
{id:"s05", tipo:"icone", tema:"chiaro", sopratitolo:"Ricoverata per una colecistectomia programmata · all'ingresso", voci:[
  {icona:"persona", t:"Il figlio, 12 anni", d:"«traduce tutto»", key:true},
  {icona:"persone", t:"Il marito", d:"risponde alle domande **al posto suo**", key:true}]},
{id:"s06", tipo:"pausa", tema:"chiaro", sopratitolo:"Il mese del digiuno religioso comincia fra due settimane: lei vuole osservarlo", es:"metti in pausa",
  testo:"Quali problemi vedi, **al di là** della colecistectomia?",
  dati:["parla arabo", "il figlio traduce", "il marito risponde", "digiuno fra 2 settimane"]},

{id:"s07", tipo:"raggiera", tema:"chiaro", sopratitolo:"Il ragionamento · la barriera linguistica mette a rischio", centro:"Lingua",
  raggi:[{t:"Accertamento"}, {t:"Consenso", key:true}, {t:"Sicurezza"}, {t:"Educazione"}]},
{id:"s08", tipo:"trappola", tema:"chiaro", sopratitolo:"Due situazioni da riconoscere subito", righe:[
  {sb:"Il figlio di 12 anni come interprete", ok:"**Inadeguato**: accuratezza, riservatezza, carico emotivo"},
  {sb:"Il marito risponde per lei", ok:"La titolare dell'informazione e del consenso è **lei**"}]},
{id:"s09", tipo:"catena", tema:"chiaro", sopratitolo:"E la cultura incide su espressione del dolore, pudore, alimentazione", passi:[
  {t:"**Digiuno** religioso"},
  {t:"Diabete in terapia **ipoglicemizzante**"},
  {t:"**Ipoglicemia**", d:"dopo la dimissione", key:true}]},

{id:"s10", tipo:"colonne", tema:"chiaro", sopratitolo:"La mediazione · il mediatore linguistico-culturale, secondo le procedure aziendali", colonne:[
  {h:"Come", voci:[{t:"In presenza"}, {t:"Al telefono"}, {t:"In videochiamata"}]},
  {h:"Per che cosa", key:true, voci:[{t:"Anamnesi"}, {t:"**Consenso**"}, {t:"Informazioni importanti"}, {t:"Educazione"}, {t:"Dimissione"}]}]},
{id:"s11", tipo:"griglia", tema:"chiaro", colonne:1, sopratitolo:"Chi non fa da interprete · possono filtrare o modificare le informazioni", celle:[
  {no:true, t:"**Minori**, mai"},
  {no:true, t:"**Familiari e conoscenti**, per i contenuti clinici"}]},
{id:"s12", tipo:"figura", tema:"chiaro", illu:"dialogo", sopratitolo:"Come si parla, con il mediatore",
  titolo:"Si parla **alla paziente**, guardandola, non al mediatore.", sotto:"Frasi brevi · verifica della comprensione · materiali tradotti e illustrati"},
{id:"s13", tipo:"confronto", tema:"chiaro", sopratitolo:"Immagini e applicazioni di traduzione", col:[
  {h:"Comunicazioni quotidiane semplici", t:"sì, **con prudenza**"},
  {h:"Informazioni cliniche importanti", t:"**mai**"}]},

{id:"s14", tipo:"norma", tema:"chiaro", sopratitolo:"Il consenso e l'autonomia della paziente",
  etichetta:"Lezione 1.6", sigla:"L. 219/2017", testo:"Titolare è la **paziente**, maggiorenne e capace: informata nella **sua lingua**, tramite il mediatore."},
{id:"s15", tipo:"figura", tema:"chiaro", illu:"ascolto", sopratitolo:"Il coinvolgimento dei familiari",
  titolo:"Se e quanto coinvolgerli, **lo sceglie lei**.", sotto:"Molte persone lo desiderano: è un loro diritto. Per saperlo bisogna chiederglielo, anche in privato."},
{id:"s16", tipo:"griglia", tema:"chiaro", colonne:1, sopratitolo:"Il colloquio e la documentazione", celle:[
  {t:"Un colloquio **in privato**, per esprimersi liberamente"},
  {t:"Rispetto della **cultura**, senza rinunciare ai **diritti** individuali"},
  {t:"**Documentare** la presenza del mediatore"}]},

{id:"s17", tipo:"frase", tema:"chiaro", sopratitolo:"Le attenzioni culturali e religiose · la regola",
  testo:"Chiedere, **non presumere**.",
  sotto:"«C'è qualcosa che per lei è importante durante il ricovero?»"},
{id:"s18", tipo:"icone", tema:"chiaro", sopratitolo:"Quello che spesso emerge", voci:[
  {icona:"paravento", t:"Il pudore", d:"un operatore dello stesso sesso nelle cure intime, quando possibile", key:true},
  {icona:"bicchiere", t:"L'alimentazione", d:"prescrizioni religiose da conoscere, una dieta adeguata"}]},
{id:"s19", tipo:"griglia", tema:"chiaro", colonne:2, sopratitolo:"E ancora · il dolore si esprime in modi diversi nelle diverse culture", celle:[
  {t:"La **preghiera**"}, {t:"Gli **oggetti** religiosi"}, {t:"Le **visite**"},
  {t:"Il **dolore**: scale adatte, come quella delle **facce**, non stereotipi"}]},
{id:"s20", tipo:"norma", tema:"chiaro", sopratitolo:"Un dovere, non una cortesia",
  etichetta:"Lezione 1.4", sigla:"Codice deontologico", testo:"Il rispetto delle convinzioni è un **dovere deontologico**."},

{id:"s21", sopratitolo:"Il percorso chirurgico · la preparazione si spiega con il mediatore", ...CHIRURGIA([0,1], 0)},
{id:"s22", sopratitolo:"Il diabete nel perioperatorio · secondo prescrizione, come nella lezione 9.2", ...CHIRURGIA([0,1,2], 2)},
{id:"s23", sopratitolo:"Nel post-operatorio · i cartelli illustrati le permettono di comunicare anche di notte", ...CHIRURGIA([0,1,2,3], 3)},

{id:"s24", tipo:"confronto", tema:"chiaro", sopratitolo:"Il digiuno religioso e il diabete", col:[
  {h:"Secondo molte interpretazioni religiose", t:"le persone malate sono **esentate**"},
  {h:"Ma la scelta", t:"resta **personale**"}],
  sotto:"Molte persone con diabete desiderano comunque osservarlo."},
{id:"s25", tipo:"tre", tema:"chiaro", sopratitolo:"Non giudicare, non imporre: informare sui rischi · medico e diabetologo adattano dosi e orari", box:[
  {n:"1", t:"Ipoglicemia", key:true}, {n:"2", t:"Disidratazione"}, {n:"3", t:"Iperglicemia", d:"nei pasti serali"}]},
{id:"s26", tipo:"icone", tema:"chiaro", sopratitolo:"Le due regole da insegnare", voci:[
  {icona:"goccia", t:"Automonitoraggio più frequente", d:"misurare la glicemia non interrompe il digiuno, secondo le interpretazioni prevalenti"},
  {icona:"avviso", t:"Interrompere il digiuno", d:"in caso di ipoglicemia o malessere", key:true}]},
{id:"s27", tipo:"frase", tema:"chiaro", sopratitolo:"Subito dopo un intervento: con il medico si valuta se rinviarlo · lezione 11.6",
  testo:"Il colloquio motivazionale, applicato a una **scelta di fede**."},

{id:"s28", tipo:"figura", tema:"chiaro", illu:"scudo", sopratitolo:"Approfondimento · il diritto alle cure",
  titolo:"L'assistenza sanitaria è **garantita**.", sotto:"Indipendentemente dalla nazionalità e dalla condizione della persona."},
{id:"s29", tipo:"bivio", tema:"chiaro", sopratitolo:"Il cittadino straniero e il Servizio Sanitario Nazionale", radice:"Straniero", rami:[
  {q:"regolarmente presente", t:"Iscrizione al SSN", d:"secondo la normativa"},
  {q:"temporaneamente presente, non iscritto", t:"Codice STP", d:"cure urgenti ed essenziali", key:true}]},
{id:"s30", tipo:"griglia", tema:"chiaro", colonne:1, sopratitolo:"Il compito del personale sanitario", celle:[
  {no:true, t:"Controllare la condizione **amministrativa** della persona"},
  {t:"**Curare**"},
  {t:"Il Codice deontologico: **nessuna discriminazione**"}]},

{id:"s31", tipo:"griglia", tema:"chiaro", colonne:2, sopratitolo:"La dimissione, costruita con il mediatore · l'educazione", celle:[
  {t:"La **ferita** e i segni di infezione"}, {t:"L'**alimentazione** dopo la colecistectomia"},
  {t:"La **terapia** per il diabete"}, {t:"Materiale **tradotto** e illustrato"}]},
{id:"s32", tipo:"tre", tema:"chiaro", sopratitolo:"Verificare, e prevenire", box:[
  {n:"TB", t:"Teach-back", d:"tramite il mediatore: l'unico modo per sapere che le informazioni sono arrivate", key:true},
  {n:"15", t:"Ipoglicemia", d:"la regola del 15 · lezione 8.3"}]},
{id:"s33", tipo:"icone", tema:"chiaro", sopratitolo:"Prima che esca", voci:[
  {icona:"orologio", t:"Appuntamenti", d:"date chiare, il luogo, come arrivarci"},
  {icona:"casa", t:"Medico di medicina generale", d:"e i servizi"},
  {icona:"telefono", t:"Un numero da chiamare", key:true}]},

{id:"s34", tipo:"catena", tema:"chiaro", sopratitolo:"Le competenze interculturali", passi:[
  {n:"1", t:"Consapevolezza dei propri **pregiudizi**", d:"tutti ne abbiamo", key:true},
  {n:"2", t:"Curiosità rispettosa"},
  {n:"3", t:"Ascolto, domande aperte"},
  {n:"4", t:"Conoscenza dei servizi di mediazione"}]},
{id:"s35", tipo:"trappola", tema:"chiaro", sopratitolo:"La competenza culturale non è una gentilezza in più: è qualità e sicurezza delle cure", righe:[
  {sb:"«Tutti quelli di quel paese fanno così»", ok:"Ogni persona è un **individuo**, non un rappresentante della sua cultura"}]},

{id:"s36", tipo:"tabella", tema:"chiaro", sopratitolo:"Gli errori da evitare · all'ingresso", colonne:["55%","45%"],
  intestazioni:["Errore", "Invece"], righe:[
  ["no:Il figlio di 12 anni come interprete", "il **mediatore**"],
  ["no:Rivolgersi al marito", "alla **paziente**"],
  ["no:Consenso senza mediatore", "con il mediatore, **documentato**"],
  ["no:Presumere i bisogni culturali", "**chiedere**"]], chiave:[0]},
{id:"s37", tipo:"tabella", tema:"chiaro", sopratitolo:"Gli errori da evitare · durante e dopo", colonne:["55%","45%"],
  intestazioni:["Errore", "Invece"], righe:[
  ["no:Interpretare il dolore con stereotipi", "scale **adatte**"],
  ["no:Giudicare il digiuno, o ignorarlo", "informare sui **rischi**"],
  ["no:Istruzioni solo in italiano", "materiale **tradotto**, teach-back"]], chiave:[2]},

{id:"s38", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"D1 · «Come raccoglie il consenso di una paziente che non parla italiano?»", celle:[
  {n:"1", t:"Con il **mediatore** linguistico-culturale"},
  {n:"2", t:"Parlando **direttamente** a lei, titolare del consenso", key:true},
  {n:"3", t:"Verificando la **comprensione**"},
  {n:"4", t:"**Documentando** la presenza del mediatore"}]},
{id:"s39", tipo:"tre", tema:"chiaro", sopratitolo:"D2 · «Perché non si dovrebbero usare familiari o minori come interpreti?»", box:[
  {n:"1", t:"Accuratezza"}, {n:"2", t:"Riservatezza"},
  {n:"3", t:"Filtri", d:"possono modificare i contenuti"}, {n:"4", t:"Carico emotivo", d:"per i minori", key:true}]},
{id:"s40", tipo:"catena", tema:"chiaro", sopratitolo:"D3 · «Come gestisce il desiderio di una persona con diabete di osservare un digiuno religioso?»", passi:[
  {t:"**Rispettare** la scelta"}, {t:"Informare sui **rischi**"}, {t:"Medico e **diabetologo**", d:"adattano la terapia"},
  {t:"**Automonitoraggio** più frequente"}, {t:"**Interrompere**", d:"se ipoglicemia", key:true}]},

{id:"s41", sopratitolo:"La risposta modello, in 15 righe", ...RISPOSTA([0])},
{id:"s42", sopratitolo:"La risposta modello · il mediatore e la paziente", ...RISPOSTA([0,1,2,3])},
{id:"s43", sopratitolo:"La risposta modello · la cura e la dimissione", ...RISPOSTA([0,1,2,3,4,5,6])},

{id:"s44", tipo:"tre", tema:"chiaro", sopratitolo:"I collegamenti", box:[
  {n:"1.6", t:"Consenso e L. 219/2017", key:true}, {n:"1.7", t:"Riservatezza"},
  {n:"1.4", t:"Codice deontologico"}, {n:"2.7", t:"Comunicazione e teach-back"}]},
{id:"s45", tipo:"tre", tema:"chiaro", sopratitolo:"I collegamenti", box:[
  {n:"8.3", t:"Diabete e ipoglicemia", key:true}, {n:"9.2", t:"Preparazione all'intervento"},
  {n:"9.7", t:"Dimissione"}, {n:"11.6", t:"Colloquio motivazionale"}]},

{id:"s46", tipo:"griglia", tema:"chiaro", colonne:2, sopratitolo:"In Veneto, nelle aziende sanitarie", celle:[
  {t:"Servizi di **mediazione** linguistico-culturale"}, {t:"Materiali informativi **multilingue**"},
  {t:"Ambulatori e percorsi per la popolazione straniera e per gli **STP**"}, {t:"**Consultori** familiari"}]},
{id:"s47", tipo:"frase", tema:"chiaro", sopratitolo:"All'orale",
  testo:"Conoscere questi servizi, e **sapere come attivarli**.",
  sotto:"Dimostra una preparazione concreta."},

{id:"s48", tipo:"titolo", tema:"profondo",
  titolo:"Un consenso che la paziente<br>**non ha capito**<br>non è un consenso.",
  sotto:"La lingua è la prima condizione della cura."},

{id:"s49", tipo:"tre", tema:"chiaro", sopratitolo:"Nella prossima lezione · una lesione da pressione che diventa una richiesta di risarcimento", box:[
  {n:"1", t:"La documentazione"}, {n:"2", t:"La famiglia", d:"la comunicazione"}, {n:"3", t:"La responsabilità", d:"legge 24 del 2017", key:true}]},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione · 17.11",
  titolo:"L'evento avverso", sottotitolo:"Documentazione e responsabilità",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
