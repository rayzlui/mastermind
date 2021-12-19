import React from "react";
import PropTypes from "prop-types";

export function PreviousMoves(props) {
  let { moveHistory } = props;

  let previousMoves = [];
  for (let i = 0; i < moveHistory.length; i++) {
    let { move, redPeg, whitePeg } = moveHistory[i];
    let tableRow = (
      <tr key={`move${i + 1}`}>
        <td>{i + 1}</td>
        <td>{move}</td>
        <td>{redPeg}</td>
        <td>{whitePeg}</td>
      </tr>
    );
    previousMoves.push(tableRow);
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Move Number</th>
          <th>Code</th>
          <th>Red</th>
          <th>White</th>
        </tr>
      </thead>
      <tbody>{previousMoves}</tbody>
    </table>
  );
}

PreviousMoves.propTypes = {
  moveHistory: PropTypes.array,
};
