# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
#
# Riscrittura del copione in origine/copione-di-partenza.md (lezione 18.1, la
# prima del modulo 18). Le 13 scene di partenza stanno a ~530 caratteri l'una,
# contro un tetto di 225 per blocco: ogni scena diventa tre o quattro blocchi,
# nello stesso ordine.
#
# Il parlato di partenza misura 6.945 caratteri, 7.000 circa con gli apostrofi:
# appena sotto la forchetta del modulo 17 (7.050-7.150, tredici capitoli, dodici
# pose). Le aggiunte (AGG) sono poche, marcate, e vengono dallo schermo dello
# stesso documento. NESSUN fatto nuovo.
#
# Una correzione al documento: lo schermo della scena 8 dice che l'apparecchio
# acustico «si sente», il parlato «si vede». Lo stigma e' che si vede: la slide
# segue il parlato.
#
# Registro del modulo: tecnico e pratico, ogni ausilio legato a un gesto
# assistenziale. Tag: [warm] in apertura e in chiusura, [thoughtful] sul
# riepilogo, nient'altro.
#
# Il velo rosa sta su che cosa l'OSS NON fa (non ripara, non modifica) e sui
# distrattori.
BLOCCHI = [
 (1,"chiaro",0,"[warm] Benvenuta e benvenuto nel Modulo diciotto, il terzo dei moduli bonus. Cambiamo completamente registro: dopo la salute mentale e il fine vita, entriamo in un'area tecnica e pratica."),
 (1,"profondo",0,"Parto da un principio che vale per tutto il modulo: un ausilio giusto restituisce autonomia, e un ausilio sbagliato, o usato male, la toglie."),
 (1,"chiaro",1.2,"Gli ausili, i presidi, le tecnologie assistive. E l'OSS, che e' l'operatore che vede ogni giorno se l'ausilio funziona davvero nella vita della persona."),

 (2,"chiaro",0,"Le definizioni, perche' i quiz le scambiano. L'ausilio e' uno strumento che compensa una funzione ridotta e sostiene l'autonomia: la carrozzina, il deambulatore, le posate adattate."),
 (2,"chiaro",0,"Il presidio e' un dispositivo di uso sanitario o assistenziale: il materasso antidecubito, il pannolone, il catetere. La protesi sostituisce una parte del corpo: la protesi d'anca, la protesi acustica, la dentiera."),
 (2,"chiaro",1.2,"L'ortesi sostiene o corregge una parte del corpo: il tutore, il busto, il collare. La differenza sta nella funzione, non nell'aspetto."),

 (3,"chiaro",0,"Il quadro di riferimento e' l'ICF, la Classificazione Internazionale del Funzionamento dell'Organizzazione Mondiale della Sanita'."),
 (3,"chiaro",0,"Non guarda alla malattia ma a cio' che la persona puo' fare nel suo ambiente: le funzioni corporee, le attivita', la partecipazione alla vita sociale, e i fattori ambientali."),
 (3,"profondo",0,"Gli ausili sono fattori ambientali che facilitano. Il concetto decisivo e' questo: lo stesso deficit, con ausili diversi, produce disabilita' diverse."),
 (3,"chiaro",1.2,"Una persona che non cammina, con una carrozzina adeguata e un ambiente accessibile, partecipa. Senza, e' esclusa."),

 (4,"chiaro",0,"Chi prescrive e chi fornisce. La prescrizione compete al medico specialista, come il fisiatra, l'ortopedico, l'otorino o l'oculista, dopo una valutazione."),
 (4,"chiaro",0,"L'autorizzazione e la fornitura competono all'ULSS di residenza. Il riferimento e' il Nomenclatore tariffario, cioe' l'elenco degli ausili erogabili dal servizio sanitario."),
 (4,"chiaro",0,"E' contenuto nel decreto sui Livelli Essenziali di Assistenza del duemiladiciassette. Hanno diritto le persone con invalidita' riconosciuta, alcune condizioni specifiche e i minori."),
 (4,"chiaro",1.2,"Dopo la fornitura c'e' il collaudo, e ogni ausilio ha tempi minimi prima del rinnovo. Alcuni ausili sono dati in comodato, altri in proprieta'."),

 (5,"chiaro",0,"Il percorso dell'ausilio ha sei passaggi. La valutazione del bisogno, fatta in equipe, con medico, fisioterapista e terapista occupazionale. La prescrizione dello specialista. L'autorizzazione dell'ULSS."),
 (5,"chiaro",0,"La fornitura con l'addestramento all'uso, che e' un passaggio spesso trascurato: un ausilio consegnato senza addestramento e' un ausilio che restera' in un angolo."),
 (5,"profondo",1.2,"Il collaudo. E la verifica nel tempo, perche' i bisogni cambiano. L'OSS e' presente soprattutto nella fase dell'addestramento e nella verifica quotidiana."),

 (6,"chiaro",0,"Il ruolo dell'OSS. Utilizza correttamente gli ausili previsti dal piano. Verifica prima dell'uso: integrita', funzionamento, idoneita' alla persona."),
 (6,"chiaro",0,"Addestra e sostiene la persona e il caregiver nell'uso quotidiano, che e' una delle attivita' piu' preziose. Osserva se l'ausilio e' ancora adeguato, perche' la persona cambia: dimagrisce, perde forza, migliora."),
 (6,"chiaro",0,"Pulisce e sanifica secondo procedura. E segnala guasti, difetti e inadeguatezza."),
 (6,"tenue",1.2,"Non ripara e non modifica: un ausilio riparato in modo artigianale e' un ausilio pericoloso, e la responsabilita' ricade su chi lo ha modificato."),

 (7,"chiaro",0,"L'ausilio e l'autonomia residua, che hai incontrato fin dal Modulo uno. L'ausilio serve a fare da soli cio' che altrimenti richiederebbe aiuto, non a fare al posto della persona."),
 (7,"chiaro",0,"E qui c'e' un equilibrio: un ausilio troppo potente riduce le capacita' residue, perche' la persona smette di usare cio' che ancora puo' usare. Un ausilio insufficiente espone al rischio."),
 (7,"profondo",0,"La regola che guida la scelta e' il minimo ausilio che garantisce sicurezza e autonomia."),
 (7,"chiaro",1.2,"Una carrozzina data a chi potrebbe camminare con un deambulatore e' un danno, non una comodita'."),

 (8,"chiaro",0,"Un tema che i manuali tecnici non trattano: l'accettazione dell'ausilio. Molti ausili vengono rifiutati o abbandonati."),
 (8,"chiaro",0,"Il bastone fa vecchio. La carrozzina e' la resa. L'apparecchio acustico si vede. Il rifiuto va ascoltato, non forzato, perche' dietro c'e' un vissuto di perdita."),
 (8,"chiaro",0,"Che cosa aiuta: spiegare a che cosa serve in concreto, far provare senza impegno, iniziare per tempi brevi, coinvolgere la persona nella scelta quando possibile."),
 (8,"profondo",1.2,"Un ausilio accettato e usato vale piu' di un ausilio perfetto lasciato in un angolo."),

 (9,"chiaro",0,"Dispositivi medici e sicurezza. Molti ausili sono dispositivi medici: hanno la marcatura CE, le istruzioni d'uso e una manutenzione prevista."),
 (9,"chiaro",0,"Si usano secondo le istruzioni del fabbricante: portata massima, modalita', limiti. L'uso improprio sposta la responsabilita' su chi lo ha fatto: superare la portata di un sollevatore, usare una carrozzina come barella."),
 (9,"chiaro",0,"Gli incidenti e i mancati incidenti con dispositivi medici vanno segnalati, perche' esiste un sistema di vigilanza che raccoglie queste segnalazioni."),
 (9,"chiaro",1.2,"E il libretto d'uso va conosciuto e conservato, non buttato con l'imballo."),

 (10,"chiaro",0,"Pulizia e sanificazione. Gli ausili sono superfici ad alto contatto e veicolano microrganismi, come hai visto nel Modulo cinque."),
 (10,"chiaro",0,"Si puliscono dopo ogni uso se condivisi, periodicamente se personali. Si usano prodotti compatibili con il materiale: niente candeggina su metalli e tessuti tecnici, che si rovinano."),
 (10,"chiaro",0,"Attenzione alle parti piu' toccate: impugnature, ruote, imbracature, seduta, comandi."),
 (10,"chiaro",1.2,"E una distinzione: l'ausilio personale appartiene alla persona e si pulisce per lei; l'ausilio di reparto e' condiviso, e va sanificato tra un uso e l'altro."),

 (11,"chiaro",0,"La documentazione. Gli ausili in uso vanno registrati nel piano assistenziale: quale ausilio, come si usa con quella specifica persona, chi e' stato addestrato."),
 (11,"chiaro",0,"Le variazioni e le segnalazioni vanno scritte, con precisione: la carrozzina ha il freno sinistro allentato, segnalato il tal giorno. Dove previsto, esiste anche un registro delle manutenzioni."),
 (11,"profondo",0,"Vale la regola del Modulo tredici: cio' che non e' documentato non e' stato fatto."),
 (11,"chiaro",1.2,"E in caso di incidente con un ausilio, la documentazione e' cio' che dimostra che la verifica e' stata fatta."),

 (12,"tenue",0,"I distrattori tipici della lezione. L'ausilio compensa, il presidio e' un dispositivo, la protesi sostituisce, l'ortesi sostiene: i quiz li scambiano."),
 (12,"tenue",0,"La prescrizione e' dello specialista, la fornitura dell'ULSS. L'OSS non prescrive, non ripara e non modifica."),
 (12,"tenue",1.2,"La regola della scelta e' il minimo ausilio che garantisce sicurezza e autonomia, non il piu' potente. E un ausilio rifiutato non si impone: si lavora sull'accettazione."),

 (13,"chiaro",0,"[thoughtful] Riepiloghiamo. Ausilio, presidio, protesi e ortesi si distinguono per la funzione. L'ICF considera gli ausili fattori ambientali che facilitano la partecipazione."),
 (13,"chiaro",0,"Lo specialista prescrive, l'ULSS fornisce, il riferimento e' il Nomenclatore tariffario nei LEA. L'OSS usa, verifica, addestra, osserva, pulisce e segnala, e non ripara ne' modifica."),
 (13,"chiaro",0,"La regola di scelta e' il minimo ausilio che garantisce sicurezza e autonomia, e l'accettazione conta quanto la tecnica. [warm] Nella prossima lezione: gli ausili per la mobilita' e il trasferimento."),
]

import sys as _sys, pathlib as _pl
_sys.path.insert(0, str(_pl.Path(__file__).resolve().parent.parent))
from profilo import CPS, MAX_CAR_BLOCCO, MAX_SCENE, COPERTINA, CHIUSURA, STACCO

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1:"Il modulo 18",2:"Le definizioni",3:"L'ICF",
 4:"Chi prescrive, chi fornisce",5:"Il percorso dell'ausilio",6:"Il ruolo dell'OSS",
 7:"L'autonomia residua",8:"L'accettazione",9:"Dispositivi medici e sicurezza",
 10:"Pulizia e sanificazione",11:"La documentazione",12:"I distrattori",
 13:"Riepilogo"}

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
