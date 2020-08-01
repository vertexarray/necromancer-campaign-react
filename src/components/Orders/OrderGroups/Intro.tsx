import { OrdersProps } from "../Orders";
import { OrderButton } from "../styled";
import React from "react";

const Intro = ({
  tryR,
  unlock,
  putLog,
  recipes,
  resourceData,
  unlocks,
}: OrdersProps) => {
  const bodyParts = resourceData.get("body parts");
  if (unlocks.get("corpses")) {
    return null;
  }
  return bodyParts && bodyParts >= 7 ? (
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
};

export default Intro;
