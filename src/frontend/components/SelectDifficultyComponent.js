import React, { useState } from "react";
import { SelectDifficultyButtonContainer } from "../containers/SelectDifficultyButtonContainer";
import PropTypes from "prop-types";

export function SelectDifficultyComponent(props) {
  let { toggleDifficulty } = props;
  let [showCustom, toggleCustom] = useState(false);
  let [customDigits, updateDigits] = useState(4);
  let [customCodeLength, updateLength] = useState(7);
  let CustomDifficulty = null;
  if (showCustom) {
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
        <SelectDifficultyButtonContainer
          toggleDifficulty={() => toggleDifficulty(false)}
          length={customCodeLength}
          maxDigits={customDigits}
          name={"Submit"}
        />
      </div>
    );
  }
  return (
    <>
      <SelectDifficultyButtonContainer
        name={"Easy"}
        toggleDifficulty={() => toggleDifficulty(false)}
      />
      <SelectDifficultyButtonContainer
        name={"Normal"}
        toggleDifficulty={() => toggleDifficulty(false)}
      />
      <SelectDifficultyButtonContainer
        name={"Hard"}
        toggleDifficulty={() => toggleDifficulty(false)}
      />
      <button onClick={() => toggleCustom(!showCustom)}>Custom</button>
      {CustomDifficulty}
    </>
  );
}

SelectDifficultyComponent.propTypes = {
  toggleDifficulty: PropTypes.func,
};
