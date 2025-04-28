from flask_unittest import AppTestCase
from app import create_app
from app.extensions import db
from app.models.user import User
from app.models.collection import Collection
from app.models.fijalist import FijaList
from app.models.tag import Tag

# not flask unittest but still helpful: https://flask.palletsprojects.com/en/stable/testing/
# https://pypi.org/project/flask-unittest/
class RouteTest(AppTestCase):
    def create_app(self):
        app = create_app()
        app.config.update(
            SQLALCHEMY_DATABASE_URI='sqlite:///:memory:',
            SECRET_KEY='secretkey',
            FRONTEND_URL='http://localhost:5173'
        )
        return app

    def setUp(self, app):
        with app.app_context():
            db.create_all()
            
            self.user = User(username='bob', email='bob@pigeonmail.com')
            self.user.set_password('123')
            db.session.add(self.user)
            db.session.flush()
            self.user_id = self.user.id
            
            self.tag1 = Tag(name='summer')
            self.tag2 = Tag(name='beach')
            self.tag3 = Tag(name='hiking')
            db.session.add_all([self.tag1, self.tag2, self.tag3])
            # .add registers an action vs flush actually applies them to the db. both are pending until .commit is called
            # add_all / flush https://stackoverflow.com/questions/3659142/bulk-insert-with-sqlalchemy-orm
            db.session.flush()
            
            self.fijalist1 = FijaList(
                title='Beach Vacation',
                description='Best beaches to visit',
                cover_image='beach.jpg',
                content='This is a super cool beach'
            )
            self.fijalist2 = FijaList(
                title='Mountain Trails',
                description='Scenic hiking trails',
                cover_image='mountains.jpg',
                content='This is a super cool mountain'
            )
            db.session.add_all([self.fijalist1, self.fijalist2])
            db.session.flush()
            
            self.fijalist1.tags.append(self.tag1)
            self.fijalist1.tags.append(self.tag2)
            self.fijalist2.tags.append(self.tag3)
            
            self.collection1 = Collection(
                name='Summer Vacations',
                description='Places to visit in summer',
                is_private=False,
                user_id=self.user_id
            )
            self.collection2 = Collection(
                name='Private Collection',
                description='My personal favorites',
                is_private=True,
                user_id=self.user_id
            )
            db.session.add_all([self.collection1, self.collection2])
            db.session.flush()
            
            self.collection1.fijalists.append(self.fijalist1)
            self.collection2.fijalists.append(self.fijalist1)
            self.collection2.fijalists.append(self.fijalist2)
            
            db.session.commit()

            self.client = app.test_client()
    
    def tearDown(self, app):
        with app.app_context():
            db.session.remove()
            db.drop_all()