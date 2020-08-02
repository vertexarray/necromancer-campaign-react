import React from "react";
import { Dispatch } from "redux";
import { connect, ConnectedProps } from "react-redux";
import { OrderButton } from "./styled";
import { RootState } from "../../reducers/Reducers";
import { Recipe } from "../../game/Recipes";
import { tryRecipe, checkRecipeRequirements } from "../../game/Resources";
import {
  UNLOCK,
  PUT_LOG,
  SET_MULTIPLE_RESOURCES,
} from "../../reducers/Actions";

const RecipeButton = ({
  recipes,
  tryR,
  recipe,
  onButtonClicked,
  children,
}: RecipeButtonProps) => {
  return (
    <OrderButton
      disabled={!checkRecipeRequirements(recipes.get(recipe)!)}
      onClick={() => {
        tryR(recipes.get(recipe)!);
        if (onButtonClicked) {
          onButtonClicked();
        }
      }}
    >
      {children}
    </OrderButton>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    recipes: state.recipeDefinitions,
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
