import { GAMEOVER } from "../actions/actionTypes";

export function gameOverReducer(state = false, action) {
  let { type } = action;
  switch (type) {
    case GAMEOVER:
      return true;
    default:
      return state;
  }
}
