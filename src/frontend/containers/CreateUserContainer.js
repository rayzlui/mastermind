import { connect } from "react-redux";
import { UserPage } from "../components/User";
import { createUser } from "../actions/actions";
import { casearCypher } from "../../scrambleString";

function mapDispatchToProps(dispatch) {
  return {
    userAction: (username, password) => {
      let scramble = casearCypher(password);
      let [string, key] = scramble;
      dispatch(createUser(username, string, key));
    },
  };
}

export const CreateUserContainer = connect(null, mapDispatchToProps)(UserPage);
