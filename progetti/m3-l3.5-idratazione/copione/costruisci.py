# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Questa lezione e' fatta di numeri: valori degli elettroliti, soglie della diuresi, quantita' delle perdite. I quiz li chiedono in modo secco, e i casi clinici li usano per costruire la trappola."),
 (1,"chiaro",0,"Ma dietro i numeri c'e' un'idea semplice: l'acqua entra, l'acqua esce, e l'infermiere e' la persona che misura la differenza. Tutto il resto della lezione e' un modo di misurarla bene."),

 (2,"chiaro",0,"L'acqua corporea e' circa il sessanta per cento del peso nell'adulto, scende intorno al cinquanta nell'anziano e sale al settantacinque nel lattante: piu' si e' piccoli, piu' si e' fatti d'acqua."),
 (2,"chiaro",0,"Due terzi stanno dentro le cellule, un terzo fuori, fra interstizio e plasma. E' il terzo di fuori quello che si vede nei parametri: pressione, polso, diuresi."),
 (2,"chiaro",0,"Il dato che conta per l'assistenza: l'anziano ha meno riserva idrica, meno sete e una minore capacita' di concentrare le urine. Si disidrata prima, e se ne accorge dopo."),

 (3,"chiaro",0,"Il bilancio idrico confronta entrate e uscite nelle ventiquattro ore. Entrate: bevande, acqua contenuta negli alimenti, circa trecento millilitri di acqua prodotta dal metabolismo."),
 (3,"chiaro",0,"E poi infusioni, nutrizione enterale, farmaci diluiti. Uscite: diuresi, feci, vomito, drenaggi, aspirazioni da sondino. E le perdite insensibili, da cute e respiro."),
 (3,"chiaro",0,"Le perdite insensibili sono dell'ordine di ottocento-mille millilitri al giorno in condizioni normali, e aumentano con febbre, tachipnea e ambiente caldo. Non si raccolgono, ma ci sono."),

 (4,"chiaro",0,"L'errore piu' comune nel bilancio e' dimenticare cio' che non si vede. Le perdite insensibili, appunto. E le entrate piccole: le diluizioni degli antibiotici, i lavaggi dei cateteri, le infusioni che tengono pervia una via."),
 (4,"tenue",0,"Nel paziente cardiopatico o nefropatico, mezzo litro al giorno non contato puo' fare la differenza fra un paziente stabile e un edema polmonare. Il bilancio e' fatto anche di quello che non si versa in un contenitore."),

 (5,"chiaro",0,"Il miglior indicatore del bilancio idrico nel tempo e' il peso. Una variazione rapida di un chilo corrisponde a circa un litro di liquidi. Ma perche' il dato valga, va rilevato con metodo."),
 (5,"chiaro",0,"Stesso orario, stessa bilancia, stessi indumenti, a vescica vuota, prima della colazione. Un peso preso a caso non e' un dato: e' un numero, e con un numero non si decide una terapia."),

 (6,"chiaro",0,"La diuresi. Normale: circa zero virgola cinque-un millilitro per chilo per ora. Oliguria: sotto i quattrocento-cinquecento millilitri nelle ventiquattro ore, o sotto mezzo millilitro per chilo per ora."),
 (6,"chiaro",0,"Ed e' quest'ultimo il valore da usare nel paziente critico, controllato ora per ora. Anuria: sotto i cento millilitri. Poliuria: oltre i duemilacinquecento-tremila."),
 (6,"chiaro",0,"E una regola: un calo della diuresi va segnalato prima di arrivare all'anuria, non dopo. La diuresi che scende e' un segnale precoce, e i segnali precoci valgono solo se qualcuno li legge in tempo."),

 (7,"chiaro",0,"I segni della disidratazione: sete, mucose secche, urine scarse e concentrate, tachicardia, ipotensione ortostatica, confusione, calo di peso. Due avvertenze sull'anziano."),
 (7,"chiaro",0,"La sete puo' mancare: non aspettare che chieda da bere, offri liquidi a intervalli programmati. E il turgore cutaneo e' poco affidabile, perche' la cute anziana perde elasticita'."),
 (7,"chiaro",0,"Se lo valuti, fallo sulla fronte o sullo sterno, non sul dorso della mano. Nell'anziano la disidratazione si presenta spesso come confusione, non come sete."),

 (8,"chiaro",0,"Il contrario: il sovraccarico. Aumento di peso, edemi declivi, e nell'allettato l'edema non va alle caviglie, va alla regione sacrale, quindi va cercato li'."),
 (8,"chiaro",0,"Dispnea, ortopnea, rantoli alle basi, turgore delle giugulari, ipertensione. E' il quadro dello scompenso, e lo riprenderemo nel modulo otto: qui basta riconoscerlo e pesare la persona."),

 (9,"chiaro",0,"Tre famiglie di soluzioni. Isotoniche, come la fisiologica allo zero virgola nove per cento e il Ringer lattato: restano nell'extracellulare ed espandono il volume."),
 (9,"chiaro",0,"Ipotoniche: la glucosata al cinque per cento, una volta metabolizzato il glucosio, si comporta come acqua libera e si distribuisce in tutti i compartimenti. Per questo non serve a ripristinare il volume circolante."),
 (9,"chiaro",0,"Ipertoniche, per usi specifici e sempre su prescrizione. E' una domanda classica: la glucosata al cinque per cento non espande il volume, e chi la sceglie per uno shock ha sbagliato soluzione, non solo quantita'."),

 (10,"chiaro",0,"Il sodio: centotrentacinque-centoquarantacinque milliequivalenti per litro. L'iponatriemia da' sintomi soprattutto neurologici: confusione, cefalea, nausea, fino alle convulsioni. Il cervello e' il primo a soffrire."),
 (10,"chiaro",0,"L'ipernatriemia da' sete, agitazione, confusione, ed e' tipica dell'anziano disidratato. La regola che vale per entrambe: la correzione dev'essere lenta."),
 (10,"profondo",1.2,"[serious] Correggere troppo in fretta un'iponatriemia cronica puo' causare una sindrome da demielinizzazione osmotica, un danno neurologico grave. L'infermiere garantisce la velocita' prescritta e i controlli ravvicinati."),

 (11,"chiaro",0,"Il potassio: tre virgola cinque-cinque milliequivalenti per litro, un intervallo stretto, perche' il potassio governa il ritmo cardiaco. Mezzo punto fuori e il cuore se ne accorge."),
 (11,"chiaro",0,"L'ipokaliemia da' debolezza, crampi, ileo, aritmie, e potenzia la tossicita' della digitale; le cause tipiche sono diuretici, vomito, diarrea."),
 (11,"chiaro",0,"L'iperkaliemia da' aritmie, onde T appuntite, bradicardia fino all'arresto; le cause sono insufficienza renale e farmaci come ACE-inibitori e diuretici risparmiatori di potassio."),

 (12,"chiaro",0,"Una trappola che riguarda direttamente l'infermiere: la pseudo-iperkaliemia. Se il campione e' emolizzato, i globuli rossi rotti liberano potassio e il valore risulta falsamente alto."),
 (12,"chiaro",0,"Le cause sono nostre: laccio tenuto troppo a lungo, pugno aperto e chiuso piu' volte, ago sottile, aspirazione vigorosa, provetta agitata forte. Un potassio alto e inatteso in un paziente asintomatico va ricontrollato."),

 (13,"chiaro",0,"E il farmaco piu' pericoloso di questa lezione: il cloruro di potassio concentrato, oggetto della Raccomandazione ministeriale numero uno, la prima mai pubblicata, e non a caso."),
 (13,"profondo",1.2,"[serious] Mai in bolo: una fiala di potassio in bolo endovenoso puo' arrestare il cuore. Su questa regola non esistono eccezioni, e nessuna urgenza la sospende."),
 (13,"chiaro",0,"Sempre diluito, alla concentrazione prevista dalla procedura, con velocita' controllata tramite pompa, conservazione separata dagli altri farmaci e doppio controllo indipendente."),

 (14,"chiaro",0,"Il calcio: otto virgola cinque-dieci virgola cinque milligrammi per decilitro. L'ipocalcemia e' quella da conoscere bene: formicolii intorno alla bocca e alle dita, tetania."),
 (14,"chiaro",0,"I segni di Chvostek, contrazione dei muscoli facciali percuotendo davanti all'orecchio, e di Trousseau, spasmo carpale gonfiando il bracciale dello sfigmomanometro, fino al laringospasmo."),
 (14,"chiaro",0,"Il contesto tipico e' il dopo tiroidectomia, per lesione delle paratiroidi: lo vedremo nel modulo nove. L'ipercalcemia da' stipsi, poliuria, confusione, e si vede piu' spesso in oncologia."),

 (15,"chiaro",0,"Ritorniamo all'anziano, perche' qui l'infermiere fa la differenza vera. Offrire liquidi a intervalli programmati, non aspettare la richiesta. Rispettare le preferenze: acqua, te', brodo, gelatine, frutta."),
 (15,"chiaro",0,"Tenere i liquidi visibili e raggiungibili, non sul comodino dietro la persona. Attenzione ai diuretici nelle giornate calde. E un errore frequente da riconoscere: la persona che beve poco per paura di bagnarsi."),
 (15,"chiaro",0,"Ridurre i liquidi peggiora la situazione: urine piu' concentrate, piu' irritazione vescicale, piu' infezioni. Si lavora sull'accompagnamento in bagno, non sulla sete."),

 (16,"chiaro",0,"Un caso tipico. Anziano, confuso da ieri, mucose secche, diuresi di quattrocento millilitri nelle ventiquattro ore, sodio centocinquantadue. La risposta strutturata parte dai dati."),
 (16,"chiaro",0,"Dati: oliguria, ipernatriemia, segni di disidratazione, confusione che e' probabilmente conseguenza e non causa. Problema prioritario: disidratazione con alterazione dello stato di coscienza."),
 (16,"chiaro",0,"Interventi: avviso il medico, bilancio idrico, peso, parametri, sorveglianza neurologica e del rischio di caduta, idratazione secondo prescrizione con sodio corretto lentamente. Valutazione: diuresi oraria, coscienza, esami."),

 (17,"chiaro",0,"Nelle aziende del servizio sanitario veneto il bilancio idrico e la diuresi sono registrati nella cartella clinica elettronica, con calcolo automatico del saldo: il conto lo fa il sistema, i dati li metti tu."),
 (17,"chiaro",0,"Il potassio concentrato e' regolato da procedure aziendali che recepiscono la Raccomandazione numero uno: armadi dedicati, preparazioni pronte all'uso, etichette evidenti. All'orale, citarle mostra che conosci il reparto."),

 (18,"chiaro",0,"I numeri da portare via. Sodio centotrentacinque-centoquarantacinque. Potassio tre virgola cinque-cinque. Calcio otto virgola cinque-dieci virgola cinque."),
 (18,"chiaro",0,"Diuresi normale mezzo millilitro per chilo per ora; oliguria sotto quattrocento-cinquecento nelle ventiquattro ore; anuria sotto cento. Un chilo, un litro: e' la frase che i corsisti fotografano."),
 (18,"chiaro",0,"[warm] E tre regole: il potassio mai in bolo; il sodio si corregge lentamente; all'anziano l'acqua si offre, non si aspetta che la chieda. Nella prossima lezione: eliminazione urinaria e cateterismo vescicale. A tra poco."),
]

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1:"Apertura",2:"L'acqua nel corpo",3:"Entrate e uscite",4:"L'errore piu' comune",
 5:"Il peso",6:"La diuresi",7:"La disidratazione",8:"Il sovraccarico",9:"Le soluzioni",
 10:"Il sodio",11:"Il potassio",12:"La falsa iperkaliemia",13:"Il cloruro di potassio",
 14:"Il calcio",15:"L'anziano e i liquidi",16:"Il caso d'esame",17:"In Veneto",18:"Chiusura"}
# Deroghe al limite di 225 caratteri, dichiarate una per una con il motivo:
# la voce e' gia' generata e non ha fatto pausa dove il copione staccava, e il
# confine si mette dove la voce si ferma, non dove il copione vorrebbe.
DEROGHE = {}
ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1:"Apertura",2:"Il principio guida",3:"Indicazioni e controindicazioni",4:"Le vie di accesso",
 5:"Stomaco si', digiuno no",6:"Quando non si procede",7:"Il metodo NEX",8:"Il passaggio faringeo",
 9:"Quando interrompere",10:"La verifica",11:"Verificare sempre",12:"Le modalita'",13:"Le regole di sicurezza",
 14:"I farmaci per sonda",15:"Se non si puo' frantumare",16:"Le complicanze",17:"La sindrome da rialimentazione",
 18:"PEG: la gestione",19:"Se la PEG si sfila",20:"La volonta' della persona"}
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
