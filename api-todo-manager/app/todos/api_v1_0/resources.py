from flask import request, Blueprint
from flask_restful import Api, Resource
from .schemas import TodoSchema, FolderSchema
from app.models import Todo, Folder


# todos
todos_v1_0_bp = Blueprint('todos_v1_0_bp', __name__)
todo_schema = TodoSchema()
api_todos = Api(todos_v1_0_bp)

# Filtrar por usuario TODO
class TodoListResource(Resource):
    def get(self):
        todos = Todo.get_by_id()
        result = film_schema.dump(todos, many=True)
        return result

    def post(self):
        data = request.get_json()
        todo_dict = todo_schema.load(data)
        todo = Todo(title=todo_dict['title'],
                    ready=todo_dict['ready'],
                    folder_id=todo_dict['folder_id'],
                    user_id=todo_dict['user_id'])
        film.save()
        resp = todo_schema.dump(todo)
        return resp, 201

class TodoResource(Resource):
    def get(self, todo_id):
        todo = Todo.get_by_id(todo_id)
        resp = todo_schema.dump(todo)
        return resp

api_todos.add_resource(TodoListResource, '/api/v1.0/todos', endpoint='todo_list_resource')
api_todos.add_resource(TodoResource, '/api/v1.0/todos/<int:todo_id>', endpoint='todo_resource')

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
