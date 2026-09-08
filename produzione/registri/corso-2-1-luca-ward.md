# Registro — 2.1 «Perché non ascoltiamo», versione senza avatar (voce Luca Ward)

Cut alternativo della lezione 2.1: **nessun avatar**, tutte slide a piena
inquadratura più la clip del bar, voce **Luca Ward** su **eleven_v3** in chiave
molto espressiva. La versione standard con avatar resta
`698a04930db66aee2a9938c9f754f185` (registro `corso-2-1.md`): questa non la
sostituisce, è un'alternativa da confrontare.

## Video

| campo | valore |
|---|---|
| video_id | `dffb49988fa3e412db6b8e5ca400063e` |
| titolo | 2.1 — Perché non ascoltiamo (voce Luca Ward, senza avatar) |
| scene | 40 — 38 blocchi + copertina 3 s + chiusura 10 s |
| formato | 16:9, 1080p, sottotitoli SRT bruciati |
| avatar | nessuno |
| durata | **5:53** (352,9 s) |
| pagina | https://app.heygen.com/videos/dffb49988fa3e412db6b8e5ca400063e |

## Voce

| campo | valore |
|---|---|
| voce | Luca Ward — `tVdVcJPudubxmTmAw4tE` (clonata, romano, «uomo di circa 50 anni molto carismatico») |
| modello | `eleven_v3` |
| espressività | tag di intenzione in testa a ogni blocco: `[serious]`, `[emphatic]`, `[thoughtful]`, `[curious]`, `[warm]` |

I tag sono in inglese perché il modello li riconosce in quella forma. **Non
vengono letti ad alta voce**: verificato con un A/B su s02 e `silencedetect` —
parlato 6,32 s con tag contro 6,31 s senza, cioè identici. `[pausa]` invece
genera silenzio vero (1,65 s) che il filtro poi butta via, quindi è inutile
sotto la regola delle pause corte e non è stato usato.

## Montaggio audio

Filtro standard, identico a tutte le altre lezioni:

```
silenceremove=start_periods=1:start_silence=0.03:start_threshold=-45dB:
stop_periods=-1:stop_duration=0.20:stop_silence=0.14:stop_threshold=-45dB,
atempo=1.12
```

Su s09 in più `apad=whole_dur=6`, per tenere la clip del bar sei secondi.

Parlato montato: **340,7 s**. Con copertina e chiusura il video finito sta
intorno ai 5:54; il render finito misura **5:53**.

## Grafica

Le 21 slide della 2.1 standard sono riusate senza rigenerarle (stessi asset id).
Al posto dei 18 blocchi che nella versione con avatar erano inquadrature di
Achille sono state disegnate **18 slide nuove** (c02, c04, c06, c08, c12, c14,
c16, c18, c20, c22, c24, c26, c28, c30, c32, c34, c36, c38), alternando i temi
`deep` e `sand` per rompere la monotonia di un video fatto di sole slide.

## Blocchi

| blocco | slide | tag | durata montata (s) |
|---|---|---|---|
| s02 | c02 (nuova) | `[serious]` | 6.85 |
| s03 | c03 (da 2.1) | `[emphatic]` | 12.10 |
| s04 | c04 (nuova) | `[thoughtful]` | 9.22 |
| s05 | c05 (da 2.1) | `[thoughtful]` | 13.45 |
| s06 | c06 (nuova) | `[serious]` | 14.38 |
| s07 | c07 (da 2.1) | `[warm]` | 10.28 |
| s08 | c08 (nuova) | `[curious]` | 10.18 |
| s09 | c09 (da 2.1) | `[serious]` | 6.00 |
| s10 | c10 (da 2.1) | `[emphatic]` | 6.73 |
| s11 | c11 (da 2.1) | `[thoughtful]` | 13.41 |
| s12 | c12 (nuova) | `[curious]` | 13.77 |
| s13 | c13 (da 2.1) | `[thoughtful]` | 9.59 |
| s14 | c14 (nuova) | `[thoughtful]` | 14.08 |
| s15 | c15 (da 2.1) | `[thoughtful]` | 9.96 |
| s16 | c16 (nuova) | `[serious]` | 11.38 |
| s17 | c17 (da 2.1) | `[emphatic]` | 4.92 |
| s18 | c18 (nuova) | `[warm]` | 6.50 |
| s19 | c19 (da 2.1) | `[warm]` | 11.17 |
| s20 | c20 (nuova) | `[thoughtful]` | 10.22 |
| s21 | c21 (da 2.1) | `[emphatic]` | 5.09 |
| s22 | c22 (nuova) | `[warm]` | 3.62 |
| s23 | c23 (da 2.1) | `[emphatic]` | 5.23 |
| s24 | c24 (nuova) | `[curious]` | 12.59 |
| s25 | c25 (da 2.1) | `[warm]` | 7.88 |
| s26 | c26 (nuova) | `[serious]` | 6.75 |
| s27 | c27 (da 2.1) | `[thoughtful]` | 11.40 |
| s28 | c28 (nuova) | `[curious]` | 4.72 |
| s29 | c29 (da 2.1) | `[thoughtful]` | 8.18 |
| s30 | c30 (nuova) | `[thoughtful]` | 10.54 |
| s31 | c31 (da 2.1) | `[serious]` | 9.38 |
| s32 | c32 (nuova) | `[thoughtful]` | 14.75 |
| s33 | c33 (da 2.1) | `[emphatic]` | 7.49 |
| s34 | c34 (nuova) | `[curious]` | 11.58 |
| s35 | c35 (da 2.1) | `[emphatic]` | 4.31 |
| s36 | c36 (nuova) | `[warm]` | 5.67 |
| s37 | c37 (da 2.1) | `[serious]` | 5.17 |
| s38 | c38 (nuova) | `[serious]` | 8.98 |
| s39 | c39 (da 2.1) | `[emphatic]` | 3.14 |
## Da verificare

Non posso ascoltare l'audio: non so dire se l'espressività v3 di Luca Ward
funzioni davvero. Vale la pena controllare il primo minuto prima di applicare
lo stesso trattamento altrove.
