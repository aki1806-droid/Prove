// Contenuto delle 50 scene della lezione 16.7 — il grande ustionato: vie
// aeree, monossido, regola del nove e Parkland. L'orologio delle ore è un
// percorso che si accende (19:00, 21:00, 03:00); il calcolo dei liquidi sta
// nel corpo «calcolo» e la finestra delle prime otto ore in una scadenza; i
// criteri del centro ustioni si riempiono a scalare; errori e risposta
// modello stanno in tabella.

const ORE = (att, k) => ({tipo:"percorso", tema:"chiaro", tappe:[
  {t:"Ore 19:00", d:"l'ustione · cucina chiusa", key:k===0},
  {t:"Ore 21:00", d:"in PS · già passate 2 ore, già infusi 500 ml", key:k===1},
  {t:"Ore 03:00", d:"fine delle prime 8 ore", key:k===2}], attive:att});

const CRITERI = (att) => ({tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, celle:[
  {t:"II e III grado **estese** · adulto: indicativamente oltre il 20%"},
  {t:"A tutto spessore **significative**"},
  {t:"**Volto, mani, piedi**, genitali, perineo, grandi articolazioni"},
  {t:"Da **inalazione**"},
  {t:"**Circonferenziali**"},
  {t:"**Elettriche** (danno nascosto, aritmie) e **chimiche** (irrigazione prolungata)"},
  {t:"Bambini, anziani, **comorbidità**, trauma associato"}], attive:att});

const GIORNI = (att) => ({tipo:"icone", tema:"chiaro", voci:[
  {icona:"scudo", t:"Asepsi rigorosa", d:"rischio infettivo altissimo", key:true},
  {icona:"bilancia", t:"Nutrizione precoce", d:"spesso enterale · ipermetabolismo"},
  {icona:"flebo", t:"Analgesia", d:"prima delle medicazioni"},
  {icona:"persona", t:"Mobilizzazione", d:"e posizionamento contro le retrazioni"},
  {icona:"cuoremano", t:"Supporto psicologico", d:"immagine corporea, trauma"}], attive:att});

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 16 · Casi clinici avanzati",
  titolo:"Il grande<br>ustionato", sottotitolo:"16.7 · Vie aeree, monossido, regola del nove e Parkland",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"tre", tema:"chiaro", sopratitolo:"Micro-lezione 7 di 12 · ogni ora conta: errori di calcolo e di tempo", box:[
  {n:"9", t:"Regola del nove", d:"l'estensione"}, {n:"4 ml", t:"Parkland", d:"i liquidi"},
  {n:"19:00", t:"La trappola degli orari", d:"quasi sempre nei quiz", key:true}]},
{id:"s03", tipo:"tre", tema:"chiaro", sopratitolo:"Le vie aeree possono chiudersi in poche ore · le lezioni che servono", box:[
  {n:"3.7", t:"Dolore"}, {n:"5.3", t:"Calcoli"}, {n:"8.2", t:"Monossido", d:"e saturimetro"},
  {n:"10.5", t:"Vie aeree"}, {n:"10.7", t:"Ustioni", d:"nove e Parkland", key:true}]},

{id:"s04", sopratitolo:"Lo scenario · incendio dall'olio in padella · signor Matteo, 45 anni, 80 kg", ...ORE([0,1], 0)},
{id:"s05", tipo:"corpo", tema:"chiaro", sopratitolo:"Già infusi 500 ml di cristalloidi · ustioni profonde e a tutto spessore", lato:"fronte", voci:[
  {z:"torace", t:"Torace **anteriore**", key:true},
  {z:"braccia", t:"**Intero** arto superiore destro"},
  {z:"collo", t:"Collo"},
  {z:"viso", t:"Parte del **volto**"}]},
{id:"s06", tipo:"cifre", tema:"chiaro", sopratitolo:"Peli del naso bruciacchiati · voce rauca · escreato nerastro", voci:[
  {n:"98", suf:"%", t:"SpO₂", d:"in aria", key:true}, {n:"118", t:"FC", d:"battiti al minuto"},
  {n:"128/80", t:"PA", d:"mmHg"}, {n:"9", suf:"/10", t:"Dolore"}]},
{id:"s07", tipo:"pausa", tema:"chiaro", sopratitolo:"Ore 21 · pronto soccorso", es:"metti in pausa",
  testo:"Quale problema può **ucciderlo** nelle prossime ore, nonostante una **saturazione perfetta**?",
  dati:["cucina chiusa", "voce rauca", "escreato nerastro", "SpO₂ 98%"]},

{id:"s08", tipo:"raggiera", tema:"chiaro", sopratitolo:"La priorità è la A · i segni dell'ustione da inalazione", centro:"Inalazione",
  raggi:[{t:"Ambiente chiuso"}, {t:"Volto e collo"}, {t:"Peli nasali"}, {t:"Voce rauca"}, {t:"Fuliggine", key:true}]},
{id:"s09", tipo:"curva", tema:"chiaro", sale:true, sopratitolo:"L'edema delle vie aeree non è ancora massimo",
  x1:"ore 21", x2:"ore successive", y:"edema", note:[
  {t:"Ora: non ancora massimo"}, {t:"Può chiudere le vie aeree", d:"anche per effetto dei liquidi infusi", key:true}]},
{id:"s10", tipo:"catena", tema:"chiaro", sopratitolo:"Per questo, subito", passi:[
  {t:"Valutazione **urgente**", d:"dell'anestesista"},
  {t:"**Intubazione precoce**", d:"spesso decisa", key:true},
  {t:"Quando è **ancora possibile**", d:"tecnicamente"}]},
{id:"s11", tipo:"frase", tema:"chiaro", sopratitolo:"Non aspettare",
  testo:"Aspettare che non respiri più significa vie aeree **impossibili da intubare**.",
  sotto:"Il materiale per le vie aeree difficili deve essere pronto."},

{id:"s12", tipo:"trappola", tema:"chiaro", sopratitolo:"B · il monossido di carbonio", righe:[
  {sb:"«SpO₂ 98%: respira bene»", ok:"Incendio in ambiente chiuso: l'intossicazione da **monossido** è probabile, e il 98 **non rassicura**"}]},
{id:"s13", tipo:"confronto", tema:"chiaro", sopratitolo:"Il saturimetro · lezione 8.2", col:[
  {h:"Non distingue", t:"l'emoglobina legata al **monossido** da quella legata all'ossigeno"},
  {h:"Quindi", t:"un valore **falsamente normale**", grande:true}]},
{id:"s14", tipo:"catena", tema:"chiaro", sopratitolo:"Che cosa si fa", passi:[
  {t:"**Emogas**", d:"con la carbossiemoglobina (co-ossimetria)"},
  {t:"**Ossigeno al 100%**", d:"maschera con reservoir, fino all'esclusione", key:true},
  {t:"**Cianuro**?", d:"fumi di materiali sintetici: valuta il medico"}]},

{id:"s15", tipo:"tre", tema:"chiaro", sopratitolo:"L'estensione · la regola del nove della lezione 10.7", box:[
  {n:"I", t:"Eritema superficiale", d:"non si conta"},
  {n:"II", t:"Secondo grado", d:"si conta", key:true},
  {n:"III", t:"Terzo grado", d:"si conta", key:true}]},
{id:"s16", tipo:"impila", tema:"chiaro", sopratitolo:"Circa il 30% della superficie · aree irregolari: il palmo, dita comprese, ≈ 1%",
  unita:"%", testa:"Le aree ustionate del signor Matteo", segmenti:[
  {v:18, t:"Torace anteriore"}, {v:9, t:"Arto superiore destro"}, {v:3, t:"Collo e volto", d:"circa", chiaro:true}]},

{id:"s17", tipo:"calcolo", tema:"chiaro", sopratitolo:"I liquidi · la formula di Parkland", righe:[
  {tok:["4 ml", "×", "80 kg", "×", "30%", "=", "9.600 ml"], nota:"nelle prime **24 ore**"}]},
{id:"s18", tipo:"scadenza", tema:"chiaro", sopratitolo:"La trappola · le 8 ore si contano dall'ustione, non dall'arrivo",
  max:24, banda:[0,8], inizio:"ore 19:00 · l'ustione", fine:"24 ore", tappe:[
  {a:2, v:"21:00", t:"arrivo in PS"},
  {a:8, v:"03:00", t:"**metà: 4.800 ml**", key:true}]},
{id:"s19", tipo:"tre", tema:"chiaro", sopratitolo:"Le due metà", box:[
  {n:"4.800 ml", t:"entro le 03:00", d:"le prime 8 ore dall'ustione", key:true},
  {n:"4.800 ml", t:"nelle 16 ore successive", d:"circa 300 ml all'ora"}]},

{id:"s20", sopratitolo:"Il calcolo che cade nei quiz", ...ORE([0,1,2], 1)},
{id:"s21", tipo:"calcolo", tema:"chiaro", sopratitolo:"Quanto resta, e in quanto tempo", righe:[
  {tok:["4.800 ml", "−", "500 ml", "=", "4.300 ml"]},
  {tok:["4.300 ml", "÷", "6 ore", "→", "≈ 715 ml/h"]}], nota:"secondo **prescrizione**"},
{id:"s22", tipo:"trappola", tema:"chiaro", sopratitolo:"L'errore tipico", righe:[
  {sb:"8 ore dall'arrivo: 600 ml/h", ok:"paziente **sotto-infuso** proprio quando perde più liquidi"},
  {sb:"Parkland come numero fisso", ok:"è un **punto di partenza**: il medico la adegua alla **diuresi**"}]},

{id:"s23", tipo:"cifre", tema:"chiaro", sopratitolo:"Il monitoraggio · catetere vescicale e diuresi oraria", voci:[
  {n:"0,5", suf:"ml/kg/h", t:"obiettivo indicativo", d:"nell'adulto"},
  {n:"40", suf:"ml/h", t:"per il signor Matteo", d:"80 kg", key:true}]},
{id:"s24", tipo:"confronto", tema:"chiaro", sopratitolo:"Che cosa dice la diuresi", col:[
  {h:"Troppo bassa", t:"liquidi **insufficienti**"},
  {h:"Molto alta", t:"rischio di **sovra-infusione**: edemi, sindrome compartimentale addominale"}]},
{id:"s25", tipo:"icone", tema:"chiaro", sopratitolo:"E si sorvegliano", voci:[
  {icona:"cuore", t:"Parametri"}, {icona:"occhio", t:"Coscienza"}, {icona:"provetta", t:"Lattati"},
  {icona:"avviso", t:"Urine scure o rosse", d:"mioglobina? ustioni profonde, elettriche · segnalare subito", key:true}]},

{id:"s26", tipo:"catena", tema:"chiaro", sopratitolo:"Le ustioni circonferenziali", passi:[
  {t:"A **tutto spessore**", d:"avvolge una parte del corpo"},
  {t:"Escara **rigida**", d:"non si espande"},
  {t:"Sotto, l'**edema** aumenta", key:true}]},
{id:"s27", tipo:"bivio", tema:"chiaro", sopratitolo:"Sorvegliare polsi, colorito, riempimento capillare, sensibilità, meccanica respiratoria",
  radice:"Escara circonferenziale", rami:[
  {q:"al torace", t:"Limita l'espansione respiratoria"},
  {q:"a un arto", t:"Comprime i vasi", d:"come una sindrome compartimentale", key:true}]},
{id:"s28", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"Se serve", celle:[
  {t:"**Escarotomia** · la esegue il medico, libera la pressione"},
  {t:"Arto **sollevato**"},
  {t:"Anelli e bracciali via **subito**, prima dell'edema"}]},

{id:"s29", tipo:"icone", tema:"chiaro", sopratitolo:"Dolore, temperatura, ferite · il dolore", voci:[
  {icona:"flebo", t:"Oppioidi endovena", d:"secondo prescrizione · titolati e rivalutati", key:true},
  {icona:"divieto", t:"Non intramuscolo", d:"nell'ustionato l'assorbimento è imprevedibile"}]},
{id:"s30", tipo:"sostituzione", tema:"chiaro", sopratitolo:"La temperatura",
  da:{h:"Primi 20 minuti", t:"raffreddare con acqua"}, a:{h:"Due ore dopo", t:"prevenire l'**ipotermia**"},
  sotto:"coperte, ambiente caldo, liquidi riscaldati"},
{id:"s31", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Le ferite, e dove va", celle:[
  {t:"Copertura **pulita o sterile** secondo protocollo"}, {t:"Niente creme o rimedi casalinghi", no:true},
  {t:"Profilassi **antitetanica**"}, {t:"**Centro grandi ustionati**", key:true}]},

{id:"s32", sopratitolo:"Approfondimento · quando inviare al centro ustioni", ...CRITERI([0,1])},
{id:"s33", sopratitolo:"Per le conseguenze funzionali ed estetiche", ...CRITERI([0,1,2,3,4])},
{id:"s34", sopratitolo:"Il signor Matteo soddisfa più criteri", ...CRITERI([0,1,2,3,4,5,6])},

{id:"s35", tipo:"tabella", tema:"chiaro", sopratitolo:"Gli errori da evitare · le prime ore", colonne:["50%","50%"],
  intestazioni:["Errore", "Invece"], righe:[
  ["no:Fidarsi della saturazione", "emogas con **carbossiemoglobina**"],
  ["no:Rinviare le vie aeree", "anestesista **subito**"],
  ["no:Le 8 ore dall'arrivo", "dal momento dell'**ustione**"]], chiave:[2]},
{id:"s36", tipo:"tabella", tema:"chiaro", sopratitolo:"Gli errori da evitare · il resto", colonne:["50%","50%"],
  intestazioni:["Errore", "Invece"], righe:[
  ["no:Contare le superficiali", "solo **II e III grado**"],
  ["no:Dimenticare i 500 ml del 118", "al **netto** del già infuso"],
  ["no:Raffreddare a lungo", "prevenire l'**ipotermia**"],
  ["no:Analgesia intramuscolare", "oppioidi **endovena**"],
  ["no:Lasciare anelli e bracciali", "via **subito**"]], chiave:[1]},

{id:"s37", tipo:"calcolo", tema:"chiaro", sopratitolo:"D1 · «Come si calcolano i liquidi nel grande ustionato?»", righe:[
  {tok:["4 ml", "×", "kg", "×", "% di II e III grado", "=", "ml nelle 24 ore"]}]},
{id:"s38", tipo:"tre", tema:"chiaro", sopratitolo:"D1 · poi D2: «Quali segni fanno sospettare un'ustione da inalazione?»", box:[
  {n:"½", t:"Prime 8 ore", d:"dal momento dell'ustione", key:true},
  {n:"½", t:"16 ore successive"},
  {n:"Poi", t:"Si adegua alla diuresi"}]},
{id:"s39", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"D2 · i segni · poi D3: «Perché la saturimetria non è affidabile?»", celle:[
  {t:"Ambiente **chiuso**"}, {t:"Ustioni di **volto e collo**"}, {t:"Peli nasali **bruciati**"},
  {t:"Voce **rauca**"}, {t:"**Stridore**"}, {t:"Escreato con **fuliggine**", key:true}, {t:"**Dispnea**"}]},
{id:"s40", tipo:"sostituzione", tema:"chiaro", sopratitolo:"D3 · il monossido",
  da:{h:"Il saturimetro", t:"non distingue O₂ da monossido"}, a:{h:"Serve", t:"l'**emogas** con la carbossiemoglobina"},
  sotto:"altrimenti valori falsamente normali"},

{id:"s41", tipo:"citazione", tema:"chiaro", sopratitolo:"La risposta modello · 1",
  testo:"Paziente di 80 kg, ustioni profonde su circa il **30%** della superficie, alle 19 in **ambiente chiuso**, con segni di inalazione. Priorità: vie aeree, monossido, liquidi.",
  fonte:"Chi è · le priorità"},
{id:"s42", tipo:"tabella", tema:"chiaro", sopratitolo:"La risposta modello · 2", colonne:["28%","72%"],
  intestazioni:["Passo", "Che cosa scrivo"], righe:[
  ["Vie aeree", "anestesista **subito**, per un'intubazione precoce"],
  ["Monossido", "ossigeno al 100% · emogas con carbossiemoglobina"],
  ["Liquidi", "due accessi · cristalloidi secondo **Parkland**"]], chiave:[0]},
{id:"s43", tipo:"tabella", tema:"chiaro", sopratitolo:"La risposta modello · 3", colonne:["28%","72%"],
  intestazioni:["Passo", "Che cosa scrivo"], righe:[
  ["24 ore", "9.600 ml"],
  ["Entro le 03:00", "4.800 ml dall'ustione, **al netto** dei 500 già infusi"],
  ["Poi", "circa 300 ml/h · adeguati alla **diuresi oraria**"]], chiave:[1]},
{id:"s44", tipo:"tabella", tema:"chiaro", sopratitolo:"La risposta modello · 4", colonne:["28%","72%"],
  intestazioni:["Passo", "Che cosa scrivo"], righe:[
  ["Circonferenziali", "via gli anelli · sorveglianza"],
  ["Comfort e cute", "analgesia EV · niente ipotermia · ferite coperte · antitetanica"],
  ["Destinazione", "centralizzazione al **centro grandi ustionati**"]], chiave:[2]},

{id:"s45", tipo:"griglia", tema:"chiaro", colonne:3, sopratitolo:"I collegamenti", celle:[
  {n:"3.7", t:"Dolore"}, {n:"5.3", t:"Calcoli"}, {n:"8.2", t:"Monossido e saturimetro"},
  {n:"10.5", t:"Vie aeree"}, {n:"10.7", t:"Ustioni, nove e Parkland"}, {n:"9.6", t:"Sindrome compartimentale"}]},

{id:"s46", sopratitolo:"I giorni successivi, nel centro ustioni · la barriera cutanea è perduta", ...GIORNI([0,1])},
{id:"s47", sopratitolo:"I giorni successivi · la persona, non solo la cute", ...GIORNI([0,1,2,3,4])},

{id:"s48", tipo:"titolo", tema:"profondo",
  titolo:"Nell'ustionato l'orologio<br>parte dalle **fiamme**,<br>non dalla porta del PS.",
  sotto:"La frase del caso."},

{id:"s49", tipo:"tre", tema:"chiaro", sopratitolo:"Nella prossima lezione · una ragazza di 19 anni, in pronto soccorso", box:[
  {n:"1", t:"Chetoacidosi"}, {n:"2", t:"L'esordio del diabete", key:true}, {n:"3", t:"Una notizia che cambia la vita"}]},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione · 16.8",
  titolo:"La chetoacidosi<br>all'esordio", sottotitolo:"L'emergenza metabolica e una notizia che cambia la vita",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
