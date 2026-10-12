// Contenuto delle 50 scene della lezione 17.3 — il lattante disidratato. I
// numeri del caso diventano calcoli scritti a schermo (il calo di peso, il bolo
// di 10 ml/kg, il paracetamolo per chilo, il pannolino pesato); disidratazione
// e shock iniziale una tabella a due colonne; l'accesso un bivio; i segni per
// la D1 una griglia che si completa; errori in tabella; la risposta modello un
// promemoria riga per riga.

const LEZIONI = [
  {n:"4.3", t:"Precauzioni da contatto", illu:"guanto"},
  {n:"5.3", t:"Calcoli e dosi", illu:"calcolatrice"},
  {n:"10.4", t:"Gravità nel bambino", illu:"stetoscopio"},
  {n:"11.4", t:"Pediatria e dolore", illu:"mani"},
  {n:"14.1", t:"Compartimenti idrici", illu:"goccia"}];

const PANNOLINO = (nota) => ({tipo:"calcolo", tema:"chiaro", righe:[
  {tok:["bagnato", "−", "asciutto", "=", "urina"], nota}]});

const SEGNI = (att, k) => ({tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, attive:att, celle:[
  {n:"1", t:"**Calo** di peso"}, {n:"2", t:"Fontanella **depressa**"},
  {n:"3", t:"Occhi **infossati**"}, {n:"4", t:"Mucose **secche**"},
  {n:"5", t:"Pianto **senza lacrime**"}, {n:"6", t:"**Oliguria**"},
  {n:"7", t:"Grave: **tachicardia**", key:k===6}, {n:"8", t:"Grave: riempimento capillare **lento**", key:k===6},
  {n:"9", t:"Grave: estremità **fredde**", key:k===6}, {n:"10", t:"Grave: **coscienza** alterata", key:k===6}]});

const RISPOSTA = (att) => ({tipo:"memo", tema:"chiaro", attive:att, voci:[
  "**Inquadramento**: 9 mesi, calo del 9%, tachicardia, riempimento lento, estremità fredde, sonnolenza",
  "→ disidratazione **moderata-grave** con **shock iniziale**",
  "Alta priorità, **pediatra** subito · ABCDE, **glicemia**, peso · accesso, intraosseo se serve",
  "Bolo prescritto di **10 ml/kg** con rivalutazione · infusione con **pompa**",
  "Dosi per chilo con **doppio controllo** · siringhe orali · diuresi dai pannolini",
  "Reidratazione **orale** a piccole quantità · allattamento · precauzioni da contatto",
  "Genitori **coinvolti** ed educati ai segni di disidratazione"]});

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 17 · Casi clinici avanzati",
  titolo:"Il lattante disidratato", sottotitolo:"17.3 · Segni di gravità, liquidi e dosi per chilo",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"tre", tema:"chiaro", sopratitolo:"Micro-lezione 3 di 12 · il bambino non è un adulto piccolo", box:[
  {n:"1", t:"I segni di gravità", d:"sono diversi"},
  {n:"2", t:"La riserva di liquidi", d:"è minore"},
  {n:"3", t:"Le dosi per chilo", d:"un rischio di errore più alto", key:true}]},
{id:"s03", tipo:"anello", tema:"chiaro", sopratitolo:"Un lattante disidratato per una gastroenterite, e i suoi genitori · i collegamenti",
  centro:"17.3", sotto:"il bambino non è un adulto piccolo", voci:LEZIONI},

{id:"s04", tipo:"cifre", tema:"chiaro", sopratitolo:"Lo scenario · Leo · da due giorni vomito, diarrea acquosa e febbre", voci:[
  {n:"9", suf:"mesi", t:"Leo"},
  {n:"8–10", t:"scariche al giorno", d:"diarrea acquosa"},
  {n:"8", suf:"kg", t:"oggi", d:"prima della malattia 8,8 kg", key:true}]},
{id:"s05", tipo:"griglia", tema:"chiaro", colonne:2, sopratitolo:"E poi", celle:[
  {t:"Ultimo pannolino bagnato **10 ore** fa", key:true}, {t:"Prima irritabile, ora **sonnolento**"},
  {t:"Fontanella anteriore **depressa**"}, {t:"Occhi **infossati**"},
  {t:"Mucose **secche**"}, {t:"Piange **senza lacrime**"}]},
{id:"s06", tipo:"pausa", tema:"chiaro", sopratitolo:"I genitori sono molto spaventati", es:"metti in pausa",
  testo:"Quanto è grave la **disidratazione**, e che cosa ti preoccupa **di più**?",
  dati:["FC 175", "riempimento capillare 3 s", "mani e piedi freddi", "cute marezzata"]},

{id:"s07", tipo:"calcolo", tema:"chiaro", sopratitolo:"Il ragionamento · il calo di peso", righe:[
  {tok:["8,8 kg", "−", "8 kg", "=", "0,8 kg"]},
  {tok:["0,8 kg", "÷", "8,8 kg", "→", "circa 9%"]}],
  nota:"Disidratazione **moderata-grave** · il peso prima della malattia è il dato più preciso."},
{id:"s08", tipo:"tabella", tema:"chiaro", sopratitolo:"I segni concordano", colonne:["50%","50%"],
  intestazioni:["Disidratazione", "Shock iniziale"], righe:[
  ["Fontanella **depressa**", "**Tachicardia** marcata"],
  ["Occhi infossati, mucose **secche**", "Riempimento capillare **lento**"],
  ["Pianto **senza lacrime**", "Estremità **fredde**"],
  ["**Oliguria**", "**Marezzatura**"]], chiave:[]},
{id:"s09", tipo:"frase", tema:"chiaro", sopratitolo:"E soprattutto la sonnolenza, un segno di gravità in un lattante · lezione 10.4",
  testo:"Nel bambino l'**ipotensione** è un segno tardivo.",
  sotto:"Non va aspettata."},

{id:"s10", tipo:"icone", tema:"chiaro", sopratitolo:"Le prime azioni", voci:[
  {icona:"semaforo", t:"Alta priorità", d:"e il pediatra, subito", key:true},
  {icona:"stetoscopio", t:"ABCDE pediatrico"},
  {icona:"goccia", t:"Glicemia capillare", d:"non mangia da due giorni"}]},
{id:"s11", tipo:"figura", tema:"chiaro", illu:"bilancia", sopratitolo:"Il peso",
  titolo:"Il **peso** preciso: la base di tutte le dosi.", sotto:"Poi l'accesso venoso, spesso difficile in un lattante disidratato."},
{id:"s12", tipo:"bivio", tema:"chiaro", sopratitolo:"Prelievi: elettroliti, funzione renale, emogas · monitoraggio · i genitori accanto al bambino",
  radice:"L'accesso", rami:[
  {q:"la vena si trova", t:"Accesso venoso"},
  {q:"in shock, la vena non si trova in fretta", t:"Accesso intraosseo", d:"come nella lezione 5.2", key:true}]},

{id:"s13", tipo:"calcolo", tema:"chiaro", sopratitolo:"La reidratazione EV, secondo prescrizione · nello shock, un bolo di cristalloide isotonico", righe:[
  {tok:["10 ml/kg", "×", "8 kg", "=", "80 ml"], nota:"Per esempio · infusi **rapidamente**."}]},
{id:"s14", tipo:"catena", tema:"chiaro", sopratitolo:"Dopo ogni bolo", passi:[
  {t:"Il **bolo**"},
  {t:"La **rivalutazione**", d:"frequenza, riempimento capillare, coscienza, diuresi", key:true},
  {t:"**Deficit** e **mantenimento**", d:"la reidratazione prosegue"}]},
{id:"s15", tipo:"trappola", tema:"chiaro", sopratitolo:"Un'attenzione di sicurezza · pochi minuti di errore possono dare un sovraccarico pericoloso", righe:[
  {sb:"Un flacone a caduta libera", ok:"Una **pompa**, o un deflussore pediatrico con **buretta**"}]},

{id:"s16", tipo:"calcolo", tema:"chiaro", sopratitolo:"La dose per chilo · paracetamolo prescritto a 15 mg/kg per bocca · i calcoli della lezione 5.3", righe:[
  {tok:["15 mg/kg", "×", "8 kg", "=", "120 mg"]}]},
{id:"s17", tipo:"calcolo", tema:"chiaro", sopratitolo:"Lo sciroppo: 120 mg in 5 ml", righe:[
  {tok:["120 mg", "÷", "120 mg in 5 ml", "=", "5 ml"],
   nota:"Poi la **dose massima** giornaliera, e la **siringa per uso orale**: mai per iniezione."}]},
{id:"s18", tipo:"griglia", tema:"chiaro", colonne:2, sopratitolo:"Gli errori tipici della pediatria · il doppio controllo è una regola, non una scortesia", celle:[
  {no:true, t:"La **virgola**", key:true}, {no:true, t:"**mg** e **ml** confusi"},
  {no:true, t:"Dosi **da adulto**"}, {no:true, t:"Confezioni con **concentrazioni diverse**"}]},

{id:"s19", sopratitolo:"La diuresi nel lattante · si pesa il pannolino, bagnato e asciutto", ...PANNOLINO("**1 grammo ≈ 1 ml** · obiettivo indicativo: circa **1–2 ml/kg/ora**")},
{id:"s20", tipo:"griglia", tema:"chiaro", colonne:1, sopratitolo:"Più che nell'adulto", celle:[
  {t:"Si distinguono **urine** e **feci**"},
  {t:"Il **bilancio** di entrate e uscite, compresi vomito e diarrea", key:true},
  {t:"Il **peso** ogni giorno, stessa ora, stessa bilancia"}]},

{id:"s21", tipo:"cifre", tema:"chiaro", sopratitolo:"L'evoluzione · dopo due boli e la reidratazione EV · più reattivo", voci:[
  {n:"140", t:"frequenza", d:"era 175"},
  {n:"< 2", suf:"s", t:"riempimento capillare"},
  {n:"1°", t:"pannolino bagnato", key:true}]},
{id:"s22", tipo:"figura", tema:"chiaro", illu:"bicchiere", sopratitolo:"Gradualmente, la reidratazione per bocca",
  titolo:"La **soluzione reidratante orale**, a piccole quantità frequenti.", sotto:"Per esempio un cucchiaino (5 ml) ogni 1–2 minuti, con siringa o cucchiaino: tollerata anche da chi vomita."},
{id:"s23", tipo:"confronto", tema:"chiaro", sopratitolo:"Come reidratanti", col:[
  {h:"Si continua", t:"l'**allattamento**, o la normale alimentazione appena tollerata"},
  {h:"Si evitano", t:"succhi, bibite zuccherate, tè, brodi: **zuccheri e sali** non adatti"}]},

{id:"s24", tipo:"tre", tema:"chiaro", sopratitolo:"Le precauzioni per le infezioni · le gastroenteriti virali dei bambini", box:[
  {n:"1", t:"Rotavirus, norovirus"}, {n:"2", t:"Via oro-fecale"}, {n:"3", t:"Molto contagiose", key:true}]},
{id:"s25", tipo:"icone", tema:"chiaro", sopratitolo:"Secondo protocollo", voci:[
  {icona:"camice", t:"Precauzioni da contatto", d:"stanza dedicata, guanti, camice"},
  {icona:"rubinetto", t:"Acqua e sapone", d:"quando il protocollo lo indica", key:true},
  {icona:"dispenser", t:"Gel alcolico", d:"alcuni virus gli resistono"}]},
{id:"s26", tipo:"griglia", tema:"chiaro", colonne:1, sopratitolo:"Pannolini, superfici, famiglia", celle:[
  {t:"Gestione attenta di **pannolini** e **superfici**"},
  {t:"I genitori: **mani**, **fasciatoio**, **giocattoli**"},
  {t:"La vaccinazione contro il **rotavirus**, offerta nel primo anno di vita", key:true}]},

{id:"s27", tipo:"figura", tema:"chiaro", illu:"mani", sopratitolo:"Approfondimento · i genitori e il dolore del bambino",
  titolo:"La presenza dei genitori è un **diritto** del bambino.", sotto:"E un vero intervento terapeutico: in braccio alla madre, meno paura e meno dolore."},
{id:"s28", tipo:"tre", tema:"chiaro", sopratitolo:"Spiegare in modo semplice che cosa si farà · coinvolgere i genitori", box:[
  {n:"1", t:"Tenerlo in braccio"}, {n:"2", t:"Allattarlo", d:"durante la procedura", key:true}, {n:"3", t:"Distrarlo"}]},
{id:"s29", tipo:"icone", tema:"chiaro", sopratitolo:"Il dolore delle procedure", voci:[
  {icona:"goccia", t:"Crema anestetica locale", d:"quando il tempo lo consente", key:true},
  {icona:"campana", t:"Distrazione"},
  {icona:"mani", t:"Posizione di conforto"}]},
{id:"s30", tipo:"frase", tema:"chiaro", sopratitolo:"Il dolore con una scala adatta all'età: la FLACC della lezione 11.4",
  testo:"L'ansia dei genitori **fa parte del caso**.",
  sotto:"Non è un disturbo da gestire."},

{id:"s31", tipo:"tre", tema:"chiaro", sopratitolo:"La dimissione · i genitori riconoscono i segni di disidratazione", box:[
  {n:"1", t:"Pannolini asciutti", key:true}, {n:"2", t:"Sonnolenza"}, {n:"3", t:"Pianto senza lacrime"},
  {n:"4", t:"Bocca secca"}, {n:"5", t:"Fontanella depressa"}]},
{id:"s32", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Come dare la soluzione reidratante · continuare l'allattamento · quando tornare SUBITO", celle:[
  {n:"1", t:"Vomito **che non si ferma**"}, {n:"2", t:"**Sangue** nelle feci"},
  {n:"3", t:"**Sonnolenza**", key:true}, {n:"4", t:"**Poche** urine"},
  {n:"5", t:"Febbre **alta persistente**"}]},
{id:"s33", tipo:"figura", tema:"chiaro", illu:"dialogo", sopratitolo:"La dimissione",
  titolo:"Tutto verificato con il **teach-back**.", sotto:"Poi l'igiene delle mani in famiglia, e il riferimento al pediatra di libera scelta."},

{id:"s34", tipo:"tabella", tema:"chiaro", sopratitolo:"Gli errori da evitare · il riconoscimento e le dosi", colonne:["55%","45%"],
  intestazioni:["Errore", "Invece"], righe:[
  ["no:Aspettare l'ipotensione", "lo shock si vede **prima**"],
  ["no:Dimenticare la glicemia", "**glicemia** capillare"],
  ["no:Non pesare il bambino", "il **peso** è la base"],
  ["no:Dosi senza doppio controllo", "**doppio controllo**"]], chiave:[0]},
{id:"s35", tipo:"tabella", tema:"chiaro", sopratitolo:"Gli errori da evitare · i dispositivi e i genitori", colonne:["55%","45%"],
  intestazioni:["Errore", "Invece"], righe:[
  ["no:Siringhe per iniezione per farmaci orali", "siringhe per **uso orale**"],
  ["no:Flacone a caduta libera", "**pompa** o buretta"],
  ["no:Reidratare con succhi o bibite", "soluzione **reidratante orale**"],
  ["no:Allontanare i genitori", "**coinvolgerli**"]], chiave:[1]},

{id:"s36", sopratitolo:"D1 · «Quali sono i segni di disidratazione nel lattante?»", ...SEGNI([0,1,2,3,4,5], -1)},
{id:"s37", sopratitolo:"D1 · nei casi gravi · poi D2: «Come si calcola una dose in mg/kg?»", ...SEGNI([0,1,2,3,4,5,6,7,8,9], 6)},
{id:"s38", tipo:"catena", tema:"chiaro", sopratitolo:"D2 · «… e quali precauzioni si adottano?»", passi:[
  {t:"Dose per chilo **× peso**"}, {t:"In **volume**", d:"dalla concentrazione"},
  {t:"**Dose massima**"}, {t:"**Doppio controllo**", key:true}, {t:"Siringa **orale**"}]},
{id:"s39", sopratitolo:"D3 · «Come si misura la diuresi in un lattante?» · il peso del pannolino", ...PANNOLINO("**1 grammo ≈ 1 ml** di urina")},

{id:"s40", sopratitolo:"La risposta modello, in 15 righe", ...RISPOSTA([0])},
{id:"s41", sopratitolo:"La risposta modello · le prime azioni", ...RISPOSTA([0,1,2])},
{id:"s42", sopratitolo:"La risposta modello · i liquidi e le dosi", ...RISPOSTA([0,1,2,3,4])},
{id:"s43", sopratitolo:"La risposta modello · la bocca e i genitori", ...RISPOSTA([0,1,2,3,4,5,6])},

{id:"s44", tipo:"tre", tema:"chiaro", sopratitolo:"I collegamenti", box:[
  {n:"4.3", t:"Precauzioni da contatto"}, {n:"5.3", t:"Calcoli", key:true},
  {n:"5.2", t:"Accesso intraosseo"}, {n:"10.4", t:"Gravità nel bambino"}]},
{id:"s45", tipo:"tre", tema:"chiaro", sopratitolo:"I collegamenti", box:[
  {n:"11.4", t:"Pediatria e dolore"},
  {n:"14.1", t:"Compartimenti idrici", d:"perché il lattante si disidrata così in fretta", key:true}]},

{id:"s46", tipo:"griglia", tema:"chiaro", colonne:3, sopratitolo:"Un bambino in un pronto soccorso generale o in un'area non pediatrica · il materiale pediatrico", celle:[
  {t:"**Maschere**"}, {t:"**Bracciali** della pressione"}, {t:"**Aghi**"},
  {t:"**Pompe**"}, {t:"**Piastre** del defibrillatore", key:true}]},
{id:"s47", tipo:"icone", tema:"chiaro", sopratitolo:"E ancora", voci:[
  {icona:"documento", t:"Tabelle", d:"parametri normali e dosi per età e peso", key:true},
  {icona:"telefono", t:"Consulenza pediatrica"},
  {icona:"persone", t:"Genitori presenti", d:"in un ambiente adatto"}]},

{id:"s48", tipo:"titolo", tema:"profondo",
  titolo:"Nel bambino tutto si calcola<br>**per chilo**, e lo shock si riconosce<br>prima che la pressione cada.",
  sotto:"La frase del caso."},

{id:"s49", tipo:"tre", tema:"chiaro", sopratitolo:"Nella prossima lezione · un tema delicato", box:[
  {n:"1", t:"Un paziente ricoverato", d:"per una malattia fisica"},
  {n:"2", t:"Una notte", d:"lascia intendere di non voler più vivere", key:true},
  {n:"3", t:"Che cosa dire e fare", d:"e come proteggerlo"}]},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione · 17.4",
  titolo:"Il rischio suicidario<br>in reparto", sottotitolo:"Riconoscere, parlare, proteggere, attivare",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
