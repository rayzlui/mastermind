import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { covertMillisecondsToMinutes } from "./TimerComponent";
import { VIEW_LEADERBOARD } from "../actions/actionTypes";

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
  let { displayingPage } = props;
  if (displayingPage !== VIEW_LEADERBOARD) {
    return null;
  }
  let [leaderboard, setLeaderboard] = useState(null);
  let [showDifficulty, changeDifficulty] = useState("normal");
  useEffect(async () => {
    let request = await fetch(`http://localhost:3001/api/leaderboard`);
    let data = await request.json();
    setLeaderboard(data);
  }, []);
  function viewPlayer(id) {
    console.log("This will allow user to view this player");
  }
  function playThisCode() {
    console.log("This will allows player to play this code");
  }
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
              <td onClick={() => viewPlayer(user._id)}>{user.name}</td>
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
      <TableForLeaderBoard difficulty={display[showDifficulty]} />
    </>
  );
}

TableForLeaderBoard.propTypes = {
  difficulty: PropTypes.array,
};

ViewLeaderboard.propTypes = {
  displayingPage: PropTypes.string,
};
