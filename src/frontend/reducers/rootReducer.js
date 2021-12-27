import { combineReducers } from "redux";
import { gameDifficultyReducer } from "./gameDifficultyReducer";
import { isWinnerReducer } from "./isWinnerReducerReducer";
import { gameTypeReducer } from "./gameTypeReducer";
import { mastermindCodeReducer } from "./mastermindCodeReducer";
import { moveHistoryReducer } from "./moveHistoryReducer";
import { opponentDataReducer } from "./opponentData";
import { turnsRemainingReducer } from "./turnsRemainingReducer";
import { currentUserReducer } from "./currentUserReducer";
import { timeReducer } from "./timeReducer";
import { searchedUserReducer } from "./searchedUserReducer";
import { pageNavigatorReducer } from "./pageNavigatorReducer";
import { showLoginReducer } from "./showLoginReducer";

export const rootReducer = combineReducers({
  moveHistory: moveHistoryReducer,
  mastermindCode: mastermindCodeReducer,
  isWinner: isWinnerReducer,
  turnsRemaining: turnsRemainingReducer,
  gameDifficulty: gameDifficultyReducer,
  gameType: gameTypeReducer,
  opponentData: opponentDataReducer,
  currentUser: currentUserReducer,
  time: timeReducer,
  searchedUser: searchedUserReducer,
  displayingPage: pageNavigatorReducer,
  showLogin: showLoginReducer,
});
