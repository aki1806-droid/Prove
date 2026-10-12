// Contenuto delle 50 scene della lezione 17.6 — il paziente in terapia
// sostitutiva per oppioidi. Il caso di Stefano in Chirurgia: la notte fra
// sabato e domenica come percorso, l'astinenza riconosciuta e distinta dalla
// «ricerca di farmaci», le azioni, il dolore nel paziente tollerante, la
// sicurezza (QT, interazioni, doppia dose); astinenza e overdose a confronto
// in due colonne (la libreria non ha un confronto di pupille dilatate e
// puntiformi: il dato sta scritto in testa alle due colonne); il naloxone che
// dura meno; errori in tabella; la risposta modello riga per riga.
// Linguaggio non stigmatizzante, nessuna immagine di uso di sostanze.

const LEZIONI = [
  {n:"3.7", t:"Dolore e PCA", illu:"pca"},
  {n:"5.4", t:"Riconciliazione", illu:"farmaci"},
  {n:"5.6", t:"Oppioidi e naloxone", illu:"siringa"},
  {n:"5.7", t:"Stupefacenti", illu:"quaderno"},
  {n:"11.3", t:"Dipendenze e SerD", illu:"ascolto"}];

const NOTTE = (att, k) => ({tipo:"percorso", tema:"chiaro", attive:att, tappe:[
  {t:"Sabato sera", d:"ricovero in Chirurgia", key:k===0},
  {t:"All'ingresso", d:"metadone non verificato", key:k===1},
  {t:"Domenica, ore 3", d:"sbadigli, sudorazione, lacrimazione", key:k===2}]});

const CONFRONTO = (att) => ({tipo:"colonne", tema:"chiaro", attive:att, colonne:[
  {h:"Astinenza", voci:[{t:"Pupille **dilatate**", d:"midriasi"}, {t:"Suda, lacrima, naso che cola"},
    {t:"Sbadigli, pelle d'oca, diarrea"}, {t:"Agitata, tachicardica"},
    {t:"Sofferenza intensa", d:"raramente pericolosa per la vita in un adulto"}]},
  {h:"Overdose", key:true, voci:[{t:"Pupille **puntiformi**", d:"miosi"}, {t:"Sedazione **profonda**"},
    {t:"Respiro lento, fino all'**apnea**"}, {t:"Cianosi"}, {t:"**Emergenza**", key:true}]}]});

const RISPOSTA = (att) => ({tipo:"memo", tema:"chiaro", attive:att, voci:[
  "**Inquadramento**: metadone, dose non somministrata, midriasi, sudorazione, crampi, agitazione → **astinenza da oppioidi**",
  "Parametri · scala dell'astinenza · medico avvisato",
  "Dose e orario dell'ultima assunzione verificati con il **SerD**",
  "Terapia sostitutiva prescritta · **registrata** · niente doppie dosi",
  "Dolore: analgesia **multimodale**, tolleranza, sedazione e respiro · **naloxone** disponibile",
  "Interazioni e **QT** segnalati · relazione **senza giudizio** · screening e vaccinazioni, con il consenso",
  "Dimissione: **continuità** con il SerD"]});

const COLLEGAMENTI = (att) => ({tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, attive:att, celle:[
  {n:"3.7", t:"Dolore e PCA"}, {n:"5.4", t:"Riconciliazione"}, {n:"5.6", t:"Oppioidi e naloxone"},
  {n:"5.7", t:"Stupefacenti · DPR 309/1990"}, {n:"11.3", t:"Dipendenze e SerD"}, {n:"6.1", t:"Accessi venosi difficili"},
  {n:"1.4", t:"Codice deontologico"}]});

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 17 · Casi clinici avanzati",
  titolo:"Il paziente in terapia<br>sostitutiva per oppioidi", sottotitolo:"17.6 · Astinenza, continuità della terapia, dolore e pregiudizi",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"figura", tema:"chiaro", illu:"persona", sopratitolo:"Micro-lezione 6 di 12 · ricoverato per un altro problema",
  titolo:"Un paziente guardato, ancora oggi, con **diffidenza**.", sotto:"Una persona con una dipendenza da oppioidi, in terapia sostitutiva con il metadone."},
{id:"s03", tipo:"percorso", tema:"chiaro", sopratitolo:"Che cosa vedremo", tappe:[
  {t:"L'astinenza", d:"riconoscerla"}, {t:"La terapia sostitutiva", d:"non si interrompe", key:true},
  {t:"Il dolore", d:"nel paziente tollerante agli oppioidi"}, {t:"I pregiudizi", d:"superarli"}]},
{id:"s04", tipo:"anello", tema:"chiaro", sopratitolo:"I collegamenti",
  centro:"17.6", sotto:"il metadone è una terapia", voci:LEZIONI},

{id:"s05", tipo:"cifre", tema:"chiaro", sopratitolo:"Lo scenario · Stefano, in terapia con metadone presso il SerD, con una buona stabilità", voci:[
  {n:"41", suf:"anni", t:"ricoverato in Chirurgia", d:"un ascesso del braccio da drenare"},
  {n:"3", suf:"anni", t:"di terapia con metadone", key:true}]},
{id:"s06", sopratitolo:"L'ascesso: un pregresso uso di sostanze per via endovenosa · all'ingresso nessuno verifica il metadone", ...NOTTE([0,1,2], 1)},
{id:"s07", tipo:"pausa", tema:"chiaro", sopratitolo:"Un collega commenta: «sta solo cercando farmaci»", es:"metti in pausa",
  testo:"Che cosa **sta succedendo**, e che cosa **rispondi** al collega?",
  dati:["naso che cola", "pupille dilatate", "pelle d'oca", "crampi, diarrea", "agitazione"]},

{id:"s08", tipo:"catena", tema:"chiaro", sopratitolo:"Il ragionamento", passi:[
  {t:"In terapia con **metadone**"},
  {t:"Dose **non somministrata**", d:"dal giorno prima"},
  {t:"Sindrome da **astinenza** da oppioidi", key:true}]},
{id:"s09", tipo:"colonne", tema:"chiaro", sopratitolo:"I segni oggettivi sono inequivocabili", colonne:[
  {h:"Segni oggettivi", key:true, voci:[{t:"Pupille **dilatate** · sudorazione · lacrimazione"}, {t:"Naso che cola · pelle d'oca · sbadigli"}, {t:"Diarrea · **tachicardia**"}]},
  {h:"Sintomi soggettivi", voci:[{t:"Ansia · crampi"}, {t:"Dolori ossei e muscolari"}, {t:"Desiderio intenso della sostanza"}]}]},
{id:"s10", tipo:"sostituzione", tema:"chiaro", sopratitolo:"Che cosa rispondi al collega",
  da:{h:"Non è", t:"«ricerca di farmaci»"}, a:{h:"È", t:"una condizione clinica"},
  sotto:"Causata dall'interruzione di una terapia prescritta: il metadone, per Stefano, è come l'insulina per un diabetico."},

{id:"s11", tipo:"icone", tema:"chiaro", sopratitolo:"Le azioni", voci:[
  {icona:"stetoscopio", t:"Parametri"},
  {icona:"spunta", t:"Una scala", d:"per l'astinenza, come la COWS"},
  {icona:"telefono", t:"Medico di guardia"},
  {icona:"documento", t:"La dose", d:"SerD, piano terapeutico, servizio di riferimento", key:true}]},
{id:"s12", tipo:"figura", tema:"chiaro", illu:"orologio", sopratitolo:"Anche con la reperibilità nei giorni festivi",
  titolo:"L'**ultima dose** assunta, e il suo **orario**.", sotto:"Per evitare sia la mancata somministrazione sia la doppia dose."},
{id:"s13", tipo:"icone", tema:"chiaro", sopratitolo:"Poi la terapia continua", voci:[
  {icona:"farmaci", t:"Terapia sostitutiva", d:"secondo prescrizione", key:true},
  {icona:"quaderno", t:"Registro degli stupefacenti", d:"lezione 5.7"},
  {icona:"flebo", t:"Idratazione", d:"e sintomatici, secondo prescrizione"},
  {icona:"ascolto", t:"Rassicurazione", d:"teme di non essere creduto"}]},

{id:"s14", tipo:"catena", tema:"chiaro", sopratitolo:"Perché la terapia sostitutiva non si interrompe", passi:[
  {t:"Interromperla"}, {t:"Astinenza e **sofferenza**"},
  {t:"Abbandono delle cure", d:"dimissioni contro il parere medico", key:true},
  {t:"Sostanze", d:"procurate durante il ricovero"}]},
{id:"s15", tipo:"confronto", tema:"chiaro", sopratitolo:"Un'occasione di cura, non di «disintossicazione» forzata · le modifiche solo con il medico e il SerD", col:[
  {h:"La dose abituale serve a", t:"**prevenire** l'astinenza", grande:true},
  {h:"Non serve a", t:"trattare il dolore acuto"}]},

{id:"s16", tipo:"cifre", tema:"chiaro", sopratitolo:"Il secondo errore frequente: pensare che il metadone «copra» anche il dolore", voci:[
  {n:"8", suf:"su 10", t:"il dolore dopo il drenaggio", d:"la dose abituale **non copre** il dolore acuto", key:true}]},
{id:"s17", tipo:"griglia", tema:"chiaro", colonne:2, sopratitolo:"Per la tolleranza · secondo prescrizione · un'analgesia multimodale", celle:[
  {t:"Oppioidi a dosi **più alte** del solito"}, {t:"**Paracetamolo**"},
  {t:"**FANS**, se non controindicati"}, {t:"Anestesia **locale** o loco-regionale"}]},
{id:"s18", tipo:"frase", tema:"chiaro", sopratitolo:"Scala, rivalutazione, sedazione e respiro · lezione 3.7",
  testo:"Il dolore riferito va **creduto**.",
  sotto:"Come per qualunque altro paziente."},

{id:"s19", tipo:"icone", tema:"chiaro", sopratitolo:"La sicurezza · metadone e interazioni", voci:[
  {icona:"cuore2", t:"ECG", d:"il metadone può allungare il QT"},
  {icona:"avviso", t:"Farmaci che allungano il QT", d:"attenzione"},
  {icona:"pillola", t:"Antibiotici, antimicotici", d:"e altri: ne modificano i livelli", key:true}]},
{id:"s20", tipo:"catena", tema:"chiaro", sopratitolo:"Un'interazione da segnalare: Stefano riceverà antibiotici per l'ascesso", passi:[
  {t:"Metadone con **benzodiazepine**", d:"alcol o altri sedativi"},
  {t:"Depressione **respiratoria**", d:"il rischio cresce"},
  {t:"**Naloxone** disponibile", d:"lezione 5.6", key:true}]},
{id:"s21", tipo:"tre", tema:"chiaro", sopratitolo:"La doppia dose: un errore reale fra SerD e ospedale · una registrazione puntuale e chiara", box:[
  {n:"Chi", t:"ha somministrato"}, {n:"Quanto", t:"la dose"}, {n:"Quando", t:"l'orario", key:true}]},

{id:"s22", sopratitolo:"Approfondimento · astinenza e overdose sono quadri opposti", ...CONFRONTO([0])},
{id:"s23", sopratitolo:"Approfondimento · astinenza e overdose sono quadri opposti", ...CONFRONTO([0,1])},
{id:"s24", tipo:"antidoto", tema:"chiaro", sopratitolo:"Overdose: stimolare, ventilare, naloxone, chiamare aiuto · e il naloxone dura meno degli oppioidi",
  testo:"può riaddormentarsi"},

{id:"s25", tipo:"frase", tema:"chiaro", sopratitolo:"La salute oltre la dipendenza",
  testo:"L'ascesso: cura della **ferita** e **antibiotico**.", sotto:"Da un pregresso uso endovenoso."},
{id:"s26", tipo:"icone", tema:"chiaro", sopratitolo:"Il ricovero è un'occasione · sempre con il consenso", voci:[
  {icona:"provetta", t:"Test", d:"HIV, epatiti B e C", key:true},
  {icona:"siringa", t:"Vaccinazioni", d:"come quella contro l'epatite B"},
  {icona:"scudo", t:"Riduzione del danno"}]},
{id:"s27", tipo:"griglia", tema:"chiaro", colonne:1, sopratitolo:"E ancora", celle:[
  {t:"Patrimonio venoso spesso compromesso: accessi con l'**ecografo** (lezione 6.1)"},
  {t:"La **salute mentale**"}, {t:"La **situazione sociale**"}]},

{id:"s28", tipo:"tre", tema:"chiaro", sopratitolo:"Il pregiudizio · lo stigma è frequente anche fra i professionisti", box:[
  {n:"1", t:"Dolore non trattato"}, {n:"2", t:"Astinenze non riconosciute"}, {n:"3", t:"Abbandono delle cure", key:true}]},
{id:"s29", tipo:"sostituzione", tema:"chiaro", sopratitolo:"Comincia dal linguaggio",
  da:{h:"Non", t:"«tossico»"}, a:{h:"Ma", t:"persona con un disturbo da uso di oppioidi"},
  sotto:"Il Codice deontologico: rispetto e non discriminazione."},
{id:"s30", tipo:"trappola", tema:"chiaro", sopratitolo:"Al collega si risponde con i fatti, non con un altro giudizio", righe:[
  {sb:"«Sta solo cercando farmaci»", ok:"Midriasi, sudorazione, dose non somministrata: i **fatti clinici**"}]},

{id:"s31", tipo:"percorso", tema:"chiaro", sopratitolo:"La dimissione e la continuità con il SerD", tappe:[
  {t:"Il ricovero", d:"comunicato al SerD"}, {t:"La dose", d:"somministrata in ospedale"},
  {t:"L'orario", d:"dell'ultima dose", key:true}, {t:"Il SerD", d:"senza sospensioni né doppie dosi"}]},
{id:"s32", tipo:"icone", tema:"chiaro", sopratitolo:"Che cosa si segnala e si spiega", voci:[
  {icona:"farmaci", t:"Terapie nuove", d:"antibiotici, analgesici: le interazioni"},
  {icona:"avviso", t:"Rischio di overdose", d:"se la tolleranza si riduce, dopo un periodo senza assunzione", key:true}]},
{id:"s33", tipo:"icone", tema:"chiaro", sopratitolo:"Prima di uscire", voci:[
  {icona:"siringa", t:"Naloxone", d:"come si usa, secondo le indicazioni locali", key:true},
  {icona:"orologio", t:"Follow-up", d:"gli appuntamenti fissati"}]},

{id:"s34", tipo:"tabella", tema:"chiaro", sopratitolo:"Gli errori da evitare · all'ingresso e nella notte", colonne:["55%","45%"],
  intestazioni:["Errore", "Invece"], righe:[
  ["no:Non chiedere della terapia sostitutiva", "**riconciliazione** all'ingresso"],
  ["no:Interrompere il metadone", "la terapia **continua**"],
  ["no:Astinenza letta come «ricerca di farmaci»", "i **segni oggettivi**"],
  ["no:«Il metadone copre il dolore acuto»", "analgesia **multimodale**"]], chiave:[1]},
{id:"s35", tipo:"tabella", tema:"chiaro", sopratitolo:"Gli errori da evitare · dolore, sicurezza, parole", colonne:["55%","45%"],
  intestazioni:["Errore", "Invece"], righe:[
  ["no:Sottotrattare il dolore per paura", "il dolore va **creduto**"],
  ["no:Doppia dose per mancata verifica", "dose e **orario** verificati"],
  ["no:Trascurare interazioni e QT", "**ECG** e segnalazione"],
  ["no:Linguaggio stigmatizzante", "**persona** con un disturbo"]], chiave:[1]},

{id:"s36", tipo:"griglia", tema:"chiaro", colonne:3, sopratitolo:"D1 · «Come si riconosce una sindrome da astinenza da oppioidi?» · anche con scale dedicate", celle:[
  {t:"**Midriasi**"}, {t:"Sudorazione"}, {t:"Lacrimazione"}, {t:"Rinorrea"}, {t:"Sbadigli"},
  {t:"Pelle d'oca"}, {t:"Crampi"}, {t:"Diarrea"}, {t:"Tachicardia"}, {t:"Ansia e agitazione"}]},
{id:"s37", tipo:"catena", tema:"chiaro", sopratitolo:"D2 · «Come si tratta il dolore acuto in un paziente in terapia con metadone?»", passi:[
  {t:"Dose abituale", d:"continua: previene l'astinenza"},
  {t:"Analgesia **multimodale**"},
  {t:"Oppioidi a dosi spesso **più alte**", d:"per la tolleranza"},
  {t:"**Sedazione** e respiro", d:"sorvegliati", key:true}]},
{id:"s38", tipo:"confronto", tema:"chiaro", sopratitolo:"D3 · «Che differenza c'è fra astinenza e overdose da oppioidi?»", col:[
  {h:"Astinenza", t:"**midriasi** · agitazione · iperattività autonomica"},
  {h:"Overdose", t:"**miosi** · sedazione profonda · depressione respiratoria: un'**emergenza**, con il naloxone"}]},

{id:"s39", sopratitolo:"La risposta modello, in 15 righe", ...RISPOSTA([0])},
{id:"s40", sopratitolo:"La risposta modello · le prime azioni", ...RISPOSTA([0,1,2])},
{id:"s41", sopratitolo:"La risposta modello · terapia e dolore", ...RISPOSTA([0,1,2,3,4])},
{id:"s42", sopratitolo:"La risposta modello · sicurezza, relazione, continuità", ...RISPOSTA([0,1,2,3,4,5,6])},

{id:"s43", sopratitolo:"I collegamenti", ...COLLEGAMENTI([0,1,2,3])},
{id:"s44", sopratitolo:"I collegamenti", ...COLLEGAMENTI([0,1,2,3,4,5,6])},

{id:"s45", tipo:"figura", tema:"chiaro", illu:"farmaci", sopratitolo:"Un ritorno all'origine del problema",
  titolo:"La **riconciliazione** all'ingresso.", sotto:"Il metadone non è stato rilevato: spesso non compare fra le terapie «di casa», perché lo dispensa il SerD."},
{id:"s46", tipo:"griglia", tema:"chiaro", colonne:2, sopratitolo:"All'ingresso si chiedono sempre i farmaci in corso, compresi", celle:[
  {t:"Quelli dispensati dal **SerD**"}, {t:"Dal **Centro di Salute Mentale**"},
  {t:"Dagli **ambulatori** specialistici"}, {t:"Le terapie a **lento rilascio**"}]},
{id:"s47", tipo:"norma", tema:"chiaro", sopratitolo:"La riconciliazione della terapia", etichetta:"Raccomandazione ministeriale", sigla:"n. 17",
  testo:"La dose da una **fonte documentata**; la prima somministrazione pianificata anche nei **giorni festivi**."},

{id:"s48", tipo:"titolo", tema:"profondo",
  titolo:"Il metadone<br>è una **terapia**.",
  sotto:"Si verifica, si continua e si registra come ogni altro farmaco."},

{id:"s49", tipo:"tre", tema:"chiaro", sopratitolo:"Nella prossima lezione usciamo dall'ospedale · una malattia avanzata, curata a casa", box:[
  {n:"1", t:"A casa", d:"per sua scelta"}, {n:"2", t:"La famiglia", d:"che lo assiste"},
  {n:"3", t:"L'équipe", d:"di cure palliative domiciliari", key:true}]},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione · 17.7",
  titolo:"Le cure palliative<br>a domicilio", sottotitolo:"Una casa, una famiglia, un'équipe",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
