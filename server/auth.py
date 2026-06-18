from functools import wraps
from flask import request,  g, redirect, url_for, jsonify


def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not getattr(g, 'username', None):
            if request.path.startswith('/api/'):
                return jsonify({'error': 'Unauthorized'}), 401
            return redirect(url_for('adminlogin'))
        return f(*args, **kwargs)
    return decorated_function