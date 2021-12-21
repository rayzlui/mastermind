import { connect } from "react-redux";
import { ShowPVPInfo } from "../components/ShowPvPInfo";

function mapStateToProps(state) {
  let { opponentData } = state;
  return { opponentData };
}

export const ShowPVPContainer = connect(mapStateToProps)(ShowPVPInfo);
