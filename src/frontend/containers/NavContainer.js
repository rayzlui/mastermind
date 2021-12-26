import { connect } from "react-redux";
import { HeaderComponent } from "../components/HeaderComponent";
import { NavBar } from "../components/NavBar";
import {
  changePageTo,
  showThisUser,
  logoutUser,
  showLogin,
} from "../actions/actions";

function mapStateToProps(state) {
  let { currentUser } = state;
  return { currentUser };
}

function mapDispatchToProps(dispatch) {
  return {
    changePageTo: (page) => dispatch(changePageTo(page)),
    showThisUser: (user) => dispatch(showThisUser(user)),
    toggleLogin: () => dispatch(showLogin()),
    logOut: () => dispatch(logoutUser()),
  };
}

export const NavBarContainer = connect(null, mapDispatchToProps)(NavBar);
export const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderComponent);
