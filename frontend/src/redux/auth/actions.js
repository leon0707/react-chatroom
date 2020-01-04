import { replace } from 'connected-react-router';

import { SIGNIN_SUCCESS, SIGNIN_FAILURE, SIGNOUT, SIGNUP } from './actionTypes';
import { signIn as signInService } from '../../services/auth';
import { error as alertError, clear } from '../alert/actions';

export const signIn = (username, password, from) => {
    return dispatch => {
        signInService(username, password)
          .then(res => {
            dispatch(success(res['jwt'], res['user_info']));
            dispatch(replace(from));
            dispatch(clear());
          })
          .catch(error => {
            dispatch(failure(error));
            dispatch(alertError(error.message));
          })
    };

    function success(auth_token, user_info) {
      return {
        type: SIGNIN_SUCCESS,
        payload: {
          auth_token: auth_token,
          user_info: user_info
        }
      }
    }

    function failure(error) {
      return {
        type: SIGNIN_FAILURE,
        payload: null
      }
    }
}

export const signUp = ({ firstName, lastName, email, password }) => (
    {
      type: SIGNUP,
      payload: {
        firstName,
        lastName,
        email,
        password
      }
    }
)

export const signOut = () => {
    return dispatch => {
        dispatch({
            type: SIGNOUT,
            payload: null
        });
        // redirect to index
        dispatch(replace('/'));
        // disconnect the websocket connection
    }
};
