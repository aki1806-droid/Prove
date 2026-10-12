// Contenuto delle 50 scene della lezione 17.4 — il rischio suicidario in
// reparto. Tema sensibile: grafica sobria, nessuna immagine evocativa, nessun
// riferimento a mezzi o modalità. Il caso del signor Michele: la frase alle 2
// di notte, la pausa, il ragionamento sui fattori di rischio, la prima
// risposta (parlarne), le azioni immediate; i falsi miti in tabella; gli
// errori in tabella; la risposta modello un promemoria riga per riga; le
// risorse per chiedere aiuto in tre colonne.

const FATTORI = (att) => ({tipo:"griglia", tema:"chiaro", colonne:3, attive:att, celle:[
  {t:"Diagnosi grave **recente**"}, {t:"Dolore **non controllato**", key:true}, {t:"**Isolamento** sociale"},
  {t:"Perdita del **lavoro**"}, {t:"**Separazione**"}, {t:"Uomo di **mezza età**"}]});

const LEZIONI = [
  {n:"2.6", t:"Raccomandazioni", illu:"scudo"},
  {n:"2.7", t:"Comunicazione e SBAR", illu:"dialogo"},
  {n:"3.7", t:"Il dolore", illu:"termometro"},
  {n:"11.3", t:"Salute mentale", illu:"ascolto"},
  {n:"11.5", t:"Cure palliative", illu:"cuore"}];

const MITI = [
  ["«Chi ne parla non lo fa»", "no:**Falso** · molti ne avevano parlato"],
  ["«Chiedere mette l'idea in testa»", "no:**Falso**"],
  ["«Un miglioramento improvviso: il pericolo è passato»", "**Attenzione**: può indicare una decisione presa"]];

const D1 = (att) => ({tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, attive:att, celle:[
  {n:"1", t:"Ascolto **senza giudicare**"}, {n:"2", t:"Chiedo in modo **diretto** se pensa di togliersi la vita", key:true},
  {n:"3", t:"**Non** prometto il segreto"}, {n:"4", t:"Non lo lascio **solo** se il rischio è elevato"},
  {n:"5", t:"Avviso **subito** il medico"}, {n:"6", t:"Curo la sicurezza dell'**ambiente**"},
  {n:"7", t:"Documento e trasmetto nelle **consegne**"}]});

const RISPOSTA = (att) => ({tipo:"memo", tema:"chiaro", attive:att, voci:[
  "**Inquadramento**: diagnosi recente, dolore, isolamento, lavoro perso, «farla finita», un dono → **rischio suicidario**",
  "Mi fermo · ascolto **senza giudizio** · chiedo in modo **diretto** · raccolgo con precisione le sue parole",
  "**Non prometto il segreto**",
  "Medico **subito** · consulenza psichiatrica · **sorveglianza** adeguata al rischio",
  "Ambiente e farmaci personali verificati · **Raccomandazione 4**",
  "**Dolore** trattato · supporto psicologico e spirituale · rete coinvolta con il **consenso**",
  "Documento · **consegne** · dimissione collegata ai servizi"]});

const RISORSE = (att, k) => ({tipo:"colonne", tema:"chiaro", attive:att, colonne:[
  {h:"In ospedale", voci:[{t:"Consulenza psichiatrica"}, {t:"Psicologia clinica e psico-oncologia"}, {t:"Assistente sociale"}, {t:"Assistenza spirituale"}]},
  {h:"Sul territorio", voci:[{t:"Centro di Salute Mentale"}, {t:"Medico di medicina generale"}, {t:"Servizi sociali"}, {t:"Associazioni"}]},
  {h:"In emergenza", key:k, voci:[{t:"**112** · **118**"}, {t:"Persona e familiari informati su **come chiedere aiuto**"}]}]});

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 17 · Casi clinici avanzati",
  titolo:"Il rischio suicidario<br>in reparto", sottotitolo:"17.4 · Riconoscere, parlare, proteggere, attivare",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"figura", tema:"chiaro", illu:"luna", sopratitolo:"Micro-lezione 4 di 12 · il caso più delicato del modulo",
  titolo:"Una persona ricoverata per una **malattia fisica**.", sotto:"Durante la notte lascia intendere di non voler più vivere."},
{id:"s03", tipo:"icone", tema:"chiaro", sopratitolo:"Il rischio suicidario non riguarda solo la psichiatria", voci:[
  {icona:"ospedale", t:"Qualsiasi reparto", d:"può presentarsi ovunque"},
  {icona:"occhio", t:"L'infermiere", d:"spesso il primo a cogliere i segnali", key:true}]},
{id:"s04", tipo:"anello", tema:"chiaro", sopratitolo:"Su un piano professionale · i collegamenti",
  centro:"17.4", sotto:"riconoscere, parlare, proteggere, attivare", voci:LEZIONI},

{id:"s05", tipo:"figura", tema:"chiaro", illu:"letto", sopratitolo:"Lo scenario · Medicina",
  titolo:"Il signor Michele, **58 anni**.", sotto:"Da pochi giorni la diagnosi di una malattia oncologica avanzata."},
{id:"s06", tipo:"citazione", tema:"chiaro", sopratitolo:"Separato · vive solo · ha perso il lavoro · dolore addominale mal controllato",
  testo:"«Tanto è tutto inutile, sarebbe meglio **farla finita**.»", fonte:"Alle 2 di notte, mentre sistemi la flebo"},
{id:"s07", tipo:"pausa", tema:"chiaro", sopratitolo:"Il compagno di stanza: ieri Michele gli ha regalato il suo orologio", es:"metti in pausa",
  testo:"Che cosa gli **rispondi**, e che cosa fai **dopo**?",
  dati:["diagnosi grave recente", "vive solo", "«farla finita»", "ha regalato l'orologio"]},

{id:"s08", sopratitolo:"Il ragionamento · una frase che esprime un desiderio di morte · i fattori di rischio (lezione 11.3)", ...FATTORI([0,1,2])},
{id:"s09", tipo:"confronto", tema:"chiaro", sopratitolo:"E ancora", col:[
  {h:"Altri fattori di rischio", t:"perdita del lavoro · separazione · uomo di mezza età"},
  {h:"Un segnale d'allarme specifico", t:"**donare** oggetti personali: può essere un gesto di **congedo**", grande:true}]},
{id:"s10", tipo:"frase", tema:"chiaro", sopratitolo:"Non è un compito «da psichiatra»",
  testo:"Un **rischio suicidario**, da prendere sempre sul serio.",
  sotto:"La prima risposta spetta a chi ascolta per primo."},

{id:"s11", tipo:"griglia", tema:"chiaro", colonne:2, sopratitolo:"La prima risposta: parlarne", celle:[
  {t:"Fermarsi, **sedersi**, dare **tempo**", key:true}, {t:"Ascoltare **senza giudizio**"},
  {no:true, t:"Minimizzare: «ma no, vedrà che va tutto bene»"}, {no:true, t:"Le **prediche**"}]},
{id:"s12", tipo:"citazione", tema:"chiaro", sopratitolo:"Poi chiedi in modo diretto · chiedere non aumenta il rischio (lezione 11.3)",
  testo:"«Quando dice che sarebbe meglio farla finita, sta pensando di **togliersi la vita**?»", fonte:"La domanda che molti operatori temono"},
{id:"s13", tipo:"griglia", tema:"chiaro", colonne:1, sopratitolo:"Chiedere apre una possibilità", celle:[
  {t:"Apre la possibilità di **aiutare**: spesso la persona prova **sollievo** nel poterne parlare", key:true},
  {t:"Riconoscere la sofferenza: «sono notizie molto pesanti, capisco che si senta così»"},
  {no:true, t:"Promettere il **segreto**: per proteggerlo, va condiviso con l'équipe"}]},

{id:"s14", tipo:"citazione", tema:"chiaro", sopratitolo:"La valutazione del rischio",
  testo:"«Ci penso da quando mi hanno dato la diagnosi; non ho ancora deciso niente, ma **non ho nessuno**.»", fonte:"Michele risponde"},
{id:"s15", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Gli elementi che indicano un rischio più elevato", celle:[
  {n:"1", t:"Pensieri **persistenti**"}, {n:"2", t:"Un **piano** e un'**intenzione**", key:true},
  {n:"3", t:"L'accesso a **mezzi**"}, {n:"4", t:"**Tentativi** precedenti"},
  {n:"5", t:"Nessun **fattore protettivo**, come le relazioni"}]},
{id:"s16", tipo:"confronto", tema:"chiaro", sopratitolo:"Chi fa che cosa", col:[
  {h:"Medico e specialista", t:"la valutazione **strutturata**, con strumenti dedicati"},
  {h:"Infermiere", t:"raccoglie e riferisce con **precisione** le parole della persona: sono un dato clinico", grande:true}]},

{id:"s17", tipo:"frase", tema:"chiaro", sopratitolo:"Le azioni immediate",
  testo:"Se il rischio appare elevato, il paziente **non si lascia solo**.",
  sotto:"Una sorveglianza adeguata al rischio, secondo la procedura aziendale."},
{id:"s18", tipo:"icone", tema:"chiaro", sopratitolo:"Subito, senza aspettare il mattino", voci:[
  {icona:"telefono", t:"Medico di guardia", d:"avvisato subito", key:true},
  {icona:"stetoscopio", t:"Consulenza psichiatrica", d:"secondo indicazione"},
  {icona:"scudo", t:"Raccomandazione 4", d:"prevenzione del suicidio in ospedale"}]},
{id:"s19", tipo:"griglia", tema:"chiaro", colonne:1, sopratitolo:"La sicurezza dell'ambiente · Raccomandazione 4", celle:[
  {t:"Oggetti potenzialmente pericolosi: **rimossi**"},
  {t:"Farmaci personali e terapie a portata di mano: **verificati**", key:true},
  {t:"Finestre e accessi: **attenzione**"}]},
{id:"s20", tipo:"frase", tema:"chiaro", sopratitolo:"Si documenta, e si trasmette nelle consegne",
  testo:"Un rischio noto solo a chi era di turno quella notte **non protegge nessuno**."},

{id:"s21", tipo:"catena", tema:"chiaro", sopratitolo:"Il dolore e la speranza", passi:[
  {t:"Dolore **non controllato**", d:"di per sé un fattore di rischio"},
  {t:"Valutazione e **analgesia** efficace", d:"lezione 3.7"},
  {t:"Un intervento di **prevenzione**", key:true}]},
{id:"s22", tipo:"icone", tema:"chiaro", sopratitolo:"Gli altri sintomi · e un'informazione onesta", voci:[
  {icona:"luna", t:"Insonnia"}, {icona:"stomaco", t:"Nausea"}, {icona:"polmoni", t:"Dispnea"},
  {icona:"chat", t:"Informazione onesta", d:"sulla malattia, sulla cura e sul sollievo", key:true}]},
{id:"s23", tipo:"sostituzione", tema:"chiaro", sopratitolo:"Le cure palliative · lezione 11.5",
  da:{h:"Non sono", t:"un abbandono"}, a:{h:"Sono", t:"una presa in carico"},
  sotto:"La sofferenza esistenziale merita ascolto: supporto **psicologico** e **spirituale**, secondo i suoi desideri."},

{id:"s24", tipo:"raggiera", tema:"chiaro", sopratitolo:"Ricostruire una rete · «non ho nessuno» è spesso meno vero di quanto creda", centro:"Michele",
  raggi:[{t:"Figli"}, {t:"Ex moglie"}, {t:"Amici"}, {t:"Fratelli"}]},
{id:"s25", tipo:"icone", tema:"chiaro", sopratitolo:"Chi coinvolgere", voci:[
  {icona:"spunta", t:"Con il suo consenso", d:"le persone importanti", key:true},
  {icona:"euro", t:"Assistente sociale", d:"economia, lavoro, abitazione"},
  {icona:"casa", t:"Servizi del territorio", d:"e associazioni"}]},
{id:"s26", tipo:"percorso", tema:"chiaro", sopratitolo:"Pianificare con cura la dimissione", tappe:[
  {t:"Il ricovero"}, {t:"La dimissione", d:"pianificata con cura"},
  {t:"Subito dopo", d:"un momento di rischio", key:true}, {t:"I servizi", d:"collegati prima di dimettere"}]},

{id:"s27", tipo:"tabella", tema:"chiaro", sopratitolo:"Approfondimento · i falsi miti, che guidano più dei protocolli", colonne:["52%","48%"],
  intestazioni:["Il mito", "La realtà"], righe:MITI.slice(0, 2), chiave:[0]},
{id:"s28", tipo:"tabella", tema:"chiaro", sopratitolo:"Una calma improvvisa dopo una grande sofferenza", colonne:["52%","48%"],
  intestazioni:["Il mito", "La realtà"], righe:MITI, chiave:[2]},
{id:"s29", tipo:"tabella", tema:"chiaro", sopratitolo:"I falsi miti · gli ultimi due", colonne:["52%","48%"],
  intestazioni:["Il mito", "La realtà"], righe:[
  ["«Chi vuole davvero farlo non si può fermare»", "no:**Falso** · la crisi è spesso temporanea e l'aiuto funziona"],
  ["«È un problema solo psichiatrico»", "no:**Falso** · malattie gravi, dolore, perdite, isolamento"]], chiave:[0]},

{id:"s30", tipo:"sostituzione", tema:"chiaro", sopratitolo:"La comunicazione nell'équipe · consegne SBAR (lezione 2.7)",
  da:{h:"Non", t:"«è giù di morale»"}, a:{h:"Ma", t:"le **parole** del paziente"},
  sotto:"Il livello di sorveglianza è concordato e chiaro a tutti, compresi OSS e personale di supporto."},
{id:"s31", tipo:"griglia", tema:"chiaro", colonne:1, sopratitolo:"Una sola informazione, per tutti", celle:[
  {t:"**Coerenza** fra i turni"},
  {t:"Informazioni ai professionisti che lo **prenderanno in carico**"},
  {no:true, t:"Etichette **giudicanti** in cartella: si descrivono fatti e parole", key:true}]},

{id:"s32", tipo:"figura", tema:"chiaro", illu:"dialogo", sopratitolo:"Un pensiero per gli operatori",
  titolo:"Colloqui **emotivamente pesanti**, soprattutto di notte.", sotto:"Aiutano il confronto con i colleghi e con il coordinatore, e un debriefing."},
{id:"s33", tipo:"sostituzione", tema:"chiaro", sopratitolo:"Se un evento accade nonostante tutto · supporto a chi vive colpa e trauma · lezione 2.6",
  da:{h:"La segnalazione non serve a", t:"cercare colpevoli"}, a:{h:"Serve a", t:"imparare e migliorare i percorsi"},
  sotto:"E la formazione sulla comunicazione nelle situazioni di crisi."},

{id:"s34", tipo:"tabella", tema:"chiaro", sopratitolo:"Gli errori da evitare · nel colloquio", colonne:["55%","45%"],
  intestazioni:["Errore", "Invece"], righe:[
  ["no:Cambiare discorso o minimizzare", "**ascoltare** senza giudizio"],
  ["no:Non chiedere direttamente, per paura", "chiedere in modo **diretto**"],
  ["no:Promettere il segreto", "condividere con l'**équipe**"],
  ["no:Lasciarlo solo con un rischio elevato", "**sorveglianza** adeguata"]], chiave:[1]},
{id:"s35", tipo:"tabella", tema:"chiaro", sopratitolo:"Gli errori da evitare · dopo il colloquio", colonne:["55%","45%"],
  intestazioni:["Errore", "Invece"], righe:[
  ["no:Aspettare il mattino per il medico", "avvisarlo **subito**"],
  ["no:Non verificare ambiente e farmaci personali", "**Raccomandazione 4**"],
  ["no:Non trasmettere nelle consegne", "le **parole** in SBAR"],
  ["no:Trascurare il dolore", "analgesia **efficace**"]], chiave:[0]},

{id:"s36", sopratitolo:"D1 · «Che cosa fa se un paziente le dice di voler morire?»", ...D1([0,1,2])},
{id:"s37", sopratitolo:"D1 · «Che cosa fa se un paziente le dice di voler morire?»", ...D1([0,1,2,3,4,5,6])},
{id:"s38", tipo:"griglia", tema:"chiaro", colonne:3, sopratitolo:"D2 · «Quali sono i fattori di rischio e i segnali d'allarme?» · i fattori", celle:[
  {t:"**Tentativi** precedenti", key:true}, {t:"Disturbi **psichiatrici**"}, {t:"**Dipendenze**"},
  {t:"Malattie gravi e **dolore cronico**"}, {t:"**Isolamento**"}, {t:"**Perdite**"}]},
{id:"s39", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"D2 · i segnali d'allarme", celle:[
  {n:"1", t:"Esprimere **disperazione**, o di sentirsi un **peso**"}, {n:"2", t:"**Congedarsi**"},
  {n:"3", t:"**Regalare** oggetti"}, {n:"4", t:"Un'improvvisa **calma**, dopo una grande sofferenza", key:true}]},
{id:"s40", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"D3 · «Che cosa prevede la Raccomandazione n. 4?» · la prevenzione del suicidio di paziente in ospedale", celle:[
  {n:"1", t:"Valutazione del **rischio**"}, {n:"2", t:"Sicurezza degli **ambienti**"}, {n:"3", t:"**Sorveglianza**", key:true},
  {n:"4", t:"**Formazione**"}, {n:"5", t:"Attenzione alle **transizioni**"}, {n:"6", t:"Gestione dell'**evento**"}]},

{id:"s41", sopratitolo:"La risposta modello, in 15 righe", ...RISPOSTA([0])},
{id:"s42", sopratitolo:"La risposta modello · il colloquio", ...RISPOSTA([0,1,2])},
{id:"s43", sopratitolo:"La risposta modello · proteggere e attivare", ...RISPOSTA([0,1,2,3,4])},
{id:"s44", sopratitolo:"La risposta modello · la cura e la rete", ...RISPOSTA([0,1,2,3,4,5,6])},

{id:"s45", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"I collegamenti", celle:[
  {n:"2.6", t:"Raccomandazioni ed eventi sentinella", key:true}, {n:"2.7", t:"Comunicazione e SBAR"}, {n:"3.7", t:"Dolore"},
  {n:"11.3", t:"Salute mentale e rischio suicidario", key:true}, {n:"11.5", t:"Cure palliative"}, {n:"13.4", t:"Servizi territoriali"}]},

{id:"s46", sopratitolo:"Le risorse", ...RISORSE([0], false)},
{id:"s47", sopratitolo:"Le risorse · e come chiedere aiuto", ...RISORSE([0,1,2], true)},

{id:"s48", tipo:"titolo", tema:"profondo",
  titolo:"Chiedere non mette<br>l'idea in testa:<br>**apre una porta**.",
  sotto:"Dall'altra parte c'è spesso una persona che aspettava qualcuno disposto ad ascoltarla."},

{id:"s49", tipo:"tre", tema:"chiaro", sopratitolo:"Nella prossima lezione · restiamo nella salute mentale · un giovane uomo molto agitato in pronto soccorso", box:[
  {n:"1", t:"De-escalation"}, {n:"2", t:"Cause organiche"}, {n:"3", t:"TSO", d:"trattamento sanitario obbligatorio", key:true}]},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione · 17.5",
  titolo:"L'agitazione psicomotoria<br>e il TSO", sottotitolo:"De-escalation, cause organiche, trattamento sanitario obbligatorio",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
