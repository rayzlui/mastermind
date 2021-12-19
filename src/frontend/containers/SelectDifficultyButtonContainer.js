import { setDifficulty, generateMastermindCode } from "../actions/actions";
import { Button } from "../components/ButtonComponent";
import { connect } from "react-redux";

function mapDispatchToProps(dispatch, ownProps) {
  let { name, toggleDifficulty, length, maxDigits } = ownProps;
  let codeLength;
  let maxDigit;
  switch (name) {
    case "Easy":
      codeLength = 4;
      maxDigit = 4;
      break;

    case "Hard":
      codeLength = 9;
      maxDigit = 9;
      break;
    case "Normal":
      codeLength = 4;
      maxDigit = 7;
      break;
    default:
      codeLength = length;
      maxDigit = maxDigits;
      break;
  }
  return {
    buttonAction: () => {
      dispatch(setDifficulty(codeLength, maxDigit));
      dispatch(generateMastermindCode(codeLength, maxDigit));
      toggleDifficulty();
    },
  };
}

export const SelectDifficultyButtonContainer = connect(
  null,
  mapDispatchToProps
)(Button);
