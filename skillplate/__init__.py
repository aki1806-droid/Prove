"""Client Python per la Skillplate External API."""

from .client import DEFAULT_BASE_URL, SkillplateClient, groups, items, pagination, resolve_token
from .errors import MissingTokenError, RateLimitError, SkillplateError

__all__ = [
    "SkillplateClient",
    "SkillplateError",
    "MissingTokenError",
    "RateLimitError",
    "resolve_token",
    "items",
    "groups",
    "pagination",
    "DEFAULT_BASE_URL",
]
__version__ = "1.0.0"
