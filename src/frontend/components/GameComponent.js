import React, { useState } from "react";
import { UserInputContainer } from "../containers/UserInputContainer";
import { PreviousMoveContainer } from "../containers/PreviousMoveContainer";
import { SelectDifficultyComponent } from "./SelectDifficultyComponent";
import { TimerContainer } from "../containers/TimerContainer";

export function GameComponent(props) {
  //remove fetchcodecontainer when we set up game difficulty etc.
  let [showDifficulty, toggleDifficulty] = useState(true);
  if (showDifficulty) {
    return <SelectDifficultyComponent toggleDifficulty={toggleDifficulty} />;
  }
  return (
    <>
      <TimerContainer />
      <PreviousMoveContainer />
      <UserInputContainer />
    </>
  );
}
