# Modulo 1 — Il terreno

Primo modulo del corso «Capire i segni del linguaggio non verbale». Cinque
lezioni da dieci minuti con il trattamento standard: **nessun avatar**, voce
unica di **Luca Ward** su `eleven_v4` tagliata a blocchi, slide animate a
piena inquadratura, diagrammi parametrici e infografiche, riprese generate.
Ogni lezione ha il suo registro con i dettagli.

| lezione | video_id | durata | scene |
|---|---|---|---|
| 1.1 Cosa puoi vedere e cosa no | `7d8cc3f42b1723f8202dc47b4e6dc66a` | 9:59 | 50 |
| 1.2 Il mito del 7-38-55 | `b4ed824ae7dbb0fe62d48ec46ee07946` | 9:59 | 50 |
| 1.3 Il segnale non è un significato | `1def2634f6325ac79f3ab7c13956a9cd` | 9:59 | 50 |
| 1.4 La linea di base | `2fa9b6c92246ddf477394788c35827a1` | 10:04 | 50 |
| 1.5 Guardare senza concludere | `c2f6aadf351260b0cd86cd47a2e73abb` | 9:59 | 50 |

Durata del modulo: **quarantanove minuti e cinquantanove secondi**.
Duecentotrentacinque slide, di cui **trentasei** sono diagrammi o
infografiche. Quindici riprese, tutte generate e tutte viste.

## È il modulo che dichiara i limiti prima di vendere la capacità

Gli altri sei moduli insegnano a guardare: il volto, le mani, la voce, lo
spazio. L'1 non insegna a guardare. Stabilisce **che cosa un segnale può dire
e che cosa non potrà mai dire**, e lo fa prima che lo studente abbia imparato
un solo segnale — perché dopo non servirebbe più a niente: una volta che si
sa riconoscere qualcosa, la cautela arriva sempre troppo tardi.

La sequenza è quella di una cosa che si impara in ordine:

- **1.1**: la distinzione su cui poggia tutto. Si vede un comportamento, si
  può nominare uno stato, non si vede mai la causa. Il terzo passaggio è dove
  scivolano tutti, e avviene in un decimo di secondo;
- **1.2**: il numero più ripetuto della formazione sulla comunicazione, e che
  cosa misuravano davvero i due esperimenti del millenovecentosessantasette.
  Si smonta senza compiacimento, e si tiene la parte vera — in caso di
  contraddizione fra i canali, chi ascolta crede al non verbale;
- **1.3**: perché lo stesso segnale non ha un significato fisso. Nessun
  segnale senza la sua condizione: è la regola che tutte le lezioni
  successive devono rispettare;
- **1.4**: la linea di base, cioè l'unità di misura del corso. Non conta come
  sta, conta come sta rispetto a come stava;
- **1.5**: la regola operativa che chiude il modulo. Osservare serve a sapere
  dove guardare, non a sapere cosa pensa — e al posto della conclusione si
  mette una domanda.

## Il copione è stato riscritto per intero, cinque volte

Gli script di partenza dichiarano fra 4.100 e 5.800 caratteri per lezione:
abbastanza per sei minuti, non per dieci. Il conto dello standard
(`LNV_STANDARD-PRODUZIONE.md` §3) chiede **10.500 caratteri** su quarantotto
blocchi, e il modulo ne ha **51.989** in tutto, media 216 per blocco.

Il raddoppio non è stato riempimento. Gli script avevano lo scheletro —
l'ordine delle idee, le frasi che chiudono, le riprese — e quasi nessun
«perché». Il materiale aggiunto è sempre dello stesso tipo: la ragione per cui
una regola vale, il caso in cui non vale, e il costo pratico di ignorarla.

## La densità grafica, e come si distribuisce

| lezione | diagrammi e infografiche |
|---|---|
| 1.1 | 9 |
| 1.2 | 7 |
| 1.3 | 8 |
| 1.4 | 6 |
| 1.5 | 6 |

Le prime tre lezioni hanno bisogno di disegnare quello che dicono: la
sostituzione di un passaggio logico con un altro, l'imbuto che butta via le
condizioni, i quattro quadranti del segnale e del contesto. Le ultime due
hanno meno disegni perché lavorano su una sola misura — la distanza da un
punto di riferimento — e un diagramma per volta basta.

## Il mondo delle riprese

Quindici riprese, tutte dentro lo stesso mondo: oggetti e stanze, **mai un
volto riconoscibile**, luce naturale, palette avorio e blu spento dello
standard. Il corso parla di come si guardano le persone: mostrarle sarebbe
stato un invito a fare esattamente la cosa che le lezioni vietano.

**Tutte e quindici le ho viste** prima di montarle. Il CDN del generatore è
chiuso in scaricamento dalla policy di rete, ma lo strumento restituisce
l'immagine dentro la risposta, una per chiamata: dove non è tornata ho
rigenerato finché non è tornata. Sei immagini sono state rifatte perché la
prima versione aveva testo leggibile, un volto distinguibile o una palette
fuori standard.

## Le cinque lezioni sono state rimontate una volta

Il layout `quote` aggiunge da solo le virgolette a caporale in oro: otto slide
del modulo le portavano anche nel titolo, e a schermo uscivano **doppie** —
« «Questo corso non ti insegnerà a leggere le persone.» ». Le slide erano
`c02` nella 1.1, `c16` e `c35` nella 1.2, `c07` e `c47` nella 1.3, `c36` nella
1.4, `c21` e `c27` nella 1.5.

Sono state corrette, rirenderizzate e ricaricate, e i cinque video sono stati
rimontati: **i video_id in questa tabella sono quelli nuovi**, i precedenti
non vanno più usati. La `c16` della 1.2 non era una citazione intera — le
virgolette stavano solo intorno alla parola pronunciata — e quindi è passata
da `quote` a `statement`, che non le aggiunge.

Il difetto è finito fra le trappole di `STANDARD.md` §6 insieme ai due vicini
che ha fatto emergere: le infografiche chiamano l'occhiello `occhio` e non
`kicker`, e il campo `d` di `raggi` è una distanza, non una descrizione.

## Cosa resta da verificare

Non sento l'audio e non vedo il montato. Per ogni lezione ho controllato le
slide da ferme e tutte le riprese.

**I tagli non sono verificati parola per parola, in nessuna delle cinque
lezioni.** I crediti ElevenLabs sono a zero: la trascrizione di verifica di un
`prova.mp3` da dieci minuti ne chiede circa mille e la chiamata fallisce, e la
policy di rete chiude `huggingface.co` e `openaipublic.azureedge.net`, quindi
non si può installare un riconoscitore locale di riserva. Al posto della
trascrizione c'è il controllo di durata attesa descritto in ogni registro, e i
due difetti di `tagli.py` trovati per questa strada sono stati corretti — i
pesi al netto dei tag di intenzione, e il pool dei candidati portato a 4×N.

Restano trenta confini sospetti in tutto il modulo — cinque nella 1.1, otto
nella 1.2, sei nella 1.3, cinque nella 1.4, sei nella 1.5 — tutti sotto i
3,2 s di scarto e tutti dentro un silenzio di almeno 0,20 s, quindi nessuna
parola è spezzata: al peggio una proposizione breve sta sulla slide del blocco
vicino per un paio di secondi. **Ogni registro li elenca per nome**, così
quando i crediti tornano si risentono quelli e non tutte le duecentoventicinque
giunzioni.
