# Da dove vengono queste trascrizioni

Per le lezioni 16.1-16.4 le ha fatte `eleven_scribe_v1`. Per la 16.5 no: al
momento della verifica il servizio rispondeva **malformato** su tutti gli
strumenti che creano un asset audio (`creative_attach_reference_file`,
`creative_add_flow_asset_node`, `creative_create_asset_upload`), cioe' proprio
quelli che servono a dargli un file da ascoltare. Nove tentativi in venti
minuti, tutti uguali. Nessun addebito: il conteggio dei nodi sul flow e'
rimasto fermo, quindi le chiamate non erano arrivate.

C'e' una scorciatoia che sembra funzionare e **non funziona**: collegare la
trascrizione direttamente al nodo che ha generato la voce. Torna un testo, ma
e' il copione di partenza riallineato sull'audio — con gli apostrofi di comodo
(`e'`, `piu'`) e i tag di intenzione (`[warm]`) dentro. La verifica direbbe
100% per costruzione senza aver ascoltato niente. L'ho fatto, me ne sono
accorto dalla controprova del MASTER, e l'ho buttato.

Queste le ha fatte **vosk-model-small-it-0.22**, in locale, sulle stesse due
tracce grezze. E' un riconoscitore piccolo: sbaglia le sigle e le parole
inglesi, e infatti tutti e 34 gli scarti sono di quel tipo (`tso` -> «ti esse
o», `recovery` -> «ricoveri», `de escalation` -> «scale scion»). Per questo la
coincidenza e' 95,5% e 94,4% invece del 99,7% di Scribe.

**Ma la domanda a cui questa verifica deve rispondere e' un'altra**: la voce ha
detto tutto? Si. Zero buchi sulla traccia A, uno solo sulla B — `dsm csm e
spdc` reso «di seme ci assieme esse pidocchi», che e' il riconoscitore che
sillaba le lettere di DSM, CSM e SPDC una per una. Le sigle sono state
pronunciate; e' la trascrizione a non saperle scrivere.

Il punto di debolezza resta: un modello piccolo potrebbe nascondere un buco
vero dentro il rumore dei suoi errori. Se il servizio torna, vale la pena
rifare la verifica con Scribe prima di considerarla definitiva.
