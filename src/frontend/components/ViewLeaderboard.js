import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { covertMillisecondsToMinutes } from "./TimerComponent";
import { VIEW_LEADERBOARD } from "../actions/actionTypes";
import { Button } from "@vechaiui/react";
import * as Tooltip from "@radix-ui/react-tooltip";

function TableForLeaderBoard(props) {
  let { difficulty } = props;
  return (
    <div className="w-full">
      <table className="w-full">
        <thead>
          <tr>
            <th className="w-1/2">Player</th>
            <th className="w-1/2">Time Remaining</th>
          </tr>
        </thead>
        <tbody className="w-full">{difficulty}</tbody>
      </table>
    </div>
  );
}

export function ViewLeaderboard(props) {
  let { displayingPage, viewPlayer, playThisCode } = props;
  if (displayingPage !== VIEW_LEADERBOARD) {
    return null;
  }
  let [leaderboard, setLeaderboard] = useState(null);
  let [showDifficulty, toggleDifficulty] = useState("normal");
  useEffect(async () => {
    let request = await fetch(`http://localhost:3001/api/leaderboard`);
    let data = await request.json();
    setLeaderboard(data);
  }, []);
  let display;
  if (leaderboard === null) {
    return <h1>Retrieving leaderboard</h1>;
  } else {
    let keysForDifficulty = Object.keys(leaderboard);
    display = keysForDifficulty.reduce((acc, diff) => {
      acc[diff] = leaderboard[diff].map((player, index) => {
        let { user, code, time } = player;
        let convertMilli = covertMillisecondsToMinutes(time);
        let { minutes, seconds } = convertMilli;
        return (
          <tr key={`row${index}`}>
            <td
              onClick={() => viewPlayer(user.name)}
              className="w-1/2 text-center"
            >
              <Tooltip.Root>
                <Tooltip.Trigger>{user.name}</Tooltip.Trigger>
                <Tooltip.Content className="bg-white text-black">
                  Click me to view this user&#39;s page
                </Tooltip.Content>
              </Tooltip.Root>
            </td>

            <td
              className="w-1/2 text-center"
              onClick={() => playThisCode(code)}
            >
              <Tooltip.Root>
                <Tooltip.Trigger>
                  {minutes}:{seconds}
                </Tooltip.Trigger>
                <Tooltip.Content className="bg-white text-black">
                  Click me to play this code
                </Tooltip.Content>
              </Tooltip.Root>
            </td>
          </tr>
        );
      });
      return acc;
    }, {});
  }
  function capitalize(string) {
    return string[0].toUpperCase() + string.slice(1);
  }
  return (
    <div className="flex flex-col items-center justify-center">
      <div>
        <Button variant="ghost" onClick={() => toggleDifficulty("easy")}>
          View Easy
        </Button>
        <Button variant="ghost" onClick={() => toggleDifficulty("normal")}>
          View Normal
        </Button>
        <Button variant="ghost" onClick={() => toggleDifficulty("hard")}>
          View Hard
        </Button>
      </div>
      <h1 className="text-2xl mb-4 font-bold">
        Leaderboard For {capitalize(showDifficulty)} Difficulty
      </h1>
      <TableForLeaderBoard difficulty={display[showDifficulty]} />
    </div>
  );
}

TableForLeaderBoard.propTypes = {
  difficulty: PropTypes.array,
};

ViewLeaderboard.propTypes = {
  displayingPage: PropTypes.string,
  playThisCode: PropTypes.func,
  viewPlayer: PropTypes.func,
};
