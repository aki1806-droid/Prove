// Contenuto delle 50 scene della lezione 13.7 — la sanità digitale veneta.
// Le tre app di «Sanità km zero» sono un «tre» che si accende una alla volta;
// le classi di priorità prima come cifre, poi in tabella; le conseguenze
// dell'accesso non giustificato un «tre» ripreso nel caso d'esame; dossier e
// Fascicolo un venn con le regole del Garante in comune.

const APPS = (att, k) => ({tipo:"tre", tema:"chiaro", box:[
  {n:"App", t:"Fascicolo", d:"il proprio FSE con **SPID** o **CIE**", key:k===0},
  {n:"App", t:"Ricette", d:"prescrizioni digitali · **qualsiasi CUP** della Regione", key:k===1},
  {n:"App", t:"Prenota Veloce!", d:"visite ed esami con priorità **D**", key:k===2}], attive:att});

const CONSEGUENZE = (att, k) => ({tipo:"tre", tema:"chiaro", box:[
  {n:"1", t:"Disciplinare", d:"un **illecito** disciplinare", key:k===0},
  {n:"2", t:"Amministrativa", d:"le sanzioni del **Garante** per la protezione dei dati", key:k===1},
  {n:"3", t:"Penale", d:"**accesso abusivo** a un sistema informatico · art. 615-ter c.p.", key:k===2}], attive:att});

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 13 · Il Servizio Socio Sanitario del Veneto",
  titolo:"La sanità digitale<br>veneta", sottotitolo:"13.7 · Fascicolo Sanitario Elettronico, Sanità km zero, ricetta elettronica, accesso giustificato",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"griglia", tema:"chiaro", colonne:4, spunta:false, sopratitolo:"Micro-lezione 7 di 8 · una parte importante del turno davanti a uno schermo", celle:[
  {n:"1", t:"La **cartella** elettronica"}, {n:"2", t:"Le **prescrizioni**"}, {n:"3", t:"Gli **esami**"}, {n:"4", t:"La **documentazione**"}]},
{id:"s03", tipo:"frase", tema:"chiaro", sopratitolo:"Ricette, prenotazioni e referti dallo smartphone · gli strumenti digitali veneti",
  testo:"Soprattutto le **responsabilità** di chi li usa.",
  sotto:"Un accesso sbagliato a un dato sanitario può costare caro."},

{id:"s04", tipo:"norma", tema:"chiaro", etichetta:"Il Fascicolo Sanitario Elettronico", sigla:"FSE",
  testo:"Dati e documenti digitali **sanitari e socio-sanitari**, generati dagli eventi clinici della persona."},
{id:"s05", tipo:"norma", tema:"chiaro", etichetta:"Istituito a livello nazionale", sigla:"D.L. 179/2012",
  testo:"Rafforzato con l'**FSE 2.0**, finanziato anche dal **PNRR**."},
{id:"s06", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"Che cosa contiene il Fascicolo", celle:[
  {t:"I **referti**"}, {t:"Le lettere di **dimissione**"}, {t:"I verbali di **pronto soccorso**"},
  {t:"Le **prescrizioni**"}, {t:"Le **vaccinazioni**"}, {t:"Il **profilo sanitario sintetico**, del medico di famiglia"}]},
{id:"s07", tipo:"raggiera", tema:"chiaro", sopratitolo:"A che cosa serve · in Veneto, con Azienda Zero", centro:"FSE",
  raggi:[{t:"Cura", key:true}, {t:"Prevenzione"}, {t:"Ricerca"}, {t:"Governo"}]},

{id:"s08", tipo:"frase", tema:"chiaro", sopratitolo:"In Veneto · il portale e le app della Regione, gestiti con Azienda Zero",
  testo:"**Sanità km zero**: i servizi digitali per il cittadino."},
{id:"s09", sopratitolo:"Sanità km zero Fascicolo · referti, ricette e altri documenti", ...APPS([0], 0)},
{id:"s10", sopratitolo:"Sanità km zero Ricette · indipendentemente dall'azienda di appartenenza", ...APPS([0,1], 1)},
{id:"s11", sopratitolo:"Sanità km zero Prenota Veloce! · la classe differibile", ...APPS([0,1,2], 2)},
{id:"s12", tipo:"confronto", tema:"chiaro", sopratitolo:"La funzione di delega", col:[
  {h:"La delega", t:"a un'**altra persona**"},
  {h:"Per esempio", t:"il **figlio** che gestisce referti, ricette e prenotazioni di un genitore anziano"}]},

{id:"s13", tipo:"trappola", tema:"chiaro", sopratitolo:"I diritti del cittadino sul Fascicolo · l'alimentazione", righe:[
  {sb:"Serve il consenso per caricare i documenti", ok:"Dal **2020** l'alimentazione è **automatica**"}]},
{id:"s14", tipo:"confronto", tema:"chiaro", sopratitolo:"Una confusione frequente · la ritroverai nel riepilogo del modulo", col:[
  {h:"Alimentazione", t:"**automatica**, senza consenso"},
  {h:"Consultazione", t:"da parte dei professionisti: serve il **consenso** dell'assistito"}]},
{id:"s15", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"L'oscuramento di singoli documenti · dati con tutele rafforzate", celle:[
  {n:"!", t:"**HIV**"}, {n:"!", t:"**Interruzione** di gravidanza"}, {n:"!", t:"**Violenza** subita"}, {n:"!", t:"Uso di **sostanze**"}]},
{id:"s16", tipo:"icone", tema:"chiaro", sopratitolo:"Gli altri diritti · e un punto che tornerà fra poco", voci:[
  {icona:"persone", t:"La delega", d:"a un'altra persona"},
  {icona:"occhio", t:"Conoscere gli accessi", d:"chi ha consultato i suoi dati", key:true}]},

{id:"s17", tipo:"catena", tema:"chiaro", sopratitolo:"La ricetta dematerializzata, o elettronica", passi:[
  {t:"Prescrizione **registrata** nel sistema"}, {t:"Codice **NRE**", d:"numero di ricetta elettronica"}, {t:"**Promemoria** per il cittadino", key:true}]},
{id:"s18", tipo:"percorso", tema:"chiaro", sopratitolo:"Dalla ricetta alla prenotazione", tappe:[
  {t:"La ricetta", d:"farmaci e prestazioni specialistiche"}, {t:"Il CUP", d:"centro unico di prenotazione"},
  {t:"La priorità", d:"i quiz la chiedono spesso", key:true}]},
{id:"s19", tipo:"cifre", tema:"chiaro", sopratitolo:"Le quattro classi di priorità", voci:[
  {n:"72", suf:"h", t:"U · urgente", key:true}, {n:"10", suf:"gg", t:"B · breve"},
  {n:"30/60", suf:"gg", t:"D · differibile", d:"visite / accertamenti"}, {n:"P", t:"programmata"}]},
{id:"s20", tipo:"tabella", tema:"chiaro", sopratitolo:"Il Piano nazionale di governo delle liste d'attesa", colonne:["40%","60%"],
  intestazioni:["Classe", "Entro"], righe:[
  ["**U** · urgente", "**72 ore**"], ["**B** · breve", "**10 giorni**"],
  ["**D** · differibile", "**30 giorni** le visite · **60** gli accertamenti"], ["**P** · programmata", "—"]], chiave:[2]},

{id:"s21", tipo:"frase", tema:"chiaro", sopratitolo:"La cartella clinica elettronica · documentazione clinica e infermieristica informatizzata",
  testo:"Anche la terapia: **prescrizione** e **somministrazione** informatizzate."},
{id:"s22", tipo:"tre", tema:"chiaro", sopratitolo:"Meno errori (lezione 5.4) · integrata con laboratorio, radiologia, farmacia · ogni registrazione è tracciata", box:[
  {n:"1", t:"Chi"}, {n:"2", t:"Che cosa"}, {n:"3", t:"Quando", key:true}]},
{id:"s23", tipo:"frase", tema:"chiaro", sopratitolo:"La documentazione elettronica · e la responsabilità professionale di chi la compila",
  testo:"Lo stesso **valore legale** della documentazione **cartacea**."},

{id:"s24", tipo:"trappola", tema:"chiaro", sopratitolo:"Le credenziali di accesso", righe:[
  {sb:"L'utenza di un collega, «solo per un attimo»", ok:"Credenziali **personali** e **non cedibili**"},
  {sb:"«Il sistema è lento»", ok:"**Mai** con l'utenza di un collega"}]},
{id:"s25", tipo:"icone", tema:"chiaro", sopratitolo:"Alla postazione", voci:[
  {icona:"spunta", t:"Logout", d:"alla fine della sessione", key:true},
  {icona:"divieto", t:"Terminale aperto", d:"non lasciarlo mai"},
  {icona:"lucchetto", t:"Password", d:"robuste e riservate"}]},
{id:"s26", tipo:"frase", tema:"chiaro", sopratitolo:"Una somministrazione registrata da un collega con il tuo nome",
  testo:"Ogni azione con le **tue** credenziali è attribuita a **te**.",
  sotto:"Un problema di responsabilità, e di sicurezza del paziente."},

{id:"s27", tipo:"titolo", tema:"chiaro", sopratitolo:"L'accesso giustificato · il punto più importante della lezione",
  titolo:"Solo se lo hai<br>**in cura**.",
  sotto:"Oppure per finalità di servizio."},
{id:"s28", tipo:"griglia", tema:"chiaro", colonne:2, sopratitolo:"Ogni accesso è registrato e verificabile, anche dopo tempo · non si consultano i dati di", celle:[
  {t:"**Familiari**", no:true}, {t:"**Colleghi**", no:true}, {t:"**Conoscenti**", no:true}, {t:"**Persone note**", no:true}]},
{id:"s29", sopratitolo:"Nemmeno i propri, con gli applicativi aziendali · le conseguenze", ...CONSEGUENZE([0,1], 1)},
{id:"s30", sopratitolo:"Anche il dipendente autorizzato, se entra per finalità estranee al servizio", ...CONSEGUENZE([0,1,2], 2)},

{id:"s31", tipo:"norma", tema:"chiaro", etichetta:"Da distinguere dal Fascicolo", sigla:"Dossier sanitario",
  testo:"I dati prodotti dalle strutture della **stessa azienda**, per chi ha in cura la persona."},
{id:"s32", tipo:"venn", tema:"chiaro", sopratitolo:"Dossier sanitario aziendale e Fascicolo",
  sx:{t:"Dossier", d:"la **stessa** azienda"},
  dx:{t:"FSE", d:"**tutto** il sistema"},
  centro:"le regole del **Garante**: consenso, oscuramento, tracciamento degli accessi"},

{id:"s33", tipo:"icone", tema:"chiaro", sopratitolo:"La telemedicina · le forme della lezione 11.6", voci:[
  {icona:"persona", t:"Televisita"}, {icona:"chat", t:"Teleconsulto"},
  {icona:"occhio", t:"Telemonitoraggio", key:true}, {icona:"cuoremano", t:"Teleassistenza"}]},
{id:"s34", tipo:"tre", tema:"chiaro", sopratitolo:"Telemonitoraggio dei pazienti cronici · piattaforme regionali e nazionali, PNRR", box:[
  {n:"·", t:"Scompenso"}, {n:"·", t:"BPCO"}, {n:"·", t:"Diabete"}]},
{id:"s35", tipo:"ciclo", tema:"chiaro", sopratitolo:"Il ruolo centrale dell'infermiere", centro:"Infermiere", passi:[
  {t:"Arruola", d:"i pazienti"}, {t:"Educa", d:"all'uso dei dispositivi"}, {t:"Legge i dati", key:true},
  {t:"Gestisce gli allarmi"}, {t:"Mantiene il contatto"}]},

{id:"s36", tipo:"frase", tema:"chiaro", sopratitolo:"La sicurezza informatica · phishing, ransomware che bloccano i sistemi",
  testo:"Le aziende sanitarie sono **bersaglio** di attacchi informatici."},
{id:"s37", tipo:"griglia", tema:"chiaro", colonne:2, sopratitolo:"Le regole", celle:[
  {t:"Allegati o link **sospetti**", no:true}, {t:"Chiavette e dispositivi **personali**", no:true},
  {t:"**Segnalare** le anomalie"}, {t:"Procedure di **continuità**: moduli cartacei di emergenza"}]},
{id:"s38", tipo:"trappola", tema:"chiaro", sopratitolo:"Mai dati sanitari con le app di messaggistica personali", righe:[
  {sb:"La foto di una lesione al medico, con il telefono privato", ok:"Un trattamento di dati **non sicuro**"}]},

{id:"s39", tipo:"frase", tema:"chiaro", sopratitolo:"Il caso d'esame",
  testo:"Un'infermiera scopre che una **vicina di casa** è ricoverata in un altro reparto, e apre la sua **cartella elettronica** per sapere come sta."},
{id:"s40", tipo:"confronto", tema:"chiaro", sopratitolo:"Che cosa ha fatto?", col:[
  {h:"Un accesso non giustificato", t:"non ha **in cura** quella paziente"},
  {h:"L'accesso resta registrato", t:"la paziente può **venirne a conoscenza**"}]},
{id:"s41", sopratitolo:"Le conseguenze possibili", ...CONSEGUENZE([0,1,2], -1)},
{id:"s42", tipo:"frase", tema:"chiaro", sopratitolo:"Se vuole notizie, le chiede alla persona stessa o ai familiari",
  testo:"La curiosità, anche affettuosa, **non è una finalità di cura**."},

{id:"s43", tipo:"norma", tema:"chiaro", etichetta:"Categorie particolari di dati · lezione 1.7", sigla:"Art. 9 GDPR",
  testo:"I dati sanitari: **tutele rafforzate**."},
{id:"s44", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"I principi del trattamento · e i segreti", celle:[
  {n:"·", t:"**Liceità**"}, {n:"·", t:"**Minimizzazione**"}, {n:"·", t:"Limitazione della **finalità**"},
  {n:"·", t:"**Integrità** e **riservatezza**"}, {n:"+", t:"Segreto **professionale**"}, {n:"+", t:"Segreto **d'ufficio**"}]},

{id:"s45", tipo:"tabella", tema:"chiaro", sopratitolo:"La tabella · il Fascicolo", colonne:["38%","62%"],
  intestazioni:["Che cosa", "Da ricordare"], righe:[
  ["FSE", "D.L. 179/2012 · **FSE 2.0**"], ["Contenuto", "referti, dimissioni, PS, vaccinazioni, profilo sintetico"],
  ["Alimentazione", "**automatica**"], ["Consultazione", "con il **consenso**"]], chiave:[3]},
{id:"s46", tipo:"tabella", tema:"chiaro", sopratitolo:"La tabella · diritti, servizi, priorità", colonne:["38%","62%"],
  intestazioni:["Che cosa", "Da ricordare"], righe:[
  ["Diritti", "oscuramento, delega, conoscenza degli accessi"], ["Sanità km zero", "Fascicolo, Ricette, Prenota Veloce!"],
  ["Ricetta", "dematerializzata, con l'**NRE**"], ["Priorità", "**U** 72 h · **B** 10 gg · **D** 30/60 gg · **P**"]], chiave:[3]},
{id:"s47", tipo:"tabella", tema:"chiaro", sopratitolo:"La tabella · le responsabilità", colonne:["38%","62%"],
  intestazioni:["Che cosa", "Da ricordare"], righe:[
  ["Cartella elettronica", "tracciata · valore legale"], ["Credenziali", "**personali**, non cedibili"],
  ["Accesso", "**solo se in cura** · art. 615-ter c.p."], ["Dossier sanitario", "≠ FSE"],
  ["Altro", "telemedicina · sicurezza informatica"]], chiave:[2]},

{id:"s48", tipo:"titolo", tema:"profondo",
  titolo:"Ogni clic<br>lascia **una traccia**.",
  sotto:"Si apre solo la cartella del paziente che si ha in cura."},

{id:"s49", tipo:"frase", tema:"chiaro", sopratitolo:"Nella prossima lezione · l'ultima del modulo",
  testo:"Tutto il **sistema veneto** in una sola pagina: riepilogo e **autovalutazione**."},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"13.8<br>Riepilogo<br>del Modulo 13", sottotitolo:"Il sistema veneto in una pagina · autovalutazione",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
