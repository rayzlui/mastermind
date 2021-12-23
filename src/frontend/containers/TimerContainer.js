import { connect } from "react-redux";
import { setTurns, setWinTime } from "../actions/actions";
import { TimerComponent } from "../components/TimerComponent";

function mapStateToProps(state) {
  let { isWinner } = state;
  return { isWinner };
}

function mapDispatchToProps(dispatch) {
  return {
    setWinTime: (time) => dispatch(setWinTime(time)),
    endGame: () => dispatch(setTurns(0)),
  };
}

export const TimerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TimerComponent);
