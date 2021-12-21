import { generateCode } from "../gameLogic/generateCode";
import {
  ADD_USER_MOVE_HISTORY,
  GAMEOVER,
  LOGIN_USER,
  LOGOUT_USER,
  SET_DIFFICULTY,
  SET_MASTERMIND_CODE,
  SET_TURNS,
  UPDATE_OPPONENT,
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
    dispatch(setMastermindCode(code));
  };
}

export function updateOpponent(data) {
  return { type: UPDATE_OPPONENT, payload: data };
}

export function requestPvpMatch(difficulty, name) {
  console.log(difficulty, name);
  return async (dispatch) => {
    let request = await fetch(
      `http://localhost:3001/game/pvp/${difficulty}/${name}`
    );
    let data = await request.json();
    console.log(data);
    let { player1, player2, code, _id, winner, player1Moves, player2Moves } =
      await data;
    dispatch(setMastermindCode(code));
    dispatch(
      updateOpponent({
        player1,
        player2,
        _id,
        winner,
        player1Moves,
        player2Moves,
      })
    );
  };
}

export function updateDataBaseForPvP(gameid, userid) {
  console.log(`http://localhost:3001/${gameid}/${userid}`);
  return async (dispatch) => {
    let request = await fetch(`http://localhost:3001/${gameid}/${userid}`);
    let data = await request.json();
    console.log(data);
    let { player1, player2, code, _id, winner, player1Moves, player2Moves } =
      await data;
    dispatch(setMastermindCode(code));
    dispatch(
      updateOpponent({
        player1,
        player2,
        _id,
        winner,
        player1Moves,
        player2Moves,
      })
    );
  };
}

export function loginUser(data) {
  return { type: LOGIN_USER, payload: data };
}

export function logoutUser() {
  return { type: LOGOUT_USER };
}
