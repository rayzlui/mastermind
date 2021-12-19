import { connect } from "react-redux";
import { TimerComponent } from "../components/TimerComponent";

function mapStateToProps(state) {
  let { gameOver } = state;
  return { gameOver };
}

export const TimerContainer = connect(mapStateToProps)(TimerComponent);
