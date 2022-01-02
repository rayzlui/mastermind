import { generateCode } from "../logicFunctions/generateCode";
import { createAction } from "@reduxjs/toolkit";
import {
  casearCypher,
  scramblePassword,
} from "../logicFunctions/scrambleString";

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
  UPDATE_PVP_INFO,
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
  SET_ALERT_MESSAGE,
} from "./actionTypes";

import { compareCode } from "../logicFunctions/compareCode";
export const setMastermindCode = createAction(SET_MASTERMIND_CODE);
export const setWinTime = createAction(SET_WIN_TIME);
export const displayCurrentUser = createAction(DISPLAY_CURRENT_USER);
export const userSubmit = createAction(USER_SUBMIT);
export const addMoveToHistory = createAction(ADD_USER_MOVE_HISTORY);
export const setTurns = createAction(SET_TURNS);
export const reset = createAction(RESET);
export const weHaveAWinner = createAction(WINNER);
export const updatePvpInfo = createAction(UPDATE_PVP_INFO);
export const setDifficulty = createAction(SET_DIFFICULTY);
export const setCurrentUser = createAction(LOGIN_USER);
export const showThisUser = createAction(USER_FOUND);
export const showLogin = createAction(SHOW_LOGIN);
export const hideLogin = createAction(HIDE_LOGIN);
export const weHaveALoser = createAction(LOSER);
export function changePageTo(page) {
  return { type: page };
}

export function logoutUser() {
  sessionStorage.removeItem("currentUser");
  return { type: LOGOUT_USER };
}

export function generateMastermindCode(
  codeLength,
  maxDigit,
  generateCodeCallback
) {
  return async (dispatch) => {
    let code = await generateCodeCallback(codeLength, maxDigit);
    await dispatch(setMastermindCode(code));
  };
}

export function requestPvpMatch(difficulty, type, user) {
  let { username } = user;
  return async (dispatch) => {
    try {
      let request = await fetch(
        `http://localhost:3001/api/game/${type}/${difficulty}/${username}/${user._id}`
      );
      let data = await request.json();
      let { players, code, _id } = await data;
      dispatch(setMastermindCode(code));
      dispatch(
        updatePvpInfo({
          players,
          _id,
        })
      );
    } catch (error) {
      dispatch({
        type: SET_ALERT_MESSAGE,
        payload: "Error accessing server, please check your connection",
      });
      dispatch({ type: SET_SINGLE_PLAYER });
    }
  };
}

export function searchUser(username) {
  return async (dispatch) => {
    try {
      let request = await fetch(`http://localhost:3001/api/users/${username}`);
      if (request.status === 200) {
        let data = await request.json();
        dispatch(showThisUser(data));
        dispatch(changePageTo(DISPLAY_USER));
      } else {
        dispatch({ type: SET_ALERT_MESSAGE, payload: "Unable to find user" });
      }
    } catch (error) {
      dispatch({
        type: SET_ALERT_MESSAGE,
        payload: "Error accessing server, please check your connection",
      });
    }
  };
}

export function logUserHistory(user, code, time, difficulty, callback) {
  let { _id } = user;
  return async function (dispatch) {
    try {
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
    } catch (error) {
      dispatch({
        type: SET_ALERT_MESSAGE,
        payload: "Error accessing server, please check your connection",
      });
    }
  };
}

export function updateDataBaseForPvP(gameid, userid, isWinner, time) {
  return async (dispatch) => {
    try {
      let request = await fetch(`http://localhost:3001/api/game/${gameid}`, {
        method: "put",
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
        updatePvpInfo({
          players,
        })
      );
    } catch (error) {
      dispatch({
        type: SET_ALERT_MESSAGE,
        payload: "Error accessing server, please check your connection",
      });
    }
  };
}

export function createUser(username, string, callback) {
  let scramble = casearCypher(string);
  let [password, key] = scramble;
  return async (dispatch) => {
    try {
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
    } catch (error) {
      dispatch({
        type: SET_ALERT_MESSAGE,
        payload: "Error accessing server, please check your connection",
      });
    }
  };
}

export function loginUser(username, password, callback) {
  return async (dispatch) => {
    try {
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
    } catch (error) {
      dispatch({
        type: SET_ALERT_MESSAGE,
        payload: "Error accessing server, please check your connection",
      });
    }
  };
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
      maxDigit = 8;
      break;
  }
  return [codeLength, maxDigit];
}

export function createGameWithDetails(gameDetails) {
  return (dispatch, getStore) => {
    let { codeLength, maxDigit, difficulty } = gameDetails;
    let { gameType, currentUser } = getStore();
    if (gameType !== SET_SINGLE_PLAYER && currentUser === null) {
      dispatch({
        type: SET_ALERT_MESSAGE,
        payload: "Please login to play online",
      });
      dispatch(showLogin("Login"));
      return;
    }
    if (difficulty) {
      [codeLength, maxDigit] = translateDiffToNums(difficulty);
    }

    dispatch(reset());
    switch (gameType) {
      case SET_SINGLE_PLAYER:
        dispatch(generateMastermindCode(codeLength, maxDigit, generateCode));
        break;
      case SET_PVP:
        dispatch(requestPvpMatch(difficulty, "pvp", currentUser));
        break;
      default:
        dispatch(requestPvpMatch(difficulty, "tournament", currentUser));
        break;
    }

    dispatch(setDifficulty({ difficulty, codeLength, maxDigit }));
    dispatch(changePageTo(PLAY_GAME));
    dispatch(hideLogin());
  };
}

export function specialUpdatePvPForTimer(gameTimer) {
  return (dispatch, getStore) => {
    let { pvpData, currentUser, isWinner } = getStore();
    if (pvpData === null) {
      return;
    }
    dispatch(
      updateDataBaseForPvP(pvpData._id, currentUser._id, isWinner, gameTimer)
    );
  };
}

export function playGameAgain() {
  return (dispatch, getStore) => {
    let { gameDifficulty, gameType, currentUser } = getStore();
    let { codeLength, maxDigit, difficulty } = gameDifficulty;
    dispatch(reset());
    if (gameType === SET_SINGLE_PLAYER) {
      dispatch(generateMastermindCode(codeLength, maxDigit, generateCode));
    } else {
      let type = "tournament";
      if (gameType === SET_PVP) {
        type = "pvp";
      }
      dispatch(requestPvpMatch(difficulty, type, currentUser));
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
    let { mastermindCode, pvpData, currentUser, winTime, turnsRemaining } =
      getStore();

    let gameid = pvpData?._id;
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
      if (pvpData) {
        dispatch(updateDataBaseForPvP(gameid, userid, null, winTime));
      }
      if (turnsRemaining <= 1) {
        dispatch(weHaveALoser());
      }
    }
  };
}
