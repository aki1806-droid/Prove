# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Giulia ha ventotto anni. A marzo 2026 e' stata assunta a tempo indeterminato come infermiera, in un'azienda sanitaria del Veneto."),
 (1,"chiaro",0,'Il primo turno, il badge sistemato davanti allo specchio dello spogliatoio, il lungo corridoio del reparto di medicina, i colleghi da conoscere.'),
 (1,"chiaro",0,"E la sera, a casa, la cartellina dell'assunzione sul tavolo. Dentro c'era anche l'informativa su Perseo Sirio."),
 (1,"chiaro",0,"L'ha messa da parte, come fanno quasi tutti i neoassunti. Ci pensera' poi, quando avra' tempo, dopo i primi turni."),
 (1,"chiaro",0,'Seguiamo Giulia, passo dopo passo, e vediamo con quello che hai imparato nel corso quali domande dovrebbe farsi. E quali risposte trova.'),
 (1,"chiaro",0,"Ricorda: Giulia e i suoi numeri sono inventati. E' un caso illustrativo, con un esempio semplificato. Non e' una previsione, ma un ordine di grandezza."),

 (2,"chiaro",0,"Prima domanda, la piu' semplice: che cosa succede se Giulia non fa proprio nulla, e lascia la cartellina nel cassetto?"),
 (2,"chiaro",0,"E' stata assunta a tempo indeterminato dopo il 2019. Quindi, per lei, vale il silenzio-assenso che hai visto nella lezione tre punto tre."),
 (2,"chiaro",0,"Dall'informativa di marzo ha sei mesi di tempo per scegliere: aderire esplicitamente, oppure dire di no."),
 (2,"chiaro",0,"Se tace, a settembre, alla fine dei sei mesi, l'ente comunica i suoi dati al Fondo. E il Fondo le scrive una lettera."),
 (2,"chiaro",0,"Dopo trenta giorni senza risposta, Giulia e' iscritta, a partire dal mese successivo alla fine dei sei mesi."),
 (2,"chiaro",0,"Con la contribuzione piena: il suo uno per cento, l'uno per cento dell'ente, e tutto il TFR."),
 (2,"chiaro",0,"E nel profilo Garantito, quello piu' prudente di tutti. Senza aver mai scelto nulla, ne' l'adesione ne' il profilo."),

 (3,"chiaro",0,'Seconda domanda: quanti soldi entrano, ogni anno, nella posizione di Giulia? E quanti ne mette davvero lei?'),
 (3,"chiaro",0,"Facciamo i conti con trentamila euro di retribuzione utile, una cifra tonda e realistica per un'infermiera a inizio carriera."),
 (3,"chiaro",0,"Il suo uno per cento sono trecento euro l'anno. Cioe' venticinque euro al mese, trattenuti direttamente in busta paga."),
 (3,"chiaro",0,"L'ente aggiunge altri trecento euro l'anno, il suo uno per cento. Soldi che, senza aderire, Giulia non avrebbe."),
 (3,"chiaro",0,"E poi c'e' il TFR, che finisce nella tasca figurativa, all'INPS: circa duemilasettanta euro l'anno."),
 (3,"chiaro",0,"Mettiamoli insieme. In tutto, circa duemilaseicentosettanta euro l'anno lavorano per la sua pensione complementare, ogni anno."),
 (3,"chiaro",0,"Ma c'e' di piu', e lo hai visto nel modulo cinque. Grazie alla deduzione dei contributi, Giulia risparmia circa centotrentotto euro di IRPEF l'anno."),
 (3,"chiaro",0,"Il suo sforzo netto, quindi, e' di poco piu' di centosessanta euro l'anno. Meno di quattordici euro al mese, per muoverne quasi duemilasettecento l'anno."),

 (4,"chiaro",0,"Terza domanda, quella che incuriosisce di piu': dove puo' arrivare Giulia, con questi numeri?"),
 (4,"chiaro",0,'Giulia ha trentanove anni di lavoro davanti, dai ventotto ai sessantasette anni. Un orizzonte lunghissimo.'),
 (4,"chiaro",0,'Solo con questi versamenti, senza contare gli aumenti di stipendio, metterebbe da parte circa centoquattromila euro.'),
 (4,"chiaro",0,'Poi ci sono i rendimenti, anno dopo anno. E il risultato cambia molto a seconda di come sono investiti i soldi.'),
 (4,"chiaro",0,"Con un rendimento del due per cento netto l'anno, la posizione arriverebbe a circa centocinquantanovemila euro."),
 (4,"chiaro",0,'Con un tre per cento, circa centonovantanovemila euro. Con un quattro per cento, oltre duecentocinquantamila euro.'),
 (4,"chiaro",0,'Sono solo ipotesi, senza tasse, senza costi, senza aumenti di stipendio. Il ventaglio della lezione precedente, con i numeri di Giulia.'),
 (4,"chiaro",0,"Ma mostrano una cosa importante: con un orizzonte cosi' lungo, il profilo scelto pesa quasi quanto i versamenti. Tra il primo e l'ultimo scenario ci sono quasi centomila euro."),

 (5,"chiaro",0,'Che cosa dovrebbe fare Giulia, quindi? Non lasciare che il corso decida al posto suo, ma fare quattro scelte consapevoli.'),
 (5,"chiaro",0,'Primo: decidere, invece di lasciar decidere al tempo e al silenzio. Anche se poi la scelta fosse la stessa.'),
 (5,"chiaro",0,"Secondo: chiedersi se il Garantito, il profilo piu' prudente, sia davvero adatto a chi ha trentanove anni davanti."),
 (5,"chiaro",0,"Per farlo, puo' usare il questionario di autovalutazione e la consulenza del Fondo, come hai visto nel modulo sei."),
 (5,"chiaro",0,"Terzo: scegliere anche il profilo del suo TFR virtuale, che puo' essere diverso. E' la parte piu' grande dei suoi versamenti, quasi l'ottanta per cento."),
 (5,"chiaro",0,'Quarto: se convive senza essere sposata, designare i beneficiari, come hai visto nella lezione otto punto cinque.'),
 (5,"chiaro",0,"E un dettaglio fiscale: con trentanove anni di partecipazione, sulla prestazione paghera' il nove per cento, il minimo della scala."),

 (6,"profondo",1.2,"A ventotto anni il tempo e' il capitale piu' grande. Non lasciarlo nel cassetto."),

 (7,"chiaro",0,'Le tre cose da ricordare dalla storia di Giulia, che valgono per tutti i neoassunti.'),
 (7,"chiaro",0,'Uno: chi viene assunto a tempo indeterminato e non sceglie, entra per silenzio-assenso, nel profilo Garantito.'),
 (7,"chiaro",0,"Due: venticinque euro al mese di contributo, insieme all'ente e al TFR, mettono in movimento circa duemilaseicentosettanta euro l'anno."),
 (7,"chiaro",0,'Tre: con un orizzonte lungo, la scelta del profilo, anche per il TFR, pesa quasi quanto i versamenti.'),
 (7,"chiaro",0,"La mossa di oggi: se sei neoassunto, o conosci un collega che lo e', ritrovate l'informativa."),
 (7,"chiaro",0,'E decidete prima della scadenza dei sei mesi, con calma. Qualunque sia la scelta, che sia una scelta vostra, non del calendario.'),
 (7,"chiaro",0,'Nella prossima lezione cambiamo generazione, e cambiamo anche la domanda di fondo.'),
 (7,"chiaro",0,"Anna ha cinquantaquattro anni, fa l'operatrice socio sanitaria, e lavora nella sanita' pubblica dal 1996. Non ha mai aderito al Fondo."),
 (7,"chiaro",0,"Per lei aderire significa anche lasciare il TFS, e passare al TFR. E' la scelta piu' delicata di tutto il corso, da ragionare con calma."),
 (7,"chiaro",0,"[warm] L'operatrice in servizio dal 1996. Ci vediamo nella lezione dieci punto quattro."),
]

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Apertura', 2: 'Se Giulia non fa nulla', 3: 'Quanto entra ogni anno', 4: "Dove puo' arrivare", 5: 'Le scelte di Giulia', 6: 'Memo', 7: 'Chiusura'}
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
