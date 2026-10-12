"""Impagina la DISPENSA.md di una lezione in HTML A4 (palette e logo del corso); poi pdf.js la stampa in PDF.
uso: python3 dispensa.py <cartella corso> <lezione>  -> build/<lez>/pagine/dispensa.html"""
import re, sys, os, html
corso, lez = sys.argv[1:3]; mod = "M" + lez.split("_M")[1][:2]
md = open(os.path.join(corso, mod, f"{lez}_DISPENSA.md")).read()
def inline(s):
    s = html.escape(s, quote=False)
    s = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", s)
    return s
out = []; righe = md.split("\n"); i = 0
while i < len(righe):
    l = righe[i]
    if l.startswith("|"):
        tab = []
        while i < len(righe) and righe[i].startswith("|"):
            celle = [c.strip() for c in righe[i].strip().strip("|").split("|")]
            if not all(re.fullmatch(r":?-{3,}:?", c) for c in celle): tab.append(celle)
            i += 1
        h = "".join(f"<th>{inline(c)}</th>" for c in tab[0])
        b = "".join("<tr>" + "".join(f"<td>{inline(c)}</td>" for c in r) + "</tr>" for r in tab[1:])
        vuota = " class='compila'" if all(not c for r in tab[1:] for c in r[1:]) else ""
        out.append(f"<table{vuota}><thead><tr>{h}</tr></thead><tbody>{b}</tbody></table>"); continue
    m = re.match(r"(#{1,3}) (.*)", l)
    if m: out.append(f"<h{len(m.group(1))}>{inline(m.group(2))}</h{len(m.group(1))}>")
    elif re.match(r"- ", l):
        items = []
        while i < len(righe) and righe[i].startswith("- "): items.append(f"<li>{inline(righe[i][2:])}</li>"); i += 1
        out.append("<ul>" + "".join(items) + "</ul>"); continue
    elif re.match(r"\d+\. ", l):
        items = []
        while i < len(righe) and re.match(r"\d+\. ", righe[i]):
            voce = re.sub(r"^\d+\. ", "", righe[i]); items.append(f"<li>{inline(voce)}</li>"); i += 1
        out.append("<ol>" + "".join(items) + "</ol>"); continue
    elif l.strip(): out.append(f"<p>{inline(l)}</p>")
    i += 1
corpo = "\n".join(out)
pagina = f"""<!DOCTYPE html><html lang="it"><head><meta charset="utf-8"><link rel="stylesheet" href="font/font.css">
<style>
@page {{ size: A4; margin: 18mm 18mm 20mm 18mm; }}
body {{ font-family: Inter, sans-serif; font-size: 10pt; line-height: 1.45; color: #2B2F2E; margin: 0; }}
header {{ display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid #00623A; padding-bottom: 5mm; margin-bottom: 5mm; }}
header img {{ height: 17mm; }}
h1 {{ font-family: Montserrat, sans-serif; font-weight: 800; font-size: 13pt; color: #00623A; margin: 0; text-align: right; }}
h2 {{ font-family: Montserrat, sans-serif; font-weight: 800; font-size: 19pt; line-height: 1.15; margin: 0 0 4mm; }}
h3 {{ font-family: Montserrat, sans-serif; font-weight: 800; font-size: 12.5pt; color: #00623A; margin: 5mm 0 1.5mm; break-after: avoid; }}
strong {{ font-weight: 600; }}
table {{ width: 100%; border-collapse: collapse; margin: 2mm 0 3mm; font-size: 9.5pt; break-inside: avoid; }}
th {{ font-family: Montserrat, sans-serif; font-weight: 600; text-align: left; color: #00623A; border-bottom: 2px solid #00623A; padding: 2mm; }}
td {{ border-bottom: 1px solid #d5dcd8; padding: 1.5mm 2mm; vertical-align: top; }}
tbody tr:nth-child(odd) td {{ background: #E6F2EC; }}
table.compila td {{ height: 9mm; background: #FAF8F4 !important; }}
ol li::marker {{ font-family: 'Barlow Condensed', sans-serif; font-weight: 700; color: #00623A; }}
ul, ol {{ padding-left: 6mm; }}
p:last-child {{ background: #0B3D2A; color: #fff; padding: 4mm 5mm; border-radius: 2mm; }}
</style></head><body>
<header><img src="logo/cisl-fp-padova-rovigo_colori.svg" alt="CISL FP Padova Rovigo"><div></div></header>
{corpo}
</body></html>"""
# il primo h1 (titolo del corso) va nell'intestazione, a destra del logo
pagina = re.sub(r"<header>(.*?)<div></div></header>\n<h1>(.*?)</h1>", r"<header>\1<h1>\2</h1></header>", pagina, flags=re.S)
dest = os.path.join(corso, "build", lez, "pagine", "dispensa.html"); open(dest, "w").write(pagina); print(dest)
