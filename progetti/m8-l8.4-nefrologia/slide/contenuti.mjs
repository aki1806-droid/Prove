// Contenuto delle 50 scene della lezione 8.4 — nefrologia e urologia. Due
// corpi nuovi: i tre reni (prerenale con il vaso che porta poco sangue,
// renale con il rene danneggiato, postrenale con l'uretere bloccato) e la
// fistola (l'avambraccio con arteria e vena che si incontrano, la vena
// ingrossata con il fremito, e a destra l'elenco dei «mai»; nel caso il
// bracciale barrato). L'oliguria è un percorso di domande.

const MAI = ['Misurare la pressione', 'Prelievi e cannule', 'Lacci, bracciali, orologi, indumenti stretti', 'Sollevare pesi', 'Dormirci sopra'];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 8 · Assistenza in area medica",
  titolo:"Nefrologia<br>e urologia", sottotitolo:"8.4 · La fistola, la dialisi, l'oliguria",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Micro-lezione 4 di 8 · il rene è l'organo che fa i conti · quando cede, i conti saltano tutti insieme", celle:[
  {n:"1", t:"Elimina le **scorie**"}, {n:"2", t:"Regola **acqua ed elettroliti**", key:true}, {n:"3", t:"Controlla l'**equilibrio acido-base**"}, {n:"4", t:"Controlla la **pressione**"}]},
{id:"s03", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"In questa lezione", celle:[
  {n:"1", t:"L'insufficienza renale **acuta** e **cronica**"}, {n:"2", t:"La **dialisi**, con la **fistola artero-venosa** che i concorsi chiedono sempre", key:true}, {n:"3", t:"Alcuni quadri **urologici**"}]},
{id:"s04", tipo:"frase", tema:"chiaro", sopratitolo:"Un filo per tutta la lezione",
  testo:"La **diuresi oraria**: il numero che dice per primo se il rene sta cedendo, prima della creatinina e dei sintomi."},

{id:"s05", tipo:"rene3", tema:"chiaro", sopratitolo:"L'insufficienza renale acuta · la funzione si riduce in ore o giorni · tre gruppi di cause · prerenale: il rene è sano ma riceve poco sangue", attive:[0], key:[0]},
{id:"s06", tipo:"rene3", tema:"chiaro", sopratitolo:"Renale: il danno è nel tessuto · postrenale: l'urina non riesce a uscire, e un banale catetere ostruito", key:[1,2]},
{id:"s07", tipo:"cifre", tema:"chiaro", sopratitolo:"I criteri · un aumento rapido della creatinina, oppure · ecco perché la diuresi oraria è così importante", voci:[
  {n:"0,5", suf:"ml/kg/h", d:"diuresi sotto, per 6 ore", key:true}]},

{id:"s08", tipo:"percorso", tema:"chiaro", sopratitolo:"Davanti a un'oliguria, prima di pensare al rene · le cause più semplici", attive:[0,1], tappe:[
  {t:"Il catetere è pervio?", d:"pieghe, coaguli", key:true}, {t:"C'è un globo?", d:"bladder scanner"}, {t:"È disidratata?"}, {t:"Parametri e bilancio"}, {t:"Nefrotossici in corso?"}]},
{id:"s09", tipo:"percorso", tema:"chiaro", sopratitolo:"Spesso l'«anuria» si risolve sbloccando un catetere", tappe:[
  {t:"Il catetere è pervio?", d:"pieghe, coaguli", key:true}, {t:"C'è un globo?", d:"bladder scanner"}, {t:"È disidratata?"}, {t:"Parametri e bilancio"}, {t:"Nefrotossici in corso?"}]},

{id:"s10", tipo:"fascia", tema:"chiaro", sopratitolo:"L'insufficienza renale cronica · più di tre mesi · gli stadi in base al filtrato glomerulare", min:0, max:5, classi:[
  {da:0, a:1, t:"G5", d:"< 15: terminale", key:true}, {da:1, a:2, t:"G4"}, {da:2, a:3, t:"G3"}, {da:3, a:4, t:"G2"}, {da:4, a:5, t:"G1", d:"filtrato normale"}]},
{id:"s11", tipo:"frase", tema:"chiaro", sopratitolo:"Il G5 richiede dialisi o trapianto · le due malattie delle lezioni precedenti arrivano qui",
  testo:"Le cause principali: **diabete** e **ipertensione**."},
{id:"s12", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Le complicanze", celle:[
  {n:"1", t:"**Iperkaliemia**, acidosi metabolica", key:true}, {n:"2", t:"**Anemia**: meno eritropoietina"}, {n:"3", t:"**Sovraccarico** di liquidi, ipertensione"}, {n:"4", t:"**Calcio e fosforo** alterati, danno osseo"}]},

{id:"s13", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"L'assistenza · le proteine come nella lezione 3.3: ridotte prima della dialisi, aumentate in dialisi", celle:[
  {t:"**Bilancio idrico** e **peso**", key:true}, {t:"Dieta: **proteine** secondo lo stadio"}, {t:"Riduzione di **potassio, fosforo, sodio**"}]},
{id:"s14", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"L'assistenza", celle:[
  {t:"**Restrizione idrica** se prescritta"}, {t:"Farmaci con **dosi adattate**, niente nefrotossici", key:true}]},
{id:"s15", tipo:"trappola", tema:"chiaro", sopratitolo:"La protezione del patrimonio venoso · come nella lezione 6.1", righe:[
  {sb:"Prelievi e cannule sul braccio non dominante del nefropatico", ok:"Quel braccio **potrebbe servire per una fistola**"}]},

{id:"s16", tipo:"cifre", tema:"chiaro", sopratitolo:"L'emodialisi · il sangue esce, passa dal filtro, il rene artificiale, e rientra depurato", voci:[
  {n:"3", suf:"a settimana", d:"sedute, di norma", key:true}, {n:"4", suf:"ore", d:"circa, per seduta"}]},
{id:"s17", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Serve un accesso vascolare ad alto flusso", celle:[
  {n:"1", t:"La **fistola artero-venosa**: l'accesso di scelta", key:true}, {n:"2", t:"Una **protesi** vascolare"}, {n:"3", t:"Un **catetere venoso centrale** tunnellizzato per dialisi"}]},

{id:"s18", tipo:"fistola", tema:"chiaro", sopratitolo:"La fistola · il chirurgo collega un'arteria e una vena dell'avambraccio, per esempio la radiale e la cefalica", voci:[]},
{id:"s19", tipo:"fistola", tema:"chiaro", sopratitolo:"Il controllo quotidiano · si palpa il fremito, una vibrazione continua, il thrill · si ausculta il soffio, il bruit", voci:["Fremito: si palpa", "Soffio: si ausculta"], segno:"✓", titolo:"Ogni giorno", testo:"La vena riceve sangue ad alta pressione, si dilata, si rinforza"},
{id:"s20", tipo:"trappola", tema:"chiaro", sopratitolo:"Se il fremito scompare · un intervento tempestivo può salvarla", righe:[
  {sb:"Un fremito che manca annotato in consegna", ok:"Possibile **trombosi**: si **avvisa subito**, è una telefonata"}]},

{id:"s21", tipo:"fistola", tema:"chiaro", sopratitolo:"L'elenco che i concorsi chiedono sempre · che cosa non si fa sul braccio con la fistola", attive:[0,1], key:[0], titolo:"Mai"},
{id:"s22", tipo:"fistola", tema:"chiaro", sopratitolo:"Tutto ciò che comprime può trombizzarla", key:[0], titolo:"Mai"},
{id:"s23", tipo:"frase", tema:"chiaro", sopratitolo:"Molti reparti mettono un cartello al letto",
  testo:"Basta un **collega distratto** per perdere un accesso che è la **vita del paziente**."},

{id:"s24", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Il paziente che rientra dalla dialisi", celle:[
  {n:"1", t:"**Ipoteso**: sono stati rimossi liquidi; attenzione all'alzata", key:true}, {n:"2", t:"Può **sanguinare** dai punti di puntura: l'eparina della seduta"}]},
{id:"s25", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Il rientro dalla dialisi", celle:[
  {n:"3", t:"Il peso si confronta con il **peso secco**, l'obiettivo del nefrologo", key:true}, {n:"4", t:"**Stanchezza** e **crampi** sono frequenti"}]},
{id:"s26", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Più raramente · per i rapidi spostamenti di soluti · si segnala, non si aspetta che passi", celle:[
  {n:"!", t:"La **sindrome da disequilibrio**: cefalea, nausea, confusione", key:true}]},

{id:"s27", tipo:"frase", tema:"chiaro", sopratitolo:"Il catetere per dialisi merita una regola a parte · gestito dal personale della dialisi o secondo procedura",
  testo:"I suoi lumi contengono un **lock ad alta concentrazione** di eparina o citrato."},
{id:"s28", tipo:"trappola", tema:"chiaro", sopratitolo:"Se qualcuno lo usasse per un'infusione", righe:[
  {sb:"Spingere la soluzione nel lume", ok:"Inietterebbe una **dose di anticoagulante molto alta**"}]},
{id:"s29", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Quindi", celle:[
  {t:"**Non si usa** per infusioni o prelievi senza indicazione"}, {t:"Il lock va **aspirato** e scartato, **mai spinto**", key:true}]},

{id:"s30", tipo:"frase", tema:"chiaro", sopratitolo:"La dialisi peritoneale · il filtro è il peritoneo stesso",
  testo:"Un liquido entra da un **catetere addominale**, resta alcune ore, e viene drenato con **scorie e acqua**."},
{id:"s31", tipo:"confronto", tema:"chiaro", sopratitolo:"Si fa a domicilio, e richiede un'asepsi rigorosa", col:[
  {h:"Manuale", t:"scambi **più volte al giorno**"}, {h:"Automatizzata", t:"una **macchina di notte**", key:true}]},
{id:"s32", tipo:"catena", tema:"chiaro", sopratitolo:"La complicanza principale · si raccoglie un campione del liquido e si avvisa il centro", passi:[
  {t:"Liquido drenato torbido", d:"il primo segno", key:true}, {t:"Dolore addominale, febbre"}, {t:"Peritonite"}]},

{id:"s33", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Due quadri urologici · la ritenzione l'abbiamo vista nella lezione 3.6", celle:[
  {n:"1", t:"**Ritenzione**: lezione 3.6"}, {n:"2", t:"**Ematuria**: si monitorano colore e **coaguli**", key:true}]},
{id:"s34", tipo:"frase", tema:"chiaro", sopratitolo:"Dopo alcuni interventi, come la resezione prostatica",
  testo:"Il **catetere a tre vie** con **irrigazione continua**, per impedire la formazione di coaguli."},
{id:"s35", tipo:"calcolo", tema:"chiaro", sopratitolo:"Il bilancio richiede un piccolo calcolo · chi segna tutto il drenato come diuresi inventa litri di urina che non esistono", righe:[
  {tok:["urine reali", "=", "drenato", "−", "irrigato"]}], nota:"le urine reali sono il drenato meno l'irrigato"},
{id:"s36", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Se l'irrigazione non defluisce", celle:[
  {n:"!", t:"**Dolore** e **globo**: un'ostruzione da coaguli, da segnalare", key:true}]},

{id:"s37", tipo:"frase", tema:"chiaro", sopratitolo:"La colica renale · dolore lombare molto intenso, irradiato verso l'inguine",
  testo:"Un segno che aiuta: la persona è **agitata**, si muove, non trova una posizione."},
{id:"s38", tipo:"confronto", tema:"chiaro", sopratitolo:"Nausea, ematuria · l'assistenza: analgesia, idratazione secondo indicazione, filtrare le urine per recuperare il calcolo", col:[
  {h:"Colica", t:"**agitato**, non trova posizione", key:true}, {h:"Peritonite", t:"**immobile**: ogni movimento fa male"}]},

{id:"s39", tipo:"frase", tema:"chiaro", sopratitolo:"Il caso · paziente in emodialisi con fistola al braccio sinistro",
  testo:"Un collega sta per misurare la pressione **a sinistra**, perché il destro ha una cannula. Che cosa fai?"},
{id:"s40", tipo:"fistola", tema:"chiaro", sopratitolo:"Lo fermi: sul braccio con la fistola non si misura la pressione · sul destro, sopra la cannula se possibile, o l'arto inferiore secondo procedura", modo:"pressione", voci:["Misurare la pressione"], key:[0], titolo:"Mai"},
{id:"s41", tipo:"titolo", tema:"profondo",
  titolo:"Un accesso che è la vita del paziente **non si affida alla memoria** dei colleghi.",
  sotto:"Verifichi il fremito, e suggerisci un cartello al letto."},

{id:"s42", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"In Veneto", celle:[
  {n:"1", t:"Una **rete nefrologica** con centri ospedalieri e centri ad assistenza limitata", key:true}]},
{id:"s43", tipo:"frase", tema:"chiaro", sopratitolo:"La dialisi peritoneale domiciliare",
  testo:"Un **addestramento strutturato** della persona e del caregiver, condotto dagli infermieri di nefrologia."},
{id:"s44", tipo:"frase", tema:"chiaro", sopratitolo:"All'orale · un esempio di autogestione sostenuta dall'educazione infermieristica",
  testo:"La persona fa a casa, ogni giorno, ciò che le è stato **insegnato bene una volta**."},

{id:"s45", tipo:"fistola", tema:"chiaro", sopratitolo:"La tabella della fistola, da fotografare · ogni giorno: fremito e soffio · mai", titolo:"Mai"},
{id:"s46", tipo:"trappola", tema:"chiaro", sopratitolo:"Tre righe, e il quiz le chiede tutte e tre · «quale di queste azioni è corretta sul braccio con la fistola?»", righe:[
  {sb:"Una qualunque", ok:"**Nessuna** · fremito assente: possibile trombosi, si avvisa subito"}]},

{id:"s47", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Ricapitoliamo", celle:[
  {t:"Insufficienza acuta **prerenale, renale, postrenale**"}, {t:"Oliguria: prima il **catetere** e il **globo**", key:true}, {t:"Cronica: **iperkaliemia, anemia, sovraccarico**"}, {t:"Emodialisi **tre volte a settimana**"}]},
{id:"s48", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Ricapitoliamo", celle:[
  {t:"Fistola: **fremito ogni giorno**, **niente pressione**", key:true}, {t:"Lock del catetere da dialisi: **aspirare, mai spingere**"}, {t:"Peritoneale: **liquido torbido** è peritonite"}, {t:"Colica: **agitato** · peritonite: **immobile**"}]},
{id:"s49", tipo:"frase", tema:"chiaro", sopratitolo:"Nella prossima lezione",
  testo:"**Apparato digerente** e **fegato**."},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"8.5<br>Gastroenterologia<br>ed epatologia", sottotitolo:"Emorragia, cirrosi, pancreatite, procedure",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
