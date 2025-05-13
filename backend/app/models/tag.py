from datetime import datetime, timezone
from app.extensions import db
from wtforms import ValidationError # type: ignore

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
        
    @staticmethod
    def validate_name(form, field):
        """Validate that the tag name is appropriate."""
        if not field.data:
            raise ValidationError('Tag name is required')
        if len(field.data) < 2:
            raise ValidationError('Tag name must be at least 2 characters')
        if len(field.data) > 50:
            raise ValidationError('Tag name cannot exceed 50 characters')
        
        # first - check if tag name contains only valid characters
        # this basically allows alphanumeric chars and dashes/spaces
        import re
        if not re.match(r'^[a-zA-Z0-9\-\s]+$', field.data):
            raise ValidationError('Tag name can only contain letters, numbers, spaces, and hyphens')
            
    @staticmethod
    def validate_no_duplicate_tag(form, field):
        """Validate that the tag doesn't already exist (case-insensitive)."""
        from sqlalchemy import func
        
        existing_tag = Tag.query.filter(func.lower(Tag.name) == func.lower(field.data)).first()
        
        # if editing an existing tag, we need to exclude the current tag from the check
        if existing_tag and getattr(form, 'id', None) != existing_tag.id:
            raise ValidationError(f'A tag with the name "{field.data}" already exists')
    
    @staticmethod
    def validate_tag_whitespace(form, field):
        """Validate that the tag name doesn't have excessive whitespace."""
        if field.data:
            # check for leading/trailing whitespace
            if field.data != field.data.strip():
                raise ValidationError('Tag name should not have leading or trailing spaces')
            
            # check for multiple consecutive spaces
            if '  ' in field.data:
                raise ValidationError('Tag name should not have consecutive spaces')
