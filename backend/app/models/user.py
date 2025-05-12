"""Create database models to represent tables."""
from flask_login import UserMixin
# sqlalcehmy.orm is used a lot in the docs, but I didnt notice it in slides/labs
# from sqlalchemy.orm import backref
from datetime import datetime, timezone

from app.extensions import db

# NOTE: using lambda function syntax for grabbing datetime in all other models, EXCEPT User
# this way if we run into problems with those timestamps, we have a control and can compare the implementions



# UserMixin comes from flask-login and gives us is_authenticated and other helper methods
# https://flask-login.readthedocs.io/en/latest/#your-user-class
class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), nullable=False, unique=True)
    email = db.Column(db.String(200), nullable=False, unique=True)
    password_hash = db.Column(db.String(200), nullable=False)
    profile_picture = db.Column(db.String(200), nullable=True)
    created_at = db.Column(
        db.DateTime, default=datetime.now(timezone.utc))
    updated_at = db.Column(
        db.DateTime, default=datetime.now(timezone.utc),
        onupdate=datetime.now(timezone.utc))

    # relationship with Collections
    collections = db.relationship('Collection', back_populates='user', cascade='all, delete-orphan')

    
    # optional password management methods that Claude recommended :)
    def set_password(self, password):
        """Function that hashes and sets the user's password """
        from app.extensions import bcrypt
        # bycrypt scrambles the password so it can't be read easily instead of storing it directly.
        self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')
    
    def check_password(self, password):
        """Function that validates password against the saved password that was set during creation"""
        from app.extensions import bcrypt
        return bcrypt.check_password_hash(self.password_hash, password)
    
    # don't expose the password hash when converting the data
    def to_dict(self):
        """ Function that converts user info into a dictionary, leaves password out for safety"""
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'profile_picture': self.profile_picture,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
    
    def __repr__(self):
        return f'<User: {self.username}>'