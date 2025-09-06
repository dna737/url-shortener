from locust import HttpUser, task, between
import random
import string


def random_url():
    return "http://example.com/" + "".join(random.choices(string.ascii_lowercase, k=10))


class URLShortenerUser(HttpUser):
    host = "http://localhost:5000"
    wait_time = between(1, 3)

    @task(1)
    def create_short_url(self):
        self.client.post("/api/shorten", json={"original_url": random_url()})

    @task(9)
    def redirect_short_url(self):
        # Use some hardcoded or pre-generated short codes that exist in your SQLite DB
        short_code = "aaaaaf"
        self.client.get(f"/api/{short_code}")
