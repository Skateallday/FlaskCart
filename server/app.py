
import os
from flask import Flask,  session, g
from config import Config
from flask_cors import CORS
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_mail import Mail
from routes.pantry import pantry_bp
from routes.frontend import frontend_bp
from routes.shopping_list import shopping_list_bp
from routes.recipes import recipes_bp
from routes.contact import contact_bp
from routes.admin import admin_bp


app = Flask(__name__, static_folder='static')

app.config.from_object(Config)
app.register_blueprint(pantry_bp, url_prefix="/api")
app.register_blueprint(shopping_list_bp, url_prefix="/api")
app.register_blueprint(recipes_bp, url_prefix="/api")
app.register_blueprint(admin_bp)
app.register_blueprint(frontend_bp)

csrf = CSRFProtect(app)

app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')

mail =Mail(app)



@app.after_request
def inject_csrf_token(response):
     response.set_cookie("csrf_token", generate_csrf())
     return response


@app.before_request
def before_request():
        g.username = None
        if 'username' in session:
                g.username = session['username']



if __name__ == '__main__':
      app.run('localhost', 5000, debug=True)