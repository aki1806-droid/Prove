# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Una stomia e' un'apertura chirurgica che porta all'esterno un tratto di intestino o le vie urinarie. Per la persona e' un cambiamento profondo del corpo, dell'immagine di se' e della vita quotidiana."),
 (1,"chiaro",0,"Per l'infermiere e' un ambito in cui contano insieme la tecnica, presidi, cute, complicanze, e la relazione, perche' una persona che non accetta la stomia difficilmente imparera' a gestirla."),

 (2,"chiaro",0,"I tipi. La colostomia porta all'esterno il colon, di solito sul lato sinistro dell'addome: le feci sono formate o semiformate, perche' il colon ha gia' riassorbito l'acqua."),
 (2,"chiaro",0,"L'ileostomia porta all'esterno l'ileo, di solito a destra: le feci sono liquide e ricche di enzimi digestivi, molto aggressivi per la cute."),
 (2,"chiaro",0,"L'urostomia deriva le urine, per esempio con il condotto ileale secondo Bricker: il flusso e' continuo, e la presenza di muco e' normale, perche' il condotto e' fatto di intestino."),
 (2,"chiaro",0,"Le stomie possono essere temporanee o definitive, terminali o a doppia canna. Sinistra e destra, formate e liquide: i quiz incrociano queste quattro parole."),

 (3,"chiaro",0,"La stomia normale e' rossa, umida, lucida, leggermente protrudente, l'ileostomia di piu', circa due-tre centimetri, per allontanare le feci liquide dalla cute."),
 (3,"chiaro",0,"E non e' dolente al tatto, perche' la mucosa non ha recettori del dolore. Nei primi giorni e' edematosa, e si riduce nelle settimane successive."),
 (3,"chiaro",0,"I segnali d'allarme: una stomia pallida, scura, violacea o nera indica ischemia o necrosi, e va segnalata subito al chirurgo. Poi la retrazione e il sanguinamento abbondante."),

 (4,"chiaro",0,"I presidi. Possono essere monopezzo, con placca e sacca unite, o a due pezzi, con la placca che resta in sede alcuni giorni e la sacca che si cambia."),
 (4,"chiaro",0,"Il tipo di sacca dipende dalla stomia: chiusa per la colostomia con feci formate; aperta, o drenabile, per l'ileostomia, che va svuotata piu' volte al giorno."),
 (4,"chiaro",0,"Con rubinetto e valvola anti-reflusso per l'urostomia, collegabile di notte a una sacca di raccolta piu' grande. Molte sacche hanno un filtro per i gas."),

 (5,"chiaro",0,"Un dettaglio tecnico che determina tutto: la misura del foro della placca. Si misura la stomia con l'apposito misuratore, e si ritaglia la placca due-tre millimetri piu' ampia della stomia."),
 (5,"chiaro",0,"Un foro troppo largo lascia la cute esposta agli effluenti, che la irritano; uno troppo stretto traumatizza la mucosa."),
 (5,"chiaro",0,"E nelle prime settimane si rimisura spesso, perche' l'edema si riduce e la stomia diventa piu' piccola: la placca giusta a due giorni e' larga a due settimane."),

 (6,"chiaro",0,"Il cambio. Si rimuove la placca delicatamente, dall'alto verso il basso, sostenendo la cute con l'altra mano."),
 (6,"chiaro",0,"Si deterge la stomia e la cute con acqua tiepida e garze morbide: niente alcol, niente disinfettanti, niente solventi, che danneggiano la cute e la mucosa."),
 (6,"chiaro",0,"Si asciuga bene, tamponando, perche' sulla cute umida la placca non aderisce. Si ispeziona. Si applica la nuova placca dal basso verso l'alto."),
 (6,"chiaro",0,"E la sacca si svuota quando e' piena per un terzo o meta', perche' una sacca troppo piena si stacca per il peso. Si toglie dall'alto, si mette dal basso: la sequenza e' una domanda da quiz."),

 (7,"chiaro",0,"La complicanza piu' frequente e' la dermatite peristomale: la cute intorno alla stomia si arrossa, si irrita, si lesiona."),
 (7,"chiaro",0,"La causa piu' comune sono le perdite di effluente sotto la placca, soprattutto nell'ileostomia, dove gli enzimi digeriscono letteralmente la cute. Altre cause: gli adesivi, le allergie, le infezioni micotiche."),
 (7,"chiaro",0,"La prevenzione: foro corretto, prodotti barriera, pasta o anelli per riempire le pieghe cutanee, e una rimozione atraumatica della placca."),

 (8,"chiaro",0,"Le complicanze. Precoci: necrosi, edema, sanguinamento, retrazione, distacco fra mucosa e cute, dermatite, e l'alta portata dell'ileostomia."),
 (8,"chiaro",0,"Tardive: l'ernia parastomale, la piu' frequente, un rigonfiamento intorno alla stomia; il prolasso, con la stomia che si allunga all'esterno; la stenosi, il restringimento; la retrazione; i granulomi."),

 (9,"chiaro",0,"L'ileostomia ad alta portata merita attenzione: quando la stomia perde piu' di circa uno virgola cinque-due litri al giorno, la persona rischia disidratazione, perdita di potassio e sodio, fino all'insufficienza renale."),
 (9,"chiaro",0,"Si sorvegliano bilancio idrico, diuresi, sete, crampi, debolezza: il bilancio della lezione tre punto cinque, con una voce in piu' nelle uscite."),
 (9,"chiaro",0,"E un'indicazione educativa controintuitiva: bere solo acqua puo' peggiorare la perdita di sali; servono anche soluzioni con elettroliti, secondo indicazione."),

 (10,"chiaro",0,"Alimentazione e farmaci. Con l'ileostomia: masticare bene, fare attenzione ai cibi molto fibrosi, come mais, frutta secca, sedano, che possono ostruire la stomia, e garantire liquidi e sali."),
 (10,"chiaro",0,"Con la colostomia: attenzione agli alimenti che producono gas e odore."),
 (10,"chiaro",0,"E una nota sui farmaci: nell'ileostomia le compresse a rilascio modificato o gastroresistenti possono non essere assorbite del tutto, e a volte si ritrovano intatte nella sacca. Va segnalato."),

 (11,"chiaro",0,"L'irrigazione: un lavaggio periodico del colon attraverso la stomia, che permette uno svuotamento programmato e, nei periodi fra un'irrigazione e l'altra, di usare un presidio molto piccolo."),
 (11,"chiaro",0,"E' indicata solo nella colostomia sinistra, in persone selezionate e addestrate. Mai nell'ileostomia, che ha un contenuto liquido continuo."),

 (12,"chiaro",0,"L'urostomia. Il flusso e' continuo, quindi il cambio del presidio si fa preferibilmente al mattino, prima di bere, quando la produzione e' minore. Il muco nelle urine e' normale."),
 (12,"chiaro",0,"La sacca ha una valvola anti-reflusso, e di notte si collega a una sacca piu' grande. Si raccomanda un'idratazione abbondante, per prevenire le infezioni."),
 (12,"chiaro",0,"E il campione di urine si preleva direttamente dalla stomia, con tecnica sterile, non dalla sacca: la stessa regola del catetere nella lezione tre punto sei."),

 (13,"chiaro",0,"La parte che distingue un buon infermiere: la preparazione e l'impatto psicologico. Prima dell'intervento programmato si esegue la marcatura della sede della stomia."),
 (13,"chiaro",0,"Si valuta la persona seduta, in piedi e sdraiata, per scegliere un punto visibile alla persona, lontano da pieghe, cicatrici e cinture. Si informa."),
 (13,"chiaro",0,"Poi si lavora sull'immagine corporea, sulla sessualita', sulla vita sociale e lavorativa, coinvolgendo il partner se la persona lo desidera, e indicando le associazioni di persone stomizzate, che sono una risorsa preziosa."),

 (14,"chiaro",0,"L'educazione alla dimissione. Autonomia nel cambio del presidio, verificata facendolo eseguire alla persona o al caregiver, non solo spiegandolo. Riconoscere le complicanze."),
 (14,"chiaro",0,"Alimentazione e idratazione. Come ottenere la fornitura dei presidi, che sono a carico del Servizio Sanitario. E i riferimenti: l'ambulatorio di stomaterapia, a cui rivolgersi per qualunque problema."),

 (15,"chiaro",0,"Il caso. Seconda giornata dopo il confezionamento di una colostomia; la stomia appare violacea scura. Che cosa pensi? Sofferenza ischemica, possibile necrosi."),
 (15,"chiaro",0,"Che cosa fai? Avvisi subito il chirurgo, perche' una necrosi puo' estendersi in profondita' e richiedere un nuovo intervento."),
 (15,"profondo",1.2,"Usi una sacca trasparente per osservare la stomia senza rimuovere il presidio, rilevi i parametri, documenti l'aspetto e l'ora. [serious] Non e' un problema di medicazione: e' un'urgenza chirurgica."),

 (16,"chiaro",0,"In Veneto esistono ambulatori di stomaterapia ospedalieri e territoriali, con infermieri stomaterapisti, e la fornitura dei presidi avviene tramite il distretto, nell'ambito dell'assistenza protesica e integrativa."),
 (16,"chiaro",0,"All'orale, la figura dell'infermiere stomaterapista e' un ottimo esempio di competenza specialistica infermieristica: formazione dedicata, ambulatorio proprio, presa in carico che continua a casa."),

 (17,"chiaro",0,"Ricapitoliamo. Colostomia: sinistra, feci formate. Ileostomia: destra, feci liquide ed enzimi. Urostomia: flusso continuo, muco normale. Stomia rossa e umida; scura e' un allarme."),
 (17,"chiaro",0,"Foro due-tre millimetri piu' ampio. Solo acqua per detergere. L'ernia parastomale e' la complicanza tardiva piu' frequente. Irrigazione solo nella colostomia sinistra."),
 (17,"chiaro",0,"[warm] Nella prossima lezione: i drenaggi, compreso il drenaggio toracico. A tra poco."),
]

CAPITOLI = {1:"Apertura",2:"I tipi",3:"La stomia normale e l'allarme",4:"I presidi",5:"Il foro della placca",6:"Il cambio",
 7:"La dermatite peristomale",8:"Le complicanze",9:"L'alta portata",10:"Alimentazione e farmaci",11:"L'irrigazione",12:"L'urostomia",
 13:"Preparazione e impatto psicologico",14:"L'educazione alla dimissione",15:"Il caso",16:"In Veneto",17:"Chiusura"}

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
