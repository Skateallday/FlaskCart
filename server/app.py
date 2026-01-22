import random
import os
import sqlite3
from flask import Flask, render_template, request, session, g, redirect, flash, url_for, jsonify, send_from_directory
from flask_bcrypt import Bcrypt, generate_password_hash, check_password_hash
from .config import Config
from flask_cors import CORS
from flask_wtf.csrf import CSRFProtect, CSRFError, generate_csrf



app = Flask(__name__, static_folder='static')
bcrypt = Bcrypt(app)

CORS(app, supports_credentials=True, origins=["http://localhost:3000"])

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, "foods.db")


app.config.from_object(Config)
csrf = CSRFProtect(app)
SECRET_KEY = os.environ.get('SECRET_KEY') or 'you-will-never-guess'


def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

@app.after_request
def inject_csrf_token(response):
     response.set_cookie("csrf_token", generate_csrf())
     return response

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

@app.route("/api/pantry/<item>/add", methods=["GET", "POST"])
def add_to_invent(item):
    print(item)
    if request.method == 'POST':

        conn = get_db_connection()
        cursor = conn.cursor()
        try:
             cursor.execute("UPDATE FoodItems SET stock = stock + 1 WHERE foodName = ?", (item,))

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

@app.route("/api/pantry/<item>/remove", methods=["GET", "POST"])
def remove_from_invent(item):
    print(item)
    if request.method == 'POST':

        conn = get_db_connection()
        cursor = conn.cursor()
        try:
             cursor.execute("UPDATE FoodItems SET stock = stock - 1 WHERE foodName = ?", (item,))

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



if __name__ == '__main__':
      app.run('localhost', 5000, debug=True)