// Contenuto delle 50 scene della lezione 13.4 — il distretto e le cure primarie venete.
// Le dimissioni protette sono un percorso che si accende una tappa alla volta;
// le sfide una griglia che si completa in due scene; le cure intermedie un
// percorso fra ospedale e domicilio.

const DIMISSIONI = (att, k) => ({tipo:"percorso", tema:"chiaro", tappe:[
  {t:"Segnalazione precoce", d:"dal reparto", key:k===0},
  {t:"COT", d:"organizza il percorso", key:k===1},
  {t:"UVMD", d:"se necessaria", key:k===2},
  {t:"Setting", d:"di destinazione", key:k===3},
  {t:"Lettera infermieristica", key:k===4},
  {t:"Presa in carico", d:"territoriale", key:k===5}], attive:att});

const SFIDE = att => ({tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, celle:[
  {n:"1", t:"Il **personale** per le nuove strutture"}, {n:"2", t:"La carenza di **medici di famiglia**"},
  {n:"3", t:"L'integrazione dei **sistemi informativi**"}, {n:"4", t:"Il coinvolgimento dei **Comuni** e del **terzo settore**"}],
  attive:att});

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 13 · Il Servizio Socio Sanitario del Veneto",
  titolo:"Il distretto<br>e le cure primarie venete", sottotitolo:"13.4 · Distretto, medicine di gruppo integrate, cure intermedie, DM 77 in Veneto, infermiere di famiglia e comunità",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"confronto", tema:"chiaro", sopratitolo:"Micro-lezione 4 di 8 · dal nazionale al regionale", col:[
  {h:"Lezione 11.7", t:"gli standard **nazionali** del DM 77"}, {h:"Lezione 13.4", t:"come li applica il **Veneto**"}]},
{id:"s03", tipo:"tre", tema:"chiaro", sopratitolo:"Un'esperienza costruita prima del decreto", box:[
  {n:"1", t:"Medicine di gruppo integrate"}, {n:"2", t:"Cure intermedie"}, {n:"3", t:"Integrazione con il sociale", key:true}]},
{id:"s04", tipo:"frase", tema:"chiaro", sopratitolo:"Il futuro lavoro di molti candidati",
  testo:"Sul **territorio**: i servizi, i percorsi, le parole."},

{id:"s05", tipo:"catena", tema:"chiaro", sopratitolo:"Il distretto socio-sanitario · il perno dell'integrazione fra sanitario e sociale", passi:[
  {t:"L'**Azienda ULSS**"}, {t:"Il **distretto** socio-sanitario", d:"articolazione territoriale", key:true}, {t:"Il **direttore** di distretto", d:"lo dirige"}]},
{id:"s06", tipo:"cifre", tema:"chiaro", sopratitolo:"L.R. 19/2016 · le vecchie ULSS diventano i distretti delle nuove", voci:[
  {n:"21", t:"ULSS", d:"prima della riforma"}, {n:"9", t:"Aziende ULSS", d:"dopo la riforma", key:true}]},
{id:"s07", tipo:"icone", tema:"chiaro", sopratitolo:"Le funzioni del distretto", voci:[
  {icona:"persone", t:"Assistenza primaria", d:"medici e pediatri di famiglia", key:true},
  {icona:"orologio", t:"Continuità assistenziale"}, {icona:"stetoscopio", t:"Specialistica ambulatoriale"},
  {icona:"casa", t:"Assistenza domiciliare"}, {icona:"cuoremano", t:"Consultori"}]},
{id:"s08", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"I Comuni possono delegare alle ULSS i servizi socio-sanitari", celle:[
  {t:"**Residenzialità**"}, {t:"**Semiresidenzialità**"}, {t:"Integrazione con i **servizi sociali dei Comuni**"}]},
{id:"s09", tipo:"norma", tema:"chiaro", etichetta:"Approvate con delibera della Giunta regionale", sigla:"Schede territoriali",
  testo:"Come per l'ospedale: l'**offerta** di ogni territorio."},

{id:"s10", tipo:"confronto", tema:"chiaro", sopratitolo:"Le forme associative della medicina generale · L. 189/2012", col:[
  {h:"AFT", t:"Aggregazioni **Funzionali** Territoriali"}, {h:"UCCP", t:"Unità **Complesse** di Cure Primarie"}]},
{id:"s11", tipo:"icone", tema:"chiaro", sopratitolo:"In Veneto · la Medicina di Gruppo Integrata (MGI)", voci:[
  {icona:"persone", t:"Più medici di famiglia"}, {icona:"casa", t:"Una sede comune"},
  {icona:"cuoremano", t:"Infermieri", key:true}, {icona:"cartella", t:"Personale di studio"}]},
{id:"s12", tipo:"tre", tema:"chiaro", sopratitolo:"La Medicina di Gruppo Integrata", box:[
  {n:"1", t:"Apertura estesa", d:"nell'arco della giornata"}, {n:"2", t:"Cronicità", d:"presa in carico delle persone con malattie croniche"},
  {n:"3", t:"PDTA", d:"percorsi diagnostico terapeutici assistenziali", key:true}]},
{id:"s13", tipo:"griglia", tema:"chiaro", colonne:4, spunta:true, sopratitolo:"L'infermiere della medicina di gruppo · le stesse persone, nel tempo", celle:[
  {t:"Ambulatori della **cronicità**"}, {t:"**Educazione**"}, {t:"**Medicazioni**"}, {t:"**Follow-up**"}]},

{id:"s14", tipo:"percorso", tema:"chiaro", sopratitolo:"Le cure intermedie · in Veneto già prima del DM 77", tappe:[
  {t:"Ospedale"}, {t:"Cure intermedie", d:"fra ospedale e domicilio", key:true}, {t:"Domicilio"}]},
{id:"s15", tipo:"tre", tema:"chiaro", sopratitolo:"Le cure intermedie · un tema del Piano Socio Sanitario Regionale", box:[
  {n:"1", t:"Ospedali di Comunità", key:true}, {n:"2", t:"URT", d:"Unità Riabilitative Territoriali"}, {n:"3", t:"Hospice"}]},
{id:"s16", tipo:"confronto", tema:"chiaro", sopratitolo:"Chi accolgono", col:[
  {h:"Non più", t:"il bisogno dell'ospedale per **acuti**"}, {h:"Non ancora", t:"il rientro a **casa**"}],
  sotto:"Accesso **programmato**, spesso tramite la **COT**."},

{id:"s17", tipo:"norma", tema:"chiaro", etichetta:"Il DM 77 in Veneto · le Case della Comunità", sigla:"PNRR",
  testo:"Realizzate con i fondi del **Piano Nazionale di Ripresa e Resilienza**."},
{id:"s18", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"2026 · le linee di indirizzo regionali per attivare le Case della Comunità", celle:[
  {n:"1", t:"Il **punto unico di accesso**"}, {n:"2", t:"L'**integrazione** con gli altri servizi"}, {n:"3", t:"La **presa in carico**"}]},
{id:"s19", tipo:"frase", tema:"chiaro", sopratitolo:"Gli Ospedali di Comunità in Veneto",
  testo:"Non nascono **da zero**: il DM 77 potenzia una rete **già esistente**."},
{id:"s20", tipo:"cifre", tema:"chiaro", sopratitolo:"Le COT · coordinano le transizioni fra ospedale, strutture intermedie e domicilio", voci:[
  {n:"1", t:"COT", d:"ogni **100.000** abitanti", key:true}, {n:"1", t:"per distretto"}]},
{id:"s21", tipo:"icone", tema:"chiaro", sopratitolo:"Il DM 77 in Veneto · e poi", voci:[
  {icona:"persona", t:"Infermiere di famiglia e comunità", key:true},
  {icona:"telefono", t:"Telemedicina", d:"piattaforme regionali e nazionali, PNRR · soprattutto per i cronici"}]},

{id:"s22", tipo:"cifre", tema:"chiaro", sopratitolo:"L'infermiere di famiglia e comunità · in ambulatorio, a domicilio, nella comunità", voci:[
  {n:"1", t:"infermiere", d:"di famiglia e comunità"}, {n:"3.000", t:"abitanti", d:"lo standard del DM 77", key:true}]},
{id:"s23", tipo:"confronto", tema:"chiaro", sopratitolo:"Che cosa fa", col:[
  {h:"Presa in carico", t:"**fragilità** e **cronicità**"}, {h:"Prevenzione", t:"e promozione della salute: anche chi **rischia** di ammalarsi"}]},
{id:"s24", tipo:"raggiera", tema:"chiaro", sopratitolo:"Si raccorda con · una domanda d'orale probabile", centro:"IFeC", raggi:[
  {t:"COT", key:true}, {t:"ADI"}, {t:"Sociale", d:"i servizi sociali"}]},

{id:"s25", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"La continuità assistenziale · l'ex guardia medica", celle:[
  {n:"·", t:"Le **notti**"}, {n:"·", t:"I **prefestivi**"}, {n:"·", t:"I **festivi**"}]},
{id:"s26", tipo:"norma", tema:"chiaro", etichetta:"Il numero europeo · previsto dal DM 77", sigla:"116117",
  testo:"Le cure mediche **non urgenti** · attivato progressivamente nelle Regioni."},
{id:"s27", tipo:"trappola", tema:"chiaro", sopratitolo:"Due numeri da non confondere", righe:[
  {sb:"Il 116117 sostituisce il 118", ok:"Per le **emergenze** il numero resta il **118**"}]},

{id:"s28", tipo:"catena", tema:"chiaro", sopratitolo:"L'assistenza domiciliare integrata", passi:[
  {t:"Valutazione **multidimensionale**"}, {t:"Piano assistenziale **individuale**", key:true}, {t:"L'**ADI**"}]},
{id:"s29", tipo:"griglia", tema:"chiaro", colonne:5, spunta:true, sopratitolo:"Livelli di intensità diversi · l'équipe nella casa della persona", celle:[
  {t:"**Infermieri**"}, {t:"**Medici**"}, {t:"**Fisioterapisti**"}, {t:"**OSS**"}, {t:"**Specialisti**"}]},
{id:"s30", tipo:"venn", tema:"chiaro", sopratitolo:"Le cure palliative domiciliari: i Nuclei di Cure Palliative",
  sx:{t:"ADI", d:"**sanitaria**"},
  dx:{t:"SAD", d:"dei **Comuni**"},
  centro:"l'assistenza a domicilio, **integrata**"},
{id:"s31", tipo:"cifre", tema:"chiaro", sopratitolo:"L'obiettivo nazionale · il Veneto è fra le regioni più anziane d'Italia", voci:[
  {n:"65", suf:"+", t:"anni", d:"aumentare la quota di anziani assistiti **a domicilio**", key:true}]},

{id:"s32", sopratitolo:"Le dimissioni protette · lezioni 9.7 e 11.7", ...DIMISSIONI([0], 0)},
{id:"s33", sopratitolo:"La COT organizza · l'UVMD valuta, se necessario", ...DIMISSIONI([0,1,2], 1)},
{id:"s34", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Il setting di destinazione", celle:[
  {n:"1", t:"Il **domicilio** con l'ADI"}, {n:"2", t:"L'**Ospedale di Comunità**"}, {n:"3", t:"L'**URT**"},
  {n:"4", t:"L'**hospice**"}, {n:"5", t:"Il **Centro di Servizi**"}]},
{id:"s35", sopratitolo:"Dal reparto al territorio, attraverso la COT", ...DIMISSIONI([0,1,2,3,4,5], 5)},

{id:"s36", tipo:"frase", tema:"chiaro", sopratitolo:"Un tratto caratteristico del Veneto · lezione 11.6",
  testo:"La **stratificazione** della popolazione per livello di **rischio** e di **bisogno**."},
{id:"s37", tipo:"norma", tema:"chiaro", etichetta:"Un sistema di stratificazione", sigla:"ACG",
  testo:"Chi ha **più bisogno** di presa in carico · cronicità e stratificazione nel **PSSR**."},
{id:"s38", tipo:"icone", tema:"chiaro", sopratitolo:"Verso le persone giuste · non si aspetta il paziente: lo si va a cercare", voci:[
  {icona:"persona", t:"Medicina di iniziativa", key:true}, {icona:"documento", t:"PDTA"},
  {icona:"occhio", t:"Telemonitoraggio"}, {icona:"scudo", t:"Programmi per la fragilità"}]},

{id:"s39", tipo:"frase", tema:"chiaro", sopratitolo:"Il caso d'esame",
  testo:"Donna di **81 anni**, BPCO e scompenso, seguita da una medicina di gruppo: **due accessi** in PS in 3 mesi."},
{id:"s40", tipo:"frase", tema:"chiaro", sopratitolo:"Che cosa si può fare sul territorio?",
  testo:"La presa in carico **proattiva**.",
  sotto:"Dell'infermiere della medicina di gruppo o dell'infermiere di famiglia e comunità."},
{id:"s41", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"La presa in carico", celle:[
  {t:"Controlli programmati secondo i **PDTA**"}, {t:"Educazione: **sintomi** e **peso**"},
  {t:"**Telemonitoraggio**, se disponibile"}, {t:"Verifica dell'**aderenza** alla terapia"}]},
{id:"s42", tipo:"catena", tema:"chiaro", sopratitolo:"La medicina di iniziativa, applicata a una persona", passi:[
  {t:"Se necessario, l'**ADI**"}, {t:"Intercettare il **peggioramento**"}, {t:"**Prima** del pronto soccorso", key:true}]},

{id:"s43", tipo:"griglia", tema:"chiaro", colonne:4, spunta:false, sopratitolo:"Le parole del territorio · da usare all'orale", celle:[
  {n:"1", t:"**Prossimità**"}, {n:"2", t:"**Presa in carico**"}, {n:"3", t:"Medicina di **iniziativa**"}, {n:"4", t:"**Continuità**"},
  {n:"5", t:"Integrazione **socio-sanitaria**"}, {n:"6", t:"Lavoro **in rete**"}, {n:"7", t:"La **casa** come primo luogo di cura"}]},

{id:"s44", sopratitolo:"Le sfide · il PNRR finanzia soprattutto gli edifici", ...SFIDE([0,1])},
{id:"s45", sopratitolo:"Le sfide · all'orale, citarle con equilibrio mostra consapevolezza", ...SFIDE([0,1,2,3])},

{id:"s46", tipo:"tabella", tema:"chiaro", sopratitolo:"La tabella · il distretto e le cure primarie", colonne:["42%","58%"],
  intestazioni:["Che cosa", "Da ricordare"], righe:[
  ["Distretto socio-sanitario", "schede di dotazione **territoriale**"], ["AFT e UCCP", "**L. 189/2012**"],
  ["Medicine di gruppo integrate", "medici di famiglia **con infermieri**"], ["Cure intermedie", "Ospedali di Comunità, URT, hospice"]], chiave:[2]},
{id:"s47", tipo:"tabella", tema:"chiaro", sopratitolo:"La tabella · il DM 77 in Veneto e i percorsi", colonne:["42%","58%"],
  intestazioni:["Che cosa", "Da ricordare"], righe:[
  ["DM 77 in Veneto", "Case della Comunità, COT, **IFeC 1/3.000**"], ["Continuità assistenziale", "notti e festivi · **116117** non urgenze"],
  ["ADI", "e Nuclei di **Cure Palliative**"], ["Dimissioni protette", "segnalazione precoce, **COT**"], ["Stratificazione", "**ACG** · medicina di iniziativa"]], chiave:[0]},

{id:"s48", tipo:"titolo", tema:"profondo",
  titolo:"Il territorio veneto<br>**non parte da zero**.",
  sotto:"Il DM 77 si innesta su una rete già costruita negli anni: medicine di gruppo, cure intermedie, integrazione socio-sanitaria."},

{id:"s49", tipo:"griglia", tema:"chiaro", colonne:4, spunta:false, sopratitolo:"Nella prossima lezione · la rete per la non autosufficienza", celle:[
  {n:"1", t:"I **Centri di Servizi**"}, {n:"2", t:"L'**UVMD**"}, {n:"3", t:"La **SVaMA**"}, {n:"4", t:"Le **impegnative** di cura"}]},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"13.5<br>La non autosufficienza", sottotitolo:"La rete: Centri di Servizi, UVMD, SVaMA, impegnative di cura",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
