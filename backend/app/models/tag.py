from datetime import datetime, timezone
from app.extensions import db

class Tag(db.Model):
    __tablename__ = 'tag'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False, unique=True)
    
    # relationship with FijaLists through the join table
    fijalists = db.relationship('FijaList', secondary='fijalist_tag', back_populates='tags')
    
    def __repr__(self):
        return f'<Tag {self.id}: {self.name}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name
        }