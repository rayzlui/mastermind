import { UPDATE_PVP_INFO, RESET, LOGOUT_USER } from "../actions/actionTypes";

export function pvpDataReducer(state = null, action) {
  let { type, payload } = action;
  switch (type) {
    case RESET:
    case LOGOUT_USER:
      return null;
    case UPDATE_PVP_INFO:
      return Object.assign({}, state, payload);
    default:
      return state;
  }
}
