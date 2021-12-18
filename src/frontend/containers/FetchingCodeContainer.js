import { generateMastermindCode } from "../actions/actions";
import { FetchingCodePage } from "../components/FetchingCodePage";
import { connect } from "react-redux";

function mapDispatchToProps(dispatch) {
  return {
    generatingCode: () => dispatch(generateMastermindCode(4, 7)),
  };
}

export const FetchingCodeContainer = connect(
  null,
  mapDispatchToProps
)(FetchingCodePage);
