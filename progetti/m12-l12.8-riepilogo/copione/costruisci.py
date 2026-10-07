# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Chiudiamo il modulo normativo con lo strumento che ti avevo promesso nella prima lezione: la tabella a tre colonne, fonte, contenuto, anno."),
 (1,"chiaro",0,"E' il modo piu' efficace per memorizzare le norme, ed e' spesso il modo in cui sono costruite le domande a risposta multipla: un numero, un anno, un contenuto da abbinare."),

 (2,"chiaro",0,"La Costituzione, del millenovecentoquarantotto. Articolo due, la solidarieta'. Articolo tre, l'uguaglianza. Articolo tredici, la liberta' personale, che ritroviamo nella contenzione."),
 (2,"chiaro",0,"Articolo trentadue: la salute come fondamentale diritto dell'individuo e interesse della collettivita', cure gratuite agli indigenti, e trattamenti obbligatori solo per legge, nel rispetto della persona umana."),
 (2,"chiaro",0,"Sono le due anime dell'articolo: la liberta' di scegliere e di rifiutare le cure, e i trattamenti imposti per legge, come il TSO o le vaccinazioni obbligatorie. E' la riserva di legge."),
 (2,"chiaro",0,"Articolo novantasette: buon andamento, imparzialita', e accesso agli impieghi pubblici mediante concorso. Articolo centodiciassette: il riparto delle competenze fra Stato e Regioni."),
 (2,"chiaro",0,"La legge costituzionale tre del duemilauno ha riformato il Titolo quinto: la salute e' materia concorrente, e la determinazione dei LEA spetta allo Stato, in via esclusiva."),

 (3,"chiaro",0,"L'ordinamento del SSN. Legge ottocentotrentatre' del settantotto: l'istituzione, con i tre principi da dire insieme, universalita', uguaglianza, globalita'. E agli articoli dal trentatre' al trentacinque, il TSO."),
 (3,"chiaro",0,"Decreti legislativi cinquecentodue del novantadue e cinquecentodiciassette del novantatre': l'aziendalizzazione. Le USL diventano aziende, con il direttore generale al vertice."),
 (3,"chiaro",0,"Decreto legislativo duecentoventinove del novantanove, la riforma Bindi: il distretto, l'accreditamento istituzionale, l'esclusivita' dei dirigenti sanitari, l'atto aziendale."),
 (3,"chiaro",0,"DPCM del dodici gennaio duemiladiciassette: i LEA in tre livelli. Prevenzione collettiva e sanita' pubblica, assistenza distrettuale, assistenza ospedaliera."),
 (3,"chiaro",0,"DM del dodici marzo duemiladiciannove: il Nuovo Sistema di Garanzia, che verifica i LEA nelle tre aree. E gli standard: DM settanta del duemilaquindici per l'ospedale, DM settantasette del duemilaventidue per il territorio."),

 (4,"chiaro",0,"Le professioni, un richiamo dal modulo uno. DM settecentotrentanove del novantaquattro: il profilo dell'infermiere. Legge quarantadue del novantanove: l'abolizione del mansionario."),
 (4,"chiaro",0,"Duecentocinquantuno del duemila: autonomia e dirigenza. Quarantatre' del duemilasei: articolazione delle funzioni. Legge tre del duemiladiciotto: gli Ordini delle professioni sanitarie."),
 (4,"chiaro",0,"Ventiquattro del duemiladiciassette: sicurezza delle cure e responsabilita'. Duecentodiciannove del duemiladiciassette: consenso e DAT. Trentotto del duemiladieci: cure palliative e terapia del dolore."),

 (5,"chiaro",0,"L'economia. Fiscalita' generale, e fabbisogno sanitario nazionale standard, ripartito per popolazione pesata. Decreto sessantotto del duemilaundici: i costi standard, con le regioni benchmark."),
 (5,"chiaro",0,"I DRG classificano i ricoveri per consumo di risorse, dai dati della SDO, ciascuno con la sua tariffa. Spingono a ridurre la degenza media, ma con il rischio di dimissioni precoci."),
 (5,"chiaro",0,"Il budget, negoziato con ogni struttura, e il controllo di gestione. I tetti di spesa farmaceutica, con il payback. I piani di rientro per le Regioni in disavanzo."),
 (5,"chiaro",0,"Il PNRR, Missione sei, con due componenti: le reti di prossimita' per il territorio, e innovazione, ricerca e digitalizzazione. Finanzia soprattutto investimenti, non personale."),

 (6,"chiaro",0,"Il lavoro. Decreto centosessantacinque del duemilauno, il pubblico impiego: l'articolo cinquantatre' sulle incompatibilita' e, dal cinquantacinque in poi, la disciplina."),
 (6,"chiaro",0,"I due CCNL del Comparto Sanita'. Il duemiladiciannove, duemilaventuno, con le aree. Il duemilaventidue, duemilaventiquattro, con l'assistente infermiere e le altre novita'."),
 (6,"chiaro",0,"Le altre novita' dell'ultimo contratto: l'elevata qualificazione ampliata, le ferie a ore, la settimana su quattro giorni, il patrocinio legale per chi subisce un'aggressione."),
 (6,"chiaro",0,"Decreto sessantasei del duemilatre': undici ore di riposo consecutive ogni ventiquattro, ventiquattro ore di riposo settimanale, quarantotto ore di durata media massima."),
 (6,"chiaro",0,"Il codice di comportamento: DPR sessantadue del duemilatredici, e ottantuno del duemilaventitre'. Legge centonovanta del duemiladodici: anticorruzione. Decreto trentatre' del duemilatredici: trasparenza."),
 (6,"chiaro",0,"Decreto ventiquattro del duemilaventitre': il whistleblowing, la tutela di chi segnala illeciti. Legge centotredici del duemilaventi: le aggressioni al personale sanitario."),

 (7,"chiaro",0,"La sicurezza. Decreto ottantuno del duemilaotto. Il datore di lavoro ha due obblighi non delegabili: il DVR e la nomina dell'RSPP. Il preposto, rafforzato nel duemilaventuno: interviene e, se c'e' pericolo, interrompe."),
 (7,"chiaro",0,"Il medico competente, con la sorveglianza sanitaria. L'RLS, eletto dai lavoratori. Il giudizio di idoneita', e il ricorso all'organo di vigilanza entro trenta giorni."),
 (7,"chiaro",0,"I rischi, titolo per titolo. Titolo sesto, la movimentazione dei pazienti, con l'indice MAPO. Titolo nono, il chimico. Titolo decimo, il biologico. Decimo bis, i taglienti."),
 (7,"chiaro",0,"Decreto centouno del duemilaventi: le radiazioni ionizzanti, con tempo, distanza e schermature. Articolo ventotto: lo stress lavoro-correlato, da valutare nel DVR."),

 (8,"chiaro",0,"La qualita'. Donabedian: struttura, processo, esito. Il ciclo PDCA, per il miglioramento continuo. Indicatori e standard. E il Programma Nazionale Esiti, dell'AGENAS."),
 (8,"chiaro",0,"Donabedian sulle lesioni da pressione. Struttura: le superfici antidecubito. Processo: quanti pazienti valutati con la Braden all'ingresso. Esito: l'incidenza di nuove lesioni."),
 (8,"chiaro",0,"Autorizzazione, accreditamento istituzionale, accreditamento all'eccellenza e ISO: tre cose diverse. E il governo clinico, con l'audit e l'HTA."),

 (9,"chiaro",0,"[thoughtful] Le confusioni che costano piu' punti. Il decreto legislativo, su delega del Parlamento, e il decreto-legge, per necessita' e urgenza, da convertire entro sessanta giorni."),
 (9,"chiaro",0,"Il cinquecentodue, l'aziendalizzazione, e il duecentoventinove, distretto e accreditamento. Il DM settanta per l'ospedale, il settantasette per il territorio. L'autorizzazione e l'accreditamento."),
 (9,"chiaro",0,"Il dirigente, che organizza, e il preposto, che vigila. L'RSPP, nominato, e l'RLS, eletto. L'indicatore di processo, come si lavora, e quello di esito, il risultato di salute."),

 (10,"chiaro",0,"[curious] Le domande d'orale piu' probabili. L'articolo trentadue e i trattamenti obbligatori. I principi della ottocentotrentatre'. Che cosa sono i LEA. Le figure del decreto ottantuno, e il preposto."),
 (10,"chiaro",0,"Primary nursing e modello per compiti. Struttura, processo, esito. I DRG. Il codice di comportamento e i social. Preparane una risposta di un minuto ciascuna."),

 (11,"chiaro",0,"Il ponte verso il prossimo modulo. Il Titolo quinto affida a ogni Regione l'organizzazione del proprio servizio, e il Veneto ha costruito un sistema con caratteristiche proprie."),
 (11,"chiaro",0,"La legge regionale diciannove del duemilasedici, Azienda Zero, le nove ULSS, le schede di dotazione, l'UVMD con la SVaMA, la legge regionale ventidue del duemiladue."),
 (11,"chiaro",0,"Il modulo tredici traduce tutto questo modulo nel contesto in cui lavorerai."),

 (12,"chiaro",0,"Come proseguire. Il test del modulo: trenta domande, soglia ventuno. Completa nel quaderno la tabella fonte, contenuto, anno. E prepara delle flashcard: numero e anno da una parte, contenuto dall'altra."),
 (12,"chiaro",0,"Nelle settimane prima della prova verifica le novita', come il rinnovo contrattuale duemilaventicinque, duemilaventisette, o gli aggiornamenti dei LEA."),

 (13,"chiaro",0,"Un metodo per i quiz normativi. Leggi tutte le opzioni. Attenzione alle parole assolute, sempre, mai, esclusivamente: spesso indicano l'opzione sbagliata."),
 (13,"chiaro",0,"Quando non ricordi il numero, ragiona per principi: una legge sul consenso non puo' prevedere che l'infermiere decida al posto del paziente. E se ci sono penalita', non tirare a indovinare."),

 (14,"profondo",1.2,"[serious] Conoscere il sistema e' parte della competenza professionale."),
 (14,"chiaro",0,"Un infermiere che sa come funziona la sua organizzazione sa anche a chi rivolgersi, che cosa puo' chiedere, e che cosa deve garantire."),

 (15,"chiaro",0,"[warm] Nel prossimo modulo entriamo nel Servizio Socio Sanitario del Veneto: l'assetto regionale, Azienda Zero, la rete ospedaliera e territoriale, la non autosufficienza, la prevenzione e la sanita' digitale."),
 (15,"chiaro",0,"E' il modulo che piu' distingue chi si prepara per questo concorso. Ci vediamo li'."),
]
CAPITOLI = {1:"Apertura",2:"La Costituzione",3:"L'ordinamento del SSN",4:"Le professioni",5:"L'economia",6:"Il lavoro",
 7:"La sicurezza",8:"La qualita'",9:"Le confusioni che costano piu' punti",10:"Le domande d'orale",11:"Il ponte verso il Modulo 13",
 12:"Come proseguire",13:"Il metodo per i quiz normativi",14:"La frase del modulo",15:"Chiusura"}

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
