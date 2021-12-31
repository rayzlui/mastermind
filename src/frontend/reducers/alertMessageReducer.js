import { SET_ALERT_MESSAGE } from "../actions/actionTypes";

export function alertMessageReducer(state = null, action) {
  if (action.type === SET_ALERT_MESSAGE) {
    return action.payload;
  }
  return state;
}
