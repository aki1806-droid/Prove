# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Il Veneto ha costruito nel tempo una rete articolata per le persone non autosufficienti, con strumenti e nomi propri che altrove non esistono: i Centri di Servizi, la SVaMA, le impegnative."),
 (1,"chiaro",0,"Molti infermieri lavorano in questa rete, e all'orale questi termini dimostrano una preparazione specifica sul Veneto. Vediamo come si entra nella rete, quali servizi offre e che cosa fa l'infermiere."),

 (2,"chiaro",0,"Il principio e' la porta unica. Non si accede ai servizi per la non autosufficienza perche' c'e' un posto libero, o perche' la famiglia insiste."),
 (2,"chiaro",0,"Si accede attraverso una valutazione multidimensionale, svolta dall'UVMD: e' la porta unica di accesso alla rete integrata dei servizi, per i casi complessi."),
 (2,"chiaro",0,"E gli strumenti sono uguali in tutta la regione. Questo garantisce uniformita' ed equita': due persone con lo stesso bisogno, in due ULSS diverse, vengono valutate allo stesso modo."),

 (3,"chiaro",0,"L'UVMD e' l'Unita' di Valutazione Multidimensionale Distrettuale. Il nome dice gia' molto: valuta la persona in piu' dimensioni, e lavora nel distretto."),
 (3,"chiaro",0,"La sua composizione di base comprende il direttore del distretto, o un suo delegato, il medico di medicina generale della persona e l'assistente sociale del Comune."),
 (3,"chiaro",0,"A questi si aggiungono altri professionisti secondo il caso: l'infermiere, gli specialisti, il fisioterapista. E' l'integrazione veneta fra sanitario e sociale, la stessa delle ULSS, le Unita' Locali Socio Sanitarie."),
 (3,"chiaro",0,"Le sue funzioni sono quattro. Valuta il bisogno. Definisce e approva il progetto individuale. Individua il servizio piu' adatto. E verifica nel tempo i risultati."),

 (4,"chiaro",0,"Gli strumenti. La SVaMA e' la Scheda per la Valutazione Multidimensionale dell'Anziano: lo strumento con cui l'UVMD esplora la persona, area per area."),
 (4,"chiaro",0,"Le aree sono cinque: quella sanitaria, quella cognitiva, quella funzionale, cioe' l'autonomia e la mobilita', i bisogni assistenziali e l'area sociale. Ne esce un profilo di autonomia e di bisogno."),
 (4,"chiaro",0,"Per le persone con disabilita' esiste una scheda dedicata, la SVaMDi, la scheda per la valutazione delle persone con disabilita'. Quindi: SVaMA per l'anziano, SVaMDi per la disabilita'."),
 (4,"chiaro",0,"L'infermiere contribuisce soprattutto alla valutazione sanitaria e a quella dei bisogni assistenziali: le lesioni, i dispositivi, le terapie, il rischio di caduta."),

 (5,"chiaro",0,"I servizi della rete, dal meno al piu' intensivo. Prima la domiciliarita': l'ADI, l'assistenza domiciliare integrata, e il SAD dei Comuni, che con l'ADI si integra."),
 (5,"chiaro",0,"E l'impegnativa di cura domiciliare: un contributo economico per chi assiste a casa una persona non autosufficiente. Anche questo e' un nome tutto veneto, da usare cosi' all'orale."),
 (5,"chiaro",0,"Poi la semiresidenzialita': i centri diurni, dove la persona trascorre la giornata e la sera rientra a casa. E la residenzialita': i Centri di Servizi."),
 (5,"chiaro",0,"E poi i ricoveri temporanei di sollievo, e i nuclei specifici: per esempio per le demenze con gravi disturbi del comportamento, o per gli stati vegetativi."),

 (6,"chiaro",0,"Il principio guida e' la domiciliarita': la priorita' va al mantenimento della persona a casa, quando e' possibile e sicuro, sostenendo la famiglia e il caregiver."),
 (6,"chiaro",0,"La residenzialita' e' la risposta quando il bisogno non e' piu' gestibile al domicilio. Non e' il primo passo: arriva quando la casa, anche con tutti i sostegni, non basta piu'."),
 (6,"chiaro",0,"E' un principio coerente con il DM settantasette e con la riforma nazionale per le persone anziane non autosufficienti. E con un obiettivo nazionale: aumentare la quota di anziani assistiti a casa."),

 (7,"chiaro",0,"I Centri di Servizi. E' la denominazione veneta delle strutture residenziali per anziani non autosufficienti: quelle che in altre regioni si chiamano RSA, o case di riposo."),
 (7,"chiaro",0,"Possono essere pubblici, privati o del terzo settore. E devono essere autorizzati e accreditati secondo la legge regionale ventidue del duemiladue, che vedremo nella prossima lezione."),
 (7,"chiaro",0,"L'equipe comprende infermieri e OSS, il medico, il fisioterapista, l'educatore, lo psicologo e l'assistente sociale. Un'equipe multiprofessionale, come la valutazione che ha portato la persona fin li'."),
 (7,"chiaro",0,"Per ogni ospite si redige un Piano Assistenziale Individualizzato, il PAI. Non confonderlo con il progetto individuale: il progetto lo approva l'UVMD, il PAI si scrive nella struttura, per ogni ospite."),

 (8,"chiaro",0,"L'impegnativa di residenzialita' e' il titolo che riconosce la quota sanitaria della retta: la parte dei costi legata all'assistenza sanitaria, che e' a carico del Servizio Sanitario Regionale."),
 (8,"chiaro",0,"Si attribuisce dopo la valutazione dell'UVMD, in base al bisogno, e secondo una graduatoria gestita dall'ULSS. Con livelli di intensita' assistenziale diversi."),
 (8,"chiaro",0,"La quota alberghiera, cioe' il vitto, l'alloggio e i servizi generali, resta a carico della persona o della famiglia. Con un'eventuale integrazione del Comune, in base all'ISEE."),
 (8,"chiaro",0,"E' una distinzione che spiega perche' le famiglie pagano una parte della retta. Ed e' una confusione che costa punti: l'impegnativa copre la quota sanitaria, non la retta alberghiera."),

 (9,"chiaro",0,"L'infermiere nel Centro di Servizi ha un ruolo molto autonomo. Partecipa alla valutazione e al PAI, e gestisce la terapia, spesso complessa, e la politerapia."),
 (9,"chiaro",0,"Previene le cadute, le lesioni da pressione, la malnutrizione, la disidratazione e le infezioni. E gestisce le demenze e i disturbi del comportamento, i BPSD."),
 (9,"chiaro",0,"Accompagna la persona nelle cure di fine vita. Coordina il lavoro degli OSS. E mantiene la relazione con le famiglie."),
 (9,"chiaro",0,"E si raccorda con il medico e con l'ospedale, per evitare trasferimenti inappropriati in pronto soccorso. E' l'applicazione pratica di tutto il modulo undici."),

 (10,"chiaro",0,"Il percorso di una persona, dall'inizio. La segnalazione puo' venire dal medico di famiglia, dall'ospedale, dai servizi sociali, o dalla famiglia stessa."),
 (10,"chiaro",0,"Si presenta la domanda al distretto. L'UVMD valuta la persona con la SVaMA, e definisce il progetto individuale: e' la porta unica che abbiamo visto all'inizio."),
 (10,"chiaro",0,"Si attiva il servizio: il domicilio con l'ADI e l'impegnativa di cura domiciliare, il centro diurno, il sollievo. Oppure il Centro di Servizi, con l'impegnativa di residenzialita'."),
 (10,"chiaro",0,"E la situazione si rivaluta periodicamente, perche' il bisogno cambia. Il percorso non finisce con l'ingresso in un servizio: torna sempre alla valutazione."),

 (11,"chiaro",0,"[curious] Il caso d'esame. La figlia di un anziano con demenza moderata, che vive solo, chiede all'infermiere del reparto come ottenere un posto in casa di riposo dopo la dimissione. Che cosa rispondi?"),
 (11,"chiaro",0,"Spieghi che in Veneto l'accesso ai Centri di Servizi passa dalla valutazione multidimensionale dell'UVMD, con la SVaMA, attivabile dal distretto."),
 (11,"chiaro",0,"Che nel frattempo, se la dimissione e' vicina, si puo' attivare una dimissione protetta tramite la COT, con soluzioni temporanee: un Ospedale di Comunita', o un ricovero di sollievo."),
 (11,"chiaro",0,"E che esistono anche i servizi domiciliari e i centri diurni. Poi segnali il caso secondo la procedura del reparto. [serious] Non prometti un posto: orienti nel percorso."),

 (12,"chiaro",0,"[thoughtful] Le prospettive. A livello nazionale, la legge trentatre' del duemilaventitre' e il decreto legislativo ventinove del duemilaventiquattro hanno avviato la riforma per le persone anziane."),
 (12,"chiaro",0,"Con una valutazione multidimensionale unificata, il sostegno alla domiciliarita', e una prestazione universale, in via sperimentale."),
 (12,"chiaro",0,"Intanto la domanda continuera' a crescere, mentre le strutture affrontano la carenza di infermieri e di OSS, e il tema della qualita' e della sicurezza nelle residenze. Su questo, un candidato puo' mostrare consapevolezza."),

 (13,"chiaro",0,"Le parole venete da usare all'orale: Centri di Servizi, UVMD, SVaMA e SVaMDi, impegnativa di residenzialita' e impegnativa di cura domiciliare, quota sanitaria e quota alberghiera, progetto individuale e PAI, domiciliarita'."),

 (14,"chiaro",0,"La tabella. Porta unica. UVMD: direttore di distretto, medico di medicina generale, assistente sociale, e altri. SVaMA e SVaMDi. Domiciliarita': ADI, SAD, impegnativa di cura domiciliare. Centri diurni e sollievo."),
 (14,"chiaro",0,"Centri di Servizi, autorizzati e accreditati. Impegnativa di residenzialita', cioe' la quota sanitaria; quota alberghiera a carico della persona, con l'integrazione del Comune. Il PAI. E la riforma nazionale."),

 (15,"profondo",1.2,"[serious] La frase della lezione: prima si valuta il bisogno, poi si sceglie il servizio. E' il contrario di cercare un posto libero."),

 (16,"chiaro",0,"[warm] Nella prossima lezione: l'autorizzazione e l'accreditamento con la legge regionale ventidue del duemiladue, gli screening oncologici e la prevenzione in Veneto. A tra poco."),
]
CAPITOLI = {1:"Apertura",2:"La porta unica",3:"L'UVMD",4:"La SVaMA e la SVaMDi",5:"I servizi della rete",6:"La domiciliarita'",
 7:"I Centri di Servizi",8:"L'impegnativa di residenzialita'",9:"L'infermiere nel Centro di Servizi",10:"Il percorso di una persona",
 11:"Il caso d'esame",12:"Le prospettive",13:"Le parole venete",14:"La tabella",15:"La frase della lezione",16:"Chiusura"}

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
