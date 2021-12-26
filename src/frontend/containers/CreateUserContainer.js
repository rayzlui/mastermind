import { connect } from "react-redux";
import { LoginOrCreateUserPage } from "../components/LoginOrCreateUserPage";
import { createUser } from "../actions/actions";
import { casearCypher } from "../../scrambleString";

function mapStateToProps(state) {
  let { currentUser } = state;
  return {
    type: "Create Account",
    currentUser,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userAction: (username, password) => {
      let scramble = casearCypher(password);
      let [string, key] = scramble;
      dispatch(createUser(username, string, key));
    },
  };
}

export const CreateUserContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginOrCreateUserPage);
