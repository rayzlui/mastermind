import {
  setDifficulty,
  generateMastermindCode,
  requestPvpMatch,
} from "../../actions/actions";
import { Button } from "../../components/ButtonComponent";
import { connect } from "react-redux";

import {
  SET_PVP,
  SET_SINGLE_PLAYER,
  SET_TOURNAMENT,
  TRY_MATCHMAKING,
} from "../../actions/actionTypes";

function mapStateToProps(state) {
  if (state.currentUser === null) {
    return {};
  }
  let { _id, username } = state.currentUser;
  return { id: _id, name: username };
}

function mapDispatchToProps(dispatch, ownProps) {
  let { difficulty, gameMode, length, maxDigits } = ownProps;
  let codeLength;
  let maxDigit;
  switch (difficulty) {
    case "easy":
      codeLength = 4;
      maxDigit = 4;
      break;

    case "hard":
      codeLength = 9;
      maxDigit = 9;
      break;
    case "normal":
      codeLength = 4;
      maxDigit = 7;
      break;
    default:
      codeLength = length;
      maxDigit = maxDigits;
      break;
  }
  return {
    buttonAction: (currentUser = null) => {
      switch (gameMode) {
        case "single":
          dispatch(generateMastermindCode(codeLength, maxDigit));
          dispatch(setDifficulty(codeLength, maxDigit));
          dispatch({ type: SET_SINGLE_PLAYER });
          break;
        case "pvp":
          dispatch({ type: SET_PVP });
          dispatch({ type: TRY_MATCHMAKING });
          dispatch(requestPvpMatch(difficulty, "pvp", currentUser));
          dispatch(setDifficulty(codeLength, maxDigit));
          break;
        default:
          //for tournament if we get there.
          dispatch({ type: SET_TOURNAMENT });
          dispatch({ type: TRY_MATCHMAKING });
          dispatch(requestPvpMatch(difficulty, "tournament", currentUser));
          dispatch(setDifficulty(codeLength, maxDigit));
          break;
      }
    },
  };
}

function mergeProps(mapStateToProps, mapDispatchToProps, ownProps) {
  let { difficulty } = ownProps;
  let currentUser = mapStateToProps;
  let { buttonAction } = mapDispatchToProps;
  return {
    difficulty,
    buttonAction: () => buttonAction(currentUser),
  };
}

export const DifficultyButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Button);
