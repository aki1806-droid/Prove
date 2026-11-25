# Prompt per Claude Code (HeyGen · HyperFrames)

Scompatta tutte le parti del pacchetto nella stessa cartella, poi incolla questo testo in Claude Code.

---

Crea con HeyGen HyperFrames il video «Sentirsi per sentire – il racconto» (4 minuti e 9 secondi, formati 16:9 e 9:16, 25 fps). Nessun avatar: solo le foto vere del convegno, i cartelli, i testi e la voce fuori campo.

1. Leggi `storyboard.json` (38 scene in 5 capitoli, con tempi, asset, regia, testi e voce) e rispetta i tempi al decimo di secondo.
2. Usa SOLO gli asset di questa cartella (`foto/`, `cards/`, `brand/`). Dove l’asset indica `[formato]` usa `16x9` o `9x16`. Ken Burns lentissimo su ogni foto (100→108%; nelle scene di tipo `foto_out` al contrario, 108→100%). Foto verticali in 16:9: centrate su sfondo sfocato della stessa foto. Foto orizzontali in 9:16: ritaglio centrale sul soggetto. Nella scena di tipo `overlay` sovrapponi alla foto della sedia un velo scuro al 55% e il cartello trasparente `q_posto_vuoto_*.png`.
3. Testi: Instrument Serif per le frasi, Work Sans Bold maiuscolo spaziato per le etichette, avorio #F4EDE2, rosso #B21E2C solo per il filo. Animazione: dissolvenza dal basso +12 px, 0,6 s.
4. Voce: chiedimi su quale dei miei due account HeyGen lavorare, poi genera l’audio da `voce_fuori_campo.txt` con questa voce: Voce narrante maschile italiana, profonda e calda, timbro baritonale da grande doppiatore; ritmo lento (circa 2 parole al secondo), pause lunghe, tono intimo, grato e mai enfatico. Nel capitolo della sedia vuota rallentare ancora e lasciare respiri lunghi. Fammi ascoltare 2 o 3 voci candidate prima di scegliere. Allinea ogni frase alla sua scena; aggiungi i sottotitoli da `sottotitoli.srt`.
5. Musica: Pianoforte solo, poche note e molto spazio, per tutto il video. Il violoncello entra sulla lettura del testo della sedia vuota e resta fino alla fine. Volume −20 dB sotto la voce, −10 dB senza voce; quasi a zero sul cartello «Capitolo terzo».
6. Transizioni: solo dissolvenze incrociate lente.
7. Esporta MP4 H.264 alta qualità, prima il 16:9 poi il 9:16, e mostrami un’anteprima prima del render definitivo.
