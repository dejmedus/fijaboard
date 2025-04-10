from datetime import datetime, timezone
from app.extensions import db

class Collection(db.Model):
    __tablename__ = 'collection'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(500))
    is_private = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))
    
    # relationship with User
    # backpopulates will access other connected + dependent table records so there are cascading deletes 
    # and clean up join tables to prevent orphan records
    user = db.relationship('User', back_populates='collections')
    
    # relationship with FijaLists through the fijalist_collection join table
    fijalists = db.relationship('FijaList', secondary='fijalist_collection', back_populates='collections')
    
    def __repr__(self):
        return f'<Collection {self.id}: {self.name}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            'description': self.description,
            'is_private': self.is_private,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }