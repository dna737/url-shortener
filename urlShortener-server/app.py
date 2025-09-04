from flask import Flask, request, redirect, jsonify
from utils import is_valid_url, to_base62, from_base62
from db import init_db, get_or_create_url_id, get_original_url

app = Flask(__name__)

init_db()


@app.route("/api/shorten", methods=["POST"])
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
        host = request.headers.get("X-Forwarded-Host", request.host)
        print(f"Host: {host}")
        return jsonify(
            {
                "shortenedUrl": f"{host}/{base62_url_id}",
                "originalUrl": original_url,
                "success": True,
                "message": "URL shortened successfully",
            }
        )
    return (
        jsonify({"error": "Invalid URL", "success": False, "message": "Invalid URL"}),
        400,
    )


@app.route("/<short_url>")
def redirect_to_original_url_root(short_url):
    try:
        url_id = from_base62(short_url)
        original_url = get_original_url(url_id)
        if original_url:
            return redirect(original_url, code=302)
        else:
            return "URL not found", 404
    except:
        return "Invalid URL", 400


@app.route("/api/<short_url>")
def get_original_url_api(short_url):
    try:
        url_id = from_base62(short_url)
        original_url = get_original_url(url_id)
        if original_url:
            return jsonify(
                {"success": True, "originalUrl": original_url, "message": "URL found"}
            )
        else:
            return (
                jsonify(
                    {
                        "success": False,
                        "error": "URL not found",
                        "message": "Short URL not found",
                    }
                ),
                404,
            )
    except Exception as e:
        return (
            jsonify(
                {
                    "success": False,
                    "error": "Invalid URL",
                    "message": "Invalid short URL format",
                }
            ),
            400,
        )


if __name__ == "__main__":
    app.run(debug=True)
