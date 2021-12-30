import React, { useState } from "react";
import PropTypes from "prop-types";
import { SET_SINGLE_PLAYER } from "../actions/actionTypes";
import { Button } from "@vechaiui/react";

export function WinnerPage(props) {
  let {
    opponentData,
    currentUser,
    gameType,
    uploadGameInfo,
    playAgain,
    isWinner,
    toggleLogin,
  } = props;
  let [saved, confirmSave] = useState(null);

  function PlayAgainButton() {
    return (
      <Button
        variant="ghost"
        onClick={() => {
          confirmSave(null);
          playAgain();
        }}
      >
        Play Again?
      </Button>
    );
  }
  if (isWinner == null) {
    return null;
  }
  if (isWinner === false) {
    return (
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-xl font-bold">YOU LOSE HAHAHA</h1>
        <PlayAgainButton />
      </div>
    );
  }
  let input;
  if (gameType === SET_SINGLE_PLAYER) {
    if (currentUser === null) {
      input = (
        <>
          <h3>
            Login or create an account to upload your time to leader board
          </h3>
          <Button variant="ghost" onClick={() => toggleLogin()}>
            Login
          </Button>
        </>
      );
    } else {
      switch (saved) {
        case true:
          input = <h3>Saved!</h3>;
          break;
        case false:
          input = (
            <>
              <h3>Unable To Save</h3>
              <Button
                variant="ghost"
                onClick={() => uploadGameInfo(confirmSave)}
              >
                Try Again?
              </Button>
            </>
          );
          break;
        default:
          input = (
            <>
              <h3>Upload Time To Leaderboard?</h3>
              <Button
                variant="ghost"
                onClick={() => uploadGameInfo(confirmSave)}
              >
                Yes
              </Button>
            </>
          );
          break;
      }
    }
  } else {
    let { players } = opponentData;
    let playersData = Object.values(players);
    let amountOfWinners = playersData.reduce((acc, curr) => {
      if (curr["finished"]) {
        acc++;
      }
      return acc;
    }, 0);
    input = (
      <>
        <p>
          Well done, you placed {amountOfWinners} out of {playersData.length}
        </p>
      </>
    );
  }

  return (
    <div className="flex flex-col items-center justify items">
      <h1 className="text-xl font-bold">Congratulations! You broke the code</h1>
      {input}
      <PlayAgainButton />
    </div>
  );
}

WinnerPage.propTypes = {
  opponentData: PropTypes.object,
  currentUser: PropTypes.object,
  gameInfo: PropTypes.object,
  gameType: PropTypes.string,
  uploadGameInfo: PropTypes.func,
  playAgain: PropTypes.func,
  isWinner: PropTypes.bool,
  toggleLogin: PropTypes.func,
};
