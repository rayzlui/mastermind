import { generateCode } from "../helperFunctions/generateCode";
import { createAction } from "@reduxjs/toolkit";
import {
  casearCypher,
  scramblePassword,
} from "../helperFunctions/scrambleString";

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
  SINGLE_PLAYER,
  ONE_ON_ONE,
  PLAY_GAME,
  SET_ALERT_MESSAGE,
} from "./actionTypes";

import { compareCode } from "../helperFunctions/compareCode";
export const setMastermindCode = createAction(SET_MASTERMIND_CODE);
export const setTime = createAction(SET_WIN_TIME);
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
  generateCodeCallback = generateCode
) {
  return async (dispatch) => {
    let code = await generateCodeCallback(codeLength, maxDigit);
    await dispatch(setMastermindCode(code));
  };
}

export function createGameWithDetails(
  gameDifficulty,
  generateMastermindCodeCB = generateMastermindCode,
  requestPvpMatchCB = requestPvpMatch
) {
  return (dispatch, getStore) => {
    let { codeLength, maxDigit } = gameDifficulty;
    let { gameType, currentUser } = getStore();
    if (gameType !== SINGLE_PLAYER && currentUser === null) {
      dispatch({
        type: SET_ALERT_MESSAGE,
        payload: "Please login to play online",
      });
      dispatch(showLogin("Login"));
      return;
    }

    dispatch(reset());
    switch (gameType) {
      case SINGLE_PLAYER:
        //single player allows for custom difficulty, which means we can't just use difficulty like in online matches.
        dispatch(generateMastermindCodeCB(codeLength, maxDigit));
        break;
      case ONE_ON_ONE:
        dispatch(requestPvpMatchCB(gameDifficulty.name, "pvp", currentUser));
        break;
      default:
        dispatch(
          requestPvpMatchCB(gameDifficulty.name, "tournament", currentUser)
        );
        break;
    }

    dispatch(setDifficulty(gameDifficulty));
    dispatch(changePageTo(PLAY_GAME));
    dispatch(hideLogin());
  };
}

export function specialUpdatePvPForTimer(
  gameTimer,
  updateDataBaseForPvPCB = updateDataBaseForPvP
) {
  return (dispatch, getStore) => {
    let { pvpData, currentUser, isWinner } = getStore();
    if (pvpData === null) {
      return null;
    }
    dispatch(
      updateDataBaseForPvPCB(pvpData._id, currentUser._id, isWinner, gameTimer)
    );
  };
}

export function playGameAgain(
  generateMastermindCodeCB = generateMastermindCode,
  requestPvpMatchCB = requestPvpMatch
) {
  return (dispatch, getStore) => {
    let { gameDifficulty, gameType, currentUser } = getStore();
    let { codeLength, maxDigit } = gameDifficulty;
    dispatch(reset());
    if (gameType === SINGLE_PLAYER) {
      dispatch(generateMastermindCodeCB(codeLength, maxDigit));
    } else {
      let type = "tournament";
      if (gameType === ONE_ON_ONE) {
        type = "pvp";
      }
      dispatch(requestPvpMatchCB(gameDifficulty.name, type, currentUser));
    }
  };
}

export function userSubmitCodeForCheck(
  code,
  updateDataBaseForPvPCB = updateDataBaseForPvP
) {
  return (dispatch, getStore) => {
    let { mastermindCode, pvpData, currentUser, turnsRemaining } = getStore();

    let gameid = pvpData?._id;
    let userid = currentUser?._id;
    let checkCode = compareCode(code, mastermindCode);
    let { redPeg, whitePeg } = checkCode;
    let winner = redPeg === code.length;
    dispatch(userSubmit());
    dispatch(addMoveToHistory({ move: code, redPeg, whitePeg }));
    if (winner) {
      dispatch(weHaveAWinner());
      //updatePvP(gameid, userid, true, winTime);
      //WHY IS THE TIMER COMPONENT THE ONE TELLING THE SERVER WHO WON....
    } else {
      if (pvpData) {
        dispatch(updateDataBaseForPvPCB(gameid, userid, null, 0));
      }
      if (turnsRemaining <= 1) {
        dispatch(weHaveALoser());
      }
    }
  };
}

export function requestPvpMatch(difficulty, type, user) {
  let { username } = user;
  return async (dispatch) => {
    try {
      let matchMakingLessThan60secs = true;
      let unableToMatchPlayerTimeout = setTimeout(() => {
        matchMakingLessThan60secs = false;
        dispatch({
          type: SET_ALERT_MESSAGE,
          payload: "Unable to make match",
        });
        dispatch({ type: SINGLE_PLAYER });
      }, 60000);
      let request = await fetch(
        `http://localhost:3001/api/game/${type}/${difficulty}/${username}/${user._id}`
      );

      let data = await request.json();
      let { players, code, _id } = await data;
      if (data && matchMakingLessThan60secs) {
        clearTimeout(unableToMatchPlayerTimeout);
        dispatch(setMastermindCode(code));
        dispatch(
          updatePvpInfo({
            players,
            _id,
          })
        );
      }
    } catch (error) {
      dispatch({
        type: SET_ALERT_MESSAGE,
        payload: "Error accessing server, please check your connection",
      });
      dispatch({ type: SINGLE_PLAYER });
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

export function uploadTimeToLeaderboard(feedbackCallback) {
  return async (dispatch, getState) => {
    let { currentUser, mastermindCode, time, gameDifficulty } = getState();
    if (gameDifficulty.name === "custom") {
      feedbackCallback("Unable to save custom difficulty");
    } else {
      let { _id } = currentUser;
      try {
        let putToUserHistory = await fetch(
          `http://localhost:3001/api/userhistory/add`,
          {
            method: "put",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              _id,
              code: mastermindCode,
              time,
              difficulty: gameDifficulty.name,
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
              user: currentUser,
              code: mastermindCode,
              time,
              difficulty: gameDifficulty.name,
            }),
          }
        );
        if (
          putToUserHistory.status !== 200 ||
          postToLeaderBoard.status !== 200
        ) {
          dispatch({ type: UNABLE_TO_SAVE });
          feedbackCallback(false);
        } else {
          dispatch({ type: SAVE_COMPLETE });
          feedbackCallback(true);
        }
      } catch (error) {
        dispatch({
          type: SET_ALERT_MESSAGE,
          payload: "Error accessing server, please check your connection",
        });
      }
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
        payload: "Something went wrong while logging in",
      });
      callback(keyResponse);
    }
  };
}
