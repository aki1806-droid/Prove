// Contenuto delle 50 scene della lezione 7.3. *accento*  **accento in semibold**
//
// Corso «Progressione verticale · Comparto Sanità», Modulo 7. Le basi giuridiche:
// GDPR art. 4 n. 11, artt. 6, 7, 8; Codice artt. 2-ter e 2-quinquies.

const ENTE = "CISL FP Padova Rovigo · Progressione verticale · Comparto Sanità";

const TRE_COSE = [
  "Sei basi dell'**art. 6**, alla pari: consenso, contratto, obbligo legale, interessi vitali, **interesse pubblico**, legittimo interesse",
  "Consenso **libero, specifico, informato, inequivocabile**, dimostrabile e **revocabile**: nella PA raramente è la base adatta",
  "Sanità pubblica: **obbligo di legge** e **compito di interesse pubblico**, fondati su una norma; niente legittimo interesse",
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 7 · Trattamento dei dati personali",
  titolo:"Le basi<br>giuridiche", sottotitolo:"Lezione 7.3", ente:ENTE},

// --- 1 · aggancio
{id:"s02", tipo:"illustrata", tema:"chiaro", ill:"sportello", sopratitolo:"All'accettazione",
  titolo:"«Non do il **consenso**»", punti:[
    {icona:"documento", t:"il paziente non firma il **modulo**"},
    {icona:"cuoremano", t:"l'ospedale può **curarlo**?", key:true}],
  etichette:{insegna:{t:"Accettazione", key:true}}},
{id:"s03", tipo:"confronto", tema:"chiaro", sopratitolo:"Sì, e la ragione è il cuore della lezione", col:[
  {h:"Il consenso", t:"una **base** tra le altre"},
  {h:"Nella PA", t:"spesso **non** la più importante", key:true}]},
{id:"s04", tipo:"titolo", tema:"profondo",
  titolo:"Ogni trattamento<br>ha bisogno di una **base**."},

// --- 2 · rotta
{id:"s05", tipo:"flusso", tema:"chiaro", sopratitolo:"Quattro passaggi", passi:[
  {icona:"libro", t:"Le sei basi", d:"dell'art. 6"},
  {icona:"spunta", t:"Il consenso"},
  {icona:"ospedale", t:"Legge e interesse pubblico", key:true},
  {icona:"bilancia", t:"Le altre tre"}]},

// --- 3 · sei basi
{id:"s06", tipo:"norma", tema:"chiaro", etichetta:"GDPR, art. 6, par. 1", sigla:"Almeno una",
  testo:"Il trattamento è lecito solo se ricorre **almeno una** di sei condizioni."},
{id:"s07", tipo:"tre", tema:"chiaro", attive:[0,1,2], sopratitolo:"Le prime tre basi", box:[
  {n:"a", t:"Consenso", d:"dell'interessato"},
  {n:"b", t:"Contratto", d:"di cui l'interessato è parte"},
  {n:"c", t:"Obbligo legale", d:"a cui è soggetto il titolare"}]},
{id:"s08", tipo:"confronto", tema:"chiaro", sopratitolo:"Quarta e quinta", col:[
  {h:"d · Interessi vitali", t:"dell'interessato o di **un'altra persona**"},
  {h:"e · Interesse pubblico", t:"o esercizio di **pubblici poteri**", key:true}]},
{id:"s09", tipo:"illustrata", tema:"chiaro", ill:"bilancia", sopratitolo:"Sesta",
  titolo:"f · **Legittimo interesse**", punti:[
    {icona:"persona", t:"del titolare o di **terzi**"},
    {icona:"bilancia", t:"se non prevalgono i **diritti** dell'interessato", key:true}],
  etichette:{sx:"Interesse", dx:"Diritti", alto:{t:"Bilanciamento", key:true}}},
{id:"s10", tipo:"sostituzione", tema:"chiaro", sopratitolo:"Nessuna gerarchia, una parola decisiva",
  da:{h:"Non", t:"una base più forte delle altre"},
  a:{h:"Ma", t:"il trattamento dev'essere **necessario**"}},
{id:"s11", tipo:"flusso", tema:"chiaro", sopratitolo:"La base si sceglie prima", passi:[
  {icona:"bilancia", t:"Individuata", d:"prima di iniziare", key:true},
  {icona:"documento", t:"Indicata", d:"nell'informativa"},
  {icona:"divieto", t:"Non si cambia", d:"a metà strada"}]},
{id:"s12", tipo:"confronto", tema:"chiaro", sopratitolo:"Un esempio: lo stesso dipendente", col:[
  {h:"Lo stipendio", t:"un **obbligo di legge**"},
  {h:"La foto su un opuscolo", t:"il **consenso**", key:true}]},
{id:"s13", tipo:"trappola", tema:"tenue", sopratitolo:"Occhio a un distrattore", righe:[
  {sb:"Il consenso è la regola generale da cui partire",
   ok:"È una base tra sei, e spesso non è quella giusta"}]},
{id:"s14", tipo:"titolo", tema:"profondo",
  titolo:"Sei basi, tutte **alla pari**,<br>tutte legate alla **necessità**."},

// --- 4 · il consenso
{id:"s15", tipo:"norma", tema:"chiaro", etichetta:"GDPR, art. 4, n. 11", sigla:"Il consenso",
  testo:"Manifestazione di volontà **libera, specifica, informata e inequivocabile**."},
{id:"s16", tipo:"tre", tema:"chiaro", attive:[0,1,2], sopratitolo:"Tre caratteristiche", box:[
  {n:"1", t:"Libero", d:"si può dire di no senza conseguenze"},
  {n:"2", t:"Specifico", d:"una finalità precisa, non tutto in blocco"},
  {n:"3", t:"Informato", d:"la persona sa a cosa acconsente"}]},
{id:"s17", tipo:"sostituzione", tema:"chiaro", sopratitolo:"La quarta: inequivocabile",
  da:{h:"Non vale", t:"silenzio, inattività, casella già spuntata"},
  a:{h:"Serve", t:"una dichiarazione o un'**azione positiva**"}},
{id:"s18", tipo:"illustrata", tema:"chiaro", ill:"documento", sopratitolo:"Art. 7 · le condizioni",
  titolo:"Dimostrabile e **distinto**", punti:[
    {icona:"cartella", t:"il titolare deve poterlo **dimostrare**"},
    {icona:"documento", t:"nel modulo, **chiaramente distinguibile**", key:true}],
  etichette:{titolo:"Modulo", sigillo:{t:"Consenso", key:true}}},
{id:"s19", tipo:"confronto", tema:"chiaro", sopratitolo:"La revoca", col:[
  {h:"In qualsiasi momento", t:"con la **stessa facilità** con cui è dato", key:true},
  {h:"Non retroattiva", t:"ciò che è stato fatto prima resta **lecito**"}]},
{id:"s20", tipo:"illustrata", tema:"chiaro", ill:"bilancia", sopratitolo:"Un limite di fondo",
  titolo:"Lo **squilibrio**", punti:[
    {icona:"ospedale", t:"cittadino e **autorità pubblica**"},
    {icona:"persone", t:"lavoratore e **datore di lavoro**", key:true}],
  etichette:{sx:"Chi chiede", dx:"Chi acconsente", alto:{t:"Squilibrio", key:true}}},
{id:"s21", tipo:"confronto", tema:"chiaro", sopratitolo:"Nella PA e nel lavoro", col:[
  {h:"Raramente", t:"la base **adatta**"},
  {h:"Si usa", t:"per attività **davvero facoltative**", key:true}]},
{id:"s22", tipo:"confronto", tema:"chiaro", sopratitolo:"Due esempi di scelta vera", col:[
  {h:"Un'indagine", t:"sulla **soddisfazione**, volontaria"},
  {h:"Una foto", t:"del dipendente sulla pagina di un **progetto**", key:true}]},
{id:"s23", tipo:"contatore", tema:"chiaro", sopratitolo:"Art. 8 e art. 2-quinquies · minori e servizi online", sep:"→",
  valori:[{n:16, t:"anni nel regolamento"}, {n:14, t:"anni in Italia", key:true}],
  sotto:"Gli Stati possono scendere **fino a 13**."},
{id:"s24", tipo:"trappola", tema:"tenue", sopratitolo:"Un distrattore frequente", righe:[
  {sb:"A 14 anni si decide da soli anche sulle cure",
   ok:"I 14 anni valgono per app e piattaforme online"}]},
{id:"s25", tipo:"titolo", tema:"profondo",
  titolo:"**Libero**, **specifico**, informato,<br>inequivocabile, **revocabile**."},

// --- 5 · obbligo di legge e interesse pubblico
{id:"s26", tipo:"confronto", tema:"chiaro", sopratitolo:"In un'azienda sanitaria pubblica", col:[
  {h:"Lettera c", t:"**obbligo** di legge"},
  {h:"Lettera e", t:"compito di **interesse pubblico**", key:true}]},
{id:"s27", tipo:"norma", tema:"chiaro", etichetta:"GDPR, art. 6, par. 3", sigla:"Serve una norma",
  testo:"Queste basi sono stabilite dal diritto dell'**Unione** o dello **Stato**."},
{id:"s28", tipo:"illustrata", tema:"chiaro", ill:"documento", sopratitolo:"Codice, art. 2-ter",
  titolo:"Legge o **regolamento**", punti:[
    {icona:"libro", t:"la base per l'**interesse pubblico**"},
    {icona:"orologio", t:"testo **ritoccato** nel 2021", key:true}],
  etichette:{titolo:"Art. 2-ter", sigillo:{t:"Norma", key:true}}},
{id:"s29", tipo:"icone", tema:"chiaro", sopratitolo:"Obbligo di legge: i dati del personale", voci:[
  {icona:"euro",      t:"**Stipendi**"},
  {icona:"cartella",  t:"**Contributi**"},
  {icona:"documento", t:"Dichiarazioni **fiscali**"},
  {icona:"divieto",   t:"Nessun **consenso** da chiedere"}]},
{id:"s30", tipo:"icone", tema:"chiaro", sopratitolo:"Compito di interesse pubblico", voci:[
  {icona:"orologio", t:"**Liste d'attesa**"},
  {icona:"persone",  t:"**Screening**"},
  {icona:"occhio",   t:"Vigilanza **igienico sanitaria**"},
  {icona:"ospedale", t:"Le funzioni per cui l'azienda **esiste**"}]},
{id:"s31", tipo:"flusso", tema:"chiaro", sopratitolo:"Il paziente che non firma", passi:[
  {icona:"divieto", t:"Nessun consenso"},
  {icona:"libro", t:"Un compito", d:"previsto dalla legge"},
  {icona:"cuoremano", t:"La cura", d:"è lecita", key:true}]},
{id:"s32", tipo:"illustrata", tema:"chiaro", ill:"cartellaclinica", sopratitolo:"Per i dati sulla salute",
  titolo:"Una regola **in più**", punti:[
    {icona:"lucchetto", t:"sono **categorie particolari**"},
    {icona:"libro", t:"l'**articolo 9**: la prossima lezione", key:true}],
  etichette:{alto:{t:"Art. 9", key:true}}},
{id:"s33", tipo:"confronto", tema:"chiaro", sopratitolo:"Il modulo all'accettazione", col:[
  {h:"Spesso è", t:"la **presa visione** dell'informativa", key:true},
  {h:"Non è", t:"un **consenso**"}]},
{id:"s34", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione", righe:[
  {sb:"Senza consenso l'azienda resta paralizzata",
   ok:"Se una norma le affida il compito, il trattamento è lecito"}]},
{id:"s35", tipo:"titolo", tema:"profondo",
  titolo:"Nella sanità pubblica la base<br>è quasi sempre una **norma**."},

// --- 6 · contratto, interessi vitali, legittimo interesse
{id:"s36", tipo:"norma", tema:"chiaro", etichetta:"Art. 6, par. 1, lett. b", sigla:"Il contratto",
  testo:"Necessario per eseguire un contratto di cui l'interessato è **parte**."},
{id:"s37", tipo:"confronto", tema:"chiaro", sopratitolo:"Un esempio", col:[
  {h:"Un professionista", t:"con un contratto di **collaborazione**"},
  {h:"Un fornitore", t:"persona fisica, per i **pagamenti**", key:true}]},
{id:"s38", tipo:"illustrata", tema:"chiaro", ill:"scudo", sopratitolo:"Art. 6, par. 1, lett. d",
  titolo:"Gli **interessi vitali**", punti:[
    {icona:"cuoremano", t:"proteggere la **vita**"},
    {icona:"avviso", t:"una base **di emergenza**", key:true}],
  etichette:{alto:{t:"Emergenza", key:true}}},
{id:"s39", tipo:"illustrata", tema:"chiaro", ill:"bilancia", sopratitolo:"Art. 6, par. 1, lett. f",
  titolo:"Il **legittimo interesse**", punti:[
    {icona:"lucchetto", t:"per esempio la **sicurezza** dei locali"},
    {icona:"bilancia", t:"dopo un **bilanciamento**", key:true}],
  etichette:{sx:"Titolare", dx:"Persone", alto:{t:"Bilanciamento", key:true}}},
{id:"s40", tipo:"confronto", tema:"chiaro", sopratitolo:"Il regolamento è chiaro: il legittimo interesse", col:[
  {h:"Autorità pubbliche", t:"nei loro compiti **non** si applica"},
  {h:"Al suo posto", t:"serve una **norma**", key:true}]},
{id:"s41", tipo:"confronto", tema:"chiaro", sopratitolo:"Nel privato", col:[
  {h:"Più frequente", t:"il **legittimo interesse**"},
  {h:"Con cura", t:"quando tocca **pazienti** e dipendenti", key:true}]},
{id:"s42", tipo:"flusso", tema:"chiaro", sopratitolo:"Un'altra finalità", passi:[
  {icona:"cartella", t:"Nuovo scopo"},
  {icona:"bilancia", t:"Nuova base", d:"o compatibilità"},
  {icona:"spunta", t:"Solo allora", d:"si procede", key:true}]},
{id:"s43", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione", righe:[
  {sb:"La PA può fondare i propri compiti sul legittimo interesse",
   ok:"Serve una norma"}]},
{id:"s44", tipo:"titolo", tema:"profondo",
  titolo:"**Contratto**, **vita**, **interesse**:<br>ognuno con i suoi confini."},

// --- 7 · le tre cose
{id:"s45", tipo:"memo", tema:"chiaro", attive:[0], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s46", tipo:"memo", tema:"chiaro", attive:[0,1], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s47", tipo:"memo", tema:"chiaro", attive:[0,1,2], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s48", tipo:"trappola", tema:"tenue", sopratitolo:"L'ultimo distrattore", righe:[
  {sb:"Firmare l'informativa significa dare il consenso",
   ok:"È la prova di essere stati informati"}]},

// --- 8 · chiusura
{id:"s49", tipo:"titolo", tema:"profondo",
  titolo:"Sei **basi**,<br>un consenso con regole precise,<br>una sanità che agisce per **legge**.",
  sotto:"Prossima lezione: categorie particolari e dato sanitario."},

{id:"s50", tipo:"copertina", tema:"profondo", modulo:"Prossima lezione",
  titolo:"Lezione 7.4", sottotitolo:"Categorie particolari<br>e dato sanitario", ente:ENTE},
];
