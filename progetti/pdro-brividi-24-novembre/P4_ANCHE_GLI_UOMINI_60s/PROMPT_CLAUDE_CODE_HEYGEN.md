# Prompt per Claude Code (HeyGen · HyperFrames)

Crea con HeyGen HyperFrames il trailer «Anche gli uomini» (60 s, 16:9, 25 fps) usando SOLO gli asset di questa cartella.

1. Segui `storyboard.json` al decimo di secondo. Dove la regia dice «rallentare al 50%», allunga la clip a 10 s con interpolazione fluida (optical flow), senza scatti.
2. Testi: Instrument Serif; le frasi «che fanno male» compaiono lettera per lettera (macchina da scrivere lenta, 18 caratteri/s) su nero; le altre in dissolvenza dal basso. Etichette in Work Sans Bold maiuscolo spaziato.
3. Colore: prima metà fredda e desaturata (−30% saturazione, bilanciamento verso il blu), seconda metà calda; transizione graduale nella scena in cui entra la musica.
4. Suono: Pioggia sul parabrezza, il motore spento, un respiro rotto. Silenzio di 1,5 s. Poi una casa: voci lontane di bambini, e il pianoforte, in maggiore.
5. Voce: genera l’audio da `voce_fuori_campo.txt` (maschile, calda, sincera (consigliata una voce reale di un delegato o di un padre).), sottotitoli da `sottotitoli.srt` in basso, piccoli, discreti.
6. Niente effetti flash o glitch: il montaggio segue il respiro.
7. Finale: cartelli rosso profondo nell’ordine dello storyboard; il QR resta a schermo almeno 3 s.
8. Esporta MP4 H.264 alta qualità e mostrami un’anteprima prima del render finale.
