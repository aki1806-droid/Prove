// Contenuto delle 50 scene della lezione 13.3 — l'ospedale in Veneto e le reti tempo-dipendenti.
// L'hub and spoke è una raggiera; la rete per l'infarto e il caso d'esame due
// percorsi che si accendono tappa per tappa; la rete ictus un «tre» con hub,
// spoke e stroke unit; centralizzazione e prossimità due cerchi che si toccano.

const STEMI = (att, k) => ({tipo:"percorso", tema:"chiaro", tappe:[
  {t:"ECG a 12 derivazioni", d:"dal 118, sul territorio", key:k===0},
  {t:"Teletrasmissione", d:"al cardiologo", key:k===1},
  {t:"STEMI", d:"accesso diretto all'emodinamica", key:k===2},
  {t:"Riperfusione", d:"nel minor tempo possibile", key:k===3}], attive:att});

const ICTUS = (att, k) => ({tipo:"tre", tema:"chiaro", box:[
  {n:"1", t:"Stroke unit", d:"nelle aziende", key:k===0},
  {n:"2", t:"Centri hub", d:"**trombectomia** meccanica", key:k===1},
  {n:"3", t:"Centri spoke", d:"**trombolisi** e teleconsulto con l'hub", key:k===2}], attive:att});

const CASO = (att, k) => ({tipo:"percorso", tema:"chiaro", tappe:[
  {t:"Chiamata al 118", key:k===0},
  {t:"Codice di priorità", d:"mezzo adeguato, anche l'elisoccorso", key:k===1},
  {t:"ECG a 12 derivazioni", d:"teletrasmesso", key:k===2},
  {t:"STEMI", d:"centralizzazione diretta", key:k===3},
  {t:"Emodinamica", d:"pre-allertata", key:k===4}], attive:att});

const CRITICITA = (att, k) => ({tipo:"tre", tema:"chiaro", box:[
  {n:"1", t:"Carenza di personale", d:"pronto soccorso e aree periferiche", key:k===0},
  {n:"2", t:"Sovraffollamento", d:"e **boarding**", key:k===1},
  {n:"3", t:"Montagna e aree turistiche", d:"picchi **stagionali**", key:k===2}], attive:att});

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 13 · Il Servizio Socio Sanitario del Veneto",
  titolo:"L'ospedale in Veneto<br>e le reti tempo-dipendenti", sottotitolo:"13.3 · Schede di dotazione, hub & spoke, SUEM 118, NUE 112, reti cliniche",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"tre", tema:"chiaro", sopratitolo:"Micro-lezione 3 di 8 · dal modulo 10: il tempo decide l'esito", box:[
  {n:"1", t:"Infarto"}, {n:"2", t:"Ictus"}, {n:"3", t:"Trauma"}]},
{id:"s03", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"La traduzione veneta del DM 70/2015 · lezione 12.3", celle:[
  {n:"1", t:"La rete ospedaliera **hub & spoke**", key:true}, {n:"2", t:"Il **SUEM 118**"}, {n:"3", t:"Le **reti cliniche** regionali"}]},

{id:"s04", tipo:"norma", tema:"chiaro", etichetta:"Approvate con deliberazione della Giunta regionale", sigla:"DGR",
  testo:"Le **schede di dotazione ospedaliera** disegnano la rete."},
{id:"s05", tipo:"griglia", tema:"chiaro", colonne:4, spunta:true, sopratitolo:"Per ogni ospedale le schede stabiliscono", celle:[
  {t:"La **classificazione**"}, {t:"Le **unità operative**"}, {t:"I **posti letto**"}, {t:"Le **funzioni** nella rete", key:true}]},
{id:"s06", tipo:"confronto", tema:"chiaro", sopratitolo:"Attuano il DM 70 · aggiornate periodicamente · l'hub & spoke è un tema del PSSR", col:[
  {h:"Schede ospedaliere", t:"per ogni **ospedale**"}, {h:"Schede territoriali", t:"per il **territorio**"}]},

{id:"s07", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Gli hub · funzioni di alta specialità e di riferimento", celle:[
  {n:"·", t:"AOU di **Padova**"}, {n:"·", t:"AOUI di **Verona**"}, {n:"·", t:"I grandi ospedali **provinciali**", key:true}]},
{id:"s08", tipo:"raggiera", tema:"chiaro", sopratitolo:"Spoke collegati agli hub · a Padova: AOU hub, ULSS spoke", centro:"Hub",
  raggi:[{t:"Spoke"},{t:"Spoke"},{t:"Spoke"},{t:"Spoke"},{t:"Spoke"}]},
{id:"s09", tipo:"tre", tema:"chiaro", sopratitolo:"Presidi nelle zone particolarmente disagiate · lontane dall'hub", box:[
  {n:"1", t:"Montagna", d:"la montagna bellunese"}, {n:"2", t:"Laguna"}, {n:"3", t:"Delta", d:"il delta polesano"}]},
{id:"s10", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"Un unico disegno, quello delle schede regionali", celle:[
  {t:"Ospedali delle **ULSS**"}, {t:"Aziende **universitarie**"}, {t:"Strutture **private accreditate**", key:true}]},

{id:"s11", tipo:"cifre", tema:"chiaro", sopratitolo:"Il SUEM 118 · Servizio Urgenza Emergenza Medica", voci:[
  {n:"7", suf:"", t:"centrali operative", d:"su base **provinciale**", key:true}]},
{id:"s12", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"I mezzi del SUEM", celle:[
  {n:"·", t:"Mezzi di soccorso **di base** e **avanzati**"}, {n:"·", t:"**Automediche**"},
  {n:"·", t:"**Elisoccorso**"}, {n:"·", t:"**Idroambulanze** per la laguna di Venezia", key:true}]},
{id:"s13", tipo:"griglia", tema:"chiaro", colonne:4, spunta:false, sopratitolo:"Nuclei specializzati per gli eventi NBCR · rari, con dotazioni dedicate", celle:[
  {n:"N", t:"**Nucleari**"}, {n:"B", t:"**Biologici**"}, {n:"C", t:"**Chimici**"}, {n:"R", t:"**Radiologici**"}]},
{id:"s14", tipo:"catena", tema:"chiaro", sopratitolo:"In centrale · un sistema regionale di dispatch", passi:[
  {t:"La **chiamata**"}, {t:"L'infermiere attribuisce il **codice di priorità**", key:true}, {t:"Il **mezzo** inviato"}]},
{id:"s15", tipo:"norma", tema:"chiaro", etichetta:"Coordinamento regionale emergenza urgenza", sigla:"CREU",
  testo:"Uniforma **procedure** e **sistemi** delle centrali."},

{id:"s16", tipo:"norma", tema:"chiaro", etichetta:"Protocollo Regione · Ministero dell'Interno", sigla:"NUE 112",
  testo:"Il **Numero Unico di Emergenza europeo**, da attuare in Veneto."},
{id:"s17", tipo:"catena", tema:"chiaro", sopratitolo:"Il modello del NUE 112", passi:[
  {t:"La **chiamata**"}, {t:"Le **centrali uniche di risposta**", d:"ricevono e smistano", key:true},
  {t:"**118** · vigili del fuoco · forze dell'ordine"}]},
{id:"s18", tipo:"trappola", tema:"chiaro", sopratitolo:"Centrali SUEM con un software unificato, predisposto per l'integrazione", righe:[
  {sb:"«Il 112 è già attivo ovunque»", ok:"Passaggio **progressivo**: verifica lo **stato di attivazione** prima della prova"}]},

{id:"s19", sopratitolo:"La rete per l'infarto", ...STEMI([0,1], 1)},
{id:"s20", tipo:"confronto", tema:"chiaro", sopratitolo:"STEMI · se l'ospedale più vicino non ha l'emodinamica", col:[
  {h:"Si salta", t:"il pronto soccorso dello **spoke** più vicino"}, {h:"Si va", t:"**direttamente** al centro con **emodinamica**"}]},
{id:"s21", sopratitolo:"Obiettivo: ridurre il tempo alla riperfusione · lezione 8.1", ...STEMI([0,1,2,3], 3)},

{id:"s22", sopratitolo:"La rete ictus", ...ICTUS([0,1], 1)},
{id:"s23", sopratitolo:"Anche l'ospedale più piccolo e lontano resta collegato", ...ICTUS([0,1,2], 2)},
{id:"s24", tipo:"catena", tema:"chiaro", sopratitolo:"Il percorso preospedaliero · lezione 8.6", passi:[
  {t:"Il 118 **pre-allerta** l'ospedale"}, {t:"**Centralizza** il paziente"}, {t:"«Il tempo è **cervello**»", key:true}]},

{id:"s25", tipo:"confronto", tema:"chiaro", sopratitolo:"La rete trauma · due livelli", col:[
  {h:"Centri traumatologici", t:"di riferimento, ad **alta specializzazione**"}, {h:"Ospedali di rete", t:"collegati ai centri"}]},
{id:"s26", tipo:"catena", tema:"chiaro", sopratitolo:"Centralizzazione primaria, il prima possibile", passi:[
  {t:"**Politrauma** grave"}, {t:"Spesso con l'**elisoccorso**"}, {t:"Il centro con il **trauma team**", key:true}]},
{id:"s27", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"Le specialità necessarie · lezione 10.7", celle:[
  {t:"**Neurochirurgia**"}, {t:"**Chirurgia toracica**"}, {t:"**Centro ustioni**"}]},

{id:"s28", tipo:"norma", tema:"chiaro", etichetta:"Rete Oncologica Veneta", sigla:"ROV",
  testo:"**Percorsi** per tipo di tumore e **gruppi multidisciplinari**."},
{id:"s29", tipo:"confronto", tema:"chiaro", sopratitolo:"Le altre reti cliniche regionali", col:[
  {h:"Punti nascita", t:"e **trasporto neonatale**"}, {h:"Trapianti", t:"**Centro Regionale Trapianti** · procurement degli organi"}]},
{id:"s30", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"E ancora", celle:[
  {n:"·", t:"**Malattie rare** · coordinamento regionale"}, {n:"·", t:"**Dolore** e **cure palliative** · L. 38/2010", key:true},
  {n:"·", t:"Rete **pediatrica**"}]},

{id:"s31", tipo:"icone", tema:"chiaro", sopratitolo:"L'infermiere in ogni nodo delle reti", voci:[
  {icona:"chat", t:"Centrale 118"}, {icona:"persone", t:"Mezzi di soccorso"},
  {icona:"orologio", t:"Triage", d:"attiva i percorsi tempo-dipendenti", key:true}]},
{id:"s32", tipo:"icone", tema:"chiaro", sopratitolo:"E ancora", voci:[
  {icona:"cartella", t:"Case manager", d:"rete oncologica"}, {icona:"cuoremano", t:"Procurement", d:"coordinatore infermieristico", key:true},
  {icona:"ospedale", t:"Stroke unit"}, {icona:"goccia", t:"Emodinamica"}]},
{id:"s33", tipo:"frase", tema:"chiaro", sopratitolo:"Ogni nodo conosce il proprio ruolo e i propri tempi · all'orale",
  testo:"Non solo che cos'è la rete, ma **come la usi da infermiere**."},

{id:"s34", tipo:"frase", tema:"chiaro", sopratitolo:"Il caso d'esame",
  testo:"«Uomo di **58 anni**, dolore toracico da **40 minuti**, in un paese di montagna: come si attiva la rete?»"},
{id:"s35", sopratitolo:"Il caso · la centrale", ...CASO([0,1], 1)},
{id:"s36", sopratitolo:"Il caso · sul posto e la centralizzazione", ...CASO([0,1,2,3,4], 3)},
{id:"s37", tipo:"frase", tema:"chiaro", sopratitolo:"Domanda d'orale probabile: come funziona la rete per l'infarto o l'ictus",
  testo:"Saltare i passaggi che non servono, per **guadagnare tempo**."},

{id:"s38", sopratitolo:"Le criticità · per una risposta matura all'orale", ...CRITICITA([0], 0)},
{id:"s39", sopratitolo:"Le criticità", ...CRITICITA([0,1,2], 2)},
{id:"s40", tipo:"venn", tema:"chiaro", sopratitolo:"Il tema di fondo",
  sx:{t:"Centralizzazione", d:"concentra<br>le **competenze**"}, dx:{t:"Prossimità", d:"avvicina<br>i **servizi**<br>alle persone"},
  centro:"l'**equilibrio**: nessuna delle due, da sola, basta"},

{id:"s41", tipo:"tre", tema:"chiaro", sopratitolo:"Azienda Ospedale-Università di Padova · AOUI di Verona", box:[
  {n:"1", t:"Assistenza"}, {n:"2", t:"Didattica"}, {n:"3", t:"Ricerca"}]},
{id:"s42", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Insieme alle Università di Padova e di Verona", celle:[
  {t:"Sedi dei corsi di laurea, anche in **Infermieristica**"}, {t:"Funzioni regionali di **alta specialità**", key:true}]},
{id:"s43", tipo:"norma", tema:"chiaro", etichetta:"IOV · Istituto Oncologico Veneto", sigla:"IRCCS",
  testo:"Istituto di Ricovero e Cura a Carattere Scientifico: **ricerca** e **cura** in oncologia."},

{id:"s44", tipo:"tabella", tema:"chiaro", sopratitolo:"La tabella · la rete ospedaliera", colonne:["40%","60%"],
  intestazioni:["Che cosa", "Da ricordare"], righe:[
  ["Schede di dotazione", "approvate con **DGR**"], ["Modello", "**hub & spoke**"],
  ["Riferimenti", "**AOU Padova** · **AOUI Verona** · **IOV**"]], chiave:[0]},
{id:"s45", tipo:"tabella", tema:"chiaro", sopratitolo:"La tabella · l'emergenza", colonne:["32%","68%"],
  intestazioni:["Che cosa", "Da ricordare"], righe:[
  ["SUEM 118", "**7** centrali provinciali · dispatch **infermieristico**"], ["Mezzi", "elisoccorso · idroambulanze"],
  ["CREU", "coordinamento regionale"], ["NUE 112", "protocollo con il **Ministero dell'Interno**"]], chiave:[0]},
{id:"s46", tipo:"tabella", tema:"chiaro", sopratitolo:"La tabella · le reti", colonne:["26%","74%"],
  intestazioni:["Rete", "Da ricordare"], righe:[
  ["Infarto", "ECG **teletrasmesso** · accesso **diretto** all'emodinamica"], ["Ictus", "hub per la **trombectomia**"],
  ["Trauma", "centralizzazione del politrauma grave"],
  ["Altre", "ROV · punti nascita · trapianti · malattie rare · dolore e cure palliative"]], chiave:[0]},

{id:"s47", tipo:"titolo", tema:"profondo",
  titolo:"Non l'ospedale più vicino,<br>ma **l'ospedale giusto**.",
  sotto:"Il principio di tutte le reti tempo-dipendenti: infarto, ictus, trauma."},

{id:"s48", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Nella prossima lezione · usciamo dall'ospedale", celle:[
  {n:"1", t:"Il **distretto**", key:true}, {n:"2", t:"Le **medicine di gruppo integrate**"},
  {n:"3", t:"Gli **ospedali di comunità**"}, {n:"4", t:"Il **DM 77** in Veneto"}]},
{id:"s49", tipo:"frase", tema:"chiaro", sopratitolo:"Dopo la rete dell'emergenza",
  testo:"La rete della **prossimità**: la casa, primo luogo di cura."},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione · 13.4",
  titolo:"Il distretto e le<br>cure primarie venete", sottotitolo:"Medicine di gruppo integrate, ospedali di comunità, DM 77 in Veneto",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
