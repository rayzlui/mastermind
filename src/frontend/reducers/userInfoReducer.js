export function userInfoReducer(state = null, action) {
  let { type, payload } = action;
  switch (type) {
    case LOGIN_USER:
      return payload;
    case LOGOUT_USER:
      return null;
    default:
      return state;
  }
}
