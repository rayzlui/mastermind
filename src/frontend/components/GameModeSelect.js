import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  SELECT_DIFFICULTY,
  SET_ALERT_MESSAGE,
  SET_PVP,
  SET_SINGLE_PLAYER,
  SET_TOURNAMENT,
} from "../actions/actionTypes";
import { Button } from "@vechaiui/react";
import { useDispatch, useSelector } from "react-redux";
import { showLogin } from "../actions/actions";
import { SelectDifficultyComponent } from "./SelectDifficultyComponent";

export function GameModeSelect() {
  let dispatch = useDispatch();
  let currentUser = useSelector((state) => state.currentUser);
  let displayingPage = useSelector((state) => state.displayingPage);
  let gameType = useSelector((state) => state.gameType);

  let [showGameDiff, toggleGameDiff] = useState(false);
  if (displayingPage !== SELECT_DIFFICULTY) {
    return null;
  }

  let GameDiff = showGameDiff ? <SelectDifficultyComponent /> : null;

  function handleClick(select) {
    if (select !== SET_SINGLE_PLAYER && currentUser === null) {
      dispatch({ type: SET_ALERT_MESSAGE, payload: "Login to play online" });
      dispatch(showLogin("Login"));
    }
    toggleGameDiff(true);
    dispatch({ type: select });
  }
  return (
    <div className="flex flex-col h-full justify-center items-center">
      <div className="flex justify-center border">
        <Button
          variant={gameType === SET_SINGLE_PLAYER ? "solid" : "ghost"}
          color={gameType === SET_SINGLE_PLAYER ? "primary" : ""}
          onClick={() => handleClick(SET_SINGLE_PLAYER)}
        >
          Single Player
        </Button>
        <Button
          variant={gameType === SET_PVP ? "solid" : "ghost"}
          color={gameType === SET_PVP ? "primary" : ""}
          onClick={() => handleClick(SET_PVP)}
        >
          One on One
        </Button>
        <Button
          variant={gameType === SET_TOURNAMENT ? "solid" : "ghost"}
          color={gameType === SET_TOURNAMENT ? "primary" : ""}
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
