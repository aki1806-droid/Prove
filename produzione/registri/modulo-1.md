# Modulo 1 — Le basi

Cinque lezioni rifatte da capo con il trattamento approvato dal modulo 2 in
poi: nessun avatar, voce unica di Luca Ward tagliata a blocchi, slide animate
a piena inquadratura, grafiche e riprese generate. Ogni lezione ha il suo
registro con i dettagli; in fondo a ciascuno restano gli id delle versioni
vecchie con l'avatar.

| lezione | video_id | durata | scene |
|---|---|---|---|
| 1.1 Non è questione di parole | `4676c470ab93793c6dfcd47477c6e916` | 5:48 | 50 |
| 1.2 Il significato lo decide chi ascolta | `c1c7aa3dddcfccc61d89aa80d527f2bc` | 5:39 | 50 |
| 1.3 I tre livelli: contenuto, relazione, intenzione | `cac7ddae7871b16aac6846edb703ad23` | 5:29 | 50 |
| 1.4 Il paraverbale: tono, ritmo, pause | `5e100fd011505e70f0eb3c4c093a2ec5` | 5:50 | 50 |
| 1.5 La prima cosa da smettere di fare | `5b772935831a3fcebfb99b3684ef9341` | 5:35 | 50 |

Durata del modulo: **28 minuti e 22 secondi**.

## Cosa è cambiato rispetto alle versioni vecchie

**I copioni sono stati riscritti, non adattati.** Gli script del modulo 1
erano i più corti di tutto il corso: fra i **2.660** e i **3.284** caratteri,
contro i 3.400-3.700 del modulo 3. In video sono diventati fra 5.494 e 5.855.
Il modulo 1 è quello che presenta il corso, e presentava male: aveva le tesi e
non aveva quasi mai il perché.

**Ogni lezione ha una struttura, non un elenco.** I quattro filtri della 1.2,
i tre livelli della 1.3, le quattro leve della 1.4, le tre maschere della 1.5:
prima erano una slide con quattro righe, adesso sono una slide accesa una voce
alla volta più un blocco a testa che dice cosa vuol dire.

**Tre lezioni su cinque hanno un aneddoto inventato in prima persona** (1.1,
1.2, 1.4), come prescrive il metodo. La 1.3 e la 1.5 non ce l'hanno, ed è
voluto: la 1.3 fa lavorare il ricordo di chi guarda, e la nota di montaggio
della 1.5 chiedeva esplicitamente il registro del confronto diretto.

**Le grafiche sono quarantatré**, più quindici riprese Higgsfield. Otto icone
nuove — `pausaprima`, `pausadopo`, `pausainvece`, `riempire`, `accelera`,
`annuire`, e le sette del modulo già in `slide_corso.mjs` — di cui **cinque
ridisegnate dopo aver guardato il PNG**. Le tre icone della pausa, alla prima
stesura, erano tre linee con un buchino in mezzo e a 104 pixel si somigliavano
tutte.

## Cosa è cambiato negli strumenti

Il modulo 1 ha aggiunto allo standard **un controllo che il modulo 3 non
aveva**: il rapporto caratteri/secondo blocco per blocco, letto su
`durate.json` dopo `applica`.

Serve perché contare i pezzi della trascrizione non basta. Lo scriba ha
sbagliato in due modi che il conteggio non vede:

- nella **1.3** ha saltato la coda di un confine. `verifica.py` riappaia per
  contenuto, quindi non se ne accorge, e `correggi` lascia quel confine dov'è:
  era quattro secondi e mezzo fuori posto;
- nella **1.4** ha fatto di peggio: un pezzo in più (una frase interna a un
  blocco, chiusa da un punto) e uno in meno. I conti tornavano — 46 pezzi, 46
  confini — ma tre finestre erano sfalsate di uno.

In tutti e due i casi il segnale era lo stesso: due blocchi adiacenti, uno a
cinque caratteri al secondo e l'altro a cinquanta. Trovato il punto giusto sui
caratteri, si cerca il silenzio più vicino e si conferma con una controprova
di tre secondi, che costa meno di venti crediti.

La **1.5** ha aggiunto il caso limite: fra due blocchi la voce può non fare
nessuna pausa — succede quando il secondo blocco non comincia con una frase
nuova, come il memo spezzato in due — e allora non c'è nessun silenzio da
scegliere. Si prende il punto sui caratteri, si accetta il taglio secco, e il
respiro lo rimette la posa che segue.

Tornate di correzione per lezione: 2 sulla 1.1, 1 sulla 1.2, 3 sulla 1.3, 2
sulla 1.4 più una ricostruzione a mano, 2 sulla 1.5 più una ricostruzione a
mano.

## Cosa resta da giudicare ad Achille

Non sento l'audio e non vedo il montato. Per ogni lezione ho controllato le
slide da ferme e tutti i tagli con la trascrizione, più tre controprove
mirate. Restano da guardare le **quindici riprese Higgsfield** del modulo: il
proxy blocca il CDN in scaricamento, quindi le ho descritte ma non viste.

Una nota sulle durate: vanno da 5:29 a 5:50, contro l'obiettivo di 6:00 degli
script. La differenza non è testo mancante — i copioni stanno tutti fra 5.494
e 5.855 caratteri — ma la velocità con cui la voce li ha letti, che varia di
lezione in lezione fra 17 e 20 caratteri al secondo. Dove è stata più veloce
(1.3) le pose sono più lunghe, ma allungarle oltre vorrebbe dire aggiungere
silenzio, non contenuto.
