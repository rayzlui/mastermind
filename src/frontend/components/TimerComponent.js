import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

function covertMillisecondsToMinutes(milli) {
  let totalSeconds = milli / 1000;
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60 === 0 ? "00" : totalSeconds % 60;
  return { minutes, seconds };
}

export function TimerComponent(props) {
  let { gameOver } = props;
  let [time, updateTime] = useState(180000);
  //time is three minutes
  useEffect(() => {
    let timer = setInterval(() => {
      updateTime(time - 1000);
      if (time <= 0) {
        clearInterval(time);
      }
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
};
