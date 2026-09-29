// Contenuto delle 50 scene della lezione 9.6. *accento*  **accento in semibold**
//
// Corso «Progressione verticale · Comparto Sanità», Modulo 9. Rischi specifici in sanità:
// D.Lgs. 81/2008 Titoli VI, IX, X, X-bis; artt. 41, 43-46, 55-59; D.Lgs. 101/2020; L. 113/2020; D.Lgs. 758/1994.

const ENTE = "CISL FP Padova Rovigo · Progressione verticale · Comparto Sanità";

const TRE_COSE = [
  "Agenti biologici in **quattro gruppi**; per i taglienti **niente reincappucciamento** e dispositivi con protezione",
  "Contro la movimentazione, prima **ausili** e organizzazione; **stress** e **aggressioni** sono rischi da prevenire",
  "Sorveglianza: visite **preventive**, **periodiche**, su richiesta; ricorso entro **30 giorni** all'organo di vigilanza",
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 9 · Salute e sicurezza sul lavoro",
  titolo:"Rischi specifici in sanità", sottotitolo:"Lezione 9.6", ente:ENTE},

// --- 1 · aggancio
{id:"s02", tipo:"griglia", tema:"chiaro", colonne:5, spunta:false, sopratitolo:"Un solo turno di notte", celle:[
  {t:"**Aghi**"}, {t:"Farmaci **pericolosi**"}, {t:"Pazienti da **sollevare**"}, {t:"**Radiologia**"}, {t:"Un familiare **aggressivo**"}]},
{id:"s03", tipo:"illustrata", tema:"chiaro", ill:"ospedale", sopratitolo:"La sanità",
  titolo:"Classificata a **rischio alto**", punti:[
    {icona:"libro", t:"il decreto 81 dedica **titoli interi** ai suoi rischi", key:true}],
  etichette:{}},
{id:"s04", tipo:"titolo", tema:"profondo",
  titolo:"In ospedale i rischi non si **sommano**:<br>si **intrecciano**."},

// --- 2 · rotta
{id:"s05", tipo:"flusso", tema:"chiaro", sopratitolo:"Quattro passaggi", passi:[
  {icona:"goccia", t:"Biologico e aghi"},
  {icona:"avviso", t:"Chimico, carichi, radiazioni"},
  {icona:"persone", t:"Stress ed emergenze", key:true},
  {icona:"giudice", t:"Sorveglianza e sanzioni"}]},

// --- 3 · il rischio biologico
{id:"s06", tipo:"illustrata", tema:"chiaro", ill:"microscopio", sopratitolo:"Titolo X",
  titolo:"Il rischio **biologico**", punti:[
    {icona:"goccia", t:"virus, batteri, altri **microrganismi**"},
    {icona:"avviso", t:"che possono causare **infezioni**", key:true}],
  etichette:{}},
{id:"s07", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Art. 268 · quattro gruppi, secondo", celle:[
  {t:"La **gravità** della malattia"}, {t:"La capacità di **diffondersi**"}, {t:"Cure o **profilassi** disponibili"}]},
{id:"s08", tipo:"confronto", tema:"chiaro", sopratitolo:"Dal primo al quarto", col:[
  {h:"Gruppo 1", t:"difficilmente causa **malattie**"},
  {h:"Gruppo 4", t:"malattie **gravi**, si diffonde, di solito **senza cure**", key:true}]},
{id:"s09", tipo:"flusso", tema:"chiaro", sopratitolo:"Il datore di lavoro", passi:[
  {icona:"occhio", t:"Valuta", d:"il rischio biologico"},
  {icona:"ingranaggio", t:"Adotta misure", d:"tecniche e organizzative"},
  {icona:"scudo", t:"Fornisce", d:"i dispositivi"},
  {icona:"cuoremano", t:"Offre i vaccini", d:"col medico competente", key:true}]},
{id:"s10", tipo:"illustrata", tema:"chiaro", ill:"siringa", sopratitolo:"Titolo X-bis · dal 2014",
  titolo:"Le ferite da **taglienti**", punti:[
    {icona:"avviso", t:"aghi, **bisturi**, lame"},
    {icona:"libro", t:"recepisce una **direttiva europea**", key:true}],
  etichette:{alto:{t:"Taglienti", key:true}}},
{id:"s11", tipo:"icone", tema:"chiaro", sopratitolo:"Le regole", voci:[
  {icona:"divieto", t:"Eliminare il **reincappucciamento**"},
  {icona:"scudo", t:"Dispositivi con **protezione**"},
  {icona:"lucchetto", t:"Contenitori **rigidi** vicini"}]},
{id:"s12", tipo:"catena", tema:"chiaro", sopratitolo:"Se l'incidente avviene", passi:[
  {t:"Segnalare", d:"subito"},
  {t:"Assistenza", d:"e profilassi"},
  {t:"Controlli"},
  {t:"Analisi", d:"perché non si ripeta", key:true}]},
{id:"s13", tipo:"illustrata", tema:"chiaro", ill:"siringa", sopratitolo:"Un esempio",
  titolo:"Una puntura con un ago **usato**", punti:[
    {icona:"chat", t:"segnala **subito**"},
    {icona:"cuoremano", t:"riceve la **profilassi**"},
    {icona:"orologio", t:"segue i **controlli** nei mesi successivi", key:true}],
  etichette:{alto:{t:"Epatite", key:true}}},
{id:"s14", tipo:"trappola", tema:"tenue", sopratitolo:"Occhio a un distrattore", righe:[
  {sb:"Reincappucciare l'ago con due mani è una buona pratica",
   ok:"È proprio il gesto che la norma chiede di eliminare"}]},
{id:"s15", tipo:"titolo", tema:"profondo",
  titolo:"L'ago non si **rincappuccia**:<br>si getta **subito**."},

// --- 4 · chimico, carichi, radiazioni
{id:"s16", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Il rischio chimico in sanità", celle:[
  {t:"**Disinfettanti**"}, {t:"Gas **anestetici**"},
  {t:"Farmaci **antiblastici**"}, {t:"**Formaldeide** in anatomia patologica"}]},
{id:"s17", tipo:"flusso", tema:"chiaro", sopratitolo:"Per i cancerogeni, regole più severe", passi:[
  {icona:"spunta", t:"Sostituire", d:"quando possibile"},
  {icona:"lucchetto", t:"Sistemi chiusi"},
  {icona:"ingranaggio", t:"Cappe aspiranti"},
  {icona:"cartella", t:"Registro", d:"degli esposti", key:true}]},
{id:"s18", tipo:"illustrata", tema:"chiaro", ill:"documento", sopratitolo:"Ogni sostanza pericolosa",
  titolo:"La **scheda di sicurezza**", punti:[
    {icona:"avviso", t:"pericoli e **precauzioni**"},
    {icona:"cuoremano", t:"cosa fare in caso di **contatto** o sversamento", key:true}],
  etichette:{titolo:"Scheda", sigillo:{t:"Disponibile", key:true}}},
{id:"s19", tipo:"confronto", tema:"chiaro", sopratitolo:"Titolo VI · la movimentazione dei carichi", col:[
  {h:"In sanità il carico più frequente", t:"è il **paziente**"},
  {h:"I disturbi alla schiena", t:"tra le malattie più **diffuse**", key:true}]},
{id:"s20", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"Evitare la movimentazione manuale", celle:[
  {t:"**Sollevatori**"}, {t:"Teli ad alto **scorrimento**"}, {t:"Personale **sufficiente**"}]},
{id:"s21", tipo:"confronto", tema:"chiaro", sopratitolo:"Radiazioni ionizzanti", col:[
  {h:"Dove", t:"radiologia, medicina **nucleare**, sala operatoria"},
  {h:"La norma", t:"un decreto specifico del **2020**", key:true}]},
{id:"s22", tipo:"confronto", tema:"chiaro", sopratitolo:"Due figure", col:[
  {h:"L'esperto di radioprotezione", t:"sorveglianza **fisica** e dosimetri"},
  {h:"Il medico autorizzato", t:"la **salute** dei più esposti", key:true}]},
{id:"s23", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione", righe:[
  {sb:"Contro il mal di schiena basta la fascia lombare",
   ok:"Prima misura: evitare di sollevare a mano, con ausili e organizzazione"}]},
{id:"s24", tipo:"titolo", tema:"profondo",
  titolo:"Prima gli **ausili**,<br>poi la forza delle **braccia**."},

// --- 5 · stress, aggressioni, emergenze
{id:"s25", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Lo stress lavoro correlato", celle:[
  {t:"**Turni**"}, {t:"Carichi di **lavoro**"},
  {t:"**Conflitti**"}, {t:"Poca **autonomia**"}]},
{id:"s26", tipo:"catena", tema:"chiaro", sopratitolo:"Come si valuta", passi:[
  {t:"Indicatori", d:"assenze, infortuni"},
  {t:"Approfondimento", d:"ascoltando i lavoratori"},
  {t:"Misure", d:"organizzative", key:true}]},
{id:"s27", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Le aggressioni al personale", celle:[
  {t:"Pronto **soccorso**"}, {t:"**Psichiatria**"}, {t:"Servizi al **pubblico**"}]},
{id:"s28", tipo:"icone", tema:"chiaro", sopratitolo:"La legge del 2020", voci:[
  {icona:"giudice", t:"Pene più **severe**"},
  {icona:"occhio", t:"Un **osservatorio** nazionale"},
  {icona:"orologio", t:"Una giornata, il **12 marzo**"}]},
{id:"s29", tipo:"flusso", tema:"chiaro", sopratitolo:"La raccomandazione del ministero", passi:[
  {icona:"occhio", t:"Valutare", d:"i rischi"},
  {icona:"ospedale", t:"Organizzare", d:"gli spazi"},
  {icona:"cappello", t:"Formare"},
  {icona:"chat", t:"Segnalare", d:"ogni episodio", key:true}]},
{id:"s30", tipo:"illustrata", tema:"chiaro", ill:"estintore", sopratitolo:"Art. 43 · le emergenze",
  titolo:"Il datore **organizza**", punti:[
    {icona:"cuoremano", t:"primo **soccorso**"},
    {icona:"avviso", t:"**antincendio** ed evacuazione"},
    {icona:"persone", t:"designa gli **addetti**, formati", key:true}],
  etichette:{alto:{t:"Emergenza", key:true}}},
{id:"s31", tipo:"confronto", tema:"chiaro", sopratitolo:"Tutti coinvolti", col:[
  {h:"Chi è designato", t:"non può **rifiutare**, salvo giustificato motivo"},
  {h:"Tutti", t:"conoscono il **piano** e le vie di fuga", key:true}]},
{id:"s32", tipo:"illustrata", tema:"chiaro", ill:"ospedale", sopratitolo:"Un esempio in ospedale",
  titolo:"L'evacuazione **orizzontale**", punti:[
    {icona:"persona", t:"molti pazienti non possono **camminare**"},
    {icona:"scudo", t:"verso un **compartimento** vicino e protetto", key:true}],
  etichette:{}},
{id:"s33", tipo:"trappola", tema:"tenue", sopratitolo:"Un distrattore frequente", righe:[
  {sb:"L'aggressione è un rischio del mestiere da accettare",
   ok:"Va prevenuta, valutata e sempre segnalata"}]},
{id:"s34", tipo:"titolo", tema:"profondo",
  titolo:"Anche la **violenza**<br>è un rischio da **prevenire**."},

// --- 6 · sorveglianza sanitaria e sanzioni
{id:"s35", tipo:"illustrata", tema:"chiaro", ill:"cartellaclinica", sopratitolo:"Art. 41",
  titolo:"La sorveglianza **sanitaria**", punti:[
    {icona:"persona", t:"la svolge il **medico competente**"},
    {icona:"avviso", t:"per i lavoratori **esposti** a rischi che la richiedono", key:true}],
  etichette:{}},
{id:"s36", tipo:"confronto", tema:"chiaro", sopratitolo:"Le visite", col:[
  {h:"Preventiva", t:"**prima** della mansione"},
  {h:"Periodica", t:"di norma **una volta all'anno**", key:true}]},
{id:"s37", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"E ancora", celle:[
  {t:"Su **richiesta** del lavoratore"}, {t:"Al cambio di **mansione**"},
  {t:"Alla **cessazione**, nei casi previsti"}, {t:"Al **rientro** dopo oltre 60 giorni"}]},
{id:"s38", tipo:"contatore", tema:"chiaro", sopratitolo:"Il ricorso contro il giudizio",
  valori:[{n:30, t:"giorni dalla comunicazione", key:true}],
  sotto:"All'**organo di vigilanza** territorialmente competente."},
{id:"s39", tipo:"confronto", tema:"chiaro", sopratitolo:"Limiti e garanzie", col:[
  {h:"Le visite non servono", t:"ad accertare la **gravidanza**"},
  {h:"Il giudizio", t:"per **iscritto**, a lavoratore e datore", key:true}]},
{id:"s40", tipo:"griglia", tema:"chiaro", colonne:5, spunta:false, sopratitolo:"Contravvenzioni: arresto o ammenda per", celle:[
  {t:"**Datori** di lavoro"}, {t:"**Dirigenti**"}, {t:"**Preposti**"}, {t:"**Medici** competenti"}, {t:"**Lavoratori**"}]},
{id:"s41", tipo:"confronto", tema:"chiaro", sopratitolo:"Art. 55 · per esempio", col:[
  {h:"Nessuna valutazione o nessun RSPP", t:"il datore di lavoro"},
  {h:"Rischia", t:"l'**arresto** da tre a sei mesi o l'**ammenda**", key:true}]},
{id:"s42", tipo:"catena", tema:"chiaro", sopratitolo:"D.Lgs. 758/1994 · la prescrizione", passi:[
  {t:"Prescrizione", d:"con un termine"},
  {t:"Adempimento"},
  {t:"Somma ridotta"},
  {t:"Reato estinto", key:true}]},
{id:"s43", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione", righe:[
  {sb:"Le sanzioni riguardano solo il datore di lavoro",
   ok:"Anche il lavoratore può essere sanzionato"}]},
{id:"s44", tipo:"titolo", tema:"profondo",
  titolo:"Visite per **proteggere**,<br>sanzioni per **correggere**."},

// --- 7 · le tre cose
{id:"s45", tipo:"memo", tema:"chiaro", attive:[0], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s46", tipo:"memo", tema:"chiaro", attive:[0,1], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s47", tipo:"memo", tema:"chiaro", attive:[0,1,2], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s48", tipo:"trappola", tema:"tenue", sopratitolo:"L'ultimo distrattore", righe:[
  {sb:"Il ricorso contro il giudizio si presenta al datore di lavoro",
   ok:"Si presenta all'organo di vigilanza"}]},

// --- 8 · chiusura
{id:"s49", tipo:"titolo", tema:"profondo",
  titolo:"Conoscere i **rischi**, prevenirli,<br>sorvegliare la **salute**.",
  sotto:"Prossimo modulo: appalti pubblici e codice dei contratti."},

{id:"s50", tipo:"copertina", tema:"profondo", modulo:"Prossimo modulo",
  titolo:"Modulo 10", sottotitolo:"Appalti pubblici", ente:ENTE},
];
