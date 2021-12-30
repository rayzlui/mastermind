import { LOGIN_USER, LOGOUT_USER } from "../actions/actionTypes";

let initialState = JSON.parse(sessionStorage.getItem("currentUser")) || null;

export function currentUserReducer(state = initialState, action) {
  let { type, payload } = action;
  switch (type) {
    case LOGIN_USER:
      return payload;
    case LOGOUT_USER:
      sessionStorage.removeItem("currentUser");
      return null;
    default:
      return state;
  }
}
