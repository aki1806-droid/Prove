# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Chiudiamo il modulo nove ricomponendolo lungo una linea del tempo: dalla decisione chirurgica alla ripresa a casa, tappa per tappa."),
 (1,"chiaro",0,"Per ogni tappa, che cosa fa l'infermiere, che cosa puo' andare storto e come si previene. E' la struttura ideale anche per rispondere a una traccia sull'assistenza al paziente chirurgico."),
 (1,"chiaro",0,"Se all'orale ti chiedono «il paziente chirurgico», non partire da una lista: parti dal tempo. Prima, durante, subito dopo, nei giorni successivi, a casa."),

 (2,"chiaro",0,"Prima. Accertamento, classe ASA, ricognizione della terapia. Digiuno: solidi sei ore, liquidi chiari due. Che cosa puo' andare storto: un'inalazione, o un digiuno inutile dalla mezzanotte."),
 (2,"chiaro",0,"Tricotomia solo se necessaria, con clipper, il giorno stesso. Doccia preoperatoria. Profilassi antitrombotica. Che cosa si previene: l'infezione del sito, la trombosi."),
 (2,"chiaro",0,"Terapia: beta-bloccanti continuati, anticoagulanti e antidiabetici secondo protocollo. Consenso verificato: lo acquisisce il medico, l'infermiere controlla che ci sia, completo e firmato."),
 (2,"chiaro",0,"Educazione a respiro, tosse, alzata e dolore: si impara quando non fa male. E gestione dell'ansia, che riduce il dolore successivo e la nausea."),

 (3,"chiaro",0,"Durante. La check-list: sign in prima dell'induzione, time out prima dell'incisione, sign out prima dell'uscita. Profilassi antibiotica entro sessanta minuti dall'incisione."),
 (3,"chiaro",0,"Posizionamento e protezione di nervi, occhi e cute: il peroneo nella litotomica, il plesso brachiale oltre i novanta gradi, le lesioni da pressione che iniziano in sala e si vedono giorni dopo."),
 (3,"chiaro",0,"Normotermia da trentasei gradi: l'ipotermia porta infezioni e sanguinamento. Conta all'inizio, alla chiusura della cavita', alla chiusura della cute e a ogni cambio di personale. Piastra neutra su un muscolo."),

 (4,"chiaro",0,"Subito dopo. Consegna SBAR. A-B-C: ostruzione da lingua, saturazione, pressione, perdite. Aldrete almeno nove per il trasferimento in reparto. Che cosa puo' andare storto: la lingua che chiude le vie aeree."),
 (4,"chiaro",0,"Nausea e vomito con i fattori di Apfel: donna, non fumatore, storia di nausea, oppioidi. Dolore multimodale, valutato anche in movimento. Peridurale: blocco motorio in aumento e' un allarme."),
 (4,"chiaro",0,"Alimentazione precoce. Prima alzata accompagnata, in due tempi, perche' l'ipotensione ortostatica e' frequente. Minzione entro sei-otto ore, e se non arriva, il bladder scanner prima del catetere."),

 (5,"chiaro",0,"Nei giorni successivi, le complicanze con la loro cronologia. Prime ore: emorragia, con la tachicardia che precede l'ipotensione. Primo-secondo giorno: atelettasia, la complicanza che l'infermiere previene da solo."),
 (5,"chiaro",0,"Terzo-quinto: polmonite e vie urinarie. Quinto-settimo: ferita. Quinto-decimo: deiscenza. Trombosi ed embolia in ogni momento. E sotto tutto, il riconoscimento precoce: parametri, NEWS2, ascoltare il paziente."),
 (5,"chiaro",0,"E la febbre con le cinque W: wind, water, wound, walking, wonder drugs. Il giorno della febbre dice dove guardare."),

 (6,"chiaro",0,"Le specificita'. Protesi d'anca: no flessione oltre novanta, no adduzione, no intrarotazione; lussazione con arto accorciato e ruotato. Femore entro quarantotto ore. Gesso: controllo neurovascolare, ripetuto."),
 (6,"chiaro",0,"Sindrome compartimentale: dolore sproporzionato allo stiramento passivo, e il polso assente e' tardivo. Trazioni: pesi liberi. Carotide: neurologico e collo, per l'ictus e per l'ematoma."),
 (6,"chiaro",0,"Prostata: iponatriemia da riassorbimento. Tiroide: ematoma, calcio, voce. Day surgery: accompagnatore, niente guida per ventiquattro ore, e un contatto telefonico il giorno dopo."),

 (7,"chiaro",0,"A casa. Dimissione pianificata dall'ingresso, ordinaria o protetta tramite la COT. Lettera infermieristica con ferita, dispositivi, educazione fatta e da fare, caregiver."),
 (7,"chiaro",0,"Educazione a ferita, dispositivi, terapia con riconciliazione, prevenzione della trombosi, vita quotidiana. Follow-up e contatti, verificati con il teach-back."),
 (7,"chiaro",0,"Che cosa puo' andare storto: una riammissione per un'infezione non riconosciuta, una trombosi per un'eparina mai iniziata, una caduta in una casa non preparata. Si previene prima, in reparto."),

 (8,"chiaro",0,"Le confusioni che costano piu' punti. Il digiuno dalla mezzanotte non e' lo standard: liquidi chiari fino a due ore prima. Rasoio no, clipper si', e il giorno stesso, non la sera prima."),
 (8,"chiaro",0,"Sign in prima dell'induzione, time out prima dell'incisione: due momenti diversi, due domande diverse. Strumentista sterile, infermiere di sala non sterile: chi passa i ferri e chi fa la conta ad alta voce con lui."),
 (8,"chiaro",0,"L'ipotensione e' un segno tardivo dell'emorragia, e il polso assente un segno tardivo della sindrome compartimentale."),
 (8,"profondo",1.2,"[serious] Aspettare il segno tardivo significa arrivare tardi."),

 (9,"chiaro",0,"I casi. Time out senza conferma della profilassi: si verifica prima dell'incisione. Caffe' la mattina dell'intervento: dipende dal protocollo, e si documenta l'orario."),
 (9,"chiaro",0,"Tachicardia e drenaggio ematico dopo due ore: emorragia, e si avvisa prima che la pressione scenda. Desaturazione e febbricola in seconda giornata: atelettasia, e si riparte dal dolore."),
 (9,"chiaro",0,"Dispnea improvvisa in sesta giornata dopo una protesi d'anca: embolia. Piede cadente dopo litotomica: peroneo. Dolore sproporzionato sotto il gesso: sindrome compartimentale."),
 (9,"chiaro",0,"Sette casi, sette risposte in una riga: all'orale, la prima parola giusta vale piu' di un discorso lungo. Poi si aggiunge che cosa si fa."),

 (10,"chiaro",0,"I fili con gli altri moduli. Il bundle per le infezioni del sito chirurgico con le lezioni quattro punto uno e sette punto quattro. Drenaggi e ferite con il modulo sette."),
 (10,"chiaro",0,"La trombosi con la tre punto due. Analgesia e PCA con la tre punto sette e la cinque punto sei. La trasfusione con la sei punto sei."),
 (10,"chiaro",0,"La riconciliazione con la cinque punto quattro. La dimissione protetta con la due punto sette e la undici punto sette. Un modulo non vive da solo: le domande saltano da uno all'altro."),

 (11,"chiaro",0,"Gli agganci veneti. La check-list di sala adottata nelle aziende. I percorsi ERAS. Il prericovero, dove si fanno esami ed educazione prima dell'ingresso."),
 (11,"chiaro",0,"La recovery room e il servizio per il dolore acuto. I percorsi ortogeriatrici e l'indicatore del femore entro quarantotto ore. Le dimissioni protette con le COT. Ogni aggancio vale una frase in piu' all'orale."),

 (12,"chiaro",0,"Come proseguire. Test del modulo, trenta domande, soglia ventuno. Disegna a memoria la linea del tempo con le complicanze: se la sai disegnare, la sai raccontare."),
 (12,"chiaro",0,"Nel quaderno: check-list, digiuno, Aldrete, Apfel, precauzioni dell'anca. Cinque schede, cinque numeri o liste che i concorsi chiedono cosi' come sono, senza ragionamento: o le sai, o no."),
 (12,"chiaro",0,"E scrivi il caso dell'emorragia postoperatoria con lo schema in cinque passi: che cosa vedo, che cosa penso, che cosa faccio subito, chi avviso, che cosa documento."),

 (13,"chiaro",0,"La frase del modulo: molte complicanze del post-operatorio si prevengono nel pre-operatorio."),
 (13,"profondo",1.2,"[thoughtful] Molte complicanze del post-operatorio si prevengono nel pre-operatorio."),
 (13,"chiaro",0,"L'educazione al respiro previene l'atelettasia, la tricotomia corretta previene l'infezione, la pianificazione della dimissione previene la riammissione."),
 (13,"chiaro",0,"E' il motivo per cui questo modulo e' iniziato dal percorso e dalla preparazione, e non dalla sala operatoria: il lavoro migliore dell'infermiere chirurgico spesso non si vede, perche' evita qualcosa."),

 (14,"chiaro",0,"E se all'orale ti chiedono il ruolo dell'infermiere nel percorso chirurgico, una risposta che riassume tutto."),
 (14,"chiaro",0,"L'infermiere prepara la persona, la protegge quando non puo' proteggersi da sola, la rimette in piedi e la rimanda a casa capace di gestirsi."),
 (14,"chiaro",0,"Quattro verbi, quattro tappe della linea del tempo: preparare, proteggere, rimettere in piedi, rimandare a casa. Se ricordi questi, ricordi il modulo."),

 (15,"chiaro",0,"Nel prossimo modulo entriamo nell'emergenza: triage, valutazione ABCDE, rianimazione cardiopolmonare, shock e sepsi, emergenze pediatriche e ostetriche, trauma e maxi-emergenze."),
 (15,"chiaro",0,"L'ABC del risveglio che abbiamo visto nella nove punto quattro e' lo stesso ABCDE con cui si valuta ogni paziente critico: da li' ripartiamo."),
 (15,"chiaro",0,"[warm] E' il modulo degli algoritmi, e dei minuti che contano. Ci vediamo li'."),
]

CAPITOLI = {1:"Apertura",2:"Prima: la preparazione",3:"Durante: la sala operatoria",4:"Subito dopo: il risveglio",5:"Nei giorni successivi",6:"Le specificita'",7:"A casa: la dimissione",
 8:"Le confusioni",9:"I casi tipici",10:"I fili con gli altri moduli",11:"Gli agganci veneti",12:"Come proseguire",13:"La frase del modulo",14:"Il ruolo dell'infermiere",15:"Chiusura"}

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
