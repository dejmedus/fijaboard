# db_tools/seed_db.py
import json
import os
import sys
from datetime import datetime, timezone
from sqlalchemy import text

# Add the parent directory to the path so we can import app modules
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app import create_app
from app.extensions import db
from app.models.fijalist import FijaList
from app.models.tag import Tag
from app.models.user import User
from app.models.collection import Collection
from app.models.fijalist_tag import FijaListTag

def load_data(filename):
    """Load data from a JSON file"""
    file_path = os.path.join(os.path.dirname(__file__), 'seed_data', filename)
    with open(file_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def seed_database():
    """Seed the database with initial data"""
    app = create_app()
    
    with app.app_context():
        print("Clearing existing data...")
        # Clear existing data - be careful with this in production!
        db.drop_all()
        db.create_all()
        
        # Seed users first (if there are dependencies)
        print("Creating users...")
        users_data = load_data('users.json')
        for user_data in users_data:
            user = User(**user_data)
            db.session.add(user)
        
        # Create tags first from tags.json
        all_tags = {}
        try:
            print("Creating tags from tags.json...")
            tags_data = load_data('tags.json')
            for tag_data in tags_data:
                tag = Tag(name=tag_data['name'])
                db.session.add(tag)
                all_tags[tag_data['name']] = tag
            print(f"Created {len(tags_data)} tags from tags.json")
        except FileNotFoundError:
            print("No tags.json file found, skipping")
        
        # Create collections from collections.json
        print("Creating collections...")
        all_collections = {}
        collections_data = load_data('collections.json')
        for collection_data in collections_data:
            collection = Collection(**collection_data)
            db.session.add(collection)
            # Store collection by name for easy lookup later
            all_collections[collection_data['name']] = collection
        
        # Load fijalists data
        print("Loading fijalists data...")
        fijalists_data = load_data('fijalists.json')
        
        # Process additional tags from fijalists
        print("Processing tags from fijalists...")
        for fijalist_data in fijalists_data:
            if 'tags' in fijalist_data:
                for tag_name in fijalist_data['tags']:
                    if tag_name not in all_tags:
                        tag = Tag(name=tag_name)
                        all_tags[tag_name] = tag
                        db.session.add(tag)
        
        # Create fijalists
        print(f"Creating {len(fijalists_data)} fijalists...")
        collections_added = 0
        
        for fijalist_data in fijalists_data:
            # Extract tags list and remove from main data
            tags_list = fijalist_data.pop('tags', [])
            
            # Extract collections list and remove from main data
            collections_list = fijalist_data.pop('collections', [])
            
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
            
            # Connect collections
            if collections_list:
                for collection_name in collections_list:
                    if collection_name in all_collections:
                        fijalist.collections.append(all_collections[collection_name])
                        collections_added += 1
                    else:
                        print(f"Warning: Collection not found: {collection_name}")
                
        # Final commit
        db.session.commit()
        
        # Print summary
        print(f"\nDatabase seeded successfully with:")
        print(f"- {len(fijalists_data)} fijalists")
        print(f"- {len(users_data)} users")
        print(f"- {len(collections_data)} collections")
        print(f"- {len(all_tags)} tags")
        print(f"- {collections_added} fijalist-collection relationships")

if __name__ == "__main__":
    seed_database()