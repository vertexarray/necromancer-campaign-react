import { OrdersProps } from "../Orders";
import React from "react";
import { OrderButton } from "../styled";
import RecipeButton from "../RecipeButton";
import { have } from "../../../game/Resources";

const Warfare = ({
  unlock,
  addMany,
  resourceData,
  unlocks,
  putLog,
}: OrdersProps) => {
  return (
    <>
      {unlocks.get("kill with magic") && (
        <RecipeButton recipe="kill with magic">Kill with magic</RecipeButton>
      )}
      {unlocks.get("graverobbers") && (
        <RecipeButton recipe="hire graverobber">Hire graverobber</RecipeButton>
      )}
      {unlocks.get("skeletons") && (
        <OrderButton
          disabled={!have("skeletons", 1)}
          onClick={() => {
            const skeletonCount = resourceData.get("skeletons")!;
            unlock("unwilling sacrifices");
            unlock("gold");
            const corpses = (skeletonCount + Math.round(Math.random() * 8)) * 2;
            const sacrifices = Math.round(
              skeletonCount / 7 + Math.random() * 4
            );
            const gold = Math.round(skeletonCount * 30 * Math.random());
            const skeletons = -Math.round(Math.random() * skeletonCount);
            addMany([
              ["corpses", corpses],
              ["unwilling sacrifices", sacrifices],
              ["gold", gold],
              ["skeletons", skeletons],
            ]);
            putLog(
              `Your raiding party returned ${Math.round(corpses)} fresh corpses, ${gold} ducats, and sacrificed ${sacrifices} mortals to your glory, at the expense of ${Math.abs(
                skeletons
              )} skeletons`
            );
          }}
        >
          Dispatch raiding party
        </OrderButton>
      )}
      {unlocks.get("graverobbers") && (
        <OrderButton
          disabled={!have("skeletons", resourceData.get("km2")! * 5)}
          onClick={() => {
            unlock("km2");
            addMany([
              ["skeletons", -resourceData.get("km2")! * 5],
              ["km2", 1],
            ]);
          }}
        >
          Claim territory
        </OrderButton>
      )}
    </>
  );
};

export default Warfare;
