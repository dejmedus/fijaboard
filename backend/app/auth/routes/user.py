from flask import jsonify
from flask_login import current_user # type: ignore
from app.auth import auth


@auth.route('/user', methods=['GET'])
def get_user_data():
    """Retrieves the current user's data including profile info and collections.
    Returns authenticated user's data or 'authenticated: False' if no user is logged in."""
    if current_user.is_authenticated:
        return jsonify({
            "id": current_user.id,
            "username": current_user.username,
            "email": current_user.email,
            "profile_picture": current_user.profile_picture,
            "collections": [{
                "id": collection.id,
                "name": collection.name,
                "description": collection.description,
                "is_private": collection.is_private,
                "created_at": collection.created_at.isoformat(),
                "updated_at": collection.updated_at.isoformat(),
                "fijalists": [
                    {
                        "id": fijalist.id,
                        "title": fijalist.title,
                        "description": fijalist.description,
                        "cover_image": fijalist.cover_image,
                        "content": fijalist.content,
                        "tags": [
                            {
                                "id": tag.id,
                                "name": tag.name,
                            }
                            for tag in fijalist.tags
                        ]
                    }
                    for fijalist in collection.fijalists
                ]
            } for collection in current_user.collections]
        })
    else:
        return jsonify({"authenticated": False}), 200
