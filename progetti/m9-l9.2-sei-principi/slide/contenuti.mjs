// Contenuto delle 50 scene della lezione 9.2. *accento*  **accento in semibold**
//
// Corso «Progressione verticale · Comparto Sanità», Modulo 9. I sei principi:
// D.Lgs. 81/2008 art. 2 (lett. n, o, q, r, s, aa, bb, cc), art. 15 cc. 1-2.

const ENTE = "CISL FP Padova Rovigo · Progressione verticale · Comparto Sanità";

const TRE_COSE = [
  "**Pericolo**: proprietà intrinseca di un fattore; **rischio**: probabilità che produca un danno",
  "Art. 15: prima la **valutazione** e l'**eliminazione** alla fonte; la protezione **collettiva** prima di quella individuale",
  "Partecipazione, programmazione, formazione, **miglioramento continuo**; la sicurezza **non costa** nulla al lavoratore",
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 9 · Salute e sicurezza sul lavoro",
  titolo:"I sei principi", sottotitolo:"Lezione 9.2", ente:ENTE},

// --- 1 · aggancio
{id:"s02", tipo:"confronto", tema:"chiaro", sopratitolo:"Un disinfettante molto irritante", col:[
  {h:"Strada 1", t:"una **mascherina** a tutti"},
  {h:"Strada 2", t:"**cambiare** prodotto", key:true}]},
{id:"s03", tipo:"illustrata", tema:"chiaro", ill:"documento", sopratitolo:"D.Lgs. 81/2008, art. 15",
  titolo:"Le misure generali di **tutela**", punti:[
    {icona:"libro", t:"non sono **consigli**"},
    {icona:"ingranaggio", t:"sono il **metodo** del datore di lavoro", key:true}],
  etichette:{titolo:"Art. 15", sigillo:{t:"Obbligo", key:true}}},
{id:"s04", tipo:"titolo", tema:"profondo",
  titolo:"Prima si toglie il **pericolo**,<br>poi ci si **protegge**."},

// --- 2 · rotta
{id:"s05", tipo:"flusso", tema:"chiaro", sopratitolo:"Quattro passaggi", passi:[
  {icona:"libro", t:"Le parole di base"},
  {icona:"scudo", t:"Prevenire e valutare"},
  {icona:"persone", t:"Partecipare e programmare", key:true},
  {icona:"cappello", t:"Formare e migliorare"}]},
{id:"s06", tipo:"confronto", tema:"chiaro", sopratitolo:"Un elenco lungo", col:[
  {h:"Articolo 15", t:"dalla lettera **a** alla lettera **z**"},
  {h:"Per ricordarlo", t:"**sei principi**", key:true}]},

// --- 3 · pericolo, rischio, prevenzione
{id:"s07", tipo:"illustrata", tema:"chiaro", ill:"cartello", sopratitolo:"Art. 2, lett. r",
  titolo:"Il **pericolo**", punti:[
    {icona:"avviso", t:"una **proprietà intrinseca**"},
    {icona:"goccia", t:"un agente chimico, una macchina, un **virus**", key:true}],
  etichette:{alto:{t:"Pericolo", key:true}}},
{id:"s08", tipo:"illustrata", tema:"chiaro", ill:"cruscotto", sopratitolo:"Art. 2, lett. s",
  titolo:"Il **rischio**", punti:[
    {icona:"bilancia", t:"la **probabilità** che il danno avvenga"},
    {icona:"orologio", t:"quanto, come, per quanto tempo si è **esposti**", key:true}],
  etichette:{alto:{t:"Rischio", key:true}, sx:"Basso", dx:"Alto"}},
{id:"s09", tipo:"confronto", tema:"chiaro", sopratitolo:"Come si stima", col:[
  {h:"Probabilità", t:"quanto è **probabile** l'evento"},
  {h:"Gravità", t:"quanto sarebbe **grave** il danno", key:true}]},
{id:"s10", tipo:"illustrata", tema:"chiaro", ill:"siringa", sopratitolo:"Un esempio",
  titolo:"Lo stesso **ago**", punti:[
    {icona:"divieto", t:"reincappucciato a mano: rischio **alto**"},
    {icona:"spunta", t:"nel contenitore rigido: rischio **basso**", key:true}],
  etichette:{alto:{t:"Pericolo uguale", key:true}, sx:"Ago", dx:"Contenitore"}},
{id:"s11", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Stessi pericoli, rischi diversi", celle:[
  {t:"**Organizzazione**"}, {t:"**Procedure**"},
  {t:"**Strumenti**"}, {t:"**Formazione**"}]},
{id:"s12", tipo:"norma", tema:"chiaro", etichetta:"Art. 2, lett. n", sigla:"Prevenzione",
  testo:"Le misure per **evitare o diminuire** i rischi, nel rispetto della **popolazione** e dell'**ambiente**."},
{id:"s13", tipo:"tre", tema:"chiaro", attive:[0,1,2], sopratitolo:"Art. 2, lett. o · la salute", box:[
  {n:"1", t:"Fisico", d:"il benessere del corpo"},
  {n:"2", t:"Mentale", d:"il benessere della mente"},
  {n:"3", t:"Sociale", d:"le relazioni"}]},
{id:"s14", tipo:"trappola", tema:"tenue", sopratitolo:"Occhio a un distrattore", righe:[
  {sb:"Pericolo e rischio sono sinonimi",
   ok:"Il pericolo è la fonte, il rischio è la probabilità del danno"}]},
{id:"s15", tipo:"titolo", tema:"profondo",
  titolo:"Il **pericolo** resta,<br>il **rischio** si può governare."},

// --- 4 · prevenire e valutare
{id:"s16", tipo:"confronto", tema:"chiaro", sopratitolo:"1 · La prevenzione primaria", col:[
  {h:"Prima", t:"**eliminare** i rischi", key:true},
  {h:"Se non si può", t:"**ridurli** al minimo"}]},
{id:"s17", tipo:"catena", tema:"chiaro", sopratitolo:"Un ordine preciso", passi:[
  {t:"Ridurre", d:"alla fonte"},
  {t:"Sostituire", d:"con ciò che è meno pericoloso"},
  {t:"Limitare", d:"gli esposti", key:true}]},
{id:"s18", tipo:"confronto", tema:"chiaro", sopratitolo:"Art. 15, lett. i · la priorità", col:[
  {h:"Protezione collettiva", t:"una **cappa** aspirante", key:true},
  {h:"Protezione individuale", t:"poi la **mascherina**"}]},
{id:"s19", tipo:"flusso", tema:"chiaro", sopratitolo:"Torniamo al disinfettante", passi:[
  {icona:"goccia", t:"Sostituire", d:"il prodotto"},
  {icona:"ingranaggio", t:"Aerare", d:"l'ambiente"},
  {icona:"scudo", t:"DPI", d:"per il rischio residuo", key:true}]},
{id:"s20", tipo:"illustrata", tema:"chiaro", ill:"lente", sopratitolo:"2 · La valutazione dei rischi",
  titolo:"Globale e **documentata**", punti:[
    {icona:"documento", t:"la **prima** misura dell'elenco"},
    {icona:"occhio", t:"**tutti** i rischi dell'organizzazione", key:true}],
  etichette:{}},
{id:"s21", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Non solo le macchine", celle:[
  {t:"**Organizzazione** e turni"}, {t:"**Ergonomia** dei posti"},
  {t:"Lavoro **monotono** e ripetitivo"}, {t:"Gruppi più **esposti**"}]},
{id:"s22", tipo:"flusso", tema:"chiaro", sopratitolo:"Art. 15, lett. l e m", passi:[
  {icona:"cuoremano", t:"Controllo", d:"sanitario"},
  {icona:"persona", t:"Allontanamento", d:"per motivi di salute"},
  {icona:"cartella", t:"Altra mansione", d:"ove possibile", key:true}]},
{id:"s23", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione", righe:[
  {sb:"I DPI sono la prima misura di sicurezza",
   ok:"Sono l'ultima barriera, per il rischio residuo"}]},
{id:"s24", tipo:"titolo", tema:"profondo",
  titolo:"**Eliminare**, ridurre, sostituire.<br>Poi **proteggere**."},

// --- 5 · partecipare e programmare
{id:"s25", tipo:"icone", tema:"chiaro", sopratitolo:"3 · La partecipazione · art. 15, lett. r e s", voci:[
  {icona:"persone", t:"Partecipazione dei **lavoratori**"},
  {icona:"chat", t:"Consultazione dei **rappresentanti**"}]},
{id:"s26", tipo:"confronto", tema:"chiaro", sopratitolo:"Chi lavora in reparto", col:[
  {h:"Non solo", t:"informato **a cose fatte**"},
  {h:"Ma", t:"**ascoltato** prima", key:true}]},
{id:"s27", tipo:"illustrata", tema:"chiaro", ill:"timone", sopratitolo:"4 · La programmazione · art. 15, lett. b",
  titolo:"Un insieme **coerente**", punti:[
    {icona:"ingranaggio", t:"tecnica e **ambiente**"},
    {icona:"persone", t:"**organizzazione** del lavoro", key:true}],
  etichette:{alto:{t:"Programmare", key:true}}},
{id:"s28", tipo:"tre", tema:"chiaro", attive:[0,1,2], sopratitolo:"Programmare vuol dire decidere", box:[
  {n:"1", t:"Priorità", d:"che cosa prima"},
  {n:"2", t:"Tempi", d:"entro quando"},
  {n:"3", t:"Responsabili", d:"chi lo fa"}]},
{id:"s29", tipo:"flusso", tema:"chiaro", sopratitolo:"Il mal di schiena in reparto", passi:[
  {icona:"chat", t:"Segnalazione"},
  {icona:"persone", t:"Riunione", d:"con il rappresentante"},
  {icona:"ingranaggio", t:"Sollevatori", d:"e formazione", key:true}]},
{id:"s30", tipo:"illustrata", tema:"chiaro", ill:"estintore", sopratitolo:"Art. 15, lett. u e z",
  titolo:"Emergenze e **manutenzione**", punti:[
    {icona:"cuoremano", t:"primo soccorso, **antincendio**, evacuazione"},
    {icona:"ingranaggio", t:"manutenzione di ambienti e **impianti**", key:true}],
  etichette:{alto:{t:"Emergenza", key:true}, sx:"Estintore", dx:"Uscita"}},
{id:"s31", tipo:"illustrata", tema:"chiaro", ill:"cartello", sopratitolo:"Art. 15, lett. q e v",
  titolo:"Istruzioni e **segnali**", punti:[
    {icona:"documento", t:"istruzioni **adeguate**"},
    {icona:"avviso", t:"un cartello chiaro, nel **posto giusto**", key:true}],
  etichette:{alto:{t:"Segnaletica", key:true}}},
{id:"s32", tipo:"trappola", tema:"tenue", sopratitolo:"Un distrattore frequente", righe:[
  {sb:"Consultare i lavoratori è una cortesia facoltativa",
   ok:"È una misura generale di tutela prevista dalla legge"}]},
{id:"s33", tipo:"titolo", tema:"profondo",
  titolo:"Chi conosce il **rischio**,<br>partecipa alle **scelte**."},

// --- 6 · formare e migliorare
{id:"s34", tipo:"tre", tema:"chiaro", attive:[0,1,2], sopratitolo:"5 · La formazione · art. 15, lett. n-p", box:[
  {n:"1", t:"Lavoratori", d:"informazione e formazione"},
  {n:"2", t:"Dirigenti e preposti", d:"informazione e formazione"},
  {n:"3", t:"Rappresentanti", d:"per la sicurezza"}]},
{id:"s35", tipo:"flusso", tema:"chiaro", sopratitolo:"Art. 2, lett. aa, bb, cc", passi:[
  {icona:"chat", t:"Informazione", d:"conoscere"},
  {icona:"cappello", t:"Formazione", d:"capire"},
  {icona:"ingranaggio", t:"Addestramento", d:"saper fare", key:true}]},
{id:"s36", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Quando si ripete", celle:[
  {t:"**Periodicamente**"}, {t:"Nuova **mansione**"},
  {t:"Nuove **attrezzature** e tecnologie"}, {t:"Nuove **sostanze**"}]},
{id:"s37", tipo:"illustrata", tema:"chiaro", ill:"podio", sopratitolo:"6 · Il miglioramento continuo · art. 15, lett. t",
  titolo:"Sempre un po' **meglio**", punti:[
    {icona:"libro", t:"codici di condotta"},
    {icona:"spunta", t:"**buone prassi**", key:true}],
  etichette:{alto:{t:"Miglioramento", key:true}}},
{id:"s38", tipo:"ciclo", tema:"chiaro", sopratitolo:"Non un traguardo",
  centro:"Sicurezza", dcentro:"un processo continuo", fasi:[
  {icona:"occhio", t:"Misurare"},
  {icona:"documento", t:"Rivedere"},
  {icona:"ingranaggio", t:"Aggiornare", key:true}]},
{id:"s39", tipo:"illustrata", tema:"chiaro", ill:"archivio", sopratitolo:"I quasi incidenti",
  titolo:"Segnalare per **prevenire**", punti:[
    {icona:"avviso", t:"nessun danno, ma **avrebbe potuto**"},
    {icona:"lucchetto", t:"analizzarli previene quelli **veri**", key:true}],
  etichette:{cassetto:{t:"Segnalazioni", key:true}}},
{id:"s40", tipo:"flusso", tema:"chiaro", sopratitolo:"Un esempio: le punture accidentali", passi:[
  {icona:"scudo", t:"Aghi", d:"con dispositivo di sicurezza"},
  {icona:"cappello", t:"Formazione", d:"del personale"},
  {icona:"orologio", t:"Verifica", d:"dopo sei mesi", key:true}]},
{id:"s41", tipo:"confronto", tema:"chiaro", sopratitolo:"D.Lgs. 81/2008, art. 15, c. 2 · chi paga la sicurezza", col:[
  {h:"L'azienda", t:"tutte le **misure** di sicurezza", key:true},
  {h:"Il lavoratore", t:"**mai**, in nessun caso"}]},
{id:"s42", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"A carico dell'azienda", celle:[
  {t:"**Dispositivi** di protezione"}, {t:"**Formazione**"},
  {t:"**Visite** mediche"}, {t:"Formazione in **orario di lavoro**"}]},
{id:"s43", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione", righe:[
  {sb:"Informazione, formazione e addestramento sono la stessa cosa",
   ok:"Conoscere, capire, saper fare"}]},
{id:"s44", tipo:"titolo", tema:"profondo",
  titolo:"**Sapere**, saper **fare**,<br>e fare sempre un po' **meglio**."},

// --- 7 · le tre cose
{id:"s45", tipo:"memo", tema:"chiaro", attive:[0], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s46", tipo:"memo", tema:"chiaro", attive:[0,1], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s47", tipo:"memo", tema:"chiaro", attive:[0,1,2], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s48", tipo:"trappola", tema:"tenue", sopratitolo:"L'ultimo distrattore", righe:[
  {sb:"L'azienda può far pagare DPI e corsi obbligatori",
   ok:"Lo vieta l'articolo 15, comma 2"}]},

// --- 8 · chiusura
{id:"s49", tipo:"titolo", tema:"profondo",
  titolo:"Si **valuta**, si elimina, si riduce,<br>si **coinvolge**, si forma, si **migliora**.",
  sotto:"Prossima lezione: il campo di applicazione."},

{id:"s50", tipo:"copertina", tema:"profondo", modulo:"Prossima lezione",
  titolo:"Lezione 9.3", sottotitolo:"Campo di applicazione", ente:ENTE},
];
