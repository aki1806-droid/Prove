// Contenuto delle 50 scene della lezione 16.1 — l'ictus, dalla FAST in
// reparto alla riabilitazione. Gli orari del caso sono un percorso che si
// accende (14:30 → 15:20 → 15:45 → 16:05); la FAST le sue quattro tessere; la
// pressione una misura con la soglia della trombolisi; i segni d'allarme il
// cranio; errori in tabella; la risposta modello un promemoria che si scrive
// riga per riga.

const ORARI = (att, k) => ({tipo:"percorso", tema:"chiaro", attive:att, tappe:[
  {t:"14:30", d:"vigile, conversava: l'ultima volta in benessere", key:k===0},
  {t:"15:20", d:"l'OSS: «non mi risponde bene»", key:k===1},
  {t:"15:45", d:"TC encefalo senza contrasto: nessuna emorragia", key:k===2},
  {t:"16:05", d:"avvio della trombolisi EV", key:k===3}]});

const LEZIONI = [
  {n:"3.3", t:"Disfagia", illu:"gola"},
  {n:"8.6", t:"Ictus e trombolisi", illu:"orologio"},
  {n:"10.2", t:"ABCDE", illu:"stetoscopio"},
  {n:"13.3", t:"Rete ictus", illu:"bussola"},
  {n:"14.5", t:"Vie motorie e linguaggio", illu:"dialogo"}];

const RISPOSTA = (att) => ({tipo:"memo", tema:"chiaro", attive:att, voci:[
  "**Inquadramento**: FA non anticoagulata, volto, braccio destro, linguaggio → **sospetto ictus**, tempo-dipendente",
  "**Ultima volta in benessere** annotata · medico e percorso stroke subito",
  "ABCDE, glicemia, parametri, GCS, pupille · digiuno, due accessi, prelievi, ECG, peso · pressione **non trattata** senza prescrizione",
  "Niente procedure invasive inutili · TC e trombolisi · **sorveglianza** neurologica e pressoria",
  "**Screening della deglutizione** prima di qualsiasi cosa per bocca",
  "Arto plegico · complicanze dell'immobilità · comunicazione per l'**afasia**",
  "Orari documentati · familiari informati · percorso **riabilitativo**"]});

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 16 · Casi clinici avanzati",
  titolo:"L'ictus", sottotitolo:"16.1 · Dalla FAST in reparto alla riabilitazione",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"percorso", tema:"chiaro", sopratitolo:"Micro-lezione 1 di 12 · il secondo blocco di casi clinici · un ictus seguito per intero", tappe:[
  {t:"Il primo segno", d:"in reparto"}, {t:"La trombolisi", key:true}, {t:"La disfagia"},
  {t:"L'afasia", d:"comunicare"}, {t:"La riabilitazione"}]},
{id:"s03", tipo:"anello", tema:"chiaro", sopratitolo:"Lo schema del modulo 15 · i collegamenti",
  centro:"16.1", sotto:"accertamento, priorità, obiettivi, interventi, valutazione", voci:LEZIONI},

{id:"s04", tipo:"cifre", tema:"chiaro", sopratitolo:"Lo scenario · la signora Teresa, in Cardiologia", voci:[
  {n:"74", suf:"anni", t:"ricoverata in Cardiologia"},
  {n:"FA", t:"di nuova insorgenza", d:"anticoagulante **non ancora iniziato**", key:true}]},
{id:"s05", sopratitolo:"Al giro della terapia era vigile · poi l'OSS ti chiama", ...ORARI([0,1], 1)},
{id:"s06", tipo:"pausa", tema:"chiaro", sopratitolo:"La trovi così", es:"metti in pausa",
  testo:"Che cosa fai, e qual è il **dato più prezioso** da annotare?",
  dati:["bocca deviata", "braccio destro che cade", "parla in modo confuso", "ore 15:20"]},

{id:"s07", tipo:"fast", tema:"chiaro", sopratitolo:"Il riconoscimento · FAST positiva su tutti e tre i segni: sospetto ictus · la FA non anticoagulata è una fonte di emboli (lezione 8.1)", attive:[0,1,2], key:[0,1,2]},
{id:"s08", tipo:"catena", tema:"chiaro", sopratitolo:"La fisiologia della lezione 14.5 ti dice anche dove", passi:[
  {t:"Deficit a **destra**", d:"il braccio che cade"},
  {t:"Linguaggio **alterato**"},
  {t:"Emisfero **sinistro**", key:true}]},
{id:"s09", tipo:"cifre", tema:"chiaro", sopratitolo:"Il dato più prezioso · ampiamente nella finestra dei trattamenti", voci:[
  {n:"14:30", t:"ultima volta vista in benessere", key:true},
  {n:"50", suf:"minuti", t:"trascorsi", d:"alle 15:20"}]},

{id:"s10", tipo:"icone", tema:"chiaro", sopratitolo:"Le prime azioni", voci:[
  {icona:"telefono", t:"Medico e percorso stroke", d:"subito, comunicando l'orario 14:30", key:true},
  {icona:"stetoscopio", t:"ABCDE"},
  {icona:"goccia", t:"Glicemia capillare 112 mg/dl", d:"non è un'ipoglicemia che simula un ictus"}]},
{id:"s11", tipo:"cifre", tema:"chiaro", sopratitolo:"I parametri · poi GCS e pupille · nulla per bocca", voci:[
  {n:"178/96", t:"pressione", key:true}, {n:"104", t:"frequenza", d:"irregolare"}, {n:"95", suf:"%", t:"SpO₂"}]},
{id:"s12", tipo:"griglia", tema:"chiaro", colonne:2, sopratitolo:"Accessi, prelievi, peso", celle:[
  {t:"**Due accessi** venosi"}, {t:"Prelievi: emocromo, coagulazione, glicemia, creatinina"},
  {t:"**ECG**"}, {t:"**Peso**: per la dose del trombolitico", key:true},
  {no:true, t:"Procedure invasive non indispensabili, come il **catetere**: dopo la trombolisi sanguinerebbero"}]},

{id:"s13", tipo:"frase", tema:"chiaro", sopratitolo:"Un errore frequente: vedere 178 e cercare subito di abbassarla",
  testo:"Nell'ictus ischemico acuto la pressione alta è spesso un **compenso**.",
  sotto:"Mantiene il flusso nelle zone del cervello in sofferenza."},
{id:"s14", tipo:"misura", tema:"chiaro", sopratitolo:"Niente antipertensivi senza prescrizione · la soglia della trombolisi",
  min:120, max:220, passo:20, soglia:185, valore:178, direzione:"alto-peggio",
  titolo:"178/96: compatibile con il trattamento", sotto:"Prima sotto **185/110** · nelle 24 ore successive sotto **180/105**"},

{id:"s15", sopratitolo:"La TC esclude un'emorragia · il medico valuta il deficit con la scala NIHSS", ...ORARI([0,1,2], 2)},
{id:"s16", sopratitolo:"Trombolisi EV secondo prescrizione, entro 4 ore e mezza dalle 14:30 · angio-TC: grosso vaso occluso? trombectomia", ...ORARI([0,1,2,3], 3)},
{id:"s17", tipo:"frase", tema:"chiaro", sopratitolo:"La trombectomia nel centro hub della rete ictus · lezione 13.3",
  testo:"Senza l'**orario**, nessuna di queste decisioni sarebbe possibile."},

{id:"s18", tipo:"tabella", tema:"chiaro", sopratitolo:"La sorveglianza dopo la trombolisi · neurologica e pressione, secondo protocollo · per esempio", colonne:["55%","45%"],
  intestazioni:["Quando", "Frequenza"], righe:[
  ["Le prime **2 ore**", "ogni **15** minuti"],
  ["Le **6 ore** successive", "ogni **30** minuti"],
  ["Poi, fino alle **24 ore**", "ogni **ora**"]], chiave:[0]},
{id:"s19", tipo:"cranio", tema:"chiaro", sopratitolo:"I segni di emorragia cerebrale", massa:56,
  titolo:"Sospendere l'infusione, se in corso, e avvisare subito", voci:["**Cefalea** improvvisa", "**Vomito**", "Peggioramento **neurologico**", "**Pressione** che sale"]},
{id:"s20", tipo:"griglia", tema:"chiaro", colonne:1, sopratitolo:"E ancora", celle:[
  {t:"Sanguinamenti da **altre sedi**"},
  {t:"**Angioedema** di labbra e lingua · più frequente con gli ACE-inibitori", key:true},
  {no:true, t:"Di norma **niente anticoagulanti né antiaggreganti** nelle prime 24 ore"}]},

{id:"s21", tipo:"figura", tema:"chiaro", illu:"bicchiere", sopratitolo:"Il giorno dopo · è più vigile e chiede da bere",
  titolo:"Prima di **qualsiasi cosa** per bocca: lo screening della deglutizione.", sotto:"Acqua e farmaci compresi · secondo protocollo · lezione 3.3"},
{id:"s22", tipo:"tre", tema:"chiaro", sopratitolo:"Se compaiono: niente per bocca e valutazione logopedica", box:[
  {n:"1", t:"Tosse o voce gorgogliante", d:"dopo il sorso", key:true}, {n:"2", t:"Scolo dalla bocca"}, {n:"3", t:"Ritardo", d:"dell'atto deglutitorio"}]},
{id:"s23", tipo:"icone", tema:"chiaro", sopratitolo:"Se lo screening è positivo", voci:[
  {icona:"flebo", t:"Idratazione e nutrizione", d:"per altra via"},
  {icona:"pillola", t:"Farmaci", d:"in forma adatta"},
  {icona:"bocca", t:"Igiene del cavo orale", d:"riduce la polmonite da inalazione", key:true}]},

{id:"s24", tipo:"trappola", tema:"chiaro", sopratitolo:"Nei giorni successivi · il posizionamento dell'arto plegico", righe:[
  {sb:"Tirare la persona dal braccio plegico", ok:"Sostenere la **spalla**: si evita la **sublussazione**"}]},
{id:"s25", tipo:"griglia", tema:"chiaro", colonne:2, sopratitolo:"Si prevengono le complicanze · mobilizzazione progressiva con la fisioterapia", celle:[
  {t:"**Polmonite**"}, {t:"**Trombosi** · compressione pneumatica secondo prescrizione", key:true},
  {t:"**Lesioni da pressione**"}, {t:"**Cadute**"}]},
{id:"s26", tipo:"icone", tema:"chiaro", sopratitolo:"Continenza, umore, prevenzione secondaria", voci:[
  {icona:"catetere", t:"Continenza", d:"evitare il catetere quando è possibile"},
  {icona:"cuoremano", t:"Umore", d:"la depressione dopo l'ictus è frequente"},
  {icona:"farmaci", t:"Anticoagulazione per la FA", d:"nei tempi indicati dal medico", key:true}]},

{id:"s27", tipo:"figura", tema:"chiaro", illu:"dialogo", sopratitolo:"Approfondimento · comunicare con una persona afasica",
  titolo:"Un disturbo del **linguaggio**, non dell'intelligenza.", sotto:"Capisce più di quanto riesca a dire, e soffre se è trattata come una bambina."},
{id:"s28", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Come si parla", celle:[
  {n:"1", t:"**Lentamente**"}, {n:"2", t:"Frasi **brevi**"}, {n:"3", t:"Una domanda **alla volta**"},
  {n:"4", t:"Domande **chiuse**: sì o no", key:true}, {n:"5", t:"Dare **tempo**"}, {n:"6", t:"Non completare le frasi **al posto suo**"}]},
{id:"s29", tipo:"icone", tema:"chiaro", sopratitolo:"Il presupposto per un consenso informato rispettoso", voci:[
  {icona:"fotografia", t:"Gesti, immagini", d:"tabelle di comunicazione", key:true},
  {icona:"spunta", t:"Verificare", d:"la comprensione"},
  {icona:"ascolto", t:"Ridurre i rumori"},
  {icona:"persone", t:"Coinvolgere", d:"i familiari"}]},

{id:"s30", tipo:"tre", tema:"chiaro", sopratitolo:"La dimissione · bisogni e disabilità residua · il percorso riabilitativo", box:[
  {n:"1", t:"Riabilitazione intensiva"}, {n:"2", t:"URT", d:"Unità Riabilitativa Territoriale"}, {n:"3", t:"Domicilio", d:"con fisioterapia"}]},
{id:"s31", tipo:"griglia", tema:"chiaro", colonne:2, sopratitolo:"L'educazione", celle:[
  {t:"Un nuovo ictus: **FAST**, e subito il **112** o il **118**", key:true}, {t:"Terapia **anticoagulante**"},
  {t:"**Pressione**"}, {t:"**Fumo**"}, {t:"**Alimentazione**"}]},
{id:"s32", tipo:"icone", tema:"chiaro", sopratitolo:"La continuità", voci:[
  {icona:"persone", t:"Caregiver formato", d:"mobilizzazione sicura, disfagia, comunicazione", key:true},
  {icona:"documento", t:"Lettera infermieristica"},
  {icona:"casa", t:"Valutazione UVMD", d:"se necessaria"}]},

{id:"s33", tipo:"tabella", tema:"chiaro", sopratitolo:"Gli errori da evitare · nella prima ora", colonne:["55%","45%"],
  intestazioni:["Errore", "Invece"], righe:[
  ["no:Confusione = «stanchezza», rivalutare dopo", "**FAST** subito"],
  ["no:Non annotare l'ultima volta in benessere", "l'**orario** decide"],
  ["no:Dimenticare la glicemia", "escludere l'**ipoglicemia**"],
  ["no:Acqua o terapia orale", "prima lo **screening**"]], chiave:[1]},
{id:"s34", tipo:"tabella", tema:"chiaro", sopratitolo:"Gli errori da evitare · intorno alla trombolisi e dopo", colonne:["55%","45%"],
  intestazioni:["Errore", "Invece"], righe:[
  ["no:Abbassare la pressione", "solo su **prescrizione**"],
  ["no:Catetere non indispensabile prima della trombolisi", "niente procedure **invasive** inutili"],
  ["no:Tirare dal braccio plegico", "sostenere la **spalla**"]], chiave:[0]},

{id:"s35", tipo:"figura", tema:"chiaro", illu:"telefono", sopratitolo:"Il ruolo di chi ha visto per primo",
  titolo:"È stata l'**OSS** a notare il cambiamento.", sotto:"E a chiamare subito: un'osservazione preziosa, che ha permesso di arrivare in tempo."},
{id:"s36", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Formare il personale di supporto a riconoscere e riferire · senza timore di «disturbare»", celle:[
  {n:"1", t:"La **FAST**", key:true}, {n:"2", t:"Una **confusione** nuova"}, {n:"3", t:"Una **caduta**"}, {n:"4", t:"Un cambiamento del **respiro**"}]},
{id:"s37", tipo:"frase", tema:"chiaro", sopratitolo:"Ringraziare chi segnala rafforza la cultura della sicurezza",
  testo:"Una segnalazione tempestiva vale **minuti di cervello**.",
  sotto:"E i familiari si ascoltano, sempre: mai «è solo stanco»."},

{id:"s38", tipo:"fast", tema:"chiaro", sopratitolo:"D1 · «Che cos'è la FAST e quale dato temporale è decisivo?» · volto, braccia, linguaggio, tempo", key:[3]},
{id:"s39", tipo:"frase", tema:"chiaro", sopratitolo:"D1 · il dato decisivo",
  testo:"L'**ultima volta** in cui la persona è stata vista in benessere.",
  sotto:"Da quell'orario dipendono trombolisi e trombectomia."},
{id:"s40", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"D2 · «Che cosa sorveglia dopo una trombolisi?»", celle:[
  {n:"1", t:"Stato **neurologico** e **pressione**, a intervalli ravvicinati", key:true},
  {n:"2", t:"Segni di **emorragia cerebrale**"},
  {n:"3", t:"Sanguinamenti da **altre sedi**"},
  {n:"4", t:"**Angioedema**"}]},
{id:"s41", tipo:"catena", tema:"chiaro", sopratitolo:"D3 · «Perché lo screening della deglutizione precede qualsiasi assunzione per bocca?»", passi:[
  {t:"**Disfagia**", d:"frequente e spesso silente"},
  {t:"**Inalazione**", d:"di acqua, cibo o compresse"},
  {t:"**Polmonite**", d:"peggiora la prognosi", key:true}]},

{id:"s42", sopratitolo:"La risposta modello, in 15 righe", ...RISPOSTA([0])},
{id:"s43", sopratitolo:"La risposta modello · l'orario e la prima ora", ...RISPOSTA([0,1,2])},
{id:"s44", sopratitolo:"La risposta modello · trombolisi e deglutizione", ...RISPOSTA([0,1,2,3,4])},
{id:"s45", sopratitolo:"La risposta modello · i giorni dopo", ...RISPOSTA([0,1,2,3,4,5,6])},

{id:"s46", tipo:"tre", tema:"chiaro", sopratitolo:"I collegamenti", box:[
  {n:"3.3", t:"Disfagia"}, {n:"8.6", t:"Ictus, FAST, trombolisi", key:true},
  {n:"10.2", t:"ABCDE"}, {n:"13.3", t:"Rete ictus"}]},
{id:"s47", tipo:"tre", tema:"chiaro", sopratitolo:"I collegamenti", box:[
  {n:"14.5", t:"Vie motorie e linguaggio"}, {n:"8.1 · 5.5", t:"FA e anticoagulanti", key:true},
  {n:"13.4 · 13.5", t:"URT e UVMD"}]},

{id:"s48", tipo:"titolo", tema:"profondo",
  titolo:"L'orologio dell'ictus parte<br>dall'ultima volta in cui<br>la persona **stava bene**.",
  sotto:"Il primo dovere dell'infermiere è conoscere quell'orario."},

{id:"s49", tipo:"tre", tema:"chiaro", sopratitolo:"Nella prossima lezione · un paziente cirrotico che all'alba vomita sangue · tutto nello stesso letto", box:[
  {n:"1", t:"Shock"}, {n:"2", t:"Trasfusione"}, {n:"3", t:"Vie aeree", key:true}, {n:"4", t:"Encefalopatia"}, {n:"5", t:"Astinenza alcolica"}]},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione · 16.2",
  titolo:"Emorragia digestiva<br>nel paziente cirrotico", sottotitolo:"Shock, vie aeree, encefalopatia e astinenza",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
