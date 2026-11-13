# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Un corridoio d'ospedale al cambio turno, un armadietto che si chiude, e una domanda che prima o poi arriva per tutti: quanto mi restera', ogni mese, quando smettero' di lavorare?"),
 (1,"chiaro",0,'Per rispondere abbiamo fatto un viaggio lungo dieci moduli e cinquanta lezioni. Adesso lo ripercorriamo tutto insieme, in dieci minuti, con le immagini che ci hanno accompagnato lungo la strada.'),
 (1,"chiaro",0,"Se hai seguito il corso, questo e' il ripasso da tenere a portata di mano. Se invece parti da qui, e' la mappa: ti dice che cosa c'e' in ogni tappa, e dove tornare quando ti serve un dettaglio."),
 (1,"chiaro",0,"Un'avvertenza, prima di partire. Le cifre che sentirai sono esempi, e servono a dare un ordine di grandezza. Per i tuoi numeri veri ci sono il cedolino, il prospetto, il Fondo e il tuo delegato."),

 (2,"chiaro",0,"Prima tappa: perche' parlarne. Chi lavora oggi avra' una pensione calcolata con il sistema contributivo, cioe' su quanto ha versato in tutta la vita lavorativa. E l'assegno sara' piu' basso dello stipendio."),
 (2,"chiaro",0,"Quella differenza, tra l'ultimo stipendio e la prima pensione, ha un nome: il divario. Non si chiude da solo. Si puo' ridurre, pero'. E c'e' una regola che vale per tutti: prima inizi, meglio e'."),
 (2,"chiaro",0,"Per questo si parla di tre pilastri. Il primo e' la pensione pubblica dell'INPS, obbligatoria. Il secondo e' il fondo pensione, volontario, con un conto intestato a te. Il terzo e' il risparmio personale."),
 (2,"chiaro",0,"I fondi pensione, poi, sono di tre famiglie: negoziali, aperti, e piani individuali. Solo nel fondo negoziale del tuo contratto, pero', versa anche il datore di lavoro. Ed e' una differenza che pesa."),
 (2,"chiaro",0,"Per la sanita' e le funzioni pubbliche quel fondo e' Perseo Sirio. E' un'associazione senza scopo di lucro, nata nel 2014, governata in modo paritetico da lavoratori ed enti, e vigilata dalla COVIP."),

 (3,"chiaro",0,"Seconda tappa: la liquidazione. Chi e' stato assunto a tempo indeterminato entro il 2000 e' in TFS. Chi e' arrivato dal 2001, o lavora a tempo determinato, e' in TFR. Conta la data giuridica di assunzione."),
 (3,"chiaro",0,"La differenza e' nel calcolo. Il TFS guarda all'ultima retribuzione, e premia gli aumenti di fine carriera. Il TFR invece cresce un anno alla volta: ogni anno accantona il sei virgola novantuno per cento."),
 (3,"chiaro",0,"Chi e' in TFS puo' aderire al Fondo, ma aderire significa passare al TFR, per sempre. Quello che ha maturato non si perde: viene fotografato, e prosegue. La scelta e' possibile fino al trentuno dicembre 2030."),
 (3,"chiaro",0,"E qui nasce l'immagine piu' importante del corso: le due tasche. Nella tasca reale, presso il Fondo, ci sono i contributi tuoi e quelli dell'ente. Nella tasca figurativa, presso l'INPS, c'e' il TFR."),
 (3,"chiaro",0,'Le due tasche viaggiano separate per tutta la carriera, e si riuniscono solo alla cessazione del lavoro. Ricordarlo ti evita molte sorprese: su quello che puoi chiedere prima, e sui tempi alla fine.'),

 (4,"chiaro",0,"Terza tappa: come si entra. Possono aderire i dipendenti della sanita' e delle funzioni pubbliche, non quelli della scuola. Basta un contratto di almeno tre mesi, anche a termine. In quel caso, firma presto."),
 (4,"chiaro",0,"Si aderisce con un modulo, dopo aver letto i documenti. E c'e' una soglia da ricordare: versando almeno l'uno per cento della retribuzione utile, anche l'ente versa il suo uno per cento. Sotto, no."),
 (4,"chiaro",0,"Per chi e' stato assunto a tempo indeterminato dal 2019 vale il silenzio-assenso. Sei mesi per scegliere, poi trenta giorni dalla lettera del Fondo. Chi tace viene iscritto, nel profilo Garantito."),
 (4,"chiaro",0,"C'e' poi il caso della polizia locale. Con l'articolo duecentootto, una quota delle multe puo' diventare contributo previdenziale, con un'iscrizione che arriva senza modulo. E che si puo' integrare."),
 (4,"chiaro",0,"E uscire? Mentre lavori non c'e' recesso. Puoi sospendere i tuoi versamenti, ma cosi' perdi anche l'uno per cento dell'ente. In compenso, al Fondo puoi iscrivere anche i tuoi familiari."),

 (5,"chiaro",0,"Quarta tappa: che cosa entra nel conto. La ricetta ha tre ingredienti: il tuo uno per cento, l'uno per cento dell'ente, e il TFR. Tutti calcolati sulla stessa base, la retribuzione utile al TFR."),
 (5,"chiaro",0,"Per chi e' in TFR dal 2001, al Fondo va tutto il TFR. Per chi ha optato dal TFS ne va una parte, il ventotto virgola novantaquattro per cento, piu' un uno virgola cinque aggiuntivo, che altrimenti non avrebbe."),
 (5,"chiaro",0,"Guarda che cosa succede, con un esempio. Su trentamila euro di retribuzione utile, venticinque euro al mese dalla tua busta paga ne mettono in movimento oltre duemilaseicento l'anno, tra ente e TFR."),
 (5,"chiaro",0,"L'uno per cento dell'ente e' il contributo da non lasciare sul tavolo. Spetta solo a chi e' iscritto, e versa almeno il suo uno per cento. E si perde sospendendo, oppure trasferendo altrove la posizione."),
 (5,"chiaro",0,"La tua aliquota la puoi cambiare una volta l'anno, e puoi anche versare di piu', con un bonifico. Poi controlla: nel cedolino trovi la tua quota e quella dell'ente, nel prospetto annuale le due tasche."),

 (6,"chiaro",0,"Quinta tappa: il fisco, che qui e' un alleato. I contributi che versi vengono tolti dal reddito su cui paghi l'IRPEF, fino a cinquemilatrecento euro l'anno. Lo sconto lo applica l'ente, in busta paga."),
 (6,"chiaro",0,"Anche i rendimenti sono trattati meglio. Pagano il venti per cento invece del ventisei, e i titoli di Stato il dodici e mezzo. Le imposte le paga il Fondo: i rendimenti che vedi sono gia' netti."),
 (6,"chiaro",0,"Alla fine, sulla prestazione, c'e' la scala del fisco. Si parte dal quindici per cento, e con gli anni di partecipazione si scende, di zero virgola trenta l'anno, fino al minimo del nove per cento."),
 (6,"chiaro",0,"Se un anno versi oltre il limite, su quella parte l'IRPEF la paghi subito. Per non pagarla due volte, comunica al Fondo i contributi non dedotti, entro il trentuno dicembre dell'anno successivo."),
 (6,"chiaro",0,"Per i dipendenti pubblici c'e' una particolarita': la posizione e' fatta a strati, perche' le regole sono cambiate nel tempo. La scala dal quindici al nove vale dal 2018. Gli strati li gestisce il Fondo."),

 (7,"chiaro",0,"Sesta tappa: come lavorano i tuoi soldi. Il risultato finale e' fatto di versamenti, piu' rendimenti, meno costi. Nessuno ti promette una cifra. E il primo fattore non e' il mercato: e' il tempo."),
 (7,"chiaro",0,"Le obbligazioni sono piu' calme, le azioni piu' mosse. Quello che conta e' l'orizzonte, cioe' quanti anni hai davanti. E versare con regolarita', ogni mese, aiuta ad attraversare gli alti e bassi dei mercati."),
 (7,"chiaro",0,"Perseo Sirio ha tre comparti: Garantito, Obbligazionario e Azionario. E sei profili tra cui scegliere. Tra questi il Life Cycle, il pilota automatico: piu' azioni da giovani, piu' prudenza verso la pensione."),
 (7,"chiaro",0,"Dal 2026 c'e' una novita' importante. Anche il TFR nella tasca figurativa segue un profilo, che puoi scegliere, e che puo' essere diverso da quello dei contributi. Ed e' la tasca piu' grande: merita una scelta."),
 (7,"chiaro",0,"E se cambi idea, cambi profilo. Il primo cambio si puo' fare subito, poi una volta ogni dodici mesi, ed e' gratuito. Per orientarti ci sono il questionario di autovalutazione e la consulenza del Fondo."),

 (8,"chiaro",0,"Settima tappa: i costi, che sembrano piccoli e non lo sono. In Perseo Sirio paghi tredici euro l'anno di quota associativa, e sul patrimonio una percentuale tra lo zero virgola quattordici e lo zero virgola quarantasei."),
 (8,"chiaro",0,"Per confrontare i fondi c'e' un numero solo, uguale per tutti: l'ISC. In media vale zero virgola quarantasette nei fondi negoziali, uno virgola trentasei negli aperti, due virgola diciassette nei piani individuali."),
 (8,"chiaro",0,"Sembrano decimali. Ma un punto in piu' di costo, in trentacinque anni, si mangia circa il diciotto per cento del risultato. A parita' di rischio, quello che fa la differenza e' il costo. E si conosce prima."),

 (9,"chiaro",0,"Ottava tappa: la vita, che non aspetta la pensione. Dopo otto anni di iscrizione puoi chiedere un'anticipazione, per tre motivi precisi, come le spese sanitarie e la casa. Ma solo dalla tasca reale."),
 (9,"chiaro",0,"Se cambi lavoro e resti in un ente che aderisce al Fondo, non cambia nulla. Se lasci la pubblica amministrazione, hai tre strade davanti. Una e' il riscatto: se e' volontario, paga il ventitre' per cento."),
 (9,"chiaro",0,"Trasferire ad altro fondo si puo', dopo tre anni. Ma se lo fai mentre lavori nella pubblica amministrazione, l'uno per cento dell'ente resta indietro. Al contrario, puoi portare in Perseo Sirio un vecchio fondo."),
 (9,"chiaro",0,"Per chi smette di lavorare qualche anno prima c'e' la RITA, una rendita ponte verso la pensione di vecchiaia. E per tutti, un gesto semplice: designare i beneficiari. Altrimenti la posizione puo' restare al Fondo."),

 (10,"chiaro",0,"Nona tappa: il traguardo. La pensione complementare si chiede alla cessazione del lavoro. Fino a meta' della posizione puoi averla in capitale, il resto diventa rendita. Se la posizione e' piccola, tutto in capitale."),
 (10,"chiaro",0,"Le rendite sono cinque, e la regola e' una bilancia: piu' protezione per chi resta, assegno un po' piu' basso. La rendita, pero', fa una cosa che il capitale non fa: ti accompagna per tutta la vita."),
 (10,"chiaro",0,"E i tempi? La tasca reale arriva in circa novanta giorni. Quella figurativa passa dall'INPS, e puo' richiedere da dodici a diciotto mesi. Una domanda completa, caricata nell'area riservata, evita i ritardi."),

 (11,"profondo",1.2,'La pensione non arriva alla fine. Si costruisce oggi, un mese alla volta.'),

 (12,"chiaro",0,"Decima tappa: tocca a te. Entra nell'area riservata, apri i cassetti uno alla volta, leggi il prospetto. Prova il simulatore, e ricorda che una proiezione e' un ventaglio di possibilita', non una promessa."),
 (12,"chiaro",0,'E quando una risposta non la trovi, chiedi. Al Fondo, con il numero verde e la consulenza gratuita. Ai delegati CISL FP Padova Rovigo, sul tuo posto di lavoro. Al patronato INAS CISL, per le pratiche.'),
 (12,"chiaro",0,"[warm] Perseo Sirio, adesso, non ha piu' segreti. Comincia stasera, con una domanda sola: sono iscritto? Tutto il resto viene dopo, un passo alla volta. Buon lavoro, oggi. Per la pensione di domani."),
]

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Apertura', 2: "Perche' parlarne", 3: 'TFS, TFR e le due tasche', 4: 'Come si entra', 5: 'Che cosa entra nel conto', 6: 'Il fisco', 7: 'Come lavorano i soldi', 8: 'I costi', 9: 'Lungo la strada', 10: 'Il traguardo', 11: 'Memo', 12: 'Tocca a te'}
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
