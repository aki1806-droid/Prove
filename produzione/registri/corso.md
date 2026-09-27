# «Dire, ascoltare, convincere» — il corso, finito

Otto moduli, quaranta lezioni, **tre ore cinquantasei minuti e due secondi**
di montato. Ogni lezione ha il suo registro; ogni modulo ha il suo. Questo
tiene il conto di tutto e dice cosa è cambiato per strada.

| modulo | titolo | lezioni | durata |
|---|---|---|---|
| 1 | Le basi: cosa succede davvero quando parliamo | 5 | 28:21 |
| 2 | Ascoltare | 5 | 30:03 |
| 3 | Farsi capire | 5 | 29:02 |
| 4 | Chiedere | 5 | 28:20 |
| 5 | Convincere senza manipolare | 5 | 29:08 |
| 6 | Il disaccordo | 5 | 30:00 |
| 7 | Assertività e confini | 5 | 30:01 |
| 8 | Parlare in pubblico senza recitare | 5 | 31:04 |

## Il trattamento è cambiato due volte

Il corso non è stato prodotto tutto nello stesso modo, e le due rotture si
vedono nei registri.

**Dal modulo 1 al 2** è cambiata la voce e il ritmo. La 2.1 è la prima
montata con le pause corte — `stop_duration=0.20`, `stop_silence=0.14` — e dal
modulo 2 in poi il metro è 18,6 caratteri di testo netto per secondo di video
finito.

**Dal modulo 6 in poi** è caduto l'avatar. Le lezioni dei primi moduli
alternavano riprese di avatar e slide; dal 6 la lezione è tutta slide a piena
inquadratura, con una voce sola tagliata a blocchi, e i diagrammi parametrici
prendono il posto che avevano le inquadrature. Il conto delle scene sale da
quaranta a cinquanta, che è il tetto di HeyGen, e da lì non si è più mosso.

Non ho riprodotto i primi moduli con il trattamento nuovo, e va detto: chi
guarda il corso in ordine vede un cambio di forma fra la 5.5 e la 6.1.

## Cosa è stato costruito per farlo

- **quindici diagrammi parametrici** (`figure_corso.mjs`): curva, finestra,
  quadranti, flusso, strati, pila, termometro, bivio, anello, bilancia,
  imbuto, ponte, linea, barre, raggi;
- **quattro infografiche** (`info_corso.mjs`): anatomia, cruscotto,
  cartellino, confronto;
- **`tagli.py`**, che taglia una traccia unica sui confini dei blocchi. Il
  passaggio che conta non è l'allineamento: è la prova da 1,6 s per taglio,
  che si trascrive e si legge parola per parola. Da sola, senza la prova, la
  macchina sbaglia un taglio su quattro;
- **`verifica.py`**, che appaia le code trascritte ai confini per contenuto e
  non per ordine, perché `scribe` ogni tanto salta una coda e da lì in poi
  scivola tutto;
- **`scene.py`** e le due modalità di riproduzione: `freeze` per le slide, che
  entrano e poi tengono l'ultimo fotogramma, e `loop` solo dove il movimento è
  il contenuto.

## Le sei trappole

Stanno in `produzione/STANDARD.md` e sono tutte costate un render sbagliato.
La sesta è arrivata nel modulo 7 e si è ripresentata due volte prima di essere
scritta: l'etichetta del **ponte** deve stare su una riga sola, perché il testo
è ancorato a una quota fissa sopra l'arco e dalla seconda riga in poi finisce
sopra il tracciato.

## Una regola nuova dall'ultimo modulo

L'audio che non esce da `tagli.py` va riportato al profilo dei blocchi —
**128 kbps, 44,1 kHz, mono** — prima di caricarlo su HeyGen. Le due tracce di
musica della 8.5 uscivano da ElevenLabs a 192 kbps, 48 kHz, stereo, e HeyGen
le ha respinte come `application/octet-stream`. Riconvertite sono passate al
primo colpo.

## Cosa non ho potuto controllare

Vale per tutto il corso, e sta scritto in fondo a ogni registro: **non sento
l'audio e non vedo il montato**. Quello che ho controllato è verificabile — le
slide da ferme, i tagli con la trascrizione, le durate misurate — e quello che
non ho controllato è elencato lezione per lezione.

Alla fine del modulo 8 restano aperte tre cose:

- le **due foto della 8.4** che il generatore non ha restituito in linea e che
  il proxy non lascia scaricare;
- il **volume della musica** della 8.5, e il punto in cui la chiusura sfuma;
- l'**oscillazione di `s25`** nella 8.1, dove «inspirazione» ed «espirazioni»
  non si lasciano separare dalla trascrizione. È la terza volta che capita nel
  corso — `s18` della 7.2, `s28` della 7.4 — e ogni volta la decisione è stata
  la stessa: se la banda è pulita e i vicini sono a posto, il confine resta
  dov'è.

## La chiusura

L'ultima lezione non riassume. Porta otto righe, una per modulo, e poi chiede
una cosa sola: scegliere una conversazione che esiste, con una persona che ha
un nome, entro una data. La chiusura dura venti secondi invece di dieci, il
logo è più grande, e sotto c'è scritto «8 moduli · 40 lezioni».

Il corso finisce sulla data da scrivere, che è la frase con cui lo script
voleva che finisse.
