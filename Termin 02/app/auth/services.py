from app.extensions import db
from app.models import User

class UserService:

    @staticmethod
    def create_user(username: str, password: str, email: str = None):
        """Create new user"""
        if User.query.filter_by(username=username).first():
            raise ValueError("Username already exists")
        
        user = User(username=username, email=email)
        user.set_password(password)
        db.session.add(user)
        db.session.commit()
        return user

    @staticmethod
    def authenticate(email: str, password: str):
        """Authenticate user"""
        user = User.query.filter_by(email=email).first()
        if user and user.check_password(password):
            return user
        return None

    @staticmethod
    def get_user_by_id(user_id: int):
        return User.query.get(user_id)
