import {
  setDifficulty,
  generateMastermindCode,
  requestPvpMatch,
  changePageTo,
  hideLogin,
  reset,
  showLogin,
} from "../actions/actions";
import { connect } from "react-redux";

import {
  PLAY_GAME,
  SET_PVP,
  SET_SINGLE_PLAYER,
  TRY_MATCHMAKING,
} from "../actions/actionTypes";
import { SelectDifficultyComponent } from "../components/SelectDifficultyComponent";

function mapStateToProps(state) {
  let { gameType, currentUser } = state;
  return { gameType, currentUser };
}

function mapDispatchToProps(dispatch) {
  return {
    buttonAction: (args) => {
      let { codeLength, maxDigit, gameType, difficulty, currentUser } = args;
      if (gameType !== SET_SINGLE_PLAYER && currentUser === null) {
        alert("Please login to play online");
        dispatch(showLogin("Login"));
        return;
      }
      switch (difficulty) {
        case "easy":
          codeLength = 4;
          maxDigit = 4;
          break;

        case "hard":
          codeLength = 7;
          maxDigit = 9;
          break;
        case "normal":
          codeLength = 4;
          maxDigit = 7;
          break;
        default:
          codeLength = codeLength;
          maxDigit = maxDigit;
          break;
      }
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

function mergeProps(mapStateToProps, mapDispatchToProps) {
  let { currentUser, gameType } = mapStateToProps;
  let { buttonAction } = mapDispatchToProps;
  return {
    gameType,
    buttonAction: (obj) => {
      obj["currentUser"] = currentUser;
      obj[gameType] = gameType;
      buttonAction(obj);
    },
  };
}

export const SelectDifficultyContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(SelectDifficultyComponent);
