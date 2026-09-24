# prove

Produzione delle video-lezioni del corso **Progressione verticale · Comparto Sanità**
(CISL FP Padova Rovigo), col metodo di `docs/MASTER.md`: slide animate + voce, montate su HeyGen.

## Struttura

- `docs/` — MASTER (metodo e codice), STANDARD del corso, STRUTTURA dei 13 moduli
- `progetti/mX-lX.Y-nome/` — una cartella per lezione; il `REGISTRO.md` di ciascuna dice
  com'è andata e cosa resta da verificare
- `nuova-lezione.sh` — impianta la lezione successiva copiando dall'ultima fatta

Lezioni fatte. Modulo 1 completo (voce Luca Ward `eleven_v3`; durate del video HeyGen):

| lezione | titolo | durata |
|---|---|---|
| 1.1 | Dalla 833 alla crisi | 8:02 |
| 1.2 | L'aziendalizzazione | 7:37 |
| 1.3 | Indirizzo, gestione e quasi-mercato | 7:12 |
| 1.4 | Accreditamento e libertà di scelta | 7:12 |
| 1.5 | I livelli essenziali di assistenza | 7:25 |
| 1.6 | Governance e finanziamento | 7:10 |

Modulo 2 completo, Il sistema sanitario regionale del Veneto (stessa voce e stesso metodo):

| lezione | titolo | durata |
|---|---|---|
| 2.1 | I quattro nodi della riforma | 7:45 |
| 2.2 | I sei principi ispiratori | 8:00 |
| 2.3 | Azienda Zero e la governance regionale | 7:40 |
| 2.4 | La nuova geografia sanitaria | 8:00 |
| 2.5 | La rete ospedaliera hub and spoke | 7:33 |
| 2.6 | Il distretto potenziato | 7:22 |
| 2.7 | Ospedali di comunità, cronicità, fragilità | 7:26 |

Modulo 3 completo, Legislazione socio-sanitaria del Veneto (stessa voce e stesso metodo,
più grafica originale):

| lezione | titolo | durata |
|---|---|---|
| 3.1 | Radici del modello veneto | 7:56 |
| 3.2 | L.R. 56/1994: il riordino | 7:20 |
| 3.3 | Organi, distretti e dipartimenti | 7:42 |
| 3.4 | L.R. 55/1994: programmare e rendere conto | 7:10 |
| 3.5 | Budget, controlli e i tre principi guida | 7:11 |

Dal modulo 3 ogni lezione ha `slide/illustra.mjs`: illustrazioni SVG originali animate
(territorio, municipio, ospedale, casa, radici, bivio, documento, bilancio, calendario,
stretta di mano, lente, livelli, incastro, università, tavolo, comunità) e i tipi di slide
`illustrata`, `flusso`, `ciclo`, `rete`, `contatore`, `sigla`. Le clip durano quanto il blocco
audio, così l'animazione continua per tutta la scena. `nuova-lezione.sh` copia anche
`illustra.mjs`; per la lezione successiva si parte dalla 3.5. Nel modulo 3 i testi delle
L.R. 55 e 56 del 1994 non sono stati consultati (vedi i REGISTRO, «Da verificare»).

Modulo 4 completo, Organizzazione aziendale sanitaria e AOUPD (stessa voce e stesso metodo):

| lezione | titolo | durata |
|---|---|---|
| 4.1 | L'azienda sanitaria e le sue autonomie | 7:43 |
| 4.2 | L'AOUPD e le tre missioni | 7:34 |
| 4.3 | Atto aziendale e direzione strategica | 7:05 |
| 4.4 | Dipartimenti e unità operative | 7:17 |
| 4.5 | Governo clinico e continuità assistenziale | 7:29 |

Nel modulo 4 `illustra.mjs` passa a 22 illustrazioni: si aggiungono microscopio, organigramma,
azienda, missioni, percorso e scudo; per la lezione successiva si parte dalla 4.5. La fonte
prevista dal piano, `Organizzazione-Aziendale-Sanitaria-e-AOUPD.pdf`, non era disponibile: il
modulo è costruito sulla dispensa CISL FP (Galiazzo), sull'atto aziendale dell'ULSS 5 Polesana,
sul PSSR 2019-2023 e su sintesi di ricerca per l'AOUPD (vedi i REGISTRO, «Da verificare»).

## Come si lavora

- Il branch principale è `main`.
- Ogni modifica in un branch dedicato, poi pull request su `main`.
- `pip install imageio-ffmpeg Pillow`; playwright e Chromium sono già nell'ambiente.
