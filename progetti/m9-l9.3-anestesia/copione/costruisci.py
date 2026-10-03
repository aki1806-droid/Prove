# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] In sala operatoria il paziente non puo' proteggersi da solo: non sente il dolore di una postura scorretta, non si accorge del freddo, non sa se una garza e' rimasta dentro."),
 (1,"chiaro",0,"La sicurezza intraoperatoria dipende dall'equipe, e una parte importante dall'infermiere. Vediamo i tipi di anestesia e i quattro rischi che l'infermiere presidia: posizionamento, temperatura, conta, elettrobisturi."),

 (2,"chiaro",0,"L'anestesia generale ha tre componenti: ipnosi, cioe' la perdita di coscienza; analgesia; e miorisoluzione, il rilassamento muscolare, che serve al chirurgo."),
 (2,"chiaro",0,"Siccome la persona non respira autonomamente, o lo fa in modo insufficiente, le vie aeree vanno gestite con un presidio sopraglottico o con l'intubazione."),
 (2,"chiaro",0,"Le fasi sono tre: induzione, mantenimento, risveglio. Le piu' delicate sono la prima e l'ultima: e' li' che l'infermiere di anestesia sta accanto al paziente e non lo lascia."),

 (3,"chiaro",0,"Le anestesie neuroassiali. La spinale, o subaracnoidea: l'anestetico si inietta nel liquor con una puntura singola, e l'effetto e' rapido."),
 (3,"chiaro",0,"La peridurale: l'anestetico va nello spazio epidurale, spesso attraverso un catetere che resta in sede per l'analgesia postoperatoria."),
 (3,"chiaro",0,"Gli effetti da sorvegliare: ipotensione, perche' il blocco del simpatico dilata i vasi, bradicardia, blocco motorio degli arti inferiori, ritenzione urinaria."),
 (3,"chiaro",0,"E dopo la spinale una possibile cefalea post-puntura, che caratteristicamente peggiora in piedi e migliora sdraiati: e' il segno che la distingue da un comune mal di testa."),

 (4,"chiaro",0,"L'anestesia loco-regionale blocca un nervo o un plesso, per esempio per un intervento al braccio. L'arto resta insensibile anche per ore dopo l'intervento, e va protetto: non sente traumi, pressione o calore."),
 (4,"chiaro",0,"La sedazione ha livelli diversi, e richiede monitoraggio di respiro e saturazione: una sedazione che si approfondisce senza che nessuno la guardi diventa un'anestesia generale senza vie aeree protette."),
 (4,"chiaro",0,"Un segnale d'allarme da conoscere: la tossicita' da anestetici locali si annuncia con formicolio intorno alla bocca, sapore metallico, agitazione, fino a convulsioni e aritmie. Va segnalata subito."),

 (5,"chiaro",0,"Una complicanza rara ma chiesta: l'ipertermia maligna, una reazione su base genetica a certi anestetici. Si manifesta con aumento della CO2 espirata, rigidita' muscolare, tachicardia e, tardivamente, febbre altissima."),
 (5,"chiaro",0,"L'antidoto e' il dantrolene, che deve essere disponibile nel blocco operatorio. Per questo, nell'accertamento, si chiede sempre se ci sono stati problemi con l'anestesia in famiglia."),

 (6,"chiaro",0,"Il posizionamento sul letto operatorio. Le posizioni dipendono dall'intervento: supina, prona, laterale, litotomica, Trendelenburg, seduta."),
 (6,"chiaro",0,"Gli obiettivi sono quattro: consentire l'accesso chirurgico, non ostacolare ventilazione e circolazione, e proteggere cute, nervi, articolazioni e occhi."),
 (6,"chiaro",0,"Si posiziona in equipe, con movimenti coordinati, perche' il paziente anestetizzato non ha tono muscolare e non protegge le proprie articolazioni: un braccio lasciato cadere e' una lussazione."),

 (7,"chiaro",0,"Le lesioni da posizione. Le lesioni da pressione: in un intervento lungo il danno puo' iniziare in sala e diventare visibile giorni dopo. Ricordi il danno dei tessuti profondi della lezione sette punto due."),
 (7,"chiaro",0,"Le lesioni nervose: il nervo ulnare al gomito; il peroneo comune alla testa del perone, nella posizione litotomica, con il piede cadente; il plesso brachiale, se il braccio e' abdotto oltre i novanta gradi."),
 (7,"chiaro",0,"Gli occhi: si chiudono e si proteggono, con attenzione particolare nella posizione prona. Si usano supporti e imbottiture, e il posizionamento si registra."),

 (8,"chiaro",0,"La normotermia. L'anestesia abolisce la termoregolazione, la sala e' fredda, il paziente e' scoperto e riceve liquidi a temperatura ambiente: l'ipotermia e' frequente."),
 (8,"chiaro",0,"L'obiettivo: almeno trentasei gradi, perche' l'ipotermia ha conseguenze precise: piu' infezioni del sito chirurgico, piu' sanguinamento per alterazione della coagulazione, eventi cardiaci, brividi e disagio al risveglio."),
 (8,"chiaro",0,"La prevenzione: riscaldamento attivo con coperte ad aria forzata, liquidi riscaldati, coperture, e monitoraggio della temperatura. E' parte del bundle della lezione sette punto quattro."),
 (8,"chiaro",0,"Il riscaldamento comincia prima dell'induzione: la caduta di temperatura piu' rapida e' nella prima mezz'ora di anestesia, quando il calore del centro del corpo si ridistribuisce verso la periferia."),

 (9,"chiaro",0,"La conta, strumento della Raccomandazione due. Si contano garze, compresse, aghi e strumenti."),
 (9,"chiaro",0,"Quando? Prima dell'inizio, prima della chiusura di una cavita', alla chiusura della cute, e a ogni cambio di personale."),
 (9,"chiaro",0,"Si esegue ad alta voce, da due operatori, lo strumentista e l'infermiere di sala, e si registra. Le garze chirurgiche sono radiopache, cioe' visibili ai raggi X, proprio per poterle ritrovare."),

 (10,"chiaro",0,"E se la conta non torna? Si comunica subito al chirurgo, si sospende la chiusura, si riconta, si cerca nel campo, nei contenitori dei rifiuti, nella sala."),
 (10,"chiaro",0,"Se il materiale non si trova, si esegue una radiografia intraoperatoria. Poi si documenta e si segnala. Una garza dimenticata e' un evento sentinella."),
 (10,"profondo",1.2,"[serious] Il momento di fermarsi e' prima della chiusura, non dopo."),

 (11,"chiaro",0,"L'elettrobisturi taglia e coagula con la corrente, che deve rientrare attraverso una piastra neutra applicata sul paziente, per esempio sulla coscia."),
 (11,"chiaro",0,"La piastra si posiziona su un'area muscolare, ben vascolarizzata, asciutta e senza peli, lontano da protesi metalliche, elettrodi dell'ECG e prominenze ossee, e se ne controlla il contatto."),
 (11,"chiaro",0,"Un contatto insufficiente concentra la corrente e provoca ustioni. Nei portatori di pacemaker o defibrillatori impiantabili si segue un protocollo specifico."),

 (12,"chiaro",0,"Due altre attenzioni. Il fuoco: in sala ci sono tutti e tre gli elementi della triade, ossigeno, materiali combustibili come teli e antisettici alcolici, e fonti di innesco come elettrobisturi e laser."),
 (12,"chiaro",0,"Per questo l'antisettico alcolico si lascia asciugare completamente prima di applicare i teli: un telo posato su cute ancora bagnata intrappola i vapori, e la prima scintilla li accende."),
 (12,"chiaro",0,"E il campo sterile: qualunque contaminazione si segnala e il materiale si sostituisce, senza discussioni. Segnalare una violazione dell'asepsi e' un dovere, a qualunque livello gerarchico."),

 (13,"chiaro",0,"La tracciabilita'. I set sterili e i dispositivi impiantati, protesi, placche, viti, si registrano con le loro etichette in cartella e nel registro operatorio, come abbiamo visto nella lezione quattro punto cinque."),
 (13,"chiaro",0,"I campioni istologici richiedono identificazione corretta, contenitore e fissativo adeguati, richiesta compilata e consegna tracciata: un campione perso o scambiato puo' significare una diagnosi mancata."),

 (14,"chiaro",0,"Il caso. Intervento in posizione litotomica durato quattro ore; al risveglio il paziente non riesce a sollevare la punta del piede destro. Che cosa pensi?"),
 (14,"chiaro",0,"Una lesione del nervo peroneo comune, compresso alla testa del perone dai supporti della litotomica."),
 (14,"chiaro",0,"Che cosa fai? Segnali al medico, documenti il deficit e il posizionamento intraoperatorio, proteggi il piede e previeni le cadute, e la situazione si segnala come evento."),
 (14,"chiaro",0,"La prevenzione era in sala: imbottitura e controllo dei supporti, e un'occhiata alle gambe a ogni ora di intervento."),

 (15,"chiaro",0,"Nelle aziende venete i blocchi operatori adottano procedure aziendali su conta, posizionamento, normotermia ed elettrochirurgia, con tracciabilita' informatizzata dei set e dei dispositivi."),
 (15,"chiaro",0,"E percorsi di formazione specifici per l'infermiere di sala e lo strumentista: all'orale, il collegamento con la check-list della lezione precedente e' quello che ci si aspetta."),

 (16,"chiaro",0,"Ricapitoliamo. Generale: ipnosi, analgesia, miorisoluzione. Spinale: ipotensione, ritenzione, cefalea che peggiora in piedi. Lesioni da posizione: peroneo nella litotomica, plesso brachiale oltre novanta gradi."),
 (16,"chiaro",0,"Normotermia da trentasei gradi. Conta all'inizio, prima della chiusura della cavita', alla chiusura della cute e a ogni cambio di personale; se non torna, non si chiude."),
 (16,"chiaro",0,"Piastra neutra su muscolo, lontano dal metallo. Antisettico alcolico asciutto prima dei teli."),
 (16,"chiaro",0,"[warm] Nella prossima lezione: il risveglio, con la sala risveglio, i criteri per tornare in reparto e le prime ore dopo l'intervento. A tra poco."),
]

CAPITOLI = {1:"Apertura",2:"L'anestesia generale",3:"Spinale e peridurale",4:"Loco-regionale e sedazione",5:"L'ipertermia maligna",6:"Il posizionamento",7:"Le lesioni da posizione",
 8:"La normotermia",9:"La conta",10:"Se la conta non torna",11:"L'elettrobisturi",12:"Fuoco e campo sterile",13:"La tracciabilita'",14:"Il caso",15:"In Veneto",16:"Chiusura"}

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
