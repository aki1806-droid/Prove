# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Gli operatori sanitari si prendono cura della sicurezza dei pazienti, ma sono a loro volta esposti a rischi importanti. Questa lezione riguarda prima di tutto te."),
 (1,"chiaro",0,"Punture accidentali, mal di schiena da movimentazione, sostanze chimiche, radiazioni, stress, aggressioni: sono i rischi del lavoro in sanita', e ciascuno ha le sue regole."),
 (1,"chiaro",0,"Il riferimento e' il decreto legislativo ottantuno del duemilaotto, il Testo unico sulla salute e sicurezza sul lavoro. E' una domanda d'esame quasi certa, e una tutela concreta per te."),

 (2,"chiaro",0,"Il decreto legislativo nove aprile duemilaotto, numero ottantuno, si applica a tutti i settori, pubblici e privati. Il primo principio: la valutazione di tutti i rischi, e la loro eliminazione o riduzione alla fonte."),
 (2,"chiaro",0,"Poi la priorita' delle misure collettive rispetto a quelle individuali. E ancora l'informazione, la formazione e l'addestramento, e la partecipazione dei lavoratori."),
 (2,"profondo",1.2,"[serious] Prima si cambia l'organizzazione o l'attrezzatura. Poi si danno i DPI."),

 (3,"chiaro",0,"Le figure della prevenzione, da conoscere una per una. La prima e' il datore di lavoro, che nelle aziende sanitarie e' il direttore generale."),
 (3,"chiaro",0,"Ha due obblighi non delegabili. La valutazione di tutti i rischi, con l'elaborazione del documento di valutazione dei rischi, il DVR. E la nomina del responsabile del servizio di prevenzione e protezione."),
 (3,"chiaro",0,"Il dirigente attua le direttive del datore di lavoro, organizza l'attivita' e vigila. Per esempio, il direttore di un'unita' operativa."),

 (4,"chiaro",0,"Il preposto sovrintende all'attivita' lavorativa, e vigila sul rispetto delle norme e sull'uso dei dispositivi di protezione individuale."),
 (4,"chiaro",0,"I suoi obblighi sono stati rafforzati dalla legge duecentoquindici del duemilaventuno: davanti a comportamenti scorretti deve intervenire per modificarli e, se c'e' pericolo, interrompere l'attivita'."),
 (4,"chiaro",0,"Ha una formazione specifica, con aggiornamento periodico. In sanita' il preposto e' spesso il coordinatore infermieristico, e in alcune situazioni anche l'infermiere che dirige l'attivita' di altri operatori."),

 (5,"chiaro",0,"Le altre figure. L'RSPP, responsabile del servizio di prevenzione e protezione, nominato dal datore di lavoro. E il medico competente, che svolge la sorveglianza sanitaria e collabora alla valutazione dei rischi."),
 (5,"chiaro",0,"L'RLS, il rappresentante dei lavoratori per la sicurezza. E' eletto o designato dai lavoratori, accede ai luoghi di lavoro, ed e' consultato sulla valutazione dei rischi."),
 (5,"chiaro",0,"Poi gli addetti alle emergenze, per l'antincendio e il primo soccorso. E i lavoratori, che non sono soltanto tutelati: hanno anch'essi degli obblighi precisi."),
 (5,"chiaro",0,"Osservare le istruzioni ricevute, usare correttamente i DPI, segnalare i pericoli, partecipare alla formazione, sottoporsi ai controlli sanitari."),

 (6,"chiaro",0,"Il DVR individua i rischi, le misure di prevenzione e protezione, il programma di miglioramento, le procedure e i ruoli."),
 (6,"chiaro",0,"Non e' un documento fermo. Va aggiornato quando cambia l'organizzazione, dopo infortuni significativi, oppure in base ai risultati della sorveglianza sanitaria."),
 (6,"chiaro",0,"E almeno una volta all'anno, nelle aziende con piu' di quindici lavoratori, si tiene la riunione periodica: datore di lavoro, RSPP, medico competente e RLS, intorno allo stesso tavolo."),

 (7,"chiaro",0,"La sorveglianza sanitaria, svolta dal medico competente. Le visite sono preventive, periodiche, su richiesta del lavoratore, e al cambio di mansione."),
 (7,"chiaro",0,"E c'e' la visita alla ripresa del lavoro, dopo un'assenza per malattia di oltre sessanta giorni continuativi. Sessanta giorni, e continuativi: un numero da ricordare."),
 (7,"chiaro",0,"Il giudizio di idoneita' alla mansione specifica puo' essere: idoneo. Oppure idoneo parziale, temporaneo o permanente, con prescrizioni o limitazioni, per esempio niente movimentazione di carichi."),
 (7,"chiaro",0,"Oppure inidoneo temporaneo, o inidoneo permanente. E contro il giudizio si puo' fare ricorso all'organo di vigilanza dell'ASL, entro trenta giorni."),

 (8,"chiaro",0,"I rischi specifici, cominciando dal biologico, che hai gia' incontrato nel modulo quattro. E' regolato dal Titolo dieci del decreto ottantuno."),
 (8,"chiaro",0,"Per le ferite da taglienti c'e' il Titolo dieci bis, introdotto dal decreto legislativo diciannove del duemilaquattordici: dispositivi con meccanismo di sicurezza, e divieto di reincappucciare gli aghi."),
 (8,"chiaro",0,"Poi contenitori a portata di mano, formazione, e una procedura per gestire l'esposizione accidentale. Piu' le vaccinazioni, come quella contro l'epatite B e l'antinfluenzale."),

 (9,"chiaro",0,"La movimentazione manuale dei pazienti, regolata dal Titolo sei. Le patologie del rachide sono fra le malattie professionali piu' frequenti in sanita'."),
 (9,"chiaro",0,"Per valutare il rischio in un reparto si usa l'indice MAPO, Movimentazione e Assistenza Pazienti Ospedalizzati. Considera il rapporto fra pazienti non autosufficienti e operatori."),
 (9,"chiaro",0,"E poi gli ausili disponibili, gli ambienti e la formazione. Le fasce: da zero a uno virgola cinque, rischio trascurabile. Da uno virgola cinquantuno a cinque, medio. Oltre cinque, elevato."),
 (9,"chiaro",0,"Le misure: ausili come sollevatori e teli ad alto scorrimento, formazione e organizzazione. Ricordi la lezione tre punto due: la tecnica corretta protegge sia il paziente sia te."),

 (10,"chiaro",0,"Il rischio chimico, regolato dal Titolo nove, comprende anche gli agenti cancerogeni e mutageni. Le fonti: disinfettanti e sterilizzanti, gas anestetici, farmaci antiblastici, formaldeide nei laboratori."),
 (10,"chiaro",0,"Gli strumenti: le schede di sicurezza dei prodotti, i DPI, le cappe, e per gli antiblastici l'allestimento centralizzato. E l'allergia al lattice, che ha portato a preferire guanti senza lattice."),

 (11,"chiaro",0,"Altri rischi. Le radiazioni ionizzanti, regolate oggi dal decreto legislativo centouno del duemilaventi: tre principi, tempo, distanza e schermature, e i dosimetri per il personale esposto."),
 (11,"chiaro",0,"Lo stress lavoro-correlato. La sua valutazione e' obbligatoria e rientra nel DVR, come prevede l'articolo ventotto: turni, carichi di lavoro, burnout."),
 (11,"chiaro",0,"E le aggressioni. Il datore di lavoro deve valutare il rischio, e adottare misure organizzative e strutturali, formazione e procedure di segnalazione."),

 (12,"chiaro",0,"L'emergenza e l'antincendio. Ogni struttura ha un piano di emergenza ed evacuazione, addetti antincendio con una formazione specifica, ed esercitazioni periodiche."),
 (12,"chiaro",0,"In ospedale vale un principio particolare: l'evacuazione orizzontale progressiva. I pazienti, spesso non autosufficienti, si spostano prima verso un compartimento sicuro sullo stesso piano."),
 (12,"chiaro",0,"Il compartimento e' protetto da porte tagliafuoco, e solo se necessario si passa all'evacuazione verticale. Ogni operatore conosce vie di fuga, estintori, allarmi, e tiene chiuse le porte tagliafuoco."),

 (13,"chiaro",0,"Infortunio e malattia professionale. L'infortunio e' un evento traumatico per causa violenta in occasione di lavoro, compreso il tragitto casa-lavoro: l'infortunio in itinere."),
 (13,"chiaro",0,"La malattia professionale, invece, e' causata dall'esposizione lavorativa nel tempo. L'infortunio va segnalato subito, con il certificato medico, e il datore di lavoro lo denuncia all'INAIL."),
 (13,"chiaro",0,"[thoughtful] E come per gli eventi avversi della lezione due punto sei, si segnalano anche i near miss, gli eventi senza danno: sono le informazioni piu' utili per prevenire."),

 (14,"chiaro",0,"[curious] Il caso, in due parti. Chi e' il preposto? E' chi sovrintende all'attivita' e vigila. E dopo la legge del duemilaventuno deve intervenire sui comportamenti scorretti, e se c'e' pericolo interrompere."),
 (14,"chiaro",0,"La parte pratica: un collega movimenta da solo un paziente pesante, senza usare il sollevatore che in reparto c'e'. Che cosa fai? Lo fermi, e lo aiuti a usare l'ausilio: sono a rischio sia lui sia il paziente."),
 (14,"chiaro",0,"Se il comportamento si ripete, o mancano ausili e personale, lo segnali al coordinatore. E ricordi che anche i lavoratori hanno l'obbligo di usare correttamente le attrezzature."),

 (15,"chiaro",0,"In Veneto vigila lo SPISAL delle ULSS, il Servizio di Prevenzione, Igiene e Sicurezza negli Ambienti di Lavoro: e' li' che va il ricorso sull'idoneita'. E ogni azienda ha il suo servizio di prevenzione e protezione."),

 (16,"chiaro",0,"La tabella. Decreto ottantuno del duemilaotto. Datore di lavoro: DVR e nomina dell'RSPP non delegabili. Dirigente. Preposto, rafforzato nel duemilaventuno. RSPP, medico competente, RLS eletto. Lavoratori con obblighi."),
 (16,"chiaro",0,"Visite, idoneita', ricorso entro trenta giorni. Titoli dieci e dieci bis. Titolo sei e MAPO, con le soglie uno virgola cinque e cinque. Titolo nove. Decreto centouno del duemilaventi. Stress, articolo ventotto."),

 (17,"chiaro",0,"[warm] Nella prossima lezione: la qualita' in sanita', l'accreditamento e il governo clinico, gli strumenti con cui un'organizzazione migliora in modo sistematico. A tra poco."),
]
CAPITOLI = {1:"Apertura",2:"Il Testo unico",3:"Datore di lavoro e dirigente",4:"Il preposto",5:"Le altre figure",6:"Il DVR e la riunione periodica",
 7:"Sorveglianza sanitaria e idoneita'",8:"Il rischio biologico",9:"La movimentazione dei pazienti",10:"Il rischio chimico",11:"Radiazioni, stress, aggressioni",
 12:"Emergenza e antincendio",13:"Infortunio e malattia professionale",14:"Il caso",15:"In Veneto",16:"La tabella",17:"Chiusura"}

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
