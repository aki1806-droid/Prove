// Contenuto delle 48 scene della lezione 6b.3. *accento*  **accento in semibold**
//
// Corso «Progressione verticale · Comparto Sanità», Modulo 6-bis, Anticorruzione. Il responsabile
// della prevenzione della corruzione e della trasparenza: L. 190/2012 art. 1 cc. 7, 8, 8-bis, 10,
// 12, 13, 14; D.Lgs. 165/2001 artt. 16 e 21; D.Lgs. 33/2013 art. 5; D.Lgs. 39/2013 art. 15; PNA 2019.

const ENTE = "CISL FP Padova Rovigo · Progressione verticale · Comparto Sanità";

const TRE_COSE = [
  "L'**RPCT** lo nomina l'**organo di indirizzo**, di norma tra i **dirigenti di ruolo** in servizio, con poteri e **autonomia** effettivi",
  "**Propone** il piano, ne verifica **attuazione** e **rotazione**, segnala le disfunzioni; relazione annuale entro il **15 dicembre**",
  "Per un reato di corruzione con sentenza **definitiva** risponde, salvo provare **piano e vigilanza**; sospensione da **1 a 6 mesi**",
];

const COMPITI = [
  {icona:"documento", t:"Propone il **piano**"},
  {icona:"spunta", t:"Verifica l'**attuazione**"},
  {icona:"persone", t:"Verifica la **rotazione**"},
  {icona:"avviso", t:"**Segnala** le disfunzioni", key:true}];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 6-bis · Anticorruzione",
  titolo:"Il responsabile<br>della prevenzione", sottotitolo:"Lezione 6b.3", ente:ENTE},

// --- 1 · aggancio
{id:"s02", tipo:"illustrata", tema:"chiaro", ill:"microscopio", sopratitolo:"Forniture di laboratorio",
  titolo:"Una **tangente** scoperta", punti:[
    {icona:"giudice", t:"la sentenza diventa **definitiva**"},
    {icona:"persona", t:"chi altro deve **rispondere**?", key:true}],
  etichette:{}},
{id:"s03", tipo:"confronto", tema:"chiaro", sopratitolo:"La risposta della legge 190", col:[
  {h:"Anche", t:"il **responsabile della prevenzione**"},
  {h:"Salvo che", t:"dimostri di aver fatto il **proprio lavoro**", key:true}]},
{id:"s04", tipo:"titolo", tema:"profondo",
  titolo:"Chi deve **prevenire**<br>risponde di ciò che non ha **prevenuto**."},

// --- 2 · rotta
{id:"s05", tipo:"elenco", tema:"chiaro", numerato:true, grandi:true, sopratitolo:"Quattro passaggi", voci:[
  {t:"**Nomina** e autonomia"},
  {t:"Che cosa **fa**"},
  {t:"Di che cosa **risponde**"},
  {t:"La **rete** intorno a lui"}]},

// --- 3 · nomina e autonomia
{id:"s06", tipo:"sigla", tema:"chiaro", sopratitolo:"Dal 2016, di norma una sola persona", lettere:[
  {l:"R", p:"Responsabile"}, {l:"P", p:"Prevenzione"}, {l:"C", p:"Corruzione"}, {l:"T", p:"Trasparenza", key:true}]},
{id:"s07", tipo:"illustrata", tema:"chiaro", ill:"organigramma", sopratitolo:"L. 190/2012, art. 1, c. 7",
  titolo:"Chi lo **nomina**", punti:[
    {icona:"sigillo", t:"l'**organo di indirizzo**: in azienda, il **DG**", key:true},
    {icona:"persona", t:"di norma un **dirigente di ruolo** in servizio"}],
  etichette:{}},
{id:"s08", tipo:"frase", tema:"chiaro", sopratitolo:"Art. 1, c. 7",
  testo:"Funzioni e poteri idonei, per svolgere l'incarico con **piena autonomia** ed **effettività**."},
{id:"s09", tipo:"confronto", tema:"chiaro", sopratitolo:"Il nome del responsabile", col:[
  {h:"Si comunica", t:"all'**ANAC**"},
  {h:"Si pubblica", t:"in **Amministrazione trasparente**", key:true}]},
{id:"s10", tipo:"elenco", tema:"chiaro", vietato:true, sopratitolo:"Il PNA sconsiglia di scegliere", voci:[
  {t:"dirigenti delle aree **più a rischio**", d:"contratti, patrimonio"},
  {t:"chi guida l'**ufficio disciplinare**"}]},
{id:"s11", tipo:"catena", tema:"chiaro", sopratitolo:"Un'autonomia protetta", passi:[
  {t:"Misure discriminatorie", d:"legate alle sue funzioni"},
  {t:"Segnalate all'ANAC"},
  {t:"L'ANAC", d:"chiede informazioni e interviene", key:true}]},
{id:"s12", tipo:"illustrata", tema:"chiaro", ill:"tavolo", sopratitolo:"Persone e mezzi",
  titolo:"Una struttura di **supporto**", punti:[
    {icona:"persone", t:"nelle aziende grandi, un **ufficio** dedicato", key:true}],
  etichette:{}},
{id:"s13", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione", righe:[
  {sb:"L'RPCT può essere un consulente esterno",
   ok:"È di norma un dirigente di ruolo in servizio"}]},
{id:"s14", tipo:"titolo", tema:"profondo",
  titolo:"Un dirigente **interno**,<br>nominato dal vertice, ma **autonomo**."},

// --- 4 · che cosa fa
{id:"s15", tipo:"catena", tema:"chiaro", sopratitolo:"Art. 1, c. 8 · entro il 31 gennaio", passi:[
  {t:"Propone il piano", d:"all'organo di indirizzo"},
  {t:"Definisce", d:"come selezionare e formare"},
  {t:"Chi lavora", d:"nei settori più esposti", key:true}]},
{id:"s16", tipo:"icone", tema:"chiaro", attive:[0,1], sopratitolo:"Art. 1, c. 10 · i compiti", voci:COMPITI},
{id:"s17", tipo:"illustrata", tema:"chiaro", ill:"lente", sopratitolo:"Per verificare",
  titolo:"Accesso agli **atti**", punti:[
    {icona:"cartella", t:"atti e **informazioni** necessari"},
    {icona:"chat", t:"può chiedere **spiegazioni** a chi ha istruito", key:true}],
  etichette:{}},
{id:"s18", tipo:"icone", tema:"chiaro", attive:[0,1,2], sopratitolo:"Art. 1, c. 10 · i compiti", voci:COMPITI},
{id:"s19", tipo:"icone", tema:"chiaro", sopratitolo:"Art. 1, c. 10 · i compiti", voci:COMPITI},
{id:"s20", tipo:"illustrata", tema:"chiaro", ill:"calendario", sopratitolo:"Art. 1, c. 14",
  titolo:"Entro il **15 dicembre**", punti:[
    {icona:"documento", t:"la **relazione** annuale, su modello ANAC"},
    {icona:"occhio", t:"all'**OIV** e all'organo di indirizzo"},
    {icona:"spunta", t:"e **pubblicata** sul sito", key:true}],
  etichette:{}},
{id:"s21", tipo:"confronto", tema:"chiaro", sopratitolo:"Vigila anche su", col:[
  {h:"Gli incarichi", t:"inconferibilità e **incompatibilità**"},
  {h:"La trasparenza", t:"l'ultima lezione del **modulo 6**", key:true}]},
{id:"s22", tipo:"confronto", tema:"chiaro", sopratitolo:"E l'accesso civico", col:[
  {h:"Semplice", t:"è il **destinatario** delle richieste"},
  {h:"Generalizzato", t:"decide sul **riesame**", key:true}]},
{id:"s23", tipo:"catena", tema:"chiaro", sopratitolo:"Un esempio: la rotazione in farmacia", passi:[
  {t:"Il piano la prevede"},
  {t:"Dopo due anni", d:"nulla è cambiato"},
  {t:"L'RPCT", d:"verifica e segnala a direzione e OIV", key:true}]},
{id:"s24", tipo:"trappola", tema:"tenue", sopratitolo:"Occhio al distrattore", righe:[
  {sb:"La relazione annuale dell'RPCT va al Parlamento",
   ok:"Va all'OIV e all'organo di indirizzo, e si pubblica"}]},
{id:"s25", tipo:"titolo", tema:"profondo",
  titolo:"Propone, **verifica**,<br>segnala, **riferisce**."},

// --- 5 · responsabilità
{id:"s26", tipo:"illustrata", tema:"chiaro", ill:"martelletto", sopratitolo:"Art. 1, c. 12",
  titolo:"Un reato **accertato**", punti:[
    {icona:"giudice", t:"con sentenza **passata in giudicato**"},
    {icona:"persona", t:"l'RPCT ne **risponde**", key:true}],
  etichette:{}},
{id:"s27", tipo:"tre", tema:"chiaro", sopratitolo:"Per non aver prevenuto, non sul piano penale", box:[
  {n:"", t:"Dirigenziale"},
  {n:"", t:"Disciplinare"},
  {n:"", t:"Danno erariale", d:"e all'immagine", key:true}]},
{id:"s28", tipo:"scala", tema:"chiaro", sopratitolo:"D.Lgs. 165/2001, art. 21", gradini:[
  {t:"Mancato rinnovo", d:"dell'incarico"},
  {t:"Revoca", d:"nei casi più gravi", key:true}]},
{id:"s29", tipo:"tre", tema:"chiaro", sopratitolo:"La prova che libera: entrambe", box:[
  {n:"1", t:"Il piano", d:"prima del fatto, con le sue regole"},
  {n:"2", t:"La vigilanza", d:"su funzionamento e osservanza", key:true}]},
{id:"s30", tipo:"numero", tema:"chiaro", sopratitolo:"Art. 1, c. 13 · la sanzione minima",
  cifra:"1–6", testo:"**mesi** di sospensione, senza retribuzione"},
{id:"s31", tipo:"confronto", tema:"chiaro", sopratitolo:"Art. 1, c. 14 · il secondo caso", col:[
  {h:"Ripetute violazioni", t:"delle misure del **piano**"},
  {h:"Risponde per omesso controllo", t:"salvo provare **comunicazione** e **vigilanza**", key:true}]},
{id:"s32", tipo:"confronto", tema:"chiaro", sopratitolo:"Torniamo alla tangente", col:[
  {h:"Piano vero e controlli verificati", t:"l'RPCT **non risponde**"},
  {h:"Piano solo sulla carta", t:"l'RPCT **risponde**", key:true}]},
{id:"s33", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione", righe:[
  {sb:"Basta un'indagine o una condanna in primo grado",
   ok:"Serve un reato accertato con sentenza passata in giudicato"}]},
{id:"s34", tipo:"titolo", tema:"profondo",
  titolo:"Piano **prima** del fatto,<br>vigilanza **dopo**."},

// --- 6 · la rete
{id:"s35", tipo:"rete", tema:"chiaro", sopratitolo:"Non presidia da solo",
  centro:"RPCT", dcentro:"coordina", nodi:[
  {t:"Referenti", icona:"persona"}, {t:"Dirigenti", icona:"persone"},
  {t:"Dipendenti", icona:"persone"}, {t:"OIV", icona:"occhio", key:true}], inizio:-Math.PI/2, rx:520, ry:240},
{id:"s36", tipo:"tre", tema:"chiaro", sopratitolo:"D.Lgs. 165/2001, art. 16 · i dirigenti", box:[
  {n:"1", t:"Concorrono", d:"a definire le misure"},
  {n:"2", t:"Controllano", d:"il rispetto negli uffici"},
  {n:"3", t:"Monitorano", d:"le attività esposte", key:true}]},
{id:"s37", tipo:"catena", tema:"chiaro", sopratitolo:"La rotazione straordinaria", passi:[
  {t:"Procedimento penale o disciplinare", d:"per condotte corruttive"},
  {t:"Il dirigente", d:"provvedimento motivato"},
  {t:"Altro servizio", key:true}]},
{id:"s38", tipo:"norma", tema:"chiaro", etichetta:"L. 190/2012, art. 1, c. 14", sigla:"I dipendenti",
  testo:"La violazione delle misure del piano costituisce **illecito disciplinare**."},
{id:"s39", tipo:"illustrata", tema:"chiaro", ill:"bilancia", sopratitolo:"Art. 1, c. 8-bis · l'OIV",
  titolo:"Chiude il **cerchio**", punti:[
    {icona:"bilancia", t:"coerenza tra piano e **performance**"},
    {icona:"chat", t:"chiede documenti e **sente** i dipendenti"},
    {icona:"scudo", t:"riferisce all'**ANAC**", key:true}],
  etichette:{}},
{id:"s40", tipo:"catena", tema:"chiaro", sopratitolo:"Un esempio: i campioni gratuiti di farmaci", passi:[
  {t:"Il referente", d:"segnala il controllo mancato"},
  {t:"L'RPCT", d:"verifica"},
  {t:"Il dirigente", d:"interviene", key:true}]},
{id:"s41", tipo:"trappola", tema:"tenue", sopratitolo:"Occhio", righe:[
  {sb:"La prevenzione è compito del solo RPCT",
   ok:"Dirigenti e dipendenti hanno obblighi propri"}]},
{id:"s42", tipo:"titolo", tema:"profondo",
  titolo:"Un responsabile al **centro**,<br>una **rete** intorno."},

// --- 7 · le tre cose
{id:"s43", tipo:"memo", tema:"chiaro", attive:[0], sopratitolo:"Le tre cose da portare alla prova", voci:TRE_COSE},
{id:"s44", tipo:"memo", tema:"chiaro", attive:[0,1], sopratitolo:"Le tre cose da portare alla prova", voci:TRE_COSE},
{id:"s45", tipo:"memo", tema:"chiaro", attive:[0,1,2], sopratitolo:"Le tre cose da portare alla prova", voci:TRE_COSE},
{id:"s46", tipo:"trappola", tema:"tenue", sopratitolo:"L'ultimo distrattore", righe:[
  {sb:"L'RPCT adotta il piano",
   ok:"Lo propone; lo adotta l'organo di indirizzo"}]},

// --- 8 · chiusura
{id:"s47", tipo:"titolo", tema:"profondo",
  titolo:"Autonomo, con compiti **precisi**<br>e una responsabilità **vera**.",
  sotto:"Prossima lezione: conflitti, incarichi, codice di comportamento."},

{id:"s48", tipo:"copertina", tema:"profondo", modulo:"Prossima lezione",
  titolo:"Lezione 6b.4", sottotitolo:"Imparzialità: conflitti, incarichi, codice", ente:ENTE},
];
