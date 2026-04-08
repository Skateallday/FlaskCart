import os
import sqlite3
from flask import Flask, render_template, request, session, g, redirect, flash, url_for, jsonify, send_from_directory
from flask_bcrypt import Bcrypt
from .config import Config
from flask_cors import CORS
from flask_wtf.csrf import CSRFProtect, generate_csrf
from app.forms.forms import loginForm, registration, NewFoodsForm, NewRecipeForm, EditFoodForm, EditRecipeForm
from functools import wraps
from app.handlers import (
    handle_new_food,
    handle_edit_food,
    handle_new_recipe,
    handle_edit_recipe,
)


app = Flask(__name__, static_folder='static')
bcrypt = Bcrypt(app)

CORS(app, supports_credentials=True, origins=["http://localhost:3000"])

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, "app.db")


app.config.from_object(Config)
csrf = CSRFProtect(app)


def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

@app.after_request
def inject_csrf_token(response):
     response.set_cookie("csrf_token", generate_csrf())
     return response

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not getattr(g, 'username', None):
            if request.path.startswith('/api/'):
                return jsonify({'error': 'Unauthorized'}), 401
            return redirect(url_for('adminlogin'))
        return f(*args, **kwargs)
    return decorated_function

@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    file_path = os.path.join(app.static_folder, path)
    if os.path.exists(file_path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

@app.route("/api/pantry", methods=["GET", "POST"])
def get_pantry():
    conn = get_db_connection()
    rows = conn.execute("SELECT ROWID, * FROM FoodItems").fetchall()
    conn.close()

    pantry_list = [dict(row) for row in rows]
    return jsonify(pantry_list)

@app.route("/api/pantry/<item>/add/<value>", methods=["POST"])
@login_required
def add_to_invent(item, value):
    print(item)
    if request.method == 'POST':

        conn = get_db_connection()
        cursor = conn.cursor()
        try:
             cursor.execute("UPDATE FoodItems SET stock = stock + ? WHERE foodName = ?", (value, item))

             conn.commit()
        except sqlite3.Error as e:
             print(f"A database error has happened: {e}")
        finally:
             conn.close()
        # Handle POST request logic here (e.g., add item to pantry)
        return {"message": "Item added successfully"}, 200
    else:
        # Handle GET request logic here (if applicable)
        return {"message": "GET request for add endpoint"}, 200

@app.route("/api/pantry/<item>/remove/<value>", methods=["POST"])
@login_required
def remove_from_invent(item, value):
    print(item)
    if request.method == 'POST':

        conn = get_db_connection()
        cursor = conn.cursor()
        try:
             cursor.execute("UPDATE FoodItems SET stock = stock - ? WHERE foodName = ?", (value, item))

             conn.commit()
        except sqlite3.Error as e:
             print(f"A database error has happened: {e}")
        finally:
             conn.close()
        # Handle POST request logic here (e.g., add item to pantry)
        return {"message": "Item added successfully"}, 200
    else:
        # Handle GET request logic here (if applicable)
        return {"message": "GET request for add endpoint"}, 200

@app.route("/api/recipes", methods=["GET"])
def get_recipes():
    conn = get_db_connection()
    rows = conn.execute("SELECT ROWID, * FROM Recipes").fetchall()
    conn.close()

    recipes_list = [dict(row) for row in rows]
    return jsonify(recipes_list)

@app.route("/api/instructions", methods=["GET"])
def get_instructions():
    conn = get_db_connection()
    rows = conn.execute("SELECT ROWID, * FROM RecipeInstructions").fetchall()
    conn.close()

    recipes_instructions = [dict(row) for row in rows]
    return jsonify(recipes_instructions)

@app.route("/api/ingredients", methods=["GET"])
def get_ingredients():
    conn = get_db_connection()
    rows = conn.execute("""
        SELECT
            ri.ROWID AS rowid,
            ri.recipe_id,
            ri.fooditem_id,
            fi.foodName AS fooditem_name,
            ri.quantity,
            ri.unit
        FROM RecipeIngredients ri
        JOIN FoodItems fi
          ON fi.ROWID = ri.fooditem_id
        ORDER BY ri.recipe_id, ri.ROWID
    """).fetchall()
    conn.close()

    return jsonify([dict(row) for row in rows])


@app.before_request
def before_request():
        g.username = None
        if 'username' in session:
                g.username = session['username']

@app.route('/adminlogin', methods=['GET', 'POST'])
def adminlogin():
    form_type=request.args.get('form_type','login')
    if g.username:
        return redirect(url_for('adminhome'))

    else:
        if form_type=='login':                
            form = loginForm(request.form)  
            if request.method == 'POST':  
                conn = get_db_connection()   
                try:                    
                    c = conn.cursor()
                    find_user = ("SELECT * FROM users WHERE username = ?")
                    c.execute(find_user, [(form.username.data)])
                    results =c.fetchall()                        
                    userResults = results[0]
                    if bcrypt.check_password_hash(userResults[3],(form.password.data)):
                        session.permanent = True
                        session['username'] = (form.username.data)
                        return redirect(url_for('adminhome'))
                    else:
                        flash('Either username or password was not recognised')
                    return render_template('adminlogin.html', form_type=form_type, form=form)   
                except Exception as e:print(e)

            flash('Either username or password was not recognised')
            return render_template('adminlogin.html', form_type=form_type, form=form)   
                
        elif form_type=='signup':
            form = registration(request.form)
            if request.method == 'POST':                         
                conn = get_db_connection()     
                with conn:
                    c = conn.cursor()
                    try:
                        find_user = ("SELECT * FROM users WHERE username = ?")
                        c.execute(find_user, [(form.username.data)])
                        results =c.fetchall()                
                        if results:
                            flash('Username already taken')
                            return render_template('adminlogin.html', form=form)   
                        else:                                
                            hashpass = bcrypt.generate_password_hash(form.password.data).decode('utf-8')
                            insert_data = '''INSERT INTO users (username, email, password) VALUES (?, ?, ?)'''
                            c.execute(insert_data, (form.username.data, form.emailAddress.data, hashpass))
                            conn.commit() 
                            flash('Thanks for registering! Please login.')
                        return render_template('adminlogin.html', form_type=form_type, form=form)   
                    except Exception as e:print(e)

            flash('Error registering user')                      
    return render_template("adminlogin.html", form_type=form_type,form=form) 
              
@app.route('/admin-home', methods=['GET', 'POST'])
@login_required
def adminhome():
    section = request.args.get('section', 'none')

    form_map = {
        'new_food': NewFoodsForm,
        'edit_food': EditFoodForm,
        'new_recipe': NewRecipeForm,
        'edit_recipe': EditRecipeForm,
    }

    handler_map = {
        'new_food': handle_new_food,
        'edit_food': handle_edit_food,
        'new_recipe': handle_new_recipe,
        'edit_recipe': handle_edit_recipe,
    }

    conn = get_db_connection()
    food_items = conn.execute("SELECT ROWID as id, * FROM FoodItems").fetchall()
    tags = conn.execute("SELECT * FROM Tags").fetchall()
    conn.close()

    form_class = form_map.get(section)
    form = form_class() if form_class else None

    if form and section in handler_map and form.validate_on_submit():
        response = handler_map[section](form)
        if response:
            return response

    return render_template('admin.html', active_section=section, form=form, food_items=food_items, tags=tags)

@app.route("/logout")
def logout():        
        session.clear()
        flash("You have successfully logged out.")
        return redirect('/adminlogin')



if __name__ == '__main__':
      app.run('localhost', 5000, debug=True)