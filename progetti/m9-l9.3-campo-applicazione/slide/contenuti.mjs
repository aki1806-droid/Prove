// Contenuto delle 49 scene della lezione 9.3. *accento*  **accento in semibold**
//
// Corso «Progressione verticale · Comparto Sanità», Modulo 9. Campo di applicazione:
// D.Lgs. 81/2008 art. 1, art. 2 lett. a, art. 3 cc. 1, 2, 4, 11, 12-bis, art. 20 c. 3, art. 26.

const ENTE = "CISL FP Padova Rovigo · Progressione verticale · Comparto Sanità";

const TRE_COSE = [
  "Si applica a **tutti i settori**, pubblici e privati, e a **tutti i rischi**; per alcuni ambiti si **adatta**, non esclude",
  "**Lavoratore**: chi lavora nell'organizzazione altrui, con **qualunque contratto**, con o senza retribuzione; **tirocinanti** equiparati",
  "Ditte esterne: **cooperazione**, **coordinamento** e **DUVRI**; volontari: informazione e riduzione delle **interferenze**",
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 9 · Salute e sicurezza sul lavoro",
  titolo:"Campo di applicazione", sottotitolo:"Lezione 9.3", ente:ENTE},

// --- 1 · aggancio
{id:"s02", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"In sala operatoria, insieme", celle:[
  {t:"Un'infermiera **dipendente**"}, {t:"Uno **specializzando**"},
  {t:"Una studentessa in **tirocinio**"}, {t:"Il tecnico di una **ditta esterna**"}]},
{id:"s03", tipo:"confronto", tema:"chiaro", sopratitolo:"Chi è tutelato?", col:[
  {h:"La risposta", t:"**tutti**", key:true},
  {h:"Ma", t:"in modo **diverso**, con responsabilità diverse"}]},
{id:"s04", tipo:"titolo", tema:"profondo",
  titolo:"La tutela segue il **lavoro**,<br>non il **contratto**."},

// --- 2 · rotta
{id:"s05", tipo:"flusso", tema:"chiaro", sopratitolo:"Quattro passaggi", passi:[
  {icona:"scudo", t:"Universalità"},
  {icona:"persona", t:"Il lavoratore"},
  {icona:"cappello", t:"Tirocinanti e volontari", key:true},
  {icona:"ingranaggio", t:"Ditte esterne"}]},

// --- 3 · tutti i settori, tutti i rischi
{id:"s06", tipo:"norma", tema:"chiaro", etichetta:"D.Lgs. 81/2008, art. 3, c. 1", sigla:"Art. 3",
  testo:"Si applica a **tutti i settori** di attività, privati e pubblici, e a **tutte le tipologie di rischio**."},
{id:"s07", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"Ovunque c'è lavoro organizzato", celle:[
  {t:"**Ospedali**"}, {t:"**Uffici**"}, {t:"**Laboratori**"},
  {t:"**Cucine**"}, {t:"**Magazzini**"}, {t:"Servizi **territoriali**"}]},
{id:"s08", tipo:"illustrata", tema:"chiaro", ill:"territorio", sopratitolo:"Art. 1",
  titolo:"Una tutela **uniforme**", punti:[
    {icona:"scudo", t:"su tutto il territorio **nazionale**"},
    {icona:"bilancia", t:"stessi livelli **essenziali** in ogni regione", key:true}],
  etichette:{}},
{id:"s09", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Art. 3, c. 2 · con le particolari esigenze del servizio", celle:[
  {t:"Forze **armate**"}, {t:"**Polizia**"}, {t:"Vigili del **fuoco**"},
  {t:"Protezione **civile**"}, {t:"**Università**"}, {t:"**Scuole**"}]},
{id:"s10", tipo:"confronto", tema:"chiaro", sopratitolo:"Non un'esclusione", col:[
  {h:"È un adattamento", t:"definito con **appositi decreti**"},
  {h:"La tutela", t:"**resta**", key:true}]},
{id:"s11", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Tutti i rischi", celle:[
  {t:"Fisici e **chimici**"}, {t:"**Organizzativi**"},
  {t:"**Stress** lavoro correlato"}, {t:"Genere, **età**, provenienza"}]},
{id:"s12", tipo:"confronto", tema:"chiaro", sopratitolo:"In un'azienda sanitaria", col:[
  {h:"Pronto soccorso e ufficio del personale", t:"cambiano i **rischi**"},
  {h:"L'obbligo di valutarli", t:"**non cambia**", key:true}]},
{id:"s13", tipo:"trappola", tema:"tenue", sopratitolo:"Occhio a un distrattore", righe:[
  {sb:"Forze armate, polizia e vigili del fuoco sono esclusi",
   ok:"Il decreto si applica, adattato alle esigenze del servizio"}]},
{id:"s14", tipo:"titolo", tema:"profondo",
  titolo:"Tutti i **settori**, tutti i **rischi**,<br>nessuna esclusione."},

// --- 4 · chi è lavoratore
{id:"s15", tipo:"illustrata", tema:"chiaro", ill:"comunita", sopratitolo:"Art. 2, lett. a",
  titolo:"Il **lavoratore**", punti:[
    {icona:"persona", t:"svolge un'attività **lavorativa**"},
    {icona:"ospedale", t:"nell'organizzazione di un datore **pubblico o privato**", key:true}],
  etichette:{}},
{id:"s16", tipo:"tre", tema:"chiaro", attive:[0], sopratitolo:"Tre parole che contano", box:[
  {n:"1", t:"Qualunque contratto", d:"indeterminato, determinato, part time"},
  {n:"2", t:"Con o senza retribuzione", d:"anche chi non è pagato"},
  {n:"3", t:"Anche per apprendere", d:"un mestiere, una professione"}]},
{id:"s17", tipo:"tre", tema:"chiaro", attive:[0,1,2], sopratitolo:"Tre parole che contano", box:[
  {n:"1", t:"Qualunque contratto", d:"indeterminato, determinato, part time"},
  {n:"2", t:"Con o senza retribuzione", d:"anche chi non è pagato"},
  {n:"3", t:"Anche per apprendere", d:"un mestiere, una professione"}]},
{id:"s18", tipo:"sostituzione", tema:"chiaro", sopratitolo:"Una nozione sostanziale",
  da:{h:"Non conta", t:"l'etichetta del contratto"},
  a:{h:"Conta", t:"lavorare **dentro** un'organizzazione altrui"}},
{id:"s19", tipo:"flusso", tema:"chiaro", sopratitolo:"Il lavoratore somministrato", passi:[
  {icona:"persone", t:"Agenzia", d:"lo invia"},
  {icona:"ospedale", t:"Azienda", d:"dove lavora"},
  {icona:"scudo", t:"Tutela", d:"dai rischi del luogo", key:true}]},
{id:"s20", tipo:"illustrata", tema:"chiaro", ill:"lavoroagile", sopratitolo:"Anche a distanza",
  titolo:"Il lavoro **agile**", punti:[
    {icona:"chat", t:"**informazione** sui rischi"},
    {icona:"ingranaggio", t:"attrezzature **sicure**", key:true}],
  etichette:{alto:{t:"Tutelato", key:true}}},
{id:"s21", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"Equiparati al lavoratore", celle:[
  {t:"Soci di **cooperativa**"}, {t:"**Tirocinanti**"}, {t:"**Allievi** in laboratorio"}]},
{id:"s22", tipo:"confronto", tema:"chiaro", sopratitolo:"I confini", col:[
  {h:"Esclusi", t:"solo gli addetti ai servizi **domestici** e familiari"},
  {h:"Lavoratori autonomi", t:"regole **minime**", key:true}]},
{id:"s23", tipo:"illustrata", tema:"chiaro", ill:"incastro", sopratitolo:"Un esempio in reparto",
  titolo:"L'OSS della **cooperativa**", punti:[
    {icona:"documento", t:"contratto con la **cooperativa**"},
    {icona:"spunta", t:"è **lavoratrice** ai fini del decreto", key:true}],
  etichette:{sx:"Cooperativa", dx:"Reparto", basso:{t:"Tutelata", key:true}}},
{id:"s24", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione", righe:[
  {sb:"Il decreto tutela solo i dipendenti a tempo indeterminato",
   ok:"Conta il lavoro svolto, non il tipo di contratto"}]},
{id:"s25", tipo:"titolo", tema:"profondo",
  titolo:"Conta **dove** lavori,<br>non **come** sei assunto."},

// --- 5 · tirocinanti, specializzandi, volontari
{id:"s26", tipo:"illustrata", tema:"chiaro", ill:"ospedale", sopratitolo:"In sanità",
  titolo:"Molti **non dipendenti**", punti:[
    {icona:"persone", t:"la nozione estesa ha conseguenze **concrete**"}],
  etichette:{}},
{id:"s27", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Il tirocinante è equiparato: riceve", celle:[
  {t:"**Informazione**"}, {t:"**Formazione**"},
  {t:"**Dispositivi** di protezione"}, {t:"**Sorveglianza** sanitaria, se esposto"}]},
{id:"s28", tipo:"illustrata", tema:"chiaro", ill:"universita", sopratitolo:"Gli specializzandi",
  titolo:"Stessi rischi, stessa **protezione**", punti:[
    {icona:"cappello", t:"attività assistenziale con i **tutor**"},
    {icona:"scudo", t:"la stessa **protezione** del personale", key:true}],
  etichette:{}},
{id:"s29", tipo:"confronto", tema:"chiaro", sopratitolo:"Chi garantisce", col:[
  {h:"Gli accordi", t:"tra **università** e azienda sanitaria"},
  {h:"In reparto", t:"le misure ci sono, e sono **uguali**", key:true}]},
{id:"s30", tipo:"illustrata", tema:"chiaro", ill:"comunita", sopratitolo:"Art. 3, c. 12-bis · i volontari",
  titolo:"Una tutela più **leggera**", punti:[
    {icona:"chat", t:"informazione sui **rischi specifici**"},
    {icona:"avviso", t:"e sulle misure di **emergenza**", key:true}],
  etichette:{}},
{id:"s31", tipo:"confronto", tema:"chiaro", sopratitolo:"E l'azienda deve", col:[
  {h:"Eliminare o ridurre", t:"i rischi da **interferenza**", key:true},
  {h:"Tra", t:"volontari e **personale**"}]},
{id:"s32", tipo:"tre", tema:"chiaro", attive:[0,1,2], sopratitolo:"Prima di entrare in reparto, sapere", box:[
  {n:"1", t:"Quali rischi", d:"si incontrano"},
  {n:"2", t:"Che cosa fare", d:"in caso di emergenza"},
  {n:"3", t:"A chi rivolgersi", d:"per ogni dubbio"}]},
{id:"s33", tipo:"catena", tema:"chiaro", sopratitolo:"La studentessa si punge con un ago", passi:[
  {t:"Primo soccorso"},
  {t:"Profilassi"},
  {t:"Segnalazione"},
  {t:"Analisi", d:"dell'accaduto", key:true}]},
{id:"s34", tipo:"trappola", tema:"tenue", sopratitolo:"Un distrattore frequente", righe:[
  {sb:"Il tirocinante non pagato è escluso dalla tutela",
   ok:"La legge lo equipara espressamente al lavoratore"}]},
{id:"s35", tipo:"titolo", tema:"profondo",
  titolo:"Chi **impara** in reparto,<br>va protetto come chi ci **lavora**."},

// --- 6 · appalti e interferenze
{id:"s36", tipo:"griglia", tema:"chiaro", colonne:5, spunta:false, sopratitolo:"Le ditte esterne in ospedale", celle:[
  {t:"**Pulizie**"}, {t:"**Mensa**"}, {t:"**Manutenzione**"}, {t:"**Trasporti**"}, {t:"**Lavanderia**"}]},
{id:"s37", tipo:"flusso", tema:"chiaro", sopratitolo:"Art. 26 · il committente", passi:[
  {icona:"spunta", t:"Verifica", d:"l'idoneità dell'impresa"},
  {icona:"chat", t:"Informa", d:"sui rischi dei luoghi"},
  {icona:"persone", t:"Coordina", d:"la prevenzione", key:true}]},
{id:"s38", tipo:"illustrata", tema:"chiaro", ill:"documento", sopratitolo:"Il DUVRI",
  titolo:"I rischi da **interferenze**", punti:[
    {icona:"persone", t:"più imprese **insieme**"},
    {icona:"scudo", t:"misure per eliminarli o **ridurli**", key:true}],
  etichette:{titolo:"DUVRI", sigillo:{t:"Allegato", key:true}}},
{id:"s39", tipo:"confronto", tema:"chiaro", sopratitolo:"Il documento", col:[
  {h:"Si allega", t:"al **contratto** d'appalto"},
  {h:"I costi della sicurezza", t:"**non** si ribassano in gara", key:true}]},
{id:"s40", tipo:"illustrata", tema:"chiaro", ill:"cartello", sopratitolo:"Un esempio in corridoio",
  titolo:"Pavimento **bagnato**", punti:[
    {icona:"persone", t:"le pulizie e il passaggio dei **letti**"},
    {icona:"avviso", t:"il rischio nasce dall'**incontro**", key:true}],
  etichette:{alto:{t:"Interferenza", key:true}, sx:"Pulizie", dx:"Reparto"}},
{id:"s41", tipo:"icone", tema:"chiaro", sopratitolo:"Art. 20, c. 3 e 26, c. 8 · la tessera di riconoscimento", voci:[
  {icona:"foto", t:"**Fotografia**"},
  {icona:"persona", t:"**Generalità**"},
  {icona:"ospedale", t:"**Datore di lavoro**"}]},
{id:"s42", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione", righe:[
  {sb:"Le ditte esterne sono fuori dalla responsabilità dell'azienda",
   ok:"Per le interferenze il committente coopera e coordina"}]},
{id:"s43", tipo:"titolo", tema:"profondo",
  titolo:"Dove si incontrano due **lavori**,<br>nasce un **rischio** nuovo."},

// --- 7 · le tre cose
{id:"s44", tipo:"memo", tema:"chiaro", attive:[0], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s45", tipo:"memo", tema:"chiaro", attive:[0,1], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s46", tipo:"memo", tema:"chiaro", attive:[0,1,2], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s47", tipo:"trappola", tema:"tenue", sopratitolo:"L'ultimo distrattore", righe:[
  {sb:"Precari e tirocinanti sono esclusi dalla nozione di lavoratore",
   ok:"Esclusi solo gli addetti ai servizi domestici e familiari"}]},

// --- 8 · chiusura
{id:"s48", tipo:"titolo", tema:"profondo",
  titolo:"La tutela segue la **persona**<br>che lavora, **ovunque** lavori.",
  sotto:"Prossima lezione: le figure della sicurezza."},

{id:"s49", tipo:"copertina", tema:"profondo", modulo:"Prossima lezione",
  titolo:"Lezione 9.4", sottotitolo:"Le figure della sicurezza", ente:ENTE},
];
