// Contenuto delle 50 scene della lezione 9.5. *accento*  **accento in semibold**
//
// Corso «Progressione verticale · Comparto Sanità», Modulo 9. DVR, formazione, DPI:
// D.Lgs. 81/2008 artt. 17, 28, 29, 36, 37, 74-78; Accordo Stato-Regioni 21/12/2011.

const ENTE = "CISL FP Padova Rovigo · Progressione verticale · Comparto Sanità";

const TRE_COSE = [
  "Il **DVR** riguarda tutti i rischi, ha **data certa**, si rielabora entro **30 giorni** quando cambia qualcosa di significativo",
  "**Informazione**, **formazione** e **addestramento** sono cose diverse; la formazione si fa in **orario di lavoro**",
  "I **DPI** sono l'ultima barriera: li sceglie e li fornisce **gratis** il datore, il lavoratore li usa e ne ha **cura**",
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 9 · Salute e sicurezza sul lavoro",
  titolo:"DVR, formazione, DPI", sottotitolo:"Lezione 9.5", ente:ENTE},

// --- 1 · aggancio
{id:"s02", tipo:"illustrata", tema:"chiaro", ill:"dpi", sopratitolo:"Il primo giorno in reparto",
  titolo:"Divisa, **guanti** e basta?", punti:[
    {icona:"persona", t:"un'infermiera **neoassunta**"},
    {icona:"chat", t:"«il resto lo impari **strada facendo**»", key:true}],
  etichette:{alto:{t:"È sufficiente?", key:true}}},
{id:"s03", tipo:"tre", tema:"chiaro", attive:[0,1,2], sopratitolo:"Prima di lavorare deve sapere", box:[
  {n:"1", t:"Quali rischi", d:"corre"},
  {n:"2", t:"Come proteggersi", d:"con quali mezzi"},
  {n:"3", t:"Cosa fare", d:"in caso di emergenza"}]},
{id:"s04", tipo:"titolo", tema:"profondo",
  titolo:"Prima si conosce il **rischio**,<br>poi si **lavora**."},

// --- 2 · rotta
{id:"s05", tipo:"flusso", tema:"chiaro", sopratitolo:"Quattro passaggi", passi:[
  {icona:"documento", t:"Il DVR"},
  {icona:"orologio", t:"Quando si aggiorna"},
  {icona:"cappello", t:"Formazione", key:true},
  {icona:"scudo", t:"I DPI"}]},

// --- 3 · il documento di valutazione
{id:"s06", tipo:"norma", tema:"chiaro", etichetta:"D.Lgs. 81/2008, art. 28, c. 1", sigla:"Art. 28",
  testo:"La valutazione riguarda **tutti i rischi** per la sicurezza e la salute, anche nella scelta di attrezzature e sostanze e nella sistemazione dei **luoghi di lavoro**."},
{id:"s07", tipo:"griglia", tema:"chiaro", colonne:5, spunta:true, sopratitolo:"Compresi i rischi di gruppi particolari", celle:[
  {t:"**Stress** lavoro correlato"}, {t:"Lavoratrici in **gravidanza**"}, {t:"Differenze di **genere**"},
  {t:"**Età** e provenienza"}, {t:"Tipologia del **contratto**"}]},
{id:"s08", tipo:"flusso", tema:"chiaro", sopratitolo:"Art. 29 · chi la fa", passi:[
  {icona:"giudice", t:"Il datore di lavoro", d:"la effettua"},
  {icona:"persone", t:"Con RSPP e medico", d:"che collaborano"},
  {icona:"chat", t:"Dopo il RLS", d:"che viene consultato", key:true}]},
{id:"s09", tipo:"illustrata", tema:"chiaro", ill:"firma", sopratitolo:"Il risultato",
  titolo:"Il documento di **valutazione dei rischi**", punti:[
    {icona:"orologio", t:"deve avere **data certa**", key:true},
    {icona:"persone", t:"anche con le **firme** di chi ha partecipato"}],
  etichette:{alto:{t:"DVR", key:true}, sx:"Datore", dx:"RSPP e medico"}},
{id:"s10", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Art. 28, c. 2 · che cosa contiene", celle:[
  {t:"La **relazione** sui rischi e i criteri"}, {t:"Le **misure** e i dispositivi adottati"},
  {t:"Il programma di **miglioramento**"}, {t:"Le **procedure** e i ruoli"}]},
{id:"s11", tipo:"icone", tema:"chiaro", sopratitolo:"E indica", voci:[
  {icona:"persone", t:"I nomi di **RSPP**, **RLS** e **medico competente**"},
  {icona:"avviso", t:"Le mansioni a **rischio specifico**"}]},
{id:"s12", tipo:"illustrata", tema:"chiaro", ill:"documento", sopratitolo:"Il RLS",
  titolo:"Riceve **copia** del documento", punti:[
    {icona:"chat", t:"su **richiesta**, anche in formato informatico"},
    {icona:"occhio", t:"e può **consultarlo** in azienda", key:true}],
  etichette:{titolo:"DVR", sigillo:{t:"Copia", key:true}}},
{id:"s13", tipo:"sostituzione", tema:"chiaro", sopratitolo:"Semplice, breve, comprensibile",
  da:{h:"Non", t:"un faldone da archivio"},
  a:{h:"Ma", t:"uno strumento **operativo**, custodito nell'unità produttiva"}},
{id:"s14", tipo:"trappola", tema:"tenue", sopratitolo:"Occhio a un distrattore", righe:[
  {sb:"Le firme sul DVR sono una formalità",
   ok:"Danno data certa; e la valutazione non si delega"}]},
{id:"s15", tipo:"titolo", tema:"profondo",
  titolo:"Un documento **vivo**,<br>non un faldone in **archivio**."},

// --- 4 · quando si aggiorna
{id:"s16", tipo:"illustrata", tema:"chiaro", ill:"organigramma", sopratitolo:"Art. 29, c. 3",
  titolo:"Si **rielabora** quando cambiano", punti:[
    {icona:"ingranaggio", t:"il **processo** di lavoro"},
    {icona:"persone", t:"l'**organizzazione**", key:true}],
  etichette:{top:{t:"Cambia", key:true}}},
{id:"s17", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"E ancora", celle:[
  {t:"Evoluzione della **tecnica**"}, {t:"**Infortuni** significativi"}, {t:"Esiti della **sorveglianza** sanitaria"}]},
{id:"s18", tipo:"scadenza", tema:"chiaro", sopratitolo:"Art. 29, c. 3 · i tempi",
  max:36, banda:[0,30], inizio:"cambiamento", fine:"",
  tappe:[{a:0, v:"subito", t:"misure e **RLS** informato"}, {a:30, v:"30 giorni", t:"DVR **rielaborato**", key:true}]},
{id:"s19", tipo:"illustrata", tema:"chiaro", ill:"ospedale", sopratitolo:"Un esempio",
  titolo:"Un reparto per pazienti **infettivi**", punti:[
    {icona:"avviso", t:"cambiano rischi, **percorsi**, dispositivi"},
    {icona:"documento", t:"la valutazione va **rifatta**, non basta una circolare", key:true}],
  etichette:{}},
{id:"s20", tipo:"contatore", tema:"chiaro", sopratitolo:"Art. 28, c. 3-bis · una nuova attività",
  valori:[{n:90, t:"giorni per completare il documento", key:true}],
  sotto:"La **valutazione** va fatta subito."},
{id:"s21", tipo:"confronto", tema:"chiaro", sopratitolo:"Le procedure standardizzate", col:[
  {h:"Per le aziende piccole", t:"**sì**"},
  {h:"Grandi strutture sanitarie, rischi chimici o biologici", t:"**no**", key:true}]},
{id:"s22", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione", righe:[
  {sb:"Il DVR scade ogni tre anni",
   ok:"Si aggiorna quando cambia qualcosa, entro 30 giorni"}]},
{id:"s23", tipo:"titolo", tema:"profondo",
  titolo:"Cambia il **lavoro**,<br>cambia la **valutazione**."},

// --- 5 · informazione, formazione, addestramento
{id:"s24", tipo:"illustrata", tema:"chiaro", ill:"estintore", sopratitolo:"Art. 36 · l'informazione",
  titolo:"Su che cosa", punti:[
    {icona:"avviso", t:"i rischi **generali** dell'azienda"},
    {icona:"cuoremano", t:"primo soccorso, **antincendio**, evacuazione", key:true}],
  etichette:{alto:{t:"Emergenze", key:true}}},
{id:"s25", tipo:"confronto", tema:"chiaro", sopratitolo:"E ancora", col:[
  {h:"I nomi", t:"di addetti alle **emergenze**, RSPP e **medico**"},
  {h:"I rischi specifici", t:"della sua attività e le **sostanze**", key:true}]},
{id:"s26", tipo:"confronto", tema:"chiaro", sopratitolo:"Un'informazione comprensibile", col:[
  {h:"Per tutti", t:"**chiara**"},
  {h:"Per i lavoratori stranieri", t:"verificare che capiscano la **lingua**", key:true}]},
{id:"s27", tipo:"griglia", tema:"chiaro", colonne:5, spunta:false, sopratitolo:"Art. 37 · la formazione generale", celle:[
  {t:"**Rischio**"}, {t:"**Danno**"}, {t:"**Prevenzione**"}, {t:"Diritti e **doveri**"}, {t:"Organi di **vigilanza**"}]},
{id:"s28", tipo:"confronto", tema:"chiaro", sopratitolo:"La formazione specifica", col:[
  {h:"Sui rischi", t:"della **mansione** e del **settore**"},
  {h:"Durata e contenuti", t:"negli accordi **Stato-Regioni**", key:true}]},
{id:"s29", tipo:"contatore", tema:"chiaro", sopratitolo:"Accordo 2011 · sanità a rischio alto", sep:"+",
  valori:[{n:4, t:"ore di formazione generale"}, {n:12, t:"ore di formazione specifica", key:true}],
  sotto:"Aggiornamento: **6 ore ogni 5 anni**. Un nuovo accordo nel **2025**."},
{id:"s30", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Quando si fa la formazione", celle:[
  {t:"All'**assunzione**"}, {t:"Al cambio di **mansione**"},
  {t:"Con nuove **attrezzature** o sostanze"}, {t:"E si **ripete** periodicamente"}]},
{id:"s31", tipo:"illustrata", tema:"chiaro", ill:"dpi", sopratitolo:"L'addestramento",
  titolo:"Sul luogo di lavoro, da una persona **esperta**", punti:[
    {icona:"ingranaggio", t:"l'uso del **sollevatore**"},
    {icona:"scudo", t:"la **vestizione** per l'isolamento", key:true}],
  etichette:{alto:{t:"Saper fare", key:true}}},
{id:"s32", tipo:"confronto", tema:"chiaro", sopratitolo:"Percorsi propri", col:[
  {h:"Dirigenti e preposti", t:"formazione **specifica**"},
  {h:"RLS", t:"formazione **iniziale** e aggiornamenti", key:true}]},
{id:"s33", tipo:"trappola", tema:"tenue", sopratitolo:"Un distrattore frequente", righe:[
  {sb:"La formazione si fa fuori orario, a spese del lavoratore",
   ok:"In orario di lavoro, senza costi per lui"}]},
{id:"s34", tipo:"titolo", tema:"profondo",
  titolo:"Informare, formare, **addestrare**:<br>tre passi **diversi**."},

// --- 6 · i dispositivi di protezione
{id:"s35", tipo:"illustrata", tema:"chiaro", ill:"dpi", sopratitolo:"Art. 74 · i DPI",
  titolo:"Dispositivi di protezione **individuale**", punti:[
    {icona:"persona", t:"**indossati** o tenuti dal lavoratore"},
    {icona:"scudo", t:"contro uno o più **rischi**", key:true}],
  etichette:{alto:{t:"Ultima barriera", key:true}, sx:"Mascherina", dx:"Occhiali"}},
{id:"s36", tipo:"catena", tema:"chiaro", sopratitolo:"Art. 75 · quando si usano", passi:[
  {t:"Misure tecniche"},
  {t:"Protezione collettiva"},
  {t:"Organizzazione"},
  {t:"Poi i DPI", d:"per il rischio residuo", key:true}]},
{id:"s37", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Art. 76 · i requisiti", celle:[
  {t:"**Conformi** alle norme europee"}, {t:"**Adeguati** ai rischi"},
  {t:"**Adatti** alla persona"}, {t:"**Compatibili** tra loro"}]},
{id:"s38", tipo:"flusso", tema:"chiaro", sopratitolo:"Art. 77 · il datore di lavoro", passi:[
  {icona:"occhio", t:"Sceglie", d:"dopo l'analisi dei rischi"},
  {icona:"euro", t:"Fornisce", d:"gratuitamente"},
  {icona:"ingranaggio", t:"Mantiene", d:"e sostituisce"},
  {icona:"cappello", t:"Forma", d:"sull'uso", key:true}]},
{id:"s39", tipo:"confronto", tema:"chiaro", sopratitolo:"Tre categorie", col:[
  {h:"La terza", t:"rischi **gravissimi**: morte o danni irreversibili"},
  {h:"Per questi", t:"addestramento **obbligatorio**", key:true}]},
{id:"s40", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Art. 78 · il lavoratore", celle:[
  {t:"Li **usa** correttamente"}, {t:"Ne ha **cura**"},
  {t:"Non li **modifica**"}, {t:"**Segnala** subito i difetti"}]},
{id:"s41", tipo:"confronto", tema:"chiaro", sopratitolo:"Uso personale", col:[
  {h:"Di regola", t:"i dispositivi sono **personali**"},
  {h:"Se li usano più persone", t:"misure per **igiene** e salute", key:true}]},
{id:"s42", tipo:"illustrata", tema:"chiaro", ill:"dpi", sopratitolo:"Un esempio in reparto",
  titolo:"Un paziente con **tubercolosi**", punti:[
    {icona:"occhio", t:"facciale filtrante scelto dopo la **valutazione**"},
    {icona:"spunta", t:"provato per la **tenuta**, indossato come da addestramento", key:true}],
  etichette:{alto:{t:"FFP", key:true}}},
{id:"s43", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione", righe:[
  {sb:"La mascherina chirurgica protegge sempre chi assiste",
   ok:"Protegge il paziente; per chi assiste servono i facciali filtranti"}]},
{id:"s44", tipo:"titolo", tema:"profondo",
  titolo:"Il dispositivo **giusto**,<br>scelto bene, usato **bene**."},

// --- 7 · le tre cose
{id:"s45", tipo:"memo", tema:"chiaro", attive:[0], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s46", tipo:"memo", tema:"chiaro", attive:[0,1], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s47", tipo:"memo", tema:"chiaro", attive:[0,1,2], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s48", tipo:"trappola", tema:"tenue", sopratitolo:"L'ultimo distrattore", righe:[
  {sb:"Il DVR si scrive una volta, all'apertura della struttura",
   ok:"Va tenuto aggiornato"}]},

// --- 8 · chiusura
{id:"s49", tipo:"titolo", tema:"profondo",
  titolo:"Valutare, scrivere, **aggiornare**,<br>formare, **proteggere**.",
  sotto:"Prossima lezione: i rischi specifici della sanità."},

{id:"s50", tipo:"copertina", tema:"profondo", modulo:"Prossima lezione",
  titolo:"Lezione 9.6", sottotitolo:"Rischi specifici in sanità", ente:ENTE},
];
