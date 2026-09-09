# Registro — 2.1 «Perché non ascoltiamo», senza avatar, voce Luca Ward

Due montaggi della stessa lezione, entrambi senza avatar e con la voce Luca
Ward. Il secondo nasce da una critica di Achille sul primo: fra un blocco e
l'altro si sentivano troppe differenze di tono.

| versione | video_id | durata | come è fatto l'audio |
|---|---|---|---|
| **traccia unica** (buona) | `44eceb4fc2d1f6daca2133ba926f58b4` | 5:51 | 2 generazioni lunghe, poi tagliate |
| a blocchi (superata) | `dffb49988fa3e412db6b8e5ca400063e` | 5:53 | 38 generazioni separate |

La versione standard con avatar resta `698a04930db66aee2a9938c9f754f185`
(registro `corso-2-1.md`). Nessuna delle due la sostituisce.

## Perché la traccia unica

Con 38 generazioni separate ogni blocco parte da zero: ElevenLabs non sa cosa
è venuto prima, e volume, colore e passo cambiano a ogni stacco. Dentro una
sola generazione invece la lettura è continua, quindi il problema sparisce
per costruzione.

Il limite di `eleven_v3` è **5000 caratteri per richiesta**, e la lezione ne
conta 6092: quindi due generazioni, non una. Il taglio fra le due cade su uno
stacco di capitolo vero (fra s17, «e il quarto, il più insidioso di tutti», e
s18, «guarda cosa hanno in comune questi quattro»), dove un cambio di tono è
voluto.

I tag di intenzione sono scesi da 38 a **sei**, messi solo alle svolte reali
del discorso: s02 `[serious]`, s08 `[curious]`, s18 `[warm]`, s22 `[warm]`,
s28 `[curious]`, s36 `[warm]`.

## Come si taglia una traccia unica sui blocchi

Il problema: HeyGen vuole una traccia per scena, ma la generazione è un unico
file di sei minuti. Serve sapere a che secondo finisce ogni blocco.

1. **Candidati.** `silencedetect` sull'audio grezzo dà tutti i silenzi
   (81 nella parte A, 95 nella B). Un confine di blocco è sempre uno di questi,
   ma non tutti i silenzi sono confini: molte pause di frase sono più lunghe di
   quelle di paragrafo, quindi una soglia non basta.
2. **Attese.** Le durate dei 38 blocchi della versione precedente danno la
   proporzione attesa. Vanno calcolate **nel dominio del parlato** — il tempo
   al netto dei silenzi — altrimenti la varianza delle pause sporca tutto:
   passando al parlato lo scarto medio è sceso da 0,43 s a 0,31 s.
3. **Scelta.** Programmazione dinamica monotòna: si scelgono i 15 (e 21)
   candidati che minimizzano lo scarto quadratico dalle attese.
4. **Verifica, che è il passaggio che conta.** Si estraggono 1,6 s *prima* di
   ogni taglio, si concatenano separati da silenzio e si manda tutto a
   `eleven_scribe_v1` in una sola trascrizione. Il testo dice, parola per
   parola, se ogni taglio cade dove deve. Alla prima tornata **9 tagli su 36
   erano sbagliati** — la programmazione dinamica da sola non basta.
5. **Correzione e ricontrollo.** Si sposta il taglio e si riprova. Tre tornate:
   36 → 9 → 2 → 0 errori.

Attenzione a una trappola: per correggere si può cercare la coda trascritta
dentro il copione, ma **se quella frase compare due volte il calcolo sbaglia**.
È successo con «buona intenzione» (chiude sia s21 sia s35) e con «quattro
motivi». Quando la coda è ambigua, la regola sicura è prendere il silenzio
immediatamente precedente.

La trascrizione **non restituisce i tempi per parola**, solo il testo: per
questo serve la prova a finestre invece di un allineamento diretto.

## Voce e montaggio

| campo | valore |
|---|---|
| voce | Luca Ward — `tVdVcJPudubxmTmAw4tE` |
| modello | `eleven_v3` |
| generazioni | 2 (2917 e 3173 caratteri) |
| grezzo | 205,2 s + 238,2 s |
| montato | 339,0 s di parlato |

Filtro invariato, quello standard:

```
silenceremove=start_periods=1:start_silence=0.03:start_threshold=-45dB:
stop_periods=-1:stop_duration=0.20:stop_silence=0.14:stop_threshold=-45dB,
atempo=1.12
```

più `apad=whole_dur=6` su s09, per tenere la clip del bar sei secondi.

## Grafica

Invariata rispetto al primo montaggio: 21 slide riusate dalla 2.1 standard e
18 nuove (c02, c04, c06, c08, c12, c14, c16, c18, c20, c22, c24, c26, c28,
c30, c32, c34, c36, c38) al posto dei blocchi che erano inquadrature di
Achille, con i temi `deep` e `sand` alternati.

## Blocchi

| blocco | slide | durata montata (s) |
|---|---|---|
| s02 | c02 (nuova) | 6.55 |
| s03 | c03 (da 2.1) | 11.01 |
| s04 | c04 (nuova) | 9.00 |
| s05 | c05 (da 2.1) | 13.19 |
| s06 | c06 (nuova) | 14.15 |
| s07 | c07 (da 2.1) | 9.81 |
| s08 | c08 (nuova) | 9.69 |
| s09 | c09 (da 2.1) | 6.00 |
| s10 | c10 (da 2.1) | 6.34 |
| s11 | c11 (da 2.1) | 13.24 |
| s12 | c12 (nuova) | 13.18 |
| s13 | c13 (da 2.1) | 9.40 |
| s14 | c14 (nuova) | 13.45 |
| s15 | c15 (da 2.1) | 9.80 |
| s16 | c16 (nuova) | 10.85 |
| s17 | c17 (da 2.1) | 4.29 |
| s18 | c18 (nuova) | 6.33 |
| s19 | c19 (da 2.1) | 11.77 |
| s20 | c20 (nuova) | 11.05 |
| s21 | c21 (da 2.1) | 4.68 |
| s22 | c22 (nuova) | 3.86 |
| s23 | c23 (da 2.1) | 5.37 |
| s24 | c24 (nuova) | 13.42 |
| s25 | c25 (da 2.1) | 8.48 |
| s26 | c26 (nuova) | 6.67 |
| s27 | c27 (da 2.1) | 10.89 |
| s28 | c28 (nuova) | 5.11 |
| s29 | c29 (da 2.1) | 8.37 |
| s30 | c30 (nuova) | 10.17 |
| s31 | c31 (da 2.1) | 9.97 |
| s32 | c32 (nuova) | 15.81 |
| s33 | c33 (da 2.1) | 7.19 |
| s34 | c34 (nuova) | 12.19 |
| s35 | c35 (da 2.1) | 4.32 |
| s36 | c36 (nuova) | 6.03 |
| s37 | c37 (da 2.1) | 5.35 |
| s38 | c38 (nuova) | 8.54 |
| s39 | c39 (da 2.1) | 3.50 |
## Da verificare

Non posso ascoltare l'audio. So che i 36 tagli cadono sulle parole giuste,
perché l'ho verificato con la trascrizione, ma non so come **suonano** gli
stacchi né se il tono ora è davvero uniforme. Vale la pena sentire i primi due
minuti, e in particolare il passaggio fra s17 e s18, che è il punto di
giunzione fra le due generazioni.
