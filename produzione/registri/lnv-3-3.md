# Registro — 3.3 «Lo sguardo nel gruppo»

**È l'unica lezione del corso con un segnale leggibile senza linea di base**, e
la lezione spiega perché: non si legge un individuo, si legge una convergenza.
La linea di base, qui, è la stanza.

| campo | valore |
|---|---|
| video_id | `b79f2fa1d5c14eca6b69fc96494d74c4` |
| scene | 50 — copertina, 48 blocchi, chiusura |
| formato | 16:9, 1080p |
| durata | 598,7 s (9:59) — misurata sul montato |
| parlato | 586,9 s (562,5 s di voce tagliata + 24,4 s di pose) |
| voce | Luca Ward `tVdVcJPudubxmTmAw4tE`, `eleven_v4`, 1,12× in post |
| flow ElevenLabs | `oXLPT1GPSA0Iz0LpUDAc` |
| tracce | A `pdJlXlZRY5UsGbJYO2Jc` · B `fN2mdQz0rDzha1bOd1Mq` · C `Vkpn8dUJhwe7TpG1J89d` |

La traccia B è la seconda generazione: la prima conteneva due aneddoti in
prima persona, che il modulo 3 non vuole (vedi sotto).

## Il copione è stato riscritto

Da **3.904** caratteri di parlato nello script a **10.422**, media 217 per
blocco. È lo script più corto del modulo, e quello che aveva più bisogno di
essere riempito.

Quello che mancava e che la lezione richiedeva:

- **perché qui la linea di base non serve** (`s04`–`s06`). Lo script afferma
  che il segnale è leggibile senza linea di base, ma non dice perché, e in un
  corso che ha passato due moduli a ripetere il contrario è un buco grosso.
  Il copione lo spiega: non stai leggendo un individuo, stai leggendo una
  distribuzione, e una convergenza di sei teste non ha bisogno di un normale
  di riferimento;
- **come si distinguono le due letture della terza configurazione** (`c12`).
  Guardare in basso può voler dire disagio oppure «è già deciso altrove», e
  sono due situazioni che chiedono comportamenti opposti. La differenza sta
  nel ritmo: nel disagio gli sguardi scappano e risalgono a controllare, nel
  già-deciso restano giù;
- **il micro-comportamento isolato in tre passaggi** (`c22`): dice la cosa che
  pesa, chiude la frase, guarda qualcuno. Lo script lo descrive a parole; qui
  è un diagramma, e si impara a vederlo;
- **la curva di chi non riceve sguardi** (`c39`), che è il punto più utile
  della lezione per chi coordina. Lo script chiede di non accorciare quella
  scena, e infatti occupa sei blocchi (`s37`–`s42`);
- **i due usi pratici del turno di parola**, che sono fra i pochissimi
  consigli operativi di tutto il corso, detti come tali.

## Rifatta in parte: il modulo 3 non vuole aneddoti

Il primo giro di scrittura conteneva due aneddoti in prima persona — una
riunione con un direttore, un collega di cui non avevo stima. **Le note in
fondo allo script del modulo 3 dicono «Nessun aneddoto nel modulo 3»**, e le
ho lette dopo aver scritto.

I blocchi `s18`, `s19`, `s28` e `s42` sono stati riscritti in terza persona:
la riunione resta, ma come configurazione descritta («Succede spesso che chi
parla di più non sia chi decide») invece che come episodio raccontato. Le tre
slide corrispondenti sono state rifatte e la traccia B rigenerata.

La regola sta adesso in `LNV_STANDARD-PRODUZIONE.md` §7.

## Le grafiche

Quarantasette slide, di cui **cinque con un disegno o un'infografica** e
**una ciclica**: `c39`.

| slide | tipo | cosa mostra |
|---|---|---|
| `c12` | confronto | Disagio diffuso e già-deciso-altrove: gli sguardi, il ritorno, se insistere. |
| `c16` | number | Un quarto di secondo: quanto dura il controllo sulla faccia di chi conta. |
| `c22` | flusso | Dice la cosa, chiude la frase, guarda qualcuno. |
| `c31` | bivio | Le due direzioni del turno: chi cede e chi chiede. |
| `c39` | linea (ciclica) | Un anno di riunioni: come si ritira chi non riceve sguardi. |

**Le ho guardate tutte e cinque da ferme prima di animarle**, e nessuna aveva
difetti da correggere. È la prima volta nel corso.

## Le tre riprese

| blocco | cosa | perché lì |
|---|---|---|
| `s07` | un tavolo da riunione ripreso dall'alto, sedie occupate, volti non riconoscibili | sta sull'invito a guardare la stanza invece di chi parla |
| `s29` | una sala riunioni vista dall'angolo, sedie attorno a un tavolo lungo, nessuno | apre la parte sul turno di parola: la stanza senza le persone, cioè la struttura |
| `s36` | una sedia leggermente arretrata rispetto alle altre, nessuno in campo | apre la scena su chi non riceve sguardi, e la dice senza mostrarne nessuno |

**Al momento del montaggio ne avevo viste due su tre.** Il connettore di
generazione aveva smesso di restituire l'anteprima dopo la prima coppia di
immagini, e la policy di rete chiudeva il CDN da cui si scaricherebbe: la
`s07` è stata montata senza che l'avessi guardata.

**Il 10 ottobre il CDN ha ripreso a rispondere e la `s07` è stata guardata.**
Va bene: tavolo da riunione dall'alto, dieci persone sedute, nessun volto
riconoscibile, nessun testo leggibile sui fogli, nessuna deformazione. È
quello che il blocco chiede.

**Una nota di composizione, non un difetto tecnico: le dieci persone attorno
al tavolo sembrano tutte uomini.** Il prompt non diceva niente sulla
composizione del gruppo e il generatore ha scelto da sé. In una lezione che
parla di chi viene guardato e chi no, è una scelta che vale la pena fare
apposta invece di subirla. Rigenerarla e rimontare costa poco — la decisione
è editoriale, non tecnica.

## I tagli

`banda.py banda` ha segnalato **quattro confini sospetti**, due coppie con la
firma uguale e opposta, tutte e due nella traccia C:

- `s37` +2,69 e `s38` −3,27 → confine spostato da 54,13 a 49,98 s. Residui
  −0,72 e +0,14;
- `s41` +3,78 e `s42` −3,84 → confine spostato da 114,03 a 109,89 s. Residui
  +0,10 e −0,16.

Dopo le due correzioni: **zero confini sospetti su quarantacinque.** Le stesse
due correzioni sono state riapplicate dopo la rigenerazione della traccia B,
perché `allinea` riscrive `tagli.json` da capo.

**La garanzia che si può dare**: tutti e quarantacinque i tagli cadono dentro
un silenzio. Ma uno è stretto: `s29` cade in un silenzio di **0,22 s** con
0,11 s di margine per lato, come i due più stretti della 2.5. Non spezza una
parola, ma va risentito per primo.

**I confini non sono verificati parola per parola**: crediti ElevenLabs
esauriti, trascrizione di controllo impossibile.

## Da verificare

Non sento l'audio e non vedo il montato. Ho guardato tutte e cinque le slide
con un disegno e **tutte e tre le riprese** (la `s07` dopo il montaggio,
quando il CDN è tornato raggiungibile).
**I quarantacinque tagli non sono verificati con la trascrizione**, e uno cade
in un silenzio di 0,22 s.

## Blocchi


| blocco | slide | tipo | durata (s) | posa (s) |
|---|---|---|---|---|
| s02 | `c02` | frase | 14.64 | +0.05 |
| s03 | `c03` | frase | 10.73 | +0.05 |
| s04 | `c04` | frase | 11.34 | +0.05 |
| s05 | `c05` | frase | 14.99 | +0.05 |
| s06 | `c06` | memo | 11.98 | +0.65 |
| s07 | ▪ tavolo-da-riunione-dall-alto | ripresa | 3.02 | — |
| s08 | `c08` | elenco | 8.78 | +0.95 |
| s09 | `c09` | elenco | 12.11 | +0.95 |
| s10 | `c10` | elenco | 15.53 | +0.95 |
| s11 | `c11` | elenco | 12.99 | +0.95 |
| s12 | · `c12` | confronto | 17.18 | +1.35 |
| s13 | `c13` | elenco | 13.45 | +0.95 |
| s14 | `c14` | frase | 10.55 | +0.05 |
| s15 | `c15` | frase | 13.01 | +0.05 |
| s16 | `c16` | numero | 10.95 | +0.95 |
| s17 | `c17` | elenco | 17.42 | +0.95 |
| s18 | `c18` | frase | 13.05 | +0.05 |
| s19 | `c19` | frase | 14.29 | +0.05 |
| s20 | `c20` | memo | 4.65 | +1.32 |
| s21 | `c21` | frase | 7.56 | +0.05 |
| s22 | · `c22` | flusso | 13.00 | +1.35 |
| s23 | `c23` | elenco | 15.01 | +0.95 |
| s24 | `c24` | frase | 9.21 | +0.05 |
| s25 | `c25` | frase | 14.73 | +0.05 |
| s26 | `c26` | frase | 15.10 | +0.05 |
| s27 | `c27` | frase | 10.51 | +0.05 |
| s28 | `c28` | frase | 11.65 | +0.05 |
| s29 | ▪ sala-riunioni-vuota-dall-angolo | ripresa | 4.30 | — |
| s30 | `c30` | frase | 9.33 | +0.05 |
| s31 | · `c31` | bivio | 12.72 | +1.35 |
| s32 | `c32` | elenco | 15.30 | +0.95 |
| s33 | `c33` | elenco | 13.52 | +0.95 |
| s34 | `c34` | elenco | 14.95 | +0.95 |
| s35 | `c35` | frase | 9.84 | +0.05 |
| s36 | ▪ una-sedia-arretrata | ripresa | 3.23 | — |
| s37 | `c37` | frase | 15.83 | +0.05 |
| s38 | `c38` | frase | 9.49 | +0.05 |
| s39 | · `c39` | linea | 15.61 | +1.35 |
| s40 | `c40` | memo | 14.38 | +0.65 |
| s41 | `c41` | frase | 14.10 | +0.05 |
| s42 | `c42` | frase | 8.30 | +0.05 |
| s43 | `c43` | frase | 12.22 | +0.05 |
| s44 | `c44` | elenco | 17.15 | +0.95 |
| s45 | `c45` | frase | 13.81 | +0.05 |
| s46 | `c46` | elenco | 13.57 | +0.95 |
| s47 | `c47` | elenco | 15.59 | +0.95 |
| s48 | `c48` | memo | 4.65 | +1.07 |
| s49 | `c49` | elenco | 21.59 | +0.95 |
