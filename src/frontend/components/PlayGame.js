import React from "react";
import PropTypes from "prop-types";
import { PLAY_GAME, SET_SINGLE_PLAYER } from "../actions/actionTypes";

import { WinnerPageContainer } from "../containers/WinnerPageContainer";
import { SinglePlayerGameComponent } from "../components/SinglePlayerGameComponent";

export function PlayGame(props) {
  let { displayingPage, gameType, opponentData } = props;
  if (displayingPage !== PLAY_GAME) {
    return null;
  }

  if (gameType !== SET_SINGLE_PLAYER && opponentData === null) {
    return <h1>Matching...</h1>;
  }
  return (
    <>
      <WinnerPageContainer />
      <SinglePlayerGameComponent />
    </>
  );
}

PlayGame.propTypes = {
  displayingPage: PropTypes.string,
  gameType: PropTypes.string,
  opponentData: PropTypes.object,
};
