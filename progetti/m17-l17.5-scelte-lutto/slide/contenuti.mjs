// Contenuto delle 49 scene della lezione 17.5, l'ultima del modulo 17.
// *accento*  **accento in semibold**
//
// Registro del modulo: sobrio, concreto, mai pietistico. Sulle scene di
// sedazione palliativa, eutanasia e suicidio assistito il documento chiede
// lettura «neutra e precisa, nessuna enfasi, nessuna opinione»: le slide
// dicono che cosa prevede la legge e basta. Nessun velo rosa li', perche' non
// sono errori dell'operatore: sono definizioni.
//
// Il velo rosa (`tenue`) sta solo dove c'e' qualcosa da non fare o un errore
// da correggere: le tre reazioni sbagliate a una richiesta di morire e i
// distrattori del quiz (`trappola`, lo sbagliato sbarrato e il giusto sotto).
// DAT e pianificazione condivisa sono due cose da distinguere: `confronto`.
//
// Nessuna cifra o dato che non stia nel copione di partenza.

const L219 = [
 {t:"Nutrizione e idratazione artificiali sono **trattamenti sanitari**", d:"possono essere rifiutate"},
 {t:"Il medico non è tenuto a trattamenti **contrari** a legge, deontologia, buone pratiche"},
];

const DECISIONI = [
 {t:"Non ricoverare in ospedale"}, {t:"Non rianimare"}, {t:"Non trasferire in terapia intensiva"},
 {t:"Sospendere nutrizione o idratazione artificiali"}, {t:"Sospendere terapie non più utili"},
 {t:"Non eseguire esami che non cambierebbero nulla"},
];

const OSS_DECISIONI = [
 {t:"Le **conosce**", d:"sono documentate e condivise con l'équipe"},
 {t:"Le **rispetta**"},
 {t:"Non le **discute** con i familiari", d:"li rinvia al medico"},
];

const SEDAZIONE_REQ = [
 {t:"Sintomo refrattario"}, {t:"Consenso"}, {t:"Proporzionalità"}, {t:"Documentazione"},
];

const CONDIZIONI = [
 {t:"Patologia **irreversibile**"},
 {t:"Sofferenze **intollerabili**"},
 {t:"Dipendenza da **sostegni vitali**"},
 {t:"**Capacità** di decidere"},
 {t:"**Verifica** del servizio sanitario"},
];

const RICHIESTA = [
 {t:"Si **resta**, si **ascolta**"},
 {t:"Si chiede che cosa rende **insopportabile** il presente"},
 {t:"Si **riferisce subito** all'équipe", d:"un dolore da trattare · un'angoscia da accogliere · un problema da risolvere"},
];

// Elenco `vietato`: la × rossa porta gia' la polarita', il testo resta piano.
const RICHIESTA_NO = [
 {t:"Non si giudica"}, {t:"Non si rimprovera"}, {t:"Non si cambia discorso"},
];

const FASI_LUTTO = [
 {t:"Shock"}, {t:"Ricerca"}, {t:"Disorganizzazione"}, {t:"Riorganizzazione"},
];

const AIUTA = [
 {t:"Nominare le morti **che pesano**"},
 {t:"**Riti di chiusura**, anche minimi"},
 {t:"Parlarne **in équipe**"},
 {t:"**Debriefing** e supervisione", d:"dove esistono"},
];

const SEGNI = [
 {t:"Irritabilità crescente"}, {t:"Difficoltà a dormire"}, {t:"Evitare i pazienti più gravi"},
 {t:"Sentirsi indifferenti"}, {t:"Cinismo verso le famiglie"}, {t:"Errori di distrazione"},
 {t:"Non riuscire a staccare"}, {t:"Cefalea · disturbi gastrici"}, {t:"Stanchezza persistente"},
];

const QUADRO = [
 {t:"Le cure palliative **sono cura**", d:"quattro dimensioni · L. 38/2010 · la rete"},
 {t:"Il **dolore totale**", d:"dispnea · cavo orale · il cibo si offre, non si forza"},
 {t:"Sapere **e non sapere**", d:"«sto morendo?» · Kübler-Ross · la famiglia"},
 {t:"Gli **ultimi giorni**", d:"il respiro · la constatazione del medico · salma e riti"},
 {t:"La **legge 219**", d:"sedazione palliativa ≠ eutanasia · il lutto"},
];

// Cinque righe di trappola non stanno nella cornice: due slide, una per blocco
// di voce, con le righe che quel blocco dice.
const DISTRATTORI_1 = [
 {sb:"Solo gli ultimi giorni", ok:"Possono essere **precoci**"},
 {sb:"L. 38 = consenso e DAT", ok:"L. 38: cure palliative e dolore · **L. 219**: consenso, DAT, pianificazione"},
];
const DISTRATTORI_2 = [
 {sb:"DAT durante la malattia", ok:"DAT **prima** · pianificazione condivisa **durante**"},
 {sb:"Sedazione palliativa = eutanasia", ok:"**Non** è eutanasia, e nemmeno il rifiuto delle cure"},
 {sb:"Il rantolo è sofferenza", ok:"Il rantolo **non indica** sofferenza"},
];

const QUIZ = [
 "Le dimensioni del dolore totale → **fisica, psicologica, sociale, spirituale**",
 "L. 38/2010 → il **diritto** alle cure palliative e alla terapia del dolore · due reti · il dolore in cartella",
 "La sedazione palliativa → riduce la coscienza per un **sintomo refrattario** · non abbrevia la vita",
 "La constatazione del decesso → **il medico**",
 "«Sto morendo?» → non mentire, non diagnosticare · **restare, restituire, riferire**",
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 17 · Cure palliative, fine vita e accompagnamento",
  titolo:"Le scelte di fine vita<br>**e il lutto**", sottotitolo:"Lezione 17.5",
  ente:"CISL FP Padova Rovigo · Concorso OSS Azienda Zero"},

{id:"s02", tipo:"frase", tema:"chiaro", sopratitolo:"Modulo 17 · lezione 5 di 5",
  testo:"Le scelte di fine vita: che cosa la legge **consente**, e che cosa no."},
{id:"s03", tipo:"frase", tema:"chiaro", sopratitolo:"Poi",
  testo:"Il **lutto**, dei familiari e dell'operatore. E la chiusura del modulo."},
{id:"s04", tipo:"titolo", tema:"profondo",
  titolo:"Il criterio è **la precisione**.",
  sotto:"In quest'area le parole hanno conseguenze legali."},

{id:"s05", tipo:"norma", tema:"chiaro", etichetta:"Legge", sigla:"219/2017",
  testo:"**Nessun trattamento** senza consenso, revocabile in qualunque momento."},
{id:"s06", tipo:"elenco", tema:"chiaro",
  sopratitolo:"Legge 219/2017", voci:L219},
{id:"s07", tipo:"titolo", tema:"profondo",
  titolo:"Divieto di **ostinazione irragionevole**.",
  sotto:"Astenersi da trattamenti inutili o sproporzionati."},

{id:"s08", tipo:"frase", tema:"chiaro", sopratitolo:"Le DAT",
  testo:"In **previsione** di una futura incapacità, da persona capace, con un possibile fiduciario. Revocabili."},
{id:"s09", tipo:"confronto", tema:"chiaro", sopratitolo:"Due cose da distinguere",
  col:[{h:"DAT", t:"**prima**: in previsione di una futura incapacità"},
       {h:"Pianificazione condivisa", t:"**durante**: malattia già in corso, persona e medico"}]},
{id:"s10", tipo:"frase", tema:"chiaro", sopratitolo:"Nelle cure palliative, lo strumento principale",
  testo:"Che cosa la persona vuole, **prima che non possa più dirlo**. L'OSS riferisce i desideri che emergono."},

{id:"s11", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, attive:[0,1,2],
  sopratitolo:"Decisioni frequenti · medico e persona", celle:DECISIONI},
{id:"s12", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false,
  sopratitolo:"Decisioni frequenti · medico e persona", celle:DECISIONI},
{id:"s13", tipo:"titolo", tema:"profondo",
  titolo:"Non sono abbandono: **sono proporzionalità**.",
  sotto:"Adeguare i trattamenti alla condizione reale."},
{id:"s14", tipo:"elenco", tema:"chiaro",
  sopratitolo:"L'OSS e le decisioni", voci:OSS_DECISIONI},

{id:"s15", tipo:"frase", tema:"chiaro", sopratitolo:"La sedazione palliativa",
  testo:"Riduzione **intenzionale** della coscienza, fino alla sedazione profonda e continua, per un **sintomo refrattario**."},
{id:"s16", tipo:"griglia", tema:"chiaro", colonne:4,
  sopratitolo:"Nelle ultime fasi · che cosa richiede", celle:SEDAZIONE_REQ},
{id:"s17", tipo:"titolo", tema:"profondo",
  titolo:"**Non abbrevia la vita.**",
  sotto:"È un trattamento previsto dalla legge 219. E non è eutanasia: cambiano intenzione, mezzo, esito."},

{id:"s18", tipo:"frase", tema:"chiaro", sopratitolo:"Che cosa dice la legge · l'eutanasia",
  testo:"L'atto che provoca intenzionalmente la morte su richiesta. In Italia è **vietata**."},
{id:"s19", tipo:"frase", tema:"chiaro", sopratitolo:"Il suicidio assistito",
  testo:"La persona compie l'atto con un aiuto. **Non punibile** per la Corte costituzionale, dal 2019, solo a condizioni precise."},
{id:"s20", tipo:"elenco", tema:"chiaro", numerato:true,
  sopratitolo:"Le condizioni · non riguarda l'OSS in alcun modo", voci:CONDIZIONI},
{id:"s21", tipo:"titolo", tema:"profondo",
  titolo:"Rifiuto delle cure e sedazione palliativa **non sono eutanasia**.",
  sotto:"Va ripetuto."},

{id:"s22", tipo:"frase", tema:"chiaro", sopratitolo:"Una richiesta di morire",
  testo:"«Vorrei morire.» «Mi aiuti a finirla.» **Non da esaudire**, e non da ignorare."},
{id:"s23", tipo:"titolo", tema:"profondo",
  titolo:"Quasi sempre è **un dolore totale** non controllato.",
  sotto:"Fisico, psicologico, sociale o spirituale."},
{id:"s24", tipo:"elenco", tema:"chiaro",
  sopratitolo:"Una richiesta di morire · che cosa fare", voci:RICHIESTA},
{id:"s25", tipo:"elenco", tema:"tenue", vietato:true,
  sopratitolo:"Una richiesta di morire · che cosa non fare", voci:RICHIESTA_NO},

{id:"s26", tipo:"griglia", tema:"chiaro", colonne:4, spunta:false,
  sopratitolo:"Il lutto dei familiari · fasi non lineari", celle:FASI_LUTTO},
{id:"s27", tipo:"frase", tema:"chiaro", sopratitolo:"Il lutto dei familiari",
  testo:"Le cure palliative sostengono la famiglia **anche dopo la morte**. Se il processo si blocca: lutto complicato, aiuto specialistico."},
{id:"s28", tipo:"titolo", tema:"profondo",
  titolo:"I familiari ricordano per sempre **come è stata trattata** la persona.",
  sotto:"È lì che si costruisce il loro lutto."},

{id:"s29", tipo:"frase", tema:"chiaro", sopratitolo:"Il lutto dell'operatore",
  testo:"Un lutto **non riconosciuto**: nessuno lo nomina, nessun rito, si passa alla persona successiva."},
{id:"s30", tipo:"frase", tema:"chiaro", sopratitolo:"L'accumulo",
  testo:"Esaurimento emotivo, distacco, cinismo: **il burnout**. In quest'area il rischio è elevato."},
{id:"s31", tipo:"elenco", tema:"chiaro",
  sopratitolo:"Che cosa aiuta", voci:AIUTA},
{id:"s32", tipo:"titolo", tema:"profondo",
  titolo:"Chiedere sostegno **è competenza professionale**.",
  sotto:"Non fragilità."},

{id:"s33", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, attive:[0,1,2,3,4,5],
  sopratitolo:"I segni da non ignorare in sé stessi", celle:SEGNI},
{id:"s34", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false,
  sopratitolo:"I segni da non ignorare in sé stessi", celle:SEGNI},
{id:"s35", tipo:"titolo", tema:"profondo",
  titolo:"Vanno **riconosciuti e detti**.",
  sotto:"Al coordinatore, al medico competente, a un collega di fiducia."},

{id:"s36", tipo:"elenco", tema:"chiaro", attive:[0],
  marcatori:["17.1","17.2","17.3","17.4","17.5"],
  sopratitolo:"Il quadro del Modulo 17", voci:QUADRO},
{id:"s37", tipo:"elenco", tema:"chiaro", attive:[0,1,2],
  marcatori:["17.1","17.2","17.3","17.4","17.5"],
  sopratitolo:"Il quadro del Modulo 17", voci:QUADRO},
{id:"s38", tipo:"elenco", tema:"chiaro",
  marcatori:["17.1","17.2","17.3","17.4","17.5"],
  sopratitolo:"Il quadro del Modulo 17", voci:QUADRO},

{id:"s39", tipo:"trappola", tema:"tenue",
  sopratitolo:"I distrattori tipici", righe:DISTRATTORI_1},
{id:"s40", tipo:"trappola", tema:"tenue",
  sopratitolo:"I distrattori tipici", righe:DISTRATTORI_2},
{id:"s41", tipo:"titolo", tema:"profondo",
  titolo:"Ogni opzione con **una bugia rassicurante** è errata.",
  sotto:"La constatazione compete al medico. L'OSS non comunica diagnosi, ma non mente."},

{id:"s42", tipo:"memo", tema:"chiaro", attive:[0],
  sopratitolo:"Autovalutazione", voci:QUIZ},
{id:"s43", tipo:"memo", tema:"chiaro", attive:[0,1],
  sopratitolo:"Autovalutazione", voci:QUIZ},
{id:"s44", tipo:"memo", tema:"chiaro", attive:[0,1,2,3],
  sopratitolo:"Autovalutazione", voci:QUIZ},
{id:"s45", tipo:"memo", tema:"chiaro",
  sopratitolo:"Autovalutazione", voci:QUIZ},

{id:"s46", tipo:"titolo", tema:"profondo",
  titolo:"C'è molto da fare, e **cambia che cosa si fa**.",
  sotto:"Il filo del Modulo 17."},
{id:"s47", tipo:"frase", tema:"chiaro", sopratitolo:"Comfort · presenza · verità senza crudeltà · riti · chi resta",
  testo:"Il tempo accanto alla persona è **assistenza a pieno titolo**, non tempo sottratto ad altro."},
{id:"s48", tipo:"frase", tema:"chiaro", sopratitolo:"Modulo 17 completato",
  testo:"Prossimo modulo bonus: **ausili, presidi e tecnologie assistive**."},

{id:"s49", tipo:"copertina", tema:"profondo",
  modulo:"Prossimo modulo bonus",
  titolo:"18", sottotitolo:"**Ausili**, presidi e tecnologie assistive",
  ente:"CISL FP Padova Rovigo · Concorso OSS Azienda Zero"},
];
