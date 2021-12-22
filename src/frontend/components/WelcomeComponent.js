import React, { useState } from "react";
import PropTypes from "prop-types";
import { SelectDifficultyComponent } from "./SelectDifficultyComponent";
import { LoginUserContainer } from "../containers/LoginUserContainer";
import { CreateUserContainer } from "../containers/CreateUserContainer";

export function WelcomeScreen(props) {
  let { currentUser } = props;
  let [gameMode, selectGameMode] = useState(null);
  let [showGameDiff, toggleGameDiff] = useState(false);
  let [showLogin, toggleLogin] = useState(false);

  let GameDiff = showGameDiff ? (
    <SelectDifficultyComponent gameMode={gameMode} />
  ) : null;

  let Login = showLogin ? (
    <>
      <LoginUserContainer />
      <CreateUserContainer />
    </>
  ) : null;

  if (showLogin && currentUser) {
    toggleLogin(!showLogin);
  }

  function handleClick(select) {
    if (select !== "single" && currentUser === null) {
      alert("Login to play online");
      toggleLogin(true);
      return;
    }
    selectGameMode(select);
    toggleGameDiff(true);
  }
  return (
    <div>
      <button onClick={() => handleClick("single")}>Single Player</button>
      <button onClick={() => handleClick("pvp")}>One on One</button>
      <button onClick={() => handleClick("tournament")}>Tournament</button>
      {GameDiff}
      {Login}
    </div>
  );
}

WelcomeScreen.propTypes = {
  currentUser: PropTypes.object,
};
