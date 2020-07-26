import React, { useEffect } from "react";
import { init as initTimer, addOnTickFunction } from "../game/Time";
import Resources from "./Resources/ResourcesList";
import { accumulate } from "../game/Resources";
import Actions from "./Orders/Orders";
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";
import Log from "./Log/Log";
import { checkEvents } from "../game/Events";
import { RootContainer } from "./styled";
import { store } from "../App";

function replacer(this: any, key: string, value: any) {
  if (key === "events") {
    return value;
  }
  if (value instanceof Map) {
    return {
      dataType: "Map",
      value: [...value],
    };
  }
  return value;
}

const saveGame = () => {
  const state = store.getState();
  const data = JSON.stringify(state, replacer);
  localStorage.setItem("gameData", data);
};

function reviver(this: any, key: string, value: any) {
  if (typeof value === "object" && value !== null) {
    if (value.dataType === "Map") {
      return new Map(value.value);
    }
  }
  return value;
}

export const loadGame = () => {
  if (localStorage.getItem("gameData")) {
    const data = JSON.parse(localStorage.getItem("gameData")!, reviver);
    return data;
  }
};

const Root = ({ accumulate }: RootProps) => {
  useEffect(() => {
    initTimer();
    addOnTickFunction("accumulate", accumulate);
    addOnTickFunction("checkEvents", checkEvents);
    addOnTickFunction("saveGame", saveGame, 20);
  });

  return (
    <RootContainer>
      <Resources />
      <Actions />
      <Log />
    </RootContainer>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return { accumulate: () => dispatch(accumulate()) };
};

const connector = connect(null, mapDispatchToProps);

type RootProps = ConnectedProps<typeof connector>;

export default connector(Root);
