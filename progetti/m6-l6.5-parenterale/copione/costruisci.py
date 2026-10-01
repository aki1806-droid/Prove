# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Nella lezione tre punto quattro abbiamo stabilito un principio: se l'intestino funziona, si usa l'intestino."),
 (1,"chiaro",0,"La nutrizione parenterale e' cio' che si fa quando l'intestino non puo' essere usato, o non basta. E' una terapia potente e complessa, con rischi infettivi e metabolici precisi."),
 (1,"chiaro",0,"E la sua sicurezza dipende in larga parte dalla gestione infermieristica: la via, la sacca, la pompa, il monitoraggio."),

 (2,"chiaro",0,"Le indicazioni. Un intestino non utilizzabile: occlusione, ileo prolungato, ischemia, fistole ad alta portata, intestino corto, mucosite grave."),
 (2,"chiaro",0,"Oppure una nutrizione enterale insufficiente: la parenterale si aggiunge. E il contrario: se l'intestino funziona, la parenterale non e' indicata: meno fisiologica, piu' costosa, piu' rischiosa."),

 (3,"chiaro",0,"Due modalita'. La parenterale centrale usa sacche con osmolarita' superiore a circa novecento milliosmoli, che solo un vaso di grosso calibro tollera: richiede un CVC o un PICC, con un lume dedicato."),
 (3,"chiaro",0,"La parenterale periferica usa sacche meno concentrate, sotto i novecento, per periodi brevi, attraverso una vena periferica o un Midline, con le attenzioni alla flebite della lezione sei punto uno."),
 (3,"chiaro",0,"La regola: la via la decide l'osmolarita' della sacca, scritta in etichetta. Prima di collegare, si legge."),
 (3,"chiaro",0,"Ricordi il Midline della lezione sei punto due: mai una sacca centrale in un Midline. La punta e' periferica, e novecento milliosmoli in una vena periferica sono una flebite chimica."),

 (4,"chiaro",0,"Le sacche. Binarie, con glucosio e aminoacidi; ternarie, o tre in uno, con anche i lipidi, l'emulsione bianca che vedremo fra poco."),
 (4,"chiaro",0,"Possono essere industriali, spesso multicamera, che si attivano rompendo i setti fra le camere subito prima dell'uso: se dimenticato, si infonde una sola componente, per esempio solo glucosio."),
 (4,"chiaro",0,"Oppure allestite in farmacia su misura. Le vitamine e gli oligoelementi si aggiungono secondo procedura, in condizioni asettiche, di norma non in reparto."),

 (5,"chiaro",0,"Prima di collegare, i controlli. Prescrizione, paziente, composizione, via prevista, scadenza. Integrita' della sacca. Setti rotti e contenuto miscelato. Le sette G, per una sacca che vale un farmaco ad alto rischio."),
 (5,"chiaro",0,"E l'aspetto dell'emulsione lipidica. Un leggero affioramento biancastro omogeneo, che si rimescola capovolgendo la sacca, e' accettabile."),
 (5,"chiaro",0,"La comparsa di gocce d'olio o di uno strato giallastro separato indica la rottura dell'emulsione, e la sacca non si usa: i lipidi non piu' emulsionati sono un rischio embolico."),
 (5,"chiaro",0,"E' un controllo a occhio, e vale quanto quelli sull'etichetta: una sacca rotta e' una sacca da restituire alla farmacia, non da provare."),

 (6,"chiaro",0,"La somministrazione. Sempre con pompa volumetrica. Su un lume dedicato: niente farmaci, niente prelievi da quel lume, perche' ogni accesso e' un rischio di contaminazione e di incompatibilita'."),
 (6,"chiaro",0,"Filtro secondo procedura. Il deflussore si cambia ogni ventiquattro ore se la sacca contiene lipidi: i lipidi, ricordi, favoriscono la crescita batterica."),
 (6,"chiaro",0,"La sacca si infonde nel tempo previsto, di solito entro ventiquattro ore dall'apertura. E la linea si etichetta: nutrizione parenterale, data e ora di apertura."),

 (7,"chiaro",0,"Una regola specifica della parenterale: la gradualita'. Si avvia a velocita' ridotta e si aumenta secondo prescrizione, nell'arco di ore o giorni secondo il rischio della persona."),
 (7,"profondo",1.2,"[serious] E non si interrompe bruscamente: l'organismo ha aumentato l'insulina in risposta al glucosio continuo, e se il glucosio si ferma di colpo si rischia un'ipoglicemia di rimbalzo."),
 (7,"chiaro",0,"Se la sacca finisce prima della successiva o l'infusione si interrompe, si segue la procedura, spesso una glucosata, e si controlla la glicemia."),
 (7,"chiaro",0,"E se l'infusione e' in ritardo, non si accelera per recuperare: il glucosio in piu' all'ora e' iperglicemia, non recupero."),

 (8,"chiaro",0,"Il monitoraggio. Glicemia, frequente all'avvio, poi secondo protocollo: l'iperglicemia e' la complicanza metabolica piu' comune, e spesso richiede insulina secondo prescrizione."),
 (8,"chiaro",0,"Elettroliti, con attenzione particolare a potassio, fosforo e magnesio. Funzione epatica e trigliceridi, per i lipidi. Funzione renale. Peso e bilancio idrico, come per ogni infusione della lezione sei punto tre."),
 (8,"chiaro",0,"E temperatura, perche' la febbre in un paziente in parenterale fa pensare subito al catetere, prima che a qualunque altra cosa."),

 (9,"chiaro",0,"La sindrome da rialimentazione, che abbiamo visto con l'enterale nella lezione tre punto quattro, e che con la parenterale e' ancora piu' insidiosa, perche' il glucosio arriva direttamente in vena."),
 (9,"chiaro",0,"Paziente malnutrito grave o a lungo digiuno: il glucosio stimola l'insulina, che spinge fosforo, potassio e magnesio dentro le cellule, dove servono per bruciare il glucosio."),
 (9,"chiaro",0,"L'ipofosfatemia puo' causare aritmie e insufficienza cardiaca e respiratoria: il cuore e i muscoli respiratori restano senza fosforo."),
 (9,"chiaro",0,"La prevenzione: identificare i pazienti a rischio, avviare lentamente, monitorare e correggere gli elettroliti, e somministrare la tiamina secondo prescrizione prima di iniziare."),

 (10,"chiaro",0,"Le complicanze infettive. La parenterale e' un fattore di rischio per le CLABSI: una soluzione ricca di nutrienti, in un catetere centrale, per settimane."),
 (10,"chiaro",0,"Si applica con il massimo rigore il bundle di gestione della lezione sei punto due: igiene delle mani, scrub the hub, medicazione, lume dedicato, cambio dei set."),
 (10,"chiaro",0,"E in caso di febbre o brivido, emocolture appaiate e avviso al medico: dal catetere e da vena periferica, nello stesso momento."),

 (11,"chiaro",0,"Le altre complicanze. Metaboliche: iperglicemia, ipoglicemia da sospensione brusca, squilibri elettrolitici, ipertrigliceridemia e, nelle nutrizioni prolungate, danno epatico con steatosi e colestasi."),
 (11,"chiaro",0,"Meccaniche: quelle del catetere centrale, dall'occlusione all'embolia gassosa."),
 (11,"chiaro",0,"E l'atrofia della mucosa intestinale: e' la ragione per cui, appena possibile, si torna anche solo in parte all'enterale."),

 (12,"chiaro",0,"I limiti. L'infermiere non modifica la composizione ne' la velocita' prescritte, e non aggiunge farmaci alla sacca: la sacca e' un preparato della farmacia, e si collega com'e'."),
 (12,"chiaro",0,"Segnala: glicemie fuori range, intolleranza, febbre, problemi del catetere. E' lo schema di tutte le terapie ad alto rischio: eseguire, sorvegliare, segnalare."),
 (12,"chiaro",0,"E nella nutrizione parenterale domiciliare ha un ruolo centrale nell'educazione della persona e del caregiver: gestione asettica del catetere, collegamento della sacca, riconoscimento dei segni di allarme."),

 (13,"chiaro",0,"Il caso. Paziente in nutrizione parenterale centrale; alle ventidue la sacca finisce, e la nuova arrivera' solo il mattino dopo. Che cosa fai?"),
 (13,"chiaro",0,"Non lasci il paziente senza apporto di glucosio: segui la procedura, che di norma prevede una glucosata a velocita' indicata, e avvisi il medico per la prescrizione: la glucosata e' un ponte, non una sostituzione."),
 (13,"chiaro",0,"Controlli la glicemia nelle ore successive per intercettare un'ipoglicemia di rimbalzo. Mantieni il lume dedicato, come prevede la procedura. E documenti."),

 (14,"chiaro",0,"In Veneto la nutrizione parenterale e' prescritta e seguita con i Servizi di Dietetica e Nutrizione Clinica, e le sacche personalizzate sono allestite in farmacia."),
 (14,"chiaro",0,"La Nutrizione Artificiale Domiciliare prevede la presa in carico distrettuale, con forniture, controlli e addestramento del caregiver: la stessa catena vista per l'enterale."),

 (15,"chiaro",0,"La sintesi. Centrale sopra novecento milliosmoli, via CVC o PICC; periferica sotto novecento, breve durata. Lume dedicato. Set con lipidi ogni ventiquattro ore."),
 (15,"chiaro",0,"Avvio e sospensione graduali. Glicemia frequente. Rialimentazione: attenzione al fosforo. Febbre: pensare al catetere."),

 (16,"chiaro",0,"[warm] Una frase per chiudere: la parenterale si usa quando l'intestino non puo' essere usato, e si sospende appena puo' esserlo di nuovo."),
 (16,"chiaro",0,"Nella prossima lezione: la trasfusione, una delle procedure in cui un errore di identificazione puo' essere fatale. A tra poco."),
]

CAPITOLI = {1:"Apertura",2:"Le indicazioni",3:"Centrale o periferica",4:"Le sacche",5:"Prima di collegare",
 6:"La somministrazione",7:"Avvio e sospensione graduali",8:"Il monitoraggio",9:"La sindrome da rialimentazione",10:"Le complicanze infettive",
 11:"Le altre complicanze",12:"I limiti dell'infermiere",13:"Il caso",14:"In Veneto",15:"La tabella",16:"Chiusura"}

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
