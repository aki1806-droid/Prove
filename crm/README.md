# Cordata CRM

Gestionale tutto-in-uno dimostrativo per piccole imprese: contatti, pipeline di
vendita, casella conversazioni, calendario con prenotazioni online, automazioni,
moduli e pagine, corsi con comunità. È un progetto originale, costruito per
coprire le stesse aree funzionali delle piattaforme "tutto in uno" per PMI.

Non c'entra con la produzione dei video del canale: sta in questa cartella e
basta.

## Avvio

Serve Node 22.5 o successivo. Non c'è niente da installare.

    cd crm
    npm start

Poi si apre <http://localhost:3000>. Al primo avvio il database
(`crm/data/cordata.db`, SQLite) viene riempito con dati di esempio; il pulsante
«Ripristina dati di esempio» in basso a sinistra lo riporta a quello stato.
`PORT` cambia la porta, `CRM_DATA_DIR` la cartella del database.

## Cosa c'è

| Modulo | Cosa fa |
|---|---|
| Dashboard | Numeri del giorno, pipeline per fase, provenienza dei contatti, appuntamenti, attività, ultimi movimenti |
| Contatti | Anagrafica con ricerca e tag, scheda con cronologia, note, opportunità, appuntamenti, attività |
| Pipeline | Bacheca a colonne con trascinamento, fasi modificabili, totali per fase |
| Conversazioni | Casella condivisa per canale, non letti, operatore assegnato |
| Calendario | Settimana, tipi di prenotazione con pagina pubblica e orari liberi calcolati |
| Automazioni | Evento di partenza + passi in ordine (messaggio, attesa, condizione, tag, assegnazione, attività, cambio fase, notifica), registro delle esecuzioni |
| Moduli e pagine | Costruttore di moduli e di pagine a blocchi; chi compila diventa un contatto |
| Corsi e comunità | Lezioni, iscritti con avanzamento, area riservata con collegamento personale, bacheca |

Pagine viste dai clienti: `/p/prenota/<calendario>`, `/p/modulo/<modulo>`,
`/p/pagina/<pagina>`, `/p/area/<codice di accesso>`.

## Limiti di questa versione

- **I canali non sono collegati.** I messaggi restano nel CRM: non partono su
  WhatsApp, email o SMS. Il punto in cui agganciarli è `message()` in
  `automations.js`.
- **Non c'è accesso con password.** Chiunque raggiunga l'indirizzo vede tutto:
  va bene sul proprio computer, non su un server pubblico.
- **Un'azienda sola**, senza ruoli: l'operatore si sceglie da un menu.
- Le attese delle automazioni sono reali (minuti, ore, giorni); per le prove
  c'è «Salta l'attesa» nel registro delle esecuzioni.

## File

- `server.js` — server HTTP, API, regole (prenotazioni, moduli, pipeline)
- `automations.js` — motore delle automazioni
- `db.js` — schema e dati di esempio
- `public/` — interfaccia (`app.js`) e pagine pubbliche (`public.js`)
