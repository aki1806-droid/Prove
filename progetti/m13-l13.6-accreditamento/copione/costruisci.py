# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Due temi che sembrano lontani, ma che hanno un filo comune: la garanzia per il cittadino. Da una parte l'autorizzazione e l'accreditamento delle strutture, dall'altra la prevenzione."),
 (1,"chiaro",0,"Autorizzazione e accreditamento garantiscono che le strutture abbiano i requisiti per curare in sicurezza. La prevenzione garantisce che la salute venga protetta prima che serva curarla. Vediamo come li organizza il Veneto."),

 (2,"chiaro",0,"Il riferimento e' la legge regionale del sedici agosto duemiladue, numero ventidue, sull'autorizzazione e l'accreditamento delle strutture sanitarie, socio-sanitarie e sociali."),
 (2,"chiaro",0,"Coerentemente con il modello veneto, che tiene insieme il sanitario e il sociale, la legge abbraccia tutti e tre gli ambiti. E si applica sia alle strutture pubbliche, sia a quelle private."),
 (2,"chiaro",0,"I requisiti sono definiti dalla Giunta regionale. E non si ottengono una volta per sempre: la legge prevede verifiche e rinnovi periodici, per controllare che i requisiti restino nel tempo."),

 (3,"chiaro",0,"Il percorso ha piu' fasi. La prima e' l'autorizzazione alla realizzazione: serve per costruire una struttura nuova, per ampliarne una esistente o per trasformarla."),
 (3,"chiaro",0,"La seconda e' l'autorizzazione all'esercizio. Verifica i requisiti minimi, strutturali, tecnologici e organizzativi, che una struttura deve avere per poter operare."),
 (3,"chiaro",0,"La terza e' l'accreditamento istituzionale. Verifica requisiti ulteriori, di qualita', ed e' la condizione per lavorare per conto del Servizio Sanitario Regionale."),
 (3,"chiaro",0,"Poi, per erogare effettivamente prestazioni a carico del servizio pubblico, servono gli accordi contrattuali. Essere accreditati, da solo, non basta."),
 (3,"chiaro",0,"E' la traduzione regionale di quanto hai visto nella lezione dodici punto sette: requisiti minimi per l'autorizzazione, requisiti ulteriori per l'accreditamento. Due livelli da non confondere."),

 (4,"chiaro",0,"Perche' riguarda l'infermiere? Perche' i requisiti di accreditamento comprendono il personale, con le dotazioni minime e le qualifiche, e le procedure e i protocolli documentati."),
 (4,"chiaro",0,"E poi la formazione, la gestione del rischio, i sistemi di qualita'. Durante le verifiche, i valutatori controllano che le procedure esistano, che siano applicate e che gli operatori le conoscano."),
 (4,"chiaro",0,"[serious] Una procedura che nessuno conosce non e' un requisito soddisfatto. Per questo l'accreditamento non riguarda solo la direzione: riguarda anche chi lavora ogni giorno in reparto."),

 (5,"chiaro",0,"[thoughtful] Passiamo alla prevenzione. E' organizzata nei Dipartimenti di Prevenzione delle Aziende ULSS, con servizi che conviene conoscere per sigla."),
 (5,"chiaro",0,"Il SISP, Servizio Igiene e Sanita' Pubblica, che si occupa di vaccinazioni e di malattie infettive. E il SIAN, il Servizio Igiene degli Alimenti e della Nutrizione."),
 (5,"chiaro",0,"Lo SPISAL, il servizio di prevenzione, igiene e sicurezza negli ambienti di lavoro, che hai visto nella lezione dodici punto sei. E poi i servizi veterinari."),
 (5,"chiaro",0,"Al Dipartimento fanno capo anche gli screening, in raccordo con i centri screening, e la promozione della salute. Sei funzioni diverse, in un'unica struttura di ogni ULSS."),

 (6,"chiaro",0,"La programmazione si basa sul Piano Regionale della Prevenzione, che attua in Veneto il Piano Nazionale della Prevenzione. E' uno degli strumenti di programmazione della Regione."),
 (6,"chiaro",0,"Contiene programmi sugli stili di vita, cioe' fumo, alcol, alimentazione e attivita' fisica. E poi su ambiente e salute, sicurezza sul lavoro, malattie infettive e vaccinazioni."),
 (6,"chiaro",0,"E ancora sugli screening oncologici e sugli incidenti domestici e stradali. E adotta l'approccio One Health, che considera insieme la salute delle persone, degli animali e dell'ambiente."),

 (7,"chiaro",0,"Gli screening oncologici, con i riferimenti nazionali. Mammella: una mammografia ogni due anni, alle donne fra i cinquanta e i sessantanove anni. Rientra nei livelli essenziali di assistenza."),
 (7,"chiaro",0,"Cervice uterina: donne fra i venticinque e i sessantaquattro anni. Il Pap test ogni tre anni fra i venticinque e i ventinove, e il test HPV ogni cinque anni dai trenta ai sessantaquattro."),
 (7,"chiaro",0,"Colon-retto: la ricerca del sangue occulto nelle feci ogni due anni, fra i cinquanta e i sessantanove anni. Sono tutti programmi organizzati, con invito attivo, e gratuiti."),
 (7,"chiaro",0,"Il Piano nazionale della prevenzione prevede poi alcune estensioni delle fasce d'eta', che le Regioni applicano in modo diverso. Ed e' proprio qui che il Veneto ha fatto una scelta sua."),

 (8,"chiaro",0,"In Veneto i tre programmi sono gratuiti, con una lettera d'invito dall'ULSS di residenza. E la Regione ha esteso lo screening del colon-retto anche alla fascia fra i settanta e i settantaquattro anni."),
 (8,"chiaro",0,"Per la cervice si usa il test HPV come test primario, dai trent'anni. In caso di positivita', la persona entra in percorsi di approfondimento e nei PDTA."),
 (8,"chiaro",0,"Le fasce possono cambiare, e conviene verificarle nella propria ULSS. Per l'esame ricorda i riferimenti nazionali, e l'estensione veneta del colon-retto fino ai settantaquattro anni."),

 (9,"chiaro",0,"L'infermiere negli screening. Informa e promuove l'adesione, contrastando la paura e la disinformazione. E partecipa alla gestione degli inviti e dei richiami."),
 (9,"chiaro",0,"Esegue attivita' come i prelievi, o la preparazione alla colonscopia della lezione otto punto cinque. Comunica gli esiti, e accompagna la persona negli approfondimenti."),
 (9,"chiaro",0,"E presta attenzione alle persone che aderiscono meno: fragili, stranieri, con bassa alfabetizzazione sanitaria. Un test positivo genera ansia, e la comunicazione fa la differenza."),

 (10,"chiaro",0,"Le vaccinazioni. Il riferimento nazionale e' il Piano Nazionale di Prevenzione Vaccinale, che in Veneto si traduce nel calendario vaccinale regionale."),
 (10,"chiaro",0,"Per i minori da zero a sedici anni, dieci vaccinazioni sono obbligatorie. Lo stabilisce la legge centodiciannove del duemiladiciassette: un numero e un anno da ricordare insieme."),
 (10,"chiaro",0,"Molte altre sono raccomandate, per adulti, anziani, gruppi a rischio e operatori sanitari: influenza, epatite B, morbillo, pertosse in gravidanza, pneumococco, herpes zoster."),
 (10,"chiaro",0,"Le vaccinazioni si eseguono nei centri vaccinali delle ULSS. Li' l'infermiere fa counseling, somministra il vaccino e sorveglia le eventuali reazioni."),

 (11,"chiaro",0,"L'epidemiologia regionale. Le funzioni epidemiologiche, cioe' il sistema epidemiologico regionale, il Registro Tumori del Veneto e i registri di patologia, sono oggi in Azienda Zero."),
 (11,"chiaro",0,"A queste si aggiungono le sorveglianze: quelle sulle malattie infettive, e le indagini PASSI e PASSI d'Argento, che raccolgono informazioni sugli stili di vita."),
 (11,"chiaro",0,"I dati orientano la programmazione, e confluiscono nella Relazione Socio Sanitaria, che la Regione pubblica ogni anno. Senza dati, la prevenzione va alla cieca."),

 (12,"chiaro",0,"[curious] Il caso d'esame. Una donna di cinquantadue anni ti dice che non fa la mammografia di screening, perche' se c'e' qualcosa preferisce non saperlo. Che cosa fai?"),
 (12,"chiaro",0,"Non la giudichi, e non insisti facendo leva sulla paura. Ascolti e accogli la sua preoccupazione. Poi le spieghi, con parole semplici, a che cosa serve lo screening."),
 (12,"chiaro",0,"Serve a trovare eventuali lesioni in fase precoce, quando le cure sono piu' efficaci e meno pesanti. Le dici che l'esame e' gratuito e con invito attivo, e verifichi che abbia ricevuto la lettera."),
 (12,"chiaro",0,"E' il colloquio motivazionale della lezione undici punto sei, applicato alla prevenzione. E alla fine, qualunque cosa scelga, rispetti comunque la sua decisione."),

 (13,"chiaro",0,"Un cenno alla sicurezza alimentare e ambientale. Il SIAN e i servizi veterinari controllano alimenti e allevamenti, e prevengono le tossinfezioni alimentari."),
 (13,"chiaro",0,"Vigilano sulle acque potabili e sull'igiene della nutrizione nelle mense di scuole, ospedali e strutture. Fanno parte della prevenzione collettiva, il primo livello dei LEA."),

 (14,"chiaro",0,"La tabella. Legge regionale ventidue del duemiladue, nei tre ambiti. Le fasi: realizzazione, esercizio con i requisiti minimi, accreditamento con i requisiti ulteriori, e poi gli accordi."),
 (14,"chiaro",0,"Il Dipartimento di Prevenzione: SISP, SIAN, SPISAL, veterinari. Il Piano Regionale della Prevenzione. Gli screening di mammella, cervice e colon-retto, con l'estensione veneta fino ai settantaquattro anni."),
 (14,"chiaro",0,"La legge centodiciannove del duemiladiciassette, con le dieci vaccinazioni obbligatorie da zero a sedici anni. E il Registro Tumori, oggi in Azienda Zero."),

 (15,"profondo",1.2,"[serious] La frase della lezione: la prevenzione e' la cura che non si vede. I suoi successi sono le malattie che non si verificano, e proprio per questo vanno raccontati."),

 (16,"chiaro",0,"[warm] Nella prossima lezione: la sanita' digitale veneta, con il Fascicolo Sanitario Elettronico, Sanita' chilometro zero, le ricette, le prenotazioni, e le responsabilita' di chi usa gli applicativi. A tra poco."),
]
CAPITOLI = {1:"Apertura",2:"La legge regionale 22 del 2002",3:"Le fasi",4:"Perche' riguarda l'infermiere",5:"Il Dipartimento di Prevenzione",
 6:"Il Piano Regionale della Prevenzione",7:"Gli screening: i riferimenti nazionali",8:"Gli screening in Veneto",9:"L'infermiere negli screening",
 10:"Le vaccinazioni",11:"L'epidemiologia regionale",12:"Il caso d'esame",13:"La sicurezza alimentare e ambientale",14:"La tabella",
 15:"La frase della lezione",16:"Chiusura"}

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
