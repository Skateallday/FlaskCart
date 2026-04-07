import os
import sqlite3
from flask import redirect, url_for, flash

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, "app.db")


def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def handle_new_food(form):
    conn = get_db_connection()

    try:
        conn.execute(
            """
            INSERT INTO FoodItems (
                foodName,
                foodType,
                calories,
                servingSize,
                isVegan,
                isGlutenFree,
                stock
            )
            VALUES (?, ?, ?, ?, ?, ?, ?)
            """,
            (
                form.foodName.data,
                form.foodType.data,
                form.calories.data,
                form.servingSize.data,
                int(bool(form.isVegan.data)),
                int(bool(form.isGlutenFree.data)),
                form.stock.data,
            )
        )
        conn.commit()
        flash('Food item added successfully.', 'success')

    except sqlite3.Error as e:
        conn.rollback()
        flash(f'Error adding food item: {e}', 'danger')

    finally:
        conn.close()

    return redirect(url_for('adminhome', section='new_food'))


def handle_edit_food(form):
    conn = get_db_connection()

    try:
        cursor = conn.execute(
            """
            UPDATE FoodItems
            SET foodName = ?, foodType = ?, calories = ?, servingSize = ?,
                isVegan = ?, isGlutenFree = ?, stock = ?
            WHERE ROWID = ?
            """,
            (
                form.foodName.data,
                form.foodType.data,
                form.calories.data,
                form.servingSize.data,
                int(bool(form.isVegan.data)),
                int(bool(form.isGlutenFree.data)),
                form.stock.data,
                form.food_id.data,
            )
        )

        if cursor.rowcount == 0:
            flash('Food item not found.', 'danger')
        else:
            conn.commit()
            flash('Food item updated successfully.', 'success')

    except sqlite3.Error as e:
        conn.rollback()
        flash(f'Error updating food item: {e}', 'danger')

    finally:
        conn.close()

    return redirect(url_for('adminhome', section='edit_food'))


def handle_new_recipe(form):
    conn = get_db_connection()

    try:
        conn.execute(
            """
            INSERT INTO Recipes (
                recipeName,
                method,
                prepTime
            )
            VALUES (?, ?, ?)
            """,
            (
                form.recipeName.data,
                form.method.data,
                form.prepTime.data,
            )
        )
        conn.commit()
        flash('Recipe added successfully.', 'success')

    except sqlite3.Error as e:
        conn.rollback()
        flash(f'Error adding recipe: {e}', 'danger')

    finally:
        conn.close()

    return redirect(url_for('adminhome', section='new_recipe'))


def handle_edit_recipe(form):
    conn = get_db_connection()

    try:
        cursor = conn.execute(
            """
            UPDATE Recipes
            SET recipeName = ?, method = ?, prepTime = ?
            WHERE ROWID = ?
            """,
            (
                form.recipeName.data,
                form.method.data,
                form.prepTime.data,
                form.recipe_id.data,
            )
        )

        if cursor.rowcount == 0:
            flash('Recipe not found.', 'danger')
        else:
            conn.commit()
            flash('Recipe updated successfully.', 'success')

    except sqlite3.Error as e:
        conn.rollback()
        flash(f'Error updating recipe: {e}', 'danger')

    finally:
        conn.close()

    return redirect(url_for('adminhome', section='edit_recipe'))