import os
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
from sqlalchemy.exc import OperationalError

# Load environment variables from the .env file
load_dotenv()

# Global db instance - will be initialized with app instance
db = None

def init_db(app_instance):
    """Initializes the database and creates tables."""
    global db
    
    # Configure the database
    app_instance.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
    app_instance.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    # Initialize SQLAlchemy with the app instance
    db = SQLAlchemy(app_instance)
    
    # Create the model class dynamically after db is initialized
    class ShortenedUrl(db.Model):
        __tablename__ = 'original_urls'  # Use the exact table name from Neon
        id = db.Column(db.Integer, primary_key=True)
        original_url = db.Column(db.String(2048), unique=True, nullable=False)

        def __repr__(self):
            return f'<ShortenedUrl {self.original_url}>'
    
    # Store the model class globally so other functions can access it
    globals()['ShortenedUrl'] = ShortenedUrl
    
    print("Initializing database...")
    with app_instance.app_context():
        db.create_all()
        print("Database tables created successfully!")

def retry_db_operation(func):
    """
    Decorator to handle OperationalError by retrying the database operation.
    """
    def wrapper(*args, **kwargs):
        retries = 3
        delay = 1  # seconds
        for i in range(retries):
            try:
                return func(*args, **kwargs)
            except OperationalError as e:
                print(
                    f"Database connection failed. Attempt {i+1} of {retries}. Retrying in {delay}s..."
                )
                time.sleep(delay)
                delay *= 2  # Exponential backoff
        # If all retries fail, re-raise the exception
        raise e
    return wrapper

@retry_db_operation
def get_or_create_url_id(long_url):
    """
    Checks if a URL exists in the database.
    If it does, returns its ID.
    If it doesn't, inserts it and returns the new ID.
    """
    # We need to get the app instance from Flask's current_app
    from flask import current_app
    with current_app.app_context():
        # Step 1: Check if the URL already exists
        existing_url = ShortenedUrl.query.filter_by(original_url=long_url).first()
        
        if existing_url:
            # The URL was found, so return its ID
            return existing_url.id
        else:
            # The URL was not found, so insert it
            new_url = ShortenedUrl(original_url=long_url)
            db.session.add(new_url)
            db.session.commit()
            return new_url.id


def get_original_url(id):
    """
    Retrieves the original URL from the database.
    """
    # We need to get the app instance from Flask's current_app
    from flask import current_app
    with current_app.app_context():
        url_record = ShortenedUrl.query.get(id)
        if url_record:
            return url_record.original_url
        return None
