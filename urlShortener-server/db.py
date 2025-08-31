import sqlite3


def init_db():
    """Initializes the SQLite database and creates the urls table."""
    print("Initializing database...")
    conn = sqlite3.connect("urls.db")
    c = conn.cursor()
    c.execute(
        """
        CREATE TABLE IF NOT EXISTS urls (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            long_url TEXT NOT NULL UNIQUE
        )
    """
    )
    conn.commit()
    conn.close()


def get_or_create_url_id(long_url):
    """
    Checks if a URL exists in the database.
    If it does, returns its ID.
    If it doesn't, inserts it and returns the new ID.
    """
    conn = sqlite3.connect("urls.db")
    c = conn.cursor()

    # Step 1: Check if the URL already exists
    c.execute("SELECT id FROM urls WHERE long_url = ?", (long_url,))
    result = c.fetchone()

    if result:
        # The URL was found, so return its ID
        url_id = result[0]
    else:
        # The URL was not found, so insert it
        c.execute("INSERT INTO urls (long_url) VALUES (?)", (long_url,))

        # Get the ID of the new row
        url_id = c.lastrowid
        conn.commit()

    conn.close()
    return url_id


def get_original_url(id):
    """
    Retrieves the original URL from the database.
    """
    conn = sqlite3.connect("urls.db")
    c = conn.cursor()
    c.execute("SELECT long_url FROM urls WHERE id = ?", (id,))
    return c.fetchone()[0]
