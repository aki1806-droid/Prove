// Contenuto delle 50 scene della lezione 17.9 — una notte in un Centro di
// Servizi: il signor Ernesto, la febbre all'una, la decisione se curarlo in
// struttura. I parametri sono numeri grandi; lo SBAR una tabella che si
// accende lettera per lettera; struttura o pronto soccorso un bivio e un
// confronto; le sedi dell'ipodermoclisi il corpo, fronte e retro (nota di
// produzione della slide 9); errori in tabella; la risposta modello un
// promemoria che si scrive riga per riga.

const LEZIONI = [
  {n:"2.3", t:"NEWS2", illu:"campana"},
  {n:"3.3", t:"Disfagia", illu:"gola"},
  {n:"11.2", t:"Demenza", illu:"anziano"},
  {n:"11.5", t:"Cure palliative", illu:"mani"},
  {n:"13.5", t:"Centri di Servizi", illu:"letto"}];

const SBAR = (k) => ({tipo:"tabella", tema:"chiaro", colonne:["30%","70%"],
  intestazioni:["SBAR", "Che cosa dico"], chiave:k, righe:[
  ["**S** · Situazione", "Ernesto, 88 anni, febbre 38,8, SpO₂ 89%, FR 26, più sonnolento"],
  ["**B** · Background", "demenza avanzata, disfagia, tosse a cena · pianificazione: comfort, no RCP, ricovero solo se utile"],
  ["**A** · Accertamento", "probabile polmonite da inalazione, NEWS2 elevato · ossigeno in struttura, via sottocutanea possibile"],
  ["**R** · Raccomandazione", "chiedo una valutazione e indicazioni per la terapia · la figlia è reperibile"]]});

const RISPOSTA = (att) => ({tipo:"memo", tema:"chiaro", attive:att, voci:[
  "**Inquadramento**: demenza, disfagia, tosse al pasto, febbre, rantoli → **inalazione**",
  "ABCDE, glicemia · **semiseduto** · aspirazione · ossigeno · niente per bocca",
  "All'**OSS** la sorveglianza degli altri ospiti",
  "**Pianificazione condivisa** consultata · medico avvisato con SBAR, citandola",
  "Decisione condivisa con l'amministratrice di sostegno: **in struttura**",
  "Antibiotico, ossigeno, antipiretico, **ipodermoclisi** · criteri di trasferimento",
  "La figlia sostenuta · documentazione · **prevenzione** con l'équipe"]});

const ERRORI = ["Errore", "Invece"];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 17 · Casi clinici avanzati",
  titolo:"Una notte in un<br>Centro di Servizi", sottotitolo:"17.9 · Curare in struttura o mandare in pronto soccorso?",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"figura", tema:"chiaro", illu:"luna", sopratitolo:"Micro-lezione 9 di 12 · le strutture residenziali venete per anziani non autosufficienti",
  titolo:"Di notte, spesso, **un solo infermiere** per un intero nucleo.", sotto:"E il medico non è in struttura."},
{id:"s03", tipo:"bivio", tema:"chiaro", sopratitolo:"Un ospite con demenza avanzata ha la febbre · valutare, attivare il medico, decidere",
  radice:"Una decisione difficile", rami:[
  {q:"curarlo", t:"In struttura"},
  {q:"mandarlo", t:"In pronto soccorso"}]},
{id:"s04", tipo:"anello", tema:"chiaro", sopratitolo:"I collegamenti",
  centro:"17.9", sotto:"la notte, la febbre, la decisione", voci:LEZIONI},

{id:"s05", tipo:"cifre", tema:"chiaro", sopratitolo:"Lo scenario · Centro di Servizi, ore 1", voci:[
  {n:"88", suf:"anni", t:"il signor Ernesto", d:"demenza di Alzheimer avanzata", key:true},
  {n:"Disfagia", t:"nota", d:"non cammina, comunica poco"}]},
{id:"s06", tipo:"tre", tema:"chiaro", sopratitolo:"La pianificazione condivisa · con la figlia, sua amministratrice di sostegno, e con il medico", box:[
  {n:"1", t:"Il comfort", d:"obiettivo prioritario", key:true},
  {n:"2", t:"No RCP", d:"niente rianimazione cardiopolmonare"},
  {n:"3", t:"Ricovero", d:"solo se utile per sintomi non gestibili in struttura"}]},
{id:"s07", tipo:"cifre", tema:"chiaro", sopratitolo:"A cena ha tossito più volte · ora", voci:[
  {n:"38,8", suf:"°C", t:"febbre", key:true},
  {n:"26", t:"frequenza respiratoria"},
  {n:"89", suf:"%", t:"SpO₂", d:"in aria"}]},
{id:"s08", tipo:"pausa", tema:"chiaro", sopratitolo:"E ancora", es:"metti in pausa",
  testo:"Che cosa fai, e **chi** deve partecipare alla decisione?",
  dati:["FC 112", "PA 105/60", "rantoli a destra", "più sonnolento"]},

{id:"s09", tipo:"catena", tema:"chiaro", sopratitolo:"Il ragionamento · come nel caso 16.9 · NEWS2 elevato: una condizione seria", passi:[
  {t:"Disfagia, **tosse** al pasto"},
  {t:"Febbre, tachipnea, desaturazione, **rantoli**"},
  {t:"Probabile **polmonite da inalazione**", key:true}]},
{id:"s10", tipo:"frase", tema:"chiaro", sopratitolo:"Demenza avanzata · pianificazione orientata al comfort",
  testo:"La scelta fra struttura e ospedale **non è automatica**.",
  sotto:"Una decisione medica, condivisa con l'amministratrice di sostegno, coerente con la volontà espressa."},
{id:"s11", tipo:"icone", tema:"chiaro", sopratitolo:"L'infermiere ha un ruolo centrale", voci:[
  {icona:"occhio", t:"Valuta"},
  {icona:"chat", t:"Comunica"},
  {icona:"lampada", t:"Propone"},
  {icona:"spunta", t:"Mette in pratica", d:"il piano", key:true}]},

{id:"s12", tipo:"griglia", tema:"chiaro", colonne:2, sopratitolo:"Le prime azioni", celle:[
  {t:"Valutazione **ABCDE** e glicemia"}, {t:"Posizione **semiseduta**", key:true},
  {t:"Aspirazione del **cavo orale**, se necessaria"}, {t:"**Ossigeno** se disponibile (concentratore, bombola), secondo protocollo"}]},
{id:"s13", tipo:"griglia", tema:"chiaro", colonne:1, sopratitolo:"Le prime azioni · e poi", celle:[
  {no:true, t:"Alimentazione **per bocca**: si sospende"},
  {t:"Il **medico**, secondo l'organizzazione: reperibile o continuità assistenziale · con lo **SBAR**", key:true},
  {t:"La **documentazione**: pianificazione condivisa, terapie, allergie"}]},
{id:"s14", tipo:"figura", tema:"chiaro", illu:"letto", sopratitolo:"Le prime azioni · il resto del nucleo",
  titolo:"All'OSS la **sorveglianza** degli altri ospiti.", sotto:"Di notte l'infermiere non può lasciare scoperto il resto del nucleo."},

{id:"s15", sopratitolo:"La chiamata al medico, con lo SBAR", ...SBAR([0])},
{id:"s16", sopratitolo:"La chiamata al medico · il background e l'accertamento", ...SBAR([1,2])},
{id:"s17", sopratitolo:"Citare la pianificazione orienta subito la decisione", ...SBAR([3])},

{id:"s18", tipo:"griglia", tema:"chiaro", colonne:2, sopratitolo:"La decisione · il medico, sentita la figlia: trattare in struttura · secondo prescrizione", celle:[
  {t:"**Antibiotico**", key:true}, {t:"**Ossigeno** con un target"},
  {t:"**Antipiretico**"}, {t:"**Idratazione** sottocutanea, se non può bere"}]},
{id:"s19", tipo:"icone", tema:"chiaro", sopratitolo:"L'infermiere", voci:[
  {icona:"bocca", t:"Posizione e cavo orale"},
  {icona:"polmoni", t:"I sintomi", d:"dispnea, secrezioni, agitazione", key:true},
  {icona:"orologio", t:"Parametri e comfort", d:"a intervalli concordati"}]},
{id:"s20", tipo:"frase", tema:"chiaro", sopratitolo:"E documenta tutto",
  testo:"Conosce i **criteri** per rivalutare un trasferimento.",
  sotto:"Per esempio: sintomi che non si riescono a controllare."},

{id:"s21", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Perché non sempre il pronto soccorso · nella demenza avanzata il trasferimento può causare", celle:[
  {n:"1", t:"**Delirium**", key:true}, {n:"2", t:"**Cadute**"}, {n:"3", t:"Lesioni da **pressione**"},
  {n:"4", t:"**Contenzioni**"}, {n:"5", t:"Lunghe **attese**"}, {n:"6", t:"Procedure **invasive** di scarso beneficio"}]},
{id:"s22", tipo:"confronto", tema:"chiaro", sopratitolo:"Struttura o ospedale", col:[
  {h:"In struttura", t:"per molti problemi, come una polmonite in chi ha scelto il comfort, cure **adeguate**"},
  {h:"In ospedale", t:"giusto se serve un trattamento **non disponibile** e coerente con gli obiettivi"}]},
{id:"s23", tipo:"tre", tema:"chiaro", sopratitolo:"Frattura, emorragia, sintomi refrattari · non è «non fare niente»: la cosa giusta nel posto giusto", box:[
  {n:"1", t:"La volontà", d:"della persona", key:true},
  {n:"2", t:"Il beneficio", d:"atteso"},
  {n:"3", t:"Le possibilità", d:"della struttura"}]},

{id:"s24", tipo:"citazione", tema:"chiaro", sopratitolo:"La figlia al telefono",
  testo:"«Non lo portate in ospedale? Non volete **curarlo**?»", fonte:"La figlia, svegliata nella notte"},
{id:"s25", tipo:"griglia", tema:"chiaro", colonne:2, sopratitolo:"La figlia · che cosa si fa", celle:[
  {t:"Ascoltare la **paura** e il senso di colpa"},
  {t:"Le cure **continuano**: antibiotico, ossigeno, idratazione, comfort", key:true},
  {t:"Ricordare con calma le **scelte condivise**"},
  {t:"Il **medico** è disponibile a parlarle"}]},
{id:"s26", tipo:"frase", tema:"chiaro", sopratitolo:"Con onestà · la decisione si può rivedere · può venire, se lo desidera",
  testo:"Il loro caro **non viene abbandonato**.",
  sotto:"È ciò di cui molte famiglie hanno bisogno, in questi momenti."},

{id:"s27", tipo:"figura", tema:"chiaro", illu:"gocciolatore", sopratitolo:"Approfondimento · molto usata nelle strutture e a domicilio",
  titolo:"L'**ipodermoclisi**: l'idratazione per via sottocutanea.", sotto:"Soluzioni isotoniche secondo prescrizione, a velocità lenta."},
{id:"s28", tipo:"tre", tema:"chiaro", sopratitolo:"Quando è indicata", box:[
  {n:"1", t:"Disidratazione", d:"lieve-moderata", key:true},
  {n:"2", t:"Via orale", d:"non possibile"},
  {n:"3", t:"Via venosa", d:"difficile o non proporzionata"}]},
{id:"s29", tipo:"corpo", tema:"chiaro", lato:"entrambi", sopratitolo:"Le sedi dell'ipodermoclisi", voci:[
  {z:"addome", t:"Addome"},
  {z:"gambe", t:"Cosce"},
  {z:"torace", t:"Sotto la clavicola"},
  {z:"dorso", t:"Dorso", d:"nel paziente agitato: non può strappare l'ago", key:true}]},
{id:"s30", tipo:"griglia", tema:"chiaro", colonne:2, sopratitolo:"Sorvegliare e cambiare la sede secondo protocollo", celle:[
  {t:"**Edema** locale"}, {t:"**Arrossamento**"},
  {t:"**Dolore**"}, {t:"Segni di **infezione**"},
  {no:true, t:"Emergenze e **shock**: serve la via venosa", key:true}]},

{id:"s31", tipo:"griglia", tema:"chiaro", colonne:3, sopratitolo:"Se il trasferimento fosse stato necessario · la scheda di trasferimento", celle:[
  {t:"Motivo"}, {t:"Parametri"}, {t:"Terapie"},
  {t:"Allergie"}, {t:"Autonomia"}, {t:"Stato cognitivo **abituale**", key:true}]},
{id:"s32", tipo:"figura", tema:"chiaro", illu:"cartella", sopratitolo:"E poi pianificazione condivisa e DAT, contatti del familiare e del medico",
  titolo:"«Com'è **di solito**»: lo stato cognitivo abituale.", sotto:"Senza, il pronto soccorso non sa se la confusione è nuova."},
{id:"s33", tipo:"icone", tema:"chiaro", sopratitolo:"Con Ernesto", voci:[
  {icona:"occhiali", t:"Occhiali, protesi", d:"apparecchi acustici"},
  {icona:"telefono", t:"SBAR", d:"al pronto soccorso"},
  {icona:"persona", t:"Una persona di riferimento", d:"lo accompagna o lo raggiunge", key:true}]},

{id:"s34", tipo:"griglia", tema:"chiaro", colonne:2, sopratitolo:"La prevenzione nel nucleo · la disfagia", celle:[
  {t:"**Consistenze** adatte"}, {t:"**Seduto** durante e dopo il pasto", key:true},
  {t:"Assistenza al pasto da personale **formato**"}, {t:"Igiene del **cavo orale**"}]},
{id:"s35", tipo:"icone", tema:"chiaro", sopratitolo:"La prevenzione nel nucleo · le infezioni e il PAI", voci:[
  {icona:"microbo", t:"Focolaio?", d:"più ospiti con febbre o sintomi respiratori: precauzioni, segnalazione"},
  {icona:"siringa", t:"Vaccinazioni", d:"ospiti e operatori"},
  {icona:"dispenser", t:"Igiene delle mani"},
  {icona:"documento", t:"Il PAI", d:"revisione periodica", key:true}]},

{id:"s36", tipo:"tabella", tema:"chiaro", sopratitolo:"Gli errori da evitare · la decisione", colonne:["55%","45%"],
  intestazioni:ERRORI, righe:[
  ["no:Pronto soccorso per abitudine", "**valutazione** e volontà"],
  ["no:Non chiamare il medico per «non disturbare»", "**SBAR**, anche di notte"],
  ["no:Non consultare la pianificazione", "la **pianificazione** orienta"]], chiave:[0]},
{id:"s37", tipo:"tabella", tema:"chiaro", sopratitolo:"Gli errori da evitare · il nucleo e la famiglia", colonne:["55%","45%"],
  intestazioni:ERRORI, righe:[
  ["no:Far mangiare chi tossisce", "**sospendere** per bocca"],
  ["no:Nucleo senza sorveglianza", "**all'OSS** la sorveglianza"],
  ["no:Scheda senza stato cognitivo abituale", "«com'è **di solito**»"],
  ["no:Non coinvolgere la famiglia", "**coinvolgerla**"]], chiave:[2]},

{id:"s38", tipo:"frase", tema:"chiaro", sopratitolo:"D1 · «Come decide, con il medico, se un ospite va trasferito in ospedale?»",
  testo:"Una decisione **medica**, condivisa con la persona o con il suo rappresentante."},
{id:"s39", tipo:"raggiera", tema:"chiaro", sopratitolo:"D1 · l'infermiere valuta, comunica con lo SBAR e partecipa", centro:"Decisione", raggi:[
  {t:"Gravità"},
  {t:"Volontà", d:"e pianificazione condivisa", key:true},
  {t:"Beneficio", d:"atteso"},
  {t:"Struttura", d:"possibilità di cura"}]},
{id:"s40", tipo:"catena", tema:"chiaro", sopratitolo:"D2 · «Che cos'è l'ipodermoclisi e quando si usa?»", passi:[
  {t:"Idratazione **sottocutanea**"},
  {t:"Soluzioni **isotoniche**"},
  {t:"Disidratazione **lieve-moderata**", d:"via orale non possibile", key:true},
  {t:"**Non** nelle emergenze"}]},
{id:"s41", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"D3 · «Quali informazioni contiene una scheda di trasferimento?»", celle:[
  {n:"1", t:"Motivo"}, {n:"2", t:"Parametri"}, {n:"3", t:"Terapie"},
  {n:"4", t:"Allergie"}, {n:"5", t:"Autonomia"}, {n:"6", t:"Stato cognitivo **abituale**", key:true},
  {n:"7", t:"Pianificazione e **DAT**"}, {n:"8", t:"Contatti"}, {n:"9", t:"Ausili personali"}]},

{id:"s42", sopratitolo:"La risposta modello, in 15 righe", ...RISPOSTA([0])},
{id:"s43", sopratitolo:"La risposta modello · le prime azioni", ...RISPOSTA([0,1,2])},
{id:"s44", sopratitolo:"La risposta modello · la pianificazione e la decisione", ...RISPOSTA([0,1,2,3,4])},
{id:"s45", sopratitolo:"La risposta modello · la cura in struttura", ...RISPOSTA([0,1,2,3,4,5,6])},

{id:"s46", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"I collegamenti", celle:[
  {n:"2.3", t:"NEWS2"}, {n:"3.3", t:"Disfagia"}, {n:"11.2", t:"Demenza"},
  {n:"11.5", t:"Cure palliative"}, {n:"17.7", t:"Pianificazione condivisa"}, {n:"13.5", t:"Centri di Servizi, UVMD, PAI", key:true},
  {n:"16.9", t:"Inalazione"}]},
{id:"s47", tipo:"griglia", tema:"chiaro", colonne:2, sopratitolo:"L'infermiere nei Centri di Servizi · un ambito ricco, spesso sottovalutato, molto richiesto", celle:[
  {t:"Grande **autonomia**, soprattutto di notte", key:true}, {t:"Coordinamento degli **OSS**"},
  {t:"La **terapia** per molti ospiti"}, {t:"**Prevenzione**: cadute, lesioni, malnutrizione, infezioni"},
  {t:"Le **famiglie**"}, {t:"Il **fine vita**"}]},

{id:"s48", tipo:"titolo", tema:"profondo",
  titolo:"Curare in struttura<br>non è curare **di meno**.",
  sotto:"È curare secondo la volontà della persona."},

{id:"s49", tipo:"tre", tema:"chiaro", sopratitolo:"Nella prossima lezione", box:[
  {n:"1", t:"Una paziente straniera", d:"parla poco l'italiano"}, {n:"2", t:"Un figlio", d:"che vorrebbe tradurre per lei", key:true}, {n:"3", t:"Il consenso", d:"e una dimissione da costruire insieme"}]},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione · 17.10",
  titolo:"La paziente straniera", sottotitolo:"Mediazione, consenso, cultura",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
