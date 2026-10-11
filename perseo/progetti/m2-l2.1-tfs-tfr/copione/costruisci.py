# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Con la liquidazione ci sistemo la casa. Quante volte l'hai sentito dire, magari a una festa di pensionamento in reparto, tra la torta, i regali e gli applausi dei colleghi?"),
 (1,"chiaro",0,"La liquidazione e' la somma che ricevi quando il rapporto di lavoro finisce. Sembra una cosa semplice, e quasi tutti pensano di sapere bene di che cosa si sta parlando."),
 (1,"chiaro",0,"Ma nel pubblico impiego la liquidazione non e' una sola. Ne esistono due tipi, con regole diverse, calcoli diversi e nomi diversi: il TFS e il TFR."),
 (1,"chiaro",0,"Capire quale hai tu e' il primo passo per capire Perseo Sirio, perche' aderire al Fondo cambia proprio la tua liquidazione. Per questo il secondo modulo del corso parte da qui."),

 (2,"chiaro",0,'Due sigle che si somigliano molto, e che si confondono spesso anche tra colleghi esperti, perfino negli uffici. Vediamole una alla volta, con calma.'),
 (2,"chiaro",0,"TFS significa trattamento di fine servizio. E' il sistema storico del pubblico impiego, quello che c'era gia' quando sono entrati in servizio molti dei colleghi piu' anziani."),
 (2,"chiaro",0,"A seconda del comparto prende nomi diversi: indennita' premio di servizio, indennita' di buonuscita, indennita' di anzianita'. Il nome cambia da un ente all'altro, la logica resta la stessa."),
 (2,"chiaro",0,"TFR significa invece trattamento di fine rapporto. E' il sistema nato nel settore privato, quello che conoscono tutti i lavoratori delle aziende, e poi esteso anche ai dipendenti pubblici."),
 (2,"chiaro",0,"Non sono due modi di dire la stessa cosa. Sono due sistemi diversi, con due formule diverse, e a parita' di stipendio e di anni possono dare risultati anche molto diversi."),
 (2,"chiaro",0,"Entrambi ti vengono pagati alla fine del lavoro, quando lasci il servizio. Quello che cambia e' il modo in cui vengono calcolati, e lo vedremo nelle prossime due lezioni."),

 (3,"chiaro",0,"Ma allora come si fa a sapere quale dei due hai? Non lo scegli tu, e non dipende dal tuo profilo professionale. La regola e' legata a una data precisa: il 31 dicembre 2000."),
 (3,"chiaro",0,'[serious] Se sei stato assunto a tempo indeterminato entro quella data, sei in TFS.'),
 (3,"chiaro",0,'Se invece sei stato assunto a tempo indeterminato dal primo gennaio 2001 in poi, sei in TFR.'),
 (3,"chiaro",0,'E se hai un contratto a tempo determinato, sei sempre in TFR, qualunque sia la data in cui hai cominciato a lavorare per la pubblica amministrazione.'),
 (3,"chiaro",0,"E' per questo che, nello stesso reparto, la collega che lavora li' da trent'anni e il collega arrivato da cinque hanno due liquidazioni diverse, anche se fanno esattamente lo stesso lavoro."),
 (3,"chiaro",0,'Questa linea del tempo, con la tacca sul 2000, la ritroveremo spesso nel corso: nei contributi, nelle tasse, nelle scelte finali. Conviene fissarla bene adesso, una volta per tutte.'),

 (4,"chiaro",0,"Attenzione pero' a un dettaglio che crea molti dubbi, soprattutto a chi e' stato assunto proprio a cavallo tra i due anni, alla fine del 2000 o all'inizio del 2001."),
 (4,"chiaro",0,"A volte la data in cui il contratto produce effetti giuridici non coincide con la data da cui vieni pagato. Sono due date diverse, e possono cadere da una parte e dall'altra della linea."),
 (4,"chiaro",0,"Pensa a chi e' stato assunto con una graduatoria, con la nomina datata dicembre 2000 ma con la presa di servizio, e il primo stipendio, arrivati nel 2001."),
 (4,"chiaro",0,"In questi casi, come chiarisce anche il Fondo, conta la decorrenza giuridica del contratto, non quella economica. Quindi quel collega, in questo esempio, e' in TFS."),
 (4,"chiaro",0,"Se hai un caso al limite, non indovinare e non fidarti del passaparola. Chiedi all'ufficio del personale quale data risulta nel tuo fascicolo, e fattela confermare."),

 (5,"chiaro",0,'Facciamo tre esempi concreti, con tre colleghi dello stesso ospedale, che magari si incrociano ogni giorno al cambio turno e si scambiano le consegne.'),
 (5,"chiaro",0,"Marta e' infermiera, assunta a tempo indeterminato nel 1996. E' entrata prima della linea, quindi e' in TFS."),
 (5,"chiaro",0,"Luca e' operatore socio-sanitario, assunto a tempo indeterminato nel 2009. E' entrato dopo la linea, quindi e' in TFR."),
 (5,"chiaro",0,"Sara e' tecnica di radiologia, con un contratto a tempo determinato iniziato da poco. E' in TFR, come tutti i tempi determinati, indipendentemente dagli anni."),
 (5,"chiaro",0,"E se Sara venisse poi stabilizzata? Resterebbe in TFR, perche' la sua assunzione a tempo indeterminato arriverebbe comunque dopo il 2000."),
 (5,"chiaro",0,"Tre colleghi, due regimi. E nessuno dei tre ha scelto il proprio: lo ha deciso, semplicemente, la data in cui e' stato assunto."),

 (6,"chiaro",0,"Ma perche' e' cosi' importante saperlo, in un corso che parla di Perseo Sirio? Per due ragioni, che ritroveremo in tutto il resto del percorso."),
 (6,"chiaro",0,"La prima: chi e' in TFS e decide di aderire al Fondo passa automaticamente al TFR. E' una scelta con conseguenze importanti, e le dedicheremo una lezione intera."),
 (6,"chiaro",0,'La seconda: la quota di liquidazione che va nel Fondo cambia a seconda che tu sia stato assunto prima o dopo il 2001. Lo vedremo con i numeri nel modulo quattro.'),
 (6,"chiaro",0,'Quindi, prima di qualunque calcolo e di qualunque simulazione, devi sapere da che parte della linea ti trovi. Senza questo dato, ogni conto parte sbagliato.'),
 (6,"chiaro",0,"Sembra un'informazione scontata. Eppure molti colleghi, se glielo chiedi in pausa caffe', non sanno rispondere con certezza."),
 (6,"chiaro",0,"Ed e' un'informazione che ti servira' anche per leggere bene i documenti del Fondo e il cedolino, che usano spesso le parole TFS e TFR senza spiegarle."),

 (7,"profondo",1.2,'Ogni ragionamento sulla liquidazione parte da una data: quella della tua assunzione.'),

 (8,"chiaro",0,"Le tre cose da ricordare. Uno: chi e' stato assunto a tempo indeterminato entro il 31 dicembre 2000 e' in TFS."),
 (8,"chiaro",0,"Due: chi e' stato assunto dal 2001 in poi, oppure lavora a tempo determinato, e' in TFR."),
 (8,"chiaro",0,'Tre: nei casi dubbi conta la decorrenza giuridica del contratto, non la data del primo stipendio.'),
 (8,"chiaro",0,'La mossa di oggi: recupera il tuo contratto individuale di lavoro e annota su un foglio la data di decorrenza giuridica.'),
 (8,"chiaro",0,"Se non lo trovi, chiedilo all'ufficio del personale, oppure fatti aiutare dal delegato sindacale del tuo posto di lavoro."),
 (8,"chiaro",0,'[warm] Nella prossima lezione vediamo come si calcola il TFS: una formula semplice, tre ingredienti, e un esempio con numeri tondi.'),
]

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Apertura', 2: 'Due sigle', 3: 'La linea del 2000', 4: 'La data giuridica', 5: 'Tre colleghi', 6: "Perche' conta", 7: 'Memo', 8: 'Chiusura'}
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
