import os
from datetime import timedelta

class Config(object):
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'x-y-z'
    PERMANENT_SESSION_LIFETIME = timedelta(hours=2)