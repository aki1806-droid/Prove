# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Apriamo il modulo dell'area medica, organizzato per apparati. Si comincia dal cuore, con tre temi che i concorsi chiedono sempre."),
 (1,"chiaro",0,"Lo scompenso cardiaco, il dolore toracico con le sindromi coronariche acute, e la lettura di base dell'ECG."),
 (1,"chiaro",0,"Non serve leggere un tracciato come un cardiologo: serve riconoscere i ritmi che richiedono un intervento immediato. Pochi, e si imparano guardandoli."),

 (2,"chiaro",0,"Lo scompenso cardiaco: il cuore non riesce piu' a pompare una quantita' di sangue adeguata ai bisogni dell'organismo."),
 (2,"chiaro",0,"Se cede il ventricolo sinistro, il sangue ristagna nei polmoni: dispnea, ortopnea, la persona dorme con piu' cuscini, dispnea parossistica notturna, rantoli alle basi."),
 (2,"chiaro",0,"Se cede il destro, il ristagno e' sistemico: edemi declivi, turgore delle giugulari, fegato ingrandito, ascite. Spesso le due forme coesistono."),

 (3,"chiaro",0,"La classificazione funzionale NYHA, in quattro classi, chiesta spesso. Classe uno: nessuna limitazione. Classe due: sintomi con l'attivita' ordinaria, come salire le scale."),
 (3,"chiaro",0,"Classe tre: sintomi con attivita' inferiori all'ordinaria, come vestirsi o camminare in casa. Classe quattro: sintomi anche a riposo. La classe e' una domanda sulla vita quotidiana, non un esame."),

 (4,"chiaro",0,"L'assistenza. Posizione semiseduta o seduta. Ossigeno se la saturazione e' bassa, secondo prescrizione. Peso quotidiano, il miglior indicatore dell'accumulo di liquidi, come nella lezione tre punto cinque."),
 (4,"chiaro",0,"Bilancio idrico e diuresi. Restrizione idrica se prescritta, dieta iposodica. Sorveglianza di potassio e creatinina con i diuretici. Riposo alternato ad attivita' graduale."),

 (5,"chiaro",0,"L'educazione, che riduce davvero i ricoveri. Pesarsi ogni giorno, alla stessa ora, e contattare il medico se il peso aumenta rapidamente, indicativamente di un chilo e mezzo-due in due-tre giorni."),
 (5,"chiaro",0,"E' un accumulo di liquidi che anticipa i sintomi: la bilancia se ne accorge prima del respiro. Riconoscere la dispnea, gli edemi, il bisogno di piu' cuscini per dormire."),
 (5,"chiaro",0,"Aderenza alla terapia, poco sale, attivita' fisica regolare, vaccinazioni."),

 (6,"chiaro",0,"Le sindromi coronariche acute. Il sintomo tipico: un dolore oppressivo dietro lo sterno, un peso sul petto, che si irradia al braccio sinistro, alla mandibola, al dorso o all'epigastrio. Dura piu' di venti minuti, con sudorazione, nausea, dispnea."),
 (6,"chiaro",0,"Ma attenzione alle presentazioni atipiche nelle donne, negli anziani e nei diabetici: solo dispnea, stanchezza, dolore epigastrico, o nessun dolore. Molti infarti vengono scambiati per una cattiva digestione."),

 (7,"chiaro",0,"Due quadri. Lo STEMI, con sopraslivellamento del tratto ST all'ECG: una coronaria e' completamente occlusa, e il trattamento e' la riperfusione urgente, di norma con angioplastica primaria."),
 (7,"chiaro",0,"L'NSTEMI e l'angina instabile, senza sopraslivellamento. La diagnosi di danno miocardico si basa sulla troponina, che si ripete a intervalli secondo protocollo, perche' un primo valore normale non esclude l'infarto."),

 (8,"chiaro",0,"Che cosa fa l'infermiere davanti a un dolore toracico. ECG a dodici derivazioni entro dieci minuti dal primo contatto: e' il numero da ricordare."),
 (8,"chiaro",0,"Monitoraggio del ritmo, parametri e saturazione, accesso venoso, prelievi per la troponina. Riposo, rassicurazione."),
 (8,"chiaro",0,"Ossigeno solo se la saturazione e' bassa: un tempo si dava a tutti, oggi no. Farmaci secondo prescrizione o protocollo, e avviso immediato al medico. Il tempo e' muscolo cardiaco."),

 (9,"chiaro",0,"Due farmaci del dolore toracico, con le loro cautele. I nitrati sono controindicati se la pressione e' bassa, nell'infarto del ventricolo destro e dopo i farmaci per la disfunzione erettile, come nella lezione cinque punto cinque."),
 (9,"chiaro",0,"L'acido acetilsalicilico si somministra secondo protocollo, se non ci sono controindicazioni come allergia o sanguinamento in atto."),

 (10,"chiaro",0,"L'ipertensione: valori pari o superiori a centoquaranta su novanta, in misurazioni ripetute. La tecnica di misurazione e' una domanda frequente: persona seduta da cinque minuti."),
 (10,"chiaro",0,"Bracciale della misura giusta, un bracciale piccolo su un braccio grande sovrastima la pressione, braccio all'altezza del cuore, almeno due misurazioni."),
 (10,"chiaro",0,"La crisi ipertensiva si distingue in urgenza, senza danno d'organo, ed emergenza, con danno d'organo: dolore toracico, deficit neurologici, edema polmonare, che richiede trattamento immediato."),

 (11,"chiaro",0,"La lettura di base dell'ECG, in cinque domande. Uno: la frequenza, normale fra sessanta e cento. Il metodo piu' semplice: contare i complessi QRS in sei secondi e moltiplicare per dieci."),
 (11,"chiaro",0,"Oppure dividere trecento per il numero di quadrati grandi fra due onde R. Due: il ritmo e' regolare o irregolare? Tre: c'e' un'onda P prima di ogni QRS?"),
 (11,"chiaro",0,"Quattro: l'intervallo PR e' fra zero virgola dodici e zero virgola venti secondi? Cinque: il QRS e' stretto, sotto zero virgola dodici, o largo? Tutte risposte normali: e' un ritmo sinusale."),

 (12,"chiaro",0,"I ritmi da riconoscere. La fibrillazione atriale, l'aritmia piu' frequente: ritmo irregolarmente irregolare, nessuna onda P, linea di base tremolante, QRS stretto."),
 (12,"chiaro",0,"Il rischio principale e' l'ictus, perche' nell'atrio che non si contrae si formano trombi: per questo molti pazienti sono in terapia anticoagulante, i farmaci della lezione cinque punto cinque."),
 (12,"chiaro",0,"Al polso si sente un battito irregolare, e la frequenza va misurata all'apice per un minuto: il polso radiale perde i battiti deboli, e conta meno di quanto il cuore batta."),

 (13,"chiaro",0,"I ritmi dell'arresto cardiaco. La tachicardia ventricolare: QRS larghi, regolari e rapidi; puo' avere il polso o no."),
 (13,"chiaro",0,"La fibrillazione ventricolare: un'attivita' caotica, senza QRS riconoscibili; e' un arresto cardiaco, ed e' defibrillabile."),
 (13,"chiaro",0,"L'asistolia: una linea piatta, prima di tutto si verificano cavi e derivazioni e si controlla il paziente; non e' defibrillabile. E l'attivita' elettrica senza polso: un tracciato organizzato in un paziente senza polso, non defibrillabile."),
 (13,"profondo",1.2,"[serious] Il principio, che vedremo nel modulo dieci: si guarda il paziente, non solo il monitor."),

 (14,"chiaro",0,"Le bradicardie. La bradicardia sinusale, sotto sessanta, spesso fisiologica negli sportivi o dovuta a farmaci come i beta-bloccanti."),
 (14,"chiaro",0,"E i blocchi atrioventricolari, in cui l'impulso fatica a passare dagli atri ai ventricoli: di primo grado, con un PR lungo; di secondo grado; di terzo grado, o completo: atri e ventricoli battono ognuno per conto proprio."),
 (14,"chiaro",0,"I sintomi: astenia, vertigini, sincope, ipotensione. Il blocco completo spesso richiede un pacemaker."),

 (15,"chiaro",0,"Il pacemaker. All'ECG si vede uno spike, un sottile tratto verticale, prima della P o del QRS. Dopo l'impianto: sorveglianza della ferita e dei segni di ematoma."),
 (15,"chiaro",0,"Per alcune settimane si limitano i movimenti ampi del braccio dal lato dell'impianto, per non spostare gli elettrodi."),
 (15,"chiaro",0,"La persona porta con se' la tessera del dispositivo, fa attenzione ai campi magnetici, e puo' fare una risonanza magnetica solo se il dispositivo e' compatibile e secondo protocollo."),

 (16,"chiaro",0,"Il caso. Donna di settantadue anni, diabetica, da un'ora dolore epigastrico e nausea, ed e' sudata. Che cosa pensi? Una presentazione atipica di una sindrome coronarica acuta, finche' non si dimostra il contrario."),
 (16,"chiaro",0,"Che cosa fai? ECG entro dieci minuti, monitoraggio, parametri e saturazione, accesso venoso, prelievi, riposo, avviso immediato al medico."),
 (16,"chiaro",0,"E' solo una cattiva digestione e' la risposta che i concorsi costruiscono per farti sbagliare. Donna, anziana, diabetica: tre ragioni per non crederci."),

 (17,"chiaro",0,"In Veneto opera una rete per l'infarto acuto: il centodiciotto esegue l'ECG sul territorio, lo teletrasmette allo specialista e, in caso di STEMI, porta il paziente direttamente in emodinamica, saltando il pronto soccorso."),
 (17,"chiaro",0,"Esistono ambulatori dello scompenso e progetti di telemonitoraggio, sempre piu' legati all'infermiere di famiglia e comunita'. All'orale, la frase chiave e': la rete STEMI riduce il tempo alla riperfusione."),

 (18,"chiaro",0,"Ricapitoliamo. Scompenso sinistro: polmone; destro: edemi. NYHA da uno a quattro. Peso quotidiano. Dolore toracico: ECG entro dieci minuti, ossigeno solo se la saturazione e' bassa. Attenzione alle presentazioni atipiche."),
 (18,"chiaro",0,"Fibrillazione atriale: irregolare, senza onde P, rischio di ictus. Fibrillazione ventricolare: defibrillabile. Asistolia: non defibrillabile. [warm] Nella prossima lezione: polmone e ossigenoterapia. A tra poco."),
]

CAPITOLI = {1:"Apertura",2:"Lo scompenso",3:"La NYHA",4:"L'assistenza",5:"L'educazione",6:"Il dolore toracico",7:"STEMI e NSTEMI",
 8:"Che cosa fa l'infermiere",9:"Nitrati e aspirina",10:"L'ipertensione",11:"La lettura dell'ECG",12:"La fibrillazione atriale",
 13:"I ritmi dell'arresto",14:"Le bradicardie",15:"Il pacemaker",16:"Il caso",17:"In Veneto",18:"Chiusura"}

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
