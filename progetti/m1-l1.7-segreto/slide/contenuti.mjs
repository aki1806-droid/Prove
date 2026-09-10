// Contenuto delle 50 scene della lezione 1.7. *accento*  **accento in semibold**
const PRINCIPI = [
 {t:"Liceità, correttezza, trasparenza"},
 {t:"**Limitazione della finalità**", d:"il dato raccolto per la cura non si usa per altro"},
 {t:"**Minimizzazione**", d:"si trattano solo i dati necessari"},
 {t:"Esattezza"},
 {t:"Limitazione della conservazione"},
 {t:"Integrità e riservatezza"},
 {t:"**Responsabilizzazione**", d:"il titolare deve poter *dimostrare* la conformità"},
];
const SOGGETTI = [
 {n:"1", t:"Titolare", d:"l'**azienda sanitaria**: determina finalità e mezzi"},
 {n:"2", t:"Responsabile", d:"tratta per conto del titolare — un fornitore informatico"},
 {n:"3", t:"DPO / RPD", d:"**obbligatorio** negli enti pubblici"},
 {n:"4", t:"Soggetti autorizzati", d:"gli operatori: trattano **secondo istruzioni**"},
 {n:"5", t:"Interessato", d:"accesso, rettifica, cancellazione, limitazione, opposizione, portabilità"},
];
const LECITA = [
 {t:"**Presupposto clinico documentato** o stato di necessità"},
 {t:"**Prescrizione** o motivata valutazione assistenziale"},
 {t:"**Proporzionalità** del mezzo"},
 {t:"**Durata limitata**, con rivalutazione periodica"},
 {t:"**Sorveglianza** della persona contenuta"},
 {t:"**Registrazione** in cartella"},
 {t:"**Informazione** alla persona e ai familiari"},
 {t:"Ricerca di **alternative** meno restrittive"},
];
const REATI = [
 {t:"**593** omissione di soccorso", d:"riguarda **chiunque**, anche fuori servizio"},
 {t:"**591** abbandono di incapaci", d:"riguarda chi ha **custodia o cura**"},
 {t:"**572** maltrattamenti", d:"condotte **abituali**, anche nelle strutture di cura"},
 {t:"**328** rifiuto di atti d'ufficio", d:"per l'atto dovuto per ragioni di sanità"},
 {t:"**609-bis** violenza sessuale", d:"aggravata dall'abuso della qualità e della relazione di cura"},
 {t:"**476 / 479** falso in atto pubblico", d:"per le annotazioni alterate in cartella"},
];
const NUMERI = ["1","2","3","4","5","6","7"];
const MEMO = [
 "**622** a querela · **326** d'ufficio — il dipendente pubblico risponde di **entrambi**",
 "I dati sulla salute sono **dati particolari** (art. 9 GDPR)",
 "Per la **cura** la base è l'art. **9.2 lett. h)**, non il consenso",
 "**Minimizzazione**: l'accesso non giustificato è illecito anche **senza divulgazione**",
 "I **familiari** non hanno diritto automatico",
 "**Contenzione**: documentata, proporzionata, limitata — mai per carenza di personale",
 "**Referto entro 48 ore** — ma non dovuto se esporrebbe l'assistito a procedimento penale",
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 1 · La professione infermieristica",
  titolo:"Segreto, privacy<br>e tutela della persona", sottotitolo:"Il dovere di tacere e il dovere di proteggere",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"frase", tema:"chiaro", sopratitolo:"Micro-lezione 7 di 8",
  testo:"Due famiglie di temi che nei bandi compaiono accostate: la *riservatezza* e la *tutela della persona*."},
{id:"s03", tipo:"frase", tema:"tenue", sopratitolo:"Quiz secchi e casi pratici",
  testo:"La **contenzione** e la **fotografia in chat** sono ormai due classici delle prove più recenti."},
{id:"s04", tipo:"elenco", tema:"chiaro", sopratitolo:"In questa lezione", numerato:true, voci:[
  {t:"I due segreti: **622 e 326**"},
  {t:"Il **GDPR** applicato ai dati sulla salute"},
  {t:"L'**accesso alla documentazione**"},
  {t:"Contenzione, reati, **referto**"}]},

{id:"s05", tipo:"confronto", tema:"chiaro", sopratitolo:"I due segreti", col:[
  {h:"art. 622 c.p. — professionale", t:"chi ne ha notizia per **stato, ufficio, professione o arte**<br>→ **a querela**"},
  {h:"art. 326 c.p. — d'ufficio", t:"il **pubblico ufficiale** o l'incaricato di pubblico servizio<br>→ **d'ufficio**"}]},
{id:"s06", tipo:"frase", tema:"chiaro", sopratitolo:"Art. 622",
  testo:"Punisce la rivelazione *senza giusta causa* di un segreto appreso in ragione della professione."},
{id:"s07", tipo:"titolo", tema:"profondo",
  titolo:"Il 326 è procedibile<br>**d'ufficio**.",
  sotto:"Non serve che nessuno sporga querela perché il procedimento parta."},

{id:"s08", tipo:"frase", tema:"chiaro", sopratitolo:"Il punto che sorprende",
  testo:"L'infermiere **dipendente pubblico** può rispondere di *entrambi*.",
  sotto:"È un professionista (622) ed è incaricato di pubblico servizio o pubblico ufficiale (326)."},
{id:"s09", tipo:"tre", tema:"profondo", sopratitolo:"Quattro fronti per un solo fatto", box:[
  {n:"1", t:"622", d:"segreto professionale"},
  {n:"2", t:"326", d:"segreto d'ufficio"},
  {n:"3", t:"Disciplinare", d:"verso l'azienda"},
  {n:"4", t:"Deontologico", d:"davanti all'Ordine"}]},

{id:"s10", tipo:"elenco", tema:"chiaro", sopratitolo:"Che cos'è la «giusta causa»", marcatori:["—","—","—","—"], voci:[
  {t:"Obblighi di **referto e denuncia**"},
  {t:"**Comunicazioni obbligatorie**", d:"malattie infettive, infortuni"},
  {t:"**Testimonianza** nei casi previsti"},
  {t:"Tutela di un **interesse prevalente**"}]},
{id:"s11", tipo:"frase", tema:"tenue", sopratitolo:"Fuori da queste ipotesi",
  testo:"Il **silenzio è la regola**. Anche verso i *familiari*.",
  sotto:"Che non hanno un diritto automatico a essere informati, se il paziente capace non lo ha voluto."},

{id:"s12", tipo:"norma", tema:"chiaro", sopratitolo:"La protezione dei dati",
  etichetta:"GDPR · Reg. UE 2016/679", sigla:"D.Lgs. 196/2003, mod. 101/2018",
  testo:"Il regolamento è *direttamente applicabile*; il Codice privacy lo integra."},
{id:"s13", tipo:"frase", tema:"chiaro", sopratitolo:"I dati sulla salute",
  testo:"Rientrano nelle **categorie particolari** dell'*articolo 9*.",
  sotto:"Vige un **divieto generale** di trattamento, con eccezioni tassative ed elencate."},

{id:"s14", tipo:"titolo", tema:"profondo",
  titolo:"Per curare<br>**non serve** il consenso privacy.",
  sotto:"La base giuridica è l'art. 9, par. 2, lett. h) del GDPR."},
{id:"s15", tipo:"frase", tema:"chiaro", sopratitolo:"La lettera h)",
  testo:"Il trattamento è consentito quando è effettuato da o sotto la responsabilità di un professionista *soggetto al segreto professionale*."},
{id:"s16", tipo:"confronto", tema:"tenue", sopratitolo:"Da non confondere", col:[
  {h:"Consenso al trattamento sanitario", t:"la lezione 1.6 — **L. 219/2017**"},
  {h:"Consenso privacy", t:"un'altra cosa — e per la cura **non è la base**"}]},

{id:"s17", tipo:"elenco", tema:"chiaro", sopratitolo:"I sette principi dell'art. 5",
  numerato:true, marcatori:NUMERI, voci:PRINCIPI, attive:[0,1,2]},
{id:"s18", tipo:"elenco", tema:"chiaro", sopratitolo:"I sette principi dell'art. 5",
  numerato:true, marcatori:NUMERI, voci:PRINCIPI},

{id:"s19", tipo:"frase", tema:"chiaro", sopratitolo:"Il caso d'esame più frequente",
  testo:"Consultare la cartella o il fascicolo di un paziente *non in cura presso di sé*.",
  sotto:"Un familiare, un conoscente, un collega, un personaggio noto."},
{id:"s20", tipo:"titolo", tema:"profondo",
  titolo:"È un trattamento illecito.<br>Anche se **non si divulga nulla**.",
  sotto:"E anche se si guarda una riga sola."},
{id:"s21", tipo:"frase", tema:"tenue", sopratitolo:"Perché",
  testo:"Viola la *minimizzazione* e le istruzioni ricevute. Ed è **tracciato dai log di accesso**.",
  sotto:"La curiosità, in sanità digitale, lascia impronte."},

{id:"s22", tipo:"elenco", tema:"chiaro", sopratitolo:"I soggetti del trattamento",
  numerato:true, marcatori:SOGGETTI.map(s=>s.n), grandi:true,
  voci:SOGGETTI.map(s=>({t:s.t, d:s.d})), attive:[0,1]},
{id:"s23", tipo:"elenco", tema:"chiaro", sopratitolo:"I soggetti del trattamento",
  numerato:true, marcatori:SOGGETTI.map(s=>s.n), grandi:true,
  voci:SOGGETTI.map(s=>({t:s.t, d:s.d}))},

{id:"s24", tipo:"elenco", tema:"chiaro", sopratitolo:"Chi può avere la documentazione", voci:[
  {t:"L'**interessato**", d:"accesso ai propri dati e copia — la L. 24/2017 impone termini definiti"},
  {t:"I **familiari** solo se **delegati**", d:"o se esercitano responsabilità genitoriale o tutela"}]},
{id:"s25", tipo:"elenco", tema:"chiaro", sopratitolo:"E dopo il decesso", voci:[
  {t:"Chi ha un **interesse proprio**"},
  {t:"Chi agisce a **tutela dell'interessato**"},
  {t:"Chi ha **ragioni familiari meritevoli** di protezione", d:"salvo divieto espresso in vita"}]},

{id:"s26", tipo:"elenco", tema:"chiaro", sopratitolo:"La riservatezza quotidiana", vietato:true, voci:[
  {t:"Commentare casi in **ascensore, corridoio, mensa**"},
  {t:"Affiggere **elenchi con nomi e diagnosi**"},
  {t:"Confermare **per telefono** la presenza di un ricoverato"}]},
{id:"s27", tipo:"frase", tema:"chiaro", sopratitolo:"E invece",
  testo:"La **consegna** si fa in luogo riservato. E la persona può *opporsi* alla comunicazione della propria presenza in reparto.",
  sotto:"Sono comportamenti banali, ed è esattamente per questo che vengono chiesti."},

{id:"s28", tipo:"frase", tema:"chiaro", sopratitolo:"Torniamo sulla contenzione",
  testo:"Nella 1.4 l'abbiamo vista dal lato *deontologico*. Dal lato del **diritto** la questione è seria."},
{id:"s29", tipo:"elenco", tema:"tenue", sopratitolo:"I reati che la contenzione può toccare", marcatori:["—","—","—","—"], voci:[
  {t:"**610** violenza privata"},
  {t:"**605** sequestro di persona", d:"se la privazione della libertà si prolunga senza giustificazione"},
  {t:"**572** maltrattamenti", d:"per condotte abituali"},
  {t:"**591** abbandono di incapaci", d:"se la persona contenuta resta senza sorveglianza"}]},
{id:"s30", tipo:"frase", tema:"tenue", sopratitolo:"E ancora",
  testo:"**Lesioni** o **omicidio colposi** per i danni provocati da una contenzione mal eseguita."},

{id:"s31", tipo:"frase", tema:"chiaro", sopratitolo:"Non c'è una legge generale",
  testo:"La liceità della contenzione si valuta *caso per caso*.",
  sotto:"Ecco gli otto elementi che la commissione si aspetta di sentire elencare."},
{id:"s32", tipo:"elenco", tema:"chiaro", sopratitolo:"Che cosa rende lecita una contenzione",
  numerato:true, voci:LECITA, attive:[0,1,2,3]},
{id:"s33", tipo:"elenco", tema:"chiaro", sopratitolo:"Che cosa rende lecita una contenzione",
  numerato:true, voci:LECITA},
{id:"s34", tipo:"titolo", tema:"profondo",
  titolo:"La carenza di personale<br>non è **mai** un presupposto<br>di liceità.",
  sotto:"È la frase che chiude il ragionamento."},

{id:"s35", tipo:"elenco", tema:"chiaro", sopratitolo:"I reati a tutela della persona",
  voci:REATI, attive:[0,1]},
{id:"s36", tipo:"elenco", tema:"chiaro", sopratitolo:"I reati a tutela della persona",
  voci:REATI, attive:[0,1,2,3]},
{id:"s37", tipo:"elenco", tema:"chiaro", sopratitolo:"I reati a tutela della persona",
  voci:REATI},

{id:"s38", tipo:"norma", tema:"chiaro", sopratitolo:"Il referto",
  etichetta:"Esercente una professione sanitaria", sigla:"art. 365 c.p.",
  testo:"Per i casi che possono presentare i caratteri di un *delitto perseguibile d'ufficio*."},
{id:"s39", tipo:"frase", tema:"chiaro", sopratitolo:"Entro quando",
  testo:"**48 ore**. O *immediatamente*, se c'è pericolo nel ritardo."},
{id:"s40", tipo:"titolo", tema:"profondo",
  titolo:"Non è dovuto quando<br>esporrebbe l'assistito<br>a **procedimento penale**.",
  sotto:"È il limite che distingue il referto da qualunque altro obbligo di comunicazione."},
{id:"s41", tipo:"confronto", tema:"chiaro", sopratitolo:"Referto e denuncia", col:[
  {h:"Referto — art. 365 c.p.", t:"l'**esercente** una professione sanitaria<br>entro **48 ore**"},
  {h:"Denuncia — art. 331 c.p.p.", t:"il **pubblico ufficiale** e l'incaricato di pubblico servizio<br>**senza ritardo**"}]},

{id:"s42", tipo:"frase", tema:"chiaro", sopratitolo:"La violenza sospetta",
  testo:"Davanti a lesioni compatibili con maltrattamento, l'infermiere del servizio pubblico si muove su *tre binari*.",
  sotto:"Il primo è l'assistenza alla persona."},
{id:"s43", tipo:"elenco", tema:"chiaro", sopratitolo:"I tre binari", numerato:true, grandi:true, voci:[
  {t:"**Assistenza** alla persona"},
  {t:"**Documentazione** accurata e oggettiva", d:"descrivere — non giudicare, non interpretare"},
  {t:"**Attivazione** dei percorsi previsti"}]},
{id:"s44", tipo:"frase", tema:"tenue", sopratitolo:"E il segreto?",
  testo:"Qui il segreto professionale **non è un ostacolo**: la comunicazione è *dovuta*, e costituisce giusta causa.",
  sotto:"Referto o denuncia a cura di chi ne ha l'obbligo; per i minori, allerta dei servizi sociali."},

{id:"s45", tipo:"frase", tema:"chiaro", sopratitolo:"In Veneto",
  testo:"I dati confluiscono nel **fascicolo sanitario elettronico regionale**, il cui accesso è *tracciato dai log*.",
  sotto:"L'accesso non giustificato è un illecito rilevabile — e **rilevato**."},
{id:"s46", tipo:"elenco", tema:"chiaro", sopratitolo:"E in ogni azienda", voci:[
  {t:"Un **DPO** e un regolamento sull'uso dei **dispositivi personali**"},
  {t:"**Percorsi dedicati** per le vittime di violenza in pronto soccorso"}]},

{id:"s47", tipo:"elenco", tema:"profondo", sopratitolo:"I sette punti",
  numerato:true, marcatori:NUMERI, grandi:true, voci:MEMO.map(t=>({t})), attive:[0,1,2]},
{id:"s48", tipo:"elenco", tema:"profondo", sopratitolo:"I sette punti",
  numerato:true, marcatori:NUMERI, grandi:true, voci:MEMO.map(t=>({t})), attive:[0,1,2,3,4]},
{id:"s49", tipo:"elenco", tema:"profondo", sopratitolo:"I sette punti",
  numerato:true, marcatori:NUMERI, grandi:true, voci:MEMO.map(t=>({t}))},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Fine della micro-lezione 1.7",
  titolo:"1.8 Riepilogo<br>e autovalutazione", sottotitolo:"mappa, numeri, confusioni, casi",
  ente:"Nella dispensa: il testo commentato, i quiz e la traccia di risposta già svolta"},
];
