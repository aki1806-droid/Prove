# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,'[warm] In un volo lungo, il pilota automatico fa gran parte del lavoro. Il comandante lo imposta, controlla gli strumenti, e lo lascia fare.'),
 (1,"chiaro",0,"In crociera, quando il viaggio e' ancora lungo, tiene la quota alta. In avvicinamento comincia a scendere, piano piano, fino all'atterraggio sulla pista, morbido e senza scossoni."),
 (1,"chiaro",0,"Il profilo Life Cycle di Perseo Sirio fa qualcosa di simile con i tuoi investimenti. E' il sesto profilo, quello che abbiamo lasciato in sospeso."),
 (1,"chiaro",0,"Quando sei giovane e hai molti anni davanti, tiene la posizione piu' esposta alla crescita. Con l'avvicinarsi della pensione, la porta gradualmente verso la prudenza."),
 (1,"chiaro",0,'In questa lezione vediamo come funziona, quando scatta, a chi si applica senza che lo scelga, e a che cosa fare attenzione.'),
 (1,"chiaro",0,'Come sempre in questo modulo: informazioni generali, non consulenza finanziaria. E i rendimenti passati non garantiscono quelli futuri.'),

 (2,"chiaro",0,"Ecco allora il percorso completo, tappa per tappa. Immagina una linea dell'eta', dai vent'anni fino alla pensione, divisa in cinque tratti."),
 (2,"chiaro",0,"Fino a quarantacinque anni, la posizione e' tutta nel comparto Azionario. E' la quota di crociera: la piu' alta."),
 (2,"chiaro",0,"Ricordi la lezione precedente? E' l'unico modo, in Perseo Sirio, per avere il cento per cento in azioni."),
 (2,"chiaro",0,"Da quarantasei a cinquant'anni, la posizione passa al Bilanciato Dinamico: settanta per cento di azioni e trenta di obbligazioni."),
 (2,"chiaro",0,"Da cinquantuno a cinquantacinque anni, al Bilanciato Crescita: meta' azioni e meta' obbligazioni. La discesa e' cominciata."),
 (2,"chiaro",0,"Da cinquantasei a sessant'anni, al Bilanciato Prudente: solo trenta per cento di azioni, e il resto in obbligazioni."),
 (2,"chiaro",0,"E dai sessantuno anni in poi, al Garantito. E' la fase di atterraggio: quella in cui un anno storto peserebbe di piu'."),
 (2,"chiaro",0,"I passaggi avvengono in automatico, al compimento dell'eta' prevista. Non devi compilare nessun modulo, ne' ricordarti le date."),
 (2,"chiaro",0,"E non paghi nulla per gli spostamenti da un comparto all'altro. Il pilota automatico, insomma, lavora gratis."),

 (3,"chiaro",0,"Chi si ritrova nel Life Cycle? Ovviamente, prima di tutto, chi lo sceglie: all'adesione, oppure cambiando profilo in seguito."),
 (3,"chiaro",0,"Ma dal dicembre 2023 e' anche il profilo di default per chi aderisce con il modulo, senza indicare nessuna preferenza."),
 (3,"chiaro",0,"E lo e' anche per gli aderenti contrattuali della polizia locale, che entrano nel Fondo grazie al contratto di lavoro, come abbiamo visto nel modulo tre."),
 (3,"chiaro",0,"Attenzione, pero', a un'eccezione molto importante, che riguarda moltissimi dipendenti pubblici assunti di recente."),
 (3,"chiaro",0,'Chi entra per silenzio-assenso, come abbiamo visto nel modulo tre, non parte dal Life Cycle. Parte dal Garantito.'),
 (3,"chiaro",0,"E nel Garantito ci resta, anno dopo anno, finche' non decide lui di cambiare profilo. Il pilota automatico, qui, non si accende."),
 (3,"chiaro",0,"Per un neoassunto di venticinque anni significa partire dal profilo piu' prudente, anche se ha quarant'anni di carriera davanti."),
 (3,"chiaro",0,"Ricordi la lezione sei punto due? Con un orizzonte cosi' lungo, la stabilita' conta meno, e il tempo per recuperare c'e'."),

 (4,"chiaro",0,"Il Life Cycle ha un grande pregio, ed e' la comodita': ti accompagna senza che tu debba ricordarti di cambiare profilo."),
 (4,"chiaro",0,"Ha pero' anche un limite, che vale la pena conoscere bene prima di sceglierlo, o prima di decidere di restarci."),
 (4,"chiaro",0,"Segue soltanto la tua eta' anagrafica, non la data in cui andrai davvero in pensione. Il pilota guarda l'orologio, non la pista."),
 (4,"chiaro",0,'Prendi due colleghi di sessantun anni, con la stessa data di nascita. Passano entrambi al Garantito, nello stesso momento.'),
 (4,"chiaro",0,"Ma uno smettera' di lavorare tra un anno, e l'altro tra sei. Per il secondo, sono sei anni di volo a quota molto bassa, con meno possibilita' di crescita."),
 (4,"chiaro",0,"Per la maggior parte delle persone, il percorso funziona bene, perche' e' pensato proprio sulla media delle carriere."),
 (4,"chiaro",0,'Ma se prevedi di uscire molto prima o molto dopo la media, il percorso automatico potrebbe non essere su misura per te.'),
 (4,"chiaro",0,"Lo stesso vale se hai altri risparmi che cambiano il quadro. In questi casi puo' valere la pena un profilo fisso, aggiornato da te nel tempo."),

 (5,"chiaro",0,'Ora un consiglio pratico, che vale davvero qualunque profilo tu scelga: automatico o fisso, prudente o dinamico.'),
 (5,"chiaro",0,"Segna sul calendario un appuntamento con te stesso, una volta l'anno. Il momento giusto e' quando arriva il prospetto annuale."),
 (5,"chiaro",0,"Bastano dieci minuti per farti due domande. La mia situazione e' cambiata? Il profilo e' ancora coerente con i miei anni e con la mia tranquillita'?"),
 (5,"chiaro",0,"Se la risposta e' si', non serve fare nulla: il volo prosegue. Se e' no, sai gia' dove andare: il questionario, o la consulenza gratuita."),

 (6,"profondo",1.2,'Il pilota automatico aiuta. Ma il volo resta tuo.'),

 (7,"chiaro",0,"Le tre cose da ricordare. Uno: il Life Cycle sposta automaticamente la posizione dall'Azionario al Garantito, man mano che l'eta' avanza."),
 (7,"chiaro",0,"Due: e' il profilo di default per chi aderisce con il modulo senza scegliere, e per gli aderenti contrattuali."),
 (7,"chiaro",0,"Tre: chi entra per silenzio-assenso parte invece dal Garantito, e ci resta finche' non cambia lui."),
 (7,"chiaro",0,"La mossa di oggi riguarda soprattutto chi e' entrato in Perseo Sirio per silenzio-assenso."),
 (7,"chiaro",0,"Controlla nell'area riservata, come nella lezione precedente, se il tuo profilo e' ancora il Garantito. Se lo e', chiediti se e' davvero adatto ai tuoi anni."),
 (7,"chiaro",0,'Per rispondere, rifai con calma il questionario di autovalutazione. E se hai dubbi, prenota la consulenza gratuita.'),
 (7,"chiaro",0,"Se invece sei nel Life Cycle, segnati le eta' dei passaggi: quarantacinque, cinquanta, cinquantacinque, sessanta."),
 (7,"chiaro",0,"E ricordati dell'appuntamento annuale con il prospetto. Dieci minuti l'anno, per un volo che dura una vita intera di lavoro."),
 (7,"chiaro",0,"Nella prossima lezione parliamo della grande novita' del 2026, che riguarda il tuo TFR."),
 (7,"chiaro",0,"E' una novita' che cambia le regole del gioco per molti lavoratori, soprattutto per i nuovi assunti, e che conviene capire bene."),
 (7,"chiaro",0,'[warm] Ci vediamo nella lezione sei punto cinque.'),
]

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Apertura', 2: 'Il percorso', 3: 'Chi si ritrova nel Life Cycle', 4: 'Il limite', 5: "L'appuntamento annuale", 6: 'Memo', 7: 'Chiusura'}
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
