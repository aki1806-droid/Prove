#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Spezza il montato in pezzi che stanno sotto il tetto di un canale d'invio.

Perche' serve. Il montato e' 108,5 MiB e il canale di consegna ne accetta 30.
Ricomprimere non e' la strada: l'immagine gia' viaggia a 87 kb/s, perche' sono
diapositive ferme, e il grosso del file e' la voce a 158 kb/s. Per stare sotto
i 30 MiB in un pezzo solo servirebbero 66 kb/s in tutto per un'ora — cioe'
rovinare l'unica cosa che conta. Si taglia, e non si tocca un bit.

Dove si taglia. Sugli inizi di capitolo, che in questo video sono anche inizi
di scena e quindi fotogrammi chiave: il flusso si copia, non si ricodifica. Un
taglio a meta' scena costringerebbe a ricodificare o a far partire il pezzo da
un fermo immagine.

I punti NON sono scritti qui dentro. Vengono da indice-capitoli.txt, cioe'
dalle durate misurate, e la scelta di quali usare la fa il programma: prende il
minor numero di pezzi che sta sotto il tetto, e fra le divisioni possibili
quella con i pezzi piu' pari. Cambiando il copione l'indice cambia e i tagli
si rifanno da soli.
"""
import re, subprocess, sys
from pathlib import Path
from itertools import combinations
import imageio_ffmpeg

QUI  = Path(__file__).resolve().parent
FF   = imageio_ffmpeg.get_ffmpeg_exe()
MP4  = QUI/"montato-busta-paga-60min.mp4"
SRT  = MP4.with_suffix(".srt")
IDX  = QUI/"indice-capitoli.txt"
TETTO = 30*1024*1024        # il limite del canale di consegna, in byte
MARGINE = 0.93              # non si consegna sul filo: 7% di aria

def durata(f):
    """La Duration dell'intestazione, come in monta-locale.py e per lo stesso
    motivo: e' quella che conta per il contenitore, e non decodifica niente."""
    e = subprocess.run([FF, "-i", str(f)], capture_output=True, text=True).stderr
    m = re.search(r"Duration: (\d+):(\d+):([\d.]+)", e)
    if not m: raise SystemExit(f"nessuna Duration in {f}")
    return int(m[1])*3600 + int(m[2])*60 + float(m[3])

def hms(t, virgola=False):
    h, r = divmod(t, 3600); m, s = divmod(r, 60)
    t = "%02d:%02d:%06.3f" % (h, m, s)
    return t.replace(".", ",") if virgola else t

def ms(t):
    """mm:ss per un video che passa l'ora. Tagliare le prime tre lettere di
    hms() faceva leggere 1:00:09 come 00:09: i minuti vanno sommati, non
    scartati insieme all'ora."""
    m, s = divmod(t, 60)
    return "%d:%04.1f" % (m, s)

def indice():
    """(secondi, titolo) per ogni capitolo, dall'indice misurato."""
    out = []
    for r in IDX.read_text(encoding="utf-8").splitlines():
        m = re.match(r"(\d+):(\d\d)\s+(.*)", r.strip())
        if m: out.append((int(m[1])*60 + int(m[2]), m[3]))
    if not out: raise SystemExit(f"{IDX.name} non ha righe leggibili")
    return out

def blocchi_srt():
    def sec(x):
        h, m, s = x.replace(",", ".").split(":")
        return int(h)*3600 + int(m)*60 + float(s)
    out = []
    for b in re.split(r"\n\s*\n", SRT.read_text(encoding="utf-8").strip()):
        r = b.strip().split("\n")
        if len(r) < 3: continue
        m = re.match(r"([\d:,]+) --> ([\d:,]+)", r[1])
        out.append((sec(m[1]), sec(m[2]), "\n".join(r[2:])))
    return out

def tagli(cap, fine, max_s):
    """Il minor numero di pezzi sotto max_s, e fra quelli il piu' pari.

    Si prova con 1 taglio, poi 2, poi 3: appena una combinazione entra nel
    tetto ci si ferma, perche' meno pezzi sono meglio per chi guarda. A parita'
    di numero vince quella con lo scarto minore fra il pezzo piu' lungo e il
    piu' corto: pezzi pari si scaricano e si guardano meglio."""
    punti = [t for t, _ in cap if 0 < t < fine]
    for n in range(0, len(punti)+1):
        buone = []
        for scelta in combinations(punti, n):
            b = [0.0, *scelta, fine]
            lun = [b[i+1]-b[i] for i in range(len(b)-1)]
            if max(lun) <= max_s: buone.append((max(lun)-min(lun), b))
        if buone: return min(buone)[1]
    raise SystemExit("nessuna divisione ai capitoli sta sotto il tetto: "
                     "i capitoli sono troppo lunghi, serve tagliare per scena")

def main(fuori):
    fuori = Path(fuori); fuori.mkdir(parents=True, exist_ok=True)
    fine  = durata(MP4)
    byte_s = MP4.stat().st_size/fine
    max_s  = TETTO*MARGINE/byte_s
    cap    = indice()
    bordi  = tagli(cap, fine, max_s)
    blocchi = blocchi_srt()
    titolo = dict(cap)
    print(f"montato {hms(fine)}  {MP4.stat().st_size/1048576:.1f} MiB  "
          f"{byte_s/1024:.1f} KiB/s  ->  pezzo massimo {max_s:.0f} s\n")
    guai = 0
    for k in range(len(bordi)-1):
        a, z = bordi[k], bordi[k+1]
        # il nome porta i capitoli che il pezzo contiene, non un numero d'ordine
        dentro = [t for t, _ in cap if a <= t < z]
        n = [re.match(r"(\d+)\.", titolo[t]) for t in dentro]
        n = [x[1] for x in n if x]
        eti = f"capitoli-{n[0]}-{n[-1]}" if len(n) > 1 else (
              f"capitolo-{n[0]}" if n else "apertura")
        nome = f"busta-paga-{k+1}-{eti}"
        fv = fuori/f"{nome}.mp4"
        subprocess.run([FF, "-y", "-v", "error", "-ss", hms(a), "-to", hms(z),
                        "-i", str(MP4), "-c", "copy", "-movflags", "+faststart",
                        str(fv)], check=True)
        sub = [(i-a, f-a, t) for i, f, t in blocchi if i < z and f > a]
        (fuori/f"{nome}.srt").write_text("\n".join(
            f"{j}\n{hms(max(0,i),1)} --> {hms(min(z-a,f),1)}\n{t}\n"
            for j, (i, f, t) in enumerate(sub, 1)), encoding="utf-8")
        mib = fv.stat().st_size/1048576
        ok = fv.stat().st_size <= TETTO
        guai += not ok
        print(f"{fv.name:44s} {ms(a):>7s}–{ms(z):<7s} {mib:5.1f} MiB  "
              f"{len(sub):3d} sottotitoli  {'ok' if ok else 'SOPRA IL TETTO'}")
    somma = sum(durata(f) for f in sorted(fuori.glob("busta-paga-*.mp4")))
    # i pezzi sommano piu' dell'intero: ogni taglio riparte dal fotogramma
    # chiave precedente, e qualche fotogramma si ripete a cavallo della giunta.
    # Ripetuto va bene, perso no: se la somma fosse MINORE, manca qualcosa.
    print(f"\nsomma dei pezzi {somma:.2f} s contro {fine:.2f} s dell'intero "
          f"({somma-fine:+.2f} s di fotogrammi ripetuti alle giunte)")
    if somma < fine - 0.01:
        print("ATTENZIONE: i pezzi durano MENO dell'intero — manca del video"); guai += 1
    return 1 if guai else 0

if __name__ == "__main__":
    sys.exit(main(sys.argv[1] if len(sys.argv) > 1 else QUI/"parti"))
