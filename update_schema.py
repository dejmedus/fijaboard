from backend.app import create_app
from backend.app.extensions import db

app = create_app()

with app.app_context():
    # drop and recreate all tables
    db.drop_all()
    db.create_all()
    
    print("Database schema updated successfully with new location field.") 
