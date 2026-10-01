# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Le medicazioni avanzate sono decine, con nomi commerciali diversi in ogni azienda. Studiarle per marca e' inutile."),
 (1,"chiaro",0,"Si studiano per classe, e ogni classe risponde a un problema preciso della lesione: troppo secca, troppo bagnata, necrotica, infetta."),
 (1,"chiaro",0,"La scelta della medicazione discende dalla valutazione con il TIME della lezione sette punto uno: prima la domanda, poi la risposta che sta nell'armadio."),

 (2,"chiaro",0,"Il principio che sta alla base di tutte le medicazioni avanzate: una lesione guarisce piu' rapidamente in un ambiente umido controllato."),
 (2,"chiaro",0,"Una lesione secca forma una crosta e rallenta la migrazione delle cellule; una lesione troppo bagnata macera la cute intorno."),
 (2,"chiaro",0,"La medicazione serve a mantenere l'equilibrio: aggiungere umidita' dove manca, assorbirla dove eccede. Tutte le classi che seguono fanno una di queste due cose, o proteggono."),

 (3,"chiaro",0,"Le classi. I film in poliuretano: trasparenti, semipermeabili, lasciano passare gas e vapore, non liquidi ne' batteri."),
 (3,"chiaro",0,"Si usano per proteggere la cute, sugli stadi uno, su lesioni superficiali senza essudato, come medicazione secondaria e per fissare gli accessi vascolari."),
 (3,"chiaro",0,"Non assorbono: su una lesione essudante provocano macerazione. Il film si vede attraverso, e questo e' il suo pregio: la lesione si controlla senza scoprirla."),

 (4,"chiaro",0,"Gli idrocolloidi: medicazioni occlusive che a contatto con l'essudato formano un gel. Indicati per lesioni con essudato scarso o moderato."),
 (4,"chiaro",0,"Favoriscono il debridement autolitico, cioe' lo scioglimento del tessuto devitalizzato da parte degli enzimi della lesione stessa."),
 (4,"chiaro",0,"Alla rimozione il gel ha un odore caratteristico e un aspetto giallastro che non va scambiato per pus: lo abbiamo detto nella lezione sette punto uno, l'odore si valuta dopo la detersione."),
 (4,"chiaro",0,"Non si usano su lesioni infette, l'occlusione favorisce i batteri anaerobi, ne' molto essudanti."),

 (5,"chiaro",0,"Gli idrogel: contengono molta acqua e cedono umidita'. Sono indicati sulle lesioni secche, sulla necrosi e sullo slough da ammorbidire, perche' favoriscono il debridement autolitico."),
 (5,"chiaro",0,"Richiedono una medicazione secondaria, e vanno applicati solo sul fondo, proteggendo i margini dalla macerazione: l'acqua che serve al fondo fa male alla cute intorno."),

 (6,"chiaro",0,"Gli alginati, di calcio, derivati dalle alghe: altissimo assorbimento, formano un gel, e hanno proprieta' emostatiche, utili sulle lesioni che sanguinano."),
 (6,"chiaro",0,"Le idrofibre, in carbossimetilcellulosa: anch'esse ad alto assorbimento, trattengono l'essudato in verticale, proteggendo i margini."),
 (6,"chiaro",0,"Si usano su lesioni molto essudanti e per riempire cavita'. Mai su lesioni secche, che seccherebbero ancora di piu'. Richiedono una medicazione secondaria."),

 (7,"chiaro",0,"Le schiume in poliuretano: assorbono essudato moderato o abbondante, offrono protezione meccanica e ammortizzazione, e molte hanno un bordo in silicone che si rimuove senza traumi."),
 (7,"chiaro",0,"Si usano anche in prevenzione, su sacro e talloni, e sotto i dispositivi, come abbiamo visto nella lezione sette punto due."),

 (8,"chiaro",0,"Le medicazioni antimicrobiche: all'argento, allo iodio, al PHMB, al miele. Si usano quando c'e' un'infezione locale o il sospetto di biofilm, e per periodi limitati."),
 (8,"chiaro",0,"Si rivaluta indicativamente dopo due settimane, e se l'infezione e' risolta si torna a una medicazione non antimicrobica. Non si usano a scopo preventivo, ne' all'infinito."),

 (9,"chiaro",0,"Le altre classi. Il carbone attivo, per il controllo dell'odore, importante nelle lesioni neoplastiche e per la dignita' della persona. Le interfacce non aderenti, che proteggono la granulazione alla rimozione."),
 (9,"chiaro",0,"Le medicazioni bioattive, collagene, acido ialuronico, modulatori delle proteasi, per le lesioni ferme nonostante una gestione corretta."),
 (9,"chiaro",0,"E le garze tradizionali, che non vanno messe a contatto con il fondo: aderiscono e, alla rimozione, strappano il tessuto nuovo. E' il trauma da medicazione della lezione sette punto uno."),

 (10,"chiaro",0,"L'albero decisionale, che e' il cuore della lezione. Lesione secca o necrotica: idrogel. Slough con poco essudato: idrocolloide o idrogel."),
 (10,"chiaro",0,"Molto essudante: alginato, idrofibra, schiuma. Infetta: antimicrobica, e mai occlusiva. Granulazione con poco essudato: schiuma sottile o idrocolloide."),
 (10,"chiaro",0,"Epitelizzazione: film o idrocolloide sottile. Cavita': si riempie con alginato o idrofibra, senza stipare, perche' comprimere il fondo lo danneggia."),
 (10,"chiaro",0,"Sette righe, e ogni riga e' una risposta d'esame. Il quiz descrive la lesione, tu rispondi con la classe: non con la marca, con la classe."),

 (11,"chiaro",0,"La terapia a pressione negativa, o NPWT. Nella lesione si posiziona una schiuma o una garza, si sigilla con un film, e una pompa applica una pressione subatmosferica."),
 (11,"chiaro",0,"Spesso intorno a meno centoventicinque millimetri di mercurio, in modo continuo o intermittente. Gli effetti: rimuove l'essudato, riduce l'edema, stimola la granulazione e avvicina i margini."),
 (11,"chiaro",0,"La medicazione si cambia ogni quarantotto-settantadue ore. Le controindicazioni: necrosi non rimossa, osteomielite non trattata, neoplasia nella lesione, vasi, organi o anastomosi esposti, fistole non esplorate."),

 (12,"chiaro",0,"Cautela nel paziente anticoagulato, per il rischio di sanguinamento, che durante la terapia va cercato nel contenitore. La gestione: gli allarmi di perdita del sigillo e di contenitore pieno."),
 (12,"chiaro",0,"E una regola: se la pompa resta spenta oltre il tempo previsto dalla procedura, spesso due ore, la medicazione va rimossa: una schiuma chiusa senza aspirazione e' un ambiente favorevole ai batteri."),

 (13,"chiaro",0,"Il debridement, la rimozione del tessuto non vitale. Autolitico, con idrogel e idrocolloidi: lento, selettivo, indolore, di competenza infermieristica. Enzimatico, con prodotti specifici su prescrizione."),
 (13,"chiaro",0,"Meccanico, per esempio con garze che si seccano e strappano il tessuto: non selettivo e doloroso, oggi sconsigliato. Biologico, con larve sterili."),
 (13,"chiaro",0,"Con taglienti: il debridement conservativo puo' essere eseguito da un infermiere formato, secondo le procedure aziendali; quello chirurgico e' medico."),

 (14,"chiaro",0,"E quando non si fa debridement. Sull'escara secca e stabile al tallone, senza infezione, come abbiamo visto. Sull'arto ischemico non rivascolarizzato, perche' il tessuto rimosso non puo' ricrescere e la lesione si allarga."),
 (14,"chiaro",0,"E nella persona in fine vita, quando l'obiettivo non e' la guarigione ma il comfort: gestione dell'odore, dell'essudato e del dolore. Lo vedremo nel modulo undici."),

 (15,"chiaro",0,"Il caso. Lesione sacrale stadio tre, fondo con slough per il sessanta per cento, essudato abbondante, cute perilesionale macerata, nessun segno di infezione."),
 (15,"chiaro",0,"Con il TIME: tessuto non vitale da rimuovere; infezione assente; umidita' in eccesso; margini a rischio per la macerazione. Quattro lettere, quattro risposte."),
 (15,"chiaro",0,"La scelta: detersione, protezione della cute perilesionale con un prodotto barriera, e una medicazione ad alto assorbimento, alginato o idrofibra con una schiuma come secondaria, valutando un debridement per lo slough."),
 (15,"profondo",1.2,"[serious] E naturalmente scarico e nutrizione: la medicazione da sola non guarisce una lesione da pressione."),

 (16,"chiaro",0,"In Veneto ogni azienda ha un prontuario delle medicazioni avanzate, con indicazioni d'uso, e infermieri esperti in wound care che fanno da consulenti. In alcuni percorsi la NPWT prosegue anche a domicilio."),
 (16,"chiaro",0,"All'orale, citare la scelta per classe in base al TIME mostra metodo: la commissione non vuole il nome del prodotto, vuole il ragionamento."),

 (17,"chiaro",0,"Ricapitoliamo. Ambiente umido controllato. Secca: idrogel. Essudante: alginato, idrofibra, schiuma. Infetta: antimicrobica, mai occlusiva, e per periodi limitati."),
 (17,"chiaro",0,"NPWT: circa meno centoventicinque, cambio ogni quarantotto-settantadue ore, e se la pompa resta spenta troppo a lungo si rimuove. Debridement: autolitico, enzimatico, con taglienti, mai sull'escara stabile del tallone."),
 (17,"chiaro",0,"[warm] Nella prossima lezione: le stomie. A tra poco."),
]

CAPITOLI = {1:"Apertura",2:"L'ambiente umido",3:"I film",4:"Gli idrocolloidi",5:"Gli idrogel",6:"Alginati e idrofibre",7:"Le schiume",
 8:"Le antimicrobiche",9:"Le altre classi",10:"L'albero decisionale",11:"La pressione negativa",12:"NPWT: controindicazioni e gestione",
 13:"Il debridement",14:"Quando non si fa",15:"Il caso",16:"In Veneto",17:"Chiusura"}

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
