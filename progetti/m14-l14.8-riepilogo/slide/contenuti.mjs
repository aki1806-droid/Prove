// Contenuto delle 50 scene della lezione 14.8 — riepilogo del Modulo 14.
// Due strumenti: le tabelle dei valori da fotografare e i collegamenti fra
// fisiologia e assistenza. Prima gli apparati uno per uno, poi la tabella
// (in tabelle vere), i collegamenti, le confusioni come trappole e le
// domande d'orale come griglie numerate. Ogni valore viene dallo script 14.8.

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 14 · Riepilogo",
  titolo:"Le tabelle dei valori<br>e i collegamenti", sottotitolo:"14.8 · Riepilogo del modulo e autovalutazione",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"confronto", tema:"chiaro", sopratitolo:"Chiudiamo le basi biomediche con due strumenti", col:[
  {h:"Le tabelle dei valori", t:"da **fotografare**"},
  {h:"I collegamenti", t:"fra **fisiologia** e **assistenza**: la vera utilità del modulo"}]},
{id:"s03", tipo:"percorso", tema:"chiaro", sopratitolo:"All'esame si ragiona sul meccanismo", tappe:[
  {t:"Liquidi e acido-base"}, {t:"Cuore e circolo"}, {t:"Respiro"}, {t:"Digerente, fegato, rene"},
  {t:"Nervoso ed endocrino"}, {t:"Sangue e difese"}, {t:"Tabella e collegamenti", key:true}]},

{id:"s04", tipo:"cifre", tema:"chiaro", sopratitolo:"Liquidi e acido-base · l'acqua corporea nell'adulto", voci:[
  {n:"60", suf:"%", t:"del peso", d:"acqua corporea totale"},
  {n:"2/3", t:"intracellulare", d:"domina il **potassio**"},
  {n:"1/3", t:"extracellulare", d:"domina il **sodio**", key:true}]},
{id:"s05", tipo:"confronto", tema:"chiaro", sopratitolo:"Tenere separati gli ioni, spostare l'acqua", col:[
  {h:"Pompa sodio-potassio", t:"**3 Na⁺** fuori · **2 K⁺** dentro"},
  {h:"Osmosi", t:"l'acqua va verso la soluzione **più concentrata**"}]},
{id:"s06", tipo:"confronto", tema:"chiaro", sopratitolo:"Le forze di Starling nei capillari", col:[
  {h:"Pressione idrostatica", t:"spinge il liquido **fuori** dal vaso"},
  {h:"Pressione oncotica", t:"dovuta all'**albumina**, lo richiama **dentro**"}],
  sotto:"Se l'equilibrio si rompe: **edema**."},
{id:"s07", tipo:"tre", tema:"chiaro", sopratitolo:"La regolazione dell'acqua e del sodio", box:[
  {n:"ADH", t:"Acqua", d:"riassorbita nel rene"},
  {n:"Aldosterone", t:"Sodio", d:"riassorbito · con perdita di **potassio**", key:true}]},
{id:"s08", tipo:"scala", tema:"chiaro", sopratitolo:"pH 7,35-7,45 · tre difese, tre tempi", gradini:[
  {n:"secondi", t:"Tamponi"},
  {n:"minuti", t:"Polmone"},
  {n:"giorni", t:"Rene", key:true}]},

{id:"s09", tipo:"tre", tema:"chiaro", sopratitolo:"Cuore e circolo", box:[
  {n:"Valvole", t:"Tricuspide · mitrale", d:"a destra · a sinistra"},
  {n:"Arteria polmonare", t:"Sangue povero di O₂"},
  {n:"Coronarie", t:"Perfuse in diastole", d:"a muscolo rilassato", key:true}]},
{id:"s10", tipo:"catena", tema:"chiaro", sopratitolo:"Il sistema di conduzione", passi:[
  {t:"Nodo **senoatriale**", d:"pacemaker · 60-100/min", key:true},
  {t:"Nodo **AV**"}, {t:"Fascio di **His**"}, {t:"**Branche**"}, {t:"Fibre di **Purkinje**"}]},
{id:"s11", tipo:"confronto", tema:"chiaro", sopratitolo:"Gittata e pressione", col:[
  {h:"Gittata cardiaca", t:"gittata sistolica × **frequenza** · circa **5 L/min** a riposo"},
  {h:"Pressione arteriosa", t:"gittata × **resistenze periferiche**"}]},
{id:"s12", tipo:"cifre", tema:"chiaro", sopratitolo:"La pressione arteriosa media ≈ PAD + ⅓ (PAS − PAD)", voci:[
  {n:"80", suf:"mmHg", t:"la media con 120/60"},
  {n:"65", suf:"mmHg", t:"almeno, nello shock", d:"l'obiettivo", key:true}]},
{id:"s13", tipo:"confronto", tema:"chiaro", sopratitolo:"La regolazione della pressione", col:[
  {h:"Breve termine", t:"**barocettori** → sistema nervoso autonomo"},
  {h:"Medio-lungo termine", t:"**renina-angiotensina-aldosterone**: vasocostrizione, sodio e acqua trattenuti"}]},

{id:"s14", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Respiro", celle:[
  {t:"Bronco **destro** più verticale"}, {t:"Inspirazione **attiva**, con il diaframma"},
  {t:"Volume corrente **~500 ml**"}, {t:"Spazio morto **~150 ml**"}]},
{id:"s15", tipo:"cifre", tema:"chiaro", sopratitolo:"Il trasporto dell'ossigeno · la curva a S", voci:[
  {n:"98", suf:"%", t:"dell'O₂ legato all'emoglobina"},
  {n:"90", suf:"%", t:"SpO₂", d:"≈ PaO₂ **60 mmHg**", key:true}]},
{id:"s16", tipo:"catena", tema:"chiaro", sopratitolo:"Sotto il 90% la curva diventa ripida", passi:[
  {t:"↑ temperatura · ↑ CO₂ · **acidosi**"},
  {t:"Curva spostata **a destra**"},
  {t:"L'emoglobina **cede** l'O₂ ai tessuti", key:true}]},
{id:"s17", tipo:"tabella", tema:"chiaro", sopratitolo:"L'insufficienza respiratoria", colonne:["46%","27%","27%"],
  intestazioni:["Tipo", "PaO₂", "PaCO₂"], righe:[
  ["**Tipo 1** · ipossiemica", "< 60 mmHg", "—"],
  ["**Tipo 2** · ipercapnica", "< 60 mmHg", "**> 45 mmHg**"]], chiave:[1]},

{id:"s18", tipo:"catena", tema:"chiaro", sopratitolo:"Digerente, fegato, rene", passi:[
  {t:"Stomaco", d:"fattore intrinseco"},
  {t:"Assorbimento della **vitamina B12**"},
  {t:"Dopo gastrectomia", d:"B12 per via **parenterale**", key:true}]},
{id:"s19", tipo:"raggiera", tema:"chiaro", sopratitolo:"Le funzioni del fegato", centro:"Fegato",
  raggi:[{t:"Albumina"}, {t:"Fattori", d:"II · VII · IX · X"}, {t:"Bilirubina", d:"coniugazione"},
         {t:"Urea", d:"dall'ammoniaca"}, {t:"Farmaci", d:"primo passaggio", key:true}]},
{id:"s20", tipo:"cifre", tema:"chiaro", sopratitolo:"Il rene · la creatinina dipende dalla massa muscolare", voci:[
  {n:"180", suf:"L/die", t:"filtrato"},
  {n:"1,5", suf:"L", t:"urine al giorno"},
  {n:"90-120", suf:"ml/min", t:"GFR", key:true}]},
{id:"s21", tipo:"confronto", tema:"chiaro", sopratitolo:"Il rene non solo filtra", col:[
  {h:"Il rene produce", t:"**eritropoietina** e **renina** · attiva la **vitamina D**"},
  {h:"Le soglie della diuresi", t:"oliguria **< 400 ml/24 h** · anuria **< 100 ml/24 h**"}]},

{id:"s22", tipo:"icone", tema:"chiaro", sopratitolo:"Nervoso ed endocrino", voci:[
  {icona:"persona", t:"Via motoria incrociata", d:"lesione a sinistra → deficit a destra", key:true},
  {icona:"chat", t:"Linguaggio", d:"emisfero sinistro, nella maggior parte delle persone"}]},
{id:"s23", tipo:"confronto", tema:"chiaro", sopratitolo:"Il sistema nervoso autonomo", col:[
  {h:"Simpatico", t:"**β1** cuore · **β2** bronchi · midriasi · ritenzione"},
  {h:"Parasimpatico", t:"**acetilcolina** · vago · bradicardia · miosi"}],
  sotto:"Beta-bloccante **non selettivo** → broncospasmo."},
{id:"s24", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Gli ormoni da ricordare", celle:[
  {n:"↑", t:"**TSH alto** nell'ipotiroidismo primario"}, {n:"↑", t:"Il **PTH** aumenta il calcio"},
  {n:"↓", t:"L'**insulina** abbassa la glicemia"}, {n:"↑", t:"Il **glucagone** la alza"}]},
{id:"s25", tipo:"icone", tema:"chiaro", sopratitolo:"Stress e corticosteroidi", voci:[
  {icona:"avviso", t:"Ormoni dello stress", d:"cortisolo, adrenalina: alzano la glicemia"},
  {icona:"divieto", t:"Corticosteroidi", d:"mai sospesi bruscamente: crisi surrenalica", key:true}]},

{id:"s26", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Sangue e difese", celle:[
  {t:"Globulo rosso: **120 giorni**"}, {t:"Piastrina: **7-10 giorni**"},
  {t:"**0**: donatore universale di globuli rossi"}, {t:"**AB**: ricevente universale · per il plasma, il contrario"}]},
{id:"s27", tipo:"percorso", tema:"chiaro", sopratitolo:"Rh e anti-D · l'emostasi in quattro fasi", tappe:[
  {t:"Vascolare"}, {t:"Piastrinica"}, {t:"Coagulativa"},
  {t:"Fibrinolisi", d:"scioglie il coagulo · D-dimero", key:true}]},
{id:"s28", tipo:"tabella", tema:"chiaro", sopratitolo:"La coagulazione · esami, farmaci, antidoti", colonne:["24%","46%","30%"],
  intestazioni:["Esame", "Farmaco", "Antidoto"], righe:[
  ["**INR**", "warfarin", "vitamina K"],
  ["**aPTT**", "eparina non frazionata", "protamina"]]},
{id:"s29", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Le immunoglobuline · attiva con il vaccino, passiva con le immunoglobuline", celle:[
  {n:"G", t:"attraversano la **placenta**", key:true}, {n:"M", t:"la **prima** risposta"},
  {n:"A", t:"difendono le **mucose**"}, {n:"E", t:"le **allergie**"}]},
{id:"s30", tipo:"confronto", tema:"chiaro", sopratitolo:"Vaccini vivi attenuati: no in gravidanza · la febbre", col:[
  {h:"Salita · brividi", t:"si **copre**", grande:true},
  {h:"Defervescenza · sudore", t:"si **scopre**", grande:true}]},

{id:"s31", tipo:"frase", tema:"chiaro", sopratitolo:"La tabella dei valori · da fotografare",
  testo:"Valori **indicativi** nell'adulto: fa fede l'intervallo **del referto**."},
{id:"s32", tipo:"tabella", tema:"chiaro", sopratitolo:"La tabella · l'emocromo", colonne:["38%","62%"],
  intestazioni:["Esame", "Valore indicativo"], righe:[
  ["Emoglobina", "uomo ~13-17 · donna ~12-16 g/dl"],
  ["Globuli bianchi", "~4.000-10.000/mm³"],
  ["Neutrofili", "< 500: **neutropenia grave**"]], chiave:[2]},
{id:"s33", tipo:"tabella", tema:"chiaro", sopratitolo:"La tabella · piastrine ed elettroliti", colonne:["38%","62%"],
  intestazioni:["Esame", "Valore indicativo"], righe:[
  ["Piastrine", "~150.000-450.000/mm³"],
  ["Sodio", "135-145 mEq/L"],
  ["Potassio", "3,5-5,0 mEq/L"],
  ["Calcio totale", "~8,5-10,5 mg/dl"]]},
{id:"s34", tipo:"tabella", tema:"chiaro", sopratitolo:"La tabella · glicemia, rene, coagulazione", colonne:["38%","62%"],
  intestazioni:["Esame", "Valore indicativo"], righe:[
  ["Glicemia a digiuno", "70-99 mg/dl"],
  ["Creatinina", "~0,6-1,2 mg/dl"],
  ["INR", "~0,8-1,2 · in terapia **2-3**"],
  ["aPTT", "~25-35 s"]], chiave:[2]},
{id:"s35", tipo:"tabella", tema:"chiaro", sopratitolo:"La tabella · fegato, lattati, saturazione", colonne:["38%","62%"],
  intestazioni:["Esame", "Valore indicativo"], righe:[
  ["Albumina", "~3,5-5 g/dl"],
  ["Bilirubina totale", "< ~1,2 mg/dl"],
  ["Lattati", "< 2 mmol/L"],
  ["SpO₂ target", "94-98% · ipercapnici **88-92%**"]], chiave:[3]},
{id:"s36", tipo:"cifre", tema:"chiaro", sopratitolo:"La tabella · l'emogas", voci:[
  {n:"7,35-7,45", t:"pH", key:true},
  {n:"35-45", t:"PaCO₂", d:"mmHg"},
  {n:"80-100", t:"PaO₂", d:"mmHg, circa"},
  {n:"22-26", t:"HCO₃⁻", d:"mEq/L"}]},

{id:"s37", tipo:"confronto", tema:"chiaro", sopratitolo:"I collegamenti più utili · ognuno una domanda d'esame", col:[
  {h:"Campione emolizzato", t:"K⁺ **falsamente alto**: il potassio sta nelle cellule"},
  {h:"Tachicardia", t:"meno diastole → meno **perfusione coronarica**"}]},
{id:"s38", tipo:"tre", tema:"chiaro", sopratitolo:"I collegamenti più utili", box:[
  {n:"Ipoalbuminemia", t:"Edema", d:"cala la pressione oncotica"},
  {n:"Anziano magro", t:"GFR ridotto", d:"anche con creatinina «normale»", key:true},
  {n:"SpO₂ < 90%", t:"La curva precipita"}]},
{id:"s39", tipo:"icone", tema:"chiaro", sopratitolo:"I collegamenti più utili", voci:[
  {icona:"goccia", t:"Stress", d:"→ iperglicemia"},
  {icona:"persona", t:"Bronco destro", d:"intubazione selettiva · corpi estranei"},
  {icona:"avviso", t:"β-bloccante non selettivo", d:"→ broncospasmo"},
  {icona:"divieto", t:"Risonanza", d:"effetto proiettile", key:true}]},

{id:"s40", tipo:"trappola", tema:"chiaro", sopratitolo:"Le confusioni che costano più punti", righe:[
  {sb:"Arteria polmonare: sangue ricco di O₂", ok:"È **povero**: ricche sono le **vene polmonari**"},
  {sb:"S1 = chiusura delle semilunari", ok:"S1 **atrioventricolari** · S2 **semilunari**"}]},
{id:"s41", tipo:"trappola", tema:"chiaro", sopratitolo:"Le confusioni che costano più punti", righe:[
  {sb:"Ipossiemia = ipossia", ok:"Poco O₂ nel **sangue** · poco O₂ ai **tessuti**"},
  {sb:"Sintomo = segno", ok:"Il sintomo lo **riferisce** la persona, il segno lo **rileva** l'operatore"},
  {sb:"INR per l'eparina", ok:"INR → **warfarin** · aPTT → **eparina**"}]},
{id:"s42", tipo:"trappola", tema:"chiaro", sopratitolo:"Le confusioni che costano più punti", righe:[
  {sb:"0 donatore universale di plasma", ok:"0 per i **globuli rossi** · **AB** per il plasma"},
  {sb:"Addome: palpare, poi auscultare", ok:"**Auscultazione prima** della palpazione"},
  {sb:"RM: niente radiazioni, niente rischi", ok:"Il magnete è **sempre attivo**"}]},

{id:"s43", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Le domande d'orale più probabili", celle:[
  {n:"1", t:"La **curva di dissociazione**"}, {n:"2", t:"Le **cause dell'edema** · Starling"},
  {n:"3", t:"**Simpatico** e **parasimpatico**, e i farmaci"}, {n:"4", t:"I **gruppi sanguigni** e la trasfusione"}]},
{id:"s44", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Per ognuna: dal meccanismo all'azione infermieristica", celle:[
  {n:"5", t:"Le **fasi della febbre** e l'assistenza"}, {n:"6", t:"La preparazione alla **TC con contrasto**"},
  {n:"7", t:"La **sicurezza in risonanza**"}, {n:"8", t:"I **valori critici**"}]},

{id:"s45", tipo:"icone", tema:"chiaro", sopratitolo:"Come proseguire", voci:[
  {icona:"spunta", t:"Test del modulo", d:"30 domande · soglia 21", key:true},
  {icona:"libro", t:"La tabella dei valori", d:"trascritta nel quaderno"}]},
{id:"s46", tipo:"catena", tema:"chiaro", sopratitolo:"Per ogni apparato una catena · poi gli schemi: nefrone, conduzione, curva, emostasi", passi:[
  {t:"Un **meccanismo**"},
  {t:"Una **conseguenza clinica**"},
  {t:"Un **intervento infermieristico**", key:true}]},

{id:"s47", tipo:"titolo", tema:"profondo",
  titolo:"Dal meccanismo all'azione:<br>la fisiologia è **il motivo**,<br>l'assistenza è **la risposta**.",
  sotto:""},

{id:"s48", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"L'ultimo modulo · il percorso trasversale: le prove del concorso", celle:[
  {n:"1", t:"Il metodo per i **quiz**"}, {n:"2", t:"La prova **scritta** e **pratica**"}, {n:"3", t:"L'**orale**"}]},
{id:"s49", tipo:"icone", tema:"chiaro", sopratitolo:"Il Modulo 15", voci:[
  {icona:"chat", t:"Inglese"}, {icona:"ingranaggio", t:"Informatica"},
  {icona:"orologio", t:"Simulazioni", d:"finali", key:true}]},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossimo modulo · Modulo 15",
  titolo:"Percorso trasversale", sottotitolo:"Prove, inglese, informatica, simulazioni",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
