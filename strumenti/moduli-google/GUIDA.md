# Generatore di moduli Google – CISL FP Padova Rovigo

Un foglio Google che crea Google Moduli: ogni scheda del foglio è un modulo.
Si scrivono le domande come righe di una tabella e dal menu si sceglie «Crea il modulo».

## Installazione (una volta sola, 3 minuti)

1. Apri **sheets.new** e crea un foglio nuovo. Chiamalo per esempio «Generatore moduli CISL FP».
2. Menu **Estensioni → Apps Script**.
3. Cancella quello che c'è nella pagina e incolla tutto il contenuto di `Generatore.gs`.
   Puoi copiarlo da qui: https://raw.githubusercontent.com/aki1806-droid/Prove/claude/relaxed-albattani-01536v/strumenti/moduli-google/Generatore.gs
4. Premi l'icona del dischetto (Salva). Poi chiudi la scheda di Apps Script.
5. Torna al foglio e ricaricalo. In alto compare il menu **Moduli CISL FP**.
6. La prima volta che usi il menu, Google chiede l'autorizzazione:
   **Continua → scegli il tuo account → Avanzate → Vai a … (non sicuro) → Consenti**.
   Lo dice «non sicuro» solo perché lo script l'hai creato tu e non è pubblicato: legge
   questo foglio e crea i moduli nel tuo Drive, nient'altro.

## Il sondaggio pre-assemblea

1. Menu **Moduli CISL FP → Esempio: sondaggio pre-assemblea 7 dicembre**: compare la scheda già compilata.
2. Rileggi le domande e cambia quello che vuoi.
3. Menu **Moduli CISL FP → Crea il modulo da questa scheda**.
4. Nelle righe gialle in alto trovi il link da condividere (anche in versione breve, forms.gle/…)
   e quello per modificarlo. Le risposte arrivano in una nuova scheda dello stesso foglio.

## Un modulo nuovo

**Nuova scheda vuota** dal menu (oppure duplica una scheda esistente), compila, **Crea il modulo**.

| Tipo | Che cosa crea | Colonna OPZIONI |
|---|---|---|
| SEZIONE | una nuova pagina del modulo, con titolo e testo | – |
| TITOLO | un titolo con testo, sulla stessa pagina | – |
| BREVE | risposta su una riga | – (FORMATO: EMAIL, NUMERO, TELEFONO) |
| LUNGA | risposta libera su più righe | – |
| SCELTA | una sola risposta | `Sì; No; Altro` |
| MULTIPLA | più risposte | `A; B; C` (MAX SCELTE per il limite) |
| ELENCO | menu a tendina | `A; B; C` |
| SCALA | da 1 a 5 (o 10) | `1; 5; Per niente; Molto` |
| DATA / ORA | una data / un orario | – |
| CONSENSO | una casella da spuntare | il testo del consenso |

- Le opzioni si separano con il punto e virgola.
- Scrivere **Altro** come ultima opzione aggiunge la casella libera «Altro».
- OBBLIGATORIA: SI o NO.
- Il generatore crea sempre un modulo nuovo; quelli già creati restano nel Drive e si possono
  ritoccare a mano in Google Moduli (colori, immagine di testata).

Cose che il generatore non fa, e si fanno a mano in Google Moduli se servono:
il colore e l'immagine di testata, le domande che portano a sezioni diverse in base alla risposta,
il limite di una risposta per persona (richiede l'accesso con account Google).
