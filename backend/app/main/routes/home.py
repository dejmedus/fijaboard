from flask import jsonify
from app.main import main

@main.route('/')
def index():
    return jsonify({"message": "Hi from the FijaBoard API 👋"})
