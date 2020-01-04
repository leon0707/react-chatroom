import io from 'socket.io-client';

import { INIT_WBESOCKET, RECEIVE_SOCKET_WEBSOCKET_MESSAGE,
SEND_WEBSOCKET_MESSAGE } from './chat/actionTypes';

function createWebsocket(url) {
  return io(url);
}

function receiveMessage(store, message) {
  store.dispatch({
      type : RECEIVE_SOCKET_WEBSOCKET_MESSAGE,
      payload : message
  });
}

function websocketError(store, error) {
  console.log(error);
}

function websocketDisconnect(store, reason) {
  console.log('websocket disconnect');
  console.log(reason);
}

function websocketConnect(store) {
  console.log('websocket connected');
}

const webSocketMiddleware = (url) => {
    let socket;
    return store => {
        return next => action => {
            if (action.type === INIT_WBESOCKET) {
              socket = createWebsocket(url);
              socket.on('connect', () => {
                  websocketConnect(store);
                  // join the room
                  socket.emit('join', {
                      'user_info': store.getState()['auth']['user_info'],
                      'room_id': 0
                  });
              });
              socket.on('message', (message) => receiveMessage(store, message));
              socket.on('error', (error) => websocketError(store, error));
              socket.on('disconnect', (reason) => websocketDisconnect(store, reason));
            } else if (action.type === SEND_WEBSOCKET_MESSAGE) {
                socket.send(action.payload);
            }

            return next(action);
        }
    }
}

export default webSocketMiddleware;
