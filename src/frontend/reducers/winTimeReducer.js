import { SET_WIN_TIME, RESET } from "../actions/actionTypes";

export function winTimeReducer(state = null, action) {
  let { type, payload } = action;
  switch (type) {
    case SET_WIN_TIME:
      return payload;
    case RESET:
      return null;
    default:
      return state;
  }
}
