from flask import jsonify
from flask_login import current_user
from app.auth import auth


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
