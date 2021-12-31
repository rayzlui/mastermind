import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { Button } from "@vechaiui/react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { useDispatch, useSelector } from "react-redux";
import { userSubmitCodeForCheck } from "../actions/actions";
import { USED_HINT } from "../actions/actionTypes";
const BACKSPACE = "BACKSPACE";

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

function CodeGuessDisplay(props) {
  let { handleDirectIndexInput, codeLength, userGuess } = props;
  let showInputs = [];
  for (let i = 0; i < codeLength; i++) {
    let inputValue = userGuess[i];
    let displayValue;
    if (!inputValue) {
      displayValue = "Fill";
    } else {
      displayValue = inputValue;
    }
    showInputs.push(
      <Tooltip.Root>
        <Tooltip.Trigger>
          <Button
            size="xl"
            variant="ghost"
            key={`input${i}`}
            className="border"
            onClick={() => handleDirectIndexInput(i)}
          >
            {displayValue}
          </Button>
        </Tooltip.Trigger>
        <Tooltip.Content className="bg-slate-300 text-neutral w-24 text-sm">
          Click me to enter a number directly or to get access to a hint!
        </Tooltip.Content>
      </Tooltip.Root>
    );
  }
  return showInputs;
}

CodeGuessDisplay.propTypes = {
  handleDirectIndexInput: PropTypes.func,
  codeLength: PropTypes.number,
  userGuess: PropTypes.array,
};

function UserInputButtons(props) {
  let { handleClick, maxDigit, hint, correctCodeAtIndex } = props;
  let clickEntries = [];
  let skips = {};
  if (hint) {
    let removeOneThird = Math.floor(maxDigit / 3);
    let count = 0;
    while (count < removeOneThird) {
      let rand = Math.ceil(Math.random() * maxDigit);
      if (rand != correctCodeAtIndex) {
        skips[rand] = true;
        count++;
      }
    }
  }
  for (let i = 1; i <= maxDigit; i++) {
    if (skips[i] === undefined) {
      clickEntries.push(
        <Tooltip.Root>
          <Tooltip.Trigger>
            <Button
              variant="ghost"
              key={`click${i}`}
              onClick={() => handleClick(i)}
            >
              {i}
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Content className="bg-slate-300 text-neutral w-24 text-sm">
            Click me to enter a number or you can just use your numeric
            keyboard!
          </Tooltip.Content>
        </Tooltip.Root>
      );
    }
  }

  return clickEntries;
}

UserInputButtons.propTypes = {
  handleClick: PropTypes.func,
  maxDigit: PropTypes.number,
  hint: PropTypes.bool,
};

export function UserInput(props) {
  let dispatch = useDispatch();

  let gameDifficulty = useSelector((state) => state.gameDifficulty);
  let code = useSelector((state) => state.mastermindCode?.nums);
  let hintsRemaining = useSelector((state) => state.hintsRemaining);
  let isWinner = useSelector((state) => state.isWinner);

  let updateHintsAllowed = () => dispatch({ type: USED_HINT });
  let submitGuess = (code) => dispatch(userSubmitCodeForCheck(code));

  let { codeLength, maxDigit } = gameDifficulty;
  let [userGuess, updateGuess] = useState(new Array(codeLength).fill(null));
  let [clickedIndex, updateIndex] = useState(null);
  let [hint, toggleHint] = useState(false);

  let focusForKeyboard = useRef(null);
  useEffect(() => {
    focusForKeyboard.current.focus();
  }, []);

  if (isWinner !== null) {
    return null;
  }

  function handleKeyPress(event) {
    let { keyCode } = event;
    let copyUserGuess = userGuess.slice();
    let value = keyCode - 48;
    const DELETE_KEY_CODE = -40;
    if (value === DELETE_KEY_CODE) {
      copyUserGuess = backSpace(copyUserGuess);
    } else if (value <= 9 && value >= 1 && value <= maxDigit) {
      if (clickedIndex !== null) {
        copyUserGuess[clickedIndex] = value;
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
      if (clickedIndex !== null) {
        copyUserGuess[clickedIndex] = input;
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
    toggleHint(true);
    updateHintsAllowed();
    return null;
  }

  return (
    <div
      tabIndex={0}
      onKeyDown={(e) => handleKeyPress(e)}
      ref={focusForKeyboard}
      className="w-full h-1/3 flex items-center flex-col focus:outline-0"
    >
      <div className="w-full h-1/3 flex justify-center">
        <CodeGuessDisplay
          userGuess={userGuess}
          handleDirectIndexInput={handleDirectIndexInput}
          codeLength={codeLength}
        />
      </div>

      <div className="w-full h-1/3 flex justify-center">
        <UserInputButtons
          handleClick={handleClick}
          maxDigit={maxDigit}
          hint={hint}
          correctCodeAtIndex={hint ? code[clickedIndex] : null}
        />
      </div>

      <div className="w-full h-1/3 flex justify-center">
        <Button variant="solid" onClick={() => handleClick(BACKSPACE)}>
          Delete Previous
        </Button>
        <Button variant="solid" onClick={() => handleSubmit(userGuess)}>
          Submit Guess
        </Button>
        {clickedIndex !== null && hintsRemaining > 0 ? (
          <Button variant="solid" onClick={() => handleHint()}>
            Hint
          </Button>
        ) : null}
      </div>
    </div>
  );
}
UserInput.propTypes = {
  codeLength: PropTypes.number,
  maxDigit: PropTypes.number,
  submitGuess: PropTypes.func,
  gameDifficulty: PropTypes.object,
  isWinner: PropTypes.bool,
  code: PropTypes.array,
  hintsRemaining: PropTypes.number,
  updateHintsAllowed: PropTypes.func,
};
