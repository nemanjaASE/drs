from flask import Blueprint

contact_bp = Blueprint('contact', __name__, url_prefix='/api/v1/contacts')


from . import routes
