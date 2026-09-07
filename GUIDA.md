# Guida passo passo

Scritta per chi non programma. Non serve capire il codice: serve solo
copiare quattro valori da due siti web e incollarli dove te li chiedo.

Tempo richiesto: circa mezz'ora la prima volta.

Se qualcosa non torna, salta alla sezione **Quando qualcosa non funziona**
in fondo.

---

## Cosa stiamo per fare

Il bot vive sul tuo computer. WhatsApp, che sta su internet, deve poterlo
raggiungere. Quindi servono tre cose:

1. Un'**app su Meta**, che è ciò che dà al tuo bot il permesso di usare WhatsApp.
2. Una **chiave Claude**, che è ciò che fa scrivere le risposte.
3. Un **indirizzo pubblico** per il tuo computer, perché WhatsApp possa bussare.

Le prime due sono clic su siti web. La terza è un comando che ti do io.

---

## Passo 1 — Installare gli strumenti

Ti servono due programmi. Installali una volta sola.

**Node.js**: vai su [nodejs.org](https://nodejs.org) e scarica la versione LTS
(il pulsante di sinistra). Installalo come qualsiasi altro programma.

**ngrok**: vai su [ngrok.com/download](https://ngrok.com/download), crea un
account gratuito e segui le istruzioni per il tuo sistema. Serve a dare un
indirizzo pubblico al tuo computer.

Poi apri il **Terminale** (su Mac lo trovi cercando "Terminale"; su Windows
cerca "PowerShell"), vai nella cartella del progetto e scrivi:

```
npm install
```

Vedrai scorrere del testo per un minuto. È normale.

---

## Passo 2 — Creare l'app su Meta

Vai su [developers.facebook.com/apps](https://developers.facebook.com/apps) e
accedi con il tuo account Facebook.

1. Premi **Crea app**.
2. Alla domanda su cosa vuoi fare, scegli **Altro**, poi **Business**.
3. Dai un nome all'app (quello che vuoi, per esempio "Bot assistenza") e conferma.
4. Nella schermata dei prodotti, cerca il riquadro **WhatsApp** e premi
   **Configura**.
5. Se ti chiede di collegare un account business, creane uno nuovo. È gratuito.

Ora hai un'app. Ti servono due valori da qui.

### I valori dell'app

Nel menu a sinistra: **Impostazioni app** → **Di base**.

- **ID app**: il numero lungo in cima alla pagina. Copialo da parte.
- **Chiave segreta**: poco sotto. Premi **Mostra**, inserisci di nuovo la tua
  password Facebook se te la chiede, e copiala.

> Non condividere la chiave segreta con nessuno e non incollarla in email o
> chat. Chi la possiede può fingersi il tuo bot.

### I valori del numero

Nel menu a sinistra: **WhatsApp** → **Configurazione API**.

Qui Meta ti regala un numero di prova. Ti servono due cose da questa pagina:

- **ID numero di telefono**: il codice numerico sotto la voce "Da".
  Attenzione: è il codice, **non** il numero di telefono scritto accanto.
- **Token di accesso temporaneo**: il riquadro in alto, con un pulsante per
  copiarlo. Dura 24 ore, il che per provare va benissimo.

Nella stessa pagina, più in basso, c'è **"A"** con un pulsante per aggiungere
un numero destinatario: **aggiungi il tuo numero di cellulare**. Il numero di
prova può scrivere solo ai numeri registrati qui.

---

## Passo 3 — La chiave di Claude

Vai su [console.anthropic.com](https://console.anthropic.com), crea un account
e aggiungi del credito (bastano pochi euro per migliaia di risposte).

Poi in **Settings → API Keys**, premi **Create Key**, dai un nome e copia la
chiave che compare. Inizia con `sk-ant-`.

> La chiave viene mostrata una volta sola. Se la perdi, ne generi un'altra.

---

## Passo 4 — Dare i valori al bot

Nel Terminale, dalla cartella del progetto:

```
npm run setup
```

Ti chiederà i quattro valori che hai raccolto, uno alla volta, dicendoti dove
trovarli. Dopo ognuno controlla che funzioni davvero: se hai copiato male, te
lo dice subito e ti spiega cosa correggere.

Alla fine scrive un file con le tue credenziali e ti mostra l'ultimo passo.
**Lascia il Terminale aperto**: ti servirà fra poco un valore che ha stampato.

---

## Passo 5 — Accendere il bot

Servono due finestre di Terminale aperte insieme.

**Nella prima**, avvia il bot:

```
npm run dev
```

Deve restare aperta. Vedrai una riga che dice `in ascolto`.

**Nella seconda**, apri l'indirizzo pubblico:

```
ngrok http 3000
```

ngrok mostra una riga `Forwarding` con un indirizzo tipo
`https://abc123.ngrok-free.app`. Copialo.

---

## Passo 6 — Collegare WhatsApp al bot

Torna nel pannello Meta: **WhatsApp** → **Configurazione** → sezione
**Webhook**, e premi **Modifica**.

Compila i due campi:

- **URL di callback**: l'indirizzo di ngrok con `/webhook` aggiunto in fondo.
  Esempio: `https://abc123.ngrok-free.app/webhook`
- **Token di verifica**: il valore che `npm run setup` ha stampato alla fine.

Premi **Verifica e salva**. Se il bot è acceso, la finestra si chiude senza
errori.

**Poi il passaggio che quasi tutti dimenticano**: nella lista di campi che
appare sotto, cerca la riga **`messages`** e premi **Iscriviti**.

Senza questa iscrizione l'indirizzo risulta salvato ma non arriverà mai
nessun messaggio.

---

## Passo 7 — La prova

Prendi il telefono e scrivi un messaggio al numero di prova (lo trovi in
**WhatsApp → Configurazione API**, sotto "Da").

Se risponde, hai finito.

---

## Quando qualcosa non funziona

Prima cosa da provare, sempre:

```
npm run doctor
```

Controlla le credenziali una per una e dice quale è il problema.

Per verificare che il bot riesca a scrivere, senza aspettare un messaggio in
arrivo (metti il tuo numero, con il prefisso internazionale e senza il `+`):

```
npm run doctor -- --messaggio 393331234567
```

### Problemi frequenti

**"Verifica e salva" dà errore.**
Il bot non è acceso, oppure il token di verifica non combacia. Controlla che la
finestra con `npm run dev` sia ancora aperta e che ngrok stia girando.

**Ho scritto al numero ma non risponde niente.**
Quasi sempre manca l'iscrizione al campo `messages` del passo 6. Ricontrolla.

**Ha funzionato ieri, oggi no.**
Il token di Meta dura 24 ore. Prendine uno nuovo da **WhatsApp →
Configurazione API** e rilancia `npm run setup`.

**Ho chiuso e riaperto ngrok e non funziona più.**
Nella versione gratuita ngrok cambia indirizzo a ogni avvio. Copia il nuovo
indirizzo e rifai il passo 6.

**Risponde a me ma non ai miei clienti.**
Il numero di prova scrive solo ai numeri registrati nella lista "A". Per
scrivere a chiunque serve un numero reale: vedi
[`docs/whatsapp-setup.md`](docs/whatsapp-setup.md), sezione *Passare in
produzione*.

---

## Una cosa importante sulle regole

Da gennaio 2026 Meta non permette assistenti AI generici su WhatsApp: il bot
deve servire la **tua attività** — rispondere sulle tue cose, i tuoi orari, i
tuoi prodotti.

Un bot che risponde a qualsiasi domanda su qualsiasi argomento viola le regole
e può far disattivare il numero. Il testo che guida le risposte del bot
(in `src/config.ts`) è scritto per restare dalla parte giusta: se lo modifichi,
tienilo sulle cose della tua attività.
