import { connect } from "react-redux";
import { ShowThisUser } from "../components/ShowThisUser";

function mapStateToProps(state) {
  let { searchedUser } = state;
  return { searchedUser };
}

export const ShowThisUserContainer = connect(mapStateToProps)(ShowThisUser);
