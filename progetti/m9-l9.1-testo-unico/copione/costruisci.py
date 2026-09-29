# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
#
# Lezione 9.1 del corso «Progressione verticale · Comparto Sanita'».
# Nucleo (M9): dalla frammentazione al Testo Unico. Art. 2087 c.c. (1942); Cost. artt. 32, 35, 41 c. 2;
# D.P.R. 547/1955 (prevenzione infortuni), D.P.R. 164/1956 (costruzioni), D.P.R. 303/1956 (igiene del lavoro);
# L. 300/1970 art. 9; L. 833/1978 (prevenzione alle USL); direttiva quadro 89/391/CEE; D.Lgs. 626/1994
# (valutazione dei rischi, servizio di prevenzione, RLS, medico competente, formazione); L. 123/2007 (delega);
# D.Lgs. 81/2008 (9 aprile 2008, in vigore dal 15 maggio 2008; 306 articoli, allegati); D.Lgs. 106/2009
# (correttivo). «Testo Unico» e' un nome d'uso. Novita' successive (L. 215/2021, D.L. 19/2024): da verificare.
# Fonti: testo del D.Lgs. 81/2008 edizione giugno 2016 su Drive; dispensa su Drive (con correzioni).
BLOCCHI = [
 (1,"chiaro",0.8,"[serious] Un'infermiera si punge con un ago usato durante la terapia. Trent'anni fa, in molti reparti, era considerato un incidente del mestiere. Oggi e' un evento da prevenire, registrare e analizzare."),
 (1,"chiaro",0,"In mezzo c'e' un cambio di mentalita': dalla sicurezza come elenco di divieti alla sicurezza come organizzazione. E quel cambio ha un nome: il decreto legislativo 81 del 2008."),
 (1,"profondo",1.2,"Dalla regola da rispettare al rischio da governare."),

 (2,"chiaro",0.6,"Quattro passaggi. Le norme degli anni Cinquanta. La svolta europea degli anni Novanta. Il Testo Unico del 2008. E quello che e' cambiato dopo."),

 (3,"chiaro",0.5,"Il primo fondamento e' nel codice civile del 1942. L'articolo 2087 obbliga l'imprenditore a tutelare l'integrita' fisica e la personalita' morale di chi lavora."),
 (3,"chiaro",0,"Poi arriva la Costituzione. La salute e' un diritto fondamentale, il lavoro va tutelato in tutte le sue forme, e l'iniziativa economica non puo' svolgersi in modo da recare danno alla sicurezza."),
 (3,"chiaro",0,"Negli anni Cinquanta arrivano i primi decreti tecnici: uno del 1955 sulla prevenzione degli infortuni, uno del 1956 sull'igiene del lavoro, un altro sulle costruzioni."),
 (3,"chiaro",0,"Erano norme minuziose: altezza dei parapetti, protezione delle macchine, aerazione dei locali. Utili, ma pensate soprattutto per la fabbrica e il cantiere."),
 (3,"chiaro",0,"E la responsabilita' ricadeva quasi tutta sul datore di lavoro. Il lavoratore era visto come qualcuno da proteggere, non come un protagonista della prevenzione."),
 (3,"chiaro",0,"Nel 1970 lo Statuto dei lavoratori da' ai lavoratori il diritto di controllare l'applicazione delle norme di prevenzione. Nel 1978 la riforma sanitaria affida la vigilanza alle unita' sanitarie locali."),
 (3,"chiaro",0.6,"Un esempio: un ospedale degli anni Settanta doveva rispettare decine di prescrizioni tecniche, ma nessuna norma gli chiedeva di valutare, reparto per reparto, i rischi di chi ci lavorava."),
 (3,"tenue",0.8,"Occhio a un distrattore: la sicurezza sul lavoro non nasce nel 2008. Nel 2008 le regole vengono riunite e riordinate, ma l'obbligo di tutela esisteva gia' dal 1942."),
 (3,"profondo",1.2,"Tante regole, scritte in tempi diversi, ma nessun sistema."),

 (4,"chiaro",0.5,"La svolta arriva dall'Europa. Nel 1989 una direttiva quadro cambia l'impostazione: il datore di lavoro deve valutare i rischi e organizzare la prevenzione, coinvolgendo i lavoratori."),
 (4,"chiaro",0,"La direttiva introduce anche un principio chiave: il lavoratore non e' solo protetto, ma partecipa. Deve essere informato, formato e consultato sulle scelte di prevenzione."),
 (4,"chiaro",0,"L'Italia la recepisce con il decreto legislativo 626 del 1994. E' il decreto che fa entrare la sicurezza sul lavoro nel linguaggio comune, anche negli ospedali."),
 (4,"chiaro",0,"Due anni dopo, nel 1996, un decreto correttivo precisa molti punti del 626, anche per l'applicazione nelle pubbliche amministrazioni."),
 (4,"chiaro",0,"Con il 626 arrivano le figure che conosciamo ancora oggi: il servizio di prevenzione e protezione con il suo responsabile, il rappresentante dei lavoratori per la sicurezza, il medico competente."),
 (4,"chiaro",0,"E arrivano gli strumenti: il documento di valutazione dei rischi, la formazione dei lavoratori, la riunione periodica. La sicurezza diventa un processo, non solo un insieme di divieti."),
 (4,"chiaro",0.6,"Un esempio: dopo il 626 un'azienda sanitaria deve chiedersi, per ogni reparto, quali rischi corre chi ci lavora. Il laboratorio ha rischi diversi dalla radiologia, e la radiologia dalla cucina."),
 (4,"chiaro",0,"In quegli anni, in molte aziende sanitarie, nascono i primi servizi di prevenzione interni, spesso con poche persone e molto lavoro arretrato da recuperare."),
 (4,"chiaro",0,"Ma il quadro resta frammentato. Accanto al 626 restano in vigore i decreti degli anni Cinquanta e tante leggi speciali, spesso scritte in epoche diverse e non sempre coerenti tra loro."),
 (4,"tenue",0.8,"Attenzione: il 626 del 1994 non e' una legge nata in Italia da zero. Recepisce la direttiva quadro europea del 1989 e altre direttive particolari."),
 (4,"profondo",1.2,"Dall'Europa, l'idea di valutare e organizzare."),

 (5,"chiaro",0.5,"Nel 2007 il Parlamento delega il governo a riordinare tutta la materia in un unico testo. Nasce cosi' il decreto legislativo 81, del 9 aprile 2008."),
 (5,"chiaro",0,"Il riordino arriva anche sotto la spinta di gravi incidenti sul lavoro, che in quegli anni riportano la sicurezza al centro del dibattito pubblico."),
 (5,"chiaro",0,"Entra in vigore il 15 maggio 2008 e abroga il 626 e i vecchi decreti degli anni Cinquanta, riprendendone i contenuti ancora utili in un quadro unico."),
 (5,"chiaro",0,"E' un testo ampio: oltre trecento articoli, divisi in tredici titoli, e numerosi allegati tecnici. Il primo titolo contiene i principi comuni a tutti i settori."),
 (5,"chiaro",0,"Gli altri titoli trattano i rischi specifici: luoghi di lavoro, attrezzature, dispositivi di protezione, cantieri, segnaletica, movimentazione dei carichi, videoterminali."),
 (5,"chiaro",0,"E poi gli agenti fisici, come rumore, vibrazioni e radiazioni ottiche, le sostanze pericolose, gli agenti cancerogeni, gli agenti biologici, le atmosfere esplosive."),
 (5,"chiaro",0,"Lo chiamiamo tutti Testo Unico, ma e' un nome d'uso: formalmente e' un decreto legislativo, adottato in attuazione della legge delega del 2007."),
 (5,"chiaro",0,"Per le pubbliche amministrazioni il decreto chiarisce chi e' il datore di lavoro: il dirigente con poteri di gestione individuato dall'organo di vertice. In un'azienda sanitaria, di regola, il direttore generale."),
 (5,"chiaro",0,"Nel 2009 arriva un ampio correttivo, il decreto legislativo 106, che modifica molti articoli, precisa le deleghe e le sanzioni, ma non cambia l'impianto generale."),
 (5,"tenue",0.8,"Un distrattore frequente: il decreto 81 non si applica solo alle imprese private. Vale per tutti i settori, pubblici e privati, e quindi anche per le aziende sanitarie."),
 (5,"profondo",1.2,"Un solo testo, principi comuni, rischi specifici."),

 (6,"chiaro",0.5,"Il decreto 81 non e' rimasto fermo. Negli anni e' stato modificato molte volte, per adeguarlo a nuove direttive e ai problemi emersi nei luoghi di lavoro."),
 (6,"chiaro",0,"Nel 2021 una legge ha rafforzato il ruolo del preposto, che deve intervenire e interrompere l'attivita' in caso di comportamenti pericolosi, e ha rivisto le regole sulla formazione."),
 (6,"chiaro",0,"Nel 2024 e' arrivata la patente a crediti per le imprese che lavorano nei cantieri: chi accumula violazioni perde punti, e senza punti non puo' piu' lavorare."),
 (6,"chiaro",0,"Sono cresciute anche le sanzioni e i poteri di vigilanza, e sono arrivate regole nuove per i cantieri. La direzione e' sempre la stessa: meno adempimenti di carta, piu' prevenzione reale."),
 (6,"chiaro",0,"E cambiano anche i numeri: gli importi delle sanzioni vengono rivalutati nel tempo. Per l'esame conviene ricordare i principi e le figure, piu' che le singole cifre."),
 (6,"chiaro",0.6,"Un esempio in reparto: il coordinatore infermieristico, che organizza i turni e controlla il lavoro, e' di regola un preposto. E dal 2021 ha doveri di vigilanza piu' precisi."),
 (6,"tenue",0.8,"Attenzione: quando studi, controlla sempre il testo aggiornato. Molte dispense citano ancora il 626 come legge in vigore, o riportano versioni superate del decreto 81."),
 (6,"profondo",1.2,"Una legge viva, che cambia con il lavoro."),

 (7,"chiaro",0.8,"Le tre cose che ti chiederanno. La prima: le radici sono l'articolo 2087 del codice civile, la Costituzione e i decreti tecnici degli anni Cinquanta."),
 (7,"chiaro",0.8,"La seconda: il decreto 626 del 1994 recepisce la direttiva quadro europea e introduce valutazione dei rischi, servizio di prevenzione, rappresentante dei lavoratori e medico competente."),
 (7,"chiaro",0.8,"La terza: il decreto 81 del 2008 riunisce la materia in un unico testo, vale per tutti i settori pubblici e privati, ed e' stato corretto nel 2009 e aggiornato piu' volte."),
 (7,"tenue",0.8,"L'ultimo distrattore: Testo Unico non e' il nome ufficiale. Il nome corretto e' decreto legislativo 9 aprile 2008, numero 81."),

 (8,"profondo",0,"[warm] In sintesi: dalle regole sparse al sistema, dalla fabbrica a tutti i luoghi di lavoro. Nella prossima lezione: i principi su cui si regge la prevenzione."),
]

import sys as _sys, pathlib as _pl
_sys.path.insert(0, str(_pl.Path(__file__).resolve().parent.parent))
from profilo import CPS, MAX_CAR_BLOCCO, MAX_SCENE, COPERTINA, CHIUSURA

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Aggancio', 2: 'Rotta', 3: "L'eredita' degli anni Cinquanta", 4: 'La svolta europea', 5: 'Il Testo Unico', 6: 'Dopo il 2008', 7: 'Le tre cose che ti chiederanno', 8: 'Chiusura'}
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

pose=sum(b["posa"] for b in blocchi)
parlato=tot/CPS+pose; durata=parlato+COPERTINA+CHIUSURA
print(f"blocchi   {len(blocchi)}        scene {nscene}/{MAX_SCENE}")
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

# Lo stacco va su un cambio di capitolo. Non il primo DOPO la meta': quello
# vicino alla meta', da una parte o dall'altra. Nella 1.1 del corso PV il
# primo dopo la meta' lasciava la traccia A a 4968 caratteri, a un soffio dal
# tetto di 5000 del servizio di sintesi, e la B a 2809.
acc=0; stacco=None; a=0; migliore=None
for i,b in enumerate(blocchi):
    acc+=len(b["text"])+1
    if i+1<len(blocchi) and b["capitolo"]!=blocchi[i+1]["capitolo"]:
        if migliore is None or abs(acc-tot/2) < abs(migliore[1]-tot/2):
            migliore=(b["id"],acc)
stacco,a=migliore
if a>=5000 or tot-a>=5000: errori.append(f"stacco dopo {stacco}: una traccia supera i 5000 caratteri")
print(f"\nstacco tracce dopo {stacco}:  chunkA {a} car  ·  chunkB {tot-a} car   (limite 5000)")
print("\n" + ("OK, nessun errore" if not errori else "ERRORI:\n  " + "\n  ".join(errori)))
json.dump(blocchi, open("copione/blocchi.json","w",encoding="utf-8"), ensure_ascii=False, indent=1)
