from datetime import datetime, timezone
from app.extensions import db
from wtforms import ValidationError

class FijaList(db.Model):
    __tablename__ = 'fijalist'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(500))
    cover_image = db.Column(db.String(255), nullable=True)
    content = db.Column(db.JSON, nullable=False)
    # use the lambda syntax so that the function is called each time a new record is created/ updated
    # otherwise would only call datetime once, at app startup
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))
    
    # relationship with Collections through the join table
    collections = db.relationship('Collection', secondary='fijalist_collection', back_populates='fijalists')
    
    # relationship with Tags through the join table
    tags = db.relationship('Tag', secondary='fijalist_tag', back_populates='fijalists')

    # repr method will print the object as a readbale string, very useful when debugging
    def __repr__(self):
        return f'<FijaList {self.id}: {self.title}>'
    
    # after returning data fr API endpts, convert model instances to JSON, handles 
    # conversion of datetime objects to ISO format strings
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'cover_image': self.cover_image,
            'content': self.content,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
        
    @staticmethod
    def validate_title(form, field):
        """Validate that the title is between 3 and 255 characters."""
        if not field.data:
            raise ValidationError('Title is required')
        if len(field.data) < 3:
            raise ValidationError('Title must be at least 3 characters')
        if len(field.data) > 255:
            raise ValidationError('Title cannot exceed 255 characters')
    
    @staticmethod
    def validate_description(form, field):
        """Validate that the description is not too long."""
        if field.data and len(field.data) > 500:
            raise ValidationError('Description cannot exceed 500 characters')
    
    @staticmethod
    def validate_content(form, field):
        """Validate that content exists and is in proper format."""
        if not field.data:
            raise ValidationError('Content is required')
        # this is just to check that thecontent is a dictionary (JSON object)
        if not isinstance(field.data, dict):
            raise ValidationError('Content must be a valid JSON object')
