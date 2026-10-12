# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
#
# Riscrittura del copione in origine/copione-di-partenza.md (lezione 18.5,
# l'ultima del modulo). Le 13 scene di partenza stanno a ~530 caratteri l'una,
# contro un tetto di 225 per blocco: ogni scena diventa tre o quattro blocchi.
#
# Il parlato di partenza misura 6.875 caratteri, circa 6.940 con gli
# apostrofi: sotto la forchetta del modulo (7.020-7.120). Le aggiunte (AGG)
# vengono dallo schermo dello stesso documento: la domanda «mi fa vedere come
# lo usa?», il piano «assistenziale», la differenza fra protesi e ortesi come
# domanda, il numero del modulo dopo; e il richiamo alla vigilanza della 18.1. NESSUN fatto nuovo.
#
# Una riformulazione per la voce: «anche quando faccio prima a mano», detto in
# prima persona dal narratore, diventa «anche quando sembra di fare prima a
# mano». Lo schermo tiene la frase fra virgolette.
#
# Registro del modulo: tecnico e pratico. Tag: [warm] in apertura e in
# chiusura, [thoughtful] sul quadro del modulo.
#
# Il velo rosa sta sul riparare alla meglio, sull'intrappolamento nelle
# sponde, sugli ausili improvvisati e sui distrattori.
BLOCCHI = [
 (1,"chiaro",0,"[warm] Bentornata e bentornato all'ultima lezione del Modulo diciotto. Ricomponiamo il percorso dell'ausilio dal punto di vista della sicurezza."),
 (1,"chiaro",0,"Come si sceglie, come si addestra, come si mantiene, che cosa si fa quando qualcosa va storto. Poi il quadro completo del modulo."),
 (1,"profondo",1.2,"Il criterio di questa lezione e' uno: la sicurezza con gli ausili non e' una questione di fortuna, e' una questione di procedura."),

 (2,"chiaro",0,"La valutazione in equipe. Nessun ausilio si sceglie da soli. Il medico da' l'indicazione clinica. Il fisioterapista valuta la funzione motoria."),
 (2,"chiaro",0,"Il terapista occupazionale valuta le attivita' e l'ambiente. L'infermiere integra l'ausilio nel piano assistenziale."),
 (2,"chiaro",0,"L'OSS porta l'osservazione della quotidianita': come la persona si muove davvero, che cosa riesce a fare al mattino, e che cosa non riesce piu' a fare la sera."),
 (2,"chiaro",1.2,"La persona e il caregiver portano preferenze, accettazione e fattibilita' a casa. E la scelta si documenta nel piano assistenziale."),

 (3,"profondo",0,"L'addestramento. Un ausilio consegnato senza addestramento e' un ausilio abbandonato o pericoloso, e tutti e due i casi sono frequenti."),
 (3,"chiaro",0,"L'addestramento riguarda la persona, il caregiver e gli operatori. Si fa provare, non solo spiegare, e si ripete finche' il gesto e' sicuro."),
 (3,"chiaro",0,"Si verifica la comprensione chiedendo di mostrare: mi fa vedere come lo usa? Non chiedendo se ha capito."),
 (3,"chiaro",1.2,"Per i sollevatori e i dispositivi complessi serve una formazione specifica e documentata, come prevede il Modulo undici per le attrezzature. L'OSS addestra sugli ausili che conosce, e per gli altri chiede."),

 (4,"chiaro",0,"La manutenzione. Quella ordinaria comprende pulizia, controllo visivo, ricarica e piccole regolazioni previste dal libretto d'uso, e la fa chi usa l'ausilio."),
 (4,"chiaro",0,"Quella straordinaria, cioe' le riparazioni, compete al fornitore o al servizio tecnico, mai all'operatore."),
 (4,"chiaro",0,"Gli ausili forniti dal servizio sanitario hanno la manutenzione a carico del fornitore, nei tempi previsti dal Nomenclatore. Dove previsto, esiste un registro delle verifiche."),
 (4,"chiaro",1.2,"Le parti che si consumano prima, e vanno guardate per prime: ruote, freni, batterie, imbracature, cinghie."),

 (5,"profondo",0,"Quando l'ausilio non va. Non si usa un ausilio che presenta un difetto, anche piccolo: un freno che tiene poco oggi non tiene domani."),
 (5,"chiaro",0,"Si mette fuori servizio in modo visibile: un cartello, un nastro, allontanandolo. Si segnala secondo la procedura aziendale: a chi, come, entro quando."),
 (5,"chiaro",0,"Si usa l'alternativa sicura: un altro ausilio, due operatori, il rinvio della manovra. E si documenta la segnalazione."),
 (5,"tenue",1.2,"Riparare alla meglio per non perdere tempo e' l'errore che produce incidenti, e che sposta la responsabilita' su chi lo ha fatto."),

 (6,"chiaro",0,"Gli incidenti con gli ausili. La caduta da carrozzina, da sollevatore, dal letto. L'intrappolamento tra sponda e materasso, che puo' essere mortale."),
 (6,"chiaro",0,"Le lesioni da imbracatura, il ribaltamento, lo schiacciamento delle dita. Prima viene la sicurezza della persona, con valutazione e chiamata, come nel Modulo nove."),
 (6,"chiaro",0,"Poi non si sposta l'ausilio finche' non e' stato visto, e si fotografa se la procedura lo prevede."),
 (6,"profondo",1.2,"Si segnala l'evento, come nella lezione quattordici punto sette, e si segnala il dispositivo al sistema di vigilanza, come nella prima lezione. E il mancato incidente si segnala come l'incidente."),

 (7,"tenue",0,"L'intrappolamento nelle sponde merita una scena a se', perche' e' un rischio sottovalutato. La persona scivola tra sponda e materasso, o tra le sbarre, e non riesce a liberarsi."),
 (7,"chiaro",0,"Il rischio e' maggiore nelle persone agitate, confuse, che si muovono molto."),
 (7,"chiaro",0,"Le sponde devono essere compatibili con letto e materasso, con spazi minimi: un materasso troppo stretto o troppo morbido crea proprio lo spazio pericoloso."),
 (7,"profondo",1.2,"La sponda non e' automaticamente sicura: a volte e' il rischio. Il letto basso con il materasso accanto a terra e' spesso piu' sicuro."),

 (8,"chiaro",0,"La sicurezza dell'operatore. Gli ausili proteggono anche chi assiste: il danno da movimentazione e' cumulativo, e lo hai visto nei Moduli sei e undici."),
 (8,"chiaro",0,"Si usa sempre l'ausilio previsto, anche quando sembra di fare prima a mano, perche' quel prima si paga negli anni. Altezza del letto regolata, posizione del corpo, nessuna torsione."),
 (8,"chiaro",0,"Scarpe chiuse, nessun monile, abbigliamento che non intralcia. La fretta e' il primo fattore di rischio."),
 (8,"profondo",1.2,"E segnalare ausili mancanti o insufficienti non e' una lamentela: e' un obbligo del lavoratore previsto dalla normativa sulla sicurezza."),

 (9,"chiaro",0,"Gli ausili al domicilio. Qui l'OSS vede spesso ausili forniti ma non usati, usati male, o improvvisati."),
 (9,"tenue",0,"Il letto matrimoniale troppo basso con cui si assiste da anni. La carrozzina nel ripostiglio. Corde e cinture usate al posto delle sponde."),
 (9,"chiaro",0,"Quasi sempre il caregiver non e' stato addestrato, o ha dimenticato, o ha paura. L'OSS osserva, riaddestra, riferisce all'equipe domiciliare, che puo' rivalutare."),
 (9,"profondo",1.2,"E un ausilio improvvisato dal familiare e' una segnalazione, non un rimprovero: dietro c'e' un bisogno senza risposta, non una negligenza."),

 (10,"chiaro",0,"[thoughtful] Il quadro completo del Modulo diciotto. Prima lezione: ausilio, presidio, protesi e ortesi, l'ICF, lo specialista che prescrive e l'ULSS che fornisce, l'OSS che non ripara."),
 (10,"chiaro",0,"Seconda: bastone, deambulatore, carrozzina, ausili minori, sollevatori attivo e passivo, letti. Terza: alimentazione, vestizione, igiene, bagno, incontinenza, superfici antidecubito, ambiente e barriere."),
 (10,"chiaro",1.2,"Quarta: protesi acustica, vista, comunicazione aumentativa, teleassistenza, telemonitoraggio, sensori e consenso. Quinta: equipe, addestramento, manutenzione, messa fuori servizio, incidenti, intrappolamento, domicilio."),

 (11,"tenue",0,"I distrattori tipici del modulo. L'OSS non prescrive, non ripara, non modifica: usa, verifica e segnala. La regola di scelta e' il minimo ausilio che garantisce sicurezza e autonomia."),
 (11,"tenue",0,"Il sollevatore attivo e' per chi ha carico e tiene il tronco, il passivo per chi non collabora. Le sponde possono essere un rischio, per l'intrappolamento, e una contenzione, se usate per trattenere."),
 (11,"tenue",1.2,"Un ausilio difettoso non si usa: fuori servizio, segnalazione, alternativa. E la tecnologia richiede consenso, e puo' essere contenzione."),

 (12,"chiaro",0,"Cinque domande di autovalutazione, con le risposte. Uno, la differenza fra protesi e ortesi: la protesi sostituisce una parte del corpo, l'ortesi la sostiene."),
 (12,"chiaro",0,"Due: l'ausilio del Nomenclatore lo prescrive il medico specialista, e l'ULSS lo fornisce. Tre: il sollevatore attivo e' indicato per chi ha carico sugli arti inferiori e tiene il tronco."),
 (12,"chiaro",1.2,"Quattro: un ausilio difettoso non si usa, si mette fuori servizio, si segnala, si usa l'alternativa. Cinque: un localizzatore GPS richiede consenso, informazione e proporzionalita', e il dato raccolto e' un dato personale."),

 (13,"profondo",0,"Hai completato il Modulo diciotto. Il filo che lo tiene insieme e' la frase della prima lezione: l'ausilio giusto restituisce autonomia, e quello sbagliato, o usato male, la toglie."),
 (13,"chiaro",0,"Usare, verificare ogni volta, addestrare, segnalare. Mai riparare, mai improvvisare. E la tecnologia con la persona, mai contro."),
 (13,"chiaro",0,"[warm] Nel prossimo e ultimo modulo bonus, il diciannove, cambiamo lingua: cinque lezioni di inglese per il concorso, dal lessico sanitario ai quesiti tipo. Ci vediamo li'."),
]

import sys as _sys, pathlib as _pl
_sys.path.insert(0, str(_pl.Path(__file__).resolve().parent.parent))
from profilo import CPS, MAX_CAR_BLOCCO, MAX_SCENE, COPERTINA, CHIUSURA, STACCO

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1:"L'ultima lezione",2:"La valutazione in equipe",3:"L'addestramento",
 4:"La manutenzione",5:"Quando l'ausilio non va",6:"Gli incidenti",
 7:"L'intrappolamento nelle sponde",8:"La sicurezza dell'operatore",9:"Al domicilio",
 10:"Il quadro del modulo",11:"I distrattori",12:"Autovalutazione",
 13:"La chiusura"}

blocchi=[]
for i,(cap,tema,posa,txt) in enumerate(BLOCCHI, start=2):
    blocchi.append({"id":f"s{i:02d}","capitolo":cap,"tema":tema,"posa":posa,"text":txt})

errori=[]
tot=sum(len(b["text"]) for b in blocchi)
nscene=len(blocchi)+2
if nscene>MAX_SCENE: errori.append(f"scene {nscene} > {MAX_SCENE}")
for b in blocchi:
    if any(c in ACCENTATE for c in b["text"]):
        errori.append(f'{b["id"]}: vocale accentata -> ' + "".join(sorted({c for c in b["text"] if c in ACCENTATE})))
    if len(b["text"])>MAX_CAR_BLOCCO: errori.append(f'{b["id"]}: {len(b["text"])} car, blocco troppo lungo')
tags=sum(len(re.findall(r"\[[a-z]+\]", b["text"])) for b in blocchi)
if tags>6: errori.append(f"tag di intenzione: {tags} > 6")
for a,b in zip(blocchi, blocchi[1:]):
    if a["capitolo"]!=b["capitolo"] and not a["posa"]:
        errori.append(f'{a["id"]}: chiude il capitolo {a["capitolo"]} senza posa')

pose=sum(b["posa"] for b in blocchi)
parlato=tot/CPS+pose; durata=parlato+COPERTINA+CHIUSURA
print(f"blocchi   {len(blocchi)}        scene {nscene}/{MAX_SCENE}")
print(f"caratteri {tot}      media {tot/len(blocchi):.0f} car/blocco")
print(f"parlato   {parlato:.0f} s     montato {durata//60:.0f}:{durata%60:04.1f}   (stima a {CPS} car/s)")
print(f"tag       {tags}        pose {sum(1 for b in blocchi if b['posa'])} per {pose:.1f} s")
print()
cur=None
for b in blocchi:
    if b["capitolo"]!=cur:
        cur=b["capitolo"]; print(f'  cap {cur:2d}  {CAPITOLI[cur]}')
    p=f'  +{b["posa"]}s' if b["posa"] else ""
    print(f'    {b["id"]}  {len(b["text"]):3d} car  [{b["tema"]:8s}]{p} {b["text"][:50]}...')

acc=0; stacco=None
for b in blocchi:
    acc+=len(b["text"])
    if stacco is None and acc>tot/2: stacco=b["id"]
A=sum(len(b["text"]) for b in blocchi[:[x["id"] for x in blocchi].index(stacco)+1])
print(f"\nstacco tracce dopo {stacco}:  chunkA {A} car  ·  chunkB {tot-A} car   (limite 5000)")

# Lo stacco che conta e' quello dichiarato in profilo.py, non quello suggerito
# qui: il suggerimento divide a meta' i caratteri, la scelta la fa chi scrive e
# va su un cambio di capitolo. I due file di testo finora si scrivevano a mano,
# ed e' il passaggio in cui lo stacco della lezione precedente sopravvive senza
# che nessun controllo se ne accorga — i conti tornano tutti, sui blocchi
# sbagliati. Quindi li scrive questo script, dallo STACCO dichiarato.
ids = [b["id"] for b in blocchi]
if STACCO not in ids:
    errori.append(f"STACCO «{STACCO}» non e\' un blocco di questa lezione")
else:
    k = ids.index(STACCO) + 1
    if blocchi[k-1]["capitolo"] == blocchi[k]["capitolo"]:
        errori.append(f"STACCO «{STACCO}» cade dentro il capitolo "
                      f"{blocchi[k]['capitolo']}, non a un cambio")
    if STACCO != stacco:
        print(f"  (STACCO dichiarato {STACCO}, il mezzo dei caratteri cade a {stacco})")

if errori:
    print("\nERRORI:"); [print("  -",e) for e in errori]; sys.exit(1)
qui = _pl.Path(__file__).parent
json.dump(blocchi, open(qui/"blocchi.json","w",encoding="utf-8"),
          indent=1, ensure_ascii=False)

k = ids.index(STACCO) + 1
for nome, parte in (("chunkA", blocchi[:k]), ("chunkB", blocchi[k:])):
    testo = " ".join(b["text"] for b in parte)
    (qui/f"{nome}.txt").write_text(testo + "\n", encoding="utf-8")
    print(f"{nome}.txt  {len(testo)} car  ({parte[0]['id']}-{parte[-1]['id']})")

print("\nOK, nessun errore")
