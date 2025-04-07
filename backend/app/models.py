"""Create database models to represent tables."""
from flask_login import UserMixin
# sqlalcehmy.orm is used a lot in the docs, but I didnt notice it in slides/labs
# from sqlalchemy.orm import backref
from datetime import datetime, timezone

from app.extensions import db


# class Book(db.Model):
#     """Book model."""
#     id = db.Column(db.Integer, primary_key=True)
#     title = db.Column(db.String(80), nullable=False)
#     publish_date = db.Column(db.Date)

#     author_id = db.Column(db.Integer, db.ForeignKey(
#         'author.id'), nullable=False)
#     author = db.relationship('Author', back_populates='books')

#     genres = db.relationship(
#         'Genre', secondary='book_genre', back_populates='books')

#     users_who_favorited = db.relationship(
#         'User', secondary='user_book', back_populates='favorite_books')

#     def __str__(self):
#         return f'<Book: {self.title}>'

#     def __repr__(self):
#         return f'<Book: {self.title}>'

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

    def __repr__(self):
        return f'<User: {self.username}>'
