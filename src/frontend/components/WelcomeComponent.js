import React, { useState } from "react";
import PropTypes from "prop-types";
import { SelectDifficultyComponent } from "./SelectDifficultyComponent";
import {
  SELECT_DIFFICULTY,
  SET_PVP,
  SET_SINGLE_PLAYER,
  SET_TOURNAMENT,
} from "../actions/actionTypes";

export function WelcomeScreen(props) {
  let { currentUser, displayingPage, gameType, selectGameType, toggleLogin } =
    props;
  let [showGameDiff, toggleGameDiff] = useState(false);
  if (displayingPage !== SELECT_DIFFICULTY) {
    return null;
  }

  let GameDiff = showGameDiff ? (
    <SelectDifficultyComponent gameType={gameType} />
  ) : null;

  function handleClick(select) {
    if (select !== SET_SINGLE_PLAYER && currentUser === null) {
      alert("Login to play online");
      toggleLogin(true);
      return;
    }
    selectGameType(select);
    toggleGameDiff(true);
  }
  return (
    <div>
      <button onClick={() => handleClick(SET_SINGLE_PLAYER)}>
        Single Player
      </button>
      <button onClick={() => handleClick(SET_PVP)}>One on One</button>
      <button onClick={() => handleClick(SET_TOURNAMENT)}>Tournament</button>
      {GameDiff}
    </div>
  );
}

WelcomeScreen.propTypes = {
  currentUser: PropTypes.object,
  displayingPage: PropTypes.string,
  gameType: PropTypes.string,
  selectGameType: PropTypes.func,
  toggleLogin: PropTypes.func,
};
