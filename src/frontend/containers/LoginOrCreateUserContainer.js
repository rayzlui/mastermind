import { connect } from "react-redux";
import { LoginOrCreateUserPage } from "../components/LoginOrCreateUserPage";
import { createUser, hideLogin, loginUser } from "../actions/actions";
import { casearCypher } from "../../scrambleString";

function mapStateToProps(state) {
  let { currentUser, showLogin } = state;
  return {
    showLogin,
    currentUser,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    createUserAction: (username, password, callback) => {
      let scramble = casearCypher(password);
      let [string, key] = scramble;
      dispatch(createUser(username, string, key, callback));
    },
    loginAction: (username, password, confirmLogin) => {
      dispatch(loginUser(username, password, confirmLogin));
    },
    hideLogin: () => {
      dispatch(hideLogin());
    },
  };
}

export const LoginOrCreateUserContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginOrCreateUserPage);
