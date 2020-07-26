import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import { reducers } from "./reducers/Reducers";
import { createStore } from "redux";
import Root, { loadGame } from "./components/Root";
import { ThemeProvider } from "styled-components";

export const store = createStore(reducers, loadGame(), undefined);

const theme = {
  buttonText: "#FFFFFF",
  buttonBackground: "#555555",
  buttonHover: "#666666",
};

function App() {
  if (!store) {
    return <>loading...</>;
  }
  return (
    <>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Root />
        </ThemeProvider>
      </Provider>
    </>
  );
}

export default App;
