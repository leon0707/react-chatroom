import datetime

from flask import Flask, jsonify, request
from flask_socketio import SocketIO, emit, send, join_room, leave_room
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app, supports_credentials=True)
    socketio = SocketIO(app, cors_allowed_origins='*', logger=True, engineio_logger=True)

    @app.route('/api/signin', methods=['POST'])
    def signin():
        res_json = request.get_json()
        if res_json['username'] == 'user1' and res_json['password'] == '0000':
            return jsonify({
                'jwt': 'jwt_placeholder',
                'user_info': {'username': 'user1', 'id': 1, 'avatarUrl': "https://via.placeholder.com/24/008000/008000.png"}
            })
        elif res_json['username'] == 'user2' and res_json['password'] == '0000':
            return jsonify({
                'jwt': 'jwt_placeholder',
                'user_info': {'username': 'user2', 'id': 2, 'avatarUrl': "https://via.placeholder.com/24/FFFF00/000000.png"}
            })
        else:
            return jsonify({'errorMessage': 'Wrong username or password'}), 401

    @socketio.on('connect', namespace='/chat')
    def socket_connection():
        pass

    @socketio.on('message', namespace='/chat')
    def receive_message(message):
        send(message, room=message['roomId'], include_self=False)

    @socketio.on('join', namespace='/chat')
    def on_join(data):
        username = data['user_info']['username']
        room_id = data['room_id']
        join_room(room_id)
        send({
            'text': username + ' has entered the room.',
            'timestamp': datetime.datetime.utcnow().microsecond,
            'type': 'notification'
        }, room=room_id)

    return socketio, app

if __name__ == '__main__':
    socketio, app = create_app()
    socketio.run(app, host='0.0.0.0', port=5001, debug=True)
