import { connect } from "react-redux";
import {
  addMoveToHistory,
  gameOver,
  updateDataBaseForPvP,
  userSubmit,
} from "../actions/actions";
import { UserInput } from "../components/UserInput";
import { compareCode } from "../gameLogic/compareCode";

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    updateTurns: () => dispatch(userSubmit()),
    addTurnToHistory: (move, redPeg, whitePeg) =>
      dispatch(addMoveToHistory({ move, redPeg, whitePeg })),
    dispatchGameOver: () => dispatch(gameOver()),
    updatePvP: (gameid, userid) =>
      dispatch(updateDataBaseForPvP(gameid, userid)),
  };
}

function mergeProps(mapStateToProps, mapDispatchToProps) {
  let {
    gameDifficulty,
    gameOver,
    mastermindCode,
    turnsRemaining,
    opponentData,
    currentUser,
  } = mapStateToProps;
  let gameid = opponentData?._id;
  let userid = currentUser?._id;
  let { updateTurns, addTurnToHistory, dispatchGameOver, updatePvP } =
    mapDispatchToProps;
  return {
    gameDifficulty,
    turnsRemaining,
    code: mastermindCode?.nums,
    gameOver,
    submitGuess: (code) => {
      let checkCode = compareCode(code, mastermindCode);
      let { redPeg, whitePeg } = checkCode;
      let winner = redPeg === code.length;
      if (winner) {
        dispatchGameOver();
      }
      updateTurns();
      addTurnToHistory(code, redPeg, whitePeg);
      if (opponentData) {
        updatePvP(gameid, userid, winner);
      }
    },
  };
}

export const UserInputContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(UserInput);
