# Corso 1.2 — Il significato lo decide chi ascolta

Modulo 1 di "Dire, ascoltare, convincere". Prodotto secondo `produzione/STANDARD.md`:
voce ElevenLabs accelerata a 1,12x, avatar mai scontornato, molte slide a piena
inquadratura, copertina 3 s, chiusura 10 s, sottotitoli impressi.

**Video finale:** `19fc77179f1b6f8df08e962e9faaf6cb`
**Struttura:** 36 scene — 11 avatar, 24 slide, 1 clip.
**Durata finale:** 6:28 (388,2 s). Render in 6 minuti.

## Avatar: cambio di look, solo per questa lezione

Achille ha chiesto un look diverso dalla 1.1. Scelto `d679a1daf79e4597ab5ffbea8ad495e9`.
La 1.1 resta con "Aki in his studio" `89cf01e0c22547169c460186be0c67a8`.

**Aggiornamento:** dalla 1.3 in poi il default torna a
`89cf01e0c22547169c460186be0c67a8` ("Aki in his studio"), indicato da Achille per
identificativo — lo stesso della 1.1 e dei video del canale. La 1.2 resta l'unica
montata su `d679a1da…`.

I due look mostrano la stessa stanza e si confondono a occhio. `get_video_scenes`
su un video restituisce l'`avatar_id` di ogni scena: è l'unico modo affidabile per
sapere su quale look è montato qualcosa. Verificato così che tutte e undici le
scene con avatar della 1.2 sono su `d679a1da…`.

Nota operativa: le anteprime dei look non si possono vedere da qui, il proxy blocca
`files2.heygen.ai`. La scelta si fa sui nomi restituiti da `list_avatar_looks`,
oppure guardando la libreria su app.heygen.com. Il gruppo "Aki"
`2ecf65e58df54cd7bda384da43c27f2d` ha 57 look; quelli orizzontali adatti al 16:9
sono la maggioranza, i pochi in verticale vanno evitati.

## Aneddoto — DA CONFERMARE PRIMA DI PUBBLICARE

Lo script segnava la scena 6 come segnaposto. L'ho scritto io, ed è **inventato**:
in reparto, alla domanda di un familiare rispondo "per adesso è stabile" intendendo
"non sta peggiorando", e lui capisce "non c'è più niente da fare" e chiede se deve
chiamare gli altri figli. È raccontato in prima persona, come una cosa vissuta:
va sostituito con un episodio vero o riformulato come esempio generico.
Sta nelle tracce s16 e s17, e la slide c18 ne cita la frase.

Lo stesso vale per l'aneddoto della 1.1 (scena 11, il reparto), ancora da confermare.

## Tracce vocali

Tutte con voce "Achille nuovo 1" `KerPEYZvLEWNATg4AARX`, `eleven_multilingual_v2`,
`generations_count: 1`. Durate in secondi **prima** dell'accelerazione.

| id | scena | s | flow_id | session_id |
|---|---|---|---|---|
| s02 | avatar | 12.3 | lzOru4QxFd5UgfytYnQA | OqbRqlVLTiGMjFsbccPf |
| s03 | slide c03 | 16.0 | dFN21Oqy6Xn9n74UeemP | JMpUcTJc5Hid6wDospQg |
| s04 | clip | 14.4 | X4kuWeH0llfOuwxkC6kv | 1se5t8MIiLKh6SrJfgCi |
| s05 | slide c05 | 9.0 | doCgRWMM42wdj1WgQ5CP | hDquptEl4nKUL7YTJhSy |
| s06 | avatar | 9.4 | JREiiRV5a6FOOMQHFB7N | Q9t3Q9MopNMMl4Mz9ybP |
| s07 | slide c07 | 7.6 | L3qTJ7L90R6jMXN2HCBg | okkFWUFF4IZ7oH74zDwl |
| s08 | avatar | 15.3 | rRQA6lEgTx47DzlfmWIA | PySLTVQ4anj49Jri7YN9 |
| s09 | slide c09 | 7.6 | CF8DdBnaahiPAuUlSdKR | dYAQp7fsZ5VxrVkG6WrQ |
| s10 | avatar | 14.5 | NoFA9HDi4b0kkqgDvahb | gAwfOiuv38vQ1ZgWj1BP |
| s11 | slide c11 | 11.1 | YKdLB2MXcXjuZpWGqIyq | EKuGVoQJ8oJSCqY7uVtU |
| s12 | slide c12 | 19.4 | zEhs1ULje26sMCmL2TG9 | SyZgLFe3fhqC12N62d3f |
| s13 | slide c13 | 18.2 | dq0Z6lC2umZ9shtNZCOO | Obnh641t51DtcfZNhRlf |
| s14 | slide c14 | 13.2 | gdRjZq8P4Nvv1haDHIhn | wgrn9JVtFhtisZ5fxEtY |
| s15 | slide c15 | 12.3 | nEdaWaWsABxfSkqSKD9q | Zq70tu12ORgek21zuFs5 |
| s16 | avatar | 23.6 | 7Qc8IU9trTjb3bHld5u2 | Lpxo8PtdHUbu67GDEVAd |
| s17 | avatar | 16.0 | 81dO5alTNhjVsUiIr2Hp | oolQRvzDqDHihvezuGtU |
| s18 | slide c18 | 10.5 | WUrlJSGjRl7TMaSf1Z6l | 0Zj6dCrDKrlPKI6YKIXR |
| s19 | avatar | 15.7 | BgPEiy5vgPYcDM53i9r1 | i3lz4Jm5r878Ff06ED8C |
| s20 | slide c20 | 11.5 | 8z0fL5URHEXS5wKTJBfA | Q1es1poV7FU3po1esXHf |
| s21 | avatar | 5.9 | qUKwpNqzQlaAzwY8uSya | PGqouMW7XBIleY1OgYJU |
| s22 | slide c22 | 9.9 | iXOHys6yQ3DfPgcIXR8O | gVi4kHIFq4fyLFVrIDsC |
| s23 | slide c23 | 21.6 | xJhbZ8v817eyVKEKvRp3 | s2ZeeG7USfDT0FM7fJP1 |
| s24 | slide c24 | 9.8 | sPKHNKeeBWD6pL6YjyA5 | 3GUZE79eZmdZGHLeYG0e |
| s25 | slide c25 | 14.5 | 2Mo7Q1RsZH81Y5RBAtJN | VmKxCvRhw1nEVgGFPaYc |
| s26 | slide c26 | 8.5 | g6PN1i46g7wxf3FYKym1 | KoqYSMo7hsrL1SF4Ahuf |
| s27 | avatar | 10.0 | f24HEyhMBAJSNL1Jtydz | lN1dQZBCI0FbK2LEljLQ |
| s28 | slide c28 | 11.0 | Jjh8kut2uJ2yFYDMYRm8 | pBhvc2XjopxGZ2YLaisY |
| s29 | slide c29 | 18.6 | FXtuhJMSGRy7XFoAUnPD | nffdrRagkbxU7f3kuPcw |
| s30 | slide c30 | 8.6 | UP6BaBP955nICxDbWitY | 4Eq4J15OlbI67t9bUaF9 |
| s31 | slide c31 | 7.8 | YVOn6I3DLC4zB1jQgEBO | la2SUWjhdWGDTD7UH6iD |
| s32 | slide c32 | 5.4 | TYFmIyIfOtH8lRmxmm3o | kQhvV1T3LqVXkz8sfmkR |
| s33 | avatar | 10.3 | J8fG981Spe83VuaUl8lI | h9xiSLfgliJvWpqC558M |
| s34 | slide c34 | 7.0 | odrq8JpaGHt2d2CSSRsS | Tf6YOS5Tu5jpzuJDeWTG |
| s35 | avatar | 14.0 | z7Huinz5fUGI6Hqo6gTN | B47l3t0w2mZlq52vgmh3 |
Totale grezzo 420,7 s → a 1,12x **377,3 s (6:17)** → con copertina e chiusura **6:30**.

## Asset HeyGen

Batch `36c8115ee5cd459cb8a4ec9287ef0e58`, 58 elementi (34 audio + 24 slide),
tutti `completed`. Sono asset permanenti: non scadono, quindi la lezione si può
rimontare in qualsiasi momento senza rigenerare niente.

**Audio:**
s02 `1a397f0d87574959a17a219e89a1b4a4` · s03 `9d49fc1e35f4449890ab68f1f8f1ce8a` · s04 `f850f787df6b4f3aa96ae38f76599225` · s05 `1e26aa10f639485ba398af975835f3e5` · s06 `f63809d38daa42da80dd4e88c27e3df8` · s07 `4c11b8739888442a805d8d4975861747` · s08 `0bc99d8395804afb8360afe3a46e2b14` · s09 `c24db77367d74667901b4f67eafe6feb` · s10 `03472f435dec47929983fb20c9ba4a4e` · s11 `f46abf7a2edb479aa59d235f1597e1f7` · s12 `1a90c1f4d6c049efb78efe007c73b0d1` · s13 `b61924e6e82b40feb33a618c443e0f10` · s14 `3d40d5a7cc964f75bb6237d14a7daad2` · s15 `68d55facef7c49e7ae5035fe6575c9d5` · s16 `102d6b94e8b649adaf0b64276d09277f` · s17 `47a6a95c5174454087f40938bbf5a046` · s18 `7f08af8ed305436284b353e270edf9ae` · s19 `3bf38a7b19bf4001b50477f8adf77a31` · s20 `6a592a69b2be4abb8d6713e1a0def18a` · s21 `306499abf8174718b6e01798a3d47e0e` · s22 `af8ff89d6bb04b0db010d53c3b4c7eed` · s23 `4f6102a110874c4bba676d16aa87cfde` · s24 `1e34cac7aee64e1087c6666b4c4328aa` · s25 `3f40cb44dfe64fa695bfd8b082ba62e7` · s26 `835757a418244af28e365de886e5aab2` · s27 `e6b6bc9a64ed4d7eaad2fc5c6d86fa8f` · s28 `00ab669aedb648f4bf1be13c236c8a04` · s29 `8b4f5b0d93594c4f98259c9c3c4dd3ad` · s30 `b6272d5165474389afd6c4b3b9efe3b2` · s31 `59a7cd47ad4a4e6d94ed51e57c2e19a5` · s32 `625e9d3074224150a1a57c89604a2d4f` · s33 `ad01acfa7177471393690169ceb34590` · s34 `592a9e758f174b68910d729131a4a57e` · s35 `2dd117701e4042a88eae49eefea70f62`

**Slide:**
c01 `07e861ab196e4439b0fa448aabaa876d` · c03 `21dc4cc3b7ac49a2a0daeb30f0fdf22b` · c05 `f94194cb1d0745ee93ddc61b7df62078` · c07 `e9c4d47f9db048eca84e0ab1ddd4e1ae` · c09 `6cc6039ea4974a57b2230f8f48192a17` · c11 `00e378dbc63643639eae09743bf1a68c` · c12 `def719281d014ef89fb2033a39a5c85a` · c13 `858f59b4521f4f70a41ad5b2437dacdf` · c14 `ac066bedbeb24d9a99e8a54f4a451749` · c15 `706c0bef8bb548c9927adf4840ca8131` · c18 `aa0680a088c246ec8e51ed3e2628dea1` · c20 `77fb46fb2e6e4262a63fd3ec52bff242` · c22 `b3171c00727d4251aa9d660e0950e1da` · c23 `ebc7f32c01274457b71a75d60574e744` · c24 `0cd07d7e839e454ba57d5a235468e7f5` · c25 `7836d2fef80548c38224dab7920c3572` · c26 `6653a485d4564bc6b17eb0fdced798e1` · c28 `2ac1558d357c4cf8aefe1cd191161cf9` · c29 `bbba5f9b49884b99830226cb9f0eb915` · c30 `99f1b143621d41ff8f5f04dbef31234b` · c31 `562f6bccb6e64aa8baef0988857f5252` · c32 `169f536abf594bd2bc321f1c6c8225c4` · c34 `0c99844430ae4b8ba508985509bbe5a1` · c36 `cc402eff7c2e4db3a36e0b57be00fd23`

## Clip

Una sola, scena 4 (corridoio d'ufficio, una persona che si allontana di spalle,
un'altra ferma sulla soglia). Artlist, Kling 2.6 Pro, 5 s, 16:9, muta.
Generazione `01a07b95-cd03-7076-87d4-da673a477334`. Montata con
`playback: {mode: "fit_to_scene", mute: true}` così si allunga sotto i 14 s di voce.

## Scaletta

| # | tipo | contenuto |
|---|---|---|
| 1 | copertina | 3 s |
| 2 | avatar | «ne parliamo domani»: due letture della stessa frase |
| 3 | slide c03 | le due letture a schermo |
| 4 | clip | il significato si forma dall'altra parte |
| 5 | slide c05 | le parole sono un innesco |
| 6 | avatar | il punto più scomodo del corso |
| 7 | slide c07 | non sei tu a decidere il significato |
| 8 | avatar | con che materiale ricostruisce |
| 9 | slide c09 | giornata, storia con te, aspettativa |
| 10 | avatar | non è colpa di nessuno |
| 11-15 | slide c11-c15 | i quattro filtri, uno alla volta |
| 16-17 | avatar | l'aneddoto (inventato) |
| 18 | slide c18 | «per adesso è stabile» |
| 19 | avatar | la parte utile: verificare |
| 20 | slide c20 | puoi controllare se hai verificato |
| 21 | avatar | la domanda che facciamo tutti |
| 22 | slide c22 | «è chiaro?» non verifica niente |
| 23 | slide c23 | i tre motivi del sì |
| 24 | slide c24 | quel sì non contiene informazione |
| 25 | slide c25 | «come l'hai capita?» |
| 26 | slide c26 | «ripetimi cosa facciamo» |
| 27 | avatar | l'errore dalla tua parte |
| 28 | slide c28 | la stessa verifica, senza esame |
| 29-30 | slide c29-c30 | i due errori da evitare |
| 31 | slide c31 | averlo detto non è arrivare |
| 32 | slide c32 | memo |
| 33 | avatar | la prova di oggi |
| 34 | slide c34 | i tre passi della prova |
| 35 | avatar | ascolta fino in fondo |
| 36 | chiusura | 10 s |

## Testo aggiunto rispetto allo script

Lo script originale mirava a 6:00 a velocità 0,95x. Accelerando a 1,12x sarebbe
sceso sotto i 5 minuti, e i quattro filtri sarebbero rimasti una lista letta.
Ho sviluppato i punti che erano solo enunciati — un blocco per ciascun filtro, i
tre motivi per cui si risponde sempre di sì, la differenza fra le due domande —
e la lezione torna a 6:30 con più slide e non con più parole per slide.
