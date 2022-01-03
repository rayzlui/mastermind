import React, { useState } from "react";
import {
  SELECT_DIFFICULTY,
  SET_ALERT_MESSAGE,
  ONE_ON_ONE,
  SINGLE_PLAYER,
  TOURNAMENT,
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

  if (displayingPage !== SELECT_DIFFICULTY) {
    return null;
  }

  let GameDiff = gameType ? <SelectDifficultyComponent /> : null;

  function handleClick(select) {
    if (select !== SINGLE_PLAYER && currentUser === null) {
      dispatch({ type: SET_ALERT_MESSAGE, payload: "Login to play online" });
      dispatch(showLogin("Login"));
    }
    dispatch({ type: select });
  }
  return (
    <div className="flex flex-col h-full justify-center items-center">
      <div className="flex justify-center border">
        <Button
          variant={gameType === SINGLE_PLAYER ? "solid" : "solid"}
          color={gameType === SINGLE_PLAYER ? "primary" : ""}
          onClick={() => handleClick(SINGLE_PLAYER)}
        >
          Single Player
        </Button>
        <Button
          variant={gameType === ONE_ON_ONE ? "solid" : "solid"}
          color={gameType === ONE_ON_ONE ? "primary" : ""}
          onClick={() => handleClick(ONE_ON_ONE)}
        >
          One on One
        </Button>
        <Button
          variant={gameType === TOURNAMENT ? "solid" : "solid"}
          color={gameType === TOURNAMENT ? "primary" : ""}
          onClick={() => handleClick(TOURNAMENT)}
        >
          Tournament
        </Button>
      </div>
      {GameDiff}
    </div>
  );
}
