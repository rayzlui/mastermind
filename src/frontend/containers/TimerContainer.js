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
    userLostPvp: (gameid, userid) =>
      dispatch(updateDataBaseForPvP(gameid, userid, true)),
  };
}

function mergeProps(mapStateToProps, mapDispatchToProps) {
  let { currentUser, opponentData, isWinner } = mapStateToProps;
  let { setWinTime, endGame, userLostPvp } = mapDispatchToProps;

  return {
    isWinner,
    setWinTime,
    endGame,
    userLost: opponentData
      ? () => userLostPvp(opponentData._id, currentUser._id)
      : () => null,
  };
}

export const TimerContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(TimerComponent);
