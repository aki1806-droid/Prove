# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Chiudiamo il modulo otto, il piu' ampio dal punto di vista clinico. Il riepilogo e' organizzato in un modo che ti servira' nella prova pratica."),
 (1,"chiaro",0,"Per ogni apparato, i segni d'allarme che l'infermiere deve riconoscere, e che cosa fare subito. E' lo schema dell'infermiere esperto quando entra in una stanza: guarda, riconosce, agisce. E alla fine, otto domande secche."),

 (2,"chiaro",0,"Il principio che tiene insieme tutto il modulo: riconoscere precocemente il deterioramento."),
 (2,"chiaro",0,"Gli strumenti li conosci: i sistemi di allerta come la NEWS2 della lezione due punto tre, e la comunicazione strutturata SBAR della lezione due punto sette."),
 (2,"chiaro",0,"E una regola: si guarda il paziente, non solo il monitor. Il monitor dice un numero, il paziente dice se quel numero e' vero."),

 (3,"chiaro",0,"Cuore. Dolore toracico, anche atipico in donne, anziani e diabetici: ECG entro dieci minuti. Aumento rapido di peso, un chilo e mezzo-due in due-tre giorni, dispnea, ortopnea: scompenso."),
 (3,"chiaro",0,"Sul monitor, la fibrillazione ventricolare si defibrilla; asistolia e attivita' elettrica senza polso no."),
 (3,"chiaro",0,"E la fibrillazione atriale, irregolare e senza onde P, con il suo rischio di ictus: il filo che lega la prima lezione del modulo alla sesta."),

 (4,"chiaro",0,"Polmone. Dispnea improvvisa con desaturazione e tachicardia: embolia polmonare, spesso da una trombosi venosa profonda. Asmatico silenzioso, che non riesce a parlare: attacco grave."),
 (4,"chiaro",0,"BPCO sempre piu' sonnolento in ossigeno: ipercapnia, target ottantotto-novantadue. Monossido di carbonio: saturazione falsamente normale."),
 (4,"chiaro",0,"E la regola che vale da sola molte domande: l'ossigeno e' un farmaco, con una prescrizione, una dose e un obiettivo di saturazione."),

 (5,"chiaro",0,"Metabolismo. Confusione, sudorazione, tremore: glicemia subito, perche' l'ipoglicemia si corregge in un minuto e uccide se non riconosciuta."),
 (5,"chiaro",0,"Respiro di Kussmaul e alito fruttato: chetoacidosi, e attenzione al potassio. Anziano disidratato e confuso con glicemia oltre seicento: stato iperosmolare. Corticosteroidi sospesi e ipotensione: crisi surrenalica."),

 (6,"chiaro",0,"Rene. Oliguria: prima catetere e globo, perche' spesso l'anuria si risolve sbloccando un catetere. Fremito della fistola assente: possibile trombosi, si avvisa subito."),
 (6,"chiaro",0,"Liquido di dialisi peritoneale torbido: peritonite. Potassio alto: ECG, e verificare l'emolisi del campione."),
 (6,"chiaro",0,"E la diuresi oraria: sotto mezzo millilitro per chilo per ora per sei ore e' un criterio di insufficienza renale acuta. Il numero che dice per primo se il rene sta cedendo."),

 (7,"chiaro",0,"Apparato digerente. Ematemesi, melena, tachicardia e ipotensione: emorragia digestiva, e l'emoglobina scende in ritardo."),
 (7,"chiaro",0,"Cirrotico confuso con asterixis: encefalopatia, e si cercano stipsi, sanguinamento, sedativi. Dolore epigastrico a barra verso il dorso: pancreatite."),
 (7,"chiaro",0,"E dopo la gastroscopia con l'anestetico in gola, niente per bocca finche' non torna il riflesso della deglutizione: la regola della disfagia, che qui vale per un'ora."),

 (8,"chiaro",0,"Sistema nervoso. Volto asimmetrico, braccio che cade, linguaggio alterato: FAST positiva, si annota l'ora, si controlla la glicemia, si attiva il percorso stroke."),
 (8,"chiaro",0,"Anisocoria nuova, cefalea, vomito, calo della coscienza: ipertensione endocranica. Ipertensione con bradicardia e respiro irregolare: Cushing, segno tardivo. Crisi oltre cinque minuti: stato di male."),

 (9,"chiaro",0,"Oncologia. Febbre in chemioterapia, soprattutto al nadir, sette-quattordici giorni dopo il ciclo: neutropenia febbrile, emocolture e antibiotico entro sessanta minuti."),
 (9,"chiaro",0,"Dolore dorsale e debolezza delle gambe: compressione midollare. Petecchie e gengive che sanguinano: piastrinopenia."),
 (9,"chiaro",0,"Sette apparati, un elenco di segni: e' la tabella che la lezione ti chiede di costruire, e che la prova pratica ti chiedera' di sapere a memoria."),

 (10,"chiaro",0,"I numeri. NYHA da uno a quattro. ECG entro dieci minuti. Target di saturazione novantaquattro-novantotto, ottantotto-novantadue negli ipercapnici."),
 (10,"chiaro",0,"Occhialini uno-sei litri, maschera semplice almeno cinque, reservoir dieci-quindici. Venturi quando serve precisione."),
 (10,"chiaro",0,"Cuffia venti-trenta. Aspirazione dieci-quindici secondi. Glicata da sei virgola cinque. Target in reparto centoquaranta-centottanta."),
 (10,"chiaro",0,"Trombolisi entro quattro ore e mezza, pressione sotto centottantacinque su centodieci prima e sotto centottanta su centocinque dopo. Neutrofili sotto cinquecento, piastrine sotto cinquantamila."),
 (10,"chiaro",0,"Sono quindici numeri. Fermati, copiali nel quaderno, e riparti: il quiz li chiede tutti, e la prova pratica li pretende senza esitazione."),

 (11,"chiaro",0,"Le confusioni. L'ossigeno: piu' non e' sempre meglio. Venturi: FiO2 precisa. Chetoacidosi e stato iperosmolare non sono la stessa cosa. Colica: agitato; peritonite: immobile."),
 (11,"chiaro",0,"Braccio con fistola: niente pressione. Lock del catetere da dialisi: aspirare. Nella crisi epilettica: niente in bocca. Levodopa: puntuale. Otto confusioni, otto punti che si perdono in un attimo."),

 (12,"chiaro",2.0,"L'autovalutazione. Due domande alla volta, risposta secca. Uno: donna anziana diabetica con dolore epigastrico e sudorazione, che cosa fai per primo? Due: paziente con BPCO, quale target di saturazione?"),
 (12,"chiaro",0,"Uno: ECG entro dieci minuti, e' una presentazione atipica finche' non si dimostra il contrario. Due: ottantotto-novantadue."),
 (12,"chiaro",2.0,"Tre: respiro di Kussmaul e alito fruttato in un giovane con diabete di tipo uno, che cosa pensi? Quattro: il fremito della fistola e' scomparso, che cosa fai?"),
 (12,"chiaro",0,"Tre: chetoacidosi, con attenzione al potassio durante il trattamento. Quattro: avvisi subito, e' una possibile trombosi."),
 (12,"chiaro",2.0,"Cinque: cirrotico confuso con stipsi da tre giorni, che cosa cerchi? Sei: un braccio che cade e il linguaggio impastato, che cosa annoti per primo?"),
 (12,"chiaro",0,"Cinque: il fattore scatenante: la stipsi, e un eventuale sedativo. Sei: l'ultima volta visto in benessere, e si attiva il percorso stroke."),
 (12,"chiaro",2.0,"Sette: febbre a trentotto virgola quattro dieci giorni dopo la chemioterapia, che cosa fai? Otto: pressione alta e polso lento in un paziente neurologico, che cosa significa?"),
 (12,"chiaro",0,"Sette: emocolture e antibiotico entro sessanta minuti, e' una neutropenia febbrile finche' non si dimostra il contrario. Otto: triade di Cushing, un allarme di erniazione. Otto su otto e' il livello atteso."),

 (13,"chiaro",0,"I fili con gli altri moduli: l'ossigeno e l'emogas con la sei punto quattro; i farmaci cardiovascolari, le insuline e gli anticoagulanti con la cinque punto cinque; la disfagia con la tre punto tre."),
 (13,"chiaro",0,"Gli antiblastici con la cinque punto sette; l'isolamento protettivo con la quattro punto tre; le emocolture con la sei punto sette. All'orale, collegare dimostra padronanza."),

 (14,"chiaro",0,"Gli agganci veneti del modulo. La rete STEMI, con l'ECG teletrasmesso dal centodiciotto. La rete ictus, con centri hub e spoke. La Rete Oncologica Veneta."),
 (14,"chiaro",0,"La gestione integrata del diabete. La rete nefrologica e la dialisi domiciliare. Gli screening oncologici regionali. Tutte reti: e' la parola chiave del sistema veneto, che approfondiremo nel modulo tredici."),

 (15,"chiaro",0,"Come proseguire. Test del modulo, trenta domande, soglia ventuno. Costruisci una tabella personale: per ogni apparato, segno d'allarme e azione, su un foglio solo, da rileggere la sera prima della prova."),
 (15,"chiaro",0,"E scrivi per intero due casi con lo schema in cinque passi: il dolore toracico atipico e il sospetto ictus. Sono fra le tracce piu' probabili della prova pratica."),

 (16,"profondo",1.2,"[serious] La frase del modulo: riconoscere presto, comunicare chiaro, agire nel tempo giusto. Il tempo e' muscolo nell'infarto, e' cervello nell'ictus, e' vita nella neutropenia febbrile."),

 (17,"chiaro",0,"Nel prossimo modulo passiamo all'area chirurgica: la preparazione all'intervento, la sala operatoria, il risveglio e il decorso post-operatorio. Otto lezioni, come sempre."),
 (17,"chiaro",0,"[warm] Ritroverai molte cose gia' viste, dal bundle delle infezioni del sito chirurgico alla gestione del dolore, applicate al percorso del paziente chirurgico. Ci vediamo li'."),
]

CAPITOLI = {1:"Apertura",2:"Il principio",3:"Cuore",4:"Polmone",5:"Metabolismo",6:"Rene",7:"Apparato digerente",8:"Sistema nervoso",
 9:"Oncologia",10:"I numeri",11:"Le confusioni",12:"L'autovalutazione",13:"I fili",14:"In Veneto",15:"Come proseguire",16:"La frase del modulo",17:"Chiusura"}

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
