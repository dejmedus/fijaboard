from flask import Flask
from flask_cors import CORS

from app.config import Config

# "_init__.py contains the application factory, and tells Python that directory should be treated as a package"
# application factory: https://flask.palletsprojects.com/en/stable/patterns/appfactories/
def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # the auth lab had db = SQLAlchemy(app) in extensions and here
    # flask docs seem to say we should assign db in extnesions and init here (maybe?)
    # https://flask.palletsprojects.com/en/stable/patterns/appfactories/#factories-extensions
    from app.extensions import db, bcrypt, login_manager
    db.init_app(app)  # sqlalchemy db
    bcrypt.init_app(app)  # flask-bcrypt
    login_manager.init_app(app)  # flask-login

    login_manager.login_view = 'auth.login'

    # this is called by flask-login
    @login_manager.user_loader
    def load_user(user_id):
        from app.models.user import User
        return User.query.get(int(user_id))

    # we need cross-origin resource sharing becuase flask and react are on two different origins/urls
    # in dev: localhost:5173 for react and 5000 for flask
    # app.config is how we access our config file app/config.py
    # "if credentials is set to include on and the request is cross-origin the server must set the Access-Control-Allow-Credentials and Access-Control-Allow-Origin response headers, or the browser will return a network error to the caller."
    # https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    CORS(app, supports_credentials=True, origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173", 
        app.config["FRONTEND_URL"]
    ])

    # "A Blueprint is a way to organize a group of related views and other code"
    # register auth blueprints: https://flask.palletsprojects.com/en/stable/tutorial/views/#id2
    from app.main.routes import main
    from app.auth.routes import auth
    app.register_blueprint(main)
    app.register_blueprint(auth)

    # "After all models and tables are defined... create the table schema in the database"
    # https://flask-sqlalchemy.readthedocs.io/en/stable/quickstart/#create-the-tables
    with app.app_context():
        db.create_all()

    return app
