# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Anna ha cinquantaquattro anni. Fa l'operatrice socio sanitaria, e lavora nella sanita' pubblica dal 1996, a tempo indeterminato."),
 (1,"chiaro",0,"Rifa' un letto con gesti sicuri, e spiega a una collega piu' giovane come si fa. Sono quasi trent'anni di turni, di reparti, di persone."),
 (1,"chiaro",0,"Del fondo pensione ha sempre sentito parlare, ma non ha mai aderito. Ci ha pensato qualche volta, poi c'era sempre altro da fare."),
 (1,"chiaro",0,"Ora una collega le ha detto che c'e' tempo fino al 2030. E Anna, a casa, davanti a un vecchio cedolino, si chiede se ne valga ancora la pena."),
 (1,"chiaro",0,"La sua e' la scelta piu' delicata di tutto il corso. Perche' per lei aderire significa anche lasciare il TFS, e passare al TFR."),
 (1,"chiaro",0,"Ricorda: Anna e i suoi numeri sono inventati. E' un caso illustrativo, con un esempio semplificato. Non e' una previsione, ma un ordine di grandezza."),

 (2,"chiaro",0,"Partiamo dalla sua situazione. Anna e' stata assunta prima del 2001, quindi e' in TFS: l'indennita' premio di servizio della sanita'."),
 (2,"chiaro",0,"Ricordi il binario della lezione due punto quattro? Il treno di Anna corre sul binario del TFS dal 1996. E davanti c'e' uno scambio."),
 (2,"chiaro",0,'Se aderisce, aziona lo scambio, e passa al TFR in modo irrevocabile. Non si torna indietro.'),
 (2,"chiaro",0,"Ma che cosa succede ai suoi trent'anni di servizio? E' la paura di molti, ed e' una paura che merita una risposta precisa."),
 (2,"chiaro",0,"Il TFS maturato fino al giorno dell'adesione viene calcolato con le vecchie regole. Viene fotografato, come un vagone che resta agganciato al treno."),
 (2,"chiaro",0,"Da li' in poi viene rivalutato come il TFR. E conserva anche il trattamento fiscale di favore del TFS."),
 (2,"chiaro",0,"Quello che cambia e' solo il modo in cui si formano gli anni futuri, da oggi alla pensione. Il passato resta al sicuro."),
 (2,"chiaro",0,"L'opzione e' possibile fino al trentuno dicembre 2030. Ma attenzione: ogni anno di attesa e' un anno di contributi, e di uno virgola cinque, in meno."),

 (3,"chiaro",0,"Ora i numeri. Anna ha una retribuzione utile di ventisettemila euro l'anno."),
 (3,"chiaro",0,'Aderendo, ogni anno entrerebbero nella sua posizione duecentosettanta euro suoi, il suo uno per cento, trattenuti in busta paga.'),
 (3,"chiaro",0,"Altri duecentosettanta euro li verserebbe l'ente, con il suo uno per cento. Soldi che oggi Anna non riceve."),
 (3,"chiaro",0,"Poi cinquecentoquaranta euro di TFR, cioe' il due per cento della retribuzione utile, nella tasca figurativa."),
 (3,"chiaro",0,"E trecentoventiquattro euro di accantonamento aggiuntivo: l'uno virgola cinque per cento, calcolato su ventunomilaseicento euro."),
 (3,"chiaro",0,"In tutto, circa millequattrocento euro l'anno verso la sua pensione complementare. Piu' del cinque per cento della sua retribuzione utile."),
 (3,"chiaro",0,'Fino a sessantasette anni ne mancano tredici. Sono circa diciottomiladuecento euro versati, senza contare gli aumenti di stipendio.'),
 (3,"chiaro",0,"Con un rendimento netto del due o tre per cento, diventerebbero circa ventuno o ventiduemila euro. E di tutto questo, solo duecentosettanta euro l'anno escono dalla sua busta paga."),

 (4,"chiaro",0,'Mettiamo tutto sulla bilancia, quella della lezione due punto quattro, ma questa volta con i pesi di Anna.'),
 (4,"chiaro",0,"Sul primo piatto, quello che guadagna. In tredici anni, circa tremilacinquecento euro di contributo dell'ente."),
 (4,"chiaro",0,"E oltre quattromila euro di accantonamento aggiuntivo, che senza aderire non avrebbe. Piu' la deduzione fiscale dei suoi contributi."),
 (4,"chiaro",0,"Sull'altro piatto, quello che deve valutare. Qui ci sono due domande, e solo Anna conosce le risposte."),
 (4,"chiaro",0,'Prima domanda: Anna si aspetta un aumento importante negli ultimi anni di lavoro? Per esempio, una progressione verticale.'),
 (4,"chiaro",0,"Se si', il TFS l'avrebbe premiata sugli anni futuri. E quel vantaggio va pesato con attenzione, numeri alla mano."),
 (4,"chiaro",0,"Seconda domanda: gli anni che mancano. Con tredici anni di iscrizione, dal 2027 Anna non potra' chiedere la pensione complementare di anzianita', che ne richiede quindici."),
 (4,"chiaro",0,"Potra' pero' chiederla a sessantasette anni, per vecchiaia, come hai visto nella lezione nove punto uno."),
 (4,"chiaro",0,"E con meno di quindici anni di partecipazione, sulla prestazione paghera' il quindici per cento. La scala non fara' in tempo a scendere."),

 (5,"chiaro",0,'Che cosa dovrebbe fare Anna, allora? Non decidere da sola, e non decidere in fretta.'),
 (5,"chiaro",0,"Dovrebbe farsi fare una simulazione personalizzata. Con la sua retribuzione, la sua anzianita', e la sua prospettiva di carriera."),
 (5,"chiaro",0,"Puo' chiederla al Fondo, con la consulenza gratuita. Oppure al patronato, o allo sportello sindacale."),
 (5,"chiaro",0,'Seduta di fronte a una delegata, con un foglio davanti e una riga sottolineata. Le sue cifre, non quelle di un esempio.'),
 (5,"chiaro",0,"E' una scelta irrevocabile. Merita un'ora di calcoli veri, non il consiglio di una collega in pausa caffe'."),
 (5,"chiaro",0,"Qualunque sia la risposta, aderire o restare nel TFS, sara' una scelta fatta con i suoi numeri."),

 (6,"profondo",1.2,"Per chi e' in TFS, la scelta e' per sempre. I conti vanno fatti prima."),

 (7,"chiaro",0,'Le tre cose da ricordare dalla storia di Anna, che valgono per tutti quelli che sono ancora in TFS.'),
 (7,"chiaro",0,"Uno: chi e' in TFS puo' ancora optare per il TFR e aderire al Fondo, fino al trentuno dicembre 2030."),
 (7,"chiaro",0,"Due: il TFS gia' maturato non si perde. Viene fotografato con le vecchie regole, e poi rivalutato come il TFR."),
 (7,"chiaro",0,'Tre: la scelta dipende dalla carriera attesa e dagli anni che mancano. E va fatta con una simulazione personalizzata.'),
 (7,"chiaro",0,"La mossa di oggi: se sei in TFS, prenota la consulenza del Fondo, oppure passa dallo sportello sindacale. Porta con te l'ultimo cedolino."),
 (7,"chiaro",0,"Nella prossima lezione cambiamo ancora storia. Marco ha ventisei anni, e fa il tecnico di radiologia in un'azienda sanitaria."),
 (7,"chiaro",0,'Ha un contratto a tempo determinato di dodici mesi. E si chiede che senso abbia aderire, se tra un anno potrebbe essere altrove.'),
 (7,"chiaro",0,"Vedremo se puo' aderire, quando conviene firmare, e che cosa succede alla sua posizione quando il contratto finisce."),
 (7,"chiaro",0,'[warm] Il tecnico a tempo determinato. Ci vediamo nella lezione dieci punto cinque.'),
]

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Apertura', 2: 'Lo scambio', 3: 'I numeri di Anna', 4: 'La bilancia di Anna', 5: 'Che cosa dovrebbe fare', 6: 'Memo', 7: 'Chiusura'}
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
