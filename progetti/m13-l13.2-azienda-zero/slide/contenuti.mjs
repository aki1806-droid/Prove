// Contenuto delle 50 scene della lezione 13.2 — Azienda Zero.
// Le funzioni accessorie sono una griglia che si accende in tre tempi; gli
// acquisti una raggiera attorno alla CRAV; il circolo fra gare e
// dispositivo-vigilanza un ciclo; la natura dell'ente due tabelle e una griglia.

const ALTRE = (att) => ({tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, celle:[
  {t:"Sistemi informativi e **FSE**"}, {t:"**Formazione**"}, {t:"Affari **legali** e contenzioso"},
  {t:"**Rischio** e sinistri"}, {t:"**Epidemiologia** e registri"}, {t:"**Coordinamento** regionale"},
  {t:"Logistica e **investimenti**"}], attive:att});

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 13 · Il Servizio Socio Sanitario del Veneto",
  titolo:"Azienda Zero", sottotitolo:"13.2 · L'ente che governa e centralizza le funzioni della sanità veneta",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"frase", tema:"chiaro", sopratitolo:"Micro-lezione 2 di 8 · il bando che stai preparando",
  testo:"In testa al bando: **Azienda Zero**.",
  sotto:"Non è un ospedale. Non ha pazienti."},
{id:"s03", tipo:"tre", tema:"chiaro", sopratitolo:"Perché conoscerla", box:[
  {n:"1", t:"Governa e centralizza", d:"funzioni dell'intero sistema **veneto**", key:true},
  {n:"2", t:"Domanda d'orale", d:"**probabile**"},
  {n:"3", t:"Il concorso", d:"capire come **funziona**"}]},

{id:"s04", tipo:"frase", tema:"chiaro", sopratitolo:"Il nome completo",
  testo:"Azienda per il **governo della sanità** della Regione del Veneto",
  sotto:"**Azienda Zero** è il nome breve, quello in testa al bando."},
{id:"s05", tipo:"norma", tema:"chiaro", etichetta:"25 ottobre 2016 · istituisce Azienda Zero", sigla:"L.R. 19/2016",
  testo:"La stessa legge porta le ULSS **da 21 a 9** · lezione 13.1"},
{id:"s06", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"Un ente del Servizio Sanitario Regionale", celle:[
  {t:"Personalità giuridica di **diritto pubblico**", key:true}, {t:"Autonomia **amministrativa**"}, {t:"Autonomia **patrimoniale**"},
  {t:"Autonomia **organizzativa**"}, {t:"Autonomia **tecnica**"}, {t:"Autonomia **contabile**"}]},
{id:"s07", tipo:"timeline", tema:"chiaro", sopratitolo:"Coordinata dall'Area Sanità e Sociale della Regione", tappe:[
  {anno:2016, et:"L.R. 19 · istituita"},
  {anno:2017, et:"operativa · nascono le 9 nuove ULSS", key:true}]},

{id:"s08", tipo:"raggiera", tema:"chiaro", sopratitolo:"Perché «Zero» · un livello di base per tutte",
  centro:"Zero", raggi:[{t:"9 ULSS"},{t:"AOU"},{t:"AOUI"},{t:"IOV"}]},
{id:"s09", tipo:"confronto", tema:"chiaro", sopratitolo:"Funzioni tecniche e amministrative", col:[
  {h:"In ogni azienda", t:"ripetute, **meno efficienti**"},
  {h:"In Azienda Zero", t:"**accentrate** in un solo ente", key:true}]},
{id:"s10", tipo:"icone", tema:"chiaro", sopratitolo:"Gli obiettivi sono quattro", voci:[
  {icona:"bilancia", t:"Uniformità", d:"nel territorio regionale"},
  {icona:"euro", t:"Economie di scala", key:true},
  {icona:"cappello", t:"Competenze specializzate"},
  {icona:"ingranaggio", t:"Semplificazione"}]},
{id:"s11", tipo:"trappola", tema:"chiaro", sopratitolo:"La confusione più comune all'esame", righe:[
  {sb:"Azienda Zero cura i pazienti", ok:"**Non eroga prestazioni**: le aziende si concentrano sull'**assistenza**"}]},

{id:"s12", tipo:"norma", tema:"chiaro", etichetta:"La prima funzione", sigla:"GSA",
  testo:"Gestione Sanitaria Accentrata: la parte del **Fondo Sanitario Regionale** non assegnata alle aziende."},
{id:"s13", tipo:"norma", tema:"chiaro", etichetta:"La normativa nazionale sui bilanci sanitari", sigla:"D.Lgs. 118/2011",
  testo:"In Veneto funzioni e responsabilità della GSA sono attribuite ad **Azienda Zero**."},
{id:"s14", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"Una parte dei conti della sanità veneta passa da qui", celle:[
  {t:"La **GSA**", key:true}, {t:"La programmazione **economico-finanziaria**"}, {t:"Il **controllo**"}]},

{id:"s15", tipo:"frase", tema:"chiaro", sopratitolo:"La seconda funzione · gli acquisti centralizzati",
  testo:"**CRAV**: Centrale Regionale Acquisti per la Regione del Veneto",
  sotto:"Trasferita ad **Azienda Zero**."},
{id:"s16", tipo:"raggiera", tema:"chiaro", sopratitolo:"Soggetto aggregatore · gare regionali",
  centro:"CRAV", raggi:[{t:"Farmaci"},{t:"Dispositivi"},{t:"Tecnologie"},{t:"Servizi"}]},
{id:"s17", tipo:"confronto", tema:"chiaro", sopratitolo:"Perfino le ambulanze del 118 · gli effetti", col:[
  {h:"I prezzi", t:"più **bassi**: si compra per tutta la regione"},
  {h:"I prodotti", t:"**standardizzati**", key:true}]},
{id:"s18", tipo:"catena", tema:"chiaro", sopratitolo:"Il catetere, la medicazione, la pompa", passi:[
  {t:"Una **gara regionale**"}, {t:"Il dispositivo in **reparto**"}, {t:"La tua **segnalazione** serve a tutta la regione", key:true}]},

{id:"s19", tipo:"frase", tema:"chiaro", sopratitolo:"La terza funzione · ti riguarda direttamente",
  testo:"Il **reclutamento** del personale",
  sotto:"Procedure concorsuali e di selezione per conto delle aziende del SSR."},
{id:"s20", tipo:"tre", tema:"chiaro", sopratitolo:"Concorsi unificati, cioè aggregati · i profili molto richiesti", box:[
  {n:"1", t:"Infermieri", key:true}, {n:"2", t:"OSS", d:"operatori socio-sanitari"}, {n:"3", t:"Altri profili"}]},
{id:"s21", tipo:"confronto", tema:"chiaro", sopratitolo:"Un unico bando, un'unica procedura", col:[
  {h:"Invece di", t:"tanti **concorsi aziendali**"},
  {h:"Il concorso unificato", t:"**graduatorie** usate dalle aziende secondo le regole del bando", key:true}],
  sotto:"Uniformità e tempi più rapidi · è il caso di **questo concorso**."},

{id:"s22", tipo:"griglia", tema:"chiaro", colonne:4, spunta:true, sopratitolo:"Per te, in pratica · primo: leggi con attenzione il bando", celle:[
  {t:"I **requisiti**"}, {t:"Le **prove**"}, {t:"I **punteggi**"}, {t:"Le **soglie**", key:true}]},
{id:"s23", tipo:"confronto", tema:"chiaro", sopratitolo:"Secondo · verifica", col:[
  {h:"La scelta", t:"dell'**azienda** o dell'**ambito** di assegnazione"},
  {h:"La graduatoria", t:"come viene **usata**"}],
  sotto:"Il riferimento è sempre il **bando vigente**."},
{id:"s24", tipo:"frase", tema:"chiaro", sopratitolo:"Terzo · le comunicazioni ufficiali",
  testo:"Il **sito di Azienda Zero**: l'unico canale valido per date e convocazioni."},
{id:"s25", tipo:"confronto", tema:"chiaro", sopratitolo:"Un dettaglio che all'orale fa la differenza", col:[
  {h:"Azienda Zero", t:"gestisce la **selezione**"},
  {h:"L'azienda che ti assume", t:"è il tuo **datore di lavoro**", key:true}]},

{id:"s26", sopratitolo:"Le altre funzioni, attribuite nel tempo · compreso il FSE regionale", ...ALTRE([0])},
{id:"s27", tipo:"frase", tema:"chiaro", sopratitolo:"La sanità digitale · lezione 13.7",
  testo:"**Sanità km zero**: portale e app della Regione, gestiti con Azienda Zero."},
{id:"s28", sopratitolo:"Affari legali: patrocinio e difesa delle aziende · rischio e sinistri", ...ALTRE([0,1,2,3])},
{id:"s29", tipo:"tre", tema:"chiaro", sopratitolo:"Epidemiologia e registri · lezione 13.6", box:[
  {n:"1", t:"Sistema epidemiologico regionale"}, {n:"2", t:"Registro Tumori del Veneto", key:true}, {n:"3", t:"Registri di patologia"}]},
{id:"s30", sopratitolo:"Coordinamento regionale · le funzioni le aggiorna la Giunta", ...ALTRE([0,1,2,3,4,5,6])},

{id:"s31", tipo:"tre", tema:"chiaro", sopratitolo:"La direzione", box:[
  {n:"1", t:"Direttore generale", d:"nominato dalla **Giunta regionale**", key:true},
  {n:"2", t:"Direttore amministrativo", d:"lo affianca"},
  {n:"3", t:"Direttore sanitario", d:"lo affianca"}]},
{id:"s32", tipo:"norma", tema:"chiaro", etichetta:"L'organizzazione interna · lezione 12.3", sigla:"Atto aziendale",
  testo:"Le **unità operative complesse** e gli **uffici**, come per tutte le aziende."},
{id:"s33", tipo:"catena", tema:"chiaro", sopratitolo:"Ogni anno · collegati alla programmazione socio-sanitaria", passi:[
  {t:"La **Giunta regionale**", d:"approva gli indirizzi"},
  {t:"**Azienda Zero**", d:"supporto tecnico e gestione", key:true}]},

{id:"s34", tipo:"venn", tema:"chiaro", sopratitolo:"Un modello osservato da altre Regioni",
  sx:{t:"Veneto", d:"**Azienda Zero**"},
  dx:{t:"Piemonte", d:"**Azienda Zero**"},
  centro:"un ente di **governance centralizzato**"},
{id:"s35", tipo:"confronto", tema:"chiaro", sopratitolo:"All'orale · spirito critico sulla centralizzazione", col:[
  {h:"I vantaggi", t:"**uniformità** ed **economie**"},
  {h:"Le sfide", t:"la **distanza** dai territori, i **tempi** decisionali", key:true}]},
{id:"s36", tipo:"titolo", tema:"chiaro",
  titolo:"Un giudizio **equilibrato**<br>vale più di un elogio.",
  sotto:"Vantaggi e sfide: ti distingue da chi ha imparato solo un elenco."},

{id:"s37", tipo:"frase", tema:"chiaro", sopratitolo:"Il caso d'esame · la domanda tipo",
  testo:"«Che cos'è **Azienda Zero** e quali **funzioni** svolge?»",
  sotto:"Prima la natura dell'ente, poi le funzioni."},
{id:"s38", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"La risposta · la natura dell'ente", celle:[
  {t:"Ente di **governance** della sanità veneta", key:true}, {t:"Istituito dalla **L.R. 19/2016**"},
  {t:"Personalità giuridica di **diritto pubblico**"}, {t:"**Non** eroga prestazioni ai pazienti"}]},
{id:"s39", tipo:"tre", tema:"chiaro", sopratitolo:"Funzioni centralizzate per tutte le aziende", box:[
  {n:"1", t:"GSA", d:"gestione sanitaria **accentrata**"},
  {n:"2", t:"Acquisti", d:"con la **CRAV**"},
  {n:"3", t:"Reclutamento", d:"**concorsi** unificati", key:true}]},
{id:"s40", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"E poi · l'aggancio personale: l'ente che gestisce questo concorso", celle:[
  {t:"Sistemi informativi e **FSE**"}, {t:"Affari **legali**"}, {t:"**Formazione**"}, {t:"Funzioni **epidemiologiche**"}]},

{id:"s41", tipo:"ciclo", tema:"chiaro", sopratitolo:"Il circolo delle gare", centro:"Gare", passi:[
  {t:"Gara regionale", d:"dispositivi e farmaci"}, {t:"In reparto", d:"li usi ogni giorno"},
  {t:"Segnalazione", d:"dispositivo-vigilanza", key:true}, {t:"Gara successiva", d:"migliorata"}]},
{id:"s42", tipo:"icone", tema:"chiaro", sopratitolo:"Il legame con il lavoro quotidiano", voci:[
  {icona:"documento", t:"Fascicolo Sanitario Elettronico", d:"continuità delle informazioni", key:true},
  {icona:"cappello", t:"Formazione regionale", d:"anche da Azienda Zero"}]},
{id:"s43", tipo:"catena", tema:"chiaro", sopratitolo:"Senza dati, la programmazione va alla cieca", passi:[
  {t:"I **registri**"}, {t:"I dati **epidemiologici**"}, {t:"La **programmazione**", key:true}]},

{id:"s44", tipo:"tabella", tema:"chiaro", sopratitolo:"La tabella · l'ente", colonne:["34%","66%"],
  intestazioni:["Che cosa", "Da ricordare"], righe:[
  ["Nome", "Azienda per il **governo della sanità** della Regione del Veneto"],
  ["Legge istitutiva", "**L.R. 19/2016**"], ["Operativa", "dal **2017**"]], chiave:[1]},
{id:"s45", tipo:"tabella", tema:"chiaro", sopratitolo:"La tabella · natura e governo", colonne:["38%","62%"],
  intestazioni:["Che cosa", "Da ricordare"], righe:[
  ["Natura", "ente del SSR, **diritto pubblico**"], ["Coordinamento", "**Area Sanità e Sociale**"],
  ["Direttore generale", "nominato dalla **Giunta**"], ["Attività", "**indirizzi annuali**"]], chiave:[2]},
{id:"s46", tipo:"griglia", tema:"chiaro", colonne:4, spunta:true, sopratitolo:"La tabella · le funzioni", celle:[
  {t:"**GSA**", key:true}, {t:"**CRAV** · soggetto aggregatore"}, {t:"**Concorsi** unificati"}, {t:"Sistemi informativi e **FSE**"},
  {t:"**Formazione**"}, {t:"Affari **legali**"}, {t:"**Rischio** e sinistri"}, {t:"**Epidemiologia** e registri"}]},

{id:"s47", tipo:"titolo", tema:"profondo",
  titolo:"Azienda Zero<br>**non cura** i pazienti.",
  sotto:"Rende possibile che le altre aziende li curino meglio."},

{id:"s48", tipo:"raggiera", tema:"chiaro", sopratitolo:"Prossima lezione · la rete ospedaliera veneta",
  centro:"Hub", raggi:[{t:"Spoke"},{t:"Spoke"},{t:"Spoke"},{t:"Spoke"},{t:"Spoke"}]},
{id:"s49", tipo:"tre", tema:"chiaro", sopratitolo:"Il SUEM 118 e le reti tempo-dipendenti", box:[
  {n:"Rete", t:"Ictus"}, {n:"Rete", t:"Infarto", key:true}, {n:"Rete", t:"Trauma"}, {n:"Reti", t:"Altre patologie"}]},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"13.3<br>L'ospedale in Veneto<br>e le reti tempo-dipendenti", sottotitolo:"Rete ospedaliera, hub and spoke, SUEM 118",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
