"""Client Python per la Skillplate External API."""

from .client import DEFAULT_BASE_URL, SkillplateClient, resolve_token
from .errors import MissingTokenError, RateLimitError, SkillplateError

__all__ = [
    "SkillplateClient",
    "SkillplateError",
    "MissingTokenError",
    "RateLimitError",
    "resolve_token",
    "DEFAULT_BASE_URL",
]
__version__ = "1.0.0"
