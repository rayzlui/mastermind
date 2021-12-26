import { connect } from "react-redux";
import { searchUser } from "../actions/actions";
import { InputSearchUser } from "../components/InputSearchUser";

function mapDispatchToProps(dispatch) {
  return {
    searchUser: (username) => dispatch(searchUser(username)),
  };
}

export const InputSearchUserContainer = connect(
  null,
  mapDispatchToProps
)(InputSearchUser);
