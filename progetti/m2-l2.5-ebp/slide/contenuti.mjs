// Contenuto delle 50 scene della lezione 2.5. *accento*  **accento in semibold**

const PASSI = [
 {t:"Ask", d:"formulare il quesito"},
 {t:"Acquire", d:"cercare le evidenze"},
 {t:"Appraise", d:"valutarle criticamente"},
 {t:"Apply", d:"integrandole con esperienza e preferenze"},
 {t:"Assess", d:"valutare l'esito", key:true},
];

const BANCHE = [
 {icona:"libro", t:"PubMed", d:"letteratura biomedica"},
 {icona:"cuoremano", t:"CINAHL", d:"specifica per l'area infermieristica"},
 {icona:"certificato", t:"Cochrane", d:"le revisioni sistematiche"},
 {icona:"persone", t:"Joanna Briggs", d:"orientato alla pratica infermieristica"},
 {icona:"giudice", t:"SNLG-ISS", d:"le linee guida italiane — quelle che contano in giudizio", key:true},
];

const STRUMENTI = [
 ["**Linea guida**", "raccomandazioni elaborate sistematicamente sulla base delle evidenze", "**scientifica**"],
 ["**Protocollo**", "sequenza rigida e predefinita di comportamenti", "organizzativa"],
 ["**Procedura**", "le fasi di un processo, con responsabilità e modalità", "organizzativa"],
 ["**Istruzione operativa**", "il dettaglio di una singola attività tecnica", "organizzativa"],
 ["**Check-list**", "elenco di controlli in sequenza", "organizzativa"],
 ["**PDTA**", "percorso diagnostico-terapeutico assistenziale", "organizzativa"],
];

const VENETO = [
 {t:"Evidenza"},
 {t:"Linea guida SNLG"},
 {t:"Indirizzo regionale o PDTA", d:"spesso dentro le reti cliniche"},
 {t:"Procedura aziendale"},
 {t:"Pratica al letto", key:true},
];

const MEMO = [
 {t:"L'EBP ha **tre pilastri**, non uno"},
 {t:"I cinque passi: **ask, acquire, appraise, apply, assess**"},
 {t:"Il quesito si scrive con **PICO**"},
 {t:"Al vertice: **revisioni sistematiche e metanalisi**"},
 {t:"**Linea guida, procedura e PDTA** sono cose diverse"},
 {t:"Rilevano le linee guida **accreditate nel SNLG presso l'ISS**"},
 {t:"**Discostarsi è legittimo** — purché motivato e documentato"},
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 2 · Metodologia, documentazione e sicurezza",
  titolo:"EBP, linee guida,<br>PDTA e procedure", sottotitolo:"Da dove viene ciò che facciamo — e perché ora conta in giudizio",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"confronto", tema:"chiaro", sopratitolo:"Un doppio interesse",
  col:[
   {h:"Metodologico", t:"Sapere **da dove viene** ciò che facciamo"},
   {h:"Giuridico", t:"È il motivo per cui **pesa nel concorso**"}]},

{id:"s03", tipo:"sostituzione", tema:"chiaro", sopratitolo:"Che cosa è cambiato con la Gelli-Bianco",
  da:{h:"Prima", t:"Uno strumento<br>**professionale**"},
  a:{h:"Dopo", t:"Un **parametro di valutazione**<br>della condotta"},
  sotto:"Sono entrate nel processo, e da lì non sono più uscite."},

{id:"s04", tipo:"titolo", tema:"tenue", sopratitolo:"La confusione che costa doppio",
  titolo:"Linea guida<br>o **procedura aziendale**?",
  sotto:"Chi le scambia sbaglia due domande: una di metodo e una di diritto."},

{id:"s05", tipo:"venn", tema:"chiaro", sopratitolo:"EBP · la definizione, da citare per intero",
  sx:{t:"Le evidenze", d:"le **migliori disponibili**, non tutte"},
  dx:{t:"La competenza clinica", d:"l'**esperienza** del professionista"},
  centro:"E i **valori, le preferenze e il contesto** della persona assistita"},

{id:"s06", tipo:"tre", tema:"chiaro", sopratitolo:"Tre elementi, non uno",
  box:[
   {n:"1", t:"Evidenze", d:"le migliori scientifiche disponibili"},
   {n:"2", t:"Competenza", d:"l'esperienza clinica di chi cura"},
   {n:"3", t:"Persona", d:"valori, preferenze, contesto", key:true}]},

{id:"s07", tipo:"trappola", tema:"profondo", sopratitolo:"Il distrattore classico",
  righe:[
   {sb:"«Pratica fondata **esclusivamente** sui risultati della ricerca»",
    ok:"Ne omette **due su tre** — e sono i due che riguardano le persone"}]},

{id:"s08", tipo:"tabella", tema:"chiaro", sopratitolo:"Non è una moda importata",
  intestazioni:["Fonte","Che cosa dice"], colonne:["30%","70%"],
  righe:[
   ["**DM 739/1994**","l'infermiere concorre all'aggiornamento del proprio profilo e alla **ricerca**"],
   ["**Codice deontologico**","fondare il proprio operato su **conoscenze validate**"]]},

{id:"s09", tipo:"titolo", tema:"chiaro", sopratitolo:"Che cos'è davvero l'EBP",
  titolo:"La traduzione operativa<br>di **due norme**<br>che già conosci."},

{id:"s10", tipo:"catena", tema:"chiaro", sopratitolo:"I cinque passi · cinque A", attive:[0,1,2],
  passi:PASSI},
{id:"s11", tipo:"catena", tema:"chiaro", sopratitolo:"I cinque passi · cinque A",
  passi:PASSI},

{id:"s12", tipo:"venn", tema:"chiaro", sopratitolo:"La simmetria con la lezione 2.1",
  sx:{t:"Processo di assistenza", d:"accertamento, diagnosi, pianificazione, attuazione…"},
  dx:{t:"Le cinque A dell'EBP", d:"ask, acquire, appraise, apply…"},
  centro:"Si chiudono **entrambi con la valutazione** — ed è il passo che si dimentica"},

{id:"s13", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false,
  sopratitolo:"Il quesito si scrive con PICO",
  celle:[
   {n:"P", t:"**Popolazione** — o il problema: *chi*"},
   {n:"I", t:"**Intervento** — che cosa si fa"},
   {n:"C", t:"**Confronto** — con un'alternativa; *può mancare*"},
   {n:"O", t:"**Outcome** — l'esito che si vuole misurare"}]},

{id:"s14", tipo:"tabella", tema:"chiaro", sopratitolo:"Un esempio, lettera per lettera",
  intestazioni:["","La parte del quesito"], colonne:["10%","90%"], chiave:[3],
  righe:[
   ["**P**","nei pazienti **anziani allettati**"],
   ["**I**","l'uso di **materassi a pressione alternata**"],
   ["**C**","rispetto ai **materassi in schiuma viscoelastica**"],
   ["**O**","riduce l'**incidenza di lesioni da pressione**?"]]},

{id:"s15", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false,
  sopratitolo:"Le varianti — ma la forma base resta a quattro lettere",
  celle:[
   {n:"T", t:"**PICOT** — aggiunge il **tempo**"},
   {n:"S", t:"**PICOS** — aggiunge il **disegno di studio**"}]},

{id:"s16", tipo:"icone", tema:"chiaro", sopratitolo:"Dove si cerca", attive:[0,1,2],
  voci:BANCHE},
{id:"s17", tipo:"icone", tema:"chiaro", sopratitolo:"Dove si cerca",
  voci:BANCHE},

{id:"s18", tipo:"piramide", tema:"chiaro", sopratitolo:"La gerarchia delle evidenze",
  strati:[
   {t:"Revisioni sistematiche e metanalisi", d:"di studi randomizzati"},
   {t:"RCT", d:"la randomizzazione distribuisce a caso i confondenti"},
   {t:"Studio di coorte", d:"prospettico: segue esposti e non esposti"},
   {t:"Caso-controllo", d:"retrospettivo: dall'esito risale all'esposizione"},
   {t:"Trasversali, serie di casi, caso singolo, opinione di esperti"}]},

{id:"s19", tipo:"confronto", tema:"chiaro", sopratitolo:"I due disegni che si confondono",
  col:[
   {h:"Coorte — prospettico", t:"parte dall'**esposizione** e segue nel tempo"},
   {h:"Caso-controllo — retrospettivo", t:"parte dall'**esito** e risale all'esposizione"}]},

{id:"s20", tipo:"titolo", tema:"chiaro", sopratitolo:"Sei livelli",
  titolo:"La domanda chiede<br>quasi sempre il **vertice**.",
  sotto:"Ma il vertice non è tutta la storia."},

{id:"s21", tipo:"trappola", tema:"chiaro", sopratitolo:"Prima precisazione",
  righe:[
   {sb:"«Un RCT vale sempre più di uno studio di coorte»",
    ok:"Il livello riguarda il **disegno**, non la **qualità**: un RCT mal condotto vale meno di una buona coorte"}]},

{id:"s22", tipo:"trappola", tema:"chiaro", sopratitolo:"Seconda precisazione",
  righe:[
   {sb:"«Il qualitativo sta in basso, quindi vale poco»",
    ok:"Per il **vissuto** e il **significato dell'esperienza** è il disegno **più appropriato**"}]},

{id:"s23", tipo:"titolo", tema:"profondo",
  titolo:"**GRADE** valuta la qualità<br>complessiva delle prove.<br>Non solo il disegno.",
  sotto:"È il motivo per cui la piramide classica non basta più da sola."},

{id:"s24", tipo:"tabella", tema:"chiaro", sopratitolo:"Gli strumenti, e le definizioni che i quiz mescolano",
  intestazioni:["Strumento","Che cos'è","Fonte"], colonne:["24%","54%","22%"], chiave:[0],
  righe:STRUMENTI},

{id:"s25", tipo:"catena", tema:"chiaro", sopratitolo:"Le tre frasi che risolvono la domanda",
  passi:[
   {t:"Linea guida", d:"**che cosa** è raccomandato fare, in generale"},
   {t:"Procedura", d:"**come** si fa **qui**, con quali risorse"},
   {t:"PDTA", d:"**chi fa che cosa** lungo il percorso", key:true}]},

{id:"s26", tipo:"confronto", tema:"chiaro", sopratitolo:"Da dove vengono",
  col:[
   {h:"La linea guida", t:"fonte **scientifica**", grande:true},
   {h:"Procedura e PDTA", t:"fonte **organizzativa**", grande:true}]},

{id:"s27", tipo:"titolo", tema:"profondo",
  titolo:"È **questa** la distinzione<br>che i quiz cercano.",
  sotto:"Non la definizione a memoria."},

{id:"s28", tipo:"norma", tema:"chiaro", sopratitolo:"La rilevanza giuridica",
  etichetta:"Legge", sigla:"24/2017 · art. 5",
  testo:"Gli esercenti si attengono, **salve le specificità del caso concreto**, alle raccomandazioni previste dalle linee guida."},

{id:"s29", tipo:"catena", tema:"chiaro", sopratitolo:"Quali linee guida rilevano",
  passi:[
   {t:"Enti, istituzioni, società scientifiche", d:"**iscritte in apposito elenco**"},
   {t:"Pubblicate nel SNLG", d:"presso l'**Istituto Superiore di Sanità**", key:true}]},

{id:"s30", tipo:"scala", tema:"chiaro", sopratitolo:"Due gradini, in quest'ordine",
  gradini:[
   {n:"1", t:"Linee guida accreditate", d:"nel SNLG presso l'ISS"},
   {n:"2", t:"In loro mancanza: buone pratiche", d:"clinico-assistenziali", key:true}]},

{id:"s31", tipo:"catena", tema:"chiaro", sopratitolo:"Il collegamento con il 590-sexies · la lezione 1.5",
  passi:[
   {t:"Linee guida accreditate", d:"o in mancanza le buone pratiche"},
   {t:"Adeguate al caso concreto", d:"a *questa* persona"},
   {t:"Esclusa la punibilità", d:"per la **sola imperizia**", key:true}]},

{id:"s32", tipo:"trappola", tema:"chiaro", sopratitolo:"Un'esclusione stretta",
  righe:[
   {sb:"«Le linee guida escludono la responsabilità»",
    ok:"Solo per la **sola imperizia** — non per **negligenza**, non per **imprudenza**"}]},

{id:"s33", tipo:"griglia", tema:"chiaro", colonne:2, sopratitolo:"Una protezione con due condizioni",
  celle:[
   {t:"Solo se **accreditate**", d:"nel SNLG"},
   {t:"Solo se **adeguate** a quel paziente"}]},

{id:"s34", tipo:"albero", tema:"chiaro", sopratitolo:"Discostarsi si può — ma come",
  radice:"Le specificità del caso richiedono di **discostarsi**?",
  rami:[
   {cond:"sì, e lo motivo in cartella", esito:"**legittimo**", key:true},
   {cond:"sì, ma senza motivo né documento", esito:"**non** legittimo"},
   {cond:"no", esito:"si applica la raccomandazione"}]},

{id:"s35", tipo:"titolo", tema:"chiaro", sopratitolo:"Dove sta la differenza",
  titolo:"Tutta **in cartella**.",
  sotto:"È la documentazione della lezione 2.4 a fare da ponte."},

{id:"s36", tipo:"sostituzione", tema:"profondo", sopratitolo:"Nei casi d'esame",
  da:{h:"Mai", t:"«Applico la linea guida<br>**comunque**»"},
  a:{h:"Sempre", t:"«Ne valuto l'adeguatezza a **questa persona**,<br>e se me ne discosto **lo motivo**»"}},

{id:"s37", tipo:"matrice", tema:"chiaro", sopratitolo:"Gli ostacoli fra l'evidenza e il letto",
  assex:["L'ostacolo","Un esempio"], assey:["Individuali","Organizzativi"],
  celle:[
   {t:"Poca familiarità con la ricerca", d:"e la barriera della lingua"},
   {t:"L'**abitudine**", d:"il più forte dei quattro", key:true},
   {t:"Risorse e accesso alle banche dati", d:"e poco tempo"},
   {t:"Cultura poco orientata al cambiamento"}]},

{id:"s38", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false,
  sopratitolo:"E gli ostacoli dell'evidenza stessa",
  celle:[
   {n:"1", t:"**Risultati contrastanti** fra studi"},
   {n:"2", t:"Scarsa **trasferibilità**"},
   {n:"3", t:"**Popolazioni diverse** da quella che hai davanti"}]},

{id:"s39", tipo:"icone", tema:"chiaro", sopratitolo:"Le leve che funzionano",
  voci:[
   {icona:"bilancia", t:"Audit e feedback", d:"misurare, e far vedere il risultato"},
   {icona:"cappello", t:"Formazione sul campo", d:"non in aula"},
   {icona:"persone", t:"Champion di reparto", d:"facilitatori che stanno lì"},
   {icona:"ingranaggio", t:"Nella procedura e nella cartella", d:"la raccomandazione integrata", key:true}]},

{id:"s40", tipo:"titolo", tema:"profondo",
  titolo:"Rende la buona pratica<br>il **percorso più semplice**.",
  sotto:"E la strada più facile è quella che le persone prendono."},

{id:"s41", tipo:"catena", tema:"chiaro", sopratitolo:"In Veneto · la catena da enunciare all'orale", attive:[0,1,2],
  passi:VENETO},
{id:"s42", tipo:"catena", tema:"chiaro", sopratitolo:"In Veneto · la catena da enunciare all'orale",
  passi:VENETO},

{id:"s43", tipo:"icone", tema:"chiaro", sopratitolo:"Le reti cliniche dove nascono gli indirizzi regionali",
  voci:[
   {icona:"cuoremano", t:"Oncologica"},
   {icona:"ospedale", t:"Stroke"},
   {icona:"avviso", t:"Trauma", key:true}]},

{id:"s44", tipo:"titolo", tema:"chiaro", sopratitolo:"Perché vale la pena saperla a memoria",
  titolo:"Dimostra che hai capito<br>**come le evidenze arrivano**<br>davvero in reparto.",
  sotto:"Non solo che cos'è una linea guida."},

{id:"s45", tipo:"griglia", tema:"chiaro", colonne:1, attive:[0,1],
  sopratitolo:"I sette punti", celle:MEMO},
{id:"s46", tipo:"griglia", tema:"chiaro", colonne:1, attive:[0,1,2,3],
  sopratitolo:"I sette punti", celle:MEMO},
{id:"s47", tipo:"griglia", tema:"chiaro", colonne:1, attive:[0,1,2,3,4],
  sopratitolo:"I sette punti", celle:MEMO},
{id:"s48", tipo:"griglia", tema:"chiaro", colonne:1,
  sopratitolo:"I sette punti", celle:MEMO},

{id:"s49", tipo:"titolo", tema:"chiaro", sopratitolo:"La frase da portare all'orale",
  titolo:"Discostarsi è **legittimo**,<br>purché **motivato e documentato**."},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"2.6", sottotitolo:"Rischio clinico<br>e sicurezza del paziente",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
