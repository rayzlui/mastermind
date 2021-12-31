import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

export function covertMillisecondsToMinutes(milli) {
  let totalSeconds = milli / 1000;
  let minutes = Math.floor(totalSeconds / 60);
  let seconds =
    totalSeconds % 60 < 10 ? `0${totalSeconds % 60}` : totalSeconds % 60;
  if (milli < 0) {
    minutes = 0;
    seconds = "00";
  }
  return { minutes, seconds };
}

export function TimerComponent(props) {
  let { isWinner, endGame, updateDataBaseForPvP, time, setWinTime } = props;
  let [gameTimer, updateGameTimer] = useState(time);
  //if game is reset in state
  useEffect(() => {
    updateGameTimer(time);
  }, [time]);

  //timer ends game if it runs out, or if game is over before timer ends, timer will stop.
  useEffect(() => {
    let countdown = setInterval(() => {
      updateGameTimer(gameTimer - 1000);
    }, 1000);

    if (gameTimer <= 0) {
      endGame();
      updateDataBaseForPvP();
      clearInterval(countdown);
    }

    if (isWinner !== null) {
      setWinTime(gameTimer);
      updateDataBaseForPvP(gameTimer);
      clearInterval(countdown);
    }
    return () => {
      clearInterval(countdown);
    };
  }, [gameTimer, isWinner]);

  let { minutes, seconds } = covertMillisecondsToMinutes(gameTimer);

  return (
    <div className="flex mt-10 flex-col items-center">
      <p className="font-bold text-md">Time:</p>
      <p
        className={`font-bold text-sm ${
          gameTimer < 120000 && gameTimer > 60000 ? "text-yellow-500" : ""
        } ${gameTimer <= 60000 ? "text-red-500" : ""}`}
      >{`${minutes}:${seconds}`}</p>
    </div>
  );
}

TimerComponent.propTypes = {
  isWinner: PropTypes.bool,
  endGame: PropTypes.func,
  setWinTime: PropTypes.func,
  updateDataBaseForPvP: PropTypes.func,
  time: PropTypes.number,
};
