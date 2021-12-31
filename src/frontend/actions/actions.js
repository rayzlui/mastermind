import scramblePassword from "../../backend/scramblePass";
import { generateCode } from "../gameLogic/generateCode";
import {
  ADD_USER_MOVE_HISTORY,
  RESET,
  WINNER,
  LOSER,
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
  SET_SINGLE_PLAYER,
  SET_PVP,
  PLAY_GAME,
} from "./actionTypes";

import { compareCode } from "../gameLogic/compareCode";

export function setMastermindCode(code) {
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

export function setDifficulty(codeLength, maxDigit, name) {
  return {
    type: SET_DIFFICULTY,
    payload: { codeLength, maxDigit, name: name },
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

export function updateDataBaseForPvP(gameid, userid, isWinner, time) {
  return async (dispatch) => {
    let request = await fetch(`http://localhost:3001/api/game/${gameid}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        gameid,
        userid,
        isWinner,
        time,
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
  sessionStorage.removeItem("currentUser");
  return { type: LOGOUT_USER };
}

export function createUser(username, password, key, callback) {
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

    let response = await request.json();
    if (request.status === 200) {
      dispatch(setCurrentUser(response));
      dispatch(hideLogin());
      sessionStorage.setItem("currentUser", JSON.stringify(response));
    } else {
      //unable to create user, they gotta do it again
      if (request.status === 418) {
        callback(await response.error);
      }
      //need to redo recreate account
    }
  };
}

export function showLogin(type) {
  return { type: SHOW_LOGIN, payload: type };
}

export function hideLogin() {
  return { type: HIDE_LOGIN };
}
export function loginUser(username, password, callback) {
  return async (dispatch) => {
    let requestKey = await fetch(
      `http://localhost:3001/api/getKey/login/${username}`
    );

    let keyResponse = await requestKey.json();
    if (requestKey.status === 200) {
      let scrambled = await scramblePassword(password, keyResponse);
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
      let response = await request.json();
      if (request.status === 200) {
        dispatch(setCurrentUser(response));
        sessionStorage.setItem("currentUser", JSON.stringify(response));
        dispatch(hideLogin());
      } else {
        callback(response.error);
      }
    } else {
      //user not found
      callback(keyResponse.error);
    }
  };
}

export function changePageTo(page) {
  return { type: page };
}

export function weHaveALoser() {
  return { type: LOSER };
}

function translateDiffToNums(difficulty) {
  let codeLength;
  let maxDigit;
  switch (difficulty) {
    case "easy":
      codeLength = 4;
      maxDigit = 4;
      break;
    case "hard":
      codeLength = 7;
      maxDigit = 9;
      break;
    default:
      codeLength = 4;
      maxDigit = 7;
      break;
  }
  return [codeLength, maxDigit];
}

export function createGameWithDetails(gameDetails) {
  return (dispatch, getStore) => {
    let { codeLength, maxDigit, difficulty } = gameDetails;
    let { gameType, currentUser } = getStore();
    if (gameType !== SET_SINGLE_PLAYER && currentUser === null) {
      alert("Please login to play online");
      dispatch(showLogin("Login"));
      return;
    }
    if (difficulty) {
      [codeLength, maxDigit] = translateDiffToNums(difficulty);
    }

    dispatch(reset());
    switch (gameType) {
      case SET_SINGLE_PLAYER:
        dispatch(generateMastermindCode(codeLength, maxDigit));
        break;
      case SET_PVP:
        dispatch(requestPvpMatch(difficulty, "pvp", currentUser));
        break;
      default:
        dispatch(requestPvpMatch(difficulty, "tournament", currentUser));
        break;
    }

    dispatch(setDifficulty(codeLength, maxDigit, difficulty));
    dispatch(changePageTo(PLAY_GAME));
    dispatch(hideLogin());
  };
}

export function specialUpdatePvPForTimer(gameTimer) {
  return (dispatch, getStore) => {
    let { opponentData, currentUser, isWinner } = getStore();
    if (opponentData === null) {
      return;
    }
    dispatch(
      updateDataBaseForPvP(
        opponentData._id,
        currentUser._id,
        isWinner,
        gameTimer
      )
    );
  };
}

export function playGameAgain() {
  return (dispatch, getStore) => {
    let { gameDifficulty, gameType, currentUser } = getStore();
    let { codeLength, maxDigit } = gameDifficulty;
    dispatch(reset());
    if (gameType === SET_SINGLE_PLAYER) {
      dispatch(generateMastermindCode(codeLength, maxDigit));
    } else {
      let type = "tournament";
      if (gameType === SET_PVP) {
        type = "pvp";
      }
      dispatch(requestPvpMatch(gameDifficulty.name, type, currentUser));
    }
  };
}

export function uploadTimeToLeaderboard(feedbackCallback) {
  return (dispatch, getState) => {
    let { currentUser, mastermindCode, time, gameDifficulty } = getState();
    dispatch(
      logUserHistory(
        currentUser,
        mastermindCode,
        time,
        gameDifficulty.name,
        feedbackCallback
      )
    );
  };
}

export function userSubmitCodeForCheck(code) {
  return (dispatch, getStore) => {
    let { mastermindCode, opponentData, currentUser, winTime, turnsRemaining } =
      getStore();

    let gameid = opponentData?._id;
    let userid = currentUser?._id;
    let checkCode = compareCode(code, mastermindCode);
    let { redPeg, whitePeg } = checkCode;
    let winner = redPeg === code.length;
    //handle no turns remaining here.
    dispatch(userSubmit());
    dispatch(addMoveToHistory({ move: code, redPeg, whitePeg }));
    if (winner) {
      dispatch(weHaveAWinner());
      //updatePvP(gameid, userid, true, winTime);
      //WHY IS THE TIMER COMPONENT THE ONE TELLING THE SERVER WHO WON....
    } else {
      if (opponentData) {
        dispatch(updateDataBaseForPvP(gameid, userid, null, winTime));
      }
      if (turnsRemaining <= 1) {
        dispatch(weHaveALoser());
      }
    }
  };
}
