import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "@vechaiui/react";
const BACKSPACE = "BACKSPACE";

export function UserInput(props) {
  let { gameDifficulty, code, submitGuess, isWinner } = props;
  let { codeLength, maxDigit } = gameDifficulty;
  let [userGuess, updateGuess] = useState([]);
  let [directIndex, updateIndex] = useState(null);
  let [hint, toggleHint] = useState(false);
  if (isWinner !== null) {
    return null;
  }

  function backSpace(arr) {
    for (let i = arr.length - 1; i >= 0; i--) {
      if (arr[i] !== null) {
        arr[i] = null;
        break;
      }
    }
    return arr;
  }

  function addToCode(arr, val) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === null) {
        arr[i] = val;
        break;
      }
    }
    return arr;
  }

  function handleKeyPress(event) {
    let { keyCode } = event;
    let copyUserGuess = userGuess.slice();
    let value = keyCode - 48;
    const DELETE_KEY_CODE = -40;
    if (value === DELETE_KEY_CODE) {
      copyUserGuess = backSpace(copyUserGuess);
    } else if (value <= 9 && value >= 1 && value <= maxDigit) {
      if (directIndex !== null) {
        copyUserGuess[directIndex] = value;
      } else {
        copyUserGuess = addToCode(copyUserGuess, value);
      }
    }
    updateGuess(copyUserGuess);
    updateIndex(null);
    toggleHint(false);
    return null;
  }

  function handleClick(input) {
    let copyUserGuess = userGuess.slice();
    if (input === BACKSPACE) {
      copyUserGuess = backSpace(copyUserGuess);
    } else {
      if (directIndex !== null) {
        copyUserGuess[directIndex] = input;
      } else {
        copyUserGuess = addToCode(copyUserGuess, input);
      }
    }
    updateIndex(null);
    updateGuess(copyUserGuess);
    toggleHint(false);
    return null;
  }

  function handleDirectIndexInput(index) {
    updateIndex(index);
    toggleHint(false);
    return null;
  }

  let showInputs = [];
  for (let i = 0; i < codeLength; i++) {
    let inputValue = userGuess[i];
    let displayValue;
    if (!inputValue) {
      displayValue = "Fill";
      userGuess[i] = null;
    } else {
      displayValue = inputValue;
    }
    showInputs.push(
      <Button
        size="xl"
        variant="ghost"
        key={`input${i}`}
        className="border"
        onClick={() => handleDirectIndexInput(i)}
      >
        {displayValue}
      </Button>
    );
  }
  let DeleteButton = (
    <Button variant="ghost" onClick={() => handleClick(BACKSPACE)}>
      Delete Previous
    </Button>
  );
  let clickEntries = [];
  for (let i = 1; i <= maxDigit; i++) {
    clickEntries.push(
      <Button variant="ghost" key={`click${i}`} onClick={() => handleClick(i)}>
        {i}
      </Button>
    );
  }
  if (hint) {
    let removeOneThird = codeLength / 3;
    let count = 0;
    let correctNumAtIndex = code[directIndex];
    while (count < removeOneThird) {
      let rand = Math.floor(Math.random() * codeLength);
      if (rand !== correctNumAtIndex) {
        clickEntries.splice(rand, 1);
        count++;
      }
    }
  }

  function handleSubmit(userGuess) {
    if (userGuess.some((x) => x === null)) {
      return;
    }
    submitGuess(userGuess);
    updateGuess(new Array(codeLength).fill(null));
    toggleHint(false);
    return null;
  }

  function handleHint() {
    toggleHint(!hint);
    return null;
  }

  let SubmitButton = (
    <Button variant="ghost" onClick={() => handleSubmit(userGuess)}>
      Submit Guess
    </Button>
  );

  let HintButton = null;

  if (directIndex) {
    HintButton = (
      <Button variant="ghost" onClick={() => handleHint()}>
        Hint
      </Button>
    );
  }
  return (
    <div
      tabIndex={0}
      onKeyDown={(e) => handleKeyPress(e)}
      autoFocus={true}
      className="w-full h-1/3 flex items-center flex-col"
    >
      <div className="w-full h-1/3 flex justify-center">{showInputs}</div>

      <div className="w-full h-1/3 flex justify-center">{clickEntries}</div>

      <div className="w-full h-1/3 flex justify-center">
        {DeleteButton}
        {SubmitButton}
        {HintButton}
      </div>
    </div>
  );
}
UserInput.propTypes = {
  codeLength: PropTypes.number,
  maxDigits: PropTypes.number,
  submitGuess: PropTypes.func,
  gameDifficulty: PropTypes.object,
  isWinner: PropTypes.bool,
  code: PropTypes.array,
};
