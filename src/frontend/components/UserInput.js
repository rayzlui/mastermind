import React, { useState } from "react";
import PropTypes from "prop-types";

export function UserInput(props) {
  let { gameDifficulty, gameOver, code, submitGuess, turnsRemaining } = props;
  let { codeLength, maxDigits } = gameDifficulty;
  let [userGuess, updateGuess] = useState(new Array(codeLength).fill(null));
  let [directIndex, updateIndex] = useState(null);
  let [hint, toggleHint] = useState(false);

  if (turnsRemaining === 0) {
    return <h1>YOU LOSE HAHAHA</h1>;
  }

  if (gameOver) {
    return <h1>You Win</h1>;
  }

  function handleKeyPress(event) {
    let { keyCode } = event;
    let copyUserGuess = userGuess.slice();
    let value = keyCode - 48;
    const DELETE_KEY_CODE = -40;
    if (value === DELETE_KEY_CODE) {
      for (let i = copyUserGuess.length - 1; i >= 0; i--) {
        if (copyUserGuess[i] !== null) {
          copyUserGuess[i] = null;
          break;
        }
      }
      updateGuess(copyUserGuess);
    } else if (value <= 9 && value >= 1 && value <= maxDigits) {
      if (directIndex !== null) {
        copyUserGuess[directIndex] = value;
      } else {
        for (let i = 0; i < copyUserGuess.length; i++) {
          if (copyUserGuess[i] === null) {
            copyUserGuess[i] = value;
            break;
          }
        }
      }
      updateGuess(copyUserGuess);
    }
    updateIndex(null);
    toggleHint(false);
    return null;
  }

  function handleClick(num) {
    let copyUserGuess = userGuess.slice();
    if (directIndex !== null) {
      copyUserGuess[directIndex] = num;
    } else {
      for (let i = 0; i < copyUserGuess.length; i++) {
        if (copyUserGuess[i] === null) {
          copyUserGuess[i] = num;
          break;
        }
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
    let displayValue = inputValue === null ? "Fill" : inputValue;
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
    >
      <p>Turns Remaining: {turnsRemaining}</p>
      <div>{showInputs}</div>

      <div>{clickEntries}</div>

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
  gameOver: PropTypes.bool,
  code: PropTypes.array,
};
