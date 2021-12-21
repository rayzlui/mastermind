import React from "react";
import PropTypes from "prop-types";

export function ShowPVPInfo(props) {
  let { opponentData } = props;
  if (opponentData === null) {
    return null;
  }
  let { player1, player2 } = opponentData;

  return (
    <div>
      <h1>PvP Mode !1</h1>
      <h3>{player1.name}</h3>
      <p>Moves {player1.moves}</p>
      <h3>{player2.name}</h3>
      <p>Moves {player2.moves}</p>
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
