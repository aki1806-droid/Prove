// Contenuto delle 50 scene della lezione 11.6 — cronicità, educazione
// terapeutica e self-care. Il Chronic Care Model è una griglia di sei che si
// accende; Prochaska una scala; il colloquio motivazionale un confronto fra
// riflesso di correzione e domanda aperta; il self-care un percorso a tre.

const CCM = (on) => [
  {n:"1", t:"Risorse della **comunità**", key:on.includes(0)}, {n:"2", t:"**Organizzazione** del sistema", key:on.includes(1)},
  {n:"3", t:"Supporto all'**autogestione**", key:on.includes(2)}, {n:"4", t:"Organizzazione del **team**", key:on.includes(3)},
  {n:"5", t:"Supporto alle **decisioni**", key:on.includes(4)}, {n:"6", t:"Sistemi **informativi**", key:on.includes(5)}];

const FASI = (k) => [
  {n:"1", t:"Precontemplazione", d:"non pensa di cambiare", key:k===0}, {n:"2", t:"Contemplazione", d:"ci pensa, ambivalente", key:k===1},
  {n:"3", t:"Determinazione", d:"decide, si prepara", key:k===2}, {n:"4", t:"Azione", d:"cambia", key:k===3},
  {n:"5", t:"Mantenimento", d:"", key:k===4}];

const SELF = (att) => ({tipo:"percorso", tema:"chiaro", tappe:[
  {t:"Mantenimento", d:"terapia, dieta, attività"}, {t:"Monitoraggio", d:"peso, glicemia, sintomi"}, {t:"Gestione", d:"rispondere quando peggiora"}], attive:att});

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 11 · Setting assistenziali e ciclo di vita",
  titolo:"Cronicità<br>e self-care", sottotitolo:"11.6 · PDTA, Chronic Care Model, aderenza, colloquio motivazionale, telemedicina",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Micro-lezione 6 di 8 · la gestione avviene soprattutto a casa", celle:[
  {n:"·", t:"**Diabete**"}, {n:"·", t:"**Scompenso**", key:true}, {n:"·", t:"**BPCO**"}, {n:"·", t:"**Ipertensione**"}, {n:"·", t:"Malattia **renale**"}, {n:"·", t:"Per **anni**"}]},
{id:"s03", tipo:"confronto", tema:"chiaro", sopratitolo:"Ogni giorno la persona decide: cibo, farmaci, movimento", col:[
  {h:"La persona", t:"la **protagonista**"}, {h:"Il professionista", t:"un **allenatore**", key:true}]},
{id:"s04", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Gli strumenti", celle:[
  {n:"1", t:"Modelli **organizzativi**"}, {n:"2", t:"**Aderenza**"}, {n:"3", t:"Colloquio **motivazionale**", key:true},
  {n:"4", t:"Educazione **terapeutica**"}, {n:"5", t:"**Telemedicina**"}]},

{id:"s05", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"La cronicità", celle:[
  {n:"↑", t:"Cresce con l'**invecchiamento**"}, {n:"+", t:"**Multimorbidità**: più malattie insieme", key:true}, {n:"€", t:"La maggior parte delle **risorse**"}]},
{id:"s06", tipo:"norma", tema:"chiaro", etichetta:"Il riferimento nazionale", sigla:"Piano Cronicità 2016",
  testo:"Un **cambio di paradigma**."},
{id:"s07", tipo:"confronto", tema:"chiaro", sopratitolo:"Dalla medicina di attesa alla medicina di iniziativa", col:[
  {h:"Attesa", t:"il sistema aspetta che arrivi **quando sta male**"}, {h:"Iniziativa", t:"il sistema va incontro alla persona **prima**", key:true}]},

{id:"s08", tipo:"norma", tema:"chiaro", etichetta:"Diagnostico-Terapeutico-Assistenziale", sigla:"PDTA",
  testo:"Le linee guida nella **realtà organizzativa** di un territorio."},
{id:"s09", tipo:"griglia", tema:"chiaro", colonne:4, spunta:false, sopratitolo:"Quali esami, ogni quanto, chi prescrive, chi educa, quando lo specialista", celle:[
  {n:"?", t:"**Chi**"}, {n:"?", t:"**Che cosa**", key:true}, {n:"?", t:"**Quando**"}, {n:"?", t:"**Dove**"}]},
{id:"s10", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Già incontrati: diabete, scompenso, BPCO", celle:[
  {t:"Integra **ospedale e territorio**, MMG, specialista, infermiere", key:true}, {t:"**Indicatori** per misurare i risultati"}]},

{id:"s11", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Chronic Care Model di Wagner · sei componenti", celle:CCM([0,1])},
{id:"s12", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Aiutare la persona a gestire da sé la malattia", celle:CCM([2,3])},
{id:"s13", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Le linee guida · i registri di patologia", celle:CCM([4,5])},
{id:"s14", tipo:"confronto", tema:"chiaro", sopratitolo:"Il risultato atteso · due metà dello stesso lavoro", col:[
  {h:"Paziente", t:"**informato** e **attivo**"}, {h:"Team", t:"**preparato** e **proattivo**", key:true}]},

{id:"s15", tipo:"frase", tema:"chiaro", sopratitolo:"L'aderenza terapeutica · la parola che conta",
  testo:"Le raccomandazioni **concordate**."},
{id:"s16", tipo:"cifre", tema:"chiaro", sopratitolo:"OMS · non pienamente aderente · terapie complesse, effetti collaterali, convinzioni, costi", voci:[
  {n:"1 su 2", suf:"", d:"nelle malattie croniche", key:true}]},
{id:"s17", tipo:"griglia", tema:"chiaro", colonne:4, spunta:true, sopratitolo:"Le strategie · meno compresse, meno orari, meno dimenticanze", celle:[
  {t:"**Semplificare** lo schema", key:true}, {t:"**Educare**"}, {t:"**Ausili**: portapillole, promemoria"}, {t:"Il **caregiver**"}]},
{id:"s18", tipo:"trappola", tema:"chiaro", sopratitolo:"Chiedere senza giudicare", righe:[
  {sb:"«Prende sempre tutto?»", ok:"«Molte persone dimenticano qualche dose: **a lei capita**?»"}]},

{id:"s19", tipo:"frase", tema:"chiaro", sopratitolo:"Smettere di fumare, muoversi di più, mangiare diversamente",
  testo:"Cambiare un comportamento è un **processo**."},
{id:"s20", tipo:"scala", tema:"chiaro", sopratitolo:"Prochaska e DiClemente · le fasi del cambiamento", gradini:FASI(1)},
{id:"s21", tipo:"trappola", tema:"chiaro", sopratitolo:"La ricaduta è una parte normale del processo, non un fallimento", righe:[
  {sb:"Istruzioni dettagliate a chi è in precontemplazione", ok:"L'intervento si adatta alla **fase**"}]},

{id:"s22", tipo:"frase", tema:"chiaro", sopratitolo:"Uno stile collaborativo, che rafforza la motivazione al cambiamento",
  testo:"Il **colloquio motivazionale**."},
{id:"s23", tipo:"titolo", tema:"profondo",
  titolo:"Le **sue** ragioni,<br>non le nostre.",
  sotto:""},
{id:"s24", tipo:"catena", tema:"chiaro", sopratitolo:"Il nemico principale", passi:[
  {t:"**Riflesso di correzione**"}, {t:"Spiegare, convincere, correggere"}, {t:"**Resistenza**", key:true}]},
{id:"s25", tipo:"griglia", tema:"chiaro", colonne:4, spunta:false, sopratitolo:"OARS · e si rinforza il discorso di cambiamento", celle:[
  {n:"O", t:"Domande **aperte**", key:true}, {n:"A", t:"**Valorizzazioni**"}, {n:"R", t:"Ascolto **riflessivo**"}, {n:"S", t:"**Riassunti**"}]},

{id:"s26", tipo:"trappola", tema:"chiaro", sopratitolo:"Un esempio · lo sa già, e se l'è sentito dire cento volte", righe:[
  {sb:"«Deve smettere di fumare, altrimenti la BPCO peggiora»", ok:"Il riflesso di **correzione**"}]},
{id:"s27", tipo:"frase", tema:"chiaro", sopratitolo:"Lo stile motivazionale · una domanda aperta",
  testo:"«Che cosa pensa del fumo, adesso che respira **con più fatica**?»"},
{id:"s28", tipo:"frase", tema:"chiaro", sopratitolo:"Ascolto riflessivo dell'ambivalenza · ora è la persona a cercare le ragioni",
  testo:"«Da un lato le piace, dall'altro **si preoccupa** per il respiro.»"},

{id:"s29", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"L'educazione terapeutica (OMS) · non un consiglio alla dimissione", celle:[
  {t:"**Strutturata**"}, {t:"**Continua**"}, {t:"**Verificata**", key:true}]},
{id:"s30", tipo:"norma", tema:"chiaro", etichetta:"L'alfabetizzazione sanitaria", sigla:"Health literacy",
  testo:"Ottenere, **comprendere** e usare le informazioni sanitarie."},
{id:"s31", tipo:"griglia", tema:"chiaro", colonne:4, spunta:true, sopratitolo:"Bassa: frequente e spesso nascosta · ci si vergogna di non aver capito", celle:[
  {t:"Linguaggio **semplice**"}, {t:"Poche informazioni alla volta"}, {t:"**Teach-back**", key:true}, {t:"Materiali con **immagini**"}]},

{id:"s32", tipo:"frase", tema:"chiaro", sopratitolo:"Una teoria infermieristica molto usata · Riegel · mantenimento: terapia, dieta, attività",
  testo:"Il **self-care**, in tre dimensioni."},
{id:"s33", sopratitolo:"Il self-care · la teoria di Riegel", ...SELF([0,1,2])},
{id:"s34", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Lo scompenso, lezione 8.1 · molti fanno le prime due, non la terza", celle:[
  {n:"1", t:"Farmaci, **poco sale**"}, {n:"2", t:"**Pesarsi** ogni giorno"}, {n:"3", t:"Che cosa fare se il **peso aumenta**", key:true}]},

{id:"s35", tipo:"griglia", tema:"chiaro", colonne:4, spunta:false, sopratitolo:"La telemedicina · parametri trasmessi a distanza e controllati", celle:[
  {n:"·", t:"**Televisita**"}, {n:"·", t:"**Teleconsulto**: fra professionisti"}, {n:"·", t:"**Telemonitoraggio**", key:true}, {n:"·", t:"**Teleassistenza**"}]},
{id:"s36", tipo:"frase", tema:"chiaro", sopratitolo:"Indicazioni nazionali · investimenti del PNRR",
  testo:"L'infermiere segue la persona **a distanza**."},
{id:"s37", tipo:"confronto", tema:"chiaro", sopratitolo:"Privacy: il GDPR, lezione 1.7", col:[
  {h:"Vantaggi", t:"continuità, **peggioramenti** intercettati, meno spostamenti", key:true}, {h:"Limiti", t:"competenze **digitali**, connettività, privacy"}]},

{id:"s38", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Il caso · 68 anni, scompenso", celle:[
  {n:"3°", t:"**ricovero** in un anno", key:true}, {n:"!", t:"Farmaci «**quando si ricorda**»"}, {n:"!", t:"Non si pesa: «**non cambia niente**»"}]},
{id:"s39", tipo:"frase", tema:"chiaro", sopratitolo:"Che cosa fai? Fase del cambiamento e comprensione della malattia",
  testo:"Prima di tutto **ascolti senza giudicare**."},
{id:"s40", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"«Che cosa vorrebbe poter fare, se stesse meglio?»", celle:[
  {t:"Colloquio **motivazionale**", key:true}, {t:"**Semplifichi** lo schema, con il medico"}, {t:"Ausili, un **familiare**"}]},
{id:"s41", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"Il terzo ricovero non è sfortuna: è un segnale", celle:[
  {t:"Pesarsi, e **che cosa fare** se aumenta", key:true}, {t:"Verifica con il **teach-back**"}, {t:"**Telemonitoraggio** o infermiere di famiglia"}]},

{id:"s42", tipo:"norma", tema:"chiaro", etichetta:"In Veneto · rischio e bisogno di cura", sigla:"Stratificazione ACG",
  testo:"La medicina di iniziativa a chi ne ha **più bisogno**."},
{id:"s43", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"All'orale: stratificazione e medicina di iniziativa", celle:[
  {t:"**PDTA** regionali"}, {t:"**Telemonitoraggio**"}, {t:"Infermiere di **famiglia e comunità**", key:true}]},

{id:"s44", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"La tabella", celle:[
  {n:"2016", t:"Piano Nazionale della **Cronicità**"}, {n:"→", t:"Medicina di **iniziativa**"}, {n:"?", t:"PDTA: chi, che cosa, quando, dove"},
  {n:"6", t:"componenti del **Chronic Care Model**", key:true}, {n:"½", t:"**non aderente**"}, {n:"·", t:"Semplificare, chiedere senza giudicare"}]},
{id:"s45", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"La tabella", celle:[
  {n:"6", t:"fasi di **Prochaska**, ricaduta compresa"}, {n:"·", t:"**OARS**"}, {n:"·", t:"Health literacy, **teach-back**"},
  {n:"3", t:"self-care: mantenimento, monitoraggio, **gestione**", key:true}, {n:"4", t:"forme di **telemedicina**"}, {n:"·", t:"Le **sue** ragioni"}]},
{id:"s46", tipo:"titolo", tema:"profondo",
  titolo:"Non l'eroe della storia:<br>**l'allenatore**.",
  sotto:"Nella cronicità, il professionista."},
{id:"s47", tipo:"confronto", tema:"chiaro", sopratitolo:"Il protagonista è la persona", col:[
  {h:"La persona", t:"con la malattia **365 giorni** all'anno", key:true}, {h:"Noi", t:"la vediamo per **qualche ora**"}]},
{id:"s48", tipo:"norma", tema:"chiaro", etichetta:"Nella prossima lezione · il territorio", sigla:"DM 77/2022",
  testo:"**Dove** si svolge tutto questo."},
{id:"s49", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"All'orale conviene saperla descrivere", celle:[
  {n:"·", t:"Le **Case della Comunità**"}, {n:"·", t:"L'infermiere di **famiglia e comunità**", key:true}, {n:"·", t:"La rete dei servizi **veneti**"}]},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"11.7<br>Territorio e<br>cure primarie", sottotitolo:"Il DM 77, le Case della Comunità, l'infermiere di famiglia",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
