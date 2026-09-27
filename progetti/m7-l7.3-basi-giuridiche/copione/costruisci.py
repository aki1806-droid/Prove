# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
#
# Lezione 7.3 del corso «Progressione verticale · Comparto Sanita'».
# Nucleo (M7): le basi giuridiche. GDPR art. 6 par. 1 lett. a-f (consenso, contratto, obbligo legale, interessi
# vitali, compito di interesse pubblico, legittimo interesse; lett. f non per le autorita' pubbliche nei loro
# compiti), par. 3 (base nel diritto dell'Unione o dello Stato); art. 4 n. 11 (consenso); art. 7 (dimostrare,
# distinguibile, revoca); art. 8 (minori: 16 anni, Stati fino a 13; Italia 14, art. 2-quinquies Codice);
# art. 2-ter Codice (base per interesse pubblico; modifiche D.L. 139/2021 da verificare).
# Fonti: GDPR, testo del Garante (ed. 2017); dispense su Drive (con correzioni).
BLOCCHI = [
 (1,"chiaro",0.8,"[serious] All'accettazione un paziente rifiuta di firmare il modulo sulla privacy. Dice: non do il consenso. L'ospedale puo' comunque curarlo, e registrare i suoi dati?"),
 (1,"chiaro",0,"Si'. E la ragione e' il cuore di questa lezione: il consenso e' solo una delle basi che rendono lecito un trattamento, e non e' nemmeno la piu' importante per una pubblica amministrazione."),
 (1,"profondo",1.2,"Ogni trattamento ha bisogno di una base."),

 (2,"chiaro",0.6,"Quattro passaggi. Le sei basi dell'articolo 6. Il consenso e le sue caratteristiche. Obbligo di legge e interesse pubblico, le basi della sanita' pubblica. E le altre tre: contratto, interessi vitali, legittimo interesse."),

 (3,"chiaro",0.5,"L'articolo 6 del regolamento dice che il trattamento e' lecito solo se ricorre almeno una di sei condizioni. Non ce ne sono altre."),
 (3,"chiaro",0,"Prima: il consenso dell'interessato. Seconda: l'esecuzione di un contratto di cui l'interessato e' parte. Terza: un obbligo legale a cui e' soggetto il titolare."),
 (3,"chiaro",0,"Quarta: la salvaguardia degli interessi vitali dell'interessato o di un'altra persona. Quinta: l'esecuzione di un compito di interesse pubblico o connesso all'esercizio di pubblici poteri."),
 (3,"chiaro",0,"Sesta: il legittimo interesse del titolare o di terzi, purche' non prevalgano i diritti e le liberta' dell'interessato."),
 (3,"chiaro",0,"Le sei basi sono sullo stesso piano: non c'e' una gerarchia. Ma quasi tutte contengono una parola decisiva: necessario. Il trattamento deve essere necessario per quello scopo."),
 (3,"chiaro",0,"E la base va individuata prima di iniziare il trattamento, e indicata nell'informativa. Non si cambia a meta' strada, cercando quella che fa piu' comodo."),
 (3,"chiaro",0.6,"Un esempio: per la stessa persona le basi possono cambiare. I dati di un dipendente per lo stipendio poggiano su un obbligo di legge; la sua foto su un opuscolo, sul consenso."),
 (3,"tenue",0.8,"Occhio a un distrattore: il consenso non e' la regola generale da cui partire. E' una base tra sei, e spesso non e' quella giusta."),
 (3,"profondo",1.2,"Sei basi, tutte alla pari, tutte legate alla necessita'."),

 (4,"chiaro",0.5,"Quando si usa, il consenso deve avere quattro caratteristiche. Il regolamento lo definisce come una manifestazione di volonta' libera, specifica, informata e inequivocabile."),
 (4,"chiaro",0,"Libera: la persona puo' dire di no senza subire conseguenze. Specifica: riguarda una finalita' precisa, non tutto in blocco. Informata: la persona sa a cosa acconsente."),
 (4,"chiaro",0,"Inequivocabile: serve una dichiarazione o un'azione positiva. Il silenzio, l'inattivita' o una casella gia' spuntata non sono un consenso."),
 (4,"chiaro",0,"L'articolo 7 aggiunge le condizioni. Il titolare deve poter dimostrare che il consenso c'e'. Se sta in un modulo che parla d'altro, la richiesta deve essere chiaramente distinguibile."),
 (4,"chiaro",0,"E il consenso si puo' revocare in qualsiasi momento, con la stessa facilita' con cui e' stato dato. La revoca non rende illecito quello che e' stato fatto prima."),
 (4,"chiaro",0,"C'e' poi un limite di fondo. Il consenso e' libero solo se non c'e' un forte squilibrio tra le parti. Tra cittadino e autorita' pubblica, o tra lavoratore e datore di lavoro, questo squilibrio spesso c'e'."),
 (4,"chiaro",0,"Per questo, nella pubblica amministrazione e nel rapporto di lavoro, il consenso raramente e' la base adatta. Si usa per attivita' davvero facoltative."),
 (4,"chiaro",0.6,"Un esempio: la partecipazione volontaria a un'indagine sulla soddisfazione, o la foto di un dipendente sulla pagina web di un progetto. Qui la persona puo' davvero scegliere."),
 (4,"chiaro",0,"Per i minori, nei servizi online offerti direttamente, il regolamento fissa i 16 anni e permette agli Stati di scendere fino a 13. L'Italia ha scelto 14 anni."),
 (4,"tenue",0.8,"Un distrattore frequente: i 14 anni non valgono per le cure. Riguardano il consenso ai servizi della societa' dell'informazione, come app e piattaforme online."),
 (4,"profondo",1.2,"Libero, specifico, informato, inequivocabile, revocabile."),

 (5,"chiaro",0.5,"Per un'azienda sanitaria pubblica le basi piu' frequenti sono due: l'obbligo di legge e il compito di interesse pubblico."),
 (5,"chiaro",0,"Il regolamento chiede che queste due basi siano stabilite dal diritto dell'Unione o dello Stato membro. Non basta che il titolare ritenga utile un trattamento: serve una norma."),
 (5,"chiaro",0,"In Italia la regola e' nell'articolo 2-ter del Codice: la base per i trattamenti di interesse pubblico e' una norma di legge o, nei casi previsti, di regolamento. Il testo e' stato ritoccato nel 2021."),
 (5,"chiaro",0.6,"Esempi di obbligo di legge: i dati del personale trattati per stipendi, contributi e dichiarazioni fiscali. L'azienda non chiede il consenso: la legge le impone di farlo."),
 (5,"chiaro",0.6,"Esempi di compito di interesse pubblico: la gestione delle liste d'attesa, i programmi di screening, la vigilanza igienico sanitaria. Sono le funzioni per cui l'azienda esiste."),
 (5,"chiaro",0,"Torniamo al paziente che non firma. L'ospedale non tratta i suoi dati perche' ha acconsentito, ma perche' curarlo e' il suo compito, previsto dalla legge."),
 (5,"chiaro",0,"Per i dati sulla salute la regola e' ancora piu' precisa, perche' sono dati particolari: la vedremo nella prossima lezione, con l'articolo 9 del regolamento."),
 (5,"chiaro",0,"Il modulo che si firma all'accettazione, spesso, non e' un consenso: e' la presa visione dell'informativa. Due cose diverse, che molti confondono."),
 (5,"tenue",0.8,"Attenzione: senza il consenso l'azienda non resta paralizzata. Se c'e' una norma che le affida il compito, il trattamento e' lecito."),
 (5,"profondo",1.2,"Nella sanita' pubblica la base e' quasi sempre una norma."),

 (6,"chiaro",0.5,"Restano tre basi. Il contratto: il trattamento e' necessario per eseguire un contratto di cui l'interessato e' parte, o misure precontrattuali chieste da lui."),
 (6,"chiaro",0.6,"Un esempio: i dati di un professionista con cui l'azienda firma un contratto di collaborazione, o di un fornitore persona fisica per i pagamenti."),
 (6,"chiaro",0,"Gli interessi vitali: il trattamento serve a proteggere la vita dell'interessato o di un'altra persona. E' una base di emergenza, da usare quando nessun'altra e' disponibile."),
 (6,"chiaro",0,"Il legittimo interesse: il titolare persegue un proprio interesse, ad esempio la sicurezza dei locali, dopo aver bilanciato i diritti delle persone coinvolte."),
 (6,"chiaro",0,"Ma il regolamento e' chiaro: il legittimo interesse non si applica ai trattamenti delle autorita' pubbliche nell'esecuzione dei loro compiti. Per l'azienda sanitaria pubblica, nei suoi compiti, questa porta e' chiusa."),
 (6,"chiaro",0,"Nel privato il legittimo interesse e' piu' frequente. Anche una struttura sanitaria privata, pero', deve bilanciarlo con cura quando tocca dati di pazienti e dipendenti."),
 (6,"chiaro",0,"Ultima regola: l'uso dei dati per una finalita' diversa da quella iniziale richiede una nuova base, o una verifica di compatibilita' con lo scopo originario."),
 (6,"tenue",0.8,"Attenzione: una pubblica amministrazione non puo' giustificare i propri compiti con il legittimo interesse. Serve una norma."),
 (6,"profondo",1.2,"Contratto, vita, interesse: ognuno con i suoi confini."),

 (7,"chiaro",0.8,"Le tre cose che ti chiederanno. La prima: l'articolo 6 prevede sei basi giuridiche, alla pari. Consenso, contratto, obbligo legale, interessi vitali, interesse pubblico, legittimo interesse."),
 (7,"chiaro",0.8,"La seconda: il consenso deve essere libero, specifico, informato e inequivocabile, dimostrabile e revocabile. Nella pubblica amministrazione raramente e' la base adatta."),
 (7,"chiaro",0.8,"La terza: per un'azienda sanitaria pubblica le basi tipiche sono l'obbligo di legge e il compito di interesse pubblico, fondati su una norma. Il legittimo interesse non vale per i suoi compiti."),
 (7,"tenue",0.8,"L'ultimo distrattore: firmare l'informativa non significa dare il consenso. E' la prova di essere stati informati."),

 (8,"profondo",0,"[warm] In sintesi: sei basi, un consenso con regole precise, una sanita' pubblica che agisce per legge. Nella prossima lezione: le categorie particolari e il dato sanitario."),
]

import sys as _sys, pathlib as _pl
_sys.path.insert(0, str(_pl.Path(__file__).resolve().parent.parent))
from profilo import CPS, MAX_CAR_BLOCCO, MAX_SCENE, COPERTINA, CHIUSURA

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Aggancio', 2: 'Rotta', 3: 'Sei basi, nessuna gerarchia', 4: 'Il consenso', 5: 'Obbligo di legge e interesse pubblico', 6: 'Contratto, interessi vitali, legittimo interesse', 7: 'Le tre cose che ti chiederanno', 8: 'Chiusura'}
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
