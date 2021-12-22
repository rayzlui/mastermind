import { connect } from "react-redux";
import {
  addMoveToHistory,
  updateDataBaseForPvP,
  userSubmit,
  weHaveAWinner,
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
    dispatchWeHaveAWinner: () => dispatch(weHaveAWinner()),
    updatePvP: (gameid, userid, winner) =>
      dispatch(updateDataBaseForPvP(gameid, userid, winner)),
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
  let { updateTurns, addTurnToHistory, dispatchWeHaveAWinner, updatePvP } =
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
      updateTurns();
      addTurnToHistory(code, redPeg, whitePeg);
      if (opponentData) {
        updatePvP(gameid, userid, winner);
      }
      if (winner) {
        dispatchWeHaveAWinner();
      }
    },
  };
}

export const UserInputContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(UserInput);
