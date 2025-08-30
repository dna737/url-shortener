import string
import hashlib
from urllib.parse import urlparse

def to_base62(num, alphabet=string.ascii_letters + string.digits):
    if num == 0:
        return alphabet[0]

    base62_str = ""
    base = len(alphabet)
    while num > 0:
        remainder = num % base
        base62_str = alphabet[remainder] + base62_str
        num //= base
    return base62_str

def url_to_base62(url_string, length=8):
    hash_object = hashlib.md5(url_string.encode())
    hash_int = int.from_bytes(hash_object.digest(), 'big')
    base62_encoded = to_base62(hash_int)

    return base62_encoded[:length]

def is_valid_url(url_string):
    """
    Checks if a given string is a valid HTTPS URL.
    """
    try:
        result = urlparse(url_string)

        if not all([result.scheme, result.netloc]):
            return False

        if result.scheme != 'https':
            return False

        return True
    except ValueError:
        return False
