# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,'[warm] Non tutte le vecchiaie si somigliano. Basta guardarsi intorno: ognuno arriva alla pensione con una vita diversa alle spalle, e accanto.'),
 (1,"chiaro",0,"C'e' chi vive in coppia, e vuole proteggere il partner anche dopo di se'. C'e' chi vive solo, e pensa prima di tutto a se stesso."),
 (1,"chiaro",0,"E c'e' chi teme di perdere un giorno l'autosufficienza, e di avere bisogno di assistenza. Esigenze diverse, risposte diverse."),
 (1,"chiaro",0,"Per questo la rendita non e' una sola. Perseo Sirio, attraverso una convenzione con una compagnia di assicurazione, offre cinque tipi di rendita."),
 (1,"chiaro",0,'Si sceglie al momento della pensione, quando si chiede la prestazione. In questa lezione li vediamo uno per uno, con i pro e i contro di ciascuno.'),

 (2,"chiaro",0,"La prima e' la rendita vitalizia immediata. Un assegno che parte subito, viene pagato per tutta la tua vita, e si ferma alla tua morte."),
 (2,"chiaro",0,"E' la piu' semplice, e a parita' di capitale e' anche la piu' alta. Perche' la compagnia si impegna a pagare solo finche' vivi tu."),
 (2,"chiaro",0,"La seconda e' la rendita reversibile. Dopo la tua morte, la rendita continua, in tutto o in parte, a favore di una persona che indichi tu."),
 (2,"chiaro",0,"Di solito e' il coniuge, o comunque la persona con cui si vive. E' la scelta naturale per chi vuole che l'assegno non si interrompa per chi resta."),
 (2,"chiaro",0,"La terza e' la rendita certa per cinque o dieci anni. Per quel periodo viene pagata comunque, a te o ai tuoi beneficiari."),
 (2,"chiaro",0,"Poi, finito il periodo certo, prosegue come una normale vitalizia, finche' vivi. E' una garanzia che copre i primi anni di pensione."),
 (2,"chiaro",0,"La quarta e' la rendita controassicurata. Alla tua morte, i beneficiari ricevono il capitale non ancora restituito, sotto forma di rate."),
 (2,"chiaro",0,"In pratica, quello che hai trasformato in rendita non va perso se la vita e' piu' breve del previsto. Quello che resta passa a chi hai indicato."),
 (2,"chiaro",0,"La quinta e' la LTC, una rendita pensata per un rischio particolare. La vediamo tra poco, perche' merita uno spazio tutto suo."),

 (3,"chiaro",0,"Prima, pero', una regola da tenere a mente quando si confrontano queste rendite. E' una sola, ed e' semplice come una bilancia."),
 (3,"chiaro",0,"Ogni protezione in piu' per chi resta si paga con un assegno mensile un po' piu' basso. Su un piatto l'importo, sull'altro la protezione: se uno sale, l'altro scende."),
 (3,"chiaro",0,"Con lo stesso capitale, la vitalizia semplice da' l'importo piu' alto, perche' si ferma con te. Nessun impegno verso altre persone, dopo di te."),
 (3,"chiaro",0,"La reversibile, la certa e la controassicurata danno un po' meno al mese. Perche' la compagnia si impegna a pagare anche dopo."),
 (3,"chiaro",0,"Non c'e' una scelta giusta per tutti, e diffida di chi te ne propone una valida per chiunque. Dipende da chi hai accanto, e da chi dipende da te."),
 (3,"chiaro",0,"E dipende anche da quali altre tutele ha gia' la tua famiglia. Per esempio la pensione di reversibilita' pubblica."),
 (3,"chiaro",0,"Chi ha un coniuge che ricevera' gia' una buona reversibilita' dall'INPS, potrebbe preferire la vitalizia semplice, piu' alta."),

 (4,"chiaro",0,"E veniamo alla quinta rendita, che merita uno spazio a se'. E' la meno conosciuta, ma risponde a una paura molto diffusa."),
 (4,"chiaro",0,"Si chiama LTC, dall'inglese long term care, cioe' assistenza di lungo periodo. In italiano si parla spesso di non autosufficienza."),
 (4,"chiaro",0,"Funziona come una rendita vitalizia, pagata per tutta la vita. Ma se perdi l'autosufficienza, l'importo raddoppia."),
 (4,"chiaro",0,"E resta raddoppiato per tutto il periodo in cui la condizione permane. Proprio quando le spese di assistenza diventano piu' pesanti."),
 (4,"chiaro",0,"Ci sono pero' alcune condizioni da conoscere prima. Si puo' chiedere fino a settant'anni di eta' assicurativa."),
 (4,"chiaro",0,"E la compagnia valuta prima lo stato di salute. Puo' anche rifiutare: in quel caso si sceglie un'altra delle quattro rendite."),
 (4,"chiaro",0,"Ha anche un costo di conversione piu' alto: il cinque per cento, invece dell'uno virgola dieci delle altre."),
 (4,"chiaro",0,"E' pensata per chi vuole proteggersi da uno dei rischi piu' pesanti della vecchiaia, per se' e per la propria famiglia."),

 (5,"chiaro",0,'Qualche dettaglio pratico, che vale per tutte e cinque le rendite, qualunque tu scelga.'),
 (5,"chiaro",0,"La rendita si puo' ricevere ogni mese, ogni due, tre o sei mesi, oppure una volta l'anno. Scegli il ritmo che preferisci."),
 (5,"chiaro",0,"Ogni anno viene rivalutata, cosi' l'assegno non resta fermo nel tempo, anno dopo anno."),
 (5,"chiaro",0,'E il suo importo dipende soprattutto da due cose: quanto capitale trasformi in rendita, e quanti anni hai quando la chiedi.'),
 (5,"chiaro",0,"A parita' di capitale, chi la chiede piu' tardi riceve un assegno piu' alto. Perche' la compagnia prevede di pagarlo per meno anni."),
 (5,"chiaro",0,"Le basi tecniche, cioe' i calcoli che stanno dietro all'importo, sono spiegate nel Documento sulle rendite, sul sito del Fondo."),

 (6,"profondo",1.2,'La rendita giusta dipende da te, ma anche da chi ti sta accanto.'),

 (7,"chiaro",0,'Le tre cose da ricordare. Uno: le rendite tra cui scegliere, al momento della pensione, sono cinque.'),
 (7,"chiaro",0,"Vitalizia, reversibile, certa per cinque o dieci anni, controassicurata e LTC. Ognuna risponde a un'esigenza diversa."),
 (7,"chiaro",0,"Due: ogni protezione per chi resta riduce un po' l'importo mensile. Piu' protezione, assegno piu' basso."),
 (7,"chiaro",0,'Tre: la LTC raddoppia la rendita in caso di non autosufficienza, previa valutazione dello stato di salute da parte della compagnia.'),
 (7,"chiaro",0,'La mossa di oggi, se la pensione si avvicina: parla con chi vive con te di quale protezione vorreste.'),
 (7,"chiaro",0,"E' una scelta che riguarda anche loro, e che conviene preparare per tempo. Farla insieme, con calma, e' molto meglio che farla da soli all'ultimo momento."),
 (7,"chiaro",0,'Nella prossima lezione torniamo con i piedi per terra, e guardiamo il calendario con attenzione.'),
 (7,"chiaro",0,"Quando arrivano davvero i soldi, una volta chiesta la prestazione? La risposta e' meno ovvia di quanto sembri."),
 (7,"chiaro",0,"Perche' le due tasche della posizione, quella reale e quella figurativa, viaggiano su due treni diversi, con due orari diversi."),
 (7,"chiaro",0,"Vedremo quanto bisogna aspettare per ciascuna parte, perche', e che cosa puoi fare tu per non aggiungere ritardi."),
 (7,"chiaro",0,'[warm] I tempi reali. Ci vediamo nella lezione nove punto quattro.'),
]

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Apertura', 2: 'Le cinque rendite', 3: 'La regola della bilancia', 4: 'La LTC', 5: 'Dettagli pratici', 6: 'Memo', 7: 'Chiusura'}
CPS = 17.0   # GianP eleven_v3, misurata sul corso Infermiere: si rimisura sulla 1.1

blocchi=[]
for i,(cap,tema,posa,txt) in enumerate(BLOCCHI, start=2):
    blocchi.append({"id":f"s{i:02d}","capitolo":cap,"tema":tema,"posa":posa,"text":txt})

errori=[]
tot=sum(len(b["text"]) for b in blocchi)
nscene=len(blocchi)+2
if nscene>50: errori.append(f"scene {nscene} > 50")
for b in blocchi:
    if any(c in ACCENTATE for c in b["text"]):
        errori.append(f'{b["id"]}: vocale accentata -> ' + "".join(sorted({c for c in b["text"] if c in ACCENTATE})))
    if len(b["text"])>225: errori.append(f'{b["id"]}: {len(b["text"])} car, blocco troppo lungo')
tags=sum(len(re.findall(r"\[[a-z]+\]", b["text"])) for b in blocchi)
if tags>6: errori.append(f"tag di intenzione: {tags} > 6")

pose=sum(b["posa"] for b in blocchi)
parlato=tot/CPS+pose; durata=parlato+3+10
print(f"blocchi   {len(blocchi)}        scene {nscene}/50")
print(f"caratteri {tot}      media {tot/len(blocchi):.0f} car/blocco")
print(f"parlato   {parlato:.0f} s     montato {durata//60:.0f}:{durata%60:04.1f}   (stima a {CPS} car/s)")
print(f"tag       {tags}        pose {sum(1 for b in blocchi if b['posa'])}")
print()
cur=None
for b in blocchi:
    if b["capitolo"]!=cur:
        cur=b["capitolo"]; print(f'  cap {cur:2d}  {CAPITOLI[cur]}')
    p=f'  +{b["posa"]}s' if b["posa"] else ""
    print(f'    {b["id"]}  {len(b["text"]):3d} car  [{b["tema"]:8s}]{p} {b["text"][:52]}...')

# Lo stacco fra le due tracce: il confine di capitolo che divide i caratteri
# nel modo piu' pari, fra quelli che tengono ENTRAMBI i chunk sotto i 5.000.
# Prendere il primo confine dopo la meta' non basta: su 2.2 dava un chunk A da
# 5.072 caratteri, e la voce avrebbe rifiutato il testo.
LIMITE = 5000
cand = []
acc = 0
for i, b in enumerate(blocchi[:-1]):
    acc += len(b["text"]) + 1
    if b["capitolo"] != blocchi[i+1]["capitolo"]:
        cand.append((b["id"], acc, tot - acc))
buoni = [c for c in cand if c[1] <= LIMITE and c[2] <= LIMITE]
if buoni:
    stacco, a, bb = min(buoni, key=lambda c: abs(c[1] - c[2]))
    print(f"\nstacco tracce dopo {stacco}:  chunkA {a} car  ·  chunkB {bb} car   (limite {LIMITE})")
else:
    stacco, a, bb = min(cand, key=lambda c: max(c[1], c[2]))
    errori.append(f"nessuno stacco tiene i due chunk sotto {LIMITE}: il migliore e' "
                  f"{stacco} con {max(a, bb)} car. Serve un capitolo in piu'.")
    print(f"\nstacco tracce dopo {stacco}:  chunkA {a} car  ·  chunkB {bb} car   (limite {LIMITE})")
# tagli.py deve tagliare dove la voce ha davvero staccato: se le due costanti
# divergono, i blocchi finiscono sulla traccia sbagliata e non se ne accorge
# nessuno finche' non si guarda il video.
import pathlib as _pl
_tagli = _pl.Path("audio/tagli.py")
if _tagli.exists():
    _m = re.search(r'STACCO\s*=\s*"(s\d+)"', _tagli.read_text(encoding="utf-8"))
    if _m and _m.group(1) != stacco:
        errori.append(f'audio/tagli.py ha STACCO = "{_m.group(1)}", qui lo stacco e\' {stacco}')

print("\n" + ("OK, nessun errore" if not errori else "ERRORI:\n  " + "\n  ".join(errori)))
json.dump(blocchi, open("copione/blocchi.json","w",encoding="utf-8"), ensure_ascii=False, indent=1)

# I due chunk per la voce li scrive lo stesso file che ha scritto i blocchi:
# copiarli a mano significherebbe far divergere il copione dal testo letto,
# e la verifica della trascrizione confronterebbe due cose gia' diverse.
i = [b["id"] for b in blocchi].index(stacco)
for nome, gruppo in (("A", blocchi[:i+1]), ("B", blocchi[i+1:])):
    open(f"audio/chunk{nome}.txt","w",encoding="utf-8").write(
        "\n\n".join(b["text"] for b in gruppo) + "\n")
print(f"scritti audio/chunkA.txt e audio/chunkB.txt")
