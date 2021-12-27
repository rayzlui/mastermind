import { connect } from "react-redux";
import { HeaderComponent } from "../components/HeaderComponent";
import { NavBar } from "../components/NavBar";
import {
  changePageTo,
  showThisUser,
  logoutUser,
  showLogin,
} from "../actions/actions";
import { PLAY_GAME } from "../actions/actionTypes";

function mapStateToProps(state) {
  let { currentUser, turnsRemaining, isWinner, displayingPage } = state;
  return { currentUser, turnsRemaining, isWinner, displayingPage };
}

function mapDispatchToProps(dispatch) {
  return {
    changePageTo: (page) => dispatch(changePageTo(page)),
    showThisUser: (user) => dispatch(showThisUser(user)),
    toggleLogin: (type) => dispatch(showLogin(type)),
    logOut: () => dispatch(logoutUser()),
  };
}

function mergeProps(mapStateToProps, mapDispatchToProps) {
  let { currentUser, turnsRemaining, isWinner, displayingPage } =
    mapStateToProps;
  let { changePageTo } = mapDispatchToProps;
  return {
    currentUser,
    changePageTo: (page) => {
      let leaveGame = true;
      if (turnsRemaining && isWinner === null && displayingPage === PLAY_GAME) {
        leaveGame = confirm("Leave game?");
      }
      if (leaveGame) {
        changePageTo(page);
      }
    },
  };
}
export const NavBarContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(NavBar);
export const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderComponent);
