import "./App.css";
import React from "react";
import { SinglePlayerGameComponent } from "./frontend/components/SinglePlayerGameComponent";
import { Provider } from "react-redux";
import { configureStore } from "./frontend/configureStore";
import { WelcomeScreen } from "./frontend/components/WelcomeComponent";
import { CreateUserContainer } from "./frontend/containers/CreateUserContainer";
import { LoginUserContainer } from "./frontend/containers/LoginUserContainer";
import { WinnerPageContainer } from "./frontend/containers/WinnerPageContainer";

function App() {
  let store = configureStore();
  return (
    <Provider store={store}>
      <WinnerPageContainer />
      <LoginUserContainer />
      <CreateUserContainer />
      <WelcomeScreen />
      <SinglePlayerGameComponent />
    </Provider>
  );
}

export default App;
