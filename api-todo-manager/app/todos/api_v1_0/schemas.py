from marshmallow_sqlalchemy import SQLAlchemySchema, auto_field
from marshmallow import fields
from app.ext import ma

# class UserSchema(ma.Schema):
#     id = fields.Integer(dump_only=True)
#     email = auto_field()
#     password_hash = auto_field()
#     todo = fields.Nested('TodoSchema', many=True)
#     folder = fields.Nested('FolderSchema', many=True)

class TodoSchema(ma.Schema):
    id = fields.Integer(dump_only=True)
    title = fields.String()
    folder = fields.Integer()
    user_id = fields.Integer()

class FolderSchema(ma.Schema):
    id = fields.Integer(dump_only=True)
    name = fields.String()
    user_id = fields.Integer()
    todo = fields.Nested('TodoSchema', many=True)
