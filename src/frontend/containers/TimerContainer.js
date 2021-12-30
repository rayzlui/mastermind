import { connect } from "react-redux";
import {
  weHaveALoser,
  setWinTime,
  updateDataBaseForPvP,
} from "../actions/actions";
import { TimerComponent } from "../components/TimerComponent";

function mapStateToProps(state) {
  let { isWinner, currentUser, opponentData, time } = state;
  return { isWinner, currentUser, opponentData, time };
}

function mapDispatchToProps(dispatch) {
  return {
    setWinTime: (gameTimer) => dispatch(setWinTime(gameTimer)),
    endGame: () => dispatch(weHaveALoser()),
    updateDataBaseForPvP: (gameid, userid, isWinner, time) => {
      dispatch(updateDataBaseForPvP(gameid, userid, isWinner, time));
    },
  };
}

function mergeProps(mapStateToProps, mapDispatchToProps) {
  let { currentUser, opponentData, isWinner, time } = mapStateToProps;
  let { setWinTime, endGame, updateDataBaseForPvP } = mapDispatchToProps;

  return {
    isWinner,
    time,
    setWinTime,
    endGame,
    updateDataBaseForPvP: opponentData
      ? (gameTimer) => {
          updateDataBaseForPvP(
            opponentData._id,
            currentUser._id,
            isWinner,
            gameTimer
          );
        }
      : () => null,
  };
}

export const TimerContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(TimerComponent);
