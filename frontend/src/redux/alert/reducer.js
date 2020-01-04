import { SUCCESS, ERROR, CLEAR } from './actionTypes';

const initialState = {
  type: null,
  message: null
};

const alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUCCESS:
      return {
        ...state,
        type: 'success',
        message: action.payload
      };
    case ERROR:
      return {
        type: 'danger',
        message: action.payload
      };
    case CLEAR:
      return {
        ...state,
        type: null,
        message: null
      };
    default:
      return state
  }
}

export default alertReducer;
