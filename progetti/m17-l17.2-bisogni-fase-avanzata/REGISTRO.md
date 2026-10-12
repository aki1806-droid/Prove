# REGISTRO — 17.2 I bisogni della persona nella fase avanzata di malattia

Modulo 17 bonus (cure palliative, fine vita e accompagnamento), lezione 2 di 5.
Corso di preparazione al concorso **OSS** Azienda Zero · CISL FP Padova Rovigo.

## Scheda parametri

Invariata rispetto alla 17.1 (vedi il suo registro): 7:50 montati, niente
musica, palette dal logo, voce clone di workspace `tVdVcJPudubxmTmAw4tE` su
`eleven_v4`, filtro lento (pausa interna 0,22 s, atempo 1,04), registro sobrio.
Lo stacco fra le tracce e' `s26`, fine del capitolo 7 (astenia e anoressia).

## L'aritmetica, e una presa buttata

```
                      presa 1                  presa 2 (consegnata)
caratteri             7.318                    7.043
voce grezza           502,2 s                  482,3 s
lavorata netta        453,9 s                  433,0 s
CPS netto             16,12                    16,27
rapporto              1,106                    1,114
respiro               0                        +0,244 s su 45 blocchi
montato               8:01.3                   7:51.4  (locale 7:51.72)
```

La prima presa e' uscita **il 4,4% piu' lenta della 17.1** (16,12 contro
16,86 car/s): undici secondi oltre i 7:50, e il respiro sa solo allungare. Non
si consegna un video piu' lungo del chiesto e non si accelera la voce per
rientrare: si accorcia il copione.

Ho tolto le sette aggiunte mie che c'erano (268 caratteri, nessuna del
documento) e rigenerato le due tracce. Il bersaglio non era «7:50 a questa
velocita'» ma **un copione che stia nei 7:50 a tutte e due le velocita' viste**:

```
C / 16,1 + 27,4 ≤ 472     ->  C ≤ 7.155   (se rilegge lenta, non sfora)
C / 16,9 + 27,4 ≥ 444,4   ->  C ≥ 7.048   (se rilegge veloce, il respiro basta)
```

Con 7.043 caratteri la seconda presa ha letto a 16,27 e il respiro ha colmato
11 s, 0,24 s a blocco. **Costo della presa buttata: zero**, perche' la v4 su
questo workspace non addebita.

La lezione per il modulo: **la voce nuova oscilla quanto la vecchia** (16,86 ·
16,12 · 16,27, il 4%). La 17.3 e' scritta dentro la stessa forchetta, 7.065
caratteri.

## Le aggiunte, prima e dopo

Erano otto, marcate `AGG`; ne e' rimasta una, «nel Modulo otto» (il documento
rimanda alla lezione 8.5, la 17.1 dice «Modulo otto»). Le sette tolte erano
del «come»: che cosa puo' fare l'OSS per ciascun bisogno, «e puo' riferirle»,
«anche quando non si vede», «si accolgono, non si spengono», «l'OSS riferisce
la richiesta all'equipe», un'ultima riga di riepilogo, l'anticipo della 17.3.
Le slide che le mostravano (s02, s14, s42, il riepilogo) sono state corrette
insieme al copione, e riguardate.

Due correzioni al documento, rimaste:

- il parlato scriveva **«Cecily Saunders»**, lo schermo «Cicely»: il nome giusto
  e' Cicely, e il parlato lo segue;
- «la legge duecentodiciannove» e' diventata «la legge duecentodiciannove **del
  duemiladiciassette**», come sullo schermo dello stesso documento.

## Il repertorio dei tipi

48 scene: copertina 2 · frase 13 · titolo 9 · elenco 13 · tre 5 · icone 2 ·
sostituzione 2 · griglia 1 · norma 1.

- **velo rosa** su due scene, tutte e due `vietato`: s13 (l'OSS non modifica la
  terapia e non somministra di propria iniziativa) e s33 (non si contiene, non
  si contraddice);
- **sostituzione** dove i due lati sono davvero sbagliato e giusto: s24 (non per
  il fabbisogno, per il piacere) e s29 (la sete: non con i liquidi endovena, con
  la cura della bocca).

## Esito delle verifiche

| | |
|---|---|
| temi concordi fra `blocchi.json` e `contenuti.mjs` | ✓ 46 su 46 |
| traboccamento, copertine, serie a tappe | ✓ |
| provini guardati | ✓ tutti e 48, nessun difetto; riguardati i 4 toccati dal taglio |
| verifica per trascrizione, Scribe | ✓ **99,5% su A, 100% su B · 0 buchi** |
| tagli fra due parole, coi tempi di Scribe | ✓ 44 su 44 — **dopo una correzione**, vedi sotto |
| blocchi nella fascia 8,5-21 car/s | ✓ tutti e 46 (11,2-20,2) |
| scarto audio/video sulle clip | ✓ massimo 20 ms |
| durata del montato locale ≥ 7:50 | ✓ **7:51.72** |
| sottotitoli SRT | ✓ 46 righe su 46 blocchi |

Tre scarti brevi della trascrizione, tutti rese: «zero» → «0», «semiseduta» →
«semi seduta», e **«Lo hai incontrato» → «ha»** (s08), vedi «Da verificare».

## Il controllo nuovo ha preso un taglio sbagliato

`confini-parole.py`, scritto sulla 17.1, ha trovato **un taglio fuori posto su
s39**: l'allineamento l'aveva messo sulla pausa della virgola dopo «emozioni
normali,» invece che sul punto dopo «correggere.». Le ultime quattro parole di
s38, «non sintomi da correggere», sarebbero finite in testa alla scena dopo,
sotto la slide dei tre bisogni.

```
FUORI  s39  fine 123.52 | taglio 121.89 | inizio 124.10
```

Corretto con `audio/correzioni.json` (`{"B": {"11": {"pause": 1}}}`: una pausa
avanti), rilanciato `allinea` → `correggi` → `applica`: 44 su 44.

**Il controllo statistico di prima non l'avrebbe visto.** Rimessa la lavorazione
senza correzione, `verifica-locale.py` diceva s38 −0,34 s e s39 +1,76 s e
«nessuna coppia adiacente di segno opposto»: lo scarto su s38 e' troppo piccolo
perche' faccia coppia. E' la prima volta che il controllo coi tempi delle parole
prende un errore vero; sulla 17.1 aveva solo confermato.

## Il montato

| | |
|---|---|
| montato locale | `montato-17.2.mp4` — **7:51.72** |
| montato HeyGen | _(in render)_ |
| asset caricati | 94 in un lotto solo |

## Costo misurato

```
voce, presa 1 (7.318 car, eleven_v4)                0 crediti
voce, presa 2 (7.043 car, eleven_v4)                0 crediti
trascrizione A (Scribe, 260,9 s)                1.435 crediti   ~$0,24
trascrizione B (Scribe, 221,4 s)                1.218 crediti   ~$0,20
```

## Da verificare — quello che non ho potuto giudicare io

- **I contenuti di merito non li ho verificati contro una fonte.** Il dolore
  totale, le scale, il ruolo dell'OSS sul dolore, la dispnea, i sintomi, la
  nutrizione e l'idratazione artificiale, l'agitazione, la cute, i bisogni:
  sono quelli del documento. In particolare tre affermazioni che un candidato
  ripetera': **«la sete si tratta con la cura della bocca, non con i liquidi
  endovena»**, «idratazione e nutrizione artificiale **spesso non migliorano il
  comfort, e talvolta lo peggiorano**», e «la cura del cavo orale e'
  **l'intervento di comfort piu' importante**».
- **«Lo hai incontrato» (s08)**: Scribe ha trascritto «ha». Fra «l'hai» e «l'ha»
  c'e' solo la *i* finale e Scribe sbaglia spesso le elisioni; ma il senso
  cambia (tu l'hai incontrato / qualcuno l'ha incontrato). Va ascoltato.
- **«Cicely Saunders»**: un nome inglese letto da una voce italiana. Scribe l'ha
  trascritto giusto, quindi la voce l'ha detto riconoscibile; come suoni, va
  ascoltato.
- **«L'OSS»** con la v4: come sulla 17.1, va ascoltato almeno una volta.
- **L'SRT porta gli apostrofi del parlato** invece degli accenti veri: decisione
  ancora aperta, vale per tutto il corso.
