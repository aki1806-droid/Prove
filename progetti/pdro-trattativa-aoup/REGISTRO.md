# REGISTRO — PDRO Trattativa AOUP – Il punto (Reel 9:16)

Data: 13 ottobre 2026 · sessione Claude Code (repo Prove)
Account HeyGen: quello del connettore (come per gli altri PDRO, scelto da Achille)
Metodo: come PDRO Oncoematologia e 150 ore (avatar webm trasparente + montaggio locale), perché
create_video_from_studio non sa mettere l'avatar in basso a destra né cambiare grafica a metà scena.

## Voce
Achille nuovo 1 — KerPEYZvLEWNATg4AARX, eleven_v4 (il pacchetto indicava eleven_multilingual_v2),
1 generazione per blocco, testi di voce_testi/ invariati. Flusso ElevenLabs: pTOgVTi6pyWDsFhTbgE9
Generazioni: S01 X1vck3BkQZyc39zUlXnP · S02 KckFLj5VxF1hokhXqdHS · S03 OJSGAzKlpsKGqHkmJtCY ·
S04 KiKn0gLsoBWMLRzfPdsK · S05 2P2G0ObaefxvktMyCmRB · S06 24PIpgimaV5zKtKQgkxT ·
S07 XNK6e0jt6urHC7dTtAEv · S08 72lTRvJ7RG23KIXkEQcH · S09 mdErGbYYCiNUBhiI8D7o
Post (prepara_voce.py): silenceremove → atempo=1.12 → 0,3 s di coda. Totale 191,6 s (3'12").

## Grafiche A/B
cambi.py → audio/cambi-B.json: la grafica B entra sulla frase indicata in blocchi.json, agganciata
all'inizio del parlato dopo la pausa (S01 4,50 · S02 12,34 · S03 9,91 · S04 4,85 · S05 13,40 ·
S06 16,14 · S07 12,29 · S08 17,67 · S09 6,24 s dall'inizio scena). Passaggio in dissolvenza di 0,35 s.
Le animazioni della colonna Regia (timbri che cadono, card in sequenza, ecc.) NON sono fatte:
le grafiche arrivano come PNG già composti, senza livelli separati. Si fa solo il cambio A→B
e la lenta spinta in avanti sulle slide.

## Clip (scene 2, 4, 6, 8)
Seedance 2.0 Mini 720p 9:16, 15 s, senza audio, 13.744 crediti l'una:
S02 dSi3MJB2AlCSV9d0HwTB (planimetrie) · S04 eFSg2XElu7izx5fWe7Jj (sala dialisi vuota) ·
S06 AQrQaP7f9xG5XiuOMhv8 (personale di spalle all'ingresso) · S08 YWYoMbY4IcoX9TWtTnjW (corridoio vuoto).
Controllate: nessun paziente, bambino o volto riconoscibile, nessun logo.

## Avatar
Look «Aki with a lapel microphone» e6d73d660d354b94b0a50c9692b7c34e. Asset voce 59c38d0b6e494dd4968433246338f12f,
video webm 0249a7429b06dcd56320d3146143776b (191,65 s). controlla-avatar.py: 0 pixel coperti su
sottotitoli e bande; sulle slide crema il controllo segnala un falso positivo (lo sfondo chiaro
passa per «contenuto»): verificato a vista sui fotogrammi, nessuna scritta coperta.

## Sottotitoli
sottotitoli.py → sottotitoli.srt (70 blocchi), cifre a schermo: 2024, 50, 6 questioni, 2 OSS, 2 infermieri, 3° piano.

## Montato
PDRO_Trattativa_AOUP_9x16.mp4: 1080x1920, 25 fps, 191,6 s, 141 MB (fuori da git). Copia d'invio _invio.mp4.
Controllo: un fotogramma per ogni grafica A e B (18).

## Da verificare (Achille)
- Dialisi: la voce dice «Sono arrivati due OSS», la grafica S04B dice «9 OSS in dotazione» e il post
  «9 OSS». Possono essere entrambi veri (9 in organico, 2 nuovi), ma il post così si legge come 9 arrivati.
- S05B: «Riprendere il percorso già avviato» compare solo a schermo, non nella voce (va bene se voluto).

## Versione 2 — richiesta di Achille dopo l'ascolto
- Nella voce «OSS» diventa «operatore/i socio sanitario/i»: S01 «operatori socio sanitari di notte»,
  S04 «Sono arrivati due operatori socio sanitari», S05 «Operatori socio sanitari nei turni di notte» e
  «dati sugli operatori socio sanitari assunti». Testi aggiornati in voce_testi/, blocchi.json, SCRIPT.md.
- Nuove generazioni: S01 6ObITbhcQQZCAE5GNBjN · S04 NfmIkmdqNz9fW1fOq5dJ · S05 kda6dNhgk7EzvjbRz93A
  (le v1 in audio/v1/). Voce completa 194,7 s (3'15").
- Avatar rifatto per intero: asset abe854dfdb2a4324a71d27bb0325b2b4, video c386dc122568c54dc95e9aadc47e36d7.
- Grafiche del pacchetto lasciate come sono: a schermo «OSS» resta in S01B, S04B, S05A e S05B.
- Copia d'invio _v2_invio.mp4 (28,6 MB). Sottotitoli rifatti (73 blocchi).

## Originale su HeyGen
Caricato il 15/10/2026 come asset 940889441c9e4e7e9f67d14a750027bd (versione 2): https://resource2.heygen.ai/video/940889441c9e4e7e9f67d14a750027bd/original.mp4
