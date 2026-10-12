"""Prepara le pagine da renderizzare: scena.html e gli SVG della lezione con i font locali.
uso: python3 pagine.py <cartella corso> <modulo, es. M00> <cartella build della lezione>"""
import sys, os, re, shutil
corso, mod, out = sys.argv[1:4]
P = os.path.join(out, "pagine"); os.makedirs(P, exist_ok=True)
for d in ("logo", "font"):
    shutil.copytree(os.path.join(corso, "kit", d), os.path.join(P, d), dirs_exist_ok=True)
h = open(os.path.join(corso, "kit", "scena.html")).read()
h = re.sub(r'<link rel="preconnect"[^>]*>\s*', "", h)
h = re.sub(r'<link href="https://fonts.googleapis.com[^>]*>', '<link rel="stylesheet" href="font/font.css">', h)
assert "googleapis" not in h
# contrasto: su fondo scuro i numeri delle griglie nel colore del livello (verde o blu) quasi spariscono
h = h.replace("</style>", "#palco.f-scuro .testo.griglia .cella b{color:#fff}\n</style>", 1)
# impaginazione centrata: il filo ha un'altezza fissa (720 px) e taglia il testo quando va su due righe;
# lo metto 40 px sotto l'ultimo elemento del blocco
h = h.replace("</script>", """document.fonts.ready.then(()=>{const f=P.querySelector('.testo.centrata .filo');if(!f)return;
 const y=[...P.querySelectorAll('.testo.centrata .blocco > *')].reduce((m,e)=>Math.max(m,e.offsetTop+e.offsetHeight),0);
 f.style.top=(y+40)+'px'});
</script>""", 1)
open(os.path.join(P, "scena.html"), "w").write(h)
# SVG: inline in una pagina con camera (#cam) e logo piccolo fuori dalla camera
for f in sorted(os.listdir(os.path.join(corso, mod, "svg"))):
    if not f.endswith(".svg"): continue
    s = open(os.path.join(corso, mod, "svg", f)).read()
    s = re.sub(r"@import url\([^)]*\);", "", s)
    m = re.search(r'<rect[^>]*width="(?:1920|100%)"[^>]*fill="(#[0-9A-Fa-f]{3,6})"', s)
    fondo = (m.group(1) if m else "#FAF8F4").upper()
    c = fondo.lstrip("#"); c = "".join(x*2 for x in c) if len(c) == 3 else c
    scuro = (0.299*int(c[0:2],16) + 0.587*int(c[2:4],16) + 0.114*int(c[4:6],16)) < 128
    logo = "logo/cisl-fp-padova-rovigo_" + ("fondo-scuro" if scuro else "colori") + ".svg"
    pagina = f"""<!DOCTYPE html><html><head><meta charset="utf-8"><link rel="stylesheet" href="font/font.css">
<style>*{{margin:0;padding:0}}html,body{{width:1920px;height:1080px;overflow:hidden;background:{fondo}}}
#cam{{position:absolute;left:0;top:0;width:1920px;height:1080px;transform-origin:0 0}}
#logo{{position:absolute;top:30px;left:44px;width:140px}}</style></head>
<body><div id="cam">{s}</div><img id="logo" src="{logo}" alt=""></body></html>"""
    open(os.path.join(P, f.replace(".svg", ".html")), "w").write(pagina)
    print(f, fondo, "scuro" if scuro else "chiaro")
