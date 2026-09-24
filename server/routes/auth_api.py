from flask import Blueprint, jsonify, request, session
from flask_bcrypt import check_password_hash

from db import get_db_connection

auth_api_bp = Blueprint("auth_api", __name__)


@auth_api_bp.route("/auth/me", methods=["GET"])
def auth_me():
    username = session.get("username")

    if not username:
        return jsonify({
            "authenticated": False,
            "user": None
        }), 200

    return jsonify({
        "authenticated": True,
        "user": {
            "username": username
        }
    }), 200

@auth_api_bp.route("/auth/login", methods=["POST"])
def auth_login():
    data = request.get_json(silent=True) or {}

    username = data.get("username", "").strip()
    password = data.get("password", "")

    if not username or not password:
        return jsonify({
            "error": "Username and password are required."
        }), 400

    conn = get_db_connection()

    try:
        user = conn.execute(
            "SELECT * FROM users WHERE username = ?",
            (username,)
        ).fetchone()
    finally:
        conn.close()

    if not user or not check_password_hash(user["password"], password):
        return jsonify({
            "error": "Username or password was not recognised."
        }), 401

    session.permanent = True
    session["username"] = user["username"]

    return jsonify({
        "authenticated": True,
        "user": {
            "username": user["username"]
        }
    }), 200

@auth_api_bp.route("/auth/logout", methods=["POST"])
def auth_logout():
    session.clear()

    return jsonify({
        "authenticated": False,
        "user": None
    }), 200