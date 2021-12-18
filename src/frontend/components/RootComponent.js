import React from "react";
import { configureStore } from "../configureStore";
import { Provider } from "react-redux";
import { UserInputContainer } from "../containers/UserInputContainer";
import { PreviousMoveContainer } from "../containers/PreviousMoveContainer";
import { FetchingCodeContainer } from "../containers/FetchingCodeContainer";

export function RootComponent(props) {
  let store = configureStore();
  //remove fetchcodecontainer when we set up game difficulty etc.
  return (
    <Provider store={store}>
      <PreviousMoveContainer />
      <UserInputContainer />
      <FetchingCodeContainer />
    </Provider>
  );
}
