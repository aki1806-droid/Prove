# Corso 1.3 — I tre livelli: contenuto, relazione, intenzione

Modulo 1 di "Dire, ascoltare, convincere". Prodotto secondo `produzione/STANDARD.md`.

**Video finale:** `eb735e519fae45ecf8a643dd216fb04f` — 5:28, pause corte.

Versione precedente `520446c6fea52b735847f7b22e4f6ed5` (6:08): pause troppo
lunghe. Tracce rilavorate con `silenceremove` e ricaricate (batch
`365d33b626514962b8c44a3ec198a04c`). Nella stessa passata **il respiro sul clip
e' sceso da 15 a 8 secondi**: lo script ne chiedeva almeno 15, ma l'indicazione
di Achille sulle pause vale anche qui. Se lo rivuole a 15, si rigenera solo la
traccia s11 cambiando `apad=pad_dur`.
**Struttura:** 41 scene — 11 avatar, 29 slide, 1 clip.
**Avatar:** `89cf01e0c22547169c460186be0c67a8`, il default del corso dalla 1.3 in poi.

Questa lezione **non ha aneddoto**, come prescrive lo script: il dialogo delle
scene sul "non mi hai richiamato" fa quel lavoro. Non c'e' niente di inventato in
prima persona da confermare, a differenza della 1.1 e della 1.2.

## Il respiro sul clip

Lo script chiede che il videoclip resti in silenzio almeno 15 secondi dopo
l'ultima parola: e' il respiro del video. HeyGen pero' fa durare la scena quanto
l'audio, quindi il silenzio va messo **dentro** la traccia:

```
ffmpeg -i grezzo.mp3 -filter:a atempo=1.12,apad=pad_dur=15 -b:a 128k -ar 44100 -ac 1 finale.mp3
```

`apad=pad_dur=15` aggiunge 15 secondi di silenzio in coda. La traccia s11 passa
cosi' da 1,5 s a 16,4 s, e con `playback: fit_to_scene` la clip di 5 secondi si
distende su tutta la scena. E' il modo di ottenere una pausa lunga senza scene mute.

## Tracce vocali

Voce "Achille nuovo 1" `KerPEYZvLEWNATg4AARX`, `eleven_multilingual_v2`,
`generations_count: 1`. Durate **prima** dell'accelerazione a 1,12x.

| id | scena | s | flow_id | session_id |
|---|---|---|---|---|
| s02 | avatar | 12.0 | cWaiA3U3gL9dcvWTdgt5 | qbUTXznj2RrDtxf9E44D |
| s03 | slide c03 | 6.9 | FXox1fXp3IKWSx47MRtz | zAVMj52mzPQFtv6aQ2EG |
| s04 | slide c04 | 9.0 | ekn9HEPabXdN2Aa4TYb6 | py2tZh7q7DFo7eVQqPKS |
| s05 | slide c05 | 14.7 | 2Ik8rX9ba2BbWMih1wYs | s7bLMna3aIFdAKKjc2dN |
| s06 | slide c06 | 15.1 | ceqlAV1v4RvEGVZYlpLq | bxOyBFqIqxkFFZv5mvTb |
| s07 | slide c07 | 13.1 | NZ70diACnC3CLLgiaEKA | zN9e45cMs2I3ISgJ1sTM |
| s08 | slide c08 | 16.9 | wwzEjgVykYpwr3hJU395 | FH8dYWWXroet9XTa0QML |
| s09 | slide c09 | 7.8 | KSJKhnMEX5ZmmhFAcUxh | J3YvuaqXr27mIfPt6KuT |
| s10 | slide c10 | 6.9 | S9GtHYCEm7WKpKd94FrG | fXi8AKeXAg0jlEoYrDm9 |
| s11 | clip | 1.5 | XecpoWQRGPFDmAxLV1f5 | 8S6PBN5mbIeE2m69nW9w |
| s12 | avatar | 6.5 | kplZfAWRgSXvTWKbdM9D | Pa7DiMtQFDLrc0Cw1oyQ |
| s13 | slide c13 | 8.0 | hsbpZKvZv7hlq7gDomLx | bzrviPJzXZhr55Dctgcx |
| s14 | avatar | 15.3 | p4NTETGZKTc7FZLZzRW7 | ECe3n7LNWoxBwjuZw3vy |
| s15 | slide c15 | 10.8 | b7AqjJjTRN16ycz4kBp6 | wC8qqPgw2D03WGSQmO9p |
| s16 | slide c16 | 11.2 | rsa8JkbsfdLm560Dz2Rh | Fto3ztipcbQcYlLgEKht |
| s17 | avatar | 9.5 | cxhjUotWsz75lQSVsjl6 | SR6VIHMO4dlSnlCrvY6I |
| s18 | slide c18 | 5.7 | fzXmtYmIdyJtVZ8jZ2ZC | YTagUcER9UbSPBtuzgAI |
| s19 | slide c19 | 5.2 | OMWrusJxOYFyuy9lTo6H | sFnC7ePON8SxtBrmuHTZ |
| s20 | avatar | 8.0 | 0aaUNaRtU8bzEyEZb3Vq | 2wS4M7IgxiYKrlThOLZM |
| s21 | slide c21 | 8.9 | a1fEIbmPy37AUoY3eBdn | 4aZRbdTLPlEJvK6QYKE3 |
| s22 | slide c22 | 12.9 | cK1qezcXdQPajGFjn1Yq | tibciCztkvnL4G6sSxJk |
| s23 | slide c23 | 9.8 | 3tXViKF1Ar7VUeG3ITII | V3I39SpTnjPqdEQztYgR |
| s24 | slide c24 | 8.8 | 2YIU2XCoZc24DhSDIZoM | VkpyaT1lTLrTRUP16qAm |
| s25 | slide c25 | 13.0 | TXytEF9Rp9A0eFDgMdNn | JtMnWx1ZWXci3w5ii37g |
| s26 | slide c26 | 13.1 | SpBGpGsXx5kAD3YadV0r | xtVVklwVoP7Z3syEYprL |
| s27 | avatar | 7.4 | ziaxZvWOEe14c2gPNWUb | zMWQdFdKumj0ivNQBuWM |
| s28 | slide c28 | 6.1 | L7OYUYhYU41uS2H0hzRq | x1Qo9Zc3TtWWite9qYjq |
| s29 | avatar | 10.1 | 6E8b0Srenr16Hzbu4yXd | TywxN0Hst5LlSRTf0Fqh |
| s30 | avatar | 12.7 | EmYqittylQisaELgud5O | gnTPrzYIHVjxmMmb3VVZ |
| s31 | avatar | 11.2 | EWghICN0niVS1Z5XrSt2 | liyx4GWur7XE0JaVQBdn |
| s32 | slide c32 | 11.4 | pp5oNhzsh757DyAY2fU6 | 8oqMIAM8utzWU9WdYBWg |
| s33 | slide c33 | 4.9 | E5q7IF6QIrcGjs25zSdS | 5vxw1HH2UpmhmpTFklbd |
| s34 | slide c34 | 9.1 | 0Gg8UCx1g5jtBXEsKyEY | eOdWEBYFVXwjob4HM2AN |
| s35 | slide c35 | 11.5 | dxnzhamA9gWkX2QXoLTT | PY0Ln8ff00mB4EWYlI2s |
| s36 | slide c36 | 17.4 | ssyuoNGoaqpigtOpTH4G | wgEhUBH1n6nR37LLjI4p |
| s37 | slide c37 | 3.2 | 9Wjpof77oOQx4jjVkZz8 | va8ViEjjc5vmj6fVFApi |
| s38 | avatar | 7.2 | RfQMtvNNCMAgiyGA87US | MpYTVInadv7g4z6zu9rm |
| s39 | slide c39 | 10.1 | ebuEB1SVCPD9iyr26fPl | u5GldKbQMFT0AfAFk5pP |
| s40 | avatar | 6.8 | B5poTjdr59zThrUQW6ds | 0VIZ31f5dNTU2ya3xF97 |
Totale grezzo 379,7 s → a 1,12x, con i 15 s di respiro sul clip, **355,9 s (5:55)**
→ con copertina 3 s e chiusura 10 s: **6:08**.

## Asset HeyGen

Batch `e08c066f6857472493b2efabf8ead0f2`, 68 elementi (39 audio + 29 slide),
tutti `completed`. Permanenti: la lezione si rimonta senza rigenerare niente.

**Audio:**
s02 `8b0c0ce03f1c49f6b576d10b61cf2ee6` · s03 `8a5e7e4ae7264994adc61cdae4e664d7` · s04 `be623100296a4f13a94a09326b713f9a` · s05 `16f553d2a7014486996296e9d0825103` · s06 `985068d500d14999b1ee3354c104e758` · s07 `a25329437b6f4ac3bc0a0f153340da3e` · s08 `74a52ee1555149b5ad485dc3bdbc12d5` · s09 `c8ad632ef0f849e8abf2b94bbffacac5` · s10 `0e9fcc2ecfb644ff9cd27a46cfa67447` · s11 `b2a421f9e59e4244ad63d034a81150fa` · s12 `5f693343ca2041228c5c1d902cf35a91` · s13 `93e304558bf74b708188698abab319e8` · s14 `262799327c2c4cb18944405337646309` · s15 `d35f594cdf2a48088b390d86dec5de45` · s16 `98c421f68b534ea59ca87f8491b9cd53` · s17 `5c4526d7a9674f5c8bef65f99921f71e` · s18 `94d5ed71627f4307b8cc1a2d45aae7a2` · s19 `b1a4c803f63e477ab616bec74ef39a88` · s20 `4196d8aa9db64e34ad4b73a97ca203ee` · s21 `23b19fabac5b41db95a6a0c4e57b5e55` · s22 `919a55ad7c7644aea1a58cf205a830b5` · s23 `80a5be79483e418a9c8cdd4d88729beb` · s24 `f5ff18602aae435a854cb398f5019599` · s25 `22c3130e9cd7465b8ad86fed0a4a39f8` · s26 `90a96f7ea9e246eea5efe16b5f3d741e` · s27 `aeccaaeeb7b94349b7a14cb4ec27b323` · s28 `4ed8a5e8b1014837a029542f6356aebb` · s29 `f98bbfe5ec6246d79a9c6a8792f16a46` · s30 `07148fd6b58c40909dd9b0729b256972` · s31 `3f5712bb8cab4b0cb483bdf5fc2d2bce` · s32 `de99ccf4ccdb4082b5393258a4df8ce4` · s33 `4557c4c947b542e2b15c73ad1ce5c280` · s34 `22a5462cf34349e6b81ce1862e83ac1f` · s35 `f6a4463ecc224ed88ff02160751f3465` · s36 `eb24eedee5d5426a998ee313bc02d0b0` · s37 `913e484268ff4b2390641eae9d514691` · s38 `77d3bf8657024386a3bf29a5a0b5f055` · s39 `f5d3284954d04a269d75bb069adbdc60` · s40 `52ee016727364b35b303d34779d2947a`

**Slide:**
c01 `7a06e8be56c945a0b10dc3da8c34e1fd` · c03 `db26395f6d02453391e2799b3c51d25f` · c04 `05b79846f60242e58e86c3485118313e` · c05 `9a62ca0b9d814a17a5c261c7babdba94` · c06 `ef5db74882f243a985add59e3cbf1b71` · c07 `894eae82b36447749270b2bde8d81d39` · c08 `7575d989c4564f5eb86ae4b58acf744c` · c09 `9da33314105e4581b08774ec0f80cf83` · c10 `1c664206f353430495057845f80c63db` · c13 `bc9d12767c6045869e07e1cf40d7067a` · c15 `e71e6505844d4db58015c9c173200567` · c16 `2bdc01b1539c492780ad459bbc0b42e2` · c18 `a359d27c8bb14a1ea1ea67261a83e728` · c19 `e2cf68f49a564f8ba7a8f3898a421301` · c21 `79c328f7eabf442d9901ea8a4590e450` · c22 `0906ba69b083499686e196c22faee4e7` · c23 `000c7df7667e4ff095db3e04eb19ee19` · c24 `2bef29c2648445f2a27827e77561e6d8` · c25 `01ae66fa18e34548acabe64138be7035` · c26 `80cf4f14a8f84900ae10296b54563c95` · c28 `0dce43f54f07419fb00a1c5f5e6ff456` · c32 `3b6173771026454ebca2ac11f5ad6f66` · c33 `133985f0752e496682987cab5921f7ec` · c34 `283a1b121c4e4a58a7e684987fac24f6` · c35 `4f53c7ff4748405fb3a89b9a3f09a4fd` · c36 `765738f1355e44e580cec7781e47df7f` · c37 `0e06a40e1df94e09a7352db22c44d0c1` · c39 `d2173715de0d4733a1da132b3cb0d02f` · c41 `f20736385ec24b28a1ac5e7a0827f6ad`

## Clip

Scena 11: una cucina di sera, due tazze sul tavolo, la finestra socchiusa, nessuno
in campo. Artlist, Kling 2.6 Pro, 5 s, 16:9, muta.
Generazione `01a07bd6-ef75-79fe-9f38-2e6d7c0eb10b`.

## Testo aggiunto rispetto allo script

Lo script puntava a 6:00 a 0,95x: accelerato sarebbe finito intorno ai 4 minuti,
e i tre livelli sarebbero rimasti una definizione letta. Sviluppati:

- **un blocco e una slide per livello** invece di un elenco unico;
- **l'intenzione non viaggia, viaggia il tono** — il punto piu' controintuitivo
  della lezione, che nello script era solo accennato nella seconda trappola;
- **tre segnali per capire da che livello sta parlando l'altro** (ripete la stessa
  cosa, si accende su un dettaglio, dice «sempre» e «mai»): la parte pratica che
  mancava, quattro blocchi;
- **riconoscere non e' cedere**, perche' e' l'obiezione che arriva subito dopo
  l'esempio del richiamo.
