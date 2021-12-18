import { generateCode } from "../gameLogic/generateCode";
import {
  ADD_USER_MOVE_HISTORY,
  GAMEOVER,
  SET_DIFFICULTY,
  SET_MASTERMIND_CODE,
  SET_TURNS,
  USER_SUBMIT,
} from "./actionTypes";

function setMastermindCode(code) {
  return { type: SET_MASTERMIND_CODE, payload: code };
}

export function userSubmit() {
  return { type: USER_SUBMIT };
}
export function addMoveToHistory(move) {
  return { type: ADD_USER_MOVE_HISTORY, payload: move };
}

export function setTurns(turns) {
  return { type: SET_TURNS, payload: turns };
}

export function gameOver() {
  return { type: GAMEOVER, payload: true };
}

export function setDifficulty(codeLength, maxDigits) {
  return { type: SET_DIFFICULTY, payload: { codeLength, maxDigits } };
}
export function generateMastermindCode(codeLength, maxDigits) {
  return async (dispatch) => {
    let code = await generateCode(codeLength, maxDigits);
    dispatch(setDifficulty(codeLength, maxDigits));
    dispatch(setMastermindCode(code));
  };
}
