import { ADD_USER_MOVE_HISTORY, RESET } from "../actions/actionTypes";

export function moveHistoryReducer(state = [], action) {
  let { type, payload } = action;
  switch (type) {
    case RESET:
      return [];
    case ADD_USER_MOVE_HISTORY:
      let copyState = state.slice();
      copyState.push(payload);
      return copyState;
    default:
      return state;
  }
}
