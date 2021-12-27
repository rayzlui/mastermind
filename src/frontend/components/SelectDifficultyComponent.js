import React, { useState } from "react";
import { DifficultyButtonContainer } from "../containers/Buttons/DifficultyContainer";
import PropTypes from "prop-types";
import { SET_SINGLE_PLAYER } from "../actions/actionTypes";

export function SelectDifficultyComponent(props) {
  let { gameType } = props;
  let [showCustom, toggleCustom] = useState(false);
  let [customDigits, updateDigits] = useState(4);
  let [customCodeLength, updateLength] = useState(7);
  let CustomDifficulty = null;
  if (showCustom && gameType === SET_SINGLE_PLAYER) {
    CustomDifficulty = (
      <div className={"custom-difficulty-display"}>
        <label>Max Digits</label>
        <input
          type="range"
          min="2"
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
          gameType={gameType}
          difficulty={"Submit"}
        />
      </div>
    );
  }
  let CustomButton =
    gameType === SET_SINGLE_PLAYER ? (
      <button onClick={() => toggleCustom(!showCustom)}>Custom</button>
    ) : null;

  let DifficultyButtons = ["easy", "normal", "hard"].map((diff) => {
    return (
      <DifficultyButtonContainer
        key={`${diff} button`}
        difficulty={`${diff}`}
        gameType={gameType}
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
  gameType: PropTypes.string,
};
