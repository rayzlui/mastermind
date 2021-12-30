import React, { useState } from "react";
import PropTypes from "prop-types";
import { SelectDifficultyContainer } from "../containers/SelectDifficultyContainer";
import {
  SELECT_DIFFICULTY,
  SET_PVP,
  SET_SINGLE_PLAYER,
  SET_TOURNAMENT,
} from "../actions/actionTypes";
import { Button } from "@vechaiui/react";

export function GameModeSelect(props) {
  let { currentUser, displayingPage, selectGameType, toggleLogin } = props;
  let [showGameDiff, toggleGameDiff] = useState(false);
  let [selectedGameType, toggleGameType] = useState(null);
  if (displayingPage !== SELECT_DIFFICULTY) {
    return null;
  }

  let GameDiff = showGameDiff ? <SelectDifficultyContainer /> : null;

  function handleClick(select) {
    if (select !== SET_SINGLE_PLAYER && currentUser === null) {
      alert("Login to play online");
      toggleLogin(true);
    }
    toggleGameType(select);
    toggleGameDiff(true);
    selectGameType(select);
  }
  return (
    <div className="flex flex-col h-full justify-center items-center">
      <div className="flex justify-center border">
        <Button
          variant="ghost"
          color={selectedGameType === SET_SINGLE_PLAYER ? "primary" : ""}
          onClick={() => handleClick(SET_SINGLE_PLAYER)}
        >
          Single Player
        </Button>
        <Button
          variant="ghost"
          color={selectedGameType === SET_PVP ? "primary" : ""}
          onClick={() => handleClick(SET_PVP)}
        >
          One on One
        </Button>
        <Button
          variant="ghost"
          color={selectedGameType === SET_TOURNAMENT ? "primary" : ""}
          onClick={() => handleClick(SET_TOURNAMENT)}
        >
          Tournament
        </Button>
      </div>
      {GameDiff}
    </div>
  );
}

GameModeSelect.propTypes = {
  currentUser: PropTypes.object,
  displayingPage: PropTypes.string,
  gameType: PropTypes.string,
  selectGameType: PropTypes.func,
  toggleLogin: PropTypes.func,
};
