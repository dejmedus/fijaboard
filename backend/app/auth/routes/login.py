from flask import request, jsonify
from flask_login import login_user 
from app.models import User
from app.extensions import bcrypt
from app.auth import auth


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
