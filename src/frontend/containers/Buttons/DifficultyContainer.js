import {
  setDifficulty,
  generateMastermindCode,
  requestPvpMatch,
  changePageTo,
  hideLogin,
  reset,
} from "../../actions/actions";
import { Button } from "../../components/ButtonComponent";
import { connect } from "react-redux";

import {
  PLAY_GAME,
  SET_PVP,
  SET_SINGLE_PLAYER,
  TRY_MATCHMAKING,
} from "../../actions/actionTypes";

function mapStateToProps(state) {
  if (state.currentUser === null) {
    return {};
  }
  return state.currentUser;
}

function mapDispatchToProps(dispatch, ownProps) {
  let { difficulty, gameType, length, maxDigits } = ownProps;
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
      dispatch(reset());
      switch (gameType) {
        case SET_SINGLE_PLAYER:
          dispatch(generateMastermindCode(codeLength, maxDigit));
          break;
        case SET_PVP:
          dispatch({ type: TRY_MATCHMAKING });
          dispatch(requestPvpMatch(difficulty, "pvp", currentUser));

          break;
        default:
          dispatch({ type: TRY_MATCHMAKING });
          dispatch(requestPvpMatch(difficulty, "tournament", currentUser));

          break;
      }

      dispatch(setDifficulty(codeLength, maxDigit, difficulty));
      dispatch(changePageTo(PLAY_GAME));
      dispatch(hideLogin());
    },
  };
}

function mergeProps(mapStateToProps, mapDispatchToProps, ownProps) {
  let { difficulty } = ownProps;
  let currentUser = mapStateToProps;
  let { buttonAction } = mapDispatchToProps;
  return {
    difficulty,
    buttonAction: () => {
      buttonAction(currentUser);
    },
  };
}

export const DifficultyButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Button);
