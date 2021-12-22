import { combineReducers } from "redux";
import { gameDifficultyReducer } from "./gameDifficultyReducer";
import { gameOverReducer } from "./gameOverReducer";
import { gameTypeReducer } from "./gameTypeReducer";
import { mastermindCodeReducer } from "./mastermindCodeReducer";
import { moveHistoryReducer } from "./moveHistoryReducer";
import { opponentDataReducer } from "./opponentData";
import { showMatchMakingReducer } from "./showMatchMakingReducer";
import { turnsRemainingReducer } from "./turnsRemainingReducer";
import { currentUserReducer } from "./currentUserReducer";

export const rootReducer = combineReducers({
  moveHistory: moveHistoryReducer,
  mastermindCode: mastermindCodeReducer,
  gameOver: gameOverReducer,
  turnsRemaining: turnsRemainingReducer,
  gameDifficulty: gameDifficultyReducer,
  gameType: gameTypeReducer,
  displayLoading: showMatchMakingReducer,
  opponentData: opponentDataReducer,
  currentUser: currentUserReducer,
});
