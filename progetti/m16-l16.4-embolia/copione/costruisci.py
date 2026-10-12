# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] L'embolia polmonare e' una delle cause di morte evitabile piu' frequenti in ospedale. Qui la vediamo comparire in medicina, in una paziente che non era stata operata."),
 (1,"chiaro",0,"E il problema era cominciato giorni prima: un rischio che nessuno aveva valutato, un segnale notato ma non interpretato. Le lezioni: tre punto due, cinque punto cinque, otto punto due, due punto sei e quattordici punto sette."),

 (2,"chiaro",0,"Lo scenario. La signora Paola, cinquantotto anni, obesa, e' ricoverata da quattro giorni in medicina per una pielonefrite, quasi sempre a letto per la stanchezza. In terapia antibiotica, ma senza profilassi antitrombotica."),
 (2,"chiaro",0,"Ieri ha riferito dolore e gonfiore al polpaccio sinistro, annotati come da posizione. Oggi, al primo tentativo di andare in bagno: dispnea improvvisa, dolore toracico che aumenta con il respiro, e una forte ansia."),
 (2,"chiaro",0,"Frequenza centoventidue, respiratoria trenta, saturazione ottantasei in aria, pressione centoquattro su sessantotto. Fermati un momento: che cosa pensi, e che cosa fai?"),

 (3,"chiaro",0,"[thoughtful] Il ragionamento. Immobilita', obesita' e infezione acuta: il rischio tromboembolico e' elevato. E il polpaccio dolente e gonfio di ieri, da un solo lato, era con ogni probabilita' una trombosi venosa profonda."),
 (3,"chiaro",0,"Alzandosi, dispnea improvvisa, dolore pleuritico, tachicardia, desaturazione, ansia: embolia polmonare fino a prova contraria. La pressione e' conservata, ma va sorvegliata: l'embolia ad alto rischio si presenta con lo shock."),

 (4,"chiaro",0,"Le prime azioni. La riporti a letto in posizione semiseduta, e non la fai camminare. Chiami subito il medico, con lo SBAR. Ossigeno, con un target di novantaquattro-novantotto."),
 (4,"chiaro",0,"Monitoraggio continuo e accesso venoso. L'ECG, che spesso mostra solo una tachicardia sinusale: i quadri da manuale non sono sempre presenti. E i prelievi: emocromo, coagulazione, funzione renale, troponina, emogas."),
 (4,"chiaro",0,"Non massaggi l'arto. E non la lasci sola: l'ansia intensa fa parte del quadro, e la tua presenza la riduce."),

 (5,"chiaro",0,"La diagnosi. Con una probabilita' clinica alta, come in questo caso, si procede direttamente all'angio-TC polmonare. Il D-dimero serve soprattutto a escludere la trombosi nei pazienti a bassa probabilita'."),
 (5,"chiaro",0,"Perche' e' aumentato in molte condizioni, comprese le infezioni. Per il mezzo di contrasto si verificano funzione renale, allergie e un accesso adeguato, come nella lezione quattordici punto sette."),
 (5,"chiaro",0,"Si esegue un'ecografia degli arti inferiori. La terapia e' l'anticoagulazione secondo prescrizione: eparina, e poi un anticoagulante orale. E se comparisse uno shock, si valuterebbe una trombolisi sistemica."),

 (6,"chiaro",0,"La sorveglianza durante l'anticoagulazione. Parametri e saturazione, e i segni di peggioramento: ipotensione, sincope, aumento della dispnea."),
 (6,"chiaro",0,"I segni di sanguinamento: gengive, urine, feci, ematomi, punti di puntura, cefalea. Niente intramuscolari. E i controlli di laboratorio in base al farmaco: l'aPTT con l'eparina non frazionata."),
 (6,"chiaro",0,"Le piastrine con le eparine, per il rischio di piastrinopenia indotta. E la mobilizzazione: avviata l'anticoagulazione, si riprende secondo indicazione medica, senza tenere la paziente a letto piu' del necessario."),

 (7,"chiaro",0,"[serious] Ora la parte piu' utile: che cosa non ha funzionato. Uno: nessuno ha valutato il rischio tromboembolico all'ingresso. Due: la profilassi non e' stata prescritta, persa nel passaggio dal pronto soccorso al reparto."),
 (7,"chiaro",0,"Tre: il segnale di trombosi di ieri, un polpaccio dolente e gonfio da un solo lato, e' stato annotato, ma non interpretato, ne' segnalato. Quattro: la mobilizzazione e' stata insufficiente."),
 (7,"chiaro",0,"E' un evento da segnalare e analizzare, come nella lezione due punto sei, per correggere il percorso: non per trovare un colpevole. E certamente non da nascondere."),

 (8,"chiaro",0,"Un approfondimento, con un aggancio veneto. Per i pazienti ricoverati in area medica si usa spesso il Padua Prediction Score, sviluppato proprio a Padova. Assegna punti a undici fattori."),
 (8,"chiaro",0,"Tre punti per il cancro attivo, il pregresso tromboembolismo, la ridotta mobilita' e la trombofilia. Due punti per un trauma o una chirurgia recente."),
 (8,"chiaro",0,"Un punto per l'eta' da settant'anni, lo scompenso cardiaco o respiratorio, l'infarto o l'ictus acuto, l'infezione acuta, l'obesita' e la terapia ormonale. Un punteggio da quattro in su indica un rischio alto."),
 (8,"chiaro",0,"E la profilassi va considerata, se non ci sono controindicazioni. La signora Paola totalizzava cinque punti: ridotta mobilita', infezione e obesita'. La profilassi era indicata fin dal primo giorno."),

 (9,"chiaro",0,"La prevenzione e' in gran parte infermieristica. Valutare il rischio tromboembolico, insieme a quello emorragico, all'ingresso e a ogni cambiamento. Verificare che la profilassi sia prescritta e somministrata."),
 (9,"chiaro",0,"Soprattutto nei passaggi fra setting, dove le terapie si perdono: e' la riconciliazione della lezione cinque punto quattro. Mobilizzazione precoce ed esercizi degli arti inferiori. Idratazione."),
 (9,"chiaro",0,"Profilassi meccanica secondo indicazione. Ispezione degli arti, segnalando dolore, edema monolaterale e calore. E l'educazione del paziente, che puo' riferire per primo un sintomo."),

 (10,"chiaro",0,"L'educazione alla dimissione. L'anticoagulante orale: assunzione regolare, mai sospenderlo da soli, per la durata indicata dal medico. E i segni di sanguinamento da segnalare."),
 (10,"chiaro",0,"Le interazioni con i farmaci da banco, come i FANS, e con gli integratori. E informare il dentista, e ogni medico."),
 (10,"chiaro",0,"I segni di recidiva, dolore o gonfiore di una gamba e dispnea improvvisa: si chiama subito il centododici o il centodiciotto. Il movimento, l'idratazione, le precauzioni nei viaggi lunghi. E il controllo del peso."),

 (11,"chiaro",0,"E una domanda difficile. La paziente ti chiede: perche' mi e' successo, qui in ospedale? La risposta richiede onesta' e chiarezza, nei limiti delle tue competenze."),
 (11,"chiaro",0,"E il coinvolgimento del medico, per una comunicazione completa dell'evento, secondo le procedure aziendali. Non si scaricano responsabilita' sui colleghi, e non si minimizza."),
 (11,"chiaro",0,"Si rassicura sul trattamento in corso, e si documenta il colloquio. La fiducia si perde molto piu' per un silenzio che per un errore spiegato con sincerita'."),

 (12,"chiaro",0,"Gli errori. Annotare un polpaccio dolente come da posizione, senza segnalarlo. Non valutare il rischio. Non verificare la profilassi nel passaggio di setting."),
 (12,"chiaro",0,"Far camminare una paziente con dispnea improvvisa. Rassicurarsi per una pressione ancora normale. Massaggiare l'arto. Non segnalare l'evento."),

 (13,"chiaro",0,"[curious] Le domande d'orale. Prima: quali sono i segni? La trombosi venosa profonda da' dolore, edema monolaterale e calore dell'arto."),
 (13,"chiaro",0,"L'embolia polmonare da' dispnea improvvisa, dolore toracico pleuritico, tachicardia, desaturazione, ansia, e nei casi gravi ipotensione e sincope. Seconda: come si valuta il rischio nel paziente medico?"),
 (13,"chiaro",0,"Con scale come il Padua Prediction Score, in cui un punteggio da quattro indica un rischio alto, insieme alla valutazione del rischio emorragico. Terza: a che cosa serve il D-dimero?"),
 (13,"chiaro",0,"Ha un alto valore predittivo negativo: un valore normale, in un paziente a bassa probabilita', permette di escludere la trombosi. Un valore alto non la conferma, perche' aumenta in molte condizioni."),

 (14,"chiaro",0,"La risposta modello. Paziente immobilizzata da quattro giorni, obesa, con infezione acuta e senza profilassi, che dopo un dolore al polpaccio presenta, alzandosi, dispnea improvvisa e dolore pleuritico."),
 (14,"chiaro",0,"Tachicardia e desaturazione: sospetta embolia polmonare. La riporto a letto semiseduta, chiamo subito il medico, somministro ossigeno con target novantaquattro-novantotto, avvio il monitoraggio."),
 (14,"chiaro",0,"Posiziono un accesso, eseguo ECG e prelievi, e non massaggio l'arto. La preparo all'angio-TC. Somministro l'anticoagulante prescritto, sorveglio peggioramento e sanguinamento, e rassicuro la paziente."),
 (14,"chiaro",0,"Segnalo l'evento, evidenziando la mancata valutazione del rischio e la profilassi persa dal pronto soccorso. Riprendo la mobilizzazione secondo indicazione e, alla dimissione, educo sull'anticoagulante e sulla recidiva."),

 (15,"chiaro",0,"I collegamenti. Trombosi e immobilita' con la tre punto due. Anticoagulanti con la cinque punto cinque. Ossigeno con la otto punto due. Rischio clinico e segnalazione con la due punto sei."),
 (15,"chiaro",0,"Riconciliazione con la cinque punto quattro. Il D-dimero con la quattordici punto sei, il contrasto con la quattordici punto sette. E le complicanze postoperatorie con la nove punto cinque."),

 (16,"chiaro",0,"Una riflessione. L'embolia polmonare in ospedale e' spesso un evento evitabile. Gli strumenti esistono: le scale, la profilassi, la mobilizzazione."),
 (16,"chiaro",0,"La differenza la fanno l'attenzione ai passaggi fra setting, e la capacita' di dare un significato a un segno, come un polpaccio gonfio, invece di archiviarlo."),

 (17,"profondo",1.2,"[serious] La frase del caso: un polpaccio gonfio da un solo lato non e' da posizione, finche' non si dimostra il contrario."),

 (18,"chiaro",0,"[warm] Nella prossima lezione: un'epidemia di diarrea in reparto, causata dal Clostridioides difficile. Isolamento, igiene delle mani, sanificazione e uso responsabile degli antibiotici. A tra poco."),
]
CAPITOLI = {1:"Apertura",2:"Lo scenario",3:"Il ragionamento",4:"Le prime azioni",5:"La diagnosi e la terapia",
 6:"La sorveglianza in anticoagulazione",7:"Che cosa non ha funzionato",8:"Il rischio nel paziente medico",
 9:"La prevenzione: il ruolo infermieristico",10:"L'educazione alla dimissione",11:"Comunicare con la paziente",
 12:"Gli errori da evitare",13:"Le domande d'orale",14:"La risposta modello",15:"I collegamenti",
 16:"Una riflessione",17:"La frase del caso",18:"Chiusura"}

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
