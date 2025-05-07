from flask import request, jsonify
from app.models.fijalist  import FijaList
from app.models.tag  import Tag
from app.extensions import db
from app.main import main

@main.route('/fijalists', methods=['GET'])
def get_fijalists():
    """Retrieves all FijaLists with their associated tags.
    Returns a JSON list of all FijaLists and their metadata with status code 200."""
    fijalists = FijaList.query.all()

    return jsonify([{
        "id": fijalist.id,
        "title": fijalist.title,
        "description": fijalist.description,
        "cover_image": fijalist.cover_image,
        "content": fijalist.content,
        "created_at": fijalist.created_at.isoformat(),
        "updated_at":fijalist.updated_at.isoformat(),
        "tags": [
            {
                "id": tag.id,
                "name": tag.name,
            }
            for tag in fijalist.tags
        ]
    } for fijalist in fijalists]), 200

@main.route('/fijalists/<int:id>', methods=['GET'])
def get_fijalist(id):
    """Retrieves a specific FijaList by ID with its associated tags.
    Returns a 404 error if the FijaList doesn't exist or a JSON object with status code 200."""
    fijalist = FijaList.query.get_or_404(id)

    return jsonify({
        "id": fijalist.id,
        "title": fijalist.title,
        "description": fijalist.description,
        "cover_image": fijalist.cover_image,
        "content": fijalist.content,
        "created_at": fijalist.created_at.isoformat(),
        "updated_at":fijalist.updated_at.isoformat(),
        "tags": [
            {
                "id": tag.id,
                "name": tag.name,
            }
            for tag in fijalist.tags
        ]
    }), 200

@main.route('/fijalists', methods=['POST'])
def create_fijalist():
    """Creates a new FijaList from JSON data in the request body.
    Expects title and content fields, with optional description and cover_image."""
    data = request.get_json()

    fijalist = FijaList(
        title=data.get('title'),
        description=data.get('description'),
        cover_image=data.get('cover_image'),
        content=data.get('content'),
    )

    db.session.add(fijalist)
    db.session.commit()

    return jsonify({
        "id": fijalist.id,
        "title": fijalist.title,
        "description": fijalist.description,
        "cover_image": fijalist.cover_image,
        "content": fijalist.content
    }), 201

@main.route('/fijalists/<int:fijalist_id>/tags/<int:tag_id>', methods=['POST'])
def add_tag_to_fijalilst(fijalist_id, tag_id):
    """Adds a tag to a specific FijaList.
    Returns a 404 error if either the FijaList or Tag doesn't exist."""
    fijalist = FijaList.query.get_or_404(fijalist_id)
    tag = Tag.query.get_or_404(tag_id)

    fijalist.tags.append(tag)
    db.session.commit()

    return jsonify({"message": "Tag added to Fijalist"}), 200

@main.route('/fijalists/<int:id>', methods=['PUT'])
def update_fijalist(id):
    """Updates an existing FijaList with data from the request body.
    Fields not provided in the request will retain their existing values."""
    data = request.get_json()

    fijalist = FijaList.query.get_or_404(id)
    fijalist.title = data.get('title', fijalist.title)
    fijalist.description = data.get('description', fijalist.description)
    fijalist.cover_image = data.get('cover_image', fijalist.cover_image)
    fijalist.content = data.get('content', fijalist.content)

    db.session.commit()
    return jsonify({
        "id": fijalist.id,
        "title": fijalist.title,
        "description": fijalist.description,
        "cover_image": fijalist.cover_image,
        "content": fijalist.content
    }), 200


@main.route('/fijalists/<int:id>', methods=['DELETE'])
def delete_fijalist(id):
    """Deletes a FijaList by ID.
    Returns a 404 error if the FijaList doesn't exist or success message with status code 200."""
    fijalist = FijaList.query.get_or_404(id)

    db.session.delete(fijalist)
    db.session.commit()

    return jsonify({"message": "FijaList deleted successfully"}), 200
