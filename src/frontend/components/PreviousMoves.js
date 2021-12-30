import React from "react";
import PropTypes from "prop-types";
import * as Tooltip from "@radix-ui/react-tooltip";

export function PreviousMoves(props) {
  let { moveHistory } = props;

  let previousMoves = [];
  for (let i = 0; i < moveHistory.length; i++) {
    let { move, redPeg, whitePeg } = moveHistory[i];
    let backGroundColor = i % 2 === 0 ? "bg-slate-200" : "bg-zinc-00";
    let tableRow = (
      <tr key={`move${i + 1}`} className={backGroundColor}>
        <td>{i + 1}</td>
        <td>{move}</td>
        <td>{redPeg}</td>
        <td>{whitePeg}</td>
      </tr>
    );
    previousMoves.push(tableRow);
  }

  return (
    <>
      <h1 className="text-xl font-bold">Your Mooooooo-ves</h1>
      <table className="mt-8 w-full">
        <thead>
          <tr>
            <td>
              <Tooltip.Root delayDuration={0}>
                <Tooltip.Trigger>
                  <th>Move</th>
                </Tooltip.Trigger>
                <Tooltip.Content
                  sideOffset={5}
                  className="text-sm font-normal bg-white"
                >
                  This is the order of your moves{" "}
                </Tooltip.Content>
              </Tooltip.Root>
            </td>
            <td>
              <Tooltip.Root delayDuration={0}>
                <Tooltip.Trigger>
                  <th>Code</th>
                </Tooltip.Trigger>
                <Tooltip.Content
                  sideOffset={5}
                  className="text-sm font-normal bg-white"
                >
                  This is the code you guessed{" "}
                </Tooltip.Content>
              </Tooltip.Root>
            </td>
            <td>
              <Tooltip.Root delayDuration={0}>
                <Tooltip.Trigger>
                  <th>Red</th>
                </Tooltip.Trigger>
                <Tooltip.Content
                  sideOffset={5}
                  className="text-sm font-normal bg-white"
                >
                  This is the amount of numbers you got correct.
                </Tooltip.Content>
              </Tooltip.Root>
            </td>
            <td>
              <Tooltip.Root delayDuration={0}>
                <Tooltip.Trigger>
                  <th>White</th>
                </Tooltip.Trigger>
                <Tooltip.Content
                  sideOffset={5}
                  className="text-sm font-normal bg-white w-1/4"
                >
                  This is the amount of numbers you got correct, but are in the
                  wrong spot.
                </Tooltip.Content>
              </Tooltip.Root>
            </td>
          </tr>
        </thead>
        <tbody>{previousMoves}</tbody>
      </table>
    </>
  );
}

PreviousMoves.propTypes = {
  moveHistory: PropTypes.array,
};
