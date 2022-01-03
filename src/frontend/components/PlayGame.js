import React from "react";
import { PLAY_GAME, SINGLE_PLAYER } from "../actions/actionTypes";
import { TurnsRemaining } from "./TurnsRemaining";
import { HintsRemaining } from "./HintsRemaining";
import { useSelector } from "react-redux";
import { PreviousMoves } from "./PreviousMoves";
import { ShowPVPInfo } from "./ShowPvPInfo";
import { TimerComponent } from "./TimerComponent";
import { WinnerPage } from "./WinnerPage";
import { GameCore } from "./GameCore";

export function PlayGame() {
  let displayingPage = useSelector((state) => state.displayingPage);
  let gameType = useSelector((state) => state.gameType);
  let pvpData = useSelector((state) => state.pvpData);
  if (displayingPage !== PLAY_GAME) {
    return null;
  }
  if (gameType !== SINGLE_PLAYER && pvpData === null) {
    return (
      <div className="flex flex-col justify-center items-center">
        <h1>Matching...</h1>
      </div>
    );
  }
  return (
    <div className="flex h-full bg-white">
      <div className="border-r-2 h-full w-1/5 overflow-scroll">
        <PreviousMoves />
      </div>
      <div className="w-3/5 h-full overflow-scroll">
        <ShowPVPInfo />
        <WinnerPage />
        <GameCore />
      </div>
      <div className="w-1/5 border-l-2 flex flex-col justify-items items-center overflow-scroll">
        <h1 className="mb-8 font-bold text-xl">Remaining</h1>
        <TurnsRemaining />
        <TimerComponent />
        <HintsRemaining />
      </div>
    </div>
  );
}
