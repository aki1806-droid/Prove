# REGISTRO — Reel «Decreto PA 2026 – cosa cambia per la sanità pubblica»

fonte            origine/script-origine.md (copione dell'utente, 8 scene, 9:16)
voce             Achille nuovo 1 (KerPEYZvLEWNATg4AARX) · eleven_v4 · it
flusso ElevenLabs XmMlP0mBkDbaMj43zzQQ
varianti voce    grezzo-1 ZPEFVR0R5oxJW0TmkFdb 175,2 s · grezzo-2 csbz2mOGn1oNEqVC5Mfi 174,1 s
                 grezzo-3 5WwIpb59eY5umriMSBsR 175,9 s · grezzo-4 3BKyGJMWn4kD65UowSPG 173,4 s
                 (2.771 caratteri → ~15,9 car/s lordi)
variante scelta  grezzo-1 (ZPEFVR0R5oxJW0TmkFdb). La «trascrizione» di Scribe sulle 4 varianti
                 restituisce il copione identico (allineamento, non ascolto): non scopre
                 errori di pronuncia. Scelta su misure oggettive (misura-varianti.py):
                 nessuna pausa > 0,6 s, I -20,5 LUFS, LRA 3,2, picco -2 dB. Da ascoltare.
tempi scene      audio/tempi-scene.json — tagli dentro le pause reali (silencedetect)
avatar           HeyGen a8b437a707ba4c1e988d5ce449f084ff (photo avatar «Smiling Aki holding a microphone»).
                 I file HeyGen non si scaricano da qui (files2.heygen.ai 403): l'avatar si
                 anima con HeyGen Avatar 4 dentro ElevenLabs partendo dalla foto, e il
                 montaggio si fa in locale.

avatar HeyGen    video 575460429b39d2bd63b639f340e0bd33 (photo avatar, avatar IV, 9:16 1080p,
                 audio = grezzo-1 ricodificato: l'mp3 di ElevenLabs con ID3v2.4 grande
                 viene rifiutato da HeyGen come application/octet-stream), 175,175 s.
                 Non scaricabile da qui: l'utente lo scarica e lo carica in chat.
clip             Seedance 2.0 Mini 720p 9:16, 10 s, senza audio, 4 clip (s2 s4 s6 s8),
                 9.163 crediti l'una. Rallentate alla durata di scena (minterpolate blend)
                 e virate al verde in monta.py.
costi            voce 11.084 crediti (4 varianti) · clip 36.651 crediti · avatar: piano HeyGen
grafiche         slide/scene.mjs + stile.css + rendi.mjs (Playwright, Montserrat da
                 @fontsource): ogni scritta entra sulla parola che la nomina.
                 slide/provino.py verifica che nessun contenuto cada nel riquadro avatar.
montaggio        monta.py (locale, ffmpeg): fondo + scritte + avatar 440x616 bordato in
                 basso a destra; --segnaposto usa la foto ferma.

avatar finale    video HeyGen 4029bde32d85a38eacdc96dad0978d73: stesso avatar e stessa voce,
                 outputFormat webm (VP9 con alfa, 1080x1920, 25 fps, 175,228 s). Scaricato dopo
                 che l'utente ha aperto resource2.heygen.ai nella rete dell'ambiente.
                 Audio dell'avatar allineato a grezzo-1 (pause identiche al ms).
                 Appoggiato in basso a destra: TAGLIO_ALTO 260, altezza 790, x 560.
                 slide/controlla-avatar-video.py: sagoma in movimento a 2 fps contro le
                 scritte, 0 pixel coperti in tutte le scene.

montato          Reel_Decreto_PA_2026_Sanita_9x16.mp4: 1080x1920, 25 fps, 175,2 s, -20,5 LUFS,
                 85 MB (crf 18). Copia d'invio _invio.mp4 a 1180 kb/s in due passate, 29 MB.
                 Entrambi fuori da git (troppo pesanti): si rifanno con python3 monta.py.

## Da verificare
- Testo coordinato in G.U.: le misure di stabilizzazione SSN stanno nella L. 174/2026?
- Contatti delle sedi di Padova e Rovigo per la scena 8: non forniti, nel video
  c'è solo «CISL FP Padova Rovigo – al tuo fianco, una persona alla volta».
- Aggiunta rispetto al copione a schermo: in s3 «È una possibilità, non un obbligo».
- Pronuncia di «PA» e «CISL FP» nella voce: da ascoltare.
- Nessun sottotitolo impresso (non chiesto dal copione); SRT da ricavare dai tempi.
