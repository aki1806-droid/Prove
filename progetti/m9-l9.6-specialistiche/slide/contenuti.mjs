// Contenuto delle 50 scene della lezione 9.6 — chirurgie specialistiche.
// Nessun corpo nuovo: le tre precauzioni dell'anca sono trappole, il
// controllo neurovascolare una griglia a sei, la sindrome compartimentale
// un confronto precoce/tardivo con il titolo profondo, ogni chirurgia una
// griglia, il day surgery una spunta, la tabella finale su due scene.

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 9 · Assistenza perioperatoria",
  titolo:"Chirurgie specialistiche:<br>specificità assistenziali", sottotitolo:"9.6 · Anca, gesso, compartimentale, vascolare, toracica, urologica, tiroide, day surgery",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"frase", tema:"chiaro", sopratitolo:"Micro-lezione 6 di 8 · tutto quello che abbiamo visto finora vale, e qui si aggiunge il resto",
  testo:"Ogni chirurgia specialistica ha le sue **attenzioni specifiche**."},
{id:"s03", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Ciò che i concorsi chiedono più spesso", celle:[
  {n:"1", t:"La **protesi d'anca** e le sue precauzioni", key:true}, {n:"2", t:"I **gessi** e la **sindrome compartimentale**"}, {n:"3", t:"Le complicanze **caratteristiche** delle altre chirurgie"}]},

{id:"s04", tipo:"figura", tema:"chiaro", illu:"persona",
  titolo:"La protesi d'anca",
  sotto:"nelle prime settimane il rischio principale è la lussazione: la testa della protesi esce dalla sua sede"},
{id:"s05", tipo:"frase", tema:"chiaro", sopratitolo:"Le precauzioni dipendono dall'accesso chirurgico",
  testo:"Per l'**accesso posteriore**, il più classico nei manuali, sono **tre**."},
{id:"s06", tipo:"trappola", tema:"chiaro", sopratitolo:"Prima precauzione · niente flessione dell'anca oltre i 90°", righe:[
  {sb:"Sedie basse, chinarsi per allacciare le scarpe", ok:"**Sedie alte**, **rialzo per il water**"}]},
{id:"s07", tipo:"trappola", tema:"chiaro", sopratitolo:"Seconda e terza · niente adduzione oltre la linea mediana, niente intrarotazione", righe:[
  {sb:"Accavallare le gambe", ok:"A letto, **cuscino abduttore** fra le gambe"}]},

{id:"s08", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"I segni di lussazione · spesso dopo un movimento scorretto o una torsione · si avvisa subito", celle:[
  {n:"1", t:"**Dolore improvviso**"}, {n:"2", t:"Arto **accorciato e ruotato**", key:true}, {n:"3", t:"Impossibilità di **muoverlo**"}]},
{id:"s09", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Per il resto", celle:[
  {t:"**Mobilizzazione precoce** con il fisioterapista, con il carico consentito dal chirurgo", key:true}, {t:"Prevenzione delle **cadute**"}]},
{id:"s10", tipo:"frase", tema:"chiaro", sopratitolo:"La chirurgia protesica dell'arto inferiore è fra le più a rischio · il caso della lezione precedente",
  testo:"E **profilassi antitrombotica**."},

{id:"s11", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"La protesi di ginocchio · il ginocchio protesico è molto doloroso", celle:[
  {t:"Mobilizzazione precoce, recupero della **flessione**"}, {t:"Ghiaccio"}, {t:"**Controllo del dolore** che permetta la riabilitazione", key:true}]},
{id:"s12", tipo:"cifre", tema:"chiaro", sopratitolo:"La frattura di femore nell'anziano · indicatore di qualità monitorato a livello nazionale: il ritardo aumenta mortalità e complicanze", voci:[
  {n:"48", suf:"ore", d:"intervento dall'arrivo in ospedale", key:true}]},
{id:"s13", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Un paziente ad alto rischio · approccio ortogeriatrico: ortopedico e geriatra insieme", celle:[
  {n:"!", t:"**Delirium**", key:true}, {n:"!", t:"**Lesioni da pressione**"}, {n:"!", t:"**Malnutrizione**"}]},

{id:"s14", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"Il gesso · il controllo neurovascolare, ripetuto · si solleva l'arto per ridurre l'edema", celle:[
  {t:"**Colorito**"}, {t:"**Temperatura**"}, {t:"**Polso**", key:true}, {t:"Riempimento capillare"}, {t:"**Sensibilità**"}, {t:"**Motilità** delle dita"}]},
{id:"s15", tipo:"trappola", tema:"chiaro", sopratitolo:"Il gesso fresco non si copre, per farlo asciugare", righe:[
  {sb:"Maneggiarlo con le dita: impronte e punti di pressione interni", ok:"Con il **palmo** della mano"}]},
{id:"s16", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Non si infila nulla sotto il gesso per grattarsi · si segnalano", celle:[
  {n:"!", t:"**Dolore**", key:true}, {n:"!", t:"**Odore**, secrezioni"}, {n:"!", t:"Gesso **troppo stretto**"}]},

{id:"s17", tipo:"catena", tema:"chiaro", sopratitolo:"La sindrome compartimentale · l'emergenza che i concorsi chiedono", passi:[
  {t:"Frattura, intervento, gesso"}, {t:"Pressione nel compartimento muscolare chiuso", key:true}, {t:"Circolazione bloccata"}]},
{id:"s18", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Il segno precoce e più importante · poi parestesie, pallore, deficit motorio", celle:[
  {n:"1", t:"**Dolore sproporzionato** rispetto alla lesione", key:true}, {n:"2", t:"Che **aumenta con lo stiramento passivo**: estendendo passivamente le dita"}]},
{id:"s19", tipo:"confronto", tema:"chiaro", sopratitolo:"Aspettarlo significa arrivare tardi", col:[
  {h:"Precoce", t:"dolore sproporzionato allo stiramento passivo"}, {h:"Tardivo", t:"**assenza del polso**", key:true}]},
{id:"s20", tipo:"titolo", tema:"profondo",
  titolo:"L'assenza del polso è<br>un segno **tardivo**.",
  sotto:""},
{id:"s21", tipo:"trappola", tema:"chiaro", sopratitolo:"È un'emergenza: si avvisa subito, si allenta o si apre il gesso secondo indicazione", righe:[
  {sb:"Sollevare l'arto oltre il livello del cuore", ok:"**No**: ridurrebbe ulteriormente la perfusione"}]},

{id:"s22", tipo:"trappola", tema:"chiaro", sopratitolo:"Le trazioni · altrimenti la trazione non agisce", righe:[
  {sb:"Pesi appoggiati a terra o al letto, corde bloccate", ok:"Pesi che **pendono liberi**, corde libere nelle carrucole"}]},
{id:"s23", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"Un peso sollevato per un minuto è un minuto di trazione persa", celle:[
  {t:"Si mantiene l'**allineamento** del corpo"}, {t:"I pesi **non si tolgono** senza indicazione, nemmeno per l'igiene", key:true}]},
{id:"s24", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"La trazione scheletrica · e tutte le complicanze dell'immobilità della lezione 3.2", celle:[
  {t:"**Punti di inserzione** dei chiodi: tecnica asettica, sorveglianza dei segni di infezione", key:true}]},

{id:"s25", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"La chirurgia addominale · riprende quasi tutto ciò che abbiamo visto", celle:[
  {t:"**Sondino**, **drenaggi**"}, {t:"**Canalizzazione** e ileo", key:true}, {t:"**Stomie**"}, {t:"**Sostegno della ferita** nella tosse"}]},
{id:"s26", tipo:"frase", tema:"chiaro", sopratitolo:"E il rischio di deiscenza ed eviscerazione",
  testo:"È la chirurgia in cui l'**ERAS** ha mostrato i benefici più chiari: meno degenza, meno ileo, meno complicanze."},

{id:"s27", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"La chirurgia vascolare · dopo una rivascolarizzazione dell'arto · confronto con l'arto controlaterale e con i valori di prima", celle:[
  {t:"**Polsi distali**", key:true}, {t:"Colorito, temperatura"}, {t:"Sensibilità, motilità"}]},
{id:"s28", tipo:"frase", tema:"chiaro", sopratitolo:"Si sorveglia il sanguinamento",
  testo:"La **scomparsa di un polso** prima presente è un'**urgenza**."},
{id:"s29", tipo:"confronto", tema:"chiaro", sopratitolo:"Dopo l'endoarteriectomia carotidea · due controlli specifici", col:[
  {h:"Neurologico", t:"per il rischio di **ictus**"}, {h:"Il collo", t:"un **ematoma** può comprimere le vie aeree", key:true}]},

{id:"s30", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"La chirurgia toracica · il polmone operato deve espandersi, e nessuno può farlo al posto del paziente", celle:[
  {t:"**Drenaggio toracico**: le regole della lezione 7.7", key:true}, {t:"Fisioterapia respiratoria, **spirometro**, tosse assistita"}]},
{id:"s31", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"Il dolore toracico impedisce di respirare", celle:[
  {t:"**Analgesia** efficace: peridurale toracica o blocchi nervosi", key:true}, {t:"Mobilizzazione precoce di **braccio e spalla** del lato operato"}]},

{id:"s32", tipo:"norma", tema:"chiaro", etichetta:"Chirurgia urologica · dopo la TURP", sigla:"Drenato − irrigato",
  testo:"Dopo la resezione endoscopica della prostata: **irrigazione vescicale continua** con catetere a tre vie, il bilancio della lezione 8.4."},
{id:"s33", tipo:"frase", tema:"chiaro", sopratitolo:"Si sorvegliano coaguli e ostruzione",
  testo:"E una complicanza specifica: la **sindrome da riassorbimento**."},
{id:"s34", tipo:"catena", tema:"chiaro", sopratitolo:"Una confusione nuova dopo questo intervento va segnalata e fa pensare al sodio", passi:[
  {t:"Liquido di irrigazione assorbito in circolo", key:true}, {t:"Confusione, nausea, bradicardia"}, {t:"Iponatriemia"}]},

{id:"s35", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"La tiroidectomia · tre complicanze da conoscere · la prima", celle:[
  {n:"1", t:"**Ematoma del collo**: può comprimere le vie aeree, è un'**emergenza**", key:true}]},
{id:"s36", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Secondo protocollo, al letto il materiale per riaprire la ferita · si sorvegliano", celle:[
  {t:"**Collo**"}, {t:"**Respiro**"}, {t:"**Voce**"}, {t:"**Stridore**", key:true}]},
{id:"s37", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"La seconda e la terza · posizione semiseduta", celle:[
  {n:"2", t:"**Ipocalcemia** per lesione delle paratiroidi: formicolii intorno alla bocca, **Chvostek** e **Trousseau** (lezione 3.5)", key:true}, {n:"3", t:"**Disfonia** per lesione del nervo laringeo ricorrente"}]},

{id:"s38", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"Il day surgery · intervento e dimissione nella stessa giornata", celle:[
  {t:"**Selezione** dei pazienti: condizioni cliniche e supporto a domicilio", key:true}]},
{id:"s39", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"Accompagnatore e qualcuno con sé la prima notte · i criteri di dimissione", celle:[
  {t:"Parametri **stabili**"}, {t:"**Dolore** controllato"}, {t:"**Nausea** assente"}, {t:"**Minzione**", key:true}, {t:"Capacità di **camminare**"}]},
{id:"s40", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Istruzioni scritte · spesso il giorno dopo un contatto telefonico infermieristico · per 24 ore", celle:[
  {n:"✗", t:"Niente **guida**", key:true}, {n:"✗", t:"Niente **decisioni importanti**"}, {n:"✗", t:"Niente **alcol**"}]},

{id:"s41", tipo:"frase", tema:"chiaro", sopratitolo:"Il caso · gesso all'avambraccio da sei ore",
  testo:"Dolore **fortissimo**, che **non risponde** all'analgesico e **aumenta** estendendo passivamente le dita. Che cosa pensi?"},
{id:"s42", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"Sindrome compartimentale · che cosa fai?", celle:[
  {t:"**Avvisi subito** il medico", key:true}, {t:"Controlli il **circolo distale** e lo **documenti**"}]},
{id:"s43", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"Che cosa fai?", celle:[
  {t:"Arto **all'altezza del cuore**, non più in alto", key:true}, {t:"Ti prepari ad **allentare o aprire il gesso** secondo indicazione"}]},
{id:"s44", tipo:"trappola", tema:"chiaro", sopratitolo:"Un dolore che non risponde è un'informazione, non un fastidio da coprire", righe:[
  {sb:"Aspettare che il polso scompaia; aumentare l'analgesico", ok:"**Né l'uno né l'altro**"}]},

{id:"s45", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"In Veneto, come nel resto d'Italia", celle:[
  {n:"1", t:"Fratture di femore operate entro **48 ore**: indicatore del **Programma Nazionale Esiti**", key:true}]},
{id:"s46", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"In Veneto", celle:[
  {n:"2", t:"Percorsi **ortogeriatrici** per migliorarlo", key:true}, {n:"3", t:"Unità di **day surgery** diffuse, con protocolli aziendali"}]},

{id:"s47", tipo:"tabella", tema:"chiaro", sopratitolo:"La tabella", intestazioni:["Dove","Che cosa ricordare"], colonne:[1,3], righe:[
  ["**Anca**","no flessione > 90°, no adduzione, no intrarotazione · lussazione: arto accorciato e ruotato"],
  ["**Femore**","entro 48 ore"],
  ["**Gesso**","controllo neurovascolare, palmo, niente oggetti"]]},
{id:"s48", tipo:"tabella", tema:"chiaro", sopratitolo:"La tabella", intestazioni:["Dove","Che cosa ricordare"], colonne:[1,3], righe:[
  ["**Compartimentale**","dolore sproporzionato allo stiramento passivo · polso assente è tardivo"],
  ["**Trazioni**","pesi liberi"],
  ["**Carotide**","neurologico e collo"],
  ["**Prostata**","iponatriemia"],
  ["**Tiroide**","ematoma, calcio, voce"]]},
{id:"s49", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Nella prossima lezione · la dimissione", celle:[
  {n:"1", t:"Come si **pianifica**"}, {n:"2", t:"Che cosa si **insegna**", key:true}, {n:"3", t:"La **continuità** con il territorio"}]},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"9.7<br>Dimissione ed<br>educazione terapeutica", sottotitolo:"Chiudere il percorso",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
