import { SEND_WEBSOCKET_MESSAGE, RECEIVE_SOCKET_WEBSOCKET_MESSAGE } from './actionTypes';

const initialState = {
  messages: []
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_WEBSOCKET_MESSAGE:
      return {
        messages: state.messages.concat(action.payload)
      };
    case RECEIVE_SOCKET_WEBSOCKET_MESSAGE:
      const message = Object.assign({}, action.payload);
      message['timestamp'] = +new Date(message['timestamp']);
      return {
        messages: state.messages.concat(message)
      };
    default:
      return state;
  }
}

export default chatReducer;
