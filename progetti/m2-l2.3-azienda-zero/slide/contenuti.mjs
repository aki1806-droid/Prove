// Contenuto delle 48 scene della lezione 2.3. *accento*  **accento in semibold**
//
// Corso «Progressione verticale · Comparto Sanità», Modulo 2. Azienda Zero e la
// governance regionale: L.R. Veneto 19/2016, artt. 1-11 (nome, natura, funzioni
// dell'art. 2 commi 1 e 2, organi, personale, Area Sanità e Sociale, Comitato dei
// direttori generali); lettera f bis aggiunta dalla L.R. 48/2018, art. 17.

const ENTE = "CISL FP Padova Rovigo · Progressione verticale · Comparto Sanità";

const GRUPPI = [
 {icona:"euro",        t:"**I conti**", d:"GSA, cassa, bilancio consolidato, indirizzi contabili"},
 {icona:"ingranaggio", t:"**I servizi tecnici**", d:"undici attività per tutto il sistema"},
 {icona:"chat",        t:"**I cittadini**", d:"coordinamento degli URP"},
];

const TECNICHE = [
 {t:"**Acquisti** centralizzati"}, {t:"**Concorsi** del comparto"},
 {t:"Formazione manageriale e **rischio clinico**"}, {t:"Accreditamento **ECM**"},
 {t:"Modello **assicurativo**"}, {t:"Informatica e **flussi di dati**"},
 {t:"**Autorizzazione** all'esercizio"}, {t:"**Contenzioso** del lavoro e sanitario"},
 {t:"**Logistica**"}, {t:"**HTA**"}, {t:"**Fascicolo** sanitario elettronico"},
];

const ORGANI = {
 colonne:["40%","30%","30%"],
 intestazioni:["", "Azienda Zero", "ULSS"],
 righe:[
  ["Direttore generale",    "si:sì", "si:sì"],
  ["Collegio sindacale",    "si:sì", "si:sì"],
  ["Collegio di direzione", "no:no", "si:sì"],
 ],
};

const TRE_COSE = [
 "**L.R. 19/2016**: Azienda Zero è un **ente del SSR** con personalità giuridica di diritto pubblico",
 "**Art. 2**: funzioni **proprie** al comma 1 (GSA, consolidato, acquisti, concorsi) · **attribuibili** dalla Giunta al comma 2",
 "**Organi**: direttore generale e collegio sindacale · il DG lo nomina il **Presidente della Giunta**",
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 2 · Il sistema sanitario regionale del Veneto",
  titolo:"Azienda Zero<br>e la governance regionale", sottotitolo:"Lezione 2.3", ente:ENTE},

// --- 1 · aggancio
{id:"s02", tipo:"frase", tema:"chiaro", sopratitolo:"Ti riguarda anche se non ci sei mai entrato",
  testo:"Il concorso che ti ha assunto, probabilmente, **l'ha gestito lei**."},
{id:"s03", tipo:"griglia", tema:"chiaro", colonne:3, sopratitolo:"Un'azienda senza", celle:[
  {t:"ospedali", no:true}, {t:"ambulatori", no:true}, {t:"pazienti", no:true},
  {t:"ma governa i **conti**"}, {t:"gli **acquisti**"}, {t:"i **sistemi informativi**"}]},
{id:"s04", tipo:"titolo", tema:"profondo",
  titolo:"**Metà del titolo**<br>della legge 19.",
  sotto:"E la domanda più probabile del modulo."},

// --- 2 · rotta
{id:"s05", tipo:"elenco", tema:"chiaro", numerato:true, grandi:true, sopratitolo:"Quattro passaggi", voci:[
  {t:"La **legge** e il **nome**"},
  {t:"Le **funzioni**: proprie e attribuibili"},
  {t:"Gli **organi**"},
  {t:"La **governance** regionale"}]},

// --- 3 · la legge e il nome
{id:"s06", tipo:"confronto", tema:"chiaro", sopratitolo:"L.R. 19 del 25 ottobre 2016: due parti", col:[
  {h:"Titolo I · artt. 1-13", t:"**Azienda Zero**", grande:true},
  {h:"Titolo III", t:"le **ULSS**, da 21 a 9", grande:true}]},
{id:"s07", tipo:"norma", tema:"chiaro", etichetta:"Il nome per esteso, nel titolo della legge", sigla:"Azienda Zero",
  testo:"Azienda per il **governo della sanità** della Regione del Veneto."},
{id:"s08", tipo:"citazione", tema:"chiaro",
  testo:"Azienda per la *razionalizzazione*, l'*integrazione* e l'*efficientamento* dei servizi sanitari, socio-sanitari e tecnico-amministrativi.",
  fonte:"L.R. 19/2016, articolo 1"},
{id:"s09", tipo:"tre", tema:"chiaro", sopratitolo:"Tre parole contro la frammentazione", box:[
  {t:"Razionalizzare"}, {t:"Integrare"}, {t:"Rendere efficiente"}]},
{id:"s10", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Ente del servizio sanitario regionale · personalità giuridica di diritto pubblico", celle:[
  {t:"autonomia **amministrativa**"}, {t:"**patrimoniale**"},
  {t:"**organizzativa**"}, {t:"**tecnica**"},
  {t:"**gestionale**"}, {t:"**contabile**"}]},
{id:"s11", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione a una trappola", righe:[
  {sb:"Un ufficio della Regione, o una decima ULSS",
   ok:"Un ente autonomo del SSR, con compiti di governo e di servizio"}]},

// --- 4 · le funzioni proprie
{id:"s12", tipo:"icone", tema:"chiaro", sopratitolo:"Art. 2, comma 1 · le funzioni proprie", voci:GRUPPI},
{id:"s13", tipo:"norma", tema:"chiaro", etichetta:"D.Lgs. 118/2011 · art. 2, lettera a)", sigla:"GSA",
  testo:"**Gestione Sanitaria Accentrata**: la parte del fondo che la Regione gestisce direttamente."},
{id:"s14", tipo:"catena", tema:"chiaro", sopratitolo:"Il primo gruppo: i conti", passi:[
  {t:"Flussi di cassa"}, {t:"Scritture della GSA"},
  {t:"Bilancio della GSA", d:"preventivo e consuntivo"},
  {t:"Bilancio consolidato", d:"di tutto il SSR", key:true}]},
{id:"s15", tipo:"frase", tema:"chiaro", sopratitolo:"Art. 2, lettera f)",
  testo:"Gli **indirizzi contabili** alle ULSS e agli altri enti.",
  sotto:"Un solo modo di tenere i conti, per tutti."},
{id:"s16", tipo:"icone", tema:"chiaro", attive:[1], sopratitolo:"Il secondo gruppo · art. 2, lettera g)", voci:GRUPPI},
{id:"s17", tipo:"norma", tema:"chiaro", etichetta:"Lettera g), numero 1 · previa valutazione della CRITE", sigla:"Acquisti",
  testo:"**Centralizzati**, nel rispetto di qualità, economicità e **specificità clinica**."},
{id:"s18", tipo:"sostituzione", tema:"chiaro", sopratitolo:"Nel diritto degli appalti: il soggetto aggregatore",
  da:{h:"Prima", t:"una gara per ogni azienda"},
  a:{h:"Con Azienda Zero", t:"**una gara sola** per tutte"}},
{id:"s19", tipo:"norma", tema:"chiaro", etichetta:"Lettera g), numero 2 · regolamento della Giunta", sigla:"Concorsi",
  testo:"Le selezioni del **comparto sanità**: una graduatoria che serve **più aziende**."},
{id:"s20", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, attive:[0,1,2,3,4], sopratitolo:"Le undici attività tecnico-specialistiche", celle:TECNICHE},
{id:"s21", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, attive:[0,1,2,3,4,5,6,7], sopratitolo:"Le undici attività tecnico-specialistiche", celle:TECNICHE},
{id:"s22", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Le undici attività tecnico-specialistiche", celle:TECNICHE},
{id:"s23", tipo:"icone", tema:"chiaro", attive:[2], sopratitolo:"Il terzo gruppo · art. 2, lettera h)", voci:GRUPPI},
{id:"s24", tipo:"titolo", tema:"profondo",
  titolo:"I **conti** del sistema.<br>I **servizi** comuni.<br>Il rapporto con i **cittadini**."},

// --- 5 · le funzioni attribuibili
{id:"s25", tipo:"confronto", tema:"chiaro", sopratitolo:"L'articolo 2, due commi", col:[
  {h:"Comma 1", t:"funzioni **proprie**: le dà la legge", grande:true},
  {h:"Comma 2", t:"funzioni **attribuibili**: con provvedimenti della Giunta", grande:true}]},
{id:"s26", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Comma 2 · il supporto al governo", celle:[
  {t:"analisi e proposte per la **programmazione**"},
  {t:"supporto alla Giunta sugli **obiettivi di governo**"},
  {t:"supporto agli **obiettivi dei direttori generali**"}]},
{id:"s27", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Comma 2 · e ancora", celle:[
  {t:"proposta dei **costi standard**"}, {t:"**flussi** informativi"},
  {t:"**auditing** e controllo interno"}, {t:"**Sistema Epidemiologico Regionale** e registri"}]},
{id:"s28", tipo:"norma", tema:"chiaro", etichetta:"L.R. 48/2018, art. 17 · lettera f bis)", sigla:"Sanità integrativa",
  testo:"Il **monitoraggio e la vigilanza** sulle forme di sanità integrativa."},
{id:"s29", tipo:"trappola", tema:"tenue", sopratitolo:"La distinzione da quiz", righe:[
  {sb:"Tutte le funzioni dell'art. 2 spettano ad Azienda Zero per legge",
   ok:"Quelle del comma 2 servono i provvedimenti della Giunta"}]},

// --- 6 · gli organi
{id:"s30", tipo:"tre", tema:"chiaro", sopratitolo:"Art. 4 · gli organi sono due", box:[
  {n:"1", t:"Direttore generale"}, {n:"2", t:"Collegio sindacale"}, {t:"— e basta", d:"niente collegio di direzione"}]},
{id:"s31", tipo:"scadenza", tema:"chiaro", sopratitolo:"Art. 5 · il direttore generale, nominato dal Presidente della Giunta",
  max:6, banda:[0,5], inizio:"nomina", fine:"",
  tappe:[{a:5, v:"5 anni", t:"durata **massima** del contratto di diritto privato", key:true}]},
{id:"s32", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Il direttore generale", celle:[
  {t:"**legale rappresentante**"}, {t:"responsabile della **GSA**"},
  {t:"nomina direttore **sanitario** e **amministrativo**"}, {t:"adotta l'**atto aziendale**"}]},
{id:"s33", tipo:"tre", tema:"chiaro", sopratitolo:"Art. 6 · il collegio sindacale: tre membri, designati da", box:[
  {n:"1", t:"Presidente della Giunta regionale"}, {n:"2", t:"Ministro dell'economia e delle finanze"}, {n:"3", t:"Ministro della salute"}]},
{id:"s34", tipo:"confronto", tema:"chiaro", sopratitolo:"Il collegio, oltre ai controlli consueti", col:[
  {h:"Terzo certificatore", t:"dei conti della **GSA**"},
  {h:"Ogni tre mesi", t:"accerta la **consistenza di cassa**"}]},
{id:"s35", tipo:"tabella", tema:"chiaro", sopratitolo:"La trappola classica: il confronto con le ULSS", ...ORGANI, chiave:[2]},
{id:"s36", tipo:"confronto", tema:"chiaro", sopratitolo:"Artt. 7 e 9", col:[
  {h:"Il personale", t:"soprattutto per **mobilità**, con il contratto del SSN"},
  {h:"Il bilancio", t:"tenuta all'**equilibrio** economico e finanziario"}]},

// --- 7 · la governance regionale
{id:"s37", tipo:"norma", tema:"chiaro", etichetta:"Art. 11 · guidata da un direttore generale", sigla:"Area Sanità e Sociale",
  testo:"La struttura della **Regione** che governa Azienda Zero."},
{id:"s38", tipo:"confronto", tema:"chiaro", sopratitolo:"Art. 2, commi 3 e 10", col:[
  {h:"Coordinamento", t:"del direttore generale dell'**Area**"},
  {h:"Vigilanza e controllo", t:"della **Giunta**, per il tramite dell'Area"}]},
{id:"s39", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"All'Area spetta anche", celle:[
  {t:"il **visto di congruità** sui bilanci della GSA"},
  {t:"il visto sul **consolidato** del sistema"},
  {t:"la **presidenza della CRITE**"}]},
{id:"s40", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Art. 3 · il Comitato dei direttori generali", celle:[
  {t:"DG delle **ULSS**"}, {t:"DG delle **aziende ospedaliere**"}, {t:"DG dello **IOV**"},
  {t:"DG di **Azienda Zero**"}, {t:"DG dell'**Area**: presiede"}]},
{id:"s41", tipo:"catena", tema:"chiaro", sopratitolo:"Il Comitato", passi:[
  {t:"Determina indirizzi e fabbisogni"},
  {t:"Parere obbligatorio", d:"sugli atti delle attività tecniche"},
  {t:"Chi usa i servizi decide cosa serve", key:true}]},
{id:"s42", tipo:"scala", tema:"chiaro", sopratitolo:"La catena della governance", gradini:[
  {t:"Il Comitato dei DG", d:"dice di che cosa c'è bisogno"},
  {t:"Azienda Zero", d:"esegue per tutti"},
  {t:"Area Sanità e Sociale", d:"coordina e vigila"},
  {t:"Giunta regionale", d:"indirizza", key:true}]},

// --- 8 · le tre cose
{id:"s43", tipo:"memo", tema:"chiaro", attive:[0], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s44", tipo:"memo", tema:"chiaro", attive:[0,1], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s45", tipo:"memo", tema:"chiaro", attive:[0,1,2], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s46", tipo:"trappola", tema:"tenue", sopratitolo:"L'ultimo distrattore", righe:[
  {sb:"Il Comitato dei DG lo presiede il direttore di Azienda Zero",
   ok:"Lo presiede il direttore generale dell'Area Sanità e Sociale"}]},

// --- 9 · chiusura
{id:"s47", tipo:"titolo", tema:"profondo",
  titolo:"Un'azienda **senza pazienti**<br>che lavora per tutte le altre.",
  sotto:"Prossima lezione: la nuova geografia delle nove ULSS."},

{id:"s48", tipo:"copertina", tema:"profondo", modulo:"Prossima lezione",
  titolo:"Lezione 2.4", sottotitolo:"La nuova geografia sanitaria", ente:ENTE},
];
