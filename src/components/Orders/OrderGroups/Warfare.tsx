import { OrdersProps } from "../Orders";
import React from "react";
import { OrderButton } from "../styled";
import { have } from "../../../game/Resources";

const Warfare = ({
  tryR,
  unlock,
  addMany,
  recipes,
  resourceData,
  unlocks,
}: OrdersProps) => {
  return (
    <>
      {unlocks.get("kill with magic") && (
        <OrderButton
          onClick={() => {
            tryR(recipes.get("kill with magic")!);
          }}
        >
          Kill with magic
        </OrderButton>
      )}
      {unlocks.get("graverobbers") && (
        <OrderButton
          disabled={!have("gold", 10)}
          onClick={() => {
            tryR(recipes.get("hire graverobber")!);
          }}
        >
          Hire graverobber
        </OrderButton>
      )}
      {unlocks.get("skeletons") && (
        <OrderButton
          disabled={!have("skeletons", 1)}
          onClick={() => {
            const skeletonCount = resourceData.get("skeletons")!;
            unlock("unwilling sacrifices");
            unlock("gold");
            addMany([
              ["corpses", (skeletonCount + Math.round(Math.random() * 8)) * 2],
              [
                "unwilling sacrifices",
                Math.round(skeletonCount / 7 + Math.random() * 4),
              ],
              ["gold", Math.round(skeletonCount * 30 * Math.random())],
              ["skeletons", -Math.round(Math.random() * skeletonCount)],
            ]);
          }}
        >
          Dispatch raiding party
        </OrderButton>
      )}
      {unlocks.get("graverobbers") && (
        <OrderButton
          disabled={!have("skeletons", 4 * resourceData.get("km2")!)}
          onClick={() => {
            const skeletonCount = resourceData.get("skeletons")!;
            unlock("km2");
            addMany([
              ["skeletons", -Math.round(skeletonCount)],
              [
                "km2",
                Math.floor(skeletonCount / (4 * resourceData.get("km2")!)),
              ],
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
