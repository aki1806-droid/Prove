# Modulo 3 — Riformulazione ed empatia

Cinque lezioni, tutte con lo stesso trattamento: nessun avatar, voce unica di
Luca Ward tagliata a blocchi, slide animate a piena inquadratura, grafiche e
riprese generate. Ogni lezione ha il suo registro con i dettagli.

| lezione | video_id | durata | scene |
|---|---|---|---|
| 3.1 Perché riformulare funziona | `0ab68f2da10a32644d3da7cb77bff90b` | 5:56 | 44 |
| 3.2 Eco, sintesi, sentimento | `c6743d31a807473a4c75d8ff56cdccf5` | 5:46 | 46 |
| 3.3 Empatia non è essere d'accordo | `1c658ec7ef8e837723c2eb0c68049efd` | 5:46 | 49 |
| 3.4 Validare senza mentire | `c1d2184b04844d64b52a6ff4ce1a811a` | 5:46 | 50 |
| 3.5 Quando l'altro soffre e tu vuoi risolvere | `d32b2f0c27fa4a8149ec60415cc56284` | 5:47 | 50 |

Durata del modulo: **28 minuti e 41 secondi**.

## Cosa è cambiato rispetto al modulo 2

**I copioni sono stati riscritti, non adattati.** Gli script arrivavano fra i
3.400 e i 3.700 caratteri; in video sono diventati fra 5.500 e 5.800. La
differenza non è riempitivo: è il *come*, che negli script mancava quasi
sempre. Il test per capire se hai capito davvero (3.3), la differenza fra
ordine e descrizione (3.4), quanto è veloce l'impulso a risolvere (3.5).

**Due limiti di responsabilità sono rimasti interi.** Le note di montaggio
dicevano che la scena 8 della 3.4 e la scena 8 della 3.5 non si tagliano.
Nessuna delle due è stata toccata: sono diventate rispettivamente sei e cinque
blocchi, e ci si è aggiunto il concreto — cosa vuol dire, materialmente, non
lasciare sola una persona.

**Le grafiche sono cinquanta.** Tabelle, elenchi a rivelazione progressiva,
grafici a barre, sostituzioni con la freccia, due diagrammi e ventun icone
nuove disegnate per questo modulo. Sette icone sono state ridisegnate dopo
aver guardato il PNG: un'icona che non si legge a colpo d'occhio non serve a
niente, e questo si vede solo guardando.

## Cosa è cambiato negli strumenti

**`verifica.py`** (nato sulla 3.2): aggancia le code trascritte ai confini per
contenuto invece che per posizione. Lo scriba salta pezzi, ne fonde due e ne
spezza uno: con l'aggancio posizionale un solo errore sfasava tutto e faceva
sembrare sbagliati quaranta confini su quarantadue.

**`tagli.py`, due correzioni nate sulla 3.3**, dove il primo allineamento ha
sbagliato tutti e quarantacinque i confini tagliando dentro ai blocchi:

- i candidati sono solo le **pause più lunghe**, poco più numerose dei confini
  da collocare. Il respiro di metà frase non deve stare nell'elenco;
- c'è un **secondo giro** sulla stima a caratteri, che dava per scontata una
  velocità di lettura costante mentre l'apertura è più lenta (fino a 4,35
  secondi di scarto).

Il risultato si vede nel numero di tornate di correzione per lezione: 4 sulla
3.2, 4 sulla 3.3 (prima delle correzioni), 3 sulla 3.4, **2 sulla 3.5**.

## Cosa resta da giudicare ad Achille

Non sento l'audio e non vedo il montato. Per ogni lezione ho controllato le
slide da ferme e tutti i tagli con la trascrizione. Restano da guardare:

- le **tredici riprese Higgsfield** del modulo (foto e b-roll): il proxy
  blocca il CDN in scaricamento, quindi le ho descritte ma non viste;
- le **due pause senza parole** (3.4 e 3.5), nove secondi ciascuna. Sono state
  tarate sulla scelta fatta nella 2.3, dove Achille aveva chiesto di scendere
  da venticinque secondi a otto. Gli script ne chiedevano venticinque.
