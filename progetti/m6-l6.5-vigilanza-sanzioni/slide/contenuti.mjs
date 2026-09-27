// Contenuto delle 50 scene della lezione 6.5. *accento*  **accento in semibold**
//
// Corso «Progressione verticale · Comparto Sanità», Modulo 6. Chi vigila e che cosa si rischia:
// D.Lgs. 33/2013 artt. 10, 43, 44, 45, 46, 47; artt. 15, 22, 26 (efficacia e divieti); L. 190/2012 art. 1 c. 7;
// DPR 62/2013 art. 9. PIAO (D.L. 80/2021): da verificare.

const ENTE = "CISL FP Padova Rovigo · Progressione verticale · Comparto Sanità";

const TRE_COSE = [
  "Dentro vigila l'**RPCT**, che controlla e segnala; i **dirigenti** garantiscono il flusso dei dati; l'**OIV** collega trasparenza e performance",
  "Da fuori vigila l'**ANAC**: può ordinare di pubblicare entro **30 giorni**; ignorare l'ordine è **illecito disciplinare**",
  "L'inadempimento pesa su **responsabilità dirigenziale** e **risultato**; la sanzione **500–10.000 €** riguarda soprattutto art. 14 ed enti controllati",
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 6 · Trasparenza nella pubblica amministrazione",
  titolo:"Chi vigila<br>e che cosa si rischia", sottotitolo:"Lezione 6.5", ente:ENTE},

// --- 1 · aggancio
{id:"s02", tipo:"illustrata", tema:"chiaro", ill:"sito", sopratitolo:"Un obbligo ignorato per mesi",
  titolo:"Chi ne **risponde**?", punti:[
    {icona:"occhio", t:"chi se ne **accorge**?"},
    {icona:"avviso", t:"chi deve **intervenire**?"},
    {icona:"persone", t:"dirigente, ufficio o **azienda**?", key:true}],
  etichette:{barra:"Amministrazione trasparente", menu:{t:"Dato mancante", key:true}}},
{id:"s03", tipo:"illustrata", tema:"chiaro", ill:"faro", sopratitolo:"Non basta la buona volontà",
  titolo:"Un sistema di **controlli**", punti:[
    {icona:"persona", t:"responsabili **dentro** l'amministrazione"},
    {icona:"occhio", t:"un'autorità che vigila **da fuori**"},
    {icona:"avviso", t:"conseguenze **precise**", key:true}],
  etichette:{alto:{t:"Vigilanza", key:true}, sx:"Dentro", dx:"Fuori"}},
{id:"s04", tipo:"titolo", tema:"profondo",
  titolo:"Una regola senza **controlli**<br>resta sulla **carta**."},

// --- 2 · rotta
{id:"s05", tipo:"flusso", tema:"chiaro", sopratitolo:"Quattro passaggi", passi:[
  {icona:"persona", t:"Dentro", d:"chi controlla"},
  {icona:"occhio", t:"Fuori", d:"l'ANAC"},
  {icona:"bilancia", t:"Le responsabilità"},
  {icona:"euro", t:"Le sanzioni", d:"quelle vere", key:true}]},

// --- 3 · dentro l'amministrazione
{id:"s06", tipo:"sigla", tema:"chiaro", sopratitolo:"Art. 43 · di norma una sola figura", lettere:[
  {l:"R", p:"Responsabile"}, {l:"P", p:"Prevenzione"}, {l:"C", p:"Corruzione"}, {l:"T", p:"Trasparenza", key:true}]},
{id:"s07", tipo:"illustrata", tema:"chiaro", ill:"organigramma", sopratitolo:"L. 190/2012, art. 1, c. 7",
  titolo:"Chi lo **nomina**", punti:[
    {icona:"sigillo", t:"l'**organo di indirizzo**", key:true},
    {icona:"persona", t:"di norma un **dirigente di ruolo** in servizio"}],
  etichette:{top:{t:"Direzione aziendale", key:true}, basso:"Dirigenti di ruolo"}},
{id:"s08", tipo:"tre", tema:"chiaro", attive:[0,1,2], sopratitolo:"Un controllo stabile: le informazioni sono", box:[
  {n:"1", t:"Complete", d:"nessun dato mancante"},
  {n:"2", t:"Chiare", d:"comprensibili a tutti"},
  {n:"3", t:"Aggiornate", d:"nei tempi previsti"}]},
{id:"s09", tipo:"rete", tema:"chiaro", sopratitolo:"Ritardi e inadempimenti: l'RPCT li segnala",
  centro:"RPCT", dcentro:"segnala", nodi:[
  {t:"Organo di indirizzo", icona:"sigillo"}, {t:"OIV", icona:"occhio"},
  {t:"ANAC", icona:"scudo"}, {t:"Ufficio disciplinare", icona:"avviso", key:true}], inizio:-Math.PI/2, rx:520, ry:240},
{id:"s10", tipo:"flusso", tema:"chiaro", sopratitolo:"Art. 43, c. 3 · l'RPCT non lavora da solo", passi:[
  {icona:"persone", t:"I dirigenti", d:"degli uffici"},
  {icona:"cartella", t:"Forniscono i dati", d:"tempestivi e regolari", key:true},
  {icona:"occhio", t:"L'RPCT", d:"controlla"}]},
{id:"s11", tipo:"norma", tema:"chiaro", etichetta:"Codice di comportamento · DPR 62/2013, art. 9", sigla:"Collaborare",
  testo:"Ognuno fornisce i dati per la trasparenza in modo **completo** e **puntuale**."},
{id:"s12", tipo:"illustrata", tema:"chiaro", ill:"documento", sopratitolo:"Art. 10 · la programmazione",
  titolo:"Chi fa **cosa**", punti:[
    {icona:"documento", t:"una sezione del **piano** anticorruzione"},
    {icona:"persone", t:"chi **trasmette** e chi **pubblica** ogni dato", key:true}],
  etichette:{titolo:"Piano triennale", sigillo:{t:"Trasparenza", key:true}}},
{id:"s13", tipo:"piramide", tema:"chiaro", sopratitolo:"Più trasparenza è un obiettivo strategico", strati:[
  {t:"Obiettivo strategico", d:"maggiori livelli di trasparenza"},
  {t:"Obiettivi organizzativi", d:"delle strutture"},
  {t:"Obiettivi individuali", d:"nella programmazione dell'ente"}]},
{id:"s14", tipo:"confronto", tema:"chiaro", sopratitolo:"Oggi, nelle amministrazioni più grandi", col:[
  {h:"Il piano anticorruzione", t:"con la sua sezione **trasparenza**"},
  {h:"Confluisce nel PIAO", t:"sezione **rischi corruttivi e trasparenza**", key:true}]},
{id:"s15", tipo:"illustrata", tema:"chiaro", ill:"bilancio", sopratitolo:"Art. 44 · l'organismo indipendente di valutazione",
  titolo:"L'**OIV**", punti:[
    {icona:"bilancia", t:"coerenza tra i due **piani**"},
    {icona:"persona", t:"usa i dati per **valutare** dirigenti e responsabili", key:true}],
  etichette:{sx:"Anticorruzione", dx:"Performance", alto:{t:"OIV", key:true}}},
{id:"s16", tipo:"trappola", tema:"tenue", sopratitolo:"Occhio a un distrattore", righe:[
  {sb:"L'RPCT è l'unico responsabile della pubblicazione",
   ok:"I dirigenti degli uffici garantiscono il flusso dei dati"}]},
{id:"s17", tipo:"titolo", tema:"profondo",
  titolo:"Un responsabile che **controlla**,<br>dirigenti che **forniscono** i dati."},

// --- 4 · il controllo esterno
{id:"s18", tipo:"illustrata", tema:"chiaro", ill:"faro", sopratitolo:"Art. 45 · da fuori",
  titolo:"Vigila l'**ANAC**", punti:[
    {icona:"occhio", t:"l'esatto adempimento degli **obblighi**"},
    {icona:"scudo", t:"con **poteri ispettivi**", key:true}],
  etichette:{alto:{t:"ANAC", key:true}}},
{id:"s19", tipo:"icone", tema:"chiaro", sopratitolo:"Che cosa può fare l'ANAC", voci:[
  {icona:"chat",      t:"Chiedere **notizie** e informazioni"},
  {icona:"cartella",  t:"Chiedere **atti** e documenti"},
  {icona:"occhio",    t:"Controllare l'operato degli **RPCT**"},
  {icona:"persone",   t:"Chiedere informazioni all'**OIV**"}]},
{id:"s20", tipo:"illustrata", tema:"chiaro", ill:"busta", sopratitolo:"Anche su segnalazione",
  titolo:"Cittadini e **associazioni**", punti:[
    {icona:"persone", t:"trovano un obbligo **non rispettato**"},
    {icona:"chat", t:"lo **segnalano** all'ANAC", key:true}],
  etichette:{sx:"ANAC", dx:"Cittadino", alto:{t:"Segnalazione", key:true}}},
{id:"s21", tipo:"contatore", tema:"chiaro", sopratitolo:"Se trova un inadempimento, l'ANAC ordina di pubblicare",
  valori:[{n:30, t:"giorni al massimo per adempiere", key:true}]},
{id:"s22", tipo:"rete", tema:"chiaro", sopratitolo:"Ignorare l'ordine è illecito disciplinare: l'ANAC lo segnala",
  centro:"ANAC", dcentro:"segnala", nodi:[
  {t:"Ufficio disciplinare", icona:"avviso", key:true}, {t:"Vertici dell'amministrazione", icona:"sigillo"},
  {t:"OIV", icona:"occhio"}], inizio:-Math.PI/2, rx:520, ry:240},
{id:"s23", tipo:"confronto", tema:"chiaro", sopratitolo:"E ancora", col:[
  {h:"Se del caso, la Corte dei conti", t:"per le **altre** forme di responsabilità"},
  {h:"Provvedimenti pubblici", t:"l'ANAC rende noti gli **inadempimenti**", key:true}]},
{id:"s24", tipo:"illustrata", tema:"chiaro", ill:"sito", sopratitolo:"Criteri, modelli e schemi standard",
  titolo:"Una sezione **uniforme**", punti:[
    {icona:"documento", t:"li definisce l'**ANAC**"},
    {icona:"spunta", t:"stessa organizzazione in **tutte** le PA", key:true}],
  etichette:{barra:"Schemi ANAC", menu:{t:"Stesse voci ovunque", key:true}}},
{id:"s25", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione", righe:[
  {sb:"L'ANAC si limita a raccomandare",
   ok:"Può ordinare di pubblicare, con un termine; ignorarlo è illecito disciplinare"}]},
{id:"s26", tipo:"titolo", tema:"profondo",
  titolo:"Un **ordine**, **trenta** giorni,<br>un **illecito** se si ignora."},

// --- 5 · le responsabilità
{id:"s27", tipo:"norma", tema:"chiaro", etichetta:"D.Lgs. 33/2013, art. 46", sigla:"Tre effetti",
  testo:"Per l'inadempimento degli obblighi e il **rifiuto illegittimo** dell'accesso civico."},
{id:"s28", tipo:"tre", tema:"chiaro", attive:[0,1], sopratitolo:"Le conseguenze generali", box:[
  {n:"1", t:"Dirigenziale", d:"elemento di valutazione della responsabilità"},
  {n:"2", t:"Immagine", d:"possibile danno all'amministrazione"},
  {n:"3", t:"Risultato", d:"retribuzione e trattamento accessorio"}]},
{id:"s29", tipo:"illustrata", tema:"chiaro", ill:"vetro", sopratitolo:"Il danno all'immagine",
  titolo:"La **credibilità**", punti:[
    {icona:"giudice", t:"si fa valere davanti alla **Corte dei conti**"},
    {icona:"persone", t:"l'ente la perde agli occhi dei **cittadini**", key:true}],
  etichette:{alto:{t:"Fiducia", key:true}, sx:"Amministrazione", dx:"Cittadini"}},
{id:"s30", tipo:"tre", tema:"chiaro", attive:[0,1,2], sopratitolo:"Le conseguenze generali", box:[
  {n:"1", t:"Dirigenziale", d:"elemento di valutazione della responsabilità"},
  {n:"2", t:"Immagine", d:"possibile danno all'amministrazione"},
  {n:"3", t:"Risultato", d:"retribuzione e trattamento accessorio"}]},
{id:"s31", tipo:"norma", tema:"chiaro", etichetta:"Art. 46, c. 2", sigla:"Causa non imputabile",
  testo:"Non risponde chi **prova** che l'inadempimento non dipende da lui."},
{id:"s32", tipo:"flusso", tema:"chiaro", sopratitolo:"Conseguenze sugli atti · art. 15", passi:[
  {icona:"documento", t:"Consulenza", d:"non pubblicata"},
  {icona:"divieto", t:"Non efficace", d:"compenso non pagabile", key:true},
  {icona:"avviso", t:"Chi paga", d:"risponde in via disciplinare"}]},
{id:"s33", tipo:"confronto", tema:"chiaro", sopratitolo:"Artt. 26 e 22 · altri blocchi", col:[
  {h:"Sovvenzioni oltre 1.000 €", t:"**nessun effetto** senza pubblicazione"},
  {h:"Enti e società controllate", t:"senza dati, **vietato** versare somme", key:true}]},
{id:"s34", tipo:"illustrata", tema:"chiaro", ill:"cassaforte", sopratitolo:"Un esempio in azienda sanitaria",
  titolo:"Il compenso **resta fermo**", punti:[
    {icona:"documento", t:"consulenza affidata e **non pubblicata**"},
    {icona:"avviso", t:"chi paga comunque **ne risponde**", key:true}],
  etichette:{alto:{t:"Compenso bloccato", key:true}}},
{id:"s35", tipo:"trappola", tema:"tenue", sopratitolo:"Un distrattore frequente", righe:[
  {sb:"Se nessuno lo contesta, l'inadempimento resta senza effetti",
   ok:"Pesa sulla valutazione e, in certi casi, blocca l'atto stesso"}]},
{id:"s36", tipo:"titolo", tema:"profondo",
  titolo:"**Responsabilità**, **risultato**,<br>efficacia degli **atti**."},

// --- 6 · le sanzioni
{id:"s37", tipo:"sostituzione", tema:"chiaro", sopratitolo:"Qui molte dispense sbagliano",
  da:{h:"Le dispense", t:"multa per ogni mancata pubblicazione"},
  a:{h:"L'art. 47", t:"solo **casi precisi**"}},
{id:"s38", tipo:"contatore", tema:"chiaro", sopratitolo:"Art. 47 · dati dell'art. 14 non comunicati", sep:"→",
  valori:[{n:500, t:"euro, minimo"}, {n:10, t:"**mila** euro, massimo", key:true}],
  sotto:"Patrimonio, **partecipazioni** in società, **compensi** dei titolari di incarichi."},
{id:"s39", tipo:"confronto", tema:"chiaro", sopratitolo:"La stessa sanzione", col:[
  {h:"Il dirigente", t:"che non comunica gli **emolumenti** complessivi"},
  {h:"Chi non pubblica", t:"i dati sui **pagamenti** dell'amministrazione", key:true}]},
{id:"s40", tipo:"icone", tema:"chiaro", sopratitolo:"E ancora", voci:[
  {icona:"ospedale", t:"Obblighi sugli **enti e società** controllate (art. 22)"},
  {icona:"persona",  t:"Amministratori che non comunicano **incarichi e compensi**"}]},
{id:"s41", tipo:"illustrata", tema:"chiaro", ill:"sito", sopratitolo:"Un esempio",
  titolo:"Il **direttore generale**", punti:[
    {icona:"euro", t:"non comunica compensi o **partecipazioni**"},
    {icona:"avviso", t:"rischia la **sanzione**, poi pubblicata", key:true}],
  etichette:{barra:"Sito dell'azienda", menu:{t:"Provvedimento pubblicato", key:true}}},
{id:"s42", tipo:"flusso", tema:"chiaro", sopratitolo:"Chi le irroga", passi:[
  {icona:"scudo", t:"L'ANAC", d:"irroga la sanzione", key:true},
  {icona:"libro", t:"Legge 689/1981", d:"sanzioni amministrative"},
  {icona:"documento", t:"Pubblicazione", d:"sul sito dell'ente"}]},
{id:"s43", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione", righe:[
  {sb:"La sanzione da 500 a 10.000 euro vale per ogni omessa pubblicazione",
   ok:"Per le altre: responsabilità dirigenziale, disciplinare e sulla performance"}]},
{id:"s44", tipo:"titolo", tema:"profondo",
  titolo:"Sanzioni **mirate**,<br>responsabilità **diffuse**."},

// --- 7 · le tre cose
{id:"s45", tipo:"memo", tema:"chiaro", attive:[0], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s46", tipo:"memo", tema:"chiaro", attive:[0,1], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s47", tipo:"memo", tema:"chiaro", attive:[0,1,2], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s48", tipo:"trappola", tema:"tenue", sopratitolo:"L'ultimo distrattore", righe:[
  {sb:"In azienda sanitaria la trasparenza è affare dell'ufficio informatico",
   ok:"Ogni ufficio che produce dati ne è responsabile"}]},

// --- 8 · chiusura
{id:"s49", tipo:"titolo", tema:"profondo",
  titolo:"Chi **controlla** dentro,<br>chi **vigila** fuori,<br>conseguenze **reali**.",
  sotto:"Prossimo modulo: il trattamento dei dati personali."},

{id:"s50", tipo:"copertina", tema:"profondo", modulo:"Prossimo modulo",
  titolo:"Modulo 7", sottotitolo:"Trattamento dei<br>dati personali", ente:ENTE},
];
