import { connect } from "react-redux";
import { PreviousMoves } from "../components/PreviousMoves";

function mapStateToProps(state) {
  let { moveHistory } = state;
  return { moveHistory };
}

export const PreviousMoveContainer = connect(mapStateToProps)(PreviousMoves);
