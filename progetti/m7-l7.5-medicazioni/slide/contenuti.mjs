// Contenuto delle 50 scene della lezione 7.5 — medicazioni avanzate. Tre
// corpi nuovi: l'ambiente umido (tre lesioni in sezione: secca con la
// crosta, umida controllata, troppo bagnata con la cute macerata),
// l'albero decisionale (lesione → classe, sette righe) e la pressione
// negativa (la lesione con la schiuma, il film, il tubo, la pompa a −125 e
// gli effetti). Le classi sono griglie a due colonne: indicazioni e «non».

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 7 · Wound care, stomie e drenaggi",
  titolo:"Medicazioni<br>avanzate", sottotitolo:"7.5 · Per classe, non per marca",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"frase", tema:"chiaro", sopratitolo:"Micro-lezione 5 di 8 · decine di medicazioni, nomi commerciali diversi in ogni azienda",
  testo:"Studiarle **per marca** è inutile."},
{id:"s03", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Si studiano per classe · ogni classe risponde a un problema preciso della lesione", celle:[
  {n:"1", t:"Troppo **secca**"}, {n:"2", t:"Troppo **bagnata**"}, {n:"3", t:"**Necrotica**"}, {n:"4", t:"**Infetta**", key:true}]},
{id:"s04", tipo:"frase", tema:"chiaro", sopratitolo:"La scelta discende dalla valutazione con il TIME della lezione 7.1",
  testo:"Prima la **domanda**, poi la risposta che sta nell'armadio."},

{id:"s05", tipo:"umido", tema:"chiaro", sopratitolo:"Il principio alla base di tutte le medicazioni avanzate · una lesione guarisce più rapidamente in un ambiente umido controllato", attive:[1]},
{id:"s06", tipo:"umido", tema:"chiaro", sopratitolo:"Né secca né macerata · la crosta rallenta la migrazione delle cellule; l'eccesso di umidità macera la cute intorno", attive:[0,2]},
{id:"s07", tipo:"umido", tema:"chiaro", sopratitolo:"La medicazione serve a mantenere l'equilibrio · tutte le classi fanno una di queste due cose, o proteggono"},

{id:"s08", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Le classi · i film in poliuretano", celle:[
  {n:"1", t:"**Trasparenti**, **semipermeabili**: passano gas e vapore, non liquidi né batteri", key:true}]},
{id:"s09", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"I film · le indicazioni", celle:[
  {t:"**Proteggere** la cute, gli **stadi 1**", key:true}, {t:"Lesioni superficiali **senza essudato**"}, {t:"Medicazione **secondaria**"}, {t:"Fissare gli **accessi vascolari**"}]},
{id:"s10", tipo:"trappola", tema:"chiaro", sopratitolo:"I film non assorbono · il pregio: la lesione si controlla senza scoprirla", righe:[
  {sb:"Un film su una lesione essudante: macerazione", ok:"Solo dove **non c'è essudato**"}]},

{id:"s11", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Gli idrocolloidi · occlusivi: a contatto con l'essudato formano un gel", celle:[
  {n:"2", t:"Essudato **scarso o moderato**", key:true}]},
{id:"s12", tipo:"frase", tema:"chiaro", sopratitolo:"Favoriscono il debridement autolitico",
  testo:"Lo **scioglimento del tessuto devitalizzato** da parte degli enzimi della lesione stessa."},
{id:"s13", tipo:"trappola", tema:"chiaro", sopratitolo:"Alla rimozione · lo abbiamo detto nella 7.1: l'odore si valuta dopo la detersione", righe:[
  {sb:"Il gel giallastro con odore caratteristico scambiato per pus", ok:"È il **gel dell'idrocolloide**, non un'infezione"}]},
{id:"s14", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Gli idrocolloidi · non", celle:[
  {n:"✗", t:"Su lesioni **infette**: l'occlusione favorisce gli anaerobi", key:true}, {n:"✗", t:"Su lesioni **molto essudanti**"}]},

{id:"s15", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Gli idrogel · contengono molta acqua e cedono umidità · debridement autolitico", celle:[
  {t:"Lesioni **secche**", key:true}, {t:"**Necrosi** e **slough** da ammorbidire"}]},
{id:"s16", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"Gli idrogel · l'acqua che serve al fondo fa male alla cute intorno", celle:[
  {t:"Richiedono una **medicazione secondaria**"}, {t:"Solo **sul fondo**, proteggendo i margini dalla macerazione", key:true}]},

{id:"s17", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Gli alginati · di calcio, derivati dalle alghe", celle:[
  {n:"1", t:"**Altissimo assorbimento**, formano un gel", key:true}, {n:"2", t:"Proprietà **emostatiche**: utili sulle lesioni che sanguinano"}]},
{id:"s18", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Le idrofibre · in carbossimetilcellulosa", celle:[
  {n:"1", t:"**Alto assorbimento**"}, {n:"2", t:"Trattengono l'essudato **in verticale**, proteggendo i margini", key:true}]},
{id:"s19", tipo:"confronto", tema:"chiaro", sopratitolo:"Alginati e idrofibre · richiedono una medicazione secondaria", col:[
  {h:"Sì", t:"lesioni **molto essudanti**, **cavità** da riempire", key:true}, {h:"Mai", t:"lesioni **secche**: seccherebbero ancora di più"}]},

{id:"s20", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"Le schiume in poliuretano", celle:[
  {t:"Essudato **moderato o abbondante**", key:true}, {t:"**Protezione meccanica** e ammortizzazione"}, {t:"Bordo in **silicone**: rimozione senza traumi"}]},
{id:"s21", tipo:"frase", tema:"chiaro", sopratitolo:"Anche in prevenzione · come nella lezione 7.2",
  testo:"Su **sacro e talloni**, e **sotto i dispositivi**."},

{id:"s22", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Le medicazioni antimicrobiche · infezione locale o sospetto di biofilm, per periodi limitati", celle:[
  {n:"Ag", t:"**Argento**", key:true}, {n:"I", t:"**Iodio**"}, {n:"P", t:"**PHMB**"}, {n:"M", t:"**Miele**"}]},
{id:"s23", tipo:"cifre", tema:"chiaro", sopratitolo:"Si rivaluta · se l'infezione è risolta si torna a una medicazione non antimicrobica · non a scopo preventivo, non all'infinito", voci:[
  {n:"2", suf:"settimane", d:"indicativamente, poi si rivaluta", key:true}]},

{id:"s24", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Le altre classi", celle:[
  {n:"1", t:"**Carbone attivo**: il controllo dell'odore, nelle lesioni neoplastiche, per la dignità della persona", key:true}, {n:"2", t:"**Interfacce** non aderenti: proteggono la granulazione alla rimozione"}]},
{id:"s25", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Le altre classi", celle:[
  {n:"3", t:"**Bioattive**: collagene, acido ialuronico, modulatori delle proteasi, per le lesioni **ferme** nonostante una gestione corretta", key:true}]},
{id:"s26", tipo:"trappola", tema:"chiaro", sopratitolo:"Le garze tradizionali · il trauma da medicazione della lezione 7.1", righe:[
  {sb:"Garza a contatto con il fondo: aderisce e strappa il tessuto nuovo", ok:"**Mai a contatto con il fondo**"}]},

{id:"s27", tipo:"albero", tema:"chiaro", sopratitolo:"L'albero decisionale · il cuore della lezione", attive:[0,1]},
{id:"s28", tipo:"albero", tema:"chiaro", sopratitolo:"L'albero decisionale", attive:[0,1,2,3,4]},
{id:"s29", tipo:"albero", tema:"chiaro", sopratitolo:"L'albero decisionale · la cavità si riempie senza stipare: comprimere il fondo lo danneggia"},
{id:"s30", tipo:"frase", tema:"chiaro", sopratitolo:"Sette righe, e ogni riga è una risposta d'esame",
  testo:"Il quiz descrive la lesione, tu rispondi con la **classe**: non con la marca, con la classe."},

{id:"s31", tipo:"npwt", tema:"chiaro", sopratitolo:"La terapia a pressione negativa, NPWT", attive:[]},
{id:"s32", tipo:"npwt", tema:"chiaro", sopratitolo:"Spesso intorno a −125 mmHg, in modo continuo o intermittente · gli effetti"},
{id:"s33", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"La medicazione si cambia ogni 48–72 ore · le controindicazioni", celle:[
  {n:"✗", t:"**Necrosi** non rimossa"}, {n:"✗", t:"**Osteomielite** non trattata"}, {n:"✗", t:"**Neoplasia** nella lesione"}, {n:"✗", t:"Vasi, organi, **anastomosi esposti**; fistole non esplorate", key:true}]},
{id:"s34", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Cautela e gestione", celle:[
  {n:"!", t:"**Anticoagulato**: il sanguinamento va cercato nel contenitore", key:true}, {n:"!", t:"Gli **allarmi**: perdita del sigillo, contenitore pieno"}]},
{id:"s35", tipo:"trappola", tema:"chiaro", sopratitolo:"Una regola · una schiuma chiusa senza aspirazione è un ambiente favorevole ai batteri", righe:[
  {sb:"Pompa spenta oltre il tempo previsto dalla procedura, spesso 2 ore", ok:"La medicazione **si rimuove**"}]},

{id:"s36", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Il debridement · la rimozione del tessuto non vitale", celle:[
  {n:"1", t:"**Autolitico**: idrogel e idrocolloidi; lento, **selettivo**, indolore, infermieristico", key:true}, {n:"2", t:"**Enzimatico**: prodotti specifici su prescrizione"}]},
{id:"s37", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Il debridement", celle:[
  {n:"3", t:"**Meccanico**: garze che si seccano e strappano; **non selettivo**, doloroso, sconsigliato", key:true}, {n:"4", t:"**Biologico**: larve sterili"}]},
{id:"s38", tipo:"confronto", tema:"chiaro", sopratitolo:"Con taglienti", col:[
  {h:"Conservativo", t:"**infermiere formato**, secondo le procedure aziendali", key:true}, {h:"Chirurgico", t:"**medico**"}]},

{id:"s39", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Quando non si fa debridement", celle:[
  {n:"1", t:"**Escara secca e stabile al tallone**, senza infezione", key:true}, {n:"2", t:"**Arto ischemico** non rivascolarizzato: il tessuto rimosso non ricresce e la lesione si allarga"}]},
{id:"s40", tipo:"frase", tema:"chiaro", sopratitolo:"E nella persona in fine vita · lo vedremo nel modulo 11",
  testo:"Quando l'obiettivo non è la guarigione ma il **comfort**: odore, essudato, dolore."},

{id:"s41", tipo:"frase", tema:"chiaro", sopratitolo:"Il caso · lesione sacrale stadio 3, nessun segno di infezione",
  testo:"Fondo con **slough per il 60%**, essudato **abbondante**, cute perilesionale **macerata**."},
{id:"s42", tipo:"time", tema:"chiaro", sopratitolo:"Con il TIME · quattro lettere, quattro risposte", key:[0,2,3]},
{id:"s43", tipo:"percorso", tema:"chiaro", sopratitolo:"La scelta · valutando un debridement per lo slough", tappe:[
  {t:"Detersione"}, {t:"Prodotto barriera", d:"la cute perilesionale"}, {t:"Alto assorbimento", d:"alginato o idrofibra, schiuma secondaria", key:true}]},
{id:"s44", tipo:"titolo", tema:"profondo",
  titolo:"E naturalmente **scarico e nutrizione**.",
  sotto:"La medicazione da sola non guarisce una lesione da pressione."},

{id:"s45", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"In Veneto", celle:[
  {n:"1", t:"Un **prontuario** delle medicazioni avanzate in ogni azienda, con indicazioni d'uso", key:true}, {n:"2", t:"**Infermieri esperti** in wound care come consulenti"}, {n:"3", t:"In alcuni percorsi la **NPWT a domicilio**"}]},
{id:"s46", tipo:"frase", tema:"chiaro", sopratitolo:"All'orale · la scelta per classe in base al TIME mostra metodo",
  testo:"La commissione non vuole il nome del prodotto, vuole il **ragionamento**."},

{id:"s47", tipo:"albero", tema:"chiaro", sopratitolo:"Ricapitoliamo · ambiente umido controllato", righe:[
  {l:"Secca", c:"Idrogel"}, {l:"Essudante", c:"Alginato, idrofibra, schiuma"}, {l:"Infetta", c:"Antimicrobica", d:"mai occlusiva, per periodi limitati", key:true}]},
{id:"s48", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Ricapitoliamo", celle:[
  {t:"NPWT: circa **−125**, cambio ogni **48–72 ore**, spenta troppo a lungo si **rimuove**", key:true}, {t:"Debridement: autolitico, enzimatico, con taglienti; **mai sull'escara stabile del tallone**"}]},
{id:"s49", tipo:"frase", tema:"chiaro", sopratitolo:"Nella prossima lezione",
  testo:"Le **stomie** digestive e urinarie."},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"7.6<br>Stomie digestive<br>e urinarie", sottotitolo:"Tecnica e relazione",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
