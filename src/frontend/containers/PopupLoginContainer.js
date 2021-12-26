import { connect } from "react-redux";
import { PopupLogin } from "../components/PopupLogin";

function mapStateToProps(state) {
  let { showLogin, currentUser } = state;
  return { showLogin, currentUser };
}

export const PopupLoginContainer = connect(mapStateToProps)(PopupLogin);
