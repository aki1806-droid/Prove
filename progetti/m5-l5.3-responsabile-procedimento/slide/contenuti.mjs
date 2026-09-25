// Contenuto delle 49 scene della lezione 5.3. *accento*  **accento in semibold**
//
// Corso «Progressione verticale · Comparto Sanità», Modulo 5. Il responsabile del procedimento:
// artt. 4, 5, 6, 6-bis L. 241/1990; art. 2 c. 9 e 9-quater; art. 16 c. 2.

const ENTE = "CISL FP Padova Rovigo · Progressione verticale · Comparto Sanità";

const TRE_COSE = [
  "Il **dirigente** assegna la responsabilità a sé o a un **dipendente**; in mancanza, è il **funzionario preposto** all'unità",
  "**Art. 6**: valuta i presupposti, **accerta** i fatti, conferenza di servizi, **comunicazioni**, adotta o **trasmette**",
  "L'organo competente non si discosta dall'istruttoria **senza motivare**. Conflitto, anche **potenziale**: si **astiene**",
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 5 · Procedimento amministrativo e accesso",
  titolo:"Il responsabile<br>del procedimento", sottotitolo:"Lezione 5.3", ente:ENTE},

// --- 1 · aggancio
{id:"s02", tipo:"illustrata", tema:"chiaro", ill:"sportello", sopratitolo:"Molte scrivanie, un punto fermo",
  titolo:"A chi **rivolgersi**", punti:[
    {icona:"cartella", t:"una domanda passa per **molti uffici**"},
    {icona:"persona", t:"ma c'è sempre **una** scrivania di riferimento", key:true}],
  etichette:{insegna:{t:"Responsabile del procedimento", key:true}}},
{id:"s03", tipo:"confronto", tema:"chiaro", sopratitolo:"Una figura che vi riguarda", col:[
  {h:"La incontrate", t:"ogni **giorno**", grande:true},
  {h:"Potreste diventarla", t:"con un **incarico**", grande:true}]},
{id:"s04", tipo:"titolo", tema:"profondo",
  titolo:"Un **nome** e un **cognome**<br>dietro ogni pratica."},

// --- 2 · rotta
{id:"s05", tipo:"flusso", tema:"chiaro", sopratitolo:"Quattro passaggi", passi:[
  {icona:"persona", t:"Chi è", d:"e chi lo individua"},
  {icona:"ingranaggio", t:"Che cosa fa"},
  {icona:"documento", t:"Chi decide", d:"il provvedimento finale"},
  {icona:"scudo", t:"Conflitti e tempi", key:true}]},

// --- 3 · chi è il responsabile
{id:"s06", tipo:"illustrata", tema:"chiaro", ill:"organigramma", sopratitolo:"Art. 4 · per ciascun tipo di procedimento",
  titolo:"L'**unità** responsabile", punti:[
    {icona:"cartella", t:"dell'**istruttoria**"},
    {icona:"ingranaggio", t:"degli **adempimenti**"},
    {icona:"documento", t:"del **provvedimento finale**", key:true}],
  etichette:{top:"Amministrazione", m2:{t:"Unità responsabile", key:true}}},
{id:"s07", tipo:"illustrata", tema:"chiaro", ill:"documento", sopratitolo:"Scelte rese pubbliche",
  titolo:"Chi si occupa di **che cosa**", punti:[
    {icona:"occhio", t:"chiunque può **saperlo**", key:true}],
  etichette:{titolo:{t:"Unità responsabili", key:true}, sigillo:"Pubblico"}},
{id:"s08", tipo:"confronto", tema:"chiaro", sopratitolo:"Un esempio in azienda sanitaria", col:[
  {h:"Pratiche dei dipendenti", t:"alla **gestione del personale**"},
  {h:"Accesso agli atti", t:"all'ufficio che **detiene** i documenti"}]},
{id:"s09", tipo:"flusso", tema:"chiaro", sopratitolo:"Art. 5 · l'assegnazione", passi:[
  {icona:"persona", t:"Il dirigente", d:"dell'unità"},
  {icona:"persone", t:"Assegna", d:"a sé o a un dipendente dell'unità"},
  {icona:"cartella", t:"Istruttoria", d:"e ogni adempimento", key:true}]},
{id:"s10", tipo:"illustrata", tema:"chiaro", ill:"tavolo", sopratitolo:"Il dirigente sceglie",
  titolo:"Lavoro **distribuito**", punti:[
    {icona:"ingranaggio", t:"in base all'**organizzazione** e alle competenze"},
    {icona:"persone", t:"ciascuno responsabile dei **propri** procedimenti", key:true}],
  etichette:{p1:"P1", p2:{t:"P2", key:true}, p3:"P3", p4:"P4"}},
{id:"s11", tipo:"confronto", tema:"chiaro", sopratitolo:"Il provvedimento finale? Eventualmente", col:[
  {h:"L'istruttoria", t:"al **responsabile**", grande:true},
  {h:"La decisione", t:"può restare in **altre mani**", grande:true}]},
{id:"s12", tipo:"norma", tema:"chiaro", etichetta:"Art. 5, c. 2 · se nessuno è assegnato", sigla:"Il preposto",
  testo:"È responsabile il **funzionario preposto** all'unità organizzativa."},
{id:"s13", tipo:"illustrata", tema:"chiaro", ill:"scudo", sopratitolo:"Così un responsabile c'è sempre",
  titolo:"Nessuna pratica **orfana**", punti:[
    {icona:"spunta", t:"sempre qualcuno che ne **risponde**", key:true}],
  etichette:{alto:{t:"Responsabile", key:true}}},
{id:"s14", tipo:"illustrata", tema:"chiaro", ill:"busta", sopratitolo:"Art. 5, c. 3 · unità e nome si comunicano",
  titolo:"Nessun **segreto**", punti:[
    {icona:"chat", t:"a chi riceve la **comunicazione di avvio**"},
    {icona:"persone", t:"su richiesta, a chiunque vi abbia **interesse**", key:true}],
  etichette:{sx:"Ufficio", dx:{t:"Interessati", key:true}, alto:"Nome e unità"}},
{id:"s15", tipo:"trappola", tema:"tenue", sopratitolo:"Occhio a un errore diffuso", righe:[
  {sb:"Il RUP della legge 241",
   ok:"Nella 241 è il responsabile del procedimento; il RUP è del codice dei contratti pubblici"}]},
{id:"s16", tipo:"titolo", tema:"profondo",
  titolo:"L'**ufficio** lo fissa l'amministrazione,<br>la **persona** la assegna<br>il dirigente."},

// --- 4 · che cosa fa
{id:"s17", tipo:"tre", tema:"chiaro", attive:[0], sopratitolo:"Art. 6 · i compiti, uno per uno", box:[
  {n:"a", t:"Valuta", d:"ammissibilità, legittimazione, presupposti"},
  {n:"b", t:"Accerta", d:"i fatti, d'ufficio"},
  {n:"c", t:"Conferenza", d:"la propone o la indice"}]},
{id:"s18", tipo:"tre", tema:"chiaro", attive:[0,1], sopratitolo:"Art. 6 · accertare i fatti", box:[
  {n:"a", t:"Valuta", d:"ammissibilità, legittimazione, presupposti"},
  {n:"b", t:"Accerta", d:"dichiarazioni, rettifiche, ispezioni, documenti"},
  {n:"c", t:"Conferenza", d:"la propone o la indice"}]},
{id:"s19", tipo:"tre", tema:"chiaro", attive:[0,1,2], sopratitolo:"Art. 6 · la conferenza di servizi", box:[
  {n:"a", t:"Valuta", d:"ammissibilità, legittimazione, presupposti"},
  {n:"b", t:"Accerta", d:"dichiarazioni, rettifiche, ispezioni, documenti"},
  {n:"c", t:"Conferenza", d:"la propone o, se competente, la indice"}]},
{id:"s20", tipo:"illustrata", tema:"chiaro", ill:"busta", sopratitolo:"Art. 6 · lettera d",
  titolo:"Cura le **comunicazioni**", punti:[
    {icona:"chat", t:"le **comunicazioni**"},
    {icona:"documento", t:"le **pubblicazioni**"},
    {icona:"certificato", t:"le **notificazioni**", key:true}],
  etichette:{sx:"Ufficio", dx:{t:"Destinatario", key:true}}},
{id:"s21", tipo:"confronto", tema:"chiaro", sopratitolo:"Art. 6 · lettera e", col:[
  {h:"Se è competente", t:"**adotta** il provvedimento finale", grande:true},
  {h:"Altrimenti", t:"**trasmette** gli atti all'organo competente", grande:true}]},
{id:"s22", tipo:"flusso", tema:"chiaro", sopratitolo:"Un esempio: il riconoscimento di un periodo di servizio", passi:[
  {icona:"documento", t:"Verifica", d:"la domanda"},
  {icona:"cartella", t:"Chiede", d:"il documento mancante"},
  {icona:"occhio", t:"Controlla", d:"i dati"},
  {icona:"spunta", t:"Prepara l'atto", key:true}]},
{id:"s23", tipo:"illustrata", tema:"chiaro", ill:"archivio", sopratitolo:"Art. 18 · nella stessa logica",
  titolo:"Accerta **d'ufficio**", punti:[
    {icona:"cartella", t:"fatti, stati e qualità da **certificare**"},
    {icona:"divieto", t:"senza chiederli al **cittadino**", key:true}],
  etichette:{cassetto:{t:"Accertamento d'ufficio", key:true}}},
{id:"s24", tipo:"illustrata", tema:"chiaro", ill:"sportello", sopratitolo:"Il punto di contatto",
  titolo:"A lui si **chiede**", punti:[
    {icona:"orologio", t:"a che punto è la **pratica**"},
    {icona:"documento", t:"riceve **memorie** e documenti", key:true}],
  etichette:{insegna:{t:"Responsabile", key:true}, foglio:"Memoria"}},
{id:"s25", tipo:"trappola", tema:"tenue", sopratitolo:"Un distrattore", righe:[
  {sb:"Il responsabile del procedimento è un semplice passacarte",
   ok:"Ha poteri istruttori veri: chiede documenti, dispone accertamenti, può indire la conferenza"}]},
{id:"s26", tipo:"titolo", tema:"profondo",
  titolo:"Valutare, **accertare**,<br>comunicare,<br>proporre o **decidere**."},

// --- 5 · chi decide alla fine
{id:"s27", tipo:"flusso", tema:"chiaro", sopratitolo:"Chi adotta il provvedimento finale", passi:[
  {icona:"persona", t:"Il responsabile", d:"se ha la competenza"},
  {icona:"cartella", t:"Oppure", d:"trasmette l'istruttoria"},
  {icona:"certificato", t:"L'organo competente", d:"decide", key:true}]},
{id:"s28", tipo:"norma", tema:"chiaro", etichetta:"Art. 6, lettera e", sigla:"Non si discosta",
  testo:"L'organo competente non si discosta dall'istruttoria **se non indicandone la motivazione** nel provvedimento finale."},
{id:"s29", tipo:"illustrata", tema:"chiaro", ill:"bivio", sopratitolo:"L'istruttoria conta davvero",
  titolo:"Dissenso **motivato**", punti:[
    {icona:"chat", t:"chi decide può **non essere d'accordo**"},
    {icona:"documento", t:"ma dice **perché**, per iscritto, nell'atto", key:true}],
  etichette:{meta1:"Istruttoria", meta2:{t:"Decisione motivata", key:true}}},
{id:"s30", tipo:"confronto", tema:"chiaro", sopratitolo:"Un esempio", col:[
  {h:"L'istruttoria", t:"conclude: **accogliere**"},
  {h:"Il dirigente respinge", t:"e spiega quali **elementi** lo portano a decidere diversamente"}]},
{id:"s31", tipo:"icone", tema:"chiaro", sopratitolo:"Questa regola protegge", voci:[
  {icona:"persona", t:"Il **cittadino**, da decisioni arbitrarie"},
  {icona:"scudo",   t:"Il **responsabile**, che non può essere ignorato"}]},
{id:"s32", tipo:"illustrata", tema:"chiaro", ill:"clessidra", sopratitolo:"Art. 16 · e se un parere arriva tardi?",
  titolo:"Non ne **risponde**", punti:[
    {icona:"orologio", t:"il ritardo di un **altro ufficio**"},
    {icona:"avviso", t:"salvo se **non ha chiesto** il parere", key:true}],
  etichette:{alto:{t:"Parere in ritardo", key:true}}},
{id:"s33", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione", righe:[
  {sb:"Il responsabile del procedimento adotta sempre il provvedimento finale",
   ok:"Solo se ne ha la competenza; altrimenti trasmette gli atti"}]},
{id:"s34", tipo:"titolo", tema:"profondo",
  titolo:"Chi decide può **dissentire**<br>dall'istruttoria,<br>ma deve **motivare**."},

// --- 6 · imparzialità e responsabilità
{id:"s35", tipo:"norma", tema:"chiaro", etichetta:"Art. 6-bis · legge 190 del 2012", sigla:"Astensione",
  testo:"In caso di **conflitto di interessi**, il responsabile del procedimento si **astiene**."},
{id:"s36", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"L'obbligo vale anche per chi adotta", celle:[
  {t:"**Pareri**"}, {t:"**Valutazioni tecniche**"},
  {t:"**Atti** intermedi"}, {t:"Il **provvedimento finale**"}]},
{id:"s37", tipo:"flusso", tema:"chiaro", sopratitolo:"Un esempio: l'istanza di un parente stretto", passi:[
  {icona:"avviso", t:"Segnala", d:"il conflitto"},
  {icona:"divieto", t:"Si astiene"},
  {icona:"persone", t:"La pratica passa", d:"a un collega", key:true}]},
{id:"s38", tipo:"illustrata", tema:"chiaro", ill:"clessidra", sopratitolo:"Art. 2, c. 9 · la responsabilità per i tempi",
  titolo:"Il ritardo **pesa**", punti:[
    {icona:"spunta", t:"sulla **performance individuale**", key:true}],
  etichette:{alto:{t:"Ritardo", key:true}}},
{id:"s39", tipo:"confronto", tema:"chiaro", sopratitolo:"E può comportare responsabilità", col:[
  {h:"Disciplinare", t:"del **dirigente** e del **funzionario**", grande:true},
  {h:"Amministrativo contabile", t:"per il danno all'**erario**", grande:true}]},
{id:"s40", tipo:"illustrata", tema:"chiaro", ill:"calendario", sopratitolo:"Art. 2, c. 9-quater",
  titolo:"Il **30 gennaio**", punti:[
    {icona:"persona", t:"il titolare del **potere sostitutivo**"},
    {icona:"documento", t:"comunica i procedimenti **in ritardo**", key:true}],
  etichette:{data:{t:"30 gennaio", key:true}, nota:"Ritardi"}},
{id:"s41", tipo:"illustrata", tema:"chiaro", ill:"livelli", sopratitolo:"Per chi lavora nel comparto",
  titolo:"Una **responsabilità** che si costruisce", punti:[
    {icona:"certificato", t:"spesso legata a **incarichi di funzione**"},
    {icona:"cappello", t:"con **competenza** e ordine nel lavoro", key:true}],
  etichette:{l1:"Incarico", l2:{t:"Responsabile", key:true}, l3:"Competenza", l4:"Ordine"}},
{id:"s42", tipo:"trappola", tema:"tenue", sopratitolo:"Occhio", righe:[
  {sb:"Il conflitto si segnala solo se ha già influito sulla decisione",
   ok:"Va segnalato anche quando è solo potenziale"}]},
{id:"s43", tipo:"titolo", tema:"profondo",
  titolo:"**Imparziale** nel merito,<br>puntuale nei **tempi**,<br>trasparente nei **conflitti**."},

// --- 7 · le tre cose
{id:"s44", tipo:"memo", tema:"chiaro", attive:[0], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s45", tipo:"memo", tema:"chiaro", attive:[0,1], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s46", tipo:"memo", tema:"chiaro", attive:[0,1,2], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s47", tipo:"trappola", tema:"tenue", sopratitolo:"L'ultimo distrattore", righe:[
  {sb:"Il nome del responsabile è riservato",
   ok:"Va comunicato ai destinatari dell'avvio e, a richiesta, a chiunque vi abbia interesse"}]},

// --- 8 · chiusura
{id:"s48", tipo:"titolo", tema:"profondo",
  titolo:"Un responsabile **sempre** individuato,<br>compiti **precisi**,<br>decisioni **motivate**.",
  sotto:"Prossima lezione: avvio, partecipazione e motivazione."},

{id:"s49", tipo:"copertina", tema:"profondo", modulo:"Prossima lezione",
  titolo:"Lezione 5.4", sottotitolo:"Avvio, partecipazione<br>e motivazione", ente:ENTE},
];
