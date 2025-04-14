from app import create_app
from flask import jsonify

app = create_app()

@app.route("/")
def health_check():
    return jsonify({
        "status": "healthy",
        "message": "Backend is up and running!"
    })

if __name__ == "__main__":
    app.run(debug=True)
