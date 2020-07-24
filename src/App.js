import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import { reducers } from "./reducers/Reducers";
import { createStore } from "redux";
import Root from "./components/Root";

export const store = createStore(reducers);

function App() {
  return (
    <>
      <Provider store={store}>
        <Root />
      </Provider>
    </>
  );
}

export default App;
