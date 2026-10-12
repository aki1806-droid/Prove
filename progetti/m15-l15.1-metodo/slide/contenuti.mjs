// Contenuto delle 50 scene della lezione 15.1 — il metodo per risolvere un
// caso clinico. I cinque passi sono un percorso che torna a fine lezione;
// l'ordine delle priorità una scala; diagnosi infermieristica e problema
// collaborativo un bivio; il mini-caso parte da una pausa; la risposta
// scritta bene si costruisce riga per riga in una griglia.

const TRACCIA = (att, k) => ({tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, attive:att, celle:[
  {n:"Chi", t:"il paziente: **età**, **patologie**, **terapie**", key:k===0},
  {n:"Dove", t:"reparto, pronto soccorso, domicilio, struttura residenziale", key:k===1},
  {n:"Quando", t:"la giornata post-operatoria, l'ora del turno, i giorni dalla chemioterapia", key:k===2},
  {n:"Che cosa", t:"è **cambiato**", key:k===3},
  {n:"La domanda", t:"descrivere, pianificare, indicare le **priorità**, motivare", key:k===4}]});

const PASSI = (att, k) => ({tipo:"percorso", tema:"chiaro", attive:att, tappe:[
  {t:"Accertamento", d:"mirato", key:k===0},
  {t:"Problemi e priorità", key:k===1},
  {t:"Obiettivi", key:k===2},
  {t:"Interventi", d:"motivati", key:k===3},
  {t:"Valutazione", d:"comunicazione, documentazione", key:k===4}]});

const PRIORITA = (att, k) => ({tipo:"scala", tema:"chiaro", attive:att, gradini:[
  {n:"1", t:"Pericolo di vita", d:"vie aeree, respiro, circolo", key:k===0},
  {n:"2", t:"Alterazioni acute", d:"dolore acuto, coscienza, glicemia, sanguinamento", key:k===1},
  {n:"3", t:"Rischi da prevenire", d:"cadute, lesioni, infezioni, inalazione", key:k===2},
  {n:"4", t:"Bisogni di base", d:"educazione, dimissione", key:k===3}]});

const BIVIO = k => ({tipo:"bivio", tema:"chiaro", radice:"Il problema del paziente", rami:[
  {q:"lo tratta l'infermiere, in autonomia", t:"Diagnosi infermieristica", d:"una risposta della persona · es. rischio di caduta", key:k===0},
  {q:"lo sorveglia e gestisce con il medico", t:"Problema collaborativo", d:"una complicanza fisiopatologica · es. emorragia postoperatoria", key:k===1}]});

const INTERVENTI = (att, k) => ({tipo:"colonne", tema:"chiaro", attive:att, colonne:[
  {h:"Autonomi", key:k===0, voci:[{t:"Posizionamento"}, {t:"Monitoraggio"}, {t:"Prevenzione"}, {t:"Educazione"}]},
  {h:"Collaborativi", key:k===1, voci:[{t:"**Secondo prescrizione**"}, {t:"Farmaci"}, {t:"Ossigeno con il target"}, {t:"Esami"}]},
  {h:"Attribuiti", key:k===2, voci:[{t:"All'**OSS**"}, {t:"All'assistente infermiere"}, {t:"Con **supervisione**"}]}]});

const BENE = (att, k) => ({tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, attive:att, celle:[
  {n:"1", t:"Valuto il dolore con **NRS** a riposo e in movimento · sede e caratteristiche", key:k===0},
  {n:"2", t:"Cerco segni di complicanza: **sanguinamento**, **distensione**, **globo**", key:k===1},
  {n:"3", t:"Analgesia prescritta · rivaluto dopo **30–60 min** · obiettivo **NRS ≤ 3** a riposo", key:k===2},
  {n:"4", t:"Segnalo al medico un dolore **non controllato**", key:k===3},
  {n:"5", t:"Posiziono · insegno a **sostenere la ferita** quando tossisce", key:k===4},
  {n:"6", t:"Documento **valori e risposta**", key:k===5}]});

const ERRORI = (att) => ({tipo:"griglia", tema:"tenue", colonne:2, attive:att, celle:[
  {no:true, t:"Elencare **tutto** senza un ordine"},
  {no:true, t:"**Diagnosi mediche** come problemi infermieristici"},
  {no:true, t:"Interventi senza «**secondo prescrizione**»"},
  {no:true, t:"Interventi **generici**: «monitoro», «sorveglio»"},
  {no:true, t:"Dimenticare sicurezza, comunicazione, documentazione"},
  {no:true, t:"Citare norme **non pertinenti**"},
  {no:true, t:"Ignorare il **dato anomalo** della traccia"}]});

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 15 · Casi clinici integrati",
  titolo:"Il metodo per risolvere<br>un caso clinico", sottotitolo:"15.1 · Leggere la traccia, cinque passi, la risposta in 15 righe",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"icone", tema:"chiaro", sopratitolo:"Micro-lezione 1 di 12 · fin qui abbiamo studiato per argomenti", voci:[
  {icona:"farmaci", t:"La terapia"}, {icona:"microbo", t:"Le infezioni"},
  {icona:"ferita", t:"Le ferite"}, {icona:"cuore", t:"L'emergenza"}]},
{id:"s03", tipo:"frase", tema:"chiaro", sopratitolo:"All'esame, e soprattutto in reparto",
  testo:"I problemi non arrivano divisi per capitoli: **arrivano in un paziente solo**.",
  sotto:"Dodici casi, dal più semplice al più complesso · oggi il metodo"},

{id:"s04", tipo:"tre", tema:"chiaro", sopratitolo:"Perché i casi contano", box:[
  {n:"Prova pratica", t:"Fino a 20 punti", d:"spesso **scritta** · soglia **14**", key:true},
  {n:"Prova scritta", t:"Risposte sintetiche", d:"su situazioni **cliniche**"},
  {n:"Orale", t:"«Che cosa fa se…»", d:"domande su situazioni **concrete**"}]},
{id:"s05", tipo:"trappola", tema:"chiaro", sopratitolo:"In tutti e tre i casi · il metodo serve a dare l'ordine", righe:[
  {sb:"Sapere tutto ed elencare le nozioni senza un ordine", ok:"Il caso misura il **ragionamento**, non la memoria"}]},

{id:"s06", sopratitolo:"Prima regola · leggere la traccia come un accertamento", ...TRACCIA([0,1], 1)},
{id:"s07", sopratitolo:"E soprattutto: che cosa chiede la traccia", ...TRACCIA([0,1,2,3,4], 4)},
{id:"s08", tipo:"figura", tema:"chiaro", illu:"lente", sopratitolo:"Un consiglio pratico",
  titolo:"Sottolinea i **dati anomali**.", sotto:"Ogni dato anomalo è un indizio che il commissario ha messo lì per farti ragionare."},

{id:"s09", sopratitolo:"Lo schema in cinque passi · il processo di assistenza della lezione 2.1, in tempo reale", ...PASSI([0,1,2], 2)},
{id:"s10", sopratitolo:"Lo useremo in tutti i casi, finché non diventa automatico", ...PASSI([0,1,2,3,4], 4)},

{id:"s11", tipo:"confronto", tema:"chiaro", sopratitolo:"Passo 1 · l'accertamento mirato", col:[
  {h:"Dati soggettivi", t:"ciò che la persona **riferisce**"},
  {h:"Dati oggettivi", t:"ciò che **rilevi**"}],
  sotto:"Paziente instabile: l'accertamento è l'**ABCDE** della lezione 10.2"},
{id:"s12", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"Parametri completi e un punteggio di allerta · le scale che servono, non tutte", celle:[
  {t:"**NEWS2**", key:true}, {t:"Dolore"}, {t:"Braden"},
  {t:"Conley"}, {t:"CAM"}, {t:"GCS"}]},
{id:"s13", tipo:"frase", tema:"chiaro", sopratitolo:"Dalla documentazione: terapie in corso, esami, allergie",
  testo:"La parola chiave è **mirato**: si accerta ciò che serve per **decidere**."},

{id:"s14", sopratitolo:"Passo 2 · problemi e priorità: l'ordine è sempre lo stesso", ...PRIORITA([0,1], 0)},
{id:"s15", sopratitolo:"Poi i rischi · infine i bisogni di base", ...PRIORITA([0,1,2,3], 2)},
{id:"s16", sopratitolo:"Una distinzione che dà punti · il modello bifocale del modulo 2", ...BIVIO(1)},

{id:"s17", tipo:"tre", tema:"chiaro", sopratitolo:"Passo 3 · gli obiettivi rendono possibile la valutazione del passo 5", box:[
  {n:"1", t:"Centrati sul paziente", d:"non su ciò che fa l'infermiere"},
  {n:"2", t:"Misurabili"},
  {n:"3", t:"Con un tempo", key:true}]},
{id:"s18", tipo:"tabella", tema:"chiaro", sopratitolo:"Un obiettivo misurabile", colonne:["36%","64%"],
  intestazioni:["Non", "Ma"], righe:[
  ["«migliorare il respiro»", "SpO₂ **94–98%** e FR **< 20** entro **2 ore**"],
  ["«controllare il dolore»", "NRS **≤ 3** a riposo e **≤ 4** in movimento entro **1 ora**"]], chiave:[0,1]},

{id:"s19", sopratitolo:"Passo 4 · gli interventi, in tre gruppi", ...INTERVENTI([0,1], 1)},
{id:"s20", sopratitolo:"«Somministro l'antibiotico» senza prescrizione: il commissario lo nota subito", ...INTERVENTI([0,1,2], 2)},
{id:"s21", tipo:"sostituzione", tema:"chiaro", sopratitolo:"Ogni intervento con il suo perché, e specifico",
  da:{h:"Generico", t:"«Monitoro il paziente»"},
  a:{h:"Specifico", t:"Parametri **ogni 15 minuti** per un'ora, poi **ogni ora**"}},

{id:"s22", tipo:"tre", tema:"chiaro", sopratitolo:"Passo 5", attive:[0,1], box:[
  {n:"1", t:"Valutazione", d:"obiettivo raggiunto? se no, si **rivede il piano**"},
  {n:"2", t:"Comunicazione", d:"**SBAR** al medico · consegne · paziente e familiari", key:true},
  {n:"3", t:"Documentazione", d:"che cosa, quando, chi, la risposta"}]},
{id:"s23", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"Il passo che molti dimenticano, e con esso una parte del punteggio", celle:[
  {t:"**Documentare**: che cosa, quando, chi, la risposta del paziente"},
  {t:"**Segnalare** eventi avversi e quasi eventi"},
  {t:"**Continuità**: dimissione, territorio", key:true}]},

{id:"s24", tipo:"elenco", tema:"chiaro", numerato:true, sopratitolo:"Se l'ansia ti fa dimenticare lo schema · sei domande", attive:[0,1,2], voci:[
  {t:"Il paziente è **stabile**?"}, {t:"Che cosa può **peggiorare** nelle prossime ore?"},
  {t:"Che cosa faccio **subito**?"}, {t:"**Chi** devo avvisare, e come?"},
  {t:"Che cosa **preparo** e che cosa **insegno**?"}, {t:"Come **documento**, e chi riceve le **consegne**?"}]},
{id:"s25", tipo:"elenco", tema:"chiaro", numerato:true, sopratitolo:"In quest'ordine: è già una risposta solida", voci:[
  {t:"Il paziente è **stabile**?"}, {t:"Che cosa può **peggiorare** nelle prossime ore?"},
  {t:"Che cosa faccio **subito**?"}, {t:"**Chi** devo avvisare, e come?"},
  {t:"Che cosa **preparo** e che cosa **insegno**?"}, {t:"Come **documento**, e chi riceve le **consegne**?"}]},

{id:"s26", tipo:"pausa", tema:"chiaro", sopratitolo:"Il mini-caso dimostrativo", es:"proviamo subito",
  testo:"Signora di **82 anni**, frattura del femore destro, intervento domani. Alle **23**: dolore **8/10**, agitata, **confusa**: prima era orientata.",
  dati:["femore destro", "ore 23", "dolore 8/10", "confusione nuova"]},
{id:"s27", tipo:"tre", tema:"chiaro", sopratitolo:"Paracetamolo al bisogno, anticoagulante orale sospeso ieri · quali dati sono anomali?", box:[
  {n:"1", t:"Confusione nuova", d:"era **orientata**", key:true},
  {n:"2", t:"Dolore alto", d:"**8** su 10"},
  {n:"3", t:"Mancata minzione", d:"da **7 ore**"}]},

{id:"s28", tipo:"catena", tema:"chiaro", sopratitolo:"Il ragionamento", passi:[
  {t:"È **stabile**?", d:"parametri, SpO₂, glicemia"},
  {t:"Escludo", d:"ipossia, ipoglicemia, infezione"},
  {t:"**Delirium**", d:"confermato con la **CAM**", key:true}]},
{id:"s29", tipo:"figura", tema:"chiaro", illu:"globo", sopratitolo:"Il delirium · i fattori scatenanti probabili",
  titolo:"Il **dolore** non controllato e una possibile **ritenzione**.", sotto:"La ritenzione si verifica con il bladder scanner."},
{id:"s30", tipo:"corpo", tema:"chiaro", lato:"entrambi", sopratitolo:"I rischi, oltre alla caduta · poi SBAR al medico: analgesia e, se c'è il globo, cateterismo", voci:[
  {z:"braccia", t:"Rimozione dei dispositivi"},
  {z:"gambe", t:"Trombosi", d:"immobile, anticoagulante sospeso", key:true},
  {z:"piedi", t:"Lesioni ai talloni"},
  {z:"sacro", t:"Lesioni al sacro"}]},

{id:"s31", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Gli interventi", celle:[
  {t:"**Analgesia** secondo prescrizione · rivaluto dopo **30–60 min**", key:true},
  {t:"**Bladder scanner** · cateterismo se indicato"},
  {t:"**Orientamento**: occhiali, apparecchi acustici"},
  {t:"Luce soffusa · un **familiare** se possibile"}]},
{id:"s32", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Nessuna contenzione", celle:[
  {no:true, t:"**Contenzione**"}, {t:"**Letto basso**"}, {t:"**Campanello** a portata"},
  {t:"Sorveglianza **ravvicinata**"}, {t:"**Scarico dei talloni**, riposizionamento"},
  {t:"Profilassi antitrombotica **secondo prescrizione**", key:true}]},
{id:"s33", tipo:"icone", tema:"chiaro", sopratitolo:"E poi", voci:[
  {icona:"orologio", t:"Digiuno", d:"secondo l'anestesista, per l'intervento di domani"},
  {icona:"cartella", t:"Documentazione"},
  {icona:"dialogo", t:"Consegne", d:"alla collega del mattino", key:true}]},

{id:"s34", tipo:"citazione", tema:"tenue", sopratitolo:"La traccia: «dolore postoperatorio 8/10, descriva l'assistenza»",
  testo:"L'infermiere valuta il dolore, somministra la terapia e monitora il paziente, che è **al centro dell'assistenza**.",
  fonte:"Scritta male"},
{id:"s35", tipo:"trappola", tema:"chiaro", sopratitolo:"Tutto vero, ma non dice nulla", righe:[
  {sb:"Nessuno strumento, nessun obiettivo, nessun tempo", ok:"Scritta bene: valuto il dolore con **NRS** a riposo e in movimento, sede e caratteristiche"}]},
{id:"s36", sopratitolo:"Scritta bene", ...BENE([0,1,2], 2)},
{id:"s37", sopratitolo:"Stesso argomento, punteggio molto diverso", ...BENE([0,1,2,3,4,5], 5)},

{id:"s38", sopratitolo:"D1 · che differenza c'è fra diagnosi infermieristica e problema collaborativo?", ...BIVIO(0)},
{id:"s39", sopratitolo:"D1 · il problema collaborativo", ...BIVIO(1)},
{id:"s40", sopratitolo:"D2 · come stabilisce le priorità fra più problemi dello stesso paziente?", ...PRIORITA([0,1,2,3], 0)},
{id:"s41", tipo:"tre", tema:"chiaro", sopratitolo:"D3 · un obiettivo misurabile dice se l'intervento ha funzionato", box:[
  {n:"1", t:"Centrato sul paziente"},
  {n:"2", t:"Osservabile"},
  {n:"3", t:"Un valore e un tempo", key:true}]},

{id:"s42", tipo:"tabella", tema:"chiaro", sopratitolo:"La risposta in 15 righe", colonne:["22%","78%"],
  intestazioni:["Righe", "Che cosa"], righe:[
  ["1–2", "**inquadramento**: che cosa sta succedendo"],
  ["2–3", "**priorità**"],
  ["6–8", "**interventi** motivati: autonomi, collaborativi, attribuiti"],
  ["2–3", "valutazione, comunicazione, documentazione, continuità"]], chiave:[2]},
{id:"s43", tipo:"trappola", tema:"chiaro", sopratitolo:"Lessico tecnico, frasi brevi", righe:[
  {sb:"«L'infermiere è il professionista responsabile dell'assistenza generale…»", ok:"Le premesse generiche **occupano righe e non danno punti**"}]},

{id:"s44", sopratitolo:"Gli errori che costano punti", ...ERRORI([0,1,2])},
{id:"s45", sopratitolo:"Il dato anomalo: lì c'era la domanda vera", ...ERRORI([0,1,2,3,4,5,6])},

{id:"s46", tipo:"percorso", tema:"chiaro", sopratitolo:"I prossimi undici casi · ognuno avrà", tappe:[
  {t:"Scenario"}, {t:"Evoluzione nel tempo"}, {t:"Decisioni"},
  {t:"Errori da evitare"}, {t:"Collegamenti ai moduli"}, {t:"Risposta modello", d:"in 15 righe", key:true}]},
{id:"s47", tipo:"pausa", tema:"chiaro", sopratitolo:"Un consiglio che vale doppio", es:"dopo ogni scenario",
  testo:"**Metti in pausa** e prova a rispondere da sola o da solo, **per iscritto**. Poi confronta.",
  dati:["l'allenamento più vicino alla prova vera"]},

{id:"s48", tipo:"titolo", tema:"profondo",
  titolo:"Leggi il dato anomalo,<br>**metti in ordine**, motiva, documenta.",
  sotto:"Il metodo in quattro parole"},

{id:"s49", tipo:"figura", tema:"chiaro", illu:"luna", sopratitolo:"Nella prossima lezione · il primo caso completo",
  titolo:"Un paziente di medicina che, **nel cuore della notte**, comincia a peggiorare."},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione · 15.2",
  titolo:"Il paziente che si<br>deteriora di notte", sottotitolo:"Dalla polmonite alla sepsi",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
