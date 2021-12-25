import { connect } from "react-redux";
import { searchUser } from "../actions/actions";
import { SearchUser } from "../components/SearchUser";

function mapDispatchToProps(dispatch) {
  return {
    searchUser: (username) => dispatch(searchUser(username)),
  };
}

export const SearchUserContainer = connect(
  null,
  mapDispatchToProps
)(SearchUser);
