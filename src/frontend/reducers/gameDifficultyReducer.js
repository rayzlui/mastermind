import { SET_DIFFICULTY } from "../actions/actionTypes";

const translateDifficultyToNums = {
  easy: { name: "easy", codeLength: 4, maxDigit: 4 },
  normal: { name: "normal", codeLength: 4, maxDigit: 8 },
  hard: { name: "hard", codeLength: 7, maxDigit: 9 },
};

let intialState = translateDifficultyToNums.normal;

export function gameDifficultyReducer(state = intialState, action) {
  let { type, payload } = action;
  switch (type) {
    case SET_DIFFICULTY:
      let { name, codeLength, maxDigit } = payload;
      if (translateDifficultyToNums[name]) {
        return Object.assign({}, state, translateDifficultyToNums[name]);
      } else {
        //custom
        return Object.assign({}, state, {
          name: "custom",
          codeLength,
          maxDigit,
        });
      }
    default:
      return state;
  }
}
