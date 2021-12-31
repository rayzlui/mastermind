import "./App.css";
import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "./frontend/configureStore";
import { ViewLeaderboardContainer } from "./frontend/containers/ViewLeaderboardContainer";

import { NavBarContainer } from "./frontend/containers/NavContainer";
import { VechaiProvider } from "@vechaiui/react";
import { PlayGame } from "./frontend/components/PlayGame";
import { SearchUserDisplay } from "./frontend/components/SearchUserDisplay";
import { UserPage } from "./frontend/components/UserPage";
import { GameModeSelect } from "./frontend/components/GameModeSelect";
import { LoginOrCreateUserPage } from "./frontend/components/LoginOrCreateUserPage";
import { HeaderComponent } from "./frontend/components/HeaderComponent";
function App() {
  let store = configureStore();
  return (
    <div className="flex flex-col bg-zinc-200 h-screen items-center ">
      <VechaiProvider>
        <Provider store={store}>
          <div className="h-1/6 grid items-center justify-items-center w-screen bg-white">
            <HeaderComponent />
          </div>
          <div className="h-1/8 w-4/5">
            <NavBarContainer />
          </div>
          <div className="w-4/5 h-4/6 mb-8 overflow-scroll border bg-gray-100 rounded">
            <GameModeSelect />
            <UserPage />
            <SearchUserDisplay />
            <ViewLeaderboardContainer />
            <PlayGame />
            <LoginOrCreateUserPage />
          </div>
        </Provider>
      </VechaiProvider>
    </div>
  );
}

export default App;
