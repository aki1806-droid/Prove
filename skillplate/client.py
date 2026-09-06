"""Client HTTP per la Skillplate External API.

Solo libreria standard: nessuna dipendenza da installare.
Il token non viene mai stampato, loggato o incluso nei messaggi di errore.
"""

import json
import os
import time
import urllib.error
import urllib.parse
import urllib.request

from .errors import MissingTokenError, RateLimitError, SkillplateError

DEFAULT_BASE_URL = "https://api.skillplate.com/v1/external"
DEFAULT_TOKEN_PATH = "~/.config/skillplate/token"
USER_AGENT = "skillplate-python-client/1.0"


def resolve_token(token=None, token_path=None):
    """Trova il PAT, in ordine: argomento, SKILLPLATE_TOKEN,
    SKILLPLATE_TOKEN_FILE, ``~/.config/skillplate/token``."""
    if token:
        return token.strip()

    da_env = os.environ.get("SKILLPLATE_TOKEN")
    if da_env and da_env.strip():
        return da_env.strip()

    candidati = [token_path, os.environ.get("SKILLPLATE_TOKEN_FILE"), DEFAULT_TOKEN_PATH]
    for candidato in candidati:
        if not candidato:
            continue
        percorso = os.path.expanduser(candidato)
        if os.path.isfile(percorso):
            with open(percorso, "r", encoding="utf-8") as fh:
                contenuto = fh.read().strip()
            if contenuto:
                return contenuto

    raise MissingTokenError(
        "Nessun token Skillplate trovato. Impostalo in SKILLPLATE_TOKEN oppure "
        "salvalo in {} (chmod 600). Si genera dal pannello: Settings -> API Tokens.".format(
            DEFAULT_TOKEN_PATH
        )
    )


def pagination(risposta):
    """Blocco di paginazione, normalizzato.

    L'API reale annida i contatori sotto ``meta.pagination`` e chiama
    ``total_pages`` quella che la documentazione chiama ``last_page``; questa
    funzione accetta entrambe le forme.
    """
    meta = risposta.get("meta") or {}
    blocco = meta.get("pagination") if isinstance(meta.get("pagination"), dict) else meta
    return {
        "current_page": blocco.get("current_page"),
        "last_page": blocco.get("last_page", blocco.get("total_pages")),
        "per_page": blocco.get("per_page"),
        "total": blocco.get("total"),
    }


def items(risposta):
    """Elementi di una risposta di lista, qualunque sia la forma di ``data``.

    ``/products`` non restituisce una lista ma un oggetto raggruppato per tipo
    (``courses``, ``bundles``, ``digital_downloads``, ``generics``,
    ``communities``): qui i gruppi vengono concatenati.
    """
    data = risposta.get("data") if isinstance(risposta, dict) else risposta
    if isinstance(data, list):
        return data
    if isinstance(data, dict):
        elementi = []
        for gruppo in data.values():
            if isinstance(gruppo, list):
                elementi.extend(gruppo)
        return elementi
    return []


def groups(risposta):
    """Gruppi di una risposta con ``data`` raggruppato, es. ``/products``.

    Restituisce ``{"courses": [...], "bundles": [...], ...}``. Serve perche' il
    tipo del prodotto sta nella chiave del gruppo, non in un campo
    dell'elemento: ``items()`` appiattisce e quell'informazione la perde.
    Su una risposta con ``data`` gia' piatto restituisce ``{}``.
    """
    data = risposta.get("data") if isinstance(risposta, dict) else risposta
    if not isinstance(data, dict):
        return {}
    return {nome: gruppo for nome, gruppo in data.items() if isinstance(gruppo, list)}


class RateLimit:
    """Ultimo stato di rate limit letto dagli header della risposta."""

    def __init__(self):
        self.limit = None
        self.remaining = None
        self.reset = None

    def update(self, headers):
        self.limit = _intero(headers.get("X-RateLimit-Limit"))
        self.remaining = _intero(headers.get("X-RateLimit-Remaining"))
        self.reset = _intero(headers.get("X-RateLimit-Reset"))

    def __repr__(self):
        return "RateLimit(limit={}, remaining={}, reset={})".format(
            self.limit, self.remaining, self.reset
        )


def _intero(valore):
    try:
        return int(valore)
    except (TypeError, ValueError):
        return None


class SkillplateClient:
    """Client REST per Skillplate.

    Le letture procedono liberamente; le scritture (create/update/delete,
    cancel abbonamenti) vanno confermate a monte da chi usa il client.
    """

    def __init__(
        self,
        token=None,
        base_url=None,
        token_path=None,
        timeout=30,
        max_retries=3,
        sleep=time.sleep,
        proxy_auth=None,
    ):
        # Auth delegata al proxy: la credenziale viene allegata a valle (es. le
        # API credentials di un ambiente cloud), quindi qui non serve un token e
        # l'header Authorization non va inviato.
        if proxy_auth is None:
            proxy_auth = os.environ.get("SKILLPLATE_AUTH", "").strip().lower() == "proxy"
        self.proxy_auth = bool(proxy_auth)
        self._token = None if self.proxy_auth else resolve_token(token, token_path)
        self.base_url = (base_url or os.environ.get("SKILLPLATE_BASE_URL") or DEFAULT_BASE_URL).rstrip("/")
        self.timeout = timeout
        self.max_retries = max_retries
        self.rate_limit = RateLimit()
        self.deprecation = None
        self._sleep = sleep

    # ------------------------------------------------------------------ core

    def request(self, method, path, params=None, body=None):
        """Esegue una chiamata e restituisce il JSON decodificato."""
        url = self._build_url(path, params)
        dati = None
        headers = {"Accept": "application/json", "User-Agent": USER_AGENT}
        if not self.proxy_auth:
            headers["Authorization"] = "Bearer {}".format(self._token)
        if body is not None:
            dati = json.dumps(body).encode("utf-8")
            headers["Content-Type"] = "application/json"

        tentativo = 0
        while True:
            richiesta = urllib.request.Request(url, data=dati, headers=headers, method=method.upper())
            try:
                with urllib.request.urlopen(richiesta, timeout=self.timeout) as risposta:
                    self._read_meta_headers(risposta.headers)
                    grezzo = risposta.read()
                    return self._decode(grezzo)
            except urllib.error.HTTPError as exc:
                self._read_meta_headers(exc.headers)
                grezzo = exc.read()
                attesa = self._retry_after(exc, tentativo)
                if attesa is not None and tentativo < self.max_retries:
                    tentativo += 1
                    self._sleep(attesa)
                    continue
                raise self._http_error(exc.code, grezzo)
            except urllib.error.URLError as exc:
                if tentativo < self.max_retries:
                    tentativo += 1
                    self._sleep(min(2 ** tentativo, 8))
                    continue
                raise SkillplateError("Errore di rete verso {}: {}".format(self.base_url, exc.reason))

    def get(self, path, params=None):
        return self.request("GET", path, params=params)

    def post(self, path, body=None, params=None):
        return self.request("POST", path, params=params, body=body if body is not None else {})

    def put(self, path, body=None):
        return self.request("PUT", path, body=body if body is not None else {})

    def patch(self, path, body=None):
        return self.request("PATCH", path, body=body if body is not None else {})

    def delete(self, path):
        return self.request("DELETE", path)

    def paginate(self, path, params=None, per_page=100, pause=0.5, max_pages=None):
        """Itera su tutti gli elementi di una lista paginata.

        Rispetta il limite di 100 GET/minuto inserendo una pausa fra le pagine.
        """
        params = dict(params or {})
        params["per_page"] = per_page
        pagina = int(params.get("page", 1))
        pagine_lette = 0

        while True:
            params["page"] = pagina
            risposta = self.get(path, params=params)
            for elemento in items(risposta):
                yield elemento

            pagine_lette += 1
            info = pagination(risposta)
            ultima = info.get("last_page")
            corrente = info.get("current_page") or pagina
            if not ultima or corrente >= ultima:
                return
            if max_pages is not None and pagine_lette >= max_pages:
                return
            pagina = corrente + 1
            if pause:
                self._sleep(pause)

    # ------------------------------------------------------------- risorse

    def ping(self):
        """Verifica credenziali e raggiungibilità: una lista minima di prodotti."""
        return self.get("/products", params={"per_page": 1})

    # utenti
    def list_users(self, **params):
        return self.get("/users", params=params)

    def iter_users(self, **params):
        return self.paginate("/users", params=params)

    def get_user(self, user_id, include=None):
        params = {"include": include} if include else None
        return self.get("/users/{}".format(user_id), params=params)

    def create_user(self, email, first_name, last_name, **campi):
        corpo = {"email": email, "first_name": first_name, "last_name": last_name}
        corpo.update(campi)
        return self.post("/users", corpo)

    def update_user(self, user_id, **campi):
        return self.put("/users/{}".format(user_id), campi)

    def delete_user(self, user_id):
        """Irreversibile: chiedi conferma esplicita prima di chiamarlo."""
        return self.delete("/users/{}".format(user_id))

    def enroll(self, user_id, product_ids):
        return self.post("/users/{}/enroll".format(user_id), {"product_ids": list(product_ids)})

    def unenroll(self, user_id, product_ids):
        return self.post("/users/{}/unenroll".format(user_id), {"product_ids": list(product_ids)})

    def certify(self, user_id, module_id):
        return self.post("/users/{}/certify".format(user_id), {"module_id": module_id})

    # prodotti (sola lettura: il catalogo si gestisce dal pannello)
    def list_products(self, status="published", **params):
        params["status"] = status
        return self.get("/products", params=params)

    def iter_products(self, status="published", **params):
        params["status"] = status
        return self.paginate("/products", params=params)

    # ordini
    def list_orders(self, **params):
        return self.get("/orders", params=params)

    def iter_orders(self, **params):
        return self.paginate("/orders", params=params)

    def get_order(self, order_id):
        return self.get("/orders/{}".format(order_id))

    def create_order(self, line_items, country, **campi):
        corpo = {"line_items": line_items, "country": country}
        corpo.update(campi)
        return self.post("/orders", corpo)

    def set_order_status(self, order_id, status):
        return self.post("/orders/{}/status".format(order_id), {"status": status})

    # abbonamenti
    def list_subscriptions(self, **params):
        return self.get("/subscriptions", params=params)

    def iter_subscriptions(self, **params):
        return self.paginate("/subscriptions", params=params)

    def get_subscription(self, subscription_id):
        return self.get("/subscriptions/{}".format(subscription_id))

    def create_subscription(self, product_id, product_pricing_id, status, country, **campi):
        corpo = {
            "product_id": product_id,
            "product_pricing_id": product_pricing_id,
            "status": status,
            "country": country,
        }
        corpo.update(campi)
        return self.post("/subscriptions", corpo)

    def update_subscription(self, subscription_id, **campi):
        return self.patch("/subscriptions/{}".format(subscription_id), campi)

    def cancel_subscription(self, subscription_id):
        """Irreversibile lato utente: conferma prima di chiamarlo."""
        return self.post("/subscriptions/{}/cancel".format(subscription_id))

    def subscription_payment_success(self, subscription_id, **campi):
        return self.post("/subscriptions/{}/payment-success".format(subscription_id), campi)

    def subscription_payment_failed(self, subscription_id, **campi):
        return self.post("/subscriptions/{}/payment-failed".format(subscription_id), campi)

    # sconti
    def list_discounts(self, **params):
        return self.get("/discounts", params=params)

    def iter_discounts(self, **params):
        return self.paginate("/discounts", params=params)

    def get_discount(self, discount_id):
        return self.get("/discounts/{}".format(discount_id))

    def create_discount(self, **campi):
        if campi.get("percent_off") and campi.get("amount_off"):
            raise ValueError("percent_off e amount_off sono alternativi, non entrambi")
        return self.post("/discounts", campi)

    def update_discount(self, discount_id, **campi):
        return self.put("/discounts/{}".format(discount_id), campi)

    def activate_discount(self, discount_id):
        return self.post("/discounts/{}/activate".format(discount_id))

    def deactivate_discount(self, discount_id):
        return self.post("/discounts/{}/deactivate".format(discount_id))

    # ------------------------------------------------------------- interni

    def _build_url(self, path, params):
        url = "{}/{}".format(self.base_url, path.lstrip("/"))
        query = _encode_params(params)
        return "{}?{}".format(url, query) if query else url

    def _read_meta_headers(self, headers):
        if headers is None:
            return
        self.rate_limit.update(headers)
        if headers.get("Deprecation"):
            self.deprecation = {
                "deprecation": headers.get("Deprecation"),
                "sunset": headers.get("Sunset"),
                "info": headers.get("X-API-Deprecation-Info"),
            }

    def _retry_after(self, exc, tentativo):
        """Secondi di attesa per un errore ritentabile, altrimenti None."""
        if exc.code == 429:
            intestazione = _intero(exc.headers.get("Retry-After") if exc.headers else None)
            if intestazione is not None:
                return min(intestazione, 60)
            return min(2 ** (tentativo + 1), 30)
        if exc.code in (502, 503, 504):
            return min(2 ** (tentativo + 1), 16)
        return None

    def _http_error(self, status, grezzo):
        code = message = request_id = None
        corpo = None
        try:
            corpo = json.loads(grezzo.decode("utf-8")) if grezzo else None
        except (ValueError, UnicodeDecodeError):
            corpo = None
        if isinstance(corpo, dict) and isinstance(corpo.get("error"), dict):
            errore = corpo["error"]
            code = errore.get("code")
            message = errore.get("message")
            request_id = errore.get("request_id")
        if not message:
            # Un corpo non-JSON significa che a rispondere non e' stato Skillplate
            # ma un intermediario (proxy, gateway, captive portal): dare la
            # spiegazione Skillplate manderebbe fuori strada.
            testo = _estratto(grezzo)
            if corpo is None and testo:
                message = (
                    "Risposta HTTP {} non proveniente da Skillplate (corpo non JSON): "
                    "controlla proxy, firewall o allowlist di rete{}".format(status, testo)
                )
            else:
                message = _messaggio_default(status, proxy_auth=self.proxy_auth)

        classe = RateLimitError if status == 429 else SkillplateError
        return classe(message, code=code, status=status, request_id=request_id, body=corpo)

    @staticmethod
    def _decode(grezzo):
        if not grezzo:
            return {}
        try:
            return json.loads(grezzo.decode("utf-8"))
        except (ValueError, UnicodeDecodeError):
            raise SkillplateError("Risposta non JSON dall'API Skillplate")


def _estratto(grezzo, limite=200):
    """Estratto del corpo grezzo, per gli errori che non arrivano da Skillplate."""
    try:
        testo = grezzo.decode("utf-8", "replace").strip() if grezzo else ""
    except AttributeError:
        testo = str(grezzo or "").strip()
    if not testo:
        return ""
    breve = testo[:limite] + "..." if len(testo) > limite else testo
    return " - risposta ricevuta: {}".format(" ".join(breve.split()))


def _messaggio_default(status, proxy_auth=False):
    if status == 401:
        if proxy_auth:
            return (
                "401 con auth delegata al proxy: la credenziale non e' stata allegata. "
                "Controlla che l'host sia fra le Allowed websites della credenziale"
            )
        return "Token non valido o scaduto (401)"
    if status == 403:
        return "Scope mancante sul token per questa operazione (403)"
    if status == 404:
        return "Risorsa non trovata (404)"
    if status == 429:
        return "Rate limit superato (429): 100 GET/min, 30 scritture/min"
    return "Errore HTTP {} dall'API Skillplate".format(status)


def _encode_params(params):
    """Serializza i parametri, espandendo le liste in ``chiave[]=valore``."""
    if not params:
        return ""
    coppie = []
    for chiave, valore in params.items():
        if valore is None:
            continue
        if isinstance(valore, bool):
            coppie.append((chiave, "true" if valore else "false"))
        elif isinstance(valore, (list, tuple)):
            for elemento in valore:
                coppie.append(("{}[]".format(chiave), str(elemento)))
        else:
            coppie.append((chiave, str(valore)))
    return urllib.parse.urlencode(coppie)
