import "./App.css";
import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "./frontend/configureStore";
import { ViewLeaderboardContainer } from "./frontend/containers/ViewLeaderboardContainer";
import { PlayGameContainer } from "./frontend/containers/PlayGameContainer";
import { GameModeSelectContainer } from "./frontend/containers/GameModeSelectContainer";

import {
  NavBarContainer,
  HeaderContainer,
} from "./frontend/containers/NavContainer";
import { SearchUserContainer } from "./frontend/containers/SearchUserContainer";
import { UserPageContainer } from "./frontend/containers/UserPageContainer";
import { LoginOrCreateUserContainer } from "./frontend/containers/LoginOrCreateUserContainer";
import { VechaiProvider } from "@vechaiui/react";
function App() {
  let store = configureStore();
  return (
    <div className="flex flex-col bg-zinc-200 h-screen items-center ">
      <VechaiProvider>
        <Provider store={store}>
          <div className="h-1/6 grid items-center justify-items-center w-screen bg-white">
            <HeaderContainer />
          </div>
          <div className="h-1/8 w-4/5">
            <NavBarContainer />
          </div>
          <div className="w-4/5 h-4/6 mb-8 overflow-scroll border bg-gray-50 rounded">
            <GameModeSelectContainer />
            <UserPageContainer />
            <SearchUserContainer />
            <ViewLeaderboardContainer />
            <PlayGameContainer />
            <LoginOrCreateUserContainer />
          </div>
        </Provider>
      </VechaiProvider>
    </div>
  );
}

export default App;
