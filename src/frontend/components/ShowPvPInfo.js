import React from "react";
import PropTypes from "prop-types";
import { covertMillisecondsToMinutes } from "./TimerComponent";

export function ShowPVPInfo(props) {
  let { opponentData } = props;
  let display;
  if (opponentData === null) {
    display = (
      <h1 className="font-sans mb-8  font-bold text-3xl">Single Player!</h1>
    );
  } else {
    let { players } = opponentData;
    let arrayOfPlayers = Object.values(players);
    let playersInfo = [];
    arrayOfPlayers.forEach((data, index) => {
      let { name, moves, finished } = data;
      let { minutes, seconds } = covertMillisecondsToMinutes(finished);
      let playerFinished = finished ? (
        <p key={`player${index}`}>
          <span className="text-red-400">{name} </span>has finished with{" "}
          <span className="text-green-400">
            {minutes}:{seconds}
          </span>{" "}
          remaining!
        </p>
      ) : null;
      playersInfo.push(
        <div className="w-1/4 h-full bg-white flex flex-col items-center border rounded-4">
          <h3 className="font-sans font-bold text-lg">{name}</h3>
          <p className="text-md">Moves: {moves}</p>
          {playerFinished}
        </div>
      );
    });
    display = (
      <>
        <h1 className="font-sans mb-8  font-bold text-3xl">PvP Mode !1</h1>
        <div className="flex justify-between w-full">{playersInfo}</div>
      </>
    );
  }

  return (
    <div className="flex flex-col h-1/4 items-center w-full">{display}</div>
  );
}

ShowPVPInfo.propTypes = {
  opponentData: PropTypes.object,
  player1: PropTypes.string,
  player2: PropTypes.string,
  player1Moves: PropTypes.number,
  player2Moves: PropTypes.number,
};
