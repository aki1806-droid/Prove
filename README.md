# prove

Repository di lavoro.

## Struttura

- `.claude/skills/motion-broll/` — skill di Claude Code che crea motion graphics B-roll sincronizzate con le parole di un video (orizzontale o verticale), in italiano, con brand intercambiabili e integrazioni facoltative con HeyGen, Higgsfield, Canva, ElevenLabs e Robin. Si avvia con `/motion-broll`. Dettagli in `SKILL.md`; differenze rispetto all'originale in `ADATTAMENTI.md`.
- `motion/` — cartella di lavoro creata dalla skill al primo uso. Si versionano solo `motion/brands/` (la libreria dei brand) e, se serve, `motion/clips/` e `motion/plan.json`; video e render sono esclusi da `.gitignore`.

## Come si lavora

- Il branch principale è `main`.
- Ogni modifica in un branch dedicato, poi pull request su `main`.
