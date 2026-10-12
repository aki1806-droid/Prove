# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Questo e' il caso piu' delicato del modulo. Riguarda una persona ricoverata per una malattia fisica che, durante la notte, lascia intendere di non voler piu' vivere."),
 (1,"chiaro",0,"Il rischio suicidario non riguarda solo la psichiatria: puo' presentarsi in qualsiasi reparto, e spesso e' l'infermiere il primo a cogliere i segnali."),
 (1,"chiaro",0,"La lezione resta su un piano professionale: riconoscere, parlare, proteggere, attivare. Collegamenti con le lezioni due punto sei, due punto sette, tre punto sette, undici punto tre e undici punto cinque."),

 (2,"chiaro",0,"Lo scenario. Il signor Michele, cinquantotto anni, e' ricoverato in medicina. Da pochi giorni ha ricevuto la diagnosi di una malattia oncologica avanzata."),
 (2,"chiaro",0,"E' separato, vive solo, ha perso il lavoro l'anno scorso, e ha un dolore addominale mal controllato. Alle due di notte, mentre sistemi la flebo, ti dice: tanto e' tutto inutile, sarebbe meglio farla finita."),
 (2,"chiaro",0,"Il compagno di stanza racconta che ieri Michele gli ha regalato il suo orologio. Fermati un momento: che cosa gli rispondi, e che cosa fai dopo?"),

 (3,"chiaro",0,"Il ragionamento. C'e' una frase che esprime un desiderio di morte. E ci sono molti fattori di rischio, quelli della lezione undici punto tre: una diagnosi grave recente, un dolore non controllato, l'isolamento sociale."),
 (3,"chiaro",0,"E ancora la perdita del lavoro, la separazione, un uomo di mezza eta'. Poi c'e' un segnale d'allarme specifico: donare oggetti personali, che puo' essere un gesto di congedo."),
 (3,"chiaro",0,"E' un rischio suicidario, e va preso sempre sul serio. Non e' un compito che si delega allo psichiatra: la prima risposta spetta a chi ascolta per primo."),

 (4,"chiaro",0,"La prima risposta e' parlarne. Ti fermi, ti siedi, dai tempo. Ascolti senza giudicare, senza prediche, e senza minimizzare con frasi come: ma no, vedra' che va tutto bene."),
 (4,"chiaro",0,"Poi chiedi in modo diretto: quando dice che sarebbe meglio farla finita, sta pensando di togliersi la vita? Molti operatori temono questa domanda. Ma, come nella lezione undici punto tre, chiedere non aumenta il rischio."),
 (4,"chiaro",0,"Apre la possibilita' di aiutare, e spesso la persona prova sollievo nel poterne parlare. Riconosci la sua sofferenza. E non prometti il segreto: per proteggerlo, dovrai condividere con l'equipe cio' che ti ha detto."),

 (5,"chiaro",0,"La valutazione del rischio. Michele risponde: ci penso da quando mi hanno dato la diagnosi; non ho ancora deciso niente, ma non ho nessuno."),
 (5,"chiaro",0,"Indicano un rischio piu' elevato i pensieri persistenti, la presenza di un piano e di un'intenzione, l'accesso a mezzi, i tentativi precedenti, e l'assenza di fattori protettivi, come le relazioni."),
 (5,"chiaro",0,"La valutazione strutturata spetta al medico e allo specialista, con strumenti dedicati. L'infermiere raccoglie e riferisce con precisione le parole della persona, che sono un dato clinico."),

 (6,"chiaro",0,"[serious] Le azioni immediate. Se il rischio appare elevato, il paziente non si lascia solo: si organizza una sorveglianza adeguata al rischio, secondo la procedura aziendale."),
 (6,"chiaro",0,"Si avvisa subito il medico di guardia, e si richiede la consulenza psichiatrica secondo indicazione. Poi la sicurezza dell'ambiente, come prevede la Raccomandazione quattro sulla prevenzione del suicidio in ospedale."),
 (6,"chiaro",0,"Si rimuovono gli oggetti potenzialmente pericolosi, si verificano i farmaci personali e le terapie lasciate a portata di mano, si presta attenzione a finestre e accessi."),
 (6,"chiaro",0,"E si documenta, trasmettendo l'informazione nelle consegne. Un rischio noto solo a chi era di turno quella notte non protegge nessuno."),

 (7,"chiaro",0,"Il dolore e la speranza. Il dolore non controllato e' di per se' un fattore di rischio: trattarlo bene, con la valutazione e l'analgesia efficace della lezione tre punto sette, e' un intervento di prevenzione."),
 (7,"chiaro",0,"Cosi' come trattare l'insonnia, la nausea, la dispnea. E Michele ha bisogno di un'informazione onesta sulla sua malattia, e sulle possibilita' di cura e di sollievo."),
 (7,"chiaro",0,"Le cure palliative della lezione undici punto cinque non sono un abbandono, ma una presa in carico. La sofferenza esistenziale merita ascolto, e si offre un supporto psicologico e spirituale, secondo i suoi desideri."),

 (8,"chiaro",0,"Ricostruire una rete. Non ho nessuno e' spesso meno vero di quanto la persona creda in quel momento. Si chiede chi sono le persone importanti per lui: i figli, l'ex moglie, gli amici, i fratelli."),
 (8,"chiaro",0,"Con il suo consenso, si coinvolgono. L'assistente sociale puo' affrontare i problemi economici, lavorativi e abitativi. E ci sono i servizi del territorio e le associazioni."),
 (8,"chiaro",0,"Si pianifica con cura la dimissione, perche' la fase subito dopo il ricovero e' un momento di rischio: non si dimette senza un collegamento con i servizi."),

 (9,"chiaro",0,"Un approfondimento sui falsi miti, che spesso guidano i comportamenti piu' dei protocolli. Chi ne parla non lo fa: falso, molte persone che si tolgono la vita ne avevano parlato. Chiedere mette l'idea in testa: falso."),
 (9,"chiaro",0,"Un miglioramento improvviso significa che il pericolo e' passato: attenzione. Una calma improvvisa, dopo una grande sofferenza, puo' indicare una decisione presa."),
 (9,"chiaro",0,"Chi vuole davvero farlo non si puo' fermare: falso, la crisi e' spesso temporanea e l'aiuto funziona. E' un problema solo psichiatrico: falso, malattie gravi, dolore, perdite e isolamento contano."),

 (10,"chiaro",0,"La comunicazione nell'equipe. Le consegne SBAR riportano le parole del paziente, non un generico e' giu' di morale. Il livello di sorveglianza e' concordato e chiaro a tutti, compresi gli OSS e il personale di supporto."),
 (10,"chiaro",0,"C'e' coerenza fra i turni, e le informazioni passano ai professionisti che prenderanno in carico Michele. In cartella niente etichette giudicanti: si descrivono fatti e parole."),

 (11,"chiaro",0,"[thoughtful] Un pensiero per gli operatori. Questi colloqui sono emotivamente pesanti, soprattutto di notte. Il confronto con i colleghi e con il coordinatore, e un debriefing, aiutano."),
 (11,"chiaro",0,"E se un evento dovesse accadere nonostante tutto, chi e' coinvolto ha bisogno di supporto, perche' puo' vivere colpa e trauma. La segnalazione serve a imparare, non a cercare colpevoli, come nella lezione due punto sei."),

 (12,"chiaro",0,"Gli errori. Cambiare discorso o minimizzare. Non chiedere direttamente, per paura. Promettere il segreto. Lasciare il paziente solo con un rischio elevato."),
 (12,"chiaro",0,"Aspettare il mattino per avvisare il medico. Non verificare l'ambiente e i farmaci personali. Non trasmettere l'informazione nelle consegne. Trascurare il dolore."),

 (13,"chiaro",0,"[curious] Le domande d'orale. Prima: che cosa fa se un paziente dice di voler morire? Lo ascolto senza giudicare, gli chiedo in modo diretto se pensa di togliersi la vita, e non prometto il segreto."),
 (13,"chiaro",0,"Non lo lascio solo se il rischio appare elevato, avviso subito il medico, curo la sicurezza dell'ambiente, documento e trasmetto nelle consegne."),
 (13,"chiaro",0,"Seconda: quali sono i fattori di rischio e i segnali d'allarme? I fattori: tentativi precedenti, disturbi psichiatrici, dipendenze, malattie gravi e dolore cronico, isolamento, perdite."),
 (13,"chiaro",0,"I segnali: esprimere disperazione, o di sentirsi un peso, congedarsi, regalare oggetti. E un'improvvisa calma, dopo una grande sofferenza."),
 (13,"chiaro",0,"Terza: che cosa prevede la Raccomandazione quattro? Riguarda la prevenzione del suicidio di paziente in ospedale: valutazione del rischio, sicurezza degli ambienti, sorveglianza, formazione, transizioni, gestione dell'evento."),

 (14,"chiaro",0,"La risposta modello. Paziente con recente diagnosi oncologica grave, dolore non controllato, isolamento e perdita del lavoro, che esprime il desiderio di farla finita e ha regalato un oggetto personale."),
 (14,"chiaro",0,"Rischio suicidario da prendere sul serio. Mi fermo, ascolto senza giudizio, gli chiedo in modo diretto se pensa di togliersi la vita e raccolgo con precisione le sue parole. Non prometto il segreto."),
 (14,"chiaro",0,"Avviso subito il medico e collaboro alla consulenza psichiatrica. Garantisco una sorveglianza adeguata, senza lasciarlo solo se il rischio e' elevato. Verifico ambiente e farmaci personali: Raccomandazione quattro."),
 (14,"chiaro",0,"Tratto il dolore e offro supporto psicologico e spirituale. Con il suo consenso coinvolgo le persone significative e l'assistente sociale. Documento, trasmetto nelle consegne e partecipo a una dimissione collegata ai servizi."),

 (15,"chiaro",0,"Collegamenti. Raccomandazioni ed eventi sentinella, due punto sei. Comunicazione, due punto sette. Dolore, tre punto sette. Salute mentale, undici punto tre. Palliative, undici punto cinque. Territorio, tredici punto quattro."),

 (16,"chiaro",0,"Le risorse. In ospedale: la consulenza psichiatrica, la psicologia clinica e la psico-oncologia, l'assistente sociale, l'assistenza spirituale."),
 (16,"chiaro",0,"Sul territorio: il Centro di Salute Mentale, il medico di medicina generale, i servizi sociali, le associazioni. In emergenza, il centododici o il centodiciotto. E si dice alla persona e ai familiari come chiedere aiuto."),

 (17,"profondo",1.2,"[serious] La frase del caso: chiedere non mette l'idea in testa, apre una porta. E dall'altra parte di quella porta c'e' spesso una persona che aspettava qualcuno disposto ad ascoltarla."),

 (18,"chiaro",0,"[warm] Nella prossima lezione restiamo nella salute mentale: un giovane uomo molto agitato in pronto soccorso, la de-escalation, la ricerca delle cause organiche e le regole del trattamento sanitario obbligatorio. A tra poco."),
]
CAPITOLI = {1:"Apertura",2:"Lo scenario",3:"Il ragionamento",4:"La prima risposta: parlarne",5:"La valutazione del rischio",
 6:"Le azioni immediate",7:"Il dolore e la speranza",8:"Ricostruire una rete",9:"I falsi miti",10:"La comunicazione nell'equipe",
 11:"Gli operatori",12:"Gli errori da evitare",13:"Le domande d'orale",14:"La risposta modello",15:"I collegamenti",
 16:"Le risorse",17:"La frase del caso",18:"Chiusura"}

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
