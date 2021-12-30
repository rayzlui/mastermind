import { connect } from "react-redux";
import {
  addMoveToHistory,
  updateDataBaseForPvP,
  userSubmit,
  weHaveAWinner,
  weHaveALoser,
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
    updatePvP: (gameid, userid, winner, time) =>
      dispatch(updateDataBaseForPvP(gameid, userid, winner, time)),
    dispatchWeHaveALoser: () => {
      dispatch(weHaveALoser());
    },
  };
}

function mergeProps(mapStateToProps, mapDispatchToProps) {
  let {
    gameDifficulty,
    mastermindCode,
    isWinner,
    opponentData,
    currentUser,
    winTime,
    turnsRemaining,
  } = mapStateToProps;
  let gameid = opponentData?._id;
  let userid = currentUser?._id;
  let {
    updateTurns,
    addTurnToHistory,
    dispatchWeHaveAWinner,
    updatePvP,
    dispatchWeHaveALoser,
  } = mapDispatchToProps;
  return {
    gameDifficulty,
    turnsRemaining,
    isWinner,
    code: mastermindCode?.nums,
    submitGuess: (code) => {
      let checkCode = compareCode(code, mastermindCode);
      let { redPeg, whitePeg } = checkCode;
      let winner = redPeg === code.length;
      //handle no turns remaining here.
      updateTurns();
      addTurnToHistory(code, redPeg, whitePeg);
      if (winner) {
        dispatchWeHaveAWinner();
        //the winTime we have here is from when we called it in mapStateToProps, dispatchweHaveAWinner updates it after we've called it before.
        //updatePvP(gameid, userid, true, winTime);
        //WHY IS THE TIMER COMPONENT THE ONE TELLING THE SERVER WHO WON....
      } else {
        if (opponentData) {
          updatePvP(gameid, userid, null, winTime);
        }
        if (turnsRemaining <= 1) {
          dispatchWeHaveALoser();
        }
      }
    },
  };
}

export const UserInputContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(UserInput);
