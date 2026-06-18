import sqlite3
from flask import Blueprint, jsonify

from ..db import get_db_connection
from ..auth import login_required

pantry_bp = Blueprint("pantry", __name__)

@pantry_bp.route("/pantry", methods=["GET"])
def get_pantry():
    conn = get_db_connection()
    rows = conn.execute("SELECT ROWID, * FROM FoodItems").fetchall()
    conn.close()

    pantry_list = [dict(row) for row in rows]
    return jsonify(pantry_list)


@pantry_bp.route("/pantry/<item>/add/<int:value>", methods=["POST"])
@login_required
def add_to_invent(item, value):
    print(item)
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
            cursor.execute("UPDATE FoodItems SET stock = stock + ? WHERE foodName = ?", (value, item))

            conn.commit()
    except sqlite3.Error as e:
            print(f"A database error has happened: {e}")
    finally:
            conn.close()
    return {"message": "Item added successfully"}, 200

@pantry_bp.route("/pantry/<item>/remove/<int:value>", methods=["POST"])
@login_required
def remove_from_invent(item, value):
    print(item)
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
            cursor.execute("UPDATE FoodItems SET stock = stock - ? WHERE foodName = ?", (value, item))

            conn.commit()
    except sqlite3.Error as e:
            print(f"A database error has happened: {e}")
    finally:
            conn.close()
    return {"message": "Item added successfully"}, 200