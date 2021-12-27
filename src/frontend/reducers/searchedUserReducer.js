const { USER_FOUND } = require("../actions/actionTypes");

export function searchedUserReducer(state = null, action) {
  let { type, payload } = action;
  switch (type) {
    case USER_FOUND:
      return Object.assign({}, state, payload);
    default:
      return state;
  }
}
