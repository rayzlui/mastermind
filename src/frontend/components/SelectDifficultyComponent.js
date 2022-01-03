import React, { useState } from "react";
import PropTypes from "prop-types";
import { SINGLE_PLAYER } from "../actions/actionTypes";
import { Button, Input } from "@vechaiui/react";
import { createGameWithDetails } from "../actions/actions";
import { useSelector, useDispatch } from "react-redux";

function translateDifficultyToNums(name) {
  let codeLength;
  let maxDigit;
  switch (name) {
    case "easy":
      codeLength = 4;
      maxDigit = 4;
      break;
    case "hard":
      codeLength = 7;
      maxDigit = 9;
      break;
    default:
      codeLength = 4;
      maxDigit = 8;
      break;
  }
  return { name, codeLength, maxDigit };
}

function DifficultyButtons(props) {
  let { selectGame } = props;
  return ["easy", "normal", "hard"].map((difficulty) => {
    return (
      <Button
        key={`button-${difficulty}`}
        variant="light"
        onClick={() => selectGame(translateDifficultyToNums(difficulty))}
      >
        {difficulty}
      </Button>
    );
  });
}

DifficultyButtons.propTypes = {
  selectGame: PropTypes.func,
};

function CustomDifficultyRange(props) {
  let { selectGame } = props;

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
            max="10"
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
        variant="solid"
        onClick={() => {
          selectGame({
            codeLength: customCodeLength,
            maxDigit: customDigits,
            difficulty: "custom",
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
  selectGame: PropTypes.func,
};

export function SelectDifficultyComponent() {
  let [showCustom, toggleCustom] = useState(false);
  let gameType = useSelector((state) => state.gameType);
  let dispatch = useDispatch();

  let selectGame = (gameDetails) => {
    dispatch(createGameWithDetails(gameDetails));
  };

  let CustomRange =
    showCustom && gameType === SINGLE_PLAYER ? (
      <CustomDifficultyRange selectGame={selectGame} />
    ) : null;
  let CustomButton =
    gameType === SINGLE_PLAYER ? (
      <Button variant="solid" onClick={() => toggleCustom(!showCustom)}>
        custom
      </Button>
    ) : null;

  return (
    <div className="flex flex-col items-center">
      <div>
        <DifficultyButtons selectGame={selectGame} />
        {CustomButton}
      </div>
      <div className="flex flex-col">{CustomRange}</div>
    </div>
  );
}
