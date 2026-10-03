// Contenuto delle 50 scene della lezione 9.5 — le complicanze
// postoperatorie. Nessun corpo nuovo: la cronologia è un percorso a
// tappe, le cinque W una scala, l'emorragia un confronto precoce/tardivo,
// ogni complicanza una griglia di segni, i due casi cifre e griglie.

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 9 · Assistenza perioperatoria",
  titolo:"Le complicanze<br>postoperatorie", sottotitolo:"9.5 · Cronologia, cinque W, emorragia, atelettasia, TVP, ileo",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"frase", tema:"chiaro", sopratitolo:"Micro-lezione 5 di 8 · ogni giornata dopo l'intervento ha i suoi sospetti",
  testo:"Le complicanze postoperatorie compaiono in **momenti tipici**."},
{id:"s03", tipo:"percorso", tema:"chiaro", sopratitolo:"Conoscere la cronologia permette di cercare la complicanza giusta al momento giusto", tappe:[
  {t:"Emorragia", d:"prime ore", key:true}, {t:"Atelettasia", d:"primi giorni"}, {t:"Ferita", d:"dopo qualche giorno"}, {t:"Trombosi", d:"più avanti"}], attive:[0,1,2,3]},

{id:"s04", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"La cronologia · prime ore · le complicanze dell'anestesia e della ferita appena chiusa", celle:[
  {n:"1", t:"**Emorragia** e shock", key:true}, {n:"2", t:"**Ostruzione** delle vie aeree"}, {n:"3", t:"Nausea e **vomito**"}, {n:"4", t:"**Ritenzione** urinaria"}]},
{id:"s05", tipo:"confronto", tema:"chiaro", sopratitolo:"La cronologia", col:[
  {h:"Giorni 1-2", t:"**atelettasia**, delirium", key:true}, {h:"Giorni 3-5", t:"polmonite, infezione **urinaria**, ileo che si prolunga"}]},
{id:"s06", tipo:"confronto", tema:"chiaro", sopratitolo:"La cronologia", col:[
  {h:"Giorni 5-10", t:"**infezione** della ferita, **deiscenza**"}, {h:"In ogni momento", t:"**trombosi venosa** ed **embolia**, più tipiche dopo i primi giorni", key:true}]},

{id:"s07", tipo:"frase", tema:"chiaro", sopratitolo:"La febbre postoperatoria · una regola mnemonica inglese",
  testo:"Le **cinque W**: cinque parole con la stessa lettera, una per ogni sede e per ogni giornata."},
{id:"s08", tipo:"scala", tema:"chiaro", sopratitolo:"Le cinque W · le prime due", gradini:[
  {n:"W", t:"Wind · il polmone · giorni 1-2", key:true}, {n:"W", t:"Water · le vie urinarie · giorni 3-5"}]},
{id:"s09", tipo:"scala", tema:"chiaro", sopratitolo:"Le cinque W", gradini:[
  {n:"W", t:"Wind · polmone · 1-2"}, {n:"W", t:"Water · urine · 3-5"}, {n:"W", t:"Wound · ferita · 5-7", key:true}, {n:"W", t:"Walking · trombosi · dopo il 5°"}, {n:"W", t:"Wonder drugs · farmaci, trasfusioni · sempre"}]},
{id:"s10", tipo:"frase", tema:"chiaro", sopratitolo:"Una precisazione · non richiede di cercare un'infezione",
  testo:"Una **febbricola nelle prime 24-48 ore** è spesso solo la risposta infiammatoria all'intervento."},

{id:"s11", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"L'emorragia · i segni precoci sono quelli che contano · i segni del compenso", celle:[
  {n:"1", t:"**Tachicardia**", key:true}, {n:"2", t:"**Agitazione**"}, {n:"3", t:"Pallore, sudorazione"}, {n:"4", t:"Riempimento capillare **lento**"}, {n:"5", t:"**Oliguria**"}]},
{id:"s12", tipo:"confronto", tema:"chiaro", sopratitolo:"Quando la pressione crolla, la persona ha già perso molto sangue, e il compenso è finito", col:[
  {h:"Precoce", t:"tachicardia, agitazione, pallore"}, {h:"Tardivo", t:"**ipotensione**", key:true}]},
{id:"s13", tipo:"titolo", tema:"profondo",
  titolo:"L'ipotensione è<br>un segno **tardivo**.",
  sotto:""},
{id:"s14", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Le fonti · il sangue che non esce si accumula dove non si vede", celle:[
  {n:"1", t:"La **ferita**"}, {n:"2", t:"I **drenaggi**"}, {n:"3", t:"**Interno**: addome teso e dolente", key:true}]},
{id:"s15", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"La condotta", celle:[
  {t:"**Avvisare subito**, ossigeno", key:true}, {t:"**Accessi venosi**, prelievi con **gruppo**"}, {t:"Liquidi ed **emocomponenti** secondo prescrizione"}, {t:"**Digiuno**, parametri ravvicinati"}]},

{id:"s16", tipo:"catena", tema:"chiaro", sopratitolo:"L'atelettasia · piccole porzioni di polmone collassano · perché si respira in modo superficiale", passi:[
  {t:"Dolore, oppioidi", key:true}, {t:"Immobilità, anestesia"}, {t:"Respiro superficiale"}, {t:"Polmone che si chiude"}]},
{id:"s17", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"I segni · le basi: dove l'aria arriva meno quando si sta sdraiati", celle:[
  {n:"1", t:"Lieve **febbre**"}, {n:"2", t:"**Tachipnea**"}, {n:"3", t:"**Desaturazione**", key:true}, {n:"4", t:"**Murmure ridotto** alle basi"}]},
{id:"s18", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"La complicanza in cui l'infermiere conta di più · si previene quasi del tutto", celle:[
  {t:"**Respirazione profonda**", key:true}, {t:"**Spirometro** incentivante"}, {t:"**Tosse** con sostegno della ferita"}]},
{id:"s19", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"Se non si previene, evolve in polmonite · il polmone chiuso è il polmone che si infetta", celle:[
  {t:"**Mobilizzazione**", key:true}, {t:"**Analgesia** adeguata"}, {t:"Posizione **semiseduta**"}]},

{id:"s20", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Trombosi venosa profonda · monolaterale è la parola chiave: una gamba sola, più grossa dell'altra", celle:[
  {n:"1", t:"**Dolore**"}, {n:"2", t:"**Edema monolaterale** del polpaccio", key:true}, {n:"3", t:"**Calore**"}]},
{id:"s21", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Embolia polmonare · la persona sente di non respirare", celle:[
  {n:"1", t:"**Dispnea improvvisa**", key:true}, {n:"2", t:"Dolore **toracico**"}, {n:"3", t:"**Tachicardia**, desaturazione"}, {n:"4", t:"Intensa **ansia**"}]},
{id:"s22", tipo:"trappola", tema:"chiaro", sopratitolo:"La prevenzione: mobilizzazione precoce, profilassi meccanica e farmacologica, idratazione · nel sospetto di TVP, lezione 3.2", righe:[
  {sb:"Massaggiare la gamba", ok:"**Non massaggiare**, avvisare"}]},

{id:"s23", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"La ritenzione urinaria · la vescica piena che trabocca inganna chi guarda solo il pannolone", celle:[
  {n:"6-8", t:"**ore** senza minzione", key:true}, {n:"≈", t:"Oppure minzioni **piccole e frequenti**, per rigurgito"}]},
{id:"s24", tipo:"trappola", tema:"chiaro", sopratitolo:"Il globo, il dolore sovrapubico, l'agitazione", righe:[
  {sb:"Un anziano agitato: «è delirium», e si seda", ok:"**Prima si guarda la vescica**"}]},
{id:"s25", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Si valuta con il bladder scanner · cateterismo secondo indicazione · i fattori di rischio", celle:[
  {t:"Anestesia **spinale**"}, {t:"**Oppioidi**", key:true}, {t:"Chirurgia **pelvica**"}, {t:"**Prostata**"}]},

{id:"s26", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"L'ileo paralitico · dopo la chirurgia addominale l'intestino rallenta, e a volte si ferma", celle:[
  {n:"1", t:"**Distensione** addominale", key:true}, {n:"2", t:"**Assenza di gas** e feci"}, {n:"3", t:"Nausea, **vomito**"}, {n:"4", t:"Peristalsi **assente**"}]},
{id:"s27", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Si previene con gli strumenti dell'ERAS", celle:[
  {t:"**Mobilizzazione** precoce", key:true}, {t:"**Alimentazione** precoce"}, {t:"**Meno oppioidi**: rallentano l'intestino"}, {t:"Equilibrio dei **liquidi**"}]},
{id:"s28", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Il trattamento, su prescrizione", celle:[
  {n:"1", t:"**Digiuno**; a volte un **sondino naso-gastrico** in aspirazione"}, {n:"K⁺", t:"Correzione degli elettroliti, soprattutto del **potassio**: la sua carenza rallenta l'intestino", key:true}]},

{id:"s29", tipo:"frase", tema:"chiaro", sopratitolo:"Infezione della ferita e deiscenza · approfondite nella lezione 7.4",
  testo:"Qui le collochiamo **nel tempo**."},
{id:"s30", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"L'infezione · giorni 5-7", celle:[
  {n:"1", t:"**Rossore** che si estende", key:true}, {n:"2", t:"**Dolore che aumenta** invece di diminuire"}, {n:"3", t:"Essudato **purulento**"}, {n:"4", t:"**Febbre**"}]},
{id:"s31", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"La deiscenza · giorni 5-10 · e l'eviscerazione, con la sua sequenza di emergenza", celle:[
  {n:"!", t:"Preannunciata da un abbondante **liquido siero-ematico**", key:true}]},

{id:"s32", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Le altre complicanze, da non dimenticare", celle:[
  {n:"1", t:"**Delirium** dell'anziano: primi tre giorni", key:true}, {n:"2", t:"**Lesioni da pressione**: sacro e talloni, iniziano in sala"}]},
{id:"s33", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Le altre complicanze · si leggono gli esami, non solo i parametri", celle:[
  {n:"3", t:"**Iperglicemia** da stress, anche nel non diabetico", key:true}, {n:"4", t:"**Squilibri elettrolitici**: perdite, liquidi infusi, digiuno"}]},
{id:"s34", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Le altre complicanze", celle:[
  {n:"5", t:"**Infezioni da dispositivi**: catetere vescicale e CVC, da rimuovere appena possibile", key:true}, {n:"6", t:"**Stipsi** da oppioidi"}]},

{id:"s35", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Il filo comune: il riconoscimento precoce", celle:[
  {t:"**Parametri** a intervalli definiti"}, {t:"Punteggio di allerta precoce: **NEWS2**, dal numero all'azione", key:true}]},
{id:"s36", tipo:"frase", tema:"chiaro", sopratitolo:"Una cosa che non compare negli strumenti · spesso precedono di ore l'alterazione dei parametri",
  testo:"**Ascoltare il paziente**: un «non mi sento bene», un'ansia nuova, una confusione improvvisa."},
{id:"s37", tipo:"confronto", tema:"chiaro", sopratitolo:"Si guarda il trend, non il singolo valore · e si segnala con lo SBAR", col:[
  {h:"Frequenza 100", t:"da sola, dice poco"}, {h:"Frequenza 100, ieri 70", t:"dice **molto di più**", key:true}]},

{id:"s38", tipo:"cifre", tema:"chiaro", sopratitolo:"Caso 1 · secondo giorno dopo una colectomia · murmure ridotto alle basi", voci:[
  {n:"37,9", suf:"°C", d:"febbre"}, {n:"24", suf:"/min", d:"frequenza respiratoria"}, {n:"92", suf:"%", d:"saturazione", key:true}]},
{id:"s39", tipo:"frase", tema:"chiaro", sopratitolo:"E il paziente è rimasto a letto per il dolore · che cosa pensi?",
  testo:"**Atelettasia**: è il secondo giorno, è il polmone. Wind, la prima W."},
{id:"s40", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Che cosa fai? · il problema nasce dal dolore", celle:[
  {t:"Avvisi il medico, **ossigeno** secondo prescrizione"}, {t:"Semiseduto, **analgesia** adeguata", key:true}, {t:"**Spirometro**, tosse con sostegno della ferita"}, {t:"**Mobilizzazione**"}]},

{id:"s41", tipo:"cifre", tema:"chiaro", sopratitolo:"Caso 2 · sesto giorno dopo una protesi d'anca · improvvisa dispnea, dolore toracico, paziente molto ansioso", voci:[
  {n:"118", suf:"bpm", d:"frequenza"}, {n:"88", suf:"%", d:"saturazione", key:true}]},
{id:"s42", tipo:"frase", tema:"chiaro", sopratitolo:"Che cosa pensi? · l'ortopedia dell'arto inferiore è fra i contesti a più alto rischio trombotico, e il sesto giorno è il momento tipico",
  testo:"**Embolia polmonare**, fino a prova contraria."},
{id:"s43", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Che cosa fai?", celle:[
  {t:"**Avvisi subito** il medico, ossigeno", key:true}, {t:"Semiseduto, **monitoraggio**"}, {t:"Accesso venoso, prelievi, **ECG**"}, {t:"Prepari gli **esami diagnostici**"}]},
{id:"s44", tipo:"trappola", tema:"chiaro", sopratitolo:"Un paziente che dice di non respirare va creduto", righe:[
  {sb:"«È ansioso», e la dispnea si attribuisce all'ansia", ok:"Qui **l'ansia è un sintomo**, non la causa"}]},

{id:"s45", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"In Veneto · il riconoscimento precoce del deterioramento", celle:[
  {n:"1", t:"**Sistemi di allerta** ed équipe di **risposta rapida**: modulo 10", key:true}]},
{id:"s46", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"In Veneto", celle:[
  {n:"2", t:"Protocolli di **profilassi antitrombotica**, sorveglianza delle **infezioni del sito chirurgico**"}, {n:"3", t:"Percorsi **ortogeriatrici** per l'anziano operato", key:true}]},

{id:"s47", tipo:"tabella", tema:"chiaro", sopratitolo:"La tabella", intestazioni:["Quando","Che cosa","Il segno o l'arma"], colonne:[1.2,1.4,2], righe:[
  ["Prime ore","**Emorragia**","la tachicardia precede l'ipotensione"],
  ["Giorni 1-2","**Atelettasia**","spirometro e mobilizzazione"],
  ["Giorni 3-5","Polmonite, **urine**","febbre: Wind, Water"]]},
{id:"s48", tipo:"tabella", tema:"chiaro", sopratitolo:"La tabella", intestazioni:["Quando","Che cosa","Il segno o l'arma"], colonne:[1.2,1.4,2], righe:[
  ["Giorni 5-7","**Ferita**","rossore, essudato"],
  ["Giorni 5-10","**Deiscenza**","liquido siero-ematico"],
  ["Dopo il 5°","**Trombosi**, embolia","dispnea improvvisa"],
  ["Addominale","**Ileo**","distensione; controllo del potassio"]]},
{id:"s49", tipo:"frase", tema:"chiaro", sopratitolo:"Una frase per chiudere · nella prossima lezione: le chirurgie specialistiche e il day surgery",
  testo:"Cercare la **complicanza giusta** al **momento giusto**."},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"9.6<br>Chirurgie specialistiche:<br>specificità assistenziali", sottotitolo:"Ortopedia, addominale, vascolare, toracica, urologica, day surgery",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
