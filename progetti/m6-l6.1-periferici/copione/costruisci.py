# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] L'ago-cannula periferico e' il dispositivo invasivo piu' usato in ospedale: la maggior parte dei ricoverati ne ha almeno uno. Proprio per questo e' il piu' sottovalutato."),
 (1,"chiaro",0,"Una cannula e' una porta aperta nel sistema vascolare, e ogni giorno che resta in sede senza motivo e' un rischio senza beneficio."),
 (1,"chiaro",0,"Questa lezione segue il percorso del dispositivo: scelta, inserimento, gestione, complicanze, rimozione. Cinque tappe, e a ogni tappa una domanda da concorso."),

 (2,"chiaro",0,"Il calibro si misura in gauge, e la regola controintuitiva e': piu' basso il numero, piu' grande la cannula. Ogni calibro ha un colore standard."),
 (2,"chiaro",0,"Quattordici arancione, sedici grigio, diciotto verde, venti rosa, ventidue azzurro, ventiquattro giallo: il colore e' sul cono della cannula, e i quiz lo chiedono."),
 (2,"chiaro",0,"Il criterio di scelta: il calibro piu' piccolo compatibile con la terapia. Un calibro piccolo danneggia meno la vena e dura di piu'; i grandi, quattordici e sedici, per infusioni rapide e trasfusioni massive, come nel trauma."),

 (3,"chiaro",0,"La scelta della vena. Nell'adulto si usa l'arto superiore, preferibilmente il non dominante, procedendo dal distale al prossimale: se una vena distale si rompe, resta disponibile il tratto piu' alto."),
 (3,"chiaro",0,"Si evitano le zone di flessione, come la piega del gomito, dove la cannula si piega e si sposta, e con essa cresce il rischio di flebite meccanica."),
 (3,"chiaro",0,"E ci sono tre divieti da ricordare: non si usa l'arto con una fistola artero-venosa per dialisi, non quello omolaterale a uno svuotamento linfonodale ascellare, non l'arto paretico."),
 (3,"chiaro",0,"Gli arti inferiori, nell'adulto, solo in mancanza d'altro, per il rischio di trombosi: sono una scelta di necessita', non di comodita'."),

 (4,"chiaro",0,"La tecnica. Igiene delle mani e guanti. Laccio circa dieci centimetri sopra la sede. Antisepsi della cute, preferibilmente con clorexidina al due per cento in alcol, lasciandola asciugare completamente."),
 (4,"chiaro",0,"Un punto che i quiz chiedono: dopo l'antisepsi non si ripalpa la vena con il dito, altrimenti si ricontamina la sede. Se serve ripalpare, si ripete l'antisepsi."),
 (4,"chiaro",0,"Ago con il bisello verso l'alto, angolo di dieci-trenta gradi. Al reflusso di sangue si fa avanzare la cannula e si sfila il mandrino, attivando il dispositivo di sicurezza."),
 (4,"chiaro",0,"Si toglie il laccio e si lava la cannula con soluzione fisiologica, verificando che scorra senza dolore ne' gonfiore: e' il primo controllo della sede, e si documenta."),

 (5,"chiaro",0,"Il fissaggio. Si usa una medicazione sterile, semipermeabile e trasparente, che permette di vedere la sede senza rimuoverla. Si annota la data di inserimento."),
 (5,"chiaro",0,"E ogni volta che si accede alla linea, rubinetti, connettori, prolunghe, si disinfetta il punto di accesso prima di collegare una siringa: e' il cosiddetto scrub the hub, che vedremo meglio nella lezione sei punto due."),

 (6,"chiaro",0,"Per quanto tempo puo' restare? Per anni la regola e' stata la sostituzione a intervalli fissi. Oggi le evidenze sostengono la sostituzione su indicazione clinica."),
 (6,"chiaro",0,"Si toglie quando compaiono segni di complicanza o quando non serve piu', a condizione che la sede venga valutata regolarmente, almeno a ogni turno e prima di ogni infusione. Si segue la procedura aziendale."),
 (6,"chiaro",0,"Due eccezioni: la cannula inserita in emergenza, senza garanzia di asepsi, si sostituisce appena possibile; quella inutilizzata si rimuove. Le cannule dimenticate, messe per sicurezza, sono una causa evitabile di infezione."),

 (7,"chiaro",0,"Le complicanze. La prima e' la flebite, l'infiammazione della parete della vena. I segni: dolore, eritema, edema, calore, fino al cordone venoso palpabile."),
 (7,"chiaro",0,"Le cause sono di tre tipi: meccaniche, da calibro eccessivo o movimento della cannula; chimiche, da farmaci irritanti, con pH o osmolarita' lontani da quelli del sangue."),
 (7,"chiaro",0,"E batteriche, da contaminazione: la forma piu' pericolosa, e quella che una cannula dimenticata rende piu' probabile."),

 (8,"chiaro",0,"La flebite si valuta con una scala: la piu' diffusa e' la VIP, Visual Infusion Phlebitis, da zero a cinque. A zero la sede e' sana. A uno un segno lieve, un leggero dolore o eritema vicino all'inserzione: si osserva."),
 (8,"chiaro",0,"Da due, quando i segni sono due, dolore, eritema, edema, si rimuove la cannula e si riposiziona in un'altra sede, piu' in alto o nell'altro arto."),
 (8,"chiaro",0,"I gradi successivi descrivono una flebite sempre piu' estesa, con l'indurimento, il cordone palpabile, fino alla tromboflebite. Il numero da ricordare: da due si rimuove."),

 (9,"chiaro",0,"L'infiltrazione e lo stravaso: la soluzione esce dalla vena e finisce nei tessuti. Si parla di infiltrazione se la soluzione non e' vescicante; di stravaso se e' vescicante."),
 (9,"chiaro",0,"Cioe' capace di danneggiare i tessuti fino alla necrosi: chemioterapici, ma anche potassio concentrato, calcio, alcuni mezzi di contrasto, vasopressori."),
 (9,"chiaro",0,"I segni: edema, cute fredda e pallida, tensione, dolore, infusione che rallenta. La cute fredda distingue lo stravaso dalla flebite, dove la cute e' calda."),

 (10,"chiaro",0,"La condotta. Fermare subito l'infusione. Scollegare la linea e aspirare dalla cannula quanto possibile, per togliere dai tessuti quello che si puo'."),
 (10,"chiaro",0,"Rimuovere la cannula; per i farmaci vescicanti seguendo la procedura specifica, che abbiamo visto per gli antiblastici nella lezione cinque punto sette. Sollevare l'arto."),
 (10,"chiaro",0,"Avvisare il medico se la sostanza e' vescicante o l'area e' estesa. Delimitare l'area con un pennarello e documentare. E non riposizionare una nuova cannula a valle della sede stravasata."),

 (11,"chiaro",0,"Le altre complicanze. L'infezione, locale o sistemica: una febbre in un paziente con cannula da giorni impone di guardare la sede. L'ematoma all'inserimento."),
 (11,"chiaro",0,"La trombosi e l'occlusione della cannula, che non si disostruisce forzando con la siringa: spingere un coagulo in circolo e' peggio di perdere una cannula. Si rimuove."),
 (11,"chiaro",0,"Piu' rare l'embolia gassosa e la lesione nervosa, che si manifesta con dolore folgorante o formicolio durante l'inserimento: in quel caso si ritira subito l'ago."),

 (12,"chiaro",0,"Le vene difficili: obesita', edema, chemioterapie ripetute, molti incannulamenti precedenti. Oggi si usa sempre piu' l'ecoguida, che aumenta il successo e riduce i tentativi."),
 (12,"chiaro",0,"E una regola di rispetto per la persona: dopo due tentativi falliti, si chiede l'aiuto di un collega piu' esperto. Insistere danneggia il patrimonio venoso, che per un paziente cronico e' prezioso."),

 (13,"chiaro",0,"Un concetto che distingue: il patrimonio venoso. Nella persona con insufficienza renale cronica le vene dell'avambraccio non dominante vanno preservate, perche' potrebbero servire per una fistola per la dialisi."),
 (13,"chiaro",0,"Si preferiscono le vene del dorso della mano: l'avambraccio resta per la fistola."),
 (13,"chiaro",0,"E nella persona che avra' terapie lunghe o irritanti, si valuta precocemente un accesso piu' stabile, come un Midline o un PICC, invece di consumare una vena dopo l'altra. Ne parliamo nella prossima lezione."),

 (14,"chiaro",0,"La rimozione: igiene delle mani, guanti, si rimuove la medicazione, si sfila la cannula e si comprime con una garza sterile, piu' a lungo nel paziente anticoagulato, come abbiamo detto nella lezione cinque punto cinque."),
 (14,"chiaro",0,"Si controlla l'integrita' della cannula, per escludere che un frammento sia rimasto in vena. Medicazione, e documentazione: data, motivo della rimozione, condizioni della sede."),

 (15,"chiaro",0,"Il caso. Cannula in sede da tre giorni; dolore ed eritema lungo il decorso della vena; l'infusione rallenta; e il paziente non ha piu' terapie endovenose. Che cosa fai?"),
 (15,"chiaro",0,"Due segni: VIP almeno due, quindi si rimuove. E siccome non serve piu', non se ne posiziona un'altra. Si documenta, si sorveglia la sede, e se compaiono febbre o pus si avvisa il medico."),
 (15,"profondo",1.2,"[serious] La domanda nascosta nel caso e' proprio questa: serviva ancora?"),

 (16,"chiaro",0,"Nelle aziende venete la gestione degli accessi vascolari segue procedure aziendali che recepiscono le linee guida internazionali, e in molte realta' esistono team dedicati agli accessi vascolari."),
 (16,"chiaro",0,"Posizionano i dispositivi complessi e fanno le consulenze per le vene difficili. In cartella elettronica: data, sede, calibro e valutazioni della sede. All'orale, citare il team mostra che conosci l'organizzazione reale."),

 (17,"chiaro",0,"Ricapitoliamo. Numero basso, calibro grande; si sceglie il piu' piccolo compatibile. Dal distale al prossimale, arto non dominante, mai l'arto con fistola, con svuotamento ascellare o paretico. Non ripalpare dopo l'antisepsi."),
 (17,"chiaro",0,"[warm] Sostituzione su indicazione clinica, rimozione quando non serve piu'. VIP: da due si rimuove. Infiltrazione se non vescicante, stravaso se lo e'. Nella prossima lezione: gli accessi venosi centrali. A tra poco."),
]

CAPITOLI = {1:"Apertura",2:"Il calibro",3:"La scelta della vena",4:"La tecnica di inserimento",5:"Il fissaggio",
 6:"Quanto resta in sede",7:"La flebite",8:"La scala VIP",9:"Infiltrazione e stravaso",10:"La condotta",
 11:"Le altre complicanze",12:"Le vene difficili",13:"Il patrimonio venoso",14:"La rimozione",15:"Il caso",16:"In Veneto",17:"Chiusura"}

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
