// Contenuto delle 50 scene della lezione 8.5. *accento*  **accento in semibold**
//
// Corso «Progressione verticale · Comparto Sanità», Modulo 8. Doveri e responsabilità disciplinare:
// art. 98 Cost.; D.Lgs. 165/2001 artt. 53, 54, 55, 55-bis, 55-ter, 55-quater; D.P.R. 62/2013 (agg. 2023).

const ENTE = "CISL FP Padova Rovigo · Progressione verticale · Comparto Sanità";

const TRE_COSE = [
  "Doveri: **diligenza**, **lealtà**, **imparzialità**, servizio esclusivo all'interesse pubblico; incarichi esterni **autorizzati**",
  "Codice di comportamento del **2013**, aggiornato nel **2023**, più quello dell'ente; regali solo di **modico valore**; violarlo è **illecito disciplinare**",
  "Sanzioni dal **rimprovero verbale** al **licenziamento**; contestazione entro **30 giorni**, preavviso di **20**, conclusione entro **120**",
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 8 · Normativa sul pubblico impiego",
  titolo:"Doveri e responsabilità<br>disciplinare", sottotitolo:"Lezione 8.5", ente:ENTE},

// --- 1 · aggancio
{id:"s02", tipo:"illustrata", tema:"chiaro", ill:"impronta", sopratitolo:"Un caso in reparto",
  titolo:"Timbra ed **esce**", punti:[
    {icona:"orologio", t:"timbra il **cartellino**"},
    {icona:"avviso", t:"esce per una commissione **privata**"},
    {icona:"persone", t:"un collega lo dice al **coordinatore**", key:true}],
  etichette:{alto:{t:"Presenza attestata", key:true}}},
{id:"s03", tipo:"confronto", tema:"chiaro", sopratitolo:"Che cosa succede adesso", col:[
  {h:"Un procedimento", t:"con **tempi** e **garanzie** di legge", key:true},
  {h:"Prima ancora", t:"i **doveri** di chi lavora per la PA"}]},
{id:"s04", tipo:"titolo", tema:"profondo",
  titolo:"Doveri **chiari**, sanzioni **proporzionate**,<br>un procedimento con **garanzie**."},

// --- 2 · rotta
{id:"s05", tipo:"flusso", tema:"chiaro", sopratitolo:"Quattro passaggi", passi:[
  {icona:"libro", t:"I doveri"},
  {icona:"documento", t:"Il codice di comportamento"},
  {icona:"bilancia", t:"Le sanzioni", key:true},
  {icona:"orologio", t:"Il procedimento"}]},

// --- 3 · i doveri
{id:"s06", tipo:"norma", tema:"chiaro", etichetta:"Costituzione, art. 98", sigla:"Art. 98",
  testo:"I pubblici impiegati sono al **servizio esclusivo della Nazione**."},
{id:"s07", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"D.Lgs. 165, art. 54 · i doveri", celle:[
  {t:"**Diligenza**"}, {t:"**Lealtà**"},
  {t:"**Imparzialità**"}, {t:"Servizio esclusivo all'**interesse pubblico**"}]},
{id:"s08", tipo:"icone", tema:"chiaro", sopratitolo:"In più, dal contratto collettivo", voci:[
  {icona:"orologio", t:"Rispettare l'**orario**"},
  {icona:"documento", t:"Eseguire le **disposizioni**"},
  {icona:"persone", t:"Correttezza con **colleghi** e utenti"}]},
{id:"s09", tipo:"illustrata", tema:"chiaro", ill:"cassaforte", sopratitolo:"La riservatezza",
  titolo:"Informazioni **d'ufficio**", punti:[
    {icona:"divieto", t:"non si usano a **fini privati**"},
    {icona:"lucchetto", t:"non si **diffondono** fuori dai casi previsti", key:true}],
  etichette:{alto:{t:"Riservato", key:true}}},
{id:"s10", tipo:"confronto", tema:"chiaro", sopratitolo:"Art. 53 · l'esclusività del rapporto", col:[
  {h:"Incompatibili", t:"**vietati**"},
  {h:"Altri incarichi retribuiti", t:"solo con **autorizzazione**", key:true}]},
{id:"s11", tipo:"flusso", tema:"chiaro", sopratitolo:"Un tecnico di radiologia e un centro privato", passi:[
  {icona:"documento", t:"Chiede", d:"l'autorizzazione prima"},
  {icona:"spunta", t:"Autorizzato", d:"può svolgere l'incarico"},
  {icona:"euro", t:"Senza", d:"il compenso va restituito", key:true}]},
{id:"s12", tipo:"trappola", tema:"tenue", sopratitolo:"Occhio a un distrattore", righe:[
  {sb:"Il divieto riguarda solo il secondo lavoro fisso",
   ok:"Anche un incarico occasionale non autorizzato è una violazione"}]},
{id:"s13", tipo:"titolo", tema:"profondo",
  titolo:"Al servizio della **Nazione**,<br>non di un interesse privato."},

// --- 4 · il codice di comportamento
{id:"s14", tipo:"confronto", tema:"chiaro", sopratitolo:"Due livelli", col:[
  {h:"Codice nazionale", t:"D.P.R. 62/**2013**, aggiornato nel **2023**"},
  {h:"Codice dell'ente", t:"lo **integra** e lo specifica", key:true}]},
{id:"s15", tipo:"icone", tema:"chiaro", sopratitolo:"D.P.R. 62, art. 4 · i regali", voci:[
  {icona:"divieto", t:"Non si **chiedono**"},
  {icona:"divieto", t:"Non si **accettano**"},
  {icona:"spunta", t:"Salvo quelli d'uso di **modico valore**, di norma fino a 150 €"},
  {icona:"divieto", t:"Mai in cambio di un **atto d'ufficio**"}]},
{id:"s16", tipo:"illustrata", tema:"chiaro", ill:"bilancia", sopratitolo:"Artt. 6 e 7 · il conflitto di interessi",
  titolo:"Astenersi e **comunicare**", punti:[
    {icona:"persona", t:"interessi propri, di **parenti**, di persone vicine"},
    {icona:"divieto", t:"il dipendente si **astiene** dalla decisione", key:true}],
  etichette:{alto:{t:"Imparzialità", key:true}, sx:"Interesse pubblico", dx:"Interesse privato"}},
{id:"s17", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"In servizio e con il pubblico", celle:[
  {t:"Non **ritardare** le pratiche"}, {t:"Usare con cura **beni** e strumenti"},
  {t:"Rispondere con **cortesia**"}, {t:"Farsi **riconoscere**"}]},
{id:"s18", tipo:"icone", tema:"chiaro", sopratitolo:"L'aggiornamento del 2023 · tecnologie e social", voci:[
  {icona:"divieto", t:"Dichiarazioni che danneggiano l'**immagine** dell'ente"},
  {icona:"divieto", t:"Uso **privato** degli strumenti di lavoro"}]},
{id:"s19", tipo:"flusso", tema:"chiaro", sopratitolo:"Art. 54, c. 3", passi:[
  {icona:"avviso", t:"Violare il codice"},
  {icona:"documento", t:"Illecito", d:"disciplinare"},
  {icona:"sigillo", t:"Fino al licenziamento", d:"se grave o ripetuta", key:true}]},
{id:"s20", tipo:"confronto", tema:"chiaro", sopratitolo:"Il familiare di un paziente, a Natale", col:[
  {h:"Una bottiglia di vino", t:"regalo d'uso di **modico valore**"},
  {h:"Una busta con denaro", t:"**no**", key:true}]},
{id:"s21", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione", righe:[
  {sb:"Il codice è un elenco di buone maniere senza conseguenze",
   ok:"La sua violazione è un illecito disciplinare"}]},
{id:"s22", tipo:"titolo", tema:"profondo",
  titolo:"Un codice che vale **ogni giorno**,<br>in ogni reparto."},

// --- 5 · le sanzioni
{id:"s23", tipo:"illustrata", tema:"chiaro", ill:"bilancia", sopratitolo:"Art. 55 · la regola del codice civile",
  titolo:"La **proporzionalità**", punti:[
    {icona:"bilancia", t:"art. **2106** del codice civile"},
    {icona:"spunta", t:"sanzione proporzionata alla **gravità**", key:true}],
  etichette:{alto:{t:"Art. 2106 c.c.", key:true}, sx:"Infrazione", dx:"Sanzione"}},
{id:"s24", tipo:"illustrata", tema:"chiaro", ill:"sito", sopratitolo:"Art. 55, c. 2 · il codice disciplinare",
  titolo:"Lo fissano i **contratti**", punti:[
    {icona:"libro", t:"infrazioni e sanzioni dai **contratti collettivi**"},
    {icona:"documento", t:"sul sito vale come l'**affissione**", key:true}],
  etichette:{barra:"Amministrazione trasparente", menu:{t:"Codice disciplinare", key:true}}},
{id:"s25", tipo:"confronto", tema:"chiaro", sopratitolo:"Art. 55, c. 3", col:[
  {h:"Conciliazione", t:"possibile, ma **non** nei casi da licenziamento"},
  {h:"Per impugnare", t:"il **giudice del lavoro**, nessun collegio interno", key:true}]},
{id:"s26", tipo:"catena", tema:"chiaro", sopratitolo:"La scala delle sanzioni · i primi gradi", passi:[
  {t:"Rimprovero verbale"},
  {t:"Rimprovero scritto"},
  {t:"Multa", d:"fino a 4 ore di retribuzione", key:true}]},
{id:"s27", tipo:"catena", tema:"chiaro", sopratitolo:"La scala delle sanzioni · i gradi più alti", passi:[
  {t:"Sospensione", d:"fino a 10 giorni"},
  {t:"Sospensione", d:"fino a 6 mesi"},
  {t:"Licenziamento", d:"con o senza preavviso", key:true}]},
{id:"s28", tipo:"illustrata", tema:"chiaro", ill:"impronta", sopratitolo:"Art. 55-quater · il licenziamento per legge",
  titolo:"La falsa **presenza**", punti:[
    {icona:"orologio", t:"falsa attestazione della **presenza** in servizio"},
    {icona:"avviso", t:"anche **alterando** il sistema di rilevazione", key:true}],
  etichette:{alto:{t:"Primo caso", key:true}}},
{id:"s29", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Art. 55-quater · altri casi", celle:[
  {t:"Assenze ingiustificate oltre **3 giorni** in un biennio"}, {t:"**Falsità** per assunzione o progressione"},
  {t:"Condotte **aggressive** o moleste"}, {t:"Condanne con **interdizione** dai pubblici uffici"}]},
{id:"s30", tipo:"confronto", tema:"chiaro", sopratitolo:"E ancora", col:[
  {h:"Codice di comportamento", t:"violazioni **gravi** o ripetute"},
  {h:"Performance", t:"valutazione negativa per **3 anni**", key:true}]},
{id:"s31", tipo:"trappola", tema:"tenue", sopratitolo:"Un distrattore frequente", righe:[
  {sb:"La sospensione dal servizio può arrivare a un anno",
   ok:"Il massimo previsto dai contratti è di sei mesi"}]},
{id:"s32", tipo:"titolo", tema:"profondo",
  titolo:"Una **scala** di sanzioni,<br>proporzionate alla **gravità**."},

// --- 6 · il procedimento
{id:"s33", tipo:"confronto", tema:"chiaro", sopratitolo:"Art. 55-bis · chi decide", col:[
  {h:"Rimprovero verbale", t:"il **responsabile** della struttura"},
  {h:"Tutto il resto", t:"l'**ufficio per i procedimenti disciplinari**", key:true}]},
{id:"s34", tipo:"scadenza", tema:"chiaro", sopratitolo:"La segnalazione all'ufficio (giorni)",
  max:12, banda:[0,10], inizio:"i fatti", fine:"",
  tappe:[{a:10, v:"10", t:"segnalazione **entro**", key:true}]},
{id:"s35", tipo:"scadenza", tema:"chiaro", sopratitolo:"La contestazione scritta (giorni)",
  max:35, banda:[0,30], inizio:"segnalazione o piena conoscenza", fine:"",
  tappe:[{a:30, v:"30", t:"contestazione **entro**", key:true}]},
{id:"s36", tipo:"illustrata", tema:"chiaro", ill:"sportello", sopratitolo:"L'audizione a difesa",
  titolo:"Almeno **20 giorni** di preavviso", punti:[
    {icona:"orologio", t:"convocazione con **preavviso** minimo"},
    {icona:"persone", t:"assistenza di un **avvocato** o del **sindacato**", key:true}],
  etichette:{insegna:"Ufficio procedimenti disciplinari", sx:"Dipendente", dx:{t:"Assistenza", key:true}}},
{id:"s37", tipo:"icone", tema:"chiaro", sopratitolo:"Come arriva la contestazione", voci:[
  {icona:"chat", t:"**PEC**, se il dipendente ne ha una"},
  {icona:"persona", t:"Consegna **a mano**"},
  {icona:"documento", t:"**Raccomandata**"}]},
{id:"s38", tipo:"scadenza", tema:"chiaro", sopratitolo:"La conclusione (giorni)",
  max:130, banda:[0,120], inizio:"contestazione", fine:"",
  tappe:[{a:120, v:"120", t:"archiviazione o **sanzione**", key:true}],
  sotto:"Termini di contestazione e conclusione **perentori**."},
{id:"s39", tipo:"flusso", tema:"chiaro", sopratitolo:"Se il dipendente cambia amministrazione", passi:[
  {icona:"ospedale", t:"Avviato", d:"nell'ente di partenza"},
  {icona:"persona", t:"Trasferimento"},
  {icona:"ospedale", t:"Prosegue", d:"nel nuovo ente, con nuovi termini", key:true}]},
{id:"s40", tipo:"contatore", tema:"chiaro", sopratitolo:"Falsa attestazione · la corsia rapida",
  valori:[{n:48, t:"ore per la sospensione cautelare senza stipendio", key:true}],
  sotto:"Da quando il fatto è noto, poi un procedimento **accelerato**."},
{id:"s41", tipo:"catena", tema:"chiaro", sopratitolo:"Torniamo al cartellino", passi:[
  {t:"Segnalazione"},
  {t:"Sospensione", d:"cautelare"},
  {t:"Contestazione", d:"e audizione"},
  {t:"Licenziamento", d:"se provato", key:true}]},
{id:"s42", tipo:"confronto", tema:"chiaro", sopratitolo:"Artt. 55-ter e 55-sexies", col:[
  {h:"Processo penale", t:"il disciplinare **va avanti**"},
  {h:"Il dirigente inerte", t:"ne risponde **a sua volta**", key:true}]},
{id:"s43", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione", righe:[
  {sb:"L'addebito si contesta entro venti giorni",
   ok:"Entro trenta; venti è il preavviso per l'audizione"}]},
{id:"s44", tipo:"titolo", tema:"profondo",
  titolo:"**Trenta** giorni per contestare,<br>**centoventi** per concludere."},

// --- 7 · le tre cose
{id:"s45", tipo:"memo", tema:"chiaro", attive:[0], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s46", tipo:"memo", tema:"chiaro", attive:[0,1], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s47", tipo:"memo", tema:"chiaro", attive:[0,1,2], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s48", tipo:"trappola", tema:"tenue", sopratitolo:"L'ultimo distrattore", righe:[
  {sb:"Il rimprovero verbale lo decide l'ufficio disciplinare",
   ok:"Lo decide il responsabile della struttura"}]},

// --- 8 · chiusura
{id:"s49", tipo:"titolo", tema:"profondo",
  titolo:"Doveri **chiari**, un codice<br>di ogni giorno, sanzioni<br>**proporzionate**, termini **certi**.",
  sotto:"Ultima lezione del modulo: performance, mobilità e lavoro agile."},

{id:"s50", tipo:"copertina", tema:"profondo", modulo:"Prossima lezione",
  titolo:"Lezione 8.6", sottotitolo:"Performance, mobilità,<br>lavoro agile", ente:ENTE},
];
