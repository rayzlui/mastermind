import { connect } from "react-redux";
import { showLogin } from "../actions/actions";
import { GameModeSelect } from "../components/GameModeSelect";

function mapStateToProps(state) {
  let { currentUser, displayingPage, gameType } = state;
  return { currentUser, displayingPage, gameType };
}

function mapDispatchToProps(dispatch) {
  return {
    selectGameType: (type) => {
      dispatch({ type: type });
    },
    toggleLogin: () => {
      dispatch(showLogin("Login"));
    },
  };
}

export const GameModeSelectContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GameModeSelect);
