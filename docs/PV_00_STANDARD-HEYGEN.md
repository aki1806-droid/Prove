# STANDARD DI PRODUZIONE · SCRIPT HEYGEN
## Progressione Verticale · Comparto Sanità

> Da leggere una volta sola, prima della prima registrazione. Poi ogni file `PV_Mxx_SCRIPT-HEYGEN.md` si applica direttamente.

---

# 1 · Anatomia di una lezione da 6 minuti

| Blocco | Durata | Funzione |
|---|---|---|
| **Aggancio** | 0:00–0:30 | una domanda o un fatto che crea il problema. Mai "in questa lezione vedremo" |
| **Rotta** | 0:30–0:50 | i tre punti della lezione, detti in fila |
| **Corpo** | 0:50–4:40 | tre blocchi da circa 75 secondi, uno per punto |
| **Le tre cose che ti chiederanno** | 4:40–5:30 | il pezzo di preparazione alla prova. Nessuna dispensa ce l'ha |
| **Chiusura e ponte** | 5:30–6:00 | una frase di sintesi + cosa arriva nella lezione successiva |

**Regola di taglio:** se un blocco del corpo supera i 90 secondi, non si accorcia parlando più veloce — si sposta il contenuto in eccesso nella dispensa PDF e si toglie dal parlato.

---

# 2 · Vincoli tecnici HeyGen

| Vincolo | Valore | Conseguenza operativa |
|---|---|---|
| Durata massima per video | 30 minuti (piani a pagamento correnti) | 6 minuti stanno larghi, nessun problema |
| Scene per video | max 50 | ne usiamo 9-11 |
| Testo per scena | max 5.000 caratteri via API · **1.500 su integrazioni più vecchie** | **teniamo ogni scena sotto 1.400 caratteri**, così lo stesso script funziona ovunque |
| Tag di pausa | `<break time="1s"/>` | supportato nel testo semplice |
| Velocità | moltiplicatore 0.5× – 2.0× | **impostare 0.95×**: la normativa letta a velocità piena non si segue |
| Frame rate / risoluzione | 25 fps con avatar, 1080p, 16:9 | |

> Verifica i limiti del tuo piano prima di lanciare la produzione in blocco: HeyGen li ha cambiati più di una volta e alcune pagine riportano ancora valori vecchi.

**Ogni scena nei file di script è già tagliata sotto i 1.400 caratteri.** Si copia e si incolla scena per scena, senza rimaneggiare.

---

# 3 · Come è scritto lo script

Lo script contiene **solo ciò che l'avatar dice**. Nient'altro. Niente indicazioni sceniche, niente titoli, niente "pausa" scritto a parole: le pause sono tag.

Ogni scena ha tre righe nel file:

| Riga | Cosa contiene | Dove va |
|---|---|---|
| `TESTO A SCHERMO` | ciò che compare accanto all'avatar | nella slide, non nello script |
| `SCRIPT` | il parlato, da incollare in HeyGen | nel campo script della scena |
| `NOTA` | eventuali avvertenze | non va da nessuna parte, serve a te |

## 3.1 Le sei regole del parlato

1. **Mai leggere ciò che è scritto a schermo.** Il testo a schermo è l'ancora, il parlato è la spiegazione. Se coincidono, lo studente smette di ascoltare.
2. **Frasi corte.** Media sotto le 20 parole. La normativa è già subordinata di suo.
3. **Un numero alla volta.** Mai due date nella stessa frase: si sovrappongono e non ne resta nessuna.
4. **Ripetere è previsto.** Ogni nozione da memorizzare compare due volte: nel corpo e nel blocco "le tre cose che ti chiederanno".
5. **Niente formule di cortesia.** Nessun "spero che questa lezione ti sia stata utile". L'avatar non simula un rapporto.
6. **La seconda persona singolare, sempre.** "Ti chiederanno", non "verrà chiesto".

## 3.2 Le pause

| Tag | Dove |
|---|---|
| `<break time="1.5s"/>` | dopo l'aggancio, prima della rotta |
| `<break time="1s"/>` | tra un blocco del corpo e il successivo |
| `<break time="0.5s"/>` | prima di un numero o una data importante |

Le pause sono contenuto, non respiro tecnico: sono il momento in cui chi studia prende appunti.

---

# 4 · Dizionario di pronuncia

Il problema numero uno delle voci sintetiche italiane sui testi normativi sono le abbreviazioni. **Nello script si scrive la forma parlata, mai la forma scritta.**

| Non scrivere mai | Scrivi così nello script |
|---|---|
| `D.Lgs. 502/1992` | `decreto legislativo cinquecentodue del millenovecentonovantadue` |
| `L. 241/1990` | `legge duecentoquarantuno del novanta` |
| `art. 5` | `articolo cinque` |
| `c. 1-bis` | `comma uno bis` |
| `L.R. 19/2016` | `legge regionale diciannove del duemilasedici` |
| `Reg. UE 679/2016` | `regolamento europeo seicentosettantanove del duemilasedici` |
| `DPR 184/2006` | `decreto del Presidente della Repubblica centottantaquattro del duemilasei` |
| `n.` | `numero` |
| `SSN` | `Servizio Sanitario Nazionale` (per esteso, sempre) |
| `PA` | `pubblica amministrazione` (per esteso, sempre) |
| `ecc.` | non usarlo |
| `%` | `per cento` |
| `€` | `euro` |

### Sigle che si dicono e come vanno scritte

| Sigla | Nello script | Nota |
|---|---|---|
| ASL | `ASL` | letta come parola, funziona |
| AO / AOU | `azienda ospedaliera` / `azienda ospedaliero universitaria` | per esteso: le due lettere si perdono |
| AOUPD | `Azienda Ospedale Università di Padova` | mai la sigla nel parlato |
| ULSS | `ULSS` | testala una volta; se la voce la storpia, scrivi `u elle esse esse` |
| LEA | `LEA` | letta come parola |
| DRG | `di erre gi` | altrimenti viene letta come parola |
| RPCT | `erre pi ci ti` | |
| DPO | `di pi o` | |
| GDPR | `gi di pi erre` | |
| DVR | `di vu erre` | |
| RSPP / RLS | `erre esse pi pi` / `erre elle esse` | |
| PDTA | `pi di ti a` | |
| GSA | `gi esse a` | |
| OEPV | `offerta economicamente più vantaggiosa` | per esteso, sempre |
| DUP | `DUP` | letta come parola |
| RTI | `erre ti i` | |

**Regola generale:** la sigla si dice per esteso la prima volta che compare nella lezione, poi si può abbreviare. Se compare una volta sola, sempre per esteso.

---

# 5 · Testi a schermo

| Regola | |
|---|---|
| Massimo **8 parole** per schermata | eccetto le tabelle di confronto |
| Mai una frase intera del parlato | il testo a schermo è l'ancora della memoria, non il sottotitolo |
| Un cambio ogni **30-40 secondi** | 9-11 schermate in sei minuti |
| I numeri a schermo sempre in cifre | `502/1992` a schermo, `cinquecentodue del novantadue` nello script |
| Nessuna slide senza avatar | l'avatar resta sempre visibile in un angolo |

**Palette e template:** definiti una volta e mai più toccati. Suggerimento coerente col contesto sanitario pubblico: blu istituzionale, bianco, un solo colore di accento per i numeri da ricordare. Il colore di accento **si usa solo per le nozioni memorizzabili** — diventa il segnale visivo che qualcosa va imparato a memoria.

---

# 6 · Impostazioni HeyGen da fissare una volta

- [ ] Un solo avatar per tutte le 71 lezioni
- [ ] Una sola voce italiana, testata su un paragrafo pieno di date prima di scegliere
- [ ] Velocità 0.95×
- [ ] Template di scena salvato con logo, banda inferiore e area titolo
- [ ] Sfondo neutro, nessun movimento
- [ ] Export 1080p 16:9 + estrazione MP3 dallo stesso master
- [ ] Sottotitoli generati e **corretti a mano sui numeri**: la trascrizione automatica sbaglia sistematicamente gli anni

---

# 7 · Checklist per lezione

- [ ] Script diviso in scene, nessuna sopra 1.400 caratteri
- [ ] Nessuna abbreviazione rimasta nel parlato (cerca `D.Lgs`, `art.`, `n.`, `%`)
- [ ] Testi a schermo sotto 8 parole
- [ ] Nessun testo a schermo che coincida con una frase del parlato
- [ ] Blocco "le tre cose che ti chiederanno" presente
- [ ] Durata generata tra 5:40 e 6:20
- [ ] Sottotitoli riletti sui numeri
- [ ] MP3 esportato
- [ ] 10 quiz scritti e allineati alla lezione
