# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Il Servizio Sanitario Nazionale e' nato nel millenovecentosettantotto. Negli anni Novanta e' stato profondamente riformato, e quelle riforme hanno disegnato l'organizzazione in cui lavorerai."),
 (1,"chiaro",0,"Hanno introdotto le aziende sanitarie, il direttore generale, l'accreditamento, il distretto. E poi i LEA, i livelli essenziali di assistenza: il cuore di cio' che il sistema deve garantire a ogni cittadino."),

 (2,"chiaro",0,"La prima grande riforma e' il decreto legislativo cinquecentodue del millenovecentonovantadue, modificato l'anno dopo dal decreto legislativo cinquecentodiciassette del millenovecentonovantatre'."),
 (2,"profondo",1.2,"[serious] La parola chiave e' aziendalizzazione."),
 (2,"chiaro",0,"Le Unita' Sanitarie Locali diventano aziende, con personalita' giuridica pubblica e con autonomia organizzativa, amministrativa e gestionale. E' questo il senso della parola aziendalizzazione."),
 (2,"chiaro",0,"Anche i grandi ospedali possono diventare aziende a se': le aziende ospedaliere, autonome. Accanto all'azienda del territorio nasce cosi' l'azienda dell'ospedale."),
 (2,"chiaro",0,"Al vertice di ogni azienda c'e' il direttore generale, nominato dalla Regione. Lo affiancano due figure: il direttore sanitario e il direttore amministrativo."),
 (2,"chiaro",0,"Cresce il ruolo delle Regioni. E si avvia il pagamento delle prestazioni a tariffa, con i DRG, che vedremo nella lezione dodici punto quattro, dedicata al finanziamento."),

 (3,"chiaro",0,"La seconda tappa e' il decreto legislativo duecentoventinove del millenovecentonovantanove, la cosiddetta riforma Bindi. Introduce o rafforza sei elementi, che vediamo uno per volta."),
 (3,"chiaro",0,"Il primo e' il distretto, come articolazione territoriale dell'azienda. E' il luogo della continuita' assistenziale che hai visto nel modulo undici."),
 (3,"chiaro",0,"Il secondo, l'accreditamento istituzionale: le strutture pubbliche e private possono erogare prestazioni per il Servizio Sanitario Nazionale solo se possiedono i requisiti, e con accordi contrattuali."),
 (3,"chiaro",0,"Poi il rapporto di esclusivita' dei dirigenti sanitari. E l'integrazione socio-sanitaria: il sanitario e il sociale che lavorano insieme, sulla stessa persona."),
 (3,"chiaro",0,"I livelli essenziali di assistenza, i LEA, diventano il cardine del sistema. Li riprendiamo fra poco, perche' sono la seconda meta' di questa lezione."),
 (3,"chiaro",0,"E infine l'atto aziendale, un atto di diritto privato: il documento con cui ogni azienda definisce la propria organizzazione. Ci torneremo nella prossima lezione."),

 (4,"chiaro",0,"Le tappe in una riga, da ricordare con gli anni. Millenovecentosettantotto: con la legge ottocentotrentatre' nasce il Servizio Sanitario Nazionale."),
 (4,"chiaro",0,"Millenovecentonovantadue e novantatre': l'aziendalizzazione, con i decreti cinquecentodue e cinquecentodiciassette. Millenovecentonovantanove: distretto, accreditamento, esclusivita', LEA."),
 (4,"chiaro",0,"Duemilauno: la riforma del Titolo quinto, che fa della salute una materia concorrente fra Stato e Regioni. E' la sequenza che un commissario si aspetta di sentire."),

 (5,"chiaro",0,"I LEA, i livelli essenziali di assistenza: sono le prestazioni e i servizi che il Servizio Sanitario Nazionale e' tenuto a garantire a tutti i cittadini."),
 (5,"chiaro",0,"Gratuitamente, oppure con una quota di partecipazione, il ticket. E con le risorse pubbliche raccolte attraverso la fiscalita' generale."),
 (5,"chiaro",0,"Sono definiti a livello nazionale. Le Regioni possono garantire livelli ulteriori, ma con risorse proprie: il livello essenziale e' lo stesso per tutti, il resto si aggiunge sopra."),
 (5,"chiaro",0,"Sono la traduzione concreta dell'articolo trentadue della Costituzione, e del principio di uguaglianza della legge ottocentotrentatre'."),

 (6,"chiaro",0,"I LEA vigenti sono definiti dal DPCM del dodici gennaio duemiladiciassette, che ha sostituito quello del ventinove novembre duemilauno. Li organizza in tre grandi livelli."),
 (6,"chiaro",0,"Primo livello: prevenzione collettiva e sanita' pubblica. Vaccinazioni, screening, sicurezza alimentare, tutela della salute nei luoghi di lavoro."),
 (6,"chiaro",0,"Secondo livello: assistenza distrettuale. Medicina di base, farmaceutica, specialistica ambulatoriale, assistenza domiciliare, residenziale e semiresidenziale."),
 (6,"chiaro",0,"Terzo livello: assistenza ospedaliera. Pronto soccorso, ricovero ordinario e diurno, riabilitazione. Prevenzione, distretto, ospedale: tre parole per ricordarli."),
 (6,"chiaro",0,"Il DPCM comprende anche i nomenclatori, gli elenchi delle malattie rare e delle malattie croniche che danno diritto all'esenzione, e lo screening neonatale esteso della lezione undici punto quattro."),

 (7,"chiaro",0,"I LEA non sono fissi. Una Commissione nazionale ne propone l'aggiornamento, in base alle evidenze. Un passaggio importante e' arrivato alla fine del duemilaventiquattro."),
 (7,"chiaro",0,"Sono entrati in vigore i nuovi nomenclatori della specialistica ambulatoriale e dell'assistenza protesica, previsti dal DPCM del duemiladiciassette, con le relative tariffe."),
 (7,"chiaro",0,"La regola di studio: i LEA sono un elenco che cambia. Per il concorso conta il quadro generale, cioe' i tre livelli e il loro contenuto."),

 (8,"chiaro",0,"Come si verifica che i LEA siano davvero garantiti? Con il Nuovo Sistema di Garanzia, previsto dal decreto ministeriale del dodici marzo duemiladiciannove e applicato dal duemilaventi."),
 (8,"chiaro",0,"Ha sostituito la griglia LEA. Usa indicatori per prevenzione, distrettuale e ospedaliera: una Regione e' adempiente se raggiunge la soglia in tutte e tre. Il Veneto e' stabilmente fra le migliori."),

 (9,"chiaro",0,"Il ticket e' una quota di partecipazione alla spesa. Si applica soprattutto alla specialistica e alla diagnostica, in alcune Regioni anche alla farmaceutica."),
 (9,"chiaro",0,"E al pronto soccorso, per gli accessi a bassa priorita' non seguiti da ricovero. Le esenzioni sono previste per eta' e reddito, per malattie croniche e invalidanti, per malattie rare."),
 (9,"chiaro",0,"Per invalidita', per la gravidanza, e per le prestazioni di prevenzione come gli screening. Importi e regole sono definiti anche dalle Regioni, e cambiano: per l'esame contano i principi, non le cifre."),

 (10,"chiaro",0,"Un concetto che attraversa i LEA: l'appropriatezza. Una prestazione e' appropriata quando e' efficace e indicata per quel paziente: e' l'appropriatezza clinica."),
 (10,"chiaro",0,"E quando e' erogata nel setting giusto, senza consumare risorse inutili: e' l'appropriatezza organizzativa. Un ricovero per una prestazione che si puo' fare in ambulatorio e' inappropriato."),
 (10,"profondo",1.2,"[serious] I LEA garantiscono le prestazioni appropriate, non tutto cio' che e' tecnicamente possibile."),

 (11,"chiaro",0,"[curious] La domanda tipo: che cosa sono i LEA, da quale atto sono definiti, come si articolano? E come si verifica che siano garantiti?"),
 (11,"chiaro",0,"Sono le prestazioni che il sistema garantisce a tutti, gratis o con ticket. Li definisce il DPCM del dodici gennaio duemiladiciassette. Tre livelli. Li verifica il Nuovo Sistema di Garanzia. Quattro punti."),

 (12,"chiaro",0,"Le figure di vertice introdotte dalle riforme. Il direttore generale ha la rappresentanza legale e la responsabilita' della gestione, e nomina gli altri direttori."),
 (12,"chiaro",0,"Il direttore sanitario, responsabile del governo clinico e dell'organizzazione sanitaria. Il direttore amministrativo. E in Veneto, per l'integrazione socio-sanitaria, il direttore dei servizi socio-sanitari."),
 (12,"chiaro",0,"Gli organi dell'azienda sono tre: il direttore generale, il collegio sindacale, che controlla la regolarita' contabile, e il collegio di direzione. Li vedremo nella prossima lezione."),

 (13,"chiaro",0,"Perche' all'infermiere servono queste norme? Perche' l'accreditamento fissa i requisiti, anche di personale, che la tua struttura deve rispettare. E i LEA dicono che cosa il paziente ha diritto di ricevere."),
 (13,"chiaro",0,"Il distretto e' il luogo della continuita' assistenziale del modulo undici. E l'atto aziendale stabilisce dove si colloca il servizio delle professioni sanitarie."),

 (14,"chiaro",0,"In Veneto le riforme sono diventate Aziende ULSS, Aziende Ospedaliere Universitarie, un IRCCS e Azienda Zero. L'accreditamento e' regolato dalla legge regionale ventidue del duemiladue, che vedremo nel modulo tredici."),

 (15,"chiaro",0,"La tabella. Cinquecentodue e cinquecentodiciassette: aziendalizzazione, direttore generale, aziende ospedaliere. Duecentoventinove del novantanove: distretto, accreditamento, esclusivita', integrazione, atto aziendale."),
 (15,"chiaro",0,"LEA: DPCM del dodici gennaio duemiladiciassette, tre livelli. Nuovo Sistema di Garanzia: dodici marzo duemiladiciannove. Ticket ed esenzioni. Appropriatezza clinica e organizzativa."),

 (16,"chiaro",0,"[warm] Nella prossima lezione entriamo dentro l'azienda: l'atto aziendale, i dipartimenti, gli standard ospedalieri del DM settanta del duemilaquindici, i modelli organizzativi dell'assistenza infermieristica. A tra poco."),
]
CAPITOLI = {1:"Apertura",2:"La riforma del 1992-1993",3:"La riforma del 1999",4:"Le tappe in una riga",5:"I LEA: che cosa sono",6:"Il DPCM 12 gennaio 2017",
 7:"L'aggiornamento dei LEA",8:"Il Nuovo Sistema di Garanzia",9:"Ticket ed esenzioni",10:"L'appropriatezza",11:"Il caso d'esame",
 12:"La direzione aziendale",13:"Il filo con l'assistenza",14:"In Veneto",15:"La tabella",16:"Chiusura"}

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
