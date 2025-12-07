from flask import request, jsonify
from . import contact_bp
from .schemas import ContactMessage
from .services import ContactService
from app.utils import api_response
from app.constants import messages
from pydantic import ValidationError

@contact_bp.route('/', methods=['POST'])
def send_contact_email():
    """
    POST /api/v1/contacts/
    Prima json sa: {name: str,email: str,message: str}
    vraca {success: bool, message: str,data: null}
    """
    try:
        data = request.get_json()

        contact_message = ContactMessage(**data)
        email_sent, error_message = ContactService.send_email(contact_message) 
        
        if email_sent:
            return api_response.success(messages.CONTACT_SENT, None, 200)
        else:
            return api_response.error(error_message, 500) 
        
    except ValidationError as e:
        return api_response.error(messages.INVALID_CONTACT_DATA, 400, e.errors())
    except Exception as e:
        return api_response.error(f"Unexpected error: {str(e)}", 500)