# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Questa lezione riguarda soprattutto chi e' stato assunto a tempo indeterminato entro il 2000, ed e' quindi in TFS."),
 (1,"chiaro",0,"Se sei stato assunto dopo, seguila comunque. Ti aiutera' a rispondere ai colleghi piu' anziani, perche' e' la domanda che si sentono fare piu' spesso."),
 (1,"chiaro",0,"Per chi e' in TFS, aderire a Perseo Sirio e' come azionare uno scambio ferroviario. Il binario della tua liquidazione cambia direzione, e non torna piu' sul tracciato di prima."),
 (1,"chiaro",0,'Vediamo con calma dove porta il nuovo binario, che cosa resta indietro, che cosa si guadagna, e che cosa bisogna valutare con attenzione prima di tirare la leva.'),

 (2,"chiaro",0,"La regola e' questa. Chi e' in TFS e aderisce a Perseo Sirio, nello stesso momento trasforma il suo TFS in TFR."),
 (2,"chiaro",0,"[serious] Non sono due scelte separate: vanno insieme. Non si puo' aderire al Fondo restando in TFS."),
 (2,"chiaro",0,"L'opzione, per legge, si esercita proprio firmando il modulo di adesione al Fondo. Non serve un'altra domanda, e non c'e' un altro modulo da compilare."),
 (2,"chiaro",0,"E quello che hai gia' maturato fino a quel giorno? Non va perso. Viene calcolato con le vecchie regole del TFS, e fotografato alla data dell'adesione."),
 (2,"chiaro",0,"Da li' in avanti quella somma si rivaluta ogni anno come il TFR, e conserva anche il trattamento fiscale di favore previsto per il TFS."),
 (2,"chiaro",0,"In pratica, nessuno ti toglie quello che hai gia' maturato. Cambia solo il modo in cui si forma la liquidazione, da quel giorno in avanti."),
 (2,"chiaro",0,"Pensa a un vagone che viene staccato dal vecchio treno e agganciato al nuovo: dentro c'e' tutto il TFS maturato fino al giorno dell'adesione."),
 (2,"chiaro",0,"Dal giorno dell'adesione, invece, la tua liquidazione futura si forma anno per anno con le regole del TFR che abbiamo visto nella lezione precedente."),

 (3,"chiaro",0,'Ora, che cosa va nel Fondo? Per chi era in servizio prima del 2001, non tutto il TFR va alla pensione complementare.'),
 (3,"chiaro",0,'Ci va il ventotto virgola novantaquattro per cento della quota annua di TFR. Il resto, il settantuno virgola zero sei, continua a formarsi come liquidazione.'),
 (3,"chiaro",0,"Sembra un numero strano, ma corrisponde a un'idea semplice: il due per cento della retribuzione utile. Il ventotto virgola novantaquattro per cento del sei virgola novantuno fa, appunto, due."),
 (3,"chiaro",0,"Con trentamila euro di retribuzione, il TFR dell'anno e' di circa duemilasettanta euro. Al Fondo ne vanno seicento; gli altri, circa millequattrocentosettanta, restano liquidazione."),
 (3,"chiaro",0,"E poi c'e' il premio per chi sceglie. Un accantonamento aggiuntivo pari all'uno virgola cinque per cento della base di calcolo del TFS, cioe' dell'ottanta per cento della retribuzione utile."),
 (3,"chiaro",0,"E' una quota che i colleghi assunti dopo il 2000 non hanno, e va tutta nella tua posizione nel Fondo."),

 (4,"chiaro",0,"Quanto vale, in euro, quell'uno virgola cinque? Facciamo il solito esempio, con una retribuzione utile di trentamila euro."),
 (4,"chiaro",0,"La base e' l'ottanta per cento, cioe' ventiquattromila euro. L'uno virgola cinque per cento di ventiquattromila fa trecentosessanta euro l'anno."),
 (4,"chiaro",0,"Trecentosessanta euro che si aggiungono, ogni anno, al tuo contributo, a quello dell'ente, e alla quota di TFR che va al Fondo."),
 (4,"chiaro",0,"Su vent'anni, senza contare i rendimenti e gli aumenti di stipendio, sono settemiladuecento euro in piu' nella tua posizione."),
 (4,"chiaro",0,'Una precisazione importante. Come il TFR, anche questa quota non viene versata materialmente al Fondo mese per mese.'),
 (4,"chiaro",0,"Viene accantonata dall'INPS, e arriva al Fondo alla fine del rapporto di lavoro. Lo vedremo bene nella prossima lezione."),

 (5,"chiaro",0,"Conviene, allora? Onestamente: dipende. E il corso non puo' decidere al posto tuo. Possiamo pero' mettere sui piatti della bilancia gli elementi giusti."),
 (5,"chiaro",0,"Da una parte: l'accantonamento aggiuntivo dell'uno virgola cinque, il contributo dell'ente che arriva solo aderendo, e i vantaggi fiscali della previdenza complementare, che vedremo nel modulo cinque."),
 (5,"chiaro",0,"Dall'altra parte, due domande. Prima: mi aspetto aumenti importanti negli ultimi anni di carriera? Abbiamo visto che il TFS li premia."),
 (5,"chiaro",0,"Seconda: quanti anni mi mancano alla pensione? Piu' sono, piu' tempo hanno contributi e rendimenti per crescere."),
 (5,"chiaro",0,"Non c'e' una risposta giusta per tutti. Due colleghe con lo stesso stipendio possono arrivare a conclusioni opposte, e avere ragione entrambe."),
 (5,"chiaro",0,"Queste due domande, con i tuoi numeri, valgono piu' di qualunque regola generale, e piu' di qualunque consiglio sentito in corridoio."),

 (6,"chiaro",0,"Prima di decidere, due avvertenze. La prima: il passaggio dal TFS al TFR e' irrevocabile. Una volta fatto, non si torna indietro."),
 (6,"chiaro",0,"La seconda: non e' una porta sempre aperta. Un accordo firmato all'ARAN nel 2026 ha prorogato la possibilita' di optare fino al 31 dicembre 2030."),
 (6,"chiaro",0,"C'e' tempo, quindi, ma non all'infinito. E piu' si aspetta, meno anni restano per far crescere la posizione."),
 (6,"chiaro",0,"E se non fai nulla? Resti in TFS, con le regole di sempre, ma senza il contributo dell'ente. Anche non scegliere, insomma, ha le sue conseguenze."),
 (6,"chiaro",0,"Per questo, prima di firmare, e' bene farsi fare una simulazione personalizzata: dal Fondo, che offre consulenze gratuite, o dal patronato e dal sindacato sul posto di lavoro."),
 (6,"chiaro",0,"E nel modulo dieci analizzeremo un caso completo, quello di un'operatrice in TFS che si trova proprio davanti a questa scelta."),

 (7,"profondo",1.2,"Per chi e' in TFS, prima vengono i numeri. Poi la firma."),

 (8,"chiaro",0,"Le tre cose da ricordare. Uno: chi e' in TFS e aderisce a Perseo Sirio passa contestualmente al TFR, in modo irrevocabile."),
 (8,"chiaro",0,"Due: al Fondo vanno il ventotto virgola novantaquattro per cento del TFR, pari al due per cento della retribuzione, piu' un accantonamento aggiuntivo dell'uno virgola cinque per cento sulla base TFS."),
 (8,"chiaro",0,"Tre: l'opzione si puo' esercitare fino al 31 dicembre 2030, e per decidere servono due risposte: sugli aumenti di fine carriera e sugli anni che mancano."),
 (8,"chiaro",0,'La mossa di oggi, se sei in TFS: prenota una consulenza gratuita con il Fondo, dal sito o al numero verde, oppure chiedi una simulazione al tuo delegato.'),
 (8,"chiaro",0,"[warm] Nella prossima lezione: dove finisce, materialmente, il TFR che destini al Fondo, e perche' spesso non lo vedi."),
]

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Apertura', 2: 'Lo scambio', 3: 'Che cosa va al Fondo', 4: "Quanto vale l'1,5", 5: 'La bilancia', 6: 'Due avvertenze', 7: 'Memo', 8: 'Chiusura'}
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
