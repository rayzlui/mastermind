import { SET_TURNS, USER_SUBMIT, RESET } from "../actions/actionTypes";

export function turnsRemainingReducer(state = 8, action) {
  let { type, payload } = action;
  switch (type) {
    case RESET:
      return 8;
    case SET_TURNS:
      return payload;
    case USER_SUBMIT:
      return state - 1;
    default:
      return state;
  }
}
