# Corso «Dire, ascoltare, convincere» — Lezione 1.5
## La prima cosa da smettere di fare — chiusura del Modulo 1

**video_id** `4ebab457d266151497220c1e7687c7a7` — 41 scene, 16:9, 1080p,
sottotitoli impressi (srt + style default).

| | |
|---|---|
| avatar | `89cf01e0c22547169c460186be0c67a8` |
| voce | `KerPEYZvLEWNATg4AARX` — «Achille nuovo 1», `eleven_multilingual_v2` |
| velocità | **1,12× con pause a 0,30 s: lo standard.** La 1.4 resta l'unica eccezione |
| blocchi | 39 (s02–s40): 17 avatar, 21 slide, 1 clip |
| slide | 23 (copertina c01, 21 di contenuto, chiusura c99) |
| copertina | 3 s · **chiusura 15 s** invece di 10: annuncia il Modulo 2 |
| batch asset | `8f8ce0f2513f4f38b28b7aed7cafd002` (62 file, tutti completed) |

### La chiusura di modulo

È la prima slide con questo uso del layout `closing`: oltre al logo esteso porta
un titolo e un sottotitolo.

```json
{"file":"c99","layout":"closing","title":"Fine del primo modulo",
 "sub":"Modulo 2 — Ascoltare davvero","site":"laparolagiusta.it"}
```

Il titolo dice «Fine del primo modulo» e non «Fine del Modulo 1» perché il
Cormorant Garamond usa cifre di stile antico: la `1` esce bassa e si legge come
una `I`, quindi «Modulo I». **Regola: nei titoli in Cormorant i numeri vanno
scritti a parole.** Nei sottotitoli in Jost (qui «Modulo 2») la cifra va bene.

### Il modello di durata, misurato

Il conteggio dei caratteri di `blocchi.json` include i tag `<break>` e quindi
non predice niente: la 1.3 aveva 6725 caratteri in 379 s di grezzo, la 1.4 ne
aveva 5304 negli stessi 379 s. Tolti i tag il quadro torna:

| | testo netto | pause dichiarate | parlato | ritmo |
|---|---|---|---|---|
| 1.3 | 5445 car | 59,6 s | 319,9 s | 17,02 car/s |
| 1.4 | 5304 car | 62,4 s | 316,7 s | 16,75 car/s |

**Il modello da usare per dimensionare uno script:**

```
grezzo   = testo_senza_tag / 16,9 + somma dei <break>
montato  = grezzo × 0,812        (filtro standard: pause 0,30 s + atempo 1,12)
video    = montato + copertina + chiusura
```

Verifica sulla 1.5: previsti 417 s di grezzo, misurati **416,7**; montato
previsto 338 s, misurato **347,1** (rapporto reale 0,833 perché la clip è
allungata con `apad`). Video stimato 6:05 contro l'obiettivo di 6:00.

Per una lezione da 6:00 servono circa **6.000 caratteri di testo netto** su
39-40 blocchi.

### Clip

Un solo inserto, sul blocco s14: due persone su una panchina viste da dietro,
una parla e l'altra annuisce guardando avanti, luce di tardo pomeriggio, volti
non riconoscibili. Artlist / Kling 2.6 Pro, 5 s 16:9, muta, `playback.mode = "loop"`.

generationId Artlist `01a07cb3-13c3-72d3-a3cd-2c489780ef12`.

La traccia s14 dura 1,67 s ed è stata portata a **8 s** con `apad=whole_dur=8`.
Lo script chiedeva «almeno 20 secondi con la sola musica dopo la frase»: senza
una traccia musicale sarebbero stati 18 secondi di silenzio, quindi ho tenuto
8. Da rivedere quando ci sarà la musica di sottofondo.

### Tracce

| blocco | tipo | grezzo (s) | lavorato (s) | flow / session | asset audio |
|---|---|---|---|---|---|
| s02 | avatar | 13.05 | 10.61 | `KBAeWFzOzMdFHQldvMxG` / `ioMqeVoG5Ushk3uO57Hm` | `2cc33f9c10df43f4a1897f4ef9c6cd31` |
| s03 | slide c03 | 9.10 | 6.83 | `jRtwWFk2M4WiC0BQJHcs` / `Fk8yhFVFvE8mr4pXQUbj` | `fe4b82319bca4f5ab26dc548101860f9` |
| s04 | slide c04 | 7.85 | 5.88 | `SHHCkmCLrAxVBUVAJfNQ` / `UEHCh0hhy4lACJDjcMyo` | `ffe9ad48ee30474da757ed1999d5c828` |
| s05 | avatar | 11.89 | 9.12 | `XPumybibgKg3Wa5iyRjN` / `fH3yWgEbk0MsruNt1HZq` | `b6e86eadd1c54ea3a11abc501c520374` |
| s06 | avatar | 11.84 | 9.72 | `47W1M5MrOlus21J4KPft` / `BT9M0pH6JzTcuK8N3BmA` | `f2ee119929b84f63b175755e3816dc2e` |
| s07 | slide c07 | 11.89 | 9.71 | `GELZ48fTgczOl3RUIlhR` / `CZHh3GS1KoDv2yNZvlTE` | `35774b8e699c42e7921e2627c1e61b28` |
| s08 | avatar | 16.07 | 13.05 | `jBQobtXATgPHz3Yl773H` / `6IYzmy6aj4pb7pcvXBMw` | `8078d0b8fb2346289f6b7a7326aaca2e` |
| s09 | slide c09 | 13.65 | 10.90 | `ztvnavg2SMSifYtg1RpJ` / `qLwkS5l66x3lsVGzPEF2` | `3c55b546b40d4b5e8d84c0b82b895fc7` |
| s10 | avatar | 7.85 | 6.40 | `a83deVOYj8YAiyD6csh2` / `cv8w3KkIQqVJMh1G25LO` | `80af88b90d744b3eb1d2471c27fb1c84` |
| s11 | slide c11 | 7.29 | 5.74 | `N2IJDbRlvJIVyrpJ6XU6` / `Yle5iIlJxvmoOOsj2ECb` | `733107a608a94491849026e4f61527ab` |
| s12 | slide c12 | 9.10 | 8.14 | `D7F57KdwrIbEiXAnRA2L` / `AfmKv6SmKw2wre6V3UGB` | `d76c6da93f39493392804e73e49a7050` |
| s13 | avatar | 10.73 | 8.85 | `Iooz88CNw5Gx4Xb5qtuX` / `bOd4Ds166Wk99UsBXK2c` | `a9468081fce64dca87b82f397dbe116f` |
| s14 | clip | 1.67 | 8.00 | `HP49G14ZdhDRw0fGJgiG` / `H0sdNWASrIjDT2wB7EpD` | `d9f8d0b6145845fa803d5d4ec49c3ee0` |
| s15 | slide c15 | 7.01 | 5.70 | `ahZ4FQrKzbTLTiCoXLbN` / `R3yezdaK5fleVyaRwxgQ` | `49b51d276204453eac44948fd7e5fda8` |
| s16 | slide c16 | 7.71 | 6.45 | `dX5s21TjdGFKuVYGeMcW` / `AEf6Vem4mfX4HYjcbzbo` | `df4baa4402ce42aaaa744e94257308d9` |
| s17 | avatar | 16.53 | 13.80 | `wdYJdiBf6XEgbF9jQC7K` / `42JV1GY6vBkWtr0pBQ7s` | `68699f15d16e4cd088e300f7cf22f4d7` |
| s18 | slide c18 | 11.01 | 8.69 | `c1Y5n3WKhJEIM6Z8ucqp` / `kkwyL9ESTsODnfKDAaEP` | `4fb02c83f6834145834f45389a68123c` |
| s19 | avatar | 14.58 | 12.39 | `r4bXxgAyz8hY37RfR78u` / `ftZvfFT8hIOIdWoj9FOZ` | `5fc99da2f71a4363b038d46c5e7da425` |
| s20 | slide c20 | 10.12 | 8.35 | `FUdOnX1Iqtj4RfiwMf82` / `FIvldmLxG8q2pgBz0b7u` | `e93623e2ee28468bbc9460d510862fb7` |
| s21 | avatar | 11.33 | 9.38 | `qL2vE7FzqEYccNXyHK8x` / `TY0jOqcwUc5TS3vFRJjS` | `88ee4d16bd3f49bf8818763080d4afe5` |
| s22 | slide c22 | 5.67 | 5.07 | `8nPswJz7nL3g7I61BaJS` / `LfmUzvfqvj1ZXLE0j7OE` | `e8f0d36f1ac04b978c9ef764ff015b89` |
| s23 | avatar | 20.43 | 16.47 | `EJqamTtOdo8VhgkZWxMc` / `aFjsIOwqrlf0JMnvMt7m` | `a04417b438204838ae929a46dbf18efc` |
| s24 | slide c24 | 7.38 | 5.58 | `ZYthCxvng3QuRb8OR6rV` / `k06mYid4OFUL9dVRJTEJ` | `9d741f07f28e447994b5f4032e932389` |
| s25 | avatar | 9.89 | 7.82 | `We7beupBR23f8whkkshC` / `dFzWxviXZpJ0aLV3HSOj` | `25ef9fdfe6b7415c80a163cd77916059` |
| s26 | slide c26 | 10.03 | 8.21 | `YJVvAW7eGoLYkxMXZJ1I` / `s3OqUOcQFpvL2KemtlW9` | `d05e268dc45c4ebd9f74bfd43dfb3570` |
| s27 | avatar | 12.63 | 10.52 | `TTvZ2wFWNVkDJZaHMuRi` / `Fmra1bcInCpURO993zu1` | `3869d061683c4524b0dd572050dbd498` |
| s28 | slide c28 | 6.36 | 4.98 | `eud3Ov70iZCSpI0jdoDw` / `lU6x4rEUiYSOgbuRBbhS` | `5b40f0b1325f4c5c91d3710f2786f05b` |
| s29 | avatar | 13.61 | 11.42 | `Y016JWb1MRFMqgYZEYlw` / `FE829md82p6khiX4IYcz` | `7f0047bfd8d94990b9896fb4be3f6018` |
| s30 | slide c30 | 6.78 | 5.57 | `7VKNP9NMfaKFADzLqOfu` / `cBBUg8fR4VnQbQzPZSY5` | `48a46972337843db931920f2a95ea885` |
| s31 | slide c31 | 11.56 | 9.69 | `8WiQz9RfxsJXgibBTimZ` / `oCYEKuHuyYYEBZAO8ZFT` | `21079b95fbce4b0cbed3c33a6d3f1672` |
| s32 | slide c32 | 13.10 | 11.12 | `k6zutBkUqxWgzUVvjqpx` / `8HfYAW0PuG0dRfXCImsu` | `a1123e32986845ad9ec695d7e14002b7` |
| s33 | slide c33 | 10.36 | 8.46 | `eOXTtGmdXemODISucgrf` / `JgH3Gy385nxv37QE0kua` | `e4ba4f8852bd4ae8847ab0adc71e9455` |
| s34 | avatar | 18.11 | 14.58 | `Z7WJPkpYFvkmpUbOqS4h` / `JDxp89EePEtKS3R5pEXE` | `312444eff67b4aeeb8f81efa036c3249` |
| s35 | slide c35 | 4.32 | 3.78 | `6ZClc6NaBc6oWuis5cJ9` / `qud8SDqbHMAqQLM1nXXU` | `d4b44ea140dc426ea00ccbdf658f35d9` |
| s36 | avatar | 9.38 | 7.73 | `6f0AMYicdetCqK1TXENq` / `NJI42bOfzdZduTrSKVnu` | `60bfbad98af14d15aef44f30df3661ca` |
| s37 | slide c37 | 10.54 | 8.65 | `b3VejtPmAhXARQ2hdVyO` / `NjAjBcIkBAVSOXS1xZu6` | `c902f0b34057404f94fee8baedd625ea` |
| s38 | avatar | 9.33 | 7.77 | `KuPmcetlRGnwFJtmskjX` / `CxHBHBmRI71wPXLXTWZ4` | `4c16cf5361614b2bb75ced5aaf8067b9` |
| s39 | slide c39 | 5.15 | 4.55 | `Wr3kyS1cohg5nzpBUf0J` / `Ydvxdyp6bmkH5OoLdvDO` | `ea00d74c9b1247f085aab77103b1cd9d` |
| s40 | avatar | 21.83 | 17.43 | `RrDEwjSO9mMBifDHQ8U8` / `T8tyWhFWYYqifcEgvSDx` | `fc320700bcc140629e151debc5a0937a` |
### Slide

| file | asset |
|---|---|
| c01 | `4e18c35124a846c39fdb54b6c011d6a2` |
| c03 | `d08218276dc746079157723d2320cfda` |
| c04 | `a00ea50091ea44f6a36b414fabab8c0d` |
| c07 | `9f2a82833115411b8f3c2426df0d8797` |
| c09 | `9c469f64e6fa4b6c87b8d7fcb8b074cf` |
| c11 | `fb84cbd52b8b4d5d821bf1d56103faf8` |
| c12 | `19a83a338118464f8a2032cde105c5b8` |
| c15 | `e0e2cde899c6400a80116857e031d9bc` |
| c16 | `7297bd3fffdf4218bad871efbad38c18` |
| c18 | `27b10b74ac1e4a6fbb973b6862134586` |
| c20 | `5516e7b969994852b9340c86f3656166` |
| c22 | `300b397b2a6b418b9c96ab165c356578` |
| c24 | `19b642ff9a574fedb106d5f6ba82043f` |
| c26 | `db2f154469b04fed8afaf1291361ca7c` |
| c28 | `236d493aab3b45eaad3dc7ce728fa4fa` |
| c30 | `77abc26d7db64accbb7757ad6c587dee` |
| c31 | `1ccc3b8f63e849c6b1fa3baf8bf4dbcb` |
| c32 | `d97fb840c8cf43198b0e3cf533e8e5d5` |
| c33 | `898303fa7f81409db2f435ac9b99776a` |
| c35 | `4c75eb0375a946838928eabac020b883` |
| c37 | `c03415f7cca94295bc3e2a05ec2aed4e` |
| c39 | `ce409c7ffc6140d6a02f6b5b7bd7ee94` |
| c99 | `da0a62da5bf146f0a02a9e05c332bfa4` |
### Da confermare

- **Il respiro sulla clip**: 8 s invece dei 20 chiesti dallo script, per le
  ragioni sopra. Stessa scelta fatta nella 1.3 (8 s invece di 15) e nella 1.4.
- **Nessun aneddoto in prima persona**, come chiedeva la nota di regia: il
  registro è il confronto diretto con lo spettatore («io ascolto — ci
  arriviamo»). Niente da verificare qui, a differenza della 1.1 e della 1.2.
