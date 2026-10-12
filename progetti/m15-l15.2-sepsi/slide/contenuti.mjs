// Contenuto delle 50 scene della lezione 15.2 — il paziente che si deteriora
// di notte, dalla polmonite alla sepsi. L'ABCDE è una scala che si accende
// lettera per lettera; la NEWS2 una tabella con i punti; la disfunzione
// d'organo la sagoma con gli apparati; lo SBAR quattro riquadri che si
// riempiono; il bundle della prima ora un percorso; la risposta modello un
// promemoria che si scrive riga per riga.

const LEZIONI = [
  {n:"2.3", t:"NEWS2 e scale", illu:"termometro"},
  {n:"2.7", t:"SBAR", illu:"telefono"},
  {n:"6.7", t:"Emocolture", illu:"provetta"},
  {n:"10.2", t:"ABCDE", illu:"stetoscopio"},
  {n:"10.6", t:"Shock e sepsi", illu:"cuore"}];

const ABCDE = (att, k) => ({tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, attive:att, celle:[
  {n:"A", t:"Parla, anche se **confuso**: vie aeree pervie", key:k===0},
  {n:"B", t:"FR **26** · SpO₂ **92%** in aria · rantoli alla base destra", key:k===1},
  {n:"C", t:"FC **118** · PA **96/58** · riempimento capillare 3 s · cute **marezzata** alle ginocchia", key:k===2},
  {n:"D", t:"**Confusione nuova** · GCS 14 (V4) · pupille normali · glicemia 168", key:k===3},
  {n:"E", t:"T **38,9 °C** · nessun'altra fonte · diuresi **150 ml** dalle 22", key:k===4}]});

const ORGANI = (att) => ({tipo:"apparati", tema:"chiaro", attive:att, voci:[
  {k:"neuro", t:"Cervello", d:"confusione"},
  {k:"cardio", t:"Circolo", d:"ipotensione, marezzatura"},
  {k:"urin", t:"Rene", d:"oliguria"},
  {k:"resp", t:"Polmone", d:"tachipnea, desaturazione", key:true}]});

const SBAR = (att, k) => ({tipo:"tre", tema:"chiaro", attive:att, box:[
  {n:"S", t:"Situazione", d:"Bruno, letto 12: **confuso** da mezz'ora, ipoteso, tachicardico · NEWS2 **13**", key:k===0},
  {n:"B", t:"Background", d:"78 anni, polmonite, diabetico · antibiotico previsto a **mezzanotte**", key:k===1},
  {n:"A", t:"Accertamento", d:"FR 26, SpO₂ 92%, PA 96/58, FC 118, T 38,9, diuresi 150 ml in 5 h · «penso a una **sepsi**»", key:k===2},
  {n:"R", t:"Richiesta", d:"«venga **subito** a vederlo» · ossigeno messo, emocolture e lattati pronti", key:k===3}]});

const BUNDLE = (att, k) => ({tipo:"percorso", tema:"chiaro", attive:att, tappe:[
  {t:"Lattati", d:"3,8 mmol/L", key:k===0},
  {t:"Emocolture", d:"due set da sedi diverse, prima dell'antibiotico", key:k===1},
  {t:"Antibiotico", d:"ad ampio spettro, secondo prescrizione", key:k===2},
  {t:"Liquidi", d:"cristalloidi: es. 30 ml/kg se PA bassa o lattati ≥ 4", key:k===3},
  {t:"Vasopressori", d:"se l'ipotensione persiste · PAM ≥ 65", key:k===4}]});

const ERRORI = (att) => ({tipo:"griglia", tema:"tenue", colonne:2, attive:att, celle:[
  {no:true, t:"«È anziano, di notte **si confonde**»"},
  {no:true, t:"L'**antipiretico**, e rivalutare al giro"},
  {no:true, t:"La pressione sì, la **frequenza respiratoria** no"},
  {no:true, t:"**Ritardare l'antibiotico** per le emocolture"},
  {no:true, t:"Chiamare **senza dati**: «non sta bene»"},
  {no:true, t:"Non documentare gli **orari**"},
  {no:true, t:"Dimenticare la **diuresi**"}]});

const PREVENZIONE = (att) => ({tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, attive:att, celle:[
  {t:"Parametri **completi** con la NEWS2, alla frequenza prevista"},
  {t:"Più **ravvicinati** nelle prime ore dal ricovero"},
  {t:"La **prima dose** di antibiotico: tempi e disponibilità del farmaco", key:true},
  {t:"I **familiari** riconoscono i cambiamenti"},
  {t:"Igiene delle mani e prevenzione delle **ICA**: modulo 4"}]});

const NASCOSTA = (n, chiave) => ({tipo:"tabella", tema:"chiaro", colonne:["34%","66%"], chiave,
  intestazioni:["Quando", "Come si nasconde"], righe:[
  ["Anziano", "confusione, cadute, inappetenza · **ipotermia** invece della febbre"],
  ["Beta-bloccanti", "la **tachicardia** può mancare"],
  ["Corticosteroidi, immunodepressi", "febbre e segni locali **attenuati**"],
  ["Diabetico", "**iperglicemia** inspiegata come primo segno"]].slice(0, n)});

const RISPOSTA = (att) => ({tipo:"memo", tema:"chiaro", attive:att, voci:[
  "**Inquadramento**: confusione nuova, tachipnea, desaturazione, ipotensione, oliguria · NEWS2 13 → **sepsi**",
  "**Priorità**: ossigenazione, perfusione, bundle della prima ora",
  "ABCDE e glicemia · O₂ target 94–98% · semiseduto · monitoraggio · **SBAR**",
  "Secondo accesso · emocolture, lattati, esami · **prima dose** di antibiotico",
  "Liquidi secondo prescrizione, sorvegliando il respiro · **diuresi oraria**",
  "Rivaluto · vasopressori, trasferimento · familiare · **orari** e consegne"]});

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 15 · Casi clinici integrati",
  titolo:"Il paziente che si<br>deteriora di notte", sottotitolo:"15.2 · Dalla polmonite alla sepsi",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"figura", tema:"chiaro", illu:"luna", sopratitolo:"Micro-lezione 2 di 12 · il primo caso, uno dei più probabili all'esame",
  titolo:"Un paziente di medicina che, **di notte**, comincia a peggiorare.", sotto:"Uno dei casi più frequenti anche nella realtà."},
{id:"s03", tipo:"anello", tema:"chiaro", sopratitolo:"Spesso sei l'unico accanto al letto quando i segni compaiono · i collegamenti",
  centro:"15.2", sotto:"di notte, in medicina", voci:LEZIONI},

{id:"s04", tipo:"figura", tema:"chiaro", illu:"letto", sopratitolo:"Lo scenario",
  titolo:"Signor Bruno, **78 anni**: polmonite.", sotto:"Ricoverato alle 18 in Medicina · diabetico in terapia orale, iperteso."},
{id:"s05", tipo:"cifre", tema:"chiaro", sopratitolo:"Alle 22 · FR 20 · vigile e orientato", voci:[
  {n:"38,2", t:"°C", d:"febbre"}, {n:"128/74", t:"pressione"},
  {n:"96", t:"frequenza"}, {n:"94", suf:"%", t:"SpO₂ in aria", key:true}]},
{id:"s06", tipo:"pausa", tema:"chiaro", sopratitolo:"Alle 3 · antibiotico prescritto, prima dose prevista alle 24", es:"metti in pausa",
  testo:"La figlia, che lo assiste, ti chiama: **«non mi riconosce»**. Che cosa fai nei **primi cinque minuti**?",
  dati:["polmonite", "78 anni", "diabetico", "ore 3"]},

{id:"s07", sopratitolo:"I primi cinque minuti: ABCDE", ...ABCDE([0,1], 1)},
{id:"s08", sopratitolo:"Il circolo e il neurologico", ...ABCDE([0,1,2,3], 3)},
{id:"s09", sopratitolo:"Glicemia 168: non è un'ipoglicemia · E: 150 ml in cinque ore", ...ABCDE([0,1,2,3,4], 4)},

{id:"s10", tipo:"tabella", tema:"chiaro", sopratitolo:"Calcoliamo la NEWS2", colonne:["40%","34%","26%"],
  intestazioni:["Parametro", "Valore", "Punti"], righe:[
  ["Frequenza respiratoria", "26", "**3**"],
  ["SpO₂ (scala 1)", "92%", "**2**"],
  ["Ossigeno", "aria ambiente", "0"],
  ["PA sistolica", "96", "**2**"],
  ["Frequenza cardiaca", "118", "**2**"]]},
{id:"s11", tipo:"cifre", tema:"chiaro", sopratitolo:"Confusione nuova 3 · temperatura 38,9: 1", voci:[
  {n:"13", t:"NEWS2", d:"rischio **alto**", key:true},
  {n:"7", t:"la soglia", d:"da 7 in su: risposta d'**emergenza**"}]},
{id:"s12", tipo:"frase", tema:"chiaro", sopratitolo:"Nota",
  testo:"La sola **confusione nuova** vale già **3 punti**.",
  sotto:"Il segnale che troppo spesso si attribuisce all'età, o alla notte."},

{id:"s13", sopratitolo:"Che cosa pensi? · infezione nota, la polmonite, e disfunzione d'organo", ...ORGANI([0,1])},
{id:"s14", sopratitolo:"Sepsi fino a prova contraria · qSOFA 3 su 3 · tempo-dipendente (10.6)", ...ORGANI([0,1,2,3])},

{id:"s15", tipo:"icone", tema:"chiaro", sopratitolo:"Le prime azioni, in parallelo · chiami subito", voci:[
  {icona:"telefono", t:"Medico di guardia"},
  {icona:"persone", t:"Team di risposta rapida", d:"se l'ospedale lo prevede · NEWS2 ≥ 7"},
  {icona:"chat", t:"Con lo SBAR", key:true}]},
{id:"s16", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Respiro e circolo", celle:[
  {t:"**Ossigeno** secondo protocollo · target **94–98%**: non ha la BPCO", key:true},
  {t:"Posizione **semiseduta**"},
  {t:"**Monitoraggio** continuo"},
  {t:"**Secondo accesso venoso** di buon calibro"}]},
{id:"s17", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"Prepari, e resti", celle:[
  {t:"Materiale per **emocolture**, **lattati**, emogas, esami"},
  {t:"**Resti** con il paziente"},
  {t:"Rassicuri la **figlia**: è spaventata, e ha dato l'allarme giusto", key:true}]},

{id:"s18", sopratitolo:"La telefonata SBAR", ...SBAR([0], 0)},
{id:"s19", sopratitolo:"La telefonata SBAR · background e accertamento", ...SBAR([0,1,2], 2)},
{id:"s20", sopratitolo:"Quaranta secondi, e una risposta immediata", ...SBAR([0,1,2,3], 3)},

{id:"s21", tipo:"figura", tema:"chiaro", illu:"farmaci", sopratitolo:"Il dettaglio che cambia tutto · verifica la scheda di terapia",
  titolo:"L'antibiotico delle **24** è stato **somministrato**?", sotto:"La prima dose può slittare o saltare: magari il farmaco non era in reparto."},
{id:"s22", tipo:"catena", tema:"chiaro", sopratitolo:"Prima dose ritardata o omessa · ogni ora di ritardo conta", passi:[
  {t:"Lo **comunichi**", d:"al medico"},
  {t:"**Emocolture**", d:"prelevate prima"},
  {t:"Antibiotico **subito**", d:"secondo prescrizione, senza aspettarle", key:true}]},

{id:"s23", sopratitolo:"Il bundle della prima ora · tecnica della lezione 6.7", ...BUNDLE([0,1], 1)},
{id:"s24", sopratitolo:"Il bundle della prima ora · secondo prescrizione", ...BUNDLE([0,1,2,3], 3)},
{id:"s25", sopratitolo:"Sorvegliando respiro e saturazione · tutti gli orari documentati", ...BUNDLE([0,1,2,3,4], 4)},

{id:"s26", tipo:"figura", tema:"chiaro", illu:"catetere", sopratitolo:"La diuresi oraria · la perfusione degli organi",
  titolo:"Almeno **0,5 ml/kg/h**.", sotto:"Catetere su prescrizione, indicazione documentata, rimosso appena non serve (lezione 3.6) · bilancio idrico."},

{id:"s27", tipo:"cifre", tema:"chiaro", sopratitolo:"Ore 5, nonostante i liquidi · FC 112", voci:[
  {n:"88/50", t:"pressione", d:"media 63"},
  {n:"15", t:"ml/h", d:"diuresi"},
  {n:"4,2", t:"mmol/L", d:"lattati di controllo", key:true}]},
{id:"s28", tipo:"catena", tema:"chiaro", sopratitolo:"Servono vasopressori, e i lattati restano alti", passi:[
  {t:"**Shock settico**", key:true},
  {t:"**Noradrenalina**", d:"la avvia il medico"},
  {t:"Consulenza **intensiva**"}]},
{id:"s29", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"Il tuo ruolo", celle:[
  {t:"**Trasferimento sicuro**: monitor, ossigeno, pompe, documentazione", key:true},
  {t:"**Consegne SBAR** al collega della terapia intensiva"},
  {t:"**Documentazione** completa, con tutti gli orari"}]},

{id:"s30", tipo:"frase", tema:"chiaro", sopratitolo:"La famiglia",
  testo:"È stata la figlia a dare l'allarme: **riconoscerlo**.",
  sotto:"Anche per insegnare ai familiari che le loro osservazioni contano."},
{id:"s31", tipo:"icone", tema:"chiaro", sopratitolo:"Entro le tue competenze · le informazioni cliniche le dà il medico", voci:[
  {icona:"dialogo", t:"Informazioni chiare"},
  {icona:"ascolto", t:"Presenza, ascolto"},
  {icona:"casa", t:"Un luogo dove attendere"},
  {icona:"telefono", t:"Il trasferimento", d:"e come avere notizie", key:true}]},

{id:"s32", sopratitolo:"Gli errori che il caso vuole intercettare", ...ERRORI([0,1,2])},
{id:"s33", sopratitolo:"Gli errori che il caso vuole intercettare", ...ERRORI([0,1,2,3,4,5,6])},

{id:"s34", sopratitolo:"La prevenzione a monte · all'orale fa la differenza", ...PREVENZIONE([0,1])},
{id:"s35", sopratitolo:"La prima dose: un punto critico organizzativo", ...PREVENZIONE([0,1,2,3,4])},

{id:"s36", sopratitolo:"Quando la sepsi si nasconde", ...NASCOSTA(2, [0,1])},
{id:"s37", sopratitolo:"Quando la sepsi si nasconde", ...NASCOSTA(4, [2,3])},
{id:"s38", tipo:"figura", tema:"chiaro", illu:"polmoni", sopratitolo:"Antipiretici a orario: la febbre «scompare», l'infezione no",
  titolo:"Il segno più affidabile: la **frequenza respiratoria**.", sotto:"Contala davvero, per un minuto intero."},

{id:"s39", tipo:"griglia", tema:"chiaro", colonne:4, spunta:false, sopratitolo:"D1 · che cos'è la NEWS2? Sette elementi", celle:[
  {n:"1", t:"Frequenza **respiratoria**"}, {n:"2", t:"**Saturazione**"}, {n:"3", t:"**Ossigeno**terapia"},
  {n:"4", t:"Pressione **sistolica**"}, {n:"5", t:"Frequenza **cardiaca**"}, {n:"6", t:"**Coscienza**", key:true},
  {n:"7", t:"**Temperatura**"}]},
{id:"s40", tipo:"frase", tema:"chiaro", sopratitolo:"D1 · a ogni fascia di punteggio, una risposta graduata",
  testo:"Fino alla risposta d'**emergenza**, da **7** in su.",
  sotto:"D2 · perché le emocolture prima dell'antibiotico, ma senza ritardarlo?"},
{id:"s41", tipo:"confronto", tema:"chiaro", sopratitolo:"D2 · emocolture e antibiotico", col:[
  {h:"Prima dell'antibiotico", t:"l'antibiotico riduce la probabilità di **isolare il germe**"},
  {h:"Senza ritardarlo", t:"ogni ora di ritardo **aumenta la mortalità**"}],
  sotto:"Si prelevano subito · se non si può in tempi brevi, l'antibiotico **non aspetta**"},
{id:"s42", tipo:"confronto", tema:"chiaro", sopratitolo:"D3 · sepsi e shock settico", col:[
  {h:"Sepsi", t:"disfunzione d'organo da risposta **disregolata** all'infezione"},
  {h:"Shock settico", t:"vasopressori per **PAM ≥ 65** · lattati **> 2** nonostante i liquidi"}]},

{id:"s43", sopratitolo:"La risposta modello, in 15 righe", ...RISPOSTA([0])},
{id:"s44", sopratitolo:"La risposta modello · priorità e primi interventi", ...RISPOSTA([0,1,2])},
{id:"s45", sopratitolo:"La risposta modello · bundle e diuresi", ...RISPOSTA([0,1,2,3,4])},
{id:"s46", sopratitolo:"La risposta modello · rivalutazione e continuità", ...RISPOSTA([0,1,2,3,4,5])},

{id:"s47", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"I collegamenti", celle:[
  {n:"2.3", t:"**NEWS2** e CAM"}, {n:"2.7", t:"**SBAR**"},
  {n:"6.7", t:"**Emocolture**"}, {n:"10.2", t:"**ABCDE**"},
  {n:"10.6", t:"**Sepsi**, bundle, noradrenalina", key:true}, {n:"3.6", t:"**Catetere** e CAUTI"},
  {n:"M4", t:"**ICA**: infezioni correlate all'assistenza"}]},

{id:"s48", tipo:"titolo", tema:"profondo",
  titolo:"La confusione nuova<br>è un **parametro vitale**.",
  sotto:"La frase del caso"},

{id:"s49", tipo:"figura", tema:"chiaro", illu:"orologio", sopratitolo:"Nella prossima lezione",
  titolo:"Un paziente chirurgico, **giorno per giorno**.", sotto:"Dalla sera dell'intervento alla dimissione: le complicanze nel momento in cui compaiono."},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione · 15.3",
  titolo:"Il paziente chirurgico,<br>giorno per giorno", sottotitolo:"Le complicanze nel momento in cui compaiono",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
