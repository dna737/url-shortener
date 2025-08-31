from flask import Flask, request, redirect
from utils import is_valid_url, to_base62, from_base62
from db import init_db, get_or_create_url_id, get_original_url

app = Flask(__name__)

init_db()


@app.route("/")
def hello_world():
    return f"<p>Hello World</p>"


@app.route("/shorten", methods=["POST"])
def shorten_url():
    original_url = (
        request.json.get("original_url")
        if request.is_json
        else request.form.get("original_url")
    )
    if is_valid_url(original_url):
        url_id = get_or_create_url_id(original_url)
        print(f"URL ID: {url_id}", "type: ", type(url_id))
        base62_url_id = to_base62(url_id)
        print(f"Base62 URL ID: {base62_url_id}")
        return f"<p>The shortened URL is: {base62_url_id}</p>"
    return "<p>Invalid URL</p>", 400


@app.route("/<short_url>")
def redirect_to_original_url(short_url):
    url_id = from_base62(short_url)
    original_url = get_original_url(url_id)
    return redirect(original_url, code=302)


if __name__ == "__main__":
    app.run(debug=True)
