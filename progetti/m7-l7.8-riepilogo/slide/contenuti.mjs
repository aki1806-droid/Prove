// Contenuto delle 50 scene della lezione 7.8 — riepilogo del modulo 7 e
// autovalutazione. Nessun corpo nuovo: tornano i corpi del modulo come
// rimandi (il TIME, gli stadi, le gambe, l'ABI, l'albero, le camere), e
// l'albero decisionale in sette passi è un percorso in tre accensioni. Le
// otto domande sono quattro pause con la risposta secca.

const P = (sopratitolo, testo, dati) => ({tipo:"pausa", tema:"chiaro", etichetta:"risposta secca", es:sopratitolo, testo: testo.replace(/\n/g, "<br>"), dati});
const LEZIONI = [
 {n:"7.1", t:"Valutazione", illu:"ferita"},
 {n:"7.2", t:"Lesioni da pressione", illu:"tallone"},
 {n:"7.3", t:"Ulcere e piede", illu:"piede"},
 {n:"7.4", t:"Ferite chirurgiche", illu:"guanto"},
 {n:"7.5", t:"Medicazioni", illu:"pellicola"},
 {n:"7.6", t:"Stomie", illu:"stomaco"},
 {n:"7.7", t:"Drenaggi", illu:"catetere"},
];
const ALBERO = [
 {t:"Valutare", d:"TIME, misure, foto"}, {t:"La causa", d:"scarico, compressione se ABI, rivascolarizzazione, glicemia", key:true}, {t:"Il tessuto", d:"necrosi o slough: debridement"}, {t:"L'infezione", d:"antimicrobica, mai occlusiva"},
 {t:"L'umidità", d:"secca: idrogel · essudante: alginato, idrofibra, schiuma"}, {t:"I margini", d:"e la cute intorno: proteggere"}, {t:"Rivalutare", d:"a ogni medicazione"},
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 7 · Wound care, stomie e drenaggi",
  titolo:"Riepilogo del modulo 7<br>e autovalutazione", sottotitolo:"7.8 · L'albero decisionale della medicazione",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"frase", tema:"chiaro", sopratitolo:"Micro-lezione 8 di 8 · al centro del riepilogo c'è uno strumento",
  testo:"L'**albero decisionale** della medicazione, che collega la **valutazione** alla **scelta**."},
{id:"s03", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Poi", celle:[
  {n:"1", t:"Le **tabelle**"}, {n:"2", t:"Le **sequenze di emergenza**"}, {n:"3", t:"Le **confusioni** che costano più punti"}, {n:"4", t:"**Otto domande** secche: otto risposte che il quiz pretende in pochi secondi", key:true}]},

{id:"s04", tipo:"anello", tema:"chiaro", sopratitolo:"La mappa · sette lezioni", centro:"Modulo 7", sotto:"sette lezioni", voci:LEZIONI},
{id:"s05", tipo:"frase", tema:"chiaro", sopratitolo:"Un filo comune · la frase del modulo, e torna alla fine",
  testo:"Prima si **valuta** e si toglie la **causa**, poi si **medica**."},

{id:"s06", tipo:"percorso", tema:"chiaro", sopratitolo:"L'albero decisionale in sette passi · le ore 12 verso la testa", attive:[0,1], tappe:ALBERO},
{id:"s07", tipo:"percorso", tema:"chiaro", sopratitolo:"Tre: salvo l'escara stabile del tallone e l'arto ischemico, dove il tessuto rimosso non ricresce", attive:[0,1,2], tappe:ALBERO},
{id:"s08", tipo:"percorso", tema:"chiaro", sopratitolo:"Quattro: tampone dopo la detersione, sul tessuto vitale e non sul pus", attive:[0,1,2,3], tappe:ALBERO},
{id:"s09", tipo:"percorso", tema:"chiaro", sopratitolo:"Cinque, sei, sette", tappe:ALBERO},
{id:"s10", tipo:"frase", tema:"chiaro", sopratitolo:"Il settimo passo riporta al primo",
  testo:"Una lesione si **rivaluta a ogni medicazione**: la risposta di oggi può non essere quella di domani."},

{id:"s11", tipo:"colonne", tema:"chiaro", sopratitolo:"La tabella delle lesioni da pressione", colonne:[
  {h:"Stadio 1", voci:[{t:"**Eritema non sbiancante**", key:true}]},
  {h:"Stadio 2", voci:[{t:"Spessore parziale, flittene **sierosa**"}]},
  {h:"Stadio 3", key:true, voci:[{t:"Spessore totale, **adipe** visibile", key:true}]}]},
{id:"s12", tipo:"colonne", tema:"chiaro", sopratitolo:"La tabella delle lesioni da pressione", colonne:[
  {h:"Stadio 4", key:true, voci:[{t:"**Fascia, muscolo, tendine, osso**", key:true}]},
  {h:"Non stadiabile", voci:[{t:"Fondo **coperto**"}]},
  {h:"Danno dei tessuti profondi", voci:[{t:"**Viola o marrone**, flittene **ematica**"}]}]},
{id:"s13", tipo:"stadi", tema:"chiaro", sopratitolo:"E non si retrostadia · i tessuti ricostruiti non sono quelli originali · sei righe, e il quiz le chiede una per una", stadio:4, titolo:"Stadio 4 in guarigione", voci:["Resta **stadio 4**", "anche quando si riempie", "di granulazione"]},

{id:"s14", tipo:"gambe2", tema:"chiaro", sopratitolo:"Venosa contro arteriosa · la venosa si tratta con la compressione, se l'ABI è almeno 0,8", voci:[["**Malleolo mediale**", "Essudato", "**Migliora sollevando**", "Polsi presenti"], []], attive:[0], key:[0]},
{id:"s15", tipo:"gambe2", tema:"chiaro", sopratitolo:"Arteriosa · niente compressione e valutazione vascolare: senza rivascolarizzazione spesso non guarisce", voci:[["Malleolo mediale", "Essudato", "Migliora sollevando", "Polsi presenti"], ["**Dita**", "Cute pallida", "**Peggiora sollevando**", "Polsi assenti"]], key:[1]},
{id:"s16", tipo:"abi", tema:"chiaro", sopratitolo:"ABI normale 0,9–1,3 · sotto 0,5 compressione controindicata · e senza ABI, nessuna compressione", modo:"compressione", formula:false},

{id:"s17", tipo:"percorso", tema:"chiaro", sopratitolo:"Le sequenze di emergenza · l'eviscerazione", tappe:[
  {t:"Aiuto"}, {t:"Ginocchia flesse"}, {t:"Garze sterili", d:"fisiologica tiepida", key:true}, {t:"Non riposizionare"}, {t:"Digiuno"}, {t:"Chirurgo"}]},
{id:"s18", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Le sequenze di emergenza", celle:[
  {n:"1", t:"**Stomia scura**: chirurgo subito", key:true}, {n:"2", t:"**Drenaggio toracico scollegato**: estremità in acqua sterile, 2–3 cm"}, {n:"3", t:"**Tubo estratto dal torace**: medicazione occlusiva, medico"}, {n:"4", t:"**Pneumotorace iperteso**: riconoscerlo, trachea deviata e ipotensione"}]},
{id:"s19", tipo:"frase", tema:"chiaro", sopratitolo:"Cinque emergenze, e in quattro su cinque la risposta finisce con la stessa parola: medico, o chirurgo",
  testo:"La **prima mossa** è quasi sempre dell'infermiere; la **seconda** non è mai solo sua."},

{id:"s20", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"I numeri", celle:[
  {n:"4–6", t:"**settimane**: oltre, la lesione è cronica"}, {n:"48", t:"**ore** di medicazione chirurgica sterile", key:true}, {n:"30 · 90", t:"**giorni**: infezione del sito, senza e con impianto"}]},
{id:"s21", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"I numeri", celle:[
  {n:"3–5", t:"**giorni**: punti al volto; articolazioni **14** o più"}, {n:"5°–10°", t:"**giorno**: la deiscenza", key:true}, {n:"2", t:"**settimane** di antimicrobiche, poi si rivaluta"}]},
{id:"s22", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"I numeri", celle:[
  {n:"−125", t:"**mmHg** la NPWT, cambio ogni **48–72 ore**", key:true}, {n:"2–3", t:"**mm** più ampio il foro della placca"}, {n:"1,5–2", t:"**litri**: l'ileostomia ad alta portata"}]},
{id:"s23", tipo:"frase", tema:"chiaro", sopratitolo:"Sono dieci numeri · il quiz li chiede tutti",
  testo:"Fermati, **copiali nel quaderno**, e riparti."},

{id:"s24", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Le confusioni", celle:[
  {n:"1", t:"L'**infiammazione** dei primi giorni non è infezione", key:true}, {n:"2", t:"L'**odore del gel** dell'idrocolloide non è pus"}]},
{id:"s25", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Le confusioni · e il viola corre", celle:[
  {n:"3", t:"**Dermatite da incontinenza** e **MARSI** non sono lesioni da pressione, e hanno una prevenzione diversa"}, {n:"4", t:"Lo stadio 1 è **rosso**, il danno dei tessuti profondi è **viola**", key:true}]},
{id:"s26", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Le confusioni", celle:[
  {n:"5", t:"**Colostomia** a sinistra con feci formate, **ileostomia** a destra con feci liquide", key:true}, {n:"6", t:"L'**irrigazione** solo nella colostomia sinistra"}]},
{id:"s27", tipo:"camere", tema:"chiaro", sopratitolo:"Sette · le bollicine nel sigillo idraulico indicano una perdita d'aria; il gorgogliamento nella camera di aspirazione è normale", modo:"bolle", voci:[{t:"**Sigillo**", d:"bollicine: perdita d'aria"}, {t:"Aspirazione", d:"gorgoglio: normale"}]},
{id:"s28", tipo:"confronto", tema:"chiaro", sopratitolo:"Otto · l'assenza di oscillazione · otto punti che si perdono in un attimo e si recuperano con una lettura", col:[
  {h:"Occlusione", t:"tubo **occluso o piegato**", key:true}, {h:"Oppure", t:"polmone **riespanso**"}]},

{id:"s29", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"I casi", celle:[
  {n:"1", t:"**Area viola al sacro** in Braden 11: danno dei tessuti profondi, scarico, superficie dinamica, sorveglianza", key:true}, {n:"2", t:"**Ulcera malleolare** e richiesta di compressione senza ABI: prima l'ABI"}]},
{id:"s30", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"I casi", celle:[
  {n:"3", t:"**Liquido rosato abbondante** al sesto giorno dopo la laparotomia: deiscenza imminente; non si lascia il paziente, ginocchia flesse, chirurgo", key:true}]},
{id:"s31", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"I casi", celle:[
  {n:"4", t:"**Stomia violacea** in seconda giornata: chirurgo subito, sacca trasparente per guardarla", key:true}, {n:"5", t:"**Clampare il drenaggio** nel trasporto: no; sotto il torace e in verticale"}]},

{id:"s32", ...P("Domande 1 e 2", "**1** · Quale medicazione su una lesione secca o necrotica?\n**2** · L'escara secca e stabile al tallone si rimuove?", ["lesione secca", "escara al tallone"])},
{id:"s33", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Le risposte", celle:[
  {n:"1", t:"L'**idrogel**: cede umidità e favorisce il debridement autolitico", key:true}, {n:"2", t:"**No**: copertura naturale, soprattutto se la perfusione è scarsa"}]},
{id:"s34", ...P("Domande 3 e 4", "**3** · Uno stadio 4 che si riempie di granulazione: come lo classifichi?\n**4** · Ulcera venosa, ABI non misurato: si comprime?", ["stadio 4", "senza ABI"])},
{id:"s35", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Le risposte", celle:[
  {n:"3", t:"**Stadio 4 in guarigione**: non si retrostadia", key:true}, {n:"4", t:"**No**: un'arteriopatia associata è frequente nell'anziano"}]},
{id:"s36", ...P("Domande 5 e 6", "**5** · La prima mossa nell'eviscerazione?\n**6** · In quale stomia si può fare l'irrigazione?", ["eviscerazione", "irrigazione"])},
{id:"s37", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Le risposte", celle:[
  {n:"5", t:"**Restare e chiamare aiuto**, poi supino a ginocchia flesse", key:true}, {n:"6", t:"Solo nella **colostomia sinistra**, mai nell'ileostomia"}]},
{id:"s38", ...P("Domande 7 e 8", "**7** · Bollicine continue nel sigillo idraulico: che cosa significano?\n**8** · Il drenaggio toracico si clampa nel trasporto?", ["bollicine continue", "clampare"])},
{id:"s39", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Le risposte · otto su otto è il livello atteso: ogni errore ti dice quale lezione riguardare", celle:[
  {n:"7", t:"Possibile **perdita nel sistema**: connessioni e tubo"}, {n:"8", t:"**No, mai di routine**: sotto il torace, in verticale", key:true}]},

{id:"s40", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"I fili con gli altri moduli", celle:[
  {n:"2·3", t:"**Braden** e **nutrizione**: la soglia di 16 e le proteine", key:true}, {n:"4", t:"Il **bundle SSI**: rasoio, profilassi, normotermia"}]},
{id:"s41", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"I fili con gli altri moduli · un modulo che si tiene con gli altri vale di più all'orale", celle:[
  {n:"6.7", t:"**Tamponi e colture**"}, {n:"3·6", t:"Le **lesioni da dispositivo** e i dispositivi", key:true}]},

{id:"s42", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"In Veneto", celle:[
  {n:"1", t:"**Infermieri esperti in wound care** e ambulatori vulnologici", key:true}, {n:"2", t:"**Prontuari** delle medicazioni avanzate"}, {n:"3", t:"Le lesioni da pressione come **indicatore di qualità**"}]},
{id:"s43", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"In Veneto", celle:[
  {n:"4", t:"**Percorsi** per il piede diabetico, con équipe multidisciplinari"}, {n:"5", t:"**Ambulatori di stomaterapia** con infermieri stomaterapisti; presidi tramite **distretto**", key:true}]},

{id:"s44", tipo:"cifre", tema:"chiaro", sopratitolo:"Come proseguire · e disegna a memoria l'albero decisionale: sette passi, su un foglio bianco, senza guardare", voci:[
  {n:"30", d:"domande del test del modulo", key:true}, {n:"21", d:"la soglia"}]},
{id:"s45", tipo:"percorso", tema:"chiaro", sopratitolo:"Nel quaderno: stadi, venosa e arteriosa, classi di medicazione · e il caso dell'eviscerazione con lo schema in cinque passi", tappe:[
  {t:"Che cosa pensi"}, {t:"Che cosa fai subito", key:true}, {t:"Chi avvisi"}, {t:"Che cosa sorvegli"}, {t:"Che cosa documenti"}]},

{id:"s46", tipo:"titolo", tema:"profondo",
  titolo:"Prima si **valuta** e si toglie la **causa**, poi si **medica**.",
  sotto:"La frase del modulo."},
{id:"s47", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Nessuna medicazione guarisce · la medicazione è l'ultimo passo, non il primo", celle:[
  {n:"1", t:"Una lesione da pressione **senza scarico**", key:true}, {n:"2", t:"Un'ulcera venosa **senza compressione**"}, {n:"3", t:"Un piede diabetico **senza scarico e controllo glicemico**"}]},

{id:"s48", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Nel prossimo modulo · l'area medica, apparato per apparato · otto lezioni, come sempre", celle:[
  {n:"1", t:"**Cuore**, **polmone**"}, {n:"2", t:"**Diabete**, **rene**", key:true}, {n:"3", t:"**Fegato**, **cervello**"}, {n:"4", t:"**Oncologia** ed ematologia"}]},
{id:"s49", tipo:"frase", tema:"chiaro", sopratitolo:"Ci vediamo lì",
  testo:"Il modulo in cui tutto ciò che abbiamo studiato finora si applica alle **malattie più frequenti** nei reparti."},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossimo modulo",
  titolo:"Modulo 8<br>Assistenza<br>in area medica", sottotitolo:"Apparato per apparato",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
