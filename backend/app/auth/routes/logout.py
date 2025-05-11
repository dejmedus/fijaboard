from flask import jsonify
from flask_login import logout_user, login_required
from app.auth import auth


@auth.route('/logout', methods=['POST'])
@login_required
def logout():
    """Logs out the currently authenticated user.
    Requires an authenticated user and returns a success message with status code 200."""
    logout_user()
    return jsonify({"message": "Successfully logged out"}), 200
