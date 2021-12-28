import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { covertMillisecondsToMinutes } from "./TimerComponent";
import { VIEW_LEADERBOARD } from "../actions/actionTypes";
import { Button } from "@vechaiui/react";

function TableForLeaderBoard(props) {
  let { difficulty } = props;
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>{difficulty}</tbody>
    </table>
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
      acc[diff] = leaderboard[diff].map((player) => {
        let { user, code, time } = player;
        let convertMilli = covertMillisecondsToMinutes(time);
        let { minutes, seconds } = convertMilli;
        return (
          <>
            <tr>
              <td onClick={() => viewPlayer(user.name)}>{user.name}</td>
              <td onClick={() => playThisCode(code)}>
                {minutes}:{seconds}
              </td>
            </tr>
          </>
        );
      });
      return acc;
    }, {});
  }
  return (
    <>
      <h1>Leaderboard {showDifficulty}</h1>
      <Button variant="ghost" onClick={() => toggleDifficulty("easy")}>
        Easy
      </Button>
      <Button variant="ghost" onClick={() => toggleDifficulty("normal")}>
        Normal
      </Button>
      <Button variant="ghost" onClick={() => toggleDifficulty("hard")}>
        Hard
      </Button>
      <TableForLeaderBoard difficulty={display[showDifficulty]} />
    </>
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
