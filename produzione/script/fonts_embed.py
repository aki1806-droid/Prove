"""Scarica i caratteri da Google Fonts e li incorpora in un CSS autonomo.

Playwright qui non raggiunge fonts.googleapis.com (Chromium non usa il proxy
della sessione), e non lo segnala: le slide uscivano con i caratteri di sistema
senza che il render desse errore. curl invece passa, quindi preleviamo i woff2
latini una volta sola e li scriviamo come data URI.

    python3 fonts_embed.py            # rigenera entrambi i CSS

I file prodotti non sono versionati: si rifanno con questo script.
"""
import base64, re, subprocess, sys

UA = ("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/120 Safari/537.36")

SETS = {
    # corso "Dire, ascoltare, convincere"
    "fonts_corso.css":
        "family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Jost:wght@300;400;600",
    # video del canale
    "fonts_canale.css":
        "family=Playfair+Display:wght@600;700&family=Inter:wght@400;600",
}

def get(url, binary=False):
    r = subprocess.run(["curl", "-sS", "-A", UA, url], capture_output=True, check=True)
    return r.stdout if binary else r.stdout.decode()

for out_name, families in SETS.items():
    css = get(f"https://fonts.googleapis.com/css2?{families}&display=swap")
    blocks = re.findall(r"/\*\s*([\w-]+)\s*\*/\s*(@font-face\s*\{.*?\})", css, re.S)
    keep = [b for subset, b in blocks if subset in ("latin", "latin-ext")]
    out = []
    for block in keep:
        url = re.search(r"url\((https://fonts\.gstatic\.com[^)]+)\)", block).group(1)
        data = base64.b64encode(get(url, binary=True)).decode()
        out.append(re.sub(r"url\(https://[^)]+\)", f"url(data:font/woff2;base64,{data})", block))
    open(out_name, "w").write("\n".join(out))
    print(f"{out_name}: {len(keep)} facce su {len(blocks)} (latin e latin-ext)", file=sys.stderr)
