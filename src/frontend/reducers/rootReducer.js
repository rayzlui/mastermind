import { combineReducers } from "redux";
import { gameDifficultyReducer } from "./gameDifficultyReducer";
import { gameOverReducer } from "./gameOverReducer";
import { mastermindCodeReducer } from "./mastermindCodeReducer";
import { moveHistoryReducer } from "./moveHistoryReducer";
import { turnsRemainingReducer } from "./turnsRemainingReducer";

export const rootReducer = combineReducers({
  moveHistory: moveHistoryReducer,
  mastermindCode: mastermindCodeReducer,
  gameOver: gameOverReducer,
  turnsRemaining: turnsRemainingReducer,
  gameDifficulty: gameDifficultyReducer,
});
