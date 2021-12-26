import { connect } from "react-redux";
import { SearchUserDisplay } from "../components/SearchUserDisplay";

function mapStateToProps(state) {
  let { displayingPage, searchedUser } = state;
  return { displayingPage, searchedUser };
}

export const SearchUserContainer = connect(mapStateToProps)(SearchUserDisplay);
