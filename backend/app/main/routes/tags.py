from flask import request, jsonify
from app.models.tag  import Tag
from app.extensions import db
from app.main import main

@main.route('/tags', methods=['GET'])
def get_tags():
    tags = Tag.query.all()

    return jsonify([{
        "id": tag.id,
        "name": tag.name,
    } for tag in tags]), 200

@main.route('/tags/<int:id>', methods=['GET'])
def get_tag(id):
    tag = Tag.query.get_or_404(id)

    return jsonify({
        "id": tag.id,
        "name": tag.name
    }), 200

@main.route('/tags/<int:id>/fijalists', methods=['GET'])
def get_tag_fijalists(id):
    tag = Tag.query.get_or_404(id)

    return jsonify([{
        "id": fijalist.id,
        "title": fijalist.title,
        "description": fijalist.description,
        "cover_image": fijalist.cover_image,
        "content": fijalist.content,
        "created_at": fijalist.created_at.isoformat(),
        "updated_at":fijalist.updated_at.isoformat(),
    } for fijalist in tag.fijalists]), 200


@main.route('/tags', methods=['POST'])
def create_tag():
    data = request.get_json()

    tag = Tag(name=data.get('name'))

    db.session.add(tag)
    db.session.commit()

    return jsonify({
        "id": tag.id,
        "name": tag.name,
    }), 201


@main.route('/tags/<int:id>', methods=['PUT'])
def update_tag(id):
    data = request.get_json()

    tag = Tag.query.get_or_404(id)
    tag.name = data.get('name', tag.name)

    db.session.commit()
    
    return jsonify({
        "id": tag.id,
        "name": tag.name,
    }), 200


@main.route('/tags/<int:id>', methods=['DELETE'])
def delete_tag(id):
    tag = Tag.query.get_or_404(id)

    db.session.delete(tag)
    db.session.commit()

    return jsonify({"message": "Tag deleted successfully"}), 200