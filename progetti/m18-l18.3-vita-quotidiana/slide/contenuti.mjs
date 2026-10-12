// Contenuto delle 49 scene della lezione 18.3: la vita quotidiana, il bagno,
// il letto e l'ambiente.
// *accento*  **accento in semibold**
//
// Registro del modulo: tecnico e pratico, ogni ausilio legato al gesto che
// compensa. Le liste di piccoli ausili sono elenchi con la descrizione sotto
// (a chi servono), non griglie di nomi: il nome da solo non insegna niente.
//
// Il velo rosa (`tenue`) sta sugli errori che i quiz chiedono: beccuccio e
// cannuccia nella disfagia, il presidio piu' assorbente, le traverse multiple.
// Nessuna `sostituzione`: i maniglioni a ventosa stanno nella descrizione,
// perche' la voce li dice dentro l'elenco degli ausili del bagno.
//
// Nessuna cifra o dato che non stia nel copione di partenza.

const AREE = [
 {t:"Alimentazione"}, {t:"Vestizione"}, {t:"Igiene"},
 {t:"Bagno"}, {t:"Letto"}, {t:"Ambiente"},
];

const ALIMENTAZIONE = [
 {t:"Posate con impugnatura **ingrossata** o **angolata**", d:"presa ridotta · tremore · limitazione del polso"},
 {t:"Posate **appesantite**", d:"riducono il tremore"},
 {t:"Piatto con **bordo rialzato**, base antiscivolo", d:"si raccoglie il cibo senza spingerlo fuori"},
 {t:"Bicchiere con **incavo per il naso**", d:"si beve senza estendere il collo"},
];

const ALTRI_ALIMENTAZIONE = [
 {t:"Bicchieri con manici o beccuccio"}, {t:"Tovaglietta antiscivolo"}, {t:"Tagliere con fermo"},
];

const VESTIZIONE = [
 {t:"**Infilacalze**", d:"chi non si piega o non raggiunge i piedi: dopo una protesi d'anca, limiti del tronco"},
 {t:"Calzascarpe lungo · lacci elastici · **velcro**", d:"al posto dei bottoni"},
 {t:"Infilabottoni · **gancio vestitivo**", d:"per pantaloni e giacche"},
 {t:"**Pinza prensile** a manico lungo", d:"raccoglie da terra senza chinarsi"},
];

const ABITI = [
 {t:"Aperture anteriori"}, {t:"Elastici in vita"}, {t:"Tessuti morbidi"}, {t:"Una taglia in più"},
];

const IGIENE = [
 {t:"Spugna e spazzola a **manico lungo**", d:"schiena e piedi, senza piegarsi"},
 {t:"Pettine e spazzola con impugnatura **angolata**"},
 {t:"Spazzolino **elettrico** o con impugnatura ingrossata", d:"per chi ha presa debole"},
 {t:"Rasoio adattato · **dispenser** di sapone a pompa", d:"niente saponetta scivolosa da afferrare"},
 {t:"Specchio **inclinabile**", d:"per chi è seduto"},
];

const BAGNO = [
 {t:"**Tappetino antiscivolo**", d:"dentro e fuori la doccia o la vasca"},
 {t:"**Maniglioni** fissati a muro", d:"non a ventosa, che si staccano · accanto al WC, nella doccia, alla vasca"},
 {t:"Sedia o sgabello da doccia · **panca per vasca**", d:"si entra da seduti"},
 {t:"**Doccia a pavimento**", d:"al posto della vasca, dove possibile"},
];

const BAGNO_AMBIENTE = [
 {t:"Luce adeguata"}, {t:"Niente tappeti scivolosi"}, {t:"Niente ostacoli"},
];

const WC = [
 {n:"Rialzo per WC", t:"Flessione", d:"meno flessione di ginocchio e anca: alzarsi torna possibile"},
 {n:"Rialzo con braccioli", t:"Appoggio", d:"per alzarsi e sedersi"},
 {n:"Comoda", t:"Di notte", d:"WC mobile accanto al letto: molte cadute avvengono nel tragitto"},
];

const INCONTINENZA = [
 {t:"Pannolone **a mutandina**", d:"non si mobilizza · incontinenza grave"},
 {t:"**Sagomato** con mutandina a rete", d:"più leggero, per chi si muove"},
 {t:"Pannolino **rettangolare** · traversa", d:"perdite lievi · il letto"},
 {t:"Catetere **esterno** per l'uomo · padella · pappagallo"},
];

const SCELTA = [
 {t:"Tipo di incontinenza"}, {t:"Mobilità"}, {t:"Cute"}, {t:"Dignità"},
];

const MATERASSI = [
 {n:"Statico", t:"Rischio basso o medio", d:"schiuma, gel, fibra: distribuisce la pressione"},
 {n:"Dinamico", t:"Rischio alto", d:"pressione alternata, cessione d'aria: varia gli appoggi"},
 {n:"Cuscino", t:"Carrozzina", d:"lo stesso principio, per la seduta"},
];

const AMBIENTE = [
 {t:"**Rimuovere**", d:"tappeti · fili · soglie · oggetti a terra · mobili instabili"},
 {t:"**Aggiungere**", d:"luce notturna fra letto e bagno · corrimano · punti luce"},
 {t:"**Altezze**", d:"letto, sedie, poltrone né troppo bassi né troppo alti · sedute con braccioli"},
 {t:"**Percorsi** liberi", d:"porte di almeno 80 cm"},
 {t:"A **portata di mano**", d:"fra l'altezza dell'anca e quella della spalla"},
];

const SOLUZIONI = [
 {t:"Rampe · pendenza massima 8%"}, {t:"Montascale"}, {t:"Servoscala"}, {t:"Ascensore"},
];

const TO = [
 {t:"**Valuta** la persona nel suo ambiente e nelle sue attività"},
 {t:"**Propone** ausili, adattamenti, strategie"},
 {t:"L'OSS è il suo **collaboratore naturale**", d:"vede ogni giorno che cosa funziona e che cosa no"},
];

const RIEPILOGO = [
 "Alimentazione: posate ingrossate, piatto con bordo, bicchiere con incavo · **beccuccio e cannuccia** con cautela",
 "Vestizione: infilacalze, velcro, pinza · **gli abiti** sono il primo ausilio",
 "Bagno: antiscivolo, **maniglioni a muro**, sedia doccia, rialzo WC, comoda",
 "Incontinenza: il presidio **giusto**, non il più assorbente · antidecubito per rischio, **un solo strato**",
 "Ambiente: rimuovere, aggiungere, altezze, percorsi · **barriere** e L. 13/1989",
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 18 · Ausili, presidi e tecnologie assistive",
  titolo:"La vita quotidiana<br>**e l'ambiente**", sottotitolo:"Lezione 18.3",
  ente:"CISL FP Padova Rovigo · Concorso OSS Azienda Zero"},

{id:"s02", tipo:"frase", tema:"chiaro", sopratitolo:"Modulo 18 · lezione 3 di 5",
  testo:"I piccoli ausili cambiano la giornata **più dei grandi**."},
{id:"s03", tipo:"titolo", tema:"profondo",
  titolo:"Una posata ingrossata **restituisce il pasto autonomo**.",
  sotto:"Per la dignità, vale quanto la carrozzina."},
{id:"s04", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false,
  sopratitolo:"In questa lezione", celle:AREE},

{id:"s05", tipo:"elenco", tema:"chiaro", attive:[0,1],
  sopratitolo:"Gli ausili per l'alimentazione", voci:ALIMENTAZIONE},
{id:"s06", tipo:"elenco", tema:"chiaro",
  sopratitolo:"Gli ausili per l'alimentazione", voci:ALIMENTAZIONE},
{id:"s07", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false,
  sopratitolo:"E poi · il tagliere è per chi usa una mano sola", celle:ALTRI_ALIMENTAZIONE},

{id:"s08", tipo:"frase", tema:"chiaro", sopratitolo:"Il criterio di scelta",
  testo:"Prima si osserva **quale gesto** non riesce. Poi l'ausilio che compensa **quel** gesto.",
  sotto:"Portare alla bocca? Tagliare? Tenere il piatto fermo?"},
{id:"s09", tipo:"frase", tema:"tenue", sopratitolo:"Nella disfagia · avvertenza 1",
  testo:"Il bicchiere con beccuccio non è per tutti: fa estendere il collo e non controlla il flusso."},
{id:"s10", tipo:"frase", tema:"tenue", sopratitolo:"Nella disfagia · avvertenza 2 · Modulo 4",
  testo:"La cannuccia accelera il flusso: va valutata."},
{id:"s11", tipo:"frase", tema:"chiaro", sopratitolo:"L'ausilio per l'alimentazione",
  testo:"Si concorda con il **logopedista** o il **terapista occupazionale**."},

{id:"s12", tipo:"elenco", tema:"chiaro", attive:[0],
  sopratitolo:"Gli ausili per la vestizione", voci:VESTIZIONE},
{id:"s13", tipo:"elenco", tema:"chiaro",
  sopratitolo:"Gli ausili per la vestizione", voci:VESTIZIONE},
{id:"s14", tipo:"griglia", tema:"chiaro", colonne:4, spunta:false,
  sopratitolo:"Gli abiti sono il primo ausilio", celle:ABITI},
{id:"s15", tipo:"titolo", tema:"profondo",
  titolo:"Vestirsi da soli, con dieci minuti in più, **è autonomia**."},

{id:"s16", tipo:"elenco", tema:"chiaro", attive:[0,1],
  sopratitolo:"Gli ausili per l'igiene personale", voci:IGIENE},
{id:"s17", tipo:"elenco", tema:"chiaro", attive:[0,1,2,3],
  sopratitolo:"Gli ausili per l'igiene personale", voci:IGIENE},
{id:"s18", tipo:"frase", tema:"chiaro", sopratitolo:"Lo specchio inclinabile, per chi è seduto · e l'obiettivo",
  testo:"Fare da soli **il più possibile**. L'operatore supervisiona, e interviene solo dove serve."},

{id:"s19", tipo:"titolo", tema:"profondo",
  titolo:"Il bagno è il luogo di casa **con più cadute**.",
  sotto:"Superfici bagnate, spazi stretti, movimenti complessi come scavalcare la vasca."},
{id:"s20", tipo:"elenco", tema:"chiaro", attive:[0,1],
  sopratitolo:"Il bagno · gli ausili essenziali", voci:BAGNO},
{id:"s21", tipo:"elenco", tema:"chiaro",
  sopratitolo:"Il bagno · gli ausili essenziali", voci:BAGNO},
{id:"s22", tipo:"griglia", tema:"chiaro", colonne:3,
  sopratitolo:"Il bagno · l'ambiente", celle:BAGNO_AMBIENTE},

{id:"s23", tipo:"tre", tema:"chiaro", attive:[0,1],
  sopratitolo:"Il WC", box:WC},
{id:"s24", tipo:"tre", tema:"chiaro",
  sopratitolo:"Il WC", box:WC},
{id:"s25", tipo:"titolo", tema:"profondo",
  titolo:"La comoda è un ausilio **di sicurezza**, non una rinuncia.",
  sotto:"Si verificano il rialzo fissato bene, l'altezza, la pulizia."},

{id:"s26", tipo:"elenco", tema:"chiaro", attive:[0,1],
  sopratitolo:"I presidi per l'incontinenza", voci:INCONTINENZA},
{id:"s27", tipo:"elenco", tema:"chiaro",
  sopratitolo:"I presidi per l'incontinenza", voci:INCONTINENZA},
{id:"s28", tipo:"griglia", tema:"chiaro", colonne:4, spunta:false,
  sopratitolo:"La scelta segue", celle:SCELTA},
{id:"s29", tipo:"frase", tema:"tenue", sopratitolo:"Un errore frequente",
  testo:"Il presidio più assorbente non è sempre il migliore. Va cambiato quando serve, non «caricato» per cambiarlo meno."},

{id:"s30", tipo:"tre", tema:"chiaro", attive:[0],
  sopratitolo:"Le superfici antidecubito · Modulo 7", box:MATERASSI},
{id:"s31", tipo:"tre", tema:"chiaro",
  sopratitolo:"Le superfici antidecubito · Modulo 7", box:MATERASSI},
{id:"s32", tipo:"frase", tema:"chiaro", sopratitolo:"Si sceglie in base al rischio (Braden) e alla mobilità",
  testo:"Nessun presidio **sostituisce i cambi posturali**."},
{id:"s33", tipo:"frase", tema:"tenue", sopratitolo:"Un solo strato tra persona e materasso",
  testo:"Le traverse multiple annullano l'effetto."},

{id:"s34", tipo:"elenco", tema:"chiaro", attive:[0],
  sopratitolo:"Gli adattamenti dell'ambiente · ausili a tutti gli effetti, spesso i più economici", voci:AMBIENTE},
{id:"s35", tipo:"elenco", tema:"chiaro", attive:[0,1,2],
  sopratitolo:"Gli adattamenti dell'ambiente · ausili a tutti gli effetti, spesso i più economici", voci:AMBIENTE},
{id:"s36", tipo:"elenco", tema:"chiaro",
  sopratitolo:"Gli adattamenti dell'ambiente · ausili a tutti gli effetti, spesso i più economici", voci:AMBIENTE},

{id:"s37", tipo:"frase", tema:"chiaro", sopratitolo:"Le barriere architettoniche",
  testo:"Un **ostacolo fisico** che impedisce o limita l'accesso.",
  sotto:"Gradini · porte strette · bagni inaccessibili"},
{id:"s38", tipo:"griglia", tema:"chiaro", colonne:4, spunta:false,
  sopratitolo:"Le soluzioni", celle:SOLUZIONI},
{id:"s39", tipo:"norma", tema:"chiaro", etichetta:"Legge", sigla:"13/1989",
  testo:"**Contributi pubblici** per l'abbattimento delle barriere."},
{id:"s40", tipo:"titolo", tema:"profondo",
  titolo:"La barriera trasforma **il deficit in esclusione**.",
  sotto:"Al domicilio l'OSS osserva e segnala. Assistente sociale e terapista occupazionale hanno gli strumenti."},

{id:"s41", tipo:"frase", tema:"chiaro", sopratitolo:"Un professionista da conoscere",
  testo:"Il **terapista occupazionale**: gli ausili per la vita quotidiana e l'ambiente."},
{id:"s42", tipo:"elenco", tema:"chiaro",
  sopratitolo:"Il terapista occupazionale", voci:TO},
{id:"s43", tipo:"citazione", tema:"chiaro",
  testo:"«Con la posata ingrossata mangia da sola, ma il bicchiere lo rovescia.»",
  fonte:"L'OSS riferisce, con precisione"},
{id:"s44", tipo:"titolo", tema:"profondo",
  titolo:"Vale più di **una valutazione in ambulatorio**.",
  sotto:"Perché descrive la vita reale."},

{id:"s45", tipo:"memo", tema:"chiaro", attive:[0],
  sopratitolo:"Riepilogo", voci:RIEPILOGO},
{id:"s46", tipo:"memo", tema:"chiaro", attive:[0,1,2],
  sopratitolo:"Riepilogo", voci:RIEPILOGO},
{id:"s47", tipo:"memo", tema:"chiaro", attive:[0,1,2,3],
  sopratitolo:"Riepilogo", voci:RIEPILOGO},
{id:"s48", tipo:"memo", tema:"chiaro",
  sopratitolo:"Riepilogo", voci:RIEPILOGO},

{id:"s49", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"18.4", sottotitolo:"Ausili per la **comunicazione**, i sensi e le tecnologie assistive",
  ente:"CISL FP Padova Rovigo · Concorso OSS Azienda Zero"},
];
