# Prompt per Claude Code (HeyGen · HyperFrames)

Crea con HeyGen HyperFrames il trailer «Padova si accende» (90 s, 16:9, 25 fps) usando SOLO gli asset di questa cartella.

1. Segui `storyboard.json` al decimo di secondo. Dove la regia dice «rallentare al 50%», allunga la clip a 10 s con interpolazione fluida (optical flow), senza scatti.
2. Testi: Instrument Serif; le frasi «che fanno male» compaiono lettera per lettera (macchina da scrivere lenta, 18 caratteri/s) su nero; le altre in dissolvenza dal basso. Etichette in Work Sans Bold maiuscolo spaziato.
3. Colore: prima metà fredda e desaturata (−30% saturazione, bilanciamento verso il blu), seconda metà calda; transizione graduale nella scena in cui entra la musica.
4. Suono: Sinfonia in tre movimenti. 1) Città di notte: un solo battito, il vento. 2) I frammenti: ogni immagine ha il suo suono (lo scialle, il vento nella piazza, la pioggia, lo spot) che si sovrappone in un crescendo quasi insopportabile, poi STOP: 2 s di silenzio. 3) Pianoforte e coro di voci femminili senza parole, che si aprono sui passi.
5. Voce: genera l’audio da `voce_fuori_campo.txt` (coro di voci (donne e uomini), una frase per voce, poi tutti insieme sull’ultima.), sottotitoli da `sottotitoli.srt` in basso, piccoli, discreti.
6. Niente effetti flash o glitch: il montaggio segue il respiro.
7. Finale: cartelli rosso profondo nell’ordine dello storyboard; il QR resta a schermo almeno 3 s.
8. Esporta MP4 H.264 alta qualità e mostrami un’anteprima prima del render finale.
