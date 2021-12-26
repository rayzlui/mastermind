import scramblePassword from "../../backend/scramblePass";
import { generateCode } from "../gameLogic/generateCode";
import {
  ADD_USER_MOVE_HISTORY,
  RESET,
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
  DISPLAY_USER,
  DISPLAY_CURRENT_USER,
  SHOW_LOGIN,
  HIDE_LOGIN,
} from "./actionTypes";

function setMastermindCode(code) {
  return { type: SET_MASTERMIND_CODE, payload: code };
}

export function setWinTime(time) {
  return { type: SET_WIN_TIME, payload: time };
}

export function displayCurrentUser() {
  return { type: DISPLAY_CURRENT_USER };
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

export function reset() {
  return { type: RESET };
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
    console.log(code);
    dispatch(setMastermindCode(code));
  };
}

export function updateOpponent(data) {
  return { type: UPDATE_OPPONENT, payload: data };
}

export function requestPvpMatch(difficulty, type, user) {
  let { username } = user;
  return async (dispatch) => {
    let request = await fetch(
      `http://localhost:3001/api/game/${type}/${difficulty}/${username}/${user._id}`
    );
    let data = await request.json();
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
      dispatch(showThisUser(data));
      dispatch(changePageTo(DISPLAY_USER));
    } else {
      alert("Unable to find user");
    }
  };
}
export function showThisUser(data) {
  return { type: USER_FOUND, payload: data };
}

export function logUserHistory(user, code, time, difficulty, callback) {
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
      callback(false);
    } else {
      dispatch({ type: SAVE_COMPLETE });
      callback(true);
    }
  };
}

export function updateDataBaseForPvP(gameid, userid, finished, time) {
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
        time: time,
      }),
    });
    let data = await request.json();
    let { players } = await data;
    dispatch(
      updateOpponent({
        players,
      })
    );
  };
}

export function setCurrentUser(data) {
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
      dispatch(setCurrentUser(userData));
    } else {
      //unable to create user, they gotta do it again
      if (request.status === 418) {
      }
      //need to redo recreate account
    }
  };
}

export function showLogin() {
  return { type: SHOW_LOGIN };
}

export function hideLogin() {
  return { type: HIDE_LOGIN };
}
export function loginUser(username, password, callback) {
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
      if (request.status === 200) {
        let userData = await request.json();
        dispatch(setCurrentUser(userData));
      } else {
        //unable to create user, they gotta do it again
        if (request.status === 418) {
          callback("Unable to find username, password combination");
        }
        //need to redo recreate account
      }
    } else {
      //user not found
      callback("Unable to find username");
    }
  };
}

export function changePageTo(page) {
  return { type: page };
}
