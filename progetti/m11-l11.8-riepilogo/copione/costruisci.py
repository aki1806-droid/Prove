# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Chiudiamo il modulo undici, il piu' vario del corso: dall'anziano fragile al neonato, dalla salute mentale al fine vita, dalla cronicita' al territorio."),
 (1,"chiaro",0,"Lo ricomponiamo con una mappa: per ogni persona, i bisogni chiave, gli strumenti, e il luogo in cui viene assistita. Sette lezioni, sette persone diverse, e una sola domanda: dove sta meglio, e chi se ne occupa?"),
 (1,"chiaro",0,"E' un ripasso: ritmo un po' piu' sostenuto, e le parole chiave che all'esame valgono punti. Tieni a portata di mano il quaderno."),

 (2,"chiaro",0,"L'anziano fragile. Fragilita' non e' eta'. Criteri di Fried: calo di peso, astenia, forza di presa, velocita' del cammino, attivita' fisica. Con tre o piu', fragile."),
 (2,"chiaro",0,"La valutazione multidimensionale, in sei dimensioni: clinica, funzionale, cognitiva, affettiva, nutrizionale, sociale. In Veneto, l'UVMD con la SVaMA. Le sindromi geriatriche, che si influenzano a vicenda."),
 (2,"chiaro",0,"Il delirium: esordio acuto, decorso fluttuante, attenzione compromessa. L'ipoattivo e' il meno riconosciuto. E la prevenzione e' non farmacologica: orientamento, occhiali, apparecchi, sonno, mobilizzazione."),
 (2,"chiaro",0,"La polifarmacoterapia, i criteri di Beers e la deprescrizione. E il paradosso del ricovero, che puo' far uscire l'anziano meno autonomo di come e' entrato."),

 (3,"chiaro",0,"La demenza. Alzheimer: la memoria recente. Corpi di Lewy: allucinazioni visive e ipersensibilita' agli antipsicotici. I disturbi del comportamento comunicano un bisogno."),
 (3,"chiaro",0,"Dolore, stipsi, ritenzione, infezione: la causa prima del farmaco. Non farmacologico come prima scelta. Non contraddire, rispondere all'emozione. L'ambiente protesico."),
 (3,"chiaro",0,"Antipsicotici con cautela, per il rischio di mortalita' e di ictus. Il caregiver, che e' anche lui una persona da assistere, e i ricoveri di sollievo. E in Veneto i CDCD, per la diagnosi e la presa in carico."),

 (4,"chiaro",0,"La salute mentale. Leggi centottanta e ottocentotrentatre', articoli dal trentatre' al trentacinque. TSO: tre requisiti insieme, e la pericolosita' non e' fra questi."),
 (4,"chiaro",0,"Proposta, convalida, ordinanza del sindaco, giudice tutelare, con le due finestre di quarantotto ore. Sette giorni, nell'SPDC. E l'ASO, l'accertamento senza ricovero."),
 (4,"chiaro",0,"La de-escalation, e le cause organiche dell'agitazione. Rischio suicidario: chiedere direttamente, perche' chiedere non aumenta il rischio. La Raccomandazione quattro."),
 (4,"chiaro",0,"Astinenza alcolica: delirium tremens a quarantotto, settantadue ore, e tiamina prima del glucosio. Le terapie sostitutive da continuare. E la rete: DSM, CSM, SerD."),

 (5,"chiaro",0,"L'area materno-infantile. Termine fra trentasette e quarantadue settimane, regola di Naegele. Preeclampsia dopo la ventesima settimana, con cefalea, disturbi visivi, dolore epigastrico."),
 (5,"chiaro",0,"Il magnesio, con riflessi, respiro e diuresi, e il calcio gluconato come antidoto. Placenta previa indolore, distacco doloroso. Il decubito laterale sinistro."),
 (5,"chiaro",0,"Allattamento esclusivo per sei mesi. Vitamina K e screening. Ittero sotto le ventiquattro ore: patologico. Niente aspirina nel bambino. E le scale del dolore per eta'."),

 (6,"chiaro",0,"Le cure palliative. Legge trentotto, con due reti, e cure palliative precoci. Dispnea: aria fresca e oppioidi. Rantolo: posizione, antisecretivi, niente aspirazione di routine."),
 (6,"chiaro",0,"La sedazione palliativa: sintomi refrattari, farmaci titolati, consenso, legge duecentodiciannove articolo due. Diversa dall'eutanasia per intenzione, mezzi ed esito."),
 (6,"chiaro",0,"Nutrizione e idratazione artificiali: trattamenti sanitari. I segni della morte imminente. L'ECG di venti minuti. La cura della salma, e il lutto, anche degli operatori."),

 (7,"chiaro",0,"La cronicita'. Il Piano nazionale del duemilasedici, e la medicina di iniziativa. I PDTA. Il Chronic Care Model, con sei componenti. L'aderenza: semplificare, e chiedere senza giudicare."),
 (7,"chiaro",0,"Le fasi di Prochaska, ricaduta compresa. Il colloquio motivazionale, con OARS e senza il riflesso di correzione. Health literacy e teach-back."),
 (7,"chiaro",0,"Il self-care in tre dimensioni: mantenimento, monitoraggio e gestione, quella che molti pazienti saltano. E la telemedicina nelle sue quattro forme."),

 (8,"chiaro",0,"Il territorio. DM settantasette del duemilaventidue. Casa della Comunita' hub ogni quaranta, cinquantamila abitanti. Infermiere di famiglia e comunita' ogni tremila."),
 (8,"chiaro",0,"Ospedale di Comunita', venti posti letto ogni centomila, a gestione infermieristica. COT ogni centomila. L'UCA. Il centosedici centodiciassette. ADI e SAD."),
 (8,"chiaro",0,"E in Veneto: l'UVMD con la SVaMA, porta d'accesso ai servizi. I Centri di Servizi, che altrove si chiamano RSA, e l'impegnativa di residenzialita', con la quota sanitaria regionale."),

 (9,"chiaro",0,"Ora la mappa dei servizi, da fotografare. L'acuzie: l'ospedale. Un bisogno non urgente: il centosedici centodiciassette, il medico di medicina generale, la Casa della Comunita'."),
 (9,"chiaro",0,"La cronicita': Casa della Comunita', infermiere di famiglia e comunita', PDTA, telemonitoraggio. Il recupero dopo un ricovero: l'Ospedale di Comunita'."),
 (9,"chiaro",0,"La non autosufficienza a casa: UVMD, ADI, SAD. La non autosufficienza non gestibile a casa: il Centro di Servizi, con l'impegnativa di residenzialita'."),
 (9,"chiaro",0,"La salute mentale: CSM e SPDC. Le dipendenze: il SerD. La gravidanza: consultorio e punto nascita. Il fine vita: cure palliative domiciliari e hospice."),
 (9,"profondo",1.2,"[serious] Ogni bisogno ha il suo luogo."),

 (10,"chiaro",0,"Le confusioni che costano piu' punti. Delirium e demenza non sono la stessa cosa: acuto e fluttuante il primo, insidioso e progressivo la seconda."),
 (10,"chiaro",0,"Nel TSO la pericolosita' non e' un requisito. E il provvedimento si notifica al giudice tutelare. Sedazione palliativa ed eutanasia sono diverse."),
 (10,"chiaro",0,"Ittero dopo le ventiquattro ore, fisiologico; prima, patologico. ADI dell'azienda sanitaria, con prestazioni sanitarie; SAD dei Comuni, con l'aiuto socio-assistenziale."),
 (10,"chiaro",0,"Il centosedici centodiciassette non e' il centododici. E l'Ospedale di Comunita' non e' un ospedale per acuti: e' un ricovero breve, a gestione infermieristica, per chi non puo' ancora tornare a casa."),

 (11,"chiaro",0,"I casi tipici. Un'anziana sonnolenta che a casa non era cosi': delirium ipoattivo. Una persona con demenza, agitata e con stipsi: la causa prima del sedativo."),
 (11,"chiaro",0,"Tremori e allucinazioni in seconda, terza giornata: astinenza alcolica. Un ittero a diciotto ore di vita: patologico, e si segnala subito. Un uomo con scompenso al terzo ricovero: aderenza, colloquio motivazionale, self-care."),
 (11,"chiaro",0,"Lo state facendo morire?: spiegare la sedazione palliativa, con calma e chiarezza. E l'anziano non autosufficiente alla dimissione: COT, UVMD, scelta del setting."),

 (12,"chiaro",0,"I fili con gli altri moduli. La CAM e la PAINAD con la lezione due punto tre. La contenzione con la tre punto uno. La disfagia con la tre punto tre. Il dolore con la tre punto sette e la cinque punto sei."),
 (12,"chiaro",0,"La legge duecentodiciannove con la uno punto sei. Gli stupefacenti con la cinque punto sette. Il PBLS e il parto con la dieci punto quattro."),
 (12,"chiaro",0,"La dimissione protetta con la nove punto sette. E il Servizio Socio Sanitario Veneto con il modulo tredici, dove ritroveremo UVMD, Centri di Servizi e Azienda Zero."),

 (13,"chiaro",0,"Come proseguire. Il test del modulo: trenta domande, soglia ventuno. E disegna a memoria la mappa dei servizi, senza guardare: se riesci a collocare ogni bisogno nel suo luogo, il modulo e' tuo."),
 (13,"chiaro",0,"Nel quaderno: la procedura del TSO con i tempi, gli standard del DM settantasette, le tabelle delirium, demenza, depressione e sedazione, eutanasia. E scrivi due casi: il delirium ipoattivo e la dimissione protetta."),

 (14,"profondo",1.2,"[serious] La persona giusta, nel posto giusto, al momento giusto."),
 (14,"chiaro",0,"Conoscere la rete dei servizi e' una competenza clinica. Perche' il setting sbagliato, un ricovero inutile, una dimissione senza supporto, e' esso stesso un rischio."),
 (14,"chiaro",0,"E l'infermiere e' spesso il primo a vedere che il posto non e' quello giusto: in reparto, a domicilio, al telefono della COT."),

 (15,"chiaro",0,"[warm] Nel prossimo modulo cambiamo prospettiva: l'organizzazione dei servizi sanitari, e la normativa nazionale sul Servizio Sanitario e sul pubblico impiego."),
 (15,"chiaro",0,"E la sicurezza sul lavoro, con il decreto legislativo ottantuno del duemilaotto: la salute di chi cura. Ci vediamo li'."),
]
CAPITOLI = {1:"Apertura",2:"L'anziano fragile",3:"La persona con demenza",4:"La salute mentale",5:"L'area materno-infantile",6:"Le cure palliative",
 7:"La cronicita'",8:"Il territorio",9:"La mappa dei servizi",10:"Le confusioni che costano piu' punti",11:"I casi tipici",12:"Il filo con gli altri moduli",
 13:"Come proseguire",14:"La frase del modulo",15:"Chiusura"}

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
