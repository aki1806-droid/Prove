# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] In questo caso non c'e' un solo paziente: c'e' un turno di mattina in medicina, con quattro trappole nella terapia, chieste spesso all'esame. In ognuna, l'infermiere e' l'ultima barriera fra un errore e un danno."),
 (1,"chiaro",0,"Useremo le lezioni cinque punto tre, quattro, sei e sette: i calcoli, la sicurezza, gli oppioidi, i farmaci ad alto rischio. E poi la trasfusione della sei punto sei, e la responsabilita' della uno punto cinque."),

 (2,"chiaro",0,"[curious] Trappola uno, ore otto. Un paziente ha il potassio a tre virgola zero. In cartella trovi scritto: cloruro di potassio, venti milliequivalenti, endovena, in bolo. Pausa: che cosa fai?"),

 (3,"chiaro",0,"Il potassio concentrato in bolo puo' causare un arresto cardiaco. E' una prescrizione palesemente errata, e non si esegue. Si contatta subito il medico, per la correzione."),
 (3,"chiaro",0,"Il potassio endovena si somministra sempre diluito, con pompa, a velocita' controllata secondo protocollo. Piu' lento in vena periferica, e con il monitoraggio ECG se concentrazione o velocita' sono elevate."),
 (3,"chiaro",0,"Ricordi la Raccomandazione uno: le fiale di cloruro di potassio concentrato vanno conservate separate e segnalate. E la richiesta di chiarimento al medico si documenta."),
 (3,"chiaro",0,"Una domanda d'orale collegata: l'infermiere che esegue una prescrizione palesemente errata ne risponde? Si': la responsabilita' e' anche sua, come hai visto nella lezione uno punto cinque."),

 (4,"chiaro",0,"Trappola due, ore dieci. La prescrizione: eparina sodica, venticinquemila unita' in cinquanta millilitri di fisiologica, da infondere a mille unita' all'ora."),
 (4,"chiaro",0,"La pompa, impostata da un collega nella notte, scorre a venti millilitri all'ora. Pausa: e' corretto? Prima di rispondere, fai il calcolo."),

 (5,"chiaro",0,"Il calcolo. La concentrazione e' venticinquemila diviso cinquanta: cinquecento unita' per millilitro. La velocita' corretta e' mille diviso cinquecento: due millilitri all'ora."),
 (5,"chiaro",0,"La pompa a venti millilitri all'ora eroga invece diecimila unita' all'ora: dieci volte la dose. E' l'errore tipico della virgola: un fattore dieci, che solo il calcolo fa vedere."),
 (5,"chiaro",0,"Le azioni. Fermare l'infusione. Avvisare subito il medico. Valutare i segni di sanguinamento e i parametri. L'aPTT urgente e la protamina, l'antidoto, secondo prescrizione."),
 (5,"chiaro",0,"Poi si segnala l'evento, cercando le cause e non i colpevoli. E la prevenzione: il doppio controllo indipendente per i farmaci ad alto livello di attenzione, e le pompe con la libreria dei farmaci."),

 (6,"chiaro",0,"Trappola tre, ore tredici. Il signor Rino, ottantadue anni, in seconda giornata postoperatoria, riceve morfina endovena, quattro milligrammi ogni quattro ore, piu' una dose al bisogno data alle dodici."),
 (6,"chiaro",0,"Alle tredici e' molto sonnolento, e risponde a fatica allo stimolo verbale. Frequenza respiratoria otto, pupille miotiche, saturazione ottantotto in aria. Che cosa succede?"),

 (7,"chiaro",0,"[serious] E' una depressione respiratoria da oppioidi: sedazione, bradipnea, miosi. Le azioni: stimolare il paziente e invitarlo a respirare. Ossigeno. Chiamare subito il medico. Sospendere l'oppioide."),
 (7,"chiaro",0,"Poi il naloxone, secondo prescrizione o protocollo, a piccole dosi titolate. Inverte la depressione respiratoria senza annullare del tutto l'analgesia, e senza scatenare un dolore violento."),
 (7,"chiaro",0,"Poi il monitoraggio continuo, perche' il naloxone dura meno della morfina: quando il suo effetto finisce, l'oppioide e' ancora li', e il paziente puo' riaddormentarsi."),
 (7,"chiaro",0,"E la prevenzione: valutare la sedazione prima di ogni dose, perche' la sedazione precede la depressione respiratoria. Con un'attenzione particolare all'anziano e all'insufficienza renale."),

 (8,"chiaro",0,"Un richiamo alle regole sugli stupefacenti della lezione cinque punto sette. Il registro di carico e scarico, previsto dal DPR trecentonove del millenovecentonovanta, e l'armadio chiuso a chiave."),
 (8,"chiaro",0,"Ogni somministrazione si registra. Le fiale usate in parte e i residui si smaltiscono secondo procedura, con un testimone. E qualsiasi discrepanza nel registro si segnala subito."),

 (9,"chiaro",0,"Trappola quattro, ore quindici. Emazie in corso da dieci minuti. Brividi, febbre a trentotto e nove, dolore lombare, angoscia. Pressione ottantacinque su cinquanta, frequenza centoventicinque, urine scure. Che cosa succede?"),

 (10,"chiaro",0,"E' una sospetta reazione emolitica acuta, da incompatibilita' AB0. Le azioni, nell'ordine. La prima: interrompere subito la trasfusione."),
 (10,"chiaro",0,"Mantenere l'accesso venoso con soluzione fisiologica e un nuovo set, perche' nel deflussore c'e' ancora sangue incompatibile. E chiamare subito il medico."),
 (10,"chiaro",0,"Parametri ravvicinati e diuresi, per il rischio di danno renale. Verificare al letto l'identita' del paziente e l'etichetta dell'unita'. E i prelievi, secondo procedura."),
 (10,"chiaro",0,"Sacca e set si inviano al servizio trasfusionale, e si fa la notifica di emovigilanza. La Raccomandazione cinque la definisce un evento sentinella: quasi sempre nasce da un errore di identificazione."),

 (11,"chiaro",0,"[thoughtful] Il filo comune delle quattro trappole. Sono tutti farmaci o prodotti ad alto livello di attenzione: il potassio, l'eparina, gli oppioidi, gli emocomponenti."),
 (11,"chiaro",0,"E l'infermiere e' l'ultima barriera. Controlla prima di eseguire: prescrizione, calcolo, paziente, via, velocita'. Osserva dopo aver eseguito. Comunica subito. Segnala, in un'ottica no blame."),
 (11,"chiaro",0,"E la responsabilita' e' condivisa, come prevedono la legge ventiquattro del duemiladiciassette e il Codice deontologico. Nessuno e' solo, ma nessuno puo' dire che non toccava a lui."),

 (12,"chiaro",0,"Le giuste regole della lezione cinque punto quattro: paziente, farmaco, dose, via, tempo e registrazione. E, nelle versioni estese, velocita', forma farmaceutica, monitoraggio, diritto di rifiuto."),
 (12,"chiaro",0,"L'identificazione, con almeno due identificativi. E un segnale d'allarme da non ignorare mai: la domanda del paziente. Questa pastiglia non l'ho mai presa: si verifica sempre, prima di somministrare."),

 (13,"chiaro",0,"Gli errori. Eseguire una prescrizione palesemente errata perche' l'ha scritta il medico. Fidarsi della pompa impostata dal turno precedente, senza ricalcolare. Dare la dose al bisogno senza valutare la sedazione."),
 (13,"chiaro",0,"Rallentare la trasfusione invece di fermarla. Gettare la sacca, che e' una prova indispensabile per capire che cosa e' successo. E non segnalare, per paura."),

 (14,"chiaro",0,"E dopo l'errore, che cosa si fa? Prima di tutto la sicurezza del paziente: gli interventi per limitare il danno. Poi la comunicazione dell'evento al paziente e ai familiari."),
 (14,"chiaro",0,"Una comunicazione onesta, tempestiva, secondo le procedure aziendali, e insieme al medico. Nascondere un errore distrugge la fiducia piu' dell'errore stesso."),
 (14,"chiaro",0,"Poi la segnalazione e l'analisi delle cause, con l'audit o l'analisi delle cause profonde, senza cercare il colpevole. E il supporto all'operatore coinvolto, che spesso vive l'errore come un trauma."),
 (14,"chiaro",0,"Si parla, per lui, di seconda vittima. E le azioni di miglioramento, come il doppio controllo o le librerie dei farmaci nelle pompe, nascono proprio dalle segnalazioni."),

 (15,"chiaro",0,"Le domande d'orale. Prima: che cosa prevedono le Raccomandazioni uno e cinque? La uno, il cloruro di potassio concentrato: separato, segnalato, mai in bolo. La cinque, la reazione da AB0: si previene identificando bene."),
 (15,"chiaro",0,"Seconda: come calcola la velocita' di un'infusione? Prima la concentrazione: farmaco diviso volume. Poi la dose oraria diviso la concentrazione. Mille unita' all'ora, a cinquecento per millilitro: due millilitri all'ora."),
 (15,"chiaro",0,"Terza: che cosa fa davanti a una prescrizione che ritiene errata? Non la eseguo, contatto il medico per un chiarimento, documento la richiesta e, se necessario, coinvolgo il coordinatore."),

 (16,"chiaro",0,"La risposta modello, per la trasfusione. Dopo dieci minuti di emazie: brividi, febbre, dolore lombare, ipotensione, tachicardia, urine scure. Sospetta reazione emolitica acuta da AB0: emergenza ed evento sentinella."),
 (16,"chiaro",0,"Interrompo immediatamente la trasfusione, mantengo l'accesso venoso con fisiologica tramite un nuovo set e chiamo subito il medico. Rilevo parametri e diuresi, e collaboro al trattamento dello shock."),
 (16,"chiaro",0,"Verifico al letto la corrispondenza fra paziente, richiesta ed etichetta dell'unita'. Eseguo i prelievi previsti, e invio sacca e set al servizio trasfusionale. E rassicuro il paziente."),
 (16,"chiaro",0,"Documento, attivo l'emovigilanza e segnalo l'evento. La prevenzione si basa sulla corretta identificazione, al prelievo e al letto, e sulla sorveglianza nei primi quindici minuti."),

 (17,"chiaro",0,"I collegamenti. La responsabilita', con la uno punto cinque. I calcoli, con la cinque punto tre. Le giuste regole e il doppio controllo, con la cinque punto quattro. Oppioidi e naloxone, con la cinque punto sei."),
 (17,"chiaro",0,"Potassio, eparina e stupefacenti, con la cinque punto sette. La trasfusione, con la sei punto sei. E il rischio clinico con le Raccomandazioni, con la due punto sei."),

 (18,"profondo",1.2,"[serious] La frase del caso: fermarsi un minuto a controllare non e' lentezza, e' sicurezza. Ognuna delle quattro trappole si risolveva con una verifica di pochi secondi."),

 (19,"chiaro",0,"[warm] Nella prossima lezione: un turno pomeridiano con sei pazienti, un OSS e un assistente infermiere, e un familiare che perde il controllo. Priorita', attribuzione, supervisione e gestione dell'aggressione. A tra poco."),
]
CAPITOLI = {1:"Apertura",2:"Trappola 1, ore 8: il potassio",3:"Il potassio: la risposta",4:"Trappola 2, ore 10: l'eparina in pompa",
 5:"L'eparina: il calcolo e le azioni",6:"Trappola 3, ore 13: la morfina",7:"La morfina: la risposta",8:"Gli stupefacenti: le regole",
 9:"Trappola 4, ore 15: la trasfusione",10:"La trasfusione: la risposta",11:"Il filo comune delle quattro trappole",12:"Le giuste regole",
 13:"Gli errori da evitare",14:"Dopo l'errore",15:"Le domande d'orale",16:"La risposta in 15 righe",17:"I collegamenti",
 18:"La frase del caso",19:"Chiusura"}

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
