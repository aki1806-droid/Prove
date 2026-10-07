// Contenuto delle 50 scene della lezione 14.4 — apparato digerente, fegato e rene.
// La digestione e il nefrone sono due percorsi che si accendono tappa per tappa;
// fegato e rene due raggiere delle funzioni; i segni dell'insufficienza epatica
// una griglia «meno funzione → segno»; le soglie della diuresi una scala.

const DIGESTIONE = (att, k) => ({tipo:"percorso", tema:"chiaro", tappe:[
  {t:"Bocca", d:"masticazione, amilasi salivare", key:k.includes(0)},
  {t:"Stomaco", d:"HCl, pepsina, fattore intrinseco", key:k.includes(1)},
  {t:"Duodeno", d:"bile, enzimi pancreatici", key:k.includes(2)},
  {t:"Tenue", d:"assorbimento dei nutrienti (villi)", key:k.includes(3)},
  {t:"Colon", d:"acqua, elettroliti, vitamina K", key:k.includes(4)}], attive:att});

const FEGATO = (att, k) => ({tipo:"raggiera", tema:"chiaro", centro:"Fegato", raggi:[
  {t:"Metabolismo", key:k===0}, {t:"Sintesi", key:k===1}, {t:"Bile", key:k===2},
  {t:"Urea", key:k===3}, {t:"Farmaci", key:k===4}, {t:"Deposito", key:k===5}], attive:att});

const EPATICA = att => ({tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, celle:[
  {n:"↓", t:"Albumina → **edemi, ascite**"},
  {n:"↓", t:"Fattori della coagulazione → **INR alto, sanguinamenti**"},
  {n:"↓", t:"Coniugazione della bilirubina → **ittero**"},
  {n:"↓", t:"Eliminazione dell'ammoniaca → **encefalopatia**"},
  {n:"↓", t:"Produzione di glucosio → **ipoglicemia**"},
  {n:"↓", t:"Metabolismo dei farmaci → **accumulo**"}], attive:att});

const NEFRONE = (att, k) => ({tipo:"percorso", tema:"chiaro", tappe:[
  {t:"Glomerulo", d:"filtrazione nella capsula di Bowman", key:k===0},
  {t:"Tubulo prossimale", d:"riassorbe la maggior parte", key:k===1},
  {t:"Ansa di Henle", d:"concentra le urine · sede della furosemide", key:k===2},
  {t:"Distale e collettore", d:"regolazione fine: aldosterone, ADH", key:k===3}], attive:att});

const FARMACI = att => ({tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, celle:[
  {n:"·", t:"**Aminoglicosidi**"}, {n:"·", t:"**Vancomicina**"}, {n:"·", t:"**Eparine** a basso peso molecolare"},
  {n:"·", t:"**Metformina**"}, {n:"·", t:"**Digossina**"}, {n:"·", t:"Alcuni **oppioidi**"}], attive:att});

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 14 · Basi biomediche e semeiotica",
  titolo:"Apparato digerente,<br>fegato e rene", sottotitolo:"14.4 · Digestione, funzioni epatiche, nefrone, clearance e diuresi",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"icone", tema:"chiaro", sopratitolo:"Micro-lezione 4 di 8 · tre organi che lavorano insieme", voci:[
  {icona:"stomaco", t:"Il digerente", d:"**introduce**"}, {icona:"fegato", t:"Il fegato", d:"**trasforma**"},
  {icona:"rene", t:"Il rene", d:"**elimina**", key:true}]},
{id:"s03", tipo:"tre", tema:"chiaro", sopratitolo:"Nell'insufficienza epatica e renale cambiano", box:[
  {n:"1", t:"Le dosi", d:"dei farmaci", key:true}, {n:"2", t:"I parametri", d:"da sorvegliare"}, {n:"3", t:"I rischi", d:"per il paziente"}]},

{id:"s04", sopratitolo:"La digestione, tappa per tappa", ...DIGESTIONE([0,1], [1])},
{id:"s05", tipo:"catena", tema:"chiaro", sopratitolo:"Lo stomaco produce il fattore intrinseco", passi:[
  {t:"**Fattore intrinseco**"}, {t:"Assorbimento della **vitamina B12**"},
  {t:"Dopo una **gastrectomia**", d:"B12 per via **parenterale**", key:true}]},
{id:"s06", tipo:"confronto", tema:"chiaro", sopratitolo:"Nel duodeno arrivano", col:[
  {h:"La bile", t:"**emulsiona** i grassi"}, {h:"Gli enzimi pancreatici", t:"**amilasi**, **lipasi**, **tripsina**"}],
  sotto:"Pancreatite · lezione 8.5: attivati troppo presto, **digeriscono il pancreas**."},
{id:"s07", sopratitolo:"Tenue: assorbimento · colon: acqua e vitamina K", ...DIGESTIONE([0,1,2,3,4], [3,4])},

{id:"s08", sopratitolo:"Le funzioni del fegato · metabolismo e deposito", ...FEGATO([0,5], 0)},
{id:"s09", tipo:"tre", tema:"chiaro", sopratitolo:"Il fegato · la sintesi", box:[
  {n:"1", t:"Albumina"}, {n:"2", t:"Fattori della coagulazione", d:"vitamina K-dipendenti: **II, VII, IX, X**", key:true},
  {n:"3", t:"Warfarin", d:"agisce proprio su **questi fattori**"}]},
{id:"s10", tipo:"catena", tema:"chiaro", sopratitolo:"Funzioni che ritroviamo nell'insufficienza epatica", passi:[
  {t:"Produce la **bile**", d:"e coniuga la **bilirubina**"}, {t:"**Ammoniaca** → **urea**", d:"la detossificazione", key:true}]},
{id:"s11", tipo:"catena", tema:"chiaro", sopratitolo:"Citocromo P450 · effetto di primo passaggio · lezione 5.1", passi:[
  {t:"Farmaco **per bocca**"}, {t:"Il **fegato** ne inattiva una parte"},
  {t:"In circolo ne arriva **solo una parte**", key:true}]},

{id:"s12", sopratitolo:"L'insufficienza epatica · i segni si ricavano dalle funzioni", ...EPATICA([0,1])},
{id:"s13", sopratitolo:"L'insufficienza epatica · ogni segno è una funzione che manca", ...EPATICA([0,1,2,3,4])},
{id:"s14", tipo:"catena", tema:"chiaro", sopratitolo:"Meno metabolismo dei farmaci", passi:[
  {t:"**Sedativi** e **oppioidi**"}, {t:"Si **accumulano**"}, {t:"Possono scatenare l'**encefalopatia**", key:true}]},
{id:"s15", tipo:"confronto", tema:"chiaro", sopratitolo:"E poi", col:[
  {h:"Ipertensione portale", t:"**varici** e **ascite**", grande:true},
  {h:"Lezione 8.5", t:"il quadro clinico, spiegato dalla **fisiologia**"}]},

{id:"s16", sopratitolo:"Il nefrone · l'unità funzionale, circa un milione per rene", ...NEFRONE([0], 0)},
{id:"s17", sopratitolo:"Il nefrone · riassorbimento e concentrazione", ...NEFRONE([0,1,2], 2)},
{id:"s18", sopratitolo:"Il nefrone · la regolazione fine", ...NEFRONE([0,1,2,3], 3)},

{id:"s19", tipo:"cifre", tema:"chiaro", sopratitolo:"Filtrazione · oltre il 99% del filtrato viene riassorbito", voci:[
  {n:"180", suf:" L", t:"filtrato al giorno", d:"circa, di plasma", key:true}, {n:"1,5", suf:" L", t:"urine al giorno", d:"circa"}]},
{id:"s20", tipo:"norma", tema:"chiaro", etichetta:"Velocità di filtrazione glomerulare", sigla:"GFR",
  testo:"Normale circa **90–120 ml/min**. La **clearance**: plasma depurato da una sostanza nell'unità di tempo."},
{id:"s21", tipo:"catena", tema:"chiaro", sopratitolo:"Attenzione: la creatinina dipende dalla massa muscolare", passi:[
  {t:"La **creatinina**"}, {t:"Una formula", d:"come la **CKD-EPI**"}, {t:"Il **GFR stimato**", key:true}]},
{id:"s22", tipo:"trappola", tema:"chiaro", sopratitolo:"L'anziano magro e sarcopenico", righe:[
  {sb:"«Creatinina normale, quindi rene normale»", ok:"La funzione renale può essere **ridotta**: le dosi si adattano al **GFR stimato**"}]},

{id:"s23", tipo:"raggiera", tema:"chiaro", sopratitolo:"Le funzioni del rene · le complicanze della lezione 8.4", centro:"Rene", raggi:[
  {t:"Acqua"}, {t:"Acido-base"}, {t:"Scorie", key:true},
  {t:"EPO"}, {t:"Vitamina D"}, {t:"Renina"}], attive:[0,1,2]},
{id:"s24", tipo:"confronto", tema:"chiaro", sopratitolo:"Insufficienza renale cronica · per questo", col:[
  {h:"Eritropoietina", t:"globuli rossi → **anemia**"}, {h:"Vitamina D", t:"attivata dal rene → **calcio** e **osso**"}]},
{id:"s25", tipo:"catena", tema:"chiaro", sopratitolo:"Il rene e la pressione arteriosa", passi:[
  {t:"La **renina**"}, {t:"Sistema **renina-angiotensina-aldosterone**"},
  {t:"Vasi ristretti · **sodio** e **acqua** trattenuti", key:true}]},

{id:"s26", sopratitolo:"Insufficienza renale · i farmaci eliminati dal rene si accumulano", ...FARMACI([0,1,2])},
{id:"s27", sopratitolo:"Dosi adattate al GFR · livelli nel sangue, quando previsto", ...FARMACI([0,1,2,3,4,5])},
{id:"s28", tipo:"icone", tema:"chiaro", sopratitolo:"Si evitano i nefrotossici", voci:[
  {icona:"divieto", t:"FANS"}, {icona:"divieto", t:"Mezzo di contrasto", d:"senza prevenzione · lezione 14.7"},
  {icona:"avviso", t:"Iperkaliemia", d:"attenzione", key:true}]},
{id:"s29", tipo:"tre", tema:"chiaro", sopratitolo:"Iperkaliemia · l'infermiere segnala la terapia inappropriata", box:[
  {n:"1", t:"Potassio"}, {n:"2", t:"ACE-inibitori"}, {n:"3", t:"Diuretici", d:"**risparmiatori** di potassio", key:true}]},

{id:"s30", tipo:"cifre", tema:"chiaro", sopratitolo:"La diuresi · nell'adulto", voci:[
  {n:"0,5", suf:" ml/kg/h", t:"diuresi normale", d:"**almeno**", key:true}]},
{id:"s31", tipo:"scala", tema:"chiaro", sopratitolo:"Le definizioni · nelle 24 ore", gradini:[
  {n:"< 100 ml", t:"Anuria"}, {n:"< 400 ml", t:"Oliguria", key:true}, {n:"> 2,5–3 L", t:"Poliuria"}]},
{id:"s32", tipo:"frase", tema:"chiaro", sopratitolo:"Nello shock e nella sepsi",
  testo:"La diuresi è un indicatore della **perfusione** degli organi.",
  sotto:"Per questo si misura **ogni ora**."},

{id:"s33", tipo:"confronto", tema:"chiaro", sopratitolo:"La vescica · un serbatoio con un muscolo, il detrusore", col:[
  {h:"Capacità indicativa", t:"**400–500 ml**", grande:true}, {h:"Lo stimolo, in genere", t:"**150–300 ml**", grande:true}]},
{id:"s34", tipo:"confronto", tema:"chiaro", sopratitolo:"Lo svuotamento", col:[
  {h:"Il parasimpatico", t:"contrae il **detrusore**"}, {h:"Gli sfinteri", t:"interno ed esterno: l'**esterno** è **volontario**"}]},
{id:"s35", tipo:"catena", tema:"chiaro", sopratitolo:"Il collegamento con la farmacologia · lezioni 3.6 e 9.4", passi:[
  {t:"**Anticolinergici**"}, {t:"**Oppioidi**"}, {t:"**Ritenzione** urinaria", key:true}]},

{id:"s36", tipo:"frase", tema:"chiaro", sopratitolo:"Il caso d'esame",
  testo:"«Anziana di **86 anni**, **45 kg**, creatinina **1,0 mg/dl**: la funzione renale è normale, la dose standard va bene?»"},
{id:"s37", tipo:"confronto", tema:"chiaro", sopratitolo:"No · poca massa muscolare: il valore da solo inganna", col:[
  {h:"La creatinina", t:"**1,0** · sembra normale"}, {h:"Il GFR stimato", t:"nettamente **ridotto**", grande:true}]},
{id:"s38", tipo:"percorso", tema:"chiaro", sopratitolo:"Prima di un farmaco a eliminazione renale", tappe:[
  {t:"Verificare", d:"il GFR stimato o la clearance"}, {t:"Valutare la dose", d:"sembra eccessiva?"},
  {t:"Segnalare", d:"al medico o al farmacista", key:true}]},

{id:"s39", tipo:"icone", tema:"chiaro", sopratitolo:"Il collegamento con l'assistenza", voci:[
  {icona:"bicchiere", t:"Stato nutrizionale", d:"lezione 3.3"}, {icona:"goccia", t:"INR", d:"e sanguinamento nell'epatopatico", key:true},
  {icona:"fegato", t:"Encefalopatia", d:"e stipsi"}]},
{id:"s40", tipo:"icone", tema:"chiaro", sopratitolo:"E ancora", voci:[
  {icona:"bilancia", t:"Bilancio idrico", d:"e diuresi oraria"}, {icona:"calcolatrice", t:"Dosi", d:"e funzione renale", key:true},
  {icona:"scudo", t:"Nefrotossicità", d:"prevenzione"}, {icona:"catetere", t:"Cateterismo", d:"e ritenzione"}]},

{id:"s41", tipo:"tre", tema:"chiaro", cifre:true, sopratitolo:"I numeri della lezione · valori indicativi", box:[
  {t:"180", d:"litri di filtrato al giorno"}, {t:"1,5", d:"litri di urine al giorno"},
  {t:"90–120", d:"GFR normale, ml/min", key:true}, {t:"0,5", d:"diuresi minima, ml/kg/h"}]},
{id:"s42", tipo:"tabella", tema:"chiaro", sopratitolo:"I numeri della lezione · valori indicativi", colonne:["44%","56%"],
  intestazioni:["Che cosa", "Valore"], righe:[
  ["Oliguria", "< **400 ml**/24 h"], ["Anuria", "< **100 ml**/24 h"], ["Poliuria", "> **2,5–3 L**/24 h"],
  ["Vescica", "**400–500 ml**"], ["Fattori vitamina K-dipendenti", "**II, VII, IX, X**"]], chiave:[0]},

{id:"s43", tipo:"tabella", tema:"chiaro", sopratitolo:"La tabella · digerente e fegato", colonne:["24%","76%"],
  intestazioni:["Sede", "Da ricordare"], righe:[
  ["Stomaco", "HCl, pepsina, **fattore intrinseco** → B12"], ["Duodeno", "**bile**, enzimi pancreatici"],
  ["Tenue", "**assorbimento**"], ["Colon", "**acqua**, vitamina K"],
  ["Fegato", "albumina, **coagulazione**, bilirubina, ammoniaca → urea, farmaci"]], chiave:[4]},
{id:"s44", tipo:"tabella", tema:"chiaro", sopratitolo:"La tabella · insufficienza epatica e rene", colonne:["32%","68%"],
  intestazioni:["Che cosa", "Da ricordare"], righe:[
  ["Insufficienza epatica", "edemi, INR, ittero, encefalopatia, ipoglicemia, accumulo"],
  ["Nefrone", "glomerulo, prossimale, **Henle** (furosemide), distale e collettore"],
  ["Creatinina", "dipende dalla **massa muscolare**"], ["Il rene produce", "**eritropoietina**, vitamina D, renina"]], chiave:[2]},

{id:"s45", tipo:"confronto", tema:"chiaro", sopratitolo:"Il filo con gli altri moduli", col:[
  {h:"Lezioni 5.1 e 5.2", t:"il **primo passaggio** e le vie di somministrazione"},
  {h:"Lezione 8.5", t:"l'**encefalopatia** e la paracentesi"}]},
{id:"s46", tipo:"tre", tema:"chiaro", sopratitolo:"E ancora", box:[
  {n:"8.4", t:"Fistola e dialisi"}, {n:"3.3", t:"Nutrizione"}, {n:"3.6", t:"Ritenzione", key:true}]},

{id:"s47", tipo:"titolo", tema:"profondo",
  titolo:"Una creatinina normale<br>non garantisce<br>**un rene normale**.",
  sotto:"Soprattutto nell'anziano fragile."},

{id:"s48", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Nella prossima lezione", celle:[
  {n:"1", t:"Il **sistema nervoso**, con il sistema nervoso **autonomo**"}, {n:"2", t:"Il **sistema endocrino**"},
  {n:"3", t:"I collegamenti con la **farmacologia**"}]},
{id:"s49", tipo:"frase", tema:"chiaro", sopratitolo:"Un esempio da questa lezione",
  testo:"Il **parasimpatico** che contrae il detrusore: lo ritroverai nel **sistema nervoso autonomo**."},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione · 14.5",
  titolo:"Sistema nervoso<br>ed endocrino", sottotitolo:"Il sistema nervoso autonomo, il sistema endocrino e i collegamenti con la farmacologia",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
