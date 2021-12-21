const {
  SET_TOURNAMENT,
  SET_PVP,
  SET_SINGLE_PLAYER,
} = require("../actions/actionTypes");

export function gameTypeReducer(state = "single", action) {
  let { type } = action;
  switch (type) {
    case SET_SINGLE_PLAYER:
      return "single";
    case SET_PVP:
      return "pvp";
    case SET_TOURNAMENT:
      return "tournament";
    default:
      return state;
  }
}
