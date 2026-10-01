// Contenuto delle 50 scene della lezione 7.4 — ferite chirurgiche e
// infezione del sito chirurgico. Tre corpi nuovi: le profondità
// dell'infezione (ssi) sulla sezione a cinque strati con la ferita
// suturata, i giorni della rimozione dei punti per sede su un asse, e i
// punti (la tecnica giusta e quella sbagliata, in sezione). La sequenza
// dell'eviscerazione è un percorso a otto tappe in tre accensioni.

const EVI = [
 {t:"Restare", d:"e chiamare aiuto", key:true}, {t:"Supino", d:"ginocchia flesse, testata un po' sollevata"}, {t:"Coprire", d:"garze sterili con fisiologica tiepida"}, {t:"Non riposizionare"},
 {t:"Digiuno", d:"tornerà in sala"}, {t:"Parametri", d:"segni di shock"}, {t:"Rassicurare"}, {t:"Chirurgo", d:"subito", key:true},
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 7 · Wound care, stomie e drenaggi",
  titolo:"Ferite chirurgiche e infezione<br>del sito chirurgico", sottotitolo:"7.4 · Proteggere, riconoscere, agire",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"frase", tema:"chiaro", sopratitolo:"Micro-lezione 4 di 8",
  testo:"La ferita chirurgica guarisce per **prima intenzione**, e nella maggior parte dei casi guarisce **senza problemi**."},
{id:"s03", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Il compito dell'infermiere", celle:[
  {n:"1", t:"**Proteggerla** nei primi giorni"}, {n:"2", t:"Riconoscere presto un'**infezione** o una **deiscenza**"}, {n:"3", t:"Sapere che cosa fare nell'unica vera emergenza: l'**eviscerazione**", key:true}]},
{id:"s04", tipo:"percorso", tema:"chiaro", sopratitolo:"La lezione le segue in quest'ordine, e il caso finale le mette insieme", tappe:[
  {t:"Proteggere"}, {t:"Riconoscere", key:true}, {t:"Agire"}]},

{id:"s05", tipo:"cifre", tema:"chiaro", sopratitolo:"La medicazione applicata in sala operatoria, sterile · salvo necessità: sanguinamento, essudato abbondante, distacco, segni di infezione", voci:[
  {n:"48", suf:"h", d:"non si rimuove", key:true}]},
{id:"s06", tipo:"frase", tema:"chiaro", sopratitolo:"In quei primi due giorni la ferita si sta sigillando",
  testo:"Ogni apertura è un rischio. Quando la si rinnova, **tecnica asettica**."},
{id:"s07", tipo:"frase", tema:"chiaro", sopratitolo:"Dopo 48 ore, di norma, secondo l'indicazione del chirurgo",
  testo:"La persona può fare la **doccia**: la ferita sigillata non teme l'acqua, teme le mani."},

{id:"s08", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Che cosa osservare · un lieve arrossamento dei margini nei primi giorni è la fase infiammatoria della 7.1", celle:[
  {n:"1", t:"Margini **accostati**", key:true}, {n:"2", t:"**Arrossamento** lieve dei margini: normale"}]},
{id:"s09", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Che cosa osservare", celle:[
  {n:"3", t:"**Essudato**: quantità e tipo"}, {n:"4", t:"**Dolore**, soprattutto il suo andamento: se **aumenta** dopo i primi giorni è un segnale", key:true}]},
{id:"s10", tipo:"frase", tema:"chiaro", sopratitolo:"E i segni sistemici: i parametri, con la temperatura",
  testo:"Una ferita si guarda ogni giorno con gli stessi occhi, e si scrive ciò che si vede: **il confronto con ieri** è la valutazione."},

{id:"s11", tipo:"cifre", tema:"chiaro", sopratitolo:"L'infezione del sito chirurgico · definita nella lezione 4.1", voci:[
  {n:"30", suf:"giorni", d:"entro", key:true}, {n:"90", suf:"giorni", d:"con impianto"}]},
{id:"s12", tipo:"ssi", tema:"chiaro", sopratitolo:"Tre profondità, e la terza non si vede dalla ferita"},
{id:"s13", tipo:"ssi", tema:"chiaro", sopratitolo:"I segni · in genere dal terzo-quinto giorno · rossore che si estende, calore, edema, dolore in aumento, essudato purulento, apertura, febbre", attive:[], rossore:260},
{id:"s14", tipo:"trappola", tema:"chiaro", sopratitolo:"La febbre nelle prime 24–48 ore", righe:[
  {sb:"Aprire la ferita per cercare la causa della febbre precoce", ok:"Raramente dipende dalla ferita: ha quasi sempre **un'altra causa**"}]},

{id:"s15", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"Il bundle di prevenzione · prima dell'intervento", celle:[
  {t:"**Doccia** preoperatoria"}, {t:"**Niente tricotomia con il rasoio**: microlesioni colonizzate", key:true}]},
{id:"s16", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Prima dell'intervento · le stesse cose che ostacolano la guarigione nella 7.1", celle:[
  {t:"Se serve, il **clipper**, subito prima", key:true}, {t:"Controllo della **glicemia**"}, {t:"Abbandono del **fumo**"}, {t:"**Nutrizione**"}]},
{id:"s17", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"Durante · l'ipotermia aumenta le infezioni", celle:[
  {t:"**Profilassi antibiotica** entro **60 minuti** prima dell'incisione", key:true}, {t:"**Antisepsi** con clorexidina alcolica"}, {t:"**Normotermia**"}]},
{id:"s18", tipo:"percorso", tema:"chiaro", sopratitolo:"Dopo · medicazione sterile per 48 ore e igiene delle mani · lo riprenderemo nel modulo 9", tappe:[
  {t:"Prima", d:"doccia, clipper, glicemia, fumo, nutrizione"}, {t:"Durante", d:"profilassi, antisepsi, normotermia", key:true}, {t:"Dopo", d:"48 ore, igiene delle mani"}]},

{id:"s19", tipo:"giorni", tema:"chiaro", sopratitolo:"La rimozione dei punti e delle agrafes · su indicazione del chirurgo · il volto: vascolarizzazione ottima, cicatrice minima", attive:[0]},
{id:"s20", tipo:"giorni", tema:"chiaro", sopratitolo:"La rimozione dei punti · i tempi dipendono dalla sede"},
{id:"s21", tipo:"frase", tema:"chiaro", sopratitolo:"Nei quiz conta l'ordine · dove la cute è ben irrorata si toglie presto, dove è in tensione si aspetta",
  testo:"Il **volto** per primo, le **articolazioni** per ultime."},

{id:"s22", tipo:"punti", tema:"chiaro", sopratitolo:"La tecnica · asepsi · si solleva il nodo con la pinza, si taglia il filo vicino alla cute, dal lato opposto al nodo", attive:[0], key:[0]},
{id:"s23", tipo:"punti", tema:"chiaro", sopratitolo:"Il dettaglio che il quiz chiede · il filo che era fuori non deve passare dentro", key:[0]},
{id:"s24", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"Poi", celle:[
  {t:"Spesso **a punti alterni**, verificando che la ferita tenga", key:true}, {t:"Al termine, **strisce adesive** di rinforzo"}]},

{id:"s25", tipo:"cifre", tema:"chiaro", sopratitolo:"La deiscenza · i margini della ferita si separano", voci:[
  {n:"5°–10°", suf:"giorno", d:"in genere", key:true}]},
{id:"s26", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"I fattori di rischio · e tutto ciò che aumenta la pressione addominale", celle:[
  {n:"1", t:"**Obesità**, **diabete**"}, {n:"2", t:"**Malnutrizione**, **corticosteroidi**"}, {n:"3", t:"**Infezione**", key:true}, {n:"4", t:"**Tosse**, vomito, distensione"}]},
{id:"s27", tipo:"frase", tema:"chiaro", sopratitolo:"Il segno premonitore da conoscere · a volte con la sensazione di «qualcosa che si è rotto»",
  testo:"Un'improvvisa fuoriuscita di **liquido siero-ematico abbondante** dalla ferita."},

{id:"s28", tipo:"percorso", tema:"chiaro", sopratitolo:"L'eviscerazione · i visceri fuoriescono attraverso la ferita · un'emergenza chirurgica: la sequenza va saputa", attive:[0], tappe:EVI},
{id:"s29", tipo:"percorso", tema:"chiaro", sopratitolo:"L'eviscerazione · ginocchia flesse per ridurre la tensione sulla parete addominale", attive:[0,1], tappe:EVI},
{id:"s30", tipo:"percorso", tema:"chiaro", sopratitolo:"L'eviscerazione · garze sterili imbevute di fisiologica tiepida, perché i visceri non si secchino", attive:[0,1,2,3], tappe:EVI},
{id:"s31", tipo:"percorso", tema:"chiaro", sopratitolo:"L'eviscerazione · è un'esperienza terrificante: si rassicura", tappe:EVI},

{id:"s32", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"La prevenzione della deiscenza · si insegna", celle:[
  {t:"**Sostenere la ferita** con un cuscino o con le mani quando tossisce, starnutisce o si muove", key:true}]},
{id:"s33", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"La prevenzione della deiscenza · le cause, al contrario", celle:[
  {t:"Alzarsi **girandosi prima sul fianco**, non di colpo con gli addominali", key:true}, {t:"**Nutrizione**, controllo **glicemico**"}, {t:"Fasce addominali su indicazione"}]},

{id:"s34", tipo:"percorso", tema:"chiaro", sopratitolo:"Quando la ferita è infetta o si è aperta senza eviscerazione · campioni con la tecnica della 7.1: tessuto vitale, non pus", tappe:[
  {t:"Chirurgo", key:true}, {t:"Campioni", d:"su indicazione"}, {t:"Spesso si apre del tutto"}]},
{id:"s35", tipo:"frase", tema:"chiaro", sopratitolo:"Lasciata guarire per seconda intenzione",
  testo:"Con **medicazioni avanzate** o con la **terapia a pressione negativa**: la prossima lezione."},

{id:"s36", tipo:"catena", tema:"chiaro", sopratitolo:"Un collegamento importante · il dolore della ferita", passi:[
  {t:"Dolore non controllato", key:true}, {t:"Non si mobilizza"}, {t:"Respira superficialmente, non tossisce"}, {t:"Complicanze polmonari e trombotiche"}]},
{id:"s37", tipo:"frase", tema:"chiaro", sopratitolo:"Un'analgesia adeguata e rivalutata, come nella lezione 3.7, è anche prevenzione",
  testo:"Chi non ha dolore **respira, tossisce, cammina**."},

{id:"s38", tipo:"frase", tema:"chiaro", sopratitolo:"Il caso · sesto giorno dopo una laparotomia, paziente obeso e diabetico",
  testo:"Dopo un colpo di tosse la medicazione si bagna di abbondante **liquido rosato**. Che cosa pensi?"},
{id:"s39", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Segno premonitore di deiscenza · il giorno giusto, i fattori di rischio giusti, il liquido giusto", celle:[
  {n:"1", t:"**Non lasci** il paziente", key:true}, {n:"2", t:"Supino con le **ginocchia flesse**"}, {n:"3", t:"**Ispezioni** la ferita"}]},
{id:"s40", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Che cosa fai · se ci sono visceri esposti, la sequenza dell'eviscerazione", celle:[
  {t:"**Garze sterili**"}, {t:"**Digiuno**"}, {t:"**Parametri**"}, {t:"**Chirurgo**, subito", key:true}]},
{id:"s41", tipo:"titolo", tema:"profondo",
  titolo:"Una ferita che cede **non aspetta il giro del mattino**.",
  sotto:"Si avvisa subito il chirurgo."},

{id:"s42", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"In Veneto", celle:[
  {n:"1", t:"**Sorveglianza** delle infezioni del sito chirurgico", key:true}, {n:"2", t:"Il bundle nelle procedure e nella **check-list di sala operatoria**"}, {n:"3", t:"**Procedure aziendali** per la medicazione delle ferite"}]},
{id:"s43", tipo:"frase", tema:"chiaro", sopratitolo:"Molte infezioni compaiono dopo la dimissione",
  testo:"L'**educazione** del paziente sui segni da riconoscere è parte della prevenzione."},

{id:"s44", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"L'educazione alla dimissione · i segni da riconoscere", celle:[
  {t:"**Rossore** che si estende", key:true}, {t:"**Secrezione purulenta**"}, {t:"**Dolore** in aumento"}, {t:"**Febbre**, apertura della ferita"}]},
{id:"s45", tipo:"percorso", tema:"chiaro", sopratitolo:"Con il teach-back della lezione 2.7 · la persona ripete, con parole sue, che cosa deve guardare e chi deve chiamare", tappe:[
  {t:"Igiene e doccia"}, {t:"A chi rivolgersi", key:true}, {t:"Teach-back"}]},

{id:"s46", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Ricapitoliamo", celle:[
  {t:"Medicazione sterile per **48 ore**"}, {t:"Infezione del sito entro **30 o 90 giorni**", key:true}, {t:"Bundle: **niente rasoio**, profilassi entro **60 minuti**, **normotermia**"}]},
{id:"s47", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Ricapitoliamo", celle:[
  {t:"Punti: **volto 3–5 giorni**, articolazioni **14**"}, {t:"Deiscenza fra il **5° e il 10° giorno**, annunciata dal liquido siero-ematico", key:true}]},
{id:"s48", tipo:"percorso", tema:"chiaro", sopratitolo:"Ricapitoliamo · l'eviscerazione", tappe:[
  {t:"Ginocchia flesse"}, {t:"Garze con fisiologica tiepida", key:true}, {t:"Non riposizionare"}, {t:"Digiuno"}, {t:"Chirurgo subito"}]},
{id:"s49", tipo:"frase", tema:"chiaro", sopratitolo:"Nella prossima lezione",
  testo:"Le **medicazioni avanzate**."},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"7.5<br>Medicazioni avanzate", sottotitolo:"Per classe, non per marca",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
