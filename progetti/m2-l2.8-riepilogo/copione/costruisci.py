# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Chiudiamo il secondo modulo. Nessun contenuto nuovo: ricomponiamo. La mappa delle sette lezioni, il filo che le tiene insieme, i numeri, le confusioni che costano di piu', i casi tipici."),
 (1,"chiaro",0,"Guarda questo video due volte: adesso, per chiudere il modulo, e la settimana prima della prova, quando serve rimettere in ordine quello che nel frattempo si e' sparpagliato."),
 (1,"tenue",0,"E' un ripasso, quindi andiamo piu' svelti del solito. Se un punto ti sfugge, e' il segno che quella lezione va ripresa: non tutto il modulo da capo, solo quella. Un ripasso serve a trovare i buchi, non a riempirli tutti."),

 (2,"chiaro",0,"La mappa, in sette righe. 2.1: il processo di assistenza, i cinque passi. 2.2: modelli e tassonomie, cioe' le categorie con cui si guarda. 2.3: accertamento e scale. 2.4: la documentazione."),
 (2,"chiaro",0,"2.5: EBP, linee guida, PDTA e procedure, cioe' da dove viene quello che facciamo. 2.6: rischio clinico e sicurezza del paziente. 2.7: comunicazione clinica e continuita' assistenziale."),
 (2,"chiaro",0,"Sette lezioni, e non sono sette argomenti separati. Sono sette punti di una sola linea, ed e' la linea che conviene saper raccontare all'orale, non i punti presi uno per volta."),

 (3,"chiaro",0,"Una sola catena tiene insieme tutto. Raccolgo i dati con le categorie che la disciplina mi fornisce, e non a caso. Decido sulla base delle migliori evidenze disponibili, integrate con l'esperienza e con la persona."),
 (3,"chiaro",0,"Documento cio' che faccio. Comunico nei passaggi. E sorveglio il sistema, perche' l'errore e' prevedibile, e chi lo prevede costruisce le barriere prima che servano."),
 (3,"chiaro",0,"Metodo, prova, sicurezza: tre facce dello stesso lavoro. Se all'orale ti chiedono che cosa hai imparato in questo modulo, la risposta e' questa catena, in cinque verbi."),

 (4,"chiaro",0,"Dal 2.1: cinque fasi, e il processo e' ciclico, non lineare. La valutazione non chiude niente: riapre l'accertamento. Ed e' il passo che si dimentica piu' spesso, sia nei quiz sia in reparto."),
 (4,"chiaro",0,"Diagnosi reale PES: problema, etiologia, segni e sintomi. Diagnosi di rischio PE, senza segni, perche' se i segni ci fossero non sarebbe piu' un rischio ma un problema in atto."),
 (4,"chiaro",0,"L'obiettivo ha per soggetto la persona, con indicatore e tempo. Le priorita': ABC, poi rischio di danno a breve, poi impatto sull'autonomia e percezione della persona."),

 (5,"chiaro",0,"Dal 2.2: il metaparadigma ha quattro concetti. Henderson quattordici bisogni, Gordon undici modelli funzionali. E non il contrario: e' lo scambio piu' frequente di tutto il modulo."),
 (5,"chiaro",0,"Orem tre sistemi: totalmente compensatorio, parzialmente compensatorio, e di supporto ed educazione. E la catena delle tassonomie: NANDA, NOC, NIC, cioe' diagnosi, risultati, interventi."),
 (5,"chiaro",0,"Un modo per non sbagliare NOC e NIC: NOC finisce come outcome, NIC come intervento. La lettera che cambia nella sigla e' la stessa che cambia nel significato, e non e' un caso."),

 (6,"chiaro",0,"Dal 2.3, e questa e' la slide da fotografare adesso. Braden da 6 a 23, soglia 16. Norton da 5 a 20, soglia 14. Conley da 0 a 10, rischio a partire da 2."),
 (6,"chiaro",0,"Tinetti sotto 19. Barthel da 0 a 100. Glasgow da 3 a 15, con coma sotto o uguale a 8. CAM: uno piu' due, piu' tre oppure quattro. E MUST: rischio alto a partire da 2."),
 (6,"chiaro",0,"Otto scale e otto intervalli, ed e' la parte che si dimentica per prima, perche' sono numeri senza appiglio. Se devi trascrivere una cosa sola nel quaderno di ripasso, trascrivi questa."),

 (7,"chiaro",0,"E poi c'e' la regola che risolve meta' delle domande sulle scale anche quando non le ricordi a memoria. Se la scala misura una capacita', piu' alto e' meglio."),
 (7,"chiaro",0,"Se misura un rischio, piu' alto e' peggio. Barthel misura autonomia: 100 e' ottimo. Conley misura il rischio di caduta: 10 e' pessimo. Fin qui e' intuitivo, e infatti non e' qui che si sbaglia."),
 (7,"profondo",1.2,"Le due eccezioni sono Braden e Norton, che misurano un rischio con punteggio inverso: piu' basso, piu' a rischio. Due eccezioni sole, e sono proprio le due che si chiedono di piu'."),

 (8,"chiaro",0,"Le otto confusioni che costano di piu'. Uno: obiettivo o intervento. Guarda il soggetto della frase: se il soggetto e' la persona e' un obiettivo, se sei tu e' un intervento."),
 (8,"chiaro",0,"Due: diagnosi reale con i segni, di rischio senza. Tre: la diagnosi infermieristica si tratta in autonomia, il problema collaborativo si sorveglia e si gestisce insieme al medico."),
 (8,"chiaro",0,"Quattro: quattordici Henderson, undici Gordon. Se non ricordi quale sia quale, ricorda che quelli di Gordon sono modelli funzionali di salute, e sono i meno numerosi dei due."),

 (9,"chiaro",0,"Cinque: NOC sono gli outcome, i risultati; NIC gli interventi. Sei: Braden e' lesioni da pressione, con punteggio inverso; Conley e' cadute, con punteggio diretto. Due rischi diversi e due direzioni diverse."),
 (9,"chiaro",0,"Sette: la linea guida raccomanda, la procedura dice come si fa qui, il PDTA dice chi fa che cosa lungo il percorso. Scientifica la prima, organizzative le altre due."),
 (9,"chiaro",0,"Otto: il near miss non arriva al paziente, l'evento avverso si'. E la complicanza non e' nessuno dei due, perche' e' attesa e non presuppone un errore di nessuno."),

 (10,"chiaro",0,"I casi tipici. Traccia con dati incompleti: la risposta non e' scegliere l'intervento piu' sensato. Si comincia raccogliendo il dato mancante, ed e' quasi sempre quella l'opzione giusta."),
 (10,"chiaro",0,"Quale intervento ha la priorita': ABC prima di tutto, poi il rischio di danno a breve, poi l'impatto sull'autonomia e la percezione della persona. In quest'ordine, sempre."),
 (10,"chiaro",0,"Braden 12 in paziente allettato: cambi posturali programmati, superficie antidecubito, gestione dell'umidita', valutazione nutrizionale, ispezione cutanea a ogni turno."),

 (11,"profondo",1.2,"Perche' al punteggio deve corrispondere una modifica del piano. Una scala compilata e non seguita da niente e' peggio di una non compilata: dimostra che il rischio era noto."),
 (11,"chiaro",0,"Prescrizione illeggibile o dubbia: chiedo chiarimento al prescrittore, se il dubbio permane non do corso, e documento il dubbio e la richiesta. Tre passi, in quest'ordine."),
 (11,"chiaro",0,"Near miss intercettato in tempo: segnalo comunque, perche' e' apprendimento gratuito. Chiamata al medico per peggioramento: strutturo con SBAR, esplicitando valutazione e richiesta."),

 (12,"chiaro",0,"Cinque formule da saper citare a memoria, per intero. PES: problema, etiologia, segni e sintomi. E la diagnosi di rischio e' PE, perche' i segni non ci sono ancora."),
 (12,"chiaro",0,"PICO: popolazione, intervento, confronto, esito. SBAR: situazione, background, assessment e recommendation, e sono le ultime due quelle che contano. CAM: uno piu' due, piu' tre oppure quattro."),
 (12,"chiaro",0,"E l'EBP: evidenze piu' competenza clinica piu' valori della persona. Tre addendi, e il distrattore classico ne toglie due, proprio i due che riguardano le persone."),

 (13,"chiaro",0,"E la frase che attraversa il modulo dall'inizio alla fine: cio' che non e' documentato si presume non fatto. L'abbiamo incontrata nella 1.5 e non ci ha piu' lasciati."),
 (13,"chiaro",0,"Vale per la scala compilata, per la segnalazione fatta al medico, per il rifiuto della persona, per la rivalutazione del dolore dopo un antidolorifico. Nel dubbio, scrivi."),
 (13,"profondo",1.2,"Non e' un avvertimento burocratico: e' l'unico modo in cui il lavoro che hai fatto continua a esistere a distanza di anni. La memoria non fa prova, il documento si'."),

 (14,"chiaro",0,"Quattro agganci veneti da portare all'orale. Uno: il processo e' strutturato dentro la cartella clinica elettronica, con scale integrate e rivalutazioni a intervalli definiti."),
 (14,"chiaro",0,"Due: la catena delle evidenze e' SNLG, indirizzi regionali e PDTA, procedure aziendali, pratica al letto. Spesso dentro le reti cliniche: oncologica, stroke, trauma."),
 (14,"chiaro",0,"Tre: la filiera del rischio e' l'operatore che segnala, il risk management aziendale, il Centro regionale, l'Osservatorio nazionale, con il Difensore civico nel ruolo di Garante."),

 (15,"chiaro",0,"Quattro: la continuita' verso il territorio passa da dimissioni protette, dalle COT e dall'infermiere di famiglia e comunita'. E adesso come proseguire, in quattro passi."),
 (15,"chiaro",0,"Uno: affronta il test del modulo, trenta domande con soglia ventuno. Due: riprendi solo le lezioni che gli errori ti hanno segnalato, non tutto il modulo da capo."),
 (15,"chiaro",0,"Tre: trasferisci nel quaderno di ripasso i numeri delle scale e le formule. E' la parte che si dimentica per prima, ed e' anche l'unica che si recupera in cinque minuti."),

 (16,"profondo",1.2,"Quattro, ed e' il consiglio con il rendimento piu' alto di tutto il corso: esercita lo schema in cinque passi della lezione 2.1 su due casi clinici. Non su venti: su due, fatti bene."),
 (16,"chiaro",0,"Ci fermiamo qui. Con il modulo 1 hai la grammatica della professione; con il modulo 2 la sintassi, cioe' il metodo, la prova e la sicurezza. Tre parole per sette lezioni."),
 (16,"chiaro",0,"[warm] Dal modulo 3 il metodo diventa clinica: bisogni fondamentali, comfort, assistenza di base avanzata. E comincia la parte che pesa di piu' nella prova pratica. Ci vediamo li'."),
]

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1:"Apertura",2:"La mappa",3:"Il filo del modulo",
 4:"I numeri del processo",5:"I numeri dei modelli",6:"I numeri delle scale",
 7:"La regola della direzione",8:"Confusioni 1-4",9:"Confusioni 5-8",
 10:"I casi tipici, prima parte",11:"I casi tipici, seconda parte",
 12:"Le formule",13:"La frase del modulo",14:"Gli agganci veneti",
 15:"Come proseguire",16:"Chiusura"}
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
