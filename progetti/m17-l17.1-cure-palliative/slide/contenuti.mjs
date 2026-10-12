// Contenuto delle 48 scene della lezione 17.1. *accento*  **accento in semibold**
//
// Registro del modulo, dichiarato dal documento di partenza: sobrio,
// concreto, mai pietistico. Niente immagini consolatorie, niente toni
// commossi: il fine vita si racconta con il linguaggio della competenza.
//
// Il velo rosa (`tenue`) sta solo dove c'e' un errore da correggere: il
// fraintendimento delle «cure degli ultimi giorni» e le parole da non usare.
// La `sostituzione` (lo sbarrato) solo dove i due lati sono davvero uno
// sbagliato e uno giusto; dove sono due cose da distinguere, `confronto`.
//
// Nessuna cifra o dato che non stia nel copione di partenza.

const PRINCIPI = [
 {t:"Affermano la vita", d:"la morte è un **processo naturale**"},
 {t:"Integrano gli aspetti **psicologici e spirituali**"},
 {t:"Lavorano in **équipe**"},
 {t:"Non accelerano **né ritardano** la morte"},
 {t:"Sostengono la **famiglia**", d:"durante la malattia e anche nel lutto"},
 {t:"Possono iniziare **precocemente**", d:"insieme alle altre terapie"},
];

const DIMENSIONI = [
 {icona:"persona",   t:"**Fisica**"},
 {icona:"chat",      t:"**Psicologica**"},
 {icona:"persone",   t:"**Sociale**"},
 {icona:"cuoremano", t:"**Spirituale**"},
];

const RETI = [
 {n:"1", t:"Cure palliative", d:"la rete per la persona con malattia inguaribile"},
 {n:"2", t:"Terapia del dolore", d:"una rete distinta"},
 {n:"3", t:"Pediatrica", d:"una rete dedicata ai bambini"},
];

const LIVELLI = [
 {icona:"ospedale",  t:"**Ospedale**", d:"consulenza palliativa · reparti dedicati"},
 {icona:"cuoremano", t:"**Hospice**", d:"struttura residenziale dedicata"},
 {icona:"persona",   t:"**Domicilio**", d:"di base o specialistiche"},
 {icona:"persone",   t:"**Strutture residenziali**", d:"con le équipe palliative"},
 {icona:"orologio",  t:"**Ambulatorio**", d:"e day hospice"},
];

const HOSPICE = [
 {t:"Stanze **singole**"},
 {t:"Spazi per i **familiari**"},
 {t:"Nessun orario di visita **rigido**"},
 {t:"Bassa tecnologia, **alta intensità assistenziale**"},
];

const DOMICILIO = [
 {n:"1", t:"Un caregiver presente"},
 {n:"2", t:"Un ambiente adeguato"},
 {n:"3", t:"L'OSS domiciliare", d:"la presenza più continua: vede per prima quando qualcosa cambia", key:true},
];

const EQUIPE = [
 {t:"**Medico palliativista**", d:"terapia dei sintomi · comunicazione · decisioni"},
 {t:"**Infermiere**", d:"gestione clinica · educazione del caregiver"},
 {t:"**OSS**", d:"assistenza di base · comfort · osservazione · presenza"},
 {t:"**Psicologo · assistente sociale · assistente spirituale**", d:"quando richiesto"},
 {t:"**Volontari formati · fisioterapista**"},
];

const RUOLO_OSS = [
 {icona:"cuoremano", t:"Comfort", d:"non routine: ciò che dà sollievo, nei tempi della persona"},
 {icona:"goccia",    t:"Igiene delicata", d:"cavo orale · posizionamento · ambiente"},
 {icona:"occhio",    t:"Osservazione", d:"dolore · respiro · alimentazione · variazioni"},
 {icona:"orologio",  t:"Presenza", d:"il tempo accanto è assistenza"},
 {icona:"persone",   t:"Sostegno", d:"al caregiver"},
 {icona:"avviso",    t:"Segnalazione", d:"tempestiva: nella fase avanzata i cambiamenti sono rapidi", key:true},
];

const CAMBIA = {
 intestazioni:["", "Nelle cure palliative"],
 colonne:["38%","62%"],
 righe:[
  ["L'obiettivo", "non fare tutto, ma **fare ciò che serve**"],
  ["L'igiene completa", "può essere **sospesa** se affatica"],
  ["I cambi posturali", "seguono il **comfort**, non solo la prevenzione"],
  ["L'alimentazione", "segue il **desiderio**, non il fabbisogno"],
 ],
};

const PAROLE = [
 {sb:"«Non c'è più niente da fare»", ok:"C'è **molto da fare**: cambia che cosa"},
 {sb:"«Paziente terminale»",         ok:"Persona in **fase avanzata** di malattia"},
 {sb:"«Accanimento»",                ok:"Trattamenti **sproporzionati**: il termine della legge"},
 {sb:"«Staccare la spina»",          ok:"**Sospendere** trattamenti non più indicati"},
];

const RIEPILOGO = [
 {t:"Una **forma di cura**", d:"qualità della vita, in quattro dimensioni"},
 {t:"Non accelerano né ritardano la morte", d:"e possono iniziare **fin dalla diagnosi**"},
 {t:"L. 38/2010", d:"diritto di accesso · due reti · **dolore in cartella**"},
 {t:"Ospedale · hospice · domicilio · residenziale", d:"tutti **gratuiti**"},
 {t:"L'OSS", d:"comfort · osservazione · presenza · **sostegno al caregiver**"},
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 17 · Cure palliative, fine vita e accompagnamento",
  titolo:"Le cure<br>**palliative**", sottotitolo:"Lezione 17.1",
  ente:"CISL FP Padova Rovigo · Concorso OSS Azienda Zero"},

{id:"s02", tipo:"frase", tema:"chiaro", sopratitolo:"Modulo 17 · lezione 1 di 5",
  testo:"Un'area in cui l'OSS è spesso **l'operatore più presente**."},
{id:"s03", tipo:"sostituzione", tema:"profondo", sopratitolo:"Una correzione necessaria",
  da:{h:"Non sono", t:"la rinuncia alla cura"}, a:{h:"Sono", t:"**una forma di cura**"},
  sotto:"Cambia l'obiettivo, non l'impegno."},
{id:"s04", tipo:"frase", tema:"chiaro", sopratitolo:"L'obiettivo",
  testo:"La **qualità della vita** della persona e della famiglia, in ogni fase. Non solo alla fine."},

{id:"s05", tipo:"citazione", tema:"chiaro",
  testo:"Un approccio che migliora la **qualità della vita** delle persone e delle famiglie che affrontano una malattia inguaribile.",
  fonte:"Organizzazione Mondiale della Sanità"},
{id:"s06", tipo:"frase", tema:"chiaro", sopratitolo:"Come",
  testo:"**Prevenzione** e **sollievo** della sofferenza: identificazione precoce, trattamento accurato del dolore e degli altri problemi."},
{id:"s07", tipo:"icone", tema:"chiaro", sopratitolo:"Quattro dimensioni, non una",
  voci:DIMENSIONI},

{id:"s08", tipo:"elenco", tema:"chiaro", attive:[0,1,2],
  sopratitolo:"I principi", voci:PRINCIPI},
{id:"s09", tipo:"titolo", tema:"profondo",
  titolo:"Non accelerano **né ritardano** la morte.",
  sotto:"È il punto che le distingue da ogni altra cosa."},
{id:"s10", tipo:"elenco", tema:"chiaro",
  sopratitolo:"I principi", voci:PRINCIPI},

{id:"s11", tipo:"titolo", tema:"tenue",
  titolo:"Non sono solo le cure degli **ultimi giorni**.",
  sotto:"Chi le immagina così le chiama troppo tardi."},
{id:"s12", tipo:"confronto", tema:"chiaro",
  sopratitolo:"Due momenti dello stesso percorso",
  col:[{h:"Precoci o simultanee", t:"affiancano le terapie attive, **fin dalla diagnosi**"},
       {h:"Fase terminale", t:"quando le terapie attive non sono più indicate"}]},
{id:"s13", tipo:"titolo", tema:"profondo",
  titolo:"L'inguaribilità **non è** l'imminenza della morte.",
  sotto:"La fase terminale è solo l'ultima parte del percorso."},
{id:"s14", tipo:"frase", tema:"chiaro", sopratitolo:"Si può vivere anni con una malattia inguaribile",
  testo:"E le cure palliative servono **anche a quello**."},

{id:"s15", tipo:"norma", tema:"chiaro", etichetta:"Legge", sigla:"38/2010",
  testo:"Il **diritto** di accedere alle cure palliative e alla terapia del dolore."},
{id:"s16", tipo:"tre", tema:"chiaro", sopratitolo:"Tre reti", box:RETI},
{id:"s17", tipo:"frase", tema:"chiaro", sopratitolo:"Un obbligo",
  testo:"Rilevare e **registrare il dolore** in cartella clinica: l'andamento e i farmaci utilizzati."},
{id:"s18", tipo:"titolo", tema:"profondo",
  titolo:"Il dolore è un **parametro da misurare**.",
  sotto:"Come la pressione o la temperatura. L'hai incontrata nel Modulo 8."},

{id:"s19", tipo:"icone", tema:"chiaro", attive:[0,1],
  sopratitolo:"I livelli della rete", voci:LIVELLI},
{id:"s20", tipo:"icone", tema:"chiaro",
  sopratitolo:"I livelli della rete", voci:LIVELLI},
{id:"s21", tipo:"titolo", tema:"profondo",
  titolo:"Cambiano i bisogni, **cambia il livello**.",
  sotto:"La persona si muove fra i livelli, come in tutte le reti."},

{id:"s22", tipo:"frase", tema:"chiaro", sopratitolo:"L'hospice",
  testo:"Non è un ospedale e non è una RSA. È il luogo in cui **molti OSS lavorano**."},
{id:"s23", tipo:"elenco", tema:"chiaro", sopratitolo:"L'hospice", voci:HOSPICE},
{id:"s24", tipo:"frase", tema:"chiaro", sopratitolo:"Un'équipe multiprofessionale",
  testo:"Medico · infermiere · **OSS** · psicologo · assistente sociale · volontari formati"},
{id:"s25", tipo:"titolo", tema:"profondo",
  titolo:"L'obiettivo è il **comfort**, e la qualità del tempo che resta.",
  sotto:"Gratuito, a carico del Servizio Sanitario Nazionale."},

{id:"s26", tipo:"frase", tema:"chiaro", sopratitolo:"Il domicilio",
  testo:"La maggior parte delle persone desidera **morire a casa**."},
{id:"s27", tipo:"tre", tema:"chiaro", sopratitolo:"Che cosa richiede", box:DOMICILIO},
{id:"s28", tipo:"titolo", tema:"profondo",
  titolo:"Se il carico non è sostenibile, l'hospice **non è un fallimento**.",
  sotto:"È il livello giusto."},

{id:"s29", tipo:"elenco", tema:"chiaro", attive:[0,1],
  sopratitolo:"L'équipe", voci:EQUIPE},
{id:"s30", tipo:"elenco", tema:"chiaro",
  sopratitolo:"L'équipe", voci:EQUIPE},
{id:"s31", tipo:"sostituzione", tema:"profondo", sopratitolo:"Il caregiver",
  da:{h:"Non è", t:"un visitatore"}, a:{h:"È", t:"**parte dell'équipe**"},
  sotto:"Un collaboratore, e va sostenuto come tale."},

{id:"s32", tipo:"icone", tema:"chiaro", attive:[0],
  sopratitolo:"Il ruolo dell'OSS", voci:RUOLO_OSS},
{id:"s33", tipo:"icone", tema:"chiaro", attive:[0,1,2],
  sopratitolo:"Il ruolo dell'OSS", voci:RUOLO_OSS},
{id:"s34", tipo:"icone", tema:"chiaro", attive:[0,1,2,3,4],
  sopratitolo:"Il ruolo dell'OSS", voci:RUOLO_OSS},
{id:"s35", tipo:"icone", tema:"chiaro",
  sopratitolo:"Il ruolo dell'OSS", voci:RUOLO_OSS},

{id:"s36", tipo:"tabella", tema:"chiaro", sopratitolo:"Che cosa cambia", chiave:[0],
  ...CAMBIA},
{id:"s37", tipo:"tabella", tema:"chiaro", sopratitolo:"Che cosa cambia", chiave:[1,2,3],
  ...CAMBIA},
{id:"s38", tipo:"titolo", tema:"profondo",
  titolo:"Il no della persona è **un'informazione**.",
  sotto:"Non un ostacolo da superare."},
{id:"s39", tipo:"frase", tema:"chiaro", sopratitolo:"Chi arriva da reparti per acuti",
  testo:"Qui la priorità è **come sta la persona**, non che cosa è stato fatto."},

{id:"s40", tipo:"trappola", tema:"tenue", attive:[0,1],
  sopratitolo:"Le parole giuste", righe:PAROLE},
{id:"s41", tipo:"trappola", tema:"tenue",
  sopratitolo:"Le parole giuste", righe:PAROLE},
{id:"s42", tipo:"titolo", tema:"profondo",
  titolo:"Non sono eufemismi: sono **termini più precisi**.",
  sotto:"E la precisione, in quest'area, è una forma di rispetto."},

{id:"s43", tipo:"elenco", tema:"chiaro", numerato:true, attive:[0],
  sopratitolo:"Riepiloghiamo", voci:RIEPILOGO},
{id:"s44", tipo:"elenco", tema:"chiaro", numerato:true, attive:[0,1],
  sopratitolo:"Riepiloghiamo", voci:RIEPILOGO},
{id:"s45", tipo:"elenco", tema:"chiaro", numerato:true, attive:[0,1,2],
  sopratitolo:"Riepiloghiamo", voci:RIEPILOGO},
{id:"s46", tipo:"elenco", tema:"chiaro", numerato:true,
  sopratitolo:"Riepiloghiamo", voci:RIEPILOGO},
{id:"s47", tipo:"frase", tema:"chiaro", sopratitolo:"Il filo della lezione",
  testo:"Cambia l'obiettivo, **non l'impegno**."},

{id:"s48", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"17.2", sottotitolo:"I **bisogni** nella fase avanzata",
  ente:"CISL FP Padova Rovigo · Concorso OSS Azienda Zero"},
];
