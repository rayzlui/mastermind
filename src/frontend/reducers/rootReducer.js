import { combineReducers } from "redux";
import { gameDifficultyReducer } from "./gameDifficultyReducer";
import { isWinnerReducer } from "./isWinnerReducerReducer";
import { gameTypeReducer } from "./gameTypeReducer";
import { mastermindCodeReducer } from "./mastermindCodeReducer";
import { moveHistoryReducer } from "./moveHistoryReducer";
import { opponentDataReducer } from "./opponentData";
import { showMatchMakingReducer } from "./showMatchMakingReducer";
import { turnsRemainingReducer } from "./turnsRemainingReducer";
import { currentUserReducer } from "./currentUserReducer";
import { winTimeReducer } from "./winTimeReducer";
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
  displayLoading: showMatchMakingReducer,
  opponentData: opponentDataReducer,
  currentUser: currentUserReducer,
  winTime: winTimeReducer,
  searchedUser: searchedUserReducer,
  displayingPage: pageNavigatorReducer,
  showLogin: showLoginReducer,
});
