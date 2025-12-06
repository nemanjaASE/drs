from flask_pymongo import PyMongo
from flask_cors import CORS
from flask_socketio import SocketIO

mongo: PyMongo = PyMongo()
cors: CORS = CORS()
socketio: SocketIO = SocketIO()