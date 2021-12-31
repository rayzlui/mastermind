import { UPDATE_OPPONENT, RESET, LOGOUT_USER } from "../actions/actionTypes";

export function opponentDataReducer(state = null, action) {
  let { type, payload } = action;
  switch (type) {
    case LOGOUT_USER:
      return null;
    case UPDATE_OPPONENT:
      return Object.assign({}, state, payload);
    default:
      return state;
  }
}
