import "./App.css";
import React from "react";
import { GameComponent } from "./frontend/components/GameComponent";
import { Provider } from "react-redux";
import { configureStore } from "./frontend/configureStore";

function App() {
  let store = configureStore();
  return (
    <Provider store={store}>
      <GameComponent />
    </Provider>
  );
}

export default App;
