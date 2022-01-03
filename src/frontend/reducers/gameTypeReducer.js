const {
  TOURNAMENT,
  ONE_ON_ONE,
  SINGLE_PLAYER,
  LOGOUT_USER,
} = require("../actions/actionTypes");

export function gameTypeReducer(state = SINGLE_PLAYER, action) {
  let { type } = action;
  switch (type) {
    case LOGOUT_USER:
    case SINGLE_PLAYER:
      return SINGLE_PLAYER;
    case ONE_ON_ONE:
      return ONE_ON_ONE;
    case TOURNAMENT:
      return TOURNAMENT;
    default:
      return state;
  }
}
