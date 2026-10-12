# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,'[warm] Il secondo vantaggio fiscale riguarda il raccolto. Pensa a un orto: semini in primavera, e dopo qualche mese raccogli.'),
 (1,"chiaro",0,'I soldi che metti nel Fondo vengono investiti, e negli anni producono rendimenti: interessi delle obbligazioni, dividendi, crescita delle azioni.'),
 (1,"chiaro",0,'Su questi rendimenti si pagano le tasse, come su qualunque investimento. Ma nel fondo pensione se ne pagano meno.'),
 (1,"chiaro",0,"In questa lezione vediamo quanto meno, chi le paga, e perche' anche questa differenza, anno dopo anno, si accumula."),
 (1,"chiaro",0,'Come sempre in questo modulo: informazioni generali, non consulenza fiscale, ed esempi semplificati.'),

 (2,"chiaro",0,'Ecco i numeri. Se investi da solo, con un conto titoli in banca o un fondo comune di investimento, sui guadagni paghi di regola il ventisei per cento.'),
 (2,"chiaro",0,"Fanno eccezione i titoli di Stato, come i BTP: sui loro interessi l'imposta e' del dodici virgola cinque per cento, sia fuori sia dentro il Fondo."),
 (2,"chiaro",0,"Nel fondo pensione, invece, i rendimenti sono tassati al venti per cento. Sei punti in meno rispetto all'investimento ordinario."),
 (2,"chiaro",0,'E la parte che deriva dai titoli di Stato, anche dentro il Fondo, resta al dodici virgola cinque.'),
 (2,"chiaro",0,"Quindi, a seconda di quanti titoli di Stato ci sono nel tuo profilo, l'aliquota effettiva puo' essere anche un po' sotto il venti."),
 (2,"chiaro",0,'Sei punti di differenza sulla maggior parte dei rendimenti. Sembra poco, lo so: su cento euro di guadagno, sono sei euro.'),
 (2,"chiaro",0,'Ma ricorda: questo vantaggio si ripete ogni anno, per tutti gli anni in cui i tuoi soldi restano investiti. E sono tanti anni.'),

 (3,"chiaro",0,'Facciamo un esempio semplificato. Due cesti uguali, ognuno con mille euro di raccolto: mille euro di guadagno, maturati in un anno.'),
 (3,"chiaro",0,"Fuori dal fondo pensione, con l'aliquota piena del ventisei per cento, il fisco ne prende duecentosessanta."),
 (3,"chiaro",0,"Nel fondo pensione, con il venti per cento, ne prende duecento. Stesso raccolto, stessa fatica, ma un cesto resta piu' pieno dell'altro."),
 (3,"chiaro",0,'Sessanta euro di differenza su mille. E quei sessanta euro non spariscono: restano nel cesto, restano investiti, a nome tuo.'),
 (3,"chiaro",0,"Ed e' proprio questo il punto. L'anno dopo producono anche loro un piccolo rendimento. E quel rendimento, a sua volta, l'anno dopo ancora."),
 (3,"chiaro",0,"E' lo stesso meccanismo della curva dell'interesse composto che hai visto nel modulo uno, applicato al risparmio fiscale."),
 (3,"chiaro",0,"Ogni euro di tasse risparmiato oggi e' un euro che lavora per te domani. Per molti anni, fino al giorno della pensione."),

 (4,"chiaro",0,"Come si pagano queste imposte? Buona notizia: non te ne devi occupare. Non arriva nessun modulo, e non c'e' nessuna scadenza da ricordare."),
 (4,"chiaro",0,"Le versa direttamente il Fondo, ogni anno, sul risultato della gestione. Tu non devi dichiarare niente, ne' calcolare niente, ne' anticipare niente."),
 (4,"chiaro",0,"Per questo i rendimenti che il Fondo pubblica sono rendimenti netti: le tasse sono gia' state tolte."),
 (4,"chiaro",0,"Lo stesso vale per il prospetto annuale che abbiamo visto nella lezione quattro punto cinque: il risultato della gestione che leggi e' gia' netto."),
 (4,"chiaro",0,"E' un dettaglio importante quando confronti il Fondo con altri investimenti, che spesso mostrano rendimenti lordi, prima delle tasse."),
 (4,"chiaro",0,'Per un confronto onesto, metti sempre netto con netto. Altrimenti il Fondo sembra rendere meno di quanto rende davvero.'),
 (4,"chiaro",0,"C'e' poi una conseguenza utile da sapere. Quando un giorno riceverai la prestazione, i rendimenti gia' tassati non verranno tassati una seconda volta."),
 (4,"chiaro",0,"La tassa sulla prestazione, che vediamo nella prossima lezione, riguarda i contributi, non i rendimenti. Quelli hanno gia' pagato."),

 (5,"chiaro",0,"Ora guarda cosa succede in trent'anni, una carriera intera. Torniamo alla curva dell'interesse composto, quella del modulo uno."),
 (5,"chiaro",0,"Due investimenti identici, che rendono esattamente lo stesso. Uno paga il ventisei per cento sui guadagni, l'altro il venti."),
 (5,"chiaro",0,"All'inizio le due curve si sovrappongono: la differenza dopo un anno e' minima, pochi euro. Quasi non si vede."),
 (5,"chiaro",0,"Poi, lentamente, si separano. Dopo dieci anni lo spazio tra le due curve si vede. Dopo trenta, e' ben visibile: e' tutto rendimento in piu', a parita' di investimento."),
 (5,"chiaro",0,"Non e' un salto spettacolare: e' un vantaggio silenzioso, che lavora ogni anno, senza che tu debba fare nulla. Come un vento leggero, ma sempre a favore."),
 (5,"chiaro",0,"Ed e' proprio il tipo di vantaggio che premia chi resta a lungo. Cioe' chi usa il fondo pensione per quello a cui serve: la pensione."),
 (5,"chiaro",0,'Al contrario, chi esce presto o chiede anticipazioni per motivi non necessari, rinuncia a una parte di questo effetto.'),
 (5,"chiaro",0,"Tienilo a mente quando, piu' avanti nel corso, parleremo di anticipazioni e riscatti. Ogni uscita anticipata interrompe anche questo vantaggio."),

 (6,"profondo",1.2,'Nel Fondo, i tuoi guadagni pagano il venti per cento. Non il ventisei.'),

 (7,"chiaro",0,'Le tre cose da ricordare. Uno: nel fondo pensione i rendimenti sono tassati al venti per cento invece del ventisei.'),
 (7,"chiaro",0,"Due: la parte che deriva dai titoli di Stato resta al dodici virgola cinque, dentro e fuori dal Fondo. Per questo l'aliquota effettiva puo' scendere sotto il venti."),
 (7,"chiaro",0,"Tre: le imposte le paga il Fondo ogni anno, e i rendimenti che vedi sono gia' netti."),
 (7,"chiaro",0,'La mossa di oggi: vai sul sito del Fondo, nella sezione dedicata alla gestione finanziaria, dove sono pubblicati i rendimenti di ogni profilo.'),
 (7,"chiaro",0,'Cerca il rendimento netto del 2025 del tuo profilo di investimento, e se vuoi anche quello degli ultimi cinque o dieci anni.'),
 (7,"chiaro",0,"Se non ricordi quale profilo hai, lo trovi nell'area riservata, o nel prospetto annuale. Ne parleremo a fondo nel modulo sei."),
 (7,"chiaro",0,"E ricorda: quel numero e' gia' al netto delle tasse. Confrontalo solo con altri rendimenti netti."),
 (7,"chiaro",0,"Abbiamo visto il primo vantaggio, sui contributi che versi, e il secondo, sui rendimenti che maturano. Manca il terzo, quello all'arrivo."),
 (7,"chiaro",0,"Nella prossima lezione: quanto si paga quando arriva la prestazione. E perche' si scende dal quindici fino al nove per cento."),
 (7,"chiaro",0,"E' una scala che scende, anno dopo anno di iscrizione: piu' resti, meno paghi. Un altro premio per chi resta a lungo."),
 (7,"chiaro",0,'[warm] Ci vediamo nella lezione cinque punto tre.'),
]

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Apertura', 2: 'I numeri', 3: 'Un esempio', 4: 'Come si paga', 5: 'Nel tempo', 6: 'Memo', 7: 'Chiusura'}
CPS = 17.0   # GianP eleven_v3, misurata sul corso Infermiere: si rimisura sulla 1.1

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
    if len(b["text"])>225: errori.append(f'{b["id"]}: {len(b["text"])} car, blocco troppo lungo')
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
