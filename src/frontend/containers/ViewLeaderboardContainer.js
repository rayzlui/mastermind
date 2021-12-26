import { connect } from "react-redux";
import { ViewLeaderboard } from "../components/ViewLeaderboard";

function mapStateToProps(state) {
  let { displayingPage } = state;
  return { displayingPage };
}

export const ViewLeaderboardContainer =
  connect(mapStateToProps)(ViewLeaderboard);
