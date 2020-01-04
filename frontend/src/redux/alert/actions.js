import { SUCCESS, ERROR, CLEAR } from './actionTypes';

export const success = (message) => {
    return {
      type: SUCCESS,
      payload: message
    }
}

export const error = (message) => (
    {
      type: ERROR,
      payload: message
    }
)

export const clear = () => (
  {
    type: CLEAR,
    payload: null
  }
)
