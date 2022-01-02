import React from "react";
import PropTypes from "prop-types";
import { covertMillisecondsToMinutes } from "./TimerComponent";
import { useSelector } from "react-redux";

function PlayersInfo(props) {
  let { arrayOfPlayers } = props;
  return arrayOfPlayers.map((playerData) => {
    let { name, moves, isWinner, time } = playerData;
    let { minutes, seconds } = covertMillisecondsToMinutes(time);
    let playerFinished = isWinner ? (
      <p>
        <span className="text-red-400">{name} </span>has finished with
        <span className="text-green-400">
          {minutes}:{seconds}
        </span>
        remaining!
      </p>
    ) : null;
    return (
      <div
        key={`pvpPlayer-${name}`}
        className="w-1/4 h-auto bg-gray-100 flex flex-col items-center border overflow-scroll rounded-4"
      >
        <h3 className="font-sans font-bold text-lg">{name}</h3>
        <p className="text-md">Moves: {moves}</p>
        {playerFinished}
      </div>
    );
  });
}

PlayersInfo.propTypes = { arrayOfPlayers: PropTypes.array };

export function ShowPVPInfo() {
  let pvpData = useSelector((state) => state.pvpData);
  let display;
  if (pvpData === null) {
    display = (
      <h1 className="font-sans mb-8  font-bold text-3xl">Single Player!</h1>
    );
  } else {
    let { players } = pvpData;
    let arrayOfPlayers = Object.values(players);

    display = (
      <>
        <h1 className="font-sans mb-8 font-bold text-3xl">PvP Mode !1</h1>
        <div className="flex justify-between h-full w-full">
          <PlayersInfo arrayOfPlayers={arrayOfPlayers} />
        </div>
      </>
    );
  }

  return (
    <div className="flex flex-col h-1/4 items-center w-full">{display}</div>
  );
}
