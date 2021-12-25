import "./App.css";
import React from "react";
import { SinglePlayerGameComponent } from "./frontend/components/SinglePlayerGameComponent";
import { Provider } from "react-redux";
import { configureStore } from "./frontend/configureStore";
import { CreateUserContainer } from "./frontend/containers/CreateUserContainer";
import { LoginUserContainer } from "./frontend/containers/LoginUserContainer";
import { WinnerPageContainer } from "./frontend/containers/WinnerPageContainer";
import { WelcomeContainer } from "./frontend/containers/WelcomeContainer";
import { ViewLeaderboard } from "./frontend/components/ViewLeaderboard";
import { SearchUserContainer } from "./frontend/containers/SearchUserContainer";
import { ShowThisUserContainer } from "./frontend/containers/ShowThisUserContainer";

function App() {
  let store = configureStore();
  return (
    <Provider store={store}>
      <SearchUserContainer />
      <ShowThisUserContainer />
      <ViewLeaderboard />
      <WinnerPageContainer />
      <LoginUserContainer />
      <CreateUserContainer />
      <WelcomeContainer />
      <SinglePlayerGameComponent />
    </Provider>
  );
}

export default App;
