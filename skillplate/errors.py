"""Eccezioni del client Skillplate."""


class SkillplateError(Exception):
    """Errore restituito dall'API Skillplate.

    L'API risponde con ``{"error": {"code", "message", "status", "request_id"}}``:
    ``request_id`` va sempre riportato all'utente quando qualcosa fallisce.
    """

    def __init__(self, message, *, code=None, status=None, request_id=None, body=None):
        super().__init__(message)
        self.message = message
        self.code = code
        self.status = status
        self.request_id = request_id
        self.body = body

    def __str__(self):
        parti = [self.message]
        if self.status is not None:
            parti.append("status={}".format(self.status))
        if self.code:
            parti.append("code={}".format(self.code))
        if self.request_id:
            parti.append("request_id={}".format(self.request_id))
        return " | ".join(parti)


class MissingTokenError(SkillplateError):
    """Nessun Personal Access Token disponibile."""


class RateLimitError(SkillplateError):
    """429: rate limit esaurito e tentativi finiti."""
