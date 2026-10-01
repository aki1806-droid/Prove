// Contenuto delle 50 scene della lezione 5.4 — la somministrazione sicura.
// Nessun corpo nuovo: le sette G sono un percorso a due righe, i tre
// controlli tre gesti, le abbreviazioni pericolose quattro trappole con il
// segno scritto male a sinistra e quello giusto a destra, i LASA una
// sostituzione, i sei passi dopo l'errore un percorso. Illustrazioni nuove:
// la pettorina, l'armadio dei farmaci, l'etichetta, i due flaconi uguali.

const FASI = [
 {t:"Prescrizione"}, {t:"Trascrizione", d:"la scheda unica la elimina"}, {t:"Conservazione"}, {t:"Preparazione"},
 {t:"Distribuzione"}, {t:"Somministrazione", d:"la fase dell'infermiere", key:true}, {t:"Monitoraggio"},
];
const SETTE_G = [
 {t:"Giusto farmaco"}, {t:"Giusta dose"}, {t:"Giusta via"}, {t:"Giusto orario"},
 {t:"Giusto paziente", d:"la più violata", key:true}, {t:"Giusta registrazione"}, {t:"Giusto controllo", d:"il monitoraggio degli effetti"},
];
const ALTO_RISCHIO = [
 {n:"1", t:"**Anticoagulanti**"}, {n:"2", t:"**Insuline**"}, {n:"3", t:"**Oppioidi**"},
 {n:"4", t:"**Potassio** e soluzioni elettrolitiche concentrate", key:true}, {n:"5", t:"**Chemioterapici**"},
 {n:"6", t:"**Agonisti adrenergici**: adrenalina, noradrenalina"}, {n:"7", t:"**Sedativi** endovenosi"},
 {n:"8", t:"**Bloccanti neuromuscolari**"}, {n:"9", t:"**Digossina**"},
];
const RACC = [
 {n:"1", t:"**Potassio** concentrato"}, {n:"7", t:"**Errori in terapia**: morte, coma o grave danno — la madre di tutte", key:true},
 {n:"12", t:"Farmaci **LASA**"}, {n:"14", t:"Farmaci **antineoplastici**"},
 {n:"17", t:"**Riconciliazione**"}, {n:"19", t:"Forme **orali solide**"},
];
const ERRORE = [
 {t:"Valutare", d:"il paziente, e metterlo in sicurezza", key:true}, {t:"Avvisare", d:"subito il medico"}, {t:"Attuare", d:"gli interventi prescritti"},
 {t:"Informare", d:"la persona"}, {t:"Documentare", d:"in cartella, in modo oggettivo"}, {t:"Segnalare", d:"con l'incident reporting"},
];
const MAI = [
 {t:"Nascondere l'errore"}, {t:"Modificare la documentazione", d:"falso in atto pubblico"},
 {t:"Aspettare «per vedere se succede qualcosa»"}, {t:"Attribuire l'errore ad altri senza verifica"},
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 5 · Farmacologia e gestione sicura della terapia",
  titolo:"La somministrazione<br>sicura", sottotitolo:"5.4 · Le sette G, i tre controlli, gli errori che non si devono fare",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"frase", tema:"chiaro", sopratitolo:"Micro-lezione 4 di 8 · l'errore in terapia è fra gli eventi avversi più frequenti",
  testo:"La somministrazione è **l'ultimo anello** della catena: dopo, non c'è più nessuno che possa intercettarlo."},
{id:"s03", tipo:"titolo", tema:"profondo",
  titolo:"L'infermiere è<br>**l'ultima barriera**.",
  sotto:"Rischio clinico, documentazione e responsabilità, applicati al gesto più frequente della giornata."},

{id:"s04", tipo:"percorso", tema:"chiaro", sopratitolo:"Le fasi del processo · l'errore può nascere in ciascuna", attive:[0,1,2,3], tappe:FASI},
{id:"s05", tipo:"percorso", tema:"chiaro", sopratitolo:"Le fasi del processo · solo alcune sono in mano all'infermiere, e la somministrazione è la sua", tappe:FASI},

{id:"s06", tipo:"percorso", tema:"chiaro", sopratitolo:"Le regole delle sette G · in quasi tutti i quiz", attive:[0,1,2,3], tappe:SETTE_G},
{id:"s07", tipo:"percorso", tema:"chiaro", sopratitolo:"Le regole delle sette G · in quest'ordine le ricordi meglio", tappe:SETTE_G},
{id:"s08", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Alcuni testi ne aggiungono altre · se l'elenco è incompleto, cerca quella che manca", celle:[
  {n:"+", t:"La giusta **informazione** al paziente"}, {n:"+", t:"La giusta **preparazione**"}, {n:"+", t:"Il diritto al **rifiuto**"}]},

{id:"s09", tipo:"gesti", tema:"chiaro", sopratitolo:"I tre controlli · si confronta il farmaco con la prescrizione", voci:[
  {illu:"armadio", t:"Al prelievo", d:"dall'armadio"}, {illu:"etichetta", t:"Durante la preparazione"}, {illu:"braccialetto", t:"Al letto", d:"prima di somministrare", key:true}]},
{id:"s10", tipo:"figura", tema:"chiaro", sopratitolo:"Il terzo è il più importante", illu:"braccialetto",
  titolo:"L'unico fatto **davanti alla persona** e al suo braccialetto.",
  sotto:"Gli altri due si fanno in una stanza; questo si fa con il paziente."},

{id:"s11", tipo:"frase", tema:"chiaro", sopratitolo:"Il giusto paziente · la G più violata",
  testo:"Identificazione **attiva**: si chiede alla persona di dire **nome, cognome e data di nascita**."},
{id:"s12", tipo:"sostituzione", tema:"chiaro", sopratitolo:"Non si chiede «lei è il signor Rossi?»",
  da:{h:"Domanda chiusa", t:"una persona confusa o ipoacusica risponde sì"}, a:{h:"Due identificativi", t:"confrontati con il braccialetto e con la prescrizione"}},
{id:"s13", tipo:"titolo", tema:"profondo",
  titolo:"Il numero di letto<br>**non è mai un identificativo**.",
  sotto:"I pazienti si spostano."},

{id:"s14", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"La prescrizione · la lezione 2.4", celle:[
  {t:"**Scritta, leggibile, completa, firmata**", key:true}, {t:"Verbale solo in **urgenza**, con read-back e convalida scritta"}]},
{id:"s15", tipo:"frase", tema:"chiaro", sopratitolo:"Se la prescrizione è incompleta o dubbia · la stessa risposta del modulo 1",
  testo:"Si chiede chiarimento; se il dubbio permane **non si procede** e si documenta.",
  sotto:"L'infermiere non interpreta una prescrizione."},

{id:"s16", tipo:"trappola", tema:"chiaro", sopratitolo:"Le abbreviazioni pericolose · i quiz le chiedono sempre più spesso", righe:[
  {sb:"10 U", ok:"**10 unità**: la U si legge come uno zero"},
  {sb:"5,0 mg", ok:"**5 mg**: lo zero dopo la virgola si legge 50"}]},
{id:"s17", tipo:"trappola", tema:"chiaro", sopratitolo:"Le abbreviazioni pericolose · errori di dieci, cento, mille volte nascono da un segno", righe:[
  {sb:",5 mg", ok:"**0,5 mg**: sempre lo zero prima della virgola, o si legge 5"},
  {sb:"µg", ok:"**mcg**, o per esteso: si confonde con mg"}]},

{id:"s18", tipo:"frase", tema:"chiaro", sopratitolo:"Una regola organizzativa con un fondamento di responsabilità",
  testo:"**Chi prepara, somministra e registra.**",
  sotto:"Non si somministrano farmaci preparati da altri: non si può garantire ciò che non si è controllato."},
{id:"s19", tipo:"figura", tema:"chiaro", sopratitolo:"Ogni preparazione endovenosa va etichettata · paziente, farmaco, dose, orario, operatore", illu:"etichetta",
  titolo:"Una siringa senza etichetta è **una siringa sconosciuta**.",
  sotto:"E non si prepara con largo anticipo."},

{id:"s20", tipo:"frase", tema:"chiaro", sopratitolo:"Un fattore di rischio molto studiato · le interruzioni",
  testo:"Ogni interruzione durante la preparazione **aumenta la probabilità di errore**.",
  sotto:"La prima strategia: una zona di preparazione dedicata."},
{id:"s21", tipo:"figura", tema:"chiaro", sopratitolo:"Una segnalazione visiva · e regole condivise nel gruppo", illu:"pettorina", lato:"dx",
  titolo:"«Non disturbare,<br>sto preparando la terapia.»",
  sotto:"Un intervento sul sistema, secondo la logica di Reason."},

{id:"s22", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, attive:[0,1,2,3], sopratitolo:"I farmaci ad alto rischio (high alert) · in caso di errore, danni gravi", celle:ALTO_RISCHIO},
{id:"s23", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"I farmaci ad alto rischio · nove classi, da riconoscere a colpo d'occhio", celle:ALTO_RISCHIO},
{id:"s24", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Per questi, misure rinforzate", celle:[
  {t:"**Conservazione separata**"}, {t:"**Etichettatura**"}, {t:"**Doppio controllo indipendente**: ciascuno calcola per conto proprio", key:true}, {t:"**Pompe** infusionali"}]},

{id:"s25", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, attive:[0,1], sopratitolo:"Le Raccomandazioni ministeriali · da citare per numero", celle:RACC},
{id:"s26", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Le Raccomandazioni ministeriali", celle:RACC},

{id:"s27", tipo:"figura", tema:"chiaro", sopratitolo:"I farmaci LASA · look-alike, sound-alike", illu:"flaconi",
  titolo:"Simili per **confezione** o per **nome**.",
  sotto:"Due flaconi quasi identici, due nomi che si pronunciano quasi uguali."},
{id:"s28", tipo:"sostituzione", tema:"chiaro", sopratitolo:"Le misure · conservazione separata, etichette di allerta, lettura ad alta voce, read-back",
  da:{h:"Dopamina · Dobutamina", t:"si confondono"}, a:{h:"DOPamina · DOBUTamina", t:"le lettere diverse in maiuscolo"},
  sotto:"La tecnica delle lettere maiuscole differenziali."},

{id:"s29", tipo:"confronto", tema:"chiaro", sopratitolo:"La Raccomandazione 17 · due parole", col:[
  {h:"Ricognizione", t:"La raccolta **completa** della terapia di casa: integratori, erboristeria, farmaci da banco", key:true},
  {h:"Riconciliazione", t:"Il **confronto** con la terapia prescritta, a ogni passaggio di setting"}]},
{id:"s30", tipo:"catena", tema:"chiaro", sopratitolo:"A ogni passaggio di setting · per individuare omissioni, duplicazioni e interazioni", passi:[
  {t:"Ingresso", key:true}, {t:"Trasferimento"}, {t:"Dimissione"}]},
{id:"s31", tipo:"frase", tema:"chiaro", sopratitolo:"L'infermiere partecipa soprattutto alla ricognizione · è lui a raccogliere l'anamnesi",
  testo:"Una domanda in più all'ingresso, «prende qualcosa senza ricetta?», vale **un'interazione evitata**."},

{id:"s32", tipo:"percorso", tema:"chiaro", sopratitolo:"Quando si scopre un errore in terapia · sei passi", attive:[0,1], tappe:ERRORE},
{id:"s33", tipo:"percorso", tema:"chiaro", sopratitolo:"Quando si scopre un errore · compreso l'eventuale antidoto; la trasparenza della 2.6", attive:[0,1,2,3], tappe:ERRORE},
{id:"s34", tipo:"percorso", tema:"chiaro", sopratitolo:"Quando si scopre un errore · segnalare è cosa diversa dal registrare in cartella", tappe:ERRORE},

{id:"s35", tipo:"elenco", tema:"chiaro", vietato:true, attive:[0,1], sopratitolo:"E che cosa non si fa mai", voci:MAI},
{id:"s36", tipo:"elenco", tema:"chiaro", vietato:true, sopratitolo:"E che cosa non si fa mai · il tempo fa la differenza fra un errore senza conseguenze e un danno", voci:MAI},
{id:"s37", tipo:"titolo", tema:"profondo",
  titolo:"La responsabilità più grave non nasce dall'errore,<br>ma da **ciò che si fa dopo**.",
  sotto:"Quasi sempre."},

{id:"s38", tipo:"frase", tema:"chiaro", sopratitolo:"Il rifiuto della terapia · la legge 219",
  testo:"La persona capace ha il **diritto di rifiutare**.",
  sotto:"L'infermiere esplora i motivi: effetti collaterali, paura, incomprensione, difficoltà a deglutire."},
{id:"s39", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Il rifiuto · che cosa fa l'infermiere", celle:[
  {t:"**Informa** sulle conseguenze"}, {t:"**Non somministra di nascosto**", key:true}, {t:"**Avvisa** il medico"}, {t:"**Documenta** il rifiuto e l'informazione data"}]},
{id:"s40", tipo:"confronto", tema:"chiaro", sopratitolo:"Un farmaco nascosto nel cibo a una persona capace che l'ha rifiutato è una violazione della sua libertà", col:[
  {h:"Persona capace", t:"Decide lei. **Mai di nascosto**", key:true},
  {h:"Persona non capace", t:"Un percorso definito con il medico e con chi la rappresenta"}]},

{id:"s41", tipo:"confronto", tema:"chiaro", sopratitolo:"Un aggancio al modulo 1 · l'OSS", col:[
  {h:"L'OSS può", t:"**Aiutare** nell'assunzione della terapia orale già preparata, su attribuzione e secondo procedura"},
  {h:"Restano infermieristiche", t:"**Preparazione**, verifica delle sette G, **responsabilità** della somministrazione", key:true}]},
{id:"s42", tipo:"frase", tema:"chiaro", sopratitolo:"Attribuire non significa delegare la responsabilità",
  testo:"L'OSS **non prepara, non controlla, non registra**."},

{id:"s43", tipo:"frase", tema:"chiaro", sopratitolo:"Il caso d'esame",
  testo:"Alle 8 somministri la terapia al letto 12. Alle 8:15 ti accorgi che era quella del **letto 14**. Che cosa fai?"},
{id:"s44", tipo:"percorso", tema:"chiaro", sopratitolo:"Il caso · valuti, avvisi con SBAR, attui", attive:[0,1,2], tappe:[
  {t:"Valuti il letto 12", d:"parametri, coscienza, sintomi: quali farmaci ha ricevuto", key:true}, {t:"Avvisi il medico", d:"con una comunicazione SBAR"}, {t:"Attui", d:"gli interventi prescritti"},
  {t:"Il letto 14", d:"non ha ricevuto la sua terapia"}, {t:"Informi, documenti, segnali"}, {t:"Perché è successo?", d:"con il gruppo"}]},
{id:"s45", tipo:"percorso", tema:"chiaro", sopratitolo:"Il caso · e anche il letto 14 non ha ricevuto la sua terapia", tappe:[
  {t:"Valuti il letto 12", d:"parametri, coscienza, sintomi: quali farmaci ha ricevuto", key:true}, {t:"Avvisi il medico", d:"con una comunicazione SBAR"}, {t:"Attui", d:"gli interventi prescritti"},
  {t:"Il letto 14", d:"non ha ricevuto la sua terapia"}, {t:"Informi, documenti, segnali"}, {t:"Perché è successo?", d:"identificazione non attiva? interruzione?"}]},

{id:"s46", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"In Veneto", celle:[
  {n:"1", t:"**Scheda unica di terapia informatizzata**: elimina la trascrizione", key:true},
  {n:"2", t:"**Procedure aziendali** su farmaci ad alto rischio, LASA, ricognizione e riconciliazione"}]},
{id:"s47", tipo:"figura", tema:"chiaro", sopratitolo:"L'identificazione con braccialetto, o con codice a barre letto al letto", illu:"braccialetto", lato:"dx",
  titolo:"Il sistema aiuta, ma **il terzo controllo resta tuo**.",
  sotto:"Chiude il cerchio fra prescrizione, farmaco e persona."},

{id:"s48", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Ricapitoliamo", celle:[
  {t:"Le **sette G**"}, {t:"I **tre controlli**, l'ultimo **al letto**", key:true},
  {t:"Identificazione **attiva**, due identificativi"}, {t:"Niente **U**, niente **zero dopo la virgola**"},
  {t:"**Chi prepara somministra**"}, {t:"Alto rischio → **doppio controllo**"}]},
{id:"s49", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Ricapitoliamo · prossima lezione, le classi di farmaci", celle:[
  {t:"Raccomandazioni **1, 7, 12, 14, 17, 19**"}, {t:"Davanti a un errore: **valutare, avvisare, informare, documentare, segnalare**. Mai nascondere", key:true}]},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"5.5<br>Farmaci cardiovascolari,<br>antidiabetici e anticoagulanti", sottotitolo:"Che cosa controllare prima, che cosa sorvegliare dopo, qual è l'antidoto",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
