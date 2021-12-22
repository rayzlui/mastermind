import { connect } from "react-redux";
import { WinnerPage } from "../components/WinnerPage";

function mapStateToProps(state) {
  let { opponentData, currentUser, isWinner, gameType } = state;
  return { opponentData, currentUser, isWinner, gameType };
}

function mapDispatchToProps(dispatch) {
  return {
    playAgain: () => dispatch(),
    uploadTime: () => dispatch(),
  };
}

export const WinnerPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(WinnerPage);
