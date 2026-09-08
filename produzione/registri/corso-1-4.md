# Corso «Dire, ascoltare, convincere» — Lezione 1.4
## Il paraverbale: tono, ritmo, pause

**video_id** `942bf8bc098f9d91f7ad18bb5af499b4` — completato, **6:10** (370,0 s),
16:9, 1080p, sottotitoli impressi (srt + style default).
Pagina HeyGen: https://app.heygen.com/videos/40a2232b59c5f1dcd761efcde831d374

| | |
|---|---|
| avatar | `89cf01e0c22547169c460186be0c67a8` (look predefinito dalla 1.3) |
| voce | `KerPEYZvLEWNATg4AARX` — «Achille nuovo 1», `eleven_multilingual_v2` |
| blocchi | 40 (s02–s41): 10 avatar, 29 slide, 1 clip |
| slide | 31 (copertina c01, 29 di contenuto, chiusura c99) |
| copertina | 3 s · **chiusura** 10 s |
| batch asset | `e7741813248949e594be785de710c39b` (71 file, tutti completed) |

### Velocità: l'eccezione che non esisteva

Questa lezione era stata montata a **1,05× con le pause limitate a 0,6 s**, per
non contraddire il proprio contenuto: parla di pause, e sembrava sbagliato
tagliarle. Achille ha bocciato la scelta — le vuole brevi comunque, «anzi molto
brevi» — e la lezione è stata rifatta allo standard, anzi più stretta:

```
silenceremove=start_periods=1:start_silence=0.03:start_threshold=-45dB:
              stop_periods=-1:stop_duration=0.20:stop_silence=0.14:stop_threshold=-45dB,
atempo=1.12
```

Rifatta dagli mp3 grezzi già in locale, quindi a costo zero di ElevenLabs.
Misurato sulle 40 tracce di questa lezione:

| pause | montato | video |
|---|---|---|
| 0,30 s (vecchio standard) | 306,2 s | 5:19 |
| 0,22 s | 299,4 s | 5:12 |
| 0,18 s | 294,6 s | 5:07 |
| **0,14 s (nuovo standard)** | **293,5 s** | **5:06** |

Da 6:10 a **5:06** (misurato: 305,6 s) con lo stesso identico parlato. La regola sta ora in
STANDARD.md: **non esistono eccezioni di ritmo**, nemmeno per una lezione
sul ritmo.

### Clip

Un solo inserto, sul blocco s25 («Adesso la pausa»): orologio da parete in una
stanza vuota, luce del mattino, Artlist / Kling 2.6 Pro, 5 s 16:9, muto,
`playback.mode = "loop"`. La traccia s25 dura 1,25 s, quindi è stata portata a
5 s con `apad=whole_dur=5` perché la scena duri quanto la clip — il silenzio sta
dentro l'audio, non nel montaggio.

generationId Artlist `01a07c4e-617d-79e0-a31d-fa75048a56b4`.

### Tracce

| blocco | tipo | grezzo (s) | lavorato (s) | flow / session | asset audio |
|---|---|---|---|---|---|
| s02 | avatar | 6.92 | 6.59 | `OsR5m7i81b2XiZgMuU5n` / `fUDHyziP8ZhDqFWRnwTE` | `9d59dfafca7a48c186da9463b37a1e33` |
| s03 | slide c03 | 4.50 | 4.13 | `ek0783KJJ6Cf33kzMdLc` / `8On7C5xiLX5lM3HO2AJZ` | `a859b9b3c9154267a5ea03261d0ab147` |
| s04 | slide c04 | 9.20 | 8.76 | `FL1Veavswjdda8Gq5yEl` / `txTZj0qMjb3rcHRVelgw` | `7ff570f2344b475c994c2dd8483e05db` |
| s05 | avatar | 11.61 | 11.06 | `ts4362yV1XanHBnZTtLq` / `LSChfxoKoZiV1nHQoH7R` | `197fa2618ef540d5add4a65407524c48` |
| s06 | slide c06 | 10.82 | 10.13 | `FTCVzw3zmy3TgPxhRce4` / `gNqL8ssoVvt82LzJ3kvt` | `7133cef154304f0397855b8b69031efb` |
| s07 | avatar | 16.11 | 15.24 | `QMLFfVPdu0VagTnHJNfV` / `ie5piO1F7wQR3u3rCvOC` | `3e3bcc81d7b943a1a4745e19448da18b` |
| s08 | slide c08 | 10.73 | 10.01 | `491ankVrhtral4vTwf4R` / `0chHVyEc1fIXTPhXdGSK` | `1531bc9344194574809b2643bd2b5689` |
| s09 | slide c09 | 9.20 | 8.55 | `eaVfBNz6ViEhGFlmDmjS` / `O95e81ppqUbRHUzonPKI` | `3ae8efa0080f41fc8d46a0609c129824` |
| s10 | slide c10 | 8.08 | 7.57 | `N3Opr2vtTowHcloSKFcf` / `BqDZC0RByDUEg4fhwKQA` | `a14d46f8bc47478aa386f4d63a200acf` |
| s11 | slide c11 | 8.27 | 7.74 | `pr228r82vxoZAVKA5CUP` / `VF8AnsaCY0g99xmergKX` | `81f3b6cf87ed4539bc68398a3786b8fe` |
| s12 | slide c12 | 8.96 | 8.39 | `KbxX4aQNQQDbj9NLfmR4` / `14tbkIZg28lDPONwOxbO` | `cb28d261feb44fc698882ed03c484f67` |
| s13 | avatar | 14.30 | 13.17 | `3wwCQDCIiUbR7UAfTs8O` / `PXtU7VDifblAVFUzlOVg` | `3e4a49121b98424fba09c8da37730965` |
| s14 | slide c14 | 13.37 | 12.42 | `U3xOSmZs8p7QSmySyZ2A` / `8kndokCChZ44K5CzC9SK` | `b147e930cf5c4e72860d5cdb1d25aae7` |
| s15 | slide c15 | 6.46 | 6.02 | `rBswfTRWPfow5buFLRbp` / `DaNrffYpz7L2Vs6FeIhr` | `a4adc5393ea8426c88865e1280fc5deb` |
| s16 | slide c16 | 11.75 | 11.07 | `DlduP7OuCMOeXp7wV5H3` / `vuijFSW8bxOT3GYiMBGp` | `da569ef27f1447099567e61e3075de7c` |
| s17 | slide c17 | 7.94 | 7.44 | `u17SusGP0LdBpKCBkXCU` / `NFExn2RjNbXOkSBhADOz` | `b7a649afbdf340afaee067734a62e33c` |
| s18 | slide c18 | 10.91 | 10.30 | `STpsrgtmO5b1Ipw9ph1S` / `p8fCmLHuvR85y551nOsl` | `f83cfe06368a47d5af0acf7e5e1ac31d` |
| s19 | slide c19 | 3.76 | 3.46 | `b7LuO1Iez8368rm4PBC1` / `kzYuqAgsK6btF5Tis43R` | `081dd18e156e4f4e8126a9a1f49cccef` |
| s20 | avatar | 6.64 | 5.98 | `opPcPUOSHUOBmsyDd4BX` / `o25k8bGlL5yic3z4Kxpw` | `2a9186fda0204638b440d84e2ac09db1` |
| s21 | slide c21 | 14.54 | 13.77 | `djgANwoXXpf7isyPgZYN` / `EUgkzWmzCjwtcZgp5G79` | `99a12df4717246219f482038685f9ae4` |
| s22 | avatar | 10.12 | 9.52 | `7u6lZYfW8L1f7mbthkDK` / `EaCb80FBO4ooovuhTqSy` | `3f10002275cd45a782a0d373040d314c` |
| s23 | slide c23 | 12.12 | 11.13 | `HZHIsam5YthPZMcABy35` / `oNvwm2exCTVKH3cSiZP5` | `5c1a8df410ee4c51ae8c2d8f6653115e` |
| s24 | slide c24 | 13.98 | 13.32 | `74C2xDReWb9HfqlhOEkc` / `ol3SMmd77drK2jK5ViHN` | `5fef2534f27447dd86718840a018a0a2` |
| s25 | clip | 1.25 | 5.00 | `U6NTik4HyW1ECMQ4imaQ` / `s9uO9MKJudxgayicQsU4` | `d9aa278c86b94299af2d7de079f36166` |
| s26 | avatar | 10.87 | 9.66 | `U4yDJIfXO4txc5pCPOxo` / `dWCrlxVhBJncAMqemWHV` | `28f0c4fb311b4f778e73ad3ed5e8541e` |
| s27 | slide c27 | 2.37 | 2.15 | `3X6CaRV3XF4bbc6fBXXz` / `fd9CLdsbuTMmrTdOb8q7` | `d1b4d9db83c04fe3a50c634bf55067a4` |
| s28 | slide c28 | 5.57 | 5.18 | `vDJ3q8t0uVLwOME7v4ta` / `aKshGdbT6aEn7eu1XTPk` | `531b9407708f4f7fb618ad780ce8d669` |
| s29 | slide c29 | 9.66 | 9.06 | `sZVwLvd2oPnBxYwh08HR` / `RaQtH6LcUBXIZKfC6VdB` | `fe93aa7a506b4701b6c1fe94bdec6fcc` |
| s30 | slide c30 | 8.78 | 8.36 | `982qhjCg5S5b7oQVHXwf` / `9DfwYSzUS5zL2emJ3IlF` | `a9d7097c05b44c92aeb4eb5eee1bfa56` |
| s31 | avatar | 10.12 | 9.27 | `vGAf8z4Hzm2yR4maJEeJ` / `Wacng8zDjdz6qN6IrXFT` | `0a676cce098f488aa94d9191b63a96fb` |
| s32 | slide c32 | 11.75 | 10.90 | `EKNV6uTLM51mq0oO0G8w` / `nF2NUVl9YzwUGfkSlxPz` | `75b570c32e844888b1d74f21854ac362` |
| s33 | slide c33 | 14.40 | 13.61 | `L88LaaB9Yk1u3FwHLW7G` / `E6U8Ioej6VMjXusyTby0` | `5fceeae695d344a0bbc7f0126cbb5350` |
| s34 | slide c34 | 6.87 | 6.45 | `Nzvq3xwKaGUFYMmH00g6` / `hrlbjYlNH8QfEbQdBxqq` | `48326b7ff279423ab5f9b400527d1451` |
| s35 | slide c35 | 8.31 | 7.79 | `l4fEsAMX3dL049wx8fKm` / `BqisWjALFlmBBnGEacY4` | `6ca281aeeeed475bb4e3436a9621e79a` |
| s36 | slide c36 | 10.77 | 10.15 | `fFN9d6WYHKC2IIe07DRk` / `Nrt8fdUZeRLmXfQsVB1f` | `ed69f6e3305e4bb7872a08aaff93e842` |
| s37 | slide c37 | 10.26 | 9.61 | `1SGYirqZGlfmbDJp7mfD` / `appnzBrR0lgEZENzBlTN` | `4dd64d51b9bf4112bf7306629aa33a1a` |
| s38 | slide c38 | 4.46 | 3.71 | `plv4dKi8Y8OK2kjk9MjH` / `Edfs8ALd1ptLvQ1qZ1QM` | `6939bcccd7de4d1db134f47437fbda7d` |
| s39 | avatar | 8.92 | 8.31 | `aGjBp21PE9dX14Y1Ymy1` / `OGTexCN9V37J09WYysLt` | `05db5d9118f245eb8096e44fdd87ca9e` |
| s40 | slide c40 | 12.72 | 11.93 | `BSKSH3JUAweQuPrTF9x2` / `QtCQgw8qnA0esIHfMwTK` | `c61d96152bfb4bd2ad222441d4f1146c` |
| s41 | avatar | 11.89 | 10.91 | `ZnPew2ufBA2HzakCFg0V` / `UQbu5Kt1vlLhLFi60MQn` | `426f9a2952164a54afb61832fd47086f` |
### Slide

| file | asset |
|---|---|
| c01 | `a94d9d1d25ed46c28c4e69457115891b` |
| c03 | `16c2ce4c71204537a024cbecf48637df` |
| c04 | `fe5934862b484701a1fce6912476c0cd` |
| c06 | `3f97c2aea97d4cb4be590adf1351f6e0` |
| c08 | `d8ca4293db9843958b73bd06809afcf1` |
| c09 | `467af3a97cf54b98850c38b2f40423a9` |
| c10 | `23f18be502be41d89e61a5370427ac48` |
| c11 | `076acde9163d4db7838595c46b3384a5` |
| c12 | `0db9561acaec497db1c178d1d7a4e960` |
| c14 | `6daffef241864389a2c492db678d224e` |
| c15 | `5e331ba912bd4cd18059e12a8b2b0cc1` |
| c16 | `f15ccb4cbf734bb4920a963b432bdc6a` |
| c17 | `6e095d9825dc45cd952440ebd055fdf4` |
| c18 | `aa266d8cb795424883d4366054209269` |
| c19 | `713805f8eebd429f918bec08691e73ae` |
| c21 | `cfd08efa5b6c4085ae97fa162e90f740` |
| c23 | `f8dcb3277e8443e5801e7b9626189272` |
| c24 | `9a87a4fc99964068aed7d305c54941da` |
| c27 | `d506874105884533bffe01f3bdde274c` |
| c28 | `60fce3d943fa4242a794bc15673bcdf6` |
| c29 | `3b97febe00274804a333c2a9e789531c` |
| c30 | `8fc1bf58ab894d0d9ed32b82e44a724f` |
| c32 | `f824b4d849e94efb949d1204e2fc48e7` |
| c33 | `504c755c61c44914a2bb697a00bddac6` |
| c34 | `11045f3931c5435f8ded96f4544e49b5` |
| c35 | `e03f337087ac4544a6bb43af1744b532` |
| c36 | `003f7569fe3743f195e20b62b95f0c5b` |
| c37 | `e28b101bd4a748f1b19bc246a37174ec` |
| c38 | `58e9741a02ba4c8686ca316b7ee6a714` |
| c40 | `e982e19afcd942e3997218fe8a907d7d` |
| c99 | `8212648b7d2c4cd5bd7f22d4ff5cce6c` |
### Da confermare

- **Velocità.** 1,05× con pause a 0,6 s è una mediazione decisa da me fra la
  nota dello script (0,92×, pause lunghe) e la correzione di Achille sulle
  prime tre lezioni. Va confermata o spostata su uno dei due estremi.
- Nessun aneddoto in prima persona in questa lezione: gli esempi («va bene»
  detto in tre modi, la riunione che si mette male) sono situazioni generiche,
  non fatti attribuiti ad Achille.
