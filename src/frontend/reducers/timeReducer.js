import { SET_WIN_TIME, RESET } from "../actions/actionTypes";

let initialState = 180000;

export function timeReducer(state = initialState, action) {
  let { type, payload } = action;
  switch (type) {
    case SET_WIN_TIME:
      return payload;
    case RESET:
      return initialState;
    default:
      return state;
  }
}
