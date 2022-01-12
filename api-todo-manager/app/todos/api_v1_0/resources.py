from flask import request, Blueprint
from flask_restful import Api, Resource
from .schemas import TodoSchema, FolderSchema
from app.models import Todo, Folder
from app import login
from flask_login import login_user, logout_user, login_required, current_user
from app.db import db, BaseModelMixin


# todos
todos_v1_0_bp = Blueprint('todos_v1_0_bp', __name__)
todo_schema = TodoSchema()
api_todos = Api(todos_v1_0_bp)

# Filtrar por usuario TODO

class TodoListResource(Resource):
    @login_required
    def get(self):
        todos = Todo.query.filter_by(user_id=current_user.get_id())
        result = todo_schema.dump(todos, many=True)
        return result

    def post(self):
        title = request.json.get("title", None)
        user_id = current_user.get_id()
        print(current_user)
        folder = None
        ready = False
        todo = Todo(title=title, ready=ready, folder_id=folder, user_id=user_id)
        print(f'title = {title}, user_id={user_id}, folder={folder}, ready={ready}, todo={todo}')
        todo.save()
        resp = todo_schema.dump(todo)
        return resp, 201

class TodoResource(Resource):
    def get(self, todo_id):
        todo = Todo.get_by_id(todo_id)
        resp = todo_schema.dump(todo)
        return resp, 201

    def delete(self, todo_id):
        todo = Todo.get_by_id(todo_id)
        todo.delete()
        resp = todo_schema.dump(todo)
        return resp, 201

api_todos.add_resource(TodoListResource, '/api/v1.0/todos', endpoint='todo_list_resource')
api_todos.add_resource(TodoResource, '/api/v1.0/todo/<int:todo_id>', endpoint='todo_resource')

# folders
folders_v1_0_bp = Blueprint('folders_v1_0_bp', __name__)
user_schema = FolderSchema()
api_folders = Api(folders_v1_0_bp)

class FolderListResource(Resource):
    def get(self):
        folders = Folder.get_all()
        result = folder_schema.dump(folders, many=True)
        return result

    def post(self):
        data = request.get_json()
        folder_dict = folder_schema.load(data)
        folder = Folder(name=folder_dict['name'],
                        user_id=folder_dict['user_id'],
                        todos=folder_dict['todos'])
        folder.save()
        resp = folder_schema.dump(folder)
        return resp, 201

# class FolderResource(Resource):
#     pass

api_folders.add_resource(FolderListResource, '/api/v1.0/folders', endpoint='folder_list_resource')
# api_folders.add_resource(FolderResource, '/api/v1.0/folders/<int:folder_id>', endpoint='folder_resource')
