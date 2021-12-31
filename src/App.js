import "./App.css";
import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "./frontend/configureStore";
import { VechaiProvider } from "@vechaiui/react";
import { PlayGame } from "./frontend/components/PlayGame";
import { SearchUserDisplay } from "./frontend/components/SearchUserDisplay";
import { UserPage } from "./frontend/components/UserPage";
import { GameModeSelect } from "./frontend/components/GameModeSelect";
import { LoginOrCreateUserPage } from "./frontend/components/LoginOrCreateUserPage";
import { HeaderComponent } from "./frontend/components/HeaderComponent";
import { NavBar } from "./frontend/components/NavBar";
import { ViewLeaderboard } from "./frontend/components/ViewLeaderboard";
import { AlertMessage } from "./frontend/components/AlertMessage";

function App() {
  let store = configureStore();
  return (
    <div className="flex flex-col bg-zinc-200 h-screen items-center ">
      <VechaiProvider>
        <Provider store={store}>
          <AlertMessage />
          <div className="h-1/6 grid items-center justify-items-center w-screen bg-white">
            <HeaderComponent />
          </div>
          <div className="h-1/8 w-4/5">
            <NavBar />
          </div>
          <div className="w-4/5 h-4/6 mb-8 overflow-scroll border bg-gray-100 rounded">
            <GameModeSelect />
            <UserPage />
            <SearchUserDisplay />
            <ViewLeaderboard />
            <PlayGame />
            <LoginOrCreateUserPage />
          </div>
        </Provider>
      </VechaiProvider>
    </div>
  );
}

export default App;
