"""Initialize Config class to access environment variables."""
from dotenv import load_dotenv
import os

# dot env is a package that lets us use/access environment vars from .env
load_dotenv()


class Config(object):
    """Set environment variables."""

    # os.getenv() is how we access env vars from .env
    # mv .env.example .env
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL")
    SECRET_KEY = os.getenv('SECRET_KEY')
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # https://flask-login.readthedocs.io/en/latest/#cookie-settings
    # https://flask.palletsprojects.com/en/stable/config/#SESSION_COOKIE_HTTPONLY
    SESSION_COOKIE_HTTPONLY = True
    SESSION_COOKIE_SAMESITE = 'Lax'
    SESSION_COOKIE_SECURE = False
    REMEMBER_COOKIE_HTTPONLY = True
    REMEMBER_COOKIE_SAMESITE = 'Lax'
    REMEMBER_COOKIE_SECURE = False

    FRONTEND_URL = os.environ.get('FRONTEND_URL')
