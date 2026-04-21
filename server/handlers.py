from datetime import date
import os
import sqlite3
from flask import redirect, url_for, flash, request

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
        cursor = conn.cursor()

        cursor.execute(
            """
            INSERT INTO Recipes (
                recipe_name,
                servings,
                date_added,
                image_url,
                image_alt,
                short_description,
                prep_time_minutes,
                cook_time_minutes,
                total_time_minutes,
                recipeType,
                calories
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                form.recipe_name.data,
                form.servings.data,
                date.today().isoformat(),
                form.image_url.data,
                form.image_alt.data,
                form.short_description.data,
                form.prep_time_minutes.data,
                form.cook_time_minutes.data,
                form.total_time_minutes.data,
                form.recipeType.data,
                form.calories.data,
            )
        )

        recipe_id = cursor.lastrowid

        step_texts = request.form.getlist('step_text[]')
        ingredient_ids = request.form.getlist('ingredient_id[]')
        quantities = request.form.getlist('quantity[]')
        units = request.form.getlist('unit[]')
        optional_flags = request.form.getlist('optional[]')
        tag_ids = request.form.getlist('tag_id[]')

        for index, step_text in enumerate(step_texts, start=1):
            if step_text.strip():
                cursor.execute(
                    """
                    INSERT INTO RecipeInstructions (recipe_id, step_number, step_text)
                    VALUES (?, ?, ?)
                    """,
                    (recipe_id, index, step_text.strip())
                )

        for i in range(len(ingredient_ids)):
            if ingredient_ids[i]:
                optional_value = 1 if i < len(optional_flags) and optional_flags[i] == '1' else 0


                cursor.execute(
                    """
                    INSERT INTO RecipeIngredients (recipe_id, fooditem_id, quantity, unit, optional)
                    VALUES (?, ?, ?, ?, ?)
                    """,
                    (
                        recipe_id,
                        ingredient_ids[i],
                        quantities[i] or None,
                        units[i] if i < len(units) else None,
                        optional_value,
                    )
                )

        for tag_id in tag_ids:
            if tag_id:
                cursor.execute(
                    """
                    INSERT INTO RecipeTags (recipe_id, tag_id)
                    VALUES (?, ?)
                    """,
                    (recipe_id, tag_id)
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




