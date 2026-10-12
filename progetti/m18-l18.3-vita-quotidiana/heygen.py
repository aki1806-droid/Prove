#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Il passaggio su HeyGen, in tre mosse separate perche' quella in mezzo costa
tempo e non si ripete a vuoto:

    heygen.py prepara   elenca i file e il loro peso, nell'ordine di invio
    heygen.py invia     manda i byte agli indirizzi del lotto
    heygen.py scene     scrive la lista di scene da passare allo studio

Fra «prepara» e «invia» ci va una chiamata a mano: create_asset_upload_batch con
il contenuto di files.json, e la risposta salvata in _montaggio/lotto.json.
Gli item del lotto NON portano il nome del file: l'accoppiamento con i percorsi
e' soltanto posizionale, e il content-type e' l'unica verifica possibile. Per
questo l'ordine di «prepara» e' la chiave di tutto e non va toccato.

Si caricano le scene intere (scene/*.mp4: ingresso piu' fermo immagine, durata
piena), non le clip da 1,8 s: la durata della scena consegnata e' quella del
filmato, e ARROTONDA_SCENA e' misurato su questo.
Tutto cio' che scrive sta in _montaggio/, che il repo ignora."""
import json, time, subprocess, sys
from pathlib import Path

QUI = Path(__file__).resolve().parent
OUT = QUI/"_montaggio"; OUT.mkdir(exist_ok=True)
sys.path.insert(0, str(QUI))
from profilo import COPERTINA, CHIUSURA


def _blocchi():
    return json.loads((QUI/"audio"/"blocchi-audio.json").read_text(encoding="utf-8"))

def _estremi():
    png = sorted(p.stem for p in (QUI/"slide"/"png").glob("s*.png"))
    if not png: raise SystemExit("nessun PNG: prima cards.mjs")
    return png[0], png[-1]


def cmd_prepara():
    ids = [r["id"] for r in _blocchi()]
    copertina, chiusura = _estremi()
    voci  = [(f"{copertina}.png", QUI/"slide"/"png"/f"{copertina}.png", "image/png"),
             (f"{chiusura}.png",  QUI/"slide"/"png"/f"{chiusura}.png",  "image/png")]
    voci += [(f"{i}.mp4", QUI/"scene"/f"{i}.mp4", "video/mp4") for i in ids]
    voci += [(f"{i}.mp3", QUI/"audio"/"blocchi"/f"{i}.mp3", "audio/mpeg") for i in ids]
    for nome, p, _ in voci:
        if not p.exists(): raise SystemExit(f"manca {p}")

    (OUT/"files.json").write_text(json.dumps(
        [{"filename": n, "content_type": c, "size_bytes": p.stat().st_size} for n, p, c in voci]),
        encoding="utf-8")
    (OUT/"percorsi.json").write_text(json.dumps([[n, str(p), c] for n, p, c in voci]),
                                     encoding="utf-8")
    print(f"{len(voci)} file: copertina {copertina}, chiusura {chiusura}, "
          f"{len(ids)} scene, {len(ids)} mp3")
    print(f"peso totale {sum(p.stat().st_size for _,p,_ in voci)/1e6:.1f} MB")
    if len(voci) > 100:
        print(f"ATTENZIONE: il lotto accetta 100 file, qui sono {len(voci)}")
    print("ora: create_asset_upload_batch con files.json, risposta in _montaggio/lotto.json")


def cmd_invia():
    lotto = json.loads((OUT/"lotto.json").read_text())
    perc  = json.loads((OUT/"percorsi.json").read_text())
    items = lotto["items"]
    if len(items) != len(perc):
        raise SystemExit(f"lotto {len(items)} item, percorsi {len(perc)}: non combaciano")

    mappa, errori = {}, []
    for i, (nome, strada, tipo) in enumerate(perc):
        it = items[i]
        atteso = it["upload_headers"]["content-type"]
        if atteso != tipo:
            raise SystemExit(f"{nome}: alla posizione {i} il lotto aspetta {atteso}, non {tipo}")
        testa = [x for k, v in it["upload_headers"].items() for x in ("-H", f"{k}: {v}")]
        # Un 503 dello storage e' transitorio: su 96 file ne sono caduti due
        # (18.2). Si riprova fino a tre volte, aspettando 2, 4, 8 secondi.
        for attesa in (0, 2, 4, 8):
            time.sleep(attesa)
            p = subprocess.run(["curl", "-sS", "--max-time", "300", "-o", "/dev/null",
                                "-w", "%{http_code}", "-X", "PUT", "--upload-file", strada,
                                *testa, it["upload_url"]], capture_output=True, text=True)
            if p.stdout.strip() == "200": break
        if p.stdout.strip() != "200":
            errori.append((nome, p.stdout.strip(), p.stderr[-200:])); print(f"\n  {nome} KO")
        else:
            mappa[nome] = it["asset_id"]; print(nome, end=" ", flush=True)

    print()
    if errori:
        for e in errori: print(" KO", e)
        raise SystemExit(1)
    (OUT/"asset-heygen.json").write_text(json.dumps(
        {"batch_id": lotto["batch_id"], "asset": mappa}, indent=1), encoding="utf-8")
    print(f"{len(mappa)} file inviati, nessun errore")
    print("ora: complete_asset_batch, poi get_asset_batch finche' il conteggio e' tutto pronto")


def cmd_scene():
    asset = json.loads((OUT/"asset-heygen.json").read_text(encoding="utf-8"))["asset"]
    reg = _blocchi()
    copertina, chiusura = _estremi()

    def immagine(nome, durata):
        return {"type": "image",
                "source": {"type": "asset_id", "asset_id": asset[f"{nome}.png"]},
                "duration": durata}

    # il video va ammutolito e tenuto fermo: la durata la detta l'mp3, non il filmato
    scene = [immagine(copertina, COPERTINA)]
    scene += [{"type": "video",
               "source": {"type": "asset_id", "asset_id": asset[f'{r["id"]}.mp4']},
               "audio_asset_id": asset[f'{r["id"]}.mp3'],
               "playback": {"mode": "freeze", "mute": True}} for r in reg]
    scene.append(immagine(chiusura, CHIUSURA))

    rif = [x["source"]["asset_id"] for x in scene] + \
          [x["audio_asset_id"] for x in scene if "audio_asset_id" in x]
    if len(set(rif)) != len(rif): raise SystemExit("un asset_id compare due volte")

    (OUT/"scene-heygen.json").write_text(json.dumps(scene), encoding="utf-8")
    print(f"{len(scene)} scene · copertina {COPERTINA:g} s · {len(reg)} blocchi · "
          f"chiusura {CHIUSURA:g} s · {len(rif)} asset distinti")


if __name__ == "__main__":
    mosse = {"prepara": cmd_prepara, "invia": cmd_invia, "scene": cmd_scene}
    if len(sys.argv) != 2 or sys.argv[1] not in mosse:
        raise SystemExit("uso: heygen.py prepara|invia|scene")
    mosse[sys.argv[1]]()
