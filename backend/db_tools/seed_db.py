# db_tools/seed_db.py
import json
import os
import sys
from datetime import datetime, timezone

# Add the parent directory to the path so we can import app modules
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app import create_app
from app.extensions import db
from app.models.fijalist import FijaList
from app.models.tag import Tag
from app.models.fijalist_tag import FijaListTag

def load_data(filename):
    """Load data from a JSON file"""
    file_path = os.path.join(os.path.dirname(__file__), 'seed_data', filename)
    with open(file_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def seed_database():
    """Seed the database with initial fijalists"""
    app = create_app()
    with app.app_context():
        print("Clearing existing data...")
        # Clear existing data - be careful with this in production!
        db.drop_all()
        db.create_all()
        
        print("Loading fijalists data...")
        fijalists_data = load_data('fijalists.json')
        
        
        
        # Create tags first (collecting all unique tags)
        all_tags = {}
        print("Creating tags...")
        for fijalist_data in fijalists_data:
            if 'tags' in fijalist_data:
                for tag_name in fijalist_data['tags']:
                    if tag_name not in all_tags:
                        tag = Tag(name=tag_name)
                        all_tags[tag_name] = tag
                        db.session.add(tag)
        
        # Create fijalists
        print(f"Creating {len(fijalists_data)} fijalists...")
        for fijalist_data in fijalists_data:
            # Extract tags list and remove from main data
            tags_list = fijalist_data.pop('tags', [])
            
            # Create the fijalist
            fijalist = FijaList(
                title=fijalist_data['title'],
                description=fijalist_data['description'],
                cover_image=fijalist_data.get('cover_image'),
                content=fijalist_data['content']
                # created_at and updated_at will use the default values from your model
            )
            db.session.add(fijalist)
            
            # Need to flush to get the fijalist ID
            db.session.flush()
            
            # Connect tags
            for tag_name in tags_list:
                if tag_name in all_tags:
                    fijalist.tags.append(all_tags[tag_name])
        
        db.session.commit()
        print(f"Database seeded successfully with {len(fijalists_data)} fijalists and {len(all_tags)} tags!")

if __name__ == "__main__":
    seed_database()