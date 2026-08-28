import re
import sqlite3

from flask import Blueprint, current_app, jsonify, request
from flask_mail import Message

from db import get_db_connection
from extensions import mail


contact_bp = Blueprint("contact", __name__)

EMAIL_PATTERN = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")


def error_response(
    code,
    message,
    status,
    *,
    fields=None,
    **additional_data,
):
    error = {
        "code": code,
        "message": message,
    }

    if fields:
        error["fields"] = fields

    response = {
        "error": error,
        **additional_data,
    }

    return jsonify(response), status


def clean_text(value):
    if not isinstance(value, str):
        return ""

    return value.strip()


def validate_contact_payload(payload):
    name = clean_text(payload.get("name"))
    email = clean_text(payload.get("email"))
    message = clean_text(payload.get("message"))

    field_errors = {}

    if not name:
        field_errors["name"] = "Enter your name."
    elif len(name) > 100:
        field_errors["name"] = (
            "Your name must be 100 characters or fewer."
        )

    if not email:
        field_errors["email"] = "Enter your email address."
    elif len(email) > 254:
        field_errors["email"] = (
            "Your email address must be 254 characters or fewer."
        )
    elif not EMAIL_PATTERN.fullmatch(email):
        field_errors["email"] = "Enter a valid email address."

    if not message:
        field_errors["message"] = "Enter a message."
    elif len(message) > 5000:
        field_errors["message"] = (
            "Your message must be 5,000 characters or fewer."
        )

    cleaned_data = {
        "name": name,
        "email": email,
        "message": message,
    }

    return cleaned_data, field_errors


def save_enquiry(name, email, message):
    connection = get_db_connection()

    try:
        cursor = connection.execute(
            """
            INSERT INTO ContactEnquiries (
                name,
                email,
                message
            )
            VALUES (?, ?, ?)
            """,
            (name, email, message),
        )

        connection.commit()

        return cursor.lastrowid

    except sqlite3.Error:
        connection.rollback()
        raise

    finally:
        connection.close()


def update_email_status(enquiry_id, status):
    connection = get_db_connection()

    try:
        if status == "sent":
            cursor = connection.execute(
                """
                UPDATE ContactEnquiries
                SET
                    email_status = 'sent',
                    email_attempted_at = CURRENT_TIMESTAMP,
                    email_sent_at = CURRENT_TIMESTAMP
                WHERE enquiry_id = ?
                """,
                (enquiry_id,),
            )

        elif status == "failed":
            cursor = connection.execute(
                """
                UPDATE ContactEnquiries
                SET
                    email_status = 'failed',
                    email_attempted_at = CURRENT_TIMESTAMP,
                    email_sent_at = NULL
                WHERE enquiry_id = ?
                """,
                (enquiry_id,),
            )

        else:
            raise ValueError(
                f"Unsupported email status: {status}"
            )

        connection.commit()

        return cursor.rowcount == 1

    except sqlite3.Error:
        connection.rollback()
        raise

    finally:
        connection.close()


def safely_update_email_status(enquiry_id, status):
    try:
        return update_email_status(enquiry_id, status)

    except sqlite3.Error:
        current_app.logger.exception(
            "Could not update email status for contact enquiry %s",
            enquiry_id,
        )

        return False


@contact_bp.route("/contact", methods=["POST"])
def send_contact_form():
    payload = request.get_json(silent=True)

    if not isinstance(payload, dict):
        return error_response(
            "invalid_json",
            "Send the contact enquiry as a JSON object.",
            400,
            saved=False,
            email_sent=False,
        )

    contact_data, field_errors = validate_contact_payload(payload)

    if field_errors:
        return error_response(
            "validation_error",
            "Please correct the highlighted fields.",
            422,
            fields=field_errors,
            saved=False,
            email_sent=False,
        )

    try:
        enquiry_id = save_enquiry(**contact_data)

    except sqlite3.Error:
        current_app.logger.exception(
            "Could not save contact enquiry."
        )

        return error_response(
            "persistence_failed",
            "We couldn't save your message. Please try again.",
            500,
            saved=False,
            email_sent=False,
        )

    recipient = current_app.config.get("CONTACT_RECIPIENT")

    if not recipient:
        current_app.logger.error(
            "CONTACT_RECIPIENT is not configured."
        )

        safely_update_email_status(enquiry_id, "failed")

        return error_response(
            "email_configuration_error",
            (
                "Your message was saved, but the notification "
                "could not be sent. There is no need to submit "
                "it again."
            ),
            502,
            saved=True,
            email_sent=False,
        )

    notification = Message(
        subject="New FlaskCart contact enquiry",
        recipients=[recipient],
        reply_to=contact_data["email"],
        body=(
            "A new FlaskCart contact enquiry has been received.\n\n"
            f"Name: {contact_data['name']}\n"
            f"Email: {contact_data['email']}\n\n"
            "Message:\n"
            f"{contact_data['message']}\n"
        ),
    )

    try:
        mail.send(notification)

    except Exception:
        current_app.logger.exception(
            "Email delivery failed for contact enquiry %s.",
            enquiry_id,
        )

        safely_update_email_status(enquiry_id, "failed")

        return error_response(
            "email_delivery_failed",
            (
                "Your message was saved, but the notification "
                "could not be sent. There is no need to submit "
                "it again."
            ),
            502,
            saved=True,
            email_sent=False,
        )

    status_updated = safely_update_email_status(
        enquiry_id,
        "sent",
    )

    if not status_updated:
        return error_response(
            "delivery_status_update_failed",
            (
                "Your message was saved and sent, but its "
                "delivery status could not be recorded. "
                "There is no need to submit it again."
            ),
            500,
            saved=True,
            email_sent=True,
        )

    return jsonify(
        {
            "message": "Thanks — your message has been received.",
            "saved": True,
            "email_sent": True,
        }
    ), 201