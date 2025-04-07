"""Initialize Config class to access environment variables."""
from dotenv import load_dotenv
import os

# dot env is a package that lets us use/access environment vars from .env
# pip install dotenv
# pip install -r requirements.txt
load_dotenv()


class Config(object):
    """Set environment variables."""

    # os.getenv() is how we access env vars from .env
    # mv .env.example .env
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL")
    SECRET_KEY = os.getenv('SECRET_KEY')
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # not sure if we will need to set up cookie config
    # https://flask-login.readthedocs.io/en/latest/#cookie-settings
    # https://flask.palletsprojects.com/en/stable/config/#SESSION_COOKIE_HTTPONLY

    # might cause problems in dev if 5173 is in use i'm geussing react-router would use a different port
    FRONTEND_URL = os.environ.get('FRONTEND_URL') or 'http://localhost:5173'
