# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Lezione tecnica, e quindi densa di dettagli che i quiz chiedono in modo preciso: angoli, aghi, sedi, volumi. Ma prima dei dettagli, un principio."),
 (1,"chiaro",0,"La via di somministrazione non e' intercambiabile. Cambia la rapidita' d'azione, la biodisponibilita', il rischio: la stessa dose per bocca o in vena sono due cose diverse."),
 (1,"profondo",1.2,"[serious] Somministrare per una via diversa da quella prescritta e' un errore in terapia, anche se il farmaco e la dose sono giusti."),

 (2,"chiaro",0,"La via orale: la piu' usata, la piu' sicura, la piu' economica. La persona va posta seduta o semiseduta, il farmaco si assume con un bicchiere d'acqua, mai sdraiati."),
 (2,"chiaro",0,"Se c'e' un dubbio sulla deglutizione vale la regola della lezione tre punto tre. Le forme a rilascio modificato e gastroresistenti non si frantumano ne' si aprono, come prevede la Raccomandazione diciannove."),
 (2,"chiaro",0,"E un dettaglio di responsabilita': l'infermiere verifica che il farmaco sia stato assunto. Una compressa lasciata sul comodino non e' una terapia somministrata, e in cartella non si puo' firmare."),

 (3,"chiaro",0,"La via sublinguale, e la buccale: il farmaco si scioglie sotto la lingua o contro la guancia e passa direttamente nel sangue attraverso la mucosa, evitando il primo passaggio nel fegato. L'effetto e' rapido, in pochi minuti."),
 (3,"chiaro",0,"L'esempio classico e' la nitroglicerina nel dolore anginoso. Si istruisce la persona a non deglutire, non masticare e non bere finche' il farmaco non si e' sciolto."),

 (4,"chiaro",0,"La via sottocutanea. Il farmaco va nel tessuto sotto la cute, dove l'assorbimento e' lento e continuo. Si usano volumi piccoli, indicativamente fino a uno-due millilitri."),
 (4,"chiaro",0,"Aghi sottili, venticinque-ventisette gauge, e corti, fra quattro e otto millimetri; per le penne da insulina oggi si usano aghi da quattro-sei millimetri."),
 (4,"chiaro",0,"L'angolo e' di novanta gradi; si scende a quarantacinque nella persona molto magra o con un ago piu' lungo, per non arrivare nel muscolo, dove l'assorbimento sarebbe diverso."),

 (5,"chiaro",0,"Le sedi: addome, mantenendo una distanza dall'ombelico, cosce anteriori e laterali, faccia posteriore delle braccia, glutei. E la regola che vale soprattutto per l'insulina: la rotazione delle sedi."),
 (5,"chiaro",0,"Iniettare sempre nello stesso punto provoca lipodistrofia, ispessimenti del tessuto in cui l'assorbimento diventa irregolare: una causa frequente e sottovalutata di glicemie instabili."),
 (5,"chiaro",0,"L'ispezione delle sedi di iniezione fa parte dell'assistenza al diabetico: si guarda e si palpa l'addome, non si chiede soltanto dove si fa l'insulina. Una lipodistrofia si sente sotto le dita prima che si veda."),

 (6,"chiaro",0,"L'eparina a basso peso molecolare per via sottocutanea ha regole sue, chieste spessissimo. Di norma nell'addome. Si mantiene il pizzico cutaneo per tutta l'iniezione."),
 (6,"chiaro",0,"Non si aspira e non si massaggia la sede, perche' entrambe le manovre favoriscono l'ematoma. Nelle siringhe preriempite non si espelle la bolla d'aria."),
 (6,"chiaro",0,"La bolla serve a spingere fuori tutto il farmaco e a chiudere il tramite. Iniezione lenta. Quattro regole, e nei quiz la domanda e' quasi sempre su una delle quattro."),

 (7,"chiaro",0,"La via intradermica, per completezza. Il farmaco va nel derma, appena sotto l'epidermide, con un angolo molto basso, dieci-quindici gradi, ago sottile con il bisello rivolto verso l'alto."),
 (7,"chiaro",0,"Se e' corretta si forma un piccolo pomfo, che e' la prova che il farmaco e' nel derma e non sotto. Si usa per l'intradermoreazione di Mantoux per la tubercolosi e per i test allergici. Non si massaggia."),

 (8,"chiaro",0,"La via intramuscolare. Il muscolo e' molto vascolarizzato, quindi l'assorbimento e' piu' rapido che nel sottocutaneo. Aghi fra ventuno e ventitre' gauge, lunghi venticinque-trentotto millimetri secondo sede e corporatura."),
 (8,"chiaro",0,"Angolo di novanta gradi. I volumi dipendono dalla sede: il deltoide accoglie volumi piccoli, indicativamente fino a un millilitro; le sedi glutee e il vasto laterale volumi maggiori."),

 (9,"chiaro",0,"Le sedi. La ventroglutea e' oggi la sede preferita nell'adulto: il muscolo e' spesso, e la zona e' lontana dal nervo sciatico e dai grandi vasi."),
 (9,"chiaro",0,"Si individua appoggiando il palmo sul grande trocantere e divaricando indice e medio verso la cresta iliaca: si inietta nel triangolo fra le dita. Un repere a mano, che vale anche come risposta all'orale."),
 (9,"chiaro",0,"Il deltoide per vaccini e piccoli volumi. Il vasto laterale della coscia e' la sede di scelta nel lattante. E la dorsoglutea, nel quadrante supero-esterno: tradizionale, ma con il rischio di ledere il nervo sciatico."),

 (10,"chiaro",0,"La tecnica a Z, che il programma d'esame cita espressamente. Si sposta lateralmente la cute di due-tre centimetri tenendola ferma, si inietta, si attende circa dieci secondi."),
 (10,"chiaro",0,"Si estrae l'ago e solo allora si rilascia la cute. I piani tissutali tornano in posizione e il tramite si spezza a zeta, chiudendosi: il farmaco resta nel muscolo e non refluisce nel sottocutaneo."),
 (10,"chiaro",0,"E' indicata per farmaci irritanti o che macchiano la cute, come il ferro, ma molte procedure la raccomandano per tutte le intramuscolari."),

 (11,"chiaro",0,"Una domanda su cui i manuali piu' vecchi e quelli recenti divergono: si aspira prima di iniettare? Le raccomandazioni attuali non prevedono l'aspirazione per le vaccinazioni e nelle sedi prive di grossi vasi."),
 (11,"chiaro",0,"Ventroglutea, deltoide e vasto laterale: aspirare allunga l'iniezione e aumenta il dolore senza un beneficio dimostrato. Nella dorsoglutea era prevista per l'arteria glutea. La risposta prudente: la procedura aziendale."),

 (12,"chiaro",0,"Le complicanze dell'intramuscolare: la lesione del nervo sciatico, con dolore irradiato e deficit motorio, che e' la piu' grave e la piu' contestata sul piano medico-legale; l'ascesso da contaminazione."),
 (12,"chiaro",0,"L'ematoma, soprattutto nei pazienti anticoagulati, nei quali l'intramuscolare va evitata se possibile; il dolore; la rottura dell'ago; l'iniezione accidentale in un vaso. La scelta corretta della sede e' la prima prevenzione."),

 (13,"chiaro",0,"La via endovenosa. Effetto immediato, biodisponibilita' del cento per cento, e per questo il rischio piu' alto: un errore endovenoso non si puo' richiamare, e un errore irreversibile si previene solo prima."),
 (13,"profondo",1.2,"[serious] Il bolo si somministra lentamente, nei minuti indicati dalla scheda tecnica. Bolo non significa spinto."),
 (13,"chiaro",0,"L'infusione puo' essere intermittente o continua, e per i farmaci ad alto rischio si usa la pompa. Le complicanze, flebite, stravaso, reazioni, embolia gassosa, le vedremo nel modulo sei."),

 (14,"chiaro",0,"La via transdermica: cerotti che rilasciano il farmaco in modo controllato per ore o giorni, come fentanil, nitroglicerina, buprenorfina. Comodi, ma con una farmacocinetica lunga, che non si interrompe togliendo il cerotto."),
 (14,"chiaro",0,"Le regole: rimuovere il cerotto precedente, dimenticarlo significa raddoppiare la dose; ruotare la sede su cute integra e senza peli; annotare data e ora; non tagliare il cerotto se non previsto."),
 (14,"chiaro",0,"E una trappola seria: il calore, febbre, borsa dell'acqua calda, coperta termica, aumenta l'assorbimento, e con il fentanil puo' causare un sovradosaggio."),

 (15,"chiaro",0,"La via inalatoria: il farmaco arriva direttamente ai bronchi. Spray predosati, meglio con distanziatore, che elimina il problema della coordinazione fra spruzzo e inspirazione; inalatori di polvere; aerosol."),
 (15,"chiaro",0,"L'efficacia dipende dalla tecnica, che va verificata, con il teach-back della lezione due punto sette. E dopo i corticosteroidi inalatori, risciacquare la bocca, per prevenire la candidosi del cavo orale."),

 (16,"chiaro",0,"La via oculare. Si abbassa la palpebra inferiore e si instilla nel sacco congiuntivale inferiore, senza toccare l'occhio con il flacone. Poi si preme sull'angolo interno dell'occhio per uno-due minuti."),
 (16,"chiaro",0,"Si chiude il dotto lacrimale e si riduce l'assorbimento sistemico, importante con i colliri beta-bloccanti, che possono dare bradicardia. Fra colliri diversi almeno cinque minuti, e prima il collirio, poi la pomata."),

 (17,"chiaro",0,"La via rettale. Persona in decubito laterale sinistro, come per il clistere; la supposta si introduce oltre lo sfintere anale interno, altrimenti viene espulsa."),
 (17,"chiaro",0,"E' utile quando la via orale non e' praticabile, per vomito o incoscienza, ma l'assorbimento e' variabile: la dose che arriva non e' prevedibile come per bocca."),

 (18,"chiaro",0,"E un cenno alla via intraossea: in emergenza, quando un accesso venoso non si ottiene rapidamente, si accede al midollo osseo nella tibia o nell'omero prossimale. Da li' passano tutti i farmaci e i liquidi della rianimazione."),

 (19,"chiaro",0,"Nelle aziende venete le tecniche iniettive sono regolate da procedure aziendali aggiornate alle evidenze, con dispositivi di sicurezza per la prevenzione delle punture, ricordi la lezione quattro punto sette."),
 (19,"chiaro",0,"E, in molte realta', formazione specifica sulla sede ventroglutea. All'orale, citare la ventroglutea come sede preferita, con la ragione anatomica, fa subito la differenza."),

 (20,"chiaro",0,"Ricapitoliamo. Sottocutanea a novanta gradi, quarantacinque nel magro. Eparina: non aspirare, non massaggiare, non espellere la bolla. Intradermica a dieci-quindici gradi. Intramuscolare a novanta, ventroglutea e tecnica a Z."),
 (20,"chiaro",0,"[warm] Transdermica: togliere il cerotto vecchio e niente calore. Oculare: pressione sull'angolo interno. Nella prossima lezione, la piu' temuta: il calcolo delle dosi. E' piu' semplice di quanto sembri. A tra poco."),
]

CAPITOLI = {1:"Apertura",2:"La via orale",3:"La via sublinguale",4:"La sottocutanea",5:"Sedi e rotazione",
 6:"L'eparina",7:"L'intradermica",8:"L'intramuscolare",9:"Le sedi intramuscolari",
 10:"La tecnica a Z",11:"Aspirare o no",12:"Le complicanze",13:"L'endovenosa",14:"La transdermica",
 15:"L'inalatoria",16:"L'oculare",17:"La rettale",18:"L'intraossea",19:"In Veneto",20:"Chiusura"}

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
