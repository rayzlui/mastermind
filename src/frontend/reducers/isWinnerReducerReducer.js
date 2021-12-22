import { WINNER } from "../actions/actionTypes";

export function isWinnerReducer(state = false, action) {
  let { type } = action;
  switch (type) {
    case WINNER:
      return true;
    default:
      return state;
  }
}
