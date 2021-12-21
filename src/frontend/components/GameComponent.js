import React, { useState } from "react";
import { UserInputContainer } from "../containers/UserInputContainer";
import { PreviousMoveContainer } from "../containers/PreviousMoveContainer";
import { ShowPVPContainer } from "../containers/ShowPVPContainer";
import { TimerContainer } from "../containers/TimerContainer";

export function GameComponent(props) {
  return (
    <>
      <ShowPVPContainer />
      <TimerContainer />
      <PreviousMoveContainer />
      <UserInputContainer />
    </>
  );
}
