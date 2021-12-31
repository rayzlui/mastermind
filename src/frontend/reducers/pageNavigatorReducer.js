import {
  PLAY_GAME,
  DISPLAY_USER,
  VIEW_LEADERBOARD,
  REQUEST_LOGIN,
  REQUEST_ACCOUNT_CREATE,
  DISPLAY_CURRENT_USER,
  SELECT_DIFFICULTY,
  LOGOUT_USER,
} from "../actions/actionTypes";

export function pageNavigatorReducer(state = SELECT_DIFFICULTY, action) {
  switch (action.type) {
    case LOGOUT_USER:
    case SELECT_DIFFICULTY:
      return SELECT_DIFFICULTY;
    case PLAY_GAME:
      return PLAY_GAME;
    case DISPLAY_USER:
      return DISPLAY_USER;
    case DISPLAY_CURRENT_USER:
      return DISPLAY_CURRENT_USER;
    case VIEW_LEADERBOARD:
      return VIEW_LEADERBOARD;
    case REQUEST_LOGIN:
      return REQUEST_LOGIN;
    case REQUEST_ACCOUNT_CREATE:
      return REQUEST_ACCOUNT_CREATE;
    default:
      return state;
  }
}
