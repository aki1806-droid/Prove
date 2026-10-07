# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Chiudiamo il modulo dedicato al Veneto con una mappa del sistema in una pagina. E' lo schema da avere in testa all'orale, e lo costruiamo un pezzo alla volta."),
 (1,"chiaro",0,"Se ti chiedono di un servizio, devi sapere tre cose: in quale parte del sistema si colloca, chi lo governa, e come ci si accede."),

 (2,"chiaro",0,"Partiamo dal vertice. La Regione, con la Giunta e il Consiglio regionale, che definiscono indirizzi e programmazione. E l'Area Sanita' e Sociale, che traduce gli indirizzi in atti."),
 (2,"chiaro",0,"La programmazione. Il Piano Socio Sanitario Regionale duemiladiciannove, duemilaventitre', approvato con la legge regionale quarantotto del duemiladiciotto, ancora riferimento in attesa del nuovo piano."),
 (2,"chiaro",0,"E le schede di dotazione, ospedaliera e territoriale, approvate con delibera di Giunta regionale: per ogni ospedale e per ogni territorio stabiliscono le funzioni e i posti letto."),
 (2,"chiaro",0,"Poi Azienda Zero, istituita dalla legge regionale diciannove del duemilasedici: l'ente di governance della sanita' regionale, operativo dal duemiladiciassette."),
 (2,"chiaro",0,"Le sue funzioni centralizzate: la GSA, la gestione sanitaria accentrata. La CRAV, per gli acquisti. I concorsi. I sistemi informativi e il Fascicolo. La formazione, gli affari legali, l'epidemiologia e i registri."),

 (3,"chiaro",0,"Le aziende. Le nove ULSS, nate il primo gennaio duemiladiciassette. Uno, Dolomiti. Due, Marca Trevigiana. Tre, Serenissima. Quattro, Veneto Orientale. Cinque, Polesana."),
 (3,"chiaro",0,"Sei, Euganea. Sette, Pedemontana. Otto, Berica. Nove, Scaligera. E i territori delle vecchie aziende sono diventati i distretti delle nuove."),
 (3,"chiaro",0,"Accanto alle ULSS, le due aziende ospedaliere universitarie: l'Azienda Ospedale-Universita' di Padova e l'Azienda Ospedaliera Universitaria Integrata di Verona."),
 (3,"chiaro",0,"Lo IOV, l'Istituto Oncologico Veneto, che e' un IRCCS, un Istituto di Ricovero e Cura a Carattere Scientifico. E le strutture private accreditate, integrate nella rete."),

 (4,"chiaro",0,"L'ospedale e l'emergenza. Il modello e' hub and spoke: gli hub, con le alte specialita'; e gli spoke, gli ospedali di rete, collegati agli hub per i casi complessi."),
 (4,"chiaro",0,"Il SUEM centodiciotto, il Servizio Urgenza Emergenza Medica: sette centrali operative provinciali, il dispatch infermieristico che attribuisce il codice di priorita', e l'elisoccorso."),
 (4,"chiaro",0,"Sopra le centrali, il coordinamento regionale dell'emergenza urgenza, il CREU. E il NUE centododici, il Numero Unico di Emergenza europeo, in attuazione."),
 (4,"chiaro",0,"Le reti tempo-dipendenti. Per l'infarto, l'ECG teletrasmesso e, se e' uno STEMI, l'accesso diretto all'emodinamica. Per l'ictus, gli hub per la trombectomia. E la rete trauma."),
 (4,"chiaro",0,"Poi le reti cliniche: la Rete Oncologica Veneta, la ROV. I punti nascita, i trapianti, le malattie rare, la terapia del dolore e le cure palliative. Non l'ospedale piu' vicino, ma quello giusto."),

 (5,"chiaro",0,"Il territorio. Il distretto socio-sanitario, articolazione dell'ULSS: assistenza primaria, specialistica, ADI, consultori, residenzialita', e l'integrazione con i Comuni."),
 (5,"chiaro",0,"Le medicine di gruppo integrate, il modello veneto: medici di famiglia in una sede comune, con infermieri e apertura estesa. Accanto, le forme nazionali: le AFT e le UCCP."),
 (5,"chiaro",0,"Le cure intermedie, fra ospedale e domicilio: gli Ospedali di Comunita', le Unita' Riabilitative Territoriali, gli hospice. Per chi non ha piu' bisogno dell'ospedale, ma non puo' ancora tornare a casa."),
 (5,"chiaro",0,"Il DM settantasette in Veneto. Le Case della Comunita', con le linee di indirizzo regionali del duemilaventisei. Le COT, una ogni centomila abitanti. L'infermiere di famiglia e comunita', uno ogni tremila."),
 (5,"chiaro",0,"La continuita' assistenziale, l'ex guardia medica, e il centosedici centodiciassette per le cure non urgenti. L'ADI, con le cure palliative domiciliari. La stratificazione con l'ACG, e la medicina di iniziativa."),

 (6,"chiaro",0,"La non autosufficienza. Il principio e' la porta unica: l'UVMD, l'Unita' di Valutazione Multidimensionale Distrettuale, con il direttore di distretto, il medico di famiglia e l'assistente sociale del Comune."),
 (6,"chiaro",0,"Gli strumenti: la SVaMA, la scheda di valutazione multidimensionale dell'anziano, e la SVaMDi per la disabilita'. Restituiscono un profilo di autonomia e di bisogno, uguale in tutta la regione."),
 (6,"chiaro",0,"La domiciliarita' viene prima: l'ADI, il SAD dei Comuni, e l'impegnativa di cura domiciliare, un contributo per chi assiste a casa una persona non autosufficiente. Poi i centri diurni e i ricoveri di sollievo."),
 (6,"chiaro",0,"I Centri di Servizi, le strutture residenziali per anziani non autosufficienti. L'impegnativa di residenzialita' copre la quota sanitaria; la quota alberghiera resta a carico della persona o della famiglia."),
 (6,"chiaro",0,"Per ogni ospite, il PAI, il Piano Assistenziale Individualizzato. E la regola da ricordare per tutta la rete: prima si valuta il bisogno, poi si sceglie il servizio."),

 (7,"chiaro",0,"Garanzie e prevenzione. La legge regionale ventidue del duemiladue: autorizzazione e accreditamento delle strutture sanitarie, socio-sanitarie e sociali, pubbliche e private."),
 (7,"chiaro",0,"Le fasi: l'autorizzazione alla realizzazione, poi all'esercizio, con i requisiti minimi. L'accreditamento istituzionale, con i requisiti ulteriori, per lavorare per conto del servizio regionale. Poi gli accordi contrattuali."),
 (7,"chiaro",0,"Il Dipartimento di Prevenzione delle ULSS: il SISP, igiene e sanita' pubblica; il SIAN, igiene degli alimenti e della nutrizione; lo SPISAL, la sicurezza nei luoghi di lavoro; e i servizi veterinari."),
 (7,"chiaro",0,"Il Piano Regionale della Prevenzione. I tre screening, gratuiti e con invito attivo: mammella, cervice, colon-retto. E in Veneto il colon-retto e' esteso anche alla fascia dai settanta ai settantaquattro anni."),
 (7,"chiaro",0,"Le vaccinazioni, nei centri vaccinali delle ULSS: per i minori, dieci obbligatorie secondo la legge centodiciannove del duemiladiciassette. E il Registro Tumori, oggi in Azienda Zero."),

 (8,"chiaro",0,"La sanita' digitale. Il Fascicolo Sanitario Elettronico, e Sanita' chilometro zero, il portale e le app della Regione: Fascicolo, Ricette, Prenota Veloce. Si accede con SPID o con la CIE."),
 (8,"chiaro",0,"I diritti del cittadino: il consenso alla consultazione da parte dei professionisti, l'oscuramento di singoli documenti, e la delega a un'altra persona."),
 (8,"chiaro",0,"La ricetta dematerializzata, e le classi di priorita'. U, urgente, settantadue ore. B, breve, dieci giorni. D, differibile, trenta giorni per le visite e sessanta per gli accertamenti. P, programmata."),
 (8,"chiaro",0,"La cartella elettronica, con credenziali personali e non cedibili. E soprattutto: si accede ai dati solo se si ha in cura il paziente, perche' ogni accesso e' registrato. Infine, la telemedicina."),

 (9,"chiaro",0,"[thoughtful] Le confusioni che costano piu' punti. Centri di Servizi e' il nome veneto delle RSA. E l'impegnativa di residenzialita' copre la quota sanitaria, non la retta alberghiera."),
 (9,"chiaro",0,"Azienda Zero non eroga prestazioni ai pazienti: rende possibile che le altre aziende li curino meglio. E ULSS ha la S di socio: Unita' Locale Socio Sanitaria, non ASL."),
 (9,"chiaro",0,"Da ventuno a nove ULSS, nel duemiladiciassette. E l'alimentazione del Fascicolo e' automatica, mentre la consultazione richiede il consenso della persona."),

 (10,"chiaro",0,"[curious] Le domande d'orale piu' probabili. Che cos'e' Azienda Zero, e quali funzioni svolge. Come e' organizzato il sistema veneto. Che cosa sono i Centri di Servizi, e come si accede."),
 (10,"chiaro",0,"UVMD e SVaMA. Come funziona la rete per l'infarto o per l'ictus. Le medicine di gruppo integrate. L'infermiere di famiglia e comunita'. L'accesso al Fascicolo, e le responsabilita'."),
 (10,"chiaro",0,"Sono otto domande. Prepara per ciascuna una risposta di un minuto, con la mappa in testa: dove si colloca il servizio, chi lo governa, come ci si accede."),

 (11,"chiaro",0,"Come proseguire. Il test del modulo: trenta domande, soglia ventuno. Poi disegna a memoria la mappa del sistema veneto, e leggi l'atto aziendale dell'azienda in cui vorresti lavorare."),
 (11,"chiaro",0,"Sfoglia la Relazione Socio Sanitaria piu' recente. E nelle settimane prima della prova verifica le novita': un nuovo piano socio-sanitario, l'attivazione delle Case della Comunita' e del NUE centododici."),

 (12,"chiaro",0,"Un consiglio per l'orale. La risposta che fa la differenza non si ferma a che cos'e', ma arriva a come lo uso da infermiere."),
 (12,"chiaro",0,"Per esempio: le COT coordinano le transizioni fra setting. Quando dimetto un paziente fragile, segnalo il caso alla COT per organizzare una dimissione protetta. E' la stessa informazione, detta da un professionista."),

 (13,"profondo",1.2,"[serious] Conoscere il sistema veneto significa sapere dove mandare una persona, e come accompagnarla."),

 (14,"chiaro",0,"[warm] Nel prossimo modulo torniamo alle basi: anatomia, fisiologia e fisiopatologia degli apparati, la semeiotica e i valori di laboratorio."),
 (14,"chiaro",0,"E' il fondamento scientifico di tutto cio' che abbiamo studiato. Ci vediamo li'."),
]
CAPITOLI = {1:"Apertura",2:"Il vertice",3:"Le aziende",4:"L'ospedale e l'emergenza",5:"Il territorio",6:"La non autosufficienza",
 7:"Garanzie e prevenzione",8:"La sanita' digitale",9:"Le confusioni che costano piu' punti",10:"Le domande d'orale",
 11:"Come proseguire",12:"La risposta che fa la differenza",13:"La frase del modulo",14:"Chiusura"}

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
