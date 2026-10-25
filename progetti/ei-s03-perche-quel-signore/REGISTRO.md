# REGISTRO — Eredità Invisibili · Short «Perché quel signore ha la faccia triste?» – Parole senza velo (9:16)

Data: 25 ottobre 2026 · sessione Claude Code (repo Prove). Pacchetto S03 non modificato nei testi.
Scelte di Achille: account HeyGen **del connettore**; voce **HeyGen come passante**; **sottotitoli come il pacchetto**
(Jost avorio con ombra, spenti sulle slide); immagini e clip **le manda Achille**.

## Voce
«Achille nuovo 1», HeyGen create_speech elevenlabs eleven_v4, una traccia con i blocchi uniti da pause (../strumenti/eredita/voci.py).
Pause >0,45 s → 0,35 s, atempo 1,16 (non silenceremove + 1,12 del pacchetto, che presuppone ElevenLabs diretto).

| Scena | Voce |
|---|---|
| S01 | 3.0 s |
| S02 | 5.9 s |
| S03 | 5.9 s |
| S04 | 5.0 s |
| S05 | 6.3 s |

## Avatar
«Aki in his studio» verticale col maglione nero (0385a9674ffa46d18c07a6d17e6f3e7b), a piena inquadratura, mai scontornato;
le scene parlate in camera sono in un solo video (ID in ../strumenti/eredita/ID.md), labiale 23 ms. L'inquadratura scende di
110 px (parete allungata e sfocata in alto) perché le scritte del gancio stiano sopra la testa, con una sfumatura notte per
leggerle sul muro chiaro; i sottotitoli salgono sopra le scritte in basso (nome dell'autore, hashtag).

## Montaggio
../strumenti/eredita/monta.py: dissolvenze incrociate di 0,5 s, Ken Burns lento sulle immagini (zoom massimo 8%), slide con
un respiro di zoom del 3%, sovrimpressioni del pacchetto con dissolvenza, nessuna musica (la aggiunge Achille).

## Immagini e clip
Immagini generate dai prompt del pacchetto (stile «Notturno luminoso», bambini sempre di spalle) con ElevenLabs
gpt-image-2.5-sunburst, 9:16 2K (flow BjDeoBiiVIJxmzZ8DuGu; ID in ../strumenti/eredita/immagini-id.json). Le clip sono
HeyGen image-to-video heygen-video-1 1080p sui movimenti del piano (ID in ../strumenti/eredita/ID.md).
Sulle scene con immagini una sfumatura notte leggera dietro ai sottotitoli e dietro alle scritte in alto.

## Uscita
EI_S03_PERCHE_QUEL_SIGNORE_9x16.mp4: 1080x1920, 25 fps, 31.6 s, 20.8 MB (fuori da git; sotto i 30 MB, è anche la copia
d'invio). Verificati: labiale 23 ms, file integro, foglio di contatto. Originale su HeyGen: asset 02a2744d29634840b029f227fee787ab —
https://resource2.heygen.ai/video/02a2744d29634840b029f227fee787ab/original.mp4

## Da fare (Achille)
- Musica (indicazione del pacchetto nel LEGGIMI): non aggiunta.
- Le frasi segnate «testo di campagna» nel piano vanno confermate prima di pubblicare.
