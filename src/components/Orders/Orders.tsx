import React from "react";
import { tryRecipe } from "../../game/Resources";
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";
import { Recipe } from "../../game/Recipes";
import { RootState } from "../../reducers/Reducers";
import {
  UNLOCK,
  PUT_LOG,
  SET_MULTIPLE_RESOURCES,
} from "../../reducers/Actions";
import { OrdersContainer, OrdersColumn } from "./styled";
import Intro from "./OrderGroups/Intro";
import Magic from "./OrderGroups/Magic";
import Warfare from "./OrderGroups/Warfare";

const Orders = (props: OrdersProps) => {
  return (
    <OrdersContainer>
      <OrdersColumn>
        <Intro {...props} />
        <Magic {...props} />
      </OrdersColumn>
      <OrdersColumn>
        <Warfare {...props} />
      </OrdersColumn>
    </OrdersContainer>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    resourceData: state.resourceData,
    unlocks: state.unlocks,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    tryR: (recipe: Recipe) => dispatch(tryRecipe(recipe)),
    unlock: (which: string, status?: "unlock" | "lock") => {
      dispatch({ type: UNLOCK, unlock: which, status: status });
    },
    putLog: (text: string) => {
      dispatch({ type: PUT_LOG, text });
    },
    addMany: (adds: Array<[string, number]>) => {
      dispatch({ type: SET_MULTIPLE_RESOURCES, adds });
    },
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export type OrdersProps = ConnectedProps<typeof connector>;

export default connector(Orders);
