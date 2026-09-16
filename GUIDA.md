# Guida passo passo: collegare Picky Assist

Guida in italiano semplice. Si parte da zero e si arriva al primo messaggio
inviato dal computer.

L'ordine conta: **prima si collega WhatsApp dentro Picky Assist**, e solo dopo
ha senso usare il codice di questo repository. Se WhatsApp non è collegato, il
codice riceve un errore e non c'è modo di farlo funzionare.

---

## Se l'obiettivo sono campagne e invii massivi

Questa è la scelta più importante di tutte, quindi va fatta prima di ogni altra cosa.

**Per le campagne serve WhatsApp Cloud API (il canale ufficiale di Meta). È
l'unica strada che regge gli invii massivi.**

Le altre due strade (app Android e WhatsApp Web) funzionano pilotando un
WhatsApp normale: vanno benissimo per rispondere ai clienti o per qualche
decina di messaggi, ma usarle per le campagne porta quasi sempre allo stesso
risultato, cioè **il numero bannato da WhatsApp**. Non è un limite di Picky
Assist: è WhatsApp che rileva l'invio automatico di massa da un'app non
ufficiale e blocca il numero, spesso in modo definitivo. Ci sono anche i limiti
pratici: telefono sempre acceso, poche decine di messaggi all'ora, nessun report
di consegna affidabile.

Con il canale ufficiale invece gli invii massivi sono previsti e supportati.
In cambio ci sono tre regole di Meta da conoscere **prima** di partire:

1. **Template approvati.** A chi non ti ha scritto nelle ultime 24 ore puoi
   mandare solo messaggi da un modello approvato in anticipo da Meta
   (l'approvazione richiede da pochi minuti a qualche ora). Il testo libero vale
   solo nelle 24 ore successive a un messaggio del cliente.
2. **Consenso (opt-in).** Puoi scrivere solo a chi ha acconsentito a essere
   contattato. Liste comprate o raccolte senza consenso fanno crollare la
   reputazione del numero — e in Europa sono anche una violazione del GDPR.
3. **Limiti giornalieri progressivi.** Si parte da 1.000 destinatari diversi
   nelle 24 ore. Se le persone non bloccano e non segnalano, il limite sale in
   automatico (10.000, poi oltre) nel giro di qualche settimana. Se troppi
   bloccano, scende.

In pratica: **chi riceve deve aspettarsi il tuo messaggio**. È questo che
determina se la tua campagna funziona o se il numero viene penalizzato.

---

## Fase 1 — Collegare WhatsApp a Picky Assist

Picky Assist offre tre strade diverse per collegare WhatsApp. **Non sono
alternative equivalenti**: hanno requisiti molto diversi, ed è qui che quasi
tutti si bloccano. Per le campagne, come detto sopra, la strada è la C.

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

### "Please Upgrade The Plan To Activate The Cloud Channel"

Se in cima alla pagina dei canali compare questa fascia gialla, **il canale
Cloud non è attivabile con il piano in corso**: non è un errore di
configurazione e non c'è nulla da sistemare nei dati inseriti. Serve un piano a
pagamento.

I piani Picky Assist (prezzi indicativi, da verificare su
<https://pickyassist.com/en/compare-plans>): Basic ~14 $/mese, Pro ~29 $/mese,
API Only ~34 $/mese, Ultimate ~49 $/mese. Un canale WhatsApp Cloud API è
compreso nei piani; per collegare più numeri serve il piano Ultimate.

Attenzione: sono **due spese separate**.

1. L'abbonamento a Picky Assist (la piattaforma).
2. I messaggi, che **Meta fattura direttamente a te**: si collega una carta al
   Business Manager. Ogni Business Manager ha circa 1.000 conversazioni gratuite
   al mese, poi si paga a conversazione, con tariffe diverse per paese e per tipo
   (marketing, assistenza, autenticazione).

Prima di pagare conviene scrivere al supporto (**support@pickyassist.com**) e
farsi confermare qual è il piano meno caro che attiva il canale Cloud API per il
tuo caso: la risposta arriva in genere in un giorno lavorativo ed evita di
scegliere il piano sbagliato.

### Se WhatsApp non si collega: errori più comuni

| Cosa vedi | Causa | Soluzione |
| --- | --- | --- |
| La procedura Facebook si blocca o chiede un'altra email | Hai usato una email personale (Gmail, Hotmail…) | Serve una email con dominio aziendale |
| "Number already registered" / "numero già registrato" | Il numero è già usato da WhatsApp o da un altro Business Manager | Elimina l'account WhatsApp da quel numero, oppure usa "unlink this phone number" nel Business Manager |
| Non ricevi l'SMS di verifica | Numero VoIP o virtuale non accettato | Usa un numero mobile reale, o scegli la verifica con chiamata vocale |
| Il canale resta "offline" con l'app Android | Telefono spento, senza internet, o Android ha chiuso l'app | Disattiva il risparmio energetico per l'app Picky Assist e tieni il telefono collegato alla corrente |
| Non vedi il canale tra le opzioni | Il tuo piano non lo include | Verifica il piano attivo nel pannello |
| "Please Upgrade The Plan To Activate The Cloud Channel" | Il canale Cloud richiede un piano a pagamento | Vedi la sezione qui sopra |

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

Se il canale usato non è WhatsApp Official, apri `examples/invia_messaggio.py`
e cambia `Application.WHATSAPP_OFFICIAL` con il canale giusto: `WHATSAPP_PERSONAL`
(app Android), `WHATSAPP_BUSINESS`, `WHATSAPP_WEB` o `WHATSAPP_CLOUD_API`.

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

1. Per le campagne: scegliere **WhatsApp Cloud API**, le altre strade fanno bannare il numero
2. Collegare il canale nel pannello Picky Assist ← **il punto in cui ci si blocca di solito**
3. Creare il token API
4. Installare Python e scaricare il progetto
5. Inviare un messaggio di prova a te stesso
6. Campagna: prova a vuoto, poi invio vero su lista piccola, poi lista completa
7. Solo dopo: ricevere messaggi e automazioni

I dettagli tecnici della libreria sono nel [README](README.md); per usarla non
serve leggerlo tutto.
