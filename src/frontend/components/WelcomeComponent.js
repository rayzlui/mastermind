import React, { useState } from "react";
import { SelectDifficultyComponent } from "./SelectDifficultyComponent";

export function WelcomeScreen() {
  let [gameMode, selectGameMode] = useState(null);
  let [showGameDiff, toggleGameDiff] = useState(false);

  let GameDiff = showGameDiff ? (
    <SelectDifficultyComponent gameMode={gameMode} />
  ) : null;

  function handleClick(select) {
    selectGameMode(select);
    toggleGameDiff(true);
  }
  return (
    <div>
      <button onClick={() => handleClick("single")}>Single Player</button>
      <button onClick={() => handleClick("pvp")}>One on One</button>
      <button onClick={() => handleClick("tournament")}>Tournament</button>
      {GameDiff}
    </div>
  );
}
