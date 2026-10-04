# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] La salute mentale riguarda ogni infermiere, non solo chi lavora in psichiatria. Persone con disturbi psichici si ricoverano in medicina, in chirurgia, e si presentano in pronto soccorso."),
 (1,"chiaro",0,"Questa lezione ha un contenuto normativo che i concorsi chiedono con grande precisione: il trattamento sanitario obbligatorio, con i suoi requisiti, i suoi passaggi e i suoi tempi."),
 (1,"chiaro",0,"E tre temi clinici che si incontrano in qualunque reparto: l'agitazione, il rischio suicidario e le dipendenze, con l'astinenza da alcol."),

 (2,"chiaro",0,"I principali disturbi, in sintesi. I disturbi psicotici, come la schizofrenia, con sintomi positivi, cioe' deliri e allucinazioni, e negativi: apatia, ritiro sociale, poverta' del pensiero."),
 (2,"chiaro",0,"I disturbi dell'umore: la depressione e il disturbo bipolare, con fasi depressive e fasi maniacali. I disturbi d'ansia, quelli di personalita', quelli della nutrizione e dell'alimentazione, e quelli da uso di sostanze."),

 (3,"chiaro",0,"La cornice. La legge centottanta del millenovecentosettantotto, nota come legge Basaglia, ha chiuso i manicomi."),
 (3,"chiaro",0,"I suoi principi sono stati recepiti nella legge ottocentotrentatre' dello stesso anno, agli articoli trentatre', trentaquattro e trentacinque. Il principio di fondo: i trattamenti sanitari sono di norma volontari."),
 (3,"chiaro",0,"L'assistenza e' organizzata nel Dipartimento di Salute Mentale: il Centro di Salute Mentale sul territorio, l'SPDC, Servizio Psichiatrico di Diagnosi e Cura, nell'ospedale generale, i centri diurni e le residenze."),

 (4,"chiaro",0,"Il trattamento sanitario obbligatorio in degenza ospedaliera per malattia mentale e' un'eccezione. E' ammesso solo quando ricorrono insieme tre requisiti."),
 (4,"chiaro",0,"Uno: alterazioni psichiche tali da richiedere urgenti interventi terapeutici. Due: il rifiuto degli interventi da parte della persona. Tre: l'impossibilita' di adottare tempestive e idonee misure sanitarie extraospedaliere."),
 (4,"chiaro",0,"Tutti e tre: se ne manca uno, il TSO non e' legittimo. E nota che la pericolosita' non e' fra i requisiti. E' una delle domande trabocchetto piu' frequenti."),
 (4,"profondo",1.2,"[serious] Il TSO e' un atto sanitario, non di ordine pubblico."),

 (5,"chiaro",0,"La procedura, con i passaggi e i tempi. Si parte da una proposta motivata di un medico. Poi serve la convalida di un secondo medico della struttura sanitaria pubblica."),
 (5,"chiaro",0,"Poi l'ordinanza del sindaco, come autorita' sanitaria locale. Il provvedimento viene notificato al giudice tutelare entro quarantotto ore dal ricovero."),
 (5,"chiaro",0,"E il giudice, entro le successive quarantotto ore, convalida o non convalida. Il trattamento si esegue nell'SPDC. Due medici, il sindaco, il giudice: ogni passaggio e' una garanzia per la persona."),

 (6,"chiaro",0,"La durata: sette giorni, prorogabili con una nuova proposta motivata. Durante il TSO la persona conserva i suoi diritti: puo' comunicare con chi ritiene opportuno, e puo' presentare ricorso."),
 (6,"chiaro",0,"E anche durante il trattamento si continua a ricercare il suo consenso e la sua partecipazione. L'obbligo non cancella la relazione: la rende piu' importante."),
 (6,"chiaro",0,"Esiste poi l'accertamento sanitario obbligatorio, l'ASO. Serve a valutare una persona che rifiuta di farsi visitare, con una procedura analoga, ma senza ricovero."),

 (7,"chiaro",0,"L'agitazione psicomotoria. Si riconoscono i segnali precoci: la voce che si alza, l'irrequietezza, lo sguardo fisso, i pugni serrati. Prima si coglie, piu' e' facile disinnescarla."),
 (7,"chiaro",0,"Si usa la de-escalation verbale della lezione due punto sette: calma, distanza, ascolto, offrire scelte. E la sicurezza: una via d'uscita libera, non restare soli, chiamare aiuto, come chiede la Raccomandazione otto."),
 (7,"chiaro",0,"Si cercano le cause organiche: un'agitazione puo' essere un'ipoglicemia, un'ipossia, un'astinenza, un delirium. Non va attribuita automaticamente al disturbo psichiatrico. E i farmaci, secondo prescrizione."),

 (8,"chiaro",0,"Il rischio suicidario. I fattori di rischio: i tentativi precedenti, che sono il piu' importante. I disturbi psichiatrici, le dipendenze, le malattie gravi o il dolore cronico, l'isolamento, le perdite recenti."),
 (8,"chiaro",0,"I segnali: espressioni di disperazione, di sentirsi un peso, frasi di congedo, cambiamenti improvvisi. Anche un'improvvisa calma dopo un periodo di grande sofferenza."),
 (8,"chiaro",0,"E un punto che i concorsi chiedono: si chiede in modo diretto se la persona pensa di togliersi la vita. Una domanda chiara, fatta con rispetto, non fa nascere un'idea che non c'era."),
 (8,"profondo",1.2,"[serious] Chiedere non aumenta il rischio: apre la possibilita' di aiutare."),

 (9,"chiaro",0,"Se il rischio e' elevato, la persona non si lascia sola, si segnala e si attiva la valutazione specialistica. In ospedale il riferimento e' la Raccomandazione quattro, sulla prevenzione del suicidio di paziente in ospedale."),
 (9,"chiaro",0,"Prevede la valutazione del rischio, la sicurezza dell'ambiente, cioe' finestre, oggetti potenzialmente pericolosi, farmaci, e una sorveglianza adeguata al rischio."),
 (9,"chiaro",0,"E attenzione ai momenti di transizione, come i trasferimenti e la dimissione, che sono fra i piu' delicati. Il suicidio in ospedale e' un evento sentinella, e gli operatori coinvolti vanno sostenuti."),

 (10,"chiaro",0,"La contenzione in psichiatria segue gli stessi principi della lezione tre punto uno: e' una misura estrema, eccezionale e temporanea, con prescrizione, monitoraggio stretto, documentazione e rivalutazione continua."),
 (10,"chiaro",0,"Molti SPDC in Italia lavorano secondo un modello no restraint. Dimostrano che con relazione, presenza, de-escalation e organizzazione dell'ambiente la contenzione puo' diventare rarissima, o assente."),

 (11,"chiaro",0,"Le dipendenze sono seguite dai SerD, i Servizi per le Dipendenze, previsti dal DPR trecentonove del millenovecentonovanta, della lezione cinque punto sette: sostanze, alcol, gioco d'azzardo."),
 (11,"chiaro",0,"L'approccio e' non giudicante, con interventi di riduzione del danno. Un punto pratico: chi e' in terapia sostitutiva per gli oppioidi, con metadone o buprenorfina, quando viene ricoverato deve continuarla."),
 (11,"chiaro",0,"La dose si verifica con il SerD. Interromperla provoca astinenza, e allontana la persona dalle cure. E nell'overdose da oppioidi, il farmaco da ricordare e' il naloxone."),

 (12,"chiaro",0,"L'astinenza da alcol, frequente nei pazienti ricoverati per altri motivi. Compare di norma tra sei e ventiquattro ore dall'ultima assunzione."),
 (12,"chiaro",0,"Tremori, sudorazione, tachicardia, ansia, insonnia, nausea, fino alle convulsioni. La forma piu' grave e' il delirium tremens, tipicamente fra quarantotto e settantadue ore: confusione, allucinazioni, agitazione, ipertermia."),
 (12,"chiaro",0,"E' un'emergenza. Si valuta con scale come la CIWA-Ar. E una regola importante: nella persona con abuso di alcol si somministra la tiamina, la vitamina B uno, prima del glucosio, per prevenire l'encefalopatia di Wernicke."),
 (12,"chiaro",0,"Per questo l'anamnesi sull'alcol, fatta senza giudizio all'ingresso, e' un atto di sicurezza. Chi la salta scopre il problema al secondo giorno, nel momento peggiore."),

 (13,"chiaro",0,"Un tema trasversale: lo stigma. Ritarda la richiesta di aiuto e peggiora gli esiti. Comincia dal linguaggio: si dice persona con schizofrenia, non schizofrenico."),
 (13,"chiaro",0,"E un dato che fa riflettere: le persone con disturbi mentali gravi hanno un'aspettativa di vita ridotta, in buona parte per malattie fisiche trascurate. Il loro dolore toracico va valutato come quello di chiunque."),

 (14,"chiaro",0,"Il caso. Un uomo in chirurgia da due giorni: tremori, sudorazione, frequenza centodiciotto, agitato. Dice di vedere insetti sul muro. All'ingresso nessuno gli ha chiesto dell'alcol."),
 (14,"chiaro",0,"Che cosa pensi? Astinenza alcolica, con evoluzione verso il delirium tremens, che compare proprio fra quarantotto e settantadue ore. I tempi tornano."),
 (14,"chiaro",0,"Che cosa fai? Sicurezza, parametri, glicemia, avvisi il medico, prepari la terapia prescritta, con la tiamina prima del glucosio, e monitori con una scala. E l'anamnesi sulle sostanze non e' un'intrusione: e' prevenzione."),

 (15,"chiaro",0,"In Veneto ogni ULSS ha un Dipartimento di Salute Mentale, con CSM, SPDC e strutture residenziali e diurne, e una rete per le dipendenze con i SerD, in forte integrazione con il privato sociale e il volontariato."),
 (15,"chiaro",0,"All'orale, la frase chiave e': la salute mentale si cura nel territorio, e l'ospedale e' un momento del percorso, non il centro."),

 (16,"chiaro",0,"La tabella. Legge centottanta e legge ottocentotrentatre', articoli dal trentatre' al trentacinque. TSO: alterazioni urgenti, rifiuto, nessuna cura possibile fuori dall'ospedale. La pericolosita' non c'entra."),
 (16,"chiaro",0,"Proposta, convalida, ordinanza del sindaco, giudice tutelare entro quarantotto ore e convalida entro altre quarantotto. Sette giorni. Chiedere direttamente. Tiamina prima del glucosio. Terapie sostitutive: continuare."),

 (17,"chiaro",0,"[warm] Nella prossima lezione: l'area materno-infantile. Dalla gravidanza al parto, dal puerperio al neonato."),
 (17,"chiaro",0,"Fino all'assistenza pediatrica di base, dove i valori normali cambiano con l'eta' e il dolore si misura in un altro modo. A tra poco."),
]
CAPITOLI = {1:"Apertura",2:"I principali disturbi",3:"La legge e l'organizzazione",4:"Il TSO: i tre requisiti",5:"Il TSO: la procedura",6:"Il TSO: durata, diritti, ASO",
 7:"L'agitazione psicomotoria",8:"Il rischio suicidario",9:"La prevenzione in ospedale",10:"La contenzione in psichiatria",11:"Le dipendenze e i SerD",12:"L'astinenza da alcol",
 13:"Lo stigma",14:"Il caso",15:"In Veneto",16:"La tabella",17:"Chiusura"}

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
