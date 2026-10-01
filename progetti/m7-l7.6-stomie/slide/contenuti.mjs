// Contenuto delle 50 scene della lezione 7.6 — stomie digestive e
// urinarie. Due corpi nuovi: l'addome con le tre stomie al posto giusto
// (colostomia a sinistra della persona, ileostomia a destra, urostomia più
// in basso) e la placca con il foro troppo largo, giusto e troppo stretto.
// Il cambio del presidio è un percorso in due accensioni.

const CAMBIO = [
 {t:"Rimuovere", d:"dall'alto verso il basso, sostenendo la cute"}, {t:"Detergere", d:"acqua tiepida, garze morbide", key:true}, {t:"Asciugare", d:"tamponando"},
 {t:"Ispezionare"}, {t:"Applicare", d:"dal basso verso l'alto"}, {t:"Svuotare", d:"a un terzo o metà"},
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 7 · Wound care, stomie e drenaggi",
  titolo:"Stomie digestive<br>e urinarie", sottotitolo:"7.6 · Tecnica e relazione",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"frase", tema:"chiaro", sopratitolo:"Micro-lezione 6 di 8 · un'apertura chirurgica che porta all'esterno un tratto di intestino o le vie urinarie",
  testo:"Per la persona è un cambiamento profondo del **corpo**, dell'**immagine di sé** e della **vita quotidiana**."},
{id:"s03", tipo:"confronto", tema:"chiaro", sopratitolo:"Per l'infermiere contano insieme · chi non accetta la stomia difficilmente imparerà a gestirla", col:[
  {h:"La tecnica", t:"presidi, cute, complicanze"}, {h:"La relazione", t:"l'accettazione viene prima", key:true}]},

{id:"s04", tipo:"addome", tema:"chiaro", sopratitolo:"I tipi · la colostomia: il colon ha già riassorbito l'acqua", attive:[0]},
{id:"s05", tipo:"addome", tema:"chiaro", sopratitolo:"L'ileostomia · enzimi digestivi molto aggressivi per la cute", attive:[0,1]},
{id:"s06", tipo:"addome", tema:"chiaro", sopratitolo:"L'urostomia · per esempio il condotto ileale secondo Bricker: fatto di intestino, per questo il muco è normale"},
{id:"s07", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"I quiz incrociano queste quattro parole: sinistra e destra, formate e liquide", celle:[
  {n:"1", t:"**Temporanee** o **definitive**"}, {n:"2", t:"**Terminali** o **a doppia canna**", key:true}]},

{id:"s08", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"La stomia normale · l'ileostomia protrude di più, 2–3 cm, per allontanare le feci liquide dalla cute", celle:[
  {t:"**Rossa**", key:true}, {t:"**Umida**, lucida"}, {t:"Leggermente **protrudente**"}, {t:"**Non dolente** al tatto: la mucosa non ha recettori del dolore"}]},
{id:"s09", tipo:"frase", tema:"chiaro", sopratitolo:"Nei primi giorni",
  testo:"È **edematosa**, e si riduce nelle settimane successive."},
{id:"s10", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"I segnali d'allarme · si segnalano subito al chirurgo", celle:[
  {n:"!", t:"**Pallida, scura, violacea o nera**: ischemia o necrosi", key:true}, {n:"!", t:"**Retrazione**"}, {n:"!", t:"**Sanguinamento abbondante**"}]},

{id:"s11", tipo:"confronto", tema:"chiaro", sopratitolo:"I presidi", col:[
  {h:"Monopezzo", t:"placca e sacca **unite**"}, {h:"Due pezzi", t:"la **placca** resta alcuni giorni, la **sacca** si cambia", key:true}]},
{id:"s12", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Il tipo di sacca dipende dalla stomia", celle:[
  {n:"1", t:"**Chiusa**: colostomia con feci formate"}, {n:"2", t:"**Aperta**, drenabile: ileostomia, da svuotare più volte al giorno", key:true}]},
{id:"s13", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Il tipo di sacca · molte hanno un filtro per i gas", celle:[
  {n:"3", t:"**Con rubinetto** e valvola anti-reflusso: urostomia, collegabile di notte a una sacca più grande", key:true}]},

{id:"s14", tipo:"placca", tema:"chiaro", sopratitolo:"Un dettaglio tecnico che determina tutto · la misura del foro della placca", attive:[1]},
{id:"s15", tipo:"placca", tema:"chiaro", sopratitolo:"Troppo largo: la cute esposta agli effluenti · troppo stretto: trauma della mucosa"},
{id:"s16", tipo:"frase", tema:"chiaro", sopratitolo:"Nelle prime settimane si rimisura spesso · l'edema si riduce e la stomia diventa più piccola",
  testo:"La placca giusta a **due giorni** è larga a **due settimane**."},

{id:"s17", tipo:"percorso", tema:"chiaro", sopratitolo:"Il cambio · si rimuove la placca delicatamente, sostenendo la cute con l'altra mano", attive:[0], tappe:CAMBIO},
{id:"s18", tipo:"trappola", tema:"chiaro", sopratitolo:"La detersione · danneggiano la cute e la mucosa", righe:[
  {sb:"Alcol, disinfettanti, solventi", ok:"**Acqua tiepida** e garze morbide"}]},
{id:"s19", tipo:"percorso", tema:"chiaro", sopratitolo:"Il cambio · sulla cute umida la placca non aderisce", attive:[0,1,2,3,4], tappe:CAMBIO},
{id:"s20", tipo:"percorso", tema:"chiaro", sopratitolo:"Una sacca troppo piena si stacca per il peso · si toglie dall'alto, si mette dal basso: la sequenza è una domanda da quiz", tappe:CAMBIO},

{id:"s21", tipo:"frase", tema:"chiaro", sopratitolo:"La complicanza più frequente",
  testo:"La **dermatite peristomale**: la cute intorno alla stomia si arrossa, si irrita, si lesiona."},
{id:"s22", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Le cause · nell'ileostomia gli enzimi digeriscono letteralmente la cute", celle:[
  {n:"1", t:"**Perdite** di effluente sotto la placca: la più comune", key:true}, {n:"2", t:"Gli **adesivi**"}, {n:"3", t:"Le **allergie**"}, {n:"4", t:"Le **infezioni micotiche**"}]},
{id:"s23", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"La prevenzione", celle:[
  {t:"**Foro corretto**", key:true}, {t:"**Prodotti barriera**"}, {t:"Pasta o anelli per **riempire le pieghe**"}, {t:"Rimozione **atraumatica** della placca"}]},

{id:"s24", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Le complicanze precoci", celle:[
  {n:"1", t:"**Necrosi**, edema, sanguinamento", key:true}, {n:"2", t:"**Retrazione**, distacco fra mucosa e cute"}, {n:"3", t:"**Dermatite**"}, {n:"4", t:"**Alta portata** dell'ileostomia"}]},
{id:"s25", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Le complicanze tardive", celle:[
  {n:"1", t:"**Ernia parastomale**, la più frequente: un rigonfiamento intorno alla stomia", key:true}, {n:"2", t:"**Prolasso**: la stomia si allunga all'esterno"}, {n:"3", t:"**Stenosi**: il restringimento"}, {n:"4", t:"Retrazione, **granulomi**"}]},

{id:"s26", tipo:"cifre", tema:"chiaro", sopratitolo:"L'ileostomia ad alta portata · disidratazione, perdita di potassio e sodio, fino all'insufficienza renale", voci:[
  {n:"1,5–2", suf:"l/die", d:"oltre, la stomia perde troppo", key:true}]},
{id:"s27", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Si sorvegliano · il bilancio della lezione 3.5, con una voce in più nelle uscite", celle:[
  {t:"**Bilancio idrico**, diuresi", key:true}, {t:"**Sete**"}, {t:"**Crampi**"}, {t:"**Debolezza**"}]},
{id:"s28", tipo:"trappola", tema:"chiaro", sopratitolo:"Un'indicazione educativa controintuitiva", righe:[
  {sb:"Bere solo acqua: può peggiorare la perdita di sali", ok:"Anche **soluzioni con elettroliti**, secondo indicazione"}]},

{id:"s29", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"Alimentazione · con l'ileostomia", celle:[
  {t:"**Masticare bene**"}, {t:"Attenzione ai cibi molto **fibrosi**: mais, frutta secca, sedano possono ostruire la stomia", key:true}, {t:"**Liquidi e sali**"}]},
{id:"s30", tipo:"frase", tema:"chiaro", sopratitolo:"Con la colostomia",
  testo:"Attenzione agli alimenti che producono **gas** e **odore**."},
{id:"s31", tipo:"trappola", tema:"chiaro", sopratitolo:"Una nota sui farmaci · nell'ileostomia", righe:[
  {sb:"Compresse a rilascio modificato o gastroresistenti: a volte intatte nella sacca", ok:"Assorbimento incompleto: **va segnalato**"}]},

{id:"s32", tipo:"frase", tema:"chiaro", sopratitolo:"L'irrigazione · un lavaggio periodico del colon attraverso la stomia",
  testo:"Uno **svuotamento programmato**, e fra un'irrigazione e l'altra un presidio molto piccolo."},
{id:"s33", tipo:"confronto", tema:"chiaro", sopratitolo:"In persone selezionate e addestrate", col:[
  {h:"Solo", t:"**colostomia sinistra**", key:true}, {h:"Mai", t:"**ileostomia**: contenuto liquido continuo"}]},

{id:"s34", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"L'urostomia · il flusso è continuo", celle:[
  {n:"1", t:"Il cambio **al mattino, prima di bere**, quando la produzione è minore", key:true}, {n:"2", t:"Il **muco** nelle urine è normale"}]},
{id:"s35", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"L'urostomia", celle:[
  {t:"Sacca con **valvola anti-reflusso**; di notte, la sacca più grande"}, {t:"**Idratazione abbondante**, per prevenire le infezioni", key:true}]},
{id:"s36", tipo:"trappola", tema:"chiaro", sopratitolo:"Il campione di urine · la stessa regola del catetere nella lezione 3.6", righe:[
  {sb:"Dalla sacca", ok:"**Direttamente dalla stomia**, con tecnica sterile"}]},

{id:"s37", tipo:"frase", tema:"chiaro", sopratitolo:"La parte che distingue un buon infermiere · prima dell'intervento programmato",
  testo:"La **marcatura** della sede della stomia."},
{id:"s38", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"La marcatura · la persona seduta, in piedi e sdraiata", celle:[
  {t:"Un punto **visibile alla persona**", key:true}, {t:"Lontano da **pieghe, cicatrici e cinture**"}, {t:"E si **informa**"}]},
{id:"s39", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"L'impatto psicologico · coinvolgendo il partner, se la persona lo desidera", celle:[
  {t:"**Immagine corporea**", key:true}, {t:"**Sessualità**"}, {t:"Vita **sociale e lavorativa**"}, {t:"Le **associazioni** di persone stomizzate: una risorsa preziosa"}]},

{id:"s40", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"L'educazione alla dimissione", celle:[
  {t:"**Autonomia nel cambio**, verificata facendolo eseguire, non solo spiegandolo", key:true}, {t:"Riconoscere le **complicanze**"}]},
{id:"s41", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"L'educazione alla dimissione", celle:[
  {t:"**Alimentazione** e idratazione"}, {t:"La **fornitura dei presidi**, a carico del Servizio Sanitario"}, {t:"I riferimenti: l'**ambulatorio di stomaterapia**", key:true}]},

{id:"s42", tipo:"frase", tema:"chiaro", sopratitolo:"Il caso · seconda giornata dopo il confezionamento di una colostomia",
  testo:"La stomia appare **violacea scura**. Che cosa pensi? Sofferenza **ischemica**, possibile **necrosi**."},
{id:"s43", tipo:"frase", tema:"chiaro", sopratitolo:"Che cosa fai · una necrosi può estendersi in profondità e richiedere un nuovo intervento",
  testo:"**Avvisi subito il chirurgo.**"},
{id:"s44", tipo:"titolo", tema:"profondo",
  titolo:"Non è un problema di medicazione: è un'**urgenza chirurgica**.",
  sotto:"Sacca trasparente per osservare senza rimuovere; parametri; aspetto e ora documentati."},

{id:"s45", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"In Veneto", celle:[
  {n:"1", t:"**Ambulatori di stomaterapia** ospedalieri e territoriali, con infermieri **stomaterapisti**", key:true}, {n:"2", t:"La fornitura dei presidi tramite il **distretto**: assistenza protesica e integrativa"}]},
{id:"s46", tipo:"frase", tema:"chiaro", sopratitolo:"All'orale · formazione dedicata, ambulatorio proprio, presa in carico che continua a casa",
  testo:"L'infermiere stomaterapista: un esempio di **competenza specialistica** infermieristica."},

{id:"s47", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"Ricapitoliamo", celle:[
  {t:"**Colostomia**: sinistra, feci formate · **ileostomia**: destra, feci liquide ed enzimi · **urostomia**: flusso continuo, muco normale", key:true}, {t:"Stomia **rossa e umida**; **scura** è un allarme"}]},
{id:"s48", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Ricapitoliamo", celle:[
  {t:"Foro **2–3 mm** più ampio"}, {t:"**Solo acqua** per detergere"}, {t:"**Ernia parastomale**: la tardiva più frequente", key:true}, {t:"**Irrigazione** solo nella colostomia sinistra"}]},
{id:"s49", tipo:"frase", tema:"chiaro", sopratitolo:"Nella prossima lezione",
  testo:"I **drenaggi**, compreso il drenaggio toracico."},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"7.7<br>Drenaggi", sottotitolo:"Ciò che esce è un'informazione clinica",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
