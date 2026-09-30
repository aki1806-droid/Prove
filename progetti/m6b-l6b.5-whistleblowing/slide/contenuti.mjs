// Contenuto delle 48 scene della lezione 6b.5. *accento*  **accento in semibold**
//
// Corso «Progressione verticale · Comparto Sanità», Modulo 6-bis, Anticorruzione. Whistleblowing e
// misure di prevenzione: D.Lgs. 24/2023 (attuazione della direttiva UE 2019/1937; da verificare sul
// testo vigente); L. 190/2012 art. 1 cc. 5, 10, 17, 51; L. 179/2017; DPR 62/2013 (DPR 81/2023); PNA 2019.

const ENTE = "CISL FP Padova Rovigo · Progressione verticale · Comparto Sanità";

const TRE_COSE = [
  "Oggi il whistleblowing è nel **D.Lgs. 24/2023**: protegge dipendenti, **collaboratori**, consulenti, tirocinanti, **facilitatori** e colleghi",
  "Canale **interno** all'RPCT: avviso entro **7 giorni**, riscontro entro **3 mesi**; poi, a certe condizioni, **ANAC** e divulgazione pubblica",
  "Identità **riservata**, ritorsioni **nulle**, prova **a carico dell'ente**; rotazione con criteri del **piano**, formazione, **patti di integrità**",
];

const CANALI = [
  {icona:"persona", t:"Interno", d:"all'RPCT"},
  {icona:"scudo", t:"Esterno", d:"all'ANAC"},
  {icona:"chat", t:"Divulgazione", d:"pubblica"},
  {icona:"giudice", t:"Denuncia", d:"giudice o Corte dei conti"}];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 6-bis · Anticorruzione",
  titolo:"Whistleblowing<br>e misure di prevenzione", sottotitolo:"Lezione 6b.5", ente:ENTE},

// --- 1 · aggancio
{id:"s02", tipo:"illustrata", tema:"chiaro", ill:"cartellaclinica", sopratitolo:"Un servizio in appalto",
  titolo:"Ore pagate, **personale assente**", punti:[
    {icona:"persona", t:"un'infermiera se ne **accorge**"},
    {icona:"avviso", t:"se lo dice, rischia il **posto**?"},
    {icona:"chat", t:"e a **chi** deve dirlo?", key:true}],
  etichette:{}},
{id:"s03", tipo:"frase", tema:"chiaro", sopratitolo:"Whistleblowing",
  testo:"Chi **soffia nel fischietto**: la legge protegge chi segnala un illecito scoperto **nel lavoro**."},
{id:"s04", tipo:"titolo", tema:"profondo",
  titolo:"Chi segnala va **protetto**,<br>non punito."},

// --- 2 · rotta
{id:"s05", tipo:"elenco", tema:"chiaro", numerato:true, grandi:true, sopratitolo:"Quattro passaggi", voci:[
  {t:"Chi può **segnalare**, e che cosa"},
  {t:"I **canali**"},
  {t:"Riservatezza e **ritorsioni**"},
  {t:"Rotazione, **formazione**, patti"}]},

// --- 3 · chi e che cosa
{id:"s06", tipo:"timeline", tema:"chiaro", sopratitolo:"Da dove viene", tappe:[
  {anno:"2012", et:"L. 190: **art. 54-bis** nel decreto 165"},
  {anno:"2017", et:"L. **179** la rafforza"},
  {anno:"2023", et:"D.Lgs. **24**", key:true}]},
{id:"s07", tipo:"confronto", tema:"chiaro", sopratitolo:"Il decreto legislativo 24 del 2023", col:[
  {h:"Attua", t:"la direttiva **UE 2019/1937**"},
  {h:"Vale", t:"per il settore **pubblico** e **privato**", key:true}],
  sotto:"Sostituisce l'articolo 54-bis."},
{id:"s08", tipo:"griglia", tema:"chiaro", colonne:3, sopratitolo:"Chi è protetto: non solo i dipendenti", celle:[
  {t:"Dipendenti"},
  {t:"Collaboratori e **consulenti**"},
  {t:"Liberi **professionisti**"},
  {t:"Volontari e **tirocinanti**"},
  {t:"Chi è in **selezione**"},
  {t:"Chi ha **lasciato** il lavoro"}]},
{id:"s09", tipo:"icone", tema:"chiaro", sopratitolo:"La protezione si estende", voci:[
  {icona:"cuoremano", t:"Il **facilitatore**", d:"chi aiuta il segnalante"},
  {icona:"persone", t:"I **colleghi**", d:"con un rapporto abituale"},
  {icona:"persona", t:"I **parenti**", d:"fino al quarto grado, stesso contesto", key:true}]},
{id:"s10", tipo:"frase", tema:"chiaro", sopratitolo:"Che cosa si segnala",
  testo:"Violazioni che ledono l'**interesse pubblico** o l'**integrità** dell'amministrazione.",
  sotto:"Illeciti penali, civili, amministrativi e contabili, nazionali o europei."},
{id:"s11", tipo:"confronto", tema:"chiaro", sopratitolo:"Che cosa non si segnala così", col:[
  {h:"Rivendicazioni personali", t:"sul **proprio** rapporto di lavoro"},
  {h:"Per esempio", t:"una lite con il capo reparto sui **turni**", key:true}]},
{id:"s12", tipo:"confronto", tema:"chiaro", sopratitolo:"Fondati motivi", col:[
  {h:"Non servono", t:"prove **certe**"},
  {h:"Ma nemmeno bastano", t:"semplici **voci**: servono elementi **concreti**", key:true}]},
{id:"s13", tipo:"catena", tema:"chiaro", sopratitolo:"Le segnalazioni anonime", passi:[
  {t:"L'ANAC", d:"le tratta come ordinarie"},
  {t:"Il segnalante", d:"viene identificato"},
  {t:"Subisce ritorsioni?", d:"le tutele valgono", key:true}]},
{id:"s14", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione", righe:[
  {sb:"La tutela riguarda solo i dipendenti di ruolo",
   ok:"Copre anche collaboratori, consulenti, tirocinanti, volontari"}]},
{id:"s15", tipo:"titolo", tema:"profondo",
  titolo:"Interesse **pubblico**,<br>non una lite **personale**."},

// --- 4 · i canali
{id:"s16", tipo:"icone", tema:"chiaro", attive:[0], sopratitolo:"Quattro canali", voci:CANALI},
{id:"s17", tipo:"tre", tema:"chiaro", cifre:true, sopratitolo:"Il canale interno: scritto, anche online, oppure orale", box:[
  {n:"Avviso di ricevimento", t:"7 giorni"},
  {n:"Riscontro", t:"3 mesi", key:true}]},
{id:"s18", tipo:"catena", tema:"chiaro", sopratitolo:"Dare seguito", passi:[
  {t:"Verificare", d:"la fondatezza"},
  {t:"Chiedere", d:"integrazioni"},
  {t:"Trasmettere", d:"agli organi competenti", key:true}]},
{id:"s19", tipo:"icone", tema:"chiaro", attive:[0,1], sopratitolo:"Il canale esterno, a certe condizioni", voci:CANALI},
{id:"s20", tipo:"icone", tema:"chiaro", attive:[0,1,2], sopratitolo:"La divulgazione pubblica, solo in casi precisi", voci:CANALI},
{id:"s21", tipo:"icone", tema:"chiaro", sopratitolo:"La denuncia resta sempre possibile", voci:CANALI},
{id:"s22", tipo:"catena", tema:"chiaro", sopratitolo:"Torniamo all'infermiera", passi:[
  {t:"Segnala all'RPCT", d:"con la piattaforma"},
  {t:"Tre mesi", d:"senza riscontro"},
  {t:"Si rivolge all'ANAC", key:true}]},
{id:"s23", tipo:"trappola", tema:"tenue", sopratitolo:"Occhio al distrattore", righe:[
  {sb:"Il canale esterno dell'ANAC è libero in ogni caso",
   ok:"Si usa alle condizioni del decreto, di regola dopo l'interno"}]},
{id:"s24", tipo:"titolo", tema:"profondo",
  titolo:"Interno, **esterno**,<br>pubblico, **giudiziario**."},

// --- 5 · riservatezza e ritorsioni
{id:"s25", tipo:"illustrata", tema:"chiaro", ill:"cassaforte", sopratitolo:"La prima tutela",
  titolo:"La **riservatezza**", punti:[
    {icona:"lucchetto", t:"identità nota solo a chi **gestisce** la segnalazione"},
    {icona:"spunta", t:"altrimenti serve il **consenso espresso**", key:true}],
  etichette:{}},
{id:"s26", tipo:"elenco", tema:"chiaro", vietato:true, sopratitolo:"La segnalazione è sottratta", voci:[
  {t:"all'accesso **documentale**"},
  {t:"all'accesso **civico**"}]},
{id:"s27", tipo:"griglia", tema:"chiaro", colonne:3, sopratitolo:"La seconda tutela: niente ritorsioni", celle:[
  {t:"Licenziamento", no:true},
  {t:"Demansionamento", no:true},
  {t:"Trasferimento", no:true},
  {t:"Note negative", no:true},
  {t:"Mancata promozione", no:true},
  {t:"Atti ritorsivi: **nulli**"}]},
{id:"s28", tipo:"confronto", tema:"chiaro", sopratitolo:"L'onere della prova è invertito", col:[
  {h:"Si presume", t:"che la misura sia una **ritorsione**"},
  {h:"L'amministrazione", t:"deve dimostrare **altre ragioni**", key:true}]},
{id:"s29", tipo:"tre", tema:"chiaro", cifre:true, sopratitolo:"Sanzioni ANAC: ritorsioni, riservatezza violata, canali assenti", box:[
  {n:"Da", t:"10.000 €"},
  {n:"A", t:"50.000 €", key:true}]},
{id:"s30", tipo:"frase", tema:"chiaro", sopratitolo:"Il limite delle tutele",
  testo:"Cadono se si accerta la responsabilità per **calunnia** o **diffamazione**, o quella civile per **dolo** o **colpa grave**."},
{id:"s31", tipo:"catena", tema:"chiaro", sopratitolo:"Torniamo all'infermiera", passi:[
  {t:"Spostata lontano", d:"senza ragioni organizzative"},
  {t:"Si presume", d:"una ritorsione"},
  {t:"L'azienda", d:"deve provare il contrario", key:true}]},
{id:"s32", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione", righe:[
  {sb:"È il segnalante a dover provare la ritorsione",
   ok:"È l'amministrazione a provare che non lo è"}]},
{id:"s33", tipo:"titolo", tema:"profondo",
  titolo:"Identità **protetta**, ritorsioni **nulle**,<br>prova a carico dell'ente."},

// --- 6 · le altre misure
{id:"s34", tipo:"illustrata", tema:"chiaro", ill:"percorso", sopratitolo:"La prima misura",
  titolo:"La **rotazione** ordinaria", punti:[
    {icona:"persone", t:"nelle aree **più esposte**"},
    {icona:"avviso", t:"evita relazioni **opache** con fornitori e utenti", key:true}],
  etichette:{}},
{id:"s35", tipo:"confronto", tema:"chiaro", sopratitolo:"Quanto dura", col:[
  {h:"La legge", t:"non fissa una **durata**"},
  {h:"Il piano", t:"stabilisce i **criteri**", key:true}],
  sotto:"Se le competenze sono infungibili: misure alternative."},
{id:"s36", tipo:"tre", tema:"chiaro", sopratitolo:"La segregazione delle funzioni", box:[
  {n:"1", t:"Chi istruisce"},
  {n:"2", t:"Chi decide"},
  {n:"3", t:"Chi controlla", d:"persone diverse", key:true}]},
{id:"s37", tipo:"confronto", tema:"chiaro", sopratitolo:"La seconda misura: la formazione", col:[
  {h:"Generale", t:"per **tutti**"},
  {h:"Specifica", t:"per le aree **a rischio**", key:true}],
  sotto:"Dal 2023 il codice prevede anche formazione obbligatoria su etica e comportamento."},
{id:"s38", tipo:"norma", tema:"chiaro", etichetta:"L. 190/2012, art. 1, c. 17", sigla:"Patti di integrità",
  testo:"Il mancato rispetto può essere **causa di esclusione** dalla gara, se il bando lo prevede."},
{id:"s39", tipo:"icone", tema:"chiaro", sopratitolo:"Anche l'informatizzazione è una misura", voci:[
  {icona:"documento", t:"Gare **telematiche**"},
  {icona:"orologio", t:"Agende di prenotazione **informatizzate**"},
  {icona:"occhio", t:"Atti **tracciati**", key:true}]},
{id:"s40", tipo:"illustrata", tema:"chiaro", ill:"firma", sopratitolo:"Un esempio",
  titolo:"Il **patto** in gara", punti:[
    {icona:"divieto", t:"non offrire **utilità**"},
    {icona:"avviso", t:"segnalare ogni tentativo di **turbativa**"},
    {icona:"spunta", t:"chi lo viola è **escluso**", key:true}],
  etichette:{}},
{id:"s41", tipo:"trappola", tema:"tenue", sopratitolo:"Un errore delle dispense", righe:[
  {sb:"La legge impone di ruotare i dirigenti ogni cinque anni",
   ok:"La durata la fissa il piano di ogni amministrazione"}]},
{id:"s42", tipo:"titolo", tema:"profondo",
  titolo:"Ruotare, **separare**,<br>formare, far **firmare**."},

// --- 7 · le tre cose
{id:"s43", tipo:"memo", tema:"chiaro", attive:[0], sopratitolo:"Le tre cose da portare alla prova", voci:TRE_COSE},
{id:"s44", tipo:"memo", tema:"chiaro", attive:[0,1], sopratitolo:"Le tre cose da portare alla prova", voci:TRE_COSE},
{id:"s45", tipo:"memo", tema:"chiaro", attive:[0,1,2], sopratitolo:"Le tre cose da portare alla prova", voci:TRE_COSE},
{id:"s46", tipo:"trappola", tema:"tenue", sopratitolo:"L'ultimo distrattore", righe:[
  {sb:"La norma di riferimento è ancora l'art. 54-bis",
   ok:"Dal 2023 è il decreto legislativo 24"}]},

// --- 8 · chiusura
{id:"s47", tipo:"titolo", tema:"profondo",
  titolo:"Proteggere chi **parla**,<br>togliere **spazio** alla corruzione.",
  sotto:"Si chiude il modulo sull'anticorruzione. Prossimo: i dati personali."},

{id:"s48", tipo:"copertina", tema:"profondo", modulo:"Prossimo modulo",
  titolo:"Modulo 7", sottotitolo:"Trattamento dei<br>dati personali", ente:ENTE},
];
