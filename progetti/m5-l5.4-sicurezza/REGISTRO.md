# Registro — Modulo 5 · micro-lezione 5.4 «La somministrazione sicura e la prevenzione dell'errore»

La lezione delle regole, e per questo senza corpi nuovi: le sette G sono
un anello, i tre controlli un percorso, le abbreviazioni pericolose una
trappola, i farmaci LASA una sostituzione (DOPamina · DOBUTamina con le
lettere differenziali). Quattro illustrazioni nuove: la pettorina «non
disturbare», l'armadio dei farmaci, l'etichetta della preparazione, i
flaconi simili.

---

## Scheda parametri

| | |
|---|---|
| durata chiesta dallo script | 10 minuti |
| durata ottenuta | vedi «La resa» |
| slide dello script | 20 |
| scene | 50 (il tetto) |
| blocchi di parlato | 48 |
| voce | GianP — News Info and Documentary, `eleven_v3` |
| costo voce | $1,47 (A $0,76 · B $0,71) |
| costo trascrizioni | $0,54 |
| pause senza voce | nessuna; tre pose brevi sulle slide sul verde |

```
CARATTERI  8.832          BLOCCHI  48         SCENE  50/50
stima a 17,0 car/s        8:56.1
stacco tracce             dopo s26   (chunk A 4.588 car · chunk B 4.244 car)
tracce grezze             A 297,5 s  ·  B 302,2 s
silenzi                   fattore 1,062   ->   atempo 1,087
montato locale            8:56.6
```

Il copione ha fatto più giri di lunghezza (sopra e sotto il tetto) prima
di chiudere a 48 blocchi: le sette G e i tre controlli sono scritti con le
parole dello script, senza aggiunte.

## I confini

| | traccia A | traccia B |
|---|---|---|
| blocchi | 25 | 23 |
| blocchi fuori fascia | 0 | 0 |
| tagli nel parlato | nessuno | nessuno |

### La verifica per trascrizione

La traccia A conferma **680/689 parole**, la B **635/648**, nessun buco.
Due buchi falsi hanno insegnato una regola: «cinque virgola zero» e «zero
virgola cinque» contro «5,0» e «0,5» del trascrittore. La regola «numero
virgola numero» non sapeva che «zero» è una cifra, e, scritta come
espressione regolare, su «la virgola cinque virgola zero» falliva su «la
virgola cinque» consumando il «cinque» che serviva alla coppia vera. Ora
«zero» vale 0 e la fusione passa parola per parola.

## Le scene

| scene | corpo | contenuto |
|---|---|---|
| s01, s50 | copertina | la sicurezza; la 5.5 |
| s05, s33 | percorso | i tre controlli; la gestione dell'errore |
| s28 | sostituzione | i LASA: DOPamina · DOBUTamina |
| s16–s17 | trappola | le abbreviazioni pericolose |
| il resto | anello, griglia, figura, frase, confronto, titolo, icone, catena | — |

## Correzioni fatte guardando le card

- **s05 e s33 (percorso a sei tappe) sforavano di 16 px**: nella libreria
  il percorso a due righe è alto 660 invece di 700, con la seconda riga a
  180 + 300 r. Vale per tutte le lezioni da qui in poi.
- **s50 aveva un titolo su tre righe**: accorciato.
- **s28**: il titolo della sostituzione è in maiuscole per CSS, quindi
  l'esempio DOPamina · DOBUTamina sta nel testo, non nel titolo.

---

## La resa

| | |
|---|---|
| resa pubblicata | `54a45652bb75397a8dcde4ab22d7deb1` — 541.613 s (9:01.6), 1080p 16:9, resa in 69 s, con SRT (`subtitle_url`) |
| lotto asset | `b0896efe4a5e4242981e7f78a4edc6af` — 98 file, 20 MB, tutti completati |

---

## Da verificare

- Nulla di aperto: la verifica per trascrizione non segnala buchi.
