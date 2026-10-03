// Contenuto delle 50 scene della lezione 9.7 — dimissione ed educazione
// terapeutica. Nessun corpo nuovo: ordinaria/protetta è un confronto, la
// lettera infermieristica una griglia, i contenuti dell'educazione griglie
// con la spunta, il teach-back una trappola, il caso un percorso.

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 9 · Assistenza perioperatoria",
  titolo:"Dimissione ed<br>educazione terapeutica", sottotitolo:"9.7 · Pianificare dall'ingresso, dimissione protetta, lettera, educazione, follow-up",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"frase", tema:"chiaro", sopratitolo:"Micro-lezione 7 di 8",
  testo:"La dimissione non è la fine del percorso: la persona e i familiari gestiscono da soli ciò che in ospedale gestivano i **professionisti**."},
{id:"s03", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Da domani lo fa la persona, o chi le sta accanto", celle:[
  {n:"1", t:"La **ferita**"}, {n:"2", t:"I **farmaci**", key:true}, {n:"3", t:"Il **movimento**"}, {n:"4", t:"I **segnali d'allarme**"}]},
{id:"s04", tipo:"frase", tema:"chiaro", sopratitolo:"Molte riammissioni nascono da una dimissione affrettata o da un'educazione incompleta",
  testo:"La domanda dell'orale: **come si dimette bene un paziente?**"},

{id:"s05", tipo:"frase", tema:"chiaro", sopratitolo:"Il principio · spesso già dal prericovero, quando la persona è lucida e ha tempo per capire",
  testo:"La dimissione si **pianifica dall'ingresso**."},
{id:"s06", tipo:"titolo", tema:"profondo",
  titolo:"La dimissione si pianifica<br>**dall'ingresso**.",
  sotto:""},
{id:"s07", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"I bisogni che la persona avrà a casa · screening del rischio di dimissione difficile: l'indice BRASS", celle:[
  {t:"**Autonomia**", key:true}, {t:"**Supporto familiare**"}, {t:"**Abitazione**"}, {t:"**Dispositivi**"}]},
{id:"s08", tipo:"trappola", tema:"chiaro", sopratitolo:"I servizi hanno bisogno di giorni per attivarsi, non di ore", righe:[
  {sb:"Scoprire il giorno della dimissione che vive sola al terzo piano senza ascensore", ok:"**Troppo tardi**"}]},

{id:"s09", tipo:"confronto", tema:"chiaro", sopratitolo:"Due tipi di dimissione", col:[
  {h:"Ordinaria", t:"torna a casa **autonoma**, o con un supporto familiare sufficiente"}, {h:"Protetta", t:"bisogni che richiedono la **presa in carico dei servizi territoriali**", key:true}]},
{id:"s10", tipo:"frase", tema:"chiaro", sopratitolo:"La dimissione protetta · a casa, da sola o con la famiglia, non ce la farebbe",
  testo:"Bisogni **sanitari** o **socio-sanitari** che richiedono i servizi del territorio."},
{id:"s11", tipo:"norma", tema:"chiaro", etichetta:"Si attiva in anticipo · la regia fra ospedale e territorio", sigla:"COT",
  testo:"La **Centrale Operativa Territoriale**."},
{id:"s12", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Dove può portare · lezione 11.7", celle:[
  {n:"1", t:"**ADI**: assistenza domiciliare integrata", key:true}, {n:"2", t:"Struttura intermedia: **Ospedale di Comunità**"}, {n:"3", t:"**Residenzialità**"}]},

{id:"s13", tipo:"frase", tema:"chiaro", sopratitolo:"Lezione 2.7 · nel paziente chirurgico ha contenuti specifici",
  testo:"La **lettera infermieristica** di dimissione."},
{id:"s14", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Che cosa contiene · tutto ciò che chi arriva dopo deve sapere senza chiedere", celle:[
  {t:"**Bisogni** assistenziali residui"}, {t:"**Autonomia** e ausili"}, {t:"**Ferita**: aspetto, medicazione, frequenza del cambio, data dei punti", key:true}]},
{id:"s15", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Che cosa contiene", celle:[
  {t:"**Dispositivi** presenti"}, {t:"**Educazione** erogata e da completare", key:true}, {t:"**Caregiver** di riferimento"}, {t:"**Contatti**"}]},
{id:"s16", tipo:"frase", tema:"chiaro", sopratitolo:"Senza, si ricomincia da zero, e la persona racconta tutto per la terza volta",
  testo:"È il documento con cui l'infermiere del territorio **riprende il filo**."},

{id:"s17", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"L'educazione · la ferita · e che cosa è normale vedere nei primi giorni", celle:[
  {t:"**Igiene delle mani** prima di toccare la medicazione", key:true}, {t:"Quando fare la **doccia**"}, {t:"Come e quando **cambiare la medicazione**"}]},
{id:"s18", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"I segni di infezione · e di deiscenza: la ferita che si apre, il liquido abbondante", celle:[
  {n:"1", t:"**Rossore** che si estende"}, {n:"2", t:"Calore, gonfiore"}, {n:"3", t:"**Secrezione**"}, {n:"4", t:"**Dolore in aumento**", key:true}, {n:"5", t:"**Febbre**"}]},
{id:"s19", tipo:"frase", tema:"chiaro", sopratitolo:"Lezione 7.4 · riconoscerle presto dipende da questo momento",
  testo:"Molte infezioni del sito chirurgico **compaiono a casa**."},

{id:"s20", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"I dispositivi · se torna a casa con un drenaggio", celle:[
  {t:"**Svuotare**, misurare, **annotare** quantità e aspetto", key:true}, {t:"Mantenerlo **fissato**"}, {t:"Riconoscere i **segni d'allarme**"}]},
{id:"s21", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Lo stesso vale per ogni dispositivo · con il dispositivo in mano, non a parole", celle:[
  {n:"1", t:"**Catetere**"}, {n:"2", t:"**Stomia**", key:true}, {n:"3", t:"**PICC**"}]},
{id:"s22", tipo:"trappola", tema:"chiaro", sopratitolo:"La verifica · il teach-back della lezione 2.7, nella sua forma pratica", righe:[
  {sb:"«Ha capito?»", ok:"**Far eseguire la manovra**"}]},

{id:"s23", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"La terapia · la riconciliazione della Raccomandazione 17 · rispetto a prima del ricovero", celle:[
  {n:"+", t:"Farmaci **nuovi**"}, {n:"✗", t:"Farmaci **sospesi**", key:true}, {n:"≈", t:"Farmaci **modificati**"}]},
{id:"s24", tipo:"trappola", tema:"chiaro", sopratitolo:"Quando riprendere anticoagulanti e antiaggreganti · un anticoagulante dimenticato è una trombosi a casa", righe:[
  {sb:"«Quando se la sente»", ok:"Una **data precisa, scritta**"}]},
{id:"s25", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"L'eparina a casa", celle:[
  {t:"Tecnica di **autosomministrazione**", key:true}, {t:"**Durata** della terapia"}, {t:"**Smaltimento** degli aghi"}]},
{id:"s26", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"Gli analgesici · a casa il dolore si tratta a orario, non quando diventa insopportabile", celle:[
  {t:"**Orari**", key:true}, {t:"**Dose massima** del paracetamolo"}, {t:"Prevenzione della **stipsi** con gli oppioidi"}]},

{id:"s27", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"La vita quotidiana · che cosa si può fare oggi, e che cosa fra una settimana", celle:[
  {t:"**Mobilizzazione** e attività fisica progressiva", key:true}, {t:"**Precauzioni** specifiche: la protesi d'anca"}, {t:"**Alimentazione** e idratazione"}]},
{id:"s28", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Le domande che la persona spesso non fa, e che aspetta · quando riprendere", celle:[
  {n:"?", t:"Il **lavoro**"}, {n:"?", t:"La **guida**", key:true}, {n:"?", t:"I **rapporti sessuali**"}]},
{id:"s29", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"La prevenzione della trombosi, che a casa dipende dalla persona · una gamba gonfia e dolente va fatta vedere, subito", celle:[
  {t:"**Camminare**", key:true}, {t:"Esercizi delle **gambe**"}, {t:"**Bere**"}]},

{id:"s30", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Il follow-up · con la data e il luogo, non «fra qualche settimana»", celle:[
  {t:"**Appuntamenti**: chirurgo, rimozione dei punti, medicazioni", key:true}, {t:"**Esami** da eseguire"}]},
{id:"s31", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Chi chiamare di giorno, chi di notte", celle:[
  {t:"**Numeri di telefono** per i problemi, scritti in modo chiaro", key:true}, {t:"**Medico di medicina generale** e **infermiere di famiglia e comunità**"}]},
{id:"s32", tipo:"frase", tema:"chiaro", sopratitolo:"In molte realtà · una telefonata costa meno di una riammissione",
  testo:"Un **contatto telefonico** infermieristico nei giorni successivi intercetta i problemi prima del pronto soccorso."},

{id:"s33", tipo:"trappola", tema:"chiaro", sopratitolo:"Come si educa bene · si comincia presto", righe:[
  {sb:"Il giorno della dimissione, quando la persona è stanca e pensa solo a tornare a casa", ok:"**Dai primi giorni**"}]},
{id:"s34", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Come si educa bene · il caregiver: spesso è lui che farà le cose", celle:[
  {t:"**Poche informazioni** alla volta", key:true}, {t:"**Linguaggio semplice**"}, {t:"**Materiale scritto** da portare a casa"}, {t:"Coinvolgere il **caregiver**"}]},
{id:"s35", tipo:"frase", tema:"chiaro", sopratitolo:"Si verifica con il teach-back · se non ci riesce, abbiamo spiegato male noi, e si ricomincia",
  testo:"La persona **ripete con parole sue**, o **mostra con le mani**."},
{id:"s36", tipo:"trappola", tema:"chiaro", sopratitolo:"Alfabetizzazione sanitaria e lingua · il mediatore culturale quando serve", righe:[
  {sb:"Un foglio di istruzioni in italiano a chi non lo legge", ok:"**Non serve a niente**"}]},

{id:"s37", tipo:"frase", tema:"chiaro", sopratitolo:"Il caso · dimissione prevista fra due giorni",
  testo:"Anziana di **82 anni**, **vive sola**, operata di **protesi d'anca**. Che cosa fai?"},
{id:"s38", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Valuti l'autonomia e il contesto abitativo e familiare", celle:[
  {n:"?", t:"Riesce ad **alzarsi**, a vestirsi, a salire le scale?", key:true}, {n:"?", t:"C'è qualcuno che può **stare con lei**?"}, {n:"?", t:"Sa fare un'**iniezione**, o c'è chi può impararla?"}]},
{id:"s39", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"Se i bisogni non possono essere soddisfatti a casa", celle:[
  {t:"Segnali la necessità di una **dimissione protetta** e attivi la **COT** secondo procedura", key:true}, {t:"Riabilitazione in struttura, **Ospedale di Comunità** o **ADI** con fisioterapia e ausili"}]},
{id:"s40", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Nel frattempo · verificando con il teach-back · e compili la lettera infermieristica", celle:[
  {t:"Educhi alle **precauzioni dell'anca**", key:true}, {t:"Prevenzione delle **cadute**"}, {t:"**Eparina** a domicilio"}]},

{id:"s41", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"In Veneto", celle:[
  {n:"1", t:"Le dimissioni protette passano dalle **Centrali Operative Territoriali**, che coordinano il passaggio fra ospedale e territorio", key:true}]},
{id:"s42", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Verso · con l'infermiere di famiglia e comunità come riferimento a domicilio", celle:[
  {n:"→", t:"**ADI** distrettuale", key:true}, {n:"→", t:"**Ospedali di Comunità**"}, {n:"→", t:"Strutture **residenziali**"}]},
{id:"s43", tipo:"norma", tema:"chiaro", etichetta:"Il modello · lezione 11.7 · l'ospedale cura l'acuto, il territorio prende in carico il resto", sigla:"DM 77/2022",
  testo:"Il decreto ministeriale **77 del 2022**."},

{id:"s44", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"La tabella", celle:[
  {n:"1", t:"Pianificare **dall'ingresso**, con lo screening della dimissione difficile", key:true}, {n:"2", t:"**Ordinaria** o **protetta**, tramite la COT"}, {n:"3", t:"**Lettera infermieristica**: ferita, dispositivi, caregiver"}]},
{id:"s45", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"La tabella", celle:[
  {n:"4", t:"Educare a **ferita**, dispositivi, **terapia** con riconciliazione, vita quotidiana, **trombosi**", key:true}, {n:"5", t:"**Follow-up** e contatti"}, {n:"6", t:"**Teach-back**"}]},

{id:"s46", tipo:"frase", tema:"chiaro", sopratitolo:"La frase della lezione · non quella che ha ricevuto più fogli",
  testo:"La persona dimessa bene è quella che **sa che cosa fare**, e **chi chiamare** quando qualcosa non va."},
{id:"s47", tipo:"titolo", tema:"profondo",
  titolo:"La persona dimessa bene sa<br>**che cosa fare**, e **chi chiamare**.",
  sotto:""},

{id:"s48", tipo:"frase", tema:"chiaro", sopratitolo:"All'orale",
  testo:"È il criterio con cui si giudica una dimissione **raccontata bene**."},
{id:"s49", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Nella prossima lezione · il riepilogo del modulo 9", celle:[
  {n:"→", t:"Una **linea del tempo**: dalla decisione chirurgica alla ripresa a casa", key:true}]},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"9.8<br>Riepilogo del Modulo 9<br>e autovalutazione", sottotitolo:"La linea del tempo del paziente chirurgico",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
