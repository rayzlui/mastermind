import React, { useState } from "react";
import { DifficultyButtonContainer } from "../containers/Buttons/DifficultyContainer";
import PropTypes from "prop-types";

export function SelectDifficultyComponent(props) {
  let { gameMode } = props;
  let [showCustom, toggleCustom] = useState(false);
  let [customDigits, updateDigits] = useState(4);
  let [customCodeLength, updateLength] = useState(7);
  let CustomDifficulty = null;
  if (showCustom && gameMode === "single") {
    CustomDifficulty = (
      <div className={"custom-difficulty-display"}>
        <label>Max Digits</label>
        <input
          type="range"
          min="1"
          max="9"
          value={customDigits}
          onChange={(e) => updateDigits(parseInt(e.target.value))}
        />
        <input
          type="text"
          value={customDigits}
          onChange={(e) => updateDigits(parseInt(e.target.value))}
        />
        <label>Code Length</label>
        <input
          type="range"
          min="1"
          max="15"
          value={customCodeLength}
          onChange={(e) => updateLength(parseInt(e.target.value))}
        />
        <input
          type="input"
          value={customCodeLength}
          onChange={(e) => updateLength(parseInt(e.target.value))}
        />
        <DifficultyButtonContainer
          length={customCodeLength}
          maxDigits={customDigits}
          difficulty={"Submit"}
        />
      </div>
    );
  }
  let CustomButton =
    gameMode === "single" ? (
      <button onClick={() => toggleCustom(!showCustom)}>Custom</button>
    ) : null;

  let DifficultyButtons = ["easy", "normal", "hard"].map((diff) => {
    return (
      <DifficultyButtonContainer
        key={`${diff} button`}
        difficulty={`${diff}`}
        gameMode={gameMode}
      />
    );
  });
  return (
    <>
      {DifficultyButtons}
      {CustomButton}
      {CustomDifficulty}
    </>
  );
}

SelectDifficultyComponent.propTypes = {
  toggleDifficulty: PropTypes.func,
  gameMode: PropTypes.string,
};
