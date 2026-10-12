"""Scrive build/<lez>/registro.json con voce, durate, inquadrature, prompt, segnaposto e problemi.
uso: python3 registro.py <cartella corso> <lezione> <note.json>
note.json: campi aggiuntivi decisi in lavorazione (voce, costi, problemi, segnaposto...), uniti al registro."""
import json, os, sys, wave, glob, re, subprocess, datetime
corso, lez, note = sys.argv[1:4]
mod = "M" + lez.split("_M")[1][:2]
M = os.path.join(corso, mod); B = os.path.join(corso, "build", lez)
FF = os.environ.get("FFMPEG", "ffmpeg")
P = json.load(open(os.path.join(B, "piano.json")))
N = json.load(open(note))
def dur(f): w = wave.open(f); return round(w.getnframes() / w.getframerate(), 3)
def durata_video(f):
    r = subprocess.run([FF, "-i", f], capture_output=True, text=True).stderr
    h, m, s = re.search(r"Duration: (\d+):(\d+):([\d.]+)", r).groups(); return round(int(h) * 3600 + int(m) * 60 + float(s), 2)
gen_voce = json.load(open(os.path.join(B, "audio", "grezzo", "generazioni.json")))
gen_media = json.load(open(os.path.join(B, "media", "generazioni.json")))
G = json.load(open(os.path.join(M, f"{lez}_GENERAZIONI.json")))
blocchi = {}
for b, t in P["inizio"].items():
    blocchi[b] = dict(generazione=gen_voce.get(b), grezzo_s=None,
                      lavorato_s=dur(os.path.join(B, "audio", "lavorato", f"{b}.wav")), inizio_s=t)
for b in blocchi:
    f = os.path.join(B, "audio", "grezzo", f"{b}.mp3")
    r = subprocess.run([FF, "-i", f], capture_output=True, text=True).stderr
    h, m, s = re.search(r"Duration: (\d+):(\d+):([\d.]+)", r).groups(); blocchi[b]["grezzo_s"] = round(int(m) * 60 + float(s), 2)
inq = []
for p in P["pezzi"]:
    sorgente = p.get("file") or p.get("pagina") or ("kit/scena.html#" + json.dumps(p.get("scena"), ensure_ascii=False) if p.get("scena") else None)
    asset = os.path.splitext(p["file"])[0] if p.get("file") else None
    voce = dict(n=p["n"], scaletta=p["sid"], blocco=p["blocco"], tipo=p.get("tipo_render", p["tipo"]), da_s=round(p["da"] / P["fps"], 3),
                durata_s=round((p["a"] - p["da"]) / P["fps"], 3), fondo=p["fondo"], ingresso=p["ingresso"], sorgente=sorgente)
    for k in ("inquadratura", "direzione", "velocita", "ritaglio", "camera"):
        if p.get(k) not in (None, 1.0): voce[k] = p[k]
    if asset:
        voce["generazione"] = gen_media.get(asset)
        voce["prompt"] = G["immagini"].get(asset) or G["clip"].get(asset[:3])
    inq.append(voce)
video = os.path.join(B, f"{lez}.mp4")
dv = durata_video(video) if os.path.exists(video) else None
lim = lambda i: 12 if (i["sorgente"] or "").startswith("kit/scena.html") and ('"tabella"' in i["sorgente"] or '"griglia"' in i["sorgente"]) else (1e9 if i["tipo"] == "animazione_svg" else (10 if i["blocco"] in ("APERTURA", "CHIUSURA") else 9))
controlli = {
    "durata_video_s": dv, "durata_minima_12_00": bool(dv and dv >= 720),
    "inquadrature_oltre_il_limite": [i["scaletta"] for i in inq if i["durata_s"] > lim(i) + 0.02],
    "inquadrature_sotto_2_5_s": [i["scaletta"] for i in inq if i["durata_s"] < 2.48],
    "provini": os.path.exists(os.path.join(B, "provini.png")),
    "avvisi_del_piano": P["avvisi"],
}
R = dict(lezione=lez, titolo=json.load(open(os.path.join(M, f"{lez}_SCALETTA.json")))["titolo"],
         data=datetime.date.today().isoformat(), blocchi=blocchi, durata_voce_s=round(sum(b["lavorato_s"] for b in blocchi.values()), 2),
         inquadrature=inq, generazioni=G, controlli=controlli)
R.update(N)
json.dump(R, open(os.path.join(B, "registro.json"), "w"), ensure_ascii=False, indent=1)
print("registro", len(inq), "inquadrature; durata", dv, "; controlli:", {k: v for k, v in controlli.items() if k != "avvisi_del_piano"})
