import React from "react";
import PropTypes from "prop-types";
import { InputSearchUser } from "./InputSearchUser";
import {
  DISPLAY_USER,
  VIEW_LEADERBOARD,
  SELECT_DIFFICULTY,
  PLAY_GAME,
} from "../actions/actionTypes";
import { Button } from "@vechaiui/react";

export function NavBar(props) {
  let { changePageTo, displayingPage } = props;
  function handleClick(type) {
    changePageTo(type);
  }
  let display;

  if (displayingPage === DISPLAY_USER) {
    display = <InputSearchUser />;
  }
  return (
    <>
      <nav className="flex justify-center w-full border">
        <Button
          variant={
            displayingPage === SELECT_DIFFICULTY || displayingPage === PLAY_GAME
              ? "solid"
              : "light"
          }
          color={
            displayingPage === SELECT_DIFFICULTY || displayingPage === PLAY_GAME
              ? "primary"
              : ""
          }
          onClick={() => handleClick(SELECT_DIFFICULTY)}
        >
          Play
        </Button>
        <Button
          variant={displayingPage === DISPLAY_USER ? "solid" : "light"}
          color={displayingPage === DISPLAY_USER ? "primary" : ""}
          onClick={() => handleClick(DISPLAY_USER)}
        >
          Search User
        </Button>
        <Button
          variant={displayingPage === VIEW_LEADERBOARD ? "solid" : "light"}
          color={displayingPage === VIEW_LEADERBOARD ? "primary" : ""}
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
  displayingPage: PropTypes.string,
};
