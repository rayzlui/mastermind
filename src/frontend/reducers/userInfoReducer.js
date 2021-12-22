import { LOGIN_USER, LOGOUT_USER } from "../actions/actionTypes";

export function userInfoReducer(state = null, action) {
  let { type, payload } = action;
  switch (type) {
    case LOGIN_USER:
      return payload;
    case LOGOUT_USER:
      return null;
    default:
      return state;
  }
}
