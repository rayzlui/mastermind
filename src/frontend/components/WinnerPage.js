import React, { useState } from "react";
import PropTypes from "prop-types";
import { SET_SINGLE_PLAYER } from "../actions/actionTypes";
import { Button } from "@vechaiui/react";
import {
  playGameAgain,
  showLogin,
  uploadTimeToLeaderboard,
} from "../actions/actions";
import { useDispatch, useSelector } from "react-redux";

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
  let dispatch = useDispatch();
  let isWinner = useSelector((state) => state.isWinner);
  let gameType = useSelector((state) => state.gameType);
  let currentUser = useSelector((state) => state.currentUser);
  let opponentData = useSelector((state) => state.opponentData);
  let [savedToLeaderboard, confirmSave] = useState(null);

  let playAgain = () => dispatch(playGameAgain());
  let uploadGameInfo = () => dispatch(uploadTimeToLeaderboard(confirmSave));
  let toggleLogin = () => dispatch(showLogin("Login"));

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
              <Button variant="solid" onClick={() => uploadGameInfo()}>
                Try Again?
              </Button>
            </>
          );
          break;
        default:
          display = (
            <>
              <h3>Upload Time To Leaderboard?</h3>
              <Button variant="solid" onClick={() => uploadGameInfo()}>
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
