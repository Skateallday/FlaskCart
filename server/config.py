import os
from datetime import timedelta

class Config(object):
    SECRET_KEY = os.environ.get('SECRET_KEY')
    PERMANENT_SESSION_LIFETIME = timedelta(hours=2)