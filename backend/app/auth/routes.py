from flask import Blueprint, request, jsonify
from flask_login import login_user, logout_user, login_required, current_user
from app.models import User
from app.extensions import db, bcrypt

# "A Blueprint is a way to organize a group of related views and other code"
# auth blueprints: https://flask.palletsprojects.com/en/stable/tutorial/views/#id1

# "the url_prefix will be prepended to all the URLs associated with the blueprint"
# ex. react frontend will be calling flask_app_url/api/auth/login
auth = Blueprint("auth", __name__, url_prefix='/api/auth')


@auth.route('/signup', methods=['GET', 'POST'])
def signup():
    data = request.get_json()

    email_taken = User.query.filter_by(email=data.get('email')).first()
    if email_taken:
        # http codes: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status#client_error_responses
        # 400s error occurred client-side/frontend
        # 500s error occurred server/backend
        # 409: conflict
        return jsonify({"message": "Email already signed up"}), 409

    username_taken = User.query.filter_by(
        username=data.get('username')).first()
    if username_taken:
        return jsonify({"message": "Username already taken"}), 409

    user = User(
        username=data.get('username'),
        email=data.get('email'),
        # runs the password thru a hashing algorithm: https://flask-bcrypt.readthedocs.io/en/1.0.1/#usage
        password_hash=bcrypt.generate_password_hash(
            data.get('password')).decode('utf-8')
    )

    # https://flask-sqlalchemy.readthedocs.io/en/stable/quickstart/#query-the-data
    # .add "adds an object to the [db] session, to be inserted", like .new
    # .commit like .save
    db.session.add(user)
    db.session.commit()

    # asks flask-login to login the user
    # https://flask-login.readthedocs.io/en/latest/#flask_login.login_user
    login_user(user)

    return jsonify({
        "id": user.id,
        "username": user.username,
        "email": user.email
    }), 201  # 201: created


@auth.route('/login', methods=['GET', 'POST'])
def login():
    data = request.get_json()

    missing_credentials = not data or not data.get(
        'email') or not data.get('password')
    if missing_credentials:
        return jsonify({"message": "Missing email or password"}), 400

    user = User.query.filter_by(email=data['email']).first()

    # make sure password is correct: https://flask-bcrypt.readthedocs.io/en/1.0.1/#usage
    incorrect_credentials = not user or not bcrypt.check_password_hash(
        user.password_hash, data['password'])
    if incorrect_credentials:
        # 401: unauthorized
        return jsonify({"message": "Invalid email or password"}), 401

    login_user(user)

    return jsonify({
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "profile_picture": user.profile_picture
    }), 200  # ok


@auth.route('/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    return jsonify({"message": "Successfully logged out"}), 200


@auth.route('/user', methods=['GET'])
def get_user_data():
    if current_user.is_authenticated:
        return jsonify({
            "id": current_user.id,
            "username": current_user.username,
            "email": current_user.email,
            "profile_picture": current_user.profile_picture
        })
    else:
        return jsonify({"authenticated": False}), 200
