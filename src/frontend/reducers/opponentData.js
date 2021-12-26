import { UPDATE_OPPONENT, RESET } from "../actions/actionTypes";

export function opponentDataReducer(state = null, action) {
  let { type, payload } = action;
  switch (type) {
    case RESET:
      return null;
    case UPDATE_OPPONENT:
      return Object.assign({}, state, payload);
    default:
      return state;
  }
}
