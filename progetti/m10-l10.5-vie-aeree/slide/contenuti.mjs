// Contenuto delle 50 scene della lezione 10.5 — gestione delle vie aeree e
// ventilazione. I presidi sono una scala dal più semplice al più avanzato
// che si accende gradino per gradino; DOPE una scala di quattro lettere;
// gli allarmi un confronto alta/bassa pressione.

const PRESIDI = (k) => [
  {n:"1", t:"Manovre", key:k===0}, {n:"2", t:"Cannule", d:"oro- e nasofaringea", key:k===1},
  {n:"3", t:"Pallone e maschera", key:k===2}, {n:"4", t:"Sopraglottici", key:k===3}, {n:"5", t:"Intubazione", key:k===4}];

const DOPE = (ks) => [
  {n:"D", t:"Dislocazione", d:"estubazione, un solo bronco", key:ks.includes(0)}, {n:"O", t:"Ostruzione", d:"secrezioni, tubo piegato", key:ks.includes(1)},
  {n:"P", t:"Pneumotorace", key:ks.includes(2)}, {n:"E", t:"Equipment", d:"ventilatore, ossigeno", key:ks.includes(3)}];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 10 · Emergenza e area critica",
  titolo:"Gestione delle vie aeree<br>e ventilazione", sottotitolo:"10.5 · Presidi, intubazione, ventilazione meccanica, allarmi, DOPE",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"frase", tema:"chiaro", sopratitolo:"Micro-lezione 5 di 8 · ogni altra lettera dipende da questa",
  testo:"La **A** dell'ABCDE viene prima di tutto: senza vie aeree pervie si muore in **pochi minuti**."},
{id:"s03", tipo:"scala", tema:"chiaro", sopratitolo:"In questa lezione · dal più semplice al più avanzato, poi la ventilazione meccanica", gradini:PRESIDI(-1)},

{id:"s04", tipo:"confronto", tema:"chiaro", sopratitolo:"Le manovre · lezione 10.2", col:[
  {h:"Di regola", t:"iperestensione del capo e sollevamento del mento"}, {h:"Nel trauma", t:"**sublussazione della mandibola**", key:true}]},
{id:"s05", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"La cannula orofaringea, o di Guedel · la misura", celle:[
  {n:"↔", t:"Dall'**angolo della bocca** all'**angolo della mandibola**", key:true}, {n:"!", t:"Troppo lunga: epiglottide sulla glottide · troppo corta: spinge la lingua"}]},
{id:"s06", tipo:"trappola", tema:"chiaro", sopratitolo:"Solo nel paziente senza riflesso faringeo", righe:[
  {sb:"La Guedel nel semicosciente", ok:"Provoca **vomito** e **laringospasmo**"}]},
{id:"s07", tipo:"confronto", tema:"chiaro", sopratitolo:"La cannula nasofaringea · la stessa regola del sondino, lezione 3.4", col:[
  {h:"Vantaggio", t:"meglio **tollerata** nel semicosciente"}, {h:"Controindicata", t:"sospetta **frattura della base cranica**", key:true}]},

{id:"s08", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"Il pallone autoespandibile · la difficoltà principale è la tenuta della maschera", celle:[
  {t:"**Maschera**"}, {t:"**Ossigeno** ad alto flusso"}, {t:"**Reservoir**", key:true}]},
{id:"s09", tipo:"confronto", tema:"chiaro", sopratitolo:"Un secondo operatore comprime il pallone", col:[
  {h:"A una mano", t:"tenuta **peggiore**"}, {h:"A due mani", t:"pollice e indice a **C** sulla maschera, le altre dita a **E** sotto la mandibola", key:true}]},
{id:"s10", tipo:"catena", tema:"chiaro", sopratitolo:"Ventilazioni lente, che sollevano visibilmente il torace", passi:[
  {t:"Insufflare troppo forte"}, {t:"Aria nello stomaco", key:true}, {t:"Vomito e inalazione"}]},

{id:"s11", tipo:"scala", tema:"chiaro", sopratitolo:"I sopraglottici, come la maschera laringea · senza laringoscopio, sopra la glottide", gradini:PRESIDI(3)},
{id:"s12", tipo:"confronto", tema:"chiaro", sopratitolo:"Utili in emergenza, anche per l'infermiere formato", col:[
  {h:"Il vantaggio", t:"ventilano meglio della maschera facciale"}, {h:"Il limite", t:"**non proteggono del tutto** dall'inalazione", key:true}]},

{id:"s13", tipo:"confronto", tema:"chiaro", sopratitolo:"L'intubazione orotracheale", col:[
  {h:"Il medico", t:"esegue"}, {h:"L'infermiere", t:"**prepara** e **assiste**: un ruolo decisivo", key:true}]},
{id:"s14", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"Il materiale", celle:[
  {t:"**Laringoscopio**: la **luce** funziona? lame diverse", key:true}, {t:"**Tubi** di più calibri, mandrino"}, {t:"**Siringa** per la cuffia"}]},
{id:"s15", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"Il materiale", celle:[
  {t:"**Aspiratore** acceso e funzionante", key:true}, {t:"Pallone, ossigeno, **farmaci**"}, {t:"**Capnografo**, fissaggio, vie aeree difficili"}]},
{id:"s16", tipo:"frase", tema:"chiaro", sopratitolo:"Con il paziente già sedato, e senza ossigeno di riserva",
  testo:"Una preparazione incompleta si scopre **nel momento peggiore**."},

{id:"s17", tipo:"confronto", tema:"chiaro", sopratitolo:"La verifica · il riferimento è la capnografia", col:[
  {h:"Tubo in trachea", t:"a ogni espirazione compare **CO₂**", key:true}, {h:"Tubo in esofago", t:"**niente CO₂**"}]},
{id:"s18", tipo:"trappola", tema:"chiaro", sopratitolo:"Sollevamento simmetrico del torace e auscultazione", righe:[
  {sb:"Tubo troppo profondo", ok:"in **un solo bronco**: di solito il destro, più verticale"}]},
{id:"s19", tipo:"cifre", tema:"chiaro", sopratitolo:"La cuffia · come per la tracheostomia, lezione 8.2 · troppo gonfia lede, troppo sgonfia lascia passare", voci:[
  {n:"20-30", suf:"cmH₂O", d:"pressione della cuffia", key:true}]},
{id:"s20", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"Poi", celle:[
  {t:"**Fissare** il tubo"}, {t:"**Annotare i centimetri** all'arcata dentaria: il riferimento per gli spostamenti", key:true}, {t:"**Radiografia**"}]},

{id:"s21", tipo:"confronto", tema:"chiaro", sopratitolo:"La ventilazione meccanica invasiva · le modalità controllate", col:[
  {h:"A volume", t:"si imposta il **volume**, la pressione varia", key:true}, {h:"A pressione", t:"si imposta la pressione, il volume varia"}]},
{id:"s22", tipo:"confronto", tema:"chiaro", sopratitolo:"Si usano nello svezzamento", col:[
  {h:"Controllate", t:"volume o pressione"}, {h:"Assistite, di supporto", t:"il **paziente avvia** il respiro, il ventilatore lo sostiene", key:true}]},
{id:"s23", tipo:"cifre", tema:"chiaro", sopratitolo:"Il volume corrente · strategia protettiva · poi frequenza e FiO₂", voci:[
  {n:"6-8", suf:"ml/kg", d:"di peso ideale", key:true}]},
{id:"s24", tipo:"norma", tema:"chiaro", etichetta:"Pressione positiva di fine espirazione", sigla:"PEEP",
  testo:"Tiene **aperti gli alveoli** alla fine di ogni espirazione, e migliora l'ossigenazione."},

{id:"s25", tipo:"confronto", tema:"chiaro", sopratitolo:"Gli allarmi del ventilatore", col:[
  {h:"Alta pressione: un ostacolo", t:"**secrezioni**, tubo **piegato o morso**, tosse, broncospasmo, pneumotorace, opposizione", key:true}, {h:"Bassa pressione", t:""}]},
{id:"s26", tipo:"confronto", tema:"chiaro", sopratitolo:"Gli allarmi del ventilatore", col:[
  {h:"Alta pressione", t:"un ostacolo"}, {h:"Bassa pressione: una perdita", t:"**disconnessione**, cuffia, circuito, fino all'**estubazione**", key:true}]},
{id:"s27", tipo:"titolo", tema:"profondo",
  titolo:"Mai silenziare un allarme<br>**senza averne capito la causa**.",
  sotto:""},
{id:"s28", tipo:"frase", tema:"chiaro", sopratitolo:"Come per le pompe della lezione 6.3",
  testo:"L'allarme è un'**informazione**: chi lo spegne senza capirlo la butta via."},

{id:"s29", tipo:"scala", tema:"chiaro", sopratitolo:"Il paziente ventilato che peggiora all'improvviso · in ordine, mentre si chiama aiuto", gradini:DOPE([])},
{id:"s30", tipo:"scala", tema:"chiaro", sopratitolo:"DOPE", gradini:DOPE([0,1])},
{id:"s31", tipo:"scala", tema:"chiaro", sopratitolo:"DOPE · il pneumotorace, soprattutto con pressioni di ventilazione alte", gradini:DOPE([2,3])},
{id:"s32", tipo:"confronto", tema:"chiaro", sopratitolo:"Nel dubbio: staccare dal ventilatore e ventilare con il pallone", col:[
  {h:"Se migliora", t:"il problema è nella **macchina**"}, {h:"Se non migliora", t:"è nel **paziente** o nel **tubo**", key:true}]},

{id:"s33", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Al letto, sempre · se il ventilatore si ferma, servono subito", celle:[
  {t:"Il **pallone** con maschera", key:true}, {t:"Un **aspiratore** funzionante"}]},
{id:"s34", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"Il bundle VAP · lezione 3.1", celle:[
  {t:"Testata **30-45°**", key:true}, {t:"Igiene del **cavo orale**"}, {t:"Aspirazione **sub-glottica**"}, {t:"Controllo della **cuffia**"}, {t:"Interruzione quotidiana della **sedazione**"}]},
{id:"s35", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Aspirare solo quando serve · lezione 8.2 · prevenire l'estubazione accidentale", celle:[
  {t:"**Fissaggio**"}, {t:"Attenzione nei **movimenti**"}, {t:"Controllo dell'**agitazione**", key:true}]},

{id:"s36", tipo:"confronto", tema:"chiaro", sopratitolo:"La persona dietro il ventilatore · oggi si tende a una sedazione leggera", col:[
  {h:"Sedazione", t:"**RASS**, rispetto a un obiettivo prescritto", key:true}, {h:"Delirium", t:"**CAM-ICU**"}]},
{id:"s37", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"Il sedato non chiude bene le palpebre", celle:[
  {t:"**Occhi**: lesioni della cornea", key:true}, {t:"**Lesioni da dispositivo**: tubo, fissaggi, sondini"}, {t:"Posizionamento"}]},
{id:"s38", tipo:"frase", tema:"chiaro", sopratitolo:"La comunicazione · e i familiari, che vedono la persona circondata da macchine",
  testo:"Si parla al paziente, **anche se sedato**, spiegando ciò che si fa, chiamandolo per nome."},

{id:"s39", tipo:"cifre", tema:"chiaro", sopratitolo:"Il caso · paziente intubato · allarme di alta pressione · agitato, morde il tubo", voci:[
  {n:"82", suf:"%", d:"saturazione, improvvisa", key:true}]},
{id:"s40", tipo:"scala", tema:"chiaro", sopratitolo:"Aiuto · DOPE, lettera per lettera · i centimetri sono quelli annotati? morso, secrezioni?", gradini:DOPE([0,1])},
{id:"s41", tipo:"percorso", tema:"chiaro", sopratitolo:"Se il dubbio persiste · il medico valuta la sedazione · poi si rivaluta", tappe:[
  {t:"Staccare", d:"dal ventilatore"}, {t:"Pallone", d:"e ossigeno"}, {t:"Blocca-morso", d:"se previsto"}, {t:"Aspirare", d:"le secrezioni"}], attive:[0,1,2,3]},

{id:"s42", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"In Veneto · terapie intensive e semintensive · protocolli", celle:[
  {t:"**Intubazione**"}, {t:"**Bundle VAP**"}, {t:"**Sedazione**"}, {t:"**Svezzamento**", key:true}]},
{id:"s43", tipo:"frase", tema:"chiaro", sopratitolo:"L'infermiere di area critica · formazione avanzata",
  testo:"Uno degli ambiti in cui l'**evoluzione delle competenze** del modulo 1 si vede di più."},

{id:"s44", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"La tabella", celle:[
  {n:"G", t:"**Guedel**: bocca → mandibola, solo **senza riflesso**"}, {n:"N", t:"**Nasofaringea**: no nella frattura della base cranica"}, {n:"P", t:"**Pallone** a due mani", key:true}]},
{id:"s45", tipo:"tabella", tema:"chiaro", sopratitolo:"La tabella", intestazioni:["Che cosa","Il numero o la regola"], colonne:[1,2], righe:[
  ["Intubazione","preparare, **provare la luce**, aspiratore, capnografo"],
  ["Verifica","**capnografia** · cuffia **20-30** · annotare i **centimetri**"],
  ["Allarmi","**alta** pressione: ostacolo · **bassa**: perdita"],
  ["Peggiora","**DOPE**"]]},
{id:"s46", tipo:"titolo", tema:"profondo",
  titolo:"Nel dubbio,<br>**staccare e ventilare a mano**.",
  sotto:""},
{id:"s47", tipo:"frase", tema:"chiaro", sopratitolo:"In pochi secondi dice se il problema è nella macchina o nel paziente",
  testo:"Il pallone **non si guasta**, e non ha allarmi da interpretare."},
{id:"s48", tipo:"frase", tema:"chiaro", sopratitolo:"Nella prossima lezione · la C",
  testo:"Lo **shock** nei suoi quattro tipi, e la **sepsi**, già incontrata nel caso della 10.2."},
{id:"s49", tipo:"frase", tema:"chiaro", sopratitolo:"Una delle emergenze più frequenti in ospedale",
  testo:"Una di quelle in cui il **riconoscimento infermieristico** fa più differenza."},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"10.6<br>Shock e sepsi", sottotitolo:"I quattro tipi di shock, la sepsi e il riconoscimento precoce",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
