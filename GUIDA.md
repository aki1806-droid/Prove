# Guida passo passo: collegare Picky Assist

Guida in italiano semplice. Si parte da zero e si arriva al primo messaggio
inviato dal computer.

L'ordine conta: **prima si collega WhatsApp dentro Picky Assist**, e solo dopo
ha senso usare il codice di questo repository. Se WhatsApp non è collegato, il
codice riceve un errore e non c'è modo di farlo funzionare.

---

## La scelta fatta: WhatsApp Official Managed

Per le campagne serve un canale **ufficiale** di WhatsApp. Le strade che
pilotano un WhatsApp normale (app Android, WhatsApp Web) vanno bene per
rispondere ai clienti, ma usate per gli invii massivi portano quasi sempre al
**ban del numero**: è WhatsApp che riconosce l'invio automatico di massa da
un'app non ufficiale e blocca il numero, spesso per sempre.

Tra i due canali ufficiali la scelta è caduta sul **gestito** (WhatsApp Official
Managed Service). Ecco la differenza, che è tutta in chi fa il lavoro noioso:

| | Cloud API (fai da te) | **Managed (gestito)** |
| --- | --- | --- |
| Account Facebook Business Manager | lo crei e configuri tu | **lo gestisce Picky Assist** |
| Email aziendale con dominio proprio | obbligatoria | **non richiesta** |
| Chi ti fattura i messaggi | Meta, con carta sul Business Manager | **Picky Assist, con credito prepagato** |
| Assistenza | Meta Business Suite | **Picky Assist** |
| Costo | canale incluso nei piani | add-on (circa 19 $/mese sul piano Ultimate) |

Il canale gestito costa qualcosa in più al mese, ma toglie di mezzo esattamente
i due punti su cui ci si blocca: l'email aziendale e il Business Manager.

### Cosa ti serve comunque

Due cose sole, e sono facili:

1. **Un account Facebook attivo** (uno qualsiasi, anche personale).
2. **Un numero di telefono che non abbia WhatsApp attivo.** Se il numero che
   vuoi usare ha già WhatsApp, o elimini l'account WhatsApp da quel numero
   (WhatsApp → Impostazioni → Account → Elimina il mio account) oppure usi un
   secondo numero dedicato alle campagne. È la regola che non si aggira.

### Le regole di Meta valgono lo stesso

Il canale gestito cambia chi fa la configurazione, non le regole di WhatsApp:

1. **Template approvati.** A chi non ti ha scritto nelle ultime 24 ore puoi
   mandare solo messaggi presi da un modello approvato in anticipo. Il testo
   libero vale solo nelle 24 ore dopo un messaggio del cliente.
2. **Consenso (opt-in).** Solo a chi ha accettato di essere contattato. Liste
   comprate = numero penalizzato in pochi giorni, e in Europa è anche una
   violazione del GDPR.
3. **Limiti giornalieri progressivi.** Si parte da 1.000 destinatari diversi
   ogni 24 ore; se pochi bloccano, il limite sale da solo.

### Quanto costano i messaggi

Si carica un **credito prepagato nel wallet Picky Assist** e da lì scalano i
messaggi. WhatsApp conta a *conversazione* (una finestra di 24 ore con la stessa
persona), non a singolo messaggio, con prezzi diversi per paese e categoria:
circa 1.000 conversazioni di assistenza gratis al mese, mentre marketing,
utility e autenticazione si pagano — il marketing è la categoria più cara ed è
quella delle campagne.

Se il credito finisce, l'invio si ferma con l'errore `[403] Credito
insufficiente nel wallet Picky Assist`: è il messaggio che vedrai nei nostri
script.

---

## Fase 1 — Collegare WhatsApp a Picky Assist

### Collegare il canale gestito (la strada scelta)

1. Nel pannello: **Settings → Channels**.
2. Cerca **WhatsApp Official Managed Service** e premi **Connect**.
   Se accanto compare l'avviso di aggiornare il piano, vedi la sezione sui
   piani più sotto: è un add-on, di solito sul piano Ultimate.
3. Segui la procedura: ti verranno chiesti il numero da usare e i dati
   dell'azienda. Il collegamento con Facebook lo cura Picky Assist.
4. Il numero riceverà un codice di verifica via SMS o chiamata.
5. A collegamento fatto, in **Settings → Channels** vedrai il numero connesso,
   lo stato della connessione, il **WABA ID** e il **phone number ID**.
6. Carica il credito nel wallet e fai approvare il primo template.

Se qualcosa non va, il supporto Picky Assist (**support@pickyassist.com**) qui
può intervenire davvero, perché il canale lo gestiscono loro: è il vantaggio
principale di questa scelta.

---

### Le altre strade (per contesto)

Picky Assist ne offre altre tre. **Non sono equivalenti** e per le campagne non
vanno bene, ma è utile sapere cosa sono.

### Strada A — App Android (la più semplice)

Adatta se hai un telefono Android e vuoi usare il tuo numero WhatsApp attuale.

Serve:
- un telefono **Android** (non funziona con iPhone);
- WhatsApp o WhatsApp Business già installato e funzionante su quel telefono;
- il telefono acceso, connesso a internet e con l'app Picky Assist aperta.

Passi:
1. Nel pannello Picky Assist vai su **Channels / Connect Channel**.
2. Scegli **WhatsApp Personal** o **WhatsApp Business** (automazione telefono).
3. Installa sul telefono l'app **Picky Assist** dal Play Store.
4. Apri l'app, accedi con lo stesso account e collega il telefono seguendo le
   istruzioni a schermo (di solito una scansione o un codice di abbinamento).
5. Nel pannello il canale deve diventare **connesso/online**.

Se il telefono si spegne o perde internet, i messaggi non partono: è il limite
di questa strada.

### Strada B — WhatsApp Web (estensione Chrome)

Serve un computer sempre acceso con Chrome aperto e WhatsApp Web collegato.
Si installa l'estensione **Picky Assist 4.0 – WhatsApp Integration** dal Chrome
Web Store e si abbina l'account. Stesso limite della strada A: se il computer si
spegne, si ferma tutto.

### Strada C — WhatsApp Cloud API (ufficiale Meta)

È la strada professionale: funziona 24 ore su 24 senza telefono acceso. Però
richiede diverse cose, e **se manca anche solo una di queste la configurazione
non si completa**:

- un account **Facebook personale**, con cui restare loggato durante la procedura;
- un account **Facebook Business Manager** (si crea gratis su business.facebook.com);
- un **indirizzo email aziendale** con dominio proprio (es. `nome@tuaazienda.it`):
  Gmail, Hotmail, Libero e simili **vengono rifiutati**;
- un **numero di telefono dedicato**, che riceva SMS o chiamate per la verifica,
  e che **non sia già registrato su WhatsApp**. Se quel numero usa già WhatsApp,
  va prima eliminato l'account WhatsApp da quel numero (WhatsApp → Impostazioni →
  Account → Elimina il mio account), oppure si usa la funzione *Coexistence* di
  Meta per tenerlo attivo su entrambi;
- a volte la **verifica dell'azienda** presso Meta (documenti).

Passi nel pannello: **Channels → Connect Channel → WhatsApp Cloud API**, poi si
segue la procedura guidata di Facebook che si apre in una finestra.

### "Please Upgrade The Plan To Activate The..." (canale bloccato dal piano)

Se in cima alla pagina dei canali compare questa fascia gialla, **il canale non
è attivabile con il piano in corso**: non è un errore di configurazione e non
c'è nulla da sistemare nei dati inseriti. Vale sia per il canale Cloud sia per
quello gestito, che è un add-on (circa 19 $/mese, di norma sul piano Ultimate).

**Se hai comprato un lifetime deal (LTD, tipo AppSumo)**, è la spiegazione più
probabile. Il lifetime deal ha tre livelli (Starter, Growth, Scale) e i canali
inclusi cambiano da un livello all'altro: il canale Cloud API può richiedere un
livello superiore, oppure non rientrare affatto nell'offerta a vita. Prima di
tutto controlla nel pannello, in **Settings → Billing / Plan**, quale piano
risulta attivo:

- se compare il nome del tuo livello LTD, il codice è stato riscattato e il
  limite è davvero del livello: serve salire di livello (finché l'offerta è
  attiva si possono aggiungere codici) o passare a un piano mensile;
- se compare *Free* o *Trial*, il codice **non è stato applicato** all'account:
  è un problema di attivazione, e si risolve con il supporto senza spendere altro.

L'elenco ufficiale di cosa include ogni livello è su
<https://pickyassist.com/appsumo-pricing/>. Se l'acquisto è recente, ricorda che
AppSumo rimborsa entro 60 giorni: se il canale che ti serve non è incluso, è una
cosa da decidere prima che scada quel termine.

I piani Picky Assist a pagamento (prezzi indicativi, da verificare su
<https://pickyassist.com/en/compare-plans>): Basic ~14 $/mese, Pro ~29 $/mese,
API Only ~34 $/mese, Ultimate ~49 $/mese, più l'add-on del canale gestito.

Con il canale gestito le spese sono **due, entrambe verso Picky Assist**:
l'abbonamento (piano + add-on) e il credito prepagato da cui scalano i messaggi.
È il vantaggio pratico rispetto al Cloud API, dove i messaggi li fattura Meta su
una carta collegata al Business Manager.

Prima di pagare conviene scrivere al supporto (**support@pickyassist.com**) e
farsi confermare il piano minimo che attiva il canale gestito nel tuo caso: la
risposta arriva in genere in un giorno lavorativo ed evita di scegliere il piano
sbagliato.

### Se WhatsApp non si collega: errori più comuni

| Cosa vedi | Causa | Soluzione |
| --- | --- | --- |
| La procedura Facebook si blocca o chiede un'altra email | Hai usato una email personale (Gmail, Hotmail…) | Riguarda solo il Cloud API fai da te: con il canale gestito non serve |
| "Number already registered" / "numero già registrato" | Il numero è già usato da WhatsApp o da un altro Business Manager | Elimina l'account WhatsApp da quel numero, oppure usa "unlink this phone number" nel Business Manager |
| Non ricevi l'SMS di verifica | Numero VoIP o virtuale non accettato | Usa un numero mobile reale, o scegli la verifica con chiamata vocale |
| Il canale resta "offline" con l'app Android | Telefono spento, senza internet, o Android ha chiuso l'app | Disattiva il risparmio energetico per l'app Picky Assist e tieni il telefono collegato alla corrente |
| Non vedi il canale tra le opzioni | Il tuo piano non lo include | Verifica il piano attivo nel pannello |
| "Please Upgrade The Plan To Activate…" | Il canale richiede un piano superiore o un add-on | Vedi la sezione qui sopra |
| `[403] Credito insufficiente nel wallet` | Wallet Picky Assist a zero (canale gestito) | Ricarica il credito dal pannello |

Se sei bloccato su una di queste, il supporto Picky Assist risponde a
**support@pickyassist.com** e conosce il tuo account meglio di chiunque altro.

---

### Nota: il pannello ha già uno strumento per le campagne

Picky Assist include il **Broadcaster**, che manda campagne caricando un file
dei contatti direttamente dal sito, senza scrivere una riga di codice. Per le
prime campagne è la via più semplice.

Il codice di questo repository serve quando vuoi **automatizzare**: far partire i
messaggi dal tuo gestionale, dal sito o da un programma tuo, senza passare ogni
volta dal pannello. Le due cose convivono: stesso account, stesso canale.

---

## Fase 2 — Prendere il token API

1. Nel pannello: **Settings → Developers → API**.
2. Crea un token e copialo.
3. Il token è come una password: non va scritto nei file del progetto, non va
   mandato in chat e non va messo su GitHub. Se succede, va rigenerato.

---

## Fase 3 — Preparare il computer

Serve **Python 3** (versione 3.8 o successiva).

Per sapere se ce l'hai già, apri il Terminale (su Mac: *Applicazioni →
Utility → Terminale*; su Windows: *Prompt dei comandi*) e scrivi:

```bash
python3 --version
```

Se risponde con un numero (es. `Python 3.11.4`) sei a posto. Se dice che il
comando non esiste, scarica Python da <https://www.python.org/downloads/> e
installalo (su Windows, durante l'installazione, spunta **"Add Python to PATH"**).

Poi scarica il progetto:

```bash
git clone https://github.com/aki1806-droid/Prove.git
cd Prove
```

---

## Fase 4 — Il primo messaggio di prova

1. Metti il token nell'ambiente (sostituisci con il tuo):

   ```bash
   export PICKY_API_TOKEN="il-tuo-token"
   ```

   Su Windows (Prompt dei comandi) il comando è invece:

   ```cmd
   set PICKY_API_TOKEN=il-tuo-token
   ```

2. Invia un messaggio al tuo stesso numero, così vedi subito se arriva.
   Il numero va scritto con il prefisso internazionale e senza `+`:
   `393331234567`.

   ```bash
   python3 examples/invia_messaggio.py 393331234567 "Prova da Picky Assist"
   ```

3. Cosa può rispondere il programma:

   | Messaggio a schermo | Significato | Cosa fare |
   | --- | --- | --- |
   | `Richiesta accettata, push_id=...` | Tutto ok, il messaggio è partito | Controlla WhatsApp |
   | `[401] Autenticazione fallita` | Token sbagliato o revocato | Ricopia il token dal pannello |
   | `[403] Credito insufficiente` | Account senza credito | Ricarica dal pannello |
   | `[404] Impossibile comunicare con il telefono` | Canale WhatsApp non connesso (strada A o B) | Riapri l'app sul telefono e controlla che il canale sia online |
   | `Errore di comunicazione` | Problema di rete | Controlla la connessione |

Gli script usano già il canale gestito (codice 121). Per usarne un altro basta
l'opzione `--canale` in `examples/campagna.py` (`whatsapp-managed`,
`whatsapp-official`, `whatsapp-cloud`, `whatsapp-personal`, `whatsapp-business`,
`whatsapp-web`, `sms`).

---

## Verifica: il collegamento funziona davvero?

### Controllo dal pannello (bastano due minuti, anche dal telefono)

1. **Settings → Channels**: il numero deve risultare **connesso**, con WABA ID e
   phone number ID visibili. Se è "pending" o "disconnected", il collegamento non
   è completo.
2. **Wallet / Billing**: ci deve essere credito. A zero, l'invio si ferma.
3. **Templates**: serve almeno un template con stato **approvato**. Senza, puoi
   scrivere solo a chi ti ha contattato nelle ultime 24 ore.
4. **Prova sul campo**: scrivi "ciao" al numero aziendale dal tuo WhatsApp
   personale. Il messaggio deve comparire nell'inbox di Picky Assist. È la prova
   che la ricezione funziona. Rispondi dall'inbox: se la risposta ti arriva sul
   telefono, funziona anche l'invio.

### Controllo automatico (dal computer)

```bash
export PICKY_API_TOKEN="il-tuo-token"
python3 examples/verifica.py 393331234567          # il tuo numero personale
```

Controlla in sequenza token, invio e consegna, e a ogni errore spiega la causa e
cosa fare. Esempio di esito positivo:

```
[OK   ] Token API
[OK   ] Invio
         Richiesta accettata da Picky Assist (push_id 12345).
[OK   ] Consegna
         393331234567: Inviato al canale

Tutto a posto: la connessione funziona e il messaggio è partito.
```

Se il canale rifiuta il testo libero, è il comportamento previsto per WhatsApp
ufficiale: o scrivi prima tu al numero aziendale (e allora hai 24 ore di tempo),
oppure usi un template approvato:

```bash
python3 examples/verifica.py 393331234567 --template VG7935
```

---

## Fase 5 — La prima campagna

Quando il messaggio singolo funziona, si passa agli invii massivi.

### 1. Prepara la lista

Un file CSV (si crea con Excel o Fogli Google, poi *Salva come → CSV*) con una
riga di intestazione. La colonna `numero` è obbligatoria, le altre servono per
personalizzare il messaggio:

```csv
numero,nome,ordine
393331111111,Mario,A-1001
393332222222,Lucia,A-1002
```

Trovi un file di esempio in `examples/contatti_esempio.csv`.

Tieni anche un file con i numeri di chi ha chiesto di non essere più contattato
(uno per riga, vedi `examples/esclusi_esempio.txt`): va passato a ogni campagna,
ed è un obbligo di legge oltre che la cosa che protegge la reputazione del tuo
numero.

### 2. Fai la prova a vuoto

**Non parte nulla e non si spende credito**: serve a vedere i messaggi veri,
con i nomi già sostituiti.

```bash
python3 examples/campagna.py examples/contatti_esempio.csv \
    --messaggio "Ciao {nome}, il tuo ordine {ordine} è pronto" \
    --esclusi examples/esclusi_esempio.txt
```

Quello che c'è tra graffe (`{nome}`, `{ordine}`) viene sostituito con la colonna
corrispondente del CSV. Il programma mostra un'anteprima dei primi messaggi,
segnala i numeri scartati (non validi, duplicati, in lista esclusi) e scrive un
riepilogo in `esito_campagna.csv`.

### 3. Invia davvero

Si aggiunge `--invia`. Con un template approvato (obbligatorio sul canale
ufficiale se sei tu a scrivere per primo) si usa `--template` con l'ID che
Picky Assist mostra nella sezione Template, e `--variabili` con i nomi delle
colonne nell'ordine in cui compaiono nel template:

```bash
python3 examples/campagna.py contatti.csv \
    --template VG7935 --variabili nome,ordine \
    --esclusi esclusi.txt --report report.csv --invia
```

Consigli pratici per la prima volta:

- parti da **una lista piccola** (10-20 numeri tuoi o di colleghi) e guarda i
  messaggi arrivare davvero prima di lanciare la campagna vera;
- l'invio va a lotti da 100 con una pausa tra un lotto e l'altro; puoi cambiarli
  con `--lotto` e `--pausa`;
- se un lotto fallisce la campagna **non si ferma**: l'errore finisce nel file di
  esito, con l'elenco dei numeri rimasti fuori, così puoi rimandare solo quelli
  senza scrivere due volte a chi ha già ricevuto;
- con `--report` scarichi gli stati di consegna in un CSV.

---

## Fase 6 — Ricevere i messaggi (facoltativo, più avanti)

Serve solo se vuoi che il tuo programma **risponda** ai messaggi in arrivo.
Richiede un indirizzo pubblico su internet (un piccolo server, oppure un tunnel
tipo ngrok per fare prove dal tuo computer). Ne riparliamo quando la Fase 4
funziona: è il passo successivo, non serve subito.

---

## In sintesi

1. Canale scelto: **WhatsApp Official Managed** (niente Business Manager, niente email aziendale)
2. Collegare il canale nel pannello: Settings → Channels → WhatsApp Official Managed Service
3. Caricare il credito nel wallet e far approvare il primo template
4. Creare il token API
5. Installare Python e scaricare il progetto
6. Inviare un messaggio di prova a te stesso
7. Campagna: prova a vuoto, poi invio vero su lista piccola, poi lista completa
8. Solo dopo: ricevere messaggi e automazioni

I dettagli tecnici della libreria sono nel [README](README.md); per usarla non
serve leggerlo tutto.
