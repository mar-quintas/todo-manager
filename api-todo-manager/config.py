import os
from dotenv import load_dotenv

load_dotenv()
basedir = os.path.abspath(os.path.dirname(__file__))

class Config(object):
    SECRET_KEY = os.environ.get('SECRET_KEY')
    PROPAGATE_EXCEPTIONS = True
    # Database configuration
    SQLALCHEMY_DATABASE_URI = 'sqlite://app/users.sqlite'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SHOW_SQLALCHEMY_LOG_MESSAGES = False
    ERROR_404_HELP = False
