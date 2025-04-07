
from flask import Blueprint

# "A Blueprint is a way to organize a group of related views and other code"
# auth blueprints: https://flask.palletsprojects.com/en/stable/tutorial/views/#id1

# "the url_prefix will be prepended to all the URLs associated with the blueprint"
# ex. react frontend will be calling flask_app_url/api/auth/login
auth = Blueprint("auth", __name__, url_prefix='/api/auth')

from .routes import user
from .routes import logout
from .routes import login
from .routes import signup