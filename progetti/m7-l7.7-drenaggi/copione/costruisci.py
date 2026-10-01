# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] I drenaggi servono a far uscire dal corpo cio' che non deve accumularsi: sangue, siero, pus, bile, aria."),
 (1,"chiaro",0,"Sono dispositivi semplici, ma cio' che esce dal drenaggio e' un'informazione clinica: quantita' e aspetto raccontano come sta andando il decorso."),
 (1,"chiaro",0,"La seconda parte della lezione e' dedicata al drenaggio toracico, che ha regole sue e domande d'esame precise: l'oscillazione, le bollicine, il non clampare."),

 (2,"chiaro",0,"I drenaggi si dividono in due famiglie. Passivi, che funzionano per capillarita' o per gravita': il Penrose, una lamina morbida che fa scorrere i liquidi nella medicazione o in una sacca."),
 (2,"chiaro",0,"E i drenaggi a caduta, con una sacca posta piu' in basso del punto di uscita. Attivi, o aspirativi, che funzionano con una pressione negativa."),
 (2,"chiaro",0,"Il Redon, con un flacone sottovuoto, e il Jackson-Pratt, con una pompetta a bulbo che si comprime per creare l'aspirazione. Due famiglie, quattro nomi: i quiz li chiedono per nome."),

 (3,"chiaro",0,"La gestione comune. Fissaggio sicuro, senza trazione. Tubo senza pieghe ne' compressioni, anche sotto il paziente."),
 (3,"chiaro",0,"Nei drenaggi a caduta il raccoglitore va sempre piu' in basso del punto di uscita, ma mai a terra."),
 (3,"chiaro",0,"Negli aspirativi si verifica che il vuoto sia mantenuto: il Redon ha un indicatore che si modifica quando il vuoto si esaurisce, il Jackson-Pratt deve restare compresso. E il punto di uscita si medica con tecnica asettica."),

 (4,"chiaro",0,"Misurare e osservare. A ogni turno, o con la frequenza prescritta, si registrano quantita' e caratteristiche: ematico, siero-ematico, sieroso, purulento, biliare, enterico."),
 (4,"chiaro",0,"L'andamento atteso e' una progressiva riduzione e uno schiarimento: dall'ematico al siero-ematico al sieroso. Meno, e piu' chiaro: e' il decorso che va bene."),
 (4,"chiaro",0,"I segnali d'allarme: un aumento improvviso, sangue rosso vivo, possibile emorragia, un cambio di aspetto, bile, contenuto intestinale, pus."),
 (4,"chiaro",0,"E un arresto brusco, che puo' significare un'ostruzione o uno spostamento, non necessariamente un miglioramento. Un drenaggio che smette di colpo e' da controllare, non da festeggiare."),

 (5,"chiaro",0,"Lo svuotamento. Con tecnica asettica. Per il Redon, quando il flacone e' pieno o ha perso il vuoto, si chiude il morsetto e si sostituisce il flacone."),
 (5,"chiaro",0,"Per il Jackson-Pratt, si svuota il bulbo, lo si comprime e si chiude il tappo, cosi' che riprenda l'aspirazione. E si annota la quantita' prima di svuotare."),

 (6,"chiaro",0,"La rimozione avviene su prescrizione. Per i drenaggi aspirativi si interrompe il vuoto prima di sfilarli, altrimenti l'aspirazione trattiene i tessuti e la rimozione diventa dolorosa e traumatica."),
 (6,"chiaro",0,"Si sfila con un movimento continuo e deciso, si verifica l'integrita' della punta, si medica e si sorveglia il punto di uscita."),

 (7,"chiaro",0,"Il drenaggio toracico. Fra i due foglietti della pleura c'e' normalmente una pressione negativa, che tiene il polmone espanso."),
 (7,"chiaro",0,"Se entra aria, lo pneumotorace, o si raccoglie liquido o sangue, versamento, emotorace, il polmone collassa. Il drenaggio serve a far uscire aria e liquidi e a ripristinare la pressione negativa."),
 (7,"chiaro",0,"L'aria sale, quindi per lo pneumotorace il drenaggio si posiziona piu' in alto; il liquido scende, quindi per il versamento piu' in basso."),

 (8,"chiaro",0,"Il sistema piu' usato ha tre camere. La camera di raccolta, graduata, dove si accumulano i liquidi."),
 (8,"chiaro",0,"La camera del sigillo idraulico: una piccola colonna d'acqua che funziona da valvola: l'aria puo' uscire dal torace, ma non rientrare."),
 (8,"chiaro",0,"E la camera del controllo dell'aspirazione, che regola la pressione negativa applicata, con una colonna d'acqua o con un regolatore a secco."),

 (9,"chiaro",0,"Due fenomeni da saper interpretare, e sono le domande d'esame. Il primo: l'oscillazione del livello dell'acqua nel sigillo idraulico, sincrona con il respiro."),
 (9,"chiaro",0,"Nel paziente che respira spontaneamente il livello sale in inspirazione e scende in espirazione. Se l'oscillazione c'e', il sistema e' pervio."),
 (9,"chiaro",0,"Se manca, ci sono due possibilita': il tubo e' occluso o piegato, oppure il polmone si e' completamente riespanso. Quale delle due lo dicono la clinica e la radiografia."),

 (10,"chiaro",0,"Il secondo: le bollicine, il gorgogliamento. Nella camera del sigillo idraulico, le bollicine indicano una perdita d'aria."),
 (10,"chiaro",0,"Se sono intermittenti, in espirazione o con la tosse, e' l'aria che esce dal torace: nello pneumotorace e' atteso, e la loro scomparsa indica che la perdita si sta chiudendo."),
 (10,"chiaro",0,"Se sono continue, potrebbe esserci una perdita nel sistema: si controllano le connessioni e il tubo."),
 (10,"chiaro",0,"Attenzione a non confondere le camere: nella camera di aspirazione a umido, un gorgogliamento lieve e continuo e' il funzionamento normale. Stesse bollicine, camera diversa, significato opposto."),

 (11,"chiaro",0,"Le regole di sicurezza. Il sistema sta sempre piu' in basso del torace, e in verticale, perche' se si rovescia il sigillo idraulico si perde. Nessuna ansa declive del tubo, dove il liquido ristagna e ostacola il drenaggio."),
 (11,"chiaro",0,"E la regola piu' importante: il drenaggio non si clampa di routine, nemmeno durante il trasporto. Clampare un drenaggio in un paziente con perdita d'aria puo' provocare uno pneumotorace iperteso, che e' un'emergenza."),
 (11,"chiaro",0,"Il clampaggio si fa solo nelle situazioni previste dalla procedura, per brevissimo tempo. E si registrano quantita' e caratteristiche, avvisando subito se il drenaggio di sangue supera la soglia indicata dal chirurgo."),

 (12,"chiaro",0,"Che cosa fare se il tubo si scollega dal sistema. L'aria potrebbe rientrare nel torace. Si immerge subito l'estremita' del tubo toracico in un contenitore con acqua sterile o fisiologica, per due-tre centimetri."),
 (12,"chiaro",0,"Si ricrea cosi' un sigillo idraulico improvvisato. Oppure si collega rapidamente un sistema nuovo. Poi si avvisa il medico e si sorvegliano respiro e saturazione."),

 (13,"chiaro",0,"E se il tubo esce dal torace: si copre subito il foro con una medicazione occlusiva, secondo la procedura, spesso fissata su tre lati, cosi' che funzioni da valvola, lasciando uscire l'aria senza farla rientrare."),

 (14,"chiaro",0,"Si chiama il medico e si sorvegliano i segni dello pneumotorace iperteso, da riconoscere subito: dispnea che peggiora, tachicardia, ipotensione, desaturazione, deviazione della trachea verso il lato opposto."),
 (14,"chiaro",0,"Assenza del murmure vescicolare da un lato, turgore giugulare, enfisema sottocutaneo, una crepitazione sotto la cute, come neve schiacciata. E' un'emergenza che il medico tratta con una decompressione immediata."),

 (15,"chiaro",0,"La rimozione del drenaggio toracico avviene su prescrizione, secondo procedura: alla persona si chiede una manovra respiratoria precisa, come la Valsalva, per evitare che l'aria entri durante l'estrazione."),
 (15,"chiaro",0,"Si applica una medicazione occlusiva, si esegue una radiografia di controllo e si sorveglia il respiro nelle ore successive."),

 (16,"chiaro",0,"Il caso. Paziente con drenaggio toracico per pneumotorace; durante il trasporto in radiologia il collega propone di clampare il tubo per sicurezza. Che cosa fai?"),
 (16,"chiaro",0,"Non si clampa: il sistema si trasporta piu' in basso del torace, in verticale, senza clampaggio, perche' con una perdita d'aria il clampaggio puo' causare uno pneumotorace iperteso."),
 (16,"profondo",1.2,"[serious] E' un esempio di comportamento intuitivo ma pericoloso, e l'esame lo sa."),

 (17,"chiaro",0,"Nelle aziende venete la gestione dei drenaggi e' regolata da procedure aziendali, con formazione specifica nei reparti di chirurgia toracica, cardiochirurgia e area critica, dove i sistemi a tre camere sono piu' diffusi."),
 (17,"chiaro",0,"All'orale: oscillazione, bollicine e regola del non clampare. Tre parole, e la commissione sa che il drenaggio toracico l'hai capito."),

 (18,"chiaro",0,"Ricapitoliamo. Drenaggi passivi e attivi. Misurare quantita' e aspetto; aumento improvviso o sangue rosso vivo sono allarmi. Interrompere il vuoto prima della rimozione."),
 (18,"chiaro",0,"Drenaggio toracico: l'oscillazione indica pervieta', le bollicine nel sigillo una perdita d'aria. Sistema sotto il torace, in verticale, e mai clampare di routine. Se si scollega: estremita' in acqua sterile."),
 (18,"chiaro",0,"[warm] Nella prossima lezione ricomponiamo il modulo sette. A tra poco."),
]

CAPITOLI = {1:"Apertura",2:"Due famiglie",3:"La gestione comune",4:"Misurare e osservare",5:"Lo svuotamento",6:"La rimozione",
 7:"Il drenaggio toracico",8:"Le tre camere",9:"L'oscillazione",10:"Le bollicine",11:"Le regole di sicurezza",12:"Se si scollega",
 13:"Se esce dal torace",14:"Lo pneumotorace iperteso",15:"La rimozione del toracico",16:"Il caso",17:"In Veneto",18:"Chiusura"}

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
