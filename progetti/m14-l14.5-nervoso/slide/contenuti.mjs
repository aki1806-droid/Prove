// Contenuto delle 50 scene della lezione 14.5 — sistema nervoso ed endocrino.
// L'arco riflesso e il caso d'esame sono percorsi che si accendono tappa per
// tappa; simpatico e parasimpatico si chiudono in una tabella a due colonne;
// gli ormoni dello stress sono una raggiera attorno alla glicemia.

const CASO = (att, k) => ({tipo:"percorso", tema:"chiaro", tappe:[
  {t:"Propranololo", d:"β-bloccante non selettivo", key:k===0},
  {t:"Blocca anche i β2", d:"dei bronchi", key:k===1},
  {t:"Rischio di broncospasmo", d:"nel paziente asmatico", key:k===2},
  {t:"Segnalazione al medico", d:"prima della somministrazione", key:k===3}], attive:att});

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 14 · Basi biomediche e semeiotica",
  titolo:"Sistema nervoso<br>ed endocrino", sottotitolo:"14.5 · Neurone e vie, riflessi, simpatico e parasimpatico, ipofisi, tiroide, surrene, pancreas",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"confronto", tema:"chiaro", sopratitolo:"Micro-lezione 5 di 8 · i due sistemi di controllo del corpo", col:[
  {h:"Sistema nervoso", t:"impulsi **elettrici**, rapidissimi"}, {h:"Sistema endocrino", t:"**ormoni**, più lenti ma duraturi"}]},
{id:"s03", tipo:"tre", tema:"chiaro", sopratitolo:"Conoscerli spiega", box:[
  {n:"1", t:"I segni neurologici", d:"lezione 8.6"}, {n:"2", t:"Le emergenze endocrine", d:"lezione 8.3"}, {n:"3", t:"L'azione dei farmaci", d:"soprattutto", key:true}]},

{id:"s04", tipo:"cifre", tema:"chiaro", sopratitolo:"SNC: encefalo e midollo spinale · SNP: i nervi", voci:[
  {n:"12", suf:"paia", t:"nervi **cranici**"}, {n:"31", suf:"paia", t:"nervi **spinali**", key:true}]},
{id:"s05", tipo:"tre", tema:"chiaro", sopratitolo:"Le due componenti funzionali", box:[
  {n:"1", t:"Somatica", d:"**volontaria**"},
  {n:"2", t:"Autonoma", d:"**involontaria** · simpatico e parasimpatico", key:true}]},
{id:"s06", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Il neurone comunica con le sinapsi · i neurotrasmettitori", celle:[
  {n:"·", t:"**Acetilcolina**"}, {n:"·", t:"**Noradrenalina**"}, {n:"·", t:"**Dopamina**"},
  {n:"·", t:"**Serotonina**"}, {n:"·", t:"**GABA**"}, {n:"·", t:"**Glutammato**"}]},
{id:"s07", tipo:"tabella", tema:"chiaro", sopratitolo:"Molti farmaci agiscono proprio sui neurotrasmettitori", colonne:["50%","50%"],
  intestazioni:["Farmaco", "Agisce su"], righe:[
  ["Benzodiazepine", "**GABA**"], ["Levodopa", "**dopamina**"], ["Antidepressivi", "**serotonina**"]]},

{id:"s08", tipo:"griglia", tema:"chiaro", colonne:4, spunta:true, sopratitolo:"Le vie sensitive conducono · la via motoria: corticospinale", celle:[
  {t:"**Tatto**"}, {t:"**Dolore**"}, {t:"**Temperatura**"}, {t:"**Posizione**"}]},
{id:"s09", tipo:"catena", tema:"chiaro", sopratitolo:"La via piramidale · la decussazione", passi:[
  {t:"Parte dalla **corteccia**"}, {t:"Scende nel midollo **incrociandosi**"},
  {t:"Lesione emisfero **sinistro**", d:"deficit motorio a **destra**", key:true}]},
{id:"s10", tipo:"frase", tema:"chiaro", sopratitolo:"Linguaggio: emisfero sinistro, nella maggior parte delle persone · lezione 8.6",
  testo:"Debolezza a **destra** e **afasia**: un problema dell'emisfero **sinistro**."},

{id:"s11", tipo:"percorso", tema:"chiaro", sopratitolo:"L'arco riflesso · rapido e involontario", tappe:[
  {t:"Recettore"}, {t:"Via sensitiva"}, {t:"Midollo", key:true}, {t:"Via motoria"}, {t:"Muscolo"}]},
{id:"s12", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Gli esempi", celle:[
  {n:"·", t:"Riflesso **rotuleo**"}, {n:"·", t:"Riflesso **pupillare** alla luce"},
  {n:"·", t:"**Deglutizione** e **tosse**: proteggono le vie aeree"},
  {n:"!", t:"Riflessi tendinei **ridotti**: tossicità da **magnesio** · lezione 11.4", key:true}]},
{id:"s13", tipo:"trappola", tema:"chiaro", sopratitolo:"Il segno di Babinski · stimolando la pianta del piede", righe:[
  {sb:"Estensione dell'alluce: una risposta normale", ok:"Nell'adulto è **patologico**: lesione della **via piramidale**"}]},

{id:"s14", tipo:"titolo", tema:"chiaro",
  titolo:"Il simpatico:<br>«**lotta o fuga**»",
  sotto:"Mediatori: **noradrenalina** e **adrenalina**."},
{id:"s15", tipo:"tre", tema:"chiaro", sopratitolo:"I recettori del simpatico", box:[
  {n:"α", t:"Alfa", d:"restringono i **vasi**"},
  {n:"β1", t:"Beta 1 · cuore", d:"↑ **frequenza** e **contrattilità**"},
  {n:"β2", t:"Beta 2 · bronchi", d:"**broncodilatazione**", key:true}]},
{id:"s16", tipo:"griglia", tema:"chiaro", colonne:4, spunta:false, sopratitolo:"Gli effetti del simpatico", celle:[
  {n:"↑", t:"**Frequenza** e **pressione**"}, {n:"·", t:"**Broncodilatazione**"}, {n:"·", t:"**Midriasi**", key:true},
  {n:"↓", t:"**Peristalsi**"}, {n:"·", t:"**Ritenzione** urinaria"}, {n:"↑", t:"**Glicemia**"}, {n:"·", t:"**Sudorazione**"}]},

{id:"s17", tipo:"titolo", tema:"chiaro",
  titolo:"Il parasimpatico:<br>«**riposo e digestione**»",
  sotto:"Mediatore: **acetilcolina** (recettori muscarinici) · nervo **vago**."},
{id:"s18", tipo:"tabella", tema:"chiaro", sopratitolo:"Effetti opposti", colonne:["30%","35%","35%"],
  intestazioni:["Effetto su", "Simpatico", "Parasimpatico"], righe:[
  ["Frequenza", "↑ aumenta", "↓ **ridotta**"], ["Bronchi", "dilatazione", "**broncocostrizione**"],
  ["Pupille", "midriasi", "**miosi**"], ["Intestino", "rallentato", "**più attivo**, più secrezioni"],
  ["Vescica", "ritenzione", "**svuotamento**"]], chiave:[2]},
{id:"s19", tipo:"catena", tema:"chiaro", sopratitolo:"La stimolazione vagale · lezione 8.2", passi:[
  {t:"**Aspirazione** tracheale · **sforzo** · **dolore** viscerale"}, {t:"Stimolazione del **vago**"},
  {t:"**Bradicardia** improvvisa", key:true}]},

{id:"s20", tipo:"trappola", tema:"chiaro", sopratitolo:"Beta-bloccanti: riducono frequenza e pressione", righe:[
  {sb:"Un beta-bloccante vale l'altro", ok:"I **non selettivi** bloccano anche i **β2** bronchiali: **broncospasmo**, cautela nell'asma"}]},
{id:"s21", tipo:"confronto", tema:"chiaro", sopratitolo:"Gli agonisti", col:[
  {h:"Salbutamolo · β2-agonista", t:"**broncodilatazione** · può dare tachicardia, tremori, **ipokaliemia**"},
  {h:"Adrenalina · α e β", t:"**anafilassi** e **arresto**"}]},
{id:"s22", tipo:"confronto", tema:"chiaro", sopratitolo:"L'atropina · un antimuscarinico", col:[
  {h:"Blocca l'acetilcolina", t:"**↑ frequenza**"},
  {h:"Ma", t:"**secchezza** delle mucose, **ritenzione**, **midriasi**, **confusione**"}]},
{id:"s23", tipo:"icone", tema:"chiaro", sopratitolo:"Anticolinergici nell'anziano · potenzialmente inappropriati · lezione 11.1", voci:[
  {icona:"anziano", t:"Delirium", key:true}, {icona:"colon", t:"Stipsi"}, {icona:"globo", t:"Ritenzione"}]},

{id:"s24", tipo:"tre", tema:"chiaro", sopratitolo:"Il circolo cerebrale · un flusso con autoregolazione", box:[
  {n:"1", t:"Carotidi interne"}, {n:"2", t:"Arterie vertebrali"}, {n:"→", t:"Poligono di Willis", d:"dove si uniscono", key:true}]},
{id:"s25", tipo:"cifre", tema:"chiaro", sopratitolo:"Dipende quasi solo dal glucosio", voci:[
  {n:"20", suf:"%", t:"dell'ossigeno del corpo", d:"circa · ipossia e ipoglicemia alterano subito la **coscienza**", key:true}]},
{id:"s26", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Le protezioni dell'encefalo", celle:[
  {t:"**Barriera ematoencefalica**: seleziona le sostanze"}, {t:"**Liquor**: prodotto nei ventricoli"}]},
{id:"s27", tipo:"catena", tema:"chiaro", sopratitolo:"Il cranio è rigido · Monro-Kellie · lezione 8.6", passi:[
  {t:"Encefalo · sangue · liquor"}, {t:"Uno dei tre **aumenta**"}, {t:"La **pressione** sale", key:true}]},

{id:"s28", tipo:"scala", tema:"chiaro", sopratitolo:"Il sistema endocrino · l'asse ipotalamo-ipofisi", gradini:[
  {t:"Le altre ghiandole"}, {t:"Ipofisi"}, {t:"Ipotalamo", d:"controlla l'ipofisi", key:true}]},
{id:"s29", tipo:"tabella", tema:"chiaro", sopratitolo:"L'ipofisi anteriore", colonne:["35%","65%"],
  intestazioni:["Ormone", "Azione"], righe:[
  ["GH", "ormone della **crescita**"], ["TSH", "stimola la **tiroide**"], ["ACTH", "stimola il **surrene**"],
  ["FSH e LH", "per le **gonadi**"], ["Prolattina", "—"]], chiave:[1]},
{id:"s30", tipo:"confronto", tema:"chiaro", sopratitolo:"L'ipofisi posteriore · tutto a feedback negativo", col:[
  {h:"ADH", t:"fa **riassorbire acqua** nel rene"}, {h:"Ossitocina", t:"**contrazioni uterine** · **eiezione del latte**"}]},

{id:"s31", tipo:"cifre", tema:"chiaro", sopratitolo:"La tiroide · regola il metabolismo", voci:[
  {n:"T3", t:"ormone tiroideo"}, {n:"T4", t:"ormone tiroideo"}, {n:"Iodio", t:"necessario per **produrli**", key:true}]},
{id:"s32", tipo:"confronto", tema:"chiaro", sopratitolo:"Il feedback spiega i valori di laboratorio", col:[
  {h:"Ipotiroidismo primario", t:"**TSH alto**", grande:true}, {h:"Ipertiroidismo primario", t:"**TSH basso**", grande:true}],
  sotto:"La tiroide produce poco: l'ipofisi aumenta il TSH."},
{id:"s33", tipo:"norma", tema:"chiaro", etichetta:"Paratiroidi · aumenta il calcio nel sangue", sigla:"PTH",
  testo:"Lesione nella **tiroidectomia** → **ipocalcemia** (lezione 9.6)."},

{id:"s34", tipo:"tre", tema:"chiaro", sopratitolo:"Il surrene · la parte corticale", box:[
  {n:"1", t:"Cortisolo", d:"ormone dello **stress**: ↑ glicemia, ↓ infiammazione", key:true},
  {n:"2", t:"Aldosterone", d:"regola **sodio** e **potassio**"}, {n:"3", t:"Androgeni"}]},
{id:"s35", tipo:"frase", tema:"chiaro", sopratitolo:"Il surrene · la parte midollare",
  testo:"**Adrenalina** e **noradrenalina**: gli stessi mediatori del **simpatico**."},
{id:"s36", tipo:"confronto", tema:"chiaro", sopratitolo:"Il pancreas endocrino · le isole di Langerhans", col:[
  {h:"Cellule β", t:"**insulina** · ↓ glicemia"}, {h:"Cellule α", t:"**glucagone** · ↑ glicemia"}]},
{id:"s37", tipo:"raggiera", tema:"chiaro", sopratitolo:"Gli ormoni dello stress: tutti iperglicemizzanti", centro:"Glicemia",
  raggi:[{t:"Glucagone"},{t:"Cortisolo"},{t:"Adrenalina"},{t:"GH"}]},

{id:"s38", tipo:"catena", tema:"chiaro", sopratitolo:"I corticosteroidi come farmaci · il feedback", passi:[
  {t:"**Corticosteroidi** somministrati a lungo"}, {t:"Si spengono **ACTH** e **surrene**"},
  {t:"Niente **cortisolo** proprio", key:true}]},
{id:"s39", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Da sorvegliare", celle:[
  {n:"!", t:"Sospensione **brusca**: **crisi surrenalica** · lezione 8.3", key:true},
  {n:"·", t:"**Iperglicemia**"}, {n:"·", t:"**Ritenzione** idrica"},
  {n:"·", t:"**Osteoporosi**"}, {n:"·", t:"**Infezioni**"}, {n:"·", t:"**Ritardo** di guarigione"}]},
{id:"s40", tipo:"frase", tema:"chiaro", sopratitolo:"Di solito al mattino",
  testo:"Imitano il ritmo naturale del **cortisolo**, più alto al **risveglio**."},

{id:"s41", tipo:"frase", tema:"chiaro", sopratitolo:"Il caso d'esame",
  testo:"«Paziente **asmatico** con ipertensione: il medico prescrive **propranololo**. Che cosa segnala l'infermiere?»"},
{id:"s42", sopratitolo:"Il caso · il farmaco", ...CASO([0,1,2], 2)},
{id:"s43", sopratitolo:"La fisiologia dell'autonomo previene un evento avverso", ...CASO([0,1,2,3], 3)},

{id:"s44", tipo:"icone", tema:"chiaro", sopratitolo:"Il collegamento con l'assistenza", voci:[
  {icona:"occhio", t:"Neurologica", d:"e **pupille**"}, {icona:"persona", t:"Lato del deficit", d:"e linguaggio"},
  {icona:"zucchero", t:"Glicemia", d:"in ogni alterazione della **coscienza**", key:true}, {icona:"cuore", t:"Bradicardia vagale", d:"durante le manovre"}]},
{id:"s45", tipo:"icone", tema:"chiaro", sopratitolo:"E ancora", voci:[
  {icona:"pillola", t:"Effetti autonomici", d:"dei farmaci"}, {icona:"provetta", t:"TSH", d:"e terapia tiroidea"},
  {icona:"goccia", t:"Glicemia", d:"da stress"}, {icona:"farmaci", t:"Corticosteroidi", d:"mai sospensione **brusca**", key:true}]},

{id:"s46", tipo:"tabella", tema:"chiaro", sopratitolo:"La tabella · il sistema nervoso", colonne:["30%","70%"],
  intestazioni:["Che cosa", "Da ricordare"], righe:[
  ["Nervi", "**12** cranici · **31** spinali"], ["Via motoria", "**incrociata** · linguaggio a **sinistra**"],
  ["Babinski", "**patologico** nell'adulto"], ["Simpatico", "α e β · **β1** cuore · **β2** bronchi"],
  ["Parasimpatico", "**acetilcolina** · **vago**"]], chiave:[3]},
{id:"s47", tipo:"tabella", tema:"chiaro", sopratitolo:"La tabella · il sistema endocrino", colonne:["32%","68%"],
  intestazioni:["Che cosa", "Da ricordare"], righe:[
  ["Ipofisi", "anteriore e posteriore"], ["Ipotiroidismo primario", "**TSH alto**"], ["PTH", "**↑ calcio**"],
  ["Surrene", "cortisolo · aldosterone"], ["Pancreas", "insulina **↓** · glucagone **↑** glicemia"],
  ["Ormoni dello stress", "**iperglicemizzanti**"]], chiave:[1]},

{id:"s48", tipo:"titolo", tema:"profondo",
  titolo:"Capire il recettore<br>è **capire il farmaco**.",
  sotto:"Se sai dove agisce un farmaco, ne prevedi effetti e rischi."},

{id:"s49", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Nella prossima lezione · le basi di trasfusione, anticoagulanti, infezioni", celle:[
  {n:"1", t:"Il **sangue**", key:true}, {n:"2", t:"I **gruppi sanguigni**"},
  {n:"3", t:"La **coagulazione**"}, {n:"4", t:"**Immunità** e **infiammazione**"}]},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione · 14.6",
  titolo:"Sangue, immunità<br>e infiammazione", sottotitolo:"Il sangue, i gruppi sanguigni, la coagulazione, le difese del corpo",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
