import random
import os
import sqlite3
from flask import Flask, render_template, request, session, g, redirect, flash, url_for, jsonify
from flask_bcrypt import Bcrypt, generate_password_hash, check_password_hash
from config import Config
from flask_cors import CORS
from flask_wtf.csrf import CSRFProtect, CSRFError



app = Flask(__name__)
bcrypt = Bcrypt(app)

CORS(app, origins=["http://localhost:3000"])

DB_PATH = "foods.db"

app.config.from_object(Config)
csrf = CSRFProtect(app)
SECRET_KEY = os.environ.get('SECRET_KEY') or 'you-will-never-guess'


def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

@app.route("/api/pantry", methods=["GET"])
def get_pantry():
    conn = get_db_connection()
    rows = conn.execute("SELECT ROWID, * FROM FoodItems").fetchall()
    conn.close()

    pantry_list = [dict(row) for row in rows]
    return jsonify(pantry_list)

@app.before_request
def before_request():
        g.username = None
        if 'username' in session:
                g.username = session['username']

@app.route('/')
def index():
        return render_template('index.html')

@app.route('/home')
def home():
    return render_template('index.html')


def post_test():
    conn =sqlite3.connect('testData.db')
    conn.row_factory = lambda cursor, row: row[0]
    c = conn.cursor()
    c.execute("select greeting from testData")
    rows = c.fetchall()
    testing_list = rows
    return random.choice(testing_list)

def get_test():
    conn =sqlite3.connect('testData.db')
    conn.row_factory = lambda cursor, row: row[0]
    c = conn.cursor()
    c.execute("select greeting from testData")
    rows = c.fetchall()
    testing_list = rows
    return random.choice(testing_list)


@app.route('/writing')
def writing():
    return render_template('writing.html')

if __name__ == '__main__':
      app.run('localhost', 5000, debug=True)