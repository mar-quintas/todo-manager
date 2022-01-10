from flask import request, Blueprint
from flask_restful import Api, Resource

from .schemas import TodoSchema, FolderSchema
from ..models import Todo, Folder


# todos
todos_v1_0_bp = Blueprint('todos_v1_0_bp', __name__)
todo_schema = TodoSchema()
api_todos = Api(todos_v1_0_bp)

api_todos.add_resource(TodoListResource, 'api/v1.0/todos', endpoint='todo_list_resource')
api_todos.add_resource(TodoResource, 'api/v1.0/todos/<int:todo_id>', endpoint='todo_resource')

# folders
folder_v1_0_bp = Blueprint('folders_v1_0_bp', __name__)
user_schema = FolderSchema()
api_folders = Api(folders_v1_0_bp)

api_folders.add_resource(FolderListResource, 'api/v1.0/folders', endpoint='folder_list_resource')
api_folders.add_resource(FolderResource, 'api/v1.0/folders/<int:folder_id>', endpoint='folder_resource')

# users
# users_v1_0_bp = Blueprint('users_v1_0_bp', __name__)
# user_schema = UserSchema()
# api_users = Api(users_v1_0_bp)
#
# class UserListResource(Resource):
#     def get(self):
#         users = User.get_all()
#         result = user_schema.dump(users, many=True)
#         return result
#
# # hash password TODO
#
#     def post(self):
#         data = request.get_json()
#         user_dict = user_schema.load(data)
#         user = User(email=user_dict['email'],
#                     password_hash=user_dict['password_hash'],
#
#
#         )
#
# api_users.add_resource(UserListResource, 'api/v1.0/users', endpoint='user_list_resource')
# api_users.add_resource(UserResource, 'api/v1.0/users/<int:user_id>', endpoint='user_resource')
