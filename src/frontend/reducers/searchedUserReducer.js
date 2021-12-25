const { USER_FOUND } = require("../actions/actionTypes");

export function searchedUserReducer(state = null, action) {
  let { type, payload } = action;
  switch (type) {
    case USER_FOUND:
      return payload;
    default:
      return state;
  }
}
