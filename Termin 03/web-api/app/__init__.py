from flask import Flask
from .test_db import test_connection
from .extensions import mongo, cors, socketio
from .users import users_bp

def create_app() -> Flask:
    app = Flask(__name__)

    # Load configuration
    app.config.from_object('config.Config')

    # Initialize extensions
    cors.init_app(app, origins=app.config["CORS_ALLOWED_ORIGINS"])
    mongo.init_app(app)
    
    # Initialize SocketIO with CORS support
    socketio.init_app(app, cors_allowed_origins=app.config["CORS_ALLOWED_ORIGINS"])

    # Test MongoDB connection
    test_connection()

    # Register blueprints
    app.register_blueprint(users_bp)

    return app