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
  let { isWinner, endGame, setWinTime } = props;
  let [time, updateTime] = useState(180000);
  //time is three minutes
  useEffect(() => {
    let timer = setInterval(() => {
      updateTime(time - 1000);
    }, 1000);
    if (time <= 0) {
      endGame();
      clearInterval(timer);
    }
    if (isWinner) {
      setWinTime(time);
      console.log(time);
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [time, isWinner]);
  let { minutes, seconds } = covertMillisecondsToMinutes(time);
  return <p>Time Remaining: {`${minutes}:${seconds}`}</p>;
}

TimerComponent.propTypes = {
  isWinner: PropTypes.bool,
  endGame: PropTypes.func,
  setWinTime: PropTypes.func,
};
