"""Schermate dei documenti per la presentazione.

Ogni voce di RITAGLI rende una pagina del PDF a 220 dpi, evidenzia in giallo
le frasi indicate e ritaglia la fascia verticale che le contiene, con un po'
di margine. Le coordinate vengono da pdfplumber, quindi i ritagli restano
giusti anche se si cambiano le frasi.

    python3 ritagli.py            # rigenera tutte le schermate in schermate/
"""
import os
import subprocess
import sys

import pdfplumber
from PIL import Image, ImageDraw

QUI = os.path.dirname(os.path.abspath(__file__))
DOC = os.path.join(QUI, "..", "documenti")
OUT = os.path.join(QUI, "schermate")
DPI = 220
SCALA = DPI / 72

# nome: (pdf, pagina 1-based, [frasi da evidenziare], (y0, y1) facoltativo in punti PDF)
RITAGLI = {
    "dep-820mila": ("decentrati/18-accordo-dep-2025_10-12-25.pdf", 3,
                    ["destinare ai DEP anno 2025, un importo di € 820.000."], None),
    "dep-requisiti": ("decentrati/18-accordo-dep-2025_10-12-25.pdf", 4,
                      ["almeno tre anni di anzianità di", "di 365 giorni di assenza"], None),
    "dep-punteggio": ("decentrati/18-accordo-dep-2025_10-12-25.pdf", 5,
                      ["quota del 40% riferita all’esperienza professionale (massimo 40 punti)"], None),
    "dep-priorita": ("decentrati/18-accordo-dep-2025_10-12-25.pdf", 8,
                     ["almeno 10 anni (ovvero ante 01/01/2015)", "almeno 20 anni (ovvero ante 01/01/2005)"], None),
    "premialita-4mln": ("decentrati/04-accordo-progettualita-2026_15-04-26.pdf", 3,
                        ["4.286.894,91"], None),
    "progettualita-1mln": ("decentrati/04-accordo-progettualita-2026_15-04-26.pdf", 3,
                           ["un totale di € 1.040.000 derivanti dai residui dei fondi anno 2025"], None),
    "hub-4euro": ("decentrati/04-accordo-progettualita-2026_15-04-26.pdf", 4,
                  ["4,00 per ogni giornata di effettiva presenza", "destinando € 500.000"], None),
    "gettoni-tabella": ("decentrati/04-accordo-progettualita-2026_15-04-26.pdf", 5,
                        ["PACCHETTO ESTIVO GETTONE", "Mattina/Pomeriggio € 70,00 € 60,00", "Notte € 1 20,00 € 100,00"], None),
    "ferie-3settimane": ("decentrati/04-accordo-progettualita-2026_15-04-26.pdf", 7,
                         ["garantisce complessivamente 3 settimane di ferie (di cui", "almeno 2 consecutive) anche per i dipendenti con orario articolato su 6 giorni. Eventuali"], 22),
    "h24-30euro": ("decentrati/04-accordo-progettualita-2026_15-04-26.pdf", 7,
                   ["30,00/ora per le ore eccedenti al turno di lavoro della"], None),
    "ausiliari-3euro": ("decentrati/04-accordo-progettualita-2026_15-04-26.pdf", 7,
                        ["è riconosciuta una quota incentivante pari ad € 3,00 per ogni giornata di effettivo"], None),
    "impegni-2026": ("decentrati/04-accordo-progettualita-2026_15-04-26.pdf", 10,
                     ["totale impegno di spesa", "1.165.000,00"], None),
    "trasferimenti-quote": ("decentrati/01-accordo-3a-integrazione-progettualita-2025_27-01-26.pdf", 3,
                            ["€ 400 al Coordinatore;", "€ 300 al 10% del personale maggiormente coinvolto"], None),
    "tsrm-ambulatori": ("decentrati/01-accordo-3a-integrazione-progettualita-2025_27-01-26.pdf", 5,
                        ["riconoscendo € 100 pro capite.", "quota di € 300 pro capite ai dipendenti con"], None),
    "neonatale-80euro": ("decentrati/01-accordo-3a-integrazione-progettualita-2025_27-01-26.pdf", 4,
                         ["€ 80,00 agli infermieri impegnati nell’attività per"], None),
    "tavoli-permanenti": ("decentrati/19-dichiarazione-congiunta_23-12-25.pdf", 2,
                          ["Tavolo permanente sul fabbisogno di risorse umane",
                           "Tavolo permanente sulle riorganizzazioni"], None),
    "oss-notte": ("decentrati/19-dichiarazione-congiunta_23-12-25.pdf", 3,
                  ["Inserimento di Operatori Socio Sanitari (OSS) nel turno notturno delle Chirurgie"], None),
    "pasto-notte": ("decentrati/19-dichiarazione-congiunta_23-12-25.pdf", 4,
                    ["Pasto sostitutivo per turni notturni e festivi",
                     "inserimento degli OSS nelle aree chirurgiche 12 / 18 mesi."], None),
    "pediatria-impegno": ("decentrati/03-dichiarazione-congiunta-mobilita-pediatria_10-02-26.pdf", 3,
                          ["auspicabilmente entro l’anno corrente"], None),
    "lr26-pronta-disp": ("decentrati/10-risorse-legge-regionale-26-2026_14-07-26.pdf", 5,
                         ["determinerà un compenso complessivo di € 27,60 per ogni turno pieno di 12 ore in"], None),
    "lr26-notte": ("decentrati/10-risorse-legge-regionale-26-2026_14-07-26.pdf", 5,
                   ["a € 4,00 lorde per il servizio notturno effettuato tra le ore 22 e le ore 6 del giorno",
                    "valore orario di € 0,50 utilizzando parte delle risorse oggetto della presente intesa."], None),
    "lr26-aree": ("decentrati/10-risorse-legge-regionale-26-2026_14-07-26.pdf", 7,
                  ["€ 650", "€ 400"], (50, 330)),
    "lr26-welfare-pta": ("decentrati/10-risorse-legge-regionale-26-2026_14-07-26.pdf", 4,
                         ["amministrativo (ruoli PTA), mediante l’assegnazione di una quota welfare pari a euro 350,00"], None),
    "integr-coordinatori": ("decentrati/09-integrazione-progettualita-2026_14-07-26.pdf", 6,
                            ["scoperture di servizio. Pertanto, le parti ritengono di riconoscere una quota di € 500,"], None),
    "integr-tecnici-sanitari": ("decentrati/09-integrazione-progettualita-2026_14-07-26.pdf", 5,
                                ["nell’anno 2026, una quota teorica annuale, di € 300 pro capite ai dipendenti del"], None),
    "integr-radiologia-ps": ("decentrati/09-integrazione-progettualita-2026_14-07-26.pdf", 3,
                             ["incardinati nel Pronto Soccorso, si ritiene di innalzare da € 4 a € 7 la quota giornaliera"], None),
    "integr-impegni": ("decentrati/09-integrazione-progettualita-2026_14-07-26.pdf", 8,
                       ["totale impegno di spesa progettualità anno 2026", "400.000,00"], None),
    "progressioni-20posti": ("decentrati/08-regolamento-progressioni-tra-aree_14-07-26.pdf", 15,
                             ["stabilisce di prevedere a bando complessivamente n.20 posti, ripartiti come segue:", "COLL. AMMINISTRATIVO PROF. 10"], None),
    "parttime-135": ("decentrati/12-accordo-part-time_08-09-26.pdf", 3,
                     ["TOTALE POSTI A BANDO 135"], None),
    "parttime-bando": ("decentrati/12-accordo-part-time_08-09-26.pdf", 4,
                       ["entro la fine dell’anno corrente, con l’impegno di adottare le graduatorie entro il",
                        "primo trimestre anno 2027"], None),
    "agile-8giorni": ("decentrati/13-regolamento-lavoro-agile_25-09-26.pdf", None,
                      ["Sono previste fino ad un massimo di 8 giornate mensili, di norma, non più di due a"], None),
    "agile-disconnessione": ("decentrati/13-regolamento-lavoro-agile_25-09-26.pdf", None,
                             ["strumentazioni tecnologiche e piattaforme informatiche, che opera dalle 20:00 alle 08:00"], None),
}

# Frontespizi: la prima pagina intera di ogni accordo, con le firme e la
# CISL FP evidenziata.
for _f in sorted(os.listdir(os.path.join(DOC, "decentrati"))):
    if _f.endswith(".pdf"):
        RITAGLI["front-" + _f[:2]] = ("decentrati/" + _f, 1, ["CISL FP:"], (0, 2000))

# CCNL Sanità 2025-2027, ipotesi firmata il 29/07/2026
RITAGLI.update({
    "front-ccnl": ("ccnl/ipotesi-ccnl-sanita-2025-2027_29-07-26.pdf", 1, ["CISL FP firmato"], (0, 2000)),
    "ccnl-tab1a": ("ccnl/ipotesi-ccnl-sanita-2025-2027_29-07-26.pdf", 82, ["PROFESSIONISTI DELLA SALUTE E DEI FUNZIONARI"], (55, 330)),
    "ccnl-tab2a": ("ccnl/ipotesi-ccnl-sanita-2025-2027_29-07-26.pdf", 83, ["PROFESSIONISTI DELLA SALUTE E DEI FUNZIONARI"], (55, 300)),
    "ccnl-tab3": ("ccnl/ipotesi-ccnl-sanita-2025-2027_29-07-26.pdf", 84, [], (50, 352)),
    "ccnl-tab4": ("ccnl/ipotesi-ccnl-sanita-2025-2027_29-07-26.pdf", 84, [], (372, 605)),
    "ccnl-indennita-ferie": ("ccnl/ipotesi-ccnl-sanita-2025-2027_29-07-26.pdf", 52, ["spetta anche una indennità giornaliera denominata “Indennità ferie” –"], None),
    "ccnl-ferie-giorni": ("ccnl/ipotesi-ccnl-sanita-2025-2027_29-07-26.pdf", 52, ["la durata delle ferie è di 28 giorni lavorativi.", "la durata"], 40),
    "ccnl-ferie-estate": ("ccnl/ipotesi-ccnl-sanita-2025-2027_29-07-26.pdf", 54, ["15 giugno - 15 settembre al fine di promuovere la conciliazione dei tempi di vita e"], 60),
    "ccnl-vestizione": ("ccnl/ipotesi-ccnl-sanita-2025-2027_29-07-26.pdf", 45, ["l’orario di lavoro riconosciuto ricomprende fino a 10 minuti complessivi e forfettari",
                                   "sono riconosciuti fino ad un massimo di 15 minuti complessivi e forfettari tra"], 30),
    "ccnl-aggressioni": ("ccnl/ipotesi-ccnl-sanita-2025-2027_29-07-26.pdf", 62, ["ad opera di terzi, assume ogni onere di difesa per tutti i gradi del giudizio - ivi",
                                    "supporto psicologico, salvo diversa scelta del dipendente; quest’ultimo può inoltre"], 30),
    "ccnl-permessi": ("ccnl/ipotesi-ccnl-sanita-2025-2027_29-07-26.pdf", 46, ["giornaliera che oraria, nella misura massima di 18 ore annuali, comprensive anche",
                                 "pari o superiore al 74 per cento ha diritto di fruire, di ulteriori dieci ore annue di"], 30),
    "ccnl-ia": ("ccnl/ipotesi-ccnl-sanita-2025-2027_29-07-26.pdf", 21, ["1. L’utilizzo di sistemi di IA non può dar luogo a decisioni prevalentemente e/o"], 40),
    "ccnl-221": ("ccnl/ipotesi-ccnl-sanita-2025-2027_29-07-26.pdf", 66, ["incrementata di un importo, su base annua, pari ad Euro 221,00 pro-capite,"], 40),
    "ccnl-uo-disagiate": ("ccnl/ipotesi-ccnl-sanita-2025-2027_29-07-26.pdf", 68, [], (40, 245)),
    "ccnl-buoni-pasto": ("ccnl/ipotesi-ccnl-sanita-2025-2027_29-07-26.pdf", 85, ["della disciplina relativa a mensa e buoni pasto."], 40),
})

# Incentivi funzioni tecniche: proposta dell'Azienda (rev.5, 8/10/26) e proposta CISL (Rev 22)
RITAGLI.update({
    "inc-az-forniture": ("incentivi/regolamento-rev5-azienda-08-10-26.pdf", None, ["0,35% 0,75% 1,50%", "0,20% 0,40% 0,80%"], (145, 395)),
    "inc-az-riduzioni": ("incentivi/regolamento-rev5-azienda-08-10-26.pdf", None, ["del 100% nel caso di ritardi superiori al 100% dei tempi originariamente previsti nel"], 110),
    "inc-az-debito-orario": ("incentivi/regolamento-rev5-azienda-08-10-26.pdf", None, ["Costituisce in ogni caso presupposto del pagamento della relativa liquidazione l’assenza di debito"], 40),
    "inc-az-31-luglio": ("incentivi/regolamento-rev5-azienda-08-10-26.pdf", None, ["Il pagamento dell’incentivo è disposto, entro il 31 luglio, dal Direttore dell’UOC Risorse Umane, fino"], 40),
    "inc-cisl-scaglioni": ("incentivi/regolamento-V22.pdf", 14, ["Fino a € 250.000 1,00% 1,80%", "Da € 250.001 a € 750.000 0,70% 1,30%"], (75, 430)),
    "inc-cisl-fittizie": ("incentivi/regolamento-V22.pdf", None, ["È fatto divieto di procedere a nomine formali o fittizie (ivi inclusa la designazione di"], 50),
    "inc-cisl-30-giorni": ("incentivi/regolamento-V22.pdf", None, ["incentivi deve avvenire entro 30 giorni dall’emissione del certificato di"], 50),
    "inc-cisl-onere-prova": ("incentivi/regolamento-V22.pdf", None, ["onere di dare espressa, puntuale e documentata evidenza dell'eventuale"], 50),
    "inc-cisl-rsu": ("incentivi/regolamento-V22.pdf", None, ["Organizzazioni Sindacali firmatarie entro 30 giorni dalla trasmissione alla"], 50),
})


def trova(pagina, frase):
    """Rettangoli (in punti PDF) delle righe che compongono la frase."""
    risultati = pagina.search(frase, regex=False, case=True)
    if not risultati:
        return []
    r = risultati[0]
    return [(c["x0"], c["top"], c["x1"], c["bottom"]) for c in r["chars"]] and [
        (r["x0"], r["top"], r["x1"], r["bottom"])
    ]


def righe(pagina, frase):
    """Una casella per riga: search() restituisce un'unica casella anche se la frase va a capo."""
    risultati = pagina.search(frase, regex=False, case=True, return_chars=True)
    if not risultati:
        return []
    per_riga = {}
    for c in risultati[0]["chars"]:
        chiave = round(c["top"])
        x0, t, x1, b = per_riga.get(chiave, (c["x0"], c["top"], c["x1"], c["bottom"]))
        per_riga[chiave] = (min(x0, c["x0"]), min(t, c["top"]), max(x1, c["x1"]), max(b, c["bottom"]))
    return list(per_riga.values())


def rendi(pdf, n):
    base = os.path.join(OUT, "_pagine", os.path.basename(pdf)[:-4] + f"-p{n}")
    png = base + ".png"
    if not os.path.exists(png):
        os.makedirs(os.path.dirname(base), exist_ok=True)
        subprocess.run(["pdftoppm", "-png", "-r", str(DPI), "-f", str(n), "-l", str(n),
                        "-singlefile", pdf, base], check=True)
    return Image.open(png).convert("RGB")


def fai(nome, pdf_rel, n, frasi, fascia):
    pdf = os.path.join(DOC, pdf_rel)
    with pdfplumber.open(pdf) as doc:
        if n is None:
            n = next(i + 1 for i, pg in enumerate(doc.pages)
                     if righe(pg, frasi[0]))
        pagina = doc.pages[n - 1]
        caselle = []
        for f in frasi:
            trovate = righe(pagina, f)
            if not trovate:
                print(f"  ! {nome}: frase non trovata: {f!r}", file=sys.stderr)
            caselle += trovate
        larghezza, altezza = pagina.width, pagina.height
    img = rendi(pdf, n)
    velo = Image.new("RGBA", img.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(velo)
    for x0, t, x1, b in caselle:
        d.rounded_rectangle([x0 * SCALA - 6, t * SCALA - 4, x1 * SCALA + 6, b * SCALA + 4],
                            radius=8, fill=(255, 214, 10, 110))
    img = Image.alpha_composite(img.convert("RGBA"), velo).convert("RGB")
    margine = 70
    if isinstance(fascia, (int, float)):
        margine, fascia = fascia, None
    if fascia is None and caselle:
        fascia = (min(c[1] for c in caselle) - margine, max(c[3] for c in caselle) + margine)
    y0, y1 = fascia if fascia else (0, altezza)
    y0, y1 = max(0, y0), min(altezza, y1)
    ritaglio = img.crop((int(40 * SCALA), int(y0 * SCALA), int((larghezza - 40) * SCALA), int(y1 * SCALA)))
    ritaglio.save(os.path.join(OUT, nome + ".png"), optimize=True)
    print(f"  {nome}: {len(caselle)} righe evidenziate, {ritaglio.size[0]}x{ritaglio.size[1]}")


if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)
    scelti = sys.argv[1:] or list(RITAGLI)
    for nome in scelti:
        fai(nome, *RITAGLI[nome])
