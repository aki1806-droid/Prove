# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Questa lezione da' le basi di temi che hai gia' incontrato piu' volte: la trasfusione, gli anticoagulanti, le infezioni e la sepsi."),
 (1,"chiaro",0,"Vediamo com'e' fatto il sangue, come funzionano i gruppi sanguigni e la coagulazione, e come il corpo si difende con l'immunita' e l'infiammazione. Chiudiamo con una sintesi su apparato muscolo-scheletrico e cute."),

 (2,"chiaro",0,"Il sangue e' composto per circa il cinquantacinque per cento da plasma: acqua, proteine come albumina, globuline e fibrinogeno, poi elettroliti e nutrienti."),
 (2,"chiaro",0,"Il restante quarantacinque per cento circa sono gli elementi figurati, quasi tutti globuli rossi: la loro quota sul volume del sangue e' l'ematocrito. Trasportano ossigeno con l'emoglobina, e vivono circa centoventi giorni."),
 (2,"chiaro",0,"I globuli bianchi difendono l'organismo: neutrofili, linfociti, monociti, eosinofili, basofili. Li ritroveremo fra poco, parlando di immunita'."),
 (2,"chiaro",0,"Le piastrine partecipano all'emostasi e vivono circa da sette a dieci giorni: per questo l'effetto dell'aspirina, che le blocca in modo irreversibile, dura giorni. E tutti si formano nel midollo osseo, con l'emopoiesi."),

 (3,"chiaro",0,"I gruppi sanguigni AB zero. Il gruppo A ha l'antigene A sui globuli rossi, e anticorpi anti-B nel plasma. Il gruppo B, al contrario, ha l'antigene B e anticorpi anti-A."),
 (3,"chiaro",0,"Il gruppo AB ha entrambi gli antigeni, A e B, e nel plasma nessun anticorpo: per i globuli rossi e' il ricevente universale. E' il gruppo che puo' ricevere globuli rossi da tutti."),
 (3,"chiaro",0,"Il gruppo zero non ha antigeni e ha entrambi gli anticorpi: per i globuli rossi e' il donatore universale. Ed e' il sangue che si usa in emergenza, prima di conoscere il gruppo del paziente."),
 (3,"chiaro",0,"Per il plasma vale il contrario: il plasma AB, senza anticorpi, e' quello universale. Ecco perche' una trasfusione incompatibile e' cosi' pericolosa, come hai visto nella lezione sei punto sei."),

 (4,"chiaro",0,"Il fattore Rh. Si e' Rh positivi se sui globuli rossi e' presente l'antigene D, Rh negativi se manca. Una persona Rh negativa puo' sviluppare anticorpi anti-D dopo un'esposizione, per esempio una trasfusione o una gravidanza."),
 (4,"chiaro",0,"Per questo, quando una madre Rh negativa aspetta un figlio Rh positivo, si esegue una profilassi con immunoglobuline anti-D. Lo scopo e' proteggere le gravidanze successive."),

 (5,"chiaro",0,"L'emostasi procede in quattro fasi. Vascolare: il vaso lesionato si contrae. Piastrinica: le piastrine aderiscono e si aggregano, formando un tappo. E' la fase bloccata dall'acido acetilsalicilico e dagli antiaggreganti."),
 (5,"chiaro",0,"La fase coagulativa: una cascata di fattori porta alla formazione di trombina, che trasforma il fibrinogeno in fibrina. La fibrina e' la rete che rende stabile il coagulo."),
 (5,"chiaro",0,"Infine la fibrinolisi: la plasmina scioglie il coagulo quando non serve piu'. I frammenti che ne derivano sono il D-dimero, che si dosa nel sospetto di trombosi."),

 (6,"chiaro",0,"Gli esami e i farmaci. Il PT, espresso come INR, esplora la via estrinseca della coagulazione, e serve a monitorare il warfarin, che e' un antagonista della vitamina K."),
 (6,"chiaro",0,"L'aPTT esplora invece la via intrinseca, e serve a monitorare l'eparina non frazionata, che agisce potenziando l'antitrombina."),
 (6,"chiaro",0,"Le eparine a basso peso molecolare agiscono soprattutto sul fattore dieci attivato. I DOAC, gli anticoagulanti orali diretti, inibiscono direttamente il fattore dieci attivato oppure la trombina."),
 (6,"chiaro",0,"E gli antidoti: la vitamina K per il warfarin, la protamina per l'eparina, e antidoti specifici per alcuni DOAC. E' la base della lezione cinque punto cinque."),

 (7,"chiaro",0,"[thoughtful] Ora le difese. L'organismo si difende in due modi. L'immunita' innata e' la prima linea: rapida, non specifica, senza memoria. Agisce subito, contro qualunque aggressore."),
 (7,"chiaro",0,"Comprende le barriere: cute integra, mucose, secrezioni, acidita' dello stomaco, microbiota. Le cellule che fagocitano, neutrofili e macrofagi, e le cellule NK. E poi il complemento, l'infiammazione e la febbre."),
 (7,"chiaro",0,"Ogni ago, ogni catetere, ogni ferita interrompe una barriera. E' il fondamento di tutto il modulo quattro, sulla prevenzione delle infezioni."),

 (8,"chiaro",0,"L'immunita' adattativa, invece, e' specifica e ha memoria. I linfociti B si trasformano in plasmacellule, e producono anticorpi: e' l'immunita' umorale."),
 (8,"chiaro",0,"I linfociti T costituiscono l'immunita' cellulare. Sono di due tipi principali: gli helper, chiamati CD quattro, e i citotossici, chiamati CD otto."),
 (8,"chiaro",0,"Le immunoglobuline. Le G sono le piu' abbondanti, attraversano la placenta e proteggono il neonato. Le M sono quelle che compaiono per prime in un'infezione."),
 (8,"chiaro",0,"Le A si trovano nelle mucose e nel latte materno: ricordi il colostro della lezione undici punto quattro. E le E sono coinvolte nelle allergie e nella difesa dai parassiti."),

 (9,"chiaro",0,"Immunita' attiva e passiva. Nell'immunita' attiva e' l'organismo a produrre gli anticorpi, con una memoria duratura: in modo naturale dopo un'infezione, in modo artificiale con un vaccino."),
 (9,"chiaro",0,"Nell'immunita' passiva si ricevono anticorpi gia' pronti, con una protezione immediata ma temporanea: in modo naturale dalla madre, in modo artificiale con le immunoglobuline o i sieri."),
 (9,"chiaro",0,"Le due si possono combinare. E' cio' che si fa dopo un'esposizione a rischio di epatite B in una persona non vaccinata: vaccino piu' immunoglobuline, come nella lezione quattro punto otto."),

 (10,"chiaro",0,"I vaccini. Quelli vivi attenuati, come il vaccino contro morbillo, parotite e rosolia, o quello contro la varicella, sono controindicati in gravidanza e nelle immunodepressioni gravi."),
 (10,"chiaro",0,"Poi ci sono i vaccini inattivati, quelli a subunita' e le anatossine, come il tetano, e i vaccini a RNA messaggero. Tutti, senza eccezioni, richiedono il rispetto della catena del freddo."),
 (10,"chiaro",0,"Le reazioni piu' comuni sono locali, o la febbre. Raramente l'anafilassi: per questo dopo la vaccinazione si resta in osservazione per un breve periodo, con il materiale per l'emergenza disponibile."),

 (11,"chiaro",0,"L'infiammazione ha cinque segni cardinali, con i nomi latini. Rubor, l'arrossamento. Calor, il calore. Tumor, il gonfiore. Dolor, il dolore. E functio laesa, la perdita di funzione."),
 (11,"chiaro",0,"La febbre nasce quando sostanze chiamate pirogeni alzano il set-point del termostato ipotalamico. Ha tre fasi, e ciascuna chiede interventi diversi."),
 (11,"chiaro",0,"Nella salita la persona ha brividi e cute fredda, perche' il corpo insegue la nuova temperatura: si copre. All'acme la temperatura e' stabile, alta ma ferma."),
 (11,"chiaro",0,"Nella defervescenza la persona suda: si scopre, si cambia la biancheria e si idrata. E nella sepsi, come hai visto nella lezione dieci punto sei, questa risposta diventa disregolata."),

 (12,"chiaro",0,"Una sintesi sull'apparato muscolo-scheletrico. Le ossa sostengono, proteggono, fanno da deposito di calcio e ospitano l'emopoiesi. Con le ossa lavorano le articolazioni e i muscoli scheletrici."),
 (12,"chiaro",0,"L'osteoporosi rende le ossa fragili. E spiega perche' una caduta nell'anziano porta cosi' spesso a una frattura: del femore, del polso, o delle vertebre."),
 (12,"chiaro",0,"La cute ha tre strati: epidermide, derma, ipoderma. Funzioni: barriera, termoregolazione, sensibilita', vitamina D. Nell'anziano e' piu' sottile, meno elastica, guarisce piu' lentamente: le basi del modulo sette."),

 (13,"chiaro",0,"[curious] Il caso d'esame. Paziente con febbre a trentanove gradi: prima tremava e chiedeva coperte, ora e' sudato. Che cosa fai, in ciascuna fase?"),
 (13,"chiaro",0,"Nella fase di salita, con i brividi, lo copri. E se prescritto prepari le emocolture, che si prelevano all'insorgenza del brivido o al rialzo febbrile, e prima dell'antibiotico."),
 (13,"chiaro",0,"Nella defervescenza lo scopri gradualmente, cambi la biancheria, lo idrati, e sorvegli la pressione, perche' la vasodilatazione puo' causare ipotensione. Antipiretico secondo prescrizione, e valutazione della causa."),

 (14,"chiaro",0,"Il collegamento con l'assistenza. La trasfusione e la compatibilita'. INR, aPTT e anticoagulanti. La profilassi anti-D. Le barriere e le infezioni. Le vaccinazioni degli operatori. La febbre. Le cadute e l'osteoporosi."),

 (15,"chiaro",0,"La tabella. Plasma ed elementi figurati. Globuli rossi centoventi giorni, piastrine da sette a dieci. Zero donatore universale di globuli rossi, AB ricevente universale; per il plasma il contrario. Rh e anti-D."),
 (15,"chiaro",0,"Le fasi dell'emostasi. INR per il warfarin, aPTT per l'eparina. Immunita' innata e adattativa, immunoglobuline, attiva e passiva. Vaccini vivi, non in gravidanza. Febbre: copri in salita, scopri in defervescenza."),

 (16,"profondo",1.2,"[serious] La frase della lezione: ogni barriera che interrompi e' una porta che devi sorvegliare. Un ago, un catetere, una ferita: l'immunita' innata comincia li'."),

 (17,"chiaro",0,"[warm] Nella prossima lezione: la semeiotica, cioe' come si esamina un paziente, e i principali esami di laboratorio, con i loro valori di riferimento."),
 (17,"chiaro",0,"E poi la diagnostica per immagini, con la sicurezza in risonanza e i mezzi di contrasto. A tra poco."),
]
CAPITOLI = {1:"Apertura",2:"La composizione del sangue",3:"I gruppi sanguigni AB0",4:"Il fattore Rh",5:"L'emostasi",
 6:"Coagulazione, esami e farmaci",7:"L'immunita' innata",8:"L'immunita' adattativa",9:"Immunita' attiva e passiva",10:"I vaccini",
 11:"L'infiammazione e la febbre",12:"Muscolo-scheletrico e cute",13:"Il caso d'esame",14:"Il collegamento con l'assistenza",
 15:"La tabella",16:"La frase della lezione",17:"Chiusura"}

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
