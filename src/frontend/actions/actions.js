import { generateCode } from "../gameLogic/generateCode";
import {
  ADD_USER_MOVE_HISTORY,
  WINNER,
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

export function weHaveAWinner() {
  return { type: WINNER, payload: true };
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

export function requestPvpMatch(difficulty, user) {
  console.log(difficulty, user);
  let { name, id } = user;
  return async (dispatch) => {
    let request = await fetch(
      `http://localhost:3001/game/pvp/${difficulty}/${name}/${id}`
    );
    let data = await request.json();
    console.log(data);
    let { players, code, _id, winner } = await data;
    dispatch(setMastermindCode(code));
    dispatch(
      updateOpponent({
        players,
        _id,
        winner,
      })
    );
  };
}

export function updateDataBaseForPvP(gameid, userid, isWinner) {
  return async (dispatch) => {
    let request = await fetch(`http://localhost:3001/game/${gameid}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        gameid,
        userid,
        winner: isWinner,
      }),
    });
    let data = await request.json();
    console.log(data);
    let { players, winner } = await data;
    console.log(players, winner);
    dispatch(
      updateOpponent({
        players,
        winner,
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

export function createUser(username, password, key) {
  return async (dispatch) => {
    let request = await fetch(`http://localhost:3001/user/create`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        key,
      }),
    });
    console.log(request);
    if (request.status === 200) {
      let userData = await request.json();
      dispatch(loginUser(userData));
    } else {
      //unable to create user, they gotta do it again
      if (request.status === 418) {
      }
      //need to redo recreate account
    }
  };
}

export function LoginUser(username, password) {
  return async (dispatch) => {
    let request = await fetch(`http://localhost:3001/user/login`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    if (request.status === 200) {
      let userData = await request.json();
      dispatch(loginUser(userData));
    } else {
      //unable to create user, they gotta do it again
      if (request.status === 418) {
      }
      //need to redo recreate account
    }
  };
}
