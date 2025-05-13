
from flask import request, jsonify

from app.models.user  import User
from app.models.collection  import Collection
from app.extensions import db
from app.main import main

@main.route('/users', methods=['GET'])
def get_users():
    """Retrieves all users.
    Returns a JSON list of users with basic profile information (id, username, email, profile_picture) and status code 200."""
    users = User.query.all()

    return jsonify([{
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "profile_picture": user.profile_picture
    } for user in users]), 200


@main.route('/users/<int:id>', methods=['GET'])
def get_user(id):
    """Retrieves a specific user by ID, including their collections and nested FijaLists with tags.
    Returns a 404 if the user is not found, otherwise a detailed user profile with status code 200."""
    user = User.query.get_or_404(id)

    return jsonify({
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "profile_picture": user.profile_picture,
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
            } for collection in user.collections]
    }), 200


@main.route('/users/<int:id>/collections', methods=['GET'])
def get_user_collections(id):
    """Retrieves all collections associated with a specific user ID.
    Each collection includes nested FijaLists and their tags. Returns 404 if user is not found, or status code 200 with data."""
    user = User.query.get_or_404(id)

    return jsonify([{
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
    } for collection in user.collections]), 200


@main.route('/users/<int:user_id>/collections/<int:collection_id>', methods=['GET'])
def get_user_collection(user_id, collection_id):
    """Retrieves a specific collection belonging to a specific user.
    Returns full collection data including FijaLists and tags, or 404 if the collection does not belong to the user."""
    user = User.query.get_or_404(user_id)
    collection = Collection.query.get_or_404(collection_id)

    if collection in user.collections:
        return jsonify({
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
        }), 200
    else:
        return jsonify({"error": "Collection does not belong to user"}), 404


@main.route('/users/<int:id>', methods=['PUT'])
def update_user(id):
    """Updates a user's profile information.
    Accepts optional fields like username, email, and profile_picture from the request body.
    Returns updated user data or 404 if user is not found."""
    data = request.get_json()

    user = User.query.get_or_404(id)
    user.username = data.get('username', user.username)
    user.email = data.get('email', user.email)
    user.profile_picture = data.get('profile_picture', user.profile_picture)

    db.session.commit()

    return jsonify({
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "profile_picture": user.profile_picture,
    }), 200


@main.route('/users/<int:id>', methods=['DELETE'])
def delete_user(id):
    """Deletes a user by ID.
    Returns a success message with status code 200, or 404 if user is not found."""
    user = User.query.get_or_404(id)

    db.session.delete(user)
    db.session.commit()

    return jsonify({"message": "User deleted successfully"}), 200
