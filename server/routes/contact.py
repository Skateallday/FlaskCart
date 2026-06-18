import json
from flask import Blueprint, request


contact_bp = Blueprint("contact", __name__)


@contact_bp.route("/contact", methods=["POST"])
def send_contact_form():
    data = request.get_json()
    print(data)

    return json.dumps({'status':'successful'})