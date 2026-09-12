# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Gli studi sugli eventi avversi convergono su un dato: una quota molto rilevante ha, fra le cause contribuenti, un fallimento della comunicazione. E soprattutto nei momenti di passaggio."),
 (1,"chiaro",0,"Cambio turno, trasferimento, dimissione. Sono i tre momenti in cui l'informazione cambia di mano, ed e' li' che si perde: non mentre si cura, ma mentre si passa la cura a qualcun altro."),
 (1,"tenue",0,"Per questo la comunicazione clinica non sta nel modulo delle competenze relazionali: sta qui, accanto al rischio clinico. E' una barriera di sicurezza a tutti gli effetti."),

 (2,"chiaro",0,"Quattro blocchi. Il passaggio di consegne, con il metodo SBAR. La comunicazione con la persona assistita, e le tecniche che funzionano davvero invece di quelle che si danno per scontate."),
 (2,"chiaro",0,"Le cattive notizie e la gestione dell'aggressivita'. E la continuita' assistenziale nei passaggi di setting, che e' la parte che quasi nessun candidato prepara e che all'orale si sente subito."),

 (3,"chiaro",0,"Il passaggio di consegne e' il trasferimento di informazioni e di responsabilita' su una persona assistita, da un professionista a un altro. Le due cose insieme, non solo la prima."),
 (3,"chiaro",0,"E' il punto di maggior fragilita' del sistema: informazioni che esistono nella testa di uno devono arrivare intatte alla testa di un altro, in poco tempo e spesso in un ambiente rumoroso."),

 (4,"chiaro",0,"Il metodo piu' diffuso e' SBAR, quattro lettere. S, Situation: chi e' la persona e qual e' il problema adesso, in una frase sola. B, Background: il contesto clinico rilevante, non tutta la storia."),
 (4,"chiaro",0,"A, Assessment: la tua valutazione, che cosa pensi stia accadendo. R, Recommendation: che cosa proponi o che cosa chiedi, in modo esplicito. Sono le due lettere che quasi tutti saltano."),
 (4,"chiaro",0,"Nella variante ISBAR si antepone la I di Identify: chi sei tu e chi e' il paziente. In una telefonata fra reparti diversi e' la lettera che evita meta' degli equivoci, e costa cinque secondi."),

 (5,"chiaro",0,"Vediamolo su una chiamata al medico. I: sono Rossi, infermiere della Medicina 2, chiamo per la signora Bianchi, letto 12, 78 anni. S: da venti minuti e' dispnoica, satura 88 per cento in aria ambiente."),
 (5,"chiaro",0,"B: ricoverata tre giorni fa per scompenso cardiaco, in terapia diuretica; questa mattina peso piu' un chilo e otto. A: penso a un peggioramento del sovraccarico, ha rantoli alle basi e gli edemi aumentati."),
 (5,"chiaro",0,"R: ho messo ossigeno a 2 litri con occhialini e l'ho posizionata semiseduta. Chiedo che venga a valutarla, e se posso anticipare il diuretico. Trenta secondi, e il medico sa anche quanto e' urgente."),
 (6,"profondo",1.2,"Perche' funziona? Per le lettere A e R. Molti passaggi falliscono non per mancanza di dati, ma perche' chi chiama descrive e non chiede: l'altro non capisce che cosa gli si domanda, ne' con quale urgenza."),

 (7,"chiaro",0,"Sette regole per l'handover. Luogo e tempo dedicati, con interruzioni ridotte. Supporto scritto: la consegna verbale non sostituisce la cartella. Struttura fissa per tutti i pazienti."),
 (7,"chiaro",0,"Cosi' nulla dipende da chi parla. Priorita' esplicite: chi e' instabile, che cosa va controllato, che cosa e' in sospeso. Read back. Riservatezza: la consegna non si fa in corridoio. E spazio per le domande."),

 (8,"chiaro",0,"Un handover senza domande e' quasi sempre un handover non compreso. Il read back nasce da qui: e' la ripetizione ad alta voce dell'informazione critica ricevuta, per verificare di aver capito."),
 (8,"chiaro",0,"La sequenza e' fissa: ripeto ad alta voce, faccio confermare, trascrivo subito, ottengo la convalida scritta del prescrittore. Quattro passi in quest'ordine, e sono la Raccomandazione numero 7 vista da qui."),

 (9,"chiaro",0,"Tre strumenti, tre momenti. Briefing: prima di un'attivita' o all'inizio del turno, per allineare il gruppo su obiettivi, criticita' e ruoli. Time out: immediatamente prima di una procedura invasiva."),

 (10,"chiaro",0,"Per la verifica finale di paziente, sito e procedura: e' parte della check list di sala. Debriefing: dopo, per rivedere insieme che cosa e' andato bene e che cosa migliorare, senza cercare colpevoli."),
 (10,"chiaro",0,"E il debriefing dopo un'emergenza ha anche una funzione di supporto all'equipe: e' il tema delle seconde vittime della lezione scorsa, visto dal lato pratico di che cosa si fa il giorno dopo."),

 (11,"chiaro",0,"Passiamo alla persona assistita. Il tempo di relazione e' tempo di cura, dice il Codice deontologico; il tempo della comunicazione costituisce tempo di cura, dice la legge 219. Due premesse che qui diventano tecnica."),
 (11,"chiaro",0,"La comunicazione non e' cio' che si fa se avanza tempo: e' un intervento, e come ogni intervento si pianifica, si esegue con una tecnica e si documenta. Il resto e' buona volonta', che non basta."),
 (11,"chiaro",0,"Sei tecniche. Ascolto attivo: attenzione piena, sedersi, mettersi all'altezza degli occhi, non interrompere. Domande aperte: come sta andando con il dolore, non il dolore e' passato vero."),

 (12,"chiaro",0,"La seconda induce la risposta, e una risposta indotta non e' un dato. Riformulazione: restituire con parole proprie cio' che si e' capito. Chiarificazione: chiedere quando qualcosa non torna."),
 (12,"chiaro",0,"Il silenzio: dopo una notizia difficile, non riempire subito il vuoto. E' la tecnica piu' difficile, perche' il silenzio mette a disagio chi lo regge molto piu' di chi lo riceve. E il teach back."),
 (12,"chiaro",0,"Il teach back e' la tecnica piu' utile che quasi nessuno cita. Non si chiede ha capito, perche' la risposta e' quasi sempre si: per cortesia, per imbarazzo, per non deludere chi ha spiegato."),

 (13,"chiaro",0,"Si chiede invece alla persona di ripetere con parole proprie cio' che dovra' fare. Mi rispieghi come fara' l'insulina domani mattina. La differenza fra le due domande e' tutta nella risposta."),
 (13,"profondo",1.2,"E' il modo piu' efficace per verificare davvero la comprensione, ed e' la tecnica che qualifica qualunque risposta sull'educazione terapeutica. Chi la nomina all'orale ha gia' detto molto di se'."),

 (14,"chiaro",0,"Le barriere. Della persona: il dolore, l'ansia, i deficit sensoriali, il deterioramento cognitivo, la bassa alfabetizzazione sanitaria, la lingua. Nessuna di queste e' colpa di chi le ha."),
 (14,"chiaro",0,"Dell'operatore: il gergo tecnico, la fretta, il presupporre di aver spiegato, la chiusura difensiva. Ambientali: il rumore, la mancanza di privacy, le interruzioni continue."),
 (14,"chiaro",0,"E i facilitatori. Verificare protesi acustiche e occhiali. Sedersi. Una informazione alla volta. Materiale scritto semplice. Mediatore culturale dove serve. E il caregiver, se la persona lo desidera."),

 (15,"chiaro",0,"Le cattive notizie. La comunicazione di diagnosi e prognosi compete al medico, come sappiamo dalla lezione 1.4. Il protocollo piu' citato e' SPIKES, sei tappe, e vale la pena saperle per esteso."),
 (15,"chiaro",0,"S, Setting: luogo riservato, tempo protetto, presenza di chi la persona desidera. P, Perception: capire che cosa la persona gia' sa e crede. I, Invitation: chiedere quanto desidera sapere."),
 (15,"chiaro",0,"Ed e' il diritto a non sapere della legge 219. K, Knowledge: dare l'informazione gradualmente, con parole semplici. E, Emotions: accogliere la reazione prima di proseguire. S, Strategy and summary."),

 (16,"chiaro",0,"Riassumere e indicare i passi successivi. E il ruolo dell'infermiere, che e' definito e sostanziale anche se la notizia non la da' lui. Prepara il contesto. E' presente. Verifica che cosa e' stato compreso."),
 (16,"chiaro",0,"Perche' cio' che resta dopo un colloquio difficile e' molto meno di cio' che e' stato detto. Accompagna nelle ore successive. E rileva i bisogni che emergono, che spesso emergono dopo."),

 (17,"chiaro",0,"Il caso classico: il paziente chiede all'infermiere quale sia la sua diagnosi. La risposta corretta non e' comunicarla, e non e' nemmeno dire non so nulla e cambiare argomento."),
 (17,"profondo",1.2,"Si esplora che cosa la persona sa e che cosa teme. Si resta con lei. Si attiva il medico perche' l'informazione arrivi. E si documenta la richiesta e l'attivazione. Quattro passi, in quest'ordine."),

 (18,"chiaro",0,"L'aggressione agli operatori e' un rischio professionale riconosciuto: Raccomandazione numero 8, e legge 113 del 2020, che ha rafforzato la tutela penale del personale sanitario."),
 (18,"chiaro",0,"La prevenzione e' ambientale e organizzativa: gestione delle attese e dell'informazione, spazi, illuminazione, vie di fuga, sistemi di allarme. E passa dal riconoscimento precoce."),
 (18,"chiaro",0,"Tono che sale, irrequietezza motoria, invasione dello spazio, minacce verbali: l'escalation ha quasi sempre segnali anticipatori, e chi li vede ha ancora tempo per la de escalation."),

 (19,"chiaro",0,"Da fare: tono calmo e volume basso, distanza di sicurezza e via di uscita libera, non contrapporsi frontalmente, riconoscere l'emozione, offrire opzioni concrete, non promettere l'impossibile."),
 (19,"chiaro",0,"Da non fare: alzare la voce, toccare la persona, restare soli in uno spazio chiuso, rispondere alle provocazioni, minimizzare. E dopo: mettere in sicurezza, chiedere supporto, segnalare, documentare."),
 (19,"chiaro",0,"Documentare i fatti in modo oggettivo, come nella lezione 2.4, e attivare il supporto per l'operatore coinvolto, come nella 2.6. Tre lezioni che si chiudono in un unico gesto."),

 (20,"chiaro",0,"Chiudiamo con la continuita' assistenziale, che ha tre dimensioni. Informativa: le informazioni seguono la persona. Gestionale: gli interventi sono coerenti fra loro. Relazionale: c'e' un riferimento stabile."),
 (20,"chiaro",0,"Lo strumento infermieristico della continuita' verso casa e' la lettera infermieristica di dimissione, che non duplica quella medica. Riporta i bisogni assistenziali residui, l'autonomia e gli ausili."),
 (20,"chiaro",0,"[warm] Lesioni e medicazioni in corso. Dispositivi presenti: catetere, stomia, accessi vascolari. Educazione erogata e residua. E il caregiver di riferimento. Nella prossima ricomponiamo il modulo. A tra poco."),
]

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1:"Apertura",2:"Obiettivi",3:"L'handover",4:"SBAR",
 5:"SBAR in una chiamata al medico",6:"Perche' SBAR funziona",
 7:"Le regole dell'handover",8:"Il read back",9:"Briefing, time out, debriefing",
 10:"Time out e debriefing",11:"La comunicazione e' un intervento",
 12:"Le tecniche",13:"Teach back",14:"Barriere e facilitatori",15:"SPIKES",
 16:"Il ruolo dell'infermiere",17:"Il caso della diagnosi",
 18:"Aggressivita': prevenire e riconoscere",19:"De-escalation",
 20:"La continuita' e la chiusura"}
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
