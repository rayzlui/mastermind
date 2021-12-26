import { WINNER, RESET } from "../actions/actionTypes";

export function isWinnerReducer(state = false, action) {
  let { type } = action;
  switch (type) {
    case RESET:
      return false;
    case WINNER:
      return true;
    default:
      return state;
  }
}
