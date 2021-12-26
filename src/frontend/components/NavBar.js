import React from "react";
import PropTypes from "prop-types";
import {
  DISPLAY_USER,
  VIEW_LEADERBOARD,
  SELECT_DIFFICULTY,
} from "../actions/actionTypes";

export function NavBar(props) {
  let { changePageTo } = props;
  return (
    <nav>
      <button onClick={() => changePageTo(SELECT_DIFFICULTY)}>Play</button>
      <button onClick={() => changePageTo(DISPLAY_USER)}>Search User</button>
      <button onClick={() => changePageTo(VIEW_LEADERBOARD)}>
        View Leaderboard
      </button>
    </nav>
  );
}

NavBar.propTypes = {
  changePageTo: PropTypes.func,
};
