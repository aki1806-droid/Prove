// Contenuto delle 50 scene della lezione 14.2 — l'apparato cardiocircolatorio.
// Il percorso del sangue e il sistema di conduzione sono due percorsi che si
// accendono tappa per tappa; il ciclo cardiaco un anello di quattro fasi; le
// formule della gittata e della pressione due catene; i vasi un «tre» a quattro.

const PICCOLO = (att, k) => ({tipo:"percorso", tema:"chiaro", tappe:[
  {t:"Vene cave", d:"sangue povero di O₂", key:k===0},
  {t:"Atrio destro", d:"poi la tricuspide", key:k===1},
  {t:"Ventricolo destro", d:"poi la valvola polmonare", key:k===2},
  {t:"Arteria polmonare", d:"sangue povero di O₂", key:k===3},
  {t:"Polmoni", d:"il piccolo circolo", key:k===4}], attive:att});

const GRANDE = (att, k) => ({tipo:"percorso", tema:"chiaro", tappe:[
  {t:"Vene polmonari", d:"sangue ricco di O₂", key:k===0},
  {t:"Atrio sinistro", d:"poi la mitrale", key:k===1},
  {t:"Ventricolo sinistro", d:"poi la valvola aortica", key:k===2},
  {t:"Aorta", key:k===3},
  {t:"Organi", d:"il grande circolo", key:k===4}], attive:att});

const CONDUZIONE = (att, k) => ({tipo:"percorso", tema:"chiaro", tappe:[
  {t:"Nodo senoatriale", d:"pacemaker naturale", key:k===0},
  {t:"Atri", key:k===1},
  {t:"Nodo atrioventricolare", d:"rallenta l'impulso", key:k===2},
  {t:"Fascio di His", key:k===3},
  {t:"Branche destra e sinistra", key:k===4},
  {t:"Fibre di Purkinje", d:"attivano i ventricoli", key:k===5}], attive:att});

const TONI = (att, k) => ({tipo:"tre", tema:"chiaro", box:[
  {n:"S1", t:"Primo tono", d:"chiusura delle **atrioventricolari** · inizio della sistole", key:k===0},
  {n:"S2", t:"Secondo tono", d:"chiusura delle **semilunari** · inizio della diastole", key:k===1},
  {n:"~", t:"Soffi", d:"flusso **turbolento** · es. malattie delle valvole", key:k===2}], attive:att});

const VASI = (att, k) => ({tipo:"tre", tema:"chiaro", box:[
  {n:"1", t:"Arterie", d:"parete elastica e muscolare · **alta** pressione", key:k===0},
  {n:"2", t:"Arteriole", d:"i vasi di **resistenza**", key:k===1},
  {n:"3", t:"Capillari", d:"gli **scambi**", key:k===2},
  {n:"4", t:"Vene", d:"**bassa** pressione · vasi di **capacitanza**", key:k===3}], attive:att});

const SCOMPENSO = (att, k) => ({tipo:"percorso", tema:"chiaro", tappe:[
  {t:"Gittata insufficiente", d:"non soddisfa i bisogni", key:k===0},
  {t:"Simpatico e renina-angiotensina", d:"si attivano", key:k===1},
  {t:"Compensi", d:"utili all'inizio", key:k===2},
  {t:"Sovraccarico del cuore", d:"a lungo andare il quadro peggiora", key:k===3}], attive:att});

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 14 · Basi biomediche e semeiotica",
  titolo:"Apparato<br>cardiocircolatorio", sottotitolo:"14.2 · Cuore, circolazione, conduzione, gittata e pressione arteriosa",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"tre", tema:"chiaro", sopratitolo:"Micro-lezione 2 di 8 · l'apparato cardiocircolatorio", box:[
  {n:"1", t:"Il cuore", d:"una **pompa**"}, {n:"2", t:"I vasi", d:"i **tubi**"}, {n:"3", t:"Il sangue", d:"il **mezzo di trasporto**"}]},
{id:"s03", tipo:"raggiera", tema:"chiaro", sopratitolo:"Che cosa dipende da questo sistema · moduli 8 e 10", centro:"Circolo",
  raggi:[{t:"Pressione"}, {t:"Perfusione", d:"degli organi"}, {t:"Shock", d:"la risposta", key:true}, {t:"Farmaci", d:"l'azione di molti"}]},

{id:"s04", tipo:"confronto", tema:"chiaro", sopratitolo:"4 cavità · le valvole atrioventricolari separano atri e ventricoli", col:[
  {h:"Cuore destro", t:"atrio e ventricolo destro · valvola **tricuspide**"},
  {h:"Cuore sinistro", t:"atrio e ventricolo sinistro · valvola **mitrale** o bicuspide"}]},
{id:"s05", tipo:"confronto", tema:"chiaro", sopratitolo:"Le valvole semilunari · fra i ventricoli e le grandi arterie", col:[
  {h:"Valvola polmonare", t:"all'uscita del ventricolo **destro**"},
  {h:"Valvola aortica", t:"all'uscita del ventricolo **sinistro**"}]},
{id:"s06", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"La parete del cuore", celle:[
  {t:"**Endocardio**, **miocardio**, **epicardio**"}, {t:"Avvolta dal **pericardio**"},
  {t:"Ventricolo sinistro: parete **più spessa**", key:true}, {t:"Pompa in tutto il corpo, contro una **pressione più alta**"}]},

{id:"s07", sopratitolo:"Il percorso del sangue", ...PICCOLO([0,1,2], 2)},
{id:"s08", sopratitolo:"Dal cuore destro ai polmoni", ...PICCOLO([0,1,2,3,4], 4)},
{id:"s09", sopratitolo:"Ossigenato, torna al cuore sinistro", ...GRANDE([0,1,2,3,4], 4)},
{id:"s10", tipo:"trappola", tema:"chiaro", sopratitolo:"La domanda trabocchetto", righe:[
  {sb:"«Le arterie portano sangue ossigenato»", ok:"L'**arteria polmonare** porta sangue **povero** di O₂, le **vene polmonari** sangue **ricco**"},
  {sb:"«Arteria = sangue ricco di O₂»", ok:"Arteria = vaso che **esce dal cuore**, non un tipo di sangue"}]},

{id:"s11", tipo:"frase", tema:"chiaro", sopratitolo:"Le coronarie · le arterie che nutrono il cuore",
  testo:"Nascono dall'**aorta**, subito sopra la **valvola aortica**.", sotto:"Coronaria destra · coronaria sinistra"},
{id:"s12", tipo:"tre", tema:"chiaro", sopratitolo:"Tre nomi da ricordare", box:[
  {n:"Dx", t:"Coronaria destra"}, {n:"Sx", t:"Discendente anteriore", d:"ramo della coronaria sinistra", key:true},
  {n:"Sx", t:"Circonflessa", d:"ramo della coronaria sinistra"}]},
{id:"s13", tipo:"catena", tema:"chiaro", sopratitolo:"Il miocardio si perfonde soprattutto in diastole, a muscolo rilassato", passi:[
  {t:"**Tachicardia**"}, {t:"Diastole **più corta**"}, {t:"Meno **perfusione** coronarica"},
  {t:"**Ischemia**", d:"se le coronarie sono malate", key:true}]},

{id:"s14", tipo:"cifre", tema:"chiaro", sopratitolo:"Il sistema di conduzione · l'impulso nasce qui e si diffonde negli atri", voci:[
  {n:"60–100", suf:"", t:"battiti al minuto", d:"il **nodo senoatriale**, pacemaker naturale", key:true}]},
{id:"s15", sopratitolo:"Il nodo AV rallenta: i ventricoli si riempiono", ...CONDUZIONE([0,1,2], 2)},
{id:"s16", sopratitolo:"I blocchi della lezione 8.1 interrompono questa via", ...CONDUZIONE([0,1,2,3,4,5], 5)},
{id:"s17", tipo:"tre", tema:"chiaro", sopratitolo:"All'ECG", box:[
  {n:"P", t:"Depolarizzazione", d:"degli **atri**"}, {n:"QRS", t:"Depolarizzazione", d:"dei **ventricoli**", key:true},
  {n:"T", t:"Ripolarizzazione", d:"dei **ventricoli**"}]},

{id:"s18", tipo:"ciclo", tema:"chiaro", sopratitolo:"Il ciclo cardiaco", centro:"Ciclo", passi:[
  {t:"Contrazione", d:"sistole"}, {t:"Eiezione", d:"sistole", key:true},
  {t:"Rilasciamento", d:"diastole"}, {t:"Riempimento", d:"diastole"}]},
{id:"s19", sopratitolo:"I toni cardiaci · i rumori della chiusura delle valvole", ...TONI([0], 0)},
{id:"s20", sopratitolo:"I toni cardiaci e i soffi", ...TONI([0,1,2], 1)},

{id:"s21", tipo:"catena", tema:"chiaro", sopratitolo:"La gittata cardiaca · il sangue pompato in un minuto", passi:[
  {t:"Gittata **sistolica**", d:"il sangue espulso a ogni battito"}, {t:"× Frequenza **cardiaca**"},
  {t:"= Gittata **cardiaca**", key:true}]},
{id:"s22", tipo:"cifre", tema:"chiaro", sopratitolo:"La gittata sistolica dipende da tre fattori", voci:[
  {n:"5", suf:"L/min", t:"gittata cardiaca a riposo", d:"circa", key:true}]},
{id:"s23", tipo:"frase", tema:"chiaro", sopratitolo:"Il precarico · il riempimento del ventricolo · legge di Frank-Starling",
  testo:"Entro certi limiti, **più il cuore si riempie, più forte si contrae**."},
{id:"s24", tipo:"tre", tema:"chiaro", sopratitolo:"I determinanti della gittata sistolica", box:[
  {n:"1", t:"Precarico", d:"il **riempimento**"}, {n:"2", t:"Postcarico", d:"la **resistenza** da vincere", key:true},
  {n:"3", t:"Contrattilità", d:"la **forza intrinseca** del muscolo"}]},
{id:"s25", tipo:"tabella", tema:"chiaro", sopratitolo:"I farmaci della lezione 5.5 agiscono su questi tre fattori", colonne:["45%","55%"],
  intestazioni:["Fattore", "Farmaci"], righe:[
  ["Precarico", "**diuretici**"], ["Postcarico", "**vasodilatatori**"], ["Contrattilità", "**inotropi**"]]},

{id:"s26", tipo:"catena", tema:"chiaro", sopratitolo:"La pressione arteriosa", passi:[
  {t:"Gittata **cardiaca**"}, {t:"× Resistenze **periferiche**", d:"soprattutto le **arteriole**, i vasi di resistenza"},
  {t:"= Pressione **arteriosa**", key:true}]},
{id:"s27", tipo:"frase", tema:"chiaro", sopratitolo:"Si misurano sistolica e diastolica · la pressione arteriosa media",
  testo:"**Media** ≈ diastolica + ⅓ (sistolica − diastolica)"},
{id:"s28", tipo:"cifre", tema:"chiaro", sopratitolo:"Un esempio · e l'obiettivo nello shock e nella sepsi", voci:[
  {n:"80", suf:"", t:"media, circa", d:"con **120/60**: 60 + ⅓ di 60"},
  {n:"65", suf:"mmHg", t:"media, almeno", d:"nello **shock** e nella **sepsi**", key:true}]},

{id:"s29", tipo:"catena", tema:"chiaro", sopratitolo:"La regolazione a breve termine", passi:[
  {t:"**Barocettori**", d:"seno carotideo · arco aortico"}, {t:"Percepiscono i **cambiamenti** di pressione"},
  {t:"Sistema nervoso **autonomo**", key:true}]},
{id:"s30", tipo:"confronto", tema:"chiaro", sopratitolo:"Il sistema nervoso autonomo", col:[
  {h:"Simpatico", t:"↑ frequenza · ↑ contrattilità · **restringe i vasi**"},
  {h:"Parasimpatico", t:"**rallenta** il cuore"}]},
{id:"s31", tipo:"frase", tema:"chiaro", sopratitolo:"Quando ti alzi in piedi",
  testo:"Senza questa risposta, **sveniresti**.", sotto:"Lo ritroviamo nell'anziano: l'ipotensione ortostatica"},
{id:"s32", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"A medio-lungo termine · il sistema renina-angiotensina-aldosterone", celle:[
  {t:"Restringe i **vasi**"}, {t:"Fa trattenere **sodio** e **acqua**"},
  {t:"Insieme all'**ADH** e al **rene**"}, {t:"Lo bloccano **ACE-inibitori** e **sartani**", key:true}]},

{id:"s33", sopratitolo:"I vasi", ...VASI([0,1,2], 2)},
{id:"s34", sopratitolo:"Le vene · la maggior parte del sangue · valvole contro il reflusso", ...VASI([0,1,2,3], 3)},
{id:"s35", tipo:"icone", tema:"chiaro", sopratitolo:"Il ritorno venoso dagli arti inferiori", voci:[
  {icona:"gambe", t:"Pompa muscolare", d:"del polpaccio"}, {icona:"polmoni", t:"Respirazione"},
  {icona:"deambulatore", t:"Mobilizzazione", d:"previene la **trombosi**", key:true}]},
{id:"s36", tipo:"confronto", tema:"chiaro", sopratitolo:"Le alterazioni dei vasi", col:[
  {h:"Insufficienza venosa", t:"lezione 7.3 · si cammina con la **compressione**"},
  {h:"Aterosclerosi", t:"anche questa fra le **alterazioni** dei vasi"}]},

{id:"s37", tipo:"confronto", tema:"chiaro", sopratitolo:"L'ischemia · squilibrio fra domanda e offerta di O₂ al miocardio", col:[
  {h:"Angina", t:"squilibrio **transitorio** e **reversibile**"},
  {h:"Infarto", t:"porta alla **necrosi**"}]},
{id:"s38", sopratitolo:"Lo scompenso", ...SCOMPENSO([0,1,2], 1)},
{id:"s39", sopratitolo:"Per questo i farmaci dello scompenso li bloccano", ...SCOMPENSO([0,1,2,3], 3)},
{id:"s40", tipo:"tre", tema:"chiaro", sopratitolo:"La fisiopatologia essenziale", box:[
  {n:"1", t:"Aritmie", d:"disturbi della **formazione** o della **conduzione** dell'impulso"},
  {n:"2", t:"Shock", d:"perfusione **inadeguata** dei tessuti · lezione 10.6", key:true}]},

{id:"s41", tipo:"frase", tema:"chiaro", sopratitolo:"Il caso d'esame",
  testo:"«Paziente in **fibrillazione atriale rapida**, FC **150**, riferisce **dolore toracico**: perché?»"},
{id:"s42", tipo:"confronto", tema:"chiaro", sopratitolo:"La tachicardia", col:[
  {h:"Domanda ↑", t:"aumenta il **consumo di ossigeno** del cuore"},
  {h:"Offerta ↓", t:"diastole più corta: **meno perfusione** coronarica"}], sotto:"Domanda alta, offerta bassa: **ischemia**"},
{id:"s43", tipo:"tre", tema:"chiaro", sopratitolo:"In più, una frequenza così alta", box:[
  {n:"1", t:"Meno riempimento", d:"dei ventricoli → meno **gittata**"},
  {n:"2", t:"Controllo della frequenza", d:"una **priorità**", key:true},
  {n:"3", t:"Dolore toracico", d:"va segnalato **subito**"}]},

{id:"s44", tipo:"icone", tema:"chiaro", sopratitolo:"Il collegamento con l'assistenza", voci:[
  {icona:"stetoscopio", t:"Pressione e frequenza", d:"lezione 2.3"},
  {icona:"anziano", t:"Ipotensione ortostatica", d:"baroriflesso più lento"},
  {icona:"persona", t:"Alzata in due tempi", key:true}]},
{id:"s45", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"E ancora", celle:[
  {t:"**Polsi periferici**"}, {t:"**Riempimento capillare**"},
  {t:"Azione dei **farmaci** cardiovascolari"}, {t:"Prevenzione della **TVP**", key:true}]},

{id:"s46", tipo:"tabella", tema:"chiaro", sopratitolo:"La tabella · il cuore", colonne:["30%","70%"],
  intestazioni:["Che cosa", "Da ricordare"], righe:[
  ["Valvole AV", "**tricuspide** a destra · **mitrale** a sinistra"],
  ["Arteria polmonare", "sangue **povero** di O₂"],
  ["Coronarie", "destra · discendente anteriore · circonflessa · perfuse in **diastole**"],
  ["Conduzione", "nodo SA 60–100 → nodo AV → His → branche → **Purkinje**"]], chiave:[1]},
{id:"s47", tipo:"tabella", tema:"chiaro", sopratitolo:"La tabella · funzione e pressione", colonne:["28%","72%"],
  intestazioni:["Che cosa", "Da ricordare"], righe:[
  ["ECG e toni", "**P · QRS · T** · S1 chiusura AV · S2 semilunari"],
  ["Gittata", "gittata sistolica × FC (~**5 L/min**)"],
  ["Determinanti", "precarico · postcarico · contrattilità"],
  ["Pressione", "gittata × resistenze · **PAM** ≈ PAD + ⅓ differenziale"],
  ["Regolazione", "barocettori · renina-angiotensina-aldosterone"]], chiave:[3]},

{id:"s48", tipo:"titolo", tema:"profondo",
  titolo:"La pressione è il risultato<br>di **una pompa e di un tubo**.",
  sotto:"Quando cade: ha ceduto la pompa, manca il volume, o il tubo si è dilatato?"},

{id:"s49", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Nella prossima lezione · l'apparato respiratorio", celle:[
  {n:"1", t:"L'**apparato respiratorio**"}, {n:"2", t:"Gli **scambi gassosi**"},
  {n:"3", t:"La **curva di dissociazione** dell'emoglobina", key:true}]},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione · 14.3",
  titolo:"Apparato<br>respiratorio", sottotitolo:"Gli scambi gassosi e la curva di dissociazione dell'emoglobina",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
