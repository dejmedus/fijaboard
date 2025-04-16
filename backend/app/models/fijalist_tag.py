
from app.extensions import db

class FijaListTag(db.Model):
    __tablename__ = 'fijalist_tag'
    
    id = db.Column(db.Integer, primary_key=True)
    fijalist_id = db.Column(db.Integer, db.ForeignKey('fijalist.id'), nullable=False)
    tag_id = db.Column(db.Integer, db.ForeignKey('tag.id'), nullable=False)
    

    
    def __repr__(self):
        return f'<FijaListTag fijalist_id={self.fijalist_id}, tag_id={self.tag_id}>'