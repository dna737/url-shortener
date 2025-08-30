from flask import Flask, request
from urllib.parse import urlparse

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, Flask 1!</p>"

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

@app.route("/shorten", methods=["POST"])
def submit():
    original_url = request.json.get('original_url') if request.is_json else request.form.get('original_url')
    print("URL is: ", True if is_valid_url(original_url) else False)
    return f"<p>URL received: {original_url}</p>"

if __name__ == "__main__":
    app.run(debug=True)
