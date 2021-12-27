import "./App.css";
import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "./frontend/configureStore";
import { ViewLeaderboardContainer } from "./frontend/containers/ViewLeaderboardContainer";
import { PlayGameContainer } from "./frontend/containers/PlayGameContainer";
import { WelcomeContainer } from "./frontend/containers/WelcomeContainer";

import {
  NavBarContainer,
  HeaderContainer,
} from "./frontend/containers/NavContainer";
import { SearchUserContainer } from "./frontend/containers/SearchUserContainer";
import { UserPageContainer } from "./frontend/containers/UserPageContainer";
import { LoginOrCreateUserContainer } from "./frontend/containers/LoginOrCreateUserContainer";

function App() {
  let store = configureStore();
  return (
    <Provider store={store}>
      <HeaderContainer />
      <NavBarContainer />
      <LoginOrCreateUserContainer />
      <UserPageContainer />
      <SearchUserContainer />
      <WelcomeContainer />
      <ViewLeaderboardContainer />
      <PlayGameContainer />
    </Provider>
  );
}

export default App;
