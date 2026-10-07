// Contenuto delle 50 scene della lezione 13.5 — la rete per la non autosufficienza.
// I servizi sono una scala che sale dalla domiciliarità alla residenzialità;
// il percorso della persona una fila di tappe che si accende; i compiti
// dell'UVMD e la rivalutazione due cicli, perché il bisogno cambia.

const SERVIZI = (att, k) => ({tipo:"scala", tema:"chiaro", gradini:[
  {n:"1", t:"Domiciliarità", d:"ADI · SAD dei Comuni · impegnativa di cura domiciliare", key:k===0},
  {n:"2", t:"Semiresidenzialità", d:"centri diurni", key:k===1},
  {n:"3", t:"Residenzialità", d:"Centri di Servizi", key:k===2}], attive:att});

const PERCORSO = (att, k) => ({tipo:"percorso", tema:"chiaro", tappe:[
  {t:"Segnalazione", d:"MMG, ospedale, servizi sociali, famiglia", key:k===0},
  {t:"Domanda", d:"al distretto", key:k===1},
  {t:"UVMD", d:"valuta con la SVaMA", key:k===2},
  {t:"Progetto individuale", key:k===3},
  {t:"Servizio", key:k===4}], attive:att});

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 13 · Il Servizio Socio Sanitario del Veneto",
  titolo:"La rete per la<br>non autosufficienza", sottotitolo:"13.5 · UVMD, SVaMA, Centri di Servizi, impegnative e domiciliarità",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"icone", tema:"chiaro", sopratitolo:"Micro-lezione 5 di 8 · nomi propri che altrove non esistono", voci:[
  {icona:"casa", t:"Centri di Servizi", key:true}, {icona:"documento", t:"SVaMA"}, {icona:"certificato", t:"Impegnative"}]},
{id:"s03", tipo:"tre", tema:"chiaro", sopratitolo:"Termini che all'orale dimostrano una preparazione sul Veneto", box:[
  {n:"1", t:"Come si entra", d:"nella rete"}, {n:"2", t:"Quali servizi", d:"offre"}, {n:"3", t:"Che cosa fa l'infermiere", key:true}]},

{id:"s04", tipo:"trappola", tema:"chiaro", sopratitolo:"Il principio: la porta unica · non si accede perché", righe:[
  {sb:"C'è un posto libero", ok:"Non è questo che apre la porta"},
  {sb:"La famiglia insiste", ok:"Nemmeno questo"}]},
{id:"s05", tipo:"norma", tema:"chiaro", etichetta:"Porta unica di accesso alla rete integrata", sigla:"UVMD",
  testo:"Si accede con una **valutazione multidimensionale**, per i casi complessi."},
{id:"s06", tipo:"venn", tema:"chiaro", sopratitolo:"Strumenti uguali in tutta la regione · uniformità ed equità",
  sx:{t:"Una ULSS", d:"lo **stesso** bisogno"},
  dx:{t:"Un'altra ULSS", d:"lo **stesso** bisogno"},
  centro:"valutate **allo stesso modo**"},

{id:"s07", tipo:"frase", tema:"chiaro", sopratitolo:"L'UVMD · il nome dice già molto",
  testo:"**U**nità di **V**alutazione **M**ultidimensionale **D**istrettuale",
  sotto:"Valuta la persona in più dimensioni, e lavora nel distretto."},
{id:"s08", tipo:"tre", tema:"chiaro", sopratitolo:"La composizione di base", box:[
  {n:"1", t:"Direttore del distretto", d:"o un suo delegato"},
  {n:"2", t:"Medico di medicina generale", d:"della persona", key:true},
  {n:"3", t:"Assistente sociale", d:"del Comune"}]},
{id:"s09", tipo:"icone", tema:"chiaro", sopratitolo:"Secondo il caso si aggiungono · integrazione sanitario e sociale, come nelle ULSS", voci:[
  {icona:"persona", t:"L'infermiere", key:true}, {icona:"stetoscopio", t:"Gli specialisti"}, {icona:"mani", t:"Il fisioterapista"}]},
{id:"s10", tipo:"ciclo", tema:"chiaro", sopratitolo:"Le quattro funzioni dell'UVMD", centro:"UVMD", passi:[
  {t:"Valuta", d:"il bisogno"}, {t:"Definisce e approva", d:"il progetto individuale", key:true},
  {t:"Individua", d:"il servizio più adatto"}, {t:"Verifica", d:"i risultati nel tempo"}]},

{id:"s11", tipo:"norma", tema:"chiaro", etichetta:"Valutazione Multidimensionale dell'Anziano", sigla:"SVaMA",
  testo:"Lo strumento con cui l'UVMD esplora la persona, **area per area**."},
{id:"s12", tipo:"tre", tema:"chiaro", sopratitolo:"Le cinque aree della SVaMA · ne esce un profilo di autonomia e di bisogno", box:[
  {n:"1", t:"Sanitaria"}, {n:"2", t:"Cognitiva"}, {n:"3", t:"Funzionale", d:"autonomia e mobilità", key:true},
  {n:"4", t:"Bisogni assistenziali"}, {n:"5", t:"Sociale"}]},
{id:"s13", tipo:"confronto", tema:"chiaro", sopratitolo:"Due schede, due destinatari", col:[
  {h:"SVaMA", t:"per l'**anziano**", grande:true}, {h:"SVaMDi", t:"per le persone con **disabilità**", grande:true}]},
{id:"s14", tipo:"icone", tema:"chiaro", sopratitolo:"Il contributo dell'infermiere · sanitario e bisogni assistenziali", voci:[
  {icona:"avviso", t:"Lesioni"}, {icona:"flebo", t:"Dispositivi"}, {icona:"fiale", t:"Terapie"}, {icona:"letto", t:"Rischio di caduta", key:true}]},

{id:"s15", sopratitolo:"I servizi della rete · dal meno al più intensivo", ...SERVIZI([0], 0)},
{id:"s16", tipo:"frase", tema:"chiaro", sopratitolo:"Domiciliarità · un nome tutto veneto, da usare così",
  testo:"L'**impegnativa di cura domiciliare**: un contributo economico per chi assiste **a casa** una persona non autosufficiente."},
{id:"s17", sopratitolo:"Centri diurni: la giornata al centro, la sera a casa", ...SERVIZI([0,1,2], 2)},
{id:"s18", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"E poi", celle:[
  {n:"+", t:"Ricoveri temporanei di **sollievo**", key:true}, {n:"+", t:"Nuclei per le **demenze** con gravi disturbi del comportamento"},
  {n:"+", t:"Nuclei per gli **stati vegetativi**"}]},

{id:"s19", tipo:"icone", tema:"chiaro", sopratitolo:"Il principio guida: la domiciliarità · quando è possibile e sicuro", voci:[
  {icona:"casa", t:"La persona a casa", d:"la priorità", key:true}, {icona:"persone", t:"La famiglia", d:"sostenuta"}, {icona:"cuoremano", t:"Il caregiver", d:"sostenuto"}]},
{id:"s20", tipo:"catena", tema:"chiaro", sopratitolo:"La residenzialità non è il primo passo", passi:[
  {t:"**Domicilio**", d:"con tutti i sostegni"}, {t:"Il bisogno non è più **gestibile a casa**"}, {t:"**Residenzialità**", key:true}]},
{id:"s21", tipo:"tre", tema:"chiaro", sopratitolo:"Un principio coerente con", box:[
  {n:"1", t:"Il DM 77"}, {n:"2", t:"La riforma nazionale", d:"per le persone anziane non autosufficienti"},
  {n:"3", t:"Più anziani assistiti a casa", d:"un obiettivo nazionale", key:true}]},

{id:"s22", tipo:"confronto", tema:"chiaro", sopratitolo:"Le strutture residenziali per anziani non autosufficienti", col:[
  {h:"In altre regioni", t:"RSA, case di riposo", grande:true}, {h:"In Veneto", t:"**Centri di Servizi**", grande:true}]},
{id:"s23", tipo:"norma", tema:"chiaro", etichetta:"Autorizzati e accreditati · lezione 13.6", sigla:"L.R. 22/2002",
  testo:"Centri **pubblici**, **privati** o del **terzo settore**."},
{id:"s24", tipo:"griglia", tema:"chiaro", colonne:4, spunta:true, sopratitolo:"L'équipe multiprofessionale del Centro di Servizi", celle:[
  {t:"**Infermieri**", key:true}, {t:"**OSS**"}, {t:"Medico"}, {t:"Fisioterapista"},
  {t:"Educatore"}, {t:"Psicologo"}, {t:"Assistente sociale"}]},
{id:"s25", tipo:"confronto", tema:"chiaro", sopratitolo:"Da non confondere", col:[
  {h:"Progetto individuale", t:"lo approva l'**UVMD**"},
  {h:"PAI · Piano Assistenziale Individualizzato", t:"si scrive **nella struttura**, per ogni ospite"}]},

{id:"s26", tipo:"frase", tema:"chiaro", sopratitolo:"L'impegnativa di residenzialità",
  testo:"Riconosce la **quota sanitaria** della retta, a carico del **Servizio Sanitario Regionale**.",
  sotto:"La parte dei costi legata all'assistenza sanitaria."},
{id:"s27", tipo:"percorso", tema:"chiaro", sopratitolo:"Come si attribuisce", tappe:[
  {t:"Valutazione", d:"dell'UVMD"}, {t:"Il bisogno", d:"il criterio"}, {t:"Graduatoria", d:"gestita dall'ULSS", key:true},
  {t:"Livelli", d:"di intensità assistenziale diversi"}]},
{id:"s28", tipo:"confronto", tema:"chiaro", sopratitolo:"Le due quote della retta", col:[
  {h:"Quota sanitaria", t:"a carico del **SSR**, con l'impegnativa"},
  {h:"Quota alberghiera", t:"vitto, alloggio, servizi generali: **persona o famiglia** · eventuale integrazione del **Comune** in base all'ISEE"}]},
{id:"s29", tipo:"trappola", tema:"chiaro", sopratitolo:"Una confusione che costa punti", righe:[
  {sb:"L'impegnativa copre la retta alberghiera", ok:"Copre la **quota sanitaria**: per questo le famiglie pagano una parte della retta"}]},

{id:"s30", tipo:"tre", tema:"chiaro", sopratitolo:"L'infermiere nel Centro di Servizi · un ruolo molto autonomo", box:[
  {n:"1", t:"Valutazione e PAI"}, {n:"2", t:"Terapia", d:"spesso complessa · la politerapia", key:true}]},
{id:"s31", tipo:"icone", tema:"chiaro", sopratitolo:"Previene · e gestisce le demenze e i BPSD", voci:[
  {icona:"avviso", t:"Cadute", key:true}, {icona:"letto", t:"Lesioni da pressione"}, {icona:"bilancia", t:"Malnutrizione"},
  {icona:"goccia", t:"Disidratazione"}, {icona:"scudo", t:"Infezioni"}]},
{id:"s32", tipo:"tre", tema:"chiaro", sopratitolo:"E ancora", box:[
  {n:"·", t:"Cure di fine vita"}, {n:"·", t:"Coordina gli OSS", key:true}, {n:"·", t:"Relazione con le famiglie"}]},
{id:"s33", tipo:"frase", tema:"chiaro", sopratitolo:"Il raccordo con il medico e l'ospedale · il Modulo 11 in pratica",
  testo:"Evitare i **trasferimenti inappropriati** in pronto soccorso."},

{id:"s34", sopratitolo:"Il percorso di una persona · dall'inizio", ...PERCORSO([0], 0)},
{id:"s35", sopratitolo:"La porta unica", ...PERCORSO([0,1,2,3], 2)},
{id:"s36", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Si attiva il servizio", celle:[
  {t:"**Domicilio** con ADI e impegnativa di cura domiciliare"}, {t:"**Centro diurno**"},
  {t:"**Sollievo**"}, {t:"**Centro di Servizi** con impegnativa di residenzialità", key:true}]},
{id:"s37", tipo:"ciclo", tema:"chiaro", sopratitolo:"Il bisogno cambia", centro:"Persona", passi:[
  {t:"Valutazione"}, {t:"Progetto"}, {t:"Servizio"}, {t:"Rivalutazione", d:"periodica", key:true}]},

{id:"s38", tipo:"frase", tema:"chiaro", sopratitolo:"Il caso d'esame · che cosa rispondi?",
  testo:"La figlia di un anziano con **demenza moderata**, che vive solo, chiede come ottenere un posto «in **casa di riposo**» dopo la dimissione."},
{id:"s39", tipo:"catena", tema:"chiaro", sopratitolo:"La risposta · in Veneto l'accesso passa dalla valutazione", passi:[
  {t:"Il **distretto**", d:"attiva la valutazione"}, {t:"L'**UVMD**", d:"con la SVaMA"}, {t:"I **Centri di Servizi**", key:true}]},
{id:"s40", tipo:"icone", tema:"chiaro", sopratitolo:"Nel frattempo, se la dimissione è vicina", voci:[
  {icona:"telefono", t:"Dimissione protetta", d:"tramite la COT", key:true}, {icona:"ospedale", t:"Ospedale di Comunità", d:"soluzione temporanea"},
  {icona:"letto", t:"Ricovero di sollievo", d:"soluzione temporanea"}]},
{id:"s41", tipo:"trappola", tema:"chiaro", sopratitolo:"Servizi domiciliari e centri diurni · poi segnali secondo procedura", righe:[
  {sb:"Promettere un posto", ok:"**Orientare** nel percorso"}]},

{id:"s42", tipo:"timeline", tema:"chiaro", sopratitolo:"Le prospettive · la riforma nazionale per le persone anziane", tappe:[
  {anno:"2023", et:"Legge 33"}, {anno:"2024", et:"D.Lgs. 29", key:true}]},
{id:"s43", tipo:"tre", tema:"chiaro", sopratitolo:"Che cosa avvia la riforma", box:[
  {n:"1", t:"Valutazione multidimensionale unificata", key:true}, {n:"2", t:"Sostegno alla domiciliarità"},
  {n:"3", t:"Prestazione universale", d:"in via sperimentale"}]},
{id:"s44", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Un tema su cui il candidato può mostrare consapevolezza", celle:[
  {n:"↑", t:"La **domanda** continuerà a crescere"}, {n:"!", t:"La **carenza** di infermieri e OSS", key:true},
  {n:"✓", t:"**Qualità** e **sicurezza** nelle residenze"}]},

{id:"s45", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Le parole venete da usare all'orale", celle:[
  {t:"**Centri di Servizi**", key:true}, {t:"**UVMD**"}, {t:"**SVaMA** e **SVaMDi**"}, {t:"Impegnativa di **residenzialità**"},
  {t:"Impegnativa di **cura domiciliare**"}, {t:"Quota **sanitaria** e quota **alberghiera**"},
  {t:"**Progetto individuale** e **PAI**"}, {t:"**Domiciliarità**"}]},

{id:"s46", tipo:"tabella", tema:"chiaro", sopratitolo:"La tabella · l'accesso e la domiciliarità", colonne:["36%","64%"],
  intestazioni:["Che cosa", "Da ricordare"], righe:[
  ["Porta unica", "valutazione **multidimensionale**"], ["UVMD", "direttore di distretto, **MMG**, assistente sociale + altri"],
  ["SVaMA · SVaMDi", "anziano · disabilità"], ["Domiciliarità", "ADI, SAD, impegnativa di **cura domiciliare**"],
  ["Semiresidenzialità", "centri diurni · sollievo"]], chiave:[0]},
{id:"s47", tipo:"tabella", tema:"chiaro", sopratitolo:"La tabella · la residenzialità", colonne:["40%","60%"],
  intestazioni:["Che cosa", "Da ricordare"], righe:[
  ["Centri di Servizi", "autorizzati e accreditati · L.R. 22/2002"], ["Impegnativa di residenzialità", "= **quota sanitaria**"],
  ["Quota alberghiera", "persona o famiglia · Comune con ISEE"], ["PAI", "per ogni ospite"],
  ["Riforma nazionale", "L. 33/2023 · D.Lgs. 29/2024"]], chiave:[1]},

{id:"s48", tipo:"titolo", tema:"profondo",
  titolo:"Prima si valuta<br>**il bisogno**,<br>poi si sceglie il servizio.",
  sotto:"È il contrario di cercare un posto libero."},

{id:"s49", tipo:"frase", tema:"chiaro", sopratitolo:"Nella prossima lezione",
  testo:"**Autorizzazione** e **accreditamento** con la L.R. 22/2002, gli **screening** oncologici e la **prevenzione** in Veneto."},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"13.6 Autorizzazione<br>e accreditamento", sottotitolo:"Prevenzione e sanità pubblica in Veneto",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
