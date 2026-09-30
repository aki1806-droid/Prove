// Contenuto delle 47 scene della lezione 6b.4. *accento*  **accento in semibold**
//
// Corso «Progressione verticale · Comparto Sanità», Modulo 6-bis, Anticorruzione. Imparzialità:
// L. 241/1990 art. 6-bis; D.Lgs. 165/2001 artt. 35-bis, 53 (cc. 7, 7-bis, 16-ter), 54; D.Lgs. 39/2013
// artt. 1, 3, 10, 15, 17-20; DPR 62/2013 artt. 4, 6, 7, 13 (con DPR 81/2023).

const ENTE = "CISL FP Padova Rovigo · Progressione verticale · Comparto Sanità";

const TRE_COSE = [
  "Conflitto di interessi, anche **potenziale**: ci si **astiene** e lo si **segnala**; sull'astensione decide il **dirigente**",
  "**D.Lgs. 39/2013**: l'**inconferibilità** guarda al passato, l'**incompatibilità** impone di scegliere entro **15 giorni**; atti contrari **nulli**",
  "**Pantouflage**: **3 anni** di divieto dopo la cessazione; regali solo d'uso e di **modico valore**, orientativamente fino a **150 €**",
];

const DUE = [
  {h:"Inconferibilità", t:"guarda al **passato**: l'incarico non si conferisce"},
  {h:"Incompatibilità", t:"guarda al **presente**: si deve **scegliere**", key:true}];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 6-bis · Anticorruzione",
  titolo:"Imparzialità: conflitti,<br>incarichi, codice", sottotitolo:"Lezione 6b.4", ente:ENTE},

// --- 1 · aggancio
{id:"s02", tipo:"illustrata", tema:"chiaro", ill:"gru", sopratitolo:"Una gara per la manutenzione",
  titolo:"In gara c'è il **cognato**", punti:[
    {icona:"persone", t:"del **funzionario** che segue la pratica"},
    {icona:"spunta", t:"nessun **illecito** commesso"},
    {icona:"avviso", t:"deve fare un **passo indietro**?", key:true}],
  etichette:{}},
{id:"s03", tipo:"confronto", tema:"chiaro", sopratitolo:"Sì", col:[
  {h:"Non basta", t:"non **favorire** nessuno"},
  {h:"Serve", t:"non trovarsi nella posizione di **poterlo fare**", key:true}]},
{id:"s04", tipo:"titolo", tema:"profondo",
  titolo:"Imparziale è chi **non può**<br>favorire."},

// --- 2 · rotta
{id:"s05", tipo:"elenco", tema:"chiaro", numerato:true, grandi:true, sopratitolo:"Quattro passaggi", voci:[
  {t:"Conflitto di interessi e **astensione**"},
  {t:"Incarichi, commissioni, **pantouflage**"},
  {t:"**Inconferibilità** e incompatibilità"},
  {t:"Il **codice** di comportamento"}]},

// --- 3 · conflitto di interessi
{id:"s06", tipo:"norma", tema:"chiaro", etichetta:"L. 241/1990, art. 6-bis · dalla L. 190/2012", sigla:"Astenersi",
  testo:"Il responsabile del procedimento e chi adotta **pareri**, valutazioni e provvedimento finale, in caso di **conflitto di interessi**."},
{id:"s07", tipo:"confronto", tema:"chiaro", sopratitolo:"Conta anche il conflitto potenziale", col:[
  {h:"Non serve", t:"che l'interesse abbia **già influito**"},
  {h:"Basta", t:"che **possa** influire; e si **segnala**", key:true}]},
{id:"s08", tipo:"icone", tema:"chiaro", sopratitolo:"DPR 62/2013, art. 7 · interessi di chi", voci:[
  {icona:"persona", t:"**Propri**"},
  {icona:"cuoremano", t:"Del **coniuge** o convivente"},
  {icona:"persone", t:"Di parenti e affini entro il **2° grado**"},
  {icona:"chat", t:"Di chi si **frequenta** abitualmente", key:true}]},
{id:"s09", tipo:"elenco", tema:"chiaro", sopratitolo:"E ancora", voci:[
  {t:"**causa pendente** o grave inimicizia con l'interessato"},
  {t:"un ruolo in **enti** e associazioni coinvolti"},
  {t:"ogni altro caso di **gravi ragioni di convenienza**"}]},
{id:"s10", tipo:"illustrata", tema:"chiaro", ill:"organigramma", sopratitolo:"Chi decide sull'astensione",
  titolo:"Il **dirigente** dell'ufficio", punti:[
    {icona:"divieto", t:"non il dipendente **da solo**", key:true}],
  etichette:{}},
{id:"s11", tipo:"norma", tema:"chiaro", etichetta:"DPR 62/2013, art. 6", sigla:"Comunicare",
  testo:"I rapporti di collaborazione **retribuiti** degli ultimi **tre anni** con privati interessati alle attività dell'ufficio."},
{id:"s12", tipo:"catena", tema:"chiaro", sopratitolo:"Torniamo al cognato in gara", passi:[
  {t:"Il funzionario", d:"segnala il conflitto"},
  {t:"Il dirigente", d:"decide l'astensione"},
  {t:"La pratica", d:"passa ad altri", key:true}]},
{id:"s13", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione", righe:[
  {sb:"Ci si astiene solo se il conflitto è certo e attuale",
   ok:"Anche per il conflitto potenziale"}]},
{id:"s14", tipo:"titolo", tema:"profondo",
  titolo:"**Segnalare**, astenersi,<br>lasciare decidere al **dirigente**."},

// --- 4 · incarichi, commissioni, pantouflage
{id:"s15", tipo:"illustrata", tema:"chiaro", ill:"firma", sopratitolo:"D.Lgs. 165/2001, art. 53",
  titolo:"Incarichi **esterni**", punti:[
    {icona:"certificato", t:"solo con **autorizzazione**", key:true}],
  etichette:{}},
{id:"s16", tipo:"catena", tema:"chiaro", sopratitolo:"Art. 53, cc. 7 e 7-bis", passi:[
  {t:"Prima", d:"si verifica l'assenza di conflitti"},
  {t:"Compensi non autorizzati", d:"si versano all'ente"},
  {t:"Altrimenti", d:"Corte dei conti", key:true}]},
{id:"s17", tipo:"norma", tema:"chiaro", etichetta:"D.Lgs. 165/2001, art. 35-bis · dalla L. 190/2012", sigla:"Condannati",
  testo:"Anche con sentenza **non definitiva**, per reati contro la PA: niente **commissioni di concorso**, nemmeno come segretario."},
{id:"s18", tipo:"elenco", tema:"chiaro", vietato:true, sopratitolo:"E nemmeno", voci:[
  {t:"commissioni di **gara**"},
  {t:"uffici che gestiscono **risorse finanziarie**"},
  {t:"uffici **acquisti** e **contributi**"}]},
{id:"s19", tipo:"timeline", tema:"chiaro", sopratitolo:"Art. 53, c. 16-ter · il pantouflage", tappe:[
  {anno:"−3 anni", et:"poteri **autoritativi** o negoziali"},
  {anno:"Cessazione", et:"dal servizio"},
  {anno:"+3 anni", et:"niente lavoro per i **privati destinatari**", key:true}]},
{id:"s20", tipo:"tre", tema:"chiaro", sopratitolo:"Se si viola", box:[
  {n:"1", t:"Contratti nulli"},
  {n:"2", t:"Privati esclusi", d:"dai contratti con la PA per 3 anni"},
  {n:"3", t:"Compensi restituiti", key:true}]},
{id:"s21", tipo:"illustrata", tema:"chiaro", ill:"porta", sopratitolo:"Un esempio: i dispositivi medici",
  titolo:"Dal **contratto** all'assunzione", punti:[
    {icona:"documento", t:"per anni **firma** i contratti del fornitore"},
    {icona:"persona", t:"in pensione, viene **assunto** da lui", key:true}],
  etichette:{}},
{id:"s22", tipo:"trappola", tema:"tenue", sopratitolo:"Occhio al distrattore", righe:[
  {sb:"Per l'art. 35-bis serve una condanna definitiva",
   ok:"Basta una sentenza anche non passata in giudicato"}]},
{id:"s23", tipo:"titolo", tema:"profondo",
  titolo:"Tre anni **prima**,<br>tre anni **dopo**."},

// --- 5 · D.Lgs. 39/2013
{id:"s24", tipo:"confronto", tema:"chiaro", sopratitolo:"D.Lgs. 39/2013 · due situazioni", col:DUE},
{id:"s25", tipo:"tre", tema:"chiaro", sopratitolo:"Inconferibilità: tre condizioni pregresse", box:[
  {n:"1", t:"Condanna", d:"anche non definitiva, reati contro la PA"},
  {n:"2", t:"Enti privati", d:"regolati o finanziati dall'amministrazione"},
  {n:"3", t:"Cariche politiche", d:"ricoperte di recente", key:true}]},
{id:"s26", tipo:"catena", tema:"chiaro", sopratitolo:"Incompatibilità · art. 19", passi:[
  {t:"L'RPCT", d:"contesta"},
  {t:"15 giorni", d:"per scegliere"},
  {t:"Altrimenti", d:"decadenza", key:true}]},
{id:"s27", tipo:"illustrata", tema:"chiaro", ill:"ospedale", sopratitolo:"Articoli dedicati alla sanità",
  titolo:"DG, **DA** e **DS**", punti:[
    {icona:"orologio", t:"i periodi dopo una carica politica: **caso per caso**", key:true}],
  etichette:{}},
{id:"s28", tipo:"confronto", tema:"chiaro", sopratitolo:"Art. 20 · le dichiarazioni", col:[
  {h:"Inconferibilità", t:"all'atto del conferimento: senza, niente **efficacia**"},
  {h:"Incompatibilità", t:"rinnovata **ogni anno**", key:true}]},
{id:"s29", tipo:"illustrata", tema:"chiaro", ill:"bivio", sopratitolo:"Un esempio",
  titolo:"Deve **scegliere**", punti:[
    {icona:"ospedale", t:"direttore sanitario dell'**azienda**"},
    {icona:"euro", t:"e amministratore di una clinica **accreditata**"}],
  etichette:{}},
{id:"s30", tipo:"tre", tema:"chiaro", sopratitolo:"Artt. 15-18 · le conseguenze", box:[
  {n:"", t:"Atti nulli"},
  {n:"", t:"3 mesi", d:"senza poter conferire incarichi, per chi li ha conferiti"},
  {n:"", t:"Vigilano", d:"RPCT e ANAC", key:true}]},
{id:"s31", tipo:"trappola", tema:"tenue", sopratitolo:"Un errore delle dispense", righe:[
  {sb:"Le cariche politiche recenti rientrano nell'art. 3",
   ok:"L'art. 3 riguarda solo le condanne"}]},
{id:"s32", tipo:"titolo", tema:"profondo",
  titolo:"Inconferibile guarda al **passato**,<br>incompatibile al **presente**."},

// --- 6 · il codice
{id:"s33", tipo:"norma", tema:"chiaro", etichetta:"DPR 62/2013 · aggiornato dal DPR 81/2023", sigla:"Il codice",
  testo:"Diligenza, **lealtà** e **imparzialità**, tradotte in doveri concreti."},
{id:"s34", tipo:"numero", tema:"chiaro", sopratitolo:"DPR 62/2013, art. 4 · i regali",
  cifra:"150 €", testo:"in via **orientativa**, solo regali d'uso; anche come **sconto**; mai **chiesti**"},
{id:"s35", tipo:"confronto", tema:"chiaro", sopratitolo:"I codici delle aziende", col:[
  {h:"Possono", t:"**abbassare** il limite"},
  {h:"O", t:"**escludere** del tutto i regali", key:true}],
  sotto:"Pazienti, fornitori, industria farmaceutica."},
{id:"s36", tipo:"confronto", tema:"chiaro", sopratitolo:"Le novità del 2023", col:[
  {h:"Social e media", t:"niente che danneggi l'**immagine** dell'amministrazione"},
  {h:"Strumenti di lavoro", t:"per **fini d'ufficio**", key:true}]},
{id:"s37", tipo:"catena", tema:"chiaro", sopratitolo:"D.Lgs. 165/2001, art. 54, c. 5 · il codice aziendale", passi:[
  {t:"Procedura aperta", d:"alla partecipazione"},
  {t:"Parere obbligatorio", d:"dell'OIV"},
  {t:"Integra", d:"il codice generale", key:true}]},
{id:"s38", tipo:"icone", tema:"chiaro", sopratitolo:"DPR 62/2013, art. 13 · i dirigenti, in più", voci:[
  {icona:"persona", t:"Dare l'**esempio**"},
  {icona:"occhio", t:"Vigilare sui **collaboratori**"},
  {icona:"euro", t:"Comunicare **partecipazioni** e interessi", key:true}]},
{id:"s39", tipo:"scala", tema:"chiaro", sopratitolo:"Violare il codice", gradini:[
  {t:"Responsabilità disciplinare"},
  {t:"Violazioni gravi o reiterate", d:"fino al licenziamento", key:true}]},
{id:"s40", tipo:"trappola", tema:"tenue", sopratitolo:"Occhio", righe:[
  {sb:"Fino a 150 euro si ha diritto a ricevere regali",
   ok:"È un limite orientativo massimo, che l'azienda può abbassare"}]},
{id:"s41", tipo:"titolo", tema:"profondo",
  titolo:"Modico valore, **mai chiesto**:<br>l'azienda può dire **di meno**."},

// --- 7 · le tre cose
{id:"s42", tipo:"memo", tema:"chiaro", attive:[0], sopratitolo:"Le tre cose da portare alla prova", voci:TRE_COSE},
{id:"s43", tipo:"memo", tema:"chiaro", attive:[0,1], sopratitolo:"Le tre cose da portare alla prova", voci:TRE_COSE},
{id:"s44", tipo:"memo", tema:"chiaro", attive:[0,1,2], sopratitolo:"Le tre cose da portare alla prova", voci:TRE_COSE},
{id:"s45", tipo:"trappola", tema:"tenue", sopratitolo:"L'ultimo distrattore", righe:[
  {sb:"Per il divieto di stare in commissione serve la condanna definitiva",
   ok:"Basta una condanna non definitiva"}]},

// --- 8 · chiusura
{id:"s46", tipo:"titolo", tema:"profondo",
  titolo:"**Astenersi**, scegliere,<br>**non accettare**.",
  sotto:"Ultima lezione del modulo: chi segnala e le altre misure."},

{id:"s47", tipo:"copertina", tema:"profondo", modulo:"Prossima lezione",
  titolo:"Lezione 6b.5", sottotitolo:"Whistleblowing e misure di prevenzione", ente:ENTE},
];
