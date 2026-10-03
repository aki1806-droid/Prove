# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Ogni chirurgia specialistica ha le sue attenzioni specifiche, che si aggiungono all'assistenza perioperatoria generale: tutto quello che abbiamo visto finora vale, e qui si aggiunge il resto."),
 (1,"chiaro",0,"Le vediamo una per una, puntando su cio' che i concorsi chiedono piu' spesso: la protesi d'anca e le sue precauzioni, i gessi e la sindrome compartimentale, e alcune complicanze caratteristiche di altre chirurgie."),

 (2,"chiaro",0,"La protesi d'anca. Nelle prime settimane il rischio principale e' la lussazione: la testa della protesi esce dalla sua sede."),
 (2,"chiaro",0,"Le precauzioni dipendono dall'accesso chirurgico, e per l'accesso posteriore, il piu' classico nei manuali, sono tre."),
 (2,"chiaro",0,"Niente flessione dell'anca oltre i novanta gradi: quindi sedie alte e rialzo per il water, niente sedie basse ne' chinarsi per allacciare le scarpe."),
 (2,"chiaro",0,"Niente adduzione oltre la linea mediana: per questo, a letto, si usa un cuscino abduttore fra le gambe. Niente intrarotazione. E non si accavallano le gambe."),

 (3,"chiaro",0,"I segni di lussazione: dolore improvviso, arto accorciato e ruotato, impossibilita' di muoverlo, spesso dopo un movimento scorretto o una torsione. Si avvisa subito."),
 (3,"chiaro",0,"Per il resto: mobilizzazione precoce, insieme al fisioterapista, con il carico consentito dal chirurgo; prevenzione delle cadute."),
 (3,"chiaro",0,"E profilassi antitrombotica, perche' la chirurgia protesica dell'arto inferiore e' fra le piu' a rischio, come abbiamo visto nel caso della lezione precedente."),

 (4,"chiaro",0,"La protesi di ginocchio: mobilizzazione precoce, recupero progressivo della flessione, ghiaccio, e soprattutto un controllo del dolore che permetta la riabilitazione, perche' il ginocchio protesico e' molto doloroso."),
 (4,"chiaro",0,"La frattura di femore nell'anziano: l'intervento entro quarantotto ore dall'arrivo in ospedale e' un indicatore di qualita' monitorato a livello nazionale, perche' il ritardo aumenta mortalita' e complicanze."),
 (4,"chiaro",0,"E' un paziente ad alto rischio di delirium, lesioni da pressione e malnutrizione, e beneficia di un approccio ortogeriatrico, condiviso fra ortopedico e geriatra."),

 (5,"chiaro",0,"Il gesso. L'attivita' principale e' il controllo neurovascolare dell'arto, ripetuto: colorito, temperatura, polso, riempimento capillare, sensibilita', motilita' delle dita. Si solleva l'arto per ridurre l'edema."),
 (5,"chiaro",0,"Il gesso fresco non si copre, per farlo asciugare, e si maneggia con il palmo della mano, non con le dita, che lascerebbero impronte e punti di pressione interni."),
 (5,"chiaro",0,"Non si infila nulla sotto il gesso per grattarsi. E si segnalano dolore, odore, secrezioni, sensazione di gesso troppo stretto."),

 (6,"chiaro",0,"La sindrome compartimentale, l'emergenza che i concorsi chiedono. Dopo una frattura, un intervento o sotto un gesso, la pressione in un compartimento muscolare chiuso aumenta fino a bloccare la circolazione."),
 (6,"chiaro",0,"Il segno precoce e piu' importante e' un dolore sproporzionato rispetto alla lesione, che aumenta con lo stiramento passivo dei muscoli, per esempio estendendo passivamente le dita. Poi parestesie, pallore, deficit motorio."),
 (6,"chiaro",0,"L'assenza del polso e' un segno tardivo: aspettarlo significa arrivare tardi."),
 (6,"profondo",1.2,"[serious] L'assenza del polso e' un segno tardivo."),
 (6,"chiaro",0,"E' un'emergenza: si avvisa subito, e si allenta o si apre il gesso secondo indicazione. In questo caso l'arto non si solleva oltre il livello del cuore, perche' ridurrebbe ulteriormente la perfusione."),

 (7,"chiaro",0,"Le trazioni. I pesi devono pendere liberi, mai appoggiati a terra o al letto, e le corde scorrere libere nelle carrucole, altrimenti la trazione non agisce."),
 (7,"chiaro",0,"Si mantiene l'allineamento del corpo, e i pesi non si tolgono senza indicazione, nemmeno per l'igiene: un peso sollevato per un minuto e' un minuto di trazione persa."),
 (7,"chiaro",0,"Nella trazione scheletrica si curano i punti di inserzione dei chiodi con tecnica asettica, sorvegliando i segni di infezione. E si prevengono tutte le complicanze dell'immobilita' della lezione tre punto due."),

 (8,"chiaro",0,"La chirurgia addominale riprende quasi tutto cio' che abbiamo visto: il sondino, i drenaggi, la ripresa della canalizzazione e l'ileo, le stomie."),
 (8,"chiaro",0,"Il sostegno della ferita nella tosse e nei movimenti, e il rischio di deiscenza ed eviscerazione. E' la chirurgia in cui l'ERAS ha mostrato i benefici piu' chiari: meno giorni di degenza, meno ileo, meno complicanze."),

 (9,"chiaro",0,"La chirurgia vascolare. Dopo una rivascolarizzazione dell'arto si controllano i polsi distali, colorito, temperatura, sensibilita' e motilita', confrontandoli con l'arto controlaterale e con i valori di prima."),
 (9,"chiaro",0,"La scomparsa di un polso prima presente e' un'urgenza. Si sorveglia il sanguinamento."),
 (9,"chiaro",0,"E dopo l'endoarteriectomia carotidea, due controlli specifici: la valutazione neurologica, per il rischio di ictus, e il collo, perche' un ematoma puo' comprimere le vie aeree."),

 (10,"chiaro",0,"La chirurgia toracica. Il drenaggio toracico, con le regole della lezione sette punto sette. La fisioterapia respiratoria, lo spirometro incentivante, la tosse assistita: il polmone operato deve espandersi."),
 (10,"chiaro",0,"Un'analgesia efficace, spesso con peridurale toracica o blocchi nervosi, perche' il dolore toracico impedisce di respirare. E la mobilizzazione precoce del braccio e della spalla del lato operato."),

 (11,"chiaro",0,"La chirurgia urologica. Dopo la resezione endoscopica della prostata si usa l'irrigazione vescicale continua con catetere a tre vie, con il calcolo del bilancio della lezione otto punto quattro: drenato meno irrigato."),
 (11,"chiaro",0,"Si sorvegliano coaguli e ostruzione. E una complicanza specifica: la sindrome da riassorbimento."),
 (11,"chiaro",0,"Durante l'intervento il liquido di irrigazione puo' essere assorbito in circolo, provocando confusione, nausea, bradicardia e iponatriemia. Una confusione nuova dopo questo intervento va segnalata e fa pensare al sodio."),

 (12,"chiaro",0,"La tiroidectomia, con tre complicanze da conoscere. L'ematoma del collo, che puo' comprimere le vie aeree: e' un'emergenza."),
 (12,"chiaro",0,"Si sorvegliano collo, respiro, voce, stridore, e secondo protocollo e' disponibile al letto il materiale per riaprire la ferita."),
 (12,"chiaro",0,"L'ipocalcemia, per lesione delle paratiroidi: formicolii intorno alla bocca, Chvostek e Trousseau, lezione tre punto cinque. La disfonia, per lesione del nervo laringeo ricorrente. Posizione semiseduta."),

 (13,"chiaro",0,"Il day surgery: intervento e dimissione nella stessa giornata. Richiede una selezione dei pazienti, per condizioni cliniche e supporto a domicilio."),
 (13,"chiaro",0,"La persona deve avere un accompagnatore e qualcuno con se' la prima notte. La dimissione segue criteri precisi: parametri stabili, dolore controllato, nausea assente, minzione, capacita' di camminare."),
 (13,"chiaro",0,"Si consegnano istruzioni scritte, e per ventiquattro ore niente guida, niente decisioni importanti, niente alcol. Spesso il giorno dopo c'e' un contatto telefonico infermieristico."),

 (14,"chiaro",0,"Il caso. Paziente con gesso all'avambraccio da sei ore; dolore fortissimo, che non risponde all'analgesico e aumenta estendendo passivamente le dita. Che cosa pensi?"),
 (14,"chiaro",0,"Sindrome compartimentale. Che cosa fai? Avvisi subito il medico, controlli il circolo distale e lo documenti."),
 (14,"chiaro",0,"Porti l'arto all'altezza del cuore, non piu' in alto, e ti prepari ad allentare o aprire il gesso secondo indicazione."),
 (14,"chiaro",0,"Non si aspetta che il polso scompaia, e non si continua ad aumentare l'analgesico: un dolore che non risponde e' un'informazione, non un fastidio da coprire."),

 (15,"chiaro",0,"In Veneto, come nel resto d'Italia, la percentuale di fratture di femore operate entro quarantotto ore e' uno degli indicatori del Programma Nazionale Esiti."),
 (15,"chiaro",0,"Le aziende hanno attivato percorsi ortogeriatrici per migliorarla. Le unita' di day surgery sono diffuse e seguono protocolli aziendali."),

 (16,"chiaro",0,"La tabella. Anca: no flessione oltre novanta, no adduzione, no intrarotazione; lussazione con arto accorciato e ruotato. Femore: entro quarantotto ore. Gesso: controllo neurovascolare, palmo, niente oggetti."),
 (16,"chiaro",0,"Compartimentale: dolore sproporzionato allo stiramento passivo, polso assente e' tardivo. Trazioni: pesi liberi. Carotide: neurologico e collo. Prostata: iponatriemia. Tiroide: ematoma, calcio, voce."),

 (17,"chiaro",0,"[warm] Nella prossima lezione chiudiamo il percorso del paziente chirurgico con la dimissione: come si pianifica, che cosa si insegna, come si garantisce la continuita' con il territorio. A tra poco."),
]

CAPITOLI = {1:"Apertura",2:"Protesi d'anca: la lussazione",3:"Anca: segni e mobilizzazione",4:"Ginocchio e femore",5:"Il gesso",6:"La sindrome compartimentale",7:"Le trazioni",
 8:"Chirurgia addominale",9:"Chirurgia vascolare",10:"Chirurgia toracica",11:"Chirurgia urologica",12:"La tiroidectomia",13:"Il day surgery",14:"Il caso",15:"In Veneto",16:"La tabella",17:"Chiusura"}

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
