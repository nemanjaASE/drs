from bson import ObjectId
from .schemas import UserCreate, UserOut, UserUpdate
from app.extensions import mongo, socketio
import base64
from typing import BinaryIO, Optional
from pymongo import ReturnDocument

class UserService:
    @staticmethod
    def create_user(user_create: UserCreate, profile_image_file: Optional[BinaryIO] = None) -> UserOut:
        """Create a new user in the database."""
        user_dict = user_create.model_dump(exclude={'profile_image'})

        if profile_image_file:
            # Process the profile image file
            image_bytes: bytes = profile_image_file.read()
            user_dict['profile_image'] = base64.b64encode(image_bytes).decode('utf-8')
        else:
            user_dict['profile_image'] = user_create.profile_image

        # Insert user into the database
        if mongo.db is None:
            raise Exception("Database connection is not initialized.")

        result = mongo.db.users.insert_one(user_dict)
        user_dict['id'] = str(result.inserted_id)

        user_out = UserOut(**user_dict)
        
        # Emit WebSocket event for new user creation
        socketio.emit('user_created', user_out.model_dump())
        
        return user_out
    
    @staticmethod
    def get_user(user_id: str) -> Optional[UserOut]:
        """Retrieve a user by ID."""
        if mongo.db is None:
            raise Exception("Database connection is not initialized.")

        user_data = mongo.db.users.find_one({'_id': ObjectId(user_id)})
        if user_data:
            user_data['id'] = str(user_data['_id'])
            return UserOut(**user_data)
        return None
    
    @staticmethod
    def get_all_users() -> list[UserOut]:
        """Retrieve all users from the database."""
        if mongo.db is None:
            raise Exception("Database connection is not initialized.")

        users_cursor = mongo.db.users.find()
        users = []
        for user_data in users_cursor:
            user_data['id'] = str(user_data['_id'])
            users.append(UserOut(**user_data))
        return users
    
    @staticmethod
    def delete_user(user_id: str) -> bool:
        """Delete a user by ID."""
        if mongo.db is None:
            raise Exception("Database connection is not initialized.")

        result = mongo.db.users.delete_one({'_id': ObjectId(user_id)})
        return result.deleted_count > 0
    
    @staticmethod
    def update_user(user_id: str, user_update: UserUpdate, profile_image_file: Optional[BinaryIO] = None) -> Optional[UserOut]:
        """Update only the fields that are provided in user_update."""
        if mongo.db is None:
            raise Exception("Database connection is not initialized.")
        
        update_fields = {}
        
        for field, value in user_update.model_dump(exclude_unset=True).items():
            update_fields[field] = value
        
        if profile_image_file:
            image_bytes: bytes = profile_image_file.read()
            update_fields['profile_image'] = base64.b64encode(image_bytes).decode('utf-8')

        if update_fields:
            updated_user = mongo.db.users.find_one_and_update(
                {'_id': ObjectId(user_id)},
                {'$set': update_fields},
                return_document=ReturnDocument.AFTER
            )
            updated_user['id'] = str(updated_user['_id'])
            return UserOut(**updated_user)

        return None