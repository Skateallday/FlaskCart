
from flask import Blueprint, session, flash, render_template, redirect, request,  url_for, g
from flask_bcrypt import check_password_hash, generate_password_hash
from forms.forms import loginForm, registration, NewFoodsForm, NewRecipeForm, EditFoodForm, EditRecipeForm

from db import get_db_connection
from auth import login_required

admin_bp = Blueprint("admin", __name__)

from handlers import (
    handle_new_food,
    handle_edit_food,
    handle_new_recipe,
    handle_edit_recipe,
)


@admin_bp.route('/adminlogin', methods=['GET', 'POST'])
def adminlogin():
    form_type=request.args.get('form_type','login')
    if g.username:
        return redirect(url_for('admin.adminhome'))

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
                    if check_password_hash(userResults[3],(form.password.data)):
                        session.permanent = True
                        session['username'] = (form.username.data)
                        return redirect(url_for('admin.adminhome'))
                    else:
                        flash('Either username or password was not recognised')
                    return render_template('adminlogin.html', form_type=form_type, form=form)   
                except Exception as e:print(e)
                
                finally:
                    conn.close()

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
                            hashpass = generate_password_hash(form.password.data).decode('utf-8')
                            insert_data = '''INSERT INTO users (username, email, password) VALUES (?, ?, ?)'''
                            c.execute(insert_data, (form.username.data, form.emailAddress.data, hashpass))
                            conn.commit() 
                            flash('Thanks for registering! Please login.')
                        return render_template('adminlogin.html', form_type=form_type, form=form)   
                    except Exception as e:print(e)

                    finally:
                        conn.close()

            flash('Error registering user')                      
    return render_template("adminlogin.html", form_type=form_type,form=form) 
              
@admin_bp.route('/admin-home', methods=['GET', 'POST'])
@login_required
def adminhome():
    section = request.args.get('section', 'none')
    selected_food_id = request.args.get('food_id')
    selected_food = None
    
    selected_recipe_id = request.args.get('recipe_id')
    selected_recipe = None

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
    recipes = conn.execute("SELECT ROWID as id, * FROM Recipes").fetchall()
    tags = conn.execute("SELECT * FROM Tags").fetchall()
    conn.close()

    
    pantry_list = [dict(row) for row in food_items]
    if selected_food_id:
        for food in pantry_list:
            if str(food['id']) == selected_food_id:
                selected_food = food
                break

    recipes_list = [dict(row) for row in recipes]
    if selected_recipe_id:
        for recipe in recipes_list:
            if str(recipe['id']) == selected_recipe_id:
                selected_recipe = recipe
                break


    form_class = form_map.get(section)

    if section =='edit_food' and selected_food and request.method == 'GET':
        form = form_class(data=selected_food)

    elif section =="edit_recipe" and selected_recipe and request.method == 'GET':
        form = form_class(data=selected_recipe)

    else: 
        form = form_class() if form_class else None



    if form and section in handler_map and form.validate_on_submit():
        response = handler_map[section](form)
        if response:
            return response

    return render_template('admin.html', active_section=section, form=form, food_items=food_items, selected_recipe=selected_recipe, selected_food=selected_food, pantry_list=pantry_list, recipes_list=recipes_list, tags=tags)

@admin_bp.route("/logout")
def logout():        
        session.clear()
        flash("You have successfully logged out.")
        return redirect(url_for('admin.adminlogin'))