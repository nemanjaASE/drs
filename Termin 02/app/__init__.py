from flask import Flask, redirect, url_for
from flask_login import current_user
from app.extensions import db, login_manager
from sqlalchemy import text
from app.models.User import User
from app.auth import auth_bp
from app.dashboard import dashboard_bp

def create_app():
    app = Flask(__name__, static_folder='static')
    app.config.from_object("config.Config")

    # Inicijalizacija ekstenzija sa aplikacijom
    db.init_app(app)
    login_manager.init_app(app)
    login_manager.login_message_category = "danger"

    # Inicijalizacija ruta
    app.register_blueprint(auth_bp, url_prexix="auth")
    app.register_blueprint(dashboard_bp)

    # Ako korisnik nije ulogovan uradi redirect
    login_manager.login_view = "auth.login"

    with app.app_context():

        db.create_all()

        # Test konekcije
        try:
            result = db.session.execute(text("SELECT 1")).scalar()
            print("DB connection OK, SELECT 1 returned:", result)
        except Exception as e:
            print("DB connection FAILED:", e)

    # Flask-login koristi ovu funkciju da dohvati korisnika po ID-u
    @login_manager.user_loader
    def load_user(user_id):
        return User.query.get(int(user_id))

    @app.route("/")
    def index():
        if not current_user.is_authenticated:
            return redirect(url_for("auth.login"))
        return redirect(url_for("dashboard.index"))

    return app