import { SHOW_LOGIN, HIDE_LOGIN } from "../actions/actionTypes";

export function showLoginReducer(state = null, action) {
  let { type, payload } = action;
  switch (type) {
    case SHOW_LOGIN:
      return payload;
    case HIDE_LOGIN:
      return null;
    default:
      return state;
  }
}
