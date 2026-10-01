# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] I liquidi endovenosi sono farmaci. Hanno indicazioni, dosi, effetti avversi e controindicazioni, e richiedono una prescrizione."),
 (1,"chiaro",0,"L'abitudine di considerare la flebo di fisiologica un gesto neutro e' all'origine di molti sovraccarichi e squilibri: sodio in eccesso, acqua libera dove non serve."),
 (1,"chiaro",0,"In questa lezione riprendiamo le soluzioni della lezione tre punto cinque e aggiungiamo i dispositivi: pompe, elastomeri, allarmi. E chiudiamo con un caso che i concorsi amano: il sovraccarico."),

 (2,"chiaro",0,"La fluidoterapia ha tre scopi, e conviene sempre chiedersi quale si sta perseguendo."),
 (2,"chiaro",0,"Rianimazione: ripristinare rapidamente un volume circolante perso, come in uno shock."),
 (2,"chiaro",0,"Mantenimento: coprire i fabbisogni di chi non puo' bere, circa venticinque-trenta millilitri per chilo al giorno: per settanta chili, circa due litri."),
 (2,"chiaro",0,"Sostituzione: reintegrare perdite in corso, come vomito, drenaggi, diarrea, fistole, misurate nel bilancio idrico della lezione tre punto cinque."),
 (2,"chiaro",0,"Un'infusione di mantenimento che prosegue per giorni senza che nessuno la rivaluti e' una delle cause piu' comuni di sovraccarico."),

 (3,"chiaro",0,"I cristalloidi, soluzioni di acqua con elettroliti o glucosio. Isotonici: la fisiologica allo zero virgola nove per cento, che in grandi volumi, per il suo alto contenuto di cloro, puo' causare acidosi ipercloremica."),
 (3,"chiaro",0,"E le soluzioni bilanciate, come il Ringer lattato, con una composizione piu' vicina al plasma: meno cloro, e un tampone al posto di una parte del cloro."),
 (3,"chiaro",0,"Ipotonici: la glucosata al cinque per cento, che una volta metabolizzato il glucosio si comporta come acqua libera, e la fisiologica allo zero virgola quarantacinque."),
 (3,"chiaro",0,"Ipertonici: fisiologica al tre per cento, glucosate concentrate, bicarbonato: richiamano acqua nei vasi, e per questo si danno solo su prescrizione specifica e con monitoraggio stretto."),

 (4,"chiaro",0,"Due regole da sapere. La glucosata al cinque per cento non espande il volume circolante: si distribuisce in tutti i compartimenti, e solo una piccola parte resta nei vasi."),
 (4,"chiaro",0,"E le soluzioni ipotoniche sono controindicate nel trauma cranico e nell'ipertensione endocranica: l'acqua libera entra nelle cellule cerebrali e peggiora l'edema. E' una domanda d'esame e un errore reale."),

 (5,"chiaro",0,"I colloidi contengono molecole grandi che restano piu' a lungo nei vasi. L'albumina ha indicazioni specifiche, come la paracentesi evacuativa nel paziente cirrotico, che vedremo nel modulo otto."),
 (5,"chiaro",0,"Esistono le gelatine. Gli amidi idrossietilici sono stati fortemente limitati dalle autorita' regolatorie europee per il rischio di danno renale e di aumento della mortalita' nei pazienti critici."),
 (5,"chiaro",0,"Nella pratica attuale, per la maggior parte delle situazioni, si preferiscono i cristalloidi, e i colloidi restano per indicazioni selezionate."),

 (6,"chiaro",0,"Il monitoraggio di una persona in fluidoterapia. Parametri vitali, diuresi e bilancio idrico, peso, stato di coscienza: gli stessi strumenti della lezione tre punto cinque, letti ogni giorno."),
 (6,"chiaro",0,"I segni di sovraccarico, soprattutto nell'anziano e nel cardiopatico: dispnea, rantoli alle basi, edemi, turgore delle giugulari, aumento di peso. Un chilo in piu' in un giorno e' un litro di liquidi."),
 (6,"chiaro",0,"Elettroliti e glicemia, specie con le glucosate, che nel diabetico alzano la glicemia. E naturalmente la sede di accesso, come nella lezione sei punto uno."),

 (7,"chiaro",0,"Le infusioni a caduta, regolate con la rotella del deflussore o con un regolatore di precisione. Sono semplici, non hanno bisogno di corrente, ma sono imprecise."),
 (7,"chiaro",0,"La velocita' cambia con l'altezza della sacca, la posizione del braccio, la pervieta' della cannula. Per questo non si usano per i farmaci ad alto rischio, e vanno controllate spesso."),
 (7,"chiaro",0,"Il calcolo delle gocce l'abbiamo visto nella lezione cinque punto tre: volume per fattore del deflussore, diviso i minuti; e la velocita' va ricontrollata ogni volta che si passa dal letto."),

 (8,"chiaro",0,"Le pompe volumetriche. Si impostano velocita' in millilitri all'ora e volume da infondere, e la pompa conta cio' che ha infuso. Gli allarmi: occlusione a monte o a valle, aria in linea, fine infusione, batteria."),
 (8,"profondo",1.2,"[serious] La regola: un allarme non si silenzia senza capirne la causa, e non si disattiva mai."),
 (8,"chiaro",0,"Le pompe hanno un sistema anti-flusso libero, che impedisce all'infusione di scorrere senza controllo quando il set viene rimosso dalla pompa: senza quel sistema, la sacca scorrerebbe a caduta libera."),
 (8,"chiaro",0,"E le pompe cosiddette intelligenti contengono librerie di farmaci con limiti di dose: se si imposta una velocita' fuori range, la pompa avvisa. E' una barriera di sicurezza nel senso di Reason."),

 (9,"chiaro",0,"Le pompe a siringa gestiscono piccoli volumi con alta precisione, e si usano per farmaci ad alto rischio a flusso basso, come in area critica e in pediatria, dove un millilitro in piu' e' una dose in piu'."),
 (9,"chiaro",0,"Due attenzioni. L'altezza della pompa rispetto al paziente: una siringa posizionata molto in alto e non ben fissata puo' dare un effetto sifone, con un bolo involontario."),
 (9,"chiaro",0,"E il cambio siringa dei farmaci salvavita, come la noradrenalina, va organizzato in modo da non interrompere l'infusione: anche pochi minuti di sospensione possono provocare un crollo pressorio."),

 (10,"chiaro",0,"Gli elastomeri: un palloncino elastico che spinge il farmaco a un flusso prefissato, senza elettricita'. Si usano per analgesia, chemioterapia, antibiotici, anche a domicilio, dove la persona lo porta con se'."),
 (10,"chiaro",0,"Due cose da sapere. Il flusso varia con la temperatura: il calore lo accelera, il freddo lo rallenta; per questo l'elastomero si tiene secondo le indicazioni del produttore, non vicino a fonti di calore."),
 (10,"chiaro",0,"E l'unico modo di controllarne il funzionamento e' verificare la riduzione progressiva del volume nel tempo previsto. Non si apre, non si comprime."),

 (11,"chiaro",0,"Regole comuni a tutti i dispositivi. Verificare prescrizione, soluzione, velocita' e volume: le sette G della lezione cinque punto quattro valgono anche per una flebo. Etichettare le linee, soprattutto quando sono molte."),
 (11,"chiaro",0,"Tracciare ogni linea con il dito dalla sacca al paziente a ogni consegna: e' il modo per accorgersi di una linea collegata alla via sbagliata."),
 (11,"chiaro",0,"Non aggiungere farmaci alle sacche se non previsto dalla procedura. E verificare la compatibilita', come nella lezione cinque punto sette."),

 (12,"chiaro",0,"Il caso. Anziano cardiopatico, da tre giorni in fisiologica a cento millilitri all'ora di mantenimento; stanotte dispnoico, con rantoli alle basi e due chili in piu'. Che cosa pensi? Sovraccarico di liquidi."),
 (12,"chiaro",0,"Che cosa fai? Riduci l'infusione al minimo per mantenere la via pervia, metti la persona seduta, ossigeno secondo protocollo, rilevi parametri e saturazione, avvisi subito il medico. Poi bilancio, peso, diuresi."),
 (12,"profondo",1.2,"[serious] E la domanda di fondo: chi aveva rivalutato quell'infusione negli ultimi tre giorni?"),

 (13,"chiaro",0,"Nell'anziano e nel cardiopatico la fluidoterapia va gestita con volumi e velocita' piu' bassi, con una rivalutazione quotidiana della prescrizione, e con il passaggio alla via orale appena possibile."),
 (13,"chiaro",0,"La regola vale come per i dispositivi: ogni giorno, serve ancora? Una flebo rivalutata ogni giorno e' una flebo che si toglie in tempo."),

 (14,"chiaro",0,"Nelle aziende venete si stanno diffondendo pompe con librerie di farmaci, e la gestione delle infusioni e' regolata da procedure aziendali."),
 (14,"chiaro",0,"Gli elastomeri sono usati anche nei percorsi di continuita' ospedale-territorio, per esempio per terapie antibiotiche o analgesiche domiciliari con presa in carico in ADI."),

 (15,"chiaro",0,"La tabella. Fisiologica zero virgola nove: isotonica, in grandi volumi acidosi ipercloremica. Bilanciate: isotoniche, piu' vicine al plasma."),
 (15,"chiaro",0,"Glucosata cinque: ipotonica, non espande il volume, no nel trauma cranico. Colloidi: indicazioni selezionate. Ipertoniche: solo su prescrizione specifica, con monitoraggio stretto."),

 (16,"chiaro",0,"Ricapitoliamo. I liquidi sono farmaci. Tre scopi: rianimazione, mantenimento, sostituzione. Sorvegliare il sovraccarico. Mai silenziare un allarme senza capirne la causa."),
 (16,"chiaro",0,"Nell'elastomero il calore accelera il flusso. Tracciare le linee a ogni consegna, dalla sacca al paziente. E nell'anziano e nel cardiopatico: volumi e velocita' piu' bassi, rivalutazione quotidiana."),
 (16,"chiaro",0,"[warm] Nella prossima lezione: l'emogasanalisi, che spaventa molti candidati e che con un metodo in quattro passi diventa semplice. A tra poco."),
]

CAPITOLI = {1:"Apertura",2:"Le tre indicazioni",3:"I cristalloidi",4:"Due regole sulle ipotoniche",5:"I colloidi",
 6:"Il monitoraggio",7:"Le infusioni a caduta",8:"Le pompe volumetriche",9:"Le pompe a siringa",10:"Gli elastomeri",
 11:"Le regole comuni",12:"Il caso",13:"Anziano e cardiopatico",14:"In Veneto",15:"La tabella",16:"Chiusura"}

# Deroghe al limite di 225 caratteri, dichiarate una per una con il motivo:
# la voce e' gia' generata e non ha fatto pausa dove il copione staccava, e il
# confine si mette dove la voce si ferma, non dove il copione vorrebbe.
DEROGHE = {}
ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CPS = 17.0   # misurata su 1.2, confermata da 1.3 a 1.8

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
    if len(b["text"])>225 and b["id"] not in DEROGHE: errori.append(f'{b["id"]}: {len(b["text"])} car, blocco troppo lungo')
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
