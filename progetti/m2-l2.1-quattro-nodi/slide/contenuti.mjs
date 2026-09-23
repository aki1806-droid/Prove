// Contenuto delle 49 scene della lezione 2.1. *accento*  **accento in semibold**
//
// Corso «Progressione verticale · Comparto Sanità», Modulo 2. I quattro nodi
// che portano alla L.R. Veneto 19/2016: frammentazione, ospedale al centro,
// integrazione socio-sanitaria incompiuta, sostenibilità. Fonti: testo della
// L.R. 19/2016 (artt. 14, 15, 16, 26, 28), PSSR 2019-2023.

const ENTE = "CISL FP Padova Rovigo · Progressione verticale · Comparto Sanità";

const NODI = [
 {icona:"cartella", t:"**Frammentazione**", d:"troppe aziende piccole"},
 {icona:"ospedale", t:"**Ospedale al centro**", d:"la risposta a tutto"},
 {icona:"cuoremano", t:"**Integrazione incompiuta**", d:"sanitario e sociale separati"},
 {icona:"euro", t:"**Sostenibilità**", d:"domanda che cresce, risorse ferme"},
];

const RISPOSTE = {
 colonne:["34%","66%"],
 intestazioni:["Il nodo", "La risposta della L.R. 19/2016"],
 righe:[
  ["Frammentazione",          "ULSS da **21 a 9** · **Azienda Zero**"],
  ["Ospedale al centro",      "ospedali di comunità **+15%** · medicine di gruppo integrate"],
  ["Integrazione incompiuta", "le vecchie ULSS diventano **distretti** · Comitato dei Sindaci"],
  ["Sostenibilità",           "regia unica · **Osservatorio** · verifica dopo tre anni"],
 ],
};

const TRE_COSE = [
 "**L.R. 19 del 25 ottobre 2016**: istituisce **Azienda Zero** e ridisegna le ULSS, da 21 a 9",
 "Il nuovo assetto delle ULSS decorre dal **1° gennaio 2017**",
 "I criteri stanno all'**art. 14**: equità, dimensioni ottimali, trasparenza e partecipazione, sostenibilità",
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 2 · Il sistema sanitario regionale del Veneto",
  titolo:"I quattro nodi<br>della riforma", sottotitolo:"Lezione 2.1", ente:ENTE},

// --- 1 · aggancio
{id:"s02", tipo:"barre", tema:"chiaro", sopratitolo:"Le aziende ULSS del Veneto",
  unita:"", max:24, barre:[
  {et:"31 dicembre 2016", v:21, lab:"21"},
  {et:"1° gennaio 2017", v:9, lab:"9", colore:"#D70328", nota:"12 aziende soppresse in una notte"}]},
{id:"s03", tipo:"norma", tema:"chiaro", etichetta:"Legge regionale del Veneto 19/2016", sigla:"L.R. 19/2016",
  testo:"Istituisce **Azienda Zero** e ridisegna le **ULSS**."},
{id:"s04", tipo:"titolo", tema:"profondo",
  titolo:"Una riforma nasce<br>da **quattro nodi**.",
  sotto:"Capisci i nodi, e capisci ogni articolo."},

// --- 2 · rotta
{id:"s05", tipo:"elenco", tema:"chiaro", numerato:true, grandi:true, sopratitolo:"Il percorso", voci:[
  {t:"Il Veneto **prima del 2016**"},
  {t:"I **quattro nodi**, uno alla volta"},
  {t:"La **risposta** della legge"}]},

// --- 3 · il Veneto prima del 2016
{id:"s06", tipo:"norma", tema:"chiaro", etichetta:"Il Veneto recepisce il D.Lgs. 502", sigla:"L.R. 56/1994",
  testo:"Crea le **aziende ULSS** e le due **aziende ospedaliere**, Padova e Verona."},
{id:"s07", tipo:"confronto", tema:"chiaro", sopratitolo:"Le due leggi del 1994", col:[
  {h:"L.R. 56/1994", t:"il **riordino**: aziende, organi, territorio", grande:true},
  {h:"L.R. 55/1994", t:"**programmazione**, bilancio, contabilità", grande:true}]},
{id:"s08", tipo:"frase", tema:"chiaro", sopratitolo:"Nel Veneto non si dice ASL",
  testo:"**ULSS**: unità locale *socio*-sanitaria.",
  sotto:"L'azienda gestisce anche il sociale delegato dai Comuni."},
{id:"s09", tipo:"tre", tema:"chiaro", sopratitolo:"La mappa per oltre vent'anni", box:[
  {n:"21", t:"Aziende ULSS"}, {n:"2", t:"Aziende ospedaliere"}, {n:"1", t:"Istituto Oncologico Veneto"}]},
{id:"s10", tipo:"frase", tema:"chiaro", sopratitolo:"Un sistema che funziona",
  testo:"Tasso di ospedalizzazione **tra i più bassi d'Italia**.",
  sotto:"Ma dentro la mappa si accumulano quattro problemi."},

// --- 4 · frammentazione
{id:"s11", tipo:"icone", tema:"chiaro", attive:[0], sopratitolo:"Primo nodo", voci:NODI},
{id:"s12", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Ogni azienda, per conto suo", celle:[
  {t:"la sua **direzione**"}, {t:"i suoi **uffici acquisti**"},
  {t:"il suo **personale amministrativo**"}, {t:"i suoi **regolamenti**"}]},
{id:"s13", tipo:"tre", tema:"chiaro", sopratitolo:"Lo stesso lavoro, ventuno volte", box:[
  {n:"21", t:"gare per lo stesso farmaco"}, {n:"21", t:"prezzi diversi"}, {n:"21", t:"concorsi per gli stessi infermieri"}]},
{id:"s14", tipo:"confronto", tema:"chiaro", sopratitolo:"Il risultato è doppio", col:[
  {h:"Per il sistema", t:"**costi** amministrativi moltiplicati"},
  {h:"Per il cittadino", t:"stesso bisogno, **risposte diverse** a seconda di dove abiti"}]},
{id:"s15", tipo:"norma", tema:"chiaro", etichetta:"L.R. 19/2016 · art. 14, criterio b)", sigla:"Dimensioni ottimali",
  testo:"Migliorare **qualità ed efficienza**, razionalizzare e **ridurre i costi**."},
{id:"s16", tipo:"titolo", tema:"profondo",
  titolo:"Troppe aziende piccole,<br>che fanno **ognuna da sé**<br>le stesse cose."},

// --- 5 · ospedale al centro
{id:"s17", tipo:"icone", tema:"chiaro", attive:[0,1], sopratitolo:"Secondo nodo", voci:NODI},
{id:"s18", tipo:"catena", tema:"chiaro", sopratitolo:"Un anziano con scompenso cardiaco", passi:[
  {t:"Peggiora a casa"}, {t:"Nessuno lo segue"}, {t:"Pronto soccorso"},
  {t:"Ricovero", d:"e ogni volta più fragile", key:true}]},
{id:"s19", tipo:"impila", tema:"chiaro", sopratitolo:"Posti letto ogni mille abitanti · L.R. 23/2012",
  testa:"3,5 per mille", unita:"", segmenti:[
  {v:3, t:"Acuti"}, {v:0.5, t:"Riabilitazione", chiaro:true, colore:"#A8CDBB"}]},
{id:"s20", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"Meno letti funzionano solo se cresce il territorio", celle:[
  {t:"medici di famiglia **organizzati**"}, {t:"cure **a domicilio**"},
  {t:"strutture **intermedie** tra casa e ospedale"}]},
{id:"s21", tipo:"trappola", tema:"tenue", sopratitolo:"Non leggerlo al contrario", righe:[
  {sb:"Superare l'ospedale al centro vuol dire chiudere gli ospedali",
   ok:"L'ospedale per la fase acuta, il resto più vicino a casa"}]},
{id:"s22", tipo:"titolo", tema:"profondo",
  titolo:"L'ospedale risponde a tutto,<br>perché **fuori non c'è risposta**."},

// --- 6 · integrazione incompiuta
{id:"s23", tipo:"icone", tema:"chiaro", attive:[0,1,2], sopratitolo:"Terzo nodo", voci:NODI},
{id:"s24", tipo:"confronto", tema:"chiaro", sopratitolo:"Sulla carta e in pratica", col:[
  {h:"Sulla carta", t:"un **modello integrato**: sanitario e sociale insieme"},
  {h:"In pratica", t:"bilanci separati, operatori diversi, **percorsi che non si parlano**"}]},
{id:"s25", tipo:"venn", tema:"chiaro",
  sx:{t:"Sanitario", d:"il **medico**,<br>l'**infermiere**"},
  dx:{t:"Sociale", d:"l'**assistente**<br>**sociale**"},
  centro:"la **persona fragile**: non autosufficiente, disabile, cronica"},
{id:"s26", tipo:"catena", tema:"chiaro", sopratitolo:"Gli strumenti c'erano", passi:[
  {t:"Conferenza dei Sindaci"},
  {t:"Piano di Zona", d:"i servizi sociali a integrazione socio-sanitaria"},
  {t:"Ma con 21 aziende la regia resta debole", key:true}]},
{id:"s27", tipo:"numero", tema:"chiaro", sopratitolo:"Il peso della cronicità · dati OMS",
  cifra:"75%", testo:"della **spesa sanitaria** dipende da patologie croniche"},
{id:"s28", tipo:"titolo", tema:"profondo",
  titolo:"Il modello integrato c'è,<br>ma **non arriva alla persona**."},

// --- 7 · sostenibilità
{id:"s29", tipo:"numero", tema:"chiaro", sopratitolo:"Quarto nodo: la popolazione invecchia",
  cifra:"22%", testo:"dei residenti veneti ha **più di 64 anni**"},
{id:"s30", tipo:"barre", tema:"chiaro", sopratitolo:"Anziani e ragazzi, nel Veneto",
  unita:"", max:2, barre:[
  {et:"Sotto i 15 anni", v:1, lab:"1"},
  {et:"Oltre i 64 anni", v:1.6, lab:"1,6", colore:"#D70328"}]},
{id:"s31", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Più anziani vuol dire più", celle:[
  {t:"malattie **croniche**"}, {t:"**farmaci**"}, {t:"assistenza **a lungo termine**"}]},
{id:"s32", tipo:"frase", tema:"chiaro", sopratitolo:"Le risorse, invece, no",
  testo:"**Costi standard**: chi spende oltre copre con risorse proprie.",
  sotto:"È il meccanismo della lezione 1.6."},
{id:"s33", tipo:"norma", tema:"chiaro", etichetta:"L.R. 19/2016 · art. 14, criterio d)", sigla:"Sostenibilità",
  testo:"Garantire la **sostenibilità economica** del sistema sanitario regionale."},
{id:"s34", tipo:"titolo", tema:"profondo",
  titolo:"Una domanda **che cresce**,<br>dentro risorse **che non crescono**."},

// --- 8 · la risposta
{id:"s35", tipo:"icone", tema:"chiaro", attive:[0,1,2,3], sopratitolo:"I quattro nodi", voci:NODI},
{id:"s36", tipo:"confronto", tema:"chiaro", sopratitolo:"Contro la frammentazione, due mosse", col:[
  {h:"Meno aziende", t:"le ULSS da **21 a 9**", grande:true},
  {h:"Un'azienda nuova", t:"**Azienda Zero**: acquisti, concorsi, contabilità, una volta per tutti", grande:true}]},
{id:"s37", tipo:"numero", tema:"chiaro", sopratitolo:"Contro l'ospedale al centro · art. 14, comma 5",
  cifra:"+15%", testo:"posti letto negli **ospedali di comunità** entro il 2017"},
{id:"s38", tipo:"barre", tema:"chiaro", sopratitolo:"Medici di famiglia nelle medicine di gruppo integrate",
  unita:"%", max:100, barre:[
  {et:"Entro il 31/12/2017", v:60, lab:"almeno 60%"},
  {et:"Entro il 31/12/2018", v:80, lab:"almeno 80%", colore:"#D70328"}]},
{id:"s39", tipo:"catena", tema:"chiaro", sopratitolo:"Contro l'integrazione incompiuta · art. 26", passi:[
  {t:"Le vecchie ULSS", d:"diventano distretti"},
  {t:"Comitato dei Sindaci", d:"in ogni distretto"},
  {t:"Piano di Zona", d:"elaborato e approvato dal Comitato", key:true}]},
{id:"s40", tipo:"scala", tema:"chiaro", sopratitolo:"Per la sostenibilità: regia e controlli · art. 16", gradini:[
  {t:"Regia unica", d:"Azienda Zero"},
  {t:"Osservatorio regionale", d:"monitora il nuovo assetto"},
  {t:"Prima verifica", d:"dopo tre anni", key:true}]},
{id:"s41", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Liste d'attesa · art. 28", celle:[
  {t:"**CUP** on line"}, {t:"promemoria via **SMS**"},
  {t:"disdetta **automatica**"}, {t:"ticket con lo **smartphone**"}]},
{id:"s42", tipo:"trappola", tema:"tenue", sopratitolo:"Un errore frequente", righe:[
  {sb:"La L.R. 19/2016 crea le ULSS e abolisce la L.R. 56/1994",
   ok:"Le ULSS esistono dal 1994: la L.R. 19 le riduce e modifica la 56"}]},
{id:"s43", tipo:"tabella", tema:"chiaro", sopratitolo:"Quattro nodi, quattro risposte", ...RISPOSTE, chiave:[0,1,2,3]},

// --- 9 · le tre cose
{id:"s44", tipo:"memo", tema:"chiaro", attive:[0], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s45", tipo:"memo", tema:"chiaro", attive:[0,1], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s46", tipo:"memo", tema:"chiaro", attive:[0,1,2], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s47", tipo:"trappola", tema:"tenue", sopratitolo:"Il distrattore", righe:[
  {sb:"La riforma è nata per tagliare i servizi",
   ok:"Tra gli obiettivi scritti: LEA uniformi, tutelando montagna, Polesine e laguna"}]},

// --- 10 · chiusura
{id:"s48", tipo:"titolo", tema:"profondo",
  titolo:"Troppe aziende.<br>Troppo ospedale.<br>Troppa distanza.<br>**Poche risorse.**",
  sotto:"Prossima lezione: i sei principi della riforma."},

{id:"s49", tipo:"copertina", tema:"profondo", modulo:"Prossima lezione",
  titolo:"Lezione 2.2", sottotitolo:"I sei principi ispiratori", ente:ENTE},
];
