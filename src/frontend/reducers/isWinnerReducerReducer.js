import { WINNER, RESET, LOSER } from "../actions/actionTypes";

export function isWinnerReducer(state = null, action) {
  let { type } = action;
  switch (type) {
    case RESET:
      return null;
    case WINNER:
      return true;
    case LOSER:
      return false;
    default:
      return state;
  }
}
