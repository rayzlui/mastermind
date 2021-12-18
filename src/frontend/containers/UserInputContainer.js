import { connect } from "react-redux";
import { addMoveToHistory, gameOver, userSubmit } from "../actions/actions";
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
  };
}

function mergeProps(mapStateToProps, mapDispatchToProps) {
  let { gameDifficulty, gameOver, mastermindCode, turnsRemaining } =
    mapStateToProps;
  let { updateTurns, addTurnToHistory, dispatchGameOver } = mapDispatchToProps;
  return {
    gameDifficulty,
    turnsRemaining,
    gameOver,
    submitGuess: (code) => {
      let checkCode = compareCode(code, mastermindCode);
      let { redPeg, whitePeg } = checkCode;
      if (redPeg === code.length) {
        dispatchGameOver();
      }
      updateTurns();
      addTurnToHistory(code, redPeg, whitePeg);
    },
  };
}

export const UserInputContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(UserInput);
