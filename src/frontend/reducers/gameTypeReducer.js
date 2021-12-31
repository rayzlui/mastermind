const {
  SET_TOURNAMENT,
  SET_PVP,
  SET_SINGLE_PLAYER,
  LOGOUT_USER,
} = require("../actions/actionTypes");

export function gameTypeReducer(state = SET_SINGLE_PLAYER, action) {
  let { type } = action;
  switch (type) {
    case LOGOUT_USER:
    case SET_SINGLE_PLAYER:
      return SET_SINGLE_PLAYER;
    case SET_PVP:
      return SET_PVP;
    case SET_TOURNAMENT:
      return SET_TOURNAMENT;
    default:
      return state;
  }
}
