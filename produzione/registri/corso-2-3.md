# Registro — 2.3 «Il silenzio come strumento»

Senza avatar, voce Luca Ward, slide animate. Stesso trattamento della 2.2, con
in più una scena che non è una slide: otto secondi di stanza vuota e musica,
messi dove la lezione chiede al pubblico di stare zitto.

| campo | valore |
|---|---|
| video_id | `d3a0cc9ce862840706e3800569af77af` |
| scene | 41 — copertina, 12 blocchi, la pausa, 26 blocchi, chiusura |
| formato | 16:9, 1080p, sottotitoli SRT |
| durata attesa | 364,2 s (6:04) |
| parlato | 343,2 s |
| pagina | https://app.heygen.com/videos/d3a0cc9ce862840706e3800569af77af |

## Il copione è stato riscritto

Da **2.600** caratteri a **6.020**, cioè da poco più di due minuti a quasi sei
di parlato. Non allungando le frasi: aggiungendo quello che mancava.

- i **tre silenzi** — attesa, peso, rifiuto — e perché il terzo è insieme il
  più potente e il più rischioso: usato male diventa il castigo che in
  famiglia dura tre giorni;
- la differenza fra attesa e ostilità, che **sta negli occhi**: stesso
  silenzio, stessa durata, sguardo altrove, significato opposto;
- i **tre riempitivi** — «capisco», i rumori, il silenzio guardando altrove —
  con la prova che smaschera i rumori: li facciamo anche al telefono, dove
  nessuno ci vede;
- la parte scomoda: i tre secondi **non** sono una tecnica per far parlare
  l'altro. Se li usi per quello si sente.

Niente aneddoto, qui: quello spazio se lo prende la pausa vera.

## La pausa

Fra s13 e s14 c'è una scena che non ha parlato. Il copione dice «adesso stai
zitto insieme a me»: se subito dopo continuasse la voce, la lezione
contraddirebbe se stessa. Quindi:

- **b-roll Artlist**, 5 s in loop: stanza vuota, due sedie, la polvere nella
  luce della finestra. Muto;
- **musica**, 8 s generati con `eleven_music_v2` — una nota di piano che
  decade su un pad, nessuna percussione, dissolvenza in coda. Verificata
  strumentale: la trascrizione torna vuota.

Artlist genera anche musica, ma il suo minimo è **60 secondi** e il file non
si può scaricare da qui per accorciarlo (il proxy blocca
`cms-toolkit-artifacts.artlist.io` in download; per HeyGen, che se lo prende
da sé come URL di scena, va benissimo). Da lì il passaggio a ElevenLabs.

La scena porta il proprio audio, e questo evita di rimbalzare nella trappola
della scena `video` muta, che non dura quanto la clip.

## Le tre grafiche

| slide | cosa mostra |
|---|---|
| c05 | il **3** in oro grande su panna, «secondi» accanto |
| c10 | le due versioni della stessa risposta, con «tre secondi» in mezzo |
| c23 | i due occhi: lo sguardo addosso e lo sguardo altrove |

## I tagli

Trentasei confini, verificati in **tre tornate**: 7 sbagliati alla prima
(tutti corti: il taglio cadeva prima dell'ultima frase del blocco), 2 alla
seconda, zero alla terza. Un caso, s06, `tagli.py` non lo ha corretto da solo
perché lo scarto era sotto la soglia di 0,35 s: la parola persa era «Tre.»,
tutta la battuta del blocco. Spostato a mano al silenzio successivo.

Vale la pena ricordarlo: la soglia serve a non inseguire il rumore, ma quando
la coda mancante è una parola sola che porta il senso, il conto dei caratteri
la fa sembrare irrilevante. Guardare le code trascritte, non solo i delta.

## Blocchi

Il punto `·` segna le slide grafiche.

| blocco | slide | tipo | durata (s) |
|---|---|---|---|
| s02 | c02 | frase | 10.75 |
| s03 | c03 | frase | 8.70 |
| s04 | c04 | frase | 17.18 |
| s05 | c05 | numero **·** | 8.26 |
| s06 | c06 | elenco | 6.77 |
| s07 | c07 | frase | 5.45 |
| s08 | c08 | frase | 7.71 |
| s09 | c09 | frase | 12.33 |
| s10 | c10 | disegno **·** | 10.56 |
| s11 | c11 | memo | 9.75 |
| s12 | c12 | frase | 14.33 |
| s13 | c13 | frase | 5.92 |
| — | — | b-roll stanza vuota + musica | 8.00 |
| s14 | c14 | frase | 9.09 |
| s15 | c15 | frase | 7.18 |
| s16 | c16 | frase | 8.68 |
| s17 | c17 | frase | 14.59 |
| s18 | c18 | frase | 10.48 |
| s19 | c19 | frase | 7.77 |
| s20 | c20 | frase | 5.22 |
| s21 | c21 | frase | 14.52 |
| s22 | c22 | memo | 5.05 |
| s23 | c23 | disegno **·** | 10.01 |
| s24 | c24 | frase | 12.81 |
| s25 | c25 | frase | 6.76 |
| s26 | c26 | citazione | 7.94 |
| s27 | c27 | frase | 14.51 |
| s28 | c28 | frase | 8.01 |
| s29 | c29 | frase | 6.50 |
| s30 | c30 | frase | 14.80 |
| s31 | c31 | frase | 3.78 |
| s32 | c32 | frase | 9.36 |
| s33 | c33 | frase | 16.85 |
| s34 | c34 | memo | 3.21 |
| s35 | c35 | frase | 3.00 |
| s36 | c36 | frase | 12.20 |
| s37 | c37 | frase | 5.32 |
| s38 | c38 | frase | 6.68 |
| s39 | c39 | frase | 1.22 |

## Da verificare

Non sento l'audio e non vedo il montato: ho controllato le slide da ferme e i
36 tagli con la trascrizione. Restano da giudicare il volume della musica
sotto la pausa e la giunzione fra s13 e s14, dove si saldano le due
generazioni della voce — che qui cade dentro la pausa, ed è il posto migliore
in cui potesse cadere.
