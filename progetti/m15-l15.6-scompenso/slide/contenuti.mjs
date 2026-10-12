// Contenuto delle 50 scene della lezione 15.6 — lo scompenso, dalla notte in
// edema polmonare al ritorno a casa. Il primo tempo è la figura dello
// scompenso della 8.1 (il lato sinistro che si accende), i parametri in numeri
// grandi prima e dopo un'ora; il secondo tempo è il piano educativo in
// griglie e il self-care di Riegel come triade che si completa.

const SELFCARE = (att, k) => ({tipo:"triade", tema:"chiaro", centro:"Riegel", attive:att, nodi:[
  {t:"Mantenimento", d:"terapia, sale, attività fisica: solo in parte", key:k===0},
  {t:"Monitoraggio", d:"peso e sintomi: quasi per niente", key:k===1},
  {t:"Gestione", d:"che cosa fare se il peso sale: per niente", key:k===2}]});

const ERRORI = att => ({tipo:"elenco", tema:"tenue", vietato:true, attive:att, voci:[
  {t:"Lasciarlo **sdraiato** in edema polmonare"},
  {t:"Non **rivalutare** l'ossigenazione"},
  {t:"Diuretico senza controllo di **diuresi** e **potassio**"},
  {t:"Nitrati senza controllo della **pressione**"},
  {t:"Dimettere con un opuscolo e un «si pesi **ogni tanto**»"},
  {t:"Non chiedere **perché** non segue la terapia"}]});

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 15 · Casi clinici integrati",
  titolo:"Lo scompenso", sottotitolo:"15.6 · Dalla notte in edema polmonare al ritorno a casa",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"confronto", tema:"chiaro", sopratitolo:"Caso 6 · due tempi", col:[
  {h:"Primo tempo · la notte", t:"l'**edema polmonare acuto**: l'emergenza"},
  {h:"Secondo tempo · la dimissione", t:"evitare che **torni dopo un mese**: decide il futuro"}]},
{id:"s03", tipo:"frase", tema:"chiaro", sopratitolo:"All'esame",
  testo:"Può arrivare l'una o l'altra parte: la **seconda** è quella in cui i candidati sono **più deboli**."},

{id:"s04", tipo:"frase", tema:"chiaro", sopratitolo:"Lo scenario",
  testo:"**Signor Marco, 80 anni**, scompenso cardiaco noto, **terzo ricovero** nell'anno.",
  sotto:"Vive con la moglie, di 78 anni."},
{id:"s05", tipo:"frase", tema:"chiaro", sopratitolo:"Ore 2 di notte",
  testo:"Dispnea **improvvisa e intensa**: seduto sul bordo del letto, agitato, sudato, espettorato **schiumoso rosato**."},
{id:"s06", tipo:"cifre", tema:"chiaro", sopratitolo:"Rantoli bilaterali fino ai campi medi · che cosa succede, che cosa fai?", voci:[
  {n:"32", t:"FR", d:"atti al minuto"}, {n:"85", suf:"%", t:"SpO₂", d:"in aria", key:true},
  {n:"180/100", t:"PA", d:"mmHg"}, {n:"120", t:"FC", d:"battiti al minuto"}]},

{id:"s07", tipo:"scompenso", tema:"chiaro", sopratitolo:"Il ragionamento · l'edema polmonare acuto, emergenza dello scompenso sinistro (8.1)",
  attive:[0], key:[0]},
{id:"s08", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"PA alta: forma ipertensiva · le cause scatenanti da cercare subito", celle:[
  {n:"1", t:"**Ischemia**"}, {n:"2", t:"**Aritmia**: FA rapida"}, {n:"3", t:"Crisi **ipertensiva**"},
  {n:"4", t:"Liquidi o **sale** in eccesso"}, {n:"5", t:"Terapia **non assunta**", key:true}, {n:"6", t:"**Infezione**"}]},

{id:"s09", tipo:"catena", tema:"chiaro", sopratitolo:"Le prime azioni · medico con SBAR", passi:[
  {t:"**Seduto**, gambe **declivi**", d:"giù dal letto", key:true}, {t:"Meno **ritorno venoso**"}, {t:"Meno carico sui **polmoni**"}]},
{id:"s10", tipo:"tre", tema:"chiaro", sopratitolo:"L'ossigenazione", box:[
  {n:"O₂", t:"Ossigeno", d:"secondo protocollo · target **94–98%**: non ha una BPCO nota"},
  {n:"CPAP", t:"Pressione positiva continua", d:"secondo prescrizione · molto efficace nell'edema polmonare acuto", key:true}]},
{id:"s11", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"E poi", celle:[
  {t:"**Monitoraggio**"}, {t:"**Accesso** venoso"},
  {t:"**ECG** a 12 derivazioni: ischemia? aritmia?", key:true},
  {t:"Prelievi: troponina, **BNP**, elettroliti, funzione renale, emogas"}]},
{id:"s12", tipo:"icone", tema:"chiaro", sopratitolo:"E ancora", voci:[
  {icona:"catetere", t:"Catetere vescicale", d:"se indicato e prescritto: diuresi oraria"},
  {icona:"cuoremano", t:"Non lasciarlo solo", d:"il soffocamento genera un'angoscia enorme", key:true}]},

{id:"s13", tipo:"tre", tema:"chiaro", sopratitolo:"Diuretico dell'ansa EV, es. furosemide, su prescrizione · si sorveglia", box:[
  {n:"1", t:"Diuresi", d:"attesa in **tempi brevi**"}, {n:"2", t:"Pressione"},
  {n:"3", t:"Potassio", d:"che **scende**", key:true}]},
{id:"s14", tipo:"confronto", tema:"chiaro", sopratitolo:"Nitrati EV, su prescrizione", col:[
  {h:"Indicati", t:"proprio perché la pressione è **alta**"},
  {h:"Si sorveglia", t:"la **pressione**, che può calare troppo · la **cefalea**"}]},
{id:"s15", tipo:"confronto", tema:"chiaro", sopratitolo:"Il confronto con il caso precedente", col:[
  {h:"15.4 · infarto inferiore, PA 108", t:"nitrati: una **trappola**"},
  {h:"15.6 · edema polmonare, PA 180/100", t:"nitrati: **indicati**"}],
  sotto:"Il farmaco giusto per **quella pressione** e **quel quadro**"},

{id:"s16", tipo:"cifre", tema:"chiaro", sopratitolo:"La valutazione dopo un'ora", voci:[
  {n:"700", suf:"ml", t:"diuresi", key:true}, {n:"22", t:"frequenza respiratoria"},
  {n:"95", suf:"%", t:"saturazione", d:"con CPAP"}, {n:"145/85", t:"pressione", d:"FC 98"}]},
{id:"s17", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Gli obiettivi sono raggiunti", celle:[
  {t:"Meno agitato, parla in **frasi complete**", key:true}, {t:"ECG: nessuna **ischemia** acuta"},
  {t:"**Potassio** di controllo programmato"}, {t:"Si prosegue, e si **rivaluta**"}]},

{id:"s18", tipo:"cifre", tema:"chiaro", sopratitolo:"Al mattino · «Si pesava, a casa?» «Ogni tanto.»", voci:[
  {n:"+3", suf:"kg", t:"in 4 giorni", d:"rispetto al peso abituale: liquidi che nessuno ha intercettato", key:true}]},
{id:"s19", tipo:"citazione", tema:"chiaro", sopratitolo:"La causa vera",
  testo:"«Il diuretico della sera lo **saltavo**: mi faceva alzare la notte.»", fonte:"E la moglie cucina come sempre, «con il dado»"},
{id:"s20", tipo:"tre", tema:"chiaro", sopratitolo:"Tre problemi di self-care · la ragione dei tre ricoveri", box:[
  {n:"1", t:"Monitoraggio"}, {n:"2", t:"Aderenza", key:true}, {n:"3", t:"Dieta"}]},

{id:"s21", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Il piano educativo · sui suoi problemi, non su un opuscolo", celle:[
  {t:"Peso **ogni giorno**"}, {t:"Al mattino, **dopo la minzione**"},
  {t:"**Stessa bilancia**"}, {t:"Annotato in un **diario**", key:true}]},
{id:"s22", tipo:"tre", tema:"chiaro", sopratitolo:"Il piano educativo", box:[
  {n:"!", t:"Aumento rapido", d:"indicativamente **1,5–2 kg in 2–3 giorni**: si segnala", key:true},
  {n:"⏱", t:"Diuretico", d:"mai saltarlo: un **orario concordato** con il medico, che non disturbi la notte"}]},
{id:"s23", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Il piano educativo", celle:[
  {t:"Diuretico: es. **mattino** e **primo pomeriggio**"}, {t:"**Sale**: ridurlo", key:true},
  {t:"Attenzione a dado, insaccati, formaggi stagionati, cibi pronti", no:true}, {t:"**Liquidi** secondo indicazione"}]},
{id:"s24", tipo:"icone", tema:"chiaro", sopratitolo:"I segni d'allarme · e la moglie", voci:[
  {icona:"polmoni", t:"Dispnea"}, {icona:"gambe", t:"Gonfiore"}, {icona:"letto", t:"Più cuscini", d:"per dormire"},
  {icona:"persone", t:"La moglie", d:"cucina, e aiuta nel monitoraggio", key:true}]},

{id:"s25", tipo:"frase", tema:"chiaro", sopratitolo:"Come si educa · lezione 11.6 · il colloquio motivazionale",
  testo:"«Che cosa vorrebbe poter fare, **se stesse meglio**?»",
  sotto:"Partire dalle sue ragioni: magari tornare a fare l'orto."},
{id:"s26", tipo:"tre", tema:"chiaro", sopratitolo:"Come si educa", box:[
  {n:"1", t:"Poco alla volta", d:"materiale scritto **semplice**"},
  {n:"2", t:"Teach-back", d:"«mi mostri come segna il peso» · «che cosa fa se sale di 2 kg?»", key:true},
  {n:"3", t:"Dai primi giorni", d:"non il giorno della dimissione"}]},

{id:"s27", tipo:"tre", tema:"chiaro", sopratitolo:"La continuità con il territorio · terzo ricovero nell'anno", box:[
  {n:"1", t:"Presa in carico proattiva"},
  {n:"2", t:"Lettera infermieristica", d:"**peso secco** (il peso a cui sta bene) · piano educativo · problemi aperti", key:true}]},
{id:"s28", tipo:"percorso", tema:"chiaro", sopratitolo:"La segnalazione", tappe:[
  {t:"Ospedale", d:"lettera infermieristica"}, {t:"Medico di famiglia", d:"o Medicina di Gruppo Integrata"},
  {t:"Infermiere di famiglia e comunità", key:true}, {t:"Ambulatorio dello scompenso"}]},
{id:"s29", tipo:"icone", tema:"chiaro", sopratitolo:"E ancora", voci:[
  {icona:"telefono", t:"Telemonitoraggio", d:"peso e parametri, se disponibile"}, {icona:"documento", t:"PDTA scompenso"},
  {icona:"persone", t:"La coppia anziana", d:"anche la moglie può aver bisogno di supporto", key:true}]},

{id:"s30", sopratitolo:"Il self-care di Riegel · tre dimensioni", ...SELFCARE([0,1,2], 1)},
{id:"s31", sopratitolo:"Il piano le copre tutte · soprattutto la terza, che previene il ricovero", ...SELFCARE([0,1,2], 2)},

{id:"s32", sopratitolo:"Gli errori da evitare", ...ERRORI([0,1,2,3])},
{id:"s33", sopratitolo:"«Mi faceva alzare la notte»: la risposta conteneva la soluzione", ...ERRORI([4,5])},

{id:"s34", tipo:"catena", tema:"chiaro", sopratitolo:"Il potassio e i diuretici", passi:[
  {t:"Diuretico **dell'ansa**"}, {t:"Perdita di **potassio**"},
  {t:"**Ipokaliemia**", d:"crampi, astenia, aritmie", key:true},
  {t:"Controlli periodici", d:"integrazione secondo prescrizione"}]},
{id:"s35", tipo:"tre", tema:"chiaro", sopratitolo:"La digossina · prima di somministrarla, la frequenza", box:[
  {n:"1", t:"All'apice"}, {n:"2", t:"Per un minuto intero"},
  {n:"3", t:"Se è bassa", d:"non si somministra, e si **segnala**", key:true}]},
{id:"s36", tipo:"griglia", tema:"chiaro", colonne:1, sopratitolo:"La tossicità da digossina", celle:[
  {n:"!", t:"**Nausea** e **vomito**"}, {n:"!", t:"**Bradicardia**"}, {n:"!", t:"**Aritmie**"},
  {n:"!", t:"Disturbi **visivi**: alterata percezione dei colori", key:true}]},
{id:"s37", tipo:"catena", tema:"chiaro", sopratitolo:"Il collegamento che i quiz amano · attenzione doppia al potassio", passi:[
  {t:"**Diuretico**"}, {t:"**Ipokaliemia**"}, {t:"Tossicità della **digossina** ↑", key:true}]},

{id:"s38", tipo:"scompenso", tema:"chiaro", sopratitolo:"D1 · i segni dello scompenso sinistro e destro", attive:[0], key:[0]},
{id:"s39", tipo:"scompenso", tema:"chiaro", sopratitolo:"D1 · il sinistro nel polmone, il destro in periferia", attive:[0,1], key:[1]},
{id:"s40", tipo:"percorso", tema:"chiaro", sopratitolo:"D2 · come insegna il monitoraggio del peso", tappe:[
  {t:"Ogni mattina", d:"dopo la minzione"}, {t:"Stessa bilancia", d:"abiti simili"}, {t:"Il diario"},
  {t:"Aumento rapido", d:"chiama il medico"}, {t:"Me lo ripete", d:"che cosa farebbe", key:true}]},
{id:"s41", tipo:"frase", tema:"chiaro", sopratitolo:"D3 · che cos'è il teach-back?",
  testo:"La persona **spiega o mostra**, con parole proprie, ciò che ha imparato.",
  sotto:"Per verificare e correggere i fraintendimenti: essere chiari resta compito del professionista."},

{id:"s42", tipo:"tabella", tema:"chiaro", sopratitolo:"La risposta in 15 righe · 1", colonne:["28%","72%"],
  intestazioni:["Che cosa", "Che cosa scrivo"], righe:[
  ["Il quadro", "scompenso · dispnea improvvisa, ortopnea, espettorato schiumoso rosato, rantoli · SpO₂ 85% · PA 180/100"],
  ["L'ipotesi", "**edema polmonare acuto**"],
  ["Priorità", "ossigenazione · carico polmonare · causa"]], chiave:[1]},
{id:"s43", tipo:"tabella", tema:"chiaro", sopratitolo:"La risposta in 15 righe · 2", colonne:["28%","72%"],
  intestazioni:["Che cosa", "Che cosa scrivo"], righe:[
  ["Subito", "medico · **seduto, gambe declivi** · O₂ target 94–98% e CPAP"],
  ["Poi", "monitoraggio · accesso · ECG · prelievi"],
  ["Terapia", "diuretico e nitrati prescritti · diuresi, pressione, **potassio**"]], chiave:[0]},
{id:"s44", tipo:"tabella", tema:"chiaro", sopratitolo:"La risposta in 15 righe · 3", colonne:["28%","72%"],
  intestazioni:["Che cosa", "Che cosa scrivo"], righe:[
  ["Accanto", "rassicuro · non lo lascio solo · rivaluto dopo un'ora"],
  ["Le cause", "piano educativo: peso, aderenza, dieta, allarmi · **teach-back** · la moglie"],
  ["Dopo", "continuità con il territorio"]], chiave:[1]},

{id:"s45", tipo:"tre", tema:"chiaro", sopratitolo:"I collegamenti", box:[
  {n:"3.5", t:"Peso e bilancio"}, {n:"8.1", t:"Scompenso e nitrati", key:true}, {n:"8.2", t:"CPAP"},
  {n:"5.5", t:"Diuretici e potassio"}]},
{id:"s46", tipo:"tre", tema:"chiaro", sopratitolo:"I collegamenti", box:[
  {n:"11.6", t:"Self-care e colloquio motivazionale", key:true}, {n:"13.4", t:"Territorio veneto"},
  {n:"14.2", t:"Fisiologia del precarico"}]},

{id:"s47", tipo:"tre", tema:"chiaro", sopratitolo:"All'orale · «come previene la riammissione?»", box:[
  {n:"Cause", t:"Perché è stato ricoverato"}, {n:"Competenze", t:"Che cosa sa fare a casa", key:true},
  {n:"Continuità", t:"Chi lo seguirà"}]},

{id:"s48", tipo:"titolo", tema:"profondo",
  titolo:"La crisi si cura in un'ora,<br>**la ricaduta si previene** in una settimana.",
  sotto:"L'emergenza è l'edema polmonare: la vita del signor Marco la cambiano educazione e continuità."},

{id:"s49", tipo:"frase", tema:"chiaro", sopratitolo:"Nella prossima lezione",
  testo:"Un'anziana fragile, di notte, diventa **confusa** e **cade** dal letto: dalla caduta alla **dimissione protetta**.",
  sotto:"Attraverso tutta la rete veneta per la non autosufficienza."},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione · 15.7",
  titolo:"L'anziana fragile", sottotitolo:"Delirium, caduta e dimissione protetta",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
