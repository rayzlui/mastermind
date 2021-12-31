import { RESET, USED_HINT } from "../actions/actionTypes";

export function hintsRemainingReducer(state = 5, action) {
  let { type } = action;
  switch (type) {
    case RESET:
      return 5;
    case USED_HINT:
      return state - 1;
    default:
      return state;
  }
}
