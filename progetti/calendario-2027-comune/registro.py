#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Il REGISTRO.md di un mese, dai file che la produzione lascia nella cartella.

  python3 registro.py <cartella del mese>

Legge pacchetto/timeline.json, mese.json, audio/voce-heygen.json,
audio/voce/voce.json, scene.json, protagonista/higgsfield.json e consegna.json
(il video HeyGen e la verifica del render, scritti a mano dopo il controllo).
"""
import json, sys
from pathlib import Path

D = Path(sys.argv[1]).resolve()
leggi = lambda p: json.loads((D/p).read_text(encoding="utf-8"))
tl, mese, sc, voce = leggi("pacchetto/timeline.json"), leggi("mese.json"), leggi("scene.json"), leggi("audio/voce/voce.json")
grezzo, hf, cons = leggi("audio/voce-heygen.json"), leggi("protagonista/higgsfield.json"), leggi("consegna.json")
nome, ruolo = [x.strip() for x in tl["protagonista"].split("—")]
episodio = tl["episodio"]
v = lambda x: f"{x:.2f}".replace(".", ",")
per = {s["id"]: s for s in sc}
tot = sum(s["durata"] for s in sc)
pause = [n.replace(".", ",").replace("->", "→") for r in voce if r["id"] == "S3" for n in r["note"]]
corr = [f"«{a}» → «{b}»" for lista in mese.get("correzioni", {}).values() for a, b in lista]
titoli = {s["id"]: s["titolo"] for s in tl["scene"]}

righe = "\n".join(f"{s['id']}  {titoli[s['id']].lower():<18} {v(s['durata']):>6} s" for s in sc)
md = f"""# REGISTRO — Calendario dei diritti 2027 · {episodio}

Video del mese per il calendario CISL FP Padova Rovigo. Protagonista {nome},
{ruolo.lower()[0] + ruolo[1:]}. 16:9, 1920×1080, 25 fps, senza avatar. Fatto
come febbraio, con gli script comuni di `../calendario-2027-comune/`: qui ci
sono solo i dati del mese.

## Che cosa si è fatto, rispetto al README del pacchetto

| README | qui |
|---|---|
| scene da S0 a S7, in ordine | ✓ le otto scene; **S0, S1, S5 rifatte** sulle clip di {nome} (vedi sotto), S3 **rimessa a tempo** sulla voce |
| voce «Luca Ward (V4)» | ✓ la voce clonata che si chiama così (non è la voce di Luca Ward, ma una simile), eleven_v4, italiano, **via HeyGen come passante** |
| la scena segue la durata della voce | ✓ voce + 0,5 s prima (0,6-0,7 su S0-S1) e 0,9 s dopo (2,5 s sulla firma finale) |
| sottotitoli | ✓ **impressi nel video** e anche in `sottotitoli.srt` |
| musica leggera | ✓ la stessa di gennaio e febbraio, sotto la voce |
| esporta 1080p | ✓ montato in HeyGen, 1080p |
| clip Higgsfield del protagonista | ✓ **fatte**: tre, per S0, S1 e S5 |
| QR del link nel calendario | **da fare**: serve il link pubblico |

## La voce — HeyGen come passante

Scelta di Achille per i dieci mesi da marzo a dicembre, chiesta prima di
cominciare come vuole `CLAUDE.md`. Una traccia sola (`voce-testo.txt`,
{len((D/'voce-testo.txt').read_text(encoding='utf-8'))} caratteri), {v(grezzo['duration'])} s di grezzo, con i tempi di ogni
parola: nessuna trascrizione.

- **S3**: {'; '.join(pause)} (la regia chiede mezzo secondo dopo ogni «Falso»).
- **S7**: firma rallentata a 0,94×.
""" + (f"- **Testo corretto** rispetto al pacchetto, per la voce e per i sottotitoli: {', '.join(corr)}.\n" if corr else "") + f"""
## Le clip di {nome} — Higgsfield

Tre fotogrammi `gpt_image_2_5` 16:9 (il primo fa da riferimento per il volto
degli altri due) e tre clip Kling 3.0 Pro da 8 s, senza audio, dal fotogramma.
Costo del mese: **36,75 crediti Higgsfield** (3 × 0,25 + 3 × 12).

| | lavoro Higgsfield |
|---|---|
""" + "\n".join(f"| {k} | `{j}` |" for k, j in hf.items()) + f"""

Le clip e le immagini non sono nel repo (le clip pesano): restano nello storico
di Higgsfield e nella cartella locale `protagonista/`.

**I testi di S0, S1, S5 sono rifatti sopra le clip** con i caratteri del
pacchetto (Playfair Display, Montserrat), a sinistra, dove non coprono il volto:

- **S0**: «{tl['episodio'].split('·')[0].split()[0].upper()} · {tl['episodio'].split('·')[1].strip().upper()}»; il titolo compare parola per parola sulla voce, «{mese['evidenza']}» in menta con la sottolineatura rossa;
- **S1**: «LA STORIA», la didascalia {nome.upper()} · {ruolo} e la nuvoletta {mese['battuta']};
- **S5**: «COM'È ANDATA», «{nome.upper()}», «{mese['titolo_s5']}».

## S3 rimessa a tempo

Gli istanti dell'animazione (i due timbri «FALSO» e il cambio di affermazione)
si misurano sul video del pacchetto; la scena si rimonta a pezzi perché ogni
timbro cada sul «Falso» detto. Pezzi del sorgente, in secondi:
{per['S3']['nota'].replace('rimessa a tempo: ', '')}.

## Musica, mix, sottotitoli

Come febbraio: «Astral Generated Music 271354a0» (libreria HeyGen), 10 dB
sotto la voce con sidechain, la chiusura del brano sull'ultimo fotogramma; mix
a −16 LUFS con un guadagno solo. Sottotitoli col testo del copione e i tempi
della voce, una riga, Inter SemiBold su fascia verde; niente sottotitoli su S0
e sulle frasi della firma già scritte a schermo ({'; '.join('«' + f + '»' for f in mese['firma_a_schermo'])}).

## La durata

```
{righe}
                       -------
                       {v(tot)} s   (il pacchetto stima {tl['durata_stimata_s']} s)
```

## Il montato

| | |
|---|---|
| montato di prova | `montato-locale.mp4` — {v(tot)} s |
| montato HeyGen | `{cons['video_id']}` — **{cons['durata_heygen']}** |
| link | {cons['link']} |

{cons['verifica']}

## I costi

| | |
|---|---|
| voce, HeyGen come passante | {cons['crediti_voce']} |
| immagini e clip, Higgsfield | 36,75 crediti Higgsfield |
| render HeyGen | {cons['crediti_render']} |

## Gli strumenti

```
python3 ../calendario-2027-comune/testo_voce.py .   voce-testo.txt (poi create_speech)
python3 ../calendario-2027-comune/voce.py .         la voce tagliata scena per scena
python3 ../calendario-2027-comune/monta.py .        scene, mix, sottotitoli, montato-locale.mp4
python3 ../calendario-2027-comune/heygen.py . prepara | invia | scene
python3 ../calendario-2027-comune/registro.py .     questo registro
```

## Da verificare — quello che non ho potuto giudicare io

- **I contenuti vanno fatti verificare all'ufficio vertenze**, come dice il
  pacchetto: numeri, norme e date dipendono dal CCNL e dalle leggi in vigore.
- **Le clip di {nome} vanno guardate**: il volto è coerente fra le tre, ma è
  generato, e va giudicato da un occhio umano prima di pubblicare.
- **La musica va ascoltata**: è dosata a misura, non a orecchio.
- **Il QR del video** per il calendario: serve il link dove il video sarà
  pubblicato (Facebook, YouTube).
"""
(D/"REGISTRO.md").write_text(md, encoding="utf-8")
print(D.name, "REGISTRO.md")
