# Prompt per Claude Code (HeyGen · HyperFrames)

Crea con HeyGen HyperFrames il trailer ««Dove sei?»» (30 s, 9:16, 25 fps) usando SOLO gli asset di questa cartella.

1. Segui `storyboard.json` al decimo di secondo. Dove la regia dice «rallentare al 50%», allunga la clip a 10 s con interpolazione fluida (optical flow), senza scatti.
2. Testi: Instrument Serif; le frasi «che fanno male» compaiono lettera per lettera (macchina da scrivere lenta, 18 caratteri/s) su nero; le altre in dissolvenza dal basso. Etichette in Work Sans Bold maiuscolo spaziato.
3. Colore: prima metà fredda e desaturata (−30% saturazione, bilanciamento verso il blu), seconda metà calda; transizione graduale nella scena in cui entra la musica.
4. Suono: Vibrazioni del telefono che accelerano come un battito (ogni bolla = una vibrazione). Al secondo 13 il telefono si gira: silenzio di 1,5 s. Poi pianoforte lento in tonalità minore che si apre in maggiore sul titolo.
5. Voce: genera l’audio da `voce_fuori_campo.txt` (femminile giovane, calma, decisa.), sottotitoli da `sottotitoli.srt` in basso, piccoli, discreti.
6. Bolle di messaggio: crea 7 bolle chat bianche (angoli 28 px, ombra morbida) con i testi di `storyboard.json > bolle_messaggio`, che entrano dall’alto con un piccolo rimbalzo e una vibrazione; l’ultima in rosso #B21E2C. Spariscono insieme quando il telefono viene girato.
7. Finale: cartelli avorio nell’ordine dello storyboard; il QR resta a schermo almeno 3 s.
8. Esporta MP4 H.264 alta qualità e mostrami un’anteprima prima del render finale.
