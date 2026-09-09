# Formato del manoscritto

## La cartella-libro

```
libri/<slug>/
├── libro.json          metadati
├── manoscritto/        i capitoli, in ordine alfabetico di nome file
│   ├── 00-prefazione.md
│   ├── 01-primo-capitolo.md
│   └── ...
└── risorse/            copertina e immagini
    └── copertina.png
```

L'ordine dei capitoli è l'ordine alfabetico dei nomi dei file: per questo si
numerano (`01-`, `02-`, ...). Lascia dei buchi nella numerazione se pensi di
inserire capitoli in mezzo.

## `libro.json`

| Campo | Obbligatorio | Note |
| --- | --- | --- |
| `titolo` | sì | come apparirà su KDP |
| `autore` | sì | nome che compare in copertina |
| `lingua` | sì | codice BCP 47: `it`, `en`, `es`, ... |
| `sottotitolo` | no | finisce nei metadati e nel frontespizio |
| `autore_ordinamento` | no | `Cognome, Nome`, per l'ordinamento in libreria |
| `editore` | no | |
| `descrizione` | no | la scheda del libro |
| `diritti` | no | es. `© 2026 Nome Cognome` |
| `data_pubblicazione` | no | `AAAA-MM-GG`, predefinita: oggi |
| `parole_chiave` | no | elenco di stringhe |
| `identificativo` | no | ISBN (`urn:isbn:...`) o altro; se manca ne viene derivato uno stabile da titolo e autore |
| `copertina` | no | predefinita: `risorse/copertina.png` |
| `tipografia` | no | `false` disattiva la ripulitura tipografica |

## Markdown riconosciuto

```markdown
# Titolo del capitolo      obbligatorio, uno per file, apre il capitolo
## Sezione
### Sottosezione

Righe consecutive         formano un solo paragrafo
                          una riga vuota apre il paragrafo successivo

*corsivo*  _corsivo_  **grassetto**  `codice`

> Citazione su
> più righe

- elenco puntato
1. elenco numerato

---                       stacco di scena

[testo](https://...)      collegamento
![alt](risorse/foto.png)  immagine, percorso relativo alla cartella-libro
\*                        la barra rovesciata protegge il carattere seguente
```

Non sono supportati tabelle, elenchi annidati, blocchi di codice e HTML
grezzo. È una scelta: un manoscritto che ne ha bisogno non è un libro da
leggere in sequenza, ed è meglio impaginarlo con altro.

## Ripulitura tipografica

Con `"tipografia": true` (predefinito) il testo viene adattato all'uso
italiano durante la conversione:

| Scrivi | Ottieni |
| --- | --- |
| `"virgolette"` | «virgolette» |
| `l'apostrofo` | l’apostrofo |
| `--` | – (lineetta media) |
| `---` *dentro una riga di testo* | — (lineetta lunga) |
| `...` | … |

Attenzione: `---` **da solo su una riga** resta uno stacco di scena, non
diventa una lineetta.
