# Registro — SFL 3.3 «Elenchi: quando aiutano e quando mentono»

L'elenco puntato è lo strumento più amato della scrittura professionale, e fa
due cose che quasi nessuno considera. **Dichiara che le voci hanno lo stesso
peso**: se una delle cinque è decisiva, l'elenco la nasconde. E **toglie i
legami** fra le voci: quando c'è una logica, la cancella. Se le cose non sono
dello stesso tipo, l'elenco non ordina: appiattisce. Aiuta davvero in
quattro casi — cose omogenee, passaggi in sequenza (numerati), condizioni da
verificare, cose da ritrovare. Il punto di sostanza: **l'elenco usato per non
scrivere**, detto senza durezza perché lo fanno tutti in buona fede. Un testo
che è solo elenchi è un testo in cui manca il ragionamento.

| campo | valore |
|---|---|
| video_id | `70b3446e7c199764e5a897ebe344c07b` |
| scene | 50 — copertina, 47 slide, 1 ripresa, chiusura |
| formato | 16:9, 1080p |
| durata | 598,5 s (9:58) — misurata sul montato |
| parlato | 586,8 s (551,2 s di voce tagliata + 35,6 s di pose) |
| copione | 9.945 caratteri in 48 blocchi, media 207 |
| voce | «Achille nuovo 1» `9b851842ce54449fb9ff501751ca0271` su HeyGen, `create_speech` con `engine: "elevenlabs"` e `eleven_v4`, **1,12×** in post |
| tracce | A `s02`–`s10` · B `s11`–`s20` · C `s21`–`s30` · D `s31`–`s40` · E `s41`–`s49` |
| ripresa | `s29` lista-spuntata |
| costo | 30 crediti HeyGen di voce (6.398 → 6.367, compreso il render della 3.1) + 1 di render |

**Confini: 43 su 43** trovati al primo colpo da `confini_heygen.py`, senza trascrizione; pausa di confine più corta **1,34 s**, taglio a metà della pausa.

## Le scelte

**Due schermate F**, layout `pd`, con l'elenco a pallini dentro la versione
da evitare:

- le cinque modifiche (`c09`–`c12`): sottolineata la scadenza anticipata al
  terzo punto, dove nessuno la legge;
- le cinque criticità contro un problema e due conseguenze (`c34`–`c37`).
  Sei righe corte: il `pd` le misura come un testo breve e le farebbe grandi,
  e la schermata usciva dal quadro. Il blocco da evitare è rimpicciolito
  nella slide stessa, senza toccare `prima_dopo.mjs`.

**La nota dello script sulla scena dell'elenco per non scrivere** è
rispettata: `s30`–`s33` dicono che succede a tutti, in buona fede, e
l'occhiello di `c32` lo ripete.

**I quattro casi in cui l'elenco aiuta** (`c21`–`c25`) sono una slide C a
elenco con una riga accesa per volta.

## La ripresa

**`s29`**, una lista scritta a mano con le voci spuntate. La scrittura era
quasi leggibile: sfocata in post.

## Verifica

Scaricato e guardato: dodici fotogrammi più la ripresa, tutti al loro posto.
Silenzi oltre 2,5 s: solo la copertina e la chiusura.
