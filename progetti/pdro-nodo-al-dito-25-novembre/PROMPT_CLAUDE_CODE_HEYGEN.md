# Prompt per Claude Code (HeyGen · HyperFrames)

Copia questo testo in Claude Code, nella cartella scompattata di questo pacchetto.

---

Crea con HeyGen HyperFrames il video riflessivo «Un nodo al dito» per il 25 novembre (76 secondi, formati 16:9 e 9:16, 25 fps). Nessun avatar: solo immagini, clip, testi e voce fuori campo.

1. Leggi `storyboard.json`: contiene scene, tempi, asset, testi a schermo e voce fuori campo. Rispetta i tempi al decimo di secondo.
2. Usa SOLO gli asset di questa cartella: `clips/`, `images/`, `cards/`, `brand/`. Dove l’asset indica `[formato]` usa `16x9` o `9x16` secondo il formato che stai esportando. Per le immagini fisse applica un Ken Burns lentissimo (scala 100→108%). Le clip verticali in un video 16:9 vanno centrate su sfondo prugna #26182A con bordi sfumati; le clip orizzontali in 9:16 vanno ritagliate al centro. I cartelli `02_` e `04_` hanno lo sfondo trasparente e vanno sovrapposti all’immagine indicata.
3. Testi a schermo: Instrument Serif per le frasi, Work Sans Bold maiuscolo spaziato per le etichette, avorio #F4EDE2; il rosso #B21E2C solo per il filo e le parole chiave. Animazione: dissolvenza dal basso +12 px, 0,6 s, ease-out; uscita in dissolvenza 0,4 s.
4. Voce fuori campo: chiedimi su quale dei miei due account HeyGen lavorare, poi genera l’audio da `voce_fuori_campo.txt` con questa voce: Voce narrante maschile italiana, profonda e calda, timbro baritonale da grande doppiatore; ritmo lento, pause lunghe tra le frasi, tono intimo e mai enfatico (circa 2 parole al secondo). Fammi ascoltare 2 o 3 voci candidate prima di scegliere. Allinea ogni frase ai tempi e aggiungi i sottotitoli da `sottotitoli.srt` in basso, centrati, avorio con ombra morbida.
5. Musica: pianoforte solo, poche note; un violoncello leggero entra a 47 s. Volume −20 dB sotto la voce, −10 dB senza voce. Solo musica con licenza.
6. Transizioni: solo dissolvenze incrociate lente (15–20 frame).
7. Finale obbligatorio: `cards/06_chiusura_*.png` per gli ultimi 4 secondi.
8. Esporta in MP4 H.264 alta qualità, prima il 16:9 poi il 9:16, e mostrami un’anteprima prima del render definitivo.
