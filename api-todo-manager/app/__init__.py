from flask import Flask, jsonify
from flask_restful import Api
from app.common.error_handling import ObjectNotFound, AppErrorBaseClass
from app.db import db
from .ext import ma, migrate
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager



api = Flask(__name__)
api.config.from_object(Config)

# Inicializa las extensiones
db.init_app(api)
ma.init_app(api)
migrate.init_app(api, db)
login = LoginManager(api)
login.login_view = 'login'

# Captura todos los errores 404
Api(api, catch_all_404s=True)

# Deshabilita el modo estricto de acabado de una URL con /
api.url_map.strict_slashes = False

# Registra los blueprints
from app.todos.api_v1_0.resources import todos_v1_0_bp as todos_blueprint
api.register_blueprint(todos_blueprint)
from app.todos.api_v1_0.resources import folders_v1_0_bp as folders_blueprint
api.register_blueprint(folders_blueprint)


# Registra manejadores de errores personalizados

def register_error_handlers(api):

    # @api.errorhandler(Exception)
    # def handle_exception_error(e):
    #     print(e)
    #     return jsonify({'msg': 'Internal server error'}), 500
    #
    @api.errorhandler(405)
    def handle_405_error(e):
        print(e)
        return jsonify({'msg': 'Method not allowed'}), 405

    @api.errorhandler(403)
    def handle_403_error(e):
        print(e)
        return jsonify({'msg': 'Forbidden error'}), 403

    @api.errorhandler(404)
    def handle_404_error(e):
        print(e)
        return jsonify({'msg': 'Not Found error'}), 404

    # @api.errorhandler(AppErrorBaseClass)
    # def handle_app_base_error(e):
    #     print(e)
    #     return jsonify({'msg': str(e)}), 500

    @api.errorhandler(ObjectNotFound)
    def handle_object_not_found_error(e):
        print(e)
        return jsonify({'msg': str(e)}), 404

register_error_handlers(api)

from app import views, models
