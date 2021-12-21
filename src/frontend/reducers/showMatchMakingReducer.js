const {
  TRY_MATCHMAKING,
  FINISH_MATCHMAKING,
} = require("../actions/actionTypes");

export function showMatchMakingReducer(state = false, action) {
  let { type } = action;
  switch (type) {
    case TRY_MATCHMAKING:
      return true;
    case FINISH_MATCHMAKING:
      return false;
    default:
      return state;
  }
}
