# Registro — Modulo 15 · micro-lezione 15.10 «Il turno della terapia: quattro trappole»

Decima lezione del Modulo 15: non un paziente, ma un turno di mattina in medicina con quattro trappole nella terapia, in cui l'infermiere è l'ultima barriera fra l'errore e il danno. Alle 8 il cloruro di potassio prescritto in bolo, che non si esegue (Raccomandazione 1, responsabilità della lezione 1.5); alle 10 l'eparina in pompa a 20 ml/h invece di 2 ml/h, con il calcolo scritto a schermo, le azioni (fermare, medico, sanguinamento, aPTT, protamina) e la prevenzione (doppio controllo, librerie delle pompe); alle 13 la depressione respiratoria da morfina nel signor Rino, con il naloxone a piccole dosi titolate, la durata più breve dell'antidoto e la sedazione che precede la bradipnea, più le regole sugli stupefacenti; alle 15 la reazione emolitica acuta da incompatibilità AB0, con le otto azioni in ordine e l'evento sentinella della Raccomandazione 5. Poi il filo comune dei farmaci ad alto livello di attenzione, le giuste regole e la domanda del paziente, gli errori da evitare, che cosa si fa dopo l'errore (comunicazione onesta, analisi delle cause, seconda vittima), le tre domande d'orale, la risposta in 15 righe sulla trasfusione, i collegamenti e la frase del caso.

---

## Scheda parametri

| | |
|---|---|
| durata chiesta dallo script | 9 minuti (committente: almeno 8 minuti) |
| durata ottenuta | vedi «La resa» |
| slide dello script | 19 |
| scene | 50 (il tetto) |
| blocchi di parlato | 48 |
| voce | GianP — News Info and Documentary, `eleven_v3` |
| pause senza voce | s48 (posa 1,2 s sulla frase del caso) |

```
CARATTERI  8.917          BLOCCHI  48         SCENE  50/50
stima a 17,0 car/s        8:58.7
stacco tracce             dopo s27   (chunk A 4.771 car · chunk B 4.146 car)
```

## Le scene

| scene | corpo | contenuto |
|---|---|---|
| s24–s27 | percorso | le otto azioni della reazione trasfusionale, che si accendono |
| s35, s37, s38 | percorso | dopo l'errore: sicurezza, comunicazione, segnalazione, supporto, miglioramento |
| s02, s13 | percorso | le quattro ore del turno; le azioni sull'eparina |
| s04, s10, s16, s23 | pausa | le quattro trappole, prima della risposta |
| s11, s12, s40 | calcolo | concentrazione, velocità, dieci volte la dose |
| s39, s42–s45 | tabella | le Raccomandazioni 1 e 5; la risposta in 15 righe |
| s05, s29, s41 | catena | prescrizione errata; l'ultima barriera; la domanda 3 |
| s19, s20 | antidoto, respiro | il naloxone dura meno; la sedazione precede la depressione respiratoria |
| s46, s47 | anello | i sette collegamenti |
| s33, s34 | trappola (tenue) | gli errori da evitare |
| s09, s15 | cifre | la prescrizione dell'eparina; il signor Rino |
| s01, s50 | copertina | 2 scene |
| s48 | titolo | la frase del caso |
| il resto | griglia, tre, icone, norma, frase | — |

## Correzioni fatte guardando le card

- s21: la figura `registro` usciva spostata a sinistra fino al bordo della
  slide (vedi «Da verificare»): sostituita con due icone, registro e armadio.
- s40: nella formula scritta con `calcolo` tutto ciò che segue l'uguale va in
  accento, e «farmaco ÷ volume» usciva come un risultato: ora il calcolo è
  numerico e la regola sta nella nota.
- s28: l'illustrazione `fiala` porta una croce e sembrava un divieto sul
  potassio: sostituita con `fiale`.

---

## La resa

*in corso*

---

## Da verificare

- Lo script attribuisce alla lezione 5.7 le regole sugli stupefacenti (registro di carico e scarico, DPR 309/1990) e, nei collegamenti, «potassio, eparina, stupefacenti ↔ 5.7». Nel corso il registro degli stupefacenti sta nella 5.6 («Antibiotici, analgesici e stupefacenti»); la 5.7 tratta conservazione e farmaci ad alto rischio. Lasciato come nello script (s21, s47): da decidere se citare la 5.6.
- La dose di morfina (4 mg ogni 4 ore) è detta nella voce (s15) anche se lo script la scrive solo a schermo: scelta per far coincidere voce e slide.
- La trappola 4 (scenario della trasfusione) è un blocco solo (s23), con tutti i dati e la domanda: serviva a stare nei 48 blocchi senza togliere contenuto.
- Due frasi di raccordo non sono nello script: «un fattore dieci, che solo il calcolo fa vedere» (s12) e «nessuno e' solo, ma nessuno puo' dire che non toccava a lui» (s30, sulla responsabilità condivisa). Da togliere se non piacciono.
- La risposta modello parlata (s42–s45) segue la VOCE dello script, più corta dell'«A schermo»: mancano a voce «colore delle urine» e «secondo prescrizione» sul trattamento dello shock, e le slide seguono la voce.
- Libreria (non toccata): in `clinica.mjs` la figura `registro` usa la classe `.pagina`, la stessa del numero di lezione in `layout.mjs` (`position:absolute; right:132px`): la pagina del registro esce spostata di 132 px verso sinistra. Il controllo di traboccamento non se ne accorge perché misura solo `.corpo`.
- Libreria (non toccata): nel `percorso` le tappe fuori da `attive` dovrebbero restare a opacità 0,28, ma l'animazione `pop` riporta l'opacità a 1, e nel fermo immagine sembrano tutte accese. La progressione si legge solo dalla tappa in accento (s24–s27, s35–s38).
