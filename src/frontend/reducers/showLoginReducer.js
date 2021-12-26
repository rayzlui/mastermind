import { SHOW_LOGIN, HIDE_LOGIN } from "../actions/actionTypes";

export function showLoginReducer(state = false, action) {
  let { type } = action;
  switch (type) {
    case SHOW_LOGIN:
      return true;
    case HIDE_LOGIN:
      return false;
    default:
      return state;
  }
}
