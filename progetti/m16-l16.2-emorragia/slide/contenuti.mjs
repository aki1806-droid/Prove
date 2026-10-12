// Contenuto delle 50 scene della lezione 16.2 — l'emorragia digestiva nel
// paziente cirrotico. Quattro problemi su un anello che si alimenta; il tubo
// digerente per l'emorragia alta; l'evoluzione della giornata un percorso
// (ore 6, endoscopia, ore 14); l'asterixis per l'encefalopatia; un bivio fra
// astinenza ed encefalopatia; le priorità che si accendono e poi la piramide;
// errori in tabella; la risposta modello un promemoria riga per riga.

const LEZIONI = [
  {n:"6.6", t:"Trasfusione", illu:"sacca"},
  {n:"8.5", t:"Emorragia e cirrosi", illu:"stomaco"},
  {n:"10.6", t:"Shock", illu:"cuore"},
  {n:"11.3", t:"Astinenza alcolica", illu:"bicchiere"},
  {n:"14.4", t:"Il fegato", illu:"fegato"}];

const GIORNATA = (att, k) => ({tipo:"percorso", tema:"chiaro", attive:att, tappe:[
  {t:"Ore 6", d:"ematemesi e melena · PA 88/54, FC 128", key:k===0},
  {t:"Endoscopia", d:"emorragia controllata · PA 112/70, FC 98", key:k===1},
  {t:"Ore 14", d:"più confuso · sonno-veglia invertito · asterixis", key:k===2}]});

const PRIORITA = (att, k) => ({tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, attive:att, celle:[
  {n:"1", t:"**Vie aeree**: vomito con coscienza ridotta", key:k===0},
  {n:"2", t:"**Circolo**: lo shock emorragico", key:k===1},
  {n:"3", t:"Controllo della **fonte**: terapia vasoattiva, endoscopia", key:k===2},
  {n:"4", t:"**Complicanze** prevedibili: encefalopatia, infezioni, astinenza, insufficienza renale", key:k===3},
  {n:"5", t:"**Sicurezza**, nutrizione, educazione", key:k===4}]});

const RISPOSTA = (att) => ({tipo:"memo", tema:"chiaro", attive:att, voci:[
  "**Inquadramento**: ematemesi, melena, ipotensione, tachicardia, sonnolenza → emorragia alta da **varici**, shock, rischio di **inalazione**",
  "Aiuto subito · **vie aeree**: su un fianco, aspirazione, coscienza · ossigeno",
  "Due accessi di grosso calibro · prelievi con **gruppo e prove crociate**",
  "Liquidi, emocomponenti, **vasoattivi**, profilassi antibiotica secondo prescrizione · digiuno, endoscopia · parametri, diuresi, coscienza",
  "**Encefalopatia**: lattulosio, niente sedativi · **astinenza**: tiamina prima del glucosio",
  "Documento · familiari · un percorso **non giudicante** verso i servizi"]});

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 16 · Casi clinici avanzati",
  titolo:"Emorragia digestiva<br>nel paziente cirrotico", sottotitolo:"16.2 · Quattro problemi nello stesso letto",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"raggiera", tema:"chiaro", sopratitolo:"Micro-lezione 2 di 12 · quattro problemi che si alimentano a vicenda", centro:"Un paziente", raggi:[
  {t:"Emorragia", key:true}, {t:"Shock"}, {t:"Encefalopatia"}, {t:"Astinenza"}]},
{id:"s03", tipo:"anello", tema:"chiaro", sopratitolo:"Un caso complesso: obbliga a stabilire le priorità · i collegamenti",
  centro:"16.2", sotto:"le priorità", voci:LEZIONI},

{id:"s04", tipo:"cifre", tema:"chiaro", sopratitolo:"Lo scenario · il signor Giorgio, cirrosi su base alcolica", voci:[
  {n:"63", suf:"anni", t:"cirrosi epatica", d:"su base alcolica"},
  {n:"2", suf:"giorni", t:"in Medicina", d:"ricoverato per **ascite**"},
  {n:"3", suf:"giorni", t:"dall'ultimo alcol", d:"l'assunzione riferita", key:true}]},
{id:"s05", tipo:"cifre", tema:"chiaro", sopratitolo:"Ore 6 · vomita abbondante sangue rosso vivo, poi feci nere · pallido, sudato, sonnolento ma risvegliabile", voci:[
  {n:"88/54", t:"pressione", key:true}, {n:"128", t:"frequenza"}]},
{id:"s06", tipo:"pausa", tema:"chiaro", sopratitolo:"Gli esami di ieri", es:"metti in pausa",
  testo:"Qual è la **priorità assoluta**, prima ancora della pressione?",
  dati:["Hb di ieri 10,2 g/dl", "INR 2,1", "sonnolento", "ore 6"]},

{id:"s07", tipo:"tubo", tema:"chiaro", sopratitolo:"Il ragionamento · ematemesi rosso vivo e melena in un cirrotico: emorragia alta · probabile rottura di varici esofagee, per l'ipertensione portale", livello:"alta", sotto:""},
{id:"s08", tipo:"confronto", tema:"chiaro", sopratitolo:"Il circolo e la coagulazione", col:[
  {h:"Shock emorragico", t:"PA **88**, FC **128**, pallore, sudorazione"},
  {h:"Coagulopatia", t:"INR **2,1**: aggrava il sanguinamento"}]},
{id:"s09", tipo:"figura", tema:"chiaro", illu:"gola", sopratitolo:"Ma la priorità assoluta è un'altra",
  titolo:"Sonnolento, e vomita sangue: rischio di **inalazione**.", sotto:"Le vie aeree vengono prima di tutto."},

{id:"s10", tipo:"icone", tema:"chiaro", sopratitolo:"Le prime azioni · A e B", voci:[
  {icona:"telefono", t:"Aiuto e medico", d:"subito"},
  {icona:"letto", t:"Posizione laterale", d:"o testa sollevata e girata: non inala il sangue", key:true}]},
{id:"s11", tipo:"griglia", tema:"chiaro", colonne:1, sopratitolo:"Proteggere le vie aeree", celle:[
  {t:"**Aspiratore** pronto e funzionante · aspirazione del cavo orale"},
  {t:"**Coscienza** con la GCS: se peggiora, può servire l'**intubazione** prima dell'endoscopia", key:true},
  {t:"**Ossigeno** secondo protocollo"}]},

{id:"s12", tipo:"griglia", tema:"chiaro", colonne:2, sopratitolo:"Poi il circolo · i prelievi", celle:[
  {t:"**Due accessi** venosi di grosso calibro", key:true}, {t:"Emocromo, coagulazione"},
  {t:"**Gruppo** e prove crociate"}, {t:"Funzione renale ed epatica"}]},
{id:"s13", tipo:"icone", tema:"chiaro", sopratitolo:"Il circolo", voci:[
  {icona:"flebo", t:"Liquidi ed emocomponenti", d:"secondo prescrizione", key:true},
  {icona:"cuore2", t:"Monitoraggio continuo", d:"parametri ravvicinati"},
  {icona:"catetere", t:"Diuresi oraria"},
  {icona:"divieto", t:"Digiuno"}]},
{id:"s14", tipo:"trappola", tema:"chiaro", sopratitolo:"Un dettaglio che il caso vuole intercettare", righe:[
  {sb:"«L'emoglobina di ieri era 10,2»", ok:"Si perde sangue intero: l'emoglobina scende in **ritardo** · guidano i **parametri**"}]},

{id:"s15", tipo:"figura", tema:"chiaro", illu:"flebo", sopratitolo:"La terapia specifica, tutta su prescrizione",
  titolo:"Farmaci **vasoattivi**: riducono la pressione portale.", sotto:"Terlipressina, oppure somatostatina e analoghi."},
{id:"s16", tipo:"griglia", tema:"chiaro", colonne:1, sopratitolo:"Secondo prescrizione", celle:[
  {t:"**Profilassi antibiotica**: nel cirrotico con emorragia riduce infezioni e mortalità"},
  {t:"**Inibitori** di pompa protonica"},
  {t:"**Endoscopia urgente**, di norma entro 12 ore, con la **legatura** delle varici", key:true}]},
{id:"s17", tipo:"griglia", tema:"chiaro", colonne:1, sopratitolo:"La coagulazione", celle:[
  {t:"Correzione della **coagulazione** secondo indicazione"},
  {no:true, t:"**Nessuna intramuscolare**, con un INR di 2,1", key:true}]},

{id:"s18", tipo:"cifre", tema:"chiaro", sopratitolo:"Un punto avanzato · la trasfusione nel cirrotico", voci:[
  {n:"7–8", suf:"g/dl", t:"l'emoglobina obiettivo", d:"strategia **restrittiva**, secondo prescrizione", key:true}]},
{id:"s19", tipo:"catena", tema:"chiaro", sopratitolo:"Sembra un paradosso", passi:[
  {t:"Trasfusioni **eccessive**"}, {t:"Più **volume**"}, {t:"Più **pressione portale**"}, {t:"Più **sanguinamento**", d:"dalle varici", key:true}]},
{id:"s20", tipo:"icone", tema:"chiaro", sopratitolo:"Le regole di sicurezza della lezione 6.6 · e con più unità in poco tempo", voci:[
  {icona:"braccialetto", t:"Sicurezza trasfusionale", d:"identificazione al letto · primi 15 minuti"},
  {icona:"termometro", t:"Ipotermia", d:"riscaldatori secondo procedura", key:true},
  {icona:"goccia", t:"Ipocalcemia"}]},

{id:"s21", sopratitolo:"Le ore successive", ...GIORNATA([0,1,2], 2)},
{id:"s22", tipo:"asterixis", tema:"chiaro", sopratitolo:"Ore 14 · il sangue nell'intestino è una grande fonte di ammoniaca (lezione 8.5)", voci:["Più confuso", "Sonno-veglia invertito", "Asterixis", "Causa: il sangue nell'intestino"], key:[3], testa:"Encefalopatia epatica"},
{id:"s23", tipo:"griglia", tema:"chiaro", colonne:2, sopratitolo:"Gli interventi", celle:[
  {t:"**Segnalare**"}, {t:"**Lattulosio** per bocca, sondino o clistere, secondo prescrizione", key:true},
  {t:"Sorveglianza di **coscienza** e **vie aeree**"}, {no:true, t:"**Niente sedativi**"},
  {t:"Prevenzione delle **cadute**"}]},

{id:"s24", tipo:"cifre", tema:"chiaro", sopratitolo:"Il secondo problema nascosto", voci:[
  {n:"3", suf:"giorni", t:"dall'ultimo alcol", key:true},
  {n:"48–72", suf:"ore", t:"e oltre", d:"la finestra del **delirium tremens**"}]},
{id:"s25", tipo:"bivio", tema:"chiaro", sopratitolo:"Distinguerle è difficile: entrambe confondono",
  radice:"Un cirrotico confuso", rami:[
  {q:"astinenza?", t:"Tremori, sudorazione, tachicardia", d:"agitazione, allucinazioni"},
  {q:"encefalopatia?", t:"Sonno-veglia invertito, asterixis", d:"il sangue nell'intestino", key:true}]},
{id:"s26", tipo:"griglia", tema:"chiaro", colonne:1, sopratitolo:"L'astinenza", celle:[
  {t:"Valutare con una scala: la **CIWA-Ar**"},
  {t:"**Tiamina** secondo prescrizione, **prima del glucosio**: previene la Wernicke", key:true},
  {t:"Segnalare tutto: i **sedativi** nel cirrotico sono una scelta delicata, del medico"}]},

{id:"s27", sopratitolo:"Approfondimento · le priorità quando i problemi si sovrappongono", ...PRIORITA([0], 0)},
{id:"s28", sopratitolo:"Le priorità · circolo, fonte, complicanze", ...PRIORITA([0,1,2,3], 3)},
{id:"s29", tipo:"piramide", tema:"chiaro", sopratitolo:"È l'ABCDE applicato a un paziente complesso · documentare chi ha avvisato chi, e quando", strati:[
  {t:"1 · Vie aeree"}, {t:"2 · Circolo"}, {t:"3 · Controllo della fonte"},
  {t:"4 · Complicanze prevedibili"}, {t:"5 · Sicurezza, nutrizione, educazione"}]},

{id:"s30", tipo:"griglia", tema:"chiaro", colonne:2, sopratitolo:"Verso la dimissione · il tema centrale", celle:[
  {t:"**Astensione** dall'alcol: colloquio non giudicante", key:true}, {t:"**SerD** o servizi di alcologia"},
  {t:"Gruppi di **auto-aiuto**"}, {t:"Terapia contro un **nuovo sanguinamento**"}]},
{id:"s31", tipo:"griglia", tema:"chiaro", colonne:2, sopratitolo:"L'educazione", celle:[
  {t:"Segni d'allarme: **vomito di sangue**, **feci nere**, **confusione**, **addome che aumenta**", key:true},
  {t:"**Alvo** regolare con il lattulosio"}, {t:"**Poco sale**"}, {t:"Controlli **endoscopici** programmati"}]},

{id:"s32", tipo:"tabella", tema:"chiaro", sopratitolo:"Gli errori da evitare · le prime ore", colonne:["55%","45%"],
  intestazioni:["Errore", "Invece"], righe:[
  ["no:La pressione sì, le vie aeree no", "prima le **vie aeree**"],
  ["no:«L'emoglobina di ieri era buona»", "scende in **ritardo**"],
  ["no:Trasfondere il più possibile", "strategia **restrittiva**"],
  ["no:Intramuscolari con INR alterato", "**nessuna** intramuscolare"]], chiave:[0]},
{id:"s33", tipo:"tabella", tema:"chiaro", sopratitolo:"Gli errori da evitare · dopo", colonne:["55%","45%"],
  intestazioni:["Errore", "Invece"], righe:[
  ["no:Sedare un paziente confuso", "encefalopatia o **astinenza**?"],
  ["no:Dimenticare la tiamina", "**prima** del glucosio"],
  ["no:Giudicare per l'alcol", "il giudizio **allontana** dalle cure"]], chiave:[2]},

{id:"s34", tipo:"figura", tema:"chiaro", illu:"dialogo", sopratitolo:"Parlare di alcol senza giudicare · il tema più delicato del caso",
  titolo:"Una **malattia** da dipendenza, non una colpa morale.", sotto:"Un tono giudicante chiude la conversazione."},
{id:"s35", tipo:"sostituzione", tema:"chiaro", sopratitolo:"Le domande",
  da:{h:"Non", t:"minimizzare, moralizzare"}, a:{h:"Ma", t:"domande **aperte**, tono **neutro**"},
  sotto:"«Quanto beve in una giornata tipo?» · e il legame fra alcol, cirrosi e sanguinamento, spiegato con chiarezza"},
{id:"s36", tipo:"icone", tema:"chiaro", sopratitolo:"Molti pazienti non hanno davvero compreso quel legame", voci:[
  {icona:"spunta", t:"Valorizzare ogni passo", d:"il colloquio motivazionale · lezione 11.6", key:true},
  {icona:"persone", t:"Coinvolgere i familiari", d:"con il consenso del paziente"}]},
{id:"s37", tipo:"frase", tema:"chiaro", sopratitolo:"Proporre concretamente SerD, servizi di alcologia, gruppi di auto-aiuto",
  testo:"Molti decidono di smettere proprio **dopo un episodio come questo**.",
  sotto:"Se trovano qualcuno disposto ad ascoltarli."},

{id:"s38", tipo:"tubo", tema:"chiaro", sopratitolo:"D1 · «Come distingue un'emorragia digestiva alta da una bassa?» · alta: ematemesi e melena · bassa: sangue rosso dal retto", sotto:""},
{id:"s39", tipo:"frase", tema:"chiaro", sopratitolo:"D1 · un'avvertenza · poi D2: perché nel cirrotico l'emorragia scatena l'encefalopatia?",
  testo:"Un'emorragia alta molto abbondante può arrivare **rossa dal retto**."},
{id:"s40", tipo:"catena", tema:"chiaro", sopratitolo:"D2 · «Perché nel cirrotico l'emorragia può scatenare un'encefalopatia?»", passi:[
  {t:"**Sangue** nell'intestino"}, {t:"Digerito come **proteine**"}, {t:"**Ammoniaca**"},
  {t:"Il fegato malato **non la elimina**", key:true}]},
{id:"s41", tipo:"catena", tema:"chiaro", sopratitolo:"D3 · «Perché si somministra la tiamina prima del glucosio nel paziente alcolista?»", passi:[
  {t:"Carenza di **tiamina**", d:"frequente nell'alcolista"}, {t:"**Glucosio** senza tiamina"},
  {t:"Encefalopatia di **Wernicke**", key:true}]},

{id:"s42", sopratitolo:"La risposta modello, in 15 righe", ...RISPOSTA([0])},
{id:"s43", sopratitolo:"La risposta modello · vie aeree e accessi", ...RISPOSTA([0,1,2])},
{id:"s44", sopratitolo:"La risposta modello · terapia e monitoraggio", ...RISPOSTA([0,1,2,3])},
{id:"s45", sopratitolo:"La risposta modello · le ore successive", ...RISPOSTA([0,1,2,3,4,5])},

{id:"s46", tipo:"tre", tema:"chiaro", sopratitolo:"I collegamenti", box:[
  {n:"6.6", t:"Trasfusione"}, {n:"8.5", t:"Emorragia digestiva, cirrosi, encefalopatia", key:true}, {n:"10.6", t:"Shock"}]},
{id:"s47", tipo:"tre", tema:"chiaro", sopratitolo:"I collegamenti", box:[
  {n:"11.3", t:"Astinenza alcolica, SerD"}, {n:"14.4", t:"Funzioni del fegato"}, {n:"10.5", t:"Vie aeree", key:true}]},

{id:"s48", tipo:"titolo", tema:"profondo",
  titolo:"Chi vomita sangue<br>e si addormenta rischia<br>prima di **soffocare**<br>che di dissanguarsi.",
  sotto:"Le vie aeree vengono sempre prima."},

{id:"s49", tipo:"tre", tema:"chiaro", sopratitolo:"Nella prossima lezione · in emodialisi, salta una seduta e arriva con un potassio pericolosamente alto", box:[
  {n:"1", t:"ECG"}, {n:"2", t:"Terapia d'urgenza", key:true}, {n:"3", t:"La fistola da proteggere"}]},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione · 16.3",
  titolo:"Il paziente dializzato<br>con iperkaliemia", sottotitolo:"ECG, terapia d'urgenza e la fistola",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
