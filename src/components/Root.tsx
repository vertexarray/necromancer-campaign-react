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

const Root = ({ accumulate }: RootProps) => {
  useEffect(() => {
    initTimer();
    addOnTickFunction("accumulate", accumulate);
    addOnTickFunction("checkEvents", checkEvents);
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
