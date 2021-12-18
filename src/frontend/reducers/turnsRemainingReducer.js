import { SET_TURNS, USER_SUBMIT } from "../actions/actionTypes";

export function turnsRemainingReducer(state = 8, action) {
  let { type, payload } = action;
  switch (type) {
    case SET_TURNS:
      return payload;
    case USER_SUBMIT:
      return state - 1;
    default:
      return state;
  }
}
