import React, { useState } from "react";
import PropTypes from "prop-types";
import { SET_SINGLE_PLAYER } from "../actions/actionTypes";
import { Button } from "@vechaiui/react";

function PlayAgainButton(props) {
  let { playAgain, confirmSave } = props;
  return (
    <Button
      variant="solid"
      onClick={() => {
        confirmSave(null);
        playAgain();
      }}
    >
      Play Again?
    </Button>
  );
}
PlayAgainButton.propTypes = {
  playAgain: PropTypes.func,
  confirmSave: PropTypes.func,
};

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

  let [savedToLeaderboard, confirmSave] = useState(null);

  if (isWinner == null) {
    return null;
  }

  if (isWinner === false) {
    return (
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-xl font-bold">YOU LOSE HAHAHA</h1>
        <PlayAgainButton playAgain={playAgain} confirmSave={confirmSave} />
      </div>
    );
  }

  let display;
  if (gameType === SET_SINGLE_PLAYER) {
    if (currentUser === null) {
      display = (
        <>
          <h3>Login or create an account to upload your time to leaderboard</h3>
          <Button variant="solid" onClick={() => toggleLogin()}>
            Login
          </Button>
        </>
      );
    } else {
      switch (savedToLeaderboard) {
        case true:
          display = <h3>Saved!</h3>;
          break;
        case false:
          display = (
            <>
              <h3>Unable To Save</h3>
              <Button
                variant="solid"
                onClick={() => uploadGameInfo(confirmSave)}
              >
                Try Again?
              </Button>
            </>
          );
          break;
        default:
          display = (
            <>
              <h3>Upload Time To Leaderboard?</h3>
              <Button
                variant="solid"
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
    let amountOfWinners = playersData.reduce((winningPlayers, player) => {
      if (player.isWinner) {
        winningPlayers++;
      }
      return winningPlayers;
    }, 0);
    display = (
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
      {display}
      <PlayAgainButton confirmSave={confirmSave} playAgain={playAgain} />
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
