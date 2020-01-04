import { SIGNIN_SUCCESS, SIGNIN_FAILURE, SIGNOUT, SIGNUP } from './actionTypes';

const initialState = {
  user_info: null,
  auth_token: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN_SUCCESS:
      return {
        user_info: action.payload['user_info'],
        auth_token: action.payload['auth_token']
      };
    case SIGNIN_FAILURE:
      return {
        user_info: null,
        auth_token: null
      };
    case SIGNUP:
      return {
        user_info: action.payload['user_info'],
        auth_token: action.payload['auth_token']
      };
    case SIGNOUT:
      return {
        user_info: null,
        auth_token: null
      };
    default:
      return state
  }
}

export default authReducer;
