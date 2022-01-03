import React, { useState } from "react";
import PropTypes from "prop-types";
import { convertMillisecondsToMinutes } from "../helperFunctions/convertMillToMins";
import * as Tooltip from "@radix-ui/react-tooltip";

function HideUntilClick(props) {
  let { beforeClick, afterClick } = props;
  let [show, toggleShow] = useState(false);
  if (show) {
    return <p onClick={() => toggleShow(false)}>{afterClick}</p>;
  }
  return (
    <Tooltip.Root>
      <Tooltip.Trigger>
        <p onClick={() => toggleShow(true)}>{beforeClick}</p>
      </Tooltip.Trigger>
      <Tooltip.Content className="bg-black text-white">
        Click to see the code
      </Tooltip.Content>
    </Tooltip.Root>
  );
}
HideUntilClick.propTypes = {
  beforeClick: PropTypes.string,
  afterClick: PropTypes.string,
};

function ShowGameHistory(props) {
  let { gameHistory } = props;
  return gameHistory.map((game, index) => {
    let { difficulty, time, code } = game;
    let { nums } = code;
    let { minutes, seconds } = convertMillisecondsToMinutes(time);
    return (
      <section key={`user-history-${index}`} className="border w-24">
        <HideUntilClick beforeClick={difficulty} afterClick={nums} />
        <p>
          Time: {minutes}:{seconds}
        </p>
      </section>
    );
  });
}

ShowGameHistory.propTypes = {
  gameHistory: PropTypes.array,
};

export function ShowThisUser(props) {
  let { searchedUser } = props;
  if (searchedUser === null) {
    return null;
  }
  let { username, gameHistory, dateJoined } = searchedUser;
  return (
    <div className="flex h-full">
      <div className="w-1/3 h-full border-r-2">
        <h1 className="text-lg mb-10 font-bold">{username}</h1>
        <p>Date Joined: {dateJoined.slice(0, 10)}</p>
      </div>
      <div className="w-2/3">
        <h3 className="text-md mb-10 font-bold">Game History</h3>
        <div className="flex flex-wrap justify-between">
          <ShowGameHistory gameHistory={gameHistory} />
        </div>
      </div>
    </div>
  );
}

ShowThisUser.propTypes = {
  searchedUser: PropTypes.object,
};
