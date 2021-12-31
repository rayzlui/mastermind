import { connect } from "react-redux";
import {
  generateMastermindCode,
  logUserHistory,
  showLogin,
  reset,
  requestPvpMatch,
} from "../actions/actions";
import { SET_PVP, SET_SINGLE_PLAYER } from "../actions/actionTypes";
import { WinnerPage } from "../components/WinnerPage";

function mapStateToProps(state) {
  let {
    opponentData,
    currentUser,
    mastermindCode,
    time,
    isWinner,
    gameType,
    gameDifficulty,
  } = state;
  return {
    opponentData,
    currentUser,
    mastermindCode,
    time,
    isWinner,
    gameDifficulty,
    gameType,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    playAgain: (gameData) => {
      let { gameDifficulty, gameType, currentUser } = gameData;
      let { codeLength, maxDigit } = gameDifficulty;
      dispatch(reset());
      if (gameType === SET_SINGLE_PLAYER) {
        dispatch(generateMastermindCode(codeLength, maxDigit));
      } else {
        let type = "tournament";
        if (gameType === SET_PVP) {
          type = "pvp";
        }
        console.log(currentUser);
        dispatch(requestPvpMatch(gameDifficulty.name, type, currentUser));
      }
    },
    uploadTime: (userid, code, time, diff, confirmSave) => {
      dispatch(logUserHistory(userid, code, time, diff, confirmSave));
    },
    toggleLogin: () => dispatch(showLogin("Login")),
  };
}

function mergeProps(mapStateToProps, mapDispatchToProps) {
  let {
    opponentData,
    currentUser,
    mastermindCode,
    time,
    isWinner,
    gameType,
    gameDifficulty,
  } = mapStateToProps;
  let { playAgain, uploadTime, toggleLogin } = mapDispatchToProps;
  return {
    playAgain,
    opponentData,
    isWinner,
    currentUser,
    time,
    gameType,
    toggleLogin,
    playAgain: () => {
      playAgain({ gameDifficulty, gameType, currentUser });
    },
    uploadGameInfo: (confirmSave) => {
      uploadTime(
        currentUser,
        mastermindCode,
        time,
        gameDifficulty.name,
        confirmSave
      );
    },
  };
}

export const WinnerPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(WinnerPage);
