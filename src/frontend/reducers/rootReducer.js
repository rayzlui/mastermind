import { combineReducers } from "redux";
import { gameDifficultyReducer } from "./gameDifficultyReducer";
import { isWinnerReducer } from "./isWinnerReducerReducer";
import { gameTypeReducer } from "./gameTypeReducer";
import { mastermindCodeReducer } from "./mastermindCodeReducer";
import { moveHistoryReducer } from "./moveHistoryReducer";
import { pvpDataReducer } from "./pvpData";
import { turnsRemainingReducer } from "./turnsRemainingReducer";
import { currentUserReducer } from "./currentUserReducer";
import { timeReducer } from "./timeReducer";
import { searchedUserReducer } from "./searchedUserReducer";
import { pageNavigatorReducer } from "./pageNavigatorReducer";
import { showLoginReducer } from "./showLoginReducer";
import { hintsRemainingReducer } from "./hintsRemaining";
import { alertMessageReducer } from "./alertMessageReducer";

export const rootReducer = combineReducers({
  moveHistory: moveHistoryReducer,
  mastermindCode: mastermindCodeReducer,
  isWinner: isWinnerReducer,
  turnsRemaining: turnsRemainingReducer,
  gameDifficulty: gameDifficultyReducer,
  gameType: gameTypeReducer,
  pvpData: pvpDataReducer,
  currentUser: currentUserReducer,
  time: timeReducer,
  searchedUser: searchedUserReducer,
  displayingPage: pageNavigatorReducer,
  showLogin: showLoginReducer,
  hintsRemaining: hintsRemainingReducer,
  alertMessage: alertMessageReducer,
});
