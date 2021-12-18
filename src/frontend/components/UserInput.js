import React, { useState } from "react";
import PropTypes from "prop-types";

export function UserInput(props) {
  let { gameDifficulty, gameOver, submitGuess, turnsRemaining } = props;
  let { codeLength, maxDigits } = gameDifficulty;
  let [userGuess, updateGuess] = useState([]);

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
    if (value === -40) {
      copyUserGuess.pop();
      updateGuess(copyUserGuess);
    } else if (value <= 9 && value >= 0 && value <= maxDigits) {
      if (userGuess.length >= codeLength) {
        return;
      }
      copyUserGuess.push(value);
      updateGuess(copyUserGuess);
    }
    return null;
  }

  function handleClick(num) {
    if (userGuess.length >= codeLength) {
      return;
    }
    let copyUserGuess = userGuess.slice();
    copyUserGuess.push(num);
    updateGuess(copyUserGuess);
    return null;
  }

  let showInputs = [];
  for (let i = 0; i < codeLength; i++) {
    let inputValue = userGuess[i];
    let displayValue = inputValue === undefined ? null : inputValue;
    showInputs.push(<div key={`inputs${i}`}>{displayValue}</div>);
  }

  let clickEntries = [];
  for (let i = 1; i <= maxDigits; i++) {
    clickEntries.push(
      <div key={`click${i}`} onClick={() => handleClick(i)}>
        {i}
      </div>
    );
  }

  function handleSubmit(userGuess) {
    if (userGuess.length < codeLength) {
      return;
    }
    submitGuess(userGuess);
    updateGuess([]);
    return null;
  }

  let submitButton = (
    <button onClick={() => handleSubmit(userGuess)}>Submit Guess</button>
  );

  return (
    <div
      className="user_input"
      tabIndex={0}
      onKeyDown={(e) => handleKeyPress(e)}
    >
      <h1>Turns Remaining: {turnsRemaining}</h1>
      {showInputs}
      {clickEntries}
      {submitButton}
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
};
