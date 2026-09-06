# prove

Repository di lavoro.

## Struttura

- `skillplate/` — client Python per la Skillplate External API (solo stdlib) + CLI.
- `node/` — stesso client in Node/ESM, senza dipendenze + CLI.
- `tests/` — test del client Python contro un finto server locale.
- `docs/skillplate.md` — come configurare token, rete, webhook.

## Skillplate in breve

```bash
printf '%s' 'IL_TUO_TOKEN' > ~/.config/skillplate/token && chmod 600 ~/.config/skillplate/token
python3 -m skillplate ping          # Python
node node/bin/skillplate.js ping    # Node
```

Dettagli in [docs/skillplate.md](docs/skillplate.md).

## Come si lavora

- Il branch principale è `main`.
- Ogni modifica in un branch dedicato, poi pull request su `main`.
