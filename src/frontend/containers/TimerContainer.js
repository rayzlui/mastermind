import { connect } from "react-redux";
import { setTurns, setWinTime, updateDataBaseForPvP } from "../actions/actions";
import { TimerComponent } from "../components/TimerComponent";

function mapStateToProps(state) {
  let { isWinner, currentUser, opponentData } = state;
  return { isWinner, currentUser, opponentData };
}

function mapDispatchToProps(dispatch) {
  return {
    setWinTime: (time) => dispatch(setWinTime(time)),
    endGame: () => dispatch(setTurns(0)),
    updateDataBaseForPvP: (gameid, userid, time) => {
      console.log((gameid, userid, time));
      dispatch(updateDataBaseForPvP(gameid, userid, true, time));
    },
  };
}

function mergeProps(mapStateToProps, mapDispatchToProps) {
  let { currentUser, opponentData, isWinner } = mapStateToProps;
  let { setWinTime, endGame, updateDataBaseForPvP } = mapDispatchToProps;

  return {
    isWinner,
    setWinTime,
    endGame,
    updateDataBaseForPvP: opponentData
      ? (time) => updateDataBaseForPvP(opponentData._id, currentUser._id, time)
      : () => null,
  };
}

export const TimerContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(TimerComponent);
