// Contenuto delle 50 scene della lezione 17.8 — l'infermiere di famiglia e
// comunità e il caregiver esausto: la signora Bruna, la lesione sacrale, il
// figlio Paolo. La lesione è la sezione della cute allo stadio 3; la rete è
// una raggiera con al centro la famiglia, la persona e il caregiver (come
// chiedono le note di produzione); trascuratezza e
// maltrattamento un bivio; errori in tabella; la risposta modello un
// promemoria che si scrive riga per riga.

const LEZIONI = [
  {n:"3.3", t:"Disfagia e nutrizione", illu:"gola"},
  {n:"7.2", t:"Lesioni da pressione", illu:"tallone"},
  {n:"11.7", t:"Il territorio", illu:"casa"},
  {n:"13.4", t:"Cure primarie venete", illu:"bussola"},
  {n:"13.5", t:"Non autosufficienza", illu:"anziano"}];

const RISPOSTA = (att) => ({tipo:"memo", tema:"chiaro", attive:att, voci:[
  "**Inquadramento**: esiti di ictus · lesione sacrale di **stadio 3** · calo di peso · figlio esausto",
  "Valutazione **multidimensionale**, compreso il carico del caregiver",
  "**Superficie antidecubito** e ausili · riposizionamento · scarico dei talloni",
  "Medicazione avanzata · incontinenza · **nutrizione** per la disfagia · dolore",
  "Il figlio: **ascolto**, mobilizzazione sicura, diritti",
  "La **rete**: UVMD con SVaMA, ADI, SAD, impegnativa, diurno, sollievo",
  "Obiettivi **misurabili** · documentazione · rivalutazione"]});

const ERRORI = ["Errore", "Invece"];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 17 · Casi clinici avanzati",
  titolo:"L'infermiere di famiglia<br>e il caregiver esausto", sottotitolo:"17.8 · Una lesione da pressione, una rete da attivare",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"figura", tema:"chiaro", illu:"casa", sopratitolo:"Micro-lezione 8 di 12 · l'infermiere di famiglia e comunità",
  titolo:"La figura del **DM 77** che molti di voi potrebbero ricoprire.", sotto:"Il lavoro a domicilio, dentro una famiglia."},
{id:"s03", tipo:"icone", tema:"chiaro", sopratitolo:"A domicilio non ci sono colleghi nella stanza accanto", voci:[
  {icona:"persona", t:"Una persona fragile", d:"il problema clinico: una lesione da pressione"},
  {icona:"persone", t:"Una famiglia", d:"in difficoltà"},
  {icona:"ingranaggio", t:"Una rete di servizi", d:"da attivare", key:true}]},
{id:"s04", tipo:"anello", tema:"chiaro", sopratitolo:"Il problema vero, spesso: un caregiver che non ce la fa più",
  centro:"17.8", sotto:"la lesione e il caregiver", voci:LEZIONI},

{id:"s05", tipo:"icone", tema:"chiaro", sopratitolo:"Lo scenario · la signora Bruna, 84 anni, esiti di ictus da 6 mesi", voci:[
  {icona:"letto", t:"Emiplegia destra", d:"a letto o in carrozzina", key:true},
  {icona:"gola", t:"Disfagia lieve"},
  {icona:"goccia", t:"Incontinenza"}]},
{id:"s06", tipo:"catena", tema:"chiaro", sopratitolo:"Vive con il figlio Paolo, 55 anni, separato, che lavora a tempo pieno", passi:[
  {t:"La Medicina di Gruppo **Integrata**"},
  {t:"Segnala «una piaga al **sacro**»"},
  {t:"All'infermiere di **famiglia e comunità**", key:true}]},
{id:"s07", tipo:"cifre", tema:"chiaro", sopratitolo:"Alla visita · e un materasso normale", voci:[
  {n:"Sacro", t:"lesione profonda", d:"tessuto adiposo visibile"},
  {n:"10", t:"Braden", key:true},
  {n:"Peso", t:"in calo"}]},
{id:"s08", tipo:"pausa", tema:"chiaro", sopratitolo:"Paolo, con le occhiaie", es:"metti in pausa",
  testo:"Chi sono i tuoi **pazienti**?",
  dati:["«non dormo»", "«ho mal di schiena»", "«non ce la faccio più»"]},

{id:"s09", tipo:"stadi", tema:"chiaro", sopratitolo:"Il ragionamento · i pazienti sono due: Bruna e Paolo", stadio:3,
  titolo:"Stadio 3", voci:["Lesione **sacrale**", "**Tessuto adiposo visibile**", "Come nella lezione 7.2"]},
{id:"s10", tipo:"confronto", tema:"chiaro", sopratitolo:"Il ragionamento · due pazienti", col:[
  {h:"Bruna", t:"rischio **elevato** (Braden 10) · malnutrizione · disfagia · incontinenza · immobilità"},
  {h:"Paolo", t:"un caregiver con segni di **sovraccarico** fisico ed emotivo"}]},
{id:"s11", tipo:"frase", tema:"chiaro", sopratitolo:"Il ragionamento",
  testo:"La lesione è il **segnale** di un sistema di cura che non regge.",
  sotto:"Medicarla bene è necessario, ma non basta: serve una risposta di rete."},

{id:"s12", tipo:"griglia", tema:"chiaro", colonne:3, sopratitolo:"La valutazione a domicilio, multidimensionale · la lesione con il TIME · il rischio con la Braden", celle:[
  {t:"Sede"}, {t:"Stadio"}, {t:"Dimensioni"},
  {t:"Fondo"}, {t:"Essudato"}, {t:"Margini"},
  {t:"Cute perilesionale"}, {t:"Dolore"}, {t:"Segni di **infezione**", key:true}]},
{id:"s13", tipo:"tabella", tema:"chiaro", sopratitolo:"La valutazione a domicilio · la persona e la casa", colonne:["38%","62%"],
  intestazioni:["Area", "Che cosa"], righe:[
  ["**Nutrizione**", "peso, MNA, apporto, deglutizione"],
  ["**Continenza** e cute", "la dermatite associata all'incontinenza"],
  ["**Autonomia**", "la Barthel"],
  ["**Ambiente**", "letto, materasso, bagno, spazi, ausili"]], chiave:[0]},
{id:"s14", tipo:"icone", tema:"chiaro", sopratitolo:"La valutazione a domicilio · il caregiver e la terapia", voci:[
  {icona:"persone", t:"Il carico", d:"per esempio la scala di Zarit", key:true},
  {icona:"cuoremano", t:"La sua salute"},
  {icona:"orologio", t:"Il tempo"},
  {icona:"euro", t:"Le risorse", d:"economiche, altri familiari"},
  {icona:"farmaci", t:"La terapia", d:"riconciliazione"}]},

{id:"s15", tipo:"icone", tema:"chiaro", sopratitolo:"Il piano per la lesione", voci:[
  {icona:"letto", t:"Superficie antidecubito", d:"materasso o sovramaterasso, adeguata al rischio: da richiedere subito", key:true},
  {icona:"orologio", t:"Riposizionamento", d:"programmato, sul fianco a 30°"},
  {icona:"tallone", t:"Scarico dei talloni"}]},
{id:"s16", tipo:"griglia", tema:"chiaro", colonne:1, sopratitolo:"Il piano per la lesione · e ancora", celle:[
  {t:"Posizione seduta **limitata**, con un cuscino antidecubito"},
  {t:"**Medicazione avanzata** secondo valutazione · lezione 7.5", key:true},
  {t:"Il **dolore** durante le medicazioni"}]},
{id:"s17", tipo:"griglia", tema:"chiaro", colonne:2, sopratitolo:"L'incontinenza · l'umidità macera la cute", celle:[
  {t:"Igiene **delicata**"}, {t:"Prodotti **barriera**"},
  {t:"Ausili assorbenti adeguati e **cambiati per tempo**", key:true},
  {t:"**Rivalutazione** periodica, misurazioni documentate"}]},

{id:"s18", tipo:"tre", tema:"chiaro", sopratitolo:"La nutrizione · una lesione non guarisce senza", box:[
  {n:"1", t:"Proteine e calorie", d:"un apporto adeguato", key:true},
  {n:"2", t:"Consistenze", d:"adatte alla disfagia · lezione 3.3"},
  {n:"3", t:"Posizione", d:"corretta durante il pasto"}]},
{id:"s19", tipo:"figura", tema:"chiaro", illu:"bicchiere", sopratitolo:"Integratori secondo prescrizione · dietista · peso periodico · idratazione",
  titolo:"Chi aiuta Bruna a **mangiare** quando Paolo è al lavoro?", sotto:"Spesso, nessuno: spiega il calo di peso."},

{id:"s20", tipo:"citazione", tema:"chiaro", sopratitolo:"Il caregiver · ascoltare Paolo, senza giudizio",
  testo:"«Non ce la faccio più» non è un'accusa a sé stesso: è una **richiesta di aiuto**.", fonte:"Riconoscere la fatica"},
{id:"s21", tipo:"icone", tema:"chiaro", sopratitolo:"Valutare e proteggere chi assiste", voci:[
  {icona:"documento", t:"Il carico", d:"per esempio la scala di Zarit"},
  {icona:"cuoremano", t:"La salute", d:"sonno, schiena, umore"},
  {icona:"sollevatore", t:"Mobilizzazione sicura", d:"con gli ausili della lezione 3.2: proteggono anche la sua schiena", key:true}]},
{id:"s22", tipo:"tre", tema:"chiaro", sopratitolo:"I diritti · il caregiver ha diritto a essere curato a sua volta", box:[
  {n:"L. 104/1992", t:"I permessi", d:"per assistere un familiare con disabilità grave"},
  {n:"L. 205/2017", t:"Il caregiver familiare", d:"la definizione, nella legge di bilancio 2018", key:true}]},

{id:"s23", tipo:"tre", tema:"chiaro", sopratitolo:"L'attivazione della rete · la competenza distintiva dell'infermiere di famiglia e comunità", box:[
  {n:"1", t:"Il medico di famiglia", d:"e la medicina di gruppo"},
  {n:"2", t:"La valutazione UVMD", d:"con la SVaMA · lezione 13.5", key:true}]},
{id:"s24", tipo:"icone", tema:"chiaro", sopratitolo:"L'attivazione della rete · a casa", voci:[
  {icona:"persone", t:"ADI", d:"infermieri per le medicazioni, fisioterapista, OSS per l'igiene"},
  {icona:"sollevatore", t:"Ausili, tramite il distretto", d:"materasso antidecubito, letto articolato, sollevatore, carrozzina", key:true},
  {icona:"casa", t:"SAD", d:"del Comune"}]},
{id:"s25", tipo:"raggiera", tema:"chiaro", sopratitolo:"Impegnativa di cura domiciliare · centro diurno · sollievo · assistente sociale e associazioni", centro:"La famiglia", raggi:[
  {t:"ADI"}, {t:"SAD"}, {t:"Impegnativa"}, {t:"Diurno"}, {t:"Sollievo", key:true}, {t:"Sociale"}]},
{id:"s26", tipo:"figura", tema:"chiaro", illu:"lente", sopratitolo:"Approfondimento · la trascuratezza involontaria",
  titolo:"Una lesione profonda, un calo di peso, ore da sola: **trascuratezza**?", sotto:"Possono indicarla."},
{id:"s27", tipo:"griglia", tema:"chiaro", colonne:1, sopratitolo:"Molto spesso è involontaria: un caregiver esausto, senza competenze e senza aiuto", celle:[
  {t:"Valutare **senza giudizio** e senza accuse"},
  {t:"**Documentare** i fatti"},
  {t:"Intervenire con il **supporto** e la rete", key:true}]},
{id:"s28", tipo:"bivio", tema:"chiaro", sopratitolo:"Distinguere le due situazioni è una competenza professionale",
  radice:"Trascuratezza o maltrattamento?", rami:[
  {q:"involontaria", t:"Supporto e rete", d:"un caregiver esausto, come Paolo"},
  {q:"maltrattamento o pericolo", t:"Segnalare", d:"secondo procedure e normativa: servizi sociali, medico, autorità competenti", key:true}]},

{id:"s29", tipo:"frase", tema:"chiaro", sopratitolo:"Il piano condiviso",
  testo:"Gli obiettivi si **concordano**: con Bruna, per quanto può partecipare, e con Paolo.",
  sotto:"L'afasia o la disfagia non la escludono dalle decisioni."},
{id:"s30", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Obiettivi realistici e misurabili", celle:[
  {n:"1", t:"Lesione **più piccola** in 4 settimane", key:true}, {n:"2", t:"Peso **stabile**"},
  {n:"3", t:"Nessuna **nuova** lesione"}, {n:"4", t:"Carico del caregiver **ridotto**"}]},
{id:"s31", tipo:"icone", tema:"chiaro", sopratitolo:"Il piano condiviso · e poi", voci:[
  {icona:"persone", t:"Chi fa che cosa, quando", d:"con i numeri di riferimento"},
  {icona:"documento", t:"Documentazione condivisa", d:"cartella domiciliare, Fascicolo Sanitario Elettronico"},
  {icona:"orologio", t:"Rivalutazione", d:"programmata", key:true}]},

{id:"s32", tipo:"tre", tema:"chiaro", sopratitolo:"Due mesi dopo · a casa", box:[
  {t:"Gli ausili", d:"materasso, letto articolato, sollevatore"},
  {t:"L'ADI", d:"attiva"},
  {t:"L'OSS del SAD", d:"al mattino"},
  {t:"Il centro diurno", d:"2 giorni a settimana", key:true}]},
{id:"s33", tipo:"confronto", tema:"chiaro", sopratitolo:"Due mesi dopo · Bruna e Paolo", col:[
  {h:"Bruna", t:"lesione **ridotta** e granuleggiante · peso **stabile**"},
  {h:"Paolo", t:"dorme di più · ha usato i **permessi** · un ricovero di sollievo ad agosto"}],
  sotto:"La rete funziona, e va mantenuta con rivalutazioni periodiche."},

{id:"s34", tipo:"tabella", tema:"chiaro", sopratitolo:"Gli errori da evitare · la lesione e la persona", colonne:["55%","45%"],
  intestazioni:ERRORI, righe:[
  ["no:Medicare senza cambiare le condizioni", "superficie, posizione, **rete**"],
  ["no:Dimenticare la nutrizione", "**proteine** e calorie"],
  ["no:Giudicare, colpevolizzare il caregiver", "**ascolto**, senza giudizio"],
  ["no:Ignorare la sua salute", "va **curato** anche lui"]], chiave:[0]},
{id:"s35", tipo:"tabella", tema:"chiaro", sopratitolo:"Gli errori da evitare · il metodo", colonne:["55%","45%"],
  intestazioni:ERRORI, righe:[
  ["no:Lavorare da soli", "attivare la **rete**"],
  ["no:Confondere trascuratezza e maltrattamento", "supporto o **segnalazione**"],
  ["no:Obiettivi irrealistici", "obiettivi **misurabili**"],
  ["no:Non documentare", "documentazione **condivisa**"]], chiave:[1]},

{id:"s36", tipo:"cifre", tema:"chiaro", sopratitolo:"D1 · «Quali sono le funzioni dell'infermiere di famiglia e comunità?»", voci:[
  {n:"3.000", t:"abitanti per infermiere", d:"lo standard del DM 77", key:true},
  {n:"3", t:"persona, famiglia, comunità", d:"il professionista di riferimento per la loro salute"}]},
{id:"s37", tipo:"griglia", tema:"chiaro", colonne:2, sopratitolo:"D1 · che cosa fa", celle:[
  {t:"Prende in carico **fragilità** e **cronicità**"}, {t:"**Prevenzione** ed educazione"},
  {t:"Lavora **a domicilio**"}, {t:"In **rete**: medico di famiglia, servizi sociali, distretto", key:true}]},
{id:"s38", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"D2 · «Come si previene e si tratta una lesione da pressione a domicilio?»", celle:[
  {n:"1", t:"Valutazione di **rischio** e lesione"}, {n:"2", t:"Superficie **antidecubito**", key:true},
  {n:"3", t:"**Riposizionamento**"}, {n:"4", t:"Scarico dei **talloni**"},
  {n:"5", t:"**Nutrizione**"}, {n:"6", t:"**Incontinenza**"},
  {n:"7", t:"**Medicazione**"}, {n:"8", t:"**Educazione** del caregiver"}]},
{id:"s39", tipo:"catena", tema:"chiaro", sopratitolo:"D3 · «Come sostiene un caregiver in difficoltà?»", passi:[
  {t:"**Ascolto**"}, {t:"Valutazione del **carico**"}, {t:"**Formazione**"},
  {t:"I **diritti**"}, {t:"Supporto e **sollievo**", key:true}]},

{id:"s40", sopratitolo:"La risposta modello, in 15 righe", ...RISPOSTA([0])},
{id:"s41", sopratitolo:"La risposta modello · la valutazione e il piano", ...RISPOSTA([0,1,2])},
{id:"s42", sopratitolo:"La risposta modello · la cura e il figlio", ...RISPOSTA([0,1,2,3,4])},
{id:"s43", sopratitolo:"La risposta modello · la rete", ...RISPOSTA([0,1,2,3,4,5,6])},

{id:"s44", tipo:"tre", tema:"chiaro", sopratitolo:"I collegamenti", box:[
  {n:"3.3", t:"Disfagia e nutrizione"}, {n:"3.2", t:"Mobilizzazione e ausili"},
  {n:"7.2", t:"Lesioni da pressione", key:true}, {n:"7.5", t:"Medicazioni avanzate"}]},
{id:"s45", tipo:"tre", tema:"chiaro", sopratitolo:"I collegamenti", box:[
  {n:"11.7", t:"Il territorio"}, {n:"13.4", t:"Cure primarie venete"},
  {n:"13.5", t:"Non autosufficienza", key:true}]},

{id:"s46", tipo:"griglia", tema:"chiaro", colonne:2, sopratitolo:"Le competenze in gioco · l'infermiere di famiglia e comunità", celle:[
  {t:"**Autonomia** decisionale: a domicilio si decide da soli", key:true}, {t:"Valutazione **multidimensionale**"},
  {t:"Competenze **tecniche**: wound care, nutrizione"}, {t:"**Educazione** e coaching"}]},
{id:"s47", tipo:"griglia", tema:"chiaro", colonne:1, sopratitolo:"Il ruolo in cui tutto il corso si ricompone", celle:[
  {t:"La **rete** dei servizi e le procedure per accedervi", key:true},
  {t:"Il lavoro di **squadra**: medico, assistente sociale, OSS, fisioterapista"},
  {t:"La **comunicazione** con le famiglie"}]},

{id:"s48", tipo:"titolo", tema:"profondo",
  titolo:"A domicilio la lesione<br>si cura con la medicazione,<br>ma guarisce con la **rete**.",
  sotto:"La frase del caso."},

{id:"s49", tipo:"tre", tema:"chiaro", sopratitolo:"Nella prossima lezione · una notte in un Centro di Servizi", box:[
  {n:"1", t:"Un ospite con demenza", d:"anziano non autosufficiente"}, {n:"2", t:"La febbre", key:true}, {n:"3", t:"Pronto soccorso?", d:"mandarlo o no"}]},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione · 17.9",
  titolo:"Una notte in un<br>Centro di Servizi", sottotitolo:"Curarlo in struttura o mandarlo in pronto soccorso?",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
