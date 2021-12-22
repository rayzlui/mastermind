import React from "react";
import { LoginUserContainer } from "../containers/LoginUserContainer";
import { CreateUserContainer } from "../containers/CreateUserContainer";
import PropTypes from "prop-types";

export function WinnerPage(props) {
  let { opponentData, currentUser, gameType, uploadTime, playAgain, isWinner } =
    props;
  if (!isWinner) {
    return null;
  }
  let input;
  if (gameType === "single") {
    if (currentUser === null) {
      input = (
        <>
          <h3>
            Login or create an account to upload your time to leader board
          </h3>
          <LoginUserContainer />
          <CreateUserContainer />
        </>
      );
    } else {
      input = (
        <>
          <h3>Upload Time To Leaderboard?</h3>
          <button onClick={() => uploadTime()}>Yes</button>
        </>
      );
    }
  } else {
    let { players } = opponentData;
    let playersData = Object.values(players);
    let amountOfWinners = playersData.reduce((acc, curr) => {
      if (curr["winner"]) {
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
    <div>
      <h1>Congratulations! You broke the code</h1>
      {input}
      <button onClick={() => playAgain()}>Play Again?</button>
    </div>
  );
}

WinnerPage.propTypes = {
  opponentData: PropTypes.object,
  currentUser: PropTypes.object,
  gameInfo: PropTypes.object,
  gameType: PropTypes.string,
  uploadTime: PropTypes.func,
  playAgain: PropTypes.func,
  isWinner: PropTypes.bool,
};
