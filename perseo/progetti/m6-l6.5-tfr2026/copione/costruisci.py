# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Per anni, una parte importante della tua posizione e' stata come una scatola chiusa, su uno scaffale. Cresceva, ma non potevi decidere come."),
 (1,"chiaro",0,"Era la tasca figurativa: quella del TFR che non esce davvero dall'amministrazione, ma resta all'INPS e viene solo annotata sul tuo conto."),
 (1,"chiaro",0,"Dal primo gennaio 2026, quella scatola finalmente si e' aperta. E dentro c'e' una manopola che puoi girare tu."),
 (1,"chiaro",0,"In questa lezione vediamo con calma che cosa e' cambiato, perche' riguarda proprio te, e che cosa conviene fare."),
 (1,"chiaro",0,'Come sempre in questo modulo: informazioni generali, non consulenza finanziaria. E i rendimenti passati non garantiscono quelli futuri.'),

 (2,"chiaro",0,"Ricordi le due tasche, nel modulo due? Sono come le due tasche di un cappotto. La tasca reale riceve i contributi veri, e li investe. La tasca figurativa e' una cifra scritta, che resta all'INPS."),
 (2,"chiaro",0,"Fino al 2025, la tasca figurativa, quella del TFR e dell'uno virgola cinque per cento, veniva rivalutata dall'INPS in un modo uguale per tutti."),
 (2,"chiaro",0,'Si usava la media dei rendimenti di un paniere di fondi pensione. Qualunque profilo avessi scelto, il tuo TFR cresceva come quello di tutti gli altri.'),
 (2,"chiaro",0,'In pratica, la scelta del profilo valeva solo per la tasca piccola, quella reale. La tasca grande restava uguale per tutti, senza eccezioni.'),
 (2,"chiaro",0,"Dal 2026 vale un criterio nuovo, che si chiama multicomparto. Il nome e' tecnico, ma l'idea che c'e' dietro e' molto semplice."),
 (2,"chiaro",0,"Il TFR figurativo viene rivalutato con il rendimento netto del profilo di investimento scelto da te. La manopola, finalmente, e' nelle tue mani."),
 (2,"chiaro",0,"E c'e' di piu': puoi persino collegarlo a un profilo diverso da quello della tasca reale. Due tasche, due scelte possibili."),
 (2,"chiaro",0,"L'INPS ha reso operativo il nuovo sistema nel luglio 2026, come ha comunicato con un messaggio e una notizia sul suo sito."),

 (3,"chiaro",0,"Perche' e' una novita' cosi' importante? Per capirlo, basta guardare le proporzioni tra le due tasche."),
 (3,"chiaro",0,"Prendiamo, per esempio, un iscritto assunto dopo il 2000, con trentamila euro di retribuzione utile, che versa l'uno per cento, e l'ente un altro uno per cento."),
 (3,"chiaro",0,"Nella tasca reale entrano seicento euro l'anno: trecento suoi e trecento dell'ente, investiti davvero."),
 (3,"chiaro",0,"Nella tasca figurativa, invece, entra il TFR: circa duemilasettanta euro l'anno. Piu' di tre volte tanto."),
 (3,"chiaro",0,"Il TFR, quindi, e' spesso la parte piu' grande di tutta la posizione. Quella che, alla fine, pesera' di piu'."),
 (3,"chiaro",0,"Pensa a trent'anni di carriera: la tasca figurativa accumula molte decine di migliaia di euro, ben piu' della tasca reale."),
 (3,"chiaro",0,"Fino al 2025, sul rendimento di questa parte non potevi influire in nessun modo. Ora si', ed e' una differenza enorme."),
 (3,"chiaro",0,"Ed e' la scelta che, nel tempo, puo' pesare di piu' su quanto riceverai. Proprio per questo non va lasciata al caso."),

 (4,"chiaro",0,"Che cosa si puo' fare, concretamente, con questa nuova liberta'? Vediamo tre esempi. Attenzione: sono esempi, non consigli."),
 (4,"chiaro",0,"Primo esempio: si puo' tenere tutto sullo stesso profilo, tasca reale e tasca figurativa. E' la scelta piu' semplice e piu' coerente."),
 (4,"chiaro",0,"Secondo esempio: si puo' tenere il TFR su un profilo piu' prudente, perche' lo si considera la liquidazione da proteggere."),
 (4,"chiaro",0,"Per esempio la tasca reale sul Bilanciato Crescita, e il TFR sul Garantito, il comparto piu' prudente."),
 (4,"chiaro",0,"Terzo esempio, al contrario: si puo' puntare sulla crescita proprio con il TFR. Per esempio la tasca reale sul Garantito, e il TFR sul Bilanciato Dinamico."),
 (4,"chiaro",0,"Perche' qualcuno dovrebbe farlo? Perche' il TFR ha davanti molti anni, e comunque non si puo' ritirare prima della fine del rapporto di lavoro."),
 (4,"chiaro",0,'Una regola, infatti, resta valida per tutti: il TFR figurativo arriva davvero al Fondo solo quando finisce il rapporto di lavoro.'),
 (4,"chiaro",0,"Per chi e' giovane, quindi, e' la parte con l'orizzonte piu' lungo di tutti. Ricordi la bussola della lezione sei punto due?"),

 (5,"chiaro",0,"E allora, dove si fa questa scelta? Nell'area riservata del sito del Fondo, nella sezione dedicata all'investimento."),
 (5,"chiaro",0,"C'e' una procedura guidata. Li' puoi vedere a quale profilo sono collegate la tasca reale e la tasca figurativa, e puoi modificarli."),
 (5,"chiaro",0,"Le regole per cambiare, con i tempi e i limiti, sono quelle che vedremo nella prossima lezione, l'ultima del modulo."),
 (5,"chiaro",0,"Poi e' la tua amministrazione a comunicare all'INPS il profilo scelto, nei flussi mensili. Tu non devi fare nulla con l'INPS."),
 (5,"chiaro",0,"Che tu scelga lo stesso profilo o uno diverso, quello che conta e' che sia una scelta consapevole, non un'abitudine."),
 (5,"chiaro",0,"Il primo passo, per tutti, e' semplicemente andare a vedere che cosa risulta oggi. Molti non lo hanno mai guardato."),

 (6,"profondo",1.2,'Dal 2026 anche il tuo TFR cresce secondo una tua scelta. Non lasciarla al caso.'),

 (7,"chiaro",0,"Le tre cose da ricordare. Uno: dal 2026 il TFR figurativo si rivaluta con il rendimento netto del profilo scelto, non piu' con un paniere uguale per tutti."),
 (7,"chiaro",0,'Due: puoi collegarlo a un profilo diverso da quello dei contributi. Due tasche, due scelte indipendenti.'),
 (7,"chiaro",0,"Tre: spesso il TFR e' la parte piu' grande della posizione. Quindi questa scelta pesa, e pesa a lungo."),
 (7,"chiaro",0,"La mossa di oggi: entra nell'area riservata, e verifica a quale profilo e' agganciato il tuo TFR virtuale."),
 (7,"chiaro",0,"Confrontalo con il profilo della tasca reale. Sono uguali o diversi? E' una scelta che hai fatto tu, o non lo sapevi?"),
 (7,"chiaro",0,"Poi rimettilo accanto ai due criteri della lezione sei punto due: gli anni che ti mancano, e la tua tranquillita' davanti a un calo."),
 (7,"chiaro",0,"Se qualcosa non ti torna, non cambiare d'impulso. Prenota prima una consulenza gratuita con il Fondo, e decidi con calma."),
 (7,"chiaro",0,'Ricorda: il corso non ti dice quale profilo scegliere. Ti spiega che adesso puoi sceglierlo anche per il TFR.'),
 (7,"chiaro",0,"Nella prossima lezione, l'ultima del modulo sei, vediamo come e quando si cambia profilo."),
 (7,"chiaro",0,'Parleremo dello switch, dei suoi tempi e dei suoi limiti, e del questionario che ti aiuta a decidere.'),
 (7,"chiaro",0,'[warm] Ci vediamo nella lezione sei punto sei.'),
]

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Apertura', 2: 'Le due tasche', 3: "Perche' conta", 4: 'Tre esempi', 5: 'Dove si fa', 6: 'Memo', 7: 'Chiusura'}
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
