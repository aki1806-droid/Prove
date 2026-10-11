// Contenuto delle 50 scene della lezione 16.4. *accento*  **accento in semibold**
//
// Registro del modulo: sobrio e descrittivo. La regola di lingua qui e' piu'
// stretta del solito, e la lezione stessa la enuncia: «persona con
// dipendenza». I due termini da non usare compaiono una volta sola, sulla
// scena che insegna a non usarli, e li' compaiono sbarrati: non si insegna a
// evitare una parola senza dirla.
//
// Il tema `tenue` e' il velo degli errori: sta sulle scene che correggono un
// fraintendimento o dicono che cosa non fare. Mai su contenuto positivo.
//
// Questa lezione nomina leggi, livelli di assistenza e servizi. Nessuna
// slide aggiunge un dato che non sia nel copione di partenza: su una materia
// che si porta all'esame, una cifra inventata vale meno di niente.

const DEFINIZIONE = [
 {t:"Uso o comportamento **compulsivo**"},
 {t:"**Perdita di controllo**"},
 {t:"Prosecuzione **nonostante le conseguenze**", d:"sulla salute, sul lavoro, sulle relazioni"},
];

const FAMIGLIE = [
 {h:"Da sostanze", t:"alcol · tabacco · farmaci · sostanze illegali"},
 {h:"Comportamentali", t:"**gioco d'azzardo patologico** (nei LEA)<br>internet · videogiochi"},
];

const ASTINENZA_ALCOL = [
 {t:"Tremore"},
 {t:"Sudorazione"},
 {t:"Agitazione"},
 {t:"Insonnia"},
 {t:"Nausea"},
];

const GIOCO = [
 {t:"**Incapacità di smettere**"},
 {t:"**Rincorsa delle perdite**", d:"giocare ancora per recuperare"},
 {t:"Menzogne ai familiari"},
 {t:"Debiti"},
];

const SERVIZI = [
 {icona:"ospedale", t:"**SerD**", d:"il servizio territoriale, dentro l'azienda ULSS"},
 {icona:"persone",  t:"**Comunità terapeutiche**", d:"residenziali o semiresidenziali"},
 {icona:"cuoremano",t:"**Gruppi di auto aiuto**", d:"Alcolisti Anonimi · Club alcologici · Giocatori Anonimi"},
];

const SERD_OFFRE = [
 {t:"Valutazione"},
 {t:"Trattamento farmacologico"},
 {t:"Sostegno psicologico"},
 {t:"Sostegno sociale"},
];

const DANNO = [
 {t:"Scambio di siringhe"},
 {t:"Unità di strada"},
 {t:"Informazione sui rischi"},
 {t:"Somministrazione controllata"},
];

// Niente `vietato` qui: la × dice «non fare», e questi non sono
// comportamenti dell'OSS, sono EFFETTI dello stigma su chi lo subisce.
// Niente grassetto: su un elenco il grassetto e' verde in ogni tema, e sul
// velo degli errori il verde dice il contrario di quello che la riga dice.
const STIGMA_PRODUCE = [
 {t:"Vergogna"},
 {t:"Ritardo nella richiesta di aiuto"},
 {t:"Abbandono delle cure"},
];

const OSS_FA = [
 {t:"**Osservare e riferire** i segni", d:"tremore, sudorazione, agitazione, confusione, sonnolenza eccessiva"},
 {t:"Garantire la **sicurezza**", d:"cadute, confusione, interazioni fra alcol e farmaci"},
 {t:"Sostenere la **quotidianità**", d:"pasti, sonno, igiene, routine"},
];

const OSS_NON_FA = [
 {t:"Confiscare sostanze o oggetti personali"},
 {t:"Decidere misure restrittive"},
 {t:"Sospendere o modificare terapie"},
 {t:"Promettere una riservatezza che non può garantire"},
];

const RIEPILOGO = [
 {t:"Tolleranza e astinenza → **dipendenza fisica**"},
 {t:"Astinenza da alcol → **pericolosa per la vita**"},
 {t:"Gioco d'azzardo → dipendenza **senza sostanza**, nei LEA"},
 {t:"SerD → accesso **diretto, gratuito, riservato**"},
 {t:"Riduzione del danno → **un livello della cura**"},
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 16 · Salute mentale, dipendenze e disagio psichico",
  titolo:"Le **dipendenze**<br>patologiche", sottotitolo:"Lezione 16.4",
  ente:"CISL FP Padova Rovigo · Concorso OSS Azienda Zero"},

{id:"s02", tipo:"frase", tema:"chiaro", sopratitolo:"Modulo 16 · lezione 4 di 5",
  testo:"Un'area in cui lo stigma è **ancora più forte** che nel resto della salute mentale."},
{id:"s03", tipo:"titolo", tema:"profondo",
  titolo:"La dipendenza è una **condizione di salute**.",
  sotto:"Non un vizio morale, né una debolezza di carattere."},
{id:"s04", tipo:"frase", tema:"chiaro", sopratitolo:"Non è un giudizio di valore",
  testo:"È il presupposto su cui sono costruiti **i servizi, le leggi e il lavoro di chi assiste**."},

{id:"s05", tipo:"elenco", tema:"chiaro",
  sopratitolo:"Che cos'è la dipendenza", voci:DEFINIZIONE},
// `confronto`, non `sostituzione`: la sostituzione sbarra il lato sinistro, e
// qui tolleranza e astinenza sono due definizioni da distinguere, non un
// giusto e uno sbagliato. Con la sostituzione la slide diceva che la
// tolleranza e' l'errore. E' lo stesso difetto corretto sulla 16.2, dove i
// segni ✓ e × marcavano la demenza come sbagliata: il segno, o lo sbarrato,
// si usa solo dove una delle due cose e' davvero da evitare.
{id:"s06", tipo:"confronto", tema:"chiaro", sopratitolo:"Due termini che i quiz chiedono", col:[
  {h:"Tolleranza", t:"serve una **quantità sempre maggiore** per lo stesso effetto"},
  {h:"Astinenza", t:"**sintomi fisici e psichici** alla sospensione"}]},
{id:"s07", tipo:"titolo", tema:"chiaro",
  titolo:"Tolleranza **e** astinenza<br>indicano una **dipendenza fisica**."},
{id:"s08", tipo:"confronto", tema:"profondo", sopratitolo:"Sono la parte che si vede dal di fuori", col:[
  {h:"La tolleranza", t:"si **deduce** dalle quantità"},
  {h:"L'astinenza", t:"si **osserva** addosso alla persona"}]},

{id:"s09", tipo:"confronto", tema:"chiaro", sopratitolo:"Due famiglie", col:[
  {h:FAMIGLIE[0].h, t:FAMIGLIE[0].t}, {h:FAMIGLIE[1].h, t:FAMIGLIE[1].t}]},
{id:"s10", tipo:"frase", tema:"chiaro", sopratitolo:"Il gioco d'azzardo patologico è nei Livelli Essenziali di Assistenza",
  testo:"Quindi viene **preso in carico dal servizio sanitario**.",
  sotto:"Poi internet e videogiochi."},
{id:"s11", tipo:"titolo", tema:"profondo",
  titolo:"Il meccanismo è lo stesso<br>in **entrambe** le famiglie.",
  sotto:"Compulsione, perdita di controllo, prosecuzione nonostante le conseguenze."},

{id:"s12", tipo:"frase", tema:"chiaro", sopratitolo:"L'alcol",
  testo:"La sostanza più diffusa e la più **sottovalutata**.",
  sotto:"È legale e socialmente accettata, quindi non viene contata fra le sostanze."},
{id:"s13", tipo:"elenco", tema:"chiaro",
  sopratitolo:"Astinenza da alcol — i segni che l'OSS può osservare", voci:ASTINENZA_ALCOL},
{id:"s14", tipo:"frase", tema:"tenue", sopratitolo:"Nei casi gravi",
  testo:"**Delirium tremens**: confusione, allucinazioni, agitazione intensa.",
  sotto:"È un'emergenza."},
{id:"s15", tipo:"titolo", tema:"profondo",
  titolo:"L'astinenza da alcol può essere<br>**pericolosa per la vita**.",
  sotto:"A differenza di quanto molti credono. Chi beve abitualmente e viene ricoverato va osservato nei primi giorni."},

{id:"s16", tipo:"frase", tema:"chiaro", sopratitolo:"Il tabacco",
  testo:"La dipendenza **più diffusa in assoluto**, e la prima causa di **morte evitabile**.",
  sotto:"È anche quella che si fatica di più a chiamare dipendenza, perché la si vede tutti i giorni."},
{id:"s17", tipo:"frase", tema:"chiaro", sopratitolo:"I farmaci — l'area meno riconosciuta",
  testo:"**Benzodiazepine** (ansiolitici e sonniferi) e **oppioidi** (alcuni antidolorifici).",
  sotto:"Possono dare dipendenza."},
{id:"s18", tipo:"frase", tema:"tenue", sopratitolo:"Perché non viene riconosciuta",
  testo:"La sostanza è **prescritta da un medico**.",
  sotto:"Frequente nell'anziano che assume sonniferi per anni: la sospensione brusca può dare astinenza."},
{id:"s19", tipo:"titolo", tema:"profondo",
  titolo:"Non intervenire sulla terapia:<br>**osservare e riferire**.",
  sotto:"La dipendenza da farmaci prescritti resta una dipendenza."},

{id:"s20", tipo:"elenco", tema:"chiaro",
  sopratitolo:"Gioco d'azzardo patologico — i segni", voci:GIOCO},
{id:"s21", tipo:"frase", tema:"chiaro", sopratitolo:"Un dato meno noto",
  testo:"Colpisce anche gli **anziani**, spesso in condizioni di **solitudine**.",
  sotto:"Attraverso slot machine e lotterie."},
{id:"s22", tipo:"titolo", tema:"chiaro",
  titolo:"Non è un problema privato di chi gioca:<br>è una **prestazione dovuta**.",
  sotto:"La presa in carico è dei servizi per le dipendenze, perché è inserito nei LEA."},

{id:"s23", tipo:"icone", tema:"chiaro", attive:[0],
  sopratitolo:"A chi ci si rivolge", voci:SERVIZI},
{id:"s24", tipo:"elenco", tema:"chiaro",
  sopratitolo:"Che cosa offre il SerD — équipe multiprofessionali", voci:SERD_OFFRE},
{id:"s25", tipo:"icone", tema:"chiaro",
  sopratitolo:"A chi ci si rivolge", voci:SERVIZI},
{id:"s26", tipo:"titolo", tema:"profondo",
  titolo:"L'accesso al SerD è **diretto**,<br>**gratuito** e **riservato**.",
  sotto:"Diretto vuol dire senza passare da nessuno: ci si presenta."},

{id:"s27", tipo:"frase", tema:"chiaro", sopratitolo:"La riduzione del danno",
  testo:"Interventi che riducono i rischi **anche in chi non interrompe l'uso**."},
{id:"s28", tipo:"elenco", tema:"chiaro",
  sopratitolo:"Gli esempi — si parte da dove la persona è, non da dove dovrebbe essere", voci:DANNO},
{id:"s29", tipo:"titolo", tema:"profondo",
  titolo:"Non una rinuncia alla cura:<br>**un livello** della cura.",
  sotto:"Tiene la persona in contatto con i servizi finché non è pronta per un percorso diverso."},

{id:"s30", tipo:"frase", tema:"chiaro", sopratitolo:"Lo stigma, qui, è ancora più forte",
  testo:"Il pregiudizio più diffuso: «**se volesse, smetterebbe**»."},
{id:"s31", tipo:"frase", tema:"tenue", sopratitolo:"Perché è falso",
  testo:"La dipendenza altera proprio i **circuiti cerebrali del controllo**.",
  sotto:"La volontà da sola non basta. È il motivo per cui esistono i servizi."},
{id:"s32", tipo:"elenco", tema:"tenue",
  sopratitolo:"Che cosa produce lo stigma", voci:STIGMA_PRODUCE},
{id:"s33", tipo:"sostituzione", tema:"profondo", sopratitolo:"Anche qui il linguaggio conta",
  da:{h:"Non si dice", t:"«drogato» · «alcolizzato»"},
  a:{h:"Si dice", t:"**persona con dipendenza**"},
  sotto:"Non è politicamente corretto: è il modo di non chiudere la porta."},

{id:"s34", tipo:"elenco", tema:"chiaro", attive:[0],
  sopratitolo:"Il ruolo dell'OSS", voci:OSS_FA},
{id:"s35", tipo:"frase", tema:"tenue", sopratitolo:"Non giudicare, non moralizzare, non indagare",
  testo:"Non spetta all'OSS chiedere **quanto, da quanto tempo, perché**.",
  sotto:"Quelle domande le fa chi valuta, e farle prima chiude la porta a chi le farà dopo."},
{id:"s36", tipo:"elenco", tema:"chiaro", attive:[0,1],
  sopratitolo:"Il ruolo dell'OSS", voci:OSS_FA},
{id:"s37", tipo:"elenco", tema:"chiaro",
  sopratitolo:"Il ruolo dell'OSS", voci:OSS_FA},

{id:"s38", tipo:"elenco", tema:"tenue", vietato:true, attive:[0,1],
  sopratitolo:"Che cosa non fa l'OSS", voci:OSS_NON_FA},
{id:"s39", tipo:"elenco", tema:"tenue", vietato:true, attive:[0,1,2],
  sopratitolo:"Che cosa non fa l'OSS", voci:OSS_NON_FA},
{id:"s40", tipo:"elenco", tema:"tenue", vietato:true,
  sopratitolo:"Che cosa non fa l'OSS — quanto osserva va riferito all'équipe", voci:OSS_NON_FA},
{id:"s41", tipo:"titolo", tema:"profondo",
  titolo:"Una sostanza trovata in reparto<br>**non si tocca** e **non si nasconde**.",
  sotto:"Si segnala secondo la procedura aziendale. Il rischio biologico e il rischio di accusa sono entrambi reali."},

{id:"s42", tipo:"frase", tema:"chiaro", sopratitolo:"Un'attenzione particolare",
  testo:"La dipendenza dell'anziano è spesso **invisibile**."},
{id:"s43", tipo:"frase", tema:"tenue", sopratitolo:"Alcol e farmaci insieme",
  testo:"Cadute, confusione, interazioni — scambiati per **età** o per **demenza**.",
  sotto:"Così la dipendenza resta fuori dal quadro, e con lei la causa."},
{id:"s44", tipo:"frase", tema:"chiaro", sopratitolo:"Vale la regola del modulo: il segnale è il cambiamento",
  testo:"«Da quando vive solo **beve di più**.» «Da quando è andata in pensione **gioca tutti i pomeriggi**.»"},
{id:"s45", tipo:"titolo", tema:"profondo",
  titolo:"Informazioni che spesso hanno<br>**solo i familiari e l'OSS a domicilio**.",
  sotto:"E che vanno riferite."},

{id:"s46", tipo:"frase", tema:"chiaro", sopratitolo:"Riepiloghiamo",
  testo:"La dipendenza è una **condizione di salute**, non un vizio.",
  sotto:"«Se volesse smetterebbe» è il pregiudizio da abbandonare."},
{id:"s47", tipo:"elenco", tema:"chiaro", attive:[0,1,2],
  sopratitolo:"I punti da portare all'esame", voci:RIEPILOGO},
{id:"s48", tipo:"elenco", tema:"chiaro",
  sopratitolo:"I punti da portare all'esame", voci:RIEPILOGO},
{id:"s49", tipo:"titolo", tema:"profondo",
  titolo:"Osserva · non giudica · non indaga<br>garantisce la sicurezza · **riferisce**",
  sotto:"Cinque verbi, e nessuno dei cinque è «convincere»."},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"16.5", sottotitolo:"La crisi e l'**aggressività**",
  ente:"CISL FP Padova Rovigo · Concorso OSS Azienda Zero"},
];
