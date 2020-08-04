import React from "react";
import { Dispatch } from "redux";
import { connect, ConnectedProps } from "react-redux";
import { OrderButton } from "./styled";
import { RootState } from "../../reducers/Reducers";
import { Recipe, getRecipe } from "../../game/Recipes";
import {
  tryRecipe,
  checkRecipeRequirements,
  checkWouldRecipeCapOut,
} from "../../game/Resources";
import {
  UNLOCK,
  PUT_LOG,
  SET_MULTIPLE_RESOURCES,
} from "../../reducers/Actions";

const RecipeButton = ({
  tryR,
  recipe,
  onButtonClicked,
  children,
}: RecipeButtonProps) => {
  const r = getRecipe(recipe)!;

  if (r) {
    return (
      <OrderButton
        disabled={!checkRecipeRequirements(r) || checkWouldRecipeCapOut(r)}
        onClick={() => {
          tryR(r);
          if (onButtonClicked) {
            onButtonClicked();
          }
        }}
      >
        {children}
      </OrderButton>
    );
  } else {
    return <OrderButton disabled={true}>recipe {recipe} not found</OrderButton>;
  }
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

type RecipeButtonProps = ConnectedProps<typeof connector> & {
  recipe: string;
  onButtonClicked?: Function;
  children?: any;
};
export default connector(RecipeButton);
