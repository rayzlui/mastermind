import React, { useState } from "react";
import PropTypes from "prop-types";
import { SET_SINGLE_PLAYER } from "../actions/actionTypes";
import { Button, Input } from "@vechaiui/react";

function DifficultyButtons(props) {
  let { buttonAction, gameType } = props;
  return ["easy", "normal", "hard"].map((difficulty) => {
    return (
      <Button
        key={`button-${difficulty}`}
        variant="light"
        onClick={() => buttonAction({ difficulty, gameType })}
      >
        {difficulty}
      </Button>
    );
  });
}

DifficultyButtons.propTypes = {
  buttonAction: PropTypes.func,
  gameType: PropTypes.string,
};

function CustomDifficultyRange(props) {
  let { buttonAction } = props;

  let [customDigits, updateDigits] = useState(4);
  let [customCodeLength, updateLength] = useState(7);
  return (
    <>
      <div className="flex flex-col">
        <label className="font-sans text-sm">Max Digits</label>
        <div>
          <input
            type="range"
            min="2"
            max="9"
            value={customDigits}
            onChange={(e) => updateDigits(parseInt(e.target.value))}
          />
          <Input
            className="w-10"
            type="text"
            value={customDigits}
            size="xs"
            onChange={(e) => updateDigits(parseInt(e.target.value))}
          />
        </div>
      </div>
      <div className="flex flex-col">
        <label className="font-sans text-sm">Code Length</label>
        <div>
          <input
            type="range"
            min="1"
            max="15"
            value={customCodeLength}
            onChange={(e) => updateLength(parseInt(e.target.value))}
          />
          <Input
            className="w-10"
            type="text"
            size="xs"
            value={customCodeLength}
            onChange={(e) => updateLength(parseInt(e.target.value))}
          />
        </div>
      </div>
      <Button
        variant="ghost"
        onClick={() => {
          buttonAction({
            codeLength: customCodeLength,
            maxDigit: customDigits,
            SET_SINGLE_PLAYER,
          });
        }}
      >
        Start
      </Button>
    </>
  );
}

CustomDifficultyRange.propTypes = {
  updateDigits: PropTypes.func,
  updateLength: PropTypes.func,
  buttonAction: PropTypes.func,
  gameType: PropTypes.string,
};

export function SelectDifficultyComponent(props) {
  let { gameType, buttonAction } = props;
  let [showCustom, toggleCustom] = useState(false);

  let CustomRange =
    showCustom && gameType === SET_SINGLE_PLAYER ? (
      <CustomDifficultyRange buttonAction={buttonAction} />
    ) : null;
  let CustomButton =
    gameType === SET_SINGLE_PLAYER ? (
      <Button variant="solid" onClick={() => toggleCustom(!showCustom)}>
        custom
      </Button>
    ) : null;

  return (
    <div className="flex flex-col items-center">
      <div>
        <DifficultyButtons buttonAction={buttonAction} gameType={gameType} />
        {CustomButton}
      </div>
      <div className="flex flex-col">{CustomRange}</div>
    </div>
  );
}

SelectDifficultyComponent.propTypes = {
  toggleDifficulty: PropTypes.func,
  gameType: PropTypes.string,
  buttonAction: PropTypes.func,
};
