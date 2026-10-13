# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,'[warm] Una chiave che entra nella serratura. Una porta che si apre su una stanza ordinata, con i cassetti etichettati uno per uno.'),
 (1,"chiaro",0,"In questo corso ti abbiamo chiesto piu' volte di entrare nell'area riservata. Per controllare, per aggiornare, per scegliere."),
 (1,"chiaro",0,"E' arrivato il momento di fare un giro completo, stanza per stanza, cassetto per cassetto. Ed e' anche il primo passo dell'ultimo modulo."),
 (1,"chiaro",0,"L'area riservata e' il cruscotto della tua posizione. Li' vedi quanto hai, dove e' investito, e chi e' designato a riceverlo."),
 (1,"chiaro",0,'E puoi fare quasi tutte le operazioni da solo, da casa, senza moduli di carta e senza appuntamenti.'),
 (1,"chiaro",0,"Le credenziali per entrare arrivano con la lettera di conferma dell'iscrizione al Fondo. Se le hai perse, si possono recuperare dal sito."),

 (2,"chiaro",0,'Ecco la cassettiera. Sono otto cassetti, e ognuno ha la sua etichetta, con il nome che trovi anche sul sito. Apriamoli uno alla volta.'),
 (2,"chiaro",0,'Primo cassetto: Anagrafica. Qui aggiorni email e cellulare, da cui arrivano tutti gli avvisi del Fondo.'),
 (2,"chiaro",0,'Ricordi la lezione nove punto quattro? Recapiti vecchi significano avvisi persi, proprio quando servono.'),
 (2,"chiaro",0,"Secondo cassetto: Contribuzione. Qui vedi i versamenti fatti, mese per mese, e modifichi la tua aliquota, una volta l'anno."),
 (2,"chiaro",0,"Sempre qui fai i versamenti volontari, e comunichi i contributi non dedotti, come hai visto nella lezione cinque punto quattro. E' il cassetto dei soldi che entrano."),
 (2,"chiaro",0,'Terzo cassetto: Investimento. Qui controlli e cambi il profilo, sia per la tasca reale sia per il TFR virtuale.'),
 (2,"chiaro",0,'Quarto cassetto: Soggetti designati. Qui indichi chi riceve la posizione in mancanza di coniuge, figli e genitori a carico.'),
 (2,"chiaro",0,'Quinto cassetto: Documentazione. Qui trovi il prospetto annuale, e gli altri documenti che il Fondo ti mette a disposizione nel tempo.'),
 (2,"chiaro",0,'E poi ci sono tre cassetti per le operazioni. Il sesto: Anticipi, per le anticipazioni che hai visto nel modulo otto.'),
 (2,"chiaro",0,"Il settimo: Riscatti. Ed e' proprio qui che si carica anche la domanda di pensione complementare, come abbiamo visto nella lezione nove punto cinque."),
 (2,"chiaro",0,"L'ottavo: Trasferimenti, per spostare la posizione verso un altro fondo, o per portarne una dentro Perseo Sirio."),

 (3,"chiaro",0,"Ora mettiamo insieme le mosse. Durante il corso, ogni lezione si e' chiusa con una mossa di oggi."),
 (3,"chiaro",0,"Quasi tutte si fanno proprio nell'area riservata. Questa tabella le riassume, con il cassetto in cui si trovano e la lezione in cui ne abbiamo parlato."),
 (3,"chiaro",0,'Trova il prospetto annuale: cassetto Documentazione. Controlla il profilo e il TFR virtuale: cassetto Investimento.'),
 (3,"chiaro",0,'Designa i beneficiari: cassetto Soggetti designati. Cambia la tua aliquota: cassetto Contribuzione.'),
 (3,"chiaro",0,"Aggiorna i recapiti: cassetto Anagrafica. Ecco fatto: sei mosse, cinque cassetti, e nessuna difficolta' particolare."),
 (3,"chiaro",0,"Puoi fermare il video e fotografare la tabella con il telefono. Ti servira' come promemoria, la sera in cui deciderai di farle."),
 (3,"chiaro",0,"Se le fai tutte, una volta sola, la tua posizione sara' in ordine. Sai quanto hai, e in che profilo sei."),
 (3,"chiaro",0,"Sai a che cosa e' collegato il tuo TFR, chi riceverebbe la posizione, e come il Fondo puo' contattarti."),
 (3,"chiaro",0,"E ci vuole meno tempo di quanto pensi. Mezz'ora, una sera, magari con una tazza di te' accanto."),

 (4,"chiaro",0,"Il documento piu' importante di tutta l'area riservata e' il prospetto annuale. Lo abbiamo gia' incontrato nel modulo due; ripassiamolo in trenta secondi."),
 (4,"chiaro",0,"Riga per riga. Ci sono i contributi versati da te, trattenuti in busta paga, e quelli versati dall'ente, l'uno per cento."),
 (4,"chiaro",0,"Ci sono le quote figurative, cioe' il TFR e il TFS virtuali contabilizzati dall'INPS: la tasca figurativa che conosci dal modulo due."),
 (4,"chiaro",0,"Poi c'e' il risultato della gestione, cioe' quanto hanno reso gli investimenti nell'anno. E infine la posizione complessiva."),
 (4,"chiaro",0,"Un consiglio pratico: confrontalo ogni anno con quello dell'anno precedente, mettendo i due prospetti uno accanto all'altro sul tavolo."),
 (4,"chiaro",0,'La posizione dovrebbe crescere almeno di quanto hai versato, salvo gli anni in cui i mercati sono negativi.'),
 (4,"chiaro",0,"Se qualcosa non torna, per esempio un versamento che manca, e' il momento giusto per chiedere: al Fondo, o al tuo ufficio del personale."),

 (5,"chiaro",0,"Un'abitudine da costruire, allora. Una volta l'anno, quando arriva il prospetto, un appuntamento con te stesso."),
 (5,"chiaro",0,"Dieci minuti, non di piu'. Cassetto Documentazione per il prospetto, poi Investimento per il profilo, poi Soggetti designati. Nient'altro."),
 (5,"chiaro",0,"E' tutta la manutenzione di cui ha bisogno la tua pensione complementare. Poco tempo, ma con regolarita', come il tagliando dell'auto."),

 (6,"profondo",1.2,"Mezz'ora per mettere in ordine. Dieci minuti l'anno per tenerla in ordine."),

 (7,"chiaro",0,"Le tre cose da ricordare. Uno: nell'area riservata trovi tutte le informazioni e le operazioni sulla tua posizione."),
 (7,"chiaro",0,'Otto cassetti, tutto online, a qualsiasi ora del giorno, senza bisogno di appuntamenti.'),
 (7,"chiaro",0,"Due: il prospetto annuale e' il documento da leggere ogni anno, con calma, confrontandolo con quello dell'anno precedente."),
 (7,"chiaro",0,'Tre: una manutenzione annuale di dieci minuti basta per tenere tutto in ordine, anno dopo anno, fino alla pensione.'),
 (7,"chiaro",0,'La mossa di oggi: riprendi la tabella di questa lezione, e completa tutte le mosse in una sola sessione.'),
 (7,"chiaro",0,"Una sera, mezz'ora, sei mosse. E la tua posizione e' finalmente in ordine, magari per la prima volta da quando hai aderito."),
 (7,"chiaro",0,"Nella prossima lezione facciamo un passo in piu': dal presente della posizione, guardiamo avanti, verso il futuro."),
 (7,"chiaro",0,'Come stimare quanto riceverai, il giorno della pensione? Con il simulatore del Fondo, e con la proiezione chiamata la mia pensione complementare.'),
 (7,"chiaro",0,'Vedremo come si usano, e soprattutto come si leggono con la giusta prudenza, senza prendere quei numeri per promesse.'),
 (7,"chiaro",0,'[warm] Il simulatore e la proiezione. Ci vediamo nella lezione dieci punto due.'),
]

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Apertura', 2: 'Otto cassetti', 3: 'Le mosse del corso', 4: 'Il prospetto annuale', 5: "Un'abitudine", 6: 'Memo', 7: 'Chiusura'}
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
