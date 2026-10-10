#!/usr/bin/env python3
"""Renderizza le slide 1920x1080 del video dal file scene.json.
Uso:  python3 render_slides.py            -> assets/slide_cisl/*.png
Se esiste assets/logo/logo_cisl_fp.png viene inserito automaticamente.
Requisiti: Pillow (pip install pillow --break-system-packages)
"""
import json, os
from PIL import Image, ImageDraw, ImageFont, ImageOps

BASE = os.path.dirname(os.path.abspath(__file__))
W, H = 1920, 1080
D = json.load(open(os.path.join(BASE, "scene.json"), encoding="utf-8"))
C = D["palette"]
OUT = os.path.join(BASE, "assets", "slide_cisl")
LOGO = os.path.join(BASE, "assets", "logo", "logo_cisl_fp.png")
os.makedirs(OUT, exist_ok=True)

def F(w, s):
    return ImageFont.truetype(os.path.join(BASE, "fonts", f"Poppins-{w}.ttf"), s)

def hexrgb(h):
    h = h.lstrip("#"); return tuple(int(h[i:i+2], 16) for i in (0, 2, 4))

def tw(d, t, f):
    b = d.textbbox((0, 0), t, font=f); return b[2] - b[0]

def fit(d, t, w, maxw, start):
    s = start
    while s > 24 and tw(d, t, F(w, s)) > maxw:
        s -= 2
    return F(w, s)

def logo(img, x, y, maxw, maxh, pastiglia):
    """Incolla il logo dentro maxw x maxh (anche ingrandendolo). Sui fondi
    verdi o rossi il logo, che ha gli stessi colori, sparirebbe: lo si mette
    su una pastiglia bianca. Restituisce la larghezza occupata."""
    lg = Image.open(LOGO).convert("RGBA")
    k = min(maxw / lg.width, maxh / lg.height)
    lg = lg.resize((round(lg.width * k), round(lg.height * k)), Image.LANCZOS)
    if pastiglia:
        m = round(lg.height * 0.16)
        ImageDraw.Draw(img).rounded_rectangle([x - m, y - m, x + lg.width + m, y + lg.height + m],
                                              radius=m * 2, fill=(255, 255, 255))
    img.paste(lg, (x, y), lg)
    return lg.width

def brand(d, img, dark=False):
    """Marchio in alto a sinistra: logo se presente, altrimenti scritta."""
    if os.path.exists(LOGO):
        logo(img, 70, 50, 260, 90, dark)
    else:
        col = C["bianco"] if dark else C["verde"]
        d.text((70, 52), "CISL FP", font=F("Bold", 34), fill=col)
        d.text((70, 92), "PADOVA ROVIGO", font=F("Medium", 20), fill=col)
    # filetto rosso
    d.rectangle([0, H - 14, W, H], fill=C["rosso"])

def base(bg):
    img = Image.new("RGB", (W, H), hexrgb(bg))
    return img, ImageDraw.Draw(img)

def title(d, t, y=170, col=None, size=78):
    f = fit(d, t, "Bold", W - 220, size)
    d.text((110, y), t, font=f, fill=col or C["verde"])
    d.rectangle([110, y + f.size + 38, 250, y + f.size + 46], fill=C["rosso"])
    return y + f.size + 90

# ---------- layout ----------
def copertina(s):
    t = s["testo_schermo"]; img, d = base(C["verde"])
    d.rectangle([0, 0, 26, H], fill=C["rosso"])
    d.text((140, 330), t["sopra"], font=F("Medium", 40), fill=C["verde_chiaro"])
    d.text((130, 400), t["titolo"], font=fit(d, t["titolo"], "Bold", W - 260, 140), fill=C["bianco"])
    d.rectangle([140, 620, 300, 630], fill=C["rosso"])
    d.text((140, 670), t["sotto"], font=F("Regular", 52), fill=C["bianco"])
    brand(d, img, dark=True); return img

def foto_didascalia(s):
    t = s["testo_schermo"]; img, d = base(C["carta"])
    ph = Image.open(os.path.join(BASE, s["foto"])).convert("RGB")
    box = (1180, 860)
    ph = ImageOps.contain(ph, box, Image.LANCZOS)
    x, y = 90, (H - ph.height) // 2
    d.rectangle([x - 8, y - 8, x + ph.width + 8, y + ph.height + 8], fill=C["bianco"])
    img.paste(ph, (x, y))
    tx = x + ph.width + 80; maxw = W - tx - 70
    d.rectangle([tx, 300, tx + 120, 308], fill=C["rosso"])
    ft = fit(d, t["titolo"], "Bold", maxw, 70)
    d.text((tx, 330), t["titolo"], font=ft, fill=C["verde"])
    yy = 330 + ft.size + 50
    size = min(fit(d, r, "Medium", maxw, 40).size for r in t["righe"])
    fr = F("Medium", size)
    for r in t["righe"]:
        d.text((tx, yy), r, font=fr, fill=C["inchiostro"]); yy += fr.size + 30
    brand(d, img); return img

def turni(s):
    t = s["testo_schermo"]; img, d = base(C["carta"])
    title(d, t["titolo"], y=160)
    cw, gap = 500, 70; x0 = (W - (3 * cw + 2 * gap)) // 2
    for i, (n, ora, lett) in enumerate(t["turni"]):
        x = x0 + i * (cw + gap)
        d.rounded_rectangle([x, 430, x + cw, 900], 28, fill=C["bianco"], outline=hexrgb(C["verde"]), width=4)
        d.rounded_rectangle([x, 430, x + cw, 540], 28, fill=C["verde"])
        d.rectangle([x, 500, x + cw, 540], fill=C["verde"])
        d.text((x + cw / 2, 485), n, font=F("Bold", 44), fill=C["bianco"], anchor="mm")
        d.text((x + cw / 2, 625), ora, font=F("Bold", 64), fill=C["rosso"], anchor="mm")
        d.text((x + cw / 2, 770), lett, font=F("Bold", 96), fill=C["inchiostro"], anchor="mm")
    d.text((W / 2, 965), "27 ottobre 2026 · iniziale del cognome", font=F("Regular", 34), fill=C["inchiostro"], anchor="mm")
    brand(d, img); return img

def allarme(s):
    t = s["testo_schermo"]; img, d = base(C["rosso"])
    d.text((W / 2, 470), t["titolo"], font=fit(d, t["titolo"], "Bold", W - 200, 104), fill=C["bianco"], anchor="mm")
    d.rectangle([W / 2 - 90, 580, W / 2 + 90, 588], fill=C["bianco"])
    for i, r in enumerate(t["righe"]):
        d.text((W / 2, 680 + i * 70), r, font=fit(d, r, "Medium", W - 240, 46), fill=C["bianco"], anchor="mm")
    brand(d, img, dark=True)
    d.rectangle([0, H - 14, W, H], fill=C["verde"]); return img

def elenco(s, check=False):
    t = s["testo_schermo"]; img, d = base(C["carta"])
    y = title(d, t["titolo"])
    n = len(t["righe"]); step = min(118, int((H - 120 - y) / max(n, 1)))
    for r in t["righe"]:
        if check:
            d.rounded_rectangle([110, y + 6, 160, y + 56], 10, outline=hexrgb(C["verde"]), width=5)
            d.line([(122, y + 32), (134, y + 46), (152, y + 16)], fill=C["rosso"], width=7)
        else:
            d.ellipse([118, y + 20, 146, y + 48], fill=C["rosso"])
        mail = "@" in r
        d.text((195, y), r, font=fit(d, r, "Bold" if mail else "Medium", W - 330, 54), fill=C["verde"] if mail else C["inchiostro"])
        y += step
    brand(d, img); return img

def due_colonne(s):
    t = s["testo_schermo"]; img, d = base(C["carta"])
    title(d, t["titolo"], y=160)
    cw = 780; x0 = (W - 2 * cw - 80) // 2
    for i, col in enumerate(t["colonne"]):
        x = x0 + i * (cw + 80); acc = C["verde"] if i == 0 else C["rosso"]
        d.rounded_rectangle([x, 430, x + cw, 880], 28, fill=C["bianco"], outline=hexrgb(acc), width=5)
        d.text((x + cw / 2, 520), col[0], font=F("Bold", 50), fill=acc, anchor="mm")
        d.line([(x + 120, 585), (x + cw - 120, 585)], fill=acc, width=3)
        d.text((x + cw / 2, 680), col[1], font=F("Bold", 54), fill=C["inchiostro"], anchor="mm")
        d.text((x + cw / 2, 775), col[2], font=F("Regular", 42), fill=C["inchiostro"], anchor="mm")
    brand(d, img); return img

def chiusura(s):
    t = s["testo_schermo"]; img, d = base(C["verde"])
    d.rectangle([0, 0, 26, H], fill=C["rosso"])
    if os.path.exists(LOGO):
        k = min(420 / 225, 200 / 109)   # dimensioni del logo_cisl_fp.png attuale
        logo(img, (W - round(225 * k)) // 2, 130, 420, 200, True)
    else:
        d.text((W / 2, 230), "CISL FP PADOVA ROVIGO", font=F("Bold", 64), fill=C["bianco"], anchor="mm")
    d.text((W / 2, 480), t["titolo"], font=F("Bold", 110), fill=C["bianco"], anchor="mm")
    d.rectangle([W / 2 - 90, 575, W / 2 + 90, 585], fill=C["rosso"])
    for i, r in enumerate(t["righe"]):
        d.text((W / 2, 680 + i * 85), r, font=fit(d, r, "Bold" if i == 0 else "Regular", W - 300, 50), fill=C["bianco"], anchor="mm")
    return img

L = {"copertina": copertina, "foto_didascalia": foto_didascalia, "turni": turni, "allarme": allarme,
     "elenco": elenco, "checklist": lambda s: elenco(s, True), "due_colonne": due_colonne, "chiusura": chiusura}

if __name__ == "__main__":
    for s in D["scene"]:
        if s["tipo"] in ("slide", "immagine"):
            L[s["layout"]](s).save(os.path.join(OUT, s["nome_file"]))
            print("ok", s["nome_file"])
