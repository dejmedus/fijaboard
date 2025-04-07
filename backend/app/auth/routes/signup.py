from flask import request, jsonify
from flask_login import login_user
from app.models import User
from app.extensions import db, bcrypt
from app.auth import auth


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
