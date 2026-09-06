"""CLI di verifica per la connessione Skillplate.

    python3 -m skillplate ping
    python3 -m skillplate products --type course
    python3 -m skillplate users --search mario --per-page 20
    python3 -m skillplate get /orders/abc123

Il token viene letto da SKILLPLATE_TOKEN o da ~/.config/skillplate/token e
non viene mai stampato.
"""

import argparse
import json
import sys

from .client import DEFAULT_BASE_URL, SkillplateClient
from .errors import SkillplateError


def _stampa(dati):
    print(json.dumps(dati, indent=2, ensure_ascii=False))


def _coppie(valori):
    params = {}
    for voce in valori or []:
        chiave, _, valore = voce.partition("=")
        if not _:
            raise SystemExit("Parametro non valido: {} (usa chiave=valore)".format(voce))
        params[chiave] = valore
    return params


def main(argv=None):
    parser = argparse.ArgumentParser(prog="skillplate", description="Client Skillplate External API")
    parser.add_argument("--base-url", default=None, help="Default: {}".format(DEFAULT_BASE_URL))
    parser.add_argument("--token-file", default=None, help="File contenente il PAT")
    parser.add_argument("--timeout", type=int, default=30)
    sub = parser.add_subparsers(dest="comando", required=True)

    sub.add_parser("ping", help="Verifica token e raggiungibilità dell'API")

    p_prod = sub.add_parser("products", help="Elenca il catalogo prodotti")
    p_prod.add_argument("--status", default="published", choices=["published", "draft", "all"])
    p_prod.add_argument("--type", dest="tipo", default=None)
    p_prod.add_argument("--per-page", type=int, default=25)

    p_users = sub.add_parser("users", help="Elenca gli utenti")
    p_users.add_argument("--search", default=None)
    p_users.add_argument("--email", default=None)
    p_users.add_argument("--per-page", type=int, default=25)

    p_get = sub.add_parser("get", help="GET grezza su un path dell'API")
    p_get.add_argument("path")
    p_get.add_argument("--param", action="append", help="chiave=valore (ripetibile)")

    args = parser.parse_args(argv)

    try:
        client = SkillplateClient(
            base_url=args.base_url, token_path=args.token_file, timeout=args.timeout
        )
        if args.comando == "ping":
            risposta = client.ping()
            totale = (risposta.get("meta") or {}).get("total")
            print("Connessione OK — {}".format(client.base_url))
            if totale is not None:
                print("Prodotti visibili al token: {}".format(totale))
            print("Rate limit: {}".format(client.rate_limit))
            if client.deprecation:
                print("ATTENZIONE — versione deprecata: {}".format(client.deprecation))
            return 0
        if args.comando == "products":
            _stampa(client.list_products(status=args.status, type=args.tipo, per_page=args.per_page))
            return 0
        if args.comando == "users":
            params = {"per_page": args.per_page}
            if args.search:
                params["search"] = args.search
            if args.email:
                params["filter[email]"] = args.email
            _stampa(client.list_users(**params))
            return 0
        if args.comando == "get":
            _stampa(client.get(args.path, params=_coppie(args.param)))
            return 0
    except SkillplateError as exc:
        print("Errore Skillplate: {}".format(exc), file=sys.stderr)
        return 1

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
