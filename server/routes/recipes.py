from flask import Blueprint, jsonify

from db import get_db_connection

recipes_bp = Blueprint("recipes", __name__)


@recipes_bp.route("/recipes", methods=["GET"])
def get_recipes():
    conn = get_db_connection()
    rows = conn.execute("SELECT ROWID, * FROM Recipes").fetchall()
    conn.close()

    recipes_list = [dict(row) for row in rows]
    return jsonify(recipes_list)

@recipes_bp.route("/instructions", methods=["GET"])
def get_instructions():
    conn = get_db_connection()
    rows = conn.execute("SELECT ROWID, * FROM RecipeInstructions").fetchall()
    conn.close()

    recipes_instructions = [dict(row) for row in rows]
    return jsonify(recipes_instructions)

@recipes_bp.route("/ingredients", methods=["GET"])
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
