import { connect } from "react-redux";
import { WelcomeScreen } from "../components/WelcomeComponent";

function mapStateToProps(state) {
  let { currentUser } = state;
  return { currentUser };
}

export const WelcomeContainer = connect(mapStateToProps)(WelcomeScreen);
