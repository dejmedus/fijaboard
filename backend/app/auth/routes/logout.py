from flask import jsonify
from flask_login import logout_user, login_required
from app.auth import auth


@auth.route('/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    return jsonify({"message": "Successfully logged out"}), 200
