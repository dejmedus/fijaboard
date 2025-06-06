from flask import request, jsonify
from flask_login import current_user, login_required # type: ignore

from app.models.collection import Collection
from app.models.fijalist import FijaList
from app.models.fijalist_collection import FijaListCollection
from app.extensions import db
from app.main import main


@main.route('/collections', methods=['GET'])
def get_collections():
    """Retrieves all collections and their associated FijaLists and tags.
    Returns a JSON list of collections with status code 200."""
    collections = Collection.query.all()

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
                    {"id": tag.id, "name": tag.name}
                    for tag in fijalist.tags
                ]
            }
            for fijalist in collection.fijalists
        ]
    } for collection in collections]), 200


@main.route('/collections/<int:collection_id>', methods=['GET'])
def get_collection_with_fijalists(collection_id):
    """Retrieves a specific collection by ID, including its FijaLists and tags.
    Returns 404 if the collection does not exist."""
    collection = Collection.query.get_or_404(collection_id)

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
                    {"id": tag.id, "name": tag.name}
                    for tag in fijalist.tags
                ]
            }
            for fijalist in collection.fijalists
        ]
    }), 200


@main.route('/collections/<int:collection_id>/fijalists/<int:fijalist_id>', methods=['POST'])
@login_required
def add_fijalist_to_collection(collection_id, fijalist_id):
    """Adds a FijaList to a collection if the current user owns the collection.
    Returns 403 if unauthorized or 404 if either resource is not found."""
    collection = Collection.query.get_or_404(collection_id)

    if collection.user_id != current_user.id:
        return jsonify({"error": "Unauthorized"}), 403

    fijalist = FijaList.query.get_or_404(fijalist_id)

    collection.fijalists.append(fijalist)
    db.session.commit()

    return jsonify({"message": "FijaList added to collection"}), 200


@main.route('/collections/<int:collection_id>/fijalists/<int:fijalist_id>', methods=['DELETE'])
@login_required
def remove_fijalist_from_collection(collection_id, fijalist_id):
    """Removes a FijaList from a collection if the current user owns it.
    Returns 403 if unauthorized or 404 if the FijaList is not in the collection."""
    collection = Collection.query.get_or_404(collection_id)

    if collection.user_id != current_user.id:
        return jsonify({"error": "Unauthorized"}), 403

    fijalist = FijaList.query.get_or_404(fijalist_id)

    if fijalist in collection.fijalists:
        collection.fijalists.remove(fijalist)
        db.session.commit()
        return jsonify({"message": "FijaList removed from collection"}), 200
    else:
        return jsonify({"error": "FijaList not found in collection"}), 404


@main.route('/collections', methods=['POST'])
@login_required
def create_collection():
    """Creates a new collection for the logged-in user.
    Requires JSON with name, and optional description and is_private fields."""
    data = request.get_json()

    collection = Collection(
        name=data.get('name'),
        description=data.get('description'),
        is_private=data.get('is_private'),
        user_id=current_user.id
    )

    db.session.add(collection)
    db.session.commit()

    return jsonify({
        "id": collection.id,
        "name": collection.name,
        "description": collection.description,
        "is_private": collection.is_private,
    }), 201


@main.route('/collections/<int:id>', methods=['PUT'])
@login_required
def update_collection(id):
    """Updates an existing collection owned by the current user.
    Only fields provided in the request will be updated."""
    data = request.get_json()

    collection = Collection.query.get_or_404(id)

    if collection.user_id != current_user.id:
        return jsonify({"error": "Not authorized"}), 403

    collection.name = data.get('name', collection.name)
    collection.description = data.get('description', collection.description)
    collection.is_private = data.get('is_private', collection.is_private)

    db.session.commit()

    return jsonify({
        "id": collection.id,
        "name": collection.name,
        "description": collection.description,
        "is_private": collection.is_private,
    }), 200


@main.route('/collections/<int:id>', methods=['DELETE'])
@login_required
def delete_collection(id):
    """Deletes a collection owned by the current user and removes related FijaList links.
    Returns 403 if unauthorized or 404 if the collection does not exist."""
    collection = Collection.query.get_or_404(id)
    
    if collection.user_id != current_user.id:
        return jsonify({"error": "Not authorized"}), 403

    FijaListCollection.query.filter_by(collection_id=id).delete()
    db.session.delete(collection)
    db.session.commit()
    
    return jsonify({"message": "Collection deleted successfully"}), 200
