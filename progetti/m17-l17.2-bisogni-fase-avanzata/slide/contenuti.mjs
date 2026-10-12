// Contenuto delle 48 scene della lezione 17.2. *accento*  **accento in semibold**
//
// Registro del modulo, dichiarato dal documento di partenza: sobrio,
// concreto, mai pietistico. Il fine vita si racconta con il linguaggio della
// competenza: sintomi, che cosa aiuta, che cosa si riferisce.
//
// Il velo rosa (`tenue`) sta solo su che cosa NON si fa: i limiti dell'OSS
// sulla terapia e i due divieti sull'agitazione, in elenco `vietato`.
// La `sostituzione` solo dove i due lati sono davvero uno sbagliato e uno
// giusto: il fabbisogno contro il piacere, i liquidi endovena contro la cura
// della bocca.
//
// Nessuna cifra o dato che non stia nel copione di partenza.

const DOLORE_TOTALE = [
 {icona:"persona",   t:"Fisico", d:"la malattia · i trattamenti · l'immobilità"},
 {icona:"chat",      t:"Psicologico", d:"paura · rabbia · tristezza · perdita di controllo"},
 {icona:"persone",   t:"Sociale", d:"perdita del ruolo · isolamento · chi resta"},
 {icona:"cuoremano", t:"Spirituale", d:"il senso · la colpa · ciò che resta di sé"},
];

const SCALE = [
 {n:"1", t:"Numerica", d:"da zero a dieci"},
 {n:"2", t:"Delle facce"},
 {n:"3", t:"Osservazionali", d:"per chi non comunica: volto, vocalizzazioni, postura, consolabilità"},
];

const DESCRIZIONE = [
 {t:"Dove"}, {t:"Da quando"}, {t:"Come"},
 {t:"Quanto"}, {t:"Che cosa lo peggiora"}, {t:"Che cosa lo allevia"},
];

const OSS_DOLORE = [
 {t:"**Rileva e riferisce**", d:"soprattutto il dolore che compare o che cambia"},
 {t:"Osserva l'**efficacia** della terapia", d:"e riferisce gli effetti: sonnolenza, nausea, stipsi"},
 {t:"Coordina le manovre con la **terapia antalgica**", d:"si mobilizza quando il farmaco fa effetto, non prima"},
 {t:"Usa gli interventi **non farmacologici**", d:"posizione · calore o freddo su indicazione · ambiente · presenza"},
];

// Elenco `vietato`: la × rossa porta gia' la polarita', il testo resta piano.
const NON_DOLORE = [
 {t:"Non modifica la terapia"},
 {t:"Non somministra niente di propria iniziativa"},
];

const DISPNEA = [
 {t:"Posizione **seduta o semiseduta**"},
 {t:"**Aria sul viso**", d:"finestra aperta o ventilatore: riduce la fame d'aria"},
 {t:"Ambiente **fresco**, abiti non stretti"},
 {t:"Presenza **calma**", d:"l'ansia peggiora il respiro, il respiro peggiora l'ansia"},
 {t:"Attività **frazionate**", d:"per ridurre lo sforzo"},
];

const TRE_SINTOMI = [
 {n:"1", t:"Nausea", d:"pasti piccoli e frequenti · cibi freddi · niente odori forti · segnalare"},
 {n:"2", t:"Stipsi", d:"frequente con gli oppioidi · idratazione · mobilizzazione · registrare · segnalare"},
 {n:"3", t:"Bocca", d:"igiene frequente · umettazione · ghiaccio tritato · labbra protette", key:true},
];

const OSS_NAD = [
 {t:"**Riferisce** ciò che osserva"},
 {t:"**Sostiene** i familiari", d:"che spesso vivono la sospensione con angoscia"},
 {t:"**Non esprime giudizi** sulla decisione"},
];

const AGITAZIONE_AIUTA = [
 {t:"Ambiente **tranquillo**"},
 {t:"Luce **soffusa**"},
 {t:"La presenza di **volti noti**"},
 {t:"Orientamento **gentile**", d:"senza insistere"},
];

const AGITAZIONE_NO = [
 {t:"Non si contiene"},
 {t:"Non si contraddice"},
];

const BISOGNI = [
 {n:"1", t:"Controllo", d:"scelte quotidiane · informazioni · tempi"},
 {n:"2", t:"Non essere un peso", d:"spinge a non chiedere"},
 {n:"3", t:"Sistemare le cose", d:"relazioni · questioni pratiche · saluti"},
];

const OSS_ASCOLTA = [
 {t:"**Ascolta**"},
 {t:"Non consola **a tutti i costi**", d:"la consolazione frettolosa chiude il discorso"},
 {t:"**Riferisce** all'équipe i bisogni che emergono", d:"molti hanno una risposta"},
];

const SPIRITUALI = [
 {t:"Il bisogno di **riconciliazione**"},
 {t:"Di **lasciare qualcosa**"},
 {t:"Di **essere ricordati**"},
 {t:"L'assistenza spirituale è un **diritto**", d:"di ogni confessione e di nessuna · si attiva quando è richiesta"},
];

const RIEPILOGO = [
 {t:"Il dolore è **totale**", d:"fisico · psicologico · sociale · spirituale"},
 {t:"È quello che **la persona dice**", d:"si rileva regolarmente, si descrive, si riferisce"},
 {t:"Dispnea", d:"posizione · **aria sul viso** · presenza"},
 {t:"Stipsi con gli oppioidi · **cavo orale**", d:"l'intervento di comfort più importante"},
 {t:"Per il **piacere**, non per il fabbisogno", d:"la sete si tratta con la cura della bocca"},
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 17 · Cure palliative, fine vita e accompagnamento",
  titolo:"I bisogni nella<br>**fase avanzata**", sottotitolo:"Lezione 17.2",
  ente:"CISL FP Padova Rovigo · Concorso OSS Azienda Zero"},

{id:"s02", tipo:"frase", tema:"chiaro", sopratitolo:"Modulo 17 · lezione 2 di 5",
  testo:"I **bisogni concreti** della persona nella fase avanzata di malattia."},
{id:"s03", tipo:"frase", tema:"chiaro", sopratitolo:"Il concetto che ha fondato le cure palliative",
  testo:"Il **dolore totale**. Lo ha descritto Cicely Saunders, che ha aperto il primo hospice moderno."},
{id:"s04", tipo:"titolo", tema:"profondo",
  titolo:"Fisico, psicologico, sociale e spirituale **insieme**.",
  sotto:"Trattare solo la parte fisica non basta."},

{id:"s05", tipo:"icone", tema:"chiaro", attive:[0,1],
  sopratitolo:"Il dolore totale", voci:DOLORE_TOTALE},
{id:"s06", tipo:"icone", tema:"chiaro",
  sopratitolo:"Il dolore totale", voci:DOLORE_TOTALE},
{id:"s07", tipo:"titolo", tema:"profondo",
  titolo:"Un dolore che **non risponde ai farmaci** può avere radici altrove.",
  sotto:"E l'OSS, che sta accanto, spesso le vede."},

{id:"s08", tipo:"frase", tema:"chiaro", sopratitolo:"Il dolore fisico",
  testo:"Il quinto parametro vitale diventa **il parametro principale**. Si rileva regolarmente, non solo su richiesta."},
{id:"s09", tipo:"tre", tema:"chiaro", sopratitolo:"Le scale", box:SCALE},
{id:"s10", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false,
  sopratitolo:"Il dolore si descrive", celle:DESCRIZIONE},

{id:"s11", tipo:"elenco", tema:"chiaro", attive:[0,1],
  sopratitolo:"Che cosa fa l'OSS sul dolore", voci:OSS_DOLORE},
{id:"s12", tipo:"elenco", tema:"chiaro",
  sopratitolo:"Che cosa fa l'OSS sul dolore", voci:OSS_DOLORE},
{id:"s13", tipo:"elenco", tema:"tenue", vietato:true,
  sopratitolo:"Che cosa non fa", voci:NON_DOLORE},
{id:"s14", tipo:"titolo", tema:"profondo",
  titolo:"Il dolore è **quello che la persona dice** che è.",
  sotto:"L'OSS non ne dubita mai."},

{id:"s15", tipo:"frase", tema:"chiaro", sopratitolo:"La dispnea",
  testo:"La sensazione di **respiro difficile**: uno dei sintomi più angoscianti, per la persona e per chi assiste."},
{id:"s16", tipo:"elenco", tema:"chiaro", attive:[0,1],
  sopratitolo:"Che cosa aiuta", voci:DISPNEA},
{id:"s17", tipo:"elenco", tema:"chiaro",
  sopratitolo:"Che cosa aiuta", voci:DISPNEA},
{id:"s18", tipo:"titolo", tema:"profondo",
  titolo:"Si riferisce **sempre**: la terapia esiste ed è efficace.",
  sotto:"Chi soffre di dispnea non va mai lasciato solo."},

{id:"s19", tipo:"tre", tema:"chiaro", attive:[0],
  sopratitolo:"Tre sintomi frequenti", box:TRE_SINTOMI},
{id:"s20", tipo:"tre", tema:"chiaro", attive:[0,1],
  sopratitolo:"Tre sintomi frequenti", box:TRE_SINTOMI},
{id:"s21", tipo:"tre", tema:"chiaro",
  sopratitolo:"Tre sintomi frequenti", box:TRE_SINTOMI},
{id:"s22", tipo:"titolo", tema:"profondo",
  titolo:"La cura del cavo orale è **l'intervento di comfort più importante**.",
  sotto:"Secchezza e lesioni orali sono costanti nella fase avanzata."},

{id:"s23", tipo:"frase", tema:"chiaro", sopratitolo:"L'astenia",
  testo:"Una stanchezza profonda, che **non migliora con il riposo**. Si programma, si fraziona, non si insiste."},
{id:"s24", tipo:"sostituzione", tema:"chiaro", sopratitolo:"L'anoressia",
  da:{h:"Non per", t:"il fabbisogno"}, a:{h:"Si offre per", t:"**il piacere**"},
  sotto:"Il sintomo che più angoscia i familiari."},
{id:"s25", tipo:"titolo", tema:"profondo",
  titolo:"Il calo dell'appetito **non è la causa** del peggioramento: ne è un segno.",
  sotto:"Piccole quantità, cibi graditi, nessuna forzatura."},
{id:"s26", tipo:"frase", tema:"chiaro", sopratitolo:"Forzare",
  testo:"Non cambia il decorso, e **toglie il poco comfort** che resta."},

{id:"s27", tipo:"frase", tema:"chiaro", sopratitolo:"Idratazione e nutrizione artificiale",
  testo:"La decisione spetta al **medico**, insieme alla persona o a chi la rappresenta."},
{id:"s28", tipo:"norma", tema:"chiaro", etichetta:"Legge", sigla:"219/2017",
  testo:"Sono **trattamenti sanitari**: possono essere rifiutati o sospesi."},
{id:"s29", tipo:"sostituzione", tema:"profondo", sopratitolo:"La sete",
  da:{h:"Non con", t:"i liquidi endovena"}, a:{h:"Con", t:"**la cura della bocca**"},
  sotto:"Un dato che sorprende."},
{id:"s30", tipo:"elenco", tema:"chiaro",
  sopratitolo:"L'OSS", voci:OSS_NAD},

{id:"s31", tipo:"frase", tema:"chiaro", sopratitolo:"L'agitazione",
  testo:"Ha spesso **cause rimovibili**: dolore, ritenzione urinaria, stipsi, febbre, farmaci. E il delirium è frequente nelle ultime settimane."},
{id:"s32", tipo:"elenco", tema:"chiaro",
  sopratitolo:"Che cosa aiuta", voci:AGITAZIONE_AIUTA},
{id:"s33", tipo:"elenco", tema:"tenue", vietato:true,
  sopratitolo:"Che cosa non si fa", voci:AGITAZIONE_NO},
{id:"s34", tipo:"titolo", tema:"profondo",
  titolo:"Si riferisce: **esiste una terapia**.",
  sotto:"L'agitazione non trattata è una sofferenza evitabile."},

{id:"s35", tipo:"frase", tema:"chiaro", sopratitolo:"La cute",
  testo:"Fragile, con lesioni frequenti **nonostante la prevenzione**. L'igiene diventa breve, calda, delicata."},
{id:"s36", tipo:"frase", tema:"chiaro", sopratitolo:"Il posizionamento segue il comfort",
  testo:"La posizione che dà sollievo è **quella giusta**, anche se non è quella da manuale."},
{id:"s37", tipo:"titolo", tema:"profondo",
  titolo:"Alcune lesioni **non sono evitabili**.",
  sotto:"E non sono un fallimento assistenziale."},

{id:"s38", tipo:"frase", tema:"chiaro", sopratitolo:"I bisogni psicologici e sociali",
  testo:"Paura, rabbia, tristezza: **emozioni normali**, non sintomi da correggere."},
{id:"s39", tipo:"tre", tema:"chiaro", sopratitolo:"Tre bisogni", box:BISOGNI},
{id:"s40", tipo:"elenco", tema:"chiaro",
  sopratitolo:"L'OSS", voci:OSS_ASCOLTA},

{id:"s41", tipo:"frase", tema:"chiaro", sopratitolo:"I bisogni spirituali",
  testo:"Spirituale **non significa necessariamente** religioso: le domande sul senso, sulla propria vita, su ciò che resta."},
{id:"s42", tipo:"elenco", tema:"chiaro",
  sopratitolo:"I bisogni spirituali", voci:SPIRITUALI},
{id:"s43", tipo:"titolo", tema:"profondo",
  titolo:"Non avere risposte, ma **non sfuggire alla domanda**.",
  sotto:"Restare, ascoltare, dire che non sa ma che è lì."},

{id:"s44", tipo:"elenco", tema:"chiaro", numerato:true, attive:[0,1],
  sopratitolo:"Riepiloghiamo", voci:RIEPILOGO},
{id:"s45", tipo:"elenco", tema:"chiaro", numerato:true, attive:[0,1,2,3],
  sopratitolo:"Riepiloghiamo", voci:RIEPILOGO},
{id:"s46", tipo:"elenco", tema:"chiaro", numerato:true,
  sopratitolo:"Riepiloghiamo", voci:RIEPILOGO},
{id:"s47", tipo:"frase", tema:"chiaro", sopratitolo:"Il filo della lezione",
  testo:"Trattare solo la parte fisica **non basta**."},

{id:"s48", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"17.3", sottotitolo:"La **relazione** con la persona e con la famiglia",
  ente:"CISL FP Padova Rovigo · Concorso OSS Azienda Zero"},
];
