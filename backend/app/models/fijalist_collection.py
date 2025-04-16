from datetime import datetime, timezone
from app.extensions import db

class FijaListCollection(db.Model):
    __tablename__ = 'fijalist_collection'
    
    id = db.Column(db.Integer, primary_key=True)
    fijalist_id = db.Column(db.Integer, db.ForeignKey('fijalist.id'), nullable=False)
    collection_id = db.Column(db.Integer, db.ForeignKey('collection.id'), nullable=False)
    added_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    
    def __repr__(self):
        return f'<FijaListCollection fijalist_id={self.fijalist_id}, collection_id={self.collection_id}>'