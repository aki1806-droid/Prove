# prove

Repository di lavoro.

## Struttura

```
docs/openapi.json          spec OpenAPI 3.0.3 dell'API esterna Skillplate (copia fedele
                           di quella servita in produzione, non modificata a mano)
docs/api.md                riferimento leggibile generato dalla spec
tools/generate_api_docs.py generatore di docs/api.md
```

## Documentazione API

`docs/api.md` è generato: non va modificato a mano. Per aggiornarlo dopo che l'API
è cambiata:

```bash
curl -sS https://api.skillplate.com/v1/external/openapi.json -o docs/openapi.json
python3 tools/generate_api_docs.py
```

Per verificare in CI che il file committato sia allineato alla spec:

```bash
python3 tools/generate_api_docs.py --check
```

## Come si lavora

- Il branch principale è `main`.
- Ogni modifica in un branch dedicato, poi pull request su `main`.
