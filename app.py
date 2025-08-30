from flask import Flask, request
from utils import is_valid_url, url_to_base62

app = Flask(__name__)

original_to_short = {}

@app.route("/")
def hello_world():
    print("Original to Short mapping:", original_to_short)
    return f"<p>{original_to_short}</p>"

@app.route("/shorten", methods=["POST"])
def submit():
    original_url = request.json.get('original_url') if request.is_json else request.form.get('original_url')
    if is_valid_url(original_url):
        short_url = url_to_base62(original_url)
        original_to_short[original_url] = short_url
        return f"<p>URL received: {original_url}, Shortened URL: {short_url}</p>"
    return "<p>Invalid URL</p>", 400

if __name__ == "__main__":
    app.run(debug=True)
