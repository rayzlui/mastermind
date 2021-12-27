import { SET_MASTERMIND_CODE } from "../actions/actionTypes";

export function mastermindCodeReducer(state = null, action) {
  let { type, payload } = action;
  switch (type) {
    case SET_MASTERMIND_CODE:
      return Object.assign({}, state, payload);
    default:
      return state;
  }
}
