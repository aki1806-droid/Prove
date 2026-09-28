// Contenuto delle 50 scene della lezione 8.6. *accento*  **accento in semibold**
//
// Corso «Progressione verticale · Comparto Sanità», Modulo 8. Performance, mobilità, lavoro agile:
// D.Lgs. 150/2009 artt. 4-10, 14; PIAO (D.L. 80/2021, art. 6); D.Lgs. 165 artt. 6, 30, 33, 34, 34-bis;
// D.Lgs. 82/2005; L. 81/2017 artt. 18-23; CCNL Sanità 2019-2021.

const ENTE = "CISL FP Padova Rovigo · Progressione verticale · Comparto Sanità";

const TRE_COSE = [
  "Ciclo della performance dagli **obiettivi** alla **rendicontazione**; piano entro il **31 gennaio**, oggi nel **PIAO**; relazione entro il **30 giugno**, validata dall'**OIV**",
  "Mobilità volontaria: passaggio diretto dell'**art. 30**; nel **SSN** serve ancora l'**assenso**; trasferimenti d'ufficio entro **50 km**",
  "Lavoro agile: **accordo individuale**, lavoro per **obiettivi**, **disconnessione**, stesso trattamento economico",
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 8 · Normativa sul pubblico impiego",
  titolo:"Performance, mobilità,<br>lavoro agile", sottotitolo:"Lezione 8.6", ente:ENTE},

// --- 1 · aggancio
{id:"s02", tipo:"illustrata", tema:"chiaro", ill:"lavoroagile", sopratitolo:"Un'impiegata dell'ufficio acquisti",
  titolo:"Tre richieste in un **mese**", punti:[
    {icona:"occhio", t:"sapere come è stata **valutata**"},
    {icona:"ospedale", t:"trasferirsi in un'azienda **vicino a casa**"},
    {icona:"orologio", t:"lavorare da casa **due giorni** a settimana", key:true}],
  etichette:{alto:{t:"Tre richieste", key:true}}},
{id:"s03", tipo:"frase", tema:"chiaro", sopratitolo:"Il pubblico impiego di oggi",
  testo:"Tre richieste,<br>**tre capitoli.**",
  sotto:"Tutte passano da **regole precise**."},
{id:"s04", tipo:"titolo", tema:"profondo",
  titolo:"**Misurare** il lavoro,<br>**muovere** le persone,<br>cambiare il **modo** di lavorare."},

// --- 2 · rotta
{id:"s05", tipo:"flusso", tema:"chiaro", sopratitolo:"Quattro passaggi", passi:[
  {icona:"ingranaggio", t:"Il ciclo della performance"},
  {icona:"persone", t:"La mobilità"},
  {icona:"euro", t:"Spesa e digitale", key:true},
  {icona:"orologio", t:"Il lavoro agile"}]},

// --- 3 · il ciclo della performance
{id:"s06", tipo:"confronto", tema:"chiaro", sopratitolo:"D.Lgs. 150/2009 · la performance come ciclo", col:[
  {h:"Si parte", t:"dagli **obiettivi**", key:true},
  {h:"Collegati", t:"alle **risorse** disponibili"}]},
{id:"s07", tipo:"ciclo", tema:"chiaro", sopratitolo:"Art. 4 · le fasi",
  centro:"Ciclo", dcentro:"della performance", fasi:[
  {icona:"spunta", t:"Obiettivi"},
  {icona:"occhio", t:"Monitoraggio"},
  {icona:"bilancia", t:"Misura e valutazione"},
  {icona:"euro", t:"Sistemi premianti"},
  {icona:"chat", t:"Rendicontazione", key:true}]},
{id:"s08", tipo:"illustrata", tema:"chiaro", ill:"calendario", sopratitolo:"Art. 10 · il piano della performance",
  titolo:"Entro il **31 gennaio**", punti:[
    {icona:"documento", t:"gli **obiettivi** dell'anno"},
    {icona:"cartella", t:"oggi è una sezione del **PIAO**", key:true}],
  etichette:{data:"31 gennaio", nota:"Piano", alto:{t:"PIAO", key:true}}},
{id:"s09", tipo:"griglia", tema:"chiaro", colonne:5, spunta:false, sopratitolo:"Il PIAO · un solo documento", celle:[
  {t:"**Performance**"}, {t:"**Fabbisogni** di personale"}, {t:"**Lavoro agile**"},
  {t:"**Formazione**"}, {t:"Prevenzione della **corruzione**"}]},
{id:"s10", tipo:"illustrata", tema:"chiaro", ill:"calendario", sopratitolo:"Art. 10 · la relazione sulla performance",
  titolo:"Entro il **30 giugno**", punti:[
    {icona:"documento", t:"i **risultati** dell'anno prima"},
    {icona:"sigillo", t:"la **valida** l'OIV", key:true}],
  etichette:{data:"30 giugno", nota:"Relazione", alto:{t:"Validata dall'OIV", key:true}}},
{id:"s11", tipo:"illustrata", tema:"chiaro", ill:"cruscotto", sopratitolo:"Artt. 7 e 14 · l'organismo indipendente di valutazione",
  titolo:"L'**OIV**", punti:[
    {icona:"sigillo", t:"parere **vincolante** sul sistema di misurazione"},
    {icona:"occhio", t:"verifica che il **ciclo** funzioni"},
    {icona:"persone", t:"organismo **esterno**, di esperti", key:true}],
  etichette:{alto:{t:"OIV", key:true}, sx:"Sistema", dx:"Ciclo"}},
{id:"s12", tipo:"confronto", tema:"chiaro", sopratitolo:"Artt. 8 e 9 · che cosa si valuta", col:[
  {h:"Organizzativa", t:"dell'**ente** e delle strutture"},
  {h:"Individuale", t:"di dirigenti e dipendenti: **risultati**, competenze, comportamenti", key:true}]},
{id:"s13", tipo:"sostituzione", tema:"chiaro", sopratitolo:"La differenziazione dei premi",
  da:{h:"Un tempo", t:"fasce rigide per legge, un quarto senza premio"},
  a:{h:"Dal 2017", t:"criteri stabiliti dai **contratti collettivi**"}},
{id:"s14", tipo:"trappola", tema:"tenue", sopratitolo:"Occhio a un distrattore", righe:[
  {sb:"L'OIV valida il piano della performance",
   ok:"Valida la relazione; il piano lo adotta l'organo di indirizzo"}]},
{id:"s15", tipo:"titolo", tema:"profondo",
  titolo:"Obiettivi a **gennaio**,<br>risultati a **giugno**,<br>un giudice **esterno**."},

// --- 4 · la mobilità
{id:"s16", tipo:"illustrata", tema:"chiaro", ill:"incastro", sopratitolo:"D.Lgs. 165, art. 30 · la mobilità volontaria",
  titolo:"Il passaggio **diretto**", punti:[
    {icona:"persona", t:"da un'amministrazione a un'**altra**"},
    {icona:"documento", t:"con la **cessione** del contratto", key:true}],
  etichette:{sx:"Ente di partenza", dx:"Ente di arrivo", basso:{t:"Cessione del contratto", key:true}}},
{id:"s17", tipo:"illustrata", tema:"chiaro", ill:"sito", sopratitolo:"Come si copre un posto",
  titolo:"Un **avviso** pubblico", punti:[
    {icona:"documento", t:"**requisiti** e competenze richieste"},
    {icona:"persone", t:"selezione tra le **domande**", key:true}],
  etichette:{barra:"Bandi e avvisi", menu:{t:"Avviso di mobilità", key:true}}},
{id:"s18", tipo:"confronto", tema:"chiaro", sopratitolo:"Dal 2021 · il via libera dell'ente di partenza", col:[
  {h:"La maggior parte degli enti", t:"di regola **non serve** più"},
  {h:"Servizio sanitario nazionale", t:"l'**assenso** serve ancora", key:true}]},
{id:"s19", tipo:"flusso", tema:"chiaro", sopratitolo:"Torniamo all'impiegata", passi:[
  {icona:"documento", t:"Avviso", d:"dell'azienda di arrivo"},
  {icona:"persona", t:"Domanda"},
  {icona:"spunta", t:"Assenso", d:"dell'azienda di provenienza", key:true},
  {icona:"ospedale", t:"Passaggio"}]},
{id:"s20", tipo:"contatore", tema:"chiaro", sopratitolo:"Art. 30, c. 2 · i trasferimenti d'ufficio",
  valori:[{n:50, t:"km al massimo, o nello stesso comune", key:true}],
  sotto:"Anche senza il **consenso** del dipendente."},
{id:"s21", tipo:"confronto", tema:"chiaro", sopratitolo:"Comando e distacco · le assegnazioni temporanee", col:[
  {h:"Dove lavora", t:"per un periodo presso un **altro ente**"},
  {h:"A chi appartiene", t:"sempre alla **sua** amministrazione", key:true}]},
{id:"s22", tipo:"contatore", tema:"chiaro", sopratitolo:"Artt. 33 e 34 · le eccedenze", sep:"·",
  valori:[{n:24, t:"mesi al massimo in disponibilità"}, {n:80, t:"% dello stipendio", key:true}],
  sotto:"Prima si prova a **ricollocare** il personale."},
{id:"s23", tipo:"flusso", tema:"chiaro", sopratitolo:"Art. 34-bis · prima di assumere dall'esterno", passi:[
  {icona:"documento", t:"L'ente comunica", d:"i posti da coprire"},
  {icona:"occhio", t:"Verifica", d:"del personale in disponibilità", key:true},
  {icona:"persone", t:"Poi", d:"l'assunzione esterna"}]},
{id:"s24", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione", righe:[
  {sb:"Anche in sanità la mobilità non richiede più il nulla osta",
   ok:"Nel Servizio sanitario serve ancora l'assenso dell'azienda"}]},
{id:"s25", tipo:"titolo", tema:"profondo",
  titolo:"Ci si muove per **avviso**,<br>con regole diverse per la **sanità**."},

// --- 5 · vincoli di spesa e digitale
{id:"s26", tipo:"illustrata", tema:"chiaro", ill:"bilancio", sopratitolo:"D.Lgs. 165, art. 6 · i vincoli di spesa",
  titolo:"Il piano dei **fabbisogni**", punti:[
    {icona:"euro", t:"entro le **risorse** disponibili"},
    {icona:"persone", t:"entro le **capacità assunzionali** di legge", key:true}],
  etichette:{alto:{t:"Fabbisogni", key:true}, sx:"Risorse", dx:"Assunzioni"}},
{id:"s27", tipo:"sostituzione", tema:"chiaro", sopratitolo:"Triennale, aggiornato ogni anno",
  da:{h:"Prima", t:"la dotazione organica, un elenco fisso di posti"},
  a:{h:"Oggi", t:"il piano dei fabbisogni: la **spesa sostenibile**"}},
{id:"s28", tipo:"illustrata", tema:"chiaro", ill:"ospedale", sopratitolo:"Nel Servizio sanitario",
  titolo:"Un limite alla **spesa**", punti:[
    {icona:"euro", t:"spesa complessiva per il **personale**"},
    {icona:"ospedale", t:"le **regioni** devono rispettarlo", key:true}],
  etichette:{}},
{id:"s29", tipo:"illustrata", tema:"chiaro", ill:"cassaforte", sopratitolo:"Il salario accessorio",
  titolo:"Il tetto del **2016**", punti:[
    {icona:"euro", t:"il fondo di regola non supera quello del **2016**"},
    {icona:"libro", t:"salvo le **deroghe** di legge e dei contratti", key:true}],
  etichette:{alto:{t:"Tetto 2016", key:true}}},
{id:"s30", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Il codice dell'amministrazione digitale", celle:[
  {t:"**Documenti** informatici"}, {t:"**Identità** digitale"},
  {t:"**Servizi** online"}, {t:"Dipendenti **capaci** di usarli"}]},
{id:"s31", tipo:"contatore", tema:"chiaro", sopratitolo:"Direttiva del 2023 · la formazione",
  valori:[{n:24, t:"ore l'anno, almeno, per ogni dipendente", key:true}],
  sotto:"Un **dovere** e un **diritto**."},
{id:"s32", tipo:"flusso", tema:"chiaro", sopratitolo:"Un esempio in azienda", passi:[
  {icona:"cartella", t:"Fascicolo", d:"digitale"},
  {icona:"orologio", t:"Ferie", d:"dal portale"},
  {icona:"documento", t:"Firma", d:"elettronica", key:true}]},
{id:"s33", tipo:"trappola", tema:"tenue", sopratitolo:"Un distrattore frequente", righe:[
  {sb:"Il piano dei fabbisogni è una lista dei desideri",
   ok:"Si costruisce dentro vincoli di spesa e capacità assunzionali"}]},
{id:"s34", tipo:"titolo", tema:"profondo",
  titolo:"Risorse **contate**,<br>competenze **digitali**,<br>formazione **continua**."},

// --- 6 · il lavoro agile
{id:"s35", tipo:"illustrata", tema:"chiaro", ill:"lavoroagile", sopratitolo:"L. 81/2017, artt. 18-23",
  titolo:"Il lavoro **agile**", punti:[
    {icona:"persona", t:"un modo di svolgere il lavoro **subordinato**"},
    {icona:"documento", t:"deciso con un **accordo**", key:true}],
  etichette:{alto:{t:"L. 81/2017", key:true}}},
{id:"s36", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Art. 18 · come si lavora", celle:[
  {t:"Per fasi, cicli e **obiettivi**"}, {t:"Senza precisi vincoli di **orario** o **luogo**"},
  {t:"Con strumenti **tecnologici**"}, {t:"In parte in sede, in parte **fuori**"}]},
{id:"s37", tipo:"illustrata", tema:"chiaro", ill:"firma", sopratitolo:"Art. 19 · l'accordo scritto e individuale",
  titolo:"Che cosa **stabilisce**", punti:[
    {icona:"orologio", t:"i **giorni** fuori sede e i tempi di riposo"},
    {icona:"ingranaggio", t:"gli **strumenti**"},
    {icona:"chat", t:"le fasce di **contattabilità**", key:true}],
  etichette:{alto:{t:"Accordo", key:true}, sx:"Dipendente", dx:"Amministrazione"}},
{id:"s38", tipo:"confronto", tema:"chiaro", sopratitolo:"Artt. 19 e 20 · i diritti", col:[
  {h:"Disconnessione", t:"fuori dalle fasce **non si risponde**", key:true},
  {h:"Parità", t:"stesso **trattamento economico** di chi è in sede"}]},
{id:"s39", tipo:"illustrata", tema:"chiaro", ill:"documento", sopratitolo:"Art. 22 · la sicurezza",
  titolo:"L'**informativa** sui rischi", punti:[
    {icona:"scudo", t:"il datore resta **responsabile** della sicurezza"},
    {icona:"persone", t:"**priorità** a genitori di figli piccoli e lavoratori fragili", key:true}],
  etichette:{titolo:"Informativa scritta", sigillo:{t:"Sicurezza", key:true}}},
{id:"s40", tipo:"confronto", tema:"chiaro", sopratitolo:"Il contratto della sanità distingue", col:[
  {h:"Lavoro agile", t:"senza precisi vincoli di **orario** e **luogo**", key:true},
  {h:"Lavoro da remoto", t:"orario e luogo **definiti**"}]},
{id:"s41", tipo:"flusso", tema:"chiaro", sopratitolo:"Torniamo all'impiegata", passi:[
  {icona:"spunta", t:"Lavoro", d:"per obiettivi"},
  {icona:"documento", t:"Accordo", d:"individuale"},
  {icona:"orologio", t:"Due giorni", d:"da casa, con fasce di contatto", key:true}]},
{id:"s42", tipo:"confronto", tema:"chiaro", sopratitolo:"Non tutte le attività si prestano", col:[
  {h:"In reparto", t:"l'assistenza ai pazienti **non** si fa a distanza"},
  {h:"L'amministrazione", t:"individua le attività **compatibili**", key:true}]},
{id:"s43", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione", righe:[
  {sb:"Il lavoro agile è un diritto automatico di tutti",
   ok:"Nasce da un accordo individuale, per attività compatibili"}]},
{id:"s44", tipo:"titolo", tema:"profondo",
  titolo:"Lavorare per **obiettivi**,<br>con il diritto di **staccare**."},

// --- 7 · le tre cose
{id:"s45", tipo:"memo", tema:"chiaro", attive:[0], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s46", tipo:"memo", tema:"chiaro", attive:[0,1], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s47", tipo:"memo", tema:"chiaro", attive:[0,1,2], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s48", tipo:"trappola", tema:"tenue", sopratitolo:"L'ultimo distrattore", righe:[
  {sb:"Lavoro agile e lavoro da remoto sono la stessa cosa",
   ok:"Nel lavoro agile non ci sono precisi vincoli di orario e luogo"}]},

// --- 8 · chiusura
{id:"s49", tipo:"titolo", tema:"profondo",
  titolo:"Si **misura** il lavoro,<br>ci si **muove** con regole,<br>si lavora anche in modo **agile**.",
  sotto:"Prossimo modulo: salute e sicurezza sul lavoro."},

{id:"s50", tipo:"copertina", tema:"profondo", modulo:"Prossimo modulo",
  titolo:"Modulo 9", sottotitolo:"Salute e sicurezza<br>sul lavoro", ente:ENTE},
];
