import string
from urllib.parse import urlparse
import re

ALPHABET = string.ascii_letters + string.digits
BASE = len(ALPHABET)


def to_base62(num, min_length=6):
    """
    Converts a base-10 number to a fixed-length Base62 string.
    """
    if num == 0:
        return ALPHABET[0] * min_length

    base62_str = ""
    base = len(ALPHABET)
    while num > 0:
        remainder = num % base
        base62_str = ALPHABET[remainder] + base62_str
        num //= base

    # Pad with the first character of the alphabet (e.g., '0')
    padding = ALPHABET[0] * (min_length - len(base62_str))
    return padding + base62_str


def from_base62(s):
    """
    Converts a Base62 string to a base-10 number, handling padding.
    """
    # Remove leading pad characters before decoding
    s = s.lstrip(ALPHABET[0])
    if not s:
        return 0

    base10_num = 0
    base = len(ALPHABET)
    for char in s:
        base10_num = base10_num * base + ALPHABET.index(char)
    return base10_num


def is_valid_url(url_string):
    """
    Checks if a given string is a valid-looking URL or domain.
    Accepts domains with or without protocol (http, https) and www.
    """
    domain_regex = re.compile(
        r"^(?:https?://)?(?:www\.)?[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.[a-zA-Z]{2,}$",
        re.IGNORECASE,
    )

    return bool(domain_regex.match(url_string))
