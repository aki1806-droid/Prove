# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Chiudiamo il modulo piu' pesante del corso con una lezione diversa dalle altre: prima un rapido riepilogo dei punti chiave, poi venti calcoli cronometrati."),
 (1,"chiaro",0,"Per ogni coppia di calcoli avrai quaranta secondi, venti a calcolo: il tempo che avrai davvero in sede d'esame. Prendi carta e penna, e metti in pausa se ti serve piu' tempo. Ma prova a stare nei tempi."),

 (2,"chiaro",0,"Il riepilogo, in due slide. ADME: assorbimento, distribuzione, metabolismo, eliminazione. Biodisponibilita' endovenosa del cento per cento. Primo passaggio epatico, che riduce la dose orale."),
 (2,"chiaro",0,"Stato stazionario ed eliminazione in quattro-cinque emivite. Finestra stretta, con il monitoraggio dei livelli: digossina, litio, warfarin, fenitoina, aminoglicosidi, vancomicina."),
 (2,"chiaro",0,"La reazione avversa si segnala sul sospetto, alla rete nazionale di farmacovigilanza; l'errore in terapia con l'incident reporting. E nell'anziano: start low, go slow."),

 (3,"chiaro",0,"Le sette G e i tre controlli, l'ultimo al letto. Identificazione attiva con due identificativi. Niente U, niente zero dopo la virgola. Le Raccomandazioni uno, sette, dodici, quattordici, diciassette, diciannove."),
 (3,"chiaro",0,"Davanti a un errore: valutare, avvisare, informare, documentare, segnalare. Gli antidoti: protamina, vitamina K, idarucizumab, naloxone, glucagone."),
 (3,"chiaro",0,"Gli stupefacenti: DPR trecentonove del millenovecentonovanta, registro di carico e scarico vidimato, conservazione due anni. Ora i calcoli."),

 (4,"chiaro",2.5,"Calcolo uno: prescritti quaranta milligrammi, fiala da venti milligrammi per millilitro. Calcolo due: prescritti duecentocinquanta milligrammi, compresse da cinquecento. Quaranta secondi: metti in pausa."),
 (4,"chiaro",0,"Uno: la regola del tre della lezione cinque punto tre: dose prescritta diviso dose disponibile, per il volume. Quaranta diviso venti fa due: due millilitri."),
 (4,"chiaro",0,"Due: duecentocinquanta diviso cinquecento fa zero virgola cinque: mezza compressa, se la compressa e' divisibile. Altrimenti si chiede una formulazione adatta."),

 (5,"chiaro",2.5,"Tre: prescritti zero virgola venticinque milligrammi, fiala da zero virgola cinque milligrammi in due millilitri. Quattro: prescritti trecento microgrammi, fiala da un milligrammo in un millilitro. Quaranta secondi."),
 (5,"chiaro",0,"Tre: zero virgola cinque in due millilitri e' zero virgola venticinque per millilitro, quindi un millilitro. Meta' della fiala, e il buon senso lo conferma."),
 (5,"chiaro",0,"Quattro: prima la conversione. Un milligrammo sono mille microgrammi; trecento su mille fa zero virgola tre: zero virgola tre millilitri."),

 (6,"chiaro",2.5,"Cinque: prescritti duecento milligrammi di una soluzione al dieci per cento. Sei: quanti grammi di glucosio ci sono in dieci millilitri di glucosata al trentatre' per cento? Quaranta secondi."),
 (6,"chiaro",0,"Cinque: il dieci per cento sono dieci grammi in cento millilitri, cioe' cento milligrammi per millilitro, percentuale per dieci. Duecento diviso cento: due millilitri."),
 (6,"chiaro",0,"Sei: il trentatre' per cento sono trentatre' grammi in cento millilitri, quindi in dieci millilitri tre virgola tre grammi. Percentuale per dieci: i milligrammi per millilitro."),

 (7,"chiaro",2.5,"Sette: cinquecento millilitri in quattro ore, quanti millilitri all'ora? Otto: millecinquecento millilitri in ventiquattro ore? Quaranta secondi."),
 (7,"chiaro",0,"Sette: volume diviso ore, cinquecento diviso quattro: centoventicinque millilitri all'ora. Otto: millecinquecento diviso ventiquattro fa sessantadue virgola cinque millilitri all'ora. La formula piu' semplice del modulo."),

 (8,"chiaro",2.5,"Nove: cinquecento millilitri in cinque ore, deflussore da venti gocce: quante gocce al minuto? Dieci: cento millilitri in trenta minuti, stesso deflussore. Quaranta secondi."),
 (8,"chiaro",0,"Nove: volume per fattore diviso minuti. Cinquecento per venti fa diecimila, diviso trecento minuti fa trentatre' gocce al minuto."),
 (8,"chiaro",0,"Dieci: cento per venti fa duemila, diviso trenta fa sessantasette gocce al minuto. Il tempo in minuti, sempre: e' l'errore piu' frequente."),

 (9,"chiaro",2.5,"Undici: microgocciolatore, quaranta millilitri all'ora: quante gocce al minuto? Dodici: deflussore da venti, novanta millilitri all'ora. Usa le scorciatoie. Quaranta secondi."),
 (9,"chiaro",0,"Undici: con il microgocciolatore, sessanta gocce per millilitro, gocce al minuto e millilitri all'ora coincidono: quaranta gocce al minuto."),
 (9,"chiaro",0,"Dodici: con il deflussore da venti si divide per tre: novanta diviso tre, trenta gocce al minuto. Le scorciatoie della lezione cinque punto tre."),

 (10,"chiaro",2.5,"Tredici: prescritte dodici unita' di insulina cento unita' per millilitro: quanti millilitri? Quattordici: eparina venticinquemila unita' in cinquanta millilitri, prescritte ottocento unita' all'ora. Quaranta secondi."),
 (10,"chiaro",0,"Tredici: dodici diviso cento, zero virgola dodici millilitri. Ma nella pratica non si converte: si aspirano dodici unita' con una siringa da insulina, graduata in unita'."),
 (10,"chiaro",0,"Quattordici: venticinquemila diviso cinquanta, cinquecento unita' per millilitro; ottocento diviso cinquecento, uno virgola sei millilitri all'ora, da impostare sulla pompa."),

 (11,"chiaro",2.5,"Quindici: amoxicillina cinquanta milligrammi per chilo al giorno in tre dosi, bambino di diciotto chili: quanti per dose? Sedici: sospensione da duecentocinquanta milligrammi in cinque millilitri, dose da trecento."),
 (11,"chiaro",0,"Quindici: cinquanta per diciotto fa novecento milligrammi al giorno, diviso tre fa trecento milligrammi per dose. Prima la dose giornaliera, poi la dose singola."),
 (11,"chiaro",0,"Sedici: trecento diviso duecentocinquanta fa uno virgola due, per cinque fa sei millilitri. I due calcoli sono collegati: la dose del quindici e' la dose del sedici."),

 (12,"chiaro",0,"Diciassette, il piu' lungo: noradrenalina zero virgola uno microgrammi per chilo al minuto, paziente di ottanta chili, soluzione di quattro milligrammi in cinquanta millilitri: millilitri all'ora?"),
 (12,"chiaro",2.5,"Diciotto: mille millilitri a centoventicinque all'ora, iniziata alle otto: quando finisce? Per questa coppia hai sessanta secondi."),
 (12,"chiaro",0,"Diciassette: zero virgola uno per ottanta fa otto microgrammi al minuto; per sessanta fa quattrocentottanta microgrammi all'ora, cioe' zero virgola quarantotto milligrammi."),
 (12,"chiaro",0,"Poi la concentrazione: quattro diviso cinquanta, zero virgola zero otto milligrammi per millilitro. Zero virgola quarantotto diviso zero virgola zero otto fa sei millilitri all'ora. Diciotto: otto ore, quindi alle sedici."),

 (13,"chiaro",0,"Diciannove: prescritti quaranta milliequivalenti di potassio da diluire, fiala da due milliequivalenti per millilitro: quanti millilitri di concentrato?"),
 (13,"chiaro",2.5,"Venti: prescritti zero virgola centoventicinque milligrammi di digossina, compresse da zero virgola venticinque. Quaranta secondi."),
 (13,"chiaro",0,"Diciannove: venti millilitri di concentrato, che non si somministrano mai cosi': si diluiscono secondo procedura, con doppio controllo e pompa, Raccomandazione uno. Venti: mezza compressa."),

 (14,"chiaro",0,"Conta le risposte giuste. Da diciotto a venti: sei pronto per i calcoli dell'esame. Da quindici a diciassette: individua il tipo di calcolo che hai sbagliato, conversioni, percentuali, gocce, e rifai solo quelli."),
 (14,"chiaro",0,"Meno di quindici: riguarda la lezione cinque punto tre con calma, e rifai questa batteria fra due giorni. I calcoli sono l'unica parte del concorso in cui l'allenamento garantisce il risultato."),

 (15,"chiaro",0,"I quattro errori che vedo piu' spesso. Dimenticare la conversione fra milligrammi e microgrammi. Usare le ore invece dei minuti nel calcolo delle gocce."),
 (15,"chiaro",0,"Confondere la dose, in milligrammi, con il volume, in millilitri. E saltare il controllo di buon senso. Nessuno di questi e' un errore di matematica: sono tutti errori di attenzione."),

 (16,"chiaro",0,"Gli agganci veneti del modulo. Scheda unica di terapia informatizzata. Farmacovigilanza con responsabile aziendale e centro regionale, che valuta e trasmette alla rete nazionale."),
 (16,"chiaro",0,"Procedure su farmaci ad alto rischio, LASA, potassio concentrato e stupefacenti. UFA per gli antiblastici. Ricognizione e riconciliazione nei passaggi di setting."),

 (17,"chiaro",0,"Come proseguire. Test del modulo, trenta domande, soglia ventuno. Rifai la batteria dei calcoli finche' non arrivi stabilmente a diciotto su venti, e nei tempi."),
 (17,"chiaro",0,"Nel quaderno: formule, antidoti, Raccomandazioni. E scrivi per intero un caso di errore in terapia con lo schema in cinque passi: e' una traccia molto probabile."),

 (18,"profondo",1.2,"[serious] Ci fermiamo qui, con la frase che ha aperto la lezione sulla somministrazione sicura: l'infermiere e' l'ultima barriera fra l'errore e il paziente."),
 (18,"chiaro",0,"[warm] Nel prossimo modulo restiamo vicini a questi temi, ma dal lato dei dispositivi: accessi venosi, terapia infusionale e trasfusioni. Ci vediamo li'."),
]

CAPITOLI = {1:"Apertura",2:"I punti chiave, prima parte",3:"I punti chiave, seconda parte",4:"Calcoli 1 e 2",5:"Calcoli 3 e 4",
 6:"Calcoli 5 e 6",7:"Calcoli 7 e 8",8:"Calcoli 9 e 10",9:"Calcoli 11 e 12",10:"Calcoli 13 e 14",11:"Calcoli 15 e 16",
 12:"Calcoli 17 e 18",13:"Calcoli 19 e 20",14:"Come valutarti",15:"Gli errori piu' frequenti",16:"In Veneto",17:"Come proseguire",18:"Chiusura"}

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
