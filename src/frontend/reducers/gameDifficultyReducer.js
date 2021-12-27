import { SET_DIFFICULTY } from "../actions/actionTypes";

let intialState = { codeLength: 4, maxDigit: 7 };

export function gameDifficultyReducer(state = intialState, action) {
  let { type, payload } = action;
  switch (type) {
    case SET_DIFFICULTY:
      return Object.assign({}, state, payload);
    default:
      return state;
  }
}
