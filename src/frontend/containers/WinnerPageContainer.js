import { connect } from "react-redux";
import { logUserHistory } from "../actions/actions";
import { WinnerPage } from "../components/WinnerPage";

function mapStateToProps(state) {
  let {
    opponentData,
    currentUser,
    mastermindCode,
    winTime,
    isWinner,
    gameType,
    gameDifficulty,
  } = state;
  return {
    opponentData,
    currentUser,
    mastermindCode,
    winTime,
    isWinner,
    gameDifficulty,
    gameType,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    playAgain: () => dispatch(),
    uploadTime: (userid, code, time, diff) => {
      dispatch(logUserHistory(userid, code, time, diff));
    },
  };
}

function mergeProps(mapStateToProps, mapDispatchToProps) {
  let {
    opponentData,
    currentUser,
    mastermindCode,
    winTime,
    isWinner,
    gameType,
    gameDifficulty,
  } = mapStateToProps;
  let { playAgain, uploadTime } = mapDispatchToProps;
  return {
    playAgain,
    opponentData,
    isWinner,
    currentUser,
    winTime,
    gameType,
    uploadGameInfo: () => {
      uploadTime(currentUser, mastermindCode, winTime, gameDifficulty.name);
    },
  };
}

export const WinnerPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(WinnerPage);
