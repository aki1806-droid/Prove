# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Chiudiamo il modulo diciassette, e con esso l'intero blocco dei casi clinici: trentadue casi completi e diciotto casi lampo, nei moduli quindici, sedici e diciassette."),
 (1,"chiaro",0,"In questa lezione riprendiamo le frasi chiave del modulo, affrontiamo sei casi lampo su temi di etica e di responsabilita' che all'orale compaiono spesso, e vediamo come usare tutto questo nelle prove."),

 (2,"chiaro",0,"Le frasi del modulo, come ancore. Preeclampsia, diciassette punto uno: mal di testa e mal di stomaco con la pressione alta non sono disturbi minori."),
 (2,"chiaro",0,"Emorragia post-partum, diciassette punto due: utero molle, massaggio, vescica vuota, aiuto. Lattante, diciassette punto tre: tutto per chilo, e lo shock prima che la pressione cada."),
 (2,"chiaro",0,"Rischio suicidario, diciassette punto quattro: chiedere apre una porta. TSO, diciassette punto cinque: il rispetto e' la condizione di tecnica e procedura. Metadone, diciassette punto sei: e' una terapia."),
 (2,"chiaro",0,"Cure palliative, diciassette punto sette: educare il caregiver e' curare il paziente. Infermiere di famiglia, diciassette punto otto: la lesione guarisce con la rete."),
 (2,"chiaro",0,"Centro di Servizi, diciassette punto nove: curare in struttura non e' curare di meno. Paziente straniera, diciassette punto dieci: un consenso non capito non e' un consenso."),
 (2,"chiaro",0,"Evento avverso, diciassette punto undici: la cartella va scritta in tempo, e mai riscritta dopo. Undici frasi, e dietro ognuna un caso intero."),

 (3,"chiaro",0,"[curious] Caso lampo uno. Un paziente adulto, capace, anemico e in sanguinamento, rifiuta la trasfusione per motivi religiosi."),
 (3,"chiaro",0,"Un adulto capace ha il diritto di rifiutare un trattamento, anche salvavita: lo garantiscono l'articolo trentadue della Costituzione e la legge duecentodiciannove, della lezione uno punto sei."),
 (3,"chiaro",0,"Il medico, con l'infermiere, da' un'informazione completa sulle conseguenze, verificando che la scelta sia libera e consapevole. Si valutano le alternative, come farmaci e tecniche di risparmio del sangue."),
 (3,"chiaro",0,"Si documentano con cura il rifiuto e le informazioni date, e si considerano eventuali DAT. E' cio' che dice anche la lezione sei punto sei: il rifiuto della persona capace si rispetta, e si documenta."),
 (3,"chiaro",0,"La situazione e' diversa per un minore: la decisione coinvolge i genitori e, in caso di conflitto con il suo interesse, l'autorita' giudiziaria. Nell'emergenza si garantiscono le cure necessarie."),

 (4,"chiaro",0,"Caso lampo due. Un paziente con dolore toracico, in osservazione, vuole andarsene subito: ho da lavorare. Prima si ascoltano i motivi, che spesso si possono risolvere: la paura, il lavoro, i figli, i tempi di attesa."),
 (4,"chiaro",0,"Il medico informa in modo chiaro dei rischi. Se la persona e' capace, la sua scelta va rispettata, con la firma della dichiarazione secondo procedura: non si trattiene contro la sua volonta' una persona capace."),
 (4,"chiaro",0,"Ma non la si abbandona: le si danno comunque informazioni, terapia, segni d'allarme, e l'indicazione di tornare. E si documenta."),

 (5,"chiaro",0,"Caso lampo tre. Una persona telefona in reparto: sono il nipote, come sta mia zia? Non si danno informazioni cliniche al telefono senza poter verificare l'identita' di chi chiama."),
 (5,"chiaro",0,"E senza il consenso della paziente sulle persone da informare. Si seguono le procedure aziendali, che prevedono di solito l'indicazione, da parte del paziente, delle persone autorizzate."),
 (5,"chiaro",0,"Si risponde con cortesia, spiegando come ottenere le informazioni. E' la riservatezza della lezione uno punto sette, che protegge anche le persone che non vogliono far sapere di essere ricoverate."),
 (5,"chiaro",0,"La stessa lezione lo dice in modo netto: per telefono non si conferma nemmeno la presenza di un ricoverato, e la persona puo' opporsi alla comunicazione della propria presenza in reparto."),

 (6,"chiaro",0,"[serious] Caso lampo quattro. Una donna arriva in pronto soccorso con lesioni che non corrispondono al racconto di una caduta. E' molto ansiosa, e il compagno non la lascia mai sola."),
 (6,"chiaro",0,"Si garantisce un colloquio in privato, senza l'accompagnatore, con un ascolto non giudicante e senza pressioni. Si curano le lesioni, e si documentano in modo accurato e oggettivo."),
 (6,"chiaro",0,"Si attiva il percorso aziendale dedicato alle vittime di violenza, previsto dalle linee guida nazionali, e si danno informazioni sui centri antiviolenza e sui numeri di aiuto."),
 (6,"chiaro",0,"Gli esercenti una professione sanitaria hanno l'obbligo di referto per i reati procedibili d'ufficio, secondo la normativa. E si tutela la sicurezza della donna e degli operatori."),
 (6,"chiaro",0,"Sono i tre binari della lezione uno punto sette: l'assistenza alla persona, una documentazione che descrive senza giudicare, l'attivazione dei percorsi. E qui il segreto professionale non e' un ostacolo."),

 (7,"chiaro",0,"Caso lampo cinque. Durante il turno noti che un collega ha l'alito che sa di alcol, e' impacciato, e sta preparando la terapia."),
 (7,"chiaro",0,"La priorita' e' la sicurezza dei pazienti: si interviene subito, con discrezione, perche' non somministri farmaci. E si informa il coordinatore, o il responsabile, secondo le procedure."),
 (7,"chiaro",0,"Non si copre il collega, e non lo si espone pubblicamente. Il Codice deontologico chiede di tutelare la persona assistita: come nella lezione uno punto quattro, coprire il collega non e' solidarieta' professionale."),
 (7,"chiaro",0,"E si ricorda che la dipendenza e' anche una malattia: esistono percorsi di aiuto per il collega."),

 (8,"chiaro",0,"Caso lampo sei. Un ragazzo di quindici anni arriva in pronto soccorso con un amico, dopo un incidente in bicicletta, con una frattura dell'avambraccio. I genitori non sono raggiungibili."),
 (8,"chiaro",0,"Per i trattamenti il consenso spetta ai genitori o al tutore, tenendo conto della volonta' del minore in base all'eta' e alla maturita', come prevede la legge duecentodiciannove, all'articolo tre."),
 (8,"chiaro",0,"Si continua a cercare i genitori. Nelle urgenze si garantiscono le cure necessarie; per cio' che puo' attendere, si aspetta il consenso. Si comunica in modo adeguato all'eta', e si documentano i tentativi di contatto."),

 (9,"chiaro",0,"[thoughtful] I fili del modulo diciassette. La persona come titolare delle decisioni: il consenso, il rifiuto, la pianificazione condivisa. La famiglia come risorsa, e come destinataria di cura."),
 (9,"chiaro",0,"Il territorio e la rete come luogo di cura. La comunicazione come strumento clinico: il mediatore, la de-escalation, il colloquio sul suicidio."),
 (9,"chiaro",0,"E la responsabilita', come tutela del paziente e del professionista. Sono gli stessi fili che hai ritrovato nei sei casi lampo di oggi."),

 (10,"chiaro",0,"Le tracce piu' probabili legate a questo modulo. La preeclampsia e il magnesio. L'emorragia post-partum. Il bambino disidratato e le dosi per chilo. Il paziente che esprime idee suicidarie. L'agitazione e il TSO."),
 (10,"chiaro",0,"Il paziente in terapia sostitutiva. Le cure palliative a domicilio. L'infermiere di famiglia e il caregiver. Il trasferimento da una struttura residenziale. Il consenso con il mediatore."),
 (10,"chiaro",0,"L'evento avverso e la legge ventiquattro. E il rifiuto delle cure, che hai appena visto nel primo caso lampo. Per ognuna hai un caso svolto, con la risposta modello e tre domande d'orale."),

 (11,"chiaro",0,"Le norme che ritornano nei casi, da collegare sempre alla pratica. L'articolo trentadue della Costituzione. La legge ottocentotrentatre', con il TSO, agli articoli dal trentatre' al trentacinque."),
 (11,"chiaro",0,"La legge duecentodiciannove, su consenso, rifiuto, DAT, pianificazione condivisa, minori e incapaci. La legge trentotto, sulle cure palliative. La legge ventiquattro, sulla sicurezza delle cure e la responsabilita'."),
 (11,"chiaro",0,"Il DPR trecentonove, sugli stupefacenti. Il decreto ottantuno e la Raccomandazione otto, sulle aggressioni. Le Raccomandazioni quattro, sul suicidio, cinque, sulla trasfusione, e diciassette, sulla riconciliazione."),
 (11,"chiaro",0,"E il DM settantasette, sul territorio. Le hai gia' incontrate tutte: la duecentodiciannove nella uno punto sei, la ventiquattro nella uno punto cinque, la ottocentotrentatre' nella undici punto tre."),

 (12,"chiaro",0,"Come usare i trentadue casi nelle prove. Nella prova scritta, per le risposte sintetiche: lo schema in cinque passi della lezione quindici punto uno, e le quindici righe."),
 (12,"chiaro",0,"Nella prova pratica: le priorita', gli interventi motivati, le procedure passo passo. All'orale: partire dal caso concreto, e arrivare alla norma e al sistema, cioe' alla rete veneta."),
 (12,"chiaro",0,"L'allenamento: una traccia al giorno, alternando i tre moduli. Il quaderno dei casi, una pagina per caso. E nelle ultime due settimane, rileggere solo le frasi dei casi e le risposte modello."),

 (13,"profondo",1.2,"[serious] La frase che chiude il blocco dei casi clinici: dietro ogni traccia c'e' una persona."),
 (13,"chiaro",0,"Il commissario vuole sapere se la metteresti al sicuro, la ascolteresti e la accompagneresti. Se le tue risposte mostrano queste tre cose, hai gia' fatto meta' del concorso."),

 (14,"chiaro",0,"[warm] Nell'ultimo modulo, il percorso trasversale, ci concentriamo sulle prove: il metodo per i quiz, la prova scritta e pratica, l'orale, l'inglese e l'informatica, fino alla simulazione finale. Ci vediamo li'."),
]
CAPITOLI = {1:"Apertura",2:"Le frasi del modulo 17",3:"Caso lampo 1: il rifiuto della trasfusione",
 4:"Caso lampo 2: le dimissioni contro il parere medico",5:"Caso lampo 3: le informazioni al telefono",6:"Caso lampo 4: il sospetto di violenza",
 7:"Caso lampo 5: il collega in difficolta'",8:"Caso lampo 6: il minore senza i genitori",9:"I fili del modulo",
 10:"Le tracce piu' probabili del modulo",11:"Le norme che ritornano nei casi",12:"Come usare i 32 casi nelle prove",
 13:"La frase del blocco dei casi clinici",14:"Chiusura"}

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
