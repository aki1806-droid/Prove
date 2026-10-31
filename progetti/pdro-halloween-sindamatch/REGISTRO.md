# REGISTRO — PDRO · Halloween 2026: «Il Turno – trailer horror» e «SindaMatch – Halloween edition» (reel 9:16)

Data: 31 ottobre 2026 · sessione Claude Code (repo Prove). Pacchetti PDRO_Halloween_Il_Turno_trailer (questa cartella) e
PDRO_Halloween_SindaMatch (../pdro-halloween-sindamatch). Testi del pacchetto non modificati.
Scelte di Achille: voci **HeyGen come passante** (eleven_v4), video **solo AOUP**, account HeyGen di Achille
(aki.pagliaro@gmail.com) **via chiave API**, programmazione su **Robin dopo il suo OK**. Stessa pipeline di Jack e Fantasmi
(../pdro-halloween-jack/REGISTRO.md): strumenti in ../strumenti/halloween/.

## Voci (voci.py)
Luca Ward e4bd8d8a357f41a99502309874733c16 (scene 1-6 in una traccia), Achille nuovo 1 9b851842ce54449fb9ff501751ca0271 (S07),
tagli come in Jack (atempo 1,16 su Achille). 7 blocchi su 7 a parole uguali in tutti e due.
- Il Turno: request lPuXKgozY4g00irDp5tA (Ward, 69,9 s) e 40sXrGo9DiC8VZGtU9Re (Achille, 16,4 s).
  S01 11,1 · S02 10,6 · S03 10,7 · S04 10,6 · S05 10,3 · S06 12,6 · S07 14,2 s = 80,0 s.
- SindaMatch: request O3Gpaf8tth2DjZLvRIAZ (Ward, 84,9 s) e VRoHNK0qJVHVg5bNIxt7 (Achille, 17,4 s).
  S01 13,3 · S02 14,7 · S03 12,1 · S04 12,6 · S05 12,3 · S06 16,2 · S07 14,8 s = 96,0 s.

## Avatar (avatar.py)
«Aki with a lapel microphone» e6d73d660d354b94b0a50c9692b7c34e, webm con alfa, solo nella chiusura in basso a destra:
Il Turno 77434894adaaf2fd55d28a3be453ad32, SindaMatch 21b03317851ec410ba214bde8a0ecdb6. Labiale 0 ms su tutti e due.

## Clip (Higgsfield Kling 3.0 std, senza audio, 10 s)
Il Turno: S01 tr_corridoio c0440fa0-884f-4a51-8d27-6d80a02819fd (neon che sfarfallano, torcia, carrello in avanti) ·
S06 tr_sequel 264956d8-58d5-4711-b1c5-4d65d8677f97 (la squadra sorride e viene avanti). SindaMatch (il pacchetto non ne
chiedeva: le foto dei profili prendono vita dentro la card): S02 Jack 23cb0aca-… · S03 Fantasma che svanisce 11aa504c-… ·
S04 Conte Selfie d886f7d1-… · S05 Mummia che timbra e archivia 380adf34-… · S06 squadra CISL a225e804-… (id interi in
clip_higgsfield.txt). 87,5 crediti Higgsfield.

## Grafiche animate (serie.py, motore ../strumenti/chicedomani/)
- Il Turno: cartello «una produzione» e le due righe sul corridoio; i trenta campanelli che si accendono a cascata e
  suonano sullo squillo; il telefono che vibra, il messaggio e i puntini; la locandina con le recensioni che scorrono e il
  titolo che gocciola dall'alto; i quattro mostri riga per riga con gli occhi gialli che si aprono; PROSSIMAMENTE e IL
  TURNO 2 sul sequel; contatti nella chiusura.
- SindaMatch: il cuore-zucca che pulsa e il titolo; per ogni profilo la card sale, la foto è viva (clip nella «finestra»,
  nuova in ../strumenti/chicedomani/monta.py), sulla parola «sinistra» il timbro NOPE e il bottone ✕ che pulsa, poi la
  card vola via; il LIKE su «destra», poi «È UN MATCH!» con i coriandoli (seconda grafica) e il cuore; i contatti.
  Sotto i timbri la foto è rimessa pulita dal pacchetto (foto_card.py), senza l'ombra della diffusione.
- Contatti nelle due chiusure: Achille e Giovanna, Padova · Via del Carmine 3 (già solo AOUP nel pacchetto).

## Suoni (suoni.py, catalogo HeyGen)
Il Turno: battito, boati da trailer (il catalogo non ha un vero BRAAAM), campanelli, squillo, notifica, l'«urlo» è un colpo
di corno dissonante tagliato netto (nel catalogo non ci sono urla), ringhio basso, timbri sui mostri; musica: drone horror
3bebd359 fino alla S05, poi stacco netto sull'ukulele allegro d9757840 per il sequel e la chiusura.
SindaMatch: swipe, timbri, flash da selfie, squittio di pipistrelli, crepitio di polvere, applauso e pop sul match;
musica marimba e pizzicati 597cfa95. Uscite −16 LUFS, picco ≤ −0,4 dBFS.

## Uscite (1080x1920, 25 fps, integre; fuori da git; copie d'invio sotto i 30 MB mandate in chat)
| Video | Durata | Asset HeyGen |
|---|---|---|
| PDRO_Halloween_Il_Turno_trailer_9x16 | 1:20 | a22f9ed19c6f4c18b6ca36e14e26089a |
| PDRO_Halloween_SindaMatch_9x16 | 1:36 | 60148273f52f4c44a86cfb2348f9a3b6 |
(https://resource2.heygen.ai/video/<asset>/original.mp4). Portafoglio API: 15,60 → 8,05 $.

## Diverso dal pacchetto
- Montaggio locale (motore della serie PDRO), non create_video_from_studio.
- Voce di Achille via HeyGen passante eleven_v4 con atempo 1,16.
- SindaMatch con le foto dei profili animate (non richieste).

## Da fare
- OK di Achille → Robin sui 4 canali AOUP (pubblicazione entro il 31/10-1/11).
