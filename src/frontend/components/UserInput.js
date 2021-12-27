import React, { useState } from "react";
import PropTypes from "prop-types";
const BACKSPACE = "BACKSPACE";

export function UserInput(props) {
  let { gameDifficulty, code, submitGuess, turnsRemaining } = props;
  let { codeLength, maxDigits } = gameDifficulty;
  let [userGuess, updateGuess] = useState([]);
  let [directIndex, updateIndex] = useState(null);
  let [hint, toggleHint] = useState(false);
  if (turnsRemaining < 1) {
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
    } else if (value <= 9 && value >= 1 && value <= maxDigits) {
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
      <button key={`input${i}`} onClick={() => handleDirectIndexInput(i)}>
        {displayValue}
      </button>
    );
  }

  let clickEntries = [];
  for (let i = 1; i <= maxDigits; i++) {
    clickEntries.push(
      <button key={`click${i}`} onClick={() => handleClick(i)}>
        {i}
      </button>
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

  let submitButton = (
    <button onClick={() => handleSubmit(userGuess)}>Submit Guess</button>
  );

  let hintButton = null;

  if (directIndex) {
    hintButton = <button onClick={() => handleHint()}>Hint</button>;
  }
  return (
    <div
      className="user_input"
      tabIndex={0}
      onKeyDown={(e) => handleKeyPress(e)}
      autoFocus={true}
    >
      <p>Turns Remaining: {turnsRemaining}</p>
      <div>{showInputs}</div>

      <div>
        {clickEntries}
        <button onClick={() => handleClick(BACKSPACE)}>Delete Previous</button>
      </div>

      <div>
        {submitButton}
        {hintButton}
      </div>
    </div>
  );
}
UserInput.propTypes = {
  codeLength: PropTypes.number,
  maxDigits: PropTypes.number,
  submitGuess: PropTypes.func,
  gameDifficulty: PropTypes.object,
  turnsRemaining: PropTypes.number,
  code: PropTypes.array,
};
