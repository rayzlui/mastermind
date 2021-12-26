import { connect } from "react-redux";
import { PlayGame } from "../components/PlayGame";

function mapStateToProps(state) {
  let { displayingPage, gameType, opponentData } = state;
  return { displayingPage, gameType, opponentData };
}

export const PlayGameContainer = connect(mapStateToProps)(PlayGame);
