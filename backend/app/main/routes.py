from flask import Blueprint, jsonify

main = Blueprint("main", __name__, url_prefix='/api')


@main.route('/')
def index():
    return jsonify({"message": "Hi from the FijaBoard API 👋"})

# routing docs: https://flask.palletsprojects.com/en/stable/quickstart/#variable-rules
# from markupsafe import escape
# @app.route('/post/<int:post_id>')
# def show_post(post_id):
#     # show the post with the given id, the id is an integer
#     return f'Post {post_id}'

# @app.route('/path/<path:subpath>')
# def show_subpath(subpath):
#     # show the subpath after /path/
#     return f'Subpath {escape(subpath)}'
