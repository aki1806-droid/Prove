# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Il primo caso e' uno dei piu' probabili all'esame, e dei piu' frequenti nella realta': un paziente di medicina che, durante la notte, comincia a peggiorare."),
 (1,"chiaro",0,"Qui l'infermiere fa la differenza piu' grande, perche' e' spesso l'unico accanto al letto quando i segni compaiono. Collegheremo le lezioni due punto tre, due punto sette, sei punto sette, dieci punto due e dieci punto sei."),

 (2,"chiaro",0,"Lo scenario. Signor Bruno, settantotto anni, ricoverato alle diciotto in medicina per polmonite. E' diabetico in terapia orale, e iperteso."),
 (2,"chiaro",0,"Alle ventidue: febbre a trentotto virgola due, pressione centoventotto su settantaquattro, frequenza novantasei, respiratoria venti, saturazione novantaquattro in aria. Vigile e orientato."),
 (2,"chiaro",0,"L'antibiotico e' prescritto, con la prima dose alle ventiquattro. Alle tre la figlia, che lo assiste, ti chiama: non mi riconosce. Metti in pausa: che cosa fai nei primi cinque minuti?"),

 (3,"chiaro",0,"I primi cinque minuti sono l'ABCDE. A: parla, anche se in modo confuso: le vie aeree sono pervie. B: respiratoria ventisei, saturazione novantadue in aria, rantoli alla base destra."),
 (3,"chiaro",0,"C: frequenza centodiciotto, pressione novantasei su cinquantotto, riempimento capillare di tre secondi, cute marezzata alle ginocchia. D: confusione nuova, GCS quattordici per la risposta verbale."),
 (3,"chiaro",0,"Pupille normali, glicemia centosessantotto: non e' un'ipoglicemia. E: febbre a trentotto virgola nove, nessun'altra fonte evidente, e solo centocinquanta millilitri di urina dalle ventidue, in cinque ore."),

 (4,"chiaro",0,"Calcoliamo la NEWS2. Respiratoria ventisei: tre punti. Saturazione novantadue, sulla scala uno: due. Aria ambiente: zero. Sistolica novantasei: due. Frequenza centodiciotto: due."),
 (4,"chiaro",0,"Confusione nuova: tre. Temperatura trentotto virgola nove: uno. Totale: tredici. E' un rischio alto, ben oltre la soglia di sette: richiede una risposta d'emergenza."),
 (4,"chiaro",0,"E nota che la sola confusione nuova vale gia' tre punti. E' il segnale che troppo spesso viene attribuito all'eta', o alla notte."),

 (5,"chiaro",0,"[curious] Che cosa pensi? C'e' un'infezione nota, la polmonite, e ci sono segni di disfunzione d'organo: il cervello, con la confusione; il circolo, con l'ipotensione e la marezzatura."),
 (5,"chiaro",0,"Il rene, con l'oliguria; il polmone, con tachipnea e desaturazione. Sepsi fino a prova contraria: i tre criteri del qSOFA ci sono tutti. E, come sai dalla dieci punto sei, e' tempo-dipendente: ogni ora pesa."),

 (6,"chiaro",0,"Le prime azioni, in parallelo. Chiami subito il medico di guardia, o il team di risposta rapida se l'ospedale lo prevede, con lo SBAR."),
 (6,"chiaro",0,"Ossigeno secondo protocollo o prescrizione, con target novantaquattro-novantotto, perche' non ha la BPCO. Posizione semiseduta. Monitoraggio continuo. Un secondo accesso venoso di buon calibro."),
 (6,"chiaro",0,"Prepari emocolture, lattati, emogas ed esami. E resti con il paziente, rassicurando la figlia: e' spaventata, e ha dato l'allarme giusto."),

 (7,"chiaro",0,"La telefonata SBAR. Situazione: sono l'infermiera di Medicina, chiamo per il signor Bruno, letto dodici: e' confuso da mezz'ora, ipoteso e tachicardico, con una NEWS2 di tredici."),
 (7,"chiaro",0,"Background: settantotto anni, ricoverato alle diciotto per polmonite, diabetico; la prima dose di antibiotico era prevista a mezzanotte. Accertamento: i parametri, la diuresi, e penso a una sepsi."),
 (7,"chiaro",0,"Richiesta: le chiedo di venire subito a vederlo; intanto ho messo l'ossigeno e preparo emocolture e lattati. Una chiamata cosi' dura quaranta secondi, e ottiene una risposta immediata."),

 (8,"chiaro",0,"[serious] Ora un dettaglio che cambia tutto: l'antibiotico previsto alle ventiquattro e' stato somministrato? Verifichi la scheda di terapia. La prima dose puo' slittare, o saltare: magari il farmaco non era in reparto."),
 (8,"chiaro",0,"Allora lo comunichi al medico e la somministri subito, secondo prescrizione: dopo aver prelevato le emocolture, ma senza ritardarla per aspettarle. Nella sepsi, ogni ora di ritardo dell'antibiotico conta."),

 (9,"chiaro",0,"Il medico arriva, e si avvia il bundle della prima ora. Lattati: tre virgola otto. Emocolture: due set da sedi diverse, con la tecnica della sei punto sette, prima dell'antibiotico."),
 (9,"chiaro",0,"L'antibiotico ad ampio spettro, secondo prescrizione. I liquidi: cristalloidi secondo prescrizione, per esempio trenta millilitri per chilo se c'e' ipotensione, o lattati da quattro in su."),
 (9,"chiaro",0,"Sorvegliando respiro e saturazione: un anziano con polmonite puo' non tollerare molti liquidi. Vasopressori se l'ipotensione persiste, per una media di almeno sessantacinque. E tutti gli orari si documentano."),

 (10,"chiaro",0,"La diuresi oraria dice la perfusione: almeno mezzo millilitro per chilo all'ora. Se serve, catetere su prescrizione, con indicazione documentata, rimosso appena non serve, come nella tre punto sei. Bilancio idrico."),

 (11,"chiaro",0,"L'evoluzione. Alle cinque, nonostante i liquidi: pressione ottantotto su cinquanta, media sessantatre, frequenza centododici, diuresi quindici millilitri all'ora, e lattati di controllo a quattro virgola due."),
 (11,"chiaro",0,"E' uno shock settico: servono vasopressori, e i lattati restano alti. Il medico avvia la noradrenalina e chiede la consulenza intensiva."),
 (11,"chiaro",0,"Il tuo ruolo: un trasferimento sicuro, con monitor, ossigeno, pompe e documentazione. Le consegne SBAR al collega della terapia intensiva. E la documentazione completa, con tutti gli orari."),

 (12,"chiaro",0,"Un pensiero alla figlia. E' stata lei a dare l'allarme: riconoscerlo e' importante, anche per insegnare ai familiari che le loro osservazioni contano."),
 (12,"chiaro",0,"Le dai informazioni chiare entro le tue competenze: quelle cliniche le comunica il medico. Presenza, ascolto, un luogo dove attendere. E la informi del trasferimento, e di come avere notizie."),

 (13,"tenue",0,"Gli errori da intercettare. Pensare: e' anziano, di notte si confonde. Dare l'antipiretico e rivalutare al giro del mattino. Misurare la pressione e non contare la frequenza respiratoria, il parametro piu' precoce."),
 (13,"tenue",0,"Ritardare l'antibiotico per aspettare le emocolture. Chiamare il medico senza dati, con un generico non sta bene. Non documentare gli orari. Dimenticare la diuresi."),

 (14,"chiaro",0,"La prevenzione a monte, che all'orale fa la differenza. Parametri completi con la NEWS2, alla frequenza prevista, e piu' ravvicinati nelle prime ore dal ricovero."),
 (14,"chiaro",0,"Attenzione alla prima dose di antibiotico: tempi e disponibilita' del farmaco sono un punto critico organizzativo. Coinvolgere i familiari nel riconoscere i cambiamenti. E le misure del modulo quattro."),

 (15,"chiaro",0,"[thoughtful] Quando la sepsi si nasconde. Nell'anziano puo' dare solo confusione, una caduta, il rifiuto del cibo, o un'ipotermia invece della febbre. Con il beta-bloccante la tachicardia puo' mancare."),
 (15,"chiaro",0,"Con i corticosteroidi o nell'immunodepresso, febbre e segni locali sono attenuati. Nel diabetico, una glicemia che sale senza motivo puo' essere il primo segnale."),
 (15,"chiaro",0,"Gli antipiretici a orario fanno scomparire la febbre, non l'infezione. E il parametro piu' affidabile resta spesso la frequenza respiratoria: un motivo in piu' per contarla davvero, per un minuto intero."),

 (16,"chiaro",0,"Le domande d'orale. Prima: che cos'e' la NEWS2? Un punteggio di allerta precoce che somma sette elementi: frequenza respiratoria, saturazione, ossigenoterapia, sistolica, frequenza cardiaca, coscienza e temperatura."),
 (16,"chiaro",0,"A ogni fascia di punteggio associa una risposta graduata, fino all'emergenza da sette in su. Seconda: perche' le emocolture prima dell'antibiotico, ma senza ritardarlo?"),
 (16,"chiaro",0,"Perche' l'antibiotico riduce la probabilita' di isolare il germe, ma ogni ora di ritardo aumenta la mortalita'. Si prelevano subito; se non e' possibile in tempi brevi, l'antibiotico non aspetta."),
 (16,"chiaro",0,"Terza: sepsi e shock settico. La sepsi: una disfunzione d'organo da risposta disregolata all'infezione. Lo shock settico chiede vasopressori per una media di almeno sessantacinque, con lattati sopra due nonostante i liquidi."),

 (17,"chiaro",0,"La risposta modello. In corso di polmonite: confusione nuova, tachipnea, desaturazione, ipotensione, tachicardia e oliguria, NEWS2 tredici. Quadro compatibile con sepsi, emergenza tempo-dipendente."),
 (17,"chiaro",0,"Priorita': ossigenazione, perfusione e bundle della prima ora. Valuto con ABCDE e glicemia; ossigeno secondo protocollo, target novantaquattro-novantotto; semiseduto; monitoraggio; attivo subito medico o team con SBAR."),
 (17,"chiaro",0,"Secondo accesso; preparo emocolture, lattati ed esami; verifico la prima dose di antibiotico e la eseguo appena prescritta. Liquidi secondo prescrizione, sorvegliando respiro e saturazione; diuresi oraria."),
 (17,"chiaro",0,"Rivaluto parametri, coscienza e lattati: se l'ipotensione persiste, collaboro ai vasopressori e al trasferimento. Sostengo la familiare, documento ogni intervento con l'orario, garantisco consegne strutturate."),

 (18,"chiaro",0,"I collegamenti. NEWS2 e CAM, due punto tre. SBAR, due punto sette. Emocolture, sei punto sette. ABCDE, dieci punto due. Sepsi e bundle, dieci punto sei. Catetere, tre punto sei. Infezioni correlate, modulo quattro."),

 (19,"profondo",1.2,"[serious] La frase del caso: la confusione nuova e' un parametro vitale."),
 (19,"chiaro",0,"[warm] Nella prossima lezione seguiamo un paziente chirurgico giorno per giorno, dalla sera dell'intervento alla dimissione, incontrando le complicanze quando compaiono. A tra poco."),
]
CAPITOLI = {1:"Apertura",2:"Lo scenario",3:"I primi cinque minuti: ABCDE",4:"Il punteggio NEWS2",5:"Che cosa pensi",
 6:"Le prime azioni",7:"La telefonata SBAR",8:"Il dettaglio che cambia tutto",9:"Il bundle della prima ora",
 10:"La diuresi oraria",11:"L'evoluzione: ore 5",12:"La famiglia",13:"Gli errori che il caso vuole intercettare",
 14:"La prevenzione a monte",15:"Quando la sepsi si nasconde",16:"Le domande d'orale su questo caso",
 17:"La risposta in 15 righe",18:"I collegamenti",19:"Chiusura"}

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
