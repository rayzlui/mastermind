import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

function covertMillisecondsToMinutes(milli) {
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
  let { gameOver, endGame, gameType } = props;
  let startTime = gameType === "single" ? 180000 : 0;
  //time is three minutes for single player, we count up if its multiplayer and save time.
  let [time, updateTime] = useState(startTime);
  useEffect(() => {
    let countDirection = 1;
    if (gameType === "single") {
      countDirection = -1;
      if (time <= 0) {
        endGame();
        clearInterval(timer);
      }
    }
    let timer = setInterval(() => {
      updateTime(time + 1000 * countDirection);
    }, 1000);
    if (gameOver) {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [time, gameOver]);

  let { minutes, seconds } = covertMillisecondsToMinutes(time);
  return <p>Time Remaining: {`${minutes}:${seconds}`}</p>;
}

TimerComponent.propTypes = {
  gameOver: PropTypes.bool,
  endGame: PropTypes.func,
  gameType: PropTypes.string,
};
