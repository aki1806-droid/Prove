# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Questo caso ha una particolarita': i pazienti sono quattro, tutti della stessa famiglia, e il nemico e' invisibile. L'intossicazione da monossido di carbonio e' frequente nei mesi freddi."),
 (1,"chiaro",0,"Insidiosa nei sintomi e ingannevole nei parametri, mette alla prova il triage di piu' pazienti, la fisiologia del trasporto dell'ossigeno e l'educazione alla prevenzione."),
 (1,"chiaro",0,"Ci servono le lezioni otto punto due, dieci punto uno, dieci punto sette, undici punto quattro e quattordici punto tre."),

 (2,"chiaro",0,"Lo scenario. Gennaio, ore otto. Il centodiciotto porta in pronto soccorso un'intera famiglia: il padre di quarantacinque anni, la madre di trentotto, e due figli di dodici e otto anni."),
 (2,"chiaro",0,"Da ieri sera hanno cefalea, nausea, vertigini. Stamattina la madre ha perso coscienza per pochi secondi in bagno, e il bambino di otto anni e' sonnolento e confuso."),
 (2,"chiaro",0,"In casa c'e' una caldaia vecchia, e il gatto e' stato trovato morto. Al saturimetro, tutti fra novantasette e novantanove. Fermati: che cosa sospetti, e perche' quelle saturazioni non ti tranquillizzano?"),

 (3,"chiaro",0,"[thoughtful] Il ragionamento. Sintomi simili in piu' persone che condividono lo stesso ambiente, nella stagione fredda, con una fonte di combustione e un animale domestico morto."),
 (3,"chiaro",0,"E' un'intossicazione da monossido di carbonio, fino a prova contraria. I sintomi sono aspecifici: la cefalea e' il piu' frequente, poi nausea, vertigini, astenia, confusione, sincope, dolore toracico."),
 (3,"chiaro",0,"Per questo l'intossicazione viene spesso scambiata per un'influenza, o per un'intossicazione alimentare. E le saturazioni normali non tranquillizzano, per un motivo preciso."),

 (4,"chiaro",0,"Perche' il saturimetro inganna. Il monossido si lega all'emoglobina con un'affinita' circa duecento-duecentocinquanta volte maggiore di quella dell'ossigeno, e forma la carbossiemoglobina."),
 (4,"chiaro",0,"Il saturimetro comune non la distingue dall'ossiemoglobina, e mostra un valore falsamente normale: e' uno dei limiti del saturimetro della lezione otto punto due."),
 (4,"chiaro",0,"In piu' sposta la curva di dissociazione a sinistra, come nella quattordici punto tre: l'ossigeno rimasto viene ceduto a fatica ai tessuti. Per misurare il problema serve la co-ossimetria, con l'emogas o dispositivi dedicati."),

 (5,"chiaro",0,"Il triage e le prime azioni. Tutti gli esposti vanno valutati, anche chi ha pochi sintomi. Le priorita' sono la madre, che ha perso coscienza, e il bambino di otto anni, che e' confuso."),
 (5,"chiaro",0,"L'ossigeno al cento per cento, con maschera con reservoir a dieci-quindici litri al minuto, si somministra subito a tutti i sintomatici, senza aspettare gli esami: e' il trattamento."),
 (5,"chiaro",0,"Poi parametri, GCS e glicemia. Un ECG, perche' il monossido puo' danneggiare il cuore. L'emogas con la carbossiemoglobina. E l'avviso al medico."),

 (6,"chiaro",0,"I risultati. Carbossiemoglobina: la madre ventotto per cento, il bambino di otto anni ventidue, il padre quindici, il figlio di dodici anni nove."),
 (6,"chiaro",0,"Nella popolazione i valori sono normalmente bassi, un po' piu' alti nei fumatori. Ma il livello non corrisponde perfettamente alla gravita', anche perche' scende con il tempo trascorso."),
 (6,"chiaro",0,"E con l'ossigeno ricevuto nel trasporto. Contano soprattutto i sintomi: la perdita di coscienza, i segni neurologici, il danno cardiaco. E nella donna in eta' fertile, un test di gravidanza: vediamo subito perche'."),

 (7,"chiaro",0,"Il trattamento. L'ossigeno al cento per cento normobarico riduce molto il tempo di eliminazione del monossido, rispetto all'aria."),
 (7,"chiaro",0,"L'ossigeno iperbarico, nella camera iperbarica, lo elimina ancora piu' rapidamente, e potrebbe ridurre i danni neurologici tardivi."),
 (7,"chiaro",0,"Le indicazioni le valuta il medico. Per esempio la perdita di coscienza, i segni neurologici, il danno cardiaco, i livelli molto elevati. E la gravidanza: l'emoglobina fetale lega il monossido ancora piu' avidamente."),
 (7,"chiaro",0,"La madre, che ha perso coscienza, e forse il bambino confuso, sono candidati alla valutazione per il trasferimento al centro di medicina iperbarica."),

 (8,"chiaro",0,"I bambini meritano un'attenzione particolare. Respirano piu' rapidamente, e possono intossicarsi prima e di piu' degli adulti, con sintomi vaghi: irritabilita', sonnolenza, vomito. E le maschere sono di misura pediatrica."),
 (8,"chiaro",0,"Si comunica in modo adatto all'eta', con un genitore o un familiare quando possibile. Se entrambi i genitori sono in trattamento, si individua un adulto di riferimento, e se serve si coinvolgono i servizi."),

 (9,"chiaro",0,"[serious] Le complicanze tardive. Giorni o settimane dopo un'apparente guarigione puo' comparire una sindrome neurologica tardiva: deficit di memoria e concentrazione, alterazioni della personalita', disturbi del movimento."),
 (9,"chiaro",0,"E possono esserci danni cardiaci, con aritmie o ischemia. Per questo e' previsto un follow-up neurologico, e alla dimissione si spiega chiaramente quali sintomi segnalare."),

 (10,"chiaro",0,"La casa e la prevenzione. La famiglia non deve rientrare finche' la fonte non e' stata verificata e messa in sicurezza, dai vigili del fuoco o dai tecnici."),
 (10,"chiaro",0,"L'educazione. La manutenzione periodica di caldaie, stufe e canne fumarie. I rilevatori di monossido, che sono economici e salvano vite. L'aerazione dei locali."),
 (10,"chiaro",0,"Mai bracieri, generatori o barbecue al chiuso. Mai motori accesi in garage chiusi. E attenzione agli altri appartamenti dello stesso edificio, che potrebbero essere coinvolti."),

 (11,"chiaro",0,"Un approfondimento organizzativo: piu' pazienti insieme. Quando arrivano dallo stesso evento, ognuno va valutato con il triage, dando priorita' ai piu' gravi."),
 (11,"chiaro",0,"L'identificazione corretta di ciascuno diventa critica: con quattro familiari con lo stesso cognome, il rischio di scambiare campioni e referti e' altissimo."),
 (11,"chiaro",0,"Un operatore di riferimento, una comunicazione coordinata con la famiglia, una documentazione separata e completa. Se i pazienti superano le risorse, le procedure per l'afflusso straordinario della lezione dieci punto sette."),

 (12,"chiaro",0,"Gli errori da evitare. Fidarsi della saturimetria. Attribuire i sintomi all'influenza. Aspettare gli esami per dare l'ossigeno. Valutare solo chi ha sintomi gravi."),
 (12,"chiaro",0,"Scambiare i campioni di familiari con lo stesso cognome. Dimenticare il test di gravidanza. Dimettere senza parlare di prevenzione, di rilevatori e di verifica della casa."),

 (13,"chiaro",0,"[curious] Le domande d'orale. Prima: perche' la saturimetria non e' affidabile? Perche' il saturimetro comune non distingue la carbossiemoglobina dall'ossiemoglobina, e mostra valori falsamente normali."),
 (13,"chiaro",0,"Serve la co-ossimetria. Seconda: il trattamento? Ossigeno al cento per cento con maschera con reservoir, il prima possibile, e la valutazione per l'ossigeno iperbarico."),
 (13,"chiaro",0,"In caso di perdita di coscienza, segni neurologici, danno cardiaco, gravidanza o livelli molto elevati. Con un follow-up per i danni tardivi."),
 (13,"chiaro",0,"Terza: la prevenzione? Manutenzione di caldaie e stufe, rilevatori di monossido, aerazione. Niente bracieri, generatori o motori in ambienti chiusi."),

 (14,"chiaro",0,"La risposta modello. Quattro familiari esposti nella stessa abitazione, in inverno: cefalea, nausea, vertigini, una sincope, confusione in un bambino, saturimetria normale. Sospetta intossicazione da monossido."),
 (14,"chiaro",0,"Valuto tutti gli esposti, con priorita' alla madre e al bambino. Somministro subito ossigeno al cento per cento con maschera con reservoir a tutti i sintomatici."),
 (14,"chiaro",0,"Rilevo parametri, GCS, glicemia; eseguo ECG ed emogas con carbossiemoglobina, e il test di gravidanza; avviso il medico. Garantisco la corretta identificazione di ciascuno."),
 (14,"chiaro",0,"Collaboro alla valutazione per l'ossigeno iperbarico e al trasferimento. Assicuro un adulto di riferimento per i bambini. Alla dimissione informo sui sintomi tardivi, verifico la casa ed educo alla prevenzione."),

 (15,"chiaro",0,"I collegamenti. L'ossigeno e i limiti del saturimetro con la otto punto due, il triage con la dieci punto uno, le intossicazioni con la dieci punto sette."),
 (15,"chiaro",0,"La pediatria con la undici punto quattro, la curva di dissociazione con la quattordici punto tre, e l'identificazione del paziente con la due punto sei."),

 (16,"chiaro",0,"Un'ultima riflessione, sul ruolo di comunita' dell'infermiere. Molte intossicazioni da monossido avvengono in situazioni di fragilita' sociale: abitazioni precarie, stufe di fortuna, la manutenzione che non si puo' pagare."),
 (16,"chiaro",0,"L'infermiere e' un educatore alla salute anche fuori dall'ospedale. Con i servizi territoriali e con l'infermiere di famiglia e comunita', puo' intercettare queste situazioni prima che diventino emergenze."),

 (17,"profondo",1.2,"[serious] La frase del caso: il monossido non si vede, non ha odore, e il saturimetro non lo legge. L'unico strumento che lo rivela per primo e' il ragionamento."),

 (18,"chiaro",0,"[warm] Nella prossima lezione entriamo in terapia intensiva: un paziente intubato e ventilato, il rischio di polmonite associata alla ventilazione, la sedazione, il delirium, e una famiglia fuori dalla porta. A tra poco."),
]
CAPITOLI = {1:"Apertura",2:"Lo scenario",3:"Il ragionamento",4:"Perche' il saturimetro inganna",
 5:"Il triage e le prime azioni",6:"I risultati e la loro lettura",7:"Ossigeno normobarico e camera iperbarica",
 8:"I bambini",9:"Le complicanze tardive",10:"La casa e la prevenzione",11:"Piu' pazienti insieme",
 12:"Gli errori da evitare",13:"Le domande d'orale",14:"La risposta modello",15:"I collegamenti",
 16:"Il ruolo di comunita'",17:"La frase del caso",18:"Chiusura"}

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
