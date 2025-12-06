from flask import Blueprint

contact_bp = Blueprint('contact', __name__, url_prefix='/api/v1/contacts')


from .routes import register_contact_routes
contact_bp = register_contact_routes(contact_bp)  # ← DODAJ = contact_bp