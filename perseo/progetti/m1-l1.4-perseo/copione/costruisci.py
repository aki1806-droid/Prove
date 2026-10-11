# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Perseo e' una costellazione. Sirio e' la stella piu' luminosa del cielo notturno. Due nomi presi dal cielo per un oggetto molto terreno: un fondo pensione."),
 (1,"chiaro",0,"In questa lezione scopriamo che cos'e' Perseo Sirio, da dove viene, a chi si rivolge e quanto e' grande."),
 (1,"chiaro",0,"Perche' prima di affidare a qualcuno una parte del proprio futuro, e' giusto sapere con chi si ha a che fare. Vale per una banca, e vale anche per un fondo pensione."),

 (2,"chiaro",0,"La storia comincia con due fondi distinti. Perseo nasce da un accordo nazionale del 1999 tra l'ARAN, che rappresenta le pubbliche amministrazioni, e le confederazioni sindacali."),
 (2,"chiaro",0,"Era il fondo dei lavoratori delle regioni, delle autonomie locali e della sanita': in pratica, di gran parte di chi lavora negli ospedali e nei comuni."),
 (2,"chiaro",0,'Sirio nasce nel 2007, per i dipendenti dei ministeri, degli enti pubblici non economici e di altre amministrazioni centrali.'),
 (2,"chiaro",0,'Due fondi per due pezzi della stessa pubblica amministrazione, ciascuno con i suoi organi, i suoi costi, i suoi gestori.'),
 (2,"chiaro",0,"[serious] Nel 2014 un nuovo accordo li unisce. Da allora c'e' un solo fondo: Perseo Sirio, il fondo pensione complementare della pubblica amministrazione e della sanita'."),
 (2,"chiaro",0,"Unire due fondi significa anche dividere i costi fissi su un numero piu' grande di iscritti. E' una delle ragioni per cui i fondi di categoria costano poco."),

 (3,"chiaro",0,"Ecco la sua carta d'identita'. Perseo Sirio e' un'associazione riconosciuta, senza scopo di lucro. Non ha azionisti da remunerare."),
 (3,"chiaro",0,"Essere un'associazione significa che gli iscritti non sono clienti, ma soci. Il Fondo esiste per loro, e i suoi conti si chiudono a loro favore, non a favore di qualcuno che deve guadagnarci."),
 (3,"chiaro",0,"E' iscritto all'albo della COVIP con il numero 164, e la COVIP ne vigila l'attivita'. La sede e' a Roma."),
 (3,"chiaro",0,"Opera in regime di contribuzione definita: la tua pensione complementare dipendera' da quanto hai versato e da quanto hanno reso gli investimenti."),
 (3,"chiaro",0,"Non c'e' un importo promesso in partenza, come accade nei fondi a prestazione definita. C'e' un conto che cresce, e che puoi seguire anno per anno."),
 (3,"chiaro",0,"La vita nel Fondo ha due fasi. La fase di accumulo, finche' lavori e versi. E la fase di erogazione, quando la posizione diventa una prestazione: una rendita, un capitale, o un mix dei due."),
 (3,"chiaro",0,'E il Fondo fa tre cose: raccoglie i contributi, li fa gestire da gestori professionali, ed eroga le prestazioni quando ne hai diritto.'),

 (4,"chiaro",0,"A chi si rivolge? Ai dipendenti della sanita' pubblica. Ai lavoratori di regioni, comuni, province e degli altri enti delle funzioni locali."),
 (4,"chiaro",0,"Ai dipendenti dei ministeri e delle agenzie fiscali, delle universita' e dei centri di ricerca, degli enti pubblici non economici, dell'ENAC e del CNEL."),
 (4,"chiaro",0,"E anche alla dirigenza, compresa quella medica e veterinaria. Non e' un fondo per una sola professione: e' il fondo di tutta una parte del lavoro pubblico."),
 (4,"chiaro",0,"In tutto parliamo di moltissimi lavoratori, sparsi in migliaia di amministrazioni diverse: aziende sanitarie, comuni piccoli e grandi, ministeri, universita'."),
 (4,"chiaro",0,'Possono aderire, con appositi accordi, anche alcune categorie del privato vicine al pubblico, come il personale di alcune case di cura o dei servizi socio-sanitari esternalizzati.'),
 (4,"chiaro",0,"Una precisazione, perche' la domanda arriva sempre: la scuola ha un fondo diverso, che si chiama Espero. Chi lavora nella scuola non aderisce a Perseo Sirio."),

 (5,"chiaro",0,"E quanto e' grande? Secondo i dati pubblicati dal Fondo, gli aderenti sono oltre trecentomila."),
 (5,"chiaro",0,"Nel 2024 ha erogato piu' di cinquantamila prestazioni: pensioni complementari, anticipazioni, riscatti. E nel 2025 il patrimonio gestito ha superato il miliardo di euro."),
 (5,"chiaro",0,"Il patrimonio e' la somma delle posizioni degli iscritti, e ognuna resta intestata al suo titolare. Quel miliardo non e' del Fondo: e' degli iscritti, messo insieme."),
 (5,"chiaro",0,"Sono numeri importanti, ma vanno letti anche in un'altra direzione. I lavoratori di sanita', funzioni locali e funzioni centrali sono molti di piu'."),
 (5,"chiaro",0,"Significa che una grande parte di chi potrebbe aderire, oggi, non lo ha ancora fatto. Spesso non per scelta, ma perche' nessuno gliel'ha spiegato."),
 (5,"chiaro",0,"Ed e' proprio per questo che esiste un corso come questo: per arrivare a una scelta, qualunque sia, sapendo di che cosa si parla."),

 (6,"chiaro",0,"Perche' due nomi del cielo, allora? Forse perche' un fondo pensione serve proprio a questo: a orientarsi su una distanza lunga, quella tra il primo giorno di lavoro e l'ultimo."),
 (6,"chiaro",0,"Ma al di la' del nome, quello che conta per te e' semplice. E' un fondo pensato per la tua categoria, nato dal tuo contratto, governato anche da chi ti rappresenta."),
 (6,"chiaro",0,'Nella prossima lezione vedremo come: chi siede negli organi del Fondo, chi li elegge, e chi controlla i soldi.'),

 (7,"chiaro",0,"Intanto, tieni a portata di mano questi riferimenti. Il Fondo ha un numero verde gratuito, attivo dal lunedi' al venerdi', dalle nove alle sedici."),
 (7,"chiaro",0,"E un sito, fondoperseosirio punto it, con la modulistica, le domande frequenti, i documenti ufficiali e un'area riservata per gli iscritti."),
 (7,"chiaro",0,"Sul sito trovi anche i documenti che vedremo nel corso: la nota informativa, lo statuto, i rendimenti dei comparti. Sono pubblici, e chiunque puo' leggerli anche prima di aderire."),
 (7,"chiaro",0,"Li useremo spesso nel corso. E sono la fonte giusta quando un collega ti riporta una voce di corridoio sul Fondo: prima di crederci, si controlla li'."),

 (8,"profondo",1.2,"Perseo Sirio non nasce da un'offerta commerciale. Nasce dal tuo contratto."),

 (9,"chiaro",0,"Le tre cose da ricordare. Uno: Perseo Sirio nasce nel 2014 dall'unione di due fondi, Perseo e Sirio."),
 (9,"chiaro",0,"Due: e' un'associazione senza scopo di lucro, iscritta all'albo e vigilata dalla COVIP, che lavora in regime di contribuzione definita."),
 (9,"chiaro",0,"Tre: si rivolge ai dipendenti della sanita' e della pubblica amministrazione, dirigenza compresa, ma non alla scuola."),
 (9,"chiaro",0,"La mossa di oggi: salva in rubrica il numero verde del Fondo, ottocento, novecentonovantaquattro, cinquecentoquarantacinque. Ti servira' la prima volta che avrai un dubbio."),
 (9,"chiaro",0,'[warm] Nella prossima lezione: chi decide nel Fondo, e chi lo controlla.'),
]

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Apertura', 2: 'La storia', 3: "La carta d'identita'", 4: "Chi puo' aderire", 5: 'I numeri', 6: "Perche' due stelle", 7: 'I contatti', 8: 'Memo', 9: 'Chiusura'}
CPS = 17.0   # GianP eleven_v3, misurata sul corso Infermiere: si rimisura sulla 1.1

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
    if len(b["text"])>225: errori.append(f'{b["id"]}: {len(b["text"])} car, blocco troppo lungo')
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
