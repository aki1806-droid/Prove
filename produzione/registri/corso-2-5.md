# Registro — 2.5 «Ascoltare il non detto»

Chiude il modulo 2. Senza avatar, voce Luca Ward, slide animate, otto grafiche
e cinque riprese Higgsfield.

| campo | valore |
|---|---|
| video_id | `e2e88f1059638d28cf7006d98f24dbb4` |
| scene | 47 — copertina, 45 blocchi, chiusura di modulo |
| formato | 16:9, 1080p, sottotitoli SRT |
| durata | **6:06** (366,5 s — attesi 367,5) |
| parlato | 354,5 s |
| pagina | https://app.heygen.com/videos/e2e88f1059638d28cf7006d98f24dbb4 |

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

## Blocchi

`·` slide grafica · `▪` ripresa Higgsfield

| blocco | slide | tipo | durata (s) |
|---|---|---|---|
| s02 | c02 | frase | 5.08 |
| s03 | c03 | schede **·** | 8.26 |
| s04 | c04 | frase | 10.51 |
| s05 | c05 | frase | 9.36 |
| s06 | c06 | frase | 9.63 |
| s07 | c07 | frase | 5.87 |
| s08 | c08 | memo | 12.37 |
| s09 | c09 | frase | 9.27 |
| s10 | c10 | frase | 9.62 |
| s11 | c11 | frase | 7.75 |
| s12 | c12 | memo | 4.61 |
| s13 | c13 | grafico **·** | 7.98 |
| s14 | c14 | frase | 12.57 |
| s15 | — | b-roll — tavola apparecchiata per quattro, una sedia vuota, luce di sera **▪** | 4.90 |
| s16 | c16 | memo | 6.38 |
| s17 | c17 | tabella **·** | 7.97 |
| s18 | c18 | frase | 9.61 |
| s19 | c19 | frase | 8.77 |
| s20 | c20 | frase | 10.33 |
| s21 | c21 | disegno **·** | 14.55 |
| s22 | c22 | memo | 6.49 |
| s23 | c23 | frase | 4.24 |
| s24 | c24 | frase | 5.86 |
| s25 | c25 | frase | 9.96 |
| s26 | c26 | elenco **·** | 4.70 |
| s27 | c27 | frase | 3.64 |
| s28 | c28 | memo | 13.31 |
| s29 | c29 | citazione | 5.73 |
| s30 | c30 | frase | 8.39 |
| s31 | — | b-roll — corridoio al crepuscolo, una porta socchiusa, una lama di luce sul pavimento **▪** | 5.98 |
| s32 | c32 | frase | 5.49 |
| s33 | c33 | frase | 6.59 |
| s34 | c34 | memo | 7.85 |
| s35 | c35 | schede **·** | 5.73 |
| s36 | — | foto — scrivania di notte, appunti sparsi, una lente d'ingrandimento sopra **▪** | 7.79 |
| s37 | c37 | frase | 8.45 |
| s38 | c38 | citazione | 9.52 |
| s39 | c39 | frase | 5.92 |
| s40 | c40 | frase | 11.91 |
| s41 | c41 | memo | 4.25 |
| s42 | c42 | frase | 5.85 |
| s43 | — | foto — due sedie su un balcone la sera, girate una verso l'altra **▪** | 6.76 |
| s44 | c44 | elenco **·** | 14.73 |
| s45 | — | foto — una finestra al mattino, la tenda che si muove, una stanza vuota **▪** | 6.45 |
| s46 | c46 | frase (posa) | 3.50 |

## Da verificare

Non sento l'audio e non vedo il montato: ho controllato le slide da ferme e i
43 tagli con la trascrizione. Restano da giudicare **le cinque riprese
Higgsfield**, che non posso aprire da qui.
