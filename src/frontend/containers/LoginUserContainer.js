import { connect } from "react-redux";
import { UserPage } from "../components/User";
import { LoginUser } from "../actions/actions";
import { scramblePassword } from "../../scrambleString";

function mapDispatchToProps(dispatch) {
  return {
    userAction: (username, password) => {
      dispatch(LoginUser(username, password));
    },
  };
}

export const LoginUserContainer = connect(null, mapDispatchToProps)(UserPage);
