import { connect } from "react-redux";
import { setTurns } from "../actions/actions";
import { TimerComponent } from "../components/TimerComponent";

function mapStateToProps(state) {
  let { gameOver } = state;
  return { gameOver };
}

function mapDispatchToProps(dispatch) {
  return {
    endGame: () => dispatch(setTurns(0)),
  };
}

export const TimerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TimerComponent);
