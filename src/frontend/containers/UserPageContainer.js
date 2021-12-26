import { connect } from "react-redux";
import { UserPage } from "../components/UserPage";

function mapStateToProps(state) {
  let { displayingPage, currentUser } = state;
  return { displayingPage, currentUser };
}

export const UserPageContainer = connect(mapStateToProps)(UserPage);
