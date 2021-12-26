import { connect } from "react-redux";
import { LoginOrCreateUserPage } from "../components/LoginOrCreateUserPage";
import { loginUser } from "../actions/actions";

function mapStateToProps(state) {
  let { displayingPage, currentUser } = state;
  return {
    type: "Login",
    currentUser,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userAction: (username, password, confirmLogin) => {
      dispatch(loginUser(username, password, confirmLogin));
    },
  };
}

export const LoginUserContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginOrCreateUserPage);
