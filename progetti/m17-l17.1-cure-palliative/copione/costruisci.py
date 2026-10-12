# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
#
# Riscrittura del copione in origine/copione-di-partenza.md. Le 13 scene di
# partenza stanno a ~506 caratteri l'una, contro un tetto di 225 per blocco.
# I 13 argomenti restano nell'ordine in cui stanno; cambia il taglio.
#
# Il parlato di partenza misurava 6.584 caratteri. Il modulo 17 chiede un ritmo
# piu' lento, quindi a parita' di durata i caratteri sono meno che nel modulo
# 16: le aggiunte (AGG) sono poche e sono il "come" — un rimando, una
# conseguenza. NESSUN fatto nuovo, ne' clinico ne' normativo.
#
# Registro dichiarato dal documento e valido per tutto il modulo: sobrio,
# concreto, mai pietistico. Il fine vita si racconta con il linguaggio della
# competenza, non della commozione. Vale anche per i tag di intenzione: niente
# toni commossi, solo [warm] in apertura e [thoughtful] sul riepilogo.
#
# Una correzione al copione di partenza: la scena 7 diceva «l'hospice merita
# una scena a se'». E' un riferimento visivo, che le regole del documento
# stesso escludono dal parlato: diventa «un discorso a parte».
BLOCCHI = [
 (1,"chiaro",0,"[warm] Benvenuta e benvenuto nel Modulo diciassette, il secondo dei moduli bonus. Affronta un'area in cui l'OSS e' spesso l'operatore piu' presente, e che molti temono di affrontare."),
 (1,"profondo",0,"Parto da una correzione necessaria: le cure palliative non sono la rinuncia alla cura. Sono una forma di cura. Cambia l'obiettivo, non l'impegno."),
 # AGG: «non solo alla fine» anticipa il capitolo 4, che e' l'equivoco piu' chiesto.
 (1,"chiaro",1.2,"E l'obiettivo diventa la qualita' della vita della persona e della sua famiglia, in ogni fase della malattia. Non solo alla fine."),

 (2,"chiaro",0,"La definizione dell'Organizzazione Mondiale della Sanita': le cure palliative sono un approccio che migliora la qualita' della vita delle persone e delle famiglie che affrontano una malattia inguaribile."),
 (2,"chiaro",0,"Lo fanno attraverso la prevenzione e il sollievo della sofferenza, con un'identificazione precoce e un trattamento accurato del dolore e degli altri problemi."),
 (2,"chiaro",1.2,"Problemi fisici, psicologici, sociali e spirituali. Quattro dimensioni, non una: e' la parola chiave di tutto il modulo."),

 (3,"chiaro",0,"I principi che le definiscono. Affermano la vita, e considerano la morte un processo naturale. Integrano gli aspetti psicologici e spirituali, e lavorano in equipe."),
 # AGG: il rimando alla 17.5, dove questo principio torna sulle scelte di fine vita.
 (3,"profondo",0,"Non accelerano ne' ritardano la morte. E' il punto che le distingue da ogni altra cosa, e lo ritroverai nella quinta lezione, sulle scelte di fine vita."),
 (3,"chiaro",1.2,"Sostengono la famiglia, durante la malattia e anche nel lutto. E possono iniziare precocemente, insieme alle altre terapie, non solo quando queste sono esaurite."),

 # AGG: la conseguenza pratica dell'equivoco.
 (4,"tenue",0,"Un equivoco diffuso, che i quiz chiedono: le cure palliative non sono solo le cure degli ultimi giorni. Chi le immagina cosi' le chiama troppo tardi."),
 (4,"chiaro",0,"Esistono le cure palliative precoci, o simultanee, che affiancano le terapie attive fin dalla diagnosi di una malattia inguaribile. Migliorano la qualita' della vita, e talvolta anche la durata."),
 (4,"profondo",0,"La fase terminale e' solo l'ultima parte del percorso. Il concetto da tenere: l'inguaribilita' non e' l'imminenza della morte."),
 (4,"chiaro",1.2,"Si puo' vivere anni con una malattia inguaribile, e le cure palliative servono anche a quello: a vivere quegli anni nel modo migliore possibile."),

 (5,"chiaro",0,"La norma di riferimento e' la legge trentotto del duemiladieci. Tutela il diritto del cittadino ad accedere alle cure palliative e alla terapia del dolore."),
 (5,"chiaro",0,"Istituisce due reti distinte: la rete delle cure palliative e la rete della terapia del dolore. E prevede una rete pediatrica dedicata."),
 (5,"chiaro",0,"Introduce l'obbligo di rilevare e registrare il dolore in cartella clinica, con il suo andamento e i farmaci utilizzati."),
 # AGG: il paragone coi parametri vitali dice che cosa vuol dire «parametro da misurare».
 (5,"profondo",1.2,"E' la legge che ha reso il dolore un parametro da misurare, come la pressione o la temperatura. L'hai incontrata nel Modulo otto."),

 (6,"chiaro",0,"La rete delle cure palliative ha piu' livelli. L'ospedale, con la consulenza palliativa e i reparti dedicati. L'hospice, una struttura residenziale dedicata."),
 (6,"chiaro",0,"Il domicilio, con le cure palliative domiciliari, di base o specialistiche, che consentono di restare a casa. Le strutture residenziali, dove intervengono le equipe palliative. E l'ambulatorio e il day hospice."),
 (6,"profondo",1.2,"La persona si muove fra i livelli in base ai bisogni, come in tutte le reti che hai studiato. Cambiano i bisogni, e cambia il livello."),

 (7,"chiaro",0,"L'hospice merita un discorso a parte, perche' e' il luogo in cui molti OSS lavorano. Non e' un ospedale e non e' una RSA."),
 (7,"chiaro",0,"Ha stanze singole, spazi per i familiari, nessun orario di visita rigido. Bassa tecnologia e alta intensita' assistenziale, pensata per la persona e per la famiglia."),
 (7,"chiaro",0,"L'equipe e' multiprofessionale: medico, infermiere, OSS, psicologo, assistente sociale, e spesso volontari formati."),
 (7,"profondo",1.2,"L'obiettivo non e' la guarigione e non e' la sopravvivenza: e' il comfort, e la qualita' del tempo che resta. Ed e' gratuito, a carico del Servizio Sanitario Nazionale."),

 (8,"chiaro",0,"Il domicilio. La maggior parte delle persone, se interrogata, desidera morire a casa. Le cure palliative domiciliari lo rendono possibile: un'equipe che va al domicilio, con reperibilita', farmaci e presidi."),
 (8,"chiaro",0,"Richiedono pero' un caregiver presente e un ambiente adeguato. E l'OSS domiciliare e' spesso la presenza piu' continua, quindi quella che vede per prima quando qualcosa cambia."),
 (8,"profondo",1.2,"Ma il domicilio e' possibile solo se il carico e' sostenibile per la famiglia. Quando non lo e' piu', l'hospice non e' un fallimento: e' il livello giusto."),

 (9,"chiaro",0,"L'equipe. Il medico palliativista gestisce la terapia dei sintomi, la comunicazione e le decisioni. L'infermiere gestisce la parte clinica, ed educa il caregiver."),
 (9,"chiaro",0,"L'OSS garantisce l'assistenza di base, il comfort, l'osservazione e la presenza. Poi lo psicologo, l'assistente sociale, l'assistente spirituale quando richiesto, i volontari formati, il fisioterapista."),
 (9,"profondo",1.2,"E un elemento che distingue le cure palliative da altri contesti: il caregiver e' parte dell'equipe. Non e' un visitatore, e' un collaboratore, e va sostenuto come tale."),

 (10,"chiaro",0,"Il ruolo dell'OSS nelle cure palliative. L'assistenza di base e' orientata al comfort, non alla routine: si fa cio' che da' sollievo, nei tempi della persona."),
 (10,"chiaro",0,"Igiene delicata, cura del cavo orale, che qui diventa centrale, posizionamento, cura dell'ambiente. E osservazione di dolore, respiro, alimentazione e di ogni variazione."),
 (10,"chiaro",0,"La presenza, perche' il tempo accanto alla persona e' assistenza a pieno titolo, anche quando non c'e' niente da fare con le mani. E il sostegno al caregiver."),
 # AGG: perche' la segnalazione e' parte della cura, non un adempimento.
 (10,"chiaro",1.2,"E la segnalazione tempestiva di ogni cambiamento, perche' nella fase avanzata i cambiamenti sono rapidi. Senza quell'osservazione, l'equipe decide con un'informazione in meno."),

 (11,"chiaro",0,"Che cosa cambia rispetto all'assistenza ordinaria, perche' il cambiamento e' reale e va capito. L'obiettivo non e' fare tutto, ma fare cio' che serve."),
 (11,"chiaro",0,"Un'igiene completa puo' essere sospesa, se affatica la persona. I cambi posturali seguono il comfort, non solo la prevenzione. L'alimentazione segue il desiderio, non il fabbisogno calorico."),
 # AGG: la seconda frase dice che cosa farne, del no.
 (11,"profondo",0,"E il no della persona e' un'informazione, non un ostacolo da superare. Ascoltarlo fa parte dell'assistenza, non e' un'eccezione."),
 (11,"chiaro",1.2,"Chi arriva da reparti per acuti deve spesso disimparare qualcosa. Qui la priorita' e' come sta la persona, non che cosa e' stato fatto."),

 (12,"tenue",0,"Anche qui il linguaggio costruisce lo sguardo. Non si dice non c'e' piu' niente da fare: c'e' molto da fare, cambia che cosa. Non paziente terminale, ma persona in fase avanzata di malattia."),
 (12,"tenue",0,"Non accanimento, che e' un termine giudicante, ma trattamenti sproporzionati, che e' il termine della legge. Non staccare la spina, ma sospendere trattamenti non piu' indicati."),
 (12,"profondo",1.2,"Non sono eufemismi: sono termini piu' precisi. E la precisione, in quest'area, e' una forma di rispetto."),

 (13,"chiaro",0,"[thoughtful] Riepiloghiamo. Le cure palliative sono una forma di cura orientata alla qualita' della vita, nelle sue quattro dimensioni: fisica, psicologica, sociale, spirituale."),
 (13,"chiaro",0,"Non accelerano ne' ritardano la morte, e possono iniziare precocemente, insieme alle altre terapie, fin dalla diagnosi."),
 (13,"chiaro",0,"La legge trentotto del duemiladieci tutela il diritto alle cure palliative e alla terapia del dolore, istituisce due reti e rende obbligatoria la registrazione del dolore in cartella."),
 (13,"chiaro",0,"I livelli sono ospedale, hospice, domicilio e residenziale, tutti gratuiti. E l'OSS porta comfort, osservazione, presenza, e sostegno al caregiver."),
 (13,"chiaro",0,"[warm] Nella prossima lezione vediamo i bisogni della persona nella fase avanzata di malattia, a partire dal dolore."),
]

import sys as _sys, pathlib as _pl
_sys.path.insert(0, str(_pl.Path(__file__).resolve().parent.parent))
from profilo import CPS, MAX_CAR_BLOCCO, MAX_SCENE, COPERTINA, CHIUSURA, STACCO

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1:"Una forma di cura",2:"La definizione",3:"I principi",
 4:"Non solo gli ultimi giorni",5:"La legge 38 del 2010",6:"I livelli della rete",
 7:"L'hospice",8:"Il domicilio",9:"L'equipe",10:"Il ruolo dell'OSS",
 11:"Che cosa cambia",12:"Le parole giuste",13:"Riepilogo"}

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
