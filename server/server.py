import random
import os
import sqlite3
from flask import Flask, render_template, request, session, g, redirect, flash, url_for, jsonify
from flask_bcrypt import Bcrypt, generate_password_hash, check_password_hash
from forms.forms import registration, logon
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


@app.route('/dash')
def dash():
    if g.username:
        print(g.username)
        return render_template('dashboard.html')

@app.route('/testdash')
@app.route('/homedash')
def dashello():
    return get_username()

def get_username():
    if g.username == None:
        lusername = "Please Sign In"
        return lusername
    else:        
        lusername = g.username
        return lusername

@app.route('/testhello') # take note of this decorator syntax, it's a common pattern
@app.route('/hello') # take note of this decorator syntax, it's a common pattern
def hello():
    # It is good practice to only call a function in your route end-point,
    # rather than have actual implementation code here.
    # This allows for easier unit and integration testing of your functions.
    return get_hello()


def get_hello():
    greeting_list = ['Yo', 'Hey', 'Awrite']
    return random.choice(greeting_list)

@app.route('/test', methods=['GET', 'POST'])
def test():
    return render_template('test.html')

@app.route('/writingPost', methods=['GET', 'POST']) # take note of this decorator syntax, it's a common pattern
def testPost():
    # It is good practice to only call a function in your route end-point,
    # rather than have actual implementation code here.
    # This allows for easier unit and integration testing of your functions.
    return post_test()

@app.route('/testThis', methods=['GET', 'POST']) # take note of this decorator syntax, it's a common pattern
def testThis():
    # It is good practice to only call a function in your route end-point,
    # rather than have actual implementation code here.
    # This allows for easier unit and integration testing of your functions.
    return get_test()

@app.route('/login', methods=['GET', 'POST'])
def login():
    loginForm = logon(request.form)
    if request.method == 'POST':  
        conn = sqlite3.connect('testData.db')                
        with conn:
                c = conn.cursor()
                find_user = ("SELECT * FROM users WHERE username = ?")
                c.execute(find_user, [(loginForm.username.data)])  
                results =c.fetchall()
                
                userResults = results[0]
                if bcrypt.check_password_hash(userResults[1],(loginForm.password.data)):
                        session['logged_in'] = True
                        session['username'] = (loginForm.username.data)
                        return redirect(url_for('dash'))
                else:
                        flash('Either username or password was not recognised')
                        return render_template('login.html', form=loginForm) 

    return render_template('login.html', form=loginForm)

@app.route("/logout")
def logout():        
        session['logged_in'] = True
        session.clear()
        flash("You have successfully logged out.")
        return redirect('home')

@app.route('/register', methods=['GET', 'POST'])
def register():
    registerForm = registration(request.form)   

    if request.method == 'POST':
            pw_hash =bcrypt.generate_password_hash(registerForm.password.data)
            newEntry = [((registerForm.username.data), pw_hash, (registerForm.emailAddress.data))]
            conn =sqlite3.connect('testData.db')
            print ("Opened database successfully")
            with conn:
                    c =conn.cursor()
                    try:
                            sql = '''INSERT INTO users (username, password, email) VALUES(?,?,?)'''
                            c.executemany(sql, newEntry)
                            print ("Insert correctly")
                    except:
                            flash("This is already an account, please log in with those details or change details.")
                            return render_template("register.html", form=registerForm)
                            c.commit()

                    flash((registerForm.username.data) + " Successfully Registered!")
                    return redirect('login')
            return render_template("register.html", form=registerForm)

    return render_template('register.html', form=registerForm)

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