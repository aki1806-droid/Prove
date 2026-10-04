// Contenuto delle 50 scene della lezione 11.2 — demenze e disturbi
// cognitivi. Le quattro forme sono una griglia che si accende; gli stadi
// una scala; le cause del comportamento una griglia ampia; il metodo ABC un
// percorso; la comunicazione trappole («non contraddire»).

const FORME = (k) => [
  {n:"1", t:"**Alzheimer**: memoria recente", key:k===0}, {n:"2", t:"**Vascolare**: a gradini", key:k===1},
  {n:"3", t:"**Corpi di Lewy**: allucinazioni visive", key:k===2}, {n:"4", t:"**Frontotemporale**: comportamento", key:k===3}];

const STADI = (k) => [
  {n:"1", t:"Lieve", d:"memoria, attività strumentali", key:k===0}, {n:"2", t:"Moderato", d:"disorientamento, BPSD", key:k===1},
  {n:"3", t:"Grave", d:"dipendenza, disfagia", key:k===2}];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 11 · Setting assistenziali e ciclo di vita",
  titolo:"Demenze e<br>disturbi cognitivi", sottotitolo:"11.2 · Le forme, i disturbi del comportamento, l'approccio non farmacologico, il caregiver",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"frase", tema:"chiaro", sopratitolo:"Micro-lezione 2 di 8 · una delle sfide più grandi dell'assistenza di oggi",
  testo:"Non esiste ancora una cura che la **arresti**."},
{id:"s03", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"Ma c'è molto da fare · la demenza dura anni, e cambia la vita della famiglia", celle:[
  {t:"La **qualità della vita**", key:true}, {t:"La **sicurezza**"}, {t:"La **famiglia**"}]},
{id:"s04", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Gli strumenti più efficaci non sono farmaci · sono competenze infermieristiche", celle:[
  {n:"1", t:"**Comunicazione**"}, {n:"2", t:"**Ambiente**"}, {n:"3", t:"**Relazione**", key:true}]},

{id:"s05", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Le forme · la più frequente, esordio graduale", celle:FORME(0)},
{id:"s06", tipo:"confronto", tema:"chiaro", sopratitolo:"Alzheimer: per prima, la memoria recente", col:[
  {h:"Ricorda", t:"la **guerra**"}, {h:"Non ricorda", t:"che cosa ha mangiato **a pranzo**", key:true}]},
{id:"s07", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Lewy: fluttuazioni, parkinsonismo · ipersensibilità grave agli antipsicotici", celle:FORME(2)},
{id:"s08", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Frontotemporale: esordio più precoce · scambiata per un problema psichiatrico", celle:FORME(3)},

{id:"s09", tipo:"scala", tema:"chiaro", sopratitolo:"Gli stadi · nel lieve le attività di base sono conservate", gradini:STADI(0)},
{id:"s10", tipo:"scala", tema:"chiaro", sopratitolo:"Grave: perdita del linguaggio, immobilità", gradini:STADI(2)},
{id:"s11", tipo:"cifre", tema:"chiaro", sopratitolo:"Mini Mental State Examination · secondo età e scolarità · una misura, non una diagnosi", voci:[
  {n:"0-30", suf:"", d:"punteggio", key:true}]},

{id:"s12", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"I disturbi del comportamento · BPSD", celle:[
  {n:"·", t:"**Agitazione**, aggressività"}, {n:"·", t:"**Wandering**: camminare, vagare", key:true}, {n:"·", t:"Apatia"},
  {n:"·", t:"Deliri, allucinazioni"}, {n:"·", t:"Disturbi del sonno"}]},
{id:"s13", tipo:"frase", tema:"chiaro", sopratitolo:"Va previsto: la sera più presenza, più luce, meno stimoli",
  testo:"Il **sundowning**: il peggioramento nel tardo pomeriggio e alla sera."},
{id:"s14", tipo:"confronto", tema:"chiaro", sopratitolo:"E con loro arrivano spesso sedativi e contenzione, che si possono evitare", col:[
  {h:"Per chi assiste", t:"la principale causa di **stress**"}, {h:"Per la persona", t:"la principale causa di **ricovero in struttura**", key:true}]},

{id:"s15", tipo:"frase", tema:"chiaro", sopratitolo:"Il principio più importante della lezione",
  testo:"Quando le parole se ne vanno, resta il **comportamento**."},
{id:"s16", tipo:"titolo", tema:"profondo",
  titolo:"Il comportamento<br>**ha un significato**.",
  sotto:""},
{id:"s17", tipo:"griglia", tema:"chiaro", colonne:4, spunta:false, sopratitolo:"Prima di qualunque farmaco, la causa · il dolore con la PAINAD, lezione 2.3", celle:[
  {n:"·", t:"**Dolore**", key:true}, {n:"·", t:"Fame, sete"}, {n:"·", t:"Urinare, **stipsi**"}, {n:"·", t:"Caldo, freddo"},
  {n:"·", t:"Rumore"}, {n:"·", t:"Paura, noia"}, {n:"·", t:"Un farmaco"}, {n:"·", t:"Infezione, delirium"}]},
{id:"s18", tipo:"percorso", tema:"chiaro", sopratitolo:"Il metodo ABC", tappe:[
  {t:"Antecedente", d:"che cosa è successo prima"}, {t:"Comportamento", d:"che cosa fa"}, {t:"Conseguenza", d:"che cosa ne è seguito"}], attive:[0,1,2]},

{id:"s19", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"Gli approcci non farmacologici · la prima scelta", celle:[
  {t:"**Routine** stabili: il cambiamento disorienta, le abitudini orientano", key:true}]},
{id:"s20", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Gli approcci non farmacologici", celle:[
  {t:"**Attività** significative, legate alla storia"}, {t:"**Musica**, attività sensoriali"}, {t:"**Validazione**: l'emozione, non i fatti", key:true}, {t:"**Distrazione**"}]},
{id:"s21", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"I familiari conoscono la persona meglio di chiunque", celle:[
  {t:"Luce **naturale** di giorno, luci **calde** la sera", key:true}, {t:"I **familiari** coinvolti"}]},

{id:"s22", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"La comunicazione · di fronte, lentamente, mai alle spalle", celle:[
  {t:"Contatto **visivo**, tono calmo"}, {t:"**Frasi brevi**, domande chiuse"}, {t:"**Una richiesta alla volta**", key:true}]},
{id:"s23", tipo:"trappola", tema:"chiaro", sopratitolo:"Tre cose da non fare · generano solo frustrazione", righe:[
  {sb:"Contraddire, discutere", ok:"Accompagnare"}, {sb:"«Si ricorda chi sono?»", ok:"Non mettere alla prova la **memoria**"}]},
{id:"s24", tipo:"frase", tema:"chiaro", sopratitolo:"Se è spaventata, conta che si senta al sicuro, non che abbia ragione sui fatti",
  testo:"Si risponde all'**emozione**, non al contenuto."},
{id:"s25", tipo:"trappola", tema:"chiaro", sopratitolo:"Chiede della madre, morta da trent'anni", righe:[
  {sb:"«È morta»: rivive il lutto ogni volta", ok:"Chiederle di **parlarne**, accogliere il bisogno di **sicurezza**"}]},

{id:"s26", tipo:"frase", tema:"chiaro", sopratitolo:"Come una protesi compensa un arto · immagini, orologi e calendari ben visibili",
  testo:"L'**ambiente protesico** compensa i deficit."},
{id:"s27", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"L'ambiente protesico", celle:[
  {t:"**Colori contrastanti**: la tavoletta colorata sul bianco", key:true}, {t:"Luce **uniforme**, senza zone d'ombra"}]},
{id:"s28", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"Nelle strutture, i nuclei Alzheimer seguono questi criteri", celle:[
  {t:"**Percorsi sicuri** per camminare", key:true}, {t:"Pochi **rumori**"}, {t:"**Oggetti personali**"}]},

{id:"s29", tipo:"frase", tema:"chiaro", sopratitolo:"Farmaci per i sintomi cognitivi: in alcune forme e stadi, su indicazione specialistica",
  testo:"Il punto da sapere riguarda gli **antipsicotici**."},
{id:"s30", tipo:"catena", tema:"chiaro", sopratitolo:"Segnalato dalle autorità regolatorie", passi:[
  {t:"Antipsicotico per agitazione"}, {t:"Anziano con demenza"}, {t:"↑ **mortalità** e **ictus**", key:true}]},
{id:"s31", tipo:"griglia", tema:"chiaro", colonne:4, spunta:true, sopratitolo:"Lewy: estrema cautela · le benzodiazepine aumentano cadute e confusione", celle:[
  {t:"Solo se **necessario**"}, {t:"**Dose minima**", key:true}, {t:"**Tempo** più breve"}, {t:"**Rivalutare**"}]},

{id:"s32", tipo:"norma", tema:"chiaro", etichetta:"Il caregiver · il carico si misura", sigla:"Scala di Zarit",
  testo:"Spesso è **l'unica risorsa** della persona, e fragile a sua volta."},
{id:"s33", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Il rischio: burnout, depressione, isolamento · i supporti", celle:[
  {t:"**Informazione** e formazione"}, {t:"**Gruppi di sostegno**"}, {t:"**Centri diurni**", key:true}, {t:"**Associazioni**"}]},
{id:"s34", tipo:"frase", tema:"chiaro", sopratitolo:"I ricoveri di sollievo: brevi periodi in struttura, perché il familiare riposi",
  testo:"Anche il caregiver è **una persona da assistere**."},

{id:"s35", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"La sicurezza · il camminare non va impedito: va reso sicuro", celle:[
  {t:"Braccialetti **identificativi**"}, {t:"Controllo degli **accessi**"}, {t:"Una **foto** aggiornata", key:true}]},
{id:"s36", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Disfagia e malnutrizione nelle fasi avanzate · lezione 3.3", celle:[
  {n:"!", t:"**Cadute**"}, {n:"!", t:"Farmaci a portata di mano"}, {n:"!", t:"Fornelli, **guida** dell'auto", key:true}]},
{id:"s37", tipo:"trappola", tema:"chiaro", sopratitolo:"Lezione 3.1 · la sicurezza si costruisce con l'ambiente e la presenza", righe:[
  {sb:"La contenzione come soluzione", ok:"Aumenta **agitazione**, cadute e lesioni"}]},

{id:"s38", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Il caso · demenza moderata · un collega propone un sedativo", celle:[
  {n:"!", t:"Da stasera **molto agitata**"}, {n:"!", t:"Grida, cerca di alzarsi"}, {n:"4", t:"giorni **senza evacuare**", key:true}]},
{id:"s39", tipo:"griglia", tema:"chiaro", colonne:4, spunta:true, sopratitolo:"Che cosa fai? La causa prima del farmaco", celle:[
  {t:"**Dolore**: PAINAD"}, {t:"**Stipsi**: un indizio forte", key:true}, {t:"**Ritenzione**"}, {t:"Infezione, delirium"}]},
{id:"s40", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"E segnali al medico i possibili fattori", celle:[
  {t:"Meno **stimoli**"}, {t:"Tono **calmo**"}, {t:"Un **familiare**, se possibile", key:true}]},
{id:"s41", tipo:"trappola", tema:"chiaro", sopratitolo:"Sedare senza cercare lascia il problema dov'è, e aggiunge le cadute", righe:[
  {sb:"Il sedativo al posto della causa", ok:"Il sedativo, se arriva, arriva **dopo**"}]},

{id:"s42", tipo:"norma", tema:"chiaro", etichetta:"In Veneto · Centri per i Disturbi Cognitivi e Demenze", sigla:"CDCD",
  testo:"Diagnosi, presa in carico, **terapia**."},
{id:"s43", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Attivabili con l'UVMD · all'orale, CDCD e sollievo mostrano di conoscere la rete", celle:[
  {t:"**Centri diurni**"}, {t:"**Nuclei Alzheimer** nei Centri di Servizi"}, {t:"**Ricoveri di sollievo**", key:true}, {t:"Associazioni dei familiari"}]},

{id:"s44", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"La tabella", celle:FORME(-1).concat([])},
{id:"s45", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"La tabella", celle:[
  {n:"!", t:"Il comportamento **comunica un bisogno**", key:true}, {n:"1", t:"**Non farmacologico** come prima scelta"}, {n:"·", t:"Non contraddire: rispondere all'**emozione**"}, {n:"!", t:"Antipsicotici: **mortalità** e **ictus**"}]},
{id:"s46", tipo:"titolo", tema:"profondo",
  titolo:"Si perde la memoria,<br>**non la dignità né le emozioni**.",
  sotto:""},
{id:"s47", tipo:"frase", tema:"chiaro", sopratitolo:"Le emozioni sono la parte che resta, ed è lì che lavora l'assistenza",
  testo:"Non ricorderà chi le ha fatto la medicazione. Ricorderà **come si è sentita**."},
{id:"s48", tipo:"frase", tema:"chiaro", sopratitolo:"Nella prossima lezione · che cosa si può fare senza consenso, e con quali garanzie",
  testo:"La **salute mentale** e il trattamento sanitario obbligatorio."},
{id:"s49", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Le domande che all'orale tornano più spesso", celle:[
  {n:"1", t:"L'**agitazione**"}, {n:"2", t:"Il rischio **suicidario**", key:true}, {n:"3", t:"Le **dipendenze**"}]},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"11.3<br>Salute mentale<br>e dipendenze", sottotitolo:"Il TSO, l'agitazione, il rischio suicidario",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
