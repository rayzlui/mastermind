import React, { useState } from "react";
import PropTypes from "prop-types";
import { covertMillisecondsToMinutes } from "./TimerComponent";

function HideUntilClick(props) {
  let { beforeClick, afterClick } = props;
  let [show, toggleShow] = useState(false);
  if (show) {
    return <p>{afterClick}</p>;
  }
  return <p onClick={() => toggleShow(true)}>{beforeClick}</p>;
}
HideUntilClick.propTypes = {
  beforeClick: PropTypes.string,
  afterClick: PropTypes.string,
};

export function ShowThisUser(props) {
  let { searchedUser } = props;
  if (searchedUser === null) {
    return null;
  }
  let { name, gameHistory } = searchedUser;
  let showGameHistory = gameHistory.map((game, index) => {
    let { difficulty, time, code } = game;
    let { nums } = code;
    let { minutes, seconds } = covertMillisecondsToMinutes(time);
    return (
      <section key={`user-history-${index}`}>
        <HideUntilClick beforeClick={difficulty} afterClick={nums} />
        <p>
          {minutes}:{seconds}
        </p>
      </section>
    );
  });
  return (
    <div>
      <h1>{name}</h1>
      <h3>Game History</h3>
      {showGameHistory}
    </div>
  );
}

ShowThisUser.propTypes = {
  searchedUser: PropTypes.object,
};
