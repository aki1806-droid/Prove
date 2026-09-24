// Contenuto delle 49 scene della lezione 4.5. *accento*  **accento in semibold**
//
// Corso «Progressione verticale · Comparto Sanità», Modulo 4. Governo clinico e continuità
// assistenziale: il governo clinico; i PDTA (contenuti e stesura regionale); il rischio clinico
// (DGRV 1831/2008, risk manager, incident reporting, audit); la continuità (COT, UVMD,
// dimissione protetta). Fonti: PSSR Veneto 2019-2023; atto aziendale ULSS 5 Polesana.

const ENTE = "CISL FP Padova Rovigo · Progressione verticale · Comparto Sanità";

const TRE_COSE = [
  "Il **governo clinico** è un metodo di **miglioramento continuo** di qualità e sicurezza: PDTA e **audit clinico**",
  "Il **PDTA** fissa interventi, luoghi, **tempi**, professionisti ed **esiti**; gruppo multidisciplinare, **decreto regionale**",
  "Il **risk manager** lo nomina il **DG** su proposta del **DS**: segnalazioni e audit. La **COT** è la centrale della continuità",
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 4 · Organizzazione aziendale e AOUPD",
  titolo:"Governo clinico<br>e continuità assistenziale", sottotitolo:"Lezione 4.5", ente:ENTE},

// --- 1 · aggancio
{id:"s02", tipo:"illustrata", tema:"chiaro", ill:"percorso", sopratitolo:"Un paziente con scompenso cardiaco",
  titolo:"Un'unica **storia** di cura", punti:[
    {icona:"ospedale", t:"pronto soccorso e **reparto**"},
    {icona:"cuoremano", t:"a casa, dal **medico di famiglia**"},
    {icona:"persone", t:"decine di **professionisti**", key:true}],
  etichette:{p1:"Casa", p2:"Pronto soccorso", p3:{t:"Reparto", key:true}, p4:"Medico"}},
{id:"s03", tipo:"tre", tema:"chiaro", attive:[0,1,2], sopratitolo:"Perché vada bene servono tre cose", box:[
  {n:"1", t:"Governare la qualità"},
  {n:"2", t:"Un percorso scritto", d:"che tutti seguono"},
  {n:"3", t:"Un passaggio sicuro", d:"da un luogo all'altro"}]},
{id:"s04", tipo:"titolo", tema:"profondo",
  titolo:"Curare bene non basta:<br>bisogna curare bene **insieme**,<br>e in **sicurezza**."},

// --- 2 · rotta
{id:"s05", tipo:"flusso", tema:"chiaro", sopratitolo:"Quattro passaggi", passi:[
  {icona:"ingranaggio", t:"Il governo clinico"},
  {icona:"documento", t:"I PDTA", d:"i percorsi"},
  {icona:"scudo", t:"Il rischio clinico"},
  {icona:"persone", t:"La continuità", d:"ospedale e territorio", key:true}]},

// --- 3 · il governo clinico
{id:"s06", tipo:"illustrata", tema:"chiaro", ill:"scudo", sopratitolo:"Che cos'è il governo clinico",
  titolo:"Un **metodo**", punti:[
    {icona:"ingranaggio", t:"per migliorare in modo **continuo**"},
    {icona:"scudo", t:"**qualità** e **sicurezza** dei servizi"},
    {icona:"spunta", t:"standard **elevati** e **appropriati**", key:true}],
  etichette:{alto:{t:"Governo clinico", key:true}}},
{id:"s07", tipo:"confronto", tema:"chiaro", sopratitolo:"Guarda a due cose insieme", col:[
  {h:"Il percorso", t:"**efficacia** ed **efficienza**", grande:true},
  {h:"Il paziente", t:"al **centro**, anche con la **comunicazione**", grande:true}]},
{id:"s08", tipo:"icone", tema:"chiaro", sopratitolo:"Gli obiettivi nel piano socio sanitario del Veneto", voci:[
  {icona:"persone",     t:"Assistenza **multidisciplinare**"},
  {icona:"cuoremano",   t:"**Centrata** sul paziente"},
  {icona:"libro",       t:"Linee guida e **buone pratiche**"},
  {icona:"certificato", t:"Fondate sulle **prove**"}]},
{id:"s09", tipo:"ciclo", tema:"chiaro", sopratitolo:"E i suoi strumenti",
  centro:"Governo clinico", fasi:[
  {icona:"documento", t:"PDTA"},
  {icona:"scudo", t:"Gestione del rischio"},
  {icona:"occhio", t:"Audit clinico", key:true},
  {icona:"persone", t:"Responsabilità degli operatori"}]},
{id:"s10", tipo:"illustrata", tema:"chiaro", ill:"tavolo", sopratitolo:"Chi lo promuove · lezione 4.3",
  titolo:"Il collegio di **direzione**", punti:[
    {icona:"persona", t:"sostiene la **direzione**"},
    {icona:"occhio", t:"cura un sistema di **audit clinico**", key:true}],
  etichette:{alto:{t:"Collegio di direzione", key:true}}},
{id:"s11", tipo:"trappola", tema:"tenue", sopratitolo:"Occhio a un distrattore", righe:[
  {sb:"Il governo clinico è un ufficio che riguarda solo i medici",
   ok:"È un metodo che coinvolge tutte le professioni, infermieri e tecnici compresi"}]},
{id:"s12", tipo:"titolo", tema:"profondo",
  titolo:"Migliorare **ogni giorno**,<br>tutti insieme,<br>misurando i **risultati**."},

// --- 4 · i PDTA
{id:"s13", tipo:"sigla", tema:"chiaro", sopratitolo:"Il percorso del paziente nelle reti cliniche",
  lettere:[{l:"P", p:"Percorso"},{l:"D", p:"Diagnostico"},{l:"T", p:"Terapeutico"},{l:"A", p:"Assistenziale", key:true}],
  sotto:"Il cammino **più razionale**, per il **miglior esito** delle cure."},
{id:"s14", tipo:"illustrata", tema:"chiaro", ill:"percorso", sopratitolo:"Uno strumento trasversale",
  titolo:"Collega ruoli e **funzioni**", punti:[
    {icona:"persone", t:"garantisce la **continuità**"},
    {icona:"ingranaggio", t:"azioni **riproducibili**"},
    {icona:"spunta", t:"prestazioni **uniformi**", key:true}],
  etichette:{p1:"Territorio", p3:{t:"Ospedale", key:true}}},
{id:"s15", tipo:"confronto", tema:"chiaro", sopratitolo:"Per questo è anche", col:[
  {h:"Controllo", t:"dell'**appropriatezza**", grande:true},
  {h:"Tutela", t:"del **professionista**", grande:true}]},
{id:"s16", tipo:"griglia", tema:"chiaro", colonne:2, sopratitolo:"Per una patologia, il PDTA definisce", celle:[
  {t:"Gli **interventi** più appropriati"}, {t:"Per **diagnosi**, **terapia** e **assistenza**"},
  {t:"I **nodi della rete** dove erogarli"}, {t:"Il **luogo** giusto per ogni fase"}]},
{id:"s17", tipo:"icone", tema:"chiaro", sopratitolo:"E ancora", voci:[
  {icona:"orologio", t:"I **tempi** entro cui erogarli"},
  {icona:"persone",  t:"Il **coinvolgimento** dei professionisti"},
  {icona:"spunta",   t:"I **risultati** e gli **esiti** da verificare"}]},
{id:"s18", tipo:"illustrata", tema:"chiaro", ill:"tavolo", sopratitolo:"Come si scrive un PDTA regionale",
  titolo:"Un gruppo **multidisciplinare**", punti:[
    {icona:"persona", t:"coordinato dal responsabile della **rete clinica**"},
    {icona:"libro", t:"buone pratiche, **linee guida**, letteratura", key:true}],
  etichette:{alto:{t:"Gruppo multidisciplinare", key:true}}},
{id:"s19", tipo:"flusso", tema:"chiaro", sopratitolo:"Il cammino della stesura", passi:[
  {icona:"persone", t:"Gruppo di lavoro", d:"supporto di Azienda Zero"},
  {icona:"euro", t:"Sostenibilità", d:"valutata dalla CRITE"},
  {icona:"certificato", t:"Decreto regionale", d:"Area Sanità e Sociale", key:true}]},
{id:"s20", tipo:"norma", tema:"chiaro", etichetta:"Chi lo adotta", sigla:"Decreto regionale",
  testo:"Del direttore dell'**Area Sanità e Sociale**. Poi le aziende lo declinano nei propri **percorsi interni**."},
{id:"s21", tipo:"illustrata", tema:"chiaro", ill:"percorso", sopratitolo:"Un esempio: il percorso dello scompenso",
  titolo:"Scritto **passo per passo**", punti:[
    {icona:"persona", t:"dallo **specialista** al medico di famiglia"},
    {icona:"orologio", t:"quali **controlli** a domicilio, e ogni quanto", key:true}],
  etichette:{p2:"Specialista", p4:{t:"Domicilio", key:true}}},
{id:"s22", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione a non confondere", righe:[
  {sb:"Il PDTA è una linea guida",
   ok:"La linea guida dice che cosa è efficace; il PDTA dice chi fa che cosa, dove e quando"}]},
{id:"s23", tipo:"titolo", tema:"profondo",
  titolo:"Un percorso scritto **insieme**:<br>chi fa che cosa, dove,<br>entro **quando**."},

// --- 5 · il rischio clinico
{id:"s24", tipo:"illustrata", tema:"chiaro", ill:"lente", sopratitolo:"Ogni attività sanitaria comporta dei rischi",
  titolo:"Da dove nasce un **evento avverso**", punti:[
    {icona:"persona", t:"da una **condotta** professionale"},
    {icona:"ingranaggio", t:"dall'**organizzazione** e dalla gestione"},
    {icona:"euro", t:"dalle **risorse**", key:true}],
  etichette:{titolo:{t:"Evento avverso", key:true}}},
{id:"s25", tipo:"confronto", tema:"chiaro", sopratitolo:"Due gruppi di rischio", col:[
  {h:"Clinico-professionali", t:"legati alle attività dei **singoli professionisti**"},
  {h:"Di gestione aziendale", t:"legati a **organizzazione** e **processi**"}]},
{id:"s26", tipo:"norma", tema:"chiaro", etichetta:"La sicurezza delle cure", sigla:"L. 24/2017",
  testo:"Nel Veneto, un **centro regionale** per la gestione del rischio sanitario e la **sicurezza del paziente**."},
{id:"s27", tipo:"illustrata", tema:"chiaro", ill:"organigramma", sopratitolo:"In azienda · il modello della DGRV 1831/2008",
  titolo:"Il **risk manager**", punti:[
    {icona:"persona", t:"responsabile aziendale del **rischio clinico**", key:true},
    {icona:"persone", t:"con comitati, uffici e **medicina legale**"}],
  etichette:{top:{t:"Risk manager", key:true}, basso:"Referenti di dipartimento"}},
{id:"s28", tipo:"flusso", tema:"chiaro", sopratitolo:"Chi lo nomina e che cosa coordina", passi:[
  {icona:"persona", t:"Il DS", d:"propone"},
  {icona:"certificato", t:"Il DG", d:"nomina"},
  {icona:"persone", t:"Il risk manager", d:"coordina i referenti, presiede il comitato", key:true}]},
{id:"s29", tipo:"illustrata", tema:"chiaro", ill:"documento", sopratitolo:"Lo strumento di base: la segnalazione",
  titolo:"L'**incident reporting**", punti:[
    {icona:"lucchetto", t:"anche **anonima**"},
    {icona:"avviso", t:"eventi **avversi**"},
    {icona:"occhio", t:"e quasi eventi, i **near miss**", key:true}],
  etichette:{titolo:{t:"Scheda di segnalazione", key:true}, sigillo:"Near miss"}},
{id:"s30", tipo:"ciclo", tema:"chiaro", sopratitolo:"L'audit: un ciclo di miglioramento",
  centro:"Audit", fasi:[
  {icona:"avviso", t:"Segnalazione"},
  {icona:"occhio", t:"Ricostruire le cause"},
  {icona:"ingranaggio", t:"Cambiare il processo"},
  {icona:"spunta", t:"Verificare", key:true}]},
{id:"s31", tipo:"sostituzione", tema:"chiaro", sopratitolo:"La cultura che regge tutto",
  da:{h:"Non", t:"nascondere l'errore"},
  a:{h:"Ma", t:"**imparare** dall'errore"},
  sotto:"Una cultura della **non colpevolizzazione**, con la formazione di **tutto** il personale."},
{id:"s32", tipo:"illustrata", tema:"chiaro", ill:"comunita", sopratitolo:"Le segnalazioni dei cittadini",
  titolo:"Anche l'**URP**", punti:[
    {icona:"chat", t:"reclami e **osservazioni**"},
    {icona:"cappello", t:"operatori **formati** sulla sicurezza", key:true}],
  etichette:{alto:{t:"Relazioni con il pubblico", key:true}}},
{id:"s33", tipo:"trappola", tema:"tenue", sopratitolo:"Un distrattore frequente", righe:[
  {sb:"Segnalare un evento vuol dire accusare un collega",
   ok:"La segnalazione serve a correggere il processo, non a cercare un colpevole"}]},
{id:"s34", tipo:"titolo", tema:"profondo",
  titolo:"Segnalare, analizzare, **correggere**:<br>l'errore diventa<br>un'occasione per **imparare**."},

// --- 6 · la continuità assistenziale
{id:"s35", tipo:"illustrata", tema:"chiaro", ill:"percorso", sopratitolo:"Il punto più fragile",
  titolo:"Il **passaggio**", punti:[
    {icona:"ospedale", t:"dall'ospedale a **casa**"},
    {icona:"persone", t:"verso una struttura **intermedia**"},
    {icona:"cuoremano", t:"dal territorio all'**ospedale**", key:true}],
  etichette:{p1:"Casa", p2:"Intermedia", p3:{t:"Ospedale", key:true}}},
{id:"s36", tipo:"sigla", tema:"chiaro", sopratitolo:"La centrale della continuità",
  lettere:[{l:"C", p:"Centrale"},{l:"O", p:"Operativa"},{l:"T", p:"Territoriale", key:true}],
  sotto:"Coordina in modo **unitario** il percorso di cura."},
{id:"s37", tipo:"rete", tema:"chiaro", sopratitolo:"Che cosa fa la COT",
  centro:"COT", dcentro:"continuità", nodi:[
  {t:"Mappa le risorse della rete", icona:"cartella"}, {t:"Coordina le transizioni protette", icona:"scudo", key:true},
  {t:"Raccoglie i bisogni sociali e sanitari", icona:"chat"}, {t:"Garantisce la tracciabilità", icona:"occhio"}],
  inizio:-Math.PI/4, rx:540, ry:230},
{id:"s38", tipo:"illustrata", tema:"chiaro", ill:"tavolo", sopratitolo:"Per i pazienti più complessi",
  titolo:"La **valutazione** multidimensionale", punti:[
    {icona:"persone", t:"l'unità valutativa, la **UVMD**", key:true},
    {icona:"documento", t:"**pianifica** l'assistenza"}],
  etichette:{alto:{t:"UVMD", key:true}}},
{id:"s39", tipo:"illustrata", tema:"chiaro", ill:"documento", sopratitolo:"Un piano di cura condiviso con il paziente",
  titolo:"Nel **fascicolo** sanitario elettronico", punti:[
    {icona:"cartella", t:"parte del **fascicolo sanitario elettronico**"},
    {icona:"persone", t:"consultabile da **tutta la filiera**", key:true}],
  etichette:{titolo:{t:"Piano di cura", key:true}, sigillo:"FSE"}},
{id:"s40", tipo:"illustrata", tema:"chiaro", ill:"percorso", sopratitolo:"In ospedale",
  titolo:"La dimissione **protetta**", punti:[
    {icona:"divieto", t:"il paziente **non esce da solo**"},
    {icona:"spunta", t:"un percorso **già organizzato**"},
    {icona:"persona", t:"una figura di riferimento, il **case manager**", key:true}],
  etichette:{p3:"Dimissione", p1:{t:"Casa", key:true}}},
{id:"s41", tipo:"icone", tema:"chiaro", sopratitolo:"Qui il comparto è protagonista", voci:[
  {icona:"cuoremano", t:"**Infermieri**"},
  {icona:"persone",   t:"**Assistenti sociali**"},
  {icona:"persona",   t:"**Fisioterapisti**"},
  {icona:"certificato", t:"Spesso con **incarichi di funzione** dedicati"}]},
{id:"s42", tipo:"ciclo", tema:"chiaro", sopratitolo:"E il cerchio si chiude",
  centro:"Qualità", fasi:[
  {icona:"ingranaggio", t:"Governo clinico"},
  {icona:"documento", t:"PDTA"},
  {icona:"scudo", t:"Rischio clinico"},
  {icona:"persone", t:"Continuità · COT", key:true}]},
{id:"s43", tipo:"titolo", tema:"profondo",
  titolo:"Nessun paziente<br>deve cadere nel **vuoto**<br>tra un luogo di cura e l'altro."},

// --- 7 · le tre cose
{id:"s44", tipo:"memo", tema:"chiaro", attive:[0], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s45", tipo:"memo", tema:"chiaro", attive:[0,1], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s46", tipo:"memo", tema:"chiaro", attive:[0,1,2], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s47", tipo:"trappola", tema:"tenue", sopratitolo:"L'ultimo distrattore", righe:[
  {sb:"La COT è la centrale del 118",
   ok:"Non gestisce le emergenze: coordina i passaggi protetti tra i luoghi di cura"}]},

// --- 8 · chiusura
{id:"s48", tipo:"titolo", tema:"profondo",
  titolo:"Governare la **qualità**, scrivere i **percorsi**,<br>imparare dagli errori,<br>**accompagnare** i passaggi.",
  sotto:"Si chiude il modulo sull'organizzazione aziendale."},

{id:"s49", tipo:"copertina", tema:"profondo", modulo:"Prossimo modulo",
  titolo:"Modulo 5", sottotitolo:"Procedimento amministrativo<br>e accesso", ente:ENTE},
];
