import { OrdersProps } from "../Orders";
import { OrderButton } from "../styled";
import React from "react";

const Magic = ({ tryR, recipes, unlocks }: OrdersProps) => {
  return (
    <>
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
    </>
  );
};

export default Magic;
