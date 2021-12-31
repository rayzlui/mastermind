import React from "react";
import PropTypes from "prop-types";
import { PLAY_GAME, SET_SINGLE_PLAYER } from "../actions/actionTypes";
import { WinnerPageContainer } from "../containers/WinnerPageContainer";
import { UserInputContainer } from "../containers/UserInputContainer";
import { TimerContainer } from "../containers/TimerContainer";
import { TurnsRemaining } from "./TurnsRemaining";
import { HintsRemaining } from "./HintsRemaining";
import { useSelector } from "react-redux";
import { PreviousMoves } from "./PreviousMoves";
import { ShowPVPInfo } from "./ShowPvPInfo";

export function PlayGame() {
  let displayingPage = useSelector((state) => state.displayingPage);
  let gameType = useSelector((state) => state.gameType);
  let opponentData = useSelector((state) => state.opponentData);
  if (displayingPage !== PLAY_GAME) {
    return null;
  }
  if (gameType !== SET_SINGLE_PLAYER && opponentData === null) {
    return (
      <div className="flex flex-col justify-center items-center">
        <h1>Matching...</h1>
      </div>
    );
  }
  return (
    <div className="flex h-full bg-white">
      <div className="border-r-2 h-full w-1/5">
        <PreviousMoves />
      </div>
      <div className="w-3/5 h-full">
        <ShowPVPInfo />
        <WinnerPageContainer />
        <UserInputContainer />
      </div>
      <div className="w-1/5 border-l-2 flex flex-col justify-items items-center">
        <h1 className="mb-8 font-bold text-xl">Remaining</h1>
        <TurnsRemaining />
        <TimerContainer />
        <HintsRemaining />
      </div>
    </div>
  );
}

PlayGame.propTypes = {
  displayingPage: PropTypes.string,
  gameType: PropTypes.string,
  opponentData: PropTypes.object,
};
