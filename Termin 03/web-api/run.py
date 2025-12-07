from app import create_app
from app.extensions import socketio

app = create_app()

if __name__ == "__main__":
    # Use socketio.run instead of app.run for WebSocket support
    socketio.run(app, debug=True, allow_unsafe_werkzeug=True)