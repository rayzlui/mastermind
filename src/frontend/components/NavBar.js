import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  DISPLAY_USER,
  VIEW_LEADERBOARD,
  SELECT_DIFFICULTY,
} from "../actions/actionTypes";
import { Button } from "@vechaiui/react";
import { InputSearchUserContainer } from "../containers/InputSearchUserContainer";

export function NavBar(props) {
  let { changePageTo } = props;
  let [selectedNavType, toggleNavType] = useState(SELECT_DIFFICULTY);
  function handleClick(type) {
    changePageTo(type);
    toggleNavType(type);
  }
  let display;

  if (selectedNavType === DISPLAY_USER) {
    display = <InputSearchUserContainer />;
  }
  return (
    <>
      <nav className="flex justify-center w-full border">
        <Button
          variant="light"
          color={selectedNavType === SELECT_DIFFICULTY ? "primary" : ""}
          onClick={() => handleClick(SELECT_DIFFICULTY)}
        >
          Play
        </Button>
        <Button
          variant="light"
          color={selectedNavType === DISPLAY_USER ? "primary" : ""}
          onClick={() => handleClick(DISPLAY_USER)}
        >
          Search User
        </Button>
        <Button
          variant="light"
          color={selectedNavType === VIEW_LEADERBOARD ? "primary" : ""}
          onClick={() => handleClick(VIEW_LEADERBOARD)}
        >
          Leaderboard
        </Button>
      </nav>
      {display}
    </>
  );
}

NavBar.propTypes = {
  changePageTo: PropTypes.func,
};
