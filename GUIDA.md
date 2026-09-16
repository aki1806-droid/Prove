# Guida passo passo: collegare Picky Assist

Guida in italiano semplice. Si parte da zero e si arriva al primo messaggio
inviato dal computer.

L'ordine conta: **prima si collega WhatsApp dentro Picky Assist**, e solo dopo
ha senso usare il codice di questo repository. Se WhatsApp non è collegato, il
codice riceve un errore e non c'è modo di farlo funzionare.

---

## Fase 1 — Collegare WhatsApp a Picky Assist

Picky Assist offre tre strade diverse per collegare WhatsApp. **Non sono
alternative equivalenti**: hanno requisiti molto diversi, ed è qui che quasi
tutti si bloccano. Scegline una.

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

### Se WhatsApp non si collega: errori più comuni

| Cosa vedi | Causa | Soluzione |
| --- | --- | --- |
| La procedura Facebook si blocca o chiede un'altra email | Hai usato una email personale (Gmail, Hotmail…) | Serve una email con dominio aziendale |
| "Number already registered" / "numero già registrato" | Il numero è già usato da WhatsApp o da un altro Business Manager | Elimina l'account WhatsApp da quel numero, oppure usa "unlink this phone number" nel Business Manager |
| Non ricevi l'SMS di verifica | Numero VoIP o virtuale non accettato | Usa un numero mobile reale, o scegli la verifica con chiamata vocale |
| Il canale resta "offline" con l'app Android | Telefono spento, senza internet, o Android ha chiuso l'app | Disattiva il risparmio energetico per l'app Picky Assist e tieni il telefono collegato alla corrente |
| Non vedi il canale tra le opzioni | Il tuo piano non lo include | Verifica il piano attivo nel pannello |

Se sei bloccato su una di queste, il supporto Picky Assist risponde a
**support@pickyassist.com** e conosce il tuo account meglio di chiunque altro.

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

## Fase 5 — Ricevere i messaggi (facoltativo, più avanti)

Serve solo se vuoi che il tuo programma **risponda** ai messaggi in arrivo.
Richiede un indirizzo pubblico su internet (un piccolo server, oppure un tunnel
tipo ngrok per fare prove dal tuo computer). Ne riparliamo quando la Fase 4
funziona: è il passo successivo, non serve subito.

---

## In sintesi

1. Collegare WhatsApp nel pannello Picky Assist ← **il punto in cui ci si blocca di solito**
2. Creare il token API
3. Installare Python e scaricare il progetto
4. Inviare un messaggio di prova a te stesso
5. Solo dopo: ricevere messaggi e automazioni

I dettagli tecnici della libreria sono nel [README](README.md); per usarla non
serve leggerlo tutto.
