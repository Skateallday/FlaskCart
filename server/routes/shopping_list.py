import sqlite3
from flask import Blueprint, jsonify, request

from db import get_db_connection

shopping_list_bp = Blueprint("shopping_list", __name__)


@shopping_list_bp.route("/shoppinglist/", methods=["GET"])
def shoppinglist():
    print(f"Route hit! Method: {request.method}")

    conn = get_db_connection()
    rows = conn.execute("""
        SELECT
            sl.ROWID AS rowid,
            sl.FoodItemID AS fooditem_id,
            fi.foodName AS fooditem_name,
            sl.Quantity AS quantity,
            sl.Unit AS unit,
            sl.IsPurchased AS is_purchased
        FROM ShoppingList sl
        JOIN FoodItems fi
        ON fi.ID = sl.FoodItemID
        ORDER BY sl.ROWID
    """).fetchall()
    conn.close()

    shopping_list = [dict(row) for row in rows]

    return jsonify(shopping_list)


@shopping_list_bp.route("/shoppinglist/post", methods=["POST"])
def shoppinglistpost():
    
    data = request.get_json()
    fooditem_id = data.get("fooditem_id")
    quantity = data.get("quantity")
    unit = data.get("unit")        

    if not fooditem_id or quantity is None or not unit:
         return jsonify({"error": "Missing required fields"}),400 
    
    print(f"Received data: fooditem_id={fooditem_id}, quantity={quantity}, unit={unit}")
    conn = get_db_connection()
    cursor = conn.cursor()
    
    try:    
            cursor.execute("SELECT * FROM ShoppingList WHERE FoodItemID = ?", (fooditem_id,))
            food_item = cursor.fetchone()
            if food_item is None:
                cursor.execute("INSERT INTO ShoppingList (FoodItemID, Quantity, Unit) VALUES (?, ?, ?)", (fooditem_id, quantity, unit))
                conn.commit()
            else:
                cursor.execute("UPDATE ShoppingList SET Quantity = Quantity + ? WHERE FoodItemID = ?", (quantity, fooditem_id))
                conn.commit()     
    except sqlite3.Error as e:
            print(f"A database error has happened: {e}")
    finally:
            conn.close()


    return jsonify({"message": "Item added to shopping list successfully"}), 200

@shopping_list_bp.route("/shoppinglist/remove", methods=["POST"])
def shoppinglistremove():
    
    data = request.get_json()
    fooditem_id = data.get("fooditem_id")
    print(f"Received data: fooditem_id={fooditem_id}")
    conn = get_db_connection()
    cursor = conn.cursor()
    
    try:    
            
            cursor.execute("DELETE FROM ShoppingList WHERE FoodItemID = ?", (fooditem_id,))
            conn.commit()
               
    except sqlite3.Error as e:
            print(f"A database error has happened: {e}")
    finally:
            conn.close()


    return jsonify({"message": "Item removed from shopping list successfully"}), 200