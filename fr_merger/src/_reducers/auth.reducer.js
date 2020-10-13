import * as actionTypes from '../_const/actions';
let token = '';//localStorage.getItem('token');
let auth = '';//localStorage.getItem('auth');
const initialState = auth ? { loggedIn: true, auth, token, loginFail: false } : {loginFail: false};


export function authentication(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return {
        loggingIn: true,
        auth: action.auth,
        token: action.token,
        loginFail: false
      };
    case actionTypes.LOGOUT_SUCCESS:
      return {
        auth: false,
        loginFail: false
      };
    case actionTypes.LOGIN_FAIL:
      return {
        auth: false,
        loginFail: true
      };
    default:
      return state
  }
}