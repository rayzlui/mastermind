import scramblePassword from "../../backend/scramblePass";
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
  SET_WIN_TIME,
  SAVE_COMPLETE,
  UNABLE_TO_SAVE,
  USER_FOUND,
} from "./actionTypes";

function setMastermindCode(code) {
  return { type: SET_MASTERMIND_CODE, payload: code };
}

export function setWinTime(time) {
  return { type: SET_WIN_TIME, payload: time };
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

export function setDifficulty(codeLength, maxDigits, name) {
  return {
    type: SET_DIFFICULTY,
    payload: { codeLength, maxDigits, name: name },
  };
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

export function requestPvpMatch(difficulty, type, user) {
  let { name, id } = user;
  return async (dispatch) => {
    let request = await fetch(
      `http://localhost:3001/api/game/${type}/${difficulty}/${name}/${id}`
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

export function searchUser(username) {
  return async (dispatch) => {
    let request = await fetch(`http://localhost:3001/api/users/${username}`);
    if (request.status === 200) {
      let data = await request.json();
      dispatch(foundUser(data));
    } else {
      alert("Unable to find user");
    }
  };
}
function foundUser(data) {
  return { type: USER_FOUND, payload: data };
}

export function logUserHistory(user, code, time, difficulty) {
  let { _id } = user;
  return async function (dispatch) {
    let putToUserHistory = await fetch(
      `http://localhost:3001/api/userhistory/add/${_id}`,
      {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
          time,
          difficulty,
        }),
      }
    );
    let postToLeaderBoard = await fetch(
      `http://localhost:3001/api/leaderboard/`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user,
          code,
          time,
          difficulty,
        }),
      }
    );
    if (putToUserHistory.status !== 200 || postToLeaderBoard.status !== 200) {
      dispatch({ type: UNABLE_TO_SAVE });
    } else {
      dispatch({ type: SAVE_COMPLETE });
    }
  };
}

export function updateDataBaseForPvP(gameid, userid, finished) {
  return async (dispatch) => {
    let request = await fetch(`http://localhost:3001/api/game/${gameid}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        gameid,
        userid,
        finished: finished,
      }),
    });
    let data = await request.json();
    console.log(data);
    let { players } = await data;
    dispatch(
      updateOpponent({
        players,
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
    let request = await fetch(`http://localhost:3001/api/user/create`, {
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
    let requestKey = await fetch(
      `http://localhost:3001/api/getKey/login/${username}`
    );
    if (requestKey.status === 200) {
      let key = await requestKey.json();
      let scrambled = await scramblePassword(password, key);
      let request = await fetch(`http://localhost:3001/api/user/login`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password: scrambled,
        }),
      });
      await console.log(request);
      if (request.status === 200) {
        let userData = await request.json();
        dispatch(loginUser(userData));
      } else {
        //unable to create user, they gotta do it again
        if (request.status === 418) {
        }
        //need to redo recreate account
      }
    } else {
      //user not found
    }
  };
}
