import { connect } from "react-redux";
import {
  changePageTo,
  searchUser,
  setMastermindCode,
} from "../actions/actions";
import { PLAY_GAME, RESET } from "../actions/actionTypes";
import { ViewLeaderboard } from "../components/ViewLeaderboard";

function mapStateToProps(state) {
  let { displayingPage } = state;
  return { displayingPage };
}

function mapDispatchToProps(dispatch) {
  return {
    viewPlayer: (name) => {
      dispatch(searchUser(name));
    },
    playThisCode: (code) => {
      dispatch(setMastermindCode(code));
      dispatch({ type: RESET });
      dispatch(changePageTo(PLAY_GAME));
    },
  };
}

export const ViewLeaderboardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewLeaderboard);
