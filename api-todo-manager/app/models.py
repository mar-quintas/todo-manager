from app.db import db, BaseModelMixin
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from app import login


class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), index=True, unique=True)
    password_hash = db.Column(db.String(128))
    todos = db.relationship('Todo', backref='user', lazy='dynamic')
    folders = db.relationship('Folder', backref='user', lazy='dynamic')

    def __repr__(self):
        return '<User {}>'.format(self.id)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

@login.user_loader
def load_user(id):
    return User.query.get(int(id))


class Todo(BaseModelMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(140))
    ready = db.Column(db.Boolean)
    folder_id = db.Column(db.String, db.ForeignKey('folder.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    def __repr__(self):
        return '<Todo  {}>'.format(self.title)

class Folder(BaseModelMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    todos = db.relationship('Todo', backref='folder', lazy='dynamic')

    def __repr__(self):
        return '<Folder {}>'.format(self.name)
