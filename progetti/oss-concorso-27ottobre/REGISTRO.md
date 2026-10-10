# REGISTRO HEYGEN — 10 ottobre 2026
Account: quello collegato al connettore Claude
Metodo: Video Agent (mode generate), 16:9
Avatar: Aki in his studio — 89cf01e0c22547169c460186be0c67a8
Voce: default del gruppo Aki — 9f5f7b5a581c4129a1474a03268df352
Batch asset slide: a00046f229a54f8eaf3237e7f0da80c9 (14 PNG, S01…S18)
Sessione Video Agent: 1dfe90b1bfd34881872457ae1a9a6b4d
Video ID: aedd53881a3f4997b2d608b8e7e092c7
Segnaposto rimossi: chiusura con "Link in descrizione"

## Versione 2 — montaggio da studio, voce Achille nuovo 1 su eleven_v4
Voce: Achille nuovo 1 — 9b851842ce54449fb9ff501751ca0271 (ElevenLabs, model eleven_v4, speed 1.12)
Avatar: Aki in his studio — 89cf01e0c22547169c460186be0c67a8
16:9 · 1080p · sottotitoli impressi + SRT
Video ID: eac822a27e948343f6c49820b014720e

## Versione 3 — 10 ottobre 2026, sessione Claude Code (repo Prove)
Account HeyGen: quello del connettore (scelto da Achille)
Voce: Achille nuovo 1 — KerPEYZvLEWNATg4AARX (ElevenLabs), modello eleven_v4 (scelto da Achille
      al posto di eleven_multilingual_v2), 1 variante per scena, flusso 7X757S3nlx6FsLFU5jDM.
      I tag <break> tolti (il v4 non li legge): pause affidate alla punteggiatura.
      Pronuncia: «A4» scritto «A quattro»; in S17 «OSS» → «operatore socio sanitario».
      ID delle 16 generazioni: audio/tracce.json
Post-produzione: silenceremove (pause oltre 0,45 s ridotte a 0,35 s) + atempo=1.12 + 0,25 s di coda.
      Parlato 280,6 s → video ~4:54 con copertina 3 s e chiusura 10 s.
Logo: logo_cisl_fp.png (CISL FP Padova Rovigo, 225x109 trasparente) dai progetti precedenti.
      render_slides.py: pastiglia bianca dietro il logo sui fondi verdi/rossi (S01, S09, S18),
      dove spariva; in chiusura il logo è ingrandito.
Lotto asset HeyGen: 01241d83148949dc9fe31f0118e1742e (16 audio + 14 PNG) — id in heygen-lotto.json
Avatar: Aki in his studio — 89cf01e0c22547169c460186be0c67a8 (photo avatar, orizzontale)
Montaggio: create_video_from_studio, 18 scene, 16:9, 1080p, sottotitoli impressi + SRT
Video ID: 7ff9f14d3a502dc08de9d1fca4156fca
Render completato: 292,56 s (4:52,6), 1920x1080, 25 fps. Scaricati la versione con sottotitoli
impressi (caption.mp4, 82,5 MB) e l'SRT (145 righe, in repo: OSS_Concorso_27ottobre_v3.srt).
Copia d'invio _invio.mp4: 680 kb/s in due passate, 28,4 MB. I video restano fuori da git.
Controlli: fotogramma a metà di ogni scena, 18 scene nell'ordine giusto; nell'SRT (trascrizione
HeyGen dell'audio) A4, concorsi@azero.veneto.it, DPR 445 del 2000, Kioene Arena, 18 bis risultano
resi correttamente. Sottotitoli impressi in stile «default» di HeyGen: piccoli.
Da confermare prima di pubblicare: S15, permessi retribuiti per concorsi (articolo CCNL vigente).
