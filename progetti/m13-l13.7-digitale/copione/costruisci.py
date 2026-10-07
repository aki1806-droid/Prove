# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Oggi un infermiere passa una parte importante del turno davanti a uno schermo: la cartella elettronica, le prescrizioni, gli esami, la documentazione."),
 (1,"chiaro",0,"E i cittadini gestiscono ricette, prenotazioni e referti dallo smartphone. Vediamo gli strumenti digitali veneti, e soprattutto le responsabilita' di chi li usa: un accesso sbagliato a un dato sanitario puo' costare caro."),

 (2,"chiaro",0,"Il Fascicolo Sanitario Elettronico, l'FSE, e' l'insieme dei dati e dei documenti digitali, sanitari e socio-sanitari, generati dagli eventi clinici che riguardano la persona."),
 (2,"chiaro",0,"E' stato istituito a livello nazionale con il decreto-legge centosettantanove del duemiladodici, e rafforzato negli ultimi anni con il cosiddetto FSE due punto zero, finanziato anche dal PNRR."),
 (2,"chiaro",0,"Che cosa contiene? I referti, le lettere di dimissione, i verbali di pronto soccorso, le prescrizioni, le vaccinazioni, e il profilo sanitario sintetico, redatto dal medico di famiglia."),
 (2,"chiaro",0,"A che cosa serve? Alla cura, prima di tutto, ma anche alla prevenzione, alla ricerca e al governo del sistema. In Veneto il Fascicolo regionale rientra nei sistemi informativi affidati ad Azienda Zero."),

 (3,"chiaro",0,"In Veneto il cittadino accede ai servizi digitali attraverso Sanita' km zero: il portale e le app della Regione del Veneto, gestiti insieme ad Azienda Zero."),
 (3,"chiaro",0,"Sanita' km zero Fascicolo: l'accesso al proprio FSE con lo SPID o con la CIE, la carta d'identita' elettronica, per consultare i referti, le ricette e gli altri documenti."),
 (3,"chiaro",0,"Sanita' km zero Ricette: la gestione digitale delle prescrizioni, con la possibilita' di prenotare in uno qualsiasi dei CUP della Regione, indipendentemente dall'azienda di appartenenza."),
 (3,"chiaro",0,"Sanita' km zero Prenota Veloce: la prenotazione rapida di visite ed esami con priorita' D, la classe differibile, che vediamo fra poco insieme alle altre classi di priorita'."),
 (3,"chiaro",0,"E c'e' una funzione di delega a un'altra persona. E' utile, per esempio, per il figlio che gestisce i referti, le ricette e le prenotazioni di un genitore anziano."),

 (4,"chiaro",0,"I diritti del cittadino sul Fascicolo. Dal duemilaventi l'alimentazione, cioe' il caricamento dei documenti, avviene in modo automatico: non serve piu' il consenso dell'assistito."),
 (4,"chiaro",0,"Serve invece il consenso dell'assistito perche' i professionisti possano consultare il Fascicolo. Alimentazione automatica, consultazione con consenso: e' una confusione frequente, e la ritroverai nel riepilogo del modulo."),
 (4,"chiaro",0,"La persona puo' oscurare singoli documenti. E alcuni dati hanno tutele rafforzate: quelli sull'HIV, sull'interruzione di gravidanza, sulla violenza subita, sull'uso di sostanze."),
 (4,"chiaro",0,"C'e' la delega, che abbiamo appena visto. E la persona puo' conoscere gli accessi, cioe' sapere chi ha consultato i suoi dati: un punto che ritroviamo fra poco, quando parliamo di responsabilita'."),

 (5,"chiaro",0,"La ricetta dematerializzata, o elettronica. La prescrizione e' registrata nel sistema, con un codice NRE, il numero di ricetta elettronica, e un promemoria per il cittadino."),
 (5,"chiaro",0,"Vale per i farmaci e per le prestazioni specialistiche. Per prenotare c'e' il CUP, il centro unico di prenotazione. E sulla ricetta c'e' la classe di priorita', che i quiz chiedono spesso."),
 (5,"chiaro",0,"Le classi sono quattro. U, urgente, entro settantadue ore. B, breve, entro dieci giorni. D, differibile, entro trenta giorni per le visite e sessanta per gli accertamenti. P, programmata."),
 (5,"chiaro",0,"Le classi di priorita' sono definite dal Piano nazionale di governo delle liste d'attesa. Ricordale cosi': U settantadue ore, B dieci giorni, D trenta o sessanta, e infine P."),

 (6,"chiaro",0,"La cartella clinica elettronica: la documentazione clinica e infermieristica informatizzata, con la prescrizione e la somministrazione informatizzata della terapia."),
 (6,"chiaro",0,"Riduce gli errori, come hai visto nella lezione cinque punto quattro. Ogni registrazione e' tracciata: chi, che cosa, quando. E la cartella e' integrata con il laboratorio, la radiologia, la farmacia."),
 (6,"chiaro",0,"La documentazione elettronica ha lo stesso valore legale di quella cartacea, con tutto cio' che ne consegue per la responsabilita' professionale di chi la compila."),

 (7,"chiaro",0,"Le credenziali di accesso sono personali e non cedibili. Non si lavora mai con l'utenza di un collega: nemmeno solo per un attimo, nemmeno perche' il sistema e' lento."),
 (7,"chiaro",0,"Si fa il logout alla fine della sessione, e non si lascia il terminale aperto. E le password devono essere robuste, e restare riservate."),
 (7,"chiaro",0,"Ogni azione registrata con le tue credenziali e' attribuita a te. Una somministrazione registrata da un collega con il tuo nome e' un problema di responsabilita', e di sicurezza del paziente."),

 (8,"chiaro",0,"[serious] Il punto piu' importante della lezione: l'accesso giustificato. Si accede ai dati di un paziente solo se lo si ha in cura, oppure per finalita' di servizio."),
 (8,"chiaro",0,"Ogni accesso e' registrato, e puo' essere verificato anche a distanza di tempo. Non si consultano i dati di familiari, di colleghi, di conoscenti, di persone note."),
 (8,"chiaro",0,"E nemmeno i propri, attraverso gli applicativi aziendali. Le conseguenze sono serie: un illecito disciplinare, e le sanzioni del Garante per la protezione dei dati."),
 (8,"chiaro",0,"E un possibile rilievo penale. Per la giurisprudenza anche un dipendente autorizzato commette accesso abusivo a un sistema informatico, se entra per finalita' estranee al servizio."),

 (9,"chiaro",0,"Da distinguere dal Fascicolo e' il dossier sanitario aziendale: l'insieme dei dati sanitari della persona prodotti dalle strutture della stessa azienda, consultabile da chi la ha in cura."),
 (9,"chiaro",0,"Il dossier segue le regole del Garante: consenso, oscuramento, tracciamento degli accessi. Il Fascicolo, invece, raccoglie i dati provenienti da tutto il sistema sanitario."),

 (10,"chiaro",0,"La telemedicina, nelle forme che hai visto nella lezione undici punto sei: la televisita, il teleconsulto, il telemonitoraggio, la teleassistenza."),
 (10,"chiaro",0,"Si sviluppa su piattaforme regionali e nazionali, con gli investimenti del PNRR, soprattutto per il telemonitoraggio dei pazienti cronici: lo scompenso, la BPCO, il diabete."),
 (10,"chiaro",0,"E l'infermiere ha un ruolo centrale. Arruola i pazienti, li educa all'uso dei dispositivi, legge i dati, gestisce gli allarmi, e mantiene il contatto con il paziente."),

 (11,"chiaro",0,"La sicurezza informatica. Le aziende sanitarie sono bersaglio di attacchi informatici: il phishing, e i ransomware, che bloccano i sistemi."),
 (11,"chiaro",0,"Le regole: non aprire allegati o link sospetti, non usare chiavette o dispositivi personali sui terminali aziendali, segnalare le anomalie, conoscere le procedure di continuita', con i moduli cartacei di emergenza."),
 (11,"chiaro",0,"E non inviare dati sanitari con le app di messaggistica personali: una foto di una lesione mandata al medico con il telefono privato e' un trattamento di dati non sicuro."),

 (12,"chiaro",0,"[curious] Il caso d'esame. Un'infermiera scopre che una vicina di casa e' ricoverata in un altro reparto dello stesso ospedale, e apre la sua cartella elettronica per sapere come sta."),
 (12,"chiaro",0,"Che cosa ha fatto? Un accesso non giustificato, perche' non ha in cura quella paziente. E l'accesso resta registrato: la paziente puo' venirne a conoscenza."),
 (12,"chiaro",0,"Le conseguenze possono essere disciplinari, amministrative, con le sanzioni del Garante, e anche penali, per l'accesso abusivo a un sistema informatico."),
 (12,"chiaro",0,"[thoughtful] La curiosita', anche affettuosa, non e' una finalita' di cura. Se vuole notizie della vicina, le chiede alla persona stessa, o ai suoi familiari."),

 (13,"chiaro",0,"Tutto questo poggia sul GDPR, che hai visto nella lezione uno punto sette. I dati sanitari sono categorie particolari di dati, all'articolo nove, con tutele rafforzate."),
 (13,"chiaro",0,"Si trattano secondo i principi di liceita', minimizzazione, limitazione della finalita', integrita' e riservatezza. E a questi si aggiungono il segreto professionale e il segreto d'ufficio."),

 (14,"chiaro",0,"La tabella. Il Fascicolo, del duemiladodici, rafforzato con l'FSE due punto zero: referti, dimissioni, pronto soccorso, vaccinazioni, profilo sintetico. Alimentazione automatica, consenso alla consultazione."),
 (14,"chiaro",0,"Oscuramento, delega, conoscenza degli accessi. Sanita' km zero: Fascicolo, Ricette, Prenota Veloce. La ricetta dematerializzata, con l'NRE. Le priorita': U settantadue ore, B dieci giorni, D trenta o sessanta, e P."),
 (14,"chiaro",0,"La cartella elettronica. Le credenziali personali. L'accesso solo se in cura, e l'articolo seicentoquindici ter del codice penale. Il dossier sanitario, diverso dall'FSE. La telemedicina. La sicurezza informatica."),

 (15,"profondo",1.2,"[serious] La frase della lezione: ogni clic lascia una traccia. Si apre solo la cartella del paziente che si ha in cura."),

 (16,"chiaro",0,"[warm] Nella prossima lezione, l'ultima del modulo, ricomponiamo tutto il sistema veneto in una sola pagina, con il riepilogo e l'autovalutazione. A tra poco."),
]
CAPITOLI = {1:"Apertura",2:"Il Fascicolo Sanitario Elettronico",3:"Sanita' km zero",4:"I diritti del cittadino sul Fascicolo",5:"La ricetta dematerializzata e il CUP",
 6:"La cartella clinica elettronica",7:"Le credenziali",8:"L'accesso giustificato",9:"Il dossier sanitario aziendale",10:"La telemedicina",
 11:"La sicurezza informatica",12:"Il caso d'esame",13:"Il collegamento con il GDPR",14:"La tabella",15:"La frase della lezione",16:"Chiusura"}

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
