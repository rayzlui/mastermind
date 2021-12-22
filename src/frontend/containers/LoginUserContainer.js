import { connect } from "react-redux";
import { UserPage } from "../components/User";
import { LoginUser } from "../actions/actions";

function mapStateToProps() {
  return {
    type: "Login",
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userAction: (username, password) => {
      dispatch(LoginUser(username, password));
    },
  };
}

export const LoginUserContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserPage);
