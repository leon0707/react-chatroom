import { INIT_WBESOCKET, SEND_WEBSOCKET_MESSAGE } from './actionTypes';

export const sendMessage = (message) => (
  {
    type: SEND_WEBSOCKET_MESSAGE,
    payload: message
  }
)

export const initWebsocket = () => (
  {
    type: INIT_WBESOCKET,
    payload: null
  }
)
