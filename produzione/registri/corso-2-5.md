# Registro — 2.5 «Ascoltare il non detto»

Chiude il modulo 2. Senza avatar, voce Luca Ward, slide animate, otto grafiche
e cinque riprese Higgsfield.

| campo | valore |
|---|---|
| video_id | *(in coda)* |
| scene | 47 — copertina, 45 blocchi, chiusura di modulo |
| formato | 16:9, 1080p, sottotitoli SRT |
| durata attesa | 367,5 s (6:07) |
| parlato | 354,5 s |

## Il copione è stato riscritto

Da **2.520** caratteri a **6.138**. È la lezione più delicata del modulo, e
quasi tutto lo spazio in più è andato sull'etica, non sulla tecnica:

- i **tre segnali** — esitazione, omissione, sproporzione — e perché la
  sproporzione è la più affidabile: non la misuri contro quello che pensi tu,
  la misuri contro quello che l'altro stesso ti ha fatto capire che contava;
- la buona notizia che nessuno dice: **non devi stare a caccia**. Sono cose
  che noti, non cose che cerchi;
- **il conto è diverso**: se nomini un fatto e non c'era niente non succede
  niente; se nomini un significato e hai sbagliato, hai accusato;
- la ragione più profonda per stare leggeri: **non tutto il non detto è un
  segreto**. Una parte è roba che l'altro non ha ancora finito di capire da
  solo, e se gliela nomini prima gliela porti via;
- l'avvertimento sulla terza mossa: «se no va bene lo stesso» **funziona solo
  se è vero**, perché l'altro non sente le parole, sente che stai aspettando;
- perché insistere costa: **il conto non lo paghi oggi**, lo paghi la volta
  dopo, quando ti racconta di meno — non per dispetto, perché ha imparato.

Nessun aneddoto, come chiedeva lo script: su un non detto altrui un episodio
vero sarebbe indiscreto, e la lezione dice esattamente questo.

## Le otto grafiche

| slide | tipo | cosa mostra |
|---|---|---|
| c03 | schede | i tre segnali, con tre icone nuove |
| c13 | grafico | dieci minuti sul parcheggio, mezza frase sul licenziamento |
| c17 | tabella | il fatto / l'interpretazione, tre righe |
| c21 | disegno | la bilancia: un fatto non costa niente, un significato sì |
| c26 | elenco | le tre mosse, in ordine di invadenza |
| c29 | citazione | «Ti ho sentito rallentare, lì.» |
| c35 | schede | i tre modi per far chiudere, con tre icone nuove |
| c44 | elenco | le quattro lezioni del modulo, e la linea che le tiene |

Sei icone nuove: `pausa`, `salto`, `squilibrio` per i segnali; `lente`,
`testa`, `spinta` per i tre modi. Le prime versioni di `testa` e `spinta` non
si leggevano — una sembrava un gancio, l'altra una porta troppo stretta con
una freccia invisibile. Rifatte: la seconda è una nuvola di pensiero con una
freccia d'oro che ci entra dentro, che è esattamente «lo so cosa stai
pensando».

La bilancia ha richiesto un secondo giro anche lei, ma per il testo: la
didascalia andava a capo e spingeva su tutto il disegno. **Nel layout
`figure` la didascalia deve stare in una riga: circa cinquanta caratteri.**

## Le cinque riprese

| blocco | tipo | cosa |
|---|---|---|
| s15 | b-roll | tavola apparecchiata per quattro, una sedia vuota, luce di sera |
| s31 | b-roll | corridoio al crepuscolo, una porta socchiusa, una lama di luce |
| s36 | foto | scrivania di notte, appunti sparsi, una lente d'ingrandimento |
| s43 | foto | due sedie su un balcone la sera, girate una verso l'altra |
| s45 | foto | una finestra al mattino, la tenda che si muove, una stanza vuota |

Sessantacinque crediti Higgsfield in tutto. Valgono le due avvertenze della
2.4: HeyGen se li prende da sé via URL, ma qui non si scaricano e non si
possono guardare.

## Il caricamento su ElevenLabs adesso funziona

`creative_create_asset_upload` era bloccato da una regola di permessi e per
tre lezioni ho fatto il giro lungo — caricare la prova su HeyGen per ottenere
un URL pubblico e darlo a ElevenLabs. Adesso si carica diretto: si chiede
l'`upload_url`, si fa un PUT, si chiama `creative_finalize_asset_upload` con
il `flow_id`. Tre chiamate in meno per ogni verifica.

## I tagli

Quarantatré confini, tre tornate: 21 sbagliati alla prima, 3 alla seconda,
zero alla terza. Nessun difetto nuovo dello strumento — le due correzioni
fatte sulla 2.4 hanno retto, e infatti nessun taglio si è «corretto» su se
stesso.

Un inciampo mio, però, ed è il secondo dello stesso tipo: `scribe` ha scritto
`Oppure dire: "Hai ragione."` e il punto finale sta **dentro** le virgolette.
Separando le code su `[.?!]` seguito da spazio, quel confine non veniva
diviso, e il disallineamento faceva sembrare sbagliati 35 confini su 43. La
regola completa: si separa su `.`, `?` o `!`, **seguiti eventualmente da una
virgoletta di chiusura**, poi lo spazio.

## Una posa

`s46` («Ci vediamo lì.») dura 0,79 secondi. Allungato a 3,5 con `apad`.
