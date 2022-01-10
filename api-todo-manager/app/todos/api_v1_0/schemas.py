from marshmallow_sqlalchemy import SQLAlchemySchema, auto_field
from marshmallow import fields
from app.ext import ma


class TodoSchema(ma.Schema):
    id = fields.Integer(dump_only=True)
    title = fields.String()
    folder_id = fields.Integer()
    user_id = fields.Integer()

class FolderSchema(ma.Schema):
    id = fields.Integer(dump_only=True)
    name = fields.String()
    user_id = fields.Integer()
    todos = fields.Nested('TodoSchema', many=True)
