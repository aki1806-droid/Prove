// Contenuto delle 50 scene della lezione 12.2 — le riforme del SSN e i LEA.
// Le tre tappe sono un asse del tempo che si riempie; i sei elementi della
// 229/1999 una griglia che si accende; i tre livelli dei LEA tre colonne
// (come chiede la nota di produzione); le esenzioni una griglia in due tempi.

const SEI = (att) => ({tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, celle:[
  {n:"1", t:"**Distretto**"}, {n:"2", t:"**Accreditamento** istituzionale"}, {n:"3", t:"**Esclusività** dei dirigenti sanitari"},
  {n:"4", t:"Integrazione **socio-sanitaria**"}, {n:"5", t:"**LEA** come cardine"}, {n:"6", t:"**Atto aziendale**"}], attive:att});

const TAPPE = [
  {anno:1978, et:"nasce il SSN · L. 833"},
  {anno:1992, et:"aziendalizzazione · D.Lgs. 502 e 517", key:true},
  {anno:1999, et:"distretto, accreditamento, esclusività, LEA"},
  {anno:2001, et:"Titolo V · salute materia concorrente"},
];
const ASSE = (n) => ({tipo:"assetempo", tema:"chiaro", da:1975, a:2004, decenni:[1980,1990,2000], tappe:TAPPE.slice(0,n)});

const LIVELLI = (att) => ({tipo:"tre", tema:"chiaro", attive:att, box:[
  {n:"1", t:"Prevenzione collettiva e sanità pubblica", d:"vaccinazioni, screening, sicurezza alimentare, luoghi di lavoro"},
  {n:"2", t:"Assistenza distrettuale", d:"medicina di base, farmaceutica, specialistica, domiciliare, residenziale"},
  {n:"3", t:"Assistenza ospedaliera", d:"pronto soccorso, ricovero ordinario e diurno, riabilitazione"}]});

const ESENZ = (att) => ({tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, celle:[
  {t:"**Età** e **reddito**"}, {t:"Malattie **croniche** e invalidanti"}, {t:"Malattie **rare**"},
  {t:"**Invalidità**"}, {t:"**Gravidanza**"}, {t:"**Prevenzione**, come gli screening"}], attive:att});

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 12 · Organizzazione, normativa e sicurezza",
  titolo:"Le riforme<br>del SSN e i LEA", sottotitolo:"12.2 · Aziendalizzazione, riforma Bindi, livelli essenziali di assistenza",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"frase", tema:"chiaro", sopratitolo:"Micro-lezione 2 di 8 · il SSN nasce nel 1978",
  testo:"Negli anni Novanta il SSN viene **profondamente riformato**.",
  sotto:"Quelle riforme hanno disegnato l'organizzazione in cui lavorerai."},
{id:"s03", tipo:"icone", tema:"chiaro", sopratitolo:"Che cosa hanno introdotto le riforme", voci:[
  {icona:"ospedale", t:"Aziende sanitarie"}, {icona:"persona", t:"Direttore generale"},
  {icona:"certificato", t:"Accreditamento"}, {icona:"persone", t:"Distretto"},
  {icona:"scudo", t:"LEA", d:"il cuore del sistema", key:true}]},

{id:"s04", tipo:"norma", tema:"chiaro", etichetta:"Modificato dal D.Lgs. 517/1993", sigla:"D.Lgs. 502/1992",
  testo:"La prima grande **riforma** del Servizio Sanitario Nazionale."},
{id:"s05", tipo:"titolo", tema:"profondo",
  titolo:"La parola chiave:<br>**aziendalizzazione**.",
  sotto:""},
{id:"s06", tipo:"sostituzione", tema:"chiaro", sopratitolo:"Dal 1992",
  da:{h:"Prima", t:"Unità Sanitarie Locali"}, a:{h:"Poi", t:"Aziende"},
  sotto:"Personalità giuridica **pubblica** · autonomia organizzativa, amministrativa e gestionale."},
{id:"s07", tipo:"confronto", tema:"chiaro", sopratitolo:"I grandi ospedali possono diventare aziende a sé", col:[
  {h:"Il territorio", t:"l'**azienda** sanitaria"}, {h:"Il grande ospedale", t:"l'**azienda ospedaliera**, autonoma", key:true}]},
{id:"s08", tipo:"albero", tema:"chiaro", sopratitolo:"Il vertice dell'azienda",
  radice:"**Direttore generale** · nominato dalla Regione", rami:[
  {cond:"lo affianca", esito:"il direttore **sanitario**"}, {cond:"lo affianca", esito:"il direttore **amministrativo**"}]},
{id:"s09", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Le altre novità · i DRG nella lezione 12.4, il finanziamento", celle:[
  {t:"Cresce il ruolo delle **Regioni**"}, {t:"Pagamento delle prestazioni **a tariffa**: i **DRG**"}]},

{id:"s10", tipo:"norma", tema:"chiaro", etichetta:"La riforma Bindi", sigla:"D.Lgs. 229/1999",
  testo:"Introduce o rafforza **sei elementi**."},
{id:"s11", sopratitolo:"Il distretto · articolazione territoriale dell'azienda · la continuità del modulo 11", ...SEI([0])},
{id:"s12", tipo:"catena", tema:"chiaro", sopratitolo:"L'accreditamento istituzionale · strutture pubbliche e private", passi:[
  {t:"**Requisiti**"}, {t:"**Accordi** contrattuali"}, {t:"Prestazioni **per il SSN**", key:true}]},
{id:"s13", sopratitolo:"L'esclusività · l'integrazione: sanitario e sociale sulla stessa persona", ...SEI([0,1,2,3])},
{id:"s14", sopratitolo:"I LEA diventano il cardine del sistema · la seconda metà della lezione", ...SEI([0,1,2,3,4])},
{id:"s15", sopratitolo:"L'atto aziendale · di diritto privato: l'azienda definisce la propria organizzazione", ...SEI([0,1,2,3,4,5])},

{id:"s16", sopratitolo:"Le tappe in una riga · da ricordare con gli anni", ...ASSE(1)},
{id:"s17", sopratitolo:"Le tappe in una riga · da ricordare con gli anni", ...ASSE(3)},
{id:"s18", sopratitolo:"Le tappe in una riga · la sequenza che un commissario si aspetta", ...ASSE(4)},

{id:"s19", tipo:"frase", tema:"chiaro", sopratitolo:"I LEA · livelli essenziali di assistenza",
  testo:"Le prestazioni e i servizi che il SSN deve garantire **a tutti**."},
{id:"s20", tipo:"icone", tema:"chiaro", sopratitolo:"Come", voci:[
  {icona:"spunta", t:"Gratuitamente"},
  {icona:"euro", t:"Con il ticket", d:"una quota di partecipazione"},
  {icona:"persone", t:"Fiscalità generale", d:"le risorse pubbliche", key:true}]},
{id:"s21", tipo:"confronto", tema:"chiaro", sopratitolo:"Chi li definisce", col:[
  {h:"A livello nazionale", t:"i **LEA**, uguali per tutti"}, {h:"Le Regioni", t:"livelli **ulteriori**, con risorse proprie", key:true}]},
{id:"s22", tipo:"catena", tema:"chiaro", sopratitolo:"Da dove vengono", passi:[
  {t:"**Art. 32** della Costituzione"}, {t:"**Uguaglianza** della L. 833/1978"}, {t:"I **LEA**", key:true}]},

{id:"s23", tipo:"norma", tema:"chiaro", etichetta:"Sostituisce il DPCM 29 novembre 2001", sigla:"DPCM 12 gennaio 2017",
  testo:"I LEA vigenti, in **tre grandi livelli**."},
{id:"s24", sopratitolo:"I tre livelli dei LEA · DPCM 12 gennaio 2017", ...LIVELLI([0])},
{id:"s25", sopratitolo:"I tre livelli dei LEA · DPCM 12 gennaio 2017", ...LIVELLI([0,1])},
{id:"s26", sopratitolo:"Prevenzione, distretto, ospedale · tre parole per ricordarli", ...LIVELLI([0,1,2])},
{id:"s27", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Il DPCM comprende anche", celle:[
  {t:"I **nomenclatori**"}, {t:"Le **malattie rare**"}, {t:"Le malattie **croniche** esenti"}, {t:"Lo **screening neonatale** esteso · lezione 11.4"}]},

{id:"s28", tipo:"frase", tema:"chiaro", sopratitolo:"L'aggiornamento · una Commissione nazionale, in base alle evidenze",
  testo:"I LEA **non sono fissi**.", sotto:"Un passaggio importante: la fine del 2024."},
{id:"s29", tipo:"norma", tema:"chiaro", etichetta:"In vigore dalla fine del 2024 · previsti dal DPCM 2017", sigla:"Nuovi nomenclatori",
  testo:"Specialistica **ambulatoriale** e assistenza **protesica**, con le tariffe."},
{id:"s30", tipo:"confronto", tema:"chiaro", sopratitolo:"La regola di studio", col:[
  {h:"I LEA", t:"un elenco che **cambia**"}, {h:"Per il concorso", t:"il **quadro generale**: i tre livelli e il loro contenuto", key:true}]},

{id:"s31", tipo:"norma", tema:"chiaro", etichetta:"DM 12 marzo 2019 · applicato dal 2020", sigla:"NSG",
  testo:"Il **Nuovo Sistema di Garanzia**: i LEA sono davvero garantiti?"},
{id:"s32", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"Al posto della griglia LEA · adempiente solo con la soglia in tutte e tre · Veneto fra le migliori", celle:[
  {t:"**Prevenzione**"}, {t:"**Distrettuale**"}, {t:"**Ospedaliera**"}]},

{id:"s33", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Il ticket · una quota di partecipazione alla spesa", celle:[
  {n:"€", t:"**Specialistica**"}, {n:"€", t:"**Diagnostica**"}, {n:"€", t:"**Farmaceutica**, in alcune Regioni"}]},
{id:"s34", sopratitolo:"Ticket in pronto soccorso: accessi a bassa priorità senza ricovero · le esenzioni", ...ESENZ([0,1,2])},
{id:"s35", sopratitolo:"Le esenzioni · importi e regole anche regionali: contano i principi, non le cifre", ...ESENZ([0,1,2,3,4,5])},

{id:"s36", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"L'appropriatezza clinica", celle:[
  {t:"**Efficace**"}, {t:"**Indicata** per quel paziente"}]},
{id:"s37", tipo:"sostituzione", tema:"chiaro", sopratitolo:"L'appropriatezza organizzativa · il setting giusto",
  da:{h:"Inappropriato", t:"il ricovero"}, a:{h:"Appropriato", t:"l'ambulatorio"},
  sotto:"Per la stessa prestazione: **senza consumare risorse inutili**."},
{id:"s38", tipo:"titolo", tema:"profondo",
  titolo:"Le prestazioni **appropriate**,<br>non tutto il possibile.",
  sotto:""},

{id:"s39", tipo:"citazione", tema:"chiaro", sopratitolo:"Il caso d'esame",
  testo:"Che cosa sono i LEA, da quale atto sono definiti, come si articolano?",
  fonte:"la domanda tipo"},
{id:"s40", tipo:"memo", tema:"chiaro", sopratitolo:"La risposta · quattro elementi, quattro punti", voci:[
  "Prestazioni garantite **a tutti**, gratis o con ticket", "Il **DPCM 12 gennaio 2017**",
  "**Tre livelli**: prevenzione, distrettuale, ospedaliera", "La verifica: **Nuovo Sistema di Garanzia**"]},

{id:"s41", tipo:"albero", tema:"chiaro", sopratitolo:"Le figure di vertice",
  radice:"**Direttore generale**", rami:[
  {cond:"ha", esito:"la rappresentanza **legale**"}, {cond:"risponde", esito:"della **gestione**"},
  {cond:"nomina", esito:"gli **altri direttori**", key:true}]},
{id:"s42", tipo:"albero", tema:"chiaro", sopratitolo:"Le altre direzioni",
  radice:"**Direttore generale**", rami:[
  {cond:"sanitario", esito:"**governo clinico** e organizzazione sanitaria"}, {cond:"amministrativo", esito:"gestione **amministrativa**"},
  {cond:"in Veneto", esito:"direttore dei **servizi socio-sanitari**", key:true}]},
{id:"s43", tipo:"tre", tema:"chiaro", sopratitolo:"Gli organi dell'azienda · nella prossima lezione", box:[
  {n:"1", t:"Direttore generale"}, {n:"2", t:"Collegio sindacale", d:"la regolarità contabile"}, {n:"3", t:"Collegio di direzione"}]},

{id:"s44", tipo:"icone", tema:"chiaro", sopratitolo:"Perché all'infermiere servono queste norme", voci:[
  {icona:"certificato", t:"Accreditamento", d:"i requisiti della tua struttura, anche di personale"},
  {icona:"scudo", t:"LEA", d:"che cosa il paziente ha diritto di ricevere", key:true}]},
{id:"s45", tipo:"icone", tema:"chiaro", sopratitolo:"Perché all'infermiere servono queste norme", voci:[
  {icona:"persone", t:"Distretto", d:"la continuità assistenziale del modulo 11"},
  {icona:"documento", t:"Atto aziendale", d:"dove si colloca il servizio delle professioni sanitarie", key:true}]},

{id:"s46", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"In Veneto · accreditamento: L.R. 22/2002, nel modulo 13", celle:[
  {n:"·", t:"Aziende **ULSS**"}, {n:"·", t:"Aziende Ospedaliere **Universitarie**"}, {n:"·", t:"Un **IRCCS**"}, {n:"·", t:"**Azienda Zero**"}]},

{id:"s47", tipo:"tabella", tema:"chiaro", sopratitolo:"La tabella · le riforme", colonne:["36%","64%"],
  intestazioni:["Norma", "Che cosa introduce"], righe:[
  ["D.Lgs. 502/1992 e 517/1993", "**aziendalizzazione**, direttore generale, aziende ospedaliere"],
  ["D.Lgs. 229/1999", "**distretto**, accreditamento, esclusività, integrazione, atto aziendale"]], chiave:[]},
{id:"s48", tipo:"tabella", tema:"chiaro", sopratitolo:"La tabella · i LEA", colonne:["44%","56%"],
  intestazioni:["Che cosa", "Da ricordare"], righe:[
  ["LEA", "**DPCM 12/1/2017** · tre livelli"], ["Nuovo Sistema di Garanzia", "**DM 12/3/2019**"],
  ["Ticket ed esenzioni", "quota di partecipazione"], ["Appropriatezza", "**clinica** e **organizzativa**"]], chiave:[0]},
{id:"s49", tipo:"frase", tema:"chiaro", sopratitolo:"Nella prossima lezione · atto aziendale, dipartimenti, DM 70/2015, modelli organizzativi",
  testo:"Entriamo **dentro l'azienda**."},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"12.3<br>L'organizzazione<br>aziendale e ospedaliera", sottotitolo:"Atto aziendale, dipartimenti, standard ospedalieri",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
