# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Questo caso concentra nello stesso paziente quattro problemi che si alimentano a vicenda: un'emorragia massiva, uno shock, un'encefalopatia epatica e un'astinenza alcolica."),
 (1,"chiaro",0,"E' un caso complesso, ed e' proprio per questo che e' utile: obbliga a stabilire le priorita'. Ci servono le lezioni sei punto sei, otto punto cinque, dieci punto sei, undici punto tre e quattordici punto quattro."),

 (2,"chiaro",0,"Lo scenario. Il signor Giorgio ha sessantatre anni e una cirrosi su base alcolica, ed e' ricoverato da due giorni per un'ascite. L'ultima assunzione di alcol riferita risale a tre giorni fa."),
 (2,"chiaro",0,"Alle sei vomita abbondante sangue rosso vivo, poi emette feci nere. Pressione ottantotto su cinquantaquattro, frequenza centoventotto, cute pallida e sudata. E' sonnolento, ma risvegliabile."),
 (2,"chiaro",0,"L'emoglobina di ieri era dieci virgola due, l'INR due virgola uno. Fermati un momento: qual e' la priorita' assoluta, prima ancora della pressione?"),

 (3,"chiaro",0,"Il ragionamento. Ematemesi rosso vivo e melena in un cirrotico indicano un'emorragia digestiva alta: con ogni probabilita' la rottura di varici esofagee, dovute all'ipertensione portale."),
 (3,"chiaro",0,"Pressione ottantotto, frequenza centoventotto, pallore, sudorazione: e' uno shock emorragico. E la coagulopatia, con un INR di due virgola uno, aggrava il sanguinamento."),
 (3,"chiaro",0,"[serious] Ma la priorita' assoluta e' un'altra. Un paziente sonnolento che vomita sangue e' a rischio di inalazione: le vie aeree vengono prima di tutto."),

 (4,"chiaro",0,"Le prime azioni, sulle vie aeree e sul respiro. Chiami subito aiuto e il medico. Metti il paziente in posizione laterale, o con la testa sollevata e girata, perche' non inali il sangue."),
 (4,"chiaro",0,"L'aspiratore pronto e funzionante, e si aspira il cavo orale. Valuti la coscienza con la GCS: se peggiora, non protegge piu' le vie aeree, e puo' servire l'intubazione prima dell'endoscopia. Ossigeno secondo protocollo."),

 (5,"chiaro",0,"Poi il circolo. Due accessi venosi di grosso calibro. I prelievi: emocromo, coagulazione, gruppo e prove crociate, funzione renale ed epatica."),
 (5,"chiaro",0,"Liquidi ed emocomponenti secondo prescrizione. Monitoraggio continuo e parametri ravvicinati, diuresi oraria, digiuno."),
 (5,"chiaro",0,"E un dettaglio che il caso vuole intercettare: l'emoglobina di ieri non rassicura. Nell'emorragia acuta si perde sangue intero, e l'emoglobina scende in ritardo. A guidarti sono i parametri, non l'esame di ieri."),

 (6,"chiaro",0,"La terapia specifica, tutta su prescrizione. Farmaci vasoattivi che riducono la pressione nel sistema portale, come la terlipressina, o la somatostatina e i suoi analoghi."),
 (6,"chiaro",0,"Una profilassi antibiotica, che nel cirrotico con emorragia riduce le infezioni e la mortalita'. Gli inibitori di pompa. E l'endoscopia urgente, di norma entro dodici ore, con la legatura delle varici."),
 (6,"chiaro",0,"La correzione della coagulazione, secondo indicazione. E nessuna iniezione intramuscolare, con un INR di due virgola uno."),

 (7,"chiaro",0,"Un punto avanzato, che distingue una risposta eccellente. La trasfusione nel cirrotico segue in genere una strategia restrittiva: secondo prescrizione, l'emoglobina si tiene intorno a sette, otto."),
 (7,"chiaro",0,"Sembra un paradosso. Ma le trasfusioni eccessive aumentano il volume e la pressione portale, e quindi il sanguinamento delle varici."),
 (7,"chiaro",0,"Restano tutte le regole di sicurezza della lezione sei punto sei. E se si trasfondono piu' unita' in poco tempo, attenzione all'ipotermia e all'ipocalcemia, con i riscaldatori secondo procedura."),

 (8,"chiaro",0,"Le ore successive. Dopo l'endoscopia l'emorragia e' controllata: pressione centododici su settanta, frequenza novantotto. Ma alle quattordici il signor Giorgio e' piu' confuso."),
 (8,"chiaro",0,"Ha invertito il ritmo sonno-veglia e presenta l'asterixis. E' un'encefalopatia epatica, e la causa e' l'emorragia: il sangue nell'intestino e' una grande fonte di ammoniaca, come nella lezione otto punto cinque."),
 (8,"chiaro",0,"Gli interventi: segnalare; il lattulosio per bocca, per sondino o per clistere, secondo prescrizione; la sorveglianza della coscienza e delle vie aeree. Niente sedativi. E la prevenzione delle cadute."),

 (9,"chiaro",0,"[thoughtful] E c'e' un secondo problema nascosto. L'ultima assunzione di alcol risale a tre giorni fa: siamo nella finestra del delirium tremens."),
 (9,"chiaro",0,"Tremori, sudorazione, tachicardia, agitazione, allucinazioni possono comparire. E distinguere un'astinenza da un'encefalopatia e' difficile, perche' entrambe confondono."),
 (9,"chiaro",0,"Si valuta con una scala come la CIWA-Ar. La tiamina, secondo prescrizione, va prima del glucosio, contro l'encefalopatia di Wernicke. E si segnala tutto: in un cirrotico, la scelta dei sedativi e' delicata."),

 (10,"chiaro",0,"Un approfondimento: le priorita' quando i problemi si sovrappongono. Primo, le vie aeree, perche' il vomito con la coscienza ridotta uccide piu' in fretta di tutto il resto."),
 (10,"chiaro",0,"Secondo, il circolo, cioe' lo shock. Terzo, il controllo della fonte, con la terapia vasoattiva e l'endoscopia. Quarto, le complicanze prevedibili: encefalopatia, infezioni, astinenza, insufficienza renale."),
 (10,"chiaro",0,"Quinto, sicurezza, nutrizione ed educazione. E' l'ABCDE applicato a un paziente complesso. E in una situazione cosi' concitata, documentare chi ha avvisato chi, e quando, e' una tutela per tutti."),

 (11,"chiaro",0,"Verso la dimissione. Il tema centrale e' l'astensione dall'alcol: un colloquio non giudicante, l'invio al SerD o ai servizi di alcologia, i gruppi di auto-aiuto. Poi la terapia per prevenire un nuovo sanguinamento."),
 (11,"chiaro",0,"I segni d'allarme: vomito di sangue, feci nere, confusione, addome che aumenta. Un alvo regolare con il lattulosio, per prevenire l'encefalopatia. Poco sale nella dieta. E i controlli endoscopici programmati."),

 (12,"chiaro",0,"Gli errori. Occuparsi della pressione e trascurare le vie aeree. Rassicurarsi per l'emoglobina di ieri. Trasfondere per alzare l'emoglobina il piu' possibile. Le intramuscolari con l'INR alterato."),
 (12,"chiaro",0,"Sedare un paziente confuso senza chiedersi se e' encefalopatia o astinenza. Dimenticare la tiamina. E giudicare il paziente per l'alcol: il giudizio allontana dalle cure."),

 (13,"chiaro",0,"Il tema piu' delicato del caso: come parlare di alcol senza giudicare. L'alcol e' una malattia da dipendenza, non una colpa morale, e un tono giudicante chiude la conversazione."),
 (13,"chiaro",0,"Si usano domande aperte e un tono neutro: quanto beve in una giornata tipo? Senza minimizzare e senza moralizzare. E si spiega con chiarezza il legame fra alcol, cirrosi e sanguinamento."),
 (13,"chiaro",0,"Molti pazienti non lo hanno davvero compreso. Si valorizza ogni passo verso il cambiamento, con il colloquio motivazionale della lezione undici punto sei. E si coinvolgono i familiari, con il consenso del paziente."),
 (13,"chiaro",0,"Si propongono concretamente il SerD, o i servizi di alcologia, e i gruppi di auto-aiuto. Molti decidono di smettere proprio dopo un episodio come questo, se trovano qualcuno disposto ad ascoltarli."),

 (14,"chiaro",0,"[curious] Le domande d'orale. Prima: emorragia alta o bassa? L'alta, a monte del legamento di Treitz, si manifesta con ematemesi e melena; la bassa con sangue rosso dal retto."),
 (14,"chiaro",0,"Ma un'emorragia alta molto abbondante puo' arrivare rossa dal retto. Seconda: perche' nel cirrotico l'emorragia scatena l'encefalopatia?"),
 (14,"chiaro",0,"Perche' il sangue nell'intestino viene digerito come una grande quantita' di proteine, e produce ammoniaca, che il fegato malato non riesce a eliminare."),
 (14,"chiaro",0,"Terza: perche' la tiamina prima del glucosio? Perche' nell'alcolista la carenza di tiamina e' frequente, e il glucosio senza tiamina puo' precipitare un'encefalopatia di Wernicke."),

 (15,"chiaro",0,"La risposta modello. Paziente cirrotico con ematemesi abbondante e melena, ipotensione, tachicardia e sonnolenza: emorragia digestiva alta, verosimilmente da varici, con shock emorragico e rischio di inalazione."),
 (15,"chiaro",0,"Chiamo subito aiuto. Proteggo le vie aeree mettendo il paziente su un fianco, aspirando e valutando la coscienza; somministro ossigeno. Posiziono due accessi di grosso calibro, con prelievi, gruppo e prove crociate."),
 (15,"chiaro",0,"Somministro liquidi, emocomponenti, vasoattivi e profilassi antibiotica, secondo prescrizione. Mantengo il digiuno e preparo l'endoscopia. Monitoro parametri, diuresi e coscienza."),
 (15,"chiaro",0,"Poi riconosco l'encefalopatia e do il lattulosio prescritto, senza sedativi; valuto l'astinenza e do la tiamina prima del glucosio. Documento, informo i familiari, imposto un percorso non giudicante verso i servizi."),

 (16,"chiaro",0,"I collegamenti. La trasfusione con la sei punto sei. Emorragia digestiva, cirrosi ed encefalopatia con la otto punto cinque. Lo shock con la dieci punto sei."),
 (16,"chiaro",0,"L'astinenza alcolica e il SerD con la undici punto tre. Le funzioni del fegato con la quattordici punto quattro. E le vie aeree con la dieci punto cinque."),

 (17,"profondo",1.2,"[serious] La frase del caso: chi vomita sangue e si addormenta rischia prima di soffocare che di dissanguarsi. Le vie aeree vengono sempre prima."),

 (18,"chiaro",0,"[warm] Nella prossima lezione: un paziente in emodialisi che salta una seduta e arriva con un potassio pericolosamente alto. ECG, terapia d'urgenza, e la fistola da proteggere. A tra poco."),
]
CAPITOLI = {1:"Apertura",2:"Lo scenario",3:"Il ragionamento",4:"Le prime azioni: A e B",5:"Le prime azioni: C",
 6:"La terapia specifica",7:"La trasfusione nel cirrotico",8:"Le ore successive: l'encefalopatia",9:"Il secondo problema nascosto: l'astinenza",
 10:"Le priorita' quando i problemi si sovrappongono",11:"Verso la dimissione",12:"Gli errori da evitare",13:"Parlare di alcol senza giudicare",
 14:"Le domande d'orale",15:"La risposta modello",16:"I collegamenti",17:"La frase del caso",18:"Chiusura"}

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
