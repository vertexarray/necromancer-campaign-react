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
import { OrderButton, OrdersContainer, OrdersColumn } from "./styled";

const Orders = ({
  tryR,
  unlock,
  putLog,
  addMany,
  recipes,
  resourceData,
  unlocks,
}: OrdersProps) => {
  const bodyParts = resourceData.get("body parts");
  const getBodyPart =
    bodyParts && bodyParts >= 7 ? (
      <OrderButton
        onClick={() => {
          unlock("corpses");
          unlock("body parts", "lock");
          putLog(
            "A suitable vessel, for now. Countless ancient corpses call to you from below."
          );
        }}
      >
        Become whole again
      </OrderButton>
    ) : (
      <OrderButton
        onClick={() => {
          tryR(recipes.get("body part")!);
        }}
      >
        Scrounge for body part
      </OrderButton>
    );
  return (
    <OrdersContainer>
      <OrdersColumn>
        {!unlocks.get("corpses") && getBodyPart}
        {unlocks.get("corpses") && (
          <OrderButton
            onClick={() => {
              tryR(recipes.get("corpse")!);
            }}
          >
            Unearth Corpse
          </OrderButton>
        )}
        {unlocks.get("talismans") && (
          <OrderButton
            onClick={() => {
              tryR(recipes.get("talisman")!);
            }}
          >
            Make Talisman
          </OrderButton>
        )}
        {unlocks.get("skeletons") && (
          <OrderButton
            onClick={() => {
              tryR(recipes.get("skeletons")!);
            }}
          >
            Animate Skeleton
          </OrderButton>
        )}
      </OrdersColumn>
      <OrdersColumn>
        {unlocks.get("kill with magic") && (
          <OrderButton
            onClick={() => {
              tryR(recipes.get("kill with magic")!);
            }}
          >
            Kill with magic
          </OrderButton>
        )}
        {unlocks.get("skeletons") && (
          <OrderButton
            onClick={() => {
              const skeletonCount = resourceData.get("skeletons")!;
              unlock("unwilling sacrifices");
              addMany([
                [
                  "corpses",
                  (skeletonCount + Math.round(Math.random() * 8)) * 2,
                ],
                [
                  "unwilling sacrifices",
                  Math.round(skeletonCount / 7 + Math.random() * 4),
                ],
                ["skeletons", -Math.round(Math.random() * skeletonCount)],
              ]);
            }}
          >
            Dispatch raiding party
          </OrderButton>
        )}
      </OrdersColumn>
    </OrdersContainer>
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

type OrdersProps = ConnectedProps<typeof connector>;

export default connector(Orders);
