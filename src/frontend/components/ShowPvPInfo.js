import React from "react";
import PropTypes from "prop-types";
import { covertMillisecondsToMinutes } from "./TimerComponent";

export function ShowPVPInfo(props) {
  let { opponentData } = props;
  if (opponentData === null) {
    return null;
  }
  let { players } = opponentData;
  let arrayOfPlayers = Object.values(players);
  let display = [];
  arrayOfPlayers.forEach((data, index) => {
    let { name, moves, finished } = data;
    let { minutes, seconds } = covertMillisecondsToMinutes(finished);
    let playerFinished = finished ? (
      <p key={`player${index}`}>
        Player has finished in {minutes}: {seconds}
      </p>
    ) : null;
    display.push(
      <>
        <h3>{name}</h3>
        <p>Moves {moves}</p>
        {playerFinished}
      </>
    );
  });

  return (
    <div>
      <h1>PvP Mode !1</h1>
      {display}
    </div>
  );
}

ShowPVPInfo.propTypes = {
  opponentData: PropTypes.object,
  player1: PropTypes.string,
  player2: PropTypes.string,
  player1Moves: PropTypes.number,
  player2Moves: PropTypes.number,
};
